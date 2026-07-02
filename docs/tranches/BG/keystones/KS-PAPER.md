# KS-PAPER — the SUBTLE paper-morphism keystone (binding spec)

**Series:** KEYSTONE-PERFECTION KS-A · **Author:** Fable spec arm · **Date:** 2026-07-01 · **HEAD:** `fa6ed40a` (tranche/BG).
**Waves bound (frozen cursor ids):** 14.1 `BG.W-PAPER-TEXTURE-UNIFY` / `-GRAIN-REAL` (raster tooth PRIMARY) ·
17.5 `BG.W-GLASS-PAPER-CONGRUENCE` · the LX.2 no-double-warm CEILING (owned by 14.1) · 14.3-adjacent congruence
(the contract 14.1 leaves for `W-HANDMARK-PERFECT`; HandMark internals are KS-B/KS-HANDMARK's).
**Research inputs (read in full, composed here):** `research/PAPER-sota.md` (the SOTA half) ·
`research/PAPER-corpus.md` (the disk/history half). This spec BUILDS on both; it re-derives neither.
**Fences honored:** spec-only (zero src/demo/scripts edits); SYNTHESIS-PASS1 §4 protected set inviolable
(warm HSL identity values, alpha ladders, `in srgb` surface-tint fence — `SYNTHESIS-PASS1.md:108-116`); the wave
SET is frozen (fold-candidates recorded for the orchestrator, never self-inserted); siblings read-only.

---

## §1 · The hallmark delineated

**Paper morphism is the library's MATTE pole — the quiet warm tactile stratum the transmissive glass floats
over.** A stranger recognizes glass-ui's paper by four signatures at once:

1. **A warm structured tooth that reads at 1× and never shouts.** Real paper stock under raking light — a
   coarse, bounded-amplitude fiber relief in the warm-ecru family, FELT on every surface that claims paper,
   invisible as an effect. Not TV static, not a gray film, not brushed metal.
2. **Print physics, not print costume.** The blend is the physically-true `multiply` (light) / `screen`
   (dark) — ink darkens valleys, light lifts them (`paper.css:48-92`). The vocabulary is complete at three
   moves: warm wash (the paper-white substrate) + tooth (the fiber relief) + deboss (ink pressed INTO the
   tooth). The deckle, torn edges, lifted-corner shadows are FENCED kitsch (atlas FD1/DL2 §P4;
   `PAPER-sota.md:297-301`).
3. **One light over both materials.** The paper tooth's relief and the glass bevel/specular/under-shadow all
   lean the SAME key (azimuth ≈ 290.56°, the `--glass-key-direction` spine) — matte and transmissive read as
   ONE lit world (17.5; `PAPER-corpus.md §6`).
4. **The register fence.** Paper is warm and legible-as-material; glass is a neutral whisper
   (`--glass-grain-opacity` 0.025/0.045, byte-untouched). The separation IS the design — the materials cohere
   through the shared light, never a shared texture (WS9 A2, `SPEC-pass2.md:10`).

**The user's emphasis is binding: SUBTLE!** The seed mandate names the hallmark "paper morphism that's
SUBTLE! and beautiful." This spec resolves the subtle-vs-visible tension the way the SOTA report proved
(`PAPER-sota.md:76-79`): **subtle governs AMPLITUDE and COVERAGE, not VISIBILITY.** Real letterpress tooth
reads at arm's length without a loupe, yet ink coverage stays under half the printable area. The tooth is
plainly there where paper is claimed (no-squint std ≥ 4.5) and plainly bounded (mean-L drift < ~5%, chroma
ceiling, whisper fence) everywhere else. *A whisper you notice when it's gone.*

### §1.1 · The negative space — two rejections + one live recurrence (the spec's structural immunity)

The paper register was designed three times; the user rejected the SVG-noise path twice, verbatim
**"disgusting metallic"** (`DEV-A2-restructure-rows-10-19.md:241`), and the failure class recurred LIVE a
third time during BG execution (D-2, `e40e5095`). Each failure names a structural cause; the design below is
immune to each BY CONSTRUCTION, not by re-tuning:

| # | failure | mechanism | structural immunity in THIS design |
|---|---|---|---|
| R1 | **Invisible** — "I don't see any paper grain or grit anywhere" | fine `bf 0.65` cloud averages to grey on hiDPI; `overlay`/`soft-light` collapse to identity on the cream/ink poles (measured std 0.02–0.86, `paper.css:9-14`; GOLDEN §0) | the tooth is a COARSE structured band (dominant wavelength 3–5 CSS px) with its amplitude BAKED into a committed tile; the blend is multiply/screen (never overlay/soft-light); the gate floor is the no-squint std ≥ 4.5 on the live route |
| R2 | **Metallic** — "disgusting metallic", twice | `feDiffuseLighting` computes normals from a noise bump-map under one distant key → anisotropic brushed-metal sheen at any non-trivial `surfaceScale` (MDN; WS9 M4: "specular IS the metal"); amplified silently by the `linearRGB` default (51% std swing, `challenge/2.md:56-72`) and the Safari `lighting-color` white-fallback (WS9 M2) | the PRIMARY is a **matte raster tile — it has no lighting primitive, no normals, no specular term; a scanned tooth cannot read metallic** (`SPEC-pass2.md:74`). It ships the same pixels to every engine (no linearRGB, no lighting-color, no per-DPR normal grid). The lighting path survives only as a capture-gated, never-load-bearing enhancement (§3.Q1) |
| R3 | **Metallic-gray recurrence (D-2)** — grey tooth over a bare recessive field | the grey `saturate=0` tooth borrowed ALL its warmth from the substrate; when `3f200f1d`+`274a2a6e` removed the universal warm plane, multiply desaturated surfaces below the C 0.02 warm floor (`D2-paper-grain-DELTA.md:11-19`) | **warmth is baked AT SOURCE** (tile mean chroma ~0.045, 2-3× the floor) — the tooth reads warm over ANY substrate, including a bare or dark one. The substrate-warmth dependency that made the class recur is severed; the gate proves warmth on a worst-case neutral substrate |

The two-sided warm gate (floor C ≥ 0.020 at source AND the LX.2 ceiling on the composite) is the D-2 lesson
made permanent: too little warmth = metallic gray; too much compounding = brassy. Both bounded, both π'd.

---

## §2 · SOTA grounding (composed from `research/PAPER-sota.md` — named references)

The full SOTA case is the research report; the load-bearing findings this spec binds:

- **The 2026 identity anchor.** "Tactile maximalism / texture, warmth and tactile rebellion" is the dominant
  2026 direction — warm paper/grain/glass that mimics the physical world, explicitly the anti-AI aesthetic
  ([Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026),
  [SNIX](https://www.snix.mt/post/tactile-maximalism-web-design-2026),
  [Fireart](https://fireart.studio/blog/the-best-web-design-trends/)). The KS-PAPER thesis is the SOTA center
  of mass, and SOTA prescribes exactly the corpus's discipline: static overlay, no WebGL, low weight, restrained.
- **Raster-primary is the state of the art for THIS problem, on five independent grounds**
  (`PAPER-sota.md §3`): (a) engine-invariant pixels vs the measured 51% linearRGB swing
  ([MDN feDiffuseLighting](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDiffuseLighting);
  `challenge/2.md:56-72`); (b) feDiffuseLighting is structurally sheen-prone (the rejected read is what the
  primitive is built to produce); (c) the Safari `lighting-color` data-URI risk is silent and one-engine;
  (d) SVG filter noise is paint-heavy on large areas/mobile — "use a small tiling PNG texture"
  ([uwarp nnnoise](https://www.uwarp.design/nnnoise), [Daniel Immke](https://daniel.do/article/making-noisy-svgs));
  (e) real film grain is STRUCTURED bounded-amplitude texture, which a baked tile IS by construction
  ([Wikipedia Film grain](https://en.wikipedia.org/wiki/Film_grain)). Row 14.1's inversion is not a retreat.
- **Blend law confirmed at the poles.** SOTA's "8-12% soft-light" figure is a mid-tone-plate number; the
  cream/ink poles need multiply/screen ([CSS-Tricks Grainy Gradients](https://css-tricks.com/grainy-gradients/);
  GOLDEN §0.1). The corpus law stands.
- **The numbers** (`PAPER-sota.md §4` · `PAPER-corpus.md §5`): no-squint floor **std ≥ 4.5** (light, washed
  plate, live route); dirt ceiling **mean-L drift < ~5%** (the letterpress ink-coverage law,
  [Alphabet Press](https://thealphabetpress.com/designing-in-letterpress/)); warm floor **source C ≥ 0.020**
  baked at 2-3× margin (~0.04–0.05); the LX.2 landed composite range **C 0.02–0.045** as the ceiling anchor.
- **The cohabitation theory.** Apple Liquid Glass is a multi-layer material system with content/control
  HIERARCHY ([Apple HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials),
  [createwithswift](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/));
  glass-ui's differentiated move is making the cohesion a gate-locked single-light TOKEN spine (17.5) rather
  than per-surface runtime adaptation.

---

## §3 · First-principles design — the greenfield loop (three contested questions)

### Q1 — the tooth SOURCE: authored raster · generated-at-build · hybrid (+ the enhancement's honest gate)

**Brainstormed directions:**

- **(a) Authored committed raster** — a one-time scanned/hand-picked paper photograph, cropped seamless,
  committed as the tile. Maximally organic; but non-reproducible (no parameterized re-calibration path — every
  retune is a new scanning session), and a photographic scan carries uncontrolled hue/amplitude statistics the
  gates then chase.
- **(b) Generated-at-BUILD tile** — a seeded baker runs in the build pipeline, emitting the tile per build.
  Parameterized and reproducible; but the shipped pixels are no longer a fixed committed input (a toolchain/
  library bump silently re-renders the identity — the exact non-determinism raster-primary exists to kill),
  and the born-RED gate has no stable hash to anchor. SOTA F20 REJECTS this (`PAPER-sota.md:391`).
- **(b2) Warm-DUOTONE SVG** (no lighting) — keep feTurbulence but map it through an `feComponentTransfer`
  duotone ramp (black→umber, white→ecru) instead of `saturate=0` + lighting. Kills the specular term and the
  lighting-color risk; tiny payload. But it is still a THIRD procedural attempt at the mechanism family the
  eye rejected twice, still unstructured speckle (fails the film-grain-is-structured finding, SOTA F4), still
  carries the residual cross-engine transfer/blend deltas — and the frozen row 14.1 already ruled raster
  PRIMARY. REJECT for the tooth. (ADOPTED below for the one token whose critical-partition placement forbids
  a raster payload — the aged rung, §4.1.D.)
- **(c) HYBRID: committed tile + committed BAKER (the regen-spring-tokens model).** A checked-in generator
  (`scripts/bake-paper-tooth.mjs`, seeded, parameter table at top) bakes the tile ONCE; the OUTPUT tile is
  committed and hash-gated; regeneration is a deliberate re-commit with a fresh capture verdict, never a build
  step. The shipped pixels are engine-invariant AND the identity is parameterized (re-calibration = edit the
  table, re-run, re-capture, re-commit) — the exact discipline `scripts/regen-spring-tokens.mjs` already
  established for generated-but-committed identity values.

**GOLDEN: (c) the hybrid.** It is the only direction that holds all four constraints at once: engine-invariant
shipped pixels (the metallic-history killer), a stable born-RED hash anchor, a parameterized re-calibration
path (the Fable design arm can sweep bake parameters, not just alpha), and house-precedented discipline
(generated value + committed generator, never a hand value and never a build artifact).

**Self-challenge.**
- *Payload.* A 512² noise tile is high-entropy; base64 in a CSS custom property could balloon the bundle.
  Paid three ways: (1) `paper.css` is bucketed **DEFERRED** in `src/styles/critical-partition.mjs:47-48,67` —
  the tile never enters the render-blocking critical subset; (2) the tooth is a narrow-band low-contrast
  luminance field — bake to PNG-8 (small palette) or lossy WebP and pick the smaller at P1 under a NAMED byte
  ceiling (≤ 32 KiB base64, target 16–24 KiB); (3) `profile:budget` rebaselines with the recorded figure (the
  aurora-budget precedent). If both encodings miss the ceiling, shrink the tile to 384²/320² before touching
  the amplitude — payload never bends the percept.
- *Retina crispness.* The tile bakes at 2× density (512² rendered at `background-size: 256px`), features sized
  in CSS px (§Q2), `image-rendering` default (forcing `pixelated` would reintroduce the hiDPI grey-averaging —
  SOTA F19 REJECT). `image-set()` is DROPPED by default (a 1×/2× pair is two base64 blobs in one token — double
  payload, no cache win on a data-URI); if a P1 capture shows softness the remedy is a re-bake
  (density/wavelength), never a second blob.
- *Is a baked tile "less pure" than resolution-independent SVG?* The SVG's purity is exactly what shipped the
  metallic read three times — different engines rendered different pixels from the same source. Determinism IS
  the purity that matters for an identity texture.
- *The enhancement's "@supports" is not honest as written.* Row 14.1 says "`feDiffuseLighting` `@supports`-gated
  enhancement over the raster" — but **no `@supports` query can feature-detect SVG-filter rendering FIDELITY**
  (every engine parses the data-URI; the failure mode is perceptual — metallic — not parse failure). A literal
  `@supports` block would be theater: it would engage the sheen-prone path on exactly the engines whose
  fidelity is unproven. **SHARPENED FORM:** the enhancement is **capture-gated at P1, shipped (if accepted) as
  a SECOND layered token** — `--paper-grain-relief`, default `none`, layered above the raster in the same
  `background-image` stack — engaged by a deliberate build decision per engine-verified capture, never a
  runtime query. Sequenced second; **never load-bearing for the born-RED close** (the 3×-shipped
  device-free-green trap, `SPEC-pass2.md:20`). Default expectation per KISS: **DROP it** — if the live capture
  shows no perceptible upgrade over the raster, the raster alone is the whole register
  (`PAPER-sota.md:406-408`). If shipped, it carries the full WS9 M-fence set: sRGB pin, HEX ecru
  `lighting-color` (never oklch), `azimuth='290.56'`, elevation 55, LOW `surfaceScale`, `kernelUnitLength`
  tested with/without, REAL-Safari capture (`wkshot.m`). *(Recorded as a fold-candidate row-language note for
  the orchestrator — a sharpening, not a scope change.)*

**Final form (Q1):** one committed warm raster tooth tile, baked once by a committed seeded baker, hash-gated,
shipped as an inline base64 **data-URI** in the SAME `--paper-grain-tooth` token (`paper.css:44`) — the
committed PNG is the hash/provenance anchor, the data-URI is the SHIPPED form (engine-invariant,
cache-independent, zero-consumer-edit migration; the ≤ 32 KiB ceiling binds the base64 LENGTH; `image-set()`
dropped by default) — same multiply/screen blend law, deferred partition, byte-budgeted. The lighting path survives only as the capture-gated layered `--paper-grain-relief`
enhancement, default absent, expected dropped.

### Q2 — the amplitude/scale numbers under the subtlety ceiling (both engines, both modes)

**Brainstormed directions for WHERE the subtlety bound lives:**

- **(a) Bound the ALPHA** (the current model — one deployment opacity per mode). Simple, but alpha alone
  chases a moving target: the same alpha over a contrast-stretched source vs a bounded tile yields wildly
  different painted std (the 0.22→5.54 vs 3.65 lesson, `challenge/2.md`).
- **(b) Bound the PAINTED RESULT** (gate the live composite: std band + mean-drift + chroma window on the
  route node). Perceptually honest — it measures what the eye gets — but under-constrains the source (two
  different tiles can hit the same std with different character).
- **(c) Bound BOTH ends: bake the tile's statistics to NAMED values, then bound the live composite** — the
  tile carries calibrated σ/chroma/wavelength at bake; the deployment alpha becomes a near-linear scale knob;
  the π gates the painted result. Two anchors, one short lever between them.

**GOLDEN: (c).** The baked-statistics + painted-band pair is what makes the calibration CONVERGE instead of
re-tuning forever: the baker table pins the tile; the alpha sweep is one-dimensional; the π band is the law.

**The proposed numbers (the Fable design arm decides FINAL values against P1 captures — these are the
calibrated starting anchors + the method, not assertions):**

| axis | proposed value | derivation / method |
|---|---|---|
| tile size / render | **512² baked · `--paper-grain-tile: 140px → 256px`** | 2× density for retina; def `paper.css:45`, sole readers `:55,:80` (re-verified at `29f280c8`); constellation grep CLEAN — zero words/atlas `--paper-grain-tile` consume, the tile period is INTERNAL-only |
| dominant tooth wavelength | **~3–5 CSS px** (6–10 tile px), + a fine fiber band one octave up at ≤ half amplitude | the coarse band GOLDEN §0.2 proved survives hiDPI averaging; the dual-band character bakes free of beat risk (baked once, not two live filters) |
| tile luminance | **mean L\* ≈ 0.92 · baked σ_L ≈ 26–30/255** | bounded amplitude at source: at multiply α ≈ 0.16 over the washed plate, composite σ lands in the gate band (σ_composite ≈ α · σ_tile · L_plate) — the method is the measurement, the arithmetic is the seed |
| tile chroma / hue | **mean C ≈ 0.045 (OKLab) · H ≈ 85° ecru** (`#F3EAD3`-class) | 2-3× the 0.020 floor at source; composite dilutes toward the floor at deployment alpha (WS9 M2) |
| emboss (directional relief) | lit-bias along **azimuth 290.56°**, directional amplitude **≤ ~35%** of total tooth amplitude; anisotropy energy ratio **≤ 1.4×** isotropic | hemisphere coherence with the key spine (§4.2) without the brushed-metal streak — BOTH directional statistics are DECLARED in the baker's stats sidecar (hash-bound to the tile) and gate-ASSERTED there; a pixel re-derivation of a ≤35% directional component in a low-α field sits below the decode noise floor, so pixels carry only a coarse sign-of-projection confirm (§4.1.H arm 8) |
| deployment alpha | **light: sweep {0.12, 0.16, 0.21}, anchor ≈ 0.16 · dark: sweep {0.08, 0.12, 0.16}, anchor ≈ 0.12** | the disk 0.21/0.16 (`glass-fx.css:31`, `dark-arm.css:247`) was tuned for a contrast-stretched speckle; a bounded baked tile shifts the anchor DOWN — screen-on-ink bites harder than multiply-on-cream, so dark steps below light (the landed ×1/√φ instinct, `dark-arm.css:242-246`) |
| **the painted band (the LAW)** | **std ∈ [4.5, ~7] light** on the washed plate, live route node · dark band re-measured at P1 (anchor: the same no-squint/no-dirt logic on the screen arm) · **mean-L drift < 5%** · composite chroma within [floor, ceiling] | GOLDEN §8 + challenge/3 R2 + the letterpress law; measured in BOTH engines (Chrome + REAL Safari via `wkshot.m`), BOTH modes, on `:5199` |

**Self-challenge.** (1) *Is std the right instrument for "beautiful"?* No — it is the FLOOR/CEILING instrument;
the verdict instrument is the eye (the C-PAINT rule: device-free gates are necessary-not-sufficient; the
binding artifact is the fresh dual-engine capture a non-authoring agent produces). The band exists so the eye
never has to argue about "did it regress" — only about character. (2) *Does σ hold under glyphs?* The σ is a
SURFACE signal measured on a content-free patch only; under body glyphs the bound is the AA floor (GOLDEN §6).
(3) *Cross-engine tolerance:* the raster makes the paired-engine arm near-trivial (same pixels) — the WebKit
arm asserts the SAME live-route patch within a tight tolerance, closing the engine-divergence axis the SVG
path never could.

**Final form (Q2):** the tile bakes to the named statistics; the alpha is the one sweep; the π band
(std ∈ [4.5, ~7] light · mean-drift < 5% · chroma ∈ [floor, ceiling]) is the law, measured live, both modes,
both engines. SUBTLE = inside the band; BEAUTIFUL = the Fable/user verdict on the capture.

### Q3 — where paper LIVES vs glass: the material-hierarchy law

**Brainstormed directions:**

- **(a) Paper = the matte CONTENT stratum; glass = the transmissive CHROME stratum** (the Apple hierarchy
  frame made literal). Paper lives on page fields, editorial/content surfaces, opaque specimens; glass floats
  above; the tooth NEVER paints on a glass surface.
- **(b) Paper as a universal `surface` rung** — `surface="paper"` anywhere, including chrome. Maximal
  availability; but it invites the exact A2 no-win (warm tooth leaking into the chrome whisper) and dissolves
  the hierarchy that makes both materials legible.
- **(c) Restore the universal underpaint plane** (pre-`3f200f1d`) — paper everywhere beneath everything.
  Maximal suffusion; but it is the loud full-page wash the opt-in demotion deliberately retired, and it
  re-creates the D-2 coupling (every surface's warmth hostage to one plane).

**GOLDEN: (a) — the MATERIAL-HIERARCHY LAW**, stated as the depth stack every route obeys:

> **field → paper → glass → ink.** The living field (aurora/wash) is the deepest plane; PAPER is the matte
> content stratum resting on it (cards, specimens, editorial surfaces, worksheet interiors — warm, toothed,
> opaque-leaning); GLASS is the transmissive chrome stratum floating above (dock, overlays, buttons —
> neutral-whispered, blurred, lit); INK is the top plane (text, marks, HandMark's hand voice). Each stratum
> keeps its own texture register; ONE light (17.5) binds them; the ONE sanctioned crossing is **paper felt
> THROUGH glass** — the tooth reads through a translucent plate from BENEATH it (the backdrop transmits it),
> never painted ON the plate.

Corollaries the law fixes: paper is **self-sufficiently warm** (warmth at source — it never borrows warmth
from the stratum below, the D-2 severance); glass is **texture-quiet** (`--glass-grain-fine` neutral whisper
at the byte-untouched fence — its material read comes from blur/tint/bevel, not tooth); coverage is **opt-in
at the surface** (the `3f200f1d` model stands: `Card :grain` / `ShowcaseFrame :grain` / `paper-grain-overlay`
— verified shipping at `Card.vue:111-113`, `ShowcaseFrame.vue:48-49,109`), suffused across every surface that
CLAIMS paper, never a forced universal plane.

**Self-challenge.** (1) *Does opt-in contradict "suffuse everywhere"?* No — the mandate is "visible everywhere
paper morphism is CLAIMED"; the claim is the opt-in. The real miss is coverage discipline: the paper HOME
(`foundations/typography.vue`) wears zero grain today — 14.1 wires the shipped props (§4.1.F), it does not
re-mint a plane. (2) *Is "through glass" proven?* It is the least-proven claim in the corpus (challenge/3 R5)
— so it is a BUILD PRECONDITION spike + a standing π arm, not prose (§4.1.G). (3) *Where do borderline
surfaces fall (a paper-tier card INSIDE a glass overlay)?* The stratum is decided by the surface's OWN
material, not its ancestry — a `surface="paper"`-class content card keeps its tooth wherever it mounts; the
overlay chrome around it stays whispered. (4) *Does the law conflict with the glass-first maximal default
(AX.W54)?* No — glass-first governs CHROME and interactive surfaces; the paper stratum is the content/backdrop
register those surfaces float over. The two defaults are the two strata.

**Final form (Q3):** the field→paper→glass→ink hierarchy law, recorded in this spec + the design-idioms paper
section at build; enforced by the register fence (warm tooth = paper-only tokens; neutral whisper = glass-only
token at the frozen alpha), the one-light spine, and the through-glass π arm.

---

## §4 · Wave binding — the perfected per-wave specs

### §4.1 · Wave 14.1 `BG.W-PAPER-TEXTURE-UNIFY` / `-GRAIN-REAL` — the warm raster tooth PRIMARY

**What this spec ADDS/SHARPENS vs the folded row:** the hybrid committed-tile+committed-baker source model
(§3.Q1); the honest capture-gated form of the "@supports enhancement" (layered `--paper-grain-relief` token,
default absent, expected dropped); the baked-statistics table + painted-band law (§3.Q2); the named
`PAPER-WARM-CEILING` clamp (LX.2); the critical-partition payload discipline (tooth = deferred raster; aged =
compact warm-duotone SVG because `scale-paper.css` is in the CRITICAL cascade — `critical-partition.mjs:157`);
the exact 6-consumer migration map re-verified on disk at HEAD; the resolution of the row's "retire
`--paper-clean/-aged-texture`" against the atlas by-name fence (NAME-retire vs VALUE-retire, below).
**Scope provenance for the net-new utilities:** the `.paper-deboss` rider + the grain-on-headline clip enter
through the FOLDED 14.2 `BG.W-PAPER-SUFFUSE` (the cursor row's fold note `F4.1+14.1+14.2`,
`EXECUTION-PROGRESS.md:81`) — both are WS9 deliverables verbatim (`BG-WS9-paper-deep/SPEC-pass2.md` §1 "The
letterpress DEBOSS rider" + §2 "The grain-on-headline textured-ink register") — elaborated here, never
self-inserted scope; the `--paper-grain-relief` enhancement stays a fold-candidate (note 1).

**Preconditions (§0 — land FIRST, in order):**
1. **GU-1 `--glass-key-direction` mint** — the full `GU-1-glass-key-fill.md` recipe VERBATIM: mint
   `--glass-key-direction: -0.375` in the `BD.W-GLASS-KEY-EDGE` keystone block (`glass-fx.css:~113`) with the
   two-magnitudes mis-couple fence comment; derive X on the three under-shadow tiers (`glass-fx.css:430-432`)
   via `calc(Npx * var(--glass-key-direction))`; re-point `dock/overflow.css:143`; re-approve the 7
   under-shadow baselines; mark GU-1 SATISFIED. (Value-only; `--glass-under-shadow-spine` stays
   omnidirectional.)
2. **The verification rig up** — `:5199` demo + Chrome + REAL Safari (`wkshot.m`/`wkdriver.swift`; the
   bundled Playwright "webkit" is NOT Safari and cannot carry the WebKit verdict — `SPEC-pass2.md:167`).
3. **The through-glass spike (§4.1.G)** — captured before the close is claimed.

**A · The P1 calibration prototype (the Fable design arm owns the verdict).** Bake candidate tiles per the
§3.Q2 table (the baker sweeps: dominant wavelength × emboss depth × chroma); render on the live paper-band
routes; sweep deployment alpha; capture both modes × both engines; measure the painted band; the design arm
picks the tile + alpha pair BY EYE within the band and files the accept/REJECT verdict on the
`--paper-grain-relief` enhancement (default: reject/drop). Every number in §3.Q2 is a starting anchor the
capture may move; the BAND is the law.

**B · The primary deliverables (file paths exact, verified at `fa6ed40a`):**

| deliverable | path | delta |
|---|---|---|
| the baker | `scripts/bake-paper-tooth.mjs` (NEW, committed) | seeded (house `mulberry32`/`hashString` discipline), parameter table at top, emits the tile + a stats sidecar (σ, chroma, hue, anisotropy ratio, hemisphere bias) the gate ASSERTS — the sidecar is hash-bound to the tile (arm 1) and is the assertion target for the directional arms (arm 8); the gate never re-derives directional statistics from pixels |
| the tile | the baker's OUTPUT PNG committed (the hash anchor) + shipped as an inline base64 **data-URI** in `--paper-grain-tooth` (`paper.css:44`) — the data-URI is the SHIPPED form (§3.Q1; `image-set()` dropped by default) | REPLACES the grey `saturate=0` speckle VALUE; token NAME unchanged (every consumer + gate keeps its anchor); born-RED hash |
| tile period | `--paper-grain-tile` (`paper.css:45`) `140px → 256px` | def `:45`, sole readers `:55,:80` (re-verified); constellation grep clean — internal-only |
| alpha | `--paper-grain-opacity` light (`glass-fx.css:31`) / dark (`dark-arm.css:247`) | re-derived per the P1 sweep (anchors 0.16/0.12); comment cites the painted band + this spec |
| blend law | `paper.css:48-92` | UNTOUCHED — multiply (light) / screen (dark); the always-present `background-image` longhand + opacity-only engage discipline survives the swap byte-for-byte (design-idioms §12 anti-pop) |
| the enhancement (IF accepted) | `--paper-grain-relief` (NEW token, `paper.css`, default `none`) layered above the raster in the same `background-image` stack | full WS9 M-fence set (sRGB pin · HEX ecru · `azimuth='290.56'` · elevation 55 · LOW surfaceScale · `kernelUnitLength` tested); never load-bearing; expected DROPPED |
| deboss rider | a `.paper-deboss` utility (`paper.css`) | static inset/text-shadow pair pressed INTO the tooth, offsets derived from the key travel vector (x = `calc(y-offset * var(--glass-key-direction))`), dark on the light-side wall + warm lift opposite (WS9 anchor: "dark top-left + warm highlight bottom-right"); PRM-safe (static); signs gate-checked, eye-verified at P1; scope: the folded 14.2 (WS9 deboss-rider ¶ — §4.1 provenance) |
| grain-on-headline | the `@supports (background-clip: text)` display-clip utility | headline-only at display scale, solid-ink fallback (this one IS a real, honest `@supports`); the utility clips the TOOTH; the atlas masthead fork (`sci-report/atlas/src/platform/design/recipes.css:~424-449` — WS9's `:507` cite has drifted) clips `--paper-aged-texture`, NOT the tooth, so its consume-and-delete is a deliberate RE-POINT (aged → the utility's tooth read) carried on the F8 notice; scope: the folded 14.2 (WS9 grain-on-headline ¶) |
| payload | `profile:budget` rebaseline | the recorded byte figure; ceiling ≤ 32 KiB base64; tooth stays in the DEFERRED partition (`critical-partition.mjs:67`) |

**C · The A2 register split (the rename + the lockstep, re-verified at HEAD):**

- `--paper-clean-texture` (`scale-paper.css:131`) **RENAMED → `--glass-grain-fine`** — clean break, no alias;
  value byte-identical (the neutral fine whisper is deliberate — neutrality is the point).
- Consumer re-points (the "6 consumers migrate" of the row, disk-true):
  1. `cards.css:127` `.paper-texture` → `--paper-grain-tooth` + `background-size: var(--paper-grain-tile)`
     (a PAPER surface must read the paper tile period, not the 200px whisper size);
  2. `glass/ladder.css:485` `.glass-*::after` → `--glass-grain-fine` (whisper, size/alpha untouched);
  3. `dock/shell.css:267` `.glass-dock::after` → `--glass-grain-fine`;
  4. `PaperBackdrop.vue:32` aged arm — NAME kept (below); the default arm already reads the tooth via
     `paper-underpaint` (verified `PaperBackdrop.vue:38-44`);
  5–6. dead-prose scrubs (no `var()`): `glass/ladder.css:467`, `utilities/btn.css:101`,
     `dock-controls/tab-button.css:100` (three sites; line numbers drift — re-grep at build).
- **Gate lockstep (the silent-de-fang trap):** re-point the named reads in `proof-glass-cohesion.mjs` (the
  grain-always-present positive clause + the `.grain-x`/`.grain-y` none→image-swap fixtures),
  `proof-glass-cal.mjs` (the D3 disco-grain NEGATIVE detector — left on the deleted name it goes vacuously
  green), `proof-paper-grid.mjs` (comment). Old name DEFINITION-ABSENT repo-wide.
- **The known-consumer-constellation probe (the inv-11 corollary, RECORDED — not an atlas-only assertion):**
  atlas — zero `--paper-clean-texture` consume (verified). **words/frontend SELF-HOSTS the name**
  (`theme.css:168`, its own 60px/0.9-freq value) and reads it at ~8 sites (`App.vue:94`, `WordList.vue:216`,
  `index.css:163-183`, `card-base.css:27`, `hovercard.css:25`, `Login/Signup.vue:5`) while importing
  `@mkbabb/glass-ui/styles` (pin `^3.0.0`). Post-rename: words's OWN reads survive (local definition), but
  its local `--paper-clean-texture` override of glass-ui's GLASS surfaces silently stops applying once the
  ladder reads `--glass-grain-fine` — a GRACEFUL degradation (each surface falls back to the library
  whisper; words is two majors behind and adopts on its own bump), disclosed by the §J MIGRATION row.
  Known and recorded, never a silent unknown.

**D · The `--paper-aged-texture` resolution (the row's "retire" vs the atlas fence).** The row says "retire
`--paper-clean/-aged-texture`"; the atlas consumes `--paper-aged-texture` LIVE by name
(`sci-report/atlas/src/platform/design/recipes.css:373,424,444,456,474`; `PaperBackdrop.vue:8,32` in-repo).
Resolution — **the grey turbulence VALUES retire from both tokens; only the CLEAN name retires**: clean →
renamed `--glass-grain-fine` (constellation probe recorded at §4.1.C — atlas zero consume; words self-hosts +
degrades gracefully); aged → **NAME KEPT, VALUE re-authored** onto a warm aged-stock rung. Because
`scale-paper.css` lives in the CRITICAL token cascade (`critical-partition.mjs:157`) the aged rung must NOT
become a raster payload: re-author it as a **compact warm-DUOTONE SVG** (feTurbulence → `feComponentTransfer`
`tableValues` ramp black→umber/white→ecru, `color-interpolation-filters='sRGB'` pinned, NO lighting primitive
— warm at source, sheen-impossible, < 1 KiB; the §3.Q1(b2) mechanism in its correct home). The value change
propagates silently to the atlas on `npm update` → an EXPLICIT re-author notice rides the F8 cross-repo asks
ledger (14.5 folded there; fold-candidate note below).

**E · The a11y carve (absolute).** Add `--paper-grain-opacity: 0` to `glass/a11y-fallback.css` (genuinely
absent — only the two named utilities zero today, `paper.css:111-120`; challenge/2 R4). `prefers-reduced-
transparency: reduce` → tooth 0 + relief 0 + wash opaque warm-cream. Static grain STAYS under
`prefers-reduced-motion` (a still texture is not a motion hazard); only motion (any future emboss-sweep,
draw-on) is PRM-gated.

**F · Coverage (grain as MATERIAL, not buried backdrop — the shipped props, zero new mechanism):**
`ShowcaseFrame :grain` wired on `foundations/typography.vue` (the paper HOME wears zero grain today — the
headline miss, GOLDEN §3). **ONE tooth per node (the double-tooth trap, named):** math-paper's worksheet is
the bare `<article>` at `math-paper.vue:11-22` (NOT a `<Card>`) already carrying the explicit
`paper-grain-overlay` class — verify-once coverage, ZERO edit; do NOT wire `Card :grain`/a second grain
source onto it (`paper-grain-overlay` and a glass-tier grain style the SAME single `::after`, so a second
source cascade-collides or stacks the alpha out of the painted band). Paper-glass's opaque specimens are
Card-rooted with `grain` default `true` (`Card.vue:178`) — post-A2-split that `::after` is the NEUTRAL
`--glass-grain-fine` whisper, so a specimen CLAIMING paper opts into the tooth via
`paper-grain-overlay`/`.paper-texture` explicitly: one grain source per node, always. The suffusion is the
opt-in claimed surface set; the universal plane stays retired (§3.Q3).

**G · The through-glass spike (build precondition).** Capture the tooth read THROUGH a `.glass-material` tile
over a saturated field, both modes — "paper felt through glass" proven in pixels; the standing π arm keeps it
(gate shape #10 below).

**H · `proof:paper` — the family arms (gates-as-family-arms; born-RED on the grey speckle; device-free arms
are NECESSARY-NOT-SUFFICIENT, the live π + the Fable verdict close):**

```
proof:paper (paper-texture-single + warm floor/ceiling + spine congruence), both modes, both engines:
 1. tooth-single + HASH: --paper-grain-tooth == the committed tile (hash == the baker sidecar)
      — born-RED on the grey feColorMatrix speckle at HEAD
 2. painted std on a content-free patch, LIVE ROUTE NODE, washed plate: ∈ [4.5, ~7] light / dark band per P1
 3. DIRT ceiling: composite mean-L drift from the un-grained plate < 5%
 4. blend law: resolved multiply (light) / screen (dark) — never overlay/soft-light
 5. warm FLOOR at SOURCE: decoded tile mean chroma (OKLab) >= 0.020 (bake target ~0.045)
      + substrate-independence: the grained patch reads C >= 0.020 over a worst-case NEUTRAL substrate
      (the D-2 killer — warmth no longer borrowed from the plane below)
 6. PAPER-WARM-CEILING (the LX.2 clamp, named): live composite chroma on the washed+grained patch
      <= 0.055 (proposed; anchor = the LX.2 landed max 0.0449 + headroom — Fable arm finalizes)
      AND hue in the warm band H ∈ [60°, 100°] — warm ONCE, never compounded brassy
 7. REGISTER FENCE: --glass-grain-opacity == 0.025 (light) AND 0.045 (dark), per-mode π (never a flat ==);
      --glass-grain-fine decodes NEUTRAL (chroma ≈ 0); no paper-tooth var() on any glass-stratum selector
 8. ONE KEY (method-specified — the SIDECAR is the assertion target, never a pixel re-derivation):
      (a) SIDECAR: the baker's DECLARED hemisphere-bias azimuth (stats sidecar, hash-bound to the
          committed tile by arm 1) == 290.56° ±1° AND sign-agrees with --glass-key-direction;
      (b) SIDECAR: the declared directional/isotropic energy ratio <= 1.4× (the brushed-metal bound) —
          no pixel re-derivation attempted (a ≤35%-amplitude directional component of a low-α field
          sits below the decode noise floor; the hash binding carries the claim);
      (c) PIXEL CONFIRM (coarse, above the noise floor): the mean luminance-gradient projection of the
          decoded tile onto the key vector has the CORRECT SIGN; ±10° azimuth on the coarse band is the
          outer tolerance — sign-of-projection is the binding pixel claim, ±1° lives ONLY on literals;
      (d) deboss offset signs agree with the key travel vector;
      (e) IF the relief enhancement ships: its azimuth LITERAL within ±1° (a string check — the one
          honest ±1° home) + sRGB pin present (linearRGB → RED)
 9. rename lockstep: --paper-clean-texture DEFINITION-ABSENT; the 3 gate re-points landed (a planted
      old-name read REDs — self-test bite)
10. THROUGH-GLASS: tooth chroma >= floor read through a .glass-material tile over a saturated field
11. a11y: a11y-fallback.css carries --paper-grain-opacity: 0; reduced-transparency zeroes verified
 + the WebKit paired arm: the SAME live-route patch within tight tolerance (raster ⇒ near-identity)
 + self-test bites per arm (planted speckle / planted double-warm / planted glass-tooth all RED)
```

**I · Fable arm + DesignSync surfaces (per the row):** Fable owns the P1 tile pick, the alpha pair, the
enhancement accept/reject, and the PAPER-WARM-CEILING final number — all against captures, filed as the wave's
design verdict. DS surfaces: the paper band (`/foundations/paper-texture`, `/foundations/paper-glass`,
`/compositions/math-paper`, `/foundations/typography` post-wiring) + the through-glass tile + a dock-over-paper
frame (the whisper fence visible), Chromium + WebKit side-by-side, both modes.

**J · MIGRATION rows (clean breaks, no aliases):** `--paper-clean-texture` → `--glass-grain-fine` (rename);
`--paper-grain-tile` 140px → 256px (value); `--paper-grain-tooth` value swap (name stable — no consumer
edit); `--paper-aged-texture` value re-author (atlas notice via F8).

### §4.2 · Wave 17.5 `BG.W-GLASS-PAPER-CONGRUENCE` — the single-light spine (`proof:meta`, born-RED→ci)

**The hallmark mechanism this wave locks:** ONE light governs both materials — the glass bevel/specular
(`--glass-key-{lit,shade}-x/y`), the under-shadow FILL (the GU-1 derived X), and the paper tooth relief (the
baked hemisphere + the enhancement azimuth if shipped) all lean the upper-right key. Apple's cohesion is
per-surface runtime adaptation; ours is a gate-locked token spine — machine-proven, not asserted
(`PAPER-sota.md §5`).

**Sharpened vs the folded row:** raster-primary does NOT dissolve the spine — it CHANGES the third witness
from an SVG literal to a **hash-bound baked statistic**. The spine arm gains a device-free check no SVG
version could have: assert the baker's DECLARED directional statistics (the stats sidecar, hash-bound to the
committed tile) plus a coarse sign-of-projection pixel confirm — never a ±1° pixel decode (§4.1.H arm 8).

**The `proof:meta` `glass-key-spine` arm (born-RED → promoted to `ci`):**
1. `--glass-key-direction == -0.375` minted in the keystone block with the two-magnitudes fence comment;
2. the three under-shadow tiers derive X via `calc(Npx * var(--glass-key-direction))` (Y/blur/spread/α
   byte-identical); `dock/overflow.css:143` re-pointed; `--glass-under-shadow-spine` untouched
   (intentionally omnidirectional — the holdout ledger's INTENTIONALLY-OMNIDIRECTIONAL class);
3. HEMISPHERE-COHERENCE: sign(`--glass-key-lit-x`), sign(`--glass-key-direction`), the tile's
   SIDECAR-DECLARED hemisphere bias (+ the arm-8c sign-of-projection pixel confirm), and (if shipped) the
   relief azimuth literal ALL agree upper-right — "one key" is hemisphere-coherence, not angle-identity
   (the 24° soft-FILL vs cel-KEY gap is deliberate, `SPEC-pass2.md:9`);
4. the azimuth↔token numeric lock: any hardcoded relief/deboss LITERAL within ±1° of
   `atan2(-1, 0.375)·180/π mod 360 ≈ 290.56°` (literals only — the ±1° never applies to a pixel decode);
5. the deboss pair's offset signs consistent with the key travel vector.

**DesignSync (the distinct capture axis the plan names):** one annotated canvas — a glass card (bevel +
under-shadow) beside a toothed paper patch beside a debossed mark, the light vector overlaid — both modes,
both engines. The verdict question: *do the two materials read as one lit world?*

**Preconds:** the GU-1 token (landed as 14.1 §0 — the cursor carries NO row 14.0; the orphaned "14.0"
precond reference is recorded in fold-candidate note 5). Protected-set check: value-only; no identity value
moves.

### §4.3 · 14.3-adjacent congruence — the contract 14.1 leaves for `W-HANDMARK-PERFECT` (KS-HANDMARK owns the wave)

This lane owns only the SEAM; HandMark internals are KS-B's. The contract 14.1 must leave standing:

1. **The token anchor is stable.** `--paper-grain-tooth` keeps its name; the raster form is MORE consumable
   for the booked graphite-in-tooth unification than the filter data-URI was (an `feImage(url)` referencing a
   raster tile is the portable form — the WS9 §4 feImage note lands easier on the raster; still §1/§2-gated,
   never a one-liner).
2. **The three-underline fence holds** (`proof:handmark` W6): `.paper-ink-mark`
   (`glass/surface-axis.css:93-106`) stays a STRAIGHT structural 2px hairline — never wobbled, never grained;
   HandMark wobbles; one pencil-boil engine under every wobble. 14.1 touches none of it.
3. **The ink stratum shares the paper physics.** HandMark marks + the deboss rider live on the SAME
   field→paper→glass→ink hierarchy (§3.Q3) and the SAME key hemisphere — a graphite mark pressed into the
   tooth is the deboss read in hand-voice; the shared azimuth is the congruence.
4. **The seed leaf discipline** (house `mulberry32`/`hashString`, `utils/prng.ts`) — the baker (§4.1.B) uses
   it too; one seed leaf across paper + HandMark.

### §4.4 · LX.2 — the DONE floor + the ceiling ownership (restated)

LX.2 `BG.W-PAPER-GRAIN-WARM-SUBSTRATE` is DONE (`e40e5095`; tiles C 0.009 → 0.02–0.045, Chrome+Safari, L+D)
— the demo-side warm-substrate floor. Its **no-double-warm CEILING is owned by 14.1** as the named
`PAPER-WARM-CEILING` clamp (§4.1.H arm 6): warm ONCE — the tile carries the warmth, the wash
(`--story-paper-wash`, the landed leg-2: `color-mix(in srgb, var(--card) 70%, transparent)` light) carries a
separate small tint, and the composite is bounded from ABOVE (≤ 0.055 proposed, hue ∈ [60°, 100°]) so they
never compound brassy. Floor (≥ 0.020) + ceiling: the two-sided gate that makes both D-2 (too gray) and the
over-correction (too brassy) structurally RED.

---

## §5 · Precepts conformance (explicit checks)

- **design-idioms** — the paper register homes (§93-111) update to the raster-primary form at build; the §12
  grain pop-kill discipline SURVIVES byte-for-byte (the tile stays the always-present `background-image`
  longhand; opacity remains the only engaged channel; the ~120ms engage clock untouched —
  `glass/ladder.css:472-495`). The three-underline fence untouched (§4.3).
- **motion-canon (P1–P7)** — the register is STATIC (zero per-frame work; the SOTA-endorsed compositor-cached
  contract). The only animated channel anywhere near it is the existing grain-engage opacity cross-fade — an
  EFFECTS leg on a linear clock, already canon-conformant. Deboss static. PRM: static texture stays; motion
  gates; reduced-transparency zeroes (§4.1.E). Compositor-only holds trivially.
- **tunable-anim** — no new animation surface; the enhancement (if shipped) is static.
- **Overhead floor / gates-as-family-arms** — everything lands as arms of the ONE `proof:paper` family +
  one `proof:meta` spine arm; no new gate names minted.
- **Clean breaks, no legacy** — the rename ships no alias; the grey speckle value is deleted, not kept behind
  a flag; the enhancement default is DROP, not a dormant dual path (the W-PRUNE-CONSOLIDATE no-dual-path law:
  if the relief ships it is a layered REFINEMENT with a named token and a gate, or it does not exist).
- **≥2-consumer** — `--paper-grain-tooth`: the two paper utilities + `.paper-texture` + PaperBackdrop + the
  demo claimed set; `--glass-grain-fine`: glass ladder + dock whisper; the baker: tooth + aged-rung sidecar
  (its second output) — all clear the bar.
- **Token-first** — every knob is a token (`--paper-grain-tooth/-tile/-opacity`, `--glass-grain-fine`,
  `--glass-key-direction`); consumers retune via `:root` overrides; the identity values are the library's own
  (presets-in-consumers: consumer paper themes live in consumers; the warm-ecru tile IS the library identity).
- **Warm identity / no-gray** — floor + ceiling both π'd (arm 5/6); the tile clears the BA.W-NO-GRAY floor at
  source with margin; the `in srgb` surface-tint fence untouched (no `--surface-tint-*` edit anywhere here).
- **Protected set (SYNTHESIS-PASS1 §4)** — no identity value moves except the paper-register's own tokens
  (the library's identity evolving at its home, the sanctioned path); DOCK_SPRING/4.10/glass-level machinery
  untouched; foreign-tree fence: the atlas is notified via the F8 ledger, never edited. Disambiguation:
  `--paper-grain-opacity` (the §3.Q2 alpha move) is the grain DEPLOYMENT calibration knob —
  `dark-arm.css:245-246`'s √φ "opacity ladder" framing notwithstanding, it is NOT the protected
  glass-tier/`--surface-tint-*` identity alpha ladders (`SYNTHESIS-PASS1.md:111`); re-deriving it against
  the new tile is the sanctioned in-home evolution (the deployment α necessarily moves with the source).
- **Fable arm + DesignSync per visual wave** — §4.1.A/I and §4.2's capture axis; the Fable design arm holds
  final-number authority against captures (the model-routing directive).
- **C-PAINT (the disease cure)** — every device-free arm above is necessary-not-sufficient; the binding
  artifact per wave is the fresh dual-engine both-modes capture a NON-AUTHORING agent produces, judged by the
  gestalt bar below.

---

## §6 · The gestalt bar (the acceptance language)

**"Tactile but calm; NEVER metallic; a whisper you notice when it's gone."**

A fresh dual-engine (Chrome + REAL Safari), both-modes capture set over the DS surfaces (§4.1.I), judged:

1. **Tactile but calm.** On every surface that claims paper, the tooth reads as warm paper fiber at 1× —
   a naive viewer says "textured paper," never "noise filter," never "dirty screen." Inside the band:
   no-squint visible (std ≥ 4.5), never dirt (mean-drift < 5%), warm inside [floor, ceiling].
2. **NEVER metallic.** No brushed-metal band, no anisotropic sheen, no gray film — over the washed plate, over
   a bare neutral, over the dark ink pole, in BOTH engines. A capture that reads metallic anywhere is a FAIL
   regardless of green gates (the 3×-shipped lesson; the raster makes this structural, the eye confirms it).
3. **A whisper you notice when it's gone.** The before/after pair with grain toggled: the difference is felt
   (the page loses its warmth and tactility) yet no single glance lands on "an effect." Glass surfaces show
   NO tooth — the chrome whisper is unchanged to the eye; the dock over a paper field stays liquid glass.
4. **One lit world.** The 17.5 canvas: glass bevel, under-shadow, tooth relief, deboss all lean one key;
   nothing reads cross-lit.
5. **Paper felt through glass.** The through-glass tile shows the tooth's warmth surviving transmission over a
   saturated field — the hierarchy (§3.Q3) visible in one frame: field beneath, paper resting, glass floating,
   ink on top.
6. **√φ proportion + SUBTLE-where-subtle.** The paper register never competes with the audacious registers
   (type, dock) — it is the ground they stand on. Technicolor stays in the field/viz strata; paper stays
   warm-neutral ecru. The verdict is filed by the Fable design arm; the user's eye is the final falsifier.

---

## Fold-candidates (orchestrator notes — never self-inserted)

1. **Row 14.1 language sharpen:** "`feDiffuseLighting` `@supports`-gated enhancement" → "capture-gated layered
   `--paper-grain-relief` token (default absent)" — no `@supports` query can detect SVG-filter FIDELITY; a
   literal `@supports` engages the sheen-prone path exactly where it is unproven (§3.Q1 challenge). Amendment
   note, not a scope change.
2. **F8 asks-ledger rider:** the `--paper-aged-texture` warm-duotone VALUE re-author propagates silently to
   the atlas masthead on `npm update` — the F8 cross-repo asks wave (where 14.5 folded) must carry the
   explicit re-author notice (§4.1.D).
3. **D-2 residuals** (StoryHero wash-card gray over the recessive shell aurora; `/foundations/intro`
   category-card header gray — `D2-paper-grain-DELTA.md:105-111`) are shell/field-lane concerns, NOT grain
   surfaces; confirm an owning row exists or fold one.
4. **`profile:budget` rebaseline** for the tile payload rides 14.1 (no new row; noted so the close expects
   the delta).
5. **The orphaned "14.0" reference:** 17.5's cursor precond names "14.0 GU-1 token" but the cursor carries
   NO row 14.0 — this spec folds GU-1 into 14.1 §0 precondition 1 (the full `GU-1-glass-key-fill.md` recipe).
   Recorded so the fold is explicit; the orchestrator may reconcile the 17.5 precond text.

## Open questions (P1 / Fable design arm)

1. Tile encoding + final byte figure (PNG-8 vs WebP under the ≤ 32 KiB base64 ceiling; shrink tile before
   amplitude if both miss).
2. The final alpha pair + the DARK painted-std band (light [4.5, ~7] is anchored; dark re-measured on the
   screen arm at P1).
3. The `--paper-grain-relief` enhancement accept/REJECT (default DROP per KISS — live-capture decision).
4. The PAPER-WARM-CEILING final number (0.055 proposed off the LX.2 landed max 0.0449 + headroom).
5. `--paper-grain-tile` 140 → 256px: confirm no demo composition visually keyed to the 140px period (grep is
   clean; the eye check rides P1).

---

## REVISION — KS-B critic pass applied (2026-07-01, HEAD `29f280c8`)

Surgical edits per `critique/PAPER-crit.md` (all 7 must-fixes); the greenfield loop record is untouched:

1. **M1 (arm-8 decode)** — arm 8 method-specified: the baker's DECLARED sidecar statistics (hemisphere-bias
   azimuth ±1°, anisotropy ratio ≤ 1.4×) are the assertion targets, hash-bound to the tile by arm 1; the
   pixel claim is demoted to a coarse sign-of-projection confirm (±10° outer tolerance on the coarse band);
   ±1° survives ONLY on literals (the relief azimuth string). Propagated into §3.Q2 (emboss row), §4.1.B
   (baker row), §4.2 (sharpened ¶ + arms 3/4).
2. **M2 (constellation probe)** — the inv-11-corollary probe RECORDED in §4.1.C: words/frontend self-hosts +
   consumes `--paper-clean-texture` (~8 sites, pin `^3.0.0`; graceful degradation of its glass-surface
   override, disclosed via §J); atlas zero clean consume. §4.1.D re-points to the probe.
3. **M3 (scope provenance)** — deboss + grain-on-headline cited to the folded 14.2 `BG.W-PAPER-SUFFUSE`
   (`EXECUTION-PROGRESS.md:81` fold note `F4.1+14.1+14.2`) + the WS9 SPEC-pass2 ¶s, in the §4.1 header +
   both table rows.
4. **M4 (source form)** — the inline base64 **data-URI** is the pinned SHIPPED form (committed PNG = hash
   anchor; ceiling binds the base64 length; `image-set()` dropped by default). §3.Q1 + §4.1.B.
5. **M5 (double tooth)** — §4.1.F names the exact node (the bare `<article>`, `math-paper.vue:11-22`) and
   binds the ONE-tooth-per-node rule (verify-once, zero edit; no `Card :grain` over the explicit class).
6. **M6 (protected set)** — §5 disambiguates `--paper-grain-opacity` as the grain DEPLOYMENT knob, not the
   protected identity alpha ladders.
7. **m7 (citations)** — (a) `sci-report/atlas/...` path fixed + the verified consume lines (373,424,444,
   456,474); (b) the masthead fork corrected to `~424-449` clipping AGED, with the consume-and-delete stated
   as a re-point onto the utility's tooth read (F8 notice); (c) the orphaned "14.0" precond recorded
   (fold-candidate 5 + §4.2 preconds); (d) the tile-period sibling grep run + recorded (internal-only).
   NOTE: the critic's `paper.css:56,82` reader lines did NOT reproduce at HEAD `29f280c8` — a fresh grep
   confirms def `:45`, readers `:55,:80` (the spec's original cites stand, now marked re-verified).
