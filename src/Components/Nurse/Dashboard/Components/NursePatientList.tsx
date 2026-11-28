import type { AssignedPatient } from "../Data/nurseDashboard.data";

interface NursePatientListProps {
    patients: AssignedPatient[];
    searchTerm: string;
    totalPatients: number;
}

const NursePatientList = ({
    patients,
    searchTerm,
    totalPatients,
}: NursePatientListProps) => {
    const statusClasses = {
        Stable: "bg-[#eaf8ef] text-[#15803d]",
        Review: "bg-[#fff6df] text-[#b45309]",
        Attention: "bg-[#fff0ed] text-[#bd685f]",
    };

    return (
        <section
            className="rounded-2xl border border-[#dce9e6] bg-white p-5 shadow-[0_8px_20px_rgba(15,118,110,0.04)]"
            id="patients"
        >
            <div className="mb-4 flex min-h-9 items-center justify-between gap-3">
                <div>
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-primary-container">
                        Current assignments
                    </span>
                    <h2 className="text-lg font-bold tracking-tight text-[#163432]">
                        My patients
                    </h2>
                </div>
                <span className="rounded-full bg-[#e5f5f1] px-3 py-1.5 text-xs font-bold text-primary-container">
                    {totalPatients} assigned
                </span>
            </div>

            {patients.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-[600px] w-full border-collapse text-left">
                        <thead>
                            <tr>
                                <th
                                    className="border-b border-[#dce9e6] px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#7b918e]"
                                    scope="col"
                                >
                                    Patient
                                </th>
                                <th
                                    className="border-b border-[#dce9e6] px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#7b918e]"
                                    scope="col"
                                >
                                    Room
                                </th>
                                <th
                                    className="border-b border-[#dce9e6] px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#7b918e]"
                                    scope="col"
                                >
                                    Status
                                </th>
                                <th
                                    className="border-b border-[#dce9e6] px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#7b918e]"
                                    scope="col"
                                >
                                    Next check
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td className="border-b border-[#edf3f1] px-3 py-3 text-sm text-[#607774]">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9efea] text-xs font-bold text-primary-container"
                                                aria-hidden="true"
                                            >
                                                {patient.name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .join("")}
                                            </span>
                                            <strong className="font-semibold text-[#163432]">
                                                {patient.name}
                                            </strong>
                                        </div>
                                    </td>
                                    <td className="border-b border-[#edf3f1] px-3 py-3 text-sm text-[#607774]">
                                        {patient.room}
                                    </td>
                                    <td className="border-b border-[#edf3f1] px-3 py-3">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses[patient.status]}`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="border-b border-[#edf3f1] px-3 py-3 text-sm text-[#607774]">
                                        {patient.nextCheck}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div
                    className="px-3 py-8 text-center text-sm text-[#7b918e]"
                    role="status"
                >
                    No patients match “{searchTerm}”.
                </div>
            )}
        </section>
    );
};

export default NursePatientList;
