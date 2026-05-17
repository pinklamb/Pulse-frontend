import { useEffect, useState } from "react";
import type { Deal } from "../utils/types";
import { draftEmail } from "../utils/api";

interface Props {
  deal: Deal;
  onClose: () => void;
}

export function EmailDraftModal({ deal, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    draftEmail(deal.id)
      .then((result) => {
        setSubject(result.subject);
        setBody(result.body);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [deal.id]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70">
      <div className="bg-slate-950 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                Re-engagement Email
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                To: {deal.account_name} · From: {deal.owner}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-200 text-2xl leading-none"
            >
            </button>
          </div>

          {loading && (
            <div className="py-12 text-center text-slate-400">
              <div className="inline-block w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-3" />
              <div className="text-sm">Drafting based on deal context…</div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-800 rounded text-sm text-red-300">
              Couldn't draft email: {error}
              <div className="text-xs text-red-400/70 mt-2">
                Make sure the backend is running and ANTHROPIC_API_KEY is set.
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block">
                  Subject
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block">
                  Body
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 leading-relaxed resize-y"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSent(true)}
                  disabled={sent}
                  className={`flex-1 font-semibold py-2.5 rounded-md transition-colors ${
                    sent
                      ? "bg-emerald-700 text-emerald-100"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  }`}
                >
                  {sent ? "✓ Sent (simulated)" : "Send"}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm text-slate-400 hover:text-slate-200"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}