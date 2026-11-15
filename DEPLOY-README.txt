MIND ASSEMBLY — NETLIFY MANUAL DEPLOY

1. Back up the current site or keep the original ZIP.
2. Sign in to Netlify and open the existing mindassembly.netlify.app project.
3. Find Deploys > Deploy manually / Drag and drop.
4. Drag this extracted folder (the folder with index.html at its root) onto the deploy area.
5. Verify that the production URL remains mindassembly.netlify.app.
6. Test: Home, About, Initiatives, Explore, Our People, FAQs, Get involved, Contact; check the test redirect and social links.

Do not drag a folder containing a second nested site folder: Netlify must see index.html at deploy root.
The site is static and includes no backend, registration process, data storage or embedded test.
Third-party URLs can change after this release; periodically recheck them.
