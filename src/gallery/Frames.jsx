import React from 'react';
import { easing } from 'maath';
import * as THREE from 'three';
import { useRef } from 'react';
import Frame from './Frame';

const GOLDENRATIO = 1.61803398875;

const Frames = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
	const ref = useRef();

	return (
		<group ref={ref}>
			{images.map((props) => (
				<Frame
					key={props.url}
					{...props}
					GOLDENRATIO={GOLDENRATIO}
					scaleFactor={15}
				/>
			))}
		</group>
	);
};

export default Frames;