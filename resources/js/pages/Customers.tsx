import { Head } from '@inertiajs/react';
import { Building2, Crown, SearchX, ShieldAlert, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalSummary from '@/components/approvals/approval-summary';
import type { SummaryItem } from '@/components/approvals/approval-summary';
import { formatCurrency } from '@/components/approvals/approvals-data';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import CustomerDetail, { CreditBar, TierBadge } from '@/components/sales/customer-detail';
import type { Customer, CustomerFilter } from '@/components/sales/customers-data';
import { CREDIT_LEVEL_STYLES, CUSTOMER_FILTERS, CUSTOMERS, creditLevel, creditUsage } from '@/components/sales/customers-data';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { cn } from '@/lib/utils';

const SEARCH_PLACEHOLDERS = ['請輸入客戶名稱', '請輸入客戶編號', '請輸入統一編號', '請輸入業務姓名'];

const PAGE_SIZE = 6;

function matchesFilter(customer: Customer, filter: CustomerFilter): boolean {
    if (filter === '全部') {
        return true;
    }
    if (filter === '額度警示') {
        return creditLevel(customer) !== 'normal';
    }

    return filter === `${customer.tier} 級`;
}

export default function Customers() {
    const [filter, setFilter] = useState<CustomerFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);

    const keyword = query.trim().toLowerCase();
    const visible = CUSTOMERS.filter(
        (customer) =>
            matchesFilter(customer, filter) &&
            [customer.id, customer.name, customer.taxId, customer.salesperson].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedCustomers = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = CUSTOMERS.find((customer) => customer.id === activeId);

    const closeDetail = useCallback(() => setActiveId(null), []);

    const summary: SummaryItem[] = [
        { label: '往來客戶', value: CUSTOMERS.length, suffix: '家', icon: Building2, tone: 'from-sky-400 to-sky-600 shadow-sky-500/30' },
        {
            label: 'A 級客戶',
            value: CUSTOMERS.filter((customer) => customer.tier === 'A').length,
            suffix: '家',
            icon: Crown,
            tone: 'from-amber-400 to-amber-600 shadow-amber-500/30',
        },
        {
            label: '應收總額',
            value: CUSTOMERS.reduce((sum, customer) => sum + customer.receivable, 0),
            prefix: 'NT$ ',
            icon: Wallet,
            tone: 'from-[#6d8bff] to-[#4b6bfb] shadow-[#4b6bfb]/30',
        },
        {
            label: '額度警示',
            value: CUSTOMERS.filter((customer) => creditLevel(customer) !== 'normal').length,
            suffix: '家',
            isAlert: true,
            icon: ShieldAlert,
            tone: 'from-rose-400 to-rose-600 shadow-rose-500/30',
        },
    ];

    return (
        <>
            <Head title="客戶資料" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <ApprovalSummary items={summary} />

                <Panel title="客戶資料" description="點選客戶查看聯絡資訊、信用額度與近期訂單">
                    <div className="-mt-1 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <PillTabs
                            options={CUSTOMER_FILTERS}
                            value={filter}
                            onChange={(nextFilter) => {
                                setFilter(nextFilter);
                                setPage(1);
                            }}
                            layoutId="customers-filter-tab"
                            label="客戶篩選"
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
                                        編號
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        客戶
                                    </th>
                                    <th scope="col" className="px-3 pb-2 font-medium">
                                        業務
                                    </th>
                                    <th scope="col" className="px-3 pb-2 text-right font-medium">
                                        應收帳款
                                    </th>
                                    <th scope="col" className="w-48 px-5 pb-2 font-medium md:pr-6">
                                        信用額度
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false} mode="popLayout">
                                    {pagedCustomers.map((customer, index) => {
                                        const levelStyle = CREDIT_LEVEL_STYLES[creditLevel(customer)];
                                        return (
                                            <motion.tr
                                                key={customer.id}
                                                layoutId={`customer-card-${customer.id}`}
                                                layout
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                onClick={() => setActiveId(customer.id)}
                                                className="group cursor-pointer border-t border-dashed border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                                            >
                                                <td className="px-5 py-3 md:pl-6">
                                                    <span className="font-mono text-xs font-medium text-neutral-500 transition-colors group-hover:text-(--admin-accent-ink) dark:text-neutral-400">
                                                        {customer.id}
                                                    </span>
                                                    <span className="block text-[11px] text-neutral-400 dark:text-neutral-500">
                                                        {customer.industry}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setActiveId(customer.id);
                                                        }}
                                                        className="flex max-w-80 cursor-pointer items-center gap-2.5 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)"
                                                    >
                                                        <motion.span
                                                            layoutId={`customer-icon-${customer.id}`}
                                                            className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30"
                                                        >
                                                            <Building2 className="size-3.5" />
                                                        </motion.span>
                                                        <motion.span layoutId={`customer-title-${customer.id}`} className="truncate font-medium">
                                                            {customer.name}
                                                        </motion.span>
                                                        <TierBadge customer={customer} />
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3 text-neutral-700 dark:text-neutral-200">{customer.salesperson}</td>
                                                <td className="px-3 py-3 text-right font-semibold tabular-nums">
                                                    {formatCurrency(customer.receivable)}
                                                </td>
                                                <td className="px-5 py-3 md:pr-6">
                                                    <CreditBar customer={customer} />
                                                    <span className={cn('mt-1 flex justify-between text-[11px] tabular-nums', levelStyle.text)}>
                                                        <span>{levelStyle.label}</span>
                                                        <span>{Math.round(creditUsage(customer) * 100)}%</span>
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
                                找不到符合條件的客戶
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

            <AnimatePresence>{active && <CustomerDetail key={active.id} customer={active} onClose={closeDetail} />}</AnimatePresence>
        </>
    );
}

Customers.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
