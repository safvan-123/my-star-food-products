# MY STAR FOOD PRODUCTS — Retail Supply Website Update

## What changed (12 November 2026)

This is an update of the **same** Next.js + Sanity project, not a replacement stack.

- Repositioned the public site as a **shop-to-shop / B2B food-product supplier** based at Mylakuzhy, Nellanad, Venjaramoodu, Thiruvananthapuram, Kerala 695607.
- Reworked the homepage into a business-oriented sequence: product-focused hero, three core categories, featured products, three-step retail supply process, business story, supply services, retailer enquiry form, contact CTA.
- Rewrote the About, Retail Supply, Product Catalogue, Product Detail and Contact pages to speak to retailers, grocers and provision shop owners.
- Added direct Maps location from the client-provided URL: https://maps.app.goo.gl/UDJ4L2998JrNuQbU7. The contact page includes a map and an exact-pin link.
- Introduced a premium forest-green, cream and warm-spice colour palette, reusing the supplied logo and illustrative product artwork.
- Improved responsive layouts for large screens, tablets and phones. Mobile navigation retains keyboard and Escape support; animations honour reduced-motion preferences.
- Added a client-side retailer enquiry component that prepares a WhatsApp message containing shop name, contact, location, product interests and requirements. There is no database submission and no message is sent until the visitor presses Send in WhatsApp.
- Preserved the published-products Sanity CMS flow, all main routes, product galleries, filters, product pages, direct WhatsApp links and the original contact details.

## Important: demo product and marketing accuracy

**The six local demo records are placeholders, NOT verified live stock.** They are Chilli Powder, Turmeric Powder, Coriander Powder, Garam Masala, Rice Flour and Roasted Rava. Their images are labelled illustrative. The sample pack sizes, exact ingredients and packaging must not be treated as confirmed product data. The older sample snack files remain in `public/images/demo/` but have been removed from the demo catalogue, so the preview prioritizes spices and powders. No existing Sanity product records are changed or deleted.

Before production, ask the business to approve:

1. Exact product list, categories, actual brand pack photos and printed ingredient/weight details.
2. Supply coverage, order minimums, delivery conditions, stock availability, pricing and payment terms.
3. Whether 'Roasted Rava' and 'Garam Masala' are supplied — they appear **only in sample mode** pending approval.
4. Director name, contact numbers, email, social links and Google Maps pin from the original project's business record.
5. Wording for the supplied-company description, mission and vision. Avoid unsupported claims about certifications, manufacturing processes, 100% purity, guaranteed deliveries or precise years of operation.
6. The supplied WhatsApp QR image — check that it scans to the desired number.

### Main editable files

- `src/lib/business.ts`: contact data, navigation, location and map link.
- `src/lib/content.ts`: content, category highlights and service descriptions.
- `src/lib/demo-products.ts`: layout preview products; not real inventory.
- `src/lib/whatsapp.ts`: WhatsApp messages for general, product and shop enquiries.
- `src/components/retailer-enquiry.tsx`: B2B enquiry fields.
- `src/app/globals.css`: entire visual system (new redesign section appended at end; legacy styles retained for unchanged components).
- `src/app/(website)/`: public pages.

### Windows beginner quick start

1. Install Node.js 24 LTS. (The original project requires Node.js at least 22.12; using recent Node 24 LTS is recommended.)
2. Extract the ZIP to a folder. Open that folder in VS Code. Ensure `package.json` is visible.
3. Open Terminal > New Terminal; run:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

4. Open http://localhost:3000 in your browser. The six sample products appear if Sanity is not configured.
5. Test mobile layouts using Chrome DevTools > Toggle device toolbar.
6. Use `npm run typecheck`, `npm test`, and `npm run build` after installing dependencies.

### Launch with confirmed real products

1. Connect the client's Sanity project as described in `README.md` and publish each approved product at `/studio`.
2. Use categories spelled exactly `Spice Powders`, `Blended Masalas` and `Flours & Essentials` if you want the homepage category cards to filter correctly. Categories are plain editable text and legacy products are preserved.
3. Give real photos, names, ingredients and weights to each product. Set **Featured Product** on up to six products for the homepage.
4. Set `PRODUCT_SOURCE=sanity` in `.env.local`, add the real `NEXT_PUBLIC_SITE_URL`, and verify all links.
5. Set `SITE_INDEXABLE=true` only after client approval. The project intentionally blocks indexing while using demo products.
6. Deploy the original Next.js app using the existing deployment instructions.

### QA checklist

- [ ] Desktop and mobile header navigation work; no horizontal scrolling at 320, 375, 768, 1024 and 1440 px.
- [ ] Home hero and illustrations render; reduced-motion mode does not animate.
- [ ] Product category links show correct filtered products.
- [ ] Product search works for product name, description and category.
- [ ] Product pages and WhatsApp message links contain the correct item and chosen pack size.
- [ ] Shop enquiry form prepopulates the WhatsApp message; no user data submitted to the website.
- [ ] Primary and secondary phone numbers, email, Instagram, WhatsApp QR and Google Maps pin are correct.
- [ ] Real products are published, correct, and samples have been removed before enabling indexing.
- [ ] Build, typecheck and tests run on a computer with dependencies fully installed.

## Automated validation in this editing environment

TypeScript/TSX source files were parsed for syntax and CSS was parsed for syntax. **A production Next.js build and full integration tests were not executed** because `npm ci` did not finish in this environment. Run the commands above on your local Windows PC and resolve any environment-specific issues before deployment.


## Runtime error hotfix — Footer / Contact (12 November 2026)

- The previous archive used `Instagram` from `lucide-react`, but v1.62 removes brand icons.
- A small local `InstagramIcon` now renders in the Footer and Contact page; the rest of the redesign is unchanged.
- `tests/brand-icon-imports.test.ts` checks for discontinued Lucide icons.
- If still seeing the previous error, stop the dev server, delete `.next` (`Remove-Item -Recurse -Force .next` in PowerShell), then `npm run dev`.
