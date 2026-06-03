import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

function Football({ reduced }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.55;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={ref} position={[-1.5, 0.25, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.68, 48, 48]} />
        <meshStandardMaterial color="#f8fff8" roughness={0.42} metalness={0.05} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.69, 0.012, 12, 64]} />
        <meshStandardMaterial color="#07110f" emissive="#00ff88" emissiveIntensity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.69, 0.012, 12, 64]} />
        <meshStandardMaterial color="#07110f" emissive="#00ff88" emissiveIntensity={0.18} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.69, 0.012, 12, 64]} />
        <meshStandardMaterial color="#07110f" emissive="#00ff88" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function TrophyObject({ reduced }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.25;
    ref.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 0.65) * 0.06;
  });

  return (
    <group ref={ref} position={[1.25, -0.15, -0.1]}>
      <mesh castShadow position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.28, 0.48, 0.72, 32, 1, true]} />
        <meshStandardMaterial color="#d8ff4f" metalness={0.72} roughness={0.24} emissive="#6a5c00" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 0.42, 24]} />
        <meshStandardMaterial color="#00ff88" metalness={0.45} roughness={0.2} emissive="#003b22" />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.52, 0.62, 0.22, 36]} />
        <meshStandardMaterial color="#101b1b" metalness={0.35} roughness={0.32} />
      </mesh>
      <mesh position={[-0.48, 0.66, 0]} rotation={[0, 0, 0.75]}>
        <torusGeometry args={[0.28, 0.035, 12, 28, Math.PI]} />
        <meshStandardMaterial color="#d8ff4f" metalness={0.68} roughness={0.28} />
      </mesh>
      <mesh position={[0.48, 0.66, 0]} rotation={[0, 0, -0.75]}>
        <torusGeometry args={[0.28, 0.035, 12, 28, Math.PI]} />
        <meshStandardMaterial color="#d8ff4f" metalness={0.68} roughness={0.28} />
      </mesh>
    </group>
  );
}

function FloatingPanel({ reduced }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = -0.35 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    ref.current.position.y = -0.95 + Math.sin(state.clock.elapsedTime * 0.75) * 0.05;
  });

  return (
    <group ref={ref} position={[0, -0.95, -0.6]} rotation={[-0.12, -0.35, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[2.6, 0.08, 1.08]} />
        <meshStandardMaterial color="#071212" metalness={0.2} roughness={0.34} emissive="#003a24" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.72, 0.055, 0.02]}>
        <boxGeometry args={[0.78, 0.04, 0.12]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.54, 0.055, 0.02]}>
        <boxGeometry args={[0.95, 0.04, 0.12]} />
        <meshStandardMaterial color="#5ee7ff" emissive="#5ee7ff" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0, 0.058, -0.34]}>
        <boxGeometry args={[2.1, 0.035, 0.04]} />
        <meshStandardMaterial color="#d8ff4f" emissive="#d8ff4f" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function Scene({ reduced }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <pointLight position={[0, 3.2, 3]} intensity={2.4} color="#00ff88" />
      <pointLight position={[3, 1, 2]} intensity={1.7} color="#5ee7ff" />
      <Football reduced={reduced} />
      <TrophyObject reduced={reduced} />
      <FloatingPanel reduced={reduced} />
    </>
  );
}

export function ThreeShowcase() {
  const isSmall = useMediaQuery("(max-width: 720px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (isSmall) {
    return (
      <div className="three-fallback" aria-hidden="true">
        <div className="fallback-field">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="three-stage" aria-label="Elementos 3D decorativos da Copa">
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0.75, 4.1], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Scene reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
