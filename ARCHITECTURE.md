# System Architecture Document
## e-KUMBATI Web Portal & CMS
### 3rd District of Bohol | Office of Congresswoman Alexie Besas Tutor

---

## 1. High-Level Technology Stack

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  +-----------------------------------------------------------------------------+  |
|  |  React 18 + TypeScript + Vite 5                                              |  |
|  |  Routing: React Router DOM v6 (Data loaders & Nested Layouts)                |  |
|  |  Styling: Tailwind CSS v3 + Custom KUMBATI Palette Tokenization              |  |
|  |  Icons: Lucide React                                                        |  |
|  |  Motion & Transition: Framer Motion v11                                     |  |
|  |  Mapping & Geospatial: Leaflet v1.9 + React-Leaflet v4                      |  |
|  |  Asset Optimization: browser-image-compression (Client-side WebP)          |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        STATE & DATA RESILIENCE LAYER                              |
|  +------------------------------+             +--------------------------------+  |
|  |  LanguageContext (EN/CEB)    |             |  AuthContext (Supabase / Demo) |  |
|  +------------------------------+             +--------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
|  |  Data Bridge: Supabase Client <---> Fallback Constants Layer                 |  |
|  |  (If env missing or fetch fails, gracefully serves src/lib/constants.ts)    |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                                BACKEND & STORAGE                                  |
|  +-----------------------------------------------------------------------------+  |
|  |  Supabase BaaS (PostgreSQL 15 + PostgREST + Auth + Row Level Security)       |  |
|  |  Supabase Storage Bucket: 'kumbati-media' (Public read, authenticated write)|  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                              HOSTING & DEPLOYMENT                                 |
|  +-----------------------------------------------------------------------------+  |
|  |  Static Site Hosting: Render / Cloudflare Pages / Vercel                     |  |
|  |  Build command: `npm run build` | Output: `dist` | SPA Rewrite: `/*` -> `/`  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory Layout & Module Structure

```
e-KUMBATI/
├── index.html                    # Root HTML with Leaflet CSS link & meta tags
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # Strict TypeScript configuration
├── tsconfig.node.json            # Node TypeScript configuration
├── vite.config.ts                # Vite config with React plugin & path aliases
├── tailwind.config.js            # KUMBATI brand tokens & responsive breakpoints
├── postcss.config.js             # PostCSS Tailwind and Autoprefixer
├── .env.example                  # Template for Supabase URL & Anon Key
├── PRD.md                        # Product Requirements
├── ARCHITECTURE.md               # This document
├── RULES.md                      # Operational & coding rules
├── DESIGN.md                     # Brand design tokens & styling guidelines
├── DATABASE.md                   # Full Supabase SQL schema & RLS policies
├── TASKS.md                      # Phase breakdown & status tracker
├── MEMORY.md                     # Project state memory
├── DEPLOYMENT.md                 # Production deployment steps
└── src/
    ├── main.tsx                  # Application bootstrap with root providers
    ├── App.tsx                   # Top-level Router configuration
    ├── index.css                 # Global CSS + Tailwind directives + Leaflet tweaks
    ├── types/
    │   └── kumbati.types.ts      # Complete TS interfaces for all entities
    ├── lib/
    │   ├── constants.ts          # Complete seed data & static fallback store
    │   ├── supabaseClient.ts     # Resilient Supabase client with fallback flags
    │   └── imageCompression.ts  # WebP converter using browser-image-compression
    ├── context/
    │   ├── LanguageContext.tsx   # Dual EN/CEB state with t(en, ceb) helper
    │   └── AuthContext.tsx       # Supabase auth session + local demo mode
    ├── components/
    │   ├── common/               # StatCard, Badge, Button, Modal, LoadingSpinner
    │   ├── layout/               # Header, Footer, MobileNav, AdminSidebar, StickyHotline
    │   ├── maps/                 # DistrictLeafletMap, LocationPinPopup
    │   └── gallery/              # Lightbox, MediaGrid, AlbumFilter
    └── pages/
        ├── public/
        │   ├── HomePage.tsx               # Hero, Metrics, Quick Actions, Featured
        │   ├── AboutPage.tsx              # Congw. Alexie bio, 19th Congress, District 3
        │   ├── ProgramsPage.tsx           # 7 Flagship programs, requirements, guide
        │   ├── ImpactPage.tsx             # 2025 verified metrics, district impact
        │   ├── GalleryPage.tsx            # Multi-album photo & video repository
        │   ├── DirectoryPage.tsx          # 19 municipalities & emergency hotlines
        │   ├── MapPage.tsx                # Interactive geospatial facility finder
        │   └── ActionCenterPage.tsx       # Constituent inquiry submission & tracker
        └── admin/
            ├── AdminLoginPage.tsx         # Supabase & Demo Admin authentication
            ├── AdminDashboardPage.tsx     # CMS overview & metric summary
            ├── AdminSettingsPage.tsx      # Site-wide text, contacts & FB page links
            ├── AdminMetricsPage.tsx       # CRUD for the 7 impact counters
            ├── AdminProgramsPage.tsx      # CRUD for flagship programs & checklists
            ├── AdminGalleryPage.tsx       # Album & batch photo uploader
            ├── AdminSubmissionsPage.tsx   # Action Center ticket management
            └── AdminLocationsPage.tsx     # Hotlines and map coordinates management
```

---

## 3. Data Flow & Hybrid Resilience Pattern

```
                       +-------------------------------+
                       |  Component Requests Data      |
                       +-------------------------------+
                                       |
                                       v
                       +-------------------------------+
                       | Is Supabase Configured & Up?  |
                       +-------------------------------+
                               /               \
                       YES    /                 \   NO / ERROR
                             v                   v
             +-----------------------+   +-------------------------+
             | Query Supabase Table  |   | Load Initial Constant   |
             +-----------------------+   | Seed Data (constants.ts)|
                    |         \          +-------------------------+
            Success |          \ Error                |
                    v           +-------+             v
             +--------------+           |   +----------------------+
             | Render Live  |           +-->| Render High-Fidelity |
             | Database Data|               | Fallback Seed Data   |
             +--------------+               +----------------------+
```

1. **Uninterrupted User Experience**: If the website is launched before the Supabase database is provisioned, or if an anonymous API limit is reached, the frontend switches cleanly to pre-packaged verified 2025 KUMBATI seed data.
2. **Action Center Ticket Fallback**: When submitting an inquiry without an active Supabase backend, a genuine reference code (e.g. `KMB-2025-XXXXX`) is still created and saved to browser `localStorage`, allowing the user to experience full ticket tracking functionality immediately.
3. **Admin Demo Mode**: If staff needs to test the administrative CMS before production credentials are ready, a built-in demo toggle (`demo@kumbati.bohol3.gov.ph` / `kumbati2025`) provides safe, sandboxed UI exploration without throwing authentication errors.

---

## 4. Bilingual Architecture (`LanguageContext`)

- **Language Codes**:
  - `'en'`: English (Official Government Standard)
  - `'ceb'`: Binisaya / Cebuano (Native Boholano Dialect)
- **State Storage**: Persisted in `localStorage.getItem('kumbati_language') || 'en'`.
- **Helper Utility**:
  ```typescript
  const { lang, setLang, t } = useLanguage();
  // Usage:
  <h1>{t('7 Flagship Programs of KUMBATI', '7 ka mga Nag-unang Programa sa KUMBATI')}</h1>
  ```
- **Dynamic Content Support**: Data entities have bilingual columns (e.g., `title_en`, `title_ceb`, `description_en`, `description_ceb`). The UI seamlessly picks the corresponding field based on active language.

---

## 5. Security & Row Level Security (RLS) Architecture

- **Public Anonymous Role**:
  - `SELECT` permission on published records in all tables (`site_settings`, `impact_metrics`, `programs_advocacies`, `gallery_albums`, `gallery_media`, `hotlines_directory`, `map_locations`).
  - `INSERT` permission on `constituent_submissions` (Constituents can submit tickets).
  - Restricted `SELECT` on `constituent_submissions` allowing constituents to query solely by exact `reference_code`.
- **Authenticated Admin Role**:
  - Full CRUD (`ALL`) permissions across all 8 tables.
  - Upload, delete, and manage permissions on `kumbati-media` Supabase Storage bucket.
