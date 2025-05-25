import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import Frames from './Frames';
import * as THREE from 'three';

// images array stays the same...
const images = [
  // ... (keep all existing image entries)
];

const Gallery = ({ onFrameClick }) => {
  const { progress } = useProgress();
  const [times, setTimes] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  
  const animationRef = useRef({
    complete: false,
    initialPositionSet: false,
    currentZ: 1150,
    targetZ: 1150,
    cameraTarget: new THREE.Vector3()
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

    window.addEventListener('mousemove', mouseMoveHandler);
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, [selectedFrame]);

  useEffect(() => {
    const wheelHandler = (event) => {
      event.preventDefault();
      
      if (animationRef.current.complete && !selectedFrame) {
        const scrollDirection = Math.sign(event.deltaY);
        const scrollAmount = 10;
        
        const newTarget = animationRef.current.targetZ - scrollDirection * scrollAmount;
        animationRef.current.targetZ = Math.max(50, Math.min(1150, newTarget));
      }
    };
    
    window.addEventListener('wheel', wheelHandler, { passive: false });
    return () => window.removeEventListener('wheel', wheelHandler, { passive: false });
  }, [selectedFrame]);

  const handleFrameClick = (title, position) => {
    if (!animationRef.current.complete) return;

    if (onFrameClick) {
      onFrameClick(title, position);
    }

    // 如果点击的是同一个相框，则返回原位
    if (selectedFrame?.title === title) {
      setSelectedFrame(null);
      return;
    }

    // 设置新的相机目标位置
    const offsetX = position < 0 ? 20 : -20; // 左侧相框相机右移，右侧相框相机左移
    
    // 找到对应的图片数据
    const frameData = images.find(img => img.title === title);
    if (frameData) {
      setSelectedFrame({
        title,
        targetPosition: new THREE.Vector3(
          frameData.position[0] + offsetX,
          7,
          frameData.position[2]
        ),
        targetRotation: new THREE.Euler(
          0,
          position < 0 ? Math.PI / 12 : -Math.PI / 12,
          0
        )
      });
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
        setAnimationComplete(false);
      } else {
        if (!animationRef.current.initialPositionSet) {
          animationRef.current.currentZ = state.camera.position.z;
          animationRef.current.targetZ = state.camera.position.z;
          animationRef.current.initialPositionSet = true;
          animationRef.current.complete = true;
          setAnimationComplete(true);
        }
        
        if (!animationRef.current.complete) {
          animationRef.current.complete = true;
          setAnimationComplete(true);
        }

        // 相机移动逻辑
        if (selectedFrame) {
          // 平滑移动到选中的相框位置
          state.camera.position.lerp(selectedFrame.targetPosition, 0.05);
          
          // 平滑旋转到目标角度
          const currentRotation = new THREE.Euler().setFromQuaternion(state.camera.quaternion);
          const targetQuaternion = new THREE.Quaternion().setFromEuler(selectedFrame.targetRotation);
          state.camera.quaternion.slerp(targetQuaternion, 0.05);
        } else {
          // 正常的相机控制
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
    }
  });

  return (
    <group>
      <Frames 
        images={images} 
        onFrameClick={handleFrameClick}
        animationComplete={animationComplete}
      />
    </group>
  );
};

export default Gallery;