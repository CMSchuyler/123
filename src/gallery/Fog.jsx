import { Cloud } from '@react-three/drei';

const Fog = () => {
	const cloud = './textures/cloud.png';
	return (
		<>
			<Cloud
				scale={100}
				color="#ffffff"
				rotation={[0, 0, 0.8]}
				position={[500, 100, -800]}
				depthTest={true}
				texture={cloud}
			/>
			<Cloud
				scale={100}
				color="#ffffff"
				rotation={[0, 0, 0.8]}
				position={[0, 100, -600]}
				depthTest={true}
				texture={cloud}
			/>
			<Cloud
				scale={100}
				color="#ffffff"
				rotation={[0, 0, 0.8]}
				position={[-500, 100, -800]}
				depthTest={true}
				texture={cloud}
			/>
		</>
	);
};

export default Fog;