// vite.config.local-development.js
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from "@vitejs/plugin-react-swc";

dotenv.config({ path: '.env' });

export default defineConfig({
  envPrefix: 'APP_',
  plugins: [react()],
  base: "/",
  server: {
    host: true,
    port: 6688,
    watch: {
      usePolling: true,
    },
  },
  // preview: {
  //   port: 6688,
  // },
});