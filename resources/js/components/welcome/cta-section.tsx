import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  ChartColumn,
  Check,
  Factory,
  Handshake,
  Landmark,
  Package,
  ShoppingCart,
  Store,
  Users,
  Warehouse,
} from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import type { CSSProperties } from "react";
import { PillLink } from "@/components/welcome/pill-link";
import { cn } from "@/lib/utils";

type OrbitNode = {
  name: string;
  icon: LucideIcon;
  color: string;
  angle: number;
};

const ORBIT_NODES: OrbitNode[] = [
  { name: "採購", icon: ShoppingCart, color: "#10b981", angle: -8 },
  { name: "庫存", icon: Package, color: "#f97316", angle: 38 },
  { name: "財務", icon: Landmark, color: "#4b6bfb", angle: 86 },
  { name: "人資", icon: Users, color: "#8b5cf6", angle: 132 },
  { name: "銷售", icon: Store, color: "#f59e0b", angle: 176 },
  { name: "生產", icon: Factory, color: "#64748b", angle: 218 },
  { name: "客戶", icon: Handshake, color: "#ec4899", angle: 262 },
  { name: "報表", icon: ChartColumn, color: "#0ea5e9", angle: 308 },
];

const TEAM: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "業務", icon: BriefcaseBusiness, color: "#4b6bfb" },
  { name: "財務", icon: Calculator, color: "#10b981" },
  { name: "倉管", icon: Warehouse, color: "#f97316" },
];

const BENEFITS = ["30 天免費試用", "專屬顧問協助導入", "資料隨時完整匯出"];

function OrbitDiagram() {
  const rotate = useMotionValue(0);
  const counterRotate = useTransform(() => -rotate.get());
  const shouldReduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) {
      return;
    }

    rotate.set(rotate.get() + (5.5 * delta) / 1000);
  });

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-80 [--cta-blue:#e8edff] [--cta-lavender:#efe9f7] [--cta-peach:#f7ebe4] [--orbit-r:7.5rem] sm:max-w-96 sm:[--orbit-r:9.25rem] dark:[--cta-blue:#1e2544] dark:[--cta-lavender:#2e2a40] dark:[--cta-peach:#3a302c]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_100%_90%_at_12%_16%,var(--cta-blue),transparent_58%),radial-gradient(ellipse_90%_80%_at_94%_22%,var(--cta-peach),transparent_52%),radial-gradient(ellipse_90%_90%_at_78%_96%,var(--cta-lavender),transparent_58%),linear-gradient(160deg,var(--cta-blue),var(--cta-peach)_48%,var(--cta-lavender))]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[78%] -translate-1/2 rounded-full border border-dashed border-(--hub-ink)/25 dark:border-white/25" />

      <div className="absolute top-1/2 left-1/2 z-10 flex -translate-1/2 items-center">
        {TEAM.map((member, index) => (
          <span
            key={member.name}
            className={cn(
              "grid place-items-center rounded-full text-white ring-2 ring-(--hub-card)",
              index === 1 ? "relative z-10 size-14" : "size-11",
              index === 0 && "-mr-1.5",
              index === 2 && "-ml-1.5",
            )}
            style={{ backgroundColor: member.color }}
          >
            <member.icon
              className={index === 1 ? "size-6" : "size-5"}
              strokeWidth={1.75}
            />
          </span>
        ))}
      </div>

      <motion.div style={{ rotate }} className="absolute inset-0">
        {ORBIT_NODES.map((node) => (
          <div
            key={node.name}
            className="absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)_rotate(var(--orbit-angle))_translateX(var(--orbit-r))_rotate(calc(var(--orbit-angle)*-1))]"
            style={{ "--orbit-angle": `${node.angle}deg` } as CSSProperties}
          >
            <motion.div style={{ rotate: counterRotate }}>
              <div className="flex size-10 items-center justify-center rounded-[0.875rem] bg-(--hub-card) shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_6px_16px_oklch(0_0_0/0.06)] sm:size-11 dark:shadow-[0_0_0_1px_oklch(1_0_0/0.08)]">
                <node.icon
                  className="size-[48%]"
                  style={{ color: node.color }}
                  strokeWidth={1.75}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="overflow-x-clip px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 rounded-[2rem] bg-(--hub-card) p-8 shadow-[0_0_0_1px_oklch(0.28_0.02_67/0.06),0_18px_50px_-20px_oklch(0.28_0.02_67/0.18)] sm:gap-12 sm:p-10 lg:grid-cols-[6fr_5fr] lg:gap-8 lg:p-14 dark:shadow-none dark:inset-ring dark:inset-ring-white/8">
          <div className="flex flex-col gap-6 sm:gap-7">
            <p className="text-xs font-medium tracking-[0.18em] text-(--hub-blue)">
              立即開始
            </p>
            <h2
              id="cta-heading"
              className="max-w-[16ch] text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem]"
            >
              讓每個部門都在同一套系統上
            </h2>
            <p className="max-w-[44ch] text-base text-pretty text-(--hub-muted)">
              業務接單、倉管出貨、財務入帳，全部即時串接。不用再跨部門追資料，每個人打開系統看到的都是同一份數字。
            </p>
            <ul className="flex flex-col gap-2.5">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2.5 text-sm text-(--hub-ink)"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-(--hub-blue)/10 text-(--hub-blue)">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2.5">
              <PillLink href="#top" variant="solid">
                免費試用
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </PillLink>
              <PillLink href="#faq" variant="outline">
                預約顧問諮詢
              </PillLink>
            </div>
          </div>

          <figure>
            <OrbitDiagram />
            <figcaption className="sr-only">
              業務、財務與倉管位於中心，周圍環繞採購、庫存、財務等八個模組。
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
