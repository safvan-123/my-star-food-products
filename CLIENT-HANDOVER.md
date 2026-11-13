# MY STAR FOOD PRODUCTS — Client Handover

Verified 14 November 2026. This guide records the current production setup and the steps the client team can use to manage it.

## Live services

- Website: https://my-star-food-products.allprotechlabs.workers.dev
- Sanity Studio: https://my-star-food-products.allprotechlabs.workers.dev/studio
- GitHub repository: https://github.com/safvan-123/my-star-food-products
- GitHub main commit at review time: ffcadf7 (the local handover changes still need approval before they are pushed).
- Cloudflare account: Allprotechlabs account
- Cloudflare Worker: my-star-food-products
- Active Worker version: cbb3f96f-a2de-4afb-8a16-9f4bdf83aa87
- Sanity project: tmnhiibx
- Sanity dataset: production

The Worker uses HTTPS. The verified canonical address is the workers.dev URL above. No separate client-owned custom domain was provided or confirmed. Connect one only after the client chooses a domain and its DNS ownership and access are agreed.

## Current content

At handover verification, the public website showed four published products with images: Chilli Powder, Turmeric Powder, Garam Masala, and Sambar Masala. The public category list showed Masala Blends and Spice Powders. The Studio Products table also showed one existing draft named Untitled product. It was left unchanged. No live Sanity records were created, edited, unpublished, or deleted during handover work.

## Add or edit a product

1. Open the Studio URL and sign in with a Sanity account that has editing and publishing access to this project.
2. Select Products. Use Add Product to create one, or Edit on a row to change an existing product.
3. In All fields, enter the product name, then use Generate beside Product URL / slug. Keep the slug stable after publication because shared URLs use it.
4. Select the published category in Product category. Categories are managed separately under Product Categories.
5. Upload the actual main product photo and enter a useful Image description (alt text). A main image is required to publish. Additional images are optional.
6. Add only confirmed descriptions, ingredients, package sizes, packaging details, display order, and price. Price is optional and entered in INR. Keep Show on website enabled for a public listing.
7. Review the form and choose Publish. A draft is not shown on the public site.
8. Refresh the Products page to see the published update. Existing pages do not update until a new request or refresh.

To hide a product, turn off Show on website and publish the change. To remove publication, use the Sanity document actions and choose Unpublish. Coordinate deletion with the project owner; do not delete records merely to hide them.

## Add or edit a category

1. In Studio, select Product Categories and choose Add Category, or choose Edit on a row.
2. In All fields, enter Category name and use Generate beside Category URL / slug. Category names and slugs must be unique.
3. Description, category image and its Image description, and Display order are optional. Use the category image only when the website design needs it.
4. Publish the category. Published categories appear in the public category list even before products are assigned.
5. Assign products using their Product category reference. Editing a category's display name keeps that reference intact.

The public category list currently contains only published categories. Draft categories are not public.

## Images

Upload product and category images in their Sanity image fields. Use original product photography, keep labels readable, and write descriptive alt text. Sanity stores and serves the assets; do not put private product images or data in the Git repository. If an image upload fails, verify the editor's Sanity access and retry from Studio.

## Website update and deployment

Content edits do not require a website deployment. Publish in Studio and refresh the website.

For source-code changes, work from this repository, install the locked dependencies, then run tests and builds:

~~~powershell
npm ci
npm test
npm run typecheck
npm run build
npm run build:vinext
~~~

The production build needs these public build-time values. They are project identifiers and URLs, not credentials:

~~~powershell
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "tmnhiibx"
$env:NEXT_PUBLIC_SANITY_DATASET = "production"
$env:NEXT_PUBLIC_SANITY_API_VERSION = "2026-10-01"
$env:NEXT_PUBLIC_SITE_URL = "https://my-star-food-products.allprotechlabs.workers.dev"
$env:PRODUCT_SOURCE = "sanity"
$env:SITE_INDEXABLE = "true"
npm run deploy:vinext
~~~

That script is configured for the existing my-star-food-products Worker. Confirm the target before running it. It does not push to GitHub. The current workflow deploys through the Cloudflare CLI; updating GitHub alone does not update the live Worker. Never put a write token in source or commit .env.local. The current dataset is public-read, and the site does not require a Sanity API token for published catalogue reads. Studio edits use the signed-in editor account.

The Cloudflare Worker configuration sets PRODUCT_SOURCE=sanity and SITE_INDEXABLE=true. Keep local .env.local at localhost and noindex settings. The build-time site URL must be set to the production URL when making a release so canonical URLs and the sitemap stay correct.

## Search, enquiries, and indexing

The Products page supports case-insensitive search and category filtering together. General WhatsApp enquiries open a draft with:

~~~text
Hello MY STAR FOOD PRODUCTS,

Please share more information about your products. Thank you.
~~~

Product enquiry buttons keep product-specific text. WhatsApp does not send automatically; the visitor must review and press Send. The live robots.txt allows indexing and the sitemap uses the production workers.dev host. Studio is excluded from indexing.

## Backups and recovery

Make periodic Sanity dataset exports and store them in a secure location outside this repository. For example, after creating the destination directory:

~~~powershell
sanity datasets export production "$env:USERPROFILE\Documents\SanityBackups\production-YYYY-MM-DD.tar.gz" --project-id tmnhiibx
~~~

The export includes documents and assets by default. Confirm each export completes, record its date, and keep at least one separate copy. The repository is not a CMS backup.

For recovery, first import a backup into a separately prepared non-production dataset and verify documents, references, and images. Do not use the --replace or --replace-assets options against production without an approved recovery plan. A production restore or destructive recovery must be handled by the Sanity project owner after confirming the target dataset and backup.

## Access and ownership checklist

- [ ] Client signs into the Studio URL with their own Sanity account.
- [ ] Confirm that client's account is a member of project tmnhiibx and has the agreed role for editing and publishing.
- [ ] Confirm the client and project owner can access Cloudflare account settings and the my-star-food-products Worker, or record the agreed ongoing operator.
- [ ] Decide whether to keep the workers.dev URL or connect a client-owned custom domain. Verify registrar and DNS access before making changes.
- [ ] Store Cloudflare and GitHub recovery contacts with the authorized owners. Do not share passwords or API tokens in this document.
- [ ] Approve and push the prepared GitHub commit when ready.

The current signed-in Studio session and Cloudflare deployment are under the Allprotechlabs account. The client's own account identity and Cloudflare ownership/access arrangement were not provided, so those client-side access checks remain unverified.

## Verification and remaining items

- Cloudflare deployment version cbb3f96f-a2de-4afb-8a16-9f4bdf83aa87 was listed at 100% active for the existing Worker.
- HTTPS homepage, product listing, all four product detail pages, Studio tables/forms, robots.txt, and sitemap were checked. Search/category combinations, product images, and the general WhatsApp draft were checked in the browser.
- Sanity CORS includes the two existing localhost origins and the production workers.dev origin with credentials enabled.
- 16 automated tests passed. TypeScript, Next.js production build, and Vinext/Cloudflare production build passed. There is no lint script in package.json.
- The source changes are still local and unpushed. Client Sanity member permissions, Cloudflare account ownership handoff, and any custom domain still require client confirmation.
