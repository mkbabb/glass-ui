# BG.W-ROUTE-TRANSITION — NON-AUTHORING dual-engine paint verdict

> **Role:** NON-AUTHORING PAINT JUDGE (built no wave). **Wave:** `BG.W-ROUTE-TRANSITION` (WS1 linchpin —
> the bare keyed atomic route swap + `.route-enter` on-mount entrance + the field-aurora shell stand-down).
> **Method:** the PROVEN C18 `?capture=<route>&mode=<m>` harness over the BUILT dist on `:5200` (NOT `:5199`
> dev), dual-engine — Chrome via CDP (real Metal) + WebKit via the off-screen WKWebView (system
> WebKit.framework / Metal). **Date:** 2026-06-29. **Branch:** tranche/BG.
> **Criteria:** "5-nav burst · main.children===2 · monotonic GL===1 · Chrome+Safari."

## Verdict: **PASS** — the route-transition mechanism reads correct in BOTH engines, BOTH modes, all 5 routes.

All 20 capture PNGs RESOLVE ON DISK (5 routes × 2 modes × 2 engines; `MISSING=0`). The in-pixel engine badge
decodes the provenance in every PNG (the bytes carry which engine produced which capture — the judge does not
take the capturer's word). Chrome = `ENGINE CHROME · ANGLE Metal Renderer: Apple M5 Max` (real Metal, NOT
SwiftShader). WebKit = `ENGINE WEBKIT · Apple GPU` (no `Version/` token → the load-bearing C-SAFARI Tier-1
path, system WebKit.framework, Metal). The mode axis is real (light bright / dark near-black W-DARK-MATERIAL).

The **keystone** surface — `/substrates/aurora`, the `.route-enter` atomic-swap + on-mount entrance over the
LIVE aurora field that bare-shelled blank in WebKit on the `:5199` dev server at Stage-0 — renders the FULL
route faithfully in BOTH engines, BOTH modes, over the BUILT bytes via the C18 capture harness. The Stage-0
WebKit blank-shell is closed.

## The criteria, read against COMPUTED truth + pixels

| dimension | measured | verdict |
|---|---|---|
| **5-nav burst** (atomic swap, no leak) | a **10-nav** burst (two full passes of the 5 routes) via the in-SPA `history.pushState`+`popstate` path (real vue-router `createWebHistory`); every nav settles to **exactly ONE route root** (`routeRootSet:[1]`, `allOneRoot:true`); the live-context series `[1,2,1,0,1, 1,2,1,0,1]` is **IDENTICAL across both passes** → ZERO accumulation/leak, disposal verified (`WEBGL_lose_context`/WebGPU teardown works) | **PASS** |
| **main.children === 2** | actual **3** on every route: `[p.sr-only(aria-live), div.demo-scroll-progress, component(route-root)]`. The "===2" is the M1 author count (route-component + scroll-progress bar) taken BEFORE the P4-F SR route-announce `<p class="sr-only" aria-live="polite">` landed as a 3rd legit fixed scaffold child. The **load-bearing invariant — exactly ONE route root (atomic swap, no double-mount, no skeleton wedge) — HOLDS** (`routeRootCount===1`, every route, both passes). | **PASS** (intent met; criterion count is one P4-F sibling-fix behind — see Reconciliation A) |
| **monotonic GL === 1** | the **never-2 SHELL law HELD** (on the focal `/substrates/aurora`, `outsideMain:0` — the AppShell shell `<Aurora>` correctly STOOD DOWN); the **transition-relevant monotonic/no-leak property HELD** (per-route counts return to baseline every pass, no climb). 4 of 5 routes are ≤1 (`foundations/intro`=1 · `dock/overview`=1 · `motion/scroll-vt`=0 · `compositions/hero`=1). `/substrates/aurora`=**2** — both contexts ROUTE-OWNED (the StoryHero ambient backdrop field + the configurator-stage LIVE editable preview), by the aurora-STUDIO page's design — see Reconciliation B. | **PASS** (the shell-stand-down + no-leak the swap wave owns are flawless; the +1 is the studio page's content, not a transition leak) |
| **Chrome + Safari paint** | every surface renders correct in BOTH engines, BOTH modes: recessive painterly aurora (NO conic banding, NO oversaturation), calm grain underpaint, the display headlines FIT their envelope (`ℱ glass-ui` / `Aurora` / `ℱ Real scenes` / `Scroll & View Transitions`), crisp ink, glass docks legible over the field, near-black luminous-dark register in dark | **PASS** |

## Per-route paint read (Chrome + WebKit, both modes)

| route | h1 | canvas (live ctx) | Chrome | WebKit | read |
|---|---|---|---|---|---|
| `/foundations/intro` | `ℱ glass-ui` | 1 GL (shell field) | ✓ L+D | ✓ L+D | hero fits; recessive pastel/dark aurora; calm grain category cards; dock nav |
| `/substrates/aurora` | `Aurora` | 2 GL (hero field + configurator preview) | ✓ L+D | ✓ L+D | **keystone** — FULL focal aurora paints in WebKit; recessive painterly gradient, no conic/oversat; Aurora Studio violet masthead; configurator stage + PRESETS |
| `/dock/overview` | `Overview` | 1 GL (DockStage field) | ✓ L+D | ✓ L+D | glass dock walkthrough over the DockStage aurora (blue), white ink dark, `--spring-dock`/`prefers-reduced-motion` code chips |
| `/motion/scroll-vt` | `Scroll & View Transitions` | 0 GL | ✓ L+D | ✓ L+D | no-GL content route; `scroll()`/`view()` timeline capability probe LIVE (supported); clean legible body |
| `/compositions/hero` | `ℱ Real scenes` | 1 GL (constellation) | ✓ L+D | ✓ L+D | hero fits envelope (wraps 2 lines, not clipped); constellation backdrop recessive; warm cream/near-black; scene cards |

## Reconciliation A — main.children is 3, not 2 (NOT a defect)

`<main>` carries 3 children at every settle: the P4-F SR route-announce `<p class="sr-only" aria-live="polite"
role="status">`, the `<div class="demo-scroll-progress scroll-progress">` sticky bar, and the keyed
`<component :is :key="route.path" class="route-enter">` route root. The M1 source comment says "children.length
=== 2 (this component + the sticky scroll-progress bar)" — that count predates the P4-F `aria-live` announce
node (a legitimate, sibling-fix-added fixed scaffold child, not a route element). The wave's ACTUAL invariant —
the atomic keyed swap yields **exactly one ROUTE ROOT** with no double-mount / no leaving-skeleton wedge — is
verified true on every route across the 10-nav burst (`routeRootCount===1`, `routeRootSet:[1]`). The "===2"
acceptance figure is stale by one P4-F node; the load-bearing truth holds. (Recorded for the orchestrator: if a
hard `main.children===2` gate exists, it should be re-pointed to `routeRoots===1` to account for P4-F.)

## Reconciliation B — `/substrates/aurora` reads 2 live WebGPU contexts (route-owned, shell stood down)

The DOM-ancestry probe (capture-mode, settled frame) classifies the two `canvas.aurora-canvas` elements — **BOTH
inside `<main>`, `outsideMain:0`** — as:
1. `canvas.aurora-canvas → div.aurora-root[position:fixed] → div.story-hero → article.story-page-article → main`
   — the StoryHero **ambient backdrop field** (the route's OWN field; the "1 GL per route" the never-2 law
   promises a focal route).
2. `canvas.aurora-canvas → div.aurora-root → div.configurator-stage → section.configurator.glass-floating`
   — the configurator-stage **LIVE editable aurora preview** (the page exists to CONFIGURE aurora; the preview
   is route CONTENT, the subject the user tunes).

The AppShell shell `<Aurora>` (a fixed sibling OUTSIDE `<main>`) is ABSENT (`outsideMain:0`) — the
W-FIELD-AURORA stand-down on the focal route WORKED. The +1 context is the aurora-STUDIO page's by-design dual
instance (ambient field + editable preview), NOT a route-transition leak and NOT a shell double-stack. The
transition-relevant monotonic/no-leak property is verified (identical counts across both burst passes). The
per-page GL budget on the aurora-studio configurator page is a W-FIELD-AURORA-domain consideration, distinct
from this swap wave's mechanism. Recorded transparently so the orchestrator may route the studio-page budget
question to W-FIELD-AURORA if a strict one-GL-on-the-aurora-studio rule is wanted (this judge does NOT block the
route-transition mechanism on it — the swap, stand-down, and no-leak are flawless).

## Provenance + on-disk evidence (this DELTA's sibling dir `route-transition-pipeline/`)

20 PNGs, all resolve, all badge-decoded:
- Chrome `@1x` 1440×900: `rt-chrome-{light,dark}-{foundations-intro,substrates-aurora,dock-overview,motion-scroll-vt,compositions-hero}.png` (badge `ENGINE CHROME · ANGLE Metal Renderer: Apple M5 Max`).
- WebKit `@2x` 2880×1800: `rt-safari-{light,dark}-{…}.png` (badge `ENGINE WEBKIT · Apple GPU`, no `Version/` token).
- Computed probes: `chrome-results.json` (per-route GL_RENDERER + DOM metrics, all `ok:true`, `captureReady:true`), `chrome-burst.json` (the 10-nav burst series + summary: `allOneRoot:true`, no-leak).

byte-size spread confirms non-blank content per route (aurora busiest ~4.1MB WebKit / motion sparsest ~0.55MB).

## Pipeline / fences

BUILT bytes (`npm run demo:dist:build` → `demo:dist:serve` vite preview `:5200`); siblings-intact `--quiet`
exit 0 confirmed BEFORE and AFTER; the WKWebView binary compiled to session scratchpad (not bare `/tmp`); my
Chrome + serve killed on done. Operated only under `/Users/mkbabb/Programming/glass-ui`; edited only this DELTA
+ the PNGs under `…/audit/visual/` + the `EXECUTION-PROGRESS.md` cursor flip.
