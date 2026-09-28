import type { LucideIcon } from 'lucide-react';
import { PartyPopper, Receipt, ReceiptText, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ApprovalKind, PendingApproval } from '@/components/dashboard/dashboard-data';
import { Panel, PanelLinkButton } from '@/components/dashboard/panel';
import { Button as StatefulButton } from '@/components/ui/stateful-button';

const KIND_STYLES: Record<ApprovalKind, { icon: LucideIcon; className: string }> = {
    purchase: { icon: ShoppingCart, className: 'from-orange-400 to-orange-600 shadow-orange-500/30' },
    expense: { icon: Receipt, className: 'from-violet-400 to-violet-600 shadow-violet-500/30' },
    sales: { icon: ReceiptText, className: 'from-sky-400 to-sky-600 shadow-sky-500/30' },
};

function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function PendingApprovals({ approvals, className }: { approvals: PendingApproval[]; className?: string }) {
    const [remaining, setRemaining] = useState(approvals);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const approve = async (id: string) => {
        await wait(800);
        setTimeout(() => setRemaining((current) => current.filter((approval) => approval.id !== id)), 900);
    };

    return (
        <Panel
            title="待我簽核"
            description={
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={remaining.length}
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        className="inline-block"
                    >
                        {remaining.length > 0 ? `還有 ${remaining.length} 筆等待處理` : '全部處理完成'}
                    </motion.span>
                </AnimatePresence>
            }
            action={<PanelLinkButton href="/dashboard/approvals">全部</PanelLinkButton>}
            className={className}
        >
            <ul className="-mx-3 flex flex-1 flex-col" onMouseLeave={() => setHoveredId(null)}>
                <AnimatePresence initial={false} mode="popLayout">
                    {remaining.map((approval) => {
                        const kind = KIND_STYLES[approval.kind];
                        return (
                            <motion.li
                                key={approval.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: 24, transition: { duration: 0.25, ease: 'easeOut' } }}
                                transition={{ layout: { type: 'spring', stiffness: 400, damping: 36 } }}
                                onMouseEnter={() => setHoveredId(approval.id)}
                                className="relative flex items-center gap-3 rounded-xl px-3 py-2.5"
                            >
                                <AnimatePresence>
                                    {hoveredId === approval.id && (
                                        <motion.span
                                            layoutId="approval-hover"
                                            className="absolute inset-0 rounded-xl bg-neutral-100 dark:bg-neutral-900"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                                        />
                                    )}
                                </AnimatePresence>
                                <span className={`relative grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-b text-white shadow-md ${kind.className}`}>
                                    <kind.icon className="size-4" />
                                </span>
                                <div className="relative min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{approval.title}</p>
                                    <p className="truncate text-xs text-neutral-500 tabular-nums dark:text-neutral-400">
                                        {approval.requester}・{approval.submittedAt}
                                    </p>
                                </div>
                                <div className="relative flex shrink-0 flex-col items-end gap-1.5">
                                    <span className="text-sm font-semibold tabular-nums">{approval.amount}</span>
                                    <StatefulButton
                                        onClick={() => approve(approval.id)}
                                        className="w-20 min-w-0 bg-linear-to-b from-emerald-400 to-emerald-600 px-3 py-1 text-xs shadow-sm shadow-emerald-500/30 hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 dark:ring-offset-neutral-950"
                                    >
                                        核准
                                    </StatefulButton>
                                </div>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
                {remaining.length === 0 && (
                    <motion.li
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                        <PartyPopper className="size-6 text-(--admin-accent)" />
                        今天的簽核都處理完了
                    </motion.li>
                )}
            </ul>
        </Panel>
    );
}
