import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Set base for GitHub Pages
  vite: {
    base: "/ignyte/",
    build: {
      outDir: "dist",
    }
  },
  // Explicitly disable Cloudflare to avoid build issues
  cloudflare: false,
});
