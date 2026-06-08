import type { HTMLAttributes } from "react";
import { cn } from "../utils";

const variantClasses = {
  primary: "bg-primary text-white",
  green: "bg-green text-white",
  dark: "bg-dark text-white dark:bg-white/10",
  outlinePrimary: "border border-primary hover:bg-primary/10 text-primary",
  outlineGreen: "border border-green hover:bg-green/10 text-green",
  outlineDark:
    "border border-dark hover:bg-dark/10 text-dark dark:hover:bg-white/10 dark:border-white/25 dark:text-white",
};

const shapeClasses = {
  default: "",
  rounded: "rounded-[5px]",
  full: "rounded-full",
};

const sizeClasses = {
  default: "py-3.5 px-10 py-3.5 lg:px-8 xl:px-10",
  small: "py-[11px] px-6",
};

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  {
    label: string;
    icon?: React.ReactNode;
    variant?: keyof typeof variantClasses;
    shape?: keyof typeof shapeClasses;
    size?: keyof typeof sizeClasses;
  };

export function Button({
  label,
  icon,
  variant,
  shape,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 font-medium transition focus:outline-none",
        variantClasses[variant ?? "primary"],
        shapeClasses[shape ?? "default"],
        sizeClasses[size ?? "default"],
        className,
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
