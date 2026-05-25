import { createContext, useState,type ReactNode } from "react";
import type { StrapiUser } from "../Types/api.responses";

interface AuthContextType {
    auth: {
        user: StrapiUser | null;
        username: string | null;
        accrssToken: string | null;
        
        rols:string | null
    };
    setAuth: React.Dispatch<
        React.SetStateAction<{
            user: StrapiUser | null;
            username: string | null;
            accrssToken: string | null;
            rols:string | null;
        }>
    >;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthUser = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {


    const [auth, setAuth] = useState<{
        user: StrapiUser | null;
        username: string | null;
        accrssToken: string | null;
        
        rols:string | null;
    }>({
        user: null,
        username: null,
        accrssToken: null,
        rols:  null,
    });


    return (
        <AuthUser.Provider value={{ auth, setAuth }}>
            {children}
        </AuthUser.Provider>
    );
};
