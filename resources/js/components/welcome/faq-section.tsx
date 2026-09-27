import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  GridLineHorizontal,
  GridLineVertical,
} from "@/components/welcome/dashed-grid-line";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "導入與費用",
    items: [
      {
        question: "導入需要多久時間？",
        answer:
          "一般中小企業約 2 到 4 週即可上線。顧問會先盤點現有流程，協助匯入客戶、品項與期初庫存資料，並安排教育訓練。",
      },
      {
        question: "費用怎麼計算？",
        answer:
          "依使用模組與帳號數按月計費，沒有一次性的高額授權費。可以先從進銷存開始，之後再加購財務、生產等模組。",
      },
      {
        question: "可以先試用嗎？",
        answer:
          "可以。提供 30 天免費試用，所有模組都能使用，試用期間的資料在正式簽約後可直接沿用。",
      },
    ],
  },
  {
    title: "功能與整合",
    items: [
      {
        question: "舊系統或 Excel 的資料能搬過來嗎？",
        answer:
          "可以。支援 Excel、CSV 匯入，也能透過 API 與既有系統串接，顧問會協助確認欄位對應與資料正確性。",
      },
      {
        question: "可以依照公司流程客製簽核嗎？",
        answer:
          "可以。簽核關卡、金額門檻與代理人都能在後台自行設定，不需要額外開發。",
      },
      {
        question: "有手機版嗎？",
        answer:
          "有。業務與主管可以在手機上查庫存、看報表、線上簽核，外出也不會卡住流程。",
      },
    ],
  },
  {
    title: "資料安全",
    items: [
      {
        question: "資料放在哪裡？安全嗎？",
        answer:
          "資料存放於國內機房，傳輸與儲存全程加密，每日自動備份並保留異地副本。",
      },
      {
        question: "如果不續約，資料怎麼辦？",
        answer:
          "資料永遠屬於你。任何時候都能完整匯出所有單據與報表，不會被綁住。",
      },
    ],
  },
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleQuestion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-4xl scroll-mt-24 overflow-hidden px-4 py-20 md:px-8 md:py-28"
    >
      <div className="text-center">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          常見問題
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-(--hub-muted)">
          導入 ERP 前最常被問到的問題，找不到答案也歡迎直接聯絡我們。
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mt-16 flex w-full flex-col gap-12 px-4 md:px-8"
      >
        {faqData.map((section) => (
          <div key={section.title}>
            <h3 className="mb-6 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {section.title}
            </h3>
            <div className="flex flex-col gap-3">
              {section.items.map((item, index) => {
                const id = `${section.title}-${index}`;
                const isActive = activeId === id;

                return (
                  <div
                    key={id}
                    className={cn(
                      "relative rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10"
                        : "hover:bg-neutral-100/70 dark:hover:bg-neutral-900",
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0">
                        <GridLineHorizontal className="-top-[2px]" offset="100px" />
                        <GridLineHorizontal className="-bottom-[2px]" offset="100px" />
                        <GridLineVertical className="-left-[2px]" offset="100px" />
                        <GridLineVertical className="-right-[2px] left-auto" offset="100px" />
                      </div>
                    )}
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => toggleQuestion(id)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-neutral-700 md:text-base dark:text-neutral-300">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 shrink-0"
                      >
                        <Plus className="size-5 text-neutral-500 dark:text-neutral-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15, ease: "easeInOut" }}
                          className="relative"
                        >
                          <p className="max-w-[90%] px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-400">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
