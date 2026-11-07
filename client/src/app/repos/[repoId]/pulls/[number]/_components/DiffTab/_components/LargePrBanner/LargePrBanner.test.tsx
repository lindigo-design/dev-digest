import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LargePrBanner } from "./LargePrBanner";

describe("LargePrBanner", () => {
  it("is a one-line note with just the title — no dangling hint", () => {
    render(<LargePrBanner title="This PR is large (5099 changed lines)" />);
    expect(screen.getByRole("note")).toHaveTextContent(/^This PR is large \(5099 changed lines\)$/);
  });
});
