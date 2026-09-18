SERVED MODEL: claude-fable-5-1

# O-26 — KF.W6 (Glass Suffusion) · the ONE glass-ui BH relay communiqué

**From**: value.js tranche X, Track B (**X·KF**, the keyframes.js lane) — KF.W6 unit `b`, the relay seat
**To**: glass-ui, BH/BK coordination (`../glass-ui/docs/tranches/BK/coordination/`, the active tranche's inbox — owner edict 2026-07-12)
**Date**: 2026-09-18, 00:2x EDT
**Path of record**: `value.js/docs/tranches/X/keyframes/relay/KF-W6-BH-COMMUNIQUE.md` (the L-19 witness the gate reads); **mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md`, byte-identical (sha256 stated in the wave record). The mirror is MAIL DELIVERY and not one producer byte — glass-ui is READ-ONLY to this wave.
**Authority**: `docs/tranches/X/keyframes/waves/KF-W6.md` §Gates **G-W6-14** · §Sequencing hard order **7** (this letter precedes every interim demo-side mitigation of a producer seam, so every interim is recorded as interim) · §Sequencing → glass-ui BH relay cross-edge · §Carry **W6-AUTH-1** · W6-D **KF-SST-30** · W6-L **MbabbMenu rider on ChromeDock M-4** · W6-M **KSM R-1**.
**Bank**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` + the 58-record adjudicated registry (`docs/tranches/V/megatranche/registry/adjudicated/kf-*.md`). Mechanisms are cited by banked id and were not re-derived here; every byte figure below was measured by THIS seat at the installed dist (§0.1) and double-run.

---

## §0 · Four framings, read first

**§0.1 The pin.** keyframes.js installs **`@mkbabb/glass-ui` 7.0.0 EXACT** (`package.json` devDep; `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`). That pin is ruled, not drifting: KF-W0 §B-12 pins it and COHESION §0g.3 re-scopes the glass-8 atomic cut to value.js alone, so **X·KF does not bump inside tranche X**. Every "dead at 9.0.0" in your I-32 is therefore live for this consumer for the whole wave, and every figure below is a 7.0.0 figure unless a row says otherwise.

**§0.2 Reconciled against your O-20 disposition (our I-32) and constellation relay (I-33) BEFORE assembly.** Five of this wave's inventory items were already carried in our O-20 (A-3 · A-4 · A-7 · A-13 · A-14) and you disposed them on 2026-09-17. **Nothing disposed is re-asked.** Those rows appear below as *DISPOSED — carried for the byte proof the spec requires, and for what changes at 7.0.0*; the disposing row is named on each. Where your answer re-shaped a consumer decision (A-7 → W6-AUTH-1), the re-shaping is stated so you can see we consumed it.

**§0.3 Nothing here is a frontend workaround.** Standing owner edict (2026-07-12, SS-6): producer rows ride the relay and never become frontend hacks; a demo-side patch of any row below is a wave defect (G-W6-14's bound). Where this wave MUST ship an interim at 7.0.0 the interim is named at §3 as interim, with this letter as its counterparty. **No local `:deep` patching, no `node_modules` edit, no copied producer selector** — each is a HIGH defect at our end.

**§0.4 The cure-shape constraints travel with the rows.** G-W6-14 fails if the relay omits them, so they are stated in the row they bind: **LIFO-for-Escape / FIFO-for-destructive** (R-1) · **getter-or-element, never a selector string** (D-23) · **`default: undefined`** (the Boolean cast) · **one utility, two behaviours** (`touch-hit-area`).

---

## §1 · The inventory — one row per banked id, mechanism measured at the installed 7.0.0 dist

Word set: **LIVE** = an ask or a report you have not seen · **DISPOSED** = answered in I-32, carried for the byte proof and the 7.0.0 consequence, no re-ask · **NOTICE** = information for your ledger, no ask.

### R-1 · **MM-4 + KF-KC-10** — scoped styles emitted UNLAYERED outrank every consumer utility (DISPOSED at 9.0.0 for the menu; the CLASS is your 10.0.0 wave; LIVE for `.glass-label`'s membership)

- **Measured at `dist/glass-ui.css` (70,109 B)**: `@layer components` opens at byte **2531** and is the file's only `@layer` (1 occurrence); the layered block closes at ≈**18827** (bytes 18780–18840 read `…inset-inline-end:0;translate:0 -50%}}}@media (prefe…`). **`.glass-label` first occurs at byte 21050** (`.glass-label[data-v-87831917]{color:var(--foreground);…}`, a scoped-style emission, OUTSIDE the layer; second at 21215). **`.dropdown-menu__item` at byte 29523** (`.dropdown-menu__item,.dropdown-menu__sub-trigger{cursor:de…}`, OUTSIDE the layer; second at 29791). Both reproduce the bank's figures (`kf-KeyframeCard` KF-KC-10 · `kf-MbabbMenu` MM-4) exactly.
- **Your I-32 A-3**: KILL at 9.0.0 — `.dropdown-menu__item` → 0, successor `.menu__item{color:inherit}` INSIDE `@layer components`; **A-3 (class)**: CURE-NEXT-MAJOR — 351 unlayered top-level rules remain, layering them is a 10.0.0 wave with a cascade gate.
- **The one LIVE question**: is `.glass-label`'s scoped emission (`labeled-field`) among the 351, or did it layer with the menu? We need the answer to know whether the KF-KC-10 interim (§3) is 7.0.0-only or survives our eventual bump.
- **Cure-shape constraint, carried**: the omission is NOT a build limitation — the cure is `layer(components)` on the scoped emission, never a consumer `:deep`. **MM-44 scopes our blast radius**: MbabbMenu is the demo's ONLY `DropdownMenu*` consumer, so the 7.0.0 interim is a demo-local unlayered override and regression-free; the destructive row is repainted to the DEMO's own red (`text-accent-red`, MM-30), never your vendor red.

### R-2 · **KF-SKEL-4** — `components.css` defeats its own `@theme` radius scale (DISPOSED at 9.0.0 — I-32 A-4 KILL; the byte proof the spec requires is carried)

- **Measured across the 7.0.0 dist**: `--radius:` is emitted TWICE with two values — **`--radius: 0.25rem` ×1** and **`--radius: 0.625rem` ×1**; `--radius-lg` likewise twice — **`0.5rem` ×1** and **`var(--radius)` ×1**. Intended-vs-shipped pinned by the spec: intended `--radius` 0.625rem / `--radius-lg` per theme scale; shipped 0.25rem / 0.5rem app-wide (the later `:root` in `components.css` wins on order).
- **Your A-4**: KILL at 9.0.0 (no `:root`, no `--radius*` in `components.css`; one source `theme/radius.css`), and you confirmed the 7.0.0 mechanism on our dist (`:root{--radius: 0.25rem}` = the 4px measured). **A-4 (rider)**: 13 `@theme` tokens left 7→9 with no MIGRATION row, table landing with B-3's manifest.
- **What this wave does with it**: nothing against the detuned values — G-W6-9 fails any radius cure computed against 0.25rem/0.5rem (the KF-SKEL-4 CONSTRAINT). No ask.

### R-3 · **The Boolean cast** — bare `{ type: Boolean }` on a prop that gates a reka controlled prop pins every passive consumer shut (LIVE)

- **Measured**: `dist/labeled-field.js:141` `open: { type: Boolean }` (the `LabeledSelect` open prop; file exports `LabeledField · LabeledInput · LabeledSelect · LabeledSlider · LabeledSwitch`); `dist/dropdown-menu-0gkd7rMF.js:16` `modal: { type: Boolean }`, forwarded at `:25`/`:30` as `modal: n.modal`. Vue casts an ABSENT Boolean prop to **`false`** — so a consumer that never passes `open` gets a `SelectRoot` **controlled-shut** (banked `kf-LayerConfigPanel` LP-2 ≡ KF-CO-1: *"the blend `<LabeledSelect>` that can never open"*), and a `DropdownMenu` that never passes `modal` gets a **non-modal, permanently controlled** menu by accident (banked `kf-ChromeDock` M-4 with the **MbabbMenu MUST-CARRY rider**: *"kf-ChromeDock M-4's cure AS WORDED WOULD SHIP AN UNOPENABLE MENU"*).
- **The ask, and its cure shape (constraint carried)**: **`default: undefined`** on every Boolean prop that is forwarded into a reka controlled prop (`open` · `modal` · `checked` · `pressed` — the roster is yours to census; we name the two we measured). `undefined` lets reka fall to uncontrolled; `false` pins it. Not a per-consumer workaround: the consumer half (KF-CO-1) stays excluded to OPTIONS-UNIT under its own id.

### R-4 · **KF-HA-2** — aurora placeholder never hidden on arm; delivered presence ≈2× the authored ceiling (LIVE)

- **Measured**: `dist/aurora.js:2699` `class: "aurora-placeholder h-full w-full"` — the placeholder layer persists after the canvas arms (canvas probed opaque, alpha = 1, at the bank), so the route BRIGHTENS 0.10 → ≈0.19 at the LCP moment (banked `kf-HeroAurora` KF-HA-2; every prior WCAG table on the 0.1 premise is dead).
- **Ask**: hide or fade the placeholder on arm (or document the composite as the delivered presence). **The consumer decision — which number the owner blessed — is ours** (W6-K) and an interim halved ceiling is admissible at 7.0.0 (§3).

### R-5 · **KF-HA-12** — the aurora is omitted from BOTH the `forced-colors` and `prefers-reduced-transparency` sweeps (LIVE)

- **Measured at `dist/glass-ui.css`**: **7** `@media (forced-colors…)` blocks and **3** `@media (prefers-reduced-transparency…)` blocks; `aurora` occurs **12** times in the file and **0** times inside either family of blocks. `dist/styles/utilities/a11y-overrides.css`'s forced-colors arm names `.focus-ring · .interactive-item · .dock-* · .dark-mode-toggle-button · .field-control · .input-pill · .hairline-accent · .glass-dock` — no aurora selector.
- **Ask**: PRIMARY conformance arm producer-side (forced-colors → static plate; reduced-transparency → opaque); two-line consumer stopgaps land at 7.0.0 as interim (§3). This is the SAME class as KF-SKEL-12 (no `forced-colors`/`prefers-reduced-transparency` arm ANYWHERE in the demo — a repo-wide 0), which the S-6 delegation cures on our side.

### R-6 · **KF-HA-9 + KF-HA-13** — `wake()` ungated under PRM on the pointer paths; the throwing token bridge (LIVE)

- **Measured at `dist/aurora.js`**: `y.wake()` is called on the pointer/visibility paths at `:2374` (`setPointer` + wake) · `:2377` · `:2380` · `:2396` with **no reduced-motion guard**; ONLY the scroll path at `:2384` gates on `!y.reducedMotion`. So under PRM a pointer move still schedules a synchronous full-viewport draw inside the input task (KF-HA-9). The `:123-124` comment states the runtime *freezes* under reduced-motion before the shader sees it — the freeze is a render-side fact; the wake-side cost is what the row reports.
- **Ask**: PRM early-out on the pointer `wake()` paths (the `:2384` guard, applied to the other four). **KF-HA-13 rider (bridge posture, NOTE not ask)**: `resolveAtoms` throws on an unparseable token-ised stop; a consumer one edit from a white-screened home route — a non-throwing bridge (or a documented `OklchStop` seed form, which we adopt) is the posture we would prefer stated.
- **KF-HA-1 rider (crayon/light incompatibility, NOTE)**: `interactivity.light` is a hard TS2345 against 7.0.0 and inert even when cured (shipped-vs-cured visible delta exactly ZERO at the bank). The consumer decision — stroke medium or DELETE the atom — is ours; the NOTE is that the type and the runtime disagree about the axis.

### R-7 · **KF-SST-30** — `@utility touch-hit-area` cannot expand a tap target: one utility, two behaviours (LIVE — and B-3 says it is REMOVED at a later major; name the major)

- **Measured at `dist/styles/utilities/a11y-overrides.css`** (a one-line sheet): `@utility touch-hit-area { position: relative; @media (pointer: coarse) { &::before { …; min-width: var(--touch-target, 2.75rem); min-height: var(--touch-target, 2.75rem); pointer-events: none; } } }`. **The expander is `pointer-events: none`**: it PAINTS a 44px box and receives no hit — the utility's name promises the second behaviour and ships only the first. Every consumer cure that prescribed it (banked `kf-ChannelOptions` KF-CO-24, `kf-CubeScene` MISS-3) is corrected by annotation at our end (E-3), never rewritten.
- **Also measured — the producer's OWN coarse floor is per-component**: `@media (pointer: coarse)` arms ship for `.glass-chip--interactive` (min-inline/block-size `var(--touch-target, 2.75rem)`), `.dock-icon-button` (`--dock-touch-target`), `.tags-input__chip`, the dock scale and the header-ribbon padding — **six blocks; none for `Button` or `Input`**.
- **Your I-32 B-3** lists `touch-hit-area` in the per-major classes-removed manifest. **Asks**: (a) name the major it leaves in; (b) at the 7.x line, document *"cannot expand a target"* on the utility (the one-utility-two-behaviours framing is the constraint the gate requires we carry); (c) does a `(pointer: coarse)` `--touch-target` arm for `Button`/`Input` ship at 9.0.0 (B-1 says every INTERACTIVE chip gets one)? Our 7.0.0 posture is at §3.

### R-8 · **KSM R-1 (+ R-8 · R-16 · R-17)** — the keyboard registry has no suspend / scope / priority; the whole 19-binding registry stays LIVE behind an open modal (LIVE, escalatable)

- **Measured**: `dist/keyboard.js` is **104 lines**; `defaultPrevented` occurs **0** times (so a consumer that pre-empts a key cannot stop the registry — the ACG M-1 collision with ANY tablist, `useToolbarKeyboard.ts:80-101` is the live carrier proof). `dist/composables/keyboard/useKeyboardShortcuts.d.ts:32` publishes `registerShortcut(combo, handler, options?)` and `:30` `formatComboParts(raw: string): string[]`; the surface has **no suspend, no scope, no priority** symbol.
- **THE CURE-SHAPE LAW the API must be designed against (M3, carried verbatim from the bank — this is the constraint G-W6-14 names first)**: *"the dispatcher is LIFO FOR ESCAPE ONLY — a later-registered guard can pre-empt Escape but can NEVER pre-empt Space/Delete/Mod+Z, which hold FIFO priority forever; the destructive half is PRODUCER-GATED."* A `suspend()`/scope API that lets a modal steal Escape is right; one that lets any later registrant shadow a destructive binding is the defect wearing the cure's clothes. **Escalation, declared**: an SS-13 witness of ANY destruction path behind the modal with no live undo route re-promotes R-1 to BLOCKER at our end.
- **Riders on the same surface**: **R-8** keycap accessible names — the durable cure is producer-side as a companion to `formatComboParts` (a `formatComboLabel`/aria form); interim sr-only twins at our end · **R-16** the optional `label` is unguarded (producer type-narrowing) · **R-17** the Delete row UNDER-REPORTS its own Backspace alias (alias surfacing belongs to the registry's own display data — squarely the component's purpose).

### R-9 · **KF-ET-10 (+ D-M5 ⟨kf-EasingScene⟩ · D-M-3 ⟨kf-EasingTarget⟩ fold here)** — a first-class SELECTABLE CHIP-GROUP; the consumer-side ARIA remap is structurally unspellable (LIVE, sharpened by your A-11b)

- **Measured at `dist/chip-6ysLmScu.js`**: the attribute pass-through filters `role | aria-pressed | data-state` (`filter(([e]) => e !== "style" && !/^(role|aria-pressed|data-state)$/i.test(e))`) and, on the interactive path, `role | tabindex | aria-pressed | data-state` — **two filters, both strip the ARIA a consumer would need to compose 28 chips into one single-select group**. The demo mounts 28 independent `Chip mode="selectable"` toggles with a hand-rolled single-select invariant, 30 lines below a real `ToggleGroup type="single"` (`EasingTarget.vue:50`).
- **Your A-11b**: re-home toggles onto `<Chip mode="selectable" v-model>` or `ToggleGroupItem` — that answers the ITEM. **The ask is the GROUP**: a `ChipGroup`/selectable chip-group shape (single/multiple, roving focus, `radiogroup`/`listbox` semantics on the group, the item's `aria-checked`/`aria-selected` owned by the group) so a curve palette is one control, not 28. **Lock carried from the bank**: *"A repair order listing this as a scene-side change is unexecutable"* — the alternative we hold at 7.0.0 is the ToggleGroup reshell (real `<button>`s, the S-2 constraint), which trades the Chip's look for a working group. Additive, priced by you.

### R-10 · **CC-D-9 (≡ KPT D:D-5/L:D-4/C:C-3.1) + KF-ET-21/KF-ES-21's tier half** — a material OPT-OUT: nested `.glass-wash` doubles the rung; tiered chips inside a masked scroller stack translucent plates (LIVE)

- **Measured**: the dist's `.glass-wash` rules are depth-keyed (`…:not(.glass-wash) { --glass-depth: var(--glass-depth-content); }` · `.glass-wash[role="combobox"] { border-color: var(--surface-tint-15); }`); the demo nests `.glass-wash` inside `.glass-wash` at the tab strip (dies with S-1) and paints **28 concurrent floating-tier plates** inside the easing drawer (the Chip chunk composes `glass-capsule` + `glass-chip` + `glass-fill-*` on every item; three stacked translucent surfaces at the sidebar, KF-ES-21).
- **Ask**: a consumer-reachable material opt-out — a prop or utility that lets a child inside a washed/tiered host render CONTENT-tier (no backdrop-filter, no second wash) without forking the component. Our one glass-tier decision for the wave (§2.6 of the wave record) is *host floats, contents do not*; where the Chip cannot be told so, the reshell arm of R-9 is the fallback and this ask is its counterparty.

### R-11 · **KF-APP-5 (≡ EditorShell D-1/L-1/C-1 · EditorHeader F3 · EH-7 rides)** — the collapsed-at-rest header ribbon: `inert` + `aria-hidden` + zero width until anchored (LIVE, producer half)

- **Measured at `dist/header-ribbon.js:74-75`**: `inert: !w.value || void 0, "aria-hidden": !w.value` — the ribbon's controls are inert AND hidden from AT whenever the anchor state is false, and at rest the band has zero width. With no `#anchor` supplied (our half) the three chrome controls are unreachable by keyboard: **the completing lemma at the bank — NO KEYBOARD ROUTE TO SHARE OR THEME-TOGGLE EXISTS ANYWHERE IN THE APP; on touch the shortcuts modal is WHOLLY UNREACHABLE** (banked B at `kf-App`, won three times against re-filings).
- **Split, stated both ways**: CONSUMER HALF is ours (supply `#anchor` / adopt the real API, W6-L). **PRODUCER HALF — the ask**: a collapsed-at-rest state that keeps ONE tab stop (a disclosure) rather than `inert`-ing the whole band; or a documented contract that a ribbon without an anchor is a bug, so the consumer failure is loud instead of silent.

### R-12 · **KF-SCR-2 ≡ KF-EST-2 (PERMANENT arm) + SpringHeatmap D-m4's producer datum** — `text-caption` is italic while no italic face ships (LIVE — one font decision, yours to answer, ours to take)

- **Measured**: the dist declares **0** `@font-face` with `font-style: italic` (grep over `dist/` → none) and **0** `font-synthesis` declarations; `font-style: italic` occurs **4** times in the shipped CSS (your I-32 B-1 confirms `sm`'s `text-caption` is italic). The demo sets `font-synthesis: none` at `:root` (`demo/styles/style.css:100`, its `:50` comment says why), so **every italic register paints UPRIGHT demo-wide** (8 `text-caption` sites; the hero's italic paints upright for the whole swap window; THP MISSED-2's empty-state differentiator is dead).
- **Ask (one font decision)**: does glass intend an italic face for its text family (ship it, and say which subpath preloads it), or is `text-caption`'s italic a synthesis dependency (declare it in the register's docs so consumers that forbid synthesis know the register is upright for them)? **Our decision at 7.0.0 (wave record §2.10)**: the demo does not synthesize; italic that cannot paint is RETIRED from the demo's register with a real differentiator put in its place; the stale `:32-33` comments are corrected in the same commit.

### R-13 · **W6-AUTH-1** — the `useTabRovingFocus` export ask is WITHDRAWN as ANSWERED (DISPOSED — I-32 A-7; the re-shaping is recorded)

- **Measured at 7.0.0, the door you named**: `./motion-core` is a published subpath; `dist/motion-core.js` exports **`useSelectionGroup` + `useSelectionIndicator`** and imports the private chunk `useTabRovingFocus-Dh4yBGxq.js` (1 import); `./tabs` still publishes exactly ONE symbol (`export { W as SegmentedTabs }`). **A-7 holds at our pin**: the composable is reachable through `useSelectionGroup` on `./motion-core`; exporting the private composable itself is declined (*"one machine, one door"*).
- **What changes for us (W6-AUTH-1 (a)/(b), re-ruled at the wave record §2.11)**: CC-C-6's successor formula stays `SegmentedTabs semantics="tabs" variant="pill"` for the MOUNTED arm; the RETAINED-composable arm now targets **`useSelectionGroup` via `./motion-core`** (price accepted: `model` + `containerRef` required, `select` recenters), never the private chunk — a private-dist deep import still fails G-W6-2. KPT-SUP-4's 7-case gate migrates onto whichever arm unit `c` lands. **No ask survives.** The bank's half-false cell (D-INV-2, `kf-ChannelControls.md:50`) is corrected by E-3 addendum at our end.

### R-14 · **SquareInstrument D-20 / KF-AT-22 / L-EST-2** — the BG-6 ask, RE-DERIVED against the tokenized producer: WITHDRAWN as STALE (NOTICE)

- **Measured across the 7.0.0 dist**: `--font-display-weight: 600;` · `--type-weight-display: var(--font-display-weight);` · `--type-tracking-display: -0.015em;` all ship (plus their `var(--type-weight-display)` / `var(--type-tracking-display)` consumers). The BG-6 ask as previously worded (a display-weight token) asked for what 7.0.0 already ships — the ColorSpaceSelector L-10 stale-cell precedent, applied.
- **What changes for us**: `SquareInstrument.vue:255-262`'s *"no token to swap it"* comment is FALSE and the eight-selector block becomes **two re-points** (`--type-weight-display` + `--type-tracking-display`); AnimatedText's and EditorStartScreen's stale comments die in the same commits (KF-CE-41); the cure lands at `:root`, never `@theme`. **No ask.**

### R-15 · **SequencePlayhead C-3 (+ D-7 residue)** — the `--specular` colour register is NOT producer-owned; the demo will mint `--specular`/`--shade` beside your positional family (NOTICE — name a collision if you see one)

- **Measured**: the dist ships `--specular-x` (9) · `--specular-y` (8) · `--specular-intensity` (11) · `--specular-angle` (7) — **positional registers, no `--specular` colour and no `--shade`**. `demo/DESIGN.md:53-57` names the playhead cap a `--specular` consumer while the token exists nowhere; the demo therefore defines `--specular`/`--shade` as `light-dark()` pairs on its own `:root` (RETAINED-BY-POLICY under design-idioms.css's stated override policy) and repoints the raw `white`.
- **Notice, not ask**: if `--specular` (bare) is a name your 10.0.0 plate register intends to claim, say so and we prefix ours; otherwise the demo's mint stands.

### R-16 · **KF-KC-4 + KF-KC-13 + KC-5 + KF-KE-30's producer half** — the BARE focus-plate variant, and a radius-neutral `.focus-ring` (LIVE; the root-styling law forbids per-instance erasure at our end)

- **Measured**: the shipped `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` (emitted at `dist/styles/utilities/base.css` byte 948 and `a11y-overrides.css` byte 708) **binds `--radius-pill` onto the HOST** — a consumer with a rectangular host (the heatmap `rounded-md`, the `demo-box`, a code well) cannot adopt the class without its box going pill on focus, which is why the demo carries an unlayered same-name shadow (`design-idioms.css:76-78`, no radius) — the REALIZED class-name collision KF-KE-30 convicts. Separately, the demo's utilities cancel `field-control`'s components-layer focus paint at the keyframe card (KF-KC-4/-13), and KC-5 notes 8.0.0's outline-painted focus cures the offset field — **unavailable to us at the ruled 7.0.0 pin**.
- **Asks (the cure shape KF-KC-4 prescribes — *"REQUEST THE BARE VARIANT FROM GLASS (root-styling law), never per-instance erasure"*)**: (a) a `.focus-ring` (or variant) that paints the ring at the host's OWN radius (no `border-radius` on the host); (b) a bare `field-control` focus variant a consumer can compose with its own plate without erasing the control's affordance. **Our 7.0.0 resolution of the collision (wave record §2.4)**: the demo's shadow is PREFIXED, never a fight over the shared name.

---

## §2 · Negative space — disposed, not re-sent; recorded so no seat re-opens them

1. **A-13 `--rainbow-*` two-producer collision** — your DECLINE stands (the documented override surface); the demo's copy is RETAINED-BY-POLICY in the W6-D disposition table (`design-idioms.css:9-11` states the policy). Not re-sent.
2. **A-14 `--shadow-glass-*` bridge does not emit** — CURE-NOW (README); our interim reads `--glass-shadow-quiet`/`-resting`, never the bridge spelling (KF-APP-25 ≡ KF-SKEL-2). Not re-sent.
3. **A-7 / A-4 / A-3** — carried above as DISPOSED with the 7.0.0 consequence only.
4. **KF-KE-30 (class space)** — the demo-side half is a census §6.3 E-3 addendum at our end; only the producer variant ask (R-16) travels.
5. **SpringTrace C-3's export ask** — KF.W5's, not this wave's; not carried here.
6. **`/timeline` (A-8/A-9)** — KF.W7's evaluation; not this wave's inventory.

## §3 · What KF.W6 ships at 7.0.0 meanwhile — every interim RECORDED AS INTERIM, this letter the counterparty (§Sequencing 7)

| row | interim at 7.0.0 | what retires it |
|---|---|---|
| R-1 MM-4/KF-KC-10 | a demo-local UNLAYERED override for MbabbMenu (MM-44: the only consumer) and the keyframe-card label; no `:deep` | your layering (A-3 class, 10.0.0) — or an answer that `.glass-label` layered already |
| R-3 Boolean cast | MbabbMenu passes `modal` explicitly (the MUST-CARRY rider on M-4); the LabeledSelect consumer half stays with OPTIONS-UNIT | `default: undefined` producer-side |
| R-4 KF-HA-2 | halved ceiling (admissible interim) pending the owner's blessed number | placeholder hidden on arm |
| R-5 KF-HA-12 | two-line consumer stopgaps (forced-colors plate, reduced-transparency opacity) | producer sweep membership |
| R-6 KF-HA-9 | `useWindowSize()` + PRM early-out on the consumer's own pointer handlers; ONE pointer-policy pass | the `:2384` guard on all `wake()` paths |
| R-7 KF-SST-30 | `.tap-floor` DELETED (0 adopters — wave record §2.1); target sizes are `size`-driven on the producer's controls; no coarse-only class floor | the removal major named; a Button/Input coarse arm |
| R-8 KSM R-1 | consumer wiring TAIL only on discharge; interim sr-only keycap twins | the LIFO/FIFO-designed suspend API |
| R-9 KF-ET-10 | the ToggleGroup reshell arm (real `<button>`s) OR the 28 chips stand with the decline written | the selectable chip-group |
| R-10 CC-D-9 | one rung (the nested wash dies with the strip); the tier decision at the host | the material opt-out |
| R-11 KF-APP-5 | `#anchor` supplied / the real API adopted | the producer's collapsed-state contract |
| R-12 KF-SCR-2 | italic RETIRED from the demo register; a real differentiator; comments corrected | your font decision |
| R-16 focus | the demo's `.focus-ring` shadow PREFIXED; `field-control` never erased | the bare / radius-neutral variants |

## §4 · Reply asks

Row it in your ledger; reply **by row id `R-1`..`R-16`**; name any DISPOSED row you think we mis-read; answer R-1's `.glass-label` membership, R-7's removal major and coarse arm, R-12's font decision, and R-3's Boolean roster. Reply path unchanged: `docs/tranches/BK/coordination/` on your side; our `GLASS-INBOUND-*` grammar in `value.js/docs/tranches/V/coordination/` on ours. **One letter, every row; this wave sends no second.**

— value.js, X·KF KF.W6 unit `b` (the relay seat)
