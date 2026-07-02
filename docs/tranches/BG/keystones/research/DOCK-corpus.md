# KS-DOCK · corpus grounding (research)

**Lane:** DOCK researcher (KS-B). **HEAD:** `tranche/BG` `29f280c8`. **Scope:** the F3 dock band —
waves 4.1 · 4.3 · 4.4 · 4.5 · 4.6 · 4.7 · 4.9 · **4.10 (VERBATIM-protected)** · 8.x Siri · 4.11 (F7).
**Output contract:** disk-true state + every facility enumerated + the settled decisions. Fences: this
file only; siblings read-only; cite `file:line`.

---

## 1. Disk-true dock state (AS-BUILT, `29f280c8`)

`src/components/custom/dock/` = **32 files, 6772 LOC**. The band is the largest, most coherent
re-architecture in the plan (C1: *"WS2 is the strongest band … a single `useDockSpring` engine, a
decomposed `GlassDock`, the dead 551L silhouette cut, two shell docks collapsed to one, and the
headline in-place V↔H morph"*, `pass-1/C1-bg-ws1-3.md:11-13`).

**God-modules over the 500 bound (RATCHET_BASELINES, `proof-no-god-module.mjs:48-176`):**
| file | LOC | drained by |
|---|---|---|
| `GlassDock.vue` | 711 | **4.4 W-DOCK-DECOMPOSE** (baseline #2) |
| `composables/useDockFission.ts` | 604 | **4.5 W-DOCK-FISSION-WIRE** (sole owner — R4) |
| `composables/useDockContextSilhouette.ts` | 551 | **10.5 dead-cut** (delete; 4.3 only VERIFIES — R1) |
| `styles/dock/fission-bridge.css` | 552 | **4.5** (co-drains; irreducible cascade partial per `:127`) |

Other leaves (all ≤500): `dockMorphContext.ts` 302 · `useLayerTransition.ts` 385 ·
`useDockShellProps.ts` 317 · `useDockOrientationMorph.ts` 307 · `useDockItemDrag.ts` 302 ·
`useDockState.ts` 454 · `useDockSearch.ts` 285 · `DockStack.vue` 238 · `DockLayerGroup.vue` 417 ·
`useDockClickIntegrity.ts` 202 · `dockMorphMeasure.ts` 188 · `useDockHold.ts` 140 ·
`railProjection.ts` 133 · `useDockMorphWindow.ts` 118 · `DockSection.vue` 115 · `constants.ts` 125.

**The 5 raw `SpringProgress` (the 4.1 unify target — `useDockSpring` DOES NOT EXIST on disk):**
`dockMorphContext.ts:176` · `useDockItemDrag.ts:106` · `useLayerTransition.ts:259` ·
`useDockOrientationMorph.ts:204` · `useDockFission.ts:484`. All read the frozen
`DOCK_SPRING {response:0.32, dampingFraction:0.7}` (`constants.ts:85`).

**Already-LANDED BD greenfield (do NOT re-litigate):** `dockMorphContext.ts:6-14,24-33` records
`BD.W-DOCK-CORE` shipped — the per-swap FLIP measure pipeline
(`measureAndArmMorph`/`seatTargetSync`/`rebaseSiblingSpans`/`forceNestedMaxContent`/`measureTo`/
`armRootMorphSpan`/`morphMinFloorPx`) is **DELETED**; the visible size is now the ratio-free
`--dock-live` convex blend of two measure-ONCE endpoints (`useDockExpandedSize` + `layers.css`), so the
`scaleX(~56)≈2451px` detonation is gone by construction. `[data-punching]` +
`--dock-punch-stretch` on `--ease-cartoon-punch` (the ~4% pre-dip/~22% overshoot, RETURN-to-1 never
latched — `dockMorphContext.ts:186-213`) is the cartoon channel. **LX.3 is landed** (`8947288a` — the
collapse-balloon/no-revert fix, locked by `proof:dock-engine` E4 reds-on-revert).

---

## 2. Every dock facility enumerated

**Components (14 SFCs):** `GlassDock` (the root — presentational `<div>`, no ARIA role;
`orientation` axis only, NO `variant` discriminant — AZ.W-DOCK-TAXONOMY) · `DockLayerGroup`/`DockLayer`
(multi-pane + optional switcher rail) · `DockSection`/`DockSeparator` (declarative tripartite
rail-core|section|nav chassis, `display:contents`, box-shrink-wrap inviolate) · `DockStack` (the ONE
rail engine, `mode="stack"|"facets"` — `DockStack.vue:9-46`) · `DockIconButton`/`DockTabButton` ·
`DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger` (teleport triggers) ·
`DockBackgroundToggle` (WCAG-2.2.2 pause/play).

**Composables (21):** the morph orchestrator (`dockMorphContext` — ONE spring/`--dock-morph-t`, the
`.is-active`/`.is-leaving` 3-state a11y hit-test contract) · `useDockOrientationMorph` (V↔H `--dock-morph-t`
driver, `useLiquidFlex` consumer #1) · `useLayerTransition` (axis-aware pane FLIP) ·
`dockMorphMeasure` (`dimOf` + `useDockExpandedSize`) · `useDockState` (collapse hysteresis — 60ms
intent-dwell + edge-sweep recheck, AZ.W-DOCK-FLICKER) · `useDockHold`/`useDockMorphWindow`
(asymmetric enter0/leave debounce) · `useDockItemDrag` (grab→squish→fling reorder) ·
`useDockFission` (n-ary detach — see §3) · `useDockContextSilhouette` (route→facet resolver, **dead-cut
target**) · `useDockSearch` (composes `useFuzzySearch`+`useVirtualSectionWindow`+`onSearch`) ·
`useDockClickIntegrity` (mid-morph tap guard) · `useDockShellProps` (the prop resolver) ·
`railProjection` (pure φ-tier carousel math — the harvested `useLiquidRail` remains, spring-free) ·
`dockContext`/`dockLayerContext` (DI).

**Registers & tokens:** selected-as-glass `--dock-control-active-bg` (glass tier, de-RED'd —
W-REGISTER-IOS) · `--dock-selected-accent` (foreground luminance-lift bar) · `--dock-control-safe-inset`
(10%-per-side painted-plate clearance, DC-2 lozenge fix, BA.W-DOCK-GEOMETRY) vs `--dock-content-safe-inset`
(content-side gutter, de-overloaded — BB.W-HIERARCHY2) · `--dock-scale`=`--ui-scale×--dock-local-scale`
(coarse `--dock-mobile-scale`/`--dock-coarse-scale` 0.78, AZ.R5-TOKENS) · `[data-preset="cockpit"]`
(fixed 2.75rem floor + `--dock-label-ratio`, BC.W-AX-DOCK-COCKPIT) · the hairline switcher-rail
(`--dock-layer-rail-divider`, AZ.W-DOCK-RAIL).

**The `.glass-dock-frame`/`#rail` non-clipping escape** (box-INVIOLATE `deltaW=deltaH=0`) — the seam
`DockStack` fans in, and the mount point Siri uses (§5). `containerName` is always-expanded-ONLY
(`container-type` freezes the morph — AY.W-DOCK2 §F1).

---

## 3. Fission — the iOS-27 headline (the largest gap is INTEGRATION, not engine)

`useDockFission` is a complete n-ary detach orchestrator (`useDockFission.ts:1-115`): ONE
`SpringProgress`/`DOCK_SPRING`, per-piece `--split-dx/dy`/`--i`/`--neck-t`/`--island-t`, `useLiquidFlex`
tanh recoil (cap ≤1.08), `usePointerVelocityField` seam-tension fed from INSIDE the loop, bidirectional
split↔merge, PRM sync-seat. The signatures are DATA (`DOCK_SPLIT_SIGNATURES` search=radial /
media=lateral / nav=inward-merge — `:63-120`); the goo mounts through the ONE shell-root
`#dock-fission-goo` (`DockGooFilter`, Safari-safe: sRGB, non-zero host, `-50%/200%` region, regular
`filter:url()` NOT `backdrop-filter:url` — WebKit bug 245510). `GlassDock.vue:373-430` wires
`:splittable`/`:splitContext`/`[data-dock-splittable]` auto-register + drag-to-split.

**BD-golden findings (`dock-fission/GOLDEN.md`) — mostly a SHAPE fix, live-spiked (§8, waist/body 0.31):**
- **The neck has NO structural waist.** Both `.dock-fission-neck` and `.dock-fission-piece::before`
  carve with `clip-path: inset(…)` — a constant-cross-section pinch that CANNOT yield a concavity.
  Cure: a STATIC HOURGLASS `clip-path: polygon(…)` (throat `--neck-waist` 0.34) + a `--neck-girth`
  bell (`GIRTH_FLOOR + sin(π·p)^1.5·SWELL`, orchestrator write) so it wells→pinches, not a monotone fade.
- **V↔H morph goo is a DEAD WIRE** — `morph-bridge.css:60` reads `--dock-bridge-goo-filter, none` and
  the var is set NOWHERE. One-token fix: `url(#dock-morph-goo)` under `[data-morphing]`.
- **Filter defaults razor-tight** (`blur 7`/`slope 20`/`offset −9`) vs the goo-morph sweet spot
  (`~10`/`~15`/`~−7`).
- **The one MISSING trigger — scroll-fission** (`useScrollChrome`→`useDockFission`, ~30-line
  composition on the shell). `useScrollChrome` EXISTS (`src/composables/motion/useScrollChrome.ts`);
  fission is consumed ONLY in demo stories (never wired to the live nav-dock, never scroll-driven —
  v3-dock-b `ANALYSIS.md:57-60`, the "single largest gap").

**BG lane mapping:** 4.5 W-DOCK-FISSION-WIRE re-points fission + drains the `604`/`552` baselines
(Fable: dock fission bloom · DS: /navigation). The BD hourglass-shape re-author + scroll-trigger +
dead-wire fix are the KEYSTONE deltas 4.5 should ELABORATE (they are BD goldens not yet folded into the
row text).

---

## 4. The video-spec mandate (v3-dock-b, `docs/tranches/BD/viz/video-audit/v3-dock-b/ANALYSIS.md`)

76-frame iOS-27 Apple-Music reference. The dock is TWO topological states driven by scroll: a unified
5-tab floating glass capsule ↔ a **3-capsule fission triad** `[Library●][◀player▶][●Search]` (media
signature — transport-center, nav-buds-flank; the exact glass-ui `media` shape). Three named gaps:
1. **Scroll-fission** (headline) — unassembled (→ 4.5 keystone delta).
2. **Nav-dock tab indicator** — `DockTabButton` lacks the SegmentedTabs liquid glide+squish indicator +
   per-glyph scale-pop + one-shot commit accent-flood (`ANALYSIS.md:52-55`; a BD `W-DOCK-TAB-INDICATOR`
   candidate — NOT in the 9-wave BG lane; fold-candidate note).
3. **Backdrop-blur engage** (Control-Center-over-app) — subsumed by the Siri `blur-engage` arm (§5).

Reference reads to hold: transmissive glass both modes (light `srgb .944/.903/.865`, dark
`.350/.295/.249`, R>G>B never gray), bloom-up sheet + live-behind collapse (both engines ship —
`useBloomUp` + `Drawer mode="live-behind"`), audacious √φ type. The active-tab vibrant-accent is a
CONSUMER accent (presets-in-consumers, not a library gap).

---

## 5. Siri (8.x W-SIRI-DOCK-CAPABILITY) — the ONE endorsed ADD, framed as a DOCK CAPABILITY

Settled (R4-ruling #4 + AMENDED §F3): Siri is a **dock capability** reached through the existing
`.glass-dock-frame`/`#rail` escape — **NO new published subpath, NO `api/index.ts` entry** ("augment the
dock, not a new component"); `SiriWaveform` ships **demo-private** (the `useGlassBackdropLuminance`
precedent) until a real 2nd binary consumer. WS6's four scripts collapse to ONE `proof:siri` with FOUR
arms: blur-engage · island · waveform+teal-navy-purge · dock-integration.

Mechanism (`BG-WS6-siri-capabilities/SPEC-pass1-converged.md`, the binding converged spec):
- **`useSiriIsland`** composes **`useDockSpring`** (HARD-GATED behind 4.1 — born-RED bite: ZERO
  `new SpringProgress` in `useSiriIsland.ts` AND imports `useDockSpring`, stays RED until 4.1 lands) +
  `useLiquidReveal`'s `ElementMorph` GEOMETRY (R1: NOT `preset:'dock'` — that is a TYPE ERROR;
  `LiquidRevealPreset = Extract<…,"snappy"|"bouncy">`). ONE `--siri-island-t` (registered §18, the
  `--island-t` collision is REAL — R8), four forms as DATA on a √φ ladder.
- **Content morph** = clip-aperture + OVERLAPPING per-form crossfade (max-opacity ≥0.9 at every seat,
  NO `abs()`, NO blank frame — R4); the content-clip layer owns the visible corner (no elliptical plate
  radius). `proof:no-layout-animation` holds (radius/transform only).
- **Blur-engage** (`W-GLASS-BLUR-ENGAGE`, lands first) = `filter:blur` on a wrapper of the REAL
  content's OWN pixels (NOT `backdrop-filter` — Safari snaps; R5), OVERSIZED `inset:-24px`, two dim modes
  (GLOBAL `::backdrop` / LOCAL panel), transition `filter`/`background-color` directly (never
  `--siri-island-t` in the list). ≥2-consumer bar met by drawer detent-glass T6.
- **Waveform** = ONE WebGL2 GLSL pass on `useWebGLCanvas` (NO `.wgsl` — R3), warm-DOMINANT prismatic
  lens-flare, in-shader OKLab-RECTANGULAR `procedural-color.glsl.ts` splice (R7, huePath-0 — NOT
  shorter-hue), push-API `level(0..1)`, warm-white core default (cyan = preset — R7b/`teal-navy-purge`).
- **Dock wire** = the "Search or Ask" pill IS the island's rest form, composing the EXISTING
  `useDockSearch` (ONE pipeline); box-inviolate; retires the cloned `DynamicIslandCall.vue` demo.

Precond chain: **8.x runs AFTER 4.1** (`useDockSpring`) and **BEFORE 4.3** (no silhouette reader survives).

---

## 6. The lane waves + settled decisions (binding)

| id | wave | disposition | keystone delta owed |
|---|---|---|---|
| 4.1 | W-DOCK-ENGINE-UNIFY | 5 `SpringProgress`→1 `useDockSpring`; 4-busy→1 `[data-morphing]` | **R6: pure INSTANCE consolidation reading frozen `{0.32,0.7}` — NO retune, ever, without an explicit orchestrator fence-lift.** `proof:dock-engine` E4 (LX.3 lock, reds-on-revert) PRESERVED. 5.2's "0.68/0.64 retune" language DELETED. |
| 4.3 | W-DOCK-CUT | **VERIFY-only** `useDockContextSilhouette` DEFINITION-ABSENT + dock-side clearance | **R1: 10.5 owns the DELETE + `AppSwitcher.vue` rework; 4.3 must NOT double-own.** Precond `10.5 ∈ preconds(4.3)`, and runs AFTER 8.x. |
| 4.4 | W-DOCK-DECOMPOSE | carve `GlassDock.vue:711`→leaves (single-writer; F6.5 references) | drains baseline #2; absorbs 5.1 leaf-verify as a post-carve clause. |
| 4.5 | W-DOCK-FISSION-WIRE | re-point fission; drains `604`+`552` | **R4 sole owner.** Elaborate the BD hourglass-neck + `--neck-girth` bell + dead V↔H goo-wire + scroll-fission composition. |
| 4.6 | W-DOCK-PERSISTENT-CUT | remove persistent ℱ brand + Fourier egg (`SidebarDock.vue:173`, `AppShell.vue:65`) | source-absent. |
| 4.7 | W-DOCK-CAP-SCROLL-FADE | capped axis IS a scroll axis; `useFadingScroll` soft edge | plate-clearance geometric guard (`--dock-control-safe-inset` × hover-scale < cell). |
| 4.9 | W-SHELL-DOCK-DRY | two shell docks (`SidebarDock`/`BottomDock`)→one `useShellNavDock` | **PROTECT: #9 in the 4.10 precond chain.** |
| 4.10 | W-DOCK-INPLACE-MORPH | **KEEP VERBATIM (UNTOUCHABLE §4)** — real V↔H morph replaces synthetic-dual-DOM + VT-crossfade + goo-filter | **A keystone spec may ELABORATE execution detail, NEVER alter scope/mechanism/preconds.** Hard-depends 4.1+4.9. `proof:dock-morph-insitu` M2/M4. Fable paint TENTPOLE. |
| 8.x | W-SIRI-DOCK-CAPABILITY | §5 — merged 8.1+8.2+8.3+8.4 → ONE `proof:siri` 4-arm | dock capability, no subpath/api entry, waveform demo-private, composes `useDockSearch`. |
| 4.11 | W-DOCK-STORY-MODULARIZE | **F7 (Demo)** — `liquid-playground.vue` protection assert PASSES; `dock-gallery.vue` label cleanup only | `proof:demo`. |

**Protected set (SYNTHESIS-PASS1 §4, INVIOLABLE):** `DOCK_SPRING {0.32,0.7}` byte-frozen (R6) · WS2's
dock band near-verbatim + 4.10 verbatim · `proof:dock-engine` E4 (LX.3) · `proof:constellation-gen` (LX.1).

---

## 7. Fold-candidate observations (record for orchestrator; do NOT self-insert a row)

1. **The BD dock-hub GOLDEN is UNBUILT and OUT of the 9-wave lane.** `useElementMorph`/`useDockHub`/
   `DockExpand`/`--dock-portal-t`/the `envelop` goo-tear + the four-bloom-engine collapse
   (`dock-hub/GOLDEN.md`) have ZERO hits in `src/`. It overlaps F5's `W-MOTION-SPINE` (the ONE
   ElementMorph runner) but the dock-hub facade + `<DockExpand>` are not scheduled. Keystone note, not a row.
2. **The de-overfit ENUM excision** (`DockSplitContext="search"|"media"|"nav"` on the PUBLIC shell,
   `GlassDock.vue:425,430` `if(ctx==="nav")`/`if(ctx==="media")dy*=0.25` — surface-TYPE branches in the
   shell; `useDockContextSilhouette.ts` dead `"search"` arm) is a BD-golden move NOT captured by any
   lane wave. Candidate to fold into 4.5 or the BH grammar band.
3. **`W-DOCK-TAB-INDICATOR`** (v3-dock-b gap #2 — nav-dock liquid indicator + scale-pop + accent-flood)
   has no BG home. Candidate fold into the Siri/dock-integration surface or a demo-composition.
4. **HandMark disclaimer:** the fission neck-specular/cartoon-cast is dock-local; do NOT conflate with
   the KS-HANDMARK hand-voice family.

---

## 8. SOTA references (named, for the keystone spec)

- **iOS-26/27 Liquid Glass** (Apple HIG, WWDC25) — the dynamic-island morph, scroll-collapse dock,
  transmissive-through-blur Control Center: the north-star the video audit measures against.
- **Metaball SVG goo** (the `feGaussianBlur`→`feColorMatrix` threshold trick, sRGB interp) — the
  Safari-safe fission mount; the "goo-morph GOLDEN" hourglass-neck finding is the concavity insurance.
- **Bridson curl-noise / Tessendorf** ride the viz lane, not dock (cross-ref only).
- **Material 3 spring-iff-spatial / bezier-iff-effect** (`docs/precepts/motion-canon.md` P1–P7) — the
  `--spring-dock` (spatial size/morph) vs `--ease-cartoon-punch` (the punch overshoot) split; DOCK_SPRING
  is the ONE weighty register (frozen).
- **Disney 12 laws** (`GREENFIELD-HARDENING-PLAN.md` edict) — the fission carries anticipation
  (island bud + pre-dip) · exaggeration (neck girth swell) · overshoot land (√φ share) · follow-through
  (specular sweep + moving cast) · arc; PRM zeroes all via `--motion-weight → 0`.
