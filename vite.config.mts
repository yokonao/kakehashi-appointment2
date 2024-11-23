import fs from "fs";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: 'manifest.json',
    rollupOptions: {
      input: ["front/packs/admin.tsx", "front/packs/app.tsx"],
    },
  },
  publicDir: false,
  server: {
    port: 14000,
    watch: {
      // ignore all without front directory and vite.config.js
      ignored: fs
        .readdirSync(".")
        .filter((a: any) => !(a === "front" || a === "vite.config.mts"))
        .map((a: any) => `${__dirname}/${a}`),
    },
  },
});
