# The design references: the motion record (O-278, recorder 3)

Recorded 2026-11-12 by an Opus seat (claude-opus-5-5). Every number in the tables was read from the running page. Most come from `document.getAnimations()` (type, keyframes, duration, easing, delay, fill) and from the computed `transition-*` of each element in the control. The rest come from the computed values of the control's own nodes, frame by frame. The scripts are in `scripts/`. The raw readings are in `data/`:

- `explore.json`: inventory and page text.
- `dom.json`: demo structure.
- `rec-refs.json`, `rec-kf.json`, `rec-kf2.json`, `rec-kf3.json`, `rec-webkit.json`: the recordings.
- `island-*.json`: the Dynamic Island readings.
- `text-*.txt`: each page's text, which every quote in section 7 comes from.

`scripts/summarize.py` prints any recording as rows. One caveat: in `rec-refs.json` and `rec-webkit.json`, the per-frame series of long values (path `d`, long shadows) were stored truncated, so they show a change every frame. The recorder now stores the truncated value it compares, and `summarize.py` dedupes, so no row in this record rests on those series.

**The clock.** Playwright's fake clock is installed before load and resumed, so pages run normally. Before each trigger it is paused, and each frame then advances virtual time by a fixed step (`page.clock.runFor`). That drives `Date`, `performance.now`, timers and `requestAnimationFrame`, so JS springs (Framer Motion's Web Animations path, keyframes.js) step exactly. CSS animations, CSS transitions and Web Animations run on the document timeline instead. Each one is paused when first seen and seeked to its virtual age, so its phase error is at most one step.

Frames are therefore evenly spaced in virtual time whatever the capture cost. Each strip's file name gives its frame step, and a strip may keep every second or third frame so each frame stays legible.

**One exception.** The fake clock did not drive Framer Motion's layout loop on emilkowal.ski: the Dynamic Island stood still under it. That demo was read in real time instead. Its numbers come from a `requestAnimationFrame` loop reading the box and computed style (`probe-island.mjs`). Its strip comes from a CDP screencast: from the timestamped frames, the one nearest each 40 ms step was kept (`probe-screencast.mjs`), so its frames are even to within one screencast frame (about 16 ms).

**The runs.** Headless Chromium shell, 1440 x 900 at DPR 1, light scheme, no reduced motion, one browser per run and a new context per page, all through `guarded`. The machine's load ran between 9 and 326 during the runs, so wall-clock numbers (the island only) carry that noise. Virtual-time numbers do not.

**Safari column.** "WebKit: same" means the same case was recorded again in Playwright's WebKit build, under `guarded --exclusive webkit` (`run-webkit.sh`, no screenshots), and the same animation objects appeared with the same timing and end values. Playwright WebKit is not shipping Safari, and shipping Safari is unmeasured. "Unmeasured" means the case was not run in WebKit.

## 1. Which sites the records cite, and how often

`scripts/census.py` counts over the files the brief names:

- `BG/keystones/research/MOTION-sota.md`, `MOTION-corpus.md` and `DOCK-sota.md`
- `KS-MOTION-DISNEY.md` and `KS-AWWWARDS-DEMO.md`
- `BB/waves/BB.W-MOTION-CANON.md`
- every file under `AX/research/` and under `AW/audit/research/`

"URLs" counts citations, where one URL repeated in a JSON corpus counts each time. "Files" counts how many files cite the site. Shader and platform-documentation sites are listed separately, because they are not design references.

**Design and interaction references:**

| site | URLs | files | what is cited |
|---|---|---|---|
| apple.com, developer.apple.com | 141 | 9 | WWDC25 "Meet Liquid Glass" (219, 29 times), the Liquid Glass newsroom post (29), WWDC23 "Animate with springs" (16), GlassEffectContainer, HIG Materials |
| emilkowal.ski | 29 | 1 (named in 2 more) | `/ui/great-animations` (22), `/ui/good-vs-great-animations` (2), `/ui/origin-aware-animations`, `/ui/css-transforms` |
| joshwcomeau.com | 25 | 5 | `linear()` springs (9), spring physics (7), squash and stretch (4) |
| motion.dev | 36 | 5 | layout animations (14), the performance tier list (5) |
| kube.io | 21 | 3 | "Liquid glass in CSS and SVG" |
| benji.org | 13 | 1 | "Family Values" (12): Family's own design principles, by its designer |
| awwwards.com | 13 | 4 | collections (navigation, animation), two dock inspirations |
| m3.material.io | 11 | 5 | M3 Expressive motion, easing and duration tokens |
| rauno.me, interfaces.rauno.me | 6 | 1 (named in 3 more) | Web Interface Guidelines (3), `/craft/interaction-design` (2), `/craft/depth` (1) |
| nngroup.com | 6 | 3 | "Liquid Glass" and "Glassmorphism" critiques |
| animations.dev | 4 | 2 | Emil Kowalski's course (vocabulary, spring theory) |
| family.co | 0 | 5 | named, never linked: "the Family.co 'button morphs into tray' pattern", "Family.co fluid-interfaces" |
| linear.app, stripe.com, vercel | 1 each | 1 to 2 | `KS-AWWWARDS-DEMO.md` §2.3 names linear.app, vercel geist and stripe.com as the "designed product" pole |

Name mentions, counted across the same files: Emil Kowalski 36, Rauno 36, Family 38 (including "family.co" 19 times), Josh Comeau 18, Benji 13, Vaul 1, Sonner 1.

**Engineering and shader sites, cited for technique rather than design:** developer.chrome.com 118 (view transitions, `animate-to-height-auto`), developer.mozilla.org 133, web.dev 58, css-tricks.com 42 (the gooey effect 14), blog.maximeheckel.com 104 (69 of them one painterly-shader post; 7 spring physics), tympanus.net / Codrops 103 (metaballs, dithering), iquilezles.org 197, alexharri.com 24, evilmartians.com 15, smashingmagazine.com 15.

Outside those files, across all of `docs/`, the same picture holds: emilkowal.ski 30 URLs, benji.org 13, rauno.me 6, animations.dev 6. The only further sources are `AY/audit/hardening/H-research-dock-anim.md` (Emil) and `AX/waves/AX.W01-single-scalar-dock-morph.md`.

## 2. What "design class websites" is taken to mean

The owner's "heretofore mentioned design websites from many sessions and notes ago (design class websites)" is read as the interaction-craft references the records keep returning to as one group. `AX/research/dock-liquidglass-README.md:299` and `:397` name them together: "Family.co / Rauno Freiberg / Emil Kowalski / Benji Taylor practitioner". `KS-AWWWARDS-DEMO.md` §2.3 names "rauno.me/craft, emilkowal.ski" and "family.co". So the reading is:

- **emilkowal.ski**, with animations.dev, his course. Recorded here.
- **rauno.me** (`/craft`) and interfaces.rauno.me. Recorded here.
- **family.co**, with **benji.org/family-values** (Family's principles in its designer's words). Recorded here.
- **m3.material.io** and **Apple HIG / WWDC**. Recorders 1 and 2 hold these.

**Other candidates the records name:**

- joshwcomeau.com: the most-cited technique author, not a design site.
- motion.dev: a library's documentation.
- kube.io: a liquid-glass technique.
- linear.app, vercel geist and stripe.com: named once as product sites.
- nngroup.com: critique, not a design site.

Rauno's acknowledgments name Paco (paco.me), but no glass record cites it.

The two extra sites recorded, beyond the three the brief names, are benji.org/family-values (the most-cited craft page after Emil's) and interfaces.rauno.me (the most-cited Rauno page). Josh Comeau's pages teach technique that `MOTION-sota.md` already folds in (`linear()` springs, interruption), so they were not recorded.

## 3. emilkowal.ski: the motions in the two pieces

Pages: https://emilkowal.ski/ui/great-animations and https://emilkowal.ski/ui/good-vs-great-animations. Every demo is a live React component. The Dynamic Island, App Store cards and multi-step flow use Framer Motion. The toast is Sonner, the drawer is a Vaul recreation of Family's, and the dropdown is Radix. The site's own chrome animates almost nothing: links and buttons transition `color, background-color, border-color` for 150 ms `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's default), and each heading's anchor icon fades `opacity` 0 to 1 in 150 ms on hover.

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Dynamic Island | click Ring, Timer, Idle | the black pill grows from 100 x 28 to 150 x 28 (Ring) or 285 x 64 (Timer), and shrinks back (Idle); the content cross-fades through a blur | the box's layout size changes once; `transform: scale` carries the travel; `border-radius` is rewritten every frame (`31.96% / 114.29%` and so on) so the corners stay round under the scale; the content takes `opacity` and `filter: blur()` | Framer layout spring, wall clock: travel from about 25 ms, overshoot 3.5 % (Ring, scale 1.036) and 3.2 to 3.8 % (Timer), settled by about 815 ms; perceptual arrival near 170 ms (scale reaches 1.0) | the same spring shrinking: 8.5 % undershoot (scale 0.915), settled by about 815 ms | 0 | 3 at Idle (pill, motion wrapper, content); Timer content 20+ | FLIP: one layout write, then a JS spring on `transform` with a per-frame radius correction | same: same FLIP, same overshoot and settle (`island-realtime-webkit.json`) |
| E2 | App Store card expands | click a card; Escape closes | the card grows into a sheet and the description fades in | `transform` (non-uniform FLIP scale 0.768 x 0.408 counter-scale to identity); `opacity` on the description and on a backdrop | transform: about 450 ms, no overshoot; opacity: Web Animation 300 ms `cubic-bezier(0.25, 0.1, 0.35, 1)` | transform: 450 ms back; description opacity **50 ms `ease-out`**; backdrop 300 ms | 0 | the open card adds the description `p` and a backdrop | Framer shared-layout FLIP, opacity on WAAPI | same |
| E3 | Sonner toast | click "Add toast" | the toast rises into place; the older toast steps back behind it | `transform: translateY(100%)` to 0, `opacity` 0 to 1 on the `li` | 400 ms `ease` (CSS transitions) | (auto-dismiss, not captured) | 0 | 1 `li` per toast | CSS transitions on transform and opacity, data attributes per state | same |
| E4 | Multi-step flow | click Continue, then Back | the panel's height tweens from 328.8 to 280.8 px; the old step slides out 552 px left and fades, the new one slides in from the right | `height` (layout, every frame), `transform: translateX`, `opacity` | height: about 400 ms, no overshoot; slide: 480 ms, critically damped; opacity: Web Animation 500 ms on a `linear()` spring | Back mirrors it: height 280.8 to 328.8, slide the other way | 0 to 40 ms | 14 | Framer: a measured height animated directly, plus a direction-aware slide | same (height 328.78 to 280.78, slide ±552.2) |
| E5 | Family drawer (Vaul) | click "Try it out"; Escape | the sheet rises from below; the backdrop dims | `transform: translate3d(0, 110%, 0)` to 0; backdrop `opacity` | **200 ms** `cubic-bezier(0.165, 0.84, 0.44, 1)` | **250 ms**, same curve | 0 | sheet plus backdrop | CSS transitions | same |
| E6 | Origin-aware dropdown (Radix) | click Options; Escape | the menu grows from the trigger | `opacity` 0 to 1, `transform: scale(0.9)` to 1, `transform-origin` from `--radix-popover-content-transform-origin` | `@keyframes popoverEnter` 150 ms `ease-out` | `popoverExit` **100 ms** `ease-out` | 0 | 1 menu | CSS keyframes, origin from a custom property | same |
| E7 | Tabs, the clip-path version | click a tab | the dark highlight slides; the text under it turns white in the same frames | `clip-path: inset(0 74% 0 0 round 17px)` to `inset(0 0 0 79% round 17px)` on a duplicate tab row | 250 ms `ease` | (the next click) | 0 | **+24**: the whole tab row is rendered twice, once inverted, with the clip on the copy | CSS transition on `clip-path` | same |
| E7b | Tabs, the plain version (the "before") | click a tab | the highlight moves, and the text colour changes on its own clock | `color` 150 ms `cubic-bezier(0.4, 0, 0.2, 1)` while the highlight moves separately | 150 ms | | 0 | 5 per tab | two unrelated clocks: the mismatch the article teaches | unmeasured |
| E8 | Two spinners | idle | one turns slowly, one fast | `transform: rotate` 0 to 360 deg | `@keyframes` **2.5 s** and **0.85 s** `linear`, infinite | | | 2 per SVG | CSS keyframes | unmeasured |
| E9 | Skeleton | idle (loading) | five grey bars breathe | `opacity` 1, 0.5, 1 | 2 s `cubic-bezier(0.4, 0, 0.6, 1)`, infinite (Tailwind `animate-pulse`) | | | 5 | CSS keyframes | unmeasured |

Strips (`strips/`):

- `emil-island-ring-step120ms.png`, `emil-island-timer-step120ms.png`, `emil-island-idle-step120ms.png`: E1, 0 to 480 ms, screencast.
- `emil-cards-step250ms.png`, `emil-cards-out-step250ms.png`: E2.
- `emil-toast-step160ms.png`: E3. The dry run left a first toast, so this strip also shows the stack stepping back.
- `emil-steps-continue-step240ms.png`, `emil-steps-back-step240ms.png`: E4.
- `emil-drawer-step150ms.png`, `emil-drawer-out-step150ms.png`: E5.
- `emil-origin-dropdown-step75ms.png`, `emil-origin-dropdown-out-step75ms.png`: E6.
- `emil-tabs-clip-step80ms.png`: E7.
- `emil-tabs-plain-step125ms.png`: E7b.
- `emil-skeleton-step600ms.png`: E9.

What each one says, and why it feels light:

- **E1.** The island says "this is one object changing state", not a swap. It feels light because only the transform travels: the box is laid out once, the corners are corrected so the pill never looks squashed, and the content blurs across rather than popping.
- **E2.** The card says "this item opened in place, and closing puts it back". It feels light because the sheet grows from the card's own rectangle, and the text leaves in 50 ms on close, before the shape returns.
- **E3.** The toast says "new, and the older ones are still here". The 400 ms `ease` is slower than the site's other motions, and Emil's text says on purpose ("to make it feel more elegant"). It is one layer per toast.
- **E4.** The flow says "forward" or "back" by the direction of the slide, and "this step is shorter" by the height tween. It is the one demo here that animates `height` every frame. The article accepts that cost for a single panel.
- **E5.** The drawer says "this came from below and goes back there". It feels light because it enters in 200 ms and leaves in 250 ms on a strong ease-out, with no bounce.
- **E6.** The dropdown says "I came from this button". It feels light because it starts at 0.9, not 0, and leaves faster than it came.
- **E7.** The tabs say "this one is selected" with one shape, not two. It feels light because text colour and highlight cannot drift apart: they are the same clip. The cost is a duplicated row, which matters for the "no added wrappers" rule.
- **E8.** The spinners are the article's own lesson that speed reads as effort: the fast spinner looks like hard work. It is a pure compositor loop.
- **E9.** The skeleton says "content will land here" without text. It is one opacity loop on five bars.

## 4. rauno.me and interfaces.rauno.me

Pages: https://rauno.me/craft/interaction-design, https://rauno.me/craft/depth, https://rauno.me/craft, https://interfaces.rauno.me/. Almost every illustration in the two essays is a screen recording, so the live controls are few. Site chrome: links `color` 100 ms `ease-out`; the minimap tracker `background, border-color, opacity` 200 ms `ease-in-out`; the page's side nav fades in once on load (`@keyframes fade` 500 ms `ease`, `opacity` 0 to 1).

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Radial menu | press and hold anywhere in the demo; release | the ring of six icons appears under the pointer; the hint text goes | ring present; hint `opacity` to 0 | **no motion**: the ring is there at the first sample after pointer-down | ring: `opacity` 1 to 0 by Web Animation 100 ms `linear`, with `transform: scale` 1 to 0.96 over the same 100 ms (JS); hint: `opacity` 0 to 1, 250 ms `ease` | 0 | 32 in the demo (ring, six items, icons) | appear-instantly, leave-with-a-fade | same |
| R2 | Interface guidelines (no motion on the page) | | | | | | | | text only | |

Strips:

- `rauno-radial-step80ms.png`: R1 press. Every frame is the same, which is the point.
- `rauno-radial-out-step40ms.png`: R1 release, 0 to 520 ms.

**R1.** The ring says "I am where your finger is; choose by direction". It feels light because, as Rauno writes of the macOS context menu, a high-frequency menu appears without motion and only fades out. The exit is 100 ms and the scale moves only 4 %.

## 5. family.co and benji.org/family-values

**family.co** (https://family.co/) is a marketing page: its product motion is all video (`send.mp4`, `swap.mp4` and others). Its live controls:

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 | Nav dropdown | hover "Developers" | the panel grows in under the link; the link's plate fills | panel `opacity` 0 to 1 and `transform: scale(0.96) translateZ(1px)` to `translateZ(1px)`; link `background-color, color` | panel **100 ms `ease`**; link 200 ms `ease` | the same, reversed: 100 ms and 200 ms | 0 | 24 (the panel is always in the DOM, hidden) | CSS transitions | same |
| F2 | "Download on iOS" | hover | the black button darkens slightly; the Apple glyph does not move | `background-color` rgb(23, 23, 23) to rgb(18, 18, 18) | 100 ms `ease` | 100 ms `ease` | 0 | 4 | CSS transition | unmeasured |
| F3 | "Follow Family" | hover, then press | hover lifts the button to 1.02; pressing settles it back to 1 | `transform: scale` | hover 100 ms `ease` to 1.02; press 100 ms `ease` to 1 | release: 100 ms back to 1.02 | 0 | 5 | CSS transition on hover and `:active` | same |
| F4 | "Watch the video" | hover | the card's edge shadow deepens | `box-shadow` | 100 ms `ease` | 100 ms | 0 | 24 | CSS transition | unmeasured |
| F5 | Testimonials | idle | the row of cards drifts left forever | `transform: translateX(0)` to `-50%` | `@keyframes` **120 s** `linear`, infinite | | | 294 | CSS keyframes on a doubled row | unmeasured |
| F6 | Loading shimmer in the feature cards | idle | a light band crosses placeholder text | `background-position` 100 % to -100 % | 1.2 s `linear`, infinite | | | | CSS keyframes on a paint property | unmeasured |
| F7 | Hero phone frames | the page's own carousel | the frames slide and zoom | `transform` 1 s `cubic-bezier(0.19, 1, 0.22, 1)` (expo out); a scale from 1.25 to 1 | 1 s | | | | CSS transitions | unmeasured |

Strips:

- `family-nav-dropdown-step40ms.png`, `family-nav-dropdown-out-step40ms.png`: F1.
- `family-download-step30ms.png`, `family-download-out-step30ms.png`: F2.
- `family-follow-press-step30ms.png`, `family-follow-press-out-step30ms.png`: F3.
- `family-watch-step30ms.png`, `family-watch-out-step30ms.png`: F4.

What each one says, and why it feels light:

- **F1.** The panel says "this menu belongs to this word". It feels light because it moves only 4 % in scale, in 100 ms, both ways.
- **F2.** The button says "pressable" by a change you barely see: 5 levels of grey in 100 ms. It is one paint property.
- **F3.** Hover raises the button and press puts it back: the press is the lift ending, not an indent. It is one transform, 100 ms, no overshoot. This bears on the press-shrink question in the brief.
- **F4.** The card says "this opens something" through its edge alone. It is one shadow layer.
- **F5.** Large-element idle: the wall of praise is alive but slow enough (120 s) that you never watch it move.
- **F6.** It says "loading", but on `background-position`, which repaints every frame. That is the cost to avoid.
- **F7.** The hero's one long, decelerating move, 1 s on expo out, is reserved for the page's single protagonist.

**benji.org/family-values** (https://benji.org/family-values) shows Family's motion as phone recordings: `styles_player` elements that fade in over 1 s `ease`, with 1x and 0.5x playback buttons. Three small pieces on the page are live, read from the inventory and not driven:

- An annotation underline drawn on with `stroke-dashoffset` 12.7 to 0 px in about 131 ms `ease-out` (the rough-notation library).
- The "Delight" pointer demo, whose dot transitions `width, height, opacity` 600 ms `ease-out`. Those are layout properties.
- A placeholder that breathes `opacity` 0.2 to 0.4 over 1.5 s `ease-in-out`.

The page's value here is its words (section 7) and its catalogue of the app's moves: trays that "emerge from within other components like buttons", tray heights that always differ so a step is visible, text that morphs by shared letters ("Con" in Continue and Confirm), a spinner that travels to the tab where the pending item now lives, and tab changes that move toward the tapped side ("We fly instead of teleport").

## 6. keyframes.babb.dev: the colourful icons and the control buttons

Served by the audit server at http://127.0.0.1:4411/ (it answered: a `vite preview` of keyframes' build), recorded live. I also read `~/Programming/keyframes.js` (read-only, HEAD e5c12919) for the mechanism behind what the page showed. The dock on this page is glass-ui's own dock, so rows K1, K2 and K4 measure glass as keyframes consumes it.

**The colourful icons.**

- **Dock and menu scene glyphs.** These are live miniatures of each scene, `demo/scenes/*/…Mini.vue`. Each mini is a few spans, or one SVG path plus a ball, painted in the scene's own crayon colour. The easing mini's violet is `hsl(248, 88%, 71%)`, and the rainbow family is `--rainbow-red … --rainbow-cyan` in `demo/styles/design-idioms.css`. Each mini plays the scene's real motion through keyframes.js while its scene is live (`useLiveMini`), and rests at its first pose otherwise.
- **Asset icons.** The static icons in `assets/icons/*.svg` take their colour from tokens, for example `stroke="var(--color-progress, currentColor)"` and a `--rainbow-green` dot.
- **The Play button.** A rainbow disc: class `rainbow-pastel`, which becomes `rainbow-vivid` while playing (`TransportDock.vue:80`).

| # | name | trigger | what changes | properties | in: duration, easing | out: duration, easing | delay | DOM nodes | technique | WebKit |
|---|---|---|---|---|---|---|---|---|---|---|
| K1 | Dock fission (chrome dock and transport dock) | hover the resting glyph | the 56 px capsule opens into the labelled dock (269 px, or 149 px for transport); the resting glyph fades | glass-dock `width` 56 to 269 px in **one frame** (a cut); `scale` x 0.25 to 1 over 250 ms (the counter-scale); `border-radius` 50 % to 16 px in **one frame**; the glyph's `opacity` 1 to 0 over 250 ms; the labels' row `inline-size` (layout) 252 to 245 px on the 0.21 s spring | about 250 ms, settled by 325 ms, no visible overshoot | not captured: the dock lingers by dwell (O-275) for longer than the 500 ms recorded | 75 ms (the first frame of travel) | 25 in the chrome dock | a JS FLIP on `scale` over an instant layout change. The radius is not corrected under the scale, unlike E1, and one leg (`inline-size`) is layout per frame. | unmeasured (glass's own; the release records cover it) |
| K2 | Scene menu | click the Scene trigger; Escape | the list grows down from the trigger; the chevron turns | panel `opacity` 0 to 1 and `filter: blur(2px)` to 0 (bezier); `scale` 1.018 x 0.907 to 1 and `translate` 0 -8 px to 0 (spring `linear()`); chevron `rotate` 0 to 180 deg | 200 ms (opacity, blur: `cubic-bezier(0, 0, 0.2, 1)`; scale, translate: spring `linear()`); chevron 120 ms spring `linear()` | `@keyframes glass-reveal-out` 120 ms (opacity to 0 by 60 %, blur back, scale back); chevron 120 ms back | 0 | panel plus 7 rows | CSS transitions and one keyframes exit | unmeasured |
| K3 | Play button, hover | hover | a soft highlight wakes on the disc | `opacity` 0 to 0.14 on the button's highlight layer (300 ms `cubic-bezier(0.4, 0, 0.2, 1)`); `--specular-y` 50 % to 58.6 % (200 ms) | 300 ms | 300 ms back | 0 | 3 (button, svg, path) | a specular layer that tracks the pointer: the gleam `restraint.md` rules out | unmeasured |
| K4 | Play button, press and release | pointer down, then up | down: the disc dims and squashes slightly; up: the squash deepens, then the disc returns and the dock swaps play for pause | `filter: brightness(1)` to 0.96 (about 125 ms); `scale` 1 to 0.998 x 0.986 (down), then to **0.990 x 0.936** within 25 ms of release, held to about 150 ms, back to 1 by 275 ms; then a **View Transition** of the dock group (`-ua-view-transition-group` 250 ms `ease`, `plus-lighter` cross-fade) as the transport widens 149 to 268.5 px for the scrubber | press 120 ms spring `linear()` | release about 275 ms | 0 | 3, then 25 (the dock re-renders) | a **non-uniform** squash (about 0.99 x 0.94) on a spring, plus a brightness dip; the glyph swap is a `v-if` (`<Pause v-if>` / `<Play v-else>`) hidden inside a whole-dock view-transition cross-fade | unmeasured |
| K5 | Live scene glyph (the cube) | idle while the scene plays | the 20 px cube in the dock turns in 3D and bobs | `transform: matrix3d(…)` on a layer (a full turn in about 1.2 s); `translateY` 4.1 to 5.0 to 4.66 px | continuous while live; JS (keyframes.js engine on rAF) | stops and rests when not live | | 11 (stage, 3 layers, 6 faces) | the scene's own animation, played at icon size | unmeasured |

Strips:

- `kf-chrome-dock-hover-step75ms.png`, `kf-transport-dock-hover-step50ms.png`: K1, 0 to 500 ms. The `-out` strips show the dwell (nothing moves in 500 ms).
- `kf-scene-open-step75ms.png`, `kf-scene-open-out-step75ms.png`: K2.
- `kf-play-hover-step25ms.png`, `kf-play-hover-out-step25ms.png`: K3.
- `kf-play-press-step25ms.png`, `kf-play-press-out-step25ms.png`: K4, down and release.
- `kf-play-click-step50ms.png`: K4 as a click.
- `kf-scene-mini-live-step100ms.png`: K5, 0 to 1.2 s.

What each one says, and why it feels light:

- **K1.** The capsule says "there is more here" and opens from its centre. The travel is compositor, but the width and the corner cut in one frame. With an uncorrected radius under `scale`, the corners stretch during the 250 ms. E1 is the cure for both: one layout write and a corrected radius.
- **K2.** The list says "these come out of this trigger", and the chevron says open or closed. It feels light because it grows only 8 px and 9 %, and it leaves in 120 ms. The blur is a second effect layered on the fade.
- **K3.** "Pressable", said by a gleam. Restraint says remove it, and a plain fill tween (F2) would carry the same intent.
- **K4.** "Pressed, and it took". The squash is non-uniform, which is what O-285 asked to replace with a uniform shrink. The release also starts a whole-dock view transition, so the glyph change is a cross-fade of two snapshots rather than a morph of the glyph.
- **K5.** The icon is the scene, alive. This is the owner's praised piece: colour and motion carry the identity, and it moves only while its scene plays.

## 7. Principles, in the authors' own words

**Emil Kowalski, "Great Animations"** (https://emilkowal.ski/ui/great-animations):

- "Changes in web apps often occur instantly, which makes the experience feel artificial and unfamiliar, since nothing in world around us disappears or appears instantly."
- "The best type of easing for this purpose is ease-out. It starts fast and slows down at the end, which gives the impression of a quick response, while maintaining a smooth transition. Your animations should also usually be shorter than 300ms."
- "It's easy to start adding animations everywhere. The user then becomes overwhelmed and animations lose their impact."
- "Before you add an animation, you should also consider how often the user will see it."
- "A good tip here is to never animate keyboard initiated actions."
- "you should try to animate with transform and opacity as they only trigger the third rendering step (composite), while padding or margin triggers all three (layout, paint, composite)."
- "A hardware-accelerated animation will remain smooth, no matter how busy the main thread is."
- "A CSS transition can be interrupted and smoothly transition to a new value, even before the first transition has finished."
- "This component animates opacity only when the user prefers reduced motion."
- On Sonner: "It's a bit slower than usual and uses ease as the easing type rather than ease-out to make it feel more elegant."
- On the Family drawer: "The opacity change in exiting and entering items works well with the height animation."
- "I like to review my work the next day because I can see it with fresh eyes and notice imperfections I didn't see before."

**Emil Kowalski, "Good vs Great Animations"** (https://emilkowal.ski/ui/good-vs-great-animations):

- "When we click on a button that opens a dropdown, we expect the dropdown to animate from where the button is. This feels natural, it then doesn't appear out of nowhere, it has a clear origin."
- "Easing is the most important part of any animation."
- "you should default to ease-out in most cases."
- "The built-in easing curves in CSS are usually not strong enough, which is why I almost never use them."
- "ease is an exception as it works well for basic hover effects like changing background color, but anything else requires a custom curve for the right feel."
- "tying visual changes directly to mouse position can feel artificial, as it lacks motion."
- "nothing in the real world changes instantly. There are cases where an instant change on the web is better, but this isn't one of those cases."
- "If this was a functional graph, in a banking app for example, no animation would be better."
- "using clip-path in this case is what will make the color transition feel right."

**Rauno Freiberg, "Invisible Details of Interaction Design"** (https://rauno.me/craft/interaction-design):

- "Interaction design is an artform to make experiences that fluidly respond to human intent."
- "Great interactions are modeled after properties from the real world, like interruptability."
- "Notice how the gesture retains the momentum and angle at which it was thrown."
- "Truly fluid gestures are immediately responsive."
- "It feels a lot better by feeling the scale delta applying immediately, and then performing an animation past a given threshold."
- "Through motion this helps establish a relationship between the audio player and its source."
- "if we for a moment consider the interaction frequency being hundreds of times a day, it does start to feel more like cognitive burden after seeing the same animation for the hundredth time."
- "I removed motion from core interactions and suddenly felt like I was moving much faster."
- "Interestingly enough, the menu subtly fades out. On closer inspection, the selected item briefly blinks the accent color (pink) to provide assurance that the element was successfully selected."

**Rauno Freiberg, "Designing Depth"** (https://rauno.me/craft/depth):

- "our instruments are time and artificial delays to be leveraged in a way that feels true to motion found in nature."
- "it makes sense to prioritise transitioning near the trigger location (Search entry button) to promptly communicate that the interface understood you."
- "we can sometimes stagger the behavior of sibling items that look similar ... The interface does not feel slower as a result."
- "The Dock not being blurred along with the Home Screen and specifically sliding off-screen while maintaining its opacity communicates that it retains interactivity and can be brought back with a swipe gesture."

**Rauno Freiberg, "Web Interface Guidelines"** (https://interfaces.rauno.me/):

- "Animation duration should not be more than 200ms for interactions to feel immediate"
- "Animation values should be proportional to the trigger size: Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8. Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so"
- "Actions that are frequent and low in novelty should avoid extraneous animations: Opening a right click menu; Deleting or adding items from a list; Hovering trivial buttons"
- "Looping animations should pause when not visible on the screen to offload CPU and GPU usage"
- "Switching themes should not trigger transitions and animations on elements"
- "Font weight should not change on hover or selected state to prevent layout shift"
- "Hover states should not be visible on touch press, use @media (hover: hover)"
- "the native macOS right click menu only animates out, not in, due to the frequent usage of it."

**Benji Taylor, "Family Values"** (https://benji.org/family-values):

- "Simplicity ensures accessibility, fluidity maintains continuity of experience, and delight fosters meaningful connections."
- "Staticity can also leave a product feeling lifeless, which we didn't want. A lifeless product feels like a dead product, and a dead product feels uncared for."
- "We didn't plan to add motion for the sake of it, but rather to create a seamless journey through the entire app."
- "They can manifest either as standalone entities on top of any app content, or emerge from within other components like buttons."
- "To prevent any confusion during transitions, each subsequent tray is designed to vary in height. This makes the progression or change unmistakably clear."
- "Each animation serves a purpose from an architectural perspective, aiding users in understanding their path from A → B."
- "If you tap on a tab on the left, the transition moves left, and vice versa for the right. This creates a subtle yet helpful sense of space and movement. We fly instead of teleport."
- "This effect is achieved through a system we created that leverages shared letters — such as the "Con" in both words. By animating the change, we reinforce the user's awareness of their action."
- "One effective way to ensure fluidity is to avoid redundant animations."
- "A pet peeve of mine is when a component already visible on the screen unnecessarily duplicates itself during an animation."
- "Mastering delight is mastering selective emphasis."
- "Delight tends to increase as the frequency of feature usage decreases."
- "our ability to introduce delight anywhere depends on achieving a consistent level of polish everywhere."

## 8. What the readings add up to, for the analyst

Facts only. The study's proposals come from the analyst and the spec.

1. **Exit faster than entry, or with less motion.** E2 text leaves in 50 ms against 300 ms in. E6 is 100 ms out against 150 ms in. R1 appears with no motion and leaves in 100 ms. F1 is symmetric at 100 ms. E5 is the one exception: 250 ms out against 200 ms in, for a sheet.
2. **Small amplitudes.**
   - Enter from 0.9 (E6), 0.96 (F1), 0.96 on the way out (R1), 8 px (K2).
   - Hover lift 1.02 (F3).
   - A hover colour change of a few grey levels (F2).
   - Nothing enters from 0.
3. **Durations.**
   - Hover and colour: 100 to 200 ms.
   - Overlays: 100 to 250 ms.
   - Size and shape: 250 to 450 ms.
   - The only spring that overshoots is the Dynamic Island: 3.5 % growing, 8.5 % shrinking, settled near 800 ms, arriving near 170 ms.
   - Loops: 0.85 to 2.5 s for loading, 120 s for ambient.
4. **Size changes that do not snap.**
   - E1: one layout write, then a transform with per-frame radius correction.
   - E4: a measured height tween, which is layout per frame and accepted for one panel.
   - K1, glass's dock as consumed by keyframes: width and radius cut in one frame under a 250 ms scale, with the radius uncorrected.
5. **Press.** F3 treats press as the hover lift ending (1.02 to 1, 100 ms, uniform). K4, glass in keyframes, squashes non-uniformly (about 0.99 x 0.94) and dims `brightness` to 0.96. Rauno's guideline names 0.96 to 0.9, uniform.
6. **One shape for two meanings.** E7's clip-path tab keeps highlight and text colour on one clock, at the cost of a duplicated row (+24 nodes).
7. **Icons that grow, morph or draw.** None of the recorded design sites morphs an icon on hover; their icons are static glyphs. The closest pieces are the drawn-on annotation (stroke-dashoffset, about 131 ms, benji.org) and keyframes' live scene miniatures (K5). The morphing icon on hover is Google's (recorder 1), not these authors'. Their stated rule is the opposite caution: "Hovering trivial buttons" is on Rauno's list of frequent actions to keep free of extraneous animation.
8. **Engines.** Every technique recorded in both engines ran the same way in Playwright WebKit: CSS transitions on transform, opacity and clip-path, CSS keyframes, Web Animations, and Framer's JS FLIP. Shipping Safari is unmeasured.
