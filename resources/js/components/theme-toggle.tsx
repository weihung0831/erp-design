import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ className }: { className?: string }) {
    const { toggleAppearance } = useAppearance();

    return (
        <button
            type="button"
            onClick={toggleAppearance}
            aria-label="切換深淺主題"
            title="切換深淺主題"
            className={cn(
                'relative z-20 grid size-10 cursor-pointer place-items-center rounded-full text-(--hub-ink) ring-1 ring-black/10 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--hub-ink) dark:ring-white/12 dark:hover:bg-white/8',
                className,
            )}
        >
            <Moon className="size-4.5 dark:hidden" strokeWidth={1.75} />
            <Sun className="hidden size-4.5 dark:block" strokeWidth={1.75} />
        </button>
    );
}
