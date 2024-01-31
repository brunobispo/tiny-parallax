import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({ include: ["src"] }),
    {
      // see: https://github.com/vitest-dev/vitest/issues/5046
      name: "exclude-util-package",
      transform(_src: string, id: string) {
        if (/node_modules\/util/.test(id)) return { code: "", map: null };
      },
    },
  ] as never,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
  },
  test: {
    globals: true,
    setupFiles: ["./src/tests.ts"],
    browser: {
      enabled: true,
      name: "chromium",
      headless: true,
      provider: "playwright",
    },
  },
});
