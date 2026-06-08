# AX tranche — PROGRESS

The dock-first, visual-truth tranche. 46 waves (W00–W43 + W25a/b, W27a/b). W00 stands
up the fail-CLOSED π visual-runtime lane — the close-criterion machinery every
downstream visual wave depends on.

Status legend: `planned` · `in-progress` · `complete`. A wave is `complete` only when
audited GREEN against the LIVE product (the AX cardinal lesson: a green headless proof
over a black live canvas is NOT done).

| Wave | Title | Status |
|---|---|---|
| W00 | visual-runtime (π) lane | complete |
| W01 | single-scalar dock morph | complete |
| W02 | one morph-orchestrator per dock | complete |
| W03 | keepDockOpen host-native hold | complete |
| W04 | dock overflow wrap | complete |
| W05 | one iOS-spring vocabulary | planned |
| W06 | dock storybook honest rail + css split | planned |
| W07 | aurora core unblock — WGSL black canvas | complete |
| W08 | blob core unblock — smin distance regime | complete |
| W09 | specular tune to subtle | complete |
| W10 | aurora options converge — atoms door | complete |
| W11 | aurora color seams — OKLCh catchlight palette-ramp twin | complete |
| W12 | mediums substrate — strokeProfile + noise basis | complete |
| W13 | vangogh/oilpastel mediums — pigment compositing | planned |
| W14 | WebGPU painterly parity or excise | planned |
| W15 | blob contained droplet — lit warm-cream living membrane | complete |
| W16 | blob integration — interaction + perf + readme | complete |
| W17 | constellation tokens + warp + slides adopt | complete |
| W18 | storybook IA reinvention | planned |
| W19 | primitive prune A — header-ribbon/glyph-face/disco-glyph | planned |
| W20 | primitive fix — native top-layer, card toggles, glass-panel retire | planned |
| W21 | primitive recategorize — ledger/barrel coherence + metric reconcile | planned |
| W22 | font register reconciliation | planned |
| W23 | carousel indicator reauthor — glass scrubber decision | complete |
| W24 | deck-progress export + rail recipe | complete |
| W25a | CSS god-module gate extension | planned |
| W25b | CSS monolith carves | planned |
| W26 | TS god-module state encapsulation | planned |
| W27a | legacy gate hardening — barrel scrub, tag-parity, var/arbitrary guard | planned |
| W27b | legacy commentary full-tree sweep | planned |
| W28 | speedtest native-first receive | planned |
| W29 | repatriation prune + orphan prune | planned |
| W30 | slides baseline — constellation Canvas2D leak | planned |
| W31 | slides content reframe + visual defects | planned |
| W32 | slides motion-form adoption + deploy verify | planned |
| W33 | close — gate fleet, readmes, overfitting, inheritance, final | planned |
| W34 | cross-constellation idiom + consumer-adoption ledger | planned |
| W35 | keyframes prune + migration DAG | planned |
| W36 | forced-colors glass-language skin | planned |
| W37 | Canvas2D lifecycle + text-highlight substrates | complete |
| W38 | aurora configurator + glass-atoms restyle | planned |
| W39 | lighthouse perf/a11y route matrix | planned |
| W40 | demo-shell dock-nav coherence reaudit | planned |
| W41 | publisher cross-repo build supplier-edge | planned |
| W42 | liquid-morph substrate | planned |
| W43 | fourier-field first-class | planned |

## W00 — visual-runtime (π) lane — COMPLETE

Stood up the fail-CLOSED π visual-runtime workspace (`tests-visual/`, off the publish
surface), promoted `proof:dock-animation-live` from the fail-open SKIP to fail-CLOSED,
authored `proof:substrate-paints-color` (readPixels aurora + blob) and
`proof:gate-script-parity` (the proof-script ↔ package.json bijection meta-gate),
enumerated the 7 AW PENDING browserVerify re-probe obligations, and codified the live
re-diagnosis ritual + the paired-π DELTA compare-at-close protocol.

- Device ratified: `tests-visual/` workspace driving **Chrome-headless-new** (WebGL2 via
  ANGLE→SwiftShader + WebGPU via Dawn). See `audit/W00-pi-lane.json`.
- Device-free arms GREEN here: `proof:gate-script-parity` (bijection holds; RED-witness
  proven by removing a registration), the `--spring-dock` token-peak secondary
  (peak 1.04501 ≤ 1.046 baseline; RED-witness proven by a bouncier retune),
  `proof:resolution` + library `typecheck` (publish surface intact).
- The live readPixels + rAF-morph arms run on the real device in the orchestrator's lane
  (the agent sandbox has no browser binary).
- Standing roadblocks recorded in `audit/W00-pi-lane.json` (pre-existing AW drift the
  meta-gate caught: 6 orphan proof scripts + 2 dangling `proof:*` registrations +
  5 ci.yml/manifest drifts) — owed to their owner waves, not absorbed by W00.

## W04 + W12 + W23 + W24 band — COMPLETE (integrated + live-verified)

Cherry-picked the four lane branches onto the W03/W11/W16/W37 head, resolved the
additive `gates.mjs` / `package.json` conflicts (the bijection meta-gate confirms
0 new orphan/dangling/ghost), and audited GREEN on the real device. The integration
surfaced **two headless-green/visually-broken defects** (the AX cardinal lesson), both
root-caused + fixed + live-verified in `8a99689`:

- **W04 wrap did not wrap.** `max-inline-size: min(max-content, var(--dock-max-inline-size))`
  is INVALID CSS — `min()`/`max()`/`clamp()` reject the `max-content` intrinsic keyword,
  so the property was invalid-at-computed-value → computed `none` → the cap silently
  dropped (live `maxIS=none`, `rowCount=1`). Fixed to the valid `max-inline-size:
  var(--dock-max-inline-size)` over the base intrinsic shrink-wrap (live `rowCount=2`
  at 448px). The SOURCE arm now BITES on a `min(max-content` regression; the live-arm
  URL default moved `localhost`→`127.0.0.1` (vite binds IPv4 only).
- **Every expanded dock rested on the collapsed chrome.** `--dock-morph-t` is a
  registered `@property` (initial-value 0), so `var(--dock-morph-t, 1)` read 0 at REST
  (the fallback was dead) → `--dock-expand-t` resolved 0 on expanded docks → the wrap
  dock painted a 9999px pill + 0% floating shadow (not the 1.5rem card + full elevation)
  and every expanded dock painted the collapsed bg/border/padding endpoint. Fixed: the
  resting expand-t is stated STATICALLY per class; it tracks the spring scalar only while
  `[data-morphing]` is armed. Live-verified `expand-t=1` at rest, radius 24px, and the
  W01 morph still animates (`proof:dock-animation-live`: 26 rising frames, peak 1.046,
  onset 0ms).

Carry-forward (NOT absorbed — owned by later waves):
- **W12** `proof:no-god-module` REDs on 3 PRE-EXISTING >500-line violators out of W12
  bounds (`useMetaballRenderer.ts` 690, `constellationField.ts` 510, `GlassDock.vue` 505)
  → owed to **W26** (TS god-module state encapsulation).
- **W23** `proof:design-idiom-localization` RED at base (`ComboboxInput.vue`,
  `TabsTrigger.vue` arbitrary wraps) → owed to **W27a** (legacy gate hardening).
- **W24** `proof:no-legacy-commentary` RED at base (tranche-letter refs in
  `api/index.ts`, `src/index.ts`) → owed to **W27b** (legacy commentary full-tree sweep).
