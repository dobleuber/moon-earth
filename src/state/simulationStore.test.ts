import { describe, expect, test } from 'vitest';
import { EARTH_LOCATIONS } from '../data/earthLocations';
import { MOON_LOCATIONS } from '../data/moonLocations';
import { createInitialSimulationState, createSimulationStore } from './simulationStore';

describe('simulation store', () => {
  test('switches observer modes while preserving date/time and selected locations', () => {
    const initial = createInitialSimulationState();
    const store = createSimulationStore(initial);

    const earthLocation = EARTH_LOCATIONS.find((location) => location.id === 'madrid')!;
    const moonLocation = MOON_LOCATIONS.find((location) => location.id === 'far-side-center')!;
    const selectedInstant = '2026-05-01T18:30';

    store.getState().setEarthLocation(earthLocation.id);
    store.getState().setMoonLocation(moonLocation.id);
    store.getState().setLocalDateTime(selectedInstant);
    store.getState().toggleObserverMode();

    expect(store.getState().observerMode).toBe('moon');
    expect(store.getState().localDateTime).toBe(selectedInstant);
    expect(store.getState().earthLocation.id).toBe(earthLocation.id);
    expect(store.getState().moonLocation.id).toBe(moonLocation.id);

    store.getState().toggleObserverMode();

    expect(store.getState().observerMode).toBe('earth');
    expect(store.getState().localDateTime).toBe(selectedInstant);
    expect(store.getState().earthLocation.id).toBe(earthLocation.id);
    expect(store.getState().moonLocation.id).toBe(moonLocation.id);
  });

  test('treats the selected date/time as one UTC instant independent of Earth location', () => {
    const store = createSimulationStore(createInitialSimulationState());
    store.getState().setEarthLocation('madrid');
    store.getState().setLocalDateTime('2026-07-01T12:00');

    expect(store.getState().getInstant().toISOString()).toBe('2026-07-01T12:00:00.000Z');

    store.getState().setEarthLocation('tokyo');

    expect(store.getState().getInstant().toISOString()).toBe('2026-07-01T12:00:00.000Z');
  });

  test('updates only the UTC hour while preserving the selected date', () => {
    const store = createSimulationStore(createInitialSimulationState());
    store.getState().setLocalDateTime('2026-07-01T12:00');

    store.getState().setUtcHour(18.5);

    expect(store.getState().localDateTime).toBe('2026-07-01T18:30');
    expect(store.getState().getInstant().toISOString()).toBe('2026-07-01T18:30:00.000Z');
  });

  test('updates the selected date/time to the requested lunar age near the current cycle', () => {
    const store = createSimulationStore(createInitialSimulationState());
    store.getState().setLocalDateTime('2026-05-01T00:00');

    store.getState().setLunarAgeDays(0);

    expect(store.getState().localDateTime).toBe('2026-04-17T11:52');
  });
});
