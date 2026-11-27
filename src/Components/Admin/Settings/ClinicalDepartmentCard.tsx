import { type FormEvent } from "react";
import { MdCheckCircle, MdSave, MdWarning } from "react-icons/md";
import type {
    ClinicalDepartmentConfig,
    ClinicalDepartmentFields,
    ClinicalDepartmentState,
} from "../../../Features/settings/settings.types";
import { ResourceLoading } from "../Shared/ResourceState";

interface ClinicalDepartmentCardProps {
    config: ClinicalDepartmentConfig;
    state: ClinicalDepartmentState;
    onFieldChange: (
        key: keyof ClinicalDepartmentFields,
        value: number | string,
    ) => void;
    onSave: () => Promise<boolean>;
}

const ClinicalDepartmentCard = ({
    config,
    state,
    onFieldChange,
    onSave,
}: ClinicalDepartmentCardProps) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSave();
    };

    if (state.isLoading) {
        return (
            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5">
                <ResourceLoading rows={2} />
            </section>
        );
    }

    if (state.error && !state.record) {
        return (
            <section className="rounded-2xl border border-[#f2c9c4] bg-white p-5">
                <h2 className="font-bold text-[#163432]">{config.name}</h2>
                <p className="mt-2 text-sm text-[#a12b20]">{state.error}</p>
            </section>
        );
    }

    if (!state.record) {
        return (
            <section className="rounded-2xl border border-[#dce9e6] bg-white p-5">
                <h2 className="font-bold text-[#163432]">{config.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#607774]">
                    No record exists yet. Enter the clinical capacity values to
                    create one through the configured endpoint.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <DepartmentFields
                        departmentKey={config.key}
                        fields={{ ActiveBeds: 0, TotalBeds: 0, WaitingCount: 0 }}
                        onFieldChange={onFieldChange}
                    />
                    <button
                        type="submit"
                        disabled={state.isSaving}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#115e59] disabled:cursor-wait disabled:opacity-60"
                    >
                        <MdSave aria-hidden="true" />
                        {state.isSaving ? "Creating..." : "Create record"}
                    </button>
                    {state.error && (
                        <p role="alert" className="text-sm text-[#a12b20]">
                            {state.error}
                        </p>
                    )}
                </form>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-[#dce9e6] bg-white shadow-[0_8px_24px_rgba(15,118,110,0.04)]">
            <div className="border-b border-[#e7efed] px-5 py-4">
                <h2 className="font-bold text-[#163432]">{config.name}</h2>
                <p className="mt-1 text-sm text-[#7b918e]">
                    {config.description}
                </p>
            </div>
            <form onSubmit={handleSubmit} className="p-5">
                <DepartmentFields
                    departmentKey={config.key}
                    fields={{
                        ActiveBeds: state.record.ActiveBeds ?? 0,
                        TotalBeds: state.record.TotalBeds ?? 0,
                        WaitingCount: state.record.WaitingCount ?? 0,
                        Situation: state.record.Situation || "Normal",
                    }}
                    onFieldChange={onFieldChange}
                />
                {state.error && (
                    <p
                        role="alert"
                        className="mt-4 flex items-start gap-2 text-sm text-[#a12b20]"
                    >
                        <MdWarning className="mt-0.5 shrink-0" />
                        {state.error}
                    </p>
                )}
                {state.saved && (
                    <p
                        role="status"
                        className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#15803d]"
                    >
                        <MdCheckCircle aria-hidden="true" />
                        Changes saved.
                    </p>
                )}
                <div className="mt-5 flex justify-end border-t border-[#edf3f1] pt-4">
                    <button
                        type="submit"
                        disabled={state.isSaving}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#115e59] focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-60"
                    >
                        <MdSave aria-hidden="true" />
                        {state.isSaving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </form>
        </section>
    );
};

const DepartmentFields = ({
    departmentKey,
    fields,
    onFieldChange,
}: {
    departmentKey: ClinicalDepartmentConfig["key"];
    fields: ClinicalDepartmentFields;
    onFieldChange: ClinicalDepartmentCardProps["onFieldChange"];
}) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
            id={`${departmentKey}-active-beds`}
            label="Active beds"
            value={fields.ActiveBeds ?? 0}
            onChange={(value) => onFieldChange("ActiveBeds", value)}
        />
        <NumberField
            id={`${departmentKey}-total-beds`}
            label="Total beds"
            value={fields.TotalBeds ?? 0}
            onChange={(value) => onFieldChange("TotalBeds", value)}
        />
        <NumberField
            id={`${departmentKey}-waiting-count`}
            label="Patients waiting"
            value={fields.WaitingCount ?? 0}
            onChange={(value) => onFieldChange("WaitingCount", value)}
        />
        <label
            htmlFor={`${departmentKey}-situation`}
            className="text-sm font-semibold text-[#365653]"
        >
            Status
            <select
                id={`${departmentKey}-situation`}
                value={fields.Situation || "Normal"}
                onChange={(event) =>
                    onFieldChange("Situation", event.target.value)
                }
                className="mt-2 block w-full rounded-xl border border-[#dce9e6] bg-white px-3 py-2.5 text-sm text-[#163432] outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            >
                {!["Normal", "High_Vol"].includes(fields.Situation || "") && (
                    <option value={fields.Situation || "Normal"}>
                        {fields.Situation}
                    </option>
                )}
                <option value="Normal">Normal</option>
                <option value="High_Vol">High volume</option>
            </select>
        </label>
    </div>
);

const NumberField = ({
    id,
    label,
    value,
    onChange,
}: {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
}) => (
    <label htmlFor={id} className="text-sm font-semibold text-[#365653]">
        {label}
        <input
            id={id}
            type="number"
            min="0"
            step="1"
            required
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            className="mt-2 block w-full rounded-xl border border-[#dce9e6] bg-white px-3 py-2.5 text-sm text-[#163432] outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
    </label>
);

export default ClinicalDepartmentCard;
