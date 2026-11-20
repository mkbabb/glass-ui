# The specular dot: spec

Design seat, 2026-11-15, on master at `5c15397da` (package 11.0.2). `STUDY.md` beside this file holds the reading of the frame, the source trace and what Apple's pages say. This file holds the variants, the family rule, the recommendation, the cost and the gates. Nothing here has been built or measured in a browser.

Two variants are offered. A third was looked for and none is defended; the candidates and why they fail are at the end of section 3.

## 3. The variants

Both variants delete the same thing: the pointer-anchored `::before` (the radial gradient, its mask, its blend, its three animated properties) and the `pointermove` listener, on every control. They differ in one place only: whether a control that has no plate at rest gains a rim arc with its hover fill.

Terms used below, all from the source: the **seat** is a `DockControl`; the **fill** is the seat's hover background (`--dock-control-hover-bg`); the **rim** is `--glass-rim-top` and `--glass-rim-bottom` (`src/styles/tokens/glass-fx.css:100-106`, dark arm `src/styles/tokens/dark-arm.css:386-391`), joined as `--glass-material-rim` (`src/styles/glass/rim.css:54`); the **capsule** is `.glass-capsule`.

### V-A: no highlight on controls; the rim alone carries the light

**Layers.** None added. A control paints its fill and its glyph or label. Where a control already stands on a capsule plate, that plate's existing rim is the only light on it, and it is static.

| Control | At rest | On hover | On press | Selected |
|---|---|---|---|---|
| dock icon seat, dock tab, dock select and dropdown triggers | glyph or label only | the fill, on `--dock-motion-fast` (0.2 s), and the ink firming on the same clock | the press fill (`--dock-control-press-bg`) | the capsule plate with its rim, unchanged |
| glass Button, icon button | the capsule plate with its rim | the plate's own hover, unchanged | the plate's own press, unchanged | n/a |
| slider thumb | the dot and its one shadow | unchanged | unchanged | n/a |

**Geometry.** There is nothing to place. The rim that remains is one inset leg, 1 px at the top of the plate (`--glass-key-lit-y`), following the plate's `border-radius`, with the shade legs opposite. It lies within 1 px of the edge. On a 40 px seat with a 20 px glyph it is 9 px from the glyph's box at its nearest.

**Colour.** The rim tokens as they stand: white at 10 % in light and 8 % in dark for the lit leg; the foreground at 6 % and 4 % for the shade. No new token.

**Hover and press.** The fill and the ink are the answer, as they are today, on one clock. Nothing else changes on hover. The press is the press fill. The press spring and its 4 % brightness dip are not this spec's subject and stay as they are.

**Reduced motion.** Nothing to pin, because nothing follows the pointer. The fill still fades (`src/styles/utilities/a11y-overrides.css` keeps `background-color` and `color`).

**Forced colours, reduced transparency.** Nothing paints that did not paint before. The rim already dies through `--glass-level: 0` in both brackets (`glass-fx.css:90-99`). The missing dock and `.glass-specular-track` arms in `src/styles/glass/a11y-fallback.css:106-113` stop mattering, because the pseudo-element they should have removed no longer exists on a control.

**Dark and light.** No difference in kind. The hover fill is the token pair already declared per mode (`src/styles/tokens/sizing.css:220`, `dark-arm.css:299`).

### V-B: the rim arrives with the fill

V-A, plus one thing: a control that has no plate at rest gains the rim's lit leg while it shows its fill. The light is a thin arc along the upper edge of the fill, never a shape on its face.

**Applies to** the four dock control classes only: `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`. A glass Button already has a rim at rest and gains nothing. A slider thumb is a solid dot, not glass, and gains nothing.

**The layer.** One inset `box-shadow` leg on the control's own box: `box-shadow: var(--glass-rim-top)`. No pseudo-element, no gradient, no mask, no blend, no listener, no new token.

**Geometry, in the control's own terms.** The leg is `inset 0 1px 0`. On a rounded box that draws a crescent hugging the upper edge:

- it follows the control's own `border-radius`, so on a round seat it is an arc of the seat's circle, and on a tab or trigger it is a line along the flat top that turns down with each corner;
- it is 1 CSS px thick at the top and thins to nothing where the edge turns vertical. On a circle of any diameter its thickness at an angle t from the top is 1 px times cos t: half a pixel at 60 degrees, gone at 90. That taper is the fade; no gradient makes it;
- it never reaches more than 1 px in from the edge. On a 40 px seat the glyph's box starts 10 px in;
- inside a dock, where the fill is clipped to the content box (`src/styles/glass/glass-capsule.css:144-146`), an inset shadow would sit on the padding edge, 4 px outside the fill. The build seat must check this first. If the arc and the fill's edge do not coincide, the arc is drawn where the fill is, by the same clip, or V-B is not buildable as one leg and falls back to V-A. No second element is added to make it fit.

**Colour.** `--glass-rim-top` as declared: white at 10 % in light, 8 % in dark, both scaled by `--glass-level`. It is the same ink the selected capsule's rim uses, so a hovered seat and a selected seat are lit by one source.

**Hover.** The leg is declared in the same hover rule as the fill, inside the same `(hover: hover)` gate (`src/components/dock/styles/controls/icon-button.css:130-135` and its tab and trigger twins). The base rule already transitions `box-shadow` on `--dock-motion-fast` (`icon-button.css:78`), the fill's clock, so no transition leg is added there. The tab's and the triggers' base rules were not read for a `box-shadow` leg; if they lack one, V-B adds it on the fill's clock and counts it. From `none` the leg grows in from the edge: its offset goes 0 to 1 px and its colour from transparent, over 0.2 s, and it leaves the same way.

**Press.** The arc holds at the hover value. It does not brighten. The press is confirmed by the press fill.

**Selected.** Unchanged: the capsule's own rim.

**Reduced motion.** `box-shadow` is in the set the reduced-motion carve keeps, so the arc fades with the fill. Nothing travels.

**Forced colours, reduced transparency.** The leg's alpha is multiplied by `--glass-level`, which both brackets set to 0, so it paints nothing. Forced colours also drops box shadows.

**Dark and light.** In dark, 8 % white on a dark fill is the same hairline every dark plate carries. In light, 10 % white on a light fill may not be visible at all. If the build seat measures less than two levels of difference in light (gate G-9), the light arm of V-B is a motion nobody can see and is cut by `restraint.md`'s ceiling; V-B then exists in dark only, which is a reason against it.

**Count against the ceiling.** V-B animates three properties on the seat in one hover (background, ink, shadow), one over the ceiling of two. V-A stays at two.

### Why there is no V-C

Three candidates were drawn and dropped.

- **A smaller or dimmer dot.** This is tuning, which C-2 forbids, and STUDY section 2 shows no size fits beside a 20 px glyph on a 40 px seat.
- **An arc that slides round the rim toward the pointer.** It needs the listener and a gradient or mask to place it, so it fails the ceiling on the two lines the dot fails, and it moves while the pointer moves, which is a second motion on a hover.
- **Light on press only.** A press already changes the fill, the brightness and the scale. Adding a fourth answer to one press is the overuse the owner named.

## 4. The family rule

> A surface is lit by its rim. Nothing in the library paints a highlight that follows the pointer. A site may arm one by name, with `v-specular` and the class `glass-specular-track` together, on a surface that is not a control and whose shorter side is 240 px or more.

How a reviewer checks it:

1. In `src/components`, no file contains `v-specular`, `useSpecularTracking` or `glass-specular-track`.
2. No element with a control's role (button, link, tab, switch, slider, option, menu item) has a `::before` with a radial gradient background.
3. Hovering any glass rung that carries neither the directive nor the class changes no pixel on its face. This is the 13 November pane.
4. On an armed surface, the shorter side is at least 240 px.

**Where 240 comes from.** At the default 36 % size the highlight's visible radius is 0.7 x 0.36 of the side, a quarter of it. Its peak in dark is about 10 levels of 255 (STUDY section 1). On a 40 px seat that falls away over 6 px, more than a level per pixel, which the eye reads as a blob with an edge. At 240 px it falls over 60 px, about a sixth of a level per pixel, which reads as a lift in the surface with no shape. 240 is where the highlight stops being an object. It is a proposal to be confirmed on a real pane, not a measured threshold.

**The stricter reading.** `restraint.md` as written allows no gleam on cards either, and `affordance-map.md` says the release that deletes the gleam code removes it from "any control, card or dock". Under that reading the last sentence of the rule goes and the directive, the class and the tokens are deleted outright. That is a removal of public names, so it belongs to the next major (question 3 in `OWNER-READ.md`; the default is to delete there).

## 5. Recommendation and cost

**V-A.** It is what the precepts already order, it is the only variant inside the ceiling, it is nearly all deletion, and it removes five standing defects at once (the two clocks, the slide on entry, the lit dot on a selected seat, the sticky highlight on touch, the forced-colours gap). V-B is honest and small, and it is the right thing to show beside V-A, but it adds a third animated property to buy a hairline that may not be visible in light.

### What a patch release carries (V-A, no public name removed)

| File | Change |
|---|---|
| `src/styles/glass/material.css` | The `::before` selector group (133-143) shrinks to `.glass-specular-track::before` alone. The same shrink in the transition group (267-283), the dark arm (291-301), the hover and press groups (323-348), the held-state group (352-376) and the disabled group (381-395). The four dock selectors leave every one of them; the five rungs and `.glass-card` leave every one of them. The `position: relative` group (36-48) and the `contain: paint` group (104-109) are not touched. About 75 selector lines out; the comment at 232 and the header at 18-35 are corrected to say the pseudo-element exists only on the opt-in class. |
| `src/styles/glass-specular-track.css` | Both brackets (31-45, 54-66) shrink to the one class. 20 lines out. |
| `src/styles/glass/a11y-fallback.css` | The forced-colours arm (106-113) is re-pointed at `.glass-specular-track::before`, which closes the gap for an armed surface. |
| `src/components/dock/styles/controls.css` | The `:where()` group and its comment (72-100) deleted. |
| `src/styles/tokens/sizing.css` | `--dock-control-specular-size` and its comment (223-226) deleted. |
| `src/components/dock/styles/controls/icon-button.css` | Line 102, `--glass-btn-press-t: var(--dock-press-t, 0)`, deleted with the "SPECULAR leg" paragraph of its comment (91-97). It fed nothing but the highlight. |
| `src/components/dock/DockControl.vue` | `glass-specular-track` out of both class strings (94, 96); `v-specular` (166) and its import (11) out; three comments corrected. |
| `src/components/dock/DockTrigger.vue` | `v-specular` out at 94, 111, 122; the import (10) out. |
| `src/components/button/Button.vue` | `glass-specular-track` out of the class list (122); `v-specular` (166) and its import (35) out. |
| `src/components/button/styles.css` | The press-coupled gleam rule (284-297) deleted. |
| `src/components/slider/Slider.vue` | `glass-specular-track` out of the thumb's class (421); the comment at 404-406 deleted. |
| `src/styles/glass/glass-capsule.css` | The `.glass-capsule-hover` transition (93-95) and its hover rung (96-117) deleted: with no pseudo-element on any control they reach nothing. Line 144 keeps the class in the dock clip. |
| `src/styles/tokens/property-regs-specular.css` | `--glass-specular-capsule-hover`, both arms (27-33, 41-43), deleted. |
| `src/components/alert/index.ts` | The `[--glass-specular-intensity-hover:0]` neutraliser (56, and its comment near 32) deleted: there is nothing left to neutralise. |
| `tests/components/button/Button.test.ts:161` | The assertion flips to "does not contain". |
| `docs/precepts/affordance-map.md` | The G column and primitive 2 are struck, as its own ruling of 2026-11-09 says the deleting release must do. `docs/precepts/design-idioms.md` section 12 (395-437) is rewritten to the family rule. |

One side effect to check before deleting the class from a host: `.glass-specular-track` is also in the `position: relative` group (`material.css:36-48`). A glass Button and a slider thumb get `position: relative` from it today. If either depends on that (an absolutely placed child, reka's thumb placement), the host declares its own `position` in its own sheet; the class does not stay for it.

**Tokens.** Two deleted (`--dock-control-specular-size`, `--glass-specular-capsule-hover`). None added.

**CSS.** About 160 lines deleted across eight style files. None added.

**Script.** Three directive uses and three imports removed from components. The directive, the composable and the writer stay in `src/composables/glass/` and stay exported.

**Public names changed in the patch: none removed.** What changes is behaviour behind three of them:

- `--glass-specular-intensity-hover` and `--glass-specular-intensity-active` (both in the semantic token manifest, `src/styles/tokens/manifest.ts:52-53`) no longer light an unarmed rung or any control. They still drive an armed `.glass-specular-track`.
- `--glass-specular-size` the same.
- A site that put `v-specular` on a bare rung without the class loses its highlight until it adds the class. The documented opt-in was always both.

Atlas consumes the dock's defaults and must be told of this one at booking and at publish. Daraksha needs nothing but the bump.

**Does it fit a patch?** Yes. No export, class, prop or token name is removed; paint is removed, as the 10.1.x patches removed the hover scale. It is independent of the exits patch and can ride it or ship alone.

### What V-B adds on top

One declaration in each of three hover rules (`icon-button.css:131-134`, the tab rule at `src/components/dock/styles/controls/tab-button.css:80`, the trigger rule in `triggers.css`): `box-shadow: var(--glass-rim-top)`. Three lines added, no token, no public name. It also fits a patch. If the content-box clip defeats it (section 3), it adds nothing and is withdrawn.

### What the next major carries (the stricter reading, if ruled)

Deleted: `vSpecular`, `useSpecularTracking`, `createSpecularWriter` and the types `UseSpecularTracking` and `SpecularWriter` (exports at `src/index.ts:478-482`, `src/composables/glass/index.ts:9-17`); the class `.glass-specular-track`; the file `src/styles/glass-specular-track.css` and its import (`src/styles/index.css:204`); the whole `::before` body in `material.css`; the registered properties `--specular-x`, `--specular-y`, `--specular-intensity` (`src/styles/tokens/property-regs.css:19-59`); the tokens `--glass-specular-size`, `--glass-specular-intensity-rest`, `-hover`, `-active` and their manifest entries; the `--mouse-x` / `--mouse-y` contract; the class `glass-capsule-hover` at its six call sites if nothing else has come to read it. That is about 420 lines of source and eleven public names.

## 6. Gates

The build seat proves a variant on three hosts (a dock icon seat in a dock, a glass icon Button, a slider thumb), at 1x and 2x, dark and light, at rest, on hover, on press, and with the pointer at five points on the host (centre and four points 70 % of the way to the edge). Each gate is a measurement, with its pass line.

| Gate | Measure | Pass |
|---|---|---|
| G-1 no second layer | `getComputedStyle(host, "::before").content` on each host | `none` on all three, both variants |
| G-2 nothing on the glyph | pixels inside the glyph's bounding box that are not the glyph, in every state and pointer position | equal to the fill's colour within one level of 255; no difference between pointer positions |
| G-3 a flat face | standard deviation of the fill's pixels across the host's face, excluding the outer 2 px | one level or less in every state: no gradient, no blob |
| G-4 nothing follows the pointer | the host's inline style after 20 pointer moves; a screenshot at each of the five pointer positions | no `--mouse-x` or `--mouse-y` written; the five screenshots are identical |
| G-5 one clock | computed `transition` on the host; frames sampled through hover in and hover out | every animated property on the host has the fill's duration and curve. For V-B, the arc's progress and the fill's progress differ by less than 5 % at every frame. Each leg is five frames or more and no frame carries more than two fifths of the travel (`motion-canon.md` P0a). |
| G-6 the count | properties that change on one hover; listeners added by the control for light | V-A: two properties, no listener. V-B: three properties, stated as one over the ceiling, no listener. |
| G-7 glyph contrast | the glyph's contrast against the fill under it, hovered, before and after | unchanged within 0.05, and never lower |
| G-8 forced colours and reduced transparency | each host under `forced-colors: active` and under `prefers-reduced-transparency: reduce`, hovered | no pseudo-element, no box-shadow paint, no pixel difference from the unhovered host other than the system's own |
| G-9 the arc is seen (V-B only) | peak difference between the arc and the fill beside it, in dark and in light, at 1x and 2x | two levels or more in each. A mode that fails is cut from V-B. The arc lies on the fill's edge, within 1 px, and no arc pixel is more than 1.5 px from that edge. |
| G-10 touch | on a coarse pointer, tap a seat, then tap elsewhere and lift | nothing stays lit on the tapped seat |
| G-11 the pane | an ordinary glass pane and a Card with neither directive nor class, hovered; the central 100 x 100 px before and after | no pixel changes |
| G-12 the opt-in still works | a 320 px pane with `v-specular` and `glass-specular-track` | the highlight follows the pointer as it does today, and is absent under forced colours |
| G-13 the selected seat | a selected dock seat, pointer away | the capsule plate and its rim paint as before; no dot. The build seat also reads whether `box-shadow: var(--dock-active-shadow)` at `icon-button.css:197`, whose default is `none`, is removing the capsule's rim on a seat with `aria-pressed="true"`. That reading comes from source and was not measured; if true it is a separate defect, recorded, not cured here. |
| G-14 source | search `src/components` | no `v-specular`, no `glass-specular-track`, no `useSpecularTracking`; `material.css` names no dock selector and no rung in any `::before` rule |
| G-15 the owner's frame | daraksha's theme seat, dark, hovered with the pointer at 68 % across and 34 % down, at 2x, cropped as `owner-frame-118.png` | the ring, the disc and the crescent, and nothing else |

G-1 to G-8, G-10, G-11 and G-13 to G-15 are the patch's gates. G-9 is V-B's alone. G-12 guards the opt-in the patch leaves in place.
