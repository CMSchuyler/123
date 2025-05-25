import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

extend({ Water });

function Ocean() {
	const ref = useRef();
	const gl = useThree((state) => state.gl);
	const waterNormals = useLoader(
		THREE.TextureLoader,
		'./textures/waternormals.jpeg'
	);
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
	waterNormals.repeat.set(8, 8);

	const geom = useMemo(() => new THREE.PlaneGeometry(1500, 2500), []);
	const config = useMemo(
		() => ({
			textureWidth: 128,
			textureHeight: 128,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0x000000,
			waterColor: 0x001414,
			distortionScale: 0.5,
			fog: true,
			format: gl.encoding,
			alpha: 0.3,
			mirror: 0.1,
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.15;
		
		if (ref.current.material) {
			const material = ref.current.material;
			material.transparent = true;
			material.opacity = 0.3;
			material.blending = THREE.AdditiveBlending;
			material.depthWrite = false;
			
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
			<EffectComposer>
				<Noise 
					opacity={0.8}
					blendFunction={BlendFunction.OVERLAY}
					premultiply
				/>
			</EffectComposer>
		</group>
	);
}

export default Ocean;