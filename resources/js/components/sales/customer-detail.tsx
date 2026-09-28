import { Link } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '@/components/approvals/approvals-data';
import { ORDER_STATUS_STYLES } from '@/components/dashboard/recent-orders';
import type { Customer } from '@/components/sales/customers-data';
import { CREDIT_LEVEL_STYLES, creditLevel, creditUsage, TIER_STYLES } from '@/components/sales/customers-data';
import { CurrencyHeadline, DetailCard, DetailFields, SECONDARY_BUTTON_CLASS, STATUS_BADGE_CLASS, StatusDot } from '@/components/sales/sales-shared';
import { orderAmount, SALES_ORDERS } from '@/components/sales/sales-orders-data';
import { cn } from '@/lib/utils';

const RECENT_ORDER_LIMIT = 4;

export function TierBadge({ customer }: { customer: Customer }) {
    return (
        <span
            className={cn(
                'inline-grid size-5 place-items-center rounded-md bg-linear-to-b text-[11px] font-bold text-white shadow-sm',
                TIER_STYLES[customer.tier],
            )}
            aria-label={`${customer.tier} 級客戶`}
        >
            {customer.tier}
        </span>
    );
}

export function CreditBar({ customer, className }: { customer: Customer; className?: string }) {
    const level = CREDIT_LEVEL_STYLES[creditLevel(customer)];

    return (
        <div
            role="meter"
            aria-label="信用額度使用率"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(creditUsage(customer) * 100)}
            className={cn('h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800', className)}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(creditUsage(customer), 1) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 24 }}
                className={cn('h-full rounded-full bg-linear-to-r', level.bar)}
            />
        </div>
    );
}

export default function CustomerDetail({ customer, onClose }: { customer: Customer; onClose: () => void }) {
    const level = creditLevel(customer);
    const levelStyle = CREDIT_LEVEL_STYLES[level];
    const recentOrders = SALES_ORDERS.filter((order) => order.customer === customer.name).slice(0, RECENT_ORDER_LIMIT);

    return (
        <DetailCard
            layoutPrefix="customer"
            id={customer.id}
            icon={Building2}
            title={customer.name}
            badges={
                <>
                    <TierBadge customer={customer} />
                    <span>{customer.industry}</span>
                    <span>往來自 {customer.since}</span>
                    {level !== 'normal' && (
                        <span className={cn(STATUS_BADGE_CLASS, level === 'over' ? 'bg-rose-500/10' : 'bg-amber-500/10', levelStyle.text)}>
                            {levelStyle.label}
                        </span>
                    )}
                </>
            }
            headline={{ label: '應收帳款', value: <CurrencyHeadline amount={customer.receivable} /> }}
            onClose={onClose}
            footer={
                <Link
                    href="/dashboard/sales/quotations"
                    className={cn(
                        SECONDARY_BUTTON_CLASS,
                        'bg-linear-to-b from-sky-400 to-(--admin-accent) text-white shadow-sm shadow-(--admin-accent)/30',
                    )}
                >
                    前往報價單 →
                </Link>
            }
        >
            <section aria-label="信用額度" className="rounded-2xl p-4 ring-1 ring-black/5 dark:ring-white/10">
                <div className="flex items-baseline justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">信用額度使用率</span>
                    <span className={cn('font-semibold tabular-nums', levelStyle.text)}>{Math.round(creditUsage(customer) * 100)}%</span>
                </div>
                <CreditBar customer={customer} className="mt-2 h-2" />
                <p className="mt-2 text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
                    已用 {formatCurrency(customer.receivable)} / 額度 {formatCurrency(customer.creditLimit)}
                </p>
            </section>

            <DetailFields
                fields={[
                    { label: '統一編號', value: <span className="font-mono">{customer.taxId}</span> },
                    { label: '聯絡人', value: customer.contact },
                    { label: '電話', value: customer.phone },
                    { label: 'Email', value: <span className="break-all">{customer.email}</span> },
                    { label: '業務', value: customer.salesperson },
                    { label: '付款條件', value: customer.paymentTerm },
                    { label: '地址', value: customer.address, isFullRow: true },
                ]}
            />

            <section aria-labelledby={`customer-orders-${customer.id}`}>
                <h3 id={`customer-orders-${customer.id}`} className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                    近期訂單
                </h3>
                {recentOrders.length === 0 ? (
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">尚無訂單</p>
                ) : (
                    <ul className="mt-1">
                        {recentOrders.map((order) => (
                            <li
                                key={order.id}
                                className="flex items-center gap-3 border-t border-dashed border-neutral-200 py-2.5 text-sm first:border-t-0 dark:border-neutral-800"
                            >
                                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{order.id}</span>
                                <span className="text-xs text-neutral-400 tabular-nums dark:text-neutral-500">{order.orderDate}</span>
                                <span className="ml-auto font-medium tabular-nums">{formatCurrency(orderAmount(order))}</span>
                                <span className="w-16 text-right text-xs">
                                    <StatusDot label={order.status} style={ORDER_STATUS_STYLES[order.status]} />
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </DetailCard>
    );
}
