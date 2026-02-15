import type { Dispatch, SetStateAction } from 'react';
import type { Task } from '../interfaces/Objects';

export function loadTasks(): Task[] {
    const storage = localStorage.getItem('tasks');
    return storage ? JSON.parse(storage) : [];
}

export async function copyTasks(tasks: Task[]): Promise<void> {
    if (tasks.length === 0) return;

    try {
        await navigator.clipboard.writeText(JSON.stringify(tasks));
        alert('Tasks copied to clipboard');
    } catch (err) {
        console.error(err);
    }
}

export async function pasteTasks(setTasks: Dispatch<SetStateAction<Task[]>>): Promise<void> {
    try {
        const tasks = await navigator.clipboard.readText();
        if (tasks) setTasks(JSON.parse(tasks));
    } catch (err) {
        console.error(err);
    }
}
