import type { ReactNode } from "react";

interface ResourceStateProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export const ResourceState = ({
    icon,
    title,
    description,
}: ResourceStateProps) => (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <div className="text-4xl text-[#d97706]">{icon}</div>
        <p className="font-semibold text-[#163432]">{title}</p>
        <p className="text-sm text-[#7b918e]">{description}</p>
    </div>
);

interface ResourceLoadingProps {
    rows?: number;
}

export const ResourceLoading = ({ rows = 4 }: ResourceLoadingProps) => (
    <div className="divide-y divide-[#edf3f1]">
        {Array.from({ length: rows }, (_, index) => (
            <div
                className="flex animate-pulse items-center gap-4 px-5 py-5"
                key={index}
            >
                <div className="h-11 w-11 rounded-full bg-[#e7efed]" />
                <div className="space-y-2">
                    <div className="h-3 w-36 rounded bg-[#e7efed]" />
                    <div className="h-2.5 w-52 rounded bg-[#edf3f1]" />
                </div>
            </div>
        ))}
    </div>
);
