import { useState } from 'react';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import type { TaskProps } from '../interfaces/Props';
import clsx from 'clsx';

export default function Task({ id, title, description, isComplet, completTask, deleteTask }: TaskProps) {
    const [emerge, setEmerge] = useState(true);

    function onAnimationEnd(): void {
        if (!emerge) deleteTask(id);
    }

    function handleDelete(): void {
        if (!confirm('Você tem certeza de operação?')) return;
        setEmerge(false);
    }

    return (
        <article
            className={clsx(
                'bg-secund-100 grid-task-sm md:grid-task-lg grid gap-4 rounded-xl p-4 shadow-[0_0_1rem_hsl(from_var(--color-text-400)_h_s_l/0.25)]',
                emerge ? 'animate-explosion' : 'animate-implosion',
            )}
            onAnimationEnd={onAnimationEnd}
        >
            <h2 className='text-text-100 text-2xl font-bold'>{title}</h2>
            <span
                className={clsx('h-fit rounded-xl border-2 px-4 py-2 text-sm font-semibold', {
                    'border-green-400 text-green-400': isComplet,
                    'border-red-400 text-red-400': !isComplet,
                })}
            >
                {isComplet ? 'Finished' : 'Pending'}
            </span>
            <p className='text-text-100 col-[1/3] text-lg'>{description}</p>
            <div className='col-span-full row-start-3 flex items-center gap-4 md:col-start-3 md:row-span-full'>
                <button
                    className='btn flex-1 py-6 disabled:cursor-not-allowed disabled:opacity-50 md:aspect-square'
                    onClick={() => completTask(id)}
                    disabled={isComplet}
                >
                    <IconCheck size={32} className='stroke-secund-100 mx-auto' />
                </button>
                <button
                    className='btn flex-1 py-6 disabled:cursor-not-allowed disabled:opacity-50 md:aspect-square'
                    onClick={handleDelete}
                    disabled={!isComplet}
                >
                    <IconTrash size={32} className='stroke-secund-100 mx-auto' />
                </button>
            </div>
        </article>
    );
}
