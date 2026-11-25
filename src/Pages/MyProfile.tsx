import type { FormEvent } from "react";
import { MdWarning } from "react-icons/md";
import toast from "react-hot-toast";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import { ResourceLoading } from "../Components/Admin/Shared/ResourceState";
import BtmToTop from "../Components/Ui/motion/BtmToTop";
import ProfileDetailsForm from "../Components/Admin/Profile/ProfileDetailsForm";
import ProfileIdentityCard from "../Components/Admin/Profile/ProfileIdentityCard";
import { useMyProfile } from "../Features/profile/useMyProfile";
import useAuth from "../Hook/authUser/useAuth";

const MyProfile = () => {
    const {
        profile,
        editData,
        isLoading,
        isSaving,
        error,
        loadError,
        updateFullName,
        saveProfile,
    } = useMyProfile();
    const { auth } = useAuth();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const saved = await saveProfile();
        if (saved) toast.success("Name updated successfully.");
        return saved;
    };

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <AdminPageHeader
                        eyebrow="Account settings"
                        title="My profile"
                        description="Manage your account details and clinical profile information."
                    />

                    {isLoading && !editData ? (
                        <ResourceLoading rows={2} />
                    ) : !profile || !editData ? (
                        <section className="rounded-2xl border border-[#dce9e6] bg-white">
                            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                                <MdWarning className="text-4xl text-[#d97706]" />
                                <p className="font-semibold text-[#163432]">
                                    Profile unavailable
                                </p>
                                <p className="text-sm text-[#7b918e]">
                                    Sign in again to load your account details.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <BtmToTop delay={0.15}>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                                <ProfileIdentityCard
                                    profile={profile}
                                    fallbackRole={auth.rols}
                                />
                                <ProfileDetailsForm
                                    profile={profile}
                                    fullName={editData.FullName}
                                    isSaving={isSaving}
                                    error={error}
                                    loadError={loadError}
                                    onFullNameChange={updateFullName}
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </BtmToTop>
                    )}
                </div>
            </main>
        </>
    );
};

export default MyProfile;
