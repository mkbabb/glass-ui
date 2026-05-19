# Q.W4 Lane E — legacy cosmetic comment sweep (Q-leg-1)

## Charter

Per Qδ R1 + R3. Cosmetic comment rephrasings only — no source-behaviour change.
Qδ's post-P legacy sweep found zero genuine-legacy artefacts; two cosmetic
verbose / mis-framing comments fall to the Q-wave style-sweep lane.

## What changed

### Qδ R1 — test-file "legacy consumers" mis-framing

`src/components/custom/timeline/__tests__/continuous-structural-split.test.ts`
(in the `3cb70db` cohort area) — the test comment described the
`disablePopover` bare-fallback path as serving "legacy consumers". The
`disablePopover` path is a *current* API surface, not legacy — the word
mis-frames it. Rephrased to "popover-disabled consumers". One-line comment edit;
the test body is untouched.

### Qδ R3 — verbose dock.css archaeology comment

`src/styles/dock.css` — the `.glass-dock[data-density="comfortable"]` rule
carried a verbose post-hoc archaeology comment documenting a *fixed* bug at
length ("the 4-rung prop type used to fall through to the unpatched root for
the comfortable default"). The V.W3.T1 fix needs no narrative. Trimmed to a
one-line rationale ("Comfortable density — the GlassDock default. Sits between
compact and spacious."). CSS rules untouched.

## Verification

- `npm run typecheck` — GREEN.
- `npx vitest run` — 379/379 GREEN (the timeline structural-split suite still
  passes; only its comment changed).
- Both edits are comment-only; zero source-behaviour change. `git diff`
  confirms no rule / assertion delta.

## Verdict

**CLOSED.** Qδ R1 + R3 cosmetic comments rephrased. Qδ R2 (the `.dock-layer`
vs `.dock-layer-item-host` duplication) and R4 (value.js devDep workaround) are
genuine substrate items, NOT in this cosmetic lane's scope — they remain owned
by their own Q-wave dock-cohesion / value.js lanes.
