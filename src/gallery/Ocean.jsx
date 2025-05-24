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
			textureHeight: 256, // 降低纹理分辨率
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001519,  // 调整水的颜色，使其更深
			distortionScale: 3.5,  // 增加扭曲程度
			fog: false,
			format: gl.encoding,
			alpha: 0.8,  // 降低透明度
			mirror: 0.1,  // 降低镜面反射强度
		}),
		[waterNormals]
	);

	const initRef = useRef(false);
	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.15; // 增加波动速度
		
		if (!initRef.current && ref.current) {
			const uniforms = ref.current.material.uniforms;

			if (uniforms.mirrorSampler) {
				if (uniforms.reflectivity) {
					uniforms.reflectivity.value = 0.1;  // 降低反射率
				}
				
				if (uniforms.mirrorSampler.value) {
					uniforms.mirrorSampler.value.minFilter = THREE.LinearFilter;
					uniforms.mirrorSampler.value.magFilter = THREE.LinearFilter;
				}
				
				if (uniforms.eye) {
					uniforms.eye.value = new THREE.Vector3(0, 10, 0); // 调整视角位置
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