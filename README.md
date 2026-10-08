# TAPPED IN Media

The original single-page prototype, prepared for a Vercel test deployment. Its design, service sections, quote builder, pricing, mobile quote bar and quote modal are preserved. No framework or runtime packages are required.

## Run locally

Install Node.js 22 or newer, then run from the repository root:

```sh
npm ci
npm test
npm run build
npm run dev
```

Open `http://localhost:3000`. `npm start` also starts the local server. The build produces `dist/index.html` and `dist/favicon.svg`.

## Deploy a test site on Vercel

1. Import this GitHub repository into Vercel.
2. For a branch preview, select `setup/vercel-test-deployment`, or merge the pull request and deploy `main`.
3. Use **Other** as the framework preset and the repository root as the root directory.
4. Use **npm ci** for installation, **npm run build** for the build command, and **dist** as the output directory. The build/output settings are also saved in `vercel.json`.
5. No environment variables are required. Deploy and open the URL Vercel provides.
6. Check the service accordions, six quote steps, default R22,500 total, additions and discounts, quote modal, printing, mobile quote bar, and both application/request buttons.
7. Test contact handoff using an email app. Confirm the draft includes the enquiry details and, when selected, the full quote. Sending happens in the email app, not on this website.

Vercel can create a preview for the pull request after its GitHub integration is connected. Publication and custom-domain setup are separate from these code changes.

## Environment variables and credentials

- **Required application variables:** none.
- **Optional local variable:** `PORT` changes the development-server port (default `3000`).
- **Secrets:** none are required or included. A future server-side email integration will need its own documented provider credentials in Vercel environment settings; never put them in the HTML.

## Contact behavior and test limitations

The prototype's false "received" message has been removed. The contact button now opens a real `mailto:` draft addressed to `hello@tappedin.media`. It retains the entered details and explicitly tells the visitor that the website has sent nothing. A configured email app is required; a direct-email fallback is shown. This is an interim handoff for test deployment, not automatic enquiry delivery.

Free media day and media access buttons now lead to the contact form with the correct enquiry context. Quote enquiries include the selected quote snapshot in the draft. The mailbox itself has not been verified. There is no database, login, online booking, payment processing, media upload or stored enquiry history.

Custom advertising must be a nonnegative amount in R500 increments; invalid values cannot generate a quote. Activation remains separately quoted. "Start again" retains the prototype's behavior: it clears content and creative selections. Refreshing resets browser-only state.

The Node test suite checks navigation targets, script syntax and quote calculations. Desktop/mobile Chromium interaction checks were also performed during preparation. Cross-browser/device testing, accessibility improvements to labels/modal focus, and real mailbox receipt remain outstanding before a production launch. Long email drafts may encounter limits in some email clients.

## Files

- `index.html`: original interface, styles, pricing and browser behavior.
- `favicon.svg`: small text-based brand icon.
- `scripts/build.cjs`: copies public assets into `dist/`.
- `scripts/serve.cjs`: dependency-free local server, exposing only public assets.
- `tests/site.test.cjs`: Node regression checks.
- `vercel.json`: Vercel build and output settings.

No application source has been redesigned, and deployment does not require a framework migration.
