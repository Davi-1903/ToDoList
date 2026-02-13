import { useEffect, useState } from 'react';
import Header from './components/Header';
import New from './components/New';
import ListTasks from './components/ListTasks';
import type { addNewTaskParams, Task } from './interfaces/Objects';

export default function App() {
    const [onAddTask, setAddTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storage = localStorage.getItem('tasks');
        return storage ? JSON.parse(storage) : [];
    });

    function addNewTask({ title, description }: addNewTaskParams): void {
        setTasks(prev => [
            ...prev,
            {
                id: prev.length + 1,
                title: title,
                description: description,
                isComplet: false,
            },
        ]);
    }

    function completTask(id: number): void {
        setTasks(prev =>
            prev.map(task => {
                if (task.id === id) {
                    return { ...task, isComplet: true };
                }
                return task;
            }),
        );
    }

    function deleteTask(id: number): void {
        setTasks(prev => prev.filter(task => task.id !== id));
    }

    useEffect(() => {
        document.body.style.overflowY = onAddTask ? 'hidden' : 'auto';
    }, [onAddTask]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent): void {
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                setAddTask(true);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className='wrapper'>
            {onAddTask && <New setAddTask={setAddTask} addNewTask={addNewTask} />}
            <Header setAddTask={setAddTask} />
            <main className='mx-auto max-w-6xl p-6'>
                <ListTasks tasks={tasks} completTask={completTask} deleteTask={deleteTask} />
            </main>
        </div>
    );
}
