import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { TrophyModel } from "./TrophyModel";

export function TrophyScene({ className = "desktop-trophy-scene" }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.18, 4.8], fov: 31 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[2.8, 4.2, 3.4]} intensity={2.8} color="#fff2c4" />
        <pointLight position={[-2.2, 1.4, 2.4]} intensity={1.45} color="#35d98b" />
        <spotLight position={[0, 4, 2.6]} angle={0.46} penumbra={0.7} intensity={2.15} color="#fff9dc" />
        <Suspense fallback={null}>
          <Environment preset="city" resolution={32} />
          <TrophyModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
