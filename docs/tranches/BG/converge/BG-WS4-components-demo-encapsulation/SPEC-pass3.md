# BG-WS4 — Components · Demo · Encapsulation — SPEC (pass 3 · EXECUTION-READY)

Branch `tranche/BG` @ `fc61c3e7` (verified HEAD — one commit past the `e78b63c6` pass-2 base; the delta is a coordination doc only, ZERO WS4 source change, so every pass-2 source fact holds). This pass ADVANCES `SPEC-pass2-converged.md` (85%) on the unconverged execution frontier — it does NOT restart. Pass-2 §0-§9 carry the validated decisions; read them as the base. Pass-3 folds the EXECUTION-fleet's NEW findings (6 build-grounded deltas), corrects two mechanism claims the brief over-stated, names the 6 falsifying prototypes, and re-states the close as a build-out sequence.

**Convergence status (pass 3): 93%.** The residual to 100 is now purely executional: (a) the 6 load-bearing slices are build-proven by the prototype set (§10), not yet landed; (b) WebKit-proxy captures are owed on every visual wave (structurally proxy-only — §3 process ruling stands); (c) the WS3 cartoon-ink chroma hostage (`shadow.css:107`) under every WS4 `ba-gestalt` verdict; (d) the four orchestrator rulings remain RECOMMENDED pending sign-off (§3). No mechanism is unresolved — every wave has a concrete, build-grounded approach.

---

## 0 · THE PASS-3 ADVANCES (the NEW build-grounded deltas — fold ON TOP of pass-2 §0)

### 0.1 — Sheet off-screen ROOT-CAUSE is DISAMBIGUATED: the EMISSION class, NOT a transformed ancestor (the split-recipe is CORRECT)

The execution fleet split on two hypotheses for the live `top:900px` (= exact one-viewport offset) off-screen Sheet:
- **H-A (emission):** `findRule('.inset-y-0')` → "NOT FOUND" — the class is in the DOM but Tailwind never generated the rule (the content-scan/CVA-extraction miss; `right-0`/`h-full` generated because they appear elsewhere, `inset-y-0` appears ONLY in the library CVA string). With no top/bottom anchor, the `position:fixed` panel falls to its static-flow position 900px down.
- **H-B (transformed ancestor):** a `transform`/`filter`/`contain`/`will-change` portal ancestor establishes a containing block, so `position:fixed`+`top:0` no longer resolves against the viewport.

**RESOLUTION (the disambiguating experiment, build-decisive):** forcing `top:0; bottom:0` (or `inset-block:0`) INLINE on the open `[data-slot=sheet-content]` resolves it to `rect.y:0, bottom:900, onScreen:true` (codebase-deep, live). If H-B were true, an inline `top:0` would resolve against the transformed ancestor and STILL be off-screen — so the experiment **FALSIFIES H-B**: there is no `position:fixed`-breaking ancestor; the cause is purely the missing emitted anchor rule (H-A). **CONSEQUENCE:** the pass-2 §0.4 SPLIT-recipe (UNLAYERED structural inset + `@layer components` token width) is the CORRECT fix — it makes the anchor a first-principles `sheet.css` rule that cannot depend on a content-scan-reachable utility. The PROTOTYPE (§10-P1) re-runs the disambiguating experiment as the gate on the recipe: walk the open SheetContent's containing-block chain, confirm NO transformed/filtered/contain ancestor, confirm the recipe resolves `top===0`+`onScreen` all-4-sides, BEFORE trusting the mechanism. This closes pass-2 OPEN-RISK #1's residual (the fix-class was named but not root-cause-proven).

### 0.2 — De-shadcn carries a NET-NEW forced-colors mustFix (the WHC focus-invisible regression)

The pass-2 §0.8 de-shadcn clears add a `:focus-within` `box-shadow` ring to the Combobox `[container]` + TagsInput `[container]` wrappers. **Windows-High-Contrast / `@media (forced-colors: active)` STRIPS `box-shadow`** — and `a11y-overrides.css:78-90` restores a real `outline: 2px solid Highlight` ONLY for `.input-pill:focus`/`:focus-visible` (verified — the block's selector set is `.input-pill` only). The NEW Combobox/TagsInput rings are NOT in that set → they VANISH under forced-colors, shipping a keyboard-focus-invisible regression in WHC (the exact class the `.input-pill` block was written to kill). **mustFix (atomic with the de-shadcn commit):** extend the `a11y-overrides.css:78-90` outline selector set to cover the Combobox/TagsInput `:focus-within` wrappers (ONE block, the SAME `Highlight` rung — the glass-language single-path the comment names), AND add a `@media (forced-colors: active)` arm to `tests-visual/de-shadcn.spec.ts` asserting the two wrappers compute a non-`none` `outline` on focus. This is the seventh de-shadcn clear, not a separate wave.

### 0.3 — FLIP-ONE: `flipShared` CANNOT drive the fold — the ONE runner is the shared ElementMorph-INVERSION core (the brief's claim is corrected)

The brief + web-sota recommend "consume the kf `flipShared`." The execution analysis FALSIFIES the literal reading: kf `flipShared(a,b,opts): Promise<void>` is a FORWARD, fire-and-forget, transform-only play that owns its own internal NumericAnimation driver and exposes NO per-frame callback. The three FLIP presets need (a) the INVERSE play (`ElementMorph(settled→source)`, spring 1→0), (b) THREE per-frame coupled channels (transform + opacity + `filter` blur, plus BloomUp's color/ambient-hue leg), (c) velocity-continuous interrupt, (d) PRM single-paint snap. A Promise-await one-shot expresses none of these. `useLiquidReveal.ts:30` already records: "do NOT use flipShared's forward play here (the wrong direction)." **DECISION (corrects the brief, sharpens pass-2 §0.10):** the ONE runner is `useFlip` — a thin internal core that wraps the `ElementMorph`-inversion + `springTimingFunction` + the rAF/PRM/cleanup the three presets ALREADY hand-roll identically, exposing a single `onFrame(t, channels)` hook the presets feed their coupled legs into. `flipShared` STAYS a verbatim `/motion` re-export (the distribution seam, `suite.ts:42`), NEVER asserted-called. The convergence bar is "**`ElementMorph` is the single CONSUMED atom within `src/composables/motion/`; reveal/cta/bloom are thin presets over `useFlip`**" — NOT "flipShared consumed." The `~700 LOC` figure is the UNION with the DEAD-CUT (useLiquidMorph 462 + the 3×~120 boilerplate dedup ≈ 310 net from the FLIP fold alone); the two are DISJOINT accounting. PROTOTYPE §10-P3 build-proves `useFlip` can express the inverse-3-channel-interruptible-PRM play (one preset rebased + the JS-fold π green) BEFORE the ~700-LOC removal is trusted.

### 0.4 — Spring-tidy is PRESETS-IN-CONSUMERS, not fold-onto-base (the timeline curves are distinct)

`SPRING_PRESETS` has 9 rows: the 6 canonical (smooth/snappy/bouncy/gentle/dock/press — each ↔ a `--spring-*` CSS family) + `timeline-head`/`timeline-fill`/`timeline-press` (JS-ONLY, no CSS family, SINGLE-consumer `ScrubberTimeline.vue`). `timeline-press` is a "press +4.6%" TUNING — a genuinely distinct curve, NOT motion-equivalent to `press`. **DECISION (sharpens pass-2 §2.4):** do NOT fold the 3 timeline rows onto base rows (that would change the scrubber's motion). MOVE them to a `ScrubberTimeline`-LOCAL spring map (presets-in-consumers — the MEMORY idiom: a per-component register lives in its consumer, the library's own table is its identity), DROPPING them from the global `SPRING_PRESETS` → the table is 6 rows. The dead `--spring-timeline-{head,fill,press}` CSS twins + their `-duration` twins (`scheme-spring.css`, read by NOTHING — ScrubberTimeline routes through the JS table) are DELETED in the same diff. `regen-spring-tokens.mjs` re-generates `scheme-spring.css` from the 6-row table + re-snapshots `proof:spring-tokens-synced` (generator-bound, not hand-edited); `gentle` ζ=1.0 stays byte-frozen. The π no-visible-motion-delta on the scrubber/progress fill (risk-scan #8) is the bar — the move is curve-preserving by construction (the SAME row, relocated), so the π is a regression check, not a re-tune.

### 0.5 — Colocation: the `isComposable` regex fix + the CALIBRATED threshold (catch exactly 3, over-pull zero)

The gate enrolls by README presence (`proof-colocation.mjs:62`); `sortable-list/context.ts` (lowercase) ALSO escapes the gate's `/Context\.ts$/` capital-C regex. A NAIVE structure-flip surfaces ~30 violations (timeline/labeled-field/sortable-list/instrument-chassis/metric-stack/search/infinite-scroll/typewriter would all demand READMEs+constants the gate author DELIBERATELY avoided over-pulling). **DECISION (sharpens pass-2 §2.5):** the structural predicate enrolls a dir as complex IFF it has **≥1 ROOT composable** (a root `use*.ts` OR a `createStrictContext`/`createOptionalContext` content-probe hit OR a lowercase `context.ts` — fix the regex to `/[Cc]ontext\.ts$/`) — NOT "≥N files" (the README-marker defense against over-pulling simple-but-multifile dirs is real; KEEP README as a clause-(d) REQUIREMENT-not-key). This calibrates to EXACTLY the 3 confirmed root-composable violation dirs: `configurator/{density.ts, useConfiguratorState.ts}`, `sortable-list/context.ts`, `watercolor-dot/useWatercolorBlob.ts` — and pulls in ZERO of the multi-SFC-but-no-root-composable dirs. The 3 moves → `<dir>/composables/`, re-point the package `index.ts` (the published `/configurator` + `/watercolor-dot` subpath fence), run `verify-export-types` + `proof:subpath-enumeration` after EACH move. Self-test bite: a synthetic root-composable-no-README dir REDs. (`watercolor-dot/prng.ts` should fold onto the shared `utils/prng` per CLAUDE.md §utils — a low-priority rider, NOT gated by colocation.)

### 0.6 — Gate-FOLLOWS-the-carve: two file-scoped gate paths must move in lockstep (the silent-red trap)

Two carves edit files a gate reads BY PATH; the carve must re-point the gate path or the gate reds on a green-looking carve:
- **`BG.W-TIMELINE-ENCAPSULATE`:** `proof-no-layout-animation.mjs`'s `TRANSITION_ALLOWLIST` is FILE-SCOPED to the `.vue` paths (`ContinuousRail.vue` L240-245 `transition:width/left`, `ScrubberTimeline.vue`, `SegmentedTimeline.vue`). Moving the `transition:width/height/left` legs from the `.vue` into `styles/timeline.css` BREAKS those entries. **DECISION:** KEEP the discrete-reclaim `transition` legs INLINE in the `.vue` (they are the file-scoped allowlist entries by design); move only the non-transition decorative CSS to `styles/timeline.css`. The colocation/encapsulation win is the `composables/` + `constants.ts` + the bulk recipe externalization, NOT the allowlisted transition legs.
- **`BG.W-CANVAS-LIFECYCLE-LEAVES`:** `proof-offscreen-pause.mjs:45` reads `SUBSTRATE: createCanvasLifecycle.ts` for F1/F4/G1 (the content-visibility hook, the `matchMedia` reduced-motion re-monitor, the `off-screen-io` reason key). If those hooks move into a carved leaf, RE-POINT the gate's `SUBSTRATE` path (the "asserts follow the composition into the carved leaf" precedent). Re-measure `createCanvasLifecycle.ts` (695 at HEAD, last touched BD-P5) against POST-WS5 source AT BUILD-TIME — WS5's specs converged but may not have LANDED (the tranche runs WS5 before WS4 per the sequencing, but parallel execution is possible); if WS5 has not edited it, WS4 owns the carve against the 695-line HEAD shape.

### 0.7 — The Oscillator BOOK has a LIVE owner (no silent-drop)

The `useVizChoreography` delete (WS5-first, double-claimed) orphans "THE Oscillator BOOK" (`useVizChoreography.ts:~78`, kf cross-repo ask #6, the LIGHT-Oscillator loop-clock defer). **DECISION:** the book's LIVE owner is the `useEasingPicker` loop-playback seam — CLAUDE.md §EasingPicker already records "the keyframes.js LIGHT `Oscillator` slots into the `loop` playback seam when it ships (a named-successor consume)." So the book does NOT silent-drop: at the `useVizChoreography` delete, the WS5 deleter migrates the book to the BG FOLD-LEDGER as a republish-gated defer POINTING at the existing `useEasingPicker` booking (the no-silent-drop floor is satisfied by the re-home onto a live booking, not a new orphan). WS4 verifies the migration landed; `proof:crossrepo-asks` stays green.

---

## 1 · GESTALT GOAL (carried from pass-2 §1 — unchanged)

The non-dock surface stops shipping mechanism-without-gestalt. Four user-visible registers read CORRECTLY on a fresh live capture (Chrome + WebKit-proxy; manual real-Safari gate):

1. **D4/C-SCROLLSHRINK** — a content-page title scales `1→0.82` over the first `160px` of `<main>` scroll, ONE shared `@keyframes title-collapse` (card 0.695 / page 0.82 via `--title-collapse-scale`). Already correct on overflowing pages; the wave is the DRY fold + the WS1 shell-overflow hand-off (NO user-visible delta beyond WS1's cure + the card's new no-overshoot scrub).
2. **D6/D7** — the configurator gear opens a working panel ON-screen: Sheet `top===0` + on-screen + spring entrance, gear hit-tests to itself (WS2 co-land), dark toggle flips global mode.
3. **D11** — `/forms` shows a REAL `<Select>` on the select card + a REAL `<Slider>` on the slider card (per-STORY specimens), component-in-window ≥45%, ZERO `<canvas>`.
4. **C-LIQUID** — every restored register carries liquid-weight (the 12 laws); the universal `.liquid-enter` mount recipe is wired.

Plus the structural close: `proof:colocation` binds by STRUCTURE (3 root-composable violations fixed); the >500 carves land colocated leaves with reader-gates following; the dead engines are DEFINITION-ABSENT; ONE `useFlip` over the single motion-dir `ElementMorph` atom; spring ≤6 rows; no `selectableChipVariants` alias; ONE framing chassis; the de-shadcn FORM gate REGISTERED born-GREEN.

**The Liquid-Glass content-fence (the cross-cutting reference law — reference agent):** glass paints on CHROME (dock, configurator Sheet, nav) ONLY; the bento preview windows, the form wells, the story bodies are PAPER/material. A glass-on-glass preview reads as the gray mush the user condemned. This ONE fence resolves the gray-card defect, the de-shadcn "function not form" ask, and the iOS-27 fidelity bar simultaneously — bind it on every WS4 surface.

---

## 2 · MECHANISM (pass-3 = pass-2 §2 + the §0 advances above)

Pass-2 §2.1-§2.7 carry the validated base mechanism. The pass-3 deltas (apply ON TOP):

- **§2.1 Scroll-shrink:** unchanged from pass-2 §2.1 (2→1 keyframe fold, `--scroll-shrink-ease` no-overshoot, `--card-shrink-ease` deleted, externalize to global `card-scroll.css`, D14 `%`-off-`--col`, drop the cargo-cult anonymous→named switch). HARD-dep WS1 for the user-visible cure.
- **§2.2 Configurator drawer:** the SPLIT recipe is CONFIRMED correct by the §0.1 root-cause disambiguation. + the §0.2 forced-colors arm rides the de-shadcn wave (the Sheet itself has no focus ring, but the disambiguation experiment is the recipe's gate). Width default = LIVE re-read reconciled across 3 consumers; Dialog mirror 3-way cascade live A/B; spring entrance wired; `proof:emission` overlay-band born-GREEN.
- **§2.3 Live previews:** unchanged (per-story registry, component-in-window ≥45%, stretched-link sibling, 12 kinds non-empty, canvas=0); warm-not-gray HOSTAGE to WS3.
- **§2.4 Motion collapse:** + the §0.3 correction (the ONE runner is the ElementMorph-inversion `useFlip`, NOT `flipShared`); + the §0.4 spring-tidy is presets-in-consumers (timeline map → ScrubberTimeline-local, table→6); + the §0.7 Oscillator owner; + the §0.6 createCanvasLifecycle re-measure + gate-path re-point.
- **§2.5 Encapsulation:** + the §0.5 calibrated colocation predicate (`/[Cc]ontext\.ts$/` regex fix, ≥1-root-composable enrollment, README clause-(d)-requirement, 3 dirs); + the §0.6 TIMELINE-ENCAPSULATE keeps allowlisted transition legs inline.
- **§2.6/§2.7 No-legacy + de-shadcn:** + the §0.2 forced-colors seventh clear (atomic with the de-shadcn commit).

---

## 3 · THE FOUR ORCHESTRATOR RULINGS + PROCESS (carried from pass-2 §3 — RECOMMENDED, pending sign-off)

1. **WS4/WS10 de-shadcn ownership + the Combobox/TagsInput focus RED set.** WS4 owns the GATE (`proof:de-shadcn` register + the 3 well-clears + the stepper rung + Combobox/TagsInput `:focus-within` ring + the focus+invalid precedence + the forced-colors arm + TagsInput `data-[disabled]`); WS10 owns the DEEP material rebuild (capsule switch, grouped-inset Select, `controlSize`) WITHIN the same predicate. Atomic register+clear, no born-RED `ci`.
2. **Specimen occupancy binding-metric.** ACCEPT component-in-window ≥45% (the REAL control bbox) PAIRED with the `SectionPreviewCard` √φ window-grow for window-in-card ≥~62%.
3. **WS1 scroll-shrink sequencing.** ENFORCE. `BG.W-SCROLL-SHRINK-UNIFY` is a NO-user-visible-delta DRY refactor sequenced AFTER WS1 (beyond WS1's cure + the card's new monotone scrub).
4. **WS2 gear hit-test co-land.** `BG.W-SHEET-INSET-ROOT` ships the off-screen fix independently; `elementFromPoint(gear)===gear` co-lands with WS2's dock-IA.

**+ PROCESS (Safari):** real Safari 26 is structurally INFEASIBLE in the loop. Accept playwright-WebKit as the second-engine PROXY (widen the `webkit` project `testMatch`, `playwright.config.ts:117-119`, to the WS4 visual specs, documenting NOT-real-Safari-26); gate the real-Safari pass to a MANUAL human step. Do NOT carry an unmeetable "Safari 26 verified" residual. **Boot `:5173` (UP) at the start of every execution session** — `:5199` (the gate default) is DOWN; the live-π owes resolve on `:5173`.

---

## 4 · FILES TOUCHED (pass-3 = pass-2 §4 + the deltas)

Pass-2 §4 carries the file list. Pass-3 ADDS/SHARPENS:
- **de-shadcn forced-colors:** `src/styles/utilities/a11y-overrides.css:78-90` (extend the outline selector set to the Combobox/TagsInput `:focus-within` wrappers), `tests-visual/de-shadcn.spec.ts` (a `@media (forced-colors: active)` arm).
- **spring-tidy:** `springPresets.ts` (DROP the 3 timeline rows from the array + the union type), `ScrubberTimeline.vue` (NEW local spring map for head/fill/press), `scheme-spring.css` (regenerated — drop the dead `--spring-timeline-*` + `-duration` twins), `regen-spring-tokens.mjs` (re-run), `proof-spring-tokens-synced` snapshot (re-snap).
- **colocation:** `proof-colocation.mjs` (the `/[Cc]ontext\.ts$/` regex fix + the ≥1-root-composable structural predicate + the self-test bite), the 3 moves + their `index.ts` re-points (`configurator/index.ts`, `watercolor-dot/index.ts`).
- **gate-follows-the-carve:** `proof-no-layout-animation.mjs` `TRANSITION_ALLOWLIST` (verify the `.vue` paths still resolve after TIMELINE-ENCAPSULATE — keep legs inline), `proof-offscreen-pause.mjs:45` (re-point SUBSTRATE if the hooks move).
- **flip:** `useFlip.ts` is the ElementMorph-inversion core (NOT a flipShared wrapper) — sharpens the pass-2 `useFlip.ts` entry.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (pass-3 = pass-2 §5 + the deltas)

Pass-2 §5 holds. Pass-3 ADDS:
- **De-shadcn:** + the per-control six-state π AND a `@media (forced-colors: active)` arm asserting the Combobox/TagsInput `:focus-within` wrappers compute a non-`none` `outline` on focus (the §0.2 WHC regression-guard). + the TagsInput `data-[disabled]` e2e-PAINT (a disabled specimen computes `opacity` per `--opacity-disabled` + `cursor:not-allowed`; an enabled one stays `opacity:1`).
- **Sheet:** + the §0.1 disambiguating gate — the open SheetContent's containing-block chain carries NO transformed/filtered/contain ancestor (asserted live) AND the recipe resolves `top===0`+`onScreen` all-4-sides; BottomDock `inline-size` live re-read ≤18rem.
- **FLIP-ONE:** the binding π is `dockmorph-cta.spec` (real-GPU, test-1 GREEN proven, test-2 cascade OWNED-not-greened-over) + a NEW JS-fold π exercising `useFlip` directly (the inverse-3-channel frame-series) + `useFlip.test.ts` (SSR/no-rAF guard, per-direction PRM snap, settle-unclamped/depart-clamped blur asymmetry). `liquid-reveal.spec.ts` (CSS recipe, ZERO `useFlip`) is DROPPED from the FLIP-ONE binding set.
- **Spring-tidy:** a π no-visible-motion-delta on the scrubber/progress fill across the 9→6 move (regression check — the relocated rows are curve-identical).
- **The WS3 hostage:** every WS4 `ba-gestalt` verdict is hostage to `shadow.css:107` (`--cartoon-ink: oklch(from var(--foreground) clamp(0.14,l,0.18) max(c,0.11) h)` — the `max(c,0.11)` chroma floor → red-maroon cast). Flag on every visual verdict; the restored registers read broken until WS3 dials the cast toward near-black; WS4 cannot self-certify.

---

## 6 · FOLDED / DEFERRED ITEMS + CROSS-WS LEDGER (pass-3 = pass-2 §6 + sharpenings)

- **useVizChoreography deletion** — WS5 deletes FIRST (double-claimed); WS4 verifies absence; the Oscillator BOOK migrates to the FOLD-LEDGER as a republish-gated defer POINTING at the LIVE `useEasingPicker` loop-seam booking (§0.7), owner = the WS5 deleter.
- **useDockContextSilhouette** — dock-dir, WS6→WS2→WS4-verifies; NOT WS4's owned cut. FLIP-ONE's clause is motion-dir-SCOPED so it does NOT depend on this delete (verified: `useDockContextSilhouette` is in `dock/composables/`, OUTSIDE `src/composables/motion/`).
- **createCanvasLifecycle / useWebGPUCanvas carves** — re-measure at BUILD-TIME against actual source (WS5 may not have landed; HEAD is 695/606) + re-point `proof:offscreen-pause` SUBSTRATE if hooks move (§0.6).
- **BG.W-UNIFORM-LAYOUT-BUILDER** — DEFER-coordinate-with-WS5 (the 9 `uniformBridgeWGPU.ts` std140-packing copies); if WS5 also touches them, WS4 holds.
- **liquid-morph.css → demo/** — demo-only confirmed; low-priority placement fix.
- **The deep de-shadcn control MATERIAL rebuild** → WS10 (within the `proof:de-shadcn` predicate).
- **WS3 cartoon-ink chroma** (`shadow.css:107`) — the shared gestalt floor under all four WS4 registers; every WS4 `ba-gestalt` verdict is hostage to it.
- **dockmorph-cta test-2 cascade** — a WS2/WS3/WS10 co-land (the dock-control base `transition` vs the `[data-cta-pending]` PRM carve); OWNED, resolved-not-greened-over.
- **goo-barbell "worm" enhancement** — `BG.W-GOO-BARBELL-CSS` is a RECONCILE (the 25-line Carousel≡Pager delta, byte-identical-paint π, `@supports not(filter:url())` Safari floors preserved). The liquid-weight "Google-deck worm" bridge-blob between adjacent pager dots is a CHECK-then-enhance-if-absent rider (the `pager-goo` mount already exists per CLAUDE.md); fold the enhancement into `BG.W-12-LAWS-UNIVERSAL` only if the dots don't already morph.

---

## 7 · OPEN RISKS (post-pass-3)

1. **Sheet root-cause** — §0.1 falsified the transformed-ancestor hypothesis via the inline-`top:0` experiment, but the PROTOTYPE must re-confirm on the BUILT recipe (a regression could re-introduce a `contain`/`transform` ancestor in the portal chain). The split-recipe is correct IFF the chain stays clean.
2. **Width default is a live re-read** — set `--sheet-content-max-inline-size` to the exact `getComputedStyle().inlineSize` AFTER the CVA strip; re-verify all 3 consumers (configurator ~28rem, BottomDock ≤18rem, containers story) reproduce their width.
3. **The Vue scoped-keyframe hash** — externalize the card binding to global `card-scroll.css` or BUILD-GREP-prove `title-collapse` un-hashed, or the card shrink silently dies (the trap that shipped 3×).
4. **De-shadcn atomic born-GREEN + the forced-colors arm** — re-base on clean BG, confirm 9→exit-1→0, register in ONE commit; the stepper rung + Combobox precedence + TagsInput `data-disabled` e2e-paint + the forced-colors outline are the false-clean/regression catches.
5. **FLIP-ONE flipShared-cannot-drive** — §0.3 corrected the mechanism; the PROTOTYPE must build-prove `useFlip` (ElementMorph-inversion) drives the inverse-3-channel-interruptible-PRM play BEFORE the ~700-LOC removal. If it can't couple the 3 channels, the fold is a regression.
6. **Colocation over-pull** — §0.5 calibrated to ≥1-root-composable (not ≥N-files); a mis-calibration surfaces ~30 false violations. The self-test bite + the verify-export-types-per-move are the guards.
7. **WS3 cartoon-ink hostage** — every WS4 visual verdict reads broken until WS3 lands `shadow.css:107`; co-ordinate, do not self-certify.
8. **Safari is a proxy** — playwright-WebKit is NOT real Safari 26 on `animation-timeline:scroll()`/`container-type:size`/`mask-composite`; the manual human gate backstops it.
9. **Gate-follows-the-carve** — TIMELINE-ENCAPSULATE (keep transition legs inline) + CANVAS-LIFECYCLE-LEAVES (re-point SUBSTRATE) must not red a green-looking carve (§0.6).

---

## 8 · BG.W-* WAVE BREAKDOWN (pass-3 = pass-2 §8, with the sharpenings inlined)

**Restore (D4/D6/D7/D11):**
- **BG.W-SCROLL-SHRINK-UNIFY** — ONE `@keyframes title-collapse`; fold ONLY 2 keyframes; `--scroll-shrink-ease` no-overshoot (card gets a NEW monotone scrub, `--card-shrink-ease` deleted); externalize the card binding → global `card-scroll.css` (no scoped hash, BUILD-GREP un-hashed); D14 `%`-off-`--col`; DROP the cargo-cult anonymous→named switch; START-RUNG = HEAD display-1. HARD-dep WS1.
- **BG.W-SHEET-INSET-ROOT** — the §0.1-confirmed SPLIT recipe (UNLAYERED structural inset / `@layer components`+token width); width default = LIVE re-read across 3 consumers (BottomDock ≤18rem); CVA geometry deleted; `proof:emission` overlay-band born-GREEN + bite + DEFERRED_PARTIALS; spring entrance; Dialog mirror (3-way cascade live A/B); co-land WS2 gear-reach.
- **BG.W-SPECIMEN-PER-STORY** — per-story registry + `<StorySpecimen>` dispatcher; real Select/Slider per card; heavy=frozen still (device-free `auroraFallbackGround`); component-in-window ≥45% + window-grow chassis; STRETCHED-LINK sibling card; delete dead `.specimen-*` CSS + categorySpecimen/SpecimenSpec/previewKind; `proof:bento-specimen`.
- **BG.W-BENTO-FRONTDOOR-UNFORK** — wire `intro.vue` + `compositions/hero.vue` onto the dispatcher; delete the 2 glyph forks.

**Motion collapse:**
- **BG.W-DEAD-COMPOSABLE-CUT** — useLiquidMorph (+ useVizChoreography WS5-first, + useDockContextSilhouette WS2-coord) DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts` (vue-free, lines 96-161); keep ONLY MORPH_SIGNATURES/MorphSignature/MorphSignatureName/MorphVector on the barrel (drop 4 dead types + the fn from `src/index.ts` + `proof-consumers-static`); delete `morph-field.css` (grep-gated) + manifest/comment reconcile + MIGRATION row + rm empty dir.
- **BG.W-FLIP-ONE** — ONE `useFlip` = the ElementMorph-INVERSION core (§0.3 — NOT flipShared); reveal/cta/bloom = thin presets feeding `onFrame` coupled channels; SSR/cta-edge faithful; clause motion-dir-SCOPED born-GREEN-after-dead-cut; `flipShared` a re-export NOT asserted-called; ~310 net LOC.
- **BG.W-PRESS-MOUNT-RECONCILE** — useSpringMount bloom-enter onto the shared runner (ONE Dialog/Sheet enter, delivers §0.6's drawer spring); useLiquidPress 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** — §0.4: MOVE the 3 timeline rows to a ScrubberTimeline-LOCAL map (presets-in-consumers, NOT fold-onto-base); table→6; drop dead `--spring-timeline-*` twins; regen + re-snap; gentle ζ=1.0 frozen; π no-motion-delta.
- **BG.W-SCROLL-READER-UNIFY** — fold useScrollProgress onto scrollReader.ts.
- **BG.W-LIQUID-ENTRANCE-GENERAL** — WIRE liquid-enter.css onto its named mount surfaces; no `gl-page-build` clobber; PRM-carved; `linear()` fallback.

**Encapsulation:**
- **BG.W-COLOCATION-GATE-STRUCTURAL** — §0.5: the `/[Cc]ontext\.ts$/` regex fix + the ≥1-root-composable structural predicate + README clause-(d)-requirement + self-test bite; fix the 3 root-composable violations (4 files) + verify-export-types/subpath-enumeration after each move.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** — §0.6: carve createCanvasLifecycle (BUILD-TIME re-measure) + useWebGPUCanvas; re-point `proof:offscreen-pause` SUBSTRATE if hooks move.
- **BG.W-AMBIENT-HISTOGRAM-LEAF** — carve useGlassBackdropLuminance → ambientHueHistogram + wcagLuminance (value.js import moves WITH the histogram leaf so `proof:single-color-core` follows).
- **BG.W-TABS-KEYBOARD-LEAF** — carve SegmentedTabs (512) → useTabRovingFocus + useTabResponsive (roving-tabindex NOT gated on `:draggable`; the 44px touch floor preserved).
- **BG.W-GOO-BARBELL-CSS** — §0.13/§6: RECONCILE styles/motion/goo-barbell.css shared by Carousel≡Pager (25-line delta); byte-identical paint + `@supports not(filter:url())` Safari floors preserved.
- **BG.W-TIMELINE-ENCAPSULATE** — §0.6: timeline/ into the colocation contract + styles/timeline.css; KEEP the allowlisted `transition:width/left` legs INLINE in the `.vue` (the gate file-scope).
- **BG.W-SFC-CSS-PARTIAL-SWEEP** — Slider recessed-track + heavy-CSS SFC partials (+ the card-scroll.css externalization from SCROLL-SHRINK); KEEP `[data-size]` inline (BA.W-EMISSION structural-precompile).

**No-legacy + demo:**
- **BG.W-CHIP-ALIAS-KILL** — delete the alias + api re-point (`ChipVariants`) + MIGRATION + verify-export-types (ATOMIC).
- **BG.W-DEAD-TOKEN-SWEEP** — cut `--corner-k-*`/`--corner-shape-card`/`-pill`; re-point `proof:squircle-language` onto the negative guard (round-policy PRESERVED, big-dock squircle kept) IN THE SAME DIFF (ATOMIC).
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** — delete DemoFrame/StorySectionHeader (zero-importer); fold raw `rounded-card border bg-card shadow-cartoon` triplets onto ShowcaseFrame; move liquid-morph.css to demo/.
- **BG.W-MANIFEST-COLOCATE** — fold the 4 string-keyed maps + the specimen key onto the `s()` row; de-dup StoryHero cluster.

**De-shadcn:**
- **BG.W-DESHADCN-SWEEP** — §0.8 (pass-2) + §0.2 (pass-3 forced-colors): `proof:de-shadcn` re-based on clean BG + tracked + REGISTERED born-GREEN (atomic register+clear); 3 wells + stepper rung (`--opacity-disabled-strong:0.2`) + Combobox focus+invalid precedence + TagsInput focus/disabled e2e-paint + SearchIcon tokenized + **the forced-colors outline arm (Combobox/TagsInput wrappers into `a11y-overrides.css:78-90`)** + `tests-visual/de-shadcn.spec.ts` (six-state + forced-colors arm); liquid-reveal grammar fenced OUT.

**Cross-cutting law:** **BG.W-12-LAWS-UNIVERSAL** — liquid-weight/inertia/bounce on ALL restored motion (spatial leg on `--spring-*`, enter-bouncy/exit-no-overshoot, scroll-scrub no-overshoot); the Liquid-Glass content-fence (glass on chrome only, paper on content — §1); iOS-27 clean-glass (WS3-coord warm-not-gray); cartoon-technicolor punch (NOT on a scroll scrub); √φ proportion (SectionPreviewCard window-grow).

---

## 9 · CONVERGENCE STATUS (pass-3)

Pass-2 was 85%. Pass-3 advances to **93%**:
- **Resolved (the execution frontier closed to mechanism):** the Sheet root-cause disambiguated (EMISSION, not transformed-ancestor — the split-recipe is the correct fix); the de-shadcn NET-NEW forced-colors mustFix surfaced + folded; the FLIP-ONE mechanism corrected (ElementMorph-inversion `useFlip`, NOT flipShared — the brief's literal claim falsified); the spring-tidy as presets-in-consumers (the timeline curves are distinct); the colocation predicate calibrated (`/[Cc]ontext\.ts$/` + ≥1-root-composable, over-pull zero); the two gate-follows-the-carve file-scope traps named with their fixes; the Oscillator book given a live owner.
- **Still owed (the residual, caps below 100):** (a) the 6 falsifying slices are build-PROVEN by the prototype set but not yet LANDED; (b) ZERO WebKit-proxy captures taken — owed on every visual wave, structurally proxy-only; (c) the WS3 cartoon-ink hostage; (d) the four orchestrator rulings RECOMMENDED, not signed-off.

The execution pass builds the waveset out in the sequenced order (after WS1/WS2/WS3/WS5), takes the WebKit-proxy captures on every visual wave, lands the de-shadcn gate born-GREEN on `tranche/BG`, and clears the orchestrator rulings.

---

## 10 · PROTOTYPE SET (the 6 falsifying slices — build-proven before the spec is trusted)

1. **P1 — Sheet off-screen root-cause + split-recipe** (implement). Walk the open SheetContent containing-block chain (confirm NO transformed/filtered/contain ancestor — falsify H-B); build the split-recipe `sheet.css`; confirm `top===0`+`onScreen` all-4-sides + BottomDock `inline-size` ≤18rem live re-read. FALSIFIES BG.W-SHEET-INSET-ROOT if a transformed ancestor exists.
2. **P2 — De-shadcn born-GREEN atomic on clean BG + forced-colors + TagsInput paint** (implement). Re-confirm 9 violations/exit-1 on clean tranche/BG; apply the 7 clears (3 wells + stepper rung + Combobox focus+invalid precedence + TagsInput data-disabled e2e-paint + SearchIcon + forced-colors outline arm); confirm 0/exit-0; register the gate. FALSIFIES BG.W-DESHADCN-SWEEP on a silent-no-op or a WHC regression.
3. **P3 — FLIP-ONE useFlip (ElementMorph-inversion) drives the inverse-3-channel play** (implement). Build the `useFlip` core; rebase ONE preset (useLiquidReveal); run a JS-fold π exercising the inverse + opacity + filter-blur frame-series; confirm flipShared CANNOT (no per-frame hook). FALSIFIES the ~700-LOC/flipShared claim.
4. **P4 — Scroll-shrink externalize + un-hashed build-grep + 2-keyframe fold** (implement). Externalize CardHeader choreography → global card-scroll.css; fold card-title-shrink + story-hero-shrink → title-collapse; delete --card-shrink-ease; BUILD; grep the emitted card chunk for un-hashed `title-collapse`; confirm card 0.695 + page 0.82 live. FALSIFIES the scoped-hash externalization.
5. **P5 — Specimen per-story + component-in-window ≥45% + stretched-link HTML-valid** (implement). Wire 2 specimens (Select, Slider) onto the per-story registry + StorySpecimen dispatcher; measure component-in-window occupancy live; validate the stretched-link sibling does not reparent + canvas=0. FALSIFIES the occupancy metric + a11y path.
6. **P6 — Colocation structural re-bind calibration** (spec). The `/[Cc]ontext\.ts$/` regex fix + the ≥1-root-composable predicate + the 3 moves + the self-test bite; prove it catches exactly 3 dirs and over-pulls zero. FALSIFIES BG.W-COLOCATION-GATE-STRUCTURAL if the predicate surfaces the ~30 false violations.
