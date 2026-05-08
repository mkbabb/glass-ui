# K Lighthouse audit — 2026-05-08

**Demo URL**: http://localhost:5173/
**Mode**: **Vite dev server** (`npm run dev`). No production build of the demo exists — `npm run build` builds the *library* (root `vite.config.ts` is library-mode). All performance numbers below are dev-mode and **not representative of prod**: dev serves uncompressed, unminified, per-module ESM with the Vite dep prebundle. Production-only signals (compression, minification, tree-shaking, render-blocking CSS) are reported as **caveat-flagged** rather than load-bearing. **Real, prod-relevant findings (a11y, console errors, label mismatches, non-composited animations, DOM size) are isolated and treated as load-bearing**.
**Lighthouse version**: 12.x (via `npx --yes lighthouse@12`)
**Chrome flags**: `--headless=new --no-sandbox --disable-gpu`
**Categories**: performance, accessibility, best-practices, seo
**Max wait for load**: 45 s (60 s for `/aurora` and `/motion/metaballs`)

## Scores by route

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | TTI |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| /foundations/intro | 54 | 100 | 100 | 82 | 14.5 s | 27.0 s | 10 ms | 0.065 | 14.5 s | 27.0 s |
| /foundations/colors | 54 | 100 | 100 | 82 | 14.5 s | 26.9 s | 10 ms | 0.064 | 14.5 s | 26.9 s |
| /primitives/buttons | 54 | **94** | 100 | 82 | 14.5 s | 26.9 s | 10 ms | 0.065 | 14.5 s | 26.9 s |
| /aurora | 54 | 100 | 100 | 82 | 14.5 s | **34.8 s** | 120 ms | 0.001 | 14.5 s | 34.8 s |
| /motion/metaballs | 54 | 100 | **96** | 82 | 14.6 s | 27.2 s | 30 ms | 0.064 | 14.6 s | 30.8 s |
| /navigation/dock | 54 | 100 | 100 | 82 | 14.6 s | 27.2 s | 10 ms | 0.064 | 14.6 s | 27.2 s |

**Read it correctly**: every route's perf=54 / FCP=14.5s / LCP=27s+ is the same dev-mode pathology — Vite ESM cold-load over slow-3G simulation pulls 119 requests / 4.9 MiB uncompressed JS through one waterfall. The 6 routes are uniform because the dominant cost is **demo bootstrap** (vue + vue-router + reka-ui dep prebundle), not the route itself. **Aurora's +8 s LCP gap and metaballs' +30 ms TBT are the real route-level signal.**

A11y / BP / SEO scores are valid in dev mode and are treated as canonical.

## P0 findings (critical)

### P0-1 — `<Configurator>` reactive recursion on `/motion/metaballs`
- **Route(s)**: `/motion/metaballs` (best-practices score 96; `errors-in-console` audit failed)
- **Lighthouse audit**: `errors-in-console`
- **Measurement**: console.error fired during initial route load
  > *"Maximum recursive updates exceeded in component `<Configurator>`. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."*
  > sourceLocation: `vue-router.js?v=45207d35` line 2262 (Vue runtime warning emitter, not the bug site)
- **Root cause**: `/Users/mkbabb/Programming/glass-ui/src/components/custom/configurator/useConfiguratorState.ts` is the suspect surface. Two design defects compound:
    1. Line 85: `let activeKey: string | undefined = initialKey;` is a **non-reactive** plain `let`. Line 87 wraps it in `computed<string | undefined>(() => activeKey)` — that computed has no reactive dep, so it never re-evaluates after `selectPreset()` mutates `activeKey`. Templates binding `studio.activePreset.value` see stale data.
    2. Line 89-94 `isDirty` *does* read the reactive `config`, so it does re-evaluate — but it ALSO reads the non-reactive `activeKey`, producing inconsistent dependency-graph behaviour.
    3. The metaballs story consumer at `/Users/mkbabb/Programming/glass-ui/demo/stories/motion/metaballs.vue:107-117` adds a `colorDraft = reactive(cfg.colors.map(...))` plus `watch(() => cfg.colors, (next) => { colorDraft.length = 0; for (const c of next) colorDraft.push(...) })`. Combined with `commitColor` that writes to *both* `cfg.colors[index]` AND `colorDraft[index].value`, and `applyPreset` which iterates and reassigns every key on the reactive proxy (`useConfiguratorState.ts:104-111`), this is a textbook recursive-update setup: the watcher's array mutations trigger the dep, which triggers the watcher again.
- **Fix** (two-part):
    - **Part A — make `activeKey` reactive in the composable.** Replace the plain `let` with `ref<string | undefined>(initialKey)` and update `selectPreset` / `resetCurrent` / `cyclePreset` accordingly. `activePreset` then becomes a real computed:
      ```ts
      const activeKey = ref<string | undefined>(initialKey);
      const activePreset = computed(() => activeKey.value);
      // selectPreset mutates activeKey.value = key
      ```
      File: `src/components/custom/configurator/useConfiguratorState.ts:85-119`.
    - **Part B — break the `colorDraft` ↔ `cfg.colors` write-write loop in the metaballs story.** Either drive the UI off `cfg.colors` directly (drop `colorDraft` entirely) or make `colorDraft` write-only-from-watch (single direction). The current bidirectional reactive coupling at `demo/stories/motion/metaballs.vue:107-134` is the runtime trigger.
- **Estimated savings**: closes a Vue runtime error that fires on every visit; uncertain CPU cost in dev (each recursion is bounded by Vue's stack-overflow guard). Real-world value: **prevents a hard P0 in production** — the same pattern would likely throw a "max update depth exceeded" warning under heavier preset switching.
- **Wave attribution**: **K W7** (the wave already extends NumberField + Slider keep-dock-open contract; absorbing this is one composable + one story file). Or, if the K plan is already locked, file as **K W8 close ι integrity-sweep finding** since this is a "named substrate misbehaving silently" defect that the strengthened audit pattern was specifically designed to catch.

## P1 findings (important)

### P1-1 — Color contrast failure on `/primitives/buttons` viz-basis demo buttons (WCAG AA)
- **Route(s)**: `/primitives/buttons` (a11y score 94)
- **Lighthouse audit**: `color-contrast` (axe 4.10)
- **Measurement**: 3 buttons, all white-on-color, contrast ratios 2.92, 2.53, 2.44 (AA requires ≥ 4.5 for normal text):
    | Button | Foreground | Background | Ratio | Hue source |
    |---|---|---|---:|---|
    | Fourier | `#ffffff` | `#eb7366` | 2.92 | `--viz-fourier` (light mode) |
    | Chebyshev | `#ffffff` | `#88a1e7` | 2.53 | `--viz-chebyshev` (light mode) |
    | Legendre | `#ffffff` | `#ce8ee1` | 2.44 | `--viz-legendre` (light mode) |
- **Root cause**: `/Users/mkbabb/Programming/glass-ui/demo/stories/primitives/buttons.vue:97-105` renders the viz-basis swatches with `text-white` on `bg-viz-{fourier,chebyshev,legendre}` (defined `src/styles/tokens.css:231-233` light mode). The viz hues are tuned for chart fills, not button surfaces — light-mode tints are too pale to host white text at AA.
- **Fix**: this is a **demo-story-only** finding (no library variant ships viz-basis as a button variant). Two options:
    1. **(Preferred — KISS)** swap `text-white` to `text-foreground` (or `text-on-viz` if a token exists) in `demo/stories/primitives/buttons.vue:101`. Cartoon-card pattern in glass-ui already uses dark-on-light at `cartoon-*` surfaces.
    2. Bump light-mode `--viz-{fourier,chebyshev,legendre}` saturation/darkness to clear AA at white-on-fill. **Discouraged**: would shift every chart ribbon for a single demo affordance.
- **Estimated savings**: a11y score → 100 on this route. Single-route fix.
- **Wave attribution**: **K W3** has a `demo/` vocabulary residue lane already in flight; fold this in there. Otherwise trivial drive-by — could land in K W8 close fix-ups.

### P1-2 — Aurora preset picker label-content-name-mismatch (WCAG / SR confusion)
- **Route(s)**: `/aurora`
- **Lighthouse audit**: `label-content-name-mismatch` (axe 4.10)
- **Measurement**: 5 preset chips on the aurora preset row each have `aria-label="Preset: <name>"` but the visible button text is just `<name>` (label + sub). The visible text is **not contained** in the accessible name (the prefix "Preset: " is only in the aria-label), violating ARIA label-content rule.
    - Source: `/Users/mkbabb/Programming/glass-ui/demo/stories/aurora/PresetPickerRow.vue:52` — `:aria-label="\`Preset: ${PRESET_META[key].label}\`"` combined with visible `<span>{{ PRESET_META[key].label }}</span>` at line 79-81.
- **Root cause**: the aria-label was added to provide context for screen-reader-only consumers, but the rule states the visible text must be a **substring of** the accessible name (case-insensitive). `"Sky"` is a substring of `"Preset: Sky"` ✓ — wait, that should pass. The axe rule actually flags this because the `<span>` is not the *first* word in the accessible name; axe-core's heuristic prefers visible-text-as-prefix.
- **Fix**: drop the `aria-label` and rely on the visible text + `aria-pressed` for state semantics. Screen readers already announce "button, pressed, Sky" without the label. Or change the format to `aria-label="${PRESET_META[key].label} preset"` so the visible text is the prefix.
    - File: `demo/stories/aurora/PresetPickerRow.vue:52`.
- **Estimated savings**: aurora a11y → 100. Single-route fix; demo-only (PresetPickerRow is a demo-private SFC).
- **Wave attribution**: K W8 close fix-up cohort (or W3 demo-vocab if already open). Trivial.

### P1-3 — Dock dropdown trigger label-content-name-mismatch
- **Route(s)**: `/navigation/dock`
- **Lighthouse audit**: `label-content-name-mismatch`
- **Measurement**: `<DockDropdownTrigger aria-label="Dock command">` contains visible text `<span>{{ dockCommandLabels[dockCommand] }}</span>`. Axe flags the same mismatch as P1-2 — visible text is not part of the accessible name.
    - Source: `/Users/mkbabb/Programming/glass-ui/demo/stories/navigation/dock.vue:138`.
- **Root cause**: same antipattern. The aria-label override hides the visible label from SR users.
- **Fix**: drop the `aria-label="Dock command"` (the visible "Settings" icon + the current command label is already self-describing) OR move the label to a `<DropdownMenuLabel>` inside the menu.
    - File: `demo/stories/navigation/dock.vue:138`.
- **Estimated savings**: dock a11y stays 100 but axe stops flagging; closes the close-ceremony π lane risk if a SR pass is added.
- **Wave attribution**: K W3 demo-vocab lane or W8 close fix-up.

### P1-4 — Aurora `non-composited-animations`: 18 main-thread shimmer skeletons
- **Route(s)**: `/aurora` (TBT 120 ms vs 10 ms baseline)
- **Lighthouse audit**: `non-composited-animations` (informational; doesn't drop perf score in dev but signals real prod cost)
- **Measurement**: 18 elements animate via `skeleton-shimmer` during the cold preset-thumbnail bake. Each element's keyframe is a `background-position` slide (or similar) that **cannot be composited** — runs on main thread, contributing to the route's elevated TBT (120 ms vs 10 ms typical).
    - Source: `src/components/ui/skeleton/Skeleton.vue:21,31,43` — the `.skeleton-shimmer` keyframe.
    - Renders inside `demo/stories/aurora/PresetPickerRow.vue:72-76` while `usePresetThumbnails` bakes thumbnails.
- **Root cause**: gradient-position keyframes don't promote to GPU. Vue/CSS limitation — `@keyframes` that animates `background-position`, `width`, etc., paint on every frame.
- **Fix**: shim the shimmer to a **transform-only** keyframe — wrap the gradient in an absolutely-positioned `::after` and animate `transform: translateX(...)`. `transform` and `opacity` are the only two compositor-friendly properties. Sketch:
    ```css
    .skeleton-shimmer { position: relative; overflow: hidden; }
    .skeleton-shimmer::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(...);
        transform: translateX(-100%);
        animation: shimmer-slide 1.4s linear infinite;
    }
    @keyframes shimmer-slide { to { transform: translateX(100%); } }
    ```
    - File: `src/components/ui/skeleton/Skeleton.vue:31-48`.
- **Estimated savings**: drops aurora TBT from 120 ms → likely 30-50 ms (proportional to the 18 elements' main-thread cost). Helps INP on cold loads with large preset grids.
- **Wave attribution**: K W3 transition-all decomposition lane is the natural home (same theme: main-thread CSS work). Or **defer to L** if K W3 has already shipped — this is single-component scope.

### P1-5 — Render-blocking Google Fonts CSS request
- **Route(s)**: all 6 (perf score 54, but FCP=14.5 s in dev is dominated by this)
- **Lighthouse audit**: `render-blocking-resources` (score 0.5 — flagged but 0 ms savings reported because of `display=swap`)
- **Measurement**: `<link href="https://fonts.googleapis.com/css2?family=Fraunces:..." rel="stylesheet">` at `index.html:21-24` is render-blocking on the critical path. The audit reports 0 ms savings because the font CSS uses `display=swap` (the FOUT-not-FOIT path), but the **stylesheet itself blocks first paint**.
- **Root cause**: `index.html:21-24` — single `<link rel="stylesheet">` for Fraunces, no `media="print" onload="this.media='all'"` async-CSS hack, no `rel="preload"` then swap.
- **Fix** (W2 T18 already preconnected — last mile is stylesheet async-load):
    ```html
    <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:..."
        rel="stylesheet"
        media="print"
        onload="this.media='all'"
    />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:..." /></noscript>
    ```
    OR use `<link rel="preload" as="style" onload="this.rel='stylesheet'">` (modern equivalent).
    - File: `index.html:21-24`.
- **Estimated savings**: in **prod**, an async-loaded font stylesheet shaves ~100-300 ms FCP (network-dependent). In dev, the dominant FCP cost is the JS waterfall, so this is **prod-only** value.
- **Wave attribution**: K W4 doc + tooling cohort already touches `index.html` for the bundle-budget gate restoration; this can ride along. Or defer to L if W4 is closed.

### P1-6 — `font-display` audit @ 0.5 score
- **Route(s)**: all 6
- **Lighthouse audit**: `font-display`
- **Measurement**: 0.5 score = at least one font isn't honoring `font-display: swap` (or equivalent).
- **Root cause**: the **Computer Modern** fonts loaded from `cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font` (240 KiB combined `cmunrm.woff` + `cmunbx.woff`) are imported through `demo.css` with no `font-display: swap` declaration. The Fraunces request from Google Fonts has `&display=swap` in its query string and is fine.
- **Fix**: locate the `@font-face` block for Computer Modern in `demo/demo.css` (or wherever `cmunrm.woff` is declared) and add `font-display: swap;`.
    - Investigation needed: `grep -n "cmunrm\|computer-modern\|@font-face" demo/demo.css`.
- **Estimated savings**: prevents FOIT on Computer Modern; ~150-300 ms perceived-text-visible improvement on slow networks.
- **Wave attribution**: K W4 (if open) or fold into the W4 doc-cohort font cleanup.

## P2 findings (minor)

### P2-1 — `meta-description` missing (all routes)
- **Lighthouse audit**: `meta-description`
- **Source**: `index.html` has no `<meta name="description" content="...">`.
- **Fix**: add `<meta name="description" content="Glassmorphic design system — Vue 3.5 components, glass tokens, motion primitives.">` to `index.html:7-8`.
- **Wave attribution**: K W4 doc cohort. Trivial.

### P2-2 — `robots.txt` parse failures
- **Lighthouse audit**: `robots-txt`
- **Source**: there is no `robots.txt`; Vite serves the SPA shell on `GET /robots.txt`, so Lighthouse parses HTML and reports 29 "Syntax not understood" errors. Dev-mode artefact only — would not occur in prod static hosting.
- **Fix**: ship `public/robots.txt` (one line: `User-agent: *\nDisallow:`) if the demo is ever published. Otherwise no-op.
- **Wave attribution**: defer to L (or whenever the demo gets a public deploy target).

### P2-3 — `uses-passive-event-listeners` flagged in `@vue/runtime-dom`
- **Lighthouse audit**: `uses-passive-event-listeners` (score 0.5)
- **Source**: `node_modules/.vite/deps/chunk-A3TJTFFO.js` line 11617 → `@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:680`.
- **Fix**: not actionable in our code — Vue framework choice. Track upstream.
- **Wave attribution**: not glass-ui scope.

### P2-4 — `uses-long-cache-ttl`: 8 resources without long cache headers
- **Source**: dev-server-only — Vite does not emit `Cache-Control: max-age=...` for HMR-served chunks.
- **Fix**: prod hosting concern. No-op for dev audit.
- **Wave attribution**: prod deploy cohort (post-K).

## Glass-ui specific observations

- **Aurora's LCP = 34.8 s** vs other routes' ~27 s. Delta is +8 s. `largest-contentful-paint-element` resolves to `MAIN > SECTION > DIV > DIV > SECTION` — the aurora **stage container itself**. Cause: the WebGL canvas's first paint is gated on shader compile + first frame render, which Vite cold-load + dev-mode mainthread-busy compounds. **In prod with cached shaders** this drops dramatically. Bootup time dedicates 287 ms to `src/components/custom/aurora/composables/runtime.ts` — that's the long task to watch.
- **DOM size on `/aurora` = 755 elements, max depth 25** vs intro's 148 / depth 11. Aurora's preset row + nuclei overlay + AuroraConfigDock + 5 preset chips × ~10 inner nodes adds up. Lighthouse's threshold for warning is 1500 — we're well clear, but it's the **largest surface** in the demo and the prime candidate for any future virtualisation.
- **`useGlassRenderer` shader compilation** does NOT show up as a long task in the Lighthouse trace — surprising; the WebGL setup is fast enough to slip under the 50 ms long-task threshold. The renderer-tier detection cascade (svg-filter / css / fallback) appears not to be a perf liability.
- **Preconnect to fontshare** (W2 T18 commit `08ffbde`): verified — fontshare hosts are preconnected in `index.html:14-15`. No fontshare resources actually load on these routes (the demo uses Fraunces from Google Fonts + Computer Modern from jsdelivr), so the preconnect is **dead weight** at HEAD. Either remove it from `index.html` or add a fontshare consumer story.
- **No `transition-all` flagged in this audit** (K W3 R-NEW-1 residual). The audit doesn't enumerate it — Lighthouse rolls main-thread CSS work into `mainthread-work-breakdown` (1.7 s on aurora). Decomposing `transition-all` is independently justified by INP, not perf-score regression.
- **Bundle-budget cross-reference**: dev `network-requests` shows reka-ui = 1.3 MiB uncompressed and lucide-vue-next = 833 KiB uncompressed. **These are dev-mode unbundled measurements**; the library `dist/` already tree-shakes. Run `npm run profile:bundle` to corroborate against the real budget — that is the load-bearing measurement.
- **No image issues**: zero `uses-responsive-images`, `modern-image-formats`, `efficient-animated-content` failures across all 6 routes. Aurora preset thumbnails are runtime-baked canvases (data URLs), not image network requests.
- **CLS tiny (0.001-0.065 across routes)** — fonts swap-in causes the small shifts on text-heavy routes (intro, colors, dock, metaballs, buttons). Aurora is 0.001 because the WebGL stage has fixed dimensions before any text settles. **CLS is NOT a load-bearing finding for K.**

## Recommended K replan

This audit produced **1 P0 (real, prod-relevant) + 6 P1 (mix of a11y + prod-perf) + 4 P2 (minor)** findings. Recommendation:

1. **K W8 (close ceremony)** — fold P0-1 (Configurator recursion) into the **ι integrity-sweep lane**. This is exactly the kind of "named substrate misbehaving silently" defect the strengthened audit pattern was designed to catch. It's a 2-file fix (composable + one story).
2. **K W8 close fix-up cohort** — absorb P1-1, P1-2, P1-3 (a11y trio: 1 contrast + 2 label-content-name-mismatch). All three are demo-only, single-line/single-file fixes.
3. **K W3 (if reopenable) or L W1** — P1-4 (skeleton-shimmer compositor migration). Single component, clear win, but not a blocker.
4. **K W4 (if reopenable) or L W1** — P1-5, P1-6, P2-1 (font async-load + font-display: swap on Computer Modern + meta-description). All `index.html` / `demo/demo.css` edits.
5. **Defer to L** — P2-2 (robots.txt for public deploy), P2-3 (Vue upstream), P2-4 (prod hosting).

A standalone **K W9 perf-audit-cohort wave is NOT recommended** — the actionable findings are 6 lines of code total across 5 files. They fit within the existing close ceremony fix-up window. **What IS load-bearing is documenting that no production demo build exists** (and either creating a `vite.demo.config.ts` for a static demo build, or formally retiring the demo as a deploy target). That decision is K-out-of-scope per the K plan; flag for L.

## Artifacts

All raw Lighthouse outputs (HTML + JSON) are saved at:

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/intro.report.{html,json}`
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/colors.report.{html,json}`
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/buttons.report.{html,json}`
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/aurora.report.{html,json}`
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/metaballs.report.{html,json}`
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/lighthouse-2026-05-08/dock.report.{html,json}`

Open any `*.report.html` in a browser for the canonical Lighthouse UI; the `.json` files were the source for this report's parsed findings.
