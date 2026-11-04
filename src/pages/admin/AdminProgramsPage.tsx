import React, { useState } from 'react';
import { INITIAL_PROGRAMS } from '../../lib/constants';
import { ProgramAdvocacy, ProgramCategory } from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import Badge, { getCategoryBadgeVariant } from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  FileText,
  Save,
  X,
} from 'lucide-react';

const LOCAL_STORAGE_PROGRAMS_KEY = 'kumbati_programs_advocacies';

export const AdminProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramAdvocacy[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PROGRAMS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROGRAMS;
    } catch {
      return INITIAL_PROGRAMS;
    }
  });

  const [editingProgram, setEditingProgram] = useState<ProgramAdvocacy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // New requirement input state inside modal
  const [newReqEn, setNewReqEn] = useState('');
  const [newReqCeb, setNewReqCeb] = useState('');

  const handleOpenEdit = (prog: ProgramAdvocacy) => {
    setEditingProgram({ ...prog });
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    const newProg: ProgramAdvocacy = {
      id: `prog-${Date.now()}`,
      slug: `new-program-${Date.now()}`,
      title_en: 'New District Advocacy Program',
      title_ceb: 'Bag-ong Programa sa Distrito',
      category: 'Community',
      summary_en: 'Brief summary of the constituent program.',
      summary_ceb: 'Mubo nga pagpasabot sa programa.',
      full_description_en: 'Full guidelines and mechanics of the program.',
      full_description_ceb: 'Kompletong pamaagi ug katuyoan sa programa.',
      requirements_en: ['Certificate of Indigency from Barangay', 'Valid Government ID'],
      requirements_ceb: ['Barangay Indigency gikan sa Kapitan', 'Valid Government ID'],
      cover_image_url:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
      icon_name: 'Heart',
      display_order: programs.length + 1,
      is_featured: true,
      is_active: true,
    };
    setEditingProgram(newProg);
    setIsModalOpen(true);
  };

  const handleToggleActive = (id: string) => {
    const updated = programs.map((p) =>
      p.id === id ? { ...p, is_active: !p.is_active } : p
    );
    setPrograms(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROGRAMS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this program from the portal?')) {
      const updated = programs.filter((p) => p.id !== id);
      setPrograms(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_PROGRAMS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    const exists = programs.some((p) => p.id === editingProgram.id);
    let updated: ProgramAdvocacy[];

    if (exists) {
      updated = programs.map((p) => (p.id === editingProgram.id ? editingProgram : p));
    } else {
      updated = [...programs, editingProgram];
    }

    setPrograms(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROGRAMS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsModalOpen(false);
    setEditingProgram(null);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handleAddRequirement = () => {
    if (!editingProgram || !newReqEn.trim()) return;

    const reqEnList = [...editingProgram.requirements_en, newReqEn.trim()];
    const reqCebList = [
      ...editingProgram.requirements_ceb,
      newReqCeb.trim() || newReqEn.trim(),
    ];

    setEditingProgram({
      ...editingProgram,
      requirements_en: reqEnList,
      requirements_ceb: reqCebList,
    });

    setNewReqEn('');
    setNewReqCeb('');
  };

  const handleRemoveRequirement = (index: number) => {
    if (!editingProgram) return;
    const reqEnList = editingProgram.requirements_en.filter((_, i) => i !== index);
    const reqCebList = editingProgram.requirements_ceb.filter((_, i) => i !== index);

    setEditingProgram({
      ...editingProgram,
      requirements_en: reqEnList,
      requirements_ceb: reqCebList,
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-800 text-orange-400 text-xs font-medium mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Advocacy Programs Manager</span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Flagship Programs & Checklists
          </h2>
          <p className="text-xs text-slate-400">
            Create, modify, and configure eligibility requirement checklists for all district initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccessNotice && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Program Updated!</span>
            </div>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            icon={<Plus className="w-4 h-4" />}
          >
            Create New Program
          </Button>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="space-y-3">
        {programs.map((prog, index) => (
          <div
            key={prog.id}
            className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-slate-700 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                <img
                  src={prog.cover_image_url}
                  alt={prog.title_en}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[9px] font-medium">
                  #{index + 1}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={getCategoryBadgeVariant(prog.category)} size="sm">
                    {prog.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    /{prog.slug}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug">
                  {prog.title_en}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                  {prog.summary_en}
                </p>
                <div className="text-[11px] text-orange-400 font-medium flex items-center gap-1 pt-0.5">
                  <FileText className="w-3 h-3" />
                  <span>{prog.requirements_en.length} Required Documents Listed</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => handleToggleActive(prog.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  prog.is_active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {prog.is_active ? 'Active' : 'Hidden'}
              </button>

              <button
                onClick={() => handleOpenEdit(prog)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Edit Program"
              >
                <Edit className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(prog.id)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors"
                title="Delete Program"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProgram && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="2xl"
          title={editingProgram.title_en}
          subtitle="Configure Program Details, Bilingual Descriptions & Document Checklists"
        >
          <form onSubmit={handleSaveModal} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Program Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProgram.title_en}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, title_en: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Program Title (Cebuano) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProgram.title_ceb}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, title_ceb: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={editingProgram.category}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      category: e.target.value as ProgramCategory,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer"
                >
                  <option value="Health">Health</option>
                  <option value="Housing">Housing</option>
                  <option value="Education">Education</option>
                  <option value="Livelihood">Livelihood</option>
                  <option value="Community">Community</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingProgram.slug}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, slug: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editingProgram.cover_image_url}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      cover_image_url: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Summary (English)
                </label>
                <textarea
                  rows={2}
                  value={editingProgram.summary_en}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, summary_en: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Summary (Cebuano)
                </label>
                <textarea
                  rows={2}
                  value={editingProgram.summary_ceb}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, summary_ceb: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Checklist Manager */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs font-medium text-slate-900">
                Required Documents Checklist ({editingProgram.requirements_en.length})
              </label>

              {/* Existing items */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {editingProgram.requirements_en.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs"
                  >
                    <span className="font-medium text-slate-800 truncate">{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add requirement input */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Requirement (English)"
                  value={newReqEn}
                  onChange={(e) => setNewReqEn(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                />
                <input
                  type="text"
                  placeholder="Requirement (Cebuano)"
                  value={newReqCeb}
                  onChange={(e) => setNewReqCeb(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddRequirement}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                Save Program Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminProgramsPage;
