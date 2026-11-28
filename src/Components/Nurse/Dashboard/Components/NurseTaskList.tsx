import { MdAccessTime } from "react-icons/md";
import type { NurseTask } from "../Data/nurseDashboard.data";

interface NurseTaskListProps {
    tasks: NurseTask[];
    onToggleTask: (taskId: number) => void;
}

const NurseTaskList = ({ tasks, onToggleTask }: NurseTaskListProps) => (
    <section
        className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_20px_rgba(15,118,110,0.04)]"
        id="tasks"
    >
        <div className="mb-4 flex min-h-9 items-center justify-between gap-3">
            <div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-primary-container">
                    Your checklist
                </span>
                <h2 className="text-lg font-bold tracking-tight text-[#163432]">
                    Upcoming tasks
                </h2>
            </div>
        </div>

        <div className="grid">
            {tasks.map((task) => (
                <label
                    className="flex min-h-[72px] cursor-pointer items-center gap-3 border-t border-[#edf3f1] py-3"
                    key={task.id}
                >
                    <input
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                        type="checkbox"
                        className="h-4 w-4 shrink-0 accent-primary-container focus:ring-2 focus:ring-primary/20"
                        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
                    />
                    <span className="grid min-w-0 flex-1 gap-1">
                        <strong
                            className={`truncate text-sm font-semibold ${
                                task.completed
                                    ? "text-[#7b918e] line-through"
                                    : "text-[#344f4b]"
                            }`}
                        >
                            {task.title}
                        </strong>
                        <span className="text-xs text-[#7b918e]">
                            {task.detail}
                        </span>
                    </span>
                    <span
                        className={`inline-flex shrink-0 items-center gap-1.5 text-xs ${
                            task.priority === "urgent"
                                ? "font-semibold text-[#b45309]"
                                : "text-[#7b918e]"
                        }`}
                    >
                        <MdAccessTime
                            aria-hidden="true"
                            className="text-base"
                        />
                        {task.time}
                    </span>
                </label>
            ))}
        </div>

        <a
            className="mt-3 flex items-center justify-between border-t border-[#edf3f1] pt-4 text-sm font-bold text-primary-container transition hover:text-[#115e59]"
            href="#patients"
        >
            View assigned patients <span aria-hidden="true">&rarr;</span>
        </a>
    </section>
);

export default NurseTaskList;
