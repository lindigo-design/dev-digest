/* LargePrBanner — one-line warning above the groups when the PR is too big to review comfortably.
   i18n-free (strings as props) so /showcase can mount it. Spec: client/specs/smart-diff.md (C14) */
"use client";

import React from "react";
import { Icon } from "@devdigest/ui";
import { s } from "./styles";

export interface LargePrBannerProps {
  title: string;
}

export function LargePrBanner({ title }: LargePrBannerProps) {
  return (
    <div role="note" style={s.root}>
      <Icon.AlertTriangle size={14} aria-hidden style={s.icon} />
      <span>{title}</span>
    </div>
  );
}

export default LargePrBanner;
