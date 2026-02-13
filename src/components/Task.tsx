import clsx from 'clsx';
import type { TaskProps } from '../interfaces/Props';

export default function Task({ title, description, isComplet }: TaskProps) {
    return (
        <article className='bg-secund-100 rounded-xl p-4 shadow-[0_0_1rem_hsl(from_var(--color-text-400)_h_s_l/0.25)]'>
            <div className='mb-4 flex w-full items-center justify-between'>
                <h2 className='text-text-100 text-2xl font-bold'>{title}</h2>
                <span
                    className={clsx('rounded-full border-2 px-4 py-2 text-sm font-semibold', {
                        'border-green-400 text-green-400': isComplet,
                        'border-red-400 text-red-400': !isComplet,
                    })}
                >
                    {isComplet ? 'Finished' : 'Pending'}
                </span>
            </div>
            <p className='text-lg text-text-100'>{description}</p>
        </article>
    );
}
