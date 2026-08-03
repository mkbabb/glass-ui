# Gate semantic-roster C10 exact-byte critic A

## Verdict

**RED / C11 REQUIRED.** C10 repairs C9's recorded structure, Button, multiline
scanner, hygiene, title, case and class-count defects in the right direction, but
it is not yet an exact input to Luna. Six blockers remain:

1. the retained Typewriter PRM predicate says “exactly once” without observing
   pending work after immediate settlement;
2. the async-declaration redress does not freeze exact dynamic-module lineage;
3. the frame-zero redress does not freeze loading-wash data lineage;
4. the token row does not define which live Vue/TypeScript class carriers are
   admitted while inert copies are rejected;
5. the required SFC/CSS parser dependencies are only transitively available and
   no direct-dependency/lock law exists; and
6. the 31/17 counts do not bind exact per-class ID membership against a
   count-preserving class swap.

This is a formation-only critic. It changes no product, test, package, lock,
consumer, source pin, receiver, gate-mechanic, reservation, row, browser or
acceptance byte, and it adds no semantic seat.

## Frozen input

- `GATE-SEMANTIC-ROSTER-C10.json` SHA-256
  `a46f2a78dcb58b4d099d2cff15512efa293afb596ea682dfe2f9c89abed5d1da`
- `GATE-SEMANTIC-ROSTER-C10-CANDIDATE.md` SHA-256
  `bd37241a8c51b305c7fa40259a407786858ee9573083f19555d7ad10e69c85f1`
- committed HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`
- `package.json` SHA-256
  `3a0618a72dc56c18589546b84960140d42fe6c548757499e4e967ede743b8e61`
- `package-lock.json` SHA-256
  `e6216e2188ea7d08fff572745be168dbf368df3d30baa10c2caa837bc817581f`

All source comparisons used committed bytes from the pinned cursor, not unrelated
dirty-worktree bytes.

## Exact structure that passes

| check | reproduced result |
| --- | --- |
| schema | version 2; every active row has a valid `semanticClass`; each declared redress has `phase`, owner, mechanism and unique mutation strings |
| capacity | `48 active + 4 hard + 1 conditional = 53`; seven seats free below 60; eleven external rows remain uncounted |
| identity | 64 total rows and 64 globally unique IDs; 28 distinct active source paths; every active/external source path exists |
| registrations | all 48 current titles occur exactly once in their committed source, including parameterized call chains; Button's `requiredRegistrationMigration.from` is the current exact title |
| cases | all nineteen required-case identities are unchanged from C9 and match source; Unicode `ζ` and `1/√φ`, Pager `slide-panel-0/1/2`, the three eager-shell paths, Accordion and NumberField are exact |
| digests | subpaths remain `118e091405270a3e1fa2ae9aea24c3805acc1a7a6a087dfd6c247e2f19776252`; springs remain `ef2496ddaffbb7ef1a1efba36941c18440b83eb6ba8a7332d193877a7a297f7f` |
| semantic-class counts | 31 `base-product-tooling` and 17 `component-behavior`, matching both `counts` and `machineLaw.activeSemanticClasses` |
| declared redresses | ten nested `requiredDetectorRedress` objects, matching `counts.preBindingDetectorRedress` |
| preserved C9 law | typography keep/delete transform, CSS-reach approximation, reservations, external enrollment and ordinary-suite non-budget law are byte-preserved in substance |

The Button repair now belongs in its same behavioral seat: the future body must
retain the rendered `size-9`/host assertions and parse the owned selector
`.button > svg:not([class*="size-"])`, with unconditional, displaced and later
retaking-rule mutations. The three hygiene repairs likewise strengthen their
existing predicates rather than creating seats: complete CSS/Vue radius and
backdrop declarations, complete component-CSS type declarations, and complete
source-CSS cleared-variable references. Their scope and positive/negative
mutations are adequate as formation semantics, subject to RED-5's parser
ownership requirement. The utility predicate is now honestly limited to the
Vue/TypeScript source and demo channel the current scanner walks.

Active still means present and enabled, not currently green. C10's recorded
243-pass/two-fail canary and `ACCEPTANCE-RED` posture are compatible with this
roster audit and grant no mechanic or package credit.

## RED-1 — the unredressed Typewriter row does not prove “exactly once”

`behavior.typewriter.prm-midflight-settle-once` claims that a live reduced-motion
transition completes exactly once (`GATE-SEMANTIC-ROSTER-C10.json:524-529`) but
has no `requiredDetectorRedress`.

The committed body starts typing without retaining or awaiting the returned
promise, triggers the media-query listener, and immediately asserts final text,
stopped state and one callback
(`tests/components/custom/typewriter/TypewriterText.contract.test.ts:125-151`).
It never advances the remaining fake timers afterward. Test teardown stops the
effect scope before restoring real timers (`:9-17`), so cleanup can erase delayed
duplicate work before any assertion sees it.

Current production is correct because `settleReducedMotion()` calls
`stopTyping()` and cancels the current token
(`src/components/typewriter/composables/useTypewriter.ts:308-327`). A mutation
that preserves immediate settlement/callback but omits cancellation leaves every
governed assertion green; the queued ordinary completion path at `:289-296` can
then call the callback again later.

C11 must add an eleventh same-seat pre-binding redress: retain the original
typing promise, trigger PRM mid-flight, drain all pending timers, await the
promise, and assert final state plus one callback after the drain. Omitting token
cancellation while preserving immediate settlement must RED. The active-seat
total stays 48; only the redress count changes to eleven.

## RED-2 — async binding names are not bound to exact module identity

Three of the five source-row redresses are exact in direction:

- `async-components` replaces the line scanner with SFC/TypeScript import parsing,
  including multiline, alias, type-only and inert-text cases;
- `no-aurora-barrel-value-import` parses value versus type-only imports; and
- `no-config-barrel` parses all three exact eager modules and preserves leaf/type
  imports.

For `async-declarations`, C10 proves local bindings named `Aurora` and
`PresetEditor`, real `defineAsyncComponent` calls and dynamic loaders
(`GATE-SEMANTIC-ROSTER-C10.json:323-345`). It never records the required mapping:

| binding | required resolved dynamic module |
| --- | --- |
| `PresetEditor` | `./configurator/PresetEditor.vue` |
| `Aurora` | `@glass/components/aurora/Aurora.vue` |

Swapping the targets or dynamically importing an unrelated Vue component
satisfies every stated mechanism and mutation while violating the intended
boundary. C11 must freeze the exact binding-to-resolved-module mapping, require
the callee to resolve to Vue's imported `defineAsyncComponent`, and add wrong-
target and swapped-target mutations.

## RED-3 — frame-zero existence is not loading-wash lineage

For `frame0-ground`, C10 separately requires a static `auroraFallbackGround`
import and a real Aurora `loadingComponent` option
(`GATE-SEMANTIC-ROSTER-C10.json:348-364`). The current source has the stronger
load-bearing chain: the Aurora boundary's inline loading component calls that
import and paints its returned `backgroundImage`/`backgroundColor`
(`demo/shell/AppShell.vue:66-86`). None of the C10 mutations replaces the option
with an unrelated eager component or shadows/disconnects the ground binding.
C11 must bind the option's render dataflow to the exact imported ground and add
those falsifiers. These are repairs inside the existing two boot seats.

## RED-4 — “admitted live writer” is not a machine grammar

The token redress requires parsed live definitions and excludes comments, inert
strings, templates and dead text, but its mechanism only refers to “the admitted
live Vue/TypeScript arbitrary-property writer channels”
(`GATE-SEMANTIC-ROSTER-C10.json:26-42`). No field enumerates the admitted AST
carriers, resolution roots or reach rule. Luna would still decide semantic
admission while implementing the verifier, contrary to C7's roster-first law.

This is not theoretical. Exactly two published names have no ordinary CSS
declaration at the pinned cursor: `--overlay-pad-inline` and
`--overlay-pad-block`. Their real definitions are themselves strings in live
Vue/TypeScript class carriers, including component class constants and bound
class arrays. Rejecting string/template syntax categorically loses those real
writers; lexically accepting it repeats C9's inert-decoy false-green. Syntax
parsing alone does not establish that an arbitrary-property string reaches a
rendered/public class consumer.

C11 must machine-declare the admitted carriers and reach rule—for example exact
static Vue class attributes, resolvable bound-class expressions and exact TS
class-recipe bindings—and pair each admitted live carrier with an identical
unreferenced/comment/template negative control. Removing the last live carrier
while retaining all inert copies must RED. Alternatively, migrate the two names
to ordinary CSS declarations and make CSS the only backing grammar. This remains
one token seat.

## RED-5 — parser ownership is transitive and undeclared

C10 explicitly requires SFC, TypeScript and CSS parsing. TypeScript is a direct
devDependency, but `@vue/compiler-sfc` and `postcss` are not present in the root
`package.json` or root `package-lock.json` devDependency map. They resolve today
only below direct parents (`vue`, `@tailwindcss/postcss`/`vite`) and happen to be
hoisted in the current npm layout.

A root verifier importing those packages would rely on an incidental transitive
layout. A valid nested install or upstream dependency change may make the import
unresolvable even though the root manifest did not change. That is incompatible
with C7's clean-install, fail-closed package/watch enrollment.

C11 need not mandate those two libraries if Luna selects supported alternatives,
but it must require every parser the verifier imports to be a direct
devDependency with lock enrollment and a clean-install resolution mutation/probe,
or require a checked-in parser built only on directly owned dependencies. This is
a package/lock mechanic requirement, not a semantic seat.

## RED-6 — 31/17 totals do not freeze class membership

Every active row now has `semanticClass`, and a one-row relabel fails the declared
31/17 totals. A count-preserving swap of one base ID with one behavioral ID does
not. `machineLaw.activeSemanticClasses` stores only counts
(`GATE-SEMANTIC-ROSTER-C10.json:850-862`), so the verifier has no second machine
witness for exact membership and C9's partition mutation can still false-green.

The intended ordered class memberships at C10 hash to:

- base 31: `76e5592586cbdf15a7df592ab2b1a94c09e295ba5a301a15dba80051ccfc7e3a`;
- behavior 17: `d7741f075f3dcb5b260d32f03d5dc7568662efead611f31146b4ad0f629314be`.

Those are SHA-256 digests of `JSON.stringify(ids)` in active-array order after
filtering each class. C11 should freeze equivalent per-class ordered ID lists or
digests and require a two-row class-swap mutation to RED. This adds no partition
or budget; it makes C10's already-selected classification mechanically exact.

## Same-seat and boundary disposition

All ten declared C10 detector redresses belong inside their existing semantic
seats. The missing Typewriter drain/cancellation proof is an eleventh redress in
its existing seat. Exact boot target/data lineage and token carrier grammar also
strengthen existing rows. Parser dependency ownership and class digests are
mechanic/schema laws and consume no Vitest seat.

C11 should preserve C10's passing bytes, keep `48+4+1=53 <=60`, change the
pre-binding redress count to eleven, and close RED-2 through RED-6 before separate
adjudication. No C10 or this critic authorizes a source repair, mechanic, package
cut, downstream repin, shim, receiver action, browser credit, P-EX1 close or
tranche close.
