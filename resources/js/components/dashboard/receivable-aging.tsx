import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ReceivableBucket } from '@/components/dashboard/dashboard-data';
import { Panel } from '@/components/dashboard/panel';
import { cn } from '@/lib/utils';

export default function ReceivableAging({ buckets, className }: { buckets: ReceivableBucket[]; className?: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const total = buckets.reduce((sum, bucket) => sum + bucket.amount, 0);
    const max = Math.max(...buckets.map((bucket) => bucket.amount));
    const hovered = hoveredIndex !== null ? buckets[hoveredIndex] : null;

    return (
        <Panel
            title="應收帳齡分析"
            description="單位：百萬元"
            className={className}
            action={
                <div className="relative h-10 w-28 shrink-0">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={hoveredIndex ?? 'total'}
                            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex flex-col items-end justify-center"
                        >
                            <span className="text-lg font-semibold tabular-nums">NT$ {(hovered ? hovered.amount : total).toFixed(2)}M</span>
                            <span className="text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
                                {hovered ? `${hovered.label}・佔 ${((hovered.amount / total) * 100).toFixed(1)}%` : '應收合計'}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        >
            <ul className="flex flex-col gap-2" onMouseLeave={() => setHoveredIndex(null)}>
                {buckets.map((bucket, index) => {
                    const isOverdue = index >= 2;
                    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
                    return (
                        <li
                            key={bucket.label}
                            onMouseEnter={() => setHoveredIndex(index)}
                            className={cn(
                                'grid cursor-pointer grid-cols-[4.5rem_1fr_3rem] items-center gap-3 rounded-lg px-1 py-1.5 transition-opacity duration-200',
                                isDimmed && 'opacity-40',
                            )}
                        >
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{bucket.label}</span>
                            <span className="h-4 overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    style={{ width: `${(bucket.amount / max) * 100}%`, originX: 0 }}
                                    transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className={cn(
                                        'block h-full rounded-md bg-linear-to-r',
                                        isOverdue ? 'from-(--admin-accent)/50 to-(--admin-accent)' : 'from-(--admin-accent)/25 to-(--admin-accent)/60',
                                    )}
                                />
                            </span>
                            <span className="text-right text-sm font-medium tabular-nums">{bucket.amount.toFixed(2)}</span>
                        </li>
                    );
                })}
            </ul>
        </Panel>
    );
}
