# Hardening challenge — GLASS-overlays (the overlay-family glass-cohesion red-team)

**Lane** GLASS-overlays · **Target** the overlay family — Dialog / Sheet / Popover / DropdownMenu /
ContextMenu / HoverCard / Tooltip / Toast / Drawer / Command + the modal scrims (`ModalOverlay`,
`DrawerOverlay`) · **HEAD** ~89edffc (3.8.0 + convergence W44-W61) · **Verdict** WEAK

The question the lane must answer: do the overlays share ONE glass-overlay model + ONE scrim, and does the
USER-DECIDED squircle (dialogs/sheets/panels per MASTER-PLAN R1) actually reach them? Answer: the SURFACE
tier is cohesive (every overlay rides `.glass-floating` — a genuine win), but the SCRIM, the RADIUS, the
BORDER, the SPECULAR, and the SQUIRCLE are each divergent or absent. Five falsifiable cohesion breaks below,
each source-grounded.

---

## What is COHESIVE (give credit where the spine holds)

- **ONE surface tier.** Every portaled overlay composes `.glass-floating`: `DialogContent.vue:85`,
  `sheet/index.ts:22`, `PopoverContent.vue:45,60`, `DropdownMenuContent.vue:37`, `ContextMenuContent.vue` (the
  `z-popover … glass-floating` string), `HoverCardContent.vue:33`, `TooltipContent.vue:27`, `Toast.vue:55`,
  `Command.vue:30`, plus `ComboboxList`/`SelectContent`. Thirteen surfaces, ONE rung. That IS the glass-first
  default working for the overlay band. The Toast comment (`Toast.vue:52-54`) and the Command comment
  (`Command.vue:25-26`) explicitly record the convergence onto the shared `glass-floating` substrate, retiring
  the flat `bg-popover`/`bg-background` literals. Real, recorded cohesion.
- **ONE scrim PRIMITIVE for the modals.** `ModalOverlay.vue` is the canonical scrim wrapper for Dialog / Sheet
  / DialogScrollContent; it parameterises `scrim` (glass/clear/dim → `--overlay-scrim{,-subtle,-strong}`),
  `animate`, `layout`, and the portaled `--scrim-animation` bridge. Dialog + Sheet both consume it with
  `scrim="glass"`. Good.

That is the floor the rest of the lane fails to reach.

---

## CHALLENGE 1 (BREAKS) — the SCRIM is forked: Drawer hard-codes `bg-overlay-scrim-strong`, bypassing `ModalOverlay` entirely; the "one scrim" is two

`DrawerOverlay.vue:17` hand-rolls its scrim inline:
`cn('fixed inset-0 z-overlay bg-overlay-scrim-strong [backdrop-filter:var(--glass-blur-wash)]', props.class)`
— it does NOT compose `ModalOverlay`, and it hard-pins the STRONG scrim (`--overlay-scrim-strong`, 80% α) while
Dialog/Sheet use the default GLASS scrim (`--overlay-scrim`, 50% α). So the same library ships two scrim
intensities for the same modal-dim job with no shared knob: a Dialog dims the page at 50%, a Drawer at 80%,
and the divergence is invisible until you put them side by side.

`ModalOverlay`'s own header (`:33-36`) acknowledges Drawer is "carved per A5 §4.4 — its transform-driven motion
conflicts with `.sheet-animate`'s data-state animation, and the vaul-vue overlay is a different reka-ui
primitive entirely." That justifies Drawer NOT using `ModalOverlay`'s `animate="fade"` leg — it does NOT
justify Drawer forking the scrim COLOUR + blur away from the canonical `glass` intensity. The animation carve
is legitimate; the scrim-intensity divergence is drift riding on the back of it. The MAXIMAL glass-first
intent (W54) wants ONE glass-overlay model; the scrim is the literal thing that should be most cohesive (it is
the shared backdrop behind every modal) and it is the thing that is forked.

**Falsifiable:** `grep -n "overlay-scrim" src/components/ui/drawer/DrawerOverlay.vue` →
`bg-overlay-scrim-strong`; `grep "scrim=" src/components/ui/dialog/DialogContent.vue
src/components/ui/sheet/SheetContent.vue` → `scrim="glass"`. Two intensities, one job. Hardening: a `scrim`
intensity prop on `ModalOverlay` already exists (`glass|clear|dim`) — Drawer should either consume
`ModalOverlay scrim="dim"` (if `dim`=its intent) or the library should RATIFY whether a Drawer's heavier dim
is a deliberate per-surface choice (record it) or drift (collapse it to `glass`). Right now it is unrecorded.

## CHALLENGE 2 (BREAKS) — DialogScrollContent diverges from EVERY sibling: it paints `bg-background` (solid), NOT `glass-floating`, with a `--glass-shadow-floating` literal bolted on

`DialogScrollContent.vue:41` is the one overlay surface still on the OLD flat recipe:
`'popover-content relative z-overlay grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 [box-shadow:var(--glass-shadow-floating)] duration-200 sm:rounded-dialog md:w-full'`.
Note: `bg-background` (an OPAQUE solid), a hand-pasted `[box-shadow:var(--glass-shadow-floating)]` arbitrary
value, and `popover-content` (which sets `--radius-panel`, NOT `--radius-dialog` — see Challenge 3). Its
sibling `DialogContent.vue:85` is `glass-floating rounded-dialog`. So the SCROLLABLE dialog is a solid card
with a glass shadow stapled on, while the standard dialog is real glass. Same component family, two materials.

This is exactly the class W54 (glass-first ROOT) exists to kill — "glass is the DEFAULT for EVERY surface" —
and the convergence already did the cleanup for Toast (`Toast.vue:52-54` retired `bg-background`) and Command
(`Command.vue:25-26` retired `bg-popover`). DialogScrollContent was MISSED in that sweep. It is grep-provable:
`grep -rln "bg-background\|bg-popover" src/components/ui/{dialog,sheet,popover,dropdown-menu,context-menu,
hover-card,tooltip,toast,command}/*.vue` → only `DialogScrollContent.vue` (and DialogContent's `opaque`
variant escape, which is intentional). DialogScrollContent has no opaque/glass variant prop — it is
unconditionally solid, so a consumer cannot even opt it back to glass.

**Hardening:** fold DialogScrollContent onto `glass-floating` + `rounded-dialog` like its sibling (and give it
the same `variant: 'glass'|'opaque'` prop DialogContent has, reconciled onto the W54 `--glass-level:0` opaque
path per the W54 FileBounds). The `[box-shadow:var(--glass-shadow-floating)]` arbitrary literal then drops —
`glass-floating` already paints that shadow via its box-shadow recipe.

## CHALLENGE 3 (WEAK) — the overlay RADIUS is a three-way split with a wrong-token bug: dialog=`rounded-dialog` (2xl), most=`rounded-panel` (xl), tooltip=`rounded-tooltip` (lg), and DialogScrollContent's `popover-content` forces `--radius-panel` UNDER its `sm:rounded-dialog`

`.glass-floating` sets NO `border-radius` (confirmed — `grep "border-radius" glass.css` shows no floating
rung; only `.glass-card` carries `--radius-card`). So each overlay must bring its own rounding class, and they
diverge:

| Surface | Radius source | Resolves to |
|---|---|---|
| DialogContent | `rounded-dialog` | `--radius-2xl` |
| Sheet | (none — edge-pinned, square by side) | n/a |
| PopoverContent | `.popover-content` utility (`utilities.css:102` `border-radius: var(--radius-panel)`) | `--radius-xl` |
| DropdownMenu / ContextMenu / HoverCard / Command / Toast | `rounded-panel` | `--radius-xl` |
| TooltipContent | `rounded-tooltip` | `--radius-lg` |
| DialogScrollContent | `popover-content` (→ `--radius-panel`) **AND** `sm:rounded-dialog` | **CONFLICT** |

The DialogScrollContent line is the bug: `.popover-content` sets `border-radius: var(--radius-panel)`
unconditionally (specificity 0,1,0 from the class) and the template ALSO lists `sm:rounded-dialog`. At ≥sm the
two compete; the utility `rounded-dialog` and the `.popover-content` rule tie on specificity, so the winner is
emit-order-dependent — the exact `@layer`/source-order fragility the codebase has been burned by before
(`glass-progress-rail`'s `&&` doubled-class fix at `glass.css:674`, the `h-4` rail clobber documented at
`glass.css:651-658`). The scroll-dialog's corner is non-deterministic across the sm breakpoint.

This is WEAK rather than BROKEN because the values are close (16 vs 24 px) — but it is precisely the kind of
"N divergent glass models" the MAXIMAL glass-first cohesion target forbids. There is no recorded POLICY for
which overlay gets which radius; the three values are historical accretion (panel for menus, dialog for
dialogs, tooltip for tooltips), not a derived ladder. The hardening is to RATIFY a 2-rung overlay-radius
policy (e.g. modal-class = `--radius-dialog`, menu/popover-class = `--radius-panel`, tooltip its own) and
record it in CLAUDE.md alongside the glass-first canon, and to fix DialogScrollContent's double-radius.

## CHALLENGE 4 (BROKEN for the user-decided scope) — the SQUIRCLE never reached dialogs/sheets/panels; W56 is marked `live-verified (DEVELOPED)` but the W56b user-ratified extension is UN-LANDED — a status-inflation chronic

MASTER-PLAN R1 records **USER-DECIDED: extend the iOS superellipse to dialogs + sheets + panels + glass hero
cards + where befitting** (`MASTER-PLAN.md:59`). The W56 wave doc carries this as the explicit **⊕W56b amend**
(`AX.W56-squircle-design-language.md:1,17-18,155-160`, and its own RED witness 6 at `:177-178`: *"the panel
alias is `round` — the policy is now WRONG for panels"*). Yet the LANDED `theme.css` still reads:

```
theme.css:92  --corner-shape-card:    round;
theme.css:93  --corner-shape-pill:    round;
theme.css:94  --corner-shape-panel:   round;     ← W56b says this should be superellipse
theme.css:95  --corner-shape-bigdock: superellipse(var(--corner-k-squircle));
```

and `grep "corner-shape-dialog\|corner-shape-sheet\|corner-shape-overlay" src/` returns ZERO — the
dialog/sheet/overlay squircle aliases the user decided on **do not exist**. The ONLY squircle surfaces that
shipped are `bigdock` and the slider `thumb` (`theme.css:100`). No overlay carries `corner-shape` at all.

So the overlay family is entirely `border-radius`-round — the W56 BASE policy (cards/pills/panels round,
bigdock squircle) is what landed, and the W56b user-ratified EXTENSION (dialogs/sheets/panels → squircle) did
NOT. Meanwhile PROGRESS.md:74 marks W56 `live-verified (DEVELOPED)`. The wave is marked done; the user's
actual decision is unlanded. This is the **status-inflation chronic** the cardinal lesson names — a "verified"
mark over an incomplete scope. The slip history: the squircle has been re-scoped across AW.W23 (squircle on
cards, REVERTED as imperceptible) → AX.W56 base (bigdock only) → R1 user-decision (extend to the large-radius
glass family) → W56b amend authored → **never executed**, yet W56 shows verified.

**Hardening (a wave to land):** the W56b extension is a clean token add — mint `--corner-shape-dialog`,
`--corner-shape-sheet` (and flip `--corner-shape-panel` to `superellipse(var(--corner-k-squircle))` per W56b
RED-witness-6), then wire DialogContent/SheetContent/the panel surfaces to read them under the existing
`@supports (corner-shape: superellipse(2))` gate over the `--radius-*` round fallback. The superellipse READS
at the dialog's 24px radius (it does not at a 16px card — that is why cards stay round). This is squarely
inside the W56 FileBounds; it was authored and dropped. Re-open W56 (or carry W56b as a discrete fold) and
DROP the `live-verified` mark until the user-decided scope actually paints. The live audit must capture a
dialog corner at ≥640px showing the superellipse curve, light + dark, Chrome 139+.

## CHALLENGE 5 (INCOHERENT) — the specular has TWO competing default-discipline models on the SAME glass surfaces; the I.W6 "19 tracks bloom" fix as framed will NOT fully clean the overlays

The keyframes I.W6 finding (`coordination/from-keyframes-IW6-dock-button-specular.md`) is: Card was made
specular-default-OFF (`Card.vue:137-143` wire-or-omit `glass-specular-track`; rest-intensity 0) but dock
controls + glass `<Button>` still attach `glass-specular-track` by default, so 19 tracks bloom. The disposition
folds it into W54. Correct as far as it goes — but it conflates TWO independent specular mechanisms, and the
overlays expose the gap:

1. **The `glass-specular-track` OPT-IN pseudo** — the moving catch-light Card wires-or-omits. This is the one
   I.W6 names.
2. **The tier-class `::before` catch-light that fires on EVERY `.glass-*` surface unconditionally** —
   `glass.css:80-88` lists `.glass-floating::before` (and every rung) in the specular `::before` group, and
   `glass.css:172-193` lifts `--specular-intensity` to `0.1` on `:hover` / `0.16` on `:active` for
   `.glass-floating:hover::before` etc. So **every overlay that composes `.glass-floating` already blooms a
   hover specular**, with or without `glass-specular-track`. Popover, Dropdown, ContextMenu, HoverCard, Tooltip
   are all HOVER-driven surfaces — they trip `.glass-floating:hover::before` on every pointer pass.

The consequence: `glass-specular-track` is REDUNDANT on any surface that already composes a `.glass-*` tier
class (the tier class is itself in the `::before` selector group). The I.W6 fix ("make Button/dock
specular-track default-off like Card") will clean the dock/Button *track* but will NOT stop the
`.glass-floating:hover::before` bloom on the overlays, because that fires off the TIER class, not the track
class. So after I.W6/W54 lands as framed, a Popover/Dropdown will STILL bloom a hover catch-light from the
tier `::before`, while a Card (which also composes a tier `::before`) will too — meaning the "Card is clean"
baseline the keyframes agent observed is only clean because Cards are rarely hovered as a whole surface, not
because the `::before` is disabled on them.

**This is the ONE-model gap:** there are two specular sources (the opt-in track + the always-on tier
`::before`) that nobody has reconciled into ONE discipline. The W54 spec says "every glass surface shares ONE
rest-specular discipline: default-off / the bounded edge-gleam, hover reads on HOVER" (coordination doc :22-23)
— but at HEAD the rest-discipline (intensity 0) is shared while the HOVER-discipline is NOT consciously
designed per surface: a modal Dialog (rarely whole-hovered) and a Dropdown (hovered constantly) get the same
`0.1` hover bloom whether or not that reads as intentional. The hardening is to decide, per the glass-first
cohesion, whether the tier `::before` hover-gleam should fire on the menu/popover overlays at all (a menu item
gets its own hover highlight from `menuItemVariants`; the whole-surface gleam on top may be the muddy
double-light W52 was fighting) — and to make `glass-specular-track` either the SOLE specular path (drop the
tier `::before` hover lift) or formally the tier-default (drop the opt-in track). Two paths = N models.

---

## CHRONIC (slip history)

- **Squircle scope re-decided, never landed (Challenge 4).** AW.W23 squircle-on-cards (reverted) → AX.W56 base
  (bigdock only) → R1 USER-DECIDED extend to dialogs/sheets/panels → W56b amend authored in the wave doc →
  **unexecuted**, while W56 carries `live-verified (DEVELOPED)` (PROGRESS.md:74). A user decision marked done
  without landing — the status-inflation chronic the MASTER-PLAN headline names ("PROGRESS↔JSON status
  inflation").
- **The glass-first sweep MISSES DialogScrollContent (Challenge 2).** The convergence cleaned Toast
  (`bg-background`→glass) and Command (`bg-popover`→glass) onto the shared substrate but left
  `DialogScrollContent` on `bg-background` + a stapled `--glass-shadow-floating` literal. The
  "every-overlay-on-glass-floating" claim is repeated in component comments (Toast/Command) yet one dialog
  sibling was never folded — the clean-break-misses-a-sibling chronic.
- **Scrim divergence rides on a legitimate animation carve (Challenge 1).** Drawer's justified
  animation-carve from `ModalOverlay` (vaul-vue transform vs `.sheet-animate`) became cover for an unrecorded
  scrim-intensity fork (`-strong` vs `glass`). A real carve that smuggled a cosmetic divergence — recurs
  whenever a "this primitive is special" carve is granted without bounding WHAT is special.

---

## Glass-cohesion verdict (MAXIMAL glass-first)

The overlay family conforms on ONE axis (the `.glass-floating` tier — a genuine glass-first win, 13 surfaces
one rung) and DIVERGES on four:

- **SCRIM** — forked: Dialog/Sheet `glass` (50%) vs Drawer hard-coded `strong` (80%), bypassing `ModalOverlay`.
- **MATERIAL** — DialogScrollContent is solid `bg-background`, not glass; the lone un-swept sibling.
- **RADIUS** — three-way split (dialog 24 / panel 16 / tooltip 12) with no recorded policy + a
  non-deterministic double-radius on DialogScrollContent.
- **SQUIRCLE** — the user-decided dialogs/sheets/panels superellipse NEVER landed; the overlays are all
  `border-radius`-round; W56 marked verified over the unlanded scope.
- **SPECULAR** — TWO discipline models (opt-in `glass-specular-track` + always-on tier `::before` hover-gleam);
  the I.W6 fix as framed cleans only one, leaving the menu/popover overlays still blooming off the tier class.

**The ONE-model gap:** there is no single "glass-overlay surface" recipe. Each overlay re-assembles
tier+radius+border+scrim+specular from loose parts, so cohesion is emergent (and partial), not structural. A
perfected overlay band would have ONE recipe — `glass-overlay-surface` = `.glass-floating` + the ratified
overlay radius + the W56b squircle + ONE specular discipline + ONE scrim primitive — that every portaled
content composes, with the modal-vs-popover-vs-tooltip differences expressed as PROPS on that one recipe, not
as divergent hand-assembled class strings. That recipe does not exist; the surfaces only LOOK cohesive because
they happen to share the `.glass-floating` token today.

---

## Hardening actions (PLANNING — no code)

1. **Land the W56b squircle extension (re-open W56, drop its `live-verified` mark).** Mint
   `--corner-shape-dialog`/`--corner-shape-sheet`, flip `--corner-shape-panel` → `superellipse(--corner-k-
   squircle)` per W56b RED-witness-6; wire DialogContent/SheetContent/panel surfaces under the existing
   `@supports (corner-shape: superellipse(2))` gate over the `--radius-*` round fallback. Live-capture a dialog
   corner at ≥640px, Chrome 139+, light+dark — the cardinal-lesson DELTA the current `verified` mark lacks.
2. **Fold DialogScrollContent onto the glass-overlay spine (W54/W60 scope).** `bg-background` → `glass-floating
   rounded-dialog`; drop the `[box-shadow:var(--glass-shadow-floating)]` literal (the tier paints it); give it
   the `variant:'glass'|'opaque'` prop reconciled onto the W54 `--glass-level:0` opaque path; fix the
   double-radius (`popover-content` `--radius-panel` vs `sm:rounded-dialog`).
3. **Collapse the scrim onto ONE primitive (amend W54 or a small overlay-cohesion fold).** Either route Drawer
   through `ModalOverlay scrim="dim"` (keeping its vaul animation carve) or RATIFY + record that a Drawer dims
   heavier by design; kill the inline `bg-overlay-scrim-strong` in `DrawerOverlay.vue`.
4. **RATIFY + record the overlay-radius policy** (2 rungs: modal-class `--radius-dialog`, menu/popover-class
   `--radius-panel`, tooltip its own) in CLAUDE.md alongside the glass-first canon — so the three values are a
   derived ladder, not accretion.
5. **Reconcile the TWO specular models into ONE (extend the I.W6/W54 fold).** Decide whether the tier-class
   `.glass-floating:hover::before` gleam should fire on the menu/popover overlays at all (it double-lights over
   `menuItemVariants` item hover); make `glass-specular-track` either the SOLE specular path or the tier
   default — not both. The I.W6 "19 tracks" fix must be re-scoped to cover the tier `::before` hover-lift on
   the overlays, not just the opt-in track on dock/Button, or the overlays keep blooming after it lands.
6. **MINT a `glass-overlay-surface` recipe (the gestalt — a W60/W54 fold).** ONE composable recipe (tier +
   ratified radius + W56b squircle + one specular discipline + `ModalOverlay` scrim) that every portaled
   overlay content composes, with modal/popover/tooltip differences as PROPS — so overlay cohesion is
   structural, not emergent. This is the perfected-band target the five divergences each chip at.

---

## Prototype to run

Mount Dialog, DialogScrollContent, Sheet, Popover, DropdownMenu, Tooltip, Toast, Drawer, Command on ONE story
page over an aurora background, light + dark, ≥2 viewports; `getComputedStyle` each surface's
`backdropFilter` + `background` + `borderRadius` + `cornerShape` + the scrim `background` and assert ONE
glass model. Today that probe RED-witnesses: DialogScrollContent `background` = solid `--background` (not a
glass `color-mix`); Drawer scrim α=0.80 vs Dialog 0.50; `cornerShape` = `round` on every overlay (no
squircle); `borderRadius` ∈ {24,16,12,0} with no policy. The probe is the gate the overlay-cohesion fold
drives to GREEN.
