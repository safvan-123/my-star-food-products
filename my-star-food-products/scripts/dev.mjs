// Normal Next.js dev, with support for preview hosts that pass Vite-style flags.
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const incoming=process.argv.slice(2);const args=[];
for(let i=0;i<incoming.length;i++){
 if(incoming[i]==='--strictPort')continue;
 args.push(incoming[i]==='--host'?'--hostname':incoming[i]);
}
if(!args.includes('--hostname')&&!args.includes('-H'))args.push('--hostname','0.0.0.0');
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'dev','--webpack',...args],{stdio:'inherit',env:process.env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
