export type Theme = 'light' | 'dark';

export interface Task {
    id: string;
    title: string;
    description: string;
    isComplet: boolean;
}

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
