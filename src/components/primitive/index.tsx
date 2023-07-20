import React from 'react'

const NODES = [
  'div',
  'form',
  'nav',
  'img',
  'svg',
  'button',
  'input',
  'label',
  'a',
  'p',
  'span',
  'ul',
  'li',
  'ol',
] as const

type PrimitivePropsWithRef<E extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<E>,
  'children'
> & {
  // for forwardRef
  ref?: React.ForwardedRef<
    HTMLElementTagNameMap[E extends keyof HTMLElementTagNameMap ? E : never]
  >
  // for function-as-child pattern
  children: React.ReactNode | ((props: unknown) => React.ReactNode)
}

type PrimitiveForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>>

type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>
}

type PrimitiveRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref']

const Primitive: Primitives = NODES.reduce((primitive, currentNode) => {
  const node = React.forwardRef(
    <E extends React.ElementType>(
      props: PrimitivePropsWithRef<E>,
      forwardedRef: PrimitiveRef<E>
    ) => {
      const { children } = props
      // any를 넣어주지 않으면 union ts(2590)에러가 발생합니다.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Component: any = currentNode

      return (
        <Component {...props} ref={forwardedRef}>
          {children}
        </Component>
      )
    }
  )

  node.displayName = `Primitive.${currentNode}`

  return { ...primitive, [currentNode]: node }
}, {} as Primitives)

export default Primitive
