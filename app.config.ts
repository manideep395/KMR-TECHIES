import { defineConfig } from "@tanstack/start/config";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: defineLovableConfig() as any,
});
