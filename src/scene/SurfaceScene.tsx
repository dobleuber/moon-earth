import { Canvas } from '@react-three/fiber';
import type { ObserverMode, ObserverView } from '../astronomy/types';
import { CelestialBody } from './CelestialBody';
import { SurfaceEnvironment } from './Environments';
import { FixedLookControls } from './FixedLookControls';

interface SurfaceSceneProps {
  observerMode: ObserverMode;
  view: ObserverView;
  centerSignal: number;
}

export function SurfaceScene({ observerMode, view, centerSignal }: SurfaceSceneProps) {
  return (
    <div className="scene-shell">
      <Canvas camera={{ position: [0, 1.6, 0], fov: 60, near: 0.01, far: 300 }} shadows>
        <FixedLookControls view={view} centerSignal={centerSignal} />
        <SurfaceEnvironment observerMode={observerMode} view={view} />
        <CelestialBody view={view} />
        <gridHelper args={[120, 24, '#334155', '#1e293b']} position={[0, 0.002, 0]} />
      </Canvas>
      {view.visibility !== 'visible' && (
        <div className="scene-message" role="status">
          {view.reason}
        </div>
      )}
    </div>
  );
}
