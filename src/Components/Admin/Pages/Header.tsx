import { MdMenu, MdNotifications, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../../Hook/authUser/useAuth";
import { getProfileAvatarUrl } from "../../../Features/profile/profile.utils";
import GlobalSearch from "../Search/GlobalSearch";

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
                <GlobalSearch />
            </div>
            <div className="ml-auto flex items-center gap-2 md:gap-4">
                <Link
                    to="/admin/notifications"
                    aria-label="Notifications"
                    title="Notifications"
                    className="rounded-xl p-2 text-[#607774] transition-all hover:bg-[#e8f4f1] hover:text-primary-container focus:ring-2 focus:ring-primary/20"
                >
                    <MdNotifications className="text-xl" />
                </Link>
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
