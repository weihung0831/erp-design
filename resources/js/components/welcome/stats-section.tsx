import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export default function StatsSection() {
  const items = [
    {
      value: 1200,
      suffix: "+",
      label: "導入企業",
      description: "從十人工作室到上市櫃公司，都在用同一套平台管理營運。",
    },
    {
      value: 35,
      suffix: " 萬",
      label: "每月處理單據",
      description: "採購、銷貨、出貨與傳票，每一張都即時入帳、可追溯。",
    },
    {
      value: 70,
      suffix: "%",
      label: "月結時間縮短",
      description: "自動對帳與報表彙整，財務團隊不必再加班趕結帳。",
    },
    {
      value: 99,
      suffix: ".9%",
      label: "系統可用率",
      description: "雲端架構加上異地備份，營運資料全年無休。",
    },
  ];

  return (
    <section className="border-y border-black/6 bg-(--hub-card) px-4 py-20 sm:px-6 dark:border-white/8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-medium tracking-tight md:text-4xl">
          企業信賴的營運核心
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-(--hub-muted)">
          導入後的第一個月，就能看見流程與數字的改變。
        </p>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.label}
              className="flex flex-col gap-2 border-l border-(--hub-line) pl-5"
            >
              <p className="text-4xl font-semibold tracking-tight tabular-nums">
                <AnimatedNumber value={item.value} />
                <span className="text-(--hub-blue)">{item.suffix}</span>
              </p>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-sm text-balance text-(--hub-muted)">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({
  value,
  initial = 0,
}: {
  value: number;
  initial?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const spring = useSpring(initial, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    } else {
      spring.set(initial);
    }
  }, [isInView, spring, value, initial]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
