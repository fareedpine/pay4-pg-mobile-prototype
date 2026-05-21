import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/pay4-pg-mobile-prototype/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        brochure: resolve(__dirname, "brochure/index.html")
      }
    }
  }
});
