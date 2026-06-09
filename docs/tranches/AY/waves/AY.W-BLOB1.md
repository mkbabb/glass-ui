# AY.W-BLOB1 — Blob research-consume: the TARGETED audit of the OPEN items + the born-RED default-warmth gate

**Wave** `AY.W-BLOB1` · **Band** A (perfect-at-the-root) · **State** RESEARCH · **Repo** glass-ui
· **Kind** research-consume (writes a research artefact + 1 born-RED gate harness + 2 reference plates; writes NO `src/` shader code)
· **Blocks** `AY.W-BLOB2` (consumes the default-identity decision + the born-RED default-warmth gate + the atom-count ceiling), `AY.W-BLOB3` (consumes the consumer-#2 decision row), `AY.W-DOC1` (consumes the research-backed README content + the doc↔render reconciliation), `AY.W-GOD1` (consumes the ordering-dependency note: the metaball carve runs WITH/AFTER the blob content waves)
· **Depends on** `AY.W0-REGROUND` (the stale-ledger correction — so RESEARCH.md records the AX synthesis verdict against the real HEAD, not a stale claim)
· **Hardening inputs** `audit/hardening/H-blob.md` (the impl-scope red-team — F1/F2/F3/F4/F6 + the 6 convergence criteria), `audit/hardening/H-research-blob.md` (the authored SOTA brief this wave CONSUMES + its §5 convergence criteria + §6 waveSpecInputs), and the prior-tranche `docs/tranches/AX/research/blob-synthesis.md` (the synthesis this wave CONSUMES rather than re-runs)

---

## Defect (source-grounded, file:line)

The wave's binding defect is **process-shaped**: the AY plan's original `W-BLOB1` re-ran a 32-agent SOTA
sweep byte-identical in scope to the AX sweep that already concluded the question. Four concrete,
verified facts ground that and the OPEN items the re-scope must target:

1. **The 32-agent re-sweep re-runs a settled question (the KISS / research-for-research's-sake defect).**
   `AY.md:56` (directive-disposition) + the original seed both name a "32-agent SOTA sweep:
   metaball/SDF, lit-droplet shading, interaction". But the AX 32-facet sweep ALREADY ran and its
   synthesis states verbatim (`docs/tranches/AX/research/blob-synthesis.md:9-11`): the blob is
   *"already at or beyond the public web frontier … NOT algorithm-replacement waves"*, and
   (`blob-synthesis.md:85-93`) *"WebGL2 single-pass 2D-SDF is the correct, permanent floor … WebGPU is
   NOT warranted … Document WebGPU + particle-swarm as explicit, research-backed NON-GOALS."* Re-running
   that scope is process theatre; the hard gate it carried ("research doc + ranked path") is a
   process-only gate (a doc EXISTING ≠ a defect closing) — UNDER-SPECCED per
   `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` ("Grep-only and 'API exists' checks are insufficient for
   runtime features"). This wave is RE-SCOPED to the OPEN items the AX sweep deferred or could not
   answer (items 2–4 below + the WebGPU ratification), NOT a re-sweep.

2. **The DEFAULT blob renders a dark coffee-bean, not the "warm-cream living bead" every doc claims
   (the load-bearing OPEN defect; CHRONIC across AX.W15 + AX.W46).** Root cause is two shipped
   default values: `src/components/custom/goo-blob/types.ts:251` ships `paletteStops: []` (empty — the
   body falls back to the mounted `color`) and `types.ts:291` ships `rimColor: "var(--foreground)"`.
   Per CLAUDE.md, `--foreground` and the demo-mounted `--primary` (`hsl(24 10% 10%)`) are BOTH
   near-black warm-ink in light mode, so a bare default paints a dark body with a near-black rim. The
   "warm-cream" identity the component asserts is a thin SPECULAR/rim sheen (`metaball.frag.ts` `warmCream`
   OKLCh stop) on a dark body — it does NOT make a dark body read cream. Captured proof (the cardinal
   DELTA, already on disk): `docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png` renders the
   default as a charcoal/brown amorphous mass; the COLORED variants
   (`blob-default-AFTER-mobile.png`) read as lit beads — only the default (dark) does not. This is the
   exact headless-green/visually-broken trap MEMORY flags as the AX-halt cause.

3. **The blob carries the aurora "simplify to atoms" sprawl, but no simplification clause was ever
   applied to it (the gestalt/KISS asymmetry).** `metaball.frag.ts` declares **46 uniforms**
   (`grep -c '^uniform'` = 46, verified); `types.ts` `BlobConfig` ships ~50 tunable fields. The aurora
   plan made "simplify the options set to atoms" a HARD GATE (`AY.md` W-AUR2 / the PROMPT-CORPUS
   mandate); the blob, with the identical sprawl, never did across AW + AX + the original AY plan. The
   AX synthesis itself flagged `orbitSpeedScale`/`wobbleScale` as "derived-but-unread" (the
   over-parameterization smell). The OPEN item: a measured atom-count CEILING that the current ~50-field
   surface FAILS.

4. **The AX-named consumer #2 (value.js repatriation) never landed — substrate-without-a-second-
   consumer (the overfitting wall).** GooBlob is EXPORTED (`@mkbabb/glass-ui/goo-blob`,
   `src/subpaths/goo-blob.ts`) with a full ColorResolver DI seam built for it. Verified: across
   `~/Programming/{slides,speedtest,value.js}/src` there is **zero** `GooBlob`/`goo-blob`/`metaball`
   reference; the ONLY real consumer is the demo story `demo/stories/substrates/blob.vue`. The AX
   synthesis named the binding close-criterion explicitly (`blob-synthesis.md` item 8 / its W16 line):
   *"value.js DELETES its local goo-blob fork and consumes @mkbabb/glass-ui/goo-blob … the seam was
   designed for exactly this."* It never arrived. This is the exact bar `L invariant 8` freezes. The
   OPEN item: a recorded DECISION — bind consumer #2 OR formally book demo-only and strip the
   speculative DI — that the downstream W-BLOB3 executes.

The brief that closes the SOTA dimension of these is **ALREADY AUTHORED** — `H-research-blob.md` carries
the 2025 liquid-glass corpus (§1), the 5 ranked techniques (§1 T1–T5), the convergence criteria (§5),
and the waveSpecInputs (§6). This wave **CONSUMES that brief + the AX synthesis** into the on-disk
`RESEARCH.md` artefact + a runnable born-RED gate harness; it does NOT re-run a from-zero 32-agent
sweep (the technique set is FIXED in the brief; the architecture question is SETTLED in the synthesis —
re-discovering either is the process theatre this wave exists to stop).

---

## Goal criterion (the aim)

After this wave, the blob lane has a **single forward research artefact** that (a) RECORDS the AX
synthesis verdict (WebGL2-floor / WebGPU-non-goal / motion-doctrine-preserved) as the settled axis it
does not re-open, (b) enumerates the four OPEN items (the dark-default identity defect, the ~50-knob
atom simplification, the missing consumer #2, the doc↔render lie) as a ranked path-forward each bound to
a downstream impl wave, (c) RECORDS the default-identity DECISION (ship a light warm-cream OKLCh default
base so a bare `<GooBlob>` paints the cream bead the docs promise — the greenfield "SOTA-look-is-the-
default" move, NOT a doc-correction-only retreat), and (d) ships a **born-RED-at-HEAD gate harness** so
the downstream W-BLOB2 has a falsifiable target the current dark default FAILS — not a re-stated vibe.
A fresh reader of `src/components/custom/goo-blob/RESEARCH.md` can answer "what is settled, what is open,
what is the decided default identity, and what number does the current default fail" from it alone.

## Completion criterion (the artefact)

The HARD GATE below verifies. `RESEARCH.md` is present in the `W43-fourier-field-SOTA.md` exemplar shape
with: the AX-synthesis-consumed settled axis; the ranked OPEN-item table (each row bound to a downstream
wave + a born-RED gate); the recorded default-identity decision; the recorded consumer-#2 decision row;
the WebGPU + particle-swarm NON-GOAL ratification. AND the born-RED gate is REAL — `npm run
proof:blob-warm-default` runs the harness against the AT-HEAD default and **exits NON-ZERO** (the
current dark coffee-bean fails the warm-bead band), which is the difference between an artefact gate and
an "API exists" gate. The 12 existing `proof:blob-*` stay green (no regression; this wave writes no
shader code).

---

## Objective — CONSUME the synthesis + the brief; record the decisions; author the born-RED gate

Produce **`src/components/custom/goo-blob/RESEARCH.md`** in the `W43-fourier-field-SOTA.md` shape,
sourced from the AX synthesis (the settled axis) + `H-research-blob.md` (the SOTA techniques + the open
items). Concretely:

1. **§0 the SETTLED axis (consume the AX synthesis — do NOT re-open).** Record verbatim, as the axis
   this wave does NOT re-research: (a) the metaball/SDF math is correct & gate-green (12 `proof:blob-*`);
   (b) the motion doctrine (de-synced multi-sine breath, critically-damped pointer spring, volume-
   preserving squash, decaying pseudopod) is the SOTA and is PRESERVED unchanged (`H-research-blob.md`
   §1 T5, §5 item 5 — "the motion is fine; the SURFACE is the gap"); (c) the WebGL2 single-pass 2D-SDF
   is the permanent floor. This §0 is the structural antidote to the 32-agent re-sweep: the reader sees
   what is closed BEFORE the open items, so a future agent never re-runs the settled question.

2. **§1 the OPEN-item ranked path-forward table.** A table, each row carrying **{open item, root cause
   (file:line), the SOTA/decision source, the downstream impl wave, the born-RED evidence that proves it
   closed}**. The four ranked rows:
   - **OPEN-1 (KEYSTONE) — the dark-default identity defect.** Root: `types.ts:251` `paletteStops: []` +
     `types.ts:291` `rimColor: "var(--foreground)"`. Source: H-blob.md F2 + the captured DELTA
     `AX/audit/visual/W46/blob-default-AFTER-calm.png`. Downstream: W-BLOB2. Born-RED: the
     `proof:blob-warm-default` harness this wave mints (the resting body mean OKLCh-L over a transparent
     backdrop must read as a LIGHT bead `L ≥ 0.62`, the charcoal default measuring ≈ 0.53 — below the floor).
   - **OPEN-2 — the ~50-knob atom simplification.** Root: 46 uniforms in `metaball.frag.ts` + ~50
     `BlobConfig` fields; the `orbitSpeedScale`/`wobbleScale` "derived-but-unread" smell. Source: the
     aurora "simplify to atoms" mandate (asymmetric — never applied to blob). Downstream: W-BLOB2.
     Born-RED: a top-level-config-atom-count CEILING (`≤ N`, the concrete numeral set in §2 below) that
     the current ~50-field surface FAILS.
   - **OPEN-3 — the missing consumer #2.** Root: zero `GooBlob` consumer across slides/speedtest/value.js
     `src/`; the DI seam built for a value.js fork that never repatriated. Source: H-blob.md F4 + the AX
     synthesis item-8 close-criterion. Downstream: W-BLOB3. Decision recorded in §3 below.
   - **OPEN-4 — the doc↔render lie.** Root: the README sells "lit warm-cream bead" / "living membrane"
     while the default renders charcoal. Source: H-blob.md F2 + H-research-blob.md finding 5. Downstream:
     W-DOC1 (cites this RESEARCH.md + the W-BLOB2 captured DELTA, no aspirational copy).
   Each row's "born-RED evidence" column is the falsifiable target — the table is NOT a vibe list.

3. **§2 RECORD the default-identity DECISION (the headline decision this wave owns).** State the
   resolved choice explicitly: **ship a genuinely warm-cream OKLCh default base** so a bare
   `<GooBlob :config="BLOB_CONFIG_DEFAULTS">` paints the cream bead the docs promise — the greenfield
   "the SOTA look IS the default" move (the same edict AX.W15 applied to flip `lit:true`), NOT the
   doc-correction-only retreat (H-blob.md F2 option-(b), explicitly REJECTED here as the non-greenfield
   path). Record the concrete mechanism for W-BLOB2 to execute: a light warm-cream default `paletteStops`
   ramp (a light OKLCh stop family, e.g. the demo's seed-palette analogous ramp promoted to the DEFAULT,
   replacing the empty `[]`) so the BODY reads cream, with the rim/specular re-balanced as the thin edge
   catch-light on top (NOT the whole show — the H-research-blob.md §5 item-4 "re-balance the lit layers
   DOWN" note carried as the W-BLOB2 instruction). Also record the **atom-count ceiling numeral**: the
   top-level `BlobConfig` surface reduces to **≤ 12 atoms** (mirroring the aurora seed/harmony/mood/
   medium/zones/motion atom set), with every derived-but-unread field (`orbitSpeedScale`, `wobbleScale`,
   the per-channel duration knobs) either wired-and-read or DELETED — no derived-but-unread field
   survives the W-CLOSE1 overfitting audit. This is the decision the seed's hard gate names ("the
   default-identity decision recorded").

4. **§3 RECORD the consumer-#2 DECISION ROW.** State which branch W-BLOB3 executes at AY close:
   **(a) BIND consumer #2** — value.js DELETES its local fork and consumes `@mkbabb/glass-ui/goo-blob`
   through the existing ColorResolver seam (the seam was designed for exactly this), OR a speedtest/real-
   slides surface adopts it; OR **(b) FORMALLY BOOK demo-only** — the blob is recorded as a demo-only
   showcase primitive retained with rationale, and the speculative DI ceremony (the loud-throw, the
   inject DI) is STRIPPED to the demo's actual one-resolver need. The row STATES which branch fires (it
   does NOT carry the seam forward undecided — the H-blob.md F4 / `L invariant 8` bar). The default
   recommendation recorded: branch (a) if value.js still ships a local goo-blob fork at AY-execution time
   (verify at W-BLOB3); else branch (b) with the DI strip (the speculative seam does not outlive a
   one-consumer reality). This is recorded for the W-CLOSE1 overfitting audit.

5. **§4 RATIFY the WebGPU + particle-swarm NON-GOAL (consume the AX synthesis verdict).** Transcribe the
   `blob-synthesis.md:85-93` decisive verdict: WebGL2 single-pass 2D-SDF is the permanent floor; WebGPU
   compute is a net LOSS at ≤4 nuclei (the `O(balls×pixels)` accumulation bottleneck only pays off at
   hundreds-to-thousands of balls or 3D marching-cubes); a decorative background cannot carry a hard
   WebGPU dependency; IF ever adopted, WebGPU is a SUBSTRATE-WIDE decision (Aurora's WGSL path), never
   blob-local. Record WebGPU + particle-swarm as explicit, research-backed NON-GOALS so a future agent
   never re-opens the settled raymarch/WebGPU question (the H-blob.md convergence criterion 6). NOTE the
   one place H-research-blob.md §1 T4 EXTENDS (not re-opens) the floor: a `uBackdrop` sampler over a
   glass-ui-rendered backdrop (aurora FBO / baked gradient) is a portable WebGL2 refraction path — record
   it as a W-BLOB2/W-BLOB3 CANDIDATE technique under the existing WebGL2 floor, explicitly NOT a WebGPU
   re-open and NOT a DOM-sampling path (html2canvas is non-portable, research-rejected).

6. **Mint the born-RED gate HARNESS (the reproducibility leg — what makes this a real gate, not prose).**
   `tests-visual/blob-warm-default.spec.ts` (the π workspace spec) mounts the REAL `<GooBlob>` with
   `BLOB_CONFIG_DEFAULTS` over the demo backdrop, reads back the painted pixels via the existing
   `locator.screenshot()` + pngjs mechanism (the `blob-render.spec.ts` modal-bg + interior-inset
   precedent — NOT a `getImageData` readback, which reads empty without `preserveDrawingBuffer`), and
   ASSERTS the resting BODY (the modal-non-background interior region) mean OKLCh-L reads as a LIGHT bead:
   `L ≥ 0.62` (a warm-cream body, the `WARM_BEAD_L_MIN` constant). The born-RED margin is HONEST against
   the committed measurement: the AX calm reference plate reads body-L `≈ 0.53` (a brown/charcoal body
   whose mean is LIFTED by the lit-rim + cream-AA pixels inside the body box), and the live near-black
   `var(--primary)` body reads LOWER — both BELOW the `0.62` floor, so the gate exits NON-ZERO at HEAD.
   (NOT a claimed `L < 0.30`: the central-body box necessarily catches some rim/AA cream, so the measured
   charcoal body sits ≈ 0.53, not 0.18 — the floor is set at 0.62 specifically to clear that lifted
   measurement with margin.) `scripts/proof-blob-warm-default.mjs` is the gate DRIVER (the
   `proof-blob-render.mjs` fail-closed pattern: workspace-PRESENT + render-broken → exit 1; genuine
   device-absence on a zero-dep runner → befitting SKIP exit 0). This wave SHIPS the harness born-RED
   (it FAILS at HEAD on the dark default); W-BLOB2 turns it GREEN by shipping the warm-cream default. The
   harness is consumer-#1; W-BLOB2 is consumer-#2 — clears the ≥2-consumer bar for the harness leaf.

---

## Edit-sites (exact)

| # | file | edit |
|---|---|---|
| 1 | `src/components/custom/goo-blob/RESEARCH.md` | **NEW** — the `W43-fourier-field-SOTA.md`-shaped artefact (§§above): §0 settled axis (AX-synthesis-consumed), §1 OPEN-item ranked table, §2 default-identity decision + atom-count ceiling (≤12), §3 consumer-#2 decision row, §4 WebGPU/particle-swarm non-goal ratification + the `uBackdrop`-under-the-WebGL2-floor candidate note |
| 2 | `tests-visual/blob-warm-default.spec.ts` | **NEW** — the π workspace spec: mount `<GooBlob>` with `BLOB_CONFIG_DEFAULTS`, `locator.screenshot()` + pngjs readback (the `blob-render.spec.ts` modal-bg/interior-inset precedent), assert resting-body mean OKLCh-L ≥ 0.62 (`WARM_BEAD_L_MIN`); born-RED at HEAD (the dark default's body box measures ≈ 0.53, below the 0.62 floor) |
| 3 | `scripts/proof-blob-warm-default.mjs` | **NEW** — the gate DRIVER (the `proof-blob-render.mjs` fail-closed pattern: invoke the spec via the workspace Playwright runner, parse the JSON report, emit a byte-stable gate artefact; workspace-PRESENT + render-broken → exit 1, genuine device-absence → SKIP exit 0) |
| 4 | `package.json` | add `"proof:blob-warm-default": "node scripts/proof-blob-warm-default.mjs"` — the runnable invocation the HARD GATE reads |
| 5 | `tests-visual/fixtures/blob-default-charcoal-HEAD.png` | **NEW** — the committed BEFORE plate (the AT-HEAD dark default the born-RED gate fails on), the cardinal DELTA's BEFORE half for the W-BLOB2 AFTER comparison |
| 6 | `docs/tranches/AY/AY.md:148` | reconcile the W-BLOB1 row's hard-gate text to point at the committed `RESEARCH.md` + the `proof:blob-warm-default` born-RED harness (struck of the process-only "doc exists" phrasing) |

**Out of scope (named, so the wave does not drift):**
- **NO `src/` shader / composable / types edits** — `metaball.frag.ts`, `sdf-body.glsl.ts`,
  `useMetaballRenderer.ts`, `types.ts` are the downstream `W-BLOB2`/`W-BLOB3` edit-sites; this wave writes
  the TARGET (the decision + the born-RED gate), NOT the fix. Shipping the warm-cream default base IS
  W-BLOB2's job — turning the gate this wave authors GREEN.
- **NO 32-agent re-sweep** — the technique set is FIXED in `H-research-blob.md`; the architecture verdict
  is SETTLED in `blob-synthesis.md`. RESEARCH.md CONSUMES both; it does not re-discover them (the F1
  process-theatre this wave exists to stop).
- **NO god-module carve** — `useMetaballRenderer.ts` (694 LOC) is `W-GOD1`'s edit-site; RESEARCH.md
  RECORDS the ordering dependency (W-GOD1 runs WITH/AFTER the blob content waves, re-gated on
  `proof:blob-render` + `proof:blob-color-equivalence` byte-identity), it does not carve.
- **NO consumer-#2 binding or DI strip** — `W-BLOB3` executes the §3 decision; this wave RECORDS which
  branch fires, it does not edit value.js or strip the seam.

---

## House-keep guards (no precept drift)

- **No re-build of DONE work** (H-blob.md F1, the AX synthesis): this wave does NOT re-research the
  metaball math, the motion doctrine, or the WebGL2/WebGPU floor — all SETTLED. RESEARCH.md §0 RECORDS
  them as the closed axis; it does not re-sweep them.
- **Greenfield-no-meta** (the MEMORY edict): RESEARCH.md carries NO "ported from" / version history /
  "AX deferred this" meta-language on the shipped component surface — it is a forward research artefact in
  the exemplar's voice. (It MAY cite the AX synthesis + the captured DELTA paths as the measurement
  ground, the same way W-AUR1's RESEARCH.md cites its reference plates.)
- **No speculative shared subpath** — the gate harness lives in `scripts/` + `tests-visual/`, NOT a
  published `/goo-blob` metric export; it is a build/test leaf (the ≥2-consumer bar applies to library
  substrate, not a CI harness; consumer-#1 is this wave's spec, consumer-#2 is W-BLOB2's GREEN run).
- **The BEFORE plate is a fixture, not a bundle asset** — under `tests-visual/fixtures/` (the
  `starry-night-crop.png` / `blob-default-AFTER-*.png` precedent), NEVER imported into `src/` or shipped
  in `dist/`.
- **The cardinal-lesson DELTA discipline** — the gate harness is the UNATTENDED measurement; the BINDING
  close of the DOWNSTREAM W-BLOB2 is a committed paired BEFORE/AFTER/DELTA of the default blob full-bleed
  light+dark under `AY/audit/visual/`. This wave commits the BEFORE plate (edit-site 5) so W-BLOB2's
  AFTER has a paired comparison.

---

## HARD GATE (evidence-backed)

`src/components/custom/goo-blob/RESEARCH.md` is present in the `W43-fourier-field-SOTA.md` shape and the
born-RED gate harness is REAL. ALL FOUR, each machine-checkable:

1. **The ranked OPEN-item path consumes the AX synthesis + records the decisions.** RESEARCH.md carries
   §0 (the AX-synthesis-consumed settled axis: math-green, motion-preserved, WebGL2-floor), §1 (the
   4-row OPEN-item ranked table, each row bound to a downstream wave + its born-RED evidence column), §2
   (the default-identity DECISION — ship a light warm-cream OKLCh default base, with the ≤12 atom-count
   ceiling), §3 (the consumer-#2 decision row naming which branch W-BLOB3 fires), and §4 (the WebGPU +
   particle-swarm NON-GOAL ratification). Evidence: the harvested-doc structure check — the §0–§4 sections
   parse, the OPEN-item table parses with ≥4 rows each carrying the downstream-wave + born-RED-evidence
   columns, and the default-identity + consumer-#2 + WebGPU rows each STATE a resolved branch (not "TBD").
2. **The born-RED gate is REAL and FAILS at HEAD (the load-bearing distinction — NOT a process-only "doc
   exists" gate).** `npm run proof:blob-warm-default` runs `scripts/proof-blob-warm-default.mjs`, which
   mounts the AT-HEAD `<GooBlob>` default and reads back the resting-body mean OKLCh-L — and on the π
   workspace (Playwright PRESENT) it **exits NON-ZERO** because the dark default's body box measures
   `≈ 0.53` (a charcoal/brown body whose mean is lifted by the lit-rim + cream-AA pixels), below the
   `L ≥ 0.62` warm-bead band. Evidence: `npm run proof:blob-warm-default` exit code
   is non-zero at HEAD AND the gate-artefact JSON records `status:fail` with the measured charcoal L. (On
   a genuine zero-dep runner the gate befitting-SKIPs exit 0 per the `proof-blob-render.mjs` fail-closed
   contract — that is device-absence, not a false-green; the born-RED truth is read on the workspace.)
3. **The existing 12 `proof:blob-*` stay green (no regression).** This wave writes NO `src/` code; the
   render is untouched. Evidence: `npm run proof:blob-render && npm run proof:blob-color-equivalence`
   (and the other 10) exit 0 — unchanged from HEAD.
4. **The BEFORE plate + the harness invocation are committed.** Evidence: `git status` shows
   `tests-visual/fixtures/blob-default-charcoal-HEAD.png`, `tests-visual/blob-warm-default.spec.ts`,
   `scripts/proof-blob-warm-default.mjs` tracked, and `package.json` carries the `proof:blob-warm-default`
   script; the W-BLOB1 row in `AY.md:148` no longer reads "doc exists" — it points at the harness.

**The binding single condition (the close reads this):** `src/components/custom/goo-blob/RESEARCH.md`
present with §0 (AX-synthesis-consumed settled axis) + §1 (the 4-row ranked OPEN-item table) + §2 (the
recorded default-identity decision: light warm-cream OKLCh default base + the ≤12 atom-count ceiling) +
§3 (the consumer-#2 decision branch) + §4 (the WebGPU/particle-swarm non-goal ratification), AND `npm run
proof:blob-warm-default` exits NON-ZERO at HEAD on the π workspace (the born-RED default-warmth gate the
dark coffee-bean default FAILS — the difference between an artefact gate and a doc-exists gate), with the
12 existing `proof:blob-*` STILL green.

---

## Named successor (on miss)

- If the born-RED harness cannot read the body region cleanly (the modal-bg estimate is corrupted by the
  rounded-card clip on the demo mount, the `blob-render.spec.ts` known hazard): the diagnostic-loop
  trigger fires and the readback is fixed (interior-inset + modal-quantized bg, the `blob-render.spec.ts`
  precedent) BEFORE close — a harness that cannot separate a charcoal body from a cream one cannot bound
  the downstream tuner, so this is a HARNESS bug, not a research miss.
- If the §3 consumer-#2 verification cannot reach the value.js tree at authoring time (the sibling repo is
  absent on the runner): the decision row records the BRANCH CONDITION (bind-if-fork-present-at-W-BLOB3,
  else book-demo-only-and-strip) and names `W-BLOB3` as the successor that resolves it against the live
  value.js tree — the decision is recorded as a conditional, never carried undecided.
- If the default-identity decision is contested at execution (a reviewer prefers the doc-correction
  retreat): the decision stands as RECORDED (the greenfield "SOTA-look-is-the-default" move per the
  MEMORY greenfield edict + the AX.W15 lit-flip precedent); a reversal is a `scope-reveal` trigger that
  re-opens THIS wave's §2, not a W-BLOB2 drift.
