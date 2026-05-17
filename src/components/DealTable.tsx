import type { Deal } from "../utils/types";
import { fmtMoney, daysAgo } from "../utils/format";
import { RiskBadge } from "./RiskBadge";

interface Props {
  deals: Deal[];
  onSelect: (id: string) => void;
}

export function DealTable({ deals, onSelect }: Props) {
  if (deals.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-12 text-center text-slate-500">
        No deals match the current filters.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/60 text-xs uppercase tracking-wider text-slate-400">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Risk</th>
            <th className="text-left px-4 py-3 font-medium">Account</th>
            <th className="text-left px-4 py-3 font-medium">Owner</th>
            <th className="text-left px-4 py-3 font-medium">Stage</th>
            <th className="text-right px-4 py-3 font-medium">Amount</th>
            <th className="text-right px-4 py-3 font-medium">Days Silent</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              key={deal.id}
              onClick={() => onSelect(deal.id)}
              className="border-t border-slate-800 hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3">
                <RiskBadge score={deal.score} bucket={deal.bucket} />
              </td>
              <td className="px-4 py-3 text-slate-100 font-medium">
                {deal.account_name}
              </td>
              <td className="px-4 py-3 text-slate-400">{deal.owner}</td>
              <td className="px-4 py-3 text-slate-400">{deal.stage}</td>
              <td className="px-4 py-3 text-right text-slate-100 tabular-nums">
                {fmtMoney(deal.amount)}
              </td>
              <td className="px-4 py-3 text-right text-slate-400 tabular-nums">
                {daysAgo(deal.last_customer_activity_date)}d
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}