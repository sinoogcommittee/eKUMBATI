import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Settings,
  BarChart2,
  Layers,
  Image,
  Inbox,
  MapPin,
  LogOut,
  ExternalLink,
  Shield,
  Database,
  CloudOff,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { user, isDemoAdmin, isSupabaseConfigured, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { to: '/admin/settings', label: 'Site Settings & FB', icon: Settings },
    { to: '/admin/metrics', label: 'Impact Metrics (7)', icon: BarChart2 },
    { to: '/admin/programs', label: 'Programs & Checklists', icon: Layers },
    { to: '/admin/gallery', label: 'Gallery & WebP Media', icon: Image },
    { to: '/admin/submissions', label: 'Action Center Tickets', icon: Inbox },
    { to: '/admin/directory-map', label: 'Hotlines & Map Pins', icon: MapPin },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col justify-between h-full border-r border-slate-800">
      {/* Top Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-white font-semibold text-sm relative">
              <span>K</span>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-slate-950" />
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-tight block">
                e-KUMBATI
              </span>
              <span className="text-[11px] text-slate-400">
                Staff Admin CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Backend Connectivity Status Pill */}
        <div className="px-5 py-2.5 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              {isSupabaseConfigured ? (
                <Database className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <CloudOff className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Offline / Demo Mode'}</span>
            </span>
            <Badge variant={isSupabaseConfigured ? 'emerald' : 'amber'} size="sm">
              {isDemoAdmin ? 'Demo' : 'Auth'}
            </Badge>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info & Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2.5 bg-slate-900/40">
        {/* User Card */}
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-orange-500/10 text-orange-400 flex items-center justify-center font-medium text-xs">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-medium text-white truncate">
              {user?.email || 'admin@kumbati.gov.ph'}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {isDemoAdmin ? 'Local Sandbox Admin' : 'Congressional Staff'}
            </div>
          </div>
        </div>

        {/* View Public Portal */}
        <Link
          to="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Portal</span>
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
