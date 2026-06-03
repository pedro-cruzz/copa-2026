import { lazy, Suspense } from "react";

const HeroScene = lazy(() => import("./HeroScene").then((module) => ({ default: module.HeroScene })));

export function SketchfabBallEmbed() {
  return (
    <div className="sketchfab-ball-shell">
      <Suspense
        fallback={
          <div className="hero-scene hero-scene-static" aria-hidden="true">
            <span className="fallback-orbit" />
          </div>
        }
      >
        <HeroScene />
      </Suspense>
    </div>
  );
}
