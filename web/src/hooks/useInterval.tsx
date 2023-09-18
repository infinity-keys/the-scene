import { useRef, useEffect } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const intervalRef = useRef<number>()
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay)
      return () => window.clearInterval(intervalRef.current)
    }
  }, [delay])

  return intervalRef
}
