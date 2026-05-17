// Tiny formatter helpers used by multiple components.

export function fmtMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

export function fmtMoneyFull(n: number): string {
  return `$${n.toLocaleString()}`;
}

export function daysAgo(iso: string): number {
  const then = new Date(iso);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Tailwind class fragments for the three risk buckets.
export const BUCKET_STYLES = {
  red: {
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
    dot: "bg-red-500",
    text: "text-red-400",
    bar: "bg-red-500",
  },
  yellow: {
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    dot: "bg-amber-500",
    text: "text-amber-400",
    bar: "bg-amber-500",
  },
  green: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    bar: "bg-emerald-500",
  },
} as const;