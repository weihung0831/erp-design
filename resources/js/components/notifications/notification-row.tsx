import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';
import type { Notification } from '@/components/notifications/notifications-data';
import { NOTIFICATION_KIND_STYLES } from '@/components/notifications/notifications-data';
import { cn } from '@/lib/utils';

function QuickAction({ label, onClick, className, children }: { label: string; onClick: () => void; className?: string; children: ReactNode }) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={(event: MouseEvent) => {
                event.stopPropagation();
                onClick();
            }}
            className={cn(
                'grid size-7 cursor-pointer place-items-center rounded-full text-neutral-500 ring-1 ring-black/8 transition outline-none hover:bg-white hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-(--admin-accent) dark:text-neutral-400 dark:ring-white/10 dark:hover:bg-neutral-800 dark:hover:text-white',
                className,
            )}
        >
            {children}
        </button>
    );
}

/**
 * Collapsed card of the Aceternity UI block `expandable-card-on-click`: shares the `card-*`,
 * `icon-*` and `title-*` layoutIds with {@link NotificationDetail}.
 */
export default function NotificationRow({
    notification,
    index,
    hasDivider,
    onOpen,
    onToggleRead,
    onDelete,
}: {
    notification: Notification;
    index: number;
    hasDivider: boolean;
    onOpen: (id: string) => void;
    onToggleRead: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const kind = NOTIFICATION_KIND_STYLES[notification.kind];
    const isUnread = !notification.isRead;

    return (
        <motion.li
            layoutId={`card-${notification.id}`}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
            exit={{ opacity: 0, x: 24, transition: { duration: 0.25, ease: 'easeOut' } }}
            onClick={() => onOpen(notification.id)}
            className={cn(
                'group relative flex cursor-pointer items-start gap-3 px-5 py-3.5 transition-colors md:px-6',
                hasDivider && 'border-t border-dashed border-neutral-200 dark:border-neutral-800',
                isUnread
                    ? 'bg-(--admin-accent)/5 hover:bg-(--admin-accent)/8 dark:bg-(--admin-accent)/8 dark:hover:bg-(--admin-accent)/12'
                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-900',
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'mt-3 size-1.5 shrink-0 rounded-full transition-opacity',
                    isUnread ? 'bg-(--admin-accent) shadow-[0_0_8px_1px] shadow-(--admin-accent)/60' : 'opacity-0',
                )}
            />
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    onOpen(notification.id);
                }}
                className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
            >
                <motion.span
                    layoutId={`icon-${notification.id}`}
                    className={`grid size-8 shrink-0 place-items-center rounded-lg bg-linear-to-b text-white shadow-md ${kind.className}`}
                >
                    <kind.icon className="size-4" />
                </motion.span>
                <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                        <motion.span
                            layoutId={`title-${notification.id}`}
                            className={cn(
                                'truncate text-sm',
                                isUnread ? 'font-semibold text-neutral-900 dark:text-white' : 'font-medium text-neutral-600 dark:text-neutral-300',
                            )}
                        >
                            {notification.title}
                        </motion.span>
                        {isUnread && <span className="sr-only">（未讀）</span>}
                    </span>
                    <span className="mt-0.5 line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400">{notification.body}</span>
                    <span className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500">
                        <span className="font-medium">{kind.label}</span>
                        {notification.document && (
                            <span className="font-mono transition-colors group-hover:text-(--admin-accent-ink)">{notification.document}</span>
                        )}
                    </span>
                </span>
            </button>
            <div className="relative flex shrink-0 flex-col items-end gap-2">
                <time
                    className={cn(
                        'text-[11px] whitespace-nowrap tabular-nums',
                        isUnread ? 'text-(--admin-accent-ink)' : 'text-neutral-400 dark:text-neutral-500',
                    )}
                >
                    {notification.relativeTime}
                </time>
                <div className="flex items-center gap-1 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                    <QuickAction label={isUnread ? '標為已讀' : '標為未讀'} onClick={() => onToggleRead(notification.id)}>
                        {isUnread ? <MailOpen className="size-3.5" /> : <Mail className="size-3.5" />}
                    </QuickAction>
                    <QuickAction label="刪除" onClick={() => onDelete(notification.id)} className="hover:text-rose-600 dark:hover:text-rose-400">
                        <Trash2 className="size-3.5" />
                    </QuickAction>
                </div>
            </div>
        </motion.li>
    );
}
