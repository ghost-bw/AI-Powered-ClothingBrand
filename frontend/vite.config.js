import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,        // ✅ FORCE PORT
    strictPort: true,  // ✅ DO NOT AUTO-INCREMENT
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
