// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils"

declare const a: Chainable

const result1 = a
    .option("foo", 123)
    .option("bar", { value: "Hello World" })
    .option("name", "type-challenges")
    .get()

const result2 = a
    .option("name", "another name")
    // @ts-expect-error
    .option("name", "last name")
    .get()

const result3 = a
    .option("name", "another name")
    // @ts-expect-error
    .option("name", 123)
    .get()

type cases = [
    Expect<Alike<typeof result1, Expected1>>,
    Expect<Alike<typeof result2, Expected2>>,
    Expect<Alike<typeof result3, Expected3>>
]

type Expected1 = {
    foo: number
    bar: {
        value: string
    }
    name: string
}

type Expected2 = {
    name: string
}

type Expected3 = {
    name: number
}

// ============= Your Code Here =============
type Chainable<O extends { [key: PropertyKey]: unknown } = {}> = {
    option<K extends PropertyKey, V>(
        key: K extends keyof O ? (V extends O[K] ? never : K) : K, // 이미 해당 키의 해당 프로퍼티가 존재하는 경우 선언 불가하게 해야 함.
        value: V
    ): Chainable<O & { [P in K]: V }>
    get(): O
}

// https://ghaiklor.github.io/type-challenges-solutions/en/medium-chainable-options.html
type SimpleChain<O extends { [key: PropertyKey]: unknown } = {}> = {
    option<K extends PropertyKey, V>(
        key: K,
        value: V
    ): Chainable<O & { [P in K]: V }>
    get(): O
}

declare const b: Chainable
