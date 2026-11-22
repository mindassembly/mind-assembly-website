# Mind Assembly — Explore integration (staging only)

**Do not upload this to the `main` branch yet.** This is the Astro Explore source, not a ready-to-host HTML website. It needs `npm run build` before Cloudflare can serve it.

## Goal

Add this to the existing repository `mindassembly/mind-assembly-website` on a **separate branch named `explore-astro`**. Keep all existing HTML pages and the existing `assets` folder. Do not overwrite `index.html`, `people.html`, `about.html`, or any older page.

## Recommended Mac workflow: GitHub Desktop

1. Install and open https://desktop.github.com/ and sign in.
2. File → Clone repository → select `mindassembly/mind-assembly-website` → Clone.
3. In GitHub Desktop select Current Branch → New Branch → name it `explore-astro` → Create Branch.
4. Open the cloned repository folder in Finder.
5. Extract this ZIP. Copy the *contents* of the extracted folder into the cloned repository **root** (where `index.html` is). Do not create an extra enclosing folder. It should now contain `package.json`, `astro.config.mjs`, `src/`, `scripts/`, `public/` alongside existing `index.html`, `about.html`, `people.html`, `assets/`.
6. Return to GitHub Desktop. Review changed files. Commit with the message `Add Astro Explore library prototype` and click **Publish branch** (not `main`).

## Verify before release

Open the cloned repo in VS Code. If Node.js 22+ is installed, use a terminal in that folder:

```
npm install
npm run build
npm run dev
```

Then open `http://localhost:4321/explore/`.

The `npm run build` script imports the existing HTML website into Astro's `public/` folder and builds the new Explore catalogue, article pages and Pagefind index into `dist/`. In the final published site `/explore.html` redirects to `/explore/` so existing links continue working.

**Do not publish as your main site yet:** The 10 sample articles are editorial drafts and have not been independently checked for publication. Verify citations, URLs, technical accuracy, clinical claims and permission before production release.

## Cloudflare testing

Safest option: create a **separate** Cloudflare Pages project linked to this same GitHub repository, using `explore-astro` as its production branch. Configure `npm run build` as the build command and `dist` as the output directory. Do not assign `mindassembly.in` to the test project. This keeps your existing `mind-assembly-website.pages.dev` production site unchanged.

Astro site generation and Pagefind indexing require a successful package installation and build; this ZIP was prepared without running that Astro build.
