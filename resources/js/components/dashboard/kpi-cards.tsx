import type { LucideIcon } from 'lucide-react';
import { Boxes, ChartNoAxesCombined, Percent, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { Kpi, KpiIcon } from '@/components/dashboard/dashboard-data';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Grid } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

const KPI_ICONS: Record<KpiIcon, LucideIcon> = {
    revenue: ChartNoAxesCombined,
    margin: Percent,
    receivable: Wallet,
    inventory: Boxes,
};

export function EdgeElement() {
    return (
        <div className="absolute top-0 right-0 size-10 overflow-hidden border-b border-l border-neutral-200 bg-white shadow-[-3px_4px_9px_0px_rgba(0,0,0,0.14)] transition duration-200 group-hover/card:translate-x-14 group-hover/card:-translate-y-14 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-[-3px_4px_9px_0px_rgba(255,255,255,0.2)]">
            <div className="absolute top-0 left-0 h-px w-[141%] origin-top-left rotate-45 bg-neutral-100 dark:bg-neutral-800" />
        </div>
    );
}

function IconContainer({ children }: { children: ReactNode }) {
    return (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-b from-neutral-200 to-white to-50% p-1 dark:from-neutral-800 dark:to-black">
            <div className="flex size-full items-center justify-center rounded-lg bg-linear-to-b from-[#5D5D5D] to-black dark:to-neutral-900">
                {children}
            </div>
        </div>
    );
}

function KpiCell({ kpi, index }: { kpi: Kpi; index: number }) {
    const Icon = KPI_ICONS[kpi.icon];
    const TrendIcon = kpi.delta.startsWith('-') ? TrendingDown : TrendingUp;

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                'group/card relative overflow-hidden p-6',
                index > 0 && 'border-t border-neutral-200 sm:border-t-0 dark:border-neutral-800',
                index % 2 === 1 && 'sm:border-l',
                index >= 2 && 'sm:border-t xl:border-t-0',
                index > 0 && 'xl:border-l',
            )}
        >
            <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
            <Grid size={20} pattern={kpi.pattern} />
            <EdgeElement />
            <div className="relative flex items-center gap-3">
                <IconContainer>
                    <Icon className="size-5 text-white" strokeWidth={1.75} />
                </IconContainer>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{kpi.label}</p>
            </div>
            <p className="relative mt-5 text-3xl font-bold tracking-tight whitespace-nowrap text-neutral-800 tabular-nums dark:text-neutral-100">
                {kpi.prefix && <span className="mr-0.5 text-lg font-semibold text-neutral-400 dark:text-neutral-500">{kpi.prefix}</span>}
                <AnimatedNumber value={kpi.value} decimals={kpi.decimals} />
                <span className="text-(--admin-accent)">{kpi.suffix}</span>
            </p>
            <p className="relative mt-3 flex items-center gap-2 text-xs tabular-nums">
                <span
                    className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ring-1',
                        kpi.isPositive
                            ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400'
                            : 'bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-400',
                    )}
                >
                    <TrendIcon className="size-3.5" />
                    {kpi.delta}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">{kpi.caption}</span>
            </p>
        </motion.div>
    );
}

export default function KpiCards({ kpis }: { kpis: Kpi[] }) {
    return (
        <div className={cn('grid grid-cols-1 overflow-hidden rounded-2xl bg-white sm:grid-cols-2 xl:grid-cols-4 dark:bg-neutral-950', ACETERNITY_SHADOW)}>
            {kpis.map((kpi, index) => (
                <KpiCell key={kpi.label} kpi={kpi} index={index} />
            ))}
        </div>
    );
}
