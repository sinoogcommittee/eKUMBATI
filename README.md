# e-KUMBATI: Official Web Portal & Digital Action Center
### 3rd Congressional District of Bohol | Office of Congresswoman Alexie Besas Tutor

![e-KUMBATI Banner](https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80)

**e-KUMBATI** is the official bilingual (English and Cebuano / Binisaya) constituent web portal, emergency response directory, and back-office administrative platform for the 3rd Congressional District of Bohol, represented by Congresswoman Kristine Alexie Besas Tutor.

---

## 🌟 The 7 Flagship 2027 KUMBATI Impact Metrics

The portal prominently tracks and verifies the 7 flagship district accomplishments:
1. **Pabahay ni Kumbati**: **310+** Safe & Resilient Concrete Housing Beneficiaries.
2. **Patient Transport Vehicles (PTV)**: **4** Dedicated 24/7 Emergency Medical & Referral Vans (6,200+ patient runs).
3. **Tambayan ni Kumbati for Dialysis Patients**: **1** Free Patient Haven in Tagbilaran City offering free air-conditioned beds and meals.
4. **KUMBATI Community Beneficiaries**: **36+** Grassroots Communities empowered through solar electrification, water supply, and access paths.
5. **Kumbati Medical Clinic**: **3,200+** Patients provided with free doctor checkups, laboratory vouchers, and maintenance medications.
6. **Sustainable Livelihood Program**: **88+** People's organizations, cooperatives, and women's associations funded with capital and toolkits.
7. **CHED-TDP & District Scholars**: **4,500+** Tertiary students supported through Tulong Dunong Program and congressional grants.

---

## 🏛️ District 3 Coverage: The 19 Municipalities

Alicia • Anda • Batuan • Bilar • Candijay • Carmen • Dimiao • Duero • Garcia Hernandez • Guindulman • Jagna • Lila • Loay • Loboc • Mabini • Pilar • Sevilla • Sierra Bullones • Valencia

---

## 🚀 Key Features

- **Hybrid Resilience & Offline Mode**: Operates seamlessly whether connected to Supabase BaaS or running completely standalone using pre-packaged seed data (`src/lib/constants.ts`).
- **Constituent Action Center**:
  - File assistance requests, inquiries, grievances, or commendations.
  - Automatically issues an alphanumeric Reference Tracking Code (e.g. `KMB-2027-XXXXX`).
  - Real-time resolution progress tracker (Submitted &rarr; In Review &rarr; Action Taken &rarr; Resolved).
- **19-Town Directory & Interactive Leaflet Map**:
  - Direct telephone links (`tel:`) for all Municipal Halls, MDRRMO rescue lines, and Congressional field offices.
  - Interactive Leaflet map with customized pulsing SVG pins, category filters, and town dropdown.
- **Client-Side WebP Image Optimization**:
  - Uses `browser-image-compression` via web workers to convert photos to modern `.webp` format before storage, reducing cellular bandwidth usage by ~80%.
- **Bilingual Interface**: Reactive language switcher (`EN` / `CEB`) with persistent storage.
- **Administrative CMS Back-Office (`/admin`)**:
  - Live management of site copy, 7 impact counters, program requirement checklists, photo albums, action center tickets, and hotlines.
  - **1-Click Demo Sandbox Admin** (`demo@kumbati.bohol3.gov.ph` / `kumbati2027`).

---

## 🛠️ Technology Stack

- **Frontend**: Vite 5 + React 18 + TypeScript 5
- **Styling**: Tailwind CSS v3 with custom KUMBATI palette tokens
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **Mapping**: Leaflet v1.9 + React-Leaflet v4
- **Image Compression**: browser-image-compression
- **Backend & Auth**: Supabase (@supabase/supabase-js) + PostgreSQL 15
- **Routing**: React Router DOM v6 with route-level code splitting

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+ and npm

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env` if connecting to a live Supabase backend:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
> *Note: If these variables are not provided, the platform automatically activates offline mode with verified seed data.*

### 4. Run Development Server
```bash
npm run dev
```

### 5. Production Build
```bash
npm run build
```

---

## 🚢 Production Deployment (Render.com)

- **Environment**: Static Site
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **SPA Rewrite Rule**:
  - Source: `/*`
  - Destination: `/index.html`
  - Status: `200`
