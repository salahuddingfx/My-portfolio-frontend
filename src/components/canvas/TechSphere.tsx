"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Decal, Environment, ContactShadows } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import * as THREE from "three";

// Silence library-level Three.js deprecation/multiple import warnings that we cannot control
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      (args[0].toString().includes("THREE.Clock") ||
       args[0].toString().includes("THREE.Timer") ||
       args[0].toString().includes("Three.js being imported"))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

/* ─── Custom Hook to safely load SVGs as Textures ─── */
function useSafeTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        
        svgElement.setAttribute("width", "512");
        svgElement.setAttribute("height", "512");
        
        const serialized = new XMLSerializer().serializeToString(svgDoc);
        const blob = new Blob([serialized], { type: "image/svg+xml" });
        const blobUrl = URL.createObjectURL(blob);
        
        const loader = new THREE.TextureLoader();
        loader.load(blobUrl, (tex) => {
          if (isMounted) {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
            setTexture(tex);
          }
          URL.revokeObjectURL(blobUrl);
        });
      })
      .catch((err) => console.error("Error loading tech icon:", err));

    return () => { isMounted = false; };
  }, [url]);

  return texture;
}

export const technologies = [
  // UI & Design
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Photoshop",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
  { name: "Adobe XD",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg" },
  { name: "Framer",     icon: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/framer.svg" },
  { name: "GSAP",       icon: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/greensock.svg" },
  
  // Frontend
  { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JS",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Astro",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg" },
  
  // Backend
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Django",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "GraphQL",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  
  // Database & DevOps
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Prisma",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/prisma/prisma-original.svg" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Vercel",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/vercel/vercel-original.svg" },
  { name: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Linux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Postman",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
];

interface TechBallProps {
  icon: string;
  targetPos: [number, number, number];
  mouseActive: boolean;
  [key: string]: unknown;
}

function TechBall({ icon, targetPos, mouseActive, ...props }: TechBallProps) {
  const texture = useSafeTexture(icon);
  const { viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered]       = useState(false);
  const dragStart = useRef(new THREE.Vector3());
  const currentScale = useRef(1);

  const [ref, api] = useSphere(() => ({
    mass: 1.2,
    position: targetPos,
    args: [0.85],
    linearDamping: 0.88, // Water-like viscosity (heavy fluid drag)
    angularDamping: 0.9,
    allowSleep: false,
    ...props,
  }));

  useFrame((state) => {
    if (!ref.current) return;

    const currentPosArr = ref.current.position.toArray();
    const currentPos = new THREE.Vector3(...currentPosArr);
    const t = state.clock.getElapsedTime();

    // 1. Hover Scale
    const targetScale = hovered ? 1.3 : 1;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.15);
    ref.current.scale.setScalar(currentScale.current);

    if (isDragging) {
      const mp = new THREE.Vector3((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
      api.position.set(mp.x, mp.y, 0);
      api.velocity.set(0, 0, 0);
    } else {
      // 2. Gentle Central Gravity (rubber-band pull to center [0,0,0] like fish staying in a school)
      const center = new THREE.Vector3(0, 0, 0);
      const toCenter = new THREE.Vector3().subVectors(center, currentPos);
      const distToCenter = toCenter.length();

      // Stronger elastic pull if they drift too far out to contain them in the viewport
      const gravityK = distToCenter > 5 ? 3.5 : 1.2;
      const pull = toCenter.clone().normalize().multiplyScalar(distToCenter * gravityK);
      api.applyForce(pull.toArray(), [0, 0, 0]);

      // 3. Fluid Water Current (dynamic floating waves, unique seed per ball)
      const seed = targetPos[0] * 100 + targetPos[1];
      const waterCurrent = new THREE.Vector3(
        Math.sin(t * 0.4 + seed) * 1.8,
        Math.cos(t * 0.35 + seed) * 1.8,
        Math.sin(t * 0.5 + seed) * 0.8
      );
      api.applyForce(waterCurrent.toArray(), [0, 0, 0]);

      // 4. Subtle magnetic repel if mouse gets close
      if (mouseActive) {
        const mousePos = new THREE.Vector3((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
        const mouseDiff = new THREE.Vector3().subVectors(currentPos, mousePos);
        const mouseDist = mouseDiff.length();
        
        if (mouseDist < 2.5) {
          const repelForce = 50 / (mouseDist + 0.1); 
          api.applyForce(mouseDiff.normalize().multiplyScalar(repelForce).toArray(), [0, 0, 0]);
        }
      }
    }

    // Keep it rotationally locked
    api.rotation.set(0, 0, 0);
  });

  return (
    <mesh
      ref={ref as React.RefObject<THREE.Mesh>}
      castShadow
      onPointerDown={(e) => { e.stopPropagation(); setIsDragging(true); dragStart.current.set(e.point.x, e.point.y, 0); }}
      onPointerUp={() => setIsDragging(false)}
      onPointerOver={() => {
        setHovered(true);
        // 8-ball pool shot break scatter! Explode away from cursor in random/outward directions
        if (ref.current) {
          const forceDirection = new THREE.Vector3(
            (Math.random() - 0.5) * 22,
            (Math.random() - 0.5) * 22,
            (Math.random() - 0.5) * 6
          );
          api.velocity.set(forceDirection.x, forceDirection.y, forceDirection.z);
        }
      }}
      onPointerOut={()  => setHovered(false)}
    >
      <sphereGeometry args={[0.85, 32, 32]} />
      {/* Creative Frosted Glass Material */}
      <meshPhysicalMaterial
        color={hovered ? "#9333ea" : "#ffffff"}
        transmission={0.95}
        thickness={0.5}
        roughness={0.08}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0}
        ior={1.5}
        attenuationColor="#ffffff"
        attenuationDistance={0.5}
        emissive={hovered ? "#9333ea" : "#000000"}
        emissiveIntensity={hovered ? 0.6 : 0}
      />
      
      {texture && (
        <Decal position={[0, 0, 0.85]} rotation={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
          <meshStandardMaterial 
            map={texture} 
            transparent 
            polygonOffset 
            polygonOffsetFactor={-10} 
            roughness={0.1} 
            metalness={0.1} 
          />
        </Decal>
      )}
    </mesh>
  );
}

const TechSphere = () => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeTechs = useMemo(() => {
    // Show top 12 primary technologies on mobile viewports for fluid 120 FPS performance,
    // and full 30 technologies on desktop.
    return isMobile ? technologies.slice(0, 12) : technologies;
  }, [isMobile]);

  const ballPositions = useMemo<[number, number, number][]>(() => {
    // Arrange in 4 columns on mobile so it fits perfectly on narrow screens, and 6 columns on desktop.
    const cols = isMobile ? 4 : 6;
    const rowsCount = Math.ceil(activeTechs.length / cols);
    return activeTechs.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Compute standard grid coordinates with responsive offsets
      const x = (col - (cols - 1) / 2) * (isMobile ? 2.1 : 2.8) + (Math.random() - 0.5) * 0.4;
      const y = -(row - (rowsCount - 1) / 2) * (isMobile ? 1.7 : 2.0) + (Math.random() - 0.5) * 0.4;
      const z = (Math.random() - 0.5) * 1.0;

      return [x, y, z];
    });
  }, [activeTechs, isMobile]);

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
    >
      <Canvas
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0, 16.8], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 16.8]} fov={45} />

        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 10,  12]} intensity={2} color="#ffffff" />
        <pointLight position={[ 10, -6,  10]} intensity={1.5} color="#9333ea" />
        <spotLight position={[0, 15, 10]} angle={0.2} penumbra={1} intensity={3} castShadow />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} iterations={15}>
            {activeTechs.map((tech, i) => (
              <TechBall 
                key={tech.name} 
                icon={tech.icon} 
                targetPos={ballPositions[i]} 
                mouseActive={isMouseIn}
              />
            ))}
          </Physics>
          <Environment preset="night" />
          <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechSphere;
