import {defineType, defineField, defineArrayMember} from 'sanity';
import {PackageOpen} from 'lucide-react';
import {CatalogueForm} from '../studio/CatalogueForm';
import {PackageSizesInput} from '../studio/PackageSizesInput';
const imageFields = [defineField({name:'alt', title:'Image description', type:'string', description:'Describe the actual product for accessibility.'})];
export const product = defineType({
  name:'product', title:'Product', type:'document', icon:PackageOpen,
  components:{input:CatalogueForm},
  groups:[{name:'details',title:'Product details'},{name:'images',title:'Photos'},{name:'publishing',title:'Website visibility'},{name:'seo',title:'SEO (optional)'}],
  fieldsets:[
    {name:'identity',title:'Product identity',options:{columns:2}},
    {name:'productPhotos',title:'Product photos'},
    {name:'descriptions',title:'Product information',options:{columns:2}},
    {name:'ingredientsPackaging',title:'Ingredients & packaging',options:{columns:2}},
    {name:'packagePricing',title:'Package sizes & price',options:{columns:2}},
    {name:'websitePlacement',title:'Website placement',options:{columns:3}},
    {name:'searchPreview',title:'Search preview',options:{columns:2}},
  ],
  fields:[
    defineField({name:'name',title:'Product name',type:'string',group:'details',fieldset:'identity',validation:r=>r.required().max(140)}),
    defineField({name:'slug',title:'Product URL / slug',type:'slug',group:'details',fieldset:'identity',options:{source:'name',maxLength:96},description:'Generate from the product name. Keep stable after publishing to avoid breaking shared links.',validation:r=>r.required().custom(value=>!value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || 'Use lowercase letters, numbers and single hyphens.')}),
    defineField({name:'category',title:'Product category',type:'reference',to:[{type:'productCategory'}],group:'details',fieldset:'identity',description:'Select a category managed in Product Categories.'}),
    defineField({name:'mainImage',title:'Main product image (required)',type:'image',group:'images',fieldset:'productPhotos',options:{hotspot:true},fields:imageFields,validation:r=>r.required()}),
    defineField({name:'images',title:'Additional images',type:'array',group:'images',fieldset:'productPhotos',of:[defineArrayMember({type:'image',options:{hotspot:true},fields:imageFields})],validation:r=>r.max(8)}),
    defineField({name:'shortDescription',title:'Short description',type:'text',rows:3,group:'details',fieldset:'descriptions',validation:r=>r.max(300)}),
    defineField({name:'fullDescription',title:'Full description',type:'text',rows:8,group:'details',fieldset:'descriptions'}),
    defineField({name:'weights',title:'Package sizes / net weights',type:'array',of:[defineArrayMember({type:'string',validation:r=>r.required().max(60)})],group:'details',fieldset:'packagePricing',components:{input:PackageSizesInput},validation:r=>r.unique(),description:'Type each package size directly. Use Add package size for another row; enter only actual package options.'}),
    defineField({name:'ingredients',title:'Ingredients',type:'text',rows:3,group:'details',fieldset:'ingredientsPackaging'}),
    defineField({name:'packagingDetails',title:'Packaging details',type:'text',rows:3,group:'details',fieldset:'ingredientsPackaging'}),
    defineField({name:'price',title:'Price (INR, optional)',type:'number',group:'details',fieldset:'packagePricing',description:'Enter a number in rupees, such as 120. Leave empty if customers should enquire. A zero value is shown as ₹0.',validation:r=>r.min(0)}),
    defineField({name:'featured',title:'Featured product',type:'boolean',initialValue:false,group:'publishing',fieldset:'websitePlacement'}),
    defineField({name:'visible',title:'Show on website',type:'boolean',initialValue:true,group:'publishing',fieldset:'websitePlacement',validation:r=>r.required(),description:'Publish after changing this switch. Off hides the listing and detail URL.'}),
    defineField({name:'displayOrder',title:'Display order',type:'number',initialValue:0,group:'publishing',fieldset:'websitePlacement',validation:r=>r.integer().min(0),description:'Smaller numbers appear first.'}),
    defineField({name:'seoTitle',title:'SEO title',type:'string',group:'seo',fieldset:'searchPreview',validation:r=>r.max(70).warning('Keep search titles concise.')}),
    defineField({name:'seoDescription',title:'SEO description',type:'text',rows:3,group:'seo',fieldset:'searchPreview',validation:r=>r.max(170).warning('Keep descriptions concise.')}),
  ],
  initialValue:{visible:true,featured:false,displayOrder:0},
  orderings:[{title:'Website order',name:'websiteOrder',by:[{field:'displayOrder',direction:'asc'},{field:'name',direction:'asc'}]}],
  preview:{select:{title:'name',media:'mainImage',visible:'visible'},prepare({title,media,visible}){return {title,media,subtitle:visible?'Visible':'Hidden'};}},
});
