# rida.dev, the UI half: the glass tab bar, the contents menu, and the glass they share

BM study, read 2026-11-22 by an Opus 5.5 seat (claude-opus-5-5). Source: the 74 chunks and the post fetched to `docs/tranches/BM/study/source/rida/` (untracked). The post is Rida F'kih, "Bypassing iOS Safari's 60 FPS Limit to Build Web Applications That Feel Native", 2026-11-20, https://rida.dev/blog/bypassing-ios-safari-60-fps-limit.

No reading here comes from an iPhone. One guarded headless Chromium run was made and failed to bring the menu up; a second run was refused by the guard (section 9). Every behaviour below is read from code. Where a claim concerns production iOS Safari, its source is named; most come from the author's post or from the site's own measurement records, and the rest are owed to the owner's iPhone.

## How to read the citations

`name@N` is byte offset N into the minified file as fetched. Search the file for the quoted token near that offset.

| Name | File under `source/rida/assets/` (or the post) |
|---|---|
| cfg | `glass-nav-config-Bu5Nn5QD.js` (every tab-bar constant) |
| dock | `dock-BXVXx9go.js` (the tab bar's state machine and frame model) |
| input | `dock-input-RPbevsY3.js` (controllers, input reducer, loop wiring) |
| stretch | `stretch--qsPJrvk.js` (lift phases, press light, rubber band, bar shape) |
| springs | `springs-CBVasZVT.js` |
| geo | `geometry-UxFLVdK8.js` |
| pan | `scroll-pan-DGcCLOXV.js` (scroll pads, frame loop, mouse drag, momentum halt) |
| pace | `document-page-speed-CSRZQDtY.js` (the pacer scroller) |
| islands | `islands.js` (served as `islands-q2Ks8eRo.js`; page-wide display boost) |
| strip | `tab-strip-DOX9o6Ud.js` (icon and label raster) |
| tint | `label-tint-hXe3aWu1.js` (glass worker link, label tints) |
| outlines, restframe | `outlines-B6Yfiyxw.js`, `resting-outline-frame-CsHfSozZ.js` |
| sm, ctl, sh, struct | `state-machine-step-C3vEYSXU.js`, `controllers-step-BPoxh4P6.js`, `shaders-step-BDKzvCu_.js`, `structure-step-DkrdxV1O.js` |
| worker | `glass.worker-6QevKlGb.js` |
| boot | `boot-post-contents-D8K3JC5h.js` |
| pcc | `post-contents-config-4nwVq2Em.js` (menu constants and the iOS 27 measurement records) |
| menu | `mount-post-contents-CDzMRvJ6.js` (the menu's gestures, motion and a11y) |
| wire | `scroll-tripwire-BSBbK5wG.js` (page re-layout for the glass backdrop; the alert) |
| scheme | `color-scheme-CyEwzDwH.js` |
| post | `blog.html` (inline CSS and the article) |

## 1. The shape of it

The site has two live glass controls: the tab bar demo (four steps in the post: Structure, Controllers, State machine, Shaders) and the page's own floating contents menu, top right, which is the site's dropdown. Both draw every visible pixel (glass body, icons, labels, menu text) in one WebGL2 fragment shader that runs in a worker on an `OffscreenCanvas` (boot@7954, worker@67959). The DOM underneath is a layer of invisible hit targets, focus rings and accessible names: the menu's row text is `color:#0000` (post@33644), and the tab bar's controllers are empty scroll containers (input@372).

One shader program serves every control. It knows five primitives, each a signed-distance shape fed per frame: a "dock" (the bar body, or the open menu panel), a "button" (the round search button, or the closed menu button), a "lens" (the lifted selection), a "pill" (the resting selection platter), a "track" (the reading-progress capsule) and an "alert" (the 60 Hz warning bubble) (sh@24266, sh@21940, sh@20069). A control is a set of rectangles and alphas produced by a state machine on the main thread and posted to the worker each frame (tint@~1100, `render`).

Three things in this stack are workarounds by the brief's bar, and everything else rests on them:

1. Presentation through an `OffscreenCanvas` placeholder, which the author found WebKit on iOS presents without waiting for the page's 60 Hz rendering update (post@62508, post@62710).
2. A backdrop for refraction made by re-laying-out the page's DOM into GPU draw lists in the worker (pcc@21140 to pcc@21941, wire@3714), because a page cannot read its own pixels.
3. Input read from native scroll containers at up to 120 Hz, polled on a vsync-phase-locked `MessageChannel` loop, with an invisible smooth-scrolling element and a 1 px CSS animation to keep ProMotion at 120 Hz (pan@333, pace@89, post@19907).

The motion logic itself (springs, phase machines, rubber band, squash, presence hand-offs, the menu morph) is plain arithmetic that would run the same in the DOM. That half is what ports.

## 2. Springs, the shared vocabulary

Every spring is given as Apple's `(dampingRatio, response)` and converted to unit-mass stiffness `(2π/response)²` and damping `2·ζ·(2π/response)` (springs@9). Integration is closed-form per step, under-damped and critically damped branches (springs@518). A spring rests when |offset| < 1e-4 and |velocity| < 1e-3 (cfg@5964, springs@814). An `overshootClamping` variant stops at the first crossing of the target (springs@101); the tab bar uses it for `release` and `snap`.

A second integrator, used for the press light, is semi-implicit Euler with the same parametrisation, stepped in 1/120 s slices (stretch@1073, cfg@5792).

## 3. The tab bar ("glass nav")

### 3.1 Anatomy and geometry

At a reference width of 382 pt; every size below scales by `min(1, width/382)` (cfg@3311, cfg tail `o()`).

| Part | Value | Source |
|---|---|---|
| Bar height, side inset, side pad | 66, 21, 4.67 pt | cfg@4779 |
| Tab slot | `(barWidth − 2·sidePad) / (count − 1 + 1.102)` | geo, cfg@4820 |
| Pill (resting platter) face | 1.102 × slot wide, 57 pt tall; it overlaps its neighbours slightly | cfg@4820, geo |
| Icon, label | 25 pt icon centred 26.3 pt down; 10.5 pt / 600 label at 48 pt | cfg@4779 |
| Search button | 66 pt circle, 7.33 pt right of the bar | cfg@4959 |
| Lens at full lift | 1.5 × the pill face, both axes | cfg@4852 |
| Tabs | Home, DMs, Inbox, Threads; outline icon at rest, filled icon when selected | cfg@6122, strip@4368 |

The bar sits 47 pt above the bottom of a 176 pt stage (cfg `stage`). Icons are SVG paths rasterised with `Path2D` into a 2D canvas strip (strip@6096).

### 3.2 Input: one scroll container per tab

Each tab is an absolutely placed `div.demo-nav-controller`, one slot wide and one bar tall, `overflow: scroll`, `scroll-snap-type: x mandatory`, `touch-action: pan-x pan-y` (input@372, input@1888, post@24686). Its content is 97 snap cells, one slot wide each, with `scroll-snap-stop: always`, plus 200 pt of slack at both ends (input@1259, input@1283, cfg@4020). It starts scrolled to the middle, 48 tabs of travel either way (cfg@4043). The vertical axis is an endless pan used only to read the finger's y (input@1997, `barPulled` input@2283).

- The finger's x in the bar is `index·slot + (base − scrollLeft)/cellPx·slot` (input `C`), read once per loop tick (`readActive`).
- A press becomes a drag once the thumb has moved 0.5 pt from the pressed tab's centre (cfg@4082, input@6009).
- On release, the lens settles on `clamp(round(thumb/slot), 0, count−1)` at the moment of release, not after momentum (input@2705). The scroller's momentum is then killed by setting `overflow: hidden` for one frame and restoring it (pan@4402, `freezeFrames: 1` cfg@4020).
- `touchcancel` sends `returned`: the lens goes back to the selected tab and nothing changes (input@2939, input@894).
- A `click` without a drag is a tap on that tab (input@3484).
- `contextmenu` is suppressed on the stage (input@5898). Mouse input uses pointer capture (input@3183) and a mouse-drag-to-scroll emulation with a 6 px threshold and a fling from the last 80 ms of velocity over 160 ms (cfg@4408, pan `f`).

Events into the state machine: `barPressed`, `thumbSampled`, `barPulled`, `barReleased`, `settled{index, spring}`, `returned`, `searchPressed`, `searchDragged`, `searchReleased` (dock@4497 to dock@4729). The post describes the same reduction (post@69687, post@69847).

### 3.3 The state machine

State per frame (dock `R`): `touch` (idle, pressed, dragging, settling), `x` spring (lens position in the row), `lift` (a phase machine, 3.4), `bar` (`phase` down or up, plus `pressed`, `grow`, `pull`, `light`), `presence` (pill and lens alphas, 3.6), `deform` (velocity squash, 3.5), and the search button's own `grow`, `pull`, `light`.

| Transition | What moves, with which spring | Source |
|---|---|---|
| Press on tab i | lift rises (`press` ζ1, r .25); lens x springs to tab i (`tap` ζ.8, r.45) if it isn't there; bar light rises; bar grows (`growRise` ζ.62, r.33) | dock `c`, cfg@5347, cfg@5454, cfg@2605 |
| Drag | lens x follows the finger, clamped to the row (`follow` ζ.75, r.3); bar pull follows the finger past the bar's bounds | dock `l`, cfg@5295 |
| Release | touch → settling; bar light falls; bar grow falls (`growFall` ζ.62, r.33); pull springs back (`growFall`); lift released | dock `d` |
| Settled after a drag | selected = nearest; x springs there with `snap` (ζ1, r.3, overshoot clamped) | dock `h`, cfg@5420 |
| Settled after a tap | x springs with `tap` (ζ.8, r.45) | dock `h`, input `k` |
| Bar phase | up while touched, `pressed` spring to 1 (`barPress` ζ.7, r.34); down once lift is falling or zero | dock `w`, cfg@5489 |

Scale of the lens: `1 + 0.5·(0.82·lift + 0.18·pressed)`, so 82 % of the lift-scale comes from lift and 18 % from the bar-press spring (cfg@4852, dock@4968). The whole bar swells on press to 1.047 × width and 1.073 × height (cfg@2670, dock@6999).

### 3.4 Lift and magnify: a rise that always completes

The lift value has phases resting, rising, peaked, waiting, falling (stretch@260 onward).

- Press: rising toward 1 with `press` (ζ1, r.25).
- Release while still rising: the phase becomes waiting, and the fall starts only once the value reaches `peakAt` 0.99 (cfg@5529). A quick tap therefore shows a full lift before it drops.
- `fallsIfPeakedOnRelease: true`: a release after the peak falls at once (cfg@5154 block).
- Fall uses `release` (ζ1, r.2, overshoot clamped) (cfg@5383).

The post's line is "If a controller is being touched we then magnify & lift the lens" (post@69926). Magnification itself is in the shader (6.3).

### 3.5 Drag: velocity squash

The lens squashes along its motion with constant area: scale x `1 + s`, scale y `1/(1 + s)` (dock@1434).

- Pace is speed over 1600 pt/s, smoothed with a 30 ms time constant, and decays when no new position arrives within 2.5 sample intervals (dock@838, cfg@5567).
- The target is `min(1, pace) · 0.275`; s follows on a spring (ζ.45, r.28), so it wobbles (cfg@5154 `deform`, dock@1233).
- A sudden drop in pace adds `9.125 · Δpace` to the rate, so the lens rebounds the other way when the finger stops (dock@1314).
- s is clamped to [−0.25, 0.375] and rests below 5e-4 (dock@1401, cfg@5567).
- While dragging, the squash reads the finger; otherwise it reads the lens spring (dock `T`).

### 3.6 The pill and the lens hand off

The resting pill (a dark capsule under the selected tab) and the lifted lens never both read at full strength (dock@1460 to dock@2569).

- While lift rises, pill alpha = `max(0, 1 − lift/0.5)`: gone by half lift (cfg@5333). The pill also grows toward the lens size with lift (dock `j`).
- Once lift falls back below 0.5, the pill returns over 150 ms on `cubic-bezier(0, 0, .58, 1)`, solved by 24 bisection steps (cfg@5201, dock@1634).
- The lens fades in at 0.2 per 1/120 s frame, about 42 ms (dock@2350, cfg@5792).
- On departure the lens alpha is `max(from · (1 − ease(t/150 ms)), strength)`, where strength is how far the lens is still scaled up. The lens can fade only as fast as it shrinks. It is removed after 150 ms once strength ≤ 0.01, or at 8 × 150 ms regardless (dock@2222, cfg@5201).

The post: "how visible the pill is" is one of the three outputs of each frame (post@69847).

### 3.7 Stretch past the bounds

When the finger leaves the bar's rectangle, the overshoot on each axis goes through a saturating rubber band, `(1 − 1/(d·k/L + 1))·L`, with L = 5 pt and k = 0.12 (stretch@1786, cfg@3215). The menu doubles both (pcc@8554). Two springs follow that target with `follow` (ζ.75, r.3).

The bar's drawn rectangle (stretch@2241):

- Its centre moves by half the pull; its width grows by |pull x| and its height by |pull y|.
- The cross axis thins: width is divided by `1 + |pull y|/h · 0.08` and height by `1 + |pull x|/w · 0.08`.

The lens scales with the bar once the bar exceeds its pressed size by more than 2 pt (`stretch.ease`, stretch@2526). On release the pull springs back with `growFall` (ζ.62), so the bar bounces once. The post: "If the user pulls past the bounds of the tab bar, we stretch the bar towards their finger" (post@70062).

### 3.8 Settling on the nearest tab

See 3.2 and 3.3: the nearest tab at release, `snap` spring after a drag, `tap` spring after a tap, momentum killed (post@70235).

### 3.9 The search button, and fusion with the bar

The search button has its own press (`grow` to 1.164 ×; rise ζ1 r.113, fall ζ.62 r.22, `fallsIfPeakedOnRelease: false`), its own rubber-band pull toward the finger, and its own light (cfg@4959, cfg@5022, dock `b`, `C`, `w`).

Fusion is a smooth union in the shader. For each pixel, `share = clamp(0.5 + 0.5·(dButton − dDock)/r, 0, 1)` and `d = mix(dButton, dDock, share) − r·share·(1 − share)` (sh@24804). This is the polynomial smooth-minimum, and normals, centres, sizes and lighting blend by the same share. The union radius r comes from the gap between the two shapes: `r = 24 · smoothstep((7.33 − gap)/7.33)` (cfg@3267, worker@74776).

At rest the gap is exactly 7.33 pt, so r = 0 and the shapes stand apart. Two things close the gap: pulling the bar toward the button (up to 5 pt), and pressing the button, which grows it by about 5.4 pt of radius. Either one grows a liquid bridge. The drop shadow uses the same union (sh@23294). The alert bubble joins the menu by the same rule (`alertMerge`, sh@20069).

### 3.10 Label tint: the selected glyph shows only inside the lens

The labels are rendered twice into one RG texture: R holds the outline icons and labels, G the filled icons and labels (strip@6096, strip@6340). Two colour pairs map the channels: `content` shows R in the glyph colour, and `revealed` shows G in the selected-glyph colour (tint@4292). The shader mixes content toward revealed by pill or lens coverage, per pixel (sh `iconsAt`, `filledAt` sh@28272).

So the filled, darker icon appears only where the pill or lens covers it, and a lens sliding across tabs reveals each filled icon as it passes. Under the lens, glyphs are also scaled by up to 1.2 × (`glyphLift`, cfg@2293, worker@72820).

### 3.11 Outlines, resting frame, demo panels

- Structure step: a static 2D-canvas drawing of the frame (struct, outlines@308). It shows capsule outlines (`roundRect` with radius min(w, h)/2) for the bar, search button, pill and lens, with the label strip clipped inside the bar and button shapes and scaled by the shown/rest ratio.
- The resting frame (restframe@258): the pill sits at the selected tab with alpha 1, and the lens has zero size and alpha 0.
- Controllers step (ctl): makes the controllers visible as coloured, labelled regions with scrolling grids. It adds a trail of the last 32 samples (alpha from 0.2 oldest to 1), position cards, and an event log that merges repeats ("Moved ×12").
- State machine step (sm): a 2 s tape of finger, lens x, lift, stretch, pill and scale, plus phase strips for touch, lift and bar (sm@767, cfg `panels`).

Every demo tears down and rebuilds on a colour-scheme or pixel-ratio change, and keeps the selected tab (`mount-step-CEhO3d6e.js`, scheme@597).

## 4. The dropdown: the post's contents menu

### 4.1 Anatomy

The DOM is server-rendered (post@76298 onward):

- A fixed root, 56 pt, top right, inset 16 pt plus the safe area (pcc@8568, post CSS `.post-contents`).
- `<button aria-label="Table of contents" aria-expanded aria-controls>`.
- A panel `<div id inert>` holding a scroller and a list (post@76377). The list has:
  - an actions `<ul aria-label="Post actions">`: Share, a `<button aria-live="polite">` (post@77137), and Visit author, a link;
  - `role="separator"` (post@78805);
  - `<nav aria-label="Table of contents"><ol>`: heading links indented by level (post@78828).
- An alert `<button aria-label="60 Hz warning">` with its panel. Both are hidden unless the page is judged capped at 60 Hz (4.8).

Sizes, from the measured iOS 27 record (pcc@4755): panel 250 pt wide, corner 32 pt, block padding 10. Its height is the content, capped at 59.5 % of the viewport. Rows are 42 pt tall (60 pt with a subtitle), with labels at 28 pt (64 pt with an icon) and a 21 pt icon at 40.2 pt. The highlight is inset 10 pt with a 21 pt radius. Separators are 1 pt with 24 pt insets and 10 pt gaps. Type is "Allo" 16.4 pt, sized to match SF Pro 17 pt's x-height (pcc `type`).

What draws: the worker canvas `.post-contents-glass`, `aria-hidden` (menu `W`). The DOM rows give hit testing, focus rings (`:focus-visible` outline 2 px, post@30263), and the accessibility tree.

### 4.2 Gestures

- Tap the button (movement ≤ 10 pt) to toggle (pcc@20741, menu@40881).
- Hold it 160 ms without straying and the menu opens under the finger (`buttonHeldOpen`, menu@13146, menu@29932, pcc@3878). Slide to a row and lift to choose it: press, drag, release.
- In the open panel, touch a row and hold 160 ms without scrolling more than 6 pt to arm it. The highlight then follows the finger. Within 42 pt of the panel's edge the list auto-scrolls at 120 to 800 pt/s (`holdScroll`, pcc@10404). Lifting chooses (menu `_t`, `vn`).
- Mouse clicks and wheel are handled separately. The wheel scrolls the list itself (menu@42398).
- Choosing a heading:
  - sets the hash and focuses the heading (with `tabindex=-1` and its outline suppressed, post CSS line `:is(h2,h3)[tabindex="-1"]:focus`);
  - scrolls smoothly, or instantly under reduced motion (menu@39358);
  - closes the menu.
- Visit opens a new tab. Share calls `navigator.share`, or copies the link and shows "Thanks for sharing!" for 1.6 s (menu@40397, pcc@12613).
- A page scroll that the menu did not start closes it (menu@35593; carried momentum from the menu's own scroll is excluded). So do a tap on the scrim and Escape.

### 4.3 The morph: one body buds out of the button

The panel grows out of the button as one shape; this is the site's fusion and fission (menu `dn`, menu@18069 to menu@22901, pcc@2677 to pcc@3864).

- **Progress.** `open` is a spring: opening ζ.75 r.35, closing ζ.8 r.49 (pcc@2677 block `motion`). It overshoots; the record measures a peak of 1.028 and a trough of −0.015 (pcc@2879). Values above 1 widen the panel.
- **Panel size.** It starts as an 18 pt seed at the button's centre (pcc@2926, menu@21793). Width runs from 18 to 250 with progress. Height is the width share times a lerp from the panel width to the panel height, so the seed is square and becomes the panel's aspect.
- **Panel position.** It starts at the button centre and moves to its rest corner by the same progress.
- **Kick.** A vertical kick spring starts with velocity `7 ×` the button-to-panel distance toward the panel and settles at 0 (ζ.64, r.38), so the panel overshoots downward and comes back (pcc@3431, menu@20618). The close kick is ζ.81, r.335.
- **Button.** It scales by press growth × lerp(1, 0.25, progress), travels 25 % of the way toward the panel centre (`travelReach`, menu@18797), and its icon fades as 1 − progress (menu@22901). The record also measures a 4 pt blur on the button at full open (pcc@3081); the runtime does not use it.
- **Content.** It scales from 1.305 to 1 on its own spring (ζ.75, r.61), anchored at top centre (pcc@3236). Its alpha follows progress, and it starts at a 4 pt blur (menu@22811). Closing, it is gone after 20 % of progress is lost (menu@19495).
- **Shadow.** It interpolates from closed (opacity 0.012, sigma 2.2, offset 7) to open (0.12 light or 0.18 dark, radius 24, offset 8) (menu@22858, pcc@11483).
- **Fusion.** The shader draws panel and button as two smooth-unioned shapes (3.9). While the panel is a seed inside the button they are one body; as it grows away, a bridge forms and thins; at full open the shrunken button lies under the panel's corner.
- **Reduced motion.** Open and close are instant (menu@38761).

### 4.4 Rows

The row highlight is a pill, not a lens: the measured iOS record says `lens: false` (pcc@3864). It fades in on ζ1, r.28 once a row is armed or the current section is shown. It slides between rows on ζ.9, r.15 (pcc@10864, menu@18312). The current section's row has `aria-current="location"` and takes the pill when the menu opens (menu@32997).

### 4.5 Panel flex and overscroll

The panel's four edges are four springs (release ζ.5, r.59, so they bounce), and they move toward a dragging finger or an overscrolling list (menu `rn`, pcc@4030, pcc@4321).

- The edge away from the button stretches up to 23.1 pt; the near edge up to 13.6 pt; the cross axis pulls in up to 3.44 pt (pcc@4030, menu@16878).
- Speed boosts the stretch: 375e-6 per pt/s, capped at 2 ×, decaying on ζ1, r.35 (menu@16314).
- The list rubber-bands with coefficient 0.55, using iOS's `(1 − 1/(x·c/d + 1))·d` (pcc@4418, menu@15314).

### 4.6 Reading-progress track

A capsule beside the button, 8 pt away and half the column wide, corner 28. It has a 22 × 6 pt groove whose fill tracks the article's progress (pcc@10966, pcc@11124). The shader draws it as a clearer material (`trackMaterial`) with its own shadow (sh@21940).

It dissolves as the menu opens: blur from 0 to 3 pt by 60 % open, and fade from 15 % to 90 % open (pcc@11331).

### 4.7 Share row

The label and icon crossfade on ζ1, r.25, with a 6 pt blur and 0.96 scale on both outgoing and incoming (pcc@12627).

### 4.8 The alert bubble

The page probes whether it is capped at 60 Hz: on iOS Safari it uses the pacer scroller and on Android a frame-gap worker (pcc@17418, menu `gt`). If capped, it shows a round alert button left of the contents button.

- **Appear.** A spring (ζ.72, r.5) with a blur from 6 pt to 0 (pcc@19392). At 90 % appeared, the triangle glyph gets one bounce: a kick of 4.5 on ζ.55, r.34 (pcc@19215, wire@31208).
- **Open.** The bubble morphs into a 248 pt text panel. Its rectangle lerps from the circle to the panel, and its corner from half the circle's height to 32 (wire@32447). The glyph is gone by 35 % open (pcc@19058). The text fades in once open reaches 90 % (pcc@19294).
- **Contrast.** Under `prefers-contrast: more` the glyph takes darker or brighter tints (pcc@19075, pcc@19170).

### 4.9 Measured, not consumed

The pcc record holds iOS 27 measurements that the runtime never reads (no other chunk references them):

- the menu's lensing blur (peak 2.7) and displacement peaks (−13.3 and −35 pt) (pcc@3745);
- the context-menu lift (×1.037 over 0.53 s) (pcc@4672);
- the content's first legible frame (0.147 s at scale 1.14);
- the button's close kick;
- a `glassFilter` parameter set: backdrop scale 0.25, inner and outer refraction heights and amounts, and a content-vibrancy colour matrix (pcc@7023);
- the fit errors (pcc@2139).

## 5. What the shader draws

Pipeline (sh@35989, sh@36541, worker `stage`):

- Stage 1 downsamples the scene into a pass texture, supersampled in gamma space (gamma 1.4 light, 0.8 dark).
- Stage 3 runs a separable Gaussian over it (sigma 10, frost cell 4).
- Stage 2 draws the controls.

The "scene" is the page re-render (8.2) or, in the demos, a grid underlay.

### 5.1 The bar body (and the menu panel)

`glassBody` (sh@18073) does the following, in order:

1. **Refraction.** Within 15 pt of the edge, the sample point moves inward along the normal by up to `radius · (edgeScale − 1)` (edgeScale 0.5), eased by `(1 − d/15)^2.5` (cfg@4473 `barLens`). The centre is not magnified (centerScale 1). The measured record says the native refraction starts 11 pt inside the edge, peaks at a 10 pt offset at the edge, and folds over at the rim (pcc@1891).
2. **Chromatic split.** None on the tab bar. The menu panel uses 0.22 (pcc@10927).
3. **Frost.** Sample the blurred texture (sh@15551).
4. **Tone.** Luma becomes `lift + gain·L − curve·L²`, then saturation is rescaled about the new luma (sh@16716).
   - Light: lift 151/255, gain 0.4, curve 0, saturation 0.9. Black maps to about 151 and white to 253.
   - Dark: lift 40/255, gain 0.85, curve 0.34, saturation 1.2 (cfg@272, cfg@670).
5. **Glow.** A 3 % brightening near the touch, falling off over 130 pt (`barGlow`, cfg@3544). The bar also lifts by 0.008 (light) or 0.043 (dark) while lit. The other press lights are zeroed in the config: `pressLight` tint drop, rim and lift are 0 (cfg@3586), and dock press gain is [1, 1, 1].
6. **Finish** (`glassFinish`, sh@9797):
   - Inner shade 0.019, peaking 7 pt below the top edge and gone by 18 pt; side shade 0.019 within 5 to 17 pt.
   - Specular: light straight down the vertical axis (angle 0, elevation 0); a 1.2 pt bevel; shine 0.125 (light) or 0.17 (dark) on the top arc and glint 0.125 or 0.17 on the bottom arc, power 3.
   - Sheen 0.075 or 0.055 within 6 pt, screen-blended (cfg@2827).
7. **Hairline.** Drawn outside the edge (sh@10926). It is subtractive: it darkens what is behind. It is 0.34 strong and 0.85 pt wide. Top and bottom are capped to 0.3 of the sides in light mode and removed in dark mode (edgeCap 0.3 and 0).
8. **Shadow.** Opacity 0.012, sigma 2.2, offset 7, close to invisible (cfg@3170).

The menu panel's material has its own measured numbers, and they are exactly a linear veil over a blurred, saturated backdrop (pcc@6176):

- Light: blur sigma 12, saturation 1.2, a 53.5 % veil of rgb(253, 253, 253). Over black that gives 0.535 × 253 = 135.4 against a measured 136; over white 135.4 + 0.465 × 255 = 254 against a measured 254.
- Dark: blur 8.4, saturation 1.3, a 65.1 % veil of rgb(49, 49, 49), giving 32 and 121 against measured 32 and 121.
- Rim (pcc@6405): 0.67 pt; darkens by 0.37 over light backgrounds in light mode only; top and bottom highlights 0.17 / 0.28 (light) and 0.21 / 0.23 (dark).

The bar's measured tone is lift 132.5 and gain 0.474 (pcc@653). The runtime uses 151 and 0.4 together with the 1.4 frost gamma.

### 5.2 The lens

`navColor` (sh@29479) does the following for the lens shape:

1. **Magnify.** The whole interior by 1/0.903 = 1.107 (cfg@2265).
2. **Edge pull.** Within a 36 pt bezel, `(edgeScale − 1)` with edgeScale 0.68, eased by `(1 − d/36)^8`, so the bend sits in the outer few points (cfg@2344, cfg@2385).
3. **Chromatic split.** Along the normal: `0.44 · (1.5 − 1)/0.5 · 6 pt · curve`, about 2.6 pt at the rim, in three separate per-channel samples of the page (sh@31376, cfg@2399).
4. **Sources.** Each sample is the composite of the bar's glass (or the page where the bar isn't), the pill and the revealed glyphs (`lensSource`, sh@29213). Inside the bar, the lens refracts the bar's own glass rather than the raw page.
5. **Finish.** The same as the bar's (5.1), weighted by strength.
6. **Edge line.** About 0.9 pt wide (`pixel · 0.9`, where `pixel` is device pixels per point), grey (0.7 light, 0.75 dark), at 0.45 × rim intensity; rim intensity is 1.6 in light mode and 0.4 in dark.
7. **Drop shadow.** A ring of opacity 0.06, radius 9, offset 6, drawn only outside the lens (cfg@2524).

The lens has no tint, no top highlight and no edge darkening: `glassTint`, `topHighlight` and `rimShade` are 0 (cfg@2257). Its "strength" (the scale progress) multiplies all of it, so a lens at rest scale is plain.

### 5.3 Where the numbers come from

The glass body numbers come from an iPhone 17 Pro simulator on iOS 27.0 (24A434). The subjects were `SwiftUI glassEffect(.regular)` on a 48 pt circle and 48 × 100 and 200 × 48 capsules, cross-checked against Safari's toolbar glass. The method was controlled backgrounds, simctl screenshots and numpy (pcc@215).

The menu motion was measured from Safari's tab-overview filter menu, with an instrumented SwiftUI toolbar `Menu` sampled on every display-link tick (pcc@2677). The fits:

- Body: within 1 to 2.6 levels of 255. Rim: within 1.75 to 5.1 levels (pcc@2139).
- Open progress: RMSE 3e-4 over 9 runs. The video fit gives response 0.341 and ζ 0.758, against the 0.35 and 0.75 used (pcc fit).

These are simulator readings, not device readings.

## 6. Frame pacing and presentation

| Piece | What it does | Source |
|---|---|---|
| Frame loop | In Safari (detected by `'GestureEvent' in window`), a `MessageChannel` ping schedules a `setTimeout` for the next sample slot: two per 120 Hz frame, phase-locked to the latest rAF timestamp, 1 ms lead. Elsewhere it uses rAF. It draws when dirty or animating, at most every 6.25 ms, parks after 400 ms idle, caps a step at 3 frames, and keeps 2 frames in flight. | pan@239, pan@333, cfg@4259 |
| Empty rAF loop | Runs while the loop is active so that Safari flushes scroll positions every tick. The post reports about 12.5 % more reads (80 to 90/s). | pan@709, post@52302, post@52434 |
| Pacer | An 8 px `overflow: scroll` element smooth-scrolls between 0 and 200 px every 250 ms, which per the post lets ProMotion reach 120 Hz | pace@89, pcc@17261, post@29646, post@52715 |
| Rate mark | A 1 px element on a `1s linear infinite` `translateX(1px)` animation, attached while boosting | post@19907, pan@502 |
| Page-wide boost | In Safari, on any `touchstart`, run the pacer and the rate mark; release 1 s after the last touch ends | islands@2922, islands@3478 |
| Glass presentation | `transferControlToOffscreen()` hands the canvas to a worker. WebGL2 there, with `desynchronized: true` on iOS (detected by UA), no antialias, premultiplied alpha, `powerPreference: high-performance`. | boot@7954, boot@7588, worker@67664, worker@67959 |
| Sub-point input | Scroll pads are scaled up by DPR and their containers down by its reciprocal; the post page sets `initial-scale=1/DPR, user-scalable=no` on iOS Safari and scales its own units | post@56183, post@5808, post@7482 |
| URL-bar throttle | `.post-contents` runs a scroll-timeline animation of `outline-color` between two transparent colours; the post says this stops Safari throttling reported scroll positions to 10 Hz during the URL-bar resize | post@28859, post@59764 |

## 7. Reduced motion, transparency, contrast, keyboard, screen readers

- **Reduced motion.** It is honoured in three places only:
  - The menu opens and closes instantly, its alert appears instantly, and anchor scrolls jump (menu@38761, menu@39358, pcc@22169).
  - The shaders demo stops its underlay drift (sh@39164).
  - The frame-comparison video demo (`mount-frame-comparison`).

  The tab bar's springs, squash, stretch and lift ignore it: no reduced-motion query appears in `dock`, `input`, `sm` or `stretch`, which was checked by searching every chunk. The display boost runs on touch regardless. Instant is the opposite of the owner's rule, under which a reduced-motion change is still a short tween.
- **Reduced transparency.** Not handled. No chunk and nothing in the HTML mentions `prefers-reduced-transparency`, and the glass is always drawn.
- **Contrast.** `prefers-contrast: more` changes only the alert glyph's tint (pcc@19170). `forced-colors` is not handled.
- **Keyboard, menu.**
  - It is a real `<button>`. Enter or Space opens the menu and focuses the current section's row, or the first row (menu@41499, `nn`).
  - Tab walks the rows; there is no arrow-key handling (the only `keydown` listener is for Escape, menu@27788).
  - Escape closes and returns focus to the button if focus was inside (menu@27852).
  - The panel is `inert` when closed (menu@38630), and `aria-expanded` is kept in step (menu@38269).
  - A keyboard click on a row (`detail === 0`) chooses it (menu@42909).
  - There is no focus trap. A page scroll the menu didn't start closes it.
- **Screen readers, menu.** The names come from the DOM: the button, the "Post actions" list, the "Table of contents" nav, `aria-current="location"` on the current section, and an `aria-live="polite"` share label. The visible text is canvas-drawn, and the DOM text is transparent but present (post@33644).
- **Keyboard and screen readers, tab bar demo.** Not operable. The controllers are `div`s with an `aria-label` but no role and no tabindex (input@409), and the canvas has no name.
- **Zoom.** On iOS Safari the post page sets `user-scalable=no` (post@5808). iOS Safari has ignored `user-scalable=no` since iOS 10, so pinch zoom should still work, but this was not checked on a device (https://webkit.org/blog/7367/new-interaction-behaviors-in-ios-10/).

## 8. Ledger: idiomatic or workaround, and what is known in production iOS Safari

"Workaround" means the facility as built depends on one of the three bypasses in section 1. "Idiomatic" means its logic is plain JS, CSS or a standard shader technique that would run unchanged in the DOM or in any canvas.

| Facility | Kind | Known in production iOS Safari (source) |
|---|---|---|
| Canvas presentation from a worker (120 Hz) | workaround | 118 FPS mean over 3 s of dragging versus 60 for pointer events, filmed on an iPhone 18 Pro at 240 fps (post@72345, post@74773). The author warns Apple may make the placeholder wait for the rendering pass (post@75294). Not checked on the owner's iPhone. |
| Scroll-container controllers | workaround | 80 reads/s from the polled loop, 90 with the empty rAF loop, 120 with the pacer (post@51760, post@52434, post@52715). Scroll events alone deliver 5 to 26/s during momentum (post@50303). A passive `touchmove` already fires at 120 Hz when momentum or snapping isn't needed (post@53315). |
| Pacer scroller and rate mark | workaround | Post only (post@52715). Gated to `ios && safari` (pcc@17418). |
| Page re-render as the glass backdrop | workaround | Post only (post@65627). Fonts are fetched and rasterised into a glyph atlas cached in IndexedDB (pcc@21941). The rebuild waits for the page to be still. |
| Frosted bar body over the re-render | workaround | Inherits the two rows above. |
| Lens refraction, magnification, chromatic split | workaround | Inherits the re-render and the canvas presentation. |
| Smooth-union fusion of bar and button | workaround as built | Inherits the canvas. A DOM equivalent would be one element changing shape, as 4.3 does in effect. CSS cannot union two blurred backdrops. |
| Device-pixel viewport, `user-scalable=no` | workaround | Post (post@56183) and the head script (post@5808). Zoom is presumed unaffected since iOS 10 (section 7). |
| Scroll-timeline anti-throttle | workaround | Post only (post@59764). |
| Momentum halt by toggling `overflow` | workaround | No device reading. |
| 60 Hz probe and alert | workaround | Probes the pacer on iOS (pcc@17418). |
| Springs as (ζ, response) | idiomatic | Same parametrisation as SwiftUI. |
| Lift that completes its rise | idiomatic | Motion logic only. |
| Pill and lens presence hand-off | idiomatic | Motion logic only. |
| Velocity squash (constant area) | idiomatic | Motion logic only. Driving it at 120 Hz in Safari needs 120 Hz input; at 60 Hz it still reads. |
| Rubber-band stretch with cross-axis thinning | idiomatic | Motion logic only. |
| Nearest-tab settle with snap and tap springs | idiomatic | Motion logic only. |
| Bar press swell 4.7 % / 7.3 % | idiomatic | Motion logic only. |
| Filled glyph revealed inside the lens | idiomatic | Done here with a texture; in the DOM it is a clipped duplicate icon layer. |
| Menu morph (seed, kick, content scale and blur, button shrink and travel) | idiomatic | Measured from iOS 27 simulator Safari (pcc@2677). Transforms, opacity and `filter: blur()` only. |
| Row highlight pill, hold-to-arm, hold-scroll | idiomatic | Measured from iOS 27 simulator (pcc@3864). |
| Panel edge flex and list rubber band | idiomatic | Measured from iOS 27 simulator (pcc@4030). Per-edge motion needs size or clip changes, not only a transform. |
| Menu material as blur, saturation and a veil | idiomatic | Matches CSS `backdrop-filter: blur() saturate()` with a translucent fill, with measured values (pcc@6176). Not checked on the owner's iPhone. |
| Share crossfade, alert appear and bounce | idiomatic | Motion logic only. |
| Menu accessibility layer | idiomatic | Section 7. |

## 9. What ran

- **Chromium.** One run, 2026-11-22 20:28 UTC: `~/.claude/guard/guarded --timeout 10 -- node probe.mjs chromium …`. The probe is `docs/tranches/BM/study/read/rida-ui/probe.mjs`.
  - Setup: five contexts with the "iPhone 15 Pro" descriptor's UA, 393 × 659, DSF 3 and touch. Requests outside `rida.dev` and `media.rida.dev`, and any `telemetry` path, were aborted.
  - Result: in every context `.post-contents[data-live]` was absent after 30 s, no page errors were recorded, and no frames were taken. The raw output is `readings-chromium.json` in the same folder.
  - Cause: not established. A likely one is that WebGL2 is unavailable in the worker without a GPU, but that is a guess.
- **Second run.** A diagnostic run that captures worker console output was refused: `[guarded] REFUSED: disk low (free=31G (set below 40G; clears above 60G))` at 15:29 local. It was not retried.
- **WebKit.** Not run.

So this note carries no engine reading of the live controls. Playwright WebKit is not Safari, and headless Chromium has no GPU; neither would have stood in for the iPhone.

## 10. Open

- The owner's iPhone, on current iOS 27 Safari:
  - Does the `OffscreenCanvas` placeholder still present at 120 Hz?
  - What does the menu's open spring feel like there, against native Safari's filter menu?
  - What does the pacer cost in battery and heat?
- Do CSS compositor animations alone run at 120 Hz in iOS 27 Safari? The post says they lift the display to 120 Hz only while something is scrolling (post@52715). Our transform and opacity springs depend on the answer.
- Why the menu never went live in headless Chromium. A run with the worker's console captured is owed once the disk allows.
- What the measured but unused records would add if consumed: lensing blur and displacement in the menu morph, the context-menu lift, and the first-legible frame.
