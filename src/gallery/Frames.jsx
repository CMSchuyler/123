import React from 'react';
import { useRef } from 'react';
import Frame from './Frame';

const GOLDENRATIO = 1.61803398875;

const Frames = ({ images, onFrameClick }) => {
  const ref = useRef();

  return (
    <group ref={ref}>
      {images.map((props) => (
        <Frame
          key={props.url}
          {...props}
          GOLDENRATIO={GOLDENRATIO}
          scaleFactor={15}
          onFrameClick={onFrameClick}
        />
      ))}
    </group>
  );
};

export default Frames;