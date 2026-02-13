import type { ListTasksProps } from '../interfaces/Props';
import Task from './Task';

export default function ListTasks({ tasks }: ListTasksProps) {
    return (
        <ul className='flex flex-col gap-6'>
            {tasks.map(task => (
                <Task key={task.id} {...task} />
            ))}
        </ul>
    );
}
