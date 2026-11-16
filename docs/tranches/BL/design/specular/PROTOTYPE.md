# The specular dot: prototype

Prototype seat, 2026-11-16. Both variants built from `SPEC.md` as written, captured on a page of their own, and measured. Nothing here is released.

## The branches

Read from `git log`:

| Variant | Branch | Tip | Parent |
|---|---|---|---|
| V-A, no pointer light | `bl/specular/proto` | `14583ba7bf608f71fb127a0c3f73a0342d57b2db` | `610e598d4` (master when the seat began; master has since moved to `edcb8594f`) |
| V-B, no pointer light plus a rim arc | `bl/specular/proto-b` | `1c535b69e3139c57d2913de6804f2ddb58a88d65` | V-A |

Both are pushed. "Today" in every strip and reading is `610e598d4`.

## What each variant changes

### V-A: 15 files, 59 lines added, 341 removed

| File | Added | Removed | What |
|---|---|---|---|
| `src/styles/glass/material.css` | 21 | 128 | Every `::before` group (body, transition, dark arm, hover, active, held state, disabled) shrinks to `.glass-specular-track` alone. The five rungs, `.glass-card` and the four dock selectors leave all of them. The header and the line-232 comment are corrected. The `position: relative` and `contain: paint` groups are not touched. |
| `src/styles/glass-specular-track.css` | 5 | 39 | Both brackets name the one class. |
| `src/styles/glass/a11y-fallback.css` | 4 | 11 | The forced-colours arm now names `.glass-specular-track::before`. Before, it named the rungs and the card, and missed the controls. |
| `src/components/dock/styles/controls.css` | 0 | 30 | The `:where()` 22 % size group and its comment. |
| `src/components/dock/styles/controls/icon-button.css` | 9 | 30 | The `--glass-btn-press-t` alias and the "specular leg" paragraph. |
| `src/styles/glass/glass-capsule.css` | 4 | 34 | The `.glass-capsule-hover` transition and its hover gleam rung. The dock clip at the foot keeps the class. |
| `src/styles/tokens/property-regs-specular.css` | 0 | 10 | `--glass-specular-capsule-hover`, both modes. |
| `src/styles/tokens/sizing.css` | 0 | 5 | `--dock-control-specular-size`. |
| `src/components/button/styles.css` | 0 | 14 | The press-coupled gleam rule. |
| `src/components/button/Button.vue` | 6 | 12 | The class leaves the host; `v-specular` and its import are removed. |
| `src/components/dock/DockControl.vue` | 7 | 12 | The class leaves both shapes; `v-specular`, its import and three comments are removed. |
| `src/components/dock/DockTrigger.vue` | 0 | 4 | Three `v-specular` uses and the import. |
| `src/components/slider/Slider.vue` | 1 | 4 | The class leaves the thumb; the comment goes. |
| `src/components/alert/index.ts` | 1 | 7 | The `[--glass-specular-intensity-hover:0]` neutraliser and its paragraph. |
| `tests/components/button/Button.test.ts` | 1 | 1 | The assertion flips to "does not contain". |

**CSS.** 248 non-blank lines are removed across nine style files. Of those, 133 are rule lines; the rest are comments. 43 lines are added, and every one is a shortened selector or a corrected comment. SPEC estimated about 160.

**Custom properties.** Two token definitions are deleted: `--dock-control-specular-size` and `--glass-specular-capsule-hover`. Five declarations that re-pointed or fed the light are also removed:

- `--glass-specular-size` on the dock controls;
- `--glass-btn-press-t` on the dock seat;
- `--glass-specular-intensity-hover` on `.glass-capsule-hover:hover`;
- `--specular-intensity` on the Button;
- Alert's `--glass-specular-intensity-hover: 0`.

None is added.

**Not done, and why.** SPEC's table also strikes `docs/precepts/affordance-map.md` and rewrites `design-idioms.md` §12. `docs/precepts` is a git submodule, which is another repository, so I did not edit it.

### V-B: 3 files, 6 lines added, 1 changed

`box-shadow: var(--glass-rim-top)` is added to the hover rule of the icon seat, the tab and the trigger. The tab and trigger base transitions lack a `box-shadow` leg, so V-B adds one at `--dock-motion-fast`, the fill's clock, as SPEC directs. The icon seat already had that leg. No token, pseudo-element or listener is added.

## The gates

The page (`.cache/specular-proto/` in the worktree, gitignored) mounts:

- a glass icon Button, a primary Button and a quiet Button;
- a `GlassDock` with four `DockControl` seats, the second selected;
- a selectable Chip, a Slider, a Switch (the Toggle) and a Card;
- a bare `glass-resting` pane, and a 320 x 220 pane armed with `v-specular` and `.glass-specular-track`.

It runs on a warm striped ground and on the plain ground, in dark and light. Readings come from the Playwright Chromium headless shell (Chrome 149) at 2x, unless marked WebKit.

| Gate | Today | V-A | V-B |
|---|---|---|---|
| G-1 `::before` content on the seat, icon Button and thumb | `""` on all three | `none` on all three | `none` on all three |
| G-2 nothing on the glyph across five pointer positions (G-4 crops) | max difference 12 to 16 levels | 0 | 0 |
| G-3 flat face, hovered dock seat (standard deviation of the fill) | dark 1.92, light 0.80, plus the blob | dark 1.98, light 0.79 | same as V-A |
| G-4 nothing follows the pointer: inline style after 20 moves; five screenshots | `--mouse-x: 77%; --mouse-y: 68%` written; screenshots differ (752 to 1,516 pixels) | nothing written; five screenshots identical | identical |
| G-5 one clock | fill and ink 0.2 s; light opacity 0.24 s on a second clock | fill and ink 0.2 s only | arc rides the fill: across every frame, the arc's offset over the fill's alpha holds at 7.1, so the two progress together |
| G-6 properties that change on a dock-seat hover | fill, ink, `::before` opacity, plus `--specular-*` | 2: fill, ink (the colour longhands that follow ink are not counted) | 3: fill, ink, box-shadow. One over the ceiling, as SPEC states. |
| G-7 glyph contrast, hovered icon Button | 8.00 dark / 13.4 light | 7.78 dark / 13.4 light | 7.78 / 13.4 |
| G-8 forced colours | seat and Button keep a `::before` (display block, opacity 0.11): the gap STUDY names | no `::before` | no `::before` |
| G-8 reduced transparency | `::before` hidden | no `::before` | arc alpha 0, because `--glass-level` is 0 |
| G-9 arc seen (V-B only) | | | Peak over rest, centre column, 2x: dark 13 to 14 levels, light 2 to 3 levels. **Geometry fails in a dock**: the arc sits on the seat's outer edge, but the fill is clipped 4 CSS px inside it (`background-clip: content-box`). Nothing is lit between the arc and the fill. |
| G-10 touch: tap the seat, then tap elsewhere | after the tap the seat's light stays at opacity 0.08 | nothing lit | nothing lit |
| G-11 bare pane and Card hovered, central 100 x 100 | pane: 32,818 pixels change in dark, 802 in light; Card: 13,797 / 308 | 0 changed | 0 changed |
| G-12 the opt-in still works | follows the pointer; hidden under forced colours | the same | the same |
| G-13 selected seat, pointer away | `box-shadow: none` | `none` | `none` |
| G-14 source | `v-specular`, the class and the directive are in five components | the only hit is a comment in `Card.vue` (lines 20 to 22) describing the opt-in | the same |
| G-15 the owner's frame | not built: daraksha's tokens are in a sibling repository | | |
| Hover shift (`shift-gate.mjs`, all three trees, dark and light) | no box moves on hover or focus; 2 press shifts | the same 2 | the same 2 |
| Typecheck (`vue-tsc`, src) | | clean | |
| vitest, the 61 files that read the touched code, `--maxWorkers=2` | | 918 pass, 8 fail | 18 dock and box-shadow files: 221 pass, 1 fail |

Notes on the rows:

- **G-7.** Today's 8.00 is the blob brightening pixels inside the glyph box. Today's icon Button at rest reads 7.78, the same as V-A hovered. So the glyph is not lower; the 0.22 drop is the light leaving.
- **G-9, light.** Light passes SPEC's two-level line only narrowly, and only at 2x; 1x was not read.
- **G-9, in a dock.** By SPEC's own rule ("if the arc and the fill's edge do not coincide ... V-B is not buildable as one leg and falls back to V-A"), V-B does not hold for an icon seat in a dock. Outside a dock the padding is 0 and the arc would sit on the fill. The page has no tab or trigger, so those two were not read.
- **G-13.** The selected seat's rim is gone in all three trees. `box-shadow: var(--dock-active-shadow)`, whose default is `none`, outranks the capsule's rim on a seat with `aria-pressed="true"`. This is the separate defect SPEC asked me to record; it is recorded, not cured.
- **Hover shift.** The two press shifts are the slider's value moving when its track is pressed. They read the same in today's tree, so neither variant introduces them.
- **vitest failures.** All 9 are environmental and none touches the change. Seven are `public-surface.spec.ts` asking for a built `dist/`. One in each run is `dissolve.test.ts` reading `docs/tranches/`, which the sparse worktree leaves out. The test typecheck also has 2 errors, a self-import of `@mkbabb/glass-ui/fourier-math` that resolves through `dist/`.

**Every control keeps hover, press and focus distinct?** SPEC gives no number for hover against rest beyond G-9's two-level line, so I used that line.

- **Dock seat:** passes. Hover against rest is 12.3 levels in dark and 26.7 in light, the same in all three trees. Press and focus are unchanged.
- **Glass Button (icon, primary, secondary): fails in both variants.** Its only hover answer today is the pointer light. `button/styles.css` has hover rules for `quiet` and `text` only. With the light removed, hover against rest reads 0.0 levels and no computed property changes on hover. Press (the spring squish and darken) and focus (the ring) remain. SPEC assumed "the plate's own hover, unchanged", but the glass plate has none.
- **Slider thumb:** loses its lit dot on hover and press. The slider's range still answers hover, and the thumb's press and focus stay.
- **Chip and Switch:** identical in all three trees. Neither paints a hover change today; the Chip's `glass-capsule-hover` reached no pseudo-element, as STUDY found.
- **Card:** loses the 13 November oval and nothing else. A Card is not a control.

**WebKit.** One confirming cell per variant: the icon Button and the dock, dark, warm ground. Playwright 1.61.1 ships WebKit build **2311** (browser version 26.5), not 2287. Build 2287 is in the cache but belongs to Playwright 1.60, which is not installed (`hover-shift/tools/pw160` has no `node_modules`). I used 2311 and installed nothing.

WebKit matches Chromium on both variants: no `::before`, no pointer write, the same fills, and V-B's arc on the hovered seat.

## Public names

A patch may not remove one. Here is each name and what I did with it.

| Name | Where it is public | What happened |
|---|---|---|
| `vSpecular`, `useSpecularTracking`, `createSpecularWriter`, `SpecularWriter`, `UseSpecularTracking` | exported, `src/index.ts:478-495` | Kept and unchanged. No component uses them now. They drive an armed surface only. |
| `.glass-specular-track` | documented opt-in class | Kept. It is now the only host of the `::before`. G-12 passes. |
| `--glass-specular-intensity-rest`, `-hover`, `-active` | token manifest, `manifest.ts:52-53` | Kept. They now drive only an armed surface; no control and no bare rung reads them. |
| `--glass-specular-size` | `glass-fx.css:157` | Kept. Armed surfaces only. |
| `.glass-capsule-hover` | named in `MIGRATION.md` (lines 91, 106) | The class is kept on all six call sites. Its transition and hover gleam rung are deleted, so outside a dock it does nothing: **left as a no-op**. Inside a dock it still joins the content-box clip. |
| `--glass-specular-capsule-hover` | `:root` token, not in the manifest; its comment called it a consumer override | **Deleted**, as SPEC directs. If a consumer set it, it now reaches nothing. |
| `--dock-control-specular-size` | `:root` token, not in the manifest | **Deleted**, as SPEC directs. |
| `--glass-btn-press-t` | registered property; the Button writes it | Kept. Nothing reads it in V-A, so the Button's press spring writes a value no rule uses: **left as a no-op write**. |
| `--mouse-x` / `--mouse-y` | the directive's contract | Unchanged on armed surfaces. |

So no exported directive, composable, type, class or manifest token is removed. Two non-manifest `:root` tokens are deleted. One documented class and one registered property are left as no-ops.

## The strips

All are at 2x, under `strips/` beside this file. Rows are "today", "no pointer light" and "no pointer light, rim arc". Columns are at rest, hover at the centre, hover near the upper-right edge, press, and keyboard focus. Each strip has four blocks: dark and light, warm ground and plain ground.

- `strips/icon.png`: the glass icon Button
- `strips/primary.png` and `strips/quiet.png`
- `strips/dock.png`: four seats, the second selected; the pointer is on the first
- `strips/chip.png`, `strips/slider.png`, `strips/toggle.png`, `strips/card.png`
- `strips/webkit/icon.png` and `strips/webkit/dock.png`: the WebKit confirming cell (dark, warm ground, V-A and V-B only)

## What you will see differ between the rows

- **Dock seat, hover.** Today has a small grey smudge up and to the right of the icon, where the pointer is. It is the dot in your frame. The second row has the same round fill and no smudge. The third row adds a faint hairline arc at the top of the seat's square cell. Because the fill is inset, the arc floats about 4 px outside the fill's own edge rather than on it.
- **Glass Buttons (icon, primary), hover.** Today has a faint soft patch where the pointer is, clearest in dark on the plain ground. In the other two rows, hover looks exactly like rest.
- **Slider, hover and press.** Today's thumb carries a small bright centre. The other rows show a plain dot.
- **Card, hover.** Today a dim oval lights in the middle of the card. The other rows show nothing.
- **Chip, Switch, quiet Button.** No difference between the rows.
- **Press and focus.** No difference between the rows on any control, except today's slider thumb dot.

## My read of the strips

The dock seat loses nothing. With the smudge gone it reads cleaner. The fill growing in and the icon firming are plainly a hover, and it is still glass, because the plate, its rim and the blur are untouched. Crop: `strips/dock.png`, column "hover, centre", rows 1 and 2 of the dark, plain-ground block.

The **glass Button does lose its sense of being pressable on hover.** Without the pointer light, nothing on it answers the pointer until it is pressed. It still looks like glass: the capsule, the rim and the shadow are unchanged. But hovering it shows no intent, which breaks the "intent first" law. Crop: `strips/primary.png`, dark, plain ground, "at rest" against "hover, centre", second row.

That is a gap in the spec, not in the build: SPEC assumed the plate had its own hover. Curing it (giving the glass Button a hover fill) is design work I did not do.

The **slider thumb** stays legible and pressable without its dot, because the slider's range answers hover. Crop: `strips/slider.png`.

**V-B's arc** reads as a thin line around the seat's cell, not around the fill. In dark on the plain ground it looks like a second, outer ring, and in light it is barely there. That matches the geometry failure in G-9. Crop: `strips/dock.png`, rows 2 and 3 of the dark, plain-ground block, "hover, centre".
