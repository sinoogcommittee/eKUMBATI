# Design System & Brand Identity
## e-KUMBATI Web Portal
### Brand Manifesto & Aesthetic Guide | 3rd District of Bohol

---

## 1. Brand Philosophy: "KUMBATI"
"**KUMBATI**" is the rallying cry of Congresswoman Alexie Besas Tutor and the people of Bohol's 3rd District. It symbolizes energetic resilience, dedicated public service, compassion for the marginalized, and relentless progress.

The design identity balances **government authority and trustworthiness** with **warm, accessible, grassroots friendliness**. It is vibrant, optimistic, modern, and built to ensure every Boholano constituent feels dignity and direct access to their representative.

---

## 2. Color Palette & Design Tokens

### 2.1 Primary Brand Colors
| Role | Color Name | Hex Code | Tailwind Equivalent | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Base** | KUMBATI Vibrant Orange | `#F97316` | `orange-500` | Main buttons, active tabs, metric badges, brand accents |
| **Primary Deep** | Sunset Flame / Red-Orange | `#EA580C` | `orange-600` | Hover states, hero gradient accents, primary borders |
| **Emergency / Vital** | KUMBATI Alert Red | `#DC2626` | `red-600` | PTV 24/7 hotline, emergency ambulances, urgent notices |
| **Background Surface** | Warm Bohol Ivory | `#FFFDF9` | `amber-50/20` | Default body and card background, softer on eyes than stark white |
| **Neutral Dark** | Deep Slate | `#0F172A` | `slate-900` | Headings, primary text, high-contrast dark footer and admin bars |
| **Neutral Subdued** | Slate Gray | `#64748B` | `slate-500` | Secondary descriptions, timestamps, helper labels |
| **Card Border** | Soft Slate Border | `#F1F5F9` | `slate-100` | Card borders, subtle divider lines |
| **Success Green** | Livelihood Emerald | `#10B981` | `emerald-500` | Resolved ticket badge, active clinics, verified status |

---

## 3. Typography System
The typography hierarchy emphasizes legibility across low-cost mobile displays and older users.

- **Primary Heading Font**: Modern Geometric Sans (`Plus Jakarta Sans`, `Outfit`, or `Inter`, system sans fallback).
- **Body Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif.
- **Numbers / Metrics**: Ultra-bold tabular figures (`font-black tracking-tight`).

### Typographic Scale
- **Hero Title**: `text-4xl md:text-6xl font-extrabold tracking-tight`
- **Section Heading**: `text-2xl md:text-4xl font-bold text-slate-900`
- **Sub-heading / Tagline**: `text-lg md:text-xl text-slate-600 font-medium`
- **Metric Counter**: `text-4xl md:text-6xl font-black text-orange-600`
- **Card Title**: `text-xl font-bold text-slate-900`
- **Body Text**: `text-base text-slate-700 leading-relaxed`
- **Caption / Meta**: `text-xs md:text-sm text-slate-500`

---

## 4. UI Component Anatomy

### 4.1 Impact Metric Counters
- High-contrast card with subtle warm gradient background (`bg-gradient-to-br from-orange-50/60 to-white`).
- Large bold number displayed at top, followed by title in English and Binisaya, and descriptive contextual milestone.
- Smooth number count-up animation powered by Framer Motion.

### 4.2 Rounded-2xl Cards
- Uniform border radius `rounded-2xl`.
- Subtle natural shadow `shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`.
- Clean 1px border `border border-orange-100/70`.

### 4.3 Sticky Mobile Hotline Bar
- Fixed to bottom of screen on viewports `< 768px`.
- High-contrast orange/red action pill with quick one-tap calling buttons:
  - **PTV Dispatch**: Call `0917-XXX-PTV4`
  - **Action Center**: Direct link to `/action-center`
  - **Clinic Info**: Quick modal with emergency health guidance

### 4.4 Action Center Form & Reference Code Card
- Two-column responsive layout: submission form on the left, "Track Existing Ticket" on the right.
- Successful submission reveals a copyable Reference Card styled like an official government slip with watermark and QR-code graphic.

---

## 5. Responsive Layout Breakpoints
- **Mobile (`< 640px`)**: Single column layout, hamburger navigation, sticky bottom hotline bar, full-width touch-friendly buttons (`min-h-[44px]`).
- **Tablet (`640px - 1024px`)**: 2-column grid for cards and metrics, drawer navigation.
- **Desktop (`> 1024px`)**: 3 or 4-column grids, fixed top navigation bar with bilingual switch, persistent breadcrumbs in admin panels.
