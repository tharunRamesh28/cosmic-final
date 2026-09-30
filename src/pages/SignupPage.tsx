import React, { useState } from 'react';
import { CursorGrid } from '../components/CursorGrid';
import { Shield, Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter, Link } from '../router';

export const SignupPage: React.FC = () => {
  const { navigate } = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || 'Unable to create account. Please try again.');
        setLoading(false);
        return;
      }

      if (data.session) {
        // Immediate session created!
        navigate('/');
      } else if (data.user) {
        // Confirmation email required by Supabase project settings
        setSuccessMsg(
          'Account created successfully! If email confirmation is enabled on your account, please verify your email before logging in.'
        );
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);
      } else {
        setErrorMsg('Registration failed. Please try again.');
        setLoading(false);
      }
    } catch {
      setErrorMsg('Unable to connect to the authentication server. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] relative overflow-hidden flex flex-col justify-between selection:bg-[#B7FF3C] selection:text-[#0A0A0A]">
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-grid-dark absolute inset-0 opacity-25 pointer-events-none" />
        <CursorGrid color="185, 232, 106" maxOpacity={0.25} />
      </div>

      {/* Subtle Green Ambient Glow */}
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
          className="font-mono-tech text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          ALREADY REGISTERED? LOG IN →
        </Link>
      </div>

      {/* Center Compact Signup Panel */}
      <div className="relative z-20 w-full max-w-[440px] mx-auto px-4 my-8">
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
                CREATE YOUR ACCOUNT
              </h1>

              <div className="font-mono-tech text-[10px] font-bold text-[#B7FF3C] uppercase tracking-widest mt-1">
                ACCESS REGISTRATION
              </div>

              <p className="font-display-tech text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Register to access the Cosmic Circuit workspace.
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

            {/* Signup Form */}
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="font-mono-tech text-[11px] text-neutral-400 uppercase font-semibold block mb-1 tracking-wider">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Nikola Tesla"
                    className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-display-tech text-white placeholder-neutral-600 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-[11px] text-neutral-400 uppercase font-semibold block mb-1 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-display-tech text-white placeholder-neutral-600 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-[11px] text-neutral-400 uppercase font-semibold block mb-1 tracking-wider">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-display-tech text-white placeholder-neutral-600 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-tech text-[11px] text-neutral-400 uppercase font-semibold block mb-1 tracking-wider">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-lg pl-10 pr-3.5 py-2.5 text-xs font-display-tech text-white placeholder-neutral-600 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]/30 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B7FF3C] hover:bg-[#a8f22e] active:bg-[#97dd24] text-black font-mono-tech text-xs font-extrabold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(183,255,60,0.25)] hover:shadow-[0_0_25px_rgba(183,255,60,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>CREATING ACCOUNT...</span>
                  </>
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
              <p className="font-mono-tech text-xs text-neutral-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#B7FF3C] font-bold hover:underline ml-1 cursor-pointer"
                >
                  SIGN IN
                </Link>
              </p>
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
