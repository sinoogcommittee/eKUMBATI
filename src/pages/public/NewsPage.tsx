import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { INITIAL_NEWS_ANNOUNCEMENTS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { NewsAnnouncement, AnnouncementCategory } from '../../types/kumbati.types';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Card, SearchBar } from '../../components/m3';
import { useToast } from '../../context/ToastContext';
import { triggerHaptic } from '../../lib/haptics';
import {
  Bell,
  Filter,
  Calendar,
  User,
  MapPin,
  ChevronRight,
  AlertTriangle,
  FileText,
  Share2,
  Printer,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  GraduationCap,
  Landmark,
  ShieldAlert,
  Check,
  RotateCcw,
} from 'lucide-react';

type FilterCategoryKey = 'all' | 'urgent' | AnnouncementCategory;

interface CategoryFilterTab {
  id: FilterCategoryKey;
  labelEn: string;
  labelCeb: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const NewsPage: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [announcements, setAnnouncements] = useState<NewsAnnouncement[]>(INITIAL_NEWS_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryKey>('all');
  const [selectedTown, setSelectedTown] = useState<string>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<NewsAnnouncement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch announcements from Supabase with offline fallback
  useEffect(() => {
    let isMounted = true;

    const fetchAnnouncements = async () => {
      setLoading(true);

      // Check for local storage additions (offline CMS fallback)
      let localOfflineList: NewsAnnouncement[] = [];
      try {
        const stored = localStorage.getItem('kumbati_offline_news');
        if (stored) {
          localOfflineList = JSON.parse(stored);
        }
      } catch {
        // Ignore JSON parse errors
      }

      if (!isSupabaseConfigured) {
        if (isMounted) {
          const merged = localOfflineList.length > 0
            ? [...localOfflineList, ...INITIAL_NEWS_ANNOUNCEMENTS.filter(a => !localOfflineList.some(o => o.id === a.id))]
            : INITIAL_NEWS_ANNOUNCEMENTS;
          setAnnouncements(merged);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('news_announcements')
          .select('*')
          .eq('is_published', true)
          .order('is_pinned', { ascending: false })
          .order('publish_date', { ascending: false });

        if (error) throw error;

        if (isMounted) {
          if (data && data.length > 0) {
            const formatted: NewsAnnouncement[] = data.map((item) => ({
              id: item.id,
              title_en: item.title_en,
              title_ceb: item.title_ceb,
              excerpt_en: item.excerpt_en,
              excerpt_ceb: item.excerpt_ceb,
              content_en: item.content_en,
              content_ceb: item.content_ceb,
              category: (item.category as AnnouncementCategory) || 'advisory',
              priority: (item.priority as NewsAnnouncement['priority']) || 'normal',
              author: item.author,
              publish_date: item.publish_date,
              image_url: item.image_url || undefined,
              attachment_url: item.attachment_url || undefined,
              is_pinned: item.is_pinned ?? false,
              is_published: item.is_published ?? true,
              target_towns: item.target_towns || ['District-wide'],
              created_at: item.created_at,
              updated_at: item.updated_at,
            }));
            setAnnouncements(formatted);
          } else {
            setAnnouncements(INITIAL_NEWS_ANNOUNCEMENTS);
          }
        }
      } catch {
        if (isMounted) {
          setAnnouncements(INITIAL_NEWS_ANNOUNCEMENTS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  // Deep-linking: auto-open announcement modal if ?id=xxx or #xxx is in URL
  useEffect(() => {
    if (announcements.length === 0) return;

    try {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id') || window.location.hash.replace(/^#/, '');
      if (urlId) {
        const found = announcements.find((a) => a.id === urlId);
        if (found) {
          setSelectedAnnouncement(found);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, [announcements]);

  // Urgent pinned post for top hero alert
  const urgentPinnedPost = useMemo(() => {
    return announcements.find((a) => a.is_pinned && a.priority === 'urgent');
  }, [announcements]);

  // Only display the hero urgent banner when user is on the default view (not actively searching or filtered)
  const isDefaultView = useMemo(() => {
    return !searchQuery.trim() && selectedCategory === 'all' && selectedTown === 'all';
  }, [searchQuery, selectedCategory, selectedTown]);

  const showUrgentHeroBanner = Boolean(urgentPinnedPost && isDefaultView);

  // Dynamic filtered announcements list
  const filteredAnnouncements = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return announcements.filter((item) => {
      // 1. Duplicate Elimination:
      // If the urgent pinned announcement is already displayed in the top hero banner on default view,
      // filter it out from the main feed below so constituents never see duplicate cards on initial load.
      if (showUrgentHeroBanner && urgentPinnedPost && item.id === urgentPinnedPost.id) {
        return false;
      }

      // 2. Category / Urgent Filter
      if (selectedCategory === 'urgent') {
        const isUrgent = item.priority === 'urgent' || item.category === 'disaster_alert';
        if (!isUrgent) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // 3. Municipality / Town Filter
      if (selectedTown !== 'all') {
        const towns = item.target_towns || [];
        const matchesTown =
          towns.includes('District-wide') ||
          towns.some((t) => t.toLowerCase() === selectedTown.toLowerCase());
        if (!matchesTown) return false;
      }

      // 4. Client-side Search Query Filter (Title, Excerpt, Content, Author, Towns)
      if (query) {
        const matches =
          item.title_en.toLowerCase().includes(query) ||
          item.title_ceb.toLowerCase().includes(query) ||
          item.excerpt_en.toLowerCase().includes(query) ||
          item.excerpt_ceb.toLowerCase().includes(query) ||
          item.content_en.toLowerCase().includes(query) ||
          item.content_ceb.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          (item.target_towns && item.target_towns.some((t) => t.toLowerCase().includes(query)));
        if (!matches) return false;
      }

      return true;
    });
  }, [announcements, selectedCategory, selectedTown, searchQuery, showUrgentHeroBanner, urgentPinnedPost]);

  // Compute live match count for each filter category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: announcements.length, urgent: 0 };
    announcements.forEach((a) => {
      if (a.priority === 'urgent' || a.category === 'disaster_alert') {
        counts.urgent = (counts.urgent || 0) + 1;
      }
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [announcements]);

  const getCategoryIcon = (category: AnnouncementCategory) => {
    switch (category) {
      case 'medical_mission':
        return Stethoscope;
      case 'payout_schedule':
        return GraduationCap;
      case 'legislative':
        return Landmark;
      case 'disaster_alert':
        return ShieldAlert;
      case 'advisory':
        return Bell;
      case 'general':
      default:
        return HeartHandshake;
    }
  };

  const getCategoryLabel = (category: AnnouncementCategory) => {
    switch (category) {
      case 'medical_mission':
        return { en: 'Medical Mission', ceb: 'Serbisyo Medikal' };
      case 'payout_schedule':
        return { en: 'Payout Schedule', ceb: 'Eskedyul sa Payout' };
      case 'legislative':
        return { en: 'Legislative Update', ceb: 'Balita sa Balaod' };
      case 'disaster_alert':
        return { en: 'Disaster Alert', ceb: 'Alerto sa Kalamidad' };
      case 'advisory':
        return { en: 'Public Advisory', ceb: 'Opisyal nga Pahibalo' };
      case 'general':
      default:
        return { en: 'District Update', ceb: 'Kasayuran sa Distrito' };
    }
  };

  const categoryFilterTabs: CategoryFilterTab[] = [
    { id: 'all', labelEn: 'All Updates', labelCeb: 'Tanan nga Pahibalo' },
    { id: 'urgent', labelEn: 'Urgent Alerts', labelCeb: 'Dinalian nga Alerto', icon: AlertTriangle },
    { id: 'payout_schedule', labelEn: 'Payout Schedules', labelCeb: 'Eskedyul sa Payout', icon: GraduationCap },
    { id: 'medical_mission', labelEn: 'Medical & Health', labelCeb: 'Medikal & Klinika', icon: Stethoscope },
    { id: 'legislative', labelEn: 'Press & Legislative', labelCeb: 'Balaod & Pamahayag', icon: Landmark },
    { id: 'advisory', labelEn: 'Public Advisories', labelCeb: 'Opisyal nga Pahibalo', icon: Bell },
    { id: 'general', labelEn: 'General News', labelCeb: 'Kinatibuk-an', icon: HeartHandshake },
  ];

  // Social Share & Copy Link Handler
  const handleShare = async (item: NewsAnnouncement) => {
    const shareUrl = `${window.location.origin}/news?id=${encodeURIComponent(item.id)}`;
    const shareTitle = `${t(item.title_en, item.title_ceb)} | e-KUMBATI Bohol 3rd District`;
    const shareText = t(item.excerpt_en, item.excerpt_ceb);

    // Try Web Share API (mobile devices, supported desktop browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Clipboard API
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = shareUrl;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopiedId(item.id);
      showToast(t('Announcement link copied to clipboard!', 'Nahi-kopya ang link sa pahibalo!'), 'info');
      setTimeout(() => {
        setCopiedId((curr) => (curr === item.id ? null : curr));
      }, 2500);
    } catch {
      // Ignore copy errors
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTown('all');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-32 sm:pb-36">
      {/* =====================================================================
          1. HERO HEADER BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs border border-orange-200/70">
              <Bell className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
              <span>{t('Official District Bulletins & Advisories', 'Opisyal nga mga Pahibalo ug Balita sa Distrito')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t('News, Updates & Public Announcements', 'Mga Balita, Pahibalo, ug Kasayuran sa Distrito')}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed font-medium">
              {t(
                'Stay updated with official statements, emergency dispatch notices, scholarship payout schedules, medical mission dates, and district projects from the Office of Congresswoman Alexie Besas Tutor.',
                'Magpabiling updated sa mga opisyal nga pamahayag, alerto sa PTV, eskedyul sa payout sa scholarship, mga libreng klinika, ug proyekto gikan sa Opisina ni Congw. Alexie Besas Tutor.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. URGENT PINNED ADVISORY BANNER (ELIMINATES DUPLICATE IN FEED)
         ===================================================================== */}
      {showUrgentHeroBanner && urgentPinnedPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-sinoog-raised overflow-hidden border border-red-400/50">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white text-red-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                    <span>{t('Urgent Advisory', 'Dinalian nga Pahibalo')}</span>
                  </span>
                  <span className="text-xs text-amber-100 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{urgentPinnedPost.publish_date}</span>
                  </span>
                  <span className="text-xs text-amber-100 font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{urgentPinnedPost.author}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {t(urgentPinnedPost.title_en, urgentPinnedPost.title_ceb)}
                </h3>

                <p className="text-xs sm:text-sm text-red-50 leading-relaxed">
                  {t(urgentPinnedPost.excerpt_en, urgentPinnedPost.excerpt_ceb)}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(urgentPinnedPost)}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-white text-red-700 hover:bg-red-50 font-black text-xs sm:text-sm shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <span>{t('Read Full Advisory', 'Basaha ang Tibuok Pahibalo')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => handleShare(urgentPinnedPost)}
                    aria-label={t('Share Advisory', 'I-share ang Alerto')}
                    title={copiedId === urgentPinnedPost.id ? t('Link Copied!', 'Nahi-kopya na!') : t('Share Alert', 'I-share ang Alerto')}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                  >
                    {copiedId === urgentPinnedPost.id ? (
                      <Check className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                  {copiedId === urgentPinnedPost.id && (
                    <div className="absolute -top-9 right-0 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-30 pointer-events-none flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{t('Link Copied!', 'Nahi-kopya na!')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. DYNAMIC SEARCH & CATEGORY FILTER BAR
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-orange-200/80 shadow-sinoog space-y-4 backdrop-blur-md">
          {/* Top Row: Search Input & Municipality Selector */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <SearchBar
                label={t('Search announcements', 'Pangitaa ang mga pahibalo')}
                value={searchQuery}
                onValueChange={(val) => setSearchQuery(val)}
                placeholder={t(
                  'Search announcements, payouts, medical missions, or keywords...',
                  'Pangitaa ang mga pahibalo, payout, medical mission, o pulong...'
                )}
              />
            </div>

            {/* Municipality Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs min-h-[44px]"
              >
                <option value="all">{t('District-wide & All 19 Towns', 'Tibuok Distrito & 19 ka Lungsod')}</option>
                {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills (Soft Edge Fade + Hidden Horizontal Scrollbar with Smooth Touch) */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1.5 scroll-fade-edges [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">{t('Category', 'Kategoriya')}:</span>
            </span>

            {categoryFilterTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              const count = tab.id === 'all'
                ? announcements.length
                : tab.id === 'urgent'
                ? categoryCounts.urgent || 0
                : categoryCounts[tab.id] || 0;
              const TabIcon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedCategory(tab.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer min-h-[38px] ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog'
                      : 'bg-slate-50 hover:bg-orange-50/80 text-slate-700 hover:text-orange-700 border border-slate-200/80 hover:border-orange-300'
                  }`}
                >
                  {TabIcon && <TabIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-600'}`} />}
                  <span>{t(tab.labelEn, tab.labelCeb)}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isSelected ? 'bg-white/25 text-white' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Filter State Summary / Reset Quick Bar */}
          {(!isDefaultView) && (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-50">
              <div className="flex items-center gap-1.5 font-medium">
                <span>{t('Showing', 'Gipakita')}:</span>
                <span className="font-bold text-orange-600">
                  {filteredAnnouncements.length} {t('bulletins', 'mga pahibalo')}
                </span>
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[11px] font-bold">
                    {categoryFilterTabs.find((c) => c.id === selectedCategory)?.labelEn}
                  </span>
                )}
                {selectedTown !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                    📍 {selectedTown}
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="italic text-slate-500">
                    &ldquo;{searchQuery.trim()}&rdquo;
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('Clear All Filters', 'I-reset ang Tanan')}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          4. ANNOUNCEMENTS CARDS GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text={t('Loading district bulletins...', 'Gikarga ang mga pahibalo...')} />
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-orange-100 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {t('No announcements found', 'Walay nakit-an nga pahibalo')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {t(
                'Try clearing your search terms or selecting a different category or municipality filter.',
                'Sulayi pag-usab ang imong gipangita o usba ang kategoriya o lungsod.'
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleResetFilters}
            >
              {t('Reset Filters', 'I-reset ang Salain')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              const catLabel = getCategoryLabel(post.category);
              const isUrgent = post.priority === 'urgent' || post.category === 'disaster_alert';

              return (
                <Card
                  key={post.id}
                  as="article"
                  variant="filled"
                  className="overflow-hidden p-0 flex flex-col justify-between group rounded-3xl border border-orange-200/80 border-t-white bg-gradient-to-b from-white via-white/98 to-amber-50/20 shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Featured Image or Visual Header */}
                    {post.image_url ? (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-orange-100/60">
                        <img
                          src={post.image_url}
                          alt={t(post.title_en, post.title_ceb)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {isUrgent && (
                            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Urgent</span>
                            </span>
                          )}
                          {post.is_pinned && !isUrgent && (
                            <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Pinned</span>
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                            {t(catLabel.en, catLabel.ceb)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/20 border-b border-orange-100/60 flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isUrgent && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                              Urgent
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-full bg-white border border-orange-200 text-orange-700 text-[10px] font-bold shadow-2xs">
                            {t(catLabel.en, catLabel.ceb)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Post Body Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-500" />
                          <span>{post.publish_date}</span>
                        </span>
                        <span className="truncate max-w-[140px] font-semibold text-slate-600">{post.author}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {t(post.title_en, post.title_ceb)}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {t(post.excerpt_en, post.excerpt_ceb)}
                      </p>

                      {/* Covered Municipalities Tag */}
                      {post.target_towns && post.target_towns.length > 0 && (
                        <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate font-semibold text-slate-600">
                            {post.target_towns.includes('District-wide')
                              ? t('District-wide Coverage', 'Tibuok Distrito 3')
                              : post.target_towns.slice(0, 3).join(', ') +
                                (post.target_towns.length > 3 ? ` +${post.target_towns.length - 3}` : '')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Dual Actions (Read Full Bulletin + Social Share/Copy Link) */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAnnouncement(post)}
                      className="flex-1 inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-orange-50/90 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 text-orange-700 hover:text-white font-bold text-xs shadow-2xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group/btn min-h-[44px]"
                    >
                      <span>{t('Read Full Bulletin', 'Basaha ang Pahibalo')}</span>
                      <ChevronRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-colors" />
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => handleShare(post)}
                        aria-label={t('Share announcement link', 'I-share ang link sa pahibalo')}
                        title={copiedId === post.id ? t('Link Copied!', 'Nahi-kopya na!') : t('Share / Copy Link', 'I-share / Kopyaha ang Link')}
                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 ${
                          copiedId === post.id
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-xs'
                            : 'bg-white hover:bg-orange-50 border-slate-200/90 hover:border-orange-400 text-slate-600 hover:text-orange-600 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        {copiedId === post.id ? (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>

                      {/* Tooltip feedback for clipboard copy */}
                      {copiedId === post.id && (
                        <div className="absolute -top-9 right-0 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-30 pointer-events-none flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{t('Link Copied!', 'Nahi-kopya na!')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================================
          5. DETAILED ANNOUNCEMENT MODAL WITH MULTI-PARAGRAPH FORMATTING
         ===================================================================== */}
      {selectedAnnouncement && (
        <Modal
          isOpen={!!selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
          title={t('Official District Bulletin', 'Opisyal nga Pahibalo sa Distrito')}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Modal Image */}
            {selectedAnnouncement.image_url && (
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                <img
                  src={selectedAnnouncement.image_url}
                  alt={t(selectedAnnouncement.title_en, selectedAnnouncement.title_ceb)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={selectedAnnouncement.priority === 'urgent' ? 'red' : 'orange'} size="sm">
                  {t(
                    getCategoryLabel(selectedAnnouncement.category).en,
                    getCategoryLabel(selectedAnnouncement.category).ceb
                  )}
                </Badge>
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  <span>{selectedAnnouncement.author}</span>
                </span>
              </div>
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>{selectedAnnouncement.publish_date}</span>
              </span>
            </div>

            {/* Modal Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {t(selectedAnnouncement.title_en, selectedAnnouncement.title_ceb)}
              </h2>
              {selectedAnnouncement.target_towns && selectedAnnouncement.target_towns.length > 0 && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t('Covered Municipalities', 'Sakop nga mga Lungsod')}:{' '}
                    {selectedAnnouncement.target_towns.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Full Content */}
            <div className="space-y-3.5 text-sm text-slate-700 leading-relaxed max-h-96 overflow-y-auto pr-2 scrollbar-thin">
              {t(selectedAnnouncement.content_en, selectedAnnouncement.content_ceb)
                .split('\n\n')
                .map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Modal Action Bar: Print, Share & Office Attribution */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-orange-300 transition-colors cursor-pointer min-h-[40px]"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('Print Bulletin', 'I-print ang Pahibalo')}</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => handleShare(selectedAnnouncement)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-700 transition-colors cursor-pointer min-h-[40px]"
                  >
                    {copiedId === selectedAnnouncement.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>
                      {copiedId === selectedAnnouncement.id
                        ? t('Link Copied!', 'Nahi-kopya na!')
                        : t('Share Link', 'I-share ang Link')}
                    </span>
                  </button>

                  {copiedId === selectedAnnouncement.id && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-30 pointer-events-none flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{t('Link Copied!', 'Nahi-kopya na!')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                <span>{t('Office of Congresswoman Alexie Besas Tutor', 'Opisina ni Congw. Alexie Besas Tutor')}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewsPage;
