## Why

Learners need an intuitive way to understand what the Moon looks like from Earth and what Earth looks like from the Moon at the same real moment in time. A surface-based 3D simulator can make lunar phases, Earth phases, visibility, horizon position, and apparent size concrete without requiring a full planetarium or NASA-grade simulation.

## What Changes

- Add a web-based 3D surface-view simulator as a simple Vite SPA.
- Provide a single 3D viewing panel with a toggle between Earth observer mode and Moon observer mode.
- Let users choose real date/time values and selectable Earth/Moon observation locations.
- Render a fixed-position observer camera that can rotate/look around but cannot walk or move across the surface.
- Show the Moon from Earth or Earth from the Moon using real apparent angular scale only, with no exaggerated size mode.
- Use educational-realistic astronomy calculations for position, phase, visibility, and apparent size.
- Use generic Earth and Moon surface environments rather than exact terrain or city reconstruction.
- Explain non-visible cases, such as the Moon being below the Earth observer horizon or Earth being invisible from the lunar far side.

## Capabilities

### New Capabilities

- `surface-observer-simulation`: Covers selecting observer mode, date/time, location, and determining what celestial object should be visible from the selected surface location.
- `real-scale-3d-view`: Covers rendering the fixed-position 3D surface scene, rotatable camera, generic environments, and celestial body display at real apparent angular scale.
- `educational-astronomy-feedback`: Covers user-facing explanations for phases, visibility, horizon cases, and the relationship between Earth/Moon views.

### Modified Capabilities

None.

## Impact

- Introduces a Vite + React + TypeScript SPA structure for the application.
- Adds 3D rendering dependencies, likely Three.js, React Three Fiber, and supporting scene utilities.
- Adds a browser-side astronomy calculation dependency suitable for educational-realistic Sun/Moon/Earth positioning.
- Adds local app state for observer mode, date/time, Earth location, and Moon location.
- Adds curated Earth and Moon location presets, including lunar locations that demonstrate Earth-visible, limb, and far-side cases.
- No backend, authentication, database, server-side rendering, or NASA/JPL ephemeris integration is required for this change.
