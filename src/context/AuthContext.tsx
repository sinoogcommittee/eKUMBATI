import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'staff' | 'demo_admin';
  full_name: string;
}

interface AuthContextType {
  user: User | AdminUser | null;
  session: Session | null;
  loading: boolean;
  isDemoAdmin: boolean;
  isSupabaseConfigured: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  loginWithDemo: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_STORAGE_KEY = 'kumbati_demo_admin_active';

export const DEMO_ADMIN_USER: AdminUser = {
  id: 'demo-admin-id-001',
  email: 'demo@kumbati.bohol3.gov.ph',
  role: 'demo_admin',
  full_name: 'Team KUMBATI Staff (Demo Mode)',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DEMO_ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // If demo admin flag is active in localStorage, restore demo user
    if (isDemoAdmin) {
      setUser(DEMO_ADMIN_USER);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    // Initialize Supabase auth session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isDemoAdmin]);

  const signInWithPassword = async (email: string, password: string): Promise<{ error: Error | null }> => {
    // If entered demo credentials, activate demo mode
    if (email === 'demo@kumbati.bohol3.gov.ph' && (password === 'kumbati2027' || password === 'kumbati2025')) {
      loginWithDemo();
      return { error: null };
    }

    if (!isSupabaseConfigured) {
      return {
        error: new Error('Supabase is not configured yet. You can use the Demo Admin button to access the CMS.'),
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  const loginWithDemo = () => {
    setIsDemoAdmin(true);
    setUser(DEMO_ADMIN_USER);
    try {
      localStorage.setItem(DEMO_ADMIN_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const signOut = async () => {
    setIsDemoAdmin(false);
    try {
      localStorage.removeItem(DEMO_ADMIN_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }

    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoAdmin,
        isSupabaseConfigured,
        signInWithPassword,
        loginWithDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
