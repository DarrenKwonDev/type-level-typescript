// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<IsAny<any>, true>>,

    Expect<Equal<IsAny<undefined>, false>>,
    Expect<Equal<IsAny<unknown>, false>>,
    Expect<Equal<IsAny<never>, false>>,
    Expect<Equal<IsAny<string>, false>>
]

// ============= Your Code Here =============

// 976431345 extends 0는 정의상 언제나 거짓이다.
// 그러나 976431345 extends (0 & T) 는 T가 any라면 참이게 된다.
// 참고로, (976431345 extends 0) & T 는 정의상 언제나 거짓이다. false & true여도 정의상 false이기 때문이다.
type IsAny<T> = 976431345 extends 0 & T ? true : false
