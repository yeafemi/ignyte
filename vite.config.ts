import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Set base for GitHub Pages (e.g., /ignyte/)
  vite: {
    base: "/ignyte/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
