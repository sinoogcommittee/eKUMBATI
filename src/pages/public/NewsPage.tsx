import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { INITIAL_NEWS_ANNOUNCEMENTS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { NewsAnnouncement, AnnouncementCategory } from '../../types/kumbati.types';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Bell,
  Search,
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
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<NewsAnnouncement[]>(INITIAL_NEWS_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory | 'all'>('all');
  const [selectedTown, setSelectedTown] = useState<string>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<NewsAnnouncement | null>(null);

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
        // Ignore
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
            // Map db columns to interface
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

  // Filtered list
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesTown =
        selectedTown === 'all' ||
        (item.target_towns &&
          (item.target_towns.includes('District-wide') ||
            item.target_towns.some((t) => t.toLowerCase() === selectedTown.toLowerCase())));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title_en.toLowerCase().includes(query) ||
        item.title_ceb.toLowerCase().includes(query) ||
        item.excerpt_en.toLowerCase().includes(query) ||
        item.excerpt_ceb.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query);

      return matchesCategory && matchesTown && matchesSearch;
    });
  }, [announcements, selectedCategory, selectedTown, searchQuery]);

  // Urgent pinned post
  const urgentPinnedPost = useMemo(() => {
    return announcements.find((a) => a.is_pinned && a.priority === 'urgent');
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

  const categories: { id: AnnouncementCategory | 'all'; labelEn: string; labelCeb: string }[] = [
    { id: 'all', labelEn: 'All Updates', labelCeb: 'Tanan nga Pahibalo' },
    { id: 'advisory', labelEn: 'Advisories', labelCeb: 'Pahibalo' },
    { id: 'payout_schedule', labelEn: 'Payout Schedules', labelCeb: 'Payout' },
    { id: 'medical_mission', labelEn: 'Medical Missions', labelCeb: 'Klinika' },
    { id: 'legislative', labelEn: 'Legislative News', labelCeb: 'Balaod' },
    { id: 'general', labelEn: 'General News', labelCeb: 'Kinatibuk-an' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* =====================================================================
          1. HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Bell className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
              <span>{t('Official District Bulletins & Advisories', 'Opisyal nga mga Pahibalo ug Balita sa Distrito')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t('News, Updates & Public Announcements', 'Mga Balita, Pahibalo, ug Kasayuran sa Distrito')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
              {t(
                'Stay updated with official statements, emergency dispatch notices, scholarship payout schedules, medical mission dates, and district projects from the Office of Congresswoman Alexie Besas Tutor.',
                'Magpabiling updated sa mga opisyal nga pamahayag, alerto sa PTV, eskedyul sa payout sa scholarship, mga libreng klinika, ug proyekto gikan sa Opisina ni Congw. Alexie Besas Tutor.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. URGENT PINNED ADVISORY BANNER (IF ACTIVE)
         ===================================================================== */}
      {urgentPinnedPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white shadow-xl overflow-hidden border border-red-400/40">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

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

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(urgentPinnedPost)}
                  className="px-5 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-xs sm:text-sm transition-all shadow-md hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t('Read Full Advisory', 'Basaha ang Tibuok Pahibalo')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. SEARCH & SECTOR FILTERS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'Search announcements, payouts, medical missions, or keywords...',
                  'Pangitaa ang mga pahibalo, payout, medical mission, o pulong...'
                )}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Municipality Filter Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
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

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Category', 'Kategoriya')}:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-kumbati scale-102'
                    : 'bg-slate-100 hover:bg-orange-50 text-slate-700'
                }`}
              >
                {t(cat.labelEn, cat.labelCeb)}
              </button>
            ))}
          </div>
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
          <div className="p-12 text-center bg-white rounded-3xl border border-orange-100 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {t('No announcements found', 'Walay nakit-an nga pahibalo')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t(
                'Try clearing your search terms or selecting a different category or municipality filter.',
                'Sulayi pag-usab ang imong gipangita o usba ang kategoriya o lungsod.'
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTown('all');
              }}
            >
              {t('Reset Filters', 'I-reset ang Salain')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              const catLabel = getCategoryLabel(post.category);

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-kumbati-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Featured Image */}
                    {post.image_url ? (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={post.image_url}
                          alt={t(post.title_en, post.title_ceb)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {post.priority === 'urgent' && (
                            <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Urgent</span>
                            </span>
                          )}
                          {post.is_pinned && post.priority !== 'urgent' && (
                            <span className="px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Pinned</span>
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                            {t(catLabel.en, catLabel.ceb)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50/40 border-b border-orange-100/60 flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 text-orange-700 text-[10px] font-bold">
                          {t(catLabel.en, catLabel.ceb)}
                        </span>
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-500" />
                          <span>{post.publish_date}</span>
                        </span>
                        <span className="truncate max-w-[140px]">{post.author}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                        {t(post.title_en, post.title_ceb)}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {t(post.excerpt_en, post.excerpt_ceb)}
                      </p>

                      {/* Target Towns Tag */}
                      {post.target_towns && post.target_towns.length > 0 && (
                        <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate font-semibold">
                            {post.target_towns.includes('District-wide')
                              ? t('District-wide Coverage', 'Tibuok Distrito 3')
                              : post.target_towns.slice(0, 3).join(', ') +
                                (post.target_towns.length > 3 ? ` +${post.target_towns.length - 3}` : '')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                    <button
                      type="button"
                      onClick={() => setSelectedAnnouncement(post)}
                      className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white font-bold text-xs transition-all cursor-pointer group/btn"
                    >
                      <span>{t('Read Full Announcement', 'Basaha ang Tibuok Pahibalo')}</span>
                      <ChevronRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================================
          5. DETAILED ANNOUNCEMENT MODAL
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
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
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
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedAnnouncement.publish_date}</span>
              </span>
            </div>

            {/* Modal Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {t(selectedAnnouncement.title_en, selectedAnnouncement.title_ceb)}
              </h2>
              {selectedAnnouncement.target_towns && selectedAnnouncement.target_towns.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {t('Covered Areas', 'Sakop nga mga Lungsod')}:{' '}
                    {selectedAnnouncement.target_towns.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Full Content (Multi-paragraph formatted) */}
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed max-h-96 overflow-y-auto pr-2 scrollbar-thin">
              {t(selectedAnnouncement.content_en, selectedAnnouncement.content_ceb)
                .split('\n\n')
                .map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Action Bar: Print, Share, Hotlines */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('Print Bulletin', 'I-print ang Pahibalo')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: t(selectedAnnouncement.title_en, selectedAnnouncement.title_ceb),
                        text: t(selectedAnnouncement.excerpt_en, selectedAnnouncement.excerpt_ceb),
                        url: window.location.href,
                      });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('Share', 'I-share')}</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                <span>{t('Office of Congw. Alexie Besas Tutor', 'Opisina ni Congw. Alexie Besas Tutor')}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewsPage;
