import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts"],
    hookTimeout: 60_000,
    testTimeout: 30_000,
    setupFiles: ["tests/setup.ts"],
    // Integration tests share one database and namespaced fixture rows, so test
    // files must not run concurrently or they would tear down each other's data.
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
