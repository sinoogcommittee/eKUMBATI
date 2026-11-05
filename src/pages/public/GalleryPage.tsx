import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_ALBUMS, INITIAL_GALLERY_MEDIA, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { GalleryAlbum, GalleryMedia } from '../../types/kumbati.types';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Image as ImageIcon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTown, setSelectedTown] = useState<string>('All');

  // Fullscreen Lightbox State & Native Dialog Ref
  const [lightboxAlbum, setLightboxAlbum] = useState<GalleryAlbum | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const lightboxRef = useRef<HTMLDialogElement>(null);

  const categories = ['All', 'Housing', 'Health', 'Education', 'Livelihood', 'Community'];

  // Deep-linking: auto-select / scroll to album if ?album=... is in URL
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const targetAlbumId = params.get('album');
      if (targetAlbumId) {
        const found = INITIAL_ALBUMS.find((a) => a.id === targetAlbumId);
        if (found) {
          setSelectedCategory('All');
          setSelectedTown('All');
          setTimeout(() => {
            const el = document.getElementById(targetAlbumId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 300);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Format event date into human-readable month and year
  const formatEventDate = useCallback(
    (dateStr: string) => {
      if (!dateStr) return '';
      const [year, month] = dateStr.split('-');
      const monthNum = parseInt(month, 10);

      const monthsEn = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const monthsCeb = [
        'Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo',
        'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre',
      ];

      const monthName =
        lang === 'ceb'
          ? monthsCeb[monthNum - 1] || month
          : monthsEn[monthNum - 1] || month;
      return `${monthName} ${year}`;
    },
    [lang]
  );

  // Filtered Albums List (Unified Feed)
  const filteredAlbums = useMemo(() => {
    return INITIAL_ALBUMS.filter((album) => {
      const matchCategory =
        selectedCategory === 'All' || album.category === selectedCategory;
      const matchTown =
        selectedTown === 'All' ||
        album.municipality === selectedTown ||
        album.municipality === 'District-wide';

      return matchCategory && matchTown;
    });
  }, [selectedCategory, selectedTown]);

  // Live count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: INITIAL_ALBUMS.length };
    INITIAL_ALBUMS.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Get all photos belonging to an album
  const getAlbumPhotos = useCallback((albumId: string): GalleryMedia[] => {
    const photos = INITIAL_GALLERY_MEDIA.filter((m) => m.album_id === albumId);
    if (photos.length > 0) return photos;

    // Fallback if no media items configured: use album cover as single photo
    const parent = INITIAL_ALBUMS.find((a) => a.id === albumId);
    if (parent) {
      return [
        {
          id: `cover-${parent.id}`,
          album_id: parent.id,
          media_url: parent.cover_image_url,
          media_type: 'image',
          caption_en: parent.title_en,
          caption_ceb: parent.title_ceb,
          display_order: 1,
        },
      ];
    }
    return [];
  }, []);

  // Lightbox Navigation Handlers
  const currentPhotos = useMemo(() => {
    return lightboxAlbum ? getAlbumPhotos(lightboxAlbum.id) : [];
  }, [lightboxAlbum, getAlbumPhotos]);

  const activePhoto: GalleryMedia | undefined = currentPhotos[currentPhotoIndex];

  const handleOpenLightbox = (album: GalleryAlbum, photoIndex: number = 0) => {
    setLightboxAlbum(album);
    setCurrentPhotoIndex(photoIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxAlbum(null);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = useCallback(() => {
    if (currentPhotos.length <= 1) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % currentPhotos.length);
  }, [currentPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (currentPhotos.length <= 1) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);
  }, [currentPhotos.length]);

  // Sync native dialog with lightbox state
  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;

    if (lightboxAlbum) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [lightboxAlbum]);

  // Handle native dialog cancel event (Escape key / mobile gestures)
  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      handleCloseLightbox();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, []);

  // Arrow key navigation for Lightbox
  useEffect(() => {
    if (!lightboxAlbum) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxAlbum, handleNextPhoto, handlePrevPhoto]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-32 sm:pb-36">
      {/* =====================================================================
          1. GALLERY HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs border border-orange-200/70">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Visual Documentation & Photographic Archives', 'Galeriya sa mga Proyekto ug Kalihokan')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t('KUMBATI in Action: Photo Documentation', 'KUMBATI sa Aksyon: Mga Hulagway sa Distrito')}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed font-medium">
              {t(
                'Explore high-resolution visual archives of Pabahay turnovers, 24/7 Patient Transport dispatches, medical clinic missions, tertiary college scholarship assemblies, and rural infrastructure projects across Bohol District 3.',
                'Susiha ang mga hulagway sa pagtugyan sa balay sa Pabahay, pagbiyahe sa PTV, mga libreng klinika, paghatag og scholarship, ug mga tulay ug kadalanan lukop sa Ikatulong Distrito sa Bohol.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FILTER CONTROLS BAR (CLEAN TOUCH SCROLLING, ZERO SCROLLBAR TRACKS)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-sinoog backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Tabs: Smooth Touch Scrolling with Hidden Scrollbars */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-1">
                <Filter className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden sm:inline">{t('Category', 'Kategoriya')}:</span>
              </div>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                        : 'bg-slate-50 hover:bg-orange-50/80 text-slate-700 hover:text-orange-700 border border-slate-200/80 hover:border-orange-300'
                    }`}
                  >
                    <span>{cat === 'All' ? t('All Albums', 'Tanan nga Album') : cat}</span>
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

            {/* Municipality Selector Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs min-h-[44px]"
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

          {/* Active Filter Indicator / Reset Action */}
          {(selectedCategory !== 'All' || selectedTown !== 'All') && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span>{t('Showing', 'Gipakita')}:</span>
                <span className="font-bold text-orange-600">
                  {filteredAlbums.length} {t('documented albums', 'mga album')}
                </span>
                {selectedCategory !== 'All' && (
                  <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[11px] font-bold">
                    {selectedCategory}
                  </span>
                )}
                {selectedTown !== 'All' && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                    📍 {selectedTown}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTown('All');
                }}
                className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('Reset Filters', 'I-reset')}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. UNIFIED PHOTO ALBUM GRID (1-COL MOBILE, 2-COL TABLET/DESKTOP)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredAlbums.length === 0 ? (
          <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-orange-100 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {t('No photo albums found', 'Walay nakit-an nga album')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {t(
                'Try selecting a different program category or choosing "All 19 Municipalities".',
                'Sulayi pagpili og laing kategoriya o pilia ang "Tanan nga 19 ka Lungsod".'
              )}
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTown('All');
              }}
            >
              {t('Reset Filters', 'I-reset ang Salain')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredAlbums.map((album) => {
              const albumPhotos = getAlbumPhotos(album.id);
              const formattedDate = formatEventDate(album.event_date);

              return (
                <article
                  key={album.id}
                  id={album.id}
                  className="group bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl border border-orange-200/80 border-t-white overflow-hidden shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
                >
                  <div>
                    {/* Main Cover Image / Hero Thumbnail */}
                    <div
                      onClick={() => handleOpenLightbox(album, 0)}
                      className="relative h-60 sm:h-72 w-full bg-slate-100 overflow-hidden border-b border-orange-100/60 cursor-pointer"
                    >
                      <img
                        src={album.cover_image_url}
                        alt={t(album.title_en, album.title_ceb)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges: Category & Photo Count */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <Badge
                          variant={album.category === 'Health' ? 'red' : 'orange'}
                          size="sm"
                        >
                          {album.category}
                        </Badge>
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-sm">
                          <Layers className="w-3 h-3 text-orange-400" />
                          <span>
                            {albumPhotos.length} {t('photos', 'litrato')}
                          </span>
                        </span>
                      </div>

                      {/* Magnifying Glass Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                        <div className="p-3.5 rounded-full bg-white/25 backdrop-blur-md shadow-sinoog flex items-center gap-2">
                          <Maximize2 className="w-5 h-5 text-white" />
                          <span className="text-xs font-bold">{t('View Fullscreen', 'Tan-awa sa Fullscreen')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body & Clean Metadata */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      {/* Clean Location & Date Badge (No Cryptic Tags) */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50/90 border border-orange-200/80 text-xs font-bold text-orange-900 shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>
                          {album.municipality || 'District-wide'} • {formattedDate}
                        </span>
                      </div>

                      {/* Album Title */}
                      <h3
                        onClick={() => handleOpenLightbox(album, 0)}
                        className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug cursor-pointer"
                      >
                        {t(album.title_en, album.title_ceb)}
                      </h3>

                      {/* Album Summary */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {t(album.description_en || '', album.description_ceb || '')}
                      </p>

                      {/* Photo Thumbnails Strip (Tap to Open Specific Photo) */}
                      {albumPhotos.length > 1 && (
                        <div className="pt-2">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-orange-500" />
                            <span>{t('Album Preview', 'Pasiunang Litrato')}:</span>
                          </div>
                          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            {albumPhotos.map((photo, pIdx) => (
                              <button
                                key={photo.id}
                                type="button"
                                onClick={() => handleOpenLightbox(album, pIdx)}
                                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-orange-100 hover:border-orange-500 transition-all shrink-0 cursor-pointer group/thumb shadow-2xs hover:shadow-xs"
                                title={t(photo.caption_en || '', photo.caption_ceb || '')}
                              >
                                <img
                                  src={photo.media_url}
                                  alt={photo.caption_en || `Photo ${pIdx + 1}`}
                                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/0 transition-colors" />
                                <span className="absolute bottom-1 right-1.5 px-1.5 py-0.2 rounded-md bg-black/70 text-white text-[9px] font-bold">
                                  #{pIdx + 1}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: One-Tap Open Lightbox */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenLightbox(album, 0)}
                      className="w-full inline-flex items-center justify-between px-5 py-3 rounded-2xl bg-orange-50/90 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 text-orange-700 hover:text-white font-bold text-xs shadow-2xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group/btn min-h-[44px]"
                    >
                      <span className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-orange-500 group-hover/btn:text-white transition-colors" />
                        <span>
                          {t(
                            `Browse Full Album (${albumPhotos.length} Photos)`,
                            `Tan-awa ang Tibuok Album (${albumPhotos.length} ka Litrato)`
                          )}
                        </span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================================
          4. INTERACTIVE FULLSCREEN LIGHTBOX MODAL (Native Dialog Top Layer)
         ===================================================================== */}
      {lightboxAlbum && activePhoto && (
        <dialog
          ref={lightboxRef}
          aria-label={t(lightboxAlbum.title_en, lightboxAlbum.title_ceb)}
          className="fixed inset-0 z-50 w-full h-full max-w-none max-h-none m-0 p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between border-0 text-white outline-none animate-in fade-in duration-200"
        >
          {/* Top Bar: Title, Counter, Badges & Close Button */}
          <div className="flex items-center justify-between gap-3 text-white pb-3 border-b border-white/10 z-20">
            <div className="space-y-0.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={lightboxAlbum.category === 'Health' ? 'red' : 'orange'} size="sm">
                  {lightboxAlbum.category}
                </Badge>
                <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{lightboxAlbum.municipality || 'District-wide'}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  • {formatEventDate(lightboxAlbum.event_date)}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
                {t(lightboxAlbum.title_en, lightboxAlbum.title_ceb)}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Photo Counter Pill */}
              <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15">
                {currentPhotoIndex + 1} / {currentPhotos.length}
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2.5 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15"
                aria-label="Close fullscreen lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Stage: Photo & Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
            {/* Prev Arrow */}
            {currentPhotos.length > 1 && (
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-orange-400 rounded-full bg-black/50 hover:bg-black/80 transition-all z-20 cursor-pointer border border-white/20 shadow-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main High-Resolution Photo */}
            <div className="max-w-5xl w-full max-h-[64vh] sm:max-h-[70vh] flex items-center justify-center px-4">
              <img
                key={activePhoto.id}
                src={activePhoto.media_url}
                alt={t(activePhoto.caption_en || '', activePhoto.caption_ceb || '')}
                className="max-h-[62vh] sm:max-h-[68vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Next Arrow */}
            {currentPhotos.length > 1 && (
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-orange-400 rounded-full bg-black/50 hover:bg-black/80 transition-all z-20 cursor-pointer border border-white/20 shadow-lg min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Photo Caption & Interactive Thumbnails Carousel */}
          <div className="space-y-3 pt-3 border-t border-white/10 z-20 max-w-4xl mx-auto w-full">
            {/* Caption */}
            <div className="text-center px-4">
              <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                {t(activePhoto.caption_en || '', activePhoto.caption_ceb || '')}
              </p>
            </div>

            {/* Thumbnails Row */}
            {currentPhotos.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {currentPhotos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all shrink-0 cursor-pointer ${
                      idx === currentPhotoIndex
                        ? 'ring-2 ring-orange-500 scale-105 shadow-md'
                        : 'opacity-50 hover:opacity-100 ring-1 ring-white/20'
                    }`}
                  >
                    <img
                      src={photo.media_url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default GalleryPage;
