import {
    MdAnalytics,
    MdCalendarMonth,
    MdClose,
    MdDashboard,
    MdGroups,
    MdLocalHospital,
    MdNotifications,
} from "react-icons/md";
import { Link } from "react-router-dom";

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavigationProps) => {
    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    className="fixed inset-0 z-40 bg-[#163432]/35 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}
            <nav
                className={`fixed left-0 top-0 z-50 flex h-dvh w-72 flex-col overflow-y-auto border-r border-[#dce9e6] bg-[#f8fcfb] px-5 py-6 shadow-[8px_0_24px_rgba(15,118,110,0.12)] transition-transform duration-300 md:z-50 md:w-72 md:translate-x-0 md:shadow-[8px_0_24px_rgba(15,118,110,0.04)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="mb-10 flex items-center justify-between gap-3 px-2">
                    <p className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-white shadow-[0_8px_18px_rgba(15,118,110,0.2)]">
                        <MdLocalHospital className="text-3xl" />
                    </p>

                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg font-extrabold tracking-tight text-[#163432]">
                            HealthCare Pro
                        </h1>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7b918e]">
                            Clinical Management
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close navigation"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#607774] transition hover:bg-[#e8f4f1] md:hidden"
                        onClick={onClose}
                    >
                        <MdClose className="text-xl" />
                    </button>
                </div>
                <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#91a5a2]">
                    Workspace
                </div>
                <div className="flex flex-1 flex-col gap-1 px-0">
                    <Link
                        className="group flex items-center gap-4 rounded-xl border border-[#bfe5de] bg-[#e5f5f1] px-4 py-3 font-bold text-primary-container shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                        to="/admin"
                        onClick={onClose}
                    >
                        <MdDashboard
                            className="text-[21px]"
                            aria-hidden="true"
                        />
                        <span className="text-sm">Dashboard</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-4 rounded-xl px-4 py-3 font-medium text-[#607774] transition-all duration-200 hover:translate-x-1 hover:bg-[#e8f4f1] hover:text-primary-container active:scale-[0.98]"
                        to="/admin/staff"
                        onClick={onClose}
                    >
                        <MdGroups className="text-[21px]" aria-hidden="true" />
                        <span className="text-sm">Staff</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-4 rounded-xl px-4 py-3 font-medium text-[#607774] transition-all duration-200 hover:translate-x-1 hover:bg-[#e8f4f1] hover:text-primary-container active:scale-[0.98]"
                        to="/admin/scheduling"
                        onClick={onClose}
                    >
                        <MdCalendarMonth
                            className="text-[21px]"
                            aria-hidden="true"
                        />
                        <span className="text-sm">Scheduling</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-4 rounded-xl px-4 py-3 font-medium text-[#607774] transition-all duration-200 hover:translate-x-1 hover:bg-[#e8f4f1] hover:text-primary-container active:scale-[0.98]"
                        to="/admin/analytics"
                        onClick={onClose}
                    >
                        <MdAnalytics
                            className="text-[21px]"
                            aria-hidden="true"
                        />
                        <span className="text-sm">Analytics</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-4 rounded-xl px-4 py-3 font-medium text-[#607774] transition-all duration-200 hover:translate-x-1 hover:bg-[#e8f4f1] hover:text-primary-container active:scale-[0.98]"
                        to="/admin/notifications"
                        onClick={onClose}
                    >
                        <MdNotifications
                            className="text-[21px]"
                            aria-hidden="true"
                        />
                        <span className="text-sm">Notifications</span>
                    </Link>
                </div>
                <div className="mt-8 rounded-2xl border border-[#dce9e6] bg-white p-3 shadow-[0_8px_20px_rgba(15,118,110,0.05)]">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9efea] text-sm font-bold text-primary-container">
                            AD
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-[#163432]">
                                Administrator
                            </p>
                            <p className="truncate text-xs text-[#7b918e]">
                                System control center
                            </p>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-secondray shadow-[0_0_0_4px_#e5f5f1]" />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
