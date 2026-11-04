import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/common/Button';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Database,
  CloudOff,
  Sparkles,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { signInWithPassword, loginWithDemo, isSupabaseConfigured, user, isDemoAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to target or dashboard
  React.useEffect(() => {
    if (user || isDemoAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isDemoAdmin, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const { error } = await signInWithPassword(email, password);

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = () => {
    loginWithDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center text-white font-black text-2xl shadow-kumbati group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight block">
                e-KUMBATI
              </span>
              <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                Staff Admin Portal
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400">
            {t(
              '3rd Congressional District of Bohol • Content & Operations Management',
              'Ikatulong Distrito sa Bohol • Pagdumala sa Impormasyon ug Serbisyo'
            )}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Connectivity Status Banner */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              {isSupabaseConfigured ? (
                <Database className="w-4 h-4 text-emerald-400" />
              ) : (
                <CloudOff className="w-4 h-4 text-amber-400" />
              )}
              <span>{isSupabaseConfigured ? 'Live Supabase Cloud' : 'Offline / Sandbox Mode'}</span>
            </span>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}
            >
              {isSupabaseConfigured ? 'Online' : 'Demo Ready'}
            </span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="staff@kumbati.bohol3.gov.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-slate-600"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Sign In with Staff Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800" />
            <span className="shrink-0 mx-3 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              Or Instant Sandbox Access
            </span>
            <div className="flex-grow border-t border-slate-800" />
          </div>

          {/* 1-Click Demo Sandbox Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-orange-500/40 text-orange-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>1-Click Demo Administrator Access</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center leading-normal">
              Allows full preview of all 8 CMS management pages without needing active Supabase database credentials.
            </p>
          </div>
        </div>

        {/* Return to Public Portal */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-bold text-slate-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Return to Public Web Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
