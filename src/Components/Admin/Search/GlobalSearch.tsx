import { useEffect, useRef, useState } from "react";
import {
    MdCalendarMonth,
    MdGroups,
    MdLocalHospital,
    MdNotifications,
    MdSearch,
    MdTask,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useGlobalSearch from "../../../Features/search/useGlobalSearch";
import type {
    GlobalSearchResult,
    GlobalSearchType,
} from "../../../Features/search/globalSearch.types";

const resultIcons: Record<GlobalSearchType, React.ReactNode> = {
    staff: <MdGroups />,
    department: <MdLocalHospital />,
    shift: <MdCalendarMonth />,
    request: <MdNotifications />,
    task: <MdTask />,
};

const resultLabels: Record<GlobalSearchType, string> = {
    staff: "Staff",
    department: "Departments",
    shift: "Shifts",
    request: "Requests",
    task: "Tasks",
};

const GlobalSearch = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { results, isSearching } = useGlobalSearch(query);

    useEffect(() => {
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () =>
            document.removeEventListener("mousedown", closeOnOutsideClick);
    }, []);

    const openResult = (result: GlobalSearchResult) => {
        navigate(result.to);
        setQuery("");
        setIsOpen(false);
    };

    const showEmpty =
        query.trim().length >= 2 &&
        !isSearching &&
        results.length === 0 &&
        isOpen;

    return (
        <div ref={containerRef} className="relative w-full max-w-96">
            <MdSearch className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-[#91a5a2]" />
            <input
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={(event) => {
                    if (event.key === "Escape") setIsOpen(false);
                    if (event.key === "Enter" && results[0]) {
                        openResult(results[0]);
                    }
                }}
                className="w-full rounded-xl border border-[#dce9e6] bg-[#f4f8f7] py-2.5 pl-10 pr-4 text-sm text-[#163432] outline-none transition-all placeholder:text-[#8aa09d] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                placeholder="Search users, departments, shifts..."
                type="search"
                aria-label="Search across hospital data"
                aria-expanded={isOpen}
            />

            {isOpen && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(26rem,70vh)] overflow-y-auto rounded-2xl border border-[#dce9e6] bg-white p-2 shadow-[0_16px_40px_rgba(15,118,110,0.16)]">
                    {isSearching ? (
                        <p className="px-3 py-4 text-center text-sm text-[#7b918e]">
                            Searching...
                        </p>
                    ) : showEmpty ? (
                        <p className="px-3 py-4 text-center text-sm text-[#7b918e]">
                            No matching records found.
                        </p>
                    ) : (
                        results.map((result) => (
                            <button
                                key={result.id}
                                type="button"
                                onClick={() => openResult(result)}
                                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#f0f8f6] focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e5f5f1] text-lg text-primary-container">
                                    {resultIcons[result.type]}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
                                        {resultLabels[result.type]}
                                    </span>
                                    <span className="mt-0.5 block truncate text-sm font-bold text-[#163432]">
                                        {result.title}
                                    </span>
                                    {result.subtitle && (
                                        <span className="mt-0.5 block truncate text-xs text-[#7b918e]">
                                            {result.subtitle}
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
