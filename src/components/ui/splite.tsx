'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'

// Lazy-load the Spline runtime — deferred further by IntersectionObserver below
const SplineComponent = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * SplineScene — performance-safe wrapper around @splinetool/react-spline.
 *
 * Problem: Spline fetches ~1.3 MB (scene.splinecode + process.wasm) on mount,
 * blocking the main thread for several seconds and destroying LCP/TBT.
 *
 * Solution:
 *   1. IntersectionObserver waits until the element is in the viewport (rootMargin:0px).
 *   2. requestIdleCallback (or a 1500ms fallback) defers mount until the browser
 *      is genuinely idle — after FCP and LCP have already been measured.
 *   3. The parent component's decorative glows/blobs are shown as a fallback
 *      while Spline loads, so there is no layout shift.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldMount, setShouldMount] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof window === 'undefined') return

    let cancelled = false
    let timeoutId: number | undefined

    const scheduleMount = () => {
      const mount = () => {
        if (!cancelled) setShouldMount(true)
      }

      timeoutId = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          ;(window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
            .requestIdleCallback(mount, { timeout: 4000 })
        } else {
          mount()
        }
      }, 1800)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          scheduleMount()
        }
      },
      // rootMargin: 0px — only trigger when actually visible, not pre-fetched
      { rootMargin: '0px' }
    )

    observer.observe(el)
    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {shouldMount && (
        <Suspense fallback={null}>
          <SplineComponent scene={scene} className={className} />
        </Suspense>
      )}
    </div>
  )
}
