# PAGE-CHROME — lens-b: the CHROME-RAIL (one sticky glass header-rail + a shared chrome register) — CROSS-ENGINE / PERF-FIRST

> GREENFIELD-BRAINSTORM through the **flawless-Chrome-AND-Safari + performance** lens. The page CHROME
> redesigned from first principles: the StoryHeader (title · subtitle · path · scroll-condense), the
> dividing rule, the path standardization, the page corner-aliasing clip, the toc-tracking glass — as
> ONE coherent chrome layer. A UNION with the shipped `StoryHeader`/`StoryPage`/`story-hero.css`
> `.story-hero-shrink` register + the shared `.glass-floating` tier + the §L6 √φ ladder. No re-fork, no
> second scroll engine, no parallel header system. **Tranche-dev only. KISS/DRY. NO LEGACY.**
>
> **Live-interrogated** (Chrome, `:5173`, both modes, real scroll gesture): `/display/buttons` (the
> header + the scroll-condense), `/navigation/toc-tracking` (the toc glass), the manifest path census,
> the glass-ladder corner clip. Every number below is a live `getComputedStyle`/`getBoundingClientRect`
> readback or a HEAD grep — NOT an assertion. Captures: `captures/buttons-scrolled-lens-b.png`,
> `captures/toc-tracking-lens-b.png`.

---

## 0 — THE BORN-RED TRUTH (live-measured `:5173` + grep at HEAD)

| ask | live measurement / grep | verdict |
|---|---|---|
| **W-HEADER-SCALE** | `/display/buttons` chrome `<h1>` = **fontSize 109.66px**, lineHeight 115px, the `text-display-${heroScale≥4}` rung (`StoryHero.vue:92`, `StoryPage.vue:114`); the `≥4 always` floor (`StoryHero.vue:91`) IS the disease | **RED — ~2× the §L6 display-1/2 band (26–53px); the chrome title is the protagonist rung, no chrome/hero split** |
| **dividing rule** | `--story-header-rule` defined **NOWHERE** (`grep src/styles demo/stories` → 0); the cluster `::after` content `none`, `borderBottom 0px` | **RED — no header→body seam token exists; zero design hierarchy separator** |
| **W-STICKY-TITLE-CONDENSE** | at `main.demo-main-scroller` scrollTop 600: `.story-hero-shrink` `top: -563px` (it has SCROLLED OFF, not stuck), `transform: scale(0.82)`, `bg rgba(0,0,0,0)`, `backdrop none`; eyebrow opacity → 0 (partial subsume) | **RED — the title scales but the bar (a) does NOT stay stuck and (b) has NO glass backing → the page scrolls UNDER bare scaling text, the occlusion defect; no condensed bar to scroll FROM** |
| **W-PATH-STANDARDIZE** | `SUBPATH_BY_ROUTE` table is built (`manifest.ts:196`): **90** `@mkbabb/glass-ui/<sp>` rows vs **28** `/cat/slug` rows | **AMBER — the table exists + the convention is recorded; the gap is the SFC-import-matches-chip arm (unverified) + the census never auto-asserted** |
| **BD.W-CORNER-AA** | `grep clip-path src/styles/glass/ladder.css` → **0**; every `.glass-*` tier has `backdrop-filter` on a rounded box with NO halo clip | **RED — the saturate halo bleeds a SQUARE region behind every rounded glass silhouette → the corner stair-step aliasing the user screenshotted** |
| **TOC GLASS** | `/navigation/toc-tracking` toc `<nav class="themed-card">`: `bg rgba(0,0,0,0)` (transparent!), `backdrop none`, inactive item color `oklab(.79 … /.8)` over **nothing** | **RED — the toc has NO glass plate at all (a hand-rolled `themed-card` that resolves transparent); links sit over the raw body → "UNREADABLE", the user's verbatim** |
| **`--btn-corner-radius`** | grep `src/styles` → **0** (the iOS-27 "flatter" radius-reduction token) | RED — the flatter-lozenge delta unbuilt (rides BD.W-CORNER-AA C7) |

**The gestalt (live):** the chrome is SIX disjoint half-builds — a protagonist-sized chrome title (no
chrome/hero split), a phantom scroll-condense (scales but neither sticks nor glasses), a missing seam
token, an un-clipped halo on every glass corner, a transparent hand-rolled toc, and a path table that
exists but is never asserted. They are all **the same layer** — the page's chrome shell — yet each was
patched in isolation. The disease is **no single chrome register**: the header, the condensed bar, and
the toc are three different glass treatments (one absent, one phantom, one hand-rolled) when they should
be ONE shared `--chrome-glass` recipe; the title scale and the seam are two knobs of ONE chrome rung.

**Source-verified deps (grep):** `.story-hero-shrink` (`story-hero.css:239`, sticky + scroll() shrink,
the substrate to COMPOSE) · `.glass-floating` recipe (`glass/ladder.css:105`, the chrome plate) ·
`--type-display-{1,2}` (`typography/scale.css:123-124`, the √φ chrome rung) · `SUBPATH_BY_ROUTE`
(`manifest.ts:196`, the path single-source) · `categoryHue(id)` (`category-hero.ts:159`, the warm tint
source) · `animation-timeline: scroll()` (the native condense substrate, Baseline Chrome 115+/Safari 26+).
The corner-clip `clip-path: inset(0 round …)` is ABSENT (the b538dec7 fix lost — `clip-path` count 0).

---

## 1 — THE GOLDEN IDEA: the CHROME-RAIL — ONE shared `--chrome-glass` register + a chrome/hero scale SPLIT, native-`scroll()`-driven, Safari-first

The six asks collapse into **one chrome layer with one glass recipe and one scroll mechanism**. The
keystone: stop treating the resting header, the condensed bar, and the toc as three surfaces. They are
ONE **chrome-rail** — a glass register (`--chrome-glass`) shared by (a) the condensed sticky page-header
and (b) the tracking toc — plus ONE √φ **chrome rung** that is HALF the protagonist rung (the chrome/hero
split), plus ONE **header→body seam** token (`--chrome-rule`) the rail's bottom edge and the resting
divider both read. Five reconciled moves, each a UNION with a shipped seam:

### (A) The chrome/hero SCALE SPLIT — the chrome title is HALF the protagonist (W-HEADER-SCALE)

The disease is `StoryHero.vue:91`'s `heroScale ≥ 4 always` floor applied to the **chrome** title
(`StoryPage.vue:114` `text-display-${heroScale}`). The greenfield splits the ONE knob into TWO:

- **`--chrome-title-rung`** — the CONTENT-page chrome `<h1>` resolves the CALM rung: `text-display-1`
  (φ², `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` = **~26–42px**) — the §L6 ladder's lower display band,
  ~½ the live 109px. This is the page LABEL (a chrome title), not the protagonist.
- **`--hero-protagonist-rung`** — a deliberate HERO page's own `<h1>` (a metric value, a substrate-viz
  wordmark) KEEPS the audacious `mega/hero/audacious` tiers (their fast.com peg, T15-bettered). The
  CEILING rule (BB.W-DEMO-DESIGN) is re-pointed: the audacious tiers fire on the protagonist `<h1>` +
  the metric value ONLY, NEVER the chrome page-title.

ONE chassis edit: `StoryPage`'s chrome `<h1>` reads `--chrome-title-rung` (default `text-display-1/2`),
NOT `heroScale`. `heroScale` survives ONLY for the hero variant's protagonist. Clean break — the `≥4
always` chrome floor is RETIRED, no alias (a consumer who wants a louder chrome title re-points
`--chrome-title-rung`; presets-in-consumers). **Cross-engine:** pure `font-size` token swap — identical
Chrome/Safari, zero motion cost, zero layout-animation (the rung is static; the condense scales it).

### (B) ONE `--chrome-rule` seam token — the dividing rule (the design-hierarchy separator)

Mint ONE dark-adaptive seam token `--chrome-rule` (a per-mode hairline: `color-mix(in oklab,
var(--foreground) ~10%, transparent)` light / a brighter mix dark — NOT a `light-dark()` inset trap, plain
per-mode arms per the MEMORY light-dark lesson). It is read in THREE places (DRY single-source):

1. the RESTING header → body **dividing rule** (a `border-block-end` on the chrome `<header>`) — the
   user's "dividing line below the header for proper hierarchy", on EVERY StoryPage;
2. the condensed sticky-bar's **bottom hairline** (arm C) — the bar/body boundary;
3. the toc rail's **edge** (arm E) — one seam vocabulary across the whole chrome.

This replaces the phantom `--story-header-rule` (referenced in 4 waves, defined nowhere). Clean mint,
one token, three readers. **Cross-engine:** a static `border` + per-mode `color-mix` — trivially
identical on both engines, no `filter`/`backdrop` involved.

### (C) the CHROME-RAIL condensed sticky-bar — the title condenses-not-occludes (W-STICKY-TITLE-CONDENSE)

The live defect is two-fold: the bar (a) does NOT stay stuck (`top: -563px` at scroll 600 — the sticky
context is broken because the cluster's flow-height is consumed and there's no reserved bar box) and (b)
has NO glass backing (`bg rgba(0,0,0,0)`). The greenfield builds the **chrome-rail**: a slim sticky glass
bar the page scrolls FROM.

- **The bar is a DEDICATED sticky element** (`.chrome-rail`), NOT the scaling cluster. The big resting
  hero cluster scrolls AWAY in flow; a SEPARATE slim `.chrome-rail` (`position: sticky; top: 0`) holds
  the **condensed identity** = `small-title · subpath-chip`. This fixes the "doesn't stick" defect
  structurally — the rail's box is reserved and never consumed by the scrolling cluster.
- **The rail paints the shared `--chrome-glass` register** — `backdrop-filter: var(--glass-blur-floating)`
  + `background: color-mix(in oklab, var(--glass-bg-floating), var(--chrome-tint) var(--chrome-tint-amt))`
  (the `.glass-floating` recipe + the warm `categoryHue` tint — NEVER gray, the BA.W-NO-GRAY warm floor),
  with the `--chrome-rule` bottom hairline. The page reads scrolling THROUGH the glass (glass-first,
  AX.W54), occluded correctly by a header bar.
- **The rail's opacity is keyed off the SAME native `scroll()` timeline** the cluster shrink already
  rides (`story-hero.css:258`) — `0 → 1` over the condense range. At scroll-0 the rail is α≈0 (the
  resting hero is the bare calm title, NO plate); past the range the rail is a fully-painted glass bar.
  ONE scroll source, no second driver, no rAF, no Lenis.
- **The SUBSUME** (the user's "one subsumes the other"): the resting cluster's eyebrow + blurb fade
  `opacity 1 → 0` on the same timeline (already partially live — eyebrow → 0 measured); the chrome title
  + the subpath chip persist; the chrome-rail's condensed `small-title · subpath` materializes as the big
  cluster dissolves. The descriptor is subsumed; the route identity persists into the rail.
- **`scroll-padding-top`** reserves the settled rail height so an anchor-jump lands BELOW the rail.

**Cross-engine / PERF (the lens):** `animation-timeline: scroll()` is the compositor's OWN scroll —
zero JS, zero rAF. The ramp is `opacity` + a STATIC `backdrop-filter` (the blur radius NEVER animates —
the §7 Safari per-frame re-blur trap is avoided; only the plate's α/opacity transitions, the cheap leg).
COMPOSITOR-ONLY (transform/scale + opacity, never font-size/width/top — the `proof:no-layout-animation`
floor, text lays out once). Gated `@supports (animation-timeline: scroll())` → off-support (old WebKit)
paints the static large header (the correct fallback). PRM → the large static hero holds, no rail, no
shrink (the vestibular floor; the scroll still works).

### (D) the CORNER-AA halo clip — clean corners library-wide (BD.W-CORNER-AA)

Re-establish the lost `b538dec7` fix: every glass tier co-declares `clip-path: inset(0 round
var(--<tier>-radius))` on the SAME element as its `backdrop-filter` (isolation-safe), reading the tier's
OWN corner token — so the saturate/brightness halo is clipped to the rounded silhouette (no square bleed,
no stair-step). This is `grep clip-path → 0` born-RED. Folds the iOS-27 "flatter" delta: mint
`--btn-corner-radius` (a clean break off `--radius-pill` toward a tighter `--radius-card`-band lozenge);
the clip reads the SAME token so a tighter corner is still halo-clipped by construction. The chrome-rail
+ the toc rail both inherit the clip (they ARE glass tiers).

**Cross-engine (THE lens-critical leg):** `clip-path: inset(… round …)` is the Safari-SAFE corner clip
(`-webkit-clip-path` baseline; the saturate halo squares WORST on WebKit — this is load-bearing THERE).
The two-sided fission-clip fence is PRESERVED (the `.dock-fission-piece`/`.liquid-island-host` overhang
exclusion — those surfaces overhang by design, never box-clipped). Paint-only, zero motion cost.

### (E) the TOC GLASS — a readable warm-glass tracking rail (TOC GLASS)

The toc-tracking story hand-rolls `<nav class="themed-card">` which resolves TRANSPARENT (`bg
rgba(0,0,0,0)`, `backdrop none`) — the "unreadable" defect. The greenfield re-hosts the toc on the SAME
`--chrome-glass` register as the chrome-rail (the shared chrome layer — ONE recipe, not a third glass
treatment): `.chrome-toc` = `.glass-floating` + the warm `categoryHue` tint (NEVER gray) + the
`--chrome-rule` edge + the corner-AA clip (D). The active item reads the consumer `--glass-accent` (the
de-RED'd neutral lift default); the inactive items read `--muted-foreground` over a READABLE warm plate
(α ≥ the glass-floating floor) — contrast met because there is now a plate. The toc is no longer a
bespoke `themed-card`; it is a chrome-rail sibling (KISS/DRY — one register, two mounts).

**Cross-engine:** the static glass plate is identical Chrome/Safari; the sidebar-follow tracking is the
shipped `useSidebarFollow` (damped, compositor transform) — no change, already engine-safe.

---

## 2 — THE BOLDEST MOVE: the chrome title and the toc are the SAME glass surface — collapse three header treatments into ONE `--chrome-glass` register read by the condensed rail AND the toc

The audacious unification: **the condensed sticky page-header and the tracking toc are the same chrome
material** — one `--chrome-glass` recipe (`.glass-floating` + warm `categoryHue` tint + `--chrome-rule`
edge + corner-AA clip), mounted twice. Today they are THREE divergent treatments: the header has no
plate, the condensed bar is a phantom (scales but never glasses), the toc is a hand-rolled transparent
`themed-card`. By making the chrome-rail and the toc **siblings of one register**, every fix lands ONCE:
the warm-not-gray floor, the corner clip, the seam token, the readability floor all propagate to both the
top rail and the side toc from a single writer — and a content page reads as ONE coherent chrome shell
(a warm glass top-rail + a warm glass side-rail, same material, framing a live field) instead of six
mismatched half-builds. The chrome STOPS being per-surface chrome and BECOMES a register.

---

## 3 — CROSS-ENGINE / PERF LEDGER (the lens, made explicit)

| mechanism | Chrome | Safari (WebKit) | perf floor |
|---|---|---|---|
| chrome title rung (A) | `font-size` token | identical | static; zero cost |
| `--chrome-rule` seam (B) | `border` + per-mode `color-mix` | identical (plain arms, NO `light-dark()` inset trap) | static |
| condensed rail condense (C) | `animation-timeline: scroll()` | Baseline Safari 26+; `@supports` fallback to static header on older | compositor scroll, **zero rAF/JS**; `opacity` + STATIC `backdrop-filter` (no per-frame re-blur) |
| corner-AA clip (D) | `clip-path: inset(round)` | `-webkit-clip-path` Baseline; **halo squares WORST on WebKit → load-bearing here** | paint-only |
| toc warm glass (E) | `.glass-floating` | identical | static plate; tracking = shipped damped transform |

**The §7 Safari fence (held):** NO `backdrop-filter` RADIUS animates anywhere in the chrome (the
condense ramps `opacity`/`scale` only; the blur is a static tier value). NO `backdrop-filter: url()`
(the meatball/goo is the dock's static-SVG concern, untouched here). sRGB `color-interpolation` on any
tint. The chrome is the CHEAP layer — no GL, no compute, no per-frame filter; offscreen-park is moot
(it is compositor-static). **a11y/PRM:** the condense lives inside `@media (prefers-reduced-motion:
no-preference)` → reduce holds the large static header, the page scrolls normally; the toc tracking is
the shipped damped follow (already PRM-carved); contrast floors met by the warm plate.

---

## 4 — THE DELTA-ASSAY (reconcile vs the 116-wave set — no dup)

| existing wave | disposition under lens-b | dup? |
|---|---|---|
| `W-HEADER-SCALE` | **REFINE** — add the chrome/hero SCALE SPLIT (`--chrome-title-rung` vs `--hero-protagonist-rung`); the `≥4 always` chrome floor RETIRED. The dividing-rule arm folds to the `--chrome-rule` token (B). | no — sharpens the mechanism |
| `BD.W-STICKY-TITLE-CONDENSE` | **REFINE** — the bar is a DEDICATED `.chrome-rail` sticky element (fixes the live "doesn't stick" `top:-563` defect the wave doc did not catch), painting the shared `--chrome-glass`. The wave's glass-backing + subsume arms hold. | no — adds the structural sticky fix |
| `W-PATH-STANDARDIZE` | **KEEP** — the `SUBPATH_BY_ROUTE` table + convention already land it; lens-b adds the SFC-import-matches-chip assert arm + the census-never-asserted gate. | no |
| `BD.W-CORNER-AA` (+ `-WIDEN`) | **KEEP + CONSUME** — arm D IS this wave (re-establish the `b538dec7` clip + the `--btn-corner-radius` flatter delta); the chrome-rail/toc inherit it. | no — lens-b is a consumer |
| **NEW: the `--chrome-glass` register + chrome-rail** | the unifying seam (move 2) — the condensed-bar + toc share ONE register. This is the **AMENDMENT** the assay produces: a `W-CHROME-REGISTER` row that BINDS W-HEADER-SCALE + W-STICKY-TITLE-CONDENSE + TOC-GLASS into one chrome layer (no three-glass-treatment fork). | the one net-new (binding, not duplicating) |

**The amendment:** fold the six asks under ONE chrome layer — a `W-CHROME-REGISTER` binding row
(`--chrome-glass` recipe + `--chrome-rule` seam + the chrome/hero scale split) that W-HEADER-SCALE,
W-STICKY-TITLE-CONDENSE, and the TOC-glass ask all CONSUME; BD.W-CORNER-AA stays the disjoint paint-clip
that the register inherits; W-PATH-STANDARDIZE stays the disjoint manifest-assert. No new wave duplicates
an existing concern — the register UNIFIES three of them and the other two are consumed/kept.

---

## 5 — THE GATE / THE π (born-RED → GREEN, both modes + WebKit)

- **`proof:chrome-register`** (source-structure): the chrome `<h1>` reads `--chrome-title-rung`
  (`text-display-1/2`), NOT `heroScale` (a `text-display-${heroScale≥4}` on the CHROME title REDs); the
  `--chrome-rule` token is defined + read in the resting divider + the rail edge + the toc edge (a
  phantom `--story-header-rule` REDs); the condensed bar is a DEDICATED sticky `.chrome-rail` painting
  `--glass-blur-*`/`--glass-bg-*` (a transparent bar or the scaling-cluster-as-bar REDs); the toc reads
  `--chrome-glass`, NOT a hand-rolled transparent `themed-card` (REDs); ≥7 self-test bites.
- **`proof:path-standardize`** — every `SUBPATH_BY_ROUTE` row matches its kind (exported→subpath,
  demo-only→local) AND the SFC import matches the chip (born-RED on any relative-deep-path mismatch).
- **`proof:corner-aa`** (consumed) — the library-wide clip + the `--btn-corner-radius` flatter delta.
- **The binding π** (`tests-visual/chrome-register.spec.ts`, both modes + **webkit project**): the
  chrome `<h1>` is ≤ ~½ the HEAD 109px (the scale halved); the resting dividing rule reads; on a REAL
  scroll past the condense range, `getComputedStyle(.chrome-rail)` shows a NON-transparent warm glass
  plate (`backdrop-filter` non-`none` + `background-color` α ≥ glass-floating floor) that STAYS stuck
  (`getBoundingClientRect().top ≈ 0`, NOT -563), the body scrolls FROM it (overlap front-most = the
  rail), the subsume reads (eyebrow/blurb → 0, title/subpath persist); the toc plate is a readable warm
  glass (α ≥ floor, NEVER gray — chroma > 0); every `.glass-*` corner reads halo-clean (no square
  bleed), WebKit included; PRM holds the static large header. Born-RED on HEAD by construction (the
  measured 109px / -563 / transparent toc / clip-count-0).

**The gestalt bar:** a content page reads as ONE warm chrome shell — a ~½-scale chrome title under a
crisp dividing rule, the title condensing into a slim warm-glass top-rail the body scrolls FROM (not
under bare scaling text), consistent `@mkbabb/glass-ui/<sp>` paths, clean anti-aliased corners on every
glass surface, and a readable warm-glass tracking toc — IDENTICAL in Chrome and Safari, both modes, at
zero per-frame filter cost.
