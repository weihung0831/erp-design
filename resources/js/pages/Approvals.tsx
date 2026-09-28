import { Head } from '@inertiajs/react';
import { SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalDetail from '@/components/approvals/approval-detail';
import ApprovalSummary from '@/components/approvals/approval-summary';
import type { SummaryItem } from '@/components/approvals/approval-summary';
import type { KindFilter } from '@/components/approvals/approvals-data';
import { APPROVALS, formatCurrency, KIND_FILTERS, KIND_STYLES, PRIORITY_STATUS_STYLES } from '@/components/approvals/approvals-data';
import ApprovalsEmptyState from '@/components/approvals/approvals-empty-state';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const SEARCH_PLACEHOLDERS = ['請輸入單號', '請輸入申請人', '請輸入部門', '請輸入單據標題'];

const PAGE_SIZE = 5;

export default function Approvals() {
    const [remaining, setRemaining] = useState(APPROVALS);
    const [kindFilter, setKindFilter] = useState<KindFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);

    const keyword = query.trim().toLowerCase();
    const visible = remaining.filter(
        (approval) =>
            (kindFilter === '全部' || KIND_STYLES[approval.kind].label === kindFilter) &&
            [approval.id, approval.title, approval.requester, approval.department].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedApprovals = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = remaining.find((approval) => approval.id === activeId);

    const closeDetail = useCallback(() => setActiveId(null), []);
    const handle = useCallback((id: string) => {
        setActiveId(null);
        setRemaining((current) => current.filter((approval) => approval.id !== id));
    }, []);

    const summary: SummaryItem[] = [
        { label: '待簽核', value: remaining.length, suffix: '筆' },
        {
            label: '總金額',
            value: remaining.reduce((sum, approval) => sum + approval.amount, 0),
            prefix: 'NT$ ',
        },
        {
            label: '急件',
            value: remaining.filter((approval) => approval.priority === 'urgent').length,
            suffix: '筆',
        },
        {
            label: '逾期',
            value: remaining.filter((approval) => approval.priority === 'overdue').length,
            suffix: '筆',
            isAlert: true,
        },
    ];

    return (
        <>
            <Head title="待我簽核" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <ApprovalSummary items={summary} />

                <Panel title="待我簽核" description="點選單據查看明細，核准或退回">
                    <div className="-mt-1 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <PillTabs
                            options={KIND_FILTERS}
                            value={kindFilter}
                            onChange={(filter) => {
                                setKindFilter(filter);
                                setPage(1);
                            }}
                            layoutId="approvals-kind-tab"
                            label="單據類型"
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
                                        單據
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        申請人
                                    </th>
                                    <th scope="col" className="px-3 pb-2 text-right font-medium">
                                        金額
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        期限
                                    </th>
                                    <th scope="col" className="px-5 pb-2 font-medium md:pr-6">
                                        狀態
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {pagedApprovals.map((approval, index) => {
                                        const kind = KIND_STYLES[approval.kind];
                                        const status = PRIORITY_STATUS_STYLES[approval.priority];
                                        return (
                                            <motion.tr
                                                key={approval.id}
                                                layoutId={`card-${approval.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                                exit={{ opacity: 0, x: 24, transition: { duration: 0.25, ease: 'easeOut' } }}
                                                onClick={() => setActiveId(approval.id)}
                                                className="group cursor-pointer border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                            >
                                                <td className="px-5 py-3 md:pl-6">
                                                    <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                        {approval.id}
                                                    </span>
                                                    <span className="block text-[11px] text-neutral-400 tabular-nums dark:text-neutral-500">
                                                        {approval.submittedAt}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveId(approval.id);
                                                        }}
                                                        className="flex max-w-72 cursor-pointer items-center gap-2.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
                                                    >
                                                        <motion.span
                                                            layoutId={`icon-${approval.id}`}
                                                            className={`grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b text-white shadow-md ${kind.className}`}
                                                        >
                                                            <kind.icon className="size-3.5" />
                                                        </motion.span>
                                                        <motion.span layoutId={`title-${approval.id}`} className="truncate font-medium">
                                                            {approval.title}
                                                        </motion.span>
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className="text-neutral-700 dark:text-neutral-200">{approval.requester}</span>
                                                    <span className="block text-[11px] text-neutral-400 dark:text-neutral-500">
                                                        {approval.department}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-right font-semibold tabular-nums">{formatCurrency(approval.amount)}</td>
                                                <td className="px-3 py-3 text-neutral-500 tabular-nums dark:text-neutral-400">{approval.dueDate}</td>
                                                <td className="px-5 py-3 md:pr-6">
                                                    <span
                                                        className={cn(
                                                            'inline-flex items-center gap-2 text-xs font-medium whitespace-nowrap',
                                                            status.text,
                                                        )}
                                                    >
                                                        <span className={cn('size-1.5 rounded-full shadow-[0_0_8px_1px]', status.dot)} />
                                                        {status.label}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {visible.length === 0 && remaining.length > 0 && (
                            <p className="flex flex-col items-center gap-2 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                <SearchX className="size-6" />
                                找不到符合條件的單據
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
                    {remaining.length === 0 && <ApprovalsEmptyState />}
                </Panel>
            </div>

            <AnimatePresence>
                {active && <ApprovalDetail key={active.id} approval={active} onClose={closeDetail} onHandled={handle} />}
            </AnimatePresence>
        </>
    );
}

Approvals.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
