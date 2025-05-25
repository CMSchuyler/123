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
	waterNormals.repeat.set(8, 8); // 增加法线贴图的重复次数

	const geom = useMemo(() => new THREE.PlaneGeometry(2000, 3000), []);
	const config = useMemo(
		() => ({
			textureWidth: 128, // 降低纹理分辨率
			textureHeight: 128, // 降低纹理分辨率
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 8.0, // 显著增加扭曲效果
			fog: true,
			format: gl.encoding,
			alpha: 0.8, // 增加透明度
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		// 增加水面动画速度
		ref.current.material.uniforms.time.value += delta * 0.5;

		// 动态更新法线贴图的重复值
		const time = state.clock.getElapsedTime();
		waterNormals.offset.set(
			Math.sin(time * 0.1) * 0.05,
			Math.cos(time * 0.1) * 0.05
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
		</group>
	);
}

export default Ocean;