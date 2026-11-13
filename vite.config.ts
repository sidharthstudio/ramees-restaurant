import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // GitHub project pages live under /<repo>/.
  base: mode === "github-pages" ? "/ramees-restaurant/" : "/",
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
}));
