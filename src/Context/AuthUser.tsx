/* import { createContext, useState, type ReactNode } from "react";
import type { StrapiUser } from "../Types/api.responses";

interface AuthContextType {
    auth: {
        user: StrapiUser | null;
        username:string |null;
        token: string | null;
    };
    setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
    signUp: (user: StrapiUser, token: string) => void;
}


// eslint-disable-next-line react-refresh/only-export-components
export const AuthUser = createContext<AuthContextType|null>(null)

const signUp = (user: StrapiUser, token:string) =>{
    sessionStorage.clear()
    sessionStorage.setItem("jwt", token);
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const AuthProvider = ({children}:{children:ReactNode})=>{
    const [auth, setAuth] = useState<{ user: StrapiUser | null; username: string | null; token: string | null }>({
        user: null,
        username: null,
        token: null
    });

    return(
        <AuthUser.Provider value={{auth , setAuth, signUp}}>
            {children}
        </AuthUser.Provider>
    )
}

 */

import { createContext, useState, type ReactNode } from "react";
import type { StrapiUser } from "../Types/api.responses";

// 1. تم تعديل نوع الـ SetStateAction هنا ليتطابق تماماً مع بنية كائن الـ auth الصغير
interface AuthContextType {
    auth: {
        user: StrapiUser | null;
        username: string | null;
        token: string | null;
    };
    setAuth: React.Dispatch<React.SetStateAction<{ user: StrapiUser | null; username: string | null; token: string | null }>>;
    signUp: (user: StrapiUser, token: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthUser = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<{ user: StrapiUser | null; username: string | null; token: string | null }>({
        user: null,
        username: null,
        token: null
    });

    // 2. تم نقل دالة الـ signUp إلى داخل الـ Provider لتقوم بحفظ البيانات محلياً وتحديث الحالة معاً
    const signUp = (user: StrapiUser, token: string) => {
        sessionStorage.clear();
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        
        // التحديث الحي للحالة لكي تشعر به بقية مكونات مشروع CareSync فوراً
        setAuth({
            user: user,
            username: user.username,
            token: token
        });
    };
    
    return (
        // الآن يتم تمرير الدالة والحالة المتواابقتين بنسبة 100% مع شروط الـ TypeScript
        <AuthUser.Provider value={{ auth, setAuth, signUp }}>
            {children}
        </AuthUser.Provider>
    );
};
