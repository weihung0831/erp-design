import type { LucideIcon } from 'lucide-react';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useOutsideClick } from '@/components/approvals/approval-detail';
import { formatCurrency } from '@/components/approvals/approvals-data';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import type { SalesOrderLineItem } from '@/components/sales/sales-orders-data';
import { Grid } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

const HEADER_PATTERN = [
    [8, 2],
    [10, 4],
    [7, 5],
    [9, 1],
    [11, 3],
];

export const STATUS_BADGE_CLASS = 'rounded-full px-2 py-0.5 font-medium';

export const PRIMARY_BUTTON_CLASS =
    'bg-linear-to-b from-sky-400 to-(--admin-accent) text-sm shadow-sm shadow-(--admin-accent)/30 hover:ring-2 hover:ring-(--admin-accent) hover:ring-offset-2 dark:ring-offset-neutral-900';

export const SECONDARY_BUTTON_CLASS = 'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition';

export const CLOSE_BUTTON_CLASS = cn(SECONDARY_BUTTON_CLASS, 'text-neutral-600 hover:bg-neutral-200/60 dark:text-neutral-300 dark:hover:bg-white/5');

export function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** The primary action finishes its stateful-button animation before the record changes. */
export function afterSuccess(action: () => void): () => Promise<void> {
    return async () => {
        await wait(800);
        setTimeout(action, 600);
    };
}

export function lineItemsTotal(lineItems: SalesOrderLineItem[]): number {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

/**
 * Modal behaviour of the expanded Aceternity card: closes on outside click or Escape,
 * locks page scroll, and moves focus to the close button and back on unmount.
 */
export function useModalDialog(cardRef: RefObject<HTMLElement | null>, closeButtonRef: RefObject<HTMLElement | null>, onClose: () => void): void {
    useOutsideClick(cardRef, onClose);

    useEffect(() => {
        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeButtonRef.current?.focus();
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleEscape);
            previouslyFocused?.focus();
        };
    }, [closeButtonRef, onClose]);
}

export function LineItemsTable({ lineItems }: { lineItems: SalesOrderLineItem[] }) {
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="text-left text-xs text-neutral-400 dark:text-neutral-500">
                    <th scope="col" className="pb-2 font-medium">
                        品項
                    </th>
                    <th scope="col" className="pb-2 text-right font-medium">
                        數量
                    </th>
                    <th scope="col" className="pb-2 text-right font-medium">
                        單價
                    </th>
                    <th scope="col" className="pb-2 text-right font-medium">
                        小計
                    </th>
                </tr>
            </thead>
            <tbody>
                {lineItems.map((item) => (
                    <tr key={item.sku} className="border-t border-dashed border-neutral-200 dark:border-neutral-800">
                        <td className="py-2.5">
                            <span className="font-medium">{item.name}</span>
                            <span className="block font-mono text-[11px] text-neutral-400 dark:text-neutral-500">{item.sku}</span>
                        </td>
                        <td className="py-2.5 text-right text-neutral-500 tabular-nums dark:text-neutral-400">
                            {item.quantity.toLocaleString('zh-TW')}
                        </td>
                        <td className="py-2.5 text-right text-neutral-500 tabular-nums dark:text-neutral-400">
                            {item.unitPrice.toLocaleString('zh-TW')}
                        </td>
                        <td className="py-2.5 text-right tabular-nums">{formatCurrency(item.quantity * item.unitPrice)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className="border-t border-neutral-200 dark:border-neutral-800">
                    <td colSpan={3} className="pt-3 text-xs text-neutral-500 dark:text-neutral-400">
                        合計
                    </td>
                    <td className="pt-3 text-right font-semibold tabular-nums">{formatCurrency(lineItemsTotal(lineItems))}</td>
                </tr>
            </tfoot>
        </table>
    );
}

export function StatusDot({ label, style }: { label: string; style: { dot: string; text: string } }) {
    return (
        <span className={cn('inline-flex items-center gap-1.5 font-medium whitespace-nowrap', style.text)}>
            <span className={cn('size-1.5 rounded-full shadow-[0_0_8px_1px]', style.dot)} />
            {label}
        </span>
    );
}

export function StepProgress<T extends string>({ steps, current, label }: { steps: readonly T[]; current: T; label: string }) {
    const currentStep = steps.indexOf(current);
    const inset = 50 / steps.length;

    return (
        <ol aria-label={label} className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            <span
                className="absolute top-3.5 h-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800"
                style={{ left: `${inset}%`, right: `${inset}%` }}
            />
            <motion.span
                initial={false}
                animate={{ width: `${(currentStep / (steps.length - 1)) * (100 - inset * 2)}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                style={{ left: `${inset}%` }}
                className="absolute top-3.5 h-0.5 rounded-full bg-linear-to-r from-sky-400 to-(--admin-accent)"
            />
            {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                    <li key={step} aria-current={isCurrent ? 'step' : undefined} className="relative flex flex-col items-center gap-1.5">
                        <span
                            className={cn(
                                'grid size-7 place-items-center rounded-full text-[11px] font-semibold ring-4 ring-white dark:ring-neutral-950',
                                isDone && 'bg-(--admin-accent) text-white',
                                isCurrent && 'bg-linear-to-b from-sky-400 to-(--admin-accent) text-white shadow-md shadow-(--admin-accent)/40',
                                !isDone && !isCurrent && 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500',
                            )}
                        >
                            {isDone ? <Check className="size-3.5" /> : index + 1}
                        </span>
                        <span
                            className={cn(
                                'text-xs',
                                isCurrent ? 'font-semibold text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400',
                            )}
                        >
                            {step}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}

export type DetailField = { label: string; value: ReactNode; isAlert?: boolean; isWide?: boolean; isFullRow?: boolean };

/** Dashed-grid field list; use `isWide` (2 columns) or `isFullRow` on the last field so no cell is left empty. */
export function DetailFields({ fields }: { fields: DetailField[] }) {
    return (
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl ring-1 ring-black/5 sm:grid-cols-3 dark:ring-white/10">
            {fields.map((field) => (
                <div
                    key={field.label}
                    className={cn(
                        '-mt-px -ml-px border-t border-l border-dashed border-neutral-200 px-4 py-3 dark:border-neutral-800',
                        field.isWide && 'col-span-2',
                        field.isFullRow && 'col-span-2 sm:col-span-3',
                    )}
                >
                    <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">{field.label}</dt>
                    <dd className={cn('mt-0.5 text-sm font-medium tabular-nums', field.isAlert && 'text-rose-600 dark:text-rose-400')}>
                        {field.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

export function DetailNote({ children }: { children: ReactNode }) {
    return (
        <blockquote className="border-l-2 border-(--admin-accent) pl-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {children}
        </blockquote>
    );
}

/**
 * Expanded card of the Aceternity UI block `expandable-card-on-click`. List rows share the
 * `{layoutPrefix}-card-*`, `-icon-*` and `-title-*` layoutIds, so the card grows out of its row.
 */
export function DetailCard({
    layoutPrefix,
    id,
    icon: Icon,
    title,
    badges,
    headline,
    footer,
    onClose,
    children,
}: {
    layoutPrefix: string;
    id: string;
    icon: LucideIcon;
    title: string;
    badges: ReactNode;
    headline: { label: string; value: ReactNode };
    footer: ReactNode;
    onClose: () => void;
    children: ReactNode;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useModalDialog(cardRef, closeButtonRef, onClose);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm dark:bg-black/60"
            />
            <div className="fixed inset-0 z-[100] grid place-items-center p-4">
                <motion.div
                    layoutId={`${layoutPrefix}-card-${id}`}
                    ref={cardRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${layoutPrefix}-title-${id}`}
                    className={cn(
                        'flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-950',
                        ACETERNITY_SHADOW,
                    )}
                >
                    <header className="relative overflow-hidden border-b border-dashed border-neutral-200 px-5 pt-5 pb-6 md:px-6 md:pt-6 dark:border-neutral-800">
                        <div className="pointer-events-none absolute -top-24 -left-16 size-64 rounded-full bg-sky-400/25 blur-3xl" />
                        <Grid size={20} pattern={HEADER_PATTERN} />
                        <div className="relative flex items-start gap-4">
                            <motion.span
                                layoutId={`${layoutPrefix}-icon-${id}`}
                                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/30 ring-4 ring-white dark:ring-neutral-950"
                            >
                                <Icon className="size-5" />
                            </motion.span>
                            <div className="min-w-0 flex-1">
                                <p className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                    <span className="font-mono">{id}</span>
                                    {badges}
                                </p>
                                <motion.h2
                                    layoutId={`${layoutPrefix}-title-${id}`}
                                    id={`${layoutPrefix}-title-${id}`}
                                    className="mt-1.5 truncate text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
                                >
                                    {title}
                                </motion.h2>
                            </div>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={onClose}
                                aria-label="關閉"
                                className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-white/80 text-neutral-500 ring-1 ring-black/5 backdrop-blur transition hover:text-neutral-900 hover:ring-black/15 dark:bg-neutral-900/80 dark:text-neutral-400 dark:ring-white/10 dark:hover:text-white"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                        <div className="relative mt-5">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{headline.label}</p>
                            <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums">{headline.value}</p>
                        </div>
                    </header>

                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                        className="flex flex-col gap-5 overflow-y-auto px-5 py-5 md:px-6"
                    >
                        {children}
                    </motion.div>

                    <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50/80 px-5 py-4 md:px-6 dark:border-neutral-800 dark:bg-neutral-900/60">
                        <button type="button" onClick={onClose} className={CLOSE_BUTTON_CLASS}>
                            關閉
                        </button>
                        {footer}
                    </footer>
                </motion.div>
            </div>
        </>
    );
}

export function CurrencyHeadline({ amount }: { amount: number }) {
    return (
        <>
            <span className="mr-1 text-lg font-semibold text-neutral-400 dark:text-neutral-500">NT$</span>
            {amount.toLocaleString('zh-TW')}
        </>
    );
}
