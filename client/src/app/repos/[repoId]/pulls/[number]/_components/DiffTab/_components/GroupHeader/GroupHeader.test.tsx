import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GroupHeader } from "./GroupHeader";

const LABELS = {
  title: "Core changes",
  description: "Logic that matters most",
  files: "3 files",
  findingFiles: "● 1",
  findingFilesHint: "1 file with findings",
  toggleAll: "Expand all",
};

function renderHeader(props: Partial<React.ComponentProps<typeof GroupHeader>> = {}) {
  const onToggleAll = vi.fn();
  const onToggleOpen = vi.fn();
  render(
    <GroupHeader
      color="var(--viz-1)"
      fileCount={3}
      findingFiles={1}
      open
      onToggleOpen={onToggleOpen}
      allOpen={false}
      onToggleAll={onToggleAll}
      stickyTop={0}
      labels={LABELS}
      {...props}
    />,
  );
  return { onToggleAll, onToggleOpen };
}

describe("GroupHeader", () => {
  it("lays out fold + label + description left, then dot N, files, toggle-all icon on the right", () => {
    const { onToggleAll } = renderHeader();
    const title = screen.getByRole("heading", { level: 3, name: "Core changes" });
    const description = screen.getByText("Logic that matters most");
    const dot = screen.getByText("● 1");
    const files = screen.getByText("3 files");
    const toggle = screen.getByRole("button", { name: "Expand all" });
    const follows = (a: Node, b: Node) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    expect(follows(title, description)).toBe(true);
    expect(follows(description, dot)).toBe(true);
    expect(follows(dot, files)).toBe(true);
    expect(follows(files, toggle)).toBe(true);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveTextContent(""); // icon-only, named by aria-label
    fireEvent.click(toggle);
    expect(onToggleAll).toHaveBeenCalledTimes(1);
  });

  it("the title is a fold button that reflects and toggles the group's open state", () => {
    const { onToggleOpen } = renderHeader({ open: false });
    const fold = screen.getByRole("button", { name: "Core changes" });
    expect(fold).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(fold);
    expect(onToggleOpen).toHaveBeenCalledTimes(1);
    // Folded: the counts stay, the toggle-all button goes (there are no files on screen to toggle).
    expect(screen.getByText("● 1")).toBeInTheDocument();
    expect(screen.getByText("3 files")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Expand all" })).not.toBeInTheDocument();
  });

  it("an empty group has no fold button and no toggle-all", () => {
    renderHeader({ fileCount: 0, findingFiles: 0, labels: { ...LABELS, files: "0 files" } });
    expect(screen.getByRole("heading", { level: 3, name: "Core changes" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("hides the dot counter at 0 findings and reflects allOpen", () => {
    renderHeader({ findingFiles: 0, allOpen: true });
    expect(screen.queryByText(/●/)).not.toBeInTheDocument();
    // Nothing else (e.g. a stray "0" text node from `findingFiles && …`) may render next to files + toggle.
    const right = screen.getByText("3 files").parentElement;
    expect(right?.textContent).toBe("3 files");
    expect(screen.getByRole("button", { name: "Expand all" })).toHaveAttribute("aria-expanded", "true");
  });

  it("is sticky below the offset given by stickyTop", () => {
    renderHeader({ stickyTop: 64 });
    const root = screen.getByRole("heading", { level: 3 }).parentElement;
    expect(root).toHaveStyle({ position: "sticky", top: "64px" });
  });
});
