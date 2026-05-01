import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { EARTH_LOCATIONS } from '../data/earthLocations';
import { MOON_LOCATIONS } from '../data/moonLocations';
import type { ObserverView } from '../astronomy/types';
import { SimulationControls } from './SimulationControls';

const visibleMoonView: ObserverView = {
  observerMode: 'earth',
  target: 'moon',
  visibility: 'visible',
  altitudeDeg: 35,
  azimuthDeg: 120,
  phaseFraction: 0.5,
  angularDiameterDeg: 0.52,
};

const hiddenMoonView: ObserverView = {
  observerMode: 'earth',
  target: 'moon',
  visibility: 'not-visible',
  altitudeDeg: -24.6,
  azimuthDeg: 210.2,
  phaseFraction: 0.5,
  angularDiameterDeg: 0.52,
  reason: 'The Moon is below the horizon for this Earth location and time.',
};

describe('SimulationControls', () => {
  test('toggles observer mode while keeping a single active view', async () => {
    const user = userEvent.setup();
    let mode: 'earth' | 'moon' = 'earth';

    render(
      <SimulationControls
        observerMode={mode}
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS[0]}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={visibleMoonView}
        onToggleObserverMode={() => {
          mode = 'moon';
        }}
        currentLunarAgeDays={12.5}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={() => undefined}
        onLunarAgeChange={() => undefined}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    await user.click(screen.getByRole('button', { name: /switch to moon/i }));

    expect(mode).toBe('moon');
  });

  test('communicates real apparent scale and visible status', () => {
    render(
      <SimulationControls
        observerMode="earth"
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS[0]}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={visibleMoonView}
        currentLunarAgeDays={12.5}
        onToggleObserverMode={() => undefined}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={() => undefined}
        onLunarAgeChange={() => undefined}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    expect(screen.getByRole('heading', { name: /real apparent scale/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Moon visible/i })).toBeInTheDocument();
    expect(screen.getByText('0.52°')).toBeInTheDocument();
  });

  test('shows location-sensitive direction values even when the Moon is below the horizon', () => {
    render(
      <SimulationControls
        observerMode="earth"
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS.find((location) => location.id === 'madrid')!}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={hiddenMoonView}
        currentLunarAgeDays={12.5}
        onToggleObserverMode={() => undefined}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={() => undefined}
        onLunarAgeChange={() => undefined}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    const status = screen.getByRole('region', { name: /observational status/i });
    expect(status).toHaveTextContent('Madrid, Spain');
    expect(status).toHaveTextContent('-24.6°');
    expect(status).toHaveTextContent('210.2°');
  });

  test('marks the Earth selector as saved for Earth view while Moon view is active', () => {
    render(
      <SimulationControls
        observerMode="moon"
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS[0]}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={{ ...visibleMoonView, observerMode: 'moon', target: 'earth' }}
        currentLunarAgeDays={12.5}
        onToggleObserverMode={() => undefined}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={() => undefined}
        onLunarAgeChange={() => undefined}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    expect(screen.getByText(/saved for Earth view/i)).toBeInTheDocument();
  });

  test('labels the date/time control as UTC so location changes do not imply local wall-clock recalculation', () => {
    render(
      <SimulationControls
        observerMode="earth"
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS[0]}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={visibleMoonView}
        currentLunarAgeDays={12.5}
        onToggleObserverMode={() => undefined}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={() => undefined}
        onLunarAgeChange={() => undefined}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    expect(screen.getByLabelText(/date and time \(UTC\)/i)).toBeInTheDocument();
  });

  test('calls time and lunar phase slider handlers with numeric values', () => {
    let selectedHour = 0;
    let selectedLunarAge = 0;

    render(
      <SimulationControls
        observerMode="earth"
        localDateTime="2026-05-01T18:30"
        earthLocation={EARTH_LOCATIONS[0]}
        moonLocation={MOON_LOCATIONS[0]}
        activeView={visibleMoonView}
        currentLunarAgeDays={12.5}
        onToggleObserverMode={() => undefined}
        onLocalDateTimeChange={() => undefined}
        onUtcHourChange={(hour) => {
          selectedHour = hour;
        }}
        onLunarAgeChange={(age) => {
          selectedLunarAge = age;
        }}
        onEarthLocationChange={() => undefined}
        onMoonLocationChange={() => undefined}
        onCenterTarget={() => undefined}
      />,
    );

    fireEvent.change(screen.getByLabelText(/UTC hour scrubber/i), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText(/Lunar phase scrubber/i), { target: { value: '22' } });

    expect(selectedHour).toBe(6);
    expect(selectedLunarAge).toBe(22);
  });
});
