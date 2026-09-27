import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  Factory,
  Handshake,
  Landmark,
  Package,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import { wrap } from "motion";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { PillLink } from "@/components/welcome/pill-link";
import { cn } from "@/lib/utils";

type DiagramNode = {
  name: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  hideOnNarrow?: boolean;
};

const CANVAS = { w: 1200, h: 400 } as const;
const HUB = { x: 600, y: 200 };

type Trace = {
  id: string;
  d: string;
  hideOnNarrow?: boolean;
};

type DiagramMark = {
  x: number;
  y: number;
  hideOnNarrow?: boolean;
};

type Offshoot = DiagramMark & {
  dx: number;
  dy: number;
};

const TRACES: Trace[] = [
  { id: "left-main", d: "M 150 200 H 554" },
  { id: "right-main", d: "M 646 200 H 1050" },
  { id: "upper", d: "M 200 88 H 1000", hideOnNarrow: true },
  { id: "hub-riser", d: "M 600 154 V 88", hideOnNarrow: true },
  { id: "col-left", d: "M 200 88 V 306", hideOnNarrow: true },
  { id: "col-right", d: "M 1000 88 V 306", hideOnNarrow: true },
  { id: "left-drop", d: "M 264 200 V 232" },
  { id: "right-drop", d: "M 936 200 V 232" },
];

const JUNCTIONS: DiagramMark[] = [
  { x: 200, y: 88, hideOnNarrow: true },
  { x: 264, y: 200 },
  { x: 200, y: 200, hideOnNarrow: true },
  { x: 600, y: 88, hideOnNarrow: true },
  { x: 936, y: 200 },
  { x: 1000, y: 200, hideOnNarrow: true },
  { x: 1000, y: 88, hideOnNarrow: true },
];

const OFFSHOOTS: Offshoot[] = [
  { x: 320, y: 88, dx: 0, dy: -12, hideOnNarrow: true },
  { x: 390, y: 88, dx: 0, dy: 12, hideOnNarrow: true },
  { x: 810, y: 88, dx: 0, dy: -12, hideOnNarrow: true },
  { x: 880, y: 88, dx: 0, dy: 12, hideOnNarrow: true },
  { x: 330, y: 200, dx: 0, dy: -12 },
  { x: 410, y: 200, dx: 0, dy: 12 },
  { x: 790, y: 200, dx: 0, dy: -12 },
  { x: 870, y: 200, dx: 0, dy: 12 },
  { x: 200, y: 140, dx: -12, dy: 0, hideOnNarrow: true },
  { x: 200, y: 260, dx: 12, dy: 0, hideOnNarrow: true },
  { x: 1000, y: 140, dx: 12, dy: 0, hideOnNarrow: true },
  { x: 1000, y: 260, dx: -12, dy: 0, hideOnNarrow: true },
];

const NODES: DiagramNode[] = [
  { name: "採購", icon: ShoppingCart, color: "#10b981", x: 200, y: 88, hideOnNarrow: true },
  { name: "銷售", icon: Store, color: "#f59e0b", x: 120, y: 200 },
  { name: "庫存", icon: Package, color: "#f97316", x: 264, y: 248 },
  { name: "生產", icon: Factory, color: "#64748b", x: 200, y: 328, hideOnNarrow: true },
  { name: "財務", icon: Landmark, color: "#4b6bfb", x: 1000, y: 88, hideOnNarrow: true },
  { name: "客戶", icon: Handshake, color: "#ec4899", x: 936, y: 248 },
  { name: "人資", icon: Users, color: "#8b5cf6", x: 1080, y: 200 },
  { name: "報表", icon: ChartColumn, color: "#0ea5e9", x: 1000, y: 328, hideOnNarrow: true },
];

const MODULE_HIGHLIGHTS = [
  {
    word: "進銷存",
    description:
      "從報價、接單到出貨，庫存數量即時更新，缺貨之前系統就先提醒你補貨。",
  },
  {
    word: "財務",
    description:
      "應收應付、傳票與報表自動彙整，月結不必再對帳對到半夜。",
  },
  {
    word: "生產",
    description:
      "工單、物料需求與產能排程一次到位，交期與成本都在掌握之中。",
  },
  {
    word: "人資",
    description:
      "出勤、請假到薪資計算全部整合，每月發薪不再手動逐筆核對。",
  },
];

const MODULE_WORDS = MODULE_HIGHLIGHTS.map((highlight) => highlight.word);

function pct(x: number, y: number) {
  return {
    left: `${(x / CANVAS.w) * 100}%`,
    top: `${(y / CANVAS.h) * 100}%`,
  };
}

export function HubGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="8" y="11" width="16" height="3" rx="1.5" className="fill-white" />
      <rect x="8" y="18" width="16" height="3" rx="1.5" className="fill-white" />
    </svg>
  );
}

function ConnectionLayer() {
  const uid = useId();
  const shouldReduceMotion = useReducedMotion();
  const beamRefs = useRef<(SVGPathElement | null)[]>([]);
  const sparkRefs = useRef<(SVGPathElement | null)[]>([]);
  const offsets = useRef<number[]>([]);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) {
      return;
    }

    beamRefs.current.forEach((el, index) => {
      if (!el) {
        return;
      }
      const length = el.getTotalLength();
      if (length === 0) {
        return;
      }
      const current = offsets.current[index] ?? 0;
      const next = wrap(0, length, current - (length * delta) / 3600);
      offsets.current[index] = next;
      el.style.strokeDashoffset = `${next}`;

      const spark = sparkRefs.current[index];
      if (spark) {
        spark.style.strokeDashoffset = `${wrap(0, length, next + length * 0.38)}`;
      }
    });
  });

  return (
    <svg
      viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
      className="pointer-events-none absolute inset-0 size-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={`${uid}-glow`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {TRACES.map((trace) => (
        <path
          key={`${trace.id}-glow`}
          d={trace.d}
          className={cn(
            "stroke-[#4b6bfb]/20 dark:stroke-[#6d8bff]/30",
            trace.hideOnNarrow && "max-md:hidden",
          )}
          strokeWidth={7}
          strokeLinecap="round"
        />
      ))}

      {TRACES.map((trace) => (
        <path
          key={`${trace.id}-base`}
          d={trace.d}
          className={cn(
            "stroke-(--hub-line)",
            trace.hideOnNarrow && "max-md:hidden",
          )}
          strokeWidth={1.25}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {OFFSHOOTS.map((tick, index) => (
        <path
          key={`tick-${index}`}
          d={`M ${tick.x} ${tick.y} l ${tick.dx} ${tick.dy}`}
          className={cn(
            "stroke-(--hub-line)",
            tick.hideOnNarrow && "max-md:hidden",
          )}
          strokeWidth={1.15}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {JUNCTIONS.map((pad, index) => (
        <circle
          key={`pad-${index}`}
          cx={pad.x}
          cy={pad.y}
          r={3}
          className={cn(
            "fill-(--hub-paper) stroke-(--hub-line)",
            pad.hideOnNarrow && "max-md:hidden",
          )}
          strokeWidth={1.15}
        />
      ))}

      {shouldReduceMotion
        ? null
        : TRACES.map((trace, index) => (
            <g key={`${trace.id}-beams`}>
              <path
                ref={(node) => {
                  beamRefs.current[index] = node;
                }}
                d={trace.d}
                className={cn(
                  "stroke-[#4b6bfb] dark:stroke-[#8aa0ff]",
                  trace.hideOnNarrow && "max-md:hidden",
                )}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="22 190"
                filter={`url(#${uid}-glow)`}
              />
              <path
                ref={(node) => {
                  sparkRefs.current[index] = node;
                }}
                d={trace.d}
                className={cn(
                  "stroke-[#8aa0ff] dark:stroke-[#c5d0ff]",
                  trace.hideOnNarrow && "max-md:hidden",
                )}
                strokeWidth={1.35}
                strokeLinecap="round"
                strokeDasharray="7 205"
              />
            </g>
          ))}
    </svg>
  );
}

function Diagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <figure className="relative mx-auto mt-10 w-full max-w-6xl px-2 sm:mt-14 sm:px-4">
      <div className="relative aspect-3/1 w-full">
        <ConnectionLayer />

        <span
          className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--hub-card) px-2.5 py-1 text-[0.6875rem] text-(--hub-muted) ring-1 ring-black/8 sm:inline-flex dark:ring-white/10"
          style={pct(432, 88)}
        >
          營運作業
        </span>
        <span
          className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--hub-card) px-2.5 py-1 text-[0.6875rem] text-(--hub-muted) ring-1 ring-black/8 sm:inline-flex dark:ring-white/10"
          style={pct(768, 88)}
        >
          經營管理
        </span>
        <p
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 text-[0.6875rem] text-(--hub-muted) md:block"
          style={pct(408, 248)}
        >
          第一線資料即時入帳
        </p>
        <p
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 text-[0.6875rem] text-(--hub-muted) md:block"
          style={pct(792, 248)}
        >
          決策所需一次到位
        </p>

        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={pct(HUB.x, HUB.y)}
        >
          <div className="grid size-14 place-items-center rounded-2xl bg-linear-to-b from-[#6d8bff] to-(--hub-blue) shadow-[0_8px_20px_-8px_#4b6bfb] sm:size-16 dark:shadow-none">
            <HubGlyph className="size-7 sm:size-8" />
          </div>
        </div>

        {NODES.map((node) => (
          <a
            key={node.name}
            href="#features"
            aria-label={`${node.name}模組`}
            className={cn(
              "group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--hub-ink)",
              node.hideOnNarrow && "max-md:hidden",
            )}
            style={pct(node.x, node.y)}
          >
            <motion.span
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="grid size-10 place-items-center rounded-xl bg-(--hub-card) shadow-[0_8px_18px_-10px_oklch(0_0_0/0.28)] ring-1 ring-black/6 sm:size-11 dark:shadow-none dark:inset-ring dark:ring-white/10 dark:inset-ring-white/6"
            >
              <node.icon className="size-[48%]" style={{ color: node.color }} strokeWidth={1.75} />
            </motion.span>
            <span className="absolute top-full left-1/2 mt-1.5 -translate-x-1/2 text-[0.6875rem] whitespace-nowrap text-(--hub-muted) opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {node.name}
            </span>
          </a>
        ))}
      </div>
      <figcaption className="sr-only">
        採購、銷售、庫存、生產等營運資料匯入同一個平台，財務、客戶、人資與報表即時共用。
      </figcaption>
    </figure>
  );
}

export default function ModuleHubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hub-hero-heading"
      className="relative isolate w-full overflow-x-clip px-4 pt-32 pb-20 sm:px-6 sm:pt-40"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6">
        <span className="rounded-full bg-(--hub-card) px-3 py-1 text-xs text-(--hub-muted) ring-1 ring-black/8 dark:ring-white/10">
          新一代企業資源規劃平台
        </span>
        <h1
          id="hub-hero-heading"
          className="flex flex-col items-center gap-3 text-center text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          <span>一套系統，讓</span>
          <span className="flex items-center gap-3">
            <ContainerTextFlip
              words={MODULE_WORDS}
              onIndexChange={setActiveIndex}
              className="text-4xl font-medium text-(--hub-blue) shadow-[inset_0_-1px_#c7d2fe,inset_0_0_0_1px_#c7d2fe,0_4px_12px_-4px_#4b6bfb40] [background:linear-gradient(to_bottom,#f5f7ff,#e8edff)] sm:text-5xl lg:text-6xl dark:text-[#8aa0ff] dark:shadow-[inset_0_0_0_1px_#4b6bfb55] dark:[background:linear-gradient(to_bottom,#1e2340,#171b30)]"
            />
            <span>全部串起來</span>
          </span>
        </h1>
        <div className="grid max-w-[40ch] text-center text-base text-pretty text-(--hub-muted)">
          {MODULE_HIGHLIGHTS.map((highlight, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.p
                key={highlight.word}
                aria-hidden={!isActive}
                className="[grid-area:1/1]"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  filter: isActive || shouldReduceMotion ? "blur(0px)" : "blur(4px)",
                  y: isActive || shouldReduceMotion ? 0 : 4,
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
              >
                {highlight.description}
              </motion.p>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <PillLink href="#features" variant="solid">
            開始使用
          </PillLink>
          <PillLink href="#modules" variant="outline">
            了解功能模組
          </PillLink>
        </div>
      </div>

      <Diagram />
    </section>
  );
}
