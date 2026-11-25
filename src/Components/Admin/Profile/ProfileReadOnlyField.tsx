interface ProfileReadOnlyFieldProps {
    label: string;
    value: string | null | undefined;
}

const ProfileReadOnlyField = ({ label, value }: ProfileReadOnlyFieldProps) => (
    <div className="rounded-xl border border-[#e7efed] bg-[#f8fcfb] px-3.5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#91a5a2]">
            {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-[#365653]">
            {value?.trim() || "Not set"}
        </p>
    </div>
);

export default ProfileReadOnlyField;
