import { MdArrowBack, MdWarning } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import {
    ResourceLoading,
    ResourceState,
} from "../Components/Admin/Shared/ResourceState";
import StaffProfileEditor from "../Components/Admin/Staff/Profile/StaffProfileEditor";
import StaffProfileSummary from "../Components/Admin/Staff/Profile/StaffProfileSummary";
import StaffSchedulePanel from "../Components/Admin/Staff/Profile/StaffSchedulePanel";
import { useStaffProfile } from "../Features/staffProfile/useStaffProfile";
import { getStaffAssignedShifts } from "../Features/staffProfile/staffProfile.utils";
import BtmToTop from "../Components/Ui/motion/BtmToTop";
import { getDisplayName } from "../Components/Admin/Staff/staff.utils";

const StaffProfile = () => {
    const { userId } = useParams();
    const {
        member,
        formData,
        shifts,
        isLoading,
        isSaving,
        error,
        shiftError,
        hasValidUserId,
        saveProfile,
        updateFormField,
    } = useStaffProfile(userId);

    const assignedShifts = member
        ? getStaffAssignedShifts(shifts, member)
        : [];

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <Link
                        to="/admin/staff"
                        className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-primary-container outline-none hover:text-[#115e59] focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <MdArrowBack aria-hidden="true" />
                        Back to staff directory
                    </Link>

                    <AdminPageHeader
                        eyebrow="People & access"
                        title={
                            member ? getDisplayName(member) : "Staff profile"
                        }
                        description="View and manage this staff member's account, clinical details, and schedule."
                    />

                    {!hasValidUserId ? (
                        <ResourceState
                            icon={<MdWarning />}
                            title="Invalid staff member"
                            description="The staff member ID is invalid."
                        />
                    ) : isLoading ? (
                        <ResourceLoading rows={3} />
                    ) : error && !member ? (
                        <ResourceState
                            icon={<MdWarning />}
                            title="Could not load this staff profile"
                            description={error}
                        />
                    ) : member && formData ? (
                        <BtmToTop delay={0.15}>
                            <StaffProfileSummary member={member} />
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                                <StaffProfileEditor
                                    formData={formData}
                                    error={error}
                                    isSaving={isSaving}
                                    onFieldChange={updateFormField}
                                    onSave={saveProfile}
                                />
                                <StaffSchedulePanel
                                    shifts={assignedShifts}
                                    error={shiftError}
                                />
                            </div>
                        </BtmToTop>
                    ) : (
                        <ResourceState
                            icon={<MdWarning />}
                            title="Staff profile unavailable"
                            description="This account could not be found."
                        />
                    )}
                </div>
            </main>
        </>
    );
};

export default StaffProfile;
