// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>]

type X = {
    a: () => 22
    b: string
    c: {
        d: boolean
        e: {
            g: {
                h: {
                    i: true
                    j: "string"
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

type Expected = {
    readonly a: () => 22
    readonly b: string
    readonly c: {
        readonly d: boolean
        readonly e: {
            readonly g: {
                readonly h: {
                    readonly i: true
                    readonly j: "string"
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

// ============= Your Code Here =============

// dull answer
type DeepReadonly<T> = T extends Function
    ? T
    : {
          readonly [P in keyof T]: DeepReadonly<T[P]>
      }

// good answer but check not accept
type DeepReadonly2<T> = T extends object
    ? {
          readonly [P in keyof T]: DeepReadonly<T[P]>
      }
    : T
