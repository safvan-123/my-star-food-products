# MY STAR FOOD PRODUCTS

The production website is a Next.js App Router application deployed to the existing Cloudflare Worker. Published products and categories come from the existing Sanity project.

## Production

- Website: https://my-star-food-products.allprotechlabs.workers.dev
- Sanity Studio: https://my-star-food-products.allprotechlabs.workers.dev/studio
- Sanity project: tmnhiibx
- Dataset: production
- Cloudflare Worker: my-star-food-products
- GitHub: https://github.com/safvan-123/my-star-food-products

See [CLIENT-HANDOVER.md](CLIENT-HANDOVER.md) for editor instructions, deployment steps, backup guidance, and outstanding access checks.

## Local development

Requirements: Node.js 22.12 or later and npm.

~~~powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
~~~

Open http://localhost:3000. The embedded Studio is at http://localhost:3000/studio. Local origins on ports 3000 and 3333 are allowed by the Sanity project. The dataset is public-read, so no Sanity API token is needed for normal local development.

## Checks

~~~powershell
npm test
npm run typecheck
npm run build
npm run build:vinext
~~~

There is no lint script defined in package.json.

## Production deployment

This repository uses Vinext with the Cloudflare Vite plugin and deploys through the existing Cloudflare CLI project configuration. It is not a static Pages export. The deployment script targets the existing my-star-food-products Worker.

Set the production build-time values in the PowerShell session before running npm run deploy:vinext. Use the exact command in CLIENT-HANDOVER.md. Never commit .env.local, API tokens, or exported content backups. Cloudflare deployment does not happen automatically when GitHub is updated.
