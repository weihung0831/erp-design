import { CalendarDays, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PillTabs } from '@/components/dashboard/panel';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { Spotlight } from '@/components/ui/spotlight-new';

const PERIODS = ['本月', '本季', '本年'] as const;

type Period = (typeof PERIODS)[number];

const TODAY_FOCUS = ['5 筆簽核待處理', '2 項庫存缺貨', '3 張訂單待出貨', '1 筆帳款逾期'];

const HIGHLIGHTS = [
    { label: '今日新訂單', value: '12 張' },
    { label: '今日出貨', value: '28 箱' },
    { label: '今日收款', value: 'NT$ 486K' },
];

export default function HeroBanner() {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('本月');

    return (
        <section className="relative isolate overflow-hidden rounded-3xl bg-neutral-950 px-6 py-8 md:px-10 md:py-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)] bg-size-[18px_18px]" />
            <div className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-(--admin-accent)/40 blur-[120px]" />
            <div className="absolute -bottom-32 left-1/4 -z-10 size-80 rounded-full bg-violet-500/20 blur-[120px]" />
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Spotlight />
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-(--admin-accent)/60 to-transparent" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-4">
                    <motion.p
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 text-sm text-neutral-400"
                    >
                        <CalendarDays className="size-4" />
                        2026 年 9 月 27 日・星期日・台北總公司
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-linear-to-b from-white to-neutral-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl"
                    >
                        早安，王小明
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-3 text-white"
                    >
                        <LayoutTextFlip
                            text="今天有"
                            words={TODAY_FOCUS}
                            textClassName="text-lg font-medium text-neutral-300 md:text-xl drop-shadow-none"
                            wordClassName="bg-white/5 px-3 py-1.5 text-lg font-semibold text-white ring-white/15 shadow-none md:text-xl dark:bg-white/5"
                        />
                    </motion.div>
                </div>

                <div className="flex flex-col gap-5 lg:items-end">
                    <div className="flex flex-wrap items-center gap-3">
                        <PillTabs options={PERIODS} value={selectedPeriod} onChange={setSelectedPeriod} layoutId="hero-period" label="統計期間" isInverted />
                        <HoverBorderGradient
                            containerClassName="rounded-full border-white/10 bg-white/10 hover:bg-white/5 dark:bg-white/10"
                            className="flex items-center gap-2 bg-neutral-950 text-sm text-white"
                        >
                            <Download className="size-4" />
                            匯出報表
                        </HoverBorderGradient>
                    </div>
                    <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/5 ring-1 ring-white/10">
                        {HIGHLIGHTS.map((highlight, index) => (
                            <motion.div
                                key={highlight.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className="flex flex-col gap-1 px-4 py-3 md:px-5"
                            >
                                <dt className="text-[11px] text-neutral-400">{highlight.label}</dt>
                                <dd className="text-sm font-semibold whitespace-nowrap text-white tabular-nums md:text-base">{highlight.value}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
