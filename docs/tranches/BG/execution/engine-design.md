# engine-design.md — the `bg-bh-execute.wf.js` EXECUTION engine (DESIGN)

> The DESIGN of the BG+BH joint-5.0.0 execution workflow engine. The orchestrator authors the
> `.wf.js` from this; this doc is the spec, not the script. It MIRRORS `converge/bg-converge.wf.js`
> (the convergence engine) transposed convergence→EXECUTION: where convergence loops research→synth→
> prototype→critique→re-synth per WORKSTREAM to a 100% spec, execution loops build→device-free-gate→
> non-authoring-paint-judge per WAVE to a committed DONE on `tranche/BG`. Same primitives (`agent`,
> `parallel`, `args`, `log`, `phase`, `isolation:'worktree'`), same batches-of-3 rate-wall, same Opus
> fanout, same core-model-orchestrates discipline. The deliverable is no longer a spec — it is landed
> `src/` + a commit per wave + a captured dual-engine paint delta.

**Inputs (the DAG source-of-truth, read at boot):** `bg-build-map.md` (the BG wave roster — id · intent
· files · device-free gate · real-paint π · preconds · `[H]`/`[P]` class), `bh-interleave-map.md` (every
BH wave tagged `[C]`/`[WSn]`/`[WS12]` + the hard-collision/merge-checkpoint protocol), `consumer-
constellation.md` (the post-cut update cadence — out of the 48h build, named for the WS7-CUT handoff),
`real-paint-protocol.md` (the WAVE-DONE bar — dual-engine, non-authoring judge, on-disk captures),
`publish-and-cut.md` (the close-battery + tag, user-gated). The cursor is `EXECUTION-PROGRESS.md`.

---

## 1 · The wave DAG model

A WAVE NODE is derived ONCE from the two maps into an embedded registry (the `WORKSTREAMS`-embedded
pattern of the converge engine — nested-object args-passing is unreliable; the DAG is a const in the
script, the cursor selects into it):

```
WAVE = {
  id,                 // 'BG.W-ROUTE-TRANSITION' | 'BH.B2.1-swap'
  tranche,            // 'BG' | 'BH'
  ws,                 // 'WS1'..'WS12' | 'B0'..'B7'    (the workstream/band)
  seq,                // the build-order ordinal (Stage-0 first, WS12 last, B4f absolute-last)
  intent,             // one-line
  files,              // the write-set (from bg-build-map Files:)  — the file-disjoint key
  deviceFreeGate,     // 'proof:route-confounder' (+tags ['ci','release'])
  paintClass,         // 'H' (headless-only) | 'P' (paint-gated)
  paintTargets,       // [{ route:'/compositions/hero', harness:'?capture=…', modes:['light','dark'] }]
  preconds,           // [WAVE.id …]  — the hard unblock edges (cross-WS + intra-WS order)
  interleaveClass,    // 'C' | 'WS1'..'WS12'           (BH only; BG waves are intra-DAG-ordered)
  hotFiles,           // ['scripts/gates.mjs','package.json','src/index.ts','CLAUDE.md'] ∩ files
  status,             // PENDING | BUILDING | PAINT-PENDING | DONE | BLOCKED | FAIL
}
```

**The readiness predicate** (the only gate on what can enter a batch):

```
ready(w) =
     w.status === 'PENDING'
  && every(w.preconds, p => node(p).status === 'DONE')
  && interleaveReady(w)
```

**`interleaveReady`** enforces the BH interleave-protocol (bh-interleave-map §1):
- `class 'C'` → always ready (concurrent-safe, dodges BG's write-set).
- `class 'WSn'` → ready iff **every wave in BG workstream `WSn` is DONE** (`allDone('WSn')`) — a BH
  `[WS2]` wave (B2.5 dock-leaf-verify) blocks until the whole WS2 dock band lands.
- `class 'WS12'` → ready iff `allDone('WS12')` (full BG close, NOT WS7 — the Pass-1 error).
- the **two named intra-WS12 edges** are hard preconds, not class: `B5c → B4f`, `{B2.6,B4e} → B4f`,
  `B4b-content → B4f`, `B2.1-mech → B2.1-swap`, `B2.2 → B7`, `B5b → B5c`.
- `B4f` (CLAUDE.md hard-delete) is the **ABSOLUTE-LAST** sentinel — its preconds are
  `[allDone('WS12'), B5c, B2.6, B4e, B4b-content]` AND the gate `rg -l 'CLAUDE\.md' scripts/proof-*.mjs
  == 0`; the engine refuses to schedule it until the readFileSync-removal precondition holds.

**The batch composer** — from the ready set, take ≤3 that are **file-disjoint AND hot-file-disjoint**
(no two in a batch write the same `files` member, and at most one touches each `hotFiles` member; the
hot files are orchestrator-owned anyway, so a hot-file wave runs its src-edits in a worktree and the
hot-file edit serializes through the orchestrator). The composer prefers lower `seq` (build-order) and
critical-path waves (the WS1→…→CUT chain of bg-build-map §"CRITICAL PATH") first.

---

## 2 · The wave-state machine + the EXECUTION-PROGRESS.md cursor

The cursor `EXECUTION-PROGRESS.md` is the DURABLE ledger (the BC `EXECUTION-PROGRESS.md` idiom) — every
wave a row, grouped by Stage/WS/band, with the live status. It is the resume anchor: on ANY revival
(cron, compaction, rate-limit recovery) the engine READS IT FIRST and reconstructs the DAG status from
it (not from in-memory state). The transitions:

```
PENDING ──ready+batched──▶ BUILDING ──build-agent GREENs device-free gate, orchestrator integrates──▶
  ├─ paintClass 'H' ──────────────────────────────────────────────────────────────────▶ DONE (commit)
  └─ paintClass 'P' ──▶ PAINT-PENDING ──non-authoring judge PASS, captures on disk──────▶ DONE (commit)

  any step FAIL ──▶ FAIL ──fix-agent loop (≤N)──▶ BUILDING   |  N exhausted ──▶ BLOCKED (escalate)
  precond regressed ──▶ BLOCKED
```

**Row shape** (one per wave; the legend block heads the file):

```
| seq | wave | tranche/ws | class | status | gate | paint | commit | capture |
| 12  | BG.W-FIELD-AURORA | BG/WS1 | P | DONE | proof:no-paper-field ✓ | PASS(chrome+safari,L+D) | a1b2c3 | …/W-FIELD-AURORA-DELTA.md |
```

A wave is written PENDING at boot, flipped at each transition (the orchestrator rewrites the row), and
the row carries the `commit` SHA + the on-disk capture path on DONE — so the cursor IS the audit trail.
**Commit-per-wave is the discipline:** one commit per DONE wave (message = `BG <ws> (<wave>): <intent>
— gate <proof:*> GREEN + paint <verdict>; capture <path>`), so a session-limit wall leaves a clean
per-wave history and the next session resumes at the first non-DONE row.

---

## 3 · The orchestration loop

Mirrors the converge `while` loop, transposed to a wave-frontier sweep:

```js
const RESUME = args?.resumeFromRunId        // re-hydrates the agent-result cache (completed agents
                                            //   return cached results — no re-spawn on revival)
const WAVE_SELECT = args?.waveSelect || cursorFrontier()  // pin a starting seq/band (session resume);
                                            //   default = first non-DONE row of EXECUTION-PROGRESS.md
const MAX_FIX = args?.maxFix || 2

hydrateCursor()                             // read EXECUTION-PROGRESS.md → set every node.status
verifySiblingsIntact()                      // the park-not-restored tripwire, BEFORE any work
seedStage0IfFresh()                         // the born-RED ground-freeze (§5) on a FRESH run only

while (anyPending() && !rateLimited()) {
  const batch = composeBatch(readySet(), { from: WAVE_SELECT, size: 3 })   // file-disjoint, ≤3
  if (!batch.length) { if (blockedOnly()) escalate(); break }

  // ── BUILD (batches of 3, worktree-isolated where the wave mutates src) ──
  const builds = await parallel(batch.map(w => () =>
    agent(BUILD_PROMPT(w), {
      model: 'opus', phase: 'Build', label: `${w.id}/build`,
      schema: BUILD_SCHEMA,
      ...(mutatesSrc(w) ? { isolation: 'worktree' } : {}),   // own .claude/worktrees/<runId>
    }).then(r => ({ w, ...r })).catch(() => ({ w, error: true }))
  ))

  // ── INTEGRATE (orchestrator-only — agents are read-only-git; the index is the orchestrator's) ──
  for (const b of builds) {
    if (b.error || !b.buildPassed) { markFail(b.w, 'build'); continue }
    harvestWorktree(b)                        // git -C <worktree> diff HEAD (+untracked) → patch
    applyToMainTree(b.patch)                  // tranche/BG working tree; file-disjoint ⇒ conflict-free
    applyGatesRegistration(b.gatesRegistration)   // the hot-file edits: gates.mjs/package.json
    applySharedFileRequests(b.sharedFileRequests) // src/index.ts/CLAUDE.md append — serialized here
    const green = run(`npm run ${b.deviceFreeGate.script}`)   // RE-CONFIRM GREEN post-integration
    if (!green) { markFail(b.w, 'gate'); revert(b); continue }
    set(b.w, b.w.paintClass === 'H' ? 'DONE-HEADLESS' : 'PAINT-PENDING')
  }

  // ── PAINT JUDGE (non-authoring — a FRESH agent, fed ONLY the route + harness, never the builder's claim) ──
  const paintWaves = builds.filter(b => status(b.w) === 'PAINT-PENDING')
  const verdicts = await parallel(paintWaves.map(b => () =>
    agent(PAINT_PROMPT(b.w), {                // PAINT_PROMPT carries NO build output — the fence
      model: 'opus', phase: 'PaintJudge', label: `${b.w.id}/judge`,
      schema: PAINT_SCHEMA,
    }).then(v => ({ w: b.w, ...v })).catch(() => ({ w: b.w, verdict: 'FAIL', error: true }))
  ))

  // ── CLOSE or FIX ──
  for (const v of verdicts) {
    if (v.verdict === 'PASS' && v.capturePathsResolve) commitWave(v.w)        // → DONE
    else fixLoop(v.w, v, MAX_FIX)             // fix-agent-per-band, fed defectLocalization+mustFix
  }
  for (const b of builds) if (status(b.w) === 'DONE-HEADLESS') commitWave(b.w) // H waves close here

  writeCursor()                               // rewrite EXECUTION-PROGRESS.md rows; heartbeat
}
return { built: doneCount(), blocked: blockedList(), frontier: cursorFrontier() }
```

`commitWave(w)` = stage the integrated edit + the gate registration + the capture-DELTA.md, commit
with the per-wave message, flip the row to DONE with the SHA + capture path. `fixLoop` spawns a
**fix-agent** (NOT the original builder — the BC fix-agent-per-band reality) fed the judge's
`defectLocalization` + `mustFix`, re-enters at BUILDING; after `MAX_FIX` exhausted → BLOCKED + escalate
(a TaskStop-class human gate, not a silent skip).

---

## 4 · The agent prompt shapes

The shared `ctxHdr` (the converge `ctxHdr` analogue) prefixes every agent — the wave's row verbatim
from `bg-build-map.md` + the UNIVERSAL/LAWS slice + the served-branch state:

```
WAVE ${w.id} — ${w.intent}   [${w.tranche}/${w.ws}, class ${w.paintClass}]
FILES: ${w.files.join(', ')}
DEVICE-FREE GATE: ${w.deviceFreeGate}   (born-RED on HEAD's broken paint → GREEN on the fix + a self-test bite)
REAL-PAINT π: ${w.paintTargets…}   (the WAVE-DONE bar — see real-paint-protocol.md)
PRECONDS (all DONE): ${w.preconds.join(', ')}
BRANCH: tranche/BG (the integrated frontier — your worktree is off it; prior DONE waves are landed).
${UNIVERSAL}   ${LAWS}   ${FENCE}
```

**BUILD agent** (`isolation:'worktree'` when `mutatesSrc`): implement the wave per its `Files`/`Gate`/
`π` row from first principles (KISS/DRY/DEFT, no legacy, gestalt-not-patch). Author or extend the
`proof:*` gate **born-RED on HEAD → GREEN on your edit** with a self-test bite. Run `npx vue-tsc
--noEmit` (+ `npm run build` if build-relevant) IN THE WORKTREE to prove it compiles. Do NOT touch the
hot files (`scripts/gates.mjs`, `package.json`, `src/index.ts`, `CLAUDE.md`) — emit those as structured
`gatesRegistration`/`sharedFileRequests` for the orchestrator. Do NOT commit/stage/stash (read-only git;
the orchestrator owns the index — the K-W0 hardened agent-git clause). Return the BUILD_SCHEMA. **You do
NOT judge your own paint** (the non-authoring fence) — you may note expected paint targets, but the
verdict is a separate agent's.

**PAINT JUDGE agent** (NON-authoring — a fresh agent, fed NEITHER the build output NOR the self-estimate):
serve the built `tranche/BG` dist (`npm run demo:dist` / `:5199`), navigate the wave's `paintTargets`,
capture **real Chrome.app AND real Safari.app/WebKit 26, BOTH modes (light+dark), on a real GPU** (NOT
headless SwiftShader), save the PNGs to `docs/tranches/BG/audit/visual/<WAVE>-DELTA.md` + the per-mode
captures on disk, READ the pixels against the real-paint-protocol bar + the `proof:ba-gestalt` per-
surface verdict criteria, and return an HONEST `verdict` (PASS only when every surface in both modes
reads correct AND every declared capture path RESOLVES ON DISK — the close-class anti-evasion floor), a
`gestaltCritique`, a `defectLocalization` (region → defect), and `mustFix[]`. **C-SAFARI is the ★★★
chronic** — the Metal-Safari.app capture is the single likeliest item to miss a 4th time; it is
non-skippable, the WS8 `BG.W-GLASS-*` + every glass/goo/liquid wave carries it.

**FIX agent** (on a FAIL verdict; not the original builder): fed the wave row + the judge's
`defectLocalization`/`mustFix` + the failing capture path, re-implement the slice at the ROOT (no
workaround), return BUILD_SCHEMA → re-enters INTEGRATE.

---

## 5 · The schemas

```js
const BUILD_SCHEMA = { type:'object', additionalProperties:false,
  required:['wave','filesWritten','buildPassed','deviceFreeProof','convergenceNote'],
  properties:{
    wave:{type:'string'},
    filesWritten:{type:'array',items:{type:'string'}},
    buildPassed:{type:'boolean', description:'vue-tsc --noEmit (+ build if relevant) passed in the worktree'},
    deviceFreeProof:{ type:'object', additionalProperties:false, required:['gate','bornRed','green','selfTest'],
      properties:{ gate:{type:'string'}, bornRed:{type:'boolean', description:'RED on HEAD pre-fix (the bite proven)'},
        green:{type:'boolean'}, selfTest:{type:'string', description:'the planted-defect bite that REDs'} } },
    gatesRegistration:{ type:'array', items:{ type:'object', additionalProperties:false, required:['script','tags'],
      properties:{ script:{type:'string'}, tags:{type:'array',items:{type:'string', enum:['local','ci','release']}} } } },
    sharedFileRequests:{type:'array',items:{type:'object', additionalProperties:false, required:['file','edit'],
      properties:{ file:{type:'string'}, edit:{type:'string', description:'the exact append/replace for the hot file'} } }},
    patch:{type:'string', description:'the worktree unified diff (orchestrator applies) — OR empty if doc-only'},
    paintTargets:{type:'array',items:{type:'string', description:'route + ?capture harness the judge must shoot'}},
    convergenceNote:{type:'string', description:'what landed, the gestalt, the surprises — the fix fuel'} } }

const PAINT_SCHEMA = { type:'object', additionalProperties:false,
  required:['wave','verdict','capturePathsResolve','captures','gestaltCritique'],
  properties:{
    wave:{type:'string'},
    verdict:{type:'string', enum:['PASS','FAIL']},
    capturePathsResolve:{type:'boolean', description:'every declared PNG EXISTS on disk (anti-evasion floor)'},
    captures:{type:'array',items:{type:'object', additionalProperties:false, required:['engine','mode','path'],
      properties:{ engine:{type:'string', enum:['chrome','safari']}, mode:{type:'string', enum:['light','dark']},
        path:{type:'string'}, pixelDigest:{type:'string', description:'the per-region digest for SHIP-ATTESTATION'} } }},
    gestaltCritique:{type:'string'},
    defectLocalization:{type:'array',items:{type:'string', description:'region → defect (the fix-agent map)'}},
    mustFix:{type:'array',items:{type:'string'}} } }
// FIX agent reuses BUILD_SCHEMA.
```

The `BUILD_SCHEMA` deliberately splits the SRC edit (`patch`, applied by the orchestrator) from the HOT-
file edits (`gatesRegistration`/`sharedFileRequests`, serialized by the orchestrator) — the
worktree-isolation + orchestrator-integration protocol (§6).

---

## 6 · Worktree isolation + orchestrator integration

The hard-collision census (bh-interleave-map §2) is mechanized:

1. **BUILD agents mutate ONLY their own worktree** (`.claude/worktrees/<runId>`, off `tranche/BG` — NEVER
   `/tmp`, NEVER a sibling tree). File-disjoint batching means two parallel worktree patches never touch
   the same file. The agent does NOT commit (read-only git).
2. **The orchestrator harvests** each worktree's working-tree diff (`git -C <worktree> diff HEAD` + the
   untracked set) and applies it to the main `tranche/BG` tree. Conflict-free by the file-disjoint
   invariant; a collision means the batch composer erred → BLOCKED + recompose.
3. **The four hot files are orchestrator-OWNED** — `scripts/gates.mjs`, `package.json`, `src/index.ts`,
   `CLAUDE.md` (the bh-interleave §2 hard-collision set). Agents never write them; the orchestrator
   applies `gatesRegistration` (the proof-script row + tags) + `sharedFileRequests` (the index/CLAUDE
   append) serially, after the src patch.
4. **The two FILE-granularity grazes** (bh-interleave §2): `vite.library.ts` (B1-W1 × WS6 siri subpaths)
   and `ui/carousel/CarouselContent.vue` (B2.4a × WS10 de-shadcn) — the engine forces them into separate
   batches and lands the BG owner FIRST, rebasing the BH edit onto it (a file-checkpoint, recorded in the
   cursor as a one-line sync note).
5. **Commit-per-wave** — the orchestrator commits the integrated wave (src patch + gate registration +
   capture DELTA) as ONE commit; the worktree is discarded.

---

## 7 · The gate seam — WAVE-DONE

A wave marks **DONE** iff BOTH pass (the disease-cure, FINAL §8):
- **device-free proof GREEN** — the wave's `proof:*` born-RED→GREEN on the integrated main tree, re-run
  by the orchestrator post-integration (not trusting the worktree's self-report), with its self-test bite
  and `--run <tag>` staying green.
- **real-paint π** (paint-gated waves only) — the NON-AUTHORING judge's `verdict === 'PASS'` AND
  `capturePathsResolve === true`, dual-engine, both modes, on disk. Headless-only (`[H]`) waves skip the
  judge (device-free GREEN is the close, per the bg-build-map `[H]` legend).

The two are SEQUENCED — device-free FIRST (cheap, no served demo), paint judge SECOND (expensive, real
GPU). A wave that source-greens but paints broken is the disease the engine exists to kill — it does NOT
advance to DONE; it loops to the fix-agent. `proof:ba-gestalt`'s roster row for the surface flips GREEN
only on the judge's on-disk warm-correct capture (the BC anti-disease law: born-RED until a wave paints
+ re-captures).

---

## 8 · Resumability + the 48h cron idempotency guard

The 48h horizon WILL hit ≥1 session-limit/compaction wall — the engine is built to resume mid-build:

- **`resumeFromRunId`** (the workflow-harness agent-result cache) — on revival the engine re-invokes with
  `args.resumeFromRunId = <prior run>`; completed BUILD/PAINT agents return CACHED results (no re-spawn,
  no re-build), so a wall mid-batch re-hydrates without re-doing landed work.
- **The cursor IS the durable state** — `EXECUTION-PROGRESS.md` (not in-memory) is the source of truth;
  `hydrateCursor()` reconstructs every `node.status` from the rows. `WAVE_SELECT`/`cursorFrontier()` (the
  `WS_SELECT` analogue) picks the resume frontier = the first non-DONE row, so a revival continues exactly
  where the wall hit. The committed per-wave history (§2) is the second anchor — `git log` ≡ the DONE set.
- **The cron** (the BC `f3da0715` idiom — armed by the orchestrator via `CronCreate`, NOT by this engine;
  e.g. `13,38 * * * *`, durable over the 48h) re-invokes the workflow each tick. The engine itself is
  idempotent under it.
- **The transcript-activity idempotency guard** — before composing a batch the engine checks (a) the
  `EXECUTION-PROGRESS.md` heartbeat timestamp + (b) whether a row sits BUILDING/PAINT-PENDING with a
  RECENT transcript heartbeat (an in-flight agent). If a build is live, the cron tick **no-ops** (refuses
  to double-spawn the same wave); a stale heartbeat (> the agent-timeout horizon) is treated as a crashed
  build → reset that row PENDING and recompose. This is the BC cron+transcript-guard discipline: the cron
  guarantees forward progress across walls without ever running two builders on one wave.

`verifySiblingsIntact()` runs on every boot AND before/after the WS7 close-battery — the park-not-
restored tripwire (a sibling in `/tmp/sibling-park` REDs immediately).

---

## 9 · STAGE-0 ground-freeze seeding

`seedStage0IfFresh()` runs ONLY on a fresh (no-cursor) boot. It seeds the cursor with the WS7 Band-0/
Band-2 machine as `seq 0` (bg-build-map STAGE 0) — **before any WS1/WS3 integration**:
`BG.W-PAINT-IS-THE-GATE`, `BG.W-GESTALT-ROSTER-RE-POINT`, `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION`, +
the no-silent-drop ledgers (`BG.W-DEFERRED-LEDGER`/`BE-BF-LEDGER`/`DISPOSITION-RESTAMP`). The born-RED
captures these take are the 4.2.0 Metal reproduction — taken on the UN-INTEGRATED tree, by a non-
authoring agent, so the ground-freeze anchors on real broken paint (FINAL §L.9). Only after Stage-0 is
DONE does the readiness predicate release WS1 `BG.W-ROUTE-TRANSITION` (the linchpin). The tag-blocker
(`proof:ship-attestation` `["ci","release"]`) is live from Stage-0, so no wave can fire the cut early.

---

## 10 · The fence (what the engine does NOT do)

- **Foreign-tree fence ABSOLUTE** — edits ONLY glass-ui. The consumer-constellation update cadence
  (`consumer-constellation.md`) is OUT of the 48h build; it runs POST-CUT as by-name asks (the sibling
  owns its edit). `seedStage0` reads siblings read-only (the registry-probe), never writes them.
- **NEVER `/tmp`, NEVER move a sibling** — worktrees are `.claude/worktrees/`; the close-battery's
  siblings-absent emulation is a FRESH in-repo worktree, never a sibling park.
- **The CUT is user-gated** — `BG.W-CUT` (the tag-fire, the LAST core wave) does NOT auto-fire; the engine
  drives every wave to DONE, runs `--run full` siblings-absent (publish-and-cut.md), and HALTS at the
  human gate before `git push --tags`. The 4.3.0/GU-1 sequencing (parked 4.3.0 publishes first; GU-1 rides
  4.4.0; BG/BH join at 5.0.0) is publish-and-cut.md's, honored at the handoff, not in the build loop.
- **Batches of 3, Opus fanout, core orchestrates** — the rate-wall floor; the orchestrator (core model)
  owns integration, hot-file registration, the paint-judge dispatch, and the commit. No source-green
  close — every paint-gated wave closes born-RED→GREEN with a captured dual-engine delta.

---

**3-line summary:**
`bg-bh-execute.wf.js` mirrors `bg-converge.wf.js` transposed convergence→EXECUTION — a wave-frontier sweep over the embedded BG+BH DAG (derived from bg-build-map + bh-interleave-map), batches-of-3 BUILD agents in isolated `.claude/worktrees/`, the orchestrator harvesting each patch into the main `tranche/BG` tree + owning the four hot files (gates.mjs/package.json/src/index.ts/CLAUDE.md), committing one-per-wave.
WAVE-DONE = device-free `proof:*` GREEN (re-run post-integration) THEN a NON-AUTHORING paint judge's dual-engine both-modes on-disk PASS (`[H]` waves skip the judge) — the headless-green/visually-broken disease-cure; the readiness predicate enforces the interleave protocol (`[C]` now, `[WSn]` after `allDone('WSn')`, `[WS12]` after WS12, B4f absolute-last after B5c+the readFileSync-removal), Stage-0 WS7 ground-freeze seeds first and blocks the tag.
Resumability = `resumeFromRunId` agent-cache + the durable `EXECUTION-PROGRESS.md` cursor (PENDING/BUILDING/PAINT-PENDING/DONE/BLOCKED, the `WAVE_SELECT` frontier) + commit-per-wave history + the BC-style cron with a transcript-activity guard that no-ops on an in-flight build — driving the 48h horizon to the user-gated `BG.W-CUT`.
