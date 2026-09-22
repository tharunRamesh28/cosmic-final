import React, { useState, useEffect } from 'react';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase, AUTHORIZED_ADMIN_UUID } from '../lib/supabase';
import { useRouter, Link } from '../router';

export const AdminLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checkingExisting, setCheckingExisting] = useState(true);

  // Check if already authenticated as authorized admin
  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          if (session.user.id === AUTHORIZED_ADMIN_UUID) {
            const { data: adminRecord } = await supabase
              .from('admin_users')
              .select('user_id')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (adminRecord) {
              navigate('/admin');
              return;
            }
          }
        }
      } catch {
        // ignore and show login form
      } finally {
        setCheckingExisting(false);
      }
    }
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(error.message || 'Authentication failed. Please verify credentials.');
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setErrorMsg('Authentication failed: No user session established.');
        setLoading(false);
        return;
      }

      // 1. Check UUID match
      if (user.id !== AUTHORIZED_ADMIN_UUID) {
        await supabase.auth.signOut();
        setErrorMsg('Unauthorized access: This account does not have administrative privileges.');
        setLoading(false);
        return;
      }

      // 2. Verify existence in public.admin_users
      const { data: adminRecord, error: adminQueryErr } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (adminQueryErr || !adminRecord) {
        await supabase.auth.signOut();
        setErrorMsg('Unauthorized access: User record not found in admin registry.');
        setLoading(false);
        return;
      }

      // Authorized! Proceed to /admin
      navigate('/admin');
    } catch (err: any) {
      setErrorMsg('An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingExisting) {
    return (
      <div className="min-h-screen bg-[#f9faf7] flex items-center justify-center font-mono-tech text-xs text-neutral-500">
        VERIFYING SESSION...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9faf7] text-[#191c1b] flex flex-col justify-between p-6 sm:p-10 selection:bg-[#c8f179] selection:text-[#000000]">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#444748] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO SITE</span>
        </Link>
        <div className="font-mono-tech text-xs text-neutral-400">
          COSMIC CIRCUIT # SECURITY PORTAL
        </div>
      </div>

      {/* Main Login Box */}
      <div className="w-full max-w-md mx-auto my-12">
        <div className="bg-white border border-[#c4c7c7]/70 rounded-2xl p-8 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#000000] text-[#c8f179] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-mono-tech text-[10px] text-[#476800] uppercase tracking-widest font-bold block mb-1">
              # RESTRICTED ACCESS
            </span>
            <h1 className="font-display-tech text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight">
              ADMINISTRATOR LOGIN
            </h1>
            <p className="font-display-tech text-xs text-[#444748] mt-1.5">
              Secure authentication for Cosmic Circuit technical management
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono-tech flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-mono-tech text-xs text-neutral-600 uppercase font-bold block mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cosmiccircuit.com"
                  autoComplete="email"
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg pl-10 pr-3.5 py-3 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono-tech text-xs text-neutral-600 uppercase font-bold block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg pl-10 pr-3.5 py-3 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#000000] text-white font-mono-tech text-xs font-bold py-3.5 px-6 rounded-lg hover:bg-[#222222] active:bg-[#000000] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>VERIFYING CREDENTIALS...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-[#c4c7c7]/30 text-center">
            <p className="font-mono-tech text-[10px] text-neutral-400 leading-relaxed">
              Authorized personnel only. All access attempts and administrative interactions are logged.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center font-mono-tech text-[10px] text-neutral-400">
        COSMIC CIRCUIT &copy; 2026 # HARDWARE & EMBEDDED SYSTEMS STUDIO
      </div>
    </div>
  );
};
