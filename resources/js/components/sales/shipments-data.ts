import type { SalesOrderLineItem } from '@/components/sales/sales-orders-data';
import { TODAY } from '@/components/sales/sales-orders-data';

export type ShipmentStatus = '待揀貨' | '揀貨中' | '配送中' | '已送達';

export type Shipment = {
    id: string;
    orderId: string;
    customer: string;
    address: string;
    receiver: string;
    carrier: string;
    trackingNo?: string;
    scheduledDate: string;
    deliveredDate?: string;
    status: ShipmentStatus;
    note: string;
    lineItems: SalesOrderLineItem[];
};

/** Shipment lifecycle, in order. Each status advances to the next one. */
export const SHIPMENT_FLOW: ShipmentStatus[] = ['待揀貨', '揀貨中', '配送中', '已送達'];

export const SHIPMENT_FILTERS = ['全部', ...SHIPMENT_FLOW] as const;

export type ShipmentFilter = (typeof SHIPMENT_FILTERS)[number];

export const SHIPMENT_NEXT_STEP_LABELS: Partial<Record<ShipmentStatus, string>> = {
    待揀貨: '開始揀貨',
    揀貨中: '出車配送',
    配送中: '確認送達',
};

export const SHIPMENT_STATUS_STYLES: Record<ShipmentStatus, { dot: string; text: string }> = {
    待揀貨: { dot: 'bg-amber-500 shadow-amber-500/60', text: 'text-amber-700 dark:text-amber-400' },
    揀貨中: { dot: 'bg-violet-500 shadow-violet-500/60', text: 'text-violet-700 dark:text-violet-400' },
    配送中: { dot: 'bg-(--admin-accent) shadow-(--admin-accent)/60', text: 'text-(--admin-accent-ink)' },
    已送達: { dot: 'bg-emerald-500 shadow-emerald-500/60', text: 'text-emerald-700 dark:text-emerald-400' },
};

export function isShipmentDelayed(shipment: Shipment): boolean {
    return shipment.status !== '已送達' && shipment.scheduledDate < TODAY;
}

export function shipmentQuantity(shipment: Shipment): number {
    return shipment.lineItems.reduce((sum, item) => sum + item.quantity, 0);
}

export const SHIPMENTS: Shipment[] = [
    {
        id: 'SH-0561',
        orderId: 'SO-1881',
        customer: '晴川貿易',
        address: '台中市西屯區工業區一路 88 號',
        receiver: '陳小姐 04-2258-1020',
        carrier: '新竹物流',
        scheduledDate: '2026-10-03',
        status: '待揀貨',
        note: '附原廠保固卡，禮盒需另外封箱。',
        lineItems: [
            { sku: 'PK-0104', name: '不鏽鋼保溫瓶 500ml', quantity: 400, unitPrice: 236 },
            { sku: 'PK-0107', name: '禮盒包裝', quantity: 400, unitPrice: 60 },
        ],
    },
    {
        id: 'SH-0560',
        orderId: 'SO-1876',
        customer: '宏遠物流',
        address: '新北市五股區五工路 120 號',
        receiver: '許主任 02-8791-4400',
        carrier: '自有車隊',
        scheduledDate: '2026-09-26',
        status: '揀貨中',
        note: 'PK-0012 缺料，先出掃描器，交換器待進貨後補出。',
        lineItems: [{ sku: 'PK-0520', name: '手持條碼掃描器', quantity: 20, unitPrice: 2900 }],
    },
    {
        id: 'SH-0559',
        orderId: 'SO-1882',
        customer: '大宏科技股份有限公司',
        address: '新竹市東區科學園區力行路 6 號',
        receiver: '黃經理 02-2711-3355',
        carrier: '黑貓宅急便',
        trackingNo: '9021-4471-8830',
        scheduledDate: '2026-09-28',
        status: '配送中',
        note: '第一批，第二批 10/05 前送新竹廠。',
        lineItems: [{ sku: 'PK-0012', name: '工業級交換器 24 埠', quantity: 20, unitPrice: 12800 }],
    },
    {
        id: 'SH-0558',
        orderId: 'SO-1880',
        customer: '青禾食品',
        address: '桃園市中壢區環中東路 2 段 500 號',
        receiver: '林先生 03-356-7788',
        carrier: '大榮貨運（冷藏）',
        trackingNo: 'KL-66201938',
        scheduledDate: '2026-09-27',
        status: '配送中',
        note: '冷藏車配送，收貨時需量測溫度。',
        lineItems: [{ sku: 'PK-0220', name: '真空包裝袋（捲）', quantity: 250, unitPrice: 371 }],
    },
    {
        id: 'SH-0557',
        orderId: 'SO-1882',
        customer: '大宏科技股份有限公司',
        address: '新竹市東區科學園區力行路 6 號',
        receiver: '黃經理 02-2711-3355',
        carrier: '黑貓宅急便',
        trackingNo: '9021-4471-8812',
        scheduledDate: '2026-09-27',
        deliveredDate: '2026-09-27',
        status: '已送達',
        note: '',
        lineItems: [{ sku: 'PK-0031', name: '光纖模組 SFP+', quantity: 40, unitPrice: 1750 }],
    },
    {
        id: 'SH-0556',
        orderId: 'SO-1873',
        customer: '晨光文具',
        address: '台北市中正區重慶南路 1 段 43 號',
        receiver: '王小姐 02-2395-6677',
        carrier: '新竹物流',
        trackingNo: 'HC-30918277',
        scheduledDate: '2026-09-24',
        deliveredDate: '2026-09-24',
        status: '已送達',
        note: '',
        lineItems: [
            { sku: 'PK-0701', name: '中性筆（盒）', quantity: 300, unitPrice: 120 },
            { sku: 'PK-0702', name: 'A5 筆記本', quantity: 500, unitPrice: 45 },
        ],
    },
    {
        id: 'SH-0555',
        orderId: 'SO-1878',
        customer: '森悅家居',
        address: '高雄市前鎮區中山二路 7 號',
        receiver: '蔡小姐 07-331-5566',
        carrier: '自有車隊',
        scheduledDate: '2026-09-26',
        deliveredDate: '2026-09-26',
        status: '已送達',
        note: '',
        lineItems: [{ sku: 'PK-0410', name: '實木層板', quantity: 110, unitPrice: 590 }],
    },
    {
        id: 'SH-0554',
        orderId: 'SO-1874',
        customer: '大宏科技股份有限公司',
        address: '新竹市東區科學園區力行路 6 號',
        receiver: '黃經理 02-2711-3355',
        carrier: '黑貓宅急便',
        trackingNo: '9021-4470-2291',
        scheduledDate: '2026-09-25',
        deliveredDate: '2026-09-25',
        status: '已送達',
        note: '',
        lineItems: [{ sku: 'PK-0031', name: '光纖模組 SFP+', quantity: 80, unitPrice: 1750 }],
    },
];
