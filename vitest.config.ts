import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom gives tests a fake browser DOM so we can render React components.
    environment: "jsdom",
    // Runs before each test file; loads the jest-dom matchers (e.g. toBeInTheDocument).
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    // Mirror the "@/..." path alias from tsconfig.json so imports resolve in tests.
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
