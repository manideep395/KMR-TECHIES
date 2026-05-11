import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ["kmr-techies.onrender.com"],
    },
  },
  tanstackStart: {
    server: {
      preset: "render-com",
    },
  },
});
