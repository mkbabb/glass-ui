# Research-necessity audit — blob lane

**Lane** blob · **Auditor** read-only research-necessity pass (AY) · **Date** 2026-06-09
**Question** Is another iterative SOTA research pass NECESSARY for the blob, or are the remaining
refinements (the RG6 cream-base/specular gel tune + the W-COHERE mood-register/shadow cohesion)
DIVINABLE from the already-researched corpus + code analysis?

**VERDICT: REFINE-FROM-EXISTING.** No fresh external research is warranted. The corpus is
two-layered and self-correcting — the AX 32-facet synthesis (the material-rendering levers) plus
the H-research-blob 2025 liquid-glass brief (the refraction architecture, WITH sources, recipes,
edit-sites, and a designed gate) — and the on-component `RESEARCH.md` already reconciles the two.
Every open item is either a TUNE against an existing live π readback, a CAPTURE, a comment/doc
reconcile, or a recorded DECISION. A fresh sweep would re-tread a corpus that has already been
swept twice and adversarially red-teamed once.

---

## 1. The existing corpus (read in full)

| Artefact | Role | State |
|---|---|---|
| `docs/tranches/AX/research/blob-synthesis.md` | The AX 32-agent synthesis — "no algorithm changes needed"; the FULL material-rendering lever set (energy-conserving Blinn-Phong, spec-AA, warm-cream OKLCh specular L0.97/C0.03/h85, Beer-Lambert saturating glow, iridescence headroom, liquid-band FBM, IGN dither) | settled; largely SHIPPED (the W15/W16/W46 arms) |
| `docs/tranches/AY/audit/hardening/H-research-blob.md` | The 2026 adversarial brief that CORRECTED the synthesis headline: math-correct ≠ glass-read; the 2025 liquid-glass corpus (kube.io squircle bevel, Heckel dispersion, aave.com, Snell refraction over a `uBackdrop`), with §6 waveSpecInputs incl. the `proof:blob-glass-read` gate design | the FRESH research already happened HERE |
| `src/components/custom/goo-blob/RESEARCH.md` | The W-BLOB1 consume artefact: §0 settled axis, §1 ranked OPEN table, §2 cream-default decision (+≤12 atom ceiling), §3 consumer-#2 branch (b), §4 WebGPU/particle non-goals + the `uBackdrop` candidate | present, exemplar-shaped, current |
| `AY.W-BLOB1/2/3.md` + `AY.W-COHERE.md` waves | The impl specs; W-BLOB2 §0 RE-GROUND carries RG1–RG7; W-COHERE E1/E2 fully specify the mood chroma ceiling + the ambient shadow | current (W-BLOB3 spec partially stale — §4 below) |
| `audit/hardening/b2/B2-blob.md` + `B2-gestalt` (via W-COHERE §0/§1) | The as-built red-team: honey-tan stunning-bar (RG6/F6), mood neon (D1/D4), sticker shadow (D2), stale body-L comments (F4/RG4) | current |
| `goo-blob/README.md` + `types.ts` atom comments | The component-surface docs | one stale literal (§3) |

## 2. The as-built (committed state at audit time)

W-BLOB2 has LANDED: the cream default ramp `["#b5947f","#d4b27d","#dad6b1"]` at `types.ts:267`,
the 8-atom `BlobConfig` (`types.ts:173-189`), the rim re-anchor `#8c694e` (`types.ts:296`).
W-BLOB3's DI STRIP has ALSO landed — `GooBlob.vue` carries no `colorResolver` prop; the renderer
imports the `/color` leaf directly (`useMetaballRenderer.ts:8`, `resolveColor` at `:162-165`);
`docs/consumer-evidence/goo-blob.md` books demo-only and cites the strip. `ColorResolver` +
`defaultBlobColorResolver` legitimately SURVIVE in `src/composables/color/index.ts:47,141` — the
FourierField became the seam's real second consumer (`FourierField.vue:29`,
`demo/stories/StoryHero.vue:128`), so the W-BLOB3 edit-site-9 retirement clause resolved itself.
The renderer is 692 lines (the strip eased the 707 god-module; still >500 — W-GOD1 open). The
Memphis sticker shadow is UNFIXED (`GooBlob.vue:225-228` rest, `:233-236` hover, `:253-259` PRM).
The mood-hero red seed is UNFIXED (`demo/stories/substrates/blob.vue:67`).

## 3. README vs as-built — grade: STALE (one literal), otherwise accurate

The README is honest post-W-BLOB2/3 (the cream-default prose is now true-of-default; the DI-strip
is documented at `README.md:42-44`; quiescence/PRM/WCAG claims match shipped machinery). ONE stale
spot: **`README.md:184-185` documents the default `paletteStops` as
`["#cbad99","#ebcc99","#f3f1ce"]` (L≈0.77→0.95) — the shipped default is
`["#b5947f","#d4b27d","#dad6b1"]` (`types.ts:267`, ramp mean L≈0.78)**. The README literal is a
pre-down-tune artifact of the 0.86-anchor era, the same era as the RG4 stale source comments.

## 4. Divined refinements (no new research required; file:line)

1. **RG6 gel-bead tune is a TUNING task with the levers already researched.** The honey-tan →
   gel-bead move is parameter motion on `types.ts:298-307` (`specStrength: 0.16`,
   `specShininess: 20`, `iridescence: 0.09`, `sssScale: 0.1`, `coreGlow: 0.06`) against the LIVE
   π readbacks (`proof:blob-warm-default` 0.62 floor held; `blob-render.spec.ts` domeLumaStd 9..80
   band). The synthesis already supplies the material knowledge: the energy-conserving spec
   normalization, spec-AA for the tight glint, the Beer-Lambert `1-exp(-k·thickness)` glow (shipped
   — `metaball.frag.ts:402`), the warm-cream specular stop. The dark plate already reads as the
   glowing gel (B2-blob credit); light mode is the tune target. Fresh material-rendering research
   would re-derive numbers the corpus already names.
2. **The deeper "reads as GLASS not enamel" move is a recorded DECISION, not a research gap.**
   IF tuning the self-lit overlay a sixth time is judged the chronic-miss trap (H-research-blob §3
   forbids it), the `uBackdrop` Snell-refraction + squircle-bevel candidate is FULLY researched:
   recipe + sources (H-research-blob §1 T1/T2), edit-sites + gate design (§6 waveSpecInputs,
   `proof:blob-glass-read`), the concrete first edit (`metaball.frag.ts:273` circle dome-Z →
   `⁴√(1-(1-x)⁴)` squircle), and the portability verdict (glass-ui-rendered backdrop, never DOM).
   What is missing is a greenlight + an aurora-FBO seam coordination — execution, not research.
3. **W-COHERE D1/D4 mood chroma ceiling is self-referencing, not external.** The target band is
   MEASURED from glass-ui's own siblings — the constellation focal (`--primary`) + the FF comet
   (`--viz-fourier: oklch(0.579 0.201 30.4)`, `tokens.css:562`), C≈0.20 — and the mechanism is a
   clamp on the `deriveBlobPalette` derived C plus moving the demo seed
   (`demo/stories/substrates/blob.vue:67`, `oklch(0.62 0.19 25)`) into the register. No web corpus
   can answer "what chroma matches glass-ui's focal ring" — only the live readback can.
4. **W-COHERE D2 ambient contact shadow is house-grammar craft.** Replace the
   `drop-shadow(5px 5px 2.5px …)` stamp at `GooBlob.vue:225-228` + the `7px 7px 3px` hover at
   `:233-236` + **the PRM block at `:253-259` (it re-pins the stamp with `!important` — the swap
   must hit all THREE sites or PRM resurrects the sticker)** with a tokenised near-centered
   `--blob-shadow` riding the `--shadow-color`/`--foreground` re-resolution (the CLAUDE.md
   cartoon-shadow adaptive-by-construction pattern). Tuned by the W-COHERE G-SHADOW π readback.
5. **RG4 stale source comments** — `types.ts:260-261` ("~0.87 light / ~0.83 dark") and
   `types.ts:293` ("body L≈0.86 … rim sits 0.31 away") contradict the authoritative readback
   (0.814/0.775, L≈0.81, 0.26). Comment-only reconcile.
6. **README stale stop literal** — `README.md:184-185` → the shipped `types.ts:267` stops (§3).
7. **PROGRESS/spec staleness on W-BLOB3** — `PROGRESS.md:69` says `planned`, but the DI strip +
   `docs/consumer-evidence/goo-blob.md` HAVE landed; the W-BLOB3 spec's D1 premise (REQUIRED
   `colorResolver` prop at `GooBlob.vue:34,42`) no longer holds. Remaining W-BLOB3 arms are ONLY
   the interaction DELTA (no `W-BLOB3-*.png` exist under `audit/visual/`) + the frame-budget
   number — re-ground the row/spec, do not re-execute the strip.
8. **RG2/RG3 mood DELTA re-captures** — capture work: a readable lean series (wider pointer travel
   so centroid displacement exceeds perceptual threshold, per-frame offset recorded) + a
   cream-default resting frame on `/substrates/blob-mood` BEFORE the red register.
9. **RG5 decision note** — the color-perturbation cohort KEEP (`types.ts:124-129`; each read at
   `useMetaballRenderer.ts:527-534`) recorded in the DELTA + W-CLOSE1. One line, no code.
10. **W-GOD1 carve eased** — `useMetaballRenderer.ts` 692 (was 707 pre-strip); the carve target
    shrank but stays the largest violator; the strip-first ordering escape (W-BLOB3 RG-B) already
    fired in practice.

## 5. Genuine research gaps

**None warranting a fresh pass.** The one historically-real gap — "does this read as LIQUID GLASS
in 2025?" — was opened and CLOSED by `H-research-blob.md` (sources, recipes, gate design, non-goal
ratification), and `RESEARCH.md` §4.2 carries it as the decided candidate. The remaining unknowns
(exact spec/SSS values for the gel read, the mood chroma band, the shadow offset/blur) are
answerable ONLY by the live π readbacks against glass-ui's own siblings — external research
structurally cannot answer them. The single future trigger that could re-open research: if the
`uBackdrop` refraction is greenlit AND the aurora-FBO sharing seam hits an engine-level question
the brief's recipes do not cover — implementation discovery, to be raised then, not pre-researched.

## 6. Note on in-flight files

The Batch-2 finisher is concurrently writing aurora shaders / constellation / slider / dock story —
none of the blob files. The blob cites above were read from the working tree and cross-checked
against the B2 ledger; the renderer line-count delta (707→692) and the absent `colorResolver` prop
are explained by the landed W-BLOB3 strip, not by in-flight churn.
