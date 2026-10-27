# Updated sample-content edition

This edition keeps the same design, routes, animations and Products-only Sanity Studio. It adds nine sample products with illustrated packaging and completes the draft company copy.

## Switching sample products to real products

The optional server environment setting `PRODUCT_SOURCE` controls the catalogue:

| Value | Behaviour |
| --- | --- |
| `auto` (default) | Show local samples until a Sanity project is connected; then show only published, visible Sanity products. |
| `demo` | Always show the local samples, useful for client design review even with Sanity configured. |
| `sanity` | Always use Sanity; if not configured, show the empty state. |

For an existing `.env.local` copied from the earlier ZIP, no new setting is required: `auto` is the default. If you have already connected Sanity but want to review the sample catalogue, temporarily set `PRODUCT_SOURCE=demo`.

For launch: connect Sanity, publish the approved products, set `PRODUCT_SOURCE=sanity`, replace `business.heroImage` with an approved photo or approved illustration, review the company copy, and rebuild/redeploy. Restart the local server after changing environment values. Sanity product edits still require no website rebuild.

The sample products exist in `src/lib/demo-products.ts`, images in `public/images/demo/`, and draft company copy in `src/lib/content.ts`. Samples are never uploaded into Sanity and do not alter its schemas. Category search, product galleries, selected weights, related products and WhatsApp enquiries work with the samples. No sample prices are invented.

# MY STAR FOOD PRODUCTS

A responsive Next.js App Router website with an embedded, Products-only Sanity Studio, dynamic product catalogue and WhatsApp enquiries. No cart, checkout, payment processing or customer accounts.

## Start here — Windows / VS Code

1. Install Node.js **24 LTS** (minimum supported: 22.12) and VS Code.
2. Extract the ZIP fully. Open the `my-star-food-products` folder in VS Code. This is the folder containing `package.json`.
3. Open Terminal → New Terminal and run:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

4. Open **http://localhost:3000**. The public pages work without a Sanity account. Nine illustrative sample products are included so you can review the full catalogue immediately.
5. Stop the server using Ctrl+C before editing environment settings. Follow the next section to enable product management.

macOS/Linux: use `cp .env.example .env.local` instead of `Copy-Item`.

## Create the client’s Sanity project

1. Ask the client to create/sign in to their own account at https://www.sanity.io/manage . The client should own the project.
2. Create a project named `MY STAR FOOD PRODUCTS` and a dataset named `production`. Select a **public** dataset, because this catalogue contains public product information. Do not store private enquiries, personal data or secrets there.
3. Copy the real project ID from the project dashboard. Edit `.env.local`:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-10-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_INDEXABLE=false
```

4. In the Sanity project dashboard → API → CORS origins, add `http://localhost:3000` and enable **Allow credentials** for the Studio login. Add your exact HTTPS production origin before deploying. Use exact origins, not wildcards.
5. In project Members, invite the developer and authorized content editors with suitable roles available on your plan. Only these members can edit through Studio. No custom username/password system is used.
6. Run `npm run check:setup`, then restart `npm run dev`.
7. Open **http://localhost:3000/studio**, sign in to the correct Sanity account, and select Products.

If the dashboard does not offer dataset creation in the project wizard, create it under the project’s Datasets section. You can also use the project’s Sanity CLI after login; do not initialise another starter over this source folder.

## Add your first real product

1. Open `/studio` → Products → New document.
2. Enter Product Name and click **Generate** beside Product URL.
3. Enter a category if applicable. Category is a text field on the product; there is no separate Categories module.
4. Add a short description, full description and the actual main product image. Main image is required before publishing. Use hotspot/crop controls as needed.
5. Add accurate alt text and optional gallery images, ingredients, packaging, package sizes or price. Omit unknown information. Price is in INR; an empty price is hidden and zero is displayed as ₹0.
6. Set **Featured Product** to show it on the homepage (up to six, by display order). Keep **Show on Website** enabled. Smaller display-order numbers appear first.
7. Click **Publish**. Saving a draft alone does not put it on the website.
8. Refresh `/products`, open the product and test its WhatsApp link. Choose a package size and confirm that the prepared message includes it.

Editing: open a product, change it and Publish again. Hiding: disable Show on Website and Publish. Unpublishing: use the document actions menu → Unpublish. Deleting: use the document actions menu → Delete. Hidden, unpublished and deleted records disappear on the next fresh website request, and their detail URLs return not found. An already-open page does not update until refreshed or navigated again.

Keep a product’s slug stable after launch. If a slug is changed, the old URL becomes 404; this project does not automatically invent redirects.

## Pages and source organisation

- `/` — hero, featured catalogue, About preview, values, services preview and enquiry strip.
- `/about` — complete suggested introduction, mission, vision and director information.
- `/products` — server-rendered catalogue; search by name and category via an accessible GET form.
- `/products/[slug]` — gallery, package-size selection, optional information, WhatsApp message and related products.
- `/services` — complete suggested service descriptions managed in source code.
- `/contact` — click-to-call, email, WhatsApp and safe Google Maps address search.
- `/studio` — embedded Sanity Studio; Products is the sole content module.

`src/app/(website)` and `src/app/(studio)` are route groups; their names do not appear in public URLs. Studio is separate from the public header/footer. The catalogue route uses an additional route group so its loading skeleton does not wrap product-detail 404 responses.

## Colours, assets and content

- Your exact colour tokens and responsive styles: `src/app/globals.css`.
- Company contact details, verified social URLs and asset paths: `src/lib/business.ts`.
- Suggested company and Services copy: `src/lib/content.ts`.
- Static page SEO: `src/lib/seo.ts`.
- Product schema: `src/sanity/schemaTypes/product.ts`.
- Sanity configuration: `sanity.config.ts`.

The uploaded reference was a layout image, not a usable official logo/product photo. This project uses a typographic wordmark, a temporary “M” favicon and original SVG illustrations of sample packaging. The hero displays a sample product collection, while the About section uses a decorative brand visual. These are illustrations, not photographs of actual packaging or premises. Add the supplied official files under `public/logo/` and `public/images/`, then set `business.logo`, `business.heroImage` and `business.companyImage` to paths beginning with `/`. Replace `src/app/icon.svg` with the official square favicon asset. If adding PNG favicon assets, remove the temporary SVG file to avoid conflicting icons.

Product imagery comes from Sanity and uses Next Image optimisation plus Sanity Image CDN. A missing or failed image has an accessible fallback. Sample pack artwork is original SVG illustration and carries a small SAMPLE PACK DESIGN label. Replace it with the client’s actual product photography when available.

The screenshot’s main hero wording is retained. Company introduction, mission, vision and services are filled with suggested marketing copy as requested. Review and edit it with the client before launch. No awards, reviews, FSSAI numbers, years of experience or manufacturing certifications are invented.

Only confirmed social URLs are linked. Display names and handles supplied by the client are shown as text until exact links are confirmed. The map link is an address search, not a verified pin.

## Responsive design and animations

- Layouts adapt from 320px phones to large desktop screens.
- Mobile navigation supports Escape and keyboard focus wrapping.
- Product grids have one, two or three columns depending on viewport width.
- Motion includes short page entrances, scroll reveals, staggered cards and animated mobile menu expansion. CSS adds gentle arrows/map-pin motion and hover effects.
- Content is server-rendered and visible even if animation scripts fail. Scroll effects use an initial visible state.
- `prefers-reduced-motion` disables nonessential motion. No autoplay video or heavy particle effects.
- Floating WhatsApp and back-to-top controls respect mobile safe areas. Footer bottom padding gives the final text room around the controls.

Fonts use the local system sans-serif and Georgia serif stack, so there is no external font request, missing font download or build-time font dependency.

## Product freshness and error handling

The public Sanity client uses the published perspective, `useCdn: false` and `cache: 'no-store'`. Product-dependent routes are dynamic SSR. This intentionally chooses freshness and simple operation over caching. New slugs are served at runtime; there is no static export or build-time-only slug list, no webhook and no write token.

React request memoization shares repeated product reads within a request. Each new request still queries Sanity. A visitor must refresh an already-open page to see changes. For a future high-traffic site, add verified webhook/tag revalidation or Sanity Live following official documentation rather than layering a cache over this policy casually.

Without Sanity configuration, the website displays nine local sample products and Studio shows setup guidance. With Sanity configured and PRODUCT_SOURCE=auto, the catalogue uses real CMS products only; it does not fall back to samples when products are hidden, unpublished, deleted or temporarily unavailable. A configured catalogue API failure is distinguished from an empty catalogue. Detail API failures reach the retry error boundary rather than incorrectly declaring a known product deleted. Sitemap API failures return an error rather than silently emitting a product-free sitemap.

## SEO without changing page copy

The project includes page-specific metadata, dynamic product metadata, canonical URLs, Open Graph sharing images, robots.txt, a fresh product sitemap, semantic headings, image alt text, Organization/WebSite/Product/BreadcrumbList JSON-LD and genuine missing-product handling. Product JSON-LD omits invented offers, ratings and availability; a Product rich result is not promised.

Search themes are naturally represented by the verified brand, Venjaramoodu, Thiruvananthapuram, Kerala and actual product information. Metadata can be adjusted in source or the optional Product SEO fields without changing the visible copy. Sample catalogue mode is kept noindex even if SITE_INDEXABLE is true, samples are excluded from the sitemap, and sample detail pages omit Product structured data. There is no keyword stuffing, hidden text or unsupported meta-keywords ranking claim. Technical SEO does not guarantee ranking for more keywords or a top Google position.

Locally and on previews keep `SITE_INDEXABLE=false`. On your final production domain set `SITE_INDEXABLE=true` and `NEXT_PUBLIC_SITE_URL=https://your-real-domain`. Both settings are required to enable indexing. Studio remains noindex through route metadata and an HTTP header. Robots.txt is not used as an authentication mechanism.

### Search Console after production deployment

1. Open https://search.google.com/search-console and add your domain property.
2. Verify domain ownership using the provided DNS TXT record. Alternatively use a URL-prefix property and put only its HTML verification token in `GOOGLE_SITE_VERIFICATION`, then redeploy.
3. Confirm that `/robots.txt` permits public crawling, and that `/sitemap.xml` uses your real domain.
4. Submit `https://your-real-domain/sitemap.xml`.
5. Inspect the homepage and a published product URL. Request indexing if appropriate.
6. Test structured data with Google’s Rich Results Test and inspect mobile performance in PageSpeed Insights. Not every valid schema type is eligible for a rich result.
7. Review indexing and actual search queries over time. A sitemap submission is not an indexing/ranking guarantee.

Official references: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developers.google.com/search/docs/appearance/title-link .

## Production deployment — Vercel

1. Create a repository under the client’s/developer’s authorized Git account. Commit the extracted source, including `package-lock.json`, `.env.example` and configuration files. `.env.local`, `.next` and `node_modules` must stay excluded.
2. In Vercel, Add New Project → Import that repository. Choose Next.js. Root directory is the folder containing this `package.json`.
3. Choose Node.js 24.x. Default install command is `npm ci`; build command is `npm run build`. Do not configure static export or an `out` output folder.
4. Add environment variables from `.env.example`. Use the real Sanity project and public dataset. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS domain.
5. Keep `SITE_INDEXABLE=false` until the copy, images, real products, domain and contact details are approved. Use false in Vercel Preview environments as well.
6. Add the exact deployment/custom-domain origin to Sanity CORS with credentials enabled.
7. Deploy, connect the domain in Vercel and update DNS as Vercel instructs. Then set the final production `SITE_INDEXABLE=true` and redeploy.
8. Visit all routes directly and refresh. Sign in to `/studio` and test Add → Publish → Edit → Publish → Hide → Publish → Unpublish → Delete using a real authorized test product. Confirm new slugs work without redeploying.
9. Test call, email and WhatsApp on a real phone. WhatsApp opens a prepared message; the visitor must press Send. There is no WhatsApp API integration or automatic message delivery.

Public environment values used by the browser are baked into the build. Changing the Sanity project, dataset or site URL requires a restart locally and a rebuild/redeployment in production. Ordinary product edits do not.

This is a Next.js Node/serverless project, **not** a Cloudflare Pages static export. To use Cloudflare, select a supported Next.js server adapter and separately validate it; no Cloudflare hosting claim is made here.

## Commands and validation

```powershell
npm ci
npm run check:setup
npm run typecheck
npm test
npm run build
npm start
```

`check:setup` reports missing configuration until you enter it. Tests exercise actual GROQ queries against isolated fixtures, visibility rules, product enquiry encoding and JSON-LD escaping. Test fixtures are never loaded into the public catalogue.

See `VALIDATION.md` for checks performed on the delivered source and remaining account-dependent checks. Production build success without a project ID validates the configuration-free state, not live Sanity authentication/CRUD.

## Troubleshooting

- **Empty catalogue:** publish a product, enable Show on Website, generate its slug and confirm the same dataset is selected. Homepage products additionally require Featured Product.
- **Studio setup screen:** fill in the project ID and restart/rebuild.
- **Studio login/CORS error:** use the correct account, accept the project invitation, and add the exact current origin to Sanity CORS with credentials enabled.
- **Dataset not found/permission denied:** use the actual public dataset name. Never solve this by adding a write token to `NEXT_PUBLIC_*`.
- **Old content:** refresh the page. Confirm that deployment environment variables point to the same project/dataset as Studio.
- **Build memory issues:** stop other large development processes and use a current Node 24 LTS installation.
- **Search engines blocked:** only on final production, set SITE_INDEXABLE=true and the real production site URL, then redeploy.
