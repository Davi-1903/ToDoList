import { useState } from 'react';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import type { TaskProps } from '../interfaces/Props';
import clsx from 'clsx';

export default function Task({ id, title, description, isComplete, completeTask, deleteTask }: TaskProps) {
    const [emerge, setEmerge] = useState(true);

    function onAnimationEnd(): void {
        if (!emerge) deleteTask(id);
    }

    function handleDelete(): void {
        if (!confirm('Are you sure?')) return;
        setEmerge(false);
    }

    return (
        <article
            className={clsx(
                'grid gap-4 rounded-xl bg-secund-100 p-4 grid-task-sm not-print:shadow-lg not-print:shadow-gray-900/20 md:grid-task-lg print:border-2 print:text-text-100',
                emerge ? 'animate-explosion' : 'animate-implosion',
            )}
            onAnimationEnd={onAnimationEnd}
        >
            <h2 className='text-2xl font-bold text-text-100'>{title}</h2>
            <span
                className={clsx('h-fit rounded-xl border-2 px-4 py-2 text-sm font-semibold', {
                    'border-green-400 text-green-400': isComplete,
                    'border-red-400 text-red-400': !isComplete,
                })}
            >
                {isComplete ? 'Finished' : 'Pending'}
            </span>
            <p className='col-[1/3] text-lg text-text-100'>{description}</p>
            <div className='col-span-full row-start-3 flex items-center gap-4 md:col-start-3 md:row-span-full print:hidden'>
                <button
                    className='btn flex-1 py-6 disabled:cursor-not-allowed disabled:opacity-50 md:aspect-square md:px-8'
                    onClick={() => completeTask(id)}
                    disabled={isComplete}
                    title={`Complet ${title}`}
                >
                    <IconCheck size={32} className='mx-auto stroke-secund-100' />
                </button>
                <button
                    className='btn flex-1 py-6 disabled:cursor-not-allowed disabled:opacity-50 md:aspect-square md:px-8'
                    onClick={handleDelete}
                    disabled={!isComplete}
                    title={`Delete ${title}`}
                >
                    <IconTrash size={32} className='mx-auto stroke-secund-100' />
                </button>
            </div>
        </article>
    );
}
