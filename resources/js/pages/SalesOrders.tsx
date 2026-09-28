import { Head } from '@inertiajs/react';
import { AlarmClock, PackageOpen, ReceiptText, SearchX, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalSummary from '@/components/approvals/approval-summary';
import type { SummaryItem } from '@/components/approvals/approval-summary';
import { formatCurrency } from '@/components/approvals/approvals-data';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import type { OrderFilter } from '@/components/dashboard/recent-orders';
import { ORDER_FILTERS, ORDER_STATUS_STYLES } from '@/components/dashboard/recent-orders';
import SalesOrderDetail from '@/components/sales/sales-order-detail';
import { isDeliveryOverdue, ORDER_FLOW, orderAmount, SALES_ORDERS } from '@/components/sales/sales-orders-data';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const SEARCH_PLACEHOLDERS = ['請輸入訂單號', '請輸入客戶名稱', '請輸入業務姓名'];

const PAGE_SIZE = 6;

export default function SalesOrders() {
    const [orders, setOrders] = useState(SALES_ORDERS);
    const [statusFilter, setStatusFilter] = useState<OrderFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);

    const keyword = query.trim().toLowerCase();
    const visible = orders.filter(
        (order) =>
            (statusFilter === '全部' || order.status === statusFilter) &&
            [order.id, order.customer, order.salesperson].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedOrders = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = orders.find((order) => order.id === activeId);

    const closeDetail = useCallback(() => setActiveId(null), []);
    const advance = useCallback((id: string) => {
        setOrders((current) =>
            current.map((order) =>
                order.id === id
                    ? {
                          ...order,
                          status: ORDER_FLOW[ORDER_FLOW.indexOf(order.status) + 1] ?? order.status,
                      }
                    : order,
            ),
        );
    }, []);

    const openOrders = orders.filter((order) => order.status === '待確認' || order.status === '備貨中');
    const summary: SummaryItem[] = [
        {
            label: '本月訂單',
            value: orders.length,
            suffix: '筆',
            icon: ReceiptText,
            tone: 'from-sky-400 to-sky-600 shadow-sky-500/30',
        },
        {
            label: '訂單總額',
            value: orders.reduce((sum, order) => sum + orderAmount(order), 0),
            prefix: 'NT$ ',
            icon: Wallet,
            tone: 'from-[#6d8bff] to-[#4b6bfb] shadow-[#4b6bfb]/30',
        },
        {
            label: '待出貨',
            value: openOrders.length,
            suffix: '筆',
            icon: PackageOpen,
            tone: 'from-amber-400 to-amber-600 shadow-amber-500/30',
        },
        {
            label: '逾期未出貨',
            value: openOrders.filter(isDeliveryOverdue).length,
            suffix: '筆',
            isAlert: true,
            icon: AlarmClock,
            tone: 'from-rose-400 to-rose-600 shadow-rose-500/30',
        },
    ];

    return (
        <>
            <Head title="銷貨訂單" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <ApprovalSummary items={summary} />

                <Panel title="銷貨訂單" description="點選訂單查看明細並推進出貨流程">
                    <div className="-mt-1 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <PillTabs
                            options={ORDER_FILTERS}
                            value={statusFilter}
                            onChange={(filter) => {
                                setStatusFilter(filter);
                                setPage(1);
                            }}
                            layoutId="sales-orders-status-tab"
                            label="訂單狀態"
                        />
                        <PlaceholdersAndVanishInput
                            placeholders={SEARCH_PLACEHOLDERS}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            onSubmit={() => setQuery('')}
                            className="mx-0 h-10 w-full sm:ml-auto sm:max-w-64"
                        />
                    </div>

                    <div className="-mx-5 overflow-x-auto md:-mx-6">
                        <table className="w-full min-w-2xl text-left text-sm">
                            <thead>
                                <tr className="text-xs text-neutral-400 dark:text-neutral-500">
                                    <th scope="col" className="px-5 pb-2 font-medium md:pl-6">
                                        單號
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        客戶
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        業務
                                    </th>
                                    <th scope="col" className="px-3 pb-2 text-right font-medium">
                                        金額
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        交期
                                    </th>
                                    <th scope="col" className="px-5 pb-2 font-medium md:pr-6">
                                        狀態
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {pagedOrders.map((order, index) => {
                                        const status = ORDER_STATUS_STYLES[order.status];
                                        const isOverdue = isDeliveryOverdue(order);
                                        return (
                                            <motion.tr
                                                key={order.id}
                                                layoutId={`order-card-${order.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        delay: index * 0.03,
                                                    },
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 0.15,
                                                    },
                                                }}
                                                onClick={() => setActiveId(order.id)}
                                                className="group cursor-pointer border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                            >
                                                <td className="px-5 py-3 md:pl-6">
                                                    <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                        {order.id}
                                                    </span>
                                                    <span className="block text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">
                                                        {order.orderDate}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveId(order.id);
                                                        }}
                                                        className="flex max-w-72 cursor-pointer items-center gap-2.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
                                                    >
                                                        <motion.span
                                                            layoutId={`order-icon-${order.id}`}
                                                            className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30"
                                                        >
                                                            <ReceiptText className="size-3.5" />
                                                        </motion.span>
                                                        <motion.span layoutId={`order-title-${order.id}`} className="truncate font-medium">
                                                            {order.customer}
                                                        </motion.span>
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3 text-neutral-700 dark:text-neutral-200">{order.salesperson}</td>
                                                <td className="px-3 py-3 text-right font-semibold tabular-nums">
                                                    {formatCurrency(orderAmount(order))}
                                                </td>
                                                <td
                                                    className={cn(
                                                        'px-3 py-3 tabular-nums',
                                                        isOverdue
                                                            ? 'font-medium text-rose-600 dark:text-rose-400'
                                                            : 'text-neutral-500 dark:text-neutral-400',
                                                    )}
                                                >
                                                    {order.deliveryDate}
                                                    {isOverdue && <span className="block text-[11px]">已逾期</span>}
                                                </td>
                                                <td className="px-5 py-3 md:pr-6">
                                                    <span
                                                        className={cn(
                                                            'inline-flex items-center gap-2 text-xs font-medium whitespace-nowrap',
                                                            status.text,
                                                        )}
                                                    >
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
                        {visible.length === 0 && (
                            <p className="flex flex-col items-center gap-2 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                <SearchX className="size-6" />
                                找不到符合條件的訂單
                            </p>
                        )}
                    </div>
                    {visible.length > 0 && (
                        <ApprovalsPagination
                            page={currentPage}
                            pageCount={pageCount}
                            pageSize={PAGE_SIZE}
                            total={visible.length}
                            onChange={setPage}
                        />
                    )}
                </Panel>
            </div>

            <AnimatePresence>
                {active && <SalesOrderDetail key={active.id} order={active} onClose={closeDetail} onAdvance={advance} />}
            </AnimatePresence>
        </>
    );
}

SalesOrders.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
