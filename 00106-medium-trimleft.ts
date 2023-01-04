// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<TrimLeft<"str">, "str">>,
    Expect<Equal<TrimLeft<" str">, "str">>,
    Expect<Equal<TrimLeft<"     str">, "str">>,
    Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
    Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
    Expect<Equal<TrimLeft<"">, "">>,
    Expect<Equal<TrimLeft<" \n\t">, "">>
]

// ============= Your Code Here =============

type TrimLeft<S extends string> = S extends `${infer Left}${infer T}`
    ? Left extends " " | "\n" | "\t"
        ? TrimLeft<T>
        : S // Left가 " " | "\n" | "\t"가 아니라면 그대로 내보내기
    : S // Left가 " " | "\n" | "\t"가 아니라면 그대로 내보내기

type AAA = TrimLeft<"     str     ">
