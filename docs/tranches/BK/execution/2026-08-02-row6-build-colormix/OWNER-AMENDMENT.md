> **[2026-08-03 VOID-CHRONOLOGY HEADER (driver): this amendment was adjudicated end-to-end by the delegated-then-revoked Sol/Luna seats; it is citable as chronology only, never as authority — cursor ⊕¹⁴.]**

# Row 6 owner amendment — existing CSS minifier core

This is a bounded authority amendment inside the active `W-BUILD-COLORMIX`
owner. It is not a new row, wave, gate, registry, verifier, lifecycle, or release
surface.

## Immutable intake

- source HEAD: `04fdfe913aea0e3d3e19665130ced69738b41890`
- source tree: `9be9729a19cdc2bb705623430fc066dff87b8c95`
- `scripts/lib/minify-css.mjs` before SHA-256:
  `1f408a818543559c442cf60c40c06596f779839999fe9c2aeb128710bcee700d`
  (`4,925` bytes, `124` lines)
- `tests/styles/backdrop-prefix-normalization.test.ts` before SHA-256:
  `bdb294ab366589d969cfde98e8a32b38ac9fe0f6cecb562f378043376ea18b62`
  (`4,188` bytes, `92` lines)
- `.bundle-ratchet` remains read-only. The current exact package candidate is
  `898,602` bytes against the authenticated `898,326`-byte datum.

## Admission

Row 6 admits exactly these two additional writable files:

1. `scripts/lib/minify-css.mjs`
2. `tests/styles/backdrop-prefix-normalization.test.ts`

The sole permitted product change is a conservative refinement of the existing
`BG.W-CSS-MINIFY/F8.4` string-aware lexical pass: pending whitespace may be
omitted only beside unescaped structural `{`, `}`, `;`, and `,` delimiters.
Outside-string CSS escapes must be copied as one protected token, including hex
escapes and their optional whitespace terminator. Strings, URLs, comments as
token separators, descendant selectors, pseudo selectors, function separation,
calculation operators, custom-property token streams, Tailwind directives,
`@supports`, and the ordered WebKit/unprefixed declaration pair remain intact.

This existing minifier is already consumed by `publishStyleAssets()` in the one
full/iter/watch lifecycle. No caller, lifecycle, manifest, dependency, public
surface, source stylesheet, or paint behavior is admitted. The Row 8 source
contract and terminal intake remain frozen; this amendment neither reopens nor
rewrites them.

## Acceptance and stop law

- focused hostile lexer coverage, structural PostCSS equivalence, ordered
  WebKit-pair preservation, and idempotence pass;
- full, iterative, and watch outputs retain exact CSS identity under the shared
  lifecycle;
- the existing package verifier passes at `<= 898,326` bytes without changing
  `.bundle-ratchet`;
- any string/URL byte change, escape corruption, selector/calc token change,
  prefix/fallback loss, lifecycle divergence, or package excess is first-RED and
  stops this coordinate.

Two independent `gpt-5.6-sol` `xhigh` read-only passes preceded this admission.
One allowed the bounded existing-core refinement; the hostile pass rejected
regex/global trimming, required escape-aware delimiter recognition, and reduced
the admitted rule to the four delimiters above. A third Sol census identified
the prior Row 8 writable-list collision. This amendment resolves only that exact
collision. No execution or release credit is banked by this document.

## Fresh Sol design — flat dock-plate crossfade

Pinned to source HEAD `04fdfe913aea0e3d3e19665130ced69738b41890` (tree
`9be9729a19cdc2bb705623430fc066dff87b8c95`), this fresh Sol design authorizes one
bounded product cure: `.dock-plate` remains the sole backdrop, clip, pointer-absorption,
and grain root; its collapsed `::before` and exactly one `aria-hidden`
`.dock-plate-expanded` child own flat rung paints and crossfade by complementary
opacity from the existing `--dock-expand-t` only. Endpoint variables read the public
glass background/border rungs directly, with adaptive tint kept as a separate ordinary
gradient. State and vertical rules retarget both endpoints; no prop, clock, context,
utility, API, or endpoint-test edit is admitted.

The exact expanded writable set for this cure is:

1. `docs/tranches/BK/execution/2026-08-02-row6-build-colormix/OWNER-AMENDMENT.md`
2. `src/components/dock/GlassDock.vue`
3. `src/components/dock/styles/dock.css`
4. `src/components/dock/styles/morph.css`
5. `src/components/dock/styles/shell.css`
6. `src/components/dock/styles/adaptive-legibility.css`

Every other path, including the disjoint endpoint test, remains read-only.

## V1 AMEND authority — frozen validator and separately owned build/lexer quartet

The frozen validator is `gpt-5.6-luna xhigh`, session
`019fc52b-0c51-79f0-9496-b549ee8615f9`. Its V1 result was RED: `1 failed / 5
passed`, first at `tests/styles/color-mix-endpoints.test.ts:204`, where the
reduced-transparency expected selector order contradicted the emitted parity
order. The completed Sol tasks were `/root/row6_v1_color_dock_hostile` and
`/root/row6_v1_build_minifier_hostile`.

This V1 AMEND admits exactly these four writable paths:

1. `docs/tranches/BK/execution/2026-08-02-row6-build-colormix/OWNER-AMENDMENT.md`
2. `src/components/_shared/field/field-surfaces.css`
3. `src/components/drawer/styles.css`
4. `tests/styles/color-mix-endpoints.test.ts`

The separately owned build/lexer quartet remains independently owned:

1. `demo/vite.demo-dist.config.ts`
2. `tests/demo-css-partition.test.ts`
3. `scripts/lib/minify-css.mjs`
4. `tests/styles/backdrop-prefix-normalization.test.ts`

The six Dock paths remain covered by the preceding Dock admission and were not
reopened by this V1 correction.

## V2 first-RED / AMEND — immutable style census boundary

The frozen V2 validator was `gpt-5.6-luna xhigh`, session
`019fc53e-4105-7880-a31b-a287978f272c`. The first-RED focused command stopped
when the current filesystem census reached `src/components/music-staff/MusicStaff.vue`
and then invoked `git show HEAD:path` for that current-only path: `1 failed / 5
passed` files and `1 failed / 11 passed` tests. Typecheck and build were not run.
The exact Sol xhigh read-only challenge was `/root/row6_v2_baseline_hostile`,
with verdict `AMEND`. Its census was `300` current CSS/Vue paths versus `298`
at HEAD; the current-only paths were `MusicStaff.vue` and `styles.css` under
`src/components/music-staff/`. No files were changed and no tests were run by
the reviewer.

This V2 amendment admits exactly these writable paths:

1. `tests/styles/color-mix-endpoints.test.ts`
2. `docs/tranches/BK/execution/2026-08-02-row6-build-colormix/OWNER-AMENDMENT.md`

The test keeps current collection on the live filesystem census and adds a
separate immutable `git ls-tree -r --name-only HEAD -- src` census, converting
both to the same absolute IDs. `collectStyles` receives its explicit path list
and reader; current uses the default filesystem reader, while every baseline,
including relative-alpha parity, uses the HEAD list and `headSource`. A compact
in-memory regression proves current-only CSS/Vue collection and analysis,
direct nested-endpoint detection, differing current-only relative color, HEAD
reader isolation, and visibility of an independently listed HEAD-only path.
There is no read fallback, existence probe, ignore list, or current-path
filtering by HEAD: HEAD-only deleted paths remain baseline-visible and
current-only paths remain fully inspected in current analysis.
The pre-existing context-string and global-producer model is unchanged.

This is harness authority only. No product, source-style, lifecycle, package,
release, or provenance surface is reopened; no execution or release credit is
banked. Tests, typecheck, build, package, browser, formatting, and git mutation
remain no-run under this amendment; only post-patch `git diff --check` and
read-only diff/status inspection are permitted.

## V3 first-RED / cure — reduced-transparency selector expectation

The fresh V3 validator was invoked as `gpt-5.6-luna xhigh`, CLI thread/session
`019fc54a-44cf-7221-b4f5-7998dadc3d35`. Focused five-file Vitest first RED:
`Test Files 1 failed (5)`, `Tests 1 failed/6 passed (12)`, first at
`tests/styles/color-mix-endpoints.test.ts:258`. Typecheck and build were not
run; the validator made no writes.

Cure (expectation only, one line): reorder the four expected reduced-transparency
selectors to `Select, Combobox, dark Select, dark Combobox` by swapping only the
`dark Select` and `Combobox` entries; no source/product or other test logic
changed.

No execution or release credit is claimed or banked by this note.

## V4 first-RED / AMEND — native nonmodal inert Booleanish rule

The V4 validator was invoked as `gpt-5.6-luna xhigh`, CLI thread/session
`019fc54c-cbe7-7c83-be6b-b47bcaba9ce3`. `git diff --check` was green and the
five focused files passed all `56` tests. `pnpm typecheck` was first RED on
`src/components/drawer/DrawerOverlay.vue`: the native nonmodal `div` used
`inert: "" | undefined`, invalid for Vue `HTMLAttributes` `Booleanish`.
The Sol xhigh task was `/root/row6_v4_drawer_inert_hostile`, with verdict
`AMEND`.

This V4 amendment admits exactly these three writable paths:

1. `src/components/drawer/DrawerOverlay.vue`
2. `tests/components/custom/drawer/Drawer.detents.test.ts`
3. `docs/tranches/BK/execution/2026-08-02-row6-build-colormix/OWNER-AMENDMENT.md`

The native-only rule is `true` for closed native scrim `inert`; the modal
Reka `DialogOverlay` binding remains unchanged. Two unrelated
`demo/stories/display/music-staff.vue` variant errors remain outside Row6
authority and are routed outside this amendment. Build was not run. No
execution or release credit is claimed or banked by this note.

## V5 first-RED / cure — native inert assertion

The frozen V5 validator was invoked as `gpt-5.6-luna xhigh`, CLI
thread/session `019fc552-addd-7841-882a-0f98a9718498`. `git diff --check` was
green. The focused run was first RED at
`tests/components/custom/drawer/Drawer.detents.test.ts:69` because this Vitest
setup lacks Chai DOM `toHaveAttribute`: `Test Files 1 failed/1 passed (5 total)`
and `Tests 1 failed/15 passed (20 total)`. Cleanup then reported an error after
the throwing assertion prevented unmount. The cure is matcher-only: replace
that assertion with native `hasAttribute("inert")` and `toBe(false)`, preserving
the existing native false rule. Typecheck and build were not run. No product
change or execution/release credit is claimed or banked.

## Successor combined-cure chronology

V6 had invalid context. V7 supplied the clone/manifest; the NO-START Bash3
session was `019fc571-950c-7732-8c93-acc288aaab63`, followed by V7 harness RED
`019fc575-0ba1-7e20-ad1c-964dce43187e`. Hostile review returned AMEND/REJECT.
The interrupted partial Luna session was `019fc583-88ca-79e0-a238-75c4dbfdfbe0`.
This binding cure owns exactly nine paths: the minifier and its test, Dock and
its interaction test, DrawerOverlay and its detent test, material.css and its
endpoint test, and this amendment. V8 is required. Zero execution or release
credit is claimed.

## V8 chronology / V9 adjudication

The V8 clone manifest is `75742bc6ef47da566eb06c2687286461b4aefdb3e11e9bbf5b6a33b74e990eba`.
The Luna session is `019fc5a3-6317-7983-b650-363e3a5e2c07`. The
install/diff/focused result was `88/88 green`; typecheck exited `2` with the
complete diagnostic batch. The Fourier gate-order artifact was recorded, with
no Fourier edit. V9 adds `.d.mts` for 23 paths. The actual adjudication task is
`/root/row6_v9_adjudication`. No execution credit is claimed.

## V9/V10 source chronology

V9 ordered manifest: `ca666e11ee582b9c5210b1ee124e424af054fec0e072eb38bb0bdead33aa9ca4`.
Three fresh Sol xhigh source audits returned AMEND on the maximal-name and
escape-boundary family. The prior Luna mechanics session
`019fc5c0-1abe-7650-be65-361399cbd01b` stopped before clone/install/gate; the
target remained absent. This V10 source-cure writer is `gpt-5.6-luna xhigh`,
session `019fc5c7-6c51-7ee3-81bc-bae858e327f0`. V10 is source-only and carries
zero execution/release credit. The pre-chronology ordered 23-path overlay
manifest is `0dac6fa75d023564cdce198490024adea79a92a37f02ac01cf4df575805ddc19`;
the final manifest is reported only in the terminal report to avoid a
self-hash.

## V10/V11 source chronology

V10 canonical manifest: `991171e7a91f06cc85f7efedf8f927b2c57768eab08a155a4bc8182ee876a93b`.
V10 writer: `gpt-5.6-luna xhigh`, session `019fc5c7-6c51-7ee3-81bc-bae858e327f0`.
Two fresh Sol xhigh post-implementation reviews returned AMEND with shared
first falsifier `prefix-owned #url`, adjacent `@url`/dot/`Invalid CSS name escape`.
V10 was frozen post-implementation RED; zero clone/install/test/build/package/gate.

This V11 source-cure writer is `gpt-5.6-luna xhigh`, session
`019fc5d8-049e-79b3-a40a-303b1e1b2c9f`. After the V11 code/test patch and before
this append, the canonical ordered 23-path manifest was
`f9746c7fd877de8a8730b0f7f65fe02724cc20c2973be75e58a0d2cba05b626e`; the
then-current amendment SHA-256 was
`d358e2840e590af829836cd35e5fa91c95e186060f0eb19c881e3c37b2b94fe5`.
V11 is source-only and carries zero execution/release credit.

## V13 first-RED / V14 source-only chronology

V13 was RED on the exact `137276`-byte oversized top-level `@layer` fixture.
The V13 overlay was
`a7a6d37b16b03c5a20285ba0cbf96c76ad242016cb51720d628f8cdf1f6a720f`.
Fresh reviewers and adjudication were `gpt-5.6-sol xhigh`; the binding issue
was confined to source-slice partitioning at immediate named `@layer` child
boundaries, with ordinary top-level slices and outer boundary bytes required
to remain byte-exact.

This V14 source-only implementation writer is `gpt-5.6-luna xhigh`, this Luna
session. It adds no dependency, logging, probe apparatus, recursive or
arbitrary at-rule splitting, or source-CSS change. V13/V14 receive zero
test/build/package/Browser/Safari/release credit.

## V14 terminal / V15 source-only chronology

The authenticated V14 terminal preimages were:

- `demo/vite.demo-dist.config.ts`: `81641cdc89e37a2da8dcb47bbc3291f95d249a9975a0547f914982a8ccae2dae`
- `tests/demo-css-partition.test.ts`: `5eecd82f80eab649b0ed6b5d6ddc714c5030041b1d84a6856a5484a060d93b40`
- `docs/tranches/BK/execution/2026-08-02-row6-build-colormix/OWNER-AMENDMENT.md`:
  `a9e25d26edca4fd544735156002fa4e6ca93c885e7334d018bdfd16ef394fb84`

V14's first-RED was the fragment reconstruction guard: complete repeated
named-layer wrappers cannot join byte-for-byte to the original one-wrapper
outer range. The valid oversized named-layer path therefore failed closed at
the invalid original-range comparison.

This V15 source-only cure preserves the original ordered top-level range
stream, exact raw header/child-body/raw-close node reconstruction, ordered
grouped child packing, complete repeated named-layer wrappers, and one-time
outer prefix/suffix ownership. `partitionDemoCss` verifies only packing of the
transformed emitted slices; it does not maintain a separate contribution
stream. The test contract parses each emitted fragment independently and keeps
the byte, topology, grammar, and fail-closed boundaries explicit.

This V15 source-cure writer is `gpt-5.6-luna xhigh`, this Luna session. It
changes only the three authenticated paths above. V15 is source-only and
carries zero execution/build/test/package/Browser/Safari/release credit. Only
`git diff --check` and read-only diff/hash/count inspection are authorized.

## V16 source-only chronology

V15 preimages frozen for `tests/demo-css-partition.test.ts` (`b0e3410d09b531661fb139e44df53859bdaa13f5459eb81615e7c40a468c955a`),
this amendment (`7c7146dd25e9ad969b24f44d6c49e7ea1c94fc8dd1da258b32c500077af5dbdd`),
and unchanged production `demo/vite.demo-dist.config.ts`
(`c391a1ad974a811d1f2e07820cca85be2a4a1f350c34981db2bdd15c5081e071`).
Review A was CLEAN. Review B was AMEND on normalized-wrapper and
displaced-sentinel falsifiers. V16 is the test/docs-only source cure; production
is correct and unchanged. The actual model was `gpt-5.6-luna xhigh`. Zero
execution/build/test/package/Browser/Safari/release credit is claimed.

## V17 test/docs-only chronology

V16 preimages frozen for `tests/demo-css-partition.test.ts` (`c7cd5b1432cda9b72dc66929d418aa22fe498b198e481f458904c5b826ef8e5e`),
this amendment (`65a01c7bf8ffa0b30062b63c1dcdc0b0cfa135f8aa1059203371e81397a69810`),
and unchanged production `demo/vite.demo-dist.config.ts`
(`c391a1ad974a811d1f2e07820cca85be2a4a1f350c34981db2bdd15c5081e071`).
Both fresh V16 hostile reviews returned AMEND on exact outer byte ownership.
V17 is test/docs-only; production remains unchanged. The actual model was
`gpt-5.6-luna xhigh`. Zero execution/build/test/package/Browser/Safari/release
credit is claimed.
