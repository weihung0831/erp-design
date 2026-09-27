import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { MonthlyRevenue } from '@/components/dashboard/dashboard-data';
import { Panel } from '@/components/dashboard/panel';
import { cn } from '@/lib/utils';

const REVENUE_MAX = 14;
const REVENUE_GRID = [0, 5, 10];

export default function RevenueChart({ data, className }: { data: MonthlyRevenue[]; className?: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const latestIndex = data.length - 1;
    const hovered = hoveredIndex !== null ? data[hoveredIndex] : null;
    const previous = hoveredIndex !== null && hoveredIndex > 0 ? data[hoveredIndex - 1] : null;
    const change = hovered && previous ? ((hovered.value - previous.value) / previous.value) * 100 : null;

    return (
        <Panel
            title="月營收趨勢"
            description="近 12 個月・單位：百萬元"
            className={className}
            action={
                <div className="relative h-10 w-36 shrink-0 text-right">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={hoveredIndex ?? 'total'}
                            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex flex-col items-end justify-center"
                        >
                            <span className="text-lg font-semibold text-neutral-900 tabular-nums dark:text-white">
                                NT$ {(hovered ? hovered.value : total).toFixed(hovered ? 2 : 1)}M
                            </span>
                            <span
                                className={cn(
                                    'text-xs tabular-nums',
                                    change === null
                                        ? 'text-neutral-500 dark:text-neutral-400'
                                        : change >= 0
                                          ? 'text-emerald-600 dark:text-emerald-400'
                                          : 'text-red-600 dark:text-red-400',
                                )}
                            >
                                {hovered
                                    ? change === null
                                        ? hovered.month
                                        : `${hovered.month}・${change >= 0 ? '+' : ''}${change.toFixed(1)}% MoM`
                                    : '12 個月合計'}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        >
            <div className="flex min-h-64 flex-1 gap-3">
                <div className="flex w-6 shrink-0 flex-col text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">
                    <div className="relative flex-1">
                        {REVENUE_GRID.map((tick) => (
                            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / REVENUE_MAX) * 100}%` }}>
                                {tick}
                            </span>
                        ))}
                    </div>
                    <div className="h-7" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="relative flex-1">
                        {REVENUE_GRID.map((tick) => (
                            <span
                                key={tick}
                                className={cn(
                                    'absolute inset-x-0 h-px',
                                    tick === 0 ? 'bg-neutral-200 dark:bg-neutral-800' : 'border-t border-dashed border-neutral-200 dark:border-neutral-800',
                                )}
                                style={{ bottom: `${(tick / REVENUE_MAX) * 100}%` }}
                            />
                        ))}
                        <div className="absolute inset-0 flex items-end gap-1 sm:gap-2" onMouseLeave={() => setHoveredIndex(null)}>
                            {data.map((entry, index) => {
                                const isHighlighted = hoveredIndex === null ? index === latestIndex : index === hoveredIndex;
                                return (
                                    <div
                                        key={entry.month}
                                        className="relative flex h-full flex-1 cursor-pointer items-end justify-center"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                    >
                                        <span
                                            className={cn(
                                                'pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-28 max-w-16 bg-[radial-gradient(closest-side,rgba(75,107,251,0.35),transparent)] transition-opacity duration-300',
                                                isHighlighted ? 'opacity-100' : 'opacity-0',
                                            )}
                                        />
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.04 }}
                                            style={{ height: `${(entry.value / REVENUE_MAX) * 100}%`, originY: 1 }}
                                            className="relative w-full max-w-9 overflow-hidden rounded-t-md"
                                        >
                                            <div className="absolute inset-0 bg-linear-to-t from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-800/60" />
                                            <div
                                                className={cn(
                                                    'absolute inset-0 bg-linear-to-t from-(--admin-accent) to-[#8aa0ff] transition-opacity duration-300',
                                                    isHighlighted ? 'opacity-100' : 'opacity-0',
                                                )}
                                            />
                                            <div
                                                className={cn(
                                                    'absolute inset-x-0 top-0 h-px bg-white/80 transition-opacity duration-300',
                                                    isHighlighted ? 'opacity-100' : 'opacity-0',
                                                )}
                                            />
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex h-7 items-end gap-1 sm:gap-2">
                        {data.map((entry, index) => (
                            <span
                                key={entry.month}
                                className={cn(
                                    'flex-1 text-center text-[11px] transition-colors',
                                    (hoveredIndex ?? latestIndex) === index ? 'font-medium text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-500',
                                )}
                            >
                                {entry.month}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <table className="sr-only">
                <caption>月營收（百萬元）</caption>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.month}>
                            <th scope="row">{entry.month}</th>
                            <td>{entry.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Panel>
    );
}
