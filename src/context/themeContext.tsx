import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Theme, ThemeContextType } from '../interfaces/Objects';
import { loadTheme } from '../utils/theme';

const themeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(loadTheme);

    function toggleTheme(): void {
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

    return <themeContext.Provider value={{ theme, toggleTheme }}>{children}</themeContext.Provider>;
}

export function useTheme() {
    return useContext(themeContext);
}
