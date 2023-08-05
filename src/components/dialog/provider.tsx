'use client'

import React from 'react'

type DialogAction = {
  onToggle: () => void
  onClose: () => void
}

type DialogValue = {
  isOpen: boolean
  portalId: PortalId
}

const DialogActionContext = React.createContext<DialogAction | null>(null)
const DialogValueContext = React.createContext<DialogValue | null>(null)

type DialogContextProviderProps = {
  children: React.ReactNode
  open: DialogValue['isOpen']
  portalId: DialogValue['portalId']
}

const DialogContextProvider = ({
  children,
  open,
  portalId,
}: DialogContextProviderProps) => {
  const [isOpen, setIsOpen] = React.useState<DialogValue['isOpen']>(
    open || false
  )

  const onToggle = React.useCallback<DialogAction['onToggle']>(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onClose = React.useCallback<DialogAction['onClose']>(() => {
    setIsOpen(false)
  }, [])

  const action = React.useMemo<DialogAction>(
    () => ({
      onToggle,
      onClose,
    }),
    [onToggle, onClose]
  )

  const value = React.useMemo<DialogValue>(
    () => ({
      isOpen,
      portalId,
    }),
    [isOpen, portalId]
  )

  return (
    <DialogActionContext.Provider value={action}>
      <DialogValueContext.Provider value={value}>
        {children}
      </DialogValueContext.Provider>
    </DialogActionContext.Provider>
  )
}

export default DialogContextProvider
export { DialogActionContext, DialogValueContext }
export type { DialogAction, DialogValue }
