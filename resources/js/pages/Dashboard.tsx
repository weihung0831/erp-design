import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import {
    KPIS,
    MONTHLY_REVENUE,
    PENDING_APPROVALS,
    RECEIVABLE_AGING,
    RECENT_ORDERS,
    SHIPMENT_HISTORY,
    STOCK_ALERTS,
} from '@/components/dashboard/dashboard-data';
import HeroBanner from '@/components/dashboard/hero-banner';
import KpiCards from '@/components/dashboard/kpi-cards';
import PendingApprovals from '@/components/dashboard/pending-approvals';
import QuickActionsDock from '@/components/dashboard/quick-actions-dock';
import ReceivableAging from '@/components/dashboard/receivable-aging';
import RecentOrders from '@/components/dashboard/recent-orders';
import RevenueChart from '@/components/dashboard/revenue-chart';
import ShipmentUptime from '@/components/dashboard/shipment-uptime';
import StockAlerts from '@/components/dashboard/stock-alerts';

export default function Dashboard() {
    return (
        <>
            <Head title="儀表板" />
            <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:gap-6">
                <HeroBanner />

                <KpiCards kpis={KPIS} />

                <div className="grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-3">
                    <RevenueChart data={MONTHLY_REVENUE} className="xl:col-span-2" />
                    <PendingApprovals approvals={PENDING_APPROVALS} />
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-3">
                    <RecentOrders orders={RECENT_ORDERS} className="xl:col-span-2" />
                    <StockAlerts alerts={STOCK_ALERTS} />
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
                    <ShipmentUptime history={SHIPMENT_HISTORY} />
                    <ReceivableAging buckets={RECEIVABLE_AGING} />
                </div>

                <QuickActionsDock />
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
