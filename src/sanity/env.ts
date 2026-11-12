export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01';
export const sanityConfigured = /^[a-z0-9-]+$/.test(projectId) && /^[a-z0-9_-]+$/.test(dataset);
