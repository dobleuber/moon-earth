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
- Wrangler / Cloudflare Workers Assets

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

## Deploy to Cloudflare Workers Assets

This repository includes `wrangler.jsonc` for Cloudflare Workers Assets with SPA fallback:

```bash
npm run deploy
```

If using the Cloudflare dashboard build/deploy pipeline with a deploy command, use:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Build output directory: dist
Node version: 22
```

Do not add a Vite-style `public/_redirects` SPA fallback when deploying with Wrangler Assets; `wrangler.jsonc` already provides:

```jsonc
"assets": {
  "directory": "./dist",
  "not_found_handling": "single-page-application"
}
```

## Alternative: Cloudflare Pages only

For a plain Pages static deployment, no Wrangler deploy command is needed:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Node version: 22
```
