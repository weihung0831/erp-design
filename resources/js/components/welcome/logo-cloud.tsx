import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Armchair,
  Boxes,
  Building2,
  Cpu,
  Factory,
  Fish,
  FlaskConical,
  Gem,
  HardHat,
  Leaf,
  Microscope,
  Palette,
  Pill,
  Scissors,
  Shirt,
  Truck,
  UtensilsCrossed,
  Wheat,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const CUSTOMERS: { name: string; icon: LucideIcon }[] = [
  { name: "大宏科技", icon: Cpu },
  { name: "晴川貿易", icon: Anchor },
  { name: "青禾食品", icon: Wheat },
  { name: "北辰精密", icon: Wrench },
  { name: "森悅家居", icon: Armchair },
  { name: "宏遠物流", icon: Truck },
  { name: "嘉禾製藥", icon: Pill },
  { name: "瑞豐機械", icon: Factory },
  { name: "永信包材", icon: Boxes },
  { name: "立元紡織", icon: Shirt },
  { name: "光譜光電", icon: Gem },
  { name: "東峰營造", icon: HardHat },
  { name: "雲川生技", icon: Microscope },
  { name: "敦品設計", icon: Palette },
  { name: "和泰五金", icon: Building2 },
  { name: "金禾餐飲", icon: UtensilsCrossed },
  { name: "樂齡化工", icon: FlaskConical },
  { name: "海嶼水產", icon: Fish },
  { name: "綠洲農產", icon: Leaf },
  { name: "巧手成衣", icon: Scissors },
];

const LOGOS_PER_SET = 10;
const TOTAL_SETS = Math.ceil(CUSTOMERS.length / LOGOS_PER_SET);

export default function LogoCloud() {
  const [currentSet, setCurrentSet] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentSet((previous) => (previous + 1) % TOTAL_SETS);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentLogos = CUSTOMERS.slice(
    currentSet * LOGOS_PER_SET,
    currentSet * LOGOS_PER_SET + LOGOS_PER_SET,
  );

  return (
    <section
      aria-labelledby="customers-heading"
      className="overflow-hidden px-4 py-16 md:py-24"
    >
      <h2
        id="customers-heading"
        className="mx-auto max-w-xl text-center text-lg font-medium text-balance text-(--hub-muted)"
      >
        超過 1,200 家企業，每天用 ERP Design 管理營運。{" "}
        <br className="hidden sm:block" />
        <span className="text-(--hub-muted)/60">
          從十人工作室到上市櫃公司，都在同一套平台上。
        </span>
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {currentLogos.map((customer, index) => (
            <motion.div
              key={`${customer.name}-${currentSet}`}
              initial={{ x: 40, opacity: 0, filter: "blur(8px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ x: -40, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
              className="flex items-center justify-center gap-2 text-(--hub-ink)/70 transition-colors hover:text-(--hub-ink)"
            >
              <customer.icon className="size-5 shrink-0" strokeWidth={1.75} />
              <span className="text-base font-semibold tracking-tight whitespace-nowrap">
                {customer.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
