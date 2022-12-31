// ============= Test Cases =============
import type { Alike, Debug, Expect } from "./test-utils"

type cases = [
    Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
    Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
    Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
]

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">

interface Todo1 {
    title: string
    description?: string
    completed: boolean
}

interface Todo2 {
    readonly title: string
    description?: string
    completed: boolean
}

interface Expected {
    readonly title: string
    readonly description?: string
    completed: boolean
}

// ============= Your Code Here =============

// K가 주어지지 않았을 때는 모두 Readonly 처리를 해야 하므로 K의 기본 값을 keyof T로 설정함
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> &
    Omit<T, K>
