'use client'

import React from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: React.ReactNode
  id: Element['id']
}

const Portal = ({ children, id }: PortalProps) => {
  const ref = React.useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
    const portalRootContainer = document.getElementById('portal-root-container')
    const portalContainer = document.getElementById(id)

    if (!portalContainer && portalRootContainer) {
      const newPortalContainer = document.createElement('div')
      newPortalContainer.setAttribute('id', id)
      portalRootContainer.appendChild(newPortalContainer)

      ref.current = newPortalContainer
      return
    }

    ref.current = portalContainer

    return () => {
      if (!portalContainer && portalRootContainer && ref.current) {
        portalRootContainer.removeChild(ref.current)
      }
    }
  }, [id])

  return !ref.current || !mounted ? null : createPortal(children, ref.current)
}

export default Portal
export type { PortalProps }
