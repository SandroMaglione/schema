/**
 * @since 1.0.0
 */

import { guardFor } from "@fp-ts/codec/Guard"
import type { Meta } from "@fp-ts/codec/Meta"
import type { Schema } from "@fp-ts/codec/Schema"
import * as S from "@fp-ts/codec/Schema"
import * as O from "@fp-ts/data/Option"

/**
 * @since 1.0.0
 */
export interface Show<in out A> {
  readonly show: (a: A) => string
}

/**
 * @since 1.0.0
 */
export const make = <A>(show: Show<A>["show"]): Show<A> => ({ show })

/**
 * @since 1.0.0
 */
export const showFor = (declarations: S.Declarations) =>
  <A>(schema: Schema<A>): Show<A> => {
    const f = (meta: Meta): Show<any> => {
      switch (meta._tag) {
        case "Apply": {
          const declaration = S.unsafeGet(meta.symbol)(declarations)
          if (declaration.showFor !== undefined) {
            return O.isSome(meta.config) ?
              declaration.showFor(meta.config.value, ...meta.metas.map(f)) :
              declaration.showFor(...meta.metas.map(f))
          }
          throw new Error(`Missing "showFor" declaration for ${meta.symbol.description}`)
        }
        case "String":
        case "Number":
        case "Boolean":
        case "Equal":
          return make((a) => JSON.stringify(a))
        case "Tuple": {
          const shows: ReadonlyArray<Show<unknown>> = meta.components.map(f)
          return make((tuple: ReadonlyArray<unknown>) =>
            "[" +
            tuple.map((c, i) =>
              i < shows.length ?
                shows[i].show(c) :
                O.isSome(meta.restElement) ?
                f(meta.restElement.value).show(c) :
                ""
            ).join(
              ", "
            ) + "]"
          )
        }
        case "Union": {
          const shows: ReadonlyArray<Show<unknown>> = meta.members.map(f)
          const guards = meta.members.map((member) => guardFor(S.make(declarations, member)))
          return make((a) => {
            const index = guards.findIndex((guard) => guard.is(a))
            return shows[index].show(a)
          })
        }
        case "Struct": {
          const shows: ReadonlyArray<Show<unknown>> = meta.fields.map((field) => f(field.value))
          return make((a: { [_: PropertyKey]: unknown }) =>
            `{ ${
              meta.fields.map((field, i) => `${String(field.key)}: ${shows[i].show(a[field.key])}`)
                .join(", ")
            } }`
          )
        }
        case "IndexSignature": {
          const show = f(meta.value)
          return make((a) =>
            `{ ${Object.keys(a).map((key) => `${String(key)}: ${show.show(a[key])}`).join(", ")} }`
          )
        }
        case "Array": {
          const show = f(meta.item)
          return make((a: ReadonlyArray<unknown>) =>
            "[" + a.map((elem) => show.show(elem)).join(", ") + "]"
          )
        }
      }
    }
    return f(schema.meta)
  }
