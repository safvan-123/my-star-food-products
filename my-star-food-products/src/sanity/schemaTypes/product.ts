import {defineType, defineField, defineArrayMember} from 'sanity';
import {PackageOpen} from 'lucide-react';
const imageFields = [defineField({name:'alt', title:'Image description', type:'string', description:'Describe the actual product for accessibility.'})];
export const product = defineType({
  name:'product', title:'Products', type:'document', icon:PackageOpen,
  groups:[{name:'details',title:'Product details',default:true},{name:'images',title:'Photos'},{name:'publishing',title:'Website visibility'},{name:'seo',title:'SEO (optional)'}],
  fields:[
    defineField({name:'name',title:'Product Name',type:'string',group:'details',validation:r=>r.required().max(140)}),
    defineField({name:'slug',title:'Product URL',type:'slug',group:'details',options:{source:'name',maxLength:96},description:'Click Generate. Keep this stable after publishing to avoid breaking shared links.',validation:r=>r.required().custom(value=>!value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) || 'Use lowercase letters, numbers and single hyphens.')}),
    defineField({name:'category',title:'Category',type:'string',group:'details',validation:r=>r.max(80)}),
    defineField({name:'shortDescription',title:'Short Description',type:'text',rows:3,group:'details',validation:r=>r.max(300)}),
    defineField({name:'fullDescription',title:'Full Description',type:'text',rows:8,group:'details'}),
    defineField({name:'mainImage',title:'Main Product Image',type:'image',group:'images',options:{hotspot:true},fields:imageFields,validation:r=>r.required()}),
    defineField({name:'images',title:'Additional Images',type:'array',group:'images',of:[defineArrayMember({type:'image',options:{hotspot:true},fields:imageFields})],validation:r=>r.max(8)}),
    defineField({name:'weights',title:'Package Sizes / Net Weights',type:'array',of:[defineArrayMember({type:'string',validation:r=>r.required().max(60)})],group:'details',validation:r=>r.unique(),description:'Example: 250 g, 500 g. Add only actual package options.'}),
    defineField({name:'ingredients',title:'Ingredients',type:'text',rows:3,group:'details'}),
    defineField({name:'packagingDetails',title:'Packaging Details',type:'text',rows:3,group:'details'}),
    defineField({name:'price',title:'Price (INR, optional)',type:'number',group:'details',description:'Leave empty if customers should enquire. A zero value is shown as ₹0.',validation:r=>r.min(0)}),
    defineField({name:'featured',title:'Featured Product',type:'boolean',initialValue:false,group:'publishing'}),
    defineField({name:'visible',title:'Show on Website',type:'boolean',initialValue:true,group:'publishing',validation:r=>r.required(),description:'Publish after changing this switch. Off hides the listing and detail URL.'}),
    defineField({name:'displayOrder',title:'Display Order',type:'number',initialValue:0,group:'publishing',validation:r=>r.integer().min(0),description:'Smaller numbers appear first.'}),
    defineField({name:'seoTitle',title:'SEO Title',type:'string',group:'seo',validation:r=>r.max(70).warning('Keep search titles concise.')}),
    defineField({name:'seoDescription',title:'SEO Description',type:'text',rows:3,group:'seo',validation:r=>r.max(170).warning('Keep descriptions concise.')}),
  ],
  initialValue:{visible:true,featured:false,displayOrder:0},
  orderings:[{title:'Website order',name:'websiteOrder',by:[{field:'displayOrder',direction:'asc'},{field:'name',direction:'asc'}]}],
  preview:{select:{title:'name',media:'mainImage',category:'category',visible:'visible'},prepare({title,media,category,visible}){return {title,media,subtitle:`${visible?'Visible':'Hidden'}${category?' · '+category:''}`};}},
});
