# LEGACY-EXCISION

A reusable agent-dispatch prompt for the surgical excision of legacy / deprecated / workaround / fallback / fall-through code. Drop the body below into `AGENT_DISPATCH_TEMPLATE.md` as the *Scope + Non-negotiables* payload — it composes with the template (file bounds, hard gate, lint cadence, the read-only-git clause), it does not replace it.

**When to use:** a cleanup wave whose job is to find and remove dead/deprecated/fallback paths, collapse dual-paths, and convert silent degradation in library-owned logic into explicit failure. Pairs with [RESTRUCTURE-BACKEND](./RESTRUCTURE-BACKEND.md) (the move/colocate counterpart) and the read-only [overfitting-audit](../../precepts/audits/overfitting-audit.md) (the dead-export census it extends).

---

```markdown
ROLE: legacy-excision agent for tranche {LETTER}, wave {WAVE}.

GOAL: every legacy / deprecated / workaround / fallback / fall-through path in your file
bounds is either EXCISED (deleted at the root) or converted to FAIL-EXPLICIT. No silent or
graceful handling survives unless it is a befitting browser-API / consumer-misuse degradation
path carrying a recorded one-line rationale.

COMPLETION: the hard gate passes on EVIDENCE — a deletion proof (the removed lines + green
build + green typecheck + green tests over the affected consumers), not a grep.

THE PRINCIPLE (cite the README Edicts by name; they are binding):
- "Abrogate before patch": for a doomed surface, ask "can we delete?" before "can we patch?".
- "No legacy code": delete dead code. Do NOT rename it, hide it behind a flag, or leave a
  commented remnant. A `*_v2` / `*_old` / `legacy*` / `// kept for compat` is the target.
- "One path": two orthogonal codepaths for one logic collapse to ONE, keeping the surviving
  consumer. No old/new parallel path without a plan-named cutover window.
- "No backwards-compat aliases": a clean break. No alias re-export, no migration shim, no
  `|| oldName` fall-through.
- "Fail-explicit on library-internal contract violations" (LOAD-BEARING): library-owned logic
  (a factory init, a shader compile, a parser internal-state check, a should-not-reach defensive
  branch) THROWS on failure — a silent `console.warn`+`return` there obscures the bug and produces
  invisible regressions when the substrate is upgraded. DISTINCT and NEVER collapsed: a
  browser-API degradation path (pointer-capture failure, reduced-motion, WebGL context-lost,
  network-unavailable, FOUC inline script) STAYS a befitting silent fallback with a rationale
  comment. Judge each path: which class is it?

WHAT TO EXCISE (the catalog, with the live smells this prompt was calibrated against):
1. Fallback `?? default` / `|| fallback` that papers over a contract the caller should honor.
   Keep a `??` that supplies a genuine optional default; excise one that hides a missing-required
   input (convert to a thrown precondition).
2. Swallowed errors — `catch {}` / `catch(_) {}` / `catch { return }` in library logic. The only
   sanctioned empty catch is an emitted FOUC inline script (already marked
   "fail-explicit: befitting"). Everywhere else: rethrow or fail-explicit.
3. `console.warn`+`return` in library-owned code — convert to a throw. A `console.warn` on a
   consumer-misuse path (a stale-prop warning, a pointer-capture failure) is befitting; keep it.
4. A deprecated mechanism left beside its successor (the dual-path shelf-ware `proof:no-dual-path`
   forbids): if a successor landed, the predecessor is ABSENT, not dormant.
5. Dead exports / one-use abstractions: run the overfitting-audit taxonomy (keep-current /
   library-orphan / inline-and-remove / delete-unused / test-only-delete). A single-use private
   helper inlines; an unused public surface deletes. CURRENT CONSUMER OR DELETE — no "seems
   unused", every verdict cites the count command.
6. Version straddles + the doc-claims-retired-but-code-still-has-it class: a `"^x || ^y"` peer/dep
   straddle whose canon claims the old leg retired is a live legacy; collapse it to the single
   floor and typecheck the consumers against it.
7. Legacy export aliases / mirror barrels: per the export-reshape plan, no alias survives the cut.

HOW (the discipline):
- Trace every consumer of a symbol you delete (rg across src/, demo/, the published surface)
  BEFORE deleting. A cross-repo consumer is migrated by a by-name ASK + a migration-map row — you
  edit ZERO sibling-repo files (the foreign-tree fence is LITERAL).
- Delete at the ROOT, not the leaf: the definition, its export, its type, its barrel line, its
  doc note, AND any gate clause that asserted its presence — together, in one wave.
- If a gate readFileSync's a doc you are excising, RE-HOME its contract-source to the new doc home
  OR retire the gate with a recorded rationale. A gate pointing at a deleted file is itself legacy.
- Run `npm run typecheck` + `npm run build` after EACH symbol group, not at the end — incremental
  verification keeps disk recoverable on a stall.
- NEVER stub, disable a gate, or leave a TODO-restore. If the excision reveals scope beyond your
  bounds, HALT and report (scope-reveal); do not work around it.

NON-NEGOTIABLES:
- Read-only git (the Hardened-agent clause). The orchestrator owns the index.
- Stay inside file bounds; no opportunistic refactor outside the wave.
- Every deletion carries evidence: the build/test/typecheck output path, the consumer-trace
  command, the deletion-proof diff stat. Grep-only is insufficient for a runtime path.
- Prose follows STYLE.md: evidence over editorializing, no AI-writing signs, unspaced em-dashes.

RETURN: per AGENT_DISPATCH_TEMPLATE — summary, files changed, evidence paths, known misses/risks,
plus a MIGRATION-MAP fragment for any public-surface deletion (old symbol → new home / by-name ask).
```

---

## Appendix — the befitting-vs-illegitimate fallback test

The one judgement this prompt turns on. A fallback is **befitting** (keep it, mark it) when it absorbs a failure the library does not own and cannot prevent: a browser API absent (`@supports`, feature-detect), a user preference (`prefers-reduced-motion`), an environment without rAF (SSR), a lost GPU context, a consumer misusing a prop. A fallback is **illegitimate** (excise or fail-explicit) when it hides a bug in code the library owns: a swallowed factory-init error, a `?? {}` masking a missing required config, a dead dual-path kept "just in case", a version straddle the canon already declared retired. The test: *if this path fires, is it because the world failed me, or because I failed?* The first stays silent with a rationale; the second throws.
