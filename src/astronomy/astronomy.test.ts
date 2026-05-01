import { describe, expect, test } from 'vitest';
import { DateTime } from 'luxon';
import { EARTH_LOCATIONS } from '../data/earthLocations';
import { MOON_LOCATIONS } from '../data/moonLocations';
import { calculateEarthObserverView, calculateMoonObserverView, classifyLunarEarthVisibility } from './observerViews';
import { angularDiameterDegrees, directionFromAltitudeAzimuth, sizeForAngularDiameter } from './geometry';

describe('observer astronomy model', () => {
  test('calculates Moon data for an Earth observer at a real UTC instant', () => {
    const view = calculateEarthObserverView({
      instant: DateTime.fromISO('2026-05-01T12:00:00Z').toJSDate(),
      location: EARTH_LOCATIONS[0],
    });

    expect(view.observerMode).toBe('earth');
    expect(view.target).toBe('moon');
    expect(view.altitudeDeg).toBeGreaterThanOrEqual(-90);
    expect(view.altitudeDeg).toBeLessThanOrEqual(90);
    expect(view.azimuthDeg).toBeGreaterThanOrEqual(0);
    expect(view.azimuthDeg).toBeLessThan(360);
    expect(view.phaseFraction).toBeGreaterThanOrEqual(0);
    expect(view.phaseFraction).toBeLessThanOrEqual(1);
    expect(view.angularDiameterDeg).toBeGreaterThan(0.45);
    expect(view.angularDiameterDeg).toBeLessThan(0.6);
  });

  test('classifies lunar near-side, limb, and far-side Earth visibility', () => {
    expect(classifyLunarEarthVisibility(MOON_LOCATIONS.find((location) => location.id === 'near-side-center')!)).toBe('near-side');
    expect(classifyLunarEarthVisibility(MOON_LOCATIONS.find((location) => location.id === 'east-limb')!)).toBe('limb');
    expect(classifyLunarEarthVisibility(MOON_LOCATIONS.find((location) => location.id === 'far-side-center')!)).toBe('far-side');
  });

  test('calculates visible Earth for a lunar near-side observer', () => {
    const view = calculateMoonObserverView({
      instant: DateTime.fromISO('2026-05-01T12:00:00Z').toJSDate(),
      location: MOON_LOCATIONS.find((location) => location.id === 'apollo-11')!,
    });

    expect(view.observerMode).toBe('moon');
    expect(view.target).toBe('earth');
    expect(view.visibility).toBe('visible');
    expect(view.altitudeDeg).toBeGreaterThan(0);
    expect(view.angularDiameterDeg).toBeGreaterThan(1.7);
    expect(view.angularDiameterDeg).toBeLessThan(2.1);
  });

  test('marks Earth invisible for a lunar far-side observer', () => {
    const view = calculateMoonObserverView({
      instant: DateTime.fromISO('2026-05-01T12:00:00Z').toJSDate(),
      location: MOON_LOCATIONS.find((location) => location.id === 'far-side-center')!,
    });

    expect(view.visibility).toBe('not-visible');
    expect(view.reason).toContain('far side');
  });
});

describe('real apparent scale geometry', () => {
  test('computes angular diameter from physical diameter and distance', () => {
    expect(angularDiameterDegrees(3474.8, 384_400)).toBeCloseTo(0.518, 2);
    expect(angularDiameterDegrees(12_742, 384_400)).toBeCloseTo(1.899, 2);
  });

  test('computes scene size from angular diameter without exaggeration', () => {
    const size = sizeForAngularDiameter(100, 1);
    expect(size).toBeCloseTo(1.7455, 3);
  });

  test('converts altitude and azimuth to a normalized 3D sky direction', () => {
    const zenith = directionFromAltitudeAzimuth(90, 0);
    expect(zenith.y).toBeCloseTo(1, 5);

    const northHorizon = directionFromAltitudeAzimuth(0, 0);
    expect(northHorizon.z).toBeCloseTo(-1, 5);
    expect(northHorizon.y).toBeCloseTo(0, 5);
  });
});
