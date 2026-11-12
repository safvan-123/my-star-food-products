import type {Product} from '@/types/product';
/** Layout-only examples for the new retailer-focused preview. Not live inventory. */
const examples = [
  {slug:'chilli-powder',name:'Chilli Powder',category:'Spice Powders',description:'A kitchen staple used to bring heat and colour to everyday cooking.',use:'Dried red chilli; a familiar ingredient for curries, gravies and marinades.',weights:['100 g','250 g','500 g']},
  {slug:'turmeric-powder',name:'Turmeric Powder',category:'Spice Powders',description:'Golden turmeric powder for curries, vegetable dishes and home-style recipes.',use:'Turmeric; known for its warm colour and earthy character.',weights:['100 g','250 g']},
  {slug:'coriander-powder',name:'Coriander Powder',category:'Spice Powders',description:'A mild, aromatic everyday spice for flavourful curries and gravies.',use:'Ground coriander seeds; commonly used as a base in spice cooking.',weights:['100 g','250 g']},
  {slug:'garam-masala',name:'Garam Masala',category:'Blended Masalas',description:'A warming blend of spices used in rice dishes, curries and favourites.',use:'Mixed spices; the exact ingredients of MY STAR products require label confirmation.',weights:['50 g','100 g']},
  {slug:'rice-flour',name:'Rice Flour',category:'Flours & Essentials',description:'A familiar Kerala kitchen essential for traditional rice-based recipes.',use:'Rice flour is often used in puttu, idiyappam and other regional recipes.',weights:['500 g','1 kg']},
  {slug:'roasted-rava',name:'Roasted Rava',category:'Flours & Essentials',description:'A practical pantry ingredient commonly used for breakfast and sweets.',use:'Wheat semolina; commonly used in upma and other everyday preparations.',weights:['500 g','1 kg']},
] as const;
export const demoProducts: Product[] = examples.map((item,index)=>({
  _id:`demo-${item.slug}`, _updatedAt:'2026-11-12T00:00:00Z',
  name:item.name,slug:item.slug,category:item.category,shortDescription:item.description,
  fullDescription:`${item.description} ${item.use}\n\nThis is an illustrative catalogue entry for website preview. Product availability, actual ingredients, current pack sizes, label information and prices must be confirmed with MY STAR FOOD PRODUCTS before publication.`,
  mainImage:{localSrc:`/images/demo/${item.slug}.svg`,alt:`Illustrative product pack for ${item.name}; not verified retail packaging`},
  images:[{localSrc:`/images/demo/${item.slug}-detail.svg`,alt:`Alternate illustrative ${item.name} sample graphic`,_key:'alternate'}],
  weights:[...item.weights], ingredients:'Sample information — confirm actual ingredients from the product label.',
  packagingDetails:'Sample pack-size options for website preview only. Confirm available packaging with the business.',
  featured:true,visible:true,displayOrder:index,demo:true,
}));
