// Adds custom DOM matchers like toBeInTheDocument() / toHaveAttribute() to
// Vitest's expect(). Loaded once before the test suite via vitest.config.ts.
import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount anything rendered after each test so the DOM is empty for the next
// one. (Auto-runs only when Vitest globals are enabled, which we don't use.)
afterEach(() => {
  cleanup();
});
