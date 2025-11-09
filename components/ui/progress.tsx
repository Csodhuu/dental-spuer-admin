"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export function Progress({ value = 0, max = 100, className, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), max) / max;

  return (
    <div
      className={cn("relative h-3 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={Math.round(percentage * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className="h-full w-full origin-left scale-x-0 transform bg-primary transition-transform duration-500"
        style={{ transform: `scaleX(${percentage})` }}
      />
    </div>
  );
}
