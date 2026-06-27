# BG-WS4 — Components · Demo · Encapsulation — SPEC (pass 1 · CONVERGED)

Branch `tranche/BG` @ `e78b63c6`. All claims source-verified at HEAD. Hardened from `SPEC-pass1.md` by folding the prototype results (the validated mechanisms) + the critique mustFix sets + resolving the contradictions. This workstream runs AFTER WS1 (routing/Transition), WS3 (unified blur), WS2 (dock-IA), WS5 (viz), WS6 (Siri) per the convergence order — so it ASSUMES routing, the dock gear-reach, and the viz studios are converged upstream, and the scroll-shrink/configurator/preview acceptance bars are paint-verifiable on a mounted, non-frozen shell.

**Convergence status (pass 1): 76%.** Every prototyped mechanism is VALIDATED (6/6 build-or-design-proven) and folded with its mustFix set, but each scored a `refine` verdict — the residual frontier is (a) Safari-26 second-engine capture, owed UNIVERSALLY (zero Safari verified at HEAD), (b) three cross-WS ownership/sequencing decisions the orchestrator must rule (WS1 scroll-shrink regression-root, WS2 gear hit-test co-land, WS10 de-shadcn material boundary), (c) one binding-metric sign-off (specimen occupancy axis), and (d) the ~11 specced-but-unprototyped waves (the carves, the no-legacy sweeps, the demo-DRY folds). See §8.

---

## 1 · GESTALT GOAL

ONE sentence: **the non-dock surface stops shipping mechanism-without-gestalt** — every register that was minted-and-orphaned (scroll-shrink, the configurator drawer, live previews, the liquid-enter mount recipe, the FLIP runner) gets WIRED to the axis the user actually reads, the ~4000-LOC motion zoo collapses onto its genuine atoms, and the encapsulation gate stops binding by a README marker and starts binding by structure.

The through-line root cause (named by every audit): **build-then-orphan**. The BD greenfield minted "the ONE engine" as prose-as-code, wired the simpler concrete leaf, and never deleted the abstraction — and no gate caught it because gates assert source-presence + barrel-export, not "in the live import graph / reads the right axis / paints the right gestalt." WS4 is the cure: cut the dead, wire the live, re-scope the gates onto structure and paint.

Four user-visible registers must read CORRECTLY on a fresh live capture (Chrome AND Safari 26), not gate-green:

1. **D4/C-SCROLLSHRINK** — a content-page title scales `1 → ~0.82` across the first `~160px` of `<main>` scroll, condensing-and-sticking (the iOS Large-Title collapse), driven by ONE shared `@keyframes` definition that card + page + hero all consume.
2. **D6/D7** — the configurator gear opens a working panel ON-screen: the Sheet top resolves to `0` (full-height, inset-floating), the gear hit-tests to itself, the dark toggle flips global mode.
3. **D11** — `/forms` shows a REAL `<Select>` on the select card and a REAL `<Slider>` on the slider card (per-STORY specimens), ≥45% occupancy (per the metric ruled in §2.3-A), ZERO `<canvas>` in the bento.
4. **C-LIQUID** — every restored register carries liquid-weight/inertia/bounce (the 12 laws), and the universal liquid-enter mount recipe is wired (not orphaned).

Plus the structural close: `proof:colocation` binds by STRUCTURE (the 3 root-composable violations fixed); every >500-line split lands its colocated leaves with gates following the composition; the dead headline engines are DEFINITION-ABSENT; ONE FLIP runner over the single `ElementMorph` atom (~310 LOC removed by the fold alone, the dead-cuts accounted separately); the spring table ≤6 rows; no `selectableChipVariants` alias; ONE demo framing chassis; the de-shadcn FORM band gate-locked.

---

## 2 · MECHANISM (the idiomatic, concrete approach — VALIDATED)

### 2.1 — Scroll-shrink: ONE `@keyframes` DEFINITION, per-surface timeline binding

**Prototype verdict: design-proven (58% refine).** The 4-keyframe→1 parameterization is source-confirmed byte-equivalent (the four collapse keyframes — `card-title-shrink` @ `CardHeader.vue:274`, `story-hero-shrink`/`-scroll-leave`/`-subordinate-fade` @ `story-hero.css:465-529` — ARE the identical from/to transform+opacity shape, differing only in endpoint scalars + element `position`). The "share ONE timeline" phrasing was correctly FALSIFIED: the card binds a NAMED `scroll-timeline: --card-scroll` on its own bounded scroll-port; hero/page bind the ANONYMOUS `scroll()` over `<main>`. They share one `@keyframes` DEFINITION, never one timeline.

The idiom:
- Mint ONE compositor-only `@keyframes title-collapse` parameterized on CSS vars `{--title-collapse-scale (1→~0.82), --title-collapse-lift (translateY toward a pinned slim bar), --title-collapse-opacity}` — NEVER `font-size`/`padding`/layout; the text lays out ONCE and is composited (the BB.W-CARD-COMPOSITE discipline already live in `CardHeader`).
- Three transform-shrink surfaces consume the ONE definition, each binding its OWN timeline + `animation-range: 0 160px`:
  - **card** → `--card-scroll` (its bounded port; KEEP for genuinely-bounded scroll-cards),
  - **page / hero** → the EXISTING `--demo-main-progress` named timeline (`dock-nav.css:201` on `.demo-main-scroller`), reached from page content via `timeline-scope` on a shared ancestor.

**FOLDED MUSTFIX (critique):**

- **(M1 · ease harmonization — binding C-LIQUID law)** Page/hero `.story-hero-shrink`/`-scroll-leave` ride bare `linear` (`story-hero.css:476,507`) while the card rides `--ease-cartoon-punch` (overshoot). Mint ONE shared `--scroll-shrink-ease` token and re-point all three onto it. RESOLVE the scroll-scrub overshoot question explicitly: a scroll-DRIVEN timeline maps progress→position monotonically, so a bezier overshoot reads as a *non-monotonic scrub* (the title briefly grows past 1.0 mid-scroll then settles) — DECISION: the scroll-shrink ease is a no-overshoot weighty curve (`--ease-out`-family, the spatial-on-scroll register), NOT cartoon-punch; the card's existing punch on its bounded port is the documented exception (a card with a short bounded range tolerates it). Without this the unify still violates C-LIQUID by shipping a dead `linear`.

- **(M2 · DIAGNOSE the regression BEFORE the named-timeline switch — sequencing gate)** The wave MUST first confirm LIVE whether an intermediate scroll container actually breaks anonymous `scroll()` resolution, or whether the C-SCROLLSHRINK regression is PURELY WS1's frozen shell (a frozen page never settles any timeline). This is a HARD-dep on WS1 landing. If the cause is the frozen shell alone, the wave is a PURE REFACTOR with NO user-visible delta and MUST be sequenced behind WS1 + state that plainly in the close notes — do NOT claim the named-timeline switch "is the regressed root" without a live A/B. The acceptance π (a real scrolled capture over a NON-frozen shell) is the only honest gate.

- **(M3 · CUT the start-rung re-point — unrequested scope)** DROP the `--chrome-title-rung` display-1→display-2 enlargement from the wave. The `1→0.82-over-160px` bar is ALREADY met at the HEAD display-1 rung; the re-point is unrequested, contradicts the user's "not giant on every page" directive, and enlarges the PRM static-fallback title for reduced-motion users. The start rung is the EXISTING heading/display-1 content-page rung (large enough that 0.82 reads, NOT the audacious mega that re-triggers "giant on every page", NOT the calm 38px rung where it's invisible) — verified, not re-tuned. If a larger rung is ever wanted it is a separate signed-off Chrome+Safari A/B, not folded here.

- **(M4 · SCOPE the fold to the genuine transform-shrink keyframes)** Fold ONLY `card-title-shrink` + `story-hero-shrink` (+ optionally `story-hero-scroll-leave`, the hero scroll-AWAY register the front-door pages KEEP) onto `title-collapse`. LEAVE the trivial pure-opacity `story-hero-subordinate-fade` (eyebrow/blurb fade) as its OWN keyframe — folding it forces per-consumer neutralization vars (the eyebrow-shrinks-0.82 footgun) and is the over-abstraction the brief condemns. If a future agent DOES fold it, the migration MUST preserve the positional multi-animation pairing (`animation: cluster-rise..., subordinate-fade ...` with `animation-timeline: auto, scroll()` / `animation-range: normal, 0 120px` AND `--title-collapse-scale:1` / `--lift:0` neutralized) — shown, not asserted.

- **(M5 · card half-fold decision)** RESOLVE the 1-global-3-local middle (the card binding the global keyframe while keeping 3 local choreography lanes is a KISS regression). DECISION: the card consumes the shared `title-collapse` DEFINITION via `--card-scroll` (one DRY win: the scalar shape is shared) but keeps its own choreography binding local — this is the `proof:webgl-substrate-single` precedent (shared atom, local composition). The `/styles`↔SFC coupling is justified by the ONE-keyframe-definition convergence bar; record it in `design-idioms.md`.

- **(M6 · `timeline-scope` necessity)** VERIFY the `timeline-scope: --demo-main-progress` addition is necessary before adding it — descendants of the declaring `.demo-main-scroller` are already in the named timeline's default scope, so the belt-and-braces scope may be redundant cargo-cult. Confirm with a live read or DROP it.

**Cross-engine + a11y fences:** behind `@supports (animation-timeline: scroll())` (Chrome 115+ ✅, Safari 26+ ✅, Firefox ❌ → graceful static-large fallback — the title paints at full size, never broken); the `useScrollProgress`/`scrollReader.ts` dual-path JS single-writer is the residual feature-detect-gated fallback; PRM keeps the terminal opacity, drops the transform (the universal a11y carve auto-strips `scale`/`translate` — the recipe MUST seat at endpoint, NOT mid-collapse). The `linear()` spring-curve legs (if any) carry the `@supports not(animation-timing-function: linear(0,1))` fallback (pre-Safari 17.2). The idiom is NOT homed in `design-idioms.md` (grep returns nothing) — this wave homes it.

**ACCEPTANCE (real-paint-π):** on a content page over a NON-frozen shell, scroll `<main>` ~160px → the title's computed `transform` resolves `scale(~0.82)` + a `translateY` toward a pinned slim bar (read on a REAL scrolled screenshot in BOTH Chrome AND Safari 26 — smooth-scroll defeats a sync `scrollTop` probe); CLS≈0 (`proof:no-layout-animation` green, static frame-0 reserve); ONE `@keyframes title-collapse` definition shared (gate-asserted, the 4→fewer keyframe count); PRM keeps terminal opacity / drops transform (no shrink, full title); Firefox static-large fallback paints. BUILD must pass (the prototype was BUILD=false — this is a real-impl close bar).

### 2.2 — Configurator drawer: ship overlay-positioning geometry as REAL CSS

**Prototype verdict: WORKED (build=true, est 92%; critique 58% refine).** The diagnosis is correct and the `top===0` proof is real (single live rect read is the falsifiable bar, NOT a CVA source check). The wiring is 100% SOUND (the `useConfiguratorOpen` singleton + `glass-ui-demo:toggle-configurator` event + Sheet `v-model:open` + the canonical `<DarkModeToggle>` on `useGlobalDark` — DO NOT touch). The defect is a positioning bug with a systemic root:

`sheetVariants` (`sheet/index.ts:25-40`) carries the side-keyed geometry as a Tailwind utility STRING (`inset-y-0 right-0 h-full w-3/4 ... sm:max-w-sm`) AND the base carries dead overlay-pad utilities (`px-(--overlay-pad-inline) py-(--overlay-pad-block)`). Live: the rendered element CARRIES the classes but the RULES do not exist in the loaded stylesheet (`inset-y-0:false` probed) → `position:fixed` falls to `top:806px` (= viewport height, static body-flow) → off-fold. Root: the demo `@source` set covers `src/components/**/*.vue` + `ui/_shared/*.ts` + `custom/**/*Variants.ts` but NOT `src/components/ui/**/index.ts` — the CVA home for every ui-family. Source gates see the correct CVA string + the rendered class → GREEN; only live paint catches the off-screen drawer — the canonical headless-green archetype.

The idiomatic gestalt fix (NOT a demo `@source` patch — that fixes only the demo): per BA.W-EMISSION, the overlay-positioning band moves into a SHIPPED `@layer`-correct recipe keyed `[data-slot]` + `data-side` in `src/styles/sheet.css`, in the `/styles` cascade.

**FOLDED MUSTFIX (critique) — the load-bearing corrections:**

- **(M1 · UNLAYERED positioning, NOT `@layer components`)** Ship the must-win positioning (`position: fixed`, `z-index`, side-keyed `inset-block`/`inset-inline-*`, `block-size`) as BARE UNLAYERED rules — MATCH the `select.css` collision-bound precedent (verified unlayered: `[data-slot="select-content"] { max-height: … }` sits OUTSIDE any `@layer`) and `drawer.css` (unlayered, documents the AZ.W-DOCK-RAIL cascade-win trap). `@layer components` LOSES to `@layer utilities` by layer order, so a stray emitted `top-0`/`inset-y-0`/`right-0` utility silently re-breaks the drawer. DROP the false "specificity 0-2-0 beats the utility" claim (untrue under Tailwind layers — layer order wins before specificity).

```css
/* src/styles/sheet.css — UNLAYERED (the select.css/drawer.css precedent) */
[data-slot="sheet-content"]                      { position: fixed; z-index: var(--z-modal); }
[data-slot="sheet-content"][data-side="right"]   { inset-block: 0; inset-inline-end: 0; block-size: 100%; inline-size: var(--sheet-content-inline-size); max-inline-size: var(--sheet-content-max-inline-size); }
[data-slot="sheet-content"][data-side="left"]    { inset-block: 0; inset-inline-start: 0; block-size: 100%; inline-size: var(--sheet-content-inline-size); max-inline-size: var(--sheet-content-max-inline-size); }
[data-slot="sheet-content"][data-side="top"]     { inset-inline: 0; inset-block-start: 0; }
[data-slot="sheet-content"][data-side="bottom"]  { inset-inline: 0; inset-block-end: 0; }
```

- **(M2 · width ownership — TOKEN, decided explicitly)** RESOLVE the width contradiction: the live width came out 448px=24rem (= the HEAD CVA `sm:max-w-sm`), NOT a consumer's `sm:max-w-md` — and a consumer width *utility* would itself die in the same `@source` gap. So a `sm:max-w-md` consumer class is NOT a real tuning seam (it's the same headless-death). DECISION: width is a TOKEN — `--sheet-content-inline-size` (default `75%`/`24rem-clamped`) + `--sheet-content-max-inline-size` (default `24rem`), read by the unlayered recipe. A consumer tunes width by OVERRIDING THE TOKEN on the content or an ancestor (the token-first axis, the `--glass-blur-*-radius` precedent), NEVER a utility class that silently dies. PresetEditor's `sm:max-w-md` is DELETED (it never won anyway); if the configurator wants 28rem it sets `--sheet-content-max-inline-size: 28rem`. Re-verify the live computed width matches the decided default.

- **(M3 · overlay-pad coordination — same root cause as BB.W-CARD-PAD)** The base CVA's `px-(--overlay-pad-inline) py-(--overlay-pad-block)` utilities are DEAD by the SAME `@source` gap — every Sheet/Dialog consumer relying on overlay-pad is silently un-padded (the configurator only survives because PresetEditor passes `p-0` + owns inner padding). FOLD the overlay padding into the shipped recipe (`padding-block`/`padding-inline` reading the same `--overlay-pad-*` tokens) so the BB.W-CARD-PAD golden ladder actually paints. Co-ordinate the token names with BB.W-CARD-PAD (do not fork). The `inset-y-0`/`right-0`/`h-full`/`w-3/4`/`px-`/`py-` literals are DELETED from the CVA (clean break — the CVA keeps only the side-keyed `border-*` + the `slide-in-from`/`slide-out-to` animation utilities + `glass-floating`, which DO emit via `tw-animate-css`).

- **(M4 · `proof:emission` overlay-band clause — build it, currently ABSENT)** ADD a clause to `scripts/proof-emission.mjs`: NO overlay-band on-screen positioning utility (`inset-*`/`top`/`right`/`bottom`/`left`/`h-full`/`w-*`/`px-(--overlay-pad-*)`/`py-(--overlay-pad-*)`) may survive in a content-scan-reachable CVA utility string for `ui/{sheet,dialog,drawer,popover}`. Born-RED on HEAD (`inset-y-0` in the sheet CVA). + a self-test bite (a synthetic re-pasted `top-0` reds). Without it the regression is unfenced.

- **(M5 · liquid-weight on the entrance — C-LIQUID law)** The drawer currently slides in flat on `sheet-animate` with no inertia/bounce. WIRE the spring opt-in (`useSpringMount` already exists) onto the restored configurator drawer entrance per BG.W-12-LAWS-UNIVERSAL — the enter rides a `--spring-*` register (the `useSpringMount`/`useFlip`-reconciled enter per BG.W-PRESS-MOUNT-RECONCILE, ONE enter mechanism), not a flat bezier slide.

- **(M6 · Safari 26 capture)** Capture a Safari 26 live read of `top===0` + `onScreen` (logical-property insets are baseline so risk is low, but risk #7 mandates a second-engine capture for every visual wave; only Chrome :5199 was verified).

The HIG nuance: at the partial detent the sheet floats inset with concentric corners; only the full detent attaches `top:0` opaque — for the configurator inspector the right-edge full-height panel resolves `inset-block: 0` (the convergence bar's "Sheet top resolves to 0"). Thread `surface="glass|veil|opaque"` + the W55 tint — never a per-instance `bg` fork (HIG: don't customize the sheet background). Mirror the audit onto `DialogContent` centering (`src/styles/dialog.css`, same unlayered posture). This ships in `/styles` → fixes the demo AND every consumer in one move.

**The gear hit-test half is WS2** (SidebarDock parks the gear in an inert/`pointer-events:none` layer until ~400ms hover-dwell AND over-fills its capped `contain` box so `elementFromPoint` returns the `<aside>`). WS4 owns the Sheet inset-root; WS2's dock-IA delivers the gear-reach. The "gear hit-tests to itself" acceptance predicate requires WS2 landed — **co-land, flagged as the #2 cross-WS coordination item (§8).**

**ACCEPTANCE (real-paint-π):** dispatch `glass-ui-demo:toggle-configurator` → `SheetContent` computed `top === 0` + `onScreen === true` (LIVE rect read, NOT a CVA source check), Chrome AND Safari 26; live computed `inline-size` matches the decided token default; `elementFromPoint(gear-center) === gear` (requires WS2 landed); `<DarkModeToggle>` click flips `useGlobalDark` (whole-app); the entrance resolves a `--spring-*` curve (not flat); `proof:emission` overlay-band clause green. Born-RED on HEAD (panel at top:806px).

### 2.3 — Live previews: per-STORY specimen registry + ONE dispatcher

**Prototype verdict: LIVE-VERIFIED (build=true, est 86%; critique 62% refine).** The core is proven: 12 cards → 12 DISTINCT specimen kinds (the "12 identical sliders" defect dead), the select card resolves a real `[role=combobox]/data-slot=select-trigger`, the slider card a real `[role=slider]/.glass-slider`, `canvasCount===0`/`openPortals===0` genuine. The per-STORY registry keyed at the SAME `cat/id` altitude as `SUBPATHS`, the single `v-if` `<StorySpecimen>` dispatcher (correct — compound controls can't be a `{component,props}` map), and the cheap=real / heavy=frozen-poster split match the spec.

The idiom:
- Mint `demo/stories/specimen-registry.ts` keyed by the SAME `cat/id` the `SUBPATHS` map uses (`forms/select → <Select>`, `forms/slider → <Slider>`, …), with a per-category fallback for un-registered stories (incremental, never a regression).
- Mint ONE `demo/stories/StorySpecimen.vue` dispatcher composing the REAL shipped primitive, bounded + `inert` + `pointer-events:none` + cqmin-scaled (the existing `SectionPreviewCard` discipline, KEEP).
- The specimen is the REAL interactive control for CHEAP categories (forms/display — a `<Select>` portal, a `<Slider>` are cheap); for HEAVY categories (substrates/dock/motion/viz) it is a STATIC poster/frozen-still (the existing device-free `auroraFallbackGround` data-URI). ZERO `<canvas>` in the bento is ABSOLUTE; the landing mounts ≤1 live GL context.

**FOLDED MUSTFIX (critique) — the load-bearing corrections:**

- **(M1 · occupancy honesty — DECIDE the binding metric, §2.3-A)** The ≥45% bar is met only on specimen-in-WINDOW (52-72%); window-in-CARD is 35-58% and dips <45% on ~5 forms cards; component-in-card is ~25-42%. **DECISION (the binding metric is specimen-in-WINDOW)** with a chassis fix: the binding `proof:bento-specimen` occupancy axis is *specimen fills its window* (≥45%, the aristotelian-proportion bar on the specimen's own frame), AND the `SectionPreviewCard` √φ window GROWS on content-light/blurb-heavy rows (`flex-grow` / taller `aspect-ratio` → window-in-card ≥~62%) so the component-in-card never dips into the "useless gray card" gestalt. Do NOT silently redefine the proof to whichever axis passes — the metric is NAMED here (specimen-in-window) and the chassis change is the honest fix for the card-level dip. Requires orchestrator sign-off on the named metric (§8 item).

- **(M2 · DRY — delete the dead scoped CSS)** DELETE the ~90 lines of now-dead `.specimen-*` scoped CSS in `SectionLanding.vue` (lines ~159-236) — unreachable after the rewire and duplicated verbatim in `StorySpecimen.vue` (the DRY regression the prototype introduced). The single home is `StorySpecimen.vue`.

- **(M3 · complete the clean-break)** DELETE `categorySpecimen` + the second `SpecimenSpec` interface + `previewKind` from `category-hero.ts` (now dead — two resolvers / two interfaces coexist). `category-hero.ts` keeps only `{icon, sectionHue, heroPalette, bgKind}`. No dual-resolver survives (the no-legacy law).

- **(M4 · HTML validity — the `<a>`-nests-`<button>` trap)** Real `<button>`-bearing controls (SelectTrigger, NumberFieldDecrement/Increment) now nest inside the `<a>` RouterLink (invalid content model, amplified to 12 compound controls). RESOLVE: render the card as a NON-`<a>` link (a `<div role="link">` + programmatic navigate, or the RouterLink `custom` slot with the nav on a non-anchor) so the nesting is legal — the `inert` specimen is decorative but the parser still reparents interactive descendants of an `<a>`. Verify no parser reparenting / event leakage in the live DOM.

- **(M5 · per-control paint-verify all 12 kinds)** Paint-verify the other 10 kinds (combobox/multi-select/number-field/toggle/toggle-chip/selectable-chip/label/textarea/input/switch) render a NON-EMPTY control — they are confirmed only by `data-kind`, not by paint (a stale binding paints an EMPTY control with a distinct kind — the silent-no-op trap). Register the `display` cheap category (the spec names it; SPEC §2.3) too.

- **(M6 · warm-not-gray — gestalt)** Verify the forms bento field paints WARM not gray (the prototype's own capture reads desaturated-gray). Even if the root cause is the `SectionPreviewCard --card-field-h` chassis (a WS3 seam), "reads gray" is a gestalt miss on the item that ships the forms landing — co-ordinate WS3 or fix the chassis tint here.

- **(M7 · Safari 26 capture)** Produce a Safari 26 paint capture (SPEC §7 risk 7 binding): `container-type:size` + `cqmin`/`cqh` + `inert` + the data-URI poster were all Chrome-only — the headless-green/Safari-broken trap.

- **(M8 · close the wave scope)** Build `proof:bento-specimen` (≥2 DISTINCT kinds per multi-story category — the "12 identical sliders" bite; the specimen key-set ⊆ the route-set; no surviving inline `#preview` body; `canvasCount===0` in the landing DOM). Wire the TWO front-door forks (BG.W-BENTO-FRONTDOOR-UNFORK: `intro.vue:105 .intro-cat-thumb` 34px glyph + `compositions/hero.vue .composition-scene-thumb`) onto the dispatcher — DELETE both glyph forks.

**ACCEPTANCE (real-paint-π):** `/forms` landing → a real `<Select>` on the select card + a real `<Slider>` on the slider card (DISTINCT specimens), ≥2 distinct kinds across the category, all 12 kinds render non-empty, specimen-in-window ≥45% AND window-in-card ≥~62% on content-light rows, `canvasCount===0`, GL-context-count ≤ budget, FCP within the lighthouse floor, the field reads WARM not gray, HTML-valid (no `<a>`-nests-`<button>`), Chrome AND Safari 26.

### 2.4 — The motion-layer collapse (~4000 LOC → atoms)

The genuine atoms already exist and stay: `useLiquidFlex` (≥6 consumers), the `MORPH_SIGNATURES` weld DATA table, `scrollReader.ts`, `useGooMorph` (live: Carousel/Pager/deck). The dead + duplicated:

**Dead → DEFINITION-ABSENT (clean break, no alias):**
- `useLiquidMorph.ts` (462L) — only ref is prose in `manifest.ts:883`.
- `useVizChoreography.ts` (424L) — ZERO refs anywhere.
- `useDockContextSilhouette.ts` (551L) — verified: AppSwitcher.vue composes `useBloomUp` (the silhouette is a comment only); only consumer is its own test. No re-home needed. Dock-dir file → COORDINATE with WS2; WS4's gate verifies absence, the deletion lands wherever reaches it first.
- `morph-field.css` (229L) — verify no live `.morph-*` consumer, then DELETE + its `@import`.

**`useMorphField` — gut the function, keep the data:** the `useMorphField()` FUNCTION (468L file) has ZERO call sites but is EXPORTED on the ROOT barrel (`src/index.ts:241`) AND its `MORPH_SIGNATURES` const is consumed by `useGooMorph.ts:43` + `useDockFission.ts:61`. Carve `MORPH_SIGNATURES` + the `Morph*` types into `src/composables/motion/morphSignatures.ts` (a pure data/types leaf); delete the dead runner; re-point the two consumers + `core/index.ts`; remove `useMorphField` (the function) from the root barrel — a clean-break public-surface removal (record the MIGRATION row). KEEP `MORPH_SIGNATURES` on the public surface (live consumers).

**BG.W-FLIP-ONE — ONE FLIP runner over the single `ElementMorph` atom (AMENDED).**

**Prototype verdict: PROOF-RUN (build=true, est 82%; critique 82% refine — a genuine gestalt fold).** `useLiquidReveal` (285L, 1× `new ElementMorph`), `useBloomUp` (507L, 2×), `useDockCtaReceive` (349L, 1×) each hand-roll the IDENTICAL `ElementMorph` + `springTimingFunction` rAF play-loop + PRM-snap + 3-channel (scale/opacity/blur) write — differing ONLY in direction (`1→0` reveal / `0→1` receive / `1→0` bloom) + `useBloomUp`'s 4th color channel + `useDockCtaReceive`'s `onReceived` handoff. Mint ONE `useFlip(source, dest, { direction, channels, onSettle })` that owns the rAF loop + spring sample + coupled channels (incl. optional 4th color + handoff); the three become thin direction/channel presets.

**FOLDED MUSTFIX (critique) — the SPEC AMENDMENT (load-bearing):**

- **(M1 · DROP "flipShared CONSUMED" — FALSIFIED)** Verified in the kf d.ts (`node_modules/.../*.d.ts:1359`): `flipShared(a,b,options): Promise<void>`, `FlipOptions={duration,timingFunction,transformOrigin}` — it is FIRE-AND-FORGET, transform-only, `Promise<void>`, with NO per-frame hook, so it CANNOT couple opacity/filter/4th-color/handoff. **AMEND the convergence bar + §4/§5:** DROP "`flipShared` CONSUMED" wherever it appears. REPLACE with "**`ElementMorph` is the single consumed atom; reveal/cta/bloom are thin presets over `useFlip`**". `flipShared` stays a verbatim `/motion` re-export (the `suite.ts:42` distribution-seam posture — a published kf symbol glass-ui re-exports, NOT glass-ui-dead-code). Any `proof:flip-one` gate asserts **ElementMorph-single-atom + trio-are-presets + the LOC delta**, NEVER "`flipShared` called by `useFlip`".

- **(M2 · LOC accounting — disjoint)** Correct the ledger: **~310 net LOC removed by the FLIP-ONE fold ALONE** (1141 reveal+bloom+cta → ~485 presets + ~346 `useFlip` core). The brief's "~700 LOC" requires the SEPARATE BG.W-DEAD-COMPOSABLE-CUT dead-cuts (`useLiquidMorph` 462 + `useVizChoreography` 424 + `useDockContextSilhouette` 551 + `morph-field.css` 229 + the `useMorphField` runner ~196). Keep the two accountings DISJOINT so FLIP-ONE is not over-credited. The convergence bar's "~700 LOC removed" is the UNION of FLIP-ONE (~310) + DEAD-COMPOSABLE-CUT (the dead runners), not FLIP-ONE alone.

- **(M3 · the binding LOCAL visual π — the headless-green trap)** Run `tests-visual/liquid-reveal.spec.ts` + `tests-visual/dockmorph-cta.spec.ts` over `useFlip` on a REAL GPU/browser, BOTH GREEN, before close. The 195-test unit suite (the `useBloomUp.test.ts` SUPERSET harness — 4th color channel + prime + field-resolution + reset + PRM, 10/10) proves coupling/snap/PRM but NOT the painted bloom frame-series (the trap the brief warns of 3×).

- **(M4 · Safari 26 frame-series)** Capture a Safari 26 frame-series of the reveal + cta bloom. The fold is pure transform/opacity/filter (Safari-safe by construction) but currently unverified on a second engine.

**Fence:** `useDragMorph` is NOT in this trio (it's the `Draggable`+`decayRest` gesture path, LIVE via `useTabDragMorph`/dock-shell). The dock-weld morph-engine re-point (`BG.W-MORPH-ENGINE-ONE` proper) is WS2's box-INVIOLATE scope — NOT WS4.

**BG.W-PRESS-MOUNT-RECONCILE:** `useLiquidPress` has 1 real consumer (Card.vue — fails ≥2); `useSpringMount` (DialogContent/SheetContent) overlaps `useLiquidReveal`'s bloom enter (Dialog has TWO enter mechanisms: `.glass-reveal` CSS + `useSpringMount` JS). Retire the bloom-enter onto the shared `useFlip` runner so Dialog/Sheet have ONE enter (keep `useSpringMount`'s drag-dismiss); land `useLiquidPress`'s 2nd binary consumer or fold it onto `useSpringPress` directly. This is the seam that also delivers §2.2-M5 (the configurator drawer's spring entrance).

**BG.W-SPRING-REGISTER-TIDY (9 → ≤6):** `SPRING_PRESETS` has 9 rows (verified: smooth/snappy/bouncy/gentle/dock/press + timeline-{head,fill,press}); the 3 `timeline-*` rows serve ONE consumer (`ScrubberTimeline.vue`) and mint 3 dead `--spring-timeline-*` CSS twins read by nothing. Drain them via the canon's OWN `motion-canon.md` P7 `SPRING_DEFAULTS_ALLOWLIST` (per-component register — do NOT invent a mechanism): re-point to `snappy`/`press` where within tolerance, else move to ScrubberTimeline-local constants. Regen tokens (`regen-spring-tokens.mjs` + `proof:spring-tokens-synced` stay green — the `(response,ζ)` table is the single source for both `--spring-*` and `--spring-*-duration`). KEEP `gentle` ζ=1.0 byte-frozen (`--ease-convergence` depends on overshoot==0). **CORRECTION (verified at HEAD):** the `springPresets.ts` comments are ALREADY BD-fresh (`BD.W-ANIM-IOS27-TUNE`: smooth 0.58, snappy 0.48, dock 0.68, press 0.2) — the spec's "fix 3 stale `(response,ζ)` doc comments" claim is itself stale at the canonical source. SCOPE the doc-comment fix to a VERIFY pass: confirm against HEAD and fix only genuinely-stale recitations (`scheme-spring.css:26-31`, `useSpringPress.ts`, `useDragMorph.ts` IF they still recite pre-BD values; do not edit the already-fresh `springPresets.ts`).

**BG.W-SCROLL-READER-UNIFY:** fold the lone outlier `useScrollProgress` (hand-rolls its own rAF + scroll-listener + RO) onto the shared `scrollReader.ts` core.

**BG.W-LIQUID-ENTRANCE-GENERAL — WIRE the dead recipe (OVERRIDE A-deadcode's delete):** `liquid-enter.css` (252L, `@import`ed by `glass.css`) is zero-wired but well-built; its own header names the mount surfaces it's FOR (cards/rows/controls/dock-modules/demo sub-sections). The C-LIQUID chronic (★★★★ "remember this always") + the candidate-wave name point to WIRE, not delete. Wire `.liquid-enter` onto its named mount surfaces on the `--i` `1/φ` stagger clock. **Binding fences:** this recipe must NOT add a 2nd `animation:` shorthand to `.scroll-build > *` (it would clobber `gl-page-build` — the WS1 routing-freeze seam); PRM-carved (fade-keeps/transform-drops); `linear()` spring curves get the `@supports not(animation-timing-function: linear(0,1))` fallback. The entrance system is ONE fragmented family across THREE registers — MOUNT (`.liquid-enter`) / SCROLL (`.scroll-build`+`.scroll-cascade`) / TRIGGER (`useFlip`) — that BG.W-LIQUID-ENTRANCE-GENERAL + BG.W-SCROLL-SHRINK-UNIFY + BG.W-FLIP-ONE collectively unify.

**ACCEPTANCE (real-paint-π):** `useLiquidMorph`/`useVizChoreography`/`useDockContextSilhouette` DEFINITION-ABSENT (grep + barrel-absent); `ElementMorph` is the single consumed FLIP atom (gate-asserted; `flipShared` stays a re-export, NOT asserted-called); ~310 LOC removed by the FLIP fold (line-delta recorded, disjoint from the dead-cuts); `tests-visual/liquid-reveal.spec.ts` + `dockmorph-cta.spec.ts` GREEN over `useFlip` on real GPU, Chrome AND Safari 26; spring table ≤6 rows + `proof:spring-tokens-synced` green; `liquid-enter` wired (a mount surface resolves the `--i` stagger, paint-captured, no `gl-page-build` clobber).

### 2.5 — Encapsulation: bind colocation by STRUCTURE; carve the >500 leaves

**Prototype verdict: PROVEN (build=true, est 88%; critique 80% refine — core VERIFIED-CORRECT).** Independently confirmed at HEAD: the name-regex + content-probe catch EXACTLY the 4 root files in the 3 target dirs (`configurator/{density.ts, useConfiguratorState.ts}` · `sortable-list/context.ts` · `watercolor-dot/useWatercolorBlob.ts`) — `density.ts:2` imports `createOptionalContext`, `context.ts:22` imports `createStrictContext` (both lowercase, both evade the name-regex, both caught by the content probe); a repo-wide grep confirms no over-pull.

`proof-colocation.mjs:62` enrolls dirs by `existsSync(README.md)` — the README-as-enrollment-MARKER. Re-derive `TARGET_DIRS` by STRUCTURE: a `custom/` dir is complex iff it has a `composables/` subdir OR ≥1 root-level composable/context module (the content-probe: imports a DI factory / matches `/^use[A-Z]|Context\.ts$/` / exports a composable) OR ≥N source files — KEEPING README as a clause-(d) REQUIREMENT (a flagged dir must ADD a README), not the enrollment key. This (a) forces `infinite-scroll`/`search`/`typewriter` to adopt the convention (add README + constants.ts), and (b) catches the 3 verified root-composable violations. Move each under `composables/` + re-point the package `index.ts` imports (clean break).

**FOLDED MUSTFIX (critique):**
- **(M1 · widen the structural predicate for lowercase DI modules)** `density.ts`/`context.ts` are lowercase and evade `isComposable` (`/^use[A-Z]|Context\.ts$/`) — the content-probe (detect a `createStrictContext`/`createOptionalContext` import or a composable export) is the catch; KEEP it as the load-bearing detector (the regex alone misses them). Self-test bite: a synthetic complex dir with a root composable + no README must RED.
- **(M2 · subpath fence)** Moving `useConfiguratorState.ts` does NOT break the published `@mkbabb/glass-ui/configurator` surface IF the package barrel re-exports it (the symbol is unchanged, only the internal import path moves) — run `verify-export-types` + `subpath-enumeration` after EACH move.
- **(M3 · reach the shared subtrees)** Widen the scan to REACH the shared `src/composables/{motion,glass,...}` subtrees where the dead-engine zoo lives (currently wholly outside the gate's walk) — so a future dead `useX.ts` minted-and-orphaned in `composables/motion` is reachable by the structural gate.

**The >500-line carves (WS4-owned subset — colocated leaves, gates FOLLOW the composition into the leaf, the `proof:webgl-substrate-single` precedent):**
- **createCanvasLifecycle.ts (695)** → 3 self-contained seams: `sizeBacking` (L37-123), the context-loss circuit-breaker, the IO/CV park observers. (`proof:offscreen-pause`/`proof:webgl-substrate-single` follow.)
- **useWebGPUCanvas.ts (606)** → the async device-acquisition / `device.lost` self-heal / configure leaves.
- **useGlassBackdropLuminance.ts (542)** → `ambientHueHistogram.ts` + `wcagLuminance.ts` (BG.W-AMBIENT-HISTOGRAM-LEAF).
- **SegmentedTabs.vue (512)** → `composables/useTabRovingFocus.ts` (the roving-tabindex keyboard machine, L289-432) + `composables/useTabResponsive.ts` (siblings of the 2 existing tab composables; BG.W-TABS-KEYBOARD-LEAF). The roving-tabindex contract is NOT gated on `:draggable` (every strip) — `proof:control-tokens`/`proof:aria-orientation` follow.
- **CarouselContent.vue (577) ≡ PagerDots.vue (509)** — byte-congruent goo-barbell scoped CSS (218 ≡ 193 lines). Externalize to `src/styles/motion/goo-barbell.css` (the `segmented-tabs.css` externalization precedent) — both SFCs drop <400 (BG.W-GOO-BARBELL-CSS).
- **timeline/ dir** (9 flat files, ~1300L inline CSS, NO composables/, NO constants.ts, NO README) → carve into the colocated sub-dir contract (composables/ + constants.ts + README + `src/styles/timeline.css` shared rail/marker/segment partial; BG.W-TIMELINE-ENCAPSULATE). `ContinuousMarkers.vue` (444) + `ScrubberTimeline.vue` (405) are the heavy SFCs.
- **Slider.vue** + other heavy-inline-CSS SFCs → externalize the recessed-track recipe to `styles/slider.css` (BG.W-SFC-CSS-PARTIAL-SWEEP); KEEP `[data-size]` arbitrary-bracket geometry inline (the BA.W-EMISSION structural-precompile rule).

**NO-SPLIT floor (recorded — do not contrive a split):** `useBloomUp.ts` (507, cohesive single FLIP composable — folds further via BG.W-FLIP-ONE), `api/index.ts` (505, barrel by public width). **GL byte-fence (ABSOLUTE no-split):** `metaball.wgsl.ts` (529), `metaball.frag.ts` (510), `flow-field.glsl.ts` (517), `mediums.glsl.ts` (495). **Out of WS4 scope:** `GlassDock.vue` (711), `useDockFission.ts` (604) → WS2; `useBlobSatellites.ts` (533), `useGooDotMatrix.ts` (508) → WS5.

**ACCEPTANCE (real-paint-π / gate):** `proof:colocation` binds by structure, REDs a synthetic root-composable+no-README dir, GREENs after the 3 moves + 5 new READMEs; `verify-export-types`/`subpath-enumeration` green post-move; every carved leaf <500L with the reader gates following the composition; goo-barbell/timeline/slider CSS externalized + both SFCs <500; the carve preserves the live paint (the externalized goo-barbell/slider recipes paint byte-identical — a π readback on Carousel/Pager/Slider).

### 2.6 — No-legacy sweep + demo-shell DRY

- **BG.W-CHIP-ALIAS-KILL:** `selectableChipVariants.ts` is a pure `export { chipVariants as selectableChipVariants }` alias. Delete the alias file; export `chipVariants`/`ChipVariants` under ONE canonical name from `selectable-chip/index.ts`; re-point `SelectableChip.vue:28` + `toggle-chip/index.ts:3`. **API break:** the type `SelectableChipVariants` is PUBLISHED on `@mkbabb/glass-ui/api:242` — bundle the api re-point (`ChipVariants`) + a MIGRATION row + re-run `verify-export-types`/`subpath-enumeration`.
- **BG.W-DEAD-TOKEN-SWEEP (careful — the gate IS the legacy):** `--corner-k-soft`/`--corner-k-sharp` (`theme/radius.css:91-92`) are unread superellipse k-rungs pinned ALIVE ONLY by `proof:squircle-language`'s mint-assert; `--corner-shape-card`/`--corner-shape-pill` resolve `round` (no-ops). Cut all four; drop the mint-assert clauses that pin them; RE-EXPRESS the load-bearing "cards stay round" policy via the gate's EXISTING negative guard (`glass.css` carries no `corner-shape` on `.glass-card`/`.glass-btn`) so the policy is PRESERVED, not weakened. KEEP the big-dock squircle `@supports`-gated policy intact. (`--panel-padding-roomy`/`--mask-fade-width`/`--card-spacing` already deleted — comments only.)
- **BG.W-DEMO-CHASSIS-CONSOLIDATE:** DELETE `DemoFrame.vue` + `demo-frame.css` (zero importers) + `StorySectionHeader.vue` (zero importers). Collapse to ONE framing chassis (`ShowcaseFrame`, 79 uses); fold the ~28-44 raw `rounded-card border bg-card shadow-cartoon` triplet sites onto it; strip the dead DemoFrame/story-cel narrative comments from `StoryPage`. Move `liquid-morph.css` (850, demo-only) out of `src/styles/` to `demo/` (the placement violation).
- **BG.W-MANIFEST-COLOCATE:** fold `manifest.ts`'s 4 parallel string-keyed maps (`CATEGORY_DEFAULT_BG:181`, `SUBPATHS:204`, `LANDING_SUBPATHS:337`, `LANDING_BLURBS:352`) onto the `s()` row (a row = a page); de-duplicate `StoryHero.vue`'s twice-rendered cluster block (fullBleed L350-372 ≡ Card L408-430) via a normalized mode. (`manifest.ts` itself stays — a row-per-page is defensible; only the parallel-map sprawl folds.) **Coordinate with §2.3:** the specimen-registry keys at the same `cat/id` altitude — fold them onto the SAME `s()` row, not a 5th parallel map.

### 2.7 — De-shadcn FORM gate (the WS4/WS10 boundary)

**Prototype verdict: PROVEN by running it (build=false on the gate-add — additive `.mjs`, see M7; est 86%; critique 73% refine).** HEAD is born-RED (9 violations), `--self-test` 6/6 PASS, `--post-fix` GREEN. The headline witness is REAL: `control-surfaces.css:153` `.input-pill:disabled { opacity: 0.5 }` (a zero-pixel token-first clear — `--opacity-disabled` is a real widely-read token resolving 0.5). The predicate is decidable, falsifiable, greenable, and the fence holds.

**Correct the brief's archaeology error:** `proof:no-shadcn-default` (BC.W-DESHADCN) EXISTS, is registered, and is FULLY GREEN at HEAD (the TOKEN/vocabulary census). The genuinely-unbuilt arm is the DECIDABLE PER-CONTROL FORM gate (`proof:de-shadcn`).

`proof:de-shadcn` (WS4-owned): a DECIDABLE predicate over the FORM family (Input/Textarea/Select/Checkbox/Switch/Slider/RadioGroup/NumberField/Combobox/TagsInput) asserting each control derives ALL six states (rest/hover/focus/active/invalid/disabled) from glass-ui tokens (`--control-surface-*`, `--glass-*`, `--focus-ring-shadow`, `--invalid-ring`) with a NAMED DENYLIST of shadcn-default recipes/classes — NOT "abrogate all" (the `data-[state]`/`slide-in-from`/`animate-in` grammar is glass-ui-INTENTIONAL liquid-reveal, fenced OUT). reka-ui stays the headless LOGIC substrate; glass-ui owns 100% of the paint.

**FOLDED MUSTFIX (critique) — the gate is NOT landed until these:**

- **(M1 · REGISTER the gate)** Add `id: "proof:de-shadcn"` to `scripts/gates.mjs` with the correct run-tag set (`local`+`ci` for the source predicate) so it runs in `proof:all`/`proof:full`/close — an unregistered gate is not landed and fails SPEC §5.
- **(M2 · land the residual clears in REAL source)** Flip `control-surfaces.css:153` `opacity: 0.5` → `var(--opacity-disabled)` (byte-equivalent), and apply the Combobox/TagsInput focus-within + TagsInput disabled arms to the actual SFCs (the prototype proved the predicate in-memory; `git status` shows zero source edits — land them).
- **(M3 · paint/e2e-verify the TagsInput `data-[disabled]` arm)** Confirm reka `TagsInputRoot` actually emits `data-disabled` at runtime (the silent-no-op binding trap) — a green gate over a non-painting class string is the exact headless-green failure this workstream exists to kill. Paint-verify the disabled TagsInput dims.
- **(M4 · resolve the Combobox/TagsInput "missing focus" scope — orchestrator decision)** Either KEEP it as de-shadcn (land the focus-within ring + verify it paints) or RESCOPE to WS10/a11y and DROP it from this gate's required matrix — do NOT ship a gate whose RED set is undecided. (§8 cross-WS item.)
- **(M5 · strengthen the FROM-TOKENS positive OR name the limitation)** Today an SFC-only state arm passes if merely denylist-clean (leans 100% on denylist completeness; a non-token transform arm slips through). State the lean as a NAMED gate clause and add a bite if feasible.
- **(M6 · owe the binding π twin)** Add `tests-visual/de-shadcn.spec.ts` at the wave level over Chrome AND Safari 26 — per-control computed-style readback of each required state in both modes (the source gate cannot certify the controls READ as glass-ui material in paint).
- **(M7 · confirm BUILD)** The reported `build=false` is the gate-add prototype's; confirm it is not attributable to this item (run typecheck; the additive `.mjs` is inert to the src-only build) and report the real cause.

**WS10 boundary (the #1 cross-WS coordination item, §8):** WS4 builds the GATE + sweeps residuals onto the glass/control-surface register. WS10 owns the DEEP from-first-principles control MATERIAL re-authoring (capsule switch; grouped-inset-list Select with checkmark gutter; iOS-26 `controlSize` tiers + vibrant-text-on-glass + `.interactive` press). The orchestrator MUST assign ownership so the work isn't double-built. If WS10 is sequenced AFTER WS4's close, WS4's gate is born-RED-with-allowlist and WS10 turns it fully green.

**ACCEPTANCE (real-paint-π / gate):** `proof:de-shadcn` REGISTERED + green (born-RED with the 9-violation set, residuals cleared in real source); the FORM family passes the per-control six-state-from-tokens predicate; the liquid-reveal grammar fenced OUT (not a false positive); the TagsInput disabled arm PAINTS (e2e-verified); `tests-visual/de-shadcn.spec.ts` per-control readback green, Chrome AND Safari 26; the Combobox/TagsInput focus scope DECIDED (kept-and-painting or rescoped-and-dropped).

---

## 3 · FILES TOUCHED (by cluster)

**Cluster 1 — restore the dead registers:**
- `src/styles/sheet.css` (NEW, UNLAYERED positioning + tokenized width + overlay-pad), `src/components/ui/sheet/index.ts` (CVA strip), `SheetContent.vue` (`:data-side`+`data-slot`), `src/components/ui/dialog/DialogContent.vue` + `src/styles/dialog.css` (mirror), `scripts/proof-emission.mjs` (overlay-band clause + bite), `PresetEditor.vue` (delete `sm:max-w-md`).
- `src/styles/scroll-choreography.css` / `demo/stories/story-hero.css` / `src/components/ui/card/CardHeader.vue` (ONE `@keyframes title-collapse` + `--scroll-shrink-ease` token), `demo/layout/AppShell.vue` (`timeline-scope` IF necessary), `StoryPage.vue`, `docs/precepts/design-idioms.md` (home the idiom).
- `demo/stories/specimen-registry.ts` (NEW), `demo/stories/StorySpecimen.vue` (NEW — the ONLY specimen-CSS home), `SectionLanding.vue` (rewire + DELETE ~90L dead `.specimen-*` CSS + non-`<a>` card), `demo/stories/category-hero.ts` (cut previewKind/categorySpecimen/SpecimenSpec), `SectionPreviewCard.vue` (window-grow on light rows), `foundations/intro.vue`, `compositions/hero.vue`, `scripts/proof-bento-specimen.mjs` (NEW gate).

**Cluster 2 — motion collapse:**
- DELETE `useLiquidMorph.ts`, `useVizChoreography.ts`, `useDockContextSilhouette.ts` (+ its test, WS2-coord), `morph-field.css`.
- `morphSignatures.ts` (NEW data leaf), `useMorphField.ts` (delete function), `useGooMorph.ts`, `useDockFission.ts`, `core/index.ts`, `src/index.ts` (barrel re-point + remove `useMorphField`).
- `useFlip.ts` (NEW over `ElementMorph`), `useLiquidReveal.ts`, `useBloomUp.ts`, `useDockCtaReceive.ts` (→ thin presets); `suite.ts` (`flipShared` stays a re-export).
- `useSpringMount`/`useLiquidPress` reconcile; `springPresets.ts` (drain 3 timeline rows — comments already fresh), `scheme-spring.css`, `regen-spring-tokens.mjs`, `ScrubberTimeline.vue`; `useScrollProgress.ts` → `scrollReader.ts`.
- `src/styles/glass/liquid-enter.css` (WIRE) + its mount-surface SFCs.

**Cluster 3 — encapsulation:**
- `scripts/proof-colocation.mjs` (structural derive + content-probe + reach shared subtrees + self-test bite); move `configurator/{useConfiguratorState,density}.ts`, `watercolor-dot/useWatercolorBlob.ts`, `sortable-list/context.ts` → `composables/` + index re-points + 5 new READMEs.
- carve leaves: `createCanvasLifecycle.ts`, `useWebGPUCanvas.ts`, `useGlassBackdropLuminance.ts`, `SegmentedTabs.vue`; `src/styles/motion/goo-barbell.css` (NEW, Carousel+Pager), `src/styles/timeline.css` (NEW) + timeline/ colocation, `src/styles/slider.css` (NEW).

**Cluster 4-6 — no-legacy / demo / de-shadcn:**
- DELETE `selectableChipVariants.ts`, `DemoFrame.vue`+`demo-frame.css`, `StorySectionHeader.vue`; `src/api/index.ts` (ChipVariants re-point), `MIGRATION.md`.
- `radius.css` (dead-token cut), `proof-squircle-language.mjs` (re-point clauses onto the negative guard).
- `manifest.ts` (map fold + specimen key onto s()), `StoryHero.vue` (de-dup).
- `scripts/proof-de-shadcn.mjs` (NEW) + REGISTER in `gates.mjs` + form-control residual clears (real source) + `tests-visual/de-shadcn.spec.ts`.

---

## 4 · BG.W-* WAVE BREAKDOWN (each carries its validated mechanism + real-paint-π bar)

**Restore (D4/D6/D7/D11):**
- **BG.W-SCROLL-SHRINK-UNIFY** — ONE `@keyframes title-collapse` (parameterized {scale,lift,opacity}), card/page/hero each bind own timeline; `--scroll-shrink-ease` no-overshoot token; START-RUNG = HEAD display-1 (no re-point); SCOPE = transform-shrink keyframes only (subordinate-fade stays separate); DIAGNOSE the regression-root LIVE first. HARD-dep WS1. Homes the idiom. π: real scrolled `scale(~0.82)` Chrome+Safari, CLS≈0, PRM-seats, Firefox-fallback. [58% → folds 6 mustFix]
- **BG.W-SHEET-INSET-ROOT** — overlay-positioning → SHIPPED UNLAYERED `[data-slot]+data-side` recipe (NOT @layer components); width = TOKEN; overlay-pad folded; `inset-y-0`+dead-pad deleted from CVA; `proof:emission` overlay-band clause + bite; spring entrance (`useSpringMount`). Mirror DialogContent. Co-land WS2 gear-reach. π: live `top===0`+`onScreen` Chrome+Safari. [58% → folds 6 mustFix]
- **BG.W-SPECIMEN-PER-STORY** — per-story registry + `<StorySpecimen>` dispatcher; real Select/Slider per card; heavy=frozen still; occupancy metric = specimen-in-window (≥45%) + window-grow chassis; non-`<a>` card; delete dead `.specimen-*` CSS + categorySpecimen/SpecimenSpec; `proof:bento-specimen`. π: 12 distinct kinds non-empty, warm-not-gray, zero-canvas, Chrome+Safari. [62% → folds 8 mustFix]
- **BG.W-BENTO-FRONTDOOR-UNFORK** — wire intro.vue + compositions/hero.vue onto the dispatcher; delete the 2 glyph forks.

**Motion collapse:**
- **BG.W-DEAD-COMPOSABLE-CUT** — useLiquidMorph + useVizChoreography (+ useDockContextSilhouette, WS2-coord) DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts`; delete `morph-field.css`; barrel re-point. (The dead-cut LOC, disjoint from FLIP-ONE.)
- **BG.W-FLIP-ONE** — ONE `useFlip` over the single `ElementMorph` atom; reveal/cta/bloom = thin presets; `flipShared` stays a re-export (NOT asserted-called); ~310 LOC fold. π: liquid-reveal.spec + dockmorph-cta.spec GREEN on real GPU, Chrome+Safari. [82% → folds the flipShared amendment + LOC + π]
- **BG.W-PRESS-MOUNT-RECONCILE** — useSpringMount bloom-enter onto the shared runner (ONE Dialog/Sheet enter, delivers the drawer spring); useLiquidPress 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** — 9→≤6 via motion-canon P7; drop dead `--spring-timeline-*` twins; VERIFY (not assume) stale doc comments — `springPresets.ts` already fresh. gentle ζ=1.0 frozen.
- **BG.W-SCROLL-READER-UNIFY** — fold useScrollProgress onto scrollReader.ts.
- **BG.W-LIQUID-ENTRANCE-GENERAL** — WIRE liquid-enter.css onto its named mount surfaces (OVERRIDE A-deadcode's delete); no `gl-page-build` clobber; PRM-carved; `linear()` fallback.

**Encapsulation:**
- **BG.W-COLOCATION-GATE-STRUCTURAL** — bind by structure + content-probe + reach shared subtrees; fix the 3 root-composable violations (4 files) + 5 READMEs + self-test bite; verify-export-types after each move.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** — carve createCanvasLifecycle + useWebGPUCanvas.
- **BG.W-AMBIENT-HISTOGRAM-LEAF** — carve useGlassBackdropLuminance → ambientHueHistogram + wcagLuminance.
- **BG.W-TABS-KEYBOARD-LEAF** — carve SegmentedTabs → useTabRovingFocus + useTabResponsive.
- **BG.W-GOO-BARBELL-CSS** — styles/motion/goo-barbell.css shared by Carousel≡Pager; π byte-identical paint.
- **BG.W-TIMELINE-ENCAPSULATE** — timeline/ into the colocation contract + styles/timeline.css.
- **BG.W-SFC-CSS-PARTIAL-SWEEP** — Slider recessed-track + heavy-CSS SFC partials; KEEP [data-size] inline.

**No-legacy + demo:**
- **BG.W-CHIP-ALIAS-KILL** — delete the alias + api re-point (ChipVariants) + MIGRATION + verify-export-types.
- **BG.W-DEAD-TOKEN-SWEEP** — cut --corner-k-*/--corner-shape-card/-pill; re-point proof:squircle-language onto the negative guard (round-policy PRESERVED).
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** — delete DemoFrame/StorySectionHeader; fold raw triplets onto ShowcaseFrame; move liquid-morph.css to demo/.
- **BG.W-MANIFEST-COLOCATE** — fold the 4 string-keyed maps + the specimen key onto the s() row; de-dup StoryHero cluster.

**De-shadcn:**
- **BG.W-DESHADCN-SWEEP** — `proof:de-shadcn` REGISTERED decidable per-control FORM gate + residual clear (real source) + π twin + TagsInput-paint-verify + WS10 boundary flagged.

**Cross-cutting law (binds every wave above, not its own wave):** BG.W-12-LAWS-UNIVERSAL — liquid-weight/inertia/bounce on ALL restored motion (the spatial leg on a `--spring-*` register, enter-bouncy/exit-no-overshoot); iOS-27 clean-glass register (coordinate WS3 for the warm-not-gray on the restored surfaces); cartoon-technicolor punch; √φ proportion (SectionPreviewCard — keep). Each restored register (drawer entrance §2.2-M5, scroll-shrink ease §2.1-M1, the specimen warmth §2.3-M6, liquid-enter §2.4) carries it explicitly.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR

Every visual wave closes against the `proof:ba-gestalt` VERDICT (capture-paths-resolve-on-disk floor) on a FRESH live capture by a reproduction the building agent did NOT author — NOT the per-mechanism source-green (the headless-green/visually-broken trap shipped 3×; live-π is `[local]` and does NOT block the tag — that's the structural root WS7 owns). **Chrome AND Safari 26 (the universal second-engine bar — owed UNIVERSALLY here, zero Safari verified at HEAD).**

- **Scroll-shrink:** §2.1 ACCEPTANCE — real scrolled `scale(~0.82)`+translateY over a NON-frozen shell, CLS≈0, ONE keyframe definition, PRM-seats, Firefox-fallback, BUILD passes, Chrome+Safari.
- **Configurator drawer:** §2.2 ACCEPTANCE — live `top===0`+`onScreen`, token width, spring entrance, `proof:emission` overlay-band green, `elementFromPoint(gear)===gear` (WS2), dark-toggle flips global, Chrome+Safari. Born-RED on HEAD (top:806px).
- **Live previews:** §2.3 ACCEPTANCE — distinct real Select+Slider, 12 kinds non-empty, occupancy per the named metric, zero-canvas, warm-not-gray, HTML-valid, Chrome+Safari.
- **Motion collapse:** §2.4 ACCEPTANCE — the 3 dead engines DEFINITION-ABSENT; `ElementMorph` single FLIP atom (`flipShared` a re-export, NOT asserted-called); ~310 LOC fold (disjoint from dead-cuts); liquid-reveal+dockmorph-cta π GREEN on real GPU Chrome+Safari; spring ≤6 + tokens-synced; liquid-enter wired (no gl-page-build clobber).
- **Encapsulation:** `proof:colocation` binds by structure, REDs a synthetic root-composable+no-README dir, GREENs after the 4 moves; verify-export-types/subpath-enumeration green; every carved leaf <500L + reader gates follow; goo-barbell/timeline/slider externalized + SFCs <500 + byte-identical paint.
- **No-legacy + demo:** `selectableChipVariants` DEFINITION-ABSENT + api re-pointed; dead corner tokens gone + round-policy preserved via the negative guard; `DemoFrame`/`StorySectionHeader` DEFINITION-ABSENT; ONE framing chassis.
- **De-shadcn:** `proof:de-shadcn` REGISTERED + green (residuals cleared in real source); FORM family passes the per-control six-state-from-tokens predicate; liquid-reveal grammar fenced OUT; TagsInput disabled arm PAINTS; π twin green Chrome+Safari; focus scope DECIDED.

---

## 6 · FOLDED / DEFERRED ITEMS

- **useDockContextSilhouette deletion** — dock-dir; OWNED by WS2. WS4 verifies absence; if WS2 doesn't reach it, BG.W-DEAD-COMPOSABLE-CUT absorbs it (AppSwitcher already uses useBloomUp).
- **BG.W-MORPH-ENGINE-ONE (dock-weld re-point)** — WS2's box-INVIOLATE scope. WS4 only carves the `MORPH_SIGNATURES` data leaf.
- **BG.W-VIZ-STUDIO-ADOPT** — re-homing blob/constellation/fourier onto VizStudio is WS5's viz scope; WS4's demo-chassis work is framing-chassis + manifest + dead-DemoFrame only.
- **BG.W-UNIFORM-LAYOUT-BUILDER** — the 9× `uniformBridgeWGPU` std140 packing → `defineUniformLayout(fields)`; edits 9 viz dirs WS5 is converging; DEFER to a coordinated WS4/WS5 follow.
- **WS4-owned >500 carves NOT in scope:** GlassDock.vue/useDockFission.ts → WS2; useBlobSatellites.ts/useGooDotMatrix.ts → WS5.
- **The deep de-shadcn control MATERIAL rebuild** (capsule switch / grouped-inset Select / controlSize tiers) → WS10. WS4 ships the GATE + residual clear only.
- **Top-bar scroll-progress rail** (`scroll(--demo-main-progress block)` invalid-CSS) → WS1's BG.W-SCROLL-PROGRESS-RAIL; WS4's scroll-shrink ADOPTS the same named-timeline binding strategy.
- **The start-rung enlargement** (display-1→display-2) — CUT from BG.W-SCROLL-SHRINK-UNIFY (§2.1-M3); a separate signed-off Chrome+Safari A/B if ever wanted.

---

## 7 · OPEN RISKS (post-fold)

1. **Scroll-shrink regression-root is undiagnosed.** The named-timeline switch may be a pure refactor with NO user-visible delta if the cause is purely WS1's frozen shell. HARD-deps WS1; the wave must DIAGNOSE live before prescribing (§2.1-M2). Falsifiable only on a real scrolled screenshot over a non-frozen shell.
2. **The Sheet recipe must be UNLAYERED** (the @layer-components placement re-breaks against a stray emitted utility — §2.2-M1); width-as-token must be re-verified live; the overlay-pad fold touches BB.W-CARD-PAD's token surface.
3. **FLIP-ONE's bar is ElementMorph-single-atom, NOT flipShared-consumed** (the convergence bar amended — §2.4-M1); the ~700 LOC is the UNION with the dead-cuts, not the fold alone; the binding LOCAL π must run on real GPU.
4. **Specimen occupancy metric needs orchestrator sign-off** (specimen-in-window vs component-in-card — §2.3-M1); the `<a>`-nests-`<button>` validity fix is load-bearing; the warm-not-gray gestalt may be a WS3-chassis seam.
5. **De-shadcn gate is NOT landed until REGISTERED + residuals-in-real-source + TagsInput-paint-verified** (§2.7-M1..M3); the Combobox/TagsInput focus scope is an undecided RED set the orchestrator must rule (WS10 boundary).
6. **Safari second-engine is owed UNIVERSALLY.** Zero Safari verification at HEAD; scroll-driven/`mask-composite`/`backdrop-filter:url()`/`container-type:size`/data-URI-poster are the Chrome-green/Safari-broken seam. Every visual wave needs a Safari 26 capture or it re-enters the trap. Surface to the orchestrator if no Safari is available to the build loop.
7. **Cross-WS sequencing:** scroll-shrink HARD-deps WS1; the "gear hit-tests to itself" predicate HARD-deps WS2; the de-shadcn MATERIAL half is WS10. The #1 coordination item is the WS4/WS10 ownership split (born-RED-with-allowlist if WS10 follows).
8. **Churn fences:** `gentle` ζ=1.0 byte-frozen; `selectableChipVariants` is a public /api type break; cutting `--corner-shape-card/-pill` must preserve the round-policy via the negative guard, not weaken it; the colocation moves must not break the published `/configurator` subpath (verify-export-types after each).

---

## 8 · CONVERGENCE LEDGER (the unconverged frontier — the next-pass brief)

| Item | Prototype | Critique | Folded | Residual |
|------|-----------|----------|--------|----------|
| SHEET-INSET-ROOT | build=true 92% | 58% refine | 6 mustFix (unlayered, token-width, overlay-pad, emission-clause, spring, Safari) | Safari capture; WS2 gear co-land |
| FLIP-ONE | build=true 82% | 82% refine | flipShared amendment, LOC disjoint, π bar | real-GPU π + Safari frame-series |
| COLOCATION-STRUCTURAL | build=true 88% | 80% refine | content-probe, subpath fence, reach subtrees, bite | (converged — execute) |
| SPECIMEN-PER-STORY | build=true 86% | 62% refine | 8 mustFix (occupancy-metric, dead-CSS, clean-break, `<a>`-validity, 12-kinds, warm, Safari, scope) | occupancy-metric SIGN-OFF; Safari |
| SCROLL-SHRINK-UNIFY | build=false 78% | 58% refine | 6 mustFix (ease, diagnose, cut-rung, scope, card-fold, scope-check) | regression-root DIAGNOSIS (WS1-dep); BUILD; Safari |
| DE-SHADCN | build=false 86% | 73% refine | 7 mustFix (register, real-source, paint-TagsInput, scope, positive, π, build) | focus-scope WS10 DECISION; π twin; Safari |

**Cross-WS coordination items (orchestrator MUST rule):**
1. **WS4/WS10 de-shadcn ownership** — gate (WS4) vs material rebuild (WS10); the Combobox/TagsInput focus RED set.
2. **WS2 gear hit-test co-land** — the "gear hit-tests to itself" predicate needs WS2's dock-IA.
3. **WS1 scroll-shrink sequencing** — the regression-root diagnosis depends on WS1's non-frozen shell.
4. **Specimen occupancy metric sign-off** — specimen-in-window (named here) vs component-in-card.

**The 76% honest gate:** all 6 prototyped mechanisms VALIDATED + folded; the 4 cross-WS items + the universal Safari-26 owe + the unprototyped sweep waves (the carves, no-legacy, demo-DRY) are the residual frontier. Develop the waveset out; the next pass closes the Safari captures, the orchestrator rulings, and the unprototyped-wave proofs.
