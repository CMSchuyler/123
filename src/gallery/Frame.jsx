import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { useCursor, Image, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

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
	const name = getUuid(url);
	useCursor(hovered);

	useFrame((state, delta) => {
		// 计算相机与图片的z轴距离
		const zDistance = Math.abs(state.camera.position.z - position[2]);
		
		// 设置更小的显示和淡出阈值
		const showThreshold = 100; // 减小可见范围
		const fadeThreshold = 150; // 减小淡出范围
		
		// 根据z值差计算不透明度
		let opacity = 0;
		if (zDistance < showThreshold) {
			opacity = 1; // 在显示阈值内完全不透明
		} else if (zDistance < fadeThreshold) {
			opacity = 1 - (zDistance - showThreshold) / (fadeThreshold - showThreshold);
		}
		
		setImageOpacity(Math.max(0, Math.min(1, opacity)));

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