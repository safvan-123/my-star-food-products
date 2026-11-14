import {defineType, defineField} from 'sanity';
import {Tag} from 'lucide-react';
import {CatalogueForm} from '../studio/CatalogueForm';

/**
 * Sanity keeps the working draft under `drafts.<id>` and, once published,
 * also keeps its published copy under `<id>`. Exclude both IDs when checking
 * uniqueness so a document never matches itself during live field validation.
 */
function categoryDocumentIdsToExclude(documentId?: string) {
  if (!documentId) return [];
  const publishedId = documentId.replace(/^drafts\./, '');
  return [publishedId, `drafts.${publishedId}`];
}

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: Tag,
  components: {input: CatalogueForm},
  groups: [
    {name: 'identity', title: 'Category details'},
    {name: 'website', title: 'Website presentation'},
  ],
  fieldsets: [
    {name: 'categoryIdentity', title: 'Category identity', options: {columns: 2}},
    {name: 'categoryPresentation', title: 'Website presentation', options: {columns: 2, collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'name', title: 'Category name', type: 'string', group: 'identity', fieldset: 'categoryIdentity',
      validation: rule => rule.required().max(80).custom(async (value, context) => {
        const normalized = value?.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
        if (!normalized) return true;
        const client = context.getClient({apiVersion: '2026-10-01'});
        const excludedIds = categoryDocumentIdsToExclude(context.document?._id);
        const candidates = await client.fetch<{_id: string; name?: string}[]>(
          '*[_type == "productCategory" && !(_id in $excludedIds)]{_id,name}',
          {excludedIds},
        );
        const duplicate = candidates.some(category => category.name?.trim().replace(/\s+/g, ' ').toLocaleLowerCase() === normalized);
        return duplicate ? 'A category with this name already exists.' : true;
      }),
    }),
    defineField({
      name: 'slug', title: 'Category URL / slug', type: 'slug', group: 'identity', fieldset: 'categoryIdentity',
      options: {source: 'name', maxLength: 80},
      validation: rule => rule.required().custom(async (value, context) => {
        if (!value?.current) return true;
        const client = context.getClient({apiVersion: '2026-10-01'});
        const excludedIds = categoryDocumentIdsToExclude(context.document?._id);
        const duplicate = await client.fetch(
          '*[_type == "productCategory" && lower(slug.current) == lower($slug) && !(_id in $excludedIds)][0]._id',
          {slug: value.current, excludedIds},
        );
        return duplicate ? 'This category URL is already in use.' : true;
      }),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, group: 'website', fieldset: 'categoryPresentation', validation: rule => rule.max(300)}),
    defineField({name: 'image', title: 'Category image', type: 'image', group: 'website', fieldset: 'categoryPresentation', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Image description', type: 'string', validation: rule => rule.max(160)}),
    ]}),
    defineField({name: 'displayOrder', title: 'Display order', type: 'number', group: 'website', fieldset: 'categoryPresentation', initialValue: 0, validation: rule => rule.integer().min(0)}),
  ],
  initialValue: {displayOrder: 0},
  orderings: [{title: 'Website order', name: 'websiteOrder', by: [{field: 'displayOrder', direction: 'asc'}, {field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'image'}, prepare: ({title, media}) => ({title, media})},
});
