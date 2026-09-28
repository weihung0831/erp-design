import type { SalesOrderLineItem } from '@/components/sales/sales-orders-data';
import { TODAY } from '@/components/sales/sales-orders-data';
import { lineItemsTotal } from '@/components/sales/sales-shared';

export type QuotationStatus = '草稿' | '已送出' | '已接受' | '已婉拒';

export type Quotation = {
    id: string;
    customer: string;
    contact: string;
    salesperson: string;
    issuedDate: string;
    validUntil: string;
    status: QuotationStatus;
    note: string;
    lineItems: SalesOrderLineItem[];
    convertedOrderId?: string;
};

export const QUOTATION_FILTERS = ['全部', '草稿', '已送出', '已接受', '已婉拒'] as const;

export type QuotationFilter = (typeof QUOTATION_FILTERS)[number];

export const QUOTATION_STATUS_STYLES: Record<QuotationStatus, { dot: string; text: string }> = {
    草稿: { dot: 'bg-neutral-400 shadow-transparent', text: 'text-neutral-500 dark:text-neutral-400' },
    已送出: { dot: 'bg-(--admin-accent) shadow-(--admin-accent)/60', text: 'text-(--admin-accent-ink)' },
    已接受: { dot: 'bg-emerald-500 shadow-emerald-500/60', text: 'text-emerald-700 dark:text-emerald-400' },
    已婉拒: { dot: 'bg-rose-500 shadow-rose-500/60', text: 'text-rose-700 dark:text-rose-400' },
};

/** Quotes still waiting on us or the customer expire once `validUntil` passes. */
const EXPIRING_WITHIN_DAYS = 3;

export type QuotationValidity = 'valid' | 'expiring' | 'expired';

export function quotationValidity(quotation: Quotation): QuotationValidity {
    if (quotation.status !== '草稿' && quotation.status !== '已送出') {
        return 'valid';
    }
    const daysLeft = (Date.parse(quotation.validUntil) - Date.parse(TODAY)) / 86_400_000;
    if (daysLeft < 0) {
        return 'expired';
    }

    return daysLeft <= EXPIRING_WITHIN_DAYS ? 'expiring' : 'valid';
}

export function quotationAmount(quotation: Quotation): number {
    return lineItemsTotal(quotation.lineItems);
}

export const QUOTATIONS: Quotation[] = [
    {
        id: 'QT-0942',
        customer: '北辰精密工業',
        contact: '周課長 06-601-2233',
        salesperson: '吳佩珊',
        issuedDate: '2026-09-28',
        validUntil: '2026-10-12',
        status: '草稿',
        note: '第四季擴線需求，驅動器改報新款，待確認交期後送出。',
        lineItems: [
            { sku: 'PK-0305', name: '伺服馬達 750W', quantity: 50, unitPrice: 11500 },
            { sku: 'PK-0306', name: '驅動器', quantity: 50, unitPrice: 3400 },
        ],
    },
    {
        id: 'QT-0941',
        customer: '晨光文具',
        contact: '王小姐 02-2395-6677',
        salesperson: '李承翰',
        issuedDate: '2026-09-27',
        validUntil: '2026-10-11',
        status: '已送出',
        note: '開學季補貨，量大可再議價 3%。',
        lineItems: [
            { sku: 'PK-0701', name: '中性筆（盒）', quantity: 800, unitPrice: 115 },
            { sku: 'PK-0702', name: 'A5 筆記本', quantity: 1200, unitPrice: 42 },
        ],
    },
    {
        id: 'QT-0940',
        customer: '大宏科技股份有限公司',
        contact: '黃經理 02-2711-3355',
        salesperson: '張家瑜',
        issuedDate: '2026-09-25',
        validUntil: '2026-09-30',
        status: '已送出',
        note: '客戶比價中，競爭對手報價約低 4%。',
        lineItems: [
            { sku: 'PK-0012', name: '工業級交換器 24 埠', quantity: 35, unitPrice: 12600 },
            { sku: 'PK-0031', name: '光纖模組 SFP+', quantity: 70, unitPrice: 1720 },
        ],
    },
    {
        id: 'QT-0939',
        customer: '宏遠物流',
        contact: '許主任 02-8791-4400',
        salesperson: '吳佩珊',
        issuedDate: '2026-09-24',
        validUntil: '2026-10-08',
        status: '已接受',
        note: '客戶已口頭同意，待轉訂單。',
        lineItems: [{ sku: 'PK-0520', name: '手持條碼掃描器', quantity: 40, unitPrice: 2850 }],
    },
    {
        id: 'QT-0938',
        customer: '青禾食品',
        contact: '林先生 03-356-7788',
        salesperson: '張家瑜',
        issuedDate: '2026-09-18',
        validUntil: '2026-09-25',
        status: '已送出',
        note: '',
        lineItems: [{ sku: 'PK-0220', name: '真空包裝袋（捲）', quantity: 300, unitPrice: 365 }],
    },
    {
        id: 'QT-0937',
        customer: '森悅家居',
        contact: '蔡小姐 07-331-5566',
        salesperson: '李承翰',
        issuedDate: '2026-09-17',
        validUntil: '2026-10-01',
        status: '已婉拒',
        note: '客戶預算刪減，延至明年再議。',
        lineItems: [{ sku: 'PK-0410', name: '實木層板', quantity: 260, unitPrice: 580 }],
    },
    {
        id: 'QT-0931',
        customer: '禾豐農產',
        contact: '鄭先生 05-223-8899',
        salesperson: '張家瑜',
        issuedDate: '2026-09-15',
        validUntil: '2026-09-29',
        status: '已接受',
        note: '',
        lineItems: [{ sku: 'PK-0601', name: '溫溼度感測器', quantity: 60, unitPrice: 1480 }],
        convertedOrderId: 'SO-1875',
    },
    {
        id: 'QT-0929',
        customer: '北辰精密工業',
        contact: '周課長 06-601-2233',
        salesperson: '吳佩珊',
        issuedDate: '2026-09-12',
        validUntil: '2026-09-26',
        status: '已接受',
        note: '',
        lineItems: [
            { sku: 'PK-0305', name: '伺服馬達 750W', quantity: 30, unitPrice: 11800 },
            { sku: 'PK-0306', name: '驅動器', quantity: 30, unitPrice: 3476 },
        ],
        convertedOrderId: 'SO-1879',
    },
    {
        id: 'QT-0926',
        customer: '晴川貿易',
        contact: '陳小姐 04-2258-1020',
        salesperson: '李承翰',
        issuedDate: '2026-09-10',
        validUntil: '2026-09-24',
        status: '已婉拒',
        note: '客戶改向原供應商採購。',
        lineItems: [{ sku: 'PK-0104', name: '不鏽鋼保溫瓶 500ml', quantity: 600, unitPrice: 228 }],
    },
];
