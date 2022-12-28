// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<If<true, "a", "b">, "a">>,
    Expect<Equal<If<false, "a", 2>, 2>>
]

type error = If<null, "a", "b">

// ============= Your Code Here =============
type If<C, T, F> = C extends true ? T : F
