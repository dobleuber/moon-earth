## Context

This change introduces the first application experience for the project: a browser-based educational simulator that shows what the Moon looks like from Earth and what Earth looks like from the Moon from a fixed surface observer. The repository currently contains OpenSpec structure only, so the implementation can start with a simple client-side architecture rather than fitting into an existing app.

The simulator prioritizes observational understanding over orbital diagrams. Users choose a real date/time and a surface location, then look around from a fixed point. The rendered object must use real apparent angular scale only. The app should remain educational-realistic, not NASA/JPL-grade, and should avoid backend, database, authentication, SSR, terrain reconstruction, or free walking.

## Goals / Non-Goals

**Goals:**

- Build a Vite + React + TypeScript single-page application.
- Render one 3D surface view at a time with a toggle between Earth observer mode and Moon observer mode.
- Support fixed-position camera rotation so users can look around without changing location.
- Use browser-side astronomy calculations to determine object direction, phase, visibility, and apparent angular size.
- Render the Moon from Earth and Earth from the Moon at real apparent angular scale only.
- Provide curated Earth and Moon location presets, plus a structure that can later support custom coordinates.
- Show clear educational feedback when the observed object is not visible.

**Non-Goals:**

- No walking, flying, terrain traversal, or free movement across the surface.
- No exaggerated scale, artistic enlargement, or alternate size modes.
- No exact city skyline, real lunar topography, or photorealistic reconstruction.
- No backend service, user accounts, persistent database, SSR, or SEO content site.
- No NASA/JPL/SPICE ephemeris integration in the first version.
- No full planetarium feature set, constellation catalogue, or full solar system simulator.

## Decisions

### Use Vite + React + TypeScript for the SPA

The app should be a client-side SPA because the core experience is interactive rendering and local calculations. Vite keeps setup small and fast, while TypeScript helps protect astronomy and rendering data contracts.

Alternatives considered:

- Next.js: useful for content-heavy educational pages, SSR, or SEO, but unnecessary for the first interactive simulator.
- Plain Three.js without React: possible, but React improves UI composition and state-driven scene updates.

### Use Three.js through React Three Fiber

React Three Fiber provides a React-friendly bridge to Three.js for the 3D scene, while still allowing low-level control of camera, object placement, materials, lighting, and billboards/spheres. `@react-three/drei` can provide camera/control helpers, but controls should be restricted to rotation only.

Alternatives considered:

- Babylon.js: powerful, but more engine-like than needed for a fixed observer scene.
- CesiumJS: strong geospatial engine, but too heavy for a generic local surface view.
- A-Frame/WebXR-first stack: convenient for VR, but less direct for precise educational controls.

### Separate astronomy from rendering

The astronomy layer should produce an observer-view model, not render objects directly. The 3D layer consumes this model and places the visual object in the sky.

Conceptual data flow:

```text
simulation state
  - observer mode
  - date/time
  - Earth location
  - Moon location
        │
        ▼
astronomy engine
  - target body
  - altitude / azimuth
  - phase fraction and orientation
  - angular diameter
  - visibility status
        │
        ▼
3D scene
  - camera orientation
  - sky/environment
  - terrain/horizon
  - Moon/Earth visual at real angular scale
  - educational status text
```

This keeps the app adaptable: the first astronomy implementation can be educational-realistic, and later precision improvements can replace internals without rewriting UI and scene components.

### Use educational-realistic astronomy calculations in-browser

The Earth observer mode should use a browser-side astronomy library such as `astronomy-engine` for Sun/Moon position, lunar phase, and distance-based angular size. The Moon observer mode can start with an educational geometric model using the Moon/Earth/Sun relationship, lunar latitude/longitude, near-side/far-side visibility, and simplified libration or no libration.

Alternatives considered:

- NASA/JPL/Horizons/SPICE data: more accurate but significantly increases complexity, data size, and likely backend needs.
- Fully hand-authored phase slider: easier, but violates the requirement for real dates and times.

### Represent apparent scale using angular size, not physical distance in-scene

The 3D scene should not place Earth and Moon at real physical distances. Instead, the astronomy layer supplies angular diameter, and the scene renders the celestial body at a fixed far distance with a size that subtends the correct visual angle from the camera.

This preserves the user's requirement: scale is real from the observer's point of view. It also avoids unusable scenes where physically realistic distances make objects difficult to manage inside a web renderer.

### Use one view panel with mode switching

The UI should show a single active 3D scene. A mode toggle switches between:

- Earth observer: fixed terrestrial location looking for the Moon.
- Moon observer: fixed lunar location looking for the Earth.

Both modes share the same selected date/time. The app keeps separate selected Earth and Moon locations so users can switch perspectives without losing context.

### Use generic environments with accurate observational behavior

The Earth environment should provide a generic horizon/ground and sky coloring that reflects day/night conditions. The Moon environment should provide generic gray lunar terrain, a horizon, hard lighting, and a black sky regardless of lunar day/night.

The environment is illustrative. The scientific fidelity is concentrated in object direction, visibility, phase, and apparent scale.

### Treat non-visible cases as first-class educational outcomes

If the object is below the horizon or otherwise not visible, the app should not force-render it. Instead, it should show an explanation and optionally offer controls such as changing time, selecting a different location, or centering on the horizon direction.

Examples:

- The Moon is below the horizon for this Earth location and time.
- Earth is not visible from this lunar far-side location.
- The Moon is above the horizon during daytime, so contrast may be low.

## Risks / Trade-offs

- **Real apparent scale may feel too small on normal screens** → Keep scale real, provide a "center object" control and textual angular-size/visibility cues rather than visual exaggeration.
- **Moon observer calculations can become complex** → Start with a documented educational model, near-side/far-side rules, and a clean interface that permits later precision improvements.
- **Users may expect exact NASA-grade results** → Label the simulator as educational-realistic and avoid claims of ephemeris-grade precision.
- **Date/time and timezone handling can confuse users** → Store calculations internally in UTC while making the displayed local time and selected timezone explicit.
- **3D controls may accidentally allow movement** → Configure controls to disable pan/translate and constrain interaction to rotation/look-around only.
- **Phase orientation may be hard to render correctly** → Treat phase fraction as required for v1 and phase orientation as an implementation detail to validate with known dates before relying on it educationally.
- **Object invisibility may look like a broken app** → Show persistent explanatory status when the target is not currently visible.

## Migration Plan

This is a new application scaffold, so no data migration is required.

Suggested rollout sequence:

1. Create the Vite React TypeScript app scaffold.
2. Add state, location presets, and astronomy interfaces.
3. Implement Earth observer calculations and basic 3D scene.
4. Add Moon observer approximation and lunar location presets.
5. Add educational visibility messages and validation cases.

Rollback is simple during initial development: remove the generated app scaffold and dependencies before release if the approach proves unsuitable.

## Open Questions

- Which exact astronomy package should be selected after a small validation spike?
- Should custom coordinate entry be included in v1, or should v1 only include curated presets?
- How detailed should phase orientation be for the first release?
- Should the app show the Sun as a visible object, or only use it for lighting and educational messages?
- Which Earth and Moon presets should be included by default?
