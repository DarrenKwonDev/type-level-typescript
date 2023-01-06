// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Trunc<0.1>, "0">>,
    Expect<Equal<Trunc<1.234>, "1">>,
    Expect<Equal<Trunc<12.345>, "12">>,
    Expect<Equal<Trunc<-5.1>, "-5">>,
    Expect<Equal<Trunc<"1.234">, "1">>,
    Expect<Equal<Trunc<"-10.234">, "-10">>,
    Expect<Equal<Trunc<10>, "10">>
]

// ============= Your Code Here =============
type Trunc<T extends string | number> =
    `${T}` extends `${infer I}.${infer Rest}` ? I : `${T}`

type AAA = Trunc<12.345>
