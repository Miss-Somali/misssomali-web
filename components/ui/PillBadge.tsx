import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "gold";
}

export default function PillBadge({ children, className, variant = "primary" }: PillBadgeProps) {
  return (
    <span 
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase inline-block",
        variant === "primary" 
          ? "bg-[#0B2D6B]/10 text-[#0B2D6B] border border-[#0B2D6B]/20" 
          : "bg-[#E8C97A]/10 text-[#E8C97A] border border-[#E8C97A]/20",
        className
      )}
    >
      {children}
    </span>
  );
}
