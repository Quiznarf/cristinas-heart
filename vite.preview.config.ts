// Builds the entire app into ONE self-contained HTML file (dist-preview/index.html)
// for easy sharing and previewing — no server, no install needed.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
  build: {
    outDir: "dist-preview",
  },
});
