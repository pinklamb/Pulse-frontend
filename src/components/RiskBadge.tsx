import type { Bucket } from "../utils/types";
import { BUCKET_STYLES } from "../utils/format";

interface Props {
  score: number;
  bucket: Bucket;
}

export function RiskBadge({ score, bucket }: Props) {
  const styles = BUCKET_STYLES[bucket];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${styles.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {score}
    </span>
  );
}