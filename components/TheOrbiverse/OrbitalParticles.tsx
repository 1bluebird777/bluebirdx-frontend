'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type OrbState = 'idle' | 'listening' | 'thinking' | 'revealing'

export default function OrbitalParticles({ state }: { state: OrbState }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 1200

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 3 + Math.random() * 0.5

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }

    return pos
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      const rotationSpeed = state === 'thinking' ? 0.01 : 0.002
      particlesRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F59E0B"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}
