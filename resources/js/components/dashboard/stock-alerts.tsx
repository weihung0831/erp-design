import { motion } from 'motion/react';
import type { StockAlert } from '@/components/dashboard/dashboard-data';
import { Panel, PanelLinkButton } from '@/components/dashboard/panel';
import { cn } from '@/lib/utils';

export default function StockAlerts({ alerts, className }: { alerts: StockAlert[]; className?: string }) {
    return (
        <Panel title="庫存警示" description="低於安全庫存的品項" action={<PanelLinkButton>請購</PanelLinkButton>} className={className}>
            <ul className="flex flex-col gap-3">
                {alerts.map((alert, index) => {
                    const isCritical = alert.level === 'critical';
                    const ratio = Math.min(alert.quantity / alert.safetyStock, 1);
                    return (
                        <motion.li
                            key={alert.sku}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className="group relative overflow-hidden rounded-xl bg-neutral-50 p-3 ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/6"
                        >
                            <div
                                className={cn(
                                    'absolute inset-y-0 left-0 w-24 bg-linear-to-r to-transparent opacity-60',
                                    isCritical ? 'from-red-500/15' : 'from-amber-500/15',
                                )}
                            />
                            <div className="relative flex items-center gap-2.5">
                                <span className="relative flex size-2.5">
                                    {isCritical && <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />}
                                    <span className={cn('relative inline-flex size-2.5 rounded-full', isCritical ? 'bg-red-500' : 'bg-amber-500')} />
                                </span>
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">{alert.item}</span>
                                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">{alert.sku}</span>
                            </div>
                            <div className="relative mt-3 flex items-center gap-3">
                                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        style={{ width: `${Math.max(ratio * 100, 3)}%`, originX: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                        className={cn(
                                            'h-full rounded-full bg-linear-to-r',
                                            isCritical ? 'from-red-400 to-red-600' : 'from-amber-300 to-amber-500',
                                        )}
                                    />
                                </div>
                                <span className="text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
                                    <span className={cn('font-semibold', isCritical ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400')}>
                                        {alert.quantity.toLocaleString()}
                                    </span>
                                    {' / '}
                                    {alert.safetyStock.toLocaleString()}
                                </span>
                            </div>
                        </motion.li>
                    );
                })}
            </ul>
        </Panel>
    );
}
