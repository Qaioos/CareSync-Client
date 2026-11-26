export interface ShiftStaff {
    id?: number;
    documentId?: string;
    FullName?: string;
    username?: string;
}

export interface Shift {
    id?: number;
    documentId?: string;
    Department?: string;
    ShiftType?: string;
    StartTime: string;
    EndTime: string;
    AssignedStaff?: ShiftStaff | ShiftStaff[];
}
