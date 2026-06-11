# AZ.W-REFLECT — blob surface reflection record

**Surface:** blob (`/substrates/blob` — the page hero + the studio + the static WatercolorDot register + the conditional uBackdrop refraction + the cream-bead identity)
**Auditor lane:** blob · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `58c4265a` (AZ Batch 0–5 + R4/R5 corrective landed)
**Verdict:** **FAIL** (two real misses — one S2 mobile-stage collapse, one S2 configurator raw-key leak; both first-time-auditor "wtf"-class, both route to the triumvirate)

---

## 1 — RECAPITULATION (every blob audit item × discharging evidence × re-verified state)

| id | source | the user's words / mandate (condensed) | discharging wave + DELTA claim | RE-VERIFIED state (this audit) |
|---|---|---|---|---|
| R3-9 | USER-AUDIT R3 | "/substrates/blob still quite awful: the main blobs at the top are pixelated and low res with no satellite blobs morphing/metaballing in and out." | W-BLOB-PAGE: GL refuted-crisp; (D1) WatercolorDot device-px edge, (D2) orbitRadius 0.17→0.30 past bodyRadius 0.22, (D4) hero-first IA | **DESKTOP: HELD.** Bead is crisp warm-cream, satellites genuinely neck/orbit/separate (frame-0/1/2 + bead shots). Hero leads; static register demoted. **MOBILE: BROKEN** — stage canvas 0×0, bead invisible (Miss M1). |
| R3-10 | USER-AUDIT R3 | "blob studio good, but needs refinement: better interaction, metaballing, satellite options, shadowing; configurator design-hierarchy structuring." | W-BLOB-STUDIO: satellite layer, circular-merge default, grounded 2-rung shadow, louder-lean knob, primary→secondary→tertiary hierarchy | **PARTIAL.** Stage-fill hero, grounded shadow, satellite geometry layer, weighted preset row, dividers, layer order ALL present. BUT every slider row leaks the raw camelCase config key as a visible label (Miss M2). |
| B10 | AY USER-AUDIT | "/substrates/blob LARGELY BROKEN — pixelated, NO goo/satellite effects… the Configurator showcase section does not render. REBUILD FROM FIRST PRINCIPLES." | W-BLOB-PAGE + W-BLOB-STUDIO | **DESKTOP: HELD** — goo + satellites render, configurator renders, non-pixelated. **MOBILE: stage absent.** |
| B18 | AY USER-AUDIT | "/compositions/empty-states giant blob not deftly integrated… this blob reads better than the others. Redesign + the goo/satellites." | W-BLOB-PAGE (one blob identity; mascot scales from rebuilt hero) | Not re-walked this lane (empty-states is the shell lane's surface); the blob IDENTITY it inherits is confirmed crisp+warm here. |
| C6-1 / F2-R3-9-pixelation | FLEET | GL bead pixelation reading | **REFUTED S3** — GL crisp (backing-store 820×820 for 410px CSS box) | **REFUTATION HOLDS VISUALLY.** Bead element shots (light+dark) show a clean lit gradient, no pixelation at the silhouette or the necks. `proof:blob-page-fence` binds the renderer untouched. |
| C6-2 | FLEET | the "pixelation" IS the section-1 WatercolorDot SVG CSS-px feTurbulence edge | OPEN-DEFECT S2 → W-BLOB-PAGE D1 | **HELD** — swatch edges read smooth (4 swatches, `blob-static-register-light.png`); no coarse speckle. |
| C6-3 / C6-7 | FLEET | satellites orbit INSIDE body (orbitRadius<bodyRadius); studio exposes no geometry controls | OPEN-DEFECT/GAP S2 → page-local orbit 0.30 + studio Satellites layer | **HELD** — satellites separate on desktop; the Satellites layer exposes count/orbit/satellite-radius/eccentricity (label dump confirms). |
| C6-6 | FLEET | metaball merge creases at seam (smoothK 0.05 quadratic) | DESIGN S3 → circular-merge library default + studio smoothK knob (0.06 seed, 0.02–0.16 live) | **HELD** — bridge reads as a rounded gooey neck, not a hard pop (frame shots). |
| C6-8 | FLEET | shadow flat/ungrounded (single drop-shadow) | DESIGN S3 → 2-rung gel-dome (ambient + contact) | **HELD** — bead reads grounded; 2 drop-shadow rungs (π: rungs=2 both modes). |
| C6-9 / D5 | FLEET | interaction near-static at rest | DESIGN S3 → studio-only `responsiveness` knob (lean 0.10→0.45, stretch 0.5→2.0) | **HELD** — surfaced as a knob; calm default preserved. Not stress-driven live this lane (the knob is source-witnessed by `proof:blob-studio-config`). |
| C6-10 / F3-M11 | FLEET | configurator flat, no hierarchy | DESIGN S2 → dividers + weighted preset row + layer order | **PARTIAL** — hierarchy structure present, but the raw-key label leak (M2) undercuts the "refined" bar. |
| C6-11 / B1-W-BLOB-GLASS | FLEET / AY booked | uBackdrop Snell refraction (CONDITIONAL on G-PERF + G-BROWSER) | W-BLOB-STUDIO §3.7 closed **CONDITIONS-UNMET** — enamel stands (no high-contrast backdrop on the flat cream surface; no aurora behind; no DOM-pixel-read API; 2nd pipeline fenced) | **DISPOSITION HONEST + CORRECT.** The page bead sits over flat `bg-card/40` cream → a Snell refraction of a uniform field is ZERO displacement by physics. The CONDITIONS-UNMET close is the right call per the user's explicit conditional ("never a degraded ship"). Enamel-state shader byte-unchanged. |
| C6-12 | FLEET | live page console-clean, one GL context | VERIFIED S3 | **HELD** — direct probe: 0 console errors, 1 GL context, status 200. |
| A1-2 | FLEET | the AY close marked blob "live-verified"; R3-9 contradicted it | OPEN-DEFECT S1 → re-opened, re-built | The desktop re-build holds; this reflection re-opens the MOBILE arm (M1) the AY close again did not catch. |

**Gate roster (re-run live this audit, reusing :5199):**

| gate | desktop (chromium-headless-new) | coarse-touch (mobile 390px) | note |
|---|---|---|---|
| `proof:blob-page` | PASS (3/3) | — (device-free + desktop π) | swatch-crisp + satellites-separate + hero-first IA |
| `proof:blob-page-fence` | PASS | PASS | GL renderer untouched (pending-commit witness) |
| `proof:blob-studio-config` | PASS | PASS | device-free source-witness (satellite layer bound, hierarchy, merge rebase, louder-lean, shadow token) |
| `proof:blob-render` | **PASS (3/3, 9.7s)** | **FAIL (timeout)** | desktop binding truth GREEN; coarse-touch times out on a 0×0 hero canvas |
| `proof:blob-warm-default` | **PASS (2/2)** | **FAIL (timeout)** | desktop warm-cream identity GREEN; coarse-touch times out on the same 0×0 hero canvas |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit (SwiftShader/ANGLE, DSF 2–3). Stored beside this record.

**Capture list (literal filenames):**
- `blob-desktop-light-full.png` / `blob-desktop-dark-full.png` (1280×800, page hero IA)
- `blob-mobile-light-full.png` / `blob-mobile-dark-full.png` (390×844, page top)
- `blob-bead-light.png` / `blob-bead-dark.png` (element shot of the studio hero bead — cream identity + necking satellites + grounded shadow)
- `blob-studio-stage-light.png` / `blob-studio-stage-dark.png` (the stage + the configurator column)
- `blob-config-rows-light.png` (the ZOOM that proves the raw-key label leak — "Attraction" over "attraction")
- `blob-config-zoom-light.png` (configurator/breadcrumb context)
- `blob-static-register-light.png` (the demoted static WatercolorDot register — 4 clean swatches)
- `blob-page-bottom-light.png` / `blob-page-bottom2-light.png` (the bottom IA: static register + pause seam)
- `blob-swatch-black-edge-3x.png` (3× device-px swatch edge — no coarse speckle)
- `blob-satellite-frame-0.png` / `-1.png` / `-2.png` (timed frames — satellites neck/orbit/separate)
- `blob-mobile-stage-light.png` (the MISS evidence — the mobile studio with NO visible bead)

**π readbacks (measured live this audit):**
- Studio hero canvas bbox (desktop, both modes): **696.375 × 696.375 px** (the 1.6× overflow square for the necking satellites; stage-fill HELD; matches the DELTA's 1.246 stage-fill ratio).
- Centre offset: bead centered in the stage column (visual + DELTA 0.023 ≤ 0.14 floor).
- Console: **0 errors**, **1 GL context**, status 200 (C6-12 HELD).
- Grounded-shadow rungs: **2** (gel-dome composite HELD).
- Configurator label dump (DOM `<label>` text, in order): `Attraction, attraction, Click impulse, clickImpulse, Responsiveness, responsiveness, Mood, mood, Seed, Harmony, harmony, Stops, Satellites, satelliteCount, Orbit radius, orbitRadius, Satellite radius, satelliteRadius, Eccentricity, eccentricity, Merge bridge, smoothK, Merge variant, merge` — **every interactive row carries a duplicate raw camelCase key as a visible label** (Miss M2).
- Mobile (390px) studio hero canvas: **rect 0 × 0** at x195/y389 after scrollIntoView — `visibility:visible` but zero layout size → Playwright reads it hidden, the user sees nothing (Miss M1).

**The GL-crispness refutation (REFUTED-crisp) — re-verified VISUALLY:** the bead element shots (`blob-bead-{light,dark}.png`) show a clean lit cream gradient with smooth silhouette + smooth necks at the satellite bridges; no pixel-grid speckle, no low-res banding at any zoom. The refutation HOLDS — anyone "fixing pixelation" in the shader would be fixing nothing. `proof:blob-page-fence` machine-binds the renderer untouched.

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk)

Walking `/substrates/blob` cold:

- **Desktop** reads FINISHED: a large living cream creature leads, its satellites visibly orbit-neck-merge, a grounded gel shadow sits it on the stage, a structured configurator (weighted presets → Interaction → Mood → Geometry/Satellites) sits beside it, the static WatercolorDot register is honestly demoted below with clean swatch edges, and the pause-seam closes the page. The uBackdrop CONDITIONS-UNMET disposition is recorded honestly and is physically correct. **This half is a PASS.**
- **TWO things draw an immediate "wtf":**
  1. **On a phone, there is no bead.** The hero — the entire point of the page — collapses to a 0×0 canvas; the mobile user scrolls past a configurator that controls an invisible creature. This is the AY "live-verified" trap recurring on the mobile arm (A1-2 again): desktop green, mobile broken.
  2. **The configurator shows raw code identifiers.** Under every proper label sits the internal property name in a LARGER/heavier weight — `clickImpulse`, `satelliteCount`, `orbitRadius`, `smoothK`, `eccentricity`, `responsiveness`. A first-time auditor reads these as leaked developer strings. This directly undercuts the R3-10/C6-10 "configurator needs refinement + design-hierarchy structuring" mandate the wave was built to satisfy.

Per the protocol's bar (a "wtf" is a FAIL even if every ledger row is green), the surface FAILs.

---

## 4 — MISSES (severity-graded, evidence-anchored → the triumvirate)

### M1 — [S2] The studio hero bead collapses to 0×0 on the mobile/coarse-touch viewport — the creature is invisible on a phone

- **What:** On the 390px (coarse-touch) layout the studio stage canvas `goo-blob-canvas` resolves to a `0×0` rect (`visibility:visible` but zero layout size). The hero bead — the page's entire purpose — does not paint. The mobile user sees the configurator controlling nothing.
- **Evidence:** `blob-mobile-stage-light.png` (configurator visible, no bead); live π — canvas rect `{rectW:0, rectH:0, x:195, y:389}` after scrollIntoView on a 390×844 context; `proof:blob-render` **coarse-touch FAILS** (`TimeoutError: locator … to be visible — 43× resolved to hidden <canvas …>`) while **chromium-headless-new PASSES (3/3)**; `proof:blob-warm-default` identical split (desktop 2/2 PASS, coarse-touch timeout). Root cause: the stage uses `h-full` on `#stage` and the bead wrapper is `aspect-square h-[min(78%,30rem)]` (`blob.vue:434,447`); when the Configurator layout stacks vertically on a narrow viewport the stage slot gets no resolved height → `h-full` → 0.
- **Why it matters:** This is the A1-2 "live-verified-but-broken" class re-occurring — the AY close marked blob live-verified, R3-9 re-opened it, and the rebuilt page STILL ships a viewport where the hero is absent. The user audits on mobile-class viewports (the R5 slides-consumer findings are phone-driven). Two roster gates RED on it.
- **Triumvirate hand-off:** RESEARCH the stage-height collapse (the `#stage` slot must assert a min-height / aspect-driven height that survives the stacked mobile layout, not inherit `h-full` from a zero-height parent); PLAN a `blob.vue` stage-sizing wave (demo-local; possibly a `min-h-[...]` floor on the stage or an aspect-ratio box); REDRESS + re-run the coarse-touch arms of `proof:blob-render` + `proof:blob-warm-default` to GREEN.

### M2 — [S2] Every configurator slider/select row leaks its raw camelCase config key as a visible label

- **What:** Each `<ConfiguratorRow label="Attraction">` wraps a `<LabeledSlider … label="attraction">`, so BOTH render: the human label ("Attraction", secondary weight) AND the raw key ("attraction", larger/heavier — it reads as the primary line). Affected rows: `attraction`, `clickImpulse`, `responsiveness`, `mood`, `harmony`, `satelliteCount`, `orbitRadius`, `satelliteRadius`, `eccentricity`, `smoothK`, `merge`.
- **Evidence:** `blob-config-rows-light.png` (the zoom — "Attraction" above the heavier "attraction" above the slider track); DOM label dump (§2) listing every label twice (human + raw key); source `demo/stories/substrates/blob.vue:487–516` (the `ConfiguratorRow label="Attraction"` → `LabeledSlider label="attraction"` double-label pattern, repeated for every row).
- **Why it matters:** R3-10 + C6-10 + R3-8 explicitly demanded the configurator be REFINED with design-hierarchy structuring; the wave delivered the structure (dividers, weighted presets, layer order) but ships internal property identifiers as visible chrome. A first-time auditor reads `clickImpulse`/`satelliteCount`/`smoothK` as leaked code. The `proof:blob-studio-config` source-witness passed because it checks the human ConfiguratorRow labels + binding, not that the inner LabeledSlider label is human-readable — the gate has a blind spot here.
- **Triumvirate hand-off:** RESEARCH the intended LabeledSlider label semantics (is the inner `label` meant to be a value readout, a units hint, or removed when the ConfiguratorRow already labels the row?); PLAN the fix (either drop the redundant inner `label`, or make it a human descriptor/value, or have LabeledSlider suppress its label inside a labeled ConfiguratorRow); REDRESS `blob.vue` (and audit the aurora studio + any other ConfiguratorRow+LabeledSlider site for the same leak — likely shared); add a gate bite that asserts no raw camelCase identifier renders as visible configurator text.

### Non-misses confirmed (recorded so the triumvirate does NOT re-touch them)

- **GL crispness** — REFUTED-crisp HOLDS visually; do NOT touch the renderer.
- **uBackdrop refraction** — CONDITIONS-UNMET is correct (flat cream backdrop → zero Snell displacement by physics; no aurora behind; no DOM-pixel-read API). Enamel stands. Do NOT re-open.
- **Cream-bead identity** — HELD in both modes (desktop `proof:blob-warm-default` + `proof:blob-render` green; bead shots warm-cream).
- **Satellite metaballing, grounded shadow, hero-first IA, static-register demotion + clean swatch edges, circular merge bridge** — all HELD on desktop.

---

## 5 — VERDICT

**FAIL.** The desktop blob is finished and beautiful — the cream creature, the necking satellites, the gel shadow, the structured studio, the honest uBackdrop disposition, the refuted-crisp GL all hold. But two S2 first-time-auditor "wtf" misses block the PASS: (M1) the hero bead is invisible on a phone — the live-verified-but-mobile-broken class recurring, with two roster gates RED on the coarse-touch arm; and (M2) the configurator the user demanded be refined leaks raw camelCase property names as visible labels on every row. Both route to the triumvirate (research → plan → redress → re-reflect). The surface re-reflects from protocol step 2 once both land.
