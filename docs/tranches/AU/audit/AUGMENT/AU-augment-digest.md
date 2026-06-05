# AU AUGMENTATION — wave-mapped digest (glass-ui)

Condensed from `assay-wf1-raw.json` (44 agents). This digest retains **the glass-ui-facing
material only** — slides-only findings go to the sibling digest. Source agent area is cited
inline (e.g. `[shrink-fade-rootcause]`). Every claim carries a `file:line`.

Plan basis at HEAD: `AU.md §3` wave table + `§4` disposition; `PROGRESS.md` (W0–W7 **DONE**,
W8–W10 **PLANNED**). The user's NEW directive RE-SCOPES the dock: "not springy/iOS"; the
"shrink-first-then-fade-a-few-ms-later" desync; collaborate with keyframes.js for the spring
engine; adopt modern-web SOTA.

---

## 1. The dock-motion overhaul (THE headline) — synthesized design

### 1.1 The contradiction the 12 AnimSOTA agents must be read against

Three agents declare the desync **already fixed** by AU.W2 + AT.W6-dock-c:
- `[dock-css-motion]` AU.W2-opacity-lockstep-verified (P0): both opacity and container morph
  consume `--dock-motion-resize` — `dock.css:424-450`, `view-transition.css:59-62`.
- `[dock-ts-motion]` dock-motion-2 (P0): "lockstep is correct… no change."
- `[sota-spring-ios]` LAYER-MORPH-001 (P0): "locked on snappy timing… load-bearing."

But **four agents independently find a RESIDUAL root cause the static gate cannot see**, and
the user still perceives lag. This is the load-bearing tension: **AU.W2 unified the timing
TOKENS but did not unify the timing ORIGIN**. The gate `proof:dock-opacity-lockstep`
(`scripts/gates.mjs:44`) is a **string-match** proof (both rules reference the same token), not
a perceptual settle probe (`[audit-au-forward]` AU-DOCK-1, P1). It is **green-but-not-felt**.

### 1.2 ROOT CAUSE (precise)

The container morph and the child fade share a duration token but **start on different frames**:

1. **The async-fork gap (THE precise mechanism)** — `[shrink-fade-rootcause]` GU-dock-flip-async-gap (P1).
   In the FLIP fallback `src/components/custom/dock/composables/useLayerTransition.ts:140-170`:
   the layer **class swap is synchronous** (`leavingLayer.value`/`currentLayer.value` mutated at
   lines 146-147 → Vue applies classes ~2-3 ms later → `.dock-layer` **opacity transition fires
   immediately** ~T3-5 ms), but the **width animation is deferred** through `nextTick` (line 150,
   measure/re-pin) **then** `requestAnimationFrame` (line 167-169, width set) → starts ~T7-10 ms.
   Net: opacity runs **5-7 ms (a frame) AHEAD of** the width morph. On collapse the container
   shrinks while items are still painting; on expand items fade in mid-morph. The desync is the
   **two async boundaries (microtask + animation frame) between the synchronous class mutation and
   the deferred width trigger** — NOT a token mismatch.

2. **The layout-reflow desync (corroborating)** — `[audit-au-forward]` AU-DOCK-3 (P2).
   `dock.css:382-385` animates `width` on `.dock-layers`; the flex children reflow **immediately**
   on width change (no containment), so a slow curve lets children contract before opacity
   reaches 0 — a second, independent source of "items lag the box."

3. **No entry-state definition (corroborating)** — `[sota-interpolate-size]` F004 (P2).
   `dock.css:431-436` `.dock-layer:not(.layer-active)` has **no `@starting-style` block**; the
   browser guesses the from-state, so first-render/swap fades are not deterministic.

4. **A SECONDARY visibility-semantic fork (book, not the bug)** — `[dock-css-motion]`
   visibility-semantic-fork-asymmetry (P2). `dock.css:428` (`visibility 0s linear var(--duration-normal)`)
   vs `:449` (`visibility 0s`). This asymmetry is **load-bearing** (active must paint at once,
   leaving must stay hit-testable through the fade) — it is NOT the lag, but it should be named in
   one token family so a future refactor cannot collapse it.

### 1.3 THE FIX — gestalt, one spring ORIGIN, one rAF driver

Two complementary moves; either kills the lag, together they make it iOS-grade.

**(A) Single-frame sync (cheap, isomorphic, kills the visible jank).** Move the
`leavingLayer`/`currentLayer` ref mutations OUT of the synchronous section
(`useLayerTransition.ts:146-147`) INTO the rAF callback (line 167-169), so **class application
(→ opacity) and width set start in the same animation frame** (`[shrink-fade-rootcause]`
proposal; measured target <16 ms between class-apply and width-start). This is the minimum fix —
no API change, refs still track the same state, deferred by one rAF (~16 ms).

**(B) One spring AUTHORITY via keyframes.js (the iOS-grade overhaul).** Drive the morph through
keyframes.js's `AnimationGroup` so **width + opacity advance off ONE `advanceTo(t)` rAF loop**
on **one spring solver** — settling "within 1 frame of each other" (`[kf-engine]`
KF-ANIMATION-GROUP-COMPOSITOR P1 + KF-SHRINK-FADE-ROOT-CAUSE P1). The spring authority is
`keyframes.js/src/animation/spring.ts:82-408` (`SpringProgress`, analytic 2nd-order ODE).

**Engine import surface (from `[kf-engine]` KF-DYNAMIC-IMPORT-BOUNDARY P1,
`keyframes.js/src/animation/index.ts`):**
- **LIGHT static surface** (value.js-free, zero engine load): `SpringProgress`,
  `springLinearStops()` (`springLinearStops.ts:46-73` — emits the CSS `linear()` string),
  `springTimingFunction()` (`springTimingFunction.ts:65-120` — returns `{fn, css}` twin),
  `Timeline`/`SmoothProgress`, `ElementMorph` (`morph.ts:48-100`).
- **HEAVY boundary** (`await loadAnimationEngine()`): `Animation`, `AnimationGroup`, the CSS
  parser. A hand-written dock driver needs only the LIGHT surface (no `fromString`), so the dock
  stays value.js-free.

**Who emits the spring — CSS owns the curve, keyframes.js generates it.** Glass-ui already does
this correctly: `scripts/regen-spring-tokens.mjs:38-42` runs the keyframes.js solver to pre-bake
the four `--spring-*` CSS `linear()` tokens (`tokens.css:158-161`, 48-sample grid for overshoot
fidelity per `[sota-spring-ios]` LINEAR-EASING-FIDELITY-001). The morph curve stays a **CSS
token**; the FLIP/VT transition consumes it. keyframes.js is the **build-time author** of the
curve and (for option B) the **runtime driver** of the `advanceTo(t)` loop. The "one spring
authority" is the solver in `spring.ts`; both the CSS `linear()` and any JS-driven path step the
same parameters for bit-identical motion (`[sota-spring-ios]` SPRING-001 P0).

### 1.4 iOS SPRING PARAMS (concrete, from `[sota-spring-ios]` + `[kf-demos]`)

The current dock morph rides `--spring-snappy` = `{response: 0.35, dampingFraction: 0.65}`,
+6.8% overshoot (`tokens.css:1266`, `regen-spring-tokens.mjs:38-42`). `[sota-spring-ios]` says
KEEP it; `[audit-au-forward]` AU-DOCK-2 (P2) **disagrees** — the user's "not springy" report
suggests the snappy curve reaches 1.0 at ~48% then plateaus (reads mechanical). Decision for the
augmented plan:

| Interaction class | preset | (response, ζ) | overshoot | source |
|---|---|---|---|---|
| **Expand/collapse morph** | snappy (or new `--spring-dock`) | (0.35, 0.65) → consider (0.5, 0.5) ~20% | +6.8% → ~20% | `[sota-spring-ios]` DOCK-SPRING-001 / `[audit-au-forward]` AU-DOCK-2 |
| **Show/hide (collapse-on-blur)** | smooth/critically-damped | (0.5, 0.86) or (0.7, 1.0) | none | `[kf-demos]` KF-D-R3/R8 (iOS default 0.86) |
| **Icon/tab press-back** | bouncy (transform-only) | (0.5, 0.45) | +20.5% | `[sota-spring-ios]` DOCK-PRESS-SPRING-001 (`--dock-press-spring`, `tokens.css:1275`) |

**Recommendation:** author `--spring-dock` (`[audit-au-forward]` AU-DOCK-2) tuned to ~15-30%
overshoot, ζ≈0.5, generated by the same `regen-spring-tokens.mjs` solver; route
`--dock-resize-spring` through it. Gate with an overshoot-window check. This is a TUNING change
(isomorphic, no breaking API). Do NOT touch `--dock-press-spring` — press feedback is an
**orthogonal transform-only family** that must never touch surface fades (`[dock-css-motion]`
dock-press-spring-orthogonal-motion-family P1; `tokens.css:1268-1274` docstring).

### 1.5 MODERN CSS to adopt — ADOPT / DEFER per feature

| Feature | Verdict | Why · source |
|---|---|---|
| **View Transitions (layer A↔B morph)** | **KEEP (mature)** | Already shipped + correct; VT/FLIP unified on `--dock-resize-spring` (`view-transition.css:47-62`). iOS Safari lacks VT, so FLIP is the live iOS path — the fix MUST land in the FLIP fallback. `[sota-view-transitions]` VT-1/VT-4, `[chrome-modern-guidance]` view-transitions |
| **`interpolate-size: allow-keywords` + `calc-size(auto)`** | **ADOPT (W8b)** | Lets `.dock-layers` transition to `width:auto` natively, **eliminating the JS getBoundingClientRect/pin dance** (`useLayerTransition.ts:140-170`) that CAUSES the async gap. Baseline 2024. `[sota-interpolate-size]` F001/F005. **Caveat:** must verify it does not double-animate with the VT native path (`[sota-interpolate-size]` deferred item). |
| **`@starting-style` + `transition-behavior: allow-discrete`** | **ADOPT (W8b)** | Recipe already proven for top-layer (`animations.css:300-366`). Apply to `.dock-layer`/`.dock-layer-item-host` so visibility flips at 0%/100% **in lockstep with opacity** instead of the deferred side-effect — folds the §1.2(4) visibility fork into one discrete-animated property. `[sota-interpolate-size]` F002/F004 |
| **Compositor-only transform morph (`scaleX` over `width`)** | **DEFER → BOOK** | `[sota-compositor]` DOCK-001/002 proposes `transform: scaleX(toSize/fromSize)` instead of width to escape layout reflow. Higher-risk (distorts children unless counter-scaled; design choice on transform-origin). Adopt only if (A)+interpolate-size do not settle the feel. `[sota-compositor]` DOCK-004 |
| **Child stagger orchestration** | **DEFER → BOOK** | `[sota-compositor]` DOCK-003 + `[kf-demos]` KF-D-R4 propose a `--dock-stagger-delay`. The user wants items to **lead-or-lockstep**, NOT trail — stagger risks re-introducing perceived lag. BOOK behind a real consumer. (Matches AU.md §4.2 #14 "stagger the expand" BOOK.) |
| **Anchor positioning (dock popovers)** | **ADOPT (W8, P1)** | Native `anchor()` replaces floating-ui CSS overrides on `.dock-popover`; `@supports`-gated. `[chrome-modern-guidance]` anchor-positioning |
| **CSS nesting (dock.css refactor)** | **ADOPT (W8b, P2)** | Pure readability; zero behavior change; pairs with the dock.css split (§5). `[chrome-modern-guidance]` css-nesting |
| Container queries · `:has()` · scroll-driven · popover API · `color-mix` · `text-wrap` | **KEEP (mature)** | Already idiomatic; no adoption path. `[chrome-modern-guidance]` |
| Subgrid · OKLCH-in-CSS | **DEFER** | P3, no consumer / aurora shader-domain conflict. `[chrome-modern-guidance]` subgrid/color-mix-oklch |

### 1.6 reduced-motion fallback

CSS VT animations already gate to `animation: none` under `prefers-reduced-motion`
(`view-transition.css:27-33`) and the global spatial gate suppresses width/height
(`dock.css:372-374`). **Gap to close** (`[sota-spring-ios]` REDUCED-MOTION-001 P1): wire the
FLIP fallback + any keyframes.js driver to honor PRM explicitly —
`SpringProgress({respectReducedMotion: true})` snaps to target in one emission; the native VT
path should check `prefersReducedMotion()` before `startViewTransition`. `interpolate-size` /
`@starting-style` adoptions degrade to instant state change on non-supporting engines (acceptable
for a dock).

---

## 2. Re-scoped AU wave table (W8 · W8b · W9 · W10)

The dock-MOTION overhaul becomes the **W8 headline**; the reka-Tabs rail + a11y + vocabulary stay
in W8 (they were already the W8 scope, and they are orthogonal — `[audit-au-forward]` AU-DOCK-4
P0). A **NEW W8b** carries the modern-CSS + encapsulation/styling folds so the publish-blocking
a11y/motion contract is not delayed by polish. W9/W10 unchanged in intent.

| id | what | type | one-line gate |
|---|---|---|---|
| **W8** | **Dock-design headline (MOTION-led, ONE atomic pass).** (1) Single-frame FLIP sync — move ref mutations into the rAF frame (`useLayerTransition.ts:146→167`); (2) author `--spring-dock` (~20% overshoot) + route `--dock-resize-spring` through it; (3) the keyframes.js `AnimationGroup` one-rAF driver for the FLIP fallback (LIGHT surface only); (4) reka-ui `Tabs` rail + travelling indicator; (5) dock a11y/state contract test; (6) `<Role>Dock` docs vocabulary + base renames; (7) anchor-positioning for dock popovers | IMPL | `proof:dock-motion-single-source` (Playwright settle probe: container-width-stop and child-opacity≤0.01 within ±1 frame) **+** `proof:dock-a11y-contract` **+** `proof:dock-vocabulary` |
| **W8b** | **Modern-CSS + encapsulation/styling folds (NEW).** `interpolate-size`+`@starting-style`+`allow-discrete` on `.dock-layer` (folds the visibility fork); CSS-nesting refactor; split `dock.css` (1200 L) → `dock.css`/`dock-controls.css`; non-idiomatic Tailwind lift (12 sites → `@theme`/`@utility`); deprecated `-webkit-*` cleanup; `defineModel` upgrades (8 sites); context `Readonly<>` guards | IMPL | `proof:dock-css-split` (no `.dock-icon-button` rule in `dock.css`) + `proof:design-idiom-localization` (no `text-[var(--…)]` arbitrary-token wraps in flagged SFCs) — born-RED on inject |
| **W9** | **Control-pane + dark-ergonomics + lean folds + slides-supply** (unchanged AU.md §3): A-1 divider + A-2 label ladder; `useGlobalDark({initialValue})` + `darkModeSyncScript()`; Drawer `:native` FOLD-IF; size-vocabulary FOLD-IF; publish-gated slides-supply (`showClose`, `/deck` lift, Card/Badge, `useCountup`+`v-reveal`) | IMPL | `proof:au-w9-consumers` — each folded item names ≥2 consumers |
| **W10** | **Close + 3.3.0 READY-TO-PUBLISH** (unchanged): overfitting audit, gates matrix green, `AU.FINAL`, changeset staged not auto-published | IMPL | `proof:au-final` — full matrix green; FINAL cites a green run id per wave |

**Disposition note:** `[audit-au-forward]` AU-DOCK-2/3/4/5 originally proposed routing the motion
fix to a "W8.5 post-W8 / KEEP-DEFERRED behind a Playwright probe." The user's directive
**overrides** that deferral — the dock motion is now the W8 HEADLINE, executed now, not BOOKed.

---

## 3. Deferred-sweep verdict (glass-ui) — FOLD / KEEP-DEFERRED / KILL

From `[audit-deferred-sweep]` (71 items, AU.md §4 is the binding ledger), `[audit-overfitting]`,
`[gap-constellation]`. **CHRONIC = deferred ≥2 tranches.**

| item | chronic? | verdict | why · source |
|---|---|---|---|
| **Dock motion quality (spring + layout containment)** | — (NEW) | **FOLD → W8** | User directive promotes it to the W8 headline. `[audit-au-forward]` AU-DOCK-2/3 (was KEEP-DEFERRED, now overridden) |
| **Drawer `:native` / `GlassNativeDrawer`** | **YES (AT→AU)** | **FOLD-W9 (if scope) else BOOK-named** | Strongest non-headline ≥2 (muster + speedtest both FIRM). AU.md §4.5 #32. User wants chronics folded. `[audit-deferred-sweep]` GU-AU-32 |
| **`text-box-trim`** | **YES (AS→AT→AU)** | **FOLD-W4-IF resolved → now BOOK-named** | 3-tranche chronic; W4 closed without the SFC diff (PROGRESS.md "text-box-trim BOOKED, 0-consumer, no SFC touch"). Keep explicitly BOOK-named (no silent drop). `[audit-deferred-sweep]` GU-AU-41 |
| **`proof:webgl-golden`** | YES (W6→W7→W10) | **KEEP-DEFERRED (documented)** | Headless Chrome WebGL-live rAF unavailable in CI; 8-assertion CPU-equivalence (~2e-16) + aurora capture-render = GPU correctness. Write `proof-webgl-golden-DEFERRED.md`; cite in FINAL "Known Deferrals". `[audit-au-landed]` AU-W7-webgl-golden-deferred, `[audit-gate-integrity]` G5 |
| **`useDockMagnify` (proximity)** | YES (AT→AU) | **KEEP-DEFERRED** | Properly-gated BOOK, 0 firm consumers; trigger ≥2 dock consumers ask. Not a chronic-resolution failure. `[audit-deferred-sweep]` GU-AU-13 |
| **`<Role>Dock` base component / vocabulary** | — | **FOLD → W8 (docs)** | The README role-name + `useDock*` vocabulary IS the W8 deliverable; `proof-dock-vocabulary.mjs` exists, script ready. `[audit-au-landed]` deferred-item "W8 infrastructure: FOLD" |
| **`useCanvas2D` substrate + constellation lift** | — | **KEEP-DEFERRED (BOOK)** | Constellation is single-consumer, identity-embedded, Canvas2D not WebGL2 → `useWebGLCanvas` is the WRONG home. ≥2-consumer bar UNMET (grep of keyframes.js + feedback-coder = 0 canvas). `[gap-constellation]` GU-CONST-001/003, `[audit-overfitting]` SL-til-briefing-constellation |
| Dock BOOK batch #13-16 (magnification, stagger, pane VT, overflow-clip) | partial | **KEEP-DEFERRED** | All named-trigger BOOKs. `[audit-deferred-sweep]` GU-AU-BOOK-BATCH-13-16 |
| inline-edit (#33) · LabeledSlider (#35) · dock panel-host (#34) | no | **KEEP-DEFERRED** | Consumer/convergence-gated BOOKs. `[audit-deferred-sweep]` |
| Button `size=icon-sm` (#17) + Select size (#20); useGlobalDark+syncScript (#21-22); ConfiguratorLayer A-1/A-2 (#30-31) | no | **FOLD-W9** | Paired vocabulary / dark-ergo / control-pane folds. `[audit-deferred-sweep]` |
| KILL batch (#23, #36, #47-55: shadcn-parity, P5 inner-rounding user-ruled, overflow/wrap DONE) | — | **KILL (terminal)** | Do not resurrect; #47 inner-rounding user-RULED 2026-06-04 NEVER-re-book. `[audit-deferred-sweep]` GU-AU-KILL |
| OUT batch (#56-63: value.js, precepts, CI) | — | **OUT (cross-repo)** | inv-16; #57 value.js blob-consumer rewrite unblocks on W10 publish. `[audit-deferred-sweep]` GU-AU-OUT |

---

## 4. New/updated gate proposals

Reference manifest: `scripts/gates.mjs` (the GATES array, inv-θ; `verifyCi()` at lines ~95-111
enforces manifest==ci). The W8 a11y/vocab/w9-consumer/final gates are **enumerated in the AU.W1c
registry but ABSENT from `gates.mjs`** (`[audit-gate-integrity]` G1-G4) — they must be added.

| gate | wave | born-RED bite-check | status |
|---|---|---|---|
| **`proof:dock-motion-single-source`** (NEW) | W8 | Playwright probe: mount dock, collapse, rAF-sample `getComputedStyle`; assert the frame container-width stops == the frame child-opacity ≤ 0.01, **within ±1 frame**. Re-inject the async fork (mutate refs before nextTick) → RED. Supersedes the string-match `proof:dock-opacity-lockstep` as the *perceptual* sibling. `[audit-au-forward]` AU-DOCK-1 | author + add |
| **UPDATE `proof:dock-opacity-lockstep`** | W8 | Keep the static token-match (`gates.mjs:44`) but **demote to syntactic**; add a note pointing to the new perceptual gate. `[audit-au-forward]` AU-DOCK-1 | edit manifest |
| **`proof:dock-a11y-contract`** (NEW) | W8 | Mounted vitest: `role="tablist"`/`role="tab"`+`aria-selected` (NOT `aria-pressed`), roving tabindex via Arrow/Home/End, focus-visible, `keepOpen()`/`release()`. Delete `aria-selected` binding → RED. **Script does not yet exist** — author `scripts/proof-dock-a11y-contract.mjs`. `[audit-gate-integrity]` G2 | author + add |
| **`proof:dock-vocabulary`** (NEW-to-manifest) | W8 | `scripts/proof-dock-vocabulary.mjs` **EXISTS** (lines 1-86); delete a role from the dock README → RED. Just add the manifest entry (local+ci tags). `[audit-gate-integrity]` G1 | add entry only |
| **`proof:design-idiom-localization`** (NEW) | W8b | Grep flagged SFCs for `text-[var(--…)]` / `shadow-[var(--…)]` arbitrary-token wraps → must be 0 (lifted to `@theme`). Re-inject one wrap → RED. `[sty-gu-tailwind]` GU-1/8/12, `[sty-design-idiom]` GU-2 | author + add |
| **`proof:dock-css-split`** (NEW) | W8b | Assert no `.dock-icon-button`/`.dock-tab-button` rule survives in `dock.css` (moved to `dock-controls.css`). `[sty-monolith]` GU-2 | author + add |
| **`proof:au-w9-consumers`** (NEW) | W9 | Machine-readable tally: each W9 fold item (prop/subpath/composable) ↦ ≥2 consumer contexts OR a correctness tag. **Script absent** — author it. `[audit-gate-integrity]` G3 | author + add |
| **`proof:au-final`** (NEW) | W10 | Release-only: full matrix green over clean tree; FINAL cites a green run id per wave; overfitting zero orphans; changeset staged, NOT auto-published. **Script absent.** `[audit-gate-integrity]` G4 | author + add |

`gates:verify-ci` holds at HEAD (32 ci gates, 17 release; `[audit-gate-integrity]` G8). After each
add, re-run `npm run gates:verify-ci`. The W8 reka-Tabs rail + travelling-indicator + a11y +
vocabulary are **ONE atomic commit** — note that on both W8 gate entries (`[audit-gate-integrity]` G7).

---

## 5. Encapsulation + styling fold (glass-ui internal)

### Component splits (`[enc-gu-splits]`)
| site | line count | fix | wave |
|---|---|---|---|
| `timeline/ContinuousTimeline.vue:1-901` | 901 L | split → `ContinuousRail.vue` (rail regions, :222-249) + `ContinuousMarkers.vue` (`<ul>` overlay, :255-365); keep orchestrator | W8b/W10 (P2) |
| `tabs/BouncyToggle.vue:1-544` | 544 L | extract `composables/useBouncySlider.ts` (slider state :103-149, measurement :153-200, ResizeObserver :251-281) | W8b (P2) |
| `aurora/Aurora.vue` + `shaders/` | 212 L SFC + 819 L shader | lift `shaders/`+`presets.ts`+`renderMode.ts` into `constants/` subdir (config-tier visibility) | W10 (P1) |
| `dock/GlassDock.vue:1-421` + `useDockState.ts:353` | — | **no split** — already KISS (composables/ + SFC + __tests__); only add the inline 3-layer doc comment | — |
| Configurator (945 L) · MetricStack · Typewriter · GooBlob · Command · DataTable | — | **no split** — already well-factored; cited as reference patterns | — |

### Lightweight-dir consolidation (`[enc-colocation]`)
- `Pulse`/`StatusDot`/`IconTooltip`/`ToggleChip` (2-file dirs) → optional `custom/primitives/` (GU-003, FOLD if team prefers). Typewriter `index.ts` re-export of utils (GU-004, FOLD). Configurator `density.ts` → `composables/` (GU-005, KEEP-DEFERRED, cosmetic). — W8b/W10, all P2-P3.

### Modern-Vue-pattern upgrades (`[enc-vue-patterns]`, all isomorphic)
- **`defineModel`** (8 sites, P2): `MultiSelect`, `BouncyTabs`, `UnderlineTabs`, `BouncyToggle`,
  `ResponsiveTabs` (:82-84), `HoverPopover` (:156-166 — folds 10 lines of dual-watch),
  `DataTable` (:62-65), `ConfiguratorLayer`. — **W8b/W9**.
- `SearchBar` ref → `useTemplateRef` (GU-03, P3). `defineSlots` zero adoption → KEEP-DEFERRED
  (no high-complexity slot consumer).

### State-management guards (`[enc-state]`, W9, all type-only zero-runtime)
- `Readonly<>` on context interfaces: `dock/composables/dockContext.ts:27-36` (keepOpen/release),
  `dockLayerContext.ts:20-25` (mutable `currentLayerId`/`leavingLayerId` refs leak — wrap
  `readonly()`). `useConfiguratorState` clone — document plain-cloneable contract (GU-004).

### Non-idiomatic Tailwind / monolith / deprecated / fragile CSS
- **Non-idiomatic Tailwind (`[sty-gu-tailwind]`, 12 sites, W8b):** `text-[var(--…)]` arbitrary
  wraps → `@theme` tokens (`CardDescription.vue:11`, `TabsTrigger.vue:22`); fixed px
  (`ComboboxList.vue:24` `w-[200px]`, `max-h-[300px]` ×N) → sizing tokens; compound
  `transition-[…]` (`CarouselDots.vue:62`, `AccordionContent.vue:18`) → `@utility` recipes;
  `shadow-[var(--shadow-card)]` (`Card.vue:73`) → `shadow-card` named util.
- **Monolith (`[sty-monolith]` GU-2, W8b):** `dock.css` 1200 L mixed surface+controls → split
  `dock.css` (:8-179 shell+density) / `dock-controls.css` (:730-1103 control family). `glass.css`
  + `animations.css` correctly global — KEEP.
- **Design-idiom (`[sty-design-idiom]` GU-1/GU-2, W8):** glass-ui's `tokens.css → theme.css →
  utilities.css → scoped CSS` cascade is the **GOLD STANDARD** (it is the pattern slides-F adopts);
  the fold is enforcing "scoped `<style>` consumes ONLY `var(--…)` + `@utility`, no hardcoded
  literals" via a grep gate.
- **Deprecated (`[sty-deprecated]`, W8b, P2-P3):** remove `-webkit-backdrop-filter`
  (`glass.css:326`); move `-webkit-scrollbar` under the `@supports not(scrollbar-color)` guard
  (`utilities.css:111-137`); raw `rgb(255 255 255)` highlights → `--highlight-overlay` token
  (`instrument-rail.css`). Keep `-webkit-background-clip:text` (load-bearing).
- **Fragile (`[sty-fragile]`):** the 5 findings are **slides-only** (edge-zone vw traps, cqx-floor
  squish, Slide06/09 grid ratios, z-index fragmentation) — none glass-ui-facing. Route to the
  sibling digest.

---

## 6. Risks & coordination

**Publish-blocking vs deferrable.**
- **Publish-blocking (W3) is DONE** — strict-templates keystone, vueuse-free-root, peer-optional,
  the 3 a11y sites all green at HEAD (PROGRESS.md). The dock-MOTION overhaul is **NOT
  publish-blocking** in the original plan but the user has made it the W8 headline; it ships in
  3.3.0. The keyframes.js `AnimationGroup` LIGHT-surface dependency is the only new coupling —
  verify the value.js-free boundary holds (`[kf-engine]` KF-DYNAMIC-IMPORT-BOUNDARY: a dock driver
  using `SpringProgress` but no `fromString` has ZERO value.js in-bundle).
- **Deferrable:** `proof:webgl-golden` (documented), `useDockMagnify`, `useCanvas2D`, the
  component splits (W10 polish), Drawer `:native` (FOLD-IF W9).

**keyframes.js coordination (cross-repo, inv-16).** The spring solver, `springLinearStops`,
`AnimationGroup`, and `ElementMorph` are all **READ-ONLY upstream** at HEAD — glass-ui consumes
the published surface; no keyframes.js change is required for the overhaul (`[kf-engine]`
KF-ZERO-ALLOC-GROUP-STEADY: D.W4's zero-alloc group is a keyframes.js deliverable, not a
glass-ui gate). The `<Role>Dock` base-component leverage is **glass-ui AU.W8-owned**, not
keyframes' (`[kf-engine]` deferred item — keyframes D.W5 *consumes* the published 3.3.0 dock).

**AT / slides coordination.** AU publishes 3.3.0 → slides F.W9 bumps `^3.2.0 → ^3.3.0` and the
dock-lag fix lands downstream (`[recap-prompts]` FG-W-DOCKANIM). The dock motion fix is
**AT-owned/glass-ui-owned**, NOT slides-local — slides consumes post-publish. `progress-de-dock`
is **already clean** (`[progress-de-dock]` PROG-001: `.deck-progress` is a sibling, not nested;
no glass-ui dependency) — no glass-ui work. The constellation dark-arm token fix is **slides-local**
(`[gap-constellation]` GU-CONST-002, `deck.css:891`) — NOT a glass-ui lift.

**Isomorphism risks.**
- The §1.3(A) single-frame sync defers refs by one rAF (~16 ms) — template is already bound to
  them, so a delayed update is safe standard Vue reactivity; **no API change** (`[shrink-fade-rootcause]` risk note).
- `interpolate-size` adoption may **double-animate** with the native VT path — must browser-test
  before landing (`[sota-interpolate-size]` deferred items).
- `--spring-dock` retune is isomorphic (same duration, different curve) — but the static
  `proof:dock-motion-parity` gate (`gates.mjs:43`) must still see both engines on one source.
- The visibility-fork (§1.2-4) is **LOAD-BEARING** — any `@starting-style`/`allow-discrete`
  rewrite must preserve the 3-state contract (active=immediate, leaving=paintable-through-fade,
  inactive=hidden-after) (`[dock-css-motion]` risk note).
- `dock-press-spring` must NEVER fold into the resize family — transform-only, must not touch
  surface-tier `[data-held]` fades (`[dock-css-motion]` dock-press-spring-orthogonal-motion-family).
