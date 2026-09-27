import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";

const SHOW_AFTER_PX = 600;

export default function BackToTop() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > SHOW_AFTER_PX);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="回到頂部"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed right-4 bottom-4 z-50 grid size-11 cursor-pointer place-items-center rounded-full bg-(--hub-card) text-(--hub-ink) shadow-[0_8px_24px_-8px_oklch(0_0_0/0.25)] ring-1 ring-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--hub-ink) sm:right-6 sm:bottom-6 dark:ring-white/12"
        >
          <ArrowUp className="size-4.5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
