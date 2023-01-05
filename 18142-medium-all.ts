// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<All<[1, 1, 1], 1>, true>>,
    Expect<Equal<All<[1, 1, 2], 1>, false>>,
    Expect<Equal<All<["1", "1", "1"], "1">, true>>,
    Expect<Equal<All<["1", "1", "1"], 1>, false>>,
    Expect<Equal<All<[number, number, number], number>, true>>,
    Expect<Equal<All<[number, number, string], number>, false>>,
    Expect<Equal<All<[null, null, null], null>, true>>,
    Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
    Expect<Equal<All<[{}, {}, {}], {}>, true>>
]

// ============= Your Code Here =============

// [1, 1, 1] 이라면 T[number]는 1 | 1 | 1 유니언 타입(즉 , 1)이고, K는 1을 준다면 같은 타입이므로 subtype으로도 인정된다.
// [1, 1, 2] 이라면 T[number]는 1 | 1 | 2 유니언 타입(1 | 2)이고, K가 1 이라면 이는 서브타입이 아니게 되므로 false
type All<T extends any[], K> = T[number] extends K ? true : false
