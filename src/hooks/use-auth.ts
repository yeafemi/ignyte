import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    // Check for auth error in URL hash
    const hash = window.location.hash;
    if (hash && hash.includes("error=")) {
      const params = new URLSearchParams(hash.substring(1));
      const errorDesc = params.get("error_description") || params.get("error");
      if (errorDesc) {
        toast.error(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
        // Clean the hash from the URL
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }

    // 1. Subscribe to auth state changes (sync only)
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!active) return;
      setSession(s);
      setUser(s?.user ?? null);
    });

    // 2. Fetch initial session on mount
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const currentSession = data.session;
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
      }
    }).catch((err) => {
      console.error("Error getting session:", err);
      if (active) {
        setLoading(false);
      }
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Check admin status whenever user changes to avoid Supabase auth lock deadlock
  useEffect(() => {
    let active = true;

    if (user) {
      setCheckingAdmin(true);

      async function checkAdmin(userId: string) {
        try {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId)
            .eq("role", "admin")
            .maybeSingle();
          
          if (active) {
            setIsAdmin(!!data);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          if (active) {
            setIsAdmin(false);
          }
        } finally {
          if (active) {
            setCheckingAdmin(false);
            setLoading(false);
          }
        }
      }

      checkAdmin(user.id);
    } else {
      setIsAdmin(false);
      setCheckingAdmin(false);
    }

    return () => {
      active = false;
    };
  }, [user]);

  return { session, user, isAdmin, loading: loading || checkingAdmin };
}
