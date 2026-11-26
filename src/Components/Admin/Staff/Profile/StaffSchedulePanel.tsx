import { MdAccessTime, MdCalendarMonth } from "react-icons/md";
import type { Shift } from "../../../../Types/scheduling";
import {
    formatShiftDate,
    formatShiftTime,
} from "../../Scheduling/scheduling.utils";

interface StaffSchedulePanelProps {
    shifts: Shift[];
    error: string;
}

const StaffSchedulePanel = ({ shifts, error }: StaffSchedulePanelProps) => (
    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_12px_30px_rgba(15,118,110,0.06)] lg:col-span-4">
        <div className="border-b border-[#e7efed] px-5 py-4">
            <h2 className="flex items-center gap-2 font-extrabold text-[#163432]">
                <MdCalendarMonth
                    aria-hidden="true"
                    className="text-xl text-primary-container"
                />
                Work schedule
            </h2>
            <p className="mt-1 text-sm text-[#7b918e]">
                {shifts.length} assigned {shifts.length === 1 ? "shift" : "shifts"}
            </p>
        </div>

        {error ? (
            <div role="alert" className="p-5 text-sm text-[#a12b20]">
                {error}
            </div>
        ) : shifts.length === 0 ? (
            <div className="px-5 py-10 text-center">
                <MdAccessTime className="mx-auto text-3xl text-[#91a5a2]" />
                <p className="mt-2 text-sm font-semibold text-[#365653]">
                    No assigned shifts
                </p>
            </div>
        ) : (
            <div className="divide-y divide-[#edf3f1]">
                {shifts.map((shift) => (
                    <div
                        key={
                            shift.documentId ||
                            shift.id ||
                            `${shift.StartTime}-${shift.EndTime}`
                        }
                        className="px-5 py-4"
                    >
                        <p className="font-bold text-[#163432]">
                            {shift.ShiftType || "Shift"}
                        </p>
                        <p className="mt-1 text-xs text-[#607774]">
                            {formatShiftDate(shift.StartTime)}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#607774]">
                            <MdAccessTime aria-hidden="true" />
                            {formatShiftTime(shift.StartTime)} –{" "}
                            {formatShiftTime(shift.EndTime)}
                        </p>
                        <p className="mt-1 text-xs text-[#7b918e]">
                            {shift.Department || "Unassigned department"}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </section>
);

export default StaffSchedulePanel;
