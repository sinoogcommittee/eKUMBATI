import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { INITIAL_NEWS_ANNOUNCEMENTS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { NewsAnnouncement, AnnouncementCategory, AnnouncementPriority } from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { compressImageToWebP } from '../../lib/imageCompression';
import {
  Bell,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  User,
} from 'lucide-react';

const LOCAL_STORAGE_NEWS_KEY = 'kumbati_offline_news';

export const AdminNewsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<NewsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsAnnouncement | null>(null);
  const [postToDelete, setPostToDelete] = useState<NewsAnnouncement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title_en: '',
    title_ceb: '',
    excerpt_en: '',
    excerpt_ceb: '',
    content_en: '',
    content_ceb: '',
    category: 'advisory' as AnnouncementCategory,
    priority: 'normal' as AnnouncementPriority,
    author: 'Office of Congw. Alexie Besas Tutor',
    publish_date: new Date().toISOString().split('T')[0],
    image_url: '',
    is_pinned: false,
    is_published: true,
    target_towns: ['District-wide'],
  });

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch announcements
  const loadAnnouncements = async () => {
    setLoading(true);

    let localList: NewsAnnouncement[] = [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
      if (stored) {
        localList = JSON.parse(stored);
      }
    } catch {
      // Ignore
    }

    if (!isSupabaseConfigured) {
      if (localList.length === 0) {
        setAnnouncements(INITIAL_NEWS_ANNOUNCEMENTS);
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(INITIAL_NEWS_ANNOUNCEMENTS));
      } else {
        setAnnouncements(localList);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('news_announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('publish_date', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped: NewsAnnouncement[] = data.map((item) => ({
          id: item.id,
          title_en: item.title_en,
          title_ceb: item.title_ceb,
          excerpt_en: item.excerpt_en,
          excerpt_ceb: item.excerpt_ceb,
          content_en: item.content_en,
          content_ceb: item.content_ceb,
          category: item.category as AnnouncementCategory,
          priority: item.priority as AnnouncementPriority,
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
        setAnnouncements(mapped);
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(mapped));
      } else {
        setAnnouncements(INITIAL_NEWS_ANNOUNCEMENTS);
      }
    } catch {
      // Fallback to local
      setAnnouncements(localList.length > 0 ? localList : INITIAL_NEWS_ANNOUNCEMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Filtered view
  const filteredList = announcements.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && item.is_published) ||
      (statusFilter === 'draft' && !item.is_published);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title_en.toLowerCase().includes(q) ||
      item.title_ceb.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);

    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Open Form Modal for Create
  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title_en: '',
      title_ceb: '',
      excerpt_en: '',
      excerpt_ceb: '',
      content_en: '',
      content_ceb: '',
      category: 'advisory',
      priority: 'normal',
      author: 'Office of Congw. Alexie Besas Tutor',
      publish_date: new Date().toISOString().split('T')[0],
      image_url: '',
      is_pinned: false,
      is_published: true,
      target_towns: ['District-wide'],
    });
    setIsFormModalOpen(true);
  };

  // Open Form Modal for Edit
  const handleOpenEdit = (post: NewsAnnouncement) => {
    setEditingPost(post);
    setFormData({
      title_en: post.title_en,
      title_ceb: post.title_ceb,
      excerpt_en: post.excerpt_en,
      excerpt_ceb: post.excerpt_ceb,
      content_en: post.content_en,
      content_ceb: post.content_ceb,
      category: post.category,
      priority: post.priority,
      author: post.author,
      publish_date: post.publish_date,
      image_url: post.image_url || '',
      is_pinned: post.is_pinned,
      is_published: post.is_published,
      target_towns: post.target_towns || ['District-wide'],
    });
    setIsFormModalOpen(true);
  };

  // Image upload with WebP compression
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const compressedWebP = await compressImageToWebP(file);

      if (isSupabaseConfigured) {
        const fileName = `announcements/${Date.now()}-${compressedWebP.name}`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('kumbati-media')
          .upload(fileName, compressedWebP, { contentType: 'image/webp', upsert: true });

        if (!uploadErr && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('kumbati-media')
            .getPublicUrl(fileName);
          setFormData((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
          showToast('Image compressed to WebP and uploaded!');
          setUploadingImage(false);
          return;
        }
      }

      // Offline / data URL preview fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image_url: reader.result as string }));
        showToast('Image compressed & attached locally!');
      };
      reader.readAsDataURL(compressedWebP);
    } catch {
      showToast('Error compressing image.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Save
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const postPayload = {
      title_en: formData.title_en.trim(),
      title_ceb: formData.title_ceb.trim(),
      excerpt_en: formData.excerpt_en.trim(),
      excerpt_ceb: formData.excerpt_ceb.trim(),
      content_en: formData.content_en.trim(),
      content_ceb: formData.content_ceb.trim(),
      category: formData.category,
      priority: formData.priority,
      author: formData.author.trim() || 'Office of Congw. Alexie Besas Tutor',
      publish_date: formData.publish_date,
      image_url: formData.image_url.trim() || null,
      is_pinned: formData.is_pinned,
      is_published: formData.is_published,
      target_towns: formData.target_towns,
    };

    try {
      if (editingPost) {
        // UPDATE
        if (isSupabaseConfigured) {
          const { error } = await supabase
            .from('news_announcements')
            .update({ ...postPayload, updated_at: new Date().toISOString() })
            .eq('id', editingPost.id);
          if (error) throw error;
        }

        // Update local state
        const updated = announcements.map((a) =>
          a.id === editingPost.id
            ? { ...a, ...postPayload, image_url: postPayload.image_url || undefined, updated_at: new Date().toISOString() }
            : a
        );
        setAnnouncements(updated);
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));
        showToast('Announcement updated successfully!');
      } else {
        // CREATE
        const newId = isSupabaseConfigured ? undefined : `local-news-${Date.now()}`;
        let createdRecordId = newId || `news-${Date.now()}`;

        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('news_announcements')
            .insert([postPayload])
            .select()
            .single();

          if (error) throw error;
          if (data) createdRecordId = data.id;
        }

        const newAnnouncement: NewsAnnouncement = {
          id: createdRecordId,
          ...postPayload,
          image_url: postPayload.image_url || undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const updated = [newAnnouncement, ...announcements];
        setAnnouncements(updated);
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));
        showToast('New announcement created and published!');
      }

      setIsFormModalOpen(false);
    } catch (err: unknown) {
      const error = err as Error;
      showToast(`Save failed: ${error.message || 'Check database connection'}`);
    } finally {
      setSaving(false);
    }
  };

  // Toggle Pinned
  const handleTogglePinned = async (post: NewsAnnouncement) => {
    const newPinned = !post.is_pinned;
    const updated = announcements.map((a) => (a.id === post.id ? { ...a, is_pinned: newPinned } : a));
    setAnnouncements(updated);
    localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured) {
      await supabase
        .from('news_announcements')
        .update({ is_pinned: newPinned, updated_at: new Date().toISOString() })
        .eq('id', post.id);
    }
    showToast(`Post ${newPinned ? 'pinned to top' : 'unpinned'}.`);
  };

  // Toggle Published
  const handleTogglePublished = async (post: NewsAnnouncement) => {
    const newPub = !post.is_published;
    const updated = announcements.map((a) => (a.id === post.id ? { ...a, is_published: newPub } : a));
    setAnnouncements(updated);
    localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured) {
      await supabase
        .from('news_announcements')
        .update({ is_published: newPub, updated_at: new Date().toISOString() })
        .eq('id', post.id);
    }
    showToast(`Post status updated to ${newPub ? 'Published' : 'Draft'}.`);
  };

  // Confirm Delete
  const handleDeletePost = async () => {
    if (!postToDelete) return;

    const updated = announcements.filter((a) => a.id !== postToDelete.id);
    setAnnouncements(updated);
    localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('news_announcements').delete().eq('id', postToDelete.id);
      } catch {
        // Ignore
      }
    }

    showToast('Announcement deleted.');
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-orange-500/40 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Communications CMS</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            News, Updates & Public Announcements
          </h2>
          <p className="text-xs text-slate-400">
            Publish district advisories, PTV emergency dispatch alerts, payout schedules, and project bulletins.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenCreate}
        >
          Post New Announcement
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Total Bulletins</div>
          <div className="text-2xl font-black text-white mt-1">{announcements.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Published Live</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {announcements.filter((a) => a.is_published).length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Pinned & Urgent</div>
          <div className="text-2xl font-black text-orange-400 mt-1">
            {announcements.filter((a) => a.is_pinned || a.priority === 'urgent').length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-medium">Drafts / Inactive</div>
          <div className="text-2xl font-black text-slate-400 mt-1">
            {announcements.filter((a) => !a.is_published).length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Categories</option>
            <option value="advisory">Advisories</option>
            <option value="payout_schedule">Payout Schedules</option>
            <option value="medical_mission">Medical Missions</option>
            <option value="legislative">Legislative</option>
            <option value="general">General</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Announcements Table */}
      {loading ? (
        <div className="py-16">
          <LoadingSpinner text="Loading announcements..." />
        </div>
      ) : filteredList.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-white">No announcements found</h4>
          <p className="text-xs text-slate-400">
            Click "Post New Announcement" to publish your first district update.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Title & Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Publish Date</th>
                  <th className="py-3.5 px-4 text-center">Pin</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                    {/* Title & Excerpt */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="flex items-start gap-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                            <Bell className="w-5 h-5" />
                          </div>
                        )}
                        <div className="space-y-1 min-w-0">
                          <div className="font-bold text-white leading-tight truncate">
                            {item.title_en}
                          </div>
                          <div className="text-[11px] text-slate-400 italic truncate">
                            {item.title_ceb}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                            <User className="w-3 h-3 text-orange-400" />
                            <span>{item.author}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold uppercase text-[10px]">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          item.priority === 'urgent'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : item.priority === 'important'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Publish Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.publish_date}</span>
                      </div>
                    </td>

                    {/* Pin Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePinned(item)}
                        title={item.is_pinned ? 'Unpin from Top' : 'Pin to Top'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.is_pinned
                            ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(item)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors inline-flex items-center gap-1 ${
                          item.is_published
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                      >
                        {item.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPostToDelete(item);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          CREATE / EDIT POST MODAL
         ===================================================================== */}
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={editingPost ? 'Edit Public Announcement' : 'Create New District Announcement'}
          maxWidth="xl"
        >
          <form onSubmit={handleSaveForm} className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
            {/* Bilingual Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="e.g. PTV 24/7 Standby Alert for Weather Disturbance..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Title (Cebuano / Binisaya) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_ceb}
                  onChange={(e) => setFormData({ ...formData, title_ceb: e.target.value })}
                  placeholder="e.g. PTV 24/7 Alerto ug Andam sa Emerhensiya..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Category, Priority, Date, Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as AnnouncementCategory })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="advisory">Public Advisory</option>
                  <option value="payout_schedule">Payout Schedule</option>
                  <option value="medical_mission">Medical Mission</option>
                  <option value="legislative">Legislative Update</option>
                  <option value="disaster_alert">Disaster Alert</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as AnnouncementPriority })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Publish Date</label>
                <input
                  type="date"
                  required
                  value={formData.publish_date}
                  onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Author / Office</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Excerpts (Bilingual) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Summary Excerpt (English) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                  placeholder="Short teaser for cards (1-2 sentences)..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Summary Excerpt (Cebuano / Binisaya) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt_ceb}
                  onChange={(e) => setFormData({ ...formData, excerpt_ceb: e.target.value })}
                  placeholder="Mubo nga katingbanan alang sa card..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Full Body Content (Bilingual) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Content & Guidelines (English) *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  placeholder="Full bulletin body. You can use separate paragraphs for schedules and requirements..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Content & Guidelines (Cebuano / Binisaya) *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content_ceb}
                  onChange={(e) => setFormData({ ...formData, content_ceb: e.target.value })}
                  placeholder="Tibuok pahibalo sa Binisaya..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Image Attachment & WebP Optimizer */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Featured Bulletin Image
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Image URL or upload via WebP compression..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <label className="shrink-0 px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? 'Compressing...' : 'Upload & Compress WebP'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                    disabled={uploadingImage}
                  />
                </label>
              </div>
              {formData.image_url && (
                <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Target Towns Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Target Municipalities (Jurisdiction)
              </label>
              <div className="flex items-center gap-3 mb-2">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.target_towns.includes('District-wide')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, target_towns: ['District-wide'] });
                      } else {
                        setFormData({ ...formData, target_towns: [] });
                      }
                    }}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>District-wide (All 19 Towns)</span>
                </label>
              </div>

              {!formData.target_towns.includes('District-wide') && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 max-h-36 overflow-y-auto">
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => {
                    const isSelected = formData.target_towns.includes(town);
                    return (
                      <button
                        key={town}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? formData.target_towns.filter((t) => t !== town)
                            : [...formData.target_towns, town];
                          setFormData({ ...formData, target_towns: updated });
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold text-left transition-colors ${
                          isSelected
                            ? 'bg-orange-500 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {town}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Toggles: Pinned and Published */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100">
              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_pinned}
                  onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <span>Pin to Top of News Feed</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <span>Publish Immediately (Live to Public)</span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsFormModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving}
              >
                {saving ? 'Saving...' : editingPost ? 'Update Announcement' : 'Publish Announcement'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* =====================================================================
          DELETE CONFIRMATION MODAL
         ===================================================================== */}
      {isDeleteModalOpen && postToDelete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Announcement"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-800 leading-relaxed">
                Are you sure you want to delete <strong className="font-bold">"{postToDelete.title_en}"</strong>? This action will remove the announcement from the public portal.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="emergency"
                size="sm"
                onClick={handleDeletePost}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminNewsPage;
