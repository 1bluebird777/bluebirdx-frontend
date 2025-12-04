'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Planet from './Planet'
import OrbitalParticles from './OrbitalParticles'

type OrbState = 'idle' | 'listening' | 'thinking' | 'revealing'

interface Props {
  state: OrbState
  drivers: any[]
}

export default function TheOrbiverse({ state, drivers }: Props) {
  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} enablePan={false} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <Planet state={state} />
          <OrbitalParticles state={state} />
        </Suspense>
      </Canvas>

      {state === 'thinking' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-golden-glow animate-pulse">
          Princess Leia is thinking...
        </div>
      )}
    </div>
  )
}
