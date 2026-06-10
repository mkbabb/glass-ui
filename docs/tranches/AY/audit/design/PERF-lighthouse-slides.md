# PERF-lighthouse-slides — Lighthouse audit of the til-briefing deck (production build)

Lane: `PERF-lighthouse-slides` (Perf). Read-only on src/; this is a measurement +
findings artefact. No source edits, no git.

## Conditions (recorded with every number)

| Axis | Value |
|---|---|
| Target | `/Users/mkbabb/Programming/slides` — the `til-briefing` deck |
| Build | **production** — `npm run build` (vue-tsc + `vite build`), served by `vite preview` |
| Server | `npx vite preview --port 4990 --strictPort` (4188 / 5273 left untouched; 5273 was in use) |
| Lighthouse | **12.8.2** (installed throwaway under `/tmp/lh-slides`, removed after) |
| Chrome | Google Chrome **149.0.7827.102**, `--headless=new` |
| Machine | macOS (Darwin 25.4.0), Apple silicon — a FAST dev box; the lab THROTTLE is what produces the slow numbers, not the host |
| Mobile config | LH default — Moto-G-Power emulation, **4× CPU slowdown**, **simulated slow-4G** (rtt 150ms, ~1.6 Mbps down), 412×823 @ DPR 1.75 |
| Desktop config | `--preset=desktop` — no CPU throttle, broadband, 1350×940 @ DPR 1 |
| Date | 2026-06-09 |

Reports saved alongside this file:
- `lh-til-briefing-desktop.report.{html,json}` — landing (slide 1)
- `lh-til-briefing-mobile.report.{html,json}` — landing (slide 1)
- `lh-til-briefing-xray-desktop.report.{html,json}` — heavy-slide deep link `#7`
- `lh-til-briefing-xray-mobile.report.{html,json}` — heavy-slide deep link `#7`

The Xray slide is deck index 6; the deck deep-links by 1-based URL hash, so the
heavy-slide entry point is `http://localhost:4990/til-briefing#7` (verified in
`DeckView.vue` — `initial = #N - 1`).

---

## Scores

| Run | Perf | A11y | Best-Practices | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|---|---|
| **Landing — desktop** | **87** | 100 | 100 | 0.6 s | **2.5 s** | 0 ms | 0 | 0.9 s |
| **Landing — mobile** | **70** | 100 | 100 | 2.3 s | **14.2 s** | 30 ms | 0 | 4.0 s |
| **Xray `#7` — desktop** | **90** | — | 100 | 0.5 s | 2.1 s | 0 ms | 0 | 1.0 s |
| **Xray `#7` — mobile** | **71** | — | 96* | 2.3 s | 11.6 s | 40 ms | 0 | 3.6 s |

\* The Xray-mobile BP drop to 96 is **not a deck defect** — the single failing
audit is `font-size` ("44% legible text"), measured inside the **live
xray.friday.institute iframe** content at mobile emulation scale. The deck's own
chrome scores BP 100 on every landing run.

A11y is a clean **100** on both landing configs. TBT is effectively zero
(0–40 ms) everywhere — the JS is not the bottleneck. CLS is a perfect **0** on
all four runs (the slide stage is a fixed-fit canvas; nothing reflows).

### LCP is the ONLY weak metric — and it is two different stories

The single number dragging the score is **LCP**. It is essential to separate the
**observed** (real, on this machine, unthrottled) value from the **simulated**
(Lantern-projected onto the throttled mobile device) value, because they diverge
by an order of magnitude:

| | observed (real paint) | simulated (the reported score) |
|---|---|---|
| Landing — desktop LCP | **894 ms** | 2,465 ms |
| Landing — mobile LCP | **860 ms** | **14,179 ms** |
| Landing — mobile FCP | 138 ms | 2,342 ms |

The page actually paints its LCP in **~0.86 s** on this box. The **14.2 s mobile
LCP is a projection** of what the LCP element's dependency graph would cost on a
Moto-G-Power over slow-4G — and that projection is dominated by the eager image
payload (below) saturating the simulated 1.6 Mbps link before the LCP resource
chain resolves. Report the 14.2 s honestly as a *throttled-lab projection*, not
as a measured user-facing paint; but DO act on it, because the projection is
driven by two real, fixable architectural choices.

---

## The LCP element — a glass card gated behind an entrance animation

On every run the LCP element is the same node:

```html
<div class="presenter glass-resting" data-variant="cover" data-reveal="" style="--d: 6;">
```

This is the `PresenterCard` on the cover (SlideIntro). LCP phase breakdown
(mobile, simulated): **Render Delay 83%**, Load Delay 14%, TTFB 3%. The render
delay — not bytes, not TTFB — is what defers the LCP.

**Root cause (architectural, confirmed in source).** The deck's entrance
choreography (`src/styles/deck.css §7`, driven by the `v-reveal` directive in
`src/deck/reveal.ts`) sets:

```css
[data-reveal] { opacity: 0; }                       /* base: invisible */
.slide[data-state="active"] [data-reveal] {
    animation: rise 0.7s var(--ease-out-expo) both;
    animation-delay: calc(var(--d, 0) * 0.09s + 0.12s);
}
```

The LCP card carries `--d: 6`, so its paint is gated behind
`6 × 0.09 s + 0.12 s = 0.66 s` of delay **plus** the 0.7 s `rise` animation, and
it starts from `opacity: 0`. Lighthouse cannot count an `opacity:0` element as
contentful until the animation lifts it — so the **largest** contentful paint is
pinned to the *end* of the stagger, ~1.36 s into the slide, then the Lantern
model multiplies that wall-clock cost under throttle.

This is the headline finding: **the deck's biggest paint element is its most
deeply-staggered reveal.** The entrance idiom is correct and on-brand for a
presentation; the LCP cost is a side-effect of `--d: 6` landing on the *largest*
box. Two cheap mitigations (see Recommendations) drop the simulated LCP without
touching the choreography's feel.

(`prefers-reduced-motion: reduce` already snaps every `[data-reveal]` to
`opacity:1` instantly — so reduced-motion users already see an instant-paint LCP.
The throttled-lab number reflects the *animated* path.)

---

## Payload findings — the real defect class

Total transfer on the **landing** (mobile run, before any navigation):
**2,541 KB** — of which **Images = 1,950 KB**, Fonts = 374 KB, JS = 144 KB,
CSS = 72 KB.

### Every slide's image loads on initial deck mount (the eager-image defect)

The deck mounts **all nine slides at once** (declarative `[data-state]`
visibility, no route-level slide lazy-loading), and **none of the `<img>` tags
carry `loading="lazy"`, `decoding="async"`, or `fetchpriority`** (verified across
`SlideSuccess.vue`, `SlidePipeline.vue`, `SlideXray.vue`). So landing on slide 1
— whose only visual is a `<canvas>` constellation and text — still downloads the
entire deck's imagery up front:

| Asset | Used on | Transfer | Natural dims | LH priority on landing |
|---|---|---|---|---|
| `assets/wifi-tableau.png` | slide 2 (Success) | **863 KB** | 2560×1600 | **High** |
| `assets/usf-map.png` | slide 2 | 362 KB | 2560×1600 | Low |
| `assets/wopr.jpg` | slide 8 (Pipeline) | **226 KB** | 1920×1038 | High |
| `xray-poster.png` | slide 7 (Xray fallback) | 210 KB | 2560×1440 | High |
| `assets/sci-report.png` | slide 2 | 197 KB | 2560×1600 | Low |
| `til-logo-padded.png` | favicon + brand | 92 KB | 316×316 | High |

`wifi-tableau.png` (863 KB, slide 2) is fetched at **High** priority on the slide-1
landing — it is not visible, not the LCP, and not on the critical path, yet it
competes for the first bytes. This is the dominant contributor to the 14.2 s
simulated mobile LCP: on slow-4G these images saturate the link ahead of the
LCP-element's resources (LCP "Load Delay" jumps to **71%** on the Xray deep-link
run, where even more imagery is in flight).

Confirmation from LH diagnostics (mobile):
- **`uses-responsive-images`: est. 1,750 KiB savings** — the map PNGs are
  2560×1600 served into small framed insets (~quarter-width grid cells). They are
  3–4× oversized for their display box on every device.
- **`modern-image-formats`: est. 1,159 KiB savings** — all are PNG/JPEG;
  WebP/AVIF would roughly halve them (wifi-tableau alone: 626 KiB of the saving).
- `offscreen-images` scores **1 (pass)** — but ONLY because LH measures slide 1,
  where these are technically rendered (mounted) just off the visible plate; the
  pass is misleading. The network panel is the truth: they are all downloaded.

> **`ncbroadband.png` (214 KB)** sits in `public/assets` but is a **404 capture
> that no slide references** (noted in `SlideSuccess.vue`). It is NOT in the
> network trace (good — unreferenced), but it ships in the deploy bundle as dead
> weight. Prune it.

### Fonts — 374 KB of Google-hosted woff2, no LCP-critical preload

Four font files load from `fonts.gstatic.com` (the deck's display/serif/mono
ladder — Fraunces, Newsreader ×2, Fira Code):

| Font | Transfer |
|---|---|
| Newsreader (two cuts) | 144 KB + 129 KB = **273 KB** |
| Fraunces | 66 KB |
| Fira Code | 36 KB |

- `index.html` carries `rel="preconnect"` to both Google Fonts origins (good) and
  the stylesheet uses `display=swap` (good — `font-display` audit passes, no FOIT).
- **No `rel="preload"` for the LCP-critical font.** The cover hero + the
  PresenterCard render in Fraunces/Newsreader; those woff2 are discovered only
  *after* the Google Fonts CSS round-trips (`fonts.googleapis.com` → CSS →
  `fonts.gstatic.com` → woff2 — a 3-hop chain). The Google Fonts `<link
  rel="stylesheet">` is flagged **render-blocking** (`render-blocking-resources`,
  ~807 ms est. on the chain). An LCP-critical-font `<link rel="preload"
  as="font" crossorigin>` would let the woff2 fetch start in parallel with the
  CSS rather than behind it.
- The **self-hosted Computer Modern** fonts in `public/fonts/cm/` (4 woff,
  ~558 KB total) are the **feedback-coder** deck's `--font-serif`/`--font-display`
  — the til-briefing deck does **not** load them (confirmed: not in the trace).
  No action for this deck; they only ship for the other deck's identity.

### The main CSS bundle — render-blocking, 60 KB gzip

`assets/index-BEojdX_e.css` is **353 KB raw / 59 KB gzip** (the bundled glass-ui
`@import "@mkbabb/glass-ui/styles"` cascade + the deck CSS) and is loaded as a
render-blocking `<link rel="stylesheet">` (~1,051 ms on the blocking chain,
mobile). `unused-css-rules` and `unminified-css` both **pass** (it is minified
and the deck genuinely exercises most of the glass-ui token cascade), so this is
acceptable — but it is the single largest render-blocking resource and a candidate
for critical-CSS inlining if FCP becomes a target.

### JS — clean

JS is **144 KB** total transfer, code-split cleanly per the `vite.config.ts`
`manualChunks` recipe (`vendor` 98 KB, `glass-ui` 16 KB, `deck` 18 KB,
`keyframes` 3 KB, route chunks). TBT 0–40 ms — the JS does not block. The only
flag is `unused-javascript` est. **52 KiB** in `vendor` (vue-router + reka-ui
surface not all reached) — minor, not worth chasing.

---

## The Xray heavy slide (`#7`) — iframe behaviour

The Xray slide embeds the **live** xray.friday.institute portal in an `<iframe>`
(`SlideXray.vue`), guarded by: armed-after-300 ms, on-slide-only, not-export,
reachability-probed, and **not on a coarse pointer** (phones get a static
poster). Observations:

- **Desktop `#7`: Perf 90.** The live iframe loads its own 215 KB JS + ~275 KB of
  friday.institute third-party AFTER the deck's LCP, so it doesn't hurt the score.
  The iframe is `loading="lazy"` + torn down off-slide — well-built.
- **Mobile `#7`: Perf 71.** The live iframe **did** mount on mobile (the
  `matchMedia("(pointer: coarse)")` poster fallback did NOT trip under headless
  emulation — emulated touch is not reported as `pointer: coarse` by headless
  Chrome). On a real phone the coarse-pointer guard would serve the 210 KB
  `xray-poster.png` instead, which is the intended, lighter path. **Worth noting**:
  the lab-mobile run is *heavier* than a real phone here, not lighter — the score
  understates real-device mobile perf for this slide.
- Even deep-linking straight to `#7`, **the full 1.95 MB of deck imagery still
  downloads** (all slides mounted) — the eager-image defect compounds here, and is
  why the Xray-mobile LCP "Load Delay" climbs to 71%.

---

## Recommendations (ranked by LCP impact — all are deck-side, glass-ui-clean)

These are findings for the slides repo (the spec edits land there, not in
glass-ui src/). Ordered by simulated-LCP payoff:

1. **Lazy + de-prioritize off-slide images.** Add `loading="lazy"
   decoding="async"` to every `<img>` in `SlideSuccess`, `SlidePipeline`,
   `SlideXray` (the poster). Mark the **only** above-the-fold image — none on
   slide 1, so nothing needs `fetchpriority="high"`. This alone removes ~1.7 MB
   from the slide-1 critical path and is the largest single LCP win. (The deck
   mounts all slides; native `loading=lazy` defers the off-viewport ones.)

2. **Re-encode + right-size the map PNGs.** wifi-tableau / usf-map / sci-report /
   ncbroadband are 2560×1600 PNGs in small grid insets. Re-encode to WebP at the
   actual display width (≤ ~1280 px): est. **1.1–1.7 MB saved**. wifi-tableau
   (863 KB → ~150 KB WebP) is the headline. Prune the unreferenced
   `ncbroadband.png` entirely.

3. **Lift the LCP element out of the deep stagger.** The `--d: 6` PresenterCard is
   the LCP. Either give the cover card a much lower `--d` (so it paints first, not
   last) OR exempt the largest cover element from the `opacity:0` base (let it
   paint at rest and animate a transform/translate only — a transform-only reveal
   does not gate `contentful` paint the way `opacity:0` does). Keeps the
   choreography's feel; un-pins LCP from the end of the stagger.

4. **Preload the LCP-critical font.** Add `<link rel="preload" as="font"
   type="font/woff2" crossorigin>` for the cover's display cut (Fraunces) so the
   woff2 fetch parallels the Google Fonts CSS instead of waiting behind the 3-hop
   `googleapis → CSS → gstatic` chain. `display=swap` already prevents FOIT; this
   shaves the swap-in latency on the LCP text.

5. **(Optional) Self-host or subset the Google Fonts.** 374 KB across 4 cuts on a
   render-blocking 3rd-party chain. Self-hosting (same-origin, with the existing
   `public/fonts/` precedent) removes the cross-origin round-trips and the
   render-blocking Google CSS; subsetting to the glyph set the deck uses would
   trim further. Lower priority than 1–4.

**Do NOT** chase the 52 KiB `unused-javascript` or the CSS bundle size — both are
already well-handled (code-split, minified, mostly-used) and not on the critical
LCP path. CLS (0), TBT (≈0), and A11y (100) are exemplary; leave them.
