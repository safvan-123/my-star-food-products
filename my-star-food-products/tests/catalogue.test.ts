import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parse,evaluate} from 'groq-js';
import {productsQuery,productQuery,featuredQuery,relatedQuery} from '../src/sanity/queries';
import {productEnquiry,whatsappUrl} from '../src/lib/whatsapp';
import {jsonLd} from '../src/lib/seo';
// Test-only records. Never imported by the app, never uploaded to Sanity.
const base={_type:'product',visible:true,featured:true,displayOrder:0,category:'Fixture',name:'Test product',slug:{current:'test-product'}};
const dataset=[
 {...base,_id:'published'},
 {...base,_id:'hidden',visible:false,slug:{current:'hidden'}},
 {...base,_id:'drafts.unpublished',slug:{current:'unpublished'}},
 {...base,_id:'versions.release.product',slug:{current:'version'}},
 {...base,_id:'no-slug',slug:undefined},
 {...base,_id:'related',name:'Related',slug:{current:'related'},displayOrder:2,featured:false},
];
async function run(query:string,params:Record<string,string>={}){return (await evaluate(parse(query),{dataset,params})).get();}
test('catalogue excludes hidden, draft, version and missing-slug records and respects order',async()=>{
 const result=await run(productsQuery);assert.deepEqual(result.map((p:{_id:string})=>p._id),['published','related']);
});
test('hidden and unpublished detail URLs resolve to no product',async()=>{
 for(const slug of ['hidden','unpublished','version','nonexistent'])assert.equal(await run(productQuery,{slug}),null);
 assert.equal((await run(productQuery,{slug:'test-product'}))._id,'published');
});
test('featured query and related query use the same visibility rules',async()=>{
 assert.deepEqual((await run(featuredQuery)).map((p:{_id:string})=>p._id),['published']);
 assert.deepEqual((await run(relatedQuery,{id:'published',category:'Fixture'})).map((p:{_id:string})=>p._id),['related']);
});
test('product enquiry encodes special characters, selected weight and canonical product URL',()=>{
 const url=new URL(productEnquiry({name:'A & B / കേരളം',category:'Food & more',slug:'a-b'},'https://food.example','500 g'));
 assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/919207779771');
 const message=url.searchParams.get('text')!;assert.match(message,/A & B \/ കേരളം/);assert.match(message,/Weight: 500 g/);assert.match(message,/Product Link: https:\/\/food.example\/products\/a-b/);
});
test('general enquiries need no product and optional fields are omitted',()=>{
 assert.match(new URL(whatsappUrl()).searchParams.get('text')!,/MY STAR FOOD PRODUCTS/);
 const text=new URL(productEnquiry({name:'Only name',slug:'only-name'},'https://food.example')).searchParams.get('text')!;
 assert.doesNotMatch(text,/undefined|Category:|Weight:/);
});
test('JSON-LD safely escapes script terminators in CMS content',()=>{
 const text=jsonLd({name:'</script><script>alert(1)</script>'});assert.ok(!text.includes('<'));assert.equal(JSON.parse(text).name,'</script><script>alert(1)</script>');
});

test('sample catalogue has nine unique products, complete details and existing local illustrations',async()=>{
 const {demoProducts}=await import('../src/lib/demo-products');
 const {existsSync}=await import('node:fs');
 assert.equal(demoProducts.length,9);
 assert.equal(new Set(demoProducts.map(p=>p.slug)).size,9);
 assert.equal(demoProducts.filter(p=>p.featured).length,6);
 for(const p of demoProducts){
  assert.equal(p.demo,true);assert.ok(p.name&&p.category&&p.fullDescription&&p.ingredients&&p.packagingDetails);
  assert.ok(p.weights&&p.weights.length>=2);assert.ok(existsSync('public'+p.mainImage!.localSrc));
  assert.ok(p.images?.length&&existsSync('public'+p.images[0].localSrc));
 }
});
test('catalogue source can be explicitly switched from samples to Sanity without empty-data fallback',async()=>{
 const {useDemoProducts}=await import('../src/lib/product-source');
 const {sanityConfigured}=await import('../src/sanity/env');
 const previous=process.env.PRODUCT_SOURCE;
 try{
  process.env.PRODUCT_SOURCE='demo';assert.equal(useDemoProducts(),true);
  process.env.PRODUCT_SOURCE='sanity';assert.equal(useDemoProducts(),false);
  process.env.PRODUCT_SOURCE='auto';assert.equal(useDemoProducts(),!sanityConfigured);
  process.env.PRODUCT_SOURCE='invalid';assert.throws(()=>useDemoProducts(),/PRODUCT_SOURCE/);
 }finally{if(previous===undefined)delete process.env.PRODUCT_SOURCE;else process.env.PRODUCT_SOURCE=previous;}
});
