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

The `trt-miami` Vercel project (team `team_Yxc4Z9WREhXc67eTWl2r2nNr`) targets `trt-miami.vercel.app` and `miami.stronghealth.com`.

> ⚠️ **STR-130:** Native GitHub auto-deploy is currently broken — the Vercel project is not linked to the GitHub repo because the Vercel GitHub App install does not include `trt-miami`. Until that is fixed, **CLI deploys are the break-glass path**: `vercel deploy --prod --cwd site`. Keep your worktree clean so `meta.gitDirty` is not set. Once the App grant lands and `link.productionBranch` shows `main` on the project, switch back to push-driven auto-deploy and stop running CLI deploys.

A drift guard at `.github/workflows/deploy-drift-guard.yml` checks every 10 minutes and on every push whether the production deploy SHA matches `origin/main`; it fails loudly if they drift.
