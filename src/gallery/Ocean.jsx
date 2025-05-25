import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';

extend({ Water });

function Ocean() {
	const ref = useRef();
	const gl = useThree((state) => state.gl);
	const waterNormals = useLoader(
		THREE.TextureLoader,
		'./textures/waternormals.jpeg'
	);
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
	waterNormals.repeat.set(1, 1); // 使用更大的纹理重复

	const geom = useMemo(() => new THREE.PlaneGeometry(2000, 3000), []);
	const config = useMemo(
		() => ({
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x000c06,
			distortionScale: 0.1, // 减小扭曲效果
			fog: false,
			format: gl.encoding,
			alpha: 1,
			mirror: 0 // 完全禁用反射
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		// 使用固定的低速更新
		ref.current.material.uniforms.time.value += delta * 0.05;
	});

	return (
		<group position={[0, -2, 0]} rotation={[0, 0, 0]}>
			<water
				ref={ref}
				args={[geom, config]}
				rotation-x={-Math.PI / 2}
				position-y={0}
			/>
		</group>
	);
}

export default Ocean;