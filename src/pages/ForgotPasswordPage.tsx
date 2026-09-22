import React, { useState } from 'react';
import { Shield, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from '../router';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/login',
      });

      if (error) {
        setErrorMsg(error.message || 'Unable to transmit reset link. Please check your email.');
      } else {
        setSuccessMsg('Password recovery instructions transmitted. Please check your inbox.');
      }
    } catch {
      setErrorMsg('Unable to connect to the authentication server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden flex flex-col justify-between selection:bg-[#B7FF3C] selection:text-[#0A0A0A]">
      {/* Subtle Grid */}
      <div className="tech-grid-dark absolute inset-0 opacity-25 pointer-events-none" />

      {/* Subtle Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 -z-10"
        style={{
          background:
            'radial-gradient(circle, #B7FF3C 0%, rgba(183, 255, 60, 0.08) 35%, transparent 70%)',
        }}
      />

      {/* Top Bar */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#B7FF3C] rounded-xs shadow-[0_0_8px_#B7FF3C] inline-block" />
          <span className="font-display-tech text-sm font-extrabold tracking-tight text-white uppercase">
            Cosmic Circuit
          </span>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SIGN IN</span>
        </Link>
      </div>

      {/* Center Compact Panel */}
      <div className="relative z-20 w-full max-w-[420px] mx-auto px-4 my-8">
        <div className="relative">
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B7FF3C]/50 pointer-events-none" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B7FF3C]/50 pointer-events-none" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B7FF3C]/50 pointer-events-none" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B7FF3C]/50 pointer-events-none" />

          <div className="bg-[#111111]/95 border border-neutral-800 hover:border-neutral-700 rounded-xl p-8 sm:p-9 shadow-2xl backdrop-blur-md transition-all duration-300">
            {/* Header Branding */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black border border-neutral-800 text-[#B7FF3C] mb-3 shadow-sm">
                <Shield className="w-5 h-5" />
              </div>

              <h1 className="font-display-tech text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                PASSWORD RECOVERY
              </h1>

              <div className="font-mono-tech text-[10px] font-bold text-[#B7FF3C] uppercase tracking-widest mt-1">
                CREDENTIAL RESET
              </div>

              <p className="font-display-tech text-xs text-neutral-400 mt-2 leading-relaxed">
                Enter your email address to receive a secure password recovery link.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-mono-tech flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-5 p-3.5 rounded-lg bg-[#B7FF3C]/10 border border-[#B7FF3C]/30 text-[#B7FF3C] text-xs font-mono-tech flex items-start gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#B7FF3C] mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="font-mono-tech text-[11px] text-neutral-400 uppercase font-semibold block mb-1.5 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-display-tech text-white placeholder-neutral-600 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]/30 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B7FF3C] hover:bg-[#a8f22e] active:bg-[#97dd24] text-black font-mono-tech text-xs font-extrabold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(183,255,60,0.25)] hover:shadow-[0_0_25px_rgba(183,255,60,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-3 group"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT RESET LINK</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
              <Link
                to="/login"
                className="font-mono-tech text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Remember your password?{' '}
                <span className="text-[#B7FF3C] font-bold underline ml-1">SIGN IN</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 pb-6 text-center font-mono-tech text-[10px] text-neutral-600 uppercase tracking-widest">
        COSMIC CIRCUIT &copy; 2026 # SECURE ACCESS GATEWAY
      </div>
    </div>
  );
};
