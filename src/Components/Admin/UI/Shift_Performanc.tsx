const Shift_Performanc = () => {
    return (
        <div className="md:col-span-8 bg-white rounded-xl card-shadow p-6 mt-6 md:mt-0">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="material-symbols-outlinedtext-headline-sm text-on-surface">
                        Shift Performance Metrics
                    </h3>
                    <p className="material-symbols-outlined   text-label-sm text-on-surface-variant mt-1">
                        Patient admissions vs discharges by shift
                    </p>
                </div>
            </div>
            <div className="h-48 w-full flex items-end gap-6 px-4">
                {/*  <!-- Day Shift --> */}
                <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                        <div className="w-1/3 bg-[#14B8A6] rounded-t-sm h-[80%] group-hover:bg-[#0F766E] transition-colors"></div>
                        <div className="w-1/3 bg-surface-variant rounded-t-sm h-[60%] group-hover:bg-surface-dim transition-colors"></div>
                    </div>
                    <span className="material-symbols-outlined   text-label-md text-on-surface">
                        Day
                    </span>
                </div>
                {/*   <!-- Evening Shift --> */}
                <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                        <div className="w-1/3 bg-[#14B8A6] rounded-t-sm h-[65%] group-hover:bg-[#0F766E] transition-colors"></div>
                        <div className="w-1/3 bg-surface-variant rounded-t-sm h-[45%] group-hover:bg-surface-dim transition-colors"></div>
                    </div>
                    <span className="material-symbols-outlined   text-label-md text-on-surface">
                        Evening
                    </span>
                </div>
                {/*   <!-- Night Shift --> */}
                <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                        <div className="w-1/3 bg-[#14B8A6] rounded-t-sm h-[40%] group-hover:bg-[#0F766E] transition-colors"></div>
                        <div className="w-1/3 bg-surface-variant rounded-t-sm h-[30%] group-hover:bg-surface-dim transition-colors"></div>
                    </div>
                    <span className="material-symbols-outlined   text-label-md text-on-surface">
                        Night
                    </span>
                </div>
                {/*  <!-- Weekend --> */}
                <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                        <div className="w-1/3 bg-[#14B8A6] rounded-t-sm h-[55%] group-hover:bg-[#0F766E] transition-colors"></div>
                        <div className="w-1/3 bg-surface-variant rounded-t-sm h-[50%] group-hover:bg-surface-dim transition-colors"></div>
                    </div>
                    <span className="material-symbols-outlined   text-label-md text-on-surface">
                        Weekend
                    </span>
                </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-4 pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#14B8A6]"></div>
                    <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                        Admissions
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-surface-variant"></div>
                    <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                        Discharges
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Shift_Performanc;
