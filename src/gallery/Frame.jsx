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
  onFrameClick,
  animationComplete
}) => {
  const image = useRef();
  const frame = useRef();
  const [hovered, hover] = useState(false);
  const name = getUuid(url);
  useCursor(hovered);

  useFrame((state, delta) => {
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

  const handleClick = (e) => {
    e.stopPropagation();
    if (animationComplete && onFrameClick) {
      onFrameClick(title, position[0]);
    }
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        onClick={handleClick}
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
          position={[0, 0, 1]}
          url={url}
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