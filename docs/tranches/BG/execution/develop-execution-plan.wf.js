export const meta = {
  name: 'bg-bh-develop-execution-plan',
  description: 'Develop the joint BG+BH 5.0.0 interleaved 48h execution plan: build-map, interleave-map, consumer-constellation, real-paint protocol, publish/cut, engine design → synthesized master plan + cursor + task breakdown',
  phases: [
    { title: 'Map', detail: 'BG build-order · BH interleave · consumer census · real-paint · publish/cut · engine design (batches of 3)' },
    { title: 'Synthesize', detail: 'agglomerate into the master EXECUTION-PLAN + the PROGRESS cursor + the task breakdown' },
  ],
}

const FENCE = `CONSTRAINTS (ABSOLUTE): foreign-tree fence — you may EDIT only files under /Users/mkbabb/Programming/glass-ui. You may READ sibling repos under ~/Programming IN PLACE, READ-ONLY (grep/cat/ls/Read only). NEVER mv/rm/move/write/touch ANYTHING outside glass-ui. NEVER place any file in /tmp. This is tranche-DEV — you author PLAN docs, you do NOT implement any wave, you do NOT edit src/demo/scripts of glass-ui beyond the named doc file. House writing style: terse, technical, em-dashes-without-spaces, no grandiloquence.`

const REPO = '/Users/mkbabb/Programming/glass-ui'

// ---- PHASE 1: six mapping agents, each authoring ONE doc under docs/tranches/BG/execution/ ----

phase('Map')

const mapThunks = [
  () => agent(`Author \`docs/tranches/BG/execution/bg-build-map.md\` — the BG wave-by-wave BUILD ORDER.
READ: \`${REPO}/docs/tranches/BG/FINAL.md\` (the lock) + every \`${REPO}/docs/tranches/BG/converge/BG-WS*/SPEC-pass*-converged.md\` (highest-pass per dir).
PRODUCE a build-ordered roster: the 12 workstreams in build order WS1→WS3→WS2→WS5→WS6→WS4→WS7 (core) → WS8→WS9→WS10→WS11 (deep-morphism) → WS12 (coherence capstone LAST). For EACH wave: (a) its id + one-line intent, (b) the files it writes, (c) its device-free machine-lock gate (proof:*), (d) its real-paint π gate if any (tests-visual/*.spec.ts + the proof:ba-gestalt verdict band), (e) its cross-WS preconditions (what must land first — e.g. WS1 shell/field gates several WS8/WS11 items; WS3 spine gates WS8/WS12; WS4-W0 de-shadcn-sweep precedes WS10 ci arms). Mark each wave HEADLESS-ONLY vs PAINT-GATED. Identify the CRITICAL PATH (the longest dependency chain) and the WS1/WS3/WS4 gating fan-outs. Note WS7's BG.W-PAINT-IS-THE-GATE / ship-discipline-live-precondition must build FIRST and block the tag. Return a 3-line summary (wave count, critical-path length, the single most-gating wave).
${FENCE}`, { label: 'map:bg-build', phase: 'Map' }),

  () => agent(`Author \`docs/tranches/BG/execution/bh-interleave-map.md\` — the BH bands mapped onto the BG timeline.
READ: \`${REPO}/docs/tranches/BH/PLAN.md\` (esp. §3 the interleave protocol, §4 the band/wave table, §7 the 5.0.0 break) + \`${REPO}/docs/tranches/BH/coordination/asks-and-consumes.md\`.
PRODUCE: every BH wave (B0..B7, ~30 waves) tagged by its BG-interleave class — [C] concurrent-safe (run now), [WSn] after BG.WSn, [WS12] after full BG close. The HARD-COLLISION files (BG+BH both write: src/index.ts, scripts/gates.mjs, src/components/ui/**, CLAUDE.md, the dock/viz/glass god-modules) + the merge-checkpoint protocol. The intra-post-WS12 sequencing edges (B5c→B4f; {B2.6,B4e}→B4f). The B4f CLAUDE.md-delete-ABSOLUTE-LAST rule (after the ~16 reader-gates re-home via B5c). The 5.0.0 export reshape (subpaths-delete + /api-fold + the regen). Return a 3-line summary (concurrent-now count, after-WS12 count, the absolute-last act).
${FENCE}`, { label: 'map:bh-interleave', phase: 'Map' }),

  () => agent(`Author \`docs/tranches/BG/execution/consumer-constellation.md\` — the per-consumer 5.0.0 UPDATE plan.
SCOUT (read-only, in place): \`grep -rl '@mkbabb/glass-ui' ~/Programming/*/package.json\`; the known constellation is bbnf-buddy(^3.9.0 STALE), slides(3.13.0), slides-K(^3.2.0 STALE), speedtest(^4.0.1), keyframes.js(~4.0.0), value.js(file: dev), and the ATLAS repo (pins 4.1.0 — find it: try ~/Programming/atlas, ~/Programming/sci-report, or grep for it; the GU-3/GU-1 asks are atlas's) + muster (BH B7 names it — find it). For EACH live consumer repo: grep its src for \`@mkbabb/glass-ui/\` import sites (subpaths + symbols), bare \`var(--ring)\` sites (the GU-3 ASK-B break), and any \`/api\` import (the BH 5.0.0 break).
PRODUCE a table per consumer: repo · pinned version · current gap to 5.0.0 · subpaths+symbols imported · the 5.0.0 break impact (the /api drop, the --ring rename, any subpath move) · the GU-1/GU-3 asks owed it · the fallback-first + pinned-commit UPDATE plan · the by-name ask id. Reconcile against the BH B7 roster (muster→/aurora, speedtest→/timeline) + the GU-3 atlas --ring re-point (the 3rd consumer migration) + BG-WS5's slides viz-subpath migration. Flag the STALE consumers (bbnf-buddy/slides-K pre-4.0.0 — a multi-major jump). Return a 3-line summary (live-consumer count, the total break surface, the stalest consumer).
${FENCE}`, { label: 'map:consumers', phase: 'Map' }),
]

const mapThunks2 = [
  () => agent(`Author \`docs/tranches/BG/execution/real-paint-protocol.md\` — the binding real-paint gate for the build.
READ: \`${REPO}/docs/tranches/BG/FINAL.md\` (the real-paint frontier section) + the CLAUDE.md sections on proof:ba-gestalt (the gestalt acceptance gate + GESTALT-GATE2), the visual-π runner (tests-visual + pi-runner-manifest), reflect-capture-verify, and the headless-green/visually-broken cardinal lesson.
PRODUCE the WAVE-DONE bar + the capture protocol: (1) the DUAL-ENGINE requirement — real Chrome.app AND real Safari.app/WebKit 26, BOTH modes (light+dark), on a real GPU (not headless SwiftShader); (2) the NON-AUTHORING-JUDGE discipline — the agent that builds a wave NEVER judges its own paint; a fresh agent captures + verdicts; (3) the per-band π capture cadence + the proof:ba-gestalt verdict-flip (born-RED → operative-PASS only when every surface's whole-page capture in both modes verdicts PASS AND every declared capture path resolves on disk); (4) WS8's C-SAFARI Metal-Safari.app capture as the ★★★ 3-wave chronic (schedule non-skippable, likeliest to miss a 4th time); (5) the WAVE-DONE definition: device-free proof GREEN + real-paint π captured-on-disk + non-authoring gestalt verdict PASS. Specify the capture harness (the ?capture= route + screencapture window-mode + the engine-badge provenance + safari-fidelity-delta). Return a 3-line summary.
${FENCE}`, { label: 'map:real-paint', phase: 'Map' }),

  () => agent(`Author \`docs/tranches/BG/execution/publish-and-cut.md\` — the joint 5.0.0 cut + publish + consumer-update cadence.
READ: the CLAUDE.md §Build "Gate hygiene" (proof:full / --run full siblings-absent / proof:close-battery-parity / verify-siblings-intact / proof:lineage-probe / inv-11 no-out-of-band-lineage) + \`${REPO}/docs/tranches/BH/PLAN.md\` §7 + §2-#4 (joint 5.0.0) + the memory lesson "the close must run --run release not just --run local" (4.0.0) + the GU-1 4.4.0 + parked 4.3.0 sequencing from \`${REPO}/docs/tranches/BG/coordination/GU-1-glass-key-fill.md\` and GU-3-TRIAGE.md.
PRODUCE the cut protocol: (1) the PRE-TAG close-battery — \`gates.mjs --run full\` (the deduped union) in a siblings-absent clean checkout (an in-repo .claude/worktree, NEVER /tmp, NEVER moving siblings) + verify-siblings-intact before+after; (2) the version bump 4.2.0→5.0.0 + the MIGRATION.md reshape (the by-name-ask map) + CHANGELOG; (3) the gated provenance publish (release.sh / release.yml — push the v5.0.0 tag, CI does the provenance publish); (4) THEN the consumer-update cadence — per consumer: bump to 5.0.0, fallback-first, pin the exact landing COMMIT (not a version), the by-name ask green-handshake, the consume-and-delete; (5) sequence the parked 4.3.0 (publish BEFORE 5.0.0? or fold? — recommend) + GU-1 4.4.0 relative to the 5.0.0 major. Return a 3-line summary + the recommended 4.3.0-vs-5.0.0 ordering.
${FENCE}`, { label: 'map:publish-cut', phase: 'Map' }),

  () => agent(`Author \`docs/tranches/BG/execution/engine-design.md\` — the DESIGN of the bg-bh-execute.wf.js EXECUTION workflow engine (do NOT author the .wf.js — design it; the orchestrator authors the script).
READ: \`${REPO}/docs/tranches/BG/converge/bg-converge.wf.js\` (the convergence engine — mirror its pattern for EXECUTION) + the memory of the BC execution (the EXECUTION-PROGRESS.md cursor idiom, the cron + transcript-guard idempotency, the orchestrator-owns-live-π cadence, fix-agent-per-band).
PRODUCE the engine design for the 48h build: (1) the wave-runner — takes the interleaved BG+BH wave DAG (from bg-build-map + bh-interleave-map), runs each ready wave as a BUILD agent (isolation:'worktree' where it mutates src; the main tree integrated by the orchestrator), batches of 3, dependency-ordered; (2) the per-wave GATE seam — device-free proof THEN the real-paint π by a NON-AUTHORING judge agent (the real-paint-protocol bar); a wave only marks DONE when both pass; (3) RESUMABILITY — resumeFromRunId caching + a WAVE_SELECT/cursor selector (like WS_SELECT) so a session-limit wall resumes mid-build; (4) the EXECUTION-PROGRESS.md cursor as the wave-state ledger (PENDING/BUILDING/PAINT-PENDING/DONE per wave) + the commit-per-wave discipline; (5) the interleave-protocol enforcement (a BH [WSn] wave is BLOCKED until BG.WSn DONE; B4f blocked until B5c+WS12); (6) the cron + transcript-activity idempotency guard for the 48h horizon. Specify the agent prompt shape, the schema, and the orchestration loop. Return a 3-line summary.
${FENCE}`, { label: 'map:engine', phase: 'Map' }),
]

log('Phase 1 batch A (3 mapping agents)')
const a = await parallel(mapThunks)
log('Phase 1 batch B (3 mapping agents)')
const b = await parallel(mapThunks2)
const maps = [...a, ...b].filter(Boolean)
log(`Maps authored: ${maps.length}/6`)

// ---- PHASE 2: synthesis — the master plan + cursor + task breakdown ----

phase('Synthesize')

const synth = await agent(`Author the JOINT BG+BH 5.0.0 master execution plan. The 6 component docs are ALREADY authored under \`${REPO}/docs/tranches/BG/execution/\`: bg-build-map.md, bh-interleave-map.md, consumer-constellation.md, real-paint-protocol.md, publish-and-cut.md, engine-design.md. READ ALL SIX.

AUTHOR TWO files:
1. \`${REPO}/docs/tranches/BG/execution/EXECUTION-PLAN.md\` — THE MASTER. Tie the six together into ONE coherent 48-hour build plan: (a) the executive summary (two monoliths, joint 5.0.0, the real-paint gate, the consumer constellation); (b) THE INTERLEAVED WAVE SCHEDULE — the single merged timeline: the BG build order (WS1→…→WS12) with the BH waves slotted in at their interleave points ([C] now, [WSn] after the BG wave, [WS12] last, B4f absolute-last), as an ordered table (seq · wave · tranche · depends-on · gate · paint?); (c) the real-paint WAVE-DONE bar (cite real-paint-protocol.md); (d) the joint 5.0.0 cut + the consumer-update cadence (cite publish-and-cut.md + consumer-constellation.md); (e) the constraints (foreign-tree fence, never /tmp, batches of 3, real-paint is the gate, 4.3.0/GU-1 sequencing); (f) a cross-reference index to the 6 component docs.
2. \`${REPO}/docs/tranches/BG/execution/EXECUTION-PROGRESS.md\` — the CURSOR/wave-state ledger: every wave (BG ~110 + BH ~30) listed in the interleaved build order with a status column (all PENDING), grouped by phase, ready for the execution engine to advance. Include the legend (PENDING/BUILDING/PAINT-PENDING/DONE/BLOCKED) + the resume protocol pointer.

THEN RETURN (do not author into a file — return to the orchestrator): (i) the total wave count (BG + BH), (ii) the live-consumer count + the stalest, (iii) the engine-design summary in 5-8 lines (so the orchestrator authors bg-bh-execute.wf.js), (iv) a PROPOSED TOP-LEVEL TASK BREAKDOWN — the 8-14 phase/milestone tasks the orchestrator should TaskCreate (e.g. "build WS1 core+gate+paint", "land BH concurrent-safe bands B0/B1/B2.0", …, "joint 5.0.0 close-battery + tag", "consumer constellation update"), each a one-line subject, (v) the single biggest execution risk.
${FENCE}`, { label: 'synth:master-plan', phase: 'Synthesize' })

return { ok: true, synth }
