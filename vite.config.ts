import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const proxyConfig = {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
};

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: proxyConfig,
  },
  preview: {
    port: 4173,
    proxy: proxyConfig,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  plugins: [tailwindcss()],
});
