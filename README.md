# Bishnu Pokhrel Portfolio Frontend

Vue 3 + Vite frontend for Bishnu Pokhrel's dynamic portfolio website. The app is designed to read live content from a Laravel API, with a complete `src/data.js` fallback so the portfolio still renders when the API is unavailable or blocked by CORS.

Live site:

```text
https://bishnupkl.github.io/portfolio/
```

Live API base:

```text
https://baldevsir.com/new/api
```

## Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Tailwind CSS
- Lucide icons
- GitHub Pages deployment with GitHub Actions
- Netlify-ready configuration

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment file:

```bash
cp .env.example .env
```

For local Laravel API development, use:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For live API testing, use:

```env
VITE_API_BASE_URL=https://baldevsir.com/new/api
```

Run the frontend:

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

## Build

Standard production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

GitHub Pages build uses the `/portfolio/` base path automatically when `GITHUB_PAGES=true`:

```bash
GITHUB_PAGES=true VITE_API_BASE_URL=https://baldevsir.com/new/api npm run build
```

## API And Fallback Data

The app reads API data from `VITE_API_BASE_URL`.

Expected endpoints:

```text
GET /profile
GET /skills
GET /services
GET /projects
GET /projects/{slug}
GET /testimonials
GET /settings
POST /contact
```

If `VITE_API_BASE_URL` is empty, unavailable, or blocked by CORS, the app uses:

```text
src/data.js
```

This fallback keeps GitHub Pages and static builds usable even before the backend is configured.

## CORS Requirement

For the GitHub Pages site to read the Laravel API, the backend must allow this origin:

```text
https://bishnupkl.github.io
```

Example Laravel `.env` values:

```env
FRONTEND_URL=https://bishnupkl.github.io
NETLIFY_URL=https://bishnupkl.github.io
GITHUB_PAGES_URL=https://bishnupkl.github.io
```

After changing backend CORS config, clear Laravel config cache:

```bash
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

Verify CORS:

```bash
curl -I -H "Origin: https://bishnupkl.github.io" https://baldevsir.com/new/api/profile
```

The response should include:

```text
access-control-allow-origin: https://bishnupkl.github.io
```

## GitHub Pages Deployment

Deployment is handled by:

```text
.github/workflows/deploy.yml
```

On every push to `master`, GitHub Actions:

1. Installs dependencies with `npm ci`.
2. Builds with `npm run build`.
3. Uses `GITHUB_PAGES=true` so Vite builds assets for `/portfolio/`.
4. Copies `dist/index.html` to `dist/404.html` for SPA fallback.
5. Deploys `dist` to GitHub Pages.

GitHub repository settings:

```text
Settings -> Pages -> Source: GitHub Actions
```

## Netlify Deployment

The project also includes `netlify.toml`.

Netlify settings:

```text
Build command: npm run build
Publish directory: dist
```

Set environment variable:

```env
VITE_API_BASE_URL=https://baldevsir.com/new/api
```

## Useful Files

```text
src/components/        Reusable Vue sections
src/views/             Home and project detail pages
src/stores/portfolio.js  API loading and fallback merge logic
src/services/api.js    Axios API client
src/data.js            Static fallback portfolio data
src/style.css          Global Tailwind and custom styles
vite.config.js         Vite config with GitHub Pages base path
```

## Troubleshooting

Blank page on GitHub Pages:

- Confirm GitHub Actions finished successfully.
- Hard refresh or open in incognito.
- Confirm the site URL uses the trailing slash: `https://bishnupkl.github.io/portfolio/`.
- Check that assets load from `/portfolio/assets/...`.

Static data instead of live API data:

- Check browser console for CORS errors.
- Verify the API response header allows `https://bishnupkl.github.io`.
- Confirm GitHub Actions built with the correct `VITE_API_BASE_URL`.

Project detail routes return 404:

- The workflow creates `dist/404.html` from `dist/index.html`.
- Confirm the latest GitHub Pages deployment includes that step.

## Repository Hygiene

Committed:

```text
src/
public/
index.html
package.json
package-lock.json
vite.config.js
tailwind.config.js
postcss.config.js
netlify.toml
.github/workflows/deploy.yml
.env.example
```

Ignored:

```text
node_modules/
dist/
.env
```
