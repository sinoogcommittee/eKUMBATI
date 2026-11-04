import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_ALBUMS, INITIAL_GALLERY_MEDIA, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { GalleryMedia } from '../../types/kumbati.types';
import Badge from '../../components/common/Badge';
import {
  Image as ImageIcon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Tag,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTown, setSelectedTown] = useState<string>('All');
  const [lightboxMedia, setLightboxMedia] = useState<GalleryMedia | null>(null);

  const categories = ['All', 'Housing', 'Health', 'Education', 'Community'];

  // Filter media based on album attributes
  const filteredMedia = INITIAL_GALLERY_MEDIA.filter((item) => {
    const parentAlbum = INITIAL_ALBUMS.find((a) => a.id === item.album_id);
    if (!parentAlbum) return true;

    const matchCategory =
      selectedCategory === 'All' || parentAlbum.category === selectedCategory;
    const matchTown =
      selectedTown === 'All' || parentAlbum.municipality === selectedTown;

    return matchCategory && matchTown;
  });

  const handleNextMedia = () => {
    if (!lightboxMedia) return;
    const currentIndex = filteredMedia.findIndex((m) => m.id === lightboxMedia.id);
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    setLightboxMedia(filteredMedia[nextIndex]);
  };

  const handlePrevMedia = () => {
    if (!lightboxMedia) return;
    const currentIndex = filteredMedia.findIndex((m) => m.id === lightboxMedia.id);
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setLightboxMedia(filteredMedia[prevIndex]);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* =====================================================================
          1. GALLERY HERO BANNER
         ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Photo & Media Repository', 'Galeriya sa mga Hulagway')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mt-3">
              {t('KUMBATI in Action: Photo Documentation', 'KUMBATI sa Aksyon: Mga Hulagway')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'Explore high-resolution visual archives of Pabahay turnovers, 24/7 Patient Transport dispatches, medical missions, and college scholarship payouts.',
                'Susiha ang mga hulagway sa pagtugyan sa balay, pag-atiman sa pasyente sa PTV, libreng klinika, ug paghatag og hinabang sa mga iskolar.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ALBUMS & PHOTO GALLERY GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 shrink-0 pr-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Category', 'Kategoriya')}:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Town Filter Dropdown */}
          <div className="shrink-0">
            <select
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="All">{t('All 19 Municipalities', 'Tanan nga 19 ka Lungsod')}</option>
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Albums Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-orange-600" />
              <span>{t('Documented Albums', 'Mga Album sa Distrito')}</span>
            </h3>
            <span className="text-xs text-slate-500 tabular-nums">
              {INITIAL_ALBUMS.length} {t('albums cataloged', 'mga album')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_ALBUMS.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-150 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={album.cover_image_url}
                    alt={album.title_en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant="orange" size="sm">
                      {album.category}
                    </Badge>
                  </div>
                  {album.municipality && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-medium">
                        {album.municipality}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{album.event_date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
                      {t(album.title_en, album.title_ceb)}
                    </h4>
                  </div>
                  <div className="text-xs text-orange-600 font-medium pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="tabular-nums">{album.media_count || 3} photos</span>
                    <span>Browse Album &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              {t('Photo Stream', 'Mga Litrato')}
            </h3>
            <span className="text-xs text-slate-500 tabular-nums">
              {filteredMedia.length} {t('photos shown', 'mga litrato')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((media) => {
              const parentAlbum = INITIAL_ALBUMS.find((a) => a.id === media.album_id);

              return (
                <div
                  key={media.id}
                  onClick={() => setLightboxMedia(media)}
                  className="group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer transition-shadow duration-150"
                >
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={media.media_url}
                      alt={media.caption_en || 'KUMBATI photo'}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center text-white">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 backdrop-blur-xs">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {parentAlbum && (
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium">
                          {parentAlbum.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Caption & Tag bar */}
                  <div className="p-4">
                    <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
                      {t(media.caption_en || '', media.caption_ceb || '')}
                    </p>
                    {media.tags && media.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {media.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            <Tag className="w-2.5 h-2.5 text-slate-400" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FULLSCREEN LIGHTBOX MODAL
         ===================================================================== */}
      {lightboxMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevMedia}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 text-white/70 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMedia}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-white/70 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Media Container */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            <img
              src={lightboxMedia.media_url}
              alt={lightboxMedia.caption_en || 'Preview'}
              className="max-h-[68vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            {/* Lightbox Caption & Details */}
            <div className="mt-4 text-center max-w-2xl px-4 text-white">
              <p className="text-sm font-medium leading-relaxed">
                {t(lightboxMedia.caption_en || '', lightboxMedia.caption_ceb || '')}
              </p>
              {lightboxMedia.tags && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  {lightboxMedia.tags.map((tg) => (
                    <span key={tg} className="text-xs text-orange-300">
                      #{tg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
