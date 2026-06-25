# Pass-D first-principles — REMAINING vizzes + the union TRUTH/CONSOLIDATE foundation bands

**Lane** BD viz / pass-D first-principles · **Stance** RUTHLESS / SUBSTANCE-bar (trace the real code, not the doc) · **Scope** PLANNING audit, zero edits · **Branch** `prototype/liquid-dock`
**Grounded** against the ACTUAL `src/components/custom/constellation/`, `watercolor-dot/`, `glass-panel/`, `src/composables/glass/useGlassRenderer.ts`, `src/composables/motion/{useLiquidMorph,useLiquidReveal,useDockCtaReceive,useCelebrationBurst,useBloomUp}.ts`, `useDockContextSilhouette.ts`, `scripts/{proof-dock-context,proof-bc-fold-ledger,proof-no-layout-animation}.mjs`, `tests-visual/`, + the union `EXECUTION-DAG.md`/`UNIFIED-ROSTER.md` + the W-FOLD-LEDGER spec.

**VERDICT: the foundation Band-0 + Band-1 are SPEC-ONLY VAPOR for 5 of 6 waves, and one release-tagged gate (`proof:dock-context`) greens a CHARTER OVER DEAD CODE. The vizzes themselves are clean (constellation GPU-only ✓, watercolor-dot D1-exempt ✓), but the union's "truth gates everything" claim rests on unwritten spec files + a self-introduced soundness hole.** HARDEST first.

---

## H1 (HARDEST — RELEASE-TAGGED FALSE-GREEN OVER DEAD CODE) — `proof:dock-context` greens four type-literals in a def with ZERO runtime call-sites

`scripts/proof-dock-context.mjs:90-93` is verbatim:

```js
const kindBar = /["']bar["']/.test(src);
const kindBarPill = /["']bar\+pill["']/.test(src);
const kindSplit = /["']split["']/.test(src);
const kindSearch = /["']search["']/.test(src);
```

…where `src = stripComments(fs.silhouetteText)` and `silhouetteText` is `useDockContextSilhouette.ts` ONLY (`:66`). The gate asserts the four kinds are PRESENT as string literals in the type def. But I traced every importer of `useDockContextSilhouette`:
- `grep -rln useDockContextSilhouette src/ demo/` = the def itself + `demo/stories/dock/examples/AppSwitcher.vue`.
- `AppSwitcher.vue:3-4` mentions it ONLY in a COMMENT — and that comment REJECTS it: *"the silhouette engine is the context-SWITCH state machine — overkill for a single pill→grid"* → AppSwitcher composes `useBloomUp` instead.
- It is in ZERO barrels (`grep DockContextSilhouette src/composables/index.ts src/index.ts dock/composables/index.ts` = empty).

**So the gate is GREEN over a def NOTHING runs.** The four kinds exist as TYPE literals; the orchestrator that would `setSilhouette('bar+pill')` against live geometry does not run anywhere. This is the dock-hallmark-over-dead-code class PASSD-FOLD:24-25 named, confirmed at source. Meanwhile the LIVE sibling — `useDockFission`/`DockSplitContext` (published `index.ts`, 4 demo call-sites: `liquid-playground.vue`, `DynamicIslandCall.vue`, `DockExampleTile.vue`, `dock-gallery.vue`) — carries the REAL split mechanism the gate ignores. **FIX (already partly named by the DAG D9 amendment): `proof:dock-context` C1 must assert against the WIRED silhouette (a runtime call-site count ≥1, not a type-literal regex), and the dock band must wire-or-retire the dead engine** (`W-SILHOUETTE-REALIZE`, which DOES NOT EXIST as a file — see H2).

## H2 (UNBUILT FOUNDATION — the "truth gates everything" tier is 5/6 vapor) — Band-0 + Band-1 spec FILES are ABSENT

`EXECUTION-DAG.md:11-21` declares T0 (truth) + T1 (consolidate) as the literal-first waves every painting wave's verdict depends on. On disk:

| Wave | Tier | Spec file | Status |
|---|---|---|---|
| `W-FOLD-LEDGER` | T0 | `union/waves/W-FOLD-LEDGER.md` | **PRESENT** (detailed, sound design — see H3) |
| `W-GESTALT-WIRE` | T0 | — | **ABSENT** |
| `W-PI-AUTHOR` | T0 | — | **ABSENT** |
| `W-FLIP-SPINE` | T1 | — | **ABSENT** |
| `W-SPIKE-DELETE` | T1 | — | **ABSENT** |
| `W-VH-COMPOSE` | T1 | — | **ABSENT** |

`ls docs/tranches/BD/union/waves/*.md` = 21 files; the DAG names ~61 canonical union waves. The ENTIRE truth tier (minus the ledger) + the consolidate spine + the dock-integrate headline (`W-DOCK-INTEGRATE`, `W-SILHOUETTE-REALIZE` — also ABSENT, confirming the foundation critique's H-headline) are roster ROWS with no spec. The plan's own claim that "Band 0 lands FIRST so every later wave closes paint-true" rests on three unwritten files. **This is not a defect of the EXISTING specs — it is a planning-completeness hole: the convergence claimed for the union is over a roster, not over authored waves.** The waves must be AUTHORED before the DAG's acyclicity/sequencing is even checkable.

## H3 (`proof:fold-ledger` design is SOUND — but the F2.v tolerance is a self-introduced hole that the H2 vapor will exploit)

PASSD-FOLD asks: *is W-FOLD-LEDGER's `proof:fold-ledger` sound or another presence-regex?* Traced the precedent it inherits (`proof-bc-fold-ledger.mjs`):
- **The DESIGN is sound, NOT a presence-regex.** F2 genuinely `existsSync`-resolves each BUILD `wave` against `docs/tranches/BC/waves/BC.W-<id>.md` (`:97-99,205`) — a real file-resolution, not a string match. The self-test bites PERTURB (phantom-dest, stale-band, band-only) — these are real flags, not token-deletes. Credit: this is the CORRECT shape, the opposite of the `proof:concentric`/`proof:aur-kuwahara` false-green class.
- **BUT the union spec introduces F2.v — a dual-resolution tolerance that DEFEATS F2 for exactly the H2 vapor.** `W-FOLD-LEDGER.md:60` (F2.v): *"a V-wave whose spec is not yet on disk resolves IF its `BD.W-<id>` stem appears as a Band 11-15 row in VIZ-FINAL-ROSTER.md."* The spec frames this as an "authoring-window tolerance," but it means a BUILD row whose wave-FILE is absent passes by ROSTER-ROW presence alone. With 5/6 of Band-0/1 + the dock headline as roster-rows-without-files (H2), F2.v converts the ledger from a file-resolution gate BACK to a presence-regex for the whole unbuilt foundation. **FIX: F2.v must carry a SUNSET — the tolerance is legal ONLY while the V-enrollment task is open; at the close (`W-CUT`), EVERY BUILD row resolves to a real file or REDs. The ledger must NOT green a union whose truth tier is roster-only.**

## H4 (the union's ONE bloom spine — `W-FLIP-SPINE`/`W-SPIKE-DELETE` trace to REAL code; the DRY violation is genuine, the target is honest)

This is where the foundation is SOLID (the rare clean finding):
- **`W-SPIKE-DELETE` (delete `useLiquidMorph`) traces to real code.** `src/composables/motion/useLiquidMorph.ts` + `src/styles/glass/liquid-morph.css` EXIST, with 4 live demo consumers (`manifest.ts`, `DockExampleTile.vue`, `examples/Spotlight.vue`, `demo.css`). A genuine delete-with-relocate target, the `proof:no-dual-path` discipline applies cleanly.
- **`W-FLIP-SPINE`'s "5-way re-fork, NO fifth rAF" is a REAL DRY violation.** Traced the bloom impls: `useLiquidReveal` (4 rAF), `useDockCtaReceive` (4 rAF), `useCelebrationBurst` (3 rAF), `useBloomUp` (4 rAF) — each owns an INDEPENDENT `requestAnimationFrame` loop; they share only `springPreset` (`./springPresets`), NOT a FLIP runner. `useLiquidMorph` is the CSS/transition fifth. So 5 distinct bloom mechanisms, 4 forked rAF loops — the consolidation onto ONE `useElementBloom` runner is justified. CAVEAT: `useElementBloom` does NOT exist (`grep` = 0); it is the proposed mint, not a compose-the-existing 3-liner. The spec must own it as a NET-NEW runner that the 4 forks re-point onto (a real build), not understate it.

## SUBSTANCE-CLEAN (the vizzes themselves — verified, no false-green)

- **Constellation IS GPU-only (D1-compliant ✓).** `useConstellation.ts:19-21,377` imports + calls `createGpuSubstrate` (WebGPU instanced-points/-lines primary + WebGL2 twin); `composables/{constellationWGPUSetup,constellationGLSetup}.ts` + `shaders/` both present; ZERO `getContext("2d")` outside comment prose. The four Canvas2D draw passes RETIRED. No D1 violation.
- **`W-CONSTELLATION-STUDIO` "click-to-add" CONTRADICTS the engine — and the fold finding NEVER PROPAGATED.** Confirmed at source: `constellationTypes.ts:264` — *"node count is conserved (it is a designation, not a new node)"*; `constellationInteraction.ts:203-212` — the only click is `warpTo(nearest node)` (re-points focal, NO add; a click on the focal NO-OPS). PASSD-FOLD:44 named this, but it is UNRESOLVED in the live roster: `EXECUTION-DAG.md:154`, `UNIFIED-ROSTER.md:172`, `VIZ-BAND-PLAN.md:60` ALL still say "click-to-add." **FIX: re-scope W-CONSTELLATION-STUDIO to what the engine DOES (config + warp-to-node + keyboard step), OR build the add-node path honestly (the node-conserving engine cannot ship click-to-add as a 3-liner) — and DELETE "click-to-add" from the three roster docs.**
- **Watercolor-dot is legitimately CSS/SVG (D1-EXEMPT ✓, no hidden Canvas2D).** `WatercolorDot.vue:8` declares *"no WebGL/WebGPU/Canvas2D"*; the rAF (`useWatercolorBlob.ts:149,169`) writes a compositor `transform.value` (`:148`), NOT a raster — the silhouette is a static seeded `border-radius` morph + an internalized SVG turbulence `<filter>` rasterized ONCE (`:11-18`, the §H Safari-flash fix). No `getContext` anywhere. The deliberate suite counterexample — exempt is correct.

## MINOR / corrections to sibling critiques (substance, not noise)

- **`useGlassRenderer` Snell profile is PARABOLIC, not quartic — the foundation critique miscited it.** `useGlassRenderer.ts:70` is `profile = dist * (1 - dist * 0.3) * refractionStrength` (a parabola with linear edge falloff), NOT the `⁴√(1-(1-x)⁴)` quartic `passd-foundation.md:50` claims. The "CSS-gradient cannot encode the quartic" argument is over-stated — the actual bake is a simpler parabola. The CORE point still stands: it IS a Canvas2D `putImageData` displacement-map (`:55,79`) with 2 LIVE consumers (`GlassPanel.vue`, `DockGooFilter.vue`), so a GPU-only/CSS-gradient purge owes a MIGRATE-WITH-π — but the equivalence argument must be re-grounded on the REAL parabola.
- **`W-PI-AUTHOR`'s "absent binding-π layer" is OVERSTATED; the demo-scan gap is REAL.** The π LAYER exists — 155 `tests-visual/*.spec.ts` + `pi-runner-manifest.mjs` (the enrollment-soundness gate). What is absent is BD/union-SPECIFIC π specs (no dock-constellation/silhouette/nowplaying/maps-card/liquid-morph spec on disk). And the genuine gap: `proof:no-layout-animation` scans `src/styles` + `src/components` ONLY (`:285-286`), NOT `demo/` — so a demo SFC with a layout animation escapes. W-PI-AUTHOR's "widen the compositor scan to demo/" is a real fix; its "absent layer" framing is not.
