import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import { cn } from "@/lib/utils";

const PRESS = { scale: 0.96 } as const;
const PRESS_TRANSITION = {
  duration: 0.12,
  ease: [0.23, 1, 0.32, 1] as const,
};

export function PillLink({
  href,
  children,
  variant,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "outline";
  className?: string;
  onClick?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileTap={shouldReduceMotion ? undefined : PRESS}
      transition={PRESS_TRANSITION}
      className={cn(
        "group relative inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 py-2 text-base font-medium sm:min-h-10 sm:text-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--hub-ink)",
        variant === "solid" &&
          "bg-(--hub-ink) text-(--hub-card) hover:bg-(--hub-ink)/85",
        variant === "outline" &&
          "bg-(--hub-card) text-(--hub-ink) ring-1 ring-black/10 hover:bg-black/3 dark:ring-white/12 dark:hover:bg-white/5",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
