# BB.W-LIGHTHOUSE — the production-preview Lighthouse protocol (the never-owned performance axis, owned)

This is the COMMITTED, re-runnable protocol the `proof:lighthouse` gate drives. It
is the durable replacement for the AY-era throwaway `.cache/vite.demo-perf.config.mts`
(the chronic). The `.2` DELTA (the before/after score matrix + the network-waterfall
pair) is the orchestrator's, captured at `docs/tranches/BB/audit/visual/W-LIGHTHOUSE-DELTA.md`.

## Re-run command

```
npm run build                 # the consumer harness imports the published dist/ — must be fresh
npm run proof:lighthouse      # builds the demo SPA, serves it, scores 4 surfaces × 2 form-factors + the consumer harness
```

Re-pin the floor at the post-fix numbers (the orchestrator, after W-CSS-CRITICAL +
W-PAYLOAD-DEFER + W-CARD-COMPOSITE land):

```
node scripts/proof-lighthouse.mjs --rebaseline   # writes scripts/lighthouse/floor.baseline.json at the ACHIEVED numbers
```

The runner is DEVICE-BOUND (a real Chrome + Lighthouse). It SKIPS-by-policy
(exit 0, status `skipped`) on a runner with no Chrome / no Lighthouse — tagged
`["local"]` in the gate manifest so it never blocks headless CI; the static
`proof:live-verified-ledger` (ci) enforces the live run HAPPENED. Force a clean
skip with `GLASS_UI_LIGHTHOUSE_SKIP=1`; allow a first-run LH download on a
network-allowed runner with `GLASS_UI_LIGHTHOUSE_INSTALL=1`.

## The axes

### Artefact — the PRODUCTION demo SPA build (not dev, not lib-mode)

The repo's `vite.config.ts` is LIB-MODE ONLY (the per-subpath chunk set +
`/styles` CSS). `npm run dev` serves the demo in DEV mode. There has never been a
production demo-SPA BUILD config. `scripts/lighthouse/preview-build.config.mts` is
the committed one: root `index.html` (the same `/demo/main.ts` entry `npm run dev`
serves) + the standard tailwind+vue plugin pair + a production `build` (minified
via oxc — `minify: true`, NOT `"esbuild"` which is not a repo dep under Vite 8 /
Rolldown; code-split; hashed). Output lands in `.cache/lighthouse/demo-dist`
(gitignored — the build is reproducible from the committed config; only the config
+ the floor baseline are committed). The demo reaches library SOURCE via relative
imports (no `@/` alias exists in the demo at HEAD).

### Server — `vite preview` on a distinct high port, gzip-on-the-wire, SPA fallback

`vite preview` serves the built SPA over the committed config on
`GLASS_UI_LIGHTHOUSE_PORT ?? 5388` (the demo) + `5389` (the consumer harness) —
DISTINCT from the reserved house ports `:5173 / :5175 / :5199 / :5273 / :4178 /
:4188` (`:5199` is the `gate-manifest-sound` clause-4 live-demo default). The
origin resolves the `GLASS_UI_LIGHTHOUSE_URL ?? "http://localhost:<port>"`
env-override way. Two wire facts are asserted + recorded in the gate artefact:

- **gzip-on-the-wire** (`Content-Encoding: gzip` on the hashed JS/CSS asset) — so
  transfer sizes are production-representative (confirmed at HEAD: `gzip`).
- **SPA history-fallback** (a deep client route → 200, not 404) — confirmed at
  HEAD: `/forms/inputs` → 200.

### Lighthouse — GPU-backed (SwiftShader), four surfaces × two form-factors

`npx lighthouse` (pinned 13.4.0; LH + chrome-launcher are NOT repo deps — invoked
via npx, the Playwright-workspace pattern). Headless Chrome flags:
`--headless=new --enable-unsafe-swiftshader --no-sandbox --disable-dev-shm-usage`.

**GPU decision (the BP-96 fix).** Headless Chrome under the default `--disable-gpu`
has NO WebGL2 — `useWebGLCanvas` throws "WebGL2 unavailable", which `best-practices`
counts as an `errors-in-console` defect on the aurora/blob substrate pages (the
AY-era BP-96 measurement artefact). `--enable-unsafe-swiftshader` provides a
software GL2 rasteriser so the substrate pages paint + BP reads its real value. If
that flag is flaky on a runner (a known headless-LH limitation), the protocol's
fallback is to EXEMPT the single WebGL2-console-error class explicitly (recorded
here, the AY note's fallback) rather than loop on the headless config — the gate's
POINT is the perf/CLS/TBT floor; BP on the WebGL pages is the artefact axis.

**The `.1` HEAD observation — `NO_FCP` headless instability (the `.2` stabilization
concern).** A `.1` dry-run on the dev box (LH 13.4.0, headless SwiftShader) returned
`runtimeError: NO_FCP` ("the page did not paint any content … keep the browser
window in the foreground") with null category scores on the demo SPA's first paint.
This is a HEADLESS-rendering stability artefact (the heavy aurora hero + first chunk
under throttle did not reach FCP inside LH's wait window when the window is
backgrounded), NOT a gate-logic defect — the runner correctly NAMES it
(`extractScoreRow` surfaces `runtimeError`; a null score REDs fail-closed). The
orchestrator's `.2` live run stabilizes it (a warm-up navigation, a longer
`--max-wait-for-load`, a foregrounded headed window, or the documented
WebGL2-class exempt fallback). It is recorded here as the GPU/headless axis the
Triumvirate Dispatch anticipates — `.1` owns the protocol + runner; `.2` owns the
live measurement + the floor pin.

**The four audited surfaces** (re-confirmed at HEAD against `demo/router.ts` —
`/:category/:story`, `/` redirects to the first story):

| surface | route | note |
|---|---|---|
| home | `/foundations/intro` | front-door aurora HERO |
| aurora | `/substrates/aurora` | heaviest WebGL substrate + config dock |
| forms-inputs | `/forms/inputs` | clean primitives — shared-shell-cost canary |
| dock-overview | `/dock/overview` | GlassDock walkthrough |

**The two form factors.** Desktop: `--preset=desktop` (no throttle, 1350×940 —
holds trivially). Mobile: LH default (Moto-G-class 4× CPU + simulated slow-4G,
412×823) — **THE floor's bite**.

### Throttle honesty (the cardinal-lesson discipline)

The slow mobile numbers are the LAB throttle (Lantern-projected), NOT the host's
real paint. Where the observed (real) and simulated (Lantern) numbers diverge by
more than ~2×, BOTH are recorded in the `.2` DELTA (the AY slides 0.86s-observed vs
14.2s-projected is the canonical example). The gate floors on the SIMULATED-mobile
number (the worst-case throttle a real low-end phone hits) but records both.

## The score floor (`scripts/lighthouse/floor.baseline.json`)

The committed, reviewed per-surface floor the gate READS. The read-baseline-vs-
write-profile discipline mirrors `scripts/profile-bundle.mjs:42-51` — only the
deliberate `--rebaseline` flag re-pins it, so drift is a real measurement against
the last reviewed point (never self-erasing). At `.1` close it is PROVISIONAL,
pinned at the AY-era born-RED baseline SHAPE so the gate is genuinely RED; the
orchestrator re-pins at the post-fix achieved numbers in `.2`.

Floor shape (per surface × form-factor):

- **Desktop**: `perf ≥ 99` (forms 100), `a11y ≥ 100`, `CLS ≤ 0.04`.
- **Mobile (the bite)**: `perf ≥ <post-fix>`, `TBT ≤ 50ms`, `CLS ≤ <post-W-CARD-COMPOSITE>`, `a11y ≥ 100`.
- **Load levers (W3)**: mobile `render-block ms ≤ 100` (index.css; born-RED at ~602ms, GREEN after W-CSS-CRITICAL) AND `unused value.js KiB ≤ 4` on a substrate-free route (born-RED at ~21KiB, GREEN after W-PAYLOAD-DEFER).
- **Consumer harness (W4)**: the bare consumer's `render-block ms` + `LCP ms` clear the recorded consumer floor (born-RED until the W-CSS-CRITICAL `/styles`-split consumer-facing win lands).

The bite (anti-evasion): reverting the CSS split → render-block climbs back over
the ceiling → RED. The floor is the ACHIEVED number, NEVER a lowered bar (a wave
lowering the floor to dodge a regression fails the `--rebaseline`-only-via-review
discipline — the baseline is a committed, reviewed file).

## The minimal consumer harness (`scripts/lighthouse/consumer-app/`)

A bare single-route Vite app importing the PUBLISHED `@mkbabb/glass-ui` bundle +
`/styles` (aliased to the built `dist/` — the contract-v2 dev-resolution model) and
mounting ONE glass surface (a Card + a Button over a page wash). It proves the
PUBLISHED artefact's first paint, not the demo's (the demo imports library SOURCE;
a consumer imports the BUNDLE — they diverge, and only the consumer harness sees
the published `/styles` monolith the way a real app does). The harness does NOT
re-run the tailwind plugin over the already-compiled monolith (it imports
`dist/styles/index.css` as a plain pre-compiled asset, `cssMinify: false` so
lightningcss does not re-minify + trip on the monolith's `@source` doc-comment
apostrophes). At HEAD the consumer build ships the full `/styles` monolith
(822 KB raw / 231 KB gzip) — exactly the render-blocking first-paint cost
W-CSS-CRITICAL's `/styles` split targets.

## Born-RED proof (no live sweep needed at `.1`)

`grep -nE 'lighthouse' package.json` → 0 at HEAD (no key, no runner — the
never-owned axis). The gate's floor logic REDs against the AY-era born-RED reports
(`docs/tranches/AY/audit/design/lighthouse/*.report.json`) fed through
`extractScoreRow` + the floor checks: render-block 602ms > 100ms, unused value.js
21KiB > 4KiB, forms 92 < 95, aurora 81 < 90, dock 86 < 93 — every lever and every
mobile-perf floor RED on the pre-fix numbers. The live sweep + the floor re-pin is
the orchestrator's `.2` leg.

## Re-grounding notes (HEAD vs the AY baseline)

- The four surface routes RESOLVE at HEAD (`demo/router.ts` `/:category/:story`).
- The aurora a11y 90 (AY-era: 3 unnamed `LabeledField` sliders + 1 unlabeled color
  input) MUST be re-probed by `.2` — BA's W-CONFIG-CHASSIS minted `<ColorSwatch>`
  (the native color input is now the accessible carrier), so the color-input miss
  may already be CLOSED. If a slider-thumb `aria-input-field-name` residual remains,
  it is a DEMO-a11y fix owed to **W-CHIP-GRAZE / the demo-a11y arm** (the exact
  selector recorded there) — this gate FLOORS a11y, it does not wire the demo name.
- The AY numbers are the analysis SHAPE, NOT the floor. `.2` re-measures at HEAD
  (the AY baseline is 7+ months stale + pre-dates the BB sibling fixes) and pins
  the floor at the post-fix achieved number, never inherits the AY values.
