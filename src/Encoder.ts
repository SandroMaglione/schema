/**
 * @since 1.0.0
 */

import { absurd, identity, pipe } from "@fp-ts/data/Function"
import type { Option } from "@fp-ts/data/Option"
import * as O from "@fp-ts/data/Option"
import type * as AST from "@fp-ts/schema/AST"
import type { Guard } from "@fp-ts/schema/Guard"
import * as G from "@fp-ts/schema/Guard"
import * as I from "@fp-ts/schema/internal/common"
import type { Provider } from "@fp-ts/schema/Provider"
import * as P from "@fp-ts/schema/Provider"
import type { Schema } from "@fp-ts/schema/Schema"

/**
 * @since 1.0.0
 */
export interface Encoder<S, A> extends Schema<A> {
  readonly encode: (value: A) => S
}

/**
 * @since 1.0.0
 */
export const EncoderId = I.EncoderId

/**
 * @since 1.0.0
 */
export const make: <S, A>(schema: Schema<A>, encode: Encoder<S, A>["encode"]) => Encoder<S, A> =
  I.makeEncoder

/**
 * @since 1.0.0
 */
export const provideEncoderFor = (provider: Provider) =>
  <A>(schema: Schema<A>): Encoder<unknown, A> => {
    const go = (ast: AST.AST): Encoder<unknown, any> => {
      switch (ast._tag) {
        case "TypeAliasDeclaration":
          return pipe(
            ast.provider,
            P.Semigroup.combine(provider),
            P.findHandler(I.EncoderId, ast.id),
            O.match(
              () => go(ast.type),
              (handler) =>
                O.isSome(ast.config) ?
                  handler(ast.config.value)(...ast.typeParameters.map(go)) :
                  handler(...ast.typeParameters.map(go))
            )
          )
        case "LiteralType":
          return make(I.makeSchema(ast), identity)
        case "UndefinedKeyword":
          return make(I._undefined, identity)
        case "NeverKeyword":
          return make(I.never, absurd) as any
        case "UnknownKeyword":
          return make(I.unknown, identity)
        case "AnyKeyword":
          return make(I.any, identity)
        case "StringKeyword":
          return make(I.string, identity)
        case "NumberKeyword":
          return make(I.number, identity)
        case "BooleanKeyword":
          return make(I.boolean, identity)
        case "BigIntKeyword":
          return make(I.bigint, (n) => n.toString())
        case "SymbolKeyword":
          return make(I.bigint, identity)
        case "Tuple":
          return _tuple(
            ast,
            ast.components.map((c) => go(c.value)),
            pipe(ast.rest, O.map(go))
          )
        case "Struct":
          return _struct(
            ast,
            ast.fields.map((f) => go(f.value)),
            pipe(ast.indexSignatures.string, O.map((is) => go(is.value))),
            pipe(ast.indexSignatures.symbol, O.map((is) => go(is.value)))
          )
        case "Union":
          return _union(ast, ast.members.map((m) => [G.guardFor(I.makeSchema(m)), go(m)]))
        case "Lazy":
          return _lazy(() => go(ast.f()))
      }
    }

    return go(schema.ast)
  }

/**
 * @since 1.0.0
 */
export const encoderFor: <A>(schema: Schema<A>) => Encoder<unknown, A> = provideEncoderFor(
  P.empty
)

const _tuple = (
  ast: AST.Tuple,
  components: ReadonlyArray<Encoder<any, any>>,
  oRest: Option<Encoder<any, any>>
): Encoder<any, any> =>
  make(
    I.makeSchema(ast),
    (input: ReadonlyArray<unknown>) => {
      const output: Array<any> = []
      let i = 0
      // ---------------------------------------------
      // handle components
      // ---------------------------------------------
      for (; i < components.length; i++) {
        // ---------------------------------------------
        // handle optional components
        // ---------------------------------------------
        if (ast.components[i].optional && input[i] === undefined) {
          if (i < input.length) {
            output[i] = undefined
          }
        } else {
          const encoder = components[i]
          output[i] = encoder.encode(input[i])
        }
      }
      // ---------------------------------------------
      // handle rest element
      // ---------------------------------------------
      if (O.isSome(oRest)) {
        const encoder = oRest.value
        for (; i < input.length; i++) {
          output[i] = encoder.encode(input[i])
        }
      }

      return output
    }
  )

const _struct = (
  ast: AST.Struct,
  fields: ReadonlyArray<Encoder<any, any>>,
  oStringIndexSignature: Option<Encoder<any, any>>,
  oSymbolIndexSignature: Option<Encoder<any, any>>
): Encoder<any, any> =>
  make(
    I.makeSchema(ast),
    (input: { readonly [_: string | symbol]: unknown }) => {
      const output: any = {}
      const fieldKeys: any = {}
      // ---------------------------------------------
      // handle fields
      // ---------------------------------------------
      for (let i = 0; i < fields.length; i++) {
        const key = ast.fields[i].key
        fieldKeys[key] = null
        // ---------------------------------------------
        // handle optional fields
        // ---------------------------------------------
        const optional = ast.fields[i].optional
        if (optional) {
          if (!Object.prototype.hasOwnProperty.call(input, key)) {
            continue
          }
          if (input[key] === undefined) {
            output[key] = undefined
            continue
          }
        }
        // ---------------------------------------------
        // handle required fields
        // ---------------------------------------------
        const encoder = fields[i]
        output[key] = encoder.encode(input[key])
      }
      // ---------------------------------------------
      // handle index signatures
      // ---------------------------------------------
      if (O.isSome(oStringIndexSignature)) {
        const encoder = oStringIndexSignature.value
        for (const key of Object.keys(input)) {
          if (!(key in fieldKeys)) {
            output[key] = encoder.encode(input[key])
          }
        }
      }
      if (O.isSome(oSymbolIndexSignature)) {
        const encoder = oSymbolIndexSignature.value
        for (const key of Object.getOwnPropertySymbols(input)) {
          if (!(key in fieldKeys)) {
            output[key] = encoder.encode(input[key])
          }
        }
      }

      return output
    }
  )

const getWeight = (u: unknown): number => {
  if (Array.isArray(u)) {
    return u.length
  } else if (typeof u === "object" && u !== null) {
    return I.ownKeys(u).length
  }
  return 0
}

const _union = (
  ast: AST.Union,
  members: ReadonlyArray<readonly [Guard<any>, Encoder<any, any>]>
): Encoder<any, any> =>
  make(I.makeSchema(ast), (input) => {
    // ---------------------------------------------
    // compute encoder candidates
    // ---------------------------------------------
    const encoders: Array<Encoder<any, any>> = []
    for (let i = 0; i < members.length; i++) {
      if (members[i][0].is(input)) {
        encoders.push(members[i][1])
      } else if (encoders.length > 0) {
        break
      }
    }

    let output = encoders[0].encode(input)

    // ---------------------------------------------
    // compute best output
    // ---------------------------------------------
    let weight: number | null = null
    for (let i = 1; i < encoders.length; i++) {
      const o = encoders[i].encode(input)
      const w = getWeight(o)
      if (weight === null) {
        weight = getWeight(output)
      }
      if (w > weight) {
        output = o
        weight = w
      }
    }

    return output
  })

const _lazy = <S, A>(
  f: () => Encoder<S, A>
): Encoder<S, A> => {
  const get = I.memoize<void, Encoder<S, A>>(f)
  const schema = I.lazy(f)
  return make(
    schema,
    (a) => get().encode(a)
  )
}
