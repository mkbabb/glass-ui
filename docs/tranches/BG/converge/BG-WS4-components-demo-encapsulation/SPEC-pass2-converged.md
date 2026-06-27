# BG-WS4 — Components · Demo · Encapsulation — SPEC (pass 2 · CONVERGED)

Branch `tranche/BG` @ `e78b63c6` (verified HEAD). HARDENS `SPEC-pass2.md` by folding the pass-2 fleet's prototype results (5 build-or-paint-proven slices) + the six `refine` critique mustFix sets + resolving the contradictions. ADVANCES `SPEC-pass1-converged.md` (76%) on the unconverged frontier — it does NOT restart. Read pass-1 §2 for the validated base mechanisms; this pass folds the LIVE diagnoses, the source corrections, the four orchestrator rulings (folded as DECISIONS with a recommended disposition, pending sign-off), and the mustFix that each prototype's failure would have falsified.

**Convergence status (pass 2): 85%.** Every prototyped mechanism is VALIDATED and folded with its mustFix set, and the pass-2 LIVE diagnoses closed five pass-1 open risks (scroll-shrink regression-root, width-source, de-shadcn residual list, occupancy metric, morph-field grep-gate). The residual frontier that caps below 100: (a) every prototype scored `refine` (none `accept`); (b) the Safari-26 second-engine captures are owed UNIVERSALLY and remain structurally proxy-only (zero WebKit read taken at pass-2 — Chrome/Metal only); (c) the four orchestrator rulings are folded as RECOMMENDED decisions pending sign-off; (d) the ~11 sweep/carve/no-legacy waves are specced-and-decided but not yet build-proven; (e) the WS3 cartoon-ink chroma hostage under every WS4 register. See §9.

---

## 0 · THE PASS-2-CONVERGED DECISIONS (the load-bearing deltas — folds every critique mustFix)

### 0.1 — Scroll-shrink is WIRED and WORKS; the wave is a PURE DRY refactor (OPEN-RISK #1 closed)

Three pass-2 agents live-verified on a genuinely-overflowing page (`/display/card`, `/motion/springs`): a REAL wheel/instant scroll of `<main>` to ~200px resolves `.story-hero-shrink` computed `transform = scale(0.82) translateY(-3.3px)` — EXACTLY the bar. `animation-name: story-hero-shrink; animation-timeline: scroll(); animation-range: 0px 160px` is correctly wired (`story-hero.css:493-512`); the anonymous `scroll()` ALREADY resolves to `.demo-main-scroller` (no intermediate scroll container). The card register is live (`CardHeader.vue` `--card-scroll` named timeline).

The "C-SCROLLSHRINK REGRESSED" is TWO non-mechanism causes: (1) short single-story pages don't overflow (`/forms/select`: `scrollHeight === clientHeight` → `scroll()` has zero range) — WS1's shell/overflow scope; (2) `.smooth-scroll` defeats a synchronous `scrollTop` probe (the §2.1 ACCEPTANCE artifact). **CONSEQUENCE (binding):** `BG.W-SCROLL-SHRINK-UNIFY` is a PURE DRY refactor; the user-visible cure is WS1's (unfreeze/overflow the shell). The close note MUST state plainly: "no user-visible delta beyond WS1's shell-overflow; the register was never broken, only starved." Do NOT claim the timeline switch "restored scroll-shrink." The named anonymous→`--demo-main-progress` switch + `timeline-scope` is DROPPED as cargo-cult (verified: descendants of the declaring scroller are already in scope).

### 0.2 — Scroll-shrink FOLD scope: exactly 2 keyframes → 1, the card register gets a NEW no-overshoot scrub (FOLDS the SCROLL-SHRINK critique)

**FOLD ONLY the two genuine title scale-shrink keyframes** — `card-title-shrink` (`CardHeader.vue:274`, scale-only @ ratio 0.695) + `story-hero-shrink` (`story-hero.css`, scale 0.82 + translateY) — onto ONE compositor-only `@keyframes title-collapse` parameterized `{--title-collapse-scale (1→0.82), --title-collapse-lift, --title-collapse-opacity}`, NEVER `font-size`/`padding`/layout (BB.W-CARD-COMPOSITE). **Do NOT fold the other four lanes** (the critique's binding correction): `card-header-shrink` (translate-only header move), `card-header-bg-lift`, `card-desc-shrink`, `story-hero-scroll-leave` (the disjoint `.story-hero-scroll-away` fade-leave) STAY their own keyframes — folding them pins `opacity 1→1`/`scale(1)` no-ops with `fill:both` onto previously-unanimated wrappers (the over-abstraction "ONLY" guards against). `story-hero-subordinate-fade` (pure opacity) STAYS separate (the eyebrow-shrinks-0.82 footgun — pass-1 §2.1-M4).

**The card ease is a CLEAN BREAK, user-visible (the critique's honesty correction).** `CardHeader.vue:145` binds `--card-shrink-ease: var(--ease-cartoon-punch, linear)` — an OVERSHOOT — on the card's four scroll-driven lanes (`:220/:232/:242/:251`). A bezier overshoot on a scroll-DRIVEN scrub reads as a NON-MONOTONIC scrub (the title briefly grows past 1.0 mid-scroll then settles — the C-LIQUID law forbids it on a scrub). **DELETE `--card-shrink-ease`** (no alias) and re-point all four card `animation:` shorthands to read `var(--scroll-shrink-ease)` directly (the ONE no-overshoot weighty `--ease-out`-family scroll-scrub token, also consumed by the hero title). The close note states EXPLICITLY: the card scroll-shrink scrub changes from cartoon-punch overshoot → no-overshoot monotone (a REAL intended user-visible change on the card title — NOT "blanket no-user-visible-delta"). The hero/page bare `linear` legs (`story-hero.css:476,507`) ALSO re-point onto `--scroll-shrink-ease`. The card's own bounded-port cartoon-punch exception is RETIRED — a scroll scrub is monotone everywhere.

**The Vue scoped-keyframe hash trap is structurally eliminated (the critique's load-bearing build risk).** `CardHeader.vue` defines `@keyframes card-title-shrink` LOCALLY inside `<style scoped>` (`:91`, `:274`) and references it; Vue's SFC compiler rewrites `animation:` references that match a locally-defined `@keyframes` to the hashed name. Moving `card-title-shrink`→global `title-collapse` and referencing it from inside `<style scoped>` risks a silently-hashed reference → the card shrink silently dies (the headless-green trap). **RESOLUTION (the DEFT union with BG.W-SFC-CSS-PARTIAL-SWEEP):** externalize the CardHeader scroll-shrink choreography (the `@container`/`animation-timeline` lane block + its `@keyframes`) to a GLOBAL partial `src/styles/card-scroll.css` (added to `DEFERRED_PARTIALS`) referencing the global `title-collapse` — global→global, zero scoped hash. The `--card-title-shrink-ratio: 0.695` knob stays (read by the global rule). story-hero.css is already global (safe). **BUILD-GREP verification is mandatory:** build, grep the emitted card CSS chunk, confirm `animation: title-collapse` (and any folded reference) is UN-hashed.

### 0.3 — D14 folds INTO the scroll wave, expressed in `%` off the REAL `--col` setter (FOLDS the D14 critique)

`scroll-choreography.css:236-240` carries `animation-range: calc(var(--scroll-cascade-range-end, 45%) + var(--scroll-cascade-column-stagger, 60ms) * 0)` — a `%`+`time` mix → `normal` → the `/foundations/colors` `.scroll-cascade--columns` entrance is DEAD (runtime-confirmed). **CORRECTION to pass-2 §0.2 + the critique's "no `--col` setter" claim — BOTH stale:** `colors.vue:70` DOES set `--col` (`:style="{ '--col': i }"`, verified). So the honest fix has a real index to thread: drop the `* 0` stub, retype `--scroll-cascade-column-stagger` from `60ms` to a `%` TIMELINE-UNIT default (a scroll timeline has NO time axis — `ms` is invalid), and express the per-column stagger off `--col` in `%`:

```css
/* scroll-choreography.css — D14, expressed in the timeline unit (%), off the REAL --col setter */
animation-range:
    calc(var(--col, 0) * var(--scroll-cascade-column-stagger, 4%))
    calc(var(--scroll-cascade-range-end, 45%) + var(--col, 0) * var(--scroll-cascade-column-stagger, 4%));
```

LIVE-confirm `/foundations/colors` cascade-columns now ADVANCES (each column staggers its `view()` entrance). It is DISTINCT from WS1's top-bar `scroll(--demo-main-progress block)` invalid-CSS rail (WS1's BG.W-SCROLL-PROGRESS-RAIL).

### 0.4 — Sheet recipe is SPLIT-LAYERED + the token byte-preserves each consumer's width (FOLDS the SHEET critique's #1 mustFix — the BottomDock regression)

The pass-1 "all-UNLAYERED recipe" has a CASCADE DEFECT the critique caught LIVE: an unlayered `inline-size: 100%` / `max-inline-size: <token>` rule CLOBBERS `BottomDock.vue:232`'s intentional `class="demo-bottom-dock__sheet w-fit max-w-[18rem]"` (unlayered beats `@layer utilities` — verified the class is live at HEAD). **DECISION — split the recipe by override-class:**

- **Structural, NEVER overridden → UNLAYERED** (the `select.css`/`drawer.css` precedent): `position: fixed`, `z-index`, the side-keyed `inset-block`/`inset-inline-*`, `block-size`. A stray emitted `top-0`/`inset-y-0`/`right-0` utility can never re-break these.
- **Width, consumer-tunable → `@layer components` + token default** (NOT a hard unlayered value): `inline-size`/`max-inline-size` read `--sheet-content-inline-size` / `--sheet-content-max-inline-size` from an `@layer components` rule, so a consumer's `@layer utilities` `max-w-[18rem]` STILL wins. BottomDock keeps `w-fit max-w-[18rem]` (now wins); the configurator + containers re-point onto the token explicitly.

```css
/* src/styles/sheet.css */
[data-slot="sheet-content"]                     { position: fixed; z-index: var(--z-modal); }   /* UNLAYERED */
[data-slot="sheet-content"][data-side="right"]  { inset-block: 0; inset-inline-end: 0; block-size: 100%; }   /* UNLAYERED */
[data-slot="sheet-content"][data-side="left"]   { inset-block: 0; inset-inline-start: 0; block-size: 100%; } /* UNLAYERED */
[data-slot="sheet-content"][data-side="top"]    { inset-inline: 0; inset-block-start: 0; }    /* UNLAYERED */
[data-slot="sheet-content"][data-side="bottom"] { inset-inline: 0; inset-block-end: 0; }       /* UNLAYERED */
@layer components {
  [data-slot="sheet-content"][data-side="right"],
  [data-slot="sheet-content"][data-side="left"] {
    inline-size: var(--sheet-content-inline-size, 100%);
    max-inline-size: var(--sheet-content-max-inline-size, 24rem);
    padding-block: var(--overlay-pad-block); padding-inline: var(--overlay-pad-inline);  /* BB.W-CARD-PAD token names, no fork */
  }
}
```

**The width default is the LIVE re-read, RECONCILED across all 3 consumers (FOLDS the critique's "reconcile width" + "flag the mobile delta").** The chosen LIBRARY default `--sheet-content-max-inline-size` is set to byte-preserve the configurator's LIVE computed width — read it via `getComputedStyle().inlineSize` at execution AFTER the dead utilities are stripped (pass-2 captured ~448px ≈ `28rem`; record the exact value, re-verify the new recipe reproduces it). Each consumer is re-pointed EXPLICITLY: configurator → the default (~28rem); BottomDock → `max-w-[18rem]` utility (un-touched, now wins); containers/`sheet.vue` story → the default. `inline-size` falls to `100%` (full-width on phones — the intended iOS behavior, NOT an accident of the dropped `w-3/4`=75vw; state it). DELETE from the CVA: `inset-y-0`/`right-0`/`left-0`/`h-full`/`w-3/4`/`sm:max-w-sm` + the base `px-(--overlay-pad-inline) py-(--overlay-pad-block)` (clean break — the CVA keeps only the side-keyed `border-*` + the `slide-in/out-*` animation utilities + `glass-floating`, which DO emit via `tw-animate-css`). DELETE PresetEditor's width class.

### 0.5 — The Dialog mirror is RISK-BEARING, not mechanical (FOLDS the SHEET critique's Dialog mustFix)

`DialogContent` centers via `-translate-x-1/2 -translate-y-1/2` / `top-1/2 left-1/2` utilities that die in the SAME `@source` gap. Mirror the audit onto `src/styles/dialog.css` (same UNLAYERED structural posture): `position: fixed; inset-block-start: 50%; inset-inline-start: 50%; translate: -50% -50%` (the longhand `translate` property, NOT the dying `-translate-x-1/2` utility). **VALIDATE LIVE the three-way cascade interaction** (the critique names this the risk-bearing half): the longhand `translate: -50% -50%` vs the `.glass-reveal` data-state recipe's `translate` leg (BB.W-LIQUID-REVEAL — the base never writes `translate` so a center-anchored Dialog keeps its `-50% -50%`) vs the `:spring` `useSpringMount`/`useFlip` enter — on BOTH the default and the `:spring` paths, centered + on-screen, both engines. This is NOT a green-by-mirroring; it is a live A/B before claiming converged.

### 0.6 — The spring entrance is WIRED (FOLDS the SHEET critique's spring mustFix + delivers C-LIQUID)

Keeping the flat `sheet-animate` (fade on `--duration-panel`) violates the universal liquid-weight law and the spec's "not the flat `sheet-animate` slide." Pass `:spring` on the configurator Sheet — `useSpringMount` RECONCILED with `useFlip` per `BG.W-PRESS-MOUNT-RECONCILE` (ONE enter mechanism, not two) — and live-verify the entrance resolves a `--spring-*` curve, Chrome + WebKit-proxy. This is the seam that also retires Dialog's dual enter (the `.glass-reveal` CSS + `useSpringMount` JS → ONE `useFlip` enter; keep `useSpringMount`'s drag-dismiss).

### 0.7 — `proof:emission` overlay-band clause is born-GREEN, ATOMIC (FOLDS the SHEET critique + the §0.4 CI-block discipline)

ADD the overlay-band clause to `scripts/proof-emission.mjs`: NO on-screen-positioning utility (`inset-*`/`top`/`right`/`bottom`/`left`/`h-full`/`w-*`/`px-(--overlay-pad-*)`/`py-(--overlay-pad-*)`) may survive in a content-scan-reachable CVA string for `ui/{sheet,dialog,drawer,popover}`; the `[data-slot=…][data-side]` recipe MUST ship in the built `dist/glass-ui` `/styles` cascade. + a synthetic `inset-y-0`-bearing-CVA self-test bite that MUST flag. **REGISTER it born-GREEN** — land the clause AND the CVA strip in the SAME commit (the CVA is already stripped → the clause greens at registration). A clause registered born-RED with a `ci` tag breaks CI on the next push (the §0.4 CI-block trap). **CARRY (the critique's correct keep):** add `sheet.css` + `dialog.css` to `critical-partition.mjs` `DEFERRED_PARTIALS` beside the existing `select.css` (:88) / `drawer.css` (:86), else `proof:css-critical` reds on the byte-complete-union; avoid the `*/`-substring-in-CSS-comment trap.

### 0.8 — De-shadcn: re-base on BG, ATOMIC register+clear, the stepper rung, the focus+invalid precedence (FOLDS the DE-SHADCN critique — every mustFix)

`node scripts/proof-de-shadcn.mjs` at HEAD `e78b63c6` (verified, exact): **9 violations / 5 controls**, exit 1. The gate file is UNTRACKED (`?? scripts/proof-de-shadcn.mjs`). The pass-2 prototype's clears live in a STALE pre-BG worktree (NOT durable). **The deliverable, ALL in ONE atomic commit (born-GREEN at registration):**

1. **RE-BASE onto BG HEAD `e78b63c6`** — re-apply every clear against `tranche/BG`; confirm born-RED count is 9 + exit 1 before clears.
2. **MOVE `scripts/proof-de-shadcn.mjs` into the tracked set** + register `id: "proof:de-shadcn"` in `scripts/gates.mjs` (`local`+`ci` tags) + add the `package.json` script + the `ci.yml` `gates:emit-ci` row — SAME commit as the clears.
3. **The 3 wells (one byte-equivalent flip clears all three — VERIFIED all three compose `class="input-pill …"`):** `src/styles/glass/control-surfaces.css:153` `.input-pill:disabled { opacity: 0.5 }` → `var(--opacity-disabled)` (the falsifier is dead — the single flip clears Input/Textarea/NumberField wells).
4. **The NumberField STEPPER rung (the critique's false-clean catch):** `NumberFieldDecrement.vue:25` + `NumberFieldIncrement.vue:25` carry a SEPARATE `disabled:opacity-20` literal that the gate's NumberField row (reading only `NumberFieldInput.vue`) does NOT cover. **DECISION:** mint `--opacity-disabled-strong: 0.2` (a named strong-recessed-disabled rung — the steppers are a deliberately-dimmer sub-control register than the well, a real distinct register, NOT a magic number) in `tokens/scale-paper.css` beside `--opacity-disabled`; clear both steppers onto `disabled:opacity-(--opacity-disabled-strong)` (byte-equivalent at 0.2, ZERO visual delta); ADD a `NumberField[stepper]` matrix row to the gate so the steppers are COVERED (closing the false-clean gap, spec §0.4). The 0.2-vs-0.5 register stays distinct by design (recorded).
5. **Combobox `[container]` focus:** add `:focus-within` shadow `var(--focus-ring-shadow)` to the ComboboxInput wrapper. **FIX the focus+invalid PRECEDENCE (the critique's catch):** a bare `:focus-within` ring beside the existing `has-[aria-invalid]:shadow-(--invalid-ring)` resolves by source-order (box-shadow REPLACES) → the destructive ring loses on focus. Mirror the `.input-pill` `:where(:user-invalid, [aria-invalid="true"]):focus-visible { box-shadow: var(--invalid-ring) }` rule so the destructive ring WINS on focus.
6. **TagsInput `[container]` focus + disabled:** add the root `:focus-within` ring + `data-[disabled]:opacity-disabled` + `cursor-not-allowed`. **e2e-PAINT-VERIFY the reka `TagsInputRoot` actually emits `data-disabled` at runtime** (the silent-no-op trap) BEFORE greening over the class string; verify in the TARGET tree (not the stale worktree) that a disabled TagsInput specimen computes `opacity: 0.5` + `cursor: not-allowed` and an enabled one stays `opacity: 1`.
7. **(minor) ComboboxInput SearchIcon `opacity-50`** (a shadcn-default decorative literal) — under C-DESHADCN "abrogate ALL default styling": DECIDE keep-as-decoration-tokenized → re-point to `var(--icon-decoration-opacity, 0.5)` (a named decorative-glyph rung), not left implicit.
8. **`tests-visual/de-shadcn.spec.ts`** — the per-control six-state computed-style π readback, Chrome + WebKit-proxy. The `data-[state]`/`slide-*`/`animate-in` liquid-reveal grammar is fenced OUT (glass-ui-INTENTIONAL, not a false positive).

### 0.9 — The specimen occupancy metric is component-in-window; the a11y path is the STRETCHED-LINK sibling, NOT `<div role=link>` (FOLDS the SPECIMEN critique)

**Occupancy (the binding metric, NAMED, needs orchestrator re-sign-off):** pass-1's "specimen-in-window ≥45%" measures the `.specimen-fill` DIV (100% by construction = meaningless). The binding `proof:bento-specimen` axis is **component-in-window ≥45%** — the REAL rendered control's painted bounding-box ∩ window ÷ window — PAIRED with the `SectionPreviewCard` √φ window GROWING on content-light rows (`flex-grow` / taller `aspect-ratio`) so window-in-card ≥~62% and the component never dips into the "useless gray card" gestalt.

**The a11y path is the STRETCHED-LINK sibling pattern (the critique live-falsified the `<div role=link>` downgrade).** The pass-1 non-`<a>` `<div role="link">` is an a11y DOWNGRADE (loses native keyboard/focus/middle-click/context-menu unless fully ARIA-reconstructed). The `<a>`-nests-`<button>` reparenting trap is real (the HTML parser reparents interactive descendants of `<a>` at parse time, independent of `inert`). **RESOLUTION:** a real `<a>`/RouterLink rendered as a SIBLING of the specimen window (NOT an ancestor), with a stretched-link `::after { position: absolute; inset: 0 }` making the whole card clickable, and the specimen `pointer-events: none` so clicks fall through to the link. Full native `<a>` a11y, no `<button>` nested in `<a>` (siblings), whole-card-clickable, specimen non-interactive. Verify no parser reparenting / event leakage in the live DOM.

**The clean-break + paint completeness (the critique's DRY + silent-no-op):** DELETE the ~90L dead `.specimen-*` scoped CSS in `SectionLanding.vue` (the single home is `StorySpecimen.vue`); DELETE `categorySpecimen` + the second `SpecimenSpec` interface + `previewKind` from `category-hero.ts` (no dual-resolver survives). Paint-verify ALL 12 kinds render a NON-EMPTY control (the silent-no-op trap — a stale binding paints an empty control with a distinct `data-kind`). `canvasCount === 0` is ABSOLUTE (the `field` kind reuses the device-free `auroraFallbackGround` data-URI — substrates/motion keep their aurora look with ZERO added GL). **warm-not-gray is HOSTAGE to WS3** (§5) — the desaturated-gray forms plates trace to the cartoon-ink chroma over-fire (`shadow.css:107`); co-ordinate WS3, flag the hostage.

### 0.10 — FLIP-ONE: the clause is motion-dir-SCOPED, the binding π is rescoped, the edge-cases are faithful (FOLDS the FLIP-ONE critique)

The pass-2 real-GPU π PASSED for `dockmorph-cta.spec.ts` test 1 (the no-box-jump witness: dock root width constant within 1px through `setPending→receive()→settle→clearPending` over `useFlip`'s depart-play, on real Metal). The fold is paint-proven. The mustFix:

1. **The `proof:flip-one` clause (a) "ElementMorph imported only in useFlip" is RED at HEAD** — `useDockContextSilhouette.ts:55` is a 4th RUNTIME `ElementMorph` importer (verified, with its own rAF loop), and `useLiquidMorph.ts` is a 5th (the dead-cut target). **SCOPE the clause to `src/composables/motion/`** (so `useDockContextSilhouette` in the dock-dir does not red it) OR hard-sequence FLIP-ONE AFTER both the `useLiquidMorph` delete (BG.W-DEAD-COMPOSABLE-CUT) AND the `useDockContextSilhouette` delete (WS2/WS6). DECISION: SCOPE to `src/composables/motion/` — the clause asserts "within the motion composable subtree, `ElementMorph` is imported only by `useFlip`" (the genuine single-atom claim); register born-GREEN AFTER the motion-dir dead-cut lands (atomic with the FLIP fold). A flat born-RED `ci` clause is the §0.4 CI-block trap.
2. **RESCOPE the binding π** — `liquid-reveal.spec.ts` tests the `.glass-reveal` CSS recipe (ZERO `useFlip` imports) and CANNOT be "GREEN over useFlip." DROP it from the FLIP-ONE binding set (reclassify it a CSS-recipe spec). The FLIP-ONE binding π is `dockmorph-cta.spec.ts` (real GPU, GREEN — proven) PLUS a NEW JS-fold π (`tests-visual/liquid-reveal-jsfold.spec.ts` or equivalent) that exercises `useLiquidReveal`/`useFlip` DIRECTLY — the source-rect bloom frame-series — else the wave ships with no binding paint over the JS fold.
3. **The edge-case faithfulness (the critique's omitted-by-the-sketch):** preserve the SSR/no-rAF guard all three originals carry (`if (typeof requestAnimationFrame === 'function') {…} else { snap to terminal }` at lines 263/326/463) — `useFlip`'s play MUST carry the guard, not an unguarded rAF call. Preserve the cta no-target snap branch (`opacity 0` + `handOff` WITHOUT `clearTransform`, distinct from the PRM path). Add a dedicated `useFlip.test.ts` covering `seat()` prime, the per-direction PRM snap, and the settle-unclamped / depart-clamped blur asymmetry (the shared atom is currently untested as a unit).
4. **OWN the `dockmorph-cta` test-2 cascade fix (do NOT green over a still-RED test 2):** the `cta-seat.css [data-cta-pending] { transition: none }` PRM carve must win over the surviving dock-control base `transition` on `.cta-receive-target` (scope/specificity/source-order). Resolve it; flag the WS2/WS3/WS10 co-land.
5. **`flipShared` stays a verbatim `/motion` re-export, NOT asserted-called** (confirmed fire-and-forget `Promise<void>`, transform-only, no per-frame hook — CANNOT couple opacity/filter/4th-color/handoff). The convergence bar reads "**`ElementMorph` is the single consumed atom (motion-dir-scoped); reveal/cta/bloom are thin presets over `useFlip`**" — NEVER "`flipShared` called by `useFlip`."
6. **WebKit-proxy frame-series** for the reveal + cta-bloom (compositor transform + opacity + filter-blur cross-engine) per §3.

LOC accounting stays DISJOINT: ~310 net LOC removed by the FLIP fold alone (1141 reveal+bloom+cta → ~485 presets + ~346 `useFlip` core); the brief's "~700 LOC" is the UNION with BG.W-DEAD-COMPOSABLE-CUT's dead runners.

### 0.11 — DEAD-CUT: tighten the carve to substrate-without-consumer, reconcile every stale narrative (FOLDS the DEAD-CUT critique)

The grep-gate is CLEAR at HEAD (verified): ZERO live `.morph-body`/`.morph-neck`/`.morph-field` class application in any `.vue`; `useMorphField()` is never called; `useLiquidMorph` has zero code importers; `morph-field.css` is orphaned (the `curves.ts:136` ref is a comment, the `index.css:175/180` is the `@import`). The mustFix:

1. **Tighten the root-barrel carve** — `useGooMorph.ts:43` + `useDockFission.ts:61` import ONLY the `MORPH_SIGNATURES` const (verified). Keep on the root barrel ONLY `MORPH_SIGNATURES` + `MorphSignature` + `MorphSignatureName` + `MorphVector` (the const's own row-type surface; `MorphSignature.vector` is the lone transitive dep). DROP the 4 dead runner-INPUT types `BodySpec`/`MorphFieldRect`/`MorphSilhouette`/`MorphTier` from `src/index.ts:246-249` AND from `proof-consumers-static.mjs:240-243` `rootAllowed`, AND remove `useMorphField` (the function) from `src/index.ts:241` + `rootAllowed:235`. Dropping `BodySpec` removes the `Ref` import → `morphSignatures.ts` is vue-free (strictly more root-barrel-safe).
2. **MIGRATION.md row** for the `useMorphField` public-root-barrel deletion (L-inv-16/no-legacy — a public-surface removal owes a row).
3. **Reconcile the user-visible stale narrative IN THE SAME WAVE:** `manifest.ts:883` (a story DESCRIPTION shown in the demo UI) names "One generalized useLiquidMorph engine" — strip/rewrite it. Reconcile the stale gate-source comments naming the deleted file: `critical-partition.mjs:41-43` + `:172-173` (the `motion/morph-field.css` DEFERRED narrative) + `proof-storybook-ia.mjs:114` — remove the `critical-partition.mjs:75` DEFERRED_PARTIALS row AND fix the comments in lockstep. Tidy: `rm` the now-empty `src/styles/motion/` dir after deleting `morph-field.css`.
4. Re-apply the cut to the working tree + INDEPENDENTLY re-run BUILD + `vue-tsc --noEmit` + `npm run build` (incl. emit-types + flatten-subpath-types) + `proof:css-critical` + `proof:no-layout-animation` + `proof:consumers:static`.

### 0.12 — The four orchestrator rulings (folded as RECOMMENDED decisions, pending sign-off)

Carried verbatim from pass-2 §3 — see §3. The Oscillator BOOK (`useVizChoreography.ts:78`) migrates to the BG FOLD-LEDGER, owner = the DELETER (WS5 if it deletes `useVizChoreography` first — double-claimed); else a silent-drop the no-silent-drop floor forbids.

### 0.13 — Other pass-1 corrections (folded, verified)

- `DemoFrame.vue` + `StorySectionHeader.vue` are clean ZERO-importer deletes (the StoryPage refs at L102/L149 are COMMENTS, not imports).
- `liquid-morph.css` is demo-only (`--split-dx/dy/neck-t` are read by the SEPARATE live `dock/morph-bridge.css`, NOT by `liquid-morph.css`) → move to `demo/` (low-priority placement fix).
- `goo-barbell` is a RECONCILE not a pure extraction (`CarouselContent.vue` 218L vs `PagerDots.vue` 193L — a 25-line delta); the scoped selectors reconcile + the `@supports not (filter: url(#x))` Safari floors (`CarouselContent.vue:559`, `PagerDots.vue:468`) preserve byte-identical — the byte-identical-paint π is the bar.
- `springPresets.ts` comments are ALREADY BD-fresh — SPRING-REGISTER-TIDY's doc-fix is a VERIFY pass on the SECONDARY recitations only (`scheme-spring.css:26-31`, `useSpringPress.ts`, `useDragMorph.ts` IF still pre-BD); do NOT edit the fresh canonical source.

---

## 1 · GESTALT GOAL (unchanged — the four registers + the structural close)

The non-dock surface stops shipping mechanism-without-gestalt. Four user-visible registers read CORRECTLY on a fresh live capture (Chrome + WebKit-proxy; manual real-Safari gate):

1. **D4/C-SCROLLSHRINK** — a content-page title scales `1 → 0.82` over the first `160px` of `<main>` scroll, driven by ONE shared `@keyframes title-collapse` card+page+hero consume. **Already correct on overflowing pages; the wave is the DRY fold + the WS1 shell-overflow hand-off (no user-visible delta beyond WS1's cure + the card's new no-overshoot scrub).**
2. **D6/D7** — the configurator gear opens a working panel ON-screen: Sheet `top === 0` + on-screen + spring entrance, gear hit-tests to itself (WS2 co-land), dark toggle flips global mode.
3. **D11** — `/forms` shows a REAL `<Select>` on the select card + a REAL `<Slider>` on the slider card (per-STORY specimens), **component-in-window ≥45%**, ZERO `<canvas>`.
4. **C-LIQUID** — every restored register carries liquid-weight (the 12 laws); the universal `.liquid-enter` mount recipe is wired.

Plus the structural close: `proof:colocation` binds by STRUCTURE (3 root-composable violations fixed); the >500 carves land colocated leaves with reader-gates following; the dead engines are DEFINITION-ABSENT; ONE `useFlip` over the single motion-dir `ElementMorph` atom; spring ≤6 rows; no `selectableChipVariants` alias; ONE framing chassis; the de-shadcn FORM gate REGISTERED + green.

---

## 2 · MECHANISM (pass-2-converged — §0 carries the deltas; pass-1 §2 carries the validated base)

### 2.1 — Scroll-shrink: 2→1 fold, the no-overshoot ease, D14, externalized card binding

§0.1/0.2/0.3 carry the decisions. The wave:
- Mint ONE `@keyframes title-collapse` `{--title-collapse-scale (1→0.82), --title-collapse-lift, --title-collapse-opacity}` — compositor-only. Fold ONLY `card-title-shrink` + `story-hero-shrink`. LEAVE the other 5 keyframes separate (§0.2).
- Mint `--scroll-shrink-ease` (no-overshoot `--ease-out`-family). DELETE `--card-shrink-ease`; re-point the four card `animation:` shorthands + the hero/page `linear` legs onto `--scroll-shrink-ease` (§0.2 — the card's new monotone scrub is a recorded user-visible change).
- Externalize the CardHeader scroll-shrink choreography → global `src/styles/card-scroll.css` (eliminates the scoped-hash trap; BUILD-GREP confirms `title-collapse` un-hashed) (§0.2).
- D14: drop the `*0` stub at `scroll-choreography.css:238`; express the column stagger in `%` off `--col` (§0.3).
- DROP the anonymous→named switch + `timeline-scope` (cargo-cult). START-RUNG = HEAD display-1 (no enlargement — pass-1 §2.1-M3).
- Fences: `@supports (animation-timeline: scroll())` + Firefox static-large fallback; PRM seats at endpoint (full title); the `linear()` legs carry the `@supports not (animation-timing-function: linear(0,1))` fallback.

**ACCEPTANCE:** on an OVERFLOWING content page, a REAL scroll (instant-behavior, smooth-scroll defeated) of `<main>` ~160px → story-hero title `transform` resolves `scale(~0.82)` + translateY AND a ScrollCard title → `scale(0.695)` (Chrome + WebKit-proxy); ONE `@keyframes title-collapse` shared (gate-asserted, 4-of-the-original-keyframes → 2 fold); the emitted card CSS references `title-collapse` UN-hashed (build-grep); the `/foundations/colors` cascade-columns entrance ADVANCES (D14 live); CLS≈0; PRM full-title; Firefox static-large; BUILD passes. **Close note states the no-user-visible-delta-beyond-WS1 truth AND the card's new no-overshoot scrub.** HARD-dep WS1 for the user-visible cure (sequence after; the DRY fold itself is independent).

### 2.2 — Configurator drawer: split-layered recipe, token width, Dialog mirror, spring entrance

§0.4-0.7 carry the decisions. The wave:
- Ship the SPLIT recipe (UNLAYERED structural / `@layer components` + token width) in `src/styles/sheet.css` (§0.4). Width default = LIVE re-read (~28rem), reconciled across the 3 consumers; BottomDock keeps `max-w-[18rem]`. DELETE the CVA geometry literals + PresetEditor's width class.
- Mirror onto `DialogContent` + `src/styles/dialog.css` (longhand `translate: -50% -50%`) — VALIDATE the 3-way cascade live, both default + `:spring` paths (§0.5).
- WIRE the spring entrance (`useSpringMount` reconciled with `useFlip`) (§0.6).
- ADD the `proof:emission` overlay-band clause born-GREEN + the self-test bite + `sheet.css`/`dialog.css` in DEFERRED_PARTIALS (§0.7).
- Fold the overlay-pad onto the BB.W-CARD-PAD token names (no fork). The gear hit-test half is WS2 (co-land §6).

**ACCEPTANCE:** dispatch `glass-ui-demo:toggle-configurator` → `SheetContent` computed `top === 0` + `onScreen === true` (LIVE rect, Chrome + WebKit-proxy); live `inline-size` === the decided token default; all four sides (top/bottom/left/right) live-verified via `demo/stories/containers/sheet.vue` + WebKit-proxy per side; entrance resolves a `--spring-*` curve; `proof:emission` overlay-band green; `proof:css-critical` green (partials added); BottomDock stays ≤18rem; Dialog centered + on-screen both paths; `<DarkModeToggle>` flips `useGlobalDark`; `elementFromPoint(gear) === gear` (WS2). Born-RED on HEAD (`top:806px`, `insetY0RuleExists:false`).

### 2.3 — Live previews: per-story registry, component-in-window metric, stretched-link a11y

§0.9 carries the decisions. Pass-1 §2.3 carries the validated core (12 distinct kinds, real Select/Slider, canvas=0). Deltas:
- Binding occupancy axis = **component-in-window ≥45%** (the REAL control's painted bbox); `SectionPreviewCard` √φ window grows on content-light rows.
- The card link = the STRETCHED-LINK sibling pattern (real `<a>` sibling + `::after{inset:0}` + specimen `pointer-events:none`), NOT `<div role=link>` (§0.9).
- Paint-verify ALL 12 kinds non-empty; delete the dead `.specimen-*` CSS + `categorySpecimen`/`SpecimenSpec`/`previewKind` (clean break).
- warm-not-gray HOSTAGE to WS3 (`shadow.css:107`); co-ordinate + flag.
- Wire the TWO front-door forks (`intro.vue:105 .intro-cat-thumb`, `compositions/hero.vue .composition-scene-thumb`) onto the dispatcher — DELETE both glyph forks (BG.W-BENTO-FRONTDOOR-UNFORK).

**ACCEPTANCE:** `/forms` → real `<Select>` + real `<Slider>` (distinct), ≥2 distinct kinds/category, 12 kinds non-empty, component-in-window ≥45% + window-in-card ≥~62% on light rows, `canvasCount === 0`, GL-ctx ≤ budget, warm-not-gray (WS3-coord), HTML-valid (no `<a>`-nests-`<button>`, stretched-link sibling), Chrome + WebKit-proxy.

### 2.4 — Motion collapse

- **`useVizChoreography` double-claimed** (WS5 deletes FIRST); WS4's cut = verify-absence; the Oscillator BOOK migrates to the BG FOLD-LEDGER, owner = the deleter (§0.12).
- **`useMorphField` carve** — consumer-set = `useGooMorph.ts:43` + `useDockFission.ts:61` ONLY; gut the runner → `morphSignatures.ts` (data + types); keep ONLY `MORPH_SIGNATURES`/`MorphSignature`/`MorphSignatureName`/`MorphVector` on the root barrel; DROP the 4 dead runner-input types + `useMorphField` (§0.11 — MIGRATION row, narrative/comment reconcile, vue-free leaf).
- **`morph-field.css` delete is GREP-GATED + clear** (verified orphaned, §0.11) + `index.css:180` + `critical-partition.mjs:75` (+ the comments) + `rm` the empty dir.
- **FLIP-ONE** (§0.10): ONE `useFlip` over the single motion-dir `ElementMorph` atom; reveal/cta/bloom = thin presets; SSR/cta-edge faithful; `flipShared` a re-export NOT asserted-called; the clause is motion-dir-SCOPED born-GREEN-after-dead-cut; binding π = `dockmorph-cta.spec` (real GPU GREEN) + a NEW JS-fold π; `useFlip.test.ts` unit; dockmorph-cta test-2 cascade OWNED; ~310 net LOC (disjoint).
- **`createCanvasLifecycle.ts` carve re-scopes against POST-WS5 source** (WS5 edits it first); re-measure line counts; BG.W-UNIFORM-LAYOUT-BUILDER scope SHRANK — confirm before building.
- SPRING-TIDY (9→≤6 via motion-canon P7; `gentle` ζ=1.0 frozen; doc-fix VERIFY-only) / LIQUID-ENTRANCE-GENERAL (WIRE `liquid-enter.css`; no `gl-page-build` clobber; PRM-carved; `linear()` fallback) / SCROLL-READER-UNIFY (fold `useScrollProgress` → `scrollReader.ts`) / PRESS-MOUNT-RECONCILE (the shared `useFlip` enter delivers §0.6's drawer spring; `useLiquidPress` 2nd-consumer-or-fold) — pass-1 §2.4 unchanged.

### 2.5 — Encapsulation

Pass-1 §2.5 carries the validated structural-derive. Deltas:
- The colocation predicate stays CONSERVATIVE: bind by the content-probe (`createStrictContext`/`createOptionalContext` import detect — the catch for lowercase `density.ts`/`context.ts`), KEEP README as clause-(d) requirement-not-key, cap the `≥N-files` clause to avoid over-pulling simple-but-multifile dirs (the README-marker defense is a real counter-argument). Self-test bite: a synthetic root-composable + no-README dir REDs. Reach the shared `composables/{motion,glass}` subtrees (where the dead-engine zoo lives).
- The 3 root-composable violations (4 files): `configurator/{density.ts, useConfiguratorState.ts}` · `sortable-list/context.ts` · `watercolor-dot/useWatercolorBlob.ts` → move under `composables/` + re-point package `index.ts`; run `verify-export-types` + `proof:subpath-enumeration` after EACH move (the `/configurator`, `/watercolor-dot` published-subpath fence).
- The >500 carves (colocated leaves, gates FOLLOW the composition): `createCanvasLifecycle.ts` (post-WS5 re-measure), `useWebGPUCanvas.ts`, `useGlassBackdropLuminance.ts` → `ambientHueHistogram.ts` + `wcagLuminance.ts`, `SegmentedTabs.vue` → `useTabRovingFocus.ts` + `useTabResponsive.ts` (roving-tabindex NOT gated on `:draggable`), `timeline/` → colocation contract + `styles/timeline.css`, Slider recessed-track → `styles/slider.css` (KEEP `[data-size]` inline — BA.W-EMISSION structural-precompile).
- `goo-barbell` is a RECONCILE (§0.13) — `styles/motion/goo-barbell.css` shared by Carousel≡Pager; byte-identical-paint π preserves the `@supports not (filter: url())` Safari floors.
- NO-SPLIT floor (do not contrive): `useBloomUp.ts` (folds via FLIP-ONE), `api/index.ts`. GL byte-fence (ABSOLUTE): `metaball.wgsl.ts`/`.frag.ts`, `flow-field.glsl.ts`, `mediums.glsl.ts`. Out of WS4: `GlassDock.vue`/`useDockFission.ts` → WS2; `useBlobSatellites.ts`/`useGooDotMatrix.ts` → WS5.

### 2.6 / 2.7 — No-legacy + de-shadcn

- **CHIP-ALIAS-KILL bundles its api break ATOMICALLY**: delete `selectableChipVariants.ts`, re-point `SelectableChip.vue:28` + `toggle-chip/index.ts:3` + `api/index.ts:242` (`SelectableChipVariants` → `ChipVariants`) + MIGRATION row + `verify-export-types`/`subpath-enumeration` — ONE diff.
- **DEAD-TOKEN-SWEEP is ATOMIC**: DELETE `--corner-k-soft`/`-sharp` + `--corner-shape-card`/`-pill` AND drop `proof:squircle-language`'s pinning mint-asserts in the SAME diff, re-expressing "cards stay round" via the gate's EXISTING negative guard (preserve, don't weaken); KEEP the big-dock squircle `@supports` policy.
- **DEMO-CHASSIS-CONSOLIDATE**: `DemoFrame.vue` + `demo-frame.css` + `StorySectionHeader.vue` clean zero-importer deletes; fold the raw `rounded-card border bg-card shadow-cartoon` triplets onto `ShowcaseFrame`; move `liquid-morph.css` → `demo/` (low-priority).
- **MANIFEST-COLOCATE**: fold the 4 string-keyed maps (`CATEGORY_DEFAULT_BG`/`SUBPATHS`/`LANDING_SUBPATHS`/`LANDING_BLURBS`) + the specimen-registry key onto the `s()` row (NOT a 5th parallel map); de-dup `StoryHero.vue`'s twice-rendered cluster.
- **DE-SHADCN-SWEEP** (§0.8): re-base on BG, ATOMIC register+clear (gate tracked + gates.mjs + package.json + ci.yml), the 3 wells + the stepper rung + Combobox focus+invalid precedence + TagsInput focus/disabled e2e-paint-verified + SearchIcon tokenized + `tests-visual/de-shadcn.spec.ts`; fence the liquid-reveal grammar OUT.

---

## 3 · THE FOUR ORCHESTRATOR RULINGS (folded as RECOMMENDED decisions — pending sign-off)

1. **WS4/WS10 de-shadcn ownership + the Combobox/TagsInput focus RED set.** RECOMMEND: WS4 owns the GATE (`proof:de-shadcn` register + the 3 well-clears + the stepper rung + Combobox/TagsInput `:focus-within` ring + the focus+invalid precedence + TagsInput `data-[disabled]` arm onto the EXISTING glass/control-surface register); WS10 owns the DEEP material rebuild (capsule switch, grouped-inset Select, `controlSize` tiers) WITHIN the same predicate. KEEP Combobox/TagsInput focus IN de-shadcn (a missing `:focus-visible` is a six-state-coverage gap the gate's own predicate names). The register+clear is ATOMIC (no born-RED `ci` registration).
2. **Specimen occupancy binding-metric.** RECOMMEND: ACCEPT **component-in-window ≥45%** (§0.9 — the sharpened axis, NOT the meaningless fill-div-in-window) PAIRED with the `SectionPreviewCard` √φ window-grow for window-in-card ≥~62%.
3. **WS1 scroll-shrink sequencing.** RECOMMEND: ENFORCE (live-resolved §0.1). Sequence BG.W-SCROLL-SHRINK-UNIFY AFTER WS1; it is a NO-user-visible-delta DRY refactor (beyond WS1's cure + the card's new monotone scrub); the close note states this.
4. **WS2 gear hit-test co-land.** RECOMMEND: BG.W-SHEET-INSET-ROOT ships the off-screen-Sheet fix (`top:900→0`) independently; the `elementFromPoint(gear)===gear` predicate co-lands with WS2's dock-IA.

**+ PROCESS RULING (Safari):** real Safari 26 is structurally INFEASIBLE in the build loop (the only automatable WebKit is playwright's bundled WebKit — a divergent proxy on exactly the bleeding-edge features: `animation-timeline:scroll()`, `container-type:size`+`cqmin`, `mask-composite`). RECOMMEND: (a) accept playwright-WebKit as the second-engine PROXY + widen the `webkit` project `testMatch` (`playwright.config.ts:117-119`) to the WS4 visual specs, documenting it is NOT real Safari 26; (b) gate the real-Safari pass to a MANUAL human step outside the automated loop. Do NOT carry an unmeetable "Safari 26 verified" residual on every visual wave. **+ the demo server: boot `:5173` (UP at HEAD) at the start of every execution session** — `:5199` (the gate default) is DOWN; the live-π owes resolve on `:5173`.

---

## 4 · FILES TOUCHED (pass-2-converged)

- **scroll-shrink:** `scroll-choreography.css:238` (D14 `%`-off-`--col`), `story-hero.css` (re-point onto `--scroll-shrink-ease`), `CardHeader.vue` (delete `--card-shrink-ease`, externalize choreography), `src/styles/card-scroll.css` (NEW, global — eliminates scoped-hash; add to DEFERRED_PARTIALS), `docs/precepts/design-idioms.md` (home the idiom). DROP the AppShell `timeline-scope` edit.
- **sheet/dialog:** `src/styles/sheet.css` (NEW, SPLIT-layered — width default = LIVE re-read ~28rem, in DEFERRED_PARTIALS), `src/styles/dialog.css` (NEW mirror, in DEFERRED_PARTIALS), `sheet/index.ts` + `dialog/…` (CVA strip), `SheetContent.vue`/`DialogContent.vue` (`:data-side`+`data-slot`+longhand translate), `proof-emission.mjs` (overlay-band clause + bite), `PresetEditor.vue` (delete width class), `BottomDock.vue`/containers (re-point to token), `critical-partition.mjs` (sheet+dialog DEFERRED_PARTIALS).
- **specimen:** `demo/stories/specimen-registry.ts` (NEW), `StorySpecimen.vue` (NEW — sole specimen-CSS home), `SectionLanding.vue` (rewire + delete ~90L dead CSS + stretched-link card), `category-hero.ts` (cut previewKind/categorySpecimen/SpecimenSpec), `SectionPreviewCard.vue` (window-grow), `foundations/intro.vue`, `compositions/hero.vue`, `proof-bento-specimen.mjs` (NEW gate).
- **motion cut:** DELETE `useLiquidMorph.ts`/`useVizChoreography.ts`(WS5-first)/`morph-field.css`; `morphSignatures.ts` (NEW vue-free leaf), `useMorphField.ts` (delete fn), `useGooMorph.ts`/`useDockFission.ts`/`core/index.ts`/`src/index.ts` (re-point + drop 4 dead types + `useMorphField`), `proof-consumers-static.mjs` (drop the 4 types + `useMorphField` from rootAllowed), `manifest.ts:883` (narrative), `critical-partition.mjs:41-43/75/172-173` + `proof-storybook-ia.mjs:114` (comment reconcile), `MIGRATION.md` (row).
- **flip:** `useFlip.ts` (NEW, SSR/cta-edge faithful), `useLiquidReveal.ts`/`useBloomUp.ts`/`useDockCtaReceive.ts` (→ presets), `suite.ts` (`flipShared` re-export), `useFlip.test.ts` (NEW unit), `proof-flip-one.mjs` (motion-dir-scoped clause), `tests-visual/liquid-reveal-jsfold.spec.ts` (NEW JS-fold π), `cta-seat.css` (test-2 cascade).
- **de-shadcn:** `scripts/proof-de-shadcn.mjs` (track + register), `gates.mjs`/`package.json`/`ci.yml` (register row), `control-surfaces.css:153`, `tokens/scale-paper.css` (`--opacity-disabled-strong`), `NumberFieldDecrement/Increment.vue`, `ComboboxInput.vue` (focus + invalid precedence + SearchIcon tokenize), `TagsInput.vue`, `tests-visual/de-shadcn.spec.ts`.
- **carves/no-legacy/demo:** per §2.5/2.6.

---

## 5 · ACCEPTANCE / REAL-PAINT-π BAR (pass-2-converged)

Every visual wave closes against `proof:ba-gestalt`'s capture-paths-resolve floor on a FRESH live capture (Chrome + the WebKit-engine proxy per §3; manual real-Safari gate). The pass-1 §5 bars hold, with the pass-2 sharpenings:
- **Scroll-shrink:** real scrolled `scale(~0.82)` over an OVERFLOWING shell (smooth-scroll defeated), card title → `scale(0.695)`, D14 cascade advances, the emitted card CSS references `title-collapse` UN-hashed, ONE keyframe, close-note states no-user-visible-delta-beyond-WS1 + the card's new no-overshoot scrub.
- **Configurator:** live `top===0`+`onScreen`, all 4 sides, `inline-size` === re-read token default, BottomDock ≤18rem, Dialog centered both paths, spring entrance, `proof:emission` + `proof:css-critical` green.
- **Live previews:** component-in-window ≥45%, 12 kinds non-empty, stretched-link HTML-valid, warm-not-gray (WS3-coord).
- **De-shadcn:** REGISTERED + green (atomic register+clear, re-based on BG), the stepper rung covered, Combobox focus+invalid precedence correct, TagsInput disabled arm PAINTS (e2e), π twin per-control readback.
- **FLIP-ONE:** `ElementMorph` single motion-dir atom (clause scoped, born-GREEN after dead-cut); `dockmorph-cta.spec` GREEN on real GPU (test 1 proven, test 2 cascade owned); the NEW JS-fold π GREEN; `useFlip.test.ts` covers SSR/PRM/blur-asymmetry; `flipShared` a re-export NOT asserted-called.
- **The WS3 hostage:** every WS4 `proof:ba-gestalt` verdict is hostage to the WS3 cartoon-ink chroma (`shadow.css:107`). Flag; the restored registers read broken until WS3 dials the cast toward near-black ink.

---

## 6 · FOLDED / DEFERRED ITEMS + CROSS-WS LEDGER (pass-2-converged)

- **useVizChoreography deletion** — WS5 deletes FIRST (double-claimed); WS4 verifies absence; the **Oscillator BOOK (`useVizChoreography.ts:78`) migrates to the BG FOLD-LEDGER as a DEFER-with-trigger (republish-gated kf Oscillator), owner = the deleter.**
- **useDockContextSilhouette** — dock-dir, a 3-way chain WS6→WS2→WS4-verifies; NOT WS4's owned cut (AppSwitcher uses `useBloomUp`). FLIP-ONE's clause is motion-dir-SCOPED so it does NOT depend on this delete landing (§0.10).
- **createCanvasLifecycle / useWebGPUCanvas carves** — re-scope against POST-WS5 source.
- **BG.W-UNIFORM-LAYOUT-BUILDER** — scope SHRANK post-WS5; confirm before building.
- **liquid-morph.css → demo/** — demo-only confirmed; low-priority placement fix.
- **The deep de-shadcn control MATERIAL rebuild** → WS10 (within the `proof:de-shadcn` predicate).
- **WS3 cartoon-ink chroma** (`shadow.css:107`) — the shared gestalt floor under all four WS4 registers; every WS4 ba-gestalt verdict is hostage to it.
- **dockmorph-cta test-2 cascade** — a WS2/WS3/WS10 co-land (the dock-control base transition vs the `[data-cta-pending]` PRM carve).

---

## 7 · OPEN RISKS (post-pass-2-converged)

1. **Width default is a live re-read** — set it to the exact `getComputedStyle().inlineSize` after the CVA strip, re-verify each of the 3 consumers reproduces its width (§0.4). A wrong default ships a re-sized drawer.
2. **The Vue scoped-keyframe hash** — the card binding MUST be externalized global (or build-grep-proven un-hashed) or the card shrink silently dies (§0.2).
3. **The de-shadcn re-base + atomic-commit discipline** — the prototype's clears are on a stale pre-BG worktree; re-apply on `tranche/BG`, confirm 9→0, register born-GREEN in ONE commit (§0.8). The stepper rung + Combobox precedence + TagsInput-paint-verify are the false-clean catches.
4. **goo-barbell is a reconcile** — the 25-line delta + the `@supports` Safari floors must paint byte-identical (§0.13).
5. **Safari is a proxy** — the WebKit-engine proxy is NOT real Safari 26 on the bleeding-edge features; a manual human gate backstops it (§3). ZERO WebKit read taken at pass-2 — owed on EVERY visual wave.
6. **The WS3 cartoon-ink hostage** — every restored register reads broken until WS3 dials the cast back; the WS4 verdicts are not self-certifiable.
7. **The FLIP-ONE clause must be motion-dir-scoped + born-GREEN-after-dead-cut** (§0.10) — a flat born-RED `ci` clause breaks CI; `dockmorph-cta` test 2 must be GREEN (the cascade owned), not greened over a still-RED test.
8. **The Oscillator book is a silent-drop risk** — if no owner is named at the useVizChoreography delete, the cross-repo defer is lost (§6).
9. **Churn fences:** `gentle` ζ=1.0 byte-frozen; `selectableChipVariants` is a public /api type break; cutting `--corner-shape-card/-pill` must preserve the round-policy via the negative guard; the colocation moves must not break the published `/configurator` + `/watercolor-dot` subpaths.

---

## 8 · BG.W-* WAVE BREAKDOWN (each carries its validated mechanism + real-paint-π bar)

**Restore (D4/D6/D7/D11):**
- **BG.W-SCROLL-SHRINK-UNIFY** — ONE `@keyframes title-collapse`; fold ONLY 2 keyframes; `--scroll-shrink-ease` no-overshoot (card gets a NEW monotone scrub, `--card-shrink-ease` deleted); externalize the card binding → `card-scroll.css` (no scoped hash); D14 `%`-off-`--col`; DROP the cargo-cult switch; START-RUNG = HEAD display-1. HARD-dep WS1. π: real scrolled `scale(~0.82)` + card `0.695` Chrome+proxy, un-hashed build-grep, D14 advances, CLS≈0, PRM-seats, Firefox-fallback, BUILD passes; close-note states the truth.
- **BG.W-SHEET-INSET-ROOT** — SPLIT recipe (UNLAYERED structural / `@layer components`+token width); width default = LIVE re-read reconciled across 3 consumers (BottomDock ≤18rem); overlay-pad folded; CVA geometry deleted; `proof:emission` overlay-band clause born-GREEN + bite + DEFERRED_PARTIALS; spring entrance (`useSpringMount`/`useFlip`). Mirror DialogContent (3-way cascade validated). Co-land WS2 gear-reach. π: live `top===0`+`onScreen` all-4-sides Chrome+proxy.
- **BG.W-SPECIMEN-PER-STORY** — per-story registry + `<StorySpecimen>` dispatcher; real Select/Slider per card; heavy=frozen still (device-free `auroraFallbackGround`); occupancy = component-in-window ≥45% + window-grow chassis; STRETCHED-LINK sibling card (not `<div role=link>`); delete dead `.specimen-*` CSS + categorySpecimen/SpecimenSpec/previewKind; `proof:bento-specimen`. π: 12 distinct kinds non-empty, warm-not-gray (WS3), zero-canvas, Chrome+proxy.
- **BG.W-BENTO-FRONTDOOR-UNFORK** — wire intro.vue + compositions/hero.vue onto the dispatcher; delete the 2 glyph forks.

**Motion collapse:**
- **BG.W-DEAD-COMPOSABLE-CUT** — useLiquidMorph (+ useVizChoreography WS5-first, + useDockContextSilhouette WS2-coord) DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts` (vue-free); keep ONLY MORPH_SIGNATURES/MorphSignature/MorphSignatureName/MorphVector on the barrel (drop 4 dead types + the fn from src/index.ts + proof-consumers-static); delete `morph-field.css` (grep-gated) + manifest/comment reconcile + MIGRATION row + rm empty dir.
- **BG.W-FLIP-ONE** — ONE `useFlip` over the single motion-dir `ElementMorph` atom; reveal/cta/bloom = thin presets; SSR/cta-edge faithful; clause motion-dir-SCOPED born-GREEN-after-dead-cut; `flipShared` a re-export NOT asserted-called; ~310 LOC. π: dockmorph-cta.spec GREEN real GPU (test 2 cascade owned) + NEW JS-fold π + useFlip.test.ts, Chrome+proxy.
- **BG.W-PRESS-MOUNT-RECONCILE** — useSpringMount bloom-enter onto the shared runner (ONE Dialog/Sheet enter, delivers the §0.6 drawer spring); useLiquidPress 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** — 9→≤6 via motion-canon P7; drop dead `--spring-timeline-*` twins; VERIFY-only doc-comment fix (springPresets.ts fresh); gentle ζ=1.0 frozen.
- **BG.W-SCROLL-READER-UNIFY** — fold useScrollProgress onto scrollReader.ts.
- **BG.W-LIQUID-ENTRANCE-GENERAL** — WIRE liquid-enter.css onto its named mount surfaces; no `gl-page-build` clobber; PRM-carved; `linear()` fallback.

**Encapsulation:**
- **BG.W-COLOCATION-GATE-STRUCTURAL** — bind by structure + content-probe + reach shared subtrees; fix the 3 root-composable violations (4 files) + 5 READMEs + self-test bite; verify-export-types/subpath-enumeration after each move.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** — carve createCanvasLifecycle (post-WS5 re-measure) + useWebGPUCanvas.
- **BG.W-AMBIENT-HISTOGRAM-LEAF** — carve useGlassBackdropLuminance → ambientHueHistogram + wcagLuminance.
- **BG.W-TABS-KEYBOARD-LEAF** — carve SegmentedTabs → useTabRovingFocus + useTabResponsive (roving NOT gated on :draggable).
- **BG.W-GOO-BARBELL-CSS** — styles/motion/goo-barbell.css shared by Carousel≡Pager (RECONCILE, 25-line delta); π byte-identical paint + `@supports` Safari floors preserved.
- **BG.W-TIMELINE-ENCAPSULATE** — timeline/ into the colocation contract + styles/timeline.css.
- **BG.W-SFC-CSS-PARTIAL-SWEEP** — Slider recessed-track + heavy-CSS SFC partials (+ the card-scroll.css externalization from SCROLL-SHRINK); KEEP [data-size] inline.

**No-legacy + demo:**
- **BG.W-CHIP-ALIAS-KILL** — delete the alias + api re-point (ChipVariants) + MIGRATION + verify-export-types (ATOMIC).
- **BG.W-DEAD-TOKEN-SWEEP** — cut --corner-k-*/--corner-shape-card/-pill; re-point proof:squircle-language onto the negative guard (round-policy PRESERVED); big-dock squircle kept (ATOMIC).
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** — delete DemoFrame/StorySectionHeader (zero-importer); fold raw triplets onto ShowcaseFrame; move liquid-morph.css to demo/.
- **BG.W-MANIFEST-COLOCATE** — fold the 4 string-keyed maps + the specimen key onto the s() row; de-dup StoryHero cluster.

**De-shadcn:**
- **BG.W-DESHADCN-SWEEP** — `proof:de-shadcn` re-based + tracked + REGISTERED born-GREEN (atomic register+clear); 3 wells + stepper rung (`--opacity-disabled-strong`) + Combobox focus+invalid precedence + TagsInput focus/disabled e2e-paint-verified + SearchIcon tokenized; `tests-visual/de-shadcn.spec.ts`; liquid-reveal grammar fenced OUT.

**Cross-cutting law (binds every wave, not its own wave):** **BG.W-12-LAWS-UNIVERSAL** — liquid-weight/inertia/bounce on ALL restored motion (spatial leg on `--spring-*`, enter-bouncy/exit-no-overshoot, scroll-scrub no-overshoot); iOS-27 clean-glass (WS3-coord warm-not-gray); cartoon-technicolor punch (NOT on a scroll scrub — §0.2); √φ proportion (SectionPreviewCard window-grow). Each restored register (drawer spring §0.6, scroll-shrink ease §0.2, specimen warmth §0.9, liquid-enter §2.4) carries it explicitly.

---

## 9 · CONVERGENCE STATUS (pass-2-converged)

Pass-1 was 76%. Pass-2 advances to **85%**:
- **Resolved (the frontier closed):** scroll-shrink diagnosis (no-user-visible-delta DRY refactor) + the 2-keyframe fold scope + the card's no-overshoot scrub clean break + the scoped-hash externalization; the D14 `%`-off-`--col` fix (the `--col` setter VERIFIED to exist); the split-layered Sheet recipe + the BottomDock-regression fix + the width reconcile across 3 consumers; the Dialog mirror as a risk-bearing live A/B; the spring entrance wiring; the `proof:emission` born-GREEN discipline + DEFERRED_PARTIALS; the de-shadcn re-base + atomic register+clear + the stepper rung + the Combobox focus+invalid precedence + the TagsInput paint-verify; the component-in-window metric + the stretched-link a11y (the `<div role=link>` downgrade reversed); the DEAD-CUT type-trim + the narrative/comment reconcile + the vue-free leaf; the FLIP-ONE motion-dir-scoped clause + the rescoped binding π (JS-fold, not the CSS-recipe spec) + the SSR/cta-edge faithfulness + the dockmorph-cta test-2 cascade ownership.
- **Still owed (the residual frontier, caps below 100):** (a) every prototype scored `refine` (none `accept`); (b) ZERO Safari/WebKit-proxy captures taken at pass-2 — the universal owe is structurally proxy-only; (c) the four orchestrator rulings are RECOMMENDED, not signed-off (esp. the component-in-window metric NAMED-here + the WS4/WS10 de-shadcn ownership); (d) the ~11 sweep/carve/no-legacy waves are decided-and-specced but not yet build-proven; (e) the WS3 cartoon-ink hostage.

The next pass (execution) builds the waveset out, takes the WebKit-proxy captures on every visual wave, lands the de-shadcn gate born-GREEN on `tranche/BG`, and clears the orchestrator rulings.
