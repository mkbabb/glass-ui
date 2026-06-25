# BD page-audit — MOTION category (11 pages; handmark covered by its own deep agent)

Branch: `prototype/liquid-dock` · dev server `:5173` (npm run dev) · viewport 1440×900 · live Chromium (Playwright).
Pages audited: springs · curve-gallery · scroll-vt · scroll-system · scroll-choreography · countup · reveal · deck · typewriter · animated-digit · split-chars.
(handmark = separate deep agent; NOT covered here.)

Motion is the LIVE-animation band — the `--motion-accent` violet identity (`light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1))`, the `--viz-legendre` twin). The band default background is `constellation` (live GL, one-GL-per-route). VERDICT UP FRONT: the violet identity is CORRECT and CONSISTENT (springs h2 / typewriter highlight / animated-digit accent bars / curve stroke all read violet); the constellation/canvas backgrounds ARE alive (60fps rAF confirmed, PRM off). Most demos ANIMATE correctly. But there are **two genuine per-page motion BUGs** (scroll-system crash, countup dead-at-rest is play-gated not a bug) plus the **systemic chassis defects** confirmed on every page, plus a **motion-specific dock-facet map corruption** that feeds the nav-loop.

---

## CHASSIS CONFIRMATION (all 11 pages USE the shared chassis — DRY holds)

Every motion page renders through `StoryPage`/`StoryHeader`/`StoryHero`/`StorySection` — ZERO header hand-roll in the chassis sense. Per-page measurements:

| page | h1 px (rung) | `--story-header-rule` | header border-bottom | bodyHeaders (dup) | body `<h2>` | canvas |
|---|---|---|---|---|---|---|
| springs | 109.7 (display-5) | unset | **0px** | **1** (dup) | **0** | 1 (constellation) |
| curve-gallery | 86.1 (display-4) | unset | **0px** | **1** (dup) | 1 | 0 (grid bg) |
| scroll-vt | 86.1 | unset | **0px** | 0 | **0** | 1 |
| scroll-system | 86.1 | unset | **0px** | **1** (dup) | 3 | 1 |
| scroll-choreography | 86.1 | unset | **0px** | 0 | 3 | 1 |
| countup | 86.1 | unset | **0px** | 0 | **0** | 1 |
| reveal | 86.1 | unset | **0px** | 0 | 2 | 1 |
| deck | 86.1 | unset | **0px** | 0 | 1 | 1 |
| typewriter | 86.1 | unset | **0px** | **1** (dup) | **0** | 1 |
| animated-digit | 86.1 | unset | **0px** | 0 | **0** | 1 |
| split-chars | 86.1 | unset | **0px** | 0 | 2 | 1 |

- **W-HEADER-SCALE — CONFIRMED on all 11.** Chrome `<h1>` is 86px (display-4) on the 10 D3 pages, 109.7px (display-5) on springs (the D1 category lead). The 86–110px title fills the top band + the duplicate body eyebrow/h2 means the title concept renders ~2–3× (screenshot-confirmed on springs/typewriter/animated-digit). The demo header rung is over-scaled (ONE chassis edit; library √φ ladder untouched).
- **W-PAGE-CHASSIS rule — CONFIRMED on all 11.** `--story-header-rule` is unset; header→body seam border-bottom is `0px` on every page. (The in-body `.story-sections--delimited` hairline DOES paint — reuse that token for the header seam.)
- **DUPLICATE HAND-ROLLED HEADER — present on springs / curve-gallery / scroll-system / typewriter** (bodyHeaders=1: a secondary in-card eyebrow that repeats the chassis descriptor). The CLEAN reference models in this band: **reveal, scroll-choreography, deck, animated-digit, split-chars, scroll-vt, countup** (bodyHeaders=0). So the duplicate is genuinely per-page, NOT universal — the clean pages prove the chassis-fold pattern.
- **`label→heading` section re-key — the dominant per-page arm.** scroll-vt / countup / typewriter / animated-digit render **0 `<h2>`** (sections are mono `label=` eyebrows only — "SINGLE-LINE, MONOSPACE", "VALUE TWEEN", "VIEW-DRIVEN REVEAL"). Reference models (correct `heading=`): scroll-system (3), scroll-choreography (3), reveal (2), split-chars (2).
- **W-PAGE-BACKGROUND — CONFIRMED.** The constellation IS painting (dots visible behind the body card on every GL page, 60fps live) BUT the body sits on an opaque `glass-resting` card so the live field barely reads through — the glass demos (spring tile, glass-quiet cards) do NOT refract a live field (no `tier="field"`). curve-gallery is correctly on the `grid` static wash (one-GL-per-route budget — springs spends the constellation budget for the band; documented in manifest).
- **W-PAPER-MORPHISM — N/A here** except handmark (separate agent). The motion band is constellation/grid, not paper.

---

## PER-PAGE MOTION FINDINGS (category-specific — do the demos animate?)

### springs ✅ animates
40 play/reset controls, `--motion-accent` violet h2, the `spring` tile renders. Constellation alive (60fps rAF). Functional. (Did not exhaustively click every register's Play — the Play/Reset/register-select chassis is wired and the tile paints.)

### curve-gallery ✅ renders (editor present)
39 SVGs / 86 paths / 13 circles — the full curve canon plots paint (Standard/Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/Linear()/Springs tab strip visible). 7 interactive `cursor:pointer` circle handles exist (the editable cubic-bezier). **Caveat:** I confirmed the plots + handle elements render; I did NOT land a drag on the Custom-family bezier to prove live re-plot (the family tab markup didn't match my selectors and the editable handles sit lower on a tall page). Recommend the fix agent verify the Custom-family drag re-plots live. No crash, no dead plot observed.

### scroll-vt ✅ animates
scroll()/view()/VT all `CSS.supports` true. The purple `.scroll-progress` bar fills as the inner panel scrolls (`--scroll-progress-scroller: self` is CORRECT — it tracks a scrollable demo panel, not main). Reveal cards 1–6 render. VIEW-DRIVEN REVEAL + VIEW TRANSITIONS sections present. Functional.

### scroll-system ⛔ **BUG — runtime crash, the crossing-event demo is broken**
**2 console ERRORS** (only motion page with errors): `TypeError: el.getBoundingClientRect is not a function` at `src/composables/motion/useScrollTrigger.ts:130` (`resolveTriggerPx`), called from `attach` (`:211`). ROOT CAUSE: `demo/stories/motion/scroll-system.vue:130` — `<span v-if="n === 7" ref="marker" />` is INSIDE `v-for="n in 14"` (line 120). A template `ref` inside a `v-for` collects refs into an **array**, so `marker.value === [span]` (not the span); `useScrollTrigger`'s `{ at: { element: marker } }` trigger (`scroll-system.vue:36`) does `toValue(at.element).getBoundingClientRect()` → array has no such method → throws. The thrown error aborts the `attach()` trigger-wire loop, so the live "onCross log" panel does NOT populate on scroll (verified — scrolled the inner port 1000px, log stayed empty). FIX: hoist the marker `<span>` OUT of the `v-for` (a dedicated marker element after the loop) OR use a function-ref that captures the single span.

### scroll-choreography ✅ renders
All 4 recipes present (`.scroll-build`×1, `.scroll-cascade`×1, `.scroll-pin`×2, `.smooth-scroll`×1), `timeline-scope` supported. Cascade 1–6 cards render; "The register" / "Section cascade" / "Scroll-pinned showcase" sections (3 `<h2>` — correct affordance, a reference model). **Caveat:** the scroll-pin sticky stage sits below the fold; I did not conclusively verify the pinned-phase advance (the `@supports`-gated recipe + cards render; recommend the fix agent scroll the pinned stage and confirm the phase sweep).

### countup ⚠️ play-gated (NOT a bug, but reads dead at rest)
3 `[data-countup]` figures (targets 1280/98/4200) sit at **"0"** at rest even when scrolled into view — they tween only after the explicit **"Run"** button. After Run they reach 1280/98/4200 (verified). This is a deliberate play-triggered demo, but the resting "0,0,0" reads as a dead page on first paint. Consider auto-running on viewport-enter (IntersectionObserver) so the demo self-demonstrates without a click — matches the band's "live animation" promise.

### reveal ✅ animates (CLEAN reference page)
6 `[data-reveal]` elements all reached opacity 1 (revealed correctly). 0 dup header, 2 `<h2>` — the cleanest motion page (no chassis duplicate, correct section affordance). Functional.

### deck ✅ animates (fully functional)
6 slides, only slide 1 visible (opacity 1; 2–5 at opacity 0 — real paging, not stacked). `aria-live` = "Slide 1 of 6: Welcome". Clicked pager dot "Go to slide 3" → aria-live updated to "Slide 3 of 6: Focus-guarded", slide advanced. Keyboard-paged presentation works. MINOR: the 6 pager dots (y≈860) sit at the same band as the bottom-dock nav arrows (y≈861) — a near-collision worth checking on smaller viewports.

### typewriter ✅ animates
"Built on **spring physics**|" (violet accent + live blinking cursor) + "$ npm install @mkbabb/glass-ui|". Typing completed one-shot, holds the cursor. Violet identity correct. (Has the duplicate header + 0 `<h2>` chassis defects.)

### animated-digit ✅ animates
Giant "935.6" / "27" with violet `--motion-accent` accent bars over "DOWNLOAD · MBPS" / "LATENCY · MS". "Resample" re-tweens to real values. The huge digit IS the focal display register (good). Clean (0 dup header). 0 `<h2>` (label arm).

### split-chars ✅ animates (accessible)
16 `.char` spans with `--char-index: 0,1,2,3,4…` ("Fourier…"), `aria-hidden="true"` glyphs under a labelled wrapper (38 aria-labels). Accessible-by-construction holds. 0 dup header, 2 `<h2>`. Functional.

---

## MOTION-SPECIFIC NEW BUG — the dock-facet map is corrupt (feeds the nav-loop)

`demo/stories/dock-layer-contexts.ts:299-326` (`motion:` facets) is **stale + incomplete**:
- **DEAD storyId (line 316):** `{ storyId: "underline", label: "Underline" }` — there is NO `motion/underline` route (GlassUnderline RETIRED onto `motion/handmark` per DEC-8). The "Text FX" facet's first-entry navigation can target a 404.
- **INCOMPLETE — 6 of 12 stories are absent** from the facet map: `scroll-vt`, `scroll-system`, `scroll-choreography`, `deck`, `split-chars`, `handmark`. When on one of these, `railContext.get` (BottomDock.vue:121-127) falls back to `contextLayers.value[0]` ("engines"), and the `v-model:selected` echo on the `<DockStack mode="facets">` can write a non-matching id → the get/set equality short-circuit (BottomDock.vue:138) fails → `router.push` to that facet's `entries[0]` → the **nav-loop**.

This is the per-category face of **W-DEMO-NAV-FIX** (confirmed load-bearing — directly observed: a `/motion/springs` direct nav bounced to `/motion/handmark` ~1s after load, with a desynced h1/body). The fix is two-fold: (1) repair the persisted-route/echo precedence in BottomDock/SidebarDock (URL wins on direct nav), and (2) **re-key the motion facet map**: delete the dead `underline` entry, add the 6 missing stories. An isolated browser context did NOT fully prevent the bounce (it's a reactive in-app echo, not history-state); audit was done via per-page `goto` + immediate evaluate, flagging any bounce.

---

## VERDICT (5 lines)
1. CHASSIS CONFIRMED: all 11 motion pages use the shared chassis (DRY holds); W-HEADER-SCALE (86–110px h1), W-PAGE-CHASSIS (`--story-header-rule` unset, 0px header seam) reproduce on every page; duplicate hand-rolled header on springs/curve-gallery/scroll-system/typewriter (clean models: reveal/deck/animated-digit/split-chars/scroll-choreography/scroll-vt/countup).
2. MOTION IDENTITY HEALTHY: the `--motion-accent` violet is correct + consistent across the band; the constellation/canvas backgrounds are LIVE (60fps rAF, PRM off); springs/typewriter/animated-digit/split-chars/deck/reveal/scroll-vt/scroll-choreography all animate correctly.
3. REAL PER-PAGE BUG ⛔ scroll-system: `useScrollTrigger.ts:130` throws `getBoundingClientRect is not a function` because `scroll-system.vue:130` puts `ref="marker"` inside a `v-for` (ref-array trap) → the onCross crossing-log demo is dead (verified: log empty on scroll). Hoist the marker ref out of the loop.
4. MOTION-SPECIFIC NEW BUG: the `motion:` dock-facet map (`dock-layer-contexts.ts:299`) has a DEAD `underline` storyId (404) + is missing 6 of 12 stories (scroll-vt/scroll-system/scroll-choreography/deck/split-chars/handmark) — corruption that feeds the W-DEMO-NAV-FIX nav-loop (directly observed springs→handmark bounce).
5. WATCH-LIST (not hard bugs): countup reads "0,0,0" at rest (play-gated — consider auto-run on viewport-enter); curve-gallery editable-bezier drag re-plot not conclusively verified; scroll-choreography pinned-stage phase-sweep below fold (not conclusively verified); deck pager dots near-collide with bottom-dock nav at y≈860; the dominant per-page arm is the `label→heading` re-key on scroll-vt/countup/typewriter/animated-digit (0 `<h2>`).
