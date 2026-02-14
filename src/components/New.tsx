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
        addNewTask(title, description);
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
                'fixed inset-0 z-2 grid place-items-center p-6 backdrop-blur-2xl',
                isClose ? 'animate-fade-out' : 'animate-fade-in',
            )}
            onAnimationEnd={onAnimationEnd}
            onSubmit={handleSubmit}
        >
            <form
                ref={formRef}
                className='flex w-full max-w-sm flex-col gap-6 rounded-2xl bg-secund-100 px-4 py-6 shadow-xl shadow-black/25'
            >
                <h2 className='text-3xl font-bold text-text-100'>New Task</h2>
                <div>
                    <label htmlFor='title' className='text-lg text-text-100'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        className='block min-h-12 w-full rounded-lg border-first-100 bg-secund-50 px-4 text-text-100 transition-all duration-100 outline-none focus:border-b-3 dark:bg-secund-200'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoFocus
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description' className='text-lg text-text-100'>
                        Description
                    </label>
                    <input
                        type='text'
                        id='description'
                        className='block min-h-12 w-full rounded-lg border-first-100 bg-secund-50 px-4 text-text-200 transition-all duration-100 outline-none focus:border-b-3 dark:bg-secund-200'
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
