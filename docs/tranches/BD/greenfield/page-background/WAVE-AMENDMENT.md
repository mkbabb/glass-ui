# PAGE-BACKGROUND — WAVE-AMENDMENT (the concrete tranche amendment)

> Makes `BD.W-PAGE-BACKGROUND` BUILDABLE by reconciling it against the live 116-wave
> union set + the GOLDEN (`./GOLDEN.md`) + the six challenge folds (`./DELTA-ASSAY.md`).
> Reference implementation: **`./GOLDEN.md`** (with §2d numbers STRUCK, the spike
> RE-INVENTED, the base primitive CO-MINTED honestly). No duplicative work — every
> cross-wave edge is reconciled below. Tranche-DEV only; build is USER-gated.

---

## 0 — RECONCILE FIRST (the on-disk reality of the 116-wave set)

Grepped live (`docs/tranches/BD/union/waves/`, 116 `.md`):

- **ON DISK:** `BD.W-PAGE-BACKGROUND.md` (the spec to make buildable), `BD.W-FIELD-ENGINE.md`
  (the GPU shader-noise chunk hoist — **ORTHOGONAL**, not the CSS page field), `BD.W-AMBIENT-TINT.md`,
  `W-GLASS-ABROGATE-GRAY.md`.
- **BOOKED-BUT-UNWRITTEN** (authored by sibling deltas, files pending tranche-dev close):
  `BD.W-GLASS-FIELD` + `BD.W-GLASS-KEY-EDGE` (glass-material delta), `BD.W-AUR-VIVIDNESS` +
  `BD.W-AUR-METAL-FINISH` + `BD.W-AUR-IMAGE-SOURCE` (aurora delta), `BD.W-CARTOON-PUNCH` +
  `BD.W-MOTION-WEIGHT` (motion-spring delta). These are the co-mint / depend edges below.

**The headline reconcile: `BD.W-GLASS-FIELD` and THIS amendment are the SAME primitive at two
floors.** The glass-material delta booked `BD.W-GLASS-FIELD` = *"warm the MOUNTED PaperBackdrop
AppShell:251, decouple --neutral-0, NOT a 2nd plane"* — calibrated to a composite-behind-glass
floor (~0.012). THIS amendment HARDENS that same `paper-field` to the §3 **FIELD** floor (0.045)
and PER-ROUTES it. They must NOT both mint `paper-field`. → **MERGE: `BD.W-GLASS-FIELD` becomes
the glass-floor arm; `BD.W-PAGE-FIELD` (this amendment) is the field-floor + per-route + drift
arm of the ONE `@utility paper-field`.** One mint, two acceptance floors, no dual path.

---

## 1 — THE AMENDMENT (augment / new / merge / excise — cite by filename)

### AUGMENT `docs/tranches/BD/union/waves/BD.W-PAGE-BACKGROUND.md` (make it buildable)

The wave is currently a DEMO-CHASSIS map (`CATEGORY_DEFAULT_BG` routes glass bands off `grid`/
`paper` onto `liquid-grid`/`aurora` live fields + `tier="field"` re-points + the BUG-D1/D2 dock
folds). That arm is FIT and stays — but it has **NO CHROMA PRIMITIVE**: routing onto `liquid-grid`/
`aurora` still leaves the §3 floor unmet (the aurora field itself reads C 0.0350 < 0.045, live;
the `liquid-grid` is near-invisible by design). The augment ADDS the field-chroma primitive the
map needs to land:

- **ADD the `.paper-field` warm-cel GROUND as the universal floor** the map routes ONTO. Reference
  `./GOLDEN.md` §2b (the hardened `@utility paper-field`) with the §2d numbers STRUCK (fabricated)
  and the floor re-derived from a REAL raster at the GROUND rung. The existing `liquid-grid`/
  `aurora`/`paper` map becomes the AMPLIFIER selector OVER this warm ground — never "live vs dead";
  the warm ground is universal, no route is ever flat.
- **RE-POINT the wave's `tier="field"` arm:** dropping the plate to transparent now reveals the
  WARM field (not flat paper/cream). The wave's own note — *"`tier="field"` only DROPS the plate;
  with NO live page field behind, 'field' still floats over static paper. The fix is the live page
  field, not just the frame tier"* — is EXACTLY closed by `paper-field` as the ground.
- **KEEP** the wave's one-GL-per-route budget, the BUG-D1/D2 dock folds, the surface-axis row, the
  `proof:page-background` source-structure gate, and the zero-`src/`-paint fence FOR THE DEMO ARM.
  The `src/` edits (the `paper-field` co-mint) are owned by the NEW `BD.W-PAGE-FIELD` below (a
  library wave), NOT this demo wave — the scope split is honest.

### NEW `BD.W-PAGE-FIELD` (the buildable CHROMA core — co-mints `paper-field`)

The library primitive the map needs. Reference: `./GOLDEN.md` §2b/§2c.

- **CO-MINT `@utility paper-field`** in `src/styles/paper.css` (sibling to `paper-underpaint` —
  the file already exists; honest net-new, NOT "adopt verbatim"). The four-layer technicolor cel
  (amber key + terracotta mid + sand bounce + conic over-glaze) + the wide low-chroma BASE WASH
  (the calibration fix that raises the floor everywhere) + the dark warm-luminous arm. Chroma at
  FIELD-L (0.88 light / 0.30 dark), gamut-edge — the §3 floor lives HERE, not at the L0.98 plate.
- **`@property --field-h`** registered; the warm-bound is enforced IN THE CSS CALC:
  `--field-h: clamp(25, var(--field-h-raw, 62), 95)` — paint-hard-bounded (an inline `--field-h:210`
  CANNOT paint teal; challenge#3 R4's live teal-leak is closed at the paint layer, not a TS-only
  convention).
- **DECOUPLE `--neutral-0`** as the L0 opaque floor under the stops (the reduced-transparency +
  no-gray floor) — untouched, never deleted.
- **MERGE with the booked `BD.W-GLASS-FIELD`:** `BD.W-GLASS-FIELD` is the glass-floor (~0.012
  composite-behind-glass) acceptance arm; `BD.W-PAGE-FIELD` is the field-floor (0.045) + the
  base-wash + the over-glaze + per-route. ONE `@utility paper-field`, TWO acceptance floors.
- **The cartoon drift `::before`** rides `--ease-cartoon-punch` (DEPEND on `BD.W-CARTOON-PUNCH`, no
  literal-cubic duplicate); guarded by `content-visibility:auto` + intersection-pause (the drift
  `::before`, not only the Aurora rung — challenge#2 R6d's permanent-full-screen-compositing fix).
- **Gate:** `proof:page-field` source arm (the `@utility` exists, `--field-h` registered + clamped,
  `--neutral-0` decoupled) + the π below.
- **Born-RED:** `grep paper-field src/` = 0 (live-verified); `--field-h` UNSET on `:root` (live).

### NEW `BD.W-FIELD-SCRIPT` (the per-route hue — DERIVE, do not duplicate)

Reference: `./GOLDEN.md` §2a, with the `FIELD_SCRIPT` registry REPLACED by a derive-adapter.

- **DROP `FIELD_SCRIPT`** (the GOLDEN's NEW `demo/stories/field-script.ts` Record). It is a THIRD
  per-category color registry; `categoryHue(id)` (`category-hero.ts:159`) is the documented ONE
  source (*"never a hand-rolled SECTION_HUE duplicate"*), `CATEGORY_PALETTE_HUES`
  (`aurora-hero.ts:110`) the second. A third violates DRY.
- **AUTHOR `warmFieldHue(id): WarmHue`** (presets-in-consumers, `demo/stories/`): ONE adapter that
  maps the EXISTING `categoryHue(id)` index (1-12, currently COOL — forms 2 indigo, substrates 3
  teal, feedback 8 ruby, live-read) → a warm-clamped degree ∈ [25,95]. ONE category-color source,
  warm-projected for the field.
- **OWN the hero recolor explicitly:** the hero `<Aurora>` reads `CATEGORY_PALETTE_HUES` (cool).
  For "two renderers of ONE script" (GOLDEN §1.4) to be true, the hero Aurora field MUST read the
  SAME warm source — route `heroAuroraConfig` through `warmFieldHue` for the FIELD rung (the editorial
  hero palettes may stay; the field-tint hue is shared). State this; do not silently leave the
  registries conflicting.
- The chassis writes ONE `--field-h` per route from `warmFieldHue(category)` via the StoryHero/
  manifest seam. ONE writer → all 118 routes.
- **Gate:** `proof:field-script` — `--field-h` differs across ≥3 sampled categories AND every
  resolved hue ∈ [25,95] (the warm-clamp as a painted assert); no second category-color Record on
  disk (the DRY bite — a new `FIELD_SCRIPT`-shaped `Record<category,hue>` REDs).

### NEW `BD.W-FIELD-AURORA-RECONCILE` (rung 1 — the amplifier)

Reference: `./GOLDEN.md` §2e.

- The per-route `<Aurora field>` reads the SAME `--field-h` (via `warmFieldHue` →
  `heroAuroraConfig`); `CATEGORY_DEFAULT_BG` (`manifest.ts:181`) becomes the AMPLIFIER selector
  (amplified vs plain), never "live vs dead"; one-GL-per-route enforced (reconciles the
  `BD.W-PAGE-BACKGROUND` one-GL budget + BUG-D1/D2 folds — no new fence).
- RECONCILE `BD.W-AUR-VIVIDNESS` (booked, unwritten): the aurora field's §3-floor lift IS this
  reconcile — Aurora amplifies the SAME warm script the CSS mesh grounds. No separate aurora field.

### MERGE / DEPEND / EXCISE edges (reconciled against the 116-wave set)

| edge | wave | action |
|---|---|---|
| MERGE | `BD.W-GLASS-FIELD` (booked) | the glass-floor arm of the ONE `paper-field`; `BD.W-PAGE-FIELD` is the field-floor + per-route arm. ONE mint. NOT two `paper-field`s. |
| DEPEND | `BD.W-GLASS-KEY-EDGE` (booked) | `--glass-key` is co-minted there; the field over-glaze + the glass rim/cast share it. FORBID the `-58deg` literal in shipped CSS (G7 must FAIL on a missing token, not paper it over). |
| DEPEND | `BD.W-CARTOON-PUNCH` (booked) | `--ease-cartoon-punch` for the drift; no literal duplicate. |
| RECONCILE | `BD.W-AUR-VIVIDNESS` (booked) | the aurora field is the rung-1 amplifier of THIS warm script; collapses onto `--field-h`. |
| CONSUME | the viz §3 deltas (`BD.W-DOTMATRIX-LIQUID-LENS`, `BD.W-FOURIER-LOOM`, `BD.W-CONCENTRIC-RELIEF`, `BD.W-PAPERGRID-FACE`, `BD.W-GOODOT-LIQUID-FIELD`, `BD.W-DOTFLOW-AURORA-CURRENT` — all booked, all routed their "colourful ground" HERE per the ledger) | they CONSUME `paper-field` as the substrate ground; each is a sibling layer at the same `z`, lit by this field. NO per-viz field fork. |
| ORTHOGONAL (no edit) | `BD.W-FIELD-ENGINE.md` (on disk) | the GPU shader-noise `field/{noise,flow,color}` chunk hoist — a shader basis, NOT the CSS page field. Disjoint. |
| ORTHOGONAL (no edit) | `BD.W-AMBIENT-TINT.md` / `W-GLASS-ABROGATE-GRAY.md` (on disk) | the glass PLATE warm + the ambient-hue observer; the field is BEHIND the glass, they tint the glass over it. Reconciled by glass-material delta, not re-touched here. |
| EXCISE (from the GOLDEN, not a wave) | `FIELD_SCRIPT` registry; "adopt verbatim / byte-untouched / 3 net-new artefacts"; the §2d fabricated number table; the stop-string `sampleField()` | replaced by the `warmFieldHue` derive, honest 6-artefact co-mint count, raster-derived numbers, and the re-invented raster spike. |

**NO existing on-disk wave is PRUNED** — `BD.W-PAGE-BACKGROUND` is AUGMENTED (the demo-chassis arm
stays whole + gains the chroma ground it lacked); the chroma + per-route + reconcile work lands in
3 NEW library/demo waves; the glass-material/aurora/motion edges MERGE/DEPEND onto already-booked
siblings. No duplicative work against the 116-wave set.

---

## 2 — THE BORN-RED GATE: `tests-visual/page-background.spec.ts` (RE-INVENTED, painted-pixel)

Reference: `./GOLDEN.md` §6, with the apparatus RE-INVENTED per the challenge folds. The cardinal
rule holds: **sample the COMPOSITED page pixel behind a REAL glass surface via a full-page
screenshot → `getImageData` of the field region — NEVER a hardcoded inline field, NEVER
`getComputedStyle` of the base token, NEVER the WebGL canvas, NEVER the stop-string averager.**
Paired-engine (Chromium + WebKit), both modes.

| # | assert | born-RED on HEAD (live-verified) | GREEN when |
|---|---|---|---|
| **G1 field-present** | every glass/viz route mounts `.paper-field` (or `<Aurora field>`) at `z` below the glass | `/forms/select`: **0 fields, 24 glass** (live) | the chassis mounts the field |
| **G2 field-VIVID (§3 floor, GROUND rung)** | the field region behind the glass samples **mean OKLab C ≥ 0.045 warm** (H ∈ [25,95]); luminance variance > floor; **measured at the UNIVERSAL ground intensity, not vivid** | flat **C 0.0029** H 84.6 (live) | the cel ground renders (raster ~0.073 @ vivid; ground re-measured) |
| **G3 per-route + warm-clamp** | resolved `--field-h` differs across ≥3 categories AND every hue ∈ [25,95] (painted assert) | `--field-h` **UNSET** (live) | `warmFieldHue` writes the route hue |
| **G4 dark-warm-luminous** | dark field mean C ≥ 0.045, warm floor, L in the dark-glow band | **C 0.0028 @ L 0.146** (live) | the warm-dark mesh |
| **G5 transmit-DELTA (the user's #1 complaint — RE-INVENTED A/B)** | TWO real glass controls: one over the field, one over an opaque `--neutral-0` PATCH masking the field BEHIND the glass; composited C ≥ 0.018 warm DELTA | the spike A/B is self-compare (both over `#field`, eye-confirmed identical) | the valid flat-page A/B shows the delta |
| **G6 viz-lit** | a substrate viz canvas EDGE reads the warm field behind it (C ≥ 0.045) | viz edges over flat 0.0029 | the field is the viz ground |
| **G7 cel-coherence (BLOCKED on `--glass-key`)** | the over-glaze lit corner exceeds the opposite by ΔL keyed off `--glass-key`; the `-58deg` literal is FORBIDDEN — a missing token FAILS, never papers over | `--glass-key` **UNSET** (live) — G7 born-RED for the RIGHT reason once the literal is banned | `BD.W-GLASS-KEY-EDGE` mints `--glass-key` AND both field + glass rim consume it |
| **G8 prose-AA + proportion** | body text ≥ 4.5:1 over the live field, both modes; field opacity below the loud ceiling on dense bands | — | bucket + opacity cap hold |
| **G9 anti-evasion self-test (≥7 bites)** | FAILS on: flat-base field, hardcoded inline field, teal stop (h210), uniform fill (varL 0), loud field (AA fails), **a computed-stop-string-average input** (bites the GOLDEN's own broken method), **a reduced-transparency-collapse miss** (`--field-intensity:0` must drop to flat `--neutral-0`, C < 0.005) | — | self-test passes only on the real composited vivid mesh |

**Surfaces:** `/forms/select`, `/forms/inputs`, `/containers/dialog`, `/feedback/alert`,
`/substrates/aurora`, `/substrates/blob`, `/display/buttons`. BOTH modes, BOTH engines. NO
source-green close — the painted π is binding. The spike (`golden/spike.html`) MUST be RE-RUN in
WebKit (it never was) and the gradient interpolation space PINNED (challenge#3 R6: the default is
oklab, not sRGB as §4 claims) before build-close. The honest floor is the raster's STATED number;
if a Safari gamut-map caps a route below 0.045 through an AA-legible stack, the bar is the
honestly-achievable number STATED, never an acceptance number the evidence fails.

---

## 3 — SUMMARY

Three NEW waves (`BD.W-PAGE-FIELD` co-mints the `@utility paper-field` chroma core + CSS-clamp
warm-bound; `BD.W-FIELD-SCRIPT` derives `--field-h` from `categoryHue` via `warmFieldHue`, NO
third registry; `BD.W-FIELD-AURORA-RECONCILE` makes Aurora the rung-1 amplifier), an AUGMENT of
the on-disk `BD.W-PAGE-BACKGROUND` (the demo-chassis map gains the chroma ground it lacked + the
RE-INVENTED painted-pixel π), a MERGE with booked `BD.W-GLASS-FIELD` (ONE `paper-field`, two
floors), DEPEND edges on booked `BD.W-GLASS-KEY-EDGE` + `BD.W-CARTOON-PUNCH`, a RECONCILE of
`BD.W-AUR-VIVIDNESS` + the ~6 viz §3 deltas onto the ONE `--field-h` script. NO on-disk wave
pruned; the GOLDEN's `FIELD_SCRIPT` + fabricated §2d table + stop-string spike + "adopt-verbatim"
framing are EXCISED. Reference implementation throughout: `./GOLDEN.md`.
