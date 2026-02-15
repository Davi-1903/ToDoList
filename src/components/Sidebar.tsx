import { memo, useEffect, useRef, useState } from 'react';
import { IconDownload, IconMoon, IconPlus, IconSun, IconUpload } from '@tabler/icons-react';
import type { SidebarProps } from '../interfaces/Props';
import type { Theme } from '../interfaces/Objects';
import { copyTasks, pasteTasks } from '../utils/tasks';
import Logo from '../../public/logo.svg';
import clsx from 'clsx';

function Sidebar({ tasks, setAddTask, setTasks }: SidebarProps) {
    const [theme, setTheme] = useState<Theme>(loadTheme);
    const [isOpen, setOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        function handleResize() {
            setOpen(false);
        }

        function handleClick(event: MouseEvent): void {
            if (!sidebarRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div
            className={clsx(
                'fixed inset-0 z-1 h-full transition-all duration-100 sm:static print:hidden',
                isOpen ? 'pointer-events-auto backdrop-blur-2xl' : 'pointer-events-none backdrop-blur-none',
            )}
        >
            <button
                className='pointer-events-auto relative cursor-pointer rounded-br-2xl bg-secund-100 p-2 sm:hidden'
                onClick={() => setOpen(true)}
            >
                <div className='absolute top-0 -right-4 aspect-square h-4 bg-secund-100 mask-radial-from-transparent mask-radial-from-4 mask-radial-to-black mask-radial-to-4 mask-radial-at-bottom-right'></div>
                <div className='absolute -bottom-4 left-0 aspect-square h-4 bg-secund-100 mask-radial-from-transparent mask-radial-from-4 mask-radial-to-black mask-radial-to-4 mask-radial-at-bottom-right'></div>
                <img src={Logo} alt='Logo' className='h-10' />
            </button>
            <div
                ref={sidebarRef}
                className={clsx(
                    'pointer-events-auto absolute top-0 flex min-h-screen w-fit flex-col gap-6 bg-secund-100 p-4 transition-all duration-100 sm:sticky',
                    isOpen ? 'translate-x-0' : 'not-sm:-translate-x-full',
                )}
            >
                <button className='cursor-pointer' onClick={() => setOpen(false)}>
                    <img src={Logo} alt='Logo' className='h-10' />
                </button>
                <hr className='mr-3 w-full rounded-full border border-text-100/15' />
                <nav className='flex flex-1 flex-col gap-6'>
                    <button
                        className='btn aspect-square text-sm md:text-xl'
                        onClick={toggleTheme}
                        title={`Change the theme to ${theme === 'light' ? 'dark' : 'light'}`}
                    >
                        {theme === 'light' ? <IconSun /> : <IconMoon />}
                    </button>
                    <button className='btn text-sm md:text-xl' onClick={() => setAddTask(true)} title='Ctrl + M'>
                        <IconPlus />
                    </button>
                </nav>
                <div>
                    <button
                        className='btn mb-4 block aspect-square'
                        onClick={() => pasteTasks(setTasks)}
                        title='Paste tasks'
                    >
                        <IconUpload />
                    </button>
                    <button className='btn block aspect-square' onClick={() => copyTasks(tasks)} title='Copy tasks'>
                        <IconDownload />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
