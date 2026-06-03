import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense } from "react";
import { ModelViewer } from "./ModelViewer";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const TRIONDA_MODEL_PATH = "/models/Trionda_2026.glb";

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[3, 4, 5]} intensity={1.65} color="#f7fff8" />
      <pointLight position={[0, 2.6, 2.8]} intensity={2.6} color="#00ff88" />
      <pointLight position={[-2.6, 1.4, 2]} intensity={1.05} color="#5ee7ff" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2.5} color="#00ff88" position={[0, 3, -2]} scale={[5, 2, 1]} />
        <Lightformer form="ring" intensity={1.8} color="#5ee7ff" position={[2, 1.5, 1]} scale={2.6} />
      </Environment>
    </>
  );
}

function SceneContent({ mobile }) {
  return (
    <>
      <SceneLights />
      <ModelViewer
        modelPath={TRIONDA_MODEL_PATH}
        scale={mobile ? 0.54 : 0.62}
        position={mobile ? [0, -0.12, 0] : [-0.12, -0.02, 0]}
        rotation={[0.12, -0.35, 0.08]}
        float
        floatSpeed={mobile ? 1.08 : 1.18}
        className="trionda-2026-ball"
      />
    </>
  );
}

export function HeroScene() {
  const mobile = useMediaQuery("(max-width: 720px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="hero-scene">
      <Canvas
        className="hero-scene-canvas"
        dpr={mobile ? [1, 1.15] : [1, 1.6]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: !mobile, alpha: true, powerPreference: mobile ? "low-power" : "high-performance" }}
        shadows={!mobile}
        camera={{ position: mobile ? [0, 0.55, 4.3] : [0, 0.72, 4.1], fov: mobile ? 48 : 43 }}
      >
        <Suspense fallback={null}>
          <SceneContent mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

ModelViewer.preload(TRIONDA_MODEL_PATH);
