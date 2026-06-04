# AS.W7 · WAVE-3 · H6 — after-capture + holistic challenge

Re-capture of every user-flagged page + a broad sweep, AFTER the Wave-2 fixes, to
confirm each visual/design defect (D1–D13) is visibly resolved. READ-ONLY review.

Captures live in `/Users/mkbabb/Programming/glass-ui/as-verify/w7-after/` (44 PNGs,
light + dark where relevant). All captures were taken in an **isolated standalone
Playwright browser** (`as-verify/capture-w7-after.mjs` et al.), one fresh context
per shot — the shared MCP browser was being driven by a sibling Wave-3 agent and
could not hold a route/theme stably; the standalone-browser route gave clean,
contention-free, route-verified + theme-verified captures (each script asserts
`location.href` + `documentElement.classList.contains('dark')` immediately before the
screenshot). Theme is set via the demo's own persistence key `glass-ui-demo-config`
(`{"dark":true|false}`), primed before app boot.

---

## Per-defect before → after verdict

| Defect | Class | Before (W1 audit) | After (W3 capture) | Holds |
|---|---|---|---|---|
| **D1** muddy/broken page background | demo + general | fixed light-pastel radial wash, no dark value → muddy splotchy tan/blue blobs over dark `--background` | paper-glass light: clean cream surface, one gentle controlled blue accent wash. Dark: near-black with a deliberate warm-amber + cool-blue aurora glow behind the glass cards — intentional, contained, NOT splotchy. Foundations/colors equally clean. | **YES** |
| **D2** overflowing dock (general) | lib + demo | horizontal nav/category pager ran off the right edge, tabs clipped, no scroll/containment | dock pager fits 7 tabs at 1024 inside its pill, 11 tabs at 1440 contained. At 375 the pager has `overflow-x:auto` (scrollW 3365 > clientW 275) → scrolls, no hard clip. Broad sweep: **0/14 routes** show document/body horizontal overflow. | **YES** |
| **D3** hero scroll broken | demo | `/compositions/hero` scroll container broken | live `main` scrollHeight 1012 > clientHeight 834, `canScroll:true`, scrolled to 178 cleanly. Single-screen comp fits the fold; below-fold content reachable. | **YES** |
| **D5** configurator undesigned + 2 routes | demo | sparse bare story; `configurator-mobile` a 2nd route | one `/primitives/configurator` route, responsive density (comfortable at 1440, mobile at 375 — same route reflows). Expressive grouped-control + live-stage layout. No mobile route in manifest. | **YES** |
| **D6** aurora preset cards | lib | "Sky" card black bar at top + left-edge scroll shadow | 6 preset cards (Sky/Dawn/Meadow/Deliberative/Day 9/CX Impasto), each gradient preview fills to the rounded top edge — **no black bar**, no left-edge scroll shadow. Reads clean light + dark. | **YES** |
| **D7** configurator not expressive / empty void | demo + lib | huge empty void below sparse controls | live specimen STAGE fills the left (painterly field), grouped "Field" control section (Medium/Spread/Bloom/Grain) on the right, preset row (Quiet/Default/Lush), API-surface docs fill below. No dead void. | **YES** |
| **D8** pill list not scrollable, active clipped | lib | 6 pills = 355px overflow, last pill (Nuclei) clipped under fade, no scroll | preset row redesigned to 3 pills (Quiet/Default/Lush) fitting exactly (scrollW==clientW==335) AND carries `overflow-x:auto` → scrolls if it ever overflows. No clipped active item. | **YES** |
| **D9** golden drag ring ignores radius | lib | drag-highlight ring was square, ignored item border-radius | live drag capture: the golden ring traces the item's ROUNDED pill shape. Source: `.sortable-drag-ghost` uses radius-respecting `box-shadow: 0 0 0 2px var(--color-gold)` (+glow) and deliberately does NOT override the cloned item's radius (SortableList.vue:117-128). | **YES** |
| **D10a** aurora does not animate | lib | 0→5s canvas meanAbsDiff **1.61**/channel — visually static; drift plateaus by 30s | screenshot pixel-diff over the canvas region across a **3s** window: meanAbsDiff **5.99** (light) / **5.57** (dark), maxAbsDiff 61, **58% of pixels changed >3/channel**. ~3.7× the old 5s value over a shorter window — extrapolates ~10/channel at 5s (the audit's 8–15 target band). Field visibly drifts (clouds + nuclei rings move t0→t3). | **YES** |
| **D10b** deriveAurora not wired | lib | `deriveAurora` not implemented, not in configurator | configurator now exposes a **"Derive"** tab + a **"Derive from color"** control (7 tabs: Medium/Palette/Flow/Texture/Comp/Nuclei/Derive). Selecting a preset (e.g. CX Impasto) drives the full field to a derived palette live (red impasto). End-to-end derive→paint works. | **YES** |
| **D11** no blob configurator/demo | demo (couples D10) | no blob route on the sidebar | `/blob` flat route exists + a sidebar "Blob" rail tab. Full metaball field (drifting orchid/rose orbs), preset row (Still/Drift/Boil), grouped configurator (Palette/Count/Viscosity/Glow/Grain), live label "orchid · 6 nuclei · visc 45". Polished light + dark — mirrors aurora's quality. | **YES** |
| **D12** sidebar too long, no scroll | lib | vertical CategoryRail overflowed the viewport with no scroll container | at 420px height the rail (`.glass-dock vertical variant-rail`) is `overflow-y:auto`, clientHeight 334 < scrollHeight 722 → **scrollable**; height-bounded inside its pill at 600px. Block-axis mirror of the D2 fix. | **YES** |
| **D13** hero card broken/missing | demo | hero frame had no solid surface, dissolved into D1 background | hero card is a distinct rounded surface with a contained pastel gradient, a visible border, headline (typewriter), body copy, and two CTAs (Start building / View the source). Distinct from page light + dark. | **YES** |

**All 13 defects: visibly resolved.** No before-defect re-appears in the after set.

---

## Holistic polish critique (harsh-critic pass, frontend-design eye)

Navigated the whole demo (foundations, primitives, containers, navigation, data,
feedback, motion, sliders, compositions, aurora, blob). Overall: the demo now reads
as **polished and production-grade**, not a half-finished storybook.

What lands:

- **Backgrounds are now a coherent system.** Light = clean warm cream; dark =
  near-black with a deliberate, contained aurora-glow behind hero surfaces. The
  former "muddy bleed" read is gone everywhere I looked (paper-glass, colors, hero).
- **Compositions are genuinely strong.** Dashboard (system list + 4 metric cards +
  projects table + activity feed) and Instrument Chassis (radial gauge + phase
  cascade + transport) are showcase-quality, consistent spacing/typography.
- **Aurora + Blob are the headline value.** Both are live, animated, configurable,
  and read beautifully in both themes. The preset cards are clean. The derive
  pipeline visibly works.
- **Overflow discipline is now uniform** — docks/pagers/rails scroll-on-overflow on
  both axes; 0/14 swept routes had document horizontal overflow.

Remaining rough edges / nits (none block the W7 close; punch-list below):

1. **Configurator mobile (375) is description-heavy above the fold.** The StoryPage
   prose (two paragraphs) pushes the actual configurator specimen mostly below the
   fold on a 375×812 screen — you scroll a full viewport of copy before the live
   control card. Not a defect (the merged responsive story works), but the
   first-paint impression at mobile is "wall of text" before the thing it documents.
2. **Aurora "Derive" panel content sits below the configurator fold.** The Derive
   tab + "Derive from color" control exist and the pipeline works, but the panel's
   color-picker isn't visible without scrolling the configurator column at 1440×900;
   a first-time viewer may not see the derive affordance immediately.
3. **Story-pager right-edge clip reads ambiguously.** The horizontal pager correctly
   scrolls on overflow, but the rightmost tab is hard-cut at the pill edge with no
   fade/chevron affordance, so "there are more tabs" isn't obvious at a glance
   (e.g. "Overlays & Scrim" / "Co…" / "Dra…"). The scroll works; the discoverability
   of the scroll is the nit.
4. **Hero is a single-screen comp with no below-fold payoff.** D3 (scroll container)
   is healthy, but the hero route itself is essentially one viewport — the full-page
   capture reveals nothing more. Fine as-is; just noting there's no scroll reward.

No NEW defects introduced by Wave-2 were found. No broken token paints, no
double-wrapped `hsl(var(--token))` failures, no dark-mode regressions, no layout
breakage on the swept routes.

---

## Capture method note (for reproducibility)

Standalone scripts under `as-verify/` (`capture-w7-after.mjs`, `aurora-w7.mjs`,
`sortable-w7.mjs`, `inspect-w7.mjs`, `sweep-w7.mjs`, `derive-w7.mjs`) launch
chromium via the globally-resolvable `playwright` (from `@mkbabb/value.js`'s
node_modules) with `PLAYWRIGHT_BROWSERS_PATH` pointed at the ms-playwright cache.
D10a's motion is measured by a Python/PIL pixel-diff of the t0/t3 aurora
screenshots over the canvas region (WebGL `drawImage` readback returns an empty
buffer without `preserveDrawingBuffer`, so a screenshot-diff is the correct probe —
the in-page canvas-diff returning 0 is a readback artifact, not stasis).
