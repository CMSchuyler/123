import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';
import Frames from './Frames';

const images = [
  // Left column - Right tilt (z-axis staggered) - First 22
  {
    position: [-15, 7, 50],
    rotation: [0, Math.PI / 12, 0],
    url: './photos/mmexport1689910736872.jpg',
    title: 'Suzhou river 1',
  },
  // ... (其他图片配置保持不变)
];

const Gallery = () => {
  const { progress } = useProgress();
  const [times, setTimes] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [infoPanel, setInfoPanel] = useState(null);
  
  const animationRef = useRef({
    complete: false,
    initialPositionSet: false,
    currentZ: 1150,
    targetZ: 1150,
    originalCamera: {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler()
    },
    isAnimating: false
  });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      if (!selectedFrame) {
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1
        });
      }
    };

    const wheelHandler = (event) => {
      event.preventDefault();
      
      if (animationRef.current.complete && !selectedFrame && !animationRef.current.isAnimating) {
        const scrollDirection = Math.sign(event.deltaY);
        const scrollAmount = 10;
        
        const newTarget = animationRef.current.targetZ - scrollDirection * scrollAmount;
        animationRef.current.targetZ = Math.max(50, Math.min(1150, newTarget));
      }
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('wheel', wheelHandler, { passive: false });
    };
  }, [selectedFrame]);

  const handleFrameClick = (position, title) => {
    if (animationRef.current.isAnimating) return;
    
    if (!selectedFrame) {
      // Store original camera state
      animationRef.current.originalCamera.position.copy(animationRef.current.camera.position);
      animationRef.current.originalCamera.rotation.copy(animationRef.current.camera.rotation);
      
      // Calculate new camera position (5 units to the right of the frame)
      const newPosition = new THREE.Vector3(
        position[0] + 5,
        position[1],
        position[2] + 20
      );
      
      setSelectedFrame({ position: newPosition, title });
      setInfoPanel({
        position: [position[0] + 15, position[1], position[2]],
        title
      });
      
      animationRef.current.isAnimating = true;
    } else {
      setSelectedFrame(null);
      setInfoPanel(null);
      animationRef.current.isAnimating = true;
    }
  };

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
          animationRef.current.camera = state.camera;
        }
        
        if (!animationRef.current.complete) {
          animationRef.current.complete = true;
        }

        if (selectedFrame && animationRef.current.isAnimating) {
          // Move camera to selected frame
          state.camera.position.lerp(new THREE.Vector3(...selectedFrame.position), 0.1);
          if (state.camera.position.distanceTo(new THREE.Vector3(...selectedFrame.position)) < 0.1) {
            animationRef.current.isAnimating = false;
          }
        } else if (!selectedFrame && animationRef.current.isAnimating) {
          // Return camera to original position
          state.camera.position.lerp(
            new THREE.Vector3(0, 7, animationRef.current.targetZ),
            0.1
          );
          state.camera.rotation.lerp(
            new THREE.Euler(currentRotation.x, currentRotation.y, 0),
            0.1
          );
          
          if (
            state.camera.position.distanceTo(
              new THREE.Vector3(0, 7, animationRef.current.targetZ)
            ) < 0.1
          ) {
            animationRef.current.isAnimating = false;
          }
        } else if (!animationRef.current.isAnimating) {
          state.camera.position.y = 7;
          
          if (!selectedFrame && animationRef.current.complete) {
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
    }
  });

  return (
    <group>
      <Frames images={images} onFrameClick={handleFrameClick} />
      {infoPanel && (
        <mesh position={infoPanel.position} rotation={[0, -Math.PI / 12, 0]}>
          <planeGeometry args={[10, 15]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} side={THREE.DoubleSide} />
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {infoPanel.title}
          </Text>
        </mesh>
      )}
    </group>
  );
};

export default Gallery;