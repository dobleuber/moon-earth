import { Vector3 } from 'three';

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeDegrees(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

export function angularDiameterDegrees(diameterKm: number, distanceKm: number): number {
  return radiansToDegrees(2 * Math.atan(diameterKm / (2 * distanceKm)));
}

export function sizeForAngularDiameter(distance: number, angularDiameterDeg: number): number {
  return 2 * distance * Math.tan(degreesToRadians(angularDiameterDeg) / 2);
}

export function directionFromAltitudeAzimuth(altitudeDeg: number, azimuthDeg: number): Vector3 {
  const altitude = degreesToRadians(altitudeDeg);
  const azimuth = degreesToRadians(azimuthDeg);
  const horizontal = Math.cos(altitude);

  return new Vector3(
    horizontal * Math.sin(azimuth),
    Math.sin(altitude),
    -horizontal * Math.cos(azimuth),
  ).normalize();
}
