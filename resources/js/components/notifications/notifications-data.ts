import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, Megaphone, PackageSearch, ShoppingBag } from 'lucide-react';

export type NotificationKind = 'approval' | 'inventory' | 'order' | 'system';

export type NotificationGroup = '今天' | '昨天' | '更早';

export type Notification = {
    id: string;
    kind: NotificationKind;
    title: string;
    body: string;
    group: NotificationGroup;
    time: string;
    relativeTime: string;
    document?: string;
    isRead: boolean;
    isActionRequired?: boolean;
};

export const NOTIFICATION_FILTERS = ['全部', '未讀', '簽核', '庫存', '訂單', '系統'] as const;

export type NotificationFilter = (typeof NOTIFICATION_FILTERS)[number];

export const NOTIFICATION_GROUPS: NotificationGroup[] = ['今天', '昨天', '更早'];

export const NOTIFICATION_KIND_STYLES: Record<
    NotificationKind,
    { label: Exclude<NotificationFilter, '全部' | '未讀'>; icon: LucideIcon; className: string; glow: string }
> = {
    approval: {
        label: '簽核',
        icon: ClipboardCheck,
        className: 'from-teal-400 to-teal-600 shadow-teal-500/30',
        glow: 'bg-teal-400/25',
    },
    inventory: {
        label: '庫存',
        icon: PackageSearch,
        className: 'from-amber-400 to-amber-600 shadow-amber-500/30',
        glow: 'bg-amber-400/25',
    },
    order: {
        label: '訂單',
        icon: ShoppingBag,
        className: 'from-sky-400 to-sky-600 shadow-sky-500/30',
        glow: 'bg-sky-400/25',
    },
    system: {
        label: '系統',
        icon: Megaphone,
        className: 'from-violet-400 to-violet-600 shadow-violet-500/30',
        glow: 'bg-violet-400/25',
    },
};

export const NOTIFICATIONS: Notification[] = [
    {
        id: 'N-1042',
        kind: 'approval',
        title: '採購單 PO-2411 等待你簽核',
        body: '陳怡君送出「伺服器機櫃與 UPS 採購」，金額 NT$ 486,000，已標記為急件，請於今日下班前完成簽核。',
        group: '今天',
        time: '09:42',
        relativeTime: '12 分鐘前',
        document: 'PO-2411',
        isRead: false,
        isActionRequired: true,
    },
    {
        id: 'N-1041',
        kind: 'inventory',
        title: 'A4 影印紙庫存低於安全存量',
        body: '台北總倉「A4 影印紙 80g」目前庫存 42 箱，低於安全存量 60 箱，建議盡快建立請購單補貨。',
        group: '今天',
        time: '09:15',
        relativeTime: '39 分鐘前',
        document: 'SKU-PA4-80',
        isRead: false,
        isActionRequired: true,
    },
    {
        id: 'N-1040',
        kind: 'order',
        title: '銷貨單 SO-8836 已出貨',
        body: '宏達精密的銷貨單 SO-8836 已由新竹倉出貨，物流單號 HCT-20931877，預計明日送達。',
        group: '今天',
        time: '08:50',
        relativeTime: '1 小時前',
        document: 'SO-8836',
        isRead: false,
    },
    {
        id: 'N-1039',
        kind: 'system',
        title: '系統將於週六凌晨進行例行維護',
        body: '本週六 02:00–04:00 將進行資料庫升級，期間 ERP 暫停服務，請提前儲存未完成的單據。',
        group: '今天',
        time: '08:00',
        relativeTime: '2 小時前',
        isRead: true,
    },
    {
        id: 'N-1038',
        kind: 'approval',
        title: '請款單 EX-0932 已被退回',
        body: '林志明退回你送出的「客戶拜訪差旅費」請款，原因：缺少高鐵票根，請補齊附件後重新送出。',
        group: '今天',
        time: '07:32',
        relativeTime: '2 小時前',
        document: 'EX-0932',
        isRead: false,
        isActionRequired: true,
    },
    {
        id: 'N-1037',
        kind: 'order',
        title: '新訂單 SO-8841 待確認',
        body: '永豐電子透過客戶入口網下單 12 項商品，金額 NT$ 128,500，請業務於 24 小時內確認交期。',
        group: '昨天',
        time: '17:26',
        relativeTime: '昨天 17:26',
        document: 'SO-8841',
        isRead: false,
        isActionRequired: true,
    },
    {
        id: 'N-1036',
        kind: 'inventory',
        title: '盤點差異報告已產生',
        body: '台中倉 9 月份循環盤點完成，共 3 項料號有差異，差異金額 NT$ 4,320，請倉管確認後調整。',
        group: '昨天',
        time: '15:10',
        relativeTime: '昨天 15:10',
        document: 'IC-2409',
        isRead: true,
    },
    {
        id: 'N-1035',
        kind: 'approval',
        title: '採購單 PO-2408 已核准',
        body: '王美玲已核准「辦公室網路設備汰換」採購單，系統已自動通知供應商並建立進貨排程。',
        group: '昨天',
        time: '11:48',
        relativeTime: '昨天 11:48',
        document: 'PO-2408',
        isRead: true,
    },
    {
        id: 'N-1034',
        kind: 'system',
        title: '你的密碼將於 7 天後到期',
        body: '依公司資安政策，密碼每 90 天需更新一次，請至個人設定變更密碼，以免影響登入。',
        group: '昨天',
        time: '09:00',
        relativeTime: '昨天 09:00',
        isRead: false,
    },
    {
        id: 'N-1033',
        kind: 'order',
        title: '客戶申請退貨 RMA-0217',
        body: '光寶科技針對 SO-8790 申請退貨 5 件，原因為外箱破損，請客服確認並安排取件。',
        group: '更早',
        time: '9/25 16:40',
        relativeTime: '3 天前',
        document: 'RMA-0217',
        isRead: true,
    },
    {
        id: 'N-1032',
        kind: 'inventory',
        title: '進貨單 GR-5521 已驗收入庫',
        body: '供應商聯華電材的 GR-5521 共 240 件已完成驗收，並入庫至桃園倉 B2 儲位。',
        group: '更早',
        time: '9/24 14:05',
        relativeTime: '4 天前',
        document: 'GR-5521',
        isRead: true,
    },
    {
        id: 'N-1031',
        kind: 'approval',
        title: '銷貨單 SO-8802 折扣超過權限',
        body: '業務張家豪為 SO-8802 設定 18% 折扣，超過一般權限 10%，需由主管簽核後才能出貨。',
        group: '更早',
        time: '9/23 10:22',
        relativeTime: '5 天前',
        document: 'SO-8802',
        isRead: true,
    },
    {
        id: 'N-1030',
        kind: 'system',
        title: '新功能上線：報表匯出支援 Excel',
        body: '所有報表現在都能直接匯出為 .xlsx 格式，並保留篩選條件與欄位排序，歡迎試用並提供回饋。',
        group: '更早',
        time: '9/22 09:30',
        relativeTime: '6 天前',
        isRead: true,
    },
    {
        id: 'N-1029',
        kind: 'order',
        title: '應收帳款逾期提醒',
        body: '鴻碩貿易的 3 張發票已逾期 30 天，未收金額 NT$ 215,800，請業務與財務協同催收。',
        group: '更早',
        time: '9/20 11:15',
        relativeTime: '8 天前',
        document: 'AR-1188',
        isRead: true,
    },
];
