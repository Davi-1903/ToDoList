import type { Theme } from '../interfaces/Objects';

export function loadTheme(): Theme {
    const storage = localStorage.getItem('theme');
    if (storage) return storage as Theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
