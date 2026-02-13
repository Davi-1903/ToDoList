export interface Task {
    id: number;
    title: string;
    description: string;
    isComplet: boolean;
}

export interface addNewTaskParams {
    title: string;
    description: string;
}
