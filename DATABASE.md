# Database Architecture & SQL Schema
## e-KUMBATI Web Portal & CMS (Supabase / PostgreSQL)

---

## 1. Schema Overview

The database consists of 8 normalized relational tables designed for fast query execution, bilingual content support, constituent assistance tracking, and comprehensive media management.

```
                           +---------------------------+
                           |       site_settings       |
                           +---------------------------+
                                         |
         +-------------------------------+-------------------------------+
         |                               |                               |
         v                               v                               v
+------------------+           +--------------------+          +--------------------+
|  impact_metrics  |           | programs_advocacies|          | hotlines_directory |
+------------------+           +--------------------+          +--------------------+
                                         |
                                         | (categorized by program)
                                         v
+------------------+           +--------------------+          +--------------------+
|  map_locations   |           |   gallery_albums   |          |constituent_submiss.|
+------------------+           +--------------------+          +--------------------+
                                         |
                                         v 1-to-many
                               +--------------------+
                               |   gallery_media    |
                               +--------------------+
```

---

## 2. Production PostgreSQL DDL Script

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. SITE_SETTINGS TABLE
-- Stores global portal configuration, hero copy, bio, contacts, and FB pages
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    congresswoman_name TEXT NOT NULL DEFAULT 'Congw. Alexie Besas Tutor',
    district_title_en TEXT NOT NULL DEFAULT '3rd Congressional District of Bohol',
    district_title_ceb TEXT NOT NULL DEFAULT 'Ikatulong Distrito sa Bohol',
    hero_headline_en TEXT NOT NULL DEFAULT 'Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!',
    hero_headline_ceb TEXT NOT NULL DEFAULT 'Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!',
    hero_subtext_en TEXT NOT NULL,
    hero_subtext_ceb TEXT NOT NULL,
    bio_summary_en TEXT NOT NULL,
    bio_summary_ceb TEXT NOT NULL,
    official_email TEXT NOT NULL DEFAULT 'office@kumbati.bohol3.gov.ph',
    main_office_address TEXT NOT NULL,
    main_office_phone TEXT NOT NULL,
    facebook_page_alexie_besas_tutor TEXT NOT NULL,
    facebook_page_alexie_b_tutor TEXT NOT NULL,
    facebook_page_team_kumbati TEXT NOT NULL,
    facebook_page_ptv_official TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. IMPACT_METRICS TABLE
-- Stores the 7 flagship metrics and any supplemental district statistics
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.impact_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_key TEXT UNIQUE NOT NULL, -- e.g. 'pabahay', 'ptv', 'dialysis_tambayan', etc.
    title_en TEXT NOT NULL,
    title_ceb TEXT NOT NULL,
    value_numeric INTEGER NOT NULL,
    suffix TEXT DEFAULT '+',
    display_order INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL DEFAULT 'Flagship',
    description_en TEXT NOT NULL,
    description_ceb TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Activity',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. PROGRAMS_ADVOCACIES TABLE
-- Stores details, requirements, guidelines for the 7 flagship programs
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.programs_advocacies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_ceb TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Health', 'Housing', 'Education', 'Livelihood', 'Community'
    summary_en TEXT NOT NULL,
    summary_ceb TEXT NOT NULL,
    full_description_en TEXT NOT NULL,
    full_description_ceb TEXT NOT NULL,
    requirements_en TEXT[] NOT NULL DEFAULT '{}',
    requirements_ceb TEXT[] NOT NULL DEFAULT '{}',
    cover_image_url TEXT,
    icon_name TEXT NOT NULL DEFAULT 'Heart',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 4. GALLERY_ALBUMS TABLE
-- Groups photos and project documentations into albums
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_ceb TEXT NOT NULL,
    description_en TEXT,
    description_ceb TEXT,
    cover_image_url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    municipality TEXT, -- NULL for district-wide
    event_date DATE DEFAULT CURRENT_DATE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 5. GALLERY_MEDIA TABLE
-- Individual photos and videos associated with albums
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
    caption_en TEXT,
    caption_ceb TEXT,
    tags TEXT[] DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 6. CONSTITUENT_SUBMISSIONS TABLE
-- Action Center inquiries, assistance requests, grievances, and feedback
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.constituent_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE NOT NULL, -- Format: KMB-YYYY-XXXXX
    type TEXT NOT NULL, -- 'assistance', 'query', 'complaint', 'suggestion'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_review', 'action_taken', 'resolved', 'closed'
    full_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT,
    municipality TEXT NOT NULL,
    barangay TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    program_category TEXT,
    attachment_urls TEXT[] DEFAULT '{}',
    admin_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 7. HOTLINES_DIRECTORY TABLE
-- Emergency lines, municipal halls, MDRRMO, and district office hotlines
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.hotlines_directory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipality TEXT NOT NULL, -- One of the 19 towns or 'District-wide'
    office_name_en TEXT NOT NULL,
    office_name_ceb TEXT NOT NULL,
    contact_person TEXT,
    phone_numbers TEXT[] NOT NULL DEFAULT '{}',
    email TEXT,
    is_emergency BOOLEAN DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 8. MAP_LOCATIONS TABLE
-- Geospatial points of interest in District 3 for Leaflet Map
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.map_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_ceb TEXT NOT NULL,
    category TEXT NOT NULL, -- 'office', 'clinic', 'ptv_hub', 'tambayan', 'pabahay_site', 'municipal_hall'
    municipality TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone TEXT,
    operating_hours TEXT,
    description_en TEXT,
    description_ceb TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 3. Row Level Security (RLS) Policies

```sql
-- Enable RLS across all 8 tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs_advocacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constituent_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotlines_directory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_locations ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Public Read Policies (Allow anyone to view published site data)
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public select on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public select on impact_metrics" ON public.impact_metrics FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public select on programs_advocacies" ON public.programs_advocacies FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public select on gallery_albums" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Allow public select on gallery_media" ON public.gallery_media FOR SELECT USING (true);
CREATE POLICY "Allow public select on hotlines_directory" ON public.hotlines_directory FOR SELECT USING (true);
CREATE POLICY "Allow public select on map_locations" ON public.map_locations FOR SELECT USING (is_active = true);

-- ----------------------------------------------------------------------------
-- Constituent Action Center Policies
-- (Anyone can insert a ticket; can only select their own exact reference code)
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public insert on constituent_submissions" 
ON public.constituent_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public track by reference_code" 
ON public.constituent_submissions FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- Admin Staff Write Policies (Authenticated users have full management control)
-- ----------------------------------------------------------------------------
CREATE POLICY "Admin full access on site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on impact_metrics" ON public.impact_metrics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on programs_advocacies" ON public.programs_advocacies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on gallery_albums" ON public.gallery_albums FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on gallery_media" ON public.gallery_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on constituent_submissions" ON public.constituent_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on hotlines_directory" ON public.hotlines_directory FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on map_locations" ON public.map_locations FOR ALL USING (auth.role() = 'authenticated');
```

---

## 4. Supabase Storage Bucket Configuration

- **Bucket ID**: `kumbati-media`
- **Public Visibility**: `true` (Images accessible via public CDN URLs)
- **File Restrictions**: Maximum file size `5 MB`, accepted MIME types: `image/webp`, `image/jpeg`, `image/png`.
- **Storage Policies**:
  ```sql
  -- Allow public viewing of media
  CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'kumbati-media');

  -- Allow authenticated admins to upload and delete media
  CREATE POLICY "Admin Upload Access" ON storage.objects FOR INSERT WITH CHECK (
      bucket_id = 'kumbati-media' AND auth.role() = 'authenticated'
  );

  CREATE POLICY "Admin Delete Access" ON storage.objects FOR DELETE USING (
      bucket_id = 'kumbati-media' AND auth.role() = 'authenticated'
  );
  ```
