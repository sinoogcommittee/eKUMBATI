import {
  BoholDistrict3Town,
  SiteSettings,
  ImpactMetric,
  ProgramAdvocacy,
  GalleryAlbum,
  GalleryMedia,
  HotlineEntry,
  MapLocation,
  NewsAnnouncement,
} from '../types/kumbati.types';

// ============================================================================
// 1. THE 19 MUNICIPALITIES OF BOHOL'S 3RD CONGRESSIONAL DISTRICT
// ============================================================================
export const BOHOL_DISTRICT_3_TOWNS: BoholDistrict3Town[] = [
  'Alicia',
  'Anda',
  'Batuan',
  'Bilar',
  'Candijay',
  'Carmen',
  'Dimiao',
  'Duero',
  'Garcia Hernandez',
  'Guindulman',
  'Jagna',
  'Lila',
  'Loay',
  'Loboc',
  'Mabini',
  'Pilar',
  'Sevilla',
  'Sierra Bullones',
  'Valencia',
];

// ============================================================================
// 2. INITIAL SITE SETTINGS
// ============================================================================
export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: 'site-settings-singleton',
  congresswoman_name: 'Congw. Alexie Besas Tutor',
  district_title_en: '3rd Congressional District of Bohol',
  district_title_ceb: 'Ikatulong Kongresyonal nga Distrito sa Bohol',
  hero_headline_en: 'Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!',
  hero_headline_ceb: 'Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!',
  hero_subtext_en:
    'Empowering the 19 municipalities of Bohol District 3 through transparent governance, life-saving patient transport, free clinic consultations, dignified shelter, and transformative education.',
  hero_subtext_ceb:
    'Paghatag og gahum ug pag-alagad sa 19 ka mga lungsod sa Ikatulong Distrito sa Bohol pinaagi sa matinud-anong pagdumala, libreng sakyanan sa pasyente, libreng tambal ug klinika, desenteng pabalay, ug edukasyon para sa tanan.',
  bio_summary_en:
    'Congresswoman Kristine Alexie Besas Tutor is a dedicated legislator, licensed physical therapist, and law graduate serving as the Representative of Bohol\'s 3rd Congressional District in the House of Representatives of the Philippines (18th & 19th Congress). Known passionately as "Congw. Kumbati", she serves as Chairperson of the Committee on Civil Service and Professional Regulation and Vice Chairperson of the Committee on Health, championing rural healthcare access, hospital modernization, civil service worker protections, resilient socialized shelter, cooperative livelihood, and transformative education.',
  bio_summary_ceb:
    'Si Congresswoman Kristine Alexie Besas Tutor usa ka maabtikon nga magbabalaod, lisensyadong physical therapist, ug gradwado sa balaod nga nagserbisyo isip Representante sa Ikatulong Distrito sa Bohol sa Ubos Balay-Balaoranan (Ika-18 ug Ika-19 nga Kongreso). Nailhan sa bansag nga "Congw. Kumbati", siya ang Chairperson sa Committee on Civil Service and Professional Regulation ug Vice Chairperson sa Committee on Health, nga nag-unang nagduso sa libreng serbisyo medikal, pagpalapad sa mga ospital, kasegurohan sa mga kawani sa gobyerno, desenteng pabalay, panginabuhian, ug edukasyon para sa tanan.',
  official_email: 'office@kumbati.bohol3.gov.ph',
  main_office_address: 'District Headquarters, Poblacion, Candijay, Bohol 6312 / House of Representatives, Batasan Complex, Quezon City',
  main_office_phone: '(038) 526-0123 / +63 917 832 6284',
  facebook_page_alexie_besas_tutor: 'https://www.facebook.com/alexiebesastutor',
  facebook_page_alexie_b_tutor: 'https://www.facebook.com/alexie.tutor',
  facebook_page_team_kumbati: 'https://www.facebook.com/teamkumbati',
  facebook_page_ptv_official: 'https://www.facebook.com/AlexieTutorPTV',
};

// ============================================================================
// 3. THE 7 VERIFIED 2027 FLAGSHIP KUMBATI METRICS
// ============================================================================
export const INITIAL_METRICS: ImpactMetric[] = [
  {
    id: 'metric-1-pabahay',
    metric_key: 'pabahay',
    title_en: 'Pabahay ni Kumbati Beneficiaries',
    title_ceb: 'Benepisyaryo sa Pabahay ni Kumbati',
    value_numeric: 310,
    suffix: '+',
    display_order: 1,
    category: 'Housing',
    description_en: 'Families provided with disaster-resilient concrete housing units across the 19 municipalities.',
    description_ceb: 'Mga pamilya nga nakadawat og lig-on ug desenteng kongkreto nga panimalay lukop sa 19 ka lungsod.',
    icon_name: 'Home',
    is_active: true,
  },
  {
    id: 'metric-2-ptv',
    metric_key: 'ptv',
    title_en: 'Patient Transport Vehicles (PTV)',
    title_ceb: 'Patient Transport Vehicles (PTV)',
    value_numeric: 4,
    suffix: '',
    display_order: 2,
    category: 'Health',
    description_en: 'Dedicated 24/7 emergency medical fleet completing over 6,200+ zero-fare transits for indigent and dialysis patients.',
    description_ceb: 'Gipahinungod nga 24/7 sakyanan medikal nga nakakompleto sa kapin 6,200+ ka libreng paghatod sa pasyente sa tambalanan.',
    icon_name: 'Ambulance',
    is_active: true,
  },
  {
    id: 'metric-3-dialysis',
    metric_key: 'dialysis_tambayan',
    title_en: 'Tambayan ni Kumbati for Dialysis Patients',
    title_ceb: 'Tambayan ni Kumbati sa mga Dialysis Patients',
    value_numeric: 1,
    suffix: '',
    display_order: 3,
    category: 'Health',
    description_en: 'Free patient and watcher haven located near major hospitals offering beds, hot meals, and rest.',
    description_ceb: 'Libreng pahuwayan ug kapuy-an sa Tagbilaran City nga may libreng pagkaon alang sa dialysis patients ug ilang bantay.',
    icon_name: 'HeartPulse',
    is_active: true,
  },
  {
    id: 'metric-4-communities',
    metric_key: 'community_beneficiaries',
    title_en: 'KUMBATI Community Beneficiaries',
    title_ceb: 'Benepisyaryong Komunidad sa KUMBATI',
    value_numeric: 36,
    suffix: '+',
    display_order: 4,
    category: 'Community',
    description_en: 'Rural barangays and priority sitios energized with solar electrification, water supply, and multipurpose access.',
    description_ceb: 'Mga hilit nga barangay ug sityo nga natabangan sa kuryente, patubig, ug serbisyo sosyal.',
    icon_name: 'Users',
    is_active: true,
  },
  {
    id: 'metric-5-clinic',
    metric_key: 'kumbati_clinic',
    title_en: 'Kumbati Medical Clinic Patients',
    title_ceb: 'Pasyente sa Kumbati Medical Clinic',
    value_numeric: 3200,
    suffix: '+',
    display_order: 5,
    category: 'Health',
    description_en: 'Free outpatient medical consultations, laboratory vouchers, and maintenance medications dispensed.',
    description_ceb: 'Libreng check-up sa doktor, laboratory voucher, ug libreng tambal nga naapod-apod sa mga katawhan.',
    icon_name: 'Stethoscope',
    is_active: true,
  },
  {
    id: 'metric-6-livelihood',
    metric_key: 'sustainable_livelihood',
    title_en: 'Sustainable Livelihood Beneficiaries',
    title_ceb: 'Asosasyon sa Malungtarong Panginabuhian',
    value_numeric: 88,
    suffix: '+',
    display_order: 6,
    category: 'Livelihood',
    description_en: 'Farmer associations, women cooperatives, and micro-entrepreneurs funded with seed capital and equipment.',
    description_ceb: 'Asosasyon sa mga mag-uuma, kababayen-an, ug gagmayng negosyante nga nahatagan og puhonan ug kagamitan.',
    icon_name: 'Briefcase',
    is_active: true,
  },
  {
    id: 'metric-7-scholars',
    metric_key: 'ched_tdp_scholars',
    title_en: 'CHED-TDP & District Scholars',
    title_ceb: 'Mga Iskolar sa CHED-TDP ug Distrito',
    value_numeric: 4500,
    suffix: '+',
    display_order: 7,
    category: 'Education',
    description_en: 'College and vocational students supported through the Tulong Dunong Program and educational cash assistance.',
    description_ceb: 'Mga estudyante sa kolehiyo nga gipaluyohan pinaagi sa Tulong Dunong Program ug tabang pinansyal sa pag-eskwela.',
    icon_name: 'GraduationCap',
    is_active: true,
  },
];

// ============================================================================
// 4. THE 7 FLAGSHIP PROGRAMS & ADVOCACIES
// ============================================================================
export const INITIAL_PROGRAMS: ProgramAdvocacy[] = [
  {
    id: 'prog-pabahay',
    slug: 'pabahay-ni-kumbati',
    title_en: 'Pabahay ni Kumbati Socialized Housing',
    title_ceb: 'Pabahay ni Kumbati Desenteng Panimalay',
    category: 'Housing',
    summary_en: 'Providing dignified, durable disaster-resilient housing units to underprivileged families, disaster victims, and informal settlers.',
    summary_ceb: 'Paghatag og desente, lig-on, ug luwas nga panimalay alang sa mga kabus nga pamilya, biktima sa kalamidad, ug walay kaugalingong luna.',
    full_description_en:
      'The Pabahay ni Kumbati program is Congw. Alexie Tutor’s flagship socialized housing initiative. Built with reinforced concrete, steel roofing, and sustainable sanitation systems, over 310+ units have been turned over to vulnerable households across Bohol District 3, ensuring long-term family dignity and safety from typhoons.',
    full_description_ceb:
      'Ang programang Pabahay ni Kumbati mao ang nag-unang inisyatiba sa pabalay ni Congw. Alexie Tutor. Gitukod gamit ang semento, lig-on nga atop, ug husto nga pansayan, kapin 310+ ka pamilya na ang nakadawat og yawi sa bag-ong balay aron mapanalipdan sila batok sa mga bagyo ug kalamidad.',
    requirements_en: [
      'Certificate of Indigency from Barangay Captain',
      'Proof of Lot Ownership or Certificate of Land Usufruct / Permission',
      'Valid Government-issued ID (Voter’s ID, PhilSys, or UMID)',
      'DSWD / MSWDO Social Case Study Report',
      'Recent 2x2 ID Photo of the Family Head',
    ],
    requirements_ceb: [
      'Barangay Certificate of Indigency gikan sa Kapitan',
      'Kamatuoran sa Pagpanag-iya sa Yuta o Kasabutan sa Paggamit sa Yuta (Usufruct)',
      'Balido nga Government ID (PhilSys ID, Voter\'s ID, etc.)',
      'Social Case Study Report gikan sa MSWDO / DSWD',
      'Pinaka-ulahing 2x2 litrato sa Punoan sa Pamilya',
    ],
    cover_image_url: '/images/programs/pabahay.webp',
    icon_name: 'Home',
    display_order: 1,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-ptv',
    slug: 'patient-transport-vehicles',
    title_en: 'Patient Transport Vehicles (PTV) 24/7',
    title_ceb: 'Patient Transport Vehicles (PTV) 24/7',
    category: 'Health',
    summary_en: 'Zero-cost, 24/7 compassionate emergency transit for patients traveling to tertiary medical centers in Tagbilaran and Cebu.',
    summary_ceb: 'Libre ug 24/7 nga sakyanan medikal nga mohatod sa pasyente gikan sa lungsod paingon sa tambalanan sa Tagbilaran ug Sugbo.',
    full_description_en:
      'Four dedicated Patient Transport Vehicles equipped with basic life-support amenities, stretchers, and oxygen systems run day and night across the 19 municipalities. The PTV program relieves poor families of crippling private ambulance and van rental expenses during life-and-death medical emergencies.',
    full_description_ceb:
      'Upat ka modernong PTV nga dunay katre, oxygen, ug ekipo medikal ang nagbilar sa pag-alagad sa 19 ka lungsod. Kini nga programa nagwagtang sa dakong galastohan sa plete ug arkila sa sakyanan panahon sa grabeng balatian o emerhensiya.',
    requirements_en: [
      'Doctor’s Hospital Referral Slip or Clinical Abstract',
      'Barangay Certificate of Residency or Indigency',
      'Valid ID of Patient and Accompanying Relative / Watcher',
      'PTV Booking through District Hotline or Municipal Coordinator (at least 24h prior for routine referrals; immediate for emergency dispatch)',
    ],
    requirements_ceb: [
      'Referral Slip gikan sa Doktor o Hospital Clinical Abstract',
      'Barangay Certificate of Indigency / Residency',
      'Valid ID sa Pasyente ug sa iyang Kauban / Bantay',
      'Pagpahibalo sa PTV Hotline o Municipal Coordinator (24 oras una alang sa checkup; diretso dayon kung emerhensiya)',
    ],
    cover_image_url: '/images/programs/ptv.webp',
    icon_name: 'Ambulance',
    display_order: 2,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-dialysis-tambayan',
    slug: 'tambayan-ni-kumbati-dialysis',
    title_en: 'Tambayan ni Kumbati for Dialysis Patients',
    title_ceb: 'Tambayan ni Kumbati sa mga Dialysis Patients',
    category: 'Health',
    summary_en: 'A sanctuary in Tagbilaran City offering free air-conditioned beds, warm meals, and hot showers for dialysis patients and their watchers.',
    summary_ceb: 'Usa ka pahuwayan sa Tagbilaran City nga may libreng higdaan, pagkaon, ug kaligoan alang sa mga pasyente sa dialysis ug ilang bantay.',
    full_description_en:
      'Dialysis patients undergoing multi-weekly hemodialysis sessions often travel hours from far-flung District 3 towns and endure immense fatigue. Tambayan ni Kumbati provides a warm, respectful sanctuary where patients can rest before and after treatment without hotel fees.',
    full_description_ceb:
      'Ang mga igsuong nagpa-dialysis kaduha o katulo sa usa ka semana sagad magbiyahe og layo gikan sa hilit nga mga lungsod sa Distrito 3. Ang Tambayan ni Kumbati naghatag og komportableng luna aron makapahulay sila nga walay bayad sa abang o hotel.',
    requirements_en: [
      'Dialysis Center Treatment Schedule Card',
      'Medical Certificate certifying Hemodialysis regimen',
      'Valid Identification Card of Patient and Official Watcher',
      'Endorsement from District 3 Health Desk',
    ],
    requirements_ceb: [
      'Treatment Schedule Card gikan sa Dialysis Center',
      'Medical Certificate nga nagpamatuod sa regular nga hemodialysis',
      'Valid ID sa Pasyente ug sa Opisyal nga Bantay',
      'Endorsement gikan sa Kumbati District Health Desk',
    ],
    cover_image_url: '/images/programs/dialysis-tambayan.webp',
    icon_name: 'HeartPulse',
    display_order: 3,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-kumbati-clinic',
    slug: 'kumbati-medical-clinic',
    title_en: 'Kumbati Medical Clinic & Free Medicine Desk',
    title_ceb: 'Kumbati Medical Clinic ug Libreng Tambal',
    category: 'Health',
    summary_en: 'Direct access to free physician consultations, basic laboratory screenings, and complete courses of prescribed maintenance medicine.',
    summary_ceb: 'Diretsong libreng konsultasyon sa doktor, laboratory vouchers, ug kompletong tambal alang sa hypertension, diabetes, ug uban pa.',
    full_description_en:
      'With over 2,000+ patients served, the Kumbati Clinic bridges the healthcare gap for rural Boholanos who cannot afford private clinical check-ups or high-cost pharmacy prescriptions. Regular medical missions also reach remote mountain and island barangays.',
    full_description_ceb:
      'Kapin 2,000+ na ka pasyente ang natabangan sa Kumbati Clinic pinaagi sa libreng konsultasyon ug libreng maintenance medicines para sa alta presyon, diabetes, ug uban pang balatian aron dili na magkalisod ang mga pamilya.',
    requirements_en: [
      'Barangay Indigency Certificate',
      'Original Prescription from Attending Physician (for medicine dispensing)',
      'Patient Valid ID / Senior Citizen ID / PWD ID',
    ],
    requirements_ceb: [
      'Barangay Certificate of Indigency',
      'Orihinal nga Reseta gikan sa Doktor (alang sa pagkuha og tambal)',
      'Valid ID sa Pasyente / Senior Citizen ID / PWD ID',
    ],
    cover_image_url: '/images/programs/clinic.webp',
    icon_name: 'Stethoscope',
    display_order: 4,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-ched-scholars',
    slug: 'ched-tdp-scholars',
    title_en: 'CHED-TDP & District Tertiary Scholarships',
    title_ceb: 'CHED-TDP ug Iskolar sa Distrito',
    category: 'Education',
    summary_en: 'Empowering over 3,829+ college students with financial tuition subsidies, book stipends, and board examination allowances.',
    summary_ceb: 'Pagtabang sa kapin 3,829+ ka mga kabus apan kugihan nga mga estudyante sa kolehiyo pinaagi sa grant ug allowance sa pagtuon.',
    full_description_en:
      'In partnership with CHED’s Tulong Dunong Program (TDP) and congressional educational allocations, thousands of Boholano students across District 3 are earning their college degrees and lifting their families out of poverty.',
    full_description_ceb:
      'Uban sa CHED Tulong Dunong Program (TDP) ug hinabang pang-edukasyon ni Congw. Alexie Tutor, linibo ka batan-on sa Distrito 3 ang nakapadayon sa ilang kurso sa kolehiyo ug nakahuman sa pag-eskwela.',
    requirements_en: [
      'Certificate of Enrollment / Registration Form (COR)',
      'Certified True Copy of Grades from Previous Semester (General Weighted Average >= 80%)',
      'Barangay Certificate of Indigency / Certificate of Low Income',
      'Photocopy of Student ID and Valid ID of Parent / Guardian',
      'Not a recipient of any other full government scholarship program',
    ],
    requirements_ceb: [
      'Certificate of Registration / Enrollment gikan sa Tulunghaan',
      'Kopya sa Grado sa Miaging Semestre (GWA 80% pataas)',
      'Barangay Indigency / Pamatuod sa Gamay nga Kita sa Ginikanan',
      'Kopya sa Student ID ug Valid ID sa Ginikanan o Guardian',
      'Wala nagdawat og lain nga kompletong scholarship sa gobyerno',
    ],
    cover_image_url: '/images/programs/scholars.webp',
    icon_name: 'GraduationCap',
    display_order: 5,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-sustainable-livelihood',
    slug: 'sustainable-livelihood-program',
    title_en: 'Sustainable Livelihood & Cooperative Support',
    title_ceb: 'Malungtarong Panginabuhian ug Kooperatiba',
    category: 'Livelihood',
    summary_en: 'Granting starter capital, commercial toolkits, and cooperative training to 88+ women, farmer, and fisherfolk associations.',
    summary_ceb: 'Paghatag og puhonan, gamit pangnegosyo, ug pagbansay sa kapin 88+ ka asosasyon sa mga mag-uuma, mangingisda, ug kababayen-an.',
    full_description_en:
      'In coordination with DSWD-SLP, DOLE, and DTI, the Sustainable Livelihood Program mobilizes organized community groups into productive, self-sufficient micro-enterprises ranging from food processing to communal poultry and high-value crop production.',
    full_description_ceb:
      'Pinaagi sa koordinasyon sa DSWD-SLP, DOLE, ug DTI, kining programa nagpalig-on sa mga asosasyon aron makatukod og kaugalingong panginabuhian sama sa pagproseso sa pagkaon, pagpangisda, ug agrikultura.',
    requirements_en: [
      'SEC / CDA / DOLE Registration Certificate of the Organization',
      'Official Masterlist of Active Officers and Members',
      'Barangay and LGU Endorsement Letter',
      'Approved Simple Livelihood Project Proposal & Business Plan',
      'Organization Bank Account in good standing',
    ],
    requirements_ceb: [
      'Sertipiko sa Rehistro gikan sa SEC, CDA, o DOLE',
      'Opisyal nga Listahan sa mga Opisyales ug Miyembro',
      'Endorsement gikan sa Barangay ug LGU',
      'Approved Livelihood Project Proposal ug Plano sa Negosyo',
      'Bank Account sa Asosasyon',
    ],
    cover_image_url: '/images/programs/livelihood.webp',
    icon_name: 'Briefcase',
    display_order: 6,
    is_featured: true,
    is_active: true,
  },
  {
    id: 'prog-community-empowerment',
    slug: 'kumbati-community-infrastructure',
    title_en: 'KUMBATI Community Empowerment & Rural Upgrades',
    title_ceb: 'Pagpalig-on sa Komunidad ug Imprastraktura',
    category: 'Community',
    summary_en: 'Targeted rural electrification, level-II potable water installations, and flood control for 31+ isolated barangays.',
    summary_ceb: 'Pagpadangat og suga sa kadalanan, limpyong patubig, ug riprap sa 31+ ka hilit nga mga baryo sa distrito.',
    full_description_en:
      'Direct interventions for grassroots communities that have historically lacked essential public utilities. Solar streetlights, deep well solar-powered pumping stations, and multipurpose drying pavements transform economic safety for farming and fishing enclaves.',
    full_description_ceb:
      'Diretsong tabang sa mga barangay nga nanginahanglan og kuryente, patubig, ug pasilidad. Ang mga solar streetlight, patubig sa baryo, ug mga multi-purpose pavement naghatag og dakong kalamboan sa katawhan.',
    requirements_en: [
      'Barangay Council Resolution requesting community project assistance',
      'Municipal Engineer Endorsement or Scope of Work Assessment',
      'Proof of Public Right-of-Way or Site Turnover Consent',
    ],
    requirements_ceb: [
      'Resolusyon gikan sa Konseho sa Barangay nga nangayo og tabang',
      'Endorsement o inspeksyon gikan sa Municipal Engineer',
      'Kasabutan sa Right-of-Way sa pagatukoran nga pasilidad',
    ],
    cover_image_url: '/images/programs/infrastructure.webp',
    icon_name: 'Users',
    display_order: 7,
    is_featured: true,
    is_active: true,
  },
];

// ============================================================================
// 5. INITIAL GALLERY ALBUMS & MEDIA ITEMS
// ============================================================================
export const INITIAL_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album-pabahay-turnover',
    title_en: 'Pabahay ni Kumbati 300th Home Turnover Ceremonies',
    title_ceb: 'Turnover sa Ika-300 nga Balay sa Pabahay ni Kumbati',
    description_en: 'Heartwarming handover of concrete housing units to grateful Boholano families across Candijay, Guindulman, and Carmen.',
    description_ceb: 'Mabungahong pagtugyan sa mga yawi sa sementadong panimalay sa mga pamilya sa Candijay, Guindulman, ug Carmen.',
    cover_image_url: '/images/gallery/pabahay_turnover_lila.webp',
    category: 'Housing',
    municipality: 'Candijay',
    event_date: '2026-11-25',
    display_order: 1,
    media_count: 3,
  },
  {
    id: 'album-ptv-fleet',
    title_en: 'PTV Emergency Fleet Blessing & 24/7 Operations',
    title_ceb: 'Bendisyon sa Upat ka PTV ug 24/7 nga Pagbiyahe',
    description_en: 'Inspection and dedication of the 4 dedicated Patient Transport Vehicles serving the 19 towns.',
    description_ceb: 'Pagsusi ug pagbendisyon sa 4 ka Patient Transport Vehicles nga nag-alagad sa 19 ka lungsod.',
    cover_image_url: '/images/gallery/ptv_medical_dispatch.webp',
    category: 'Health',
    municipality: 'Jagna',
    event_date: '2026-12-10',
    display_order: 2,
    media_count: 2,
  },
  {
    id: 'album-tambayan-dialysis',
    title_en: 'Tambayan ni Kumbati for Dialysis Patients Tour',
    title_ceb: 'Pagsuroy sa Tambayan ni Kumbati sa Tagbilaran',
    description_en: 'Touring the patient haven in Tagbilaran City equipped with air-conditioned dormitories and dining hall.',
    description_ceb: 'Pagbisita sa pahuwayan sa Tagbilaran City nga may aircon nga mga katre ug libreng kan-anan.',
    cover_image_url: '/images/gallery/dialysis_haven_hospital.webp',
    category: 'Health',
    municipality: 'District-wide',
    event_date: '2027-01-15',
    display_order: 3,
    media_count: 2,
  },
  {
    id: 'album-ched-payout',
    title_en: 'Tertiary Education & Scholarship Initiatives',
    title_ceb: 'Edukasyon sa Kolehiyo ug Programang Pang-Iskolar',
    description_en: 'Congw. Alexie Tutor championing higher education, free college opening, and academic support for District 3 youth.',
    description_ceb: 'Si Congw. Alexie Tutor nangulo sa pagpalambo sa edukasyon sa kolehiyo ug hinabang pinansyal sa mga batan-on sa Ikatulong Distrito.',
    cover_image_url: '/images/gallery/scholar_assembly_tutor.webp',
    category: 'Education',
    municipality: 'Carmen',
    event_date: '2026-11-02',
    display_order: 4,
    media_count: 2,
  },
];

export const INITIAL_GALLERY_MEDIA: GalleryMedia[] = [
  {
    id: 'media-1',
    album_id: 'album-pabahay-turnover',
    media_url: '/images/gallery/pabahay_turnover_lila.webp',
    media_type: 'image',
    caption_en: 'Key handover ceremony for a resilient concrete home in Candijay.',
    caption_ceb: 'Paghatag sa yawi sa lig-on nga pabalay sa usa ka pamilya sa Candijay.',
    tags: ['Pabahay', 'Candijay', 'Housing'],
    display_order: 1,
  },
  {
    id: 'media-2',
    album_id: 'album-pabahay-turnover',
    media_url: '/images/gallery/pabahay_loboc_families.webp',
    media_type: 'image',
    caption_en: 'Completed Pabahay housing cluster with concrete foundations.',
    caption_ceb: 'Nalampos nga panimalay nga may lig-on nga pundasyon ug atop.',
    tags: ['Pabahay', 'Guindulman', 'Construction'],
    display_order: 2,
  },
  {
    id: 'media-3',
    album_id: 'album-pabahay-turnover',
    media_url: '/images/gallery/pabahay_candijay_village.webp',
    media_type: 'image',
    caption_en: 'Smiling beneficiary receiving certificate of occupancy.',
    caption_ceb: 'Malipayong benepisyaryo nga nagdawat sa iyang sertipiko sa balay.',
    tags: ['Pabahay', 'Turnover'],
    display_order: 3,
  },
  {
    id: 'media-4',
    album_id: 'album-ptv-fleet',
    media_url: '/images/gallery/ptv_medical_dispatch.webp',
    media_type: 'image',
    caption_en: 'The four Patient Transport Vehicles lined up for 24/7 service.',
    caption_ceb: 'Ang upat ka Patient Transport Vehicles nga andam kanunay sa emerhensiya.',
    tags: ['PTV', 'Health', 'Emergency'],
    display_order: 1,
  },
  {
    id: 'media-5',
    album_id: 'album-ptv-fleet',
    media_url: '/images/gallery/kumbati_clinic_opening.webp',
    media_type: 'image',
    caption_en: 'Interior view of life-support equipment and patient stretcher inside PTV 2.',
    caption_ceb: 'Hapsay ug limpyo nga katre ug oxygen tank sa sulod sa PTV.',
    tags: ['PTV', 'Ambulance'],
    display_order: 2,
  },
  {
    id: 'media-6',
    album_id: 'album-tambayan-dialysis',
    media_url: '/images/gallery/dialysis_haven_hospital.webp',
    media_type: 'image',
    caption_en: 'Comfortable air-conditioned dormitory area inside Tambayan ni Kumbati.',
    caption_ceb: 'Hamugaway ug aircon nga mga higdaan sa Tambayan ni Kumbati.',
    tags: ['Dialysis', 'Tambayan', 'Tagbilaran'],
    display_order: 1,
  },
  {
    id: 'media-7',
    album_id: 'album-ched-payout',
    media_url: '/images/gallery/scholar_assembly_tutor.webp',
    media_type: 'image',
    caption_en: 'Congw. Alexie Tutor and local leaders leading the ribbon-cutting ceremony for Carmen Municipal College.',
    caption_ceb: 'Si Congw. Alexie Tutor ug mga lider sa lungsod sa seremonya sa pag-abli sa Carmen Municipal College.',
    tags: ['Carmen', 'Education', 'College', 'CMC'],
    display_order: 1,
  },
  {
    id: 'media-8',
    album_id: 'album-ched-payout',
    media_url: '/images/gallery/candijay_science_turnover.webp',
    media_type: 'image',
    caption_en: 'Candijay National Science High School digital library and educational materials turnover ceremony.',
    caption_ceb: 'Turnover sa digital library ug mga gamit sa tulunghaan sa Candijay National Science High School.',
    tags: ['Candijay', 'Science', 'StarBooks', 'Education'],
    display_order: 2,
  },
];

// ============================================================================
// 6. INITIAL HOTLINES & DIRECTORY
// ============================================================================
export const INITIAL_HOTLINES: HotlineEntry[] = [
  {
    id: 'hotline-ptv-emergency',
    municipality: 'District-wide',
    office_name_en: 'PTV 24/7 Patient Dispatch Hotline',
    office_name_ceb: 'PTV 24/7 Paspas nga Sakyanan sa Pasyente',
    contact_person: 'Dispatch Operations Officer',
    phone_numbers: ['+63 917 832 6284', '+63 928 554 9912'],
    email: 'ptv@kumbati.bohol3.gov.ph',
    is_emergency: true,
    display_order: 1,
  },
  {
    id: 'hotline-main-office',
    municipality: 'District-wide',
    office_name_en: 'District Congressional Main Office (Candijay)',
    office_name_ceb: 'Pangulong Opisina sa Distrito (Candijay)',
    contact_person: 'Chief of Staff',
    phone_numbers: ['(038) 526-0123', '+63 917 123 4567'],
    email: 'office@kumbati.bohol3.gov.ph',
    is_emergency: false,
    display_order: 2,
  },
  {
    id: 'hotline-dialysis-tambayan',
    municipality: 'District-wide',
    office_name_en: 'Tambayan ni Kumbati (Dialysis Haven, Tagbilaran)',
    office_name_ceb: 'Tambayan ni Kumbati (Tagbilaran Haven)',
    contact_person: 'Center Custodian',
    phone_numbers: ['+63 919 443 2199', '(038) 412-8877'],
    email: 'tambayan@kumbati.bohol3.gov.ph',
    is_emergency: false,
    display_order: 3,
  },
  {
    id: 'hotline-kumbati-clinic',
    municipality: 'Jagna',
    office_name_en: 'Kumbati Free Medical Clinic & Pharmacy Desk',
    office_name_ceb: 'Kumbati Libreng Klinika ug Botika',
    contact_person: 'Resident Nurse / Pharmacist',
    phone_numbers: ['+63 917 558 2210'],
    email: 'clinic@kumbati.bohol3.gov.ph',
    is_emergency: false,
    display_order: 4,
  },
  {
    id: 'hotline-alicia-mdrrmo',
    municipality: 'Alicia',
    office_name_en: 'MDRRMO & Municipal Hall of Alicia',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Alicia',
    contact_person: 'LGU Hotline Desk',
    phone_numbers: ['+63 917 312 0001', '(038) 521-1001'],
    email: 'alicia.bohol@gmail.com',
    is_emergency: true,
    display_order: 5,
  },
  {
    id: 'hotline-anda-mdrrmo',
    municipality: 'Anda',
    office_name_en: 'MDRRMO & Municipal Hall of Anda',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Anda',
    contact_person: 'Emergency Dispatch',
    phone_numbers: ['+63 917 312 0002', '(038) 528-2002'],
    email: 'anda.bohol@gmail.com',
    is_emergency: true,
    display_order: 6,
  },
  {
    id: 'hotline-batuan-mdrrmo',
    municipality: 'Batuan',
    office_name_en: 'MDRRMO & Municipal Hall of Batuan',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Batuan',
    contact_person: 'Emergency Dispatch',
    phone_numbers: ['+63 917 312 0003'],
    email: 'batuan.bohol@gmail.com',
    is_emergency: true,
    display_order: 7,
  },
  {
    id: 'hotline-bilar-mdrrmo',
    municipality: 'Bilar',
    office_name_en: 'MDRRMO & Municipal Hall of Bilar',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Bilar',
    contact_person: 'Emergency Dispatch',
    phone_numbers: ['+63 917 312 0004'],
    email: 'bilar.bohol@gmail.com',
    is_emergency: true,
    display_order: 8,
  },
  {
    id: 'hotline-candijay-mdrrmo',
    municipality: 'Candijay',
    office_name_en: 'MDRRMO & Municipal Hall of Candijay',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Candijay',
    contact_person: 'Emergency Response Unit',
    phone_numbers: ['+63 917 312 0005', '(038) 526-0005'],
    email: 'candijay.bohol@gmail.com',
    is_emergency: true,
    display_order: 9,
  },
  {
    id: 'hotline-carmen-mdrrmo',
    municipality: 'Carmen',
    office_name_en: 'MDRRMO & Municipal Hall of Carmen',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Carmen',
    contact_person: 'Central Rescue 911',
    phone_numbers: ['+63 917 312 0006', '(038) 525-9006'],
    email: 'carmen.bohol@gmail.com',
    is_emergency: true,
    display_order: 10,
  },
  {
    id: 'hotline-jagna-mdrrmo',
    municipality: 'Jagna',
    office_name_en: 'MDRRMO & Municipal Hall of Jagna',
    office_name_ceb: 'MDRRMO ug Munisipyo sa Jagna',
    contact_person: 'Jagna Emergency Center',
    phone_numbers: ['+63 917 312 0011', '(038) 531-8011'],
    email: 'jagna.bohol@gmail.com',
    is_emergency: true,
    display_order: 11,
  },
];

// ============================================================================
// 7. INITIAL MAP LOCATIONS (GEOSPATIAL COORDINATES)
// ============================================================================
export const INITIAL_MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'loc-hq-candijay',
    title_en: 'District Congressional Headquarters (Candijay)',
    title_ceb: 'Pangulong Opisina sa Distrito (Candijay)',
    category: 'office',
    municipality: 'Candijay',
    address: 'Poblacion, Candijay, Bohol',
    latitude: 9.8406,
    longitude: 124.5367,
    phone: '(038) 526-0123',
    operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description_en: 'Primary constituent assistance processing center and legislative field desk.',
    description_ceb: 'Pangulong buhatan alang sa mga constituent services ug assistance request.',
    is_active: true,
  },
  {
    id: 'loc-clinic-jagna',
    title_en: 'Kumbati Free Medical Clinic (Jagna Hub)',
    title_ceb: 'Kumbati Libreng Klinika (Jagna Hub)',
    category: 'clinic',
    municipality: 'Jagna',
    address: 'Tejero Street, Poblacion, Jagna, Bohol',
    latitude: 9.6528,
    longitude: 124.3683,
    phone: '+63 917 558 2210',
    operating_hours: 'Mon - Sat: 8:00 AM - 4:00 PM',
    description_en: 'Free outpatient physician clinic and medicine release center.',
    description_ceb: 'Libreng checkup sa doktor ug pagpanghatag og maintenance medicine.',
    is_active: true,
  },
  {
    id: 'loc-tambayan-tagbilaran',
    title_en: 'Tambayan ni Kumbati for Dialysis Patients',
    title_ceb: 'Tambayan ni Kumbati sa mga Dialysis Patients',
    category: 'tambayan',
    municipality: 'District-wide',
    address: 'Near Gov. Celestino Gallares Memorial Hospital, Tagbilaran City',
    latitude: 9.6515,
    longitude: 123.8550,
    phone: '+63 919 443 2199',
    operating_hours: 'Open 24/7 for Dialysis Patients & Watchers',
    description_en: 'Safe haven with free beds, hot showers, and meals for dialysis patients from District 3.',
    description_ceb: 'Libreng kapuy-an ug pagkaon alang sa mga pasyente sa dialysis ug ilang pamilya.',
    is_active: true,
  },
  {
    id: 'loc-ptv-hub-carmen',
    title_en: 'PTV Station 1 - Central Bohol Hub (Carmen)',
    title_ceb: 'PTV Station 1 - Sentral Hub (Carmen)',
    category: 'ptv_hub',
    municipality: 'Carmen',
    address: 'Near Carmen Municipal Gym, Carmen, Bohol',
    latitude: 9.8247,
    longitude: 124.1942,
    phone: '+63 917 832 6284',
    operating_hours: '24/7 Emergency Dispatch',
    description_en: 'Patient Transport Vehicle stationed for rapid deployment in Carmen, Batuan, Bilar, and Sagbayan border.',
    description_ceb: 'Ambulansya nga naka-istambay alang sa dinaliang pag-responde sa sentral nga mga lungsod.',
    is_active: true,
  },
  {
    id: 'loc-ptv-hub-guindulman',
    title_en: 'PTV Station 2 - Eastern Coastline Hub (Guindulman)',
    title_ceb: 'PTV Station 2 - Sidlakang Baybayon (Guindulman)',
    category: 'ptv_hub',
    municipality: 'Guindulman',
    address: 'National Highway, Guindulman, Bohol',
    latitude: 9.7619,
    longitude: 124.4922,
    phone: '+63 917 832 6284',
    operating_hours: '24/7 Emergency Dispatch',
    description_en: 'Emergency medical vehicle servicing Anda, Guindulman, Duero, and Candijay.',
    description_ceb: 'Sakyanan medikal alang sa dinaliang biyahe sa pasyente sa sidlakang distrito.',
    is_active: true,
  },
  {
    id: 'loc-pabahay-site-candijay',
    title_en: 'Pabahay ni Kumbati Village - Candijay Site',
    title_ceb: 'Pabahay ni Kumbati Balangay - Candijay',
    category: 'pabahay_site',
    municipality: 'Candijay',
    address: 'Barangay Panadtaran, Candijay, Bohol',
    latitude: 9.8512,
    longitude: 124.5211,
    phone: '(038) 526-0123',
    operating_hours: 'Visits by Appointment',
    description_en: 'Model community of 60+ concrete disaster-proof homes completed in 2024–2026.',
    description_ceb: 'Modelong komunidad sa 60+ ka lig-on nga pabalay nga gitunol sa mga pamilya.',
    is_active: true,
  },
  {
    id: 'loc-alicia-hall',
    title_en: 'Alicia Municipal Hall',
    title_ceb: 'Munisipyo sa Alicia',
    category: 'municipal_hall',
    municipality: 'Alicia',
    address: 'Poblacion, Alicia, Bohol',
    latitude: 9.8978,
    longitude: 124.4444,
    phone: '+63 917 312 0001',
    operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description_en: 'Local Government Unit of Alicia.',
    description_ceb: 'Kagamhanang Lokal sa Alicia.',
    is_active: true,
  },
  {
    id: 'loc-anda-hall',
    title_en: 'Anda Municipal Hall',
    title_ceb: 'Munisipyo sa Anda',
    category: 'municipal_hall',
    municipality: 'Anda',
    address: 'Poblacion, Anda, Bohol',
    latitude: 9.7431,
    longitude: 124.5767,
    phone: '+63 917 312 0002',
    operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description_en: 'Local Government Unit of Anda.',
    description_ceb: 'Kagamhanang Lokal sa Anda.',
    is_active: true,
  },
  {
    id: 'loc-carmen-hall',
    title_en: 'Carmen Municipal Hall',
    title_ceb: 'Munisipyo sa Carmen',
    category: 'municipal_hall',
    municipality: 'Carmen',
    address: 'Poblacion, Carmen, Bohol',
    latitude: 9.8247,
    longitude: 124.1942,
    phone: '+63 917 312 0006',
    operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description_en: 'Local Government Unit of Carmen (Heart of Chocolate Hills).',
    description_ceb: 'Kagamhanang Lokal sa Carmen.',
    is_active: true,
  },
  {
    id: 'loc-jagna-hall',
    title_en: 'Jagna Municipal Hall',
    title_ceb: 'Munisipyo sa Jagna',
    category: 'municipal_hall',
    municipality: 'Jagna',
    address: 'Poblacion, Jagna, Bohol',
    latitude: 9.6528,
    longitude: 124.3683,
    phone: '+63 917 312 0011',
    operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
    description_en: 'Local Government Unit of Jagna port town.',
    description_ceb: 'Kagamhanang Lokal sa Jagna.',
    is_active: true,
  },
];

// ============================================================================
// 9. INITIAL NEWS & PUBLIC ANNOUNCEMENTS
// ============================================================================
export const INITIAL_NEWS_ANNOUNCEMENTS: NewsAnnouncement[] = [
  {
    id: 'news-ptv-weather-standby',
    title_en: 'PTV 24/7 Emergency Dispatch Standby Alert for Weather Disturbance across 19 Municipalities',
    title_ceb: 'PTV 24/7 Alerto ug Andam sa Emerhensiya sa Panahon sa Dautan nga Panahon lukop sa 19 ka Lungsod',
    excerpt_en: 'The 4-van Patient Transport Vehicle (PTV) fleet is placed on heightened 24/7 standby for emergency hospital transfers and patient logistics across all 19 towns.',
    excerpt_ceb: 'Ang 4 ka sakyanan sa PTV 24/7 nga naka-alerto alang sa dinaliang paghatod sa mga pasyente sa tambalanan lukop sa 19 ka mga lungsod sa Ikatulong Distrito.',
    content_en: `In view of recent localized thunderstorms and weather advisories affecting eastern and central Bohol, Congresswoman Kristine Alexie Besas Tutor has directed the entire 4-van Patient Transport Vehicle (PTV) fleet to maintain 24/7 heightened readiness.

Our dispatch coordinators and professional drivers stationed in Candijay, Jagna, Carmen, and Guindulman hubs are actively collaborating with Municipal Disaster Risk Reduction and Management Offices (MDRRMOs) and local rural health units (RHUs).

Emergency Dispatch Protocols:
1. Dial the 24/7 Hotline immediately: +63 917 832 6284 or (038) 526-0123.
2. Provide patient details, current exact location/barangay, and receiving hospital.
3. Zero-Fare Guarantee: No constituent shall be charged for fuel, driver honorarium, or vehicle dispatch.

For critical inter-facility emergency transfers, please have your attending medical officer or RHU nurse endorse the patient so our drivers can coordinate with receiving hospital triage teams in Tagbilaran City or district hospitals.`,
    content_ceb: `Tungod sa mga pag-ulan ug dautan nga panahon nga nasinati sa silangan ug sentral nga bahin sa Bohol, gimandoan ni Congresswoman Kristine Alexie Besas Tutor ang tanang 4 ka sakyanan sa Patient Transport Vehicle (PTV) nga magpabilin nga 24/7 andam ug alerto.

Ang atong mga dispatch coordinators ug mga drayber sa Candijay, Jagna, Carmen, ug Guindulman kanunayng nakig-alayon sa mga MDRRMO ug Rural Health Units (RHUs).

Pamaagi sa Pag-request sa PTV:
1. Tawag dayon sa 24/7 Hotline: +63 917 832 6284 o (038) 526-0123.
2. Ihatag ang ngalan sa pasyente, address/barangay, ug asa nga ospital dad-on.
3. Libre ug Walay Bayad: Walay pabayron bisan piso sa krudo, drayber, o sakyanan.

Alang sa pasyente nga kinahanglang ibalhin sa Tagbilaran o district hospital, palihug ipahibawo sa inyong RHU o doktor aron ma-coordinate sa receiving hospital.`,
    category: 'advisory',
    priority: 'urgent',
    author: 'PTV 24/7 Command Center',
    publish_date: '2026-11-04',
    image_url: '/images/news/ptv_dispatch.webp',
    is_pinned: true,
    is_published: true,
    target_towns: ['District-wide'],
  },
  {
    id: 'news-ched-tdp-payout-schedule',
    title_en: 'Schedule of Payout: CHED Tulong Dunong Program (TDP) for 1st Semester College Scholars',
    title_ceb: 'Eskedyul sa Payout: CHED Tulong Dunong Program (TDP) alang sa mga Iskolar sa Kolehiyo',
    excerpt_en: 'The Congressional District Office releases the municipal payout schedule and documentary requirements for 3,829+ tertiary student beneficiaries.',
    excerpt_ceb: 'Gipagawas sa Opisina sa Distrito ang eskedyul sa payout ug mga gikinahanglang dokumento sa kapin 3,829+ ka mga estudyante sa kolehiyo.',
    content_en: `The Office of Congresswoman Alexie Besas Tutor, in coordination with the Commission on Higher Education (CHED Region VII), announces the official payout schedule for the CHED Tulong Dunong Program (TDP-TES) tertiary educational grants for the 1st Semester.

Municipal Payout Cluster Schedule:
- Cluster 1 (Candijay, Anda, Mabini, Alicia): Tuesday, 8:30 AM - Candijay Cultural Center
- Cluster 2 (Jagna, Duero, Garcia Hernandez): Wednesday, 8:30 AM - Jagna Municipal Gymnasium
- Cluster 3 (Carmen, Batuan, Bilar, Sierra Bullones, Pilar): Thursday, 8:30 AM - Carmen Multi-Purpose Complex
- Cluster 4 (Dimiao, Valencia, Lila, Loay, Loboc, Sevilla): Friday, 8:30 AM - Loay Gymnasium

Mandatory Requirements to Bring:
1. Valid Student School ID (Original and 2 photocopies).
2. Certificate of Registration (COR) / Assessment Form for current semester with official dry seal.
3. Certificate of Indigency from Barangay Captain (Original).
4. Ballpen (Black ink).

Scholars are advised to come on their assigned municipal timeslots to avoid congestion. Parents or authorized representatives must present an Authorization Letter and Valid Government ID if the scholar has a conflict with mandatory school exams.`,
    content_ceb: `Ang Opisina ni Congresswoman Alexie Besas Tutor, kauban ang Commission on Higher Education (CHED Region VII), nagpahibalo sa opisyal nga eskedyul sa payout sa CHED Tulong Dunong Program (TDP-TES) alang sa 1st Semester.

Eskedyul sa Payout Matag Cluster:
- Cluster 1 (Candijay, Anda, Mabini, Alicia): Martes, 8:30 AM - Candijay Cultural Center
- Cluster 2 (Jagna, Duero, Garcia Hernandez): Miyerkules, 8:30 AM - Jagna Municipal Gymnasium
- Cluster 3 (Carmen, Batuan, Bilar, Sierra Bullones, Pilar): Huwebes, 8:30 AM - Carmen Multi-Purpose Complex
- Cluster 4 (Dimiao, Valencia, Lila, Loay, Loboc, Sevilla): Biyernes, 8:30 AM - Loay Gymnasium

Mga Gikinahanglang Dalhon:
1. Valid School ID sa estudyante (Original ug 2 ka photocopy).
2. Certificate of Registration (COR) / Assessment Form nga may official seal.
3. Barangay Certificate of Indigency (Original).
4. Ballpen (Itom).

Giawhag ang mga iskolar sa pag-abot sa gitakdang oras aron mahapsay ang pag-apud-apod sa hinabang.`,
    category: 'payout_schedule',
    priority: 'important',
    author: 'District Educational Assistance Desk',
    publish_date: '2026-11-02',
    image_url: '/images/news/scholar_assembly.webp',
    is_pinned: true,
    is_published: true,
    target_towns: ['Candijay', 'Carmen', 'Jagna', 'Guindulman', 'Sierra Bullones', 'Pilar', 'Alicia', 'Anda', 'Mabini', 'Duero', 'Garcia Hernandez', 'Dimiao', 'Valencia', 'Lila', 'Loay', 'Loboc', 'Sevilla', 'Batuan', 'Bilar'],
  },
  {
    id: 'news-kumbati-clinic-caravan',
    title_en: 'Free Kumbati Medical Clinic & Diagnostic Caravan Scheduled for Eastern Bohol Municipalities',
    title_ceb: 'Libreng Kumbati Medical Clinic ug Diagnostic Caravan sa mga Lungsod sa Silangang Bohol',
    excerpt_en: 'Free physician consultations, pediatric checkups, ECG testing, prescription maintenance medicines, and tooth extractions across Anda, Mabini, and Duero.',
    excerpt_ceb: 'Libreng konsultasyon sa doktor, check-up sa bata, ECG, tambal sa maintenance, ug ibot sa ngipon sa mga lungsod sa Anda, Mabini, ug Duero.',
    content_en: `Continuing the healthcare advocacy of Congresswoman Alexie Tutor, the mobile team of Kumbati Medical Clinic will conduct a 3-day multi-town Medical and Diagnostic Mission in eastern Bohol.

Services Offered 100% Free:
- Comprehensive adult and geriatric medical examinations
- Pediatric wellness checkups and vitamin supplements
- 12-Lead Electrocardiogram (ECG) screening for hypertension and cardiac patients
- Random blood glucose and uric acid screening
- Tooth extractions and dental hygiene kits
- Dispensation of maintenance medicines for hypertension, diabetes, and respiratory ailments

Itinerary:
- Day 1: Anda Municipal Covered Court (8:00 AM - 3:00 PM)
- Day 2: Mabini Town Gymnasium (8:00 AM - 3:00 PM)
- Day 3: Duero Cultural Center (8:00 AM - 3:00 PM)

All constituents are welcome. Priority numbering will be given to senior citizens, pregnant mothers, and persons with disabilities (PWDs).`,
    content_ceb: `Aron ipadayon ang serbisyo medikal ni Congw. Alexie Tutor, ang grupo sa Kumbati Medical Clinic mopahigayon og 3 ka adlaw nga Medical and Diagnostic Caravan sa silangang bahin sa Bohol.

Libreng Serbisyo:
- Pagsusi sa doktor alang sa mga hamtong ug katigulangan
- Check-up sa mga bata ug libreng bitamina
- 12-Lead ECG para sa may alta-presyon ug sakit sa kasingkasing
- Blood sugar testing
- Ibot sa ngipon
- Libreng tambal sa maintenance sama sa tambal sa high blood, diabetes, ug ubo/sipon

Lugar ug Adlaw:
- Adlaw 1: Anda Municipal Covered Court (8:00 AM - 3:00 PM)
- Adlaw 2: Mabini Town Gymnasium (8:00 AM - 3:00 PM)
- Adlaw 3: Duero Cultural Center (8:00 AM - 3:00 PM)

Bukas kini sa tanang lumulupyo. Prayoridad ang mga senior citizen, mabdos, ug PWD.`,
    category: 'medical_mission',
    priority: 'important',
    author: 'Kumbati Medical Mission Team',
    publish_date: '2026-10-28',
    image_url: '/images/news/kumbati_clinic.webp',
    is_pinned: false,
    is_published: true,
    target_towns: ['Anda', 'Mabini', 'Duero'],
  },
  {
    id: 'news-ra-11883-groundbreaking',
    title_en: 'Republic Act No. 11883 Implementation: Civil Works Commence for Carmen Hospital Expansion',
    title_ceb: 'Pagpatuman sa RA 11883: Pagsugod sa Trabaho sa Pagpalapad sa Hospital sa Carmen',
    excerpt_en: 'Department of Health and DPWH break ground on the modern 75-bed expansion of Cong. Simeon G. Toribio Memorial Hospital under Congw. Alexie Tutor\'s authored law.',
    excerpt_ceb: 'Gisugdan na sa DOH ug DPWH ang pagtukod sa bag-ong edipisyo aron mahimong 75-bed capacity ang ospital sa Carmen subay sa balaod ni Congw. Tutor.',
    content_en: `Groundwork and structural construction have officially commenced for the multi-million hospital expansion of the Cong. Simeon G. Toribio Memorial Hospital in Carmen, Bohol, implementing Republic Act No. 11883 authored by Congresswoman Kristine Alexie Besas Tutor.

Key Upgrades Being Constructed:
- Bed capacity expansion from 40 to 75 authorized beds
- Dedicated High-Dependency Intensive Care Unit (ICU) and Neonatal ICU
- Expanded Emergency Trauma Bay with modernized triage
- New Hemodialysis Wing to serve dialysis patients from Carmen, Batuan, Sagbayan, and Sierra Bullones
- Upgraded digital radiological and sonographic imaging center

"Through RA 11883, we are ensuring that the families in the interior highlands of Bohol do not have to travel over an hour to Tagbilaran City just to receive life-saving hospital care," stated Congw. Alexie Tutor during the project site inspection.`,
    content_ceb: `Gisugdan na ang trabaho sa pagpalapad sa Cong. Simeon G. Toribio Memorial Hospital sa lungsod sa Carmen, agi og pagpatuman sa Republic Act No. 11883 nga gipangamahanan ni Congresswoman Kristine Alexie Besas Tutor.

Mga Bag-ong Pasilidad nga Tukuron:
- Pagpadako sa katre gikan sa 40 ngadto sa 75 ka katre
- Bag-ong Intensive Care Unit (ICU) ug Neonatal ICU alang sa bag-ong natawo
- Mas dako ug modernong Emergency Trauma Room
- Bag-ong Hemodialysis Wing alang sa mga pasyente sa Carmen, Batuan, ug kasikbit nga lungsod
- Modernong digital X-Ray ug laboratoryo

"Pinaagi sa RA 11883, gisiguro nato nga ang katawhan sa interior sa Bohol dili na kinahanglang mobiyahe og layo ngadto sa Tagbilaran aron matambalan," matud pa ni Congw. Alexie Tutor.`,
    category: 'legislative',
    priority: 'normal',
    author: 'Congressional Media Bureau',
    publish_date: '2026-10-22',
    image_url: '/images/news/bridge_inspection.webp',
    is_pinned: false,
    is_published: true,
    target_towns: ['Carmen', 'Batuan', 'Bilar', 'Sierra Bullones'],
  },
  {
    id: 'news-tambayan-dialysis-lodging',
    title_en: 'Tambayan ni Kumbati for Dialysis Patients: Updated Lodging and Free Meal Protocol',
    title_ceb: 'Tambayan ni Kumbati sa Tagbilaran: Bag-ong Giya sa Libreng Pahuwayan ug Pagkaon sa Dialysis Patients',
    excerpt_en: 'Guidelines on how 3rd District kidney care patients and their travel companions can reserve air-conditioned dorm beds and warm meals in Tagbilaran City.',
    excerpt_ceb: 'Mga pahimangno ug pamaagi kon unsaon pag-avail sa libreng kwarto nga aircon ug pagkaon alang sa mga dialysis patients gikan sa Distrito 3.',
    content_en: `The Office of Congresswoman Alexie Besas Tutor reminds all hemodialysis patients from the 19 municipalities of Bohol's 3rd Congressional District that Tambayan ni Kumbati, located near major dialysis centers in Tagbilaran City, continues to provide 100% free lodging and freshly prepared nutritious meals.

Amenities Available:
- Clean, air-conditioned patient dormitories with orthopedic mattresses
- Companion sleeping areas and sanitized restrooms with hot/cold showers
- Free hot meals and kidney-safe dining menu for patients and their caregivers
- Television recreation lounge and high-speed Wi-Fi
- Direct transit coordination with the PTV 24/7 fleet for trips back to the province

Reservation Procedure:
Please coordinate with the Action Center desk or call the Tambayan Coordinator at +63 917 832 6284 at least 24 hours prior to your scheduled dialysis treatment in Tagbilaran.`,
    content_ceb: `Gipahinumdoman sa Opisina ni Congw. Alexie Tutor ang tanang pasyente sa hemodialysis gikan sa 19 ka lungsod sa Distrito 3 nga ang Tambayan ni Kumbati sa Tagbilaran City padayong naghatag og libreng pahuwayan ug pagkaon.

Mga Pasilidad sa Tambayan:
- Limpyo ug aircon nga mga kwarto nga may komportableng katre
- Pahuwayan alang sa mga bantay ug limpyong kasilyas nga may hot/cold shower
- Libreng init nga pagkaon nga angay sa dialysis diet
- TV lounge ug libreng Wi-Fi
- Koordinasyon sa PTV alang sa pagsakay pauli sa lungsod

Pamaagi sa Pagpa-reserve:
Tawag o pakig-alayon sa Tambayan Coordinator sa +63 917 832 6284 labing menos 24 oras sa dili pa ang inyong schedule sa dialysis.`,
    category: 'advisory',
    priority: 'normal',
    author: 'Tambayan ni Kumbati Administrator',
    publish_date: '2026-10-15',
    image_url: '/images/programs/dialysis-tambayan.webp',
    is_pinned: false,
    is_published: true,
    target_towns: ['District-wide'],
  },
  {
    id: 'news-pabahay-site-assessment',
    title_en: 'Pabahay ni Kumbati Phase 4 Site Assessment: 40 More Resilient Homes Slated for Coastal Municipalities',
    title_ceb: 'Pabahay ni Kumbati Phase 4: Dugang 40 ka Balay ang Pagatukuron sa mga Baybayong Lungsod',
    excerpt_en: 'Technical validation conducted in partnership with LGU engineers to finalize beneficiary masterlists for typhoon-resilient concrete housing units.',
    excerpt_ceb: 'Gipahigayon ang inspeksyon ug pagsusi sa listahan sa mga benepisyaryo sa bag-ong sementadong balay nga dili maguba sa katalagman.',
    content_en: `Engineers from the District Technical Planning Office, in coordination with municipal social welfare officers from Dimiao, Garcia Hernandez, Valencia, and Lila, have concluded initial ground validations for Phase 4 of Pabahay ni Kumbati.

This flagship socialized shelter program of Congw. Alexie Tutor has already turned over 310+ concrete homes to landless, indigent families living in danger zones or disaster-vulnerable shorelines.

Key Specifications of Each Pabahay Unit:
- Monolithic reinforced concrete foundation engineered to withstand Category 5 super typhoons
- Metal-trussed galvanized roofing with gale-force wind strapping
- Dedicated individual septic tank, modern plumbing, and electricity wiring
- Solar perimeter lighting for community safety

Beneficiary selection is strictly vetted through municipal MSWDO assessments, focusing on families without legal land tenure or residing in high-risk cliffside and storm-surge hazard zones.`,
    content_ceb: `Ang mga inhenyero sa Distrito, kauban ang mga MSWDO sa Dimiao, Garcia Hernandez, Valencia, ug Lila, nakahuman na sa validation alang sa Phase 4 sa Pabahay ni Kumbati.

Kini nga programa ni Congw. Alexie Tutor nakahatag na og kapin 310+ ka sementadong panimalay sa mga kabus nga pamilya nga nagpuyo sa danger zones o daplin sa baybayon.

Mga Kinaiya sa Balay sa Pabahay:
- Sementado nga pundasyon nga makasukol sa kusog nga bagyo
- Lig-on nga atop nga may hurricane clips
- Adunay kaugalingong septic tank, kasilyas, ug linya sa suga
- Solar streetlights alang sa kaluwasan sa komunidad

Ang pagpili sa benepisyaryo subay sa pagsusi sa MSWDO sa matag lungsod aron masiguro nga ang labing nanginahanglan maoy makadawat.`,
    category: 'general',
    priority: 'normal',
    author: 'Pabahay Technical Committee',
    publish_date: '2026-10-08',
    image_url: '/images/news/pabahay_turnover.webp',
    is_pinned: false,
    is_published: true,
    target_towns: ['Dimiao', 'Garcia Hernandez', 'Valencia', 'Lila'],
  },
];

