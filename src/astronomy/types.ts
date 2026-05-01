export type ObserverMode = 'earth' | 'moon';
export type TargetBody = 'moon' | 'earth';
export type Visibility = 'visible' | 'not-visible';
export type LunarVisibilityClass = 'near-side' | 'limb' | 'far-side';

export interface EarthLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface MoonLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  notes: string;
}

export interface ObserverView {
  observerMode: ObserverMode;
  target: TargetBody;
  visibility: Visibility;
  altitudeDeg: number;
  azimuthDeg: number;
  phaseFraction: number;
  angularDiameterDeg: number;
  reason?: string;
  lunarVisibilityClass?: LunarVisibilityClass;
}

export interface EarthObserverInput {
  instant: Date;
  location: EarthLocation;
}

export interface MoonObserverInput {
  instant: Date;
  location: MoonLocation;
}
