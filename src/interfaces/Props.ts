import type { Dispatch, SetStateAction } from 'react';
import type { Task } from './Objects';

export interface SidebarProps {
    tasks: Task[];
    setAddTask: Dispatch<SetStateAction<boolean>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export interface NewProps {
    setAddTask: Dispatch<SetStateAction<boolean>>;
    addNewTask: (title: string, description: string) => void;
}

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    isComplet: boolean;
    completTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export interface ListTasksProps {
    tasks: Task[];
    completTask: (id: string) => void;
    deleteTask: (id: string) => void;
}
