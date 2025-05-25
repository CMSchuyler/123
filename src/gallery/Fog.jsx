import { Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';

const Fog = () => {
	const cloud = './textures/cloud.png';
	const [cloudsOpacity, setCloudsOpacity] = useState([0, 0, 0]);
	const cloudsRef = useRef([]);
	const opacityRef = useRef([0, 0, 0]);

	const cloudConfigs = [
		{
			position: [500, 300, -1200],
			scale: 200,
			rotation: [0, Math.PI * 0.2, 0.8]
		},
		{
			position: [0, 350, -1000],
			scale: 180,
			rotation: [0, -Math.PI * 0.1, 0.8]
		},
		{
			position: [-500, 320, -1200],
			scale: 220,
			rotation: [0, Math.PI * 0.15, 0.8]
		}
	];

	useFrame((state) => {
		const camera = state.camera;
		const newOpacities = cloudsRef.current.map((cloudRef, index) => {
			if (!cloudRef) return 0;
			
			const cloudPosition = cloudRef.position;
			const distance = camera.position.distanceTo(cloudPosition);
			
			const minDistance = 400;
			const maxDistance = 800;
			const fadeRange = maxDistance - minDistance;
			
			const minHeight = 200;
			const maxHeight = 400;
			const heightFactor = Math.max(0, Math.min(1, 
				(cloudPosition.y - minHeight) / (maxHeight - minHeight)
			));
			
			let distanceFactor = 0;
			if (distance < minDistance) {
				distanceFactor = 1;
			} else if (distance < maxDistance) {
				distanceFactor = 1 - (distance - minDistance) / fadeRange;
			}
			
			const targetOpacity = Math.min(0.3, distanceFactor * heightFactor);
			
			opacityRef.current[index] += (targetOpacity - opacityRef.current[index]) * 0.005;
			
			return opacityRef.current[index];
		});
		
		setCloudsOpacity(newOpacities);
	});

	return (
		<>
			{cloudConfigs.map((config, index) => (
				<Cloud
					key={index}
					ref={(el) => (cloudsRef.current[index] = el)}
					scale={config.scale}
					color="#B4B4B4"
					rotation={config.rotation}
					position={config.position}
					depthTest={false}
					opacity={cloudsOpacity[index]}
					transparent
					texture={cloud}
				/>
			))}
		</>
	);
};

export default Fog;
