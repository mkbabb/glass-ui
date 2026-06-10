# HC-aurora — re-ground of the W-AUR-PAINTERLY close (phase Reground)

**Lane** HC-aurora · **Date** 2026-06-09 · **Verdict GAPS-FOUND** — the close is substantially
REAL (the gate re-ran PASS on the live Metal GPU during this audit; the 18 PNGs are genuine,
demonstrative before/after captures), but the DONE_WITH_MISSES disposition under-counts its
misses: one HARD-GATE arm is unmet and unrecorded, the T5 successor routing is a dead pointer
into a terminally-RETIRED wave, the −5/3 radii respacing the matrix names is still owed, and
the spec's own ≥1280px capture clause was not met as written.

Everything below was verified by execution or direct artefact inspection — not by reading the
DELTA's claims back.

---

## 1. The 18 PNGs — demonstrative: YES (viewed), one prose overstatement

All 18 (`docs/tranches/AY/audit/visual/W-AUR-PAINTERLY-{vangogh,oil-pastel,oil}-{light,dark}-{before,after}.png`
+ the 6 suffix-less ledger frames) were opened and viewed; before/after pairs are visibly,
dramatically different, each on its OWN aurora surface (no borrowed-neighbor frames):

- **van-Gogh** before = garish over-saturated smooth blue/orange field with speckle; after =
  indigo/cobalt swirl-bands over golden ochre with visible flow-lines tracing a vortex.
  Genuinely arresting; the strongest delta of the three.
- **oil** before = near-uniform red drowned in isotropic speckle; after = directional diagonal
  raked strokes, speckle suppressed. Clear, honest delta.
- **oil-pastel** before = near-gradient pink/orange; after = creamy directional smears with
  visible feathered edges. The best pure-visual read of the three.

**1a — the "comma-dab divisionist" claim oversells (DELTA `W-AUR-PAINTERLY-DELTA.md:99-100`).**
At a 2× center-crop the van-Gogh after reads as smooth marbled flow-BANDS traced by thin
hairline streamlines — Starry-Night-congruent in palette, swirl topology, and flow coherence,
but NOT the discrete comma-DAB register the side-by-side judgement names. The numbers agree:
gap-fraction 0.049/0.052 sits a hair above the 0.04 atomicity floor (a dab field reads much
higher inter-stroke ground). Honest phrasing: "van-Gogh-congruent flow field"; the dab
atomicity is partial. This is a prose correction, not a band failure — all three bands are
genuinely met.

**1b — the PNGs are 932×701, below the spec's ≥1280px clause.** Wave edit-site #9 + HARD GATE
#2 (`AY.W-AUR-PAINTERLY.md:162`, `:222-224`) demand "≥1280px". `sips` reads every frame at
932×701 (the canvas element crop inside the 1440×900 viewport). The captures are real and
own-surface, but the clause as written is unmet — and this is exactly the IHDR-dimension
assert class (NECESSITY-MATRIX §4 R1) the chronic lane wants machine-held. Either the spec
clause is amended to "the full canvas element at ≥900px" (the honest as-built) or the capture
is re-taken at a viewport that yields ≥1280px canvas. The ledger frames are sha-identical
copies of the after frames (verified) — acceptable backing, recorded here for transparency.

## 2. `proof:aurora-arresting` — RE-RAN LIVE: PASS, hard-asserts confirmed; 4 sub-findings

Re-executed this audit on the real Metal GPU (`GLASS_UI_DEMO_PORT=5183 npm run
proof:aurora-arresting` → specs 1/0/0, `.cache/gates/AY-aurora-arresting.json` `status:pass`).
The live triples REPRODUCE the DELTA within noise:

| medium | C | A | hist | β | DELTA claimed |
|---|---|---|---|---|---|
| vangogh | 63.19 | 0.7332 | 2.36 | −1.809 | 63.0 / 0.733 / −1.82 ✓ |
| oil-pastel | 79.01 | 0.6718 | 2.76 | −2.533 | 79.0 / 0.67 / −2.45 ≈ |
| oil | 74.33 | 0.3603 | 3.13 | −1.568 | 74.6 / 0.36 / −1.57 ✓ |

The spec source (`tests-visual/aurora-arresting.spec.ts:163-201`) HARD-asserts exactly the
achieved bar — all-mediums C, van-Gogh A+hist+β, oil β, variance/chroma floors all mediums,
gap-fraction van-Gogh, pairwise media-distinct — and prints the residual un-asserted. The
runner (`scripts/proof-aurora-arresting.mjs:151-160`) is fail-closed when the workspace is
present and a band misses. The gate claim in the DELTA is TRUE.

**2a — foreign-server silent-skip clobbers the pass artefact.** During this audit a DIFFERENT
project's vite dev server (`sci-report/usf/web`) held :5173; `reuseExistingServer`
(`tests-visual/playwright.config.ts:85-92`) attached to it, `canvas.aurora-canvas` never
appeared, the spec took its device-absence skip (`aurora-arresting.spec.ts:136-141`), and the
runner OVERWROTE the committed `status:pass` artefact with `status:skipped` — on a real-GPU
machine. The skip/fail discrimination keys solely on canvas-presence, which cannot distinguish
"no GPU" from "wrong app on the port". One sentinel probe before the canvas wait (assert the
served page IS the glass-ui demo — a known root selector or title — and FAIL, not skip, when it
is not) closes the hole. (Artefact restored to `status:pass` by the re-run above; both runs are
this audit's.)

**2b — razor-thin margins, undocumented.** van-Gogh A=0.7332 clears the 0.732 floor by
**0.0012**; β=−1.809 clears the −1.85 edge by 0.041. The median-of-5 read is anti-flake by
design, but a margin this thin on a hard close gate deserves a recorded note (and makes 2a's
clobber hazard hotter). Not a defect in the bar — a flake-risk disclosure the DELTA omits.

**2c — the residual is printed, not ratcheted.** The DELTA says "a regression below the
residual is visible in the gate log" — visible-in-log is not RED. oil A could fall 0.36 → 0.05
and the gate stays green. A ratchet floor at achieved-minus-ε (oil A ≥ 0.30, oil-pastel
A ≥ 0.60, oil-pastel β ≥ −2.65) would machine-hold the lifted ground the wave actually won
(op A was lifted 0.41 → 0.67; that gain is currently unprotected).

**2d — dark-scheme only.** The spec pins `colorScheme: "dark"` (`aurora-arresting.spec.ts:129`);
the light-scheme renders exist as PNGs but are never metric-asserted. Minor; record or extend.

## 3. HARD GATE arm 4 — UNMET and UNRECORDED (the second miss the DELTA omits)

The wave's completion criterion + HARD GATE #4 (`AY.W-AUR-PAINTERLY.md:84-85`, `:238-241`)
require `proof:aurora-painterly-statistics` to flip "from the committed `status:fail` to
`status:pass`" on the same real-GPU run. Re-ran it this audit on the CORRECT server
(`GLASS_UI_DEMO_PORT=5183`): **0/2/0 FAIL** — both viewports time out at
`locator.selectOption` (`tests-visual/aurora-painterly-statistics.spec.ts:122-123`,
`[data-atom="medium"] select`). Root cause: the demo's medium control is `LabeledSelect`
(`demo/stories/aurora/AuroraAtomsPanel.vue:226`), a reka-ui `Select` compound
(`src/components/custom/labeled-field/LabeledSelect.vue:9`) with NO actionable native
`<select>` — the AX spec's driver is structurally stale (the stale-reka-binding class only e2e
catches). The committed artefact (`.cache/gates/AX-aurora-painterly-statistics.json`) remains
`status:fail` at HEAD.

The DELTA's Gate section claims the four floors via the arresting spec's EMBEDDED floor
asserts and never mentions arm 4 — but the substitution is not complete: the AX spec's
four-media-distinct clause includes **crayon**; the arresting spec's pairwise-distinct covers
only the three stroke mediums. Arm 4 is therefore a real, unrecorded MISS of the close. Fix
shape (finisher, one of): re-drive the AX spec through the preset buttons the arresting spec
already uses (`button[aria-pressed]` + hasText), or through the reka select's trigger/option
interaction — then re-run to flip the artefact.

## 4. T5 successor routing — RECORDED everywhere, but it is a DEAD POINTER

The routing IS consistently recorded: DELTA §Named-successor
(`W-AUR-PAINTERLY-DELTA.md:133-147`), the spec header (`aurora-arresting.spec.ts:27-32`), the
gate-artefact note, and the PROGRESS row (`docs/tranches/AY/PROGRESS.md:66`) all route the
oil/oil-pastel A + oil-pastel β residual to "T5 anisotropic-Kuwahara, gated on
`AY.W-AUR-WEBGPU-DECIDE`" / "the named consumer the WebGPU resurrect-branch demands."

But W-AUR-WEBGPU-DECIDE **closed 40 minutes earlier the same day as Branch A RETIRE,
terminal** (`W-AUR-WEBGPU-DECIDE-DELTA.md:1-8`, `:86-89`): "Branch B (RESURRECT) marked N/A …
Named successor: NONE — the twin is retired terminally. Any future WebGPU work opens fresh
with a named consumer … no scaffold to resurrect." The scaffold T5 would ride is deleted
root-and-branch. The painterly residual — precisely the "named consumer demanding the finish"
the painterly wave's own Named-successor clause (`AY.W-AUR-PAINTERLY.md:271-275`) said would
fire the resurrect branch — materialized AFTER the terminal close, so it routes into a wave
that can no longer receive it. **At HEAD the residual has NO live owner**: no born-RED row, no
fresh wave, no user-hinge entry — the §4 Class-F/B signature (a prose successor pointer with
no machine row). Disposition needed, one of:
- a fresh named wave (greenfield multi-pass Kuwahara — consistent with the RETIRE DELTA's
  "opens fresh with a named consumer"; the consumer now EXISTS and is this residual), or
- a USER-HINGE register row: "accept the single-pass A/β ceiling on oil/oil-pastel as the
  permanent register" — surfaced verbatim at every close per NECESSITY-MATRIX §2 USER-HINGE.
Either way the four routing sites (DELTA, spec header, gate note, PROGRESS row) should be
re-pointed off the dead `W-AUR-WEBGPU-DECIDE` cite.

## 5. The −5/3 radii respacing — OWED (band outcome reached by other levers)

`mediums.glsl.ts:385-387` still reads `sBig = baseScale * 2.4; sMed = * 1.1; sSml = * 0.45`
(+ `sFill = * 0.22` at `:434`) — byte-for-byte the hand-set values the NECESSITY-MATRIX
(§2 W-AUR-PAINTERLY bullet 3) and the wave's edit-site #2 ("re-space layer radii … −5/3-spaced")
target. The β bands were landed for van-Gogh and oil via OTHER levers (stroke elongation,
directional fill, PBR-Neutral tonemap, glint-gating — the DELTA's edits table calls this
"−5/3-SPIRIT cascade re-spacing", which papers over the radii non-move). Grading: the matrix
row is NOT closed-as-landed; it is OPEN-as-a-lever — and it is the most relevant untouched
lever for the one β still out of band (oil-pastel −2.53). Re-grade the matrix row from "land
the respacing" to "the named candidate lever for the oil-pastel β residual (route with §4's
disposition)" rather than silently striking it.

## 6. Aurora README-stale ledger (matrix §2 W-DOC1 rows) — CONFIRMED CURRENT, +1, and W-DOC1 not yet widened

Every row of `research-necessity/aurora.md §3` re-verified live at HEAD; none has been fixed:

1. **Tonemap drift — ×5, not ×4.** "ACES" survives at `README.md:12`, `:56`, `:173`, `:540`
   AND the ledger-missed `:336` ("…mediums, ACES tonemap, grain) runs in linear"). As-built
   `tonemap.glsl.ts:1-18` is Khronos PBR-Neutral with the `aces()` slot-name kept — the
   slot-name note the ledger prescribes is correct and needed.
2. **Architecture tree lists 5 of 10 composables** (`README.md:542-547`): missing `atoms.ts`,
   `configSource.ts`, `cursorModel.ts`, `frameLoop.ts`, `glSetup.ts` (dir listing verified).
3. **Mediums table** (`README.md:127-133`) carries smooth/pastel/watercolor/oil only;
   vangogh/oil-pastel/crayon are prose-only (`:142-146`). Confirmed.
4. **Gate table 12 rows** (`README.md:557-578`) vs 23 `proof:aurora-*` mentions repo-wide —
   now ALSO missing the freshly minted `proof:aurora-arresting` (+ `-arresting-ref`). Confirmed.
5. **References §WebGPU orphan** (`README.md:637-645`: WGSL spec, WebGPU Fundamentals,
   From-WebGL-to-WebGPU, the fluid-sim wake source) — survives the terminal RETIRE. Confirmed.
6. Line-cite re-grep at W-DOC1 close — still the right call; the painterly edits moved lines.

**The W-DOC1 spec itself has NOT been widened with these rows** (`AY.W-DOC1.md` greps clean for
tonemap/PBR-Neutral/mediums-table/architecture-tree — it still carries only the D1–D4
meta/W14-restoration classes). The matrix §2 header says "widen its rows"; the widening is
un-executed. If W-DOC1 runs to its spec as written, rows 1–5 above are missed. Fold this
ledger (or cite this file + `research-necessity/aurora.md §3`) into the W-DOC1 spec before its
dispatch.

## 7. Green arms (verified, no finding)

- `proof:live-verified-ledger:ay` — GREEN, 0 violations; the W-AUR-PAINTERLY `live-verified`
  PROGRESS row is backed by the on-disk DELTA + own-surface PNGs; bite self-test OK.
- `proof:aurora-atoms-roundtrip` — PASS (DEFAULT-PRESERVING; the smooth default unmoved —
  HARD GATE arm 3 holds; the DELTA's `atoms.ts` poles-untouched claim is consistent).
- The readback-math twin concern (matrix aurora §5.7) is MOOT as feared: the spec and the
  `.mjs` harness both import `tests-visual/aurora-arresting-readback.ts` (one module, two
  consumers) — no hand-locked copy found.

## Disposition summary

| Lane question | Answer |
|---|---|
| 18 PNGs demonstrative? | YES (viewed; real per-medium before/after deltas) — with the comma-dab prose overstatement (1a) + the ≥1280px clause unmet at 932×701 (1b) |
| Gate hard-asserts + runs? | YES — re-ran PASS on live Metal GPU, triples reproduce; but foreign-server skip clobber (2a), 0.0012 A-margin (2b), un-ratcheted residual (2c) |
| T5 routing recorded? | Recorded ×4 sites, but DEAD-POINTERED into the terminally-RETIRED W-AUR-WEBGPU-DECIDE — residual has no live owner; needs fresh wave or user-hinge (§4) |
| −5/3 respacing landed or owed? | OWED — `mediums.glsl.ts:385-387` radii byte-unchanged; bands landed via other levers; it is the live lever for the oil-pastel β residual (§5) |
| README ledger current? | CONFIRMED current at HEAD, +1 missed ACES site (`:336`); W-DOC1's spec NOT yet widened with the rows (§6) |
| Unrecorded miss | HARD GATE arm 4: `proof:aurora-painterly-statistics` still `status:fail` — stale `selectOption` driver vs the reka LabeledSelect; crayon distinctness not subsumed by the arresting spec (§3) |
