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
	waterNormals.repeat.set(8, 8); // 增加重复次数，使水面纹理更细腻

	const geom = useMemo(() => new THREE.PlaneGeometry(1500, 2500), []);
	const config = useMemo(
		() => ({
			textureWidth: 128,  // 进一步降低纹理分辨率
			textureHeight: 128,  // 进一步降低纹理分辨率
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0x000000,  // 完全消除太阳光反射
			waterColor: 0x001414,  // 调整水色
			distortionScale: 0.5,  // 降低扭曲程度
			fog: true,
			format: gl.encoding,
			alpha: 0.3,  // 显著降低不透明度
			mirror: 0.1,  // 最小化反射
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.15;
		
		// 动态调整材质属性
		if (ref.current.material) {
			const material = ref.current.material;
			
			// 确保材质是透明的
			material.transparent = true;
			material.opacity = 0.3;
			
			// 调整混合模式
			material.blending = THREE.AdditiveBlending;
			
			// 禁用深度写入以改善透明效果
			material.depthWrite = false;
			
			// 调整材质的其他属性
			if (material.uniforms) {
				material.uniforms.distortionScale.value = 0.5;
				material.uniforms.size.value = 2;
				material.uniforms.alpha.value = 0.3;
			}
		}
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