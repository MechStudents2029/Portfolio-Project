"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const FINGERS = [
  { name: "index", x: -0.42, splay: -0.12, phase: 0.0, lengths: [0.5, 0.36] },
  { name: "middle", x: -0.14, splay: -0.03, phase: 0.6, lengths: [0.56, 0.4] },
  { name: "ring", x: 0.14, splay: 0.03, phase: 1.2, lengths: [0.52, 0.37] },
  { name: "pinky", x: 0.42, splay: 0.12, phase: 1.8, lengths: [0.4, 0.28] },
];

function Finger({ position, splay, phase, lengths, radius, material }) {
  const jointRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const curl = 0.22 + Math.sin(t * 0.55 + phase) * 0.12;
    if (jointRef.current) jointRef.current.rotation.x = -curl;
  });

  return (
    <group position={position} rotation={[0.15, 0, splay]}>
      <mesh position={[0, lengths[0] / 2, 0]} material={material}>
        <capsuleGeometry args={[radius, Math.max(lengths[0] - radius * 2, 0.05), 4, 8]} />
      </mesh>
      <group ref={jointRef} position={[0, lengths[0], 0]}>
        <mesh position={[0, lengths[1] / 2, 0]} material={material}>
          <capsuleGeometry args={[radius * 0.82, Math.max(lengths[1] - radius * 1.6, 0.04), 4, 8]} />
        </mesh>
      </group>
    </group>
  );
}

function RoboticHand({ lowDetail }) {
  const rig = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c8c2b4",
        transmission: 0,
        roughness: 0.28,
        metalness: 0.85,
        clearcoat: lowDetail ? 0 : 0.4,
        clearcoatRoughness: 0.35,
      }),
    [lowDetail]
  );

  useEffect(() => {
    function onMove(e) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!rig.current) return;
    const t = clock.getElapsedTime();
    target.current.x += (pointer.current.y * 0.25 - target.current.x) * 0.04;
    target.current.y += (pointer.current.x * 0.35 - target.current.y) * 0.04;
    rig.current.rotation.x = -0.25 + target.current.x;
    rig.current.rotation.y = t * 0.12 + target.current.y;
  });

  return (
    <group ref={rig}>
      <RoundedBox args={[1.05, 0.26, 0.85]} radius={0.11} smoothness={lowDetail ? 2 : 4} material={glassMaterial} />
      {FINGERS.map((f) => (
        <Finger
          key={f.name}
          position={[f.x, 0.1, -0.3]}
          splay={f.splay}
          phase={f.phase}
          lengths={f.lengths}
          radius={0.085}
          material={glassMaterial}
        />
      ))}
      <group position={[-0.58, -0.02, 0.15]} rotation={[0.3, -0.5, 1.05]}>
        <mesh position={[0, 0.22, 0]} material={glassMaterial}>
          <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
        </mesh>
      </group>
    </group>
  );
}

export default function RoboticHandScene() {
  const [lowDetail, setLowDetail] = useState(false);

  useEffect(() => {
    setLowDetail(window.innerWidth < 768);
  }, []);

  return (
    <Canvas
      dpr={[1, lowDetail ? 1.5 : 2]}
      camera={{ position: [0, 0.3, 3.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.35} color="#efe8d8" />
      <directionalLight position={[-3, -2, -2]} intensity={0.45} color="#e24a12" />
      <pointLight position={[0, 1.5, 2]} intensity={0.45} color="#ff7a3d" />
      <RoboticHand lowDetail={lowDetail} />
    </Canvas>
  );
}
