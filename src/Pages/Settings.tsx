import {
    MdAnalytics,
    MdCalendarMonth,
    MdGroups,
    MdInfoOutline,
    MdNotifications,
} from "react-icons/md";
import { Link } from "react-router-dom";
import ClinicalDepartmentCard from "../Components/Admin/Settings/ClinicalDepartmentCard";
import ProfileAvatarField from "../Components/Admin/Profile/ProfileAvatarField";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import BtmToTop from "../Components/Ui/motion/BtmToTop";
import { CLINICAL_DEPARTMENTS } from "../Features/settings/settings.config";
import useClinicalSettings from "../Features/settings/useClinicalSettings";
import type {
    ClinicalDepartmentFields,
    ClinicalDepartmentKey,
} from "../Features/settings/settings.types";
import { useMyProfile } from "../Features/profile/useMyProfile";
import useAuth from "../Hook/authUser/useAuth";

const managementLinks = [
    {
        label: "Staff and accounts",
        description: "Manage clinical team profiles and access.",
        to: "/admin/staff",
        icon: <MdGroups />,
    },
    {
        label: "Scheduling",
        description: "Review and create staff shifts.",
        to: "/admin/scheduling",
        icon: <MdCalendarMonth />,
    },
    {
        label: "Requests",
        description: "Review incoming operational requests.",
        to: "/admin/notifications",
        icon: <MdNotifications />,
    },
    {
        label: "Analytics",
        description: "View operational metrics and trends.",
        to: "/admin/analytics",
        icon: <MdAnalytics />,
    },
];

const Settings = () => {
    const { departments, updateDepartment, saveDepartment } =
        useClinicalSettings();
    const {
        profile,
        isUploadingAvatar,
        avatarError,
        uploadAvatar,
    } = useMyProfile();
    const { auth } = useAuth();
    const adminProfile = profile ?? auth.user;

    const handleFieldChange = (
        key: ClinicalDepartmentKey,
        field: keyof ClinicalDepartmentFields,
        value: number | string,
    ) => updateDepartment(key, field, value);

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <AdminPageHeader
                        eyebrow="System administration"
                        title="Settings & data management"
                        description="Update clinical department data and jump to the existing tools for managing the rest of the hospital workspace."
                    />

                    <BtmToTop delay={0.12}>
                        <section className="mb-8 rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)] sm:p-6">
                            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:text-left">
                                {adminProfile ? (
                                    <ProfileAvatarField
                                        profile={adminProfile}
                                        isUploading={isUploadingAvatar}
                                        error={avatarError}
                                        onChange={uploadAvatar}
                                    />
                                ) : (
                                    <p className="text-sm text-[#607774]">
                                        Admin profile is unavailable.
                                    </p>
                                )}
                                <div>
                                    <h2 className="text-xl font-extrabold text-[#163432]">
                                        Administrator profile photo
                                    </h2>
                                    <p className="mt-1 max-w-xl text-sm leading-6 text-[#607774]">
                                        Upload a photo to replace the placeholder
                                        avatar shown in the header and your
                                        profile. It will be saved to your admin
                                        account.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-extrabold text-[#163432]">
                                    Clinical department data
                                </h2>
                                <p className="mt-1 text-sm text-[#607774]">
                                    These values are loaded from the department
                                    endpoints and saved back to the API.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                                {CLINICAL_DEPARTMENTS.map((config) => (
                                    <ClinicalDepartmentCard
                                        key={config.key}
                                        config={config}
                                        state={departments[config.key]}
                                        onFieldChange={(field, value) =>
                                            handleFieldChange(
                                                config.key,
                                                field,
                                                value,
                                            )
                                        }
                                        onSave={() =>
                                            saveDepartment(config.key)
                                        }
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <div className="mb-4">
                                <h2 className="text-xl font-extrabold text-[#163432]">
                                    Other management tools
                                </h2>
                                <p className="mt-1 text-sm text-[#607774]">
                                    Detailed editing remains in the existing
                                    dedicated pages.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {managementLinks.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.04)] transition hover:-translate-y-0.5 hover:border-[#bfe5de] hover:shadow-[0_12px_30px_rgba(15,118,110,0.08)]"
                                    >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f5f1] text-2xl text-primary-container">
                                            {item.icon}
                                        </span>
                                        <h3 className="mt-4 font-bold text-[#163432]">
                                            {item.label}
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-[#7b918e]">
                                            {item.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[#f2dfb6] bg-[#fffaf0] p-5">
                            <div className="flex gap-3">
                                <MdInfoOutline className="mt-0.5 shrink-0 text-xl text-[#b45309]" />
                                <div>
                                    <h2 className="font-bold text-[#713f12]">
                                        Website identity settings
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-[#825b2a]">
                                        Editing the site name, branding, contact
                                        details, or logo is not connected yet:
                                        the supplied API list has no endpoint
                                        that stores these settings. The upload
                                        endpoint alone cannot save or associate
                                        those values with the site.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </BtmToTop>
                </div>
            </main>
        </>
    );
};

export default Settings;
