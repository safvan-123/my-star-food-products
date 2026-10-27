# Updated sample-content edition — validation

Date: 27 October 2026

Implemented: nine sample products across three categories; six featured products; local original SVG package illustrations and alternate gallery images; complete suggested company introduction, mission, vision and services. The public client-review placeholder messages have been removed. Existing routes, styling, animations, Sanity schema and enquiry behavior remain.

Automated checks: ten tests cover GROQ visibility/order, featured/related queries, enquiry encoding, safe JSON-LD, mobile-menu behavior, selected-size enquiry updates, sample-data completeness/assets and explicit source switching. Full TypeScript and Next.js production build checks are run before packaging.

Sample data is local, never written to Sanity. Auto mode switches to real data when Sanity is configured and never repopulates an empty real catalogue with samples. Demo mode disables indexing and excludes sample products from sitemap and Product JSON-LD.

Limitations: real Sanity login/uploads/CRUD and production hosting have not been tested without the client account and domain. Draft company/service copy and sample product ingredients/packaging must be replaced or approved before public launch. The package illustrations are examples, not actual product photos. Prior browser checks covered the reference desktop composition and narrow mobile layout; managed browser interactions were unreliable, while the React DOM menu and package-size tests passed. This update does not add Cloudflare adapter configuration.
