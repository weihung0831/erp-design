"use client";
import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

export function AnimatedNumber({
  value,
  initial = 0,
  decimals = 0,
}: {
  value: number;
  initial?: number;
  decimals?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(initial, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
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
