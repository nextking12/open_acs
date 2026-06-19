import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("shows the completed/total count and percentage", () => {
    render(<ProgressBar completed={1} total={4} />);

    expect(screen.getByText("1 of 4 lessons complete")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "25",
    );
  });

  it("rounds the percentage to a whole number", () => {
    render(<ProgressBar completed={1} total={3} />);

    // 1/3 = 33.33% -> 33
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("reports 0% when there are no lessons (no divide-by-zero)", () => {
    render(<ProgressBar completed={0} total={0} />);

    expect(screen.getByText("0 of 0 lessons complete")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });
});
