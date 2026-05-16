'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <section className="section-shell">
      <div className="container mx-auto">
        <div className="premium-card w-full h-[500px] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full flex-col md:flex-row">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-display uppercase tracking-tighter">
                Interactive 3D
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg section-copy">
                Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
                that capture attention and enhance your design.
              </p>
            </div>

            {/* Right content */}
            <div className="flex-1 relative min-h-[300px]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
