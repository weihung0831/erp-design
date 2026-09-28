import { Link } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useOutsideClick } from '@/components/approvals/approval-detail';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import type { Notification } from '@/components/notifications/notifications-data';
import { NOTIFICATION_KIND_STYLES } from '@/components/notifications/notifications-data';
import { Grid } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

const HEADER_PATTERN = [
    [7, 2],
    [9, 4],
    [8, 1],
    [10, 5],
    [11, 3],
];

const PRIMARY_BUTTON_CLASS =
    'cursor-pointer rounded-full bg-(--admin-accent) px-4 py-2 text-sm font-medium text-white ring ring-white/20 ring-offset-2 ring-offset-(--admin-accent) transition-all duration-200 ring-inset hover:ring-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--admin-accent) active:scale-98';

/**
 * Expanded card of the Aceternity UI block `expandable-card-on-click`. The list rows share the
 * `card-*`, `icon-*` and `title-*` layoutIds, so the card grows out of its row.
 */
export default function NotificationDetail({
    notification,
    onClose,
    onDelete,
}: {
    notification: Notification;
    onClose: () => void;
    onDelete: (id: string) => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const kind = NOTIFICATION_KIND_STYLES[notification.kind];

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
                    layoutId={`card-${notification.id}`}
                    ref={cardRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`title-${notification.id}`}
                    className={cn(
                        'flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-950',
                        ACETERNITY_SHADOW,
                    )}
                >
                    <header className="relative overflow-hidden border-b border-dashed border-neutral-200 px-5 pt-5 pb-6 md:px-6 md:pt-6 dark:border-neutral-800">
                        <div className={cn('pointer-events-none absolute -top-24 -left-16 size-64 rounded-full blur-3xl', kind.glow)} />
                        <Grid size={20} pattern={HEADER_PATTERN} />
                        <div className="relative flex items-start gap-4">
                            <motion.span
                                layoutId={`icon-${notification.id}`}
                                className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-b text-white shadow-lg ring-4 ring-white dark:ring-neutral-950 ${kind.className}`}
                            >
                                <kind.icon className="size-5" />
                            </motion.span>
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                    <span className="rounded-full bg-neutral-900/5 px-2 py-0.5 font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                                        {kind.label}
                                    </span>
                                    <time className="tabular-nums">
                                        {notification.relativeTime} · {notification.time}
                                    </time>
                                </p>
                                <motion.h2
                                    layoutId={`title-${notification.id}`}
                                    id={`title-${notification.id}`}
                                    className="mt-1.5 text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
                                >
                                    {notification.title}
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
                    </header>

                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                        className="flex flex-col gap-5 overflow-y-auto px-5 py-5 md:px-6"
                    >
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{notification.body}</p>

                        {notification.document && (
                            <dl className="flex items-center justify-between rounded-2xl px-4 py-3 ring-1 ring-black/5 dark:ring-white/10">
                                <dt className="text-[11px] text-neutral-400 dark:text-neutral-500">相關單據</dt>
                                <dd className="font-mono text-sm font-medium text-(--admin-accent-ink)">{notification.document}</dd>
                            </dl>
                        )}
                    </motion.div>

                    <footer className="flex items-center justify-between gap-2 border-t border-neutral-200 bg-neutral-50/80 px-5 py-4 md:px-6 dark:border-neutral-800 dark:bg-neutral-900/60">
                        <button
                            type="button"
                            onClick={() => onDelete(notification.id)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                        >
                            <Trash2 className="size-4" />
                            刪除
                        </button>
                        {notification.kind === 'approval' ? (
                            <Link key="go-approvals" href="/dashboard/approvals" className={PRIMARY_BUTTON_CLASS}>
                                前往簽核
                            </Link>
                        ) : (
                            <button key="acknowledge" type="button" onClick={onClose} className={PRIMARY_BUTTON_CLASS}>
                                知道了
                            </button>
                        )}
                    </footer>
                </motion.div>
            </div>
        </>
    );
}
