import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// This config is ONLY used for the static GitHub Pages build.
// It bypasses TanStack Start's SSR pipeline and builds a pure client-side SPA.
export default defineConfig({
  base: "/ignyte/",
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: "dist/static",
    rollupOptions: {
      input: "index.static.html",
    },
  },
});
