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
| **AU.W5** `/color` leaf | IMPL | PLANNED | `proof:color-acyclic` + `proof:single-color-core` |
| **AU.W6** WebGL substrate | IMPL | PLANNED | `proof:webgl-substrate-single` + `proof:frostShader-deleted` |
| **AU.W7** blob trio | IMPL | PLANNED | `proof:blob-value-free` + `proof:no-value-default` + `proof:webgl-golden` + the 8-assertion CPU-equivalence + `proof:blob-space-gamma` |
| **AU.W8** dock-design headline | IMPL | PLANNED | `proof:dock-a11y-contract` + `proof:dock-vocabulary` (the re-lettered a11y contract) |
| **AU.W9** lean folds + slides-supply | IMPL | PLANNED | `proof:au-w9-consumers` |
| **AU.W10** close + 3.3.0 | IMPL | PLANNED | `proof:au-final`; the changeset staged; READY-TO-PUBLISH (publish USER-DOMAIN) |

### The three dock commits (DONE-AT-HEAD — re-verified on AU's own green CI at W10)

| Commit | Slice | Status |
|---|---|---|
| `e906448` | AT.W6-dock-c VT/FLIP motion-parity | **DONE-AT-HEAD** |
| `f0b0ffb` | AT.W6-dock-b′ touch-gate | **DONE-AT-HEAD** |
| `8e4cb9f` | AT.W7-dock-a/b/c overflow + token refinements + doc-rot gate | **DONE-AT-HEAD** |

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
