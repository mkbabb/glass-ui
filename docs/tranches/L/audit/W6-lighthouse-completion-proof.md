# L.W6 — Lighthouse cohort completion (P2 carry-forwards) — Proof

**Date**: 2026-05-11
**Agent**: L.W6 single-lane sequential.
**Tree state**: `master` at `fa6e6c7` (W1 close). No src/ or demo/ touched in this wave.
**Lighthouse**: `lighthouse@12.8.2` via `npx --yes lighthouse@12` (matches K baseline).
**Chrome flags**: `--headless=new --no-sandbox --disable-gpu` (matches K baseline).
**Max wait for load**: 60_000 ms.
**Dev server**: `npm run dev` on port 5174 (5173 in use; Vite auto-fell-back; route paths unchanged).
**Output dir**: `docs/tranches/L/audit/lighthouse-2026-05-11-postL/`.

## § 1 — K-absorbed Lighthouse fixes re-verification

K WP shipped 5 P1 fixes + K W4 Lane B shipped 1 P2 fix. K W8 cleanup pass absorbed viz-basis dark-mode contrast (F-ε-2 / π-3) via `text-foreground → text-zinc-900` swap at `demo/stories/primitives/buttons.vue:118`. The 4 routes K WP touched (plus 1 additional route for compositor regression check) are re-run at L W6.

### 1.1 Scores table — post-L-W1 vs K W8 baseline

| Route | Perf | A11y | BP | SEO | Δ-vs-K-W8 |
|---|---:|---:|---:|---:|---|
| `/primitives/buttons` | 54 | **100** | 100 | 91 | A11y **94 → 100** (P1-1 viz-basis contrast cleared in dark mode; K W8 absorption holds) |
| `/aurora` | 54 | 100 | 100 | 91 | A11y unchanged 100 (P1-2 chip aria-label drop holds) |
| `/navigation/dock` | 54 | 100 | 100 | 91 | A11y unchanged 100 (P1-3 dropdown aria-label drop holds) |
| `/motion/metaballs` | 54 | 100 | **96** | 91 | BP unchanged 96 (F-ε-3 P0-1 Configurator recursion **STILL FIRING** — see § 5 open question) |

Perf=54 across all routes remains dev-mode pathology (Vite ESM cold-load over slow-3G simulation; matches K baseline). SEO=91 across all routes (was 82 pre-K-W4-LaneB; `meta-description` adds 9 pts to SEO; held).

### 1.2 K-absorbed audit-by-audit verification

| Audit | Route(s) | K disposition | L W6 re-verify |
|---|---|---|---|
| `color-contrast` (P1-1, F-ε-2 / π-3) | `/primitives/buttons` | K W8 `text-foreground → text-zinc-900` (theme-invariant dark color) | **CLEARED** — score 1.0; axe found 0 violations. `buttons.vue:118` confirmed `text-zinc-900` at HEAD. |
| `label-content-name-mismatch` (P1-2) | `/aurora` | K WP dropped redundant `aria-label="Preset: ${label}"` on preset chips | **CLEARED** — score 1.0; 0 violations. |
| `label-content-name-mismatch` (P1-3) | `/navigation/dock` | K WP dropped redundant `aria-label="Dock command"` on dropdown trigger | **CLEARED** — score 1.0; 0 violations. |
| `non-composited-animations` (P1-4) | `/aurora` | K WP migrated Skeleton shimmer to transform-only `::after` overlay | **CLEARED** — score 1.0 across all 4 routes (1-6 elements still flagged as "animated" but not main-thread; informational only, not failing). |
| `render-blocking-resources` (P1-5) | all | K WP async-loaded Fraunces via `media="print" onload='this.media="all"'` + `<noscript>` fallback | **CLEARED** — score 1.0 across all 4 routes. |
| `font-display` (P1-6) | all | K WP inlined 4 Computer Modern `@font-face` blocks with `font-display: swap` in `demo/demo.css` | **CLEARED** — score 1.0 across all 4 routes. |
| `meta-description` (P2-1) | all | K W4 Lane B added `<meta name="description">` to `index.html:6-9` | **CLEARED** — score 1.0 across all 4 routes. SEO 82 → 91 attributable. |

All 7 K-absorbed Lighthouse fixes re-verified clean at HEAD post-L-W1. No regressions from L's modularization (W0 typing-gap patch + W1 root-barrel curation + subpath flatten).

## § 2 — robots.txt decision (P2-2)

**Decision: Option B — defer to W5 Lane B.**

### Rationale

W6 spec defaults to Option B (defer atomically to W5's production-demo-build decision). W5 hasn't opened yet (pending W2+W3 close per L PROGRESS.md). W5 Lane B owns the binary production-demo-build choice:

- If W5 chooses ship-static-demo → W5 authors `public/robots.txt` (one line `User-agent: *\nDisallow:`) + `<link rel="canonical">` in `index.html`.
- If W5 chooses retire-demo-as-deploy-target → robots.txt formally retire-as-not-applicable.

Lighthouse `robots-txt` audit still fails at L W6 HEAD (score 0; "45 errors found" parsing the dev-server SPA shell as if it were robots.txt; same dev-mode artefact as K baseline). This is **expected** and not a regression — Vite dev mode serves the SPA fallback for any unknown path. In static prod hosting, either the file is present (Option A path) or the request 404s cleanly (Option B path).

### W5 dependency tracking

W6 forwards `robots.txt` to W5 hard-gate item. L W5 spec line 5 hard gate already covers the production-demo-build decision; W6 proof appends robots.txt as a sub-disposition of that gate.

**No file authored at W6.** `robots.txt` and `public/robots.txt` remain absent. `index.html` untouched at W6 (no canonical link added — that's W5's call).

## § 3 — Vue runtime + cache-ttl formal retires

### 3.1 P2-3 `uses-passive-event-listeners` — RETIRE-AS-NOT-OUR-SCOPE

**Source**: `@vue/runtime-dom` (Vue framework). Specifically `runtime-dom.esm-bundler.js:680` — Vue's internal event-listener attach pathway in production-bundler-mode.

**Audit verdict at L W6**: score 0.5 on all 4 routes (matches K baseline; no L-introduced regression).

**Disposition**: glass-ui consumes Vue as a peer dep. Two upstream paths:

1. File a PR against `@vue/runtime-dom` to add `{ passive: true }` to non-mutating event listeners.
2. Wait for Vue upstream to absorb (the Vue team is aware; tracked in vuejs/core issues).

Neither path is glass-ui's responsibility. **Formal retire-as-not-our-scope.** Carries forward to L FINAL.md ledger as upstream-Vue-debt; carries forward to glass-ui DESIGN.md as documented non-scope.

### 3.2 P2-4 `uses-long-cache-ttl` — RETIRE-AS-NOT-OUR-SCOPE

**Source**: production hosting layer. Vite dev server does not emit `Cache-Control: max-age=...` headers for HMR-served chunks (correctly — dev assets must not be cached).

**Audit verdict at L W6**: score 0.5 on all 4 routes ("2 resources found"; matches K baseline pattern).

**Disposition**: cache-control header emission is the prod hosting layer's responsibility (CloudFlare Pages / Vercel / Netlify auto-emit canonical long-cache for content-addressed asset URLs; static hosts like GitHub Pages need explicit `_headers` or equivalent). Not glass-ui's scope.

When/if W5 Lane B chooses ship-static-demo, the hosting choice for the demo deploy implicitly resolves this audit. Until then: **formal retire-as-not-our-scope.** Carries forward to L FINAL.md ledger; carries forward to glass-ui DESIGN.md as documented prod-hosting-layer scope.

## § 4 — Final Lighthouse cohort (representative routes)

The 4 K-affected routes were re-run (§ 1). Per W6 spec Step 4, this also doubles as the "final Lighthouse cohort" measurement. W2 and W3 have not closed yet — the W8 ι integrity-sweep is the canonical re-measurement point if W2/W3/W4/W5/W7 introduce regressions. L W6 establishes the post-L-W1 baseline.

### 4.1 Score deltas vs K W8 baseline + K WP baseline

| Route | Perf K-WP | Perf K-W8 | **Perf L-W6** | A11y K-WP | A11y K-W8 | **A11y L-W6** | SEO K-WP | SEO K-W8 | **SEO L-W6** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/primitives/buttons` | 54 | 54 | **54** | 94 | 94 | **100** | 82 | 91 | **91** |
| `/aurora` | 54 | 54 | **54** | 100 | 100 | **100** | 82 | 91 | **91** |
| `/navigation/dock` | 54 | 54 | **54** | 100 | 100 | **100** | 82 | 91 | **91** |
| `/motion/metaballs` | 54 | 54 | **54** | 100 | 100 | **100** | 82 | 91 | **91** |

**Net L-W6 vs K close**: `/primitives/buttons` A11y improved 94 → 100 (viz-basis dark-mode contrast). All other scores held. **0 L-W1 regressions** on the 4 K-affected routes.

### 4.2 Core Web Vitals (informational; dev-mode-bound)

| Route | FCP (s) | LCP (s) | TBT (ms) | CLS |
|---|---:|---:|---:|---:|
| `/primitives/buttons` | 14.2 | 26.3 | 20 | 0.066 |
| `/aurora` | 14.2 | 34.5 | 120 | 0.001 |
| `/navigation/dock` | 14.3 | 26.6 | 10 | 0.064 |
| `/motion/metaballs` | 14.4 | 26.7 | 90 | 0.065 |

All within ±10% of K baseline. Aurora's elevated LCP (+8s) and TBT (120ms) consistent with K WP measurements (WebGL shader-compile + 6 non-composited animated elements during preset bake). No L-attributable regression.

### 4.3 Bundle-budget sanity (cross-reference; not W6 scope)

L W1 close recorded `dist/glass-ui.js` raw 124.8K / 33.7K gz budget (66.6% headroom; -13.6K raw / -3.0K gz vs L W0 close); see `audit/W1-A-root-barrel-curation-proof.md`. L W1's modularization shrunk the runtime bundle without regressing any Lighthouse perf score (perf=54 across routes is the dev-mode floor, not the bundle-size signal).

## § 5 — Open questions for orchestrator

1. **F-ε-3 (P0-1 Configurator recursion on `/motion/metaballs`) recurrence**. Lighthouse `errors-in-console` audit scored 0 on `/motion/metaballs` at L W6 with the same error message as K WP / K W8 ε re-run:

   > `Maximum recursive updates exceeded in component <Configurator>.`

   K W8 disposition (FINAL.md "Findings absorbed in W8 cleanup pass" — F-ε-3) called this a "false-positive" — re-probed at HEAD via fresh Playwright session and saw 0 console errors. Lighthouse here at L W6 (Headless Chrome, isolated session, no stale dev cache) **reproduces** the error. The recursion is not deterministic — depends on render timing of `<MetaballCanvas>` mount vs `<Configurator>` initial sync. Lighthouse's stricter load discipline (waits for network idle + meaningful paint + a few RAFs) tends to surface it; Playwright probes that exit on first paint may not.

   **W6 does NOT touch src/ or demo/ per spec bounds**; flagging for orchestrator disposition. Options:
   - File a fresh L follow-up (M-tranche or L close ceremony absorption).
   - Re-run Playwright with stricter wait conditions to corroborate.
   - Treat K W8's "false-positive" disposition as documented PARTIAL and forward to M.

2. **robots.txt forward to W5**: confirmed Option B (defer to W5 Lane B). Verify W5 dispatch picks this up as a sub-item of the production-demo-build decision.

3. **Vue upstream `uses-passive-event-listeners` tracking**: should glass-ui DESIGN.md `## Out-of-scope` section be authored to explicitly enumerate these two formal-retire items? Or absorbed into L FINAL.md ledger only? (W6 default: L FINAL.md only; DESIGN.md absorption optional at W8 close ceremony.)

## § 6 — Worktree diff at W6 close

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
```

(see § 7 — only added: 8 Lighthouse JSON/HTML files + 1 proof doc; no src/ or demo/ touched; no `index.html` / `robots.txt` mutation.)

## § 7 — File-bound compliance

**Created** (within W6 spec bounds):
- `docs/tranches/L/audit/lighthouse-2026-05-11-postL/{aurora,buttons,dock,metaballs}.report.{html,json}` (8 files)
- `docs/tranches/L/audit/W6-lighthouse-completion-proof.md` (this doc)

**Not touched** (per spec MUST-NOT):
- `src/` (zero changes)
- `demo/` (zero changes)
- W7 territory (zero changes)

**Not touched** (Option B for robots.txt):
- `index.html` (unchanged; would have added `<link rel="canonical">` under Option A)
- `robots.txt` / `public/robots.txt` (still absent; W5 Lane B owns)

## § 8 — Hard gate satisfaction

(a) K-absorbed Lighthouse fixes re-verified clean — § 1.2 table (7 audits cleared at HEAD).
(b) robots.txt decision binary — Option B chosen (defer-to-W5); § 2.
(c) Vue runtime + cache-ttl formally retired-as-not-our-scope — § 3.1 + § 3.2.
(d) Lighthouse re-run scores captured — § 4.1 scores table + raw JSON/HTML at `audit/lighthouse-2026-05-11-postL/`.
(e) Proof doc — this file.
(f) Orchestrator-owned: W6 close commit `chore(tranche-l/w6): Lighthouse P2 cohort completion`.
