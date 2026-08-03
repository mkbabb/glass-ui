# W6 `ddc20dc4` committed-forward critic — Candidate 2

Date: 2026-07-22 EDT
Seat: independent Sol x-high, read-only product/test/evidence/workflow/consumer critic
Audit object: committed W6/GATES bytes spanning `35a30fbbce8c381d2258a58a55a6b34df2c92c5c`
and `ddc20dc44a7d1f1c3b9824dcf22a68375738450c` at a descendant HEAD
Verdict: **USEFUL BANKED PARTIAL; BINDING ROLE RESET, GATE, PACKAGE, PAINT, AND ACCEPTANCE RED**

## 1. Exact object, status, and moving-tree fence

The source object is reproducible even though the shared working tree moved during review:

```text
35a30fbbce8c381d2258a58a55a6b34df2c92c5c
  parent=f9b9d16eed092e65b5aee7959141adad8e787ae9
  tree=5b09c488a2f42aafbf3852c3f64cd3199c5e769b

ddc20dc44a7d1f1c3b9824dcf22a68375738450c
  parent=35a30fbbce8c381d2258a58a55a6b34df2c92c5c
  tree=77afabf2115a385fff1b558f743613a1273e9b5c

AUDIT_START_HEAD=2fd207d4a6ea6021aade74d97adf785fc9bd9270
AUDIT_START_TREE=47fbf4fffbc2014324eaedd4c034f79b1a1ebfd3
FINAL_HEAD=abf46592642fdf04f4210865a61914db8bb58b9f
FINAL_TREE=af39714c2fb999d6d8514fca7a7c29d2ba50bb39
```

Both named commits are ancestors of the final observation. During this review HEAD advanced from
`2fd207d4` to `abf46592` through a coordination-receipt commit. The only committed `ddc20dc4..HEAD`
delta under `src/`, `demo/`, package/build scripts, tests, W6 evidence, and the two owning band files is
`tests/styles/radius-role-canon.test.ts`; there is no post-`ddc` W6 source, gate, package, or paint
redress. Therefore all product findings below are pinned to tree `77afabf…`, not inferred from moving
dirty bytes.

Uncommitted W1/radius redress bytes also appeared while this review was being written
(`DESIGN.md`, Command/Search/Skeleton/SegmentedTabs, radius/utilities, and `BAND-MATERIAL.md`). They are
outside the two-commit W6 object, were not edited or adjudicated here, and receive no W6 credit. Their
presence is captured by the final status/patch digests below; no finding silently reads them as
`ddc20dc4`.

The final dirty-tree observation excludes this report and records, rather than absorbs, concurrent
formation work:

```text
FINAL_STATUS_ENTRIES_EXCLUDING_REPORT=58
FINAL_STATUS_EXCLUDING_REPORT_SHA256=4d2d7611decf1e792b2398804dfed6795f32a5bb6ba236e8949ee6968fe55911
FINAL_TRACKED_PATCH_EXCLUDING_REPORT_SHA256=f85e9c6660a25257367baeae8594413a70ebfb12d933788017a4c24a899ea93f
FINAL_UNTRACKED_PATHS_EXCLUDING_REPORT_SHA256=5596217a95044c0cd41f55b746c96b84787a10865f5761ec6ee02195127ca778
```

Binding formation bytes read for this ruling:

```text
2cfc20510d2d59dc62ae6065c1dfecba92a0f3ba472ac2506c17d6f0dce22ac3  W6-MOVING-CRIT-C2.md
7d6a63739a1bbe20c21cf8fb849238cd98277d29035d871b592136133ce79589  REGISTRY.md
5b5a1b4342e60604ad002e113233d2b198ebe9dd76667a79f19e7304263c9f2e  GATES.md
01078d352c73b7e973f621abbda5379c1d881695515478bc370fff0d5b9b0319  IMPLEMENTATION-ASKS-C2.md
e4af76697c9631ac11af8e92737fa435d56975a46b9aa9682be57b536fd0802a  SOL-TO-CLAUDE-LIVE-STEER.md
```

`REGISTRY.md` `R-TYPE-RAMP-SCOPE`, the matching `GATES.md` row, I-9, and the live steer agree on the
binding contract: full `--text-*`/`--leading-*`/`--tracking-*` reset; only token-backed Glass names
reintroduced; exactly one neutral `text-meta`; mono/editorial/micro/control separation; complete
generic/arbitrary/raw and package emission truth; named 390/1440 Chromium/Safari evidence; a receipt;
then two fresh exact-byte Sol critics. The earlier scoped two-rung choice is explicitly rejected.

The current descendant receipt usefully tells the truth. At
`docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md:49-63`, commit `abf46592` records
`ddc20dc4` as a forward **banked partial / acceptance RED** and names the complete redress. That receipt
supersedes any operational reading of the older close prose; it does not make the committed source meet
the contract.

## 2. Ranked findings

### C0-1 — the cut is neither atomic nor the Sol-ruled full namespace reset

The `ddc20dc4` body calls this “one atomic CI-safe batch” and says reset, codemod, and gate flipped in
the same cut. Git proves otherwise:

- `35a30fbb` already places `--text-sm: initial` and `--text-xs: initial` in
  `src/styles/theme/bridges.css:25-26`, but its exact tree still has 222 strict-ish `text-sm`/`text-xs`
  occurrences in the promised Vue/TS channels, all nine numeric raw-size arbitraries, and no
  `type-hygiene.test.ts` at all.
- `ddc20dc4`, the child commit, removes the narrow residuals and adds the gate. Thus a real committed
  intermediate tree had the reset without the codemod/gate. Two adjacent commits are not the promised
  atomic same-cut invariant.
- The final bridge explicitly rejects the binding design in its own comment: it clears only `sm/xs`
  and says `NOT --text-*: initial` (`bridges.css:16-26`). It has no `--text-*: initial`,
  `--leading-*: initial`, or `--tracking-*: initial` declaration.

The built demo confirms that the omitted defaults remain real, emitted utilities rather than inert
prose. Fresh descendant build output contains `.text-base`, `.leading-none`, `.leading-snug`, and
`.tracking-widest`; the exact source still carries the owning close's live census of 17 other sizes,
27 generic leading uses, and three `tracking-widest` uses. A broader raw-text scan at `ddc20dc4`
finds 18 other-size, 31 generic-leading/arbitrary, and 11 generic-tracking occurrences when source
comments/specimen prose and all variants are included. The absence of a role ledger is the point:
neither figure was reconciled under the ruled namespace.

This is a direct binding-contract violation, not a request to choose the contract again.

### C0-2 — `text-meta` is absent and the mechanical mappings violate the role separation

There are zero `text-meta` occurrences anywhere in the exact commit. It is absent from the source
semantic utilities, the theme bridge, fresh `dist/styles/components.css`, and the fresh demo bundle.
The required neutral role therefore has neither definition, reader, nor packaged emission.

The missing role has user-visible consequences. `ddc20dc4` maps every former `text-xs` reader to fixed
11px `text-micro`, including required prose and actions that are neither terse instrumentation nor code:

- `demo/stories/compositions/auth-shell.vue:90`: the actionable “Forgot?” link;
- `demo/stories/containers/command.vue:128,162`: “try a file name, action, or setting” and “Last picked”;
- `demo/stories/containers/hover-card.vue:43`: a biographical sentence;
- `demo/stories/containers/popover.vue:37,79`: task instructions/descriptions;
- `demo/stories/navigation/toc-tracking.vue:117`: a nested navigation button label, and `:145` its
  explanatory sentence;
- `demo/stories/feedback/progress.vue:128,177,193,209`: full explanatory paragraphs; and
- `demo/stories/feedback/toast.vue:113`: a complete viewport/dismissal/status explanation.

Those sites are exactly why the Sol ruling added neutral fluid `text-meta` and prohibited required
sentences/actions from falling to micro. “Uniform `text-xs` -> `text-micro`” in
`BAND-MATERIAL.md:857-861` is no longer an admissible mapping rule.

Chip remains semantically wrong in two independent ways. `src/components/chip/chipVariants.ts:8`
maps compact `sm` to `text-caption`, whose full recipe at
`src/styles/typography/semantic.css:222-228` sets `font-style: italic`; ordinary static, selectable,
action, and removable compact control labels therefore inherit an editorial voice. The `cell` shape at
`chipVariants.ts:14` also unconditionally appends fixed 11px `text-micro`, including interactive action
and selectable labels. The committed cut did not touch or role-rule either case.

Badge is not fixed by changing specimen words to token names. `src/components/badge/index.ts:21-23`
still emits control-boundary values:

| Badge size | actual source | approximate default at 390 / 1440 | committed story claim |
| --- | --- | ---: | --- |
| `sm` | `--control-text-sm` -> fluid caption | 12.18px / 14.38px | `text-micro` (fixed 11px) |
| `md` | `--control-text` -> fluid small | 14px / 16.4px | `text-small` |
| `lg` | fluid body x `--ui-scale` | 16px / 18.61px | `text-base` |

The `sm` claim is materially false, while all three sizes retain `leading-[1.1]`, an arbitrary generic
channel the gate deliberately blesses. The binding redress says preserve control-token boundaries and
rename the specimens compact/standard/prominent; it does not authorize pretending Badge uses the new
semantic roles.

### C0-3 — committed and pre-existing code labels lose the mono family in emitted CSS

The six W6 edits at
`demo/stories/containers/expandable-container.vue:33,47,83,114,131,139` replace
`fira-code text-sm` with `fira-code text-small`. In the fresh emitted demo CSS, `.fira-code` begins at
byte 169190 and the equal-specificity full `.text-small` rule begins later at byte 172211:

```css
.fira-code{font-family:var(--font-mono);font-feature-settings:"liga", "calt"}
.text-small{font-family:var(--font-text);font-size:var(--type-small);line-height:var(--type-leading-small);font-weight:400}
```

The later rule wins, changing those six code labels from Fira Code to Plus Jakarta Sans. The same exact
class combination already exists at eight other readers: foundations/motion (one),
motion/scroll/ScrollReaderBody (one), springs (four), and typewriter (two). The binding role reset is an
opportunity to remove all 14 conflicting pairs onto `text-mono-small`, not merely the six newly regressed
sites. A source-string census that accepts `fira-code text-small` cannot establish mono paint.

`NucleiOverlay.vue:73` remains a different collision: `text-mono-small text-micro leading-none` expresses
two size roles plus a third leading override. It emits deterministically, but the role ledger must reduce
it to one deliberate mono/micro recipe rather than certify a mechanical result.

### C0-4 — the 7/7 gate is green only because it encodes the rejected narrow contract

The fresh test run is honestly 7/7 GREEN. Its implementation nonetheless cannot police the binding row:

- the utility arm scans raw `.vue`/`.ts` text, so comments and specimen strings false-red while CSS and
  other reader channels can escape;
- it bans only `text-sm`, `text-xs`, and simple numeric `text-[Npx|rem|em]`;
- its own clean self-test explicitly blesses `text-base`, `text-lg`, `text-xl`, and
  `leading-[1.1]` (`tests/gates/type-hygiene.test.ts:199-207`);
- it does not ban generic leading/tracking, `text-[calc(...)]`, or arbitrary leading/tracking;
- the declaration arm scans only `src/components/**/*.css`, ignores raw `line-height`, ignores demo CSS,
  `src/styles/**/*.css`, and Vue `<style>` blocks, and exempts a whole font-size expression whenever it
  contains `var(`;
- the committed tree still has numeric raw declarations across every omitted channel, including demo
  Vue styles, component Vue styles, component CSS, and typography/utilities CSS; and
- no arm counts exactly one `text-meta`, checks its recipe, preserves mono/editorial/control roles, or
  inspects full packaged rule bodies.

Examples that remain green include `demo/chassis/code/Code.vue:71 font-size:0.92em`,
`src/components/timeline/ContinuousTimeline.vue:323 letter-spacing:0.04em`, raw line heights in multiple
component styles, and `src/styles/typography/utilities.css:59,65,66,92-93`. Some may deserve named
geometric/ornamental exemptions. No checked Sol role/exemption ledger exists, so the gate cannot tell.

The committed record also does not retain the required real born-RED mutations. Four synthetic scanner
self-tests prove selected regular expressions in memory; they do not prove a tree mutation, compiled
selector removal, package omission, semantic mis-mapping, or a browser receiver failure. The historical
intermediate `35a30fbb` is not valid born-RED evidence: it committed the reset with hundreds of live
residuals but had no gate capable of observing them. The Card “watched RED” claim is prose without a
retained command/result artifact, and it exercises only the cleared-var arm.

### C0-5 — package mechanics pass, but full semantic recipe emission and a real consumer do not

Fresh checks on the unchanged W6 product bytes are useful:

```text
type-hygiene: 7/7 pass
npm run build: pass; 726 modules; 67 projected public declaration entries
npm run demo:dist:build: pass; 3514 modules
npm run verify:package: pass; 205 targets; 483 declarations; 113 CSS files;
                         67 strict consumer imports
```

`verify:package` checks packed targets, declaration references, CSS imports/URLs, and TypeScript import
resolution. It never asserts semantic selector bodies. Fresh `dist/styles/components.css` proves the
gap: it contains only `font-size:var(--type-small)` for `.text-small` and only
`font-size:var(--type-micro)` for `.text-micro`; it contains neither `.text-mono-small` nor `.text-meta`.
The copied `dist/styles/typography/semantic.css` retains full `@utility` definitions for a Tailwind-aware
consumer, but that is not a build-independent emitted full-role fixture and `text-meta` is absent there
too. Removing a full family/leading/style/weight declaration would not red the package verifier.

Fresh diagnostic hashes:

```text
89bf3a92fb50808fad57308fc4ad556eba6b4acf119a6d299a01a0e43f24dc63  dist/styles/components.css
be1769756502a20ccebe6f9f38e88fc47f4a53d7858ba6213545074e801dafe9  dist/styles/theme/bridges.css
99c66fcddd69ee7e095eb0f1fae9cc232924d5de660b839dbfa13ef2ce2eac40  dist/styles/typography/semantic.css
6efb35b53224c2b12e9ded57b43ec60f92559d78b7b004728fc7283e6bbe5093  dist/styles/typography/utilities.css
1c7e5fb7ec4e6d1273a9bffae914f5fdb3ae00b84a9e905521666e1e8f8940ca  dist-demo/assets/index-NAc0oS3D.css
```

There is also no installed external consumer of these candidate bytes. The repo still builds package
version `7.0.0`, while current installed 7.0.0 copies in value.js and keyframes.js have bridge SHA-256
`0cabf332a703cd4b82e3fb071a81bdbc898aed58faceadaa2be2e4d3616ff17e`, different from the fresh
candidate bridge above. Atlas and SCI install 6.0.0. Those consumers import the Glass `./styles` surface
and still have live generic typography readers. Diagnostic current-source examples include value.js's
markdown `@apply text-base/text-lg/.../text-4xl`, Atlas's recipe `@apply` sizes, SCI's filter
`text-base` headings, and generic leading/tracking in keyframes. Their moving/dirty states make this a
census seed, not terminal evidence; it proves that a full namespace reset cannot be called complete on
a Glass-only grep or a dry-run pack.

No consumer repository edit is requested from this critic lane. The bounded Glass change must publish
an immutable candidate and coordinate each first-party consumer owner or explicitly ledger the reset as
a breaking contract before acceptance.

### C0-6 — the named responsive/browser paint contract remains wholly open

The only tracked W6 evidence is the Card direct-var pair:

```text
9dcb8ba50b6b2e0f436dde39321b9342d2fea9f9651f329373c3d14b8d2f2093  card-before-strandedtextsm-1440.png
02931a4879d4ee3269f1c3172312e30f2eb94deb2438602f155a352ae3b0c7ff  card-after-typesmall-1440.png
```

Both images are 2880x1800 captures of a 1440x900 viewport. They usefully prove the separate
`var(--text-sm)` -> `var(--type-small)` Card repair. They do not prove the 234 textual replacements,
the broad reset, `text-meta`, mono, Badge/Chip, package emission, or any 390px arm.

The owning close admits the deficit at `BAND-MATERIAL.md:933-937`: dense utility growth remains OPEN.
It also strikes the springs pair as byte-identical/unsound at `:908-913` and substitutes “Safari covered
by argument” at `:928-931`, despite the explicit Safari + Chrome contract at `:835-840`. There are no
retained before/after captures for springs, Slider, glass-material, expandable code, Badge, Chip, or a
dense metadata surface at 390 and 1440 in current Chromium and Safari. Browser font metrics, wrapping,
fallback, truncation, baselines, and hit/target geometry are observed behavior; a CSS-syntax argument is
not browser evidence.

### C1-1 — many banked substitutions deliberately change geometry and need role/paint judgment

The broad edit is not parity even where it is mechanically consistent:

- `text-sm` 14/20px -> fluid `text-small` is about 14/19.6px at the floor and 16.4/22.96px at 1440;
- `text-xs` 12/16px -> fixed `text-micro` is 11/13.75px;
- relative `text-[0.7em]` -> fixed 11px changes inheritance semantics;
- SegmentedTabs 13px/14px and layer-group 12px repoints become fluid at wide widths; and
- `text-micro` hard-codes leading 1.25 rather than reading the existing micro-leading token.

These can be good adoption changes. They are not proven parity, and the missing `text-meta`/role ledger
means no exact set of intended changes has yet been judged.

### C1-2 — older close prose is false, while the new receipt is an honest forward correction

`BAND-MATERIAL.md:863` still says `§CLOSE — LANDED`; `BAND-GATES.md` says the coupled cut landed in one
cut and scoped reset is green. Those statements conflict with the binding row and exact Git topology.
Do not rewrite historical provenance or source commits. The correct forward truth already exists in
`abf46592`: bank the partial, keep acceptance RED, and make later close prose reference the redress and
post-redress critics. The receipt is useful governance evidence, not a retroactive acceptance waiver.

## 3. Useful bytes that may remain banked

Do not discard the whole cut. The following are useful inputs to the bounded redress:

- all 225 strict `text-sm`/`text-xs` occurrences and nine simple numeric arbitrary occurrences are gone
  under the committed narrow patterns;
- the two exact caps-tracking repoints are token-equivalent;
- the SegmentedTabs/layer-group size repoints are syntactically sound pending responsive judgment;
- the Card direct-var repair is correct and has a distinct 1440 evidence pair;
- the one explicit `text-mono-small` migration demonstrates the correct mono-role idiom;
- the gate walker, comment stripper for CSS declarations, and cleared-var arm are usable scaffolding;
- build, demo build, and package structural verification pass; and
- the new receipt correctly prevents these bytes from being mistaken for DONE.

Banked does not mean frozen. Role-sensitive reader edits remain amendable until the ruled ledger and
paint decide them.

## 4. Precise bounded Luna x-high redress

One declared Luna x-high owner should land a forward redress on top of `ddc20dc4`; do not amend/relabel
historical commits. The bounded work is:

1. In the same new commit, clear the complete Tailwind `--text-*`, `--leading-*`, and `--tracking-*`
   namespaces and reintroduce only the checked token-backed Glass set. Do not leave a committed reset-only
   intermediate state.
2. Add exactly one neutral `text-meta` role: Plus Jakarta (`--font-text`), fluid caption size and caption
   leading, normal style, normal weight. Give it one canonical source recipe, its required theme/package
   bridge/emission, and no aliases or second competing neutral metadata role.
3. Commit a machine-readable or checked human role ledger for every live generic reader: the original
   234 textual edits, the ruled 17-size/27-leading/3-tracking set, all arbitrary values, all numeric raw
   declarations across CSS and Vue style channels, comments/specimen false hits, and current first-party
   package consumers. Each item must map to a semantic/mono/control role or an exact named exemption with
   reason.
4. Apply only the ledger's mechanical edits. At minimum: convert all six introduced and the eight
   pre-existing `fira-code text-small` conflicts to `text-mono-small`; reduce the Nuclei collision to one
   role; move neutral compact metadata/sentences/actions off micro; move compact Chip off italic caption
   (normally to `text-meta`); and keep code/instrumentation on mono/micro roles.
5. Preserve Badge's control-token sizing boundary. Replace false specimen token claims with
   compact/standard/prominent language and either replace `leading-[1.1]` with a named token-backed Badge
   recipe or record the Sol-approved exact control exception. Do not relabel the existing values as roles
   they do not use.
6. Expand `type-hygiene` to the ratified channels and semantics. It must parse or otherwise distinguish
   real readers from comments/specimen prose, cover all source/demo CSS and Vue style channels promised by
   the ledger, catch generic and arbitrary size/leading/tracking plus raw declarations, count exactly one
   `text-meta`, validate its recipe, and assert mono/editorial/micro/control separations.
7. Make package emission a real product check: build/pack an immutable candidate, install it into an
   isolated downstream Tailwind fixture and a build-independent CSS fixture if that surface remains
   promised, then assert the complete `text-meta`, `text-small`, `text-micro`, `text-mono-small`, and
   caption recipes and selector/cascade outcomes. `verify:package` remains necessary but insufficient.
8. Coordinate, do not directly edit from this lane, the first-party consumer census/migrations and exact
   lock/integrity repins. A full namespace reset cannot silently strand their generic readers.
9. Run and retain the mutations in §5 one at a time, restoring exact bytes after every run. Append command,
   exit, failing assertion, commit/tree, model, sorted status/patch/untracked digests, package integrity,
   and evidence hashes to the Claude-owned receipt.
10. Capture the named responsive/browser matrix in §6, then request the two fresh independent Sol critics
    in §7. Only their exact post-redress bytes may be considered for W6/GATES close.

## 5. Born-RED mutation matrix required on the redress

Each mutation is independent and must make the owning proof fail for the intended reason:

1. restore one default namespace entry by deleting the full reset or allowing un-token-backed
   `text-base`; emitted `.text-base` must red;
2. plant real reader utilities `text-sm`, `text-base`, `leading-[1.1]`, `tracking-widest`,
   `tracking-[0.02em]`, and `text-[calc(10px)]` in their ratified channels;
3. plant numeric `font-size`, `line-height`, and `letter-spacing` in component CSS, `src/styles` CSS,
   demo CSS, and Vue `<style>`; each path arm must red while comments and SVG-coordinate exemptions do not;
4. restore `var(--text-sm)` at Card and prove the cleared-var arm reds;
5. remove `text-meta`, add a second neutral meta recipe, italicize it, fix it at 11px, or omit its theme
   bridge; each must independently red the role contract;
6. restore `fira-code text-small`, map a required sentence/action to `text-micro`, restore compact Chip's
   `text-caption`, or restore the false Badge `sm · text-micro` copy; each semantic mutation must red;
7. delete the family/leading/style/weight declarations from a packed role, suppress the packaged
   `text-meta`, or reorder the package so `.text-small` clobbers mono; the installed fixture must red; and
8. remove one required width/browser/surface/state from the retained evidence manifest; acceptance must
   stay RED rather than accepting an incomplete screenshot directory.

The existing synthetic `text-sm`, `text-[13px]`, raw font-size/tracking, and cleared-var scanner probes
may remain as fast unit tests, but they do not replace this matrix.

## 6. Retained paint/browser acceptance matrix

The redress must retain before/after evidence from the true pre-W6 base and exact post-redress installed
artifact for:

- widths: 390x844 and 1440x900;
- browsers: current Chromium and current Safari, with browser/OS builds recorded;
- routes/surfaces: springs, production Slider on its real story, `/substrates/glass-material`, expandable
  code, Badge sizes, compact and interactive Chip, and one dense metadata surface;
- measurements: computed family/style/size/leading/tracking, wrapping, truncation, baseline, overflow,
  target/hit geometry for actions, surrounding material, and font-loaded state; and
- evidence identity: route, viewport/DPR, artifact integrity, source commit/tree, clean/dirty digests,
  readiness hook, capture source, hashes, and expected threshold/delta.

Theme and PRM may be waived only by an explicit Sol orthogonality argument for the typography values;
state semantics must still match. Width and browser cannot be waived because the new roles are fluid and
font metrics/paint are browser-observed.

## 7. Two fresh independent Sol x-high critics after redress

These are two distinct seats, not a self-review split into headings:

1. **Namespace/gate/package critic.** Pin the exact redress commit/tree, dirty/untracked digests, role
   ledger, full reset/reintroduction set, all mutation transcripts, generated selector bodies/order,
   packed integrity, and installed first-party consumer census. Independently attempt bypasses in every
   promised path and reject any second meta role, generic survivor, size-only package emission, mutable
   7.0.0 identity, or unrepinned live consumer.
2. **Semantic/paint/accessibility critic.** Independently role-audit every changed reader, with special
   focus on the 14 mono conflicts, required sentences/actions, Nuclei, Badge, Chip, and relative/raw
   mappings. Recompute the 390/1440 role values and inspect the retained Chromium/Safari surfaces for
   family/style, wrap, baseline, overflow, truncation, target geometry, and material context. Reject a
   Card-only, one-width, one-browser, copied, or post-only evidence set.

Both critics must run after every byte-changing redress, state declared Sol x-high provenance, cite the
same immutable package integrity, and produce exact report SHA-256 values. These pre-redress reports and
the current receipt discover/rout the work; they do not pre-approve amended bytes.

## 8. Final ruling

`35a30fbb` + `ddc20dc4` do not fulfill the binding role reset. They split the allegedly atomic cut,
retain the rejected default namespaces, omit `text-meta`, introduce/retain mono loss, misclassify Badge
and Chip/metadata roles, ship a narrow self-green gate without the required mutation evidence, emit no
complete new packaged role, and carry no responsive/browser proof of the migration.

The cut is still worth banking: it removes the narrow sm/xs/arbitrary residue, fixes several correct
declarations including Card, builds, and supplies gate scaffolding. The current descendant receipt now
states that honest status. Keep the bytes as a forward partial, keep W6/GATES acceptance RED, apply the
bounded Luna redress, then require the two fresh Sol critics above. Do not use `LANDED`, `DONE`, freeze,
or the old 7/7 proof as the broader contract's close.

## 9. Verification and report integrity

Fresh commands run during this critic:

```text
npx vitest run tests/gates/type-hygiene.test.ts --reporter=verbose  # 7/7 pass
npm run build                                                       # pass
npm run demo:dist:build                                             # pass
npm run verify:package                                              # pass
git diff --check                                                    # pass, no output
```

This report is the only file created by the critic. Its SHA-256 is reported out-of-band with the final
handoff because embedding a file's own digest would change that digest.
