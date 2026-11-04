import React, { useState } from 'react';
import { INITIAL_ALBUMS, INITIAL_GALLERY_MEDIA, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { GalleryAlbum, GalleryMedia } from '../../types/kumbati.types';
import { compressImageToWebP, formatBytes } from '../../lib/imageCompression';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  CheckCircle2,
  FolderPlus,
} from 'lucide-react';

const LOCAL_STORAGE_ALBUMS_KEY = 'kumbati_gallery_albums';
const LOCAL_STORAGE_MEDIA_KEY = 'kumbati_gallery_media';

interface CompressionLog {
  fileName: string;
  originalBytes: number;
  compressedBytes: number;
  savingsPercentage: number;
}

export const AdminGalleryPage: React.FC = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ALBUMS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_ALBUMS;
    } catch {
      return INITIAL_ALBUMS;
    }
  });

  const [mediaList, setMediaList] = useState<GalleryMedia[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_MEDIA_KEY);
      return stored ? JSON.parse(stored) : INITIAL_GALLERY_MEDIA;
    } catch {
      return INITIAL_GALLERY_MEDIA;
    }
  });

  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(
    albums[0]?.id || 'album-pabahay-turnover'
  );

  // Uploader State
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionLogs, setCompressionLogs] = useState<CompressionLog[]>([]);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // New Album Modal State
  const [isNewAlbumModalOpen, setIsNewAlbumModalOpen] = useState(false);
  const [newAlbumData, setNewAlbumData] = useState({
    title_en: '',
    title_ceb: '',
    category: 'Housing',
    municipality: 'Candijay',
    event_date: new Date().toISOString().split('T')[0],
    cover_image_url:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  });

  const currentAlbum = albums.find((a) => a.id === selectedAlbumId);
  const currentAlbumMedia = mediaList.filter((m) => m.album_id === selectedAlbumId);

  // Handle Batch Files Compression & Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    setUploadNotice(null);
    const newLogs: CompressionLog[] = [];
    const newMediaItems: GalleryMedia[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const originalBytes = file.size;

      // Convert to WebP using client-side compression
      const compressedWebPFile = await compressImageToWebP(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
      });

      const compressedBytes = compressedWebPFile.size;
      const savings = Math.max(0, Math.round(((originalBytes - compressedBytes) / originalBytes) * 100));

      newLogs.push({
        fileName: file.name,
        originalBytes,
        compressedBytes,
        savingsPercentage: savings,
      });

      // Generate object URL for immediate display
      const objectUrl = URL.createObjectURL(compressedWebPFile);

      newMediaItems.push({
        id: `media-${Date.now()}-${i}`,
        album_id: selectedAlbumId,
        media_url: objectUrl,
        media_type: 'image',
        caption_en: `Photo from ${currentAlbum?.title_en || 'outreach event'}`,
        caption_ceb: `Litrato gikan sa kalihokan`,
        tags: [currentAlbum?.category || 'General', currentAlbum?.municipality || 'District 3'],
        display_order: currentAlbumMedia.length + i + 1,
        created_at: new Date().toISOString(),
      });
    }

    const updatedMedia = [...mediaList, ...newMediaItems];
    setMediaList(updatedMedia);
    setCompressionLogs(newLogs);
    setIsCompressing(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_MEDIA_KEY, JSON.stringify(updatedMedia));
    } catch {
      // Ignore
    }

    setUploadNotice(`Successfully compressed and added ${newMediaItems.length} WebP photos!`);
    setTimeout(() => setUploadNotice(null), 4000);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Delete this photo from the album?')) {
      const updated = mediaList.filter((m) => m.id !== id);
      setMediaList(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_MEDIA_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumData.title_en) return;

    const newAlbum: GalleryAlbum = {
      id: `album-${Date.now()}`,
      title_en: newAlbumData.title_en,
      title_ceb: newAlbumData.title_ceb || newAlbumData.title_en,
      category: newAlbumData.category,
      municipality: newAlbumData.municipality,
      event_date: newAlbumData.event_date,
      cover_image_url: newAlbumData.cover_image_url,
      display_order: albums.length + 1,
      media_count: 0,
      created_at: new Date().toISOString(),
    };

    const updated = [newAlbum, ...albums];
    setAlbums(updated);
    setSelectedAlbumId(newAlbum.id);
    setIsNewAlbumModalOpen(false);

    try {
      localStorage.setItem(LOCAL_STORAGE_ALBUMS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Multimedia Content Manager</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Gallery Albums & Client-side WebP Optimization
          </h2>
          <p className="text-xs text-slate-400">
            Batch-upload event photos with automatic browser-level WebP compression before storage.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsNewAlbumModalOpen(true)}
          icon={<FolderPlus className="w-4 h-4" />}
        >
          Create New Album
        </Button>
      </div>

      {/* Album Selector & Uploader Panel */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Album:
            </span>
            <select
              value={selectedAlbumId}
              onChange={(e) => setSelectedAlbumId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title_en} ({album.category} - {album.municipality || 'District'})
                </option>
              ))}
            </select>
          </div>

          <Badge variant="orange" size="sm">
            {currentAlbumMedia.length} Photos in Album
          </Badge>
        </div>

        {/* Drag & Drop WebP Uploader Zone */}
        <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/80 rounded-2xl p-8 text-center transition-colors bg-slate-950/60 relative">
          <input
            type="file"
            multiple
            accept="image/*"
            disabled={isCompressing}
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Upload className="w-7 h-7" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {isCompressing
                  ? 'Compressing images to WebP via web worker...'
                  : 'Click or drag high-res photos here to batch upload'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Converts JPEG/PNG to modern WebP (target &lt; 800KB) automatically for smooth cellular loading in Bohol.
              </p>
            </div>
          </div>
        </div>

        {/* Compression Statistics Feedback */}
        {compressionLogs.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>WebP Compression Savings Report:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {compressionLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between"
                >
                  <span className="truncate pr-2 font-mono">{log.fileName}</span>
                  <div className="shrink-0 text-right">
                    <span className="text-slate-400">{formatBytes(log.originalBytes)}</span>
                    <span className="text-emerald-400 font-bold ml-1">
                      &rarr; {formatBytes(log.compressedBytes)} (-{log.savingsPercentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {uploadNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            {uploadNotice}
          </div>
        )}
      </div>

      {/* Album Photos Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white">
            Photos in &quot;{currentAlbum?.title_en}&quot;
          </h3>
          <span className="text-xs text-slate-400">
            {currentAlbumMedia.length} Media items cataloged
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentAlbumMedia.map((media) => (
            <div
              key={media.id}
              className="group relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm"
            >
              <div className="relative h-44 w-full bg-slate-950">
                <img
                  src={media.media_url}
                  alt={media.caption_en || 'Photo'}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDeleteMedia(media.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-200 line-clamp-2">
                  {media.caption_en}
                </p>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>WebP Optimized</span>
                  <span className="text-orange-400 font-mono">#{media.display_order}</span>
                </div>
              </div>
            </div>
          ))}

          {currentAlbumMedia.length === 0 && (
            <div className="col-span-full py-12 text-center text-xs text-slate-500 bg-slate-900 rounded-3xl border border-slate-800">
              No photos currently uploaded to this album. Drag files into the box above to add photos.
            </div>
          )}
        </div>
      </div>

      {/* New Album Modal */}
      {isNewAlbumModalOpen && (
        <Modal
          isOpen={isNewAlbumModalOpen}
          onClose={() => setIsNewAlbumModalOpen(false)}
          maxWidth="lg"
          title="Create New Multimedia Album"
          subtitle="Group photo documentation by outreach activity or turnover ceremony"
        >
          <form onSubmit={handleCreateAlbum} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Album Title (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pabahay 2025 Handover in Guindulman"
                value={newAlbumData.title_en}
                onChange={(e) =>
                  setNewAlbumData({ ...newAlbumData, title_en: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Album Title (Cebuano)
              </label>
              <input
                type="text"
                placeholder="e.g. Pagtugyan sa mga Balay sa Guindulman"
                value={newAlbumData.title_ceb}
                onChange={(e) =>
                  setNewAlbumData({ ...newAlbumData, title_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newAlbumData.category}
                  onChange={(e) =>
                    setNewAlbumData({ ...newAlbumData, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="Housing">Housing</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Livelihood">Livelihood</option>
                  <option value="Community">Community</option>
                  <option value="Legislative">Legislative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Municipality
                </label>
                <select
                  value={newAlbumData.municipality}
                  onChange={(e) =>
                    setNewAlbumData({ ...newAlbumData, municipality: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="District-wide">District-wide</option>
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={newAlbumData.event_date}
                  onChange={(e) =>
                    setNewAlbumData({ ...newAlbumData, event_date: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cover Photo URL
                </label>
                <input
                  type="url"
                  value={newAlbumData.cover_image_url}
                  onChange={(e) =>
                    setNewAlbumData({ ...newAlbumData, cover_image_url: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewAlbumModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <Button type="submit" variant="primary" size="md">
                Create Album
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminGalleryPage;
