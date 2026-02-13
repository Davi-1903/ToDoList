import { useState } from 'react';
import Header from './components/Header';
import New from './components/New';
import type { Task } from './interfaces/Objects';
import ListTasks from './components/ListTasks';

export default function App() {
    const [onAddTask, setAddTask] = useState(false);
    const tasks: Task[] = [];

    return (
        <div className='wrapper'>
            {onAddTask && <New setAddTask={setAddTask} />}
            <Header setAddTask={setAddTask} />
            <main className='mx-auto max-w-6xl p-6'>
                <ListTasks tasks={tasks} />
            </main>
        </div>
    );
}
