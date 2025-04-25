import { matchRoutes } from "react-router-dom";
import {
  initializeFaro,
  createReactRouterV6DataOptions,
  ReactIntegration,
  getWebInstrumentations,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

initializeFaro({
  url: "https://faro-collector-prod-ap-south-1.grafana.net/collect/f2a1d74947d3859ce1d0d6b0ed27b02c",
  app: {
    name: "jild",
    version: "1.0.0",
    environment: "production",
  },
  trackGeolocation: true,
  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),

    // React integration for React applications.
    new ReactIntegration({
      router: createReactRouterV6DataOptions({
        matchRoutes,
      }),
    }),
  ],
});
