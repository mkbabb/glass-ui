# PAGE-CHROME — lens-c: THE 1940s-TECHNICOLOR MARQUEE — the header is a CEL that SLAMS, condenses into a glass PLACARD-BAR you scroll FROM, and the route-path is a struck STAMP

> GREENFIELD BRAINSTORM (AUDACIOUS CARTOON-TECHNICOLOR PUNCH). The page CHROME — StoryHeader
> (title + subtitle + path + scroll-condense), the dividing rule, the path standardization, the
> page corner-AA clip, the toc-tracking glass — redesigned from FIRST PRINCIPLES through the
> 1940s-technicolor FLOW & PUNCH lens. A UNION with the shipped `StoryHeader`/`story-hero.css`
> condense register + the chassis GOLDEN's `--ease-cartoon-punch`/cel-slam vocabulary + the
> `--story-header-rule` seam. NO re-fork, KISS/DRY, NO LEGACY. Tranche-dev only.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173`, both pages, chrome-devtools, real scroll gesture)

Sampled `/display/buttons`, `/navigation/toc-tracking`, `/motion/scroll-choreography` via
`getComputedStyle` + `getBoundingClientRect` + a REAL 400px scroll gesture + screenshot read.
The six page-chrome asks, each MISSED:

| ask | live measurement | verdict |
|---|---|---|
| **(1) header scale** | `/buttons` h1 `font-size: 109.66px`, `line-height: 115px`, rect 115px; the header cluster is **168.7px** on an **806px** viewport (~21% of the fold for the title rung alone). `/toc-tracking` "ToC Tracking" h1 eats ~30% of the fold (screenshot) | **RED — ~2× too large** (the §L6 √φ ladder wants the chrome page-title at ~`text-display-2/3`, roughly half) |
| **(2) dividing rule** | a header→body rule scan (`section/header/hr` with `border-bottom ≥ 1px`) returns `candidateRules: []`. The only border found is the subpath chip's OWN `1px / 0.08α` box edge — NOT a header→body seam | **RED — no dividing rule exists** (the user's "proper design hierarchy" separator absent) |
| **(3) sticky-condense** | `.story-hero-shrink`: `position: sticky`, `background: rgba(0,0,0,0)`, `backdrop-filter: none`, `z-index: 2`. After a 400px scroll: `transform: matrix(0.82…)` (it shrinks) BUT `top: -363px` — it **scrolled OFF screen**, never pinned as a bar; bg STILL transparent | **RED — bare floating text, no glass bar; the title condenses-then-leaves with no placard the page scrolls FROM** (the occlusion/no-bar defect, exactly W-STICKY-TITLE-CONDENSE) |
| **(4) path-standardize** | the convention EXISTS (`manifest.ts:382` — `SUBPATHS[cat/id] ?? /cat/id`; published→`@mkbabb/glass-ui/<sp>`, demo-only→`/cat/slug`). But BOTH render as the SAME Fira-Code chip — `@mkbabb/glass-ui/sidebar` and `/motion/scroll-choreography` are visually identical, no marker says "this one you can type" vs "this is just a route" | **AMBER — data convention sound, but the CHIP gives the user no visual standard** (the perceived inconsistency) |
| **(5) corner-AA** | the page demo cards' corners read square-haloed against the aurora field (screenshot, `/toc`); `grep clip-path src/styles/glass/ladder.css` → ZERO at HEAD (per BD.W-CORNER-AA-WIDEN) | **RED — backdrop-saturate halo bleeds a square behind the rounded silhouette** (the user's aliasing) |
| **(6) toc glass** | the `nav.themed-card` toc sidebar: `background: rgba(0,0,0,0)` (TRANSPARENT — no plate at all), `backdrop-filter: none`; inactive item color `rgb(28,25,23)`, active bg `oklab(0.216 … /0.1)` (a near-GRAY low-α). Screenshot: the toc reads muddy gray-lavender over the warm field, low-contrast | **RED — the toc has NO glass background (transparent), is gray-not-warm, unreadable** (exactly the user's "/navigation/toc-tracking TOC is UNREADABLE — needs a better glass BACKGROUND") |

**The gestalt:** the page-chrome is a SILENT MASTHEAD — a giant title that fills the fold, no
hierarchy seam under it, a condense that shrinks-then-abandons the user (no bar to scroll FROM),
two path formats wearing the same coat, square-haloed corners, and a transparent gray toc. NONE of
it carries weight, punch, or the technicolor FLOW the chassis GOLDEN already proved possible on the
body cels. **The header is the one part of every page that does NOT yet wear the cartoon.**

---

## 1 — THE GOLDEN IDEA: the header is a TECHNICOLOR MARQUEE — it SLAMS in as a cel, the title is a √φ-halved MARQUEE CARD, the route-path is a struck STAMP beneath it, and on scroll the whole masthead CONDENSES into a slim glass PLACARD-BAR the page scrolls FROM — the title and subtitle SUBSUMING with a cartoon hand-off, the toc inheriting the SAME warm-glass placard register

Six reconciled moves, each a UNION with a shipped seam — ONE chassis edit → 118 pages:

**(A) The title HALVES to the √φ marquee rung + a STRUCK dividing rule (W-HEADER-SCALE, the
hierarchy floor).** The chrome page-title drops from `text-display-mega/audacious` (109–177px) down
~2 √φ rungs to `text-display-2/3` (~`calc(109px / φ)` ≈ 55–68px) — the user's "that size but 2×
smaller". The audacious mega/hero tiers STAY home on the metric HERO surfaces (fast.com-peg) +
a deliberate hero page's own `<h1>` — NEVER the chrome title (the CEILING re-point). Below the
header cluster, a **STRUCK dividing rule** — not a static 1px hairline but a rule that PAINTS ITSELF
in with the cel-slam: a `--story-header-rule` seam (the W-PAGE-CHASSIS token, REUSED) that animates
its `scaleX(0 → 1)` from the left on the header's entrance clock (the "ink stroke" laid down under
the title), `transform-origin: left`, compositor-only. The hierarchy separator the user asks for,
ALIVE — the rule is drawn, not just present.

**(B) The header arrives as a CEL-SLAM with a LAGGING CAST (the chassis GOLDEN's `--ease-cartoon-
punch`, CONSUMED for the masthead).** The header cluster is the FIRST cel in the page's slam
sequence — it builds on the punch arc (anticipation squash → arc → follow-through stretch overshoot
→ settle), `--ease-cartoon-punch`, with its `--shadow-cartoon` CAST animating on a +8% later clock
so the masthead's shadow CATCHES UP after the title lands (weight follows the body). The three rungs
(eyebrow → title → blurb) keep the shipped 3-stage GRAVITY stagger but the TITLE rung gets the punch
overshoot (the chassis GOLDEN's cel-slam, applied to the title cel) — the marquee SLAMS, the
descriptor settles after. This is the §L4 overlapping-action + anticipation + follow-through law,
finally on the chrome (today the entrance is a calm fade-rise; the punch is the gap).

**(C) The route-path is a STRUCK STAMP with a kind-marker (W-PATH-STANDARDIZE, the visual
standard).** The two path formats stop wearing the same coat. ONE chip recipe, TWO struck variants
keyed off the manifest kind:
- **published** (`@mkbabb/glass-ui/<sp>`) → a `data-kind="import"` stamp: the Fira-Code chip carries
  a tiny leading **`▸` import glyph** + the warm-glass placard fill — "this is a real import you can
  type" (the canonical published surface).
- **demo-only** (`/cat/slug`) → a `data-kind="route"` stamp: the SAME chip recipe, a `⌘` route
  glyph + a flatter/quieter fill — "this is a route, not a published import".
The stamp STRIKES on the header entrance (a `cel-stamp` keyframe — scales `1.15 → 1` with a tiny
rotate settle, like a rubber stamp pressed onto paper, on `--ease-cartoon-punch`), so the path
reads as STAMPED beneath the title, not floated. The manifest is the single source (kind drives the
marker); the chip + the audit read it. ONE convention, visually legible, every page.

**(D) The condense becomes a GLASS PLACARD-BAR the page scrolls FROM, with a cartoon SUBSUME
(W-STICKY-TITLE-CONDENSE, the occlusion kill).** The bare-text-at-z-index:2 defect dies. On the
SAME native `scroll()` timeline the `.story-hero-shrink` already rides, a **glass backing
PLACARD** materializes (`opacity 0 → 1`, keyed to scroll): the SHIPPED `.glass-floating` recipe
(`backdrop-filter: var(--glass-blur-floating)` + `background: color-mix(in oklab, var(--glass-bg-
floating), …)` — warm, NEVER an opaque slab), with the `--story-header-rule` seam as its bottom
hairline (REUSED). At scroll-0 the bare halved marquee; past the condense range a slim warm-glass
PLACARD-BAR the body slides UNDER (correctly — it is a header). The SUBSUME is the cartoon hand-off:
the title CONDENSES toward the bar's compact size while the eyebrow + blurb FADE OUT (`opacity 1→0`
on the same timeline) and the **struck path-STAMP STAYS** — it is the persistent route identity the
title subsumes INTO. The condensed bar reads `small-title · path-stamp`. The hand-off carries weight
— the blurb doesn't just fade, it RECEDES (`translateY` down + fade, like it's being tucked behind
the title) while the title slides INTO the stamp's row (the two rungs visibly MERGE into one
placard line — the §L4 "one subsumes the other" as a real cartoon merge, not a crossfade).

**(E) The corners read CLEAN — the backdrop-halo clip (BD.W-CORNER-AA, CONSUMED library-wide).**
Every `.glass-*` tier (the placard-bar, the toc plate, the demo cels) co-declares `clip-path:
inset(0 round <tier-radius>)` on the SAME element as the `backdrop-filter`, reading the tier's own
corner token — the saturate halo clipped to the rounded silhouette (the b538dec7 mechanism, Safari-
verified). The "flatter" iOS-27 lozenge delta (`--btn-corner-radius` off `--radius-pill`) is the
SOURCE's C7 concern; the page-chrome surfaces (placard, toc) just CONSUME the library-wide clip — no
new clip mints here. The user's squared-off corner aliasing dies at the source, the page-chrome
inherits it.

**(F) The toc is a WARM-GLASS PLACARD sharing the condensed-bar register (the toc-glass fix).** The
transparent gray `themed-card` toc is RE-HOMED onto the SAME warm-glass placard recipe as the
condensed header bar (DRY — one register, two homes). The toc `nav` becomes a `.glass-floating`
warm plate (`backdrop-filter` + the warm `--glass-bg-floating` color-mix, halo-clipped per (E)) —
NEVER `bg: transparent`, NEVER gray. The active item gets a WARM tinted fill (the section hue, not
the `oklab(0.216 /0.1)` near-gray) + the active marker GOO-MORPHS between items (the worm/dot-flow
liquid-weight: as the active section changes on scroll, the warm highlight pill doesn't jump — it
STRETCHES and SETTLES to the new item, the §L4 squash-on-travel, on the SAME `--ease-cartoon-punch`
arc, PRM→instant). Contrast floor: inactive items lift to `--muted-foreground` over the warm plate
(AA holds — the "unreadable" defect dead, the plate gives them a legible ground).

### The single boldest move (the technicolor headline)

> **The header is a CINEMA MARQUEE: the halved √φ title-card SLAMS in on the cartoon punch arc with a
> LAGGING cast, a STRUCK route-stamp is pressed beneath it (kind-marked — import vs route), an inked
> dividing rule is DRAWN under the cluster left-to-right — and on scroll the whole masthead CONDENSES
> into a slim warm-glass PLACARD-BAR the page scrolls FROM, the title and subtitle physically MERGING
> into one placard line (the blurb tucked behind, the title sliding into the stamp's row) as the
> body slides under. The toc inherits the SAME warm-glass placard register with a goo-morphing active
> marker.** Conformity is structural (ONE chassis edit → 118 pages, one warm-glass placard register
> shared by the condensed bar AND the toc), the cartoon is universal (the masthead finally wears the
> punch the body cels already have), and the condense is a pure `scroll()`-timeline + `@keyframes`
> cascade (compositor `transform`/`opacity`/static `backdrop-filter`, no JS clock, PRM→large static
> hero, no occluding fragment).

This is DRY-er than the status quo (ONE warm-glass placard register serves the condensed header bar,
the toc, and any future tracking-glass — vs a transparent `themed-card` fork + a bare condense),
KISS (no new scroll engine — it COMPOSES the shipped `scroll()` register + `.glass-floating` tier +
`--ease-cartoon-punch` + `--story-header-rule`, all shipped/depended), and it lands the FLOW & PUNCH
where the page-audit found it most absent: the chrome.

---

## 2 — THE MECHANISM (the union — reuse, no fork; the EXACT files/tokens/recipes)

All edits land in the SHARED demo chassis — `demo/stories/StoryHeader.vue`, `demo/stories/story-
hero.css`, `demo/stories/manifest.ts` (the SUBPATHS kind), `demo/stories/navigation/toc-tracking.vue`
— ZERO `src/` paint except the library-wide corner-AA clip (BD.W-CORNER-AA, already its own wave;
this lens CONSUMES it). The KISS/DRY law: the fix lands ONCE in the chassis → propagates to all 118
storybook pages.

### 2a — the √φ-halved title + the STRUCK dividing rule (W-HEADER-SCALE)

```css
/* demo/stories/story-hero.css — the chrome page-title drops ~2 √φ rungs (was 109px) */
.story-hero-cluster[data-variant="page"] .story-hero-title {
  /* ~text-display-2/3: roughly half — the audacious mega/hero stay on metric HERO + hero-page <h1> */
  font-size: clamp(2rem, 4.2vw, var(--type-display-2, 3.4rem));   /* √φ ladder, ~½ the HEAD 109px */
  line-height: 1.04;
}
/* the STRUCK dividing rule — drawn left-to-right on the header entrance (not a static hairline) */
.story-header-cluster::after {
  content: ""; display: block; block-size: 0;
  border-block-end: var(--hairline, 1px) solid var(--story-header-rule);   /* the W-PAGE-CHASSIS seam token, REUSED */
  margin-block-start: calc(var(--space-rhythm, 1rem) * var(--phi, 1.618)); /* the φ gap to the body */
  transform: scaleX(0); transform-origin: left center;
}
@media not (prefers-reduced-motion: reduce) {
  @supports (animation-timeline: view()) {
    .story-header-cluster::after {
      animation: rule-strike 520ms var(--ease-cartoon-punch) 280ms both;   /* drawn AFTER the title lands */
    }
  }
}
@keyframes rule-strike { to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .story-header-cluster::after { transform: scaleX(1); } }
```

`--type-display-2`, `--phi`, `--hairline`, `--story-header-rule`, `--ease-cartoon-punch` are DEPENDS
(the √φ ladder / §L6 / W-PAGE-CHASSIS / motion-spring GOLDEN) — never re-minted. The mega/audacious
CEILING re-points: those tiers activate ONLY on `data-variant="hero"`/metric surfaces, never the
`data-variant="page"` chrome title.

### 2b — the cel-slam masthead + lagging cast (CONSUME `--ease-cartoon-punch`/`--shadow-cartoon`)

The title rung augments the shipped `.story-header-cluster--enter` 3-stage gravity with the punch
arc on the TITLE stage + a lagging cast:

```css
/* demo/stories/story-hero.css — the title cel SLAMS, the cast lags (the masthead punch) */
@media not (prefers-reduced-motion: reduce) {
  .story-hero-cluster[data-variant="page"] .story-hero-title {
    animation: header-slam 640ms var(--ease-cartoon-punch) both;  /* anticipation→arc→overshoot→settle */
    will-change: transform, opacity;
  }
  .story-hero-cluster[data-variant="page"] .story-hero-title::after {  /* the cartoon CAST, +8% later clock */
    content: attr(data-title); position: absolute; inset: 0; z-index: -1;
    color: transparent; text-shadow: var(--shadow-cartoon-text, 0.06em 0.08em 0 rgb(0 0 0 / 0.18));
    animation: cast-lag 640ms var(--ease-cartoon-punch) 52ms both;    /* settles AFTER the title */
  }
}
@keyframes header-slam {
  0%  { opacity:0; transform: translateY(calc(12px*var(--motion-weight))) scale(calc(1 - .06*var(--motion-weight)), calc(1 + .04*var(--motion-weight))); }
  62% { transform: translateY(calc(-3px*var(--motion-weight))) scale(calc(1 + .02*var(--motion-weight)), calc(1 - .02*var(--motion-weight))); }
  100%{ opacity:1; transform: none; }
}
@keyframes cast-lag { 0%{opacity:0;transform:translate(calc(-3px*var(--motion-weight)),calc(-4px*var(--motion-weight)));} 100%{opacity:1;transform:none;} }
```

`--motion-weight` co-scales the squash + overshoot + cast lag as ONE proportioned deformation (§L4);
the page rest is `1/φ`. PRM zeroes all in one assignment (the §L5 cascade).

### 2c — the STRUCK route-stamp with the kind-marker (W-PATH-STANDARDIZE)

The `manifest.ts` already maps `SUBPATHS[cat/id] ?? /cat/id`. Add the KIND (published vs route) as a
derived flag the chip reads — NO new data, the format already TELLS the kind (`@mkbabb/` prefix =
import, `/` prefix = route):

```ts
// demo/stories/manifest.ts — the kind is derived from the subpath shape (the single source rule)
const subpath = SUBPATHS[`${cat}/${id}`] ?? `/${cat}/${id}`;
const subpathKind = subpath.startsWith("@") ? "import" : "route";   // import = published; route = demo-only
```

```vue
<!-- StoryHeader.vue — the stamp carries the kind marker + the struck entrance -->
<code v-if="subpath" :data-kind="subpathKind"
  :class="cn('fira-code story-header-subpath story-header-stamp', animate && 'story-header-stamp--strike')">
  <span class="story-stamp-glyph" aria-hidden="true">{{ subpathKind === 'import' ? '▸' : '⌘' }}</span>{{ subpath }}
</code>
```

```css
/* the stamp STRIKES like a rubber stamp pressed onto paper (warm-glass placard fill per kind) */
.story-header-stamp { background: color-mix(in oklab, var(--glass-bg-floating), transparent 20%);
  backdrop-filter: var(--glass-blur-quiet); clip-path: inset(0 round var(--radius-pill)); }  /* halo-clipped per 2e */
.story-header-stamp[data-kind="route"] { /* flatter/quieter fill — clearly NOT a published import */
  background: color-mix(in oklab, var(--glass-bg-wash), transparent 30%); opacity: 0.86; }
@media not (prefers-reduced-motion: reduce) {
  .story-header-stamp--strike { animation: cel-stamp 420ms var(--ease-cartoon-punch) 200ms both; }
}
@keyframes cel-stamp { 0%{opacity:0;transform:scale(1.15) rotate(-1.5deg);} 60%{transform:scale(.98) rotate(.4deg);} 100%{opacity:1;transform:none;} }
@media (prefers-reduced-motion: reduce) { .story-header-stamp--strike { animation:none; } }
```

The gate's no-blank-subpath + kind-matches-format assert keeps the map ≡ the route set; ONE
convention, visually legible (import vs route), every page.

### 2d — the GLASS PLACARD-BAR condense + the cartoon SUBSUME (W-STICKY-TITLE-CONDENSE)

The `.story-hero-shrink` gains the warm-glass backing + the per-rung subsume on the SAME `scroll()`
timeline it already rides (`story-hero.css:332-335`). The occlusion fix + the merge hand-off:

```css
/* demo/stories/story-hero.css — the glass placard materializes on scroll (the scroll-FROM bar) */
@supports (animation-timeline: scroll()) {
  @media not (prefers-reduced-motion: reduce) {
    .story-hero-shrink::before {           /* the warm-glass backing — fades IN on scroll, NOT a permanent plate */
      content: ""; position: absolute; inset: 0 0 0 0; z-index: -1;
      background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength));
      backdrop-filter: var(--glass-blur-floating);
      clip-path: inset(0 round var(--radius-card));                 /* halo-clipped per 2e */
      border-block-end: var(--hairline) solid var(--story-header-rule);  /* the bar/body seam, REUSED token */
      opacity: 0; animation: placard-in linear both; animation-timeline: scroll();
      animation-range: 0 var(--hero-condense-range, 160px);
    }
    /* the SUBSUME: title condenses + slides into the stamp row; eyebrow+blurb RECEDE (tuck), stamp STAYS */
    .story-header-eyebrow, .story-header-blurb {
      animation: rung-tuck linear both; animation-timeline: scroll();
      animation-range: 0 var(--hero-condense-fade-range, 120px);
    }
    /* .story-hero-title shrinks (the shipped 0.82 scale) + .story-header-stamp persists (no fade) */
  }
}
@keyframes placard-in { to { opacity: 1; } }
@keyframes rung-tuck  { to { opacity: 0; transform: translateY(0.4rem); } }  /* RECEDES down + fades = tucked behind */
```

The body's `scroll-padding-top` reserves the settled bar height (anchor-jumps land BELOW the bar).
PRM keeps the LARGE static hero (no shrink, no subsume, no placard — the whole title readable, no
occluding fragment; the scroll still works). Native `scroll()`, zero JS — NO Lenis/GSAP/rAF.

### 2e — the corner-AA clip (CONSUME BD.W-CORNER-AA, library-wide)

The placard-bar (`::before`), the stamp, and the toc plate co-declare `clip-path: inset(0 round
<tier-radius>)` on the SAME element as their `backdrop-filter` (shown inline above). This is the
library-wide clip BD.W-CORNER-AA lands on `.glass-*` — the page-chrome surfaces inherit it by
construction (they ARE glass tiers). NO new clip token mints here; the page-chrome CONSUMES the
SOURCE wave's clip. The two-sided fission fence (the dock overhang exclusion) is untouched (the
page-chrome carries no fission pieces).

### 2f — the warm-glass toc placard + goo-morph active marker (the toc-glass fix)

```vue
<!-- demo/stories/navigation/toc-tracking.vue — the nav re-homes onto the warm-glass placard -->
<nav class="glass-floating toc-placard overflow-y-auto scrollbar-thin p-2 rounded-xl space-y-0.5">
```

```css
/* toc-tracking.vue <style> — the warm-glass toc placard + the goo-morphing active marker */
.toc-placard { clip-path: inset(0 round var(--radius-xl)); }          /* halo-clipped per 2e; .glass-floating gives the warm plate */
.toc-placard button { position: relative; color: var(--muted-foreground); }  /* legible inactive over the warm plate (AA) */
.toc-placard button[data-active] { color: var(--foreground); font-weight: 500; }
/* the active marker is ONE morphing warm pill that STRETCHES+SETTLES to the active item (liquid-weight) */
.toc-active-marker {
  position: absolute; inset-inline: 0.25rem; border-radius: var(--radius-md); z-index: -1;
  background: color-mix(in oklab, var(--primary), transparent 88%);    /* WARM tinted fill, NOT oklab gray */
  transition: transform 360ms var(--ease-cartoon-punch), block-size 360ms var(--ease-cartoon-punch);
}
@media (prefers-reduced-motion: reduce) { .toc-active-marker { transition-duration: 1ms; } }
```

The marker's `transform: translateY(<active item offset>)` + `block-size` (the item height) are set
from the existing `useScrollTracker` active-id (the marker FOLLOWS the deepest visible node — the
shipped logic, no new tracker). The §L4 squash-on-travel: the marker stretches slightly between
items then settles (an over-springy carousel reads cheap, but a TOC active-follow is a driver-snap —
calm-overdamped per §L2, `--ease-cartoon-punch` with the settle, not a bounce). PRM → instant.

---

## 3 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the header cluster | `StoryHeader.vue` — keep the eyebrow→title→blurb order + the 3-stage gravity; HALVE the title rung, augment the title stage with the punch + cast | parallel header |
| the title scale | the §L6 √φ ladder (`--type-display-2/3`) — re-point the chrome title off mega/audacious | a magic px |
| the dividing rule | `--story-header-rule` seam token (W-PAGE-CHASSIS, REUSED) on a `::after`, struck on entrance | a new seam token |
| the cel-slam + cast | `--ease-cartoon-punch` + `--motion-weight` + `--shadow-cartoon` (chassis GOLDEN / motion-spring DEPENDS) | a new motion engine |
| the route-stamp | the existing `manifest.ts` SUBPATHS map — derive the kind from the format; the chip reads it | a new path registry |
| the condense bar | the shipped `.story-hero-shrink` `scroll()` register + the `.glass-floating` tier — add the `::before` backing + per-rung subsume | a new scroll engine / opaque slab |
| the subsume | per-rung `opacity`/`transform` on the SAME `scroll()` source (no 2nd driver, no rAF/Lenis) | an IntersectionObserver subsume loop |
| the corner-AA | BD.W-CORNER-AA's library-wide `clip-path: inset(0 round …)` — CONSUME it | a 2nd corner-AA clip |
| the toc glass | the SAME `.glass-floating` warm-glass placard register as the condensed bar (DRY: one register, two homes) | a transparent `themed-card` fork |
| the toc active marker | the shipped `useScrollTracker` active-id → ONE morphing warm pill (goo-morph follow) | a new tracker |

**Net-new artefacts (ZERO new SFCs):** edits to four SHARED chassis files — `StoryHeader.vue` (the
title rung + the kind-marked stamp), `story-hero.css` (the √φ scale + the struck rule + the cel-slam
+ the placard-bar condense + the subsume), `manifest.ts` (the derived `subpathKind`), `toc-
tracking.vue` (the warm-glass placard + goo-morph marker). The library is BYTE-UNTOUCHED except the
BD.W-CORNER-AA clip (its OWN wave). One warm-glass placard register, two homes (condensed bar + toc).

**The dup-kill / reconcile (the four asks COLLAPSE onto ONE chassis edit, no overlap with the
116-wave set):** W-HEADER-SCALE (the √φ halve + the dividing rule), W-STICKY-TITLE-CONDENSE (the
placard-bar + subsume), W-PATH-STANDARDIZE (the kind-marked stamp), BD.W-CORNER-AA (the clip,
CONSUMED) are NOT four separate edits racing the same chassis files — they are ONE masthead
re-conception: the halved title IS the scale fix, the struck `::after` IS the dividing rule, the
`.glass-floating` `::before` IS the condense bar, the same warm-glass register IS the toc fix, the
kind-derive IS the path standard, and the clip is the SOURCE wave consumed. The DELTA-ASSAY folds
these into ONE page-chrome wave with the scale + rule + stamp + condense + toc arms — NOT four
overlapping waves. **No legacy, no alias, no dual path** — the transparent `themed-card` toc is
RE-HOMED, not kept; the bare condense is REPLACED, not aliased.

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7)

- **The condense + struck rule + cel-slam** are compositor-only (`transform`/`opacity`/static
  `backdrop-filter` on `animation-timeline: scroll()`/`view()`). `scroll()`/`view()` timelines are
  Baseline (Chrome 115+ / Safari 26+); `@supports (animation-timeline: scroll())` falls to the
  static large hero (the condense is pure progressive enhancement, never a break). The `cubic-bezier`
  punch easing is universal.
- **The warm-glass placard + toc** use `backdrop-filter: blur() saturate()` (plain blur, BOTH
  engines) over the composited warm field — never glass-samples-glass (the field is a `-z` sibling;
  §L1 holds). The `color-mix(in oklab, …)` warm fill is WebKit-native (Safari 16.2+); `@supports not
  (color-mix())` falls to a warm-hsl fill. sRGB interp pinned on the warm stops (the Safari oklab-
  default mud avoided).
- **The corner-AA clip** is `clip-path: inset(0 round …)` — Safari-safe (the b538dec7 mechanism,
  the saturate halo squares WORST on Safari, so the clip is load-bearing THERE). Co-declared on the
  same element as `backdrop-filter` (isolation-safe).
- **NO `backdrop-filter: url`, NO SVG goo, NO trig** in the page-chrome path — the goo (the toc
  active-marker "morph") is a CSS `transform`/`border-radius` `transition`, not a metaball filter
  (the masthead carries zero `filter:url`; the real metaball goo stays in the dock/blob demo
  CONTENT a `DemoStage` may host, never the chrome).
- **Acceptance = paired-engine π** (Chromium + WebKit captures of the condensed placard-bar over the
  real field + the warm-glass toc, both modes) — never a single-engine source-green close.

---

## 5 — A11Y / PRM CARVE (§L5)

- **`prefers-reduced-motion: reduce`** → the cel-slam + cast-lag + the struck-rule draw + the stamp-
  strike + the condense (shrink/subsume/placard-fade) + the toc marker morph ALL freeze to their
  terminal frame (`--motion-weight: 0` collapses the squash/overshoot/cast in one assignment; the
  `@media` gates zero the animations). Under reduce: the LARGE static hero holds on scroll (NO
  condensed bar, NO occluding fragment — the whole title readable, the page scrolls normally); the
  rule is present (not drawn); the stamp is stamped (not striking); the toc marker is in place (not
  morphing). The masthead choreography is a build, never a content dependency.
- **`prefers-reduced-transparency`** → the warm-glass placard + toc fall to their opaque tier (the
  library's shipped reduced-transparency arm) — the condensed bar + toc stay LEGIBLE (a solid warm
  fill), the transmission drops, the structure survives.
- **`prefers-contrast: more`** → the toc inactive items lift to `--text-strong`; the condensed-bar
  title + path-stamp guarantee AA over the worst-case backdrop pixel (the §L1 contrast bracket); the
  struck rule lifts to full opacity.
- **Semantics** — ONE `<h1>` (the chassis), the path-stamp is `<code>` with the glyph `aria-hidden`,
  the dividing rule is decorative (`::after`, no semantics), the toc is the shipped accessible `<nav>`
  with the active item marked (`aria-current`); the condense is visual (the sticky header is a
  presentation layer, the reading order is unchanged). The √φ halve IMPROVES the heading-scan (the
  title no longer dominates the AT tree's first viewport).
- **Proportion has NO a11y bracket** (§L6) — the √φ title, the φ header→body gap, the `1/φ` motion
  weight hold identically across all a11y states.

---

## 6 — THE BORN-RED GATE (painted-pixel, paired-engine, both modes — `proof:page-chrome`)

`tests-visual/page-chrome.spec.ts` + `scripts/proof-page-chrome.mjs` (the device-free source arm).
Born-RED on HEAD by construction (109px title, no rule, bare-text condense, same-coat paths, square
halo, transparent gray toc). Sample `/display/buttons`, `/navigation/toc-tracking`, `/motion/scroll-
choreography`. Sample the COMPOSITED pixel via screenshot raster + `getBoundingClientRect` + a REAL
scroll gesture — NEVER markdown-keyword grep, NEVER `getComputedStyle`-string-only.

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **C1 header-scale** | the chrome `data-variant="page"` h1 resolves `font-size ≤ ~½` the HEAD (≤ ~68px, the √φ rung), NOT mega/audacious; the header cluster ≤ ~½ the prior fold-share | `/buttons` 109.66px, cluster 168px/806vh | the √φ halve |
| **C2 dividing-rule** | a header→body rule paints (`--story-header-rule` `::after`, `border-bottom > 0`, `scaleX 1` settled); the frame-series shows it DRAWN left-to-right on entrance | `candidateRules: []` (none) | the struck rule |
| **C3 condense-bar (occlusion kill)** | scroll past the condense range → `.story-hero-shrink::before` rasters a NON-transparent warm-glass backing (`backdrop-filter ≠ none`, bg α ≥ floating floor); at scroll-0 the backing α ≈ 0 (materialize-on-scroll). The body in the bar's y-band is OCCLUDED by the glass bar, not visible-through bare title | bg `rgba(0,0,0,0)`, backdrop `none`, top -363 (scrolls off) | the placard `::before` |
| **C4 subsume (merge hand-off)** | the frame-series: title `opacity ≈ 1` (condensed) + path-stamp `opacity ≈ 1` (persists) WHILE eyebrow+blurb `opacity 1→0` + `translateY` down (tucked) | block-scale, no per-rung subsume | the per-rung tuck |
| **C5 path-stamp standard** | every page's stamp carries the kind marker (`data-kind="import"` ▸ for `@mkbabb/`, `data-kind="route"` ⌘ for `/cat/`); import≠route fill; the kind matches the format | both render identical, no marker | the kind-marked stamp |
| **C6 corner-AA** | every page-chrome glass tier (placard, stamp, toc) corner rasters CLEAN (no square saturate halo) — the `clip-path: inset(0 round …)` present on the `backdrop-filter` element, BOTH modes + WebKit | no clip, square halo | consume BD.W-CORNER-AA |
| **C7 toc warm-glass** | the toc `nav` rasters a WARM glass plate (`backdrop-filter ≠ none`, bg α > 0, OKLab C ≥ 0.045 warm H∈[25,95]) — NOT transparent, NOT gray; inactive items AA over the plate; the active marker MORPHS (transform-transition) between items | bg `rgba(0,0,0,0)`, backdrop `none`, gray active `oklab(0.216/0.1)` | the warm-glass placard |
| **C8 compositor-only** | no condense/rule/stamp/subsume/marker keyframe animates `font-size`/`width`/`height`/`padding`/`top` (the demo-arm CLS floor; transform/opacity/clip-path/backdrop only) | — | the compositor register |
| **C9 PRM** | under reduce: the large static hero holds on scroll (no bar, no occluding fragment); the scroll still works; the rule/stamp/marker present (not animating) | — | the §L5 carve |
| **C10 anti-evasion (≥7 bites)** | FAILS on: a 109px chrome title (C1), no dividing rule (C2), an opaque/permanent/transparent condense backing (C3), a block-scale no-subsume (C4), an unmarked path chip (C5), an unclipped square-halo corner (C6), a transparent/gray toc (C7), a layout-animating condense (C8), a condense surviving PRM (C9) | — | passes ONLY on the real technicolor masthead |

**Self-test:** pin the title to 109px → C1 RED; strip the `::after` rule → C2 RED; make the condense
backing transparent or a permanent opaque plate → C3 RED; block-scale the cluster → C4 RED; drop the
kind marker → C5 RED; remove the clip → C6 RED; transparent the toc → C7 RED; animate `top` in the
condense → C8 RED; survive a condense leg under PRM → C9 RED. Each MUST flag; the fixed tree clean.
**No source-green close — the painted, paired-engine, scroll-gesture π is the binding truth.**

---

## 7 — GESTALT — THE BAR (live-judge AS A USER, both modes, both engines, fresh paint, REAL scroll)

Open `/display/buttons` + `/navigation/toc-tracking` + `/motion/scroll-choreography`, both modes,
both engines, and SCROLL. PASS iff:

1. **The title is ~2× smaller** — the √φ chrome rung, the header clears ~½ the fold, the demo is
   above the fold. Today: NO (109px, cluster 168/806).
2. **A dividing rule reads** below the header — DRAWN in on entrance, proper hierarchy. Today: NO.
3. **The title condenses into a glass PLACARD-BAR the page scrolls FROM** — NOT bare floating text
   the page scrolls under (no occlusion); the title + path-stamp MERGE into one placard line, the
   blurb tucked behind. Today: NO (bare text, scrolls off, no bar).
4. **The paths are consistent + kind-marked** — every page's stamp says import-vs-route at a glance,
   one convention. Today: AMBER (data sound, no visual marker).
5. **The corners read CLEAN** — no square saturate halo on any glass tier, both modes + WebKit.
   Today: NO (square halo).
6. **The toc is a readable WARM glass placard** — not transparent gray; the active marker GOO-MORPHS
   between items with liquid weight. Today: NO (transparent, gray, unreadable).
7. **The masthead WEARS THE CARTOON** — it SLAMS in on the punch arc with a lagging cast, the rule is
   inked, the stamp is struck; the page-chrome finally carries the FLOW & PUNCH the body cels have.
   Today: NO (calm fade, no punch on the chrome).
8. **Both modes warm-luminous; prose AA holds; KISS/DRY** — ONE chassis edit, one warm-glass placard
   register (condensed bar + toc), the masthead is the first cel; zero fork, zero legacy.

The reference is the chassis GOLDEN's body cel-slam (the punch the body already has) + the iOS-27
condensing navigation-bar (the title shrinks into a glass bar you scroll from, the descriptor
subsumed). The page-chrome finally inherits BOTH — the cartoon on the masthead, the glass placard on
the condense, by construction, on every page.

---

## 8 — THE DELTA-ASSAY (reconcile vs the 116-wave set — no dup)

SOURCE-VERIFIED (grep/live): the four named waves EXIST — `W-HEADER-SCALE.md` (the √φ halve + the
dividing rule), `BD.W-STICKY-TITLE-CONDENSE.md` (the placard-bar + subsume, fully specced), `W-PATH-
STANDARDIZE.md` (the published-vs-demo convention), `BD.W-CORNER-AA.md` + `BD.W-CORNER-AA-WIDEN.md`
(the library-wide clip). The live tree CONFIRMS each defect (h1 109px, no rule, bare-text condense
`top:-363`, same-coat paths, no clip, transparent gray toc).

**The amendment:** these four asks + the toc-glass concern reconcile into ONE page-chrome wave
(`BD.W-PAGE-CHROME`, the masthead-marquee union) with FIVE arms — (1) the √φ-halve + struck rule
[W-HEADER-SCALE], (2) the placard-bar condense + cartoon subsume [BD.W-STICKY-TITLE-CONDENSE], (3)
the kind-marked struck stamp [W-PATH-STANDARDIZE], (4) the corner-AA clip [CONSUME BD.W-CORNER-AA,
not re-minted], (5) the warm-glass toc placard + goo-morph marker [the toc-glass fix]. They share the
SAME chassis files (`StoryHeader.vue`/`story-hero.css`) + the SAME warm-glass placard register
(condensed bar ≡ toc), so they bind into ONE wave with one gate (`proof:page-chrome`) + one π
(`page-chrome.spec.ts`), NOT five overlapping waves racing the same files. The corner-AA stays its
OWN library-source wave (BD.W-CORNER-AA — it bites every `.glass-*`, not just the chrome); the
page-chrome wave DEPENDS on it (consumes the clip), no dup. The chassis GOLDEN's cel-slam register
(`--ease-cartoon-punch`/`--shadow-cartoon`) is a DEPEND, never re-minted. The W-PAGE-CHASSIS
`--story-header-rule` seam token is a DEPEND (the struck rule + the bar bottom hairline both read it).

**No dup, no fork, no legacy.** The page-chrome wave is the masthead arm of the story-page standard:
the chassis GOLDEN owns the BODY (the field + the cels); this owns the CHROME (the marquee header +
the condense + the toc), sharing the warm-glass placard register and the punch vocabulary.
