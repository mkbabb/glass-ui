# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass2-CONVERGED

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep. reka = BEHAVIOUR /
> glass-ui = 100% of MATERIAL.

**Base: `SPEC-pass1-converged.md` (adopted whole) + `SPEC-pass2.md` (the four frontier rulings + the
two collision rulings).** This CONVERGED revision folds every pass-2 critique mustFix, adopts each
validated prototype mechanism, resolves the two contradictions the prototypes overturned (the KISS
native-accent path FALSIFIED → deep-violet floor; the focus-ring fold RE-FRAMED as a library-wide FIX),
and hardens each frontier ruling with its real-paint-π acceptance bar. Re-verified on `tranche/BG`
HEAD `069db6c4` this session — every file:line below re-read on disk.

**The honest convergence state:** the five frontier MECHANISMS are now de-risked + concrete (three are
colorimetrically exact AND real-paint-confirmed in both engines; one is runtime-confirmed; the Select
separation is analytically confirmed with its binding WebKit-dark capture OWED at development). The pass-2
deliverable — the binding NON-AUTHORING real-paint captures over a LIVE dev server in Chrome AND Safari,
both modes — is the unconverged frontier that closes ONLY when the waves run with a server up. This spec
locks the mechanism + the exact born-RED π for each; development executes them.

---

## 0. WHAT THIS PASS RESOLVES (the prototype/critique delta, read first)

| # | pass-2 said | CONVERGED ruling (prototype-validated + critique-folded) |
|---|---|---|
| R1 | ADD the toggle's selected selector to the `surfaces.css:282` `:where()` mint list | **VALIDATED (78% refine) + the marker correction.** Mint via a `.glass-toggle` MARKER CLASS added to the shared `toggleVariants` CVA base, and widen the `:where(.btn-glass,.segmented-indicator,.glass-capsule)` list to include `.glass-toggle` — NOT a literal `[data-slot="toggle"]` (the marker is cascade-robust, element-co-located, and reads on the same node as the `data-[state=on]:bg-(--token)`). Runtime-confirmed the fill resolves. Couple the glyph re-point + hover-well in the SAME edit. Do NOT compose `.glass-capsule` (drags rest-state Safari blur onto every toggle). |
| R2 | grouped-inset Select → recess panel / float groups / per-mode lift | **VALIDATED-direction (55% refine) + four hard folds.** Elevation-inversion is correct, dark-LIFTS is correct. (a) SCOPE the panel recede to `[data-slot=select-content]:has(.glass-menu-group)` — the unconditional recede degrades UNGROUPED Selects (don't undo BD.W-SELECT-WELL). (b) Compose rim/shadow from EXISTING tokens (`--glass-edge-light`/`--glass-material-rim`/`--shadow-cartoon-md`), NOT raw `hsl(0 0% 100% / 0.55)` literals (token-first is the literal WS10 brief). (c) Re-derive the budget against the REAL translucent composite over `.glass-field-portal::before`, tune to ΔL≥0.06 in **WebKit-DARK specifically** (R2's prior failure mode). (d) DROP the "byte-identical no-op if unset" claim — the recede is unconditional-on-grouped, a documented behaviour change. The binding non-authoring WebKit-dark getImageData capture is OWED at development (highest residual risk). |
| R3 | focus-ring fold weakens solid `--neutral-3` ring → 30% ring (a LARGER weakening) | **RE-FRAMED (62% refine) — the fold is a FIX, not a weakening.** The shared `--focus-ring-shadow` (inner stop `30% --ring`) is the SOLE carrier for ~20 `.focus-ring` consumers, ALL measuring ~1.9–2.1:1 on cream/L16 in BOTH modes → a pre-existing **library-wide WCAG 1.4.11 fail**. The input is the only shielded control. **The one-token remedy: make the INNER 2px stop SOLID** (`var(--focus-ring-color)` at 100%, drop the 30% alpha; keep the `0 0 8px …15%` outer halo). A solid ink ring measures 8–16:1 → clears 3:1 across all ~20 consumers AND folds the input with NO border-color line. π#3 measures over SOLID cream + L16 (the control's own fill), NOT a busy field (unclearable for any ring). Colorimetrically exact + real-paint-confirmed both engines. |
| R4 | adopt transparent-outline-on-base, RETIRE the hand-list once census green | **VALIDATED (70% refine) — but the hand-list is KEPT this wave.** Transparent-outline recolouring confirmed in Chromium on real carriers. Retirement requires BOTH (a) base outline on EVERY box-shadow focus recipe (9 files / 10+ recipes, enumerated) AND (b) a no-regression forced-colors capture on Chromium **AND Firefox** (ideally real Windows HCM). Until both: **KEEP `a11y-overrides.css:78-91` — additive transparent outlines are harmless alongside it.** Census enumerates the VERIFIED selector set (not a single-line grep); SFC-inline `:focus-within` carriers get companion inline outline classes. Record the WHCM focus-COLOR downgrade. |
| R5 | native accent → KISS path: dark `--accent-color` → `--primary` | **FALSIFIED (84% prototype / 68% refine) — THIRD PATH.** Dark `--primary` = `oklch(0.739 0.134 318.1)` (L0.739, too light) → white checkbox/radio glyph sub-3:1 in WebKit. The fix is a DEEP-violet floor: dark `--accent-color: oklch(from var(--primary) 0.532 0.180 h)` (relative-color — deepen the dark primary to the white-glyph crossover; the house `css-relative-color` idiom, white glyph 5.77:1, relL 0.132 < both engines' crossover). **EDIT 1 (delete `light-dark.css:125`) is ATOMIC with EDIT 3 (the dark floor)** — EDIT 1 alone ships the falsified bright violet. NO new token (KISS preserved — an in-place dark re-declare). |
| C1 | DELETE `--corner-k-*` + re-anchor `proof:squircle-language` | **RELINQUISHED to WS4** (`BG.W-DEAD-TOKEN-SWEEP`). House SQUIRCLE tokens, not shadcn-named. WS10 does NOT touch `radius.css`/`proof-squircle-language.mjs`; runs the gate as a no-regression GREEN check only. |
| C2 | shared-cascade-file sequencing (WS3-M5 ↔ WS10) | **Land one, rebase the other.** WS3-M5 edits `--glass-tint-*`/`--glass-accent`; WS10 renames `--ring`/`--input` in the SAME three files. Line-disjoint tokens; recommend WS10 AFTER M5 (the larger structural edit). |

Plus the dropped-BE custom/ residuals (§0.1) and the WS4-W0 sequencing (§5 precondition).

### 0.1 The dropped-BE custom/ residuals (orchestrator ruling — RECORDED)

BE's dropped `W-DESHADCN-GATE-WIDEN`. Two LIVE + UNGUARDED custom/ residuals the ui/-scoped census is blind to:

- **`MetricBadge.vue:108`** — `focus-visible:outline-2 outline-ring outline-offset-2` = the cold shadcn
  outline-as-focus AND the **SOLE live consumer of the `--color-ring` bridge** (grep of all `src/`). **HARD
  PREREQUISITE, not a BOOK:** deleting `--color-ring` (§2.4-#4) makes `outline-ring` an unknown Tailwind
  utility → MetricBadge's focus ring silently dies in Chrome AND Safari, invisible to the gate. **RULE: fold
  `MetricBadge.vue:108` → the house `.focus-ring` utility, in the SAME diff as the `--color-ring` delete**
  (one class replaces three shadcn defaults).
- **`ScrubberTimeline.vue:258-259`** — `color: var(--popover-foreground); background: var(--popover)` = a flat
  shadcn-popover slab in a `<style>` body. **RULE: fold it (2-line re-point onto `var(--popover-foreground,
  var(--foreground))` / a glass register, mirroring `ContinuousTimeline.vue:334`) — recommended cheap-now.**
- **Re-entry guard:** add a NARROW whole-`src/` census arm (`outline-ring` / `ring-ring` / `ring-offset`
  over the full tree) — a thin sibling cross-scope grep, NOT a re-author of the 233-file ui/ walker.

---

## 1. GESTALT GOAL (unchanged)

Every glass-ui control is 100% glass-ui identity material — warm, weighty, liquid, iOS-27 — with ZERO
default shadcn/tailwind paint surviving on ANY component, reka/shadcn BEHAVIOUR byte-untouched. Token-first
idiomatic Tailwind v4. Gate-asserted census born-RED→GREEN, **real-paint-verified by a NON-AUTHORING judge
in BOTH modes AND Chrome AND Safari over a LIVE dev server** (headless-green is NOT acceptance — the
visually-broken trap shipped 3×).

---

## 2. MECHANISM — the four frontier rulings, converged + concrete

### 2.1 RULING 1 — the selected toggle (`.glass-toggle` marker widen; the silent-no-op BY CONSTRUCTION)

**The trap (verified `surfaces.css:282`):** `--glass-bg-floating-tinted` is minted at EXACTLY ONE scope —
`:where(.btn-glass, .segmented-indicator, .glass-capsule)`. The toggle base (`toggle/index.ts:40`) composes
NONE of those three, so a bare `data-[state=on]:bg-(--glass-bg-floating-tinted)` resolves an UNDEFINED
custom property → the selected fill silently does not paint, and the `bg-(--token)` shorthand cannot carry a
fallback. No source gate catches it (`proof:de-shadcn` doesn't cover Toggle; `proof:no-shadcn-default` spares
`data-[state=on]:bg-accent` via the `:`-lookbehind fence). The e2e silent-no-op the frontier names.

**CONVERGED mechanism (the validated `.glass-toggle` marker — prototype's KEY correction):**

1. **Add a `.glass-toggle` MARKER CLASS to the shared `toggleVariants` CVA base string** (`toggle/index.ts:40`)
   and **widen `surfaces.css:282`** to `:where(.btn-glass, .segmented-indicator, .glass-capsule, .glass-toggle)`.
   The marker mints `--glass-bg-floating-tinted` ON the toggle element, so `data-[state=on]:bg-(--glass-bg-floating-tinted)`
   reads it on the SAME node (runtime-confirmed it resolves). The marker is cascade-robust (a class on the
   element, not an attribute selector that can be specificity-out-raced) and reusable for any future inline glass
   control. **Do NOT compose `.glass-capsule` onto the toggle base** — that brings `backdrop-filter:
   var(--glass-blur-floating)` to EVERY toggle at rest (`glass-capsule.css:67`) = a per-toggle Safari blur layer
   + a far larger visual change. The `:where()` widen is the only honest, zero-rest-cost path.
2. **COUPLE the glyph re-point in the SAME edit:** `data-[state=on]:text-accent-foreground` →
   `data-[state=on]:text-foreground` (matching the already-correct `card` variant, `toggle/index.ts:68`).
   `--accent-foreground` was calibrated for the opaque accent SLAB; over the translucent floating-tinted fill the
   glyph must read `--foreground` + the W55 `contrast-color()` lift to clear legibility in DARK.
3. **hover → the glass-quiet WELL** — `hover:bg-muted hover:text-muted-foreground` re-points onto the
   `--control-surface-bg-hover` / `--glass-bg-quiet` register (the menu-row + `.control-surface` precedent), NOT
   raw `bg-muted`.
4. **NOTE the rest-default subtlety (for the π):** `--glass-tint-strength` is `0%` at rest, so
   `floating-tinted == floating` over a calm/dark backdrop; the adaptive benefit engages only over BRIGHT/busy
   backdrops. The π MUST capture over a media-rich backdrop, not a flat plate.

**Born-RED π (e2e-paint, NON-AUTHORING, DARK):** open `/forms/toggle`, runtime-assert
`getComputedStyle(selectedToggle).backgroundColor !== 'transparent'` AND it resolves the oklab tinted value
(not the raw rung), AND the selected glyph clears ≥4.5:1 over the floating fill. The class-string is invisible
to this — vue-tsc + units MISS the no-op.

**Falsifier (R1):** if the `:where()` widen still leaves `--glass-bg-floating-tinted` undefined on the toggle
(cascade/scope edge), fall back to an element-level re-declare of the `color-mix` on the `.glass-toggle` scope.
The e2e-paint π is the only catch.

### 2.2 RULING 1b — the close-button fold (verify the hover well + the geometry)

Fold the 3-way close fork (DialogContent `rounded-sm opacity-70 data-[state=open]:bg-accent` / SheetContent
`rounded-sm … data-[state=open]:bg-secondary` / DialogScrollContent `rounded-pill hover:bg-secondary`) →
`cn(buttonVariants({variant:'ghost', size:'icon-sm'}), 'absolute right-4 top-4')`. DROP the net-new
`.glass-overlay-close` utility (less-DRY, flat-color, forks a third hover idiom). Three CONCRETE verify items:

- **Radius:** `size:'icon-sm'` (`button/index.ts:187`) carries NO radius class → CONFIRM the CVA base resolves a
  semantic alias (`rounded-pill`/concentric per squircle policy), NOT a bare `rounded-md`.
- **Hover well visibility (born-RED π):** `ghost` hover = `bg-foreground/8` (8% ink). Over the dialog plate
  `--glass-opacity-dialog` = **0.68 light / 0.76 dark** (`dark-arm.css:239`), an 8%-ink well on a 68/76%-opaque
  plate is MARGINAL. Paint-verify VISIBLE in BOTH modes; if it fails, bump the well alpha or compose a glass-quiet
  well — do not ship an invisible affordance.
- **Hit target:** `icon-sm` = `h-(--control-h-xs) w-(--control-h-xs)` is likely sub-44px (WCAG 2.5.5). Record the
  dialog-close geometry exception OR expand the hit area. The glass specular bloom is inert without a glass
  `::before`, so the ink-bg + scale-press carry the affordance — the recorded behaviour.
- **ToastAction re-roll FOLD** rides this wave too: `border bg-transparent hover:bg-secondary h-[calc…] text-sm
  transition-colors` → `buttonVariants({ variant: 'outline'|'secondary', size: 'sm' })`.

### 2.3 RULING 2 — grouped-inset Select (INVERT the elevation + scope to grouped + token-first rim)

**The architectural fix (the reference judge's binding finding):** the Pass-1 prototype FAILED the "3 separated
correctly-elevated cards" bar — `SelectContent` paints `.glass-floating` (0.80/0.88) and the group cards layer
at ~the same tier → no contrast AND no ceiling headroom (a nested card cannot elevate above 0.80/0.88 without
hitting overlay 0.95).

**CONVERGED — invert the tiers + per-mode lift + token-first rim + the four critique folds:**

1. **RECESS the panel, FLOAT the groups.** Drop `SelectContent` from `glass-floating` to a **WELL tier**
   (`glass-resting` 0.65/0.72 or `glass-quiet`); the `.glass-menu-group` cards sit at the **floating tier** so they
   POP FORWARD off the well. The visible inset GUTTER between cards (showing the recessed base) makes 3 cards SEPARATE.
2. **SCOPE the recede to grouped panels (critique mustFix — CRITICAL).** The panel recede applies ONLY under
   `[data-slot=select-content]:has(.glass-menu-group)` (or the equivalent group-presence selector). The
   UNCONDITIONAL `:root`/all-panel recede degrades the UNGROUPED Selects (basis/density in the SAME demo story)
   into a darker/muddier well with NO compensating cards — it would UNDO BD.W-SELECT-WELL (`--select-plate-alpha`
   0.90/0.94 at `select.css:115/142`). Verify ungrouped panels stay warm-transmissive. **DROP the "byte-identical
   no-op if unset" claim** — on a grouped panel the recede is UNCONDITIONAL (a documented behaviour change), it is
   never a defensive opt-in.
3. **`--menu-group-fill` is a per-mode PAIR — dark LIFTS, light darkens** (the W-DARK-MATERIAL elevation ladder +
   `proof:card-tier-alpha`): light card brighter-toward-`--card`; **dark card LIFTS toward the warm-ink** (mirror
   `dark-arm.css:79-80` L16→~L20 "+2 L lifts off page"), NEVER a near-black darken. Plain per-mode-pair idiom (light
   tokens/glass.css + dark tokens/dark-arm.css — NOT `light-dark()`, the inset-shadow trap; a STATIC `color-mix(in
   oklab)`, NOT a 5th backdrop-filter layer — it would blow the depth-4 nested-backdrop ceiling).
4. **Re-derive the separation budget against the REAL translucent composite (critique mustFix).** Both card (~0.95)
   and well (~0.72 eff) composite over the spatially-varying `.glass-field-portal::before` warm-spine (`select.css:157`),
   NOT an opaque core. Light-mode over a bright page collapses ΔL (the −0.23·L_backdrop term). Measure IN SITU; tune
   `--menu-group-fill` / the well recede until card ΔL ≥ ~0.06–0.08 above panel-base in BOTH modes — **and clear
   ΔL≥0.06 in WebKit-DARK specifically** (R2's prior failure mode; the binding non-authoring getImageData capture is
   the acceptance, NOT the author's analytic opaque-core ΔL).
5. **Compose the rim/shadow from EXISTING tokens (critique mustFix — token-first/DRY is the literal brief).** The
   1px inner top-rim highlight reads `--glass-edge-light` / `--glass-material-rim` (`glass-atom.css:172/187`); the
   card lift reads `--shadow-cartoon-md` / `--glass-shadow-floating` (`glass-capsule.css:73`). DROP the prototype's
   raw `hsl(0 0% 100% / 0.55)` + `hsl(28 30% 20% / 0.14)` literals — the 3×-over-house 0.55 rim alpha is unjustified.
   CRITICAL: the uppercase-mono header voice is FORBIDDEN this wave, so the backplate + rim carry the ENTIRE iOS signal.
6. **Fix the inset geometry.** The prior capture showed rows overflowing the card's right edge (~490 vs ~505px). The
   `.glass-menu-group` card CONTAINS its rows with consistent inset margins (`overflow: hidden` contains the right-edge
   overflow); concentric radius (card at ~`--radius-control` 20px, rows flush-full-width-inside with hairline separators
   OR rows at card-radius-minus-inset); a clear ~8–12px inter-group GUTTER showing the recessed base.
7. **Verify the portal-blur lands.** The portal escapes to `<body>` (route-field stops). Confirm `--glass-blur-floating`
   (~13px) actually applies to the PORTALLED panel (`select.css:146` notes the seam); if the bleed persists, raise the
   panel's effective opacity toward the recessed-but-occluding band.
8. **SelectLabel KEEPS `text-dropdown-secondary` — structural envelope ONLY.** `proof:dropdown-type-scale.mjs:142`
   REQUIRES it + D17 family-parity governs all four family labels. Touch `SelectGroup.vue` ONLY; do NOT compose
   `.glass-menu-section` onto the label (reds the gate, shipped CI-RED once). Pre-warn the gestalt judge: the label stays
   sans-serif (the iOS mono-caption voice is DEFERRED, §7).

**Born-RED π (the binding capture — OWED at development):** open `/forms/select`, NON-AUTHORING judge, **Chrome AND
Safari (WebKit), both modes, dev server UP**, read by `getImageData` (getComputedStyle is color-blind to oklch
clamping + the spatial backdrop): 3 distinct correctly-elevated cards (card ΔL ≥ ~0.06 above panel-base in both modes,
**WebKit-dark specifically**), rows contained within the card edge, the inter-group gutter visible, UNGROUPED panels
stay warm-transmissive. `proof:dropdown-type-scale` STAYS GREEN. Run the FULL affected-gate suite on REAL `tranche/BG`
HEAD with a server up — distinguish befitting-SKIP from PASS for the live-π gates (`nested-backdrop-budget`, `ba-gestalt`).

**Falsifier (R2 — highest residual):** if recess+float+lift+rim STILL does not read 3 separated cards in WebKit dark,
the backplate-only signal is insufficient → escalate to the DEFERRED mono-caption header (the stronger iOS signal; a
lockstep register change across all four family labels + a sized re-point of `proof:dropdown-type-scale`).

### 2.4 RULING 3 — the focus-ring 3-surface decouple (R3 born-RED CONFIRMED + library-wide FIX)

**The corrected baseline (re-framed by the critique, verified on disk):** `--focus-ring-shadow` (`scale-paper.css:83-84`)
is `0 0 0 2px color-mix(in srgb, var(--ring) 30%, transparent), 0 0 8px color-mix(in srgb, var(--ring) 15%, transparent)`
— a 30%-alpha inner stop. It is the SOLE focus carrier for **~20 `.focus-ring` consumers** (button base, tabs, accordion,
toast, checkbox, slider, switch, radio, select-trigger, badge, dark-toggle…), ALL measuring **~1.9–2.1:1 on solid
cream/L16 in BOTH modes** — a **pre-existing, library-wide WCAG 1.4.11 (≥3:1) FAIL**. The `.input-pill` is the ONLY
shielded control: its `:focus-visible` (`control-surfaces.css:96-97`) paints `border-color: var(--color-accent-opaque,
var(--ring))` (phantom first-arg → SOLID `--ring` ink border) + a SOLID 2px `--neutral-3` box-shadow (`--color-accent`
IS defined). **The R3 fold un-shields the input from a library-wide defect — it is a FIX, not an input-local regression.**

**CONVERGED RULING:**

1. **The one-token remedy — make the INNER 2px stop SOLID.** Edit `--focus-ring-shadow` so the inner leg drops the 30%
   alpha (`0 0 0 var(--focus-ring-width) var(--focus-ring-color)`) and KEEPS the soft outer halo
   (`0 0 8px color-mix(in srgb, var(--focus-ring-color) 15%, transparent)`). A solid ink ring measures 8–16:1 → clears
   3:1 across all ~20 consumers in ONE edit, folds the input with NO border-color line, keeps the iOS soft-glow identity.
   **Prefer this over raise-alpha-to-55%** (still sub-3:1 on busy, barely 3:1 on solid) **and over keep-a-separate-border**
   (a non-fold). Colorimetrically exact (pure `color-mix(in srgb)` box-shadow, no oklab clamp) + real-paint-confirmed both
   engines within ~0.15.
2. **THEN fold the input.** `.input-pill:focus-visible` → `box-shadow: var(--focus-ring-shadow)`, border-color line
   DROPPED, the phantom `var(--color-accent-opaque, …)` first-arg DELETED (`control-surfaces.css:96`). The solid inner
   stop IS the ring; no separate border needed.
3. **The 3-surface decouple (the rename is NOT a sed):**
   - **FOCUS register (reads 1–4)** → `--ring` renamed to **`--focus-ring-color`** (slots beside
     `--focus-ring-{width,shadow}`; the last shadcn-named token retired, clean break, no alias). After the fold +
     crown/native decouple, `--focus-ring-color` has EXACTLY ONE consumer (`--focus-ring-shadow`) — a single retint knob.
   - **configurator crown (#7, `configurator.css:251`, `inset 0 0 0 2px var(--ring)`)** → **`--foreground`**.
     **Re-framed as a DARK-MODE DEFECT FIX:** in dark `--ring` = `hsl(48 10% 70%)` = OKLab H~95° yellow-green (the exact
     hue W-NO-GRAY/W-DARK-INK-WARM condemn) → the dark active-tile crown currently paints yellow-green = a LIVE W-NO-GRAY
     violation. `--foreground` fixes it. Verify with `proof:no-gray`.
   - **native `accent-color` (#6)** → **the deep-violet floor (the FALSIFIED-KISS THIRD PATH, §2.4 below).**
   - **`--color-ring` bridge (#5)** → DELETED (after the MetricBadge fold, §0.1).
4. **DELETE the dead set (one diff, coupled edits):** the phantom `--color-accent-opaque` first-arg (step 2);
   `--input` (`color-radius.css`) + `--color-input` bridge (`bridges.css:82`) — `border-input`/`bg-input` are live-ABSENT
   (prose comments only). Confirm absence before deleting.
5. **The warm-flip is ATOMIC with `proof:no-gray`.** Mint the `warm-hue-dark-focus-ring` witness in the SAME commit as
   the `--focus-ring-color` dark warm-flip (hsl-48 H~95° → hsl-30 family ~H75°), OR BOOK both — the rename + fold + crown
   decouple + native decouple + the dead-token deletes are **hue-neutral and land regardless.**

**Native `accent-color` — the deep-violet floor (KISS-to-primary FALSIFIED → THIRD PATH):**

The pass-2 KISS path (point dark `--accent-color` → `--primary`) is FALSIFIED: dark `--primary` =
`oklch(0.739 0.134 318.1)` (L0.739, too light) → the white checkbox/radio glyph reads **sub-3:1 in WebKit** (WebKit
paints a forced-white glyph; over an L0.739 violet it does not clear). The fix:

- **EDIT 1 — DELETE `light-dark.css:125`** (`--accent-color: light-dark(var(--primary), var(--ring))` — retires the
  last `--ring` native read AND the light-dark↔plain-`.dark` divergence).
- **EDIT 3 (ATOMIC, non-optional) — the dark floor.** In `dark-arm.css` `.dark` block (beside `:92 --primary`), declare
  **`--accent-color: oklch(from var(--primary) 0.532 0.180 h)`** — the relative-color deepen of the dark primary to the
  white-glyph crossover (L 0.739→0.532, C 0.134→0.180, hue preserved 318.1). White glyph 5.77:1, relL 0.132 < both
  engines' crossover (Chromium 0.179 / 4.5:1-white-floor 0.183) → BOTH engines paint a legible white glyph. This is the
  house `css-relative-color` idiom (the BB.W-DARK-INK-WARM `oklch(from var(--foreground) …)` precedent). The light floor
  `color-radius.css:114 --accent-color: var(--primary)` STAYS. **NO new token** (KISS preserved — an in-place dark
  re-declare). The library's own `--section-color-7`/`--viz-legendre` = `oklch(0.532 0.180 317.5)` is the SAME deep-violet
  identity (an equivalent `var(--section-color-7)` floor is acceptable; the relative-color form is preferred for
  self-documentation — "dark primary deepened to the contrast crossover").
- **EDIT 1 + EDIT 3 are ATOMIC** — EDIT 1 alone ships `--accent-color: var(--primary)` = the falsified bright violet in
  BOTH engines. Add the crossover-rationale comment at EDIT 3.
- **The non-text-contrast caveat (recorded rationale).** A checked Chromium accent-color box vs a CARD backdrop measures
  ~2.43:1 (sub-3 for WCAG 1.4.11 — the box has no separate border). This is ACCEPTED with rationale: native controls are
  the FALLBACK FLOOR (glass-ui ships reka custom Checkbox/RadioGroup as the primary; the native accent is only reached
  when a consumer mounts a bare `<input type=checkbox>`). The slightly-lighter `oklch(0.55 0.16)` (vsCard 2.65, white still
  ≥5.27:1) is the documented escape IF design wants the box-edge to clear 3:1; the deeper 0.532 is preferred for the white
  glyph headroom.

**Born-RED π #3 (MEASURED against the real paint, NON-AUTHORING, both engines):** ≥3:1 WCAG 1.4.11 over **SOLID cream
(light) + the L16 dark plate (dark)** — the control's OWN fill, NOT a busy/translucent field (a translucent ring is
unclearable over busy at any alpha/width; the binding surfaces are solid). **Widen to ≥1 NON-INPUT control ring** (a
button ring over a glass tier, checkbox/radio, select-trigger, the dialog-close over the 0.68/0.76 plate, a badge). The
`proof:ba-gestalt` verdict covers the input ring AND the dark native checkbox/radio glyph (≥4.5:1 over the deep violet,
BOTH engines, on `/forms/checks` — checkbox AND radio-dot) AND the dark configurator crown (reads `--foreground`). Commit
the born-RED→GREEN artifact (the falsified bright-violet white-glyph-sub-3:1 in WebKit-dark AND the fixed deep-violet
≥4.5:1, side by side) on disk — the WebKit-forced-white premise needs the on-disk capture.

### 2.5 RULING 4 — forced-colors (transparent-outline-on-base + KEEP the hand-list this wave)

**The structural defect:** the forced-colors Highlight block (`a11y-overrides.css:78-91`) is a HAND-LIST of 10
`:focus`/`:focus-visible` carriers. WHCM strips `box-shadow` → any box-shadow focus carrier NOT in the list ships
keyboard-INVISIBLE. Confirmed unenrolled carriers: `.input-bar:focus-within` (`components.css:241`),
`.metric-badge:focus-visible` (`components.css:77`), the SFC-inline combobox/tags-input `:focus-within` rings.

**CONVERGED RULING — adopt the SOTA transparent-outline-on-base technique, but KEEP the hand-list this wave:**

1. **Add a base `outline: 2px solid transparent; outline-offset: 2px`** to EVERY box-shadow focus RECIPE. WHCM
   auto-recolors a transparent outline to the system color (Chromium-confirmed on real carriers: `.input-bar:focus-within`
   → CanvasText, `:focus-visible` metric-badge → system focus color; the outline survives the box-shadow strip). The
   ENUMERATED recipe set (9 files / 10+ recipes — the census target, NOT a single-line grep):
   `.focus-ring` (base.css:185), `.glass-btn` (surfaces.css:105), `.interactive-item` (base.css:213), `.btn-pill`
   (btn.css), the 4 dock controls (dock.css:158), `.input-pill:focus-visible` (control-surfaces.css:94/97), `.input-bar:focus-within`
   (components.css:241), `.metric-badge:focus-visible` (components.css:77), `dock/layer-group.css:227`,
   `dark-mode-toggle.css:39`, the multi-line `.liquid-pill.focus-ring:focus-visible` (liquid-morph.css:120 — inherits
   `.focus-ring`'s outline, NOT a false-RED).
2. **SFC-inline `:focus-within` carriers** (ComboboxInput.vue:34, TagsInput.vue:33 — no CSS recipe to host the base
   outline) get a companion inline `focus-within:outline-2 focus-within:outline-transparent focus-within:outline-offset-2`;
   the census asserts it per-site.
3. **KEEP `a11y-overrides.css:78-91` (the hand-list) this wave.** Retirement requires BOTH (a) the base outline on EVERY
   recipe AND (b) a no-regression forced-colors capture over all 10 selectors on **Chromium AND Firefox** (ideally real
   Windows HCM) — Chromium emulation alone does NOT clear the §2.5 MITIGATION fence. Until both land, additive transparent
   outlines are HARMLESS alongside the hand-list (they coexist). The hand-list paints `Highlight`; the transparent-outline
   floor recolours to `CanvasText` (a focus-COLOR semantic downgrade for the newly-covered `:focus-within` carriers) —
   **recorded + accepted** (a focus-within text-field ring reading CanvasText is acceptable per a11y review; the enrolled
   hand-list carriers keep their Highlight semantic). **Decide `:focus` (mouse) coverage explicitly:** the hand-list covers
   `.input-pill:focus` AND `:focus-visible`; the technique edits `:focus-visible`-only — add the base outline to `:focus`
   too OR record the deliberate drop (do not silently regress mouse-focus WHCM coverage).
4. **Carrier-inventory correction (critique mustFix):** `.glass-card.is-focus-within` (a11y-fallback.css:241) is a
   `@supports not :has()` focus-ELEVATION custom-prop fallback, NOT a box-shadow focus-ring carrier — do NOT add a
   transparent outline there. `dock/search.css:42` is a base `.input-bar` override that already inherits the
   `components.css :focus-within` rule — not a separate carrier. Build the census from the VERIFIED set above.

**Born-RED census arm** (extend `proof:no-shadcn-default` in place — the no-new-id fence): enumerate the VERIFIED selector
set; assert each has the base transparent-outline OR appears in the forced-colors set; understand composition (the
liquid-pill inheritance is not a false-RED). Born-RED on the confirmed-missing carriers.

**Born-RED π:** a `@media (forced-colors:active)` capture (Chrome `emulate-forced-colors` AND a Firefox forced-colors
capture) asserts a non-`none` outline on `.input-bar:focus-within` + every box-shadow focus carrier.

**Falsifier (R4):** if a forced-colors capture shows a carrier still invisible on any engine, that carrier rejoins the
explicit hand-list set (the hand-list is KEPT this wave, so this is non-blocking).

---

## 3. CROSS-WORKSTREAM COLLISION RULINGS (pass-2, RECORDED)

- **C1 — `--corner-k-soft`/`-sharp` + `proof:squircle-language` re-anchor: RELINQUISHED to WS4.** The A-deadcode lane
  `BG.W-DEAD-TOKEN-SWEEP` (in `BG-WS4`) EXPLICITLY OWNS this. They are house SQUIRCLE tokens, NOT shadcn-named — outside
  WS10's de-shadcn lane. **WS10 REMOVES `theme/radius.css` + `scripts/proof-squircle-language.mjs` from FILES TOUCHED** and
  does not delete/re-anchor them. (`proof:squircle-language` runs in WS10's acceptance suite as a no-regression GREEN check.)
- **C2 — shared-cascade-file sequencing (WS3-M5 ↔ WS10).** WS3-M5 (glass-tint-unify) edits `--glass-tint-*`/`--glass-accent`
  in `color-radius.css` / `dark-arm.css` / `light-dark.css`; WS10 renames `--ring`/`--input` + deletes in the SAME three
  files. DISJOINT tokens, line-disjoint edits, merge-conflict risk only. **Land one then rebase the other** (recommend WS10
  after M5 — M5 is the larger structural edit).

---

## 4. FILES TOUCHED (delta from pass-1-converged §3)

**REMOVED (collision C1):** ~~`src/styles/theme/radius.css`~~, ~~`scripts/proof-squircle-language.mjs`~~.

**ADDED / amended:**
- `src/styles/glass/surfaces.css:282` — widen the `:where()` `--glass-bg-floating-tinted` mint to include `.glass-toggle` (§2.1).
- `src/components/ui/toggle/index.ts:40` — add the `.glass-toggle` marker class + glyph re-point + hover-well (§2.1).
- `src/styles/tokens/scale-paper.css:83` — `--focus-ring-shadow` inner stop made SOLID (§2.4-#1); `--ring`→`--focus-ring-color`.
- `src/styles/glass/control-surfaces.css:96-97` — fold `.input-pill:focus-visible` → `box-shadow: var(--focus-ring-shadow)`,
  drop border-color, delete the phantom `--color-accent-opaque` (§2.4-#2).
- `src/styles/configurator.css:251` — crown reads `--foreground` (§2.4-#3).
- `src/styles/tokens/light-dark.css:125` — DELETE the redundant native-accent arm (EDIT 1, §2.4 native, ATOMIC).
- `src/styles/tokens/dark-arm.css` (`.dark` block, beside :92) — `--accent-color: oklch(from var(--primary) 0.532 0.180 h)`
  (EDIT 3, the deep-violet floor, §2.4 native, ATOMIC); the `--ring`→`--focus-ring-color` lockstep + the GATED warm-hue flip.
- `src/styles/tokens/color-radius.css` — DELETE `--input`; `--ring`→`--focus-ring-color`.
- `src/styles/theme/bridges.css:82-83` — DELETE `--color-input`, `--color-ring`; MINT `--text-control`/`-sm`.
- `src/styles/menu.css` — `.glass-menu-group` inset-grouped envelope (per-mode lifting fill, token-first rim, scoped to
  grouped panels) (§2.3).
- `src/styles/select.css` — the `[data-slot=select-content]:has(.glass-menu-group)` panel recede (§2.3-#2).
- `src/components/custom/metric-badge/MetricBadge.vue:108` — fold `outline-ring` → `.focus-ring` (§0.1, ATOMIC with `--color-ring` delete).
- `src/components/custom/timeline/ScrubberTimeline.vue:258-259` — fold `var(--popover)` slab → glass register (§0.1, recommended cheap-now).
- `src/styles/utilities/a11y-overrides.css` + the box-shadow focus recipes (9 files) — base transparent-outline; KEEP the
  hand-list this wave (§2.5).
- `src/components/ui/combobox/ComboboxInput.vue:34`, `tags-input/TagsInput.vue:33` — companion inline transparent-outline (§2.5-#2).
- `scripts/proof-no-shadcn-default.mjs` — + the forced-colors-enrollment census arm (VERIFIED selector set) + the narrow
  whole-`src/` focus-shim arm, on top of the pass-1 deep-vocab + state-arm arms.
- `dialog/DialogContent.vue` / `dialog/DialogScrollContent.vue` / `sheet/SheetContent.vue` (close → `buttonVariants({ghost,icon-sm})`),
  `toast/ToastAction.vue` (→ `buttonVariants({outline|secondary,sm})`), `select/SelectGroup.vue` (compose `.glass-menu-group`),
  `select/SelectLabel.vue` (KEEPS `text-dropdown-secondary`; inset alignment only) + the pass-1 §3 ui/ reskin set.

Everything else in pass-1-converged's §3 stands.

---

## 5. WAVE BREAKDOWN (the five waves, each with its validated mechanism + real-paint-π bar)

> **Precondition W0 (WS4, unchanged):** `BG.W-DESHADCN-SWEEP` lands `proof:de-shadcn` REGISTER (gates.mjs +
> package.json + ci, atomic born-GREEN) + the 9 FORM clears + the **stepper teeth + the `opacity-utility` denylist arm**
> (the untracked dev gate is the EARLIER design — only `NumberFieldInput`, no steppers, no `opacity-utility` arm, so
> `NumberFieldIncrement/Decrement.vue:25 disabled:opacity-20` SLIP it; W0 must add them + reconcile the 7-vs-9 count to the
> **9-violation** enumeration) + the `--opacity-disabled-strong:0.2` / `--icon-decoration-opacity` mints + the forced-colors
> clear. **Acceptance runs BARE `node scripts/proof-de-shadcn.mjs` (HEAD mode), NOT `--post-fix`.** **WS10 sequences strictly
> AFTER W0.** Run the FULL affected-gate suite (NOT vue-tsc+build) as the acceptance — the cardinal build-green/gate-red lesson.

### BG.W-DESHADCN-CENSUS — the complete census (EXTEND, never re-author)
EXTEND `proof:no-shadcn-default` with the deep-VOCABULARY arms (pass-1 §2.1a) + the VALIDATED STATE-ARM-NEUTRAL classifier
(the prototype regex, 233-file zero-false-positive fixture committed) + the menuItemVariants accent allowlist + the
forced-colors-enrollment census arm (the VERIFIED 9-file/10+-recipe selector set, composition-aware — §2.5) + the narrow
whole-`src/` focus-shim arm (`outline-ring`/`ring-ring`/`ring-offset`, §0.1) + the EXACTLY-ONE-LIST closure widen. NO new
gate id. Born-RED on the HEAD residuals; ATOMIC born-GREEN AFTER W0.
**Acceptance:** the full 233-file sweep records ZERO false positives against the real identity arms + the liquid-reveal
grammar; reds the 9 residual files / 10 token-rows + the 8 planted state-arm bites + the 4 unenrolled forced-colors carriers.

### BG.W-DESHADCN-TOKEN-REPLACE — the replacement sweep + the dead-token deletes + the focus-ring fix
The §2.1 toggle (`.glass-toggle` marker widen + glyph re-point + hover well), §2.2 close-button + ToastAction `buttonVariants`
folds, the §2.4 focus-ring inner-stop-SOLID fix + the 3-surface decouple (`--focus-ring-color` rename / crown→`--foreground`
/ native deep-violet floor — EDIT 1 + EDIT 3 ATOMIC) + the dead-token deletes + the MetricBadge/ScrubberTimeline custom/
folds + the base transparent-outline (hand-list KEPT). The `--corner-k-*` delete is NOT here (C1). Clean break, no alias.
**Acceptance:** the FULL affected-gate suite GREEN (NOT build-green); each visual reskin re-earns `proof:ba-gestalt` on a
FRESH NON-AUTHORING capture, BOTH modes + Chrome AND Safari — the born-RED π #1 (toggle selected non-transparent oklab fill +
glyph ≥4.5:1 in DARK), π #3 (focus ring ≥3:1 over solid cream+L16, ≥1 non-input ring, the dark native checkbox/radio white
glyph ≥4.5:1 BOTH engines + the dark crown reads `--foreground`), π #4 (forced-colors non-`none` outline). The
`warm-hue-dark-focus-ring` flip is ATOMIC-with-`proof:no-gray` or BOOKED.

### BG.W-TAILWIND4-IDIOM — the idiom closure (SMALL, polish)
Mint `--text-control`/`--text-control-sm` `@theme` bridges + `@utility glass-blur-{wash,quiet,floating}`; retire the 2
arbitrary-wrap classes; extend `proof:tailwind-v4-idiom` clause-(d) completeness; keep GREEN. SANCTIONED-KEEP the
comma-fallback + custom-prop-write brackets (idiomatic v4). Low investment.

### BG.W-DESHADCN-MATERIAL — the grouped-inset Select elevation-INVERSION (the DEPTH) + Switch material
The §2.3 envelope: RECESS SelectContent (scoped `[data-slot=select-content]:has(.glass-menu-group)`), FLOAT the groups,
per-mode LIFTING `--menu-group-fill` (dark LIFTS), token-first rim (`--glass-edge-light`/`--glass-material-rim`/`--shadow-cartoon-md`,
NO raw hsl literals), fix the inset geometry (`overflow:hidden` + concentric radius + inter-group gutter), confirm the
portal-blur. SelectLabel KEEPS `text-dropdown-secondary` (`proof:dropdown-type-scale` STAYS GREEN). Deepen Switch
material/motion (READ the `--switch-*`/`--control-*` quads, never re-mint). All material lands in CSS (menu.css/select.css)
— no SFC > 500L. NO new gate.
**Acceptance:** the binding NON-AUTHORING getImageData capture (the OWED pass-2 deliverable) confirms 3 SEPARATED
correctly-elevated cards in BOTH modes AND Chrome AND Safari, **WebKit-dark ΔL≥0.06 specifically**, rows contained, gutter
visible, UNGROUPED panels stay warm-transmissive — dev server UP, FULL affected-gate suite GREEN (SKIP-vs-PASS distinguished
for the live-π gates). If WebKit-dark still fails to separate → escalate to the DEFERRED mono-caption header (R2).

### BG.W-DESHADCN-GATE — the lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm the WS4 `proof:de-shadcn` GREEN precondition; run the FULL
affected-gate suite (§6); enroll the forms/controls gestalt roster + run the four binding π (six-state matrix, both modes +
Chrome AND Safari + the forced-colors outline arm, non-authoring judge, dev server UP); fold the CLAUDE.md de-shadcn CANON.

---

## 6. ACCEPTANCE / REAL-PAINT-π BAR (the four born-RED π + the full gate suite)

The acceptance is the FULL affected-gate suite — `proof:no-shadcn-default` (extended), `proof:de-shadcn` (WS4, HEAD mode),
`proof:dropdown-type-scale` (STAYS GREEN), `proof:no-gray`, `proof:glass-cohesion`, `proof:no-layout-animation`,
`proof:menu-glass`, `proof:control-tokens`, `proof:squircle-language` (no-regression), `proof:tailwind-v4-idiom`,
`proof:webkit-backdrop`, `proof:nested-backdrop-budget` — run via `node scripts/gates.mjs --run <tags>`, **NOT** vue-tsc+build
(the cardinal lesson). PLUS the four born-RED π, each by a NON-AUTHORING judge, BOTH modes AND Chrome AND Safari, dev server
UP, read by `getImageData`:

1. **Toggle selected (DARK, e2e-paint):** `data-[state=on]` resolves a non-transparent oklab tinted fill at runtime (NOT
   the raw rung, NOT transparent) AND the glyph clears ≥4.5:1.
2. **Grouped-inset Select:** 3 SEPARATED correctly-elevated cards (card ΔL ≥ ~0.06 above the recessed panel-base, **WebKit-dark
   specifically**, dark LIFTS), rows contained in the card edge, gutter visible, ungrouped panels warm-transmissive.
   `proof:dropdown-type-scale` GREEN.
3. **Focus ring (folded, inner-stop-SOLID):** ≥3:1 WCAG 1.4.11 over SOLID cream + L16 dark (the control's own fill, NOT a busy
   field), both modes + ≥1 NON-INPUT control ring. The `proof:ba-gestalt` verdict covers the input ring AND the dark native
   checkbox/radio white glyph (≥4.5:1 over the deep violet, BOTH engines, checkbox + radio-dot) AND the dark configurator crown
   (`--foreground`). Commit the falsified-bright-violet vs fixed-deep-violet born-RED→GREEN artifact on disk.
4. **Forced-colors:** `@media (forced-colors:active)` → non-`none` outline on `.input-bar:focus-within` + every box-shadow
   focus carrier (Chromium AND Firefox; the transparent-outline-on-base recolouring confirmed by a real WHCM capture).

PLUS: close-hover well VISIBLE over the 0.68/0.76 dialog plate (§2.2); the forms/controls gestalt-roster row + per-surface
VERDICT recorded; the demo launched + dist rebuilt (a dev server MUST be up — real-paint needs it). Budget: `dist/styles/index.css`
stays under gzip 140_000 (any conscious rebase sized + commented).

---

## 7. FOLDED / DEFERRED (delta)

- **`--corner-k-*` delete + squircle re-anchor → WS4's `BG.W-DEAD-TOKEN-SWEEP`** (C1). Out of WS10.
- **The mono-caption section voice for the picker family** — DEFERRED (a lockstep register change across all four family
  labels + a sized re-point of `proof:dropdown-type-scale`). This wave keeps `text-dropdown-secondary`; the iOS inset-grouped
  LOOK is the structural envelope + rim ONLY. **This is the R2 escalation target** if WebKit-dark separation fails.
- **`.glass-menu-group` extension to DropdownMenuGroup/ContextMenuGroup** — THIS-WAVE-or-BOOK is the orchestrator's call; the
  label-bearing-group ⇒ inset rule is RECORDED either way.
- **The native `--accent-color-native` dedicated token — MOOT/RESOLVED.** The deep-violet floor (`oklch(from var(--primary)
  0.532 0.180 h)`, no new token) supersedes both pass-2's KISS-to-primary (falsified) AND pass-1's mint-`--accent-color-native`.
  The pass-1/pass-2 §2.4 native sub-item + §7 R5 item are UPDATED to the deep-violet floor.
- **The dark `--focus-ring-color` warm-hue flip** — ATOMIC-with-`proof:no-gray` or BOOKED (the rename/fold/decouple/deletes
  are hue-neutral and land regardless).
- **The forced-colors hand-list retirement** — DEFERRED past this wave (requires the base outline on EVERY recipe AND a
  Chromium+Firefox no-regression capture; the hand-list is KEPT, additive outlines coexist). The `:focus` (mouse) base-outline
  coverage decision + the `:focus-within` CanvasText focus-COLOR downgrade are RECORDED.
- **The non-form per-control STATE-COVERAGE archetype matrix** — BOOKED (the vocab + state-arm census already satisfies "no
  default leak on ANY component").

---

## 8. OPEN RISKS (the falsifiers — what would break the spec)

- **R2 (HIGHEST residual) — the grouped-Select elevation inversion might still not separate by a non-authoring judge in
  WebKit-dark.** The mechanism is analytically + directionally confirmed (the inversion + dark-LIFTS + `:has` scope + token-first
  rim), but the binding WebKit-dark getImageData capture over a LIVE blurred backdrop is OWED at development. If it STILL does
  not read 3 separated cards → escalate to the DEFERRED mono-caption header (the stronger iOS signal; a lockstep gate re-point).
  **The unconverged frontier.**
- **R1 — the toggle `.glass-toggle` mint might not resolve at the toggle element.** Runtime-confirmed in the prototype, but the
  e2e-paint π is the only catch (no source gate sees it). Fallback: element-level `color-mix` re-declare on the `.glass-toggle` scope.
- **R3 — RESOLVED-to-mechanism.** The inner-stop-SOLID fix is colorimetrically exact (a solid ink ring measures 8–16:1) + real-paint
  confirmed both engines; π #3 measures over the control's OWN solid fill (not a busy field). The library-wide ~1.9–2.1:1 fail is
  the born-RED, the fix the GREEN.
- **R4 — WHCM might not recolor a transparent base outline on every engine.** Chromium-confirmed; the Firefox/WHCM capture is
  owed before any hand-list retirement. Since the hand-list is KEPT this wave, a per-engine miss is NON-BLOCKING (that carrier
  stays on the explicit list).
- **R5 — RESOLVED.** The KISS-to-primary path is FALSIFIED + replaced by the deep-violet floor (relative-color derived, white
  glyph 5.77:1 both engines). The EDIT-1↔EDIT-3 atomicity is the load-bearing constraint; the on-disk born-RED→GREEN artifact is owed.
- **R6 — sequencing.** WS4-W0 must land `proof:de-shadcn` born-GREEN (HEAD-mode acceptance, NOT `--post-fix`) + the stepper teeth
  BEFORE WS10's ci arms; a born-RED ci arm ahead of its clear is the self-inflicted CI break. The shared-cascade-file C2 rebase is
  the merge-conflict risk.
- **R7 — the dropped-BE custom/ residuals.** MetricBadge.vue:108 is a HARD prerequisite (the `--color-ring` consumer — its delete
  silently kills the focus ring); ScrubberTimeline.vue:258-259 is fold-now-recommended. Leaving them silently violates the "ANY
  glass-ui component" directive bar.
