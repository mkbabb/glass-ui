# AU.W10 — overfitting audit (the AU-landed artefacts)

The standing precept (`docs/audits/overfitting-audit.md`, §Invariant 5): every `src/` artefact has
**≥2 distinct usage sites OR is exported on the public surface OR is a demo-private/test helper**.
This audit runs that discipline over the artefacts AU landed in W5→W10 — the `/color` leaf, the
`useWebGLCanvas` substrate, the blob trio, the dock motion driver + composables, the W8b utilities +
`dock-controls.css`, the W9 dark-supply + props, and the W10 component splits. Read-only; no edit.

**Method.** For each artefact: def-site, public-surface flag (`rg` over `src/index.ts` / `src/api/`
/ the per-subpath entry + `package.json` exports), and distinct consumer count (`grep -rln` over
`src/` + `demo/`). The exact `grep` invocations are inline in each rationale. Verdict per the precept
precedence (`delete-unused > library-orphan > inline-and-remove > keep-current > demo-only-private >
keep`).

## The tally (PROPS — Public-surface / Reuse / Orphan-Posture / Per-wave Sites)

| artefact | wave | def-site | public-surface | distinct sites | verdict | rationale (grep) |
|---|---|---|---|---|---|---|
| `OklchStop` / `ColorResolver` / `oklchToLinear` / `oklchToGammaRgb` / `cssToOklch` / `oklchStopToHex` / `defaultBlobColorResolver` | W5 | `src/composables/color/index.ts` | **yes** (`/color` subpath + `/api`; aurora + goo-blob re-export) | ≥3 (color leaf + aurora `constants/presets.ts` + goo-blob `GooBlob.vue`/`useMetaballRenderer.ts`) | **keep** | `grep -rln "oklchToGammaRgb\|defaultBlobColorResolver" src/` → 3 files; `package.json` exports `./color` |
| `useWebGLCanvas` | W6 | `src/composables/glass/webgl/useWebGLCanvas.ts` | yes (`glass/` sub-tree) | 3 (aurora `runtime.ts` + goo-blob `GooBlob.vue`/`useMetaballRenderer.ts`) + 1 test | **keep** | `grep -rln "useWebGLCanvas" src/` → 5 (def + test + 3 consumers; the consumer-#2 vitest is the substrate-genericity proof) |
| `GooBlob.vue` + `composables/` + `shaders/` + `types.ts` | W7 | `src/components/custom/goo-blob/` | **yes** (`/goo-blob` subpath) | 2 (subpath export + `demo/stories/goo-blob.vue`) | **keep** | `grep -rln "GooBlob\|goo-blob" demo/` → `goo-blob.vue` + `manifest.ts`; `package.json` exports `./goo-blob` |
| `WatercolorDot.vue` + `useWatercolorBlob` + `prng.ts` | W7 | `src/components/custom/watercolor-dot/` | **yes** (`/watercolor-dot` subpath) | 2 (subpath export + `demo/stories/goo-blob.vue`) | **keep** | `useWatercolorBlob`/`prng` internal to the dir (`WatercolorDot.vue`→`useWatercolorBlob`→`prng`); `package.json` exports `./watercolor-dot` |
| `useLayerTransition` (single-frame FLIP) / `useDockState` / `dockContext` / `dockLayerContext` / `isTeleportedTarget` | W8 | `src/components/custom/dock/composables/` | yes (via `/dock`) | ≥2 each (GlassDock/DockLayer{,Group}; `isTeleportedTarget` ALSO HoverPopover) | **keep** | `grep -rln "isTeleportedTarget" src/` → HoverPopover + dock (cross-component reuse) |
| `--spring-dock` token + `proof:dock-motion-single-source` gate | W8 | `tokens.css` / `scripts/` | n/a (token + gate) | routed via `--dock-resize-spring`; gate registered | **keep** | token consumed by `dock.css`; gate in `gates.mjs` (ci) |
| `dock-controls.css` (five-control family carve-out) | W8b | `src/styles/dock-controls.css` | yes (`/styles` bundle) | imported by `src/styles/index.css` | **keep** | `grep -n "dock-controls" src/styles/index.css` → line 111 `@import` |
| `transition-control` / `transition-collapse` `@utility` + `w-popover` + `text-muted-foreground-strong` bridge | W8b | `src/styles/utilities.css` / `theme.css` | yes (`/styles`) | the 12-site design-idiom lift sites | **keep** | guarded by `proof:design-idiom-localization` (the lift's anti-regression) |
| `darkModeSyncScript()` / `installDarkModeSync()` / `useGlobalDark({initialValue})` | W9 | `src/composables/dark/` | **yes** (`/dark` + `/api`; `installDarkModeSync` on root + `/motion`) | demo story `use-dark-mode-sync.vue` + cross-repo speedtest/words consumers (W9 tally) | **keep** | `grep -rln "installDarkModeSync" demo/` → `use-dark-mode-sync.vue` + `manifest.ts`; tallied in `W9-consumers.json` |
| W9 props: `ConfiguratorLayer dividers` / Button `icon-sm` / Select `size` / Dialog `showClose` | W9 | the SFCs | yes (component public props) | each tallied ≥2 OR hygiene-tagged | **keep** | gated by `proof:au-w9-consumers` (born-green, bite-verified) |
| `ContinuousRail.vue` / `ContinuousMarkers.vue` | W10 | `src/components/custom/timeline/` | no (internal sub-components) | 1 orchestrator (`ContinuousTimeline.vue`) | **keep** (KISS split, the orchestrator IS the consumer) | `grep -rln "ContinuousRail\|ContinuousMarkers" src/` → consumed by `ContinuousTimeline.vue` |
| `useBouncySlider` (+ `UseBouncySliderParams`/`Return`) | W10 | `src/components/custom/tabs/composables/useBouncySlider.ts` | no (component-internal composable) | 1 (`BouncyToggle.vue`) | **keep** (colocated composable extract; the encapsulation fold's whole point) | `grep -rln "useBouncySlider" src/` → `BouncyToggle.vue` |
| aurora `constants/` (presets / renderMode / shaders) | W10 | `src/components/custom/aurora/constants/` | re-exported via aurora `index.ts` | ≥3 (Aurora.vue + runtime.ts + useAurora.ts + useCursorInteraction.ts) | **keep** | `grep -rln "./constants" src/components/custom/aurora/` → 7 files |

## Verdict distribution

| verdict | count |
|---|---|
| keep | 13 (artefact groups) |
| keep-current | 0 |
| inline-and-remove | 0 |
| demo-only-private | 0 |
| library-orphan | **0** |
| delete-unused | **0** |

## Result — ZERO orphans

**Zero orphans.** Every AU-landed `src/` artefact clears the bar: the W5/W7 leaves are exported on a
dedicated subpath (`/color`, `/goo-blob`, `/watercolor-dot`); the W6 substrate has 3 real consumers
(aurora + the two goo-blob facilities) plus the genericity vitest; the W8 dock composables each have
≥2 dock consumers (and `isTeleportedTarget` is cross-component — dock + HoverPopover); the W8b CSS
carve-out + utilities ship in `/styles` and are anti-regression-gated; the W9 supply is the
`proof:au-w9-consumers`-tallied set (≥2 distinct contexts XOR hygiene tag); and the W10 splits are
encapsulation extracts whose sole consumer is the orchestrator that produced them (the split's
intent — readability over a 901-line / 544-line monolith, not a new public abstraction).

The W10 component-internal artefacts (`ContinuousRail`, `ContinuousMarkers`, `useBouncySlider`) sit
at exactly 1 consumer BY DESIGN — they are not standalone abstractions seeking a second consumer;
they are the de-monolithed halves of a single orchestrator. The precept's `inline-and-remove` verdict
applies to "one-shot anonymous helpers that don't earn their abstraction"; a 432-line marker renderer
and a 217-line rail extracted to make a 901-line file legible is the opposite — the abstraction earns
itself on the readability axis the directive (D7) demanded. Verdict: **keep** for all three.

This audit output is cited by `proof:au-final` (ZERO-ORPHANS clause) and by `AU.FINAL.md`.
