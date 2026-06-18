# BC viz research — grid-simple

> Per-viz SOTA re-modernization research. RESEARCH ONLY — zero `src/` edits.
> Viz: `grid-simple` (BC.W-GRID-SIMPLE) — the SIMPLE static crisp grid, the
> abrogation target for the current blurry grid background.
> User defect (USER-DEFECTS.md §E, verbatim): "**The new grid background is a
> blurry mess → TOTALLY ABROGATE this. It is a SIMPLE grid, like in keyframes.js.
> Consistent + larger, NOT displayed in the card on pages like this.**" Also §E:
> "REMOVE the teal-on-navy reference entirely" and (the WTF-clip note) "a
> clipped/odd element with a grid background ('WTF is this — and it's clipped?')."

---

## 0. Verdict in one line

`grid-simple` is **NOT a procedural animation and must NOT become one** — it is the
deliberate KISS *foil* to the liquid paper-grid (`BC.W-VIZ-PAPERGRID`, the sibling that
DOES wave via the `curlFBM` shader). The user condemns a **blurry, oddly-spaced,
in-card** grid; the fix is to ABROGATE the current `.story-bg-grid` recipe + the
`--story-grid-*` tokens and re-express ONE crisp, device-pixel-aligned, evenly-spaced,
LARGER two-tier line grid — the exact keyframes.js `EditorShell.vue .grid-background`
reference (fine 1rem + major 5rem at 3% / 11% of `--foreground`) — drawn as a **full-bleed
PAGE background, never clipped inside the rounded card box**. The "blurry mess" is two
concrete bugs: (1) the grid sits at `-z-10` INSIDE `.story-hero { overflow: hidden;
border-radius }` so it is **clipped to the card** (the "displayed in the card" / "WTF
is this clipped" defect), and (2) it reads THROUGH the `wash`/`quiet` glass card whose
`backdrop-filter: blur()` **blurs the grid lines** (the "blurry mess" defect). The fix is
pure CSS — **no WebGPU, no canvas, no shader, no interaction** (it is static by
definition). The WebGPU-everywhere mandate (§E) does NOT bind here: a grid that does not
animate has nothing to compute. This is the simplest viz in the suite, and its discipline
is *restraint*.

---

## 1. The reference, read precisely (the binding acceptance target)

The user names it: "a SIMPLE grid, like in keyframes.js." That reference is GROUNDED in
the sibling repo, `keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue`
(`:119-125`) + its tokens in `demo/@/styles/design-idioms.css` (`:298-301`):

### 1.1 The keyframes.js `.grid-background` recipe (the literal reference)
```css
/* EditorShell.vue:119-125 — a fixed full-viewport page background, NOT a card */
.grid-background {
    background-image: url("data:image/svg+xml,…viewBox='0 0 2 2'…
        path d='M1 2V0h1v1H0v1z' fill-opacity='0.10'…");
    background-size: 1rem;
}
:where(.dark) .grid-background {
    /* same path, fill='white' fill-opacity='0.08' */
}
```
The mount: `<div class="grid-background pointer-events-none fixed inset-0 h-dvh w-dvw">`
(`EditorShell.vue:6-7`). It is a **`position: fixed; inset: 0` page wash** — explicitly
NOT inside any card, NOT clipped, NOT under a glass plate. That is the user's "NOT
displayed in the card on pages like this."

The SVG path `M1 2V0h1v1H0v1z` decodes to an L-shaped 1px stroke on the right+bottom edge
of a 2×2 unit cell — i.e. a crisp single-pixel grid tile repeated at `background-size:
1rem`. One uniform pitch, one strength, dead simple.

### 1.2 The two-tier token half (the LARGER, evenly-spaced version)
keyframes.js also tokenizes the richer two-tier engineering-graph-paper rhythm
(`design-idioms.css:298-301`, the comment names it "the GRID brand pillar, finally
tokenized"):
```css
--graph-pitch:        1rem;   /* fine lines */
--graph-major:        5rem;   /* bolder major lines (5× the fine pitch) */
--graph-opacity:      3%;     /* fine line strength, mixed over --foreground */
--graph-major-opacity: 11%;   /* major line strength — DELIBERATELY > 10% legibility floor */
```
The recorded calibration is load-bearing: the major opacity is "DELIBERATELY held
STRICTLY ABOVE the 10% legibility floor" (`design-idioms.css:285-290` — `8% < the gate
floor and would RED`), and the fine pitch "dropped 5% → 3% … the user's 'less busy
substrate' verdict" (`:283-288`). These are the exact magnitudes the user means by
"consistent + larger."

### 1.3 What the reference is NOT
- NOT animated. NOT a shader. NOT interactive. A static raster, one compositor-cached
  paint.
- NOT blurry — the lines are integer-px on a rem-pitch, no filter touches them.
- NOT teal-on-navy, NOT colored — a single `color-mix(… var(--foreground) N% …)` warm-ink
  line, re-tinting with the theme by construction (§6 — the teal-on-navy reference is
  REMOVED entirely per §E).
- NOT in a card — a full-bleed page background behind the content, gridding the whole
  viewport.

The gestalt the user wants: **a calm, crisp, evenly-ruled graph-paper page background —
the foil to glass, the brand "math/grid" pillar — done with restraint.**

---

## 2. Current state — what exists, and exactly why it reads as a blurry in-card mess

### 2.1 The two parallel static-grid systems (both must be reconciled)
There are TWO grid recipes at HEAD, both static CSS gradient stacks — the audit
(`research/viz-codebase.md §7`, `:194-258`) maps both:

| system | source | pitch | strength | mounted | defect |
|---|---|---|---|---|---|
| **demo story grid** (`.story-bg-grid`) | `demo/stories/story-hero.css:283-296` + `--story-grid-*` `:14-16` | 28px minor + 112px major (×4) | 7% / 12% | `-z-10` INSIDE `.story-hero` | clipped to card; blurred through the glass plate; "oddly spaced" |
| **library card grid** (`.paper-grid`) | `src/styles/cards.css:52-63` + `--paper-grid-*` (`tokens/scale-paper.css:118-134`) | 32px minor + 128px major (×4) | 0.08 / 0.128 | a card's HOST `background-image` (interior ground) | the GEOMETRIC half of the paper-cascade; static, no wave |

**`grid-simple`'s scope is the DEMO STORY GRID** (`.story-bg-grid` / `--story-grid-*`) —
the "new grid background" the user condemns. (The `--paper-grid-*` library token + the
`.paper-grid` card-interior recipe is the `BC.W-VIZ-PAPERGRID` sibling's scope — it gains
the liquid `curlFBM` wave + a re-spacing; `grid-simple` only re-points it to share the
two-tier rhythm where they overlap. The fence: `grid-simple` = the STATIC PAGE background;
paper-grid = the optionally-LIQUID card-interior register. Two registers, ONE rhythm.)

### 2.2 The "blurry mess" root-caused (two concrete mechanisms)

**Mechanism A — the grid is CLIPPED INSIDE the card (the "in card" / "WTF clipped"
defect).** The grid `<div class="story-hero-bg story-bg-grid">` is a child of `.story-hero`
(`StoryHero.vue:255-259`), and `.story-hero` declares `overflow: hidden; border-radius:
var(--radius-card)` (`story-hero.css:51-56`). The grid sits at `z-index: -10`
(`story-hero.css:69-73`) — so it is a `-z` layer **trapped inside the rounded, clipped
card container**, reading THROUGH the `wash`/`quiet` card on top of it. To the user it
reads as a grid *inside* a rounded card box, not as a page background. That is verbatim
the §E defect "NOT displayed in the card" and "a clipped/odd element with a grid
background ('WTF is this — and it's clipped?')."

**Mechanism B — the grid is BLURRED through the glass plate (the "blurry mess"
defect).** Over a declared grid backdrop, `StoryHero.vue:212-216` drops the card to the
`wash` (page) / `quiet` (hero) glass tier so the grid "reads through." But those tiers
carry `backdrop-filter: blur(--glass-blur-{wash,quiet})` — the W-GLASS-CAL calm ladder
(quiet 8px). A `backdrop-filter: blur()` **convolves whatever is behind the plate**, so
the crisp 1px grid lines reading through the card are Gaussian-blurred into soft fuzz.
The grid is literally being blurred by design (to "read through"), and that is the user's
"blurry mess." The reference (keyframes.js) NEVER puts the grid behind a blurred plate —
it is a `fixed inset-0` page wash with content over it on opaque/non-blurring surfaces.

**Mechanism C — "oddly spaced."** The current pitch is 28px (demo) / 32px (library) —
neither rem-relative nor matching the reference's clean 1rem/5rem (16px/80px) rhythm. The
4× major step (28→112px, 32→128px) is a non-round multiple of the body rhythm, and at
fractional-DPR zoom the 28px/32px integer-px sizes land on sub-pixel boundaries → the
anti-aliaser softens the 1px lines (the retina 1px-line blur class [n12v retina-pixels;
web.dev device-pixel-content-box]). "Oddly spaced" = the non-rem pitch + the busy 4×
step; "blurry" compounds it.

### 2.3 Why the current design even HAS this shape (the honest history)
The grid-reads-through-the-wash-card model is the `BA.W-STAGE` scope-4 + `AZ.W-SUFFUSE
D4-3` move (`StoryHero.vue:203-216`, `story-hero.css:31-47`): the per-category background
map gave every route a declared backdrop to kill the "~80%-blank-void," and the card
dropped to a thin tier so the underlay read. That solved the void but introduced the
in-card-clipped + blurred-through-glass defect for the STATIC grid/paper backdrops
specifically (a live GL substrate goes FULL-BLEED `position: fixed` on a hero page —
`StoryHero.vue:190-197`, the `.story-hero-bg--bleed` modifier — but the STATIC grid/paper
backdrops were left BOXED `-z-10` inside `.story-hero`, never granted the full-bleed
escape). `grid-simple` grants the static grid the SAME full-bleed escape the live
substrates already have, and removes the blur path.

---

## 3. The SOTA technique (cited) — crisp, evenly-spaced, full-bleed

This viz's "SOTA" is *pixel-perfect CSS*, not a procedural-animation paper. The cited
techniques:

### 3.1 The device-pixel-crisp 1px line (the anti-blur rule)
A 1px line on a high-DPI display blurs when it lands on a sub-pixel boundary — the
rasterizer anti-aliases the fractional coverage [Nikita Vasilyev, *CSS, Retina, and
Physical Pixels*]. The crisp recipe:
- **Integer (or rem-on-integer-root) line widths + an evenly-divisible pitch** so each
  line lands on a whole device-pixel column/row. 1rem (=16px at the default root) and 5rem
  (=80px) divide cleanly at DPR 1, 2, 3.
- **Hard color stops** (`var(--line) 0 1px, transparent 1px …`) — a sharp transparent↔ink
  edge, NOT a soft gradient ramp (a ramp is what "blurs" a gradient grid).
- **`background-position` aligned to the box origin** (the default `0 0`) so the tile
  starts on a pixel boundary, not `center center` (the current `story-hero.css:295` uses
  `center center`, which offsets the tile by a half-cell on odd-pixel viewports → the
  lines drift off the pixel grid → softening). Use `0 0`.
- **No filter, no transform-scale, no opacity layer** on the painting element — the grid
  is the element's own `background-image`, one compositor-cached static raster
  (`cards.css:46-48` already records this discipline: "A STATIC raster … one
  compositor-cached paint, NEVER a per-frame repaint").
- The pixel-perfect ceiling (`devicePixelContentBox`, the canvas-side exact-pixel API
  [web.dev/articles/device-pixel-content-box]) is NOT needed — a CSS background grid with
  integer pitch + hard stops + `0 0` position is crisp by construction; the canvas
  exact-pixel path is for raster surfaces, not relevant to a CSS line grid.

### 3.2 The two-tier graph-paper recipe (the canonical SOTA form)
The standard two-tier graph-paper grid is four hard-stop linear-gradients — a fine pair +
a major pair — at two `background-size`s [Stefan Judis, *A CSS-based background grid
generator*; the repeating-linear-gradient grid pattern canon]. The library `.paper-grid`
+ the demo `.story-bg-grid` ALREADY use exactly this four-gradient stack
(`scale-paper.css:130-134`, `story-hero.css:285-294`); the SOTA fix is the MAGNITUDES (the
rem rhythm + the 3%/11% strengths) + the MOUNT (full-bleed, un-blurred), not the gradient
mechanism. The keyframes.js single-SVG-tile form (`background-size: 1rem`, §1.1) is the
even-simpler one-tier variant; the two-tier gradient stack is the fine+major variant. Both
are "SOTA simple"; recommend the two-tier gradient stack (it carries the major rule the
brand "engineering-graph-paper" pillar wants and re-tints via `--foreground` cleanly).

### 3.3 The repeating-linear-gradient alternative (equivalent, slightly cleaner)
`repeating-linear-gradient(to right, var(--line) 0 1px, transparent 1px var(--pitch))`
draws the same crisp ruled lines without a separate `background-size` declaration (the
pitch lives in the gradient stop) [w3schools repeating-linear-gradient; the kf
`.stage-field-*` rules at `design-idioms.css:610-624` use exactly this form]. Either the
4-`linear-gradient` + `background-size` stack OR the 4-`repeating-linear-gradient` stack is
correct; the repeating form keeps the pitch in ONE place (the gradient), which is marginally
cleaner. Pick one and keep the four hard-stop lines (fine-x, fine-y, major-x, major-y).

### 3.4 The ABROGATION (what dies — cited file:line)
Per "TOTALLY ABROGATE this," the clean break (no alias — MEMORY: no-backwards-compat):
- **`--story-grid-size: 28px`** (`story-hero.css:14`) → DELETED; re-expressed as the
  rem-relative `--grid-pitch: 1rem` / `--grid-major: 5rem`.
- **`--story-grid-color` 7% / `--story-grid-color-strong` 12%** (`:15-16`, `:44-45` dark)
  → re-expressed as `--grid-line` 3% / `--grid-line-major` 11% (the kf magnitudes; the
  dark arm re-tints via `--foreground` automatically — no parallel `-dark` family needed,
  the `cards.css:65-76` precedent).
- **`background-position: center center`** (`:295`) → `0 0` (the pixel-alignment fix).
- **The `-z-10`-inside-`.story-hero` mount** → the full-bleed `position: fixed; inset: 0`
  page-background escape (the `.story-hero-bg--bleed` mechanism, `story-hero.css:80-85`,
  extended to the static `grid`/`paper` kinds in `StoryHero.vue:201` `staticBackdrop` —
  granting the static backdrop the SAME full-bleed path the live substrates have at
  `:197`).
- **The blur path** → the content over a full-bleed grid sits on a thin readability
  scrim / an opaque-enough surface, NOT a `backdrop-filter: blur()` `wash` card the grid
  reads through. The grid is BEHIND the content at the page level (un-blurred); the card,
  if any, is a separate plate.
- The two recipes UNIFY their rhythm: the demo `--story-grid-*` re-points onto the
  library `--paper-grid-*` (or a new shared `--grid-*`) so there is ONE pitch/strength
  source, not two drifting copies (the two-parallel-systems defect, `viz-codebase.md
  §7`).

---

## 4. Substrate, Safari, and the WebGPU-everywhere mandate (n/a here, stated explicitly)

The §E mandate "WebGPU EVERYWHERE … NO FALLBACKS. EVER. No canvas anywhere" is about the
PROCEDURAL ANIMATIONS (aurora, blob, dot-flow, concentric, constellation, the liquid
paper-grid). **`grid-simple` is static — it has nothing to compute, so the mandate does
not bind it.** This is the deliberate KISS register: a CSS `background-image` is the
cheapest, crispest, most universally-supported way to paint an evenly-ruled grid, and it
is correct on EVERY engine including Safari with zero GPU/WGSL/canvas surface. There is no
"fallback" because there is no primary GPU path — a static line grid is a CSS solved
problem.

For completeness (the Baseline facts the sibling docs cite, so the orchestrator has ONE
consistent record): WebGPU reached **Baseline "Newly available" in January 2026** —
Chrome/Edge 113+, Firefox 147+ (macOS), **Safari 26+** (macOS Tahoe 26 / iOS 26 / iPadOS
26 / visionOS 26, on by default) [web.dev/blog/webgpu-supported-major-browsers;
caniuse.com/webgpu; webgpu.com critical-mass]. So the LIQUID paper-grid sibling CAN ship
its `curlFBM`-warp shader on Safari. But `grid-simple` is the explicit *non*-GPU foil — if
a route wants the calm crisp grid, it gets CSS; if it wants the liquid breathe, it reaches
for `BC.W-VIZ-PAPERGRID`. The two are a deliberate pair, not a fallback ladder.

`backdrop-filter` Baseline note (for Mechanism B): `backdrop-filter` is Baseline
widely-available (incl. Safari/WebKit since 9 via `-webkit-`, unprefixed in modern
Safari) — so the BLUR the current design applies to the grid genuinely paints; the fix is
to NOT route the grid behind a blurred plate, not to gate the blur. [MDN backdrop-filter;
the calm `--glass-blur-*` ladder, CLAUDE.md W-GLASS-CAL.]

---

## 5. The recipe design (the new crisp grid — pure CSS, no kernel)

There is no WGSL/JS kernel — this is the one viz with NO math source to transcribe. The
"design" is the CSS recipe + the mount + the token rhythm.

### 5.1 The token rhythm (the single source, re-pointed to share with paper-grid)
```css
:root {
    --grid-pitch:  1rem;   /* fine cell — rem-relative, divides cleanly at DPR 1/2/3 */
    --grid-major:  5rem;   /* major rule — 5× the fine pitch (engineering-graph rhythm) */
    --grid-line:        color-mix(in srgb, var(--foreground) 3%,  transparent);
    --grid-line-major:  color-mix(in srgb, var(--foreground) 11%, transparent);
}
/* dark arm re-tints for free — --foreground flips, the mix re-resolves; NO -dark family.
   (The blend may flip multiply→screen for legibility, the cards.css:73-76 precedent,
   IF painted on a tinted host; on a transparent full-bleed page bg the plain mix reads.) */
```
These are the keyframes.js magnitudes (`design-idioms.css:298-301`), re-expressed as
glass-ui `--grid-*` tokens. The library `--paper-grid-*` (`scale-paper.css:118-134`) and
the demo `--story-grid-*` (`story-hero.css:14-16`) BOTH re-point onto `--grid-*` (ONE
rhythm source — the two-parallel-systems fix). The `--paper-grid-opacity` single-knob
seam (`scale-paper.css:118`) is preserved for the card-interior register; `grid-simple`
adds the explicit 3%/11% page-background tier beside it.

### 5.2 The crisp grid recipe (the four hard-stop lines)
```css
.grid-bg {                       /* the full-bleed page grid (NOT a card interior) */
    background-color: var(--background);
    background-image:
        /* major rule — x + y, hard-stop, the bolder tier */
        repeating-linear-gradient(to right,  var(--grid-line-major) 0 1px, transparent 1px var(--grid-major)),
        repeating-linear-gradient(to bottom, var(--grid-line-major) 0 1px, transparent 1px var(--grid-major)),
        /* fine rule — x + y, hard-stop, the quiet tier */
        repeating-linear-gradient(to right,  var(--grid-line) 0 1px, transparent 1px var(--grid-pitch)),
        repeating-linear-gradient(to bottom, var(--grid-line) 0 1px, transparent 1px var(--grid-pitch));
    background-position: 0 0;    /* pixel-aligned to the box origin — NOT center center */
    /* NO filter, NO backdrop-filter, NO opacity layer, NO transform — one static raster */
}
```
(The equivalent four-`linear-gradient` + `background-size` form, §3.2, is identical in
output; the repeating form keeps the pitch in the gradient.) The major lines are listed
FIRST in the stack so the fine lines do not paint over the major rule at the intersections
(the major reads as the dominant tier).

### 5.3 The mount (full-bleed page background — the de-clip fix)
- The static `grid`/`paper` backdrop on a hero/page route mounts FULL-BLEED:
  `position: fixed; inset: 0; z-index: -5; pointer-events: none` — the SAME
  `.story-hero-bg--bleed` escape the live substrates use (`story-hero.css:80-85`), granted
  to the static kinds by widening `StoryHero.vue:197` `fullBleed` (or a new
  `staticFullBleed`) to include `staticBackdrop.value`. It pins behind the page content +
  ABOVE the AppShell `PaperBackdrop`, so the grid is the WHOLE-PAGE wash, not a boxed card
  layer.
- The content sits OVER the full-bleed grid on the page chassis (the ONE card per the §C
  "one card with the procedural bg" rule — `awwwards-herostudios.md:144`), with the card on
  an opaque-enough tier OR a thin readability scrim. The grid is NOT routed through a
  `backdrop-filter: blur()` plate (Mechanism B retired).
- `.story-hero` keeps `overflow: hidden; border-radius` for the BOXED page register (a
  contained well), but the grid kind no longer mounts inside it — it escapes, exactly as
  the live substrate kinds do. (The `data-full-bleed="true"` arm at `story-hero.css:62-66`
  already drops the isolate/clip — the static grid joins that arm.)

### 5.4 The suffusion register (the §E "suffuse it throughout the site")
The crisp grid is "the brand math/grid pillar" the user wants site-wide. The full-bleed
`--grid-*` recipe is the page-background tier (3%/11%); a consumer can dial it quieter via
the single `--grid-line`/`--grid-line-major` strength knobs (the token-first axis). This is
the SUBTLE static suffusion — distinct from the liquid paper-grid (`BC.W-VIZ-PAPERGRID`),
which is the optionally-ANIMATED card-interior register. Two registers share the ONE rhythm:
static page-bg (`grid-simple`) vs liquid card-interior (`paper-grid`).

---

## 6. Configurator + demo-suite scope (the restraint case)

`grid-simple` is static + token-driven, so it has **no per-instance runtime configurator**
in the procedural-viz sense (no sliders driving a kernel — there is no kernel). Its
"configurator" is the design-token surface: the four `--grid-*` knobs (pitch, major,
fine-strength, major-strength), retunable at `:root` or per-scope (presets-in-consumers).

The DEMO surface (the §C/§E "one card" page chassis — giant hero shrinks on scroll, body in
ONE card over the page-background grid):
1. **The default crisp grid (the reference reproduction).** A page over the full-bleed
   1rem/5rem 3%/11% grid — the keyframes.js `EditorShell` look, byte-faithful: crisp,
   evenly-spaced, larger, NOT in the card, NOT blurry. This is the binding acceptance
   capture (the abrogation proof — before/after the blur+clip).
2. **The before/after abrogation still.** Side-by-side: the OLD `.story-bg-grid` (28px,
   center-positioned, clipped inside the rounded card, blurred through the wash plate) vs
   the NEW `.grid-bg` (1rem/5rem, `0 0`, full-bleed, un-blurred) — the gestalt proof the
   "blurry mess" is gone.
3. **The pitch/strength token tour.** A `<TokenLadder>`-style row showing the grid at a few
   `--grid-line` strengths (the suffusion-strength knob) + the fine-vs-major rhythm — the
   token-first axis, no kernel.
4. **Dark arm.** The same grid under `.dark` — the `--foreground`-derived line auto-lifts
   off the near-black page (no parallel `-dark` family), the W-DARK-MATERIAL warm-ink line
   reads.
5. **As a site-wide subtle background.** The §E "suffuse it throughout" — a very-quiet,
   large-pitch grid behind real content (a story page), proving it is the calm brand
   pillar, not a focal element.
6. **Reduced-transparency / reduced-motion.** Static by construction; the
   `prefers-reduced-transparency: reduce` arm (`cards.css:85-88`) gives a clean
   interior; no motion gate needed (a grid does not animate — `cards.css:91-96` guards only
   a future drift). This is the explicit "no interaction, static" proof.

The teal-on-navy reference is REMOVED (§E "REMOVE the teal-on-navy reference entirely") —
there is no color preset; the grid is a single `--foreground`-mix warm-ink line, full
stop. No demo preset introduces teal/navy.

---

## 7. The cursor/touch + velocity/acceleration interaction model (none — by design)

**There is NO interaction.** `grid-simple` is a static page background — it does not read
the pointer, has no velocity/acceleration term, no `usePointerVelocityField`, no `tick()`,
no rAF, no frame loop. The user mandate "it is static" is explicit. This is the deliberate
contrast to every other viz in the suite: the foil that does nothing but rule the page
cleanly. Adding interaction would violate the KISS bar and re-introduce the over-design the
user condemned.

(The LIQUID paper-grid sibling — `BC.W-VIZ-PAPERGRID` — is the one that gets the subtle
`curlFBM` UV-warp breathe + optional pointer-local ripple. `grid-simple` is its calm
static twin. If a route wants motion, it picks the liquid one; if it wants the calm graph
paper, it picks this. The two share the ONE `--grid-*` rhythm and the ONE warm-ink
identity.)

---

## 8. The choreography (keyframes.js) — the ONE allowed motion, the page-enter only

The grid itself NEVER animates (§7). The ONLY motion adjacent to it is the PAGE entrance
that every route already has: the `.scroll-build` / `.story-hero-title--enter` gravity
fade-rise of the CONTENT over the grid (`story-hero.css:191-251`, `scroll-choreography.css`
— the W-SCROLL-MOTION/W-HIERARCHY2 register). That is the content's choreography on the
shared keyframes.js-clocked `--ease-out` / `--spring-smooth-duration` register, NOT the
grid's. The grid is the stable canvas the content builds onto. keyframes.js is the
single choreography source for the page-enter (the canonical `SpringProgress`/timeline
clock); the grid contributes ZERO animation channels (the Oscillator loop-clock is
irrelevant here — nothing loops). PRM: the content entrance drops its transform under
reduce (the existing P6 carve); the grid is already static, so PRM is a no-op for the grid
itself.

---

## 9. Discipline checklist (the binding fences)

- **NO WebGPU, NO canvas, NO shader, NO kernel, NO math source.** `grid-simple` is a pure
  CSS static background — the deliberate KISS foil. The WebGPU-everywhere mandate does NOT
  bind a non-animating viz. ✓
- **NO interaction.** Static by definition; no pointer, no velocity/acceleration, no rAF.
  ✓
- **ABROGATE the blurry grid (clean break, no alias — MEMORY no-backwards-compat):** the
  `--story-grid-*` tokens + `.story-bg-grid`'s 28px/center-position recipe + the blurred-
  through-`wash`-card mount DIE; re-expressed as the crisp `--grid-*` 1rem/5rem 3%/11%
  full-bleed recipe.
- **Crisp by construction:** rem-relative integer pitch (1rem/5rem), hard color stops,
  `background-position: 0 0`, NO filter — the device-pixel-crisp 1px-line rule [n12v
  retina-pixels].
- **NOT in the card:** full-bleed `position: fixed; inset: 0` page background (the
  `.story-hero-bg--bleed` escape granted to the static grid kind), NOT `-z-10` clipped
  inside the rounded `.story-hero` box. ✓ (the "WTF clipped" / "NOT in the card" defect).
- **Warm-cream identity, ONE line color** (`color-mix(… --foreground N% …)`), re-tinting
  with the theme; **teal-on-navy REMOVED entirely** (§E). NO color preset. ✓
- **ONE rhythm source:** the demo `--story-grid-*` + the library `--paper-grid-*` unify
  onto the shared `--grid-*` tokens (the two-parallel-systems fix). The liquid paper-grid
  sibling re-uses the SAME rhythm (one pitch, two registers — static vs liquid).
- **One compositor-cached static raster** (the `cards.css:46-48` paint-path discipline) —
  no per-frame repaint, no `@property` drift.

---

## 10. Sources (cited)

- keyframes.js reference grid — `keyframes.js/demo/@/components/custom/editor-shell/
  EditorShell.vue:6-7,119-125` (the `fixed inset-0` `.grid-background` SVG-tile recipe) +
  `keyframes.js/demo/@/styles/design-idioms.css:274-301` (`--graph-pitch` 1rem /
  `--graph-major` 5rem / `--graph-opacity` 3% / `--graph-major-opacity` 11%, the
  ">10% legibility floor" calibration `:285-290`) + `:610-624` (the `.stage-field-*`
  repeating-linear-gradient form).
- Device-pixel-crisp 1px lines (the anti-blur rule) — Nikita Vasilyev, *CSS, Retina, and
  Physical Pixels* — https://n12v.com/css-retina-and-physical-pixels/ ;
  web.dev, *Pixel-perfect rendering with devicePixelContentBox* —
  https://web.dev/articles/device-pixel-content-box
- Two-tier graph-paper CSS grid (the SOTA recipe) — Stefan Judis, *A CSS-based background
  grid generator* — https://www.stefanjudis.com/blog/a-css-based-background-grid-generator/ ;
  repeating-linear-gradient grid pattern — https://codepen.io/Squidies/pen/zPXppL ;
  MDN/w3schools `repeating-linear-gradient()` —
  https://www.w3schools.com/cssref/func_repeating-linear-gradient.php
- WebGPU Baseline + Safari 26 status (for the suite record; n/a to this static viz) —
  https://web.dev/blog/webgpu-supported-major-browsers ; https://caniuse.com/webgpu ;
  https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/
- `backdrop-filter` Baseline (Mechanism B — the blur genuinely paints; the fix is the
  mount, not the gate) — MDN `backdrop-filter` —
  https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- In-repo current state + the abrogation targets — `demo/stories/story-hero.css:12-16`
  (`--story-grid-*`), `:51-56` (`.story-hero` overflow:hidden + radius — the clip),
  `:62-66` (`data-full-bleed` un-clip), `:69-85` (`.story-hero-bg` / `--bleed` escape),
  `:283-296` (`.story-bg-grid` recipe, `center center` position) ;
  `demo/stories/StoryHero.vue:190-216` (fullBleed / staticBackdrop / cardTier — the wash
  drop), `:255-264` (the grid `-z-10` mount) ; `src/styles/tokens/scale-paper.css:97-134`
  (`--paper-grid-*`) ; `src/styles/cards.css:21-96` (`.paper-grid` + paint-path + PRT/PRM
  arms) ; `src/composables/glass/webgl/shaders/flow.glsl.ts:32-33` (the BOOKED #2 curlFBM
  consumer = paper-grid-breathe, the LIQUID sibling, NOT this static viz) ;
  `docs/tranches/BC/research/procedural-refs.md:100-186` (§4 paper-grid + simple-grid) ;
  `docs/tranches/BC/research/viz-codebase.md:190-258` (§7 the two parallel grid systems) ;
  `docs/tranches/BC/ORCHESTRATION.md:102-103` (BC.W-VIZ-PAPERGRID vs BC.W-GRID-SIMPLE) ;
  `docs/tranches/BC/research/awwwards-herostudios.md:144` (the one-card / grid-is-a-substrate-
  not-a-card rule).
