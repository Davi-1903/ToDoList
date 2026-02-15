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
    isComplete: boolean;
    completeTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export interface ListTasksProps {
    tasks: Task[];
    completeTask: (id: string) => void;
    deleteTask: (id: string) => void;
}
