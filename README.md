# type-level-typescript  

타입 시스템은 튜링 완전하므로 타입으로 기능을 구현할 수 있다.  
그러나 이상한 묘기를 부릴 필욘 없다. type은 가급적 단순하게 유지될수록 좋다.

## minimal type theory

-   subtype polymorphism
    -   T 타입을 요구하는 곳에 T의 subtype을 타입을 넣어도 type check를 통과합니다.
-   $A \sub B$ A는 B의 subtype, B는 A의 supertype
-   typescript는 structural subtype, 즉, 구조에 의한 서브타입을 지원합니다.
    -   T extends { message: string }과 같은 upper bound를 주었을 때, 별다른 상속 절차 없이도 message 필드를 가지고 값이 string이기만 하면 T는 { message: string }의 서브타입이 됩니다.
-   bottom type은 never, top type은 unknown과 any
    -   any는 독특하게도 top type이지만 모든 타입에서 가능한 동작만 지원한다는 top type의 기본 성질로 제한하는 기능이 없이 모든 동작을 열어 놓습니다.
-   typescript는 flow-sensitive type checking를 지원합니다.
-   함수 타입은 매개 변수의 서브 타입 관계를 역전합니다. 즉, 어떤 타입이 타입 인자의 서브 타입 관계를 뒤집으므로 반공변(contravariance)적입니다.
    -   즉, $A \sub B$일 때 (x: B) => C는 (x: A) => C의 서브타입입니다. 관계가 뒤집힙니다.
-   typescript에서 extends는 upper bound로 작동합니다.
    -   A extends B는 A <: B, 즉, A가 B의 subtype임을 의미합니다.
-   기본적으로 타입을 집합으로써 이해하는 관점이 type-level programming에 유리합니다.

## peano number

튜링 완전하다고 하더라도 실제로 자연수에 대한 사칙연산을 하기 위해서는 peano number에 대한 일부 지식이 일부 요구됩니다.

## Note

```typescript
// never는 bottom type 인데 upper bound로 never를 주면 아무 것도 없게 된다.
// something extends never는 something이 any의 subtype임을 묻는 것인데 정의상 거짓
// never extends something은 never가 something의 subtype임을 묻는 것인데 정의상 참
type ReturnAlwaysFalse<T> = T extends never ? true : false // bottom type의 정의에 따라 항상 false만을 반환하게 됨.

// T | "decoy"가 "decoy"의 subtype이 되려면 T에는 오로지 never만이 허용된다.
// 따라서 never를 감지할 수 있다.
type IsNever<T> = T | "decoy" extends "decoy" ? true : false
```

```typescript
// 976431345 extends 0는 정의상 언제나 거짓이다.
// 그러나 976431345 extends (0 & T) 는 T가 any라면 참이게 된다.
// 참고로, (976431345 extends 0) & T 는 사용 불가하지만, 만약 가능하다면 정의상 언제나 거짓이다. false & true여도 정의상 false이기 때문이다.
type IsAny<T> = 976431345 extends (0 & T) ? true : false
```

```typescript
// -readonly, -? 와 같이 -연산자를 붙여 속성 제거 가능
type Mutable<T extends object> = {
    -readonly [P in keyof T]: T[P] // readonly 제거
}

type Required<T> = {
    [P in keyof T]-?: T[P] // ?(optional) 제거
}
```

```typescript
// ex. 1.
// T는 number의 subtype이고 number도 T의 subtype 이어야 한다.
// 결국 T가 곧 number여야 하며 3, 4와 같은 literal은 받아들일 수 없음.
type OnlyAcceptNumber<T extends number> = number extends T ? true : false

// 반면 아래는 T가 number의 subtype이기만 해도 됨. 3, 4과 같은 literal도 포함이 됨.
type AcceptNumberAndSubtype<T> = T extends number ? true : false

const literalNumber = 3 // literal type. typeof 찍으면 3
let Number = 3 // number typeof 찍으면 number

type AAA = OnlyAcceptNumber<typeof Number> // true.
type AAB = OnlyAcceptNumber<typeof literalNumber> // false.

type BBB = AcceptNumberAndSubtype<typeof Number> // true. number의 서브 타입이기만 하면 됨
type BBC = AcceptNumberAndSubtype<typeof literalNumber> // true. number의 서브 타입이기만 하면 됨

// ex. 2.
// 위의 예시에서와 마찬가지로 string 타입은 "a"와 같은 string literal type을 포함한 슈퍼 타입임.
// 아래와 같이 작성하면 string literal type을 받지 않을 수 있음.
type A<T extends string> = string extends T ? true : false

const a = "a" // "a"
let b = "b" // string

type AA = A<typeof a> // false
type BB = A<typeof b> // true

// ex. 3.
// 위의 두 경우를 좀 더 단순화해서 표현하면 다음과 같다.
type OWT = 1 | 2 | 3
type A<X extends OWT> = OWT extends X ? true : false

type NOPE = A<1> // false
type PASS = A<1 | 2 | 3> // true

// ex 4.
// 더 간단하게 표현하자면 다음과 같다.
// T는 U의 subtype이고 U는 T의 subtype이어야 T = U 라는 것을 체크할 수 있다.
type TypeEqual<T, U> = T extends U ? (U extends T ? true : false) : false
```

```typescript
type Join<T extends string[], U extends string | number> = T extends [
    infer First extends string, // First는 자동으로 string으로 추론되지 않음. 그냥 generic으로 들어와버림. 그래서 upper bound로 막아줘야 함
    ...infer Rest extends string[] // 마찬가지로 Rest도 string[] | string으로 추론되지 않고 generic으로 추론됨.
]
    ? `${First}${Rest["length"] extends 0 ? "" : U}${Join<Rest, U>}`
    : ""
```

```typescript
type Pop<T extends any[]> = T["length"] extends 0
    ? T
    : T extends [...infer A, infer B] // array infer는 spread operator를 사용할 수 있음.
    ? A
    : never
```

```typescript
// {} means "non-nullable any" in TypeScript, not object
type NonNullable<T> = T & {}
```

```typescript
type X<T> = T extends any[] ? true : false // array만 받으렴
type Y<T> = T extends readonly any[] ? true : false // array와 tuple 둘 다 됨. readonly는 일종의 부분집합으로써 작동함.

const array = [1, 2] // number[]로 추론
const tuple = [1, 2] as const // readonly [1, 2]로 추론

type XX = X<typeof array> // true
type XXX = X<typeof tuple> // false

type YY = Y<typeof array> // true
type YYY = Y<typeof tuple> // true

```

```typescript
// https://stackoverflow.com/questions/72127660/explanation-of-rlength-extends-n-syntax-in-typescript
// The type of the length property of a tuple is a literal numeric type
type IsTuple<T> = T extends readonly any[]
    ? number extends T["length"]
        ? false // T is an array
        : true // T is tuple
    : false
```

```typescript
// empty
```

## Notable Projects 

- https://github.com/millsp/ts-toolbelt   
- https://github.com/piotrwitek/utility-types    
- https://github.com/gcanti/fp-ts   
- https://github.com/gvergnaud/ts-pattern   