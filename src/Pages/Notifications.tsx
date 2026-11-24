import { useMemo, useState } from "react";
import { MdNotifications, MdWarning } from "react-icons/md";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import {
    ResourceLoading,
    ResourceState,
} from "../Components/Admin/Shared/ResourceState";
import NotificationSummaryCards from "../Components/Admin/Notifications/NotificationSummaryCards";
import NotificationToolbar from "../Components/Admin/Notifications/NotificationToolbar";
import NotificationCard from "../Components/Admin/Notifications/NotificationCard";
import type {
    NotificationSeverityFilter,
    NotificationTypeFilter,
} from "../Components/Admin/Notifications/notifications.utils";
import { useNotifications } from "../Features/notifications/useNotifications";

const Notifications = () => {
    const { notifications, isLoading, error } = useNotifications();
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState<NotificationSeverityFilter>("all");
    const [type, setType] = useState<NotificationTypeFilter>("all");

    const filteredNotifications = useMemo(() => {
        const query = search.trim().toLowerCase();

        return [...notifications]
            .filter((item) => {
                const matchesSearch = [
                    item.Details,
                    item.RequestType,
                    item.Situation,
                    item.Room_Number ? `Room ${item.Room_Number}` : "",
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(query);

                const matchesSeverity =
                    severity === "all" || item.Situation === severity;
                const matchesType = type === "all" || item.RequestType === type;

                return matchesSearch && matchesSeverity && matchesType;
            })
            .sort(
                (first, second) =>
                    new Date(second.publishedAt || second.createdAt).getTime() -
                    new Date(first.publishedAt || first.createdAt).getTime(),
            );
    }, [notifications, search, severity, type]);

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <AdminPageHeader
                        eyebrow="Operations center"
                        title="Notifications"
                        description="Review clinical requests and operational alerts in one place."
                    />

                    <NotificationSummaryCards notifications={notifications} />

                    <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_12px_30px_rgba(15,118,110,0.06)]">
                        <div className="flex flex-col gap-4 border-b border-[#e7efed] p-5 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#163432]">
                                    Request alerts
                                </h2>
                                <p className="mt-1 text-sm text-[#7b918e]">
                                    {filteredNotifications.length} of{" "}
                                    {notifications.length} notifications shown
                                </p>
                            </div>

                            <NotificationToolbar
                                search={search}
                                onSearchChange={setSearch}
                                severity={severity}
                                onSeverityChange={setSeverity}
                                type={type}
                                onTypeChange={setType}
                            />
                        </div>

                        {isLoading ? (
                            <ResourceLoading rows={5} />
                        ) : error ? (
                            <ResourceState
                                icon={<MdWarning />}
                                title="Could not load notifications"
                                description={error}
                            />
                        ) : filteredNotifications.length === 0 ? (
                            <ResourceState
                                icon={<MdNotifications />}
                                title="No notifications found"
                                description="Try changing your search or filters."
                            />
                        ) : (
                            <div>
                                {filteredNotifications.map((notification) => (
                                    <NotificationCard
                                        key={
                                            notification.documentId ||
                                            notification.id
                                        }
                                        notification={notification}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default Notifications;
