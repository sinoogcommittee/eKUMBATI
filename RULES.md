# Development Rules & Coding Standards
## e-KUMBATI: Official Web Portal & Digital Action Center

---

## 1. Zero-Placeholder Policy
- **No Mock Stubs / No TODOs**: Every single component, page, service, and hook must be fully implemented, syntactically valid, and ready to render in production.
- **No Half-Baked Types**: Every variable, prop, and database payload must have explicit TypeScript typing. Never use `any` unless explicitly wrapping an untyped 3rd-party library callback.
- **Fallback Guarantee**: Always fall back to `src/lib/constants.ts` if Supabase environment variables are missing, connection times out, or query returns an empty collection. The application must NEVER crash or show an empty blank screen due to missing remote data.

---

## 2. Code Quality & TypeScript Standards
- **Strict Typing**: All components use typed functional components with destructured props.
- **Named Exports for Utilities, Default/Named for Components**: Pages should export named or default clean component signatures suitable for React Router v6.
- **Defensive Data Handling**:
  - Null check all nested data (`item?.property ?? fallback`).
  - Dates must be formatted safely with `Intl.DateTimeFormat` or clean localized strings.
  - Alphanumeric tracking codes must follow the validated regex pattern: `^KMB-[0-9]{4}-[A-Z0-9]{5}$`.

---

## 3. Bilingual Support Rules
- Every user-facing string must be delivered through the `useLanguage()` hook using `t(englishString, cebuanoString)` or through bilingual entity fields (`entity.title_en` / `entity.title_ceb`).
- When adding new content, ensure the Binisaya translation accurately reflects the warm, dignified, and community-centric dialect spoken in Bohol.
- Language selector must be prominently accessible in both desktop header and mobile drawer navigation.

---

## 4. UI & Tailwind CSS Standards
- **Strict Brand Palette**:
  - Primary Orange: `#F97316` (`bg-orange-500`, `text-orange-500`, `border-orange-500`)
  - Accent Red-Orange: `#EA580C` (`bg-orange-600`) / `#DC2626` (`bg-red-600`)
  - Warm Ivory Surface: `#FFFDF9` (`bg-amber-50/20` or `#FFFDF9`)
  - Dark Slate: `#0F172A` (`text-slate-900`, `bg-slate-900`)
- **Card Styling**: Consistent `rounded-2xl`, subtle shadow `shadow-sm hover:shadow-md transition-all duration-300`, and clean borders `border border-slate-100`.
- **Stat Counters**: High-contrast, bold numeric displays (`text-4xl md:text-5xl font-black text-orange-600`).
- **Mobile First**: All layouts must be verified for 360px+ screens. Critical emergency buttons (PTV Hotline, Action Center) must remain within thumb-reach via a sticky mobile bar.

---

## 5. Media & Asset Rules
- All user-uploaded images must pass through `browser-image-compression` to convert to modern `.webp` format at high compression efficiency before being transmitted to Supabase storage.
- All default image URLs in seed data must point to reliable, high-resolution Unsplash images or local SVG illustrations with valid semantic `alt` attributes.

---

## 6. Process & Project State Maintenance
- Every phase completion must immediately trigger updates in:
  1. `TASKS.md`: Check off completed deliverables and mark current active step.
  2. `MEMORY.md`: Log key decisions, completed files, and state synchronization.
