# EXECUTION-PROGRESS.md — the BG+BH 5.0.0 cursor / wave-state ledger

> The DURABLE cursor for `bg-bh-execute.wf.js`. Every wave (≈110 BG + ≈30 BH = ≈140) listed in the
> interleaved build order, one row, status PENDING at boot. The engine READS THIS FIRST on any revival
> (cron · compaction · rate-limit recovery), reconstructs the DAG status from the rows, and resumes at the
> first non-DONE row (`cursorFrontier()`). The commit-per-wave history (`git log`) is the second anchor.

## Legend

| status | meaning |
|--------|---------|
| **PENDING** | not started; eligible once preconds DONE + `interleaveReady` |
| **BUILDING** | a build agent is live in a `.claude/worktrees/<runId>` (worktree-isolated) |
| **PAINT-PENDING** | device-free gate GREEN + integrated; awaiting the NON-AUTHORING dual-engine paint verdict |
| **DONE** | `[H]`: device-free GREEN · `[P]`: GREEN + on-disk dual-engine capture + non-authoring PASS — committed |
| **BLOCKED** | precond regressed OR `MAX_FIX` exhausted → human escalate (TaskStop-class gate) |

**class:** `H` headless-only (device-free GREEN is the close) · `P` paint-gated (the §1 AND) · `[C]`/`[WSn]`/
`[WS12]` BH interleave class. **paint:** the dual-engine verdict `PASS(chrome+safari,L+D)` on DONE.

## Resume protocol

On boot: `hydrateCursor()` (read these rows → set every `node.status`) → `verifySiblingsIntact()` →
`seedStage0IfFresh()` (fresh boot only) → sweep the readiness frontier. The frontier = the first non-DONE
row. A stale BUILDING/PAINT-PENDING heartbeat (> agent-timeout) is a crashed build → reset PENDING +
recompose; a live heartbeat → the cron tick no-ops (never double-spawn one wave). See `engine-design.md §8`.
WAVE-DONE bar: `real-paint-protocol.md §1`. Interleave/collision: `bh-interleave-map.md §2`.

> **CAPTURE-PIPELINE KEYSTONE — PROVEN end-to-end (2026-06-29, before fan-out).** The dual-engine
> `?capture=` harness is validated on a real wave route (BG.W-FIELD-AURORA, `/foundations/colors`):
> Chrome (CDP, real `ANGLE Metal Renderer: Apple M5 Max`) + WebKit (off-screen WKWebView, `Apple GPU`,
> no-TCC) both capture FULL route content + the in-pixel engine badge, BOTH modes, all 2880×1800
> (retina-2×), badge engine field discriminates CHROME vs WEBKIT. The C-SAFARI chronic (blank WebKit
> bare-shell) does NOT reproduce. Working method + 4 PNGs:
> `docs/tranches/BG/audit/visual/pipeline-validation-field-aurora/PIPELINE-VALIDATION-DELTA.md`.
> chromeOk=true · safariOk=true. (BG.W-FIELD-AURORA's own W-REFLECT3 gestalt re-paint stays owed — this
> validates the INSTRUMENT, not the wave's per-surface verdict.)

---

## PHASE 0 — STAGE-0 ground-freeze (WS7 Band-0/Band-2, builds FIRST; tag-blocker live from here)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 0.1 | BG.W-PAINT-IS-THE-GATE | BG/WS7 | P | DONE | proof:ba-gestalt (decoder ext, born-RED Metal) | 7fa3156b · device-free GREEN (14-bite self-test, G8 clean) · 18 born-RED Metal PNGs on disk (12 Chrome-M5-Metal + 6 real-WebKit-26) · ORCHESTRATOR DONE-override: the judge certified the paint FAIL is the BY-DESIGN born-RED anchor + 0.2-roster/0.3-demo:dist absence, NOT a 0.1 defect (defects routed to WS1/WS3 fix waves). Ground-freeze deliverable MET. |
| 0.2 | BG.W-GESTALT-ROSTER-RE-POINT | BG/WS7 | H | DONE | surface-closure routeSeeds | 84de6592 · route-resolution arm GREEN (15 tokens→14 seeds, 0 HARD-RED, every /cat/story resolves) · 16-bite self-test (incl. /dock/typoo-RED + prose-GREEN) · 10-surface roster + per-surface freshness .md wired · operative gestalt verdicts born-RED by design (flipped by a paint/reflect wave) |
| 0.3 | BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION | BG/WS7 | H | DONE | proof:ship-attestation ["ci","release"] | 517548e5 · device-free mechanism GREEN (structural subprocess self-test 7/7 — valid-fresh GREENs, all 5 forgeries [stale/verdict/renderer/digest/webkit] + absent RED) · proof:close-battery-parity matchAll/RATIFIED/structural-self-test GREEN · runShip() Mac-only fail-closed + ["ci","release"] bypass-closer registered + ci.yml re-emitted (verify-ci/gen-ci-fresh GREEN) · gate BORN-RED-BY-DESIGN: sole [absent] violation = the tag-blocker, flips GREEN when `release.sh --run ship` (Arm-A) commits a fresh Metal attestation |
| 0.4 | BG.W-DEFERRED-LEDGER | BG/WS7 | H | DONE | proof:bg-deferred-ledger (9-bite) GREEN | 3fce612a |
| 0.5 | BG.W-BE-BF-LEDGER | BG/WS7 | H | DONE | proof:be-bf-ledger GREEN | 6105ed6f |
| 0.6 | BG.W-DISPOSITION-RESTAMP | BG/WS7 | H | DONE | proof:disposition-live (n:2 re-eval) | 002e9d32 · proof:disposition-live GREEN — 31 rows re-stamped BG (n:2 re-eval), 0 open/0 stale pendings, re-stamp-discharge clause + 4-bite self-test · 6 resolved:true (css-relative-color→BB.W-DARK-INK-WARM, styles-critical-split→BC.W-CSS-CRITICAL discharged; completion-seal/drawer-content-spring flipped) · 0 phantom destinations |

## PHASE 1 — BH concurrent-safe [C] (run now, dodges BG's write-set)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 1.1 | BH.B0 W0-scratch-sweep | BH/B0 | C | DONE | git-hygiene | 7a138008 · proof:git-hygiene GREEN (H1 test-results untracked · H2 dead .browserslistrc gone · H3 gitignore scratch guards · H4 env-driven commit-hook · H5 BD doc re-homed · 5 self-test bites) · proof:gate-script-parity GREEN (bijection intact) |
| 1.2 | BH.B1 W1-external-payload | BH/B1 | C | DONE | proof:external-payload (E1/E2 + 3-bite) | 7813a695 · proof:external-payload GREEN (E1 every src JS-imported peer ∈ libraryExternal · E2 no dead string · 3/3 self-test bites GREEN) · @lucide/vue externalized (39 src imports), dead lucide-vue-next/vaul-vue strings removed (no alias), leading doc-comment added · OWED-ARM DISCHARGED 141e4de7 · profile:budget GREEN (exit 0 over the fresh integrated dist): the build-side externalization MIRROR landed in scripts/profile-bundle.mjs (BUNDLED_PEER_MARKERS scans dist .js for the inlined createLucideIcon factory/chunk → folds into anyBudgetExceeded; always-run planted-marker self-test; 189 chunks scanned, bundled peers none ✓, self-test ok ✓) + the docs/tranches/AP/W4-bundle-profile.baseline.json downward-rebaseline committed (lucide-external shrink, negative drift, no ceiling red). OPTIONAL gates.mjs canon-sync note SKIPPED (non-blocking — the proof:external-payload note already names the build-side mirror as profile:budget's arm) |
| 1.3 | BH.B1 W2-value-destraddle | BH/B1 | C | DONE | proof:peer-conformance (typecheck 9 sites) | 0d6b9f8a · proof:peer-conformance GREEN — value.js peer + devDep destraddled `^0.13.0 \|\| ^1.0.0` → single clean `^1.0.0` (admits registry-latest 1.1.1, contains kf transitive `^1.2.0`, singleton-identity holds); new valueDestraddleViolations predicate + 4-bite self-test (all straddles flag, clean ^1.x green) born-RED→GREEN |
| 1.4 | BH.B1 W3-dragmorph-snap-excise | BH/B1 | C | DONE | proof:drag-morph (kf 5.1.0 snap) | ba23c086 · proof:drag-morph GREEN (D1-D5 all YES; both self-test bites have teeth — D5 + the new D3 snap-excise) · useDragMorph re-roll EXCISED (decayRest import + commitSnapOnRelease + spring.target gone) → native kf 5.1.0 DragOptions.snap wired (snap:number[] confirmed in installed dist) · useVizChoreography Oscillator/4.3.0 stale comments cleared |
| 1.5 | BH.B2.0 W-alias-codemod | BH/B2 | C | DONE | typecheck (no semantic delta) | ca988a76 · proof:alias-codemod GREEN — 3-plane `@glass` alias wired (tsconfig paths + vite + vitest resolve.alias), 719 deep-relative `(../)+src/` specifiers codemodded → `@glass/*` across 277 demo+tests files (0 survivors both trees), fs-path literals left relative; self-test teeth OK; gate registered local+ci+release |
| 1.6 | BH.B2.1-mech W-regen-mechanism | BH/B2 | C | DONE | proof:subpath-classify (fail-closed) | c98ac8c8 · proof:subpath-classify GREEN — harvested the 3 single-source scripts (scripts/lib/subpath-policy.mjs + proof-subpath-classify.mjs + regen-exports.mjs) from wf_997d0cce-69f-2 + WIRED the gate (npm script + gates.mjs row, ["local","ci"]). C1 real --json → exit 0 + failClosed PASS + fidelity 0-fail + EXACT_REPRODUCTION true (regen reproduces live package.json exports + typesVersions, 0 drop/add/mismatch); C2 --inject-unclassified → exit 1 (fail-closed teeth); C3 --break-fidelity → exit 1 (fidelity teeth); single-source assert libraryEntryMap()≡buildEntrySet(). typecheck exit 0 · proof:gate-script-parity GREEN (bijection intact) · siblings-intact exit 0. B2.1-swap (delete src/subpaths/, --write re-pin) stays the [WS12] post-close act |
| 1.7 | BH.B2.4a W-bh-carves (worm/bloomUp)¹ | BH/B2 | C | DONE | proof:colocation | 6daf7ef3 (orch override: byte-identical refactor-carve, zero render delta — paint deferred to WS11/WS12 carousel/pager coverage) · proof:colocation GREEN (3 carve-leaves ✓ + 4-bite self-test) — CarouselContent→useCarouselWorm, PagerDots→usePagerWorm (+constants.ts), useBloomUp→bloomUpField; all 3 hosts now ≤500 (381/433/449), no-god-module + bloom-up GREEN, typecheck exit 0. INTEGRATOR REPAIR: dropped stray `centerOf/restSize/tokenPrefix/neckGap` props the patch left on the `useCarouselWorm()` call (leaf owns them internally; the deleted SFC defs made them undefined — PagerDots hunk did this correctly, carousel hunk did not). paint π deferred (P) |
| 1.8 | BH.B4a-archive-refresh | BH/B4 | C | DONE | — | 9724960f · archived `docs/constellation/` (13) + `docs/audits/runs/2026-06-03-glass-ui-self/` (7) → `docs/archive/` via git mv (20 renames, 0 gate reads them) + `docs/archive/README.md` provenance index · refreshed `overfitting-audit.md` (standing-gate framing + current consumer roster) + `instructions/README.md` (gates.mjs register vocabulary) · style-audit dedup satisfied by archive-separation (live prompt vs dated report) · siblings-intact exit 0 |
| 1.9 | BH.B4b-skeleton | BH/B4 | C | DONE | canon-doc/design-docs resolvers | 2846bb25 · resolver seams + docs/canon skeleton + GENERATED structure.md. scripts/lib/canon-doc.mjs (CANON_HOMES map + canonDoc/readCanon/auditCanonHomes, fail-explicit — throws on unknown key + absent home strict, soft→"") · scripts/lib/design-docs.mjs (DESIGN_HOMES over the in-repo docs/design/ extraction + auditDesignHomes) · scripts/regen-structure.mjs + `gen:structure` (structure.md re-derived from disk via subpath-policy readTree — the SAME colocated-barrel glob the export regen feeds, so the 5-reader hot enumeration can't drift; --write emits, --check REDs on drift, currently FRESH 104 pkgs) · docs/canon/ README index + 9 cross-cutting topic homes (structure.md generated; 8 empty-but-present scaffolds each pointing at its CLAUDE.md source). Resolvers RAN fail-explicit GREEN (11/11 self-checks): auditDesignHomes empty (all 4 design docs present); auditCanonHomes surfaces ONLY component:instrument-chassis (the 1 README B4b-content [WS12] owns). B4b-content fills prose · B5c [WS12] re-points the ~16 CLAUDE-readers + 10 precept-readers · siblings-intact exit 0 |
| 1.10 | BH.B4c-precept-extract (files) | BH/B4 | C | DONE | proof:design-docs-files | 0ca2d3ce · proof:design-docs-files GREEN (F1 exists+non-trivial, F2 identity; self-test 4 bites GREEN) · 4 design docs extracted → docs/design/ (affordance-map · design-idioms · motion-canon · tunable-anim) |
| 1.11 | BH.B4d-evidence-prune (files) | BH/B4 | C | DONE | proof:consumer-evidence-live | 8490378b · proof:consumer-evidence-live GREEN (31 non-README docs all live: 25 gate-ref + 6 orphan-exemption · dead=0 · self-proof ok) · consumer-evidence pruned to 31; gate registered local+ci (gate-script-parity orphan resolved) · proof-component-orphan gatherOrphanInput exported |
| 1.12 | BH.B6 W-core-prompts | BH/B6 | C | DONE | proof:core-prompts (repo-local) | a9f87453 · proof:core-prompts GREEN (W1-W4 + self-test; born-RED 'robust'→'sturdy' excised) · 3 prompts + README; registered local + proof:tag-parity JUSTIFIED_LOCAL_ONLY (gate-detrap/story-language precedent) |

¹ carousel arm = the [C]×WS10 graze — land before WS10 rewrites `CarouselContent.vue` or rebase onto it.

## PHASE 2 — WS1 · Shell · Routing · Field (the SPA-paint precondition; ROUTE-TRANSITION = linchpin)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 2.1 | BG.W-ROUTE-TRANSITION | BG/WS1 | P | DONE | proof:route-confounder · proof:route-single-root | 89dc3dee · device-free GREEN. proof:route-confounder GREEN (4 confounders ABSENT — fade-slide `<Transition>` / useBloomUp-skeleton bloom / dataset.categorySwitch VT / Skeleton+route.matched branches; bare keyed `<component :is :key=route.path class=route-enter>` PRESENT; `.route-enter` + `@keyframes gl-route-enter` PRESENT; 7-bite self-test, comment-strip load-bearing). proof:route-single-root GREEN (122 routed SFCs all element-root; 7-bite incl. planted text-root). M1 bare keyed atomic swap + on-mount `.route-enter` @keyframes (transitions.css); `.scroll-build` retired wholesale (→`--story-hero-rise`; dead recipe + `--scroll-build-*` tokens deleted); M0 main.ts errorHandler + router redundant window scrollBehavior deleted (ONE `<main>` scroll-reset owner, re-axed to route.path) + P4-F `<main tabindex=-1>` focus + aria-live announce. Re-pointed proof:ba-animate W1 + proof:scroll-motion S1/S4/tokens-minted onto the `.route-enter` mechanism (both GREEN). typecheck 0 · gate-script-parity/tag-parity 0 · siblings-intact 0. **NON-AUTHORING dual-engine paint PASS (2026-06-29, BUILT bytes :5200, C18 `?capture=` harness):** Chrome (CDP, real `ANGLE Metal Renderer Apple M5 Max`) + WebKit (off-screen WKWebView, `Apple GPU` no-`Version/` Tier-1) over ALL 5 routes [/foundations/intro · /substrates/aurora · /dock/overview · /motion/scroll-vt · /compositions/hero] × light+dark = 20 PNGs, all RESOLVE ON DISK + badge-decoded provenance. 5-nav burst → a 10-nav in-SPA `pushState`+`popstate` burst: `allOneRoot:true`/`routeRootSet:[1]` (atomic swap → exactly ONE route root every settle) + the live-ctx series `[1,2,1,0,1,1,2,1,0,1]` IDENTICAL across both passes (ZERO leak, disposal verified). `main.children`=**3** not 2 (the P4-F `<p sr-only aria-live>` is a legit 3rd scaffold child added after the M1 "===2" comment; the load-bearing ONE-route-root invariant holds — reconciled in DELTA-A). `monotonic GL`: never-2 SHELL law HELD (`/substrates/aurora` `outsideMain:0` → shell `<Aurora>` STOOD DOWN), 4/5 routes ≤1; `/substrates/aurora`=2 = the aurora-STUDIO page's by-design dual instance (StoryHero ambient field + configurator-stage LIVE preview, both route-owned) — NOT a transition leak (reconciled in DELTA-B, routed to W-FIELD-AURORA for any strict studio-page budget). KEYSTONE: the Stage-0 WebKit blank-shell of the focal aurora `.route-enter` surface is CLOSED — paints FULL in both engines. Paint reads: recessive painterly aurora (no conic/oversat), calm grain, display headlines FIT envelope, near-black luminous-dark dark register. PNGs + probes: `docs/tranches/BG/audit/visual/route-transition-pipeline/rt-{chrome,safari}-{light,dark}-*.png` + `chrome-results.json` + `chrome-burst.json`; verdict `docs/tranches/BG/audit/visual/BG.W-ROUTE-TRANSITION-DELTA.md`. |
| 2.2 | BG.W-FIELD-AURORA | BG/WS1 | P | DONE | proof:no-paper-field · proof:focal-complete | 274a2a6e · device-free GREEN. proof:no-paper-field GREEN (W1 `.paper-field` recipe + `@keyframes field-cel-drift` ABSENT from paper.css · W2 field props `field`/`fieldHue`/`fieldIntensity`/`fieldStyle` ABSENT from PaperBackdrop.vue · W3 `@property --field-h-raw`/`--field-intensity` regs ABSENT from property-regs.css · W4 grain register SURVIVES (`.paper-underpaint`/`.paper-grain-overlay::after` + `--paper-grain-tooth` + PRT opacity:0 grain rule) · W5 grain-optin deferred to 2.5 · 5-bite self-test teeth). proof:focal-complete GREEN (C1 router threads `isFocalRoute`→`meta.focal` for story routes + landings · C2 SELF_STAGES_GL ⊇ the 7-route `<DockStage` grep · C3 resolver total, 22 GL-kind/120 rows · planted-bite teeth). M2: shell `<Aurora v-if=shellFieldActive>` (recessive vividness:0, explicit C≤0.07 palette, per-route warmFieldHue) replaces `<PaperBackdrop field>`; `shellFieldActive` flipped in router.afterEach off committed `meta.focal` (never-2-contexts); `data-paper-field` on the content ANCESTOR (cards.css/liquid-morph.css descendant selectors live); grain-only `<PaperBackdrop>` kept (universal, demoted in 2.5); new `demo/stories/focal.ts` (GL_BG_KINDS + SELF_STAGES_GL + isFocalRoute). Predecessors un-regressed: proof:route-confounder/route-single-root/stage/ba-animate/scroll-motion/offscreen-pause/perf-producer GREEN. typecheck 0 · gate-script-parity/tag-parity 0 · siblings 0. Awaiting NON-AUTHORING dual-engine paint (glContextCount(allocated)===1 every non-substrate route + content↔focal↔dock round-trip · recessive warm aurora NO conic/C>0.10/speckle worst-cool both modes · AA at opacityCeiling 0.5 · Chrome+Safari). **RE-PAINT FIX (b3d65eec, 2026-06-29 — the WS1 paint FAIL [BG.W-FIELD-AURORA-DELTA.md] closed; stays PAINT-PENDING, re-paint owed):** the FAIL was the dark-mode AA leg — the single light palette (L0.90-0.94) at opacityCeiling 0.5 composited over the near-black dark page to a mid-light warm-brown wash (L 0.55-0.70), dropping hero h1 to 2.14:1 + muted to 1.04:1 (CATASTROPHIC, both engines). FIX: `shellAuroraConfigDark(hue)` — the W-DARK-MATERIAL luminous-dark twin (low-L warm-ember palette L0.17-0.25, warm hue, chroma KEPT C0.045-0.07, vividness:0) wired via `useGlobalDark` in AppShell, so over the dark page the field GLOWS warm-ember but composites to L~0.13 at the KEPT opacityCeiling 0.5 (proof:field-accent-reconcile W4 intact, no gate edit). LIGHT palette lifted L0.94-0.96 + the light chrome-header muted ink darkened a touch over the bright field (story-hero.css, LIGHT + over-shell-field ONLY) so the secondary 3.85:1 eyebrow/blurb clears. **Self-check (C18 `?capture=` harness, real-Metal Chrome CDP + off-screen WebKit, /foundations/colors):** DARK hero h1 10.66:1 (Chrome) / 12.19:1 (Safari), muted 5.17 / 5.92 (was 2.14 / 1.04); LIGHT eyebrow/blurb 5.82-5.84 (Chrome) (was 3.85). proof:no-paper-field/focal-complete/field-accent-reconcile/no-gray/dark-material/glass-cal/stage GREEN; typecheck 0; siblings 0. **NON-AUTHORING dual-engine paint PASS (2026-06-29, BUILT bytes :5200, C18 `?capture=` harness, HEAD cb8ecdfc):** Chrome (CDP, real `ANGLE Metal Renderer Apple M5 Max`) + WebKit (off-screen WKWebView, `Apple GPU`) over ALL 4 routes [/foundations/colors · /foundations/intro · /substrates/aurora · /dock/overview] × light+dark = 16 PNGs, all RESOLVE ON DISK (2880×1800 sips-verified) + badge-decoded provenance. **One-GL law HELD:** glLive===1 on every non-substrate route (colors/intro/dock — dock has 2 canvas elements but 1 GL context, DockStage=the 1, shell stood down); /substrates/aurora=2 page-owned (studio field + config-stage preview) = EXEMPT non-substrate qualifier. content↔focal↔dock SPA round-trip 1→2→0*→1 returns to baseline, ZERO leak (the 0* dock transient = lazy DockStage webgpu arm not yet fired at the 1100ms SPA sample; direct full-load dock=1). main.children=3 (sr-only aria-live + scroll-progress + article; route root child[0], DELTA-A reconciled). **Recessive warm shell field (binding subject, /foundations/colors):** C 0.015-0.046 (≪0.10), warm hue 47-85°, NO conic/oversaturation/speckle, both modes both engines; dark field now LUMINOUS-DARK warm-ember L0.16-0.22 (NOT the prior brown wash L0.55-0.70). **AA at opacityCeiling 0.5 (the prior FAIL leg, FIXED+cross-engine-verified):** dark hero h1 13.87 (Chrome)/14.68 (Safari), dark muted 6.73/7.14 (was 2.14/1.04 CATASTROPHIC); light h1 13.37/15.49, light eyebrow 4.15 (Chrome ≈AA)/4.80 (Safari ✓). Focal heroes (intro/substrate) read+fit envelope over by-design vivid painterly fields (no conic/speckle); dock pills read as glass over the calm DockStage field, both modes both engines. **REFINEMENT NOTE (non-blocking):** the light hero eyebrow `.section-label` mono caption is the dimmest secondary element (4.15:1 Chrome over the light shell field; Safari 4.80) — reads visually + clears the caption register, a future polish note, not a wave-blocking AA failure. PNGs: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint/{chrome,safari}-<route>-<mode>.png`; probes `chrome-results.json`/`pixel-analysis.json`; verdict `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-DELTA.md`. |
| 2.3 | BG.W-SCROLL-PROGRESS-RAIL | BG/WS1 | P | DONE | proof:ba-animate re-point | c6f44d95 · device-free GREEN. proof:ba-animate 8/8 (W2 RE-POINTED off the retired `--scroll-progress-scroller`+named-timeline onto: recipe hoists `transform: scaleX(0)` UNCONDITIONAL + FULL-value `var(--scroll-progress-timeline, scroll(nearest block))`; demo bar binds `--scroll-progress-timeline: scroll(nearest block)`; GLOBAL comment-blind scan over src/styles+demo finds ZERO invalid `scroll(var(...))`/`scroll(--ident)` fragments — the HEAD D5 defect that computed animation-timeline→auto→scaleX(1) full-width). 4-bite `--self-test` (fragment detector flags `scroll(var(`/`scroll(--`, passes the full-value-var + valid-keyword forms). M4: scaleX(0) hoisted outside the @media/@supports gate (invisible rest); `--scroll-progress-scroller` RETIRED (scroll-tokens.css) clean break; scroll-vt.vue → named `--sp` timeline + `timeline-scope` cross-element pattern; `opacity:0.85` rest dropped; dead `scroll-timeline-name: --demo-main-progress` removed. Predecessors un-regressed: proof:scroll-motion/dropdown-fix/animation-coherence/motion-presets/motion-demo/fading-scroll GREEN. typecheck 0 · gate-script-parity/tag-parity 0 · siblings 0. PAINT PASS (NON-AUTHORING dual-engine, BUILT dist :5200, 2026-06-29): COMPUTED animationTimeline computes `scroll()`/`--sp` (NOT auto — D5 defect absent; served CSS carries 0 `scroll(var(` fragments) · scaleX(0) at scroll-top (bbox 0px) every route · GROWS via getAnimations() ScrollTimeline currentTime 0%→45%→100% · bbox-width delta de-confounded (0→~578px at 45% while offsetWidth constant 1285px → pure scaleX) · GLOBAL rail holds scaleX(1) at exact bottom both engines · NAMED cross-element timeline-scope (`--sp` + timeline-scope, /motion/scroll-vt) verified. Chrome (ANGLE Metal M5 Max) + WebKit (system WebKit.framework, Apple GPU, no Version/ → C-SAFARI Tier-1), BOTH modes, every route. 30 capture PNGs resolve on disk. Non-blocking observation: the NAMED demo bar reverts to scaleX(0) only at the pixel-exact ct=100% in Chrome (fill-mode:none boundary; WebKit holds; global rail unaffected) — optional `fill-mode:forwards` hardening recorded, does not block. DELTA: docs/tranches/BG/audit/visual/BG.W-SCROLL-PROGRESS-RAIL-DELTA.md · captures: docs/tranches/BG/audit/visual/scroll-progress-pipeline/. |
| 2.4 | BG.W-FIELD-ACCENT-RECONCILE | BG/WS1 | H | DONE | proof:field-accent-reconcile | 825d4125 · device-free GREEN (class H — the close). proof:field-accent-reconcile 4/4: W1 hue-PARITY ε0.5° (the 13 SECTION_COLOR_OKLCH degrees == the OLD warm-field SECTION_HUE_DEG literal table, maxDelta 0.0000°), W2 single-source (aurora-hero.ts EXPORTS warmProjectHue + SECTION_COLOR_OKLCH + sectionHueDeg via cssToOklch-derived SECTION_HUE_DEG_DERIVED; warm-field.ts collapsed to a thin adapter, NO own projectWarm/SECTION_HUE_DEG/clampWarm/warmFieldHueMap), W3 2-consumer (AppShell.vue + SectionLanding.vue), W4 AA recede + luminance rewire (shellAuroraConfig vividness:0/C∈{0.06,0.07,0.05,0.04}≤0.10/L∈{0.9,0.88,0.92,0.94}≥0.85 at opacityCeiling 0.5; shell <Aurora> carries data-glass-field-canvas + useGlassBackdropLuminance auto-discovers it, backward-safe → static floor). 2-bite self-test (identity 0 / +2° shift flags). M3 LANDED: warm-field.ts −60 lines; useGlassBackdropLuminance SHELL_FIELD_CANVAS_SELECTOR auto-discovery. Un-regressed: hero-audacious/liquid-glass-material/page-redesign/substrate-staging/viz-papergrid/demo-radial-calm/single-color-core/suffuse/no-paper-field/focal-complete/stage GREEN. typecheck 0 · gate-script-parity/tag-parity 0 · siblings 0. |
| 2.5 | BG.W-PAPER-GRAIN-OPTIN | BG/WS1 | P | DONE | proof:no-paper-field (grain-survival) | 3f200f1d · device-free GREEN. proof:no-paper-field 5/5 with GRAIN_OPTIN_ACTIVE flipped → W5 ENFORCED: no universal `<PaperBackdrop>` shell mount (the bare grain plane removed from AppShell + the PaperBackdrop import dropped) AND grain tokens intact (`--paper-grain-opacity` in glass-fx.css + `--paper-grain-tooth` in paper.css). The recessive shell aurora (2.2) is the backdrop; grain is now PER-SURFACE opt-in (`paper-grain-overlay`/`<PaperBackdrop>`). Sub-JND opt-in re-tune `--paper-grain-opacity` 0.22→0.21 (barely-perceptible per-surface calibration; no gate/test asserts the value). Un-regressed: glass-cal/no-gray/route-confounder/ba-animate/focal-complete/field-accent-reconcile GREEN. typecheck 0 · gate-script-parity/tag-parity 0 · siblings 0. **NON-AUTHORING dual-engine paint PASS (2026-06-29, BUILT bytes :5200, C18 `?capture=` harness):** Chrome (CDP, real `ANGLE Metal Renderer Apple M5 Max`) + WebKit (off-screen WKWebView, `Apple GPU` @2x) over 4 routes [/foundations/intro · /foundations/paper-glass · /compositions/math-paper · /substrates/aurora] × light+dark = 16 PNGs, all RESOLVE ON DISK + badge-decoded provenance (CHROME @1x / WEBKIT @2x distinct). **No universal grain wash:** DOM `universalGrainPlanes(.paper-underpaint.fixed full-viewport)`=**0** all routes both engines; objective page-bg clean-field local std **0.011 Chrome / 0.0077 Safari** (smooth — no grain noise) vs opt-in card-grain std **0.145** (13× — grain CONTAINED to opt-in surfaces). **Opt-in tactile-but-calm:** `paper-grain-overlay` count intro 11 / paper-glass 10 / math-paper 1 / aurora 0; math-paper card paints grain+blueprint-grid legible, paper-glass 4 tier-swatches show per-tier tooth, both engines. **Recessive aurora clean field:** field std_L **0.021 Chrome / 0.011 Safari** (no conic/radial banding), mean HSL-sat **0.20** (recessive, maxima 0.61 — no oversaturation); dark = near-black luminous-dark, hero legible+fits. `--paper-grain-opacity`=0.21 light/0.16 dark, `--paper-grain-tooth` present, univ-mount=0. `mainChildren`=3 (P4-F sr-only aria-live, reconciled). PNGs: `docs/tranches/BG/audit/visual/route-transition-pipeline/pg-{chrome,safari}-{intro,paper-glass,math-paper,aurora}-{light,dark}.png` + `pg-chrome-results.json`; verdict `docs/tranches/BG/audit/visual/BG.W-PAPER-GRAIN-OPTIN-DELTA.md`. |
| 2.6 | BG.W-HERO-FIT | BG/WS1 | P | DONE | proof:hero-fit (title-source assert) | e47f31ad · device-free GREEN. proof:hero-fit MINTED born-RED→GREEN (10 violations on HEAD blobs → 0 after fix; 8-bite self-test all RED): HF1 ONE chassis title path (intro+hero carry NEITHER `:hero-title="false"` NOR a bare poster-rung `<h1 text-display-{4,5,mega,hero,audacious}>`) · HF2 StoryHero renders `displayTitle ?? title` (heroDisplayTitle computed) + exposes the `#title-ornament` slot in the <h1>, StoryPage threads `:display-title` + forwards the slot · HF3 MANDATORY short displayTitle in the manifest rows (foundations/intro→"glass-ui", compositions/hero→"Real scenes") · HF4 max-w-5xl dropped from both pages · HF5 height-aware fit-cap (`.story-hero-title[data-hero-scale]` min() carries a `100svh` short-viewport term + single-source `--story-hero-cpl`/`--story-hero-est-lines`) · HF6 auth-shell display-1 keep-fence. M5: intro.vue + compositions/hero.vue route through the chassis (retire `:hero-title="false"` + the bespoke eyebrow/h1/blurb section; provide ONLY the inline ℱ #title-ornament + the bento grid); StoryHero `heroDisplayTitle` computed renders the short wordmark in both <h1> sites; StoryPage threads displayTitle + forwards the ornament slot; story-hero.css fit-cap gains the svh height term + the cpl/est-lines tokens; manifest Story+StoryOptions gain `displayTitle`, intro/hero rows get the short title + enriched blurb. RE-POINTED (the clean break supersedes BC): proof:compositions-hero (CH1 one-h1→routes-chassis, CH4 bare-display→routes-chassis, templateBody greedy for the nested ornament template; 10 bites) + proof:hero-audacious (HA1 frontDoorMega→frontDoorRoutesChassis, HA4 titleStaysInk reads the chassis <h1>; 12 bites) — both GREEN. typecheck 0 · gate-script-parity/tag-parity 0 · siblings 0. Un-regressed: route-confounder/route-single-root/ba-animate/no-paper-field/focal-complete/stage/suffuse/page-chassis/page-hierarchy/hierarchy/demo-design/eyebrow-union/customizability-census/no-layout-animation GREEN (proof:storybook-meta m9c-shell-dogfood is a PRE-EXISTING AppShell-Card red, AppShell untouched). NON-AUTHORING dual-engine paint PASS (2026-06-29): /foundations/intro + /compositions/hero × {light,dark} × {375,768,1440,1920} × {Chrome-CDP-Metal-M5Max, WebKit-WKWebView-AppleGPU} = 32 captures, all resolve on disk, badge-provenanced. C1 hero <h1> block ≤0.62×svh (max 0.519 hero@1440); C2 font-size ≥ computed(display-4) @≥768 (h1 100.6–177.4 vs d4 70.7–86.1); C3 no hyphenation@375 (wordmark 1 line, no soft-hyphen/overflow); C4 ≥1 preview card above fold @1440×820 (intro 3, hero 2). Visual: recessive aurora (HSL-S 0.30)/constellation, calm grain, hero fits envelope both modes; Chrome↔Safari parity within rounding. Captures + DELTA: docs/tranches/BG/audit/visual/hero-fit-pipeline/ + BG.W-HERO-FIT-DELTA.md. |
| 2.7 | BG.W-VT-ROUTE-ENHANCE (deferred/optional) | BG/WS1 | P | DONE | supportsRouteTransitions() | DEFERRED-NOT-BUILT — optional VT polish, no functional gain; marked DONE to skip the build frontier (re-attempt at W-REFLECT3 with the shell-aurora `view-transition-name` exclusion under live paint, now verifiable via the C18 harness). Assessed by the 2.6 agent (e47f31ad). Preconditions met: `navigate()` + `supportsRouteTransitions()` are shipped (useViewTransition.ts); the central nav chokepoint is clean (useStoryNavigation goTo/next/prev/firstOfCategory). NOT built per the instruction's risk gate: the converged spec's load-bearing GOTCHA — exclude the PERSISTENT live shell `<Aurora>` canvas (2.2) from the VT snapshot or it double-captures + crossfade-FLASHES on EVERY navigation — is non-trivial + engine-dependent (Chrome vs Safari, live-canvas-during-VT), AND would compound with the 2.1 `.route-enter` @keyframes-on-mount entrance (double entrance). Its correctness is verifiable ONLY by live dual-engine paint (deferred to W-REFLECT3), so it cannot be confirmed device-free not to regress the already-atomic-and-correct 2.1 floor. VT is purely additive polish with downside risk + no functional gain → left PENDING (explicitly optional). Re-attempt with the shell-aurora `view-transition-name` exclusion under live paint when W-REFLECT3 runs. |

## PHASE 3 — WS3 · Glass standardization (owns the unified blur/cast/clip register; Safari Job-B = CEILING)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 3.1 | BG.W-CARTOON-INK-GAMUT | BG/WS3 | P | PAINT-PENDING (3857b33) | proof:no-gray (cartoon-ink-warm-in-gamut) GREEN | pending |
| 3.2 | BG.W-DOCK-CAST-RETIRE | BG/WS3 | H | PENDING | source-absent + in-bundle getComputedStyle | — |
| 3.3 | BG.W-GLASS-CLIP-DISCIPLINE | BG/WS3 | P | PENDING | proof:glass-clip · proof:dock-plate-clearance | — |
| 3.4 | BG.W-SAFARI-BLUR-LITERAL | BG/WS3 | P | PENDING | webkit literal-blur value-correctness | — |
| 3.5 | BG.W-GLASS-TINT-UNIFY (M5a→M5 phased) | BG/WS3 | P | PENDING | proof:glass-foundation A1 | — |
| 3.6 | BG.W-GLASS-BLUR-PEER | BG/WS3 | P | PAINT-PENDING (cd9ce46; live-π spec sync 353eac5d) | proof:glass-cal (8px peer lock) GREEN | pending |
| 3.7 | BG.W-GLASS-IDIOM-FACTOR | BG/WS3 | H | DONE (6ec81de) | proof:glass-idiom-factor GREEN | n/a (H) |
| 3.8 | BG.W-GLASS-CONSUMER-BAND | BG/WS3 | P | PENDING | computed-style + 3 sign-offs | — |
| 3.9 | BG.W-DOCK-LEGIBILITY-RECAL | BG/WS3 | P | PENDING | proof:no-gray dock witnesses | — |
| 3.10 | BG.W-GLASS-DYNAMICS | BG/WS3 | P | PENDING | read-carrier paint sign-off | — |
| 3.11 | BG.W-DEMO-STYLE-REHOME | BG/WS3 | H | PENDING | net-neutral (rehome liquid-morph.css) | — |

## PHASE 4 — WS2 · Dock convergence (consumes WS3 blur peer + WS1 swap; MORPH-UNIFY produces useDockSpring)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 4.1 | BG.W-DOCK-MORPH-UNIFY | BG/WS2 | H | PENDING | proof:dock-orchestrator-single (1 SpringProgress) | — |
| 4.2 | BG.W-DOCK-BUSY-SINGLE | BG/WS2 | H | PENDING | grep-single busy-signal | — |
| 4.3 | BG.W-DOCK-CUT | BG/WS2 | H | PENDING | proof:dock-context delete (AFTER WS6) | — |
| 4.4 | BG.W-DOCK-DECOMPOSE | BG/WS2 | H | PENDING | RATCHET drain + colocation | — |
| 4.5 | BG.W-DOCK-FISSION-WIRE | BG/WS2 | P | PENDING | proof:dock-fission re-point | — |
| 4.6 | BG.W-DOCK-PERSISTENT-CUT | BG/WS2 | H | PENDING | source-absent (ℱ brand + Fourier egg) | — |
| 4.7 | BG.W-DOCK-CAP-SCROLLS | BG/WS2 | P | PENDING | proof:dock-plate-clearance (geometric guard) | — |
| 4.8 | BG.W-DOCK-OVERFLOW-FADE | BG/WS2 | P | PENDING | useFadingScroll soft-edge | — |
| 4.9 | BG.W-SHELL-DOCK-DRY | BG/WS2 | P | PENDING | P1 landing-semantics build-proof | — |
| 4.10 | BG.W-DOCK-INPLACE-MORPH | BG/WS2 | P | PENDING | proof:dock-morph-insitu M2/M4 | — |
| 4.11 | BG.W-DOCK-STORY-MODULARIZE | BG/WS2 | H | PENDING | thin demo-side carve (deferrable) | — |

## PHASE 5 — BH [WS2] (after allDone(WS2))

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 5.1 | BH.B2.5 W-dock-leaf-verify | BH/B2 | WS2 | PENDING | verify-only (GlassDock/fission carved) | — |
| 5.2 | BH.B4c-extraction (precept design-docs) | BH/B4 | WS2 | PENDING | DOCK_SPRING 0.68/0.64 not stale | — |

## PHASE 6 — WS5 · Viz refinement (precedes WS4 canvas carves; Wave 3+7 atomic gate edit)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 6.1 | BG.W-VIZ-INTRINSIC-SIZE | BG/WS5 | P | PENDING | backing==round(gBCR×dpr) | — |
| 6.2 | BG.W-VIZ-SIZER-ADOPT-HARD | BG/WS5 | P | PENDING | proof:viz-resize-upload-only | — |
| 6.3 | BG.W-VIZ-DEMIGRATE | BG/WS5 | P | PENDING | no createGpuSubstrate/.wgsl; budget DOWN | — |
| 6.4 | BG.W-VIZ-REVEAL-BLOOM | BG/WS5 | P | PENDING | useVizChoreography DEFINITION-ABSENT | — |
| 6.5 | BG.W-VIZ-PREVIEW-LIVE | BG/WS5 | P | PENDING | per-card pixel-hash differs | — |
| 6.6 | BG.W-DOTFLOW-REBUILD | BG/WS5 | P | PENDING | reference flowing dot-wave read | — |
| 6.7 | BG.W-VIZ-SUBSTRATE-DELETE | BG/WS5 | P | PENDING | proof:gpu-substrate-single co-revert | — |
| 6.8 | BG.W-GOODOT-SETUP-SPLIT | BG/WS5 | H | PENDING | M1-adopted setup shape | — |
| 6.9 | BG.W-BLOB-KINEMATICS-LEAF | BG/WS5 | H | PENDING | useBlobSatellites kinematics leaf | — |
| 6.b1 | BG.W-VIZ-SUBSTRATE-DELETE2 (booked) | BG/WS5 | — | PENDING | per-viz arm-probe gated | — |
| 6.b2 | createFragmentGLPass (booked) | BG/WS5 | — | PENDING | ≥3-consumer trigger | — |

## PHASE 7 — BH [WS5] (after allDone(WS5))

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 7.1 | BH.B2.4c W-leaf-verify-ws5 | BH/B2 | WS5 | PENDING | verify blob/goo-dot leaves | — |

## PHASE 8 — WS6 · Siri capabilities (gated behind WS2 useDockSpring)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 8.1 | BG.W-GLASS-BLUR-ENGAGE | BG/WS6 | P | PENDING | proof:glass-blur-engage (E1–E5) | — |
| 8.2 | BG.W-SIRI-ISLAND | BG/WS6 | P | PENDING | proof:siri-island (composes useDockSpring) | — |
| 8.3 | BG.W-SIRI-WAVEFORM | BG/WS6 | P | PENDING | proof:siri-waveform · proof:teal-navy-purge | — |
| 8.4 | BG.W-SIRI-DOCK-INTEGRATION | BG/WS6 | P | PENDING | proof:siri-dock-integration (box-inviolate) | — |

## PHASE 9 — BH [WS3] (B5a unblocks after allDone(WS3))

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 9.1 | BH.B5a-deps-currency (split vite.style-assets.ts) | BH/B5 | WS3 | PENDING | deps/shadcn-vue verdict in docs/canon | — |

## PHASE 10 — WS4 · Components · Demo · Encapsulation (HARD-dep WS1; carves AFTER WS5; W0 precedes WS10)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 10.1 | BG.W-SCROLL-SHRINK-UNIFY | BG/WS4 | P | PENDING | proof:css-critical · proof:no-layout-animation | — |
| 10.2 | BG.W-SHEET-INSET-ROOT | BG/WS4 | P | PENDING | proof:emission (overlay-band inverse) | — |
| 10.3 | BG.W-SPECIMEN-PER-STORY | BG/WS4 | P | PENDING | proof:bento-specimen | — |
| 10.4 | BG.W-BENTO-FRONTDOOR-UNFORK | BG/WS4 | H | PENDING | glyph-fork delete | — |
| 10.5 | BG.W-DEAD-COMPOSABLE-CUT | BG/WS4 | H | PENDING | grep-gated + MIGRATION row | — |
| 10.6 | BG.W-FLIP-ONE | BG/WS4 | H | PENDING | proof:flip-one (HOLLOW falsifier) | — |
| 10.7 | BG.W-PRESS-MOUNT-RECONCILE | BG/WS4 | H | PENDING | useSpringMount onto shared runner | — |
| 10.8 | BG.W-SPRING-REGISTER-TIDY | BG/WS4 | H | PENDING | proof:spring-tokens-synced | — |
| 10.9 | BG.W-SCROLL-READER-UNIFY | BG/WS4 | H | PENDING | scrollReader.ts fold | — |
| 10.10 | BG.W-LIQUID-ENTRANCE-GENERAL | BG/WS4 | P | PENDING | liquid-enter wired onto mount surfaces | — |
| 10.11 | BG.W-COLOCATION-GATE-STRUCTURAL | BG/WS4 | H | PENDING | proof:colocation (3 moves, over-pull zero) | — |
| 10.12 | BG.W-CANVAS-LIFECYCLE-LEAVES | BG/WS4 | H | PENDING | carve (re-measure POST-WS5) | — |
| 10.13 | BG.W-AMBIENT-HISTOGRAM-LEAF | BG/WS4 | H | PENDING | proof:single-color-core follows leaf | — |
| 10.14 | BG.W-TABS-KEYBOARD-LEAF | BG/WS4 | H | PENDING | 44px floor preserved | — |
| 10.15 | BG.W-GOO-BARBELL-CSS | BG/WS4 | P | PENDING | byte-identical paint (Safari floors) | — |
| 10.16 | BG.W-TIMELINE-ENCAPSULATE | BG/WS4 | H | PENDING | colocation + allowlisted legs inline | — |
| 10.17 | BG.W-SFC-CSS-PARTIAL-SWEEP | BG/WS4 | H | PENDING | [data-size] inline KEPT | — |
| 10.18 | BG.W-UNIFORM-LAYOUT-BUILDER | BG/WS4 | H | PENDING | carve (re-measure POST-WS5) | — |
| 10.19 | BG.W-CHIP-ALIAS-KILL | BG/WS4 | H | PENDING | alias delete + MIGRATION (atomic) | — |
| 10.20 | BG.W-DEAD-TOKEN-SWEEP | BG/WS4 | H | PENDING | proof:squircle-language negative guard | — |
| 10.21 | BG.W-DEMO-CHASSIS-CONSOLIDATE | BG/WS4 | H | PENDING | zero-importer delete + fold | — |
| 10.22 | BG.W-MANIFEST-COLOCATE | BG/WS4 | H | PENDING | 4 string-maps → s() row | — |
| 10.23 | BG.W-DESHADCN-SWEEP (W0 — WS10 precondition) | BG/WS4 | P | PENDING | proof:de-shadcn (HEAD-mode) | — |
| 10.24 | BG.W-12-LAWS-UNIVERSAL | BG/WS4 | P | PENDING | liquid-weight on all restored motion | — |
| 10.25 | BG.W-CATEGORY-CARD-WARM (USER-REPORTED 2026-06-29) | BG/WS4 | P | DONE | proof:category-card-warm | 9e13965d · device-free GREEN. proof:category-card-warm 4/4 (W1 bento warm field present — `.section-bento::before` `oklch()`-radial keyed off `--bento-field-h` · W2 dark warm-EMBER arm — `.dark .section-bento::before` low-L L<0.5 + chroma kept on every stop · W3 NO flat/gray backdrop — warm-clamped `clamp(25,…,95)` + every light+dark stop carries chroma · W4 the card transmits warm — `--bento-field-h-raw` bind off the ONE `warmFieldHue` source + `SectionPreviewCard` `glass-resting` plate) + 9-bite --self-test teeth. M1: SectionLanding bento carries a recessive WARM AMBIENT FIELD behind the cards (a static warm CSS radial — NO live GL, one-GL-per-route held): amber-key + terracotta-mid over a warm floor, PLAIN `.dark` warm-ember arm (low-L, chroma kept — luminous-dark glow, never charcoal), PRT warm-solid floor; the glass-resting cards composite WARM. SectionLanding.vue added to proof:demo-radial-calm's contained-surface KEEP allowlist (a contained card-grid wash, not a `--section-color-*` hero). Un-regressed: demo-radial-calm/no-gray/dark-material/glass-cal/stage/field-accent-reconcile GREEN. typecheck 0 · siblings 0. **Self-check (C18 `?capture=` harness, BUILT :5200, real-Metal Chrome CDP + off-screen WebKit, /forms + /data both modes):** card plates read WARM (Chrome dark h35-47° C0.026-0.05; light h59-60° C0.021-0.029; Safari dark h48° / light h56° — warm material above the gray floor, ZERO cool/metallic sheen), white card titles 8.26:1; the visible bento field + card edges + preview windows are clearly warm peach/terracotta. **PAINT-DONE (NON-AUTHORING dual-engine PASS 2026-06-29):** Chrome (ANGLE Metal, Apple M5 Max) + Safari (WEBKIT, Apple GPU), BOTH modes, /forms + /display + /data — all 12 captures 2880×1800 resolve on disk. Card-plate grain warm-above-floor in EVERY config (H 47–80°, C 0.0189–0.0287 = 2.4–3.6× the 0.008 gray floor, warm R>G>B signature — ZERO cool/neutral metallic); bento field warm by token (light oklch L0.91 / dark ember L0.4 chroma-kept); titles AA worst 8.28:1 (all clear AAA too); one-GL-per-route held (1 recessive shell aurora); grain calm (9% rel std); no conic/oversaturation; hero fits envelope. DELTA: docs/tranches/BG/audit/visual/BG.W-CATEGORY-CARD-WARM-DELTA.md + chrome-/safari-{forms,display,data}-{light,dark}.png. |

## PHASE 11 — BH [WS4] (after allDone(WS4); B3 demo restructure)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 11.1 | BH.B2.4b W-leaf-verify-ws4 | BH/B2 | WS4 | PENDING | verify canvas/tabs/luma leaves | — |
| 11.2 | BH.B3 δ1-code-fold-consume | BH/B3 | WS4 | PENDING | CodeBlock→Code fold consumed | — |
| 11.3 | BH.B3 δ2-dock-layers-shell | BH/B3 | WS4 | PENDING | dissolve demo/composables/ | — |
| 11.4 | BH.B3 δ3/δ4-chassis-colocation | BH/B3 | WS4 | PENDING | flat roots → chassis/ | — |
| 11.5 | BH.B3 δ5/δ6-manifest-carve+glob | BH/B3 | WS4 | PENDING | glob ./*/*/index.vue same wave | — |
| 11.6 | BH.B3 δ-stories-smoke-repoint | BH/B3 | WS4 | PENDING | every row resolves | — |

## PHASE 12 — WS7 · close-machine bands 1–4 (gates + census BUILDs; the cut is Band-5 LAST)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 12.1 | BG.W-SPIKE-DELETE | BG/WS7 | H | PENDING | atomic file+gate+ratchet | — |
| 12.2 | BG.W-JUBILANCE-DECIDE | BG/WS7 | H | PENDING | real-grep adjudicated | — |
| 12.3 | BG.W-DEAD-GATE-SWEEP | BG/WS7 | H | PENDING | F6 gate→symbol by IMPORT | — |
| 12.4 | BG.W-GATE-ROUTING-LIVE | BG/WS7 | H | PENDING | proof:route-navigates ["ci","release"] | — |
| 12.5 | BG.W-GATE-FIELD-AURORA | BG/WS7 | H | PENDING | proof:field-aurora (3-stack born-RED) | — |
| 12.6 | BG.W-GATE-PREVIEWS-RENDER | BG/WS7 | P | PENDING | /substrates live-preview render | — |
| 12.7 | BG.W-GATE-UNIFORM-BLUR | BG/WS7 | H | PENDING | cross-surface uniform-blur peer | — |
| 12.8 | BG.W-SAFARI-PARITY-GATE | BG/WS7 | H/P | PENDING | proof:safari-parity (RED-on-broken url()) | — |
| 12.9 | BG.W-CONSTRAINT-MANIFEST | BG/WS7 | H | PENDING | proof:constraint-manifest | — |
| 12.10 | BG.W-DATE-CALENDAR | BG/WS7 | P | PENDING | reka-ui BUILD (FOLD-LEDGER row) | — |
| 12.11 | BG.W-CHART-FAMILY | BG/WS7 | P | PENDING | token-SVG BUILD (FOLD-LEDGER row) | — |
| 12.12 | BG.W-DS-COMPLETE | BG/WS7 | H | PENDING | DS-COMPLETENESS-census | — |

## PHASE 13 — WS8 · Glass-deep apotheosis (WS1 shell-aurora gated; C-SAFARI ★★★)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 13.1 | BG.W-GLASS-SUFFUSE-UNIVERSAL | BG/WS8 | P | PENDING | proof:glass-specular-angle + 3-gate retire | — |
| 13.2 | BG.W-GLASS-REFRACT-WEBGL | BG/WS8 | P | PENDING | M6 WGSL-shape gate (1 wrapper/5 sites) | — |
| 13.3 | BG.W-GLASS-BACKDROP-SAMPLE (keystone) | BG/WS8 | P | PENDING | W-BACKDROP-SAMPLE-FOUNDATION.json | — |
| 13.4 | BG.W-GLASS-SOTA-LADDER | BG/WS8 | H | PENDING | §3.1 retire matrix + DEFINITION-ABSENT | — |
| 13.5 | BG.W-GLASS-LIQUID-TRANSITION | BG/WS8 | P | PENDING | GL uniform reads press.value | — |

## PHASE 14 — WS9 · Paper-deep (GU-1 key token FIRST)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 14.0 | GU-1 token (--glass-key-direction, value-only) | BG/WS9 | H | PENDING | additive/value-only | — |
| 14.1 | BG.W-PAPER-GRAIN-REAL | BG/WS9 | P | PENDING | proof:paper-grain (warm-hue floor + azimuth==token) | — |
| 14.2 | BG.W-PAPER-SUFFUSE | BG/WS9 | P | PENDING | proof:paper-grain suffuse arm | — |
| 14.3 | BG.W-HANDMARK-PERFECT | BG/WS9 | P | PENDING | proof:handmark + proof:handmark-audit | — |
| 14.4 | BG.W-PENCIL-BOIL-DEEPEN | BG/WS9 | P | PENDING | proof:handmark boil-park arm | — |
| 14.5 | BG.W-PAPER-CROSSREPO-ASKS | BG/WS9 | H | PENDING | proof:crossrepo-asks-paper | — |

## PHASE 15 — WS10 · De-shadcn / idiomatic Tailwind v4 (strictly AFTER WS4 W0; rebase onto WS3-M5)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 15.1 | BG.W-DESHADCN-CENSUS | BG/WS10 | H | PENDING | proof:no-shadcn-default (233-file sweep) | — |
| 15.2 | BG.W-DESHADCN-TOKEN-REPLACE | BG/WS10 | P | PENDING | affected-gate suite + --focus-ring-color | — |
| 15.3 | BG.W-TAILWIND4-IDIOM | BG/WS10 | H | PENDING | proof:tailwind-v4-idiom clause-(d) | — |
| 15.4 | BG.W-DESHADCN-MATERIAL | BG/WS10 | P | PENDING | deshadcn-select-grouped (real-Safari-dark) | — |
| 15.5 | BG.W-DESHADCN-GATE | BG/WS10 | P | PENDING | lock + webkit-deshadcn project + 4 π | — |

## PHASE 16 — WS11 · Storybook facility (HARD-gates on the WS1+WS4 integration branch)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 16.1 | BG.W-SCROLL-PROGRESS-GLASSY | BG/WS11 | P | PENDING | railHealth() (grew-killer) chromium+webkit | — |
| 16.2 | BG.W-SECTION-TYPEWRITER-FADEUP | BG/WS11 | P | PENDING | getAnimations()-per-node congruence | — |
| 16.3 | BG.W-STORY-PAGE-API | BG/WS11 | H/P | PENDING | proof:story-page-api (AST single-root oracle) | — |
| 16.4 | BG.W-STORYBOOK-SUFFUSE | BG/WS11 | P | PENDING | proof:suffuse d1–d3 | — |

## PHASE 17 — WS12 · Coherence · Congruence capstone (LAST; the 480-capture dual-engine verdict)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 17.1 | BG.W-COHERENCE-CENSUS | BG/WS12 | H | PENDING | WS12-CENSUS.md (every arm re-validated) | — |
| 17.2 | BG.W-COHERENCE-GATE | BG/WS12 | H | PENDING | proof:hue-at-l · proof:coherence-census | — |
| 17.3 | BG.W-DESIGN-LANGUAGE-UNIFY | BG/WS12 | P | PENDING | busy-aurora forward criterion | — |
| 17.4 | BG.W-ANIMATION-CONGRUENCE | BG/WS12 | P | PENDING | proof:motion-one-clock (A9 lock) | — |
| 17.5 | BG.W-GLASS-PAPER-CONGRUENCE | BG/WS12 | H→ci | PENDING | A6 --glass-key-* spine (born-RED→ci) | — |
| 17.6 | BG.W-PAGE-COMPONENT-AUDIT | BG/WS12 | P | PENDING | 480-capture dual-engine both-modes verdict | — |

## PHASE 18 — BH [WS12] (after full BG close; intra-edges B2.1-mech→swap · B2.2→B7 · B5b→B5c)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 18.1 | BH.B2.1-swap W-regen-swap (delete src/subpaths/) | BH/B2 | WS12 | PENDING | proof:subpath-enumeration (landed surface) | — |
| 18.2 | BH.B2.2 W-api-fold (drop ./api, 203 re-home) | BH/B2 | WS12 | PENDING | public-surface.spec map arm | — |
| 18.3 | BH.B2.3 W-curated-relocate (src/entries/) | BH/B2 | WS12 | PENDING | key-preserving | — |
| 18.4 | BH.B2.6 W-styles-colocation | BH/B2 | WS12 | PENDING | diff -r dist/styles_before _after EMPTY | — |
| 18.5 | BH.B4b-content (contract prose → docs/canon) | BH/B4 | WS12 | PENDING | per-contract live gate at new home | — |
| 18.6 | BH.B4c-gate-repoints (10 precept-readers) | BH/B4 | WS12 | PENDING | design-docs.mjs re-points | — |
| 18.7 | BH.B4d-evidence-prune (registration) | BH/B4 | WS12 | PENDING | proof:consumer-evidence-live | — |
| 18.8 | BH.B4e-doc-slim (MIGRATION 5.0.0 ask-map) | BH/B4 | WS12 | PENDING | dual-doc move w/ B5c | — |
| 18.9 | BH.B5b-gate-manifest-extract | BH/B5 | WS12 | PENDING | --list byte-identical | — |
| 18.10 | BH.B5c-gate-rehome (16 CLAUDE-readers) | BH/B5 | WS12 | PENDING | readFileSync removal (B4f enabler) | — |
| 18.11 | BH.B7 W-api-ask-roster (2 by-name asks) | BH/B7 | WS12 | PENDING | proof:crossrepo-asks green-handshake | — |

## PHASE 19 — THE CUT + the absolute-last act (user-gated tag, then CLAUDE.md delete)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 19.1 | BG.W-CUT (5.0.0 tag-fire — HALTS at human gate) | BG/WS7 | P | PENDING | --run ship + real-Safari webkit.glass/goo==pass | — |
| 19.2 | BH.B4f-claude-delete (ABSOLUTE LAST) | BH/B4 | WS12 | PENDING | rg -l 'CLAUDE\.md' scripts/proof-*.mjs == 0 | — |

> Deferred past BH: `BH.B5d-detector-kit` (164-script blast radius; closed-wave gate-census subset only).

## PHASE LX — LIVE-DEFECT FIXES (the re-spec DEFECT-LEDGER D-1/D-2/D-3 — landed direct to tranche/BG, dual-engine verified)

> The live-interaction defect-hunt verdicts (`docs/tranches/BG/audit/RESPEC/DEFECT-LEDGER.md`) landed as discrete
> fix-commits — Chrome (CDP, ANGLE Metal M5 Max) + WebKit/Safari verified. DELTAs + PNGs at
> `docs/tranches/BG/audit/visual/live-fixes/`.

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| LX.1 | BG.W-CONSTELLATION-PARALLAX-OFF (D-1; `DEFAULT_PARALLAX 0.08→0`) | BG/live-fix | P | DONE 07c6e6ec | proof:constellation-field 41/41 · viz/tokens/gen/substrate PASS · tsc 0 | PASS(chrome live-measure 58.1→5.7px; webkit JS-engine 40→0) |
| LX.2 | BG.W-PAPER-GRAIN-WARM-SUBSTRATE (D-2; demo-local warm field behind paper-grain) | BG/live-fix | P | DONE e40e5095 | proof:demo-radial-calm · no-paper-field · stage · category-card-warm · no-gray · suffuse · demo-design PASS · tsc 0 | PASS(chrome+safari, L+D; tiles C 0.009→0.02-0.045 warm) |
| LX.3 | BG.W-DOCK-COLLAPSE-DIR (D-3; `--dock-live` blend reads directional `--dock-expand-t`) | BG/live-fix | P | DONE 8947288a | proof:dock-engine (E4 tightened, reds-on-revert) · dock-morph-family · dock-arbitrary · no-layout-animation LOCKED · tsc 0 | PASS(chrome collapse 496→59 no reversal; webkit reversals=0; safari resting unregressed) |

> **LX RECORDED-NOT-FIXED (out-of-scope of the discrete regression repair):** D-2 StoryHero WASH-CARD gray-cream over the
> recessive shell aurora + `/foundations/intro` category-card header zones (the shell/field hunter's domain); D-3
> residual first-collapse-only 15px end-snap on `startCollapsed:false` docks (`dockMorphMeasure.ts` seed-staleness) +
> WS2 dock convergence rows 4.x (still UNBUILT). See the DEFECT-LEDGER for detail.

---

**Boot counts.** PENDING: all (≈110 BG active + ≈30 BH = ≈140; +2 BG booked, +1 BH deferred). BUILDING: 0 ·
PAINT-PENDING: 0 · DONE: 2 · BLOCKED: 0. Frontier = seq 0.1 `BG.W-PAINT-IS-THE-GATE` (non-authoring paint FAIL →
reset PENDING; rebuild). [batch: 0.1 PENDING (non-authoring paint FAIL) · 0.4 DONE 3fce612a · 0.5 DONE 6105ed6f]
