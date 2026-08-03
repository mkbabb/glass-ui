# Gate semantic-roster C9 exact-byte critic A

## Verdict

**RED / REPLACEMENT ROSTER REQUIRED.** C9 is structurally consistent and repairs
most of the recorded C8 defects, but it is not exact formation authority. Four
blocking defects remain: the token backing detector admits comment decoys; three
boot import predicates exceed their line-oriented scanners; the Button row does
not test CSS class survival and is not explicitly named by BAND-GATES; and C9's
new `31+17` semantic subpartition is not represented in the machine input even
though the adjudication requires a partition mutation.

This is a formation-only critic. It changes no product, test, package, lock,
consumer, gate-mechanic, source pin, receiver, row, browser, or acceptance byte.
It grants no Luna, package, browser, consumer, P-EX1, or tranche credit.

## Frozen inputs and cursor

- `GATE-SEMANTIC-ROSTER-C9.json` SHA-256
  `cbcb2ac756858546dc61814500aa69255d834b18301533040bf31c293cb5ce20`
- `GATE-SEMANTIC-ROSTER-ADJUDICATION-C9.md` SHA-256
  `8734c3fa9f5d1fbf26f222c7a22a8a9ef9407ec0bab722a6d57980b0abe0da86`
- recorded C8 defects: `GATE-SEMANTIC-ROSTER-C8-EXACT-CRITICS.md`
  SHA-256
  `5afacf3c715c21b166f38445851ce590f81ec3c396d43219f0815dc7837c275f`
- committed source authority: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`

All source comparisons below read committed bytes with `git show`, not the dirty
working tree.

## Exact checks that pass

| check | reproduced result |
| --- | --- |
| JSON/schema shape | schema version 1; seven exact top-level fields; 48 well-formed active rows; five reservation rows; eleven external rows; nineteen case-identity rows; one migration transform |
| counted arithmetic | `48 active + 4 hard + 1 conditional = 53`; `60 - 53 = 7`; eleven external rows remain outside the denominator |
| global identity | 64 rows and 64 unique IDs across active, reserved, and external partitions |
| source selectors | 28 unique active source paths; every active and external source path exists at the committed cursor |
| registration identity | all 48 `currentRegistration` values resolve exactly once as committed `it`/`test` titles, including `it.each(...)` call chains |
| Unicode titles | source-exact `ζ` and `1/√φ` are restored |
| subpath cases | 48 ordered `subpath:symbol` keys; SHA-256 of `JSON.stringify(keys)` is `118e091405270a3e1fa2ae9aea24c3805acc1a7a6a087dfd6c247e2f19776252` |
| spring cases | `smooth,snappy,bouncy,gentle,dock,press,panel,orb-drop`; SHA-256 of `JSON.stringify(keys)` is `ef2496ddaffbb7ef1a1efba36941c18440b83eb6ba8a7332d193877a7a297f7f` |
| explicit case identities | all nineteen entries match the committed fixture/assertion bodies; in particular Pager is `slide-panel-0/1/2`, the eager-shell table is AppShell/SidebarDock/BottomDock, Accordion is alpha-linkage/alpha-to-beta/beta-collapse, and NumberField is initial `1,5`/`1.5` plus edited model `2.5` |
| typography split | committed `tests/styles/typography.test.ts:13-23` contains the computed `1/√φ` relationship and headline-to-kicker dependency separately from exact `0.7861513777574233` and leading `1` pins; C9's keep/delete transform addresses the C8 migration defect |
| reservations | exactly four hard and one conditional reservation; all three named future gate paths remain absent at the committed cursor |
| external enforcement | all eleven source paths exist; `verify:package`, typecheck/`tsconfig.test.json`/CI/release, Aurora release green+planted, and Blob CI green+planted enrollment witnesses reproduce exactly |
| unchanged external/reserve law | C8-to-C9 canonical JSON diff changes no reservation, external-enforcement, or ordinary-test-law byte |

The source bodies also support C9's narrowed CSS-reach, Accordion, and NumberField
predicates. Active roster membership is not a claim that every current test run is
green; the C9 adjudication correctly remains `IMPLEMENTATION-ABSENT /
ACCEPTANCE-RED`.

## RED-1 — token backing still admits a non-definition

C9 says every published name has at least one **source definition**
(`GATE-SEMANTIC-ROSTER-C9.json:22-26`). The committed detector strips comments
only from its CSS declaration corpus (`tests/styles/token-graph.test.ts:17-27`).
Its second source channel scans the unstripped concatenation of every CSS/TS/Vue
file with `/\[(--[\w-]+):/g` (`:14-16,31-34`). Therefore a comment such as
`// [--semantic-decoy: arbitrary]` contributes `--semantic-decoy` to
`definedTokens`. Removing a real arbitrary-property definition and leaving that
comment can keep the governed assertion at `:37-40` green.

The C8 “Map overwrites duplicate declarations” defect is narrowed, but the C9
claim “at least one source definition” remains stronger than the current body.
A replacement must either repair and bite the comment/string decoy channel or
freeze only the exact scanner result without calling every match a definition.

## RED-2 — the Button row observes a class, not CSS survival

The registered body mounts `<svg class="size-9">` and asserts that the DOM class
is present plus two Button host attributes
(`tests/components/ui/reka-binding-idiom.test.ts:28-36`). It reads neither the
owned stylesheet nor computed icon dimensions. The load-bearing CSS exception is
`.button > svg:not([class*="size-"])` in
`src/components/button/styles.css:30-38`. Deleting `:not([class*="size-"])` or
adding an overriding width rule leaves every assertion in the governed body
unchanged while reopening the stated sizing failure.

Thus `behavior.button.host-icon-class-survival` and its predicate
(`GATE-SEMANTIC-ROSTER-C9.json:54-58`) still overclaim rendered CSS behavior. The
C9 adjudication additionally says BAND-GATES “explicitly names that canary”
(`GATE-SEMANTIC-ROSTER-ADJUDICATION-C9.md:32-36`), but BAND-GATES names the whole
ReKa prop/emit file and specifically the `:pressed`, search-model, and `tag=`
silent-no-op class (`BAND-GATES.md:82-83`); it does not name the Button icon row.
The general behavioral-core clause at `:85-86` cannot substitute for an assertion
body that does not exercise the claimed failure.

The replacement must remove this governed seat or give it a predicate/body and a
mutation that actually fail when the CSS exception is defeated.

## RED-3 — three boot predicates false-green on valid multiline imports

The three committed scanners split source by newline and require `import`, the
complete clause, `from`, and the specifier on one physical line:

- `scanStaticShellImports`, `tests/gates/boot-graph.test.ts:106-129`;
- `scanAuroraBarrelImports`, `:135-153`; and
- `scanConfiguratorBarrelImports`, `:161-184`.

Their self-tests plant only one-line imports (`:333-375`). Each scanner returns
zero violations for the corresponding valid formatted import:

```ts
import {
    Aurora
} from "@glass/components/aurora";
```

The same false-green exists for a multiline `DEFAULT_AURORA_CONFIG` barrel import
and a multiline `useConfiguratorOpen` configurator-barrel import. Consequently
C9's general absence predicates for `gate.boot.source.async-components`,
`gate.boot.source.no-aurora-barrel-value-import`, and
`gate.boot.source.no-config-barrel` (`GATE-SEMANTIC-ROSTER-C9.json:198-205,
226-240`) still exceed the bodies they govern. The restored three-file case table
does not cure the grammar hole.

A replacement must either bind predicates explicitly to the limited line scan or,
preferably, require parser-backed import resolution plus multiline planted bites.
The adjacent async-declaration row is not implicated by this finding.

## RED-4 — C9's new `31+17` class is prose-only

C7's mandatory machine law defines exactly three top-level partitions—active,
reserved, and external—and only `active + reserved <= 60` is numeric. On that
older law alone, a base/behavior class field is not required. C9, however, adds a
specific `31 base/tooling + 17 behavioral` table, calls it the truthful semantic
partition, and requires a C9 “partition” mutation
(`GATE-SEMANTIC-ROSTER-ADJUDICATION-C9.md:19-38,73-74`).

The C9 JSON is one flat `activeVitest` array. No row has a class field; no count
field records 31 or 17; only nine IDs begin `behavior.`; and the intended seventeen
can be recovered only by importing C8's prose enumeration of sixteen cores and
then applying C9's prose-only Button reclassification. Array order cannot encode
the class because Button remains row 5 while the former sixteen cores are rows
33-48.

Therefore the three C7 top-level partitions are exact, but C9's additional
subpartition and its mutation are not machine-verifiable from the claimed machine
input. A replacement must encode the class/count explicitly or withdraw the
31/17 machine requirement. Given RED-2, it must also re-adjudicate whether Button
belongs in the behavioral class at all.

## C8 defect disposition

The Unicode selectors, Pager keys, eager-shell case table, CSS-reach narrowing,
Accordion narrowing, NumberField narrowing, and typography migration split are
resolved. The token correction is incomplete under RED-1; the boot/Aurora
corrections are incomplete under RED-3; and the Button correction introduces the
RED-2 assertion-truth and RED-4 machine-class defects. C9 therefore cannot be the
unchanged input to Luna.

No source correction, roster replacement, mechanic, package cut, downstream
repin, shim, receiver action, row action, or acceptance action is authorized by
this critic.
