import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const ACETERNITY_SHADOW =
    'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/8';

export function Panel({
    title,
    description,
    action,
    className,
    children,
}: {
    title: string;
    description?: ReactNode;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section className={cn('relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white p-5 md:p-6 dark:bg-neutral-950', ACETERNITY_SHADOW, className)}>
            <header className="relative z-10 mb-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h2 className="bg-linear-to-b from-neutral-900 to-neutral-600 bg-clip-text text-base font-semibold tracking-tight text-transparent dark:from-white dark:to-neutral-400">
                        {title}
                    </h2>
                    {description && <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{description}</div>}
                </div>
                {action}
            </header>
            {children}
        </section>
    );
}

export function PanelLinkButton({ children }: { children: ReactNode }) {
    return (
        <button
            type="button"
            className="group/link inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-black/8 transition hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white"
        >
            {children}
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
        </button>
    );
}

export function PillTabs<T extends string>({
    options,
    value,
    onChange,
    layoutId,
    label,
    isInverted = false,
}: {
    options: readonly T[];
    value: T;
    onChange: (value: T) => void;
    layoutId: string;
    label: string;
    isInverted?: boolean;
}) {
    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={cn(
                'flex w-fit items-center gap-0.5 rounded-full p-1',
                isInverted ? 'bg-white/5 ring-1 ring-white/10' : 'bg-neutral-100 dark:bg-neutral-800/80',
            )}
        >
            {options.map((option) => (
                <PillTab key={option} isSelected={option === value} onSelect={() => onChange(option)} layoutId={layoutId} isInverted={isInverted}>
                    {option}
                </PillTab>
            ))}
        </div>
    );
}

function PillTab({
    isSelected,
    onSelect,
    layoutId,
    isInverted,
    children,
}: {
    isSelected: boolean;
    onSelect: () => void;
    layoutId: string;
    isInverted: boolean;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={onSelect}
            className={cn(
                'relative cursor-pointer rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors',
                isInverted
                    ? isSelected
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-white'
                    : isSelected
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
            )}
        >
            {isSelected && (
                <motion.span
                    layoutId={layoutId}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                    className={cn(
                        'absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]',
                        !isInverted && 'dark:bg-neutral-700 dark:shadow-none',
                    )}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
}
