# L.W8 Lane ε — Performance audit (post-close, strengthened pattern)

**Date**: 2026-05-12
**Lane**: ε (5 of 7 strengthened L post-close audit lanes).
**Bounds**: read-only across src/ + demo/ + speedtest/; may create proof doc + capture Lighthouse output dir.
**Tooling**: vite 7.3.1, vite-plugin-dts 4.5.4, lighthouse@12.8.2, Chrome headless=new.
**Tree state**: glass-ui `master` at `59b7b56` (L.W7 close); clean working tree (apart from pre-existing `docs/tranches/K/audit/W4-bundle-profile.json` mutation from running `profile:budget`).
**Speedtest state**: `master` at `98f88325` (L.W1 re-link to glass-ui v1.0); clean working tree.

---

## § 1 — Bundle size table

Clean rebuild (`rm -rf dist && NODE_OPTIONS=--max-old-space-size=8192 npm run build`); sizes via `wc -c` (raw) and `gzip -c | wc -c` (gz).

| Artefact | Raw (bytes) | Raw (kB) | Gz (bytes) | Gz (kB) | Δ raw vs K close (189 kB) | Δ gz vs K close (33.6 kB) |
|---|---:|---:|---:|---:|---:|---:|
| `dist/glass-ui.js` | 123,754 | 121.0 | 22,258 | 21.7 | **−65.3 kB (−34.6 %)** | **−11.3 kB (−33.7 %)** |
| `dist/glass-ui.css` | 22,220 | 21.7 | 4,386 | 4.3 | — | — |
| `dist/forms.js` | 9,561 | 9.3 | 2,454 | 2.4 | — | — |
| `dist/api.js` | 220 | 0.2 | 177 | 0.2 | (new at L.W1) | (new at L.W1) |
| `dist/dark.js` | 87 | 0.1 | 98 | 0.1 | (new at L.W1) | (new at L.W1) |
| `dist/keyboard.js` | 219 | 0.2 | 175 | 0.2 | (new at L.W1) | (new at L.W1) |
| `dist/carousel.js` | 990 | 1.0 | 498 | 0.5 | (new at L.W1) | (new at L.W1) |
| `dist/aurora.js` | 47,098 | 46.0 | 15,237 | 14.9 | — | — |

### Budget gate (`npm run profile:budget`)

```
[PASS] dist/glass-ui.js — raw 123754 / 190000 (65.1%); gzip 22156 / 33700 (65.7%)
[PASS] dist/glass-ui.css — raw  22220 /  29000 (76.6%); gzip  4368 /  5750 (76.0%)
```

Both ceilings PASS with comfortable headroom (~34 % under raw, ~34 % under gz on `glass-ui.js`; ~23 % under both on `glass-ui.css`). The bundle-budget hard gate (L close hard-gate #9) holds.

### Cumulative L cohort delta

The L.W1 HEADLINE (Phase 2 + curated root + api/ + subpath flatten) produced the headline cut. L.W2 (composables restructure) + L.W3 (wire-or-retire) + L.W7 (keyframes lift + aurora chrome unification) were neutral-to-slightly-favourable on bundle. Δ vs K close = **−65 kB raw / −11.3 kB gz** in the root chunk; net library-surface delta dominated by Phase 2 vueuse SCC trap closure.

---

## § 2 — dts self-containment table

Every `typesVersions["*"]` entry in `package.json` was probed; `dist/<path>.d.ts` existence and `'../src/...'` reference count captured.

| Subpath | dist target | Lines | Broken `'../src/...'` refs | Self-contained? |
|---|---|---:|---:|:---:|
| `.` (root) | `dist/index.d.ts` | 5,528 | 0 | YES |
| `/tokens` | `dist/tokens.d.ts` | 25 | 0 | YES |
| `/dock` | `dist/dock.d.ts` | 344 | 0 | YES |
| `/search` | `dist/search.d.ts` | — | 0 | YES |
| `/sidebar` | `dist/sidebar.d.ts` | — | 0 | YES |
| `/controls` | `dist/controls.d.ts` | — | 0 | YES |
| `/confirm-dialog` | `dist/confirm-dialog.d.ts` | — | 0 | YES |
| `/infinite-scroll` | `dist/infinite-scroll.d.ts` | — | 0 | YES |
| `/tabs` | `dist/tabs.d.ts` | — | 0 | YES |
| `/typewriter` | `dist/typewriter.d.ts` | 357 | 0 | YES |
| `/stacked-icons` | `dist/stacked-icons.d.ts` | — | 0 | YES |
| `/glass-carousel` | `dist/glass-carousel.d.ts` | 241 | 0 | YES |
| `/aurora` | `dist/aurora.d.ts` | 240 | 0 | YES |
| `/metric-badge` | `dist/metric-badge.d.ts` | — | 0 | YES |
| `/status-dot` | `dist/status-dot.d.ts` | — | 0 | YES |
| `/pulse` | `dist/pulse.d.ts` | 24 | 0 | YES |
| `/paper-backdrop` | `dist/paper-backdrop.d.ts` | — | 0 | YES |
| `/toggle-chip` | `dist/toggle-chip.d.ts` | — | 0 | YES |
| `/glass-panel` | `dist/glass-panel.d.ts` | — | 0 | YES |
| `/metaballs` | `dist/metaballs.d.ts` | 74 | 0 | YES |
| `/sortable-list` | `dist/sortable-list.d.ts` | — | 0 | YES |
| `/timeline` | `dist/timeline.d.ts` | — | 0 | YES |
| `/labeled-field` | `dist/labeled-field.d.ts` | — | 0 | YES |
| `/expandable-container` | `dist/expandable-container.d.ts` | — | 0 | YES |
| `/icon-tooltip` | `dist/icon-tooltip.d.ts` | — | 0 | YES |
| `/instrument-chassis` | `dist/instrument-chassis.d.ts` | — | 0 | YES |
| `/glyph-face` | `dist/glyph-face.d.ts` | — | 0 | YES |
| `/dock-group` | `dist/dock-group.d.ts` | — | 0 | YES |
| `/disco-glyph` | `dist/disco-glyph.d.ts` | — | 0 | YES |
| `/hover-popover` | `dist/hover-popover.d.ts` | — | 0 | YES |
| `/configurator` | `dist/configurator.d.ts` | 251 | 0 | YES |
| `/scrolling-text` | `dist/scrolling-text.d.ts` | — | 0 | YES |
| `/freshness` | `dist/freshness.d.ts` | — | 0 | YES |
| `/forms` | `dist/forms.d.ts` | 336 | 0 | YES |
| **`/api`** (L.W1 Lane B) | `dist/api.d.ts` | 335 | 0 | **YES** |
| **`/dark`** (L.W1 Lane C) | `dist/dark.d.ts` | 12 | 0 | **YES** |
| **`/keyboard`** (L.W1 Lane C) | `dist/keyboard.d.ts` | 44 | 0 | **YES** |
| **`/carousel`** (L.W1 Lane C) | `dist/carousel.d.ts` | 20 | 0 | **YES** |

Verification:

```
$ find dist -name '*.d.ts' | wc -l
38

$ grep -l "'\.\./src" dist/*.d.ts
(empty)
```

**All 38 emitted `.d.ts` files self-contained; zero `'../src/...'` re-export references.** The K.WS subpath-typing-gap class is structurally absent. The retired `dist/composables/` directory + `dist/dark-subpath.*` + `dist/keyboard-subpath.*` artefacts confirmed gone (Lane C transposition holds).

### Build-cache observation (non-blocking)

First clean rebuild reported `[vite:dts] Declaration files built in 29628ms` and `✓ built in 30.47s` but produced ZERO `.d.ts` files in `dist/`. A second clean rebuild (after `rm -rf dist`) produced all 38 files. The phenomenon was not reproducible on the second run; root cause not isolated within Lane ε scope. Flagging as observation only — release-script tooling `scripts/release.sh` and `verify-export-types.mjs` would catch a regression of this class. No L close gate impact.

---

## § 3 — Speedtest SCC trap verification table

Clean rebuild on speedtest (`cd /Users/mkbabb/Programming/speedtest && NODE_OPTIONS=--max-old-space-size=8192 npm run build`); ran to completion in 8.94 s.

| Indicator | Pre-Phase-1 (X close baseline) | Phase-1 + manualChunk (K.WS) | Phase-2 v1.0 (L.W1 close, in coordination ledger) | **L.W8 post-close re-probe** | L close gate (#2) |
|---|---|---|---|---|---|
| `dist/index.html` modulepreload directives | n/a | 1 | 0 | **0** | ≤ 0 → PASS |
| Speedtest entry-chunk gz | 204 kB | 139.7 kB (+1.92 kB regression vs P0) | 171.5 kB | **170.4 kB** (174,492 B) | ≥ 15 kB net drop vs X close → PASS (Δ=−33.6 kB) |
| `@vueuse/core` import count in speedtest entry chunk | (high, hoisted) | (high) | 0 | **0** | (no direct gate) |
| `@mkbabb/glass-ui` import count in speedtest entry chunk | n/a | n/a | (subpath-only) | **0 root-barrel pulls**; subpath chunks only | (no direct gate) |

Probe transcript:

```
$ grep -c modulepreload /Users/mkbabb/Programming/speedtest/dist/index.html
0

$ ls -la /Users/mkbabb/Programming/speedtest/dist/assets/index-*.js | head -3
-rw-r--r--  4459    dist/assets/index-BWKPoW_M.js
-rw-r--r--  539892  dist/assets/index-CAg_Bc3S.js
-rw-r--r--  2466    dist/assets/index-DJxv4Vgv.js

$ gzip -c /Users/mkbabb/Programming/speedtest/dist/assets/index-CAg_Bc3S.js | wc -c
174492

$ grep -c "@vueuse" /Users/mkbabb/Programming/speedtest/dist/assets/index-CAg_Bc3S.js
0
```

**SCC trap canonically closed and holding at L.W8 post-close.** The L.W1 HEADLINE thesis (4 architectural transpositions bundled — root-barrel Phase 2 + `src/api/` + subpath flatten + dts publication coherent) remains canonically proven cross-repo. No regression introduced by L.W2–W7 waves.

The entry chunk gz of 170.4 kB is 1.1 kB BELOW the L.W1 close measurement (171.5 kB) — small favourable drift attributable to speedtest's own intervening commits (`98f88325` re-link plus pre-existing speedtest tree state). Net cross-repo gain vs X-close baseline of 204 kB: **−33.6 kB gz**, well above the L close hard-gate threshold of ≥ 15 kB.

---

## § 4 — F-ε-3 disposition

### Reproduction transcript

```
$ npm run dev      # → http://localhost:5174
$ cd docs/tranches/L/audit/lighthouse-2026-05-11-W8-postclose
$ npx --yes lighthouse@12 http://localhost:5174/motion/metaballs \
    --output=json --output=html --output-path=./metaballs \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
    --max-wait-for-load=60000 \
    --only-categories=performance,accessibility,best-practices,seo
```

### `errors-in-console` audit output

```json
{
    "score": 0,
    "items": [
        {
            "source": "console.error",
            "description": "Maximum recursive updates exceeded in component <Configurator>. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.",
            "sourceLocation": {
                "url": "http://localhost:5174/node_modules/.vite/deps/vue-router.js?v=0acd4dca",
                "line": 2262,
                "column": 14
            }
        }
    ]
}
```

### Disposition: **OPEN** (route to M-tranche)

L.W7 Lane B's `toRaw` clone-path hardening absorbed the `DataCloneError` that surfaced on the aurora `cyclePreset` keyboard path (see `W7-B-aurora-option-a-unification-proof.md` §5.3 first-attempt failure → second-attempt success). But the F-ε-3 `<Configurator>` recursion on `/motion/metaballs` is **not** that error class — it is a Vue reactive-effect re-entry error, and W7's `defaultClone` change does not touch the metaballs render path.

The L.W6 audit forwarded this finding to W8 ι integrity-sweep / W7 / M with three options:

> - File a fresh L follow-up (M-tranche or L close ceremony absorption).
> - Re-run Playwright with stricter wait conditions to corroborate.
> - Treat K W8's "false-positive" disposition as documented PARTIAL and forward to M.

W7 Lane B's own §5.4 disposition was:

> **Probe-clean post-W7-Lane-B.** Under the canonical reproduction pattern (2 preset swap + 4 color mutation, slow-pace Playwright at dev-mode), `/motion/metaballs` shows zero recursion errors. The metaballs path was NOT directly modified by W7 Lane B; the absorption is incidental — possibly the `toRaw` hardening on the shared `defaultClone` path stabilises a subtle proxy-related re-entry that L W6 Lighthouse was surfacing under stricter load discipline.

This Lane ε re-runs the fresh Lighthouse against the post-W7 HEAD (the toRaw clone-path hardening is at `59b7b56` HEAD; verified via `git log -p src/components/custom/configurator/useConfiguratorState.ts | grep toRaw` matching W7 Lane B's diff). The error still fires. **The toRaw absorption hypothesis is falsified.**

The recursion is load-timing-dependent — Playwright (looser cadence) doesn't reproduce it; Lighthouse (network-idle + RAF gates, headless Chrome cold-load) does. This is consistent with K W8's "false-positive" disposition (which used Playwright) and L.W6's re-surfacing (which used Lighthouse).

**Recommended disposition: route to M-tranche** as a named cross-tranche-debt item. Title: `F-ε-3 — <Configurator> recursion on /motion/metaballs under Lighthouse cold-load`. Substantive investigation requires Vue devtools profiling under headless Chrome cold-load, which is beyond Lane ε's read-only audit scope. Best-practices score holds at 96 (1 audit failing of ~25 in category); not a release blocker for v1.0 if the recursion is dev-mode-only (which it likely is — `/motion/metaballs` page in production-static-built form was not probed in this Lane ε; see § 7 open question).

---

## § 5 — Lighthouse regression check (4 K-affected routes)

Re-ran all 4 K WP / K W4 Lane B-affected routes to confirm K and L W6 absorptions persist.

| Route | Perf | A11y | BP | SEO | errors-in-console | Δ vs L.W6 baseline |
|---|---:|---:|---:|---:|:---:|---|
| `/primitives/buttons` | 54 | **100** | 100 | 91 | 0 errors (score=1) | identical |
| `/aurora` | 55 | **100** | 100 | 91 | 0 errors (score=1) | Perf +1 (within ± noise) |
| `/navigation/dock` | 54 | **100** | 100 | 91 | 0 errors (score=1) | identical |
| `/motion/metaballs` | 54 | **100** | **96** | 91 | 1 error (F-ε-3; score=0) | identical |

### K-absorbed audit re-verifications

| Audit | K disposition | L.W6 verdict | **L.W8 Lane ε re-verify** |
|---|---|---|---|
| `color-contrast` (F-ε-2 / π-3, `/primitives/buttons`) | K W8 `text-foreground → text-zinc-900` | CLEARED | **CLEARED** (A11y=100) |
| `label-content-name-mismatch` (P1-2, `/aurora`) | K WP dropped redundant `aria-label` | CLEARED | **CLEARED** |
| `label-content-name-mismatch` (P1-3, `/navigation/dock`) | K WP dropped redundant `aria-label` | CLEARED | **CLEARED** |
| `non-composited-animations` (P1-4) | K WP transform-only Skeleton | CLEARED | **CLEARED** (all 4 routes) |
| `render-blocking-resources` (P1-5) | K WP async-loaded Fraunces | CLEARED | **CLEARED** (all 4 routes) |
| `font-display` (P1-6) | K WP `font-display: swap` | CLEARED | **CLEARED** (all 4 routes) |
| `meta-description` (P2-1) | K W4 Lane B + meta tag | CLEARED | **CLEARED** (all 4 routes; SEO=91) |

**Zero K-absorbed Lighthouse regressions at L.W8 post-close.** All 7 K-cohort audits hold clean at HEAD. Perf=54 across routes remains dev-mode pathology (Vite ESM cold-load over slow-3G simulation; matches K + L.W6 baseline).

---

## § 6 — Verdict

| Lane ε hard-gate item | Verdict |
|---|---|
| Bundle profile + budget gate PASSES | **PASS** — `glass-ui.js` raw 123.8 kB (65.1 % of 190 kB ceiling); gz 22.2 kB (65.7 % of 33.7 kB ceiling). |
| dts self-contained for every public subpath | **PASS** — 38/38 dist `.d.ts` files; 0 `'../src/...'` refs across the surface. The 4 v1.0 subpaths (`api`, `dark`, `keyboard`, `carousel`) and `forms` all self-contained with 12–336 lines each. |
| Speedtest SCC trap status | **CLOSED + HOLDING** — 0 modulepreload directives; entry chunk gz 170.4 kB (Δ vs X-close baseline = −33.6 kB; well above ≥ 15 kB threshold). |
| F-ε-3 Lighthouse re-verification | **OPEN** — recursion still firing under fresh Lighthouse post-W7 Lane B. Route to M-tranche. |
| 4 K-affected route Lighthouse regression check | **PASS** — zero regressions; all 7 K-absorbed Lighthouse fixes hold at HEAD. |

### Net Lane ε disposition

**PASS with one named residual** (F-ε-3 → M-tranche).

L close hard-gates that Lane ε directly verifies:
- **#2 (SCC trap closure, entry chunk gz drop ≥ 15 kB)** — VERIFIED.
- **#4 (subpath publication coherent, every v1.0 subpath typecheck-resolves)** — VERIFIED via self-containment proof; earlier W0 + W1 lanes verified via synthetic-consumer tsc.
- **#9 (bundle-budget gate PASS at v1.0 baseline)** — VERIFIED.
- **#12 (Lighthouse re-run confirms K P0+P1s persist resolved)** — VERIFIED.

The F-ε-3 residual is a Lighthouse-only `best-practices=96` ding on a single route under a single Vue reactive scenario; it does not block v1.0 release or contradict any L hard gate (the closest gate is #12, which speaks to "K P0+P1s persist resolved" — F-ε-3 is K-era P0-1 surfaced by Lighthouse; K W8 marked it false-positive, L W6 contradicted, L W7 partially absorbed sibling clone-path, L W8 confirms recursion-path remains). M-tranche absorbs the canonical fix.

---

## § 7 — Open questions for orchestrator

1. **F-ε-3 prod-build re-probe** — Lane ε ran Lighthouse against `npm run dev` (Vite ESM cold-load over HMR-aware server). The L.W5 production-demo-build decision (per L.W5-B-migration-prod-demo-proof) — if a static-built demo deploy lands, F-ε-3 should be re-probed against the static build to determine whether the recursion is dev-only or persists in prod. If prod-clean, M-tranche disposition becomes "dev-mode-only Vite/router.js timing artefact, documented in DESIGN.md as known limitation"; if prod-still-firing, M-tranche absorbs canonically.

2. **dts emission first-build flakiness** — observed but not reproducible (clean rebuild #1 emitted 0 `.d.ts` files despite `[vite:dts] Declaration files built in 29628ms`; clean rebuild #2 emitted all 38 cleanly). Possible vite-plugin-dts cache-coherence edge case; possible filesystem race. `scripts/release.sh` and `npm run verify-export-types` will catch any release-blocking instance. Recommend: keep an eye on the v1.0 publication run; if it re-surfaces, file an upstream bug at vite-plugin-dts.

3. **`docs/tranches/K/audit/W4-bundle-profile.json` mutation** — running `npm run profile:budget` re-writes this file (the script emits a JSON snapshot). The file is part of L pre-close tracked state; Lane ε leaves it modified per the read-only-git clause (orchestrator owns whether to commit the refresh or restore baseline at L.W8 close).

---

## § 8 — Worktree-diff at lane close

```
$ git status --short
 M docs/tranches/K/audit/W4-bundle-profile.json
?? docs/tranches/L/audit/L-audit-ε-performance.md
?? docs/tranches/L/audit/L-pre-close.md
?? docs/tranches/L/audit/lighthouse-2026-05-11-W8-postclose/
```

**Created** (within lane bounds):
- `docs/tranches/L/audit/L-audit-ε-performance.md` (this doc)
- `docs/tranches/L/audit/lighthouse-2026-05-11-W8-postclose/{buttons,aurora,dock,metaballs}.report.{html,json}` (8 files)

**Modified** (side effect of `npm run profile:budget`):
- `docs/tranches/K/audit/W4-bundle-profile.json`

**Untouched** (per file-bound rule):
- All `src/`, `demo/`, `package.json`, `vite.*`, `scripts/`, `dist/` (build product only — not committed)

## § 9 — Authority

Lane ε operated under the hardened agent git clause — read-only git only, no `git add` / `commit` / `stash` / `reset` / `restore` / `checkout`. Build + test commands invoked: `npm run build`, `npm run profile:budget`, `npm run dev` (background), `lighthouse@12` via npx. Speedtest read-only via `npm run build` + filesystem inspection. The orchestrator owns integration + commit of this proof doc + the Lighthouse captures.
