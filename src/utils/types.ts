
export type Bucket = "red" | "yellow" | "green";

export interface BreakdownItem {
  rule: string;
  points: number;
  reason: string;
}

export interface EmailSnippet {
  date: string;
  from: "customer" | "rep";
  snippet: string;
}

export interface Deal {
  id: string;
  account_name: string;
  owner: string;
  amount: number;
  stage: string;
  created_date: string;
  expected_close_date: string;
  stage_entered_date: string;
  last_customer_activity_date: string;
  last_internal_activity_date: string;
  next_step: string;
  next_step_date: string | null;
  contacts_count: number;
  recent_emails: EmailSnippet[];
  _profile: "hero" | "red" | "yellow" | "green";
  // Added by the backend after scoring:
  score: number;
  bucket: Bucket;
  breakdown: BreakdownItem[];
}

export interface RepRow {
  owner: string;
  at_risk_amount: number;
  at_risk_count: number;
}

export interface Summary {
  total_deals: number;
  total_pipeline: number;
  pipeline_at_risk: number;
  red_count: number;
  yellow_count: number;
  green_count: number;
  avg_silence_days: number;
  rep_leaderboard: RepRow[];
}