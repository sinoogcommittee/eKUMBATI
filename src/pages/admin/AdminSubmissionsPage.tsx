import React, { useState } from 'react';
import {
  ConstituentSubmission,
  SubmissionStatus,
  SubmissionType,
} from '../../types/kumbati.types';
import { BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import Badge, { getStatusBadgeVariant } from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import {
  Inbox,
  Search,
  Eye,
  Phone,
  Save,
  MessageSquare,
} from 'lucide-react';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'kumbati_constituent_submissions';

export const AdminSubmissionsPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ConstituentSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore
    }
    return [
      {
        id: 'sub-sample-1',
        reference_code: 'KMB-2027-A8F2K',
        type: 'assistance',
        status: 'pending',
        full_name: 'Rolando C. Torralba',
        contact_number: '0917-123-9874',
        email: 'rolando@gmail.com',
        municipality: 'Candijay',
        barangay: 'Panadtaran',
        subject: 'Pabahay Beneficiary Inspection',
        message: 'Inquiring regarding site inspection for concrete socialized housing unit after typhoon damage.',
        program_category: 'Pabahay',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'sub-sample-2',
        reference_code: 'KMB-2027-M4N9Q',
        type: 'assistance',
        status: 'in_review',
        full_name: 'Annalyn G. Maturan',
        contact_number: '0928-554-1122',
        municipality: 'Carmen',
        barangay: 'Poblacion Sur',
        subject: 'PTV Emergency Dispatch for Dialysis Patient',
        message: 'Requesting scheduled Patient Transport Vehicle ride to Gallares Hospital Tagbilaran.',
        program_category: 'Patient Transport Vehicles',
        admin_notes: 'Driver assigned: PTV Unit 1. Contacted patient relative for pickup time.',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'sub-sample-3',
        reference_code: 'KMB-2027-K3B7X',
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
        resolved_at: new Date().toISOString(),
      },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | 'all'>('all');
  const [filterTown, setFilterTown] = useState<string>('all');
  const [filterType, setFilterType] = useState<SubmissionType | 'all'>('all');

  const [activeTicket, setActiveTicket] = useState<ConstituentSubmission | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalAdminNotes, setModalAdminNotes] = useState('');
  const [modalStatus, setModalStatus] = useState<SubmissionStatus>('pending');

  const filteredTickets = submissions.filter((ticket) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      ticket.reference_code.toLowerCase().includes(term) ||
      ticket.full_name.toLowerCase().includes(term) ||
      ticket.contact_number.includes(term) ||
      ticket.subject.toLowerCase().includes(term);

    const matchStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchTown = filterTown === 'all' || ticket.municipality === filterTown;
    const matchType = filterType === 'all' || ticket.type === filterType;

    return matchSearch && matchStatus && matchTown && matchType;
  });

  const handleOpenDetail = (ticket: ConstituentSubmission) => {
    setActiveTicket(ticket);
    setModalAdminNotes(ticket.admin_notes || '');
    setModalStatus(ticket.status);
    setIsDetailModalOpen(true);
  };

  const handleSaveTicketChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    const updated = submissions.map((t) => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          status: modalStatus,
          admin_notes: modalAdminNotes.trim(),
          resolved_at: modalStatus === 'resolved' ? new Date().toISOString() : t.resolved_at,
        };
      }
      return t;
    });

    setSubmissions(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsDetailModalOpen(false);
    setActiveTicket(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Inbox className="w-3.5 h-3.5" />
            <span>Constituent Grievance & Inquiries Desk</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Action Center Ticket Inbox
          </h2>
          <p className="text-xs text-slate-400">
            Review incoming inquiries, assign assistance caseworkers, update progress, and post client tracking remarks.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredTickets.length} of {submissions.length} Total Tickets
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code, name, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as SubmissionStatus | 'all')
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="action_taken">Action Taken</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Town Filter */}
          <div>
            <select
              value={filterTown}
              onChange={(e) => setFilterTown(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All 19 Municipalities</option>
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as SubmissionType | 'all')
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="assistance">Assistance Request</option>
              <option value="query">Inquiry / Query</option>
              <option value="complaint">Complaint / Grievance</option>
              <option value="suggestion">Commendation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-black tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Tracking Code</th>
                <th className="py-3.5 px-4">Constituent</th>
                <th className="py-3.5 px-4">LGU Location</th>
                <th className="py-3.5 px-4">Subject & Program</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-orange-400 block">
                      {ticket.reference_code}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">
                      {ticket.full_name}
                    </span>
                    <a
                      href={`tel:${ticket.contact_number}`}
                      className="text-[11px] text-slate-400 hover:text-orange-400"
                    >
                      {ticket.contact_number}
                    </a>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="font-semibold block">{ticket.municipality}</span>
                    <span className="text-[11px] text-slate-500">{ticket.barangay}</span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="font-bold text-slate-200 block truncate">
                      {ticket.subject}
                    </span>
                    <span className="text-[10px] text-orange-400/90 font-medium truncate block">
                      {ticket.program_category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={getStatusBadgeVariant(ticket.status)} size="sm" dot>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(ticket)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white font-bold text-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Process</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-500">
                    No tickets found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Processing Modal */}
      {isDetailModalOpen && activeTicket && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          maxWidth="xl"
          title={
            <div className="flex items-center gap-2">
              <span>Ticket:</span>
              <span className="font-mono text-orange-600">
                {activeTicket.reference_code}
              </span>
            </div>
          }
          subtitle={`Filed by ${activeTicket.full_name} on ${new Date(activeTicket.created_at).toLocaleString()}`}
        >
          <form onSubmit={handleSaveTicketChanges} className="space-y-6">
            {/* Constituent Particulars Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-slate-400 block uppercase text-[10px]">
                  Contact Number
                </strong>
                <a
                  href={`tel:${activeTicket.contact_number}`}
                  className="font-bold text-slate-900 hover:text-orange-600 flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>{activeTicket.contact_number}</span>
                </a>
              </div>

              <div>
                <strong className="text-slate-400 block uppercase text-[10px]">
                  Location
                </strong>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {activeTicket.barangay}, {activeTicket.municipality}
                </span>
              </div>

              <div>
                <strong className="text-slate-400 block uppercase text-[10px]">
                  Program Category
                </strong>
                <span className="font-bold text-orange-600 block mt-0.5">
                  {activeTicket.program_category || 'General'}
                </span>
              </div>

              <div>
                <strong className="text-slate-400 block uppercase text-[10px]">
                  Submission Type
                </strong>
                <span className="font-bold text-slate-900 uppercase block mt-0.5">
                  {activeTicket.type}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Constituent Message / Request Details
              </label>
              <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 text-xs text-slate-800 leading-relaxed max-h-36 overflow-y-auto">
                <strong className="block text-slate-900 mb-1">
                  Subject: {activeTicket.subject}
                </strong>
                {activeTicket.message}
              </div>
            </div>

            {/* Change Status Dropdown */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Resolution Status *
              </label>
              <select
                value={modalStatus}
                onChange={(e) =>
                  setModalStatus(e.target.value as SubmissionStatus)
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="pending">Pending (Awaiting Staff Review)</option>
                <option value="in_review">In Review (Assigned to Caseworker)</option>
                <option value="action_taken">Action Taken (Referral Sent / Vehicle Dispatched)</option>
                <option value="resolved">Resolved (Assistance Delivered / Query Answered)</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Public Staff Remarks (Seen by constituent on Tracker) */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                <span>Caseworker Remarks (Publicly Visible to Constituent Tracker)</span>
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Approved. PTV 2 scheduled for pickup at 6:00 AM on Friday. Please prepare hospital referral slip."
                value={modalAdminNotes}
                onChange={(e) => setModalAdminNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={<Save className="w-4 h-4" />}
              >
                Update Ticket Status
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminSubmissionsPage;
