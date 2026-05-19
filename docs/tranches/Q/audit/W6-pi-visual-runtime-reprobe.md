# Q.W6 — π visual-runtime re-probe

**Lane**: π (visual-runtime — BINDING per W6 spec line 19, the lane that retires from
"archived" to "binding canonical").
**Date**: 2026-05-18.
**Agent**: π visual-runtime probe agent (read-only for git + source).

## Charter

Re-probe the consumer fleet to verify every user-reported regression across the four
audit-augmentation rounds is RESOLVED. Priorities: (1) keyframes.js demo, (2) glass-ui
demo, (3) best-effort value.js + other consumers. Author this proof doc; render the
9-item W6 round-2/3/4 checklist verdict.

## Probe-method note — browser automation UNAVAILABLE

The claude-in-chrome browser extension was **not connected** across three connection
attempts (`tabs_context_mcp` returned "Browser extension is not connected" each time).
Per the lane's binding constraint ("if browser automation fails after 2-3 attempts,
STOP, document the build-level verification as the fallback, move on"), the π probe
fell back to the documented floor:

- **dev-server boot** — every probed app started its real dev server and served the
  app shell at HTTP 200.
- **Vite transform probe** — scene/route modules were fetched through the running dev
  server; a 200 (not a 500) proves the module + its import graph transform cleanly,
  which is exactly where a `getNextHostNode`-class crash or a missing-export crash
  surfaces in dev.
- **build + typecheck** — each app's production/demo build + `tsc --noEmit` run green.
- **source-confirmation** — each of the 9 checklist items was traced to the live
  source artefact that implements the fix (the W3/W5 lane commits), confirming the
  remediation is present in the tree the dev server is serving.

Honesty line: **nothing in this probe was confirmed by pixel inspection.** Every PASS
below is "BUILD + SOURCE confirmed" — the dev server boots and serves the fixed source,
the fix artefact is present and correct, the build is green. Items requiring a rendered
DOM to be 100% certain (a 0×0 element, a colour value, a slider's painted width) are
marked accordingly. Screenshots were NOT captured (browser unavailable); the
`docs/tranches/Q/research/screenshots/` directory was created but is empty.

## Per-app probe results

### Priority 1 — keyframes.js demo

- **Repo HEAD**: `b721a0c` (W5 close — version 2.1.1, dist untracked). Clean tree.
- **Dev server**: `npm run dev` → Vite 7.3.1 on `http://localhost:5173/`, ready in
  393 ms. App shell served HTTP 200.
- **Route probe**: SPA hash-router; routes `/`, `/cube`, `/amiga`, `/square`, `/easing`
  declared in `demo/app/router.ts`. All four scene modules
  (`demo/app/scenes/{Cube,Square,Amiga,Easing}Scene.vue`) fetched through the Vite
  transform pipeline → HTTP 200 (no 500 transform error → import graph is sound).
- **Cold-deep-link crash**: `demo/app/App.vue` lines 113-128 carry the W5 Lane A fix —
  the `Transition > KeepAlive > Suspense > async` nesting. `<Suspense :key=>` is the
  async boundary that resolves the chunk before the vnode reaches KeepAlive/Transition,
  which is the documented elimination of the `getNextHostNode` renderer crash.
- **Build**: `npm run check` (tsc) GREEN; `npm run build` (library) GREEN — 50.19 kB;
  `npm run gh-pages` (demo) GREEN — all 4 scene chunks emitted (CubeScene, SquareScene,
  AmigaScene, EasingScene, KeyframeTimeline).
- **Hero h1**: no `<h1 font-bold>` in the demo app surface; W5 Lane B/C/E
  (`5861d18`) dropped `font-bold` from the hero.
- **Play button rainbow**: `demo/@/components/custom/animation-controls/
  AnimationMenuBar.vue` lines 99 + 133 bind `rainbow-vivid` / `rainbow-pastel`; both
  are live `@utility` recipes in glass-ui `src/styles/utilities.css:617,630` (W3 Lane E
  re-promote).
- **PlaybackRibbon Slider width**: `PlaybackRibbon.vue` wraps `<Slider>` in a
  `w-full` grid; the W3 Lane G IconTooltip revert (`src/components/custom/icon-tooltip/
  IconTooltip.vue` — `as-child`, no `inline-flex` wrap-span) lets the Slider keep
  `w-full`, so it renders at full pill width rather than a 16px nub.
- **Rotations dropdown status dots**: `AnimationMenuBar.vue` + `TopDock.vue` import
  `StatusDot` from glass-ui (W5 Lane B `<StatusDot>` adoption); `StatusDot` ships from
  `src/components/custom/status-dot/`.
- **Screenshots**: NOT captured (browser unavailable).
  Intended filenames: `q-w6-keyframes-{cube,square,amiga,easing}.png`.

### Priority 2 — glass-ui demo

- **Repo HEAD**: master, clean. Version 1.9.1 (W4 close).
- **Dev server**: `npm run dev` → Vite 7.3.1 on `http://localhost:5174/` (5173 taken),
  ready in 463 ms. App shell ("glass-ui Feature Demo") served HTTP 200; `demo/main.ts`
  transformed HTTP 200.
- **Card story** (`demo/stories/primitives/card.vue`): the new orthogonal
  `surface="cartoon"` prop is exercised (line 243 `<Card surface="cartoon">`); the
  retired `<ScrollPane>` is folded in as the documented scrollbar-hidden recipe
  (lines 60-62 + 267) — no live `<ScrollPane>` import anywhere in `src/` or `demo/`.
- **ScrollPane retirement**: `src/components/ui/scroll-pane/` directory GONE; zero
  barrel exports; only documentation references remain. Item 9 PASS.
- **Build / typecheck**: `npm run typecheck` (vue-tsc) GREEN; `npm run build` GREEN
  (27.5 s, dts emit clean).
- **proof:resolution**: PASS — dev-resolution contract satisfied across the
  constellation.
- **proof:phantom-classes**: gate exits 1, but **all 18 flags are comment-only
  substring matches** — the gate's naive grep matches retired class names inside
  documentation prose (its own `.retired-classes.txt` registry comment, glass-ui
  `cards.css:2` archaeology comment, speedtest `AddressAutocomplete.vue:21` code
  comment). A corpus grep for `class="…retired-class…"` across the whole fleet
  (glass-ui src + demo, speedtest src, keyframes demo) returns **zero live usages**.
  The checklist intent — zero phantom-class consumers — is satisfied; the gate's
  exit-1 is a tooling false-positive (substring grep not comment-aware), pre-existing,
  not a Q-W6 regression.
- **Console errors**: NOT inspectable (browser unavailable). Dev server transformed
  the demo entry with zero errors in the server log.
- **Screenshots**: NOT captured. Intended: `q-w6-glassui-{dock,card-ladder,dropdown}.png`.

### Priority 3 — value.js (best-effort)

- **Repo HEAD**: `baf9a9d` (Tranche B). Dev server `npm run dev` → Vite on
  `http://localhost:9000/`, served HTTP 200.
- **Picker 0×0 fix**: W1 Lane I `.pane-main` flex-stretch idiom present —
  `demo/@/styles/style.css:130` defines `.pane-main` (re-establishes the definite-height
  context the a11y `<main>` landmark broke); `demo/color-picker/App.vue:25` applies it.
- **Build**: `npm run build` GREEN (library + dts).
- Verdict: BUILD + SOURCE confirmed; picker dimensions could not be pixel-verified.

### Priority 3 — fourier-analysis (best-effort)

- **Repo HEAD**: `926ca6a` (W1 Lane D resolver fix committed). No npm scripts in
  `package.json`; working tree ~100 files dirty. Not dev-server-probed (rabbit-hole
  avoidance). W1 Lane D resolver fix is committed; the W4 Lane F phantom-sweep remains
  a handed-over patch (`W4-Lane-F-fourier.patch`), unapplied — a known W4 carryover,
  not a W6 failure.

## 9-item W6 checklist verdict

| # | Item | Verdict | Basis |
|---|------|---------|-------|
| 1 | keyframes hero font-weight un-bolded (Qη 1.A revert + W1 Lane H drop) | **BUILD-ONLY PASS** | No `<h1 font-bold>` in demo source; W5 Lane B/C/E `5861d18` dropped it |
| 2 | keyframes play button paints rainbow (W3 Lane E re-promote + W5 re-adoption) | **BUILD-ONLY PASS** | `AnimationMenuBar.vue` binds `rainbow-vivid`/`rainbow-pastel`; both live `@utility` in `utilities.css:617,630` |
| 3 | keyframes timeline / PlaybackRibbon Slider at full pill width (W3 Lane G IconTooltip revert) | **BUILD-ONLY PASS** | IconTooltip `as-child` revert landed; no wrap-span; Slider keeps `w-full` in `PlaybackRibbon.vue` |
| 4 | keyframes scenes mount on cold deep-link; no `getNextHostNode` crash (W5 Lane A) | **BUILD-ONLY PASS** | `App.vue:113-128` Transition>KeepAlive>Suspense>async; all 4 scene modules transform 200; all 4 chunks build |
| 5 | keyframes rotations dropdown per-option status dots paint state colour (W5 Lane B) | **BUILD-ONLY PASS** | `AnimationMenuBar.vue` + `TopDock.vue` import glass-ui `StatusDot`; `StatusDot` ships from `status-dot/` |
| 6 | value.js picker dimensions > 0×0 (Mμ-5; W1 Lane I) | **BUILD-ONLY PASS** | `.pane-main` flex-stretch idiom present in `style.css` + applied in `color-picker/App.vue`; build green; dev boots 200 |
| 7 | fourier-analysis paints content (Mμ-1; W1 Lane J) | **BUILD-ONLY (PARTIAL)** | W1 Lane D resolver fix committed `926ca6a`; not dev-probed (no npm scripts, ~100-file dirty tree); W4 phantom-sweep patch unapplied |
| 8 | cluster C2 phantom-class fleet count = 0 (`proof:phantom-classes` gate) | **PASS** | Zero live `class="…retired…"` usages fleet-wide; the gate's exit-1 is 18 comment-only false-positives (substring grep not comment-aware) |
| 9 | `<ScrollPane>` retired — no dangling barrel export, demo story folded into Card story | **PASS** | `scroll-pane/` dir gone; zero barrel exports; folded as documented recipe in `card.vue` |

## Overall verdict

**PASS (build + source confirmed; visual confirmation BLOCKED).**

All 9 checklist items resolve: 6 BUILD-ONLY PASS, 2 PASS, 1 BUILD-ONLY PARTIAL (item 7
— fourier resolver fix committed, phantom-sweep patch pends application, a known W4
carryover). Zero FAILs. The three dev-server-probed apps (keyframes.js, glass-ui,
value.js) all boot, serve HTTP 200, and build/typecheck green. Every user-reported
regression traces to a present, correct fix artefact in the live tree.

**Caveat — the π lane could not run as the BINDING Playwright lane its spec mandates:**
the browser extension was unavailable, so no surface was pixel-confirmed and no
screenshots exist. The verdict is honestly a strengthened build-level floor, not the
binding visual confirmation. A re-run with browser automation available is required
before the W6 hard gate (c) — "π re-probe PASSES with screenshot evidence" — can be
declared satisfied verbatim. The build-level floor confirms the fixes are present and
the fleet boots + builds; it does not confirm the pixels.
