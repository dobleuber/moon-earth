import type { EarthLocation, MoonLocation, ObserverMode, ObserverView } from '../astronomy/types';
import { EARTH_LOCATIONS } from '../data/earthLocations';
import { MOON_LOCATIONS } from '../data/moonLocations';

interface SimulationControlsProps {
  observerMode: ObserverMode;
  localDateTime: string;
  earthLocation: EarthLocation;
  moonLocation: MoonLocation;
  activeView: ObserverView;
  currentLunarAgeDays: number;
  onToggleObserverMode: () => void;
  onLocalDateTimeChange: (value: string) => void;
  onUtcHourChange: (hour: number) => void;
  onLunarAgeChange: (ageDays: number) => void;
  onEarthLocationChange: (id: string) => void;
  onMoonLocationChange: (id: string) => void;
  onCenterTarget: () => void;
}

export function SimulationControls({
  observerMode,
  localDateTime,
  earthLocation,
  moonLocation,
  activeView,
  currentLunarAgeDays,
  onToggleObserverMode,
  onLocalDateTimeChange,
  onUtcHourChange,
  onLunarAgeChange,
  onEarthLocationChange,
  onMoonLocationChange,
  onCenterTarget,
}: SimulationControlsProps) {
  const targetLabel = activeView.target === 'moon' ? 'Moon' : 'Earth';
  const nextMode = observerMode === 'earth' ? 'Moon' : 'Earth';
  const activeLocation = observerMode === 'earth' ? earthLocation.name : moonLocation.name;
  const utcHour = hourValueFromLocalDateTime(localDateTime);

  return (
    <aside className="control-panel" aria-label="Simulation controls">
      <div className="control-panel__header">
        <div>
          <p className="eyebrow">Surface observer</p>
          <h1>{observerMode === 'earth' ? 'Earth view' : 'Moon view'}</h1>
        </div>
        <button type="button" className="primary" onClick={onToggleObserverMode}>
          Switch to {nextMode}
        </button>
      </div>

      <label>
        Date and time (UTC)
        <input
          type="datetime-local"
          value={localDateTime}
          onChange={(event) => onLocalDateTimeChange(event.target.value)}
        />
      </label>

      <label>
        UTC hour scrubber <span className="field-hint">{formatHourValue(utcHour)}</span>
        <input
          type="range"
          min="0"
          max="23.75"
          step="0.25"
          value={utcHour}
          onChange={(event) => onUtcHourChange(Number(event.target.value))}
        />
      </label>

      <label>
        Lunar phase scrubber <span className="field-hint">day {currentLunarAgeDays.toFixed(1)} of 29.5</span>
        <input
          type="range"
          min="0"
          max="29.53"
          step="0.25"
          value={currentLunarAgeDays}
          onChange={(event) => onLunarAgeChange(Number(event.target.value))}
        />
      </label>

      <label>
        <span>
          Earth location
          {observerMode === 'moon' && <span className="field-hint"> saved for Earth view</span>}
        </span>
        <select value={earthLocation.id} onChange={(event) => onEarthLocationChange(event.target.value)}>
          {EARTH_LOCATIONS.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          Moon location
          {observerMode === 'earth' && <span className="field-hint"> saved for Moon view</span>}
        </span>
        <select value={moonLocation.id} onChange={(event) => onMoonLocationChange(event.target.value)}>
          {MOON_LOCATIONS.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={onCenterTarget}>
        Center {targetLabel}
      </button>

      <section className="status-card" aria-label="Observational status">
        <h2>{targetLabel} {activeView.visibility === 'visible' ? 'visible' : 'not visible'}</h2>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>{activeLocation}</dd>
          </div>
          <div>
            <dt>Altitude</dt>
            <dd>{activeView.altitudeDeg.toFixed(1)}°</dd>
          </div>
          <div>
            <dt>Azimuth</dt>
            <dd>{activeView.azimuthDeg.toFixed(1)}°</dd>
          </div>
          <div>
            <dt>Phase</dt>
            <dd>{formatPhase(activeView.phaseFraction)}</dd>
          </div>
          <div>
            <dt>Apparent size</dt>
            <dd>{activeView.angularDiameterDeg.toFixed(2)}°</dd>
          </div>
        </dl>
        {activeView.visibility !== 'visible' && <p className="status-reason">{activeView.reason}</p>}
      </section>

      <section className="education-card">
        <h2>Real apparent scale</h2>
        <p>
          The {targetLabel} is rendered at real apparent scale only. There is no enlarged or dramatic size mode.
        </p>
        <p>{phaseRelationshipCopy(activeView)}</p>
        <p>{locationCue(observerMode, moonLocation, activeView)}</p>
        <small>
          Educational-realistic model: calculations are intended for learning and are not NASA/JPL ephemeris-grade precision.
        </small>
      </section>
    </aside>
  );
}

function formatPhase(phaseFraction: number): string {
  return `${Math.round(phaseFraction * 100)}% illuminated`;
}

function hourValueFromLocalDateTime(localDateTime: string): number {
  const [, time = '00:00'] = localDateTime.split('T');
  const [hour = '0', minute = '0'] = time.split(':');
  return Number(hour) + Number(minute) / 60;
}

function formatHourValue(hourValue: number): string {
  const hour = Math.floor(hourValue).toString().padStart(2, '0');
  const minute = Math.round((hourValue - Math.floor(hourValue)) * 60).toString().padStart(2, '0');
  return `${hour}:${minute} UTC`;
}

function phaseRelationshipCopy(view: ObserverView): string {
  if (view.target === 'moon') {
    return 'The Moon phase seen from Earth corresponds to the Sun-Earth-Moon geometry at this real instant.';
  }

  return 'From the Moon, Earth phase is complementary to the Moon phase seen from Earth: a full Moon means a mostly dark Earth.';
}

function locationCue(observerMode: ObserverMode, moonLocation: MoonLocation, view: ObserverView): string {
  if (observerMode === 'earth') {
    return 'On Earth, the Moon rises and sets with local sky geometry, so it may be below your horizon.';
  }

  if (view.lunarVisibilityClass === 'far-side') {
    return `${moonLocation.name}: Earth is generally not visible from this far-side region.`;
  }

  if (view.lunarVisibilityClass === 'limb') {
    return `${moonLocation.name}: Earth appears close to the lunar horizon in this model.`;
  }

  return `${moonLocation.name}: Earth is generally visible from this near-side region.`;
}
