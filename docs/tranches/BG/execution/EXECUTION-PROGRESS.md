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
| 1.3 | BH.B1 W2-value-destraddle | BH/B1 | C | PENDING | proof:peer-conformance (typecheck 9 sites) | — |
| 1.4 | BH.B1 W3-dragmorph-snap-excise | BH/B1 | C | DONE | proof:drag-morph (kf 5.1.0 snap) | ba23c086 · proof:drag-morph GREEN (D1-D5 all YES; both self-test bites have teeth — D5 + the new D3 snap-excise) · useDragMorph re-roll EXCISED (decayRest import + commitSnapOnRelease + spring.target gone) → native kf 5.1.0 DragOptions.snap wired (snap:number[] confirmed in installed dist) · useVizChoreography Oscillator/4.3.0 stale comments cleared |
| 1.5 | BH.B2.0 W-alias-codemod | BH/B2 | C | PENDING | typecheck (no semantic delta) | — |
| 1.6 | BH.B2.1-mech W-regen-mechanism | BH/B2 | C | PENDING | proof:subpath-classify (fail-closed) | — |
| 1.7 | BH.B2.4a W-bh-carves (worm/bloomUp)¹ | BH/B2 | C | PENDING | proof:colocation | P |
| 1.8 | BH.B4a-archive-refresh | BH/B4 | C | PENDING | — | — |
| 1.9 | BH.B4b-skeleton | BH/B4 | C | PENDING | canon-doc/design-docs resolvers | — |
| 1.10 | BH.B4c-precept-extract (files) | BH/B4 | C | PENDING | — | — |
| 1.11 | BH.B4d-evidence-prune (files) | BH/B4 | C | PENDING | — | — |
| 1.12 | BH.B6 W-core-prompts | BH/B6 | C | PENDING | repo-local | — |

¹ carousel arm = the [C]×WS10 graze — land before WS10 rewrites `CarouselContent.vue` or rebase onto it.

## PHASE 2 — WS1 · Shell · Routing · Field (the SPA-paint precondition; ROUTE-TRANSITION = linchpin)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 2.1 | BG.W-ROUTE-TRANSITION | BG/WS1 | P | PENDING | proof:route-confounder · proof:route-single-root | — |
| 2.2 | BG.W-FIELD-AURORA | BG/WS1 | P | PENDING | proof:no-paper-field · proof:focal-complete | — |
| 2.3 | BG.W-SCROLL-PROGRESS-RAIL | BG/WS1 | P | PENDING | proof:ba-animate re-point | — |
| 2.4 | BG.W-FIELD-ACCENT-RECONCILE | BG/WS1 | H | PENDING | proof:field-accent-reconcile | — |
| 2.5 | BG.W-PAPER-GRAIN-OPTIN | BG/WS1 | P | PENDING | proof:no-paper-field (grain-survival) | — |
| 2.6 | BG.W-HERO-FIT | BG/WS1 | P | PENDING | title-source assert | — |
| 2.7 | BG.W-VT-ROUTE-ENHANCE (deferred/optional) | BG/WS1 | P | PENDING | supportsRouteTransitions() | — |

## PHASE 3 — WS3 · Glass standardization (owns the unified blur/cast/clip register; Safari Job-B = CEILING)

| seq | wave | tranche/ws | class | status | gate | paint |
|----:|------|-----------|:-----:|:------:|------|:-----:|
| 3.1 | BG.W-CARTOON-INK-GAMUT | BG/WS3 | P | PENDING | proof:no-gray (cartoon-ink-warm-in-gamut) | — |
| 3.2 | BG.W-DOCK-CAST-RETIRE | BG/WS3 | H | PENDING | source-absent + in-bundle getComputedStyle | — |
| 3.3 | BG.W-GLASS-CLIP-DISCIPLINE | BG/WS3 | P | PENDING | proof:glass-clip · proof:dock-plate-clearance | — |
| 3.4 | BG.W-SAFARI-BLUR-LITERAL | BG/WS3 | P | PENDING | webkit literal-blur value-correctness | — |
| 3.5 | BG.W-GLASS-TINT-UNIFY (M5a→M5 phased) | BG/WS3 | P | PENDING | proof:glass-foundation A1 | — |
| 3.6 | BG.W-GLASS-BLUR-PEER | BG/WS3 | P | PENDING | proof:glass-cal (8px peer lock) | — |
| 3.7 | BG.W-GLASS-IDIOM-FACTOR | BG/WS3 | H | PENDING | reader-census-at-landing | — |
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

---

**Boot counts.** PENDING: all (≈110 BG active + ≈30 BH = ≈140; +2 BG booked, +1 BH deferred). BUILDING: 0 ·
PAINT-PENDING: 0 · DONE: 2 · BLOCKED: 0. Frontier = seq 0.1 `BG.W-PAINT-IS-THE-GATE` (non-authoring paint FAIL →
reset PENDING; rebuild). [batch: 0.1 PENDING (non-authoring paint FAIL) · 0.4 DONE 3fce612a · 0.5 DONE 6105ed6f]
