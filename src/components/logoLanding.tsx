"use client";
import { OrbitControls } from '@react-three/drei';
import React, { useRef, useState, Ref } from 'react';
import { BufferGeometry, Material, Mesh, Group, PerspectiveCamera as PSC } from 'three';
import { Canvas, useFrame, MeshProps, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

useGLTF.preload("/logo.gltf");

function Logo(props: MeshProps) {
	const { nodes } = useGLTF("/logo.gltf");
	const ref = useRef<Group>();

	useThree(({camera}) => {
		camera.position.y = 1.5;
		camera.position.z = 7;
		camera.lookAt(0, 0, 0);
	});

	var rotDir = 1;
	useFrame((state, delta) => {
		if (ref.current!.rotation.y >= 0.2) {
			rotDir = -1;
		} else if (ref.current!.rotation.y <= -0.2) {
			rotDir = 1;
		}
		ref.current!.rotation.y += (delta / 10) * rotDir;
	}); 

	return (
		<group dispose={null} ref={ref as Ref<Group>} position={[0, -1, 0]} scale={2}>
			<mesh
				{...props}
				castShadow
				receiveShadow
				geometry={nodes.lens.geometry}
				position={[-3.2, 0, 0]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshStandardMaterial color={'#00501E'} />
			</mesh>
			<mesh
				{...props}
				castShadow
				receiveShadow
				geometry={nodes.minima.geometry}
				position={[-3.2, 0, 0]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshStandardMaterial color={'#7A7985'} />
			</mesh>
		</group>
	)
}

export default function LogoLanding() {
	const ref = useRef()

	return (
		<div style={{width: '100vw', height: '100vh'}}>
			<Canvas>
				{/* <perspectiveCamera position={[0,-5,0]}/> */}
				<ambientLight intensity={0.7} />
				<pointLight position={[-1, 1.6, 2.7]} intensity={4}/>
				<Logo />
			</Canvas>
		</div>
	)
}
