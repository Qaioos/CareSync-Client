import { MdSearch, MdTune } from "react-icons/md";
import type {
    NotificationSeverityFilter,
    NotificationTypeFilter,
} from "./notifications.utils";

interface NotificationToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    severity: NotificationSeverityFilter;
    onSeverityChange: (value: NotificationSeverityFilter) => void;
    type: NotificationTypeFilter;
    onTypeChange: (value: NotificationTypeFilter) => void;
}

const selectClassName =
    "w-full appearance-none rounded-xl border border-[#dce9e6] bg-[#f8fcfb] py-2.5 pl-10 pr-3 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

const NotificationToolbar = ({
    search,
    onSearchChange,
    severity,
    onSeverityChange,
    type,
    onTypeChange,
}: NotificationToolbarProps) => (
    <div className="flex flex-col gap-3 lg:flex-row">
        <label className="relative block lg:w-72">
            <MdSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]"
                aria-hidden="true"
            />
            <span className="sr-only">Search notifications</span>
            <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search requests..."
                className="w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] py-2.5 pl-10 pr-3 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
        </label>

        <label className="relative block lg:w-40">
            <MdTune
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]"
                aria-hidden="true"
            />
            <span className="sr-only">Filter by severity</span>
            <select
                value={severity}
                onChange={(event) =>
                    onSeverityChange(
                        event.target.value as NotificationSeverityFilter,
                    )
                }
                className={selectClassName}
            >
                <option value="all">All severity</option>
                <option value="Critical">Critical</option>
                <option value="Warning">Warning</option>
            </select>
        </label>

        <label className="relative block lg:w-44">
            <MdTune
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#91a5a2]"
                aria-hidden="true"
            />
            <span className="sr-only">Filter by type</span>
            <select
                value={type}
                onChange={(event) =>
                    onTypeChange(event.target.value as NotificationTypeFilter)
                }
                className={selectClassName}
            >
                <option value="all">All types</option>
                <option value="Shift_Swap">Shift swap</option>
                <option value="Leave_Request">Leave request</option>
            </select>
        </label>
    </div>
);

export default NotificationToolbar;
