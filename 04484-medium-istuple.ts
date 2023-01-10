// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<IsTuple<[]>, true>>, // 빈 배열이라는 튜플 타입
    Expect<Equal<IsTuple<[number]>, true>>, // number 원소 하나만 가지는 튜플 타입
    Expect<Equal<IsTuple<readonly [1]>, true>>,
    Expect<Equal<IsTuple<{ length: 1 }>, false>>,
    Expect<Equal<IsTuple<number[]>, false>>, // number의 배열
    Expect<Equal<IsTuple<never>, false>>
]

// ============= Your Code Here =============
type IsTuple<T> = T | 0 extends 0
    ? false
    : T extends readonly any[]
    ? number extends T["length"]
        ? false
        : true
    : false

type X<T> = T extends any[] ? true : false // array만 받으렴
type Y<T> = T extends readonly any[] ? true : false // array와 tuple 둘 다 됨. readonly는 일종의 부분집합으로써 작동함.

const array = [1, 2] // number[]로 추론
const tuple = [1, 2] as const // readonly [1, 2]로 추론

type XX = X<typeof array> // true
type XXX = X<typeof tuple> // false

type YY = Y<typeof array> // true
type YYY = Y<typeof tuple> // true

type IsTuple2<T> = T extends readonly any[]
    ? number extends T["length"]
        ? false // T is an array
        : true // T is tuple
    : false

type A = IsTuple2<typeof tuple>
