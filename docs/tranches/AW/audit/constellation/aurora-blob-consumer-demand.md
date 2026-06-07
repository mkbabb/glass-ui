# aurora-blob-consumer-demand — Aurora has 3 real consumers TODAY (speedtest + muster + value.js-demo, all on partial spread-from-default configs → forward-compatible with the whole AW aurora arc); the ONE genuine blob-adoption demand is value.js's demo, which runs a STALE LOCAL FORK that predates the shipped `colorResolver` seam; keyframes/fourier/words need NOTHING here

## Findings

### 1. The aurora public API at HEAD (3.3.0) is a stable, additive-only surface — and every AW aurora wave (W4/W5/W6/W8) is additive by construction

The shipped `@mkbabb/glass-ui/aurora` barrel (`src/components/custom/aurora/index.ts:1-37`) exports: the `Aurora` component, `useAurora` + `UseAuroraReturn`, `useCursorInteraction`, `createAurora` + `AuroraRuntimeMode`/`AuroraRuntimeOptions`, the `DEFAULT_AURORA_CONFIG`/`MAX_NUCLEI`/`MAX_STOPS` constants, the `AuroraConfig`/`AuroraNucleus`/`AuroraFlow`/`OklchStop` + medium/stroke/warp/flow union types, and the `cssToOklch`/`deriveAurora`/`hexToOklchStop`/`paletteToCssGradient`/`oklchStopToHex`/… color helpers + `AuroraHarmony`/`DeriveAuroraOptions`.

The `Aurora.vue` PROP contract (`Aurora.vue:40-90`): `config?: AuroraConfig` (factory-defaulted to `DEFAULT_AURORA_CONFIG`), `renderMode?: AuroraRenderMode` (default `"auto"`), `opacityCeiling?: number` (default `1`); `defineExpose({ config, … })` (`:132`). The `@init-error` channel is the `onInitError` runtime option (`useAurora.ts:189`), not a Vue emit — speedtest binds it as `@init-error` via the component's emit shim.

The `AuroraConfig` is a ~28-field schema (`presets.ts:68-106`). The AW deltas:
- **W4** (`AW.W4-aurora-painterly.md:3` scope) — `AuroraMedium` union GAINS `"vangogh"`, ADDITIVE (`presets.ts:48` `"smooth"|"pastel"|"watercolor"|"oil"` → +`"vangogh"`); new `uStrokeOrient`/`uLightDir`/`uLightColor` uniforms are internal; `strokeOrient` is a new config field, additive. No field removed.
- **W5** (`AW.W5-aurora-color-derive.md`) — `AuroraHarmony` union widens (split-comp/tetrad); a `huePath` config field is ADDED (the sibling `valuejs-aurora-color-seam.md:30-37` flags it should re-use value.js's `HueInterpolationMethod`). Additive.
- **W6** (`AW.W6-aurora-options.md:11,14,105`) — the `resolveAtoms(atoms)→AuroraConfig` mapper + `AuroraAtoms` type + `DEFAULT_ATOMS`. EXPLICITLY a "SUPERSET door (a new thin surface ADDED over the schema; no field removed, no prior behavior replaced), NOT a back-compat alias" (`:11`). `AuroraConfig` is "UNCHANGED (no field removed)" (`:105`); `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG` (machine-asserted, `:104`). The full schema stays the escape hatch.
- **W8** (`AW.W8-aurora-interactive.md:11,112`) — pointer interactivity is OPT-IN behind a config flag, default OFF; "the wispy-sky `DEFAULT_AURORA_CONFIG` is non-interactive and byte-unchanged" (`:112`).

**Net: the whole AW aurora arc is additive — no removed field, no renamed option, the wispy-sky default byte-preserved across every wave.** A consumer on a partial `{...DEFAULT_AURORA_CONFIG, palette, nuclei}` config does NOT migrate; it inherits the new defaults transparently.

### 2. The blob public API at HEAD requires an injected `colorResolver` (AU.W7 DEC-AT-2) — and the AW blob waves are additive behind a `lit` flag, but the W11 harmony-hoist touches the shared `/color` leaf

The `@mkbabb/glass-ui/goo-blob` barrel (`goo-blob/index.ts:1-21`) exports `GooBlob`, the `BlobMood`/`BlobConfig`/`MoodParams`/`MetaballSource`/`SatellitePhase`/`SatelliteInternal` types, `BLOB_CONFIG_DEFAULTS`/`BLOB_CONFIG_KEY`, and the `useBlobMood`/`useBlobPointer`/`useBlobSatellites`/`useMetaballRenderer` composables.

The `GooBlob.vue` props (`GooBlob.vue:31-35`): `color: string`, **`colorResolver: ColorResolver` (REQUIRED, no default)**, `config?: BlobConfig`, `seed?: string`; `defineExpose({ nudge, setMood, currentMood })` (`:88`). The `colorResolver` is the AU.W7 DEC-AT-2 injected color seam (`:3,19-21`) — the consumer hands in `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` or its own. `BlobConfig` is a ~30-field schema (`types.ts:58-98`).

The AW blob deltas:
- **W9** (`AW.W9-blob-droplet.md:42-44`) — adds `specStrength`/`specShininess`/`rimPower`/`rimStrength`/`lightDir`/`warpAmp`/`merge` fields + a `merge: "quadratic"|"circular"` axis to `BlobConfig`/`BLOB_CONFIG_DEFAULTS`, with "current-look-preserving defaults" and the lit terms "behind a `lit` flag so the flat fill stays the default look (zero regression for existing consumers)" (`:43-44`). Additive, default-OFF.
- **W11** (`AW.W11-blob-mood.md:1-4,28` scope) — iridescence (default LOW, `:28`) + SSS + `deriveBlobPalette(seed)` + the mood wire-or-cut. Additive defaults. **One coupling edge:** W11 scope 4 hoists `AuroraHarmony`/`deriveHue`/`gamutMapStop` into a shared `ColorHarmony` in the `/color` leaf — internal, but it is the cross-band convergence point that keeps blob + aurora on ONE harmony (the no-divergent-substrate invariant). Consumer-invisible.

**Net: blob too is additive behind a flag.** BUT a consumer adopting the `/goo-blob` SUBPATH today must supply `colorResolver` — that is the live API surface, not a future migration.

### 3. AURORA DEMAND — speedtest is the heaviest real consumer (`/aurora` subpath, partial config), forward-compatible with the entire AW aurora arc

speedtest pins `@mkbabb/glass-ui: ^3.1.0` (`speedtest/package.json:88`) and mounts `<Aurora>` as the hero backdrop via the lazy `/aurora` subpath (`speedtest/src/App.vue:38,224-225` `defineAsyncComponent(() => import("@mkbabb/glass-ui/aurora").then(m => m.Aurora))`). It binds `:opacity-ceiling` (`App.vue` + `useRouteTransition.ts:116`), `render-mode`, `@init-error` (`onAuroraInitError`, `App.vue:44,342`), holds the mount behind a rIC gate, and reads `AuroraApi` via `auroraRef`. Its config (`src/config/auroraConfig.ts:1-3`) is `useSpeedtestAuroraConfig()` — a 6-hue/6-nucleus preset that sets the FIELD names (`warpAmount`, `saturation`, `valueVariance`, the three drift knobs) it tunes; it is a partial author over the schema, NOT a full 28-field literal. NO blob usage (verified: zero `GooBlob`/`goo-blob` hits in `speedtest/src`).

Because every AW aurora wave is additive (Finding 1), speedtest's config + prop bindings survive 3.4/3.5 untouched. Its `opacityCeiling`/`renderMode`/`onInitError` are all on the stable prop contract (`Aurora.vue:67,83,189`). The W6 atoms door and W4 `vangogh` medium are *new options it could later opt into*, not migrations it is forced through.

### 4. AURORA DEMAND — muster mounts `<Aurora>` (local AuroraHost) on a `...DEFAULT_AURORA_CONFIG` spread + `/api`-imported types — the cleanest forward-compatible pattern

muster pins `^3.1.0` (`muster/frontend/package.json:19`) and mounts `<AuroraHost>` (`App.vue:34,197`) wrapping `<Aurora :config render-mode="auto" />`. Its config (`useAuroraConfig.ts:89` `MUSTER_AURORA_CONFIG`) is `{ ...DEFAULT_AURORA_CONFIG, palette: […], nuclei: […] }` — a 2-field override over the spread default, importing `DEFAULT_AURORA_CONFIG`/`AuroraConfig` from `@mkbabb/glass-ui/api` (`:47`). It binds `:opacity-ceiling="0.50"` (`styles.css:182`) and `render-mode="auto"` (the doc-cited prop contract, `useAuroraConfig.ts:28-30`). NO blob usage.

The `...DEFAULT_AURORA_CONFIG` spread is the textbook forward-compatible adoption: any field W4/W5/W6/W8 add to the default flows straight into muster's config with zero edit. muster is the safest aurora consumer in the constellation — it never enumerates the full schema, so additive growth is invisible to it.

### 5. THE ONE GENUINE BLOB-ADOPTION DEMAND — value.js's demo runs a STALE LOCAL FORK of goo-blob that predates the shipped `colorResolver` seam

value.js (`package.json:69` `file:../glass-ui`) is glass-ui's upstream color peer AND the name-forward blob-adoption target per UNION-COORDINATION. Its demo:
- **Aurora: ADOPTED via subpath.** `demo/color-picker/App.vue:107` imports `{ useAurora, DEFAULT_AURORA_CONFIG, AuroraConfig }` from `@mkbabb/glass-ui/aurora` and drives `useAurora(atmosphereCanvas, () => auroraConfig, { onInitError })` (`:212-214`) on a `reactive(structuredClone(DEFAULT_AURORA_CONFIG))` (`:212`) — a partial spread, forward-compatible.
- **Blob: NOT adopted — a LOCAL FORK.** `demo/@/components/custom/goo-blob/` is a verbatim local copy (`GooBlob.vue:11-19` imports `./types`, `./composables/useBlobMood`, etc. — RELATIVE, not the `@mkbabb/glass-ui/goo-blob` subpath). The demo `CLAUDE.md:78` is explicit: "consumes glass-ui pending — extirpation routes to a successor tranche post-glass-ui-ship". The local `BlobConfig` field names are **byte-identical** to the shipped `types.ts:58-98` (verified by field-name diff — same 30 fields). BUT the local `GooBlob.vue:31-34` props are `{ color, seed }` ONLY — **it has NO `colorResolver` prop**; it resolves color internally (the pre-DEC-AT-2 shape). The shipped `GooBlob.vue:31-35` REQUIRES `colorResolver: ColorResolver`.

**This is the single concrete blob migration in the entire constellation.** Migrating value.js demo from the local fork to `@mkbabb/glass-ui/goo-blob` is NOT a drop-in: the demo must (a) delete the ~6-file local fork, (b) import `GooBlob` from the subpath, (c) supply `colorResolver` (value.js is the natural home for a real `ColorResolver` — it owns the color parsing the resolver wraps; `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` works, or a value.js-native one), (d) re-point `BlobPane.vue:8` (`import type { BlobConfig } from "@components/custom/goo-blob"`) to the subpath. The W9 `lit`-flag + W11 iridescence land on TOP of this — so the cleanest sequence is migrate-to-subpath FIRST (against any 3.4.x that ships the AU.W7 `colorResolver` seam — already shipped in 3.3.0), THEN opt into W9/W11 lit/iridescence when those publish.

### 6. NO aurora/blob demand — keyframes.js, fourier, words (honest negatives)

- **keyframes.js** pins `^3.3.0` (`keyframes.js/package.json:89`) and its demo adopts `/dock` (`DockSelectTrigger`, `DockDropdownTrigger`), `/forms` (`Input`), `/controls` (`DarkModeToggle`), and root-barrel primitives (`EasingTarget.vue:103,111`, `app/App.vue:152-154`) — but **ZERO aurora/blob** (verified: no `Aurora`/`GooBlob`/`useAurora` import anywhere in `src`/`demo`). The UNION-COORDINATION name-forward adoption for keyframes is `/keyboard`, not aurora/blob. **keyframes needs NOTHING in this lane.** Forcing an aurora/blob showcase into the keyframes demo would be invented demand — its demo is an easing/spring instrument, and a WebGL backdrop is off-thesis.
- **fourier** pins `^3.1.0` (`fourier-analysis/web/package.json:14`) — ZERO aurora/blob (no hits in `web/src`). The hub repo is a FastAPI/Vue viz; no demand.
- **words** pins `^3.0.0` (`words/frontend/package.json:19`) — ZERO aurora/blob. No demand.

### 7. The two procedural backdrops are the two LARGEST subpaths — adoption is a payload decision, which is why they are async-wrapped today

Per `docs/tranches/K/audit/W4-subpath-sizes.md:10` (the table is from 2026-06-02, current enough — the chunk shapes are stable at HEAD), `dist/aurora.js` is the single largest entry at **16.2 KiB gzip** (50.2 KiB raw), and it transitively pulls the `keyframes-*` chunk (~35 KiB gz per `speedtest/App.vue:214`). This is WHY speedtest + muster both `defineAsyncComponent`/dynamic-import the Aurora and gate it behind rIC + intersection. A blob subpath is not in the K table (goo-blob shipped post-K at AU.W7), but it rides the same `useWebGLCanvas` substrate. **The wave spec MUST cite the async-wrap discipline as the binding adoption pattern** — neither aurora nor blob belongs on a synchronous critical-path import; both are hero-surface, idle-armed, offscreen-parked (the AV.W7 substrate the consumer inherits for free).

## Wave-forming input

### The API-stability contract a wave spec should cite (lift verbatim)

> **Aurora + blob public APIs are ADDITIVE-ONLY across the AW arc.** A consumer adopting `@mkbabb/glass-ui/aurora` or `/goo-blob` at 3.3.0 (or 3.4.x) does NOT migrate any binding when W4-W11 land. Specifically: `AuroraConfig` (`presets.ts:68-106`) gains fields (W4 `strokeOrient`, W5 `huePath`, W8 interactivity flag) but loses NONE; the `AuroraMedium` union GAINS `"vangogh"` (W4) but keeps `smooth`/`pastel`/`watercolor`/`oil`; `DEFAULT_AURORA_CONFIG` is byte-preserved (W6 machine-asserts `resolveAtoms(DEFAULT_ATOMS)` deep-equals it); the W6 `resolveAtoms` atoms door is a SUPERSET, not a replacement; W8 interactivity is opt-in default-off. `BlobConfig` (`types.ts:58-98`) gains W9 `spec*`/`rim*`/`lightDir`/`warpAmp`/`merge` + W11 iridescence/SSS fields, all behind a `lit` flag with current-look-preserving defaults (`AW.W9:43-44`). The `Aurora.vue` prop contract (`config`/`renderMode`/`opacityCeiling` + `onInitError`) and the `GooBlob.vue` prop contract (`color`/`colorResolver`/`config`/`seed` + `defineExpose nudge/setMood/currentMood`) are FROZEN across the arc. The ONE live API requirement (not a future migration): `/goo-blob` REQUIRES an injected `colorResolver: ColorResolver` (AU.W7 DEC-AT-2) — a consumer migrating off a pre-DEC-AT-2 fork must supply it.

### Per-consumer adopt-now-vs-wait sequencing

| Consumer | Aurora today | Blob today | Recommendation |
|---|---|---|---|
| **speedtest** | `<Aurora>` via `/aurora`, partial config, `opacity-ceiling`/`render-mode`/`@init-error` (`App.vue:38,224`) | none | **STAY — no action.** Additive arc; survives 3.4/3.5 untouched. OPTIONAL later: opt into W4 `vangogh` medium or W6 atoms door for a richer hero. NOT forced. |
| **muster** | `<Aurora>` via local AuroraHost, `...DEFAULT_AURORA_CONFIG` spread, `/api` types (`useAuroraConfig.ts:47,89`) | none | **STAY — no action.** The spread pattern is maximally forward-compatible. OPTIONAL later: W5 `deriveAurora` front-door could replace the hand-authored 2-stop palette with a seed-derived one. NOT forced. |
| **value.js demo** | `useAurora` via `/aurora`, partial config (`App.vue:107,212`) | **LOCAL FORK** (pre-`colorResolver`), `BlobPane`/`AuroraPane` chrome | **ADOPT NOW (blob), then fold.** (1) Migrate the local goo-blob fork → `@mkbabb/glass-ui/goo-blob` against ANY 3.4.x (the `colorResolver` seam is already in 3.3.0) — supply a value.js-native or `@mkbabb/glass-ui/color` `defaultBlobColorResolver`; delete the ~6-file fork; re-point `BlobPane.vue:8`. (2) THEN opt into W9 `lit`/W11 iridescence when published. Aurora arm needs no migration. This is the constellation's flagship blob-adoption demo per UNION-COORDINATION. |
| **fourier** | none | none | **NOTHING.** No demand; hub viz repo. |
| **words** | none | none | **NOTHING.** No demand. |
| **keyframes.js demo** | none | none | **NOTHING — and do NOT invent it.** Demo is an easing/spring instrument; its name-forward adoption is `/keyboard`. A WebGL backdrop is off-thesis (≥2-consumer / no-invented-demand invariant). |

### Sequencing edges (publish-gated)

- glass-ui **3.4.0** = AW.W1 dock-collapse fix (the publish-blocking regression). Aurora/blob waves (W4-W11) are NOT publish-blocking (`AW.W6:11`, `AW.W8:11`) — they ride a 3.5.0+ cut. So the constellation order is: 3.4.0 (dock fix) ships first → consumers that mount GlassDock bump to ^3.4.0 → aurora/blob folds land in a LATER publish.
- **value.js blob migration → ANY 3.4.x** (the `colorResolver` seam shipped in 3.3.0 — value.js can migrate the moment glass-ui publishes a dock-fixed 3.4.0 it would bump to anyway). It does NOT need to wait for W9/W11. Migrate the surface FIRST, opt into the lit/iridescent folds SECOND.
- The W5/W11 shared-`ColorHarmony` hoist into `/color` is consumer-invisible (internal leaf) — no consumer sequencing edge, but it is value.js-color-peer-adjacent: a wave spec should note value.js owns the color SCIENCE the hoisted harmony composes (per `valuejs-aurora-color-seam.md`).

### Gate sketch (consumer-side, for a wave that wants to lock the additive promise)

A `proof:aurora-blob-additive` canary the AW close could carry: snapshot the `AuroraConfig` + `BlobConfig` + `AuroraMedium` union + the `Aurora.vue`/`GooBlob.vue` prop key sets at 3.3.0; assert across the arc that NO key is REMOVED and NO union member is DROPPED (additive-only). Bite: remove a `BlobConfig` field or drop `"oil"` from `AuroraMedium` → RED. This makes the API-stability contract above machine-enforced rather than prose.

## Anti-findings (verified FINE / already done)

1. **The aurora arc does NOT break existing consumers.** Verified W4/W5/W6/W8 are all additive (`AW.W6:11,105` SUPERSET + UNCHANGED; `AW.W8:112` opt-in default-off). speedtest's + muster's partial configs survive untouched.
2. **muster's `...DEFAULT_AURORA_CONFIG` spread is the correct forward-compatible pattern** (`useAuroraConfig.ts:89`) — additive default growth is invisible to it. No anti-pattern.
3. **speedtest correctly uses the prop contract, not config fields, for `renderMode`/`opacityCeiling`** (`App.vue:44`, `useRouteTransition.ts:116`; muster's `useAuroraConfig.ts:28-30` doc-comment names the same discipline). Both honor that `renderMode` is a `<Aurora>` PROP not an `AuroraConfig` field.
4. **value.js demo's AURORA arm is already cleanly adopted via subpath** (`App.vue:107`) on a spread-from-default — no aurora migration needed, only the blob fork.
5. **keyframes/fourier/words carry ZERO aurora/blob** — confirmed by grep; the honest verdict is "needs nothing here," not invented demand.
6. **The blob `colorResolver` requirement is a CORRECT shipped contract** (AU.W7 DEC-AT-2, `GooBlob.vue:3,19-21,35`), not a defect — value.js's fork is simply stale relative to it, which is exactly the migration the demo CLAUDE.md flagged as "pending."

## Summary

Aurora has THREE real consumers at HEAD: speedtest (`/aurora` async, partial config, `opacity-ceiling`/`render-mode`/`@init-error` — `App.vue:38,224`), muster (`<AuroraHost>` over `...DEFAULT_AURORA_CONFIG` spread + `/api` types — `useAuroraConfig.ts:47,89`), and value.js's demo (`useAurora` via `/aurora`, spread-from-default — `App.vue:107,212`). ALL THREE author PARTIAL configs over the default, so they are forward-compatible with the ENTIRE AW aurora arc, which is additive-only by construction (W4 adds `"vangogh"` to the medium union; W5 adds `huePath`; W6 is a SUPERSET `resolveAtoms` atoms door with `AuroraConfig` UNCHANGED and `DEFAULT_AURORA_CONFIG` byte-preserved; W8 is opt-in default-off — `AW.W6:11,105`, `AW.W8:112`). The ONE genuine blob-adoption demand is value.js's demo, which runs a STALE LOCAL FORK of goo-blob (`demo/@/components/custom/goo-blob/`, relative imports, CLAUDE.md "consumes glass-ui pending") whose `GooBlob.vue:31` props are `{color, seed}` only — it PREDATES the shipped `colorResolver: ColorResolver` seam (AU.W7 DEC-AT-2, `GooBlob.vue:35`). Migrating it to `@mkbabb/glass-ui/goo-blob` requires supplying a `colorResolver` (value.js is the natural home) — NOT a drop-in, and the flagship constellation blob adoption per UNION-COORDINATION. keyframes.js (`^3.3.0`, dock/forms/keyboard only), fourier, and words carry ZERO aurora/blob and need NOTHING — inventing an aurora/blob showcase for the keyframes easing demo would violate the no-invented-demand invariant. Sequencing: 3.4.0 ships the dock-collapse fix (publish-blocking); aurora/blob folds ride a later 3.5.0+ cut (non-blocking); value.js can migrate its blob fork the moment it bumps to a dock-fixed ^3.4.0 (the `colorResolver` seam is already in 3.3.0) and opt into W9 `lit`/W11 iridescence later. The wave spec should cite the additive-only API-stability contract (above) and the async-wrap/idle-arm adoption discipline (aurora is the largest subpath at 16.2 KiB gz — `K/audit/W4-subpath-sizes.md:10`).

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/aurora-blob-consumer-demand.md
