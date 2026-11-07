import type { CSSProperties } from "react";

/** Co-located styles for LargePrBanner — CSS variables only. */
export const s = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "9px 14px",
    margin: "0 0 16px",
    border: "1px solid var(--warn)",
    borderRadius: 8,
    background: "var(--warn-bg)",
    color: "var(--warn)",
    fontSize: 13,
  } satisfies CSSProperties,
  icon: { flexShrink: 0 } satisfies CSSProperties,
} as const;
