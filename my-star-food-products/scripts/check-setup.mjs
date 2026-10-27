import {loadEnvConfig} from '@next/env';
loadEnvConfig(process.cwd());
let failed=false;
for(const key of ['NEXT_PUBLIC_SANITY_PROJECT_ID','NEXT_PUBLIC_SANITY_DATASET','NEXT_PUBLIC_SITE_URL']){
 const set=!!process.env[key]?.trim(); console.log(`${set?'OK':'MISSING'} ${key}`);if(!set)failed=true;
}
if(process.env.NEXT_PUBLIC_SITE_URL){try{const url=new URL(process.env.NEXT_PUBLIC_SITE_URL);if(!['http:','https:'].includes(url.protocol))throw new Error();console.log('OK site URL format');}catch{console.error('INVALID site URL: use http://localhost:3000 locally or your https production domain.');failed=true;}}
console.log('Indexing: '+(process.env.SITE_INDEXABLE==='true'?'enabled (use on final production only)':'disabled (safe for local/preview)'));
console.log('No write token is required. Studio uses Sanity account permissions.');
process.exitCode=failed?1:0;
