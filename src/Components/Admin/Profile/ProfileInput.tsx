interface ProfileInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "email";
    required?: boolean;
}

const ProfileInput = ({
    id,
    label,
    value,
    onChange,
    type = "text",
    required = false,
}: ProfileInputProps) => (
    <div>
        <label
            htmlFor={id}
            className="mb-1.5 block text-xs font-bold text-[#365653]"
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            required={required}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-3.5 py-2.5 text-sm text-[#163432] outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
    </div>
);

export default ProfileInput;
