import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import faroUploader from "@grafana/faro-rollup-plugin";

export default defineConfig({
  plugins: [
    react({
      fastRefresh: {
        warnOnContexts: false,
      },
    }),
    faroUploader({
      appName: "jild",
      endpoint: "https://faro-api-prod-ap-south-1.grafana.net/faro/api/v1",
      appId: "753",
      stackId: "1238936",
      apiKey: "3746d3ef-4c3d-4e04-a316-44535fe10941",
      gzipContents: true,
    }),
  ],
  build: {
    outDir: "dist",
  },
});
