import toast from "react-hot-toast";
import useAddTask from "../../../Features/tasks/useAddTask";
import type { Task } from "../../../Types/api.responses";
import AddTask from "../tasks/AddTask";
import Department_Grid from "../UI/Department_Grid";
import Emrgrncy_Alerts from "../UI/Emrgrncy_Alerts";
import Main_Chart from "../UI/Main_Chart";
import Shift_Performanc from "../UI/Shift_Performanc";
import Staffing_Widget from "../UI/Staffing_Widget";

import { useState } from "react";
import BtnExport from "../BtnExportPdf/BtnExport";

const Main = () => {
    const [isOpen, setisOpen] = useState<boolean>(false);
    const { addTask, isLodaing, iserr } = useAddTask();

    const handleAddTask = async (formData: Task) => {
        try {
            toast.promise(addTask(formData), {
                loading: "Task being saved...",
                success: <b>Saved successfully!</b>,
                error: <b>The task was saved, please try again later.!</b>,
            });
        } catch {
            console.log(iserr);
        }
        if (!isLodaing) {
            setisOpen(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f8f7] md:ml-64 pt-20 px-container-padding-mobile md:px-container-padding-desktop pb-24 max-w-400 mx-auto">
            {/* <!-- Header --> */}
            <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 rounded-2xl border border-[#dce9e6] bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,118,110,0.06)] backdrop-blur-sm">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                        Operations overview
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-[#163432] md:text-3xl">
                        Supervisor Dashboard
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#607774] md:text-base">
                        Real-time overview of hospital staffing and operational
                        efficiency.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <BtnExport />
                    <button
                        onClick={() => setisOpen(true)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0f766e] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.22)] transition hover:-translate-y-0.5 hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-[#14b8a6]/20"
                    >
                        <span className="text-lg leading-none">+</span>
                        Add task
                    </button>
                </div>
            </div>

            <AddTask
                isOpen={isOpen}
                onClose={() => setisOpen(false)}
                onAdd={handleAddTask}
            />
            {/*  <!-- Bento Grid Layout --> */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                {/*  <!-- Main Chart: Nurse Coverage --> */}
                <Main_Chart />

                {/* <!-- Staffing Efficiency Widget --> */}
                <Staffing_Widget />

                {/*   <!-- Department Overview Grid --> */}
                <Department_Grid />

                {/*  <!-- Emergency Alerts & Activity Feed --> */}
                <Emrgrncy_Alerts />

                {/*  <!-- Shift Performance Bar Chart --> */}
                <Shift_Performanc />
            </div>
        </main>
    );
};

export default Main;
