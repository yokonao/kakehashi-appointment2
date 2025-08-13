import fs from "fs";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: "manifest.json",
    rollupOptions: {
      input: ["front/packs/admin.tsx", "front/packs/app.tsx"],
      onwarn(warning, warn) {
        // 特定モジュールの use client 警告を無視
        // Next.jsのApp Routerに対応するためのディレクティブであり無視されても問題ない
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client") &&
          (warning.loc?.file?.includes("node_modules/@mui/") ||
            warning.loc?.file?.includes("node_modules/react-router/"))
        ) {
          return;
        }
        warn(warning);
      },
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
