const Header = () => {
    return (
        <header className="fixed left-0 right-0 top-0 z-40 max-md:hidden h-16 items-center justify-between border-b border-[#dce9e6] bg-white/85 px-8 shadow-[0_4px_18px_rgba(15,23,42,0.04)] backdrop-blur-xl md:left-64 md:flex">
            <div className="flex-1 flex items-center">
                <div className="relative w-96">
                    
                    <input
                        className="w-full rounded-xl border border-[#dce9e6] bg-[#f4f8f7] py-2.5 pl-10 pr-4 text-sm text-[#163432] outline-none transition-all placeholder:text-[#8aa09d] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                        placeholder="Search across hospital data..."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    aria-label="Notifications"
                    className="rounded-xl p-2 text-[#607774] transition-all hover:bg-[#e8f4f1] hover:text-primary-container focus:ring-2 focus:ring-primary/20"
                >
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                </button>
                <button
                    aria-label="Settings"
                    className="rounded-xl p-2 text-[#607774] transition-all hover:bg-[#e8f4f1] hover:text-primary-container focus:ring-2 focus:ring-primary/20"
                >
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="ml-2 h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-[#d8ebe7] shadow-sm">
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
