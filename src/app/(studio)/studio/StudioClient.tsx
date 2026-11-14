'use client';

import {useEffect, useState, type ComponentType} from 'react';
import type {NextStudioProps} from 'next-sanity/studio';

export default function StudioClient() {
  const [studio, setStudio] = useState<ComponentType<NextStudioProps> | null>(null);
  const [config, setConfig] = useState<NextStudioProps['config'] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      import('next-sanity/studio'),
      import('../../../../sanity.config'),
    ]).then(([studioModule, configModule]) => {
      if (!active) return;
      setConfig(configModule.default);
      setStudio(() => studioModule.NextStudio);
    }).catch(error => {
      console.error('Unable to load Sanity Studio:', error);
      if (active) setFailed(true);
    });
    return () => { active = false; };
  }, []);

  if (failed) return <main style={{padding:'2rem',fontFamily:'system-ui'}}><h1>Sanity Studio could not load</h1><p>Refresh this page or contact the site administrator if the issue continues.</p></main>;
  if (!studio || !config) return <main aria-live="polite" style={{padding:'2rem',fontFamily:'system-ui'}}>Loading Sanity Studio…</main>;
  const NextStudio = studio;
  return <NextStudio config={config}/>;
}
