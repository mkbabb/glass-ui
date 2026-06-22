# BF.W-DOCK-INTEGRATE — wire the fission/goo/bloom engines into a REAL library SFC (the load-bearing bar)

**Band 2 · Tier T4 · depends: W-VH-COMPOSE (T3) · W-FLIP-SPINE (T1) · W-SPIKE-DELETE (T2) · W-PI-AUTHOR (T2) · W-GESTALT-WIRE (T1)**

## The defect / the ask

The BE work built `useDockFission` (the n-ary detach orchestrator — `src/components/custom/dock/composables/useDockFission.ts`, ONE `SpringProgress`/`DOCK_SPRING` writing `--dock-split-t` + per-piece `--split-dx/--split-dy/--neck-t/--stretch`) + `DockGooFilter.vue` (the promoted library goo `<filter id="dock-fission-goo">` mount, sRGB-interpolated, non-zero host, generous region) + `fission-bridge.css` (the shipped `[data-fissioning] .dock-fission-bridge { filter: var(--dock-fission-goo-filter, none) }` recipe). All three are **exported from `/dock`** — and have **ZERO real SFC consumers**. A grep for `DockGooFilter`/`useDockFission`/`--dock-fission-goo-filter` over `src/` returns ONLY the engines themselves, the silhouette engine that imports the type, and the two CSS files.

The single site that writes `--dock-fission-goo-filter: url(#dock-fission-goo)` is **`src/styles/glass/liquid-morph.css:568`** — a 815-line block of **demo-content** sitting in `src/styles/glass/` (relocated to `demo/` by W-SPIKE-DELETE). So the shipped `fission-bridge.css` rule resolves its `var(--dock-fission-goo-filter, none)` to the **`none` fallback** on every real surface: the goo never paints in the library. `GlassDock.vue` (read it — 453 lines) consumes **none** of these engines: it owns the collapse/expand morph (`dockMorphContext`), the rail slot, the touch gate — but no fission, no goo `<filter>`, no bloom-to-fullscreen.

- **R1** (core dock MORPHS) — ENGINE LANDED, not integrated, unpainted.
- **R3 / R9** (goo SPLIT into free-floating glass pieces with metaball bridge) — ENGINE LANDED, FIDELITY GAP, **demo-private** (`url(#dock-fission-goo)` only in demo CSS).
- **R20** (bloom-to-fullscreen card) — PARTIAL; decide whether the fullscreen register composes the shipped `ExpandableContainer`.
- **D22** — the goo metaball DEMO-PRIVATE (`url(#dock-fission-goo)` only on the demo-only `.liquid-island-bridge`; no `src/` SFC renders it) → BUILD: ship the binding.

This is **the load-bearing bar** (§2 reframe 2): an engine with zero shipped-SFC consumers is dead substrate (J-inv-10). The library must OWN the goo; the demo demonstrates the vocabulary.

## The mechanism

Ship a **real library register** that composes the three engines — a new `<DockNowPlaying>` SFC (the iOS-27 Now-Playing fission surface) — and re-home the `url(#dock-fission-goo)` binding off the demo CSS onto a shipped seam. No new engine, no re-fork; every channel composes the shipped primitive.

1. **`<DockNowPlaying>` (`src/components/custom/dock/DockNowPlaying.vue`, exported from `/dock`).** The flagship library fission surface: ONE crisp glass pill at rest (a `.dock-fission-bridge` host, goo OFF) that **carves** into N free-floating glass pieces on the transport-split context. It COMPOSES, never re-implements:
   - **`useDockFission({ rootEl, signature })`** — the shipped orchestrator. The SFC `registerPiece({ el, vector, rank })` for each surviving transport control (the now-playing center anchor stays; the flanking transport pieces detach on the `media`=`lateral` signature), binds `@pointermove="fission.onPointerMove"` for the seam-tension, and calls `split()`/`merge()`/`toggle()` off the consumer's `v-model:fissioned`. The `--dock-split-t`/per-piece vars the orchestrator writes are consumed by the shipped `fission-bridge.css` (the SFC writes NO scalar of its own — the engine owns the spring).
   - **The pieces are `.dock-fission-piece` nodes** (the shipped recipe owns their `translate`/`scale`/neck `::before`/specular `::after`). The SFC supplies ONLY the per-piece content layout + a resting glass face — the demo `liquid-island-blob` pattern transposed into the library (warm-cream `--glass-bg-floating` register, NO injected hue — presets-in-consumers).
   - **The de-shadcn host** — the host is a real `<button>` with the UA chrome reset (the W-DESHADCN posture), its plate a `::before` reading `--glass-bg-floating` + the composed `--glass-blur-floating` (the a11y brackets reach it through `--glass-level`).
   - The bloom-to-fullscreen (below) is the `expand` affordance.

2. **Ship the `url(#dock-fission-goo)` binding onto a SHIPPED seam (off the demo CSS).** The `--dock-fission-goo-filter: url(#dock-fission-goo)` declaration moves into `src/styles/dock/fission-bridge.css` itself — bound on the shipped `[data-fissioning] .dock-fission-bridge` selector arm (a `:root`/`.dock-fission-bridge`-local declaration so the shipped rule's `var(--dock-fission-goo-filter, none)` resolves to the **real `url(#…)`** whenever the `<DockGooFilter>` mount is present). `<DockNowPlaying>` mounts `<DockGooFilter>` ONCE at its root (the mount-once-at-app-root discipline — the SFC mounts it for the consumer, never duplicating the id). The demo CSS's `--dock-fission-goo-filter` write becomes redundant and is deleted with the relocation (W-SPIKE-DELETE owns the file move; this wave owns the binding's new shipped home). The `[data-fissioning]` data-attr is set by the orchestrator past the carve threshold — already wired; this wave makes the var it gates resolve to the real filter in `src/`.

3. **The bloom-to-fullscreen composes the shipped `ExpandableContainer` (R20 decided — COMPOSE, not re-mint).** Read `src/components/custom/expandable-container/ExpandableContainer.vue` — it owns the `v-model:open` + `expand()`/`collapse()` callbacks + the `<Teleport :disabled="!open">` body-lock + Escape exit + the `glass-overlay` un-walled tier + the `data-part`/`#fullscreen-chrome` re-skin hooks (BC.W-EXPANDABLE-PART). `<DockNowPlaying>` wraps its expanded card in `<ExpandableContainer>`, and the pill→card bloom rides the shipped **`useLiquidReveal`** (the FLIP-inversion bloom from the trigger rect — after W-FLIP-SPINE folds `useBloomUp` onto it, `useLiquidReveal` IS the one bloom runner; the SFC composes it, no re-fork). The library keeps the BEHAVIOUR (body-lock/teleport/Escape), the bloom rides the one FLIP spine — there is NO second fullscreen mechanism, NO `useLiquidMorph` (deleted at W-SPIKE-DELETE).

4. **Second consumer for the ≥2 bar.** A `GlassDock` fission SEAM — `<GlassDock>` gains an additive `fission`-context pass-through (default off → byte-identical) so a nav/search dock can host the same `useDockFission` orchestrator on its own pieces (the `search`=`radial` / `nav`=`inward-merge` signatures). `<DockNowPlaying>` + the `GlassDock` fission seam = the ≥2 binary consumers, asserted as REAL `src/` call-sites (NOT markdown). Both ride compositor-only channels (transform/opacity/filter/clip-path — `proof:no-layout-animation`; the fission engine writes no layout property by construction).

## The gate — proof:dock-integrate (born-RED → GREEN)

Device-free SOURCE arm, `["local","ci"]` (the binding paint is the π + the gestalt row; `release` is gated behind the π-present check per D32 / W-PI-AUTHOR). The detector comment-strips first (the false-witness discipline) and exports a pure detector for the self-test.

- **C1 — a REAL SFC composes `useDockFission`.** `src/components/custom/dock/DockNowPlaying.vue` exists, imports `useDockFission` from `./composables/useDockFission`, calls `registerPiece(` ≥1 site + `split`/`merge`/`toggle`, and binds `onPointerMove`. The anti-evasion floor: the consumer is a `src/` SFC, NOT a `demo/` story and NOT a markdown keyword (the phantom-consumer class W-JUBILANCE-WIRE also kills). REDS on the pre-fix tree (no SFC consumer).
- **C2 — the goo binding resolves to a real `url(#…)` in `src/`.** `fission-bridge.css` (the SHIPPED file) declares `--dock-fission-goo-filter: url(#dock-fission-goo)` on a shipped selector (NOT only the `var(--dock-fission-goo-filter, none)` read), AND `src/styles/glass/liquid-morph.css` no longer carries the binding (it is relocated — W-SPIKE-DELETE coordination). The `none` fallback is no longer the only resolution in `src/`. REDS while the only writer is the demo CSS.
- **C3 — `<DockGooFilter>` is MOUNTED by the SFC.** `DockNowPlaying.vue` renders `<DockGooFilter` (the once-at-root mount), so the `<filter id="dock-fission-goo">` `<defs>` actually exists in the DOM the bridge references. A bridge that references an absent filter id is a no-op — the gate asserts the mount is present in a real SFC.
- **C4 — bloom-to-fullscreen COMPOSES `ExpandableContainer` + `useLiquidReveal`, no re-mint.** `DockNowPlaying.vue` renders `<ExpandableContainer` (the shipped body-lock/teleport/Escape) AND composes `useLiquidReveal` for the pill→card bloom; it imports NO `useLiquidMorph` (deleted), declares NO hand-rolled `<Teleport>`/body-overflow-lock/Escape handler of its own (the no-second-fullscreen-mechanism fence).
- **C5 — compositor-only + ≥2 REAL consumers.** No animated layout property in the SFC's own `<style>`/scalar writes (the reflow set), AND the gate enumerates ≥2 real `src/` call-sites of `useDockFission` (`DockNowPlaying.vue` + the `GlassDock` fission seam) — asserted as file paths that import-and-call, never a markdown count.
- **C6 — `/dock` barrel + api publication + colocation.** `DockNowPlaying` is re-exported from `src/components/custom/dock/index.ts` beside `GlassDock`/`DockGooFilter`/`useDockFission`; the SFC lives in the colocation dir; its props type is published.

**Self-test bites (each planted defect MUST red):** (a) the consumer is a `demo/` story not a `src/` SFC → C1 RED; (b) the goo binding only in the relocated demo CSS (no shipped writer) → C2 RED; (c) the SFC references `#dock-fission-goo` but mounts no `<DockGooFilter>` → C3 RED; (d) a hand-rolled `<Teleport>` body-lock instead of `<ExpandableContainer>` → C4 RED; (e) a `useLiquidMorph` import (the deleted spike) → C4 RED; (f) only ONE real `useDockFission` call-site → C5 RED; (g) an animated `inline-size`/`width` in the SFC style → C5 RED.

**What reds on the pre-fix tree:** every clause — no `DockNowPlaying.vue`, the goo binding lives only in demo CSS, `<DockGooFilter>` is mounted nowhere in `src/`, no `ExpandableContainer`-composing bloom register, ONE-or-zero real `useDockFission` consumers.

## The binding π — tests-visual/dock-integrate.spec.ts

The painted-truth readback, BOTH modes (light + dark) AND the **webkit project** (Safari-first, §6 — the goo is the regular `filter: url()` graph WebKit supports; this is the first chromium+webkit paint of the shipped goo):

- **Surface:** `demo/stories/dock/dock-nowplaying.vue` (the π capture surface — composes the SHIPPED `<DockNowPlaying>`, no demo-local re-fork) over `<DockStage>`'s live aurora backdrop, served at `:5199`.
- **The goo PAINTS in `src/`:** drive `split()`; assert the `.dock-fission-bridge` host carries `[data-fissioning]` AND its computed `filter` resolves to a real `url(#dock-fission-goo)` reference (NOT `none`) — the binding the demo-only CSS used to be the only source of. Capture the mid-fission frame: the pieces neck apart, the goo throat reads as a fused metaball filament (a getImageData scan across the gap reads continuous warm-cream alpha at mid-split, NOT two disjoint discs).
- **Bloom-to-fullscreen:** fire `expand` and assert the pill→card bloom runs from the pill rect (a transform-matrix FLIP captured at t≈0.3, scale < 1, origin at the pill), then the `<ExpandableContainer>` fullscreen card is teleported to body + Escape collapses it — the shipped behaviour intact.
- **PRM single-paint:** under `prefers-reduced-motion: reduce`, `split()` seats every piece synchronously at its `to` (zero neck frames, `--stretch` = 1) — one static frame.
- **The webkit arm** captures the SAME goo-neck mid-split on Safari (the sRGB-interpolated `<filter>` reads right — NOT the linearRGB-wrong waist).

## The gestalt row

**BF-roster surface: `dock-fission` (and `dock-nowplaying`).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture of the Now-Playing surface, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: the rest pill reads as ONE seamless liquid-glass module (no concave waist); the split reads as N free-floating glass pieces bridged by a real goo neck that SPANS the gap; the bloom reads as the card growing FROM the pill (not flying in). Born-FAIL on the BE tree (the surface is demo-private, the goo is `none` in `src/`); flips PASS at W-REFLECT on fresh pixels. Wired into the BF roster by W-GESTALT-WIRE.

## Fences

- **No-legacy / clean break.** The `url(#dock-fission-goo)` binding moves to its SHIPPED home; the demo CSS write is DELETED (no dual writer). NO `useLiquidMorph` (deleted at W-SPIKE-DELETE — the orphaned double-fork; D30). NO second fullscreen mechanism — `ExpandableContainer` owns the body-lock/teleport/Escape; the SFC composes it.
- **No re-fork.** The SFC COMPOSES `useDockFission` (the one fission engine), `useLiquidReveal` (the one bloom spine, post-W-FLIP-SPINE), `ExpandableContainer` (the one fullscreen register), `<DockGooFilter>` (the one goo mount). It re-implements NONE — no second spring, no hand-rolled `--dock-split-t` writer, no per-piece rAF.
- **Presets-in-consumers.** The album palette / app-specific now-playing hue lives in the consumer; `<DockNowPlaying>`'s default is the warm-cream `--glass-bg-floating` library identity. The album-derived per-piece shade (D26) is DEFERRED — it re-enters when `DockNowPlaying` ships its ≥2nd binary consumer (the GL color-seam fence).
- **The specific anti-pattern this must NOT become:** a `src/` SFC that imports `useDockFission` but never paints the goo (the binding still resolving to `none`), OR a markdown evidence file that NAMES `DockNowPlaying` as a consumer that doesn't render the engine (the phantom-consumer class). The gate asserts the goo binding resolves to a real `url(#…)` AND the π asserts the goo PAINTS — source-import alone is not the close.

## Disposition links

- **D22** — the goo metaball DEMO-PRIVATE → BUILD (ship the binding onto a shipped seam + a real SFC consumer). CLOSED.
- **R1 / R3 / R9 / R20** — integrate the fission/goo/bloom engines into a real library register; bloom-to-fullscreen composes `ExpandableContainer`. CLOSED (R3 fidelity-raise of the neck is W-FISSION-FILAMENT's; this wave ships the integration).
- **D30** — `useLiquidMorph` vs `useDockFission` double-fork → RETIRE the orphan (`useLiquidMorph` deleted at W-SPIKE-DELETE; this wave wires `useDockFission` as the surviving engine).
- **D26** (album-derived per-piece shade) — DEFER-with-trigger restated: re-enters when `DockNowPlaying` ships its ≥2nd binary consumer.
