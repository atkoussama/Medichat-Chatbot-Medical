import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, useAnimations, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Component to load and display the 3D model
const Model = ({ isSpeaking }) => {
  const gltf = useLoader(GLTFLoader, '/scene.gltf');
  const modelRef = useRef();
  const { actions, names: animations } = useAnimations(gltf.animations, modelRef);
  const { camera } = useThree();

  // Position camera to frame the doctor properly
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 1.5, 3);
      camera.lookAt(0, 1, 0);
    }
  }, [camera]);

  // Play animations based on speaking state
  useEffect(() => {
    if (animations.length > 0) {
      // Find suitable animations
      const talkAnimation = animations.find(name => 
        name.toLowerCase().includes('talk') || 
        name.toLowerCase().includes('speak')
      );
      
      const idleAnimation = animations.find(name => 
        name.toLowerCase().includes('idle') || 
        name.toLowerCase().includes('take001')
      );
      
      // Reset all animations
      animations.forEach(name => {
        if (actions[name]) {
          actions[name].stop();
        }
      });
      
      if (isSpeaking && talkAnimation) {
        actions[talkAnimation]?.play();
      } else if (idleAnimation) {
        actions[idleAnimation]?.play();
      } else if (animations.length > 0) {
        actions[animations[0]]?.play();
      }
    }
  }, [actions, animations, isSpeaking]);

  // Set initial position to face the screen
  useEffect(() => {
    if (modelRef.current) {
      // Set rotation to 0 to face the camera
      modelRef.current.rotation.y = 0;
    }
  }, []);

  return (
    <primitive 
      ref={modelRef} 
      object={gltf.scene} 
      position={[0, 1.5, 0]} 
      scale={1.5} 
    />
  );
};

// HTML content to be displayed in case of error
const ErrorContent = () => (
  <Html fullscreen>
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-gray-500">
        Could not load 3D doctor model.
      </p>
    </div>
  </Html>
);

// Loading content to be displayed while model is loading
const LoadingContent = () => (
  <Html fullscreen>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </Html>
);

// Error boundary for the 3D model
const ModelWithFallback = ({ isSpeaking }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error loading 3D model:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <ErrorContent />;
  }

  return <Model isSpeaking={isSpeaking} />;
};

// Main avatar component
const DoctorAvatar = ({ isSpeaking }) => {
  // For debugging speech state
  useEffect(() => {
    if (isSpeaking) {
      console.log('Doctor avatar: Speaking state activated');
    } else {
      console.log('Doctor avatar: Speaking state deactivated');
    }
  }, [isSpeaking]);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute top-4 left-4 z-10">
        <div className={`flex items-center ${isSpeaking ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 bg-white bg-opacity-80 py-1 px-3 rounded-full`}>
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Speaking</span>
        </div>
      </div>
      
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <React.Suspense fallback={<LoadingContent />}>
          <ModelWithFallback isSpeaking={isSpeaking} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default DoctorAvatar; 