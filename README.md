This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This repo is wired to Vercel's Git integration on the `trt-miami` project (team `team_Yxc4Z9WREhXc67eTWl2r2nNr`):

- Pushing to `main` triggers a production deploy.
- Pushing any other branch / opening a PR triggers a preview deploy with a unique URL.

There is no manual deploy step. Do **not** run `vercel deploy --prod` from the CLI — CLI deploys bypass the commit graph and can ship a different worktree snapshot than what's on `main`. If a production deploy is missing or broken, check the Vercel project deployments tab to see the failed build.
