# deploy-demo: glass.babb.dev (W-0.13)

The glass-ui demo ships to the Cloudflare Pages project `glass` at
`glass.babb.dev`, from CI only, after a release that npm serves as `latest`.
The spec is `docs/tranches/BL/waves/W-0.13.md`, and its 2026-11-10 addendum
wins where the two differ. The shape copies daraksha's
`.github/workflows/deploy-pages.yml`.

## What landed

| File | What it does |
|---|---|
| `.github/workflows/deploy-demo.yml` | the deploy: workflow_run of `release` (success) and workflow_dispatch (`tag`, `rollback`) |
| `demo/_headers` | the Pages headers template |
| `demo/vite.demo-dist.config.ts` | `pagesHeaders()` writes `dist-demo/_headers`, filling `script-src` with the sha256 of each inline script in the built `index.html`; `assetsDir: "assets"` is pinned beside it |
| `scripts/check-served.mjs` | served-build assert, against a URL |
| `scripts/check-live.mjs` | live assert, against a URL, `--browser chromium\|webkit`, `--emulate-headers <file>` |
| `docs/release-infra/precepts-infra-proposed/{domains,deploy}.md` | the glass text for `docs/precepts/infra/` (see below) |

### The workflow, step by step

1. **Gate.** The job runs on dispatch, or when `release` concluded `success`.
   `TAG` is `workflow_run.head_branch` (a tag-push run's head_branch is the tag
   name) or `inputs.tag`. Checkout is `workflow_run.head_sha` or the tag.
2. **Release line.** Each failure is a `::warning title=deploy SKIPPED::` plus
   `go=false`, and the run exits 0:
   - `TAG` must match `^v[0-9]+\.[0-9]+\.[0-9]+$`. A prerelease (`v12.0.0-rc.1`)
     skips, and so does an empty TAG (a release run with no head_branch).
   - `v$(package.json version)` must equal `TAG`.
   - `rollback=true` (dispatch only) passes here, without the npm check.
   - Otherwise it polls `npm view @mkbabb/glass-ui dist-tags --json` 20 times at
     15 s. It passes when `latest == version`. It skips at once when another
     dist-tag holds the version: a `--tag v10` publish lands under `v10`. It also
     skips when the version never appears within about 5 min (registry lag; re-run
     or dispatch later).
3. `npm ci`, `npm run demo:dist:build`, and `test -s dist-demo/_headers`.
4. **Credentials present?** If either secret is absent: `deploy SKIPPED`, green,
   and nothing after this step runs (every later step is gated on `present`).
5. `wrangler pages project create glass --production-branch=master`. "already
   exists" (or code 8000002) is success; any other failure is red.
6. `npx --yes wrangler@4 pages deploy dist-demo --project-name=glass
   --branch=master --commit-hash="$BUILT_SHA" --commit-dirty=true`.
7. **Custom domain, best effort** (`continue-on-error`, never fails). It reads the
   project's real pages.dev subdomain, GETs the Pages domain, POSTs it if absent,
   reads the babb.dev zone, and creates the proxied CNAME to the subdomain if no
   record exists. Each step logs what the token could or could not do. It outputs
   `origin`: `https://glass.babb.dev/` if it answers 200, else the pages.dev host
   (with a warning).
8. **Lineage.** `wrangler pages deployment list --environment=production` must
   contain the short SHA (catches the Preview-that-exits-0 trap).
9. **Served build.** `node scripts/check-served.mjs "$ORIGIN" --headers` (12 tries,
   10 s apart, rides out edge propagation).
10. **Live.** Playwright headless shell (cached by version), then
    `node scripts/check-live.mjs "$ORIGIN"`.

No step echoes a secret. They reach steps only as env, `curl` sends the token in
a header, no `set -x` is used, and GitHub masks secret values in logs anyway.

### The headers (`dist-demo/_headers`, as built)

```
/assets/*      Cache-Control: public, max-age=31536000, immutable
/index.html    Cache-Control: no-cache
/              Cache-Control: no-cache
/*             Cache-Control: no-transform
               Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk='; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
               X-Content-Type-Options: nosniff
               Referrer-Policy: strict-origin-when-cross-origin
```

**The hashed directory, read from the build.** `dist-demo/` is `index.html`,
`assets/` and `_headers`. `assets/` holds 362 files (291 js, 67 css, 4 woff2).
There is no `404.html`, so there is no `_redirects`: Pages serves `index.html`
for unknown paths, and the router's catch-all renders `NotFound.vue`.

**Why the hash is computed.** The dark-mode stamp (`vite.dark-stamp.ts`) is an
inline `<head>` script. A hand-pasted hash would drift whenever
`darkModeSyncScript()` changes. `pagesHeaders()` hashes the bytes it just wrote.

### How the CSP was derived (measured)

Static read of `dist-demo/assets`:
- no `new Worker`/`SharedWorker`, so no `worker-src`;
- `WebAssembly` appears only in a list of global names inside the typescript
  grammar chunk, so no `'wasm-unsafe-eval'`;
- no `eval`/`new Function`;
- fonts are the 4 self-hosted woff2;
- `data:image/svg+xml` appears in `index-*.css` (paper textures) and in the
  avatar fallback;
- the only `http(s)://` literals are doc links and placeholders, never fetched;
- `fetch()` is used only by `textureUpload` on caller-given URLs;
- `<style>` creators: vueuse `useColorMode`'s disableTransition and Vue's
  custom-element shadow styles;
- no stringified static tree carries a `style="` attribute.

WebGPU has no CSP directive. Vue `:style` writes through the CSSOM, which
`style-src` does not govern.

Dynamic, via `--emulate-headers` (see the gates):
- Dropping the hash: every load raises `script-src-elem blocked inline`. The
  emulation enforces, and the hash is load-bearing.
- Dropping `data:` from `img-src`: 14-25 `img-src blocked data` violations per
  load. `data:` is needed.
- `style-src 'self'` without `'unsafe-inline'`: clean on `/` and the deep route.
- **Census**: all 92 routes reachable in two link levels from `/`, at 1440, with
  the CSP enforced and a stricter `style-src 'self'` as report-only. Chromium
  showed 0 violations of either kind. WebKit: not run. The 92-route WebKit census was queued for the machine-wide WebKit lock for over 30 min behind other sessions and was stopped; the WebKit evidence is the live gate below.
- Theme toggle (configurator → "Toggle dark mode") under the report-only strict
  policy: 0 violations. So `'unsafe-inline'` was dropped from `style-src`.

## Gates run locally (all through `~/.claude/guard/guarded`)

| Gate | Command | Result |
|---|---|---|
| The demo builds | `npm run demo:dist:build` | exit 0 |
| `dist-demo/_headers` exists, hash filled | `grep script-src dist-demo/_headers` | `'sha256-MOGE…EbfJk='`, equal to a hash computed independently in Python over the built `index.html` |
| Unit arms over the demo config | `vitest run tests/composables/dark/darkModeSyncScript.test.ts tests/gates/boot-graph.test.ts --maxWorkers=2` | 23/23, 14/14 |
| Served build, local | `node scripts/check-served.mjs http://localhost:5200/ --tries 1` | PASS: 69 in the index, 362 in `dist-demo/assets` |
| Served build, `--headers`, local | the same, plus `--headers` | FAILS as expected: `vite preview` does not apply `_headers` (this mode is for Pages) |
| **Served build bites** | a copy of `dist-demo` without `assets/Blob-DZg7Ru3K.js`, served by `vite preview --outDir` on :5201 | FAIL, exit 1: `1 of 362 assets not served as built (Blob-DZg7Ru3K.js (200 text/html))`, the real fallback-HTML-with-200 mode. The copy was removed, and the real server still PASSes. (Two plants that did not work are recorded below.) |
| Live, Chromium | `node scripts/check-live.mjs http://localhost:5200 --emulate-headers dist-demo/_headers` | PASS, 8 loads (`/`, `/substrates/aurora` × 390/1440 × light/dark): every request < 400, no console error, no CSP violation, no foreign request |
| Live, Chromium, no WebGPU | the same with `navigator.gpu` deleted by an init script (CI's GPU-less headless shell) | PASS, 8 loads |
| Live, WebKit | `guarded --exclusive webkit -- node scripts/check-live.mjs http://localhost:5202 --emulate-headers dist-demo/_headers --browser webkit` | pending: queued for the machine-wide WebKit lock (see the follow-up commit) |
| The emulation enforces | live with the hash stripped / with `data:` stripped from `img-src` | violations on every load (see above) |
| CSP census, Chromium | 92 routes, CSP enforced plus strict style-src report-only | 0 violations |
| Workflow parses | `actionlint .github/workflows/deploy-demo.yml` (with shellcheck) | exit 0, no findings |

Plants that did not bite, and why:
- A new file added to `dist-demo/assets` after the server started. `vite
  preview` serves new files, so the check passed. The plant was wrong, not the
  script.
- `chmod 000` on a built asset crashed `vite preview` (unhandled EACCES), so the
  check failed with `fetch failed`. That run proves nothing about the fallback
  mode. Restored with `chmod 644`; the server was restarted.

### The skip paths, read

Each path is traced through the release-line step:

| Event | TAG | Outcome |
|---|---|---|
| release run concluded failure | any | job `if` false: the job is skipped |
| tag `v12.0.0-rc.1` | `v12.0.0-rc.1` | the regex fails: `deploy SKIPPED`, green |
| `--tag v10` publish of `10.1.5` | `v10.1.5` | `dist-tags.v10 == 10.1.5`, latest is 11.x: skips on the first poll |
| `v11.1.0`, registry lagging | `v11.1.0` | polls until `latest == 11.1.0` (≤ 5 min), then deploys; if it never appears, a loud green skip |
| tag ≠ package.json | e.g. `v11.1.0` vs `11.0.0` | `deploy SKIPPED` (release.yml already fails this case) |
| dispatch `tag=master` | `master` | the regex fails: skip |
| dispatch `tag=v11.0.0 rollback=true` | `v11.0.0` | deploys the old tree, no npm check |
| secrets absent | — | build runs, then `deploy SKIPPED`, green; project, deploy, domain and asserts are all gated off |
| project already exists | — | create's "already exists" is accepted |
| deploy lands as Preview | — | `--branch=master` prevents it; the lineage step fails red if no Production deployment carries the SHA |
| domain not attached | — | the domain step warns and never fails; asserts run against the pages.dev host |
| stale edge / chunk not propagated | — | check-served retries 12 × 10 s, then fails red |
| re-run of a deploy | same TAG | idempotent: create says exists, a new Production deployment of the same SHA |


## The precepts files

`docs/precepts` is a git submodule (mkbabb/precepts). `infra/domains.md` and
`infra/deploy.md` live inside it and describe sudoku.babb.dev. Per the fence,
nothing was committed in the submodule. The replacement text is in
`docs/release-infra/precepts-infra-proposed/`, to be copied into the precepts
repo, after which `git grep -n sudoku -- docs/precepts/infra` returns nothing.
The worktree's submodule is not initialized.

## The owner's two acts

1. `gh secret set CLOUDFLARE_API_TOKEN` and `gh secret set CLOUDFLARE_ACCOUNT_ID`
   on mkbabb/glass-ui. The token needs Account → Cloudflare Pages → Edit on the
   babb.dev account; adding Zone → DNS → Edit on babb.dev lets step 7 write the
   CNAME.
2. After the first deploy: Pages → glass → Custom domains → add `glass.babb.dev`,
   unless step 7 reports it attached the domain and the CNAME itself.

Until both secrets exist, every release run of deploy-demo is green with
`deploy SKIPPED`.

## Open

- **The first real run.** Nothing here touched Cloudflare. The deploy, the
  project create, the domain API calls and the lineage grep against wrangler's
  `deployment list` output are copied from daraksha's working shape but have not
  run for glass. The first `v*` release after the secrets exist is their test.
- **`workflow_run.head_branch` for a tag push.** This is assumed to be the tag
  name, as for daraksha's branch case. If it comes back empty or different, the
  regex fails and the run skips loud: it never deploys wrongly.
- **The spec's "served version equals npm `latest`".** The demo prints no
  version string. The equivalent proof is the release-line step (package.json ==
  npm latest, before the build) plus check-served (the live bytes are this
  build's).
- **The WebKit route census** (92 routes) was not run; the Chromium census was.
  `'unsafe-inline'` was dropped from `style-src` on the Chromium census, a static
  read and the WebKit live gate. If a WebKit-only path injects a style, the
  post-deploy live assert names it.
- **The precepts submodule** needs the two proposed files copied in, in the
  precepts repo.
- **`npx --yes wrangler@4`** in CI, per the addendum. The old sudoku precept
  warned that bare `npx wrangler` OOMs; that was a local packument issue, and
  daraksha's CI runs this exact form green.
- **Observed, not in scope:** `/dock/dock-search` logs `[demo] app error …
  TypeError: e.addEventListener is not a function` in Chromium. It is not
  CSP-related (it reproduces with no CSP at all), and the live assert covers only `/` and `/substrates/aurora`.
