# Moon ↔ Earth Surface View

Educational 3D web app that simulates what the Moon looks like from Earth, and what Earth looks like from the Moon, from fixed surface observer locations.

## Tech stack

- Vite
- React
- TypeScript
- Three.js / React Three Fiber
- astronomy-engine
- Zustand
- Luxon
- Vitest

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
```

## Deploy to Cloudflare Pages

Use these build settings:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Node version: 22
```

The SPA fallback lives in `public/_redirects` and is copied into `dist/` by Vite.
