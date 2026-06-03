import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const basePath = process.env.VITE_BASE_PATH || "/";
const isGitHubPages = basePath === "/ignyte/";

// This config is ONLY used for the static GitHub Pages build.
// It bypasses TanStack Start's SSR pipeline and builds a pure client-side SPA.
export default defineConfig({
  base: basePath,
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: "dist/static",
    rollupOptions: {
      input: isGitHubPages ? "index.static.html" : "index.html",
    },
  },
});
