<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploys

> **Status (STR-130):** native Vercel GitHub auto-deploy is **broken** right now. The Vercel project (`trt-miami`, team `team_Yxc4Z9WREhXc67eTWl2r2nNr`) is **not linked** to `ErikfRivera/trt-miami` because the Vercel GitHub App install has `isAccessRestricted: true` and the repo is not on its selected list. Until the CEO grants the Vercel App access to the repo, pushes to `main` produce at most a `target: null` preview deploy — they do **not** roll prod.

### Break-glass: CLI deploy is allowed (for now)

While auto-deploy is broken, `vercel deploy --prod --cwd site` from the repo root is the **only** path that ships prod. Use it after every commit that needs to be on `https://miami.stronghealth.com`. Keep the worktree clean before deploying so `meta.gitDirty` does not get set.

### When native auto-deploy is restored

Once the App access grant lands and the project shows `link.productionBranch: "main"` (verify with `curl https://api.vercel.com/v9/projects/prj_DCkQB7U5QPj2VVWmJgNSiwPAAuV2`), revert to:

- Push to `main` → production deploy on `trt-miami.vercel.app` / `miami.stronghealth.com`.
- Push any other branch / open a PR → preview deploy at a unique URL.
- Do **not** run `vercel deploy --prod` from the CLI. CLI deploys bypass the commit graph and can ship a different snapshot than what's on `main`. If a production deploy is missing or broken, check the Vercel project deployments tab to see the failed build.

### Drift guard

`.github/workflows/deploy-drift-guard.yml` runs hourly and on every push to `main`. It compares `origin/main` against the SHA exposed at `https://miami.stronghealth.com/sha.txt` (served by `src/app/sha.txt/route.ts`, populated from `VERCEL_GIT_COMMIT_SHA` at build time) and fails the workflow after a 5-minute grace period. No repo secrets required — STR-158 removed the Vercel API dependency after the `VERCEL_TOKEN` kept getting revoked.
