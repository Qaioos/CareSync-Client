const Department_Grid = () => {
    return (
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*  <!-- ICU --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlined text-headline-sm text-on-surface">
                        ICU
                    </h4>
                    <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary material-symbols-outlined  text-label-sm rounded-full">
                        Optimal
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined text-headline-md text-primary block">
                            1:2
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="material-symbols-outlined text-body-md text-on-surface block">
                            18/20
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Beds Active
                        </span>
                    </div>
                </div>
            </div>
            {/*   <!-- ED --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#F59E0B]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlinedtext-headline-sm text-on-surface">
                        Emergency
                    </h4>
                    <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#B45309] material-symbols-outlined   text-label-sm rounded-full">
                        High Vol
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined  text-headline-md text-primary block">
                            1:4
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="font-body-md text-body-md text-on-surface block">
                            42
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Waiting
                        </span>
                    </div>
                </div>
            </div>
            {/*    <!-- MedSurg --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l border-[#10B981]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlined text-headline-sm text-on-surface">
                        Med/Surg
                    </h4>
                    <span className="px-3 py-1 bg-[#10B981]/20 text-[#047857] material-symbols-outlined   text-label-sm rounded-full">
                        Stable
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined text-headline-md text-primary block">
                            1:5
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="material-symbols-outlined text-body-md text-on-surface block">
                            34/40
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Beds Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department_Grid;
