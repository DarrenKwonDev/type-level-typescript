// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
    Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
    Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
    Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
    Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
    Expect<Equal<Replace<"", "", "">, "">>
]

// ============= Your Code Here =============
type Replace<
    S extends string,
    From extends string,
    To extends string
> = From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S

type AAA = Replace<"foobar", "bar", "foo">
type BBB = Replace<"foobarbar", "bar", "foo">
type CCC = Replace<"foobarbar", "", "foo">
