export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T


// 근데 이게 더 자세한 것 같기도 https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
// export type Equals<X, Y> =
//     (<T>() => T extends X ? 1 : 2) extends
//     (<T>() => T extends Y ? 1 : 2) ? true : false;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
    T
>() => T extends Y ? 1 : 2
    ? true
    : false

// https://www.hacklewayne.com/dependent-types-in-typescript-seriously
type TypeEqual<T, U> = T extends U ? U extends T ? true : false : false;

// T | "decoy"가 "decoy"의 subtype이 되려면 T에는 오로지 never만이 허용된다.
// 따라서 never를 감지할 수 있다.
export type IsNever<T> = T | "decoy" extends "decoy" ? true : false


export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false
export type NotAny<T> = true extends IsAny<T> ? false : true

export type Debug<T> = { [K in keyof T]: T[K] }
export type MergeInsertions<T> = T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
    ? true
    : false
export type ExpectValidArgs<
    FUNC extends (...args: any[]) => any,
    ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false

export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never
