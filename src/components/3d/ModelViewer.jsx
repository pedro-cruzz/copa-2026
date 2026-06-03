import { Component, Suspense, useRef } from "react";
import { Center, Clone, Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

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

function LoadedModel({ modelPath, scale, position, rotation, float, floatSpeed }) {
  const { scene } = useGLTF(modelPath);
  
  // Criamos a referência diretamente para o modelo carregado
  const modelRef = useRef();

  // A animação roda exatamente no centro do modelo agora
  useFrame((state, delta) => {
    if (float && modelRef.current) {
      modelRef.current.rotation.x += delta * floatSpeed * 0.2;
      modelRef.current.rotation.y += delta * floatSpeed * 0.3;
      modelRef.current.rotation.z += delta * floatSpeed * 0.1;
    }
  });

  return (
    // Posição e escala ficam no grupo externo
    <group position={position} scale={scale}>
      {/* O Center alinha perfeitamente o meio do objeto */}
      <Center>
        {/* A rotação acontece neste grupo interno, garantindo o giro no próprio eixo */}
        <group ref={modelRef} rotation={rotation}>
          <Clone object={scene} />
        </group>
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
  return (
    <group name={className}>
      <ModelErrorBoundary modelPath={modelPath} fallback={fallback}>
        <Suspense fallback={<LoadingFallback />}>
          <LoadedModel 
            modelPath={modelPath} 
            scale={scale} 
            position={position} 
            rotation={rotation} 
            float={float} 
            floatSpeed={floatSpeed} 
          />
        </Suspense>
      </ModelErrorBoundary>
    </group>
  );
}

ModelViewer.preload = (modelPath) => {
  useGLTF.preload(modelPath);
};