import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ShipmentDay, ShipmentDayStatus } from '@/components/dashboard/dashboard-data';
import { Panel } from '@/components/dashboard/panel';
import { cn } from '@/lib/utils';

const STATUS_LABELS: Record<ShipmentDayStatus, string> = {
    onTime: '全數準時出貨',
    minorDelay: '輕微延遲',
    delayed: '部分延遲',
    missed: '嚴重延遲',
};

const STATUS_COLORS: Record<ShipmentDayStatus, string> = {
    onTime: 'bg-emerald-400',
    minorDelay: 'bg-amber-400',
    delayed: 'bg-orange-400',
    missed: 'bg-red-400',
};

const STATUS_TEXT: Record<ShipmentDayStatus, string> = {
    onTime: 'text-emerald-600 dark:text-emerald-400',
    minorDelay: 'text-amber-600 dark:text-amber-400',
    delayed: 'text-orange-600 dark:text-orange-400',
    missed: 'text-red-600 dark:text-red-400',
};

export default function ShipmentUptime({ history, className }: { history: ShipmentDay[]; className?: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const hovered = hoveredIndex !== null ? history[hoveredIndex] : null;

    return (
        <Panel title="出貨準時率" description="近 45 天每日出貨表現" className={className}>
            <div className="mb-4 flex h-10 items-center justify-between">
                <div className="relative h-full min-w-0 flex-1 pr-2">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={hoveredIndex ?? 'default'}
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <span className="truncate text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                {hovered ? STATUS_LABELS[hovered.status] : '整體準時率'}
                            </span>
                            <span className="h-4 truncate text-xs text-neutral-500 dark:text-neutral-400">
                                {hovered ? `${hovered.date}${hovered.delayedOrders ? `・${hovered.delayedOrders} 張延遲` : ''}` : '目標 ≥ 97%'}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="relative h-full w-20 shrink-0">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={hovered?.rate ?? 'overall'}
                            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.8 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                                'absolute top-1/2 right-0 -translate-y-1/2 text-xl font-semibold tabular-nums',
                                hovered ? STATUS_TEXT[hovered.status] : 'text-neutral-800 dark:text-neutral-100',
                            )}
                        >
                            {hovered?.rate ?? '98.6%'}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex h-10 items-end justify-between gap-px sm:gap-[3px]" onMouseLeave={() => setHoveredIndex(null)}>
                {history.map((day, index) => (
                    <div
                        key={day.date}
                        className="relative flex h-full flex-1 cursor-pointer items-end justify-center"
                        onMouseEnter={() => setHoveredIndex(index)}
                    >
                        <motion.div
                            className={cn('h-10 w-full max-w-1.5 rounded-full', STATUS_COLORS[day.status])}
                            style={{ originY: 1 }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: hoveredIndex === index ? 1 : 0.7, opacity: 1 }}
                            transition={{
                                scaleY: { type: 'spring', stiffness: 300, damping: 20 },
                                opacity: { duration: 0.3, delay: index * 0.01 },
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
                <span>45 天前</span>
                <span>今天</span>
            </div>
        </Panel>
    );
}
