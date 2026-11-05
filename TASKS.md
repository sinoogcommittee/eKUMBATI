# Project Task Roadmap & Implementation Tracker
## e-KUMBATI Web Portal & CMS

---

## Current Status: All Phases (1 through 5) - FULLY COMPLETED [x]

```
[x] Phase 1: Project Scaffold & Core Layer (Completed & Build Verified)
[x] Phase 2: Layouts, Global Navigation & Reusable Components (Completed & Build Verified)
[x] Phase 3: 8 Public Portal Pages (Completed & Build Verified)
[x] Phase 4: 8 Admin CMS Pages & Authenticated Routing (Completed & Build Verified)
[x] Phase 5: Verification, Production Build & Deployment Readiness (Completed & Verified)
```

---

## Detailed Task Breakdown

### Phase 1: Project Scaffold & Core Layer
- [x] **1.1 Core Blueprints (Root .md files)**
  - [x] `PRD.md`: Full project specifications & 7 flagship metrics
  - [x] `ARCHITECTURE.md`: Technical stack, diagrams, and folder structure
  - [x] `RULES.md`: Coding standards, zero-placeholder policy & guidelines
  - [x] `DESIGN.md`: KUMBATI color palette, tokens & typography
  - [x] `DATABASE.md`: Supabase PostgreSQL schema, RLS & Storage policies
  - [x] `TASKS.md`: Project roadmap & checklist
  - [x] `MEMORY.md`: Project state tracker
  - [x] `DEPLOYMENT.md`: Static site hosting & Supabase setup guide
  - [x] `AGENTS.md`: Operational manual for autonomous AI coding agents
- [x] **1.2 Project Configuration Files**
  - [x] `package.json`: Vite, React 18, Tailwind, Lucide, Framer Motion, Leaflet, Supabase
  - [x] `tsconfig.json` & `tsconfig.node.json`: Strict TypeScript settings
  - [x] `vite.config.ts`: React plugin & path aliases
  - [x] `tailwind.config.js`: Custom KUMBATI palette & typography
  - [x] `postcss.config.js`: Tailwind & Autoprefixer
  - [x] `index.html`: SEO meta, favicon, Leaflet CSS CDN link
  - [x] `.env.example`: Supabase environment variable templates
  - [x] `src/index.css`: Tailwind directives, custom scrollbars, Leaflet pin fixes
- [x] **1.3 Core TypeScript Types (`src/types/`)**
  - [x] `src/types/kumbati.types.ts`: Full interfaces for all 8 database entities
- [x] **1.4 Core Libraries & Resilient State (`src/lib/`, `src/context/`)**
  - [x] `src/lib/constants.ts`: Seed data for 19 towns, 7 metrics, 7 programs, albums, hotlines, map pins
  - [x] `src/lib/supabaseClient.ts`: Safe client with fallback detection
  - [x] `src/lib/imageCompression.ts`: Client-side WebP image optimization
  - [x] `src/context/LanguageContext.tsx`: Bilingual EN/CEB state with `t()` helper
  - [x] `src/context/AuthContext.tsx`: Supabase Auth provider + Demo Admin fallback

---

### Phase 2: Layouts & Common UI Components
- [x] **2.1 Common Atoms & Molecules**
  - [x] `Button.tsx`: KUMBATI themed buttons with primary orange, red, and outline variants
  - [x] `StatCounter.tsx`: Animated count-up metric display with 2027 verified badge
  - [x] `Badge.tsx`: Program and status tags (Pending, In Review, Resolved)
  - [x] `Modal.tsx`: Accessible dialog wrapper with Framer Motion animations
  - [x] `LoadingSpinner.tsx`: Branded glowing loading state
  - [x] `HotlineModal.tsx`: Searchable emergency hotlines directory modal
- [x] **2.2 Layout Shells**
  - [x] `Header.tsx`: Desktop sticky navbar with bilingual toggle, quick hotline pill & navigation links
  - [x] `Footer.tsx`: Dark slate district footer with 4 official Facebook links & 19 towns
  - [x] `MobileNav.tsx`: Sliding mobile drawer menu with language switch
  - [x] `StickyHotlineBar.tsx`: Mobile fixed bottom bar for instant PTV calling & Action Center
  - [x] `PublicLayout.tsx`: Wrapper for all public pages with scroll-to-top
  - [x] `AdminSidebar.tsx`: Sidebar for CMS back-office with connectivity indicator
  - [x] `AdminLayout.tsx`: Protected layout with authentication gate & mobile drawer
- [x] **2.3 Specialized Molecules**
  - [x] `DistrictLeafletMap.tsx`: Interactive Leaflet map component with customized SVG pulsing pins and town filter

---

### Phase 3: 8 Public Portal Pages (`src/pages/public/`)
- [x] **3.1 Home Page (`HomePage.tsx`)**: Hero banner, 7 animated counters, quick links, featured programs
- [x] **3.2 About Page (`AboutPage.tsx`)**: Congw. Alexie bio, verified credentials (Licensed Physical Therapist, BSPT Velez College • Law Graduate LL.B), 19th Congress committee leadership (Chairperson: Civil Service & PRC, Vice Chairperson: Health), 5 Majority committee memberships, interactive dual-tab legislative portfolio featuring Principal Authored Bills (HB 8970/RA 11883, HB 2043, HB 8494, HB 7771, HB 10438, HB 2047, HB 5041, HB 9764, HB 1581, HB 5308, HB 835) and Co-Authored Landmark Laws (RA 11997 Kabalikat sa Pagtuturo, RA 11934 SIM Registration, Magna Carta of BHWs, Magna Carta of Seafarers, UHC RA 11223 & Malasakit RA 11463), verified congress.gov.ph (J075) portal CTA, and 19-town directory
- [x] **3.3 Programs Page (`ProgramsPage.tsx`)**: 7 Flagship programs with bilingual requirements checklist
- [x] **3.4 Impact & Metrics Page (`ImpactPage.tsx`)**: In-depth stats, charts, municipal breakdown
- [x] **3.5 Multimedia Gallery Page (`GalleryPage.tsx`)**: Categorized photo albums with modal lightbox
- [x] **3.6 19-Town Municipal Directory (`DirectoryPage.tsx`)**: Searchable list of all 19 towns with hotlines
- [x] **3.7 Interactive Geospatial Map (`MapPage.tsx`)**: Full district map with facility filters
- [x] **3.8 Action Center & Ticket Tracker (`ActionCenterPage.tsx`)**: Assistance request form & live code tracking

---

### Phase 4: 8 Admin CMS Pages & Routing (`src/pages/admin/`)
- [x] **4.1 Admin Login (`AdminLoginPage.tsx`)**: Supabase authentication with Demo Admin switch
- [x] **4.2 Admin Dashboard (`AdminDashboardPage.tsx`)**: Overview cards & recent constituent activity
- [x] **4.3 Site Settings Manager (`AdminSettingsPage.tsx`)**: Edit banner text, contact info, FB links
- [x] **4.4 Impact Metrics Manager (`AdminMetricsPage.tsx`)**: Live editor for 7 metrics
- [x] **4.5 Programs Manager (`AdminProgramsPage.tsx`)**: CRUD for programs and requirement lists
- [x] **4.6 Gallery Manager (`AdminGalleryPage.tsx`)**: Album manager and batch WebP photo uploader
- [x] **4.7 Action Center Submissions (`AdminSubmissionsPage.tsx`)**: Ticket status updates and response logging
- [x] **4.8 Hotlines & Locations Manager (`AdminLocationsPage.tsx`)**: Hotlines directory and map pins editor
- [x] **4.9 Routing Configuration (`App.tsx`)**: React Router v6 setup connecting all 16 pages

---

### Phase 5: Verification, Supabase Remote Deployment & Production Build
- [x] **5.1 Type-check & lint validation**: `npm run build` succeeds without errors
- [x] **5.2 Offline resilience test**: Full navigation functions when Supabase is disconnected
- [x] **5.3 Deployment readiness check**: Verification against Render & Supabase requirements

---

### Phase 6: Brand Design & Navigation Hierarchy
- [x] **6.1 Original Vibrant Brand Integrity**:
  - [x] Restored the official KUMBATI design system (vibrant orange `#F97316`, deep red-orange, warm ivory `#FFFDF9`, `shadow-kumbati`, high-energy cards, and dynamic badges) as preferred by stakeholder.
  - [x] Maintained Leaflet interactive map with custom SVG pins and town filter.
- [x] **6.2 Navigation Flow Refinement**:
  - [x] Reordered primary constituent flow across desktop navbar (`Header.tsx`), mobile drawer (`MobileNav.tsx`), footer sitemap (`Footer.tsx`), and router (`App.tsx`).
  - [x] Placed the **About** page directly after the **Action Center** (`Home` → `Programs` → `Impact` → `Gallery` → `19 Towns` → `District Map` → `Action Center` → `About`).
- [x] **6.3 Build & Type Verification**:
  - [x] `npm run build` passes with exit code 0 and zero TypeScript or Vite bundle errors.
- [x] **5.4 Remote Supabase Project Setup (`kduwtvwebpggsdrkskgu`)**:
  - [x] All 8 database tables created via PostgreSQL DDL
  - [x] Row Level Security (RLS) enabled and verified across all 8 tables
  - [x] Supabase Storage bucket `kumbati-media` created with public read access
  - [x] Seed data migrations applied (7 metrics, 7 programs, albums, media, directory, map pins)
  - [x] Local `.env` linked to live Supabase endpoint and verified in bundle build

---

### Phase 7: News, Updates & Public Announcements CMS + Google Maps Integration
- [x] **7.1 Data Architecture & Supabase DDL**:
  - [x] Added `NewsAnnouncement` domain types and categories (`advisory`, `payout_schedule`, `medical_mission`, `legislative`, `disaster_alert`, `general`) to `src/types/kumbati.types.ts`.
  - [x] Applied idempotent Supabase migration creating `public.news_announcements` with RLS policies (public read published, authenticated write).
  - [x] Regenerated database types in `src/types/database.types.ts`.
  - [x] Seeded 6 realistic announcements in `src/lib/constants.ts` and remote Supabase database.
- [x] **7.2 Public News Portal (`src/pages/public/NewsPage.tsx`)**:
  - [x] Pinned & urgent advisory banner at top with emergency priority alerts.
  - [x] Keyword search and category/town filtering for announcements.
  - [x] Full announcement modal with print, share, and formatted paragraphs.
  - [x] Hybrid offline fallback to `localStorage` and `constants.ts`.
- [x] **7.3 Back-Office News CMS (`src/pages/admin/AdminNewsPage.tsx`)**:
  - [x] Full CRUD manager for district advisories, payout schedules, and updates.
  - [x] Client-side WebP image compression with `compressImageToWebP`.
  - [x] Instant toggle for publish status (live vs draft) and pinned status.
  - [x] Direct shortcut and callout in `AdminSettingsPage.tsx` and `AdminSidebar.tsx`.
- [x] **7.4 Google Maps Free Interactive Maps Integration**:
  - [x] Integrated 100% free Google Maps raster tiles (`roadmap`, `satellite`, `hybrid`, `terrain`) in `DistrictLeafletMap.tsx` with zero API cost and no credit card/billing requirement.
  - [x] Added Google Maps layer switcher buttons directly on the map.
  - [x] Added direct Google Maps turn-by-turn route navigation (`https://www.google.com/maps/dir/?api=1&destination=...`) on all facility popups and cards in `MapPage.tsx`.
  - [x] Added interactive Google Maps Satellite Embed modal preview for each facility.
- [x] **7.5 Global Navigation Integration**:
  - [x] Added News & Updates to `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`, and `AdminSidebar.tsx`.
  - [x] Preserved navigation sequence: `Home` → `Programs` → `Impact` → `News & Updates` → `Gallery` → `19 Towns` → `District Map` → `Action Center` → `About`.
  - [x] Verified `npm run build` succeeds with exit code 0.

---

### Phase 8: Sinoog 2027 Design System Styling & Adaptive Spacing
- [x] **8.1 Design Tokens & Shadow Hierarchy (`tailwind.config.js`, `src/index.css`)**:
  - [x] Implemented Sinoog 2027's Material Design 3 3-layer pop shadows:
    - `shadow-sinoog`: Ambient + directional + brand tint (`rgba(234, 88, 12, 0.12)`) + inner specular top glaze (`inset 0 1px 0 rgba(255, 255, 255, 0.88)`).
    - `shadow-sinoog-hover`: Elevated hover shadow with enhanced orange glow (`rgba(249, 115, 22, 0.20)`).
    - `shadow-sinoog-raised`: High-elevation pop shadow for hero elements, modal sheets, and urgent advisories.
  - [x] Added `.sinoog-card` variants (`default`, `elevated`, `filled`, `dark`) with `-webkit-backdrop-filter: blur(10px) saturate(112%)` and smooth 180ms bezier curves.
- [x] **8.2 Pill Button Architecture (`src/components/common/Button.tsx`)**:
  - [x] Converted all button scales to full pill shape (`rounded-full` / `border-radius: 9999px`).
  - [x] Adopted Sinoog 2027 touch target metrics: Small (`min-h-[40px] px-4`), Medium (`min-h-[48px] px-6`), Large (`min-h-[52px] px-8`).
  - [x] Added multi-stop gradient overlay with top specular highlight border (`border-orange-400` / `border-red-400`) and hover lift (`-translate-y-0.5`).
  - [x] Created reusable `Card.tsx` component mirroring Sinoog 2027's `Card.tsx`.
  - [x] Upgraded `Badge.tsx` and `StatCounter.tsx` to match the pill aesthetic and `rounded-3xl` card depth.
- [x] **8.3 Comprehensive Spacing & Rhythm Across All Public Pages**:
  - [x] Standardized section gap cadence to `space-y-16 sm:space-y-24 pb-16` across all views.
  - [x] `HomePage.tsx`: Upgraded hero spotlight card, 7 metrics + 8th tile, featured programs, Action Center CTA banner, photo highlights, and official Facebook cards.
  - [x] `AboutPage.tsx`: Upgraded portrait card, committee leadership cards, majority membership cards, bill category pills, principal authored bills, co-authored laws, manifesto container, and 19 towns box.
  - [x] `ProgramsPage.tsx`: Upgraded category pills, 7 program cards with glassmorphism backdrop, eligibility detail buttons, PTV hotline button, and 3-step guide cards.
  - [x] `NewsPage.tsx`: Upgraded urgent pinned advisory banner, search and municipality dropdown, sector pills, and announcement cards.
  - [x] `DirectoryPage.tsx`: Upgraded priority emergency dispatch strip, search inputs, emergency toggle button, and 19 town directory cards.
  - [x] `ImpactPage.tsx`: Upgraded 100% reach card, municipal distribution table card, milestone chronicle cards, and transparency report CTA.
  - [x] `ActionCenterPage.tsx`: Upgraded dual-mode pill tab switcher, submission form card, assistance type pills, and live tracking ticket card.
  - [x] `MapPage.tsx`: Upgraded emergency dispatch advisory banner, facility catalog category pills, and physical location directory cards.
  - [x] `Header.tsx` & `StickyHotlineBar.tsx`: Upgraded navigation pills, language switcher, ticket tracking link, hotline action button, and mobile emergency bar.
- [x] **8.4 Build Verification**:
  - [x] Verified `npm run build` passes with exit code 0 and zero errors/warnings.

---

### Phase 9: 2027 Temporal Model & Updated District Figures
- [x] **9.1 Core Constants & Seed Data (`src/lib/constants.ts`)**:
  - [x] Advanced temporal context to 2027 across all seed data and gallery albums.
  - [x] Updated 7 Flagship KUMBATI Metrics to 2027 cumulative verified numbers:
    - Pabahay ni Kumbati: **310+** homes handed over.
    - Patient Transport Vehicles (PTV): **4** active emergency vehicles, **6,200+** zero-fare patient transits.
    - Tambayan ni Kumbati for Dialysis Patients: **1** haven in Tagbilaran City.
    - KUMBATI Community Beneficiaries: **36+** energized communities & priority sitios.
    - Kumbati Medical Clinic: **3,200+** patients served with free consultations and maintenance meds.
    - Sustainable Livelihood Program: **88+** community associations and cooperatives supported.
    - CHED-TDP & District Scholars: **4,500+** tertiary scholars supported across Bohol District 3.
- [x] **9.2 Public Portal Pages**:
  - [x] `HomePage.tsx`: Updated to "7 Flagship 2027 KUMBATI Impact Metrics" / "KMB-2027-XXXXX".
  - [x] `ImpactPage.tsx`: Audited Governance Report 2027, 4-card milestone timeline spanning 2023 through 2027.
  - [x] `ActionCenterPage.tsx`: Reference code generator defaults to 2027 (`KMB-2027-XXXXX`), demo tracking preview code updated to `KMB-2027-DEMO1`.
  - [x] `AboutPage.tsx`: Updated core pillars to reflect 310+ Pabahay, 4,500+ scholars, and 88+ livelihood associations.
  - [x] `ProgramsPage.tsx`: Updated reference tracking code example to `KMB-2027-XXXXX`.
  - [x] `StatCounter.tsx`, `Footer.tsx`, `MobileNav.tsx`: Updated verified milestone badges to 2027.
- [x] **9.3 Admin CMS Back-Office**:
  - [x] `AdminDashboardPage.tsx`: Sample ticket reference codes updated to `KMB-2027-`, badge set to `2027 Audited`.
  - [x] `AdminSubmissionsPage.tsx`: Sample submissions updated to `KMB-2027-`.
  - [x] `AdminMetricsPage.tsx`: Header title updated to "The 7 Flagship 2027 Impact Metrics".
  - [x] `AdminGalleryPage.tsx`: Placeholder updated to `Pabahay 2027 Handover`.
  - [x] `AuthContext.tsx`: Demo admin password updated to `kumbati2027` (with backward compatibility for `kumbati2025`).
- [x] **9.4 Documentation & Build**:
  - [x] Updated `AGENTS.md`, `PRD.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `README.md`, `MEMORY.md`.
  - [x] Verified `npm run build` compiles with zero errors (exit code 0).

---

### Phase 10: Legislative Portfolio Integration, J075 Removal, & Official Portrait Asset
- [x] **10.1 Removal of Internal ID Mentions**:
  - [x] Purged all user-facing occurrences of `(J075)` and `J075` from titles, buttons, badges, and body copy across `AboutPage.tsx`.
  - [x] Preserved the underlying HTTPS congress link (`https://www.congress.gov.ph/house-members/view/J075`) in the official portal link button.
- [x] **10.2 Word Document Parsing & Seed Dataset (`src/lib/legislativeData.ts`)**:
  - [x] Processed `E:\Programs\e-KUMBATI\docs\Committee Membership.docx`:
    - Structured all 4 committee positions (1 leadership portfolio: Vice-Chairperson, Committee on Civil Service and Professional Regulation; 3 Majority memberships: Appropriations, Sustainable Development Goals, Visayas Development).
  - [x] Processed `E:\Programs\e-KUMBATI\docs\Principal Authored Bills.docx`:
    - Parsed all 35 measures (27 House Bills e.g. HB 831–11153 + 8 House Resolutions e.g. HR 301–1475).
    - Structured fields: measure ID, full title in English, natural Boholano Cebuano translation, committee referral, date filed, legislative status, and significance tag.
  - [x] Processed `E:\Programs\e-KUMBATI\docs\Co-Authored Bills.docx`:
    - Parsed all 19 House Bills (HB 602–9945).
    - Structured fields: bill ID, full title in English, Boholano Cebuano translation, primary authors, committee referral, date filed, and status.
  - [x] Added `OfficialLegislativeMeasure` and `OfficialCommitteeAppointment` types in `src/types/kumbati.types.ts`.
- [x] **10.3 Interactive Legislative Portfolio UI (`AboutPage.tsx`)**:
  - [x] Integrated dual-mode pill tab switcher: **Principal Authored (35)** and **Co-Authored (19)** with count badges.
  - [x] Added real-time instant search input (filters by measure ID, title keyword, committee referral, or author).
  - [x] Implemented 10 sector category filter pills (`All`, `Civil Service & PRC`, `Health & Hospitals`, `Education & Youth`, `Tourism & Environment`, `Social Welfare & PWD`, `Budget & Salaries`, `Justice & Public Safety`, `Local Governance`, `Economy & Infrastructure`).
  - [x] Implemented progressive disclosure ("Show More Measures" / "Show All") with result count feedback and active filter reset.
  - [x] Styled cards with Sinoog 2027 3-layer pop shadows, status indicators, and bilingual layout.
- [x] **10.4 Official Portrait Integration**:
  - [x] Connected user-provided asset `/images/cong_alexie.jpg` to both `AboutPage.tsx` and `HomePage.tsx`.
- [x] **10.5 Production Build & Cleanup**:
  - [x] Cleaned up temporary dump and scratch files from workspace root.
  - [x] Verified production build (`npm run build`) passes cleanly with exit code 0.

---

### Phase 11: Material Design 3 Design System from Sinoog 2027
- [x] **11.1 M3 Design Tokens Architecture (`src/styles/m3/`)**:
  - [x] `tokens.css`: Typography roles (`--md-sys-typescale-*`), corner radii (`--md-sys-shape-corner-*`), spacing scale (`--md-space-*`), target sizes (`44px` min / `48px` comfortable), elevation levels 0–5, motion easing curves, state layers (`--md-sys-state-*`), focus ring, scrim, and Sinoog 3-layer pop shadows (`--sinoog-shadow-card`, `--sinoog-shadow-card-hover`, `--sinoog-shadow-card-raised`).
  - [x] `light-theme.css`: Material 3 color roles mapped to KUMBATI's vibrant orange (`#ea580c`), emergency red (`#dc2626`), amber (`#d97706`), warm ivory (`#fffdf9`), and dark slate (`#0f172a`), with surface container tiers (lowest to highest) and semantic extensions.
  - [x] `dark-theme.css`: Material 3 dark mode color roles for high contrast and dark surfaces.
  - [x] `components.css`: `.m3-button` (filled, tonal, outlined, text, danger), `.m3-icon-button`, `.m3-card` (filled, elevated, outlined with backdrop blur and pop shadows), `.m3-chip` (assist, filter, is-selected), `.m3-dialog`, `.m3-progress-circular`, `.m3-progress-linear`, `.m3-segmented-control`, `.m3-state-layer`.
  - [x] `fields.css`: `.m3-field` (label, input, select, textarea, icon, support/error, 52px height, no-jump focus border), `.m3-search` (rounded pill search bar with icon and clear action), `.m3-check` (custom M3 checkbox), `.m3-switch` (custom M3 toggle switch).
  - [x] `index.css`: Main M3 entry point imported directly in `src/index.css`.
- [x] **11.2 M3 React Component Suite (`src/components/m3/`)**:
  - [x] `Card.tsx`: M3 Card supporting `variant="filled" | "elevated" | "outlined"`, `as="div" | "article" | "section" | "li"`.
  - [x] `Button.tsx`: M3 Button with `variant="filled" | "tonal" | "outlined" | "text" | "danger"`, `size="default" | "small"`, `leadingIcon`, `loading`, `to` (React Router Link).
  - [x] `IconButton.tsx`: 44px/48px accessible icon button with tooltip and ARIA labels.
  - [x] `Chip.tsx`: M3 Chip with `variant="assist" | "filter"`, `selected`, `leadingIcon`.
  - [x] `TextField.tsx`: Outlined persistent-label text field with error announcements and support text.
  - [x] `TextArea.tsx`: Multi-line text field with floating label and validation states.
  - [x] `SelectField.tsx`: Accessible dropdown with custom chevron and helper text.
  - [x] `SearchBar.tsx`: Rounded pill search bar with leading Search icon and clear button.
  - [x] `Checkbox.tsx` & `Switch.tsx`: Accessible form toggles with native semantic inputs.
  - [x] `Dialog.tsx`: Accessible modal overlay with backdrop scrim, Escape key handler, focus trap.
  - [x] `index.ts`: Barrel export.
- [x] **11.3 Public Page Upgrades**:
  - [x] `AboutPage.tsx`: Integrated M3 `SearchBar` for measures search, M3 `Chip` for sector category filters, and M3 `Card` for measures cards.
  - [x] `NewsPage.tsx`: Integrated M3 `SearchBar` for announcements search, M3 `Chip` for category tabs, and M3 `Card` for announcement cards.
  - [x] `DirectoryPage.tsx`: Integrated M3 `SearchBar` for town search, M3 `Chip` for emergency filter, and M3 `Card` for 19 town cards.
  - [x] `ActionCenterPage.tsx`: Integrated M3 `Chip` for submission types, M3 `SearchBar` for code tracker, and M3 `Card` for tracking slip.
- [x] **11.4 Verification**:
  - [x] Clean production build verified via `npm run build` (1979 modules transformed, code 0).

---

### Phase 12: Viewport Overflow & Responsive Navigation Fixes
- [x] **12.1 Root Document Overflow Protection (`src/index.css`)**:
  - [x] Added strict `overflow-x: hidden`, `width: 100%`, and `max-width: 100%` to `html`, `body`, and `#root` elements.
  - [x] Ensured no document-level horizontal scrolling is permitted on any viewport width (320px to 4K+).
- [x] **12.2 Shell Layout Safety (`PublicLayout.tsx` & `AdminLayout.tsx`)**:
  - [x] Added `w-full max-w-full overflow-x-hidden` to outer layout wrapper and `<main>` viewport container in `PublicLayout.tsx`.
  - [x] Added `w-full max-w-full overflow-x-hidden` to admin wrapper and administrative content viewport in `AdminLayout.tsx`.
  - [x] Added `w-full max-w-full overflow-x-hidden` to `HomePage.tsx` root container.
- [x] **12.3 Header Responsive Navigation Overhaul (`src/components/layout/Header.tsx`)**:
  - [x] Diagnosed root cause of horizontal blowout: Logo (~336px) + 9 nav links (~970px) + 3 action buttons (~425px) summed to ~1,824px, exceeding all standard desktop resolutions (< 1824px) and causing page to scroll off-screen to the left.
  - [x] Resolved responsive navigation dead-zone between 640px and 1280px (where both desktop nav and mobile hamburger were previously hidden).
  - [x] Set hamburger menu button to `xl:hidden` so it is always accessible on all viewports below 1280px (mobile phones, phablets, iPad/tablets, portrait laptops).
  - [x] Optimized desktop nav labels for concise clarity (`Home`/`Balay`, `Programs`/`Programa`, `Impact`/`Kalampusan`, `News`/`Pahibalo`, `Gallery`/`Galeriya`, `19 Towns`/`19 Lungsod`, `Map`/`Mapa`, `Action Center`/`Aksyon`, `About`/`Mahitungod`).
  - [x] Reduced navigation padding to `px-2.5 2xl:px-3 py-1.5` and set right actions to responsive visibility (compact `EN`/`CEB` toggle on `xl`, full language name and "Track Ticket" button on `2xl`).
  - [x] Ensured top micro-bar has `min-w-0` on flex items and `truncate` on text to prevent flexbox child expansion.
  - [x] Standardized logo subtitle to `truncate` and responsive visibility (full name on `2xl:block`, concise `Bohol 3rd District` on smaller screens).
- [x] **12.4 Verification**:
  - [x] Verified zero horizontal overflow on desktop and mobile viewports.
  - [x] Production build verified via `npm run build` (1979 modules transformed, 18.79s, exit code 0).

---

### Phase 13: Official Portrait Asset Upgrade (`cong_alexie.webp`)
- [x] **13.1 Asset Replacement & Integration**:
  - [x] Integrated user-provided WebP image asset: `public/images/cong_alexie.webp`.
  - [x] Updated image path in `src/pages/public/AboutPage.tsx` from `/images/cong_alexie.jpg` to `/images/cong_alexie.webp`.
  - [x] Updated image path in `src/pages/public/HomePage.tsx` from `/images/cong_alexie.jpg` to `/images/cong_alexie.webp`.
- [x] **13.2 Build Verification**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1979 modules transformed).

---

### Phase 14: Desktop Hero Call-to-Action Single-Line Layout
- [x] **14.1 Button Component Class Merging (`Button.tsx`)**:
  - [x] Integrated `twMerge` from `tailwind-merge` into `src/components/common/Button.tsx`.
  - [x] Enabled custom responsive padding and font overrides passed via `className` to cleanly override base styles without specificity collisions.
- [x] **14.2 Hero Actions Sizing & Layout (`HomePage.tsx`)**:
  - [x] Updated hero action button container to `flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 xl:gap-3.5 pt-2`.
  - [x] Optimized button sizes to `size="md"` with responsive padding (`px-3.5 sm:px-4 lg:px-3.5 xl:px-5 py-2.5 sm:py-3 text-xs sm:text-xs xl:text-sm whitespace-nowrap min-h-[44px] xl:min-h-[48px] shrink-0`).
  - [x] Scaled icons to `w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0` and added `shrink-0` to React Router `<Link>` wrappers.
  - [x] Ensured all 3 hero buttons (`PTV 24/7 Hotline`, `Action Center (Tracker)`, `7 Flagship Programs`) render strictly on a single horizontal line on desktop viewports while preserving mobile wrapping.
- [x] **14.3 Build Verification**:
  - [x] Verified production build (`npm run build`) passed with exit code 0 (1980 modules transformed).

---

### Phase 15: Sinoog 2027 3D Floating Cards & Top Specular Light Effect
- [x] **15.1 Multi-Layer Floating Drop-Shadow Architecture**:
  - [x] Upgraded `--sinoog-shadow-card`, `--sinoog-shadow-card-hover`, and `--sinoog-shadow-card-raised` in `tokens.css`, `index.css`, and `tailwind.config.js` to a 5-layer optical elevation system:
    - Layer 1: Crisp contact shadow (`0 1px 3px rgba(15, 23, 42, 0.05)`).
    - Layer 2: Warm ambient terracotta/orange floor reflection (`0 12px 28px -6px rgba(194, 65, 12, 0.20)`).
    - Layer 3: Deep diffuse ambient floor shadow (`0 30px 60px -16px rgba(15, 23, 42, 0.16)`).
    - Layer 4: Razor-sharp top white rim specular highlight (`inset 0 1.5px 0 0 rgba(255, 255, 255, 1)`).
    - Layer 5: Downward diffuse top light sheen (`inset 0 8px 20px -2px rgba(255, 255, 255, 0.85)`).
- [x] **15.2 Top Edge Light & Bevel Treatment**:
  - [x] Added `border-top-color: rgba(255, 255, 255, 0.95)` and pure white hover top rim (`border-top-color: #ffffff`) across `.m3-card`, `.sinoog-card`, and card components.
  - [x] Applied top-down subtle linear gradient backgrounds (`linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 248, 0.94) 100%)`) to create realistic directional light from above.
  - [x] Configured smooth 220ms cubic-bezier transitions with dynamic `-4px` vertical float on hover.
- [x] **15.3 Component & Public Page Card Upgrades**:
  - [x] Upgraded `.m3-card` (`filled`, `elevated`, `outlined`) in `src/styles/m3/components.css`.
  - [x] Upgraded `StatCounter.tsx` (the 7 flagship metrics) with top light border and warm floating shadow.
  - [x] Upgraded `HomePage.tsx` (spotlight photo card, district summary card, featured programs, and photo albums).
  - [x] Upgraded `ProgramsPage.tsx` (flagship program detail cards).
  - [x] Upgraded `AboutPage.tsx` (biography card and legislative measures cards).
- [x] **15.4 Build Verification**:
  - [x] Verified production build (`npm run build`) passed with exit code 0 in 9.40s.

---

### Phase 16: Unified One-Screen District Map & Facility Details Integration
- [x] **16.1 One-Screen Viewport Architecture (`MapPage.tsx`)**:
  - [x] Enforced zero-page-scroll layout on desktop using `lg:h-[calc(100vh-108px)] lg:max-h-[960px] overflow-hidden` with flex-col container and responsive mobile fallbacks.
  - [x] Designed top unified control strip:
    - Page heading and facility count badge.
    - Quick PTV 24/7 hotline dispatch callout pill.
    - Google Map tile layer switcher (Roadmap / Satellite / Terrain).
    - Real-time search input for facilities, towns, and addresses.
    - Category filter chips (`All`, `Offices`, `Clinics`, `PTV Stations`, `Dialysis Tambayan`, `Pabahay`, `Municipal Halls`).
    - Alphabetical 19-town dropdown filter with auto camera repositioning.
- [x] **16.2 Split-Screen Interactive Facility Sidebar**:
  - [x] Built scrollable details sidebar (`lg:col-span-5 xl:col-span-4 h-full flex flex-col min-h-0`):
    - **Active Facility Spotlight Card**: Prominent details card displaying complete facility address, operating hours, full bilingual description, direct phone call button, and Google Maps GPS navigation link (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`).
    - **Scrollable Facilities List**: Sinoog floating cards for all matching facilities with municipality badges, category icons, phone contacts, and quick "View on Map" triggers.
- [x] **16.3 Enhanced Interactive Map Component (`DistrictLeafletMap.tsx`)**:
  - [x] Added bidirectional selection synchronization: clicking a map pin highlights its card in the sidebar and opens the spotlight; clicking a sidebar card flies the map camera and opens its popup.
  - [x] Implemented `MapViewController` using Leaflet `useMap` for smooth `flyTo` camera animation when selecting a facility or switching towns.
  - [x] Added `MapResizeInvalidator` to ensure Leaflet tiles never render blank/gray when mounting inside flexible CSS grid containers.
  - [x] Upgraded SVG custom pin markers with an animated pulsing halo and active ring state when `selectedLocationId` matches.
- [x] **16.4 Build Verification**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1980 modules transformed in 10.20s).





