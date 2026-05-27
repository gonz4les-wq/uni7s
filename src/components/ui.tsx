import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useApp } from "../store/AppContext";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "subtle";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100";
  const variants = {
    primary:
      "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25",
    ghost: "glass text-fg hover:border-brand-400/40",
    subtle: "bg-surface2 text-muted hover:text-fg",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-3xl p-5 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function ScoreBar({
  value,
  label,
  right,
}: {
  value: number;
  label?: string;
  right?: string;
}) {
  return (
    <div>
      {(label || right) && (
        <div className="mb-1 flex items-center justify-between text-sm text-muted">
          <span>{label}</span>
          <span className="tabular-nums text-faint">{right}</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400 transition-[width] duration-700"
          style={{ width: `${Math.max(3, value)}%` }}
        />
      </div>
    </div>
  );
}

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "good" | "warn" | "bad" | "brand";
}) {
  const tones = {
    default: "bg-surface2 text-muted",
    good: "bg-emerald-500/15 text-emerald-500",
    warn: "bg-amber-500/15 text-amber-500",
    bad: "bg-rose-500/15 text-rose-500",
    brand: "bg-brand-500/15 text-brandtext",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ScorePill({ value }: { value: number }) {
  const { t } = useApp();
  const tone = value >= 75 ? "good" : value >= 50 ? "brand" : "default";
  return (
    <Chip tone={tone}>
      {value}% {t("card.match")}
    </Chip>
  );
}
