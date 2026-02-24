# NexusOS Frontend

React 19 + TypeScript dashboard powered by Vite 7.3 with feature-based file structure, Zustand state, and React Router 7. Deploy-ready via static site hosts.

## Prerequisites

- Node.js 20+
- npm 10+
- No runtime environment variables are required for the current build.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

Configuration lives in `vercel.json` and outputs static assets from `dist/`.

1. Install the [Vercel CLI](https://vercel.com/docs/cli) and log in: `npm i -g vercel && vercel login`.
2. From the repo root run `vercel` to create the project (select **Framework Preset: Vite** if prompted).
3. For subsequent deployments use `vercel --prod` (build command: `npm run build`, output: `dist`).
4. SPA routing is handled by the rewrite rule forwarding every path to `/index.html`.

### Netlify

`netlify.toml` contains equivalent settings.

1. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/): `npm i -g netlify-cli` and run `netlify login`.
2. Link the site: `netlify init` (build command `npm run build`, publish directory `dist`).
3. Deploy previews with `netlify deploy --build --prod` or enable continuous deployment from GitHub.
4. The redirect in `netlify.toml` ensures SPA routes resolve to `index.html` with 200 status.

### Custom hosts / static storage

1. Run `npm run build`.
2. Upload the contents of `dist/` to your static host (S3 + CloudFront, Azure Static Web Apps, etc.).
3. Configure the host to serve `index.html` for all unmatched routes to support React Router.

## Linting

```bash
npm run lint
```

ESLint is configured via `eslint.config.js`; adjust extends/rules as needed for production hardening.
