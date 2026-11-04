import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  INITIAL_METRICS,
  INITIAL_PROGRAMS,
  INITIAL_ALBUMS,
  INITIAL_GALLERY_MEDIA,
} from '../../lib/constants';
import { ConstituentSubmission, SubmissionStatus } from '../../types/kumbati.types';
import Badge, { getStatusBadgeVariant } from '../../components/common/Badge';
import {
  Users,
  Inbox,
  Layers,
  Image as ImageIcon,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'kumbati_constituent_submissions';

export const AdminDashboardPage: React.FC = () => {
  const { user, isDemoAdmin, isSupabaseConfigured } = useAuth();
  const [submissions, setSubmissions] = useState<ConstituentSubmission[]>([]);

  // Load submissions from localStorage or default demo tickets
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      if (stored) {
        setSubmissions(JSON.parse(stored));
      } else {
        // Sample tickets for demonstration
        const sampleSubmissions: ConstituentSubmission[] = [
          {
            id: 'sub-sample-1',
            reference_code: 'KMB-2025-A8F2K',
            type: 'assistance',
            status: 'pending',
            full_name: 'Rolando C. Torralba',
            contact_number: '0917-123-9874',
            municipality: 'Candijay',
            barangay: 'Panadtaran',
            subject: 'Pabahay ni Kumbati Beneficiary Inspection',
            message: 'Inquiring regarding site inspection for concrete socialized housing unit.',
            program_category: 'Pabahay ni Kumbati',
            created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: 'sub-sample-2',
            reference_code: 'KMB-2025-M4N9Q',
            type: 'assistance',
            status: 'in_review',
            full_name: 'Annalyn G. Maturan',
            contact_number: '0928-554-1122',
            municipality: 'Carmen',
            barangay: 'Poblacion Sur',
            subject: 'PTV Emergency Dispatch for Dialysis Patient',
            message: 'Requesting scheduled Patient Transport Vehicle ride to Gallares Hospital Tagbilaran.',
            program_category: 'Patient Transport Vehicles',
            created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
          },
          {
            id: 'sub-sample-3',
            reference_code: 'KMB-2025-K3B7X',
            type: 'query',
            status: 'resolved',
            full_name: 'Mark Lester Galorio',
            contact_number: '0919-443-8877',
            municipality: 'Jagna',
            barangay: 'Tejero',
            subject: 'CHED-TDP Scholarship Renewal Requirements',
            message: 'Inquiring regarding deadline for submission of 2nd semester Certificate of Registration.',
            program_category: 'CHED-TDP Scholars',
            admin_notes: 'Answered via SMS: Deadline extended to end of month. Bring valid student ID.',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setSubmissions(sampleSubmissions);
        localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(sampleSubmissions));
      }
    } catch {
      // Ignore
    }
  }, []);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  const handleUpdateStatus = (id: string, newStatus: SubmissionStatus) => {
    const updated = submissions.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    setSubmissions(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Congressional Operations Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome, {user?.email?.split('@')[0] || 'Staff'}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            3rd Congressional District of Bohol &bull; Office of Congresswoman Alexie Besas Tutor
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isDemoAdmin ? 'amber' : 'emerald'} size="md" dot>
            {isDemoAdmin ? 'Demo Sandbox Mode' : 'Super Admin Active'}
          </Badge>
          {!isSupabaseConfigured && (
            <span className="text-[11px] text-slate-500">
              (Offline Local Storage)
            </span>
          )}
        </div>
      </div>

      {/* 4 Stat Overview Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Submissions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Action Center Tickets
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {submissions.length}
            </div>
            <span className="text-[11px] text-orange-400 font-semibold mt-1 inline-block">
              {pendingCount} Pending Review
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Active Flagship Programs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Active Programs
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {INITIAL_PROGRAMS.length}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">
              All 7 Flagship Live
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: 2025 Core Metrics */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Verified Metrics
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {INITIAL_METRICS.length}
            </div>
            <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">
              Pabahay, PTV, Clinic
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Cataloged Media Assets */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Gallery Media
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {INITIAL_GALLERY_MEDIA.length}
            </div>
            <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">
              In {INITIAL_ALBUMS.length} Albums
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Modules Navigation */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">
          Quick Management Modules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              to: '/admin/submissions',
              title: 'Action Center Tickets',
              desc: 'Process constituent requests and update tracking progress',
              icon: Inbox,
              badge: `${pendingCount} Pending`,
            },
            {
              to: '/admin/metrics',
              title: '7 Flagship Impact Metrics',
              desc: 'Update audited counts for Pabahay, PTV, Clinic, and Scholars',
              icon: ShieldCheck,
              badge: '2025 Audited',
            },
            {
              to: '/admin/programs',
              title: 'Programs & Checklists',
              desc: 'Edit program guidelines, requirements, and cover photos',
              icon: Layers,
              badge: '7 Programs',
            },
            {
              to: '/admin/gallery',
              title: 'Gallery & WebP Uploader',
              desc: 'Batch optimize and upload photos with client-side compression',
              icon: ImageIcon,
              badge: 'WebP Ready',
            },
            {
              to: '/admin/settings',
              title: 'Site Settings & FB Pages',
              desc: 'Update hero headlines, bio, and the 4 official FB channels',
              icon: Users,
              badge: 'Global Copy',
            },
            {
              to: '/admin/directory-map',
              title: 'Hotlines & Map Locations',
              desc: 'Manage MDRRMO emergency lines and facility GPS pins',
              icon: ArrowUpRight,
              badge: '19 Towns',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.to}
                className="group p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-orange-400 pt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Module</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Action Center Submissions Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-black text-white tracking-tight">
              Recent Action Center Activity
            </h3>
            <p className="text-xs text-slate-400">
              Live inquiries and assistance requests from constituents
            </p>
          </div>
          <Link
            to="/admin/submissions"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All Tickets ({submissions.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tracking Code</th>
                <th className="py-3 px-4">Constituent</th>
                <th className="py-3 px-4">Municipality</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.slice(0, 5).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-orange-400">
                    {ticket.reference_code}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {ticket.full_name}
                    <span className="block text-[11px] text-slate-500 font-normal">
                      {ticket.contact_number}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {ticket.barangay}, {ticket.municipality}
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                    {ticket.subject}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusBadgeVariant(ticket.status)} size="sm" dot>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {ticket.status !== 'resolved' && (
                      <button
                        onClick={() => handleUpdateStatus(ticket.id, 'resolved')}
                        className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold text-[10px] transition-colors"
                        title="Mark Resolved"
                      >
                        Resolve
                      </button>
                    )}
                    {ticket.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(ticket.id, 'in_review')}
                        className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white font-bold text-[10px] transition-colors"
                        title="Mark In Review"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
