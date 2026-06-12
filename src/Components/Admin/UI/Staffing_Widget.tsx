import { BiArrowFromBottom } from "react-icons/bi";

const Staffing_Widget = () => {
    return (
        <div className="md:col-span-4 bg-white rounded-xl card-shadow p-6 flex flex-col justify-between hover:ambient-glow transition-shadow duration-300">
            <div>
                <h3 className="material-symbols-outlined  text-headline-sm text-on-surface mb-1">
                    Staffing Efficiency
                </h3>
                <p className="material-symbols-outlined  text-body-sm text-on-surface-variant">
                    Current Shift Alignment
                </p>
            </div>

            <div className="flex items-center justify-center py-8">
                <div className="relative w-40 h-40">
                    <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                    >
                        <path
                            className="text-surface-container-high"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        ></path>
                        <path
                            className="text-[#14B8A6]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="82, 100" /* Ther is Control of {%} */
                            strokeWidth="3"
                        ></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined  text-headline-lg text-primary">
                            82%
                        </span>
                        <span className="material-symbols-outlined  text-label-sm text-[#10B981] flex items-center">
                            <span className="material-symbols-outlined  text-[14px]">
                                <BiArrowFromBottom/>
                            </span>
                            +4%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-surface-container-low p-3 rounded-lg">
                    <span className="material-symbols-outlined  text-label-sm text-on-surface-variant block mb-1">
                        Overtime Hrs
                    </span>
                    <span className="material-symbols-outlinedtext-headline-sm text-on-surface">
                        14.5
                    </span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg">
                    <span className="material-symbols-outlined  text-label-sm text-on-surface-variant block mb-1">
                        Agency Use
                    </span>
                    <span className="material-symbols-outlinedtext-headline-sm text-on-surface">
                        12%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Staffing_Widget;
