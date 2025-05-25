import React from 'react';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { useCursor, Image, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const FADE_DISTANCE = 200; // 渐变开始的距离
const MAX_VISIBLE_DISTANCE = 300; // 最大可见距离

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
	const group = useRef();
	const [hovered, hover] = useState(false);
	const [opacity, setOpacity] = useState(0);
	const [visible, setVisible] = useState(true);
	const [rnd] = useState(() => Math.random());
	const name = getUuid(url);
	useCursor(hovered);

	useFrame((state, delta) => {
		if (image.current) {
			image.current.material.zoom = 1.1;
			
			// 计算到相机的距离
			const distance = state.camera.position.distanceTo(group.current.position);
			
			// 根据距离计算不透明度
			if (distance > MAX_VISIBLE_DISTANCE) {
				if (visible) setVisible(false);
			} else {
				if (!visible) setVisible(true);
				
				let targetOpacity = 1;
				if (distance > FADE_DISTANCE) {
					targetOpacity = 1 - (distance - FADE_DISTANCE) / (MAX_VISIBLE_DISTANCE - FADE_DISTANCE);
				}
				
				// 平滑过渡不透明度
				setOpacity(current => {
					const newOpacity = current + (targetOpacity - current) * 0.1;
					return Math.max(0, Math.min(1, newOpacity));
				});
			}
			
			easing.damp3(
				image.current.scale,
				[0.85 * (hovered ? 0.85 : 1), 0.9 * (hovered ? 0.905 : 1), 1],
				0.1,
				delta
			);
		}
		
		if (frame.current) {
			easing.dampC(
				frame.current.material.color,
				hovered ? '#4B0401' : '#FAE3CA',
				0.1,
				delta
			);
		}
	});

	if (!visible) return null;

	return (
		<group ref={group} position={position} rotation={rotation}>
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
					transparent
					opacity={opacity}
				/>
				<mesh
					ref={frame}
					raycast={() => null}
					scale={[0.9, 0.93, 0.9]}
					position={[0, 0, 0.2]}
				>
					<boxGeometry />
					<meshBasicMaterial 
						toneMapped={false} 
						fog={false}
						transparent
						opacity={opacity}
					/>
				</mesh>
				<Image
					raycast={() => null}
					ref={image}
					position={[0, 0, 0.7]}
					url={url}
					transparent
					opacity={opacity}
				/>
			</mesh>
			<Text
				maxWidth={0.1}
				anchorX="left"
				anchorY="top"
				position={[8, GOLDENRATIO * 6.5, 0]}
				fontSize={0.5}
				transparent
				opacity={opacity}
			>
				{title}
			</Text>
		</group>
	);
};

export default Frame;