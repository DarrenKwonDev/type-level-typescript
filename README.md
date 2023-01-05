# type-challenges

타입 시스템은 튜링 완전하므로 타입으로 기능을 구현할 수 있다.

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
// -readonly, -? 와 같이 -연산자를 붙여 속성 제거 가능
type Mutable<T extends object> = {
    -readonly [P in keyof T]: T[P] // readonly 제거
}

type Required<T> = {
    [P in keyof T]-?: T[P] // ?(optional) 제거
}
```

```typescript
// T는 number의 subtype이고 number도 T의 subtype 이어야 한다.
// 결국 T가 곧 number여야 하며 3, 4와 같은 literal은 받아들일 수 없음.
type OnlyAcceptNumber<T extends number> = number extends T ? true : false

// 반면 아래는 T가 number의 subtype이기만 해도 됨. 3, 4과 같은 literal도 포함이 됨.
type AcceptNumberAndSubtype<T> = T extends number ? true : false

const literalNumber = 3 // literal type
let Number = 3 // number

type AAA = OnlyAcceptNumber<typeof Number> // true. typeof dummy2는 number로 추론됨.
type AAB = OnlyAcceptNumber<typeof literalNumber> // false. typeof dummy는 3으로 추론됨. number 가 아님

type BBB = AcceptNumberAndSubtype<typeof Number> // true. number의 서브 타입이기만 하면 됨
type BBC = AcceptNumberAndSubtype<typeof literalNumber> // true. number의 서브 타입이기만 하면 됨
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
// empty
```
