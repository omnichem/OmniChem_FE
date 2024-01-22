import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 6688,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/API": "http://212.233.79.177:8000",
    },
  },
});
