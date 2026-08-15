
const Header = () => {
    return (
        <nav className="fixed top-0 left-0 md:left-64 right-0 z-40 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-[0px_4px_12px_rgba(15,23,42,0.05)] dark:shadow-none flex items-center justify-between px-8 h-16 w-full md:w-[calc(100%-16rem)] transition-all duration-300">

            <div className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed">
                HealthCare Pro
            </div>

            <div className="flex items-center gap-4">
 
                <button aria-label="Notifications" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-lg p-2 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all duration-300">
                    <span className="material-symbols-outlined block">
                        notifications
                    </span>
                </button>


                <button aria-label="Settings" className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-lg p-2 focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 transition-all duration-300">
                    <span className="material-symbols-outlined block">settings</span>
                </button>


                <div className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant/30 shadow-sm">
                    <img
                        alt="Administrator profile picture"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAinAcL1tS-j0AYursF-lStNTWQLVHQeDOPnoKc15A9dkaRvizeJFlS4G0ZMRG3wkVj0vJMzbrEAbkelCC5lvLJMafs2DtsSfMCa13VNqOchO2dX9Y8CNx4Sqw7jeDTJFOPu2T93Yy1vo2sPfHdiNYATD0KqJsHT07eGJvnMiE0aU5KZY_DE64WCEyHAZYghUJOOaPsAqfFgh6eoJ07T8SDOCNDZt-mtf8JQ8R2DCUy19TdYF5Fn5ldu3jBIr-c3rgg_DsU4pg1cj0i"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
