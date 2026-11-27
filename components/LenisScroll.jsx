// components/SmoothScroll.jsx
'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // People who ask for reduced motion keep the browser's normal scrolling
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis
    let cancelled = false

    // Lenis is loaded once the browser is idle, so it stays out of the first paint.
    // Until then, in-page links scroll natively (see utils/smoothScroll.js).
    const start = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return
      // autoRaf lets Lenis run (and stop) its own animation loop
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoRaf: true,
      })
      // Shared so in-page links can scroll through Lenis (see utils/smoothScroll.js)
      window.lenis = lenis
    }

    const idle =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 500)

    return () => {
      cancelled = true
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      lenis?.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}
