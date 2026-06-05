# Tranche AU — PROGRESS

Execution log for tranche AU (complete AT in totality + drive the 3.3.0 publish). Updated
at wave boundaries. Plan basis — `docs/tranches/AU/AU.md`; the begotten CHARTER + audits at
`fourier-analysis/docs/constellation/tri-tranche-run/glass-ui-next/`; the design slices at
`design/` (AU.W1); the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / DONE-AT-HEAD (landed pre-AU,
re-verified on AU's own green CI at W10) / BOOK (named-forward, watched) / KILL / OUT
(cross-repo; name-forward).

## Top-line status

**AU.W0 (formalize + re-ground) DONE.** AU is the execution of AT's authored-but-unrun mass.
The CHARTER is formalized into `AU.md` + this `PROGRESS.md`; the three landed dock commits are
re-grounded as FACT (re-verified at HEAD by direct file read, §HEAD-facts); the `W6-dock-b`
slot-ID collision is re-lettered (touch-gate SHIPPED `f0b0ffb`; the a11y/state contract → AU.W8
fresh ID); the "3 a11y asks" bundle (#29) is decomposed against speedtest's lane-b3 audit into
three named GU-routed FOLD-W3 sites (AU.md §5); all 71 ledger rows are dispositioned (P-Inv 28,
AU.md §4). The IMPL waves (W2–W10) were greenlit by the S2 KICKOFF.

The wave order lands the slides-F-blocking + publish-blocking items FIRST: **W2** (dock
opacity-lockstep, slides-F P0) → **W3** (the strict-templates keystone + the two CHRONIC RED@HEAD
correctness debts, publish-blocking) → **W4** (Fraunces, slipped) → **W5–W7** (the `/color` leaf →
the `useWebGLCanvas` substrate → the blob trio headline) → **W8** (the dock-design headline) →
**W9** (control-pane + dark-ergonomics + the publish-gated slides-supply) → **W10** (close + the
3.3.0 changeset, READY-TO-PUBLISH; the publish is USER-DOMAIN, confirm-first).

## §HEAD-facts — the re-ground (verified by direct file read at W0, 2026-06-05)

Every later wave gates on these FACTS, not the AT plan's narration.

| Fact | Site | State @ `8e4cb9f` |
|---|---|---|
| dock opacity-desync (W2 target) | `dock.css` `.dock-layer{,-item-host}` base rule | `opacity var(--dock-motion-fast)` (0.2s) + `visibility 0s linear var(--duration-fast)`; active rule also `--dock-motion-fast` + `visibility 0s`. **UN-FIXED** |
| dead peer field (W3 target) | `package.json:559` | `"optionalPeerDependencies": { "tw-animate-css": "^1.2.5" }`; NO `peerDependenciesMeta`. **RED** |
| DataTable vueuse leak (W3 target) | `DataTable.vue:3` | `import { useElementSize } from "@vueuse/core"`. **RED** |
| supportsPostTask orphan (W3 target) | `platformSupport.ts:23` | exported `supportsPostTask()`, 0 public-predicate callers. **ORPHAN** |
| Fraunces face missing (W4 target) | `tokens.css:43` / `fonts.css` / `typography.css` | `--font-stack-display:"Fraunces"` references it; ZERO Fraunces `@font-face` ships → WONK/SOFT axes silently inert. **DANGLING** |
| `/color` leaf absent (W5 target) | `aurora/composables/color.ts:33` | `oklchToLinear` exists value.js-backed (to HOIST); no `/color` leaf; no `oklchToGammaRgb`. **ABSENT** |
| `frostShader.ts` orphan (W6 target) | `src/composables/glass/webgl/frostShader.ts` | file PRESENT, 0 consumers. **PRESENT** |
| blob trio absent (W7 target) | `dist/` exports | no `/goo-blob`, no `/watercolor-dot`, no `ColorResolver`. **ABSENT** |
| strict-templates keystone absent (W3 target) | the 3 tsconfigs | no `checkUnknownProps`/`strictTemplates` in any tsconfig. **ABSENT** |
| LabeledField for/id (W3 a11y) | `LabeledField.vue:4,11` | bare `<label>` no `for`; imports `useId` (for `errorId`) but does not thread a control-id. **RED** |

## §Wave status

| Wave | Type | Status | Evidence / note |
|---|---|---|---|
| **AU.W0** formalize + re-ground | DEV | **DONE** | `AU.md` + `PROGRESS.md` authored; `proof:au-w0-reground` green; the 3 dock SHAs ancestor-reachable; the collision re-lettered; the a11y bundle decomposed; 71/71 dispositioned |
| **AU.W1** design slices | DEV | **DONE** | three `design/AU.W1*.md` slices authored (blob/dock/color-gates); the W1c slice is the gate-fleet registry (19/19 gates enumerated with greening waves); `proof:au-w1-design` green |
| **AU.W2** dock opacity-lockstep | IMPL | **DONE** | `dock.css` `.dock-layer{,-item-host}` opacity `--dock-motion-fast`→`--dock-motion-resize` (base + active rules); base visibility hold `--duration-fast`→`--duration-normal`; active `visibility 0s` preserved. `proof:dock-opacity-lockstep` green (bite: revert→red, the 100ms desync returns); build green; the token lands in slides via the W10 publish |
| **AU.W3** keystone + correctness fold | IMPL | **DONE** | `proof:strict-templates` KEYSTONE green (`checkUnknownProps:true` ×3 tsconfigs + the global `data-*`/`aria-*`/HTML-global `ComponentCustomProps` augmentation; `<GlassDock bogus-prop>` RED via fixture; the 270→0 sweep caught genuine STALE reka bindings — `v-model:pressed`/`:checked`/`v-model:search-term` — fixed at call-sites, NO suppressions); `proof:peer-optional` green (dead `optionalPeerDependencies` deleted; 5 feature-peers optional, 7 substrate required — derived fact); `proof:vueuse-free-root` green (DataTable `useElementSize`→in-house `useResizeObserver` + `useTokenColor` `useGlobalDark`→native MutationObserver — BOTH leaks closed); `proof:supportsPostTask-wired` green (WIRED into `usePrioritizedTask`); the keyframes `[2.2.0,3.0.0]` `proof:package` peer-matrix axis; the 3 decomposed a11y sites (LabeledField for/id ×4 wrappers, ExpandableContainer + ResponsiveTabs `aria-label`); `.input-pill :user-invalid` rung KILL-as-shipped. typecheck 0; build green; 633 tests pass; `gates:verify-ci` 23 gates |
| **AU.W4** Fraunces ship | IMPL | **DONE** | shipped `src/fonts/fraunces/fraunces-latin.woff2` (the FULL variable face — wght/opsz/SOFT/WONK, verified) + the `fonts.css` `@font-face` (mirrors Plus-Jakarta), resolving the dangling `--font-stack-display` token (WONK/SOFT were silently inert). `proof:font-axes` green (parses the woff2 `fvar`; bite: hide the face→red). Paid-diff: the dead `ValueJs`/`libraryGlobals` UMD wiring DELETED from vite.config/iter.config/library (grep=0, ES-only output). `text-box-trim` BOOKED (0-consumer, no SFC touch). build/iter/typecheck green; gates:verify-ci 24 |
| **AU.W5** `/color` leaf | IMPL | **DONE** | new `src/composables/color/` leaf (value.js-only): HOISTED `oklchToLinear`/`cssToOklch`/`oklchStopToHex` + AUTHORED `oklchToGammaRgb` (DEC-AT-7 gamma exit) + `defaultBlobColorResolver` + `OklchStop`/`ColorResolver` types; aurora re-exports the core (surface unchanged, OklchStop single-sourced). `proof:color-acyclic` green (leaf imports value.js only; value.js/src→glass-ui = 0; DAG) + `proof:single-color-core` green (0 primitive re-defs; bite: inject re-def→red; token tier exempt). typecheck 0; build green; 633 tests pass; gates:verify-ci 26 |
| **AU.W6** WebGL substrate | IMPL | **DONE** | new `useWebGLCanvas` substrate (`glass/webgl/`) owns the generic lifecycle (context create + the genuinely-absent `webglcontextrestored` self-heal) + the 3-reason suspend/resume + demand-driven rAF loop + ResizeObserver; aurora refactored onto it as consumer #1 (`createAurora` 458→348 LOC, **−110** net-deletion — the transposition proof, NOT a copy); the substrate bakes NO aurora quad/DPR/uniforms (the consumer-#2 vitest mounts it with a non-aurora setup — green). `frostShader.ts` DELETED (committed 41ff172). `proof:webgl-substrate-single` + `proof:frostShader-deleted` green; **capture-path GPU render (`profile:aurora` thumbnail-batch) passes post-refactor** (pixel parity preserved; the live-rAF path fails identically before+after under headless Chrome — pre-existing, not a regression); 636 tests; gates:verify-ci 28 |
| **AU.W7** blob trio | IMPL | **DONE** (webgl-golden deferred) | the user-ruled headline. GAMMA lift: `/goo-blob` (WebGL2 metaball on the W6 substrate, single-bootstrap, injected `ColorResolver` replacing the 1×1-canvas probe, throws naming `defaultBlobColorResolver`) + `/watercolor-dot` (CSS/SVG, internalized per-instance filter + seeded prng); 3 subpaths (`/color`/`/goo-blob`/`/watercolor-dot`) wired+emit+resolve; demo story = #2 consumer. OKLCh LINEAR shader-quality (DEC-AT-7): the 5 SOTA edits (fwidth AA · Quilez quadratic smin · rotated-octave FBM · OKLCh linear-flip + the mandatory `linearToSrgb()` OETF replacing the HSV path · exact Ottosson matrices+radians transposed column-major, NOT LYGIA · hue-preserving gamut). Gates: `proof:blob-value-free` + `proof:no-value-default` + `proof:blob-space-gamma` (now flipsToLinear+OETF — seam closed) + **`proof:blob-color-equivalence` 8/8** (the TS port matches value.js's Ottosson CPU to **~2e-16**, ~10 orders under the 1e-6 bar; the asymmetric witness #3a7bd5 detects the LYGIA/transpose trap). 644 tests; gates:verify-ci 32. **`proof:webgl-golden` DEFERRED** (this env's headless Chrome runs only the deterministic capture path — the live-rAF path fails identically for aurora; a reliable blob pixel golden can't run green in CI here. The 8-assertion CPU-equivalence proves the color to float-epsilon + the aurora capture-render verifies the shared substrate's GPU path — together the GPU correctness; the blob zero-perturb pixel golden BOOKs on a stable headless WebGL-live capture). |
| **AU.W8** dock-design headline — **RE-SCOPED MOTION-led** (see `AU-AUGMENT.md §2`) | IMPL | **DONE** | the dock-motion overhaul landed as ONE atomic pass: (1) single-frame FLIP sync — the `leavingLayer`/`currentLayer` ref-swap moved INTO the width-driving rAF (`useLayerTransition.ts`) + a PRM JS fast-path; (2) `--spring-dock` ((0.5, 0.5), +16.3% emitted/+18.5% analytic) authored via the regen script (idempotent twice-run), `--dock-resize-spring`→`var(--spring-dock)`, stale §2 ζ docstring corrected; (3) the LIGHT one-rAF driver — **`SpringProgress.play()` NOT `AnimationGroup`** (the HEAVY/value.js edge is correctly avoided; dock-graph HEAVY-edge grep = ZERO real-code hits; `proof:vueuse-free-root` green); (4) reka-ui Tabs rail (role=tablist/tab + aria-selected, roving tabindex, travelling indicator riding `--dock-motion-resize`, keep-open on focus, inactive-pane aria-hidden + post-swap focus routing); (5) `proof:dock-motion-single-source` — a STATIC source-structure gate (the perceptual settle-probe is DELEGATED downstream to the slides deck Playwright — no playwright dep, KISS), opacity-lockstep demoted to syntactic; (6) `proof:dock-vocabulary` registered (README+script). Gates GREEN: `proof:dock-motion-single-source` + `proof:dock-motion-parity` (re-pinned) + `proof:dock-a11y-contract` (8/8) + `proof:dock-vocabulary` + `proof:dock-opacity-lockstep` + `proof:vueuse-free-root` + `gates.mjs --verify-ci` (35). Bite-checks RED-then-reverted: sync-swap → single-source RED; snappy retarget → parity RED; aria-pressed → a11y RED. |
| **AU.W8b** modern-CSS + encapsulation/styling folds — **NEW** (`AU-AUGMENT.md §3, §5`) | IMPL | **DONE** (§8 anchor BOOKed) | three parallel worktree lanes, orchestrator-merged (zero conflicts). **Lane A (dock-CSS):** the visibility-fork native fold — `@supports (interpolate-size: allow-keywords)` width morph + `@supports (transition-behavior: allow-discrete)` + `@starting-style` arms appended; the FLIP fixed-pixel + 3-state fork byte-unchanged as the unconditional fallback (spec correction: the compound `--dock-motion-resize` token is invalid in `transition-duration` — split into `--duration-normal` + `--dock-resize-spring` longhands, re-asserted in the active arm); the five-control family carved to `dock-controls.css` with `&`-nesting (de-sugared selector list IDENTICAL 121=121); **§8 anchor-positioning BOOKed** per the §3a condition — reka `PopperContent` positions via floating-ui inline transform with no per-content yield → native `anchor()` would double-position (rationale: `audit/W8b-laneA-notes.md`); browser-verify DONE (Playwright MCP, Chrome 149: native arms active, lockstep settle, no VT double-animate). **Lane B (design-idiom):** 12-site disposition (9 lifted incl. `text-muted-foreground-strong` bridge + `transition-control`/`transition-collapse` `@utility` recipes + `w-popover` token + glass-tier toggle lifts; 1 KEEP+allowlisted `--active-tab-color`; 2 spec-sanctioned single-site arbitraries); the four `-webkit` re-groundings confirmed KEEP at HEAD with zero edits (`scrollbar-color` Baseline Newly 2025-12-12 cited; `audit/W8b-laneB-notes.md`). **Lane C (framework):** `defineModel` ×8 (HoverPopover dual-watch DELETED, keepDockOpen non-regressed by test; DataTable `update:sort` stays an emit) + 5 new round-trip test files; `dockLayerContext` refs `Readonly<Ref<…>>` + `readonly()` provide; `dockContext` audit NO-OP (nothing leaks; `audit/W8b-laneC-notes.md`); negative fixture via `expectTypeOf` (strict-templates forbids suppressions). Gates GREEN at integration: `proof:dock-css-split` + `proof:design-idiom-localization` (both bite-verified, registered manifest==ci — 37 gates) + the full no-regression matrix (typecheck · 673 tests · build · motion gates · components-css · vueuse-free-root); one stale public-surface location pin (`dock.css` → `dock-controls.css`) re-pointed in the same pass. |
| **AU.W9** lean folds + slides-supply (Drawer `:native` chronic → BOOK) | IMPL | **DONE** | four parallel lanes (A control-pane / B dark-ergonomics / C size+slides-supply / D motion — D BOOKed) + G tally-gate serialized last. **Lane A:** `ConfiguratorLayer` `dividers?` opt-in inter-row hairline (SFC conditional class, zero CSS rung → no budget rebase) + A-2 `label`/`sub` titles lifted to the `text-small` ladder rung (size-invariant re-anchor; mirrored on `ConfiguratorRow`); paired-π visual verify in `audit/W9-laneA-visual-verify.md`. **Lane B:** `darkModeSyncScript()` parse-time FOUC `<head>` string (vueuse-free, mirrors the runtime classList+colorScheme contract) + `useGlobalDark({ initialValue })` one-shot seed (the `createGlobalState` singleton reads a module-level seed; conflicting later calls dev-warn — the singleton shape forbids a per-call re-seed); both on `/dark` + `/api`. **Lane C:** Button `size="icon-sm"` (`h-7 w-7 p-0`) + Select `size?: "sm"\|"default"` (h-9/h-10) + Dialog `showClose?` (default `true`, isomorphic). **Lane G:** `proof:au-w9-consumers` born-GREEN + bite-verified (drop a consumer → RED line `W9 item 'dialog-show-close' has <2 consumers and no correctness/hygiene tag`); 7 FOLD rows tallied (4 via ≥2 consumers, 3 via hygiene tag), all 15 cited consumer paths resolve at HEAD. Registered `package.json`+`gates.mjs`+`ci.yml` (after `proof:design-idiom-localization`); `gates.mjs --verify-ci` **38 gates**. Budget: the SFC-only A-1 minted no CSS rung, so `profile:budget` needed no rebase (rebaseline note: orchestrator integration at `3a2cf98`). typecheck 0. |
| **AU.W10** close + 3.3.0 (+ the component splits, polish-tier) | IMPL | PLANNED | `proof:au-final`; the changeset staged; READY-TO-PUBLISH (publish USER-DOMAIN). `proof:webgl-golden` KEEP-DEFERRED (documented in FINAL) |

### The three dock commits (DONE-AT-HEAD — re-verified on AU's own green CI at W10)

| Commit | Slice | Status |
|---|---|---|
| `e906448` | AT.W6-dock-c VT/FLIP motion-parity | **DONE-AT-HEAD** |
| `f0b0ffb` | AT.W6-dock-b′ touch-gate | **DONE-AT-HEAD** |
| `8e4cb9f` | AT.W7-dock-a/b/c overflow + token refinements + doc-rot gate | **DONE-AT-HEAD** |

## §AU.W9 FOLD/BOOK verdict set

The W9-consumers tally (`audit/W9-consumers.json`, gated by `proof:au-w9-consumers`)
lists FOLD rows ONLY; BOOK rows are recorded here with their named trigger.

### FOLD (tallied — each ≥2 distinct consumers XOR a correctness/hygiene tag)

| id | clears bar via | consumer evidence |
|---|---|---|
| `configurator-a1-dividers` | 2 consumers | `demo/stories/primitives/configurator.vue` + `demo/stories/blob.vue` (both compose `<ConfiguratorLayer>`/`<ConfiguratorRow>`) |
| `configurator-a2-ladder` | 2 consumers | same two configurator stories (every pane/row title re-anchors to the `text-small` ladder rung) |
| `dark-mode-sync-script` | 4 consumers | speedtest `useAppProviders.ts` + `PublicDashboardLayout.vue`; words `ui-state.ts` + `ios-pwa.css` (`color-scheme`) |
| `use-global-dark-initial-value` | hygiene tag (+2 contexts) | API-completeness pair for the FOUC seed; speedtest `useAppProviders.ts` + words `ui-state.ts` |
| `button-icon-sm` | hygiene tag (+2 contexts) | size-vocabulary completeness; demo `buttons.vue` + speedtest `DashboardMapControls.vue` compact icon controls |
| `select-size` | hygiene tag (+1 context) | size-vocabulary completeness; demo `select.vue`. (speedtest `AdminDataSourceToggle` `size="sm"` is a **ToggleGroup**, NOT a Select — not cited as a literal Select site) |
| `dialog-show-close` | 2 consumers | slides `deck/DeckGate.vue` (hand-composed access modal) + demo `containers/dialog.vue` |

### BOOK (NOT tallied — named trigger recorded)

| item | rationale at HEAD | named trigger to revisit |
|---|---|---|
| Card `surface="cartoon"` dark arm | already token-adaptive (the offset-stamp rides `--shadow-color: var(--foreground)`, which dark-flips automatically); no divergent dark cartoon values exist at HEAD | a 2nd repo with genuinely divergent dark cartoon offset/border values |
| `useCountup` / `vReveal` | exactly ONE real consumer (slides `useDeckNav`/`SlideFooter`); a demo-story-only second consumer is the overfitting class | a 2nd real count-up/reveal consumer (e.g. a speedtest/words metric count-up) |
| Drawer `:native` / `GlassNativeDrawer` (#32) | the live-behind detented case is ALREADY served by `Drawer mode="live-behind"` (muster `MobileInstrumentSheet.vue:54`); a native `<dialog>`-backed drawer is a separate COMPONENT-scope expansion, not a W9 lean fold | a 2nd real `GlassNativeDrawer` consumer beyond muster's live-behind |

## §AU.W9 §11 archaeology re-groundings (HEAD-verified; recorded so W10 FINAL does not re-mint)

1. **`:user-invalid` is KILL-as-shipped — NO W9 edit.** The AU-AUGMENT §6.2 "AU.W3 KILL'd → reinstate" premise is STALE. At HEAD the validity rung SHIPS (`src/styles/glass.css:256` — the `.input-pill:where(:user-invalid, .user-invalid-fallback)` recipe + `:user-valid` + the destructive focus-ring), AND the `aria-invalid`↔`:user-invalid` JS bridge ships as `src/composables/dom/useUserInvalidAria.ts` (wired into `Input.vue`, exported on `/forms`+`/api`). The "reinstatement" the crosswalk describes is the slides DeckGate's own arm (F.W1, OUT per inv-16), not a glass-ui fold.
2. **Drawer `:native` (#32) is PARTIALLY DISCHARGED by `Drawer mode="live-behind"` → BOOK.** The live-behind detented bottom-sheet (AN.W3 drawer mode) already serves muster (`MobileInstrumentSheet.vue:54` + `App.vue:17`). The chronic `:native` ask is for a native `<dialog>`-backed drawer — a separate component, NOT the additive prop W9's lean-fold scope admits. Speedtest's native-drawer grep at HEAD = 0. BOOKed with the named trigger (a 2nd real `GlassNativeDrawer` consumer); not force-folded.

## §Disposition rollup (AU.md §4 — 71 items)

- **FOLD (executes in AU):** the slides-P0 dock opacity-lockstep (W2); the keystone +
  correctness fold #6–9 + the 3 a11y sites #25/#29 (W3); Fraunces #10 (W4); the `/color` leaf #4
  (W5); the substrate + `frostShader` delete #3 (W6); the blob trio + shader-quality #1/#2/#5 (W7);
  the dock-design headline #11–12 + ASK-7 (W8); the control-pane #30–31 + dark-ergonomics #21–22 +
  Drawer #32 + size #17/#20 + slides-supply (W9). ONE 3.3.0 publish at W10.
- **BOOK (gated, carried, trigger named):** #13–16, #18/#19/#24/#26, #27–28, #33–35, #37–43,
  #40/#44–46, the role-typed `<Role>Dock` base component.
- **KILL (exit the ledger):** #23, #36, #47–55, ASK-1/2/4/5.
- **OUT (inv-16 name-forward):** #56–63.
- **Completeness:** 71/71 dispositioned. Zero un-dispositioned punts (P-Inv 28).

## §Milestones

| When | Wave | Milestone | Evidence |
|---|---|---|---|
| 2026-06-05 | AU.W0 | tranche formalized + re-grounded; `proof:au-w0-reground` green | this file + `AU.md` + `scripts/proof-au-w0-reground.mjs` |
| 2026-06-05 | AU.W1 | three design slices authored; the W1c gate-fleet registry (19 gates); `proof:au-w1-design` green | `design/AU.W1*.md` + `scripts/proof-au-w1-design.mjs` |
| 2026-06-05 | AU.AUGMENT | new-directive fold: a 57-agent read-only assay (2 workflows) → 3 digests; W8 RE-SCOPED MOTION-led (the `useLayerTransition` async-fork root cause), W8b added (modern-CSS + encapsulation/styling); chronics folded; 8-gate fleet specified | `AU-AUGMENT.md` + `audit/AUGMENT/{AU-augment-digest.md,assay-wf1-raw.json}` |
| 2026-06-05 | AU.WAVES | 30-agent review (keyframes.js A–E + glass-ui tranches) → **FULLY-formed wave specs**: `waves/{AU.W8-dock-motion, AU.W8b-modern-css, AU-keyframes-coordination, AU-gate-fleet-augment}.md` + `CONSTELLATION-MAP.md` + slides `F.W-dock-consume.md`. CORRECTION: the dock driver is `SpringProgress.play()` (value.js-free), NOT `AnimationGroup` (HEAVY/value.js); `--dock-resize-spring`→`--spring-dock` requires re-pinning `proof-dock-motion-parity.mjs:193` | `waves/*` + `audit/AUGMENT/partB-wavespecs-raw.json` |
| 2026-06-05 | AU.MWG | modern-web-guidance npm package run (`retrieve`) → authoritative Baseline-dated corpus (`audit/AUGMENT/mwg/`); crosswalk threads it through every modern-CSS/a11y/forms item (`audit/AUGMENT/modern-web-guidance-crosswalk.md`); decision-changes: `:user-invalid` revisit (Baseline 2023-11-02), keep `::-webkit-scrollbar` fallback (scrollbar-color Newly 2025-12-12), VT keep-FLIP (VT Newly 2025-10-14) | `audit/AUGMENT/{mwg/,modern-web-guidance-crosswalk.md}` |
| 2026-06-05 | AU.W8 | dock-motion overhaul SHIPPED (one atomic pass): single-frame FLIP sync + PRM fast-path + `--spring-dock` ((0.5, 0.5), regen-emitted, idempotent) + the LIGHT `SpringProgress.play()` one-rAF driver (NOT `AnimationGroup` — value.js-free, dock HEAVY-edge grep = 0) + reka-ui Tabs rail (aria-selected not aria-pressed, roving tabindex, travelling indicator, keep-open, post-swap focus) + the STATIC `proof:dock-motion-single-source` gate (perceptual half delegated to slides Playwright) + opacity-lockstep demoted + `proof:dock-vocabulary` registered; W1c registry resynced (+3 AUGMENT-new rows). 5 dock gates + verify-ci(35) green; 3 bite-checks RED-then-reverted | `useLayerTransition.ts` + `DockLayer{,Group}.vue` + `tokens.css` + `dock.css` + `scripts/proof-dock-motion-single-source.mjs` + `__tests__/DockLayerRail.a11y.test.ts` |
| 2026-06-05 | AU.W9 | lean folds + slides-supply SHIPPED across four lanes (A control-pane `dividers` opt-in + `text-small` ladder titles; B `darkModeSyncScript()` FOUC + `useGlobalDark({initialValue})` one-shot seed; C Button `icon-sm` + Select `size` + Dialog `showClose`; D motion BOOKed). G: `proof:au-w9-consumers` born-GREEN + bite-verified (drop a consumer → RED), 7 FOLD rows (4 via ≥2 consumers, 3 hygiene-tagged), all 15 cited consumers resolve; registered manifest==ci (**verify-ci 38 gates**). §11 re-groundings: `:user-invalid` KILL-as-shipped (no edit); Drawer `:native` #32 partially discharged by `mode="live-behind"` → BOOK. A-2 paired-π visual verify recorded. Budget: SFC-only A-1 minted no CSS rung → no rebase; rebaseline note orchestrator `3a2cf98`. typecheck 0; diff-check clean | `audit/W9-consumers.json` + `scripts/proof-au-w9-consumers.mjs` + `gates.mjs`/`package.json`/`ci.yml` + `audit/W9-laneA-visual-verify.md` |
