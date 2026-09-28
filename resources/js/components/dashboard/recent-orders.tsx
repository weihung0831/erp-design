import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { OrderStatus, RecentOrder } from '@/components/dashboard/dashboard-data';
import { Panel, PanelLinkButton, PillTabs } from '@/components/dashboard/panel';
import { cn } from '@/lib/utils';

export const ORDER_FILTERS = ['全部', '待確認', '備貨中', '已出貨', '已結案'] as const;

export type OrderFilter = (typeof ORDER_FILTERS)[number];

export const ORDER_STATUS_STYLES: Record<OrderStatus, { dot: string; text: string }> = {
    待確認: { dot: 'bg-amber-500 shadow-amber-500/60', text: 'text-amber-700 dark:text-amber-400' },
    備貨中: { dot: 'bg-(--admin-accent) shadow-(--admin-accent)/60', text: 'text-(--admin-accent-ink)' },
    已出貨: { dot: 'bg-emerald-500 shadow-emerald-500/60', text: 'text-emerald-700 dark:text-emerald-400' },
    已結案: { dot: 'bg-neutral-400 shadow-transparent', text: 'text-neutral-500 dark:text-neutral-400' },
};

export default function RecentOrders({ orders, className }: { orders: RecentOrder[]; className?: string }) {
    const [filter, setFilter] = useState<OrderFilter>('全部');
    const visibleOrders = filter === '全部' ? orders : orders.filter((order) => order.status === filter);

    return (
        <Panel title="近期銷貨訂單" description="最近 7 天建立的訂單" action={<PanelLinkButton href="/dashboard/sales/orders">銷貨訂單</PanelLinkButton>} className={className}>
            <div className="-mt-1 mb-4 overflow-x-auto">
                <PillTabs options={ORDER_FILTERS} value={filter} onChange={setFilter} layoutId="order-filter" label="訂單狀態篩選" />
            </div>
            <div className="-mx-5 overflow-x-auto md:-mx-6">
                <table className="w-full min-w-xl text-left text-sm">
                    <thead>
                        <tr className="text-xs text-neutral-400 dark:text-neutral-500">
                            <th scope="col" className="px-5 pb-2 font-medium md:pl-6">單號</th>
                            <th scope="col" className="px-3 pb-2 font-medium">客戶</th>
                            <th scope="col" className="px-3 pb-2 font-medium">業務</th>
                            <th scope="col" className="px-3 pb-2 text-right font-medium">金額</th>
                            <th scope="col" className="px-5 pb-2 font-medium md:pr-6">狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence initial={false} mode="popLayout">
                            {visibleOrders.map((order, index) => {
                                const status = ORDER_STATUS_STYLES[order.status];
                                return (
                                    <motion.tr
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                        className="group border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                    >
                                        <td className="px-5 py-3 md:pl-6">
                                            <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                {order.id}
                                            </span>
                                            <span className="block text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">{order.date}</span>
                                        </td>
                                        <td className="max-w-56 truncate px-3 py-3 font-medium">{order.customer}</td>
                                        <td className="px-3 py-3 text-neutral-500 dark:text-neutral-400">{order.salesperson}</td>
                                        <td className="px-3 py-3 text-right font-semibold tabular-nums">{order.amount}</td>
                                        <td className="px-5 py-3 md:pr-6">
                                            <span className={cn('inline-flex items-center gap-2 text-xs font-medium whitespace-nowrap', status.text)}>
                                                <span className={cn('size-1.5 rounded-full shadow-[0_0_8px_1px]', status.dot)} />
                                                {order.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
                {visibleOrders.length === 0 && <p className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">沒有符合條件的訂單</p>}
            </div>
        </Panel>
    );
}
