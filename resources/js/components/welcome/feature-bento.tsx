import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  Factory,
  Handshake,
  Landmark,
  MousePointer2,
  Package,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Person = {
  name: string;
  initial: string;
  color: string;
};

const MANAGER: Person = { name: "王經理", initial: "王", color: "#4b6bfb" };
const ME: Person = { name: "你", initial: "我", color: "#10b981" };
const WAREHOUSE: Person = { name: "倉管", initial: "倉", color: "#f97316" };

function Avatar({ person, className }: { person: Person; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-medium text-white",
        className,
      )}
      style={{ backgroundColor: person.color }}
    >
      {person.initial}
    </span>
  );
}

export default function FeatureBento() {
  const cards = [
    {
      title: "簽核即時通知",
      description: "採購、請款、出貨單據一送出，負責人立刻收到通知並線上簽核。",
      skeleton: <ApprovalSkeleton />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "單據自動流轉",
      description: "報價轉訂單、訂單轉出貨、出貨轉發票，一鍵帶出不重打。",
      skeleton: (
        <DocumentFlowSkeleton className="scale-125 mask-r-from-80% mask-l-from-80%" />
      ),
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "跨部門協作",
      description: "業務、倉管與財務同時編輯同一份資料，誰改了什麼一目了然。",
      skeleton: <CollaborationSkeleton />,
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "模組彈性組合",
      description: "依企業規模挑選需要的模組，隨業務成長再逐步擴充。",
      skeleton: <ModulesGrid />,
      className: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section
      id="features"
      className="scroll-mt-24 px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          為企業日常而生
        </h2>
        <p className="max-w-xl text-(--hub-muted)">
          把每天重複的流程交給系統，團隊專心做真正重要的事。
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-[auto_auto]">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

const ApprovalSkeleton = ({ className }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const messages = [
    { id: 1, person: WAREHOUSE, text: "採購單 PO-2410 請協助簽核", isUser: false },
    { id: 2, person: MANAGER, text: "已核准 ✅", isUser: true },
    { id: 3, person: WAREHOUSE, text: "出貨單已建立，16:00 出貨", isUser: false },
    { id: 4, person: ME, text: "收到，庫存已自動扣帳", isUser: true },
  ];

  return (
    <div
      ref={ref}
      className={cn("flex h-full flex-col justify-center gap-2.5 px-5 py-6", className)}
    >
      {messages.map((message, index) => {
        const baseDelay = index * 0.3;
        return (
          <div
            key={message.id}
            className={`flex items-center gap-2 ${message.isUser ? "flex-row-reverse" : ""}`}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: baseDelay }}
            >
              <Avatar person={message.person} />
            </motion.span>
            <motion.div
              initial={{ opacity: 0, x: message.isUser ? 10 : -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: baseDelay + 0.15 }}
              className={cn(
                "rounded-xl px-3 py-1.5 text-[13px] shadow-sm ring-1 shadow-black/5",
                message.isUser
                  ? "bg-(--hub-blue) text-white ring-transparent"
                  : "bg-white text-neutral-700 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200",
              )}
            >
              {message.text}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const DocumentFlowSkeleton = ({ className }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const documents = ["報價", "訂單", "出貨"];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="relative h-px w-full">
            <div className="absolute inset-0 border-t border-dashed border-neutral-200 dark:border-neutral-700" />
            <motion.div
              className="absolute top-0 h-px w-12 bg-linear-to-r from-transparent via-blue-500 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              animate={
                isInView
                  ? {
                      x: ["0%", "800%"],
                      opacity: [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-end gap-12">
        <motion.div
          className="relative cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative"
            style={{ width: 72, height: 54, transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 rounded-lg bg-linear-to-b from-amber-400 to-amber-500 shadow-sm dark:from-amber-500 dark:to-amber-600">
              <div
                className="absolute left-1.5 rounded-t-sm bg-linear-to-b from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500"
                style={{ top: -8, width: 26, height: 10 }}
              />
            </div>

            {documents.map((label, index) => {
              const hoverY = -55 - (2 - index) * 5;
              const hoverX = (index - 1) * 32;
              const hoverRotation = (index - 1) * 12;
              const teaseY = -6 - (2 - index) * 2;
              const teaseRotation = (index - 1) * 3;

              return (
                <motion.div
                  key={label}
                  className="absolute top-1.5 left-1/2 flex origin-bottom flex-col gap-0.5 overflow-hidden rounded bg-white p-1 shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-800"
                  animate={{
                    x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                    y: isHovered ? hoverY : teaseY,
                    rotate: isHovered ? hoverRotation : teaseRotation,
                    width: isHovered ? 56 : 36,
                    height: isHovered ? 40 : 24,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.03,
                  }}
                  style={{ zIndex: 10 + index }}
                >
                  <span className="text-[7px] leading-none font-medium text-neutral-700 dark:text-neutral-200">
                    {label}
                  </span>
                  <span className="h-0.5 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-600" />
                  <span className="h-0.5 w-1/2 rounded-full bg-neutral-200 dark:bg-neutral-600" />
                </motion.div>
              );
            })}

            <motion.div
              className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-lg bg-linear-to-b from-amber-300 to-amber-400 shadow-sm dark:from-amber-400 dark:to-amber-500"
              animate={{
                rotateX: isHovered ? -45 : -25,
                scaleY: isHovered ? 0.8 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ transformStyle: "preserve-3d", zIndex: 20 }}
            >
              <div className="absolute top-2 right-2 left-2 h-px bg-amber-200/50 dark:bg-amber-300/50" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div
            className="relative rounded-lg bg-linear-to-b from-gray-50 to-gray-50 shadow-sm dark:from-neutral-700 dark:to-neutral-800"
            style={{ width: 56, height: 72 }}
          >
            <div className="absolute inset-x-1.5 top-1.5 h-3 rounded-sm bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900">
              <div className="flex h-full items-center justify-center gap-0.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-px bg-neutral-600 dark:bg-neutral-700"
                  />
                ))}
              </div>
            </div>

            <div className="absolute right-1.5 bottom-1.5 left-1.5 flex flex-col gap-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="h-4 rounded-sm bg-white shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:ring-white/10"
                >
                  <div className="mt-1 ml-1 h-0.5 w-3 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const INVENTORY_ROWS = [
  { item: "A4 影印紙", warehouse: "台北倉", quantity: 120, status: "bg-emerald-400" },
  { item: "碳粉匣", warehouse: "台北倉", quantity: 36, status: "bg-amber-400" },
  { item: "標籤貼紙", warehouse: "桃園倉", quantity: 480, status: "bg-emerald-400" },
  { item: "紙箱 (大)", warehouse: "桃園倉", quantity: 8, status: "bg-red-400" },
  { item: "膠帶", warehouse: "台中倉", quantity: 215, status: "bg-emerald-400" },
  { item: "棧板", warehouse: "台中倉", quantity: 42, status: "bg-amber-400" },
  { item: "氣泡袋", warehouse: "桃園倉", quantity: 760, status: "bg-emerald-400" },
  { item: "封箱機", warehouse: "台北倉", quantity: 3, status: "bg-red-400" },
  { item: "標籤機", warehouse: "台中倉", quantity: 12, status: "bg-amber-400" },
  { item: "打包帶", warehouse: "桃園倉", quantity: 390, status: "bg-emerald-400" },
];

const EDITED_ROW = "紙箱 (大)";
const EDITED_QUANTITY = 500;

const CollaborationSkeleton = ({ className }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (!isInView) {
      return;
    }
    const intervalId = window.setInterval(
      () => setIsEdited((value) => !value),
      2600,
    );
    return () => window.clearInterval(intervalId);
  }, [isInView]);

  const collaborators = [
    {
      id: 1,
      label: "業務部",
      person: MANAGER,
      path: [
        { x: 30, y: 60 },
        { x: 150, y: 150 },
        { x: 90, y: 250 },
        { x: 30, y: 60 },
      ],
    },
    {
      id: 2,
      label: "財務部",
      person: ME,
      path: [
        { x: 200, y: 300 },
        { x: 120, y: 90 },
        { x: 180, y: 200 },
        { x: 200, y: 300 },
      ],
    },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full items-center justify-center px-5 py-8",
        className,
      )}
    >
      <motion.div
        className="relative w-full max-w-[300px] rounded-xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:ring-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2.5 dark:border-white/10">
          <div className="flex gap-1">
            <div className="size-2 rounded-full bg-red-400" />
            <div className="size-2 rounded-full bg-yellow-400" />
            <div className="size-2 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
            庫存盤點表
          </span>
          <span className="ml-auto flex -space-x-1.5">
            <Avatar person={MANAGER} className="size-5 text-[9px] ring-2 ring-white dark:ring-neutral-900" />
            <Avatar person={ME} className="size-5 text-[9px] ring-2 ring-white dark:ring-neutral-900" />
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-3 pt-2 pb-1 text-[10px] font-medium text-neutral-400">
          <span>品項</span>
          <span>倉別</span>
          <span className="w-14 text-right">數量</span>
        </div>
        <div className="flex flex-col divide-y divide-neutral-100 px-3 pb-2 text-[11px] dark:divide-neutral-800">
          {INVENTORY_ROWS.map((row) => {
            const isEditedRow = row.item === EDITED_ROW;
            const showEdit = isEditedRow && isEdited;
            return (
              <div
                key={row.item}
                className="relative grid grid-cols-[1fr_auto_auto] items-center gap-x-4 py-1.5 text-neutral-600 dark:text-neutral-300"
              >
                <span>{row.item}</span>
                <span className="text-neutral-400">{row.warehouse}</span>
                <span
                  className={cn(
                    "relative flex w-14 items-center justify-end gap-1.5 rounded px-1 tabular-nums transition-colors duration-300",
                    showEdit && "bg-(--hub-blue)/10 ring-1 ring-(--hub-blue)",
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={showEdit ? "edited" : "original"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showEdit ? EDITED_QUANTITY : row.quantity}
                    </motion.span>
                  </AnimatePresence>
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      showEdit ? "bg-emerald-400" : row.status,
                    )}
                  />
                  {showEdit && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-1/2 right-full mr-1.5 -translate-y-1/2 rounded-sm bg-(--hub-blue) px-1 text-[8px] leading-3.5 whitespace-nowrap text-white"
                    >
                      業務部 編輯中
                    </motion.span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {collaborators.map((collaborator, index) => (
        <motion.div
          key={collaborator.id}
          className="absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: collaborator.path.map((p) => p.x),
                  y: collaborator.path.map((p) => p.y),
                }
              : {}
          }
          transition={{
            opacity: { duration: 0.3, delay: 0.5 + index * 0.2 },
            x: {
              duration: 8,
              delay: 0.5 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 8,
              delay: 0.5 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <MousePointer2
            className="size-5 drop-shadow-sm"
            style={{
              color: collaborator.person.color,
              fill: collaborator.person.color,
            }}
          />
          <div
            className="absolute top-5 left-3 z-50 flex w-max items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 shadow-sm"
            style={{ backgroundColor: collaborator.person.color }}
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/25 text-[9px] font-medium text-white ring-1 ring-white/30">
              {collaborator.person.initial}
            </span>
            <span className="shrink-0 text-[10px] font-medium text-white">
              {collaborator.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

type Module = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const MODULES: Module[] = [
  { title: "進銷存管理", description: "庫存水位即時掌握", icon: Package, color: "#f97316" },
  { title: "財務會計", description: "傳票報表自動彙整", icon: Landmark, color: "#4b6bfb" },
  { title: "生產排程", description: "工單物料一次到位", icon: Factory, color: "#64748b" },
  { title: "人事薪資", description: "出勤薪資整合計算", icon: Users, color: "#8b5cf6" },
  { title: "客戶關係", description: "商機進度全程追蹤", icon: Handshake, color: "#ec4899" },
  { title: "報表分析", description: "經營數據一眼看懂", icon: ChartColumn, color: "#0ea5e9" },
];

const ModulesGrid = ({ className }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      id="modules"
      className={cn(
        "grid h-full scroll-mt-32 grid-cols-2 content-center gap-2.5 p-5 sm:grid-cols-3",
        className,
      )}
    >
      {MODULES.map((module, index) => (
        <motion.div
          key={module.title}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: index * 0.08 }}
          whileHover={{ y: -3 }}
          className="group flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-900 dark:ring-white/10"
        >
          <span
            className="grid size-9 shrink-0 place-items-center rounded-lg transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: `${module.color}14`, color: module.color }}
          >
            <module.icon className="size-4.5" strokeWidth={1.75} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {module.title}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {module.description}
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const Card = ({
  title,
  description,
  skeleton,
  className,
}: {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-5 rounded-2xl bg-white p-3 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-neutral-950 dark:shadow-white/5 dark:ring-white/5",
        className,
      )}
    >
      <div className="relative min-h-56 w-full flex-1 overflow-hidden rounded-xl bg-neutral-50 bg-[radial-gradient(var(--hub-line)_1px,transparent_1px)] bg-size-[16px_16px] ring-1 ring-black/5 dark:bg-neutral-900/60 dark:ring-white/5">
        {skeleton}
      </div>
      <div className="shrink-0 px-3 pb-3">
        <h3 className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};
