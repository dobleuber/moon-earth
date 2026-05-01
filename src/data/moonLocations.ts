import type { MoonLocation } from '../astronomy/types';

export const MOON_LOCATIONS: MoonLocation[] = [
  {
    id: 'apollo-11',
    name: 'Apollo 11 / Mare Tranquillitatis',
    latitude: 0.6741,
    longitude: 23.4731,
    notes: 'Near-side site where Earth is visible high in the lunar sky.',
  },
  {
    id: 'near-side-center',
    name: 'Near-side center',
    latitude: 0,
    longitude: 0,
    notes: 'Earth appears close to overhead in the simplified model.',
  },
  {
    id: 'east-limb',
    name: 'East limb',
    latitude: 0,
    longitude: 89,
    notes: 'Earth appears close to the lunar horizon.',
  },
  {
    id: 'far-side-center',
    name: 'Far-side center',
    latitude: 0,
    longitude: 180,
    notes: 'Earth is not visible from the lunar far side.',
  },
  {
    id: 'south-pole',
    name: 'Lunar south pole',
    latitude: -89,
    longitude: 0,
    notes: 'Earth appears near the horizon in this educational model.',
  },
];

export function findMoonLocation(id: string): MoonLocation {
  return MOON_LOCATIONS.find((location) => location.id === id) ?? MOON_LOCATIONS[0];
}
