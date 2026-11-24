import { MdSearch, MdTune } from "react-icons/md";

export interface FilterOption<T extends string> {
    label: string;
    value: T;
}

interface ResourceToolbarProps<T extends string> {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder: string;
    filterValue: T;
    onFilterChange: (value: T) => void;
    filterLabel: string;
    filterOptions: FilterOption<T>[];
}

const ResourceToolbar = <T extends string>({
    search,
    onSearchChange,
    searchPlaceholder,
    filterValue,
    onFilterChange,
    filterLabel,
    filterOptions,
}: ResourceToolbarProps<T>) => (
    <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block sm:w-72">
            <MdSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]"
                aria-hidden="true"
            />
            <span className="sr-only">Search</span>
            <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] py-2.5 pl-10 pr-3 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
        </label>
        <label className="relative block sm:w-44">
            <MdTune
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]"
                aria-hidden="true"
            />
            <span className="sr-only">{filterLabel}</span>
            <select
                value={filterValue}
                onChange={(event) => onFilterChange(event.target.value as T)}
                className="w-full appearance-none rounded-xl border border-[#dce9e6] bg-[#f8fcfb] py-2.5 pl-10 pr-3 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            >
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    </div>
);

export default ResourceToolbar;
