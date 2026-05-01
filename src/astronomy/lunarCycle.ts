import { MoonPhase, SearchMoonPhase } from 'astronomy-engine';
import { DateTime } from 'luxon';
import { clamp } from './geometry';

export const SYNODIC_MONTH_DAYS = 29.530588853;

export function lunarAgeDays(instant: Date): number {
  return (MoonPhase(instant) / 360) * SYNODIC_MONTH_DAYS;
}

export function phaseNameForLunarAge(ageDays: number): string {
  const age = ((ageDays % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;

  if (age < 1 || age > SYNODIC_MONTH_DAYS - 1) return 'New Moon';
  if (age < 6.4) return 'Waxing crescent';
  if (age < 8.4) return 'First quarter';
  if (age < 13.8) return 'Waxing gibbous';
  if (age < 15.8) return 'Full Moon';
  if (age < 21.1) return 'Waning gibbous';
  if (age < 23.1) return 'Last quarter';
  return 'Waning crescent';
}

export function nearestDateTimeForLunarAge(currentInstant: Date, targetAgeDays: number): DateTime {
  const boundedAge = clamp(targetAgeDays, 0, SYNODIC_MONTH_DAYS);
  const targetLongitude = (boundedAge / SYNODIC_MONTH_DAYS) * 360;
  const start = DateTime.fromJSDate(currentInstant, { zone: 'UTC' }).minus({ days: SYNODIC_MONTH_DAYS / 2 }).toJSDate();
  const result = SearchMoonPhase(targetLongitude, start, SYNODIC_MONTH_DAYS + 1);

  if (!result) {
    return DateTime.fromJSDate(currentInstant, { zone: 'UTC' });
  }

  return DateTime.fromJSDate(result.date, { zone: 'UTC' });
}

export function formatUtcDateTime(dateTime: DateTime): string {
  return dateTime.toUTC().toFormat("yyyy-MM-dd'T'HH:mm");
}
