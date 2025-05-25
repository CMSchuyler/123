import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import Fog from './Fog';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Scene = () => {
	return (
		<Canvas
			shadows
			camera={{
				fov: 75,
				position: [0, 0, 0],
				rotation: [-Math.PI * 0.5, 0, 0],
			}}
		>
			<color attach="background" args={['#A16A46']} />
			<Gallery />
			<Ocean />
			<Fog />
			<Environment files={'./textures/preller_drive_1k.hdr'} />
		</Canvas>
	);
};

export default Scene;