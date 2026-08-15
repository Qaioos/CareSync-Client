const Navigation = () => {
  return (
            <aside className="fixed h-screen w-64 left-0 top-0 overflow-y-auto bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-r border-outline-variant/20 dark:border-outline/20 shadow-sm dark:shadow-none flex flex-col py-8 gap-2 hidden md:flex z-50">
                <div className="px-6 mb-8">
                    <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed mb-1">
                        HealthCare Pro
                    </div>
                    <div className="font-label-md text-label-md text-on-surface-variant">
                        Clinical Management
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {/* <!-- Active: Dashboard --> */}
                    <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary dark:text-primary-fixed font-bold border-l-4 border-primary dark:border-primary-fixed bg-primary-container/10 dark:bg-primary-container/20 active:scale-[0.98] transition-transform duration-150"
                        href="#"
                    >
                        <span
                            className="material-symbols-outlined" /*  style="font-variation-settings: 'FILL' 1;" */
                        >
                            dashboard
                        </span>
                        <span className="font-label-lg text-label-lg">
                            Dashboard
                        </span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150 border-l-4 border-transparent"
                        href="#"
                    >
                        <span className="material-symbols-outlined">group</span>
                        <span className="font-label-lg text-label-lg">
                            Staff
                        </span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150 border-l-4 border-transparent"
                        href="#"
                    >
                        <span className="material-symbols-outlined">
                            calendar_today
                        </span>
                        <span className="font-label-lg text-label-lg">
                            Scheduling
                        </span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150 border-l-4 border-transparent"
                        href="#"
                    >
                        <span className="material-symbols-outlined">
                            analytics
                        </span>
                        <span className="font-label-lg text-label-lg">
                            Analytics
                        </span>
                    </a>
                    <a
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant font-medium hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors duration-200 active:scale-[0.98] transition-transform duration-150 border-l-4 border-transparent"
                        href="#"
                    >
                        <span className="material-symbols-outlined">
                            notifications
                        </span>
                        <span className="font-label-lg text-label-lg">
                            Notifications
                        </span>
                    </a>
                </nav>
            </aside>
  )
}

export default Navigation
