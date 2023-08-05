import React from 'react'

import { FunctionAsChildren } from '@/shared/types/render'

import Portal from '../portal'
import Primitive from '../primitive'
import useSafeContext from '@/shared/hooks/useSafeContext'
import { DialogValueContext } from './provider'

type DialogPanelProps = FunctionAsChildren<
  React.ComponentProps<(typeof Primitive)['div']>
>

const DialogPanel = React.forwardRef<HTMLDivElement, DialogPanelProps>(
  ({ children, ...dialogPanelProps }, forwardedRef) => {
    const { isOpen, portalId } = useSafeContext(DialogValueContext)

    if (typeof children === 'function') {
      return <Portal id={portalId}>{children({})}</Portal>
    }

    return (
      <Portal id={portalId}>
        {isOpen && (
          <Primitive.div {...dialogPanelProps} ref={forwardedRef}>
            {children}
          </Primitive.div>
        )}
      </Portal>
    )
  }
)

DialogPanel.displayName = DialogPanel.name

export default DialogPanel
