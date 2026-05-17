import type { Summary } from "../utils/types";
import { fmtMoney } from "../utils/format";

interface Props {
  summary: Summary;
}

export function KpiCards({ summary }: Props) {
  const atRiskPct = Math.round(
    (summary.pipeline_at_risk / summary.total_pipeline) * 100
  );

  const cards = [
    {
      label: "Pipeline at Risk",
      value: fmtMoney(summary.pipeline_at_risk),
      sub: `${atRiskPct}% of $${fmtMoney(summary.total_pipeline).slice(1)} total`,
      accent: "text-red-400",
    },
    {
      label: "Red Deals",
      value: String(summary.red_count),
      sub: "Need action this week",
      accent: "text-red-400",
    },
    {
      label: "Yellow Deals",
      value: String(summary.yellow_count),
      sub: "Watch closely",
      accent: "text-amber-400",
    },
    {
      label: "Avg Days Silent",
      value: `${summary.avg_silence_days}d`,
      sub: "Across all open deals",
      accent: "text-slate-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-slate-900/60 border border-slate-800 rounded-lg p-5"
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            {card.label}
          </div>
          <div className={`text-3xl font-semibold ${card.accent} mb-1`}>
            {card.value}
          </div>
          <div className="text-xs text-slate-500">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}