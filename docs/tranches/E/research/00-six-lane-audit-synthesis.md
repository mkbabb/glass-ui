# E Research — Six-Lane Audit Synthesis

This synthesis records the six read-only audit lanes requested before rewriting E. Agent claims were checked against current `HEAD` (`d0fc7ea`) rather than accepted as authority. The repository has no tranche documents after E, so the requested “post current” fold-in is represented by the retired old-E/F intent captured in D, D-II, and the prior E draft rather than by nonexistent F/G tranche files.

## Lane 1 — Original Plan And Drift

Accepted findings:

- Shared precepts require research/challenge/plan before implementation, and scope dilation requires amended plans before redress.
- D originally planned wire/delete substrate, prove consumers, ship fast iteration, then re-audit.
- D-II implemented useful redress, but the user request was planning-first.
- Current `HEAD` has drifted after `d-close`: `useInterval` and `@utils` resolution were restored while D close docs still describe their removal.

Plan implication:

- E.W0 must reconcile current `HEAD` against D/D-II close claims before any package cutover.

## Lane 2 — Dead, Legacy, Shim-Like, Under-Consumed Surface

Accepted findings:

- `useInterval` is public again with test/export evidence but no source/demo/external consumer evidence yet.
- `@utils` is broad source aliasing again; W0 must decide whether it is supported internal infrastructure or package leakage.
- `vite.iter.config.ts` appears out of parity with the real build shape: real build has `@utils` and multi-entry output while iter build has only `@` and root entry output.
- Dock implementation helpers are still public through the dock barrel and should be classified.
- Sidebar legacy helpers and component-package composables need migration/internalization decisions.
- Public-surface tests are hand curated and can pin questionable exports.
- `verify-export-types` checks target existence but does not yet prove string exports, type resolution, or packed-package imports.
- `profile-bundle` is currently a build label, not an artifact-producing profile.

Plan implication:

- E.W0 ledgers must classify every current root export and package/style/config contract as `core`, `subpath`, `internalize`, `delete`, `align`, or `consumer-migrate-first`.

## Lane 3 — Process Lessons From C And D

Accepted findings:

- Parallelization is valuable only with disjoint ownership.
- Whole-command gates beat green fragments; `npm run iter` matters more than isolated subcommands.
- Evidence beats agent reports; re-grep/rebuild/re-run before acting.
- Consumer validation is mandatory for package boundary work.
- Avoid speculative utilities and plugin work unless current evidence requires them.

Plan implication:

- E uses six agents only for W0 audit. Shared config/package edits stay orchestrator-led or are split by disjoint files.

## Lane 4 — Future Fold-In

Accepted findings:

- Existing E should not be used as written.
- D and D-II already narrowed E to one publication cutover.
- Hard byte targets in old E are speculative until W0 baselines prove floors.
- Old F ledger items are retired from E.

Plan implication:

- E keeps package contract, style entry, consumer migration, and proof. It drops prop unification, broad a11y, consumer adoption expansion, and plugin extraction.

## Lane 5 — Velocity Substrate

Accepted findings:

- Vitest root smoke tests are valuable and fast.
- `/usr/bin/time -p npm run iter-check`, `iter-test`, and `verify-export-types` are fast enough for inner-loop evidence.
- Export verification is currently file-existence oriented and should become package-contract oriented.
- `profile-bundle` and `profile-consumers` are labels, not artifact-producing profiling.
- `validate-consumers` belongs in close/proof, not inner-loop work.
- `ay-close` is valid close proof but too expensive and write-heavy for every wave.

Plan implication:

- E.W1 extends export verification and adds a packed-package import/type probe. Bundle and CSS deltas are recorded in W3, not used as speculative hard gates.

## Lane 6 — Tranche Spec Challenge

Accepted findings:

- Required tranche shape is plan, progress, final, waves for broad/parallel work, and audit/research artifacts.
- Existing E violates the stricter no-shim/no-fallback direction with deprecation shims, plugin fallback, and escape clauses.
- The new E should be “Publication Contract Cutover” with one import path per symbol and one public style path.

Plan implication:

- This rewrite is the plan baseline; W0 challenge must still run before implementation dispatch.

## Rejected Or Superseded Claims

- Any stale agent claim that D.W4 was still open is superseded by `d-close`, but the post-`d-close` `d0fc7ea` drift is real.
- Any claim that `useInterval` was finally deleted is stale for current `HEAD`.
- Any claim that `@utils` is removed is stale for current `HEAD`.

## Binding Decisions For E

1. E is a contract cutover, not a plugin extraction tranche.
2. W0 audits and challenges before implementation.
3. One public path per symbol and one public style path at close.
4. No permanent shims, fallback plugin, or F escape ledger.
5. Consumer migration and validation happen in the same tranche.
6. Shared package/config implementation is orchestrator-owned unless W0 creates disjoint file ownership.
7. W1 cannot start from broad file globs; W0 ledgers must narrow exact files and symbols first.
