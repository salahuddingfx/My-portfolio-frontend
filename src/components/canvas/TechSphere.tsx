"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Decal, Environment, ContactShadows } from "@react-three/drei";
import { Physics, useSphere } from "@react-three/cannon";
import * as THREE from "three";

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

const technologies = [
  // UI & Design
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Framer",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framer/framer-original.svg" },
  { name: "GSAP",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/greensock/greensock-original.svg" },
  
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
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Linux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
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
    mass: 1,
    position: targetPos,
    args: [0.85],
    linearDamping: 0.98,
    angularDamping: 0.95,
    allowSleep: false,
    ...props,
  }));

  useFrame((state) => {
    if (!ref.current) return;

    const currentPosArr = ref.current.position.toArray();
    const currentPos = new THREE.Vector3(...currentPosArr);
    const t = state.clock.getElapsedTime();

    // 1. Hover Scale
    const targetScale = hovered ? 1.4 : 1;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.15);
    ref.current.scale.setScalar(currentScale.current);

    // 2. Fluid Return Force
    const floatOffset = new THREE.Vector3(
      Math.sin(t * 0.25 + targetPos[0]) * 0.15,
      Math.cos(t * 0.25 + targetPos[1]) * 0.15,
      Math.sin(t * 0.25 + targetPos[2]) * 0.1
    );
    const target = new THREE.Vector3(...targetPos).add(floatOffset);

    if (isDragging) {
      const mp = new THREE.Vector3((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
      api.position.set(mp.x, mp.y, 0);
      api.velocity.set(0, 0, 0);
    } else {
      if (mouseActive) {
        const mousePos = new THREE.Vector3((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
        const mouseDiff = new THREE.Vector3().subVectors(currentPos, mousePos);
        const mouseDist = mouseDiff.length();
        
        if (mouseDist < 5.0) {
          const repelForce = 240 / (mouseDist + 0.1); 
          api.applyForce(mouseDiff.normalize().multiplyScalar(repelForce).toArray(), [0, 0, 0]);
        }
      }

      const diff = new THREE.Vector3().subVectors(target, currentPos);
      const dist = diff.length();
      
      if (dist > 0.1) {
        const pullStrength = mouseActive ? 15 : 120;
        api.applyForce(diff.normalize().multiplyScalar(dist * pullStrength).toArray(), [0, 0, 0]);
      } else if (!mouseActive && dist < 0.3) {
        api.velocity.set(0, 0, 0);
      }
    }

    api.rotation.set(0, 0, 0);
  });

  return (
    <mesh
      ref={ref as React.RefObject<THREE.Mesh>}
      castShadow
      onPointerDown={(e) => { e.stopPropagation(); setIsDragging(true); dragStart.current.set(e.point.x, e.point.y, 0); }}
      onPointerUp={() => setIsDragging(false)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={()  => setHovered(false)}
    >
      <sphereGeometry args={[0.85, 32, 32]} />
      {/* Creative Frosted Glass Material */}
      <meshPhysicalMaterial
        color={hovered ? "#e8192c" : "#ffffff"}
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
        emissive={hovered ? "#e8192c" : "#000000"}
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

  const ballPositions = useMemo<[number, number, number][]>(() =>
    technologies.map((_, i) => {
      const phi   = Math.acos(-1 + (2 * i) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;
      const r     = 3.4;
      
      const x = r * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.4;
      const y = r * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.4;
      const z = r * Math.cos(phi) + (Math.random() - 0.5) * 0.2;

      return [x, y, z];
    }),
  []);

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
    >
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />

        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 10,  12]} intensity={2} color="#ffffff" />
        <pointLight position={[ 10, -6,  10]} intensity={1.5} color="#e8192c" />
        <spotLight position={[0, 15, 10]} angle={0.2} penumbra={1} intensity={3} castShadow />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} iterations={15}>
            {technologies.map((tech, i) => (
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
