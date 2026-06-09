# B2-blob — adversarial hardening of AY.W-BLOB2 (as-built red-team)

**Wave** W-BLOB2 (dark→warm OKLCh default base; 46-field BlobConfig → 8 atoms)
**HEAD** `at-dock-convergence` (commit `1151899` — "AY Batch 2 … HALTED here")
**Verdict** GAPS-FOUND — the headline (cream default) is REAL and gate-ratified, but the wave
shipped over a now-RED repo-wide god-module gate (dependency-ordering inverted), the mood DELTA
shows no readable motion, the shipped source carries stale/contradictory body-L numbers, and the
"stunning warm-cream living bead" bar is met only as "competent honey-tan lemon."

---

## What is GENUINELY perfected (credit where due)

- **D1 is closed for the resting default.** `proof:blob-warm-default` is a real Playwright/Metal-GPU
  π readback (NOT headless-green) — `tests-visual/blob-warm-default.spec.ts:178` does `page.goto` +
  `locator.screenshot()` + central-body-box mean OKLCh-L, asserts `≥ 0.62` in BOTH `colorScheme`.
  The captures ratify: `W-BLOB2-goo-blob-desktop-light.png` + `-dark.png` paint a warm bead, NOT
  the AX W46 charcoal coffee-bean. The dark-mode capture is the strongest plate (cream glows on black).
- **D2 atom gate genuinely passes.** `node scripts/proof-blob-config-atoms.mjs` → PASS: 8 top-level
  atoms ≤ 12, the three derived-but-unread config fields (`orbitSpeedScale`/`wobbleScale`/`mergeRate`)
  deleted from `BlobConfig` (they legitimately survive on `MoodParams`), `BLOB_CONFIG_DEFAULTS`
  round-trips. The rim re-anchor (`#8c694e`, `types.ts:296`) is wired through the ColorResolver, not
  a hand-rolled ramp; the cream ramp is derived through the shared `deriveBlobPalette` (inv J-10 held).
- **README↔reality lie closed (prose arm).** Both usage mounts now `color="var(--card)"`
  (README.md:35, :366) so the "warm-cream droplet" prose (README.md:5,45,69) is now true-of-default.

---

## FINDINGS (still wrong / not perfect / not cohesive)

### F1 — `proof:no-god-module` is RED at HEAD; `useMetaballRenderer.ts` is 707 lines (the LARGEST violator in the repo), and W-BLOB2 *added* to it
`scripts/proof-no-god-module.mjs` HARD_LIMIT=500, no allowlist. Live run → **FAIL**:
`useMetaballRenderer.ts` = 707 lines (was 694 per the prompt; W-BLOB2's color-perturbation uploads at
`useMetaballRenderer.ts:542-549` + the cream-base wiring grew it). The wave spec's F5 ordering says
"W-GOD1 lands FIRST so this wave's `types.ts`/upload-adjacent edits do not re-conflict" and the
scope-fence says "G3 cites the carve's gates staying green as the shared invariant" — but
**`PROGRESS.md:86` shows `W-GOD1 | god-module carve | planned`** ("after W-CON1/W-BLOB2 land"). The
dependency order was INVERTED in execution: W-BLOB2 shipped its renderer edits into an uncarved
707-line god-module, and `proof:no-god-module` is not in W-BLOB2's G3 fleet (G3 is `proof:blob-*`
only), so the wave passed its own gates while leaving the repo's god-module gate **redder than before
the wave** (4 violators: useMetaballRenderer 707, SegmentedTabs 689, constellationField 653,
GlassDock 624). This is the exact "gate-passing not perfected" gap the red-team hunts.

### F2 — the mood DELTA shows NO readable motion across its 5 hover frames (mechanically-green, not demonstrative)
`W-BLOB2-blob-mood-hover-frame{1..5}-desktop-light.png` are byte-distinct (5 distinct md5s) so the
"≥5 frames" depth-floor passes — but the five frames are **visually identical**: a static red sphere,
no perceptible centroid-lean, no deformation, no silhouette change. The DELTA narrates "the
seed-derived lit bead leaning toward the pointer across five rAF-sampled hover frames (the centroid
lean is the deliberate 'the creature notices you' register)" — the captures do not show that lean.
The H-cardinal "≥5 hover frames" intent (PROVE the motion) is met only as a byte-diff, not as a
readable motion delta. A reader can't see the creature notice anything.

### F3 — the mood surface's captured "default" is RED, not the cream default the spec G4 demanded
Spec G4 / edit-site #9: the `/substrates/blob-mood` DELTA must show "the resting cream default + ≥5
hover-flick frames." The mood hero seeds `seed = "oklch(0.62 0.19 25)"` (`blob.vue:68`) — a **vivid
red** (h25, C0.19) — so the captured mood frames are RED, and the resting CREAM default is NEVER
shown on the mood surface. The DELTA comment `blob.vue:87` ("the resting/idle state with the seed UI
untouched is the cream default") is FALSE: the seed UI's *default value* is red, so untouched = red.
The DELTA hand-waves this ("the vivid colored register the docs ALSO promise — distinct from the
resting cream default"), but the spec explicitly asked the mood surface to show the cream default
FIRST; it doesn't. G4's cream-default obligation is met on `/substrates/goo-blob` only.

### F4 — the shipped source carries STALE body-L numbers that CONTRADICT the authoritative DELTA π readback
`types.ts:261` comment: "the live readback now reads **~0.87 light / ~0.83 dark**" and `types.ts:292`:
"the cream body (**L≈0.86**) the rim L=0.55 sits **0.31** away". The authoritative DELTA π table +
PROGRESS.md row say **0.814 light / 0.775 dark**, body **L≈0.81**, rim "sits **0.26** away"
(`W-BLOB2-DELTA.md:32-33,66`). The SAME rim-clearance fact is stated with two different body-L values
and two different deltas. The `types.ts` comment is a stale pre-down-tune number (the 0.86 anchor era
before the anchor moved to 0.78) that was never reconciled when the anchor dropped. A future reader
trusting the shipped source comment gets a body lightness ~0.05 too high and a fabricated rim delta.

### F5 — the spec's "FOLD the color-perturbation cohort under ONE atom" mandate was passed over without recording the decision
Spec D2 / edit-site #5 directs: "FOLD the color-perturbation cohort (`hueRange`, `satShift`,
`brightnessShift`, `colorNoiseFreq`, `colorNoiseSpeed`) under ONE perturbation atom if they co-vary."
The as-built kept all five as separate fields on `BlobColor` (`types.ts:124-129`). This is DEFENSIBLE
(each is read off config as a base, e.g. `cCol.hueRange + params.hueRange` at
`useMetaballRenderer.ts:542-549`, so none is dead) — but the spec offered fold-or-keep, and the
KEEP decision (with the "each is read" rationale) is not recorded in the DELTA or the W-CLOSE1
overfitting audit. The 8-atom ceiling is met by NESTING (132 leaf fields total survive behind 8
atoms), so the gate measures the bundle count, not the surface area — the sprawl is reorganized, not
reduced. That is the intended J §6.3 model, but the spec's explicit fold-consideration was silently
declined.

### F6 — "stunning warm-cream living bead" is overstated; the as-built reads "competent honey-tan lemon"
The body stop `#b5947f` (`types.ts:267`) is a desaturated rosy-TAN, not cream; the ramp reads honey/
marzipan. The default capture is a flat, matte, slightly-muddy "lemon" silhouette with a weak
specular (`specStrength: 0.16`, `types.ts:298`) and a membrane "wobble" (the "living" claim,
`warpAmp: 0.35`) that does not read in a static frame. It clears L≥0.62 and is a massive improvement
over the charcoal — but the README's "stunning warm-cream living bead" romance overstates what ships.
The dark-mode plate is the only one that reads as a glowing gel bead; in light mode it's a tan blob
on cream with low surface life. "L≥0.62 + gate-green" was achieved; "stunning" was not.

---

## DEFERRED / residue

- **W-GOD1 (god-module carve) is `planned`, not landed** — `useMetaballRenderer.ts` stays a 707-line
  god-module; `proof:no-god-module` RED until W-GOD1 executes. The F5 ordering was inverted.
- **W-BLOB3 (second consumer / DI-seam strip)** — correctly out of W-BLOB2 scope (F4 routing), but
  still open; the speculative DI seam survives unbound.
- **No floor-relaxation occurred** (good) — the 0.62 floor held; the anchor moved 0.86→0.78 per the
  named-successor clause. No two-failed-lifts trigger fired.

---

## GESTALT

W-BLOB2 closes the chronic README↔reality lie for the *resting default* — a bare `<GooBlob>` now
paints a warm bead, ratified by a real-device π readback, and the 46→8 atom fold is genuine and
gate-bound. That is the headline and it lands. But the COMPONENT is not perfected end-to-end: the
wave shipped its renderer edits into an uncarved 707-line god-module (the largest `proof:no-god-module`
violator in the repo, now RED — the F5 dependency order was inverted), the mood DELTA proves nothing
readable (5 identical red frames; the cream default never shown on the mood surface), and the shipped
source carries stale body-L numbers that contradict the wave's own authoritative readback. The bar
("stunning warm-cream living bead, not just L≥0.62") is met as "competent honey-tan lemon, gate-green"
— a large step up from charcoal, but not the stunning living gel the docs sell. Genuinely-improved,
not yet perfected.
