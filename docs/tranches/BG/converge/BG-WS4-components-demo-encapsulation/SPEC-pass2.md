# BG-WS4 — Components · Demo · Encapsulation — SPEC (pass 2)

Branch `tranche/BG` @ `e78b63c6`. ADVANCES `SPEC-pass1-converged.md` (76%) on the unconverged frontier — it does NOT restart. Read pass-1 §2 for the validated mechanisms; this pass folds the pass-2 fleet's LIVE diagnoses (which OVERTURN two open risks), the source corrections, the four orchestrator rulings (stated as REQUESTS with a recommended disposition), and the prototype targets whose failure would falsify the spec.

**What pass-2 resolves (the frontier closes):**
- **OPEN-RISK #1 (scroll-shrink regression-root) — RESOLVED LIVE.** The mechanism is WIRED and WORKS. Three independent agents live-confirmed `scale(0.82)` on overflowing pages; the "regression" is short-content pages not overflowing + a `smooth-scroll` sync-probe artifact, NOT the timeline. BG.W-SCROLL-SHRINK-UNIFY is reclassified a PURE DRY refactor.
- **OPEN-RISK #4 (specimen occupancy metric) — SHARPENED.** Pass-1's "specimen-in-window ≥45%" measures the `.specimen-fill` DIV (100% by construction = meaningless). The binding metric is re-named **component-in-window ≥45%** (the REAL control's painted bbox ÷ window).
- **The width-source contradiction — DECIDED** (token byte-preserves the LIVE computed width, re-read at execution).
- **The de-shadcn residual list — COMPLETED** (3 wells + 2 container controls, the CI-block trap, the atomic register+clear).
- **The Safari-26 owe — RULED feasible-as-proxy** (real Safari 26 is structurally infeasible in the build loop; the WebKit-engine proxy + a manual human gate).
- The four cross-WS coordination items + the WS3 cartoon-ink hostage seam.

---

## 0 · THE PASS-2 LIVE DIAGNOSES + CORRECTIONS (the load-bearing deltas)

### 0.1 — Scroll-shrink is WIRED and WORKS (OPEN-RISK #1 closed)

Three pass-2 agents live-verified on a genuinely-overflowing page (`/display/card`, `/motion/springs`): a REAL wheel/instant scroll of `<main>` to ~200px resolves `.story-hero-shrink` computed `transform = scale(0.82) translateY(-3.3px)` — EXACTLY the convergence bar. `animation-name: story-hero-shrink; animation-timeline: scroll(); animation-range: 0px 160px` is correctly wired (`story-hero.css:493-512`); the anonymous `scroll()` ALREADY resolves to `.demo-main-scroller` (there is NO intermediate scroll container between `.story-hero-shrink` and `<main>`). The card register is also live (`CardHeader.vue` `--card-scroll` named timeline, inner ScrollCards scroll).

**The "C-SCROLLSHRINK REGRESSED" is TWO non-mechanism causes:**
1. **Short single-story content pages don't overflow** (`/forms/select`: `scrollHeight === clientHeight === 900` → `scroll()` has zero range → no shrink). This is WS1's content/shell scope (the page must produce scroll range), NOT a WS4 timeline defect.
2. **`.smooth-scroll` defeats a synchronous `scrollTop` probe** (the §2.1 ACCEPTANCE artifact pass-1 warned of) — the earlier "frozen" read was a probe artifact, not a frozen shell.

**CONSEQUENCE (binding):** BG.W-SCROLL-SHRINK-UNIFY is a **PURE DRY refactor with NO user-visible delta** — the user-visible cure is WS1's (unfreeze/overflow the shell). The wave's honest deliverables are (a) the 4→1 `@keyframes` DRY fold, (b) the `--scroll-shrink-ease` no-overshoot token (replacing the dead bare `linear`), and (c) the **NEW D14 fold** (below). The named anonymous→`--demo-main-progress` switch is **DROPPED as cargo-cult** — the anonymous `scroll()` already resolves correctly; `timeline-scope` is unnecessary (verified: descendants of the declaring scroller are already in scope). The close notes MUST state plainly: "no user-visible delta beyond WS1's shell-overflow; the register was never broken, only starved." Do NOT claim the timeline switch "restored scroll-shrink."

### 0.2 — D14 folds INTO the scroll wave (NEW — was unrouted)

`scroll-choreography.css:238` carries `animation-range: calc(45% + var(--scroll-cascade-column-stagger, 60ms) * 0)` — a `%` + `time` mix that computes to `normal` → the `/foundations/colors` `.scroll-cascade--columns` entrance is DEAD (runtime-confirmed). PLAN.md:34 routes it to WS4 but pass-1 §2.1 covers only title-collapse. **FOLD it into BG.W-SCROLL-SHRINK-UNIFY** (same `scroll-choreography.css` surface): drop the `*0` stub, express the column stagger in `%` (the timeline unit) off `--col`, NEVER `ms` (a scroll timeline has no time axis). It is DISTINCT from WS1's top-bar `scroll(--demo-main-progress block)` invalid-CSS rail (WS1's BG.W-SCROLL-PROGRESS-RAIL).

### 0.3 — Sheet width is a re-read-at-execution token default

The CVA (`sheet/index.ts:32-34`) carries `inset-y-0 right-0 h-full w-3/4 sm:max-w-sm` on the `right`/`left` arms. `sm:max-w-sm` = `24rem` = 384px, but the LIVE rendered width is **448px** and `insetY0RuleExists: false` (the whole geometry band died in the `@source` gap). So the live 448px does NOT trace to the dead `sm:max-w-sm` — it traces to a PresetEditor-supplied class or `w-3/4` of the viewport. **DECISION:** the shipped recipe owns width as `--sheet-content-max-inline-size`, and the default is set to **byte-preserve the LIVE computed width** — read it live at execution (the pass-2 captures read 448px ≈ `28rem`; record the exact value from the live `getComputedStyle().inlineSize` after the dead utilities are stripped, then re-verify the new recipe reproduces it). The CVA `w-3/4`/`sm:max-w-sm`/`inset-y-0`/`right-0`/`h-full` literals + the dead `px-/py-(--overlay-pad-*)` are DELETED. PresetEditor's width class (whatever it passes) is DELETED.

### 0.4 — The de-shadcn residual list COMPLETED + the CI-block trap

`node scripts/proof-de-shadcn.mjs` at HEAD: **9 violations / 5 controls** (re-run, exact):
- **Input · Textarea · NumberField** `[well]` deny=`[opacity-literal]` — all three share the `.input-pill` register; the witness is `src/styles/glass/control-surfaces.css:153` `.input-pill:disabled { opacity: 0.5 }` (NOTE the `glass/` prefix — the gate header's bare `src/styles/control-surfaces.css` path does NOT resolve). Flip → `var(--opacity-disabled)` (byte-equivalent). **VERIFY at execution** that all three wells compose `.input-pill` so the ONE-line flip clears all three; if NumberField's increment/decrement buttons carry a SEPARATE `disabled:opacity-20` literal (`NumberFieldDecrement/Increment.vue`) the gate flags it, clear it too.
- **Combobox** `[container]` MISS=`[focus]` — add the `:focus-within` token ring (`--focus-ring-shadow`).
- **TagsInput** `[container]` MISS=`[focus, disabled]` — add `:focus-within` ring + the `data-[disabled]` arm.

**The CI-block trap (binding):** `gates.mjs` fails on `res.status !== 0`. Registering a born-RED gate with a `ci` tag breaks CI on the next push. **DISCIPLINE:** REGISTER `proof:de-shadcn` and LAND every residual clear in the SAME commit (born-GREEN at registration) — OR, if the orchestrator rescopes the Combobox/TagsInput focus RED set to WS10, drop those from the gate's required matrix so the registered gate greens on the 3 well-clears alone. A gate registered born-RED with `ci` is a self-inflicted CI break — forbidden.

### 0.5 — The specimen occupancy metric is component-in-window (SHARPENED)

Pass-1 named "specimen-in-window ≥45%". LIVE: `.specimen-fill` fills its window 100% by construction → the metric is meaningless (it measures the wrapper DIV, not the control). The REAL control (the `Button+Slider+Switch` stack, or per-story the real `<Select>`) occupies ~25-40% of the window. **DECISION:** the binding `proof:bento-specimen` occupancy axis is **component-in-window ≥45%** — the REAL rendered control's painted bounding-box ∩ window ÷ window. The `SectionPreviewCard` √φ window GROWS on content-light rows (`flex-grow` / taller `aspect-ratio`) so component-in-card clears the "useless gray card" gestalt. This SUPERSEDES pass-1 §2.3-M1's window-axis metric; it requires the orchestrator's re-sign-off (the axis is NAMED here, not silently swapped).

### 0.6 — Source corrections to pass-1 (folded)

- **DemoFrame.vue + StorySectionHeader.vue are BOTH clean zero-importer deletes.** The StoryPage `DemoFrame` references (L102, L149) are COMMENTS, not imports (verified) — resolves the risk-feasibility "StoryPage imports it" conflict in favor of clean delete + a dead-narrative-comment strip.
- **liquid-morph.css is genuinely demo-only.** The `--split-dx/--split-dy/--neck-t` vars useDockFission writes are read by the SEPARATE live library file `src/styles/dock/morph-bridge.css` (which STAYS), NOT by `liquid-morph.css` (the demo island recipe, `@import`ed only by `demo/demo.css:125`). The pass-1 "move to demo/" stands; the KISS-DRY coupling worry is resolved. (Low-value placement fix — keep but de-prioritize.)
- **morph-field.css delete is GREP-GATED.** It is `@import`ed at `index.css:180` AND bucketed in `critical-partition.mjs:75` (deleting needs BOTH manifest edits). `.morph-body/.morph-neck/.morph-field` are also touched by `curves.ts` + `dock/morph-bridge.css` — the delete is gated on a grep proving zero LIVE consumer (the `curves.ts`/`morph-bridge.css` refs resolve to comment or the dead `useMorphField` path). If a live consumer exists, morph-field.css is NOT orphaned and stays.
- **goo-barbell is a RECONCILE, not a pure extraction.** `CarouselContent.vue` `<style>` = 218L vs `PagerDots.vue` = 193L (a 25-line delta). The carousel/pager-specific selectors must be reconciled (scoped), and the `@supports not (filter: url(#x))` Safari fallback floors (`CarouselContent.vue:559`, `PagerDots.vue:468`) preserved byte-identical — the "byte-identical paint" π is the bar.
- **springPresets.ts comments are ALREADY BD-fresh.** SPRING-REGISTER-TIDY's doc-fix is a VERIFY pass on the SECONDARY recitations only (`scheme-spring.css:26-31`, `useSpringPress.ts`, `useDragMorph.ts` if still pre-BD) — do NOT edit the fresh canonical source.

---

## 1 · GESTALT GOAL (unchanged from pass-1, sharpened)

The non-dock surface stops shipping mechanism-without-gestalt. Four user-visible registers read CORRECTLY on a fresh live capture:

1. **D4/C-SCROLLSHRINK** — a content-page title scales `1 → 0.82` over the first `160px` of `<main>` scroll (the iOS Large-Title collapse), driven by ONE shared `@keyframes title-collapse` card+page+hero consume. **The register is already correct on overflowing pages; the wave is the DRY fold + the WS1 shell-overflow hand-off.**
2. **D6/D7** — the configurator gear opens a working panel ON-screen: Sheet `top === 0`, gear hit-tests to itself (WS2 co-land), dark toggle flips global mode.
3. **D11** — `/forms` shows a REAL `<Select>` on the select card + a REAL `<Slider>` on the slider card (per-STORY specimens), **component-in-window ≥45%**, ZERO `<canvas>`.
4. **C-LIQUID** — every restored register carries liquid-weight (the 12 laws); the universal `.liquid-enter` mount recipe is wired.

Plus the structural close: `proof:colocation` binds by STRUCTURE; the >500 carves land colocated leaves with reader-gates following; the dead engines are DEFINITION-ABSENT; ONE `useFlip` over the single `ElementMorph` atom; spring ≤6 rows; no `selectableChipVariants` alias; ONE framing chassis; the de-shadcn FORM gate REGISTERED + green.

---

## 2 · MECHANISM (pass-2 deltas only — pass-1 §2 carries the validated base)

### 2.1 — Scroll-shrink: DRY fold + the no-overshoot ease + D14 (NO user-visible delta)

The mechanism is correct (§0.1). The wave:
- Mint ONE compositor-only `@keyframes title-collapse` parameterized on `{--title-collapse-scale (1→0.82), --title-collapse-lift, --title-collapse-opacity}` — NEVER `font-size`/`padding`/layout (the BB.W-CARD-COMPOSITE discipline). Fold ONLY the genuine transform-shrink keyframes: `card-title-shrink` (scale-only @ ratio 0.695, the card binds its `--card-scroll` port + neutralizes `--lift`) + `story-hero-shrink` (scale 0.82 + translateY, page/hero bind anonymous `scroll()`). LEAVE `story-hero-subordinate-fade` (pure opacity) as its OWN keyframe (folding it forces the eyebrow-shrinks-0.82 footgun — pass-1 §2.1-M4).
- Mint `--scroll-shrink-ease` (a no-overshoot weighty `--ease-out`-family curve — a scroll-DRIVEN bezier overshoot reads as a non-monotonic scrub; cartoon-punch is FORBIDDEN on a scroll scrub). Re-point all three off the dead bare `linear`.
- **D14 (§0.2):** drop the `*0` stub at `scroll-choreography.css:238`; express the column stagger in `%` off `--col`.
- **DROP** the anonymous→named `--demo-main-progress` switch + `timeline-scope` (cargo-cult — verified unnecessary). START-RUNG = HEAD display-1 (no enlargement — pass-1 §2.1-M3).
- Fences: `@supports (animation-timeline: scroll())` + Firefox static-large fallback; PRM seats at endpoint (full title); the `linear()` legs carry the `@supports not (animation-timing-function: linear(0,1))` fallback.

**ACCEPTANCE:** on an OVERFLOWING content page, a REAL scroll (instant-behavior, smooth-scroll defeated) of `<main>` ~160px → title `transform` resolves `scale(~0.82)` + translateY (Chrome + WebKit-proxy); ONE `@keyframes title-collapse` shared (gate-asserted 4→fewer); CLS≈0; PRM full-title; Firefox static-large; the `/foundations/colors` cascade-columns entrance now ADVANCES (D14 fixed); BUILD passes. **Close note states the no-user-visible-delta truth.** HARD-dep WS1 for the user-visible cure (sequence after; the DRY fold itself is independent).

### 2.2 — Configurator drawer: the unlayered recipe + the re-read token width

Pass-1 §2.2 carries the validated fix. Pass-2 deltas:
- Width = `--sheet-content-max-inline-size`, default byte-preserving the LIVE computed width (re-read at execution per §0.3 — record the exact value, ~448px). Delete `w-3/4`/`sm:max-w-sm`/`inset-y-0`/`right-0`/`h-full` + the dead `px-/py-(--overlay-pad-*)` from the CVA; delete PresetEditor's width class.
- Ship UNLAYERED `[data-slot="sheet-content"][data-side]` real-CSS in `src/styles/sheet.css` (the `select.css`/`drawer.css` precedent — `@layer components` LOSES to `@layer utilities`). Fold the overlay-pad onto the BB.W-CARD-PAD token names (no fork). Mirror onto `DialogContent` + `src/styles/dialog.css`.
- ADD a `proof:emission` overlay-band clause (born-RED on the CVA `inset-y-0`) + a self-test bite.
- WIRE the spring entrance (`useSpringMount`, reconciled with `useFlip` per BG.W-PRESS-MOUNT-RECONCILE) — not the flat `sheet-animate` slide.
- **The gear hit-test half is WS2** (the gear `elementFromPoint` returns `<aside>` — co-land flagged §6).

**ACCEPTANCE:** dispatch `glass-ui-demo:toggle-configurator` → `SheetContent` computed `top === 0` + `onScreen === true` (LIVE rect read on :5173, Chrome + WebKit-proxy); live `inline-size` === the decided token default; entrance resolves a `--spring-*` curve; `proof:emission` overlay-band green; `<DarkModeToggle>` flips `useGlobalDark`; `elementFromPoint(gear) === gear` (WS2). Born-RED on HEAD (`top:900px`, `insetY0RuleExists:false`).

### 2.3 — Live previews: per-story registry + the component-in-window metric

Pass-1 §2.3 carries the validated core (12 distinct kinds, real Select/Slider, canvas=0). Pass-2 deltas:
- The binding occupancy axis is **component-in-window ≥45%** (§0.5) — measure the REAL control's painted bbox, NOT the `.specimen-fill` DIV. `SectionPreviewCard` √φ window grows on content-light rows.
- Render the card as a NON-`<a>` link (the `<a>`-nests-`<button>` reparenting trap, amplified to 12 compound controls — pass-1 §2.3-M4).
- Paint-verify ALL 12 kinds render NON-EMPTY (the silent-no-op trap); delete the ~90L dead `.specimen-*` CSS + `categorySpecimen`/`SpecimenSpec`/`previewKind` (clean break).
- **warm-not-gray is HOSTAGE to WS3** (§5): the desaturated-gray forms plates over salmon trace to the cartoon-ink chroma over-fire (`shadow.css:107`). Co-ordinate WS3; flag the hostage dependency.

**ACCEPTANCE:** `/forms` → real `<Select>` + real `<Slider>` (distinct), ≥2 distinct kinds/category, 12 kinds non-empty, component-in-window ≥45% + window-in-card ≥~62% on light rows, `canvasCount === 0`, GL-ctx ≤ budget, warm-not-gray (WS3-coord), HTML-valid, Chrome + WebKit-proxy.

### 2.4 — Motion collapse (pass-2 deltas)

- **`useVizChoreography` is double-claimed (WS5 deletes FIRST).** WS4's cut becomes verify-absence. The **Oscillator BOOK at `useVizChoreography.ts:78`** (a republish-gated DEFER-with-trigger by-name cross-repo ask) MUST migrate to the BG FOLD-LEDGER — assign the owner = the DELETER (WS5 if it lands first). Else it is a silent-drop the no-silent-drop floor forbids (§6).
- **`useMorphField` carve consumer-set = `useGooMorph.ts:43` + `useDockFission.ts:61` ONLY** (verified). The WS2-spec "GooFilter consumes useMorphField" claim is STALE (`GooFilter.vue:51` is comment-only). Gut the runner → `morphSignatures.ts` (data + types), keep `MORPH_SIGNATURES`/`Morph*` on the root barrel, remove the `useMorphField` function (MIGRATION row).
- **`morph-field.css` delete is GREP-GATED** (§0.6) + updates `index.css:180` + `critical-partition.mjs:75`. `proof:css-critical` stays green (the manifest union byte-complete).
- **FLIP-ONE unchanged** (pass-1 §2.4): ONE `useFlip` over the single `ElementMorph` atom; reveal/cta/bloom → thin presets; `flipShared` stays a verbatim `/motion` re-export (NOT asserted-called — confirmed fire-and-forget `Promise<void>`); ~310 net LOC (disjoint from the dead-cuts). The binding π is `tests-visual/liquid-reveal.spec.ts` + `dockmorph-cta.spec.ts` GREEN over `useFlip` on a real GPU.
- **`createCanvasLifecycle.ts` carve re-scopes against POST-WS5 source** (WS5 edits it first — deletes the legacy self-measure, threads `resolveBudgetDpr`). Re-measure line counts after WS5 lands; the BG.W-UNIFORM-LAYOUT-BUILDER scope SHRANK (fewer viz keep a bridge after the WGSL retire) — confirm before building.
- SPRING-TIDY / LIQUID-ENTRANCE / SCROLL-READER-UNIFY / PRESS-MOUNT-RECONCILE unchanged (pass-1 §2.4).

### 2.5 — Encapsulation (pass-2 deltas)

Pass-1 §2.5 carries the validated structural-derive. Pass-2 deltas:
- The colocation predicate stays CONSERVATIVE: bind by the content-probe (`createStrictContext`/`createOptionalContext` import detect — the load-bearing catch for the lowercase `density.ts`/`context.ts` evaders), KEEP README as clause-(d) requirement-not-key, cap the `≥N-files` clause to avoid over-pulling simple-but-multifile dirs the gate author intentionally excluded (the README-marker defense is a real counter-argument). Self-test bite: a synthetic root-composable + no-README dir REDs.
- `goo-barbell` is a RECONCILE (§0.6) — the byte-identical-paint π preserves the `@supports not (filter: url())` Safari floors.
- `createCanvasLifecycle`/`useWebGPUCanvas` carve re-scoped post-WS5 (§2.4).
- Run `verify-export-types` + `proof:subpath-enumeration` after EACH composable move (the `/configurator`, `/watercolor-dot` published-subpath fence).

### 2.6 / 2.7 — No-legacy + de-shadcn (pass-2 deltas)

- **CHIP-ALIAS-KILL bundles its api break ATOMICALLY** (pass-1): delete `selectableChipVariants.ts`, re-point `SelectableChip.vue` + `toggle-chip/index.ts` + `api/index.ts:242` (`SelectableChipVariants` → `ChipVariants`) + MIGRATION row + `verify-export-types`/`subpath-enumeration` — all in ONE diff (a clean break that books its own completion is not a clean break).
- **DEAD-TOKEN-SWEEP is ATOMIC**: DELETE `--corner-k-soft`/`-sharp` + `--corner-shape-card`/`-pill` AND drop `proof:squircle-language`'s pinning mint-asserts in the SAME diff, re-expressing "cards stay round" via the gate's EXISTING negative guard (preserve, don't weaken).
- **DEMO-CHASSIS-CONSOLIDATE**: `DemoFrame.vue` + `demo-frame.css` + `StorySectionHeader.vue` are clean zero-importer deletes (§0.6); fold the raw `rounded-card border bg-card` triplets onto `ShowcaseFrame`; move `liquid-morph.css` → `demo/` (low-priority placement fix).
- **DE-SHADCN-SWEEP**: REGISTER `proof:de-shadcn` + land ALL residuals in the SAME commit (§0.4, the CI-block discipline); e2e-paint-verify the reka `TagsInputRoot` emits `data-disabled` at runtime (the silent-no-op trap) BEFORE greening over the class string; `tests-visual/de-shadcn.spec.ts` per-control six-state readback; fence the `data-[state]`/`slide-*`/`animate-in` liquid-reveal grammar OUT.

---

## 3 · THE FOUR ORCHESTRATOR RULINGS (requested — recommended disposition)

1. **WS4/WS10 de-shadcn ownership + the Combobox/TagsInput focus RED set.** RECOMMEND: WS4 owns the GATE (`proof:de-shadcn` register + the 3 well-clears + Combobox/TagsInput `:focus-within` ring + TagsInput `data-[disabled]` arm onto the EXISTING glass/control-surface register); WS10 owns the DEEP material rebuild (capsule switch, grouped-inset Select, `controlSize` tiers) WITHIN the same predicate. KEEP Combobox/TagsInput focus IN de-shadcn (a missing `:focus-visible` is a six-state-coverage gap the gate's own predicate names) — do NOT ship a gate with an undecided RED set. The register+clear is ATOMIC (no born-RED `ci` registration).
2. **Specimen occupancy binding-metric.** RECOMMEND: ACCEPT **component-in-window ≥45%** (§0.5, the sharpened axis — NOT the meaningless fill-div-in-window) PAIRED with the `SectionPreviewCard` √φ window-grow for window-in-card ≥~62%.
3. **WS1 scroll-shrink sequencing.** RECOMMEND: ENFORCE (no decision needed — live-resolved §0.1). Sequence BG.W-SCROLL-SHRINK-UNIFY AFTER WS1; it is a NO-user-visible-delta DRY refactor; the close note states this.
4. **WS2 gear hit-test co-land.** RECOMMEND: BG.W-SHEET-INSET-ROOT ships the off-screen-Sheet fix (`top:900→0`) independently; the `elementFromPoint(gear)===gear` predicate co-lands with WS2's dock-IA.

**+ PROCESS RULING (Safari):** real Safari 26 is structurally INFEASIBLE in the build loop (the only automatable WebKit is playwright-1.60's bundled WebKit — a divergent proxy on exactly the bleeding-edge features in play: `animation-timeline:scroll()`, `container-type:size`+`cqmin`, `mask-composite`; the existing `webkit` project runs ONLY `safari-webgl.spec.ts`). RECOMMEND: (a) accept playwright-WebKit as the second-engine PROXY + widen the `webkit` project `testMatch` (`playwright.config.ts:117-119`) to the WS4 visual specs, documenting it is NOT real Safari 26; (b) gate the real-Safari pass to a MANUAL human step outside the automated loop. Do NOT carry an unmeetable "Safari 26 verified" residual on every visual wave. **+ the demo server: boot `:5173` (UP at HEAD) at the start of every execution session** — `:5199` (the gate default) is DOWN; the live-π owes resolve on `:5173`.

---

## 4 · FILES TOUCHED (pass-2 additions/corrections to pass-1 §3)

- **scroll-shrink:** `+ scroll-choreography.css:238` (D14 calc fix); DROP the `AppShell.vue timeline-scope` edit (cargo-cult).
- **sheet:** `src/styles/sheet.css` width default = re-read LIVE value (~448px / `28rem`), not pass-1's 24rem.
- **de-shadcn:** `scripts/gates.mjs` (register), `control-surfaces.css:153`, `ComboboxInput.vue`, `TagsInput.vue` (+ `NumberFieldDecrement/Increment.vue` IF flagged), `tests-visual/de-shadcn.spec.ts`.
- **motion cut:** `index.css:180` + `critical-partition.mjs:75` (morph-field.css manifest edits), the BG FOLD-LEDGER (Oscillator book migration).
- **carves:** re-measure `createCanvasLifecycle.ts`/`useWebGPUCanvas.ts` line counts POST-WS5.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (pass-2)

Every visual wave closes against `proof:ba-gestalt`'s capture-paths-resolve floor on a FRESH live capture (Chrome + the WebKit-engine proxy per §3). The pass-1 §5 bars hold, with these pass-2 sharpenings:
- **Scroll-shrink:** real scrolled `scale(~0.82)` over an OVERFLOWING shell (smooth-scroll defeated), D14 cascade advances, ONE keyframe, close-note states no-user-visible-delta.
- **Configurator:** live `top===0`, `inline-size` === re-read token default, spring entrance, `proof:emission` green.
- **Live previews:** component-in-window ≥45%, 12 kinds non-empty, warm-not-gray (WS3-coord).
- **De-shadcn:** REGISTERED + green (atomic register+clear), TagsInput disabled arm PAINTS, π twin per-control readback.
- **The WS3 hostage:** every WS4 `proof:ba-gestalt` verdict is hostage to the WS3 cartoon-ink chroma (`shadow.css:107` — the maroon cast under gear/dock/forms). Flag; the restored registers read broken until WS3 dials the cast toward near-black ink.

---

## 6 · FOLDED / DEFERRED ITEMS + CROSS-WS LEDGER (pass-2)

- **useVizChoreography deletion** — WS5 deletes FIRST (double-claimed); WS4 verifies absence; the **Oscillator BOOK (`useVizChoreography.ts:78`) migrates to the BG FOLD-LEDGER as a DEFER-with-trigger (republish-gated kf Oscillator), owner = the deleter.**
- **useDockContextSilhouette** — dock-dir, a 3-way chain WS6→WS2→WS4-verifies; NOT WS4's owned cut (AppSwitcher already uses `useBloomUp`).
- **createCanvasLifecycle / useWebGPUCanvas carves** — re-scope against POST-WS5 source (WS5 edits the lifecycle file + retires WGSL bridges).
- **BG.W-UNIFORM-LAYOUT-BUILDER** — scope SHRANK post-WS5; confirm before building.
- **liquid-morph.css → demo/** — demo-only confirmed; low-priority placement fix.
- **The deep de-shadcn control MATERIAL rebuild** → WS10 (within the `proof:de-shadcn` predicate).
- **WS3 cartoon-ink chroma** — the shared gestalt floor under all four WS4 registers; a WS3 token seam every WS4 ba-gestalt verdict is hostage to.

---

## 7 · OPEN RISKS (post-pass-2)

1. **Width default is a live re-read** — set it to the exact `getComputedStyle().inlineSize` after the CVA strip, re-verify the new recipe reproduces it (§0.3). A wrong default ships a re-sized drawer.
2. **morph-field.css orphan-status is grep-gated** — if `curves.ts`/`morph-bridge.css` carry a LIVE `.morph-body`/`.morph-neck` consumer, the file stays (§0.6).
3. **The de-shadcn one-line flip must clear all 3 wells** — verify Input/Textarea/NumberField all compose `.input-pill`; the increment/decrement may carry a separate `opacity-20` (§0.4).
4. **goo-barbell is a reconcile** — the 25-line delta + the `@supports` Safari floors must paint byte-identical (§0.6).
5. **Safari is a proxy** — the WebKit-engine proxy is NOT real Safari 26 on the bleeding-edge features; a manual human gate backstops it (§3).
6. **The WS3 cartoon-ink hostage** — every restored register reads broken until WS3 dials the cast back; the WS4 verdicts are not self-certifiable.
7. **The Oscillator book is a silent-drop risk** — if no owner is named at the useVizChoreography delete, the cross-repo defer is lost (§6).

---

## 8 · CONVERGENCE STATUS (pass-2)

Pass-1 was 76% (6 prototyped mechanisms validated; the residual = Safari, 4 rulings, 1 metric, the ~11 unprototyped sweeps). Pass-2 advances:
- **Resolved:** scroll-shrink diagnosis (no-user-visible-delta DRY refactor), the width-source decision, the de-shadcn residual completion + CI-block discipline, the component-in-window metric, the Safari proxy ruling, the D14 fold, the morph-field grep-gate, the DemoFrame/liquid-morph conflicts, the Oscillator-book migration.
- **Still owed (the prototype frontier, §below):** the build-and-paint proofs of the 5 riskiest slices + the scroll-shrink fold design-proof; the orchestrator's four rulings; the WS3 cartoon-ink coordination.

The prototype items whose failure would FALSIFY this spec are returned with the spec.
