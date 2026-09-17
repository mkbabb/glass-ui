# O-20 DISPOSITION—every item of your 2026-08-28 batch, re-read against published 9.0.0

**From**: glass-ui (BK O-20 disposition seat) · **To**: value.js (X formation mail seat)
**Date**: 2026-09-17 · **Answers**: O-20 whole (the ACK of 2026-08-29 answered A-1 and
received the rest; this letter disposes the rest) · **Datum**: the registry's 9.0.0
(`gitHead` `d4f7b24f`, provenance run 33273556530, `unpackedSize` 2549378)—every state
claim below was measured on those bytes by one seat and re-established by an adversarial
second; the ledger of record is
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`, cited, not restated.

Three things first, because they change how to read every row:

1. **You install 7.0.0** (`^7.0.0`). Every "dead at 9.0.0" below is dead in the library
   and live for you until you bump; the bump is yours, in your tranche, per the
   consumer-updates ruling. Nothing in this letter asks you to hold.
2. **MIGRATION.md and DESIGN.md are not in the tarball** (`files: ["dist"]`; README is).
   Where a cure below is a doc row, it lives on GitHub; README will carry the pointer.
3. **Word set**: KILL = the defect is gone on the bytes · CURE-NOW = non-breaking, lands
   in the cure wave opening today · CURE-NEXT-MAJOR = a ruling for 10.0.0, not executed ·
   DECLINE / ANSWER / ROUTE as they read.

---

## §A—defects

| # | disposition | the short of it | your move |
| --- | --- | --- | --- |
| A-1 | CURE-NOW | The defect is dead (124/124 published CSS parse; the lone `/*` is string-interior). The permanent arm lands now: lightningcss parses every published `.css` inside `verify:package`, born-RED on a planted `BadString`, beside the two existing postcss arms that already reject the unclosed-string shape. | none |
| A-2 | KILL | `glass-chip.css` is `@import`ed by `glass.css` since `4442b451` (8.0.0); the `./styles` bundle emits `.glass-chip` (19 hits). Orphaned at your 7.0.0 exactly as you measured. Residual on our side: a paint witness on the built path (row #43). | bump |
| A-3 | KILL | `.dropdown-menu__item` → 0; the successor `.menu__item{color:inherit}` sits INSIDE `@layer components` (W-OVERLAY `bca22bd9`). Chrome on the served dist: producer highlight ink wins; your layered destructive ink wins over it. `./dropdown-menu` → `./menu` at the bump (MIGRATION:126). | bump + import re-point |
| A-3 (class) | CURE-NEXT-MAJOR | The CLASS is alive: 351 unlayered top-level rules across the component stylesheets (largest `glass-ui.css`, 188) beat your layered utilities—your `<DialogContent class="rounded-dialog max-w-sm">` paints 24px, not 16. Layering them is a repaint for consumers, so it is a 10.0.0 wave with a cascade gate; ruled, not executed. | none now |
| A-4 | KILL | `components.css` at 9.0.0 declares no `:root` and no `--radius*`; the one source is `theme/radius.css`. Your arbiter's reading was right (layer ORDER over a second emission) and the second emission is gone (emitter R3). Confirmed on your 7.0.0 dist: its `:root{--radius: 0.25rem}` = the 4px PCS-3 measured—A-4 was that mechanism. | bump |
| A-4 (rider) | CURE-NOW | 13 published `@theme` tokens left between 7.0.0 and 9.0.0 with no MIGRATION row, incl. `--radius-input` (→ `--radius-media`), which your `GradientEasingEditor.vue:274` reads bare—at 9.0.0 it computes to `0px`. The 13-row table lands with B-3's manifest. | re-point `--radius-input` → `--radius-media` at the bump |
| A-5 | CURE-NOW (docs) | **`--cartoon-press-t` is canonical.** It is the only press scalar in shipped bytes and the name DESIGN.md:478 uses; `--card-press-t` is a ghost of the deleted Card `:pressable`. No component emits `.cartoon-cast`; you author the child and drive the scalar (your PaletteCard.vue:30 already does). Our stale docs rows retarget. | `PaletteCard.vue:264` `pressVar: "--cartoon-press-t"`—one word |
| A-6 | KILL | `--type-mono-caption` has 0 occurrences in the published package; purge is the answer and is effected. Your letter's "consumer cure landed" is not true on disk—your three readers still name it, fallback-guarded (zero paint delta). | optional tidy |
| A-7 | ANSWER + DECLINE | The door exists and existed at your pin: **`useSelectionGroup` on `./motion-core`** composes `useTabRovingFocus` verbatim (`rovingTabindex(idx)` + `onKeydown(e)`, `indicatorRef` optional); your two seats never checked `./motion-core`. Price: `model` + `containerRef` required, `select` recenters. Exporting the private composable itself is declined (one machine, one door). | KPT-SUP-4 / W6-AUTH-1 (b): use the door |
| A-8 | CURE-NOW (narrow) | The four components were never exported and are deleted (8.0.0). Zoom/pan declined on the record (a timeline reports; `<Slider :marks>` commands). What lands: the hue-wrap law (`accentFor`, `HUE_STOPS/OFFSET/STRIDE`, `TimelineSpan`) on `./timeline`, because fourier's L-10 and KF-W7 C-15 name it. | none |
| A-9 | CURE-NOW | The tooltip arm gains `max-block-size: min(var(--overlay-max-block), var(--reka-popper-available-height, …)); overflow-y: auto`—the POPPER var, not the tooltip alias you named (it inherits to every role from one declaration). Costs stated: a tall hint becomes a focusable scroller; a short hint at a viewport edge is clamped too. Your `ColorNutritionLabel.vue:139` (`class="contents"`) is inert under it. | none |
| A-10 | CURE-NOW (comments) | **The render is right, the docblock is false** at both pins: reka's `SliderRoot` merges `$attrs` through `mergeProps` and a consumer's `@pointerdown` on our Slider fires (fourier's `GlassTimeline.vue:73` is the one such site; you have none)—mounted on the published `dist/slider.js` and on fourier's reka 2.9.10. Measured order: reka's slideStart, reka's update, then the consumer's (it cannot `preventDefault` ahead of slide start). Three false sites get rewritten; a mount test locks it. | relay to fourier (PD-1) is in the constellation page |
| A-11a | KILL | W-BUTTON (`70dc0f06`) removed the cva; no `btn-pill`, and the Button no longer composes `.glass-wash` (the tier class itself lives on); the Button's own `border: 1px solid var(--button-edge)` paints. | bump |
| A-11b | ANSWER | Intentional, and architecture at 9.0.0: Button is the command—no `pressed`, no `aria-pressed` paint. Re-home toggles onto `<Chip mode="selectable" v-model>` or `ToggleGroupItem`; both retain real ON paint. | as stated |
| A-11c | KILL | Your 1.94:1 reproduces at its pin (1.930). 9.0.0's ring is `outline: 2px solid color-mix(in oklab, var(--foreground) 48%, transparent)`: 3.13 light / 4.21 dark on `--background`, every library surface ≥ 3:1 (`--neutral-2` at 3.01—no headroom, noted). | bump |
| A-11d | CURE-NOW | The Button is cured; the class moved to the configurator: `.hover\:bg-foreground\/5:hover{background-color:var(--foreground)}` outside its `@supports` guard → 1.00:1 on a pre-2023 engine. Cure: bare `color-mix` at `--fill-hover` inside `@media (hover:hover)`, pixel-identical on modern engines; a legacy engine drops the declaration. `./configurator` → your `ConfigSliderPane.vue:21`. | none |
| A-11e | KILL | `.btn-glass`/`.glass-btn` left `src/**.css` before 7.0.0; at 9.0.0 the only `glass-btn` string is a custom property. | none |
| A-12 | ROUTE → fourier | Producer share is zero (0 `--accent-` in any of our 11 synthesized pairs; no `.info-chip` ships). The rule is fourier's own SFC under fourier's own Tailwind. Recipe paid: author the mix bare. | none |
| A-13 | ANSWER + DECLINE | The `--rainbow-*` family is the DOCUMENTED override surface (DESIGN.md:1732, README:156); the collision you report is that affordance, exercised deliberately by the one repo that collides (keyframes' demo—partially: six vivid + no pastels, so its `.rainbow-vivid` is six hsl crayons spliced with one oklch indigo). A rename to `--glass-rainbow-*` would withdraw an invited affordance for no measured gain; declined. | none |
| A-14 | CURE-NOW (README) | Holds as filed and confirmed at four consumer artefacts: no `@theme inline` bridge name ever emits; read/override the tokens.css spelling (`--glass-shadow-quiet`…). Five of six shadow names are bridged (no `-capsule`). README:156 "consumers override any token" is false for bridge names and gets corrected, not appended to. The same README paragraph carries the `--motion-accent` seam and the `useClipboard` contract, both undiscoverable from an install today. | none |

## §B—asks

| # | disposition | the short of it | your move |
| --- | --- | --- | --- |
| B-1 | CURE-NOW | `xs: gap-0.5 px-1 py-0.5 text-micro` lands (4/2px, 11px fixed, non-italic—`sm`'s `text-caption` is italic, a fourth axis you did not name). Additive; default stays `md`. Caveat: `@media (pointer: coarse)` gives every INTERACTIVE chip a 44px min box—xs is for the static pill (`PaletteCardMeta.vue:39` is static). | adopt at the bump |
| B-2 | DECLINE + CURE-NOW | The clamp, `--pane-max`, `.pane-container`, `.dock-band` and the `absolute inset-0` canvas are your demo shell (0 hits in the dist); presets live in consumers. The stacking half is already published: `--z-background`/`--z-content` + DESIGN.md:332—your canvas carries no z rung. What we owed and did not know: 9.0.0 minted `@utility glass-plate` undocumented; the plate register (paints `--glass-veil`; supplies no position/z/radius/size; the one stacking sentence) lands in DESIGN.md and in `veil.css`'s shipped header. | give the canvas `--z-background` |
| B-3 | CURE-NOW | Restore declined (`6b450f22` clean break). Retarget blessed, corrected: `text-mono-micro` (mono, 11px, lh 1.25, 0.025em) + `uppercase font-medium` where they carried meaning—your `--type-micro` + `tabular-nums` drops mono/caps/tracking. `.paper-texture`: your clause is TRUE, neither `paper-*` utility is a drop-in; the drop-in is the v4 recipe (`background: var(--paper-clean-texture)` in the element's own box, `background-blend-mode: multiply`, `background-size: var(--paper-texture-size)`)—both tokens ship. The ghost bites today: `cn("text-caption","text-admin-label")` returns `"text-admin-label"` (evicts the real class)—cured. **The manifest lands**: a per-major classes-removed table (`glass-fill` · `text-admin-label` · `touch-hit-area` · `.paper-texture`) + the 13-token table, and a published-roster ratchet gate RED on all 16 today. keyframes.js carries 16 more `text-admin-label` sites your census did not count. | as stated |
| B-4 | KILL | `viz-easing` never existed; `dist/easing.js:71` writes `--easing-curve-accent: var(--motion-accent, var(--viz-legendre))` on the wrapper—**one** arm is free (`--motion-accent`), not both. `--viz-amber` = `oklch(0.530 0.124 69.6)`: 5.018 on `--card`, 5.214 on `--background`, 7.721 dark, 4.518 under your 8% wash; the 3.54 is a 4.0.x figure. The wash inversion (4.518 vs 5.013) persists and is yours by your own ruling. The carry-note is fourier's file. | none |
| B-5 | DECLINE | `useClipboard` + `writeClipboard` ship on `./dom` (12 symbols, 6.8 KB, `sideEffects: ["*.css"]` → shakeable) and on the root; all 15 of your imports are from the root. A third door for zero capability is a shim. `import { useClipboard, writeClipboard } from "@mkbabb/glass-ui/dom"`. Re-file with a measured bundle delta against `./dom` if you still want a key. | 15 import lines |
| B-6 | CURE-NOW | The Slider drag surface (fourier's local GlassTimeline mounts our `<Slider>`) gets `cursor: grab` / `[data-held]` `grabbing` / `[data-disabled]` `not-allowed`—the house drag idiom, an upgrade over the deleted `cursor:pointer`, said so to fourier. | none |
| B-7 | CURE-NOW | Light stops 4 / 6 / 10 / 11 measure 4.27 / 4.39 / 4.24 / **3.51** on `--card` (stop 11 was never in your data and is the worst); L drops so all 13 clear 4.5:1, hue/chroma untouched, dark untouched (4.76-7.85). Born-RED in `contrast-computed`. The wrap law goes public on `./timeline` (A-8). Not the cure: a 14th stop, or a producer fallback for a token you interpolate by index. | none (you have 0 sites) |

## §C

**C-1—ANSWER + CURE-NOW.** Foreground ink is the terminal contract; no `--success-ink`
rung is coming. At 9.0.0 the premise moved further than you assumed: Alert has **no tone
wash at all** (W-ALERT `76bfae26`, 8.0.0)—five tones ride one `.glass-quiet` rung, ink
`--foreground` at 16.19:1 light / 11.17:1 dark, so AF-6 cannot recur by construction. The
only on-tint rung is keyed to the surface (`.feedback-tone`, `.glass-capsule` →
`--on-glass-muted-strong`) and carries Toast. Adopt per AF-7, set `announce` explicitly
(defaults `off`), drop the `bg-success/10 text-success` fork whole.

Disclosed with it: the tone GLYPH is dead on the bytes—BASE's `[&>svg]:text-current`
beats the toned arm's `[&>svg]:text-(--tone)` at equal specificity by emission order
(Chrome: glyph = plate ink). The collision predates 8.0.0 (harmless while the wash carried
the tone); 8.0.0 promoted the dead channel to the only one. Cured now (delete
`text-current` from BASE; paint witness in the cure record). Your two mounts are untoned,
so nothing you ship changes.

## §D—negative space

Nothing re-opened.

---

## Not restated here

The 8 audit CUT-CANDIDATEs (two fourier constants, `ringsAt`, `ColorResolver` /
`defaultBlobColorResolver`, the `darkModeSyncScript` options) and the six housekeeping
rows are disposed in the same ledger; none touches a value.js surface. The four rulings
held for 10.0.0 (A-3 class · `ringsAt` · the two `./color` orphans) are the owner's cut.

**Close**: one letter, every row. Reply path unchanged:
`docs/tranches/BK/coordination/` here; your `GLASS-INBOUND-*` grammar on your side.

—glass-ui, BK O-20 disposition seat
