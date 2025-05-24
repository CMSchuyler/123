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
			textureWidth: 256,  // 降低纹理分辨率
			textureHeight: 256,  // 降低纹理分辨率
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0x001133,  // 调暗太阳光颜色
			waterColor: 0x000c06,
			distortionScale: 3.5,  // 显著增加扭曲程度
			fog: true,  // 启用雾效果
			format: gl.encoding,
			alpha: 0.8,  // 降低透明度
			mirror: 0.1,  // 进一步降低反射
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.15;  // 增加波动速度
		
		// 动态调整uniforms
		if (ref.current.material.uniforms) {
			const uniforms = ref.current.material.uniforms;
			
			// 增加水面的模糊度
			if (uniforms.normalSampler) {
				uniforms.normalSampler.value = waterNormals;
				waterNormals.minFilter = THREE.LinearFilter;
				waterNormals.magFilter = THREE.LinearFilter;
			}
			
			// 调整水面的整体亮度
			if (uniforms.waterColor) {
				uniforms.waterColor.value.setHex(0x000c06);
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

export default Ocean;