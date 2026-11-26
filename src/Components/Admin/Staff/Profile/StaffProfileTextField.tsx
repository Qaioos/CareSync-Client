interface StaffProfileTextFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "email" | "password" | "text";
    autoComplete?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
}

const inputClassName =
    "w-full rounded-xl border border-[#dce9e6] bg-[#f8fcfb] px-3.5 py-2.5 text-sm text-[#163432] outline-none transition placeholder:text-[#91a5a2] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";
const labelClassName = "mb-1.5 block text-xs font-bold text-[#365653]";

const StaffProfileTextField = ({
    id,
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    minLength,
    maxLength,
    required = false,
}: StaffProfileTextFieldProps) => (
    <div>
        <label className={labelClassName} htmlFor={id}>
            {label}
        </label>
        <input
            id={id}
            type={type}
            autoComplete={autoComplete}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClassName}
        />
    </div>
);

export default StaffProfileTextField;
