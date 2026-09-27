import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { PillLink } from "@/components/welcome/pill-link";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  buttonText: string;
  isFeatured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "入門版",
    description: "給剛開始把進銷存搬上系統的小型團隊",
    monthlyPrice: 1990,
    features: [
      "5 位使用者",
      "進銷存與採購模組",
      "電子發票串接",
      "Excel 匯入匯出",
      "14 天免費試用",
    ],
    buttonText: "免費試用",
  },
  {
    id: "growth",
    name: "成長版",
    description: "給跨部門協作、需要簽核流程的成長型企業",
    monthlyPrice: 4990,
    features: [
      "20 位使用者",
      "全模組，含財務會計與生產排程",
      "多倉庫與批號管理",
      "自訂簽核流程",
      "API 與 LINE 通知串接",
    ],
    buttonText: "免費試用",
    isFeatured: true,
  },
  {
    id: "professional",
    name: "專業版",
    description: "給多據點、多公司別營運的中大型企業",
    monthlyPrice: 9900,
    features: [
      "50 位使用者",
      "多公司別與合併報表",
      "進階報表與 BI 儀表板",
      "操作稽核紀錄",
      "優先客服支援",
    ],
    buttonText: "免費試用",
  },
];

const ENTERPRISE_FEATURES = [
  "不限使用者人數",
  "SSO 單一登入",
  "專屬主機與資料落地",
  "完整稽核紀錄",
  "客製報表與欄位",
  "到府導入與教育訓練",
  "專屬導入顧問",
  "合約與發票彈性",
];

const BILLING_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "月繳" },
  { value: "yearly", label: "年繳" },
];

function priceFor(plan: Plan, cycle: BillingCycle): number {
  return cycle === "yearly"
    ? Math.round((plan.monthlyPrice * 10) / 12)
    : plan.monthlyPrice;
}

export default function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="w-full scroll-mt-24 bg-(--hub-card) px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2
            id="pricing-heading"
            className="text-3xl font-medium tracking-tight text-balance md:text-4xl"
          >
            跟著企業一起長大的方案
          </h2>
          <p className="text-(--hub-muted)">
            先從一個部門開始，業務成長再加人數與模組，隨時可以升級或調整。
          </p>
          <BillingSwitch cycle={cycle} onChange={setCycle} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-10 rounded-2xl bg-(--hub-paper) p-6 ring-1 ring-black/8 md:p-8 lg:grid-cols-3 lg:gap-16 dark:ring-white/10">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-lg font-medium tracking-tight">企業方案</h3>
            <p className="text-sm/6 text-(--hub-muted)">
              需要 SSO、專屬主機或資安審查才能導入？我們會依組織規模規劃合適的方案與導入時程。
            </p>
            <PillLink href="#faq" variant="outline" className="mt-3">
              聯絡業務
            </PillLink>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {ENTERPRISE_FEATURES.map((feature) => (
              <FeatureItem key={feature}>{feature}</FeatureItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BillingSwitch({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="計費週期"
      className="mt-2 flex items-center gap-1 rounded-full bg-(--hub-paper) p-1 ring-1 ring-black/8 dark:ring-white/10"
    >
      {BILLING_OPTIONS.map((option) => {
        const isSelected = option.value === cycle;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isSelected ? "text-(--hub-card)" : "text-(--hub-muted) hover:text-(--hub-ink)",
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="billing-cycle"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-(--hub-ink)"
              />
            )}
            <span className="relative">{option.label}</span>
            {option.value === "yearly" && (
              <span
                className={cn(
                  "relative rounded-full px-1.5 py-0.5 text-[11px] leading-none font-semibold",
                  isSelected
                    ? "bg-(--hub-card)/15 text-(--hub-card)"
                    : "bg-(--hub-blue)/10 text-(--hub-blue)",
                )}
              >
                省 2 個月
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const price = priceFor(plan, cycle);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-6 ring-1 md:p-8",
        plan.isFeatured
          ? "bg-(--hub-card) shadow-lg shadow-(--hub-blue)/10 ring-(--hub-blue)/40"
          : "bg-(--hub-paper) ring-black/6 dark:ring-white/8",
      )}
    >
      {plan.isFeatured && (
        <span className="absolute -top-3 left-6 rounded-full bg-linear-to-b from-[#6d8bff] to-(--hub-blue) px-3 py-1 text-xs font-medium text-white shadow-sm shadow-(--hub-blue)/30 md:left-8">
          最多企業選擇
        </span>
      )}
      <h3 className="text-lg font-medium tracking-tight">{plan.name}</h3>
      <p className="mt-1 text-sm/6 text-(--hub-muted) md:min-h-12">
        {plan.description}
      </p>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-sm text-(--hub-muted)">NT$</span>
        <span className="relative inline-flex h-10 items-baseline overflow-hidden text-4xl font-medium tracking-tight tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${plan.id}-${cycle}`}
              initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {price.toLocaleString()}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-sm text-(--hub-muted)">/ 月</span>
      </div>
      <p className="mt-1 h-5 text-xs text-(--hub-muted)">
        {cycle === "yearly"
          ? `年繳 NT$ ${(plan.monthlyPrice * 10).toLocaleString()}，未稅`
          : "按月計費，未稅"}
      </p>
      <PillLink
        href="#top"
        variant={plan.isFeatured ? "solid" : "outline"}
        className="mt-6 w-full"
      >
        {plan.buttonText}
      </PillLink>
      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <FeatureItem key={feature}>{feature}</FeatureItem>
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm/6 text-(--hub-ink)/80">
      <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-(--hub-blue)/10 text-(--hub-blue)">
        <Check className="size-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}
