# CTC-Frontend

Vite + React frontend for Connect-to-Code. Production auth talks to the Spring Boot API; Vercel rebuilds on every push to `main`.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

Copy `.env.example` to `.env`. Do not commit `.env`.

On Vercel, set the same keys for Production and Preview:

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend root, e.g. `https://codingplatform-tdt0.onrender.com/api/v1` |
| `VITE_USE_MOCK` | `false` when non-auth APIs are live |
| `VITE_USE_MOCK_AUTH` | `false` to use real login/signup/OAuth |

Redeploy after changing env vars. Vite inlines them at build time.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local Vite server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Typecheck + production bundle (`dist`) |
| `npm run preview` | Serve the production bundle |

## Deploy

- Production branch: `main`
- Framework: Vite
- Output directory: `dist`
- SPA fallback: `vercel.json` rewrites all routes to `index.html`
