import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';

extend({ Water });

function Ocean() {
	const ref = useRef();
	const overlayRef = useRef();
	const gl = useThree((state) => state.gl);
	const waterNormals = useLoader(
		THREE.TextureLoader,
		'./textures/waternormals.jpeg'
	);
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
	waterNormals.repeat.set(8, 8);

	const geom = useMemo(() => new THREE.PlaneGeometry(2000, 3000), []);
	const config = useMemo(
		() => ({
			textureWidth: 128,
			textureHeight: 128,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x261502,
			distortionScale: 8.0,
			fog: true,
			format: gl.encoding,
			alpha: 0.8,
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		// 降低水面动画速度，从0.5降到0.15
		ref.current.material.uniforms.time.value += delta * 0.15;

		// 降低法线贴图移动速度，从0.1降到0.03
		const time = state.clock.getElapsedTime();
		waterNormals.offset.set(
			Math.sin(time * 0.03) * 0.05,
			Math.cos(time * 0.03) * 0.05
		);
	});

	return (
		<group position={[0, -2, 0]} rotation={[0, 0, 0]}>
			<water
				ref={ref}
				args={[geom, config]}
				rotation-x={-Math.PI / 2}
				position-y={0}
			/>
			<mesh
				ref={overlayRef}
				rotation-x={-Math.PI / 2}
				position-y={0.1}
			>
				<planeGeometry args={[2000, 3000]} />
				<meshBasicMaterial
					color="#AB916E"
					transparent
					opacity={0.6}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</group>
	);
}

export default Ocean;