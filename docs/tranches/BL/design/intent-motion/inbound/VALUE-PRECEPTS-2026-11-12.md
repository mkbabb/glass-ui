# Precepts and rubric for the design study

Written 2026-11-12 from the owner's orders of that day, his standing canon and the shared glass-ui precepts. This is the instrument every critic applies, page by page, to color.babb.dev, keyframes.babb.dev, fourier.babb.dev and daraksha.babb.dev. It holds no critique of any page.

Sources, in order of authority (latest word wins):

1. `~/.dev-logs/owner-1112/ORDER.md` and `KF-ORDER.md` (2026-11-12, verbatim).
2. `~/Programming/glass-ui/docs/precepts/` at `d5fb05c`: `motion-canon.md` P0, `affordance-map.md` "Intent first", `restraint.md` and its closing section "Restraint never means an instant change". `design-idioms.md` is implementation law (tokens, utilities) and matters here only for check E3.
3. `~/.dev-logs/feedback-canon/CANON.md` (C-1 to C-101, harvested 2026-11-09) and the `feedback*` memory notes.

Quotes are verbatim, typos kept. One substitution: the private name of daraksha's mode is written `[occasion]`. In any finding, commit, pull request or message it is "the occasion mode", and the private order's wording is never copied out.

---

## 1. The precepts

### P1. Every change is tweened, in and out

Nothing changes height, width, position, shape, colour or presence between two frames; an exit is an animation too.

- **Because** (2026-11-12): "items that grow smoothly from BEGINNING TO END with START AND STOP animations in and out--this is critical. Growing instantly in height or other states is not acceptable ever--all items should be tweened." Earlier (2026-07-27): "transitions between panes, and sub-panes, need to be well-defined and ANIMATED, not just instantly transitioned."
- **So**
  - A size the browser would snap (auto height, a swapped child, a wrap, a mount or unmount) is measured and tweened, or cross-faded inside a silhouette that tweens.
  - Reduced motion shortens the travel to a fade. It never produces a cut.
  - A cure that deletes an animation leaves a tween behind.
- **Not** a licence for ornament. The law is about completeness (a start, a travel, a stop). It adds no bounce, gleam, stagger or fade-up to anything, and it does not make anything slower: he also asked for "Faster page transitoins between views" (2026-11-05).

### P2. A control says what it will do before it is pressed

Motion first, then icon, then colour, then the hover state; and a press is felt.

- **Because** (2026-11-12): "we should aim to communicate intent first with hover states, design affordance with color, icons, and foremostly animation". On keyframes the same day: "these and other icons should animate on hover, too" and "the edit button icon doesn't shirnk like a click. It should." Earlier (2026-06-09): "The hover effect for the dock and buttons is not right or noticeable, only on click is it".
- **So**
  - Every interactive element has a hover state that is a shape or fill growing from the control, entering and leaving by a tween. Text changing colour alone is not a hover state.
  - Every icon answers hover with a small motion that means what the control does (the direction arrow nudges in its direction; the easing card draws its own curve "deftly and subtly").
  - Every pressable control shrinks slightly on press and returns. A chosen value shows the choice by motion ("the curve should animate in the dropdown icon on click").
- **Not** icon animation as decoration: once per hover, small, a calm return, never a loop at rest. Not built per site: the animated-icon and hover-plate pieces are glass-ui's. A site animates only its own bespoke glyphs (keyframes' curve glyphs and direction arrows).

### P3. Weight, momentum and breath

Large things move later and longer, a gesture's speed carries into the motion, things settle, and a large or focused element looks alive at rest and shows loading, progress and completion by transition.

- **Because** (2026-11-12): "items should have weight, momentum, and breath. Large elements and focused items should have interactivity states, idle states, and communicate progress, loading, and intent with transitions." On the curtain: "should have hover and momentum like an actual curtain with your mouse." Standing (2026-06-23): "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA ... NO overly tight and springy animations."
- **So**
  - The page's large or focused element (the cube, the picker's colour field, the epicycle stage, her name, the reader's page) has four states shown by transition: idle, interactive, working, done.
  - Dragged and thrown things keep their velocity and come to rest. They do not stop dead or jump back.
  - Loading is a skeleton or a state of the element itself, never a "loading" caption and never a grey stage.
- **Not** idle motion on small controls: buttons, sliders, menu rows and dock seats are still at rest. Not overshoot on controls, text or reading surfaces: overshoot and goo stay with the spatial morphs he ruled (dock fission and fusion, the blob, the card shuffle). "springs dialed slightly back with a sense of proportion" (2026-11-05) still binds.

### P4. Restraint: less, plainer, truer

Remove affect, shading and markup; never add them.

- **Because** (2026-11-09): "Ensure NO over affected or over engineered, over shaded, or over text mark-uped UI or elements thereof." (2026-10-06): "OVERLY shaded, lighted and reek of affectation and slop ... The original keyframes.js ui was flatly lit and proper design". (2026-11-05): "Less-AI looking with shading and color. Less and more subtle shadowing."
- **So**
  - No specular, radial glow, sheen, cursor light or metallic wash. One neutral shadow per surface. No gradient unless the gradient is the data or the identity (a colour space, the aurora, the watercolour dot, the blob).
  - One blur level, never a blur inside a blur. Glass is frosted and flat-lit.
  - A cure removes something. It never swaps one ornament for another.
- **Not** a cut (P1 outranks it on motion's completeness). Not the removal of identity (P7). Not a ban on ornament he ordered by name (P8).

### P5. Every element explains itself or goes

A control's purpose is evident without hovering and without a caption.

- **Because** (2026-11-12): "INTUITIVE UI without overuse of markup, with clear nav, homebuttons" and "have icons for each dropdown, and have a home button, and clearly display what each item does." Standing (2026-11-05): "what even is this curve", "what's this dropdown", "what are these two sliders?"; "eliminate any small bits of text or items". (2026-11-12, keyframes): "why ismatreix grayed out?"
- **So**
  - A standing control (a dock seat, a toolbar button) is an icon, with no text label beside it. Inside an opened menu every item is an icon plus one plain label that names the action.
  - No captions, sub-titles, helper lines or headings that restate what is already shown. A gloss goes behind a hover or popover.
  - Nothing enabled looks disabled. A disabled item says why or is hidden where it cannot apply. A selector with one option is removed.
- **Not** a reason to add explanatory text ("clearly display" is met by icon, label in the menu, and motion, never by a paragraph). Not a reason to strip the one label an action needs.

### P6. Clear navigation: Home, one dock, the theme seat

Every page has an evident way Home and one dock that holds the navigation; the theme toggle is its own seat to the right of the dock.

- **Because** (2026-11-12): "clear nav, homebuttons"; "Ensure the darkmode toggle has a hover animation, and placed in fission, in a separated icon from the dock, though with a dock bg, on the RIGHT of the dock--in the collpase state, this fission item should fuse into the main dock and collapse away like in ios 27." Standing (2026-06-09): "all of them should leverage the same root component, with a home button on the left, navs, etc, and dividing lines"; (2026-11-09): "ONE dock, not two, with layers".
- **So**
  - Home is the first seat of every dock, on every page and in every menu that navigates.
  - Nothing navigational floats outside the dock. The dock grows, fissions and fuses in place from its centre, and its collapsed state is a circle with a meaningful face.
  - The theme toggle sits in a separate seat with a dock background to the right, with a hover animation. Fusion on collapse arrives with glass 11.2.0; until then a pinned sibling dock is the sanctioned interim and is not a finding.
- **Not** a second dock for controls. Not a locally built fission or fusion.

### P7. Identity is a ruling, never a defect

Each app keeps its own hues, type and signature motion, on its controls as well as its canvas; nothing reads grey.

- **Because** (2026-09-24): "What happened to the fourier colors in the configurator and the sliders and the like". (2026-06-17): "Our extant design language should be refined, not abrogated. Glass, paper, audaicious typograhy and mathematics." (2026-06-23): "We need to completely abrogate dark gray glass." (2026-11-12): "the slider should be the color of the name text, not so grayed out".
- **So**
  - A slider's fill, a selected state and an accent take the app's identity colour through glass-ui's tokens: fourier's basis hues, daraksha's gold, the current colour on color.babb.dev.
  - A critic never proposes neutralising a hue, a typeface or a custom animation. Such a row is marked DESIGN-RULING and goes to the owner.
  - Custom animations are preserved exactly; they may be moved or tokenised only.
- **Not** rainbow everywhere ("Only palettes should be rainbow", 2026-07-10). Not a licence for one app to restyle a shared component's geometry (P9).

### P8. Ornament only where he ordered it, and there it is drawn well

Opulence is licensed by a dated order that names the surface, never by inference.

- **Because** (2026-11-12): "A bit more ornate and arabic-inspired for the [occasion] mode and intro animation, a bit more deft, thickened, golden, shimmering"; "Stylize the text, quaran writing, and her name in particular, to be the most opulent and ornate, like a true medival arabic text from an ancient manuscript."; "the scripture lines for the quaran reader should have a manuscript-like feel, too, with proper pages, lines, etc. Deft design."; "more arabic and well defined, well-designed."
- **So**
  - Licensed today: daraksha's occasion mode and its opening film (ornate, thick line, gold, shimmer); the manuscript dressing of the text and her name within that mode; a quiet manuscript page (pages, ruled lines, verse marks) for the reader on the public site.
  - Where licensed, the test is "well-defined" and "deft": drawn geometry, real line weight, one material. A thin, faint or generic ornament fails as surely as an unlicensed one.
  - Everything in the mode is interactive and obeys P1 to P3.
- **Not** portable. Gold, shimmer and ornate borders do not travel to daraksha's public pages beyond the reader's quiet page, nor to color, keyframes or fourier. The scripture's text is illuminated around and never altered. Standing small licences remain as they were: the golden next-button hover and the admin pill's golden shimmer.

### P9. glass-ui is the design system; cure at the root

A component-level defect is cured in glass-ui and adopted by every site; a site never shims, overrides or imitates a component.

- **Because** (2026-11-12): "Communicate and laearn from glass-ui."; "the glass-ui slider thumb should be more filled to the slider, taking up the full height"; "the granular UI sldier from glass-ui is not rounded properly ... Think of it again from first principles in glass-ui." Standing: "we should have live previews of REAL components, not icons."; "fix this in the glass-ui root."
- **So**
  - Slider geometry, press behaviour, animated icons, hover plates, dock fission and menus are glass-ui's. A site themes them through tokens only.
  - An embedded slice of another app uses that app's real component, not a lookalike.
  - Consistency across the four sites lives here: same components, same geometry, same dock grammar, same state behaviour.
- **Not** a reason to leave a site-level defect unowned: layout, hierarchy, copy, bespoke scenes and bespoke glyphs are the site's.

### P10. One hierarchy: the subject is large, the rest is in proportion

The thing the page is about takes the most area and the strongest line; everything else is smaller, contained and aligned.

- **Because** (2026-11-12, keyframes): "lines on the easing page should be thicker, and with this whole page having better design hirearchy."; "remove the \"square\" part and put the x/y in a container. And the grid should be bigger of area."; "remov eht header like \"Spring\"". Standing (2026-07-17): "design hierarchy, margins, paddings, dividing lines, small UI elements, should all be audited ... to have a sense of Aristotelian proportionality"; "why are these wrapped in TWO layers of cards".
- **So**
  - A tool or scene page carries no heading that names the page; the dock already shows where you are.
  - Loose readouts sit in a small container. Data lines are thick enough to be the subject. Numbers show few digits ("too many digits of signif", 2026-11-09).
  - One container deep. Golden spacing with no dead gaps. Titles, options and units are not bold; size carries the hierarchy.
- **Not** a mandate to enlarge everything or add dividers and cards. A container is for a readout that floats, not for a group that already reads.

### P11. Nothing shifts, clips or squares off

Hovering, opening, choosing or dragging never moves the layout around it, never clips a ring or popover, and never shows a squared corner.

- **Because**: "No squared harsh lines anywhere" (C-27); the dock "should animate and expand FROM the dock from the centre" (2026-10-19); "the pop-over time item in the dock is clipped" (2026-10-19); the named-colour page-height shift (2026-11-09); "not rounded properly" (2026-11-12, the slider's expanded view).
- **So**
  - A trigger keeps its place and size when its menu opens; a page keeps its height when a value changes.
  - Hover and focus rings have room at every edge, the dock's ends included.
  - Corners stay rounded through every transitional frame.
- **Not** a ban on size change. Size may change; it must be tweened (P1) and must not push its neighbours.

### P12. Smooth and self-contained

A page's motion runs smoothly, and a page's state belongs to that page: it pauses when you leave and resumes where it was.

- **Because** (2026-11-12, keyframes): "page trantions form one animation, cube to amiga, etc, are not smooth--they're slow, jittery, and laggy. And the animation state shoudl suspend and resume, fully encapsulated per page"; "animation is not correct, and smooth." Standing (2026-10-19): "All loading times for all apps needs to be improved, every page, every app".
- **So**
  - A page or scene change is short, tweened and free of dropped frames, flashes and doubled animation.
  - Leaving a page parks its clock and work; returning restores time, playhead, direction and parameters. No other page's state leaks in.
  - Drag and slider response is immediate; no grey or blank stage on load.
- **Not** met by removing the transition, and not met by restarting the scene on return.

---

## 2. Tensions, resolved

| Tension | Resolution | Which word wins, from when |
|---|---|---|
| Restraint vs "more ornate ... golden, shimmering" | Restraint is the default on every surface. Ornament is a scoped exception (P8): the occasion mode, its opening film, the manuscript dressing; a quiet version for the public reader. | 2026-11-09 restraint overrode all earlier asks for shimmer. 2026-11-12 re-licenses it for the named daraksha surfaces only. Elsewhere 11-09 stands. |
| Restraint vs the tween law | Restraint governs what may move; the tween law governs that whatever changes, moves completely. | 2026-11-12: "Restraint never means an instant change". Where restraint.md says "Frequent actions are fast or still", "still" no longer permits a cut. |
| "no overuse of markup" vs "clearly display what each item does" | Purpose is shown by icon, motion and, inside a menu, one plain label. Explanation text is still cut. | 2026-11-09 "should not have explicit labels ... have icons" holds for standing controls. 2026-11-12 adds the icon-plus-label rule inside menus. |
| "markup" as a fault vs "a letter with markup" | On daraksha's note page "markup" means a letter's structure (salutation, body, closing, signature, the sheet at a slight angle). | 2026-11-12, that page only. |
| "each icon should have animated hover states" vs "no AI smell" | Icon motion is small, meaningful and once per hover; none at rest. glass-ui's old proportion fence ("never everywhere-jitter") now bounds amplitude and count, not coverage. | 2026-11-12 wins on coverage: every icon. Restraint still wins on character. |
| Idle states vs "Nothing moves while idle" (restraint.md) | Large and focused elements look alive at rest. Small controls stay still. Ambient identity (aurora, blob, breathing gamut) is unchanged. | 2026-11-12 for large and focused elements. |
| Press shrink vs "I don't like how these indent on click" (2026-07-11), on which glass retired PRESS-SQUISH on 2026-11-09 | A press shrinks the control slightly and returns, eased, without bounce or an inset shadow. | 2026-11-12 wins: "It should." affordance-map.md's retirement note is out of step; a missing press state is a finding owned by glass-ui. |
| Slider "you should not be able to see the thumb" (2026-06-10) vs "thumb ... taking up the full height" (2026-11-12) | Compatible: the thumb is part of the track and spans its full height. | 2026-11-12 states the geometry. |
| Page hero titles (C-50, June and July) vs "remov eht header like \"Spring\"" | Tool and scene pages carry no page-name heading. C-50's shrinking hero remains for document pages (glass-ui's own docs). This split is the study's reading; flag a page that fits neither. | 2026-11-12 for tool and scene pages. |
| Identity colours vs consistency across apps | Consistent: components, geometry, radii, dock grammar, states, motion character. Per app: hue, typeface, signature animation, the subject's own drawing. | 2026-09-24 reversal stands. |
| "not fade in and out unless necessary" (color panes, 2026-11-06) vs fades as the tween of last resort | Spatial transitions are preferred where he ruled them (the card shuffle). A fade is correct under reduced motion and inside a tweening silhouette. | Both stand. |

---

## 3. The rubric

One page at a time, from frames and source. **[S]** a still suffices. **[M]** needs a strip of frames. **[C]** needs source (file:line). Numbers marked † are measures set by glass-ui or the orchestrator, not the owner's words: use them to detect, not to argue.

A **snap** is, in a strip sampled at 60 fps: a box whose size or position reaches its end state in the first changed frame, or covers more than a third of its travel in one frame.

### A. Intent and affordance

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| A1 [S] | Each control at rest, no hover | Its purpose is evident from icon, place and form | You would have to hover or guess | "what's this dropdown"; the occasion medal with an unlabelled menu |
| A2 [M] | Hover in and out on each control type | A plate, fill or shape grows from the control and leaves the same way, within about 200 ms† | No hover state; colour-only; appears in one frame | "The hover effect ... is not right or noticeable, only on click is it" |
| A3 [M] | Hover on each icon | The glyph moves once, in a way that means its action, and returns calmly | Static icon; motion unrelated to meaning; loops | "these and other icons should animate on hover, too" |
| A4 [S][C] | Dim, grey or disabled items | Only truly disabled items are dim, and each says why or is hidden | An enabled item looks disabled; a disabled item gives no reason; a dead arrow is shown | "why ismatreix grayed out?" |

### B. Motion

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| B1 [M] | Every appearance, disappearance and size change (menu, pane, popover, row, expanded control) | Start, travel and stop, in and out; height and width tween | Any snap; an exit that cuts; height that jumps | "Growing instantly in height or other states is not acceptable ever" |
| B2 [M] | The large or focused element at rest, 3 s | Visibly alive, quietly; small controls still | Dead subject; or controls that move at rest | "no ugly static start" (the name, C-96) |
| B3 [M] | Press on every button type, trigger and icon button | Shrinks slightly (glass press token, about 0.96†) and returns, no bounce | No press state; inset-shadow indent; overshoot | "the edit button icon doesn't shirnk like a click. It should." |
| B4 [M] | Load, compute, upload, save | Progress and completion shown by the element's own transition or a skeleton | "Loading" text; grey stage; result pops in | "no grey stage"; skeletons, not loading text (C-23, C-24) |
| B5 [M] | A value change reflected in a glyph or preview | The glyph morphs or redraws to the new value | It swaps in one frame | "the curve should animate in the dropdown icon on click" |
| B6 [M] | Page or scene change, there and back | Short, even frames, no flash, no doubled motion; on return the state resumes where it was | Jitter, lag, long hold, restart, leaked state | "slow, jittery, and laggy ... suspend and resume, fully encapsulated per page" |
| B7 [M] | Character of each motion | Eased, no overshoot on controls and text; dragged things carry momentum and settle; larger things move longer | Tight or bouncy spring on a control; a drag that stops dead; trite flourish | "NO overly tight and springy animations"; "momentum like an actual curtain" |

### C. Structure and hierarchy

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| C1 [S] | Area and line weight by element | The subject is the largest thing and has the strongest line | Chrome outweighs the subject; the subject is cramped | "the grid should be bigger of area"; "better design hirearchy" |
| C2 [S] | Headings | No heading that names the page or restates the selection | A page-name header on a tool or scene page; a panel titled with what it plainly is | "remov eht header like \"Spring\""; "remove the \"square\" part" |
| C3 [S] | Spacing and alignment | Golden steps, edges aligned, no dead gaps, everything centred | Uneven gaps; misaligned heights; a large void | "margins, paddings, dividing lines ... Aristotelian proportionality" |

### D. Navigation and Home

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| D1 [S] | The way Home, on the page and in its menus | Evident, first seat of the dock or first menu item | None, or hidden behind an unmarked control | "have a home button" |
| D2 [S][M] | The dock | One dock, everything inside it, current place shown without underline-and-darkness; collapsed it is a circle with a meaningful face; grows from its centre | Two docks; floating controls; oval or blank collapsed state; expands from one side | "ONE dock, not two, with layers"; "this dock is still wrong and has floating elements" |
| D3 [S][M] | The theme toggle | Own seat with dock background, right of the dock, hover animation; fuses on collapse (after glass 11.2.0) | Inside the row with no fission where ordered; no hover animation; too small | "placed in fission ... on the RIGHT of the dock" |
| D4 [S] | Every open menu | Each item has an icon and a plain label saying what it does; options preview their value; same font size as the trigger; not bold | Bare text list; cryptic items; selected item grey | "have icons for each dropdown ... clearly display what each item does" |

### E. Controls and readouts

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| E1 [S] | Sliders | Thumb spans the track's full height; one continuous rounded track; fill in the identity colour; expanded view properly rounded | Small or floating thumb; grey fill; double border; squared expanded view | "the glass-ui slider thumb should be more filled"; "not so grayed out" |
| E2 [S] | Readouts and data marks | Live values sit in a small container; curves and lines are thick enough to read as the subject | Loose numbers floating on the page; hairline data | "put the x/y in a container"; "lines on the easing page should be thicker" |
| E3 [S][C] | Component provenance | Real glass-ui components themed by tokens; controls of note on a dock surface and at least 44 px† | Local lookalike, per-instance override, shim, imitation dock surface | "be slightly larger and have a glass-ui dock bg too"; "REAL components, not icons" |

### F. Colour and identity

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| F1 [S] | Hue on controls and surfaces | Controls carry the app's identity hue; glass is not grey; nothing muted | Neutral accent where the app has a colour; dark grey glass | "What happened to the fourier colors"; "Why is our glass so grey often?" |
| F2 [S][C] | Shading | Flat-lit; one shadow; no glow, specular, gradient or stacked blur outside the data and identity list | Any of those on a control, card or dock | "OVERLY shaded, lighted and reek of affectation and slop" |
| F3 [S] | Ornament | Present only on the surfaces P8 names, and there well-defined, thick enough, gold, deft | Ornament anywhere else; or, where licensed, thin, faint, generic | "more arabic and well defined, well-designed" |

### G. Text and numbers

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| G1 [S] | Every text node | No caption, helper line, sub-title or meta language; glosses behind hover or popover | Text that explains the UI or repeats a neighbour | "far too much meta text on essentially every page" |
| G2 [S] | Numbers and emphasis | Few significant digits, tab title included; titles, options and units not bold | Long decimals; needless bold or caps | "too many digits of signif in the favicon header area"; "Dropdown options should not be bold." |

### H. Density and markup

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| H1 [S] | Label or icon | Standing controls are icons; menu items icon plus label | A text label where an icon belongs; an icon alone where the action is not evident | "should not have explicit labels of name, motion, etc ... have icons" |
| H2 [S] | Count of containers and small parts | One container deep; no badge, pill, divider or selector that does no work | Nested cards; single-option selector; stray small items | "why are these wrapped in TWO layers of cards"; "remove this." |

### R. Robustness

| id | Look at | Passes | Fails | His complaint |
|---|---|---|---|---|
| R1 [M] | Neighbours during hover, open, choose, drag | Nothing around the control moves; page height constant | Trigger shifts; content pushed; page height changes | the named-colour page-height shift (C-49) |
| R2 [S][M] | Edges and corners, including mid-transition frames | No clipped ring, popover or pill; corners rounded in every frame | Clipping; a squared frame during a morph; the dock ellipse | "the pop-over time item in the dock is clipped"; "the ellipse issue is still present" |
| R3 [S] | Light and dark, 390 and 1440 | Legible in both themes; full width and height on the phone; bounded and centred on the desktop | Low contrast over glass; wasted phone width; an over-wide desktop pane | "still too wide on desktop and needs bounding" |
| R4 [M][C] | Reduced motion; forced colours | Each strip under reduced motion is a short fade, never a cut; under forced colours every control and its state is still visible | A cut; lost travel with no fade; a control that vanishes | "reduced motion = a fade, never a cut" (the order's reading of P1). Forced colours is not his words: polish only |

Thirty checks. A critic who cannot get a strip for an [M] check records "no motion evidence" for it, not a pass.

---

## 4. The finding format

One block per finding. One element and one check per block. An identity element (P7) is never a finding; if a check seems to demand changing one, set `kind: DESIGN-RULING`.

```
site:      color | keyframes | fourier | daraksha
page:      route as in the address bar (#/amiga)
element:   the thing, named as a user would name it, plus its selector or component
check:     A1 .. R4   (precept: P1 .. P12)
severity:  first | second | polish
kind:      defect | DESIGN-RULING (owner decides)
evidence:  frames/<site>/<page>/<file>.png, or a strip range (-03..-07), or path/file.vue:line
seen:      what the frame or source shows, in one sentence, with the measurement
correct:   what it should be, in plain terms with numbers (px, ms, scale, colour token)
owner:     site | glass-ui
```

- **severity**. `first` = the owner would notice it first: any snap or cut, a missing Home, a control whose purpose is unclear, a greyed-out look, jitter. `second` = he would notice on use: a missing hover, press or icon animation, weak hierarchy, a loose readout. `polish` = the rest.
- **owner**. `glass-ui` when the cure is in a shared component (slider, dock, menu, button, press, icon motion, hover plate): the site's action is to relay and adopt, never to shim. `site` for layout, hierarchy, copy, bespoke scenes and glyphs, and token values.
- **correct** removes or plainens unless P8 licenses the surface. It never proposes a new ornament, a neutral hue, or a local workaround.
- If the same defect appears on three or more pages of a site, file it once with the page list.

---

## 5. What to capture per page

Stored at `~/.dev-logs/design-study/frames/<site>/<page>/`, named `<width>-<theme>-<state>[-NN].png` (for example `1440-dark-menu-open.png`, `390-light-press-edit-04.png`). A strip is 12 to 16 frames at 60 fps spanning the whole change, with two frames of rest before and two after. Capture runs obey the machine guard (one browser per run, closed in `finally`).

**Stills**

1. Rest: 390x844 and 1440x900, light and dark (four frames).
2. Every menu, popover and dropdown open, at 1440 dark and 390 light.
3. The dock collapsed; the dock scrolled.
4. Keyboard focus on one control of each type.
5. One frame under forced colours at 1440.
6. The browser tab (title and icon).

**Strips** (1440 dark unless noted)

1. Hover in and out, one per control type present: icon button, dock seat, menu row, card, slider, the theme toggle, and the page's large element.
2. Press and release on: a button, an icon button, a dropdown trigger.
3. A menu opening and closing.
4. A state change in and out: a toggle, a chosen option reflected in its trigger, a pane or section that expands and collapses.
5. Dock collapse and expand; theme switch.
6. Page change to a neighbour and back, with a still of the subject's state before leaving and after returning.
7. Idle: the large element, 3 s at 4 fps.
8. Cold load: the first 2 s at 10 fps.
9. A drag or slider pull with release (and on 390, a touch drag).
10. Strips 3, 4 and 6 again under reduced motion.
11. Strips 3 and 6 again at 390 light.

**Source to have open**: the page's view component, its scene or composable, and any local CSS that targets a glass-ui component (for E3 and F2).

---

## 6. The second pass: what was struck

The first draft was read against one question: is this his word, or generic design advice? Struck or demoted:

- **"One primary action per view."** It is in restraint.md but has no owner quote behind it. Struck as a precept and as a check; C1 (the subject is largest) is what he actually said.
- **Accessibility as a precept** (focus rings, contrast ratios, forced colours). He has asked for legibility in both themes, not for this. Kept only as R3 and R4 because the brief orders them, with forced colours capped at polish.
- **"Compositor-only animation" and the spring-clock rules.** These are glass-ui's engineering means, not his law. Left to glass-ui; not a precept, not a check.
- **Timing numbers as law** (200 ms hover, 500 ms ceiling, 0.96 press scale, 44 px targets). None is his. Kept only as detection measures, marked †.
- **"Consistency" as its own precept.** Generic. Folded into P9, where it has his words ("the same root component").
- **"Performance" as its own precept.** Reduced to what he tied to design this week (smooth transitions, per-page suspend and resume) in P12. Load-time budgets belong to a different study.
- **A typography precept** (golden scale, the right faces). Real in the canon but untouched today; reduced to one clause of P10 and check G2.
- **A "delight" or "personality" precept.** His words are "suffuse more of my personality", but as law it would license invention. Struck; P7 (keep what is his) carries it.
- **A responsive-layout precept.** Reduced to check R3.
- **Ornament guidance beyond his words** (which motifs, which scripts). That is the orchestrator's reading in ORDER.md, not law for the other sites. P8 keeps only his adjectives: ornate, thickened, golden, shimmering, well-defined, deft.

Two readings in this file are the study's own and should be confirmed with the owner if a finding turns on them: the tool-page and document-page split for headings (section 2), and treating the 2026-11-12 "It should [shrink]" as restoring a press state on every control rather than on that one button.
