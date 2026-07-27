export const meta = {
  name: 'structure-settlement',
  description: 'Settle the module/file/directory explosion in library and demo: colocation, goldilocks granularity, module-name stripping, test displacement',
  phases: [
    { title: 'Survey', detail: 'measure the actual directory shape' },
    { title: 'Challenge', detail: 'three benches per zone' },
    { title: 'Adjudicate', detail: 'jury per zone' },
    { title: 'Fold', detail: 'the terminal directory settlement' },
  ],
}

const M = 'opus'
const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = `${REPO}/docs/tranches/BJ/addenda/2026-07-24-refinement`
const SCRATCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad'

const ZONES = [
  { id: 'src-components', root: 'src/components', why: '62 component directories, 52,932 non-blank lines, 34% comment' },
  { id: 'src-composables', root: 'src/composables', why: '102 files, 14,876 lines — the shared layer, and the place colocation leaks INTO' },
  { id: 'src-styles', root: 'src/styles', why: '76 files, 11,953 lines, 62.2% comment; tokens/ alone is 72.8% comment' },
  { id: 'demo', root: 'demo', why: '196 files, 30,370 lines — the product surface, under the same edicts' },
  { id: 'tests', root: 'tests', why: 'must be isomorphic to src and must contain everything test-shaped in the repo' },
]

const COMMON = `
Repository: ${REPO} — Vue 3.5 + Tailwind v4 liquid-glass component library, 7.0.0 live on npm.
PHASE: tranche development only. READ-ONLY. You MUST NOT edit, create or delete any repo file.

**READ FIRST — law for this seat:**
  ${REF}/ANALYSIS-SPEC.md   dimensions D1-D12; **D3 is your dimension**; the rules of judgement
  ${REF}/EXEC-STATE.md      what is already measured — DO NOT RE-MEASURE IT
  ${REF}/DAG.md             the deterministic component graph
  ${SCRATCH}/dag-deterministic.json   62 nodes, full feature vectors
  ${SCRATCH}/dag-clusters.json        56 clusters + cycles

THE DIRECTORY EDICTS — apply these literally, they are the whole point of this workflow:

1. **COLOCATION.** A component owns its sub-components, composables, constants and styles, recursively.
   Only genuinely module-level things stay in shared \`composables/\` or \`styles/\`.
2. **GOLDILOCKS GRANULARITY.** Too macro gives god-modules; too micro gives sand. A long-running directory
   is either PRUNED, or AGGLOMERATED at the function/class level, or GROUPED into logical sub-modules.
   Name the target file count per module and defend it.
3. **MODULE-NAME STRIPPING — a general de-duplication mechanism.** A file inside a module strips the
   module's name: \`animation/compile/easing/{easing-option,easing-config}\` becomes
   \`easing/{option,config}\`. The path already says it. Find EVERY instance and list the renames.
4. **TESTS ARE NEVER COLOCATED.** They live in a tree isomorphic to source: \`src/a/b/c.ts\` ->
   \`tests/a/b/c.test.ts\`. **No test file inside \`src/\`.** Find violations and give the target path.
5. Follow the existing glass-ui flattening and component-structuring idioms. Do not invent a second
   convention; if the repo already has one, name it and conform.

MEASURED (do not re-measure): 62 components, 56,676 LOC. src 39.4% comment; src/components 34.0%;
src/styles 62.2%; src/styles/tokens **72.8%**; dock 51.7%. 42 of 62 components have ZERO src consumers.
The component graph is nearly edgeless — 56 clusters, 53 isolated singletons.

RULES: consumer count is NOT sufficient grounds for deletion — deletion is granted on VACUITY or
SUPERFLUITY. No legacy code, no aliases, no shims, no dual paths. Breaking changes are allowed.
Be pithy, laconic, fastidious: more code and more nesting are not better.

EVIDENCE BAR: every claim names a path and, where it is a count, the command that produced it.
`

phase('Survey')

const survey = await agent(`${COMMON}
YOUR TASK: **measure the actual directory shape** of the whole repo, so the benches argue over facts.

Produce, with the commands you ran:
- Per top-level zone (src/components, src/composables, src/styles, src/lib if present, demo, tests):
  directory count, file count, max depth, and the **directory-size distribution** (how many dirs hold 1
  file, 2-4, 5-9, 10-19, 20+).
- **The long-running directories** — every directory with 10+ direct children, with its file list.
- **The singleton directories** — every directory holding exactly one file (the sand signal).
- **Module-name repetition** — every file whose basename repeats its parent directory's name, or a
  meaningful prefix of it. This is the rename list; be exhaustive.
- **Test files inside \`src/\`** — every one, with its target path in an isomorphic \`tests/\` tree.
- **Barrels** — every \`index.ts\`, and whether it re-exports or contains logic.
- Deepest paths in the repo, top 20.

Terse tables. This is a measurement seat, not an opinion seat — no verdicts.`,
  { model: M, label: 'survey:directory-shape', phase: 'Survey' })

phase('Challenge')

const out = await pipeline(
  ZONES,

  (z) => parallel([
    () => agent(`${COMMON}

THE MEASURED DIRECTORY SHAPE:
${survey}

YOUR ZONE: **${z.root}** — ${z.why}

YOUR BENCH: **THIS ZONE IS TOO FRAGMENTED — it is SAND.** Assume the granularity is too fine.

Find: directories holding one or two files that should be a single file; modules split across directories
that are one module going unnamed; composables extracted for a single caller; constants files holding
three constants; barrels that exist only to re-export one thing; a component directory whose five files
are each 20 lines. Name the AGGLOMERATION: which files become one, under what name, and what the resulting
file contains at the function level.

Also apply edict 3 — every file repeating its module's name — and give the exact rename list for this zone.`,
      { model: M, label: `${z.id}:sand`, phase: 'Challenge' }),

    () => agent(`${COMMON}

THE MEASURED DIRECTORY SHAPE:
${survey}

YOUR ZONE: **${z.root}** — ${z.why}

YOUR BENCH: **THIS ZONE HAS GOD-MODULES — the granularity is too coarse.** Assume the opposite of bench A.

Find: long-running directories that are a bag rather than a module; single files doing three jobs; a
directory whose members have no common purpose beyond the folder name; the 20+-child directories; files
over ~400 code lines that should split at a natural seam. Name the SUB-MODULE GROUPING: which members form
a cohesive group, what that group is called, and why those members and not others.

Where the zone is \`src/styles\` note that it is **62.2% comment** and \`tokens/\` is **72.8%** — decide
whether a token file is a module or a manifest, and say what the prose is costing.`,
      { model: M, label: `${z.id}:god`, phase: 'Challenge' }),

    () => agent(`${COMMON}

THE MEASURED DIRECTORY SHAPE:
${survey}

YOUR ZONE: **${z.root}** — ${z.why}

YOUR BENCH: **THIS ZONE IS IN THE WRONG PLACE ENTIRELY.** Assume the boundaries are misdrawn.

Find: things in \`composables/\` that belong to exactly one component (colocation violations outward);
things inside a component that are genuinely shared and belong in the shared layer (colocation violations
inward); styles that live apart from the component that is their only consumer; demo helpers that leaked
into \`src\`; library code that leaked into \`demo\`; **tests colocated inside \`src\`**; and any file whose
directory disagrees with the dependency graph.

For each: current path -> target path, and the one-line ground. Verify CSS reachability has TWO mechanisms
— the \`@import\` closure from \`src/styles/index.css\` AND SFC \`<style src="./styles.css">\` — a move that
models only one will silently orphan a stylesheet.`,
      { model: M, label: `${z.id}:wrong-home`, phase: 'Challenge' }),
  ]).then(c => ({ z, chal: c.filter(Boolean) })),

  ({ z, chal }) => agent(`${COMMON}

YOUR ZONE: **${z.root}** — ${z.why}

Three benches examined it. Bench SAND says it is too fragmented; bench GOD says too coarse; bench
WRONG-HOME says misplaced. **They will contradict each other — that is the design, and resolving the
tension with evidence is your job.**

--- SAND ---
${chal[0] || '(failed)'}
--- GOD ---
${chal[1] || '(failed)'}
--- WRONG-HOME ---
${chal[2] || '(failed)'}

You are the ADJUDICATOR. Rule on every proposal: SUSTAINED / OVERRULED / PARTIAL with the reason, verified
yourself against disk. Then emit **the terminal shape for this zone**:

1. **THE TARGET TREE** — the directory listing this zone should have, as a tree. Not a diff, the shape.
2. **MOVES** — table: current path -> target path -> ground.
3. **AGGLOMERATIONS** — files that merge, the resulting file, and what it contains at function level.
4. **SPLITS** — files that divide, at what seam.
5. **RENAMES under module-name stripping** — exhaustive for this zone.
6. **DELETIONS** — on vacuity or superfluity only, with the evidence. Consumer count alone is not a ground.
7. **TEST DISPLACEMENT** — every test currently in \`src\`, with its isomorphic target.
8. **WHAT BREAKS** — import paths, the 72 package.json export subpaths, the root barrel, CSS reachability
   (both mechanisms), and the demo.

Be laconic. A settlement that adds files or nesting must justify itself against the alternative of deleting.`,
    { model: M, label: `${z.id}:ADJUDICATE`, phase: 'Adjudicate' })
      .then(r => ({ zone: z.id, ruling: r })),
)

phase('Fold')

const ok = out.filter(Boolean)
const fold = await agent(`${COMMON}

Zone settlements (${ok.length}):
${ok.map(r => `\n===== ${r.zone} =====\n${r.ruling}`).join('\n')}

Emit **THE DIRECTORY SETTLEMENT** — terminal, for the whole repo:

1. **THE TARGET TREE**, whole repo, to a sensible depth. This is the deliverable.
2. **THE MOVE LEDGER** — every path change, consolidated and deduplicated across zones.
3. **COLLISIONS** — where two zones proposed incompatible homes for the same file. Rule each.
4. **THE RENAME LEDGER** under module-name stripping, consolidated.
5. **TEST DISPLACEMENT LEDGER** — the isomorphic tests/ tree, and every file leaving src/.
6. **DELETIONS** on vacuity/superfluity, with evidence per row.
7. **THE ORDER** — a move order that never leaves the repo unbuildable, with the reason for each edge.
8. **WHAT BREAKS**: the 72 export subpaths, the root barrel, CSS reachability by BOTH mechanisms, demo
   imports, and the published type surface (already empty under node16 for a separate reason — do not
   make it worse).
9. **FILE-COUNT LEDGER** — before and after, per zone. If the settlement produces MORE files or MORE
   nesting, justify it explicitly or re-cut. Goldilocks, not sand, not god-modules.

Declare your exact modelId. Exhaustive on coverage, terse in prose.`,
  { model: M, label: 'STRUCTURE:fold', phase: 'Fold' })

return { zones: ok.length, survey, fold }
