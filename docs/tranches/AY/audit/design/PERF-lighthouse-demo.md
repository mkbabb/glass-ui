# PERF-lighthouse-demo — Lighthouse over the glass-ui demo

Lane: `PERF-lighthouse-demo` (Perf). Read-only on `src/`; BUILD + measure + write
only. No git.

## Measurement conditions (record honestly)

| Axis | Value |
|------|-------|
| Artefact | **PRODUCTION build of the demo SPA** (minified, code-split, gzip-served) — NOT the dev server, NOT the library build |
| Build | `vite build` of `index.html` → `/tmp/glass-ui-demo-dist` via a throwaway config in the gitignored `.cache/` (cleaned up; never committed). The repo's `vite.config.ts` is library/lib-mode only and has no demo build script, so the demo SPA build was reconstructed (root `index.html` + `@`→`src` alias + tailwind/vue plugins). Output: main chunk 400 KB (131 KB gzip), route-level code-split, full per-component CSS chunks + a 270 KB / 44 KB-gzip token+SFC `index.css`. |
| Server | `vite preview` on **port 5288** (free; avoided 5173/5180/5199/5273/4178). SPA history-fallback verified (all routes → 200). **Compression: gzip CONFIRMED on the wire** (`Content-Encoding: gzip` — preview serves compressed, so transfer sizes are production-representative). |
| Lighthouse | **13.4.0** via `npx`, headless Chrome **149.0.7827.102** (`--headless=new --no-sandbox --disable-gpu`) |
| Configs | **Desktop** (`--preset=desktop`: no CPU/network throttle, 1350×940) + **Mobile** (default form factor: Moto-G-class 4× CPU throttle + slow-4G, 412×823) |
| Categories | performance, accessibility, best-practices (PWA/SEO out of scope for this lane) |
| Machine | darwin 25.4.0, Apple Silicon; local loopback (zero network latency — the network legs are Lighthouse's simulated throttle, not real RTT) |
| Date | 2026-06-09 |

Reports (JSON + HTML) saved under
`docs/tranches/AY/audit/design/lighthouse/<page>-<form>.report.{json,html}` — 16
files (4 pages × 2 form-factors).

### One caveat that is NOT a demo defect — the headless WebGL2 console error

Headless Chrome with `--disable-gpu` has **no WebGL2 context**, so the Aurora/Goo
substrate's `useWebGLCanvas.ts:118` throws `[useWebGLCanvas] WebGL2 unavailable`,
which Lighthouse counts under `errors-in-console` and drops **best-practices to 96
on the two WebGL-bearing pages (home, aurora)**. In a real GPU-backed browser the
aurora paints and this error does not fire — it is a **measurement artefact of the
headless config**, not a live demo bug. (See the genuine-edge note in Findings #4:
the substrate *throwing* rather than degrading silently is a real, separate concern
for users on WebGL2-less hardware, but it does not affect the headless score
interpretation.)

## Pages measured

- **Home** — `/foundations/intro` (the front-door aurora HERO page; `/` redirects here)
- **Aurora** — `/substrates/aurora` (the heavy WebGL substrate page + its config dock)
- **Primitives** — `/forms/inputs` (Input/Label/SearchBar primitives page)
- **Dock** — `/dock/overview` (the GlassDock walkthrough)

## Score matrix

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

Reading the matrix:
- **Desktop is excellent everywhere** — perf 99–100, LCP 0.7–0.9 s, TBT 0 ms, CLS ≤ 0.032. Nothing to fix on desktop.
- **Mobile perf 81–92** — the gap is entirely **paint timing under the 4× CPU + slow-4G throttle**, NOT runtime cost (TBT 0–20 ms everywhere — the JS is cheap; the main thread is idle).
- **A11y 100 on home/forms/dock**; aurora drops to **90 (REAL defect, both form factors)** — config-dock controls missing accessible names.
- **CLS** is clean (≤ 0.032) except aurora mobile **0.087** (the WebGL hero settling — still under the 0.1 "good" line).

## Per-page top opportunities

The opportunities are remarkably uniform across pages — one shared bottleneck
dominates. Mobile numbers (the throttled config that surfaces them); savings are
Lighthouse's modelled estimates.

### Shared #1 — render-blocking CSS (~600 ms on every page, mobile)

`render-blocking-insight` flags a **single** resource on every page:
`assets/index-<hash>.css` — **270 KB raw / 44 KB gzip**, costing **~602 ms** of
render-block on the slow-4G+4×CPU mobile profile. This is the whole token cascade +
every component's SFC `<style scoped>` + the Tailwind utility surface, shipped as
one eager stylesheet in `<head>`. It is the LCP/FCP gate on mobile — FCP and LCP do
not start until it lands and parses.

- This is the **demo's** bundling, not the published library's: the demo imports
  library *source* (`../../src/...`) so its Tailwind/vite pipeline rolls the full
  `src/styles/index.css` cascade + all SFC CSS into one file. A consumer of the
  published package gets the same `/styles` bundle, so the size is representative of
  "import everything," but a real app code-splits its routes.
- Lever: split the critical above-the-fold token cascade from the long tail of
  component SFC CSS (most of the 270 KB is per-component rules a given route never
  paints), OR inline the small critical token head-block and defer the rest. Either
  removes the ~600 ms render-block on mobile.

### Shared #2 — unused JavaScript on first paint (~450–750 ms, mobile)

`unused-javascript` flags the eager entry chunk on every page:
- `index-<hash>.js` — 127 KB transferred, **~66 KB unused** at first paint
- `value-<hash>.js` — 32 KB transferred, **~21 KB unused** (the `@mkbabb/value.js`
  color engine, pulled in eagerly)

The router is already lazy (route components are `import.meta.glob` chunks — the
build emits ~270 split chunks), so this is the **shell + shared-leaf** cost, not
route bloat. `value.js` (33 KB gzip) is the heaviest single shared leaf and is
loaded eagerly even on routes (forms/dock) that never paint a substrate.
- Lever: defer `value.js` (and the aurora/blob engine chunks) behind the substrate
  pages so a forms/dock landing never pays for the color engine. `duplicated-javascript`
  and `legacy-javascript` both PASS — there is no double-bundling or transpile-bloat
  to chase; the win is purely deferral.

### Shared #3 — bf-cache ineligible (1 reason; "Internal error" in headless)

`bf-cache` fails with one reason on every page. In headless the reason surfaces as
"Internal error" (a known headless-Lighthouse limitation that does not localize the
real blocker). Worth a one-line follow-up in a headed run to confirm whether it is
the WebGL context, an `unload`/`beforeunload` listener, or a `Cache-Control: no-store`
on the dev preview. Low priority — bf-cache is a back/forward-nav nicety, not a
first-load metric.

### Aurora-specific — heaviest page

- **Perf 81 mobile / 99 desktop.** LCP 4.0 s mobile is the worst single number,
  gated by the same render-blocking CSS + the Aurora/value engine chunks
  (`Aurora-<hash>.js` 98 KB raw / 34 KB gzip + `value.js` 33 KB gzip) loading before
  the hero can paint.
- **CLS 0.087 mobile** — the WebGL canvas hero settling into place. Under the 0.1
  "good" threshold and `cls-culprits-insight` flags no single dominant shifter, so
  it is the substrate-mount reflow, not a layout bug. A reserved aspect-ratio box for
  the canvas would zero it.
- **TBT 20 ms** — still negligible; the shader work is on the GPU/rAF, off the
  main-thread-blocking path Lighthouse measures.

### Forms / Dock — the clean primitives pages

`forms-inputs` mobile **92** and `dock-overview` mobile **86** are the same render-block
+ eager-shell story with no substrate engine — they are the cleanest pages and prove
the bottleneck is the shared CSS/JS shell, not any one feature. Both are **a11y 100,
BP 100, CLS ≈ 0–0.014, TBT 0–10 ms**. Dock's slightly lower 86 vs forms' 92 is the
larger dock overview chunk (18 KB) + its richer DOM, not a defect.

## Real accessibility defects (aurora, a11y 90 — both form factors)

These are genuine `src/`/demo-chrome bugs (not measurement artefacts) on the Aurora
config dock:

1. **`aria-input-field-name` (3 instances)** — three `<span role="slider">` thumbs in
   the AuroraConfigDock's `LabeledField` sliders have **no accessible name**.
   Selector: `div.labeled-field > span.glass-slider > span.slider-thumb`. The
   reka-ui slider thumb carries `role="slider"` but the visible `LabeledField` label
   is not wired to it via `aria-labelledby`/`aria-label`. (Note: this is the same
   class as the CLAUDE.md "NumberField label-binding contract" — a wrapper label does
   not propagate to the inner `role`-bearing element; the field's control must be
   named directly.)
2. **`label` (1 instance)** — a raw `<input type="color">` in the aurora chrome has no
   associated `<label>`. Selector: `div.labeled-field > input.h-8` (the stop-color
   picker).

Both live in the **demo's** Aurora config chrome (the `AuroraConfigDock`/`LabeledField`
composition), so the fix is in demo source, not the library primitive — but they pull
the heaviest demo page off a perfect a11y score and are the only a11y misses in the
whole sweep. (Implementation is HALTED — these are recorded for the fix wave.)

## Verdict

**STRONG.** Desktop is effectively perfect (99–100 perf, 100 a11y on 3/4 pages,
clean CLS/TBT). Mobile perf 81–92 is honest and good for a glass-heavy, WebGL-bearing
demo under the punishing slow-4G+4×CPU throttle — and the gap is a **single,
well-understood lever** (one 270 KB render-blocking stylesheet + an eagerly-loaded
33 KB color engine), not diffuse runtime cost (TBT is 0–20 ms everywhere; the JS is
cheap, the thread is idle). The two concrete, actionable wins:

1. **Split / defer the monolithic `index.css`** (drops ~600 ms render-block on every mobile page — the highest-leverage single change).
2. **Defer `value.js` + the substrate engines** off the forms/dock landings (~450–750 ms unused-JS).

Plus the **aurora-dock a11y wiring** (3 unnamed sliders + 1 unlabeled color input —
the only a11y misses, all in demo chrome).

## Throwaway-artefact note

The demo SPA build config lived at `.cache/vite.demo-perf.config.mts` (gitignored)
and output to `/tmp/glass-ui-demo-dist` — both throwaway, removed at lane close. The
preview server ran on :5288. Only the 16 Lighthouse reports + this `.md` are the
durable deliverables under `docs/tranches/AY/audit/design/`.
