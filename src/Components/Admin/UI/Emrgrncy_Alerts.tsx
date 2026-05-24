//React Icons
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { LiaSyncAltSolid } from "react-icons/lia";
import { IoWarning } from "react-icons/io5";
const Emrgrncy_Alerts = () => {
    return (
        <div className="md:col-span-4  bg-white rounded-xl card-shadow p-6 flex flex-col gap-6 row-span-2">
            <div>
                <h3 className="material-symbols-outlined  text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-4xl  text-error">
                        <IoWarning  />

                    </span>
                    Critical Alerts
                </h3>

                <div className="space-y-3 overflow-y-scroll h-40">
                    <div className="bg-error-container/50 border border-error-container p-3 rounded-lg flex gap-3 items-start">
                        <span className="material-symbols-outlined   text-error mt-0.5 text-[20px]">
                            priority_high
                        </span>
                        <div>
                            <p className="material-symbols-outlined   text-label-md text-on-error-container">
                                Code Blue - Room 402
                            </p>
                            <p className="material-symbols-outlined   text-label-sm text-error/80 mt-1">
                                Response initiated 2m ago. Backup requested.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#FEF3C7] border border-[#FDE68A] p-3 rounded-lg flex gap-3 items-start">
                        <span className="material-symbols-outlined   text-[#B45309] mt-0.5 text-[20px]">
                            person_off
                        </span>
                        <div>
                            <p className="material-symbols-outlined   text-label-md text-[#92400E]">
                                Call Out - RN Sarah Jenkins
                            </p>
                            <p className="material-symbols-outlined   text-label-sm text-[#B45309]/80 mt-1">
                                Night shift. Coverage needed in Oncology.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-outline-variant/30" />
            <div className="flex-1">
                <h3 className="material-symbols-outlinedtext-headline-sm text-on-surface mb-4">
                    Activity Feed
                </h3>
                <div className="relative pl-4 space-y-6 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-[2px] before:bg-outline-variant/30">
                    <div className="relative">
                        <div className="absolute -left-6 bg-surface-container-lowest p-1 rounded-full border border-outline-variant/30 z-10">
                            <span className="material-symbols-outlined   text-[14px] text-primary">
                                <IoIosCheckmarkCircleOutline />
                            </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface">
                            Shift handoff completed for
                            <span className="font-semibold">ICU Team A</span>.
                        </p>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            10 mins ago
                        </span>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-6 bg-surface-container-lowest p-1 rounded-full border border-outline-variant/30 z-10">
                            <span className="material-symbols-outlined   text-[14px] text-[#14B8A6]">
                                <MdPersonAddAlt1 />
                            </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface">
                            Agency Nurse
                            <span className="font-semibold">M. Reyes</span>
                            clocked in.
                        </p>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            45 mins ago
                        </span>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-6 bg-surface-container-lowest p-1 rounded-full border border-outline-variant/30 z-10">
                            <span className="material-symbols-outlined   text-[14px] text-outline">
                                <LiaSyncAltSolid />

                            </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface">
                            Automated schedule re-balancing executed for
                            Med/Surg.
                        </p>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            2 hrs ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emrgrncy_Alerts;
