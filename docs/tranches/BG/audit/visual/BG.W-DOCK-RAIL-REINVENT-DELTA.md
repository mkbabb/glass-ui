# BG.W-DOCK-RAIL-REINVENT — dual-engine paint verdict

> ## ⟨FRESH RE-JUDGE — post-fix (commit `82661310`), 2026-07-05⟩ · **VERDICT: PASS** → DONE
>
> **Judge:** non-authoring paint judge (did not build; re-verifies painted truth vs the pass-bar after the criteria-4+7 paint-FIX landed).
> **Pipeline:** demo:dist BUILT bytes on `:5200` (dist-demo rebuilt 15:58, shell-rail testids present in the shipped bytes) · Chrome CDP (Chrome 149, in-pixel badge `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`) · Safari off-screen WKWebView (`wkshot-rail-judge`, in-pixel badge `ENGINE WEBKIT · GPU Apple GPU`). Both modes (LIGHT + DARK) per badge. `verify-siblings-intact --quiet` exit 0 before + after.
> **Captures:** `docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-judge/` — 48 PNGs, all resolve on disk, non-zero, 2880×1800 @ dsf 2. Chrome full+per-stack-fanned for `/dock/overview` (shell), `/dock/rail`, `/dock/liquid-playground`, both modes; Safari shell-fan + wrap, both modes; `judge-interaction-probe.json` (box-inviolate + overhang + getAnimations).
>
> **The two prior-FAIL criteria are now DELIVERED and painted dual-engine both-modes:**
> - **Criterion 7 (shell consumers) — PASS.** `SidebarDock.vue:336` + `BottomDock.vue:331` now author a `#rail` `<DockStack mode="facets">` over `useShellNavDock`'s `railItems`/`railContext` (`v-if="railItems.length > 1"`). On `/dock/overview` (the dock category carries 2 facets: shell + panes) BOTH shell docks render the CONTAINED rail: the vertical SidebarDock fans its facet chips RIGHT into the gutter; the horizontal BottomDock fans them UP. Verified painting in Chrome (ANGLE Metal) + Safari (WebKit/Apple GPU), light + dark.
> - **Criterion 4 (`wrap` painted) — PASS.** `liquid-playground.vue:872` exercises `<DockStack … :visible-count="4" wrap>` on the vertical dock: the 8-member fan WRAPS into a 4×2 grid (`data-wrap=true`, `flex-wrap:wrap`, rows clustered 595-597 & 635-637), each chip carrying its own `--glass-accent` hue; the horizontal twin (`data-scrolls=true`, `flex-wrap:nowrap`) routes its 8 members through the ONE `<FadingScroll>` port (visible-count=4). Both display options painted, dual-engine.
>
> **Full scorecard (all 7 PASS):**
>
> | # | Criterion | Verdict | Evidence |
> |---|-----------|---------|----------|
> | 1 | COLLAPSED = CONTAINED (core = normal dock icon, ~1-1.5px warm-ink hairline, zero gutter carousel) | **PASS** | At rest every `.dock-stack-member` is `opacity:0` (folded behind the core, scale 0.4, translated INWARD) — zero protruding carousel. The always-visible `.dock-stack-core` (opacity 1, full 40px control-size hit-box) reads as a normal dock icon in the run; its centred glyph paints inside the plate. Hairline `--dock-rail-hairline: 1.5px`, ink `color-mix(in srgb, light-dark(#1c1917,#e9e6e2) 15%, transparent)` (warm-ink both modes, no new colour event), painting `(218,217,214)` over the gutter — the crossing-axis edge marker. Minor: the 1.5px hairline seats ~3px past the plate's trailing edge (the crossing axis it marks) and the transparent core button hit-box extends ~4px (paints nothing) — near-imperceptible, by-design edge position; the reinvent's containment goal (no protruding capsule, members hidden) is fully met. |
> | 2 | HOVER/CLICK fan crossing the edge, φ² asymmetric (2.6 ± 0.5) | **PASS** | Token math provably golden: `--dock-rail-overhang = (fan-length/(1+golden)) · golden`, `golden = --dock-rail-golden: 2.618` (written from `RAIL_GOLDEN_SQ`, CSS fallback 2.618 — the constant IN the calc, W-CARD-PAD fence held). Measured about the pivot/hairline: sidebar 2-member outward 50.2 / inward 18.9 = **2.66**; `/dock/rail` 3-member 78.2/29.8 = **2.62**; bottom 2-member 50.6/18.4 = **2.75** — all inside [2.1, 3.1]. Fan visible crossing the edge in every fanned capture (sidebar→right, bottom→up), both engines both modes. |
> | 3 | BOX-INVIOLATE deltaW=deltaH=0 collapsed→fanned | **PASS** | Measured dock-plate rest-vs-fanned **dW=0.00, dH=0.00** on EVERY stack × route × mode (sidebar, bottom, dock-stack-control, lp-horiz, lp-vert). The `.glass-dock-frame` non-clipping escape held; no size fed into the dock's intrinsic box. |
> | 4 | DISPLAY OPTIONS — visibleCount + wrap both painted | **PASS** | wrap: lp-vertical 8→4×2 grid (`flex-wrap:wrap`, dual-engine). visibleCount: lp-horizontal `data-scrolls=true` 8 members through the one FadingScroll port (`flex-wrap:nowrap`). |
> | 5 | ONE engine, compositor-only fan on --spring-dock, stagger, PRM, hover+focus | **PASS** | `stack-rail.css` `.dock-stack-member` transitions ONLY `opacity/scale/translate/filter` (scale+translate on `--spring-dock-duration --spring-dock`; opacity+filter on `--duration-fast --ease-out` — the W-MOTION-CANON spatial/effects split); NO width/height/inline-size/block-size/inset animated (box-inviolate corroborates). Stagger `calc(--dock-stack-stagger 28ms × --i)`. PRM block (`@media prefers-reduced-motion: reduce`) snaps scale:1/translate:0/filter:none, keeps opacity fade — instant endpoint seat. `getAnimations` non-DocumentTimeline count = 0 (no `animation-timeline` leak). Hover (HOVER_INTENT_MS 60ms) + `onFocusIn` fan. ONE component (`DockStack`) — both `stack`+`facets` modes; `DockRail.vue` DEFINITION-ABSENT; `railProjection.ts` φ-math kept. |
> | 6 | Safari-26+ dual-engine paint | **PASS** | WebKit / Apple GPU renders the shell facet-rail fan (sidebar + bottom) AND the wrap grid for both routes in both modes, matching Chrome (ANGLE Metal) 1:1 — verified on `judge-safari-*` captures + the decoded in-pixel WEBKIT badge. |
> | 7 | ≥2 shell consumers — SidebarDock + BottomDock + liquid-playground + /dock/rail | **PASS** | SidebarDock + BottomDock author `#rail <DockStack>` over `useShellNavDock` (persistent shell chrome on any dock route); `rail.vue:250` + `liquid-playground.vue:820/872` render it. Four live consumers. |
> | + | one-border-grammar (16.1 progress hairline + rail hairline = one voice) | **PENDS ON 16.1 (not a rail-reinvent defect)** | The rail hairline is correct: 1.5px warm-ink, consistent across the sidebar (vertical) + bottom (horizontal) rails. The 16.1 `.demo-dock-scroll-ring` (`--border-progress-width: 11px`, coverage `inline-end-edge`, empty at scroll 0) is still the 11px bar the user RE-OPENED 16.1 to make a hairline — so the two weights (1.5px vs 11px) do not yet read as one voice. 16.1's OWN cursor (row 288) names this joint read ("One border grammar with F3.R4's rail hairline"); rail-reinvent provides the reference hairline (delivered), 16.1 must converge its scroll ring to match (separately re-opened). At scroll 0 (capture position) only the clean rail hairline shows — no competing bar in-frame. |
>
> **Notes on the blue vertical line in the gutter (rest captures):** a capture-mode-ONLY artifact — Chrome's default `#005FCC` focus outline on the `<main class="demo-main-scroller">` scroller, which receives programmatic focus during the `?capture=` boot. Verified ABSENT in the live (non-capture) demo (`document.activeElement` = BODY, no blue pixels). NOT the rail hairline, NOT the scroll ring. Disregarded.
>
> **Judge fences honored:** all work under `/Users/mkbabb/Programming/glass-ui`; throwaway Chrome profile + `wkshot-rail-judge` binary in the session scratchpad (never `/tmp` root, never a sibling); ZERO edits to src/demo/styles/scripts — only wrote PNGs + this DELTA under `docs/tranches/BG/audit/visual/` + flipped the cursor. `verify-siblings-intact --quiet` exit 0 before + after.
>
> ---
>
> ⟨The section below is the PRIOR FAIL judgment (pre-fix), preserved for history. The criteria-4+7 defects it localized were fixed by commit `82661310`; the fresh re-judge above SUPERSEDES it.⟩

---

# BG.W-DOCK-RAIL-REINVENT — dual-engine paint verdict (PRIOR — pre-fix, superseded)

**Wave:** F3.R4 · BG.W-DOCK-RAIL-REINVENT (USER 07-05 + IMG_1880; supersedes the BE.W-DOCK-RAIL-REALIZE topology)
**Judge:** non-authoring paint judge (did not build; verifies painted truth vs the pass-bar)
**Date:** 2026-07-05
**Verdict:** **FAIL** → routes to build-FIX (STEP 0.4). src SHAs preserved. *(SUPERSEDED by the fresh PASS re-judge above.)*
**Pipeline:** demo:dist BUILT bytes on `:5200` · Chrome CDP (real Chrome 149, `ANGLE Metal / Apple M5 Max`) · Safari off-screen WKWebView (`wkshot-rail`, system WebKit / Apple GPU). `verify-siblings-intact --quiet` exit 0 before + after.

---

## Summary

The reinvented rail **MECHANICS are correct** wherever the rail is actually rendered (the 2 demo story routes), verified across **both engines × both modes**: the inverted topology (contained-at-rest hairline + macOS-stack fan-out crossing the dock edge), box-INVIOLATE, φ² asymmetric overhang, compositor-only fan. **5 of 7 pass-bar criteria PASS cleanly.**

The wave **FAILS on two criteria** — both about *where/whether* the rail paints, not *how*:

1. **Criterion 7 (the load-bearing miss) — the NAMED shell consumers render NO rail.** The user's own fold (`docs/tranches/BG/audit/user-0705/fold-dock.md:69, 106-107`) requires the reinvented rail on "**the two shell docks** + `/dock/liquid-playground` + `/dock/rail`, both engines both modes." In the tree, `SidebarDock.vue` + `BottomDock.vue` mount **no** `<DockStack>` — the tag survives only in comments there (`BD.W-DOCK-CORE (A1)` REMOVED the shell carousel and BG did not restore it under the new contained topology). The rail exists ONLY on the 2 demo stories, and on both it is **below the fold** in the default viewport. The "hairline rail INSIDE the box, shell chrome on any route" — the whole C-DOCK-chronic close the reinvent promises — is **undelivered in the shell**.
2. **Criterion 4 (secondary) — the `wrap` display-option is not painted.** `.dock-stack-fan[data-wrap]` + the `<DockStack wrap>` prop exist in code, but **no demo** passes `wrap` (grep: zero `<DockStack … wrap>` in the stories). Criterion 4 requires `visibleCount` + `wrap` "both painted"; only `visibleCount` (=4 in liquid-playground) is painted.

---

## Pass-bar scorecard

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|----------|
| 1 | COLLAPSED = ENTIRELY CONTAINED (core = normal dock icon, only a ~1-1.5px hairline; zero gutter at rest) | **PASS** (where rendered) | Rest CSS: members `opacity:0` + `scale:fold` + tucked `translate:-overhang` (contained, invisible); only the `.dock-stack::before` hairline paints. `--dock-rail-hairline` resolves **1.5px** (in [1,2]); `-ink` = warm `color-mix(in srgb, var(--foreground) 15%, transparent)`. Rest captures show the contained pill + a faint edge hairline. |
| 2 | HOVER/CLICK fan-out crossing the edge, φ² asymmetric (outward:inward 2.6 ± 0.5) | **PASS** (where rendered) | Fan-PORT overhang vs dock cross-axis edge: rail-vertical **82.1:26.9 = 3.05**, horiz-facets **109.6:37.4 = 2.93**, vert-facets **109.6:37.4 = 2.93** — all inside [2.1, 3.1]. Token math provably `= 2.618` (`--dock-rail-overhang = minor × 2.618`, `--dock-rail-golden: 2.618` shared JS↔CSS). Fan visible in all 8 fanned captures. |
| 3 | BOX-INVIOLATE deltaW=deltaH=0 collapsed→fanned | **PASS** | Measured rest-vs-fanned dock plate: **dW=0.00, dH=0.00** on every stack × mode (rail-vert, lp-horiz, lp-vert). `.glass-dock-frame` non-clipping escape held. |
| 4 | DISPLAY OPTIONS — visibleCount + wrap both painted | **FAIL** | `visibleCount=4` painted (liquid-playground, 8 members → FadingScroll). `wrap` exists in CSS (`stack-rail.css:312`) + prop (`DockStack.vue:84`) but **no demo exercises it** → not painted. |
| 5 | compositor-only fan on --spring-dock, per-member stagger, PRM instant, hover+click/focus | **PASS** | Fan transitions `opacity/scale/translate/filter` on `--spring-dock`/`--spring-dock-duration` (no width/height/inset animated; dW=dH=0 corroborates). Stagger = `calc(--dock-stack-stagger * --i)`. PRM block snaps transform/keeps fade. `getAnimations` no `animation-timeline` leak (withTimeline=0). Hover-intent (60ms) + `onFocusIn` fan. |
| 6 | Safari-26+ dual-engine paint | **PASS** | WebKit / Apple GPU renders the fan for both routes in both modes (rail L+D, lp horiz-L, lp vert-D captured + viewed). |
| 7 | ≥2 consumers at birth — SidebarDock + BottomDock (shell chrome on any route) + liquid-playground + /dock/rail | **FAIL** | `SidebarDock.vue` + `BottomDock.vue` mount **no** `<DockStack>` (tag only in comments; `BD.W-DOCK-CORE (A1)` removed the shell carousel, BG did not restore it). Only rail.vue:250 + liquid-playground.vue:820/867 render it. The fold (`fold-dock.md:69,106-107`) explicitly names the two shell docks. **Undelivered.** |
| + | one-border-grammar (16.1 progress hairline + rail hairline = one voice) | **UNVERIFIABLE / subsumed** | The two hairlines never co-occur: the shell docks carry the BorderProgress scroll ring but **no rail hairline** (criterion 7); the story docks carry the rail hairline but no scroll ring. The "sibling whispers on the SidebarDock" coherence (fold-dock.md:114,163) cannot be read because the rail is absent from the shell. |

---

## defectLocalization

- **`demo/layout/SidebarDock.vue`** (~line 386) — the `<GlassDock>` `#rail` slot renders NO `<DockStack>`; the block is a `BD.W-DOCK-CORE (A1)` removal comment. The reinvented (contained, box-inviolate) rail was not restored to the persistent shell chrome.
- **`demo/layout/BottomDock.vue`** (~line 374) — same: `#rail` DockStack removed at BD, not restored.
- **`demo/shell/useShellNavDock.ts`** — still computes `railItems: DockStackItem[]`, but no shell template consumes it into a `<DockStack mode="facets" :items="railItems">`. The DRY seam exists; the render binding is missing.
- **`demo/stories/dock/rail.vue`:250 · `demo/stories/dock/liquid-playground.vue`:820,867** — the ONLY live `<DockStack>` consumers; both render below the default fold (rail stack owning-dock at y≈2086; lp facet docks at y≈1484/1793). No demo passes `wrap`.
- **`src/styles/dock/stack-rail.css`:312 (`.dock-stack-fan[data-wrap]`)** — the `wrap` display-option is defined but reaches no rendered instance.

The rail's core engine (`src/components/custom/dock/DockStack.vue`, `src/styles/dock/stack-rail.css`, `railProjection.ts`) is **correct and un-owned by this defect** — the topology, hairline, φ² overhang, box-inviolate escape, and compositor fan all paint right. The defect is CONSUMER WIRING (shell) + DEMO COVERAGE (wrap), not the primitive.

## mustFix

1. **Restore the reinvented rail to the two shell docks.** Wire `<DockStack>` into `SidebarDock.vue` + `BottomDock.vue`'s `#rail` slot (consuming `useShellNavDock`'s `railItems`) so the contained hairline rail is **persistent shell chrome on any route** (fold-dock.md:69,106-107). The new topology is contained + box-INVIOLATE, so it does not re-introduce the `BD.W-DOCK-CORE (A1)` collision that removed the old broken carousel — that is the whole point of the reinvent. Re-earn the box-equality + containment π on the SHELL docks (both engines, both modes).
2. **Paint the `wrap` axis.** Add a `<DockStack wrap :visible-count="N">` instance to a demo (rail.vue or liquid-playground.vue) with a >visibleCount member set so the second-rank wrap renders (criterion 4 "both painted"). Capture it.
3. **Re-earn the one-border-grammar read** once the rail is in the shell: on the expanded vertical SidebarDock, the BG.16.1 scroll-progress hairline (leading edge) and this rail hairline must read as one voice / no competing line weights (fold-dock.md:114,163-164).

---

## Capture inventory (all 32 PNGs resolve on disk, non-zero, 2880×1800 @ dsf 2)

**Chrome (CDP, ANGLE Metal / Apple M5 Max):**
- Full viewport: `rail-chrome-{rail,liquid-playground}-{light,dark}.png`
- Rail route (scrolled to stack): `rail-chrome-rail-{light,dark}-s0-{rest,fanned}.png`
- Liquid-playground (scrolled): `rail-chrome-liquid-playground-{light,dark}-s{0,1}-{rest,fanned}.png`

**Safari (WKWebView, system WebKit / Apple GPU):**
- Top viewport (page health): `rail-safari-{rail,liquid-playground}-{light,dark}-top.png`
- Rail fan: `rail-safari-rail-{light,dark}-fanned.png`
- Liquid-playground facets fan: `rail-safari-lp-{light,dark}-s{0,1}-fanned.png`

**Probes:** `interaction-probe.json` (box-inviolate + member-union), `scroll-cap.json` (fan-port overhang + box-inviolate), `chrome-cap.mjs` / `rail-interaction-probe.mjs` / `rail-scroll-cap.mjs` / `wkshot-rail.m` (+ compiled `wkshot-rail`).

**Provenance badges decoded:** Chrome legs → `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`. Safari legs → `ENGINE WEBKIT · GPU Apple GPU`. Modes light + dark confirmed per badge.

---

## Notes on what is RIGHT (credit to the build)

The reinvent's hard part is done and dual-engine-clean: at rest the members fold away (opacity 0, tucked inward) leaving only the 1.5px warm-ink hairline; on hover/focus they spring out past the dock edge into the gutter (right for a vertical dock, up for a horizontal dock), the dock box never moving a pixel (dW=dH=0), the outward reach ~φ² of the inward reach, on the `--spring-dock` clock with per-member stagger and a PRM snap. Both Chrome (Metal) and Safari (WebKit/Metal) paint it identically. The FAIL is narrow: the rail is not wired into the persistent shell docks the user named, and the `wrap` option is not demonstrated.
