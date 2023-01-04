// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<Trim<"str">, "str">>,
    Expect<Equal<Trim<" str">, "str">>,
    Expect<Equal<Trim<"     str">, "str">>,
    Expect<Equal<Trim<"str   ">, "str">>,
    Expect<Equal<Trim<"     str     ">, "str">>,
    Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
    Expect<Equal<Trim<"">, "">>,
    Expect<Equal<Trim<" \n\t ">, "">>
]

// ============= Your Code Here =============

type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer T}`
    ? TrimLeft<T>
    : S // Left가 " " | "\n" | "\t"가 아니라면 그대로 내보내기

type TrimRight<S extends string> = S extends `${infer T}${" " | "\n" | "\t"}`
    ? TrimRight<T>
    : S

type Trim<S extends string> = TrimLeft<TrimRight<S>>
