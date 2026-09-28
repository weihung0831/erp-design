import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpenCheck,
    Boxes,
    ClipboardCheck,
    ClipboardList,
    Factory,
    FileSpreadsheet,
    FileText,
    Handshake,
    Landmark,
    LayoutDashboard,
    Menu,
    PackageCheck,
    PackageSearch,
    Receipt,
    ReceiptText,
    Settings,
    ShieldCheck,
    ShoppingCart,
    Store,
    Truck,
    UserRound,
    Users,
    Wallet,
    Warehouse,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { APPROVALS } from '@/components/approvals/approvals-data';
import BackToTop from '@/components/back-to-top';
import NotificationBell from '@/components/notifications/notification-bell';
import { NOTIFICATIONS } from '@/components/notifications/notifications-data';
import ThemeToggle from '@/components/theme-toggle';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import {
    SidebarBody,
    SidebarGroupSection,
    SidebarLabel,
    SidebarLink,
    SidebarProvider,
    usePersistentState,
    useSidebar,
} from '@/components/ui/grouped-sidebar';
import type { SidebarGroupItem, SidebarLinkItem } from '@/components/ui/grouped-sidebar';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { HubGlyph } from '@/components/welcome/module-hub-hero';

// ponytail: counts come from the pages' mock data and won't follow in-page approve/read actions; switch to Inertia shared props once the backend exists.
const PENDING_APPROVAL_COUNT = APPROVALS.length;
const UNREAD_NOTIFICATION_COUNT = NOTIFICATIONS.filter((notification) => !notification.isRead).length;

const PRIMARY_LINKS: SidebarLinkItem[] = [
    { label: '儀表板', href: '/dashboard', icon: <LayoutDashboard />, tone: 'from-[#6d8bff] to-[#4b6bfb]' },
    { label: '待我簽核', href: '/dashboard/approvals', icon: <ClipboardCheck />, badge: PENDING_APPROVAL_COUNT || undefined, tone: 'from-teal-400 to-teal-600' },
    { label: '通知中心', href: '/dashboard/notifications', icon: <Bell />, badge: UNREAD_NOTIFICATION_COUNT || undefined, tone: 'from-pink-400 to-pink-600' },
];

const MODULE_GROUPS: SidebarGroupItem[] = [
    {
        id: 'sales',
        label: '銷售管理',
        icon: <Store />,
        tone: 'from-sky-400 to-sky-600',
        accent: 'text-sky-500',
        links: [
            { label: '報價單', icon: <FileText /> },
            { label: '銷貨訂單', icon: <ReceiptText /> },
            { label: '出貨單', icon: <Truck /> },
            { label: '客戶資料', icon: <Handshake /> },
        ],
    },
    {
        id: 'purchase',
        label: '採購管理',
        icon: <ShoppingCart />,
        tone: 'from-orange-400 to-orange-600',
        accent: 'text-orange-500',
        links: [
            { label: '請購單', icon: <ClipboardList /> },
            { label: '採購單', icon: <Receipt /> },
            { label: '進貨驗收', icon: <PackageCheck /> },
            { label: '供應商', icon: <Users /> },
        ],
    },
    {
        id: 'inventory',
        label: '庫存管理',
        icon: <Warehouse />,
        tone: 'from-amber-400 to-amber-600',
        accent: 'text-amber-500',
        links: [
            { label: '商品料號', icon: <Boxes /> },
            { label: '庫存查詢', icon: <PackageSearch /> },
            { label: '調撥與盤點', icon: <ClipboardCheck /> },
        ],
    },
    {
        id: 'finance',
        label: '財務會計',
        icon: <Landmark />,
        tone: 'from-emerald-400 to-emerald-600',
        accent: 'text-emerald-500',
        links: [
            { label: '應收帳款', icon: <Wallet /> },
            { label: '應付帳款', icon: <Receipt /> },
            { label: '會計傳票', icon: <BookOpenCheck /> },
            { label: '財務報表', icon: <FileSpreadsheet /> },
        ],
    },
    {
        id: 'production',
        label: '生產管理',
        icon: <Factory />,
        tone: 'from-rose-400 to-rose-600',
        accent: 'text-rose-500',
        links: [
            { label: '製令工單', icon: <ClipboardList /> },
            { label: '生產排程', icon: <Factory /> },
        ],
    },
    {
        id: 'hr',
        label: '人事薪資',
        icon: <UserRound />,
        tone: 'from-violet-400 to-violet-600',
        accent: 'text-violet-500',
        links: [
            { label: '員工資料', icon: <Users /> },
            { label: '出勤管理', icon: <ClipboardCheck /> },
            { label: '薪資作業', icon: <Wallet /> },
        ],
    },
    {
        id: 'settings',
        label: '系統設定',
        icon: <Settings />,
        tone: 'from-indigo-400 to-indigo-600',
        accent: 'text-indigo-500',
        links: [
            { label: '公司資料', icon: <Store /> },
            { label: '使用者與權限', icon: <ShieldCheck /> },
        ],
    },
];

const DEFAULT_EXPANDED_GROUPS: Record<string, boolean> = {
    sales: true,
    purchase: false,
    inventory: false,
    finance: false,
    production: false,
    hr: false,
    settings: false,
};

const ONLINE_TEAMMATES = [
    { id: 1, name: '林雅婷', designation: '採購專員', initial: '林', color: '#f97316' },
    { id: 2, name: '陳志豪', designation: '倉儲主管', initial: '陳', color: '#8b5cf6' },
    { id: 3, name: '張家瑜', designation: '業務經理', initial: '張', color: '#0ea5e9' },
    { id: 4, name: '吳佩珊', designation: '會計', initial: '吳', color: '#ec4899' },
];

const SEARCH_PLACEHOLDERS = ['請輸入銷貨單號', '請輸入客戶名稱', '請輸入料號', '請輸入採購單號', '請輸入員工或供應商名稱'];

function withActiveState(link: SidebarLinkItem, currentPath: string): SidebarLinkItem {
    return { ...link, isActive: link.href !== undefined && (link.href === '/dashboard' ? currentPath === link.href : currentPath.startsWith(link.href)) };
}

function SidebarBrand() {
    return (
        <Link href="/dashboard" className="relative z-20 flex items-center gap-2.5 px-1.5 py-1">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-b from-[#6d8bff] to-(--admin-accent) shadow-[0_4px_12px_-2px] shadow-(--admin-accent)/60 ring-1 ring-white/20 ring-inset">
                <HubGlyph className="size-4" />
            </span>
            <SidebarLabel className="text-sm font-semibold text-neutral-900 dark:text-white">ERP Design</SidebarLabel>
        </Link>
    );
}

function SidebarUser() {
    return (
        <div className="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5">
            <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-b from-emerald-400 to-emerald-600 text-xs font-medium text-white shadow-sm ring-2 ring-white dark:ring-neutral-900">
                王
                <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-(--admin-canvas) dark:ring-neutral-950" />
            </span>
            <SidebarLabel>
                <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">王小明</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">財務主管</span>
                </span>
            </SidebarLabel>
        </div>
    );
}

function SectionLabel({ children }: { children: string }) {
    return (
        <div className="h-6 px-2.5">
            <SidebarLabel className="text-[11px] font-medium tracking-wider text-neutral-400 dark:text-neutral-500">{children}</SidebarLabel>
        </div>
    );
}

function AdminSidebar() {
    const { url } = usePage();
    const [expandedGroups, setExpandedGroups] = usePersistentState('erp-sidebar-groups', DEFAULT_EXPANDED_GROUPS);

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((previous) => ({ ...previous, [groupId]: !previous[groupId] }));
    };

    return (
        <SidebarBody className="justify-between gap-4">
            <div className="-mx-3 flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto px-3">
                <SidebarBrand />
                <nav aria-label="主選單" className="mt-7 flex flex-col gap-0.5">
                    <SectionLabel>總覽</SectionLabel>
                    {PRIMARY_LINKS.map((link) => (
                        <SidebarLink key={link.label} link={withActiveState(link, url)} />
                    ))}
                </nav>
                <nav aria-label="功能模組" className="mt-6 flex flex-col gap-0.5">
                    <SectionLabel>功能模組</SectionLabel>
                    {MODULE_GROUPS.map((group) => (
                        <SidebarGroupSection
                            key={group.id}
                            group={{ ...group, links: group.links.map((link) => withActiveState(link, url)) }}
                            expanded={expandedGroups[group.id] ?? false}
                            onToggle={() => toggleGroup(group.id)}
                        />
                    ))}
                </nav>
            </div>
            <SidebarUser />
        </SidebarBody>
    );
}

function AdminHeader() {
    const { setMobileOpen } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-neutral-200/70 bg-white/85 px-4 py-3 backdrop-blur-md md:px-8 dark:border-neutral-800/70 dark:bg-neutral-900/85">
            <button
                type="button"
                aria-label="開啟選單"
                onClick={() => setMobileOpen(true)}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-neutral-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:hidden dark:bg-zinc-800 dark:text-neutral-200"
            >
                <Menu className="size-4.5" />
            </button>
            <PlaceholdersAndVanishInput
                placeholders={SEARCH_PLACEHOLDERS}
                onChange={() => undefined}
                onSubmit={() => undefined}
                className="mx-0 h-10 max-w-md min-w-0 flex-1"
            />
            <div className="ml-auto flex items-center gap-3">
                <div className="hidden items-center pr-2 lg:flex">
                    <AnimatedTooltip items={ONLINE_TEAMMATES} />
                    <span className="ml-4 text-xs text-neutral-500 dark:text-neutral-400">4 人在線</span>
                </div>
                <NotificationBell />
                <ThemeToggle />
            </div>
        </header>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <SidebarProvider>
            <div className="flex h-dvh w-full overflow-hidden bg-(--admin-canvas) text-neutral-900 antialiased [--admin-canvas:#f5f7ff] [--hub-card:#ffffff] dark:[--hub-card:#171717] [--admin-accent-ink:#3b57d9] [--admin-accent:#4b6bfb] [--hub-ink:#1a1a1a] dark:bg-neutral-950 dark:text-neutral-100 dark:[--admin-accent-ink:#8aa0ff] dark:[--hub-ink:#f4f4f0]">
                <AdminSidebar />
                <div
                    ref={scrollContainerRef}
                    className="relative flex min-w-0 flex-1 flex-col overflow-y-auto bg-white md:mt-2 md:rounded-tl-2xl md:border-t md:border-l md:border-[#e3e8fc] md:shadow-[0_8px_40px_-16px_rgba(75,107,251,0.16)] dark:bg-neutral-900 dark:md:shadow-none dark:md:border-neutral-800"
                >
                    <AdminHeader />
                    <main className="relative flex-1 px-4 pt-6 pb-32 md:px-8">{children}</main>
                </div>
                <BackToTop containerRef={scrollContainerRef} className="bottom-24 sm:bottom-24 md:right-8 md:bottom-8" />
            </div>
        </SidebarProvider>
    );
}
