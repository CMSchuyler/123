import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import Fog from './Fog';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

const Scene = () => {
	return (
		<Canvas
			shadows
			camera={{
				fov: 75,
				position: [0, 0, 0],
				rotation: [-Math.PI * 0.5, 0, 0],
				far: 2000, // 增加相机的远平面距离
				near: 0.1
			}}
			gl={{
				antialias: true,
				alpha: false,
				stencil: false,
				depth: true
			}}
		>
			<color attach="background" args={['#191920']} />
			<Gallery />
			<Ocean />
			<Fog />
			<Environment files={'./textures/preller_drive_1k.hdr'} />
		</Canvas>
	);
};

export default Scene;