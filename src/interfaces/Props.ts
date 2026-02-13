import type { Dispatch, SetStateAction } from 'react';
import type { Task } from './Objects';

export interface HeaderProps {
    setAddTask: Dispatch<SetStateAction<boolean>>;
}

export interface NewProps {
    setAddTask: Dispatch<SetStateAction<boolean>>;
}

export interface TaskProps {
    id: number;
    title: string;
    description: string;
    isComplet: boolean;
}

export interface ListTasksProps {
    tasks: Task[];
}
