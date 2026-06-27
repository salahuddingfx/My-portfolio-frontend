'use client'

import { Suspense, lazy, useState, useEffect } from 'react'

// Lazy-load the Spline runtime
const SplineComponent = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 border-[3px] border-[#000000] bg-[var(--surface)] shadow-[3px_3px_0px_#000000] animate-pulse"
          style={{ borderRadius: "var(--radius-md)" }}
        />
      </div>
    </div>
  )
}

/**
 * SplineScene — performance-safe wrapper around @splinetool/react-spline.
 * Disabled on mobile/tablet viewports (< 1024px) for buttery smooth performance.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const isMobile = useIsMobile()
  const [shouldLoad, setShouldLoad] = useState(false)

  // Only load Spline on desktop screens
  useEffect(() => {
    const isMobileViewport = window.innerWidth < 1024
    if (isMobileViewport) {
      return
    }
    setShouldLoad(true)
  }, [])

  if (isMobile) {
    return null
  }

  if (!shouldLoad) {
    return <SplineLoader />
  }

  return (
    <div 
      className={className} 
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: 1,
        transform: 'scale(1)',
        transition: 'opacity 0.5s, transform 0.5s'
      }}
    >
      <Suspense fallback={<SplineLoader />}>
        <SplineComponent 
          scene={scene} 
          className={className}
        />
      </Suspense>
    </div>
  )
}
