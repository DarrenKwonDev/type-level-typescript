// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils"

type cases = [
    Expect<Equal<IsNever<never>, true>>,
    Expect<Equal<IsNever<never | string>, false>>,
    Expect<Equal<IsNever<"">, false>>,
    Expect<Equal<IsNever<undefined>, false>>,
    Expect<Equal<IsNever<null>, false>>,
    Expect<Equal<IsNever<[]>, false>>,
    Expect<Equal<IsNever<{}>, false>>
]

// ============= Your Code Here =============

// never는 bottom type 인데 upper bound로 never를 주면 아무 것도 없게 된다.
// something extends never는 something이 any의 subtype임을 묻는 것인데 정의상 거짓
// never extends something은 never가 something의 subtype임을 묻는 것인데 정의상 참
type ReturnAlwaysFalse<T> = T extends never ? true : false // bottom type의 정의에 따라 항상 false만을 반환하게 됨.

// T | "decoy"가 "decoy"의 subtype이 되려면 T에는 오로지 never만이 허용된다.
// 따라서 never를 감지할 수 있다.
type IsNever<T> = T | "decoy" extends "decoy" ? true : false
