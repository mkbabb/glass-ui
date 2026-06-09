# Research-necessity audit — aurora

**Lane** aurora · **Verdict** REFINE-FROM-EXISTING · **Audited** 2026-06-09 against the working tree
on `tranche/AY` (note: the Batch-2 finisher is concurrently writing the aurora shaders —
`tonemap.glsl.ts`, `mediums.glsl.ts`, `brush.glsl.ts`, `aurora.frag.ts` all carry same-day mtimes;
in-flight files are marked below).

---

## 1. The existing corpus (read in full)

| Artefact | State | What it settles |
|---|---|---|
| `src/components/custom/aurora/RESEARCH.md` (304 ln) | ON DISK, W43-shaped | the FIXED T1–T8 technique set + 14 citation anchors (§3/§3.1), the 3 reference-anchored metrics with numeric bands (§4), the 4-plate reference corpus (§1), the −5/3 Kolmogorov prior (§2), the WebGPU RETIRE decision row (§6), the 6-cohort dispatch (§7) |
| `scripts/aurora-arresting-metric.mjs` + `tests-visual/aurora-arresting-readback.ts` | ON DISK, harness GREEN | the reproducible §4 triple; ratified end-to-end on the ground truth: `starry-night-crop.png` → C=70.67 / A=0.832 / β=−1.67 (in the paper's β=1.67±0.13 band) — re-run live by B2-readiness §W-AUR-PAINTERLY |
| `tests-visual/fixtures/{starry-night-crop, aurora-ref-mesh-gradient, aurora-ref-skyscape, aurora-ref-oil-pastel}.png` | ON DISK (all 4) | the measurement ground; per-plate anchor table in RESEARCH.md §1 |
| `docs/tranches/AY/waves/AY.W-AUR1.md` | DEV-LANDED (its own header) | the research-consume wave; residue is VERIFY + the AY.md row reconcile, not authorship |
| `docs/tranches/AY/waves/AY.W-AUR-PAINTERLY.md` | OPEN, MID-IMPLEMENTATION | the tuning wave; edit-sites exact (file:line), bands fixed, out-of-scope named |
| `docs/tranches/AY/waves/AY.W-AUR-WEBGPU-DECIDE.md` + `docs/tranches/AY/audit/visual/W-AUR-WEBGPU-DECIDE-DELTA.md` | **EXECUTED — Branch A RETIRE fired** | twin deleted root-and-branch: `find src -name "aurora.wgsl.ts" -o -name "gpuRuntime.ts" -o -name "createGPUCanvas.ts"` → 0; `grep WEBGPU_PARITY\|resolveRenderModeAsync\|packGPUUniforms src/` → 0; README §WebGPU section gone (README 702→643 ln); DESIGN.md Δ09a terminal |
| `docs/tranches/AY/audit/hardening/{H-aurora.md, H-research-aurora.md}` | read | the red-team (scope no-ops, the unfalsifiable-bar chronic, the WebGPU scope-confusion) + the research seed the RESEARCH.md transcribed |
| `docs/tranches/AY/audit/hardening/b2/B2-readiness.md` | read | W-AUR-PAINTERLY = READY ("the strongest spec in the remaining set"; harness re-run green); W-AUR2 = RE-GROUND (the `proof:ay-w0-reground` G4 hole) |
| `docs/tranches/AX/research/{aurora-synthesis.md, aurora-README.md, aurora-research-corpus.json}` | present | the prior synthesis the brief grounds against (levers D/E1/E2, Tier-5 tonemap/cursor) |
| `DESIGN.md` (322 ln) | reconciled | invariant 8 (single-pass WebGL2 unconditional), Δ09a EXCISE terminal, the wake arm recorded unwired |

## 2. As-built vs the corpus (what already LANDED mid-flight)

- **T6 PBR-Neutral tonemap: LANDED.** `constants/shaders/tonemap.glsl.ts:17-31` is the Khronos
  PBR-Neutral curve (startCompression 0.76, hyperbolic highlight compression, luminance-anchored
  desaturation); the GLSL function keeps the name `aces()` so the `aurora.frag.ts` call-site is
  untouched (the slot, refilled). IN-FLIGHT (mtime today).
- **T1/T3 partially landed in the profiles.** `mediums.glsl.ts:293` (`energyGrade=1.0`, the full
  Starry-Night length cascade), `:336` + `:344-346` carry fresh −5/3-slope-referencing tuning
  comments; the layer multipliers `sBig=2.4 / sMed=1.1` (`:385-386`) are still the hand-set values
  the W-AUR-PAINTERLY spec targets. IN-FLIGHT — cite the wave spec, not these lines.
- **The capture loop is RUNNING.** `docs/tranches/AY/audit/visual/` holds
  `W-AUR-PAINTERLY-{vangogh,oil-pastel,oil}-{light,dark}-{before,iter1..iter20}.png` — 126 PNGs,
  the reference-anchored iterate-against-the-metric discipline visibly in motion.
- **NOT yet landed** (the W-AUR-PAINTERLY residue, all fully specced): `tests-visual/aurora-arresting.spec.ts`
  (edit-site #5), `scripts/proof-aurora-arresting.mjs` + the `package.json` entry (#6/#7 — only
  `proof:aurora-arresting-ref` exists at `package.json:630`), `W-AUR-PAINTERLY-DELTA.md` (#8), the
  final band-passing tune. `.cache/gates/AY-aurora-arresting.json` does not exist yet.

## 3. README grade — STALE (localized), reconciliation already assigned to W-DOC1

The 643-line README is structurally strong (the WebGPU retire reconciliation already landed in it:
the §Substrate honest sentence at `README.md:390-395`, the gate table carries no WebGPU rows). The
stale residue, all divinable:

1. **Tonemap drift (4 sites).** `README.md:12`, `:56`, `:173-175`, `:540` say "ACES tonemap" /
   "the LOCKED linear→ACES→OETF→dither pipeline"; as-built `tonemap.glsl.ts` is Khronos PBR-Neutral
   (in-flight, today). W-DOC1 must also note the kept `aces()` GLSL slot-name to pre-empt confusion.
2. **Architecture tree omits 5 of 10 composables.** `README.md:541-547` lists color/runtime/
   useAurora/uniformBridge/useCursorInteraction; missing `atoms.ts` (THE headline ≤7-atom consumer
   door), `configSource.ts`, `cursorModel.ts`, `frameLoop.ts`, `glSetup.ts`.
3. **Mediums table omits the three first-class painterly mediums.** `README.md:127-133` rows are
   smooth/pastel/watercolor/oil; `vangogh`, `oil-pastel`, `crayon` are first-class `medium` values
   (prose-only at `:142-146`).
4. **Gate table under-counts.** `README.md:557-576` lists 12 rows; missing
   `proof:aurora-painterly-statistics`, `proof:aurora-arresting-ref`, `proof:aurora-preset-roster`,
   `proof:aurora-stroke-composite`, `proof:aurora-fill-resize`, `proof:aurora-chrome-idiomatic`,
   and (once minted) `proof:aurora-arresting`.
5. **Orphaned References §WebGPU.** `README.md:637-642` (WGSL spec, WebGPU Fundamentals, WebGL→WebGPU)
   now reference nothing shipped post-retire — prune or mark as the investigation record.
6. Shader line-cites (`aurora.frag.ts:348/:372-388/:384` etc.) will drift under the in-flight edits —
   W-DOC1 re-greps at its close.

DESIGN.md grades ACCURATE post-retire (Δ09a terminal at `DESIGN.md:302-308`; invariant 8 at `:35`).

## 4. Verdict — REFINE-FROM-EXISTING; no fresh research pass warranted

RESEARCH.md's own charter is explicit (`RESEARCH.md:11-14`): "The technique set is FIXED here; the
impl wave DEEPENS each against the reference plates, it does not re-discover them." Every question a
research pass could answer is ANSWERED and ratified:

- The "arresting" bar is operationalized into three reproducible numeric bands, harness-verified on
  the ground-truth painting (the founding AW→AX→AY chronic, closed).
- The technique ranking is done with falsifiable evidence per row; T6 already landed, T1–T4 are
  in-flight tuning against the bands.
- The WebGPU question — the one genuinely open DECISION — was decided AND executed (RETIRE; deletion
  proof in the DELTA).
- The two contingencies are handled by INTERNAL clauses, not research: a too-tight band re-tunes off
  the 4-plate corpus (RESEARCH.md §1 named-successor; `AY.W-AUR-PAINTERLY.md` "Named successor" ¶2),
  and a coherence band unreachable without the multi-pass Kuwahara routes to a future
  named-consumer resurrect (¶4) — a consumer-existence fact, not a literature gap.

A fresh SOTA sweep here would re-tread a settled corpus — churn. The remaining work is (a) pure
tuning against the shipped metric (mid-flight, 126 capture iterations deep), (b) gate-minting per
the exact W-AUR-PAINTERLY edit-sites, (c) doc reconciliation (W-DOC1 / W-AUR2), (d) ledger hygiene.

## 5. Divined refinements (no research needed; corpus + code suffice)

1. Mint the live-GPU arresting gate: `tests-visual/aurora-arresting.spec.ts` importing
   `tests-visual/aurora-arresting-readback.ts` (consumer #2, the module's own header `:4-9` names it)
   + `scripts/proof-aurora-arresting.mjs` + the `package.json` script — `AY.W-AUR-PAINTERLY.md`
   edit-sites #5–7.
2. Author `docs/tranches/AY/audit/visual/W-AUR-PAINTERLY-DELTA.md` over the existing 126 iter PNGs
   with the per-medium C/A/β triple — edit-site #8; `proof:live-verified-ledger:ay` REDs without it.
3. Land the −5/3 respacing of `mediums.glsl.ts:385-386` (`sBig=2.4/sMed=1.1` hand-set) per
   RESEARCH.md §2/§4.3 — pure tuning against the harness (IN-FLIGHT).
4. W-DOC1 README fixes §3 items 1–6 above (tonemap ×4, architecture tree +5 composables, mediums
   table +3 rows, gate table +6/7 rows, References §WebGPU prune, line-cite re-grep).
5. Reconcile `PROGRESS.md:56,65-67` — all four aurora rows say `planned`; W-AUR1 is DEV-LANDED (its
   spec header), W-AUR-WEBGPU-DECIDE is EXECUTED (DELTA on disk, twin grep-0 in src), W-AUR-PAINTERLY
   is mid-flight.
6. Resolve the W-AUR2 G4 hole before its close: `proof:ay-w0-reground` does not exist
   (`B2-readiness.md` RG-A) — sequence W0-REGROUND's mint first or strike G4 to the AU twin.
7. Guard the readback-math twin: `aurora-arresting-readback.ts:4-9` declares
   `scripts/aurora-arresting-metric.mjs` a "byte-equivalent copy" kept in lock-step by hand — a
   divergence hazard; fold the script onto the shared module (or add a checksum clause to the gate).

## 6. Genuine research gaps

None. Both named contingencies (band re-tune; Kuwahara-needed-for-coherence) are covered by existing
named-successor clauses and resolve to internal measurement or consumer-existence questions, not to
anything a fresh external sweep could answer.
