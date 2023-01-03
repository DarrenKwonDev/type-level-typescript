// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<LengthOfString<"">, 0>>,
    Expect<Equal<LengthOfString<"kumiko">, 6>>,
    Expect<Equal<LengthOfString<"reina">, 5>>,
    Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
]

// ============= Your Code Here =============

type StringToArr<S extends string> = S extends `${infer A}${infer Rest}`
    ? [A, ...StringToArr<Rest>]
    : []
type LengthOfString<S extends string> = StringToArr<S>["length"]

type AAA = StringToArr<"kumiko">
