# Project Requirements Document (PRD)
## e-KUMBATI: Official Web Portal & Digital Action Center
### 3rd Congressional District of Bohol | Office of Congresswoman Alexie Besas Tutor

---

## 1. Executive Summary
**e-KUMBATI** is the official bilingual (English and Cebuano / Binisaya) constituent web portal and administrative management platform for the 3rd Congressional District of Bohol, represented by Congresswoman Alexie Besas Tutor. The platform serves as a modern, high-transparency bridge connecting constituents across all 19 municipalities to legislative initiatives, community development programs, emergency health services, educational scholarships, and a direct digital constituent grievance and query desk ("Action Center").

The portal is designed with a hybrid resilient architecture: it operates dynamically connected to a Supabase backend and media storage, while seamlessly and gracefully falling back to a pre-packaged offline-first data layer (`src/lib/constants.ts`) whenever backend services or environment variables are not yet provisioned.

---

## 2. Core Objectives
1. **Promote Radical Governance Transparency**: Showcase verified, auditable legislative milestones and direct district investments, prominently highlighting the 7 flagship 2027 KUMBATI impact metrics.
2. **Empower Constituents with Direct Access**: Provide clear, bilingual step-by-step application procedures, requirements lists, and contact hotlines for all flagship programs (Pabahay, PTV, Dialysis Tambayan, Clinic, Scholars, Livelihood, Community Outreach).
3. **Streamline Grievance & Assistance Routing (Action Center)**: Allow any constituent to file an inquiry, assistance request, complaint, or commendation with instant generation of an alphanumeric Reference Tracking Code (e.g., `KMB-2027-XXXXX`).
4. **District-wide Geospatial Directory**: Provide an interactive Leaflet map and searchable municipal directory covering all 19 municipalities in Bohol District 3, pinpointing municipal halls, district satellite offices, rural health units, Kumbati clinics, and PTV hubs.
5. **Dynamic Administrative Governance (Supabase CMS)**: Empower congressional staff to update metrics, announce programs, upload photo albums, review constituent submissions, and manage emergency hotlines without engineering intervention.

---

## 3. The 7 Flagship 2027 KUMBATI Impact Metrics
The portal prominently showcases the official 2027 verified figures:
1. **Pabahay ni Kumbati**: **310+** Safe & Resilient Housing Beneficiaries.
2. **Patient Transport Vehicles (PTV)**: **4** Dedicated Emergency Medical & Referral Vehicles in 24/7 service (6,200+ indigent patient transports completed).
3. **Tambayan ni Kumbati for Dialysis Patients**: **1** Free Patient & Watcher Haven in Tagbilaran City offering free lodging, meals, and rest for dialysis patients.
4. **KUMBATI Community Beneficiaries**: **36+** Communities empowered through rural electrification, water systems, and communal infrastructure.
5. **Kumbati Medical Clinic**: **3,200+** Patients provided with free consultations, diagnostics, and essential prescription medicines.
6. **Sustainable Livelihood Program**: **88+** People's organizations, farmer cooperatives, and women's micro-enterprises funded and mobilized.
7. **CHED-TDP & District Scholars**: **4,500+** Tertiary students supported through Tulong Dunong Program and congressional educational assistance.

---

## 4. Bohol 3rd Congressional District Coverage (19 Municipalities)
The system models and services all 19 municipalities of the 3rd District:
1. Alicia
2. Anda
3. Batuan
4. Bilar
5. Candijay
6. Carmen (Home of the Chocolate Hills)
7. Dimiao
8. Duero
9. Garcia Hernandez
10. Guindulman
11. Jagna
12. Lila
13. Loay
14. Loboc
15. Mabini
16. Pilar
17. Sevilla
18. Sierra Bullones
19. Valencia

---

## 5. User Roles & Personas

### 5.1 Public Constituent (General Public / Boholano Resident)
- **Profile**: Rural or urban resident of District 3, mobile device user, often accessing via cellular data or municipal Wi-Fi.
- **Needs**: Quick access to program requirements, PTV emergency contact numbers, checking scholarship status, submitting an assistance request, or tracking a submitted ticket using a reference code.
- **Language Preference**: Seamless toggle between Cebuano (Binisaya) and English.

### 5.2 Congressional Staff / Case Worker
- **Profile**: Field or district office personnel managing constituent affairs, clinic queues, and PTV dispatching.
- **Needs**: Fast, responsive portal to verify ticket codes, update assistance request statuses (Pending, In Review, Approved, Dispatched, Resolved), and log case notes.

### 5.3 District Administrator / Communications Officer
- **Profile**: Chief of Staff or Media Administrator managing press releases, impact statistics, and photo documentation.
- **Needs**: Secure Admin CMS to upload compressed event photos into albums, update numerical metrics, publish new advisories, and export directory lists.

---

## 6. Functional Specifications

### 6.1 Bilingual System (English & Cebuano)
- Global reactive language state (`LanguageContext`) persisting user choice in `localStorage`.
- Bi-directional translations for all navigation, headings, form labels, metric labels, program requirements, and feedback messages.

### 6.2 Public Portal Pages
1. **Home (`/`)**: Hero banner with Congw. Alexie Besas Tutor, 7 animated 2027 impact metric counters, quick-action dispatch buttons, featured programs carousel, recent photo highlights, and official Facebook feed links.
2. **About Congw. Alexie & District 3 (`/about`)**: Biography, legislative track record, committee chairmanships/memberships in the 19th Congress, and the KUMBATI manifesto.
3. **Programs & Advocacies (`/programs`)**: Comprehensive tabs for Pabahay, PTV, Dialysis Haven, Clinic, Livelihood, Education, and Infrastructure with downloadable checklists and requirements.
4. **Impact & Metrics (`/impact`)**: Interactive dashboard visualizing district metrics, municipal distribution of projects, and audited progress reports.
5. **Multimedia Gallery (`/gallery`)**: Multi-album photo grid categorized by program and municipal visit, lightbox preview, and high-performance compressed WebP assets.
6. **19-Town Municipal Directory (`/directory`)**: Searchable list and contact cards for every municipality with emergency hotlines, mayors, vice-mayors, and MDRRMO lines.
7. **Interactive District Map (`/map`)**: Full-screen or containerized Leaflet map plotting district offices, PTV dispatch points, clinic facilities, and project locations with custom pins and popups.
8. **Action Center (`/action-center`)**:
   - Submission form for Assistance Request, Query, Complaint, or Commendation.
   - Client-side validation, document upload support, and automatic unique reference code issuance.
   - Status tracker: Input code -> displays live timeline and resolution status.

### 6.3 Admin CMS Pages (`/admin/*`)
1. **Admin Login (`/admin/login`)**: Secure Supabase email/password auth with local demo bypass for staging/offline previews.
2. **Dashboard Overview (`/admin/dashboard`)**: Summary of incoming submissions, quick stats tally, recent ticket activity.
3. **Site Settings Manager (`/admin/settings`)**: Edit hero banner text, bio, official contact info, and the 4 official FB page links.
4. **Impact Metrics Manager (`/admin/metrics`)**: Inline updating and auditing of the 7 core metrics and municipal tallies.
5. **Programs Manager (`/admin/programs`)**: Create, edit, and toggle visibility of district programs and requirement lists.
6. **Gallery & Media Manager (`/admin/gallery`)**: Album creation and drag-and-drop batch image uploader with automatic client-side WebP compression.
7. **Action Center Ticket Manager (`/admin/submissions`)**: Filterable inbox of constituent inquiries, status transitions, and resolution logging.
8. **Hotlines & Locations Manager (`/admin/directory-map`)**: Add and edit municipal hotlines, dispatch numbers, and map pin coordinates.

---

## 7. Non-Functional Requirements
- **Performance**: Initial bundle load < 200ms on broadband, sub-second LCP on 4G cellular networks via Vite chunk splitting and WebP image optimization.
- **Offline & Graceful Degradation**: If Supabase connection fails or credentials are unset, the app automatically switches to read-only mode backed by `constants.ts` with friendly banners.
- **Accessibility**: WCAG 2.1 AA compliance with high-contrast text ratios for KUMBATI brand colors, ARIA attributes on interactive counters and dialogs.
- **Mobile Responsiveness**: 100% optimized for mobile viewport (360px width upwards) featuring a sticky mobile hotline quick-action bar.
- **Security**: Supabase Row-Level Security (RLS) enforcing public read, public submission insert, and authenticated admin-only mutations.
