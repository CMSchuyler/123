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

	const geom = useMemo(() => new THREE.PlaneGeometry(2000, 3000), []);
	const config = useMemo(
		() => ({
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x000c06,
			distortionScale: 0.25,        // 增加波纹程度
			fog: false,
			format: gl.encoding,
			alpha: 1,
			mirror: 0.2,    // 设置镜面反射为0，禁用反射
		}),
		[waterNormals]
	);

	const initRef = useRef(false);
	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.05;
		
		if (!initRef.current && ref.current) {
			const uniforms = ref.current.material.uniforms;

			// 在Shader中添加模糊处理
			if (uniforms.mirrorSampler) {
				// 完全禁用反射 - 设置反射强度为0
				if (uniforms.reflectivity) {
					uniforms.reflectivity.value = 0;  // 将反射率设为0，禁用反射
					console.log('Water reflection disabled (reflectivity = 0)');
				}
				
				// 禁用镜面采样器
				if (uniforms.mirrorSampler.value) {
					// 尝试禁用反射贴图的渲染
					try {
						uniforms.mirrorSampler.value.needsUpdate = false;
					} catch (e) {
						console.log('Could not disable mirror sampler update', e);
					}
				}
				
				// 如果有eye参数，也可以尝试禁用
				if (uniforms.eye) {
					uniforms.eye.value = new THREE.Vector3(0, 0, 0);
				}
			}

			initRef.current = true;
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

export default Ocean;