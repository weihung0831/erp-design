import { X } from 'lucide-react';
import { motion } from 'motion/react';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Approval } from '@/components/approvals/approvals-data';
import { formatCurrency, KIND_STYLES, PRIORITY_STATUS_STYLES } from '@/components/approvals/approvals-data';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { Grid } from '@/components/ui/grid-pattern';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { cn } from '@/lib/utils';

const HEADER_PATTERN = [
    [7, 1],
    [9, 3],
    [8, 5],
    [10, 2],
    [11, 4],
];

function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * From the Aceternity UI block `expandable-card-on-click`.
 */
export function useOutsideClick(ref: RefObject<HTMLElement | null>, callback: () => void): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            // While a dropdown from the card is open, the click (on an option or outside) only closes that dropdown.
            if (document.querySelector('[data-radix-popper-content-wrapper]')) {
                return;
            }
            callback();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, callback]);
}

/**
 * Expanded card of the Aceternity UI block `expandable-card-on-click`. The list rows share the
 * `card-*`, `icon-*` and `title-*` layoutIds, so the card grows out of its row.
 */
export default function ApprovalDetail({
    approval,
    onClose,
    onHandled,
}: {
    approval: Approval;
    onClose: () => void;
    onHandled: (id: string) => void;
}) {
    const [isRejecting, setIsRejecting] = useState(false);
    const [reason, setReason] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const kind = KIND_STYLES[approval.kind];
    const status = PRIORITY_STATUS_STYLES[approval.priority];

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
    }, [onClose]);

    const approve = async () => {
        await wait(800);
        setTimeout(() => onHandled(approval.id), 900);
    };

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
                    layoutId={`card-${approval.id}`}
                    ref={cardRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`title-${approval.id}`}
                    className={cn(
                        'flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-950',
                        ACETERNITY_SHADOW,
                    )}
                >
                    <header className="relative overflow-hidden border-b border-dashed border-neutral-200 px-5 pt-5 pb-6 md:px-6 md:pt-6 dark:border-neutral-800">
                        <div className={cn('pointer-events-none absolute -top-24 -left-16 size-64 rounded-full blur-3xl', kind.glow)} />
                        <Grid size={20} pattern={HEADER_PATTERN} />
                        <div className="relative flex items-start gap-4">
                            <motion.span
                                layoutId={`icon-${approval.id}`}
                                className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-b text-white shadow-lg ring-4 ring-white dark:ring-neutral-950 ${kind.className}`}
                            >
                                <kind.icon className="size-5" />
                            </motion.span>
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                    <span className="rounded-full bg-neutral-900/5 px-2 py-0.5 font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                                        {kind.label}
                                    </span>
                                    <span className="font-mono">{approval.id}</span>
                                </p>
                                <motion.h2
                                    layoutId={`title-${approval.id}`}
                                    id={`title-${approval.id}`}
                                    className="mt-1.5 text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
                                >
                                    {approval.title}
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
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">申請金額</p>
                            <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums">
                                <span className="mr-1 text-lg font-semibold text-neutral-400 dark:text-neutral-500">NT$</span>
                                {approval.amount.toLocaleString('zh-TW')}
                            </p>
                        </div>
                    </header>

                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                        className="flex flex-col gap-5 overflow-y-auto px-5 py-5 md:px-6"
                    >
                        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                            {[
                                { label: '申請人', value: approval.requester },
                                { label: '部門', value: approval.department },
                                { label: '送出時間', value: approval.submittedAt },
                            ].map((field, index) => (
                                <div
                                    key={field.label}
                                    className={cn(
                                        'px-4 py-3',
                                        index % 2 === 1 && 'border-l border-dashed border-neutral-200 dark:border-neutral-800',
                                        index >= 2 && 'border-t border-dashed border-neutral-200 dark:border-neutral-800',
                                    )}
                                >
                                    <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">{field.label}</dt>
                                    <dd className="mt-0.5 text-sm font-medium">{field.value}</dd>
                                </div>
                            ))}
                            <div className="border-t border-l border-dashed border-neutral-200 px-4 py-3 dark:border-neutral-800">
                                <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">期限</dt>
                                <dd className="mt-0.5 flex items-center gap-2 text-sm font-medium tabular-nums">
                                    {approval.dueDate}
                                    <span className={cn('inline-flex items-center gap-1.5 text-xs', status.text)}>
                                        <span className={cn('size-1.5 rounded-full shadow-[0_0_8px_1px]', status.dot)} />
                                        {status.label}
                                    </span>
                                </dd>
                            </div>
                        </dl>

                        <blockquote className="border-l-2 border-(--admin-accent) pl-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                            {approval.note}
                        </blockquote>

                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-neutral-400 dark:text-neutral-500">
                                    <th scope="col" className="pb-2 font-medium">品項</th>
                                    <th scope="col" className="pb-2 text-right font-medium">數量</th>
                                    <th scope="col" className="pb-2 text-right font-medium">金額</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approval.lineItems.map((item) => (
                                    <tr key={item.name} className="border-t border-dashed border-neutral-200 dark:border-neutral-800">
                                        <td className="py-2.5 font-medium">{item.name}</td>
                                        <td className="py-2.5 text-right text-neutral-500 tabular-nums dark:text-neutral-400">
                                            {item.quantity.toLocaleString('zh-TW')}
                                        </td>
                                        <td className="py-2.5 text-right tabular-nums">{formatCurrency(item.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-neutral-200 dark:border-neutral-800">
                                    <td colSpan={2} className="pt-3 text-xs text-neutral-500 dark:text-neutral-400">
                                        合計
                                    </td>
                                    <td className="pt-3 text-right font-semibold tabular-nums">{formatCurrency(approval.amount)}</td>
                                </tr>
                            </tfoot>
                        </table>

                        {isRejecting && (
                            <form
                                id="reject-form"
                                className="flex flex-col gap-2"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    onHandled(approval.id);
                                }}
                            >
                                <label htmlFor="reject-reason" className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                                    退回原因
                                </label>
                                <textarea
                                    id="reject-reason"
                                    autoFocus
                                    required
                                    rows={3}
                                    value={reason}
                                    onChange={(event) => setReason(event.target.value)}
                                    placeholder="請輸入退回原因"
                                    className="resize-none rounded-xl bg-neutral-50 p-3 text-sm ring-1 ring-black/8 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-rose-400 dark:bg-neutral-900 dark:ring-white/10"
                                />
                            </form>
                        )}
                    </motion.div>

                    <footer className="flex items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50/80 px-5 py-4 md:px-6 dark:border-neutral-800 dark:bg-neutral-900/60">
                        {isRejecting ? (
                            <>
                                <button
                                    key="cancel"
                                    type="button"
                                    onClick={() => setIsRejecting(false)}
                                    className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-200/60 dark:text-neutral-300 dark:hover:bg-white/5"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    form="reject-form"
                                    disabled={reason.trim() === ''}
                                    className="cursor-pointer rounded-full bg-linear-to-b from-rose-400 to-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-rose-500/30 transition disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    確認退回
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    key="reject"
                                    type="button"
                                    onClick={() => setIsRejecting(true)}
                                    className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-50 dark:bg-transparent dark:text-rose-300 dark:ring-rose-500/30 dark:hover:bg-rose-500/10"
                                >
                                    退回
                                </button>
                                <StatefulButton
                                    onClick={approve}
                                    className="bg-linear-to-b from-emerald-400 to-emerald-600 text-sm shadow-sm shadow-emerald-500/30 hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 dark:ring-offset-neutral-900"
                                >
                                    核准
                                </StatefulButton>
                            </>
                        )}
                    </footer>
                </motion.div>
            </div>
        </>
    );
}
