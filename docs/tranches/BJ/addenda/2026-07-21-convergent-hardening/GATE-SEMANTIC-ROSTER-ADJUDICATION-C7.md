# Gate semantic-roster adjudication — C7

## Ruling

`BJ.W-GATE-COLLAPSE` / P-EX1 remains **DEFECT / IMPLEMENTATION-ABSENT /
ACCEPTANCE-RED**. Exact C2 critic
`0ef1eff5c2c5235eb2fc26573fe070304960f538e03270b231b60fa94e738800`
survives. C7 updates the moving census and resolves the mechanism its “use a
parser” continuation left underspecified. It changes no product, test, package,
row, consumer, or acceptance byte.

Current committed identity is HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`, `package.json`
`3a0618a72dc56c18589546b84960140d42fe6c548757499e4e967ede743b8e61`,
and `vitest.config.ts`
`3d5c17e2bdee7397019f55d2a12a399439e838a64cec678ca56a407fe0bd861d`.

## Pass 1 — current committed census

The configured committed Vitest include contains 199 files, 1,122 direct
`it`/`test` registration declarations, 32 table-registration declarations, and
273 suite registrations. The dirty untracked W8 test is excluded; including it
would produce 200 files, 1,170 test declarations, and 277 suites and would be a
moving-worktree result, not committed cursor truth.

`tests/gates/**` remains the four C2 files and 31 test blocks:

| family | files/suites | blocks |
| --- | ---: | ---: |
| `gate:boot-graph` | one file / three suites | 14 |
| `gate:orphan-CSS-partial` | one / one | 7 |
| `gate:token-hygiene` | one / one | 3 |
| `gate:type-hygiene` | one / one | 7 |

Thus C2's four-file/31-block subtree result remains exact even though its whole-
suite 197-file/1,104-plain-registration cursor is stale. `npm test` and
`iter-test` still invoke bare Vitest; no roster, ceiling verifier, enrollment
edge, or guard-deletion detector exists.

## Pass 2 — a parser cannot invent semantic units

Line regex is invalid, but replacing it with “all calls named `it` or `test`” is
also invalid. A naive TypeScript-AST walk classifies the shadowed predicate call
`test(path)` in `type-hygiene.test.ts` as a test registration. More fundamentally,
the band prose calls one boot-graph family fourteen blocks while “per-component
behavioral contract cores” remains open-ended. Neither files, suites, physical
registrations, expanded table cases, nor display titles define the governed
semantic unit.

One independent critic proposed counting a canonical helper's literal IDs; a
second proposed a machine roster with source selectors. Both correctly reject
physical counts. C7 combines them: **Sol freezes the exact semantic roster first;
Luna then implements one canonical statically analyzable governed-registration
binding whose literal ID must match that roster.** Luna may not decide which
predicates deserve IDs while writing the verifier.

One semantic ID means one independently falsifiable predicate. A parameterized
table may share one ID only when every row instantiates the same predicate; its
required case keys or case digest is then part of the roster so shrinking the
table cannot pass.

## Pass 3 — one roster, three partitions

The machine roster has exactly three partitions:

1. `active-vitest`: each row has stable ID, owner, predicate, exact source path,
   canonical registration binding, enabled mode, and optional required-case
   identity. Only these rows require a live registration.
2. `reserved-vitest`: named authorized capacity for not-yet-landed standing gates.
   The absent PERF `shell-field-governance`, `deferred-paint`, and `route-pending`
   rows and the not-yet-landed A11Y contrast-floor row belong here until their
   owners land them. They consume capacity but must not be manufactured merely to
   satisfy the roster.
3. `external-enforcement`: `.test-d.ts`/typecheck, `verify:package`, Playwright
   pixel floors/refraction, and other package/browser gates. They retain exact
   enrollment proofs but never enter the Vitest semantic-ID denominator.

The only numeric law is `active-vitest + reserved-vitest <= 60`. There is no
invented lower bound. Moving a reservation to active is atomic and leaves the
sum unchanged. Ordinary unrostered component regressions remain outside the
budget and continue to run and fail normally.

## Fail-closed enrollment design

One verifier owns roster parsing and TypeScript/Vue registration resolution. It:

- resolves the canonical governed binding and literal ID rather than trusting an
  identifier spelling;
- accepts multiline registrations and statically resolvable imports, but rejects
  dynamic/unresolved aliases and comment/template decoys;
- requires every active ID exactly once in its declared included file;
- rejects `skip`, `todo`, `only`, `fails`, conditional skip/run and disabled or
  exclusive ancestor suites, including equivalent options-object forms;
- validates parameter-case identity when present; and
- validates the active/reserved ceiling without inspecting ordinary tests.

The same verifier is enrolled explicitly before `test`, `iter-test`, and
`iter-test-watch`. Watch mode uses the same implementation on rerun; it does not
fork a second rule engine. This is a bounded roster preflight, not resurrection of
a general `gates.mjs` runner. Vitest 4.1.10's documented `globalSetup` /
`onTestsRerun` lifecycle is an acceptable watch adapter, but the package command
remains the deletion-sensitive root: moving or deleting its referenced verifier
must fail before Vitest. CI/release continue the full ordinary suite afterward.

## Born-RED mutation matrix

The immutable mutation receipt must isolate and restore at least:

1. retain a roster ID but delete its registration;
2. move a registration outside its declared file or configured include;
3. duplicate an ID in the same or another file;
4. add `skip`, `todo`, `only`, `fails`, conditional skip/run, options-object
   disablement, or an exclusive/disabled ancestor;
5. rewrite multiline or through a resolvable import alias and remain GREEN;
6. use an unsupported dynamic alias or dynamic ID and fail closed;
7. convert to a table and remove a required case;
8. split or merge predicates while duplicating or vanishing an ID;
9. plant apparent IDs in comments, inert strings or templates;
10. add a 61st active-plus-reserved row;
11. activate a reservation without its registration, or land a registration
    without atomically activating its reservation;
12. delete or move the verifier while the package enrollment remains;
13. remove each package/watch enrollment edge independently; and
14. add an ordinary unrostered failing regression: roster preflight GREEN, full
    Vitest RED.

Changed/restored candidate hashes and the verifier/roster/package/config identities
are mandatory. Two fresh unchanged-byte Sol x-high critics remain required after
the declared Luna cut. Until the exact active roster is separately frozen, no
mechanic implementation begins and P-EX1 cannot close.
