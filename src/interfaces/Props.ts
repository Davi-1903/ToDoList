import type { Dispatch, SetStateAction } from 'react';
import type { Task } from './Objects';

export interface HeaderProps {
    setAddTask: Dispatch<SetStateAction<boolean>>;
}

export interface NewProps {
    setAddTask: Dispatch<SetStateAction<boolean>>;
    addNewTask: (title: string, description: string) => void;
}

export interface TaskProps {
    id: number;
    title: string;
    description: string;
    isComplet: boolean;
    completTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

export interface ListTasksProps {
    tasks: Task[];
    completTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

export interface ActionsProps {
    pasteTasks: () => Promise<void>;
    copyTasks: () => Promise<void>;
}
