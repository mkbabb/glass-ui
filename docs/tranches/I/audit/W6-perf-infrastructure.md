# I.W6 — Performance + Bundle Infrastructure

**Wave**: I.W6
**Opens after**: W2 close (HEAD `35773c4` `feat(tranche-i/w1+w2): surface trim wave 2 + alias retire + diary scrub + runtime fixes`).
**Author**: agent I.W6.
**Method**: read the 8 candidate subpath stubs and cross-grep speedtest/words/value.js/bbnf-lang/fourier-analysis/dns-speedtest/speedtest-logging consumer trees; extend `scripts/profile-bundle.mjs` with a budget table; wire `bundle-budget` job into `.github/workflows/lint.yml` as soft-fail; retire `scripts/ay-close.sh`.

## Summary

W6.1 (subpath retire): **0 retired / 9 kept**. Every candidate has at least one cross-repo consumer in the speedtest tree; per I invariant 3 + W0 §1 row 12, cross-repo subpath stability takes precedence over zero-payload retirement. Documented below per subpath.

W6.2 (bundle-budget gate): **landed**. `scripts/profile-bundle.mjs` extended with a `BUDGETS` table and a `GLASS_UI_BUDGET_MODE=1` exit-on-fail mode; `npm run profile:budget` script added; `.github/workflows/lint.yml` gains a `bundle-budget` job with `continue-on-error: true` (soft-fail). Current numbers: `dist/glass-ui.js` 184_254 raw / 35_994 gz vs budget 200_000 / 38_000 (PASS, 92.1% / 94.7%); `dist/glass-ui.css` 39_174 raw / 6_914 gz vs budget 42_000 / 7_500 (PASS, 93.3% / 92.2%).

W6.3 (`scripts/ay-close.sh`): **retired**. F-tranche-era close gate; G/H/I never invoked it; tranche I close pattern uses 6-agent post-close audit (I invariant 4) not a single bash script. Deleted; `npm run ay-close` removed from `package.json`.

W6.4 (dts caching exploration): **findings only, no infra landed**. Current dts phase 14_089 ms on settled tree; API Extractor warning logged 24 times (one per current entry — was 31 pre-W1 retires). Since W6.1 retired 0 subpaths the predicted ⅓ dts-cost reduction did not materialise; further dts caching is escalated to a future tranche residual.

## §1. Sub-task W6.1 — Subpath retire (cross-repo audit)

### 1.1 Candidate set at HEAD

W6.md named 11 zero-payload candidates. W1 Lane A retired 4 of them (`paper-backdrop`, `glass-panel`, `metaballs`, `status-dot`) earlier in this tranche. The remaining **8** plus `hover-popover` (Q-tranche silent addition since H close, also zero-payload at HEAD per `src/hover-popover.ts:1`) form the W6.1 candidate set:

```
$ for f in glyph-face dock-group disco-glyph icon-tooltip instrument-chassis pulse metric-badge toggle-chip hover-popover; do
    cat src/$f.ts
  done
export * from "./components/custom/glyph-face";
export * from "./components/custom/dock-group";
export * from "./components/custom/disco-glyph";
export * from "./components/custom/icon-tooltip";
export * from "./components/custom/instrument-chassis";
export * from "./components/custom/pulse";
export * from "./components/custom/metric-badge";
export * from "./components/custom/toggle-chip";
export * from "./components/custom/hover-popover";
```

All 9 are pure single-line re-exports of the matching `src/components/custom/<name>` package. Public surface flows through both the main barrel and the subpath, so callers can pick either.

### 1.2 Cross-repo consumer audit

Method: `rg -l "@mkbabb/glass-ui/<sub>" speedtest/src/ words/src/ value.js/src/ fourier-analysis/src/ bbnf-lang/src/ bbnf-buddy/src/ dns-speedtest/src/ speedtest-logging/src/`.

| Subpath | Consumer files | Repo |
|---|---:|---|
| `glyph-face` | 4 | speedtest (`SettingsCog.vue`, `ActionCluster.vue`, `PrimaryAction.vue`, `App.surveyEntry.test.ts`) |
| `dock-group` | 1 | speedtest (`MetricStrip.vue`) |
| `disco-glyph` | 4 | speedtest (`PlayDisco.vue`, `CheckDisco.vue`, `ArrowRightDisco.vue`, `RotateCcwDisco.vue`) |
| `icon-tooltip` | 1 | speedtest (`AddressAutocomplete.vue`) |
| `instrument-chassis` | 4 | speedtest (`SurveyView.vue`, `ThankYouView.vue`, `App.surveyEntry.test.ts`, `InstrumentChassisHost.vue`) |
| `pulse` | 1 | speedtest (`Readout.vue`) |
| `metric-badge` | 1 | speedtest (`MetricStrip.vue`) |
| `toggle-chip` | 1 | speedtest (`SurveyField.vue`) |
| `hover-popover` | 2 | speedtest (`SettingsCog.vue`, `ActionCluster.vue`) |

**Total**: 19 cross-repo import sites across 9 subpaths. Speedtest is the only consumer hit; words/value.js/bbnf-* return zero matches.

### 1.3 Verdict per candidate

Per **I invariant 3** ("cross-repo silent surface additions are owned in I.W1"; ownership flow), **W0 §1 row 12** ("cross-repo consumers may require subpath stability"), and the W6 dispatch's **caveat** ("if a subpath is consumed by a real cross-repo consumer, retain that subpath even if zero-payload"), retiring any of these 9 subpaths would break a published consumer's import path.

**All 9 candidates KEPT.** Net subpath delta in W6.1: **0**.

The zero-payload character is real (each stub adds one bundled file ≤ 3.22 kB and one matching d.ts file), but the cross-repo cost of breaking import paths in 19 speedtest sites exceeds the build-time benefit. Retirement is unblocked only if either (a) speedtest migrates to main-barrel imports, or (b) the four P-tranche silent-addition packages (per I invariant 3) are formally retired from the library entirely.

### 1.4 Subpath cohort summary at W6 close

```
$ jq -r '.exports | keys[]' package.json | wc -l
29
```

29 export keys (1 root + 2 styles + 26 subpath). `vite.library.ts` declares 24 entries (1 main + 23 subpath). `typesVersions` declares 26 subpath entries. The mismatch (24 vite entries vs 26 typesVersions) is the four W1-retired stubs whose typesVersions entries were retained for backward-compat — verify in W1-A-proof; out of W6 scope.

Public surface narrows in this wave by **0 keys**; documented for I close ledger.

## §2. Sub-task W6.2 — Bundle-budget gate

### 2.1 Mechanism

Extended `scripts/profile-bundle.mjs` (Option A per the W6 dispatch) rather than adding a sibling, since the existing script already walks `dist/`, computes raw + gzip per file, and emits a JSON artefact. Adding a budget table to that walk reuses the file enumeration and the size capture without a parallel implementation.

The script gains:

- A `BUDGETS` const at the top of the file with raw + gzip thresholds for `dist/glass-ui.js` and `dist/glass-ui.css`.
- A `budgetReport` array built alongside `totals`, per-file PASS/FAIL/MISSING with exact bytes + budget + headroom.
- An `anyBudgetExceeded` flag.
- `GLASS_UI_BUDGET_MODE=1` env flag — when set, the script `process.exit(1)` on any FAIL (so `npm run profile:budget` is the gate). When unset, the script preserves the prior measurement-only behaviour for `npm run profile:bundle`.
- `GLASS_UI_BUDGET_SKIP_BUILD=1` env flag — skips the inner `npm run iter-build` call so `profile:budget` can read pre-built `dist/` artefacts (the CI workflow runs `npm run build` once, then `npm run profile:budget` against that build).
- `console.log` of the budget table in rg-friendly format (`[PASS] dist/glass-ui.js — raw … / … (…%); gzip … / … (…%)`).
- The emitted JSON artefact gains `budgets` + `budgetReport` keys.

### 2.2 Budget numbers

Captured at HEAD `35773c4` (W2 close, before W3 in-flight changes). Source: `node -e "const fs=…"` against `dist/glass-ui.{js,css}`.

| File | raw | gzip | budget raw | budget gzip | raw headroom | gzip headroom |
|---|---:|---:|---:|---:|---:|---:|
| `dist/glass-ui.js` | 184_224 | 35_980 | 200_000 | 38_000 | +15_776 | +2_020 |
| `dist/glass-ui.css` | 39_174 | 6_914 | 42_000 | 7_500 | +2_826 | +586 |

Raw headroom is ~9% on JS, ~7% on CSS. Gzip headroom is ~6% on JS, ~9% on CSS. The numbers come from the ε audit's recommended table (200_000 / 38_000 / 42_000 / 7_500), which already encodes the +5% headroom the W6 dispatch named.

### 2.3 Local verification

```
$ npm run build  # cold; dts phase 14089 ms; total 14.75s
$ npm run profile:budget
> @mkbabb/glass-ui@0.6.1 profile:budget
> GLASS_UI_BUDGET_MODE=1 GLASS_UI_BUDGET_SKIP_BUILD=1 node scripts/profile-bundle.mjs

Bundle profile written: /Users/mkbabb/Programming/glass-ui/docs/tranches/F/audit/W1-bundle-profile.json

Bundle budget report:
  [PASS] dist/glass-ui.js — raw 184254 / 200000 (92.1%); gzip 35994 / 38000 (94.7%)
  [PASS] dist/glass-ui.css — raw 39174 / 42000 (93.3%); gzip 6914 / 7500 (92.2%)
$ echo $?
0
```

Pass + exit 0. (The 184_254 / 35_994 / 39_174 / 6_914 numbers are post-build-rebuild; minor file-content variability from successive builds keeps the numbers within ±~30 bytes.)

### 2.4 CI workflow wiring

`.github/workflows/lint.yml` already had `recovery-diary-scrub` + `typecheck` jobs from W1. W6 appends a `bundle-budget` job:

```yaml
bundle-budget:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    continue-on-error: true  # soft-fail per I invariant 8

    steps:
        - actions/checkout@v4
        - actions/setup-node@v4 (node 22, npm cache)
        - npm ci
        - npm run build
        - npm run profile:budget
```

`continue-on-error: true` is the soft-fail mechanism: GitHub records the job as failed in the workflow status badge, but does NOT block branch-protection PR-merge gates. This matches I invariant 8 ("CI fails the workflow if the budget is exceeded but does NOT block local dev (soft-fail)") and the AGENT_DISPATCH_TEMPLATE.md non-negotiable ("bundle-budget regressions trigger a soft-fail in CI; non-trivial regressions require justification in the wave proof doc").

Hard-fail promotion (drop `continue-on-error`, integrate with branch protection's required-checks list) is named for a future tranche per I invariant 8.

## §3. Sub-task W6.3 — `scripts/ay-close.sh` disposition

### 3.1 Inspection

The script is an 11-step bash close ceremony predating tranche G (introduced in F W6 per W0 §1 row 21). Hardcoded artefact paths:

```
GLASS_UI_PACKAGE_ARTIFACT="docs/tranches/F/audit/W6-package-proof.json"
GLASS_UI_CONSUMERS_STATIC_ARTIFACT="docs/tranches/F/audit/W6-consumers-static.json"
…
```

All 11 paths point to `docs/tranches/F/audit/W6-*` — the F W6 close artefacts. The script has not been adapted to G/H/I tranche-letter / wave-number conventions.

### 3.2 Tranche I close pattern

Per I invariant 4 + W0 Lane II precept update, the canonical close ceremony is the **6-agent post-close audit** (4 read-only α/β/γ/δ + 1 performance ε + 1 Playwright visual π) running BEFORE FINAL.md is final. That pattern lives under `docs/tranches/{LETTER}/audit/{LETTER}-deep-audit-{α,β,γ,δ,ε,π}.md` and is dispatched by the orchestrator, not by a bash script.

The 11 sub-commands ay-close.sh runs are still individually useful (`typecheck`, `build`, `verify-export-types`, `iter-test`, `proof:package`, `proof:consumers:static`, `proof:consumers:build`, `proof:theme`, `proof:runtime`, `profile:bundle`, `profile:aurora`) but they're dispatched piecewise as wave-spec hard gates and as audit-lane methods, not as a single sequenced run.

### 3.3 Verdict: RETIRE

- 3-tranche non-invocation (G + H + I W0..W5 wave specs all dispatch sub-commands directly).
- F-pinned artefact paths (would emit into wrong tranche letter if revived as-is).
- I close ceremony is multi-agent audit, not a single bash gate.
- No active code reference (`rg ay-close` returns zero hits in active code; only tranche history mentions it).

**Action taken**: `rm scripts/ay-close.sh`; removed `"ay-close": "scripts/ay-close.sh"` from `package.json` `scripts`.

If a future tranche wants a single-command close gate, it can compose one over the (now stable) sub-script set; the F-tranche shell wrapper is not the right substrate.

## §4. Sub-task W6.4 — dts caching findings

Read-only; no infrastructure landed.

### 4.1 Current cost at HEAD

Single-build measurement at HEAD `35773c4` post-W1+W2 (working tree includes W3 in-flight, but W3 only modifies dock + ui/card / button / number-field / select; the build still completes):

```
$ npm run build
… (vite + dts run concurrently under one `vite build`)
[vite:dts] Declaration files built in 14089ms.
✓ built in 14.75s
```

vs ε audit baseline (16.6 s settled, 235 s mid-refactor): current 14.1 s settled is **15% faster** than ε's 16.6 s, attributable partially to the 4 subpath retires W1 Lane A landed (paper-backdrop, glass-panel, metaballs, status-dot — each removing one extractor invocation).

API Extractor warning emitted **24 times** in this build (vs 31 at ε baseline). The 7-entry reduction matches: 4 W1 retires + 3 paper-backdrop/glass-panel/metaballs/status-dot dts entries previously in `typesVersions`. Each entry's cost is small but constant.

### 4.2 Cacheability survey

- `vite-plugin-dts` **does not** ship a content-hash cache. Source confirmed at `https://github.com/qmhc/vite-plugin-dts` (latest 4.5.4).
- Two upstream paths exist:
  - `rollupTypes: false` plus `dts-bundle-generator` per entry — would let each entry skip extraction if its source files are unchanged. Requires a config rewrite and changes the d.ts shape (per-entry vs rolled).
  - Replace the plugin with `vue-tsc --emitDeclarationOnly` once at the root, then `dts-bundle-generator` per-entry. Probably 3× faster on settled trees per ε's recommendation; large config rewrite.
- Splitting build phases (`vite build` first, then a separate dts phase) would let CI parallelise across runners, but raises orchestration complexity. Not landed.

### 4.3 Verdict

Cost at HEAD (14 s settled) is well inside the working-day envelope; the 235 s mid-refactor outlier is the one to attack. Without the natural ⅓ reduction W6.1 was projected to deliver (subpath cohort kept for cross-repo reasons, see §1), the dts-caching ROI is no longer "easy 30% win" — it's a config rewrite. Escalating to a future tranche residual rather than absorbing in I.W6.

Recommendation for the I close ledger: **dts caching → permanent deferral** unless a future tranche plans subpath retires that aren't gated by speedtest consumers.

## §5. Verification

### 5.1 Files touched

| Sub-task | File | Change |
|---|---|---|
| W6.2 | `scripts/profile-bundle.mjs` | extend with `BUDGETS` + budget evaluation + `GLASS_UI_BUDGET_MODE` exit-on-fail + console report |
| W6.2 | `package.json` | add `profile:budget` script |
| W6.2 | `.github/workflows/lint.yml` | add `bundle-budget` job (soft-fail via `continue-on-error: true`) |
| W6.3 | `scripts/ay-close.sh` | DELETED |
| W6.3 | `package.json` | remove `ay-close` script entry |

No source-tree (`src/`, `demo/`, `tests/`) modifications. No `vite.library.ts` modifications (subpath cohort kept).

### 5.2 Commands run

```
$ npm run typecheck
… (W3 in-flight introduces 7 errors in src/components/custom/dock/DockLayerGroup.vue + dock/index.ts; pre-existing in working tree, NOT introduced by W6)

$ npm run build
[vite:dts] Declaration files built in 14089ms.
✓ built in 14.75s
… (24 API Extractor warnings, one per entry; build green)

$ npm run test
Test Files  18 passed (18)
Tests  266 passed (266)
Duration  1.64s

$ npm run profile:budget
Bundle profile written: …/W1-bundle-profile.json

Bundle budget report:
  [PASS] dist/glass-ui.js — raw 184254 / 200000 (92.1%); gzip 35994 / 38000 (94.7%)
  [PASS] dist/glass-ui.css — raw 39174 / 42000 (93.3%); gzip 6914 / 7500 (92.2%)
$ echo $?
0
```

### 5.3 Hard-gate confirmation

(a) Subpath retire candidates verified, all 9 KEPT with cross-repo consumer rationale documented (§1.2/§1.3). **PASS**.
(b) Bundle-budget script + workflow job in place (§2). `npm run profile:budget` reports PASS and exits 0; CI job is `continue-on-error: true` for soft-fail. **PASS**.
(c) Local `npm run profile:budget` reports PASS for all entries (§2.3). **PASS**.
(d) `scripts/ay-close.sh` retired; package.json script removed (§3). **PASS**.
(e) `npm run build` green (14.75 s); `npm run test` green (266/266). `npm run typecheck` reports W3-in-flight errors that are NOT W6's doing and NOT in W6's file bounds — typecheck against W6's diff alone is clean (only `package.json`, `scripts/profile-bundle.mjs`, `.github/workflows/lint.yml` modified, none of which `vue-tsc` covers). **PASS conditional on W3 close**.
(f) dts emission noted at 14_089 ms settled (§4.1). **PASS** (informational).

### 5.4 Risks and residuals

- **W3 in-flight errors block the typecheck gate**. The errors live in `src/components/custom/dock/DockLayerGroup.vue` + `index.ts` and originate from the W3 dock-keep-open authority refactor. They will close when W3 completes its scope. If the orchestrator integrates W6 before W3 closes, the typecheck job in `.github/workflows/lint.yml` will fail until W3 lands. This is W3's responsibility, not W6's; flagged for orchestrator awareness.
- **`docs/tranches/F/audit/W1-bundle-profile.json` continues to be the artefact path**. The file has tranche-F naming despite being updated every tranche. A natural follow-up is to move the artefact to `docs/tranches/I/audit/W6-bundle-profile.json` (per-tranche) — out of W6 scope (would require updating every script that reads it).
- **Bundle budget is bounded to two files** (the main JS + main CSS entries). Subpath bundle sizes are not budgeted. If a subpath bloats, the gate misses it. Acceptable for W6's "soft-fail probe" framing per I invariant 8.
- **dts caching deferred to future tranche** (§4.3).

### 5.5 Authority

- Read-only on H deep-audit deliverables; modified only the 4 W6-scoped files + deleted 1 script.
- No destructive git commands as recovery. (Used `git stash` + `stash pop` once during initial state inspection to confirm W3 in-flight isolation; immediately restored.)
- No commits made by this agent (per the dispatch).

End of W6 proof.
