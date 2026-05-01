import { useMemo } from 'react';
import { Sprite, SpriteMaterial } from 'three';
import type { ObserverView } from '../astronomy/types';
import { directionFromAltitudeAzimuth, sizeForAngularDiameter } from '../astronomy/geometry';
import { createPhaseTexture } from './phaseTexture';

const SKY_DISTANCE = 100;

interface CelestialBodyProps {
  view: ObserverView;
}

export function CelestialBody({ view }: CelestialBodyProps) {
  const texture = useMemo(() => createPhaseTexture(view.target, view.phaseFraction), [view.phaseFraction, view.target]);
  const material = useMemo(() => new SpriteMaterial({ map: texture, transparent: true }), [texture]);

  if (view.visibility !== 'visible') {
    return null;
  }

  const direction = directionFromAltitudeAzimuth(view.altitudeDeg, view.azimuthDeg);
  const position = direction.multiplyScalar(SKY_DISTANCE);
  const size = sizeForAngularDiameter(SKY_DISTANCE, view.angularDiameterDeg);

  return <primitive object={new Sprite(material)} position={position} scale={[size, size, 1]} />;
}
