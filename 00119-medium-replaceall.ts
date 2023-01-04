// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
    Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
    Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
    Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
    Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
    Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
    Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
    Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
    Expect<Equal<ReplaceAll<"", "", "">, "">>
]

// ============= Your Code Here =============
type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
> = S extends ""
    ? S
    : From extends ""
    ? S
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${ReplaceAll<R, From, To>}` // 예시를 보니 변경 후에는 재귀적으로 처음부터 확인하는게 아니라 넘어가더라
    : S

type AAA = ReplaceAll<"foobarfoobar", "ob", "b">
