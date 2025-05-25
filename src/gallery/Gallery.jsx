import React from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import Frame from './Frame';

const images = [
	// Left column - Right tilt (z-axis staggered) - First 22
	{
		position: [-15, 7, 50],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 1',
	},
	{
		position: [-15, 7, 100],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 1',
	},
	{
		position: [-15, 7, 150],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 1',
	},
	{
		position: [-15, 7, 200],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 1',
	},
	{
		position: [-15, 7, 250],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 2',
	},
	{
		position: [-15, 7, 300],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 2',
	},
	{
		position: [-15, 7, 350],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 2',
	},
	{
		position: [-15, 7, 400],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 2',
	},
	{
		position: [-15, 7, 450],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 3',
	},
	{
		position: [-15, 7, 500],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 3',
	},
	{
		position: [-15, 7, 550],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 3',
	},
	{
		position: [-15, 7, 600],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 3',
	},
	{
		position: [-15, 7, 650],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 4',
	},
	{
		position: [-15, 7, 700],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 4',
	},
	{
		position: [-15, 7, 750],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 4',
	},
	{
		position: [-15, 7, 800],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 4',
	},
	{
		position: [-15, 7, 850],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 5',
	},
	{
		position: [-15, 7, 900],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 5',
	},
	{
		position: [-15, 7, 950],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 5',
	},
	{
		position: [-15, 7, 1000],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 5',
	},
	{
		position: [-15, 7, 1050],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 6',
	},
	{
		position: [-15, 7, 1100],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 6',
	},
	// Right column - Left tilt (z-axis staggered) - Last 22
	{
		position: [15, 7, 75],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 1',
	},
	{
		position: [15, 7, 125],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 1',
	},
	{
		position: [15, 7, 175],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 1',
	},
	{
		position: [15, 7, 225],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 1',
	},
	{
		position: [15, 7, 275],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 2',
	},
	{
		position: [15, 7, 325],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 2',
	},
	{
		position: [15, 7, 375],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 2',
	},
	{
		position: [15, 7, 425],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 2',
	},
	{
		position: [15, 7, 475],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 3',
	},
	{
		position: [15, 7, 525],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 3',
	},
	{
		position: [15, 7, 575],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 3',
	},
	{
		position: [15, 7, 625],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 3',
	},
	{
		position: [15, 7, 675],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 4',
	},
	{
		position: [15, 7, 725],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 4',
	},
	{
		position: [15, 7, 775],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 4',
	},
	{
		position: [15, 7, 825],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 4',
	},
	{
		position: [15, 7, 875],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 5',
	},
	{
		position: [15, 7, 925],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 5',
	},
	{
		position: [15, 7, 975],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 5',
	},
	{
		position: [15, 7, 1025],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 5',
	},
	{
		position: [15, 7, 1075],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 6',
	},
	{
		position: [15, 7, 1125],
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 6',
	},
];

const Gallery = () => {
	const { progress } = useProgress();
	const [times, setTimes] = useState([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	
	const animationRef = useRef({
		complete: false,
		initialPositionSet: false,
		currentZ: 1150,
		targetZ: 1150
	});

	useEffect(() => {
		const mouseMoveHandler = (event) => {
			setMousePosition({
				x: (event.clientX / window.innerWidth) * 2 - 1,
				y: -(event.clientY / window.innerHeight) * 2 + 1
			});
		};

		window.addEventListener('mousemove', mouseMoveHandler);
		return () => window.removeEventListener('mousemove', mouseMoveHandler);
	}, []);

	useEffect(() => {
		const wheelHandler = (event) => {
			event.preventDefault();
			
			if (animationRef.current.complete) {
				const scrollDirection = Math.sign(event.deltaY);
				const scrollAmount = 10;
				
				const newTarget = animationRef.current.targetZ - scrollDirection * scrollAmount;
				animationRef.current.targetZ = Math.max(50, Math.min(1150, newTarget));
			}
		};
		
		window.addEventListener('wheel', wheelHandler, { passive: false });
		return () => window.removeEventListener('wheel', wheelHandler, { passive: false });
	}, []);
	
	useFrame((state, delta) => {
		const elapsedTime = state.clock.getElapsedTime();
		
		if (progress === 100) {
			if (times.length === 0) setTimes([elapsedTime]);
			const delay = 8 + times[0];
			
			if (elapsedTime < delay) {
				const startZ = 1000;
				const endZ = 1150;
				const t = elapsedTime / delay;
				
				state.camera.position.z = startZ + t * (endZ - startZ);
				state.camera.position.y = 7;
				state.camera.rotation.x = 0;
				
				animationRef.current.currentZ = state.camera.position.z;
				animationRef.current.targetZ = endZ;
				animationRef.current.complete = false;
			} else {
				if (!animationRef.current.initialPositionSet) {
					animationRef.current.currentZ = state.camera.position.z;
					animationRef.current.targetZ = state.camera.position.z;
					animationRef.current.initialPositionSet = true;
					animationRef.current.complete = true;
				}
				
				if (!animationRef.current.complete) {
					animationRef.current.complete = true;
				}
				
				state.camera.position.y = 7;
				
				// 相机跟随鼠标移动
				if (animationRef.current.complete) {
					const rotationSpeed = 0.1;
					state.camera.rotation.y = mousePosition.x * rotationSpeed;
					state.camera.rotation.x = mousePosition.y * rotationSpeed;
				}
				
				const currentZ = state.camera.position.z;
				const distance = animationRef.current.targetZ - currentZ;
				
				if (Math.abs(distance) > 0.1) {
					const acceleration = 0.02;
					const step = distance * acceleration;
					state.camera.position.z += step;
				}
			}
		}
	});

	return (
		<group>
			<Frames images={images} />
		</group>
	);
};

export default Gallery;