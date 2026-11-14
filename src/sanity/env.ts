import {cloudflareProduction} from '../../cloudflare.production.mjs';

// Local development must use its own .env.local configuration. In the
// deployed Worker, however, process.env may not expose text bindings to the
// server bundle, so fall back to the same public values used by the deploy
// config and Vite build. These identifiers are public Sanity configuration;
// no credentials are included here.
const productionDefaults = process.env.NODE_ENV === 'development' ? undefined : cloudflareProduction;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || productionDefaults?.projectId || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || productionDefaults?.dataset || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || productionDefaults?.apiVersion || '2026-10-01';
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId) && /^[a-z0-9_-]+$/.test(dataset);
