/**
 * @description
 * 기존 타입에 children을 누락하고, 함수형 children을 제공합니다.
 * P를 통해 전달할 props 타입을 설정할 수 있습니다.
 */
export type FunctionAsChildren<T, P = unknown> = Omit<T, 'children'> & {
  children: React.ReactNode | ((...props: P[]) => React.ReactNode)
}
