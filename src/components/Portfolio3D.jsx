import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useDeepOcean } from './DeepOceanEngine';

const projects = [
  { id: '01', name: "DPS Tajpur", category: "Education", depth: 0.2 },
  { id: '02', name: "Rural NGO", category: "NGO", depth: 0.4 },
  { id: '03', name: "AEROSS", category: "Aviation", depth: 0.6 },
  { id: '04', name: "CHITR", category: "Fashion", depth: 0.8 }
];

function ProjectCard({ project, index }) {
  const meshRef = useRef();
  const { depth } = useDeepOcean();
  
  // Calculate relative visibility based on global depth
  // Each project appears at its specific depth
  const isActive = Math.abs(depth - project.depth) < 0.15;
  const opac = Math.max(0, 1 - Math.abs(depth - project.depth) * 10);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = (project.depth - depth) * 50;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime + index) * 2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5 + index) * 1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <planeGeometry args={[4, 2.5]} />
          <MeshDistortMaterial 
            color="#05060a" 
            speed={2} 
            distort={0.2} 
            transparent 
            opacity={opac * 0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.4}
          color="#00e5ff"
          font="https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9Wlhyw.woff"
          fillOpacity={opac}
        >
          {project.name.toUpperCase()}
        </Text>
        
        <Text
          position={[0, -0.6, 0.1]}
          fontSize={0.15}
          color="#8a9bbf"
          fillOpacity={opac}
        >
          {project.category}
        </Text>
      </Float>

      {isActive && (
        <Html position={[2.2, 0, 0]} center>
          <div className="project-3d-hint" style={{ opacity: opac }}>
            <span style={{ color: 'var(--color-cyan)', fontSize: '0.7rem', display: 'block' }}>0{index + 1}</span>
            <a href="#" className="interactive">VIEW CASE</a>
          </div>
        </Html>
      )}
    </group>
  );
}

const Portfolio3D = () => {
  return (
    <div className="portfolio-3d-container" style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
          
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))}
          
          <fog attach="fog" args={['#05060a', 5, 25]} />
        </Canvas>
      </div>
    </div>
  );
};

export default Portfolio3D;
