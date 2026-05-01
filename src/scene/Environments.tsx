import type { ObserverMode, ObserverView } from '../astronomy/types';

interface EnvironmentProps {
  observerMode: ObserverMode;
  view: ObserverView;
}

export function SurfaceEnvironment({ observerMode, view }: EnvironmentProps) {
  if (observerMode === 'moon') {
    return <MoonEnvironment />;
  }

  return <EarthEnvironment isDay={view.altitudeDeg > -12 && view.phaseFraction < 0.98} />;
}

function EarthEnvironment({ isDay }: { isDay: boolean }) {
  return (
    <>
      <color attach="background" args={[isDay ? '#7eb7ff' : '#020617']} />
      <ambientLight intensity={isDay ? 1.4 : 0.25} />
      <directionalLight position={[4, 8, 2]} intensity={isDay ? 2 : 0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[120, 96]} />
        <meshStandardMaterial color={isDay ? '#304f32' : '#0f1f18'} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, -80]}>
        <boxGeometry args={[180, 3, 2]} />
        <meshStandardMaterial color={isDay ? '#263f2c' : '#101816'} />
      </mesh>
    </>
  );
}

function MoonEnvironment() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[8, 10, 2]} intensity={2.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[120, 128]} />
        <meshStandardMaterial color="#77736a" roughness={1} />
      </mesh>
      {[-28, -9, 14, 36].map((x, index) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, -18 - index * 10]}>
          <ringGeometry args={[2 + index, 2.4 + index, 32]} />
          <meshStandardMaterial color="#5e5b55" roughness={1} />
        </mesh>
      ))}
    </>
  );
}
