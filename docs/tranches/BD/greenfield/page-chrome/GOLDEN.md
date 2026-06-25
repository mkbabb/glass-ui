# PAGE-CHROME — GOLDEN: the CONDENSING WARM-GLASS MARQUEE (one `--chrome-t` scalar · the chrome/hero SCALE SPLIT · the cel-slam masthead · the warm-glass placard register shared by the condensed bar AND the toc · one `--chrome-rule` seam · the library-wide corner-clip)

> The canonical synthesis of **lens-a** (ONE `--chrome-t` scalar drives a masthead with two poses;
> every other ask is the SAME warm-glass register applied to the chrome's remaining surfaces — the
> structural keel + the union discipline), **lens-b** (the chrome/hero SCALE **SPLIT** — the chrome
> title reads a calm `--chrome-title-rung`, the protagonist hero `<h1>` KEEPS the audacious tiers; the
> ONE `--chrome-rule` seam token; the explicit cross-engine/perf ledger; the DEDICATED sticky element
> that fixes the live "doesn't stick" defect), and **lens-c** (the 1940s-technicolor cel-slam masthead
> with a LAGGING cast, the STRUCK dividing rule, the kind-marked STAMP, the goo-morph toc marker — the
> AUDACITY the binding law demands). The page CHROME redesigned from first principles as a UNION with
> the shipped `StoryHeader`/`StoryPage`/`story-hero.css` `.story-hero-shrink` register + the shared
> `.glass-floating` tier + the `.glass-menu-row` plate + the §L6 √φ ladder + the **story-page-standard
> GOLDEN** (the masthead is that standard's CHROME arm; the body is its field-is-floor arm) + the
> **motion-spring GOLDEN** (`--ease-cartoon-punch`/`--motion-weight` DEPENDS, never re-minted). No
> re-fork, no second scroll engine, no parallel header system, NO LEGACY. Tranche-dev only.
>
> **De-risked LIVE** (Chrome, dark mode, the THREE boldest mechanisms at once) — `golden/spike.html`,
> resting + condensed poses captured. Measured: the chrome title resolves **46.4px** (~½ the live
> 109px); at scrollTop 0 the placard backing `opacity = 0` (bare title, no plate — the occlusion-kill);
> at scroll past the range the backing materializes to a warm-glass bar the body scrolls FROM, the
> eyebrow/blurb tuck, title+stamp persist; `backdrop-filter` is STATIC `blur(20px) saturate(1.7)` (no
> per-frame re-blur — Safari-safe); the toc active marker is a WARM tinted pill, never gray. The
> corner-clip reads clean on every glass tier.

> **HARDENING BANNER (the three challenges folded · DELTA-ASSAY.md + WAVE-AMENDMENT.md · orch
> LIVE-VERIFIED Chrome :5173 2026-06-24).** The IDEA survives (REFINE-dominant, ~74%), born-RED
> reproduced on every ask. THREE folds re-shape the mechanism — read DELTA-ASSAY/WAVE-AMENDMENT for the
> binding form:
> - **§2e is DESTRUCTIVE as written (ch#1 R1+R2, DECISIVE).** `clip-path` on the shadow-bearing host
>   AMPUTATES every glass tier's floating lift + iOS under-shadow (CSS Masking spec; `ladder.css:49/405-418`;
>   live data-URL probe). RE-SPEC: clip a backdrop-only CHILD, never the host; clip to the tier's OWN
>   radius token (NOT `var(--radius)`=10px, which inner-notches the live 16px box); gate the shadow-SURVIVAL.
> - **the register paints GRAY on the default path (ch#3 R1).** `--glass-tint-strength: 0%` live → the
>   `color-mix(… --glass-tint-source --glass-tint-strength)` recipe is a NO-OP neutral plate. The spike
>   was a false-positive (it INLINED 14%). The `--chrome-glass` register must EXPLICITLY set a nonzero warm
>   floor + point `--glass-tint-source` at the per-page `--hue`. Gate samples chroma ≥ 0.045 at the
>   RESOLVED strength on the REAL page.
> - **the Safari fence is Chrome-asserted (ch#2 R1/R2/R3/R5).** The bar must paint a STATIC warm-glass
>   floor on EVERY engine (the `scroll()` ramp only animates opacity); the backing moves off the neg-z
>   `::before` onto a REAL sibling `.story-hero-bar` div; the condensed pose pushes opaque (no nested
>   `backdrop-filter` over body glass); the warm mix targets a warm low-α stop, not bare `transparent`. The
>   π re-captures these in the WebKit project.
> Plus: the toc marker morphs on **transform only** (no `height`/`block-size`; ch#2 R4) via `useTabIndicator`
> + the shipped `useScrollTracker` (no 2nd scroll listener; ch#2 R6); the stamp drops the Unicode `⌘`/`▸`
> (tofu/semantics; ch#1 R7) for a CSS-drawn marker + `aria-label` (AT-legible; ch#3); the condense range
> reuses the shipped `--hero-condense-range` 160px (not 170; ch#2 R8); the entrance cel-slam +
> `--shadow-cartoon` title cast DEPEND on the un-landed motion-spring/cartoon-shadow siblings
> (`--ease-cartoon-punch`/`--motion-weight` UNSET live; ch#3 R5). KEEP: the register unification, the scale
> SPLIT, the `--chrome-rule` one-token-three-readers, the `themed-card` re-home, punch-on-entrance/
> settle-on-scroll.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173` + grep at HEAD, all six asks)

| ask | live measurement / grep at HEAD | verdict |
|---|---|---|
| **HEADER SCALE** | `StoryPage.vue:114` `text-display-${heroScale}`, `heroScale` defaults `"4"` (`:59`); `/display/buttons` chrome `<h1>` = **109.66px**, lineHeight 115px — the chrome title is the PROTAGONIST rung, no chrome/hero split | **RED — ~2× the §L6 display band; the chrome title is loud where it should be a calm label** |
| **DIVIDING RULE** | no header→body rule; `--story-header-rule` referenced in waves but **defined nowhere** in `src/` (grep 0); the only border near the header is the subpath chip's OWN box edge | **RED — no masthead→content seam token exists** |
| **STICKY-CONDENSE** | `story-hero.css` `.story-hero-shrink` is `position:sticky; z-index:2` and ALREADY comma-appends the subordinate-fade (eyebrow/blurb → 0, title/subpath persist) + `transform: scale(0.82)` — BUT `background: rgba(0,0,0,0)` + `backdrop-filter: none`: **bare text the page scrolls UNDER**; lens-b measured `top:-563` at scroll (the cluster flow-height is consumed, the sticky context breaks) | **RED — the occlusion bug: the condense scales the title but paints NO glass backing → the page scrolls under bare text, no bar to scroll FROM** |
| **PATH-STANDARDIZE** | `manifest.ts:204` `SUBPATHS` table exists (`@mkbabb/glass-ui/<sp>` for exported, `/cat/slug` for demo-only); the convention is RECORDED but the chip renders both identically — no visual marker says "this one you can type" | **AMBER — data convention sound; the chip gives no visual standard + the SFC-import-matches-chip arm is unasserted** |
| **CORNER-ALIASING** | `grep clip-path src/styles/glass/ladder.css` = **0**; every `.glass-*` backdrop-saturate halo bleeds a SQUARE behind the rounded silhouette → jaggy corner fringe (worst on WebKit) | **RED — no halo clip; the lost `b538dec7` mechanism** |
| **TOC GLASS** | `toc-tracking.vue:125/160` `nav.themed-card` resolves `background: rgba(0,0,0,0)` + `backdrop none` (a class that never paints); rows use raw `bg-primary/10` (`:134/:148`); the active state reads a near-gray low-α plate over the vibrant aurora | **RED — the toc has NO glass plate; gray-not-warm; "UNREADABLE" (the user's verbatim)** |

**The gestalt:** the page chrome is the LAST un-warmed, un-proportioned, un-condensing surface in the
page. The body cels already wear the warm-glass + the cel-slam (the story-page-standard GOLDEN); the
field is alive (the page-background GOLDEN); the type ladder is audacious (T15, bettered). The chrome —
the masthead, the condensed bar, the seam, the corners, the path, the toc — is the one shell that never
inherited any of it. Every ask is the SAME defect class: **the chrome never became a register.** It is
six disjoint half-builds of ONE surface.

---

## 1 — THE GOLDEN IDEA

**The page chrome is ONE warm-glass marquee with ONE state machine.** It is not six fixes — it is one
surface, one scalar, one register, one seam token, one clip mechanism, from which all six asks fall out
by construction:

- **The masthead is a glass OBJECT with two poses** (resting marquee · condensed placard-bar),
  interpolated by a single native `scroll()`-timeline scalar `--chrome-t ∈ [0,1]` (lens-a's keel). At
  rest it is a √φ-calm title-card that SLAMS in on the cartoon punch (lens-c); past the condense range
  the title sits IN a warm-glass placard bar the page scrolls FROM (lens-c's occlusion kill).
- **The condensed bar and the tracking toc are the SAME warm-glass material** — ONE `--chrome-glass`
  register (`.glass-floating` recipe + warm `categoryHue` tint + `--chrome-rule` seam + corner-clip),
  mounted twice (lens-b's boldest unification; lens-c's "one register, two homes"). The chrome STOPS
  being per-surface chrome and BECOMES a register.
- **The chrome title is HALF the protagonist — a SPLIT, not a shrink** (lens-b, the DRY-est of the
  three): the content-page chrome `<h1>` resolves a calm `--chrome-title-rung` (`text-display-1/2`); a
  deliberate hero page's OWN `<h1>` (a substrate-viz wordmark, a metric value) KEEPS the audacious
  `mega/hero/audacious` tiers. The over-scale is a SELECTION bug (the `≥4 always` floor on the chrome
  title), not a library-identity bug; the audacious ladder is the library's correct signature, just
  pointed at the wrong rung for chrome.
- **One `--chrome-rule` seam token, read in THREE places** (lens-b's DRY single-source): the resting
  masthead→body dividing rule, the condensed bar's bottom hairline, the toc's edge. Plain per-mode arms,
  NEVER a `light-dark()` inset trap.
- **One library-wide corner-clip** (lens-a/b/c consume `BD.W-CORNER-AA`): `clip-path: inset(0 round …)`
  co-declared on the same element as `backdrop-filter` on every glass tier; the bar + the stamp + the
  toc inherit it by construction (they ARE glass tiers).

### The reconciled tension (the synthesis decision)

The three lenses disagree on ONE axis: lens-a/b say the chrome is **calm** (no-overshoot settle);
lens-c says the chrome is a **technicolor cel that SLAMS**. design.md §L4 resolves it by ALTITUDE, and
the GOLDEN adopts the resolution as a hard rule:

> **The chrome wears the cartoon on ENTRANCE; the no-overshoot settle on CONDENSE.**
> The title cel-SLAMS in (anticipation→arc→overshoot→settle, `--ease-cartoon-punch`, the §L4 punch) the
> FIRST time the page mounts — the masthead is the page's first cel, with a lagging cast. But the
> SCROLL-CONDENSE is a no-overshoot SETTLE (`linear` over the `scroll()` timeline) — the audacious title
> NEVER bounces on scroll (design.md §6/P2; a bouncing condensed nav reads cheap, and a scroll-driven
> spring is a misread of the gesture). The struck dividing rule + the kind-marked stamp are entrance
> events (cartoon-punch); the toc active-marker is a calm-overdamped follow (a driver-snap, not a
> carousel-bounce — T13's discipline). **Punch on arrival, weight on travel, calm on scroll.**

### The single boldest move (de-risked LIVE)

> **The condensed sticky page-header and the tracking toc are the same chrome material** — one
> `--chrome-glass` register mounted twice — and `--chrome-t` (ONE native `scroll()` scalar) is the only
> thing that moves the masthead between its resting marquee pose and its condensed placard pose. The
> `--chrome-rule` seam IS the bar's bottom edge IS the toc's edge IS the resting divider; the corner-clip
> IS the bar's silhouette IS the toc's silhouette IS the library-wide halo-clip; the kind-marked stamp
> the bar subsumes INTO IS the standardized route identity. **One register, one scalar, one seam token,
> one clip — six asks fall out by construction.** (Live: at scrollTop 0 the backing `opacity=0` — bare
> title; past the range it materializes to a warm-glass bar the body scrolls FROM; the title resolves
> 46.4px; the toc marker is warm, never gray; `backdrop-filter` is static — Safari-safe.)

This is DRY-er than six waves (one register + one seam + one clip vs six bespoke fixes), KISS (no new
engine — it RE-POINTS the shipped `.story-hero-shrink` `scroll()` substrate + `.glass-floating` +
`.glass-menu-row` + the `clip-path` mechanism, all shipped or specced), and it lands the §3 warm-glass
identity on the last surface that lacked it — the chrome.

---

## 2 — THE MECHANISM (the union — reuse, no fork; exact files/tokens/recipes)

All edits land in the SHARED demo chassis — `demo/stories/StoryHeader.vue`, `demo/stories/story-hero.css`,
`demo/stories/StoryPage.vue`, `demo/stories/manifest.ts`, `demo/stories/navigation/toc-tracking.vue` —
plus the ONE library-wide `src/` paint (the corner-clip, which is `BD.W-CORNER-AA`'s own wave, CONSUMED).
**The KISS/DRY law: the chassis fix lands ONCE → propagates to all 118 storybook pages.**

### 2a — the chrome/hero SCALE SPLIT (`--chrome-title-rung`, lens-b)

The `heroScale ≥ "4"` floor is RETIRED from the CHROME title (clean break, no alias):

```ts
// demo/stories/StoryPage.vue — the chrome <h1> reads the calm chrome rung, NOT heroScale.
// The protagonist heroScale survives ONLY for the hero variant's own <h1> (a substrate-viz wordmark).
const chromeTitleClass = "text-display-1";   // ~26–42px = ~½ the live 109px; the calm page LABEL
// the prior `text-display-${heroScale}` on the chrome title is RETIRED — a consumer who wants a louder
// chrome title re-points --chrome-title-rung (presets-in-consumers). heroScale stays for variant="hero".
```

```css
/* demo/stories/story-hero.css — the chrome-page title rung token (the ONE retune seam) */
:root { --chrome-title-rung: var(--type-display-1); } /* the calm display band; the √φ ladder, byte-untouched */
.story-hero[data-variant="page"] .story-hero-title { font-size: var(--chrome-title-rung); line-height: 1.05; }
```

The library `scale.css --type-display-*` ladder is **byte-untouched** (the fence). The audacious
`mega/hero/audacious` tiers fire on the protagonist `<h1>` + the metric value ONLY (the CEILING
re-point, design.md). Cross-engine: a pure `font-size` token swap — identical Chrome/Safari, zero motion
cost, static (the condense SCALES it, never re-lays it out).

### 2b — the `--chrome-t` masthead scalar + the placard-bar condense (lens-a keel + lens-c occlusion kill)

ONE register edit on the SHARED `.story-hero-shrink` cluster — it ALREADY rides `animation-timeline:
scroll()` + comma-appends the subordinate-fade (the shipped substrate; the eyebrow/blurb already tuck).
The GAP is the GLASS BACKING. The masthead gains a dedicated `::before` warm-glass layer that fades IN on
the SAME `scroll()` timeline — the occlusion *absence* IS the bug; this backing IS the fix:

```css
/* demo/stories/story-hero.css — the placard backing (AUGMENTS the shipped .story-hero-shrink) */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .story-hero-shrink::before {
      content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
      /* the --chrome-glass register: the SHIPPED .glass-floating recipe, warm-tinted, NEVER an opaque slab */
      background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength));
      backdrop-filter: var(--glass-blur-floating);             /* STATIC blur — no per-frame re-blur (Safari fence) */
      clip-path: inset(0 round var(--radius-card));            /* CORNER-AA on the bar's own halo (2e) */
      border-block-end: 1px solid var(--chrome-rule);          /* the seam = the bar's bottom edge (2c) */
      opacity: 0; animation: chrome-bar-in linear both;
      animation-timeline: scroll(); animation-range: 0 var(--hero-condense-range, 160px);
    }
  }
}
@keyframes chrome-bar-in { 0%,40% { opacity: 0; } 100% { opacity: 1; } }  /* materialize ON scroll */
```

The backing is COMPOSITOR-ONLY (`opacity` + static `backdrop-filter` — no layout property animates). At
scrollTop 0 the backing `opacity = 0` (live-verified) → the resting masthead is the bare large title
(NO plate); past the condense range the title sits IN a real warm-glass bar the page scrolls FROM. The
title + the kind-marked stamp PERSIST (the shipped subordinate-fade already spares them); the eyebrow +
blurb tuck (the shipped fade). The body's `scroll-padding-top` reserves the settled bar height so anchor
jumps land below the bar. **One edit → all 118 pages.** Off `@supports` (`scroll()` Baseline Safari 26+)
the static large title paints — progressive enhancement. Under PRM the large static hero holds — no
condensed bar, no occluding fragment (the vestibular floor; the scroll still works).

> **Layout note (spike learning):** the bar must inset to the route-column width, NOT overhang into the
> toc column. The real chassis sticky header is full route-width ABOVE the body's layout grid (the toc is
> a body-grid sibling, not a masthead sibling), so `inset: 0` on the cluster wrapper is correct — the
> `<main>`/`.story-hero` padding owns the gutter. (The spike's `inset: 0 -1.5rem 0` over-extended past the
> spike's narrow column — a spike-layout artifact, not a mechanism flaw.)

### 2c — the `--chrome-rule` seam token (lens-b's ONE token, THREE readers)

Mint ONE dark-adaptive seam token, plain per-mode arms (NEVER a `light-dark()` inset trap — the MEMORY
light-dark lesson). It reuses the shipped `--configurator-divider` family (the warm-ink hairline that
survives the dark glass plate):

```css
/* demo/stories/story-hero.css — the ONE seam, read in THREE places (DRY single-source) */
:root { --chrome-rule: var(--configurator-divider); }   /* dark-adaptive; survives the dark glass plate */
/* (1) the RESTING masthead→body dividing rule — STRUCK on entrance (2d) */
.story-header-cluster::after {
  content: ""; display: block; block-size: 0;
  border-block-end: 1px solid var(--chrome-rule);
  margin-block-start: calc(1rem * var(--phi, 1.618));    /* the φ gap to the body */
  transform: scaleX(0); transform-origin: left;          /* drawn left→right (2d) */
}
/* (2) the condensed bar's bottom edge = the SAME token (2b's border-block-end) */
/* (3) the toc rail edge = the SAME token (2f's border) */
```

This RETIRES the phantom `--story-header-rule` (referenced in waves, defined nowhere). One mint, three
readers, no second rule token. Cross-engine: a static `border` + per-mode arms — trivially identical
both engines, no `filter`/`backdrop` involved.

### 2d — the cel-slam masthead + the STRUCK rule (lens-c, the entrance punch — DEPENDS on motion-spring GOLDEN)

The title cel SLAMS in (anticipation→arc→overshoot→settle) with a lagging cast; the dividing rule is
DRAWN left→right AFTER the title lands. `--ease-cartoon-punch`/`--motion-weight`/`--shadow-cartoon` are
DEPENDS (the motion-spring GOLDEN owns them — ABSENT→BUILD there, never re-minted here):

```css
/* demo/stories/story-hero.css — the title cel SLAMS (ENTRANCE punch), the rule is STRUCK */
@media (prefers-reduced-motion: no-preference) {
  .story-hero[data-variant="page"] .story-hero-title.story-hero-title--enter {
    animation: header-slam 640ms var(--ease-cartoon-punch) both;
  }
  .story-header-cluster::after {            /* the rule drawn AFTER the title lands (overlapping action) */
    animation: rule-strike 520ms var(--ease-cartoon-punch) 280ms both;
  }
}
@keyframes header-slam {
  0%  { opacity:0; transform: translateY(calc(12px*var(--motion-weight))) scale(calc(1 - .06*var(--motion-weight)), calc(1 + .04*var(--motion-weight))); }
  62% { transform: translateY(-3px) scale(1.02,.98); }   /* the overshoot — the §L4 follow-through */
  100%{ opacity:1; transform: none; }
}
@keyframes rule-strike { to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .story-header-cluster::after { transform: scaleX(1); } }
```

The ENTRANCE punch (cartoon) and the CONDENSE settle (no-overshoot, 2b) are two disjoint registers on the
SAME cluster — the entrance on the document timeline `auto`, the condense on `scroll()` — comma-appended
positionally so neither clobbers the other (the shipped `.story-hero-cluster--enter` precedent already
does this for the subordinate-fade). PRM zeroes the slam/strike in one cascade (the large static hero).

### 2e — the corner-AA halo clip (CONSUME `BD.W-CORNER-AA`, library-wide)

```css
/* src/styles/glass/ladder.css — co-declared on the SAME element as backdrop-filter (isolation-safe) */
.glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card {
  clip-path: inset(0 round var(--radius));   /* each tier reads its OWN corner token; the saturate halo clips to the silhouette */
}
/* the two-sided fission-clip fence (BF C4) PRESERVED: .dock-fission-piece/.liquid-island-host/.glass-dock
   EXCLUDED (overhang by design — never box-clipped). */
```

`inset(… round …)` is Safari-NATIVE (`-webkit-clip-path` baseline; the saturate halo squares WORST on
WebKit — the clip is **load-bearing there**). The masthead bar + the stamp + the toc inherit the clip
because they ARE glass tiers. The iOS-27 "flatter" lozenge (`--btn-corner-radius` off `--radius-pill`)
re-resolves the clip in lockstep — a tighter corner is still halo-clipped. This is the ONE `src/` paint;
everything else is demo-chassis. (Live-verified clean on every glass tier in the spike.)

### 2f — the path STAMP with the kind-marker (lens-c marker + lens-b assert; manifest single-source)

ONE chip recipe, TWO struck variants keyed off the manifest format (NO new data — the format already
tells the kind: `@mkbabb/` prefix = import, `/` prefix = route):

```ts
// demo/stories/manifest.ts — the kind is DERIVED from the subpath shape (the single source rule)
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
/* the stamp is a warm-glass placard, halo-clipped, struck like a rubber stamp (cartoon-punch) */
.story-header-stamp { backdrop-filter: var(--glass-blur-quiet); clip-path: inset(0 round var(--radius-pill));
  background: color-mix(in oklab, var(--glass-bg-floating), transparent 18%); border: 1px solid var(--chrome-rule); }
.story-header-stamp[data-kind="route"] { opacity: 0.86; }   /* flatter/quieter — clearly NOT a published import */
@media (prefers-reduced-motion: no-preference) {
  .story-header-stamp--strike { animation: cel-stamp 420ms var(--ease-cartoon-punch) 200ms both; }
}
@keyframes cel-stamp { 0%{opacity:0;transform:scale(1.15) rotate(-1.5deg);} 60%{transform:scale(.98) rotate(.4deg);} 100%{opacity:1;transform:none;} }
@media (prefers-reduced-motion: reduce) { .story-header-stamp--strike { animation:none; } }
```

The stamp is the route identity the condensed bar subsumes INTO (it PERSISTS through the condense — the
shipped subordinate-fade already spares the subpath). The gate's no-blank-subpath + kind-matches-format
+ **SFC-import-matches-chip** assert keeps the map ≡ the route set (lens-b's unasserted arm). ONE
convention, visually legible (import vs route), every page. (Live-verified: `▸ @mkbabb/glass-ui/button`
reads as a struck import stamp under the eyebrow.)

### 2g — the warm-glass toc + the goo-morph active marker (lens-c marker; CONSUME `.glass-menu-row`/`.glass-floating`)

`toc-tracking.vue` re-points (zero NEW src — every target ships):

```vue
<!-- demo/stories/navigation/toc-tracking.vue — the nav re-homes onto the --chrome-glass register -->
<nav class="glass-floating toc-placard overflow-y-auto scrollbar-thin p-2 rounded-xl space-y-0.5">
```

- retire the dead `.themed-card` orphan (`:125/:160`, ZERO backing rule) → `.glass-floating` warm plate
  (clean break, no alias).
- the raw `bg-primary/10`/`hover:bg-muted/50` rows → `.glass-menu-row` (the shipped hover-lift
  glass-quiet plate).
- the ACTIVE row is ONE morphing WARM pill that STRETCHES+SETTLES between items (the goo-morph
  liquid-weight follow — driven by the shipped `useScrollTracker`/`useSidebarFollow` active-id, no new
  tracker): a calm-overdamped settle (`--ease-settle`, a driver-snap NOT a carousel-bounce — T13's
  discipline). The fill is the warm `categoryHue` tint (`color-mix(… --glass-tint-source …)`), NEVER the
  measured gray slab. `--on-glass-muted` for the inactive rung (AA over the warm plate). PRM → instant.

```css
/* toc-tracking.vue <style> — the warm-glass toc placard + the goo-morph active marker */
.toc-placard { clip-path: inset(0 round var(--radius-xl)); border: 1px solid var(--chrome-rule); }  /* 2e + 2c */
.toc-placard button { position: relative; color: var(--on-glass-muted); }   /* legible inactive over the warm plate (AA) */
.toc-placard button[data-active] { color: var(--foreground); font-weight: 600; }
.toc-active-marker {
  position: absolute; inset-inline: 0.25rem; z-index: -1; border-radius: var(--radius-md);
  background: color-mix(in oklab, var(--glass-tint-source) 40%, transparent);   /* WARM, NOT oklab gray */
  transition: transform 360ms var(--ease-settle), block-size 360ms var(--ease-settle);
}
@media (prefers-reduced-motion: reduce) { .toc-active-marker { transition-duration: 1ms; } }
```

So the toc over the aurora field reads warm-glass-on-glass, both modes (the dark active row glows warm,
never charcoal) — the SAME register that paints the condensed bar. (Live-verified: the marker is a warm
tinted pill on the active row, the inactive rows legible over the warm plate.)

---

## 3 — DEFT INTEGRATION (the union — reuse, no fork, no legacy)

| concern | reuse (the union) | NOT a new… |
|---|---|---|
| the condense substrate | `.story-hero-shrink` `animation-timeline: scroll()` (shipped, ALREADY tucks eyebrow/blurb) | scroll engine / Lenis / rAF |
| the bar + toc glass | the `.glass-floating` recipe + `categoryHue` tint = the ONE `--chrome-glass` register, mounted twice | a re-authored opaque slab / a 3rd glass treatment |
| the toc rows | `.glass-menu-row` (the shipped hover-lift plate) | a bespoke toc card |
| the chrome title | `--chrome-title-rung` (`text-display-1`) off the byte-untouched √φ ladder; heroScale stays for the protagonist | a library-ladder shrink |
| the seam (×3) | `--chrome-rule` = `--configurator-divider` (dark-adaptive, plain arms) | an inline `rgba()` alpha / a 2nd rule token |
| the corner-clip | `BD.W-CORNER-AA`'s library-wide `clip-path: inset(0 round …)` | a `corner-shape` superellipse on the header |
| the cel-slam + cast + strike + stamp | `--ease-cartoon-punch`/`--motion-weight`/`--shadow-cartoon` (motion-spring GOLDEN DEPENDS) | a new motion engine |
| the path | the manifest `SUBPATHS` single source; the kind DERIVED from the format | a 2nd label registry |
| the toc tracking | the shipped `useScrollTracker`/`useSidebarFollow` active-id → ONE morphing warm pill | a new tracker |
| the proportion | `--phi`/`--phi-inv` header rhythm + the √φ rung; concentric `r_inner = r_outer − gap` on the bar | a magic px |

**Net-new artefacts (small):** the `.story-hero-shrink::before` placard backing + the `::after` struck
rule + the cel-slam/cast/stamp keyframes in `story-hero.css`; the `--chrome-rule` + `--chrome-title-rung`
token mints; the `subpathKind` derive in `manifest.ts`; the kind-marked stamp in `StoryHeader.vue`; the
`toc-tracking.vue` re-point; the `clip-path` co-declaration in `src/styles/glass/ladder.css` (the ONE
`src/` paint — `BD.W-CORNER-AA`'s wave). **Zero new SFCs.** Everything else is SHIPPED.

**The dup-kill (the six asks COLLAPSE onto ONE marquee — see §6 DELTA-ASSAY):** the placard backing IS
the occlusion fix AND the bar surface; the `--chrome-rule` token IS the resting rule AND the bar edge AND
the toc edge; the corner-clip IS the bar/stamp/toc silhouette generalized library-wide; the stamp IS the
condensed bar's identity rung; the toc glass IS the same `--chrome-glass` register. They are not six
waves racing the same files — they are ONE warm-glass marquee. **No legacy, no alias, no dual path** —
the `themed-card` toc is RE-HOMED (not kept); the `≥4` chrome floor is RETIRED (not aliased); the bare
condense is REPLACED (not bracketed).

---

## 4 — CROSS-ENGINE (Chrome AND Safari — §L7) + A11Y / PRM (§L5)

| mechanism | Chrome | Safari (WebKit) | perf floor |
|---|---|---|---|
| chrome title rung (2a) | `font-size` token | identical | static; zero cost |
| `--chrome-rule` seam (2c) | `border` + per-mode arm | identical (NO `light-dark()` inset trap) | static |
| condense placard (2b) | `animation-timeline: scroll()` | Baseline Safari 26+; `@supports` → static large header | compositor scroll, **zero rAF/JS**; `opacity` + STATIC `backdrop-filter` (no per-frame re-blur — verified static in the spike) |
| cel-slam / strike / stamp (2d/2f) | `cubic-bezier`/`linear()` punch, compositor `transform`/`opacity` | identical; `@supports` → static terminal | compositor-only; one-shot on mount |
| corner-AA clip (2e) | `clip-path: inset(round)` | `-webkit-clip-path` Baseline; **halo squares WORST on WebKit → load-bearing here** | paint-only |
| toc warm glass + marker (2g) | `.glass-floating` + `transform`/`block-size` transition | identical | static plate; compositor marker follow |

**The Safari fence (held):** NO `backdrop-filter` RADIUS animates anywhere in the chrome (the condense
ramps `opacity` only; the blur is a STATIC tier value — live-verified `blur(20px) saturate(1.7)` constant
across the condense). NO `backdrop-filter: url()`, NO SVG goo, NO trig in the chrome path (the toc "goo
morph" is a CSS `transform`/`border-radius`/`block-size` transition, NOT a metaball filter — the real
metaball goo stays in the dock/blob CONTENT). The glass is `backdrop-filter: blur() saturate()` (plain,
both engines) over the `.paper-field` composited output — never glass-samples-glass (§L1; the field is a
`-z` sibling). `color-mix(in oklab, …)` is WebKit-native (Safari 16.2+); sRGB interp pinned on the warm
tint stops (the Safari oklab-default mud avoided). The chrome is the CHEAP layer — no GL, no compute, no
per-frame filter.

**A11Y / PRM:**
- `prefers-reduced-motion: reduce` → the cel-slam + cast + strike + stamp + condense (shrink/subsume/
  placard-fade) + the toc marker morph ALL freeze to their terminal frame (`--motion-weight: 0` collapses
  the squash/overshoot; the `@media` gates zero the animations). Under reduce: the LARGE static hero
  holds on scroll (NO condensed bar, NO occluding fragment — the whole title readable); the rule is
  present (not drawn); the stamp is stamped (not striking); the toc marker is in place (not morphing). The
  masthead choreography is a build, never a content dependency.
- `prefers-reduced-transparency` → the bar + the toc + the stamp fall to the library's opaque tier; the
  seam + the path + the halved rung survive (transmission is enhancement, never a legibility dependency).
- `prefers-contrast: more` → the toc inactive items lift to `--text-strong`; the condensed-bar title +
  stamp guarantee AA over the worst-case backdrop pixel (the §L1 bracket); the struck rule lifts to full.
- **Semantics** — ONE `<h1>` (the calm chrome rung; the √φ halve IMPROVES the heading-scan — the title
  no longer dominates the AT tree's first viewport), the stamp is `<code>` with the glyph `aria-hidden`,
  the dividing rule is decorative (`::after`, no semantics), the toc is the shipped accessible `<nav>`
  with `aria-current` on the active item; the condense is visual (the reading order is unchanged).
- **Proportion has NO a11y bracket** (§L6) — the √φ title, the φ header→body gap, the `1/φ` motion weight
  hold identically across all a11y states.

---

## 5 — THE ACCEPTANCE BAR + THE BORN-RED GATE (`proof:page-chrome`)

`tests-visual/page-chrome.spec.ts` (paired-engine: **chromium + webkit projects**, both modes) +
`scripts/proof-page-chrome.mjs` (the device-free source arm). Born-RED on HEAD by construction (the
measured 109px title, no rule, bare-text condense, same-coat paths, clip-count-0, transparent gray toc).
Sample `/display/buttons`, `/navigation/toc-tracking`, `/motion/scroll-choreography` via screenshot
raster + `getBoundingClientRect` + `getComputedStyle` + a REAL scroll gesture — NEVER markdown-keyword
grep, NEVER `getComputedStyle`-string-only.

| # | assert (GREEN when) | born-RED on HEAD |
|---|---|---|
| **C1 scale split** | the chrome `data-variant="page"` `<h1>` resolves `--chrome-title-rung` (`font-size ≤ ~½` HEAD, ≤ ~52px), NOT `text-display-${heroScale≥4}`; a hero page's OWN `<h1>` KEEPS the audacious tier (the split, not a global shrink) | 109.66px |
| **C2 dividing rule** | a `--chrome-rule` `::after` paints (`border-bottom > 0`, `scaleX 1` settled); the frame-series shows it DRAWN left→right on entrance | `candidateRules: []` |
| **C3 condense placard (occlusion kill)** | scroll past the range → `.story-hero-shrink::before` rasters a NON-transparent warm-glass backing (`backdrop-filter ≠ none`, bg α ≥ floating floor, OKLab C ≥ 0.04 warm); at scrollTop 0 the backing α ≈ 0 (materialize-on-scroll, **verified in the spike**); the body in the bar's y-band is OCCLUDED by the bar, not visible-through | bg `rgba(0,0,0,0)`, backdrop `none` |
| **C4 subsume** | the frame-series: title α ≈ 1 (condensed) + stamp α ≈ 1 (persists) WHILE eyebrow+blurb α 1→0 + translateY (tucked) | (shipped fade present; the backing is the gap) |
| **C5 path stamp standard** | every page's stamp carries the kind marker (`data-kind="import"` ▸ / `data-kind="route"` ⌘); import≠route fill; the kind matches the format AND the SFC import matches the chip | both render identical, no marker |
| **C6 corner-AA** | every glass tier (bar, stamp, toc, cards) corner rasters CLEAN (no square saturate halo); the `clip-path: inset(0 round …)` present on the `backdrop-filter` element, BOTH modes + **WebKit** | clip-count 0, square halo |
| **C7 toc warm-glass** | the toc `nav` rasters a WARM glass plate (`backdrop-filter ≠ none`, bg α > 0, OKLab C ≥ 0.045 warm H∈[25,95]) — NOT transparent, NOT gray; inactive items AA over the plate; the active marker MORPHS (transform/block-size transition) between items | bg `rgba(0,0,0,0)`, gray active |
| **C8 compositor-only** | no condense/rule/stamp/subsume/marker keyframe animates `font-size`/`width`/`height`/`padding`/`top` (transform/opacity/clip-path/`block-size`/static-backdrop only — the CLS floor) | — |
| **C9 cartoon-on-entrance, settle-on-scroll** | the ENTRANCE title carries the punch overshoot (a mid-frame scale ≠ 1 then settle); the CONDENSE is `linear` no-overshoot (NO scale > terminal on the scroll() timeline — the audacious title never bounces on scroll) | calm fade entrance; no condense backing |
| **C10 PRM** | under reduce: the large static hero holds on scroll (no bar, no fragment); rule/stamp/marker present (not animating); the scroll still works | — |
| **C11 Safari-static-blur** | the placard `backdrop-filter` radius is CONSTANT across the condense range (no per-frame re-blur — verified `blur(20px)` constant in the spike) | — |
| **C12 anti-evasion (≥8 bites)** | FAILS on: a 109px chrome title (C1), no rule (C2), an opaque/permanent/transparent backing (C3), no subsume (C4), an unmarked chip (C5), an unclipped halo (C6), a transparent/gray toc (C7), a layout-animating condense (C8), a bouncing scroll-condense (C9), a condense surviving PRM (C10), an animating-blur (C11) | — |

**Self-test (each MUST flag; the fixed tree clean):** pin the title to 109px → C1 RED; strip the `::after`
→ C2 RED; transparent/permanent the backing → C3 RED; block-scale the cluster → C4 RED; drop the kind
marker → C5 RED; remove the clip → C6 RED; transparent the toc → C7 RED; animate `top` in the condense →
C8 RED; spring the scroll-condense → C9 RED; survive a condense leg under PRM → C10 RED; animate the blur
radius → C11 RED. **No source-green close — the painted, paired-engine, scroll-gesture π is the binding
truth.**

**The gestalt bar (live-judge AS A USER, both modes, both engines, fresh paint, REAL scroll):** a
content page reads as ONE warm chrome shell — a ~½-scale chrome title that SLAMS in under a struck
dividing rule, a kind-marked import stamp pressed beneath it, the title condensing into a slim warm-glass
placard bar the body scrolls FROM (not under bare text), consistent kind-marked paths, clean halo-clipped
corners on every glass surface, and a readable warm-glass tracking toc with a goo-morphing active marker
— IDENTICAL in Chrome and Safari, both modes, at zero per-frame filter cost. The reference is the
story-page-standard GOLDEN's body cel-slam (the chrome finally wears the punch the body has) + the iOS-27
condensing large-title navigation bar (the title shrinks into a glass bar you scroll from, the descriptor
subsumed).

---

## 6 — THE DELTA-ASSAY (reconcile vs the wave set — NO dup, the wave-amendment)

Every ask maps to an EXISTING wave — the GOLDEN is a UNION/reconcile, not a new fork:

| ask | EXISTING wave | reconcile under the GOLDEN |
|---|---|---|
| HEADER SCALE | `W-HEADER-SCALE` | REFINE — adopt lens-b's chrome/hero SCALE **SPLIT** (`--chrome-title-rung` vs the protagonist heroScale); the `≥4` chrome floor RETIRED. The dividing-rule arm folds to `--chrome-rule`. |
| STICKY-CONDENSE | `BD.W-STICKY-TITLE-CONDENSE` | REFINE — the placard `::before` backing (the occlusion kill the shipped substrate lacks) + the structural sticky fix (a dedicated reserved box, not the consumed cluster); the shipped subordinate-fade is REUSED. |
| PATH-STANDARDIZE | `W-PATH-STANDARDIZE` | REFINE — adopt lens-c's kind-marked struck stamp + lens-b's SFC-import-matches-chip + census asserts on the existing `SUBPATHS` single source. |
| CORNER-ALIASING | `BD.W-CORNER-AA` (+ `-WIDEN`) | KEEP + CONSUME — the library-wide clip; the bar/stamp/toc inherit it. The ONE `src/` paint. |
| DIVIDING RULE | folded in `BD.W-PAGE-CHASSIS` | the `--chrome-rule` token REPLACES the phantom `--story-header-rule`; read in the resting rule + the bar edge + the toc edge (one token, three readers). |
| TOC GLASS | `BD.W-TOC-MENU-GLASS` | REFINE — `.glass-floating` + `.glass-menu-row` re-point + the goo-morph active marker on the same `--chrome-glass` register. |

**The amendment (no dup):** the six waves already decompose correctly — the GOLDEN's contribution is the
**UNIFICATION**: declare the `--chrome-glass` register (the `.glass-floating`/`categoryHue`/`--chrome-rule`/
clip recipe) shared by the condensed bar AND the toc, the `--chrome-rule` seam shared by all three edges,
and the corner-clip the bar/stamp/toc inherit — so `BD.W-STICKY-TITLE-CONDENSE`, `BD.W-TOC-MENU-GLASS`,
and `W-HEADER-SCALE`'s rule-arm all CONSUME ONE register; `BD.W-CORNER-AA` stays the disjoint library
paint they inherit; `W-PATH-STANDARDIZE` stays the disjoint manifest-assert. **No new wave is minted; no
wave is duplicated.** The chrome is the masthead arm of the story-page standard: the story-page-standard
GOLDEN owns the BODY (the field + the cels); this owns the CHROME (the marquee header + the condense + the
toc), sharing the warm-glass register and the punch vocabulary. **No legacy, no alias, no dual path.**
