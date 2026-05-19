# Q.W0 Lane B — Cross-Repo Dev-Resolution Contract (proof doc)

**Lane**: Q.W0 Lane B (agent-dispatched).
**Status**: COMPLETED.
**Date**: 2026-05-18.
**HARD CAP**: 30 min. Observed within cap.
**Inputs**: Q.R12 (Q12-cross-repo-dev-resolution-architecture.md),
Q.R11 (Q11-consumer-resolver-sweep.md), Q.md §1-§2,
Qε (Qepsilon-recap-chronic-retrospective.md),
`docs/precepts/instructions/` (README, ORCHESTRATION, LESSONS-LEARNED, STYLE).

---

## §1 — Charter

Per Q.W0 Lane B spec (W0.md lines 20-28) and Q invariant 30:

1. Author `docs/precepts/cross-repo-dev-resolution.md` — the binding precept
   edict for the cross-repo `@mkbabb/*` dev-resolution contract.
2. Diagnose the invariant-29 recurrence — why prose codification at P.W6 did
   not prevent the post-P 7-commit shadow cohort.
3. Recommend the tooling-gate escalation and embed it in the precept edict.

File bounds: `docs/precepts/cross-repo-dev-resolution.md` (new), this proof doc
(new). No source mutations. No mutating git.

---

## §2 — Method

Required reading performed in full before authoring, per MEMORY.md §Analyze-in-full:

- Q.R12 complete — the round-2 architectural deep-dive; the contract design.
- Q.R11 complete — the fleet-wide breakage evidence; 4 consumers swept.
- Q.md §1-§2 — thesis + invariant-30 statement.
- Qε complete — invariant-29-recurrence diagnosis context.
- `docs/precepts/instructions/` README + ORCHESTRATION + LESSONS-LEARNED + STYLE.md —
  to match precept-submodule doc conventions and tone.
- Sample existing proof doc (`P/audit/W0-Lane-A-AB+1-retrospective.md`) for
  format reference.

Authoring strategy: the precept edict is the normative text; this proof doc
is the close evidence. The edict derives directly from Q.R12 §3 (the contract)
and Q.R12 §6 (enforcement recommendation); the diagnosis derives from Qε §3.4
and the stash anti-pattern LL ledger (the canonical escalation precedent).

---

## §3 — The contract (summary)

Full normative text at `docs/precepts/cross-repo-dev-resolution.md`.

### Publisher half — the 4-key `exports` shape

Every `@mkbabb/*` `package.json` `exports["."]` declares, in this key order:

```jsonc
"development": "./src/<entry>.ts",  // live source for workspace-linked dev
"types":       "./dist/<name>.d.ts", // built declarations
"import":      "./dist/<name>.js",   // built ESM
"default":     "./dist/<name>.js"    // terminal fallback
```

The `development` key routes workspace-linked consumers to live `src/`
TypeScript; it must come first (first-match-wins). The `default` key is the
keystone the Q audit found missing across all three packages (Q.R12 §3.3) —
it closes the gap for resolvers that activate none of the three named
conditions (CJS `require`, plain `node -e 'import(...)'` probes, exotic
bundlers). All three packages already satisfied keys 1-3 at Q open; `default`
was the universal omission.

### Consumer half — the three resolver requirements

1. **Explicit `resolve.conditions`** including `"development"` in every
   dev/serve Vite config. Relying on Vite's serve-mode auto-injection is the
   half-wired fragility this contract closes; the explicit array is
   self-documenting and survives a Vite-default change. Production/library
   build configs omit `development`.

2. **ZERO hard `dist/` aliases for any `@mkbabb/*` sibling.** A `resolve.alias`
   entry overrides the `exports` map entirely — the hostile fossil in value.js
   (`@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js`) is the
   canonical failure mode. The fix is deletion, not repair; the bare specifier
   routes through the `exports` map correctly once the alias is gone.

3. **`server.fs.allow` widening** to include sibling roots. The `development`
   branch serves sibling `src/` assets over Vite's `/@fs/` channel; without
   the allow-list, glass-ui fonts (and any `src/`-relative assets) 403.

### Prohibitions (no exceptions)

- No hard `dist/` alias for any workspace sibling.
- No self-aliasing a package's own published name.
- No hoisting a transitive sibling into a grandparent's `devDependencies`
  (the phantom-devDep anti-pattern; Q.R12 §5.1).
- No checked-in `dist/` artefact as a resolution target.
- No shared `outDir` between library and demo builds.

### Mechanical gate

`scripts/proof-resolution-contract.mjs` (Q.W0 Lane C) — fail-closed, verifies
the 4-key shape + no `@mkbabb/*` `dist/` aliases + explicit `resolve.conditions`
+ `fs.allow` coverage. Wired into `npm run proof:resolution` and
`.github/workflows/ci.yml`. Expected-fail baseline at Q.W0; expected-pass at
Q.W6.

---

## §4 — Invariant-29 recurrence diagnosis

### §4.1 — The fact

Invariant 29 ("shadow-execution retrospective discipline") was codified at
P.W6 close on 2026-05-16 in commit `3310a8c`. The post-P shadow cohort's
commits 2-7 landed 2026-05-17 → 2026-05-18 — one to two days later. This is
the 4th K-invariant-3 recurrence, and the FIRST to occur after the invariant
meant to prevent it was formally codified (Qε §3.4).

### §4.2 — Why prose codification failed

The structural failure is temporal disjunction:

- Prose edicts are read at tranche open, during planning.
- Shadow-execution failures happen between tranches, during operational momentum.
- The read-event and the failure-event occupy different moments; no mechanism
  enforces the edict at the moment the first unattributed commit lands.

The AB+1 LL entry (2026-05-16) diagnosed this precisely for the AB+1 cohort:
"discipline at the moment-of-execution is the missing piece." One tranche
later, under an explicitly codified invariant, the identical failure reproduced.

The stash anti-pattern LL ledger (2026-05-04 through 2026-05-16) is the
canonical parallel: 7 recurrences over 5 tranches, each iteration adding a
prose loophole-close, before P.W2 escalated to `scripts/audit-stash-list.mjs`.
The 7th stash recurrence triggered the tooling escalation per O invariant 27
("the next recurrence triggers tooling-side enforcement"). Shadow-execution is
at recurrence 4 with prose-only enforcement; the same escalation is warranted
and is the Q.W0 diagnosis output.

### §4.3 — The codification-without-gate pattern

Q §4 (Q-chron-3 entry) names this the "codification without gate is
necessary-but-not-sufficient" recurrence pattern — 5 instances at Q open:
K-invariant-3 stash, K-invariant-3 K-invariant-3-recurrence, invariant 30
(cross-repo dev-resolution), invariant 31 (component-props fail-explicit), and
the phantom-class M-class blind-spot. In each case the pattern is identical:
a recurring failure is documented, an invariant is codified, the failure recurs
because the invariant is a prose commitment, not a mechanical constraint.

The cross-repo dev-resolution desync is the same pattern from the infrastructure
side. CLAUDE.md §Subpath surface documented the `development` branch ("dev
consumers resolve to `src/` directly"). The documentation existed. The consumer
half was never applied. Q.R11's fleet-wide audit found every consumer broken
at `npm run build`. Documentation did not prevent the half-application.

### §4.4 — Recommendation

**Every new invariant addressing a recurring anti-pattern MUST ship its
tooling gate at the same tranche, not a named-destination successor wave.**

For the cross-repo dev-resolution contract:
- Gate: `scripts/proof-resolution-contract.mjs` (Q.W0 Lane C, same wave as
  this edict).

For shadow-execution discipline:
- Gate candidate: a `commit-msg` or `pre-push` git hook that rejects commits
  not attributed to an open `docs/tranches/<LETTER>/` folder, with a
  documented bypass for retrospective/explicitly-authorized work. Proposed for
  codification at Q.W6 close, consistent with the "gate at same tranche" rule.

The stash script (`audit-stash-list.mjs`) provides the implementation
template: one file, fail-closed exit, one-shot bypass env var, wired into
`package.json.scripts` + CI. The commit-msg hook follows the same pattern at
the git layer.

This recommendation is embedded in the precept edict at §4 (invariant-29
recurrence section) and stands as the Q.W0 Lane B diagnosis deliverable.

---

## §5 — Artefacts

| # | Path | Status |
|---|---|---|
| 1 | `docs/precepts/cross-repo-dev-resolution.md` | AUTHORED — precept edict; 8 sections covering background, the 4-key publisher shape, the 3 consumer requirements, prohibitions, the enforcement gate, invariant-29 recurrence diagnosis, per-repo migration map, library-build resolution, and CLAUDE.md cross-reference |
| 2 | `docs/tranches/Q/audit/W0-Lane-B-dev-resolution-contract.md` | AUTHORED — this proof doc |

Q.W0 Lane B produces no source mutations and no mutating git operations. Both
artefacts are documentation. The precept edict lands in `docs/precepts/` (the
submodule working tree); the orchestrator commits and advances the submodule
pointer at Q.W6 per the Q plan.

---

## §6 — Verdict

**Lane B: COMPLETE.**

The precept edict at `docs/precepts/cross-repo-dev-resolution.md` codifies
Q invariant 30 as a binding cross-repo edict: every `@mkbabb/*` publisher
declares the 4-key `exports` shape (`development`/`types`/`import`/`default`
in that order); every consumer declares explicit `resolve.conditions`, carries
ZERO `dist/` aliases for siblings, and widens `server.fs.allow` to linked
sibling roots.

The invariant-29 recurrence is diagnosed: codification is
necessary-but-not-sufficient. Prose edicts read at tranche open cannot enforce
a discipline that must hold between tranches, at the moment of execution.
The canonical escalation — fail-closed tooling gate, same wave as codification —
is both recommended in this document and instantiated at Q.W0 via
`proof-resolution-contract.mjs` (Lane C). The shadow-execution gate candidate
(commit-msg/pre-push hook) is proposed for Q.W6 codification.

The per-repo migration map (precept §5) enumerates the gestalt remediations:
deletion of fossil aliases, not new machinery. The contract's existing mechanism
(conditional-exports) is correct; the migration removes everything that fights
it.
