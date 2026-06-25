# OVERLAYS — DELTA-ASSAY: golden-vs-current + the UNION path

> The survival-of-the-fittest delta for the OVERLAY family — **Sheet · Drawer(+detent) ·
> Dialog · Popover · DropdownMenu · Tooltip · HoverCard · ContextMenu · Command**. Assayed
> against `GOLDEN.md` + the three hardening challenges (`challenge/1.md`, `2.md`, `3.md`),
> with every claim re-verified LIVE on `localhost:5173/containers/{dialog,drawer,dropdown-menu,
> popover}` (Chrome, light mode) + on-disk grep. The challenges' hardenings are FOLDED into the
> golden as the assay proceeds — the GOLDEN is the reference *as corrected by R1–R7 below*.
> **Verdict: REFINE-dominant — the family is panel-CONVERGED but COUPLING-BOUND.** Not a
> rebuild; a COUPLE + UNIFY + DEPEND. Convergence **~72%**.

---

## 0. LIVE-VERIFIED truth (this pass — both the KEEP and the RED, honestly measured)

| probe | live read (Chrome, /containers) | verdict |
|---|---|---|
| Dialog panel fill | `oklab(0.930 .0056 .013/.693)`, `backdrop blur(13px) saturate(1.6)`, origin `256px 132.9px` (= trigger rect) | **WARM-hue, blooms FROM anchor — KEEP** |
| Dialog scrim | `srgb 0.11 0.098 0.09 / 0.5` + `blur(1px) saturate(1.4)` | **warm-ink (R>G>B), not flat black — KEEP** |
| Dialog content pad | inline `[--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(…×1.272)]` ALREADY present | **the φ pad ladder is ALREADY live inline — formalize, don't invent** |
| Drawer sheet @ t={0.12,0.4,0.7,1.0} | α **0.95 FIXED** + `blur(20px) saturate(1.6)` FIXED at EVERY detent; `data-surface=glass` never flips | **DEAD freeze coupling — the RED headline (G3)** |
| Drawer scrim | `srgb 0.11 0.098 0.09 / 0.8` FIXED | warm ✅ but **α does NOT track detent (G5 RED)** |
| `#app` while drawer/dialog open | `transform: none`, `scale: none` | **page NEVER recedes (G4 dead-knob RED)** |
| Dropdown trigger (in-demo) | `btn-pill` warm `oklab(0.881 …/.33)` pill | already `btn-pill` |
| Popover trigger (in-demo) | `btn-pill` warm `oklab(0.881 …/.33)` pill — **byte-identical to dropdown** | **already congruent IN-DEMO** (see §3 nuance) |
| `:root` tokens | `--stage-t` · `--ease-cartoon-punch` · `--motion-weight` · `--field-h` · `--overlay-tint-floor` · `--glass-bg-floating-tinted` · `--glass-edge-floor` **ALL UNSET** | phantoms confirmed (G1/G6) |
| `--glass-bg-overlay` | `color-mix(… light-dark(hsl(30 85% 96%),hsl(26 22% 17%)) … 0.95 …)` | the SHIPPED warm ladder (the panel's real fallback) |
| `shouldScaleBackground` | `Drawer.vue:45,55` declared; grep 0 `scale(` in `src/components/ui/drawer/` | **dead-knob LIE confirmed** |

The GOLDEN's born-RED is GENUINE and live-reproduced end to end. The family is **NOT broken** —
the panel + reveal + scrim are already one warm register (BC.W-OVERLAY-UNIFORM + BA.W-NO-GRAY
shipped). The real RED is the **drawer's three dead couplings** (freeze / scrim-deepen /
page-recede) + the **un-FORMALIZED** (not un-built) trigger register.

---

## 1. SURVIVAL TRIAGE — KEEP / REFINE / RE-INVENT

### KEEP (fit — byte-untouched or compose-on-top)
- **The warm panel fill** (BC.W-OVERLAY-UNIFORM + BA.W-NO-GRAY): dialog/popover/dropdown/drawer
  all read warm-hue `oklab`, both modes. Live-proven. The six-layer composite is fit.
- **The reveal calm floor** (`glass/reveal.css`, BB.W-LIQUID-REVEAL): scale `0.88→1` on
  `--spring-snappy`, blur `4→0` on `filter` (Safari-honest, never `backdrop-filter:url`),
  popper-origin, the SPATIAL/EFFECTS transition split. The frequent band keeps this AS IS.
- **The warm scrim-ink** (`--overlay-scrim-ink: hsl(24 10% 10%)`, F7): warm near-black, never
  flat. The α is what's wrong, not the hue.
- **The reka a11y substrate** (trap / escape / roving / `aria-*`): FROZEN, byte-untouched. The
  GOLDEN adds ZERO a11y surface.
- **The φ pad ladder**: ALREADY live inline on dialog-content (`×1.272`). Formalized into the
  `@utility`, NOT minted from nothing.
- **The element-level surface escape** (`drawer.css:101` `[data-surface=opaque]`): the
  substitution-vs-inheritance-safe solid-plate path. The freeze build RE-POINTS this exact
  mechanism (element-level `color-mix`, NEVER an ancestor `filter`).

### REFINE (weak — evolve in place)
- **The trigger register**: in-demo popover & dropdown are ALREADY `btn-pill`-congruent, but the
  congruence is **consumer-discretionary** — there is no enforced shared register, so a consumer
  CAN diverge them (the user's flag #2 is a "can-drift" risk, not a live divergence). Formalize a
  shared register so congruence is STRUCTURAL. **REFINE, not RE-INVENT.**
- **The panel recipe**: three SFCs hand-roll the class-soup; DRY into ONE `@utility overlay-panel`
  so popover↔dropdown can never drift. Byte-stable behavior.

### RE-INVENT (broken — the drawer's three dead couplings)
- **Drawer surface freeze** (G3): α 0.95 fixed at every detent → peek looks as solid as full;
  the iOS-27 see-through bottom-sheet (the guiding light) does not happen.
- **Page recede** (G4): `shouldScaleBackground` is a dead boolean; `#app` never moves.
- **Scrim deepen** (G5): α fixed; a peek drawer commits as hard as a full one.

These three are the ONLY RE-INVENT, and they are RE-INVENT-AS-COUPLE: the `--stage-t` spine
makes them three `calc()` reads of ONE scalar the snap-spring already writes. No new engine.

---

## 2. THE GOLDEN, AS CORRECTED BY THE CHALLENGES (the folds — binding)

The challenges UNANIMOUSLY rule the golden SURVIVES; all three independently re-verified the
born-RED is honest. Seven hardenings LAND and are FOLDED into the union path (cite by challenge):

- **[C1·R1 — the trigger fork] FOLD.** §5's `.overlay-trigger` as a NEW parallel recipe
  duplicates the shipped `.dock-trigger` contract (no-hover-scale + `[data-state=open]` plate +
  edge floor + bloom-from-anchor) — a fork the union law forbids. **UNION FIX:** do NOT mint a
  parallel class. The dock-trigger only diverges by `--dock-*` token *namespace*, not behavior.
  Extract the shared behavior into ONE base (`@utility trigger-anchor`, knob-parameterized:
  `--trigger-gap`/`--trigger-radius`/`--trigger-fg`/`--trigger-press-spring`); `.dock-trigger`
  composes it with `--dock-*`, the overlay triggers compose it with overlay defaults. ONE source,
  two configs. (Live nuance: in-demo the triggers are ALREADY `btn-pill`-congruent, so this is
  primarily a *can't-drift* guarantee — the base may compose `btn-pill`'s register rather than
  re-spec geometry.)

- **[C1·R2 — dual scalar] FOLD.** `--stage-t: var(--glass-drawer-t)` carries TWO registered
  scalars for ONE quantity, hand-mirrored every frame — desync on any un-mirrored write
  (drag-cancel, fling overshoot, interrupted snap). **UNION FIX:** ONE writer, ONE source. The
  snap engine writes `--stage-t` directly (or `--glass-drawer-t` becomes a `calc()` read OF
  `--stage-t`); no second scalar. AND `clamp(0, …, 1)` EVERY `--stage-t` consumer (page-scale,
  radius, scrim) — a `--ease-cartoon-punch` fling overshoots >1 and would drive page-scale past
  0.95 / radius past `--radius-panel`. The freeze already clamps; the others must too.

- **[C2·R1 / C1·R3 / C3·R6 — the ancestor `filter`] FOLD (the unanimous landing refutation).**
  §2c puts `filter: saturate()` on `[data-stage-wrapper]` — the app root. This SELF-CONTRADICTS
  §7 ("NO filter on an ancestor of the glass panel") and is a real cross-engine trap: `filter`
  on the wrapper (a) establishes a containing block for `position:fixed`, re-parenting/clipping
  any in-shell (non-body-portaled) Tooltip/HoverCard/inline-Popover/dock under `overflow:clip`;
  (b) force-rasterizes the whole page subtree every spring frame (Safari rasterizes at the
  receding scale → softened text). **UNION FIX:** coupling (C) carries `scale` + `border-radius`
  ONLY on the wrapper. DROP the `saturate()` desaturation entirely (it is a flourish, not
  load-bearing — scale + radius + scrim already sell the depth). Reconcile §7. Add a gate bite:
  FAIL if any `position:fixed` overlay is a DESCENDANT of `[data-stage-wrapper]` (require
  body-portal); assert `!wrapper.contains(portalRoot)`.

- **[C2·R2 / C3·R4 — transparent-panel ordering trap] FOLD.** §3's `overlay-panel` sets
  `background: var(--glass-bg-floating-tinted)` — UNSET at `:root` (live-confirmed), scoped only
  to `:where(.btn-glass,.segmented-indicator)`. If `BD.W-OVERLAY-PANEL` lands before the
  select-forms `:where()` widen, every panel composes `transparent` — a WORSE regression than
  HEAD. **UNION FIX:** `background: var(--glass-bg-floating-tinted, var(--glass-bg-overlay))` — a
  fallback to the SHIPPED warm ladder (the same graceful-degrade discipline §7 applies to
  `@property`). The panel is NEVER transparent. Gate asserts the fallback renders a
  non-transparent warm panel when the DEPEND is absent.

- **[C2·R2 / C3·R1/R3/R4 — "stands alone" overclaim] FOLD.** Only the STAGE COUPLE stands alone
  (it rides the shipped `--glass-drawer-t`/`--glass-level`/`--spring-snappy`). PANEL-fill,
  TRIGGER, PUNCH, and the see-through peek/half FLOOR all ride un-landed siblings. **UNION FIX:**
  correct §6/§10 to "the STAGE COUPLE stands alone; PANEL/TRIGGER/PUNCH/CROWN ride siblings",
  and reclassify `BE.W-SHEET-TRANSLUCENT` from "DEPEND (shipped)" to a **hard inbound
  PREREQUISITE** (it is `Status: SPEC` on disk — `--glass-bg-sheet`/`--glass-opacity-sheet`
  ABSENT). The overlay freeze is `clamp(0,(t-0.85)/0.15,1)` → exactly 0 below t=0.85, so it
  supplies NO transmissivity at peek/half; the see-through crown is wholly the BE wave's job.
  **OR** (the self-standing alternative, adopted in the amendment) extend the freeze to a
  TWO-SEGMENT lerp: a transmissive descent (`--glass-bg-overlay` α 0.95 → ~0.74) over t∈[0,0.85]
  AND the solidify (0.74→1 + `--card`) over [0.85,1], so the GOLDEN owns its own crown.

- **[C2·R / C3·R7 — `immersive` per-frame re-blur + stale-latch] FOLD.** Coupling (D)
  `backdrop-filter` radius off `--stage-t` is a per-frame full-viewport re-blur IF driven by the
  drawer's per-frame scalar — the §L7 cardinal Safari sin. **UNION FIX:** gate `immersive` to the
  MODAL-FLIP path ONLY (0→1 one-shot), NEVER the drawer's per-frame `--stage-t`. AND specify the
  close-write: `--stage-t: 0` on the wrapper at close (a `:not([data-state=open])` reset selector)
  so the inherited-registered-property stale-latch (G12) has a real fix, not just a test.

- **[C1·R4 — gray-at-full carve hole] FOLD.** The freeze lerps toward dark `--card`
  (`hsl(26 22% 17%)`, low-chroma brown). At full opacity a dark drawer could read charcoal and
  PASS (G1/G7 carve out the opaque path). **UNION FIX:** the freeze lerps toward a warm-tinted
  card-mix (`color-mix(--card, --glass-tint-source X%)`), NOT bare `--card`; G3 asserts the
  FROZEN full sheet is still C ≥ 0.02 warm (H∈[16,110]), dark mode required. No gray holiday at
  full.

- **[C1·R6 / C2·R5 — PRM page-jolt] FOLD.** A sudden full-page snap-scale to 0.95 IS perceived
  motion even at one frame, and the static `scale<1` keeps the Safari rasterization text-soften.
  **UNION FIX:** under PRM, `stage="scale"` degrades to `stage="dim"` (scrim only, no page
  transform) — the depth cue downgrades to a luminance cue. Gate G10 asserts PRM + `stage="scale"`
  → wrapper `transform: none`, scrim present.

- **[C3·R3 — punch is calm/punch binary] FOLD (liquid-weight-universal).** Confining cartoon
  weight to 2 of 9 members under-delivers the universal-weight edict. **UNION FIX:** the FREQUENT
  band carries a *scaled-down* `--motion-weight` (near `1/φ≈0.618`, NOT 0) so even a dropdown has
  a hair of overshoot/settle — a continuum, not a binary; only the LOUD squish is reserved for the
  takeover band.

- **[C1·R5, R7 / C3·R2/R5 — KISS/spike nits] FOLD.** Delete the no-op `color-mix(…0%)` outer wrap
  (or name it a `--sheet-freeze-tint` knob). Fix the φ comment: `×1.272` is **√φ**, not φ — keep
  1.272 and label it "the gentler √φ rung" (the live dialog ALREADY uses ×1.272, so KEEP the value,
  fix the prose). Re-seed the spike's `--glass-bg-overlay` to the SHIPPED 0.95 (not a fabricated
  0.70) and re-capture peek; name `demo/App.vue` (the chassis root) as the explicit
  `[data-stage-wrapper]` artefact (G4 is untestable without it).

---

## 3. THE UNION PATH (deft integration — KISS, DRY, reuse extant, no dual-path)

The family is a **COUPLE + UNIFY + DEPEND**. Five concrete moves, all RE-POINT/COMPOSE on shipped
or sibling-GOLDEN seams — ZERO new component, ZERO new composable, ZERO fork:

1. **THE SPINE — `@property --stage-t`** (number, `inherits:true`, the ONE staging scalar). The
   snap engine writes it DIRECTLY (§2·R2 fold — no dual scalar; `--glass-drawer-t` becomes a read
   OF it or is retired into it). FOUR `calc()`-only couplings, each `clamp(0,…,1)`-bounded:
   - **(A) surface FREEZE** — RE-POINT `drawer.css`. A TWO-SEGMENT lerp (transmissive descent
     0.95→~0.74 over [0,0.85] + solidify toward warm-tinted-`--card` over [0.85,1]), composed AT
     THE ELEMENT (the `[data-surface=opaque]` substitution-safe path), `backdrop-filter` decays to
     0 as it solidifies (a Safari win). NEVER an ancestor filter.
   - **(B) scrim DEEPEN** — RE-POINT the scrim element to `α = 28% + t×44%` on the shipped warm
     `--overlay-scrim-ink`.
   - **(C) page RECEDE** — NEW `[data-stage-wrapper]` recipe: `scale` + `border-radius` ONLY
     (NO `filter` — §C2·R1 fold). `shouldScaleBackground` DELETED, replaced by an honest
     `stage="none|dim|scale|immersive"` enum. PRM → degrades to `dim`.
   - **(D) blur ENGAGE** — opt-in `immersive`, gated to the modal-flip one-shot ONLY (never the
     drawer's per-frame scalar — §C2·R fold).
   The drive: the snap-spring writes `--stage-t` (drawer); a modal flips it 0→1 on
   `--spring-snappy`; close-write resets to 0. No new JS.

2. **THE PANEL — `@utility overlay-panel`** (DRY the three SFCs' class-soup). Bakes the shared
   geometry + the √φ pad ladder (`×1.272`, the value ALREADY live inline). Fill =
   `var(--glass-bg-floating-tinted, var(--glass-bg-overlay))` — the SHIPPED-ladder fallback
   (§C2·R2 fold) so it is never transparent. The ONLY sanctioned knob is `--overlay-pad-inline`.

3. **THE WARM ADMIT-FLOOR — DEPEND, widen the selector.** The select-forms WAVE-AMENDMENT C1
   already AUGMENTs `BD.W-GLASS-ABROGATE-GRAY` to widen `--glass-bg-floating-tinted`'s `:where()`
   to the overlay family (select-content). The overlay band ONLY extends that selector list to
   `[data-slot=dialog-content]` + the command roots — it does NOT re-mint a floor. ONE shared
   warm source.

4. **THE PORTAL FIELD — DEPEND.** `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT` (`.paper-field`/
   `--field-h`) + the select-forms portal-field re-emit (`menu.css` `.glass-field-portal::before`,
   z −1, NO backdrop-filter); widen the portal-root selector to the dialog/command roots. The
   "glass cannot sample glass" trap is avoided by construction.

5. **THE TRIGGER — extract ONE base, no fork (§C1·R1 fold).** A knob-parameterized
   `@utility trigger-anchor` (the shared no-hover-scale + `[data-state=open]` plate + edge-floor +
   bloom-from-anchor contract); `.dock-trigger` composes it with `--dock-*`, the overlay triggers
   compose it with overlay defaults (likely over `btn-pill`'s already-congruent register). ONE
   source of truth, two configurations — the dock and overlay triggers can never drift.

**THE REVEAL — pure DEPEND.** `.glass-reveal` is fit and KEPT. The select-forms C2 augment
re-clocks its SPATIAL legs to `--ease-cartoon-punch × --motion-weight` (a FAMILY upgrade, ONE
recipe edit). The overlay band is the CONSUMER: the takeover band (Dialog/Sheet) opts into a
`.glass-reveal--punch` deepened-squish tier + the `--shadow-cartoon` cel cast; the frequent band
rides the calm floor at a *scaled-down* weight (§C3·R3 fold — a continuum, never calm/punch
binary). The overlay band does NOT re-author the reveal.

---

## 4. RECONCILE vs the extant wave set (NO dup — the critical de-dup)

- **NO `W-DRAWER-DETENT-GLASS` exists** in `docs/tranches/BD/union/waves/` (the prompt's named
  stub is ABSENT — the closest are `BD.W-SHEET-TRANSLUCENT` + `BD.W-CARD-SHEET-EXPAND`). The
  drawer detent→opacity work is therefore NET-NEW, owned by the headline COUPLE wave (no stub to
  fold).
- **`BD.W-SHEET-TRANSLUCENT`** (`Status: SPEC`, NOT shipped) → **hard PREREQUISITE for the
  see-through CROWN** (owns the `--glass-bg-sheet` ~0.74 floor), OR the COUPLE wave's two-segment
  freeze owns its own crown (the self-standing path). NOT mislabeled "shipped".
- **`BC.W-OVERLAY-UNIFORM`** (shipped) → **DEPEND/SUPERSEDED-BY** the panel `@utility` (formalizes
  the proven uniformity; no behavior regression).
- **select-forms `WAVE-AMENDMENT` C1/C2/D1** → **DEPEND, widen selectors.** The warm-floor
  (`BD.W-GLASS-ABROGATE-GRAY` C1 augment), the portal-field (`BD.W-PAGE-FIELD` + D1.1 re-emit),
  the reveal re-clock (`BB.W-LIQUID-REVEAL` C2 augment) are the SHARED register the Select already
  mints. The overlay band CONSUMES + widens the selector list — it does NOT re-mint a menu-only or
  overlay-only tint/reveal/field.
- **`BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT`** (motion-spring-register amendment) → **DEPEND**
  (the punch `linear()` + the weight scalar). No re-mint.
- **`W-LIQUID-ENTRANCE-GENERAL`** (T5, the universal liquid-weight LAW) → **DEPEND/CITE** (the
  overlay reveal + the stage settle are instances of the law).
- **`W-DOCK-CORE`** (owns `.dock-trigger`) → the trigger base extraction is a **DOCK-CORE-adjacent
  refactor** (extract `trigger-anchor`, re-point `.dock-trigger` to compose it) — coordinate so
  the extraction lands in ONE place, not two.
- **glass-material GOLDEN `--glass-edge-floor`** → **DEPEND** (the trigger edge + panel rim).

**FROZEN:** reka a11y (trap/escape/roving/aria); the six-layer composite (only the FILL admit +
the freeze lerp change); BC.W-OVERLAY-UNIFORM's surface axis; the reveal EFFECTS legs on
`--ease-out`. **No legacy, no alias, no dual path** — `shouldScaleBackground` DELETED.

---

## 5. CONVERGENCE — ~72%

The spine idea is sound and live-honest; the family is panel-converged. The remaining 28%:
- the three dead drawer couplings are the headline RE-INVENT-AS-COUPLE (the build) — ~12%;
- the four challenge-landing folds (trigger de-fork, dual-scalar collapse, ancestor-filter kill,
  transparent-panel fallback) must land before build or the GOLDEN ships the fork/transparent/
  Safari-tear it forbids — ~10%;
- the hard-prereq honesty (the crown, the field, the floor, the punch ride un-landed siblings;
  the demo-shell `[data-stage-wrapper]` marker) — ~6%.

REFINE-dominant: KEEP the warm panel + reveal floor + scrim hue + a11y + φ pad; REFINE the panel
DRY + the trigger formalization; RE-INVENT only the drawer's three dead couplings, as ONE coupled
`--stage-t` scalar.
