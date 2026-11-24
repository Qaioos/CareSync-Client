import { useState } from "react";
import Header from "../Pages/Header";
import Navigation from "../Pages/Navigation";

const Layout = () => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    return (
        <>
            <Navigation
                isOpen={isNavigationOpen}
                onClose={() => setIsNavigationOpen(false)}
            />
            <Header onOpenNavigation={() => setIsNavigationOpen(true)} />
        </>
    );
};

export default Layout;
