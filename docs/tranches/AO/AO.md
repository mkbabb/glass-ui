# Tranche AO — Self-measurement truth + CSS-architecture pass + legacy purge + consumer-gap fold

AO is glass-ui's post-AN consolidation tranche. AN closed the consumer-gap shape (the 8 gaps muster's F redesign surfaced at the root — `/styles` completeness, detented Drawer, role contracts, dispositions). AO closes the **self-measurement shape** — glass-ui's budget gate measures what consumers actually draw, its build matches its real toolchain, its last legacy alias deletes, and its CSS cascade consolidates against a re-based, honest ceiling.

AO is in DEVELOPMENT now. W0-W1 formulate the tranche; W2-W4 are authored-now-run-later — the implementation phase opens only on explicit user authorization. The dev/impl boundary sits between W1 and W2.

## § Thesis

The AO.W0 6-lane audit found glass-ui opens against a clean ledger: 0 unaddressed requests, 0 survivors, no consumer-surfaced primitive gap (muster's H tranche is muster-only; its multi-voter keystone composes shipped 2.1.0 primitives), and no ≥2-consumer pattern that clears the substrate-promotion gate (promoting the divergent inline-edit shapes would be the overfit trap the precepts forbid). So AO is neither consumer-gap-driven nor primitive-driven.

The audit's real finding is internal: **the library carries three stale self-descriptions and one live legacy alias.** The budget gate measures `dist/glass-ui.css` (SFC-scoped CSS only) while consumers draw `dist/styles/index.css` (the AN.W1 fold) — so the gate is blind to the cascade arm (the ~79 KiB bulk of the resolved stylesheet) and the "90.2% near-breach" is a mis-measurement, not a crunch. The `--max-old-space-size=8192` build prefix is dead weight for an api-extractor toolchain that no longer exists (the dts emit moved to `vue-tsc`; the build peaks < 740 MB). CLAUDE.md §Build still describes the vanished toolchain. And `useSpringOrchestrator` is a live `@deprecated` back-compat alias with zero external consumers.

AO makes glass-ui's self-knowledge true and the source pristine — the no-workaround, no-legacy, elegance/simplicity work the directive calls for, landed in the ideal window. The headline is the measurement-truth + CSS-architecture pass; the hygiene (alias delete + heap-prefix retire + doc resync + dist-wipe-footgun fix) rides the same close and funds the headline by making the CSS reclaim measurable.

## § Consumer-request amendment (post-W0)

The AO.W0 audit ran **before speedtest tranche AQ existed**, so its "0 unaddressed requests / no consumer-surfaced primitive gap" finding was true-as-of-`4869b74` but is now amended. speedtest's AQ 10-lane cohort surfaced **five consumer-driven items** handed to AO as the publisher (`docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md`; authoritative spec `speedtest/docs/tranches/AQ/R0-GLASS-COORDINATION.md`). AO owns the disposition; all five LAND:

| # | Item | Kind | Why it clears the gate |
|---|---|---|---|
| R0G-1 | Aurora demand-driven / visibility-paused render loop | perf, existing primitive | the idle full-motion loop lives in the primitive (no consumer band-aid possible); ~4 fps/100% GPU at idle vs 118 fps under reduced-motion proves the loop is the cost |
| R0G-2 | InstrumentChassis breakpoint-correct child-geometry reserve | CLS correctness, existing primitive | mobile-390px CLS 0.32-0.38 from post-paint dial reflow; the child layout is in the primitive, not consumer-fixable |
| R0G-3 | `useIdleReady` composable | substrate promotion | **5 speedtest consumer sites** — clears J inv 10 / L inv 8; the rIC-sibling of the shipped `useViewportReady` |
| R0G-4 | `Toaster` `position` prop | API completeness | additive; default unchanged; retires speedtest's `.z-toast` consumer override |
| R0G-5 | `--surface-public-data-panel` token | theme token | additive cascade rung; `proof:theme`-gated |

These **extend** the internal-first thesis — four of five are elegance/simplicity/performance transpositions of existing surface, one is a gate-clearing promotion; none invents unjustified substrate. All are additive and ride AO's 3.0.0 alias-removal break (one release, not a 2.2.0-then-3.0.0 two-step). R0G-1/R0G-2/R0G-3/R0G-4 land in a new consumer-gap wave (AO.W3); R0G-5 folds into the CSS cascade wave (AO.W4) so the re-base measures the final cascade.

## § Binding question

Can glass-ui make its self-measurement honest — a budget gate that measures the real combined consumer artifact (`dist/styles/index.css`, cascade + folded SFC bundle) instead of the SFC-only file no consumer imports in isolation; an iter-build that no longer wipes `dist/styles` out from under the canonical build; a build config + CLAUDE.md §Build that match the real `vue-tsc` dts toolchain with the dead 8 GB heap prefix dropped at all 6 sites; the last `@deprecated` back-compat alias deleted with its demo + test consumers migrated to `useNumericTransition`; and the CSS cascade consolidated against a re-based, true ceiling with per-subpath enforcement — all exercised through the first real changeset-driven release, with `proof:theme` byte-clean and the visual canon + 4 motion primitives unregressed?

## § Goal criterion

AO succeeds when the library's self-measurement is true + the legacy clears + the CSS consolidates honestly:

- **The gate measures reality.** `profile:budget` measures the combined `dist/styles/index.css` consumer draw (the cascade arm + the AN.W1-folded SFC bundle), so a regression anywhere in the cascade (tokens / theme / utilities) moves the gated number. Per-subpath chunk caps are enforced, not merely reported. The SFC-only `dist/glass-ui.css` measurement is retired as the false witness it was.
- **The dist-wipe footgun closes.** `iter-build` and the canonical build no longer fight over `dist/styles` / the fold — either `publishStyleAssets()` is shared across both Vite configs or iter-build uses a disjoint `dist-iter/` outDir. `profile:budget` runs without wiping the canonical dist; the AN.W7 / muster-G.W3 "re-run build last" workaround is no longer necessary.
- **The build matches its toolchain.** The `--max-old-space-size=8192` prefix is dropped at all 6 sites (package.json build + build:watch, release.sh, release.yml, ci.yml live-env + its stale comment); the build runs green under Node's default heap; CLAUDE.md §Build is resynced to describe the real `vue-tsc --project tsconfig.build.json` dts emit (no api-extractor / vite-plugin-dts prose).
- **The last legacy alias deletes.** `useSpringOrchestrator` + `UseSpringOrchestratorOptions` + the `export *` are removed; the 3 demo sites + 2 shim test cases migrate to `useNumericTransition`; the "retires at v3.0" comments are scrubbed. `grep -r 'useSpringOrchestrator' src/` returns ZERO. Clean break, no replacement alias.
- **The CSS consolidates against a true ceiling.** The budget ceiling is re-based against the real fully-resolved draw (~79 KiB gzip; W1.1-measured 80827 — the cascade arm, not the ~10 KiB the W0 estimate assumed); the 19-file cascade is consolidated (dedup'd declarations, `@theme`/`@utility` consolidation) to reclaim genuine headroom; `proof:theme` is byte-clean (the cascade ships every rung) and a visual π re-probe confirms zero canon regression.
- **The release process is exercised.** AO's version bump (default 3.0.0 — the alias-removal break) routes through `changeset add` → `changeset version` → tag, the first real changeset-driven release; the publish leg is user-domain but the path is proven locally.

## § Completion criterion

The development half (W0-W1) completes when the 6-lane audit + path-forward synthesis + this plan + the W0-W5 wave specs (incl. the consumer-gap fold) are authored and the W1 design slice verifies. The implementation half (W2-W5) completes when every wave's hard gate verifies: the honest gate measures `dist/styles` + fails on a synthetic cascade-arm regression + passes on HEAD; the dist-wipe footgun is closed (a `profile:budget` run leaves the canonical dist intact); the heap prefix grep returns 0 at the 4 sites + the build is green under default heap + CLAUDE.md §Build matches the toolchain; the alias grep returns 0 + the demo/tests are migrated; the 4 consumer-gap items land (Aurora idle-fps recovers, chassis mobile-390 CLS < 0.05, `useIdleReady` exported, `Toaster` `position` honored); the CSS ceiling is re-based + the R0G-5 token added + the cascade consolidated + `proof:theme` byte-clean + π re-probe clean; the changeset-driven version bump lands; the close ceremony's π + ι + overfitting + AO.FINAL run.

## § Inherited invariants

All standing glass-ui invariants bind unchanged (J inv 10 / L inv 8 substrate-binary; P inv 28 zero-deferral; L inv 4 / inv 47 no-backwards-compat-alias + no-legacy-code; the vueuse-FREE root barrel; contract-v2 — now amended by the inv-30 retirement). The load-bearing ones for AO:

- **inv 47 / L inv 4** no backwards-compat aliases, no legacy code — gates the `useSpringOrchestrator` deletion (the live violation AO closes).
- **J inv 10 / L inv 8** substrate-without-consumer is binary — gates AO against inventing a primitive (no ≥2-consumer pattern clears the gate; the 2 AN ARCHIVED items + the watched inline-edit convergence stay gated).
- **P inv 28** zero-deferral — AO's own findings dispose within AO; the only carries are the externally-gated watched conditions.

AO introduces:

- **AO inv α — the budget gate measures the real consumer artifact.** `profile:budget` measures the combined `dist/styles/index.css` consumer draw (cascade + folded SFC bundle), not the SFC-only `dist/glass-ui.css` in isolation. A gate that measures a file no consumer imports is a false witness; the cascade arm must be inside the gated number so a regression there fails CI. WHY: the AN-window "90.2% near-breach" was a mis-measurement that could have driven an emergency reclaim against a phantom ceiling; the gate must measure what ships. (The same gate-blindness class muster's H.W3 closes for the critical-path-gate — both libraries' gates measured the wrong graph.)
- **AO inv β — the canonical build and iter-build do not wipe each other's dist.** `publishStyleAssets()` (the AN.W1 fold + fonts + styles emit) is shared across both Vite configs OR iter-build uses a disjoint outDir, so no build mode leaves `dist/styles` absent. WHY: the dist-wipe footgun forced a "re-run the canonical build last" workaround at AN.W7 + muster G.W3; the footgun closes at the cause.

## § Resolved design decisions

1. **The headline.** RESOLVED: **self-measurement truth + the CSS-architecture pass** (DELTA D1+D2+D4+D5+D6), NOT a "CSS near-breach crisis" reclaim (the crisis was a mis-measurement) and NOT a primitive-promotion (no ≥2-consumer pattern clears the gate). The hygiene lane (alias + heap prefix + doc) rides the same close.
2. **The CSS ceiling.** RESOLVED: re-base against the real combined draw (W3 D4) AFTER the gate measures it (W2 D1) — not before; consolidate (D6) against the honest number.
3. **The legacy alias.** RESOLVED: DELETE (W2) — clean break, zero external consumers, no replacement alias (inv 47 / L inv 4).
4. **The 8 GB heap prefix.** RESOLVED: DROP at all 4 sites + resync CLAUDE.md §Build (W2) — the toolchain it served is gone; this is not an upstream-gated carry (the prior "wait for vite-plugin-dts incremental rollup" framing is moot since api-extractor already left).
5. **The version + release.** RESOLVED: the alias-removal makes AO a **3.0.0** break (default; W1/W5 confirm), routed through the first real changeset-driven release to exercise the G.W5 machinery. Safe to cascade — the removed alias has zero consumers; the five additive consumer items ride the same 3.0.0 cut.
6. **The consumer-request fold.** RESOLVED: FOLD all five speedtest-AQ items into AO (the §Consumer-request amendment) — the request hands AO the disposition; four are elegance/perf transpositions of existing primitives, one (`useIdleReady`) is a ≥2-consumer-gated promotion; none invents unjustified substrate. R0G-1/2/3/4 → new AO.W3 consumer-gap wave; R0G-5 → AO.W4 cascade wave. Declining or deferring would breach the fold-surfaced-items discipline; the items are additive and gate-clean.

## § Wave table

| Wave | Title | Phase | Agents | Closes-on (evidence) |
|---|---|---|---|---|
| **AO.W0** | 6-lane audit + path-forward synthesis | DEV (now) | 6 audit + 1 synth | The 6 lane docs + `audit/PATH-FORWARD.md` + this AO.md + the W0-W4 wave specs + PROGRESS. |
| **AO.W1** | Design slice — gate-truth + CSS re-base + cascade-consolidation + legacy-purge + changeset-release + consumer-gap | DEV | 3-4 | Design docs at `design/`: (1) `W1.1-gate-truth.md` (the gate measures `dist/styles` combined draw + the iter-build/canonical dist-share fix + per-subpath enforcement); (2) `W1.2-css-rebase.md` (the re-based ceiling against the real draw + the cascade-consolidation plan per-rung + the R0G-5 token); (3) `W1.3-legacy-purge-and-build.md` (the alias deletion + migration map + the heap-prefix-drop sites + the §Build resync + the changeset-release/version decision); (4) `W1.4-consumer-gap.md` (R0G-1 Aurora loop + R0G-2 chassis CLS + R0G-3 useIdleReady + R0G-4 Toaster position — shape + acceptance per item). **END OF DEVELOPMENT BOUNDARY.** |
| **AO.W2** | Self-measurement truth + legacy purge | IMPL | 2 (∥ disjoint) | D1 gate measures the real `dist/styles` artifact (+ fails on synthetic cascade-arm regression); D2 iter-build/canonical dist-wipe footgun closed (shared `publishStyleAssets` or disjoint outDir); D3 drop the `--max-old-space-size=8192` prefix at the 6 sites (package.json ×2, release.sh, release.yml, ci.yml ×2) + resync CLAUDE.md §Build; DELETE the `useSpringOrchestrator` alias + migrate 3 demo sites + 2 tests + scrub comments. Grep proofs: heap-prefix 0, alias 0 in src. Build green under default heap. |
| **AO.W3** | Consumer-gap (speedtest AQ R0G-1..4) | IMPL | up to 4 (∥ disjoint) | R0G-1 Aurora demand-driven/visibility-paused render loop (idle-fps recovers; π unregressed); R0G-2 InstrumentChassis breakpoint-correct child reserve (mobile-390 CLS < 0.05; recentre transform-only); R0G-3 `useIdleReady` composable exported from the dom barrel (scope-aware; sibling of `useViewportReady`); R0G-4 `Toaster` `position` prop (default unchanged). File-disjoint carves: aurora ‖ instrument-chassis ‖ composables/dom ‖ toast. |
| **AO.W4** | CSS budget re-base + cascade consolidation + R0G-5 token | IMPL | 1-2 | R0G-5 `--surface-public-data-panel` token added to the cascade; D4 re-base the ceiling against the real combined draw (post-token, post-W3 chassis CSS); D5 per-subpath cap enforcement; D6 cascade dedup / `@theme`+`@utility` consolidation for genuine headroom. `proof:theme` byte-clean (every rung + the new token ship); the new honest gate PASSES with documented headroom; a visual π re-probe confirms zero canon regression. |
| **AO.W5** | Close ceremony + first changeset-driven release | IMPL (LAST) | 1 | π re-probe (visual canon + 4 motion primitives + the W3 consumer surfaces intact); ι integrity-sweep (AO window; stash-clean; no agent-attributed mutations; secrets-clean; the alias grep 0); overfitting audit (every AO change is correctness/deletion/gate-cleared promotion — no unjustified substrate); `AO/FINAL.md` with the gate table + the watched-conditions ledger (the 2 AN ARCHIVED items + inline-edit convergence + LabeledSlider); the changeset-driven version bump (default 3.0.0, carrying the alias break + the 5 consumer items); the cross-repo user-domain perimeter recorded. |

**Wave count: 6 (AO.W0-AO.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; W2 the truth-foundation (W4's re-base depends on the gate measuring reality); W3 the consumer-gap pass (independent of W2 — both can run; R0G-2 settles `instrument-chassis.css`, R0G-5 lands in W4 so the cascade reaches final shape before the re-base); W4 the CSS headline pass against the settled cascade; W5 closes + exercises changesets. W2's items are file-disjoint (gate/build config vs the motion-alias deletion) and W3's four carves (aurora ‖ chassis ‖ composable ‖ toast) are file-disjoint — both parallelize. W4 runs after W2 (gate truth) AND W3 (final cascade content).

## § Folded ledger

| Audit-lane finding | AO wave |
|---|---|
| DELTA D1 gate measures the wrong CSS artifact | AO.W2 (inv α) |
| DELTA D2 iter-build dist-wipe footgun | AO.W2 (inv β) |
| DELTA D3 / GAMMA — drop 8 GB heap prefix + resync §Build | AO.W2 |
| BETA — delete the inv-47 `useSpringOrchestrator` alias | AO.W2 |
| speedtest AQ R0G-1 — Aurora demand-driven render loop | AO.W3 |
| speedtest AQ R0G-2 — InstrumentChassis breakpoint child reserve | AO.W3 |
| speedtest AQ R0G-3 — `useIdleReady` composable (5-site promotion) | AO.W3 |
| speedtest AQ R0G-4 — `Toaster` `position` prop | AO.W3 |
| speedtest AQ R0G-5 — `--surface-public-data-panel` token | AO.W4 |
| DELTA D4 re-base CSS ceiling | AO.W4 |
| DELTA D5 per-subpath enforcement | AO.W4 |
| DELTA D6 cascade consolidation | AO.W4 |
| EPSILON — first changeset-driven release / version bump | AO.W5 |
| ALPHA — 0 survivors at W0; speedtest AQ surfaced 5 post-audit (folded) | AO.W3 + AO.W4 |
| BETA / EPSILON — 2 AN ARCHIVED items (reorder, dock panel-host) | NAMED-FORWARD (passive 2-consumer watch) |
| EPSILON — inline-edit primitive convergence + LabeledSlider | NAMED-FORWARD (watched conditions) |
| OMEGA — push / NPM_TOKEN secret / precepts submodule | USER-DOMAIN (perimeter ledger; not AO waves) |

## § Cross-repo posture

AO is **glass-ui-internal-first** with one inbound consumer-request fold (speedtest AQ → the 5 R0-glass items, §Consumer-request amendment); after publish, speedtest pins `^3.0.0` and adopts per the acceptance gates in its coordination spec. The one cross-repo-shaped exercise is the first changeset-driven release (staged locally; the publish leg user-domain — and now outward-facing for the consumer items too, so confirm-first holds). The user-domain perimeter items (OMEGA): push glass-ui's held commits to `origin` (a provenance liability — npm 2.1.0 is live and consumed, but its source is single-copy local until pushed; one `git push` reconciles it); seed the `NPM_TOKEN` repo secret to activate the never-run `release.yml`; commit + push the precepts submodule's 3 dirty files + bump glass-ui's gitlink. These need the user's GitHub push authority; they are surfaced, not absorbed.

## § Dev/impl boundary

W0 + W1 are DEVELOPMENT (audit + design docs; write NO source). W2-W5 are IMPLEMENTATION — authored as binding wave specs. The boundary lands between W1 and W2; the standing tranche directive ("complete the plan IN TOTALITY") is the authorization to cross it.

## § Critical files

```
DEVELOPMENT artefacts (W0-W1 — written, no source):
  docs/tranches/AO/audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md   (AO.W0)
  docs/tranches/AO/audit/PATH-FORWARD.md                               (AO.W0 synthesis)
  docs/tranches/AO/AO.md                                               (this plan)
  docs/tranches/AO/PROGRESS.md                                         (execution log)
  docs/tranches/AO/waves/W{0..4}.md                                    (wave specs)
  docs/tranches/AO/design/W1.{1..4}-*.md                               (AO.W1 design slice)
  docs/tranches/AO/FINAL.md                                            (AO.W5)

IMPLEMENTATION targets (W2-W5 — authored-now-run-later):
  Owns (modify):
    scripts/profile-bundle.mjs                    (AO.W2 — measure dist/styles real draw; inv α; W4 — per-subpath enforce + re-base)
    vite.config.ts + vite.iter.config.ts          (AO.W2 — share publishStyleAssets / disjoint outDir; inv β)
    package.json (build scripts ×2) + scripts/release.sh + .github/workflows/{release,ci}.yml  (AO.W2 — drop --max-old-space-size=8192 at all 6 sites)
    CLAUDE.md §Build                              (AO.W2 — resync to the real vue-tsc dts toolchain)
    src/composables/motion/index.ts + src/motion.ts + src/index.ts  (AO.W2 — drop the alias export + scrub comments)
    demo/stories/motion/springs.vue + demo/stories/composables/use-spring-orchestrator.vue + demo/stories/manifest.ts  (AO.W2 — migrate to useNumericTransition)
    src/composables/__tests__/useNumericTransition.test.ts  (AO.W2 — migrate the 2 shim test cases)
    src/components/custom/aurora/ (Aurora.vue + composables)  (AO.W3 — R0G-1 demand-driven/visibility-paused loop)
    src/components/custom/instrument-chassis/ + src/styles/instrument-chassis.css  (AO.W3 — R0G-2 breakpoint child reserve, transform-only recentre)
    src/components/ui/toast/Toaster.vue + index.ts  (AO.W3 — R0G-4 position prop)
    src/styles/theme.css + src/styles/tokens.css  (AO.W4 — R0G-5 --surface-public-data-panel token)
    src/styles/*.css (the 19-file cascade)        (AO.W4 — consolidation / dedup; CSS-budget-bound)
    .changeset/ (a real changeset)                (AO.W5 — the first changeset-driven version bump)
  Owns (create):
    src/composables/dom/useIdleReady.ts + src/composables/dom/index.ts  (AO.W3 — R0G-3, sibling of useViewportReady)
  Owns (delete):
    src/composables/motion/useSpringOrchestrator.ts  (AO.W2 — the inv-47 alias; clean break)
  The 4 motion primitives + the visual canon + the W3 consumer surfaces are the regression bar; proof:theme byte-clean post-consolidation + with the new token.
```

## § Style discipline

Greenfield voice — glass-ui is the product from the outset; no migration language; no "ported from"; no version history in prose. Em dashes unspaced. No epanorthosis, no grandiloquence. Every wave item carries WHAT + WHY; goal + completion criteria paired. AO DELETES the legacy alias (no replacement); DROPS the dead heap prefix (no kept-for-safety hedge); the gate measures reality (no measure-the-convenient-file shortcut). The CSS consolidation is dedup against a true ceiling, not a budget-raise to paper over weight. AO is glass-ui making its own self-knowledge honest — the elegance/simplicity transposition the audit revealed in a clean window.
