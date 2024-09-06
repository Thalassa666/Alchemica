import { useEffect, useRef } from 'react'

/** Навесить на window слушатель события с автоматической отпиской */
export const useWindowEffect = <K extends keyof WindowEventMap>(
  eventName: K,
  callback: (evt: WindowEventMap[K]) => void
) => {
  const callbackRef = useRef(callback)

  /* В ref складываем и обновляем для того, чтобы не мемоизировать коллбэки свыше, а ссылка при этом работала */
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    window.addEventListener(eventName, callbackRef.current)

    return () => {
      window.removeEventListener(eventName, callbackRef.current)
    }
  }, [])
}
