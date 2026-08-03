# C9 semantic-roster exact-byte critic B

## Scope and frozen inputs

This is a formation-only, read-only audit of:

- `GATE-SEMANTIC-ROSTER-C9.json`, SHA-256
  `cbcb2ac756858546dc61814500aa69255d834b18301533040bf31c293cb5ce20`;
- `GATE-SEMANTIC-ROSTER-ADJUDICATION-C9.md`, SHA-256
  `8734c3fa9f5d1fbf26f222c7a22a8a9ef9407ec0bab722a6d57980b0abe0da86`;
- committed HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

The source witnesses used below are unchanged from that committed cursor except
where the repository status already records unrelated moving work. Relevant
committed/current file identities are:

| witness | SHA-256 |
| --- | --- |
| `tests/components/ui/reka-binding-idiom.test.ts` | `61167f849841c5eb9323e36db4463e363b93b944ae46f913665657a458672b12` |
| `src/components/button/styles.css` | `34ec22e682967da5d1294a429584aaf9090d37b3c78b897f28ed20b920cffc44` |
| `tests/styles/token-graph.test.ts` | `8f00878b689a6862a8af5d1fe91da5f75449de0fdf6959d78492ff6f255a67ae` |
| `tests/gates/boot-graph.test.ts` | `9819407287bddb8d64cde6794e4c2a73fcc8e5994c43b12d9cd6b65bf899b685` |
| `tests/gates/token-hygiene.test.ts` | `4ca8c7ec33f76cf0b2c9c6278bf4c24ea583a1bdbd6f788d1820669aa90d660f` |
| `tests/gates/type-hygiene.test.ts` | `b83a430ad69e926005031deb2bbc12626da67192c0be3eaeed27aa8a14e9d5f2` |
| `tests/styles/typography.test.ts` | `29dd87f9c1398463bc1d95c756e104584581606c558cc2e194fe7f2b7e5f3d28` |
| `package.json` | `3a0618a72dc56c18589546b84960140d42fe6c548757499e4e967ede743b8e61` |
| `vitest.config.ts` | `3d5c17e2bdee7397019f55d2a12a399439e838a64cec678ca56a407fe0bd861d` |

## Verdict

**RED / C9 MUST NOT BE CONSUMED AS THE EXACT LUNA INPUT.** C9 correctly
redresses the C8 selector, Pager, Accordion, NumberField, typography and broad
CSS-closure defects, and its total capacity arithmetic is sound. It still
freezes four classes of semantic/mechanical overclaim:

1. the new seventeenth Button predicate does not observe the CSS failure class
   used to justify its seat;
2. the asserted `31 + 17` subpartition and required partition mutation are not
   represented in the machine roster;
3. the corrected token-backing predicate still admits comment/inert-text
   witnesses as definitions; and
4. three boot-source predicates plus the standing hygiene predicates exceed
   the line-oriented detectors they would govern.

These are roster-definition defects, not requests to change product source in
this critic. A corrected roster/adjudication must be refrozen before mechanics.

## Pass 1 — structure, capacity and case identity

The following C9 claims reproduce exactly:

- 48 active rows, four hard reservations, one conditional Form-B reservation,
  eleven external rows, 53 worst-case counted seats and seven seats free;
- 64 globally unique IDs and 28 distinct active source paths;
- all 48 `currentRegistration` strings occur exactly in their declared source;
- the exact 48-key subpath digest is
  `118e091405270a3e1fa2ae9aea24c3805acc1a7a6a087dfd6c247e2f19776252`;
- the exact eight-preset spring digest is
  `ef2496ddaffbb7ef1a1efba36941c18440b83eb6ba8a7332d193877a7a297f7f`;
- Pager now carries the actual `slide-panel-0/1/2` values; and
- the eager-shell row now names AppShell, SidebarDock and BottomDock.

The external eleven also have real cited edges: packed-export verification;
eight selected `*.public-contracts.test-d.ts` files through typecheck, CI and
release; Aurora green/planted through the pre-tag release script; and Blob
green/planted through CI. The separate Dock-crossfade readonly type fixture
remains ordinary typecheck coverage. Refraction remains correctly classified as
browser debt without a machine CI/release edge.

The active/reserved capacity law inherited from C7 is therefore sound:
`48 + 4 + 1 = 53 <= 60`. No lower bound is invented.

## Finding 1 — the Button seat is still predicate-RED

C9 changes the row to `behavior.button.host-icon-class-survival` and claims:

> A host-sized Button icon survives the owned default icon rule.

The adjudication justifies the seat as protection against consumer icon sizing
being silently overwritten by that rule. The governed body does not observe
that failure class. `reka-binding-idiom.test.ts:28-36` only proves that the SVG
still carries class `size-9` and that the Button host has two data attributes.
It does not read the Button CSS, computed size, selector match or geometry.

The relevant production rule is separate at `button/styles.css:35-37`:

```css
.button > svg:not([class*="size-"]) {
    inline-size: var(--ui-glyph);
    block-size: var(--ui-glyph);
}
```

An exact born-RED falsifier is to restore an unconditional selector:

```diff
-.button > svg:not([class*="size-"]) {
+.button > svg {
```

The `size-9` class and both asserted Button attributes remain byte-identical, so
the selected Vitest body stays GREEN while the default rule again owns the
icon's painted size. This contradicts both the C9 predicate and its stated
distinct failure-class rationale.

The authority claim is also too strong. BAND-GATES:82-83 names the
`reka-binding-idiom.test.ts` file specifically for the stale ReKa
`:pressed`/search/`tag=` prop/emit class; it does not explicitly name this Button
CSS row. The general behavioral-core clause may authorize a Button predicate,
but only one whose assertion body bites its stated behavior.

Required redress: either narrow the row and rationale to the DOM fact actually
proved (consumer `size-*` class preservation), then re-adjudicate whether that
fact merits a governed seat, or specify a body migration that proves the
default-rule exclusion/paint outcome and its restoring mutation.

## Finding 2 — `31 + 17` is true by manual classification but absent from the machine law

Manual classification reproduces 31 base/tooling rows and 17 behavioral rows:
Button plus the sixteen later component cores. This is semantically coherent.
It is not mechanically represented by C9.

C7 defines exactly three machine partitions—active Vitest, reserved Vitest and
external enforcement—and says its only numeric law is
`active + reserved <= 60` (`GATE-SEMANTIC-ROSTER-ADJUDICATION-C7.md:64-81`).
C9 may add a base/behavior subpartition, but its JSON contains only a flat
`activeVitest` array and a single `activeVitest: 48` count. No row has a
`kind`/`partition` field and no `31` or `17` count exists.

The split cannot be inferred from IDs: only nine of the seventeen use a
`behavior.*` prefix; `field`, `number`, `pager`, `slider`, `sortable`, `tags`,
`tooltip` and `typewriter.at` form the other eight, while four `reka.*` rows are
classified in the base 31. Exact roster hashing detects byte movement, but it
cannot validate a classification that has no bytes.

Consequently C9's implementation requirement to pass a `partition` mutation is
undefined and cannot be implemented from the declared machine input. Required
redress: either encode a validated `kind` per active row plus `31/17` counts, or
make the split explanatory/non-normative and remove it from the numeric contract
and mutation list. The C7 capacity law itself remains GREEN either way.

## Finding 3 — token backing still admits comment decoys

C9 correctly replaces the false “exactly one declaration” law with unique
published names plus at least one source definition. The current detector still
does not prove that predicate.

`token-graph.test.ts:17-21` strips comments only from the CSS string used for
CSS-declaration parsing. Its second definition channel is built from the
unstripped concatenation of every CSS/TS/Vue source file at `:14-16`, then
accepts any lexical `/\[(--token):/` match at `:31-34`. A comment, inert example
or dead string therefore counts as a source definition.

Born-RED falsifier: remove the last real arbitrary-property writer for a
published token while leaving or planting `// [--that-published-token:` in any
scanned TS/Vue file. `definedTokens` still contains the token and the governed
registration stays GREEN although no live definition remains.

Required redress: parse the admitted live arbitrary-property writer channel (or
at minimum strip comments and reject inert text with mutation proof), or narrow
the roster predicate honestly to lexical backing and explain why that weaker
predicate remains load-bearing.

## Finding 4 — boot predicates remain broader than their line scanners

C9 appropriately narrows the first boot row from dynamic reach to absence of a
prohibited top-level static import, narrows Aurora provenance to no barrel value
import, and adds the three eager module identities. All three underlying
detectors remain single-line regular expressions:

- `scanStaticShellImports` splits by newline and requires `import ... from` on
  one line (`boot-graph.test.ts:106-128`);
- `scanAuroraBarrelImports` does the same (`:135-153`); and
- `scanConfiguratorBarrelImports` does the same and accepts only the exact
  one-/two-dot `configurator` spelling (`:161-184`).

These ordinary legal imports evade the governed predicates:

```ts
import {
    Aurora,
} from "@glass/components/aurora";

import {
    DEFAULT_AURORA_CONFIG,
} from "@glass/components/aurora";

import {
    useConfiguratorOpen,
} from "./configurator";
```

No individual line satisfies the detectors' full regex. The async declaration
can remain present, so the adjacent declaration row also stays GREEN. Adding
module case keys protects table shrink; it does not cure import parsing.

Required redress: record a source-detector migration to a real TS/Vue import
parser with multiline/alias mutations, or narrow these predicates to the
line-scanner approximation. The latter would not protect the boot-graph defect
the rows are admitted to govern.

## Finding 5 — hygiene predicates need the same detector/body boundary treatment

The C9 row `gate.token-hygiene.clean` says source carries no off-ladder radius or
backdrop-blur declaration. `scanTokenHygiene` splits source by newline and runs
each property/value regex on one line (`token-hygiene.test.ts:67-96`). Both of
these remain invisible:

```css
.a {
    border-radius:
        999px;
    backdrop-filter:
        blur(9px);
}
```

Likewise, `scanTypeDeclarations` is line-oriented
(`type-hygiene.test.ts:93-105`), so `font-size:\n 13px` and
`letter-spacing:\n 0.1em` evade the two governed declaration predicates. The
utility row additionally walks only `.vue` and `.ts` despite the roster's
unqualified “Source and demo” wording (`:131-134`). Current planted self-tests
exercise only same-line declarations.

These are not reasons to budget the planted detector tests as semantic seats;
they are reasons the selected semantic rows need truthful scopes or an explicit
detector migration with multiline/channel mutations before their IDs are bound.

## Typography migration transform

C9's typography correction is sound as formation direction. The future cut
must not wrap the current body whole. It must retain:

- the computed `ratio ~= 1 / sqrt(phi)` relationship; and
- the headline-to-kicker dependency.

It must delete the exact `0.7861513777574233` terminal mirror and the unrelated
exact leading pin. This matches BAND-GATES' keep/kill law. The transform is not
current implementation or GREEN credit; a mutation restoring either deleted
assertion must fail the migration proof.

## Current execution and adoption boundary

No `governedInvariant` binding or roster verifier exists. Current package roots
remain:

```text
test            = vitest run
iter-test       = vitest run --reporter=verbose
iter-test-watch = vitest --watch
```

That is consistent with C9's `IMPLEMENTATION-ABSENT / ACCEPTANCE-RED` posture.
C7's deletion-sensitive package/watch law remains required: one fail-closed
verifier before all three commands, the same watch rerun implementation, and
the fourteen exact mutations including verifier/enrollment deletion and an
ordinary unrostered failing regression.

A contemporaneous roster-targeted Vitest canary reported 243 passing and two
failing registrations. `surface.root.exact` currently sees committed root
exports `armGlassRefract` and `supportsBackdropRefract` that its expected list
omits; boot build freshness sees a stale `dist-demo`. These failures do not
invalidate active-seat membership—“active” means present/enabled, not GREEN—and
C9 does not claim otherwise. They do prohibit treating roster formation or a
future mechanic-only cut as product/package acceptance.

No package cut, browser credit, consumer repin, adoption, P-EX1 close or tranche
close follows from this critic.

## Required next disposition

1. Keep C9 immutable as historical rejected formation input.
2. Refreeze the machine roster and adjudication after resolving Findings 1-5.
3. Make the base/behavior split either machine-readable or explicitly
   non-normative.
4. Preserve the C9 typography transform, corrected case identities,
   reservations, external edges and `53 <= 60` capacity law.
5. Only then may declared Luna x-high implement the governed binding/verifier.
6. Run two fresh unchanged-byte Sol x-high critics after that mechanic cut; this
   formation critic is not one of those post-cut acceptance critics.

No product, test, package, lock, consumer or gate-mechanic file was changed by
this audit.
