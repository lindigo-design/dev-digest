import type { CSSProperties } from "react";

/** Co-located styles for GroupHeader — CSS variables only. */
export const s = {
  root: (stickyTop: number): CSSProperties => ({
    position: "sticky",
    top: stickyTop,
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    background: "var(--bg-primary)",
    borderBottom: "1px solid var(--border)",
  }),
  marker: (color: string): CSSProperties => ({
    width: 10,
    height: 10,
    borderRadius: 2,
    background: color,
    flexShrink: 0,
  }),
  title: {
    margin: 0,
    fontSize: 13.5,
    fontWeight: 600,
    color: "var(--text-primary)",
  } satisfies CSSProperties,
  foldButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: 0,
    border: "none",
    background: "transparent",
    font: "inherit",
    color: "inherit",
    cursor: "pointer",
  } satisfies CSSProperties,
  foldStatic: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    opacity: 0.75,
  } satisfies CSSProperties,
  chevronSlot: { width: 14, flexShrink: 0 } satisfies CSSProperties,
  chevron: (open: boolean): CSSProperties => ({
    color: "var(--text-muted)",
    flexShrink: 0,
    transform: open ? "rotate(90deg)" : "none",
    transition: "transform .15s",
  }),
  description: {
    fontSize: 12,
    color: "var(--text-muted)",
  } satisfies CSSProperties,
  right: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 10,
  } satisfies CSSProperties,
  findingFiles: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--crit)",
  } satisfies CSSProperties,
  files: {
    fontSize: 12,
    color: "var(--text-muted)",
  } satisfies CSSProperties,
} as const;
