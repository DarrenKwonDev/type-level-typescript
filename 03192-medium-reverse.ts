// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Reverse<[]>, []>>,
    Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
    Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
]

type errors = [
    // @ts-expect-error
    Reverse<"string">,
    // @ts-expect-error
    Reverse<{ key: "value" }>
]

// ============= Your Code Here =============
type Reverse<T extends any[]> = T extends [infer A, ...infer Rest]
    ? [...Reverse<Rest>, A]
    : T
