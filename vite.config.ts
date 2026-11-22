import { defineConfig, loadEnv } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { cloudflareProduction } from "./cloudflare.production.mjs";

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), "");
  const publicConfig = mode === "production" ? {
    NEXT_PUBLIC_SANITY_PROJECT_ID: cloudflareProduction.projectId,
    NEXT_PUBLIC_SANITY_DATASET: cloudflareProduction.dataset,
    NEXT_PUBLIC_SANITY_API_VERSION: cloudflareProduction.apiVersion,
    NEXT_PUBLIC_SITE_URL: cloudflareProduction.siteUrl,
  } : {
    NEXT_PUBLIC_SANITY_PROJECT_ID: localEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    NEXT_PUBLIC_SANITY_DATASET: localEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
    NEXT_PUBLIC_SANITY_API_VERSION: localEnv.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01",
    NEXT_PUBLIC_SITE_URL: localEnv.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };

  if (mode === "production") {
    Object.assign(process.env, publicConfig, {
      PRODUCT_SOURCE: cloudflareProduction.productSource,
      SITE_INDEXABLE: cloudflareProduction.siteIndexable,
    });
  }

  // Vinext inlines NEXT_PUBLIC_* values into the server/client bundles at build time.
  // Keep these explicit so every production build uses the same project as the Worker bindings.
  const define = Object.fromEntries(Object.entries({
    ...publicConfig,
    ...(mode === "production" ? {
      PRODUCT_SOURCE: cloudflareProduction.productSource,
      SITE_INDEXABLE: cloudflareProduction.siteIndexable,
    } : {}),
  }).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)]));

  return {
    define,
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
  };
});
