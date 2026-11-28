export type GlobalSearchType =
    | "staff"
    | "department"
    | "shift"
    | "request"
    | "task";

export interface GlobalSearchResult {
    id: string;
    type: GlobalSearchType;
    title: string;
    subtitle: string;
    to: string;
}
