import { memo, useEffect, useState } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import Logo from '../../public/logo.svg';
import type { HeaderProps } from '../interfaces/Props';
import type { Theme } from '../interfaces/Objects';

function Header({ setAddTask }: HeaderProps) {
    const [theme, setTheme] = useState<Theme>(loadTheme);

    function loadTheme() {
        const storage = localStorage.getItem('theme');
        if (storage) return storage as Theme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function toggleTheme() {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <header className='sticky top-0 z-1 flex justify-between bg-secund-100 p-4 shadow-lg shadow-secund-50/50 md:px-8 md:py-6 print:hidden'>
            <img src={Logo} alt='Logo' className='h-10' />
            <div className='flex gap-6'>
                <button
                    className='btn px-6 text-sm md:px-8 md:text-xl'
                    onClick={toggleTheme}
                    title={`Change the theme to ${theme === 'light' ? 'dark' : 'light'}`}
                >
                    {theme === 'light' ? <IconSun /> : <IconMoon />}
                </button>
                <button
                    className='btn px-6 text-sm md:px-8 md:text-xl'
                    onClick={() => setAddTask(true)}
                    title='Ctrl + M'
                >
                    New
                </button>
            </div>
        </header>
    );
}

export default memo(Header);
