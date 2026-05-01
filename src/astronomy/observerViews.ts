import {
  Body,
  Equator,
  Horizon,
  Illumination,
  KM_PER_AU,
  Observer,
} from 'astronomy-engine';
import type {
  EarthObserverInput,
  LunarVisibilityClass,
  MoonLocation,
  MoonObserverInput,
  ObserverView,
} from './types';
import {
  angularDiameterDegrees,
  clamp,
  degreesToRadians,
  normalizeDegrees,
  radiansToDegrees,
} from './geometry';

const MOON_DIAMETER_KM = 3474.8;
const EARTH_DIAMETER_KM = 12_742;
const DEFAULT_EARTH_MOON_DISTANCE_KM = 384_400;

export function calculateEarthObserverView({ instant, location }: EarthObserverInput): ObserverView {
  const observer = new Observer(location.latitude, location.longitude, 0);
  const equatorial = Equator(Body.Moon, instant, observer, true, true);
  const horizontal = Horizon(instant, observer, equatorial.ra, equatorial.dec, 'normal');
  const illumination = Illumination(Body.Moon, instant);
  const angularDiameterDeg = angularDiameterDegrees(MOON_DIAMETER_KM, equatorial.dist * KM_PER_AU);
  const altitudeDeg = horizontal.altitude;

  return {
    observerMode: 'earth',
    target: 'moon',
    visibility: altitudeDeg > 0 ? 'visible' : 'not-visible',
    altitudeDeg,
    azimuthDeg: normalizeDegrees(horizontal.azimuth),
    phaseFraction: clamp(illumination.phase_fraction, 0, 1),
    angularDiameterDeg,
    reason: altitudeDeg > 0 ? undefined : 'The Moon is below the horizon for this Earth location and time.',
  };
}

export function classifyLunarEarthVisibility(location: MoonLocation): LunarVisibilityClass {
  const centralAngle = lunarCentralAngleFromSubEarthPoint(location);

  if (centralAngle < 80) {
    return 'near-side';
  }

  if (centralAngle <= 100) {
    return 'limb';
  }

  return 'far-side';
}

export function calculateMoonObserverView({ instant, location }: MoonObserverInput): ObserverView {
  const centralAngle = lunarCentralAngleFromSubEarthPoint(location);
  const altitudeDeg = 90 - centralAngle;
  const visibilityClass = classifyLunarEarthVisibility(location);
  const moonIllumination = Illumination(Body.Moon, instant);
  const phaseFraction = clamp(1 - moonIllumination.phase_fraction, 0, 1);
  const angularDiameterDeg = angularDiameterDegrees(EARTH_DIAMETER_KM, estimateEarthMoonDistanceKm(instant));
  const visibility = altitudeDeg > 0 ? 'visible' : 'not-visible';

  return {
    observerMode: 'moon',
    target: 'earth',
    visibility,
    altitudeDeg,
    azimuthDeg: lunarAzimuthTowardSubEarthPoint(location),
    phaseFraction,
    angularDiameterDeg,
    lunarVisibilityClass: visibilityClass,
    reason: visibility === 'visible' ? undefined : 'Earth is not visible from this lunar far side location in the educational-realistic model.',
  };
}

export function calculateObserverView(input: EarthObserverInput | MoonObserverInput, observerMode: 'earth' | 'moon'): ObserverView {
  return observerMode === 'earth'
    ? calculateEarthObserverView(input as EarthObserverInput)
    : calculateMoonObserverView(input as MoonObserverInput);
}

function estimateEarthMoonDistanceKm(instant: Date): number {
  try {
    const observer = new Observer(0, 0, 0);
    const equatorial = Equator(Body.Moon, instant, observer, true, true);
    return equatorial.dist * KM_PER_AU;
  } catch {
    return DEFAULT_EARTH_MOON_DISTANCE_KM;
  }
}

function lunarCentralAngleFromSubEarthPoint(location: MoonLocation): number {
  const latitude = degreesToRadians(location.latitude);
  const longitude = degreesToRadians(normalizedLunarLongitude(location.longitude));
  const cosCentralAngle = Math.cos(latitude) * Math.cos(longitude);
  return radiansToDegrees(Math.acos(clamp(cosCentralAngle, -1, 1)));
}

function lunarAzimuthTowardSubEarthPoint(location: MoonLocation): number {
  const latitude = degreesToRadians(location.latitude);
  const longitude = degreesToRadians(normalizedLunarLongitude(location.longitude));
  const y = -Math.sin(longitude) * Math.cos(0);
  const x = Math.cos(latitude) * Math.sin(0) - Math.sin(latitude) * Math.cos(0) * Math.cos(longitude);
  return normalizeDegrees(radiansToDegrees(Math.atan2(y, x)));
}

function normalizedLunarLongitude(longitude: number): number {
  const normalized = ((longitude + 180) % 360 + 360) % 360 - 180;
  return normalized;
}
