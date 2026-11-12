import {defineQuery} from 'next-sanity';
// Explicitly filter raw draft/version IDs as well as using the published perspective.
export const visibleFilter = `_type == "product" && visible == true && defined(slug.current) && !(_id in path("drafts.**")) && !(_id in path("versions.**"))`;
const fields = `_id, _updatedAt, name, "slug":slug.current, category, shortDescription, fullDescription, mainImage, images, weights, ingredients, packagingDetails, price, featured, visible, displayOrder, seoTitle, seoDescription`;
export const productsQuery = defineQuery(`*[${visibleFilter}] | order(displayOrder asc, name asc){${fields}}`);
export const featuredQuery = defineQuery(`*[${visibleFilter} && featured == true] | order(displayOrder asc, name asc)[0...6]{${fields}}`);
export const productQuery = defineQuery(`*[${visibleFilter} && slug.current == $slug][0]{${fields}}`);
export const relatedQuery = defineQuery(`*[${visibleFilter} && _id != $id && category == $category] | order(displayOrder asc, name asc)[0...3]{${fields}}`);
