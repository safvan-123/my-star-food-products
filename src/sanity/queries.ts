import {defineQuery} from 'next-sanity';
// Explicitly filter raw draft/version IDs as well as using the published perspective.
export const visibleFilter = `_type == "product" && visible == true && defined(slug.current) && !(_id in path("drafts.**")) && !(_id in path("versions.**"))`;
const fields = `_id, _updatedAt, name, "slug":slug.current, "category": coalesce(category->name, category), "categoryId": category._ref, shortDescription, fullDescription, mainImage, images, weights, ingredients, packagingDetails, price, featured, visible, displayOrder, seoTitle, seoDescription`;
export const categoriesQuery = defineQuery(`*[_type == "productCategory" && defined(slug.current) && !(_id in path("drafts.**")) && !(_id in path("versions.**"))] | order(coalesce(displayOrder, 0) asc, name asc, _id asc){_id, name, "slug":slug.current, description, image, displayOrder}`);
const websiteOrder = 'order(coalesce(displayOrder, 0) asc, name asc, _id asc)';
export const productsQuery = defineQuery(`*[${visibleFilter}] | ${websiteOrder}{${fields}}`);
export const featuredQuery = defineQuery(`*[${visibleFilter} && featured == true] | ${websiteOrder}[0...6]{${fields}}`);
export const productQuery = defineQuery(`*[${visibleFilter} && slug.current == $slug][0]{${fields}}`);
export const relatedQuery = defineQuery(`*[${visibleFilter} && _id != $id && (category._ref == $categoryId || (!defined(category._ref) && category == $category))] | ${websiteOrder}[0...3]{${fields}}`);
