# S-cross-cutting — write-scope overlap matrix + L-dual reconcile + convergence re-validation

**Lane** S-cross-cutting (AY spec-hardening) · **Mode** REFINE (read all AY `waves/*.md` + all slides
`L/waves/*.md` + both `*.md` plans + both DRAFTs) · **HEAD** glass-ui `at-dock-convergence`,
slides `main` · **Captured** 2026-06-09 · **Refines** `AY.W-DAG.md` (the wave-inventory gate spec).

The job: (1) build the WRITE-SCOPE-OVERLAP MATRIX so the DAG sequences shared-write waves serially,
not in parallel; (2) reconcile the dual-named L specs (the `L.W1.md` vs `L.W1-close-arc-rebuild.md`
class) and the THREE-WAY L-set drift; (3) re-validate the H-convergence STOP checklist against the
refined specs; (4) confirm the AY.md §2 ↔ `waves/` bijection.

---

## §0 — TL;DR

- **AY §2 ↔ waves/ bijection: COMPLETE.** 43 §2 ids ↔ 43 spec files, exact. (AY.md §2 *header* still
  reads "~34 waves" — cosmetic drift, fixed in the W-DAG refine.)
- **AY §2 ↔ EXECUTION-DAG §3 node coverage: COMPLETE.** Every §2 id appears in a DAG batch table
  (some inside combined cells: `W-SCALE1/2`, `W-SB1/2/3`, `[HINGE 1] W-PUB1`).
- **L-SET: THREE-WAY DRIFT — the headline cross-cutting break.** `L.md §2` was RE-SCOPED (2026-06-09
  15:06) to a 7→9-slide RE-STRUCTURE with a NEW 15-id naming scheme; `L/waves/` + `L/PROGRESS.md` +
  `EXECUTION-DAG.md` carry the OLD 11-id scheme; `L-DRAFT.md` still carries the 7-id `L.W1..L.W7`.
  The W-DAG gate's clause (c) expected set is now STALE on all three counts. **This is the single
  most load-bearing refine in this lane** — it propagates into the DAG §3 Batch-6 L-table and the
  W-DAG gate.
- **Dual-named L spec files: 14 stale duplicates.** `L.W1.md` AND `L.W1-close-arc-rebuild.md` (×7
  for W1-W7), PLUS `L.W5.md` AND `L.W5-deploy.md` (marked SUPERSEDED). The old `L.W<N>-<slug>.md`
  set must be DELETED; the canonical set is re-authored under the new scheme.
- **WRITE-SCOPE OVERLAP: 7 hot files, all serial-class.** `scripts/gates.mjs` (the gate manifest;
  `ci.yml` is GENERATED from it), the 3 CSS monoliths, and 5 multiply-authored `proof-*.mjs`. The AY
  specs are ALREADY overlap-aware (they carry sibling READ-not-WRITE notes) — this lane harvests
  those into one matrix the DAG cites.

---

## §1 — the WRITE-SCOPE-OVERLAP MATRIX

A file is **serial-class** when ≥2 specs WRITE it and the writes are not provably disjoint REGIONS;
the DAG must place those specs in different batches OR sequence them within a batch (never naive
parallel). `ci.yml` is a GENERATED artefact (`gates.mjs --emit-ci`, byte-locked by
`proof:gen-ci-fresh`) — the true contention is on `scripts/gates.mjs`, the source manifest.

### Hot file 1 — `scripts/gates.mjs` (the gate manifest; the highest-traffic shared file)

Every wave that REGISTERS a new gate key, CI-PROMOTES an existing gate, or edits a gate's metadata
edits this ONE 83KB file. ~27 specs reference it.

| writer wave | edit | batch |
|---|---|---|
| W-GLASS | register `proof:glass-cohesion`, `proof:glass-level` | 1 |
| W-MOTION | CI-promote `proof:animation-coherence`; the register-assignment widen | 1 |
| W-GOD1 | CI-promote `proof:no-god-module`; wire `proof:composable-return-types` | 4 |
| W-CSS1 | register the `.css`-aware god-module arm + `proof:var-in-arbitrary-guard` | 4 |
| W-LEG1 | register `proof:no-retired-survivor`/`proof:tag-parity`/`proof:no-legacy-commentary`/`proof:var-in-arbitrary-guard` | 4 |
| W-SCALE2 | register `proof:touch-target` | 3 |
| W-A11Y-PERF | register `proof:webkit-backdrop`, `proof:dark-semantic-contrast` | 3 |
| W-CON2/CON3 | register `proof:constellation-egg-live`, `proof:constellation-freeze-live` | 2 |
| W-SB1/2/3 | extend `proof:no-orphan-demo-route`; register orphan-component gates | 3 |
| W-CARRY/W-NDA/W-TRIAGE | extend `proof:disposition-live` | 4/5 |
| W-CLOSE1 | register `proof:ay-final` | 5 |
| W-CARDINAL-INFRA | tranche-parameterize `proof:live-verified-ledger` | 0 |

**Resolution.** The batch barrier already serializes most of these (Batch 0 → 1 → 4 → 5). The IN-BATCH
collisions to flag: **Batch 1 W-GLASS ↔ W-MOTION** (the gate the task named); **Batch 4 W-GOD1 ↔
W-CSS1 ↔ W-LEG1** (all three add/promote god-module + var-in-arbitrary gates). DISCIPLINE: within a
batch, gate-registering waves land their `gates.mjs` manifest edit SERIALLY (orchestrator integrates
one, re-emits `ci.yml`, integrates the next) — never two parallel patches to the same manifest array.
A single `proof:gen-ci-fresh` re-emit runs ONCE at batch close, not per-wave.

### Hot file 2 — `proof-*.mjs` scripts authored/edited by ≥2 waves (the named-collision set)

| script | writers | resolution |
|---|---|---|
| `proof-no-god-module.mjs` | W-GOD1 (logic carve), W-CSS1 (.css-aware arm), W-LEG1 (registration) | SERIAL: W-GOD1 → W-CSS1 → W-LEG1 (the W-COLOCATE "three run in series" note already declares this) |
| `proof-var-in-arbitrary-guard.mjs` | W-CSS1, W-LEG1 | SERIAL in Batch 4; W-CSS1 authors, W-LEG1 registers — declare authorship to ONE |
| `proof-gen-ci-fresh.mjs` | W-LEG1, W-MOTION | both merely RE-RUN it; neither edits it — NOT a write-collision (read/run only) |
| `proof-live-verified-ledger.mjs` | W-CARDINAL-INFRA (mints/parameterizes), W-LIVE1 (hardens complete-coverage) + ~10 visual waves (NAME it, do not edit) | W-CARDINAL-INFRA owns the WRITE (Batch 0); W-LIVE1 hardens (Batch 4); the visual waves are READ/NAME only |
| `proof-dock-animation-live.mjs` | W-DOCK1 (capture), W-DOCK2 (entering-child assert), W-LIVE1 (names) | W-DOCK1 → W-DOCK2 SERIAL in Batch 1→2; W-LIVE1 reads |
| `proof-slider-two-only.mjs` | W-SLD1, W-SLD2 | SERIAL: W-SLD1 (design) → W-SLD2 (consumer-boundary clause); both Batch 2 |
| `proof-blob-warm-default.mjs` | W-BLOB1 (born-RED mint), W-BLOB2 (flip GREEN) | SERIAL by construction (mint then satisfy); Batch 1→2 |
| `proof-ay-final.mjs` | W-CLOSE1 (authors), W-CONSUMER (cited-by) | W-CLOSE1 owns; W-CONSUMER is cited-by (read) |

### Hot file 3-5 — the CSS monoliths

| file | writers | resolution |
|---|---|---|
| `tokens.css` | W-SCALE1 (comment-only `:1189-1196`), W-GLASS (Notification ladder), W-CON1/CON2 (`--constellation-alpha`), W-A11Y-PERF (W55 tint), W-CSS1 (CARVE into `@import` partials) | W-CSS1 is the LAST writer (Batch 4 carve) — it consumes the settled file; the Batch-1/2 token edits land FIRST; W-SCALE1's edit is comment-only + non-overlapping (already declared) |
| `glass.css` | W-GLASS (EDITS: specular group + WHC + Drawer), W-MOTION (READS as scan-target, does NOT edit — declared), W-A11Y-PERF (W55 tint region), W-CSS1 (carve) | W-GLASS owns the Batch-1 edit; W-MOTION read-not-write (already declared both ways); W-A11Y-PERF disjoint REGION; W-CSS1 carves LAST |
| `utilities.css` | W-SCALE2 (`@utility touch-hit-area`), W-MOTION (re-point), W-CSS1 (carve), W-COLOCATE (idiom home) | W-SCALE2/W-MOTION land in their batches; W-CSS1 carves LAST; W-COLOCATE is the THIRD structural step (serial after W-CSS1, declared) |

**The W-CSS1/W-GOD1/W-COLOCATE serial spine is ALREADY declared** in the specs ("the three run in
SERIES on the carved dirs … they share write scope on `src/components/custom/{goo-blob,constellation,
tabs,dock}/` and `src/styles/`"). The DAG must NOT place W-GOD1/W-CSS1/W-COLOCATE as parallel Batch-4
siblings — they are an in-batch serial sub-chain.

### Cross-repo write-scope: zero glass-ui↔slides file collision

AY writes only `glass-ui/**`; L writes only `slides/**`. The ONLY shared write is the `proof-live-
verified-ledger.mjs` PORT (W-CARDINAL-INFRA authors the glass-ui canonical + the slides copy; L.W-GATE
in the new scheme / L.W4 in the old consumes the ported copy). No two-repo path collision exists.

---

## §2 — the L-SET reconcile (the dual-named specs + the three-way drift)

### §2.1 — the live state (three incompatible L schemes)

| source | scheme | ids | timestamp |
|---|---|---|---|
| `L.md §2` (NEWEST, user-directed 9-slide RE-STRUCTURE) | 15-id RE-STRUCTURE | `L.W0-REGROUND, L.W1-INTRO, L.W2-SUCCESS, L.W3-EX, L.W4-SOV, L.W5-XRAY, L.W6-PIPE, L.W7-CLOSE, L.W-GATE, L.W-MOB, L.W-CHR, L.W-ADOPT, L.W-DEPLOY, L.W-FC1, L.W-FC2` | 15:06 |
| `L/waves/` files + `L/PROGRESS.md` + `EXECUTION-DAG.md` §3 | 11-id OLD scheme | `L.W0-REGROUND, L.W1..L.W7, L.W-MOB, L.W-CHR, L.W-ADOPT` | 13:xx / 12:08 |
| `L-DRAFT.md` | 7-id seed | `L.W1..L.W7` | 10:49 |
| W-DAG gate clause (c) expected | 11-id OLD | same as `L/waves/` | (stale) |

`L.md` is the AUTHORITATIVE truth — it cites the user-directed `audit/SLIDES-RESTRUCTURE-BRIEF.md`
that "SUPERSEDES the old 5/6/7-rebuild scope." Per the no-backwards-compat precept, the old scheme is
a CLEAN BREAK, not an alias. So the reconcile target is the **15-id RE-STRUCTURE set**.

### §2.2 — the dual-named spec files (14 stale duplicates to DELETE)

`L/waves/` currently holds BOTH the old-slug set AND the partial new set:

| keep (canonical) | DELETE (stale dup) | note |
|---|---|---|
| (re-author L.W1-INTRO.md … L.W7-CLOSE.md) | `L.W1.md`, `L.W1-close-arc-rebuild.md`, `L.W2.md`, `L.W2-review-p0s.md`, `L.W3.md`, `L.W3-p1-redundancy-overclaim.md`, `L.W4.md`, `L.W4-gate-coverage-and-oqs.md`, `L.W5.md`, `L.W5-deploy.md`, `L.W6.md`, `L.W6-fc-honesty-pass.md`, `L.W7.md`, `L.W7-j-docs-unstrand.md` | the `-slug` files are the 10:xx FIRST-PASS; the bare `L.W<N>.md` are the 13:xx SECOND-PASS; BOTH predate the 9-slide re-scope |
| `L.W0-REGROUND.md` | — | KEEP (id stable across schemes; re-point its body to the 9-slide set) |
| `L.W-MOB.md`, `L.W-CHR.md`, `L.W-ADOPT.md` | — | KEEP (ids stable; bodies already re-scoped to the 9-slide manifest per their 13:xx headers) |
| (author L.W-GATE.md, L.W-DEPLOY.md, L.W-FC1.md, L.W-FC2.md) | — | NET-NEW in the 15-id scheme (the gate-wave split + the FC split) — currently UNAUTHORED |

**The reconcile is NOT this lane's WRITE** (this lane is AY-spec refine + the audit doc). It is the
WORK ITEM the W-DAG spec (clause c) + L.W0-REGROUND must EXECUTE. This audit hands them the exact
delete-list + the 15-id target. The W-DAG refine (below) re-points clause (c) onto the 15-id set and
adds a NO-DUAL-SLUG assertion so the stale files RED the gate until deleted.

### §2.3 — DRAFT reconcile

`L-DRAFT.md` carries only `L.W1..L.W7`. It must gain the 8 absent rows (`L.W0-REGROUND`,
`L.W-GATE/MOB/CHR/ADOPT/DEPLOY/FC1/FC2`) and the 7 renamed content ids (`L.W1-INTRO`…`L.W7-CLOSE`
replacing the bare `L.W1`…`L.W7`), OR — cleaner per greenfield-no-meta — the DRAFT is RETIRED with a
one-line "superseded by `L.md §2` (the 9-slide re-structure)" note and the gate's clause (c)
DROPS `L-DRAFT.md` from the three-way equality, reading `L.md == L/waves/` only. **Recommended:
RETIRE the DRAFT** (it is a seed artefact; the 9-slide re-structure is a clean break that makes the
7-id seed meaningless). The W-DAG refine adopts this.

---

## §3 — convergence-criteria re-validation (H-convergence STOP checklist vs the refined specs)

Re-walking the H-convergence §0 bar against the 43 authored AY specs + the L set:

| H-convergence row | binding artefact | owning wave (refined) | status |
|---|---|---|---|
| A1 warp lands focal | `proof:constellation-warp-live` + DELTA | W-CON2 (VERIFY) | OK — named |
| A2 ≥2 eggs PRM-inert | `proof:constellation-egg-live` + capture | W-CON2 | OK — gate authored in spec |
| A3 alpha both modes | `proof:constellation-tokens` + capture | W-CON1 | OK |
| A4 aurora OKLAB/atoms | existing gates | W-AUR2 (strike-as-done) | OK — doc reconcile |
| A5 painterly stunning | `proof:aurora-painterly-statistics` real-GPU | W-AUR-PAINTERLY | OK — born-RED named |
| A6 blob perfected | `proof:blob-*` + DELTA | W-BLOB2/3 | OK |
| A7 dock lockstep | `proof:dock-animation-live` + DELTA | W-DOCK1/2 | OK |
| A8 dock+slider; progress=page | gate + capture; L-side assert | W-DOCK3 (+ L.W-ADOPT re-home) | OK — E9 re-home explicit |
| A9 fourier abstracted | export OR booked-trigger | W-FF1/FF2 | OK |
| B1 `--ui-scale` render-grows | `proof:ui-scale` + π arm | W-SCALE1 | OK |
| B2 slider two-only | `proof:slider-two-only` | W-SLD1/2 | OK |
| C1 route prune actioned | `proof:no-orphan-demo-route` + triage | W-SB1 | OK |
| C4 READMEs cite research | README + RESEARCH.md | W-DOC1 (+ W-AUR1/BLOB1/FF1 produce RESEARCH.md) | OK — dependency explicit |
| E1 god-modules <500 | `proof:no-god-module` CI | W-GOD1/CSS1 | OK |
| E3 the DELTA-owed carriers flipped | `proof:live-verified-ledger` + DELTAs | W-DELTA0 (folded DRAFT-W0) | OK — named as a wave |
| E4 `proof:ay-final` + FINAL | the gate (authored) + FINAL.md | W-CLOSE1 | OK — clauses specified |
| E5 publish | npm provenance | W-PUB1 [HINGE 1] | OK |
| L1-L7 slides | per-L-wave | the 15-id L set | **PARTIAL — see below** |

**Convergence GAP surfaced by the re-validation:** H-convergence's Band-L rows (L1-L7) were written
against the OLD 7-slide bar (e.g. L1 "5/6/7 cohesive close arc", L3 "no occlusion all 7"). The
9-slide RE-STRUCTURE supersedes them: L1→the 9-slide story; L3→occlusion on the NEW complex slides
(examples/pipeline/success). **H-convergence §0 Band-L must be re-anchored on the 9-slide set** — it
is a stale-checklist twin of the L-set drift. This is a finding for L.W0-REGROUND (the slides
re-ground), NOT an AY-spec defect; flagged here so the convergence bar is not asserted against a
retired slide count. Every AY-side (A/B/C/D/E/F) convergence row HAS an owning wave with a real gate.

---

## §4 — AY §2 ↔ waves/ bijection confirmation

- **Forward (every §2 id has a spec):** 43/43. ✓
- **Reverse (every spec id in §2):** 43/43. ✓
- **One header-format risk:** `AY.W0-REGROUND.md` opens `# AY.W0 — REGROUND`, NOT `# AY.W0-REGROUND`.
  The W-DAG gate clause (a) asserts a `# AY.W<id>` header match where id=`W0-REGROUND`. A strict
  matcher false-REDs this. RESOLUTION (in the W-DAG refine): either normalize the header to
  `# AY.W0-REGROUND` OR make the gate's header-matcher key off the FILENAME id-slug (the canonical
  `AY.W<id>-<slug>.md` shape) with the H1 header as a secondary/lenient check. The refine adopts the
  filename-keyed matcher + a documented normalization.
- **AY.md §2 header drift:** the section header reads "~34 waves across 6 bands"; the real count is 43.
  Cosmetic (the gate parses rows, not the header), but the W-DAG refine corrects it to avoid a future
  reader mis-counting.

---

## §5 — handoff to the W-DAG refine (what this audit changes in the spec)

1. **Clause (c) L-set:** re-point from the stale 11-id set to the 15-id RE-STRUCTURE set; add a
   NO-DUAL-SLUG assertion (RED while both `L.W<N>.md` and `L.W<N>-<slug>.md` exist) + the 14-file
   delete-list reference; drop `L-DRAFT.md` from the three-way equality (RETIRE the DRAFT).
2. **Clause (a) header-matcher:** key off the filename id-slug, not a strict `# AY.W<id>` H1; document
   the `AY.W0-REGROUND.md` header normalization.
3. **§3 scope item 4 (slides specs to author):** update from "the 3 phantom `L.W-{ADOPT,MOB,CHR}`" to
   the new-scheme net-new set (`L.W-GATE, L.W-DEPLOY, L.W-FC1, L.W-FC2` + the 7 renamed content specs
   `L.W1-INTRO`…`L.W7-CLOSE`); note the 14 dual-slug files to DELETE.
4. **EXECUTION-DAG §3 Batch-6 L-table:** re-point its L-node rows onto the 15-id scheme (handed to the
   W-DAG.1 unit that keeps the DAG in lockstep with §2).
5. **§6 clause (e) DAG-path:** the spec's clause (e) reads `audit/EXECUTION-DAG.md` but the file is at
   the tranche root `docs/tranches/AY/EXECUTION-DAG.md` — fix the path (the File Bounds already use the
   correct root path; clause (e) is the stale one).
6. **AY.md §2 header count** "~34" → "43" (cosmetic, flagged for the orchestrator).
7. **Overlap matrix:** the W-DAG spec gains a pointer to THIS doc as the serial-sequencing input the
   DAG batches consume (the gates.mjs serial discipline + the W-GOD1/CSS1/COLOCATE serial sub-chain).

These are the refines applied to `AY.W-DAG.md` in this pass.
