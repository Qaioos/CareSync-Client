import { createContext, useEffect, useState, type ReactNode } from "react";
import type { StrapiUser } from "../Types/api.responses";

interface AuthState {
    user: StrapiUser | null;
    username: string | null;
    accrssToken: string | null;
    rols: string | null;
}

interface AuthContextType {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthUser = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>(() => {
        const savedAuth = sessionStorage.getItem("caresync-auth");

        if (!savedAuth) {
            return {
                user: null,
                username: null,
                accrssToken: null,
                rols: null,
            };
        }

        try {
            return JSON.parse(savedAuth) as AuthState;
        } catch {
            sessionStorage.removeItem("caresync-auth");
            return {
                user: null,
                username: null,
                accrssToken: null,
                rols: null,
            };
        }
    });

    useEffect(() => {
        if (auth.accrssToken && auth.rols) {
            sessionStorage.setItem("caresync-auth", JSON.stringify(auth));
        } else {
            sessionStorage.removeItem("caresync-auth");
        }
    }, [auth]);

    return (
        <AuthUser.Provider value={{ auth, setAuth }}>
            {children}
        </AuthUser.Provider>
    );
};
