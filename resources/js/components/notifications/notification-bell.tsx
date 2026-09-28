import { Link } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/components/approvals/approval-detail';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { NOTIFICATION_KIND_STYLES, NOTIFICATIONS } from '@/components/notifications/notifications-data';
import { cn } from '@/lib/utils';

const PREVIEW_COUNT = 5;

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const containerRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    const close = useCallback(() => setIsOpen(false), []);
    useOutsideClick(containerRef, close);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [isOpen, close]);

    const markAllAsRead = () => setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                aria-label="通知"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                className={cn(
                    'relative grid size-10 cursor-pointer place-items-center rounded-full text-neutral-700 ring-1 ring-black/10 transition hover:bg-black/5 dark:text-neutral-200 dark:ring-white/12 dark:hover:bg-white/8',
                    isOpen && 'bg-black/5 dark:bg-white/8',
                )}
            >
                <Bell className="size-4.5" strokeWidth={1.75} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--admin-accent) opacity-60" />
                        <span className="relative inline-flex size-2 rounded-full bg-(--admin-accent)" />
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-label="通知"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className={cn(
                            'absolute top-full right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl bg-white dark:bg-neutral-950',
                            ACETERNITY_SHADOW,
                        )}
                    >
                        <header className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-200 px-4 py-3 dark:border-neutral-800">
                            <div>
                                <p className="text-sm font-semibold">通知</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {unreadCount > 0 ? `${unreadCount} 則未讀` : '所有通知都已讀取'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                disabled={unreadCount === 0}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-(--admin-accent-ink) transition hover:bg-(--admin-accent)/10 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <CheckCheck className="size-3.5" />
                                全部標為已讀
                            </button>
                        </header>

                        <ul>
                            {notifications.slice(0, PREVIEW_COUNT).map((notification) => {
                                const kind = NOTIFICATION_KIND_STYLES[notification.kind];
                                return (
                                    <li
                                        key={notification.id}
                                        className="border-t border-dashed border-neutral-200 first:border-t-0 dark:border-neutral-800"
                                    >
                                        <Link
                                            href="/dashboard/notifications"
                                            className={cn(
                                                'flex items-start gap-3 px-4 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900',
                                                !notification.isRead && 'bg-(--admin-accent)/4',
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'grid size-8 shrink-0 place-items-center rounded-lg bg-linear-to-b text-white shadow-md',
                                                    kind.className,
                                                )}
                                            >
                                                <kind.icon className="size-4" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={cn(
                                                        'block truncate text-sm',
                                                        notification.isRead ? 'text-neutral-600 dark:text-neutral-300' : 'font-semibold',
                                                    )}
                                                >
                                                    {notification.title}
                                                </span>
                                                <span className="mt-0.5 block text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">
                                                    {kind.label}・{notification.relativeTime}
                                                </span>
                                            </span>
                                            {!notification.isRead && (
                                                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-(--admin-accent)">
                                                    <span className="sr-only">未讀</span>
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            href="/dashboard/notifications"
                            className="group/all flex items-center justify-center gap-1 border-t border-neutral-200 bg-neutral-50/80 px-4 py-2.5 text-xs font-medium text-neutral-600 transition hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:text-white"
                        >
                            查看全部通知
                            <span className="transition-transform duration-200 group-hover/all:translate-x-0.5">→</span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
