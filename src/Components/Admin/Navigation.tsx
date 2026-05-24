import { MdLocalHospital } from "react-icons/md";

const Navigation = () => {
    return (
        <nav className=" hidden md:flex bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl fixed h-screen w-64 left-0 top-0 overflow-y-auto border-r border-outline-variant/20 dark:border-outline/20 shadow-sm dark:shadow-none flex-col py-8 gap-2 z-50">
            <div className="px-8 mb-8 flex items-center gap-3">
                <p className="my-10"><MdLocalHospital className="text-primary text-4xl"/></p>

                <div>
                    <h1 className="font-headline-md material-symbols-outlined  font-bold text-primary dark:text-primary-fixed">
                        HealthCare Pro
                    </h1>
                    <p className="material-symbols-outlined text-label-sm material-symbols-outlined">
                        Clinical Management
                    </p>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-1 px-5">
                <a
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-primary dark:text-primary-fixed font-bold border-r-4 border-primary dark:border-primary-fixed bg-primary-container/10 dark:bg-primary-container/20 active:scale-[0.98] transition-transform duration-150"
                    href="#"
                >
                    <span className="material-symbols-outlined ">dashboard</span>
                
                </a>
                <a
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150"
                    href="#"
                >
                    <span className="material-symbols-outlined">group</span>
                    <span className="material-symbols-outlined">Staff</span>
                </a>
                <a
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150"
                    href="#"
                >
                    <span className="material-symbols-outlined">
                        Scheduling
                    </span>
                </a>
                <a
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150"
                    href="#"
                >
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="material-symbols-outlined">
                        Analytics
                    </span>
                </a>
                <a
                    className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150"
                    href="#"
                >
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                    <span className="material-symbols-outlined">
                        Notifications
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Navigation;
