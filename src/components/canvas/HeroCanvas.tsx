"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { PerspectiveCamera, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Premium Digital Globe ─── */
function DigitalGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  const arcs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 18; i++) {
      const radius = 5.2;
      const startPhi = Math.random() * Math.PI * 2;
      const startTheta = Math.random() * Math.PI;
      const endPhi = startPhi + (Math.random() - 0.5) * 1.5;
      const endTheta = startTheta + (Math.random() - 0.5) * 1.5;
      
      const start = new THREE.Vector3().setFromSphericalCoords(radius, startTheta, startPhi);
      const end = new THREE.Vector3().setFromSphericalCoords(radius, endTheta, endPhi);
      
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(radius * 1.6);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      items.push(curve.getPoints(32));
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.5, -6]}>
      {/* Main Wireframe Sphere */}
      <Sphere args={[5, 48, 48]}>
        <meshStandardMaterial
          color="#e8192c"
          wireframe
          transparent
          opacity={0.08}
          emissive="#e8192c"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Internal Core Glow */}
      <Sphere args={[4.8, 32, 32]}>
        <meshBasicMaterial
          color="#e8192c"
          transparent
          opacity={0.02}
        />
      </Sphere>

      {/* Dotted Grid Layer */}
      <points>
        <sphereGeometry args={[5.05, 64, 64]} />
        <pointsMaterial
          size={0.025}
          color="#ffffff"
          transparent
          opacity={0.15}
          sizeAttenuation
        />
      </points>

      {/* Connection Arcs */}
      {arcs.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e8192c" transparent opacity={0.12} />
        </line>
      ))}

      {/* Floating Satellites/Nodes */}
      {Array.from({ length: 40 }).map((_, i) => {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const pos = new THREE.Vector3().setFromSphericalCoords(5.1, theta, phi);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Neural Particle Atmosphere ─── */
function NeuralParticles() {
  const count = 1200;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.15}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <fog attach="fog" args={["#030303", 5, 25]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#e8192c" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#1a1a4e" />
      
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <DigitalGlobe />
        </Float>
        <NeuralParticles />
      </Suspense>
    </>
  );
}

const HeroCanvas = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Noise grain */}
      <div className="absolute inset-0 noise-bg opacity-40" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_0%,rgba(3,3,3,0.4)_50%,rgba(3,3,3,0.98)_100%)]" />
      
      {/* Section Blending */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#030303] to-transparent z-10" />

      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="pointer-events-none"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
