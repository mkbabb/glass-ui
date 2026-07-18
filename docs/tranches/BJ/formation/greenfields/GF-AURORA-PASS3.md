# GF-AURORA — greenfield design, PASS 3 (Fable seat)

Pass-3 of the design-loop charter (`PROMPTS/design-loop-prompt.md`): fold CRIT2's charges into the
leading β spec, closing the cost-model surgery the critic demanded and operationalising the user's
actual complaint (F08: "all almost identical") as a measurable born-RED gate. TRANCHE-DEVELOPMENT:
no source touched; this doc is the only artifact. No browser (a Playwright suite owns the seat) —
every π obligation is OWED, and convergence is capped accordingly.

Authorities read in full for this pass: `GF-AURORA-PASS1.md` (the 48%-self-scored leading spec),
`GF-AURORA-CRIT2.md` (the fresh critic, re-scored 40%), `ADJUDICATION-1.md` (the lead's rulings),
`ios27/IOS27-CODEX.md` (laws 1/2/11 the design authority), `FEEDBACK-LEDGER.md` rows F07/F08 + asks
A13/A14 (F07/F08 are URL-anchored verdicts — there is no `feedback/F07*.png` / `F08*.png` on disk;
the ledger notes F07/F08 carry no screenshot), and the shipped shader corpus at HEAD
(`codex/bi-p-q-execution`). The CRIT2 derivative-chain charge (F1) was re-verified against the disk
here, not taken on the critic's word — see §2.

---

## 1. Critique adjudication table (every CRIT2 charge, zero silent drops)

CRIT2 raises one umbrella verdict (§0) and seven findings (F1–F7). Each gets a row: ACCEPTED with
the design change it forced, or REFUTED with evidence.

| # | charge (CRIT2) | verdict | forced change / evidence |
|---|----------------|---------|--------------------------|
| §0 | **The route relocates the elegant-reduction trap from oil (confessed) to van-Gogh (denied) — honest for oil, self-deceived for van-Gogh; the cheap-pilot premise the wave ordering rests on is cracked.** | **ACCEPTED** | The premise IS cracked — see F1. W1 is re-costed (§3.2): "port the shared paint substrate (`paintOver`+`paintOverOklab`+`relightImpasto` — the FIRST WGSL derivative use) THEN the dab." The words "derivative-free / 1:1 / cheap pilot" are struck from the spec. The cost model survives as re-drawn (van-Gogh is *cheaper than oil*, not *free*), not deleted. |
| F1 | **[load-bearing] `mediumVangogh` is NOT derivative-free: it calls `relightImpasto` (dFdx/dFdy) and three `paintOver`s; none are on disk in WGSL; W1 silently introduces the first WGSL screen-space derivative.** | **ACCEPTED** | Re-verified on disk (§2): `vangogh-medium.glsl.ts:226` calls `relightImpasto`; `brush.glsl.ts:273` is `dFdx(h)/dFdy(h)`; the three `paintOver`s at `vangogh:165/174/189`; zero `dpdx/dpdy/fwidth` in any `.wgsl.ts` today. W1 re-costed (§3.2); G-PARITY-BODY gains a uniformity-compiles clause (§5). The dab primitive stays derivative-free (`vangogh:83-87`) — that claim was true and is retained; only the MEDIUM-level claim was false. |
| F2 | **[major] The W4 relabel arm "shrinks the collapse to at most {3,7}" — but `{3,7}` leaves enum 3 selectable while rendering Kuwahara, which is exactly the masking fallback β's cardinal law forbids.** | **ACCEPTED** | The `{3,7}` wording is deleted. W4 (§3.5) is re-specified to two law-compliant terminal outcomes only: (a) PORT — enum 3 renders its real cascade; or (b) KILL — enum 3 is removed from `MEDIUM_ID`/`mediumOptions`, oil presets re-expressed as `kuwahara`+palette. The terminal selectable-painterly-collapse set is `{}`, never `{3,7}`. G-OIL-HONEST rewritten (§5). |
| F3 | **[major] β cites round-2b's skin-diagnosis as if it endorsed β's remedy (author a new body), when round-2b's *proposed* remedy is the opposite — merge oil-pastel into oil-as-a-mode (a γ move).** | **ACCEPTED** | Owned in one sentence (§3.6): round-2b finding 3 *diagnoses* the skin (true, cited for that) and *recommends merge-into-oil* (a γ disposition); A13 ("proper oil-pastel brush mode … real modes or nothing", `FEEDBACK-LEDGER.md` A13) OVERRIDES that toward authoring a real body. round-2b is no longer cited as β's endorsement. γ's stronger claim on oil-pastel specifically is recorded in §7. |
| F4 | **[moderate] "1:1 transliteration, fwidth→fwidth" is naive about WGSL uniformity: derivatives must sit in uniform control flow; `curvedStroke`'s fwidth is inside a data-dependent branch and `bestOil` is a data-dependent best-of-9 — a verbatim port will not compile.** | **ACCEPTED** | Confirmed: `brush.glsl.ts:118` gates the `fwidth` at `:122/139-140` behind `if (along1>=0 && along1<=1 && halfWNow>1e-6)` (per-pixel, data-dependent). van-Gogh's `relightImpasto` is called in the UNIFORM medium branch → legal, so it is the safe first use; the oil cascade needs derivative hoisting. W4 (§3.5) budgets the hoist restructure; G-PARITY-BODY's uniformity clause (§5) makes "compiles under WGSL uniformity + a real WebKit paint" a gate condition, not an assumption. |
| F5 | **[moderate] The single-source-dispatch ruling (`CHRONIC-ADJUDICATION.md:34-36`) forbids a lazy split, so W4's port arm appends the ~38KB oil cascade to the ALWAYS-compiled `@fragment` module — inflating compile size for the smooth default that needs none of it; the doc treats W4 as fps-only.** | **ACCEPTED** | W4 (§3.5) now budgets SHADER-MODULE SIZE, not just frame time; the module-size clause folds into G-OIL-HONEST (§5). The boot-diet tension tilts W4's default toward the KILL arm unless BOTH perf AND module-size clear — stated explicitly. |
| F6 | **[minor] The KEEP roster is ≈11-12 against a "17→~10" headline; DELIBERATIVE and DUSK are promoted on a "now the bodies are real" rationale that does not apply to pastel/smooth (already real).** | **ACCEPTED** | The register (§3.6) is restructured into two tiers with an EXACT count: 10 firm + 1 contingent (oil, per W4) + up-to-1 optional (kuwahara exemplar) = 10–12, headline restated as "17 → 10 firm". DELIBERATIVE/DUSK keeps are re-justified on the honest grounds — DUSK is a user-NAMED atmospheric identity (F08 "dusk"), DELIBERATIVE is the one-exemplar-per-distinct-body pastel keeper (medium-coverage, round-2b finding 6) — NOT "now real". |
| F7 | **[minor, in β's favour] The oil-pastel BURNISH body's "overlap-height-gated sheen" is a height-gradient relight (the `relightImpasto` dFdx/dFdy family); "ports cheap, no derivatives" is unearned by the body's own design.** | **ACCEPTED** | The oil-pastel sheen is re-specified DERIVATIVE-FREE by construction (§3.4): the specular is `pow(dot(N_analytic, H), s)` where `N_analytic` comes from the smear's ANALYTIC cross-section normal (known from the tensor orientation + the capsule half-width profile), gated by the accumulated coverage SCALAR — never `dFdx/dFdy` of a screen-space height field. G-OILPASTEL-BODY (§5) makes derivative-freeness a gate clause, so oil-pastel stays the cheapest WGSL port. |

Nothing in CRIT2 is REFUTED — every charge is on-disk correct. CRIT2 §6 ("what holds") items
(diagnosis correct, β is the right leader, the gate suite is well-formed, the stale-comment finding,
V-A95 parked) are NOT re-litigated; they are retained as-is.

---

## 2. On-disk re-verification of the load-bearing charge (F1)

CRIT2's score-moving claim was checked against HEAD directly, since it inverts a pass-1 keystone:

- `vangogh-medium.glsl.ts:226` — `mediumVangogh` calls `result = relightImpasto(result, height, canvasBase);` (unconditional, inside the uniform medium body).
- `brush.glsl.ts:269-273` — `relightImpasto` computes `vec3 N = normalize(vec3(-dFdx(h)*40.0, -dFdy(h)*40.0, 1.0/heightScale));` — screen-space derivatives.
- `vangogh-medium.glsl.ts:165,174,189` — three `paintOver(...)` calls building the dab layers.
- `paintOver` (`brush.glsl.ts:~250-261`) uses `paintOverOklab` + height accumulation — derivative-free itself, but absent from every `.wgsl.ts`.
- `grep dpdx|dpdy|fwidth **/*.wgsl.ts` → **zero hits.** The WGSL pipeline uses no screen-space derivative today.

Verdict: van-Gogh's WGSL port = `{StrokeHit, paintOver, paintOverOklab, relightImpasto (dFdx/dFdy),
vangoghDab}`. It is the FIRST derivative use, but `relightImpasto` fires in the uniform medium branch
(`aurora-mediums.wgsl.ts:388` reads `u.ints1.x`, a uniform), so it is WGSL-legal — unlike the oil
cascade's `curvedStroke` fwidth at `brush.glsl.ts:122` inside the data-dependent branch at `:118`.
The cost stratification is therefore REAL but RE-DRAWN: van-Gogh is cheaper than oil (uniform-flow
single derivative use, no `curvedStroke`/`bestOil`, no `paintStrokeLayers` 4-layer machinery), not
free. CRIT2 F1 stands; the pass-1 "derivative-free 1:1 cheap pilot" language is retracted.

---

## 3. The revised design — GF-AURORA-β, cost model repaired

### 3.1 The decomposition (unchanged) + the design authority (IOS27-CODEX)

The thesis holds: **mode identity ⊥ palette ⊥ backend.** A mode is a dual-ported dedicated body under
a parity contract; a palette is a preset; the two are never conflated. This makes P1 (preset skins)
and P2b (medium skins) the SAME principle at two levels, and P2a (the WGSL collapse) a plain invariant
violation to repair.

The IOS27-CODEX makes the register decision (§3.6), not just the body decision:
- **Law 11 (the restraint floor)** — "when nothing is focal, an ambient breathing background is the
  engagement floor." The aurora IS that floor. So the smooth ATMOSPHERIC exemplars (sky/sunset/dusk/
  dawn — the four the user named in F08) are the privileged DEFAULT class; the painterly modes
  (van-Gogh/oil-pastel/crayon) are deliberate identity opt-ins that must EARN their slot by being
  genuinely distinct. This is the design rationale for the two-tier register — dramatic reduction of
  the painterly clutter, protection of the breathing atmospheric floor.
- **Law 1 (progressive blur, never a slab)** — the aurora is the field a floating glass surface's
  backdrop-blur grades over; a mode that reads as a flat slab breaks law 1. The field-descriptor gate
  (G-MODE-DISTINCT, §5) measures spatial structure, so a mode cannot pass as a distinct-but-flat slab.
- **Law 2 (adaptive tint)** — glass samples the aurora's positional hue/luminance; the painterly
  modes' broken-color jitter must not destroy the sampleable hue field. Preserved by keeping the base
  nuclei color field intact under every medium (each body modulates, none replaces, `sampleBase`).

### 3.2 W1 re-costed (closes §0 + F1)

W1 is no longer "port a derivative-free dab." It is, in order:
1. Port the SHARED PAINT SUBSTRATE to WGSL: `StrokeHit` struct, `paintOver`, `paintOverOklab`, and
   `relightImpasto` — the LAST being the first WGSL screen-space derivative use (`dFdx/dFdy` →
   `dpdx/dpdy`), placed in the uniform medium branch so it compiles under WGSL uniformity.
2. Port `vangoghDab` (derivative-free analytic crescent SDF, `vangogh:43-114`) + `mediumVangogh`.
3. Remove `5` from the `applyMedium` collapse (`aurora-mediums.wgsl.ts:399`).
The substrate is shared with the oil arm (W4) — so relight is a SUBSTRATE cost W1 pays first, not an
oil-only cost (correcting pass-1 §2 SURVIVES, which wrongly listed the foundation as "already ported").

### 3.3 The medium-table reform (kills the silent alias)

The reform target is `applyMedium` (`aurora-mediums.wgsl.ts:387-403`), specifically the four-way
collapse at `:399-400`:

```
if (medium == 3 || medium == 5 || medium == 6 || medium == 7) { return mediumKuwahara(col, p, t); }
```

After the reform, EVERY selectable medium dispatches to exactly one dedicated body — no `||` alias:

| id | medium | reformed WGSL dispatch | wave |
|----|--------|------------------------|------|
| 0 | smooth | no-op | — |
| 1 | pastel | `mediumPastel` (exists) | — |
| 2 | watercolor | `mediumWatercolor` (exists) | — |
| 3 | oil | own cascade (PORT arm) OR enum deleted (KILL arm) — never Kuwahara-while-selectable | W4 |
| 4 | crayon | `mediumCrayon` reworked to drawn marks | W3 |
| 5 | vangogh | `mediumVangogh` (new WGSL twin) | W1 |
| 6 | oil-pastel | new burnish body (new dedicated) | W2 |
| 7 | kuwahara | `mediumKuwahara` (exists, keeps its own id) | — |
| 8 | metal | `mediumMetal` (exists) | — |
| 9 | metal-gradient | `mediumMetalGradient` (exists) | — |

`mediumKuwahara` keeps id 7 as its OWN honest medium; the reform is that nothing ELSE routes to it.

### 3.4 Per-mode express definitions (the shader-level mechanism that makes each distinct)

Each mode is defined by the shader mechanism that makes its RENDERED FIELD measurably unlike the
others — grounded in what the pipeline can express (`sampleBase`, `structureTensorField`, `flowField`,
`brokenColorJitter`, `vnoise`, the `StrokeHit`/`paintOver` substrate).

**van-Gogh (id 5) — DISCRETE LOADED COMMA DABS over dark ground.**
Mechanism: the `vangoghDab` analytic-crescent SDF field (derivative-free AA, `vangogh:83-87`),
oriented on the `flowField` swirl + per-cell angular jitter, placed SPARSELY (density ≈0.30) so the
darkened underpainting shows between marks, with a full-height impasto CROWN per dab relit by
`relightImpasto` (the raked glint that reads as raised paint). Distinct signature (measurable):
HIGH structure-tensor anisotropy A (long-thin flow-aligned dabs), MEASURABLE gap-fraction (dark
inter-dab ground), HIGH specular energy (impasto glints). Already real on WebGL2; W1 gives it the
WGSL twin. This is the CHEAPEST painterly port (no `curvedStroke`, no best-of-9), just not free.

**oil-pastel (id 6) — BROAD CREAMY SMEARS + ANALYTIC BURNISH SHEEN + ADDITIVE TOOTH-SKIP (new body).**
The extant is "awful" because it is a `profileFor(MEDIUM_OILPASTEL)` constant-skin of the oil cascade
(`oil-modes.glsl.ts:54-91`, all constant assignments; `mediums.glsl.ts:493-496`). The new dedicated
body, dual-ported, is three analytic terms — none using screen-space derivatives (closes F7):
- **Broad smears** — few big tensor-oriented soft capsules (chunky pitch, low count), NOT the oil
  best-of-9 bristle cascade. A creamy directional deposit, wide and soft.
- **Analytic burnish sheen** — the waxy gloss oil-pastel is named for (the crayon comment calls it
  oil-pastel's signature, `mediums.glsl.ts:148-150`). Computed as `pow(dot(N_analytic, H), shininess)`
  where `N_analytic` is the smear's cross-section normal derived ANALYTICALLY from the tensor
  orientation + the capsule half-width profile (perp gradient of a known profile), gated by the
  accumulated smear-coverage SCALAR. No `dFdx/dFdy` — so it ports 1:1, cheap by construction.
- **Additive tooth-skip broken deposit** — the INVERSE of crayon's tooth-multiply darken: oil-pastel
  is a wet creamy deposit that SKIPS the paper-tooth valleys and lays pigment on the ridges,
  ADDITIVELY (bright broken deposit), where crayon multiplies DARK into the pits.
- **Chroma punch.** Distinct signature: BURNISH specular film (glossy, unlike oil's matte impasto or
  crayon's dry matte), additive-bright broken deposit, broad low-frequency smear structure.

**crayon (id 4) — VISIBLE DRAWN SCRIBBLE MARKS, DRY (rework of the wash).**
The extant `mediumCrayon` (`mediums.glsl.ts:152-199`) is a real body but a UNIFORM full-field
tooth-multiply wash — it reads as a texture, not as hand-drawing. The rework keeps the dry
tooth-multiply substrate (the paper the marks ride) but adds DISCRETE directional scribble marks:
short strokes with pressure-varying width and LIFT-OFF (broken ends where the crayon leaves the
paper), following the structure tensor, DRY (no impasto crown, no sheen — the tooth-multiply darkens
in the pits, paper shows through the scumble gaps). Distinct signature vs van-Gogh: LOW specular
(no glint), HIGH tooth-frequency texture, paper-through gap-fraction rather than dark underpainting;
vs oil-pastel: thin scribbles not broad smears, matte not glossy, multiply not additive. Optional
graphite/ink contour-hatching read (density tracks luma, strokes cross the gradient) — SCOPE OPEN
(§8 user ASK): one crayon or crayon + a distinct ink mode.

### 3.5 The oil resolution (W4 — closes F2, F4, F5)

Oil is the one perf/size-gated arm. W4 has exactly TWO law-compliant terminal outcomes; the
`{3,7}`-relabel is deleted (it left enum 3 selectable-while-Kuwahara — a masking fallback):

- **PORT arm** — port `curvedStroke`/`bestOil`/`paintStrokeLayers` to WGSL. Requires (F4) hoisting
  the `curvedStroke` fwidth (`brush.glsl.ts:122,139-140`) OUT of the data-dependent branch (`:118`)
  — precompute the AA width before the conditional — so it compiles under WGSL uniformity. Requires
  (F5) staying within a declared `@fragment` MODULE-SIZE budget, since the single-source dispatch
  ruling (`CHRONIC-ADJUDICATION.md:34-36`) forbids a lazy split and the ~38KB cascade is appended to
  the always-compiled module. Outcome: enum 3 renders its real cascade on both backends.
- **KILL arm** — DELETE enum 3 from `MEDIUM_ID` (`uniformBridge.ts:71`) and `mediumOptions`
  (`options.ts`); re-express the surviving oil preset(s) as `kuwahara`+palette. Outcome: enum 3 is
  not selectable; nothing renders Kuwahara under an "oil" label.

Default lean: because BOTH perf AND module-size must clear for the PORT arm, and the boot-diet ruling
gives no lazy escape, W4 defaults to KILL unless a measured paint clears both budgets. Either way,
the stale `uniformBridge.ts:76-79` comment ("smooth core for every painterly id 1-7", which also
wrongly says kuwahara(7) degrades to smooth core) is corrected to reality.

### 3.6 The reduced preset register (closes F6; the round-2b override owned, closes F3)

Two tiers, exact count. Rule A — the atmospheric restraint-floor family (law 11): the four
user-named smooth identities each keep a slot (palette-variation is legitimate HERE because the
smooth atmospheric IS the named engagement floor). Rule B — the painterly/material bodies: exactly
one showcase per genuinely-distinct SHIPPED body (medium-coverage, round-2b finding 6).

**FIRM KEEP (10):**
| preset | body | rule / rationale |
|--------|------|------------------|
| `OPENAI_SKY` | smooth | A — user-named "sky" |
| `SETTING_SUN` | smooth | A — user-named "sunset" (canonical warm sunset) |
| `DUSK` | smooth | A — user-named "dusk" (cool dusk-lilac note, a distinct read) |
| `OPENAI_DAWN` | smooth | A — user-named "dawn" |
| `DELIBERATIVE` | pastel | B — the one pastel-body exemplar (already real; kept for coverage, NOT "now real") |
| `OPENAI_MEADOW` | watercolor | B — the one watercolor exemplar + the ONLY hybrid-warp coverage (round-2b finding 4) |
| `VANGOGH` | van-Gogh | B — real on both backends post-W1 |
| `OILPASTEL_SUNSET` | oil-pastel | B — the burnish-body showcase post-W2 (warmest of the trio) |
| `CRAYON` | crayon | B — the hand-drawn showcase post-W3 |
| `METAL` | metal | B — the metal-body exemplar |

**CONTINGENT (W4):** `OIL_IMPASTO` — an oil preset iff the PORT arm fires; if oil is KILLED it is
dropped or re-expressed as `kuwahara`+palette. Register = 11 (oil ported) or 10 (oil killed).

**OPTIONAL (W5):** a minimal `kuwahara` exemplar (kuwahara has zero preset today, round-2b finding 6)
— author one (+1) or document studio-only (+0). Register upper bound = 12.

**KILL (6 removed):** `VIVID_SETTING_SUN` (SETTING_SUN + chroma, reachable via the saturation knob,
round-2b finding 2), `DAY9_YELLOW` (watercolor near-dup of MEADOW, finding 4), `OIL_GESTURAL`
(profileFor sub-skin of OIL_IMPASTO), `OILPASTEL_RAINBOW` + `OILPASTEL_OCEAN` (palette skins of
OILPASTEL_SUNSET, finding 1), and `SPEEDTEST` RELOCATED to the consumer (presets-in-consumers).

Headline: **17 → 10 firm** (+1 contingent oil, +up-to-1 optional kuwahara ⇒ 10–12). Verify:
10 keep + 1 contingent + 6 removed = 17. ✓

**The round-2b override, owned (F3):** round-2b finding 3 *diagnoses* oil-pastel as an oil skin (true
— cited for that, §3.4) and *recommends merge into oil-as-a-mode* (a γ disposition). A13 ("a proper
oil-pastel brush mode … real modes or nothing", `FEEDBACK-LEDGER.md` A13) OVERRIDES that toward
authoring a real body (W2). round-2b is not cited as endorsing the new-body remedy; it endorses the
merge, which A13 outranks.

### 3.7 The V-A95 relationship statement

**ORTHOGONAL — the greenfield neither subsumes nor cures V-A95.** V-A95 is a CSS/compositing
present-race on `.aurora-canvas-layer` (`Aurora.vue:283-294`): a reverse-drag on the armed canvas
flashes a black backdrop snapshot; the shipped `isolation: isolate` cure is self-described unconfirmed
("Proof owed on the real in-app Chrome arm"). The mode work lives entirely in the shader/medium layer
and touches no compositing path, so it cannot fix the race. One interaction risk to sequence around:
W1/W4 add derivative/relight cost to the WGSL fragment, which could shift the GPU present timing the
race depends on — so W6 must re-confirm-or-replace AFTER the mode waves land, not before. Carried as
the bounded W6 rider, consistent with `REGISTRY.md:146` / `CHRONIC-ADJUDICATION.md:55-56` ("GF-AURORA
carries it; reported plainly as a shipping defect").

---

## 4. Wave shape (updated; bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope (pass-3 amendments in **bold**) | hard gate(s) | π obligation |
|------|-------|---------------------------------------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §3.3 body matrix; author all born-RED gate scaffolds (all RED at HEAD); **pin BOTH ε (parity) AND τ (distinctness) against a captured cross-backend + cross-medium baseline; declare the `@fragment` module-size budget** | gate suite compiles + all RED | — |
| **W1** | PAINT SUBSTRATE + VAN-GOGH-ON-PRIMARY | **port the shared substrate `StrokeHit`+`paintOver`+`paintOverOklab`+`relightImpasto` (first WGSL derivative use, uniform-flow) THEN** `vangoghDab`/`mediumVangogh`; remove `5` from `applyMedium:399` | G-PARITY-BODY(vangogh) incl. **uniformity-compiles + WebKit paint**, G-VANGOGH-PRIMARY | π-VANGOGH-PRIMARY, π-PARITY |
| **W2** | OIL-PASTEL REAL BODY | author the dedicated burnish body **(analytic derivative-free sheen)**; DELETE the `profileFor(MEDIUM_OILPASTEL)` skin (`oil-modes.glsl.ts:54-91`) + `mediumOilPastel` (`mediums.glsl.ts:493-496`); remove `6` from `applyMedium:400` | G-OILPASTEL-BODY (**derivative-free clause**), G-NO-SKIN-MODE | π-OILPASTEL |
| **W3** | CRAYON HAND-DRAWN | rework `mediumCrayon` (both backends) from the tooth-multiply wash to discrete drawn scribble marks (pressure + lift-off), dry; **carry the crayon-vs-crayon+ink ASK** | G-CRAYON-DRAWN | π-CRAYON |
| **W4** | OIL RESOLUTION | **PORT (hoist the `curvedStroke`/`bestOil` derivatives out of data-dependent flow + hold the module-size budget) OR KILL (delete enum 3, re-express oil presets as kuwahara+palette) — terminal set `{}`, never `{3,7}`**; fix the stale `uniformBridge.ts:76-79` comment | G-OIL-HONEST (**+module-budget clause**) | π-OIL |
| **W5** | PRESET REDUCTION | adopt the §3.6 17→10 firm register; relocate SPEEDTEST; kuwahara-exemplar decision; **run the full pairwise G-MODE-DISTINCT sweep over the shipped set** | G-PRESET-HONEST, G-SPEEDTEST-RELOCATED, **G-MODE-DISTINCT** | π-GALLERY, **π-DISTINCT** |
| **W6** | REVERSE-DRAG (V-A95) | confirm-or-replace the `isolation:isolate` cure on the real in-app Chrome arm **AFTER the mode waves land** (present-timing interaction, §3.7) | G-REVERSE-DRAG-NOSLAB | π-REVERSE-DRAG |
| **W7** | CONSUMER RE-POINT + FINAL | demo gallery adopts the reduced set + the real modes; overfitting audit (≥2 sites/exported/private-helper); FINAL.md | G-CONSUMER, overfit-audit | π-BAKE |

---

## 5. Born-RED gates (each names its RED-at-HEAD condition with file:line; lean per the gates-abrogation mandate)

- **G-MODE-DISTINCT (the distinctness gate — the F08 complaint operationalised).** For every unordered
  pair of shipped mediums `(m_i, m_j)`, rendered at ONE canonical config (fixed palette P0, fixed
  nuclei layout N0, fixed flow F0, fixed t0 — identical except `medium`), the descriptor distance
  `D(m_i, m_j) ≥ τ`, where D combines FOUR terms so tellability is measured by BOTH colour and
  texture: **ΔĒ** (mean perceptual CIELAB colour distance over the frame), **ΔA** (structure-tensor
  mean-anisotropy — the repo's §4.2 metric, the vangogh comments' own vocabulary), **Δβ** (radial
  power-spectrum slope — §4.3), and **Δρ_hf** (high-frequency energy / gap-fraction ratio — the
  atomicity metric). Texture-inclusive so two modes cannot PASS by sharing a palette while differing
  only cosmetically, and cannot FAIL merely for sharing a palette while differing in texture. τ is
  pinned in W0 as a fraction of a reference "obviously-different" pair (smooth ↔ crayon) captured on
  both backends. *RED today:* on WGSL, `D(oil, vangogh) = D(vangogh, oil-pastel) = D(oil-pastel,
  kuwahara) = 0` EXACTLY (byte-identical `mediumKuwahara`, `aurora-mediums.wgsl.ts:399-400`); on
  WebGL2, `D(oil, oil-pastel) < τ` (shared `paintStrokeLayers` cascade, differ only by `profileFor`
  constants, `mediums.glsl.ts:493-496` vs `:376-382`). The strongest possible RED — a literal zero.
- **G-PARITY-BODY.** For every medium shipping as a mode, the WGSL render is its OWN dedicated body
  (not a foreign `mediumKuwahara` call), parity-ΔE(mode) < ε vs its GLSL twin at fixed config/t, AND
  the body compiles under WGSL uniformity (all `dpdx/dpdy/fwidth` in uniform control flow) with a real
  WebKit paint. *RED today:* `aurora-mediums.wgsl.ts:399-400` routes 3/5/6/7 → `mediumKuwahara`; zero
  WGSL derivative use exists to prove the uniformity clause.
- **G-NO-SKIN-MODE.** No shipped medium is a pure `StrokeProfile`-constant skin of another (structural
  check: the body is a distinct function, not a `profileFor(X)`-only delegate to a shared cascade).
  *RED today:* `mediums.glsl.ts:493-496` `mediumOilPastel` = `profileFor(MEDIUM_OILPASTEL,0)` skin of
  `mediumOil` (`:376-382`); the branch is 100% constant assignments (`oil-modes.glsl.ts:54-91`).
- **G-VANGOGH-PRIMARY.** A `medium:"vangogh"` config on the WGSL primary renders the discrete
  separable-dab body (visible dark inter-dab ground, gap-fraction ≥ floor, impasto crown glints), not
  the Kuwahara smear. *RED today:* `applyMedium:399`.
- **G-OILPASTEL-BODY.** Oil-pastel renders a dedicated burnish body (broad tensor-oriented smears +
  ANALYTIC overlap-gated sheen + additive tooth-skip deposit), DERIVATIVE-FREE (no `dFdx/dFdy/fwidth`
  — the sheen is analytic from the smear cross-section, per §3.4), distinct from oil's bristle cascade
  AND crayon's tooth-multiply, on BOTH backends. *RED today:* no such body — oil-pastel is the oil
  skin.
- **G-CRAYON-DRAWN.** Crayon renders discrete directional hand-drawn scribble marks with pressure/
  lift-off, DRY (tooth-multiply darkening, no impasto glint, no sheen), not a uniform full-field wash.
  *RED today:* `mediumCrayon` (`mediums.glsl.ts:152-199` / `aurora-mediums.wgsl.ts:204-239`) is a
  full-field multiply, no discrete drawn mark.
- **G-OIL-HONEST.** Oil's primary render is EITHER its real ported cascade OR enum 3 is DELETED from
  the selectable mediums (absent from `MEDIUM_ID`/`mediumOptions`) with oil presets re-expressed as
  `kuwahara`+palette; the gate FAILS if enum 3 stays selectable while `applyMedium` routes it to a
  non-oil body. Terminal selectable-collapse set `{}`, never `{3,7}`. The PORT arm additionally holds
  the declared `@fragment` module-size budget. The `uniformBridge.ts:76-79` comment matches reality.
  *RED today:* enum 3 is selectable AND routes to `mediumKuwahara` (`:399`); the comment claims a
  false smooth-core degrade.
- **G-PRESET-HONEST.** No two shipped presets differ only by palette+flowAngle over an identical
  medium+nuclei+stroke-params. *RED today:* OILPASTEL_SUNSET/RAINBOW/OCEAN (`presets.ts:320/360/462`),
  SETTING_SUN/VIVID (`:591/:656`), MEADOW/DAY9 (`:96/:163`).
- **G-SPEEDTEST-RELOCATED.** SPEEDTEST absent from the demo aurora showcase. *RED today:* `PRESETS`
  includes `SPEEDTEST` (`presets.ts:685-703`).
- **G-REVERSE-DRAG-NOSLAB (rider).** A reverse-drag on the armed canvas paints no black backdrop-race
  sample, confirmed on the real in-app Chrome arm. *RED today:* `Aurora.vue:283-294` — cure
  self-described unconfirmed.

---

## 6. π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)

- **π-DISTINCT** — capture every shipped medium at the canonical config on both backends; compute the
  pairwise D-matrix; prove `min D ≥ τ`. Baseline = the D=0 rows (oil/vangogh/oil-pastel/kuwahara on WGSL).
- **π-PARITY** — capture each real mode on BOTH backends at fixed config/t; ΔE map; prove < ε.
- **π-VANGOGH-PRIMARY** — capture `vangogh` on WGSL; prove discrete separable dabs. Baseline = the Kuwahara smear.
- **π-OILPASTEL** — capture the rebuilt oil-pastel; prove burnish sheen + additive tooth-skip. Baseline = the "awful" oil-skin extant.
- **π-CRAYON** — capture the drawn crayon; prove visible scribble marks + lift-off. Baseline = the wash.
- **π-OIL** — capture oil's resolved primary render (real cascade OR the KILL arm's honest absence).
- **π-GALLERY / π-BAKE** — capture the reduced demo gallery + the thumbnail bakes on the real modes.
- **π-REVERSE-DRAG** — capture a reverse-drag post-mode-waves; prove no slab (the V-A95 confirm-or-replace).

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band. The
parity + distinctness gates each need BOTH a WebGPU AND a WebGL2 paint of the same config.

---

## 7. Banked-route dispositions

- **α (backend-parity port): BANKED-ALIVE** — its port MECHANISM + parity-ΔE gate are consumed by β
  (W1/W4). Its "1:1 transliteration" mechanism was under-costed (CRIT2 F4) — the WGSL uniformity
  restructure is real work, now budgeted in W1/W4. The fallback if β's new-body authorship stalls;
  a port strictly beats the collapse.
- **γ (honest-to-primary reduction): BANKED-ALIVE, with a stronger claim on oil-pastel than pass-1
  credited (CRIT2 F3).** Its preset cull is adopted unconditionally (W5). On oil-pastel specifically,
  round-2b's actual remedy (merge into oil-as-a-mode) IS γ — so γ is the incumbent recommendation β
  overrides on A13 grounds, now stated openly (§3.6). Its cost logic feeds W4 (oil may honestly be
  killed toward kuwahara). Cannot lead (P2c: the user wants MORE real modes). Reopens as primary only
  if β's new bodies prove aesthetically unachievable or perf/size-blocked across the board.
- **V-A95 reverse-drag: RIDER (orthogonal)** — §3.7; W6 confirm-or-replace, sequenced after the mode
  waves for the present-timing interaction.

---

## 8. Convergence + open gaps + the user ASK

**Convergence: 58%** (pass-1 self-scored 48%, CRIT2 re-scored 40%). Justification: the 40% architecture
(the mode ⊥ palette ⊥ backend decomposition, the skins-vs-modes invariant, the honest oil quarantine)
was never the problem and holds; pass-3 closes EVERY CRIT2 deduction — the cost model is re-drawn
honestly (F1/§0), the cardinal-law `{3,7}` contradiction is deleted (F2), the round-2b override is
owned (F3), WGSL uniformity + module-size are budgeted (F4/F5), the count is reconciled (F6),
oil-pastel is pinned derivative-free (F7) — AND the user's actual F08 complaint now has a measurable
born-RED distinctness gate (G-MODE-DISTINCT) that reds at a literal zero today. The number rises from
40 to 58, not higher, because the remaining gaps are STRUCTURAL to a doc-only tranche-dev seat and
cannot close here:

1. **Zero paint verification.** Every π is OWED; no RED baseline captured; the two NEW bodies
   (oil-pastel burnish, crayon scribble) are spec-only and their "not-awful" aesthetic bar (the user's
   own word) is unprovable without a paint. The primary cap.
2. **Oil W4 branch unmeasured.** Both outcomes are now law-compliant (PORT or KILL), so the fork no
   longer hides a masking arm — but which fires depends on an unmeasured perf + module-size paint.
3. **τ and ε pinned only against a DESCRIBED baseline.** W0 must capture the cross-backend +
   cross-medium reference before either threshold is a hard scalar.
4. **The oil-pastel/crayon bodies are NPR spec, not audited renders.** Bounded techniques with in-repo
   dedicated-body exemplars (`vangoghDab`, `mediumCrayon`), but the field-statistics targets (A, β,
   gap-fraction) are asserted, not measured.
5. **V-A95 root cause remains a hypothesis** (`Aurora.vue:288-292`); W6 may need a materially
   different fix. Orthogonal, bounded, unresolved.

**The user ASK (one genuine question, per the charter):**
- **Crayon scope** — the user's A13 phrasing "a proper crayon/hand-drawn mode" is singular. The
  greenfield leads with ONE reworked crayon (dry hand-drawn scribble). Does the user want crayon ONLY,
  or crayon PLUS a distinct graphite/ink contour-hatching mode? This sizes W3 (one body or two) and is
  the only decision that cannot be settled from the codebase or the ledger.

Secondary, formation-internal (surfaces to ASK only if the user wants a tighter floor): pastel
(DELIBERATIVE) and watercolor (OPENAI_MEADOW) are kept as one-exemplar-per-distinct-body; neither is
user-named-good nor named-awful. The lean is KEEP (medium-coverage); demotion to studio-only is
available if the user wants the register below 10.

Per the charter, this is pass 3 of ≥3; convergence still requires two consecutive clean passes + a
fresh adversarial audit that this seat cannot self-supply. 58% honestly reflects "architecture
converged and internally consistent; empirical verification structurally owed."

**Lead rider (JUDGE.md C-G, 2026-07-17):** F08 is discharged ONLY when W1-W4 real-body authorship
lands with G-MODE-DISTINCT green — never at the preset-cut checkbox alone. The preset register
reduction (17→10) without the shader bodies leaves the byte-identical-Kuwahara duplication the
user named; the two halves are bound.
