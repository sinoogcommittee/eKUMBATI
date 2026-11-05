# AGENTS.md
# e-KUMBATI Operational Manual for Autonomous AI Agents

> **Project Identity**: `e-KUMBATI` — Official Bilingual (English & Binisaya/Cebuano) Web Portal & Constituent Management System (CMS)  
> **Jurisdiction**: Office of Congresswoman Alexie Besas Tutor, 3rd Congressional District of Bohol, Philippines (19 Municipalities)  
> **Primary Manifesto**: *"Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!"*  
> **Tech Stack**: Vite, React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Leaflet / React-Leaflet, Supabase (PostgreSQL + Auth + Storage), `browser-image-compression`.

---

## 1. Core Operating Principles (Non-Negotiable)

Every AI agent operating in this repository must uphold these 6 foundational invariants:

1. **Zero-Placeholder Policy**:
   - Never write `TODO`, `FIXME`, dummy placeholders, or stubbed functions.
   - Every component, page, hook, and service must be fully written, typed, and production-ready.
   - When introducing new views, all buttons, modals, and forms must be fully wired up.

2. **Bilingual Dual-Language Requirement**:
   - Bohol's 3rd District constituents communicate in both English and Boholano Cebuano (Binisaya).
   - All user-facing strings must use the `useLanguage()` hook with `t(englishText, cebuanoText)` or read localized entity properties (`title_en` / `title_ceb`, `description_en` / `description_ceb`).
   - Cebuano translations must reflect natural, respectful, and dignified Boholano conversational phrasing.

3. **Hybrid Offline-First Resilience**:
   - The application must **never crash or show a blank screen** if Supabase credentials are missing, network connectivity drops, or the database is unreachable.
   - Public and admin pages must automatically fall back to [`src/lib/constants.ts`](file:///e:/Programs/e-KUMBATI/src/lib/constants.ts).
   - Constituent ticket submissions must fall back to `localStorage` (`kumbati_offline_submissions`) so offline constituents can still generate and test reference codes.

4. **KUMBATI Brand & UX Design System**:
   - **Primary Palette**: Vibrant Orange (`#F97316` / `orange-500`), Deep Red-Orange (`#EA580C` / `orange-600`, `#DC2626` / `red-600`), Warm Ivory (`#FFFDF9`), Dark Slate (`#0F172A` / `slate-900`).
   - **Card Architecture**: `rounded-2xl`, subtle borders (`border-slate-100` / `border-slate-200`), smooth transitions (`transition-all duration-300 hover:shadow-lg`).
   - **Mobile Thumb Reach**: Essential emergency services (PTV 24/7 Dispatch and Action Center) must remain immediately accessible via [`StickyHotlineBar.tsx`](file:///e:/Programs/e-KUMBATI/src/components/layout/StickyHotlineBar.tsx) on mobile screens (< 768px).

5. **Accidental Data Loss Prevention**:
   - Never execute destructive SQL statements (`DROP TABLE`, `DROP SCHEMA`, `TRUNCATE`, unconstrained `DELETE`).
   - When modifying Supabase schema, use idempotent DDL with `CREATE TABLE IF NOT EXISTS` or safe procedural blocks (`DO $$ BEGIN ... END $$;`).
   - Always verify RLS policies are enabled on all tables.

6. **Documentation & Memory Integrity**:
   - After completing significant milestones or architectural changes, immediately update [`TASKS.md`](file:///e:/Programs/e-KUMBATI/TASKS.md) and [`MEMORY.md`](file:///e:/Programs/e-KUMBATI/MEMORY.md).
   - Keep git history clean with atomic, descriptive commits.

---

## 2. Repository Blueprint & Directory Taxonomy

Agents must organize all project code according to this established structure:

```
e-KUMBATI/
├── .env                          # Local environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
├── .env.example                  # Template configuration for deployment
├── AGENTS.md                     # This file (Agent Operating Manual)
├── ARCHITECTURE.md               # Architecture, component hierarchy & technology matrix
├── DATABASE.md                   # Supabase SQL schema, RLS policies & storage configuration
├── DEPLOYMENT.md                 # Production deployment manual (Render, Vercel, Supabase)
├── DESIGN.md                     # Color tokens, typography, UI patterns & Leaflet map styling
├── MEMORY.md                     # Persistent project state, decisions & timeline
├── package.json                  # Dependencies and build scripts
├── PRD.md                        # Product requirements, 7 flagship metrics & constituent flows
├── RULES.md                      # Code formatting, TypeScript rules & zero-placeholder standards
├── TASKS.md                      # Milestone checklist & roadmap tracking
├── tsconfig.json                 # Strict TypeScript configuration
├── vite.config.ts                # Build configuration with vendor chunking & path aliases
├── src/
│   ├── index.css                 # Tailwind directives, custom scrollbars & Leaflet CSS pin styles
│   ├── main.tsx                  # Application entry point with BrowserRouter & LanguageProvider
│   ├── App.tsx                   # Central router with lazy-loaded routes and Suspense fallbacks
│   ├── vite-env.d.ts             # Vite client environment type declarations
│   ├── types/
│   │   ├── kumbati.types.ts      # Domain interfaces (SiteSettings, ImpactMetric, ProgramAdvocacy, etc.)
│   │   └── database.types.ts     # Auto-generated Supabase PostgreSQL database schema types
│   ├── lib/
│   │   ├── constants.ts          # Seed data (19 towns, 7 metrics, 7 programs, hotlines, map locations)
│   │   ├── supabaseClient.ts     # Type-safe Supabase client with offline fallback detection
│   │   └── imageCompression.ts   # Client-side WebP compression utility
│   ├── context/
│   │   ├── LanguageContext.tsx   # React context for 'en' | 'ceb' language switching with t() helper
│   │   └── AuthContext.tsx       # Supabase Auth provider with demo admin mode
│   ├── components/
│   │   ├── common/               # UI Atoms: Button, Badge, StatCounter, Modal, LoadingSpinner, HotlineModal
│   │   ├── layout/               # Shells: Header, Footer, MobileNav, StickyHotlineBar, PublicLayout, AdminLayout
│   │   └── map/                  # DistrictLeafletMap (Interactive SVG markers, town filtering)
│   └── pages/
│       ├── public/               # 8 Public-Facing Pages:
│       │   ├── HomePage.tsx      # Hero, 7 animated stat counters, flagship highlights, quick actions
│       │   ├── AboutPage.tsx     # Congw. Alexie bio, 19th Congress committee leadership, District 3 history
│       │   ├── ProgramsPage.tsx  # 7 Flagship programs with bilingual requirements checklist & modal
│       │   ├── ImpactPage.tsx    # Detailed statistics, municipal breakdowns, impact chart
│       │   ├── GalleryPage.tsx   # Categorized photo albums with modal lightbox
│       │   ├── DirectoryPage.tsx # 19-town directory with click-to-dial hotlines & MDRRMO search
│       │   ├── MapPage.tsx       # Fullscreen interactive map with POI filters (Clinic, PTV, HQ)
│       │   └── ActionCenterPage.tsx # Ticket submission & live reference code status tracker
│       └── admin/                # 8 Back-Office CMS Pages:
│           ├── AdminLoginPage.tsx       # Auth gate with Supabase Auth + Demo Admin fallback
│           ├── AdminDashboardPage.tsx   # Overview metrics, system health, recent tickets
│           ├── AdminSettingsPage.tsx    # Site copy, manifesto headlines, 4 official FB page links
│           ├── AdminMetricsPage.tsx     # Live editor for the 7 flagship metrics
│           ├── AdminProgramsPage.tsx    # Programs manager & requirements list editor
│           ├── AdminGalleryPage.tsx     # Photo album organizer with WebP batch uploader
│           ├── AdminSubmissionsPage.tsx # Action Center ticket manager, status workflow & admin notes
│           └── AdminLocationsPage.tsx   # Directory hotlines & geospatial map coordinates editor
```

---

## 3. The 7 Verified 2027 Flagship KUMBATI Metrics

All agents must strictly preserve the data integrity of these 7 core metrics across UI, SQL, seed data, and documentation:

| # | Metric Key | English Title | Cebuano Title | Value | Suffix | Category |
|---|---|---|---|:---:|:---:|---|
| 1 | `pabahay` | Pabahay ni Kumbati Beneficiaries | Benepisyaryo sa Pabahay ni Kumbati | **310** | `+` | Housing |
| 2 | `ptv` | Patient Transport Vehicles (PTV) | Patient Transport Vehicles (PTV) | **4** | *(none)* | Health |
| 3 | `dialysis_tambayan` | Tambayan ni Kumbati for Dialysis Patients | Tambayan ni Kumbati sa mga Dialysis Patients | **1** | *(none)* | Health |
| 4 | `community_beneficiaries` | KUMBATI Community Beneficiaries | Benepisyaryong Komunidad sa KUMBATI | **36** | `+` | Community |
| 5 | `kumbati_clinic` | Kumbati Medical Clinic Patients | Pasyente sa Kumbati Medical Clinic | **3,200** | `+` | Health |
| 6 | `sustainable_livelihood` | Sustainable Livelihood Beneficiaries | Asosasyon sa Malungtarong Panginabuhian | **88** | `+` | Livelihood |
| 7 | `ched_tdp_scholars` | CHED-TDP & District Scholars | Mga Iskolar sa CHED-TDP ug Distrito | **4,500** | `+` | Education |

---

## 4. The 19 Municipalities of Bohol District 3

Any feature, filter, dropdown, or directory referencing municipalities must support all 19 towns in alphabetical order:

1. **Alicia**
2. **Anda**
3. **Batuan**
4. **Bilar**
5. **Candijay** *(Congressional Headquarters)*
6. **Carmen** *(Heart of Chocolate Hills / PTV Hub)*
7. **Dimiao**
8. **Duero**
9. **Garcia Hernandez**
10. **Guindulman** *(PTV Hub)*
11. **Jagna** *(Port Town / Kumbati Clinic Hub)*
12. **Lila**
13. **Loay**
14. **Loboc**
15. **Mabini**
16. **Pilar**
17. **Sevilla**
18. **Sierra Bullones**
19. **Valencia**

*Note*: For district-level assets (like Congressional HQ or the Dialysis Tambayan in Tagbilaran City), use the value `'District-wide'`.

---

## 5. Official External Channels & Social Links

Always use the single verified official Facebook channel URL for Congw. Alexie Besas Tutor:

1. **Cong. Alexie Tutor (Official Page)**: `https://www.facebook.com/Cong.AlexieTutor`

---

## 6. Action Center Reference Code Protocol

All constituent inquiries and assistance tickets generated in the Action Center must adhere to:

- **Format**: `KMB-YYYY-XXXXX`
  - `KMB-`: Official portal prefix.
  - `YYYY`: Current 4-digit calendar year (e.g. `2026`).
  - `XXXXX`: 5-character uppercase alphanumeric string excluding ambiguous characters (`0`, `O`, `I`, `1` avoided when practical).
  - *Example*: `KMB-2027-AB78X`.
- **Validation Regex**: `^KMB-[0-9]{4}-[A-Z0-9]{5}$`
- **Status Progression**:
  - `pending` (Default upon constituent submission)
  - `in_review` (Assigned to district case worker)
  - `action_taken` (Endorsement sent / assistance coordinated)
  - `resolved` (Assistance disbursed / query answered)
  - `closed` (Ticket finalized and archived)

---

## 7. Standard Operating Procedures (SOPs) for Agents

### SOP 1: Making Code Changes
1. **Read Existing Code**: Always inspect the target file before modifying.
2. **Preserve Fallbacks**: Ensure changes maintain the fallback to `constants.ts`.
3. **Verify Types**: If touching Supabase payloads, ensure properties match [`src/types/database.types.ts`](file:///e:/Programs/e-KUMBATI/src/types/database.types.ts) and [`src/types/kumbati.types.ts`](file:///e:/Programs/e-KUMBATI/src/types/kumbati.types.ts).
4. **Compile & Typecheck**: Always run `npm run build` after completing changes to guarantee zero TypeScript or Vite bundle errors.

### SOP 2: Modifying Supabase Schema
1. **Author Migration**: Use `supabase_mcp.apply_migration` with an idempotent migration query.
2. **Enable RLS**: Ensure every table has `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;`.
3. **Update Database Types**: Run `supabase_mcp.generate_typescript_types` to refresh [`src/types/database.types.ts`](file:///e:/Programs/e-KUMBATI/src/types/database.types.ts).
4. **Update Blueprints**: Update [`DATABASE.md`](file:///e:/Programs/e-KUMBATI/DATABASE.md) to document the schema changes.

### SOP 3: Handling User Images
1. Any file upload component must pass files through [`compressImage()`](file:///e:/Programs/e-KUMBATI/src/lib/imageCompression.ts).
2. Compress with target max size `1 MB`, maxWidth/Height `1920px`, converted to `image/webp`.
3. Upload to bucket `kumbati-media` under organized subpaths (e.g. `gallery/{albumId}/{filename}.webp` or `submissions/{referenceCode}/{filename}.webp`).

### SOP 4: Shell & Command Execution on Windows
1. When executing shell commands via `run_command`:
   - Use PowerShell syntax.
   - Separate sequential commands with `;` (do NOT use `&&` which causes syntax errors in PowerShell).
   - Use `npx.cmd` instead of bare `npx` if running CLI tools directly.
2. Follow Sandbox Rules:
   - Run commands in Standard Sandbox Mode (`BypassSandbox: false`) first.
   - Only elevate to `BypassSandbox: true` if an external network or registry request is strictly necessary.

---

## 8. Agent Checklist Before Concluding Any Turn

Before reporting a task as complete, an agent must verify:

- [ ] Does `npm run build` pass with exit code `0`?
- [ ] Are all 8 public and 8 admin pages fully functional with zero TODOs?
- [ ] Are both English and Cebuano strings maintained?
- [ ] Is the Supabase client safely falling back to constants when offline?
- [ ] Have [`TASKS.md`](file:///e:/Programs/e-KUMBATI/TASKS.md) and [`MEMORY.md`](file:///e:/Programs/e-KUMBATI/MEMORY.md) been updated with progress?
- [ ] Are changes committed cleanly to Git?
