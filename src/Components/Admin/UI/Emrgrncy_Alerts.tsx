//React Icons
import { GiCancel } from "react-icons/gi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { LiaSyncAltSolid } from "react-icons/lia";
import { IoWarning } from "react-icons/io5";
import { useFetchAlerts } from "../../../Features/requests/AdminRequests";
import { useAxiosPrivate } from "../../../Hook/RequestsWithToken/useAxiosPrivet";
import toast from "react-hot-toast";
import BtmToTop from "../../Ui/motion/BtmToTop";
import { useEffect, useRef } from "react";

const Emrgrncy_Alerts = () => {
    const axiosPrivate = useAxiosPrivate();

    const { request, isLodaing, err } = useFetchAlerts();

    const previousLength = useRef<number | null>(null);

    useEffect(() => {
        if (!isLodaing && request) {
            if (previousLength.current === null) {
                previousLength.current = request.length;
                return;
            }

            if (request.length > previousLength.current) {
                const newRequest = request[request.length - 1];

                const audio = new Audio(
                    "/public/Sounds/AlertAdmin/RequestForAdmin.mp3",
                );
                audio.play().catch((error) => {
                    console.log(
                        "Audio playback failed. Browser requires user interaction first:",
                        error,
                    );
                });
                toast(
                    (t) => (
                        <div className="flex flex-col gap-1 p-1">
                            <span className="font-bold text-error flex items-center gap-1">
                                ⚠️ New Alert: {newRequest?.Situation}
                            </span>
                            <p className="text-sm">
                                Room {newRequest?.Room_Number} -{" "}
                                {newRequest?.RequestType}
                            </p>
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="mt-2 text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded self-end font-medium"
                            >
                                Dismiss
                            </button>
                        </div>
                    ),
                    { duration: 4000 },
                );
            }
            previousLength.current = request.length;
        }
    }, [request, isLodaing]);

    if (isLodaing) {
        return <div className="loading"> Lodaing Data...</div>;
    }

    if (err) {
        return <div className="error-message">{err}</div>;
    }

    const handelCancel = async (id: string) => {
        try {
            const respone = await axiosPrivate.delete(`/requests/${id}`);
            console.log(respone);

            return toast.success("Successfully Deleted!");
        } catch (error) {
            console.error("Failed to cancel request:", error);
            return toast.error("Failed to cancel request. Please try again.");
        }
    };

    return (
        <div className="md:col-span-4  bg-white rounded-xl card-shadow p-6 flex flex-col gap-6 row-span-2">
            <div>
                <h3 className="material-symbols-outlined  text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-4xl  text-error">
                        <IoWarning />
                    </span>
                    Critical Alerts
                </h3>

                <div className="space-y-3 overflow-y-scroll h-40">
                    {request.length > 0 ? (
                        request.map((Request) => {
                            const getAlertStyle = (situation: string) => {
                                switch (situation) {
                                    case "Critical":
                                        return "bg-error-container/50 border-error-container text-on-error-container";
                                    case "Warning":
                                        return " bg-[#FEF3C7] border-[#FDE68A] text-[#B45309] ";
                                    case "Routine":
                                        return "bg-green-100 border-green-300 text-green-800";
                                    default:
                                        return "bg-green-100 border-green-300 text-green-800";
                                }
                            };
                            return (
                                <BtmToTop key={Request.documentId}>
                                    <div
                                        className={`${getAlertStyle(Request?.Situation)} border border-error-container p-3 rounded-lg flex gap-3 items-start`}
                                    >
                                        <span className="material-symbols-outlined flex items-center text-[15px] ">
                                            <GiCancel
                                                onClick={() =>
                                                    handelCancel(
                                                        Request.documentId,
                                                    )
                                                }
                                                className="mr-2 cursor-pointer "
                                            />{" "}
                                            {Request?.Situation}
                                        </span>
                                        <div>
                                            <p className="material-symbols-outlined   text-label-md ">
                                                {Request?.RequestType}-
                                                {Request?.Room_Number}
                                            </p>
                                            <p className="material-symbols-outlined   text-label-sm ">
                                                {Request?.Details}
                                            </p>
                                            <p className="material-symbols-outlined   text-label-sm ">
                                                {Request?.publishedAt.slice(
                                                    11,
                                                    16,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </BtmToTop>
                            );
                        })
                    ) : (
                        <p className="text-center text-on-surface-variant">
                            No Alerts at the moment.
                        </p>
                    )}
                    {/*                     <div className="bg-error-container/50 border border-error-container p-3 rounded-lg flex gap-3 items-start">
                        <span className="material-symbols-outlined   text-error mt-0.5 text-[20px]">
                            priority_high
                        </span>
                        <div>
                            <p className="material-symbols-outlined   text-label-md text-on-error-container">
                                
                                - Room 402
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
                    </div> */}
                </div>
            </div>
            <hr className="border-outline-variant/30" />
            <div className="flex-1">
                <h3 className="material-symbols-outlinedtext-headline-sm text-on-surface mb-4">
                    Activity Feed
                </h3>
                <div className="relative pl-4 space-y-6 before:content-[''] before:absolute before:left-1.75 before:top-2 before:bottom-0 before:w-0.5 before:bg-outline-variant/30">
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
