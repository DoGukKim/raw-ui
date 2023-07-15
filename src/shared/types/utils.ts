export type CombineObjectType<T, K> = FlatObject<
  Omit<T, keyof K> & {
    [P in keyof K]: K[P]
  }
>

export type FlatObject<T> = { [P in keyof T]: T[P] }
