import { memo, useEffect, useRef, useState } from 'react';
import type { NewProps } from '../interfaces/Props';
import clsx from 'clsx';

function New({ setAddTask }: NewProps) {
    const [isClose, setClose] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

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
                'bg-text-100/25 fixed inset-0 z-1 grid place-items-center backdrop-blur-sm',
                isClose ? 'animate-fade-out' : 'animate-fade-in',
            )}
            onAnimationEnd={onAnimationEnd}
        >
            <form ref={formRef} className='bg-secund-100 flex w-sm flex-col gap-6 rounded-2xl px-4 py-6'>
                <h2 className='text-text-100 text-3xl font-bold'>New Task</h2>
                <div>
                    <label htmlFor='title' className='text-text-100 text-lg'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        className='bg-secund-50 text-text-100 border-first-100 block min-h-12 w-full rounded-lg px-4 transition-all duration-100 outline-none focus:border-b-3'
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
                        required
                    />
                </div>
                <button type='submit' className='btn w-full'>
                    Create
                </button>
            </form>
        </article>
    );
}

export default memo(New);
