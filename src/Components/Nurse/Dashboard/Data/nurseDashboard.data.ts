export type TaskPriority = "urgent" | "routine";

export interface NurseTask {
    id: number;
    title: string;
    detail: string;
    time: string;
    priority: TaskPriority;
    completed: boolean;
}

export type PatientStatus = "Stable" | "Review" | "Attention";

export interface AssignedPatient {
    id: number;
    name: string;
    room: string;
    status: PatientStatus;
    nextCheck: string;
}

export const initialTasks: NurseTask[] = [
    {
        id: 1,
        title: "Complete scheduled observations",
        detail: "John Doe · Room 302",
        time: "09:30 AM",
        priority: "urgent",
        completed: false,
    },
    {
        id: 2,
        title: "Review patient notes",
        detail: "Alice Johnson · Room 304",
        time: "10:00 AM",
        priority: "routine",
        completed: false,
    },
    {
        id: 3,
        title: "Prepare for care team handover",
        detail: "Ward handover",
        time: "11:00 AM",
        priority: "routine",
        completed: false,
    },
];

export const assignedPatients: AssignedPatient[] = [
    {
        id: 1,
        name: "John Doe",
        room: "302",
        status: "Stable",
        nextCheck: "09:30 AM",
    },
    {
        id: 2,
        name: "Alice Johnson",
        room: "304",
        status: "Attention",
        nextCheck: "09:45 AM",
    },
    {
        id: 3,
        name: "Mary Smith",
        room: "305",
        status: "Stable",
        nextCheck: "10:15 AM",
    },
    {
        id: 4,
        name: "Robert Wilson",
        room: "307",
        status: "Review",
        nextCheck: "10:30 AM",
    },
];
