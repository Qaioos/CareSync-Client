import toast from "react-hot-toast";
import useAddTask from "../../Features/tasks/useAddTask";
import type { Task } from "../../Types/api.responses";
import AddTask from "./tasks/AddTask";
import Department_Grid from "./UI/Department_Grid";
import Emrgrncy_Alerts from "./UI/Emrgrncy_Alerts";
import Main_Chart from "./UI/Main_Chart";
import Shift_Performanc from "./UI/Shift_Performanc";
import Staffing_Widget from "./UI/Staffing_Widget";

import { useState } from "react";

const Main = () => {
    const [isOpen, setisOpen] = useState<boolean>(false)
    const { addTask, isLodaing ,iserr} = useAddTask()

    const handleAddTask =  async (formData : Task) =>{
        try {
            
            toast.promise(
            addTask(formData), 
            {
                loading: 'Task being saved...',
                success: <b>Saved successfully!</b>,
                error: <b>The task was saved, please try again later.!</b>,
            }
        )
        } catch {
            console.log(iserr)
        }
        if(!isLodaing){
            setisOpen(false)
        }

    }

    return (
        <main className="md:ml-64 pt-20 px-container-padding-mobile md:px-container-padding-desktop pb-24 max-w-400 mx-auto">
            {/* <!-- Header --> */}
            <div className="mb-section-margin mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className=" md:material-symbols-outlined   text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 material-symbols-outlined">
                        Supervisor Dashboard
                    </h2>
                    <p className="material-symbols-outlined   text-body-md text-on-surface-variant">
                        Real-time overview of hospital staffing and operational
                        efficiency.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border-[1.5px] border-primary text-primary material-symbols-outlined  text-label-lg rounded-lg hover:bg-primary/5 transition-colors">
                        Export Report
                    </button>
                    <button className="cursor-pointer px-4 py-2 bg-linear-to-b from-[#14B8A6] to-[#0F766E] text-white material-symbols-outlined  text-label-lg rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        Manage Shifts
                    </button>
                    <button onClick={()=>setisOpen(true)} className="cursor-pointer px-4 py-2 bg-linear-to-b from-[#14B8A6] to-[#0F766E] text-white material-symbols-outlined  text-label-lg rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        add Task
                    </button>
                </div>
            </div>
            
            <AddTask isOpen={isOpen} onClose={()=>setisOpen(false)} onAdd={handleAddTask} />
            {/*  <!-- Bento Grid Layout --> */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-margin">
                {/*  <!-- Main Chart: Nurse Coverage --> */}
                <Main_Chart />

                {/* <!-- Staffing Efficiency Widget --> */}
                <Staffing_Widget />

                {/*   <!-- Department Overview Grid --> */}
                <Department_Grid />

                {/*  <!-- Emergency Alerts & Activity Feed --> */}
                <Emrgrncy_Alerts />

                {/*  <!-- Shift Performance Bar Chart --> */}
                <Shift_Performanc/>
            </div>
        </main>
    );
};

export default Main;
