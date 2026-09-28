import type { LucideIcon } from 'lucide-react';
import { BellDot, BellRing, CalendarClock, Megaphone } from 'lucide-react';
import { motion } from 'motion/react';
import { EdgeElement } from '@/components/dashboard/kpi-cards';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Grid } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

export type NotificationSummaryItem = {
    label: string;
    value: number;
    suffix?: string;
    isAlert?: boolean;
};

const SUMMARY_ICONS: { icon: LucideIcon; tone: string }[] = [
    { icon: BellDot, tone: 'from-pink-400 to-pink-600 shadow-pink-500/30' },
    { icon: CalendarClock, tone: 'from-sky-400 to-sky-600 shadow-sky-500/30' },
    { icon: BellRing, tone: 'from-amber-400 to-amber-600 shadow-amber-500/30' },
    { icon: Megaphone, tone: 'from-violet-400 to-violet-600 shadow-violet-500/30' },
];

const SUMMARY_PATTERNS: number[][][] = [
    [
        [8, 1],
        [10, 4],
        [7, 5],
        [9, 2],
        [8, 6],
    ],
    [
        [9, 3],
        [7, 1],
        [10, 6],
        [8, 4],
        [9, 5],
    ],
    [
        [10, 1],
        [8, 3],
        [9, 6],
        [7, 2],
        [10, 4],
    ],
    [
        [7, 4],
        [9, 1],
        [8, 5],
        [10, 3],
        [7, 6],
    ],
];

export default function NotificationSummary({ items }: { items: NotificationSummaryItem[] }) {
    return (
        <div className={cn('grid grid-cols-2 overflow-hidden rounded-2xl bg-white xl:grid-cols-4 dark:bg-neutral-950', ACETERNITY_SHADOW)}>
            {items.map((item, index) => {
                const { icon: Icon, tone } = SUMMARY_ICONS[index % SUMMARY_ICONS.length];
                const isAlerting = item.isAlert && item.value > 0;

                return (
                    <motion.div
                        key={item.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={cn(
                            'group/card relative overflow-hidden p-4 md:p-6',
                            index % 2 === 1 && 'border-l border-neutral-200 dark:border-neutral-800',
                            index >= 2 && 'border-t border-neutral-200 xl:border-t-0 dark:border-neutral-800',
                            index === 2 && 'xl:border-l',
                        )}
                    >
                        <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                        <Grid size={20} pattern={SUMMARY_PATTERNS[index % SUMMARY_PATTERNS.length]} />
                        <EdgeElement />
                        <div className="relative flex items-center gap-3">
                            <span
                                className={cn(
                                    'grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-b text-white shadow-lg ring-1 ring-white/25 ring-inset transition-transform duration-200 group-hover/card:-translate-y-0.5 md:size-12',
                                    tone,
                                )}
                            >
                                <Icon className="size-4 md:size-5" strokeWidth={1.75} />
                            </span>
                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{item.label}</p>
                        </div>
                        <p
                            className={cn(
                                'relative mt-4 text-xl font-bold tracking-tight whitespace-nowrap tabular-nums md:mt-5 md:text-3xl',
                                isAlerting ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-800 dark:text-neutral-100',
                            )}
                        >
                            <AnimatedNumber value={item.value} />
                            {item.suffix && <span className="ml-1 text-sm font-medium text-(--admin-accent)">{item.suffix}</span>}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
