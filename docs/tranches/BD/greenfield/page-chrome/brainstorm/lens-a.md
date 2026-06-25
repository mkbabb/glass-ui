# PAGE-CHROME — lens-a: THE CONDENSING WARM-GLASS MASTHEAD (one `--chrome-t` scalar · the masthead IS the bar · √φ-halved rung · concentric corner-clip)

> GREENFIELD brainstorm, PURE iOS-27 fidelity. The page CHROME redesigned from first principles —
> StoryHeader (title · subtitle · path · scroll-condense), the dividing rule, the path standardization,
> the page corner-aliasing clip, the toc-tracking glass — as ONE coherent masthead system that is a
> UNION with the shipped `StoryHeader`/`StoryPage`/`story-hero.css` chassis + the `.paper-field` ground +
> the shared `.glass-floating`/`.glass-menu-row` register + the §L6 √φ proportion. No re-fork. KISS.
>
> **Live-interrogated** (`:5173`, chrome-devtools, both modes, a real scroll gesture). The numbers below
> are MEASURED `getComputedStyle`/`getBoundingClientRect`, not asserted. Shots in `./shots/`.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173`, both modes, all six asks)

| ask | live measurement (`:5173`) | verdict |
|---|---|---|
| **HEADER SCALE** | `/display/buttons` h1 = **109.7px** (lineHeight 115px), fills the top band; `/navigation/toc-tracking` h1 = **86.1px**; on a 806px viewport the title eats ~14% of the fold before any content | RED — 2× the §L6 heading/title band; matches `BD.W-HEADER-SCALE`'s 109.7/86.1px |
| **DIVIDING RULE** | no header→body rule on `/display/buttons`; the ONLY `border-bottom` near the header is the **subpath chip's own** `1px / 0.08` underline — there is NO masthead→content seam | RED — no design-hierarchy divider below the header cluster |
| **STICKY-CONDENSE** | `.story-hero-shrink` is `position: sticky; z-index: 2`; on scroll it carries `animation-timeline: scroll()` `transform: scale(0.82)` BUT `background: rgba(0,0,0,0)` + `backdrop-filter: none` — **bare floating text the page scrolls UNDER**; no per-rung subsume (eyebrow/blurb scale with the block) | RED — the occlusion bug; matches `BD.W-STICKY-TITLE-CONDENSE` |
| **PATH-STANDARDIZE** | census: **104** `@mkbabb/glass-ui/<sp>` rows vs **28** local `/cat/slug` rows in `manifest.ts`; `/display/buttons` → `@mkbabb/glass-ui/button`, `/navigation/toc-tracking` → `@mkbabb/glass-ui/sidebar` | RED — no single convention; matches `W-PATH-STANDARDIZE`'s 28-vs-90 |
| **CORNER-ALIASING** | `grep clip-path src/styles/glass/ladder.css` = **0**; every `.glass-*` backdrop-saturate halo bleeds a SQUARE behind the rounded silhouette → jaggy corner fringe | RED — matches `BD.W-CORNER-AA` |
| **TOC GLASS** | `/navigation/toc-tracking` the active ToC row reads as a flat gray plate (`oklab(0.97 … / 0.8)`, `backdrop-filter: none`) over the vibrant aurora field — opaque-gray, NOT warm transmissive glass; the rail bg is `rgba(0,0,0,0)` | RED — unreadable gray; matches `BD.W-TOC-MENU-GLASS` |

**The two-page gestalt:** `/display/buttons` reads as a 110px title slammed against a flat tan card with no
seam — a poster headline with no hierarchy below it. `/navigation/toc-tracking` reads as a beautiful warm
aurora field with a SPEC-SHEET gray TOC list bolted on top — the field is alive, the chrome is dead.
**The chrome is the last un-warmed, un-proportioned, un-condensing surface in the page** — every ask is
the SAME defect class: the chrome never inherited the glass + proportion + liquid-weight the field and the
demo cels already carry.

---

## 1 — THE GOLDEN IDEA: ONE `--chrome-t` scroll scalar drives a MASTHEAD that condenses into the bar it has always been; the resting masthead is a √φ-proportioned warm-glass cluster with a real seam; the corner-clip + the toc-glass + the path are the same warm-glass register applied to the chrome's three other surfaces

The page chrome is not five fixes — it is **ONE surface with ONE state machine.** The masthead is a glass
object that has two poses (resting full · condensed bar) interpolated by a single native `scroll()`-timeline
scalar `--chrome-t ∈ [0,1]`, and every other ask (the rule, the path, the corners, the toc) is the same
**warm-glass-not-gray register** applied to the chrome's remaining surfaces. Four reconciled moves, each a
UNION with a shipped seam:

**(A) The header rung HALVES off the §L6 √φ ladder, at the chassis, once (UNION with `BD.W-HEADER-SCALE`).**
The over-scale is a chassis SELECTION bug, not a library identity bug — the audacious √φ display ladder
(`scale.css --type-display-*`) is CORRECT as the library signature; the demo header picked too high a rung.
The fix is the `HALVED_HERO_RUNG` map (a `demo/stories/hero-scale.ts` constant the ONE `heroClass` computed
reads): `hero`/`mega` → `text-display-2` (≈44px), `5` → `text-display-2`, `4` → `text-title` (≈33px). The
relative weight is PRESERVED (a marquee stays larger than a sub) — the band is COMPRESSED into the
heading/title rung, not flattened. The library ladder is byte-untouched (the fence). 109.7px → ~44px.

**(B) The masthead CONDENSES into a warm-glass BAR on ONE `--chrome-t` scalar — the occlusion bug dies
(UNION with `BD.W-STICKY-TITLE-CONDENSE`).** The resting masthead is `eyebrow → path-chip → big-title →
blurb`. As the route-scroller advances, ONE native `scroll()` timeline drives `--chrome-t` 0→1 over the
post-halving title height, and the masthead interpolates toward `condensed-title · path-chip` on a slim
glass bar:
- a **`.story-masthead-bar` backing** (a dedicated backing layer, not bare text) fades its `opacity` 0→1 on
  `--chrome-t`, painting the SHIPPED `.glass-floating` recipe (`backdrop-filter: var(--glass-blur-floating)`
  + `background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) …)`) — so at rest
  the masthead is the bare large title (NO plate), and past the condense range the title sits IN a real
  transmissive glass bar the page scrolls FROM, not UNDER. The occlusion bug is the *absence* of this
  backing; this IS the fix.
- the **title CONDENSES** (`scale` toward the bar's compact rung) + PERSISTS; the **eyebrow + blurb FADE**
  (`opacity 1→0`, the subordinate descriptor) on the SAME `--chrome-t`; the **path-chip PERSISTS** (the
  route identity it subsumes INTO). The user's "one subsumes the other," canonicalized: title condenses +
  path persists, descriptor takes its leave.
- the bar carries the **header→body HAIRLINE seam** (move C) as its bottom edge, coupled to the backing
  opacity — so the resting masthead seam IS the condensed bar's seam, one token, one rule.

**(C) The DIVIDING RULE and the CORNER-CLIP are the SAME warm-glass edge discipline, on dark-adaptive
tokens (UNION with `BD.W-PAGE-CHASSIS` `--story-header-rule` + `BD.W-CORNER-AA`).** The masthead→body rule
is a `--story-header-rule` hairline (the dark-adaptive `--configurator-divider` family — NEVER an inline
`rgba()` alpha that the `light-dark()` inset trap or the dark-glass plate swallows). The page corner
aliasing is the SAME concern one layer out: every `.glass-*` surface co-declares `clip-path: inset(0 round
<tier-radius>)` on the SAME element as its `backdrop-filter`, clipping the square saturate-halo to the
rounded silhouette (the lost `b538dec7` mechanism, library-wide, Safari-verified). The masthead bar's own
corners inherit the clip by construction (it IS a `.glass-floating` surface). The "flatter" iOS-27 lozenge
(the `--btn-corner-radius` reduction) re-resolves the clip in lockstep — a tighter corner is still
halo-clipped. ONE edge discipline: every glass corner is a CLEAN warm-glass corner, every surface boundary
is a dark-adaptive hairline.

**(D) The PATH and the TOC are the chrome's two remaining surfaces, warmed onto the SAME register (UNION
with `W-PATH-STANDARDIZE` + `BD.W-TOC-MENU-GLASS`).** The path is ONE convention read from the manifest:
exported component → `@mkbabb/glass-ui/<subpath>` (what a consumer types), demo-only facility → `/cat/slug`
(clearly not a published import), the SFC import matching the chip. The path-chip is a `.fira-code`
code-rung that persists into the condensed bar (it IS the route identity move-B subsumes into). The
TOC-tracking list retires the dead `.themed-card` orphan + the raw gray `bg-primary/10`/active-plate onto
`.glass-menu-row` (the hover-lift glass-quiet plate) with the active state reading as **warm transmissive
glass** (`.glass-floating` tinted, the active row picks up the field hue) + `--on-glass-muted` text — so the
TOC over the aurora field reads as warm glass-on-glass, the BA.W-NO-GRAY warm floor, never the measured
`oklab(0.97 … /0.8)` gray slab.

### The single boldest move (de-risk target)

> **The masthead is not a header that *gets* a sticky behavior — it is a single glass OBJECT with a resting
> pose and a condensed pose, and `--chrome-t` (ONE native `scroll()` scalar) is the only thing that moves
> it; the same warm-glass register that paints the condensed bar paints the dividing rule (its seam), the
> corner-clip (its silhouette), and the TOC active row (its sibling chrome surface) — so all six asks are
> ONE warm-glass masthead system, not five patches.** The masthead's resting seam IS the condensed bar's
> seam; the bar's corners ARE the library-wide halo-clip; the path-chip the bar subsumes into IS the
> standardized route identity; the TOC active glass IS the same `.glass-floating` tint. One register, one
> scalar, one edge token — six asks fall out by construction.

This is DRY-er than five waves (one `--chrome-t` register + one warm-glass edge token vs five bespoke
fixes), KISS (no new engine — it RE-POINTS the shipped `.story-hero-shrink` `scroll()` substrate +
`.glass-floating` + `--story-header-rule` + `.glass-menu-row` + the `clip-path` mechanism, all shipped or
specced), and it lands the §3 warm-glass-not-gray identity on the LAST surface that lacked it — the chrome.

---

## 2 — THE MECHANISM (the union — reuse, no fork; exact files/tokens/recipes)

### 2a — `--chrome-t` : the ONE masthead scalar (CONSUME `.story-hero-shrink` native `scroll()`)

ONE register edit on the SHARED `demo/stories/story-hero.css` `.story-hero-shrink` cluster — NOT a new
scroll engine. The condense rides `animation-timeline: scroll()` off the `<main>` route-scroller (the
shipped native substrate, measured live: `animationTimeline: "scroll()"`, `transform: scale(0.82)`). The
masthead gains:

```css
/* demo/stories/story-hero.css — the masthead bar (AUGMENTS the shipped .story-hero-shrink) */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    /* the glass backing — a dedicated layer, fades IN on the SAME scroll() timeline (the occlusion fix) */
    .story-hero-shrink::before {
      content: ""; position: absolute; inset: 0 0 -1px 0; z-index: -1; border-radius: inherit;
      backdrop-filter: var(--glass-blur-floating);                 /* shipped tier — NOT an opaque slab */
      background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength));
      border-bottom: var(--story-header-rule);                     /* the seam = move C, dark-adaptive token */
      clip-path: inset(0 round var(--radius-card));                /* move C corner-clip on the bar's own halo */
      opacity: 0; animation: chrome-bar-in linear both; animation-timeline: scroll();
    }
    /* the per-rung subsume — title condenses+persists, descriptor fades, path-chip persists */
    .story-header-eyebrow, .story-header-blurb {
      animation: chrome-subsume-out linear both; animation-timeline: scroll();
    }
    /* .story-hero-title + .story-header-subpath do NOT fade — they are the condensed identity */
  }
}
@keyframes chrome-bar-in   { 0%,40% { opacity: 0; } 100% { opacity: 1; } }   /* materialize ON scroll */
@keyframes chrome-subsume-out { 0%,30% { opacity: 1; } 100% { opacity: 0; } }
```

The backing is COMPOSITOR-ONLY (`opacity` + static `backdrop-filter` — no layout property animates; the box
is the sticky cluster's own resolved box). The whole register lives INSIDE the shipped
`prefers-reduced-motion: no-preference` gate — under reduce the large static hero holds, no condensed bar,
no occluding fragment (the vestibular floor; the page still scrolls). Off `@supports` (`scroll()` Baseline
Safari 26+) the static large title paints — pure progressive enhancement. The body's `scroll-padding-top`
reserves the settled bar height so anchor-jumps land below the bar. **One edit → all 118 pages.**

### 2b — the HALVED rung (CONSUME `BD.W-HEADER-SCALE`'s `HALVED_HERO_RUNG`)

```ts
// demo/stories/hero-scale.ts (the ONE rung-selection seam — both StoryHero + StoryPage read it)
export const HALVED_HERO_RUNG = {
  audacious: "text-display-3",  // 352 → ~59
  mega:      "text-display-2",  // 177 → ~44
  hero:      "text-display-2",  // 244.8 → ~44
  "5":       "text-display-2",  // 109.7 → ~44
  "4":       "text-title",      // 86.1 → ~33
} as const;
// heroClass = computed(() => HALVED_HERO_RUNG[props.heroScale])  — the text-display-${heroScale} template RETIRED (clean break)
```

The library `scale.css --type-display-*` ladder is byte-untouched (the fence). The condense range in 2a
re-tightens to the post-halving title height (a ~44px title settles into the bar quickly — the condense
finally reads, where over a 244px 2-line title it never started).

### 2c — the warm-glass EDGE token (the rule + the corner-clip, CONSUME `--story-header-rule` + `BD.W-CORNER-AA`)

ONE dark-adaptive hairline token paints BOTH the masthead seam AND the bar's bottom edge — plain per-mode
arms, NEVER an inline `rgba()` alpha (the `light-dark()` inset-shadow trap + the dark-glass-plate swallow):

```css
/* demo/stories/story-hero.css — the masthead→body seam (resting), reused as the bar's bottom edge (2a) */
:root      { --story-header-rule: 1px solid var(--configurator-divider); }        /* dark-adaptive family */
.story-header-cluster { border-bottom: var(--story-header-rule); padding-block-end: calc(1rem * var(--phi-inv)); }
```

The corner-aliasing is the SAME edge concern one tier out — `BD.W-CORNER-AA`'s library-wide clip on the
glass ladder (`src/styles/glass/ladder.css`, currently `0` clip-paths):

```css
/* src/styles/glass/ladder.css — co-declared on the SAME element as backdrop-filter (isolation-safe) */
.glass-floating, .glass-resting, .glass-quiet, .glass-wash, .glass-overlay, .glass-card {
  clip-path: inset(0 round var(--radius));   /* each tier reads its OWN corner token; the saturate halo clips to the silhouette */
}
/* the two-sided fission-clip fence (BF C4) PRESERVED: .dock-fission-piece/.liquid-island-host/.glass-dock excluded (overhang by design) */
```

`inset(… round …)` is Safari-native (worst-case engine for the squared halo — load-bearing there). The
masthead bar inherits the clip because it IS a `.glass-floating` surface.

### 2d — the PATH convention (CONSUME `W-PATH-STANDARDIZE` + the manifest as single source)

ONE rule, read from the manifest `subpath`/`importPath`, the chip + the SFC import in lockstep:
- exported component → `@mkbabb/glass-ui/<subpath>` (104 rows already; the published surface).
- demo-only facility (foundations token tour, composition) → `/cat/slug` (the 28 rows; clearly not an
  import).
- the SFC import MUST match the chip (no relative-deep-path while the chip says subpath — the glass-ui
  binding-verification consistency).
- the `StoryHeader` `.story-header-subpath` `<code>` chip is the persistent route identity move-B subsumes
  into — so standardizing the path ALSO standardizes the condensed bar's identity rung.

### 2e — the TOC warm-glass (CONSUME `BD.W-TOC-MENU-GLASS` + `.glass-menu-row` + `--on-glass-muted`)

`demo/stories/navigation/toc-tracking.vue` re-points (zero src paint — every target ships):
- retire the dead `.themed-card` orphan (`:125`/`:160`, ZERO backing rule — a class that never paints) →
  `.glass-quiet`/`.glass-resting` tier container (clean break).
- the raw `bg-primary/10`/`hover:bg-muted/50` rows → `.glass-menu-row` (the hover-lift glass-quiet plate).
- the active row → **warm transmissive glass**: `.glass-floating` tinted, the active row reading
  `color-mix(… var(--glass-tint-source) …)` so it picks up the field hue over the aurora — NOT the measured
  `oklab(0.97 … /0.8)` gray slab. `--on-glass-muted` for the ToC text rung.

So the TOC over the aurora field reads warm-glass-on-glass, both modes (the dark active row glows warm, not
charcoal) — the same register move-B paints the condensed bar with.

---

## 3 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the condense substrate | `.story-hero-shrink` `animation-timeline: scroll()` (shipped native, measured live) | scroll engine / Lenis / rAF loop |
| the bar glass | `.glass-floating` recipe (`--glass-blur-floating` + `--glass-bg-floating` + `--glass-tint-source`) | a re-authored opaque slab |
| the header rung | `HALVED_HERO_RUNG` map (ONE `heroClass` seam) off the byte-untouched `scale.css` √φ ladder | a library ladder shrink |
| the seam + bar edge | `--story-header-rule` = `--configurator-divider` (dark-adaptive, plain per-mode arms) | an inline `rgba()` alpha |
| the corner-clip | `clip-path: inset(0 round …)` co-declared on the glass-ladder tiers (`BD.W-CORNER-AA`) | a `corner-shape` superellipse on the header |
| the path | the manifest `subpath` single source + the one convention | a second label registry |
| the TOC glass | `.glass-menu-row` + `.glass-floating` tint + `--on-glass-muted` (`BD.W-TOC-MENU-GLASS`) | a bespoke toc card |
| the proportion | `--phi-inv` (1/φ) header rhythm + the √φ rung; concentric `r_inner = r_outer − gap` on the bar | a magic px |

**Net-new artefacts (small):** the `.story-hero-shrink::before` masthead-bar register + the per-rung subsume
in `demo/stories/story-hero.css`; the `clip-path` co-declaration in `src/styles/glass/ladder.css` (the ONE
src paint — `BD.W-CORNER-AA`'s library-wide fix); `demo/stories/hero-scale.ts` (the halving map); the
`toc-tracking.vue` re-point; the `manifest.ts` path reconcile. Everything else is SHIPPED.

**The dup-kill / reconcile (the six asks COLLAPSE onto ONE masthead system — see §5 DELTA-ASSAY):** the
condense backing IS the occlusion fix AND the rule's surface; the rule token IS the bar's bottom edge; the
corner-clip is the bar's silhouette discipline generalized library-wide; the path is the bar's identity
rung; the toc glass is the same `.glass-floating` register. They are not six waves racing the same files —
they are ONE warm-glass masthead the existing six waves already decompose correctly. **No legacy, no alias,
no dual path.**

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7) + A11Y / PRM (§L5)

- **The condense is native `scroll()` timeline** — Baseline (Chrome 115+/Safari 26+); `@supports`-gated to
  the static large title off-support. ZERO runtime (no Lenis/GSAP/rAF — the native-first fence). Compositor
  only (`opacity` + `transform` + static `backdrop-filter`; no `font-size`/`width`/`top` animates — the CLS
  floor).
- **The corner-clip** `clip-path: inset(0 round …)` is Safari-NATIVE (the saturate halo squares WORST on
  WebKit — the clip is load-bearing there; the binding readback the user's screenshot demands). Co-declared
  on the SAME element as `backdrop-filter` (isolation-safe). The two-sided fission-clip fence preserved.
- **The glass** is `backdrop-filter: blur() saturate()` (plain, both engines) over the `.paper-field`
  composited output — never glass-samples-glass (§L1 holds; the field is a `-z` sibling). NO
  `backdrop-filter: url`, NO SVG goo in the chrome path.
- **PRM** (`prefers-reduced-motion: reduce`) → the condense + subsume + backing-fade FREEZE; the large
  static hero holds, no condensed bar, no occluding fragment — the page scrolls normally (the vestibular
  floor; the scroll itself never drops). The rule + the corner-clip + the path + the toc glass are STATIC
  (no a11y bracket).
- **`prefers-reduced-transparency`** → the bar + the toc glass fall to the library's opaque tier; the seam +
  the path + the halved rung survive (transmission is enhancement, never legibility dependency).
- **Semantics** — ONE `<h1>` (the halved rung), the path-chip is `<code>`, the toc is an ordered
  `<nav>`/`<button>` set (its own keyboard/focus); the condense is visual, the tab-order stays
  reading-order; `--on-glass-muted` holds AA over the warm field.

---

## 5 — THE DELTA-ASSAY (reconcile vs the 116-wave set — NO dup; the wave-amendment)

Every ask maps to an EXISTING wave — this lens is a UNION/reconcile, not a new wave fork:

| ask | EXISTING wave (grep-verified on disk) | reconcile |
|---|---|---|
| HEADER SCALE | `BD.W-HEADER-SCALE.md` (`union/waves/`) — the `HALVED_HERO_RUNG` map, byte-untouched ladder | adopt as-is (move A) |
| STICKY-CONDENSE | `BD.W-STICKY-TITLE-CONDENSE.md` (`union/waves/`) — the `.story-hero-shrink` glass backing + per-rung subsume | adopt; this lens UNIFIES its `--chrome-t` scalar with the rule (the bar's bottom edge) + the corner-clip (the bar's silhouette) so the bar is ONE object |
| PATH-STANDARDIZE | `W-PATH-STANDARDIZE.md` (`union/waves/`) — the manifest-single-source convention | adopt as-is (move D) |
| CORNER-ALIASING | `BD.W-CORNER-AA.md` + `BD.W-CORNER-AA-WIDEN.md` (`union/waves/`) — library-wide halo-clip | adopt as-is (move C); the masthead bar inherits the clip |
| DIVIDING RULE | folded into `BD.W-PAGE-CHASSIS` (`--story-header-rule` arm-1) | adopt the token; this lens REUSES it as the condensed bar's bottom edge (no second rule token) |
| TOC GLASS | `BD.W-TOC-MENU-GLASS.md` (`waves/`) — `.glass-menu-row` + `.glass-floating` tint re-point | adopt as-is (move E) |

**The amendment (no dup):** the six waves already exist and already decompose correctly — the lens's
contribution is the **UNIFICATION**: declare the `--story-header-rule` seam, the `.story-hero-shrink::before`
backing's bottom edge, and the corner-clip as ONE warm-glass edge discipline reading ONE dark-adaptive token
+ ONE `clip-path` mechanism, so `BD.W-STICKY-TITLE-CONDENSE` REUSES the `BD.W-PAGE-CHASSIS` rule (its C2
clause already mandates this) and the `BD.W-CORNER-AA` clip (the bar is a `.glass-floating` member of the
library-wide clip set, no bar-special-case). **No new wave is minted; no wave is duplicated.** The set
already carries one wave per ask; this lens binds them into one masthead system at the chassis seam.

---

## 6 — THE BAR (gestalt, both modes, both engines, fresh paint + a REAL scroll gesture)

PASS iff, on a fresh both-mode `:5173` capture of `/display/buttons` + `/navigation/toc-tracking` +
`/motion/scroll-choreography`, WITH a real scroll gesture:

1. **The header is ~2× smaller** — the title reads as a confident heading/title-band marquee (~33-59px),
   leaving the viewport for content. Today: NO (109.7/86.1px). Target: ~44/33px.
2. **A dividing rule** separates the masthead from the body (dark-adaptive hairline, both modes). Today: NO.
3. **The title CONDENSES into a warm-glass bar the page scrolls FROM** (not bare text it scrolls UNDER); the
   eyebrow/blurb subsume away, the title + path-chip persist. Today: NO (transparent bare text, z-index 2).
4. **One consistent path** convention every page (exported → `@mkbabb/glass-ui/<sp>`, demo-only →
   `/cat/slug`). Today: NO (104 vs 28 drift).
5. **Clean warm-glass corners** — no square saturate-halo fringe on any `.glass-*` surface, Chrome AND
   Safari. Today: NO (0 clip-paths).
6. **A readable warm-glass TOC** — the active row reads warm transmissive glass over the field (not the
   measured gray `oklab(0.97 … /0.8)` slab), both modes. Today: NO.
7. **It is ONE masthead system** — the rule IS the bar's seam, the corners ARE the library clip, the path IS
   the condensed identity, the toc IS the same glass register; conformity by construction, KISS/DRY, zero
   fork, zero legacy.

The reference is the SHIPPED warm aurora field already behind `/navigation/toc-tracking` — the chrome
finally inherits its warm-glass language, condensing and proportioned, by construction.
