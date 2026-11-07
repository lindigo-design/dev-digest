import type { CSSProperties } from "react";

/** Co-located styles for DiffTab — CSS variables only. */
export const s = {
  summary: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    margin: "-4px 0 16px",
    paddingBottom: 14,
    borderBottom: "1px solid var(--border)",
    fontSize: 13,
    color: "var(--text-secondary)",
  } satisfies CSSProperties,
  add: { color: "var(--ok)" } satisfies CSSProperties,
  del: { color: "var(--crit)" } satisfies CSSProperties,
  note: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    margin: "0 0 12px",
    fontSize: 12.5,
    color: "var(--text-secondary)",
  } satisfies CSSProperties,
  zap: { color: "var(--warn)", flexShrink: 0 } satisfies CSSProperties,
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
} as const;
