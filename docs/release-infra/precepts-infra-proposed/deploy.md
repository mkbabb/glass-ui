# Deploy: the glass-ui demo ships to Cloudflare Pages from CI

**Status**: binding precept. The demo at `glass.babb.dev` tracks the published
package. It deploys from CI only, after a release; nothing on a dev machine runs
wrangler against the account.

---

## The trigger

`.github/workflows/deploy-demo.yml` runs when the `release` workflow completes
with success, and on manual dispatch. It deploys only when all of these hold:

- the tag is a plain `vX.Y.Z` (a prerelease such as `v12.0.0-rc.1` skips);
- `package.json`'s version equals the tag;
- npm serves that version as `latest` for `@mkbabb/glass-ui`. A `--tag v10`
  maintenance publish lands under `v10`, so it skips. The step polls for up to
  five minutes while the registry catches up with the publish.

Every skip is a `deploy SKIPPED` warning and a green run.

## The steps

1. Check out the released tag's commit; `npm ci`; `npm run demo:dist:build`.
2. If `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` is absent, warn
   `deploy SKIPPED` and stop green; no assert runs.
3. `wrangler pages project create glass --production-branch=master`, which
   answers "already exists" on every run after the first.
4. `npx --yes wrangler@4 pages deploy dist-demo --project-name=glass
   --branch=master --commit-hash=<sha> --commit-dirty=true`. `--branch=master`
   is the production branch: any other name cuts a Preview deployment that exits
   0 and never reaches the domain.
5. Try to attach `glass.babb.dev` (the Pages domain, and the proxied CNAME if the
   token has Zone DNS edit). It reports what it did and never fails.
6. Assert a Production deployment references the built commit.
7. `scripts/check-served.mjs`: the live index references the built asset set, every
   file in `dist-demo/assets` is served as itself (not as the HTML fallback with a
   200), and the index carries the built CSP and `no-transform`.
8. `scripts/check-live.mjs`: `/` and `/substrates/aurora` at 390 and 1440, light and
   dark, raise no console error and no CSP violation, and request no other host.

Steps 7 and 8 run against `glass.babb.dev` once it serves, else against the
project's pages.dev host.

## Secrets

Two repo secrets on `mkbabb/glass-ui`, the same pair the sibling repos carry:
`CLOUDFLARE_API_TOKEN` (Account → Cloudflare Pages → Edit on the account that
holds babb.dev; add Zone → DNS → Edit on babb.dev to let the workflow write the
CNAME) and `CLOUDFLARE_ACCOUNT_ID`. The token is never read back or kept on disk.

## Rollback

Redeploy the prior tag's tree: Actions → deploy-demo → Run workflow, with `tag`
set to the last good `vX.Y.Z` and `rollback` checked (it skips the `latest`
check, since an older tag is no longer `latest`). The tree at the tag is the
source of truth. Only tags that carry `deploy-demo.yml`, `demo/_headers` and the
two check scripts can be redeployed this way.

## Local checks

The two asserts take a URL, so they run against the built demo locally:

```bash
npm run demo:dist:build && npm run demo:dist:serve      # http://localhost:5200
node scripts/check-served.mjs http://localhost:5200/ --tries 1
node scripts/check-live.mjs http://localhost:5200 --emulate-headers dist-demo/_headers
node scripts/check-live.mjs http://localhost:5200 --emulate-headers dist-demo/_headers --browser webkit
```

`vite preview` ignores `_headers`; `--emulate-headers` applies the file to every
same-origin response so the local run is held to the deployed CSP.
