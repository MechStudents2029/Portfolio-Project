"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useShopMaterials() {
  return useMemo(
    () => ({
      steel: new THREE.MeshPhongMaterial({
        color: "#d9dde3",
        shininess: 48,
        specular: "#f4f6f8",
      }),
      plate: new THREE.MeshPhongMaterial({
        color: "#9aa0a8",
        shininess: 28,
        specular: "#d8dce0",
      }),
      graphite: new THREE.MeshPhongMaterial({
        color: "#4a4e54",
        shininess: 18,
        specular: "#8a8e94",
      }),
      rod: new THREE.MeshPhongMaterial({
        color: "#eceff2",
        shininess: 70,
        specular: "#ffffff",
      }),
      led: new THREE.MeshPhongMaterial({
        color: "#e24a12",
        emissive: "#e24a12",
        emissiveIntensity: 0.85,
        shininess: 12,
      }),
    }),
    []
  );
}

function Led({ position, mats }) {
  return (
    <mesh position={position} material={mats.led}>
      <sphereGeometry args={[0.04, 8, 6]} />
    </mesh>
  );
}

function JointCan({ radius, length, mats, segs }) {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} material={mats.graphite}>
      <cylinderGeometry args={[radius, radius, length, segs]} />
    </mesh>
  );
}

function LinkBeam({ length, width, depth, mats, showArmor, showRod }) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]} material={mats.steel}>
        <boxGeometry args={[width, length, depth]} />
      </mesh>
      {showArmor && (
        <mesh position={[0.01, length / 2, depth * 0.42]} material={mats.plate}>
          <boxGeometry args={[width * 0.62, length * 0.7, 0.04]} />
        </mesh>
      )}
      {showRod && (
        <mesh position={[width * 0.46, length / 2, 0]} material={mats.rod}>
          <cylinderGeometry args={[0.02, 0.02, length * 0.76, 6]} />
        </mesh>
      )}
    </group>
  );
}

function Gripper({ mats, openRef }) {
  const left = useRef();
  const right = useRef();

  useFrame(() => {
    const jaw = 0.08 + (openRef.current?.open ?? 0.45) * 0.09;
    if (left.current) left.current.position.x = -jaw;
    if (right.current) right.current.position.x = jaw;
  });

  return (
    <group>
      <mesh position={[0, 0.05, 0]} material={mats.graphite}>
        <boxGeometry args={[0.22, 0.09, 0.16]} />
      </mesh>
      <mesh ref={left} position={[-0.12, 0.18, 0]} material={mats.steel}>
        <boxGeometry args={[0.055, 0.22, 0.13]} />
      </mesh>
      <mesh ref={right} position={[0.12, 0.18, 0]} material={mats.steel}>
        <boxGeometry args={[0.055, 0.22, 0.13]} />
      </mesh>
      <Led position={[0, 0.05, 0.1]} mats={mats} />
    </group>
  );
}

function RoboticArm({ compact }) {
  const shoulder = useRef();
  const upper = useRef();
  const elbow = useRef();
  const wrist = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ yaw: 0, pitch: 0, open: 0.45 });
  const mats = useShopMaterials();
  const segs = compact ? 8 : 14;

  useEffect(() => {
    function onMove(e) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const idle = Math.sin(t * 0.45) * 0.05;
    target.current.yaw += (pointer.current.x * 0.42 - target.current.yaw) * 0.045;
    target.current.pitch += (-pointer.current.y * 0.32 - target.current.pitch) * 0.045;
    target.current.open += (0.4 + Math.sin(t * 0.7) * 0.18 - target.current.open) * 0.06;

    if (shoulder.current) shoulder.current.rotation.y = 0.35 + target.current.yaw + idle;
    if (upper.current) upper.current.rotation.z = -0.35 + target.current.pitch * 0.25;
    if (elbow.current) elbow.current.rotation.z = 1.35 - target.current.pitch * 0.4;
    if (wrist.current) wrist.current.rotation.z = -0.55 + target.current.pitch * 0.2;
  });

  return (
    <group position={[0.15, compact ? -0.55 : -0.62, 0]} scale={compact ? 0.72 : 0.84}>
      <mesh position={[0, 0.08, 0]} material={mats.plate}>
        <cylinderGeometry args={[0.46, 0.52, 0.16, segs]} />
      </mesh>
      <mesh position={[0, 0.17, 0]} material={mats.led}>
        <cylinderGeometry args={[0.48, 0.48, 0.03, segs]} />
      </mesh>
      <mesh position={[0, 0.28, 0]} material={mats.graphite}>
        <cylinderGeometry args={[0.32, 0.34, 0.18, segs]} />
      </mesh>

      <group ref={shoulder} position={[0, 0.46, 0]}>
        <mesh material={mats.steel}>
          <boxGeometry args={[0.5, 0.3, 0.42]} />
        </mesh>
        <JointCan radius={0.17} length={0.56} mats={mats} segs={segs} />
        <Led position={[0.26, 0.1, 0.18]} mats={mats} />

        <group ref={upper} position={[0.16, 0.16, 0]}>
          <LinkBeam length={0.92} width={0.26} depth={0.26} mats={mats} showArmor={!compact} showRod={!compact} />
          <Led position={[0.14, 0.46, 0]} mats={mats} />

          <group ref={elbow} position={[0, 0.95, 0]}>
            <JointCan radius={0.15} length={0.4} mats={mats} segs={segs} />
            <Led position={[0.22, 0, 0]} mats={mats} />

            <group position={[0, 0.12, 0]}>
              <LinkBeam length={0.74} width={0.21} depth={0.21} mats={mats} showArmor={!compact} showRod={!compact} />

              <group ref={wrist} position={[0, 0.78, 0]}>
                <JointCan radius={0.11} length={0.28} mats={mats} segs={segs} />
                <mesh position={[0, 0.1, 0]} material={mats.steel}>
                  <boxGeometry args={[0.18, 0.14, 0.16]} />
                </mesh>
                <Led position={[0.12, 0.1, 0]} mats={mats} />
                <group position={[0, 0.2, 0]}>
                  <Gripper mats={mats} openRef={target} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function FitCamera({ compact }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(compact ? 0.55 : 0.45, compact ? 1.2 : 1.05, compact ? 4.15 : 3.55);
    camera.fov = compact ? 38 : 30;
    camera.lookAt(0.05, 0.62, 0);
    camera.updateProjectionMatrix();
  }, [camera, compact]);

  return null;
}

export default function RoboticHandScene() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    function sync() {
      setCompact(window.innerWidth < 768);
    }
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <Canvas
      dpr={[1, compact ? 1.25 : 1.75]}
      camera={{ position: [0.45, 1.05, 3.55], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <FitCamera compact={compact} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[1.4, 3.2, 4.2]} intensity={2.1} color="#fff6ea" />
      <directionalLight position={[-2.4, 0.8, 1.2]} intensity={0.7} color="#e24a12" />
      <pointLight position={[0.2, 1.6, 2.2]} intensity={0.85} color="#ff8a4a" />
      <RoboticArm compact={compact} />
    </Canvas>
  );
}
