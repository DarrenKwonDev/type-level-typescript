// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"
import { ExpectFalse, NotEqual } from "./test-utils"

let x = 1 // number -> 걸러내야 함
let y = 1 as const // 1 literal type

type cases1 = [
    Expect<Equal<Integer<1>, 1>>,
    Expect<Equal<Integer<1.1>, never>>,
    Expect<Equal<Integer<1.0>, 1>>,
    Expect<Equal<Integer<typeof x>, never>>,
    Expect<Equal<Integer<typeof y>, 1>>
]

// ============= Your Code Here =============

type Integer<T extends number> = number extends T
    ? never // number 타입은 never로 걸러야함. 우린 숫자 리터럴을 받는게 목적
    : `${T}` extends `${infer I}.${infer Rest}`
    ? Rest extends 0
        ? I
        : never
    : T

// T는 number의 subtype이고 number도 T의 subtype 이어야 한다.
// 결국 T가 곧 number여야 하며 3, 4와 같은 literal은 받아들일 수 없음.
type OnlyAcceptNumber<T extends number> = number extends T ? true : false

// 반면 아래는 T가 number의 subtype이기만 해도 됨. 3, 4과 같은 literal도 포함이 됨.
type AcceptNumberAndSubtype<T> = T extends number ? true : false

const literalNumber = 3 // literal type
let Number = 3 // number

type AAA = OnlyAcceptNumber<typeof Number> // true. typeof dummy2는 number로 추론됨.
type AAB = OnlyAcceptNumber<typeof literalNumber> // false. typeof dummy는 3으로 추론됨. number 가 아님

type BBB = AcceptNumberAndSubtype<typeof Number> // true. number의 서브 타입이기만 하면 됨
type BBC = AcceptNumberAndSubtype<typeof literalNumber> // true. number의 서브 타입이기만 하면 됨
