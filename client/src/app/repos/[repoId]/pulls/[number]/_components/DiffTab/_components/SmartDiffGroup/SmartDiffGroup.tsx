"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { DiffViewer, type DiffCommentApi, type DiffFindingApi } from "@/components/diff-viewer";
import { countFilesWithFindings, defaultFileOpen, type DiffGroupView } from "../../helpers";
import { GROUP_COLOR, GROUP_DESCRIPTION_KEY, GROUP_LABEL_KEY } from "../../constants";
import { GroupHeader } from "../GroupHeader";
import { s } from "./styles";

interface SmartDiffGroupProps {
  group: DiffGroupView;
  commenting: DiffCommentApi;
  findings: DiffFindingApi;
  stickyTop: number;
}

export function SmartDiffGroup({ group, commenting, findings, stickyTop }: SmartDiffGroupProps) {
  const t = useTranslations("prReview");
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});
  // The whole group folds down to its header (label, ● N, file count); per-file state is kept.
  const [open, setOpen] = React.useState(true);

  const { role, files } = group;
  const isOpen = (path: string): boolean => {
    const override = overrides[path];
    if (override !== undefined) return override;
    const file = files.find((f) => f.path === path);
    return file ? defaultFileOpen(role, file) : false;
  };
  const allOpen = files.length > 0 && files.every((f) => isOpen(f.path));
  const findingFiles = countFilesWithFindings(
    files.map((f) => f.path),
    findings.findings,
  );

  const toggle = (path: string) => setOverrides((prev) => ({ ...prev, [path]: !isOpen(path) }));
  const toggleAll = () => setOverrides(Object.fromEntries(files.map((f) => [f.path, !allOpen])));

  return (
    <div style={s.root}>
      <GroupHeader
        color={GROUP_COLOR[role]}
        fileCount={files.length}
        findingFiles={findingFiles}
        open={open}
        onToggleOpen={() => setOpen((v) => !v)}
        allOpen={allOpen}
        onToggleAll={toggleAll}
        stickyTop={stickyTop}
        labels={{
          title: t(`smartDiff.${GROUP_LABEL_KEY[role]}`),
          description: t(`smartDiff.${GROUP_DESCRIPTION_KEY[role]}`),
          files: t("smartDiff.filesCount", { count: files.length }),
          findingFiles: t("smartDiff.filesWithFindings", { count: findingFiles }),
          findingFilesHint: t("smartDiff.filesWithFindingsHint", { count: findingFiles }),
          toggleAll: t(allOpen ? "smartDiff.collapseAll" : "smartDiff.expandAll"),
        }}
      />
      {open && files.length > 0 && (
        <DiffViewer files={files} commenting={commenting} findings={findings} expansion={{ isOpen, toggle }} />
      )}
    </div>
  );
}

export default SmartDiffGroup;
