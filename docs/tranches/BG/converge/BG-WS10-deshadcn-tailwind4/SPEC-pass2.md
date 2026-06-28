# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass2

> **PASS 2 is REAL-PAINT CONFIRMATION of the four paper-rulings + the cross-workstream
> sequencing — NOT a re-mechanism.** The state-arm classifier is de-risked (233-file
> zero-false-positive sweep, fixture committed); the BREADTH census + the TOKEN-REPLACE sweep
> are settled in `SPEC-pass1-converged.md`. This pass advances ONLY the unconverged frontier:
> (1) the four rulings carry CONCRETE on-disk corrections the research fleet surfaced this
> session (the toggle var-mint trap, the Select elevation-inversion, the mis-read focus-ring
> fold delta, the forced-colors gestalt-not-patch), each owed a born-RED π; (2) two
> cross-workstream COLLISION rulings (the `--corner-k-*` ownership, the shared-cascade-file
> sequencing); (3) the WS4-W0→WS10 ordering as the FULL-gate-suite acceptance.

**Base: `SPEC-pass1-converged.md` — adopted whole. This pass AMENDS five sections and adds
the two collision rulings. Everything not amended below stands as converged.** Re-verified on
`tranche/BG` HEAD `069db6c4` this session (every file:line below re-read on disk; gates run live).

---

## 0. WHAT PASS-2 CHANGES (the delta, read first)

| # | pass-1-converged said | pass-2 RULES (the on-disk correction) |
|---|---|---|
| R1 | selected toggle → `--glass-bg-floating-tinted` (adaptive register) | **The token is UNREACHABLE from the toggle** — minted ONLY inside `:where(.btn-glass,.segmented-indicator,.glass-capsule)` (surfaces.css:283). RULE the fix mechanism: **ADD the toggle's selected selector to that `:where()` mint list** (surgical), NOT compose `.glass-capsule` (which drags rest-state `backdrop-filter` onto EVERY toggle = Safari per-toggle blur cost + a far larger visual change). COUPLE the glyph re-point in the SAME edit. |
| R2 | grouped-inset Select → `.glass-menu-group` envelope + per-mode fill | **INVERT the elevation tiers** — the prototype FAILED the "3 separated cards" bar because SelectContent AND the group cards both sit at ~floating (0.80/0.88) → no contrast, no ceiling headroom. RECESS SelectContent to a WELL tier; FLOAT the group cards forward. Dark `--menu-group-fill` LIFTS (the prototype darkened — wrong way). Fix the inset geometry (rows overflowed the card edge). |
| R3 | focus-ring fold weakens "solid border + warm halo" → 30% ring | **The current paint is STRONGER than pass-1 read** — `--color-accent` IS defined (`= var(--accent) = --neutral-3`, L82 warm), so today's box-shadow is a SOLID 2px `--neutral-3` ring, NOT the dead 30% fallback. The fold is a LARGER weakening. ≥3:1 WCAG 1.4.11 is a **born-RED π MEASUREMENT**, not an assumption. Native accent decouple takes the **KISS path** (0 new token). |
| R4 | enroll `.input-bar:focus-within` in the forced-colors hand-list | **Adopt the gestalt-not-patch SOTA fix** — a base `outline: 2px solid transparent` on the box-shadow focus recipes (WHCM auto-recolors it → new carriers covered FREE, the hand-list defect retired). The hand-list cannot keep pace (3 more unenrolled carriers found this session). |
| C1 | DELETE `--corner-k-soft/-sharp` + re-anchor `proof:squircle-language` | **COLLISION — RELINQUISH.** WS4's `BG.W-DEAD-TOKEN-SWEEP` (the A-deadcode lane) EXPLICITLY OWNS this; WS3 defers to it. They are house SQUIRCLE tokens, NOT shadcn-named — out of WS10's de-shadcn lane. WS10 does NOT touch `radius.css`/`proof-squircle-language.mjs`. |
| C2 | (unstated) | **Shared-cascade-file sequencing** — WS3-M5 edits `--glass-tint-*`/`--glass-accent` in the SAME three files WS10 renames `--ring`/`--input` in (color-radius/dark-arm/light-dark). Disjoint tokens, merge-conflict risk. Land one, rebase the other. |

Plus one **custom/-scope chronic surfaced for an orchestrator ruling** (the dropped BE.W-DESHADCN-GATE-WIDEN: §0.1).

### 0.1 The dropped-BE custom/ residuals (orchestrator ruling owed)

BE planned `W-DESHADCN-GATE-WIDEN` (widen the census to `custom/` + the `outline-*` vocab + a
`<style>`-body arm). **It never landed.** Two custom/ residuals are LIVE + UNGUARDED, and the
ui/-scoped census is structurally blind to them:

- **`MetricBadge.vue:108`** — `focus-visible:outline-2 outline-ring outline-offset-2` = the cold
  shadcn outline-as-focus AND the **SOLE live consumer of the `--color-ring` bridge** (grep of all
  `src/`). **This is a HARD PREREQUISITE, not a BOOK:** deleting `--color-ring` (§2.3) makes
  `outline-ring` an unknown Tailwind utility → MetricBadge's focus ring silently dies in Chrome AND
  Safari, invisible to the gate (the cardinal trap). **RULE: fold `MetricBadge.vue:108` → the house
  `.focus-ring` utility, in the SAME diff as the `--color-ring` delete** (one class replaces three
  shadcn defaults; it should have composed `.focus-ring` from birth).
- **`ScrubberTimeline.vue:258-259`** — `color: var(--popover-foreground); background: var(--popover)`
  = a flat shadcn-popover slab in a `<style>` body. A 2-line re-point onto a glass register (mirror
  the sibling `ContinuousTimeline.vue:334` which already reads `var(--popover-foreground, var(--foreground))`).
  **RULE: fold it (cheap) OR BOOK it in `FOLD-LEDGER.md` with rationale — do NOT silently leave it.**

To prevent re-entry of the focus-shim family into `custom/`, **add a NARROW whole-`src/` census arm**
(`outline-ring` / `ring-ring` / `ring-offset` over the full tree) — this does NOT re-author the
ui/-scoped 233-file walker (the no-re-author fence holds); it is a thin sibling cross-scope grep that
catches exactly the re-introduction class the fold closes.

---

## 1. GESTALT GOAL (unchanged from pass-1)

Every glass-ui control is 100% glass-ui identity material — warm, weighty, liquid, iOS-27 — with
ZERO default shadcn/tailwind paint surviving on ANY component, reka/shadcn BEHAVIOUR byte-untouched.
Token-first idiomatic Tailwind v4. Gate-asserted census born-RED→GREEN, **real-paint-verified by a
NON-AUTHORING judge in BOTH modes AND Chrome AND Safari** (headless-green is NOT acceptance — the
visually-broken trap shipped 3×).

---

## 2. MECHANISM — the four frontier rulings, concrete

### 2.1 RULING 1 — the selected toggle (the silent-no-op BY CONSTRUCTION)

**The trap (verified):** `--glass-bg-floating-tinted` is declared at EXACTLY ONE scope —
`:where(.btn-glass, .segmented-indicator, .glass-capsule)` (`glass/surfaces.css:283`,
`color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))`).
The toggle base (`toggle/index.ts:40`) composes NONE of those three. A bare
`data-[state=on]:bg-(--glass-bg-floating-tinted)` resolves an **undefined** custom property → the
selected fill silently does not paint. **No source gate catches this** (Toggle is not in
`proof:de-shadcn` CONTROLS; `proof:no-shadcn-default` SPARES `data-[state=on]:bg-accent` via the
`:`-lookbehind fence). This is precisely the e2e silent-no-op the frontier names.

**RULING — the mechanism (between the two candidate fixes):**

1. **ADD the toggle's selected selector to the `surfaces.css:283` `:where()` mint list** — surgical,
   element-level, zero rest-state cost. Do NOT compose `.glass-capsule` onto the toggle base: that
   would bring `backdrop-filter: var(--glass-blur-floating)` to EVERY toggle at rest (glass-capsule.css:67)
   = a per-toggle Safari blur layer + a far larger visual change than "re-point the selected fill."
   The `bg-(--token)` shorthand cannot carry a fallback, so the mint MUST resolve — the `:where()`
   widen is the only honest path.
2. **COUPLE the glyph re-point in the SAME edit:** `data-[state=on]:text-accent-foreground` →
   `data-[state=on]:text-foreground` (matching the already-correct `card` variant at `toggle/index.ts:68`).
   `--accent-foreground` was calibrated for the opaque accent SLAB; over the translucent floating-tinted
   fill the glyph must read the foreground ink + the W55 `contrast-color()` lift to clear legibility in DARK.
3. **hover → the glass-quiet WELL** (`--control-surface-bg-hover` / `--glass-bg-quiet` register), NOT raw
   `bg-muted` (pass-1, unchanged).
4. **NOTE the rest-default subtlety:** `--glass-tint-strength` is `0%` at rest (glass-capsule.css:44,
   ladder.css:31), so `floating-tinted == floating` over a calm/dark backdrop; the adaptive benefit
   engages only over BRIGHT/busy backdrops. The π must capture over a media-rich backdrop, not a flat plate.

**Born-RED π (e2e-paint, not class-string):** open `/forms/toggle`, runtime-assert
`getComputedStyle(selectedToggle).backgroundColor !== 'transparent'` (and resolves the oklab tinted
value, not the raw rung) in DARK, AND the selected glyph clears ≥4.5:1 over the floating fill. The
class-string is invisible to this — vue-tsc + units MISS the no-op.

### 2.2 RULING 1b — the close-button fold (verify the hover well + the geometry)

Fold the 3-way close fork → `cn(buttonVariants({variant:'ghost', size:'icon-sm'}), 'absolute right-… top-…')`
(pass-1, unchanged). Pass-2 adds three CONCRETE verify items:

- **Radius:** `size:'icon-sm'` (`button/index.ts:187`) carries NO radius class → the composed close
  button inherits the CVA **base** radius. CONFIRM the base resolves a semantic alias
  (`rounded-pill`/concentric per the squircle policy), NOT a bare `rounded-md` — else the fold smuggles
  a residual.
- **Hover well visibility (born-RED π):** `ghost` hover = `bg-foreground/8` (8% ink). Over the dialog
  plate `--glass-opacity-dialog` = **0.68 light / 0.76 dark** (`dark-arm.css:239`), an 8%-ink well on a
  68/76%-opaque warm plate is MARGINAL. Paint-verify it is VISIBLE in BOTH modes; if it fails, bump the
  well alpha or compose a stronger hover register (a glass-quiet well), do not ship an invisible affordance.
- **Hit target:** `icon-sm` = `h-(--control-h-xs) w-(--control-h-xs)` is likely sub-44px (WCAG 2.5.5).
  Record the dialog-close geometry exception OR expand the hit area (the affordance changes from
  dim-glyph-brightens → glyph + ink-well + scale-press; the glass specular bloom is inert without a glass
  `::before`, so the ink-bg carries the affordance — that is the recorded behaviour).

### 2.3 RULING 2 — grouped-inset Select (INVERT THE ELEVATION; the prototype is known-wrong in dark)

**The architectural fix (the reference judge's binding finding):** the Pass-1 prototype FAILED the
"3 separated correctly-elevated cards" bar. Root cause on disk: `SelectContent` paints `.glass-floating`
(opacity 0.80 light / 0.88 dark) and the group cards layer over it at ~the same tier → no contrast AND
no ceiling headroom (a nested card cannot elevate above 0.80/0.88 without hitting overlay 0.95).

**RULING — invert the tiers + per-mode lift + fix the geometry:**

1. **RECESS the panel, FLOAT the groups.** Drop `SelectContent` from `glass-floating` to a **WELL tier**
   (`glass-resting` 0.65/0.72 or `glass-quiet`) so the panel reads as the iOS grouped-background well;
   the `.glass-menu-group` cards sit at the **floating tier** so they POP FORWARD off the well. The
   visible inset GUTTER between cards (showing the recessed base) is what makes 3 cards SEPARATE.
2. **`--menu-group-fill` is a per-mode PAIR — dark LIFTS, light darkens** (the W-DARK-MATERIAL elevation
   ladder + `proof:card-tier-alpha` discipline): light card brighter-toward-`--card`; **dark card LIFTS
   toward the warm-ink** (mirror `dark-arm.css:79-80` L16→~L20 "+2 L lifts off page"), NEVER a near-black
   darken. Tune to a measurable oklab **ΔL ≥ ~0.06–0.08** between card and panel-base in BOTH modes.
   The plain per-mode-pair idiom (light tokens/glass.css + dark tokens/dark-arm.css) — **NOT `light-dark()`**
   (the inset-shadow trap; a static fill is fine, but keep the pair idiom for clarity). **NOT a 5th
   backdrop-filter layer** (it would blow the depth-4 nested-backdrop ceiling — a STATIC `color-mix(in oklab)`).
3. **Fix the inset geometry.** The capture showed rows overflowing the card's right edge (~490 vs ~505px).
   The `.glass-menu-group` card must CONTAIN its rows with consistent inset margins; concentric radius
   (card at ~`--radius-control` 20px, rows flush-full-width-inside with hairline separators OR rows at
   card-radius-minus-inset); a clear ~8–12px inter-group GUTTER showing the recessed base; a 1px inner
   top-rim highlight (`--glass-edge-light`/`--glass-material-rim`) — iOS keeps separation legible via the
   rim, not heavy fill (CRITICAL because the uppercase-mono header voice is FORBIDDEN this wave, so the
   backplate+rim carry the ENTIRE iOS signal).
4. **Verify the portal-blur lands.** The portal escapes to `<body>` (route-field stops), so page text was
   reading legibly through the panel. Confirm `--glass-blur-floating` (~13px) actually applies to the
   PORTALLED panel (select.css:146 notes the seam); if the bleed persists, raise the panel's effective
   opacity toward the recessed-but-occluding band.
5. **SelectLabel KEEPS `text-dropdown-secondary` — structural envelope ONLY.** `proof:dropdown-type-scale.mjs:142`
   REQUIRES it + D17 family-parity governs all four family labels. Touch `SelectGroup.vue` ONLY; do NOT
   compose `.glass-menu-section` onto the label (reds the gate, shipped CI-RED once). Pre-warn the gestalt
   judge: the label stays sans-serif (the iOS mono-caption voice is DEFERRED, §6).

**Born-RED π:** open `/forms/select`, NON-AUTHORING judge, **Chrome AND Safari (WebKit), both modes**,
read by `getImageData` (getComputedStyle is color-blind to oklch clamping): 3 distinct correctly-elevated
cards (card ΔL ≥ ~0.06 above panel-base in both modes), rows contained within the card edge, the inter-group
gutter visible. `proof:dropdown-type-scale` STAYS GREEN.

### 2.4 RULING 3 — the focus-ring 3-surface decouple (the mis-read fold + the KISS native path)

**The corrected baseline (verified):** today's `.input-pill:focus-visible` (control-surfaces.css:96-97):

```
border-color: var(--color-accent-opaque, var(--ring));   /* --color-accent-opaque UNDEFINED → solid --ring ink border */
box-shadow: 0 0 0 2px var(--color-accent, color-mix(in srgb, var(--ring) 30%, transparent));
                       /* --color-accent IS DEFINED (= var(--accent) = --neutral-3, L82 warm) → SOLID 2px --neutral-3 ring */
```

So the CURRENT focus = a **solid `--ring` ink border-color + a SOLID 2px `--neutral-3` (L82 pale-warm) ring**.
The `--ring 30%` fallback is **DEAD** (never paints). Pass-1's "serviceable solid border + warm halo →
weakens to 30% ring" **UNDERSTATES the start.** The fold to `box-shadow: var(--focus-ring-shadow)` (= 30%
`--focus-ring-color` ring + 15% glow, border DROPPED, scale-paper.css:83-84) is a **LARGER weakening from a
MORE-visible start.**

**RULING:**

1. **Treat WCAG 1.4.11 (≥3:1) as a born-RED π MEASUREMENT against the REAL current paint** — over the cream
   field (light) AND the L16 dark plate AND a busy/translucent field, both modes + Chrome AND Safari. **If
   the folded 30% ring fails 3:1, RAISE `--focus-ring-width` or the 30% stop BEFORE folding** — do not ship
   a sub-3:1 ring on the "reads better" assumption. The fold is harmonisation, NOT a bug-fix.
2. **The 3-surface decouple (the rename is NOT a sed):**
   - FOCUS register (reads 1–4) → `--ring` renamed to **`--focus-ring-color`** (slots beside
     `--focus-ring-{width,shadow}`; the last shadcn-named token retired, clean break, no alias). After the
     fold + crown/native decouple, `--focus-ring-color` has EXACTLY ONE consumer (`--focus-ring-shadow`) —
     the cleanest possible rename, a single retint knob.
   - configurator crown (#7, `configurator.css:251`, `inset 0 0 0 2px var(--ring)`) → **`--foreground`**.
     **Re-framed as a DARK-MODE DEFECT FIX, not a free simplification:** in dark `--ring` = `hsl(48 10% 70%)`
     = OKLab H~95° yellow-green (the exact hue W-NO-GRAY/W-DARK-INK-WARM condemn), so the dark active-tile
     crown currently paints yellow-green = a live W-NO-GRAY violation. `--foreground` fixes it. Verify with
     `proof:no-gray`.
   - native `accent-color` (#6) — **the KISS path (0 new token):** point dark `--accent-color` → **`--primary`**
     (the on-brand legendre-violet, chroma 0.134) so the dark native checkbox/radio reads on-brand instead of
     `--ring` yellow-green. **Set BOTH arms** — `light-dark.css:125` `light-dark(var(--primary), var(--ring))`
     becomes `light-dark(var(--primary), var(--primary))` = redundant → **DELETE light-dark.css:125** (one
     dual-path retired; `color-radius.css:114` already covers the floor) AND confirm a `.dark` fallback floor
     so plain-`.dark` engines (without `light-dark()`) and light-dark engines AGREE (today they diverge:
     light-dark→`--ring`, plain `.dark`→`--primary`). **Only mint a dedicated `--accent-color-native` IF
     design rejects a violet native checkbox** — evaluate the KISS path first; verify the white
     checkmark/radio-dot glyph keeps its contrast headroom over the violet accent on `/forms/checks` in dark.
   - `--color-ring` bridge (#5) → DELETED (after the MetricBadge fold, §0.1).
3. **The warm-flip is ATOMIC with `proof:no-gray`.** Mint the `warm-hue-dark-focus-ring` witness in the SAME
   commit as the `--focus-ring-color` dark warm-flip (hsl-48 H~95° → hsl-30 family ~H75°), OR BOOK both — the
   rename + fold + crown-decouple + native-decouple + the dead-token deletes are **hue-neutral and land
   regardless.**
4. **DELETE the dead set (one diff, coupled edits):** the phantom `--color-accent-opaque` first-arg
   (control-surfaces.css:96 → reads the focus token directly); `--input` (color-radius.css:96) + `--color-input`
   bridge (bridges.css:82) — `border-input`/`bg-input` are live-ABSENT (prose comments only). Confirm absence
   before deleting.

### 2.5 RULING 4 — forced-colors (the gestalt-not-patch fix)

**The structural defect:** the forced-colors Highlight block (`a11y-overrides.css:78-91`) is a HAND-LIST of
`:focus-visible` carriers. WHCM strips `box-shadow` → any box-shadow focus carrier NOT in the list ships
keyboard-INVISIBLE. This session confirmed **FOUR unenrolled carriers**: `.input-bar:focus-within`
(components.css:241 + the dock-search copy dock/search.css:42), `.metric-badge:focus-visible`
(components.css:77), `.glass-card.is-focus-within` (a11y-fallback.css:241), + the WS4-to-author
combobox/tags-input `:focus-within` rings. The hand-list CANNOT keep pace — a structural defect.

**RULING — adopt the SOTA transparent-outline-on-base technique (gestalt-not-patch, no-legacy clean break):**
add a base `outline: 2px solid transparent; outline-offset: 2px` to the box-shadow focus RECIPE (`.focus-ring`
+ every `:focus-within` carrier). WHCM auto-recolors a transparent outline to the system text/Highlight color,
so **NO `@media (forced-colors)` enrollment list is needed and new carriers are covered for free.** The
existing hand-list block is RETIRED once the census + a real forced-colors capture go green (clean break).

- **Born-RED census arm** (extend `proof:no-shadcn-default` in place — the no-new-id fence): scan every
  `box-shadow: var(--focus-ring-shadow)` carrier (8 files at HEAD) and assert each has the base
  transparent-outline OR appears in the forced-colors set. Born-RED on the four confirmed-missing carriers.
- **Born-RED π:** a `@media (forced-colors:active)` capture (Chrome `emulate-forced-colors`) asserts a
  non-`none` outline on `.input-bar:focus-within` (+ each carrier).
- **MITIGATION fence:** the transparent-outline migration MUST be verified by a real forced-colors capture
  (WHCM recolouring a transparent outline is the documented behaviour, but engine-confirm it) BEFORE the
  hand-list is retired — if a capture shows a carrier still invisible, that carrier joins the set explicitly.

---

## 3. CROSS-WORKSTREAM COLLISION RULINGS (pass-2 new)

- **C1 — `--corner-k-soft`/`-sharp` + `proof:squircle-language` re-anchor: RELINQUISHED to WS4.** The
  A-deadcode lane `BG.W-DEAD-TOKEN-SWEEP` (owned in `BG-WS4`, which TIGHTENED the cut-list and pins the gate
  re-anchor) EXPLICITLY OWNS this; WS3 defers to it ("do NOT overlap"). They are house SQUIRCLE tokens, NOT
  shadcn-named — outside WS10's de-shadcn lane. **WS10 REMOVES `theme/radius.css` and
  `scripts/proof-squircle-language.mjs` from FILES TOUCHED** and does not delete/re-anchor them. (`proof:squircle-language`
  still runs in WS10's acceptance suite as a no-regression check — it must stay GREEN.)
- **C2 — shared-cascade-file sequencing (WS3-M5 ↔ WS10).** WS3-M5 (glass-tint-unify) edits `--glass-tint-*`/
  `--glass-accent` in `color-radius.css` / `dark-arm.css` / `light-dark.css`; WS10 renames `--ring`/`--input`
  + deletes in the SAME three files. The tokens are DISJOINT (no semantic collision) but the line-edits risk a
  merge conflict. **Land one then rebase the other** — record the file-overlap; WS10's edits are line-disjoint
  from M5's. (Orchestrator picks the order; recommend WS10 after M5 since M5 is the larger structural edit.)

---

## 4. FILES TOUCHED (delta from pass-1)

**REMOVED from pass-1's FILES TOUCHED (collision C1):**
- ~~`src/styles/theme/radius.css`~~ (WS4's dead-token lane)
- ~~`scripts/proof-squircle-language.mjs`~~ (WS4's gate re-anchor)

**ADDED / amended:**
- `src/styles/glass/surfaces.css` — ADD the toggle's selected selector to the `:where()` `--glass-bg-floating-tinted`
  mint list (§2.1).
- `src/components/custom/metric-badge/MetricBadge.vue:108` — fold `outline-ring` → `.focus-ring` (§0.1, coupled
  to the `--color-ring` delete).
- `src/components/custom/timeline/ScrubberTimeline.vue:258-259` — fold `var(--popover)` slab → glass register
  (cheap) OR BOOK (§0.1).
- `src/styles/utilities/a11y-overrides.css` / the box-shadow focus recipes — base transparent-outline (§2.5);
  retire the hand-list once the census is green.
- `src/styles/tokens/light-dark.css:125` — DELETE the redundant `light-dark(var(--primary), var(--ring))` native
  accent arm (KISS path, §2.4); ensure a `.dark` floor agrees.
- `scripts/proof-no-shadcn-default.mjs` — + the forced-colors-enrollment census arm + the narrow whole-`src/`
  focus-shim arm (§2.5, §0.1) on top of the pass-1 deep-vocab + state-arm arms.

Everything else in pass-1's §3 FILES TOUCHED stands.

---

## 5. WAVE BREAKDOWN (the pass-1 five waves, amended)

> **Precondition W0 (WS4, unchanged):** `BG.W-DESHADCN-SWEEP` lands `proof:de-shadcn` REGISTER (gates.mjs +
> package.json + ci, atomic born-GREEN) + the 9 FORM clears + the **stepper teeth + the opacity-utility
> denylist arm** (the untracked dev gate is the EARLIER design — only `NumberFieldInput`, no steppers, no
> `opacity-utility` arm, so `NumberFieldIncrement/Decrement.vue:25 disabled:opacity-20` SLIP it; W0 must add
> them and reconcile the 7-vs-9 count to the SPEC-pass4 **9-violation** enumeration) + the
> `--opacity-disabled-strong:0.2` / `--icon-decoration-opacity` mints + the forced-colors clear. **Acceptance
> runs BARE `node scripts/proof-de-shadcn.mjs` (HEAD mode), NOT `--post-fix`** — the sim's verbatim string
> anchors (ComboboxInput.vue:34 / TagsInput.vue:33) can drift from WS4's real edit. **WS10 sequences strictly
> AFTER W0.**

- **`BG.W-DESHADCN-CENSUS`** — EXTEND `proof:no-shadcn-default` (deep-vocab + the validated state-arm classifier
  + the forced-colors-enrollment arm + the narrow whole-`src/` focus-shim arm). No new gate id. Born-RED on the
  HEAD residuals; ATOMIC born-GREEN AFTER W0.
- **`BG.W-DESHADCN-TOKEN-REPLACE`** — the §2.1–2.4 rulings: toggle (`:where()` mint widen + glyph re-point + hover
  well), close-button + ToastAction `buttonVariants` folds, the focus-ring fold + 3-surface decouple + the KISS
  native path + the dead-token deletes + the MetricBadge/ScrubberTimeline custom/ folds + the base
  transparent-outline. The `--corner-k-*` delete is **NOT here** (C1). Clean break, no alias.
- **`BG.W-TAILWIND4-IDIOM`** — SMALL: the `--text-control`/`-sm` bridges + `@utility glass-blur-*`; extend
  `proof:tailwind-v4-idiom` completeness. (Unchanged from pass-1.)
- **`BG.W-DESHADCN-MATERIAL`** — the grouped-inset Select elevation-INVERSION (§2.3): recess SelectContent,
  float the groups, per-mode lifting `--menu-group-fill`, fix the inset geometry, the rim, the portal-blur.
  SelectLabel keeps `text-dropdown-secondary`. Deepen Switch material/motion (READ tokens, never re-mint).
- **`BG.W-DESHADCN-GATE`** — the lock + the binding π (six-state matrix, both modes + Chrome AND Safari +
  forced-colors outline arm, non-authoring judge) + the forms/controls gestalt roster row + the CLAUDE.md
  de-shadcn CANON fold. The FULL affected-gate suite (NOT vue-tsc+build) is the close acceptance.

---

## 6. ACCEPTANCE / REAL-PAINT-π BAR (the four born-RED π, explicit)

The acceptance is the FULL affected-gate suite — `proof:no-shadcn-default` (extended), `proof:de-shadcn` (WS4,
HEAD mode), `proof:dropdown-type-scale` (STAYS GREEN — SelectLabel keeps `text-dropdown-secondary`),
`proof:no-gray`, `proof:glass-cohesion`, `proof:no-layout-animation`, `proof:menu-glass`, `proof:control-tokens`,
`proof:squircle-language` (no-regression), `proof:tailwind-v4-idiom`, `proof:webkit-backdrop`,
`proof:nested-backdrop-budget` — run via `node scripts/gates.mjs --run <tags>`, **NOT** `vue-tsc + build` (the
cardinal build-green/gate-red lesson). PLUS the four born-RED π, each by a NON-AUTHORING judge in BOTH modes AND
Chrome AND Safari, read by `getImageData`:

1. **Toggle selected (DARK, e2e-paint):** `data-[state=on]` resolves a non-transparent oklab tinted fill at
   runtime (NOT the raw rung, NOT transparent) AND the glyph clears ≥4.5:1.
2. **Grouped-inset Select:** 3 SEPARATED correctly-elevated cards (card ΔL ≥ ~0.06 above the recessed panel-base,
   dark LIFTS), rows contained in the card edge, gutter visible. `proof:dropdown-type-scale` GREEN.
3. **Focus ring (folded):** ≥3:1 WCAG 1.4.11 over cream + L16 dark + a busy field, both modes — MEASURED against
   the real current solid-`--neutral-3`-ring baseline; if <3:1, the fold is RE-TUNED (width/stop up) before ship.
   The `proof:ba-gestalt` verdict covers the input ring AND the dark native checkbox/radio glyph AND the dark
   configurator crown (all three surfaces of the decouple).
4. **Forced-colors:** `@media (forced-colors:active)` → non-`none` outline on `.input-bar:focus-within` + every
   box-shadow focus carrier (the transparent-outline-on-base recolouring confirmed by a real WHCM capture).

PLUS: close-hover well VISIBLE over the 0.68/0.76 dialog plate (§2.2); the forms/controls gestalt-roster row +
per-surface VERDICT recorded; the demo launched + dist rebuilt (no dev server is up at HEAD — real-paint needs it).

---

## 7. FOLDED / DEFERRED (delta from pass-1)

- **`--corner-k-*` delete + squircle re-anchor → WS4's `BG.W-DEAD-TOKEN-SWEEP`** (C1). Out of WS10.
- **The mono-caption section voice for the picker family** — DEFERRED (a lockstep register change across all
  four family labels + a sized re-point of `proof:dropdown-type-scale`). This wave keeps the governed
  `text-dropdown-secondary` rung; the iOS inset-grouped LOOK is the structural envelope + rim ONLY.
- **`.glass-menu-group` extension to other label-bearing families** (DropdownMenuGroup/ContextMenuGroup) —
  THIS-WAVE-or-BOOK is the orchestrator's call; the label-bearing-group ⇒ inset rule is RECORDED either way.
- **`ScrubberTimeline.vue:258-259`** — fold-now (cheap, recommended) OR BOOK in `FOLD-LEDGER.md` (§0.1).
- **The native `--accent-color-native` dedicated token** — only minted IF design rejects the violet native
  checkbox (the KISS path tries `--primary` both-arms first).
- **The dark `--focus-ring-color` warm-hue flip** — ATOMIC-with-`proof:no-gray` or BOOKED (the rename/fold/
  decouple/deletes are hue-neutral and land regardless).
- **The non-form per-control STATE-COVERAGE archetype matrix** — BOOKED (pass-1; the vocab + state-arm census
  already satisfies "no default leak on ANY component").

---

## 8. OPEN RISKS (the falsifiers — what would break the spec)

- **R1 (highest build-risk) — the toggle `:where()` mint widen might not resolve at the toggle element.**
  If adding the toggle selected selector to the `surfaces.css:283` `:where()` list still leaves
  `--glass-bg-floating-tinted` undefined on the toggle (cascade/scope), the selected fill is invisible and the
  mechanism is FALSIFIED → fall back to an element-level re-declare of the `color-mix` on the toggle scope. The
  e2e-paint π is the only catch (no source gate sees it). **PROTOTYPE: implement.**
- **R2 — the grouped-Select elevation inversion might still not separate by a non-authoring judge in dark.** The
  prototype already FAILED once (darkened the wrong way + rows overflowed). If recess+float+lift+rim STILL does
  not read 3 separated cards in WebKit dark, the backplate-only signal is insufficient and the spec must escalate
  to the DEFERRED mono-caption header (the stronger iOS signal, a lockstep gate re-point). **PROTOTYPE: implement.**
- **R3 — the folded focus ring might fail WCAG 1.4.11 (3:1).** The fold weakens a SOLID 2px `--neutral-3` ring to
  a 30% ring; over a busy/translucent field it may not clear 3:1, which would BLOCK the fold or force a width/stop
  bump. The π MEASURES the real paint, not the narrative. **PROTOTYPE: implement.**
- **R4 — WHCM might not recolor a transparent base outline on every engine.** The transparent-outline-on-base is
  the documented SOTA, but if a forced-colors capture shows a carrier still invisible, the gestalt-not-patch
  mechanism is partially FALSIFIED → that carrier rejoins the explicit set. **PROTOTYPE: implement.**
- **R5 — the KISS native-accent path (violet checkbox) might fail the dark glyph contrast budget.** If the white
  checkmark/radio-dot over `--primary` violet does not clear its headroom in dark, the KISS path is FALSIFIED →
  mint the dedicated `--accent-color-native`. **PROTOTYPE: spec (a contrast calc + the 2-arm edit).**
- **R6 — sequencing.** WS4-W0 must land `proof:de-shadcn` born-GREEN (HEAD-mode acceptance, not `--post-fix`) +
  the stepper teeth BEFORE WS10's ci arms; a born-RED ci arm ahead of its clear is the self-inflicted CI break.
  The shared-cascade-file C2 rebase is the merge-conflict risk.
- **R7 — the dropped-BE custom/ residuals.** MetricBadge.vue:108 is a HARD prerequisite (the `--color-ring`
  consumer); ScrubberTimeline.vue:258-259 is fold-or-BOOK. Leaving them silently violates the "ANY glass-ui
  component" directive bar.
