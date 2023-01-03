// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
    Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
    Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
    Expect<Equal<Join<["o"], "u">, "o">>
]

// ============= Your Code Here =============
type Join<T extends string[], U extends string | number> = T extends [
    infer First extends string, // T가 string[]이라 해서 First는 자동으로 string으로 추론되지 않음. 그냥 generic으로 들어와버림. 그래서 upper bound로 막아줘야 함
    ...infer Rest extends string[] // 마찬가지로 Rest도 string[]으로 추론되지 않고 generic으로 추론됨.
]
    ? `${First}${Rest["length"] extends 0 ? "" : U}${Join<Rest, U>}`
    : ""

type AAA = Join<["a", "p", "p", "l", "e"], "-">

type Test<T extends string[]> = T extends [infer A, ...infer R] ? A : ""

type T_1 = Test<["1", "2"]>
