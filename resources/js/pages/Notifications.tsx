import { Head } from '@inertiajs/react';
import { CheckCheck, SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ApprovalsPagination from '@/components/approvals/approvals-pagination';
import { Panel, PillTabs } from '@/components/dashboard/panel';
import NotificationDetail from '@/components/notifications/notification-detail';
import NotificationRow from '@/components/notifications/notification-row';
import NotificationSummary from '@/components/notifications/notification-summary';
import type { NotificationSummaryItem } from '@/components/notifications/notification-summary';
import type { Notification, NotificationFilter } from '@/components/notifications/notifications-data';
import { NOTIFICATION_FILTERS, NOTIFICATION_GROUPS, NOTIFICATION_KIND_STYLES, NOTIFICATIONS } from '@/components/notifications/notifications-data';
import NotificationsEmptyState from '@/components/notifications/notifications-empty-state';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const SEARCH_PLACEHOLDERS = ['請輸入通知標題', '請輸入單號', '請輸入通知內容'];

const PAGE_SIZE = 8;

function matchesFilter(notification: Notification, filter: NotificationFilter): boolean {
    if (filter === '全部') {
        return true;
    }

    if (filter === '未讀') {
        return !notification.isRead;
    }

    return NOTIFICATION_KIND_STYLES[notification.kind].label === filter;
}

export default function Notifications() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [filter, setFilter] = useState<NotificationFilter>('全部');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);

    const keyword = query.trim().toLowerCase();
    const visible = notifications.filter(
        (notification) =>
            matchesFilter(notification, filter) &&
            [notification.title, notification.body, notification.document ?? ''].some((field) => field.toLowerCase().includes(keyword)),
    );
    const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const pagedNotifications = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const active = notifications.find((notification) => notification.id === activeId);
    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    const open = useCallback((id: string) => {
        setActiveId(id);
        setNotifications((current) => current.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)));
    }, []);
    const closeDetail = useCallback(() => setActiveId(null), []);
    const toggleRead = useCallback((id: string) => {
        setNotifications((current) =>
            current.map((notification) => (notification.id === id ? { ...notification, isRead: !notification.isRead } : notification)),
        );
    }, []);
    const remove = useCallback((id: string) => {
        setActiveId(null);
        setNotifications((current) => current.filter((notification) => notification.id !== id));
    }, []);
    const markAllRead = () => setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));

    const summary: NotificationSummaryItem[] = [
        { label: '未讀', value: unreadCount, suffix: '則' },
        { label: '今日', value: notifications.filter((notification) => notification.group === '今天').length, suffix: '則' },
        {
            label: '待處理提醒',
            value: notifications.filter((notification) => notification.isActionRequired).length,
            suffix: '則',
            isAlert: true,
        },
        { label: '系統公告', value: notifications.filter((notification) => notification.kind === 'system').length, suffix: '則' },
    ];

    return (
        <>
            <Head title="通知中心" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <NotificationSummary items={summary} />

                <Panel
                    title="通知中心"
                    description={unreadCount > 0 ? `你有 ${unreadCount} 則未讀通知` : '所有通知都已讀取'}
                    action={
                        <button
                            type="button"
                            onClick={markAllRead}
                            disabled={unreadCount === 0}
                            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-black/8 transition hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-600 dark:text-neutral-300 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white dark:disabled:hover:text-neutral-300"
                        >
                            <CheckCheck className="size-3.5" />
                            全部標為已讀
                        </button>
                    }
                >
                    <div className="-mt-1 mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="overflow-x-auto">
                            <PillTabs
                                options={NOTIFICATION_FILTERS}
                                value={filter}
                                onChange={(nextFilter) => {
                                    setFilter(nextFilter);
                                    setPage(1);
                                }}
                                layoutId="notifications-filter-tab"
                                label="通知類型"
                            />
                        </div>
                        <PlaceholdersAndVanishInput
                            placeholders={SEARCH_PLACEHOLDERS}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            onSubmit={() => setQuery('')}
                            className="mx-0 h-10 w-full lg:ml-auto lg:max-w-64"
                        />
                    </div>

                    <ul className="-mx-5 md:-mx-6">
                        <AnimatePresence initial={false} mode="popLayout">
                            {NOTIFICATION_GROUPS.flatMap((group) => {
                                const groupNotifications = pagedNotifications.filter((notification) => notification.group === group);
                                if (groupNotifications.length === 0) {
                                    return [];
                                }

                                return [
                                    <motion.li
                                        key={`group-${group}`}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                        className="flex items-center gap-3 px-5 pt-4 pb-2 text-[11px] font-medium text-neutral-400 first:pt-0 md:px-6 dark:text-neutral-500"
                                    >
                                        <span>{group}</span>
                                        <span
                                            aria-hidden="true"
                                            className="flex-1 border-t border-dashed border-neutral-200 dark:border-neutral-800"
                                        />
                                        <span className="tabular-nums">{groupNotifications.length} 則</span>
                                    </motion.li>,
                                    ...groupNotifications.map((notification, index) => (
                                        <NotificationRow
                                            key={notification.id}
                                            notification={notification}
                                            index={index}
                                            hasDivider={index > 0}
                                            onOpen={open}
                                            onToggleRead={toggleRead}
                                            onDelete={remove}
                                        />
                                    )),
                                ];
                            })}
                        </AnimatePresence>
                    </ul>
                    {visible.length === 0 && notifications.length > 0 && (
                        <p className="flex flex-col items-center gap-2 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                            <SearchX className="size-6" />
                            找不到符合條件的通知
                        </p>
                    )}
                    {visible.length > 0 && (
                        <ApprovalsPagination
                            page={currentPage}
                            pageCount={pageCount}
                            pageSize={PAGE_SIZE}
                            total={visible.length}
                            onChange={setPage}
                        />
                    )}
                    {notifications.length === 0 && <NotificationsEmptyState />}
                </Panel>
            </div>

            <AnimatePresence>
                {active && <NotificationDetail key={active.id} notification={active} onClose={closeDetail} onDelete={remove} />}
            </AnimatePresence>
        </>
    );
}

Notifications.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
