# Gate semantic-roster C10 exact-byte critic C

## Verdict

**RED / C10 MUST NOT BIND THE LUNA MECHANIC.** C10 repairs the five recorded
C9 detector/class defects materially, and its capacity arithmetic remains
sound. It still freezes four acceptance holes:

1. one adjacent active predicate, Typewriter reduced-motion completion, can
   false-green a delayed duplicate completion;
2. the async-shell redresses prove only that *some* dynamic loader exists, not
   that each governed binding loads its required module, and do not falsify an
   unrelated eager `loadingComponent`;
3. the token-backing redress does not machine-define the live TS/Vue class
   carriers that must count while inert strings and template decoys must not;
   and
4. the required SFC/CSS parsing stack is not owned directly by the package, so
   a clean installation may depend on an incidental transitive hoist.

This is a formation-only exact-byte critic. It changes no product, test,
package, lock, consumer, browser, gate-mechanic, source pin, reservation or
acceptance byte. It adds no semantic seat. C10 remains a candidate and grants no
Luna implementation, package, repin, P-EX1 or tranche-close authority.

## Frozen inputs and cursor

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
- `tests/components/custom/typewriter/TypewriterText.contract.test.ts`
  SHA-256
  `6a1a86528690440227ed440284a3f44281804fa45d82068f5f9b6f990511b4f5`
- `src/components/typewriter/composables/useTypewriter.ts` SHA-256
  `aad8eeda1d2a9ac7ea7e73fdabea86ce3b3a919474fafa6cf740693911ac322f`
- `demo/shell/AppShell.vue` SHA-256
  `55db00b0fe5ef344e4bec20e1a67f999fa9b32f912026d63e5c5f9628eb74a3f`

The unrelated dirty `supportsBackdropRefract.ts` and tranche formation files
were not used as source authority and were not changed.

## Exact structure that passes

The JSON parses at schema version 2. Across active, reserved and external
partitions it has 64 rows and 64 unique IDs. Every active/external source path
that should already exist resolves at the pinned cursor.

| law | reproduced result |
| --- | ---: |
| active Vitest | 48 |
| hard reservations | 4 |
| conditional reservations | 1 |
| worst counted case | `48 + 4 + 1 = 53` |
| remaining below 60 | 7 |
| external enforcement | 11 |
| `base-product-tooling` | 31 |
| `component-behavior` | 17 |
| nested pre-binding redresses | 10 |

Every active row has exactly one admitted `semanticClass`, and the measured
31/17 split equals `machineLaw.activeSemanticClasses`. This correctly remains a
subclassification of C7's one `activeVitest` partition rather than a fourth
counted partition. Every current redress object says `phase: pre-binding`, names
Luna x-high, supplies a mechanism and supplies mutations. The Button row carries
one explicit registration-title migration; Typography carries one keep/delete
transform. Those facts cure C9's prose-only class defect and make the intended
same-seat migration representable.

C10 also cures the known C9 mechanisms in direction:

- Button now requires the owned stylesheet selector and a later-rule retake
  check rather than treating DOM class retention as painted-size survival;
- token backing rejects comment/inert-text witnesses in principle;
- the three multiline boot-import holes are assigned parser-backed redresses;
- radius/blur and type-declaration hygiene are assigned declaration parsers;
  and
- the utility predicate is narrowed to the `.vue`/`.ts` source and demo channel
  actually walked today. No `.tsx`, `.mts` or `.cts` file currently exists in
  those roots.

The preserved C9 title, Unicode, case-identity, digest, typography, reservation
and external-edge corrections were not contradicted by this pass. The reported
243-pass/two-fail targeted canary is consistent with active-but-not-currently-
green roster membership: the committed W8 root exports remain absent from the
surface expectation and `dist-demo` remains stale. Neither failure changes the
formation arithmetic, and neither earns implementation credit.

## RED-1 — “completes exactly once” is not observed after pending work

The active row `behavior.typewriter.prm-midflight-settle-once` claims:

> A live reduced-motion transition settles an active typing pass immediately
> and completes exactly once.

The governed test starts typing without awaiting the returned promise, fires
the media-query listener, and immediately asserts the final text, stopped flag
and one callback (`TypewriterText.contract.test.ts:144-150`). It never advances
the fake-timer queue after the transition and never awaits the original
`startTyping()` promise. Its `afterEach` stops the effect scope before restoring
real timers (`:10-14`), and scope disposal calls `stopTyping()`. That cleanup can
cancel pending work before the test observes it.

The production implementation is correct today because `settleReducedMotion()`
calls `stopTyping()` (`useTypewriter.ts:315-327`), which cancels and clears the
current token (`:308-313`). The governed body does not prove that cancellation.
An exact falsifier is to preserve the immediate final state and immediate
`onComplete`, but omit current-token cancellation during PRM settlement. All
assertions at `:148-150` still pass. The queued typing pass can later reach the
ordinary completion callback at `useTypewriter.ts:289-296`; test teardown can
mask it before any assertion runs.

Required replacement: add an eleventh same-seat `requiredDetectorRedress` to
this row and update the machine redress count to eleven. Capture the original
typing promise, trigger PRM mid-flight, drain/advance all pending timers, await
that promise, and then prove final text, stopped state and exactly one callback.
A mutation that omits cancellation while retaining immediate settlement must
RED; scope teardown must occur only after the post-drain assertions. This adds
no counted seat.

## RED-2 — async binding identity does not include module identity

C10's `gate.boot.source.async-declarations` mechanism requires top-level
`Aurora` and `PresetEditor` bindings initialized by real `defineAsyncComponent`
calls with dynamic-import loaders. Its case identity contains only the two local
binding names. The mutations replace the constructor, replace dynamic import
with an eager value, plant text, or remove a binding
(`GATE-SEMANTIC-ROSTER-C10.json:323-345`). No machine byte requires the loader
specifier belonging to either binding.

At the pinned source the intended bijection is exact:

| binding | required dynamic module |
| --- | --- |
| `PresetEditor` | `./configurator/PresetEditor.vue` |
| `Aurora` | `@glass/components/aurora/Aurora.vue` |

Swapping those loader targets, or replacing either with a different dynamically
imported Vue component, leaves two named top-level bindings, two genuine
`defineAsyncComponent` calls and two dynamic imports. It can therefore satisfy
the declared C10 mechanism while violating the boot boundary the row is admitted
to govern. The static-import exclusion rows remain GREEN as well.

The adjacent frame-zero mechanism says the Aurora boundary owns “a real
`loadingComponent` reference to the eager wash” but does not encode the wash's
semantic identity. The current boundary's loading component actually invokes
the imported `auroraFallbackGround` and paints its background fields
(`AppShell.vue:66-86`). Replacing it with an unrelated eager component is absent
from the mutation matrix. A detector that checks only a syntactically real
`loadingComponent` option can false-green.

Required replacement: bind each local name to its exact resolved dynamic module
specifier (or exact resolved file identity), and prove the `defineAsyncComponent`
callee resolves to Vue's imported binding rather than a shadow. Add wrong-target
and swapped-target mutations. For frame zero, bind the loading component to the
imported `auroraFallbackGround` dataflow used by the Aurora wash, and add an
unrelated-eager-component plus shadowed-ground mutation. These strengthen the
existing boot seats; they do not add seats.

## RED-3 — the live arbitrary-property writer channel is not defined

The token predicate now says every published name has a parsed **live** source
definition while comments, inert strings, templates and dead text do not count.
Its redress says to parse “the admitted live Vue/TypeScript arbitrary-property
writer channels” (`GATE-SEMANTIC-ROSTER-C10.json:31-44`). Neither the row nor a
top-level schema field enumerates the admitted carrier ASTs, binding roots or
reach rule.

That omission is load-bearing. Real writer bytes are themselves strings:

- `src/components/_shared/control-size.ts:4-6` stores live class strings in a
  size table;
- `src/components/dialog/DialogContent.vue:228,273` stores live class strings in
  script constants; and
- `src/components/select/SelectContent.vue:117`,
  `src/components/drawer/DrawerHeader.vue:19`,
  `src/components/drawer/DrawerFooter.vue:19` and
  `src/components/tooltip/TooltipContent.vue:49` carry live writers in Vue
  class bindings/arrays.

The published `--overlay-pad-inline` and `--overlay-pad-block` names have no
ordinary `.css` declaration in the current source corpus; their backing depends
on recognizing those live class carriers. A generic literal scan repeats C9's
dead-string false-green. Rejecting strings/templates categorically rejects the
real writers. Merely parsing syntax cannot decide runtime reach without declared
carrier contexts or binding resolution.

Required replacement: machine-declare the admitted writer grammar and roots,
for example static Vue `class`, resolvable Vue `:class` arrays/objects, and exact
TS bindings that flow to governed class/variant consumers. Require the detector
to resolve those carriers. Add paired mutations that (a) leave identical writer
text only in an unreferenced constant/comment/template and RED, (b) move the same
text through each admitted live carrier and remain GREEN, and (c) remove the
last live carrier while retaining all inert copies and RED. Alternatively narrow
the public-token law to CSS declarations and migrate the two overlay tokens to
that source of truth. The present phrase “admitted live channel” is not itself a
machine admission rule.

## RED-4 — parser imports are not directly reproducible

C10 requires Vue-SFC plus TypeScript parsing for AppShell/eager-shell redresses
and CSS/Vue declaration parsing for hygiene. `package.json:561-584` directly
declares `typescript`, but it does not declare `@vue/compiler-sfc` or `postcss`.
`npm ls --depth=1` currently resolves:

- `@vue/compiler-sfc@3.5.40` below `vue@3.5.40`; and
- `postcss@8.5.19` below `@tailwindcss/postcss` and `vite`.

Those packages are present in the current npm layout and lockfile, but a root
verifier/test importing them would rely on transitive hoisting. Their parents do
not grant this package an API dependency on those parser packages, and another
valid layout may nest them where a root import cannot resolve. C7 requires the
same verifier to fail closed before `test`, `iter-test` and watch reruns; an
incidental parser resolution is incompatible with that reproducibility law.

Required replacement: state that every parser imported by the implementation is
a direct devDependency with lockfile enrollment and a clean-install resolution
probe, or require a checked-in/local parser that uses only directly owned
dependencies. The adjudication need not prescribe PostCSS if Luna selects a
different CSS parser, but it must forbid undeclared transitive-parser reliance.
Adding a parser dependency changes package/lock bytes, not the semantic-seat
count.

## C7, package and atomicity disposition

C10's intended redresses can still land atomically without adding Vitest seats:
they strengthen existing registration bodies and their ordinary detector bites
remain outside the denominator. The corrected count would be 48 active semantic
IDs, the same five reservations and eleven external rows, with **eleven**
pre-binding redresses. C7's `48 + 4 + 1 <= 60` law is unchanged.

The future mechanic must still implement C7's one literal
`governedInvariant("id", ...)` binding, exact ID/file/case resolution, all
fourteen deletion/admissibility/enrollment mutations, and one fail-closed
verifier before all three roots:

```text
test            = verifier && full Vitest
iter-test       = verifier && full Vitest
iter-test-watch = initial verifier + same verifier on every rerun + watch Vitest
```

Current `package.json` still invokes bare Vitest for those roots. That is
consistent with `IMPLEMENTATION-ABSENT`, not an acceptance defect in itself.
C10 does not conflict with C7 or the C7 package/watch law; it is RED because its
semantic input is not yet complete enough for that mechanic to bind exactly.

## Required next formation cut

A replacement C11 should preserve all passing C10 bytes except the exact
redresses above:

1. add the Typewriter post-timer/post-promise exact-once redress and count it;
2. bind async local names to exact loader targets and frame-zero wash lineage;
3. encode the admitted live arbitrary-property writer carrier law and paired
   live/dead mutations; and
4. add direct parser-dependency/lock/clean-install law or a local-parser law.

Then freeze the replacement JSON and note, obtain the required independent
unchanged-byte critics, and adjudicate separately. No product redress, mechanic,
package cut, downstream repin, consumer action, browser credit or tranche close
precedes that formation step.
