import type { Deal, Summary } from "./types";

const API_BASE = "http://localhost:8000";

export async function fetchDeals(): Promise<Deal[]> {
  const res = await fetch(`${API_BASE}/api/deals`);
  if (!res.ok) throw new Error(`Failed to fetch deals: ${res.status}`);
  return res.json();
}

export async function fetchDeal(id: string): Promise<Deal> {
  const res = await fetch(`${API_BASE}/api/deals/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch deal ${id}: ${res.status}`);
  return res.json();
}

export async function fetchSummary(): Promise<Summary> {
  const res = await fetch(`${API_BASE}/api/summary`);
  if (!res.ok) throw new Error(`Failed to fetch summary: ${res.status}`);
  return res.json();
}

// Email draft endpoint — wired in Step 6. Returning a typed placeholder
// now so the components can be wired ahead of the backend route.
export async function draftEmail(dealId: string): Promise<{ subject: string; body: string }> {
  const res = await fetch(`${API_BASE}/api/deals/${dealId}/draft-email`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(`Failed to draft email: ${res.status}`);
  return res.json();
}