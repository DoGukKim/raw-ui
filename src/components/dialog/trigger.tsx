import React from 'react'

import { FunctionAsChildren } from '@/shared/types/render'

import {
  DialogActionContext,
  DialogValue,
  DialogValueContext,
} from './provider'

import Primitive from '../primitive'
import useSafeContext from '@/shared/hooks/useSafeContext'

type DialogTriggerProps = FunctionAsChildren<
  React.ComponentProps<(typeof Primitive)['button']>,
  { isOpen: DialogValue['isOpen'] }
>

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, ...dialogTriggerProps }, forwardedRef) => {
    const { onToggle } = useSafeContext(DialogActionContext)
    const { isOpen } = useSafeContext(DialogValueContext)

    if (typeof children === 'function') {
      return children({ isOpen })
    }

    return (
      <Primitive.button
        {...dialogTriggerProps}
        ref={forwardedRef}
        onClick={onToggle}
      >
        {children}
      </Primitive.button>
    )
  }
)

DialogTrigger.displayName = DialogTrigger.name

export default DialogTrigger
