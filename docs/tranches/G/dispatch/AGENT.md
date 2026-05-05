# G Agent Dispatch Template

Use this template for G agents. Fill the bracketed fields before dispatch.

```text
You are working in /Users/mkbabb/Programming/glass-ui on tranche G - Design-Language Vocabulary Expansion.

Wave: [W0/W1/W2/W3/W4/W5]
Lane: [lane id and focus]
Mode: [read-only audit / implementation / verification]

Read first:
- docs/instructions/README.md
- docs/precepts/instructions/README.md
- docs/precepts/instructions/ORCHESTRATION.md
- docs/precepts/instructions/CONSUMING.md
- docs/precepts/instructions/tranche/SPEC.md
- docs/precepts/instructions/tranche/RESEARCH.md
- docs/precepts/instructions/tranche/CHALLENGE.md
- docs/audits/style-audit.md
- docs/audits/overfitting-audit.md
- docs/tranches/G/G.md
- docs/tranches/G/waves/[wave].md
- docs/tranches/G/research/00-synthesis.md
- docs/tranches/G/research/[lane-letter]-*.md (your slice's per-lane report)

Task:
[bounded lane task — cite the synthesis gap numbers or the wave-spec scope sections]

Ownership:
[exact files/directories, or "read-only; do not edit"]

Rules:
- You are not alone in the codebase. Do not revert or overwrite unrelated edits.
- Follow KISS: one path, no compatibility shims, no fallback exports, no legacy/deprecation barrels.
- Every new src/ artefact must clear the ≥2 call-site bar (per feedback_overfitting_audit). Single-site additions go to consumer presets, not the library.
- Tailwind-first: new utilities are expressed via @theme + @utility, never pasted.
- One style authority per family. Do not duplicate definitions across paper.css / glass.css / cards.css / utilities.css.
- If scope reveals work outside this wave or ownership, stop and report the scope reveal — do not broaden silently.
- Storybook is the oracle. New tokens / utilities / components without a story are not done.
- Bundle/CSS deltas are measurements; not hard gates unless the wave spec says so.
- Evidence must be command-backed, source-backed, or runtime-backed. Label speculation.
- Styling changes must be visually isomorphic for unchanged sites unless the wave names a deliberate correction.

Output:
- Summary of findings or changes.
- Exact files changed, if any.
- Commands run and outcomes.
- Residual risks and scope reveals.
```

## W0 Lane Prompts

W0 agents are read-only and must not edit source/config/test/consumer/demo files.

- **W0.α Vocabulary + convergence verification + bbnf fold-in**: For each gap row #1-#25 in `research/00-synthesis.md`, grep-confirm the call-site count, confirm the canonical replacement still exists in canon, accept/reject/narrow with rationale. Fold lane G (`G-bbnf-lang-playground.md`) findings into the synthesis: append corroborated/contradicting/new-shape gaps to the synthesis tables. Output `audit/W0-gap-classification.md` (rows 1-25 + bbnf-lang additions).
- **W0.β Hygiene + DESIGN.md drift**: Cover gap rows #26-#43+ plus dead-recipe sweep (`.depth-text`, `--accent-pink`, `--section-heading`, `--accent-red`, `--shadow` alias, `brand-uniform-sans` orphan), DESIGN.md vs source numeric/utility-claim diff, and the silent-failure inventory across all 6 consumers (`gold-shimmer` text, `dashed-well`, `stagger-children`, `rainbow-vivid`/`rainbow-pastel`, `active-scale`/`disabled-base`). Confirm `--accent-red` is the keyframes.js consumer's own brand token (not glass-ui's) before authorizing the canon-side retirement. Outputs: `audit/W0-gap-classification.md` (rows 26+), `audit/W0-design-md-drift.md`, `audit/W0-silent-failures.md`.
- **W0.γ Measured drift baseline**: re-run `docs/audits/style-audit.md` against each of the six consumers at current HEAD against current canon, record drift count per consumer × per axis. Six rows: speedtest, fourier-analysis/web, words/frontend, keyframes.js, value.js, bbnf-lang/playground. Output `audit/W0-baseline-drift.md` — these are the W5 hard-gate ground-truth numbers.

Orchestrator merges the lane outputs into `audit/W0-challenge.md` and amends `waves/W1.md` through `W5.md` with exact files+symbols+commands.

## Implementation Dispatch Constraints

- W1 tokens are orchestrator-owned; one parallel lane permitted on DESIGN.md numeric drift only.
- W2 surface CSS lanes split by family (paper+cream / flourish+iconography / math). Do not edit each other's files. **No `glass-skeuo` tier.**
- W3 component lanes split by family (design-language primitives / math+typography / swatch+blob+filters / motion+timeline / CVA branches+composables+slot-class+runtime tokens). Do not modify the same component's CVA in parallel.
- W4 story lanes split by category (foundations+primitives / containers+motion+compositions). Both lanes touch `manifest.ts`; orchestrator merges at end.
- W5 is orchestrator-only — proof-by-ledger; no consumer-repo edits.
- Close is orchestrator-only.

## Wave-Specific Reading

Each wave spec (`waves/W{0..5}.md`) names exact files, symbols, and commands. Treat the wave spec as the load-bearing input; the synthesis is supporting context.
