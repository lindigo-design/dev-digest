/* GroupHeader — sticky header of one Smart Diff role group: fold chevron + marker + label + description,
   then "● N" (files with findings), file count and the expand/collapse-all-files icon button.
   i18n-free by design: /showcase renders it without an intl provider, so callers pass `labels`.
   Spec: client/specs/smart-diff.md (C2, C5, C15) */
"use client";

import React from "react";
import { Button, Icon } from "@devdigest/ui";
import { s } from "./styles";

export interface GroupHeaderLabels {
  title: string;
  description: string;
  /** e.g. "3 files" */
  files: string;
  /** e.g. "● 2" — shown only when `findingFiles > 0` */
  findingFiles: string;
  findingFilesHint: string;
  /** Accessible name of the expand/collapse-all-files icon button ("Expand all" / "Collapse all"). */
  toggleAll: string;
}

export interface GroupHeaderProps {
  color: string;
  fileCount: number;
  findingFiles: number;
  /** The group is unfolded (its files are listed). */
  open: boolean;
  onToggleOpen: () => void;
  allOpen: boolean;
  onToggleAll: () => void;
  /** Offset (px) below the sticky PrDetailHeader. */
  stickyTop: number;
  labels: GroupHeaderLabels;
}

export function GroupHeader({
  color,
  fileCount,
  findingFiles,
  open,
  onToggleOpen,
  allOpen,
  onToggleAll,
  stickyTop,
  labels,
}: GroupHeaderProps) {
  const empty = fileCount === 0;
  const label = (
    <>
      <span aria-hidden="true" style={s.marker(color)} />
      {labels.title}
    </>
  );
  return (
    <div style={s.root(stickyTop)}>
      <h3 style={s.title}>
        {empty ? (
          <span style={s.foldStatic}>
            <span style={s.chevronSlot} />
            {label}
          </span>
        ) : (
          <button type="button" aria-expanded={open} onClick={onToggleOpen} style={s.foldButton}>
            <Icon.ChevronRight size={14} aria-hidden style={s.chevron(open)} />
            {label}
          </button>
        )}
      </h3>
      <span style={s.description}>{labels.description}</span>
      <div style={s.right}>
        {findingFiles > 0 && (
          <span style={s.findingFiles} title={labels.findingFilesHint} aria-label={labels.findingFilesHint}>
            {labels.findingFiles}
          </span>
        )}
        <span style={s.files}>{labels.files}</span>
        {!empty && open && (
          <Button
            type="button"
            kind="tertiary"
            size="sm"
            icon="ChevronsUpDown"
            aria-label={labels.toggleAll}
            title={labels.toggleAll}
            aria-expanded={allOpen}
            onClick={onToggleAll}
          />
        )}
      </div>
    </div>
  );
}

export default GroupHeader;
