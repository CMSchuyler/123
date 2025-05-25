import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import Fog from './Fog';
import { Environment, OrbitControls } from '@react-three/drei';
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
			<OrbitControls 
				enableZoom={false}
				enablePan={false}
				minPolarAngle={Math.PI * 0.4} 
				maxPolarAngle={Math.PI * 0.6}
				rotateSpeed={0.5}
			/>
			<color attach="background" args={['#261502']} />
			<Gallery />
			<Ocean />
			<Fog />
			<Environment files={'./textures/preller_drive_1k.hdr'} />
		</Canvas>
	);
};

export default Scene;