# Hardening challenge — GLASS-ui-components (total glass-cohesion red-team)

**Lane.** Every `src/components/ui/` component under the USER-DECIDED **MAXIMAL glass-first**
hinge (`MASTER-PLAN.md:58` R3 — "everything glass … containers, chrome, buttons, AND content
panels"). Question: which surfaces are glass-default, which still opaque, which INCOHERENT
(divergent glass recipes)? Is there ONE `--glass-level`-driven model?

**HEAD.** `89f235a` (3.8.0 + convergence). **Verdict: INCOHERENT.**

---

## The headline: the glass-first ROOT is UN-BUILT — every glass-default claim is SPEC-only

The pass-3 TOP-precedence ask ("the default for ALL items is their glass variants — fix at the
ROOT", `USER-DEFECTS-2026-06-08-pass3.md:13`) has produced TWO long, detailed spec docs
(`AX.W54-glass-first-class.md`, 713 lines; `AX.W55-adaptive-glass-legibility.md`, 737 lines) and
ZERO source. Falsifiable at HEAD:

```
grep -rn "glass-level"    src/        → NONE   (W54 RED witness 1, the headline scalar)
grep -rn "glass-opaque"   src/        → NONE   (W54 RED witness 4, the opaque rung)
grep -rn "glass-backdrop" src/        → NONE   (W55 RED witness 1, the adaptive probe)
grep -n  "glass-first|glass-level" CLAUDE.md → NONE  (W54 RED witness 6, the canon)
grep -n  "glass-level|adaptive-glass" package.json → NONE  (no proof gate registered)
ls docs/tranches/AX/audit/ | grep -i "W54|W55"  → NONE  (no born-RED audit json)
```

So the entire "glass is the default surface register" decision is at the SPEC stage. There is no
`--glass-level` master scalar, no `.glass-opaque` rung, no `CardTier` `opaque` member, no
adaptive-darken probe, and the canon law is unrecorded. **Every "glass-default" assertion in the
component layer is currently FALSE at the source.** The challenge below maps exactly how far HEAD
is from the MAXIMAL target, component by component — this is the work W54/W55 must do, sized.

---

## glassCohesion verdict — FOUR divergent glass recipes, no ONE model

There is no single `--glass-level`-driven glass model. There are at least **four independent glass
recipes** in the component layer, each with its own blur/opacity/tint contract:

| Recipe | Site | Surface | Blur | Tint axis |
|--------|------|---------|------|-----------|
| **5-rung tier ladder** | `tokens.css:769-775` `--glass-bg-{wash..overlay}` | Card, Dialog, Sheet, Popover, all menu Content surfaces | radius-first `--glass-blur-*` | `color-mix(in srgb, --card …)` (NO oklab tint) |
| **`.btn-glass`** | `glass.css:515-517` | `<Button variant="glass"/"glass-wash">`, SelectTrigger | `--glass-blur-btn` (10px quiet) | inline `--glass-bg-resting` hover |
| **`.input-pill`** | `glass.css:520-543` | Input, Textarea, NumberFieldInput | `--glass-blur-wash` (1px!) + `--glass-bg-quiet` | `--surface-tint-15` border (srgb, off the glass tint seam) |
| **dock flat** | `tokens.css:774` `--glass-bg-dock` | `.glass-dock`, chassis, tiers | `--glass-blur-dock` | FLAT `color-mix(in srgb)`, no oklab tint wrapper (W55 RED witness 2) |

These do NOT share a knob. A consumer who wants "more glass" must hand-edit four families. The
`.input-pill` blur is `blur(1px)` (`--glass-blur-wash`, `tokens.css:692`) — it does NOT actually
read as glass; it is a tinted plate with a 1px frost. The dock background bypasses the oklab tint
seam the five rungs use, so even after W55's adaptive axis the dock would not darken
(`AX.W55:54-66`). **This is exactly the N-divergent-models state W54 was written to collapse, and it
has not been collapsed.**

The keyframes I.W6 finding (19 dock/Button specular tracks bloom where Card is clean) is the SAME
class one level up: the specular layer is wired per-recipe (`.glass-card::before`,
`.dock-icon-button`, `.glass-specular-track`, `.btn-glass`) rather than from one model — so a
specular re-tune has to touch every recipe.

---

## Surface-register census — which components are glass, opaque, or divergent

**Fully OPAQUE ui/ packages (14 of ~40)** — zero glass/backdrop anywhere
(`grep -L "glass|backdrop-filter|btn-glass|input-pill"`):

```
accordion · alert · avatar · collapsible · data-table · label · metric-pill ·
multi-select · radio-group · separator · skeleton · table · tabs · tags-input
```

Of these, the ones that are LEGITIMATELY opaque (no challenge): `avatar`, `label`, `separator`,
`skeleton`, `table`/`data-table` rows (dense data — W54's own opaque-escape case). The ones that
are **MAXIMAL-glass divergences** (a container/chrome surface that should be glass-default but is
solid):

- **`alert/index.ts:12-26`** — every variant is `bg-card` (opaque). An alert is a content panel;
  under MAXIMAL it should be a glass tier rung. ZERO glass path. `grep -c glass → 0`.
- **`badge/index.ts:14-29`** — every variant is a solid fill (`bg-primary`, `bg-secondary`,
  `bg-success`…). No glass variant exists. (Badge is a pill — pills stay rounded per R1, but the
  MAXIMAL "buttons + items EVERYWHERE" ask, `pass-3:13`, names items; a glass badge variant is the
  gap.)
- **`tabs` (ui/) + `custom/tabs` SegmentedTabs** — the FLAGSHIP cohesion miss, below.
- **`tags-input/TagsInput.vue:19`** — `bg-background` solid (a form control; the sibling
  `.input-pill` family is glass — this is an INCONSISTENCY inside the form atoms: Input/Textarea/
  NumberField are glass-tinted, TagsInput is a solid `bg-background`).

**The SegmentedTabs flagship miss (`custom/tabs/SegmentedTabs.vue`).** The AX.W53 headline unified
tab family — the one the CLAUDE.md SegmentedTabs section celebrates — is **fully off the glass
model**:
- `:448` `.segmented-tabs { background: var(--muted-medium); }` — opaque track.
- `:462` `.segmented-indicator { background: var(--background); }` — opaque solid slider.

And `ui/tabs/TabsIndicator.vue:19` is `bg-secondary/80` (opaque). Tabs are navigation chrome — the
exact "chrome default" the two-layer law and the MAXIMAL decision both say is glass. The most
visible interactive surface in the demo is solid.

**Button — the named W54 RED witness.** `button/index.ts:26-27` `default: 'bg-primary …'` +
`:81` `defaultVariants.variant: 'default'`. A bare `<Button>` paints a solid primary slab. Glass IS
shipped (`:61-64` `glass`/`glass-wash` + `.btn-glass`) but OPT-IN. This is W54 RED witness 2,
un-fixed.

**The opaque-fork count.** `DialogContent.vue:82-84` carries `variant: 'glass' | 'opaque'` where
`opaque` resolves its OWN recipe `'bg-background border sm:rounded-dialog'` — a parallel solid path,
NOT a level-0 glass endpoint. W54's own spec (`AX.W54:175-177`) names this as the second fork to
reconcile; it is still forked. SheetContent uses `glass-floating` (good), but `index.ts:22` bakes it
into the variants base with no opaque escape at all — an asymmetry with Dialog.

---

## CHRONIC deferrals (slip history)

1. **glass-first-class — deferred across the ENTIRE tranche, still 0% built.** It is the pass-3 TOP
   precedence item (`pass-3:13`), the MASTER-PLAN "single highest-leverage unaddressed headline"
   (`MASTER-PLAN.md:45`), Batch-1 ROOT. Yet at HEAD it is two spec docs and no source. The
   page-redesign umbrella (Batch 4, Q4/Q7/Q9) is explicitly BLOCKED on it (`MASTER-PLAN.md:29`), so
   this single defer cascades to ~6 downstream waves. The slip is the headline of the tranche.

2. **DialogContent opaque fork — flagged AT LEAST since W54 was authored, never reconciled.** The
   ad-hoc `variant:'opaque'` (`DialogContent.vue:20-21`) predates W54 and is named in W54 scope
   (`AX.W54:293`) as a fork to fold; it persists.

3. **Form-atom surface inconsistency — TagsInput off the `.input-pill` glass family.** Input/
   Textarea/NumberField were moved to the glass-tint `.input-pill` (NumberFieldInput.vue:27 notes
   "was solid bg-background at HEAD" — so the migration HAPPENED for those three) but TagsInput was
   left on `bg-background` (`TagsInput.vue:19`). A clean-break that missed a sibling consumer — the
   recurring "renames/migrations miss a sibling" chronic class, here in the surface migration.

4. **Cardinal-lesson exposure on the Q3 hover.** W54 RED witness 5 (`AX.W54:85-96`) records that
   W52 shipped headless-green with a hover (`--scale-hover-btn: 1.035`) the next live pass (Q3)
   found imperceptible. The re-tune is specced but un-landed — the exact "complete on a gate, not a
   live DELTA" recurrence this tranche keeps re-finding. No `W54-DELTA.md` capture exists.

---

## Falsifiable CHALLENGES that found a weakness

- **C1.** `grep -rn "glass-level" src/` = NONE. The single-knob model that defines "cohesive glass"
  does not exist. SPEC-only. (W54 RED witness 1.)
- **C2.** `button/index.ts:26-27,81` — the default Button is opaque `bg-primary`; glass is opt-in.
  The literal antithesis of "glass FIRST for buttons EVERYWHERE." (W54 RED witness 2.)
- **C3.** `custom/tabs/SegmentedTabs.vue:448,462` — the AX.W53 flagship tab family is
  `background: var(--muted-medium)` / `var(--background)`, both opaque. The most-celebrated
  interactive surface is off the glass model entirely.
- **C4.** `alert/index.ts:12-26` `grep -c glass → 0` — every Alert variant is solid `bg-card`; no
  glass path exists for a content-panel surface.
- **C5.** Four divergent glass recipes (table above) with no shared scalar: 5-rung ladder /
  `.btn-glass` / `.input-pill` (blur 1px!) / dock flat-srgb. "ONE glass model" is false.
- **C6.** `tokens.css:774` `--glass-bg-dock` is a flat `color-mix(in srgb)` with no oklab tint
  wrapper — the dock (the literal G2 unreadable-over-light surface) is OFF the adaptive seam the
  five rungs use; W55's darken cannot reach it as-is. (W55 RED witness 2.)
- **C7.** `DialogContent.vue:82-84` — `variant:'opaque'` is a parallel `bg-background` recipe, not
  a level-0 glass endpoint; SheetContent has no opaque escape at all — asymmetric, forked.
- **C8.** `tags-input/TagsInput.vue:19` is `bg-background` while its form-atom siblings (Input/
  Textarea/NumberField) are the glass `.input-pill` — a surface-migration sibling-miss.
- **C9.** W56 squircle is ONLY on the big-dock (`dock.css:626-639`). The R1 hinge extends squircle
  to dialogs+sheets+panels+hero ("USER-DECIDED", `MASTER-PLAN.md:59`) — `rounded-dialog`
  (`theme.css:47`) is a plain `border-radius`, no `corner-shape`. The glass-default surfaces that
  inherit the squircle vocabulary (W54 KEEP, `AX.W54:224`) have no squircle to inherit on dialogs/
  sheets/panels yet. The two hinges are coupled and both un-landed for these surfaces.

---

## Hardening actions to PERFECT this (planning only)

1. **LAND W54 as the literal first source wave of the next batch — it is 0% built and blocks ~6
   downstream waves.** The spec is complete and correct in shape (the `1-(1-α)*level` algebra,
   `tokens.css:769-775` opacity seam + `:711-728` blur seam are genuinely ONE site each). Drive it
   to source: mint `--glass-level`, thread both ladders, flip the Button default, widen `CardTier`,
   add `.glass-opaque`, collapse the a11y brackets, re-tune Q3, record the canon. Confirm the dark
   override block (`tokens.css:1816+`) re-declares only the opacity RUNGS (not the `--glass-bg-*`
   recipe), so the level thread at `:769-775` cascades correctly into dark — verify byte-identity in
   BOTH modes, not just light.

2. **Amend W54 FileBounds to include the divergent recipes the spec under-scopes.** W54 names
   Button + Card + Dialog but NOT: `custom/tabs/SegmentedTabs.vue:448,462` (the flagship opaque
   tabs), `ui/tabs/TabsIndicator.vue:19`, `alert/index.ts`, `tags-input/TagsInput.vue:19`. Add a
   sub-fold "every chrome/content surface onto the glass tier" or these stay opaque after the ROOT
   lands and the cohesion claim is still false. Without this amendment, W54 collapses Button+Card+
   Dialog and leaves Tabs/Alert/TagsInput as the new divergences.

3. **Add a `proof:glass-cohesion` source gate** that asserts NO ui/ chrome-or-content surface paints
   a solid `bg-{card,background,muted,secondary,primary}` register WITHOUT routing through the glass
   tier or a named `.glass-opaque` escape — a allowlist for the legitimately-opaque atoms (avatar/
   label/separator/skeleton/table). This machine-locks the census above so a future component cannot
   re-introduce a solid chrome surface silently (the same role `proof:tabs-unified` plays for the
   tab family).

4. **Reconcile the four glass recipes onto the ONE `--glass-level` model as W54's explicit scope.**
   `.input-pill` (blur 1px → real glass via the level-scaled wash radius or a quiet-tier re-point —
   it currently does NOT read as glass), `.btn-glass`, the dock flat-srgb bg, and the 5-rung ladder
   must all read `--glass-level` and the same oklab tint seam. This is the "ONE model" the lane
   asks for; W54 as-specced only touches Button+Card+Dialog opacity, not the recipe unification.

5. **Couple W54 + W56(R1) for the dialog/sheet/panel surfaces.** When the glass-default surfaces
   land, the squircle (R1 — `MASTER-PLAN.md:59`) must land on the SAME surfaces (dialog/sheet/panel/
   hero) so the glass-first + squircle hinges arrive together, not as two passes that each re-touch
   `rounded-dialog`/SheetContent. Add a `corner-shape` to `--radius-dialog`/sheet/panel under the
   `@supports (corner-shape: superellipse(2))` guard the big-dock already uses (`dock.css:637`).

6. **Run the W54/W55 live DELTA at ≥2 viewports × light/dark and CAPTURE it** (no
   `docs/tranches/AX/audit/W54-DELTA.md`/`W55-DELTA.md` exists). The Q3 hover-reads-on-hover and the
   dock-over-light-clears-4.5:1 are the exact two cardinal-lesson cases the tranche has re-found
   twice; they close ONLY on a captured paired-π, not a green gate.
