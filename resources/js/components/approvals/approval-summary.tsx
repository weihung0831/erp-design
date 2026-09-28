import type { LucideIcon } from 'lucide-react';
import { AlarmClock, ClipboardList, Flame, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { EdgeElement } from '@/components/dashboard/kpi-cards';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Grid } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

export type SummaryItem = {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    isAlert?: boolean;
};

const SUMMARY_ICONS: { icon: LucideIcon; tone: string }[] = [
    { icon: ClipboardList, tone: 'from-teal-400 to-teal-600 shadow-teal-500/30' },
    { icon: Wallet, tone: 'from-[#6d8bff] to-[#4b6bfb] shadow-[#4b6bfb]/30' },
    { icon: Flame, tone: 'from-amber-400 to-amber-600 shadow-amber-500/30' },
    { icon: AlarmClock, tone: 'from-rose-400 to-rose-600 shadow-rose-500/30' },
];

const SUMMARY_PATTERNS: number[][][] = [
    [
        [9, 2],
        [8, 5],
        [10, 1],
        [7, 3],
        [9, 6],
    ],
    [
        [7, 1],
        [10, 4],
        [8, 6],
        [9, 3],
        [7, 5],
    ],
    [
        [8, 2],
        [10, 5],
        [7, 4],
        [9, 1],
        [8, 6],
    ],
    [
        [10, 2],
        [7, 6],
        [9, 4],
        [8, 1],
        [10, 5],
    ],
];

export default function ApprovalSummary({ items }: { items: SummaryItem[] }) {
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
                                isAlerting ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-800 dark:text-neutral-100',
                            )}
                        >
                            {item.prefix && (
                                <span className="mr-0.5 text-sm font-semibold text-neutral-400 md:text-lg dark:text-neutral-500">{item.prefix}</span>
                            )}
                            <AnimatedNumber value={item.value} />
                            {item.suffix && <span className="ml-1 text-sm font-medium text-(--admin-accent)">{item.suffix}</span>}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
