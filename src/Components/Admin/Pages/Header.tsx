
const Header = () => {
    return (
        <header className="hidden md:flex bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md fixed top-0 right-0 left-64 z-40 shadow-[0px_4px_12px_rgba(15,23,42,0.05)] dark:shadow-none flex items-center justify-between px-8 h-16">
            <div className="flex-1 flex items-center">
                <div className="relative w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        
                    </span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-[#14B8A6] focus:ring-[3px] focus:ring-[#14B8A6]/20 transition-all"
                        placeholder="Search across hospital data..."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-lg transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 duration-300">
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                </button>
                <button className="p-2 text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest rounded-lg transition-all focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-fixed/20 duration-300">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-8 w-8 rounded-full bg-surface-container-high overflow-hidden ml-2 border border-outline-variant/30 cursor-pointer">
                    <img
                        alt="Administrator Profile"
                        className="w-full h-full object-cover"
                        data-alt="A professional headshot of a confident female healthcare administrator in a bright, modern clinical setting. Soft, natural lighting. Dressed in business casual attire with a subtle stethoscope."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDWjh5-VyOMTaw6HRfWQAppMcebNw1gyvkQdqZZUHF9F9CBF8eUYSlv9o9FH3e1KWPPyCgxZX8drU_73qrHu1iKf6f3YLl8xmOSsr2FocpJp5ISFkaiy42W1YNMzn75SAT3vZ4JXIF8DhChvDXHaHLVdu-ZnV25sFU9_9px0-DXSVKR8hYGCtEeIDIje12PRyGdhyAXNlnx9Yct_5zEVzxvYG1aMaqgEVOPM7SxX5USgjIXAaSL6BYiy-qOLcMllRspQD0SGuKqxF"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
