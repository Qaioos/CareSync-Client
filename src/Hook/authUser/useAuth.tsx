import { useContext } from "react";
import { AuthUser } from "../../Context/AuthUser";

const useAuth = () => {
    const context = useContext(AuthUser);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }    
    
    return context;
};

export default useAuth;