import { useCallback } from 'react';

export type Appearance = 'light' | 'dark';

const STORAGE_KEY = 'appearance';

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
