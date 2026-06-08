import useDepartment from "../../../Features/department/useDepartment";
import type { Requests } from "../../../Types/api.responses";
import Loading from "../../Ui/LodaingSign";

const Department_Grid = () => {
    const { request, isLoading, err } = useDepartment();


    /* 
just add the real data from the request to the UI 
and remove the hard coded data in the return statement
*/
    if (isLoading) {
        return (
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/*  <!-- ICU --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                    <Loading
                        fullPage={false}
                        message="waiting for lodaing ..."
                    />
                </div>
                {/*   <!-- ED --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                    <Loading
                        fullPage={false}
                        message="waiting for lodaing ..."
                    />
                </div>
                {/*    <!-- MedSurg --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                    <Loading
                        fullPage={false}
                        message="waiting for lodaing ..."
                    />
                </div>
            </div>
        );
    }
    if (err) {
        return (
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/*  <!-- ICU --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]"></div>
                {/*   <!-- ED --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                    <p className="text-center text-red-500">
                        Download failed. Please try again.
                    </p>
                    <p className="text-center text-red-500">
                        Or Refresh your browser.
                    </p>
                </div>
                {/*    <!-- MedSurg --> */}
                <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]"></div>
            </div>
        );
    }

    const { departmenticu   , departmentmAG_Sug, departmenticu_Emrg } =
        request as Requests;

    console.log(departmenticu_Emrg);

    const situationicu = departmenticu?.data?.[0]?.Situation;
    const situationmAG_Sug = departmentmAG_Sug?.data?.[0]?.Situation;
    const situationicu_Emrg = departmenticu_Emrg?.data?.[0]?.Situation;

    // (Render-time calculation)
    const badgeStyleicu =
        situationicu !== "High Vol"
            ? "bg-[#10B981]/20 text-[#047857]"
            : "bg-[#F59E0B]/20 text-[#B45309]";
    const badgeStylemAG_Sug =
        situationmAG_Sug !== "High Vol"
            ? "bg-[#10B981]/20 text-[#047857]"
            : "bg-[#F59E0B]/20 text-[#B45309]";
    const badgeStyleicu_Emrg =
        situationicu_Emrg !== "High Vol"
            ? "bg-[#10B981]/20 text-[#047857]"
            : "bg-[#F59E0B]/20 text-[#B45309]";

    return (
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*  <!-- ICU --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#14B8A6]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlined text-headline-sm text-on-surface">
                        ICU
                    </h4>
                    <span
                        className={`px-3 py-1 ${badgeStyleicu} material-symbols-outlined  text-label-sm rounded-full`}
                    >
                        {departmenticu.data?.[0]?.Situation}
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined text-headline-md text-primary block">
                            1:2
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="material-symbols-outlined text-body-md text-on-surface block">
                            {departmenticu.data?.[0]?.ActiveBeds || 0}/
                            {departmenticu.data?.[0]?.TotalBeds || 0}
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Beds Active
                        </span>
                    </div>
                </div>
            </div>
            {/*   <!-- ED --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l-[#F59E0B]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlinedtext-headline-sm text-on-surface">
                        Emergency
                    </h4>
                    <span
                        className={`px-3 py-1 ${badgeStyleicu_Emrg} material-symbols-outlined   text-label-sm rounded-full`}
                    >
                        {departmenticu_Emrg.data?.[0]?.Situation}
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined  text-headline-md text-primary block">
                            1:4
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="font-body-md text-body-md text-on-surface block">
                            {departmenticu_Emrg.data?.[0]?.WaitingCount || 0}
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Waiting
                        </span>
                    </div>
                </div>
            </div>
            {/*    <!-- MedSurg --> */}
            <div className="bg-white rounded-xl card-shadow p-5 border-l-4 border-l border-[#10B981]">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="material-symbols-outlined text-headline-sm text-on-surface">
                        Med/Surg
                    </h4>
                    <span
                        className={`px-3 py-1 ${badgeStylemAG_Sug} material-symbols-outlined   text-label-sm rounded-full`}
                    >
                        {departmentmAG_Sug.data?.[0]?.Situation}
                    </span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="material-symbols-outlined text-headline-md text-primary block">
                            1:5
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Ratio
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="material-symbols-outlined text-body-md text-on-surface block">
                            {departmentmAG_Sug.data?.[0]?.ActiveBeds || 0}/
                            {departmentmAG_Sug.data?.[0]?.TotalBeds || 0}
                        </span>
                        <span className="material-symbols-outlined   text-label-sm text-on-surface-variant">
                            Beds Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Department_Grid;
