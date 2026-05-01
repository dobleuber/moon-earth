import { useEffect, useRef } from 'react';
import { Euler, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import type { ObserverView } from '../astronomy/types';
import { degreesToRadians, directionFromAltitudeAzimuth } from '../astronomy/geometry';

interface FixedLookControlsProps {
  view: ObserverView;
  centerSignal: number;
}

export function FixedLookControls({ view, centerSignal }: FixedLookControlsProps) {
  const { camera, gl } = useThree();
  const yaw = useRef(0);
  const pitch = useRef(0);

  useEffect(() => {
    camera.position.set(0, 1.6, 0);
    camera.rotation.order = 'YXZ';
  }, [camera]);

  useEffect(() => {
    const element = gl.domElement;
    let dragging = false;
    let previousX = 0;
    let previousY = 0;

    const applyRotation = () => {
      camera.position.set(0, 1.6, 0);
      camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ');
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) {
        return;
      }

      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      previousX = event.clientX;
      previousY = event.clientY;
      yaw.current -= deltaX * 0.004;
      pitch.current = Math.max(degreesToRadians(-85), Math.min(degreesToRadians(85), pitch.current - deltaY * 0.004));
      applyRotation();
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerUp);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
    };
  }, [camera, gl.domElement]);

  useEffect(() => {
    if (centerSignal === 0 || view.visibility !== 'visible') {
      return;
    }

    const direction = directionFromAltitudeAzimuth(view.altitudeDeg, view.azimuthDeg);
    const target = new Vector3().copy(camera.position).add(direction);
    camera.lookAt(target);
    const rotation = new Euler().copy(camera.rotation);
    pitch.current = rotation.x;
    yaw.current = rotation.y;
    camera.position.set(0, 1.6, 0);
  }, [camera, centerSignal, view]);

  return null;
}
