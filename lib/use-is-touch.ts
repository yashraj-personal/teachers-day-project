"use client"

import { useEffect, useState } from "react"

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)")
    setIsTouch(query.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    query.addEventListener("change", handler)
    return () => query.removeEventListener("change", handler)
  }, [])

  return isTouch
}
