import type { EarthLocation } from '../astronomy/types';

export const EARTH_LOCATIONS: EarthLocation[] = [
  {
    id: 'buenos-aires',
    name: 'Buenos Aires, Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
    timezone: 'America/Argentina/Buenos_Aires',
  },
  {
    id: 'madrid',
    name: 'Madrid, Spain',
    latitude: 40.4168,
    longitude: -3.7038,
    timezone: 'Europe/Madrid',
  },
  {
    id: 'mexico-city',
    name: 'Mexico City, Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    timezone: 'America/Mexico_City',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik, Iceland',
    latitude: 64.1466,
    longitude: -21.9426,
    timezone: 'Atlantic/Reykjavik',
  },
];

export function findEarthLocation(id: string): EarthLocation {
  return EARTH_LOCATIONS.find((location) => location.id === id) ?? EARTH_LOCATIONS[0];
}
