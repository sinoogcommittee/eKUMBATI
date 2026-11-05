/**
 * e-KUMBATI TypeScript Type Definitions
 * 3rd Congressional District of Bohol | Office of Congresswoman Alexie Besas Tutor
 */

export type Language = 'en' | 'ceb';

export type SubmissionType = 'assistance' | 'query' | 'complaint' | 'suggestion';

export type SubmissionStatus = 'pending' | 'in_review' | 'action_taken' | 'resolved' | 'closed';

export type ProgramCategory = 
  | 'Health' 
  | 'Housing' 
  | 'Education' 
  | 'Livelihood' 
  | 'Community' 
  | 'Infrastructure'
  | 'Social Services';

export type LocationCategory = 
  | 'office' 
  | 'clinic' 
  | 'ptv_hub' 
  | 'tambayan' 
  | 'pabahay_site' 
  | 'municipal_hall';

export type BoholDistrict3Town =
  | 'Alicia'
  | 'Anda'
  | 'Batuan'
  | 'Bilar'
  | 'Candijay'
  | 'Carmen'
  | 'Dimiao'
  | 'Duero'
  | 'Garcia Hernandez'
  | 'Guindulman'
  | 'Jagna'
  | 'Lila'
  | 'Loay'
  | 'Loboc'
  | 'Mabini'
  | 'Pilar'
  | 'Sevilla'
  | 'Sierra Bullones'
  | 'Valencia';

// ============================================================================
// 1. SITE SETTINGS
// ============================================================================
export interface SiteSettings {
  id: string;
  congresswoman_name: string;
  district_title_en: string;
  district_title_ceb: string;
  hero_headline_en: string;
  hero_headline_ceb: string;
  hero_subtext_en: string;
  hero_subtext_ceb: string;
  bio_summary_en: string;
  bio_summary_ceb: string;
  official_email: string;
  main_office_address: string;
  main_office_phone: string;
  facebook_page_official?: string;
  facebook_page_alexie_besas_tutor: string;
  facebook_page_alexie_b_tutor?: string;
  facebook_page_team_kumbati?: string;
  facebook_page_ptv_official?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 2. IMPACT METRIC
// ============================================================================
export interface ImpactMetric {
  id: string;
  metric_key: string;
  title_en: string;
  title_ceb: string;
  value_numeric: number;
  suffix: string; // e.g. '+'
  display_order: number;
  category: string;
  description_en: string;
  description_ceb: string;
  icon_name: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 3. PROGRAM & ADVOCACY
// ============================================================================
export interface ProgramAdvocacy {
  id: string;
  slug: string;
  title_en: string;
  title_ceb: string;
  category: ProgramCategory;
  summary_en: string;
  summary_ceb: string;
  full_description_en: string;
  full_description_ceb: string;
  requirements_en: string[];
  requirements_ceb: string[];
  cover_image_url: string;
  icon_name: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 4. GALLERY ALBUM
// ============================================================================
export interface GalleryAlbum {
  id: string;
  title_en: string;
  title_ceb: string;
  description_en?: string;
  description_ceb?: string;
  cover_image_url: string;
  category: string;
  municipality?: string | null;
  event_date: string;
  display_order: number;
  media_count?: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 5. GALLERY MEDIA ITEM
// ============================================================================
export interface GalleryMedia {
  id: string;
  album_id: string;
  media_url: string;
  thumbnail_url?: string;
  media_type: 'image' | 'video';
  caption_en?: string;
  caption_ceb?: string;
  tags?: string[];
  display_order: number;
  created_at?: string;
}

// ============================================================================
// 6. CONSTITUENT SUBMISSION (ACTION CENTER TICKET)
// ============================================================================
export interface ConstituentSubmission {
  id: string;
  reference_code: string; // KMB-YYYY-XXXXX
  type: SubmissionType;
  status: SubmissionStatus;
  full_name: string;
  contact_number: string;
  email?: string;
  municipality: string;
  barangay: string;
  subject: string;
  message: string;
  program_category?: string;
  attachment_urls?: string[];
  admin_notes?: string;
  resolved_at?: string | null;
  created_at: string;
  updated_at?: string;
}

// ============================================================================
// 7. HOTLINE ENTRY
// ============================================================================
export interface HotlineEntry {
  id: string;
  municipality: string; // One of the 19 towns or 'District-wide'
  office_name_en: string;
  office_name_ceb: string;
  contact_person?: string;
  phone_numbers: string[];
  email?: string;
  is_emergency: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 8. MAP LOCATION (DISTRICT GEOSPATIAL PIN)
// ============================================================================
export interface MapLocation {
  id: string;
  title_en: string;
  title_ceb: string;
  category: LocationCategory;
  municipality: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  operating_hours?: string;
  description_en?: string;
  description_ceb?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// 9. NEWS & PUBLIC ANNOUNCEMENT
// ============================================================================
export type AnnouncementCategory =
  | 'advisory'
  | 'payout_schedule'
  | 'medical_mission'
  | 'legislative'
  | 'disaster_alert'
  | 'general';

export type AnnouncementPriority = 'urgent' | 'important' | 'normal';

export interface NewsAnnouncement {
  id: string;
  title_en: string;
  title_ceb: string;
  excerpt_en: string;
  excerpt_ceb: string;
  content_en: string;
  content_ceb: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  author: string;
  publish_date: string;
  image_url?: string;
  attachment_url?: string;
  is_pinned: boolean;
  is_published: boolean;
  target_towns?: string[];
  created_at?: string;
  updated_at?: string;
}


// ============================================================================
// 10. LEGISLATIVE MEASURE & COMMITTEE APPOINTMENT
// ============================================================================
export interface OfficialLegislativeMeasure {
  measureId: string;
  displayId: string;
  type: 'bill' | 'resolution';
  titleEn: string;
  titleCeb: string;
  rawTitle: string;
  dateFiled: string;
  significance: 'National' | 'Local' | string;
  principalAuthors: string;
  referral: string;
  status: string;
  category: string;
  categoryLabelEn: string;
  categoryLabelCeb: string;
  isPrincipal: boolean;
}

export interface OfficialCommitteeAppointment {
  id: string;
  committeeEn: string;
  committeeCeb: string;
  positionEn: string;
  positionCeb: string;
  journalNo: string;
  isLeadership: boolean;
  iconName: 'Landmark' | 'Scale' | 'Globe' | 'Building2';
  descriptionEn: string;
  descriptionCeb: string;
  keyFunctions: string[];
}
