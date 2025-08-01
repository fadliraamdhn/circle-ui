import { createContext, useContext, useState } from "react";
import type { AuthLogin } from "@/types/thread";
import type { ReactNode } from "react";

const AuthContext = createContext<AuthLogin | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))

    const login = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}