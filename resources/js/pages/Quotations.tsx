import { Head } from '@inertiajs/react';
import { AlarmClock, FileText, Handshake, SearchX, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalSummary from '@/components/approvals/approval-summary';
import type { SummaryItem } from '@/components/approvals/approval-summary';
import { formatCurrency } from '@/components/approvals/approvals-data';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import QuotationDetail, { VALIDITY_BADGES } from '@/components/sales/quotation-detail';
import QuotationForm from '@/components/sales/quotation-form';
import type { QuotationFormValues } from '@/components/sales/quotation-form';
import type { Quotation, QuotationFilter } from '@/components/sales/quotations-data';
import {
    isEditableQuotation,
    QUOTATION_FILTERS,
    QUOTATION_STATUS_STYLES,
    quotationAmount,
    quotationValidity,
    QUOTATIONS,
} from '@/components/sales/quotations-data';
import { CreateButton, RowActions, useIdSequence, useRecordForm } from '@/components/sales/sales-form';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const SEARCH_PLACEHOLDERS = ['請輸入報價單號', '請輸入客戶名稱', '請輸入業務姓名'];

const PAGE_SIZE = 6;

// ponytail: mock order numbering continues after the sales-orders mock data; the backend assigns real numbers.
const FIRST_NEW_ORDER_NUMBER = 1883;

export default function Quotations() {
    const [quotations, setQuotations] = useState(QUOTATIONS);
    const [statusFilter, setStatusFilter] = useState<QuotationFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);
    const nextOrderNumber = useRef(FIRST_NEW_ORDER_NUMBER);
    const nextQuotationId = useIdSequence('QT-', 943);
    const recordForm = useRecordForm(setActiveId);

    const keyword = query.trim().toLowerCase();
    const visible = quotations.filter(
        (quotation) =>
            (statusFilter === '全部' || quotation.status === statusFilter) &&
            [quotation.id, quotation.customer, quotation.salesperson].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedQuotations = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = quotations.find((quotation) => quotation.id === activeId);

    const closeDetail = useCallback(() => setActiveId(null), []);
    const update = useCallback((id: string, changes: Partial<Quotation>) => {
        setQuotations((current) => current.map((quotation) => (quotation.id === id ? { ...quotation, ...changes } : quotation)));
    }, []);
    const editing = quotations.find((quotation) => quotation.id === recordForm.editingId);
    const submitForm = (values: QuotationFormValues) => {
        if (editing) {
            update(editing.id, values);
            recordForm.finishForm(editing.id);

            return;
        }
        setQuotations((current) => [{ ...values, id: nextQuotationId(), status: '草稿' }, ...current]);
        setStatusFilter('全部');
        setPage(1);
        recordForm.finishForm(null);
    };
    const remove = useCallback((id: string) => {
        setQuotations((current) => current.filter((quotation) => quotation.id !== id));
        setActiveId(null);
    }, []);
    const convert = useCallback(
        (id: string) => {
            update(id, { convertedOrderId: `SO-${nextOrderNumber.current}` });
            nextOrderNumber.current += 1;
        },
        [update],
    );

    const acceptedCount = quotations.filter((quotation) => quotation.status === '已接受').length;
    const decidedCount = acceptedCount + quotations.filter((quotation) => quotation.status === '已婉拒').length;
    const summary: SummaryItem[] = [
        { label: '本月報價', value: quotations.length, suffix: '張', icon: FileText, tone: 'from-sky-400 to-sky-600 shadow-sky-500/30' },
        {
            label: '報價總額',
            value: quotations.reduce((sum, quotation) => sum + quotationAmount(quotation), 0),
            prefix: 'NT$ ',
            icon: Wallet,
            tone: 'from-[#6d8bff] to-[#4b6bfb] shadow-[#4b6bfb]/30',
        },
        {
            label: '成交率',
            value: decidedCount === 0 ? 0 : Math.round((acceptedCount / decidedCount) * 100),
            suffix: '%',
            icon: Handshake,
            tone: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
        },
        {
            label: '到期提醒',
            value: quotations.filter((quotation) => quotationValidity(quotation) !== 'valid').length,
            suffix: '張',
            isAlert: true,
            icon: AlarmClock,
            tone: 'from-rose-400 to-rose-600 shadow-rose-500/30',
        },
    ];

    return (
        <>
            <Head title="報價單" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <ApprovalSummary items={summary} />

                <Panel title="報價單" description="點選報價單查看明細，追蹤客戶回覆並轉成銷貨訂單">
                    <div className="-mt-1 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <PillTabs
                            options={QUOTATION_FILTERS}
                            value={statusFilter}
                            onChange={(filter) => {
                                setStatusFilter(filter);
                                setPage(1);
                            }}
                            layoutId="quotations-status-tab"
                            label="報價狀態"
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
                        <CreateButton label="新增報價單" onClick={recordForm.openCreate} />
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
                                        有效期限
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        狀態
                                    </th>
                                    <th scope="col" className="px-5 pb-2 text-right font-medium md:pr-6">
                                        <span className="sr-only">操作</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {pagedQuotations.map((quotation, index) => {
                                        const status = QUOTATION_STATUS_STYLES[quotation.status];
                                        const validity = quotationValidity(quotation);
                                        return (
                                            <motion.tr
                                                key={quotation.id}
                                                layoutId={`quotation-card-${quotation.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                onClick={() => setActiveId(quotation.id)}
                                                className="group cursor-pointer border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                            >
                                                <td className="px-5 py-3 md:pl-6">
                                                    <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                        {quotation.id}
                                                    </span>
                                                    <span className="block text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">
                                                        {quotation.issuedDate}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveId(quotation.id);
                                                        }}
                                                        className="flex max-w-72 cursor-pointer items-center gap-2.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
                                                    >
                                                        <motion.span
                                                            layoutId={`quotation-icon-${quotation.id}`}
                                                            className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30"
                                                        >
                                                            <FileText className="size-3.5" />
                                                        </motion.span>
                                                        <motion.span layoutId={`quotation-title-${quotation.id}`} className="truncate font-medium">
                                                            {quotation.customer}
                                                        </motion.span>
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3 text-neutral-700 dark:text-neutral-200">{quotation.salesperson}</td>
                                                <td className="px-3 py-3 text-right font-semibold tabular-nums">
                                                    {formatCurrency(quotationAmount(quotation))}
                                                </td>
                                                <td className="px-3 py-3 text-neutral-500 tabular-nums dark:text-neutral-400">
                                                    {quotation.validUntil}
                                                    {validity !== 'valid' && (
                                                        <span
                                                            className={cn(
                                                                'ml-2 rounded-full px-1.5 py-0.5 text-[11px] font-medium',
                                                                VALIDITY_BADGES[validity].className,
                                                            )}
                                                        >
                                                            {VALIDITY_BADGES[validity].label}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className={cn(
                                                            'inline-flex items-center gap-2 text-xs font-medium whitespace-nowrap',
                                                            status.text,
                                                        )}
                                                    >
                                                        <span className={cn('size-1.5 rounded-full shadow-[0_0_8px_1px]', status.dot)} />
                                                        {quotation.status}
                                                    </span>
                                                    {quotation.convertedOrderId && (
                                                        <span className="block font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                                                            → {quotation.convertedOrderId}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="w-24 px-5 py-3 md:pr-6">
                                                    {isEditableQuotation(quotation) && (
                                                        <RowActions id={quotation.id} onEdit={recordForm.openEdit} onDelete={remove} />
                                                    )}
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
                                找不到符合條件的報價單
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
                {active && (
                    <QuotationDetail
                        key={active.id}
                        quotation={active}
                        onClose={closeDetail}
                        onUpdate={update}
                        onConvert={convert}
                        onEdit={recordForm.openEditFromDetail}
                        onDelete={remove}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {recordForm.isFormOpen && (
                    <QuotationForm key={editing?.id ?? 'new'} quotation={editing} onClose={recordForm.closeForm} onSubmit={submitForm} />
                )}
            </AnimatePresence>
        </>
    );
}

Quotations.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
