import { memo } from 'react';
import type { HeaderProps } from '../interfaces/Props';

function Header({ setAddTask }: HeaderProps) {
    return (
        <header className='bg-secund-100 sticky top-0 z-1 flex justify-between px-8 py-6 shadow-[0_0_1rem_hsl(from_var(--color-text-400)_h_s_l/0.25)]'>
            <h1 className='text-text-100 text-3xl font-bold sm:text-4xl'>Tasks</h1>
            <button className='btn' onClick={() => setAddTask(true)}>
                New
            </button>
        </header>
    );
}

export default memo(Header);
