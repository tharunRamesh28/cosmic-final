import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from '../router';
import { AlertCircle } from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const { navigate } = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleAuthCallback = async () => {
      try {
        // Supabase with detectSessionInUrl automatically extracts code or access_token from URL hash / search params
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          if (isMounted) setErrorMessage(sessionError.message);
          return;
        }

        let currentUser = sessionData?.session?.user;

        if (!currentUser) {
          const { data: userData } = await supabase.auth.getUser();
          currentUser = userData?.user;
        }

        if (currentUser) {
          if (currentUser.id === '9163b26d-c7b1-4a13-8688-62ca34233fd9') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          // Check if session event triggers or listen briefly for state update
          const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (newSession && newSession.user) {
              authListener.subscription.unsubscribe();
              if (newSession.user.id === '9163b26d-c7b1-4a13-8688-62ca34233fd9') {
                navigate('/admin');
              } else {
                navigate('/');
              }
            }
          });

          // Fallback timeout if no session was returned after 4 seconds
          setTimeout(() => {
            if (isMounted) {
              navigate('/');
            }
          }, 3500);
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMessage(err?.message || 'Authentication error occurred.');
        }
      }
    };

    handleAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#191c1b] relative overflow-hidden flex flex-col justify-center items-center px-4 selection:bg-[#c8f179] selection:text-[#000000]">
      {/* Subtle Light Technical Grid Background */}
      <div className="tech-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm bg-white border border-[#c4c7c7] rounded-2xl p-8 text-center shadow-md">
        <div className="w-10 h-10 rounded-xl bg-black text-[#c8f179] mx-auto flex items-center justify-center mb-4">
          <span className="w-3 h-3 bg-[#c8f179] rounded-sm inline-block shadow-[0_0_10px_#c8f179]" />
        </div>

        <h1 className="font-display-tech text-xl font-bold tracking-tight text-black mb-1">
          COSMIC CIRCUIT
        </h1>
        <p className="font-mono-tech text-[11px] font-bold text-[#476800] uppercase tracking-wider mb-6">
          AUTHENTICATING
        </p>

        {errorMessage ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono-tech flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-black text-white hover:bg-neutral-800 font-mono-tech text-xs font-bold py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
            >
              RETURN TO LOGIN
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-6 h-6 border-2 border-[#476800]/20 border-t-[#476800] rounded-full animate-spin mx-auto" />
            <p className="font-mono-tech text-xs text-neutral-500">
              Verifying Google credentials &amp; establishing session...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
