import { useEffect, useMemo, useState } from "react";
import { fetchDeals, fetchSummary } from "./utils/api";
import type { Deal, Summary, Bucket } from "./utils/types";
import { KpiCards } from "./components/KpiCards";
import { DealTable } from "./components/DealTable";
import { FilterBar } from "./components/FilterBar";
import { RepLeaderboard } from "./components/RepLeaderboard";
import { DealDetailPanel } from "./components/DealDetailPanel";

export default function App() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [bucket, setBucket] = useState<Bucket | "all">("all");
  const [owner, setOwner] = useState<string>("all");

  useEffect(() => {
    Promise.all([fetchDeals(), fetchSummary()])
      .then(([d, s]) => {
        setDeals(d);
        setSummary(s);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Owner dropdown options derived from data
  const ownerOptions = useMemo(() => {
    const set = new Set(deals.map((d) => d.owner));
    return Array.from(set).sort();
  }, [deals]);

  // Apply filters client-side — API already returns sorted by risk desc
  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (bucket !== "all" && d.bucket !== bucket) return false;
      if (owner !== "all" && d.owner !== owner) return false;
      if (search && !d.account_name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [deals, search, bucket, owner]);

  const selectedDeal = selectedId
    ? deals.find((d) => d.id === selectedId) ?? null
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin mb-3" />
          <div className="text-sm text-slate-400">Loading pipeline...</div>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center p-8">
        <div className="max-w-md bg-red-900/30 border border-red-800 rounded p-6">
          <div className="font-semibold text-red-300 mb-2">
            Couldn't load data.
          </div>
          <div className="text-sm text-red-400/80 mb-3">{error}</div>
          <div className="text-xs text-slate-400">
            Is the backend running on{" "}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded">
              http://localhost:8000
            </code>
            ?
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-100">
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-xs text-slate-500">
              {summary.total_deals} open deals tracked
            </div>
          </div>
        </header>

        <KpiCards summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          <div>
            <FilterBar
              search={search}
              setSearch={setSearch}
              bucket={bucket}
              setBucket={setBucket}
              owner={owner}
              setOwner={setOwner}
              ownerOptions={ownerOptions}
            />
            <DealTable deals={filtered} onSelect={setSelectedId} />
            <div className="mt-2 text-xs text-slate-500 text-center">
              Showing {filtered.length} of {deals.length} deals
            </div>
          </div>

          
          <aside>
            <RepLeaderboard leaderboard={summary.rep_leaderboard} />
          </aside>
        </div>
      </div>

      {selectedDeal && (
        <DealDetailPanel
          deal={selectedDeal}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}