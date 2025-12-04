'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

type OrbState = 'idle' | 'listening' | 'thinking' | 'revealing'

export default function Planet({ state }: { state: OrbState }) {
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (planetRef.current) {
      // Continuous slow rotation
      planetRef.current.rotation.y += 0.002

      // Speed up when thinking
      if (state === 'thinking') {
        planetRef.current.rotation.y += 0.01
      }
    }
  })

  const getEmissiveIntensity = () => {
    switch (state) {
      case 'thinking': return 1.5
      case 'revealing': return 2.0
      case 'listening': return 1.0
      default: return 0.5
    }
  }

  return (
    <group>
      {/* Main planet sphere */}
      <Sphere ref={planetRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={2}
          emissive="#1E3A8A"
          emissiveIntensity={getEmissiveIntensity()}
          roughness={0.4}
        />
      </Sphere>

      {/* Golden glow layer */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={state === 'thinking' ? 0.4 : 0.2}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}
