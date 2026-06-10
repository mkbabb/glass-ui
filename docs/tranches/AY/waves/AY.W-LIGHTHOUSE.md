# AY.W-LIGHTHOUSE — a `proof:lighthouse` score-floor gate + the LCP-asset/render-block fixes, measured against the production preview protocol

- **Tranche:** AY (glass-ui primary; the slides arm lands in tranche L)
- **State:** NET-NEW (spec authored) — **NOT yet implemented**. Minted 2026-06-09
  from the two Lighthouse design-audit lanes (`PERF-lighthouse-demo.md`,
  `PERF-lighthouse-slides.md`). No `proof:lighthouse` key exists at HEAD
  (`grep -nE 'lighthouse' package.json` → 0 matches; the only adjacent runtime gate is
  `proof:dock-animation-live`, an onset-timing gate, not a score-floor one).
- **Repo:** `/Users/mkbabb/Programming/glass-ui` (the demo SPA + the gate) + a routed
  arm in `/Users/mkbabb/Programming/slides` (the deck, tranche L — see §Cross-repo).
- **Audit inputs:**
  `docs/tranches/AY/audit/design/PERF-lighthouse-demo.md` (the 4-page × 2-form-factor
  demo sweep + the 16 saved reports under `audit/design/lighthouse/`),
  `docs/tranches/AY/audit/design/PERF-lighthouse-slides.md` (the til-briefing landing +
  Xray-deep-link sweep + the 8 saved reports `audit/design/lh-til-briefing-*`),
  `docs/tranches/AY/audit/design/PERF-bundle.md` (the payload story — the render-blocking
  CSS size + the value.js eager-leaf are the bundle-side root of the demo's render-block).
- **Sibling waves:** **W-A11Y-PERF** (the RUNTIME perf arm — rAF-coalesce + nested-backdrop
  budget + the W55 legibility floor; disjoint from this wave's LOAD/score arm — W-A11Y-PERF
  owns per-frame cost, W-LIGHTHOUSE owns first-paint/LCP/payload + the score-floor gate),
  **W-PUB1** (the publish HINGE — the `/styles` split decision interacts with the published
  bundle shape; W-LIGHTHOUSE is sequenced BEFORE publish so a `/styles`-split decision, if
  taken, ships in 3.10.0).

---

## Why a dedicated wave (not folded into W-A11Y-PERF)

The findings are **NOT thin** — they justify a dedicated `proof:lighthouse` gate class:

1. **Distinct measurement protocol.** W-A11Y-PERF measures per-frame runtime cost on a
   headed Metal GPU over a Vite DEV server. Lighthouse measures FIRST-PAINT / LCP / payload
   over a **PRODUCTION `vite preview` build under simulated slow-4G + 4× CPU throttle**. The
   two protocols do not share a harness, a server, or a number. Folding them would conflate
   "the JS is cheap, the thread is idle" (TBT 0-40ms everywhere — W-A11Y-PERF's domain) with
   "the eager stylesheet + color engine block the first paint" (the Lighthouse domain).
2. **A `proof:lighthouse` gate class is its own artefact.** No score-floor gate exists in
   CI. The demo's mobile perf (81-92) and the slides landing (mobile 70) have real,
   well-understood, single-lever causes — a per-surface score floor + the LCP-preload fixes
   are a coherent gate set distinct from the five W-A11Y-PERF gates.
3. **The production preview protocol is a shared deliverable both perf waves cite.** This
   wave AUTHORS it (the canonical `vite preview` + LH config the AY perf lanes establish);
   W-A11Y-PERF's G4 cites it for its prod-vs-dev cross-check, and W-BLOB-GLASS's G-PERF
   cites it for the FBO-cost cross-check. Centralizing it here avoids two waves re-deriving it.
4. **The demo a11y defects (aurora dock) are a Lighthouse-surfaced finding** — they came
   out of the a11y category of the LH sweep, sit in demo chrome (not the library primitive),
   and pull the heaviest demo page off a perfect a11y score. They belong with the LH wave,
   not the runtime-perf wave.

> SCOPE NOTE — most demo-side fixes are **demo-private** (`demo/` SFCs, the demo SPA build
> config), NOT `src/`. The LIBRARY-bearing slices are: (a) the `/styles` bundle shape — is
> the monolithic `dist/styles/index.css` split or kept (the §O-1 decision, which DOES touch
> the published artefact); (b) the eager-leaf reach (value.js pulled eagerly even on
> substrate-free routes — a library subpath-discipline question). The score-floor GATE lives
> in the repo's gate fleet (it gates the demo SPA, which is the library's own showcase). This
> is consistent with `proof:dock-animation-live` / the π lanes already gating the demo as the
> library's live surface.

---

## Goal criterion

The glass-ui demo SPA holds a per-surface Lighthouse score FLOOR (a measured, recorded
number per page × form-factor) under the production preview protocol this wave canonizes;
the demo's single dominant load lever — the 270 KB render-blocking `index.css` + the
eagerly-loaded 33 KB `value.js` color engine on substrate-free routes — is split/deferred
so mobile first-paint stops waiting on CSS/JS a given route never paints; the aurora config
dock's a11y misses (3 unnamed sliders + 1 unlabeled color input) are wired so the heaviest
demo page clears a11y 100; and a `proof:lighthouse` CI gate makes the score floor a binding
artefact, not a one-time audit. The slides LCP-asset arm (eager-image lazy/de-prioritize +
the LCP-stagger lift + the font preload) lands in tranche L against the SAME protocol.

## Completion criterion

The FOUR hard gates below (LH-G1…LH-G4) produce a green verdict, the production preview
protocol is authored as a reusable artefact, AND the wave closes on a captured DELTA via
`proof:live-verified-ledger` (W-CARDINAL-INFRA) — the before/after LH score matrix +
the network-waterfall pair as the on-disk artefact (a score-floor wave is a measured wave;
the DELTA is the before/after report JSON, not a prose claim).

`npm run build` + `vue-tsc --noEmit` green; `profile:budget` stays green (the §O-1 `/styles`
decision, if it splits the bundle, re-bases the CSS ceiling — coordinate with PERF-bundle's
`dist/styles/index.css` rebase so the two do not double-edit the budget block).

---

## The measured state (the born-RED baseline — `PERF-lighthouse-*`)

> ALL numbers are PRODUCTION-build, `vite preview`, gzip-on-the-wire confirmed, Lighthouse
> 13.4.0 (demo) / 12.8.2 (slides), headless Chrome 149. Desktop = `--preset=desktop` (no
> throttle). Mobile = LH default (Moto-G-class 4× CPU + simulated slow-4G). Machine: darwin
> 25.4.0, Apple silicon, local loopback (the network legs are LH's SIMULATED throttle, not
> real RTT). Date 2026-06-09.

### Demo SPA score matrix (the born-RED floor)

```
page             form      perf  a11y    bp |     LCP     FCP    CLS    TBT     SI
home             desktop    100   100    96 |   0.7 s   0.6 s  0.023   0 ms  0.6 s
home             mobile      90   100    96 |   3.2 s   2.4 s  0.000   0 ms  2.4 s
aurora           desktop     99    90    96 |   0.9 s   0.7 s  0.032   0 ms  0.7 s
aurora           mobile      81    90    96 |   4.0 s   2.7 s  0.087  20 ms  2.7 s
forms-inputs     desktop    100   100   100 |   0.7 s   0.6 s  0.023   0 ms  0.6 s
forms-inputs     mobile      92   100   100 |   2.9 s   2.4 s  0.000   0 ms  2.4 s
dock-overview    desktop     99   100   100 |   0.8 s   0.6 s  0.011   0 ms  0.6 s
dock-overview    mobile      86   100   100 |   3.6 s   2.7 s  0.014  10 ms  2.7 s
```

- **Desktop is effectively perfect** (perf 99-100, LCP 0.7-0.9s, TBT 0ms). The floor is
  trivially held there; the gate's bite is mobile.
- **Mobile perf 81-92** — the gap is **paint timing under the throttle, NOT runtime cost**
  (TBT 0-20ms everywhere — the JS is cheap, the thread is idle). ONE shared lever dominates.
- **The two BP-96 home/aurora pages are a MEASUREMENT ARTEFACT**, not a defect: headless
  Chrome `--disable-gpu` has no WebGL2 context, so `useWebGLCanvas.ts:118` throws
  `[useWebGLCanvas] WebGL2 unavailable`, counted under `errors-in-console`. In a real
  GPU-backed browser the aurora paints and the error does not fire. The gate MUST run with a
  GPU-backed config (or exempt this one console-error class) so BP reads its real value.
- **The aurora a11y 90 IS a real defect** (both form factors) — see LH-G3.

### Slides deck score matrix (the routed arm — lands in tranche L)

```
run                      perf  a11y  bp |   FCP    LCP*    TBT  CLS    SI
landing — desktop         87    100  100 | 0.6 s   2.5 s   0 ms  0    0.9 s
landing — mobile          70    100  100 | 2.3 s  14.2 s  30 ms  0    4.0 s
xray #7 — desktop         90     —   100 | 0.5 s   2.1 s   0 ms  0    1.0 s
xray #7 — mobile          71     —    96 | 2.3 s  11.6 s  40 ms  0    3.6 s
```

\* **The 14.2s mobile LCP is a Lantern PROJECTION, not a measured paint.** The page actually
paints its LCP in **~0.86s observed** on this box; 14.2s is the model's projection onto a
Moto-G over slow-4G, dominated by the eager 1.95 MB image payload saturating the simulated
1.6 Mbps link. Report it HONESTLY as a throttled-lab projection — but ACT on it, because the
projection is driven by two real, fixable architectural choices (the eager-image defect + the
LCP element gated behind a `--d: 6` opacity:0 stagger). A11y 100, CLS 0, TBT ~0 are exemplary.

---

## The root findings (file:line-grounded where source-attributable)

### LH-F1 — the demo ships ONE 270 KB render-blocking stylesheet (~602 ms mobile render-block, EVERY page)

`render-blocking-insight` flags a SINGLE resource on every demo page: `assets/index-<hash>.css`
— **270 KB raw / 44 KB gzip**, costing **~602 ms** of render-block on the slow-4G+4×CPU mobile
profile. It is the whole token cascade + every component's SFC `<style scoped>` + the Tailwind
utility surface, shipped as one eager `<head>` stylesheet. FCP/LCP do not start until it lands
and parses. This is the demo's bundling (it imports library SOURCE), but a consumer of the
published `/styles` bundle gets the same monolith, so the size is representative of "import
everything." Root: `dist/styles/index.css` is the gated 138 KB-gzip artefact PERF-bundle §1
documents — the same monolith.

### LH-F2 — value.js (33 KB gzip) loads eagerly on substrate-free routes (~450-750 ms unused-JS, mobile)

`unused-javascript` flags the eager entry chunk: `index-<hash>.js` (127 KB transferred, ~66 KB
unused at first paint) + `value-<hash>.js` (32 KB transferred, **~21 KB unused** — the
`@mkbabb/value.js` color engine, pulled in EAGERLY even on forms/dock routes that never paint a
substrate). The router is already lazy (route components are `import.meta.glob` chunks, ~270
split chunks), so this is the SHELL + shared-leaf cost, not route bloat. `duplicated-javascript`
+ `legacy-javascript` both PASS (no double-bundling, no transpile-bloat) — the win is purely
DEFERRAL of value.js + the aurora/blob engine chunks behind the substrate pages.

### LH-F3 — the aurora config dock has 4 real a11y misses (a11y 90, both form factors)

Genuine demo-chrome bugs on the `AuroraConfigDock`/`LabeledField` composition (the only a11y
misses in the whole demo sweep):
1. **`aria-input-field-name` (3 instances)** — three `<span role="slider">` thumbs in the
   AuroraConfigDock's `LabeledField` sliders have NO accessible name. Selector:
   `div.labeled-field > span.glass-slider > span.slider-thumb`. The reka-ui thumb carries
   `role="slider"` but the visible `LabeledField` label is not wired to it via
   `aria-labelledby`/`aria-label` — the SAME class as the CLAUDE.md "NumberField label-binding
   contract" (a wrapper label does not propagate to the inner role-bearing element).
2. **`label` (1 instance)** — a raw `<input type="color">` in the aurora chrome (the stop-color
   picker, `div.labeled-field > input.h-8`) has no associated `<label>`.
   Both live in DEMO source (the fix is demo-private), but they pull the heaviest demo page off
   a perfect a11y score.

### LH-F4 (slides, routed to L) — eager-image defect + the LCP element gated behind a `--d: 6` opacity:0 stagger

- **Every slide's image loads on initial deck mount.** The deck mounts all 9 slides at once
  (declarative `[data-state]`, no slide lazy-loading), and NO `<img>` carries `loading="lazy"`,
  `decoding="async"`, or `fetchpriority`. Landing on slide 1 (a `<canvas>` + text) still
  downloads the entire deck's 1.95 MB imagery up front — `wifi-tableau.png` (863 KB, slide 2)
  is fetched at HIGH priority on the slide-1 landing though it is not visible, not the LCP, not
  on the critical path. `uses-responsive-images` est. 1,750 KiB savings (2560×1600 PNGs in
  quarter-width insets); `modern-image-formats` est. 1,159 KiB (PNG/JPEG → WebP/AVIF).
  `public/assets/ncbroadband.png` (214 KB) is a 404-capture NO slide references — dead deploy
  weight; prune.
- **The LCP element is the cover `PresenterCard` carrying `--d: 6`** (`<div class="presenter
  glass-resting" data-variant="cover" data-reveal="" style="--d: 6;">`). The deck's entrance
  choreography (`src/styles/deck.css §7`, the `v-reveal` directive in `src/deck/reveal.ts`)
  sets `[data-reveal] { opacity: 0 }` and animates `rise 0.7s` with
  `animation-delay: calc(var(--d) * 0.09s + 0.12s)` = 0.66s + the 0.7s rise — LH cannot count
  an `opacity:0` element as contentful until the animation lifts it, so the LARGEST contentful
  paint is pinned to the END of the stagger (~1.36s in), then Lantern multiplies it under
  throttle. (`prefers-reduced-motion` already snaps to `opacity:1` instantly — reduced-motion
  users see an instant-paint LCP; the throttled number reflects the animated path.)
- **No `rel="preload"` for the LCP-critical font.** The cover hero renders in
  Fraunces/Newsreader from `fonts.gstatic.com` discovered only AFTER the Google Fonts CSS
  round-trips (a 3-hop `googleapis → CSS → gstatic` chain, the CSS flagged render-blocking
  ~807 ms). `display=swap` is present (no FOIT); a `<link rel="preload" as="font" crossorigin>`
  would parallel the woff2 fetch with the CSS.

---

## The objective (root-not-consumer, gestalt)

### O-1 — split / defer the demo's render-blocking CSS (LH-F1) + decide the published `/styles` shape

Split the critical above-the-fold token cascade from the long tail of per-component SFC CSS
(most of the 270 KB is component rules a given route never paints), OR inline the small critical
token head-block and defer the rest. EITHER removes the ~600 ms mobile render-block. The
LIBRARY-bearing decision: does the published `/styles` bundle stay a monolith (the consumer
code-splits its own routes — the current contract, CLAUDE.md "import everything") or does
glass-ui offer a critical/deferred split entry? **Decision DELTA must be recorded** — if it
stays monolithic, the demo splits at the DEMO build (demo-private); if the library splits, it
coordinates with the PERF-bundle CSS-ceiling rebase (do NOT double-edit the budget block).

### O-2 — defer value.js + the substrate engines off the substrate-free landings (LH-F2)

Defer `value.js` (and the aurora/blob engine chunks) behind the substrate pages so a forms/dock
landing never pays for the 33 KB color engine. This is a demo-build chunk-discipline fix (the
`manualChunks` / dynamic-import boundary) AND a library subpath-discipline note: `value.js` is a
`/color` subpath leaf (per CLAUDE.md `composables/color/`); the demo reaches it eagerly through a
non-deferred import path. Record whether the eager reach is a demo-import bug or a library
barrel that drags it.

### O-3 — wire the aurora config dock a11y names (LH-F3)

Name the 3 slider thumbs (via `aria-label` / `aria-labelledby` on the `LabeledField` control
itself, the CLAUDE.md NumberField-contract pattern — name the field, not the wrapper) + the
color input (`<label for>` → input `id`). DEMO-private fix (the `AuroraConfigDock`/`LabeledField`
demo composition), but it clears the heaviest page to a11y 100.

### O-4 — mint `proof:lighthouse` (the score-floor gate + the production preview protocol)

The gate runs Lighthouse over the PRODUCTION `vite preview` build (the protocol below) and
asserts a per-surface score FLOOR (a recorded number per page × form-factor, pinned on the green
run so a regression reds). Born-RED where the current state is under a floor a fix raises it to;
the floors are set at the POST-FIX measured number, not a guessed constant.

---

## The production preview protocol (the canonical artefact — authored here, cited by the sibling perf waves)

The reusable measurement harness the AY perf lanes establish, recorded so every Lighthouse /
load measurement in the tranche shares ONE protocol:

| Axis | Canonical value |
|---|---|
| Artefact | the PRODUCTION demo SPA build (minified, code-split, gzip-served) — NOT the dev server, NOT the library lib-mode build. The demo SPA build is reconstructed (root `index.html` + `@`→`src` alias + tailwind/vue plugins) via a THROWAWAY config under gitignored `.cache/` (the repo's `vite.config.ts` is lib-mode only). |
| Server | `vite preview` on a free high port (the audit used 5288 demo / 4990 slides — avoid 5173/5180/5199/5273/4178/4188). **gzip-on-the-wire CONFIRMED** (`Content-Encoding: gzip`) so transfer sizes are production-representative. SPA history-fallback verified (all routes → 200). |
| Lighthouse | pinned major (the audit used 13.4.0 demo / 12.8.2 slides) via `npx`, **headless Chrome** — but with a GPU-backed config OR the WebGL2-console-error class exempted (LH-F3 note) so BP reads its real value on substrate pages. |
| Desktop config | `--preset=desktop` — no CPU/network throttle, 1350×940. |
| Mobile config | LH default — Moto-G-class **4× CPU + simulated slow-4G** (rtt 150 ms, ~1.6 Mbps down), 412×823. THIS is the floor's bite; desktop is trivially clear. |
| Reports | saved JSON + HTML under `docs/tranches/AY/audit/design/lighthouse/<page>-<form>.report.{json,html}` (the durable artefact; the throwaway build config + `/tmp` dist are cleaned up). |
| Throttle honesty | the slow numbers are the LAB throttle, NOT the host — record "observed (real paint)" vs "simulated (Lantern-projected)" separately wherever they diverge by more than ~2× (the slides 0.86s observed vs 14.2s simulated is the canonical example). |

---

## Hard gate (evidence-backed, artefact per clause)

### LH-G1 — `proof:lighthouse` per-surface score FLOOR over the production preview (LH-F1/F2)

`npm run proof:lighthouse` (NEW; `scripts/proof-lighthouse.mjs` + the package.json key —
verified ABSENT at HEAD, 0 matches). The gate builds the demo SPA, serves it via `vite preview`
per the protocol above, runs LH over the 4 audited pages × 2 form-factors, and ASSERTS each
surface clears a RECORDED floor. The floors are set at the POST-FIX measured number + a small
tolerance band, pinned on the green run:
- **Desktop floor: perf ≥ 99, a11y ≥ 100 (3/4 pages; aurora ≥ 100 after O-3), CLS ≤ 0.04.**
- **Mobile floor (the bite): perf ≥ the post-fix number** — born-RED at the HEAD baseline
  (home 90 / aurora 81 / forms 92 / dock 86), GREEN after O-1+O-2 lift the render-block +
  unused-JS (the fix target is recorded in the DELTA; the floor is the achieved number, NOT a
  lowered bar). ASSERT TBT ≤ 50 ms (the JS-is-cheap invariant the audit confirms — a regression
  that pushes TBT up reds even if the score holds).
- **Born-RED proof:** the HEAD run is recorded; the floor set at the post-O-1/O-2 number reds
  against HEAD until the fixes land. **Bite-check:** revert the CSS split → mobile perf drops
  below the floor → red. Captured DELTA: the before/after LH score matrix + the
  render-blocking-insight waterfall pair (the on-disk artefact).

### LH-G2 — the render-blocking-CSS + eager-value.js levers are MEASURED-down (LH-F1/F2)

A focused arm of `proof:lighthouse` (or a sibling `scripts/proof-load-levers.mjs`) reads the LH
diagnostics JSON and ASSERTS:
1. `render-blocking-insight` for the demo's `index.css` drops below a recorded ms ceiling on the
   mobile profile (born-RED at ~602 ms; GREEN after O-1 splits/defers it).
2. `unused-javascript` for `value.js` on a substrate-FREE route (forms/dock) drops below a
   recorded KiB ceiling (born-RED at ~21 KiB eager-unused; GREEN after O-2 defers it).
   Captured DELTA: the before/after diagnostic numbers (a measured KiB/ms per clause).

### LH-G3 — the aurora config dock clears a11y 100 (LH-F3)

`npm run proof:lighthouse` a11y category over `/substrates/aurora` (both form-factors) ASSERTS
a11y = 100 (the 3 `aria-input-field-name` + 1 `label` audits PASS). Born-RED at HEAD (a11y 90,
the 4 misses). After O-3 → GREEN. This may ALSO be a faster axe-core arm (the demo a11y π fleet
precedent) so the dock a11y is checked without a full LH run; either way the artefact is the
named-audit pass/fail. **Bite-check:** revert one slider's `aria-label` → the audit reds.
Captured DELTA: the before/after a11y audit list.

### LH-G4 — the slides LCP-asset arm clears its floor (LH-F4, routed to tranche L)

The slides-side fixes (eager-image `loading="lazy" decoding="async"`, the LCP-stagger lift, the
font preload, the responsive-image re-encode, the `ncbroadband.png` prune) land in **tranche L**
against the SAME production preview protocol. The L wave (a new `L.W-PERF` row OR folded into
L.W-CHR — see the L-READINESS PERF section appended this lane) ASSERTS the simulated mobile LCP
projection drops below a recorded ceiling AND the slide-1 landing transfer drops below a recorded
KiB ceiling (born-RED at 2,541 KB / 1,950 KB images; GREEN after the lazy + re-encode). This
clause is RECORDED here as the cross-repo dependency; the gate + DELTA live in slides/L.

### LH-G-CLOSE — captured DELTA (the cardinal lesson)

`proof:live-verified-ledger` (W-CARDINAL-INFRA) GREEN over this wave's row: the AY ledger row
for W-LIGHTHOUSE carries an own-surface DELTA artefact (the before/after LH score matrix JSON +
the network-waterfall pair, filename matched to `^W-LIGHTHOUSE-*` per the ledger clause), NOT a
prose "improved" claim. A score-floor wave is a measured wave; no row marks the floor held
without the report pair on disk.

`npm run build` + `vue-tsc --noEmit` green; `profile:budget` green (coordinate the §O-1 `/styles`
decision with PERF-bundle's CSS-ceiling rebase — one budget-block edit, not two).

---

## Non-goals / boundaries

- The RUNTIME per-frame cost (rAF-coalesce, nested-backdrop budget, the W55 legibility floor)
  → **W-A11Y-PERF** (disjoint; that wave owns per-frame, this owns first-paint/LCP/payload).
- The bundle PAYLOAD-BYTE budgets (the `dist/glass-ui.js` / `dist/styles/index.css` /
  `dist/aurora.js` ceilings + the D5 drift rebase) → the **PERF-bundle** close action (the CSS
  ceiling lift to gzip 148 000 + the `--rebaseline`); this wave COORDINATES the §O-1 `/styles`
  decision with that rebase but does NOT own the byte budgets.
- The slides deck content/structure (the 9-slide re-author) → **tranche L** (L.W1-INTRO…W7-CLOSE);
  this wave's LH-G4 is the L-side PERF arm only.
- The `bf-cache` ineligibility (1 reason, "Internal error" in headless) → a LOW-priority
  one-line follow-up in a HEADED run (the audit flagged it cannot localize the blocker in
  headless); NOT a first-load metric, not gated here.
- The slides Computer Modern fonts (558 KB `.woff`) → the DEC-8 "font stays" decision (project
  memory); flagged in PERF-bundle as a standing slides-team optimization, NOT an AY blocker.

## Named successor (if a gate misses at CI-low)

- LH-G1 miss → record the exact page × form-factor + the achieved-vs-floor delta; the residual
  load lever (if O-1/O-2 under-deliver) routes to a named `AY.W-LOAD2` with the exact unsplit
  resource.
- LH-G2 miss → the render-block/unused-JS lever is the root; a miss is a chunk-boundary bug,
  fixed in-wave (the artefact is deterministic).
- LH-G3 miss → the residual unnamed control routes to the demo-a11y π fleet (the same class as
  the W-A11Y-PERF a11y arm); record the exact selector.
- LH-G4 miss → the slides LCP arm routes to **tranche L** (the named L.W-PERF / L.W-CHR row);
  record the achieved simulated-LCP + the residual eager asset.
