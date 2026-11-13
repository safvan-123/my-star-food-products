'use client';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {product} from './src/sanity/schemaTypes/product';
import {productCategory} from './src/sanity/schemaTypes/productCategory';
import {DocumentTable} from './src/sanity/studio/DocumentTable';
import {projectId,dataset} from './src/sanity/env';
export default defineConfig({
  name:'my-star-food-products',title:'MY STAR · Products',
  projectId:projectId || 'notconfigured',dataset,basePath:'/studio',
  plugins:[structureTool({structure:S=>S.list().title('Content').items([
    S.listItem().title('Products').schemaType('product').child(
      S.component(DocumentTable).id('productsTable').title('Products').options({type:'product'}),
    ),
    S.listItem().title('Product Categories').schemaType('productCategory').child(
      S.component(DocumentTable).id('productCategoriesTable').title('Product Categories').options({type:'productCategory'}),
    ),
  ])})],schema:{types:[product,productCategory]},
});
