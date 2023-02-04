// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<IsUnion<string>, false>>,
    Expect<Equal<IsUnion<string | number>, true>>,
    Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
    Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
    Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
    Expect<Equal<IsUnion<{ a: string | number }>, false>>,
    Expect<Equal<IsUnion<[string | number]>, false>>,
    // Cases where T resolves to a non-union type.
    Expect<Equal<IsUnion<string | never>, false>>,
    Expect<Equal<IsUnion<string | unknown>, false>>,
    Expect<Equal<IsUnion<string | any>, false>>,
    Expect<Equal<IsUnion<string | "a">, false>>,
    Expect<Equal<IsUnion<never>, false>>
]

// ============= Your Code Here =============
type IsUnion<T, K = T> = [T] extends [never] // T가 never이면 false
    ? false
    : T extends T // distribution
    ? [K] extends [T] // 여기의 K는 본래 타입, T는 distribution된 각각의 타입을 의미함.
        ? false // [K] extends [T] 라는 것은 애초에 T가 union이 아니었음을 의미한다.
        : true // K와 T가 다르다는 것은 T가 distribute 되어서 본래 union이었을 터인 K와 달라졌음을 의미힌다.
    : never
