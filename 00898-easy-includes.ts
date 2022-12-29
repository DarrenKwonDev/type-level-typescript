// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<
        Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
    >,
    Expect<
        Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
    >,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
    Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
    Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
    Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
    Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
    Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
    Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
    Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
    Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
    Expect<Equal<Includes<[1], 1 | 2>, false>>,
    Expect<Equal<Includes<[1 | 2], 1>, false>>,
    Expect<Equal<Includes<[null], undefined>, false>>,
    Expect<Equal<Includes<[undefined], null>, false>>
]

// ============= Your Code Here =============

// T에서 첫 원소를 pop한 뒤 check
type Includes<T extends readonly any[], U> = T extends [infer P, ...infer K]
    ? Equal<P, U> extends true
        ? true
        : Includes<K, U> // 재귀적으로 check
    : false // 모두 체크했음에도 Equal 관계가 없으면 false
