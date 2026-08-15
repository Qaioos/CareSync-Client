const ProfileImgAuto = "https://lh3.googleusercontent.com/aida-public/AB6AXuDMcWQdDFxiY9DnDxDDz0bEkH2_iZ52xa47ZedOd2DkRpHRg-LaWKEWyVV-I8WkDAK_WkvT7LTE0t0GGhoIxBvJYKNlDy2R7G9LMYBeuRXXiZDAtaH2k2N54hZVQV9pM45NLfNvT5JN1erqYwCvrjE39gvstjaaPwaUbGehj1Nq2VMEGOpvHf91CvClY5jmVbv5MCokJ6ttoRyjH70PbQ8yD5_V3KcP5RoIUPdrKowtvoU3SgMNA_Am0vu_oyWWCJVLiUePQhbiAQev"

const Main = () => {

    const patients = [
        {
            id: 1,
            room: "302",
            name: "John Doe",
            status: "Stable",
            statusClass: "bg-secondary-container/30 text-on-secondary-fixed",
        },
        {
            id: 2,
            room: "304",
            name: "Alice Johnson",
            status: "Attention",
            statusClass: "bg-error-container/50 text-error",
        },
        {
            id: 3,
            room: "305",
            name: "Mary Smith",
            status: "Stable",
            statusClass: "bg-secondary-container/30 text-on-secondary-fixed",
        },
    ];

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            {/* <!-- Main Content --> */}
            <main className="md:ml-64 pt-20 px-4 md:px-8 pb-12 max-w-[1200px] mx-auto">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                            Good morning, Sarah.
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">
                            Here is your clinical overview for today.
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="font-headline-sm text-headline-sm text-primary">
                            Oct 24, 2023
                        </div>
                        <div className="font-label-md text-label-md text-on-surface-variant">
                            Shift: 07:00 - 19:00
                        </div>
                    </div>
                </header>

                {/* <!-- Bento Grid Layout --> */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* <!-- Column 1: Shifts & Timer (4 cols) --> */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        {/* <!-- Profile / Today's Shift Card --> */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary-container/20">
                                <img
                                    alt="Nurse Profile"
                                    className="w-full h-full object-cover"
                                    src={ProfileImgAuto}
                                />
                            </div>
                            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                                Sarah Jenkins, RN
                            </h2>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                                Med-Surg Unit • 3rd Floor
                            </p>
                            <div className="w-full bg-surface-container-low rounded-lg p-4 text-left">
                                <div className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">
                                    Current Shift
                                </div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="material-symbols-outlined text-[#14B8A6] text-xl">
                                        schedule
                                    </span>
                                    <span className="font-body-md text-body-md font-medium text-on-surface">
                                        07:00 - 19:00
                                    </span>
                                </div>
                                <div className="font-label-md text-label-md text-on-surface-variant ml-8">
                                    12hr Shift • 8h 30m remaining
                                </div>
                            </div>
                            <button className="mt-4 w-full bg-transparent border-[1.5px] border-[#0F766E] text-[#0F766E] font-label-lg text-label-lg py-2 rounded-lg hover:bg-[#0F766E]/5 transition-colors">
                                Shift Swap Request
                            </button>
                        </div>

                        {/* <!-- Break Timer Widget --> */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex items-center justify-between">
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                                    Next Break
                                </h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Scheduled for 11:30
                                </p>
                            </div>
                            {/* <!-- Circular Progress --> */}
                            <div className="relative w-16 h-16">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        className="text-surface-container-high stroke-current"
                                        cx="50"
                                        cy="50"
                                        fill="transparent"
                                        r="40"
                                        strokeWidth="8"
                                    ></circle>
                                    <circle
                                        className="text-[#14B8A6] stroke-current"
                                        cx="50"
                                        cy="50"
                                        fill="transparent"
                                        r="40"
                                        strokeDasharray="251.2"
                                        strokeDashoffset="180"
                                        strokeLinecap="round"
                                        strokeWidth="8"
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-label-md text-label-md font-bold text-[#0F766E]">
                                    1h 45m
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Column 2 & 3: Tasks & Patients (8 cols) --> */}
                    <div className="md:col-span-8 flex flex-col gap-6">
                        {/* <!-- Upcoming Tasks --> */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                                    Upcoming Tasks
                                </h2>
                                <button className="text-[#0F766E] hover:bg-[#0F766E]/10 p-2 rounded-full transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">
                                        {" "}
                                        add{" "}
                                    </span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* <!-- Task Item 1 --> */}
                                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container/50 border border-transparent hover:border-outline-variant/20 transition-all duration-200">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <div className="flex-1">
                                        <p className="font-body-md text-on-surface font-medium">
                                            Medication Administration - Room 304
                                        </p>
                                        <p className="font-body-sm text-on-surface-variant">
                                            Due at 09:00 AM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- My Patients Section --> */}
                        <div className="bg-surface-container-lowest rounded-xl p-6 ambient-shadow border border-outline-variant/30 flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-headline-md text-headline-md text-on-surface">
                                    My Patients
                                </h2>
                                <span className="bg-[#14B8A6]/10 text-[#0F766E] font-label-md text-label-md px-3 py-1 rounded-full">
                                    {patients.length} Assigned
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-outline-variant/30">
                                            <th className="font-label-sm text-label-sm text-outline uppercase tracking-wider pb-3 pl-2">
                                                Room
                                            </th>
                                            <th className="font-label-sm text-label-sm text-outline uppercase tracking-wider pb-3">
                                                Patient
                                            </th>
                                            <th className="font-label-sm text-label-sm text-outline uppercase tracking-wider pb-3">
                                                Status
                                            </th>
                                            <th className="font-label-sm text-label-sm text-outline uppercase tracking-wider pb-3 text-right pr-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((patient, index) => (
                                            <tr
                                                key={patient.id}
                                                className={`border-outline-variant/10 hover:bg-surface-container/30 transition-colors ${
                                                    index !==
                                                    patients.length - 1
                                                        ? "border-b"
                                                        : ""
                                                }`}
                                            >
                                                <td className="py-4 pl-2 font-body-sm text-body-sm font-medium">
                                                    {patient.room}
                                                </td>
                                                <td className="py-4 font-body-sm text-body-sm">
                                                    {patient.name}
                                                </td>
                                                <td className="py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${patient.statusClass}`}
                                                    >
                                                        {patient.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-2 text-right">
                                                    <button className="text-primary hover:text-primary-container">
                                                        <span className="material-symbols-outlined text-lg">
                                                            chevron_right
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;
