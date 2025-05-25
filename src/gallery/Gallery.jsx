import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import Frames from './Frames';

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
	}
]