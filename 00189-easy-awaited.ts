// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
    Expect<Equal<MyAwaited<X>, string>>,
    Expect<Equal<MyAwaited<Y>, { field: number }>>,
    Expect<Equal<MyAwaited<Z>, string | number>>,
    Expect<Equal<MyAwaited<Z1>, string | boolean>>,
    Expect<Equal<MyAwaited<T>, number>>
]

type error = MyAwaited<number>

// ============= Your Code Here =============
type MyAwaited<T> = T extends object & {
    then(onResolveFunc: infer F, ...args: infer _): any
}
    ? F extends (value: infer V, ...args: infer _) => any
        ? MyAwaited<V>
        : never
    : T

/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
type Awaited<T> = T extends null | undefined
    ? T // strickNullChecks가 활성화되지 않아 null | undefined가 들어온 경우 타입을 그대로 돌려줌
    : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // Await 타입은 object이면서 동시에 then을 호출할 수 있어야 함
    ? F extends (value: infer V, ...args: infer _) => any // resolve 함수가 반환하는 첫번째 값
        ? Awaited<V> // recursively unwrap the value
        : never // the argument to `then` was not callable
    : T // non-object or non-thenable이면 그대로 반환. 이 타입의 재귀에서 base case가 됨
