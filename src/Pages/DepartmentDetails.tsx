import { useRef } from "react";
import {
    MdArrowBack,
    MdLocalPrintshop,
    MdWarning,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import {
    ResourceLoading,
    ResourceState,
} from "../Components/Admin/Shared/ResourceState";
import DepartmentDataPanel from "../Components/Admin/Departments/DepartmentDataPanel";
import DepartmentMetricCards from "../Components/Admin/Departments/DepartmentMetricCards";
import DepartmentStaffList from "../Components/Admin/Departments/DepartmentStaffList";
import { getDepartmentConfig } from "../Features/department/department.config";
import {
    getDepartmentStatusClassName,
} from "../Features/department/department.utils";
import useDepartmentDetails from "../Features/department/useDepartmentDetails";
import BtmToTop from "../Components/Ui/motion/BtmToTop";
import type { DepartmentConfig } from "../Features/department/department.types";

const DepartmentDetailsContent = ({
    config,
}: {
    config: DepartmentConfig;
}) => {
    const printRef = useRef<HTMLDivElement>(null);
    const {
        department,
        staff,
        isLoadingDepartment,
        isLoadingUsers,
        departmentError,
        usersError,
    } = useDepartmentDetails(config.key);
    const printPage = useReactToPrint({
        contentRef: printRef,
        documentTitle: `CareSync_${config.key}_Department_${new Date().toISOString().slice(0, 10)}`,
    });

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8 print:min-h-0 print:bg-white print:p-0">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-primary-container outline-none hover:text-[#115e59] focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <MdArrowBack aria-hidden="true" />
                            Back to dashboard
                        </Link>
                        <button
                            type="button"
                            onClick={printPage}
                            disabled={
                                !department ||
                                isLoadingDepartment ||
                                isLoadingUsers
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,118,110,0.18)] transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <MdLocalPrintshop
                                aria-hidden="true"
                                className="text-lg"
                            />
                            Print department
                        </button>
                    </div>

                    <div ref={printRef} className="space-y-5 print:space-y-3">
                        {isLoadingDepartment ? (
                            <ResourceLoading rows={4} />
                        ) : departmentError ? (
                            <ResourceState
                                icon={<MdWarning />}
                                title="Could not load department details"
                                description={departmentError}
                            />
                        ) : !department ? (
                            <ResourceState
                                icon={<MdWarning />}
                                title="Department information unavailable"
                                description="No department record was returned by the service."
                            />
                        ) : (
                            <BtmToTop delay={0.1}>
                                <header className="rounded-2xl border border-[#dce9e6] bg-white p-6 shadow-[0_12px_30px_rgba(15,118,110,0.06)] print:rounded-none print:border-0 print:p-0 print:shadow-none">
                                    <AdminPageHeader
                                        eyebrow="Department operations"
                                        title={config.name}
                                        description={`Department status, capacity, and assigned staff details for ${config.name}.`}
                                    />
                                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#edf3f1] pt-4">
                                        <span className="text-sm font-semibold text-[#607774]">
                                            Current status
                                        </span>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${getDepartmentStatusClassName(department.Situation)}`}
                                        >
                                            {department.Situation ||
                                                "Status unavailable"}
                                        </span>
                                        <span className="text-xs text-[#7b918e]">
                                            {staff.length} assigned staff
                                        </span>
                                    </div>
                                </header>

                                <DepartmentMetricCards
                                    department={department}
                                    config={config}
                                    staffCount={staff.length}
                                />

                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                                    <div className="xl:col-span-3">
                                        <DepartmentDataPanel
                                            department={department}
                                        />
                                    </div>
                                    <div className="xl:col-span-2">
                                        <DepartmentStaffList
                                            staff={staff}
                                            isLoading={isLoadingUsers}
                                            error={usersError}
                                        />
                                    </div>
                                </div>
                                <p className="text-right text-xs text-[#91a5a2] print:mt-4">
                                    Generated by CareSync ·{" "}
                                    {new Intl.DateTimeFormat("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    }).format(new Date())}
                                </p>
                            </BtmToTop>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

const DepartmentDetails = () => {
    const { departmentKey = "" } = useParams();
    const config = getDepartmentConfig(departmentKey);

    if (!config) {
        return (
            <>
                <Layout />
                <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                    <div className="mx-auto max-w-5xl rounded-2xl border border-[#dce9e6] bg-white">
                        <ResourceState
                            icon={<MdWarning />}
                            title="Department not found"
                            description="The requested department does not exist."
                        />
                    </div>
                </main>
            </>
        );
    }

    return <DepartmentDetailsContent config={config} />;
};

export default DepartmentDetails;
