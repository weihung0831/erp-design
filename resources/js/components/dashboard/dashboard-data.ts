export type KpiIcon = 'revenue' | 'margin' | 'receivable' | 'inventory';

export type Kpi = {
    label: string;
    icon: KpiIcon;
    prefix?: string;
    value: number;
    decimals: number;
    suffix: string;
    delta: string;
    isPositive: boolean;
    caption: string;
    pattern: number[][];
};

export const KPIS: Kpi[] = [
    {
        label: '本月營收',
        icon: 'revenue',
        prefix: 'NT$ ',
        value: 12.48,
        decimals: 2,
        suffix: 'M',
        delta: '+12.4%',
        isPositive: true,
        caption: '較上月',
        pattern: [[9, 2], [8, 5], [10, 1], [7, 3], [9, 6]],
    },
    {
        label: '毛利率',
        icon: 'margin',
        value: 32.6,
        decimals: 1,
        suffix: '%',
        delta: '+1.8 pt',
        isPositive: true,
        caption: '較上月',
        pattern: [[7, 1], [10, 4], [8, 6], [9, 3], [7, 5]],
    },
    {
        label: '應收帳款',
        icon: 'receivable',
        prefix: 'NT$ ',
        value: 4.36,
        decimals: 2,
        suffix: 'M',
        delta: '+4.2%',
        isPositive: false,
        caption: '逾 30 天 NT$ 860K',
        pattern: [[8, 2], [10, 5], [7, 4], [9, 1], [8, 6]],
    },
    {
        label: '庫存周轉天數',
        icon: 'inventory',
        value: 41,
        decimals: 0,
        suffix: ' 天',
        delta: '-3 天',
        isPositive: true,
        caption: '較上月',
        pattern: [[10, 2], [7, 6], [9, 4], [8, 1], [10, 5]],
    },
];

export type MonthlyRevenue = { month: string; value: number };

export const MONTHLY_REVENUE: MonthlyRevenue[] = [
    { month: '10月', value: 8.2 },
    { month: '11月', value: 8.9 },
    { month: '12月', value: 10.4 },
    { month: '1月', value: 7.6 },
    { month: '2月', value: 7.1 },
    { month: '3月', value: 9.3 },
    { month: '4月', value: 9.8 },
    { month: '5月', value: 10.1 },
    { month: '6月', value: 10.9 },
    { month: '7月', value: 11.2 },
    { month: '8月', value: 11.1 },
    { month: '9月', value: 12.48 },
];

export type ApprovalKind = 'purchase' | 'expense' | 'sales';

export type PendingApproval = {
    id: string;
    kind: ApprovalKind;
    title: string;
    requester: string;
    amount: string;
    submittedAt: string;
};

export const PENDING_APPROVALS: PendingApproval[] = [
    { id: 'PO-2411', kind: 'purchase', title: '採購單・辦公耗材', requester: '林雅婷', amount: 'NT$ 48,200', submittedAt: '10 分鐘前' },
    { id: 'EX-0932', kind: 'expense', title: '請款單・物流費用', requester: '陳志豪', amount: 'NT$ 12,650', submittedAt: '1 小時前' },
    { id: 'SO-1877', kind: 'sales', title: '銷貨折讓・大宏科技', requester: '張家瑜', amount: 'NT$ 6,300', submittedAt: '3 小時前' },
    { id: 'PO-2408', kind: 'purchase', title: '採購單・包材補貨', requester: '林雅婷', amount: 'NT$ 132,000', submittedAt: '昨天' },
    { id: 'EX-0929', kind: 'expense', title: '請款單・展場租金', requester: '黃冠宇', amount: 'NT$ 85,000', submittedAt: '昨天' },
];

export type OrderStatus = '待確認' | '備貨中' | '已出貨' | '已結案';

export type RecentOrder = {
    id: string;
    customer: string;
    salesperson: string;
    date: string;
    amount: string;
    status: OrderStatus;
};

export const RECENT_ORDERS: RecentOrder[] = [
    { id: 'SO-1882', customer: '大宏科技股份有限公司', salesperson: '張家瑜', date: '09/27', amount: 'NT$ 326,000', status: '已出貨' },
    { id: 'SO-1881', customer: '晴川貿易', salesperson: '李承翰', date: '09/27', amount: 'NT$ 118,400', status: '備貨中' },
    { id: 'SO-1880', customer: '青禾食品', salesperson: '張家瑜', date: '09/26', amount: 'NT$ 92,750', status: '已出貨' },
    { id: 'SO-1879', customer: '北辰精密工業', salesperson: '吳佩珊', date: '09/26', amount: 'NT$ 458,300', status: '待確認' },
    { id: 'SO-1878', customer: '森悅家居', salesperson: '李承翰', date: '09/25', amount: 'NT$ 64,900', status: '已結案' },
    { id: 'SO-1876', customer: '宏遠物流', salesperson: '吳佩珊', date: '09/25', amount: 'NT$ 211,600', status: '備貨中' },
];

export type StockLevel = 'critical' | 'warning';

export type StockAlert = {
    sku: string;
    item: string;
    quantity: number;
    safetyStock: number;
    level: StockLevel;
};

export const STOCK_ALERTS: StockAlert[] = [
    { sku: 'PK-0012', item: '紙箱（大）', quantity: 8, safetyStock: 120, level: 'critical' },
    { sku: 'EQ-0301', item: '封箱機', quantity: 3, safetyStock: 10, level: 'critical' },
    { sku: 'OF-0147', item: '碳粉匣 HP 58A', quantity: 36, safetyStock: 60, level: 'warning' },
    { sku: 'PK-0031', item: '氣泡袋 30×40', quantity: 410, safetyStock: 600, level: 'warning' },
];

export type ReceivableBucket = { label: string; amount: number };

export const RECEIVABLE_AGING: ReceivableBucket[] = [
    { label: '未到期', amount: 2.46 },
    { label: '1–30 天', amount: 1.04 },
    { label: '31–60 天', amount: 0.52 },
    { label: '61–90 天', amount: 0.22 },
    { label: '90 天以上', amount: 0.12 },
];

export type ShipmentDayStatus = 'onTime' | 'minorDelay' | 'delayed' | 'missed';

export type ShipmentDay = {
    date: string;
    status: ShipmentDayStatus;
    rate: string;
    delayedOrders: number;
};

const SHIPMENT_PATTERN: ShipmentDayStatus[] = [
    'onTime', 'onTime', 'onTime', 'minorDelay', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime',
    'onTime', 'delayed', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime', 'minorDelay', 'onTime',
    'onTime', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime', 'missed', 'onTime', 'onTime',
    'onTime', 'onTime', 'minorDelay', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime',
    'onTime', 'delayed', 'onTime', 'onTime', 'onTime', 'onTime', 'onTime', 'minorDelay', 'onTime',
];

const SHIPMENT_RATES: Record<ShipmentDayStatus, string> = {
    onTime: '100%',
    minorDelay: '97.8%',
    delayed: '91.4%',
    missed: '84.2%',
};

const SHIPMENT_DELAYS: Record<ShipmentDayStatus, number> = {
    onTime: 0,
    minorDelay: 1,
    delayed: 3,
    missed: 6,
};

export const SHIPMENT_HISTORY: ShipmentDay[] = SHIPMENT_PATTERN.map((status, index) => {
    const date = new Date(2026, 8, 27 - (SHIPMENT_PATTERN.length - 1 - index));
    return {
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        status,
        rate: SHIPMENT_RATES[status],
        delayedOrders: SHIPMENT_DELAYS[status],
    };
});
