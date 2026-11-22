import { bindings, defineConfig, defineWorker } from "cf/config";
import { cloudflareProduction } from "./cloudflare.production.mjs";

export default defineConfig({
  worker: defineWorker({
    name: cloudflareProduction.workerName,
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-27",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      NEXT_PUBLIC_SANITY_PROJECT_ID: {type: "text", value: cloudflareProduction.projectId},
      NEXT_PUBLIC_SANITY_DATASET: {type: "text", value: cloudflareProduction.dataset},
      NEXT_PUBLIC_SANITY_API_VERSION: {type: "text", value: cloudflareProduction.apiVersion},
      NEXT_PUBLIC_SITE_URL: {type: "text", value: cloudflareProduction.siteUrl},
      PRODUCT_SOURCE: {type: "text", value: cloudflareProduction.productSource},
      SITE_INDEXABLE: {type: "text", value: cloudflareProduction.siteIndexable},
    },
  }),
});
