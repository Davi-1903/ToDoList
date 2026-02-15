import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/themeContext';
import App from './App';
import './globals.css';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </React.StrictMode>,
    );
}
