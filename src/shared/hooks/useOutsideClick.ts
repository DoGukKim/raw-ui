import { type RefObject, useEffect } from 'react'

type UseOutsideClickParam = {
  targetRef: RefObject<HTMLElement>
  callback: () => void
}

const useOutsideClick = ({ targetRef, callback }: UseOutsideClickParam) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const clickTarget = e.target
      if (
        clickTarget instanceof Element &&
        targetRef.current &&
        !targetRef.current.contains(clickTarget)
      ) {
        callback()
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => document.body.addEventListener('click', handleClick)
  }, [targetRef, callback])
}

export default useOutsideClick
