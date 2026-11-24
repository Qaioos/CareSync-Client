import type { ReactNode } from "react";

interface AdminPageHeaderProps {
    eyebrow: string;
    title: string;
    description: string;
    action?: ReactNode;
}

const AdminPageHeader = ({
    eyebrow,
    title,
    description,
    action,
}: AdminPageHeaderProps) => (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-container">
                {eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#163432]">
                {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607774]">
                {description}
            </p>
        </div>
        {action}
    </div>
);

export default AdminPageHeader;
