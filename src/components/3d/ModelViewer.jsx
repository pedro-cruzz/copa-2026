import { Component, Suspense } from "react";
import { Center, Clone, Float, Html, useGLTF } from "@react-three/drei";

function LoadingFallback() {
  return (
    <Html center className="model-loader">
      <span>Carregando 3D</span>
    </Html>
  );
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.modelPath !== this.props.modelPath && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

function LoadedModel({ modelPath, scale, position, rotation }) {
  const { scene } = useGLTF(modelPath);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Center>
        <Clone object={scene} />
      </Center>
    </group>
  );
}

export function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  float = false,
  floatSpeed = 1,
  className,
  fallback = null
}) {
  const content = (
    <ModelErrorBoundary modelPath={modelPath} fallback={fallback}>
      <Suspense fallback={<LoadingFallback />}>
        <LoadedModel modelPath={modelPath} scale={scale} position={position} rotation={rotation} />
      </Suspense>
    </ModelErrorBoundary>
  );

  return (
    <group name={className}>
      {float ? (
        <Float speed={floatSpeed} rotationIntensity={0.45} floatIntensity={0.75}>
          {content}
        </Float>
      ) : (
        content
      )}
    </group>
  );
}

ModelViewer.preload = (modelPath) => {
  useGLTF.preload(modelPath);
};
