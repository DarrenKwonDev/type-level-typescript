// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<
        Equal<
            Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
            [{ foo: "bar"; 2: 10 }, "foobar"]
        >
    >
]

// ============= Your Code Here =============
type Flatten<T extends any[]> = T extends [infer A, ...infer Rest]
    ? A extends any[]
        ? Flatten<[...Flatten<A>, ...Flatten<Rest>]> // 첫 원소가 배열이면 Flatten 처리 + Rest도 Flatten 처리
        : [A, ...Flatten<Rest>] // 첫 원소가 배열 아니라면 나머지 Flatten 처리
    : [] // A가 없다는 것이니 그냥 빈 배열

type AA = Flatten<[[1], 2]>
type AAA = Flatten<[1, [2]]>
type BBB = Flatten<[1, 2, 3, 4]>
type CCC = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>
type DDD = Flatten<[]>
