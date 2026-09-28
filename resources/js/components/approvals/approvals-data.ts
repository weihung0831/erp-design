import type { LucideIcon } from 'lucide-react';
import { Receipt, ReceiptText, ShoppingCart } from 'lucide-react';
import type { ApprovalKind } from '@/components/dashboard/dashboard-data';

export type { ApprovalKind };

export type ApprovalPriority = 'normal' | 'urgent' | 'overdue';

export type ApprovalLineItem = {
    name: string;
    quantity: number;
    amount: number;
};

export type Approval = {
    id: string;
    kind: ApprovalKind;
    title: string;
    requester: string;
    department: string;
    amount: number;
    submittedAt: string;
    dueDate: string;
    priority: ApprovalPriority;
    note: string;
    lineItems: ApprovalLineItem[];
};

export const KIND_FILTERS = ['全部', '採購', '請款', '銷貨'] as const;

export type KindFilter = (typeof KIND_FILTERS)[number];

export const KIND_STYLES: Record<ApprovalKind, { label: Exclude<KindFilter, '全部'>; icon: LucideIcon; className: string; glow: string }> = {
    purchase: {
        label: '採購',
        icon: ShoppingCart,
        className: 'from-orange-400 to-orange-600 shadow-orange-500/30',
        glow: 'bg-orange-400/25',
    },
    expense: {
        label: '請款',
        icon: Receipt,
        className: 'from-violet-400 to-violet-600 shadow-violet-500/30',
        glow: 'bg-violet-400/25',
    },
    sales: {
        label: '銷貨',
        icon: ReceiptText,
        className: 'from-sky-400 to-sky-600 shadow-sky-500/30',
        glow: 'bg-sky-400/25',
    },
};

export const PRIORITY_STATUS_STYLES: Record<ApprovalPriority, { label: string; dot: string; text: string }> = {
    normal: { label: '一般', dot: 'bg-neutral-400 shadow-transparent', text: 'text-neutral-500 dark:text-neutral-400' },
    urgent: { label: '急件', dot: 'bg-amber-500 shadow-amber-500/60', text: 'text-amber-700 dark:text-amber-400' },
    overdue: { label: '逾期', dot: 'bg-rose-500 shadow-rose-500/60', text: 'text-rose-700 dark:text-rose-400' },
};

export function formatCurrency(amount: number): string {
    return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

export const APPROVALS: Approval[] = [
    {
        id: 'PO-2411',
        kind: 'purchase',
        title: '採購單・辦公耗材',
        requester: '林雅婷',
        department: '總務部',
        amount: 48200,
        submittedAt: '10 分鐘前',
        dueDate: '2026-10-02',
        priority: 'normal',
        note: '第四季辦公耗材統一採購，已比價三家廠商。',
        lineItems: [
            { name: 'A4 影印紙（箱）', quantity: 40, amount: 26000 },
            { name: '碳粉匣 HP 26A', quantity: 12, amount: 19200 },
            { name: '文具雜項', quantity: 1, amount: 3000 },
        ],
    },
    {
        id: 'EX-0932',
        kind: 'expense',
        title: '請款單・物流費用',
        requester: '陳志豪',
        department: '物流部',
        amount: 12650,
        submittedAt: '1 小時前',
        dueDate: '2026-09-29',
        priority: 'urgent',
        note: '九月份宅配與貨運費用，廠商要求月底前付款。',
        lineItems: [
            { name: '黑貓宅急便', quantity: 1, amount: 8450 },
            { name: '新竹貨運', quantity: 1, amount: 4200 },
        ],
    },
    {
        id: 'SO-1877',
        kind: 'sales',
        title: '銷貨折讓・大宏科技',
        requester: '張家瑜',
        department: '業務一部',
        amount: 6300,
        submittedAt: '3 小時前',
        dueDate: '2026-10-05',
        priority: 'normal',
        note: '出貨外箱破損，客戶同意以折讓方式處理。',
        lineItems: [{ name: '產品折讓 SKU-3310', quantity: 15, amount: 6300 }],
    },
    {
        id: 'PO-2408',
        kind: 'purchase',
        title: '採購單・包材補貨',
        requester: '林雅婷',
        department: '總務部',
        amount: 132000,
        submittedAt: '昨天',
        dueDate: '2026-09-26',
        priority: 'overdue',
        note: '包材庫存已低於安全水位，請盡速核准。',
        lineItems: [
            { name: '瓦楞紙箱 L 號', quantity: 2000, amount: 84000 },
            { name: '氣泡袋', quantity: 1200, amount: 36000 },
            { name: 'OPP 封箱膠帶', quantity: 300, amount: 12000 },
        ],
    },
    {
        id: 'EX-0929',
        kind: 'expense',
        title: '請款單・展場租金',
        requester: '黃冠宇',
        department: '行銷部',
        amount: 85000,
        submittedAt: '昨天',
        dueDate: '2026-09-30',
        priority: 'urgent',
        note: '台北國際電子展攤位租金尾款。',
        lineItems: [{ name: '攤位租金尾款', quantity: 1, amount: 85000 }],
    },
    {
        id: 'SO-1872',
        kind: 'sales',
        title: '特價申請・宏達電子',
        requester: '吳佩珊',
        department: '業務二部',
        amount: 245000,
        submittedAt: '2 天前',
        dueDate: '2026-10-08',
        priority: 'normal',
        note: '年度合約客戶追加訂單，申請 92 折優惠。',
        lineItems: [
            { name: '工業控制板 IC-200', quantity: 100, amount: 180000 },
            { name: '擴充模組 EX-12', quantity: 50, amount: 65000 },
        ],
    },
    {
        id: 'EX-0921',
        kind: 'expense',
        title: '請款單・員工差旅',
        requester: '李承翰',
        department: '業務一部',
        amount: 18420,
        submittedAt: '3 天前',
        dueDate: '2026-09-25',
        priority: 'overdue',
        note: '台中、高雄客戶拜訪差旅費。',
        lineItems: [
            { name: '高鐵車資', quantity: 4, amount: 9820 },
            { name: '住宿', quantity: 2, amount: 6400 },
            { name: '誤餐費', quantity: 1, amount: 2200 },
        ],
    },
    {
        id: 'PO-2399',
        kind: 'purchase',
        title: '採購單・伺服器擴充',
        requester: '周子傑',
        department: '資訊部',
        amount: 368000,
        submittedAt: '3 天前',
        dueDate: '2026-10-10',
        priority: 'normal',
        note: 'ERP 資料庫主機記憶體與硬碟擴充。',
        lineItems: [
            { name: '伺服器記憶體 64GB', quantity: 8, amount: 208000 },
            { name: 'SSD 3.84TB', quantity: 4, amount: 160000 },
        ],
    },
    {
        id: 'SO-1865',
        kind: 'sales',
        title: '退貨申請・永盛貿易',
        requester: '張家瑜',
        department: '業務一部',
        amount: 27500,
        submittedAt: '4 天前',
        dueDate: '2026-09-30',
        priority: 'urgent',
        note: '批號 B2409 規格不符，客戶申請整批退貨。',
        lineItems: [{ name: '感測器 SN-40', quantity: 50, amount: 27500 }],
    },
    {
        id: 'EX-0915',
        kind: 'expense',
        title: '請款單・軟體授權',
        requester: '周子傑',
        department: '資訊部',
        amount: 54000,
        submittedAt: '5 天前',
        dueDate: '2026-10-15',
        priority: 'normal',
        note: '設計部 Adobe 年度授權續約。',
        lineItems: [{ name: 'Adobe Creative Cloud 年約', quantity: 6, amount: 54000 }],
    },
];
