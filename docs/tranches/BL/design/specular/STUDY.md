# The specular dot: study

Design seat, 2026-11-15, on master at `5c15397da` (package 11.0.2). Read from source and from the owner's frame. No browser was launched and nothing was built, so every paint claim below is derived from the rules and from the pixels of `owner-frame-118.png`; the build seat's first job is to confirm them live.

## 1. What is in the frame

### The pixels

The frame is 160 x 80. The crescent spans about 30 px, which is a 20 px glyph (`--dock-icon-glyph`, 1.25rem) at 2x, so the frame is read as 2x. Lengths below are frame pixels, with CSS pixels in brackets.

| Thing | Where | Size | Colour (sRGB) |
|---|---|---|---|
| gold ring | centred near (83, 33), runs off the top and bottom | 126 across (63) | about (182, 149, 60) at full coverage |
| page outside the ring | | | (41-44, 33-36, 31-34), with a diagonal texture |
| band between ring and disc | | 25 wide (12.5) | (46-47, 34-35, 30-32), smooth |
| inner disc | centred near (82, 33) | 76 across (38) | (42-43, 31-32, 25-27), smooth, with a visible edge against the band |
| crescent | centred near (82, 33) | 30 across (15) | (182, 149, 60) |
| the blob | centred at (96, 22) | fades to nothing at a radius of 12 (6) | peak (51, 40, 35): nine levels above the disc on every channel |

The ring, the disc and the glyph are concentric. The blob is not: it sits 14 px right and 11 px above the centre (7 and 5.5 CSS px), touching the crescent's upper horn.

### The blob

The blob is the pointer-anchored catch-light. One rule paints it:

- **`src/styles/glass/material.css:225-231`**, the `background: radial-gradient(...)` on the shared `::before` (selector group at lines 133-143, which names `.dock-icon-button::before` and `.glass-specular-track::before`). It is a cream disc at half alpha (`--glass-specular-disc`, line 217) that fades to transparent at 70 % of its radius, clipped by a matching mask (lines 235-241) and added to what is under it with `mix-blend-mode: plus-lighter` (line 247).
- **Its size** is `--glass-specular-size`, which the dock control family re-points to 22 % at `src/components/dock/styles/controls.css:99` (the token is `--dock-control-specular-size`, `src/styles/tokens/sizing.css:226`). 22 % is a radius on each axis of the pseudo-element's box. On a 38 to 40 px seat that is 8.4 to 8.8 CSS px, and the paint ends at 70 % of it: about 6 CSS px, 12 frame px. The frame measures 12.
- **Its strength** is the layer's `opacity`, `--specular-intensity` (line 233). At rest it is 0 (`src/styles/tokens/property-regs-specular.css:24`). On hover the rule at `material.css:323-335` lifts it. A dock icon seat also carries `glass-capsule-hover` (`src/components/dock/DockControl.vue:96`), which raises the hover rung to `--glass-specular-capsule-hover` (`src/styles/glass/glass-capsule.css:113-117`): 0.11 in dark (`property-regs-specular.css:43`). 0.11 times the disc's 0.5 alpha times a cream of about 235 is about 13 levels at the very centre. The frame's nine, sampled on a 4 px grid, agrees with a hovered seat. Press would be 0.12 (`property-regs-specular.css:40`).
- **Its position** is the pointer. `v-specular` on the seat (`DockControl.vue:166`) listens for `pointermove` and writes `--mouse-x` and `--mouse-y` on the seat as percentages of its box (`src/composables/glass/vSpecular.ts:59-60`, the arithmetic at `useSpecularTracking.ts:83-87`). The pseudo-element maps them to `--specular-x` and `--specular-y` (`material.css:156-157`).

**Why it sits up and right of the glyph.** That is where the pointer was: about 68 % across and 34 % down the seat. It is not a designed position. The rule centres the disc on the pointer wherever the pointer is, so the blob lands on the face of the seat, never on its edge. The comments call it an edge gleam (`material.css:183-188`, `controls.css:95`); nothing in the rule ties it to the edge.

### The darker inner disc with a visible edge

The disc is the seat's hover fill, a flat background on the seat itself:

- **`src/components/dock/styles/controls/icon-button.css:130-135`**: on hover, `background: var(--dock-icon-hover-bg, var(--dock-control-hover-bg))`. The seat's `border-radius` is half its size (lines 52-55), so the fill is a circle, and its edge is where the fill stops. Nothing softens that edge and nothing marks it as glass: a hovered seat has no rim.
- Inside a dock the fill is also clipped to the content box (`src/styles/glass/glass-capsule.css:144-146`, with the padding at 147-149 and the 10 % inset at `src/components/dock/styles/density.css:142`). A 38 px disc is either a 40 px standalone seat or a 48 px seat's content box (48 x 0.8 = 38.4). The blob's measured radius fits the first slightly better. The build seat settles it by reading the seat's computed size.

The frame cannot say whether the fill is the hover fill or the selected fill (`icon-button.css:218-232`); both are a flat disc on the same box. The blob says the pointer is on the seat, so hover is the plain reading.

### What is glass's and what is the site's

| In the frame | Whose | Why |
|---|---|---|
| the blob | glass's | the rule, the size, the strength and the listener are all in `src/` |
| a flat disc that appears on hover | glass's | `icon-button.css:130-135` |
| the disc being darker and warmer than its surround | the site's | glass's dark default for the hover fill is 8 % of the foreground over the dock (`src/styles/tokens/dark-arm.css:299`), which lightens. The frame's disc is darker than the band around it and has less blue, so the value is a daraksha token. This is the "warm dark plate". |
| the gold ring | the site's | glass's dock edge is the foreground at a few per cent (`src/styles/tokens/glass.css:232`, `--glass-border-dock`) and its rim is a 1 px white leg at 8 % in dark (`dark-arm.css:386-387`). Neither is gold or this heavy. The ring is 12.5 CSS px outside the seat, so it is the dock's own edge at its round rest, recoloured. |
| the smooth band between ring and disc | glass's dock plate | the page's diagonal texture stops at the ring, which is the dock's backdrop blur |

I did not read daraksha's source. The last three rows are inferred from the pixels and from glass's defaults.

**How the site's tokens make it worse.** On their own the ring and the plate are a quiet target: ring, disc, glyph, all concentric. The blob is the one thing off centre, the one thing with a soft edge among three hard ones, and the one grey thing among gold and brown (it adds an equal nine levels to each channel, so it reads cooler than the warm plate under it). The darker plate also raises the blob's contrast: nine levels over a luminance of 33 is about a quarter brighter, where over a lighter fill it would be a tenth. So the site makes glass's defect easier to see. It does not cause it.

### The layers on a dock seat, state by state

A `DockControl` with `shape="icon"` renders one element with the classes `dock-icon-button glass-specular-track glass-capsule-hover` (`DockControl.vue:96`).

| State | What paints | What moves it |
|---|---|---|
| rest | the glyph at 80 % ink. The background is transparent. The `::before` exists, covers the seat, and has opacity 0. | nothing |
| hover | the fill disc, the glyph at full ink, and the blob at 0.10 light / 0.08 dark, or 0.14 / 0.11 with the capsule rung | fill and ink: `--dock-motion-fast`, 0.2 s (`icon-button.css:68-69`, `src/components/dock/styles/index.css:217`). Blob strength: `opacity` over `--duration-normal`, 0.3 s (`material.css:289`). |
| pointer moving | the blob follows | one `pointermove` listener, one write per frame, then `--specular-x` and `--specular-y` eased over 0.2 s (`material.css:287-288`) |
| press | the press fill (`icon-button.css:141-143`), a 4 % brightness dip and a scale from the press spring (lines 102-103, `DockControl.vue:136-145`), and the blob at 0.16 / 0.12 (`material.css:336-348`) | the spring writes `--dock-press-t`; line 102 feeds it to the blob through `--glass-btn-press-t` |
| selected | the capsule plate and its rim (`glass-capsule.css:35-71`, `icon-button.css:218-232`), and the blob held at the press strength for as long as the seat is selected (`material.css:352-376`) | nothing |
| leave | the fill fades in 0.2 s, the blob in 0.3 s. The blob's last position stays written on the seat. | on the next entry the blob fades in at the old position and slides to the new one |

Five defects fall out of that table, apart from taste:

1. **Two clocks.** The fill runs 0.2 s and the highlight 0.3 s. The highlight is still fading when the fill has gone, and 0.3 s is over the 200 ms ceiling for hover feedback (`restraint.md`, Motion).
2. **A slide on entry.** The position is remembered between visits, so the blob is seen travelling across the glyph each time the pointer comes in from another side.
3. **A selected seat keeps a lit dot** at whatever point the pointer last left it, or dead centre, over the glyph, if the pointer never visited.
4. **No hover gate.** The fill is gated on `(hover: hover)` so a tap leaves nothing behind (`icon-button.css:130`). The highlight's hover rule is not (`material.css:323-335`). On touch, where `:hover` sticks to the last tapped element, the blob stays lit after the tap, at its last written position or at the centre.
5. **Forced colours.** The forced-colours arm removes the `::before` from the five rungs and the card only (`src/styles/glass/a11y-fallback.css:106-113`). The four dock selectors and `.glass-specular-track` are missing from it, so a dock seat, a glass Button and a slider thumb still paint the highlight there.

### The family, from the same rule

Every member reads the one `::before` body at `material.css:133-253`.

| Surface | How it is wired | What paints |
|---|---|---|
| dock icon seat, dock tab (`DockControl.vue:94-96, 166`) | class and `v-specular` | a 22 % blob that follows the pointer |
| dock select and dropdown triggers (`DockTrigger.vue:94, 111, 122`) | `v-specular`; the selectors are in the group by name | the same |
| glass Button, including icon buttons (`src/components/button/Button.vue:122-124, 166`; `src/components/button/styles.css:287-297`) | class and `v-specular` | a 36 % blob that follows the pointer, with a press ramp of its own |
| slider thumb (`src/components/slider/Slider.vue:421`) | class only, by design (comment at 404-406) | a centred glow on an 8 to 24 px dot on hover, press and drag |
| every glass rung and `.glass-card`: panes, cards, sheets, dialogs, popovers (`material.css:323-348`) | nothing | a centred disc on hover, 36 % of the pane on each axis |

The last row is the 13 November case, "hovering over a pane introduces a strange circular specular item." The hover rule lifts the strength on every rung whether or not anything writes a pointer position, and an unwritten position falls back to 50 % 50 % (`material.css:156-157`). So an ordinary pane, with no directive on it, lights a still ellipse in its middle when the pointer enters. The comment that an unwired plate "paints NOTHING here" (line 232) is true at rest only. `Alert` already had to zero the rung by hand to avoid it (`src/components/alert/index.ts:56`).

`glass-capsule-hover` on `SelectTrigger`, `ToggleGroupItem`, the chip and the configurator chip raises a rung that only reaches a `::before` where one exists. On those four there is none, so the class paints nothing there.

## 2. Does a pointer-following highlight on a 40 px control survive?

No. It should go, and there are three separate grounds, any one of which is enough.

**The precepts already say so, by name.** `restraint.md`, Shading, first rule: "No specular highlight, radial glow, sheen, cursor light, disco effect or metallic wash. Check: zero `radial-gradient` or gleam layers on controls, cards and docks." The owner's words under it are "Remove, do not tune." (C-2). `affordance-map.md` records the consequence: the gleam primitive "goes", and "No specular catch-light, cursor light or gleam rung remains on any control, card or dock." It adds that until the release that deletes the code, every tick in the gleam column is "a defect to cure, never a contract to keep." The owner's sentence of 15 November is that defect being seen again. The 22 % size at `controls.css:99` is the tuning that C-2 ruled out, and it was tried.

**It fails the ceiling on four lines.** Counting one dock seat on hover against the table in `restraint.md`, "The ceiling":

| Per control | Ceiling | Today |
|---|---|---|
| gradients, gleams, glows | 0 | 1 gradient, plus a second as its mask |
| properties animating in one change | 2 | 5: background and ink on the seat; opacity, x and y on the pseudo-element |
| animations running on a hover | 2 | the same 5 |
| listeners per control | 0 | 1 for the highlight |

**It cannot fit.** On a 40 px seat the glyph's box is the middle 20 px. That leaves a band 10 px wide around it, 6 px inside a dock where the plate is inset. The blob is 12 px across. For it to miss the glyph its centre must be more than 16 px from the seat's centre, and the seat's edge is at 20. So wherever the pointer is, the blob is either on the glyph or cut by the edge. There is no size at which a disc centred on the pointer reads as light on the edge of a 40 px control. Shrinking it gives a speck beside the glyph, which is what the frame shows.

"Have touch like apple" points the same way. Apple's own web controls, measured for `restraint.md` on 12 November, carry "nothing on glass but its fill and its blur."

What a seat keeps when the highlight goes: the fill that grows in on hover, the ink that firms, the press, and, where a plate stands, the plate's rim. Each of those starts and stops. Nothing is cut that was a tween.

## 3. What Apple does

Read on 2026-11-15 from Apple's public pages. Quotes are verbatim.

**Human Interface Guidelines, Materials** (`developer.apple.com/design/human-interface-guidelines/materials`):

- "Liquid Glass forms a distinct functional layer for controls and navigation elements — like tab bars and sidebars — that floats above the content layer."
- "Use Liquid Glass effects sparingly." and "If you apply Liquid Glass effects to a custom control, do so sparingly. Liquid Glass seeks to bring attention to the underlying content, and overusing this material in multiple custom controls can provide a subpar user experience by distracting from that content. Limit these effects to the most important functional elements in your app."
- "Don't use Liquid Glass in the content layer." with one exception: "controls in the content layer with a transient interactive element like sliders and toggles; in these cases, the element takes on a Liquid Glass appearance to emphasize its interactivity when a person activates it."
- "The regular variant blurs and adjusts the luminosity of background content to maintain legibility of text and other foreground elements."
- The page says nothing about a highlight, a specular or a pointer.

**Adopting Liquid Glass** (`developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass`; the first 100,000 characters of the page were read, the rest is API link lists and was not):

- "Controls have a refreshed look across platforms, and come to life when a person interacts with them. For controls like sliders and toggles, the knob transforms into Liquid Glass during interaction, and buttons fluidly morph into menus and popovers."
- "Prefer to use standard spacing metrics instead of overriding them, and avoid overcrowding or layering Liquid Glass elements on top of each other."
- "Prefer to remove custom effects and let the system determine the background appearance."
- "people can choose a preferred look for Liquid Glass in their device's settings, or turn on accessibility settings that reduce transparency or motion in the interface. These settings can remove or modify certain effects."

**Applying Liquid Glass to custom views** (`developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views`):

- "Liquid Glass is a material that blurs content behind it, reflects color and light of surrounding content, and reacts to touch and pointer interactions in real time."
- "Add interactive(_:) to custom components to make them react to touch and pointer interactions. This applies the same responsive and fluid reactions that [the glass button style] provides to standard buttons."
- "Limit the use of Liquid Glass effects onscreen at the same time."
- The page for `interactive(_:)` itself has only "Returns a copy of the structure configured to be interactive." It does not say what the reaction looks like.

**Apple Newsroom, 9 June 2025** ("Apple introduces a delightful and elegant new software design"):

- "This translucent material reflects and refracts its surroundings."
- "Liquid Glass uses real-time rendering and dynamically reacts to movement with specular highlights."

**What that adds up to, and what it does not.**

- Apple names specular highlights once, in a press release, as a response to movement. Its developer pages describe the material as blur, luminosity and reflected surrounding colour, and describe a control's reaction as a change of the thing itself: a knob becomes glass while it is held, a button morphs into its menu.
- Nothing read says that a small control shows a dot of light that follows the pointer. Nothing read rules it out either: the pages do not describe the interactive reaction's appearance at all.
- The guidance that bears on this question is about amount: sparingly, the most important elements only, never layered, and the system's reduce settings remove effects.
- For the web, the nearest measured fact is the one already in `restraint.md`: on Apple's sites a glass control is one node with a fill and a blur, and a hover is a change of fill.

**Not read.** The WWDC 2025 session videos on the new design (they are video, and no transcript was fetched), so nothing here describes how the highlight is drawn on a native control, where on the shape it sits, or whether it tracks touch. No native control was captured. `docs/tranches/BL/design/depth/record/` was read and holds Apple's hero pages (iPhone 18 Pro, Vision Pro, AirPods Pro and Max) for depth and parallax; it has no strip or note of a glass control, so it gives nothing for this question beyond its finding that no layer on those pages moves with the pointer.
