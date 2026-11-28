import { useMemo, useState, type ReactNode } from "react";
import {
    MdAccessTime,
    MdGroups,
    MdMenu,
    MdSearch,
    MdWarningAmber,
} from "react-icons/md";
import useAuth from "../../../Hook/authUser/useAuth";
import NursePatientList from "./Components/NursePatientList";
import NurseSidebar from "./Components/NurseSidebar";
import NurseTaskList from "./Components/NurseTaskList";
import {
    assignedPatients,
    initialTasks,
    type NurseTask,
} from "./Data/nurseDashboard.data";

const getInitials = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

const NurseDashboard = () => {
    const { auth } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [tasks, setTasks] = useState<NurseTask[]>(initialTasks);

    const nurseName =
        auth.user?.FullName?.trim() || auth.username?.trim() || "Nurse";
    const firstName = nurseName.split(/\s+/)[0];
    const initials = getInitials(nurseName) || "N";
    const department = auth.user?.Department || "Clinical team";
    const unit = auth.user?.Unit_Floor || "Hospital ward";

    const visiblePatients = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return assignedPatients;
        }

        return assignedPatients.filter((patient) =>
            `${patient.name} ${patient.room} ${patient.status}`
                .toLowerCase()
                .includes(query),
        );
    }, [searchTerm]);

    const pendingTasks = tasks.filter((task) => !task.completed).length;
    const patientsNeedingAttention = assignedPatients.filter(
        (patient) => patient.status === "Attention",
    ).length;
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());

    const toggleTask = (taskId: number) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task,
            ),
        );
    };

    return (
        <div className="min-h-screen bg-[#f4f8f7]">
            <NurseSidebar
                name={nurseName}
                initials={initials}
                department={department}
                unit={unit}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#dce9e6] bg-white/90 px-4 shadow-[0_4px_18px_rgba(15,23,42,0.04)] backdrop-blur-xl md:left-72 md:px-8">
                    <button
                        type="button"
                        aria-label="Open navigation"
                        aria-expanded={isSidebarOpen}
                        className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dce9e6] bg-white text-[#607774] transition hover:bg-[#e8f4f1] hover:text-primary-container md:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <MdMenu className="text-2xl" />
                    </button>
                    <label className="hidden flex-1 items-center gap-2 text-[#607774] md:flex">
                        <MdSearch aria-hidden="true" className="text-xl" />
                        <input
                            className="w-full max-w-sm rounded-xl border border-[#dce9e6] bg-white px-4 py-2.5 text-sm text-[#163432] outline-none transition placeholder:text-[#91a5a2] focus:border-primary-container focus:ring-2 focus:ring-primary/20"
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search patients or rooms"
                            aria-label="Search patients or rooms"
                        />
                    </label>
                    <div className="ml-auto flex items-center gap-2 md:gap-4">
                        <div
                            className="ml-2 flex h-9 w-9 cursor-default items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#d8ebe7] text-xs font-bold text-primary-container shadow-sm"
                            aria-label={nurseName}
                        >
                            {initials}
                        </div>
                    </div>
            </header>

            <main
                className="mx-auto min-h-screen max-w-400 bg-[#f4f8f7] px-container-padding-mobile pb-24 pt-20 md:ml-72 md:px-container-padding-desktop"
                id="overview"
            >
                    <section className="mb-8 mt-8 flex flex-col justify-between gap-6 rounded-2xl border border-[#dce9e6] bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,118,110,0.06)] backdrop-blur-sm md:flex-row md:items-end">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-container">
                                Nurse workspace
                            </p>
                            <h1 className="text-2xl font-bold tracking-tight text-[#163432] md:text-3xl">
                                Good morning, {firstName}.
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-[#607774] md:text-base">
                                Your clinical overview for today.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-[#dce9e6] bg-white px-4 py-2.5 text-sm font-semibold text-[#607774] md:self-auto">
                            <span className="h-2 w-2 rounded-full bg-primary-container" />
                            {today}
                        </div>
                    </section>

                    <section
                        className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3"
                        aria-label="Shift summary"
                    >
                        <SummaryCard
                            icon={<MdGroups />}
                            label="Assigned patients"
                            value={assignedPatients.length}
                            detail="On your ward"
                            tone="teal"
                        />
                        <SummaryCard
                            icon={<MdAccessTime />}
                            label="Pending tasks"
                            value={pendingTasks}
                            detail="For this shift"
                            tone="green"
                        />
                        <SummaryCard
                            icon={<MdWarningAmber />}
                            label="Needs attention"
                            value={patientsNeedingAttention}
                            detail="Review patient list"
                            tone="amber"
                        />
                    </section>

                    <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <NurseTaskList
                                tasks={tasks}
                                onToggleTask={toggleTask}
                            />
                        </div>

                        <section
                            className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_20px_rgba(15,118,110,0.04)] lg:col-span-5"
                            id="shift"
                        >
                            <div className="mb-4 flex min-h-9 items-center justify-between gap-3">
                                <div>
                                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-primary-container">
                                        Your schedule
                                    </span>
                                    <h2 className="text-lg font-bold tracking-tight text-[#163432]">
                                        Current shift
                                    </h2>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf8ef] px-3 py-1.5 text-xs font-bold text-[#15803d]">
                                    <span className="h-2 w-2 rounded-full bg-[#15803d]" />
                                    On duty
                                </span>
                            </div>

                            <div className="my-7 flex items-baseline gap-2 text-[#163432]">
                                <strong className="text-2xl font-extrabold tracking-tight">
                                    07:00
                                </strong>
                                <span className="text-xs text-[#7b918e]">AM</span>
                                <span className="mx-2 h-px flex-1 bg-[#dce9e6]" />
                                <strong className="text-2xl font-extrabold tracking-tight">
                                    07:00
                                </strong>
                                <span className="text-xs text-[#7b918e]">PM</span>
                            </div>
                            <div
                                className="h-2 overflow-hidden rounded-full bg-[#edf3f1]"
                                role="img"
                                aria-label="Shift progress, in progress"
                            >
                                <span className="block h-full w-[38%] rounded-full bg-primary-container" />
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-[#7b918e]">
                                <span>Shift started</span>
                                <span>12 hours</span>
                            </div>

                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#dce9e6] bg-[#f8fcfb] p-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f1] text-lg text-primary-container">
                                    <MdAccessTime aria-hidden="true" />
                                </span>
                                <div className="grid flex-1 gap-1">
                                    <span className="text-xs text-[#7b918e]">
                                        Next break
                                    </span>
                                    <strong className="text-sm text-[#163432]">
                                        11:30 AM
                                    </strong>
                                </div>
                                <span className="rounded-full bg-[#e5f5f1] px-3 py-1.5 text-xs font-bold text-primary-container">
                                    45 min
                                </span>
                            </div>

                            <p className="mt-4 text-xs leading-5 text-[#7b918e]">
                                Keep your team updated if your availability
                                changes during the shift.
                            </p>
                        </section>
                    </div>

                    <NursePatientList
                        patients={visiblePatients}
                        searchTerm={searchTerm}
                        totalPatients={assignedPatients.length}
                    />

                    <footer className="mt-6 flex flex-col justify-between gap-2 text-xs text-[#91a5a2] sm:flex-row">
                        <span>HealthCare Pro clinical workspace</span>
                        <span>For authorized hospital staff</span>
                    </footer>
            </main>
        </div>
    );
};

interface SummaryCardProps {
    icon: ReactNode;
    label: string;
    value: number;
    detail: string;
    tone: "teal" | "green" | "amber";
}

const SummaryCard = ({
    icon,
    label,
    value,
    detail,
    tone,
}: SummaryCardProps) => {
    const toneClasses = {
        teal: "bg-[#e5f5f1] text-primary-container",
        green: "bg-[#eaf8ef] text-[#15803d]",
        amber: "bg-[#fff6df] text-[#b45309]",
    };

    return (
        <article className="flex items-center gap-4 rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_20px_rgba(15,118,110,0.04)]">
            <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${toneClasses[tone]}`}
                aria-hidden="true"
            >
                {icon}
            </span>
            <div>
                <p className="text-2xl font-extrabold text-[#163432]">
                    {value}
                </p>
                <p className="text-xs font-semibold text-[#7b918e]">
                    {label}
                </p>
                <p className="mt-1 text-xs text-[#91a5a2]">{detail}</p>
            </div>
        </article>
    );
};

export default NurseDashboard;
