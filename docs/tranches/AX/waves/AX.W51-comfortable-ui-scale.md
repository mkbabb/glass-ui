# AX.W51 — Comfortable UI sizing: ONE library-wide `--ui-scale` scalar the CVA bases + the control-pills + the glyphs all read, the dock/dropdown scales re-homed as specializations, coarse-pointer amplified

**Band** G · PRIMITIVES (sizing umbrella) · **Severity** major (D18 — the user's live ask: "touch targets + font-size are generally too small — the shadcn-vue compact defaults: h-9/text-sm. Increase BOTH — touch-target size AND font-size — library-wide on BOTH axes, in an idiomatic, non-contrived, MODERN way: one coordinated size/density scale, not per-component hacks")
· **dependsOn** AX.W00 (the π visual-runtime lane — the fail-CLOSED close machinery + the getComputedStyle readback). **Sequencing INVERTED at HEAD:** the CONVERGENCE-PLAN mandate was "W51 BEFORE W45/W50 so they specialize the global axis," but **W45 already shipped `--dock-scale`** (HEAD `6569b7a`) and W50 is authored-not-landed — so W51 is a **RETRO-RECONCILE**: it re-homes the already-shipped `--dock-scale` onto `--ui-scale` and pre-wires W50's dropdown scale to read the same axis. There is no clean pre-sequence left; the reconcile is non-optional (or there are two parallel scale systems — the exact "three scales" the umbrella exists to kill).
· **Charter** `docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md:31` (D18 — "the library-wide `--ui-scale` comfortable-sizing system; D15 dock + D17 dropdown become specializations that read it") + `docs/tranches/AX/audit/convergence/CONVERGENCE-PLAN.md:29` (the W51 mint + the "W45/W50 specialize" clause) + `docs/tranches/AX/audit/inventory/MASTER-PLAN.md` Batch 6 (`W51→W50→reconcile --dock-scale onto ONE --ui-scale`)
· **Audit** `docs/tranches/AX/audit/inventory/S-conv1.md:143-206` (the "biggest structural gap in the lane" diagnosis + the retro-reconcile mandate + the gestalt-path-forward §1) + the SOURCE probe done at authoring time (the born-RED witnesses below are grounded by grepping the ACTUAL `src/` at HEAD, not a re-statement of a finding file — D18 is an umbrella charter row, no per-defect `Dxx.md`)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer
> session drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave
> does NOT close on a green headless gate; it closes on a LIVE chrome-devtools-mcp + frontend-design
> audit with a captured paired-π BEFORE/AFTER + DELTA. Per the hardened agent git clause (K W0):
> agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* **`--ui-scale`** is the ONE master comfortable-sizing scalar (a unitless `@property
> <number>`, default `1`, the identity). Every interactive-atom magnitude that is currently a buried
> Tailwind literal (`h-9`/`h-10`/`h-11` control heights, `text-sm`/`text-xs`/`text-base` control
> fonts, `size-3.5`/`size-4` glyphs, the `.btn-pill`/`.input-pill` `padding`/`font-size`/`height`)
> re-expresses as `calc(<base> * var(--ui-scale))` so ONE knob grows control HEIGHT + PADDING + GAP +
> FONT-SIZE + GLYPH in lockstep — proportion preserved, no per-component hack. **The specializations**
> are `--dock-scale` (W45, already shipped) and the W50 dropdown type-scale — re-homed as
> `calc(var(--ui-scale) * <local>)` so they are LOCAL OVERRIDES ON the global axis, not parallel
> systems. **Coarse-pointer amplification** is the existing `@media (pointer: coarse)` idiom (W45's
> `--dock-scale: 1.5` precedent) lifted to the global axis: `:root { --ui-scale: <coarse-default> }`
> under coarse-pointer, so the whole library grows ~1.5× on touch from ONE place.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `6569b7a` (3.8.0 + the AX integrated band) on **five** falsifiable
witnesses, each a source-true probe the new `proof:ui-scale` gate inverts. The library inherits the
shadcn-vue COMPACT defaults verbatim — every control height, control font, and glyph is a raw Tailwind
literal with NO shared comfort scalar — so a consumer who wants the whole library one notch larger (the
user's literal ask) has NO single seam, and the three scale systems that DO exist (`--dock-scale`, the
authored W50 dropdown scale, and "nothing" for the rest) are uncoordinated. Source-confirmed at HEAD:

- **RED witness 1 (the headline — there is NO `--ui-scale` token anywhere; grep-falsifiable).**
  `grep -rn "\-\-ui-scale" src/` returns **0** at HEAD — no global comfort scalar exists in
  `tokens.css`/`theme.css`/any CVA. The ONLY size-scale token in the library is the dock-local
  `--dock-scale` (`tokens.css:1111`, default `1`) — a SPECIALIZATION with no master to specialize. The
  typography ladder (`typography.css:100-107`, the `--type-*` rungs) is a static φ-scale read directly,
  with no comfort multiplier. **Falsifiable RED:** *`grep -rn "\-\-ui-scale" src/` → 0 hits at HEAD
  (RED — no master sizing axis). After the wave: `--ui-scale` is a minted `@property <number>` (default
  `1`) in `tokens.css §sizing`, registered + read by the control CVAs + the pills + the glyph tokens;
  `grep` returns the mint + ≥ N consumer reads (GREEN).*

- **RED witness 2 (the control HEIGHTS are buried raw `h-*` Tailwind literals — no calc, no token;
  grep-falsifiable).** Every interactive control hardcodes its height as a raw Tailwind class with NO
  scale derivation: `button/index.ts:72-77` (`h-10`/`h-7`/`h-9`/`h-11` across the five size rungs),
  `toggle/index.ts:41-43` (`h-10`/`h-9`/`h-11`), `avatar/index.ts:12` (`h-10`),
  `select/SelectTrigger.vue:32` (`'h-9' : 'h-10'`), `combobox/ComboboxInput.vue:33` (`h-10`),
  `command/CommandInput.vue:32` (`h-11`), `number-field/NumberFieldInput.vue:37` (`h-10`),
  `tabs/TabsList.vue:34` (`h-10`), `toast/ToastAction.vue:23` (`h-8`), plus the CSS pills
  (`glass.css:522` `.input-pill { height: 2.5rem }`, `.btn-pill:467` `padding: 0.5rem 1rem` — height
  implied by padding+line). **Falsifiable RED:** *grep the `ui/` CVA bases + size files for raw `h-7`/
  `h-8`/`h-9`/`h-10`/`h-11` → at HEAD ≥ 18 literal hits across ≥ 9 files, 0 of them `calc(… *
  var(--ui-scale))` (RED — no comfort axis on the height). After the wave: the canonical interactive-atom
  heights derive through the scale — either the CVA literal is replaced by a `--control-h-*` token cohort
  (`calc(<base> * var(--ui-scale))`) the size rungs read, or the height is lifted onto the
  `.btn-pill`/`.input-pill`/`.input-pill`-class register that itself scales; no comfort-bearing control
  height is a bare `h-N` literal off the axis (GREEN).*

- **RED witness 3 (the control FONT-SIZES are buried raw `text-sm`/`text-xs`/`text-base` literals —
  the user's "font-size too small" defect; grep-falsifiable).** The control type is hardcoded with NO
  comfort scalar: the button base (`button/index.ts:22`, `text-sm`), the toggle base
  (`toggle/index.ts:30`, `text-sm`), the badge size rungs (`badge/index.ts:32-34`,
  `text-xs`/`text-sm`/`text-base`), the alert (`alert/index.ts:8`, `text-sm`), the pill CSS
  (`glass.css:468` `.btn-pill { font-size: 1rem }`, `:533` `.input-pill { font-size: 1rem }`), plus the
  whole picker family's `text-sm`/`text-xs` leak W50 catalogs. The `--type-*` ladder
  (`typography.css:100-107`) is a STATIC φ-scale — `--type-small: 0.875rem` is a fixed value, read
  directly, with no comfort multiplier between the rung and the painted control. **Falsifiable RED:**
  *set a hypothetical `:root { --ui-scale: 1.25 }` at HEAD and mount any control → NOTHING grows (the
  font is a raw `text-sm`, the height a raw `h-9`, neither reads a scale; RED — the override is dead, the
  exact token-first failure the user hit). After the wave: that one override grows every control's height
  + padding + font-size + glyph in lockstep (GREEN — the `--type-*` ladder gains a comfort multiplier the
  control fonts read, OR the control fonts derive `calc(<type-rung> * var(--ui-scale))`; ratify the
  ladder-vs-control attachment point in §Open-questions).*

- **RED witness 4 (the GLYPH sizes are buried raw `size-*` literals — no glyph-grows-with-control
  axis; grep-falsifiable).** The icon glyphs are hardcoded: `button/index.ts:22`
  (`[&_svg:not([class*=size-])]:size-4`), `toggle/index.ts:30` (`size-4`), `badge/index.ts:9`
  (`size-3.5`), `alert/index.ts:8` (`[&>svg]:size-4`). The ONLY glyph that scales with its control is
  the dock icon (`tokens.css:1116`, `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))`) — and it
  reads `--dock-scale`, NOT a global axis. So on a library-wide comfort bump the control box grows but
  its glyph stays `size-4` (16px) — the proportion BREAKS. **Falsifiable RED:** *grep the CVA bases for
  raw `size-3.5`/`size-4` glyph literals → at HEAD ≥ 4 hits, 0 reading a scale axis; the dock glyph reads
  `--dock-scale` not `--ui-scale` (RED — glyph off the comfort axis). After the wave: the canonical
  control glyph derives `calc(<base> * var(--ui-scale))` (a `--ui-glyph` token cohort the un-sized-`<svg>`
  rule reads), keeping the host-sized-icon escape (`:not([class*=size-])`) intact; the glyph grows WITH
  the box (GREEN).*

- **RED witness 5 (the THREE scale systems are uncoordinated — `--dock-scale` is a parallel axis with
  no master; grep + reconcile-falsifiable).** `--dock-scale` (`tokens.css:1111`) defaults `1` and
  amplifies to `var(--dock-mobile-scale, 1.5)` under `@media (pointer: coarse)` (`dock.css:1634`) — a
  COMPLETE local scale system that grows the dock chrome but reads NO global axis. W50's authored
  dropdown type-scale is a SECOND would-be-parallel system. The rest of the library is a THIRD
  (un-scaled). So a coarse-pointer bump that the dock honors (1.5×) the buttons/inputs/badges do NOT —
  the library scales INCONSISTENTLY on touch. **Falsifiable RED:** *at HEAD `--dock-scale` is `1` /
  coarse `1.5` with NO `var(--ui-scale)` factor in its definition (`grep "dock-scale:" → calc-free`);
  under coarse-pointer the dock grows 1.5× but a `<Button>`/`<Input>` does NOT (RED — inconsistent touch
  scaling, the three-scale split). After the wave: `--dock-scale` is re-homed as
  `calc(var(--ui-scale) * var(--dock-local-scale, 1))` so the dock multiplies ON TOP of the global comfort
  axis (its coarse amplification rides the global coarse default + an optional dock-local extra), and the
  whole library — buttons, inputs, badges, dock — grows in lockstep on touch from ONE coarse-pointer
  default (GREEN — ONE scale system, the dock/dropdown as specializations).*

The wave is RED at HEAD on all five; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the five
witnesses on the live demo at `localhost:5173`: `grep` the source for `--ui-scale` (absent); set
`document.documentElement.style.setProperty('--ui-scale','1.3')` in the console on `/primitives/buttons`
+ `/forms/*` and confirm NOTHING resizes (the override is dead at HEAD — the witness-3 falsifier); emulate
a coarse-pointer (DevTools device toolbar) on a page with both a `<GlassDock>` and a `<Button>` row and
confirm the dock grows ~1.5× while the buttons do NOT (the witness-5 inconsistent-touch split). Capture
the BEFORE π render (the compact buttons/inputs at desktop; the inconsistent coarse-pointer growth) as the
born-RED baseline in `audit/W51-ui-scale.json`. Do NOT proceed on the audit's word — re-prove (the
cardinal AX lesson).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

ONE library-wide `--ui-scale` comfortable-sizing scalar (a unitless `@property <number>`, default the
identity `1`) threaded through the interactive-atom CVA base sizing + the control pills + the glyph
cohort + the control-font attachment so a SINGLE knob grows control HEIGHT, PADDING, GAP, FONT-SIZE, and
GLYPH in lockstep — proportion preserved, no per-component hack, idiomatic + modern. The
already-shipped `--dock-scale` (W45) is re-homed as a SPECIALIZATION (`calc(var(--ui-scale) * <dock-local>)`)
and W50's dropdown scale is pre-wired to read the same axis, so there is ONE scale system, not three. The
`@media (pointer: coarse)` amplification is lifted to the global axis (ONE coarse-pointer default grows
the WHOLE library ~1.5× on touch, the dock's existing 1.5× becoming the global default it now shares),
and a consumer re-tints the entire library's comfort/density from a single `:root { --ui-scale: … }`
override — the token-first axis (J invariant 1). Every magnitude a token, no buried `h-9`/`text-sm`/
`size-4` literal off the comfort axis; the shadcn compact-default leak excised on the size axis.

---

## Scope (the gestalt fix — ONE scalar, no per-component hack, no parallel scale)

The five witnesses are the SAME pathology — the library inherits the shadcn-vue compact size/font/glyph
literals verbatim, with no comfort scalar, and the one scale system that exists (`--dock-scale`) is a
parallel local axis — read at five altitudes (height, font, glyph, the no-token headline, the
three-scale split). ONE cohesive token-first transposition, all magnitudes routed through ONE scalar:

1. **Mint the master scalar (the headline — RED 1).** ADD `--ui-scale` to `tokens.css §sizing` (the
   `--size-*`/`--dock-scale` neighbourhood, `:1068-1116`), registered
   `@property { syntax:"<number>"; inherits:true; initial-value:1; }` — INHERITS true (unlike the
   specular `@property`s) so a consumer can set it on ANY ancestor scope (a `:root`, a dialog, a dense
   data-table region) and every descendant control re-derives. Default `1` = the identity (the current
   desktop proportion preserved byte-exact when `--ui-scale == 1`; the comfort BUMP is the coarse-pointer
   default + the consumer override, NOT a desktop-default change that would re-flow every existing
   consumer — RATIFY the desktop default in §Open-questions, recommend `1`).

2. **Derive the control HEIGHT cohort through the scale (RED 2).** Mint a `--control-h-*` token cohort
   in `tokens.css §sizing` — `--control-h-sm`/`--control-h-md`/`--control-h-lg` (the canonical
   2.25rem/2.5rem/2.75rem register the `h-9`/`h-10`/`h-11` rungs encode) each as
   `calc(<base> * var(--ui-scale))` — and re-point the control heights onto them: the `.btn-pill`/
   `.input-pill` CSS (`glass.css:467,522` — replace the literal `padding`/`height: 2.5rem` with the
   `calc`-scaled token), and the CVA size rungs that carry a raw `h-N` (button/toggle/avatar size
   variants, the select/combobox/command/number-field/tabs/toast heights). The size rungs that are pure
   layout (icon-only `h-10 w-10`) scale through the same token. The 44px WCAG-2.5.5 touch floor survives
   as a `max(…, 44px)` clamp INSIDE the scaled control-size under coarse-pointer (the W45 precedent —
   a consumer dialing `--ui-scale` below 1 cannot drop a control under the target).

3. **Attach the control FONT to the comfort axis (RED 3 — the user's "font too small").** Add a comfort
   multiplier between the static `--type-*` φ-ladder and the painted CONTROL font: mint a `--control-text`
   / `--control-text-sm` token pair `calc(var(--type-small,…) * var(--ui-scale))` (the control-font
   register, distinct from the φ-display ladder which stays a pure typographic scale — display headings
   do NOT grow with the comfort/touch axis, only interactive-control text does), and re-point the
   `.btn-pill`/`.input-pill` `font-size: 1rem` + the button/toggle/badge/alert `text-sm`/`text-xs` control
   bases onto it. **Coordinate with W50:** W50's `--dropdown-text` becomes
   `calc(<base> * var(--ui-scale))` — the picker family reads the SAME comfort axis (the W50 "one
   `--dropdown-text` token" IS the dropdown specialization of this control-font register; pre-wire the
   factor here, W50 lands the family re-point). The φ-DISPLAY ladder (`--type-display-*`,
   `--type-title`/`--type-heading`) is OUT of scope — it is the typographic identity, not a comfort axis
   (RATIFY the ladder-vs-control split in §Open-questions; recommend: only interactive-CONTROL text rides
   `--ui-scale`, prose/display stays the pure φ-scale).

4. **Derive the GLYPH through the scale (RED 4).** Mint a `--ui-glyph` / `--ui-glyph-sm` token cohort
   `calc(<base> * var(--ui-scale))` (the 1rem/0.875rem control-glyph register the `size-4`/`size-3.5`
   literals encode) and re-point the un-sized-`<svg>` rule in the button/toggle/badge/alert CVA bases onto
   it via an arbitrary-value class (`[&_svg:not([class*=size-])]:size-[var(--ui-glyph)]`) — KEEPING the
   `:not([class*=size-])` host-sized-icon escape intact (a consumer passing `size-9` still wins; the
   `cn()` deduplicator's `/^size-/` bucket is unaffected — the var-class is the un-sized default, the
   literal class is the override). The dock glyph (`--dock-icon-glyph`, `tokens.css:1116`) re-homes to
   read the reconciled `--dock-scale` (which now folds `--ui-scale`), so it inherits the global axis
   transitively.

5. **RECONCILE `--dock-scale` onto `--ui-scale` (RED 5 — the retro-reconcile, the non-optional clause).**
   Re-home the already-shipped `--dock-scale` (`tokens.css:1111`) as
   `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))` — the dock MULTIPLIES on top of the
   global comfort axis. Its coarse-pointer amplification (`dock.css:1634`,
   `--dock-scale: var(--dock-mobile-scale, 1.5)`) re-expresses so the 1.5× rides the GLOBAL coarse default
   + an optional dock-local extra, NOT a parallel hardcoded 1.5 (the dock's mobile growth becomes the
   global coarse default it now SHARES — see fold 6). `--dock-mobile-scale` survives as the dock-local
   extra knob (presets-in-consumers: a consumer dialing the dock larger than the global comfort still
   works). **No double-scale:** the dock geometry cascade (`dock.css:245-400`,
   `calc(<base> * var(--dock-scale))`) is UNTOUCHED — it already reads `--dock-scale`; re-homing the
   SCALAR's definition cascades the global axis through every existing dock `calc` for free (zero edits to
   the 150-line dock geometry cascade — the reconcile is at the scalar's DEFINITION, the whole point of
   the token-first axis).

6. **Lift the coarse-pointer amplification to the GLOBAL axis (RED 5 — ONE consistent touch scale).**
   Add a `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); } }` block (the W45
   `--dock-scale: 1.5` idiom lifted to the master scalar) so the WHOLE library — buttons, inputs, badges,
   toggles, the dock — grows ~1.5× on touch from ONE place. The dock's prior coarse block
   (`dock.css:1634`) re-expresses to honor the global default (it either drops its own coarse override
   entirely — inheriting the global 1.5× via the reconciled `--dock-scale` — or keeps a dock-local EXTRA
   multiplier `--dock-mobile-scale` that stacks ON the global coarse default; RATIFY in §Open-questions,
   recommend: the dock inherits the global coarse default and `--dock-mobile-scale` becomes the optional
   stack-extra, default `1`). The WCAG 44px floor clamp (fold 2) guarantees the touch-target minimum
   regardless of the scalar. `--ui-coarse-scale` is the public library-default identity (presets-in-
   consumers: a consumer sets 1.3/1.75 on `:root` or a scope).

### KEEP — the axes `--ui-scale` does NOT touch (the no-overfit boundary)

UNCHANGED: the φ-DISPLAY ladder (`--type-display-*`/`--type-title`/`--type-heading`/`--type-subheading`,
`typography.css:108-119` + `:252-269`) — the typographic identity, a pure φ-scale, NOT a comfort axis (a
hero/title does not grow on touch; only interactive-CONTROL text rides `--ui-scale`). The host-sized-icon
escape (`:not([class*=size-])` — a consumer's explicit `size-9` still wins). The `cn()` deduplicator's
`/^size-/` conflict bucket (the var-class is the un-sized default; the literal override class is what
collides — no false-merge). The CARD/PANEL/CONTAINER radii + paddings (a container is not a comfort-axis
control — its `--radius-*`/`--space-*` are separate axes; D18 is about TOUCH-TARGET controls + control
FONT). The dock geometry `calc` cascade (`dock.css:245-400`) — it reads `--dock-scale`, which now folds
`--ui-scale`, so it inherits the axis for FREE (no edit). The `--dock-mobile-scale` dock-local knob (kept
as the stack-extra). The W50 picker family re-point (W50 OWNS the family-wide `--dropdown-text` re-point;
W51 pre-wires the `* var(--ui-scale)` factor + mints the control-font register W50's token reads — the
family edit is W50's, not W51's).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **The dock is the SHIPPED proof the reconcile preserves (`dock.css` geometry cascade).** W45's
  `--dock-scale` cascade is the EXISTING working proof that "ONE scalar grows every axis in lockstep" —
  the reconcile re-homes the scalar's definition so the dock keeps working byte-identically at
  `--ui-scale == 1` AND now inherits the global axis. The live audit confirms the dock is UNAFFECTED at
  desktop (the reconcile is transparent at scale 1) and grows consistently with the rest of the library
  on coarse-pointer.
- **W50 (dropdown type-scale) is the dropdown SPECIALIZATION (`convergence/CONVERGENCE-PLAN.md:28`).**
  W50 lands the picker-family `--dropdown-text` re-point; W51 mints the control-font register
  (`--control-text`) + the `* var(--ui-scale)` factor W50's token derives through, so the picker family
  reads the SAME comfort axis. W51 writes NO picker-family edit (W50's bound); it pre-wires the axis the
  W50 gate asserts against.

---

## SOTA deepening (comfortable-sizing research)

The D18 ask is the MODERN-comfortable-density transposition every current design system ships — the
"one coordinated size/density scale, not per-component hacks" the user named. The SOTA pattern, grounded:

**ONE scalar over per-component density props (the architectural transposition).** Material 3's
density-scale, Radix Themes' `scaling` token, and the iOS Dynamic-Type axis all converge on ONE root-level
multiplier that every control derives through `calc`, rather than N per-component `size`/`density` props
the consumer threads everywhere. The transposition for glass-ui: a single `@property <number>`
(`--ui-scale`, inherits:true) that the CVA bases + the control pills + the glyph cohort read via
`calc(<base> * var(--ui-scale))` — the consumer sets it ONCE (on `:root`, or a scoped region for a dense
data-table), and height/pad/gap/font/glyph grow proportionally. This is the token-first axis (J invariant
1) applied to SIZING: no consumer edits a component's `class` to resize the library; one token re-tints
the comfort of every control.

**`@property` with `inherits:true` is the correct registration (the typed-scalar SOTA).** Registering
`--ui-scale` as `@property { syntax:"<number>"; inherits:true; initial-value:1 }` (vs a plain custom
property) buys three things: (a) a guaranteed `<number>` type so `calc(<base> * var(--ui-scale))` is
always valid (a plain var with a malformed override would invalidate the whole `calc`; the typed property
clamps to the initial value on a bad set — fail-safe); (b) inheritance so a SCOPED override (a dense
region) cascades to descendants without a per-element set; (c) it is animatable (a consumer COULD spring
the scale on a density toggle — not used at landing, but the type makes it free). The specular
`@property`s (`tokens.css:1935-1950`) are the in-repo precedent — W51 mirrors the idiom with `inherits:true`
(the specular ones are `inherits:false` because they are per-element pointer state; `--ui-scale` is a
cascading comfort axis, so it inherits).

**The comfort bump belongs at the COARSE-POINTER default + the consumer override, NOT the desktop
default (the no-reflow discipline).** Bumping the DESKTOP default above `1` would re-flow every existing
consumer's layout (every button taller, every input wider) — a breaking visual change for a library
already shipped. The SOTA move (and the W45 precedent — `--dock-scale: 1` desktop / `1.5` coarse) is:
desktop default = `1` (byte-exact preservation), the comfort GROWTH lives at the coarse-pointer default
(`--ui-coarse-scale: 1.5`, where the user's "too small on mobile" ask bites) + the consumer's explicit
`:root` override (where a consumer who wants a comfier desktop opts in). The user's "too small on
desktop too" is addressed by making the override TRIVIAL (one token) — not by shipping a desktop reflow
the consumers did not ask for. RATIFY the desktop default (recommend `1`; if the user wants a shipped
desktop comfort bump, `1.0625`/`1.125` is a one-token change — flagged for the live audit).

**The φ-display ladder is OUT of the comfort axis (the scope discipline).** Comfort/touch scaling is for
interactive CONTROLS (the things you tap — buttons, inputs, the targets the WCAG 44px floor governs) and
their text. A hero title or a display heading is a TYPOGRAPHIC identity, not a touch target — it does not
grow on coarse-pointer (a 287px hero growing to 430px on a phone is wrong). So `--ui-scale` rides the
CONTROL-font register (`--control-text`) + the control box, NOT the `--type-display-*`/`--type-title`
φ-ladder. This keeps the comfort axis precise (the user's ask is "controls too small," not "make the hero
bigger") and the φ-scale's typographic relationships intact.

**Reconciliation note:** W51 MINTS the master scalar + the `--control-h-*`/`--control-text`/`--ui-glyph`
cohorts + re-points the CVA bases + the pills; it RE-HOMES the already-shipped `--dock-scale` definition
(W45) as a specialization (a one-line scalar-definition edit that cascades through the dock's existing
`calc` chain for free); it PRE-WIRES the W50 dropdown scale to read the same axis (W50 lands the
family re-point). It does NOT touch the φ-display ladder, the container/card radii+paddings, the dock
geometry cascade lines, or the picker-family CVAs (W50's). It does NOT re-mint `--dock-scale` (it re-homes
the scalar's DEFINITION) or add a per-component density prop (the ONE-scalar mandate).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **MINT** `--ui-scale` (`@property { syntax:"<number>"; inherits:true; initial-value:1 }` + the `:root { --ui-scale: 1 }` default) in the §sizing neighbourhood (`:1068-1116`, by `--size-icon-btn`/`--dock-scale`); MINT the `--control-h-{sm,md,lg}` cohort (`calc(<base> * var(--ui-scale))`); MINT the `--control-text`/`--control-text-sm` control-font register (`calc(<type-rung> * var(--ui-scale))`); MINT the `--ui-glyph`/`--ui-glyph-sm` cohort (`calc(<base> * var(--ui-scale))`); MINT `--ui-coarse-scale` (default 1.5, the global coarse default); **RE-HOME** `--dock-scale` (`:1111`) as `calc(var(--ui-scale) * var(--dock-local-scale, 1))`; ADD the `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5) } }` block; record the scale-system DOCTRINE in a §sizing header comment (ONE scalar; dock/dropdown specialize; display-ladder excluded). |
| `src/styles/glass.css` | Re-point `.btn-pill` (`:459-489` — the `padding: 0.5rem 1rem` → scaled, `font-size: 1rem` → `var(--control-text)`) + `.input-pill` (`:520-543` — `height: 2.5rem` → `var(--control-h-md)`, `font-size: 1rem` → `var(--control-text)`, `padding: 0 1rem` → scaled) onto the `--ui-scale`-derived tokens. Line-region-disjoint from W52's `.glass-material::before` specular region + `.glass-btn` hover region (the glass.css co-writer serialization — W51 owns the `.btn-pill`/`.input-pill` GEOMETRY rows, W52 owns the specular + `.glass-btn` rows). |
| `src/components/ui/button/index.ts` | Re-point the size rungs (`:72-77`, `h-10`/`h-7`/`h-9`/`h-11`/`icon` → `h-[var(--control-h-*)]` or the scaled token) + the base glyph (`:22`, `size-4` → `[&_svg:not([class*=size-])]:size-[var(--ui-glyph)]`) + the base font (`:22`, `text-sm` → the `--control-text`-derived class). KEEP the `:not([class*=size-])` escape + the variant list unchanged. |
| `src/components/ui/toggle/index.ts` | Re-point the size rungs (`:41-43`, `h-10`/`h-9`/`h-11`) + the base glyph (`:30`, `size-4`) + the base font (`:30`, `text-sm`) onto the cohort. |
| `src/components/ui/badge/index.ts` | Re-point the size rungs' fonts (`:32-34`, `text-xs`/`text-sm`/`text-base`) + the glyph (`:9`, `size-3.5`) onto the `--control-text-sm`/`--ui-glyph-sm` register (badge is a smaller control — the `-sm` rung). |
| `src/components/ui/alert/index.ts` | Re-point the base font (`:8`, `text-sm`) + glyph (`:8`, `size-4`) onto the cohort. |
| `src/components/ui/avatar/index.ts` | Re-point the size literal (`:12`, `h-10 w-10`) onto `--control-h-md`. |
| `src/components/ui/select/SelectTrigger.vue` | Re-point the `sizeClass` computed (`:32`, `'h-9' : 'h-10'`) onto the `--control-h-sm`/`--control-h-md` tokens (a scaled class). |
| `src/components/ui/combobox/ComboboxInput.vue` | Re-point the input height (`:33`, `h-10`) onto `--control-h-md`. (The `text-sm` font is W50's picker-family bound — W51 does NOT touch the picker fonts; coordinate.) |
| `src/components/ui/command/CommandInput.vue` | Re-point the input height (`:32`, `h-11`) onto the SAME shared input register the combobox uses (W50 RED-3 names the `h-10`/`h-11` mismatch — W51 unifies the HEIGHT onto `--control-h-md`; W50 unifies the FONT). Coordinate the shared register with W50. |
| `src/components/ui/number-field/NumberFieldInput.vue` | Re-point the height (`:37`, `h-10`) onto `--control-h-md`. |
| `src/components/ui/tabs/TabsList.vue` | Re-point the height (`:34`, `h-10`) onto `--control-h-md`. |
| `src/components/ui/toast/ToastAction.vue` | Re-point the height (`:23`, `h-8`) onto a scaled register (`--control-h-sm` or its own; ratify the 32px-toast-action rung). |
| `src/styles/dock.css` | Re-express the coarse-pointer block (`:1632-1636`, `--dock-scale: var(--dock-mobile-scale, 1.5)`) so the dock honors the GLOBAL `--ui-scale` coarse default + the optional `--dock-mobile-scale` stack-extra (NOT a parallel hardcoded 1.5). The dock geometry `calc` cascade (`:245-400`) is UNTOUCHED (it reads `--dock-scale`, which now folds `--ui-scale`). |
| `CLAUDE.md` | **DOCS.** Record the `--ui-scale` comfort-sizing axis in the Conventions/Design-Axes section: ONE master scalar, the dock/dropdown as specializations, the φ-display-ladder exclusion, the coarse-pointer global default, the `:root` override seam. Add the §sizing doctrine note. |
| `scripts/proof-ui-scale.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration). See HardGate. |
| `package.json` | Register `proof:ui-scale` + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W51-ui-scale.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/W51-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol). |

**OUT of bounds:** the φ-DISPLAY ladder (`--type-display-*`/`--type-title`/`--type-heading`/
`--type-subheading` — the typographic identity, NOT a comfort axis); the picker-family CVA FONTS (W50's
`--dropdown-text` bound — W51 mints the register + the factor, W50 lands the family re-point); the dock
geometry `calc` cascade rows (`dock.css:245-400` — reads `--dock-scale`, inherits the axis for free, NO
edit); the CARD/PANEL/CONTAINER radii + paddings (separate `--radius-*`/`--space-*` axes; D18 is
touch-target controls, not containers); the `--scale-hover-btn`/`--scale-press-btn` interaction scales
(W52's — those are PRESS/HOVER transform scales, a different axis than the comfort SIZE); the dock
density token cascade (`dock.css:231-400` — W45's, untouched). The `useGlassRenderer`/WebGL surfaces (not
controls). The grain/specular/material recipes (W09/W52).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs AX.W45 (dock region model + `--dock-scale` — SHIPPED; W51 RECONCILES its scalar onto the global
  axis).** W45 OWNS the dock geometry cascade (`dock.css:231-400`, the `calc(<base> * var(--dock-scale))`
  chain) + the dock density tokens + the dock coarse-pointer block. W51 RE-HOMES the `--dock-scale`
  SCALAR DEFINITION (`tokens.css:1111`) as `calc(var(--ui-scale) * <local>)` — a one-line edit at the
  scalar's source that cascades through W45's existing `calc` chain for free, and re-expresses the dock's
  coarse block (`dock.css:1634`) to honor the global coarse default. W51 does NOT touch the dock geometry
  cascade rows (those stay W45's, byte-identical — they read the re-homed scalar). The reconcile is at the
  DEFINITION, not the consumers — the whole token-first point. Sequence: W51 lands the reconcile; W45 is
  already shipped, so this is a retro-reconcile (the inverted sequence the charter flags).
- **vs AX.W50 (dropdown type-scale — authored, not landed; W51 PRE-WIRES its axis).** W50 OWNS the
  picker-family `--dropdown-text` mint + the family-wide font re-point (Select/DropdownMenu/Combobox/
  ContextMenu/Command/MultiSelect FONTS). W51 mints the `--control-text` control-font register + the
  `* var(--ui-scale)` comfort factor W50's `--dropdown-text` derives through, AND unifies the
  combobox/command input HEIGHTS onto `--control-h-md` (W50 RED-3's `h-10`/`h-11` mismatch — W51 owns the
  HEIGHT unification, W50 owns the FONT). The shared register is the coordination seam: W51 mints it +
  the height; W50 reads it for the family font. No font-CVA collision (W51 touches NO picker font; W50
  touches NO control height). Sequence: W51 BEFORE W50 (W50 specializes the axis W51 mints — the charter
  order, here honored since W50 is not yet landed).
- **vs AX.W52 (liquid-glass material — SHIPPED; shares glass.css, line-region-disjoint).** W52 owns the
  `.glass-material::before` specular region + the `.glass-btn` hover region of `glass.css`. W51 owns the
  `.btn-pill`/`.input-pill` GEOMETRY rows (the `padding`/`height`/`font-size` lines — `:459-543`).
  Line-region-disjoint per the glass.css co-writer serialization (HARDENING §G #28). W51 does NOT touch
  the specular recipe or the `--scale-hover-btn`/`--spring-smooth` transition (W52's — the INTERACTION
  scale, a different axis than the COMFORT size). W52's `.btn-pill` `scale: 1` identity base + the
  transition list are UNTOUCHED by W51 (W51 edits only the `padding`/`font-size` rows within `.btn-pill`).
- **vs AX.W54 (glass-first-class — the ROOT default) / AX.W55 (adaptive-glass) / W60 (page-redesign).**
  ORTHOGONAL — W54/W55/W60 are MATERIAL/LEGIBILITY/LAYOUT concerns (glass-by-default, contrast-over-light,
  the glass-card container layer); W51 is the SIZE/comfort axis. A control is glass AND comfortably-sized
  AND legible — three independent axes. No file overlap (W51's CVA size rungs + the pill geometry vs
  W54's glass-variant defaults — disjoint rows; coordinate only that a glass control's `--ui-scale`-derived
  height composes cleanly with its glass background, which it does — the height is geometry, the glass is
  paint). W51 mints NO glass token; W54/W55 mint NO size token.
- **vs AX.W36 (forced-colors).** DISJOINT MODE — W36's forced-colors skin does not touch control SIZE
  (sizes survive WHC; only chroma/backdrop-filter collapse). W51's scaled heights/fonts paint identically
  under WHC (a `calc(<base> * var(--ui-scale))` height is forced-colors-agnostic).

### DEDUP (the explicit boundary vs the named waves)

- **vs W45 (`--dock-scale`) — SPECIALIZATION, not duplication.** `--dock-scale` is the DOCK-LOCAL scale;
  `--ui-scale` is the GLOBAL master. W51 re-homes `--dock-scale = calc(var(--ui-scale) * <local>)` so the
  dock is a specialization ON the global axis — ONE scale system. W51 does NOT mint a second dock scale or
  re-author the dock geometry cascade (it edits ONE scalar-definition line). The "ONE scale system, not
  three" mandate is the explicit anti-duplication boundary.
- **vs W50 (`--dropdown-text`) — SPECIALIZATION, not duplication.** `--dropdown-text` is the
  PICKER-FAMILY control-font specialization of the `--control-text` register W51 mints. W51 mints the
  master register + the comfort factor; W50 lands the family font re-point reading it. W51 does NOT touch
  the picker FONTS; W50 does NOT mint the comfort axis. No parallel control-font token.
- **vs W52 (`--scale-hover-btn`/`--scale-press-btn`) — DIFFERENT AXIS.** Those are INTERACTION transform
  scales (the hover-lift + press-squish, a `scale:` transform on `--spring-smooth`). `--ui-scale` is the
  COMFORT SIZE (the control's resting height/font/glyph). A control has a comfort SIZE and an interaction
  SCALE — independent. W51 mints NO interaction scale; W52 mints NO comfort size. No collision.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W51's split (count 3):

- **Implement (≤1-2 agents — the surface is the token mint + a wide-but-mechanical CVA re-point).**
  Lands the `--ui-scale` mint + the `--control-h-*`/`--control-text`/`--ui-glyph` cohorts + the
  coarse-pointer global block + the §sizing doctrine (tokens.css); the `.btn-pill`/`.input-pill`
  re-point (glass.css); the CVA base re-points (button/toggle/badge/alert/avatar/select/combobox/command/
  number-field/tabs/toast); the `--dock-scale` retro-reconcile (tokens.css scalar + dock.css coarse block);
  the CLAUDE.md doctrine. Lint + typecheck at every interval. The token mint is one cohesive cluster; the
  CVA re-points are mechanical + line-disjoint per file (a second agent MAY split the CVA re-points from
  the token mint if the orchestrator wants parallelism — they are disjoint).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the five RED witnesses against the patched tree:
  `grep`s for `--ui-scale` (asserts minted + read); `grep`s the CVA bases for raw `h-7`/`h-8`/`h-9`/`h-10`/
  `h-11` + `text-sm`/`text-xs`/`text-base` + `size-3.5`/`size-4` literals OFF the comfort axis (asserts
  ZERO comfort-bearing literals remain — only the host-sized-icon escape literals + the φ-display-ladder
  + out-of-scope container literals survive); asserts `--dock-scale` is re-homed as
  `calc(var(--ui-scale) * …)` (NOT a bare `1`); asserts the coarse-pointer `:root { --ui-scale }` block
  exists; reads `getComputedStyle` for the WCAG-44px floor clamp under coarse-pointer.
  ADVERSARIAL twist: tries to make `proof:ui-scale` PASS with a stray `h-9` still in a CVA base
  (confirms the gate REDs on the legacy literal); sets `--ui-scale: 1.5` and asserts a control height
  grows (confirms the override is LIVE, not dead); sets `--ui-scale` below the floor and asserts the 44px
  clamp holds under coarse-pointer; confirms the dock at `--ui-scale == 1` is byte-identical to HEAD (the
  reconcile is transparent at the identity). DRIVES the VISUAL-TRUTH live audit (the binding close).
- **Gate-author (≤1 agent).** Authors `proof-ui-scale.mjs` (born-RED on the no-token + the buried-literal
  + the unreconciled-dock-scale + the no-coarse-block assertions); confirms it FAILS at HEAD `6569b7a`
  (no `--ui-scale`, the raw literals, the parallel `--dock-scale`) and PASSES on the patched tree.
  Registers `proof:ui-scale` in `package.json` + the W00 meta-gate parity. Gate-author is distinct from
  implementer (the gate must be able to FAIL the implementer's work — the AW false-GREEN class). The π
  live arm (the painted-pixel size readback) rides the W00 readback, NOT a CPU text gate alone (the SOURCE
  arm proves the calc STRUCTURE; the π arm proves the RENDER grows).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b —
mandatory):** The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template) with
the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated here. This
wave's §3a triumvirate AUTO-TRIGGERS (authored from its FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to touch the
  φ-DISPLAY ladder (`--type-display-*`/`--type-title`/`--type-heading` — the typographic identity, OUT of
  the comfort axis), the picker-family FONTS (W50's bound), the dock geometry `calc` cascade rows
  (`dock.css:245-400` — reads the re-homed scalar, never re-authored), the container/card radii+paddings
  (separate axes), the `--scale-hover-btn`/`--scale-press-btn` interaction scales (W52's), or the
  WebGL/material recipes — HALT + triumvirate (a sizing-vs-typography-vs-interaction boundary the
  FileBounds did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:ui-scale` cannot simultaneously
  assert the master mint + the zero-buried-literals + the dock-scale reconcile + the coarse-block + the
  44px floor — OR if W45's dock gate / W52's `proof:liquid-glass-material` REDs after the scalar re-home
  (the `--dock-scale` definition edit desyncing a gate that reads it) — escalate the gate design, do NOT
  relax a ceiling or split the gate to pass over a residual buried literal.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the re-pointed controls do NOT grow
  in PROPORTION (height grows but glyph/font lag, or the dock double-scales) after three authoring
  iterations, OR a control breaks layout at `--ui-scale > 1` (text clipping, a misaligned pill) after
  three retunes, dispatch research→plan→redress rather than re-tuning the calc factors ad hoc.
- **§Open-questions ratify reached un-ratified → HALT-and-ratify (Class 3).** The desktop-default
  (`1` vs a shipped comfort bump), the φ-display-ladder-exclusion, the control-font-attachment-point
  (ladder-multiplier vs control-register), and the dock-coarse-block disposition (inherit-global vs
  stack-extra) are ratify-before-impl hinges — if any reaches impl un-ratified, take the recorded default
  (desktop `1`; display-ladder excluded; control-register attachment; dock inherits global coarse +
  `--dock-mobile-scale` as the stack-extra default `1`) and run the live-audit verification step, do NOT
  self-ratify a divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:ui-scale` (NEW; the device-free SOURCE + registration
arm).** A source-parse + token-resolution + literal-absence gate (the precept-valid artefact forms per
SPEC.md §Hard Gates — source-structure for the CSS-cascade contract; the PAINTED size is proven by the π
arm below, NEVER a text gate alone):

- **The master scalar is minted + typed.** Assert `--ui-scale` exists as an `@property { syntax:"<number>";
  inherits:true; initial-value:1 }` registration + a `:root` default of `1`; assert the `--control-h-*`,
  `--control-text`/`--control-text-sm`, `--ui-glyph`/`--ui-glyph-sm` cohorts exist and each derives
  through `calc(… * var(--ui-scale))`; assert `--ui-coarse-scale` is minted. **Born-RED at HEAD**
  (`grep "\-\-ui-scale" src/` = 0).
- **No buried comfort-literal in the CVA bases.** Assert the interactive-atom CVA bases (button/toggle/
  badge/alert + the size rungs) carry NO raw `h-7`/`h-8`/`h-9`/`h-10`/`h-11` control height, NO raw
  `text-sm`/`text-xs`/`text-base` control font, and NO raw `size-3.5`/`size-4` un-sized-glyph default OFF
  the `--ui-scale` axis (the host-sized-icon escape `:not([class*=size-])` + the explicit-override
  literals + the φ-display-ladder + the out-of-scope container literals are ALLOWED — the gate's deny-list
  is the COMFORT-bearing control literals only, with an explicit allow-list for the escapes). **Born-RED
  at HEAD** (≥ 18 height + ≥ 6 font + ≥ 4 glyph literals).
- **The control pills derive through the scale.** Assert `.btn-pill`/`.input-pill` (`glass.css`) carry NO
  raw `font-size: 1rem` / `height: 2.5rem` / literal `padding` off the axis — each reads a
  `--control-*`/`--ui-scale`-derived token. **Born-RED at HEAD** (`.input-pill { height: 2.5rem }`,
  `.btn-pill { font-size: 1rem }`).
- **`--dock-scale` is RECONCILED onto the master (the retro-reconcile — the headline structural assert).**
  Assert `--dock-scale`'s definition (`tokens.css`) is `calc(var(--ui-scale) * …)` (NOT a bare `1`); assert
  the dock geometry cascade rows (`dock.css:245-400`) are UNCHANGED (they read the re-homed scalar — the
  reconcile is at the definition, not the consumers); assert the dock coarse block honors the global
  `--ui-scale` coarse default (NOT a parallel hardcoded `1.5`). **Born-RED at HEAD** (`--dock-scale: 1`,
  calc-free; `dock.css:1634` a parallel `1.5`).
- **The coarse-pointer amplification is GLOBAL.** Assert a `@media (pointer: coarse) { :root { --ui-scale:
  var(--ui-coarse-scale, 1.5) } }` block exists (the WHOLE library grows on touch from ONE place); assert
  the WCAG-2.5.5 44px floor survives as a `max(…, 44px)` clamp inside the scaled control-size under
  coarse-pointer. **Born-RED at HEAD** (no global coarse block; only the dock has one).
- **The φ-display ladder is UNTOUCHED (the scope-discipline regression-guard).** Assert
  `--type-display-*`/`--type-title`/`--type-heading`/`--type-subheading` carry NO `* var(--ui-scale)`
  factor (the comfort axis must NOT leak into the typographic identity — a regression-guard that the
  display ladder stays a pure φ-scale). **Born-GREEN at HEAD, locked through the wave.**

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson —
a green SOURCE gate over a still-compact live render is NOT done).** A fail-CLOSED live chrome-devtools-mcp
+ frontend-design pass the ORCHESTRATOR runs @ `localhost:5173` — `getComputedStyle` reads + screenshots
over `/primitives/buttons` + `/forms/*` (Input/Select/Combobox/Command) + `/primitives/badge` + a page
with a `<GlassDock>`, in light AND dark, at desktop AND emulated coarse-pointer:

- **The override is LIVE — ONE token grows the whole library.** In the console set
  `document.documentElement.style.setProperty('--ui-scale','1.3')`: ASSERT every control's
  `getComputedStyle().height` + `fontSize` + the glyph `width` grow ~1.3× IN LOCKSTEP (proportion
  preserved — height, font, AND glyph, not one without the others), with NO layout break (no text clip,
  no misaligned pill). Reset to `1` → byte-identical to HEAD (the identity preserves the desktop
  proportion).
- **The coarse-pointer scale is CONSISTENT across the library.** Emulate a coarse-pointer (DevTools
  device toolbar): ASSERT the buttons + inputs + badges + toggles + the dock ALL grow ~1.5× together (the
  witness-5 inconsistent-touch split RESOLVED — at HEAD the dock grew but the buttons did not; after, they
  grow in lockstep from the ONE global coarse default). ASSERT every interactive target clears the WCAG
  44px floor under coarse-pointer (the `max(…,44px)` clamp).
- **The dock is UNAFFECTED at desktop (the reconcile is transparent at scale 1).** Side-by-side a HEAD
  dock screenshot and the patched dock at `--ui-scale == 1`: ASSERT byte-identical geometry (the
  `--dock-scale` re-home does not move the dock at the identity — the retro-reconcile canary).
- **The comfort BUMP reads MODERN, not contrived.** Hand-audit a `--ui-scale: 1.125` (or the ratified
  desktop default if a bump ships): the controls read comfortably-larger + proportional, NOT a crude
  zoom (the glyph + font + padding all in step — the "idiomatic, modern, non-contrived" bar the user
  named). frontend-design judgment, captured.
- **No reflow / no regression.** ASSERT a page laid out at `--ui-scale == 1` is visually unchanged from
  HEAD (the no-desktop-reflow discipline — the default is the identity); ASSERT the φ-display heroes/
  titles do NOT grow on coarse-pointer (the display-ladder-excluded scope discipline — a hero is not a
  touch target).
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND
  dark.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the HEAD compact controls + the inconsistent coarse-pointer growth the
re-point must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the five RED witnesses against HEAD `6569b7a`
   on the live demo: `--ui-scale` absent (grep); the `--ui-scale: 1.3` console override DEAD (nothing
   grows); the coarse-pointer dock-grows-but-buttons-don't split. Capture the BEFORE π render as the
   born-RED baseline in `audit/W51-ui-scale.json`. Do NOT proceed on the audit's word — re-prove.
2. **Author the gate born-RED.** Author `proof-ui-scale.mjs` (the master-mint + no-buried-literal +
   dock-reconcile + coarse-block + 44px-floor + display-ladder-untouched assertions); register
   `proof:ui-scale` in `package.json` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **Mint the master scalar + the cohorts.** `tokens.css`: `--ui-scale` `@property` + `:root` default `1`;
   the `--control-h-*` / `--control-text` / `--ui-glyph` cohorts (`calc(<base> * var(--ui-scale))`);
   `--ui-coarse-scale`; the §sizing doctrine comment. Lint + typecheck.
4. **Re-point the control pills.** `glass.css`: `.btn-pill` `padding`/`font-size` + `.input-pill`
   `height`/`font-size`/`padding` onto the `--control-*` tokens (line-region-disjoint from W52's specular
   rows). Lint + typecheck.
5. **Re-point the CVA bases.** button/toggle/badge/alert glyph + font + size rungs; avatar/select/
   combobox/command/number-field/tabs/toast heights — onto the cohort (keep the host-sized-icon escape).
   Lint + typecheck.
6. **The retro-reconcile.** `tokens.css`: re-home `--dock-scale` as `calc(var(--ui-scale) *
   var(--dock-local-scale, 1))`. `dock.css`: re-express the coarse block to honor the global coarse
   default + the `--dock-mobile-scale` stack-extra. Confirm the dock geometry cascade is UNTOUCHED. Lint
   + typecheck; re-run W45's dock gate (confirm the reconcile did not red it).
7. **The global coarse-pointer block + the 44px floor.** `tokens.css`: the
   `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5) } }` block + the
   `max(…, 44px)` floor clamp inside the scaled control-size. Lint + typecheck.
8. **Docs.** `CLAUDE.md`: the `--ui-scale` comfort-axis doctrine (ONE master scalar, dock/dropdown
   specialize, display-ladder excluded, the coarse default, the `:root` seam).
9. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:ui-scale` passes; re-run W45's dock gate + W52's
   `proof:liquid-glass-material` (confirm the scalar re-home + the pill re-point did not red them); run
   the VISUAL-TRUTH live π audit (the `--ui-scale: 1.3` override grows the whole library in lockstep; the
   coarse-pointer scale is consistent; the dock is byte-identical at scale 1; the 44px floor holds) over
   light + dark, desktop + coarse; capture the paired-π BEFORE/AFTER + DELTA (`W51-DELTA.md`); write
   `audit/W51-ui-scale.json` to GREEN.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps
3–8) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W51-ui-scale.json` — the born-RED→GREEN ledger: the five RED witnesses (the
  no-token headline, the buried height/font/glyph literals, the three-scale split), the per-finding
  disposition, the W45-shipped-dock-scale reconcile confirmation, and the post-wave GREEN structure +
  π-readback size measurements (the lockstep growth at `--ui-scale: 1.3`).
- `docs/tranches/AX/audit/W51-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the compact HEAD controls →
  the comfortable scaled controls; the inconsistent coarse-pointer growth → the consistent library-wide
  1.5× on touch; the dock-byte-identical-at-scale-1 canary; the override-is-live proof; over light + dark,
  desktop + coarse-pointer.
- `scripts/proof-ui-scale.mjs` — the NEW gate (master-mint + no-buried-literal + dock-reconcile +
  coarse-block + 44px-floor + display-ladder-untouched).
- The diff localizing the `--ui-scale` mint + the cohort mints + the pill re-point + the CVA re-points +
  the `--dock-scale` retro-reconcile + the global coarse block + the doctrine docs.
- A coordination-NOTE annex (folded into the W50 coordination, NOT executed here): the `--control-text`
  register + the `* var(--ui-scale)` factor W50's `--dropdown-text` derives through, + the
  combobox/command shared input-HEIGHT register W51 unifies (W50 unifies the font).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(sizing): born-RED proof:ui-scale — master --ui-scale + no-buried-literal + dock-reconcile + coarse-block + 44px-floor (AX.W51 D18)`
2. `feat(tokens): mint --ui-scale @property + the --control-h/--control-text/--ui-glyph cohorts — ONE comfortable-sizing master scalar (AX.W51 D18)`
3. `refactor(glass): re-point .btn-pill/.input-pill geometry onto the --ui-scale-derived control tokens (AX.W51 D18)`
4. `refactor(ui): re-point the CVA base height/font/glyph off the raw shadcn literals onto the comfort cohort (AX.W51 D18)`
5. `refactor(tokens): retro-reconcile --dock-scale onto calc(var(--ui-scale) * <local>) — ONE scale system, not three (AX.W51 D18 / W45)`
6. `feat(tokens): global @media(pointer:coarse) --ui-scale amplification + the WCAG-2.5.5 44px floor clamp (AX.W51 D18)`
7. `docs(claude): record the --ui-scale comfort-sizing axis — dock/dropdown specialize, display-ladder excluded (AX.W51 D18)`
8. `chore(AX.W51): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + W50 control-font/height coordination note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of
  the binding live-audit close criterion + the `getComputedStyle` size readback. W51 cannot close on the
  SOURCE gate alone (the cardinal AX lesson — a green CPU gate over a still-compact live render); W00
  stands up the lane it closes on + the paired-π BEFORE/AFTER + DELTA protocol it captures.
- **Sequences BEFORE AX.W50 (dropdown type-scale).** W50 SPECIALIZES the `--control-text` comfort axis
  W51 mints (the picker family reads the same scale). W50 is authored-not-landed, so the charter order
  (W51 before W50) is honored — W51 mints the register, W50 lands the family re-point. (If the
  orchestrator lands W50 first, W50 must mint a placeholder `--control-text` W51 then folds — the cleaner
  order is W51 first.)
- **RETRO-RECONCILES AX.W45 (`--dock-scale`, already SHIPPED).** The charter sequence ("W45 specializes
  W51") is INVERTED at HEAD — W45 shipped its `--dock-scale` before W51 exists. So W51 is a retro-reconcile:
  it re-homes the shipped `--dock-scale` definition onto the global axis (a one-line scalar edit that
  cascades through W45's existing `calc` chain). Not a hard dependsOn (W45 is landed) — a hard RECONCILE
  obligation: skipping it leaves two parallel scale systems (the exact failure the umbrella kills).
- **Coordinates with AX.W52 (liquid-glass — shared glass.css, line-region-disjoint), AX.W54/W55/W60
  (glass/legibility/layout — orthogonal axes), AX.W36 (forced-colors — disjoint mode).** None is a hard
  dependsOn (W51 consumes each settled surface if it lands first, else the published baseline) — declared
  so the orchestrator sequences the size axis disjointly from the material/glass axes.

---

## Archaeology (the git / prior-tranche lineage + the research mandate)

- **D18 (the user defect — `docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md:31`).** "ALL components
  (mobile + desktop): touch targets + font-size are generally too small (the shadcn-vue compact defaults:
  h-9/text-sm). Increase BOTH — touch-target size AND font-size — library-wide on BOTH axes, in an
  idiomatic, non-contrived, MODERN way (one coordinated size/density scale, not per-component hacks)."
  Flagged the NET-NEW umbrella — the library-wide `--ui-scale` comfortable-sizing system, with D15 (dock)
  + D17 (dropdown) becoming specializations that read it.
- **The shadcn-vue compact-default inheritance — the ORIGIN.** glass-ui's CVA bases were lifted from
  shadcn-vue, which ships the compact desktop register (`h-9`/`text-sm`/`size-4`) verbatim. The library
  never re-expressed those literals onto a comfort axis — the exact "inherited the compact default" class
  the user hit on both desktop + mobile.
- **AX.W45 (`--dock-scale`) — the SHIPPED specialization with no master.** W45 minted `--dock-scale`
  (`tokens.css:1111`, default `1` / coarse `1.5`) + threaded it through the whole dock geometry cascade
  (`dock.css:245-400`) — the WORKING proof that "ONE scalar grows every axis in lockstep." But it shipped
  BEFORE W51, so it is a parallel local axis with no global master — the retro-reconcile W51 owns. W45 is
  the in-repo PROOF the global pattern works (the dock already does exactly what `--ui-scale` does
  library-wide).
- **AX.W50 (dropdown type-scale) — the authored-not-landed specialization.** W50 mints the picker-family
  `--dropdown-text` — the dropdown control-font specialization. W51 mints the `--control-text` master
  register + the comfort factor W50 reads. W50 sequences AFTER W51 (specializes the axis).
- **HEAD `6569b7a` (the AX integrated band, UNPUBLISHED) — the audit baseline.** No `--ui-scale` token
  (`grep` = 0); the buried height literals (`button/index.ts:72-77`, `toggle/index.ts:41-43`, …); the
  buried font literals (`:22`, `:30`, `badge:32-34`); the buried glyph literals (`:22`, `:9`); the
  parallel `--dock-scale` (`tokens.css:1111`) — all live-proven here.
- **The S-conv1 inventory (`docs/tranches/AX/audit/inventory/S-conv1.md:143-228`) — the gap diagnosis.**
  Names W51 "the biggest structural gap in the lane" + mandates the retro-reconcile as a first-class
  clause + the gestalt-path-forward §1 (the `@property` mint, the `--dock-scale` re-home, the
  `proof:ui-scale` device-free + π arm). Read in full before this spec — the witnesses + the FileBounds +
  the reconcile are inventory-grounded, not speculative.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/`; the binding precepts this wave pursues + must not violate:

- **token-first / no magic numbers (J invariant 1 — "every visual behaviour is a CSS custom property; no
  consumer edits library source for styling").** Every comfort magnitude is a token routed through ONE
  scalar: the `--ui-scale` master, the `--control-h-*`/`--control-text`/`--ui-glyph` cohorts, the
  re-homed `--dock-scale`, the `--ui-coarse-scale` default — all overridable on `:root` (or any scope).
  MUST NOT re-bury a comfort literal (no `h-9`/`text-sm`/`size-4` off the axis; the control size is the
  token, never an inline class).
- **ONE coordinated scale, not per-component hacks (the D18 ask verbatim + the no-three-scales mandate).**
  ONE `--ui-scale` master; `--dock-scale` + the W50 dropdown scale RE-HOMED as specializations
  (`calc(var(--ui-scale) * <local>)`), not parallel systems. MUST NOT ship a per-component `density`/`size`
  prop as the comfort mechanism (the ONE-scalar mandate) or a third parallel scale.
- **architectural transposition for elegance/simplicity/PERFORMANCE.** The fix is a TRANSPOSITION (one
  scalar the existing `calc` cascade reads) over a patch (N per-component density props). It is a PERF win
  by construction — pure CSS `calc` resolution, zero JS, zero runtime cost; a consumer's comfort override
  is one CSS token, no re-render. The dock reconcile is a ONE-LINE scalar-definition edit that cascades
  through 150 lines of existing dock `calc` for free — the elegance the token-first axis buys.
- **abrogate-before-patch.** The fix DELETES the buried shadcn literals (the abrogation) and re-derives
  through the scalar, rather than patching each component's size independently (the per-component-hack the
  user explicitly rejected). The parallel `--dock-scale` is RE-HOMED (folded onto the master), not
  duplicated.
- **no-backwards-compat / no-redundant-alias (MEMORY no-backwards-compat).** Clean break — the buried
  literals are REPLACED by the cohort tokens, no `--legacy-control-h` alias, no dual-path. `--dock-scale`
  is re-homed in place (its consumers read the same name; only the definition changes — no alias). The
  desktop default stays `1` (byte-exact preservation) NOT for backwards-compat-aliasing but because the
  identity IS the correct desktop default (the comfort growth is the coarse default + the override).
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** `--ui-scale` ships with
  its consumers (every CVA base + the pills read it); the `--control-h-*`/`--control-text`/`--ui-glyph`
  cohorts each ship with ≥ 2 reading sites by construction; `--ui-coarse-scale` ships with the global
  coarse block. No speculative token (the φ-display ladder is EXCLUDED precisely because no comfort
  consumer needs it scaled — the no-overfit scope discipline).
- **Safari-safe / cross-engine.** `calc(<base> * var(--ui-scale))` + `@property <number>` + `@media
  (pointer: coarse)` are all cross-engine-safe (Safari 16.4+ for `@property`; the `calc` + media query are
  universal). The `@property` typed-clamp-on-bad-set is the fail-safe (a malformed override clamps to the
  initial value, not an invalidated `calc`). No engine-specific path.
- **WCAG 2.5.5 touch-target floor (the a11y constraint).** The 44px floor survives as a `max(…, 44px)`
  clamp INSIDE the scaled control-size under coarse-pointer (the W45 precedent) — a consumer dialing
  `--ui-scale` below 1 cannot drop a control under the target. The floor is part of the binding close.
- **π visual-runtime lane (SPEC.md §π; AX.W00).** The wave closes on an EXECUTED live chrome-devtools-mcp
  + frontend-design audit (the `--ui-scale` override grows the whole library in lockstep; the
  coarse-pointer scale is consistent; the dock is byte-identical at scale 1; the 44px floor holds) over
  light + dark, desktop + coarse-pointer — NOT the SOURCE gate alone (the cardinal AW failure this tranche
  corrects).
- **Goal + completion criterion paired (README §Edicts; WAVE_SPEC §2a/§6).** The §Goal (ONE comfort
  scalar, controls grow in lockstep, dock/dropdown specialize, the override is live, the φ-ladder excluded)
  and the §HardGate (born-RED→GREEN `proof:ui-scale` + the visual-truth audit) are paired; a gate-pass
  with a goal-miss (the heights scale but the glyphs lag, or the dock double-scales) closes
  `complete_with_misses`, not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **Desktop default — `1` (identity, no reflow) vs a shipped comfort bump — RATIFY.** The user says
   "too small on desktop TOO." The no-reflow discipline + the W45 precedent recommend desktop default `1`
   (byte-exact preservation) + the comfort growth at the coarse default + the trivial-override seam. The
   counter: ship a modest desktop bump (`1.0625`/`1.125`) so the comfort lands without a consumer
   override. **Recommendation: desktop `1`** (no surprise reflow; the override is one token), with the
   live audit hand-checking a `1.125` render so the user can ratify a shipped bump if wanted (a one-token
   change). RATIFY at the live audit.
2. **The control-FONT attachment point — a ladder-multiplier vs a separate control-register — RATIFY.**
   Option A: add `* var(--ui-scale)` directly onto the `--type-small`/`--type-body` ladder rungs the
   controls read (couples the ladder to comfort). Option B (recommended): mint a SEPARATE `--control-text`
   register (`calc(var(--type-small) * var(--ui-scale))`) the controls read, leaving the φ-ladder a pure
   typographic scale. **Recommendation: Option B** — keeps the φ-ladder identity intact (prose/display do
   NOT grow on touch) and the comfort axis precise to interactive-control text. RATIFY.
3. **The dock coarse-block disposition — inherit-global vs stack-extra — RATIFY.** After the reconcile,
   the dock's coarse block either (A) drops entirely (inherits the global 1.5× via the reconciled
   `--dock-scale`) or (B) keeps a dock-local `--dock-mobile-scale` EXTRA that stacks ON the global coarse
   default. **Recommendation: the dock inherits the global coarse default; `--dock-mobile-scale` survives
   as the optional stack-extra, default `1`** (so the dock grows WITH the library by default, but a
   consumer who wants the dock EXTRA-large on touch still can). RATIFY against the live coarse-pointer
   audit (the dock must not double-scale).
4. **The W50 sequencing — W51-first (recommended) vs land-together — RATIFY.** W50 specializes the
   `--control-text` axis W51 mints. **Recommendation: W51 first** (mints the register + the factor; W50
   lands the picker-family re-point reading it) — the charter order, clean since W50 is not yet landed.
   The counter (land together as one sizing+dropdown wave) is viable if the orchestrator wants one close;
   RATIFY. The combobox/command shared input-HEIGHT register is W51's regardless (W50 owns the FONT).
5. **`--ui-scale` `@property` `inherits` — true (recommended) vs false — RATIFY.** `inherits:true` lets a
   SCOPED override (a dense data-table region) cascade to descendants; `inherits:false` would force a
   per-element set. **Recommendation: `inherits:true`** (the comfort axis is a cascading scope concept,
   unlike the per-element specular `@property`s which are `inherits:false`). RATIFY — the scoped-region
   override is a real use the inherit buys; no consumer needs it `false`.

---

## DEDUP (how this folds without duplicating an existing wave)

W51 is the **size/comfort axis** — distinct from every sibling: W45 (`--dock-scale`) is its DOCK
SPECIALIZATION (W51 re-homes it as `calc(var(--ui-scale) * <local>)` — ONE scale system, the explicit
anti-duplication boundary); W50 (`--dropdown-text`) is its DROPDOWN-FONT SPECIALIZATION (W51 mints the
`--control-text` register + the comfort factor W50 reads); W52 (`--scale-hover-btn`/`--scale-press-btn`)
is a DIFFERENT axis (the INTERACTION transform scale, not the COMFORT size — a control has a comfort SIZE
and an interaction SCALE, independent); W54/W55/W60 are the GLASS/LEGIBILITY/LAYOUT axes (orthogonal — a
control is glass AND comfortably-sized AND legible, three independent axes); the φ-DISPLAY ladder is
EXCLUDED (the typographic identity, not a comfort axis — a hero is not a touch target). W51 mints exactly
ONE master scalar + its cohorts; it duplicates no existing scale (it re-homes the one that exists,
`--dock-scale`, onto itself). No new wave is needed for the dropdown or dock scales — they are
specializations OF this axis, by construction.
