// components/SmoothScroll.jsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // autoRaf lets Lenis run (and stop) its own animation loop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    })

    // Shared so in-page links can scroll through Lenis (see utils/smoothScroll.js)
    window.lenis = lenis

    return () => {
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}
