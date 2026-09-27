import { useCallback, useEffect } from 'react';

export type Appearance = 'light' | 'dark';

const STORAGE_KEY = 'appearance';

function readStoredAppearance(): Appearance | null {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === 'light' || value === 'dark' ? value : null;
    } catch {
        return null;
    }
}

function storeAppearance(appearance: Appearance): void {
    try {
        localStorage.setItem(STORAGE_KEY, appearance);
    } catch {
        return;
    }
}

function applyAppearance(appearance: Appearance): void {
    const isDark = appearance === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useAppearance(): { toggleAppearance: () => void } {
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemChange = (event: MediaQueryListEvent) => {
            if (readStoredAppearance() === null) {
                applyAppearance(event.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, []);

    const toggleAppearance = useCallback(() => {
        const nextAppearance: Appearance = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        storeAppearance(nextAppearance);

        if (!document.startViewTransition || prefersReducedMotion()) {
            applyAppearance(nextAppearance);
            return;
        }

        document.startViewTransition(() => applyAppearance(nextAppearance));
    }, []);

    return { toggleAppearance };
}
