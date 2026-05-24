import React from "react";
import Nurse_Coverage from "./Nurse_Coverage";

const Main_Chart = () => {
    return (
        <div className="md:col-span-8 bg-white rounded-xl card-shadow p-1 relative overflow-hidden group hover:ambient-glow transition-shadow duration-300">
                <Nurse_Coverage />
        </div>
    );
};

export default Main_Chart;
