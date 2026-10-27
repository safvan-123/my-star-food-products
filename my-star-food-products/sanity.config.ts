'use client';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {product} from './src/sanity/schemaTypes/product';
import {projectId,dataset} from './src/sanity/env';
export default defineConfig({
  name:'my-star-food-products',title:'MY STAR · Products',
  projectId:projectId || 'notconfigured',dataset,basePath:'/studio',
  plugins:[structureTool({structure:S=>S.list().title('Content').items([
    S.documentTypeListItem('product').title('Products'),
  ])})],schema:{types:[product]},
});
