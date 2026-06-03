import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Set base for Hostinger
  vite: {
    base: "/",
    build: {
      outDir: "dist",
    }
  },
  // Explicitly disable Cloudflare to avoid build issues
  cloudflare: false,
});
