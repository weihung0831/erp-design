"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

export const Grid = ({
  pattern,
  size,
  className,
}: {
  pattern: number[][];
  size: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size}
          height={size}
          x="-12"
          y="4"
          squares={pattern}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number;
  height: number;
  x: number | string;
  y: number | string;
  squares: number[][];
} & React.SVGProps<SVGSVGElement>) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([squareX, squareY]) => (
          <rect
            strokeWidth="0"
            key={`${squareX}-${squareY}`}
            width={width + 1}
            height={height + 1}
            x={squareX * width}
            y={squareY * height}
          />
        ))}
      </svg>
    </svg>
  );
}
