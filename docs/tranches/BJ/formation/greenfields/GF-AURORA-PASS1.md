# GF-AURORA — greenfield design, PASS 1 (Fable seat)

One-seat compression of the design-loop charter (`PROMPTS/design-loop-prompt.md`): round-zero
portfolio → shader-architecture census per family → leading-spec draft (wave shape + born-RED gates
+ π obligations) → self-critique → honest convergence. TRANCHE-DEVELOPMENT: no source touched; this
doc is the only artifact. No browser (a Playwright suite owns the seat) — every π obligation is
OWED, not discharged, and convergence is capped accordingly.

Authorities read in full: the round-2 quantification (`round-2/aurora-preset-duplication-f08-…-p.md`
+ `round-2b-confirm/f08-…-s.md` — the pairwise clustering + the skins-vs-modes shader verdict), and
the shipped aurora shader corpus at HEAD (`codex/bi-p-q-execution`):
`constants/shaders/{aurora.frag,aurora.wgsl,mediums.glsl,aurora-mediums.wgsl,brush.glsl,oil-modes.glsl,vangogh-medium.glsl,metal-medium.glsl}.ts`,
`composables/uniformBridge.ts`, `composables/useAurora.ts`, `constants/presets.ts`,
`demo/stories/substrates/aurora/presets.ts`, and `Aurora.vue` (the V-A95 site).

---

## 1. Problem statement (from F08/A13 + the round-2 quantification + the user's order)

Two fused problems plus one rider, all riding the aurora band.

| id | problem | evidence |
|----|---------|----------|
| P1 | **17 near-duplicate presets → ~9-10 honestly-distinct.** Three tight clusters differ ONLY by palette (+ sub-noise): oil-pastel trio, setting-sun trio (shipped A/B/C candidates), watercolor pair. | `presets.ts:685-703`; round-2 §clusters; round-2b findings 1-4 |
| P2a | **The WGSL primary collapses 4 mediums to one Kuwahara body.** On WebGPU (the backend the runtime prefers) `oil(3)` / `vangogh(5)` / `oil-pastel(6)` / `kuwahara(7)` ALL render `mediumKuwahara` — so a "van-Gogh" config is a Kuwahara PALETTE SKIN on the path most users run. | `aurora-mediums.wgsl.ts:399-400`; `useAurora.ts:25` (prefers WebGPU) |
| P2b | **oil-pastel is a constant-skin of oil, not a mode.** `mediumOilPastel` calls the identical `paintStrokeMedium→paintStrokeLayers` as `mediumOil`, differing ONLY by the `profileFor` StrokeProfile constants — the repo's own "constants-only = skin" criterion. The user: 'whatever's extant is awful'. | `mediums.glsl.ts:493-496` vs `:376-382`; `oil-modes.glsl.ts:54-91` |
| P2c | **The user wants MORE real modes, not fewer.** Order: keep sky/dawn/dusk-class exemplars; ship a PROPER van-Gogh mode, a PROPER oil-pastel brush mode, a proper crayon/hand-drawn mode — "real modes or nothing." | charter; F08/A13 |
| V-A95 | **Reverse-drag slab.** A reverse-drag on the armed canvas flashes a black backdrop-race sample; the shipped cure (`isolation:isolate`) is an UNCONFIRMED hypothesis — "Proof owed on the real in-app Chrome arm." | `Aurora.vue:283-294` |

The load-bearing tension P2 forces: **what makes a "real mode" real?** The repo's own answer, applied
by the round-2b verdict, is a dedicated shader BODY — not a StrokeProfile constant-skin. `crayon`
(`mediumCrayon`, dry tooth-multiply) and `vangogh` (`vangoghDab`, atomic-dab) ARE dedicated bodies;
`oil-pastel` is NOT. And a dedicated body only counts on the backend the user runs — the WGSL collapse
means van-Gogh's real body **does not exist on the primary**. So P2 = *give every claimed mode a
dedicated body that renders on both backends*, which is exactly the user's "real modes or nothing."

---

## 2. Census — the shader-body inventory (what survives, what the greenfield replaces)

Evidence is file:line at HEAD. The census answers the charter's costing question — *what porting the
stroke bodies to WGSL actually costs* — by locating the exact seam between ported and un-ported.

### The two-backend body matrix (the keystone fact)

| medium (uMedium) | WebGL2 body (`aurora.frag`) | WGSL body (`aurora.wgsl` primary) | verdict |
|---|---|---|---|
| smooth (0) | no-op | no-op | parity |
| pastel (1) | `mediumPastel` glsl:118-133 | `mediumPastel` wgsl:185-201 | dual-ported, real |
| watercolor (2) | `mediumWatercolor` glsl:94-116 | `mediumWatercolor` wgsl:162-182 | dual-ported, real |
| **oil (3)** | `mediumOil`→cascade glsl:376-382 | **→ `mediumKuwahara`** wgsl:399 | **COLLAPSED on primary** |
| crayon (4) | `mediumCrayon` glsl:152-199 | `mediumCrayon` wgsl:204-239 | dual-ported, real |
| **vangogh (5)** | `mediumVangogh`/`vangoghDab` vangogh:43-256 | **→ `mediumKuwahara`** wgsl:399 | **COLLAPSED on primary** |
| **oil-pastel (6)** | `mediumOilPastel`=oil-skin glsl:493-496 | **→ `mediumKuwahara`** wgsl:400 | **skin AND collapsed** |
| kuwahara (7) | `mediumKuwahara` glsl:397-479 | `mediumKuwahara` wgsl:247-314 | dual-ported, real, no preset |
| metal (8) | `mediumMetal` glsl(metal) | `mediumMetal` wgsl:358-361 | dual-ported, real |
| metal-gradient (9) | `mediumMetalGradient` | `mediumMetalGradient` wgsl:365-377 | near-skin of metal, no preset |

Dispatch: `aurora.frag.ts:422-432` (all ten real bodies) vs `aurora.wgsl.ts:377`→`applyMedium`
(the collapsed ladder). Medium ids: `uniformBridge.ts:67-85`.

### SURVIVES (reuse, do not re-fork)
- **The WGSL foundation is ALREADY ported.** `sampleBase` (wgsl:77-83), `structureTensorField` +
  `packGrad` (wgsl:64-131), `flowField` (wgsl:134-159), `brokenColorJitter` (wgsl:86-93), the peer
  mediums, `mediumKuwahara` (wgsl:247-314), `metalShade` (wgsl:336-356). This is the expensive shared
  substrate — the port cost for the missing bodies is scoped to the STROKE CASCADE alone, not the
  whole engine.
- **`vangoghDab` is the exemplar of the target pattern.** A DEDICATED atomic-dab body, disjoint from
  the oil cascade, deliberately **derivative-free** (analytic smoothstep AA, "no fwidth skirt",
  vangogh:39,83-87). ~20 sampleBase/pixel (vangogh:30, claims ~60fps). Because it uses no
  `fwidth`/`dFdx`, its WGSL twin ports 1:1 — the CHEAPEST of the three stroke mediums to make real
  on the primary. It stays; W1 gives it its WGSL twin.
- **`mediumCrayon`** (dual-ported tooth-multiply) — a real dedicated body on both backends. It stays
  as the SUBSTRATE for the crayon rework (W3), not a rewrite.
- **The `StrokeProfile`/`profileFor` logic-as-data spine** (`mediums.glsl.ts:207-233`,
  `oil-modes.glsl.ts:9-111`) survives FOR OIL's sub-modes. It stops being the *definition* of
  oil-pastel/van-Gogh (those get bodies), which is the P2b clean break.
- **The parity-ΔE discipline** the WGSL header already invokes (`aurora-mediums.wgsl.ts:36-38`: "a
  one-sided add reds the parity-ΔE") — the cross-backend body-identity contract β formalizes into a
  gate.

### REPLACED (the greenfield's target — clean break, no alias, no masked fallback)
- **`aurora-mediums.wgsl.ts:399-400` — the four-way Kuwahara collapse.** This is the P2a masked
  fallback (a mode silently becomes a different operator). REPLACED by dedicated WGSL bodies for
  van-Gogh (W1) + oil-pastel (W2), and an HONEST disposition for oil (W4). Killed for 5/6; resolved
  for 3.
- **`mediumOilPastel` = `profileFor(MEDIUM_OILPASTEL)` skin** (`mediums.glsl.ts:493-496`;
  `oil-modes.glsl.ts:54-91`). REPLACED by a dedicated oil-pastel BURNISH body on both backends (W2).
  The `MEDIUM_OILPASTEL` branch in `profileFor` is DELETED (no alias).
- **The stale WGSL fidelity comment** (`uniformBridge.ts:76-79`: "renders the smooth core for every
  painterly id 1-7") — factually wrong even today (real bodies for 1/2/4/7/8/9). Corrected at W4.
- **The 6-7 duplicate presets** (`presets.ts` oil-pastel trio :318-498, setting-sun trio :584/621/653,
  watercolor pair, OIL_GESTURAL). REPLACED by the reduced honestly-distinct set (W5).
- **`SPEEDTEST`** (`presets.ts:702`) — a consumer dashboard baseline, not a showcase; RELOCATED to
  the consumer per presets-in-consumers (W5).

### THE PORT COST (the charter's central question, answered)
Making the stroke bodies real on WGSL is NOT one monolithic cost — it is **cost-stratified by body**:
- **van-Gogh** (`vangoghDab`): derivative-free → 1:1 WGSL port, no `fwidth`/`dFdx`. CHEAP. (W1)
- **A NEW oil-pastel body** designed cheap (broad smears, few marks, no best-of-9 cascade) ports
  cheap by construction. (W2)
- **crayon**: already dual-ported; the rework is additive to an existing WGSL body. (W3)
- **oil's 4-layer best-of-9 bristle cascade** (`brush.glsl.ts` `bestOil`:302-384, `curvedStroke`:84-161
  with `fwidth`:122/139-140, `paintOver`:201-261, `relightImpasto`:269-292 with `dFdx/dFdy`:273,
  `paintStrokeLayers`:251-337) — the ~38KB engine. WGSL *supports* `fwidth`/`dpdx`/`dpdy` in the
  fragment stage, and the Kuwahara port already demonstrated the array-of-struct→unrolled-accumulator
  idiom (wgsl:257-266) — so the port is MECHANICAL but LARGE, and it carries the perf risk that
  motivated the collapse in the first place (the header calls it "a separate full-fidelity port",
  wgsl:27-33). This is the ONE expensive, perf-gated arm — resolved honestly at W4, not assumed.

### USER-GATED / RIDER (do not resolve as a medium decision)
- **V-A95 reverse-drag slab** (`Aurora.vue:283-294`) — a COMPOSITING race, orthogonal to the medium
  architecture. The shipped `isolation:isolate` cure is self-described as unconfirmed. Parked as a
  bounded diagnostic wave (W6), no premature position.

---

## 3. Portfolio — three orthogonal families (round zero)

Keyed by ARCHITECTURAL CENTER. The three routes share NO mechanism: α ports what exists, β authors
new bodies, γ deletes the pretenders. They map to the charter's named archetypes (full WGSL
stroke-body port / new unified painterly pipeline / mode-count reduction).

### Family α — BACKEND-PARITY PORT; center = mechanical WGSL port of the extant cascade
The modes are FINE; they only render inconsistently across backends. Fix = port the shipped GLSL
stroke cascade (`brush.glsl.ts` + `mediums.glsl.ts` + `vangogh-medium.glsl.ts` + `oil-modes.glsl.ts`)
to WGSL verbatim, killing the `applyMedium:399-400` collapse.
- **Mechanism:** a 1:1 GLSL→WGSL transliteration (same math, WGSL syntax) of `StrokeHit`,
  `strokeShape`, `curvedStroke`, `paintOver`/`paintOverOklab`, `bestOil`, `relightImpasto`,
  `StrokeProfile`/`profileFor`, `paintStrokeLayers`, `vangoghDab`, `mediumVangogh`, `mediumOil`,
  `mediumOilPastel`. `fwidth`→`fwidth`, `dFdx/dFdy`→`dpdx/dpdy`, array-of-struct→unrolled accumulators.
- **Codebase fit:** strong for the mechanism (the foundation is ported; the Kuwahara port proves the
  idiom). The parity-ΔE gate already has a named referent (wgsl:38).
- **Research verdict:** the honest floor — strictly better than the collapse. GAP: it faithfully ports
  the "awful" oil-pastel (the user's explicit complaint UNADDRESSED) and adds no hand-drawn mode; it
  inherits the oil bristle-cascade PERF risk that motivated the collapse. It satisfies P2a, not P2b/P2c.
- **Disposition: BANKED-ALIVE** — the port MECHANISM + parity gate are consumed by β (W1); as a
  standalone it under-serves the user's "proper" asks. The fallback if β's new-body authorship stalls.

### Family β — DEDICATED-BODY-PER-MODE; center = mode-authorship honesty + cross-backend parity  → LEADING
A "real mode" = a purpose-built dedicated body authored ONCE and dual-ported, NEVER a StrokeProfile
constant-skin. The user's "real modes or nothing," taken literally. Subsumes α's parity (bodies port)
and γ's cull (skins demote), but its CENTER is authorship, not transliteration or subtraction.
- **The invariant (§4.1):** ∀ medium m that ships as a mode: ∃ a dedicated GLSL body ∧ a dedicated
  WGSL body ∧ parity-ΔE(m) < ε. The `applyMedium:399-400` collapse violates it for 3/5/6; the
  `profileFor`-skin oil-pastel violates the "dedicated body" clause. β restores it, cost-stratified:
  - **van-Gogh** — port the derivative-free `vangoghDab` to WGSL (real dabs on the primary).
  - **oil-pastel** — author a REAL burnish-deposition body (the "awful" fix): broad soft directional
    SMEARS oriented on the tensor + an overlap-gated BURNISH sheen (the waxy gloss the crayon comment
    names as oil-pastel's signature, `mediums.glsl.ts:148-150`) + tooth-SKIP broken deposit (additive,
    the inverse of crayon's tooth-multiply darken) + chroma punch. Its OWN body, dual-ported, cheap.
  - **crayon/hand-drawn** — rework `mediumCrayon` from a uniform tooth-multiply wash to visible
    directional hand-drawn SCRIBBLE marks (pressure-varying strokes with lift-off along the tensor),
    with an adjacent optional graphite/ink line-art read (contour-hatching: density tracks luma,
    strokes run across the gradient, a sketchy outline where coherence A is high).
  - **oil** — cost-stratified honesty (W4): port the bristle cascade IF perf clears; ELSE relabel
    oil-on-primary as the anisotropic-Kuwahara painterly finish (a legit oil-paint read) and demote
    oil toward a preset of kuwahara — the WGSL collapse SHRINKS from {3,5,6,7} to at most {3,7}.
- **Codebase fit:** strong — `vangoghDab` proves the dedicated-body pattern; `mediumCrayon` proves
  a non-cascade deposition body; the round-2b verdict names oil-pastel as the exact skin to replace.
  The two NEW bodies are bounded NPR techniques (burnish deposition; contour hatching), not
  equal-difficulty primitives.
- **Research verdict:** the codex-anointed reading of the user order + the repo's own skins-vs-modes
  criterion. BEST because the mode set becomes HONEST across both backends where today the primary
  lies. GAP: the two new bodies are spec-only; "not-awful" is an AESTHETIC bar un-paintable this seat.
- **Disposition: LEADING** — full spec §4.

### Family γ — HONEST-TO-PRIMARY REDUCTION; center = subtractive taxonomy honesty
Accept the WGSL collapse as the TRUTH: on the backend users run, oil/vangogh/oil-pastel ARE the same
Kuwahara operator differing by palette. So the honest shipped set is exactly the bodies that render
distinctly on the primary — smooth, pastel, watercolor, crayon, kuwahara, metal — plus palettes.
Delete the illusion that oil/vangogh/oil-pastel are distinct modes; author NO new bodies; port NOTHING.
- **Mechanism:** the round-2 "even more defensible" reduction (round-2 §finding note): collapse to
  "smooth-atmospheric + crayon + metal + kuwahara" and express the painterly presets as palettes of
  the Kuwahara finish. Adopt the 17→~9 preset cull unconditionally.
- **Codebase fit:** trivial (deletions + relabels; the cull is orthogonal to the body question).
- **Research verdict:** cheapest, most honest-to-current-backend — but it DIRECTLY CONTRADICTS P2c
  (the user wants MORE real modes). As a standalone answer to "give me a proper van-Gogh mode" it
  FAILS the user's stated intent.
- **Disposition: BANKED-ALIVE** — its PRESET cull (17→~10) is adopted by β (W5) unconditionally; its
  COST logic feeds β's W4 (oil may honestly stay Kuwahara-on-primary). Reopens as the primary route
  ONLY if β's new bodies prove aesthetically unachievable or perf-blocked across the board.

---

## 4. Leading spec — GF-AURORA-β "Dedicated-Body-Per-Mode + Cross-Backend Parity"

### 4.1 The load-bearing decomposition
The greenfield's thesis: **mode identity ⊥ palette ⊥ backend.** Today they are fused three ways —
(1) a "mode" is sometimes a real body (`vangoghDab`, `mediumCrayon`), sometimes a constant-skin
(`mediumOilPastel`); (2) the BACKEND silently changes what a mode IS (`applyMedium:399-400` collapses
4 modes to 1); (3) presets conflate palette-variation with mode-variation (OILPASTEL_SUNSET/RAINBOW/
OCEAN). β's decomposition: **a mode is a dual-ported dedicated body under a byte-parity contract; a
palette is a preset; the two are never conflated.** Splitting them makes P1 (preset skins) and P2b
(medium skins) the SAME principle applied at two levels, and makes P2a (the collapse) a straightforward
invariant violation to repair — not a taxonomy debate.

### 4.2 The load-bearing new work (named, so it is not "and then the hard part")
Three concrete artifacts, each bounded and exemplar-backed:
1. **The parity-ΔE harness** — render an identical config at a fixed `t` on both backends, compute a
   mean perceptual ΔE over the frame; the mode passes iff ΔE < ε. NOT a new primitive of
   equal-difficulty — a measurement harness the WGSL header already assumes (wgsl:38). Open: the ε
   threshold (the two backends use different noise/hash — PCG2D `aurora.frag.ts:211-214` vs WGSL
   `fbm` — so ε is PERCEPTUAL, not byte; §6 gap 6).
2. **The oil-pastel BURNISH body** — dedicated, dual-ported: broad tensor-oriented smears (few big
   marks, no best-of-9) + overlap-height-gated burnish specular sheen + tooth-skip additive broken
   deposit + chroma punch. Bounded NPR (deposition + specular film); `mediumCrayon` proves the
   non-cascade deposition pattern; `vangoghDab` proves cheap dedicated authorship.
3. **The crayon-drawn / hand-drawn body** — visible directional scribble marks (pressure + lift-off)
   over the tooth substrate, optional contour-hatching ink read. Bounded NPR (hatching + outline).

None is equal-difficulty to "design the aurora painterly engine" — each is a bounded, well-understood
NPR technique with an in-repo dedicated-body exemplar. The AESTHETIC quality bar is the honest cap
(§6 gap 1), not the technical construction.

### 4.3 Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 body matrix; author all born-RED gate scaffolds (all RED at HEAD); define the parity-ΔE harness contract + ε | gate suite compiles + all RED | — |
| **W1** | PARITY HARNESS + VAN-GOGH-ON-PRIMARY | build the cross-backend parity-ΔE harness; port the derivative-free `vangoghDab`/`mediumVangogh` to WGSL (the cheap pilot); remove `5` from `applyMedium:399` | G-PARITY-BODY(vangogh), G-VANGOGH-PRIMARY | π-VANGOGH-PRIMARY, π-PARITY |
| **W2** | OIL-PASTEL REAL BODY | author the dedicated burnish body (dual-ported); DELETE the `profileFor(MEDIUM_OILPASTEL)` skin (`oil-modes.glsl.ts:54-91`) + `mediumOilPastel` oil-passthrough (`mediums.glsl.ts:493-496`); remove `6` from `applyMedium:400` | G-OILPASTEL-BODY, G-NO-SKIN-MODE | π-OILPASTEL |
| **W3** | CRAYON HAND-DRAWN | rework `mediumCrayon` (both backends) from tooth-multiply wash to visible drawn scribble marks; optional ink/graphite hatching read | G-CRAYON-DRAWN | π-CRAYON |
| **W4** | OIL COST-STRATIFICATION | measure the oil bristle-cascade WGSL perf; EITHER port it (parity clears) OR relabel oil-on-primary as the Kuwahara finish + demote oil toward a kuwahara preset; fix the stale `uniformBridge.ts:76-79` comment | G-OIL-HONEST, G-PARITY-BODY(oil-arm resolved) | π-OIL |
| **W5** | PRESET REDUCTION | adopt+amend the 17→~10 cull (§4.4); relocate SPEEDTEST to the consumer; author the missing kuwahara exemplar (or document studio-only) | G-PRESET-HONEST, G-SPEEDTEST-RELOCATED | π-GALLERY |
| **W6** | REVERSE-DRAG (V-A95) | confirm-or-replace the `isolation:isolate` cure on the real in-app Chrome arm; if it fails, a double-buffer/explicit-composite fix | G-REVERSE-DRAG-NOSLAB | π-REVERSE-DRAG |
| **W7** | CONSUMER RE-POINT + FINAL | demo gallery adopts the reduced set + the real modes; overfitting audit (≥2 sites/exported/private-helper); FINAL.md | G-CONSUMER, overfit-audit | π-BAKE |

### 4.4 The preset reduction (adopting + amending round-2 / round-2b)
The round-2 17→9-10 cull is ADOPTED, AMENDED by the fact that β makes the painterly modes REAL (so a
surviving painterly preset showcases a genuinely-distinct RENDERED body, not a skin):

- **KEEP (one showcase per genuinely-distinct body):** `OPENAI_SKY`, `OPENAI_DAWN`, `SETTING_SUN`
  (→Sunset), `DUSK` (its dusk-lilac stop is the one real differentiator), `OPENAI_MEADOW` (the ONLY
  hybrid-warp coverage, round-2b finding 4), `DELIBERATIVE` (pastel), `VANGOGH` (now a true hero — no
  WGSL caveat once W1 lands), `OILPASTEL_SUNSET` (now a real burnish showcase, not a skin), `CRAYON`
  (now a real hand-drawn showcase), `METAL`, and one `OIL` showcase (`OIL_IMPASTO`). ≈ 11.
- **KILL as palette/param skins:** `VIVID_SETTING_SUN` (SETTING_SUN + chroma, reachable via the knob),
  `OILPASTEL_RAINBOW` + `OILPASTEL_OCEAN` (palette swatches), `OIL_GESTURAL` (profileFor sub-skin of
  OIL_IMPASTO), one of `MEADOW`/`DAY9_YELLOW` (keep MEADOW for warp coverage).
- **RELOCATE:** `SPEEDTEST` → consumer/speedtest repo.
- **AMENDMENT vs round-2:** round-2 flagged a "smooth-only + crayon + metal" collapse as "even more
  defensible on WebGPU." β REJECTS that collapse for van-Gogh/oil-pastel (they get real WGSL bodies,
  so their presets are honest) and ACCEPTS its logic ONLY for oil (W4 may demote oil, not van-Gogh).

### 4.5 Born-RED gates (each states its RED-at-HEAD condition with file:line; kept small per the gates-abrogation mandate)
- **G-PARITY-BODY** — for every medium shipping as a mode, the WGSL render is its OWN dedicated body,
  and parity-ΔE(mode) < ε vs the GLSL twin at a fixed config/`t`. *RED today:* `aurora-mediums.wgsl.ts:399-400`
  routes vangogh/oil-pastel to `mediumKuwahara` (a foreign operator; ΔE large).
- **G-NO-SKIN-MODE** — no shipped medium is a pure StrokeProfile-constant skin of another. *RED today:*
  `mediums.glsl.ts:493-496` `mediumOilPastel` = `profileFor(MEDIUM_OILPASTEL)` skin of `mediumOil` (:376-382).
- **G-OILPASTEL-BODY** — oil-pastel renders a dedicated burnish body (broad smear + overlap-gated
  sheen + tooth-skip deposit), distinct from the oil bristle cascade AND crayon tooth-multiply, on
  BOTH backends. *RED today:* no such body exists.
- **G-CRAYON-DRAWN** — crayon renders visible directional hand-drawn scribble marks with pressure/lift,
  not a uniform tooth-multiply wash. *RED today:* `mediumCrayon` (glsl:152-199 / wgsl:204-239) is a
  full-field multiply, no discrete drawn mark.
- **G-VANGOGH-PRIMARY** — a `medium:"vangogh"` config on the WGSL primary renders the discrete
  comma-dab body (separable dabs over dark ground), not the Kuwahara smear. *RED today:* `applyMedium:399`.
- **G-OIL-HONEST** — oil's primary-backend render is EITHER its real cascade OR an explicitly-labeled
  Kuwahara finish (no stale "smooth core" claim); the `uniformBridge.ts:76-79` comment matches reality.
  *RED today:* the comment claims a smooth-core degrade that contradicts `aurora-mediums.wgsl.ts:387-403`.
- **G-PRESET-HONEST** — no two shipped presets differ only by palette+flowAngle over an identical
  medium+nuclei-archetype+stroke-params. *RED today:* OILPASTEL_SUNSET/RAINBOW/OCEAN (`presets.ts:318-498`),
  SETTING_SUN/VIVID (`:584/:653`).
- **G-SPEEDTEST-RELOCATED** — SPEEDTEST is absent from the demo aurora showcase. *RED today:* `presets.ts:702`.
- **G-REVERSE-DRAG-NOSLAB** — a reverse-drag on the armed canvas paints no black backdrop-race sample.
  *RED today:* `Aurora.vue:283-294` — the cure is self-described unconfirmed ("Proof owed on the real
  in-app Chrome arm").

### 4.6 π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)
- **π-PARITY** — capture each real mode on BOTH backends at fixed config/`t`; ΔE map; prove < ε.
  Baseline = the current large ΔE (Kuwahara vs the real GLSL body).
- **π-VANGOGH-PRIMARY** — capture `vangogh` on WGSL; prove discrete separable dabs. Baseline = the
  Kuwahara smear.
- **π-OILPASTEL** — capture the rebuilt oil-pastel; prove burnish sheen + tooth-skip read. Baseline =
  the "awful" oil-skin extant.
- **π-CRAYON** — capture the drawn crayon; prove visible scribble marks. Baseline = the wash.
- **π-OIL** — capture oil's resolved primary render (real cascade OR labeled Kuwahara).
- **π-GALLERY / π-BAKE** — capture the reduced demo gallery + the thumbnail bakes on the real modes.
- **π-REVERSE-DRAG** — capture a reverse-drag; prove no slab (the V-A95 confirm-or-replace).

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band
(device-free gates pass while live π false-FAILS on oklab tokens — paint-arm parses oklab). The
parity-ΔE gate specifically needs BOTH a WebGPU AND a WebGL2 paint of the same config.

---

## 5. Banked-route dispositions
- **α (backend-parity port): BANKED-ALIVE** — its port MECHANISM + the parity-ΔE gate are consumed by
  β (W1). Advanced far enough to expose its gap (ports the awful oil-pastel, no hand-drawn, inherits
  the oil-perf risk). The fallback if β's W2/W3 new-body authorship stalls — port-what-exists strictly
  beats the collapse.
- **γ (honest-to-primary reduction): BANKED-ALIVE** — its preset cull is adopted UNCONDITIONALLY
  (β W5). Its cost logic feeds β W4 (oil may honestly stay Kuwahara-on-primary). Cannot lead (P2c: the
  user wants more real modes). Reopens as primary only if β's new bodies prove aesthetically
  unachievable or perf-blocked across the board.
- **V-A95 reverse-drag: RIDER** — a compositing race orthogonal to the medium architecture; parked as
  W6 (confirm-or-replace), no position taken here.

---

## 6. Self-critique (failure-mode checklist)
- **Vacuous convergence:** avoided — PASS 1, ~48%, not a convergence claim.
- **Spec-cites-itself circularity:** the mode-honesty invariant cites the repo's OWN "constants-only =
  skin" criterion (`mediums.glsl.ts:202` SBR canon + round-2b finding 3) + the `vangoghDab` exemplar +
  file:line, not itself. Clean.
- **Gates that cannot fail:** each names its RED-at-HEAD file:line. G-PARITY-BODY is a numeric ΔE
  threshold; G-NO-SKIN-MODE is a structural check (is the WGSL body a distinct function or a foreign
  `mediumKuwahara` call). G-VANGOGH-PRIMARY is a body-identity assertion at `applyMedium:399`.
- **Elegant-reduction trap ("and then the hard part"):** the load-bearing work is NAMED (§4.2) — the
  parity harness (a measurement, exemplar-referenced at wgsl:38) + two dedicated bodies (bounded NPR:
  burnish deposition, contour hatching, both with in-repo dedicated-body exemplars). The cheap-port
  claim rests on `vangoghDab`'s derivative-free construction (vangogh:39,83-87). β passes the test for
  the CONSTRUCTION; the AESTHETIC "not-awful" bar is un-paintable this seat (gap 1). γ passes trivially
  (deletion); α's oil arm FAILS the perf test → the W4 stratification is the honest response.
- **Legacy aliases / masked fallbacks:** clean break — the `profileFor(MEDIUM_OILPASTEL)` skin is
  DELETED (no alias); the `applyMedium:399-400` collapse IS a masked fallback (a mode silently becomes
  another operator) and is β's core kill. The "no silent smooth degrade" mandate is the whole point:
  the primary renders the real body OR is honestly relabeled (W4), never a masked skin.
- **Unverified gestalt:** REAL — no browser this seat; every π OWED; the two new bodies are SPEC-ONLY.
  The primary convergence cap.
- **Consumer-less substrate:** each new body's consumer = a showcase preset (Van-Gogh, Oil-Pastel,
  Crayon) + the demo gallery; the parity harness's consumer = the gate suite. kuwahara/metal-gradient
  are the pre-existing preset-less bodies (round-2b finding 6) — W5 authors kuwahara's exemplar or
  documents it studio-only. overfit audit at W5/W7.

## 7. Convergence + open gaps
**Convergence: 48%.** Lower than the dock seat's 52% because β's load-bearing NEW bodies are BOTH
spec-only AND bound to a subjective aesthetic bar the user set ("awful"), AND the oil-WGSL-perf arm is
an unresolved block. The decomposition (§4.1) and the cost-stratified port plan (§2 THE PORT COST) are
architecturally sound and file:line-grounded; the gates are born-RED and small. What is NOT earned:

1. **The new bodies are spec-only; "not-awful" is unproven (the sharpest gap).** The user's "awful"
   verdict is an AESTHETIC judgment; a burnish/hatching body can be SPECIFIED but not proven
   not-awful without a paint. This seat cannot close it.
2. **Zero paint verification.** Doc-only seat; every π OWED; no RED baseline captured.
3. **Oil bristle-cascade WGSL perf (the block risk).** Porting `bestOil`×4-layers×per-cell-tensor may
   hit the very wall that motivated the collapse (wgsl:27-33). W4 stratifies (port-if-perf-clears ELSE
   honest-relabel), but which branch fires is UNMEASURED — it decides whether oil stays a distinct
   mode on the primary or becomes a kuwahara preset.
4. **"Real van-Gogh" quality is assumed, not audited.** `vangoghDab` is dedicated but heavily
   band-fought (the §4.2/§4.3 tuning comments, vangogh:129-215); whether the WebGL2 result is
   "proper" per the user, or whether it ALSO needs rework before the WGSL port, is unverified.
   W1 ports-then-audits; a rework loop is possible.
5. **Hand-drawn vs crayon scope ambiguity.** "a proper crayon/hand-drawn mode" — one reworked crayon,
   or crayon PLUS a new ink/graphite mode? β leads with reworked-crayon + optional ink body; the
   user's intent is not pinned. A one-question clarification would sharpen W3.
6. **The parity-ΔE ε threshold is unset.** The two backends use different noise/hash (PCG2D vs WGSL
   fbm) — byte-parity is impossible, so ε must be PERCEPTUAL. Without a chosen ε, G-PARITY-BODY is
   not yet a hard scalar. W0 must fix ε against a captured cross-backend baseline.
7. **V-A95 root cause is a hypothesis.** The GPU-present-race explanation + the `isolation:isolate`
   cure are both unconfirmed (`Aurora.vue:288-292`); W6 may need a materially different fix
   (double-buffer / explicit composite). Orthogonal, bounded, but unresolved.

Per the charter, PASS 1 runs of 3+ before contemplating convergence. Next pass should: (a) prototype
the oil-pastel burnish body + capture a paired π against the "awful" extant (closes gap 1 partially);
(b) MEASURE the oil bristle-cascade WGSL perf to fire the W4 branch (closes gap 3 — the one thing that
could re-order β vs γ for oil); (c) pin ε against a captured cross-backend baseline (closes gap 6);
(d) put one clarification to the user on the crayon/hand-drawn scope (gap 5).
