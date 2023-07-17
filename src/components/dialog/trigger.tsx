import Primitive from '../primitive'
import { FunctionAsChildren } from '@/shared/types/render'

type DialogTriggerProps = FunctionAsChildren<
  React.ComponentProps<typeof Primitive.button>
>

const DialogTrigger = ({
  children,
  ...dialogTriggerProps
}: DialogTriggerProps) => {
  if (typeof children === 'function') {
    // TODO: passing props
    return children()
  }

  return <Primitive.button {...dialogTriggerProps}>{children}</Primitive.button>
}

export default DialogTrigger
