# AZ.W-BLOB-PAGE - the TRUE blob-page defect: watercolor-swatch fidelity, satellites-on-mount, hero-first staging

**Name**: W-BLOB-PAGE - the TRUE blob-page defect: watercolor-swatch fidelity, satellites-on-mount, hero-first staging
**Opens after**: AZ open (Batch 3; ‖ W-BLOB-STUDIO, W-MOTION-SUITE, W-SHELL-CONFIG, W-SHELL-IDENTITY)
**Track**: Band B (the blob) · **Type**: implementation (demo + one library default) · **Depends on**: W-GATES (proof:all crashable today)
**Hard gate**: born-RED `proof:blob-page` — the static-swatch edge is device-px-resolved (no CSS-px feTurbulence speckle), the page leads with the living GL bead, and the GL bead shows VISIBLE separated satellites orbiting-then-metaballing (orbitRadius > bodyRadius on the page's default config); π capture DELTA before/after, light+dark.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0 before any edit)

This wave starts from the fleet's mechanism findings, NOT a re-diagnosis. RE-GREP every cite below at HEAD before touching a file; the digest may compress line numbers. The BINDING re-attribution is `F2-R3-9-pixelation [REFUTED]` and `C6-1 [REFUTED]`: **the GL bead is NOT re-opened.** The renderer is crisp (backing-store 820×820 for a 410px CSS box = 2.002 px/CSS px at DPR 2 — `README.md:66` "crisp at any zoom" HOLDS). Anyone who "fixes pixelation" in the GL shader is fixing a refuted reading and the work is partial waste.

The fleet finding ids this wave executes (re-grep each):

| finding | verdict | what it means for this wave |
|---|---|---|
| `C6-1` / `F2-R3-9-pixelation` | REFUTED S3 | GL bead crisp; do NOT touch the renderer DPR/resolution. |
| `C6-2` | OPEN-DEFECT S2 | the "pixelation" IS the section-1 WatercolorDot SVG swatch edge (CSS-px feTurbulence). |
| `C6-3` / `F2-R3-9-satellites` | OPEN-DEFECT S2 | satellites orbit INSIDE the body (orbitRadius 0.17 < bodyRadius 0.22) — never separate; the absent-satellites half is the demo-config geometry, not a renderer gap. |
| `C6-4` | DESIGN-FINDING S2 | page IA: the prominent top hero is the static zero-GL swatch; the living GL bead is demoted to section 2 — the user reads the top as the living creature. Lead with the living bead. |
| `B10b-blob-static-swatch-R3-9` | DESIGN-FINDING S2 | the four top swatches are the static register with no satellites BY DESIGN — a fresh round-3 polish ask, not a band-2 regression. |
| `A1-2` | OPEN-DEFECT S1 | the close marked blob "live-verified"; R3-9 contradicts it post-close → re-opened per AY's own status legend. |

## §1 — Verified defect table (file:line at HEAD — RE-GREP)

| # | defect | evidence (file:line) | capture |
|---|---|---|---|
| D1 | the static swatch edge reads as coarse low-res speckle: the SVG filter renders at CSS-px resolution (`color-interpolation-filters="sRGB"`, region x/y −10% / width-height 120%), `feTurbulence baseFrequency="0.04" numOctaves="4" seed="2"`, `feDisplacementMap scale="1.5"` — at the large 246px swatch size the displaced contour is jagged/grainy (scattered dark pixels on the black swatch's left/bottom edge) | `src/components/custom/watercolor-dot/WatercolorDot.vue:89-112` | `ground/c6-blob-07-black-2x.png`, `ground/c6-blob-02-top-watercolor.png` |
| D2 | satellites never separate: the page-default `BLOB_CONFIG_DEFAULTS` sets `orbitRadius: 0.17` SMALLER than `bodyRadius: 0.22`, so the 3 satellites orbit INSIDE the body silhouette and merge entirely under the skin — across 5 timed frames the silhouette only pinches at the perimeter, never the distinct-droplet-orbits-then-metaballs-in show | `src/components/custom/goo-blob/types.ts:217` (bodyRadius 0.22), `:218` (satelliteCount 3), `:219` (satelliteRadius 0.082), `:220` (orbitRadius 0.17), `:224` (eccentricity 0.05) | `ground/c6-blob-11-satellite-strip.png` (5 frames: perimeter pinches only) |
| D3 | the wiring is CORRECT (not a bug to chase): the per-satellite pos/radius/opacity all upload, the phase machine cycles orbiting→merging→absorbed→emerging — the satellites ARE cycling, they're just geometrically swallowed | `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts:286-302` (sat upload), `src/components/custom/goo-blob/composables/useBlobSatellites.ts:203-269` (phase machine) | — |
| D4 | page IA leads with the wrong thing: section 1 ("The static register, WatercolorDot, zero GL") is the prominent top-of-page hero (static, satellite-free); the living GL bead is demoted to section 2 (the studio) — the user reads the top swatches AS the living creatures and finds them pixelated + satellite-less | `demo/stories/substrates/blob.vue:37` (section 1 static register comment), `:238` (static `<WatercolorDot>` mount), `:271` (`<GooBlob>` in section 2), `:349` (ambient `<WatercolorDot>`) | `ground/c6-blob-01-full.png`, `F2-r3-9-blob-full.png` |

## §2 — Goal criterion

The /substrates/blob page leads with the LIVING lit GL bead showing VISIBLE separated satellites that orbit out past the body skin and metaball back in — the show the user names — and the static WatercolorDot swatches that remain render a clean device-px edge with no coarse speckle. A fresh viewer landing on the page sees a living metaball creature first, not a row of pixelated static dots. The R3-9 dissatisfaction ("the main blobs at the top are pixelated and low res with no satellite blobs morphing/metaballing in and out") is resolved at its TRUE surfaces: the swatch fidelity (CSS half), the satellite geometry (a demo-config + a default-geometry change), and the page staging (demo IA).

## §3 — Scope

1. **WatercolorDot edge fidelity (D1).** Lift the SVG filter from CSS-px to device-px resolution so the displaced contour is crisp at the large swatch size. The mechanism is the `filterUnits`/`primitiveUnits` + filter-region grammar (a `userSpaceOnUse`/scaled-resolution path so the turbulence samples at backing-store density, not the 246px CSS box), OR drop the displacement amplitude/raise the octave density so the contour reads smooth at scale — the implementation agent picks the cheaper of the two that passes the edge-readback gate. This is a LIBRARY edit (`WatercolorDot.vue` is a shipped component, 2 demo mounts + the subpath export per `E4-6`); the change must NOT regress the WatercolorDot keep-evidence (the seeded-prng border-radius identity stays; only the filter resolution moves). NO new compositing seam.
2. **Satellite separation geometry (D2).** On the PAGE's default config, raise `orbitRadius` above `bodyRadius` so satellites orbit a visible distance outside the body skin and the metaball bridge reads as a stretching neck on emerge/absorb. The page consumes the default `BLOB_CONFIG_DEFAULTS`; the change is EITHER a re-tuned default in `types.ts` (if the AX.W15 four-side-containment re-solve still holds at the new orbit — re-verify the bead stays inside its 1.6× oversized canvas) OR a page-local config override on the section-2 `<GooBlob>` mount that dials orbitRadius out. PREFER the page-local override unless W-BLOB-STUDIO (the sibling) re-bases the default — coordinate so the two waves do not both write `types.ts` (see §3a disjointness).
3. **Hero-first page staging (D4).** Re-order the blob page IA so the LIVING GL bead (section 2 today) becomes the lead hero, and the static WatercolorDot swatch row is demoted to a "the static zero-GL register" supporting section below it (or retired if the living bead obsoletes it — keep ≥2 WatercolorDot demo mounts for the keep-evidence). The living hero stages at a generous size with satellites visibly cycling on mount (no click required to see the show).
4. **The born-RED gate `proof:blob-page`** (SPEC at §6) — the three conditions, each evidence-backed.

### §3a — Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the WatercolorDot filter-resolution fix cannot reach a clean edge without touching the seeded-prng border-radius helpers or the substrate canvas sizing, the scope-reveal trigger fires — the orchestrator triumvirates (research the SVG filter-region density path, plan-augment the bounds, redress). Do NOT silently expand into the GL renderer (refuted-closed).
- **Hard-gate failure not local-edit-recoverable**: if raising `orbitRadius` past `bodyRadius` re-breaks the AX.W15 four-side containment (the bead clips the canvas), the diagnostic-loop trigger fires on the third failed containment re-solve — triumvirate (the containment math is the research lane).
- **Disjointness with W-BLOB-STUDIO**: both waves touch the blob band. This wave owns the PAGE staging + the WatercolorDot filter + the page-default satellite geometry; W-BLOB-STUDIO owns the studio configurator + interaction/metaball/shadow tuning + the `types.ts` studio knobs. If both must write `types.ts`, sequence them (W-BLOB-PAGE first sets the page default, W-BLOB-STUDIO surfaces it as a live knob) — never parallel-write the file.

## §4 — File Bounds

| File | Access |
|---|---|
| `src/components/custom/watercolor-dot/WatercolorDot.vue` | modify (filter-resolution fix only — D1) |
| `demo/stories/substrates/blob.vue` | modify (page IA re-order + hero staging + page-local satellite override — D2/D4) |
| `src/components/custom/goo-blob/types.ts` | modify (ONLY if the page-default orbit re-tune lands in the default; coordinate disjointness with W-BLOB-STUDIO — PREFER page-local override) |
| `scripts/proof-blob-page.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register the gate row — coordinate with W-GATES which owns the manifest repair) |
| `docs/consumer-evidence/watercolor-dot.md` | modify (refresh the cited mount line numbers if the page re-order moves them) |

Do NOT touch: `src/components/custom/goo-blob/composables/buildMetaballProgram.ts`, `uploadBlobUniforms.ts`, `useMetaballRenderer.ts`, the `shaders/*.glsl.ts` set, `metaball.frag.ts` (the GL renderer is refuted-crisp — REFUTED-CLOSED). The aurora pipeline. The studio configurator block in `blob.vue` (W-BLOB-STUDIO owns it).

### §4a — Disjointness

No two agent units share a `modify` path. This wave runs as ONE agent unit (the surfaces are coupled — the page IA, the swatch fidelity, and the satellite geometry are one coherent fix). The only cross-wave conflict risk is `types.ts` and `scripts/gates.mjs`; both are sequenced (types.ts: page-local override preferred; gates.mjs: W-GATES lands first in Batch 0, this wave appends its row after).

## §5 — Agent Units

### AZ.W-BLOB-PAGE.1 the TRUE blob-page fidelity + staging

- **Goal**: the blob page leads with a large living GL bead whose satellites visibly orbit-out and metaball-in on mount, and every remaining static swatch renders a clean device-px edge.
- **Mechanism**: (a) WatercolorDot filter rendered at backing-store density (the filter-region/`primitiveUnits` density path or a smoothed displacement profile — D1); (b) the page-default/page-local satellite geometry dials `orbitRadius` past `bodyRadius` so the orbit show is visible at rest (D2); (c) the blob page IA re-orders so the GL hero leads (D4).
- **Files**: `WatercolorDot.vue`, `demo/stories/substrates/blob.vue`, `types.ts` (conditional), `scripts/proof-blob-page.mjs`, `scripts/gates.mjs`, `docs/consumer-evidence/watercolor-dot.md`.
- **Sub-gate**: `proof:blob-page` GREEN (the three conditions of §6) + the π DELTA pair on disk.

## §6 — Hard Gate (born-RED `proof:blob-page`)

The gate is a SPECIFICATION (clauses + bite descriptions), authored as `scripts/proof-blob-page.mjs` by the implementation agent. It is born-RED against HEAD (today the swatch speckles, the satellites hide, the static row leads). Bites:

1. **SWATCH-EDGE-CRISP π (born-RED).** Live-load /substrates/blob at `:5199`, capture a 3× device-scale-factor element shot of a static WatercolorDot swatch edge, and assert no coarse speckle: a per-pixel edge-roughness metric (e.g. the count of isolated dark pixels > N CSS-px from the displaced contour, or a high-frequency-energy threshold on the edge band) sits below the floor. RED today (`ground/c6-blob-07-black-2x.png` shows the scattered dark pixels); GREEN after the filter-resolution fix. The metric + threshold are recorded in the gate header.
2. **SATELLITES-SEPARATE π (born-RED).** Over a timed window on the page's default bead (no click), capture ≥5 frames and assert the silhouette shows a DISTINCT satellite separation (a connected-component count > 1 in at least one frame, OR a measured neck-pinch at the body→satellite bridge exceeding the perimeter-only baseline). RED today (`ground/c6-blob-11-satellite-strip.png` = perimeter pinches only, single component every frame); GREEN after `orbitRadius > bodyRadius`. The source-witness asserts the page's effective `orbitRadius > bodyRadius`.
3. **HERO-FIRST IA (deletion/order proof).** Assert the first interactive blob surface in DOM order on the page is the GL `<GooBlob>` hero (not the static `<WatercolorDot>` row) — a DOM-order check on the live page. RED today (static section 1 leads).
4. **IDENTITY-PRESERVED.** `proof:component-orphan` + the WatercolorDot keep-evidence (`E4-6`: ≥2 demo mounts, the evidence doc present) + the blob-render band fleet stay GREEN — the WatercolorDot seeded-prng border-radius identity and the cream GL bead survive.
5. **DELTA.** The captured before/after pair (swatch-edge 3× + the satellite strip + the page-IA overview), light+dark, per the cardinal protocol, on disk under `docs/tranches/AZ/audit/ground/` (own-wave-id prefix `W-BLOB-PAGE-`).

## §7 — Format And Lint Cadence

`npm run typecheck` after the WatercolorDot filter edit and at close; `npm run lint` (if present) on the demo SFC; `git diff --check` before close. The gate script runs under the repo's `vitest`/node convention (W-GATES owns the `:5199` server-default sweep — this gate must default `:5199`, never `:5173`, per the AZ scope fence).

## §8 — Verification Artefacts

- `docs/tranches/AZ/audit/ground/W-BLOB-PAGE-swatch-edge-{before,after}-3x.png`
- `docs/tranches/AZ/audit/ground/W-BLOB-PAGE-satellite-strip-{before,after}.png`
- `docs/tranches/AZ/audit/ground/W-BLOB-PAGE-page-ia-{before,after}-{light,dark}.png`
- `scripts/proof-blob-page.mjs` (the gate, on disk, GREEN)
- the `proof:blob-page` PASS log

## §9 — Commit Plan

- one implementation commit: `feat(AZ): blob-page TRUE defect — watercolor-swatch device-px fidelity + satellites-on-mount geometry + hero-first staging` (body: names the refuted-GL re-attribution, the three TRUE surfaces, the page-local vs default orbit decision taken).
- the gate-registration line folds into W-GATES' manifest commit OR a thin `chore(AZ): register proof:blob-page` if it lands after.
- a status commit at close (PROGRESS.md row).

## §10 — Dependencies

- **Depends on**: W-GATES (proof:all is crashable today — gates.mjs:689-691 malformed-row; the manifest must be repairable before this gate registers).
- **Blocks**: nothing hard; coordinates disjointness with W-BLOB-STUDIO (`types.ts`).

## §11 — Archaeology

Prior attempt: the AY blob band (W-BLOB-REBUILD / W-BLOB2 / W-BLOB3) marked the page "live-verified" (cream bead, orbiting satellites, smin merge) — but `A1-2` records the live result contradicts the close (R3-9). New guardrail: the §6 SATELLITES-SEPARATE bite is a MEASURED connected-component/neck-pinch readback over timed frames, not an "API exists" check — the AX.W15 containment re-solve traded the visible orbit for canvas-containment, and only a frame-readback catches the swallow. The C6-3 root cause (orbitRadius < bodyRadius) is the exact geometry the gate asserts against.
