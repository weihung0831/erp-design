import type { OrderStatus } from '@/components/dashboard/dashboard-data';
import { lineItemsTotal } from '@/components/sales/sales-shared';

export type { OrderStatus };

export type SalesOrderLineItem = {
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
};

export type SalesOrder = {
    id: string;
    customer: string;
    contact: string;
    salesperson: string;
    orderDate: string;
    deliveryDate: string;
    paymentTerm: string;
    status: OrderStatus;
    note: string;
    lineItems: SalesOrderLineItem[];
};

// ponytail: mock "today" keeps the overdue badge stable in the demo; use the real date once orders come from the backend.
export const TODAY = '2026-09-28';

/** Order lifecycle, in order. Each status advances to the next one. */
export const ORDER_FLOW: OrderStatus[] = ['待確認', '備貨中', '已出貨', '已結案'];

export const NEXT_STEP_LABELS: Partial<Record<OrderStatus, string>> = {
    待確認: '確認訂單',
    備貨中: '出貨',
    已出貨: '結案',
};

export function orderAmount(order: SalesOrder): number {
    return lineItemsTotal(order.lineItems);
}

export function isDeliveryOverdue(order: SalesOrder): boolean {
    return (order.status === '待確認' || order.status === '備貨中') && order.deliveryDate < TODAY;
}

export const SALES_ORDERS: SalesOrder[] = [
    {
        id: 'SO-1882',
        customer: '大宏科技股份有限公司',
        contact: '黃經理 02-2711-3355',
        salesperson: '張家瑜',
        orderDate: '2026-09-27',
        deliveryDate: '2026-09-30',
        paymentTerm: '月結 60 天',
        status: '已出貨',
        note: '分兩批出貨，第二批請於 10/05 前送達新竹廠。',
        lineItems: [
            {
                sku: 'PK-0012',
                name: '工業級交換器 24 埠',
                quantity: 20,
                unitPrice: 12800,
            },
            {
                sku: 'PK-0031',
                name: '光纖模組 SFP+',
                quantity: 40,
                unitPrice: 1750,
            },
        ],
    },
    {
        id: 'SO-1881',
        customer: '晴川貿易',
        contact: '陳小姐 04-2258-1020',
        salesperson: '李承翰',
        orderDate: '2026-09-27',
        deliveryDate: '2026-10-03',
        paymentTerm: '月結 30 天',
        status: '備貨中',
        note: '客戶要求附原廠保固卡。',
        lineItems: [
            {
                sku: 'PK-0104',
                name: '不鏽鋼保溫瓶 500ml',
                quantity: 400,
                unitPrice: 236,
            },
            { sku: 'PK-0107', name: '禮盒包裝', quantity: 400, unitPrice: 60 },
        ],
    },
    {
        id: 'SO-1880',
        customer: '青禾食品',
        contact: '林先生 03-356-7788',
        salesperson: '張家瑜',
        orderDate: '2026-09-26',
        deliveryDate: '2026-09-29',
        paymentTerm: '貨到 7 天',
        status: '已出貨',
        note: '冷藏車配送。',
        lineItems: [
            {
                sku: 'PK-0220',
                name: '真空包裝袋（捲）',
                quantity: 250,
                unitPrice: 371,
            },
        ],
    },
    {
        id: 'SO-1879',
        customer: '北辰精密工業',
        contact: '周課長 06-601-2233',
        salesperson: '吳佩珊',
        orderDate: '2026-09-26',
        deliveryDate: '2026-09-27',
        paymentTerm: '月結 90 天',
        status: '待確認',
        note: '金額超過信用額度，需主管確認後才能備貨。',
        lineItems: [
            {
                sku: 'PK-0305',
                name: '伺服馬達 750W',
                quantity: 30,
                unitPrice: 11800,
            },
            { sku: 'PK-0306', name: '驅動器', quantity: 30, unitPrice: 3476 },
        ],
    },
    {
        id: 'SO-1878',
        customer: '森悅家居',
        contact: '蔡小姐 07-331-5566',
        salesperson: '李承翰',
        orderDate: '2026-09-25',
        deliveryDate: '2026-09-26',
        paymentTerm: '現金',
        status: '已結案',
        note: '已收款。',
        lineItems: [{ sku: 'PK-0410', name: '實木層板', quantity: 110, unitPrice: 590 }],
    },
    {
        id: 'SO-1876',
        customer: '宏遠物流',
        contact: '許主任 02-8791-4400',
        salesperson: '吳佩珊',
        orderDate: '2026-09-25',
        deliveryDate: '2026-09-26',
        paymentTerm: '月結 60 天',
        status: '備貨中',
        note: '缺料 PK-0012，等待採購進貨。',
        lineItems: [
            {
                sku: 'PK-0012',
                name: '工業級交換器 24 埠',
                quantity: 12,
                unitPrice: 12800,
            },
            {
                sku: 'PK-0520',
                name: '手持條碼掃描器',
                quantity: 20,
                unitPrice: 2900,
            },
        ],
    },
    {
        id: 'SO-1875',
        customer: '禾豐農產',
        contact: '鄭先生 05-223-8899',
        salesperson: '張家瑜',
        orderDate: '2026-09-24',
        deliveryDate: '2026-10-01',
        paymentTerm: '月結 30 天',
        status: '待確認',
        note: '報價單 QT-0931 轉入。',
        lineItems: [
            {
                sku: 'PK-0601',
                name: '溫溼度感測器',
                quantity: 60,
                unitPrice: 1480,
            },
        ],
    },
    {
        id: 'SO-1874',
        customer: '大宏科技股份有限公司',
        contact: '黃經理 02-2711-3355',
        salesperson: '張家瑜',
        orderDate: '2026-09-23',
        deliveryDate: '2026-09-25',
        paymentTerm: '月結 60 天',
        status: '已結案',
        note: '',
        lineItems: [
            {
                sku: 'PK-0031',
                name: '光纖模組 SFP+',
                quantity: 80,
                unitPrice: 1750,
            },
        ],
    },
    {
        id: 'SO-1873',
        customer: '晨光文具',
        contact: '王小姐 02-2395-6677',
        salesperson: '李承翰',
        orderDate: '2026-09-22',
        deliveryDate: '2026-09-24',
        paymentTerm: '月結 30 天',
        status: '已出貨',
        note: '',
        lineItems: [
            {
                sku: 'PK-0701',
                name: '中性筆（盒）',
                quantity: 300,
                unitPrice: 120,
            },
            { sku: 'PK-0702', name: 'A5 筆記本', quantity: 500, unitPrice: 45 },
        ],
    },
    {
        id: 'SO-1872',
        customer: '北辰精密工業',
        contact: '周課長 06-601-2233',
        salesperson: '吳佩珊',
        orderDate: '2026-09-20',
        deliveryDate: '2026-09-23',
        paymentTerm: '月結 90 天',
        status: '已結案',
        note: '',
        lineItems: [{ sku: 'PK-0306', name: '驅動器', quantity: 15, unitPrice: 3476 }],
    },
    {
        id: 'SO-1871',
        customer: '宏遠物流',
        contact: '許主任 02-8791-4400',
        salesperson: '吳佩珊',
        orderDate: '2026-09-19',
        deliveryDate: '2026-09-22',
        paymentTerm: '月結 60 天',
        status: '已結案',
        note: '',
        lineItems: [
            {
                sku: 'PK-0520',
                name: '手持條碼掃描器',
                quantity: 35,
                unitPrice: 2900,
            },
        ],
    },
    {
        id: 'SO-1870',
        customer: '青禾食品',
        contact: '林先生 03-356-7788',
        salesperson: '張家瑜',
        orderDate: '2026-09-18',
        deliveryDate: '2026-09-20',
        paymentTerm: '貨到 7 天',
        status: '已結案',
        note: '',
        lineItems: [
            {
                sku: 'PK-0220',
                name: '真空包裝袋（捲）',
                quantity: 180,
                unitPrice: 371,
            },
        ],
    },
];
