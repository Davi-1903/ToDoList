import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import New from './components/New';
import ListTasks from './components/ListTasks';
import type { Task } from './interfaces/Objects';
import { loadTasks } from './utils/tasks';
import { v4 } from 'uuid';

export default function App() {
    const [onAddTask, setAddTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(loadTasks);

    function addNewTask(title: string, description: string): void {
        setTasks(prev => [
            ...prev,
            {
                id: v4(),
                title: title,
                description: description,
                isComplete: false,
            },
        ]);
    }

    function completeTask(id: string): void {
        setTasks(prev =>
            prev.map(task => {
                if (task.id === id) {
                    return { ...task, isComplete: true };
                }
                return task;
            }),
        );
    }

    function deleteTask(id: string): void {
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
            <Sidebar tasks={tasks} setAddTask={setAddTask} setTasks={setTasks} />
            <main className='col-span-2 sm:col-span-1'>
                <section className='mx-auto max-w-5xl p-4'>
                    <ListTasks tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
                </section>
            </main>
        </div>
    );
}
