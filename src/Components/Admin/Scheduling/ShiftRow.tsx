import { MdAccessTime, MdGroups } from "react-icons/md";
import type { Shift } from "../../../Types/scheduling";
import {
    formatShiftDate,
    formatShiftTime,
    getShiftStaff,
} from "./scheduling.utils";

const ShiftRow = ({ shift }: { shift: Shift }) => {
    const typeColor =
        {
            Day: "bg-[#e5f5f1] text-primary-container",
            Evening: "bg-[#fff6df] text-[#b45309]",
            Night: "bg-[#edf0ff] text-[#4f46a5]",
        }[shift.ShiftType || ""] || "bg-[#f1f5f4] text-[#718783]";
    const [weekday, day] = formatShiftDate(shift.StartTime).split(",");

    return (
        <article className="flex flex-col gap-4 px-5 py-5 transition hover:bg-[#f8fcfb] md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
                <div className="hidden min-w-20 text-center sm:block">
                    <p className="text-xs font-bold uppercase text-[#91a5a2]">
                        {weekday}
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#163432]">
                        {day}
                    </p>
                </div>
                <div className="h-12 w-1 rounded-full bg-primary-container" />
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-[#163432]">
                            {shift.Department || "Unassigned department"}
                        </h4>
                        <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${typeColor}`}
                        >
                            {shift.ShiftType || "Shift"}
                        </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#7b918e]">
                        <MdAccessTime aria-hidden="true" />
                        {formatShiftTime(shift.StartTime)} -{" "}
                        {formatShiftTime(shift.EndTime)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 pl-5 md:pl-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9efea] text-primary-container">
                    <MdGroups aria-hidden="true" />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
                        Assigned staff
                    </p>
                    <p className="max-w-xs truncate text-sm font-semibold text-[#365653]">
                        {getShiftStaff(shift)}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ShiftRow;
