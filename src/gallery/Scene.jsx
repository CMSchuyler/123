import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Scene = ({ onFrameClick }) => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 75,
        position: [0, 7, 1000],
      }}
    >
      <color attach="background" args={['#311A01']} />
      <Gallery onFrameClick={onFrameClick} />
      <Ocean />
      <Environment files={'./textures/preller_drive_1k.hdr'} />
    </Canvas>
  );
};

export default Scene;