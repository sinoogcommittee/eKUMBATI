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
- [x] **5.4 Sinoog 2027 3D Card Architecture & Inner Pop Containers**:
  - [x] Eliminated black hover border bug by fixing CSS syntax in `--sinoog-border-card-hover-color: #fb923c` and removing shorthand collision with `border-color`.
  - [x] Calibrated floating 3D drop-shadow system (`shadow-sinoog`, `shadow-sinoog-hover`, `shadow-sinoog-raised`) with negative spread to prevent dark cloud bleed onto adjacent cards.
  - [x] Built `.sinoog-card-inner` and `shadow-sinoog-inner` utility tokens for elevated nested containers inside cards.
  - [x] Rolled out floating cards and elevated inner containers across all public pages: `HomePage.tsx` (spotlight card, flagship programs, requirements boxes, album cards), `ProgramsPage.tsx` (detail cards, document checklists), `ImpactPage.tsx` (19/19 tile, distribution table, timeline cards), `GalleryPage.tsx` (cataloged albums, photo stream, tag badges), `ActionCenterPage.tsx` (form card, guidance sidebar, tracker search, ticket detail cards), `AboutPage.tsx` (chairmanship banner, committee tiles, legislative measure cards & status badges), `DirectoryPage.tsx` (town cards, hotline boxes, phone pills), and `StatCounter.tsx` (elevated icon container & verified milestone badge).
  - [x] Production build (`npm run build`) passed with exit code 0.

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
    - Pabahay: **310+** homes handed over.
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

---

### Phase 17: Official Kumbati Brand Logo & High-DPI Favicon Integration
- [x] **17.1 Asset Optimization & Conversion (`kumbati_logo.png`)**:
  - [x] Backed up original 11.94 MB (4619x4619) high-resolution transparent master file to `public/images/kumbati_logo_orig.png` (ignored in git to prevent repository bloat).
  - [x] Generated high-DPI retina WebP logo: `public/images/kumbati_logo.webp` (512x512, 84 KB, ~99.3% reduction).
  - [x] Generated compact fast-loading WebP logo: `public/images/kumbati_logo_sm.webp` (192x192, 25 KB).
  - [x] Generated optimized web PNG logo: `public/images/kumbati_logo.png` (512x512, 266 KB).
  - [x] Generated multi-resolution browser favicons:
    - `public/favicon.ico` (standard 48x48 multi-resolution Windows/browser ICO, 9.6 KB).
    - `public/favicon.png` (crisp 64x64 PNG favicon, 10.2 KB).
    - `public/apple-touch-icon.png` (180x180 iOS/mobile touch bookmark icon, 49.2 KB).
- [x] **17.2 Browser Header & Metadata Updates (`index.html`)**:
  - [x] Replaced generic SVG favicon with official `favicon.ico`, `favicon.png`, and `apple-touch-icon.png`.
  - [x] Updated SEO description to reference Verified 2027 Impact Metrics.
- [x] **17.3 Global UI Logo Implementation**:
  - [x] Replaced generic 'K' letter container in `src/components/layout/Header.tsx` with optimized `kumbati_logo_sm.webp`.
  - [x] Replaced 'K' container in `src/components/layout/MobileNav.tsx` with `kumbati_logo_sm.webp`.
  - [x] Replaced 'K' container in `src/components/layout/Footer.tsx` with `kumbati_logo.webp`.
  - [x] Replaced 'K' container in `src/components/layout/AdminSidebar.tsx` with `kumbati_logo_sm.webp`.
  - [x] Replaced 'K' container in `src/pages/admin/AdminLoginPage.tsx` with `kumbati_logo.webp`.
- [x] **17.4 Verification & Production Build**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1980 modules transformed in 16.99s).

---

### Phase 18: Authentic Project & Program Photo Integration
- [x] **18.1 Photo Research & Discovery via Web**:
  - [x] Searched regional journalism portals (Bohol Island News, The Bohol Tribune, PIA) and indexed verified authentic photos of Rep. Kristine Alexie Besas Tutor's projects across Bohol District 3.
  - [x] Discovered authentic coverage of:
    - Pabahay 244th Home Turnover in Lila and Loboc beneficiary homes.
    - Patient Transport Vehicle (PTV) medical transport fleet and deployments.
    - Kumbati Medical Clinic opening in Candijay and free consultations.
    - CHED-TDP and District Tertiary Scholars assemblies with Congw. Alexie Tutor.
    - Sustainable livelihood coconut processing facility in Mabini and agricultural programs.
    - Tabajan Bridge engineering inspection and rural community infrastructure.
- [x] **18.2 WebP Asset Optimization (`public/images/`)**:
  - [x] Downloaded and optimized 20 authentic high-resolution photos using ffmpeg Lanczos resampling at `q=85`:
    - `public/images/programs/`: `pabahay.webp` (238 KB), `ptv.webp` (112 KB), `dialysis-tambayan.webp` (226 KB), `clinic.webp` (111 KB), `scholars.webp` (37 KB), `livelihood.webp` (297 KB), `infrastructure.webp` (357 KB).
    - `public/images/gallery/`: `pabahay_turnover_lila.webp` (238 KB), `pabahay_loboc_families.webp` (338 KB), `pabahay_candijay_village.webp` (140 KB), `ptv_medical_dispatch.webp` (112 KB), `kumbati_clinic_opening.webp` (111 KB), `dialysis_haven_hospital.webp` (226 KB), `scholar_assembly_tutor.webp` (37 KB).
    - `public/images/news/`: `pabahay_turnover.webp` (190 KB), `scholar_assembly.webp` (37 KB), `kumbati_clinic.webp` (85 KB), `ptv_dispatch.webp` (111 KB), `livelihood_equipment.webp` (212 KB), `bridge_inspection.webp` (263 KB).
    - Optimized newly provided `kumbati_logo_horizontal.webp` (204 KB).
- [x] **18.3 Codebase Stock Image Replacement**:
  - [x] Replaced all 24 stock Unsplash URLs in `src/lib/constants.ts` with authentic local WebP paths across programs, gallery albums, gallery media items, and news postings.
  - [x] Replaced Unsplash fallback in `src/pages/admin/AdminGalleryPage.tsx` with `/images/gallery/pabahay_turnover_lila.webp`.
  - [x] Replaced Unsplash fallback in `src/pages/admin/AdminProgramsPage.tsx` with `/images/programs/pabahay.webp`.
  - [x] Verified zero generic Unsplash URLs remain across the entire codebase.
- [x] **18.4 Verification & Production Build**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1980 modules transformed in 14.78s).

---

### Phase 19: Authentic Education Program Photo Integration
- [x] **19.1 Education Asset Discovery**:
  - [x] Researched educational initiatives under Rep. Alexie Tutor in Bohol District 3.
  - [x] Discovered authentic coverage of:
    - **Carmen Municipal College (CMC)**: Formal opening and ceremonial ribbon-cutting ceremony led by Rep. Alexie Tutor and Mayor Che Toribio, welcoming the inaugural batch of 350+ tuition-free college scholars in Carmen, Bohol.
    - **Candijay National Science High School**: Official turnover ceremony for the digital library and StarBooks STEM educational interventions with Rep. Alexie Tutor, school heads, and robotics coaching team in Poblacion, Candijay.
- [x] **19.2 Asset Replacement & Optimization**:
  - [x] Replaced solo portrait photo with authentic Carmen Municipal College ribbon cutting photo featuring Rep. Alexie Tutor, municipal officials, faculty, and scholars:
    - `public/images/programs/scholars.webp` (90 KB WebP, 16:9 widescreen)
    - `public/images/gallery/scholar_assembly_tutor.webp` (90 KB WebP)
    - `public/images/news/scholar_assembly.webp` (90 KB WebP)
  - [x] Added Candijay Science High School educational turnover photo to gallery:
    - `public/images/gallery/candijay_science_turnover.webp` (105 KB WebP)
- [x] **19.3 Bilingual Metadata & Gallery Updates**:
  - [x] Updated `src/lib/constants.ts` with updated descriptions for `album-ched-payout` celebrating tertiary education and free college access in Carmen.
  - [x] Added second media entry `media-8` showcasing the Candijay Science High School digital turnover, bringing the album to 2 verified photos.
- [x] **19.4 Verification & Production Build**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1980 modules transformed in 10.44s).

---

### Phase 20: Single Official Facebook Page Consolidation
- [x] **20.1 Facebook Channel Unification**:
  - [x] Removed outdated/alternative Facebook links (`alexiebesastutor`, `alexie.tutor`, `teamkumbati`, `AlexieTutorPTV`).
  - [x] Established `https://www.facebook.com/Cong.AlexieTutor` as the sole official Facebook channel across all portal touchpoints.
- [x] **20.2 UI & Component Redesign**:
  - [x] Updated Homepage Social Media section into a prominent official channel banner card linking exclusively to `facebook.com/Cong.AlexieTutor`.
  - [x] Updated Footer Column 2 to display the verified `Cong. Alexie Tutor` page card with direct link.
  - [x] Updated Admin Settings (`AdminSettingsPage.tsx`) to manage the single official Facebook URL.
- [x] **20.3 Documentation & Architecture Updates**:
  - [x] Updated `constants.ts`, `kumbati.types.ts`, `AGENTS.md`, `MEMORY.md`, and `TASKS.md`.

---

### Phase 21: Fix Overlapping Years in Impact Page Chronicle of Service
- [x] **21.1 Remove Redundant Watermark Year**:
  - [x] Removed absolute-positioned background year text (`text-3xl font-black text-orange-500/15 absolute top-4 right-4`) in `src/pages/public/ImpactPage.tsx`.
  - [x] Eliminated text collision/overlap with the `[item.year] Milestone` badge across 2023-2024, 2025, 2026, and 2027 milestone cards.
- [x] **21.2 Verification & Build**:
  - [x] Verified production build (`npm run build`) completed with code 0 (1980 modules transformed in 12.47s).

---

### Phase 22: Official KUMBATI Cares Facebook Channel Integration
- [x] **22.1 Official Channel Expansion**:
  - [x] Added **KUMBATI Cares** (`https://www.facebook.com/profile.php?id=100063819665430`) alongside **Cong. Alexie Tutor** (`https://www.facebook.com/Cong.AlexieTutor`).
- [x] **22.2 Layout & UI Integration**:
  - [x] Updated Homepage Social Media section into a dual-card grid featuring both official verified channels.
  - [x] Updated Footer Column 2 to display both official channels with direct access links.
  - [x] Updated Admin Settings (`AdminSettingsPage.tsx`) with configuration inputs for both channels.
- [x] **22.3 Architecture & Type Safety**:
  - [x] Updated `src/types/kumbati.types.ts`, `src/lib/constants.ts`, `AGENTS.md`, and `MEMORY.md`.

---

### Phase 24: Standardize "Pabahay ni Kumbati" to "Pabahay"
- [x] **24.1 Universal Name Standardization**:
  - [x] Standardized flagship metric title to **"Pabahay Beneficiaries"** (EN) / **"Benepisyaryo sa Pabahay"** (CEB).
  - [x] Standardized program title to **"Pabahay Socialized Housing"** (EN) / **"Pabahay Desenteng Panimalay"** (CEB).
  - [x] Updated gallery album to **"Pabahay 300th Home Turnover Ceremonies"**.
  - [x] Updated map location to **"Pabahay Village - Candijay Site"**.
  - [x] Updated news bulletin to **"Pabahay Phase 4 Site Assessment"**.
  - [x] Updated public Action Center form category defaults, subjects, and tracking samples.
  - [x] Updated Admin Dashboard and Submissions ticket categories and subjects.
  - [x] Updated About Page governance doctrine text.
- [x] **24.2 Integrity & Zero Placeholder Verification**:
  - [x] Verified 0 remaining occurrences of `"Pabahay ni Kumbati"` across entire repository.
  - [x] `npm run build` completed with code 0.

---

### Phase 30: Navigation Menu Reordering (Action Center after Programs, Impact before About)
- [x] **30.1 Reorder Public Navigation Flows**:
  - [x] Header Navigation (`Header.tsx`): Moved Action Center (`/action-center`) directly after Programs (`/programs`), and moved Impact (`/impact`) directly before About (`/about`).
  - [x] Mobile Navigation Drawer (`MobileNav.tsx`): Synchronized mobile drawer nav items to the new order: Home -> Programs -> Action Center -> News -> Gallery -> 19 Towns -> Map -> Impact -> About.
  - [x] Footer Navigation (`Footer.tsx`): Synchronized Quick Links to reflect the updated navigation sequence.
- [x] **30.2 Verification & Build**:
  - [x] Verified `npm run build` completed with code 0 (1980 modules transformed in 11.40s).---

### Phase 31: Home Portal, Global Navigation & Footer UX Streamlining
- [x] **31.1 Streamline Top Utility Bar & Language Toggle (`Header.tsx`)**:
  - [x] Added dynamic scroll listener (`isScrolled`) to smoothly collapse/hide the top white PTV emergency micro strip on scroll down while keeping the main orange navbar sticky.
  - [x] Implemented explicit bilingual segmented pill toggle (`EN | BIN`) for both desktop and mobile headers with solid white active indicator and orange text.
- [x] **31.2 De-clutter Hero Section CTAs (`HomePage.tsx`)**:
  - [x] Replaced 3 stacked buttons with 2 high-contrast CTAs:
    - Primary: Solid orange gradient button with `ShieldCheck` icon: `"Apply for Assistance / Track Ticket"` (`"Pag-apply og Hinabang / Susiha ang Ticket"`) -> `/action-center`.
    - Secondary: Clean outline button with `Layers` icon: `"Explore 7 Flagship Programs"` (`"Susiha ang 7 ka Programa"`) -> `#flagship-programs`.
  - [x] Removed redundant red PTV button from Hero section.
- [x] **31.3 Reorder Home Page Sections for Constituent Intent (`HomePage.tsx`)**:
  - [x] Section 1: Hero Section with 2 CTAs and Congw. Alexie feature card.
  - [x] Section 2: Flagship Programs of Team KUMBATI (moved UP with `id="flagship-programs"` and `scroll-mt-24`).
  - [x] Section 3: 7 Flagship 2027 KUMBATI Impact Metrics (moved DOWN for proof & transparency).
  - [x] Section 4: Mid-Page Action Center Callout Banner.
  - [x] Section 5: Recent Outreach & Project Highlights.
- [x] **31.4 Condense Home Page "Flagship Programs" Preview Cards (`HomePage.tsx`)**:
  - [x] Removed embedded `"KEY REQUIREMENTS"` checklist container from home preview cards to eliminate mobile scroll fatigue.
  - [x] Added clean requirement count pill badge (`📋 ${reqCount} Simple Requirements` / `... ka mga Panginahanglanon`).
  - [x] Added prominent gradient button: `"View Requirements & Apply →"` linking directly to `/programs#${prog.slug}`.
  - [x] Clamped card description text to `line-clamp-3` for uniform card heights.
- [x] **31.5 Unify "2027 Impact Metrics" Grid Styling (`HomePage.tsx`)**:
  - [x] Updated 8th card (`19 / 19 Municipalities Served`) to match clean white card surface, border radius, and shadow of cards 1-7 (eliminated dark navy fill).
  - [x] Added subtle `100% COVERAGE` badge, `19 / 19` in dark text, red heart icon with sinoog-inner container, and orange link `"Browse 19 Municipalities"`.
- [x] **31.6 Upgrade Footer Interactivity & De-emphasize Staff CMS (`Footer.tsx`, `DirectoryPage.tsx`)**:
  - [x] Converted 19 municipality pills in Footer into interactive links targeting `/directory?town=...#town-...`.
  - [x] Added `useEffect` search query listener and smooth anchor scrolling in `DirectoryPage.tsx` with `scroll-mt-28`.
  - [x] Replaced boxed `Staff CMS` button with subtle, low-opacity text link (`"Staff Portal"`) inline with copyright.
  - [x] Set safe-area bottom padding (`pb-32 md:pb-16`) so the fixed 3-button mobile sticky hotline bar never overlaps footer content.
- [x] **31.7 Production Build Verification**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 17.35s).

---

### Phase 32: Grammar & Term-Wide Standardization for Flagship Impact Metrics
- [x] **32.1 Rename "7 Flagship 2027 KUMBATI Impact Metrics"**:
  - [x] Renamed section title in `HomePage.tsx` to **"7 Flagship Impact Metrics of Team KUMBATI"** (EN) / **"7 ka mga Nag-unang Sukod sa Kalampusan sa Team KUMBATI"** (CEB).
  - [x] Resolved stacked noun modifier grammar issue and eliminated confusing calendar year restriction since deliverables and public assistance span across the full legislative term.
- [x] **32.2 Synchronize Across Portal & CMS**:
  - [x] Updated `ImpactPage.tsx` hero title to `"Verified Flagship Impact Metrics of Team KUMBATI"` and badge to `"Audited Governance Report"`.
  - [x] Updated `StatCounter.tsx` verification badge to `"Verified Term Milestone"`.
  - [x] Updated `Footer.tsx` quick link to `"Flagship Impact Metrics"`.
  - [x] Updated `MobileNav.tsx` drawer item to `"Flagship Impact Metrics"`.
  - [x] Updated `AdminMetricsPage.tsx` header to `"The 7 Flagship Impact Metrics"`.
  - [x] Updated `AdminDashboardPage.tsx` badge to `"Audited"`.
  - [x] Updated blueprints in `AGENTS.md` and `src/lib/constants.ts`.
- [x] **32.3 Verification & Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 5.78s).

---

### Phase 33: Responsive Layout for Recent Outreach & Moving Metrics Below Outreach
- [x] **33.1 Responsive Title Layout for Recent Outreach (`HomePage.tsx`)**:
  - [x] Changed header container from rigid `flex items-end justify-between` to responsive `flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8`.
  - [x] Eliminated title squeezing on mobile where `"Recent Outreach & Project Highlights"` wrapped awkwardly across 4 vertical lines.
  - [x] Placed `"View All Albums"` button cleanly below the full-width title on mobile (`self-start sm:self-auto`).
- [x] **33.2 Section Reordering**:
  - [x] Moved **7 Flagship Impact Metrics of Team KUMBATI** below **Recent Outreach & Project Highlights**.
  - [x] Final Home page section flow:
    1. Hero Section
    2. Flagship Programs of Team KUMBATI
    3. Action Center CTA Banner (Digital Constituent Desk)
    4. Recent Outreach & Project Highlights (Multimedia Photo Albums)
    5. 7 Flagship Impact Metrics of Team KUMBATI (Proof & Accountability)
- [x] **33.3 Verification & Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 5.95s).

---

### Phase 34: 7 Flagship Programs & Advocacies Page Refactoring
- [x] **34.1 Top "3-Step How to Apply" Guide (`ProgramsPage.tsx`)**:
  - [x] Surfaced the 3-step application guide (`1. Prepare Documents`, `2. Submit Online or at District Office`, `3. Track Reference Code`) directly below the hero banner.
  - [x] Built responsive dark-navy `#0B132B` card with an accordion toggle (`"📌 How to Apply in 3 Easy Steps (Tap to View)"`) on mobile to minimize vertical scroll height while keeping full 3-step grid on desktop.
- [x] **34.2 Sticky Category Filter Bar & Quick-Jump Index (`ProgramsPage.tsx`)**:
  - [x] Created sticky navigation bar (`sticky top-14 sm:top-16 z-20`) combining category filter pills and quick-jump program index.
  - [x] Removed native scrollbars with `[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden` and added right-edge gradient fade.
  - [x] Built 7 quick-jump pills (`#1 Pabahay`, `#2 PTV 24/7`, `#3 Dialysis`, `#4 Medicine`, `#5 Scholarships`, `#6 Livelihood`, `#7 Rural Infra`) that switch to 'All' category and smoothly scroll directly to each program card (`scroll-mt-40`).
- [x] **34.3 "Who Can Apply" Target Audience Badges (`ProgramsPage.tsx`)**:
  - [x] Added bilingual Target Applicant Badges under each program title:
    - #1 Pabahay: `🏠 Who Can Apply: Indigent Families & Disaster Victims`
    - #2 PTV 24/7: `🚑 Who Can Apply: Emergency & Referral Patients`
    - #3 Dialysis: `🏥 Who Can Apply: Hemodialysis Patients & Watchers`
    - #4 Medicine: `💊 Who Can Apply: Individual Constituents, Seniors & PWDs`
    - #5 Scholarships: `🎓 Who Can Apply: Enrolled College Students (GWA ≥ 80%)`
    - #6 Livelihood: `🤝 Who Can Apply: Registered Co-ops & Associations (SEC/CDA/DOLE)`
    - #7 Rural Infra: `🏛️ Who Can Apply: Barangay Councils & LGU Officials`
- [x] **34.4 Interactive Self-Check Document Checklist (`ProgramsPage.tsx`)**:
  - [x] Replaced static checkmark icons with interactive checkboxes (`role="checkbox"`) featuring green fill, checkmark, and row tint upon checking.
  - [x] Added dynamic progress counter badge (`"0 / 5 Ready"`, `"3 / 5 Ready"`, `"All Ready!"`).
  - [x] Persisted checklist state in `localStorage` (`kumbati_programs_checklist_progress`).
  - [x] Fixed header alignment: styled `"Print / Full View"` as a single-line compact pill button (`whitespace-nowrap`) cleanly aligned to the right.
- [x] **34.5 Streamlined Card CTAs & Redundant PTV Button Removed (`ProgramsPage.tsx`)**:
  - [x] Unified card footers into a clean 2-button layout: Primary `"Apply / Inquire at Action Center"` and Secondary `"Eligibility & Print View"`.
  - [x] Removed redundant 3rd red PTV calling button on Card #2.
- [x] **34.6 Smart-Link Pre-selection in Action Center (`ProgramsPage.tsx`, `ActionCenterPage.tsx`)**:
  - [x] Updated all "Apply / Inquire" links to pass `/action-center?tab=submit&program=${encodeURIComponent(prog.slug)}`.
  - [x] Updated `ActionCenterPage.tsx` with a resolver function mapping slugs/ids/names to exact dropdown options (`title_en`) and auto-selecting the program.
- [x] **34.7 Verification & Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 8.80s).

---

### Phase 35: Constituent Action Center & Tracker Page Refactoring
- [x] **35.1 Dynamic Program Auto-Selection from URL Query Params (`ActionCenterPage.tsx`)**:
  - [x] Added `resolveProgramName` supporting slugs, keywords (`free-medicine`, `clinic`, `ptv`, `dialysis`, `pabahay`, `scholar`, `ched`, `livelihood`, `infra`), and IDs to map to exact dropdown options.
  - [x] Pre-selected `program_category` when navigated from Programs page with `?program=...`.
- [x] **35.2 Separation of Submit View & Ticket Tracker View (`ActionCenterPage.tsx`)**:
  - [x] Clean view transition between 'submit' and 'track' modes with focused cards and dedicated workflows.
  - [x] Built real-time status tracker with uppercase auto-formatting, demo code chip, and status stepper.
- [x] **35.3 Form Accessibility & Mobile Safe-Area Spacing (`ActionCenterPage.tsx`)**:
  - [x] Added HTML `autoComplete` attributes, required field markers, touch-target sizing (`min-h-[46px]`).
  - [x] Added helper text below contact field for SMS tracking updates.
  - [x] Added `pb-32 sm:pb-36` bottom padding to clear the fixed mobile hotline bar.
- [x] **35.4 One-Tap "Copy Reference Code" Success Modal (`ActionCenterPage.tsx`)**:
  - [x] Formatted code to official `KMB-YYYY-XXXXX` regex pattern avoiding ambiguous characters.
  - [x] Modal displays code with instant clipboard feedback (`"Copied to Clipboard!"` / `"Nahi-kopya na sa Clipboard!"`).

---

### Phase 36: News, Updates & Public Announcements Page Refactoring
- [x] **36.1 Eliminate Duplicate Hero Alerts in Feed (`NewsPage.tsx`)**:
  - [x] When top hero urgent advisory banner is rendered, excluded `urgentPinnedPost.id` from the main feed grid on default view.
  - [x] Prevented duplicate cards on initial load while ensuring urgent items remain discoverable via search and "Urgent" filter.
- [x] **36.2 Dynamic Search & Category Filter Bar (`NewsPage.tsx`)**:
  - [x] Connected SearchBar (`searchQuery`), municipality selector (`selectedTown`), and category tabs (`selectedCategory`) to live client-side filtering.
  - [x] Added 7 category filter tabs with dynamic match counters: All Updates, Urgent Alerts, Payout Schedules, Medical & Health, Press & Legislative, Public Advisories, General News.
  - [x] Added active filter summary indicator and "Reset Filters" action button when 0 items match.
- [x] **36.3 Social Share & One-Tap Copy Link Actions (`NewsPage.tsx`)**:
  - [x] Added secondary action button on every announcement card and hero banner for Share / Copy Link.
  - [x] Invokes Web Share API (`navigator.share`) on supported devices, falling back to clipboard copy with an animated `"Link Copied!"` tooltip.
  - [x] Added deep-linking support (`/news?id=xxx` or `/news#xxx`) to auto-open specific bulletin modals when shared links are opened.
- [x] **36.4 Mobile Spacing & Horizontal Scrollbar Removal (`NewsPage.tsx`, `HomePage.tsx`)**:
  - [x] Hidden native horizontal scrollbars on category filter pills using `[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x`.
  - [x] Added safe-area padding `pb-32 sm:pb-36` to the page container to prevent collision with the mobile sticky hotline bar.
  - [x] Fixed `HomePage.tsx` mobile layout so "Recent Outreach & Project Highlights" heading receives full 100% width and "View All Albums" renders strictly below the title.
- [x] **36.5 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 7.70s).

---

### Phase 37: Multimedia Photo Gallery Page Refactoring
- [x] **37.1 Eliminate Dual-Feed Redundancy (`GalleryPage.tsx`)**:
  - [x] Removed repetitive stacking of "Recommended Albums" and "Photo Stream".
  - [x] Unified into a clean, scannable Photo Album Grid (responsive 1-column on mobile, 2-column on tablet/desktop: `grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`).
- [x] **37.2 Fullscreen Lightbox Modal (`GalleryPage.tsx`)**:
  - [x] Implemented responsive fullscreen lightbox dialog with blurred dark backdrop (`bg-slate-950/95`).
  - [x] High-resolution photo display, bilingual caption, photo counter (`Photo X of Y`), previous/next navigation buttons, and direct close (`✕`) button.
  - [x] Added keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and interactive thumbnail strip at the bottom of the lightbox.
  - [x] Added deep-link handler (`?album=...`) to auto-scroll to album from homepage preview cards.
- [x] **37.3 Clean Up Tags & Metadata Overload (`GalleryPage.tsx`)**:
  - [x] Removed cluttered internal document tags (`#Pabahay`, `#Indigency`, `#Turnover`, etc.).
  - [x] Replaced with clean location and date badges (e.g., `📍 Candijay • November 2026`) formatted bilingually (`EN` / `Binisaya`).
  - [x] Added photo count badge (`📸 X Photos`) and mini thumbnail preview row with interactive jump-to-photo links.
- [x] **37.4 Mobile Spacing & Hidden Scrollbars (`GalleryPage.tsx`)**:
  - [x] Removed horizontal scrollbar tracks from category filter pills using `[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x`.
  - [x] Added safe-area padding `pb-32 sm:pb-36` to ensure the mobile sticky hotline bar never obscures the final gallery row.
- [x] **37.5 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 10.49s).

---

### Phase 38: 19-Town Municipal Directory & Emergency Hotlines Refactoring
- [x] **38.1 All 19 Municipalities Data Enrichment (`constants.ts`)**:
  - [x] Researched official Bohol PNP, MDRRMO, and LGU emergency contacts to populate authentic hotlines for all 19 towns (Alicia, Anda, Batuan, Bilar, Candijay, Carmen, Dimiao, Duero, Garcia Hernandez, Guindulman, Jagna, Lila, Loay, Loboc, Mabini, Pilar, Sevilla, Sierra Bullones, Valencia).
  - [x] Added precise GPS coordinates for all 19 Municipal Halls in `INITIAL_MAP_LOCATIONS` for seamless interactive mapping on Leaflet.
- [x] **38.2 Quick-Jump Municipal Pill Grid (`DirectoryPage.tsx`)**:
  - [x] Added responsive, wrapped 19-town pill row below search bar with active state highlights.
  - [x] Clicking any town pill clears conflicting search queries and smooth-scrolls viewport directly to `#town-<slug>` with target card highlight.
- [x] **38.3 Enforce Click-to-Call (`tel:`) Hyperlinks (`DirectoryPage.tsx`)**:
  - [x] Converted all phone numbers and hotlines across priority emergency cards and town cards into active `tel:` links (`href="tel:+63..."` or `href="tel:038..."`).
  - [x] Added high-contrast touch targets with phone icons and instant clipboard copy button (`📋`).
- [x] **38.4 Streamline Top Emergency Banner (`DirectoryPage.tsx`)**:
  - [x] Compact 4-card / 2x2 responsive emergency grid (PTV 24/7, Candijay HQ, Tambayan ni Kumbati, Kumbati Clinic) with direct call buttons.
- [x] **38.5 Mobile Search, Map Deep-Links & Safe-Area Spacing (`DirectoryPage.tsx`)**:
  - [x] Dynamic real-time search filtering with match counter and "Clear Search" reset button.
  - [x] Added direct "Map" link on each town card (`/map?town=<name>`) focusing the interactive map on that municipality.
  - [x] Added safe-area padding `pb-32 sm:pb-36` to ensure the mobile sticky hotline bar never obscures the final municipality card.
- [x] **38.6 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 8.49s).

---

### Phase 39: About Congresswoman Alexie Besas-Tutor Page Refactoring
- [x] **39.1 At a Glance Quick-Fact Profile Card (`AboutPage.tsx`)**:
  - [x] Added prominent summary card highlighting key credentials: Profession (Licensed Physical Therapist & Law Graduate), Constituency (3rd Congressional District of Bohol, 19 Municipalities), Tenure (Serving since 2019, Incumbent Representative), and Core Focus (Emergency Medical Transport, Socialized Housing, Healthcare & Education).
- [x] **39.2 Tabbed Bio Sections (`AboutPage.tsx`)**:
  - [x] Segmented comprehensive biography text into 3 clean, interactive tabs: `Public Servant & Background` (journey and education), `District 3 Vision & Flagship Commitments` (7 pillars of Team KUMBATI), and `Legislative Track Record` (committee leadership, principal authored laws, and co-authored measures).
  - [x] Included real-time search filtering, category filters, and pagination for 100+ legislative bills.
- [x] **39.3 Mobile Spacing & Safe-Area Padding (`AboutPage.tsx`)**:
  - [x] Balanced typography line-heights, touch targets, and added `pb-32 sm:pb-36` bottom padding to prevent collision with mobile sticky hotline bar.
- [x] **39.4 Verification & Production Build**:
  - [x] Cleaned unused `Button` import; verified `npm run build` succeeds with exit code 0.

---

### Phase 40: Home Page Visual Documentation Title & Layout Optimization
- [x] **40.1 Title Arrangement & Text Balancing (`HomePage.tsx`)**:
  - [x] Resolved mobile title wrapping where "Recent Outreach & Project Highlights" was previously constrained into a vertical 4-line column.
  - [x] Applied `text-balance` and full-width flow so the title renders cleanly in 2 natural lines across mobile viewports.
  - [x] Added descriptive context subtext beneath the headline for both English and Cebuano constituents.
- [x] **40.2 "View All Albums" Button Positioning (`HomePage.tsx`)**:
  - [x] Positioned "View All Albums" cleanly below the title on mobile viewports (`flex flex-col sm:flex-row`), avoiding awkward side-by-side layout next to "Highlights".
  - [x] Styled as a refined, touch-friendly pill button with ghost styling, subtle border, and photo icon.
- [x] **40.3 Section Ordering Verification (`HomePage.tsx`)**:
  - [x] Verified and confirmed the 7 Flagship Impact Metrics section sits directly below the Recent Outreach / Multimedia Photo Highlights section.
- [x] **40.4 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 15.23s).

---

### Phase 41: District Geospatial Map Page & Leaflet Enhancements
- [x] **41.1 Map vs. List View Toggle (`MapPage.tsx`)**:
  - [x] Added intuitive top toggle pill (`🗺️ Map View` | `📋 Facility Directory`) enabling instant switching between full-screen interactive Leaflet mapping and a rich 3-column facility directory.
  - [x] Maintained URL synchronization (`?view=map` vs. `?view=list`).
- [x] **41.2 Sync Directory Cards with Map Markers (`MapPage.tsx` & `DistrictLeafletMap.tsx`)**:
  - [x] Clicking any facility card or its "View on Map" button automatically switches to Map View, smoothly flies camera to marker coordinates, and opens its interactive Leaflet popup.
  - [x] Built auto-popup `<LocationMarker>` subcomponent with React refs for seamless marker interaction.
- [x] **41.3 Google Maps Turn-by-Turn GPS Routing Links (`MapPage.tsx` & `DistrictLeafletMap.tsx`)**:
  - [x] Integrated high-contrast, touch-friendly "Get Directions" buttons (`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`) across all directory cards, spotlight panels, and Leaflet pin popups.
- [x] **41.4 Collapsible Filter Toolbar & Safe-Area Mobile Padding (`MapPage.tsx`)**:
  - [x] Consolidated search input, category filter pills with match counts, 19-town dropdown, and map style switcher (Roadmap, Satellite, Terrain) into a clean collapsible toolbar with badge counters.
  - [x] Added safe-area bottom padding (`pb-32 sm:pb-36`) ensuring the mobile fixed emergency hotline bar never obscures controls or content.
- [x] **41.5 Official Office Map Pins & Coordinates Verification (`constants.ts`)**:
  - [x] Decoded and verified exact Plus Codes: Candijay Main HQ (`RF8W+JVP` &rarr; `9.8165, 124.4971`) and Guindulman Satellite Office & Medical Desk (`QF6Q+G72` &rarr; `9.7613, 124.4881`).
  - [x] Added Kumbati Medical Clinic Candijay Main Clinic (`San Antonio Heights, Poblacion, Candijay`, `9.8170, 124.4980`, Mon-Wed 8am-3pm with Doc Angela), Kumbati Clinic Jagna (`9.6528, 124.3683`), Tambayan ni Kumbati for Dialysis Patients (`9.6443, 123.8572` near Gallares Hospital), 3 PTV Dispatch Hubs (Carmen, Guindulman, Candijay), 3 Pabahay Communities (Candijay, Lila, Loboc), and all 19 Municipal Halls.
- [x] **41.6 Map Header Single-Line Streamlining (`MapPage.tsx`)**:
  - [x] Removed redundant red PTV emergency hotline button from map page header card.
  - [x] Arranged Map View toggle, Facility Directory toggle, and Filter button into a single horizontal row (`flex-nowrap`).
- [x] **41.7 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 9.99s).

---

### Phase 42: Header Logo Contrast & Visibility Enhancement
- [x] **42.1 Official Seal White Circular Medallion Pod (`Header.tsx`)**:
  - [x] Enclosed `/images/kumbati_logo_sm.webp` in a crisp pure-white circular badge pod (`rounded-full bg-white p-1 border-2 border-white/95 shadow-md ring-2 ring-black/5`).
  - [x] Ensured the orange/black KUMBATI AT seal is 100% visible with optimal contrast while preserving the global vibrant orange navbar gradient.
- [x] **42.2 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1980 modules transformed in 7.90s).

---

### Phase 43: PWA Web App Installation & Social Media Preview Cards
- [x] **43.1 Web App Manifest & Sharp Icons (`public/manifest.json`, `public/pwa-*.png`)**:
  - [x] Created `public/manifest.json` with title `"e-Kumbati"` (`short_name: "e-Kumbati"`), standalone display mode, `#F97316` theme color, and `#FFFDF9` background.
  - [x] Generated high-definition PWA icons on crisp white circular medallion badges with orange borders (`public/pwa-192x192.png`, `public/pwa-512x512.png`, and `public/pwa-maskable-512x512.png`) ensuring optimal clarity on Android, iOS, and desktop home screens.
- [x] **43.2 PWA Install Prompt Modal (`PwaInstallPrompt.tsx`)**:
  - [x] Built responsive, bilingual constituent modal listening to `beforeinstallprompt` event with smooth `framer-motion` sliding animations.
  - [x] Added iOS Safari step-by-step guidance ("Share ➔ Add to Home Screen") and smart 7-day dismissal memory via `localStorage`.
  - [x] Mounted globally in `PublicLayout.tsx`.
- [x] **43.3 Social Media OpenGraph & Twitter Preview Cards (`index.html`, `public/images/og_preview.png`)**:
  - [x] Generated 1200x630 high-resolution OpenGraph preview card (`public/images/og_preview.png`) featuring official KUMBATI AT seal, *"e-KUMBATI"*, *"Office of Congresswoman Alexie Besas Tutor"*, *"3rd Congressional District of Bohol"*, and official manifesto tagline.
  - [x] Added comprehensive `og:title`, `og:description`, `og:image`, `og:type`, `twitter:card`, and `twitter:image` meta tags in `index.html`.
- [x] **43.4 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 6.83s).

---

### Phase 44: Official Instagram Channel & Constituent Email Integration
- [x] **44.1 Domain Types & Constants Configuration (`kumbati.types.ts`, `constants.ts`)**:
  - [x] Added `instagram_official?: string;` to `SiteSettings` interface in `src/types/kumbati.types.ts`.
  - [x] Configured official email `congressmanalexietutor80@gmail.com` in `INITIAL_SITE_SETTINGS` and `INITIAL_HOTLINES` (Congressional Main Office hotline email) in `src/lib/constants.ts`, replacing old placeholder emails.
  - [x] Added official Instagram link `https://www.instagram.com/alexietutor` in `INITIAL_SITE_SETTINGS.instagram_official`.
- [x] **44.2 Public Footer Social & Contact Grid (`Footer.tsx`)**:
  - [x] Imported Lucide `Instagram` icon into `src/components/layout/Footer.tsx`.
  - [x] Unified social links into `officialSocialChannels` array including Cong. Alexie Tutor Facebook, KUMBATI Cares Community Facebook, and `@alexietutor` on Instagram.
  - [x] Replaced email link with active, touch-friendly `mailto:congressmanalexietutor80@gmail.com`.
- [x] **44.3 Admin Settings CMS Page (`AdminSettingsPage.tsx`)**:
  - [x] Imported `Instagram` icon into `src/pages/admin/AdminSettingsPage.tsx`.
  - [x] Updated Section 4 to "Official Social Media Channels" featuring dedicated input for Official Instagram (`@alexietutor`) alongside the 2 verified Facebook channels.
  - [x] Verified constituent email input updates `congressmanalexietutor80@gmail.com` and saves seamlessly to `localStorage` and Supabase.
- [x] **44.4 Documentation & Agent Operational Manual**:
  - [x] Updated `AGENTS.md` Section 5 with official Instagram link and constituent email.
  - [x] Updated `TASKS.md` and `MEMORY.md` with complete Phase 44 records.
- [x] **44.5 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 7.86s).

---

### Phase 45: Geospatial Map Overflow Elimination & Location Card Architecture Upgrade
- [x] **45.1 Zero-Overflow Control Header (`MapPage.tsx`)**:
  - [x] Shortened directory toggle label to `t('Directory', 'Direktoryo')`, saving over 50px of horizontal width.
  - [x] Adjusted typography and padding to `text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5` on the toggle and `px-2.5 sm:px-3 py-1.5 rounded-2xl` on the Filter button.
  - [x] Set action tools container to `w-full sm:w-auto justify-between sm:justify-end flex-nowrap shrink-0` with `flex-1 sm:flex-initial` buttons, guaranteeing zero horizontal overflow across narrow mobile viewports (down to 320px).
- [x] **45.2 Rich Location Card Architecture in Sidebar (`MapPage.tsx`)**:
  - [x] Replaced plain bordered container with official KUMBATI card styling: `rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white bg-gradient-to-b from-white via-white/98 to-amber-50/20 shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-300 hover:-translate-y-0.5`.
  - [x] Added distinct header strip with municipality pill badge (`MapPin` icon + orange background), category tag, and phone number.
  - [x] Upgraded category icon pods (`getCategoryColor`) with high-fidelity gradient backgrounds (e.g. red-to-rose for clinics, orange-to-amber for offices, purple-to-indigo for dialysis, emerald for housing, blue for town halls) and crisp white icons.
  - [x] Added polished card action strip with verified GPS status dot and active/focus pin pill button (`ChevronRight`).
  - [x] Applied top accent ribbon and glowing border for active selected pin (`border-2 border-orange-500 shadow-sinoog-raised ring-2 ring-orange-400/25 scale-[1.01]`).
- [x] **45.3 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 22.96s).

---

### Phase 46: Modern Web Platform Modernization — Phase 1 (Baseline Compliance & Quick Wins)
- [x] **46.1 Dual-Language Screen Reader Phonetization (`LanguageContext.tsx`)**:
  - [x] Corrected dynamic language tag assignment from generic `fil-PH` (Tagalog) to official BCP 47 `ceb-PH` (Cebuano/Boholano) when constituents switch to Binisaya mode.
- [x] **46.2 Standard CSS Scrollbars & Fallbacks (`src/index.css`)**:
  - [x] Declared standard CSS properties `scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);` and `scrollbar-width: thin;` on `:root`, `body`, and `*`.
  - [x] Isolated legacy non-standard `::-webkit-scrollbar` vendor rules within an `@supports not (scrollbar-color: auto)` block to avoid parser interference in modern Firefox and Safari.
- [x] **46.3 Motion Hygiene & Smooth Scrolling Guard (`src/index.css`)**:
  - [x] Enclosed global `scroll-behavior: smooth` inside `@media (prefers-reduced-motion: no-preference)` to respect user operating system vestibular preferences.
- [x] **46.4 Accessible Skip-to-Content Navigation (`Header.tsx`, `PublicLayout.tsx`)**:
  - [x] Added WCAG 2.4.1 compliant Skip-to-Content anchor in `Header.tsx` visible upon keyboard focus (`sr-only focus:not-sr-only`).
  - [x] Designated `<main id="main-content" tabIndex={-1}>` target in `PublicLayout.tsx` for seamless programmatic focus transfer.
- [x] **46.5 Largest Contentful Paint (LCP) Optimization (`HomePage.tsx`, `index.html`)**:
  - [x] Added high-priority `<link rel="preload" as="image" href="/images/cong_alexie.webp" type="image/webp" fetchpriority="high">` to `<head>` in `index.html`.
  - [x] Added explicit intrinsic aspect dimensions (`width={448}`, `height={320}`), `fetchpriority="high"`, and `decoding="async"` to the hero representative card in `HomePage.tsx` to eliminate Cumulative Layout Shift (CLS).
- [x] **46.6 External CDN Elimination & Local Asset Bundling (`src/index.css`, `index.html`)**:
  - [x] Removed blocking unpkg.com CDN stylesheet link for Leaflet from `index.html`.
  - [x] Bundled `leaflet/dist/leaflet.css` directly through `src/index.css` via local npm package dependency for full offline-first resilience.
- [x] **46.7 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 8.01s).

---

### Phase 47: Modern Web Platform Modernization — Phase 2 (Native Dialogs, Accessible Forms & Motion Hygiene)
- [x] **47.1 Native `<dialog>` Migration (`Modal.tsx`, `src/index.css`)**:
  - [x] Overhauled `Modal.tsx` to leverage native HTML `<dialog>` with `showModal()`, `dialog:modal { overscroll-behavior: contain; }`, and `dialog::backdrop { overflow: hidden; overscroll-behavior: contain; }`.
  - [x] Eliminated artificial `document.body.style.overflow = 'hidden'` mutation, preventing mobile scroll-locking bugs and layout shifts.
  - [x] Enabled native top-layer placement, automated focus containment, and light dismiss on backdrop click.
- [x] **47.2 Fullscreen Photo Lightbox Migration (`GalleryPage.tsx`)**:
  - [x] Converted custom `div` overlay in `GalleryPage.tsx` into native `<dialog>` with `lightboxRef`.
  - [x] Added native `cancel` event handling, keyboard arrow photo navigation (`ArrowLeft`/`ArrowRight`), and automatic top-layer focus trapping.
- [x] **47.3 Accessible Forms & Autofill Heuristics (`ActionCenterPage.tsx`, `AdminLoginPage.tsx`)**:
  - [x] Wrapped Action Center submission type options in semantic `<fieldset>` and `<legend>`.
  - [x] Linked all form controls with explicit `htmlFor` and `id` bindings across Action Center and Admin Login.
  - [x] Configured modern autofill attributes: `autoComplete="name"`, `autoComplete="tel"`, `inputMode="tel"`, `autoComplete="address-level2"`, `autoComplete="address-level3"`, `autoComplete="username"`, and `autoComplete="current-password"`.
  - [x] Disabled autocorrect, autocapitalize, and spellcheck on login credentials.
- [x] **47.4 HTML5 `<search>` Landmark Semantics (`DirectoryPage.tsx`, `HotlineModal.tsx`, `ActionCenterPage.tsx`)**:
  - [x] Wrapped directory municipal search, emergency hotline search, and Action Center reference code search in standard `<search>` landmarks.
- [x] **47.5 Motion Hygiene & Viewport-Aware Counters (`StatCounter.tsx`, `LoadingSpinner.tsx`)**:
  - [x] Conditioned count-up loops in `StatCounter.tsx` on `window.matchMedia('(prefers-reduced-motion: reduce)')` to display static totals immediately for motion-sensitive constituents.
  - [x] Integrated `IntersectionObserver` (`threshold: 0.15`) so the animated count-up only executes once scrolled into view.
  - [x] Enhanced `LoadingSpinner.tsx` with `role="status"`, `aria-live="polite"`, screen-reader text, and Tailwind `motion-reduce:animate-none` classes.
- [x] **47.6 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 7.18s).

---

### Phase 48: Modern Web Platform Modernization — Phase 3 (PWA Offline Shell, View Transitions & Dark Theme Sync)
- [x] **48.1 Native Offline-First Service Worker Shell (`public/sw.js`, `src/main.tsx`)**:
  - [x] Created `public/sw.js` implementing versioned shell caching (`kumbati-shell-v1`) for app shell, icons, and manifest.
  - [x] Implemented Stale-While-Revalidate strategy for same-origin static assets and Network-First navigation fallback to cached `/index.html`, guaranteeing offline constituent access without Supabase or internet connectivity.
  - [x] Registered Service Worker cleanly on `window.load` in `src/main.tsx` with environment and capability checks.
- [x] **48.2 View Transitions API & Smooth Page Morphing (`src/index.css`, `Header.tsx`, `MobileNav.tsx`)**:
  - [x] Added `viewTransition` prop to React Router v6 `<NavLink>` and `<Link>` controls in `Header.tsx` and `MobileNav.tsx`.
  - [x] Customized `::view-transition-old(root)` and `::view-transition-new(root)` in `src/index.css` with 200ms cubic-bezier transitions.
  - [x] Guarded view transitions with `@media (prefers-reduced-motion: reduce)` to disable transitions when reduced motion is preferred.
- [x] **48.3 System Dark Mode Synchronization (`src/styles/m3/dark-theme.css`)**:
  - [x] Configured `@media (prefers-color-scheme: dark)` rule applying dark surface tokens to `:root:not([data-theme="light"])`, enabling automatic device dark mode sync while preserving manual light mode overrides.
- [x] **48.4 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1981 modules transformed in 5.67s).

---

### Phase 49: UI/UX Modernization & Constituent Utility Upgrades
- [x] **49.1 Unified Global Toast Notification System (`ToastContext.tsx`, `App.tsx`)**:
  - [x] Built accessible, non-intrusive Toast container in top layer (`role="status"`, `aria-live="polite"`).
  - [x] Implemented auto-dismiss with animated progress countdown strip and tactile mobile haptic dispatch.
  - [x] Integrated `showToast` across Action Center (ticket filing & code copies), Hotlines modal, Directory (dialing copies), and News portal (bulletin links).
- [x] **49.2 Mobile Haptic Feedback Engine (`haptics.ts`, `StickyHotlineBar.tsx`, `HotlineModal.tsx`)**:
  - [x] Created `src/lib/haptics.ts` supporting `light` (10ms), `success`, and `emergency` ([20ms, 60ms, 30ms, 60ms, 20ms]) vibration pulses.
  - [x] Connected haptic pulses to PTV 24/7 emergency dispatch, quick jump pills, and copy actions.
- [x] **49.3 Scroll-Driven Reading Progress Indicator (`ScrollProgressBar.tsx`, `src/index.css`, `PublicLayout.tsx`)**:
  - [x] Created `ScrollProgressBar.tsx` mounted at the top of `PublicLayout.tsx`.
  - [x] Implemented zero-JS native CSS scroll-timeline with `@supports (animation-timeline: scroll())` scaling from 0 to 1 across the viewport, paired with a lightweight fallback listener and `@media (prefers-reduced-motion: reduce)` override.
- [x] **49.4 Floating Back-to-Top Action Pill (`BackToTop.tsx`, `PublicLayout.tsx`)**:
  - [x] Authored `BackToTop.tsx` with smooth threshold reveal (> 400px), Sinoog pill geometry, and safe-area positioning above the mobile bottom hotline bar.
  - [x] Added smooth scroll-to-top with tactile haptic confirmation.
- [x] **49.5 Horizontal Scroll Affordance Hints & Edge Mask Fading (`src/index.css`, `NewsPage.tsx`, `DirectoryPage.tsx`)**:
  - [x] Created `.scroll-fade-edges` utility with CSS gradient mask (`mask-image: linear-gradient(to right, transparent, black 20px, ...)`).
  - [x] Applied soft edge fading to horizontal news category pills and 19-town jump lists on mobile viewports.
- [x] **49.6 Form Ergonomics & `:user-invalid` Pseudo-Class (`src/index.css`)**:
  - [x] Configured modern `:user-invalid` styles for inputs and textareas so error borders only appear after user interaction and blur.
- [x] **49.7 Official Printable Constituent Endorsement Slip (`ActionCenterPage.tsx`, `src/index.css`)**:
  - [x] Added "Print Official Slip / I-print ang Resibo" button to ticket submission modal and live tracking card.
  - [x] Designed `@media print` layout rendering a high-contrast House of Representatives endorsement slip with official seal, tracking reference code, beneficiary details, MSWDO instructions, emergency hotlines, and case worker signature block.
- [x] **49.8 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1985 modules transformed in 11.29s).

---

### Phase 50: Layout, UI/UX Design System, Typography & Spacing Finalization
- [x] **50.1 Mobile Safe-Area Bottom Spacing Harmonization (`HomePage.tsx`, `ProgramsPage.tsx`, `ImpactPage.tsx`)**:
  - [x] Upgraded bottom padding from `pb-16` to unified `pb-32 sm:pb-36` across all remaining public pages, ensuring 100% collision-free thumb reach and clearance above the mobile fixed bottom `StickyHotlineBar.tsx`.
- [x] **50.2 Typographic Rhythm & `text-balance` Anti-Widow Wrapping (`HomePage.tsx`, `ProgramsPage.tsx`, `ImpactPage.tsx`)**:
  - [x] Applied CSS `text-balance` (`text-wrap: balance`) to all primary `h1` and `h2` headings across hero and flagship sections, preventing orphaned words on mobile viewports.
- [x] **50.3 Mobile Navigation Drawer Scroll Containment & Home Bar Padding (`MobileNav.tsx`)**:
  - [x] Added `overscroll-contain` to the sliding drawer viewport to prevent unwanted background scroll-chaining on iOS Safari and mobile Chrome.
  - [x] Added `pb-8 sm:pb-6` bottom padding and updated drawer emergency call/action buttons to full pill geometry (`rounded-full min-h-[44px]`).
- [x] **50.4 Form Control Ergonomics & Pill Curvature Consistency (`ActionCenterPage.tsx`, `AdminLoginPage.tsx`, `AdminSubmissionsPage.tsx`)**:
  - [x] Upgraded form inputs, selects, and textareas to `rounded-2xl min-h-[44px]` with warm border highlights (`border-orange-200/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`), matching Sinoog 2027 Material Design 3 tokens.
- [x] **50.5 TypeScript 6.0+ `baseUrl` Deprecation Migration (`tsconfig.json`)**:
  - [x] Migrated `tsconfig.json` to modern TypeScript module resolution standards by removing the deprecated `"baseUrl": "."` compiler option.
  - [x] Rewrote path aliases to root-relative syntax (`"@/*": ["./src/*"]`), future-proofing the build against TypeScript 7.0 breaking changes.
- [x] **50.6 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1985 modules transformed in 7.97s).

---

### Phase 51: Mobile Navigation Sidebar & Route Transition Fix
- [x] **51.1 Elimination of React.lazy / View Transition Deadlock (`MobileNav.tsx`, `Header.tsx`)**:
  - [x] Removed experimental `viewTransition` prop from all `<NavLink>` and `<Link>` components in both `MobileNav.tsx` and `Header.tsx`.
  - [x] Resolved fatal `flushSync` conflict in React 18 where `document.startViewTransition` with lazy-loaded Suspense routes caused uncaught rendering errors, blank screens, and frozen click handlers.
- [x] **51.2 Mobile Drawer Z-Index & Event Isolation (`MobileNav.tsx`)**:
  - [x] Separated backdrop (`z-[60]`) and drawer (`z-[70]`) z-indexes to guarantee drawer and its close button are strictly above the backdrop overlay.
  - [x] Added `e.stopPropagation()` and `e.preventDefault()` on the close button (`X`) and backdrop click handlers to ensure immediate, deterministic closing.
  - [x] Ensured each navigation link closes the drawer and displays the target page seamlessly.
- [x] **51.3 Public & Admin Layout Lifecycle Hardening (`PublicLayout.tsx`, `AdminLayout.tsx`, `AdminSidebar.tsx`)**:
  - [x] Memoized drawer open/close callbacks in `PublicLayout.tsx` using `useCallback` to prevent spurious effect executions.
  - [x] Added mobile sidebar close button (`X`) to `AdminSidebar.tsx` and wired `useEffect([location.pathname])` in `AdminLayout.tsx` to automatically close admin drawer upon route change.
- [x] **51.4 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1985 modules transformed in 7.18s).

---

### Phase 52: Fail-Safe CSS Mobile Navigation Drawer & Dev Service Worker Stale-Cache Elimination
- [x] **52.1 Replaced Framer Motion AnimatePresence with Pure CSS Transitions (`MobileNav.tsx`)**:
  - [x] Replaced JS-managed `<AnimatePresence>` with deterministic CSS classes (`isOpen ? 'visible' : 'invisible pointer-events-none'`, `translate-x-0` vs `translate-x-full`).
  - [x] Eliminated Framer Motion unmount race condition where route changes and Suspense updates cancelled `onAnimationComplete`, leaving the drawer frozen on screen.
  - [x] When any `<NavLink>` or action button is selected, `handleClose()` releases the body scroll lock immediately and the drawer slides off-screen (`translate-x-full`) while the target route renders instantly.
  - [x] When the `X` close button, the backdrop, or the `Escape` key is triggered without selecting a menu item, `handleClose()` immediately slides the drawer away and restores interaction.
- [x] **52.2 Service Worker Stale-Cache Prevention (`main.tsx`, `public/sw.js`)**:
  - [x] Updated `src/main.tsx` to only register Service Worker in production (`import.meta.env.PROD`), automatically unregistering any active service workers in dev mode to eliminate stale module caching.
  - [x] Incremented `CACHE_NAME` in `public/sw.js` to `ekumbati-cache-v2` with `reg.update()`.
- [x] **52.3 Verification & Production Build**:
  - [x] Verified `npm run build` succeeds with exit code 0 (1985 modules transformed in 6.61s).

---

### Phase 53: Resolution of Mobile Hamburger Premature Auto-Close & Interactive Verification
- [x] **53.1 Eliminated Premature Auto-Close Race in Mobile Navigation Drawer (`MobileNav.tsx`)**:
  - [x] Identified and fixed root cause: `useEffect` had `isOpen` in its dependency array with `if (isOpen) handleClose()`. When the hamburger button opened the drawer (`isOpen = true`), the effect fired immediately on the exact same render tick and invoked `handleClose()`, snapping the drawer shut instantaneously.
  - [x] Replaced with guarded route ref `prevPathnameRef = useRef(location.pathname)`. Now, opening the drawer never triggers `handleClose()`. The effect only closes the drawer when the URL `location.pathname` genuinely changes.
  - [x] Added `onClick={(e) => e.stopPropagation()}` on the `<aside>` drawer container to ensure total event isolation between drawer contents and the backdrop overlay.
- [x] **53.2 Hardened Hamburger Button Event Trigger (`Header.tsx`)**:
  - [x] Added explicit `type="button"` and `e.stopPropagation()` to the mobile hamburger toggle button in `Header.tsx`, preventing touch/click bubbling interference.
- [x] **53.3 Automated Lifecycle & Interaction Verification Suite (`verify_lifecycle.mjs`)**:
  - [x] Created and executed a 20-scenario automated test suite verifying:
    - Initial state: drawer closed.
    - Hamburger button click: drawer opens and reliably STAYS OPEN without premature closing.
    - Menu item selection (e.g. `/about`): drawer closes immediately and target page renders.
    - Re-open on new page: drawer stays open.
    - Close button (`X`): clicking `X` immediately closes the drawer and releases body scroll lock.
    - Backdrop click: clicking backdrop overlay closes the drawer.
    - Browser back/forward navigation: drawer safely closes.
    - All 20 lifecycle and interaction test assertions passed with 100% success rate.
- [x] **53.4 Production Build Verification**:
  - [x] Executed `npm run build` with exit code 0 (1985 modules transformed in 7.85s).

---

### Phase 54: React Router v7 Future Flags Adoption (`App.tsx`)
- [x] **54.1 Configured `v7_startTransition` Future Flag**:
  - [x] Opted in early to React Router v7 state transition semantics by adding `future={{ v7_startTransition: true }}` to `<BrowserRouter>`. Enables React 18 concurrent startTransition wrapping for route transitions and eliminates the console warning.
- [x] **54.2 Configured `v7_relativeSplatPath` Future Flag**:
  - [x] Opted in early to React Router v7 relative route resolution within splat (`*`) routes with `future={{ v7_relativeSplatPath: true }}` on `<BrowserRouter>`, eliminating the deprecation warning.
- [x] **54.3 Verification & Production Build**:
  - [x] Executed `npm run build` with exit code 0 (1985 modules transformed in 8.68s).

---

### Phase 55: Accessibility & WAI-ARIA `inert` Migration for Mobile Drawer (`MobileNav.tsx`, `vite-env.d.ts`)
- [x] **55.1 Replaced `aria-hidden` with Standard HTML `inert` Attribute (`MobileNav.tsx`)**:
  - [x] Replaced `aria-hidden={!isOpen}` with `inert={!isOpen ? '' : undefined}` on the mobile navigation drawer wrapper. Passing empty string `''` aligns with React 18's string attribute expectation for `inert`, completely eliminating the React DevTools console warning (`Warning: Received true for a non-boolean attribute inert`).
  - [x] Augmented React 18 `HTMLAttributes` in `src/vite-env.d.ts` with `inert?: string | boolean` for strict TypeScript type-checking.
- [x] **55.2 Active Element Blur on Close (`MobileNav.tsx`)**:
  - [x] In `handleClose()`, added explicit `document.activeElement.blur()` check to safely release focus from clicked `<a>` links and `<button>` elements back to `document.body` upon closing.
- [x] **55.3 Verification & Production Build**:
  - [x] Executed `npm run build` with exit code 0 (1985 modules transformed in 6.37s).




