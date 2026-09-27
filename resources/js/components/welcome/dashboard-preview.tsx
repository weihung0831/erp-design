import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  ChartColumn,
  CircleAlert,
  Factory,
  FileCheck2,
  LayoutDashboard,
  Landmark,
  Package,
  Search,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HubGlyph } from "@/components/welcome/module-hub-hero";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS: { label: string; icon: LucideIcon; isActive?: boolean }[] = [
  { label: "經營總覽", icon: LayoutDashboard, isActive: true },
  { label: "進銷存", icon: Package },
  { label: "採購", icon: ShoppingCart },
  { label: "財務會計", icon: Landmark },
  { label: "生產排程", icon: Factory },
  { label: "人事薪資", icon: Users },
  { label: "報表分析", icon: ChartColumn },
];

const KPIS = [
  { label: "本月營收", value: "NT$ 12.48M", delta: "+12.4%", isPositive: true },
  { label: "毛利率", value: "32.6%", delta: "+1.8 pt", isPositive: true },
  { label: "庫存周轉天數", value: "41 天", delta: "-3 天", isPositive: true },
  { label: "應收逾期", value: "NT$ 860K", delta: "+4.2%", isPositive: false },
];

const MONTHLY_REVENUE = [
  { month: "10月", value: 8.2 },
  { month: "11月", value: 8.9 },
  { month: "12月", value: 10.4 },
  { month: "1月", value: 7.6 },
  { month: "2月", value: 7.1 },
  { month: "3月", value: 9.3 },
  { month: "4月", value: 9.8 },
  { month: "5月", value: 10.1 },
  { month: "6月", value: 10.9 },
  { month: "7月", value: 11.2 },
  { month: "8月", value: 11.1 },
  { month: "9月", value: 12.48 },
];

const REVENUE_MAX = 14;
const REVENUE_GRID = [0, 5, 10];

const STOCK_ALERTS = [
  { item: "紙箱 (大)", quantity: 8, level: "critical" as const },
  { item: "封箱機", quantity: 3, level: "critical" as const },
  { item: "碳粉匣", quantity: 36, level: "warning" as const },
];

const PENDING_APPROVALS = [
  { id: "PO-2411", title: "採購單・辦公耗材", amount: "NT$ 48,200" },
  { id: "EX-0932", title: "請款單・物流費用", amount: "NT$ 12,650" },
  { id: "SO-1877", title: "銷貨折讓・大宏科技", amount: "NT$ 6,300" },
];

const RECENT_ORDERS = [
  { id: "SO-1882", customer: "大宏科技", amount: "NT$ 326,000", status: "已出貨" },
  { id: "SO-1881", customer: "晴川貿易", amount: "NT$ 118,400", status: "備貨中" },
  { id: "SO-1880", customer: "青禾食品", amount: "NT$ 92,750", status: "已出貨" },
];

export default function DashboardPreview() {
  return (
    <section aria-labelledby="dashboard-heading" className="overflow-x-clip">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-3 px-4">
            <h2
              id="dashboard-heading"
              className="text-3xl font-medium tracking-tight md:text-4xl"
            >
              一個畫面，看懂整間公司
            </h2>
            <p className="max-w-xl text-(--hub-muted)">
              營收、毛利、庫存與待辦簽核即時匯整，打開系統就知道今天該處理什麼。
            </p>
            <div className="h-16 md:h-20" />
          </div>
        }
      >
        <DashboardMock />
      </ContainerScroll>
    </section>
  );
}

function DashboardMock() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full bg-[#f7f7f5] dark:bg-neutral-950 text-left text-neutral-800 dark:text-neutral-100 select-none"
    >
      <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-black/6 dark:border-white/8 bg-white dark:bg-neutral-900 p-3 md:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-1">
          <span className="grid size-6 place-items-center rounded-md bg-linear-to-b from-[#6d8bff] to-[#4b6bfb]">
            <HubGlyph className="size-3.5" />
          </span>
          <span className="text-xs font-semibold">ERP Design</span>
        </div>
        {SIDEBAR_ITEMS.map((item) => (
          <span
            key={item.label}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
              item.isActive
                ? "bg-[#4b6bfb]/10 font-medium text-[#3b57d9] dark:text-[#8aa0ff]"
                : "text-neutral-500 dark:text-neutral-400",
            )}
          >
            <item.icon className="size-3.5" strokeWidth={1.75} />
            {item.label}
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 md:p-4">
        <header className="flex items-center gap-2">
          <p className="text-sm font-semibold">經營總覽</p>
          <span className="ml-1 hidden items-center gap-1 rounded-md bg-white dark:bg-neutral-900 px-2 py-1 text-[10px] text-neutral-500 dark:text-neutral-400 ring-1 ring-black/6 dark:ring-white/8 sm:flex">
            <CalendarDays className="size-3" />
            2026 年 9 月
          </span>
          <span className="ml-auto hidden w-40 items-center gap-1.5 rounded-md bg-white dark:bg-neutral-900 px-2 py-1 text-[10px] text-neutral-400 dark:text-neutral-500 ring-1 ring-black/6 dark:ring-white/8 lg:flex">
            <Search className="size-3" />
            搜尋單號、客戶、品項
          </span>
          <span className="relative ml-auto grid size-6 place-items-center rounded-md bg-white dark:bg-neutral-900 ring-1 ring-black/6 dark:ring-white/8 lg:ml-0">
            <Bell className="size-3 text-neutral-500 dark:text-neutral-400" />
            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[#4b6bfb]" />
          </span>
          <span className="grid size-6 place-items-center rounded-full bg-[#10b981] text-[10px] font-medium text-white">
            我
          </span>
        </header>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg bg-white dark:bg-neutral-900 p-2.5 ring-1 ring-black/6 dark:ring-white/8"
            >
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{kpi.label}</p>
              <p className="mt-1 text-base font-semibold tracking-tight tabular-nums md:text-lg">
                {kpi.value}
              </p>
              <p
                className={cn(
                  "mt-0.5 flex items-center gap-1 text-[10px] font-medium tabular-nums",
                  kpi.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
                )}
              >
                {kpi.isPositive ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {kpi.delta}
                <span className="font-normal text-neutral-400 dark:text-neutral-500">較上月</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[1fr_15rem]">
          <div className="flex min-h-0 flex-col gap-2">
            <RevenueChart />
            <div className="hidden rounded-lg bg-white dark:bg-neutral-900 p-3 ring-1 ring-black/6 dark:ring-white/8 md:block">
              <p className="mb-2 text-xs font-medium">近期訂單</p>
              <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 text-[11px]">
                <span className="pb-1 text-[10px] text-neutral-400 dark:text-neutral-500">單號</span>
                <span className="pb-1 text-[10px] text-neutral-400 dark:text-neutral-500">客戶</span>
                <span className="pb-1 text-right text-[10px] text-neutral-400 dark:text-neutral-500">金額</span>
                <span className="pb-1 text-[10px] text-neutral-400 dark:text-neutral-500">狀態</span>
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="contents">
                    <span className="border-t border-black/5 dark:border-white/6 py-1.5 font-medium tabular-nums">
                      {order.id}
                    </span>
                    <span className="border-t border-black/5 dark:border-white/6 py-1.5 text-neutral-600 dark:text-neutral-300">
                      {order.customer}
                    </span>
                    <span className="border-t border-black/5 dark:border-white/6 py-1.5 text-right tabular-nums">
                      {order.amount}
                    </span>
                    <span className="border-t border-black/5 dark:border-white/6 py-1.5">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px]",
                          order.status === "已出貨"
                            ? "bg-neutral-100 dark:bg-white/8 text-neutral-600 dark:text-neutral-300"
                            : "bg-[#4b6bfb]/10 text-[#3b57d9] dark:text-[#8aa0ff]",
                        )}
                      >
                        {order.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden min-h-0 flex-col gap-2 lg:flex">
            <div className="rounded-lg bg-white dark:bg-neutral-900 p-3 ring-1 ring-black/6 dark:ring-white/8">
              <p className="mb-2 flex items-center justify-between text-xs font-medium">
                庫存警示
                <span className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500">
                  低於安全量
                </span>
              </p>
              <ul className="flex flex-col gap-1.5">
                {STOCK_ALERTS.map((alert) => (
                  <li
                    key={alert.item}
                    className="flex items-center gap-2 text-[11px]"
                  >
                    {alert.level === "critical" ? (
                      <CircleAlert className="size-3.5 text-red-500" />
                    ) : (
                      <AlertTriangle className="size-3.5 text-amber-500" />
                    )}
                    <span className="flex-1">{alert.item}</span>
                    <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">
                      剩 {alert.quantity}
                    </span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                      {alert.level === "critical" ? "缺貨風險" : "偏低"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 rounded-lg bg-white dark:bg-neutral-900 p-3 ring-1 ring-black/6 dark:ring-white/8">
              <p className="mb-2 flex items-center justify-between text-xs font-medium">
                待我簽核
                <span className="rounded-full bg-[#4b6bfb] px-1.5 text-[10px] leading-4 text-white">
                  {PENDING_APPROVALS.length}
                </span>
              </p>
              <ul className="flex flex-col gap-2">
                {PENDING_APPROVALS.map((approval) => (
                  <li
                    key={approval.id}
                    className="flex items-start gap-2 rounded-md bg-neutral-50 dark:bg-white/5 p-2 text-[11px]"
                  >
                    <FileCheck2 className="mt-0.5 size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{approval.title}</span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 tabular-nums">
                        {approval.id}・{approval.amount}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const latest = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];

  return (
    <div className="flex min-h-40 flex-1 flex-col rounded-lg bg-white dark:bg-neutral-900 p-3 ring-1 ring-black/6 dark:ring-white/8">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-medium">月營收趨勢</p>
        <p className="text-[10px] text-neutral-400 dark:text-neutral-500">單位：百萬元</p>
      </div>
      <div className="relative mt-3 flex min-h-0 flex-1 gap-2">
        <div className="flex w-5 shrink-0 flex-col text-[9px] text-neutral-400 dark:text-neutral-500 tabular-nums">
          <div className="relative flex-1">
            {REVENUE_GRID.map((tick) => (
              <span
                key={tick}
                className="absolute right-0 translate-y-1/2"
                style={{ bottom: `${(tick / REVENUE_MAX) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
          <div className="h-4" />
        </div>
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="relative flex-1">
            {REVENUE_GRID.map((tick) => (
              <span
                key={tick}
                className={cn(
                  "absolute inset-x-0 h-px",
                  tick === 0 ? "bg-neutral-300 dark:bg-neutral-600" : "bg-neutral-100 dark:bg-white/8",
                )}
                style={{ bottom: `${(tick / REVENUE_MAX) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-[2px]">
              {MONTHLY_REVENUE.map((entry) => {
                const isLatest = entry.month === latest.month;
                const isHovered = entry.month === hoveredMonth;
                return (
                  <div
                    key={entry.month}
                    className="relative flex h-full flex-1 items-end justify-center"
                    onMouseEnter={() => setHoveredMonth(entry.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <span
                      className={cn(
                        "w-full max-w-5 rounded-t-[4px] transition-colors",
                        isLatest || isHovered ? "bg-[#4b6bfb] dark:bg-[#6d8bff]" : "bg-[#4b6bfb]/35 dark:bg-[#8aa0ff]/40",
                      )}
                      style={{ height: `${(entry.value / REVENUE_MAX) * 100}%` }}
                    />
                    {(isHovered || (isLatest && hoveredMonth === null)) && (
                      <span
                        className="absolute z-10 -translate-y-1.5 rounded bg-neutral-900 dark:bg-white px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white tabular-nums dark:text-neutral-900"
                        style={{ bottom: `${(entry.value / REVENUE_MAX) * 100}%` }}
                      >
                        {entry.month} {entry.value.toFixed(1)}M
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex h-4 items-end gap-[2px]">
            {MONTHLY_REVENUE.map((entry) => (
              <span
                key={entry.month}
                className="flex-1 text-center text-[9px] text-neutral-400 dark:text-neutral-500"
              >
                {entry.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
