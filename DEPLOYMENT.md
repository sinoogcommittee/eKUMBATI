# Production Deployment Guide
## e-KUMBATI Web Portal & CMS

---

## 1. Static Site Hosting (Render.com)

`e-KUMBATI` is engineered as a high-performance Single Page Application (SPA). It can be deployed on Render, Cloudflare Pages, Vercel, or Netlify.

### 1.1 Render Configuration Settings
- **Name**: `e-kumbati`
- **Environment**: `Static Site`
- **Branch**: `main`
- **Build Command**:
  ```bash
  npm install && npm run build
  ```
- **Publish Directory**:
  ```
  dist
  ```
- **Redirects / Rewrites Rules (SPA Routing)**:
  To allow deep links like `/action-center` or `/admin/dashboard` to refresh without 404 errors, add this redirect rule in the Render Dashboard:
  - **Type**: `Rewrite`
  - **Source**: `/*`
  - **Destination**: `/index.html`
  - **Status**: `200`

---

## 2. Environment Variables Configuration

In your hosting platform's Environment Variables dashboard (or local `.env`), supply:

| Variable Name | Required | Description | Example Value |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Optional | Your Supabase project REST URL | `https://xyzprojectid.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase public anonymous API key | `eyJhbGciOiJIUzI1NiIsInR5cCI...` |

> **Note on Resilient Fallback**: If either variable is omitted or left empty, `e-KUMBATI` will automatically boot in high-fidelity offline mode, loading verified seed data from `src/lib/constants.ts` and activating local storage for constituent ticket tracking.

---

## 3. Supabase Storage Setup (`kumbati-media`)

If connecting to a live Supabase backend:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Storage** -> **Create New Bucket**.
3. Set **Bucket Name**: `kumbati-media`.
4. Toggle **Public Bucket**: `ON` (Checked).
5. Set file size limit to `5 MB` and allowed MIME types to `image/webp, image/jpeg, image/png`.
6. Run the SQL schema and RLS policies from [DATABASE.md](file:///e:/Programs/e-KUMBATI/DATABASE.md) in the Supabase SQL Editor.

---

## 4. Local Build & Preview Test

To verify the production build locally before triggering a remote git push:

```bash
# 1. Install all dependencies
npm install

# 2. Run TypeScript build and asset bundle
npm run build

# 3. Preview the production dist folder
npm run preview
```

---

## 5. Post-Deployment Verification Checklist
- [ ] Visit the homepage (`/`) and verify that all 7 impact counters display their verified figures.
- [ ] Toggle language between English and Binisaya to confirm translation reactivity.
- [ ] Submit a test ticket in the Action Center (`/action-center`) and verify that an alphanumeric reference tracking code (e.g., `KMB-2025-XXXXX`) is generated and retrievable.
- [ ] Test the interactive Leaflet Map (`/map`) to ensure pins render properly across the 19 municipalities.
- [ ] Access the Admin Login (`/admin/login`) and verify the Demo Mode login (`demo@kumbati.bohol3.gov.ph` / `kumbati2025`).
