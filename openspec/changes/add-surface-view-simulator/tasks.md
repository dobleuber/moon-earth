## 1. Project Setup

- [x] 1.1 Create a Vite React TypeScript SPA scaffold in the repository.
- [x] 1.2 Add core dependencies for React Three Fiber, Three.js, drei helpers, browser astronomy calculations, date/time handling, state management, and testing.
- [x] 1.3 Configure TypeScript, lint/build scripts, and Vitest test execution.
- [x] 1.4 Establish source folders for state, astronomy, scene, UI, and location data.

## 2. Simulation State and Location Data

- [x] 2.1 Define shared simulation types for observer mode, date/time, Earth location, Moon location, target visibility, phase, altitude, azimuth, and angular diameter.
- [x] 2.2 Implement centralized simulation state for observer mode, selected date/time, selected Earth location, and selected Moon location.
- [x] 2.3 Add curated Earth location presets with names, latitude, longitude, and timezone metadata.
- [x] 2.4 Add curated Moon location presets covering near-side, limb, far-side, Apollo 11, and polar examples.
- [x] 2.5 Verify state persists selected Earth and Moon locations when switching observer modes.

## 3. Astronomy Engine

- [x] 3.1 Implement a browser-side astronomy interface that returns a normalized observer-view model independent of rendering.
- [x] 3.2 Implement Earth observer calculations for Moon altitude, azimuth, phase, visibility, and angular diameter.
- [x] 3.3 Implement Moon observer educational-realistic calculations for Earth direction, phase, visibility, and angular diameter.
- [x] 3.4 Implement near-side, limb, and far-side lunar visibility classification for location presets.
- [x] 3.5 Add UTC conversion for selected date/time inputs before astronomy calculations.
- [x] 3.6 Add unit tests for known visible, below-horizon, near-side, limb, and far-side scenarios.

## 4. 3D Scene Foundation

- [x] 4.1 Create the single active 3D surface-view panel using React Three Fiber.
- [x] 4.2 Implement fixed-position camera controls that allow rotation/look-around but disable walking, panning, and translation.
- [x] 4.3 Convert target altitude and azimuth into a 3D sky direction for object placement.
- [x] 4.4 Render visible celestial targets at a fixed far scene distance using calculated real angular diameter.
- [x] 4.5 Ensure non-visible targets are not rendered above the horizon.
- [x] 4.6 Add a center-target control that rotates the camera toward the visible target without moving the observer.

## 5. Earth and Moon Environments

- [x] 5.1 Implement a generic Earth observer environment with ground, horizon, and day/night sky appearance.
- [x] 5.2 Implement a generic Moon observer environment with lunar terrain, horizon, hard lighting, and black sky.
- [x] 5.3 Add visual rendering for the Moon target including phase display suitable for educational realism.
- [x] 5.4 Add visual rendering for the Earth target including phase display suitable for educational realism.
- [x] 5.5 Validate that the Moon and Earth remain real-scale only with no exaggerated scale option.

## 6. User Interface

- [x] 6.1 Implement the single-panel app layout with controls around the 3D view.
- [x] 6.2 Add observer mode toggle for Earth ↔ Moon while preserving the selected date/time.
- [x] 6.3 Add real date and time controls with clear timezone/display behavior.
- [x] 6.4 Add Earth location preset selector.
- [x] 6.5 Add Moon location preset selector.
- [x] 6.6 Add target status summary showing target name, visibility, phase, and apparent angular size when available.

## 7. Educational Feedback

- [x] 7.1 Display an explanation when the Moon is below the Earth observer horizon.
- [x] 7.2 Display an explanation when Earth is not visible from the selected lunar location.
- [x] 7.3 Communicate that Moon and Earth are rendered at real apparent angular scale only.
- [x] 7.4 Add concise educational copy relating Moon phase from Earth and Earth phase from Moon.
- [x] 7.5 Add help or methodology copy disclosing educational-realistic precision rather than NASA/JPL ephemeris-grade accuracy.
- [x] 7.6 Add lunar preset learning cues for near-side, limb, and far-side selections.

## 8. Verification and Polish

- [x] 8.1 Run unit tests for astronomy calculations and state behavior.
- [x] 8.2 Run build and type-check verification.
- [x] 8.3 Manually verify Earth observer mode for visible Moon and below-horizon Moon cases.
- [x] 8.4 Manually verify Moon observer mode for near-side visible Earth, limb Earth-near-horizon, and far-side invisible Earth cases.
- [x] 8.5 Manually verify camera controls rotate only and never translate the observer.
- [x] 8.6 Manually verify no UI control exaggerates apparent scale.
- [x] 8.7 Run `openspec validate add-surface-view-simulator --type change --strict` and resolve any validation issues.

## 9. Time and Phase Scrubbers

- [x] 9.1 Add a UTC hour scrubber that updates time on the selected date.
- [x] 9.2 Add a lunar phase scrubber that moves to a real date/time near the current lunar cycle.
- [x] 9.3 Show the current lunar age next to the phase scrubber.
- [x] 9.4 Add tests for UTC hour and lunar phase state updates.
- [x] 9.5 Add UI tests for the new scrubber controls.
