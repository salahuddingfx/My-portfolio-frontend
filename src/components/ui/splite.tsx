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
      setIsMobile(window.innerWidth < 768)
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
 * Optimized for mobile devices with reduced quality and lazy loading.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const isMobile = useIsMobile()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Lazy load based on viewport
  useEffect(() => {
    if (isMobile) {
      // On mobile, delay loading and use smaller viewport
      const timer = setTimeout(() => {
        setShouldLoad(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setShouldLoad(true)
    }
  }, [isMobile])

  // Don't render anything on very small screens
  if (isMobile && typeof window !== 'undefined' && window.innerWidth < 480) {
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
        opacity: isMobile ? 0.7 : 1,
        transform: isMobile ? 'scale(0.8)' : 'scale(1)',
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
