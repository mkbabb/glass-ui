# PAGE-CHROME — DELTA-ASSAY (golden-vs-current · the UNION path)

> The GOLDEN (`GOLDEN.md`) survives all three challenges as a REFINE-dominant union: one warm-glass
> marquee, one `--chrome-rule` seam, one `--chrome-glass` register mounted twice (the condensed bar +
> the toc), the chrome/hero SCALE SPLIT, the kind-marked stamp, the library-wide corner-AA — six asks
> falling out of one surface. The IDEA is fit. But three hardenings are **load-bearing** (each
> orchestrator-reproduced live on `:5173`, 2026-06-24) and re-shape the mechanism: **(R1) the §2e
> corner clip as written AMPUTATES every glass tier's lift + iOS under-shadow** — it must clip a
> backdrop-only child, never the shadow-bearing host; **(R-gray) the `--chrome-glass` register paints
> GRAY on the default path** (`--glass-tint-strength: 0%` live) — it must wire the warm tint
> explicitly; **(R-Safari) the whole Safari fence is Chrome-asserted** — the nested-backdrop, the
> no-`scroll()`-timeline fallback, the negative-z `::before`, and the oklab-toward-transparent mix
> must be WebKit-captured, and the static bar must paint on every engine. Survival of the fittest:
> KEEP the register unification + the scale split + the seam token; REFINE the occlusion bar (static
> floor + sibling element + warm tint) + the toc (transform-only marker + single reader); RE-INVENT
> the §2e clip (host→backdrop-child) and the §2a/2b token wiring (explicit tint, byte-aligned range).

---

## 0 — THE BORN-RED TRUTH (orchestrator LIVE-VERIFIED, Chrome, `:5173`, 2026-06-24)

Re-measured every ask via `getComputedStyle` on the running dev server — the GOLDEN §0 table reproduces
EXACTLY:

| ask | live measurement at HEAD | verdict |
|---|---|---|
| **HEADER SCALE** | `/display/buttons` chrome `<h1>` = **109.664px** / lh 115.147px, class `text-display-5` (off `heroScale`) | **RED** — the protagonist rung on a chrome label |
| **DIVIDING RULE** | `article > header` `border-bottom-width: 0px`; `--story-header-rule` **(unset)**; `--chrome-rule` **(unset)** | **RED** — no masthead→body seam |
| **STICKY-CONDENSE** | `.story-hero-shrink` `position:sticky z-index:2`, `background rgba(0,0,0,0)`, `backdrop-filter none`; `::before` `content:none` | **RED** — bare text the page scrolls UNDER; no backing layer |
| **PATH-STANDARDIZE** | subpath `@mkbabb/glass-ui/button`, `data-kind=null`, plate `color(srgb .11 .098 .09 / .05)` (near-invisible, no clip) | **AMBER** — convention recorded, no visual standard/marker |
| **CORNER-ALIASING** | `.glass-resting` `clip-path: none`, `border-radius: 16px`, outer `box-shadow` present | **RED** — no halo clip (and `--radius`=10px ≠ the painted 16px — see R2) |
| **TOC GLASS** | `nav.themed-card` `bg rgba(0,0,0,0)`, `backdrop none`, `clip-path none`; active row `oklab(0.216 0.0035 0.0052/0.1)` → **C≈0.0063 = GRAY** | **RED** — no plate; gray-not-warm |
| **(R-gray cross-cut)** | `:root --glass-tint-strength: 0%`; `--glass-tint-source: light-dark(hsl(30 85% 96%), …)` | **RED** — the warm register is a NO-OP on the default path |
| **(deps absent)** | `:root --ease-cartoon-punch`/`--motion-weight` **(unset)** | the entrance-punch DEPENDS are un-landed (sibling-delta build-DAG) |

The gestalt holds: the chrome is the last un-warmed, un-proportioned, un-condensing surface. Every ask is
the SAME defect class — the chrome never became a register.

---

## 1 — THE DELTA (KEEP · REFINE · RE-INVENT — survival of the fittest)

### KEEP (fit — survives all three challenges, live-confirmed)

| element | why it is fit |
|---|---|
| **the `--chrome-glass` register unification** (condensed bar + toc = ONE recipe, mounted twice) | genuinely DRY/deft — reuses `.glass-floating`/`.glass-menu-row`, no fork (ch#1 "KEEP", ch#2 "real union", ch#3 "the union is real") |
| **the chrome/hero SCALE SPLIT** (`--chrome-title-rung` vs the protagonist `heroScale`) | born-RED real (109.664px live); the split (not a global shrink) keeps the hero audacious, calms the label (all 3 challenges KEEP) |
| **the occlusion-kill bar IDEA** (a glass backing that materializes on the shipped `scroll()` substrate) | the right fix for the real bare-text bug (`.story-hero-shrink` bg-transparent live); reuses the shipped substrate, no 2nd scroll engine — modulo R-Safari/R-static below |
| **`--chrome-rule` one-token-three-readers** | exemplary DRY; `--configurator-divider` exists, is dark-adaptive; used only as `border-color` (never an inset-shadow → the MEMORY light-dark trap does NOT fire here) |
| **the `themed-card` toc re-home** | grep + live confirm `themed-card` paints NOTHING (bg transparent, backdrop none, clip none) — a pure clean-break correction, no legacy |
| **punch-on-entrance / settle-on-scroll** | the correct §L4 altitude resolution; the no-overshoot scroll-condense is right (a bouncing scroll-nav reads cheap) |
| **NO `backdrop-filter:url` / SVG-goo / trig in the chrome** | the toc "goo-morph" is honestly a CSS transform morph; the real metaball stays in dock/blob content — the Safari-meatball fence is correctly NOT crossed |

### REFINE (weak — the mechanism is right, the wiring is wrong)

| weakness | live evidence | the refinement |
|---|---|---|
| **the register paints GRAY on the default path** (ch#3 R1, TOP) | `--glass-tint-strength: 0%` live → the `color-mix(… --glass-tint-source --glass-tint-strength)` recipe returns the bare `--glass-bg-floating` neutral plate; the spike was a false-positive (it INLINED `--glass-tint-strength: 14%`) | the `--chrome-glass` register EXPLICITLY sets `--glass-tint-strength` to a nonzero warm floor (a minted `--chrome-tint-strength: 12–16%`) AND points `--glass-tint-source` at the per-page `categoryHue` via the inline `--hue` the chassis already sets (compute `oklch(L C var(--hue))` in CSS, or read the IconChip hue path). Gate C3/C7 sample chroma ≥ 0.045 on the REAL page at the RESOLVED strength, never a tinted fixture. |
| **the condense backing is keyed ONLY to `scroll()`** (ch#2 R2/R3) | `animation-timeline: scroll()` is Safari-26-only; the `@supports`-off arm + the negative-z `::before` backdrop are WebKit-fragile | the backing paints a STATIC warm-glass bar at rest (opacity ≥ floating floor WITHOUT the scroll ramp); the `scroll()` timeline ONLY animates opacity 0→1. So the sticky header has a backing on EVERY engine. Move the backing off the negative-z `::before` onto a REAL sibling `.story-hero-bar` div behind the cluster text (zero new SFC — a div in StoryHeader), so no negative-z backdrop-root gamble. |
| **the toc marker animates `block-size`/`height`** (ch#2 R4) | the spike transitions `height 360ms` — a LAYOUT property, NON-compositor; C8 mis-lists it as "allowed" | the marker morphs on **`transform` only** — `scaleY` (height delta) + `translateY` (position delta) off a fixed base rect — REUSE `useTabIndicator`'s transform-only glide+squish (already shipped, cited for the dock-tab work). Delivers the **squish** the liquid-weight law wants, which a `height` lerp cannot. C8 then FAILS a `height`/`block-size` marker. |
| **the spike ships a 2nd scroll reader** (ch#2 R6) | the spike's `scroller.addEventListener('scroll', …)` rect-reads every tick — the exact 2nd scroll engine the §3 union table forbids | the production marker drives off the shipped `useScrollTracker` active-id (as §2g already states); the spike's listener is throwaway. Census asserts **zero new `addEventListener("scroll")`** in the chrome diff. |
| **the path stamp marker is overfit + AT-silent** (ch#1 R7, ch#3 a11y) | `⌘` U+2318 is NOT in Fira Code's standard set (tofu risk) + semantically wrong (command-key ≠ route); the `aria-hidden` glyph makes import-vs-route invisible to AT | drop the Unicode glyph; encode the kind via `data-kind` + a CSS-drawn marker (a dot/chevron, guaranteed coverage) + the `opacity:.86` route-quieting already in §2f; add an `aria-label` ("importable path" / "demo route") so the standard is conveyed non-visually. |
| **the entrance punch is asserted, not proven on the calm rung** (ch#3 R5) | `--ease-cartoon-punch`/`--motion-weight` UNSET live (sibling-delta DEPENDS); a 12px/6%/3px settle on a ~32px label is sub-perceptual; no `--shadow-cartoon` offset on the title | the cel-slam DEPENDS on the motion-spring + cartoon-shadow sibling deltas (`BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-CASTER`); C9 must assert the layered `--shadow-cartoon` exists on the title (not just a mid-frame scale≠1), or the wave accepts "weight, not full cel" and drops the "cel-SLAM" framing for the calm rung. |
| **the `--chrome-t` "ONE scalar" framing is aspirational** (ch#1 R4) | `--chrome-t` appears in ZERO CSS lines (grep); the mechanism is 3 disjoint `scroll()` animations sharing a range | either mint a real registered `@property --chrome-t` driven by ONE `scroll()` and READ it via `calc()`, OR drop the "one scalar" framing and call it "one scroll RANGE, three positionally-paired animations." The mechanism (the shipped `.story-hero-shrink` substrate) is fine; the prose must match. |

### RE-INVENT (broken — the mechanism as written is destructive)

| broken element | live evidence | the re-invention |
|---|---|---|
| **§2e the corner clip on the shadow-bearing host** (ch#1 R1, DECISIVE) | every glass tier carries an outer `box-shadow` (`ladder.css:49/70/82/109/124` rim+shadow; `:405-418` `--glass-under-shadow-vivid/-default` — the iOS under-shadow). `clip-path` clips the element's ENTIRE rendering INCLUDING its outer `box-shadow` (CSS Masking spec; live data-URL probe page #9 confirms). A `clip-path: inset()` on `.glass-floating`/`.glass-card`/… **amputates the floating lift + the iOS under-shadow on every Dialog/Sheet/Popover/card** — a library-wide regression masquerading as a one-liner, a direct §3 PERFECTED-glass / defined-edge violation. | clip the **backdrop/halo SOURCE, not the host**: a nested backdrop-only child (`::before` or a real layer) owns ONLY `backdrop-filter` + the `clip-path: inset(0 round …)`, leaving the host's `box-shadow` UNCLIPPED. The grain `::after` already `border-radius: inherit`s (corner-correct). The corner-AA wave's gate (C6) must assert the floating lift + under-shadow SURVIVE the clip (raster a non-zero shadow band BELOW the tier), not merely "the corner is clean." |
| **§2e clips to `var(--radius)`** (ch#1 R2, ch#3 R2) | `--radius: 0.625rem` (~10px) global; but `.glass-resting` live-renders `border-radius: 16px`, `.glass-floating` reads `--radius-card`, stamp reads `--radius-pill`. `inset(0 round var(--radius))` clips to 10px on a 16px box → an INNER NOTCH (the exact artifact, inverted). And if a tier doesn't define `--radius`, the clip can drop entirely (silent no-op — the `b538dec7` lost-mechanism class). | the clip radius MUST equal each tier's OWN `border-radius` token (`--radius-card` for the card, the rung radius for the ladder), with a guaranteed fallback (`var(--radius-card, …)`); the gate asserts computed `clip-path !== none` AND clip-radius ≡ visual radius on each named tier on a real page. |
| **the condense range DRIFTS** (ch#2 R8) | the spike picks `--chrome-condense-range: 170px`; the shipped `.story-hero-shrink` reads `--hero-condense-range: 160px` — a fork-by-magic-number | the chrome condense REUSES the shipped `--hero-condense-range` (160px), `--hero-condense-fade-range` (120px) — no re-picked px. Overfitting-audit at close: every `--chrome-*` token has ≥2 readers or is the shared register. |

---

## 2 — THE UNION PATH (the deft integration — KISS, reuse extant primitives, no dual-path)

The six asks already decompose onto SIX existing waves (the GOLDEN §6 map is correct). The UNION
contribution is the **UNIFICATION** — declare ONE `--chrome-glass` register + ONE `--chrome-rule` seam +
ONE corner-clip, and re-point the existing waves to CONSUME them. Precisely how to evolve the current
toward the golden, reusing extant primitives:

1. **`--chrome-glass` register (NEW, demo-chassis, the unifier)** — a class/token group in
   `demo/stories/story-hero.css` that composes the SHIPPED `.glass-floating` recipe + sets
   `--glass-tint-strength: var(--chrome-tint-strength, 14%)` + `--glass-tint-source: oklch(0.9 0.06 var(--hue))`
   (reading the per-page `--hue` the chassis already binds) + `border-color: var(--chrome-rule)`. Mounted
   on BOTH the condensed bar backing AND the `.toc-placard` (one register, two homes — the GOLDEN's
   boldest move, now WARM by construction). The corner-AA clip is consumed by both because they ARE glass
   tiers (via the corner-AA wave's backdrop-child clip, NOT a host clip).

2. **The condensed bar (REFINE `.story-hero-shrink`)** — add a REAL sibling `.story-hero-bar` div behind
   the cluster text (in `StoryHeader.vue`, zero new SFC) that composes `--chrome-glass`, paints a STATIC
   warm-glass bar at the resting floor on EVERY engine, with `border-block-end: 1px solid var(--chrome-rule)`
   the bar's bottom edge. The shipped `scroll()` subordinate-fade (eyebrow/blurb→0, title/subpath persist)
   is REUSED unchanged; the `scroll()` timeline ONLY ramps the bar's opacity from the resting floor up. The
   bar insets to the route-column (`inset:0`, the `<main>` padding owns the gutter — drop the spike's
   −1.5rem overhang). `scroll-padding-top` reserves the settled bar height.

3. **The scale split (REFINE `StoryPage.vue` + `story-hero.css`)** — the chrome `<h1>` reads
   `--chrome-title-rung: var(--type-display-1)` (a calm `font-size` token), NOT `text-display-${heroScale}`;
   the `≥4` chrome floor is RETIRED (clean break). The library `scale.css` ladder is byte-untouched; the
   audacious tiers survive ONLY on `variant="hero"`'s own `<h1>` + the metric value (the CEILING re-point).

4. **The `--chrome-rule` seam (NEW token, THREE readers)** — `--chrome-rule: var(--configurator-divider)`
   (dark-adaptive, used only as `border-color` so the light-dark inset trap never fires). It REPLACES the
   phantom `--story-header-rule` (referenced in `BD.W-PAGE-CHASSIS`/`BD.W-STICKY-TITLE-CONDENSE`, defined
   nowhere). Read in: the resting masthead→body rule (struck on entrance), the condensed bar's bottom edge,
   the toc's edge. One mint, three readers, no second rule token.

5. **The corner-AA clip (RE-INVENT `BD.W-CORNER-AA`/`-WIDEN`)** — clip the backdrop-only CHILD of each
   glass tier (preserving the host `box-shadow`), to the tier's OWN radius token. The bar/stamp/toc inherit
   it because they are glass tiers. The two-sided fission-clip fence (BF C4 exclusion list) is preserved.

6. **The kind-marked stamp (REFINE `StoryHeader.vue` + `manifest.ts`)** — derive `subpathKind` from the
   `SUBPATHS` shape (`@`-prefix = import, `/`-prefix = route) — NO new data. The stamp composes the
   `--chrome-glass`-adjacent quiet plate + a CSS-drawn kind marker (no Unicode glyph) + `data-kind` +
   `aria-label`; the `opacity:.86` route-quieting carries the visual distinction. Persists through the
   condense (the shipped subordinate-fade already spares the subpath).

7. **The warm-glass toc (REFINE `toc-tracking.vue`)** — retire the dead `.themed-card` (clean break) →
   `.glass-floating`/`--chrome-glass` plate; the rows → `.glass-menu-row` (shipped hover-lift); the active
   row is ONE warm pill that morphs on **transform only** (`useTabIndicator`/`useScrollTracker` active-id,
   no new tracker, no 2nd scroll listener). Inactive rows read `--on-glass-muted` (AA over the warm plate).

**The dup-kill:** the bar backing IS the occlusion fix AND the bar surface; `--chrome-rule` IS the resting
rule AND the bar edge AND the toc edge; the corner-clip IS the bar/stamp/toc silhouette generalized; the
stamp IS the condensed bar's identity rung; the toc glass IS the same register. Six asks, one marquee. No
legacy, no alias, no dual path — `themed-card` is RE-HOMED, the `≥4` floor is RETIRED, the bare condense is
REPLACED.

**The DEPENDS (the build-DAG, sibling-delta — NOT on-disk waves):** the entrance cel-slam +
`--shadow-cartoon` title cast DEPEND on `BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT` (motion-spring delta) +
`BD.W-CARTOON-CASTER` (cartoon-shadow delta); the warm `--chrome-glass` tint reconciles with the
`page-background`/`glass-material` `--field-h`/`warmFieldHue` deltas (the colorful field the glass samples).
These are CITED as DEPENDS, never re-minted here (the same DAG the `story-page-standard` + `glass-atoms`
rows record — `--ease-cartoon-punch`/`--motion-weight` UNSET live confirms they are un-landed).

---

## 3 — CROSS-ENGINE / A11Y (the hardened ledger)

| mechanism | Chrome | Safari (WebKit) | floor |
|---|---|---|---|
| chrome title rung | `font-size` token | identical | static |
| `--chrome-rule` seam | `border-color` + per-mode (NO light-dark inset) | identical | static |
| condensed bar | STATIC warm-glass at rest + `scroll()` opacity ramp; REAL sibling div (no neg-z `::before`) | static bar on Safari ≤25 (the `@supports`-off arm PAINTS the bar, only the ramp is gated); the sibling div avoids the neg-z backdrop-root bug | compositor; STATIC blur (no per-frame re-blur) |
| nested-backdrop (bar over body glass) | composites under-output | the bar pose pushes toward the opaque tier so it OCCLUDES not re-samples (avoid glass-samples-glass on scroll) | no nested `backdrop-filter` |
| corner-AA clip (backdrop CHILD) | `clip-path` on child; host shadow survives | `-webkit-clip-path`; load-bearing on WebKit | paint-only; shadow-survival gated |
| toc marker | `transform` (scaleY+translateY) only | identical | compositor; NO `height`/`block-size` |
| warm tint mix | `oklch(… var(--hue))` toward a warm low-α stop, not bare `transparent` | sRGB/oklch pinned; no gray midpoint | chroma ≥ 0.045 |

**A11Y/PRM:** under `reduce` the LARGE static hero holds on scroll (no bar fragment, the whole title
readable); the rule/stamp/marker are present (not animating). Under `prefers-reduced-transparency` the bar
+ toc + stamp fall to a WARM-tinted opaque tier (`color-mix(--card, --glass-tint-source <small>)`), never
bare gray `--card` — the NO-GRAY floor has no a11y exemption; the new surfaces compose the `.glass-*`
classes (so they inherit the shipped reduced-transparency fallback) OR carry an explicit opaque arm. The
stamp's kind is conveyed via `aria-label`, not the `aria-hidden` glyph.

---

## 4 — CONVERGENCE

**~74% (REFINE-dominant + 2 RE-INVENT).** The GOLDEN idea is fit and survives all three challenges; the
born-RED is honest and orchestrator-reproduced live on every ask. The 26% remaining is: the §2e
host→backdrop-child re-spec + shadow-survival gate (R1), the explicit warm-tint wiring (R-gray), the
static-bar floor + sibling-div + transform-only marker + single-reader refinements (R-Safari/R4/R6), the
range byte-alignment, the de-glyphed stamp + aria-label, and the WebKit paired-engine re-spike — all
build-time, several BLOCKED on the sibling motion-spring/cartoon-shadow/page-background DEPENDS (the
`--ease-cartoon-punch`/`--motion-weight`/`warmFieldHue` un-landed build-DAG).
