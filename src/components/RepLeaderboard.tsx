import type { RepRow } from "../utils/types";
import { fmtMoney } from "../utils/format";

interface Props {
  leaderboard: RepRow[];
}

export function RepLeaderboard({ leaderboard }: Props) {
  const max = leaderboard[0]?.at_risk_amount ?? 1;

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-slate-200 mb-1">
        Pipeline at Risk by Rep
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Reps with the most $ in highest risk of revenue loss deals
      </p>
      <div className="space-y-3">
        {leaderboard.slice(0, 8).map((rep) => {
          const widthPct = (rep.at_risk_amount / max) * 100;
          return (
            <div key={rep.owner}>
              <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="text-slate-300">{rep.owner}</span>
                <span className="text-slate-400 tabular-nums">
                  {fmtMoney(rep.at_risk_amount)}{" "}
                  <span className="text-slate-600">· {rep.at_risk_count}</span>
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
