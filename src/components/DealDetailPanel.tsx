import { useState } from "react";
import type { Deal } from "../utils/types";
import { fmtMoneyFull, fmtDate, BUCKET_STYLES } from "../utils/format";
import { RiskBadge } from "./RiskBadge";
import { EmailDraftModal } from "./EmailDraftModal";

interface Props {
  deal: Deal;
  onClose: () => void;
}

export function DealDetailPanel({ deal, onClose }: Props) {
  const [emailOpen, setEmailOpen] = useState(false);
  const accent = BUCKET_STYLES[deal.bucket];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-slate-950 border-l border-slate-800 z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs text-slate-500 mb-1">{deal.id}</div>
              <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                {deal.account_name}
              </h2>
              <div className="flex items-center gap-3 text-sm">
                <RiskBadge score={deal.score} bucket={deal.bucket} />
                <span className="text-slate-400">
                  {fmtMoneyFull(deal.amount)} · {deal.stage}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Owned by {deal.owner} · Expected close{" "}
                {fmtDate(deal.expected_close_date)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-200 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Risk breakdown */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3">
              Why this deal is at risk
            </h3>
            <div className="space-y-2">
              {deal.breakdown.map((item) => (
                <div
                  key={item.rule}
                  className="flex items-start gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-md"
                >
                  <div
                    className={`flex-shrink-0 w-12 text-center py-1 rounded text-xs font-semibold ${
                      item.points > 0
                        ? accent.badge
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {item.points > 0 ? `+${item.points}` : "0"}
                  </div>
                  <div className="text-sm text-slate-300 pt-0.5">
                    {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next step / activity */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3">
              Recent activity
            </h3>
            <div className="space-y-3">
              {deal.recent_emails.map((email, i) => (
                <div key={i} className="border-l-2 border-slate-700 pl-3">
                  <div className="text-xs text-slate-500 mb-1">
                    {fmtDate(email.date)} ·{" "}
                    <span
                      className={
                        email.from === "customer"
                          ? "text-blue-400"
                          : "text-slate-400"
                      }
                    >
                      {email.from === "customer" ? "Customer" : "Rep"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300 italic">
                    "{email.snippet}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — the magic moment */}
          <button
            onClick={() => setEmailOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Draft Re-engagement Email
          </button>

          {/* Debug — _profile ground truth, requested */}
          <div className="mt-4 text-xs text-slate-600 text-center">
            generator profile: {deal._profile}
          </div>
        </div>
      </div>

      {emailOpen && (
        <EmailDraftModal
          deal={deal}
          onClose={() => setEmailOpen(false)}
        />
      )}
    </>
  );
}