import type { ListTasksProps } from '../interfaces/Props';
import Task from './Task';

export default function ListTasks({ tasks, completTask, deleteTask }: ListTasksProps) {
    if (tasks.length === 0)
        return (
            <h1 className='text-text-100 dark:text-secund-100 text-center text-2xl font-bold md:text-4xl'>
                There are no tasks
            </h1>
        );
    return (
        <ul className='flex flex-col gap-6'>
            {tasks.map(task => {
                if (!task.isComplet)
                    return <Task key={task.id} {...task} completTask={completTask} deleteTask={deleteTask} />;
            })}
            {tasks.map(task => {
                if (task.isComplet)
                    return <Task key={task.id} {...task} completTask={completTask} deleteTask={deleteTask} />;
            })}
        </ul>
    );
}
