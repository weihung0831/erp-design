import { FilePlus2, HandCoins, PackagePlus, Printer, ScanBarcode, UserPlus } from 'lucide-react';
import type { DockItem } from '@/components/ui/floating-dock';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useSidebar } from '@/components/ui/grouped-sidebar';

const ICON_CLASS = 'size-full text-white';

const QUICK_ACTIONS: DockItem[] = [
    { title: '新增銷貨單', icon: <FilePlus2 className={ICON_CLASS} />, className: 'bg-linear-to-b from-sky-400 to-sky-600 shadow-md shadow-sky-500/30' },
    { title: '新增採購單', icon: <PackagePlus className={ICON_CLASS} />, className: 'bg-linear-to-b from-orange-400 to-orange-600 shadow-md shadow-orange-500/30' },
    { title: '收款登錄', icon: <HandCoins className={ICON_CLASS} />, className: 'bg-linear-to-b from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/30' },
    { title: '庫存盤點', icon: <ScanBarcode className={ICON_CLASS} />, className: 'bg-linear-to-b from-amber-400 to-amber-600 shadow-md shadow-amber-500/30' },
    { title: '新增客戶', icon: <UserPlus className={ICON_CLASS} />, className: 'bg-linear-to-b from-violet-400 to-violet-600 shadow-md shadow-violet-500/30' },
    { title: '列印報表', icon: <Printer className={ICON_CLASS} />, className: 'bg-linear-to-b from-[#6d8bff] to-(--admin-accent) shadow-md shadow-(--admin-accent)/30' },
];

export default function QuickActionsDock() {
    const { mobileOpen } = useSidebar();

    if (mobileOpen) {
        return null;
    }

    return (
        <div className="pointer-events-none sticky bottom-6 z-40 -mb-10 flex justify-end md:justify-center">
            <div className="pointer-events-auto">
                <FloatingDock
                    items={QUICK_ACTIONS}
                    desktopClassName="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.12),0_2px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/5 bg-white/90 backdrop-blur-md dark:bg-neutral-900/90 dark:ring-white/10"
                    mobileClassName="[&>button]:bg-linear-to-b [&>button]:from-[#6d8bff] [&>button]:to-(--admin-accent) [&>button]:shadow-lg [&>button]:shadow-(--admin-accent)/30 [&>button_svg]:text-white"
                />
            </div>
        </div>
    );
}
