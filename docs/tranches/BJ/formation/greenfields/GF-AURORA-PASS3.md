# GF-AURORA — greenfield design, PASS 3 (REFABLE union)

- verified-model: claude-fable-5 — read verbatim from this seat's system context ("The exact model
  ID is claude-fable-5").
- union provenance: REFABLE RU-07, 2026-07-18. The prior PASS1/CRIT2/PASS3 loop executed on
  claude-opus-4-8 under a Fable declaration. This seat re-derived the aurora-modes design ANEW from
  the corrected canon (the 18-law IOS27-CODEX, MARKS-A/B + timelines, REFABLE-RF-3 §F08,
  SUPERFLUITY RU-09 F08 + C-H, SUFFUSION-MATRIX row K, the sources at HEAD) with the opus trio
  unread — boundary artifact `scratchpad/ru07-anew-aurora.md`, opus docs first opened 2026-07-18
  01:23 EDT — then unioned. My design is authoritative on conflict; opus decisions kept only where
  RATIFIED. Verdict ledger: `../refable/REFABLE-RU-07.md`.
- The opus loop's core thesis independently re-derives and RATIFIES. Its register half is corrected
  (renames, DUSK re-found, DAWN hardened, the solar-family grammar the charter's "how can they be
  better" half demanded and the opus loop never designed), its evidence layer is re-based on
  REFABLE-RF-3 (the byte-identity and only-strokeMode rhetoric are dead), its W4 fork gains the
  thesis-consistent third arm, the dead-axis register (RF-3 row 28) is added, and V-A95 is
  re-framed on the round-3-live evidence.

TRANCHE-DEVELOPMENT: no source touched; this doc is the terminal design artifact. No browser this
seat — every π obligation is OWED (LIVE-DEFER), and convergence is capped accordingly.

---

## 1. Critique adjudication (retained from the opus pass-3; verified against disk)

CRIT2's seven findings + umbrella verdict were all ACCEPTED by the prior pass-3 and every
acceptance re-verifies against HEAD this session. The record, condensed — nothing re-litigated:

| # | charge | status in this union |
|---|--------|----------------------|
| §0/F1 | van-Gogh is NOT a derivative-free cheap pilot — `mediumVangogh` calls `relightImpasto` (`vangogh-medium.glsl.ts:226`; `dFdx/dFdy` at `brush.glsl.ts:273`); zero `dpdx/dpdy/fwidth` in any `.wgsl.ts` today | HELD. W1 stays re-costed: substrate first (`StrokeHit`+`paintOver`+`paintOverOklab`+`relightImpasto`, the first WGSL derivative use, uniform-flow), then the dab. My anew draft under-costed this the same way pass-1 did; the critic's correction binds both. |
| F2 | the `{3,7}` relabel arm is a masking fallback | HELD; W4 re-specified — and widened with a third law-compliant arm (§3.5). |
| F3 | round-2b's oil-pastel remedy is merge-into-oil (γ), not the new body; the override must be owned | HELD; the A13 override stays owned (§3.6). |
| F4 | WGSL uniformity: `curvedStroke`'s `fwidth` sits in data-dependent flow (`brush.glsl.ts:118,122,139-140`); a verbatim port will not compile | HELD; budgeted in W1/W4. |
| F5 | single-source dispatch (`CHRONIC-ADJUDICATION.md:34-36`) forbids a lazy split → module-size budget, not fps alone | HELD; G-OIL-HONEST carries the module-budget clause. |
| F6 | KEEP roster vs headline reconciliation | SUPERSEDED — the register is rebuilt in §3.6 (11 slots, renamed, exact arithmetic). |
| F7 | the oil-pastel sheen must be pinned derivative-free | HELD; the analytic-normal construction stays (§3.4). |

## 2. On-disk re-verification of the load-bearing cost fact (retained)

- `vangogh-medium.glsl.ts:226` — `mediumVangogh` calls `relightImpasto` (unconditional, uniform medium branch).
- `brush.glsl.ts:269-273` — `relightImpasto` computes the normal from `dFdx(h)/dFdy(h)`.
- `vangogh-medium.glsl.ts:165,174,189` — three `paintOver` calls build the dab layers.
- grep `dpdx|dpdy|fwidth` over `*.wgsl.ts` → zero hits. The WGSL pipeline uses no screen-space derivative today.
- `aurora-mediums.wgsl.ts:398-401` — `medium == 3 || 5 || 6 || 7` → `mediumKuwahara`. The collapse is real; `useAurora.ts` prefers WebGPU.

Van-Gogh's WGSL port = the shared paint substrate + the derivative-free dab SDF. Cheaper than oil
(no `curvedStroke`/`bestOil`/4-layer machinery; `relightImpasto` fires in uniform flow so it is
WGSL-legal), not free.

One comment-rot addition the opus loop missed: `vangogh-medium.glsl.ts:8` claims "The dedicated
body is shared by both renderer paths" — FALSE against the dispatch (5 → Kuwahara on the primary).
Cured with the W1 port.

---

## 3. The design — dedicated bodies, an honest register, the solar family designed

### 3.1 The decomposition (ratified) + the corrected design authority

The thesis holds and is re-derived independently: **mode identity ⊥ palette ⊥ backend.** A mode is
a dual-ported dedicated body under a parity contract; a palette is a preset; the two are never
conflated. P1 (preset skins) and P2b (medium skins) are one principle at two levels; P2a (the WGSL
collapse) is a plain invariant violation.

Codex citations, re-grounded on the REFABLE canon (laws re-anchored: 1-4 → `IOS27-CODEX.md:11-14`,
10-13 → `:26-29`):

- **Law 11 (the restraint floor, AMENDED constants)** — when nothing is focal, ambient life is the
  engagement floor. The iOS-attested mechanism is the editorial-card gradient field: ~7.6pt/s
  positional drift with ±20% mass breathing, hue held (`sr-0620-1848 §6`); the dot-lattice
  exemplar is Cowork-provenance (breath-of-life bank ONLY, never cited as iOS) — envelope wander
  10-20 CSS px/s, rise ~0.7s / decay ~3s, ≤+16% peak; slowest visible change wins. The aurora IS
  this floor, so the smooth atmospherics are the privileged default class and the painterly modes
  are opt-ins that earn their slots. NEW and binding on the register (§3.6): the constants are a
  MOTION DESIGN, not a citation — every survivor preset must visibly migrate over tens of seconds
  (the SPEEDTEST B21 lesson: driftRadius 0.015-0.02 at breathPeriod 40+ reads near-static) while
  staying under the churn ceiling.
- **Law 1 (re-grounded per RU-16 R9)** — the aurora is the field a floated glass surface's
  backdrop treatment reads over; the graded channel on iOS surfaces is position-mapped DARKENING
  with blur CONSTANT — never blur-proportional. A mode that reads as a flat slab starves the glass
  above it; the G-MODE-DISTINCT descriptor terms measure spatial structure so a distinct-but-flat
  slab cannot pass.
- **Law 2 (unchanged)** — glass samples the field's positional hue/luminance per element and per
  region; every medium body MODULATES the nuclei color field, none replaces it (`sampleBase` stays
  the substrate), so the sampleable hue field survives every medium.
- **Suffusion row K (binding fences)** — the substrate relays the PAGE's state, never its own:
  pointer-velocity perturbation is its one flagship quality (Q7); it must never read as clickable;
  no second light system (metal's cursor-raked catch is the field's own relight — licensed);
  PRM/battery = still frame, composition preserved.

### 3.2 W1 re-costed (retained)

1. Port the shared paint substrate to WGSL: `StrokeHit`, `paintOver`, `paintOverOklab`,
   `relightImpasto` — the first WGSL screen-space derivative use, placed in the uniform medium
   branch so it compiles under WGSL uniformity, proven with a real WebKit paint.
2. Port `vangoghDab` (derivative-free analytic crescent SDF) + `mediumVangogh`.
3. Remove `5` from the `applyMedium` collapse; cure the `vangogh-medium.glsl.ts:8` parity comment.

The substrate is shared with the oil arm — relight is a substrate cost W1 pays first.

### 3.3 The medium table (the alias killed)

After the reform, every selectable medium dispatches to exactly one dedicated body — no `||` alias:

| id | medium | reformed WGSL dispatch | wave |
|----|--------|------------------------|------|
| 0 | smooth | no-op | — |
| 1 | pastel | `mediumPastel` (exists) | — |
| 2 | watercolor | `mediumWatercolor` (exists) | — |
| 3 | oil | own body — PORT, REAUTHOR-LEAN, or enum deleted (§3.5); never Kuwahara-while-selectable | W4 |
| 4 | crayon | `mediumCrayon` reworked to hand-drawn marks | W3 |
| 5 | vangogh | `mediumVangogh` (WGSL twin) | W1 |
| 6 | oil-pastel | new dedicated body | W2 |
| 7 | kuwahara | `mediumKuwahara` (its own honest id) | — |
| 8 | metal | `mediumMetal` (exists) | — |
| 9 | metal-gradient | `mediumMetalGradient` (exists) | — |

### 3.4 Per-mode express definitions (union-amended)

Each mode is defined by the mechanism that makes its rendered field measurably unlike the others.

**van-Gogh (5) — discrete loaded comma dabs over dark ground (ratified).**
The `vangoghDab` analytic-crescent SDF, oriented on the swirl flow + per-cell angular fan
(anti-marble), placed SPARSELY over a darkened underpainting, full-height impasto crown per dab.
Signature: high tensor anisotropy, measurable inter-dab gap-fraction, high specular energy.
Already real on WebGL2; W1 gives the primary its twin.

**oil-pastel (6) — the stubby waxy stick, a new dedicated body (opus direction ratified; the
physical model completed).** The extant body is the awfulness: a `profileFor(MEDIUM_OILPASTEL)`
constant-skin of the oil cascade (`mediums.glsl.ts:493-496`, `oil-modes.glsl.ts:54-91`) — it
renders as smeared oil. RF-3 correction carried: the trio's nuclei were NOT byte-identical
(mean displacement 0.045-0.058) and the pair-rhetoric was wrong — the kill is on the admission
law, not on byte-identity. The new body, dual-ported, four analytic terms, derivative-free by
construction:
- **Blunt strokes** — even-width capsules with ROUNDED ends (a stubby stick, never a tapered
  bristle); few, broad, tensor-oriented. [union addition — the shape identity]
- **Buttery overlap BLEND** — where strokes overlap, the deposit drags the neighbor color along
  the stroke direction (a bounded directional smear of the accumulated color, not a fresh
  `sampleBase`) — wax blends where crayon stays broken. This is the term that separates oil-pastel
  from BOTH crayon and oil at a glance. [union addition]
- **Analytic burnish sheen** — the waxy gloss, `pow(dot(N_analytic, H), s)` with the normal
  derived analytically from the tensor orientation + the capsule half-width profile, gated by the
  accumulated coverage SCALAR; no `dFdx/dFdy` (CRIT2 F7 held).
- **Additive tooth-skip** — the creamy deposit skips the tooth valleys and lays bright pigment on
  the ridges (the inverse of crayon's multiply-dark-into-pits); plus the chroma punch.
Signature: glossy specular film (vs oil's matte impasto, crayon's dry matte), additive-bright
broken deposit, broad low-frequency blended smears.

**crayon (4) — hand-drawn, not just textured (opus direction ratified; the hand completed).**
The extant `mediumCrayon` is a real dual-ported body but a uniform full-field tooth-multiply — a
texture, not a hand. The rework keeps the dry substrate and adds the drawn read:
- **Discrete scribble marks** with pressure-varying width and lift-off (broken ends) (ratified).
- **Per-zone quantized stroke direction** — a hand shades a region in ONE direction, then switches
  at the zone boundary; the orientation is seeded per color-zone (quantized off the nuclei field),
  not a continuous tensor everywhere — continuous tensor-following is precisely what reads
  machine-made. [union addition]
- **Boundary overshoot/underfill** — the deposition mask crosses zone edges by a jittered margin
  (color outside the lines; paper inside them). The child's-crayon read, cheap, and it also feeds
  law 2 no harm (the base field is intact beneath). [union addition]
- **DRY law** — no impasto crown, no sheen, ever; sheen is oil-pastel's signature.
The optional graphite/ink contour-hatching mode is CUT (opus carried it as a user ASK): A13's
phrasing is singular ("a proper crayon/hand-drawn mode") and the F03 parsimony edict rules the
singular reading — one crayon mode carrying the hand-drawn qualities. Flip: revives only on an
explicit user ask for a distinct ink medium.

### 3.5 The oil resolution (W4 — the fork widened)

The opus PORT-or-KILL binary contradicts β's own center: if the thesis is AUTHOR dedicated bodies
(what W2/W3 do for oil-pastel/crayon), then "port the 38KB cascade verbatim or delete the medium"
is not exhaustive. Three law-compliant terminal arms:

- **PORT** — transliterate `curvedStroke`/`bestOil`/`paintStrokeLayers`, hoisting the
  data-dependent `fwidth` (`brush.glsl.ts:118-140`) into uniform flow; must clear BOTH the frame
  budget AND the declared `@fragment` module-size budget (F5 — no lazy split available).
- **REAUTHOR-LEAN [union addition — the default lean]** — author a LEANER dedicated oil body for
  both backends: two stroke layers instead of four, analytic AA instead of `fwidth` (the
  `vangoghDab` construction generalized to tapered/knife shapes), the knife/chunky `strokeMode`
  dials preserved as profile constants over the lean cascade. Thesis-consistent (a dedicated body,
  designed for the budget), and it retires the 38KB monolith on WebGL2 too rather than freezing it
  as the permanent fallback register.
- **KILL** — delete enum 3 from `MEDIUM_ID`/`mediumOptions`; the oil preset re-expresses as
  `kuwahara`+palette. Fires only if even the lean body cannot clear the budgets.

Terminal selectable-collapse set is `{}` on every arm — never `{3,7}` (CRIT2 F2 held). Either way
the stale `uniformBridge.ts:76-79` comment (which claims a smooth-core degrade for ids 1-7,
contradicting the real dispatch) is rewritten to reality.

### 3.6 The register — 11 slots, renamed, the solar family DESIGNED (union-corrected)

The opus keep/kill table survives in membership but failed the charter's other half: A13 says the
extant exemplars are good AND asks "how can they be better" — the opus register never designed the
improvement. And it kept the vendor-meta names. Corrections:

**Admission law** (re-stated): a preset earns a slot iff it is (a) a distinct FIELD ARCHETYPE —
composition + VALUE STRUCTURE identity, not palette nuance — or (b) the medium HERO of a real
authored body, one hero per body. Duplication is judged over AUTHORED fields only —
default-inherited fields excluded (RF-3: the raw full-vector metric inverts the ranking; smooth
presets read most-duplicated merely because they override little).

**Renames — clean break, no aliases** (greenfield-no-meta kills vendor names; RU-09 canonical):
`SETTING_SUN→SUNSET`, `OPENAI_SKY→SKY`, `OPENAI_DAWN→DAWN`, `OPENAI_MEADOW→MEADOW`,
`DELIBERATIVE→PASTEL`, `OIL_IMPASTO→OIL`, `OILPASTEL_SUNSET→OIL_PASTEL`.

**The solar quartet (rule A — the law-11 atmospheric floor), designed as ONE family, tellable by
VALUE STRUCTURE at a glance:**

| slot | identity | the design |
|------|----------|------------|
| SUNSET | the default; mid-key warm horizon | the elongated sun-BAND low (the one elongation exerciser), coral-rose core, cream apex — the extant SETTING_SUN carries this; keeps the slot |
| DUSK | RE-FOUNDED, not tuned | the extant DUSK is SUNSET wearing a lilac whisper (L 0.50-0.91 vs 0.52-0.93 — same value structure, same drift-ladder family; RU-09: "today a lilac-note of SUNSET"). Twilight is DARK: low-L indigo/violet base (L≈0.35-0.45, h 280-300, C 0.10-0.12), the warm coral compressed to a narrow dying ember band at the horizon, lilac veil above. Tellable by construction. Round-2 death clause applies to THIS config, not the whisper |
| SKY | the one cool field | midday cerulean volumetric, highest-L spread; candidate for `warpMode:"curl"` (cirrus wisps) — paint-judged, not bound |
| DAWN | provisional, HARDENED before judged | pre-sunrise = high-L COOL undertone (lavender-grey base), pink blush high and diffuse, NO sun-band (that is SUNSET's signature). Dies in round two only if capture still confounds with SUNSET after the value-structure split |

Family mechanics: each member gets its OWN drift-phase ladder (the A/B/C trio literally shared one
ladder — decorrelate by design) and a drift signature clearing the law-11 visible-migration floor
(§3.1). The A/B/C candidate framing is CLOSED — `tests-visual/aurora-vibrancy.spec.ts`'s
CANDIDATES array retires to `["SUNSET","DUSK"]`.

**Medium heroes (rule B):** MEADOW (watercolor; absorbs DAY9 — same yellow+cool-intrusion
structure; keeps the only hybrid-warp), PASTEL, OIL (absorbs GESTURAL — `strokeMode` is one click
away in the configurator; per RF-3 the pair differed on 16/36 fields, so the character delta folds
into the hero's tuning — stated, not denied), VANGOGH, OIL_PASTEL (absorbs RAINBOW + OCEAN; see
§3.8 — it becomes the huePath hue-arc exerciser), CRAYON, METAL.

**No slot:** kuwahara + metal-gradient — finishes/variants one click away in the medium tab, not
aesthetic identities; RESOLVED studio-only (the opus "+1 optional exemplar" closes as +0), except
that a W4 KILL arm re-expresses the oil slot as kuwahara+palette, which would seat kuwahara
naturally. SPEEDTEST relocates to the speedtest repo (presets-in-consumers; marked addendum in ITS
tranche).

**KILL (6):** VIVID_SETTING_SUN (SETTING_SUN + the saturation/chroma knob — RF-3-verified:
byte-identical sun-band nucleus + identical drift ladder), DAY9_YELLOW, OIL_GESTURAL,
OILPASTEL_RAINBOW, OILPASTEL_OCEAN, SPEEDTEST (relocated).

**Arithmetic:** 11 keep (4 solar + 7 heroes) + 6 removed = 17. ✓ Headline: **17 → 11**, with OIL
contingent on W4's arm (REAUTHOR keeps it; KILL re-expresses it → 10).

**The round-2b override, owned (retained):** round-2b diagnosed the oil-pastel skin (true) and
recommended merge-into-oil (γ); A13 overrides toward authoring the real body. Stated, not
laundered.

### 3.7 V-A95 (re-framed on the round-3-live evidence)

The opus pass carried V-A95 as an active RED whose `isolation:isolate` cure needed confirming. The
round-3-live probe (`round-3-live/07-08-aurora-va95-notes.json` + `08a-08d` captures) supersedes
that framing: on the LIVE WebGPU renderer, three reverse-drag variants produced NO black slab —
the only black state observed was self-inflicted (the probe's `getContext()` call stole the WebGPU
context and faked the fallback; the live-π context-steal trap). The black-slab claim is itself
suspect as an instrumentation artifact.

W6 therefore shrinks: one clean confirm on the real in-app Chrome arm with observation via
screenshot/computed-style ONLY (never `getContext` on a live canvas), then RETIRE the defect
record — and audit whether the unconfirmed `isolation:isolate` cure in `Aurora.vue` is cargo to
remove. Still sequenced after the mode waves (the derivative/relight cost could shift present
timing; confirm against the final shader). Orthogonal to the medium architecture (ratified).

### 3.8 The dead-axis register (union addition — RF-3 row 28, absent from the opus loop)

Census truth: across all 17 presets, `vividness`, `huePath`, and `source` never vary, and the demo
`cfg()` wrapper's interactivity default was never overridden by any preset — plus two studio
REACHABILITY defects: `warpModeOptions` omits `"curl"` and `flowPatternOptions` omits `"tensor"`
(the types carry them; the studio cannot select them). Dispositions, per axis:

- **huePath — gains its register exerciser.** OIL_PASTEL absorbs RAINBOW *as the hue-arc
  exerciser*: fewer stops + `huePath:"increasing"` produces the spectrum sweep by construction —
  cleaner than seven hand stops, and the axis stops being dead.
- **interactivity — gains its register exerciser.** METAL declares `{ light: true, swirl: true }`:
  cursor-as-light IS the metal identity (the raked catch). The rest inherit the cfg default
  deliberately (documented). The wrapper already merges; the axis was dead by omission, not by
  construction.
- **vividness — register-invariant BY DESIGN.** It is the §3 chroma-floor consumer contract
  (`vividness:0` = the pale-hero opt-out with byte-identity), not a theme axis. Documented
  studio-only; the identity contract is the library-side witness.
- **source:"image" — studio-only.** A register preset carrying a photo is an asset dependency;
  wrong for the register by design. Documented.
- **warpMode "curl" / flow "tensor" — reachability cured.** Both added to their option lists in
  `config/options.ts`. SKY's curl adoption is paint-judged (§3.6).
- **alpha / noiseOctaves** — post-cut register-invariant (their only variance was SPEEDTEST, which
  departs); field-quality knobs, documented.

### 3.9 Rot cures (union addition — bound into W5; RU-09-aligned)

- `src/components/aurora/constants/presets.ts:4-6` — the library header lists an 11-name register
  that has not existed for tranches (RF-3 row 29). Kill the name list (a staleness engine); point
  at the demo register by path only.
- `uniformBridge.ts:76-79` — rewritten at W4 (retained).
- `vangogh-medium.glsl.ts:8` — the false "shared by both renderer paths" claim; cured at W1.
- `tests-visual/aurora-vibrancy.spec.ts` — CANDIDATES → `["SUNSET","DUSK"]`; candidate framing
  retired.
- `tests-visual/substrate-paints-color.spec.ts:148` — the roster pin is ALREADY stale (pins 13,
  disk has 17 — the witness broke silently); re-pin deliberately at the post-cut count as a
  literal (a witness, not a derived count).
- `tests/demo/aurora-stage-affordance.test.ts` — `OIL_IMPASTO→OIL`, `SETTING_SUN→SUNSET`; the
  second oil config inlines `{...PRESETS.OIL, strokeMode:"chunky"}`.
- `demo/stories/substrates/aurora.vue` default fallback → `"SUNSET"`.
- `pi-manifest.ts:109/116` count comments re-counted post-cut.

---

## 4. Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope (union amendments in **bold**) | hard gate(s) | π obligation |
|------|-------|--------------------------------------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze the §3.3 body matrix; born-RED gate scaffolds (all RED at HEAD); pin ε (parity) + τ (distinctness) against captured cross-backend/cross-medium baselines; declare the `@fragment` module-size budget | gate suite compiles + all RED | — |
| **W1** | PAINT SUBSTRATE + VAN-GOGH-ON-PRIMARY | port `StrokeHit`+`paintOver`+`paintOverOklab`+`relightImpasto` (first WGSL derivative use, uniform-flow) THEN `vangoghDab`/`mediumVangogh`; remove `5` from the collapse; **cure the `vangogh:8` parity comment** | G-PARITY-BODY(vangogh) incl. uniformity-compiles + WebKit paint, G-VANGOGH-PRIMARY | π-VANGOGH-PRIMARY, π-PARITY |
| **W2** | OIL-PASTEL REAL BODY | author the dedicated body — **blunt capsules + buttery overlap-blend + analytic burnish + additive tooth-skip** (derivative-free); DELETE the `profileFor(MEDIUM_OILPASTEL)` skin + `mediumOilPastel` passthrough; remove `6` from the collapse | G-OILPASTEL-BODY (derivative-free clause), G-NO-SKIN-MODE | π-OILPASTEL |
| **W3** | CRAYON HAND-DRAWN | rework `mediumCrayon` (both backends): discrete scribble marks + pressure/lift-off + **per-zone quantized direction + boundary overshoot/underfill**, dry; **the ink-mode ASK is resolved-CUT (singular reading, F03 parsimony)** | G-CRAYON-DRAWN | π-CRAYON |
| **W4** | OIL RESOLUTION | **three arms: PORT (hoist derivatives + hold module budget) / REAUTHOR-LEAN (default lean — a two-layer dedicated body, analytic AA, strokeMode dials kept) / KILL (delete enum 3; oil→kuwahara+palette)** — terminal collapse set `{}`; fix `uniformBridge.ts:76-79` | G-OIL-HONEST (+module-budget clause) | π-OIL |
| **W5** | REGISTER + AXES + ROT | **the 17→11 cut + the clean-break renames + the DUSK re-found / DAWN harden / per-member drift ladders (§3.6) + the dead-axis dispositions (§3.8) + the rot cures (§3.9)**; relocate SPEEDTEST; **the smooth-quartet half is parallel-safe any time after W0; the painterly half + the full pairwise G-MODE-DISTINCT sweep wait on W1-W4** | G-PRESET-HONEST, G-SPEEDTEST-RELOCATED, G-MODE-DISTINCT | π-GALLERY, π-DISTINCT, **π-QUARTET** |
| **W6** | V-A95 RETIRE-OR-CONFIRM | **one clean confirm on the real in-app Chrome arm, screenshot/computed-style observation ONLY (the context-steal trap; the round-3-live probe already cleared 3/3 reverse-drags), then retire the defect record + audit the `isolation:isolate` cure for cargo**; after the mode waves | G-REVERSE-DRAG-NOSLAB | π-REVERSE-DRAG |
| **W7** | CONSUMER RE-POINT + FINAL | demo gallery adopts the reduced register + real modes; overfitting audit; FINAL.md | G-CONSUMER, overfit-audit | π-BAKE |

Lead rider held (JUDGE.md C-G + RU-09 C-H): **F08 is discharged only when W1-W4 real-body
authorship lands with G-MODE-DISTINCT green — never at the preset-cut checkbox alone.** The W5
smooth-quartet half may land early; it does not close F08.

---

## 5. Born-RED gates (lean per the gates-abrogation mandate; each names its RED-at-HEAD)

- **G-MODE-DISTINCT** (the F08 complaint operationalised — ratified). For every unordered pair of
  shipped mediums at ONE canonical config (identical except `medium`), descriptor distance
  `D ≥ τ`, D combining ΔĒ (mean perceptual color distance), ΔA (structure-tensor mean anisotropy),
  Δβ (radial power-spectrum slope), Δρ_hf (high-frequency energy / gap-fraction). τ pinned at W0
  against the smooth↔crayon reference pair on both backends. *RED today:* on WGSL,
  D(oil,vangogh)=D(vangogh,oil-pastel)=D(oil-pastel,kuwahara)=0 EXACTLY (`aurora-mediums.wgsl.ts:398-401`);
  on WebGL2, D(oil,oil-pastel)<τ (the shared cascade, `mediums.glsl.ts:493-496` vs `:376-382`).
- **G-QUARTET-TELLABLE [union addition, folded into G-PRESET-HONEST's family — one clause, not a
  new suite].** The four solar presets are pairwise tellable in capture by value structure
  (per-frame L-histogram separation), not palette nuance alone. *RED today:* DUSK vs SUNSET share
  the value structure (L span 0.50-0.91 vs 0.52-0.93) and the drift-ladder family; the extant DUSK
  is the RU-09 "lilac-note of SUNSET".
- **G-PARITY-BODY.** Every shipped mode's WGSL render is its OWN dedicated body, parity-ΔE < ε vs
  the GLSL twin at fixed config/t, and the body compiles under WGSL uniformity with a real WebKit
  paint. *RED today:* the 3/5/6/7 collapse; zero WGSL derivative use exists.
- **G-NO-SKIN-MODE.** No shipped medium is a `profileFor`-constant skin of another (structural
  function-identity check). *RED today:* `mediumOilPastel` (`mediums.glsl.ts:493-496`).
- **G-VANGOGH-PRIMARY.** `medium:"vangogh"` on the primary renders discrete separable dabs
  (gap-fraction ≥ floor, crown glints), not the Kuwahara smear. *RED today:* `applyMedium:399`.
- **G-OILPASTEL-BODY.** Oil-pastel renders the dedicated body — blunt capsules, overlap-blend,
  ANALYTIC sheen (no `dFdx/dFdy/fwidth`), additive tooth-skip — distinct from oil AND crayon, on
  BOTH backends. *RED today:* no such body.
- **G-CRAYON-DRAWN.** Crayon renders discrete hand-drawn marks — pressure/lift-off, per-zone
  direction switches, boundary overshoot — DRY (no glint, no sheen), not a uniform wash. *RED
  today:* `mediumCrayon` is a full-field multiply.
- **G-OIL-HONEST.** Oil's terminal state is one of: real ported cascade / real REAUTHORED lean
  body / enum 3 deleted with presets re-expressed — the gate FAILS if enum 3 is selectable while
  routing to a non-oil body. PORT/REAUTHOR arms hold the module-size budget. The
  `uniformBridge.ts:76-79` comment matches reality. *RED today:* enum 3 selectable AND
  Kuwahara-routed; the comment claims a false smooth-core degrade.
- **G-PRESET-HONEST.** No two shipped presets are near-identical over AUTHORED (non-default-
  inherited) fields with the same medium + nuclei archetype (the RF-3 metric); the register
  carries the renamed keys only (no `OPENAI_*`/`DAY9`/candidate names). *RED today:* the sunset
  A/B/C trio (`presets.ts:591/624/656`), the oil-pastel trio (`:320/360/462`), MEADOW/DAY9,
  vendor-meta key names throughout.
- **G-SPEEDTEST-RELOCATED.** SPEEDTEST absent from the demo register. *RED today:*
  `presets.ts:685-703`.
- **G-REVERSE-DRAG-NOSLAB (rider, re-framed).** One clean reverse-drag confirm on the real in-app
  arm via screenshot/computed-style observation only; then the defect record retires. *Status:*
  round-3-live already cleared 3/3 variants on live WebGPU; the residual RED is the un-run in-app
  confirm + the cargo audit of the `isolation:isolate` cure.

---

## 6. π obligations (ALL OWED — LIVE-DEFER this seat; run live-π per band; paint-arm parses oklab)

- **π-DISTINCT** — every shipped medium at the canonical config, both backends; pairwise D-matrix;
  prove `min D ≥ τ`. Baseline = the D=0 rows on WGSL.
- **π-QUARTET [union addition]** — the four solar presets, paired captures; L-histogram
  separation; DUSK/DAWN death clauses fire here, judged against the RE-FOUNDED configs.
- **π-PARITY** — each real mode on both backends at fixed config/t; ΔE map < ε.
- **π-VANGOGH-PRIMARY** — vangogh on WGSL: discrete separable dabs. Baseline = the Kuwahara smear.
- **π-OILPASTEL** — the new body: blunt-capsule read + overlap blend + burnish. Baseline = the
  oil-skin extant.
- **π-CRAYON** — drawn marks + zone direction switches + boundary overshoot. Baseline = the wash.
- **π-OIL** — oil's resolved terminal render (whichever arm fired).
- **π-GALLERY / π-BAKE** — the reduced renamed gallery + thumbnail bakes on real modes.
- **π-REVERSE-DRAG** — the one clean in-app confirm (screenshot-only observation).

Browser-seat singleton: serialize the seat; parity + distinctness need BOTH a WebGPU and a WebGL2
paint of the same config.

---

## 7. Banked-route dispositions (retained)

- **α (backend-parity port): BANKED-ALIVE** — mechanism + parity gate consumed by W1/W4; the
  uniformity restructure is budgeted; the fallback if new-body authorship stalls.
- **γ (honest-to-primary reduction): BANKED-ALIVE** — its cull is adopted (W5); on oil-pastel it
  was the incumbent (round-2b's merge) that A13 overrides, stated openly; its cost logic feeds
  W4's KILL arm. Cannot lead (P2c). Reopens only if the new bodies prove unachievable or
  perf/size-blocked across the board.
- **V-A95: RIDER, downgraded** — no longer an active-RED cure hunt; a retire-or-confirm bounded by
  the round-3-live clearance (§3.7).

---

## 8. Convergence + open items

**Convergence: 58%** (held from the prior pass-3 — the additions are design-complete but equally
paint-unverified, so the number neither rises nor falls). What holds it: the ratified thesis + the
repaired cost model + a register that now serves BOTH halves of the charter (reduce dramatically
AND make the named exemplars better) + the dead-axis census consumed. What caps it:

1. **Zero paint verification** — every π OWED; the three body designs (oil-pastel, crayon-hand,
   vangogh-on-primary) and the re-founded DUSK/DAWN are spec-only; "not-awful" is the user's
   aesthetic bar and closes only in paint.
2. **W4's arm is unmeasured** — three law-compliant outcomes, default REAUTHOR-LEAN; which fires
   needs the W0 budgets + a measured paint.
3. **τ and ε are described, not pinned** — W0 captures the baselines first. ε is perceptual by
   construction: byte-parity across backends is impossible (PCG2D hashing vs the WGSL fbm).
4. **DUSK/DAWN death clauses live** — judged at π-QUARTET against the re-founded configs.

**User ASKs: none open.** The opus crayon-vs-ink ASK is resolved-CUT on the singular A13 reading +
F03 parsimony (flip: an explicit user ask for a distinct ink medium revives it as its own wave).
The kuwahara-exemplar question is resolved studio-only (flip: the W4 KILL arm seats
kuwahara+palette presets naturally). PASTEL/MEADOW stay as one-hero-per-body keeps; demotion to
studio-only remains available if the user wants the register under 10.

Per the charter this remains a tranche-development artifact: architecture converged and
internally consistent; empirical verification structurally owed.

---

Materialization note—2026-07-18, model claude-fable-5 (read verbatim from this seat's system
context). The RU-07 union seat completed its adjudication (the verdict ledger at
`../refable/REFABLE-RU-07.md` is canon) but its in-place rewrite never landed on disk; a
predecessor seat under the same charter produced a complete union draft and walled before
returning (`../refable/salvage/wf23583121-GF-AURORA-PASS3.md`). This file is that salvage draft,
checked verdict-by-verdict against the ledger (8 OPUS-WRONG, 8 FABLE-NEW, 12 RATIFIED—conforming;
one addition: the RATIFIED-6 perceptual-ε rationale folded into §8 item 3) and written to disk by
a follow-up Fable seat—sidecar-driven, salvage-draft-based. Section positions match the RU-07
ROUTING anchor map (§3.1 `:59-90` through π-REVERSE-DRAG `:379`).
