import { MdMenu, MdNotifications, MdSettings, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../../Hook/authUser/useAuth";
import { getProfileAvatarUrl } from "../../../Features/profile/profile.utils";

interface HeaderProps {
    onOpenNavigation: () => void;
}

const Header = ({ onOpenNavigation }: HeaderProps) => {
    const { auth } = useAuth();
    const avatarUrl = getProfileAvatarUrl(auth.user);

    return (
        <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#dce9e6] bg-white/90 px-4 shadow-[0_4px_18px_rgba(15,23,42,0.04)] backdrop-blur-xl md:left-72 md:px-8">
            <button
                type="button"
                aria-label="Open navigation"
                className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dce9e6] bg-white text-[#607774] transition hover:bg-[#e8f4f1] hover:text-primary-container md:hidden"
                onClick={onOpenNavigation}
            >
                <MdMenu className="text-2xl" />
            </button>

            <div className="hidden flex-1 items-center md:flex">
                <div className="relative w-96">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]" />
                    <input
                        className="w-full rounded-xl border border-[#dce9e6] bg-[#f4f8f7] py-2.5 pl-10 pr-4 text-sm text-[#163432] outline-none transition-all placeholder:text-[#8aa09d] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                        placeholder="Search across hospital data..."
                        type="text"
                    />
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2 md:gap-4">
                <button
                    aria-label="Notifications"
                    className="rounded-xl p-2 text-[#607774] transition-all hover:bg-[#e8f4f1] hover:text-primary-container focus:ring-2 focus:ring-primary/20"
                >
                    <MdNotifications className="text-xl" />
                </button>
                <Link
                    to="/admin/settings"
                    aria-label="Settings"
                    title="Settings"
                    className="rounded-xl p-2 text-[#607774] transition-all hover:bg-[#e8f4f1] hover:text-primary-container focus:ring-2 focus:ring-primary/20"
                >
                    <MdSettings className="text-xl" />
                </Link>
                <Link
                    to="/admin/profile"
                    aria-label="My profile"
                    title="My profile"
                    className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#d8ebe7] shadow-sm transition hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {avatarUrl ? (
                        <img
                            alt="Administrator profile"
                            className="h-full w-full object-cover"
                            src={avatarUrl}
                        />
                    ) : (
                        <span className="text-xs font-bold text-primary-container">
                            {(auth.user?.FullName || auth.user?.username || "AD")
                                .split(" ")
                                .slice(0, 2)
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;
