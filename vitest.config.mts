import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // Only "@/..." (the tsconfig path), never scoped packages such as @vitest/* or @upstash/*.
      { find: /^@\//, replacement: root },
      // `server-only` throws outside a React Server Components bundle; tests import the server code directly.
      { find: "server-only", replacement: root + "tests/server-only-stub.ts" },
    ],
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
