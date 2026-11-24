import { useMemo, useState } from "react";
import { MdWarning } from "react-icons/md";
import Layout from "../Components/Admin/Pages/Layout";
import AdminPageHeader from "../Components/Admin/Shared/AdminPageHeader";
import {
    ResourceLoading,
    ResourceState,
} from "../Components/Admin/Shared/ResourceState";
import AnalyticsSummaryCards from "../Components/Admin/Analytics/AnalyticsSummaryCards";
import DepartmentCapacityPanel from "../Components/Admin/Analytics/DepartmentCapacityPanel";
import WaitingQueuePanel from "../Components/Admin/Analytics/WaitingQueuePanel";
import OperationalRequestsPanel from "../Components/Admin/Analytics/OperationalRequestsPanel";
import ShiftDistributionChart from "../Components/Admin/Analytics/ShiftDistributionChart";
import {
    filterRequestsByPeriod,
    getAnalyticsMetrics,
    type PeriodFilter,
} from "../Components/Admin/Analytics/analytics.utils";
import { useAnalytics } from "../Features/analytics/useAnalytics";

const Analytics = () => {
    const { users, shifts, requests, departments, isLoading, error } =
        useAnalytics();
    const [period, setPeriod] = useState<PeriodFilter>("30");

    const filteredRequests = useMemo(
        () => filterRequestsByPeriod(requests, period),
        [period, requests],
    );

    const metrics = useMemo(
        () => getAnalyticsMetrics(users, shifts, filteredRequests, departments),
        [users, shifts, filteredRequests, departments],
    );

    return (
        <>
            <Layout />
            <main className="min-h-screen bg-[#f4f8f7] px-4 pb-20 pt-24 md:ml-72 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <AdminPageHeader
                        eyebrow="Operational intelligence"
                        title="Analytics"
                        description="Monitor staffing, capacity, and operational demand across the hospital."
                        action={
                            <label className="relative block sm:w-44">
                                <span className="sr-only">
                                    Analytics period
                                </span>
                                <select
                                    value={period}
                                    onChange={(event) =>
                                        setPeriod(
                                            event.target.value as PeriodFilter,
                                        )
                                    }
                                    className="w-full appearance-none rounded-xl border border-[#dce9e6] bg-white px-4 py-3 text-sm font-semibold text-[#365653] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                >
                                    <option value="7">Last 7 days</option>
                                    <option value="30">Last 30 days</option>
                                    <option value="all">All time</option>
                                </select>
                            </label>
                        }
                    />

                    {isLoading ? (
                        <ResourceLoading rows={6} />
                    ) : error ? (
                        <section className="rounded-2xl border border-[#dce9e6] bg-white">
                            <ResourceState
                                icon={<MdWarning />}
                                title="Could not load analytics"
                                description={error}
                            />
                        </section>
                    ) : (
                        <>
                            <AnalyticsSummaryCards
                                availableStaff={metrics.availableStaff}
                                activeBeds={metrics.activeBeds}
                                activeRequests={filteredRequests.length}
                                criticalAlerts={metrics.criticalAlerts}
                            />

                            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                                <DepartmentCapacityPanel
                                    departments={departments}
                                />

                                <section className="rounded-2xl border border-[#dce9e6] bg-white p-5 xl:col-span-4">
                                    <h3 className="text-lg font-bold text-[#163432]">
                                        Shift distribution
                                    </h3>
                                    <p className="mt-1 text-sm text-[#7b918e]">
                                        Coverage by shift type
                                    </p>
                                    <ShiftDistributionChart
                                        data={metrics.shiftDistribution}
                                    />
                                </section>

                                <WaitingQueuePanel departments={departments} />

                                <OperationalRequestsPanel
                                    requestTypes={metrics.requestTypes}
                                    waitingPatients={metrics.waitingPatients}
                                    scheduledShifts={shifts.length}
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default Analytics;
