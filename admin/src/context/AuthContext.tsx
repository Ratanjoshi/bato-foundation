import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "../api/client";
import type { ApiResponse, LoginResponse } from "../types/donationCta";

interface AuthContextValue {
  token: string | null;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token"),
  );

  const login = async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    });

    if (!data.success || !data.data?.token) {
      throw new Error(data.msg || data.message || "Login failed");
    }

    localStorage.setItem("admin_token", data.data.token);
    setToken(data.data.token);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
