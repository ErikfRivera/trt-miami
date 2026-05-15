<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploys

Vercel auto-deploys from the `ErikfRivera/trt-miami` GitHub repo:

- Push to `main` → production deploy on `trt-miami.vercel.app` / `miami.stronghealth.com`.
- Push any other branch / open a PR → preview deploy at a unique URL.

Do **not** run `vercel deploy --prod` from the CLI. Manual CLI deploys bypass the commit graph, set `meta.gitDirty: 1` if the worktree is dirty, and can ship a different snapshot than what's on `main`. If a production deploy is missing or broken, check the Vercel project deployments tab to see the failed build — don't paper over it with a CLI redeploy.
