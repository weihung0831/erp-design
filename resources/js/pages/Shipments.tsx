import { Head } from '@inertiajs/react';
import { AlarmClock, CalendarClock, PackageCheck, SearchX, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalSummary from '@/components/approvals/approval-summary';
import type { SummaryItem } from '@/components/approvals/approval-summary';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import { StatusDot } from '@/components/sales/sales-shared';
import { TODAY } from '@/components/sales/sales-orders-data';
import ShipmentDetail from '@/components/sales/shipment-detail';
import type { ShipmentFilter } from '@/components/sales/shipments-data';
import {
    isShipmentDelayed,
    SHIPMENT_FILTERS,
    SHIPMENT_FLOW,
    SHIPMENT_STATUS_STYLES,
    shipmentQuantity,
    SHIPMENTS,
} from '@/components/sales/shipments-data';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const SEARCH_PLACEHOLDERS = ['請輸入出貨單號', '請輸入訂單號', '請輸入客戶名稱', '請輸入追蹤碼'];

const PAGE_SIZE = 6;

export default function Shipments() {
    const [shipments, setShipments] = useState(SHIPMENTS);
    const [statusFilter, setStatusFilter] = useState<ShipmentFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);

    const keyword = query.trim().toLowerCase();
    const visible = shipments.filter(
        (shipment) =>
            (statusFilter === '全部' || shipment.status === statusFilter) &&
            [shipment.id, shipment.orderId, shipment.customer, shipment.trackingNo ?? ''].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedShipments = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = shipments.find((shipment) => shipment.id === activeId);

    const closeDetail = useCallback(() => setActiveId(null), []);
    const advance = useCallback((id: string) => {
        setShipments((current) =>
            current.map((shipment) => {
                if (shipment.id !== id) {
                    return shipment;
                }
                const status = SHIPMENT_FLOW[SHIPMENT_FLOW.indexOf(shipment.status) + 1] ?? shipment.status;
                return { ...shipment, status, deliveredDate: status === '已送達' ? TODAY : shipment.deliveredDate };
            }),
        );
    }, []);

    const summary: SummaryItem[] = [
        { label: '本月出貨', value: shipments.length, suffix: '張', icon: Truck, tone: 'from-sky-400 to-sky-600 shadow-sky-500/30' },
        {
            label: '今日預定',
            value: shipments.filter((shipment) => shipment.scheduledDate === TODAY).length,
            suffix: '張',
            icon: CalendarClock,
            tone: 'from-[#6d8bff] to-[#4b6bfb] shadow-[#4b6bfb]/30',
        },
        {
            label: '已送達',
            value: shipments.filter((shipment) => shipment.status === '已送達').length,
            suffix: '張',
            icon: PackageCheck,
            tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
        },
        {
            label: '延遲出貨',
            value: shipments.filter(isShipmentDelayed).length,
            suffix: '張',
            isAlert: true,
            icon: AlarmClock,
            tone: 'from-rose-400 to-rose-600 shadow-rose-500/30',
        },
    ];

    return (
        <>
            <Head title="出貨單" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <ApprovalSummary items={summary} />

                <Panel title="出貨單" description="點選出貨單查看明細，推進揀貨、配送到送達">
                    <div className="-mt-1 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <PillTabs
                            options={SHIPMENT_FILTERS}
                            value={statusFilter}
                            onChange={(filter) => {
                                setStatusFilter(filter);
                                setPage(1);
                            }}
                            layoutId="shipments-status-tab"
                            label="出貨狀態"
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
                                        物流
                                    </th>
                                    <th scope="col" className="px-3 pb-2 text-right font-medium">
                                        數量
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        預定出貨
                                    </th>
                                    <th scope="col" className="px-5 pb-2 font-medium md:pr-6">
                                        狀態
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {pagedShipments.map((shipment, index) => {
                                        const isDelayed = isShipmentDelayed(shipment);
                                        return (
                                            <motion.tr
                                                key={shipment.id}
                                                layoutId={`shipment-card-${shipment.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                onClick={() => setActiveId(shipment.id)}
                                                className="group cursor-pointer border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                            >
                                                <td className="px-5 py-3 md:pl-6">
                                                    <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                        {shipment.id}
                                                    </span>
                                                    <span className="block font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                                                        {shipment.orderId}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveId(shipment.id);
                                                        }}
                                                        className="flex max-w-72 cursor-pointer items-center gap-2.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
                                                    >
                                                        <motion.span
                                                            layoutId={`shipment-icon-${shipment.id}`}
                                                            className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30"
                                                        >
                                                            <Truck className="size-3.5" />
                                                        </motion.span>
                                                        <motion.span layoutId={`shipment-title-${shipment.id}`} className="truncate font-medium">
                                                            {shipment.customer}
                                                        </motion.span>
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className="text-neutral-700 dark:text-neutral-200">{shipment.carrier}</span>
                                                    {shipment.trackingNo && (
                                                        <span className="block font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                                                            {shipment.trackingNo}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3 text-right font-semibold tabular-nums">
                                                    {shipmentQuantity(shipment).toLocaleString('zh-TW')}
                                                </td>
                                                <td
                                                    className={cn(
                                                        'px-3 py-3 tabular-nums',
                                                        isDelayed
                                                            ? 'font-medium text-rose-600 dark:text-rose-400'
                                                            : 'text-neutral-500 dark:text-neutral-400',
                                                    )}
                                                >
                                                    {shipment.scheduledDate}
                                                    {isDelayed && <span className="block text-[11px]">已延遲</span>}
                                                </td>
                                                <td className="px-5 py-3 text-xs md:pr-6">
                                                    <StatusDot label={shipment.status} style={SHIPMENT_STATUS_STYLES[shipment.status]} />
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
                                找不到符合條件的出貨單
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
                {active && <ShipmentDetail key={active.id} shipment={active} onClose={closeDetail} onAdvance={advance} />}
            </AnimatePresence>
        </>
    );
}

Shipments.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
