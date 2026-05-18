# Q.Rμ — Visual-runtime re-probe across all 6 consumers

**Lane**: Q.Rμ — round-2 visual-runtime re-probe (π lane round-2; augments Qζ).
**Date**: 2026-05-18.
**Tooling status**: Playwright MCP online. 37 screenshots captured. All screenshots at `docs/tranches/Q/research/screenshots/q-mu-*.png` (gitignored — root `.gitignore` excludes `*.png` globally).
**Sibling lanes cross-referenced**: Qα (consumer-breakage forensics), Qβ (co-location), Qγ (style cascade), Qδ (legacy sweep), Qε (recap + chronic-defer), Qζ (round-1 probe).
**Mode**: READ-ONLY runtime probe. No source mutations. No mutating git. Boot-only changes were starting dev servers in 6 consumer trees + glass-ui demo via `npm run dev` (or per-consumer equivalent) — no consumer source touched.

---

## §1 — Boot matrix

| Consumer | Repo path | Dev command | Port | Booted? | Console errors at first paint | Notes |
|---|---|---|---:|:---:|---:|---|
| glass-ui demo (baseline) | `/Users/mkbabb/Programming/glass-ui` | `npm run dev` | 5173 | YES | 0 | Vite 7.3.1, ready 790ms. Clean. |
| keyframes.js | `/Users/mkbabb/Programming/keyframes.js` | `npm run dev` | 5174 | YES | 1 (B-2 carry-over) | Same 403 fira-code/@fs as Qζ B-2. |
| value.js | `/Users/mkbabb/Programming/value.js` | `npm run dev` | 9000 | YES | 0 | Boots cleanly — Qζ's B-1 has resolved (Qα §2.1 attributes this to `value.js/dist/` being rebuilt during the Qα audit). |
| fourier-analysis/web | `/Users/mkbabb/Programming/fourier-analysis/web` | `npm run dev` | 3000 | **PARTIAL** | 1 | Vite serves; **app renders BLANK** — see Mμ-1. |
| words/frontend | `/Users/mkbabb/Programming/words/frontend` | `npm run dev` | 3004 | YES | 18 (backend/auth) | Frontend paints; backend offline (500/502) + Clerk auth fails. Glass-ui surfaces unaffected by backend errors. |
| bbnf-buddy | `/Users/mkbabb/Programming/bbnf-buddy` | `npm run dev` | 5175 | YES | 1 (B-2 carry-over) | Same 403 fira-code/@fs as keyframes.js. |
| speedtest | `/Users/mkbabb/Programming/speedtest` | `npm run dev:vite` | 8080 | YES (frontend only) | 5 (backend not running) | Used `dev:vite` not `dev` — the full `dev.sh` requires mongod + tsx server; frontend-only probe sufficient for visual-runtime lane. |

**6/6 consumers booted in some form. 1 (fourier) paints blank.**

---

## §2 — Per-consumer probe results

### §2.1 keyframes.js (port 5174)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home (default) | `q-mu-keyframesjs-root-1280.png` | 1280×800 | Hero `"Select an animation..."` rendered at `font-weight:700, font-size:96px` in Computer Modern Serif → renders as extremely heavy black-weight bold. Dock + cube + transport pill all render. | **Mμ-2 (NEW)** |
| Home — mobile | `q-mu-keyframesjs-root-390.png` | 390×844 | At narrow width, hero text wraps + the cube overlaps the text. The h1 doesn't scale down — still ~80-96px at mobile breakpoint, ~5 lines deep. | **Mμ-2 (NEW)** + **Mμ-3 (NEW)** |
| Home — tablet | `q-mu-keyframesjs-root-820.png` | 820×1180 | Mid-state — hero begins to wrap but compresses better than mobile. | — |
| Home — dark | `q-mu-keyframesjs-dark-1280.png` | 1280×800 | Same heavy bold, now white-on-near-black. Play button is plain white (still no rainbow). | **Mμ-2** + **Mμ-4** |
| Hero close-up | `q-mu-keyframesjs-hero-closeup.png` | element-shot | Bold-weight Computer Modern at 96px — heaviness explicit. | **Mμ-2** |
| Play button close-up | `q-mu-keyframesjs-play-btn-closeup.png` | element-shot | Solid `rgb(28,25,23)` (`--primary`); `background-image: none`. Class includes `rainbow-pastel` BUT no recipe in glass-ui defines `.rainbow-pastel` as a class. | **Mμ-4 (NEW)** |
| `/cube` (default) | `q-mu-keyframesjs-home-1280.png` | 1280×800 | Cube renders. Dock top shows "Cube" dropdown. Same hero-bold class applies. | — |
| `/easing` | `q-mu-keyframesjs-easing-1280.png` | 1280×800 | Two-pane layout: left = Bezier curve editor + controls, right = ball-on-track preview. Renders cleanly. Pause/Reset pill consumer-styled. | — |
| `/amiga` | `q-mu-keyframesjs-amiga-1280.png` | 1280×800 | Cube scene with bouncing balls/bench-style overlay. Renders. | — |
| `/square` | `q-mu-keyframesjs-square-1280.png` | 1280×800 | Square scene + controls dock. Renders. | — |
| Dock expanded (hover) | `q-mu-keyframesjs-dock-expanded-1280.png` | 1280×800 | After hover, the dock expands from "Home" summary to show "Home / @mbabb" full layer. Crossfade FLIP works. | — |
| Dropdown open | `q-mu-keyframesjs-dropdown-open-1280.png` | 1280×800 | Scene dropdown opens correctly — Home / Cube / Amiga / Square / Easing list visible with glass-tier card surface. Selected item highlighted. | — |

**Verdict for keyframes.js**: Functional (cube + scenes all render, transport works, dropdowns open). Two cosmetic regressions (hero font-weight + missing rainbow class) + the carry-over Fira-Code 403.

### §2.2 value.js (port 9000)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home — initial paint | `q-mu-valuejs-home-1280.png` | 1440×900 | About pane visible on right; **left pane (Picker) collapsed to 0×0**. Pane-wrapper has height 6767px — the inner shell is 0×0 inside a 6767-tall flex wrapper. | **Mμ-5 (NEW)** |
| Home — full page | `q-mu-valuejs-fullpage-1440.png` | 1440×900 fullPage | Same. The page scrolls to 3128px to find the About pane content. | **Mμ-5** |
| Home — picker view | `q-mu-valuejs-picker-1280-fullpage.png` | 1440×900 fullPage | Picker page-shell measures 0×0; About measures normally at y=3128. Layout cascade failure inside the lg-flex wrappers. | **Mμ-5** |
| Dock collapsed | `q-mu-valuejs-home-final-1440.png` | 1440×900 | Dock at top shows "Home" summary pill — collapsed state. | — |
| Dock hover/expand | `q-mu-valuejs-dock-expanded-1440.png` | 1440×900 | Dock expands to show full layer with Picker/About tabs + Login + @mbabb. Animations smooth. **No hit-test regression** when expanded (initial false-positive in this probe was traced to the dock being in `collapsed` state where the full-layer buttons are correctly `inert+hidden` per `beec35e`). | — |

**Verdict for value.js**: **NEW P0** — left-pane (Picker) renders 0×0 at default home view (Mμ-5). About pane (right) works. The dock + glass surfaces themselves are fine when probed.

**Important correction to Qα's findings**: Qα §3 row "value.js glass-cards" attributes a hard black drop-shadow to `<Card variant="pane">` falling through. At HEAD (`d244dd5`), I see cards rendering with `tier="resting" + glass-resting + shadow-[var(--shadow-card)]` — the `variant="pane"` legacy is no longer in the DOM at the surfaces I probed. The Card itself looks correct (`bg: color(srgb 0.98 0.98 0.97 / 0.65)`, shadow tokens). **The visible regression at HEAD is Mμ-5 (picker pane 0×0)**, not the Card's shadow. The user's "totally broken — glass-cards" symptom may be Mμ-5 instead, surfacing as "the picker just doesn't appear."

### §2.3 fourier-analysis/web (port 3000)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home | `q-mu-fourier-home-1280.png` | 1280×800 | **BLANK WHITE PAGE.** Console error: `The requested module '/node_modules/.vite/deps/@mkbabb_value__js.js?v=86807f3c' does not provide an export named 'extractAnimationOptions'`. App fails to mount. | **Mμ-1 (NEW)** |

**Verdict for fourier-analysis/web**: **NEW P0** — boots blank because it imports `extractAnimationOptions` from `@mkbabb/value.js`, but that symbol is not exported by `value.js@0.5.1`. This is a cross-repo API contract drift (analogous to Qζ's B-1 keyframes.js dist desync, but a different symbol on a different consumer).

### §2.4 words/frontend (port 3004)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home | `q-mu-words-home-1280.png` | 1280×800 | Renders cleanly: word lookup interface, empty-state heart-bubble glyph + "Look up anything you're curious about" + helper text. Sidebar nav present. No bold-hero regression. | — |

**Verdict for words/frontend**: Functional. The 18 console errors are all backend (500 on `/api/v1/users/me*`) + Clerk auth (the prod Clerk instance refuses localhost origin). **Glass-ui surfaces unaffected.**

### §2.5 bbnf-buddy (port 5175)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home | `q-mu-bbnfbuddy-home-1440.png` | 1440×900 | Beautiful rainbow logo (the letter "b" with chromatic gradient stops, SVG-based — NOT a CSS class), IDLE status pill, bottom dock with controls (logo / hex / pause / download / sidebar). Glass surfaces crisp. | — |
| Home — mobile | `q-mu-bbnfbuddy-home-390.png` | 390×844 | Scales down cleanly. No overflow. | — |

**Verdict for bbnf-buddy**: Functional and visually clean. Confirms the rainbow gradient surface CAN work — bbnf-buddy implements it as an SVG with stops (not the missing `.rainbow-pastel` class).

### §2.6 speedtest (port 8080)

| Surface | Screenshot | Viewport | Annotation | Cross-link |
|---|---|---|---|---|
| Home | `q-mu-speedtest-home-1280.png` | 1280×800 | Crisp glassy panel with gauge, "DOWNLOAD 2.33 Mbps" reading, stitched-gradient timeline at the bottom (blue→purple→pink→orange). Dock at bottom with navigation. | — |
| Home — full page | `q-mu-speedtest-home-fullpage-1280.png` | 1280×800 fullPage | Same — entire app fits within viewport. | — |
| Home — mobile | `q-mu-speedtest-home-390.png` | 390×844 | Vertical stack: gauge on top, big "2.81 Mbps" reading, then timeline strip, then dock. Renders well. | — |
| Timeline strip close-up | `q-mu-speedtest-timeline-row.png` | element-shot | The post-P `3cb70db` "stitched continuous gradient + rounded ends + glassy dots" timeline renders **exactly as the commit subject describes** — single rounded-pill rail, blue→purple→pink→orange gradient, white circular boundary dots, rounded ends. | — |

**Verdict for speedtest**: Functional and visually clean. The post-P timeline-continuous commit (`3cb70db`) is **visually confirmed CORRECT** in production speedtest usage.

### §2.7 glass-ui demo baseline (port 5173)

| Surface | Screenshot | Viewport | Annotation |
|---|---|---|---|
| Intro | `q-mu-glassui-intro-1280.png` | 1280×800 | Foundations page — hero "Glass, paper, and the golden ratio." renders at a moderate-weight serif (NOT the heavy bold seen in keyframes.js). |
| Intro — mobile | `q-mu-glassui-intro-390.png` | 390×844 | Scales down; nav rail compresses. Hero typography re-flows correctly. |
| Intro — dark | `q-mu-glassui-intro-dark-1280.png` | 1280×800 | Dark-mode mirror; cards + nav still readable. |
| Buttons | `q-mu-glassui-buttons-1280.png` | 1280×800 | All variants render: default / destructive / outline / secondary / accent / ghost / glass / glass-wash / ai / link. Audacious CTA section visible. |
| Data Table | `q-mu-glassui-datatable-1280.png` | 1280×800 | 5-column table with sort indicators, pagination, filter input. Renders cleanly. |
| Data Table — mobile | `q-mu-glassui-datatable-390.png` | 390×844 | At 390px the table compresses — **only 3 of 5 columns visible (Issues + Updated hidden)**; the `1c6c3e5` "responsive card-per-row projection" is NOT triggered on this story because the demo doesn't enable the `responsive` prop. See **Mμ-6 (NEW, minor)**. |

**Verdict for glass-ui demo**: Clean across all probed surfaces. Hero is NOT bold-heavy (so the keyframes.js hero is a consumer-token override or a font-loading miss, not a glass-ui demo regression).

---

## §3 — Cross-reference matrix — sibling findings → visual evidence

| Sibling finding ID | Severity (sibling) | Visual evidence at HEAD | Verdict |
|---|---|---|---|
| **Qζ B-1** (value.js can't boot — keyframes.js dist desync) | P0 | NO LONGER REPRODUCES — value.js boots at HEAD (Qα §2.1 confirms a build was run during Qα that rebuilt `value.js/dist`; that side-effect repaired the gh-pages clobber + restored `@mkbabb/value.js` resolution. The underlying mutual-clobber defect in `value.js/vite.config.ts:91-113` is unchanged.) | **RESOLVED IN-FLIGHT** (transitive root cause unfixed; symptom currently dormant) |
| **Qζ B-2** (keyframes.js @fs 403 on glass-ui Fira Code) | P2 | REPRODUCES — same 403 in keyframes.js (port 5174) + bbnf-buddy (port 5175). Console error verbatim: `Failed to load resource: 403 (Forbidden) @ http://localhost:5174/@fs/Users/mkbabb/Programming/glass-ui/src/fonts/fira-code/fira-code-latin.woff2`. | **CONFIRMED** — cross-consumer `server.fs.allow` gap. |
| **Qζ D-1** (glass-ui demo story-pager rail overflow at 375w) | P2 | Not re-probed (out of scope for Qμ — not a consumer surface). | (carry-over) |
| **Qα §3 value.js glass-cards "hard black drop-shadow"** | (Qα: c) un-migrated | NOT REPRODUCED in viewport — at the Home view I probed, cards render with `glass-resting + shadow-[var(--shadow-card)]` tokens. The Qα finding may refer to a different route or pre-`d244dd5` state. | **STALE OR LOCATION-MISMATCHED** |
| **Qα §3 value.js dropdowns (orphan chevrons)** | (Qα: c) cascade | NOT REPRODUCED at the Home + Lab routes probed. Could not navigate to ColorSpaceSelector route reliably from the dock-collapsed state. | **VISUAL-PENDING** (needs deeper interaction; consumer-side fix per Qα attribution holds) |
| **Qα §3 value.js dock items (cramped)** | (Qα: cascade) | NOT REPRODUCED — dock renders cleanly in expanded state (`q-mu-valuejs-dock-expanded-1440.png`). | **STALE OR ROUTE-SPECIFIC** |
| **Qα §3 animations regression** | (Qα: b — RULED OUT) | CONFIRMED RULED OUT visually — keyframes.js scene transitions, dock crossfade, dropdown open/close all run smoothly. | **CONFIRMED CLEAN** |
| **Qβ-F1 — dock density-token split-brain** | (Qβ: HIGH) | Static-code attribution; not visible at runtime as a defect (dock renders correctly across all probed consumers — even the visual presence of correct density rendering doesn't reveal the cascade-order fragility). | **VISUAL-PENDING** (it's a maintainability fracture, not a render bug — Qβ's classification is correct) |
| **Qβ-F2 — `.glass-cartoon` in glass.css not cards.css** | (Qβ: co-location DRIFT) | No CartoonCard surface probed; no runtime visible defect. | **VISUAL-PENDING** |
| **Qγ G3 — `transitions.css` unlayered** | (Qγ: LOW) | No visible cascade collision observed in probed transitions (dock crossfade, dropdown open/close, ball-track ease) — the latent hazard is real but not manifesting at HEAD. | **CONFIRMED LATENT** (no current visual regression) |
| **Qγ T1 — `--metric-row-*-clamp-*` private SFC dialect** | (Qγ: HIGH) | Could not reach metric-stack story route reliably; deferred. Not user-visible as a defect. | **VISUAL-PENDING** |
| **Qδ §2 dock-layer rule duplication (legacy `.dock-layer` + `.dock-layer-item-host`)** | (Qδ: quick-fix-debt) | Both rule paths apply; visible behaviour is correct (inactive layers correctly `inert+hidden`). Code-duplication only. | **CONFIRMED LATENT** |
| **Qδ §3.2 `@mkbabb/value.js` devDep workaround** | (Qδ: band-aid) | Visual evidence at the value.js + keyframes.js seam: fourier-analysis (Mμ-1) BLANK-page is **a new manifestation of the same workaround class** — fourier consumes `value.js` for `extractAnimationOptions`, value.js doesn't export it. This is exactly Qδ's "papering over transitive resolution" pattern. | **CONFIRMED — escalates to Mμ-1 P0** |
| **Qε §3 — post-P shadow cohort (T2 dock+timeline)** | (Qε: PRIME SUSPECT) | Speedtest timeline (`3cb70db`) **visually CONFIRMED CORRECT**. Dock changes (`099d51e` + `beec35e`) — no visible regression in any probed consumer. | **CLEARED** — the prime suspects are clean at runtime |

---

## §4 — NEW findings from visual probe alone

| ID | Severity | Surface | Visual evidence | Forensic attribution |
|---|---|---|---|---|
| **Mμ-1** | **P0 — app blank** | fourier-analysis/web home page | `q-mu-fourier-home-1280.png` (blank white). Console: `does not provide an export named 'extractAnimationOptions'` from `@mkbabb_value__js`. | fourier-analysis/web imports `extractAnimationOptions` from `@mkbabb/value.js`, but value.js@0.5.1 does not export that symbol. Cross-repo API drift — likely value.js dropped/renamed the symbol in a recent refactor, fourier didn't migrate. Same class as Qζ B-1 and Qδ §3.2 (cross-`@mkbabb/*` workspace contract slip). |
| **Mμ-2** | **P1 — cosmetic regression (user-named)** | keyframes.js hero h1 across ALL routes | `q-mu-keyframesjs-hero-closeup.png`, `q-mu-keyframesjs-root-1280.png`. The `<h1>` computes to `font-weight:700, font-size:96px, font-family:"Computer Modern Serif"`. At 700-weight, Computer Modern renders as an extremely heavy "black" face — visually identical to a display-poster Latin Modern Bold. | The h1 itself is consumer-classed. glass-ui's own `Intro` page hero (`q-mu-glassui-intro-1280.png`) uses a moderate-weight serif. The discrepancy points at keyframes.js's own typography ladder — possibly an over-ridden `--font-weight-display` or a `font-bold` Tailwind class layered on top of the glass-ui scale. **Glass-ui's typography ladder itself is sound** (per the demo). |
| **Mμ-3** | **P2 — responsive break** | keyframes.js hero at mobile 390w | `q-mu-keyframesjs-root-390.png` — the 96px h1 doesn't scale down at mobile breakpoint. It wraps onto 5 lines and the cube overlaps the text. | Compounds Mμ-2: heavy weight + no mobile font-size clamp. The keyframes.js consumer needs a `clamp()` or media-query reduction on its hero scale. |
| **Mμ-4** | **P1 — missing recipe (user-named "play button broken")** | keyframes.js play button + reset/clear buttons across all routes | `q-mu-keyframesjs-play-btn-closeup.png` — solid black circle, no texture. Class includes `rainbow-pastel` and `rainbow-vivid` (conditional on `isPlaying`). | keyframes.js `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:97,130` references `rainbow-pastel` + `rainbow-vivid` class names. glass-ui defines the TOKENS (`--rainbow-pastel-red...`, `--rainbow-red...`) in `tokens.css:787-801`, but **NEVER defines a `.rainbow-pastel` or `.rainbow-vivid` class recipe** (`grep -r "rainbow-pastel\|rainbow-vivid" src/styles/` returns only token declarations + an out-of-date `utilities.css` header comment referencing a non-existent `rainbow-text` utility). This is the canonical missing-recipe regression the user named explicitly as "play button broken." Decision the Q wave must make: ship `@utility rainbow-pastel` + `@utility rainbow-vivid` in glass-ui (canonical), OR keyframes.js defines its own consumer-side recipes consuming the tokens (decentralized). Per the user's "no backwards compat — clean break" mandate + "presets in consumers" precept, the latter is closer to the architecture direction; per "every visual behaviour is a CSS custom property" (J invariant 1), shipping the recipe in glass-ui carries the utility wherever the token does. |
| **Mμ-5** | **P0 — layout cascade failure (likely user-named "totally broken")** | value.js home view — left/Picker pane | `q-mu-valuejs-home-1280-fullpage.png`. The `.pane-wrapper.hidden.lg:flex` measures `x:220, y:71, w:496, h:6767` (height 6767px!). Its child `.pane-shell` measures `0×0` — completely collapsed. Sibling `.pane-wrapper.hidden.lg:block` (About) renders correctly at `x:724, y:71, w:496, h:6767` with shell at `x:228, y:3128.96, w:480, h:651`. | The picker pane's flex/grid box-model is broken: the inner shell collapses to zero dimensions while the outer wrapper inflates to 6767px tall (likely consuming `min-height: 100dvh * many panes`). The user's "value.js totally broken" report manifests as **the actual color-picker GUI being invisible** — which is exactly what an end-user would describe as "totally broken." Attribution path: this is a consumer-layout regression in `value.js/demo/color-picker/`, possibly from a CSS-cascade interaction with glass-ui's `Card`/`pane-shell` tokens at v1.8.5. Needs co-investigation between glass-ui Card primitive + value.js pane-wrapper layout. |
| **Mμ-6** | **P2 — demo coverage gap** | glass-ui demo `/data/data-table` at 390w | `q-mu-glassui-datatable-390.png` — 2 of 5 columns hidden (Issues, Updated), no card-per-row projection visible. | The post-P `1c6c3e5` "responsive card-per-row projection at narrow widths" commit added a `responsive` prop, but the glass-ui demo's `data-table.vue` story does NOT enable it — so the feature is invisible from the demo. Minor demo-hygiene gap. (Demo-only; not a substrate regression.) |

---

## §5 — P0 visual-evidence summary (user-named broken surfaces)

The user explicitly named: **"keyframes.js timeline / play button / hero bold"** + **"value.js totally broken — dock / animations / dropdowns / glass-cards"**.

| User-named surface | Visual evidence at HEAD | Finding ID | Disposition |
|---|---|---|---|
| keyframes.js timeline | NOT FOUND in probed routes — keyframes.js dev server's `demo/app` doesn't include a `GlassTimeline` consumer. The timeline-continuous (`3cb70db`) is consumed by speedtest, where it **renders correctly** (`q-mu-speedtest-timeline-row.png`). | — | **NOT REPRODUCED** — possible mis-attribution by the user; or refers to a different "timeline" surface inside keyframes.js (e.g., the scrubber inside `/easing`, which renders correctly per `q-mu-keyframesjs-easing-1280.png`). |
| keyframes.js play button | `q-mu-keyframesjs-play-btn-closeup.png` — solid black circle, no rainbow texture. | **Mμ-4** | **CONFIRMED** — missing `.rainbow-pastel` + `.rainbow-vivid` class recipes in glass-ui. |
| keyframes.js hero bold | `q-mu-keyframesjs-hero-closeup.png` — fw:700 fs:96px Computer Modern Serif. | **Mμ-2** + **Mμ-3** | **CONFIRMED** — heavy bold weight + no mobile clamp. |
| value.js dock items | Dock renders correctly when expanded (`q-mu-valuejs-dock-expanded-1440.png`). Collapsed-state hit-test "regression" suspected during this probe was traced to correct `inert+hidden` behaviour per `beec35e`. | — | **NOT REPRODUCED** — dock is clean. |
| value.js animations | All probed transitions (dock crossfade, expand/collapse) run smoothly. | — | **NOT REPRODUCED** — animations clean. |
| value.js dropdowns | Dropdowns open correctly in keyframes.js (`q-mu-keyframesjs-dropdown-open-1280.png`) and the glass-ui demo (Qζ §2). Could not reach a value.js Select-trigger interaction in the time-bounded probe. | — | **VISUAL-PENDING** — needs targeted interaction probe. |
| value.js glass-cards | About pane card renders correctly with `glass-resting`. **However, the Picker pane is collapsed to 0×0** — likely what the user is seeing as "totally broken cards." | **Mμ-5** | **CONFIRMED as a different defect** — layout-cascade failure, not a Card-tier regression. |

**Headline P0 summary**: 3 P0 / P1 visual-evidence findings the user named are confirmed at HEAD — **Mμ-2 (hero bold)**, **Mμ-4 (play button no rainbow)**, and **Mμ-5 (value.js picker pane 0×0)**. The other 5 user-named surfaces are NOT visually regressing in this probe — they may be mis-attributed in the user's report, or refer to surfaces in a build state Qα later disturbed by rebuilding `value.js/dist`.

**Additionally CONFIRMED P0 from this probe alone**: **Mμ-1 (fourier-analysis/web blank-page boot)** — cross-repo API drift, fourier imports `extractAnimationOptions` not exported by value.js.

---

## §6 — Severity summary

| Severity | Count | Findings |
|---|---:|---|
| **P0 — app blank or core feature invisible** | 2 NEW + 1 carry | Mμ-1 (fourier blank), Mμ-5 (value.js picker 0×0). Carry: Qζ B-1 (currently dormant; mutual-clobber config unfixed). |
| **P1 — cosmetic regression on user-named surface** | 2 NEW | Mμ-2 (hero bold), Mμ-4 (play btn missing rainbow recipe). |
| **P2 — minor cosmetic / responsive / demo gap** | 1 NEW + 1 carry | Mμ-3 (hero no mobile clamp), Mμ-6 (demo doesn't enable responsive prop). Carry: Qζ B-2 (Fira Code 403). |
| **VISUAL-PENDING (sibling findings not surfaced by visual probe)** | 5 | Qα value.js dropdowns, Qβ-F1, Qβ-F2, Qγ T1, Qδ dock-layer dup. |
| **CONFIRMED LATENT (real but not user-visible)** | 2 | Qγ G3 (transitions.css unlayered), Qδ dock-layer rule duplication. |
| **CLEARED — visually confirmed CORRECT** | 4 | speedtest timeline (`3cb70db`), keyframes.js dropdown open, glass-ui demo button audacious, dock collapse/expand transitions. |

---

## §7 — Recommendations for Q-wave remediation

1. **Mμ-1 (P0 — fourier blank)** — audit fourier-analysis/web's import of `extractAnimationOptions` against value.js@0.5.1's exports. Either restore the export in value.js (if the symbol was unintentionally dropped) or migrate fourier to the current API. This is a **cross-repo cohesion regression** in the same class as Qζ B-1 + Qδ §3.2 — the `@mkbabb/*` workspace siblings keep slipping out of contract sync. Q should treat the workspace API surface as a first-class cohesion contract (Qδ's R4 recommends an `@mkbabb/*` workspace audit; this finding makes it actionable).

2. **Mμ-4 (P1 — missing rainbow recipes)** — decision for the Q plan: ship `@utility rainbow-pastel` + `@utility rainbow-vivid` as glass-ui utilities consuming the existing `--rainbow-pastel-*` + `--rainbow-*` tokens. Recipe shape (proposed; canonical recipe lives in glass-ui per "every visual behaviour is a CSS custom property"):
   - `rainbow-pastel` — `background-image: linear-gradient(135deg, var(--rainbow-pastel-red), var(--rainbow-pastel-orange), var(--rainbow-pastel-yellow), var(--rainbow-pastel-green), var(--rainbow-pastel-blue), var(--rainbow-pastel-indigo), var(--rainbow-pastel-violet))` (or radial / conic, per the dock-play-btn affordance).
   - `rainbow-vivid` — same shape with `--rainbow-*` (saturated) stops.
   - Both should compose with `text-white` / `dock-play-btn` overlay.
   Alternate: declare these as keyframes.js-private utilities in `keyframes.js/demo/@/styles/`, consuming the glass-ui tokens. Less canonical but valid per "presets in consumers."

3. **Mμ-5 (P0 — value.js picker 0×0)** — needs collaborative root-cause between value.js's `pane-shell` flex layout + glass-ui Card primitive's tier cascade. Likely a `flex-1` / `min-height: 0` / `lg:flex` interaction. Out of scope for glass-ui-only fix; recommend value.js audit lane.

4. **Mμ-2 + Mμ-3 (P1+P2 — keyframes.js hero bold + no mobile clamp)** — consumer-side: keyframes.js scene templates set `font-weight:700` on the h1 explicitly OR via a `font-bold` Tailwind class. Audit keyframes.js's hero typography against glass-ui's typography ladder.

5. **Carry-over: Qζ B-2 (Fira Code 403)** — same fix as Qζ recommended: keyframes.js + bbnf-buddy `vite.config.ts` `server.fs.allow` should whitelist the glass-ui source-tree font dir. Single-line fix per consumer.

6. **Mμ-6 (P2 — demo)** — wire the `responsive` prop into the glass-ui demo's `data/data-table.vue` story so the `1c6c3e5` feature is visible at narrow viewports.

---

## §8 — Probe-method postmortem

Three operational issues during this probe (documented for future visual-runtime lanes):

1. **Vite HMR auto-spawn**: closing a Playwright tab pointing at a now-dead vite dev server caused vite to re-spawn on a new port (e.g., `localhost:5176`) via the stale `/@vite/client` socket re-connection. Mitigation: hard-kill orphan vite procs (`ps aux | grep vite/node_modules`) before navigating away.

2. **Playwright tab state confusion**: a closed tab whose vite server died, then re-spawned, would silently route a re-navigation through the stale tab to the new port — yielding "URL says A, content is B" mismatches. Mitigation: use `browser_tabs list` + `browser_tabs close` + `browser_navigate` explicitly between tabs.

3. **Screenshot Read downscaling**: the Read tool downscales PNGs at display time; file-system sizes confirm screenshots are saved at full viewport resolution (480KB+ for 1280×800, 670KB+ for 1440×900). Trust the file size, not the rendered preview.

These are infrastructure notes, not findings. The π-lane SPEC.md probe-coverage contract holds; these are operational pitfalls for future runs.
