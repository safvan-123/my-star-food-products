import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createElement,act} from 'react';
import {createRoot} from 'react-dom/client';
import {PathnameContext} from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import {Header} from '../src/components/header';
import {ProductDetails} from '../src/components/product-details';
const require=createRequire(import.meta.url);
const {JSDOM}=require('jsdom');
function setup(){
 const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'http://localhost:3000'});
 Object.assign(globalThis,{window:dom.window,self:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:dom.window.navigator});
 return {dom,container:dom.window.document.getElementById('root') as HTMLElement};
}
test('mobile menu opens, closes on Escape and returns focus to toggle',async()=>{
 const {dom,container}=setup();const root=createRoot(container);
 await act(async()=>root.render(createElement(PathnameContext.Provider,{value:'/'},createElement(Header))));
 const button=container.querySelector('button')!;
 assert.equal(button.getAttribute('aria-expanded'),'false');
 await act(async()=>button.dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true})));
 assert.equal(button.getAttribute('aria-expanded'),'true');
 assert.equal(button.getAttribute('aria-label'),'Close menu');
 await act(async()=>document.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true})));
 assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(document.activeElement,button);
 await act(async()=>root.unmount());dom.window.close();
});
test('changing package size updates the actual product WhatsApp link',async()=>{
 const {dom,container}=setup();const root=createRoot(container);
 await act(async()=>root.render(createElement(ProductDetails,{origin:'https://food.example',product:{_id:'fixture',_updatedAt:'2026-10-27',name:'Test only',slug:'test-only',weights:['250 g','500 g']}})));
 const selected=Array.from(container.querySelectorAll('button')).find(b=>b.textContent?.includes('500 g'))!;
 await act(async()=>selected.dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true})));
 assert.equal(selected.getAttribute('aria-pressed'),'true');
 const enquiry=container.querySelector<HTMLAnchorElement>('a[href^="https://wa.me"]')!;
 assert.match(new URL(enquiry.href).searchParams.get('text')!,/Weight: 500 g/);
 await act(async()=>root.unmount());dom.window.close();
});
