# Tranche AO — PROGRESS

Execution log for tranche AO (self-measurement truth + CSS-architecture pass + legacy purge). Updated at wave boundaries. Plan basis — `docs/tranches/AO/AO.md`; per-wave specs at `docs/tranches/AO/waves/W<N>.md`; synthesis at `docs/tranches/AO/audit/PATH-FORWARD.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched condition, named realisation) / USER-DOMAIN (cross-repo perimeter; user's push authority).

## Top-line status

**CLOSED — complete (v3.0.0 staged).** All 6 waves DONE. W0 (audit) → W1 (4-doc design slice, dev boundary) → W2 (self-measurement truth + legacy purge) → W3 (consumer-gap R0G-1..4) → W4 (CSS re-base + consolidation + R0G-5) → W5 (close + first changeset-driven 3.0.0). The speedtest-AQ consumer-request fold grew the tranche 5→6 waves. glass-ui-internal gate matrix all green; the 2 cross-repo residuals (speedtest consumer debt + stale worktrees; fourier-analysis phantom-classes handoff) are consumer-domain + absent from CI. The publish/push leg is user-domain (FINAL §Cross-repo perimeter).

AO opens against a **clean ledger** — 0 unaddressed requests, 0 survivors, no consumer-surfaced primitive gap (muster's H tranche is muster-only), and no ≥2-consumer pattern that clears the substrate-promotion gate. AO is internal-correctness work landed in the ideal window: the headline is the self-measurement truth + CSS-architecture pass, with the hygiene (alias delete + heap-prefix retire + doc resync + dist-wipe-footgun fix) riding the same close.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AO.W0 | 6-lane audit + path-forward synthesis | DEV | DONE | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` + `audit/PATH-FORWARD.md` + `AO.md` + `waves/W{0..5}.md` + this PROGRESS |
| AO.W1 | Design slice — gate-truth + CSS re-base + cascade-consolidation + legacy-purge + changeset-release + consumer-gap | DEV (boundary) | PLANNED | `design/W1.1-gate-truth.md` · `design/W1.2-css-rebase.md` · `design/W1.3-legacy-purge-and-build.md` · `design/W1.4-consumer-gap.md` |
| AO.W2 | Self-measurement truth + legacy purge | IMPL | PLANNED | `audit/W2-self-measurement-truth.md` (gate measures dist/styles · footgun closed · heap prefix 0 · alias grep 0) |
| AO.W3 | Consumer-gap (speedtest AQ R0G-1..4) | IMPL | PLANNED | `audit/W3-consumer-gap.md` (Aurora idle-fps · chassis mobile CLS < 0.05 · useIdleReady exported · Toaster position) |
| AO.W4 | CSS budget re-base + cascade consolidation + R0G-5 token | IMPL | PLANNED | `audit/W4-css-rebase-consolidation.md` (R0G-5 token · re-based ceiling · per-subpath enforce · proof:theme byte-clean · π re-probe) |
| AO.W5 | Close ceremony + first changeset-driven release | IMPL (LAST) | PLANNED | `audit/W5-close.md` + `FINAL.md` + `.changeset/` (default 3.0.0) |

**Wave count: 6 (AO.W0-AO.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; W2 the truth-foundation (W4's re-base depends on the gate measuring reality); W3 the consumer-gap pass (independent of W2; settles `instrument-chassis.css`); W4 the CSS headline pass against the settled cascade (post-W2 gate + post-W3 chassis + R0G-5 token); W5 closes + exercises changesets.

**Amendment (2026-05-29, post-W0):** speedtest tranche AQ surfaced 5 consumer-driven R0-glass items AFTER the W0 audit (`CONSUMER-REQUEST-speedtest-AQ.md`). AO folds all five (see `AO.md` §Consumer-request amendment + §Resolved decision 6) — R0G-1/2/3/4 → new AO.W3 consumer-gap wave; R0G-5 token → AO.W4. The W0 "0 unaddressed / clean ledger" finding was true-as-of-`4869b74`; the fold amends it. Wave count 5→6.

## Cross-tranche posture

AO is **glass-ui-internal-first**. The one cross-repo-shaped exercise is the first changeset-driven release (staged locally; the publish leg user-domain). User-domain perimeter items (OMEGA) — surfaced, not absorbed into AO source waves:

- **Push the held commits to `origin`** — the provenance gap. npm 2.1.0 is live and consumed (speedtest resolves it), but its source tree is single-copy local until pushed; one `git push` reconciles source with the already-published artifact. Highest-priority user-domain action.
- **Seed the `NPM_TOKEN` repo secret** — activates the never-run `release.yml` (the publish-on-tag contract is real-but-unexercised; every 2.x publish was manual `npm publish`).
- **Reconcile the precepts submodule** — commit + push its 3 dirty files (the inv-30 amendment + 2 new precept docs) inside `mkbabb/precepts`, then bump glass-ui's gitlink and include it in the push. Does NOT block AO.
- **First changeset-release tag push** — once W4 stages the changeset + bump locally, the user pushes branch + tag; `release.yml` fires the first end-to-end changeset-driven publish.

All four need the user's GitHub push authority.

---

## AO.W0 — 6-lane audit + path-forward synthesis — 2026-05-29 — DEV-CLOSED

- **Opens:** 2026-05-29
- **Closes:** 2026-05-29
- **Agents:** 6 audit (read-only, one per lane) + 1 synthesis
- **Disposition:** DONE — the audit ran; the synthesis is the binding basis for the AO plan.

### Events

- The 6-lane audit landed (`audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md`) + `audit/PATH-FORWARD.md` + `AO.md` + the W0-W4 wave specs + this PROGRESS.
- **The clean-ledger finding (ALPHA).** 13 DELIVERED / 0 UNADDRESSED across the AM→AN arc; the precept canon HELD over the AN window (agent git-discipline, no backwards-compat slip, no greenfield-voice breach); muster's H tranche surfaces no glass-ui primitive gap (it composes shipped 2.1.0 primitives or is muster-bespoke). EPSILON confirmed no ≥2-consumer pattern clears the substrate-promotion gate (inline-edit has 2 divergent shapes; LabeledSlider readout is minor-additive). So AO is neither consumer-gap-driven nor primitive-driven.
- **The three-stale-self-descriptions thesis.** The audit's real finding is internal: the library carries three stale self-descriptions (the gate measures the wrong CSS artifact; the §Build prose narrates a vanished api-extractor toolchain; the 8 GB heap prefix serves it) and one live legacy alias (`useSpringOrchestrator`). AO makes glass-ui's self-knowledge true and the source pristine.
- **The gate-mis-measurement headline (DELTA D1).** `profile:budget` measures `dist/glass-ui.css` (the SFC-only fragment, 7805 gzip, reported 90.2% of an 8650 ceiling) while consumers draw `dist/styles/index.css` (the AN.W1 fold — cascade + folded SFC bundle; W1.1 re-measured the fully-resolved draw at ~79 KiB gzip — the W0 ~10.2 KiB estimate counted only index.css text + the folded SFC, missing the 17 cascade rungs). A regression in the cascade arm (tokens / theme / utilities) never moves the gated number. The "90.2% near-breach" is a mis-measurement, not a crunch — the same gate-blindness class muster's H.W3 critical-path-gate closes. AO inv α: the gate measures the real consumer artifact.
- **The dist-wipe footgun (DELTA D2).** `vite.iter.config.ts` omits `publishStyleAssets()` and `emptyOutDir` defaults true, so every `iter-build` (hence every `profile:budget`) wipes `dist/` and never recreates `dist/styles`. This forced the "re-run the canonical build last" workaround at AN.W7 + muster G.W3 and is exactly why the gate could never see the real artifact. AO inv β: the two build configs do not wipe each other's dist.
- **The inv-47 alias (BETA).** `src/composables/motion/useSpringOrchestrator.ts` is a live `@deprecated` back-compat export alias (`useSpringOrchestrator = useNumericTransition`), kept as a one-minor courtesy from AL.W9-δ — now stale (the rename predates 2.0.0, the lib is at 2.1.0), zero external consumers (only 3 demo-private sites + 2 shim test cases). Its JSDoc defers retirement to v3.0; AO folds that deferral forward. DELETE — clean break, no replacement alias (inv 47 / L inv 4).
- **The dead heap prefix (GAMMA + DELTA D3).** `NODE_OPTIONS=--max-old-space-size=8192` lives at 4 sites (`package.json:481` build, `package.json:482` build:watch, `scripts/release.sh:81`, `.github/workflows/release.yml:31`). It was provisioned for the vite-plugin-dts + api-extractor per-entry walk (~6.7 GB RSS) that is GONE — dts now emits via `vue-tsc --project tsconfig.build.json`, the build is ~6.9 s, both arms peak < 740 MB RSS. The prefix is dead weight and the §Build paragraph is stale fiction. DROP + resync. **Resolved against BETA's "carry as latent-debt" framing:** BETA item 2 read the prefix as upstream-gated latent-debt to CARRY; GAMMA + DELTA + PATH-FORWARD finding 3 + AO.md decision 4 overrode it — the toolchain already moved off api-extractor, so the prefix is dead weight to DROP now, not a carry awaiting an upstream vite-plugin-dts incremental-rollup landing.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | The 6 lane docs exist with measured evidence | MET | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` |
| 2 | `audit/PATH-FORWARD.md` names the five resolved findings + wave shape + folded ledger + cross-repo posture | MET | `audit/PATH-FORWARD.md` |
| 3 | `AO.md` exists with the §Wave table + §Resolved decisions + §Folded ledger + §Critical files + inv α/β | MET | `AO.md` |
| 4 | The W0-W4 wave specs + PROGRESS derive from the synthesis; every candidate routes | MET | `waves/W{0..4}.md` + this PROGRESS |
| 5 | `git status -- src/` clean (no source); no agent-attributed git mutation | MET | read-only audit |

---

## AO.W1 — Design slice — END OF DEVELOPMENT BOUNDARY — 2026-05-29 — DEV-CLOSED

- **Opens:** after W0 close — **Closes:** 2026-05-29
- **Status:** DONE
- **Agents:** 4 (W1.1 gate-truth ‖ W1.3 legacy-purge ‖ W1.4 consumer-gap dispatched parallel; W1.2 css-rebase against W1.1's resolved measurement target)
- **Disposition:** DONE — the 4 design docs bind W2-W5. **The dev/impl boundary sits at W1|W2; the standing tranche directive ("complete the plan IN TOTALITY") is the authorization to cross it.**

### Events

- **The measurement correction (W1.1 + orchestrator).** The W0 audit + the first W1.1 pass estimated the combined CSS draw at ~10.2 KiB by counting only `index.css`'s entry text (comments + `@import` lines, 2441 gzip) + the folded SFC (7818). Measuring the FULLY-RESOLVED `dist/styles/index.css` (all 17 cascade `@import`s inlined + the folded SFC) gives **80827 gzip ≈ 79 KiB** — the cascade arm (tokens.css 26 KiB, dock.css 10.7, utilities.css 10.4, …) dominates and was untracked. The gate-blindness was worse than DELTA diagnosed. The gate (inv α) resolves every `@import` so a regression in ANY rung trips it; the W1.1 "inline only glass-ui.css, leave cascade as references" design was corrected (it would have re-blinded the cascade arm, failing W2 gate #3). Binding specs (W2/W4/AO.md/PROGRESS) re-numbered to ~79 KiB.
- **The W1.3 grep catch.** The alias-deletion grep `grep -r 'useSpringOrchestrator' src/` would match a "renamed from useSpringOrchestrator" comment in `src/composables/motion/useNumericTransition.ts:10-14` — folded into the W2 scrub list (a 9th touch the original File Bounds missed). The alias is an identity alias (no signature difference) — every call site is a pure symbol swap.
- **The heap-prefix 6 sites.** Empirically there are 6, not 4 — `.github/workflows/ci.yml` carries a live env (`:40`) + a stale comment (`:14`) the original plan missed. W2 + the AO.md/wave specs corrected to 6.
- **W1.4 consumer-gap shape.** Pinned the exact Aurora RAF site (`tick()`/`arm()` in `aurora/composables/runtime.ts`; option (a) demand-driven + visibilitychange-pause), the chassis defect (`grid-template-rows: auto auto auto` in the `@media (max-width:720px)` `.instrument-dial` block → min-height reserve), the `useIdleReady` signature (`useViewportReady` minus the IO stage + an `onReady` hook), and the `Toaster` `position` map (default `bottom-right` byte-identical).
- **W1.2 found a latent bug** — `drawer.css` double-wraps `hsl(var(--background))` on an already-`hsl()` token (`:49`/`:101`); folded into W4 as a fix (not a reclaim). Re-based ceiling derived: post-consolidation ~75447 gzip → ceiling `83000` gzip. R0G-5 token home: `tokens.css` §5 (the `--card` opaque-surface convention), value `hsl(44 16% 96%)` light.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `design/W1.1-gate-truth.md` — combined-draw measurement + dist-share fix + per-subpath enforce | MET | resolved-draw 80827 gzip; Option (a) shared `vite.style-assets.ts`; drift-% gate |
| 2 | `design/W1.2-css-rebase.md` — re-based ceiling (derived) + per-rung consolidation plan | MET | ceiling 83000 gzip; per-rung reclaim plan across 19 files |
| 3 | `design/W1.3-legacy-purge-and-build.md` — alias migration map + 6 heap sites + §Build resync + version (3.0.0) | MET | 9-touch migration map; identity alias; §Build draft |
| 4 | `design/W1.4-consumer-gap.md` — R0G-1..4 exact sites + shapes | MET | RAF site, chassis defect, useIdleReady sig, Toaster map |
| 5 | `git status -- src/` clean; dev/impl boundary marked | MET | src/ clean; boundary crossed under the standing directive |

---

## AO.W2 — Self-measurement truth + legacy purge — 2026-05-29 — CLOSED

- **Opens:** after W1 close — **Closes:** 2026-05-29
- **Status:** DONE — all 7 hard gates MET
- **Agents:** 2 (∥ disjoint — Agent A gate/build truth ‖ Agent B motion-alias delete); orchestrator-verified combined
- **Commits:** `f79df28` (D1 inv α) · `b10c66f` (D2 inv β) · `9e5c036` (D3 heap + §Build) · `9f90bb4` (alias delete)

### Events

- **inv α landed + proven** — `combinedStylesDraw` resolves the full `dist/styles/index.css` @import graph; the gate reads **80786 gzip** (fully-resolved), not the 7818 SFC fragment. A synthetic 4000-prop regression into `src/styles/tokens.css` moved it 80786 → 144142 gzip and tripped the gate (FAIL exit 1); restored clean. The SFC-only gate was blind to this.
- **inv β landed** — `publishStyleAssets` shared via `vite.style-assets.ts`; `dist/styles` + `dist/fonts` survive a `profile:budget` run. The "re-run build last" workaround retired.
- **heap prefix gone** — 6 sites (ci.yml carried 2 the plan missed); build under default heap peaks **708 MB RSS** (~10× under the dropped 8 GB). §Build resynced to the real `vue-tsc` toolchain.
- **alias deleted** — `useSpringOrchestrator` (identity alias) removed; 9 touches → `useNumericTransition`; grep 0; slug kept (inv 43).

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 under DEFAULT heap | MET | typecheck 0; build 0, peak RSS 708 MB |
| 2 | Gate measures `dist/styles` (fully-resolved ~80.8 KiB), not the SFC fragment | MET | `[PASS] dist/styles/index.css — gzip 80786/89000 (90.8%)` |
| 3 | Gate fails-on-synthetic-cascade-regression | MET | tokens.css probe → 144142 gzip, FAIL exit 1; restored clean |
| 4 | Gate passes-on-HEAD | MET | exit 0 at 90.8% |
| 5 | Dist-wipe footgun closed (profile:budget leaves dist/ intact) | MET | dist/styles + dist/fonts present post-run |
| 6 | `grep -rn 'max-old-space-size' package.json scripts/release.sh .github/` = 0 | MET | 0 matches (6 sites) |
| 7 | `grep -r 'useSpringOrchestrator' src/` = 0; demo + tests migrated | MET | 0 matches; typecheck 0 |

---

## AO.W3 — Consumer-gap (speedtest AQ R0G-1..4) — 2026-05-29 — CLOSED

- **Opens:** after W1 close — **Closes:** 2026-05-29
- **Status:** DONE — gates 1-5 MET; gate 6 (visual π) runs at W5 close
- **Agents:** 4 (∥ disjoint — aurora ‖ instrument-chassis ‖ composables/dom ‖ toast); orchestrator-verified combined
- **Commits:** `f934fed` (R0G-1) · `f76f7bf` (R0G-2) · `029d052` (R0G-3) · `8e299a6` (R0G-4) · `ab93d38` (surface-manifest purge) · `c92b2a5` (audit)

### Events

- **R0G-1 Aurora** — demand-driven `needsAnimation()` loop + `wake()` setters + runtime `visibilitychange` suspend; `drawFrame` byte-identical (π hero unchanged in motion). Fixed a latent bug in the same carve: the outer `resume` wrapper set `running=true` before the inner `resume()`'s `if(running) return`, so the `useIntersectionPause` re-show seam no-opped post-arm — now delegates purely.
- **R0G-2 chassis** — mobile `.instrument-dial` reserves the final box from frame 0 (`min-height` + `minmax(0,1fr)` meter row); only the paint-only `--phase-tint` transition animates; tokens.css untouched (W4 owns the canonical token).
- **R0G-3 useIdleReady** — created sibling of `useViewportReady`; vueuse-free; surfaces to the root barrel + resolves from dist (`function`); 7-case test green. Justified by 5 consumer sites.
- **R0G-4 Toaster position** — additive prop, default `bottom-right` byte-identical to the prior literal (proven via real `cn()`).
- **Surface manifest** — `tests/public-surface.spec.ts` dropped the deleted-alias assertions, completing the W2 purge; full suite 521 passed.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 (default heap) | MET | both 0 |
| 2 | R0G-3 `useIdleReady` exported + resolves; sibling-consistent; test passes | MET | dist export = function; 7-case test green |
| 3 | R0G-4 `<Toaster>` accepts `position`; default anchor unchanged | MET | default class byte-identical |
| 4 | R0G-1 Aurora loop demand-driven + visibilitychange-paused; reduced-motion static | MET | `needsAnimation()` + visibility listener; drawFrame untouched |
| 5 | R0G-2 chassis reserves dial final box at mobile; recentre transform-only | MET | min-height + minmax reserve; paint-only transition |
| 6 | Visual π re-probe — aurora/chassis/toast zero canon regression | DEFERRED→W5 | runs in the close ceremony |

---

## AO.W4 — CSS budget re-base + cascade consolidation + R0G-5 token — 2026-05-29 — CLOSED

- **Opens:** after W2 + W3 close — **Closes:** 2026-05-29
- **Status:** DONE — gates 1-4, 6 MET; gate 5 (visual π) runs at W5 close
- **Agents:** 2 (Carve B cascade+tokens, then Carve A gate re-base+enforce against the settled draw); orchestrator-verified
- **Commits:** see W4 commit list below

### Events

- **R0G-5 token** — `--surface-public-data-panel` (light `hsl(44 16% 96%)`, dark `hsl(36 9% 12%)`) added to tokens.css §5 + theme.css bridge. Chassis reserve canonical tokens added (token-first completion of R0G-2). drawer.css double-`hsl()` bug fixed.
- **Consolidation** — conservative dedup (dock.css density-merge + four-state `:where()` hoist, utilities.css hoists, prose trims) reclaimed **6476 gzip**: resolved draw 80827 → **74928 gzip**. No rung retired (rainbow/configurator-row/disco-glyph-hook/gold-hover all left intact, overfitting-gated). proof:theme byte-clean.
- **Re-base** — CSS ceiling re-based to `{raw 340000, gzip 82500}` (74928 + ~10%), derived not invented; the SFC-only 8650 ceiling + the bump-at-every-close chain retired. Gate PASSES at 90.8% (the deliberate 10% headroom).
- **Per-subpath enforcement** — D5 drift gate (10%, 1 KiB floor) vs the regenerated honest baseline; probe-confirmed (aurora 16470→13000 baseline → FAIL +26.7%; restored). W2 `combinedStylesDraw` unchanged — the cascade-regression property holds.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 | MET | both 0 |
| 2 | `proof:theme` byte-clean (every rung + the new token ships) | MET | proof:theme 0 |
| 3 | Honest gate PASSES with documented headroom (re-based ceiling) | MET | `[PASS] styles/index.css gzip 74928/82500 (90.8%)`, --enforce 0 |
| 4 | Per-subpath caps enforced; synthetic per-subpath regression trips | MET | aurora drift probe → FAIL +26.7%; restored |
| 5 | Visual π re-probe — zero canon regression | DEFERRED→W5 | runs in the close ceremony |
| 6 | W2 fails-on-synthetic-cascade-regression still holds against the re-base | MET | `combinedStylesDraw` unchanged |

---

## AO.W5 — Close ceremony + first changeset-driven release — 2026-05-29 — CLOSED

- **Opens:** after W2 + W3 + W4 close — **Closes:** 2026-05-29
- **Status:** DONE — all 6 gates MET; AO closes `complete`
- **Agents:** orchestrator-led close sweep
- **Disposition:** DONE — `v3.0.0` staged via the first changeset-driven version bump

### Events

- **π re-probe (asset-level)** — caught + fixed a real regression: the W4 `:where()` hoist dropped the dock focus-ring specificity (0,2,0 → 0,1,0), restored via a comma group (one rule body, original specificity). proof:theme byte-clean; aurora drawFrame byte-identical; chassis reserve mobile-scoped; toast default byte-identical; the drawer.css fix is a correction.
- **ι sweep** — stash CLEAN (audit:stash 0); no agent-attributed git mutation; secrets-clean (only NPM_TOKEN doc-name references); alias grep 0.
- **Overfitting** — every AO change correctness/deletion/gate-cleared; the one new substrate `useIdleReady` carries its 5-site justification.
- **Two W5-discovered truth-fixes** — the root-surface contract proof was stale (flagged ~40 legitimate exports; would fail CI on push) → resynced to the real barrel (registers useIdleReady); the `prepare` dts guard hardened (an iter-build-left dist no longer packs incomplete).
- **First changeset release** — `.changeset/ao-self-measurement-truth.md` (major) → `changeset version` bumped **2.1.0 → 3.0.0** + generated CHANGELOG.md; dist rebuilt. The tag + publish leg is user-domain.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | π re-probe — canon + 4 motion primitives + W3 surfaces unregressed | MET | `audit/W5-close.md` (caught + fixed the dock specificity regression) |
| 2 | ι sweep — stash-clean; no agent mutation; secrets-clean; alias grep 0 | MET | `audit/W5-close.md` |
| 3 | Overfitting audit clean | MET | `audit/W5-close.md` |
| 4 | Full gate matrix green locally | MET (glass-ui-internal) | `FINAL.md` §Gate matrix; 2 cross-repo residuals documented |
| 5 | `AO/FINAL.md` authored | MET | `FINAL.md` |
| 6 | First changeset + `changeset version` → 3.0.0 + CHANGELOG; dist rebuilt | MET | `CHANGELOG.md`; package.json 3.0.0 |
