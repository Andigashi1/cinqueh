This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The site describes 5H's services across Italy. Page copy is in `messages/it.json`; search metadata is in the page/layout files and service-area structured data is in `app/components/LocalBusinessSchema.tsx`.

Browser checks target modern Chrome/Edge (Chromium), Firefox, and Safari (WebKit). The Next.js 16 and Tailwind 4 baseline is Chrome/Edge 111+, Firefox 128+, and Safari 16.4+; legacy browsers are outside this baseline.

To run the production-site browser checks in PowerShell:

```powershell
npm install
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.playwright-browsers'
npx playwright install chromium firefox webkit
npm run build
npm run test:e2e
```

The tests cover all four pages at 320, 390, 667, 768, and 1440 pixels, contact navigation, horizontal overflow, mobile keyboard navigation, resize scroll unlocking, reduced motion, and content visibility without JavaScript or IntersectionObserver. Browser binaries and test output are ignored by Git and ESLint. If Windows Application Control blocks a browser DLL, that browser must be checked on a machine whose policy permits it.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
