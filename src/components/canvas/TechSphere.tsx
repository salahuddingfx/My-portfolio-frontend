"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Decal, Environment, ContactShadows } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, RapierRigidBody } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
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
  isActive: boolean;
}

function TechBall({ icon, targetPos, mouseActive, isActive }: TechBallProps) {
  const texture = useSafeTexture(icon);
  const { viewport } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dragStart = useRef(new THREE.Vector3());
  const currentScale = useRef(1);
  const api = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!api.current || !isActive) return;

    // Constrain delta to avoid giant physics jumps
    const dt = Math.min(0.03, delta);

    // 1. Hover Scale
    const targetScale = hovered ? 1.3 : 1;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.15);
    if (meshRef.current) {
      meshRef.current.scale.setScalar(currentScale.current);
    }

    if (isDragging) {
      const mp = new THREE.Vector3(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      );
      api.current.setTranslation({ x: mp.x, y: mp.y, z: 0 }, true);
      api.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    } else {
      const currentPos = api.current.translation();
      const t = state.clock.getElapsedTime();

      // 2. Gentle Central Gravity (pull to center [0,0,0], stronger if far out)
      const toCenter = new THREE.Vector3(-currentPos.x, -currentPos.y, -currentPos.z);
      const distToCenter = toCenter.length();
      
      // We pull slightly stronger on Y to create a nice elliptical school shape, similar to user's vector multiply
      const gravityKX = distToCenter > 5 ? 5.0 : 1.5;
      const gravityKY = distToCenter > 5 ? 12.0 : 4.0;
      
      const pull = new THREE.Vector3(
        toCenter.x * gravityKX * dt,
        toCenter.y * gravityKY * dt,
        toCenter.z * gravityKX * dt
      );

      // 3. Fluid Water Current (dynamic floating waves, unique seed per ball)
      const seed = targetPos[0] * 100 + targetPos[1];
      const waterCurrent = new THREE.Vector3(
        Math.sin(t * 0.4 + seed) * 1.5 * dt,
        Math.cos(t * 0.35 + seed) * 1.5 * dt,
        Math.sin(t * 0.5 + seed) * 0.6 * dt
      );

      // 4. Subtle magnetic repel if mouse gets close but dragging is not active
      let magneticRepel = new THREE.Vector3();
      if (mouseActive) {
        const mousePos = new THREE.Vector3(
          (state.mouse.x * viewport.width) / 2,
          (state.mouse.y * viewport.height) / 2,
          0
        );
        const mouseDiff = new THREE.Vector3(currentPos.x - mousePos.x, currentPos.y - mousePos.y, currentPos.z - mousePos.z);
        const mouseDist = mouseDiff.length();
        
        if (mouseDist < 2.5) {
          const repelForce = 35 / (mouseDist + 0.1); 
          magneticRepel = mouseDiff.normalize().multiplyScalar(repelForce * dt);
        }
      }

      const totalImpulse = pull.add(waterCurrent).add(magneticRepel);
      api.current.applyImpulse({ x: totalImpulse.x, y: totalImpulse.y, z: totalImpulse.z }, true);
    }
  });

  return (
    <RigidBody
      ref={api}
      linearDamping={0.85}
      angularDamping={0.9}
      friction={0.2}
      position={targetPos}
      colliders={false}
      enabledRotations={[false, false, false]}
    >
      <BallCollider args={[1.15]} />
      <mesh
        ref={meshRef}
        castShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          setIsDragging(true);
          dragStart.current.set(e.point.x, e.point.y, 0);
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerOver={() => {
          setHovered(true);
          if (api.current) {
            const forceDirection = {
              x: (Math.random() - 0.5) * 15,
              y: (Math.random() - 0.5) * 15,
              z: (Math.random() - 0.5) * 4
            };
            api.current.setLinvel(forceDirection, true);
          }
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.15, 32, 32]} />
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
          <Decal position={[0, 0, 1.15]} rotation={[0, 0, 0]} scale={[1.9, 1.9, 1.9]}>
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
    </RigidBody>
  );
}

type PointerProps = {
  isActive: boolean;
};

function Pointer({ isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    if (!isActive) {
      ref.current.setNextKinematicTranslation(new THREE.Vector3(100, 100, 100));
      return;
    }
    const targetVec = vec.current.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.0]} />
    </RigidBody>
  );
}

interface TechSphereProps {
  isActive: boolean;
}

const TechSphere = ({ isActive }: TechSphereProps) => {
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
      const x = (col - (cols - 1) / 2) * (isMobile ? 2.4 : 3.2) + (Math.random() - 0.5) * 0.4;
      const y = -(row - (rowsCount - 1) / 2) * (isMobile ? 2.0 : 2.4) + (Math.random() - 0.5) * 0.4;
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
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive && isMouseIn && !isMobile} />
            {activeTechs.map((tech, i) => (
              <TechBall 
                key={tech.name} 
                icon={tech.icon} 
                targetPos={ballPositions[i]} 
                mouseActive={isMouseIn}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment preset="night" />
          <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
        </Suspense>
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechSphere;
