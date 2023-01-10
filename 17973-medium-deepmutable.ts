// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

interface Test1 {
    readonly title: string
    readonly description: string
    readonly completed: boolean
    readonly meta: {
        readonly author: string
    }
}
type Test2 = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
        readonly d: boolean
        readonly e: {
            readonly g: {
                readonly h: {
                    readonly i: true
                    readonly j: "s"
                }
                readonly k: "hello"
            }
            readonly l: readonly [
                "hi",
                {
                    readonly m: readonly ["hey"]
                }
            ]
        }
    }
}
interface DeepMutableTest1 {
    title: string
    description: string
    completed: boolean
    meta: {
        author: string
    }
}

type DeepMutableTest2 = {
    a: () => 1
    b: string
    c: {
        d: boolean
        e: {
            g: {
                h: {
                    i: true
                    j: "s"
                }
                k: "hello"
            }
            l: [
                "hi",
                {
                    m: ["hey"]
                }
            ]
        }
    }
}

type cases = [
    Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
    Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>
]

type errors = [DeepMutable<"string">, DeepMutable<0>]

// ============= Your Code Here =============

// dull answer
type DeepMutable<T> = T extends Function
    ? T
    : {
          -readonly [P in keyof T]: DeepMutable<T[P]>
      }

// much better
type DeepMutable2<T> = T extends object
    ? {
          -readonly [P in keyof T]: DeepMutable<T[P]>
      }
    : T
