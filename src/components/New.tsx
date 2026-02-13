import { memo, useEffect, useRef, useState, type SubmitEvent } from 'react';
import type { NewProps } from '../interfaces/Props';
import clsx from 'clsx';

function New({ setAddTask, addNewTask }: NewProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isClose, setClose] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
        addNewTask({ title, description });
        setClose(true);
    }

    function onAnimationEnd() {
        if (isClose) setAddTask(false);
    }

    useEffect(() => {
        function handleClick(event: MouseEvent): void {
            if (!formRef.current?.contains(event.target as Node)) {
                setClose(true);
            }
        }

        function handleKeydown(event: KeyboardEvent): void {
            if (event.key === 'Escape') {
                setClose(true);
            }
        }

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <article
            className={clsx(
                'bg-text-100/25 fixed inset-0 z-2 grid place-items-center p-6 shadow-[0_0_1rem_hsl(from_var(--color-text-400)_h_s_l/0.25)] backdrop-blur-sm',
                isClose ? 'animate-fade-out' : 'animate-fade-in',
            )}
            onAnimationEnd={onAnimationEnd}
            onSubmit={handleSubmit}
        >
            <form ref={formRef} className='bg-secund-100 flex w-full max-w-sm flex-col gap-6 rounded-2xl px-4 py-6'>
                <h2 className='text-text-100 text-3xl font-bold'>New Task</h2>
                <div>
                    <label htmlFor='title' className='text-text-100 text-lg'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        className='bg-secund-50 text-text-100 border-first-100 block min-h-12 w-full rounded-lg px-4 transition-all duration-100 outline-none focus:border-b-3'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoFocus
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description' className='text-text-100 text-lg'>
                        Description
                    </label>
                    <input
                        type='text'
                        id='description'
                        className='bg-secund-50 text-text-100 border-first-100 block min-h-12 w-full rounded-lg px-4 transition-all duration-100 outline-none focus:border-b-3'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    className='btn w-full disabled:cursor-not-allowed disabled:opacity-50'
                    disabled={isClose}
                >
                    Create
                </button>
            </form>
        </article>
    );
}

export default memo(New);
