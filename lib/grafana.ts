"use client";

import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

initializeFaro({
    url: "https://faro-collector-prod-ap-southeast-1.grafana.net/collect/a175f98a47c2b0b1f3bd2ce6f12fa1cd",
    app: {
        name: "Devoverflow",
        version: "1.0.0",
        environment: "production",
    },

    instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),

        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
    ],
});
