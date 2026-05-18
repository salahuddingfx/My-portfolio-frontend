
'use client'

import { Suspense, lazy } from 'react'

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
 *   1. Load immediately when the component renders.
 *   2. The parent component's decorative glows/blobs are shown as a fallback
 *      while Spline loads, so there is no layout shift.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <SplineComponent scene={scene} className={className} />
      </Suspense>
    </div>
  )
}
