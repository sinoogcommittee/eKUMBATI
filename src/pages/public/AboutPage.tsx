import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_SITE_SETTINGS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Award,
  BookOpen,
  Heart,
  Home,
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  ExternalLink,
  Landmark,
  Scale,
  FileText,
  CheckCircle2,
  Building2,
  Sparkles,
  Globe,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'principal' | 'coauthored'>('principal');
  const [billCategory, setBillCategory] = useState<string>('all');

  const corePillars = [
    {
      titleEn: 'Compassionate Healthcare',
      titleCeb: 'Mahigugmaong Panglawas',
      descEn:
        'Zero-fare 24/7 patient transport (PTV), free dialysis lodging at Tambayan ni Kumbati, and direct outpatient clinics and prescription medicines.',
      descCeb:
        'Libreng sakyanan sa pasyente (PTV), pahuwayan sa dialysis patients sa Tagbilaran, ug libreng tambal ug konsultasyon sa doktor.',
      icon: Stethoscope,
      color: 'red',
    },
    {
      titleEn: 'Dignified Socialized Shelter',
      titleCeb: 'Desente ug Luwas nga Panimalay',
      descEn:
        'Pabahay ni Kumbati provides typhoon-proof concrete homes to 259+ underprivileged families with land security.',
      descCeb:
        'Paghatag og sementado ug lig-on nga panimalay sa kapin 259+ ka kabus nga pamilya lukop sa 19 ka lungsod.',
      icon: Home,
      color: 'orange',
    },
    {
      titleEn: 'Universal Education Access',
      titleCeb: 'Edukasyon Alang sa Tanan',
      descEn:
        'CHED-TDP and congressional tertiary scholarships empowering 3,829+ college youth to complete their degrees.',
      descCeb:
        'Tulong Dunong Program ug hinabang pinansyal sa kapin 3,829+ ka mga estudyante sa kolehiyo.',
      icon: GraduationCap,
      color: 'blue',
    },
    {
      titleEn: 'Sustainable Rural Livelihood',
      titleCeb: 'Malungtarong Panginabuhian',
      descEn:
        'Seed capital, machinery toolkits, and cooperative training for 78+ women, farmer, and fisherfolk associations.',
      descCeb:
        'Puhonan, gamit sa panguma ug negosyo alang sa 78+ ka mga kooperatiba ug asosasyon.',
      icon: Briefcase,
      color: 'emerald',
    },
    {
      titleEn: 'Grassroots Infrastructure',
      titleCeb: 'Imprastraktura sa Komunidad',
      descEn:
        'Solar streetlights, deep well drinking water systems, and flood protection for 31+ isolated rural communities.',
      descCeb:
        'Solar nga suga sa dalan, limpyong patubig, ug riprap sa 31+ ka mga hilit nga baryo ug sityo.',
      icon: Users,
      color: 'purple',
    },
  ];

  // =========================================================================
  // OFFICIAL 19TH CONGRESS COMMITTEE APPOINTMENTS (congress.gov.ph/house-members/view/J075)
  // =========================================================================
  const committeeLeadership = [
    {
      role: 'Chairperson',
      roleCeb: 'Pangulo (Chairperson)',
      committeeEn: 'Committee on Civil Service and Professional Regulation',
      committeeCeb: 'Komitiba sa Serbisyo Sibil ug Regulasyon sa mga Propesyon',
      statusVariant: 'orange' as const,
      icon: Landmark,
      descEn:
        'Direct legislative jurisdiction over the civil service system, rights, benefits, tenure, security, and retirement of all government employees, as well as the regulation of licensed professions under the Professional Regulation Commission (PRC).',
      descCeb:
        'Nanguna sa pagpanday og mga balaod alang sa proteksyon, regularisasyon, ug benepisyo sa tanang kawani sa gobyerno, ug pagdumala sa mga lisensyadong propesyonal ubos sa PRC.',
      highlights: [
        'Tenure & Civil Service eligibility for contractual/JO workers',
        'Extension of PRC ID validity to 5 years',
        'Standardization of public sector salaries and benefits',
      ],
    },
    {
      role: 'Vice Chairperson',
      roleCeb: 'Pangalawang Pangulo (Vice Chairperson)',
      committeeEn: 'Committee on Health',
      committeeCeb: 'Komitiba sa Panglawas',
      statusVariant: 'emerald' as const,
      icon: Stethoscope,
      descEn:
        'Key leadership over national public health policies, hospital expansions, disease control, maternal healthcare, medical frontliner compensation, and health financing systems like PhilHealth and Malasakit Centers.',
      descCeb:
        'Nangulo sa pagpalapad sa mga distrito nga tambalanan sa Bohol, pagpalig-on sa Universal Health Care, ug paghatag og dugang katre, ekipo, ug benepisyo sa mga health workers.',
      highlights: [
        'Republic Act 11883 upgrading Simeon Toribio Hospital',
        'Bed capacity increases in Candijay & Jagna hospitals',
        'Magna Carta of Barangay Health Workers (BHWs)',
      ],
    },
  ];

  const committeeMemberships = [
    {
      committeeEn: 'Committee on Appropriations',
      committeeCeb: 'Komitiba sa Paggahin ug Pondo (Appropriations)',
      role: 'Member for the Majority',
      roleCeb: 'Miyembro sa Mayorya',
      icon: Scale,
      descEn:
        'Scrutiny and allocation of the annual national budget (General Appropriations Act) for district infrastructure, healthcare grants, and education subsidies.',
      descCeb:
        'Paggahin sa nasudnong pondo alang sa mga tulay, kalsada, ospital, ug scholarship sa Distrito 3.',
    },
    {
      committeeEn: 'Committee on Basic Education and Culture',
      committeeCeb: 'Komitiba sa Batakang Edukasyon ug Kultura',
      role: 'Member for the Majority',
      roleCeb: 'Miyembro sa Mayorya',
      icon: GraduationCap,
      descEn:
        'Classroom building programs, textbook accuracy review, teacher compensation, and preserving Bohol\'s cultural heritage.',
      descCeb:
        'Pagtukod og mga lawak-saringan, pagbantay sa kalidad sa libro sa DepEd, ug proteksyon sa kultura.',
    },
    {
      committeeEn: 'Committee on Overseas Workers Affairs',
      committeeCeb: 'Komitiba sa mga Mamumuo sa Gawas sa Nasud (OFW)',
      role: 'Member for the Majority',
      roleCeb: 'Miyembro sa Mayorya',
      icon: Globe,
      descEn:
        'Welfare protection, emergency repatriation, anti-human trafficking, and livelihood reintegration for Boholano and Filipino OFWs.',
      descCeb:
        'Proteksyon sa katungod ug kaayohan sa mga Boholano nga nanarbaho sa gawas sa nasud ug ilang pamilya.',
    },
    {
      committeeEn: 'Committee on Visayas Development',
      committeeCeb: 'Komitiba sa Pagpalambo sa Kabisay-an',
      role: 'Member for the Majority',
      roleCeb: 'Miyembro sa Mayorya',
      icon: Building2,
      descEn:
        'Inter-island connectivity, port modernizations, Bohol UNESCO Global Geopark eco-tourism corridors, and regional agro-industrial growth.',
      descCeb:
        'Pagsumpay-sumpay sa mga isla, pagpalambo sa mga pantalan, turismo sa geopark, ug patigayon sa Kabisay-an.',
    },
    {
      committeeEn: 'Special Committee on Globalization and WTO',
      committeeCeb: 'Espesyal nga Komitiba sa Globalisasyon ug WTO',
      role: 'Member for the Majority',
      roleCeb: 'Miyembro sa Mayorya',
      icon: Award,
      descEn:
        'Evaluating international trade impacts on domestic agricultural producers, local farmers, and micro-enterprises across central Philippines.',
      descCeb:
        'Panalipod sa mga lokal nga mag-uuma ug mangingisda batok sa dili patas nga kompetisyon sa imported nga produkto.',
    },
  ];

  // =========================================================================
  // PRINCIPAL AUTHORED BILLS (Official Record - congress.gov.ph/house-members/view/J075)
  // =========================================================================
  const principalAuthoredBills = [
    {
      billNumber: 'HB 8970 / RA 11883',
      category: 'health',
      categoryLabelEn: 'Health & Hospitals',
      categoryLabelCeb: 'Panglawas ug Ospital',
      statusEn: 'Enacted into Law (Republic Act No. 11883)',
      statusCeb: 'Nahimong Opisyal nga Balaod (RA 11883)',
      statusVariant: 'emerald' as const,
      titleEn:
        'An Act Increasing the Bed Capacity of Cong. Simeon G. Toribio Memorial Hospital in Carmen, Bohol',
      titleCeb:
        'Balaod sa Pagdugang sa Katre sa Cong. Simeon G. Toribio Memorial Hospital sa Carmen, Bohol',
      descEn:
        'Successfully enacted into law, expanding the hospital capacity from 40 to 75 beds, upgrading diagnostic equipment, intensive care suites, and medical personnel funding to serve the central interior municipalities of Bohol.',
      descCeb:
        'Opisyal nang balaod nga nagpadako sa pasilidad gikan sa 40 ngadto sa 75 ka katre, modernong ekipo sa laboratoryo ug ICU, ug dugang doktor ug nars alang sa interior nga mga lungsod.',
    },
    {
      billNumber: 'House Bill No. 2043',
      category: 'health',
      categoryLabelEn: 'Health & Hospitals',
      categoryLabelCeb: 'Panglawas ug Ospital',
      statusEn: 'Approved on Third Reading in the House',
      statusCeb: 'Naaprobahan sa Third Reading sa Ubos Balay-Balaoranan',
      statusVariant: 'orange' as const,
      titleEn:
        'An Act Upgrading Candijay Community Hospital into a Level I District Hospital',
      titleCeb:
        'Balaod sa Pag-upgrade sa Candijay Community Hospital Ngadto sa Level I District Hospital',
      descEn:
        'Elevating the municipal community hospital in Candijay into a full-fledged Level I District Hospital, increasing bed capacity from 10 to 50 beds with dedicated surgical, pediatric, and emergency facilities.',
      descCeb:
        'Pag-alsa sa tambalanan sa Candijay gikan sa 10 ngadto sa 50 ka katre nga adunay operahanan, ward sa kabataan, ug modernong emergency room alang sa silangang Bohol.',
    },
    {
      billNumber: 'House Bill No. 8494',
      category: 'health',
      categoryLabelEn: 'Health & Hospitals',
      categoryLabelCeb: 'Panglawas ug Ospital',
      statusEn: 'Approved on Third Reading in the House',
      statusCeb: 'Naaprobahan sa Third Reading sa Ubos Balay-Balaoranan',
      statusVariant: 'orange' as const,
      titleEn:
        'An Act Upgrading Teodoro B. Galagar District Hospital in Jagna, Bohol into a Level II Hospital',
      titleCeb:
        'Balaod sa Pag-upgrade sa Teodoro B. Galagar District Hospital sa Jagna Ngadto sa Level II',
      descEn:
        'Upgrading Jagna\'s primary district medical center from 75 to 100 beds, establishing specialized surgical units, expanded hemodialysis accommodations, and secondary laboratory accreditation.',
      descCeb:
        'Pagpadako sa katre gikan sa 75 ngadto sa 100 ug pagbutang og espesyalistang serbisyo sa operasyon ug hemodialysis sa lungsod sa Jagna.',
    },
    {
      billNumber: 'House Bill No. 7771',
      category: 'environment',
      categoryLabelEn: 'Tourism & Environment',
      categoryLabelCeb: 'Turismo ug Kinaiyahan',
      statusEn: 'Approved in Committee',
      statusCeb: 'Aprobado sa Komitiba',
      statusVariant: 'blue' as const,
      titleEn:
        'An Act Declaring Can-umantad Falls in Candijay, Bohol an Official Ecotourism Site',
      titleCeb:
        'Balaod sa Pagdeklarar sa Can-umantad Falls sa Candijay Isip Opisyal nga Ecotourism Site',
      descEn:
        'Declaring Bohol\'s tallest waterfall an official national ecotourism destination, mandating infrastructure investments from DOT and DPWH while enforcing strict ecological protection and local livelihood inclusion.',
      descCeb:
        'Pagdeklarar sa labing taas nga busay sa Bohol isip national ecotourism site aron mapundohan ang kalsada, pasilidad, ug panalipod sa kinaiyahan.',
    },
    {
      billNumber: 'House Bill No. 10438 / HB 831',
      category: 'environment',
      categoryLabelEn: 'Tourism & Environment',
      categoryLabelCeb: 'Turismo ug Kinaiyahan',
      statusEn: 'Under Committee Review & Plenary Action',
      statusCeb: 'Gipanday sa Komitiba ug Plenaryo',
      statusVariant: 'orange' as const,
      titleEn:
        'Chocolate Hills Natural Monument (CHNM) Protection & PAMB Governance Reform Act',
      titleCeb:
        'Balaod sa Pagpanalipod sa Chocolate Hills Natural Monument ug Reporma sa PAMB',
      descEn:
        'Prohibiting commercial desecration inside the Chocolate Hills Protected Area, reforming Protected Area Management Board (PAMB) clearances, and safeguarding Bohol\'s UNESCO Global Geopark designation.',
      descCeb:
        'Pagdili sa dili angay nga commercial structures sa Chocolate Hills, pag-usab sa proseso sa PAMB permits, ug pagpanalipod sa dungog sa Bohol isip UNESCO Global Geopark.',
    },
    {
      billNumber: 'House Bill No. 2047',
      category: 'education',
      categoryLabelEn: 'Education & Livelihood',
      categoryLabelCeb: 'Edukasyon ug Panginabuhian',
      statusEn: 'Approved on Third Reading',
      statusCeb: 'Naaprobahan sa Ikatulong Pagbasa',
      statusVariant: 'emerald' as const,
      titleEn:
        'An Act Establishing a TESDA Municipal Training Center in Candijay, Bohol',
      titleCeb:
        'Balaod sa Pagtukod og TESDA Provincial/Municipal Training Center sa Candijay',
      descEn:
        'Establishing a full technical-vocational skills training center in Candijay to provide free certified courses in automotive, welding, agro-processing, tourism, and digital technology for youth in District 3.',
      descCeb:
        'Pagtukod og opisyal nga sentro sa bansay sa TESDA sa Candijay aron libreng makat-on og bokasyonal nga kurso ang mga kabatan-onan sa distrito.',
    },
    {
      billNumber: 'House Bill No. 5041',
      category: 'welfare',
      categoryLabelEn: 'Social Welfare',
      categoryLabelCeb: 'Kaayohan sa Katawhan',
      statusEn: 'Harmonized into Priority Social Protection Laws',
      statusCeb: 'Nahiusa sa mga Balaod sa Proteksyon Sosyal',
      statusVariant: 'blue' as const,
      titleEn:
        'An Act Increasing the Monthly Social Pension of Indigent Senior Citizens',
      titleCeb:
        'Balaod sa Pagsaka sa Buwanang Pensiyon sa mga Kabus nga Senior Citizen',
      descEn:
        'Advocating for increased monthly stipends and wider eligibility thresholds for elderly citizens across the Philippines to cushion against medical inflation and cost of basic living.',
      descCeb:
        'Pagduso sa pagsaka sa binuwan nga pensiyon ug pagpasalipod sa mga katigulangan nga walay regular nga kita o pensiyon sa SSS/GSIS.',
    },
    {
      billNumber: 'House Bill No. 9764',
      category: 'civil_service',
      categoryLabelEn: 'Civil Service & PRC',
      categoryLabelCeb: 'Serbisyo Sibil ug PRC',
      statusEn: 'Priority Committee Measure',
      statusCeb: 'Prayoridad nga Balaodnon sa Komitiba',
      statusVariant: 'orange' as const,
      titleEn:
        'An Act Extending the Validity of Professional Regulation Commission (PRC) IDs from 3 to 5 Years',
      titleCeb:
        'Balaod sa Paglugway sa Validity sa PRC License IDs Gikan sa 3 Ngadto sa 5 ka Tuig',
      descEn:
        'Streamlining regulatory renewals for registered nurses, physical therapists, teachers, engineers, and professionals by extending PRC license validity from 3 to 5 years, reducing financial and travel burdens.',
      descCeb:
        'Pagpalugway sa lisensya sa mga propesyonal (PRC IDs) ngadto sa 5 ka tuig aron maminusan ang gasto ug hasol sa pag-renew matag tulo ka tuig.',
    },
    {
      billNumber: 'House Bill No. 1581',
      category: 'civil_service',
      categoryLabelEn: 'Civil Service & PRC',
      categoryLabelCeb: 'Serbisyo Sibil ug PRC',
      statusEn: 'Pending Committee Deliberation',
      statusCeb: 'Gihisgutan sa Komitiba',
      statusVariant: 'blue' as const,
      titleEn:
        'Automatic Civil Service Eligibility for Long-Term Casual, Contractual, and Job Order (JO) Workers',
      titleCeb:
        'Awtomatikong Civil Service Eligibility sa mga Casual, Contractual, ug Job Order Workers',
      descEn:
        'Granting appropriate civil service eligibility to dedicated casual and job order government personnel who have rendered years of uninterrupted, exemplary public service across local and national offices.',
      descCeb:
        'Paghatag og civil service eligibility sa mga kawani sa gobyerno nga dugay nang nagserbisyo isip casual o job order (JO) aron ma-regular sa trabaho.',
    },
    {
      billNumber: 'House Bill No. 5308',
      category: 'education',
      categoryLabelEn: 'Education & Livelihood',
      categoryLabelCeb: 'Edukasyon ug Panginabuhian',
      statusEn: 'Committee Deliberation',
      statusCeb: 'Gihisgutan sa Komitiba',
      statusVariant: 'blue' as const,
      titleEn:
        'National Book Development & DepEd Textbook Error Review and Correction Act',
      titleCeb:
        'Balaod sa Pagsubay ug Pagtul-id sa mga Kasaypanan sa mga Libro sa DepEd',
      descEn:
        'Enforcing stringent review standards and independent audits to identify, penalize, and rectify factual, grammatical, and historical errors in public school learning materials.',
      descCeb:
        'Pagsiguro nga sakto ug walay sayop ang mga libro ug learning modules nga gigamit sa mga tinun-an sa pampublikong tulunghaan sa nasud.',
    },
    {
      billNumber: 'House Bills No. 835, 838, & 840',
      category: 'health',
      categoryLabelEn: 'Health & Hospitals',
      categoryLabelCeb: 'Panglawas ug Ospital',
      statusEn: 'House Committee Action',
      statusCeb: 'Aksyon sa Komitiba',
      statusVariant: 'orange' as const,
      titleEn:
        'Magna Carta for Healthcare Professionals and Allied Health Salary Standardization',
      titleCeb:
        'Magna Carta sa mga Propesyonal sa Panglawas ug Pagsaka sa Sweldo sa Allied Health',
      descEn:
        'Mandating equitable salary grades, hazard pay, clinical development allowances, and legal protections for public physical therapists, medical technologists, pharmacists, and allied medical practitioners.',
      descCeb:
        'Pag-alsa sa suholan ug paghatag og hazard pay ug insentibo sa mga physical therapist, pharmacist, med tech, ug ubang kawani sa ospital.',
    },
  ];

  // =========================================================================
  // CO-AUTHORED LANDMARK ENACTED REPUBLIC ACTS (Official congress.gov.ph Record)
  // =========================================================================
  const coAuthoredLaws = [
    {
      lawNumber: 'Republic Act No. 11997',
      shortTitle: 'Kabalikat sa Pagtuturo Act',
      shortTitleCeb: 'Balaod Kabalikat sa Pagtuturo',
      icon: GraduationCap,
      descEn:
        'Institutionalizing an annual cash teaching supplies allowance for all public school teachers nationwide, increasing from ₱5,000 to ₱10,000 to relieve educators from out-of-pocket expenses for classroom instruction.',
      descCeb:
        'Pagpasar og balaod nga naghatag og ₱10,000 matag tuig nga teaching supplies allowance sa tanang magtutudlo sa pampublikong eskwelahan aron dili na sila mogasto sa kaugalingong bulsa.',
    },
    {
      lawNumber: 'Republic Act No. 11934',
      shortTitle: 'Subscriber Identity Module (SIM) Registration Act',
      shortTitleCeb: 'Balaod sa Rehistrasyon sa SIM Card',
      icon: ShieldCheck,
      descEn:
        'Mandatory registration of all active SIM cards with telecommunications providers to protect citizens against digital scam syndicates, mobile bank fraud, and cyber harassment.',
      descCeb:
        'Mandatory nga pagparehistro sa tanang SIM card aron sumpoon ang mga text scam, pagpangilad sa bangko pinaagi sa cellphone, ug cybercrime.',
    },
    {
      lawNumber: 'Republic Act No. 11223 & RA 11463',
      shortTitle: 'Universal Health Care & Malasakit Centers Act',
      shortTitleCeb: 'Universal Health Care ug Malasakit Centers',
      icon: Heart,
      descEn:
        'Championing zero-balance billing for indigent patients, comprehensive outpatient benefit packages, free dialysis treatment subsidies, and one-stop government financial assistance centers in all public hospitals.',
      descCeb:
        'Pagpatuman sa zero-balance billing sa mga kabus nga pasyente, libreng sesyon sa dialysis, ug usa ka tambayan nga tabang pinansyal sa mga pampublikong tambalanan.',
    },
    {
      lawNumber: 'Magna Carta of Barangay Health Workers (BHWs)',
      shortTitle: 'Grassroots Healthcare Frontliner Protection',
      shortTitleCeb: 'Proteksyon ug Kaayohan sa mga BHW',
      icon: Stethoscope,
      descEn:
        'Establishing standardized monthly honoraria, hazard pay, transportation allowances, PhilHealth enrollment, civil service eligibility credits, and security of tenure for volunteer barangay health workers.',
      descCeb:
        'Paghatag og desenteng binulan nga honorarium, hazard pay, PhilHealth, ug proteksyon batok sa kalit nga pagkatangtang sa trabaho sa mga BHW.',
    },
    {
      lawNumber: 'Magna Carta of Filipino Seafarers',
      shortTitle: 'Maritime Labor Protection & Safety Standards',
      shortTitleCeb: 'Proteksyon sa mga Marino nga Pilipino',
      icon: Award,
      descEn:
        'Comprehensive statutory protection guaranteeing fair employment contracts, just compensation, standard onboard living conditions, legal support, and medical repatriation for Filipino seafarers worldwide.',
      descCeb:
        'Komprehensibong panalipod sa suholan, desenteng puy-anan sa barko, ug tabang legal ug medikal alang sa tanang marinong Pilipino.',
    },
    {
      lawNumber: 'Republic Act No. 10932 Enforcement',
      shortTitle: 'Anti-Hospital Deposit Law Compliance',
      shortTitleCeb: 'Pahamtang sa Anti-Hospital Deposit Law',
      icon: FileText,
      descEn:
        'Strict statutory enforcement prohibiting hospitals and clinics from demanding monetary deposits or advance payments before administering emergency medical stabilization or pediatric care.',
      descCeb:
        'Pagdili sa mga ospital sa pagpangayo og deposito o advance nga bayad sa dili pa tambalan ang mga pasyente nga anaa sa emerhensiya.',
    },
  ];

  const filteredBills =
    billCategory === 'all'
      ? principalAuthoredBills
      : principalAuthoredBills.filter((b) => b.category === billCategory);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. ABOUT HERO BANNER (VERIFIED 19TH CONGRESS RECORD)
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-16 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{t('19th Congress of the Philippines • House Member Code: J075', 'Ika-19 nga Kongreso sa Pilipinas • Kodigo sa Miyembro: J075')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              {t('About Congresswoman Kristine Alexie Besas Tutor', 'Mahitungod kang Congresswoman Kristine Alexie Besas Tutor')}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed font-medium">
              {t(
                'Licensed Physical Therapist, Law Graduate, and Champion of Bohol\'s 3rd Congressional District. Serving as Chairperson of the Committee on Civil Service & Professional Regulation and Vice Chairperson of the Committee on Health.',
                'Lisensyadong Physical Therapist, Gradwado sa Balaod, ug Tingog sa 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol. Pangulo sa Committee on Civil Service & Professional Regulation ug Pangalawang Pangulo sa Committee on Health.'
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#committees"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-sm"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{t('Committee Leadership', 'Mga Komitiba sa Kongreso')}</span>
              </a>
              <a
                href="#bills"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-orange-200 text-slate-800 font-bold text-xs hover:bg-orange-50 transition-colors shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                <span>{t('Authored Bills & Enacted Laws', 'Mga Balaodnon ug Naipasang Balaod')}</span>
              </a>
              <a
                href="https://www.congress.gov.ph/house-members/view/J075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span>{t('Official Congress Record (J075)', 'Opisyal nga Rekord sa Kongreso')}</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BIOGRAPHY & PROFESSIONAL CREDENTIALS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Portrait & Credentials Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl blur-md opacity-30" />
              <div className="relative bg-white rounded-3xl p-6 border border-orange-100 shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt={INITIAL_SITE_SETTINGS.congresswoman_name}
                  className="w-full h-80 object-cover object-top rounded-2xl mb-5 shadow-sm"
                />

                <div className="space-y-4">
                  <div>
                    <div className="text-xl font-black text-slate-900">
                      Hon. Kristine Alexie Besas-Tutor
                    </div>
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-0.5">
                      {t(
                        'Representative • 3rd Congressional District of Bohol',
                        'Representante • Ikatulong Distrito sa Bohol'
                      )}
                    </div>
                  </div>

                  {/* Badges of Distinction */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 text-[11px] font-bold">
                      {t('Chairperson: Civil Service & PRC', 'Chairperson: Serbisyo Sibil ug PRC')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 text-[11px] font-bold">
                      {t('Vice Chairperson: Health', 'Vice Chairperson: Panglawas')}
                    </span>
                  </div>

                  {/* Structured Credentials */}
                  <div className="border-t border-slate-100 pt-3 text-xs text-slate-700 space-y-2">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Education & Profession', 'Edukasyon ug Propesyon')}:</strong>
                        <div className="text-slate-600">
                          {t(
                            'BS Physical Therapy (BSPT) — Velez College, Cebu City',
                            'BS Physical Therapy (BSPT) — Velez College, Dakbayan sa Sugbo'
                          )}
                        </div>
                        <div className="text-slate-600 font-medium">
                          {t(
                            'Licensed Physical Therapist (PRC) • Bachelor of Laws (LL.B)',
                            'Lisensyadong Physical Therapist (PRC) • Gradwado sa Balaod (LL.B)'
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Landmark className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Legislative Mandate', 'Mandato sa Kongreso')}:</strong>
                        <div className="text-slate-600">
                          {t('18th Congress (2019–2022) • 19th Congress (2022–Present)', 'Ika-18 nga Kongreso (2019–2022) • Ika-19 nga Kongreso (2022–Karon)')}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {t('House of Representatives Member Code: J075', 'Kodigo sa Balay Balaoranan: J075')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Prior Public Service', 'Nahiunang Serbisyo Publiko')}:</strong>
                        <div className="text-slate-600">
                          {t(
                            'Provincial Board Member, 3rd District of Bohol (2016–2019)',
                            'Miyembro sa Sangguniang Panlalawigan sa Bohol (2016–2019)'
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Jurisdiction', 'Distrito')}:</strong>
                        <div className="text-slate-600">
                          {t('19 Municipalities of Bohol District 3', '19 ka mga Lungsod sa Ikatulong Distrito')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct House Verification Link */}
                  <div className="pt-2">
                    <a
                      href="https://www.congress.gov.ph/house-members/view/J075"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 hover:bg-orange-100 font-bold text-xs transition-colors"
                    >
                      <span>{t('View Verified House Profile (J075)', 'Tan-awa ang Opisyal nga Profile sa Kongreso')}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <Badge variant="orange" size="sm">
                {t('Leadership & Public Service Journey', 'Panaw sa Pagserbisyo ug Pagpangulo')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('From Health Sciences & Legal Acumen to Congressional Leadership', 'Gikan sa Syensya sa Panglawas ug Balaod Ngadto sa Balay Balaoranan')}
              </h2>

              <p>
                {t(INITIAL_SITE_SETTINGS.bio_summary_en, INITIAL_SITE_SETTINGS.bio_summary_ceb)}
              </p>

              <p>
                {t(
                  'Armed with a Bachelor of Science in Physical Therapy from the prestigious Velez College in Cebu City and complemented by a Bachelor of Laws degree, Congresswoman Kristine Alexie Besas Tutor bridges clinical empathy with rigorous statutory expertise. Her scientific understanding of human rehabilitation informs her relentless passion for expanding rural healthcare facilities, while her legal training enables her to author and steer landmark national reforms through committee deliberations and plenary votes.',
                  'Gisangkapan sa degree sa Physical Therapy gikan sa Velez College sa Sugbo ug Bachelor of Laws, gihiusa ni Congresswoman Kristine Alexie Besas Tutor ang kasingkasing sa pagtambal ug kahait sa pagpanday sa balaod. Ang iyang kahibalo sa medisina maoy hinungdan sa iyang tinguha sa pagpalapad sa mga ospital, samtang ang iyang background sa balaod naghatag kaniya og gahum sa pagpanalipod sa mga kawani sa gobyerno ug pagduso og mga nasudnong balaod.'
                )}
              </p>

              <p>
                {t(
                  'Before her tenure in the House of Representatives, she served with distinction as a Provincial Board Member representing Bohol\'s 3rd District from 2016 to 2019. Elected to the 18th Congress in 2019 and decisively re-elected to the 19th Congress in 2022, Congw. Tutor earned national recognition as Chairperson of the vital Committee on Civil Service and Professional Regulation and Vice Chairperson of the Committee on Health.',
                  'Sa wala pa siya napili sa Kongreso, nagserbisyo siya isip Board Member sa Ikatulong Distrito sa Bohol gikan 2016 hangtod 2019. Napili sa Ika-18 nga Kongreso niadtong 2019 ug subling gisaligan sa Ika-19 nga Kongreso niadtong 2022, giila siya sa tibuok nasud pinaagi sa iyang pagka-Pangulo sa Committee on Civil Service and Professional Regulation ug Pangalawang Pangulo sa Committee on Health.'
                )}
              </p>

              <p>
                {t(
                  'Under her "Padayon ang Kumbati" banner, she translated policy into everyday grassroots relief: pioneering the zero-fare 4-van Patient Transport Vehicle (PTV) fleet running 24/7 across 19 towns, founding the Tambayan ni Kumbati in Tagbilaran City offering free air-conditioned lodging and meals for dialysis patients, building 259+ typhoon-proof concrete homes under Pabahay ni Kumbati, and funding college degrees for over 3,829 CHED-TDP scholars.',
                  'Ubos sa panultihon nga "Padayon ang Kumbati", gihubad niya ang balaod ngadto sa tinuod nga serbisyo: 4 ka libreng Patient Transport Vehicles (PTV) nga 24/7 nagbilar sa 19 ka lungsod, Tambayan ni Kumbati sa Tagbilaran alang sa dialysis patients, 259+ ka sementadong balay sa Pabahay ni Kumbati, ug scholarship sa 3,829+ ka mga batan-on.'
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/programs">
                <Button variant="primary" size="md" icon={<Heart className="w-4 h-4" />}>
                  {t('Explore 7 Flagship Programs', 'Tan-awa ang 7 ka Programa')}
                </Button>
              </Link>
              <Link to="/action-center">
                <Button variant="outline" size="md" icon={<ShieldCheck className="w-4 h-4" />}>
                  {t('Contact Action Center', 'Pakig-alayon sa Action Center')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. 19TH CONGRESS COMMITTEE LEADERSHIP & MEMBERSHIPS (OFFICIAL J075 RECORD)
         ===================================================================== */}
      <section id="committees" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" size="sm" dot>
            {t('Official 19th Congress Organization', 'Opisyal nga Organisasyon sa Ika-19 nga Kongreso')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            {t('House Committee Leadership & Memberships', 'Mga Pamunuan ug Komitiba sa Balay Balaoranan')}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {t(
              'Official committee appointments and leadership assignments of Rep. Kristine Alexie Besas Tutor as recorded in the House of Representatives of the Philippines (Member Code: J075).',
              'Opisyal nga katungdanan ug gisalig nga pamunuan sa mga komitiba kang Rep. Kristine Alexie Besas Tutor sumala sa talaan sa Ubos Balay-Balaoranan (Member Code: J075).'
            )}
          </p>
        </div>

        {/* Leadership Portfolios: Chairperson & Vice Chairperson */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {committeeLeadership.map((item, idx) => {
            const Icon = item.icon;
            const isChair = item.role === 'Chairperson';
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 border transition-all duration-300 shadow-md ${
                  isChair
                    ? 'bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white border-orange-300 shadow-orange-100 hover:shadow-xl'
                    : 'bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white border-emerald-300 shadow-emerald-100 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isChair
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                        : 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={item.statusVariant} size="md">
                    {t(item.role, item.roleCeb)}
                  </Badge>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {t(item.committeeEn, item.committeeCeb)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {t(item.descEn, item.descCeb)}
                </p>

                <div className="border-t border-slate-200/80 pt-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t('Key Policy Focus', 'Panguna nga Tutok sa Balaod')}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-700 flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChair ? 'text-orange-600' : 'text-emerald-600'}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Member for the Majority Committees */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="slate" size="sm">
              {t('Committee Memberships', 'Mga Komitiba Isip Miyembro')}
            </Badge>
            <span className="text-xs font-bold text-slate-600">
              {t('5 Majority Memberships in the 19th Congress', '5 ka Komitiba sa Mayorya sa Ika-19 nga Kongreso')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {committeeMemberships.map((comm, cIdx) => {
              const Icon = comm.icon;
              return (
                <div
                  key={cIdx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {t(comm.role, comm.roleCeb)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {t(comm.committeeEn, comm.committeeCeb)}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t(comm.descEn, comm.descCeb)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. LEGISLATIVE TRACK RECORD: PRINCIPAL AUTHORED & CO-AUTHORED LAWS
         ===================================================================== */}
      <section id="bills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="orange" size="sm" dot>
            {t('Official Legislative Portfolio', 'Opisyal nga Talaan sa mga Balaod')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            {t('Authored Bills & Landmark Enacted Laws', 'Mga Naipasang Balaod ug Gipanday nga Balaodnon')}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {t(
              'Comprehensive legislative achievements authored and co-authored by Congw. Kristine Alexie Besas Tutor to transform healthcare, education, civil service tenure, and environmental protection.',
              'Komprehensibong talaan sa mga balaod nga gipangamahanan ug gipaluyohan ni Congw. Alexie Tutor aron palambuon ang panglawas, edukasyon, trabaho, ug kinaiyahan.'
            )}
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('principal')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'principal'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('Principal Authored Bills', 'Panguna nga Gipanday nga Balaodnon')}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'principal' ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {principalAuthoredBills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coauthored')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'coauthored'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t('Co-Authored Landmark Laws', 'Gipaluyohan nga Landmark Republic Acts')}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'coauthored' ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {coAuthoredLaws.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Principal Authored Bills Content */}
        {activeTab === 'principal' && (
          <div className="space-y-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
              {[
                { id: 'all', labelEn: 'All Sectors', labelCeb: 'Tanan' },
                { id: 'health', labelEn: 'Health & Hospitals', labelCeb: 'Panglawas' },
                { id: 'civil_service', labelEn: 'Civil Service & PRC', labelCeb: 'Serbisyo Sibil' },
                { id: 'education', labelEn: 'Education & TESDA', labelCeb: 'Edukasyon' },
                { id: 'environment', labelEn: 'Environment & Tourism', labelCeb: 'Kinaiyahan' },
                { id: 'welfare', labelEn: 'Social Welfare', labelCeb: 'Kaayohan' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBillCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    billCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t(cat.labelEn, cat.labelCeb)}
                </button>
              ))}
            </div>

            {/* Bills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBills.map((bill, bIdx) => (
                <div
                  key={bIdx}
                  className="p-6 rounded-3xl bg-white border border-orange-100 shadow-sm hover:shadow-kumbati-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 text-xs font-black">
                        <FileText className="w-3.5 h-3.5 text-orange-600" />
                        <span>{bill.billNumber}</span>
                      </span>
                      <Badge variant={bill.statusVariant} size="sm">
                        {t(bill.statusEn, bill.statusCeb)}
                      </Badge>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {t(bill.titleEn, bill.titleCeb)}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t(bill.descEn, bill.descCeb)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-orange-600">
                      {t(bill.categoryLabelEn, bill.categoryLabelCeb)}
                    </span>
                    <span>{t('19th Congress Record', 'Talaan sa Ika-19 nga Kongreso')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Co-Authored Landmark Laws Content */}
        {activeTab === 'coauthored' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coAuthoredLaws.map((law, lIdx) => {
              const Icon = law.icon;
              return (
                <div
                  key={lIdx}
                  className="p-6 rounded-3xl bg-white border border-orange-100 shadow-sm hover:shadow-kumbati-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/60 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-xs font-black text-orange-600 uppercase tracking-wider mb-1">
                      {law.lawNumber}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {t(law.shortTitle, law.shortTitleCeb)}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t(law.descEn, law.descCeb)}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('Enacted & Serving the Public', 'Naipasa ug Nag-alagad sa Publiko')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Official House Verification Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>{t('Official Congress.gov.ph Profile', 'Opisyal nga Profile sa Kongreso')}</span>
            </div>
            <h4 className="text-xl font-black text-white">
              {t('Explore Rep. Kristine Alexie Besas Tutor\'s Complete Record', 'Susiha ang Tibuok Talaan ni Rep. Alexie Besas Tutor')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t(
                'Access all 300+ principal authored measures, 200+ co-authored bills, committee reports, and plenary session logs registered under House Member Code J075.',
                'Tan-awa ang kapin 300+ ka balaodnon, report sa komitiba, ug plenaryo ubos sa Opisyal nga Member Code J075 sa House of Representatives.'
              )}
            </p>
          </div>

          <a
            href="https://www.congress.gov.ph/house-members/view/J075"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-orange-500/20"
          >
            <span>{t('Open congress.gov.ph Profile', 'Ablihi ang congress.gov.ph Profile')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =====================================================================
          5. THE KUMBATI MANIFESTO & 5 PILLARS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>{t('Brand Manifesto', 'Ang Diwa sa KUMBATI')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t('What Does "KUMBATI" Mean?', 'Unsa ang Kahulogan sa "KUMBATI"?')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {t(
                '"KUMBATI" is the spirited Boholano rallying battle cry of tenacity, resilience, unity, and hope. It means fighting relentlessly for the welfare of the poor, working tirelessly without excuses, and showing up where help is needed most.',
                'Ang "KUMBATI" mao ang tawag sa panaghiusa, kaisug, ug paglahutay sa katawhang Boholano. Kini nagpasabot sa dili pag-surender sa kalisod, pag-alagad sa tiunay nga kasingkasing, ug paghatag og tinuod nga solusyon sa mga kabus.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-850/80 border border-slate-800 hover:border-orange-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {t(pillar.titleEn, pillar.titleCeb)}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t(pillar.descEn, pillar.descCeb)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. BOHOL DISTRICT 3 PROFILE & 19 TOWNS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-50/70 rounded-3xl p-8 sm:p-12 border border-orange-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="orange" size="sm">
                {t('Geographic Heritage', 'Kabilin sa Distrito')}
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {t(
                  'The 19 Municipalities of Bohol\'s 3rd Congressional District',
                  'Ang 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {t(
                  'Spanning the lush interior highlands down to the eastern coral seas of Bohol, District 3 is home to resilient farming communities, vibrant fishing cooperatives, iconic natural wonders like the Chocolate Hills in Carmen, white sand beaches in Anda, and historic coastal trading ports in Jagna and Loay.',
                  'Gikan sa kabukiran sa Carmen hangtod sa kadagatan sa Anda ug Jagna, ang Ikatulong Distrito nailhan sa kugihan nga mag-uuma, mangingisda, ug talagsaong katahom sa kinaiyahan.'
                )}
              </p>

              <div className="pt-2">
                <Link to="/directory">
                  <Button variant="primary" size="sm" icon={<MapPin className="w-4 h-4" />}>
                    {t('View 19-Town Municipal Directory & Hotlines', 'Tan-awa ang Direktoryo sa 19 ka Lungsod')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center justify-between">
                  <span>{t('Municipalities List', 'Listahan sa mga Lungsod')}</span>
                  <span className="text-orange-600 font-bold">19 Towns</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                    <Link
                      key={town}
                      to={`/directory?town=${encodeURIComponent(town)}`}
                      className="p-1.5 rounded-lg bg-orange-50/50 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-semibold transition-colors flex items-center justify-between"
                    >
                      <span>{town}</span>
                      <ChevronRight className="w-3 h-3 text-orange-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
