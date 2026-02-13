import { memo } from 'react';
import type { HeaderProps } from '../interfaces/Props';

function Header({ setAddTask }: HeaderProps) {
    return (
        <header className='bg-secund-100 flex justify-between px-8 py-6'>
            <h1 className='text-text-100 text-4xl font-bold'>Tasks</h1>
            <button className='btn' onClick={() => setAddTask(true)}>
                New
            </button>
        </header>
    );
}

export default memo(Header);
