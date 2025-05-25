import React from 'react';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { useCursor, Image, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
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
	const [shouldShow, setShouldShow] = useState(false);
	const name = getUuid(url);
	useCursor(hovered);

	useFrame((state, delta) => {
		// 计算相机到当前frame的距离
		const distance = state.camera.position.distanceTo({
			x: position[0],
			y: position[1],
			z: position[2]
		});
		const showThreshold = 200; // 显示阈值
		const fadeThreshold = 300; // 渐变开始阈值
		
		// 决定是否应该显示图片
		if (distance < fadeThreshold) {
			setShouldShow(true);
		} else {
			setShouldShow(false);
		}

		// 计算不透明度
		if (shouldShow) {
			const opacity = distance > showThreshold 
				? 1 - (distance - showThreshold) / (fadeThreshold - showThreshold)
				: 1;
			setImageOpacity(Math.max(0, Math.min(1, opacity)));
		} else {
			setImageOpacity(0);
		}

		// 基础缩放动画
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