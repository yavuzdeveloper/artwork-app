import type { NextWebVitalsMetric } from "next/app";
import * as Sentry from "@sentry/nextjs";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  Sentry.captureEvent({
    message: `Web Vitals - ${metric.name}`,
    level: "info",
    tags: {
      web_vital: metric.name,
    },
    extra: {
      id: metric.id,
      name: metric.name,
      label: metric.label,
      value: metric.value,
      startTime: metric.startTime,
    },
  });
}
