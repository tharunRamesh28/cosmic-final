import React, { useState } from 'react';
import {
  Shield,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../router';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || 'Unable to connect to Google. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#191c1b] relative overflow-hidden flex flex-col justify-between selection:bg-[#c8f179] selection:text-[#000000]">
      {/* Subtle Light Technical Grid Background */}
      <div className="tech-grid absolute inset-0 opacity-40 pointer-events-none" />

      {/* Subtle Light Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(200, 241, 121, 0.4) 0%, rgba(200, 241, 121, 0.05) 50%, transparent 70%)',
        }}
      />

      {/* Top Header Identifier */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 bg-[#c8f179] rounded-sm shadow-[0_0_10px_#c8f179] inline-block" />
          <span className="font-display-tech text-base font-extrabold tracking-tight text-black">
            Cosmic Circuit
          </span>
        </a>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-bold text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO HOME</span>
        </button>
      </div>

      {/* Center White Authentication Card */}
      <div className="relative z-20 w-full max-w-[460px] mx-auto px-4 my-8">
        <div className="bg-white border border-[#c4c7c7] rounded-2xl p-7 sm:p-9 shadow-md transition-all duration-300">
          
          {/* Header Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-[#c8f179] mb-4 shadow-xs">
              <Shield className="w-6 h-6" />
            </div>

            <h1 className="font-display-tech text-2xl sm:text-3xl font-black tracking-tight text-black">
              COSMIC CIRCUIT
            </h1>

            <div className="font-mono-tech text-[11px] font-bold text-[#476800] uppercase tracking-widest mt-1">
              AUTHENTICATION GATEWAY
            </div>

            <p className="font-display-tech text-xs text-[#444748] mt-3 leading-relaxed">
              Sign in with your Google account to access your Cosmic Circuit projects and client workspace.
            </p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono-tech flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google Sign In Action */}
          <div className="space-y-4">
            <button
              type="button"
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-50 active:bg-neutral-100 text-[#1f1f1f] border border-[#747775]/50 hover:border-black font-display-tech text-sm font-semibold py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                  <span className="font-mono-tech text-xs tracking-wider">CONNECTING TO GOOGLE...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <span className="font-mono-tech text-[11px] text-neutral-400">
                SECURE AUTHENTICATION # VIA SUPABASE
              </span>
            </div>
          </div>

          {/* Footer Card Note */}
          <div className="mt-8 pt-5 border-t border-[#c4c7c7]/30 text-center">
            <span className="font-mono-tech text-[10px] text-neutral-400">
              COSMIC CIRCUIT • HARDWARE &amp; EMBEDDED SYSTEMS STUDIO
            </span>
          </div>
        </div>
      </div>

      {/* Page Bottom Footer */}
      <div className="relative z-20 pb-6 text-center font-mono-tech text-[10px] text-neutral-400">
        CONFIDENTIAL • PROPRIETARY HARDWARE SPECIFICATION PORTAL &copy; 2026
      </div>
    </div>
  );
};
