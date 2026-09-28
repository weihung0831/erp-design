export type CustomerTier = 'A' | 'B' | 'C';

export type Customer = {
    id: string;
    name: string;
    industry: string;
    tier: CustomerTier;
    taxId: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    salesperson: string;
    paymentTerm: string;
    creditLimit: number;
    receivable: number;
    since: string;
};

export const CUSTOMER_FILTERS = ['全部', 'A 級', 'B 級', 'C 級', '額度警示'] as const;

export type CustomerFilter = (typeof CUSTOMER_FILTERS)[number];

export const TIER_STYLES: Record<CustomerTier, string> = {
    A: 'from-amber-400 to-amber-600 shadow-amber-500/30',
    B: 'from-sky-400 to-sky-600 shadow-sky-500/30',
    C: 'from-neutral-400 to-neutral-500 shadow-neutral-500/30',
};

/** Share of the credit limit tied up in receivables, from 0 to 1+. */
export function creditUsage(customer: Customer): number {
    return customer.receivable / customer.creditLimit;
}

export type CreditLevel = 'normal' | 'warning' | 'over';

const CREDIT_WARNING_RATIO = 0.8;

export function creditLevel(customer: Customer): CreditLevel {
    const usage = creditUsage(customer);
    if (usage > 1) {
        return 'over';
    }

    return usage >= CREDIT_WARNING_RATIO ? 'warning' : 'normal';
}

export const CREDIT_LEVEL_STYLES: Record<CreditLevel, { bar: string; text: string; label: string }> = {
    normal: { bar: 'from-sky-400 to-(--admin-accent)', text: 'text-neutral-500 dark:text-neutral-400', label: '正常' },
    warning: { bar: 'from-amber-400 to-amber-500', text: 'text-amber-700 dark:text-amber-400', label: '接近上限' },
    over: { bar: 'from-rose-400 to-rose-600', text: 'text-rose-600 dark:text-rose-400', label: '超過額度' },
};

export const CUSTOMERS: Customer[] = [
    {
        id: 'C-0012',
        name: '大宏科技股份有限公司',
        industry: '電子製造',
        tier: 'A',
        taxId: '24517830',
        contact: '黃經理',
        phone: '02-2711-3355',
        email: 'purchase@dahong.com.tw',
        address: '新竹市東區科學園區力行路 6 號',
        salesperson: '張家瑜',
        paymentTerm: '月結 60 天',
        creditLimit: 1_500_000,
        receivable: 986_000,
        since: '2019-03',
    },
    {
        id: 'C-0018',
        name: '北辰精密工業',
        industry: '機械設備',
        tier: 'A',
        taxId: '53120981',
        contact: '周課長',
        phone: '06-601-2233',
        email: 'chou@beichen.com.tw',
        address: '台南市安南區工業二路 31 號',
        salesperson: '吳佩珊',
        paymentTerm: '月結 90 天',
        creditLimit: 600_000,
        receivable: 658_420,
        since: '2020-08',
    },
    {
        id: 'C-0021',
        name: '宏遠物流',
        industry: '物流倉儲',
        tier: 'B',
        taxId: '80023716',
        contact: '許主任',
        phone: '02-8791-4400',
        email: 'hsu@hongyuan-log.com',
        address: '新北市五股區五工路 120 號',
        salesperson: '吳佩珊',
        paymentTerm: '月結 60 天',
        creditLimit: 400_000,
        receivable: 313_100,
        since: '2021-01',
    },
    {
        id: 'C-0027',
        name: '晴川貿易',
        industry: '貿易',
        tier: 'B',
        taxId: '42288105',
        contact: '陳小姐',
        phone: '04-2258-1020',
        email: 'chen@qingchuan.com.tw',
        address: '台中市西屯區工業區一路 88 號',
        salesperson: '李承翰',
        paymentTerm: '月結 30 天',
        creditLimit: 300_000,
        receivable: 118_400,
        since: '2022-05',
    },
    {
        id: 'C-0033',
        name: '青禾食品',
        industry: '食品加工',
        tier: 'B',
        taxId: '66510923',
        contact: '林先生',
        phone: '03-356-7788',
        email: 'lin@qinghe-food.com',
        address: '桃園市中壢區環中東路 2 段 500 號',
        salesperson: '張家瑜',
        paymentTerm: '貨到 7 天',
        creditLimit: 200_000,
        receivable: 92_750,
        since: '2022-11',
    },
    {
        id: 'C-0041',
        name: '晨光文具',
        industry: '零售',
        tier: 'C',
        taxId: '38817264',
        contact: '王小姐',
        phone: '02-2395-6677',
        email: 'wang@morninglight.tw',
        address: '台北市中正區重慶南路 1 段 43 號',
        salesperson: '李承翰',
        paymentTerm: '月結 30 天',
        creditLimit: 150_000,
        receivable: 58_500,
        since: '2023-04',
    },
    {
        id: 'C-0046',
        name: '森悅家居',
        industry: '家具零售',
        tier: 'C',
        taxId: '90126655',
        contact: '蔡小姐',
        phone: '07-331-5566',
        email: 'tsai@senyue-home.com',
        address: '高雄市前鎮區中山二路 7 號',
        salesperson: '李承翰',
        paymentTerm: '現金',
        creditLimit: 100_000,
        receivable: 0,
        since: '2024-02',
    },
    {
        id: 'C-0052',
        name: '禾豐農產',
        industry: '農業',
        tier: 'C',
        taxId: '71450382',
        contact: '鄭先生',
        phone: '05-223-8899',
        email: 'cheng@hefeng-agri.com',
        address: '嘉義市西區博愛路 2 段 210 號',
        salesperson: '張家瑜',
        paymentTerm: '月結 30 天',
        creditLimit: 120_000,
        receivable: 102_000,
        since: '2026-09',
    },
];
