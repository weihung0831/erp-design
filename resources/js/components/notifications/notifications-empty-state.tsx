import { Link } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { NotificationKind } from '@/components/notifications/notifications-data';
import { NOTIFICATION_KIND_STYLES } from '@/components/notifications/notifications-data';
import { cn } from '@/lib/utils';

/**
 * Adapted from the Aceternity UI block `empty-state-with-stacked-cards`:
 * the template screenshots are replaced by miniature read notifications.
 */
const STACKED_CARDS: {
    kind: NotificationKind;
    rotate: number;
    x: string;
    delay: number;
    isCenter?: boolean;
}[] = [
    { kind: 'inventory', rotate: -10, x: '45%', delay: 0.1 },
    { kind: 'approval', rotate: 0, x: '0%', delay: 0, isCenter: true },
    { kind: 'order', rotate: 10, x: '-45%', delay: 0.1 },
];

function ReadNotification({ kind }: { kind: NotificationKind }) {
    const style = NOTIFICATION_KIND_STYLES[kind];

    return (
        <div className="flex size-full flex-col gap-2 p-3 mask-b-from-50% md:gap-3 md:p-4">
            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-lg bg-linear-to-b text-white shadow-md md:size-8',
                        style.className,
                    )}
                >
                    <style.icon className="size-3 md:size-4" />
                </span>
                <span className="text-[10px] font-medium text-neutral-700 md:text-xs dark:text-neutral-200">{style.label}通知</span>
                <span className="ml-auto grid size-4 place-items-center rounded-full bg-emerald-500 text-white md:size-5">
                    <Check className="size-2.5 md:size-3" strokeWidth={3} />
                </span>
            </div>
            {[80, 60, 70, 45, 55].map((width) => (
                <span key={width} className="h-1.5 rounded-full bg-neutral-200 md:h-2 dark:bg-neutral-800" style={{ width: `${width}%` }} />
            ))}
        </div>
    );
}

export default function NotificationsEmptyState() {
    return (
        <div className="relative w-full rounded-2xl bg-neutral-100 p-6 md:p-10 dark:bg-neutral-900">
            <div className="flex flex-col items-center justify-center gap-8 md:gap-10">
                <div className="flex items-end justify-center" aria-hidden="true">
                    {STACKED_CARDS.map((card) => (
                        <motion.div
                            key={card.kind}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                            whileHover={{ scale: 1.02 }}
                            transition={{
                                type: 'spring',
                                stiffness: 250,
                                damping: 20,
                                mass: 1,
                                delay: card.delay,
                            }}
                            style={{
                                x: card.x,
                                zIndex: card.isCenter ? 40 : undefined,
                            }}
                            className={cn(
                                'relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-neutral-950 dark:shadow-black',
                                card.isCenter ? 'size-32 md:size-48' : 'size-24 md:size-36',
                            )}
                        >
                            <ReadNotification kind={card.kind} />
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h3 className="mx-auto max-w-[40ch] text-center text-lg font-medium tracking-tight text-balance text-neutral-600 md:text-2xl dark:text-neutral-400">
                        通知都清空了 — <span className="text-black text-shadow-black/5 text-shadow-sm dark:text-white">一切都在掌握中</span>
                    </h3>
                    <p className="mx-auto max-w-[56ch] text-center text-sm text-pretty text-neutral-600 dark:text-neutral-400">
                        目前沒有任何通知，有新的簽核、庫存或訂單動態時會第一時間提醒你。
                    </p>
                    <Link
                        href="/dashboard"
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-(--admin-accent) px-4 py-2 text-sm font-medium text-white ring ring-white/20 ring-offset-2 ring-offset-(--admin-accent) transition-all duration-200 ring-inset hover:ring-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--admin-accent) active:scale-98 sm:w-auto"
                    >
                        回到儀表板
                    </Link>
                </div>
            </div>
        </div>
    );
}
