import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FluidShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor1: { value: new THREE.Color("#05060a") }, // Deep Ink
    uColor2: { value: new THREE.Color("#00e5ff") }, // Cyan
    uColor3: { value: new THREE.Color("#008080") }, // Teal
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex noise / standard noise functions can be long, using a fast fbm-like approach
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      vec2 mouse = uMouse / uResolution;
      
      // Distort UV based on mouse
      float dist = distance(uv, mouse);
      float strength = 0.15 / (dist + 0.1);
      vec2 distortedUv = uv + strength * (uv - mouse) * 0.1;

      float n = fbm(distortedUv * 3.0 + uTime * 0.2);
      float n2 = fbm(distortedUv * 6.0 - uTime * 0.1);
      
      vec3 color = mix(uColor1, uColor2, n);
      color = mix(color, uColor3, n2 * 0.5);
      
      // Add a subtle glow around the mouse
      float glow = exp(-dist * 8.0) * 0.4;
      color += uColor2 * glow;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

import { useDeepOcean } from './DeepOceanEngine';

function FluidBackground() {
  const meshRef = useRef();
  const { size } = useThree();
  const { depth } = useDeepOcean();

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      
      const targetX = (mouse.x + 1) * 0.5 * size.width;
      const targetY = (mouse.y + 1) * 0.5 * size.height;
      meshRef.current.material.uniforms.uMouse.value.x += (targetX - meshRef.current.material.uniforms.uMouse.value.x) * 0.1;
      meshRef.current.material.uniforms.uMouse.value.y += (targetY - meshRef.current.material.uniforms.uMouse.value.y) * 0.1;

      // React to depth: Darken and increase distortion
      meshRef.current.material.uniforms.uColor1.value.lerp(new THREE.Color(depth > 0.5 ? "#020305" : "#05060a"), 0.1);
      meshRef.current.material.uniforms.uColor2.value.lerp(new THREE.Color(depth > 0.8 ? "#001a1a" : "#00e5ff"), 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        args={[FluidShaderMaterial]} 
        uniforms-uResolution-value={[size.width, size.height]}
      />
    </mesh>
  );
}

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidBackground />
      </Canvas>
    </div>
  );
};

export default Background3D;
