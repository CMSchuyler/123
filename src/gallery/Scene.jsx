import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import Fog from './Fog';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

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
			<color attach="background" args={['#E3BEA1']} />
			<Gallery />
			<Ocean />
			<Fog />
			<Environment files={'./textures/preller_drive_1k.hdr'} />
			
			<EffectComposer>
				<DepthOfField 
					focusDistance={0.01} 
					focalLength={0.2} 
					bokehScale={3} 
				/>
				<Bloom 
					intensity={0.5} 
					luminanceThreshold={0.1} 
					luminanceSmoothing={0.9} 
					height={300}
				/>
				<Noise 
					opacity={0.8}
					blendFunction={BlendFunction.OVERLAY}
					premultiply
				/>
			</EffectComposer>
		</Canvas>
	);
};

export default Scene;