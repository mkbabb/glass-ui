# Pass-E COMPONENT deep audit — `dock/morph-showcase`

**Page:** `demo/stories/dock/morph-showcase.vue` · **Import label (manifest):** `@mkbabb/glass-ui/dock`
**Underlying src component(s) the page demos (the AUDIT TARGET, not the demo):**

| Artifact | Path | Role |
|---|---|---|
| `useDockOrientationMorph` | `src/components/custom/dock/composables/useDockOrientationMorph.ts` | The V↔H driver demoed (one `SpringProgress` on `DOCK_SPRING` → `--dock-morph-t`; two-DOM-dock teardrop) |
| `useLiquidFlex` | `src/composables/motion/useLiquidFlex.ts` | The shared squish/size primitive the driver composes (`sizeStyle`/`stretch`) |
| `GlassDock` | `src/components/custom/dock/GlassDock.vue` | The morphing surface (vertical + horizontal docks) |
| `dockMorphContext` / `dockMorphMeasure` | `…/composables/dockMorphContext.ts`, `dockMorphMeasure.ts` | The PRODUCTION collapse/expand morph orchestrator (the correct compositor-transform reference this driver diverges from) |
| `startViewTransition` | `src/composables/motion/useViewTransition.ts` | The SHIPPED default (arm-c VT crossfade) |

No procedural-viz (aurora/blob/fourier) lives IN these components — the only GL on the route is `DockStage`'s shared offscreen-paused `<Aurora>` backdrop (audited separately). So §(2) PROCEDURAL-VIZ is **N/A for the target component**; the aurora-over-which-glass-reads requirement is a DEMO-composition concern surfaced under §(7) user-asks.

---

## §1 ANIMATION — affordance, spring physics, entrance/exit

- **Spring physics: PRESENT + correct.** The driver runs ONE `SpringProgress` on the `DOCK_SPRING` register (the dock's single clock), interruptible via velocity-continuous re-base (`runTo` reads `spring.velocity` and `reset(t, v)` on a mid-flight retarget — the iOS interruptible-physics contract), PRM via `respectReducedMotion` + an explicit `pin()` snap (zero motion frames, goo never paints). The `pin()` deterministic-capture seam is clean. This is genuine HIGH animation affordance on the morph axis.
- **DEAD/UNSHIPPED fidelity (the headline animation gap).** The amorphous metaball-teardrop — the register the USER named ("vertical dock flows as a teardrop into horizontal") — is **default-OFF behind a Switch**, because its per-frame `feGaussianBlur` goo + the live dock resize miss the 60fps budget under 4× throttle (p50 ~13.7-15.1ms, recorded). The SHIPPED default is a flat VT crossfade — correct + budget-clearing, but it is NOT the liquid morph the design north star asks for. The fidelity is "booked to a successor" but no BD wave carries that book → the teardrop is permanently demo-gated dead-on-arrival for the real user.
- **Four-state contract: N/A at the driver, INHERITED at the surface.** The morphing element is `GlassDock` (which carries hover/press/specular via the tier-root auto-arm); the `useDockOrientationMorph` driver itself is a headless size/opacity/squish projector — correctly so.

## §2 PROCEDURAL VIZ
N/A for the target component (no aurora/blob/fourier inside `useDockOrientationMorph`/`useLiquidFlex`/`GlassDock`). The `DockStage` aurora is a separate audit. **PRROCEDURAL-SUITE bar does not bind here.**

## §3 PERFORMANCE — the load-bearing finding

**The orientation driver VIOLATES motion-canon P5 / the `useLiquidFlex.sizeStyle` SIZESTYLE-LATENT contract — it animates `width`/`height` PER SPRING FRAME (a reflow storm).**

- `writeScalar(value)` (called once per spring frame from `play()`) calls `verticalFlex.drive(value)` + `horizontalFlex.drive(value)`; the demo binds `morph.verticalStyle` / `morph.horizontalStyle` (= `useLiquidFlex.sizeStyle`, the `{ height: "Npx" }` / `{ width: "Npx" }` writer) on the two live docks. So the vertical dock's `height` and the horizontal dock's `width` are re-written EVERY frame → layout + paint on every frame.
- This is EXACTLY the latent path the canon forbids: `useLiquidFlex.ts:92-104` JSDoc + `motion-canon.md` P5 state verbatim *"`sizeStyle` is the SETTLED-FOOTPRINT writer — a one-time reserve … NEVER the per-frame channel. The per-frame channel is `transform`."* The PRODUCTION dock morph (`dockMorphContext`) does it RIGHT — reserves the `to` footprint once and drives `transform: scaleX/scaleY(var(--dock-morph-scale))` per frame (CDP Layout track stays FLAT). The orientation driver did NOT adopt that discipline; it lerps the box dimension live.
- **Why it slips every gate:** `proof:no-layout-animation` scans `@keyframes`/`transition`/`<Transition>` recipe classes — NOT inline JS `:style` width/height writes from a composable. And the offending bind is in `demo/`, outside the gate's `src/` scope. So the violation is real, unguarded, and invisible to CI (`grep` of the allowlist confirms `useDockOrientationMorph`/`verticalStyle`/`dock-morph-pane--liquid` appear NOWHERE in `proof-no-layout-animation.mjs`).
- Offscreen-pause: the driver owns no rAF beyond the spring's `play()` loop which self-stops on settle — OK. No standing leak.

## §4 SAFARI compatibility
- **VT crossfade (shipped default):** `startViewTransition` is feature-detected with a no-VT instant path — degrades cleanly on Safari < 18 (no broken state).
- **Goo teardrop (preview):** SVG `feGaussianBlur` + `feColorMatrix` threshold is well-supported in Safari. BUT the per-frame goo repaint over a live-resizing element is the most expensive idiom on iOS Safari/Metal (the same `feGaussianBlur`-per-frame cost class that drove the budget miss); the preview is the worst-case path for the exact platform the north star targets. No Safari-specific guard.
- Compositor floor failing (§3) hits Safari hardest — per-frame layout on a `backdrop-filter` glass plate forces a backdrop re-rasterize every frame on WebKit.

## §5 IDIOMATIC / no-legacy / dual-path
- **DUAL-PATH (the architectural smell):** the showcase ships TWO morph mechanisms — the VT crossfade (default) AND the teardrop (preview Switch) — neither of which is the single canonical answer. The `dockMorphContext` already owns the correct reserved-footprint-`scale()` morph; `useDockOrientationMorph` re-implements a SECOND size-morph engine (with the P5 violation) instead of transposing the production discipline onto the V↔H topology. This is exactly the "no dual-path / fewer-sharper-primitives" SOTA bar BB.W-PRUNE-CONSOLIDATE codifies.
- **Demo authoring nit (real but minor):** `<GlassDock :background-canvas="backgroundCanvas" v-if=…>` places a bound attr BEFORE `v-if`/`orientation` on the SAME element (×4 sites). Vue tolerates order so it paints, but it is non-idiomatic + obscures the `v-if`/`v-else` pairing. (Demo-file scope.)
- **Superfluous language (user-ask):** the two intro `<p>` blocks restate the §7-perf-fork rationale at length ("the platform cannot continuously interpolate a mismatched-topology silhouette (a binding platform limit); the showcase respects that limit rather than fighting it" + the whole second paragraph). Tighten to one sentence each.

## §6 Glass six-layer composite
- **PRESENT via `GlassDock`** (the morphing surface is a real `.glass-dock`/`.glass-material` plate — backdrop blur+saturate, tint, rim, `::before` catch-light, shadow, grain all inherited from the tier). The driver/primitive add no glass of their own (correct). The teardrop BRIDGE (`.dock-morph-bridge-plate`) is a goo-merged CSS plate, NOT a six-layer glass surface — but it lives only at the occluded midpoint, so acceptable.

---

## Findings → BD tranche disposition

| # | Finding | Severity | Disposition | Wave |
|---|---|---|---|---|
| F1 | Orientation driver animates `width`/`height` per spring frame (P5 / SIZESTYLE-LATENT violation; reflow storm; Safari-worst) | **HIGH** | **MODIFY** — transpose the production `dockMorphContext` reserved-footprint-`scale()` discipline onto the V↔H driver: reserve both `to` boxes once, drive `transform: scaleX/scaleY` per frame; bind `stretchStyle`/`transform`, never `sizeStyle`, as the live channel | **AUGMENT `BD.W-DEEP-GLASS-20PX`'s sibling Band-2/compositor scope** — OR mint a new `BD.W-ORIENTATION-MORPH-COMPOSITOR` (no existing BD wave covers `useDockOrientationMorph`; FOLD-LEDGER candidate) |
| F2 | Per-frame width/height write is invisible to `proof:no-layout-animation` (gate scans CSS recipes, not composable JS `:style` writes) | MED | **AUGMENT** — extend the gate to assert `useLiquidFlex` consumers bind `stretchStyle`/`transform` and never `sizeStyle` as a live spring-frame channel (a source-grep arm over the driver) | new clause on the F1 wave |
| F3 | The amorphous teardrop (the user-named register) is permanently default-OFF/booked with no carrier wave | MED | **FOLD** the "teardrop-fidelity successor" book into a real BD row (re-decide budget on the rebuilt BC floor, like `BD.W-DEEP-GLASS-20PX` does for the deep-blur ceiling) | FOLD-LEDGER → re-decide row beside `BD.W-DEEP-GLASS-20PX` |
| F4 | Dual morph mechanism (VT crossfade + teardrop + the prod `scale()` morph = 3 dialects) | LOW-MED | **PRUNE/CONSOLIDATE** — make `useDockOrientationMorph` COMPOSE the `dockMorphContext` scalar discipline, not a second engine (the BB.W-PRUNE-CONSOLIDATE no-dual-path bar) | rolls into F1 |
| F5 | Demo: malformed attr order (`:background-canvas` before `v-if`); superfluous prose; subsections not each in own glassy card; main card not bigger | LOW | **MODIFY (demo)** — fix attr order, tighten the two `<p>`s, wrap each subsection in its own glass card, enlarge the stage, standardize the import label | demo-refresh wave (the Pass-E demo arm; cite `BD.W-PAGE-HEADER-FOLD` family if a demo-band wave exists) |

No PROCEDURAL-SUITE / GPU-only finding (no viz in the target). No Safari-fatal bug (degrades) — but F1 is the Safari-performance root and the binding fix.
