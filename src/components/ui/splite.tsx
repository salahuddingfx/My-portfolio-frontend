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
 *   1. IntersectionObserver waits until the element is near the viewport.
 *   2. requestIdleCallback (or a 500ms fallback) defers mount until the browser
 *      is idle — after FCP and LCP have already been measured.
 *   3. The parent component's decorative glows/blobs are shown as a fallback
 *      while Spline loads, so there is no layout shift.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldMount, setShouldMount] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scheduleMount = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        // Cast needed because TS doesn't include requestIdleCallback types by default
        ;(window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
          .requestIdleCallback(() => setShouldMount(true), { timeout: 2000 })
      } else {
        // Safari / older browsers — short delay still lets FCP/LCP paint first
        setTimeout(() => setShouldMount(true), 500)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          scheduleMount()
        }
      },
      // Start loading a little before it's actually visible
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
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
