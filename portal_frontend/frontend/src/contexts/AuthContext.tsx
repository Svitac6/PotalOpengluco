import React, { createContext, useState, useMemo, useCallback } from "react";
import { api } from "../utils/Api";

export type User = { name: string; surname: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // plus de loading initial

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api("/user", { method: "GET" });
      setUser(data?.data ?? null);
    } catch (err: any) {
      if (err.status === 401) {
        setUser(null); // utilisateur non connecté
      } else {
        console.error("Erreur refresh user:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string, remember: boolean) => {
    await api("/login", { method: "POST", json: { email, password, remember } });
    await refresh(); // récupère l'utilisateur après login
  }, [refresh]);

  const logout = useCallback(async () => {
    await api("/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout, refresh }),
    [user, loading, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
