import * as Pretty from "@effect/schema/Pretty"
import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("lessThanOrEqualTo", () => {
  it("property tests", () => {
    Util.roundtrip(S.lessThanOrEqualTo(0)(S.number))
  })

  it("is", () => {
    const is = S.is(S.lessThanOrEqualTo(0)(S.number))
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(false)
    expect(is(-1)).toEqual(true)
  })

  it("decode", async () => {
    const schema = S.lessThanOrEqualTo(0)(S.number)
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, -1)
    await Util.expectParseFailure(
      schema,
      1,
      `Expected a number less than or equal to 0, actual 1`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.build(S.lessThanOrEqualTo(0)(S.number))
    expect(pretty(1)).toEqual("1")
  })
})
