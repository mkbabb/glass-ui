# AZ.W-DOCK-RAIL — the in-dock switcher rail rebuilt to the hairline register

**Name**: W-DOCK-RAIL - the hairline-rail register rebuild
**Opens after**: AZ Batch 1 (the S1 quartet; runs ‖ W-DOCK-FLICKER ‖ W-ADAPTIVE-AUTO ‖ W-REGISTER-IOS — disjoint file bounds)
**Agents**: 1
**Hard gate**: `proof:dock-rail-hairline` (born-RED) — three falsifiable source witnesses + a π readback DELTA: the indicator paints the token rule not the baked `--glass-bg-quiet` plate, the rail is a hairline (no fused `--surface-tint-8` gutter), and the tab glyph computes ≥14px wide (no 4px sliver).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's THREE stacked root causes, not a blind re-diagnose
(AZ invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent
re-greps each anchor below at HEAD and confirms the three mechanisms still hold; if any
cite has drifted, the agent records the drift in PROGRESS and re-locates the mechanism
before proceeding — it does NOT re-invent the diagnosis.

Grounding findings (FLEET-DIGEST.md): **C1-R3-1-indicator-glass-plate** [S1],
**C1-R3-1-rail-fused-gutter** [S1], **F2-R3-1** [S1 — the 4px-squish], **D6-1** [S1 — the
filled-plate corroboration], **A1-1** [S1 — the W-DOCK-NAV close-claim does not hold live].
Captures: `docs/tranches/AZ/audit/ground/{C1-switcher-rail-zoom.png, C1-dock-layers-full.png,
D6-dock-rail-zoom.png, F2-r3-1-rail-tight-zoom.png}`.

The three stacked root causes (each independently confirmed at HEAD this authoring):

1. **The indicator utility-bake beats the token rule.** The rail's travelling
   `<TabsIndicator class="dock-layer-tab-indicator"/>` (DockLayerGroup.vue:251) is the reka
   `TabsIndicator.vue` wrapper, whose template bakes `bg-(--glass-bg-quiet)
   [backdrop-filter:var(--glass-blur-quiet)]` as Tailwind utilities ON the element
   (`TabsIndicator.vue:19`). Those utilities WIN over the `@layer components`
   `.dock-layer-rail .dock-layer-tab-indicator { background: var(--dock-layer-rail-active, …) }`
   rule (layer-group.css:222-242, the `background` arm at :230-234) — `@layer` always loses to an unlayered utility. Live
   readback: indicator bg = `color(srgb 0.9824 0.98144 0.9776 / 0.5)` (the near-white plate; the
   gate's positive luminance test, NOT an exact-string `≠`, is the binding form — see Hard Gate W1), backdrop-filter =
   `blur(10px) saturate(1.05) brightness(1.02)` — the near-white plate, NOT
   `--dock-layer-rail-active` (`color-mix(in srgb, --primary 15%, transparent)`).
   The W-DOCK2 `:indicator=false` (DockLayerGroup.vue:230) suppressed the SECOND phantom
   `<TabsList>` indicator but did NOT touch the rail's own explicit indicator.

2. **The rail is a fused tinted gutter, not a hairline.** `.dock-layer-rail`
   (layer-group.css:97-122) paints `background: var(--dock-layer-rail-bg,
   var(--surface-tint-8))` (offsets-sizing.css:318 mints it to `--surface-tint-8`, an 8%
   warm-ink plate) + `border-radius: var(--radius-md)` + a hard
   `border-right: 1px solid color-mix(in srgb, var(--border) 30%, transparent)` joining it
   to the pill. With `align-self: start` + `min-height: max-content` the three 28px tabs
   stack into a ~96px column glued to the pill's left edge — the user's "heavy dark blob
   column" (R3-1).

3. **The tab glyphs compute 4px wide (squished slivers).** `.dock-layer-tab`
   (layer-group.css:148-173) is a 28×28 `inline-flex` tab whose icon carries `class="size-4"`
   (16px, DockLayerGroup.vue:246) — but there is NO `svg { width / flex-shrink }` rule
   anywhere in layer-group.css (`grep svg` returns ZERO). Inside the column `inline-flex`
   the un-floored SVG collapses to `svgCssW: 4px × svgCssH: 16px` (F2-R3-1 live measure,
   `viewBox 0 0 24 24`) — a vertical sliver. The icons DO render (the B6/`isComponent`
   functional-icon fix landed, `svgPresent=true`, not first-letter fallbacks) but are
   width-deformed to faint marks.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '14,24p' src/components/ui/tabs/TabsIndicator.vue          # the baked utilities
sed -n '228,252p' src/components/custom/dock/DockLayerGroup.vue   # the rail render
sed -n '95,200p'  src/styles/dock/layer-group.css                 # rail plate + tab + indicator
grep -n 'svg' src/styles/dock/layer-group.css                     # MUST be empty (the sliver)
grep -n 'dock-layer-rail' src/styles/tokens/offsets-sizing.css    # the rail tokens
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | C1-R3-1-indicator-glass-plate [S1] | `src/components/ui/tabs/TabsIndicator.vue:19`; `DockLayerGroup.vue:251`; `dock/layer-group.css:222-242` (the `.dock-layer-tab-indicator` rule; `background: var(--dock-layer-rail-active, …)` at :230-234) | reka indicator bakes `bg-(--glass-bg-quiet) [backdrop-filter]` as utilities; the `@layer components` token rule loses the cascade → near-white plate |
| 2 | C1-R3-1-rail-fused-gutter [S1] | `dock/layer-group.css:119` (`background: var(--dock-layer-rail-bg, var(--surface-tint-8))`), `:120` (`--radius-md` plate), `:121` (`border-right`); `tokens/offsets-sizing.css:318` (`--dock-layer-rail-bg: var(--surface-tint-8)`); `theme.css:32` (`--radius-md: 6px`) | `--surface-tint-8` filled plate + `--radius-md` + hard `border-right` fuses a ~96px gutter to the pill |
| 3 | F2-R3-1 the 4px-squish [S1] | `DockLayerGroup.vue:246` (icon `size-4`); `dock/layer-group.css:148-173` (no svg width/shrink rule) | the un-floored SVG collapses to 4px wide inside the column inline-flex |
| 4 | D6-1 filled-plate corroborate [S1] | `ground/D6-dock-rail-zoom.png`; `tokens/offsets-sizing.css:318`; `dock/layer-group.css:97-121` | second-lane confirmation: a solid grey tint block, plate-on-plate |
| 5 | A1-1 close-claim void [S1] | `dock/layer-group.css:119-121`; `DockLayerGroup.vue:160` (`isComponent` def), `:244` (the render call — the B6 fix landed, icons paint) ; `audit/USER-AUDIT-2026-06-10-R3.md:22` (R3-1) | the W-DOCK-NAV "rail RESTORED with aligned indicator" does not hold at the live R3 re-audit |

## Goal criterion

The in-dock layer switcher reads as a HAIRLINE rail — a thin dividing line with legibly
sized, well-contrasted nav glyphs and a travelling indicator that paints the intended
token register — NOT a heavy tinted plate fused to the pill with squished sliver icons.
A user opening `/dock/layers` sees the iOS-grade hairline switcher the R3-1 mandate names,
on both rail orientations (column on a horizontal dock, row on a vertical dock).

## Scope

1. Defeat the indicator utility-bake at the WRAPPER SEAM (root cause 1): the rail's
   travelling indicator must paint `--dock-layer-rail-active`, not the baked
   `--glass-bg-quiet` plate. The fix is at the seam, NOT a `!important` patch — see
   AZ.W-DOCK-RAIL.1 for the two specced approaches (the impl agent picks the one that
   leaves the base `<Tabs>` underline register untouched).
2. Retire the fused tinted-plate rail register: `--dock-layer-rail-bg` re-points off
   `--surface-tint-8` to a transparent/no-fill hairline; the `border-right` becomes the
   single hairline divider (`--border-hairline`-class), the `--radius-md` plate background
   drops. The rail reads as a thin rule between the switcher column and the dock body.
3. Floor the tab glyph: add the missing `.dock-layer-tab svg { width / height / flex-shrink: 0 }`
   rule so the `size-4` icon computes ≥14px wide (the nav-glyph canon), killing the 4px
   sliver. The tab's low-contrast `--muted-foreground` rest color lifts to the nav-glyph
   contrast register (AA against the now-hairline backdrop).
4. Re-point the rail tokens block (offsets-sizing.css:318-... the `--dock-layer-rail-*`
   ladder) so the hairline register is token-tunable: `--dock-layer-rail-bg` defaults
   transparent, `--dock-layer-rail-divider` is the hairline color, the hover/active
   affordance stays a translucent glass tint (NOT the warm-red mix — coordinate the
   active-tint color choice with W-REGISTER-IOS's root register, see §Dependencies).
5. Verify the hairline rail on BOTH orientations: the horizontal dock's column rail
   (`align-self: start` content-height demand preserved — the B6 un-clip is correct and
   stays) and the vertical dock's row rail (`.dock-layer-group.vertical .dock-layer-rail`,
   layer-group.css:124+).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if defeating the indicator
  utility-bake (scope 1) cannot be done at the DockLayerGroup/TabsIndicator wrapper seam
  without editing the shared base `<Tabs>` underline register (a cross-wave surface the
  SegmentedTabs family also consumes) — that is a scope-reveal; triumvirate (research the
  cascade-win options + plan-augment the bound + redress), do NOT widen unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if the π contrast readback for the
  rebuilt rail cannot clear AA at the chosen hairline (the divider too faint to read as a
  rail OR the glyph still sub-AA) after the token re-point, that is a register-design
  miss — triumvirate, do not loop on token values.
- **Diagnostic loop halt**: if the indicator still paints the plate after the seam fix and
  three iterations have not isolated which cascade layer wins, halt and triumvirate (the
  `@layer` vs utility vs inline-style precedence is the suspect).

## File Bounds

| File | Access |
|---|---|
| `src/components/ui/tabs/TabsIndicator.vue` | modify (the wrapper-seam fix — approach-dependent) |
| `src/components/custom/dock/DockLayerGroup.vue` | modify (the rail indicator/tab render) |
| `src/styles/dock/layer-group.css` | modify (rail plate→hairline, tab svg floor, indicator rule) |
| `src/styles/tokens/offsets-sizing.css` | modify (the `--dock-layer-rail-*` token ladder re-point) |
| `scripts/proof-dock-rail-hairline.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:dock-rail-hairline` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the hairline-rail register in the dock nav-pattern section) |

Do NOT touch: `src/components/custom/tabs/` (SegmentedTabs — its underline register is a
sibling surface, out of scope unless the wrapper fix forces it, which fires the
triumvirate above); any `dock/morph.css` / `useDockState` (W-DOCK-FLICKER owns those);
any `dock/shell.css` / W55 tint (W-ADAPTIVE-AUTO owns that); the demo shell docks
(`demo/layout/`).

### Disjointness

Single agent; no intra-wave path contention. Across Batch 1: W-DOCK-FLICKER writes
`dock/morph.css` + `useDockState.ts` + `GlassDock.vue` (this wave does not);
W-ADAPTIVE-AUTO writes `dock/shell.css` + the glass tint partials (this wave does not);
W-REGISTER-IOS writes the root active-register tokens (`button/index.ts`, the
`--dock-control-active-bg` register) — this wave reads but does not redefine that token,
and its rail hover/active TINT color defers to W-REGISTER-IOS's choice (see Dependencies).
`DockLayerGroup.vue` and `layer-group.css` are touched by NO other Batch-1 wave.

## Agent Units

### AZ.W-DOCK-RAIL.1 the indicator-token-wins seam fix

- Goal: the rail's travelling indicator paints `--dock-layer-rail-active`, never the baked
  `--glass-bg-quiet` plate, with the base `<Tabs>` underline register intact.
- Mechanism: defeat the `TabsIndicator.vue:19` utility-bake at the wrapper. Two specced
  approaches (impl agent picks the one preserving the base register):
  **(A) prop-gated base utilities** — give `TabsIndicator.vue` a `surface?: boolean`
  (default `true`) that gates the `bg-(--glass-bg-quiet) [backdrop-filter:…]` utilities;
  the dock rail renders `<TabsIndicator :surface="false" class="dock-layer-tab-indicator"/>`
  so the element carries NO baked plate and the `.dock-layer-tab-indicator` rule's
  `background` is the only paint. **(B) the dock indicator owns its element** — the rail
  renders its indicator without the reka `<TabsIndicator>` wrapper's baked utilities (a
  bare `reka` `TabsIndicator` primitive + the dock class), so the token rule is unopposed.
  Approach A is the recommendation (one prop, the base register stays the default, the
  SegmentedTabs underline is untouched).
- Files: `TabsIndicator.vue`, `DockLayerGroup.vue:251`, `layer-group.css:221-238`.
- Sub-gate: the gate's W1 witness — the rebuilt rail indicator's resolved `background`
  references `--dock-layer-rail-active` (or its `--primary 15%` fallback) and carries NO
  `--glass-bg-quiet` / baked `backdrop-filter` (source-asserted: the rail
  `<TabsIndicator>` render no longer inherits the unconditional plate utilities), AND the
  π live readback shows the indicator bg is NOT `color(srgb 0.98 0.98 0.98 / 0.5)`.

### AZ.W-DOCK-RAIL.2 the hairline rail register + the un-squished glyph

- Goal: `.dock-layer-rail` reads as a hairline (no fused tinted gutter) and each tab glyph
  computes ≥14px wide at the nav-glyph contrast.
- Mechanism: (a) re-point `--dock-layer-rail-bg` off `--surface-tint-8` to transparent
  (offsets-sizing.css), drop the `border-radius: var(--radius-md)` plate background in
  layer-group.css:97-122, keep the `border-right` as the single hairline divider re-keyed
  to `--border-hairline`; (b) add the missing
  `.dock-layer-rail .dock-layer-tab svg { width: 1rem; height: 1rem; flex-shrink: 0 }`
  rule (the `size-4` floor); (c) lift the tab rest color off `--muted-foreground` to the
  nav-glyph contrast register so it reads AA over the hairline backdrop. The B6 column
  content-height demand (`align-self: start` + `min-height: max-content` + tab
  `flex-shrink: 0`) is CORRECT and PRESERVED — it is the un-clip, not the defect.
- Files: `layer-group.css:97-200`, `tokens/offsets-sizing.css:318-...`.
- Sub-gate: the gate's W2 + W3 witnesses — W2: `--dock-layer-rail-bg` resolves
  transparent/no-fill (no `--surface-tint-8`), the rail has no `--radius-md` plate
  background; W3: a `.dock-layer-tab svg` width/flex-shrink rule EXISTS in layer-group.css
  (the source assert) AND the π readback measures the rail glyph ≥14px CSS-wide (no 4px
  sliver).

## Hard Gate

`proof:dock-rail-hairline` (born-RED at HEAD, driven GREEN by the wave) — three
falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring
`proof-dock-unify.mjs`), each red at HEAD pre-wave:

1. **W1 — indicator paints the token, not the plate.** The dock rail's `<TabsIndicator>`
   render does NOT inherit the unconditional `bg-(--glass-bg-quiet) [backdrop-filter:…]`
   utilities (either `:surface="false"` is bound, or the dock owns a bare indicator
   element), so the `.dock-layer-tab-indicator` token rule is the sole paint. RED at HEAD:
   `DockLayerGroup.vue:251` renders the plain `<TabsIndicator class="dock-layer-tab-indicator"/>`
   inheriting `TabsIndicator.vue:19`'s baked plate. **Bite-tightening (anti-evasion)**: the
   source half asserts the POSITIVE — the rail-indicator render carries no `bg-(--glass-bg-*`
   / `[backdrop-filter:` token-utility AND the live `--dock-layer-rail-active` rule is the
   resolved paint; it does NOT merely check for `:surface="false"` as a literal (a `surface`
   prop renamed/defaulted differently must still drop the baked plate). The π half is a
   POSITIVE luminance + tint-source test, NOT a brittle `≠ "color(srgb 0.98 0.98 0.98 / 0.5)"`
   string match: the indicator's resolved bg relative luminance is BELOW a near-white floor
   (the C1 plate measured L≈0.88) AND its tint reads the `--dock-layer-rail-active`/`--primary`
   register — closing the value-drift evasion (the true plate is `0.9824 0.98144 0.9776`, not
   the rounded literal), the format evasion (`rgba()`/`oklch()` serialization), and the
   opacity-knob evasion (`/0.6` still near-white but `≠ /0.5`). All three pass a `≠`-string
   check while leaving R3-1 alive; the luminance-floor test catches them.
2. **W2 — the rail is a hairline, not a fused plate.** `.dock-layer-rail`'s resolved
   `background` paints NO fill at the resting register — POSITIVELY `transparent`/no-paint,
   not merely "any token other than `--surface-tint-8`" (a re-point to `--surface-tint-4`/`-6`
   is a LIGHTER blob, still a plate, and the user's "heavy column" survives as a faint one —
   the bite must reject ANY opaque/translucent surface fill on the rail box, not just the
   one named token). `.dock-layer-rail` carries no rounded plate background, AND the divider
   is a single hairline `border-right` (no fill leaks to a pseudo-element: the gate also
   asserts no `.dock-layer-rail::before`/`::after` paints a plate fill — the pseudo-element
   evasion). RED at HEAD: `offsets-sizing.css:318` is `var(--surface-tint-8)`;
   `layer-group.css:119` paints the fill + `:120` the `--radius-md` background.
3. **W3 — the glyph is floored, not a sliver.** A `.dock-layer-rail .dock-layer-tab svg`
   rule sets BOTH a concrete `width` (≥`0.875rem`/`14px`, NOT `auto`/`100%` — `auto` re-collapses
   inside the column inline-flex) AND `flex-shrink: 0` (a width without the shrink guard
   re-squishes), on a selector that MATCHES the rendered rail DOM (not a media-gated or
   wrong-scope decoy). RED at HEAD: `grep svg src/styles/dock/layer-group.css` returns 0 — no
   rule, the 4px collapse. The source-existence is NECESSARY but NOT sufficient; the π
   measure (W4) is the binding floor — a `width: auto` decoy passes the grep but fails the
   ≥14px live readback.
4. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface): a live
   `/dock/layers` capture at `:5199` with a paired π readback proving (a) the indicator's
   resolved bg luminance is below the near-white floor AND its tint references the
   `--dock-layer-rail-active`/`--primary` register (the POSITIVE token test, not a `≠`-string),
   (b) the rail box paints no surface fill (the hairline divider is the only visible rail
   edge), and (c) the rail glyph computes ≥14px CSS-wide at ≥4.5:1 contrast against its
   backdrop. Captured to `docs/tranches/AZ/audit/visual/W-DOCK-RAIL-DELTA.md` with before/after
   frames against the `ground/C1-switcher-rail-zoom.png` baseline. **The π half is the binding
   visual truth — if the source half passes but the live `/dock/layers` render still shows
   a tinted blob column, the wave does NOT close (the A1-1 source-green/visually-broken gap
   is exactly what re-opened R3-1).**

W1-W3 are the device-free CI half (`proof:dock-rail-hairline`); the π readback is the
binding visual truth (a source-green/visually-broken gap is the exact AZ failure class).
Both must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` after the TabsIndicator prop + DockLayerGroup render edits;
`npm run build` to confirm the CSS partial compiles; `node scripts/proof-dock-rail-hairline.mjs`
born-RED before the source edits (proof it fails at HEAD), GREEN at close;
`npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration;
`git diff --check` before close.

## Verification Artefacts

- `docs/tranches/AZ/audit/visual/W-DOCK-RAIL-DELTA.md` — before/after `/dock/layers`
  frames + the paired π readback (indicator bg, divider width, glyph width + contrast).
- The `proof:dock-rail-hairline` JSON artefact (born-RED log + GREEN-at-close log).
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit: `fix(dock): rail hairline register — indicator token-wins, plate retired, glyph floored (AZ.W-DOCK-RAIL)` — names the three mechanisms in the body.
- gate commit: `test(dock): proof:dock-rail-hairline born-RED→GREEN + parity registration`.
- doc/status commit: the CLAUDE.md hairline-rail record + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: nothing structurally (Batch 1, disjoint bounds). The rail hover/active
  TINT COLOR coordinates with **W-REGISTER-IOS** (the H1 de-red): this wave keeps the rail
  affordance a translucent GLASS tint and defers the exact accent to W-REGISTER-IOS's root
  register — it must NOT bake a warm-red `--primary` mix that W-REGISTER-IOS then has to
  re-de-red. If W-REGISTER-IOS lands first, consume its register token; if concurrent,
  point the rail active at the glass-register token (not the literal `--primary 15%`).
- **Blocks**: W-DOCK-TAXONOMY (Batch 2) consumes the rebuilt rail when it disambiguates
  the dock taxonomy and de-overloads the "rail" noun; W-RAIL-EXTEND builds the
  beyond-dock hairline facility on the same hairline token vocabulary this wave mints.

## Archaeology

Prior attempt: W-DOCK-NAV (AY) claimed "/dock/layers REBUILT… rail RESTORED with aligned
indicator" — the `isComponent`/B6 icon-render fix landed (icons paint, not first-letter
fallbacks) but the three register defects (the baked plate, the fused gutter, the sliver
glyph) survived. The new guardrail: this wave's gate asserts the RENDERED register
(token-not-plate, hairline-not-gutter, floored-not-sliver) with a π readback, not the
icon-presence the prior close proved — the source-green/visually-broken gap is exactly
what re-opened it (A1-1).
