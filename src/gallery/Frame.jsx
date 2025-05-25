import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { useCursor, Image, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Frame = ({
	url,
	title,
	position,
	rotation,
	scaleFactor,
	GOLDENRATIO,
}) => {
	const image = useRef();
	const frame = useRef();
	const [hovered, hover] = useState(false);
	const [imageOpacity, setImageOpacity] = useState(0);
	const [shouldShow, setShouldShow] = useState(false);
	const name = getUuid(url);
	useCursor(hovered);

	useFrame((state, delta) => {
		// 使用 THREE.Vector3 进行更精确的距离计算
		const framePosition = new THREE.Vector3(position[0], position[1], position[2]);
		const cameraPosition = new THREE.Vector3();
		state.camera.getWorldPosition(cameraPosition);
		
		const distance = framePosition.distanceTo(cameraPosition);
		
		const showThreshold = 200;
		const fadeThreshold = 300;
		
		// 根据距离决定显示状态和不透明度
		if (distance < fadeThreshold) {
			setShouldShow(true);
			const opacity = distance > showThreshold 
				? 1 - (distance - showThreshold) / (fadeThreshold - showThreshold)
				: 1;
			setImageOpacity(Math.max(0, Math.min(1, opacity)));
		} else {
			setShouldShow(false);
			setImageOpacity(0);
		}

		image.current.material.zoom = 1.1;
		easing.damp3(
			image.current.scale,
			[0.85 * (hovered ? 0.85 : 1), 0.9 * (hovered ? 0.905 : 1), 1],
			0.1,
			delta
		);
		easing.dampC(
			frame.current.material.color,
			hovered ? '#4B0401' : '#FAE3CA',
			0.1,
			delta
		);
	});

	return (
		<group position={position} rotation={rotation}>
			<mesh
				name={name}
				onPointerOver={(e) => (e.stopPropagation(), hover(true))}
				onPointerOut={() => hover(false)}
				position={[0, GOLDENRATIO / 2, 0]}
				scale={[
					1 * scaleFactor,
					0.8 * GOLDENRATIO * scaleFactor,
					0.05 * scaleFactor,
				]}
			>
				<boxGeometry />
				<meshStandardMaterial
					color="#151515"
					metalness={0.5}
					roughness={0.5}
					envMapIntensity={2}
				/>
				<mesh
					ref={frame}
					raycast={() => null}
					scale={[0.9, 0.93, 0.9]}
					position={[0, 0, 0.2]}
				>
					<boxGeometry />
					<meshBasicMaterial toneMapped={false} fog={false} />
				</mesh>
				<Image
					raycast={() => null}
					ref={image}
					position={[0, 0, 0.7]}
					url={url}
					transparent
					opacity={imageOpacity}
				/>
			</mesh>
			<Text
				maxWidth={0.1}
				anchorX="left"
				anchorY="top"
				position={[8, GOLDENRATIO * 6.5, 0]}
				fontSize={0.5}
			>
				{title}
			</Text>
		</group>
	);
};

export default Frame;