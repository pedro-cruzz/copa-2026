import { Center, useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const TROPHY_MODEL_PATH = "/models/copa_mundial_-_cup_world.glb";

export function TrophyModel() {
  const { scene } = useGLTF(TROPHY_MODEL_PATH);
  const trophy = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }

      child.material = child.material.clone();
      child.material.color?.set("#d7b766");

      if ("metalness" in child.material) {
        child.material.metalness = 0.72;
      }

      if ("roughness" in child.material) {
        child.material.roughness = 0.26;
      }

      if ("envMapIntensity" in child.material) {
        child.material.envMapIntensity = 1.25;
      }

      child.material.needsUpdate = true;
    });

    return clone;
  }, [scene]);

  return (
    <Center>
      <primitive object={trophy} rotation={[0, 0, 0]} scale={0.78} />
    </Center>
  );
}

useGLTF.preload(TROPHY_MODEL_PATH);
