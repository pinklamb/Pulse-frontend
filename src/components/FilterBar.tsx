import type { Bucket } from "../utils/types";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  bucket: Bucket | "all";
  setBucket: (b: Bucket | "all") => void;
  owner: string;
  setOwner: (o: string) => void;
  ownerOptions: string[];
}

export function FilterBar({
  search,
  setSearch,
  bucket,
  setBucket,
  owner,
  setOwner,
  ownerOptions,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by account…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-[200px] bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600"
      />

      <select
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-slate-600"
      >
        <option value="all">All reps</option>
        {ownerOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md p-1">
        {(["all", "red", "yellow", "green"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBucket(b)}
            className={`px-3 py-1 text-xs rounded ${
              bucket === b
                ? "bg-slate-700 text-slate-100"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {b === "all" ? "All" : b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}