import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  // A GitHub Pages project site is served from the path of its URL; local dev
  // and plain builds stay at the root.
  const sitePath = env.VITE_SITE_URL?.replace(/^https?:\/\/[^/]+/, "") || "/";
  const base = mode === "github-pages" ? sitePath : "/";

  return {
    base,
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      // The cloud preview origin is a *.style.dev subdomain.
      allowedHosts: [".style.dev", "localhost", "127.0.0.1"],
    },
    build: {
      target: "es2020",
      chunkSizeWarningLimit: 1200,
    },
  };
});
