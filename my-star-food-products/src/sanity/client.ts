import 'server-only';
import {createClient} from 'next-sanity';
import {projectId, dataset, apiVersion, sanityConfigured} from './env';
export const client = sanityConfigured ? createClient({
  projectId, dataset, apiVersion, useCdn: false, perspective: 'published',
  requestTagPrefix: 'my-star-food', timeout: 12000,
}) : null;
