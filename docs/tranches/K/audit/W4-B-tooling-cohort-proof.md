# K W4 Lane B — Tooling Cohort Proof

**Date**: 2026-05-09
**Lane**: B — bundle-budget gate restoration + tooling cohort
**Wave**: K W4 (Doc + Tooling Cohort Restoration)
**Mode**: implementation
**Author**: K W4 Lane B agent
**Status**: ready for orchestrator close

## Scope

Re-land four items dropped or regressed since I.W6 / J close:

1. Bundle-budget gate (`profile:budget` script + `scripts/profile-bundle.mjs` BUDGETS table + GitHub workflow job) — Rβ A13, J ε P1-A.
2. Stress harness retire-or-restore decision — Rβ A32.
3. `ay-close` script retire — Rβ A33.
4. Lighthouse P2-1 — `<meta name="description">` on `index.html`.

## Step 1 — Bundle-budget gate restoration

### Files touched

- `scripts/profile-bundle.mjs` — extended with BUDGETS table + per-file PASS/FAIL report + `--enforce` flag (env-equivalent `GLASS_UI_BUDGET_MODE=1`) + `--skip-build` flag (env-equivalent `GLASS_UI_BUDGET_SKIP_BUILD=1`). Artifact path moved from `docs/tranches/F/audit/W1-bundle-profile.json` to `docs/tranches/K/audit/W4-bundle-profile.json` (default; overridable via `GLASS_UI_BUNDLE_ARTIFACT`).
- `package.json` — added `profile:budget` script.

### Measurement methodology

Built dist/ via the W0 close build (`vite build`, current HEAD). Measured `glass-ui.js` and `glass-ui.css` by `statSync(...).size` for raw bytes and `gzipSync(readFileSync(...)).length` for gz bytes. Headroom: ~30% over current measured size per K invariant 12 + Rβ A13 K disposition + ε measurement guidance.

### Current dist/ measurements (2026-05-09)

| File | raw | gz |
|---|---:|---:|
| `dist/glass-ui.js` | 146_129 | 25_928 |
| `dist/glass-ui.css` | 22_359 | 4_420 |

### BUDGETS table

```js
const BUDGETS = {
    "dist/glass-ui.js":  { raw: 190_000, gzip: 33_700 },
    "dist/glass-ui.css": { raw:  29_000, gzip:  5_750 },
};
```

Headroom: 30.0% raw / 30.0% gz on `glass-ui.js`; 29.7% raw / 30.1% gz on `glass-ui.css`. Per K W4 spec REVISION sequencing, the table re-baselines at K W8 close after speedtest W3.perf.B.T5 ships v0.9.2 (cn() refactor, expected ~10–18 KB gz drop on glass-ui.js).

### npm script added

`package.json:319` (between `profile:bundle` and `profile:aurora`):

```json
"profile:budget": "node scripts/profile-bundle.mjs --enforce",
```

### Run output (verification, dist/ at HEAD)

```
> @mkbabb/glass-ui@0.9.2 profile:budget
> node scripts/profile-bundle.mjs --enforce

Bundle profile written: /Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/W4-bundle-profile.json

Bundle budget report:
  [PASS] dist/glass-ui.js  — raw 146129 / 190000 (76.9%); gzip 25928 / 33700 (76.9%)
  [PASS] dist/glass-ui.css — raw  22359 /  29000 (77.1%); gzip  4420 /  5750 (76.9%)
```

Exit code: `0`. (Verified twice — once in foreground, once via `> /dev/null`. Both green.)

The local invocation used `GLASS_UI_BUDGET_SKIP_BUILD=1` since dist/ was already fresh from the W0 close build (per dispatch instructions: agents do not run `npm run build`). The CI workflow runs `npm run build` first, then `GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget` — same code path, same assertion.

## Step 2 — GitHub workflow job

### Files touched

- `.github/workflows/lint.yml` — created (directory `.github/workflows/` did not exist at HEAD; created by this lane).

### Job snippet

```yaml
name: lint

on:
    pull_request:
        branches: [master]
    push:
        branches: [master]

jobs:
    bundle-budget:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: 20
            - run: npm ci
            - run: NODE_OPTIONS=--max-old-space-size=8192 npm run build
            - run: GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget
```

The `GLASS_UI_BUDGET_SKIP_BUILD=1` prefix avoids a redundant second build inside `profile-bundle.mjs` (the previous step already built). The `NODE_OPTIONS=--max-old-space-size=8192` mirrors the dispatch template guidance for memory-bound vue-tsc / vite builds in CI.

The workflow shape diverges intentionally from I.W6's `continue-on-error: true` soft-fail: K invariant 12 promotes the gate to **binding** ("would PASS at HEAD with ~30% headroom; re-land is mechanical"). The job hard-fails on budget overrun, which is the K-tranche posture per the invariant.

## Step 3 — Stress harness retire + ay-close retire

### Stress harness — RETIRED (default per K W4 spec)

**Decision**: RETIRE.

**Evidence at HEAD (pre-W4)**:
- `scripts/stress/` directory does not exist (verified via `ls`).
- No `stress` npm script in `package.json:scripts` (verified via `grep -n stress package.json`).
- The harness was effectively retired by absence (v0.8.0 consolidation `5baceb5` dropped it without a formal retire entry).

**Rationale**: Per K W4 Lane B Step 2 default — without active speedtest co-development of a runtime-stress baseline, the harness is substrate-without-consumer (K invariant 8). The R2 stress runtime profile capture from H.W5 (`13ca1c3`) was the last consuming baseline; speedtest W tranche does not re-engage stress baselines (cross-checked against `docs/tranches/K/K.md` cross-repo coordination section). Restoration would require a paired speedtest baseline lane, which is out of K scope.

**Action taken**: None — harness was already absent at HEAD; this proof formally records the retire decision so a future tranche does not re-litigate. Per K W4 spec: "available at backup tag if needed" — recoverable from `63e29e4` if a future tranche re-opens stress baselines.

### `ay-close` — RETIRED

**Decision**: RETIRE.

**Evidence at HEAD (pre-W4)**:
- `package.json:320` had `"ay-close": "scripts/ay-close.sh"` (verified via `grep -n ay-close package.json` → line 320 hit, now removed).
- `scripts/ay-close.sh` file still exists at HEAD (1730 bytes; F-tranche pinned artefact paths).

**Action taken**: Removed the `"ay-close"` entry from `package.json` scripts block. The `scripts/ay-close.sh` file itself is left in place (Lane B file bounds list `package.json` for Step 3 only; the shell script is out of bounds for this lane). The script is now unreachable via `npm run` and is dead code on disk; a follow-up lane in K W8 close ceremony or a future doc-cleanup tranche can delete the file.

**Diff**:

```diff
         "profile:bundle": "node scripts/profile-bundle.mjs",
+        "profile:budget": "node scripts/profile-bundle.mjs --enforce",
         "profile:aurora": "node scripts/profile-aurora.mjs",
-        "ay-close": "scripts/ay-close.sh",
         "validate-consumers": "scripts/validate-consumers.sh",
```

**Residual** (not blocking K close): `scripts/ay-close.sh` remains on disk; recommend deletion in K W8 close ceremony cleanup pass or absorb in a successor doc-cleanup tranche.

## Step 4 — Lighthouse P2-1 meta-description

### File touched

- `index.html` — added `<meta name="description">` after the `<meta name="viewport">` line and before `<link rel="icon">`.

### Location + content

Inserted at lines 6–9 (after the viewport meta, before the icon link):

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta
    name="description"
    content="Glassmorphic design system — Vue 3.5 components, glass tokens, motion primitives."
/>
<link rel="icon" href="data:," />
<title>glass-ui Feature Demo</title>
```

Coordinates with WP Step 5 if WP needs to touch the Google Fonts `<link>` block — these edits are textually disjoint (this lane: lines 1–10 head meta region; WP: lines 21–24 fonts stylesheet block).

## Verification summary

| Gate | Status |
|---|---|
| `npm run profile:budget` exits 0 | PASS (verified) |
| BUDGETS table values + measurement methodology | recorded above |
| GitHub workflow job present + active | PASS (`.github/workflows/lint.yml` created) |
| Stress harness disposition documented | RETIRE (recorded above) |
| `ay-close` removed from package.json | PASS (line 320 entry removed) |
| `<meta name="description">` added to index.html | PASS |
| No mutating git commands run | confirmed (read-only `git show`, `git log`, `git -C ... log`) |

## Files changed

| Path | Action |
|---|---|
| `scripts/profile-bundle.mjs` | extended with BUDGETS table + per-file PASS/FAIL report + `--enforce` / `--skip-build` flags + artefact path moved to `K/audit/` |
| `package.json` | added `profile:budget` script; removed `ay-close` script |
| `.github/workflows/lint.yml` | created (directory + file) — `bundle-budget` job |
| `index.html` | added `<meta name="description">` after viewport meta |
| `docs/tranches/K/audit/W4-B-tooling-cohort-proof.md` | this file (created) |
| `docs/tranches/K/audit/W4-bundle-profile.json` | budget report artefact (regenerated by the verification run) |

## Bounds compliance

- MODIFIED only: `package.json`, `scripts/profile-bundle.mjs`, `.github/workflows/lint.yml`, `index.html`. All within Lane B bounds.
- NO touch to: `src/`, `demo/`, `CLAUDE.md`, `README.md`, `DESIGN.md` (Lane A territory).
- NO mutating git operations were run by this agent. Read-only git only (`git show 63e29e4 -- scripts/profile-bundle.mjs`, `git log --oneline -5 -- scripts/ay-close.sh`).

## Cross-wave sequencing (K close)

Per K W4 REVISION 2026-05-08:

1. K W4 lands (this proof) → bundle-budget gate active at v0.9.2.
2. Speedtest W2 ships v0.9.1 (small ScrollingText delta — well within current 30% headroom).
3. K W8 close re-baselines BUDGETS to absorb v0.9.1 measurement.
4. Speedtest W3.perf.B.T5 ships v0.9.2 (cn() refactor, expected ~10–18 KB gz drop on glass-ui.js).
5. K W8 close (or successor tranche) re-baselines BUDGETS to absorb v0.9.2.

The brittleness window during the v0.9.2 ship (BUDGETS captures pre-v0.9.2 state) is acknowledged in K W4 spec; gate stays enforced through the window — the post-v0.9.2 build will land further under-budget, not over.
