import { animate } from "motion";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  Factory,
  FileSpreadsheet,
  Handshake,
  Landmark,
  Mail,
  Package,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TOKENS = cn(
  "[--m-paper:var(--hub-paper)] [--m-panel:#f4f4f4] [--m-card:var(--hub-card)] [--m-chip:#ebebeb] [--m-chip-hover:#e2e2e2]",
  "[--m-ink:var(--hub-ink)] [--m-muted:var(--hub-muted)] [--m-accent:#4b6bfb]",
  "[--m-line:oklch(0_0_0/0.08)] [--m-line-strong:oklch(0_0_0/0.16)]",
  "[--m-win:#ffffff] [--m-win-side:#fafafa] [--m-win-line:oklch(0_0_0/0.08)]",
  "dark:[--m-paper:var(--hub-paper)] dark:[--m-panel:#171717]  dark:[--m-chip:#262626] dark:[--m-chip-hover:#303030]",
  "dark:[--m-accent:#8aa0ff]",
  "dark:[--m-line:oklch(1_0_0/0.08)] dark:[--m-line-strong:oklch(1_0_0/0.16)]",
  "dark:[--m-win:#161616] dark:[--m-win-side:#111111] dark:[--m-win-line:oklch(1_0_0/0.08)]",
);

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const MARK_BARS = [
  { x: 3, height: 7, duration: 2.8, delay: 0 },
  { x: 7.67, height: 15, duration: 3.4, delay: 0.5 },
  { x: 12.33, height: 10, duration: 3, delay: 1.1 },
  { x: 17, height: 5, duration: 3.8, delay: 0.3 },
];

function LogoMark({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn("size-5 text-(--m-ink)", className)}
    >
      {MARK_BARS.map((bar) => (
        <motion.line
          key={bar.x}
          x1={bar.x}
          x2={bar.x}
          y1={10 - bar.height / 2}
          y2={10 + bar.height / 2}
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          style={{ originY: 0.5 }}
          animate={shouldReduceMotion ? undefined : { scaleY: [1, 0.45, 1] }}
          transition={{
            duration: bar.duration,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

const STEP_MS = 4200;

const STEPS = [
  {
    heading: "匯入現有資料，隔週就能上線",
    title: "快速導入",
    body: "Excel、舊系統資料一鍵匯入，顧問陪你完成設定，不必停工等系統。",
  },
  {
    heading: "用一句話查詢任何數據",
    title: "即時查詢",
    body: "像問同事一樣輸入問題，系統直接給你答案並附上來源單據。",
  },
  {
    heading: "例行作業交給系統自動跑",
    title: "流程自動化",
    body: "低於安全庫存自動開採購單、通知供應商、同步應付帳款，你只要按核准。",
  },
] as const;

type BurstApp = { name: string; icon: LucideIcon; color: string };

const BURST_RINGS: { rx: number; ry: number; start: number; apps: BurstApp[] }[] = [
  {
    rx: 68,
    ry: 46,
    start: -90,
    apps: [
      { name: "sheet", icon: FileSpreadsheet, color: "#16a34a" },
      { name: "purchase", icon: ShoppingCart, color: "#10b981" },
      { name: "inventory", icon: Package, color: "#f97316" },
      { name: "finance", icon: Landmark, color: "#4b6bfb" },
      { name: "crm", icon: Handshake, color: "#ec4899" },
      { name: "hr", icon: Users, color: "#8b5cf6" },
    ],
  },
  {
    rx: 128,
    ry: 88,
    start: -75,
    apps: [
      { name: "store", icon: Store, color: "#f59e0b" },
      { name: "factory", icon: Factory, color: "#64748b" },
      { name: "report", icon: ChartColumn, color: "#0ea5e9" },
      { name: "truck", icon: Truck, color: "#0d9488" },
      { name: "warehouse", icon: Warehouse, color: "#ea580c" },
      { name: "mail", icon: Mail, color: "#ef4444" },
      { name: "sheet-2", icon: FileSpreadsheet, color: "#15803d" },
      { name: "report-2", icon: ChartColumn, color: "#6366f1" },
    ],
  },
];

const BURST_APPS = BURST_RINGS.flatMap((ring) =>
  ring.apps.map((app, index) => {
    const angle =
      ((ring.start + (index * 360) / ring.apps.length) * Math.PI) / 180;
    return {
      ...app,
      x: Math.round(Math.cos(angle) * ring.rx),
      y: Math.round(Math.sin(angle) * ring.ry),
    };
  }),
);

function IconBurst({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const isOpen = Boolean(shouldReduceMotion) || (active && isInView);

  return (
    <div ref={ref} className="relative size-full">
      {BURST_APPS.map((app, index) => (
        <motion.span
          key={app.name}
          className="absolute top-1/2 left-1/2 -mt-2.5 -ml-2.5 size-5"
          initial={false}
          animate={
            isOpen
              ? { x: app.x, y: app.y, opacity: 1, scale: 1 }
              : { x: 0, y: 0, opacity: 0, scale: 0.4 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : isOpen
                ? {
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.25,
                    delay: 0.2 + index * 0.05,
                  }
                : { duration: 0.3, ease: EASE_OUT }
          }
        >
          <app.icon className="size-5" style={{ color: app.color }} strokeWidth={1.75} />
        </motion.span>
      ))}

      <LogoMark className="absolute top-1/2 left-1/2 z-10 size-9 -translate-1/2" />
    </div>
  );
}

const QUESTION = "上個月哪些品項低於安全庫存？";

function AskInput({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!active) {
      setTyped(0);
      return;
    }
    if (shouldReduceMotion) {
      setTyped(QUESTION.length);
      return;
    }
    const controls = animate(0, QUESTION.length, {
      duration: 1.6,
      delay: 0.35,
      ease: "linear",
      onUpdate: (value) => setTyped(Math.round(value)),
    });
    return () => controls.stop();
  }, [active, shouldReduceMotion]);

  return (
    <motion.div
      layout={!shouldReduceMotion}
      className={cn(
        "flex w-full items-end gap-1 rounded-xl bg-(--m-card) px-3 py-2.5 shadow-[0_0_0_1px_var(--m-line)]",
        active &&
          "shadow-[0_0_0_1px_var(--m-line-strong),0_8px_20px_-12px_oklch(0_0_0/0.18)]",
      )}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <span
        className={cn(
          "min-h-6 flex-1 text-[0.8125rem] leading-6",
          typed > 0 ? "text-(--m-ink)" : "text-(--m-muted)",
          active && "min-h-12",
        )}
      >
        {typed > 0 ? QUESTION.slice(0, typed) : "輸入你想查詢的問題…"}
        {active && typed < QUESTION.length ? (
          <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-(--m-ink)" />
        ) : null}
      </span>
      <span className="flex size-6 shrink-0 items-center justify-center text-(--m-muted)">
        <svg
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M10.5 5.5 6 10a1.4 1.4 0 0 0 2 2l5-5a2.8 2.8 0 0 0-4-4L3.8 8.2a4.2 4.2 0 0 0 6 6L14 10" />
        </svg>
      </span>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-(--m-ink) text-(--m-card)">
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
          <path
            d="M6 10V2M2.5 5.5 6 2l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.div>
  );
}

const FOLLOW_UPS = [
  { key: "purchase", icon: ShoppingCart, color: "#10b981", label: "已建立採購單 PO-2411" },
  { key: "mail", icon: Mail, color: "#ef4444", label: "已通知 3 家供應商" },
  { key: "finance", icon: Landmark, color: "#4b6bfb", label: "應付帳款已同步更新" },
];

function FollowUp({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[0.8125rem] text-(--m-muted)">
        <motion.svg
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          animate={
            active && !shouldReduceMotion ? { rotate: 360 } : { rotate: 0 }
          }
          transition={
            active && !shouldReduceMotion
              ? { duration: 1.4, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
        >
          <path d="M13 8a5 5 0 0 1-8.6 3.5M3 8a5 5 0 0 1 8.6-3.5M11.5 2v2.5H9M4.5 14v-2.5H7" />
        </motion.svg>
        正在同步 3 個模組
        <span className="ml-auto flex -space-x-1">
          {FOLLOW_UPS.map((item) => (
            <span
              key={item.key}
              className="flex size-5 items-center justify-center rounded-md bg-(--m-card) shadow-[0_0_0_1px_var(--m-line)]"
            >
              <item.icon className="size-3" style={{ color: item.color }} />
            </span>
          ))}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {FOLLOW_UPS.map((item, index) => (
          <motion.li
            key={item.key}
            className="flex items-center gap-2 rounded-lg bg-(--m-card) px-2.5 py-2 text-xs text-(--m-ink) shadow-[0_0_0_1px_var(--m-line)]"
            initial={false}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: EASE_OUT,
              delay: active && !shouldReduceMotion ? 0.5 + index * 0.35 : 0,
            }}
          >
            <span className="size-1.5 rounded-full bg-(--m-ink)/30" />
            {item.label}
            <motion.span
              className="ml-auto text-(--m-accent)"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                delay: active && !shouldReduceMotion ? 0.7 + index * 0.35 : 0,
              }}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8.5l3 3 7-7" />
              </svg>
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkflowSteps() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycling = inView && !paused && !shouldReduceMotion;

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(
      () => setActive((current) => (current + 1) % STEPS.length),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  const visuals = [
    <IconBurst key="burst" active={active === 0} />,
    <AskInput key="ask" active={active === 1} />,
    <FollowUp key="follow" active={active === 2} />,
  ];

  return (
    <section
      ref={sectionRef}
      id="workflow"
      aria-labelledby="steps-heading"
      className={cn(
        TOKENS,
        "w-full scroll-mt-24 bg-(--m-paper) px-4 py-20 sm:px-6 sm:py-28",
      )}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setPaused(false);
      }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="steps-heading"
          className="flex flex-col items-center text-center text-[1.75rem] leading-[1.25] font-medium tracking-tight sm:text-[2.375rem]"
        >
          {STEPS.map((step, index) => (
            <motion.span
              key={step.heading}
              className="text-(--m-ink)"
              initial={false}
              animate={{ opacity: index === active ? 1 : 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: EASE_OUT,
              }}
            >
              {step.heading}
              <sup
                className={cn(
                  "ml-1 font-sans text-[0.6875rem] font-medium tracking-normal tabular-nums sm:text-xs",
                  index === active ? "text-(--m-accent)" : "text-(--m-muted)",
                )}
              >
                0{index + 1}
              </sup>
            </motion.span>
          ))}
        </h2>

        <div className="mt-12 grid gap-8 sm:mt-14 md:grid-cols-3 md:gap-4">
          {STEPS.map((step, index) => {
            const isActive = index === active;
            return (
              <button
                key={step.title}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className="group flex flex-col rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--m-ink)"
              >
                <motion.div
                  aria-hidden="true"
                  className={cn(
                    "flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-(--m-panel) px-6",
                    isActive
                      ? "shadow-[0_0_0_1px_var(--m-line-strong)]"
                      : "shadow-[0_0_0_1px_var(--m-line)]",
                  )}
                  animate={{
                    scale: isActive && !shouldReduceMotion ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                >
                  {visuals[index]}
                </motion.div>
                <div className="mt-6 flex flex-col gap-1.5 px-1">
                  <span className="relative flex items-center gap-3">
                    <span
                      className={cn(
                        "text-xs font-medium tabular-nums",
                        isActive ? "text-(--m-accent)" : "text-(--m-muted)",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-(--m-line)">
                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.span
                            key="progress"
                            className="absolute inset-y-0 left-0 w-full origin-left bg-(--m-accent)"
                            initial={{ scaleX: 0 }}
                            animate={
                              cycling ? { scaleX: [0, 1] } : { scaleX: 1 }
                            }
                            exit={{
                              opacity: 0,
                              transition: {
                                duration: shouldReduceMotion ? 0 : 0.15,
                              },
                            }}
                            transition={
                              cycling
                                ? { duration: STEP_MS / 1000, ease: "linear" }
                                : {
                                    duration: shouldReduceMotion ? 0 : 0.35,
                                    ease: EASE_OUT,
                                  }
                            }
                          />
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </span>
                  <span className="mt-2 text-[0.9375rem] font-semibold text-(--m-ink)">
                    {step.title}
                  </span>
                  <span className="max-w-[36ch] text-sm leading-5 text-pretty text-(--m-muted)">
                    {step.body}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
