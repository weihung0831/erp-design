import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const ARROW_CLASS =
    'grid size-7 cursor-pointer place-items-center rounded-full text-neutral-500 transition hover:bg-white hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white';

export default function ApprovalsPagination({
    page,
    pageCount,
    pageSize,
    total,
    onChange,
}: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
}) {
    const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const lastItem = Math.min(page * pageSize, total);

    return (
        <nav aria-label="分頁" className="mt-4 flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
            <p className="text-neutral-500 tabular-nums dark:text-neutral-400">
                顯示 {firstItem}–{lastItem}，共 {total} 筆
            </p>
            <div className="flex items-center gap-0.5 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800/80">
                <button type="button" aria-label="上一頁" disabled={page === 1} onClick={() => onChange(page - 1)} className={ARROW_CLASS}>
                    <ChevronLeft className="size-3.5" />
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => {
                    const isCurrent = pageNumber === page;
                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            aria-current={isCurrent ? 'page' : undefined}
                            onClick={() => onChange(pageNumber)}
                            className={cn(
                                'relative min-w-7 cursor-pointer rounded-full px-2 py-1 font-medium tabular-nums transition-colors',
                                isCurrent
                                    ? 'text-neutral-900 dark:text-white'
                                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
                            )}
                        >
                            {isCurrent && (
                                <motion.span
                                    layoutId="approvals-page"
                                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] dark:bg-neutral-700 dark:shadow-none"
                                />
                            )}
                            <span className="relative z-10">{pageNumber}</span>
                        </button>
                    );
                })}
                <button type="button" aria-label="下一頁" disabled={page === pageCount} onClick={() => onChange(page + 1)} className={ARROW_CLASS}>
                    <ChevronRight className="size-3.5" />
                </button>
            </div>
        </nav>
    );
}
