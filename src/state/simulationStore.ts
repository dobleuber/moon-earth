import { DateTime } from 'luxon';
import { createStore, type StoreApi } from 'zustand/vanilla';
import { create, type UseBoundStore } from 'zustand';
import { EARTH_LOCATIONS, findEarthLocation } from '../data/earthLocations';
import { MOON_LOCATIONS, findMoonLocation } from '../data/moonLocations';
import { formatUtcDateTime, nearestDateTimeForLunarAge } from '../astronomy/lunarCycle';
import type { EarthLocation, MoonLocation, ObserverMode } from '../astronomy/types';

export interface SimulationState {
  observerMode: ObserverMode;
  localDateTime: string;
  earthLocation: EarthLocation;
  moonLocation: MoonLocation;
  toggleObserverMode: () => void;
  setObserverMode: (mode: ObserverMode) => void;
  setLocalDateTime: (value: string) => void;
  setUtcHour: (hour: number) => void;
  setLunarAgeDays: (ageDays: number) => void;
  setEarthLocation: (id: string) => void;
  setMoonLocation: (id: string) => void;
  getInstant: () => Date;
}

export type SimulationStore = StoreApi<SimulationState>;

export function createInitialSimulationState(): Pick<
  SimulationState,
  'observerMode' | 'localDateTime' | 'earthLocation' | 'moonLocation'
> {
  return {
    observerMode: 'earth',
    localDateTime: DateTime.utc().toFormat("yyyy-MM-dd'T'HH:mm"),
    earthLocation: EARTH_LOCATIONS[0],
    moonLocation: MOON_LOCATIONS[0],
  };
}

export function createSimulationStore(
  initial: ReturnType<typeof createInitialSimulationState> = createInitialSimulationState(),
): SimulationStore {
  return createStore<SimulationState>((set, get) => ({
    ...initial,
    toggleObserverMode: () => {
      set((state) => ({ observerMode: state.observerMode === 'earth' ? 'moon' : 'earth' }));
    },
    setObserverMode: (observerMode) => set({ observerMode }),
    setLocalDateTime: (localDateTime) => set({ localDateTime }),
    setUtcHour: (hour) => {
      set((state) => ({ localDateTime: setUtcHourOnDateTime(state.localDateTime, hour) }));
    },
    setLunarAgeDays: (ageDays) => {
      set((state) => ({
        localDateTime: formatUtcDateTime(nearestDateTimeForLunarAge(parseUtcDateTime(state.localDateTime).toJSDate(), ageDays)),
      }));
    },
    setEarthLocation: (id) => set({ earthLocation: findEarthLocation(id) }),
    setMoonLocation: (id) => set({ moonLocation: findMoonLocation(id) }),
    getInstant: () => parseUtcDateTime(get().localDateTime).toJSDate(),
  }));
}

export const useSimulationStore: UseBoundStore<SimulationStore> = create<SimulationState>()((set, get) => ({
  ...createInitialSimulationState(),
  toggleObserverMode: () => {
    set((state) => ({ observerMode: state.observerMode === 'earth' ? 'moon' : 'earth' }));
  },
  setObserverMode: (observerMode) => set({ observerMode }),
  setLocalDateTime: (localDateTime) => set({ localDateTime }),
  setUtcHour: (hour) => {
    set((state) => ({ localDateTime: setUtcHourOnDateTime(state.localDateTime, hour) }));
  },
  setLunarAgeDays: (ageDays) => {
    set((state) => ({
      localDateTime: formatUtcDateTime(nearestDateTimeForLunarAge(parseUtcDateTime(state.localDateTime).toJSDate(), ageDays)),
    }));
  },
  setEarthLocation: (id) => set({ earthLocation: findEarthLocation(id) }),
  setMoonLocation: (id) => set({ moonLocation: findMoonLocation(id) }),
  getInstant: () => parseUtcDateTime(get().localDateTime).toJSDate(),
}));

function parseUtcDateTime(localDateTime: string): DateTime {
  return DateTime.fromISO(localDateTime, { zone: 'UTC' });
}

function setUtcHourOnDateTime(localDateTime: string, hour: number): string {
  const boundedHour = Math.min(23.75, Math.max(0, hour));
  const wholeHour = Math.floor(boundedHour);
  const minute = Math.round((boundedHour - wholeHour) * 60);

  return parseUtcDateTime(localDateTime)
    .set({ hour: wholeHour, minute, second: 0, millisecond: 0 })
    .toFormat("yyyy-MM-dd'T'HH:mm");
}
