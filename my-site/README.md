This is Natasha’s Next.js website, exported as static HTML for GitHub Pages.

To add or format a post, see the [writing guide](./WRITING.md). Each post lives in `content/writing/`; the writing index and article routes are generated automatically.

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

## Deploy to GitHub Pages

`npm run build` exports the site to `out/`. The existing workflow in `.github/workflows/pages.yml` builds and deploys it when changes are pushed to `main`.

See the [writing guide](./WRITING.md) for authoring and validation commands.
