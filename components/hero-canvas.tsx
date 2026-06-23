'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = React.useRef<THREE.Points>(null);
  const count = React.useMemo(() => {
    if (typeof window === 'undefined') return 2500;
    const w = window.innerWidth;
    return w < 640 ? 1500 : w < 1024 ? 3000 : 4500;
  }, []);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreOrb({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const wireRef = React.useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
      const targetX = mouse.current.x * 0.3;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.15;
      wireRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      <mesh ref={wireRef} scale={1.4}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh scale={2.2}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    const x = mouse.current.x * 0.5;
    const y = mouse.current.y * 0.5;
    state.camera.position.x += (x - state.camera.position.x) * 0.03;
    state.camera.position.y += (y - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroCanvas() {
  const mouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#0ea5e9" />
      <ParticleField />
      <CoreOrb mouse={mouse} />
      <CameraRig mouse={mouse} />
    </Canvas>
  );
}
