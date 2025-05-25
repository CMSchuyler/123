import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import Frames from './Frames';

const images = [
	// Left column - Right tilt (z-axis staggered)
	{
		position: [-15, 7, 50],
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 1',
	},
	{
		position: [-15, 7, 125], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 1',
	},
	{
		position: [-15, 7, 200], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 1',
	},
	{
		position: [-15, 7, 275], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 1',
	},
	{
		position: [-15, 7, 350], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 2',
	},
	{
		position: [-15, 7, 425], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 2',
	},
	{
		position: [-15, 7, 500], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 2',
	},
	{
		position: [-15, 7, 575], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 2',
	},
	{
		position: [-15, 7, 650], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 3',
	},
	{
		position: [-15, 7, 725], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 3',
	},
	{
		position: [-15, 7, 800], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 3',
	},
	{
		position: [-15, 7, 875], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 3',
	},
	{
		position: [-15, 7, 950], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 4',
	},
	{
		position: [-15, 7, 1025], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 4',
	},
	{
		position: [-15, 7, 1100], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 4',
	},
	{
		position: [-15, 7, 1175], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 4',
	},
	{
		position: [-15, 7, 1250], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 5',
	},
	{
		position: [-15, 7, 1325], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 5',
	},
	{
		position: [-15, 7, 1400], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago 5',
	},
	{
		position: [-15, 7, 1475], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park 5',
	},
	{
		position: [-15, 7, 1550], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river 6',
	},
	{
		position: [-15, 7, 1625], // Increased z-spacing
		rotation: [0, Math.PI / 12, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple 6',
	},
	// Right column - Left tilt (z-axis staggered)
	{
		position: [15, 7, 87.5], // Offset from left column + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 1',
	},
	{
		position: [15, 7, 162.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 1',
	},
	{
		position: [15, 7, 237.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 1',
	},
	{
		position: [15, 7, 312.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 1',
	},
	{
		position: [15, 7, 387.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 2',
	},
	{
		position: [15, 7, 462.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 2',
	},
	{
		position: [15, 7, 537.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 2',
	},
	{
		position: [15, 7, 612.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 2',
	},
	{
		position: [15, 7, 687.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 3',
	},
	{
		position: [15, 7, 762.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 3',
	},
	{
		position: [15, 7, 837.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 3',
	},
	{
		position: [15, 7, 912.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 3',
	},
	{
		position: [15, 7, 987.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 4',
	},
	{
		position: [15, 7, 1062.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 4',
	},
	{
		position: [15, 7, 1137.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 4',
	},
	{
		position: [15, 7, 1212.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 4',
	},
	{
		position: [15, 7, 1287.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 5',
	},
	{
		position: [15, 7, 1362.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 5',
	},
	{
		position: [15, 7, 1437.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University 5',
	},
	{
		position: [15, 7, 1512.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home 5',
	},
	{
		position: [15, 7, 1587.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter 6',
	},
	{
		position: [15, 7, 1662.5], // Offset + increased spacing
		rotation: [0, -Math.PI / 12, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains 6',
	},
];

const Gallery = () => {
	const { progress } = useProgress();
	const [times, setTimes] = useState([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });
	
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
				animationRef.current.targetZ = Math.max(50, Math.min(1650, newTarget)); // Adjusted max value
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
				
				if (animationRef.current.complete) {
					const rotationSpeed = 0.05;
					const easingFactor = 0.1;
					
					const targetRotationY = -mousePosition.x * rotationSpeed;
					const targetRotationX = mousePosition.y * rotationSpeed;
					
					setCurrentRotation(prev => ({
						x: prev.x + (targetRotationX - prev.x) * easingFactor,
						y: prev.y + (targetRotationY - prev.y) * easingFactor
					}));
					
					state.camera.rotation.y = currentRotation.y;
					state.camera.rotation.x = currentRotation.x;
				}
				
				const currentZ = state.camera.position.z;
				const distance = animationRef.current.targetZ - currentZ;
				
				if (Math.abs(distance) > 0.1) {
					const acceleration = 0.05;
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