import { useState, useEffect, useCallback } from 'react';
import { supabase, AUTHORIZED_ADMIN_UUID } from './supabase';
import { useRouter } from '../router';

export function useAdminAuth(requireAuth = true) {
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const verifyAdmin = useCallback(async (user: any) => {
    if (!user) {
      setIsAdmin(false);
      setAdminUser(null);
      return false;
    }

    // Step 1: Check user ID matches the authorized admin UUID
    if (user.id !== AUTHORIZED_ADMIN_UUID) {
      setIsAdmin(false);
      setAdminUser(null);
      setAuthError('Unauthorized: User is not the designated administrator.');
      return false;
    }

    setIsAdmin(true);
    setAdminUser(user);
    setAuthError(null);
    return true;
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkCurrentSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          if (mounted) {
            setIsAdmin(false);
            setAdminUser(null);
            setLoading(false);
            if (requireAuth) {
              navigate('/login');
            }
          }
          return;
        }

        const authorized = await verifyAdmin(session.user);
        if (mounted) {
          setLoading(false);
          if (requireAuth && !authorized) {
            navigate('/login');
          }
        }
      } catch (err) {
        if (mounted) {
          setIsAdmin(false);
          setAdminUser(null);
          setLoading(false);
          if (requireAuth) {
            navigate('/login');
          }
        }
      }
    }

    checkCurrentSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT' || !session) {
        setIsAdmin(false);
        setAdminUser(null);
        setLoading(false);
        if (requireAuth) {
          navigate('/login');
        }
      } else if (session?.user) {
        const authorized = await verifyAdmin(session.user);
        setLoading(false);
        if (requireAuth && !authorized) {
          navigate('/login');
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, requireAuth, verifyAdmin]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setAdminUser(null);
    navigate('/login');
  };

  return {
    loading,
    isAdmin,
    adminUser,
    authError,
    signOut,
  };
}
