import React, { useState } from 'react';
import { INITIAL_METRICS } from '../../lib/constants';
import { ImpactMetric } from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  Save,
  BarChart2,
  CheckCircle2,
  Plus,
  Trash2,
} from 'lucide-react';

const LOCAL_STORAGE_METRICS_KEY = 'kumbati_impact_metrics';

export const AdminMetricsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_METRICS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_METRICS;
    } catch {
      return INITIAL_METRICS;
    }
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = <K extends keyof ImpactMetric>(
    id: string,
    field: K,
    value: ImpactMetric[K]
  ) => {
    setMetrics(
      metrics.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_METRICS_KEY, JSON.stringify(metrics));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // Ignore
    }
    setSaving(false);
  };

  const handleAddMetric = () => {
    const newMetric: ImpactMetric = {
      id: `metric-custom-${Date.now()}`,
      metric_key: `custom_${Date.now()}`,
      title_en: 'New Verified District Metric',
      title_ceb: 'Bag-ong Sukod sa Kalampusan',
      value_numeric: 100,
      suffix: '+',
      display_order: metrics.length + 1,
      category: 'Community',
      description_en: 'Constituent milestone achieved in Bohol District 3.',
      description_ceb: 'Kalampusan nga nahatag sa katawhan sa Ikatulong Distrito.',
      icon_name: 'Activity',
      is_active: true,
    };
    setMetrics([...metrics, newMetric]);
  };

  const handleDeleteMetric = (id: string) => {
    if (confirm('Are you sure you want to remove this metric from display?')) {
      setMetrics(metrics.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-800 text-orange-400 text-xs font-medium mb-1">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Audited Governance Counters</span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            The 7 Flagship 2025 Impact Metrics
          </h2>
          <p className="text-xs text-slate-400">
            Audit and adjust verified numerical counts, suffixes, and bilingual explanations for Pabahay, PTV, Clinic, and Scholars.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Metrics Saved!</span>
            </div>
          )}
          <Button
            variant="white"
            size="sm"
            onClick={handleAddMetric}
            icon={<Plus className="w-4 h-4 text-orange-600" />}
          >
            Add New Metric
          </Button>
        </div>
      </div>

      {/* Metrics List / Cards */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-4">
          {metrics.map((item, index) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-md bg-slate-800 text-orange-400 font-mono font-medium text-xs flex items-center justify-center tabular-nums">
                    #{index + 1}
                  </span>
                  <Badge variant="orange" size="sm">
                    {item.category}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    key: {item.metric_key}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.is_active}
                      onChange={(e) =>
                        handleUpdate(item.id, 'is_active', e.target.checked)
                      }
                      className="rounded text-orange-500 focus:ring-orange-500 bg-slate-950 border-slate-700"
                    />
                    <span>Active on Portal</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDeleteMetric(item.id)}
                    className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Delete Metric"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Value & Suffix Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Audited Numeric Value
                  </label>
                  <input
                    type="number"
                    required
                    value={item.value_numeric}
                    onChange={(e) =>
                      handleUpdate(item.id, 'value_numeric', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-base font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Suffix (e.g. +)
                  </label>
                  <input
                    type="text"
                    value={item.suffix}
                    onChange={(e) => handleUpdate(item.id, 'suffix', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdate(item.id, 'category', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="Health">Health</option>
                    <option value="Housing">Housing</option>
                    <option value="Education">Education</option>
                    <option value="Livelihood">Livelihood</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Icon Name (Lucide)
                  </label>
                  <input
                    type="text"
                    value={item.icon_name}
                    onChange={(e) => handleUpdate(item.id, 'icon_name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Bilingual Titles & Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={item.title_en}
                    onChange={(e) => handleUpdate(item.id, 'title_en', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Title (Cebuano / Binisaya)
                  </label>
                  <input
                    type="text"
                    required
                    value={item.title_ceb}
                    onChange={(e) => handleUpdate(item.id, 'title_ceb', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={item.description_en}
                    onChange={(e) =>
                      handleUpdate(item.id, 'description_en', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description (Cebuano / Binisaya)
                  </label>
                  <textarea
                    rows={2}
                    value={item.description_ceb}
                    onChange={(e) =>
                      handleUpdate(item.id, 'description_ceb', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={saving}
            icon={<Save className="w-4 h-4" />}
          >
            Save All Metrics
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminMetricsPage;
