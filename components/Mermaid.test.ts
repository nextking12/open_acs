import { describe, expect, it } from "vitest";
import {
  hasMermaidConfigDirective,
  sanitizeMermaidSvg,
} from "./Mermaid";

describe("Mermaid security", () => {
  it("rejects diagram-level configuration overrides", () => {
    expect(
      hasMermaidConfigDirective(
        "%%{init: {'securityLevel': 'loose'}}%%\ngraph TD\nA-->B",
      ),
    ).toBe(true);
    expect(hasMermaidConfigDirective("graph TD\nA-->B")).toBe(false);
  });

  it("removes executable content from generated SVG", () => {
    const sanitized = sanitizeMermaidSvg(
      '<svg onload="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">A</a></svg>',
    );

    expect(sanitized).not.toContain("<script");
    expect(sanitized).not.toContain("onload");
    expect(sanitized).not.toContain("javascript:");
  });
});
