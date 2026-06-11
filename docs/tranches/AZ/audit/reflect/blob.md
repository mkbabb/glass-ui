# AZ.W-REFLECT — blob surface RE-REFLECTION (pass 2)

**Surface:** blob (`/substrates/blob` — the GooBlob studio hero + the cream-bead identity + the
static WatercolorDot zero-GL register + the conditional uBackdrop refraction + the configurator
hierarchy)
**Auditor lane:** blob (re-reflection, second pass — judged AFRESH as a first-time auditor) ·
**Date:** 2026-06-11 · **Branch:** tranche/AY @ `d95b5d33` (W-CLOSE; the W-BLOB-REDRESS redress
`90bf11e5` is IN this HEAD)
**Verdict:** **PASS**

> This is the SECOND reflection pass. Pass 1 (now git history of this file) returned **FAIL** on two
> S2 first-time-auditor misses; both were redressed at the ROOT (commit `90bf11e5`) and are
> re-verified CLOSED live below with fresh captures + π readbacks + GREEN gates. No new miss rises to
> S1/S2. The surface is FINISHED.

---

## 0 — PASS-1 MISSES × REDRESS × RE-VERIFIED-AFRESH (the headline of this pass)

| pass-1 miss | sev | the defect | redress (commit `90bf11e5`) | RE-VERIFIED LIVE THIS PASS |
|---|---|---|---|---|
| **M1** | S2 | The studio hero bead collapsed to a **0×0** canvas on the 390px coarse viewport — the creature was invisible on a phone; `proof:blob-render` + `proof:blob-warm-default` RED on the coarse-touch arm. | Root-fixed in `Configurator.vue`: the single-column band sets an EXPLICIT `grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)]` (reset `lg:grid-rows-none` so desktop is byte-unchanged) + a new `--configurator-stage-min: 18rem` token; the bead wrapper re-based to a true square `aspect-square w-full max-h-[78%] max-w-[min(78%,30rem)]`. | **CLOSED.** Live π (390×844, dpr 3): `goo-blob-canvas` **300×300 CSS / 600×600 backing** (was 0×0), `visibility:visible`, `grid-template-rows: 288px 270px` (the 18rem=288px stage track resolved), canvas at x45 (centered with margin). Capture `rr-blob-mobile-studio-dark.png` shows the cream bead PAINTING on the phone. Both gates GREEN on the coarse-touch arm (below). |
| **M2** | S2 | Every configurator slider/select row leaked its **raw camelCase config key** as a visible label (`clickImpulse`, `satelliteCount`, `orbitRadius`, `smoothK`, `eccentricity`, `responsiveness`…) — a first-time auditor reads leaked dev strings; undercut the R3-10 "configurator refinement" mandate. | The house `hideLabel` seam wired on BOTH leaking consumers: `blob.vue` (11 rows) + `compositions/configurator.vue` (4 rows). The inner `Labeled*` gets a HUMAN `label` + `hide-label` (label kept in DOM `sr-only` for the `for`/`id` a11y association); the raw key moves to the `ConfiguratorRow` `name` mono token-caption slot. Aurora studio was already correct (untouched). | **CLOSED.** Live DOM audit: **24 `<label>` total → 13 VISIBLE, all human-readable** ("Attraction", "Click impulse", "Responsiveness", "Mood", "Seed", "Harmony", "Stops", "Satellites", "Orbit radius", "Satellite radius", "Eccentricity", "Merge bridge", "Merge variant") with **ZERO camelCase leaks among visible labels**; **11 sr-only twins** carry the `for` attr (e.g. "Attraction"→`for=v-19`) so axe `label` still passes. Raw keys render only in the small mono `name` caption (`attraction`, `clickImpulse`, `satelliteCount`, `orbitRadius`, `smoothK`). Captures `rr-blob-bead-desktop-light.png` + `rr-blob-static-register-light.png` show the clean human-label-primary / mono-key-tertiary hierarchy across Interaction + Mood + Geometry sections. Source: 11 `hide-label` in `blob.vue`, 4 in `compositions/configurator.vue`. |

**Gate re-run at HEAD (the two pass-1 RED coarse arms + the source witness):**

| gate | pass-1 | THIS PASS (live at HEAD) |
|---|---|---|
| `proof:blob-render` | desktop 3/3 PASS, **coarse-touch FAIL (timeout on 0×0)** | **PASS — 6/6** (desktop + coarse-touch both green) |
| `proof:blob-warm-default` | desktop 2/2 PASS, **coarse-touch FAIL (timeout)** | **PASS — 4/4** (both arms) |
| `proof:blob-studio-config` | PASS | **PASS** (SATELLITE-LAYER-BOUND + CONFIGURATOR-HIERARCHY + MERGE-DEFAULT-REBASE + LOUDER-LEAN-SURFACED + GROUNDED-SHADOW-TOKEN) |

---

## 1 — RECAPITULATION (every blob audit item × discharging evidence × re-verified state)

| id | source | the user's words / mandate (condensed) | discharging wave | RE-VERIFIED state (this pass) |
|---|---|---|---|---|
| R3-9 | USER-AUDIT R3 | "/substrates/blob still quite awful: the main blobs at the top are pixelated and low res with no satellite blobs morphing/metaballing in and out." | W-BLOB-PAGE | **HELD desktop + mobile.** Bead crisp warm-cream (768×768 CSS / 1536 backing desktop; 300/600 mobile), no pixelation at silhouette or necks. Satellites genuinely orbit/neck/SEPARATE — `rr-blob-static-register-light.png` shows a fully-detached lower droplet with a gooey bridge; `rr-blob-bead-desktop-light.png` shows a necking satellite at lower-left. rAF live (20 frames/500ms → animating). |
| R3-10 | USER-AUDIT R3 | "blob studio good, but needs refinement: better interaction, metaballing, satellite options, shadowing; configurator design-hierarchy structuring." | W-BLOB-STUDIO + W-BLOB-REDRESS | **HELD.** Stage-fill hero, 2-rung gel shadow (π rungs=2 on `goo-blob-wrapper`), Satellites geometry layer (count/orbit/sat-radius/eccentricity rows live), weighted preset row (Calm/Excited/Shy), per-section dividers, primary→secondary→tertiary layer order (Interaction → Mood+palette → Geometry/Satellites). The M2 raw-key leak that undercut "refined" in pass-1 is now GONE. |
| B10 | AY USER-AUDIT | "/substrates/blob LARGELY BROKEN — pixelated, NO goo/satellite effects… Configurator showcase does not render. REBUILD." | W-BLOB-PAGE + W-BLOB-STUDIO | **HELD both viewports** — goo + satellites render, configurator renders + reads clean, non-pixelated, on desktop AND phone. |
| C6-1 / F2-R3-9 | FLEET | GL bead pixelation reading | **REFUTED-crisp** — GL backing 1536px for a 768px CSS box (2× DSF) | **REFUTATION HOLDS VISUALLY** — bead element shots (light+dark) show a clean lit cream gradient, no pixel-grid speckle. `proof:blob-page-fence` binds the renderer untouched. Do NOT touch the shader. |
| C6-2 | FLEET | the "pixelation" IS the section-1 WatercolorDot SVG feTurbulence edge | OPEN→W-BLOB-PAGE D1 | **HELD** — `rr-blob-static-register-light.png`: 40×40 swatches + a 245px feature dot read smooth, no coarse speckle. |
| C6-3 / C6-7 | FLEET | satellites orbit INSIDE body; studio exposes no geometry controls | page orbit 0.30 + studio Satellites layer | **HELD** — satellites separate OUTSIDE the body live; the Satellites layer exposes count/orbit/satellite-radius/eccentricity (DOM label audit confirms all four rows). |
| C6-6 | FLEET | metaball merge creases at seam | circular-merge library default + studio smoothK knob | **HELD** — bridge reads as a rounded gooey neck, not a hard pop (bead + static-register shots). |
| C6-8 | FLEET | shadow flat/ungrounded | 2-rung gel-dome (ambient + contact) | **HELD** — π: 2 drop-shadow rungs on `goo-blob-wrapper`; bead reads grounded over the stage. |
| C6-9 / D5 | FLEET | interaction near-static at rest | studio `responsiveness` knob (louder-lean) | **HELD** — surfaced as a knob (Interaction → Responsiveness row live); calm default preserved; `proof:blob-studio-config` LOUDER-LEAN-SURFACED bite green. |
| C6-10 / F3-M11 | FLEET | configurator flat, no hierarchy | dividers + weighted preset row + layer order + W-BLOB-REDRESS label fix | **HELD** — hierarchy structure present AND the raw-key leak (the pass-1 undercut) is closed. `proof:hierarchy` 6/6 in the redress run. |
| C6-11 / B1-W-BLOB-GLASS | FLEET / AY | uBackdrop Snell refraction (CONDITIONAL on G-PERF + G-BROWSER) | W-BLOB-STUDIO §3.7 CONDITIONS-UNMET (enamel stands) | **DISPOSITION HONEST + CORRECT.** The page bead sits over a flat cream stage → a Snell refraction of a uniform field is ZERO displacement by physics; no aurora behind; no DOM-pixel-read API; 2nd-pipeline fenced. The CONDITIONS-UNMET close is the right call per the user's explicit "never a degraded ship." Enamel shader byte-unchanged. Do NOT re-open. |
| C6-12 | FLEET | live page console-clean, one GL context | VERIFIED | **HELD** — live: **0 console errors**, **1 GL context** (one-GL-budget per route held). |
| A1-2 | FLEET | AY close marked blob "live-verified"; R3-9 contradicted it; pass-1 re-opened the MOBILE arm | re-opened → W-BLOB-REDRESS | **CLOSED** — the live-verified-but-mobile-broken class is now gate-covered on the coarse-touch arm (both gates 6/6 + 4/4); the phone bead PAINTS. |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this pass (isolated context `blob-rr`, page 17; SwiftShader/ANGLE).
The studio stage carries a DELIBERATE dark plate in BOTH modes (it is a stage to make the cream bead
pop, not page chrome) — verified `.dark` genuinely toggled off (`darkClass:false`) yet the stage
stays dark by design.

**Capture list (literal filenames, stored beside this record):**
- `rr-blob-desktop-light-full.png` — 1280×900 light, the GooBlob hero IA + studio + configurator top
- `rr-blob-desktop-light-studio.png` — 1280 light, the studio band (Interaction section, M2-clean)
- `rr-blob-bead-desktop-light.png` — 1280 light, the bead element shot (cream creature + necking satellite + 2-rung shadow; Interaction→Mood configurator)
- `rr-blob-bead-desktop-dark.png` — 1280 dark, the bead in dark mode (cream identity mode-invariant; Geometry/Satellites section)
- `rr-blob-static-register-light.png` — 1280 light, a SEPARATED satellite droplet + the static WatercolorDot register heading + Stops swatches
- `rr-blob-mobile-studio-dark.png` — **390×844 mobile, the M1 PROOF — the cream bead PAINTS on the phone** (was 0×0 in pass-1)

**π readbacks (measured live this pass):**
- Desktop studio `goo-blob-canvas`: **768×768 CSS / 1536×1536 backing** (stage-fill, centered x118/y40).
- Mobile (390px) studio canvas: **300×300 CSS / 600×600 backing**, visible, `grid-template-rows: 288px 270px` (M1 fix; was 0×0).
- `--configurator-stage-min`: **18rem** (the new definite-track floor).
- Grounded-shadow rungs: **2** (gel-dome on `goo-blob-wrapper`).
- GL contexts: **1**; console errors: **0**; rAF: **20 frames/500ms (animating)**.
- Configurator labels: **13 visible, all human-readable, 0 camelCase leaks; 11 sr-only twins carry `for=` association**; raw keys only in the mono `name` caption.

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk, fresh eyes)

Walking `/substrates/blob` cold, on BOTH a desktop and a phone:

- **Desktop** reads FINISHED: a large living cream creature leads, its satellite visibly orbit-necks
  and fully separates with a gooey bridge, a grounded 2-rung gel shadow sits it on the stage, a
  cleanly-structured configurator (weighted presets → Interaction → Mood+palette → Geometry/Satellites,
  each row ONE human label + a small mono token caption) sits beside it, the static WatercolorDot
  register is honestly demoted below with clean swatch edges, and the page is console-clean on one GL
  context.
- **The phone** — the pass-1 "wtf" — now reads FINISHED too: the cream bead PAINTS at 300×300 in a
  definite stage track, centered with margin, and the configurator below it controls a VISIBLE
  creature.
- **The configurator** — the pass-1 second "wtf" — no longer shows leaked code identifiers; every row
  reads one human label with the raw key tucked into the tertiary mono caption (the `icons.vue`-style
  proportion).
- **uBackdrop** CONDITIONS-UNMET is recorded honestly and is physically correct (a flat cream backdrop
  cannot Snell-displace).

Nothing on this surface draws a "wtf" this pass. Both pass-1 misses are gone; no new miss appears.

---

## 4 — MISSES (this pass)

**None at S1/S2.** Both pass-1 S2 misses (M1 mobile 0×0 stage, M2 raw-key label leak) are CLOSED at
the root and re-verified live with fresh captures, π readbacks, and GREEN gates (`proof:blob-render`
6/6, `proof:blob-warm-default` 4/4, `proof:blob-studio-config` PASS). No NEW first-time-auditor
"wtf" rises on the surface.

**Non-misses re-confirmed (recorded so no future lane re-touches them):**
- **GL crispness** — REFUTED-crisp HOLDS; do NOT touch the renderer (`proof:blob-page-fence`).
- **uBackdrop refraction** — CONDITIONS-UNMET is correct (flat cream → zero Snell displacement); enamel stands; do NOT re-open.
- **Cream-bead identity** — HELD, mode-invariant (warm-cream creature in light AND dark; correct — it is not a token-tinted surface).
- **Satellite metaballing, 2-rung grounded shadow, hero-first IA, static-register demotion + clean swatch edges, circular merge bridge, one-GL-context budget** — all HELD on desktop AND mobile.

---

## 5 — VERDICT

**PASS.** The blob surface is finished on every axis the audit touches. The two S2 misses that failed
pass 1 are root-fixed in HEAD (commit `90bf11e5`) and re-verified AFRESH live: (M1) the studio hero
bead now PAINTS on the 390px phone (300×300 canvas in a definite 18rem stage track, both coarse gates
green); (M2) the configurator reads ONE human label per row with the raw key demoted to a mono
caption, a11y association intact, zero camelCase leaks across all sections. Every R3-9/R3-10/B10/C6-*
item closes, the GL-crispness refutation and the uBackdrop CONDITIONS-UNMET disposition hold honestly,
the cream-bead identity is mode-invariant, the satellites genuinely metaball, and a first-time auditor
finds no "wtf" on either viewport. The roster row flips to PASS.
