# W6 `ddc20dc4` third adjudication — TYPE-CODEMOD ⇄ GATES W4, Candidate 2

Date: 2026-07-22 EDT
Seat: third independent Sol x-high adjudicator; formation only
Audit object: `35a30fbbce8c381d2258a58a55a6b34df2c92c5c` +
`ddc20dc44a7d1f1c3b9824dcf22a68375738450c`, with receipt
`abf46592642fdf04f4210865a61914db8bb58b9f`
Verdict: **CONVERGED DEFECT · BANK FORWARD PARTIAL · FULL ROLE/NAMESPACE REDRESS BINDING · W6/GATES W4 ACCEPTANCE RED**

## 1. Inputs, exact object, and moving-tree fence

Both assigned critic inputs were read in full and match their supplied identities:

```text
2cfc20510d2d59dc62ae6065c1dfecba92a0f3ba472ac2506c17d6f0dce22ac3  W6-MOVING-CRIT-C2.md
96fce92874fb2969fd8d70eb92195228888246d8ed76af96175eaec1ef042b96  W6-DDC20-COMMITTED-CRIT-C2.md
```

The binding projections were also reconciled: `VISUAL-HARDENING.md` §14,
`REGISTRY.md` `R-TYPE-RAMP-SCOPE`, the `GATES.md` type/ramp row,
`ROW-CHALLENGE-MATRIX.md` rows 20 and 26, `IMPLEMENTATION-ASKS-C2.md` I-9,
`CHALLENGES.md`, the owning MATERIAL W6/GATES W4 prose, exact source and gate,
package exports/verifier/canon, the receipt, and current first-party consumer seeds.
They agree on the full reset. This adjudication does not reopen that ruling.

The committed topology is exact:

```text
f9b9d16eed092e65b5aee7959141adad8e787ae9
  └─ 35a30fbbce8c381d2258a58a55a6b34df2c92c5c
       parent=f9b9d16eed092e65b5aee7959141adad8e787ae9
       tree=5b09c488a2f42aafbf3852c3f64cd3199c5e769b
       └─ ddc20dc44a7d1f1c3b9824dcf22a68375738450c
            parent=35a30fbbce8c381d2258a58a55a6b34df2c92c5c
            tree=77afabf2115a385fff1b558f743613a1273e9b5c

abf46592642fdf04f4210865a61914db8bb58b9f
  tree=af39714c2fb999d6d8514fca7a7c29d2ba50bb39
```

This proves two distinct process facts that must remain visible. First,
`35a30fbb` committed the scoped reset in `theme/bridges.css` while the old readers
remained and before `type-hygiene.test.ts` existed; `ddc20dc4` then committed the
remaining codemod and gate. The commit body's “one atomic CI-safe batch” claim is
therefore false as Git topology even though the adjacent trees converge on a CI-green
narrow candidate. Second, the Claude receipt truthfully says `ddc20dc4` raced past the
steer's no-commit boundary because the steer became visible only after the commit.
That is a recorded race, not authority to rewrite the commit.

Historical provenance remains exactly **Opus, `claude-opus-4-8`**, with build/close
effort high and critic effort xhigh under the stated Fable outage. It must not be
relabeled Sol or Luna. Prospective bounded mechanical redress is Luna x-high;
prospective design, paint, package judgment, and both closing critics are Sol x-high.

The shared tree moved again during this adjudication to the descendant W1 commit shown
in §12. Its changes to Command, SegmentedTabs, Search, Skeleton, radius, utilities,
canon, and radius tests are foreign W1 bytes. In particular, the current Command and
SegmentedTabs files overlap W6 paths but receive no W6 credit here. All product
findings and line references below are read from tree `77afabf…`; consumer worktrees
are diagnostic census seeds only. No current dirty or descendant byte is silently
absorbed into `ddc20dc4`.

## 2. Converged ruling

The two critics converge and are adopted with the refinements in §§3–10:

1. Keep the useful source substitutions, Card repair, declaration repoints, walker,
   cleared-var arm, build result, and package-structure result as forward banked work.
   “Banked” does not freeze any role-sensitive substitution.
2. Reject W6/GATES W4 `LANDED`, `DONE`, freeze, or acceptance-GREEN. The 7/7 test is
   honest evidence for the rejected narrow contract only.
3. Retain the already-ruled complete Tailwind size/leading/tracking reset. There is no
   further choice between a two-rung reset and a whole-namespace reset.
4. Land one forward coupled redress on top of history. Do not amend, squash, rebase,
   cherry-pick away, or relabel `35a30fbb`, `ddc20dc4`, or `abf46592`.
5. The redress is not acceptance by itself. Immutable package receivers, the complete
   mutation record, the retained browser matrix, the appended receipt, and two fresh
   independent post-redress Sol x-high critics remain mandatory.

The current state is therefore **useful partial source, acceptance RED**.

## 3. Exact namespace reset and reintroduction contract

One new Glass implementation commit must contain the reset, every in-repo reader
migration, the role ledger, the complete gate, and package-role assertions together.
No new committed reset-only or gate-only intermediate tree is permitted.

In `src/styles/theme/bridges.css`, the reset is literal and precedes reintroduction:

```css
--text-*: initial;
--leading-*: initial;
--tracking-*: initial;
```

Only these existing token-backed Tailwind namespace keys may then be reintroduced:

```text
text:     admin-label, micro, caption, small, body, prose, subheading, heading,
          title, dropdown, dropdown-secondary, display, display-1, display-2,
          display-3, display-4, display-5
leading:  micro, caption, small, body, prose, heading, display
tracking: tight, display, snug, normal, wide, wider, caps
```

Every reintroduced key must resolve directly to its checked Glass token; no literal,
fallback literal, alias to a Tailwind default, `base/lg/xl/…`, `leading-none/tight/snug/
relaxed`, or `tracking-widest` reintroduction is allowed. Custom `@utility text-*`
roles survive only if the gate validates their complete token-backed recipe; their
existence is not an escape from the reset.

`text-meta` is intentionally **not** added as a second size-only `--text-meta` theme
bridge. Its one canonical `@utility` recipe in §4 reads the existing Glass tokens
directly. This avoids creating a second compiler-generated `.text-meta` rule whose
body could compete with the full recipe. The built and packed selectors, not merely
the source declaration count, prove that there is one logical recipe.

The residual canon is resolved, not left under a blanket allowlist:

- `text-micro` and `text-mono-micro` use `var(--type-leading-micro)` rather than raw
  `1.25`;
- `text-mono-micro` uses `var(--type-tracking-wide)` rather than raw `0.025em`;
- mono-prose's distinct `0.02em` is minted once as
  `--type-tracking-mono-prose` and consumed by its existing recipe;
- admin label's `line-height: 1` is minted once as `--type-leading-admin` and consumed
  by `text-admin-label`; and
- the hero recipe's raw `0.84`/`-0.03em` fallbacks become declared
  `--text-hero-leading`/`--text-hero-tracking` defaults, and the recipe reads those
  variables without a raw fallback; and
- `.fourier-f`'s relative `font-size: 1.35em` and `line-height: 1` are the sole
  preapproved raw typography exception, because they are ornamental glyph geometry,
  not a content rung. The ledger identifies the selector and both declarations
  exactly. It is not a file-wide exemption.

Any additional raw value needs a separately named Sol decision; Luna may not widen
the exception class.

## 4. Exact role decisions

### 4.1 The one neutral role

There is exactly one new neutral role and one canonical source recipe:

```css
@utility text-meta {
    font-family: var(--font-text);
    font-size: var(--type-caption);
    line-height: var(--type-leading-caption);
    font-style: normal;
    font-weight: 400;
}
```

No alias, component-local duplicate, theme-generated size-only twin, or second neutral
metadata name is allowed. `text-caption` remains Plus Jakarta editorial italic;
`text-micro` remains fixed 11px terse, nonessential instrumentation; readable code
uses `text-mono-small`, tertiary code uses `text-mono-micro`; structural uppercase
labels use `text-admin-label` or `text-mono-caption`; ordinary supporting prose uses
`text-small` or `text-body`.

No visible action label, sentence, required explanation, error/help text, or navigation
label may use `text-micro`. If a component already owns a control-size token, remove
the overriding micro class and preserve the component token. Otherwise compact
supporting/action text uses `text-meta`.

At minimum, the banked micro mappings at the following exact `ddc20dc4` readers move
to `text-meta`: auth-shell `Forgot?`; Command's “try a file name…” and “Last picked”;
HoverCard's biographical sentence; both Popover descriptions; the ToC child button
and subsection sentence; all four Progress explanatory paragraphs; Toast's viewport/
dismissal/status explanation; and the Progress decrement/increment button labels.
The gate applies the rule to every reader, not only this minimum defect set.

### 4.2 The 14 mono conflicts

All 14 conflicts are in scope, not only the six introduced by the W6 diff:

```text
6  demo/stories/containers/expandable-container.vue
1  demo/stories/foundations/motion.vue
1  demo/stories/motion/scroll/ScrollReaderBody.vue
4  demo/stories/motion/springs.vue
2  demo/stories/motion/typewriter.vue
```

At each reader, replace the full `text-small` family recipe with
`text-mono-small`. `fira-code` may remain only as its non-conflicting
ligature/feature overlay; the final class set may not contain a non-mono full-family
role. The gate rejects either ordering of `fira-code|font-mono` with `text-small`,
`text-meta`, `text-caption`, `text-body`, or another Plus-Jakarta full role.

### 4.3 Nuclei

`NucleiOverlay.vue:73` is terse numeric code/instrumentation. Its final type expression
is exactly one role, `text-mono-micro`. Remove `text-mono-small`, `text-micro`, and
`leading-none`; geometry classes remain. A two-size composition or a generic leading
override must fail the role gate.

### 4.4 Chip

Chip's size mapping is binding:

```text
sm -> text-meta
md -> text-small
lg -> text-body
```

The `cell` shape sets layout only and must not append `text-micro`; shape may not
silently override size/interaction semantics. This removes italic editorial styling
from compact controls and fixed-11px labels from selectable, removable, or action
cells. A truly nonessential telemetry instance may request `text-micro` only at its
ledgered consumer, never through the reusable shape.

### 4.5 Badge — control boundary retained, named leading recipe selected

Badge does **not** adopt `text-meta`, `text-small`, or `text-micro` for its size axis.
The three existing font-size sources remain the control contract:

```text
sm -> var(--control-text-sm)
md -> var(--control-text)
lg -> calc(var(--type-body) * var(--ui-scale))
```

The arbitrary `leading-[1.1]` is not granted an exception. Mint the single
control-geometry token `--control-leading-badge: 1.1`, apply
`line-height: var(--control-leading-badge)` through the component-owned
`.badge-atom` recipe, and remove `leading-[1.1]` from all three CVA branches. This is
a named Badge line-box recipe, not a second text role and not a generic leading rung.
The gate asserts the three size token expressions, the named leading owner, and the
absence of an arbitrary leading class.

The size-axis specimens become exactly `compact`, `standard (default)`, and
`prominent`. They do not claim semantic utility names. The baseline explanation names
the Badge control-size/leading contract rather than `text-small` or
`leading-[1.1]`.

### 4.6 Other built-ins and the nine arbitraries

The 17 `text-base…text-4xl` hits at the exact tree include two class-name comments and
one Badge specimen-copy string; those are non-readers. The 14 real readers use these
exact replacements:

```text
text-base -> text-body
text-lg   -> text-prose
text-xl   -> text-subheading
text-2xl  -> text-heading
text-3xl  -> text-title
text-4xl  -> text-title
```

The auth-shell Fourier glyph drops `text-4xl` entirely because `.fourier-f` already
owns its relative ornamental size. The two `text-lg` strings in
`class-names.ts` remain parser test prose, not readers. Badge specimen words are copy,
not a size reader. Existing weight and ink choices may remain when they do not
reintroduce a competing full type role.

All 27 listed Tailwind generic-leading overrides are removed after their semantic/mono
role supplies leading. The redundant auth/Fourier `leading-none` is already owned by `.fourier-f`;
Nuclei follows §4.3; the Sortable handle becomes `text-mono-micro`; icon-only glyphs
inherit their component line box. No listed Tailwind default leading override
survives. The three
uppercase Carousel `tracking-widest` readers become token-backed `tracking-caps`.

The four BottomDock `0.7em` keycaps become `text-mono-micro`; the two Dock overview
10px structural labels become `text-admin-label`; the Springs `0.7rem` code readout
becomes `text-mono-micro`; the Carousel 10px category becomes `text-admin-label`; and
Nuclei follows §4.3. This preserves the banked direction while removing family/size/
leading collisions.

## 5. Checked role/exemption ledger

The coupled commit adds one canonical machine-readable ledger at
`tests/gates/fixtures/type-role-ledger.json`; any human table is generated from it and
may not become a second authority. Each record contains:

```text
repo, pinnedCommit, path, syntaxChannel, stableNodeKey, sourceSpelling,
classification(reader | product-copy | comment | exemption), semanticRole,
replacementOrAllowedToken, exemptionId|null, reason, evidenceSurface|null
```

`stableNodeKey` is an AST/template selector plus a normalized source fingerprint, not
a bare line number. The ledger must account for:

- all original 234 textual edits as 228 readers plus six non-utility-text edits;
- the six false textual hits exactly: `Code.vue` comment;
  `class-names.ts` comments ×2; Badge story strings ×3 (product copy, not utilities);
- the 14 real other-size readers plus the two class-name comments and Badge specimen
  string;
- all 27 generic leading and three generic tracking readers;
- all arbitrary type utilities, all `font-size`/`line-height`/`letter-spacing`
  declarations in the promised channels, every cleared default-var reference, the
  14 mono conflicts, Nuclei, Chip, and Badge;
- every `text-micro` reader, classified as permitted terse instrumentation or moved
  under §4.1; and
- each current first-party package consumer at its exact source commit, status digest,
  dependency declaration, lock entry, and installed artifact integrity.

There are only two exemption shapes at this adjudication: the exact `.fourier-f`
declarations in §3, and a token-backed component/control size expression such as the
three Badge sizes. An exemption is selector/path/property/value exact. “Typography
canon,” “contains `var(`,” “SVG,” “demo,” an entire file, or an entire repository is
not a valid exemption. Non-typographic SVG coordinates are outside the parsed
property grammar rather than smuggled through an allowlist.

The gate fails on an unledgered reader, stale ledger entry, duplicate node key,
changed spelling/role, widened exemption, or a ledgered consumer whose pinned lock or
integrity no longer matches.

## 6. Gate channels and parsing

Replace raw-text regex classification with syntax-aware parsing. The gate declares
`@vue/compiler-sfc`, `@vue/compiler-dom`, `typescript`, `postcss`, and a CSS-value
parser as direct dev dependencies rather than relying on transitive availability.

The checked channels are exact:

1. every `.vue` under `src/` and `demo/`: template `class`, bound class expressions,
   static/bound `style`, script/script-setup class strings and style objects, and each
   inline or external `<style>` block;
2. every `.ts`, `.tsx`, `.js`, and `.jsx` under `src/` and `demo/`: TypeScript AST
   string/template/array/object expressions used for classes, CVA/variant tables,
   render functions, and typography-bearing style objects;
3. every `.css` under `src/` and `demo/`: PostCSS declarations and `@apply`, including
   `src/styles`, component CSS, demo CSS, and Vue style bodies; and
4. the packed `./styles` and `./styles.css` surfaces plus the two installed fixtures
   in §7.

The utility lexer understands variants, important modifiers, arrays/objects, and
bracket syntax. It distinguishes `text-[color:…]` from font size and allows a
token-backed length only at its exact ledgered control owner. It rejects built-in
size classes, generic leading/tracking, numeric/calc arbitrary type values, and any
unknown role spelling. Comments and ordinary specimen prose are ignored by syntax;
product-copy assertions such as Badge remain explicit tests.

PostCSS values are parsed node-by-node. A declaration containing `var()` is not
blanket-clean: a raw dimension elsewhere in the same `calc()` still fails. Numeric
`font-size`, `line-height`, and `letter-spacing` fail unless the exact declaration is
one of §5's exemptions. Cleared `--text-*`, `--leading-*`, and `--tracking-*`
references that were not explicitly reintroduced are rejected across every
source/demo style channel.

The semantic arm additionally asserts: one source and one emitted logical
`text-meta`; its five properties and normal style; no action/required sentence at
micro; no mono + Plus-Jakarta full-role collision; no two size roles; exact Nuclei,
Chip, and Badge contracts; and complete ledger equality. Synthetic parser unit cases
remain useful, but they do not substitute for the real-tree mutations in §8.

## 7. Package emission, immutable 8.0 identity, and consumers

The current `7.0.0` identity is immutable and must not be reused for different bytes.
The redress packs a unique 8.0 prerelease identity containing the source commit, for
example `8.0.0-w6.<commit>`, and records tarball SHA-256 plus npm integrity. A later
final `8.0.0` release may consume that proven commit; neither identity is overwritten.

Both currently promised CSS exports are binding until a separate 8.0 public-ledger
ruling removes one:

- Tailwind-aware `./styles` must expose the full canonical source recipes; and
- build-independent `./styles.css`, including self-emitted component utilities, must
  contain complete usable role bodies rather than size-only stubs.

The packed checks assert every declaration each canonical recipe owns, plus the
computed family/size/leading/style/weight outcomes for `text-meta`, `text-small`,
`text-micro`, `text-mono-small`, `text-mono-micro`, and `text-caption`; Badge's three
size expressions and named leading rule; Chip's three roles; and selector order/
cascade such that mono cannot be clobbered by a later text role. `verify:package`
remains required but is extended or accompanied by a CSS AST assertion; target/
declaration/import reach alone is insufficient.

Install the actual tarball, never a workspace symlink, into two clean fixtures: one
Tailwind v4 fixture importing `@mkbabb/glass-ui/styles` with installed-dist `@source`,
and one build-independent fixture importing `@mkbabb/glass-ui/styles.css`. Each
renders real role, expandable-code, Badge, and Chip receivers and records computed
family/style/size/leading/weight plus artifact integrity.

The current first-party census proves a release edge, not acceptance:

- value.js declares/installs Glass `7.0.0`, imports Glass CSS, and has live Markdown
  `text-base…text-4xl`, generic leading, and tracking readers;
- keyframes.js installs `7.0.0`, imports Glass components and `./styles`, has live
  leading/tracking readers, and must also make its Glass dependency declaration
  truthful;
- Atlas declares/installs `6.0.0`, imports Glass `./styles`, and has live generic
  recipe sizes/tracking; and
- sci-report dashboards install `6.0.0`, import Glass components, and retain live
  `text-sm/xs/base` plus `leading-relaxed` readers.

Those worktrees are moving, so these are minimum census seeds. Immediately before the
8.0 cut, each owner pins a source commit and status digest, migrates every ledgered
reader by role, installs the exact tarball, and commits its dependency/lock/integrity
repin. Cross-repository commits form one release manifest transaction: Glass does not
publish or close W6 while any named first-party receiver is unrepinned. No consumer
shim, 7.x alias, direct edit from this formation lane, or “old consumers are on 6/7”
waiver is accepted.

## 8. Required born-RED mutation record

Run each mutation independently against the exact redress in a disposable worktree or
installed fixture, record the command/exit/failing assertion, and restore the exact
bytes before the next mutation. Normal committed tests remain GREEN; no expected-fail
marker hides a live defect.

1. Delete one full namespace reset or reintroduce un-token-backed `text-base`; emitted
   default utility presence must RED.
2. Plant real-reader `text-sm`, `text-base`, `leading-none`, `leading-[1.1]`,
   `tracking-widest`, `tracking-[0.02em]`, and `text-[calc(10px)]` in each applicable
   Vue/TS/CSS class channel; each independent plant must RED.
3. Plant numeric `font-size`, `line-height`, and `letter-spacing` in component CSS,
   `src/styles` CSS, demo CSS, Vue `<style>`, inline `style`, and bound style objects.
   Each path must RED, while the same words in comments/specimen prose stay clean.
4. Restore `var(--text-sm)` at Card and an equivalent cleared leading/tracking var;
   the cleared-var arm must RED in every promised style channel.
5. Delete `text-meta`; add a second/aliased recipe; omit one of its five properties;
   italicize it; fix it at 11px; or add a size-only theme twin. Each independent
   mutation must RED.
6. Restore any `fira-code text-small` conflict; restore Nuclei's double size; put a
   required sentence/action at micro; restore compact Chip's `text-caption` or cell
   micro override. Each semantic mutation must RED.
7. Change any Badge control-size expression, restore `leading-[1.1]`, remove its named
   leading owner, or restore a semantic-class specimen claim. Each must RED.
8. Delete any declaration a canonical role owns, perturb an expected computed family/
   leading/style/weight outcome, suppress packaged `text-meta`, or reorder CSS so
   `text-small` wins over mono. The installed fixture must RED for the intended
   computed-style reason.
9. Restore a generic first-party reader, remove a direct dependency, point a consumer
   lock at 6/7 or another 8.0 integrity, or omit a named consumer from the release
   manifest. The release proof must RED.
10. Remove any required width, browser, surface, state, pre-image, post-image, computed
    measurement, or artifact identity from the retained evidence manifest. Acceptance
    must remain RED.

The existing four synthetic scanner probes and Card watched-RED prose may be retained
as historical scaffolding; neither discharges this mutation matrix.

## 9. Retained 390/1440 Chromium/Safari matrix

The historical before object is the true pre-W6 commit
`626540adbe10fd84f47b8365977925a7fbd2e17a`; all intervening non-W6 commits are named
as confounders. The after object is the exact installed immutable 8.0 redress tarball.
The matrix is 28 before/after comparisons—seven surfaces × two CSS viewports × two
browsers—and therefore at least 56 distinct retained captures:

| surface | required receiver/state |
| --- | --- |
| springs | code/readout plus a dense small/meta reader, settled and font-loaded |
| production Slider story | real Slider; rest, keyboard focus, drag, settle |
| `/substrates/glass-material` | dense controls/metadata in surrounding material |
| expandable container | all six changed code labels, expanded |
| Badge | compact/standard/prominent, baseline and glyph centering |
| Chip | compact static plus interactive/selectable/removable focus state |
| dense metadata | one sentence-heavy/action-bearing surface named in manifest |

The CSS viewports are exactly `390x844` and `1440x900`; browsers are current Chromium
and current Safari, with browser/OS builds and actual DPR recorded. Each cell records
route, state, readiness hook, `document.fonts.status`, capture source, source commit/
tree, tarball integrity, clean/dirty digests, viewport/DPR, image hash, and computed
family/style/size/leading/tracking/weight. Inspect and record wrap, truncation,
baseline, overflow, target/hit geometry, surrounding material, and expected delta.

The Card 1440 pair remains valid evidence only for its separate direct-var repair.
The struck byte-identical springs pair remains invalid. A Chrome-only, Safari-by-
argument, 1440-only, post-only, source-workspace, copied, or Card-only set cannot
close W6.

Theme and PRM need not multiply all 28 cells if the Sol paint record states the
token-math orthogonality and proves enclosing-route state/contrast semantics. Width
and browser are never waived: the roles are fluid and font metrics/paint are browser
observables.

## 10. Bounded redress, receipt, and two fresh critics

One declared Luna x-high builder owns the bounded Glass redress described above. The
reset, in-repo mappings, ledger, gate, and package assertions are one atomic source
commit. First-party consumer owners make their own coordinated commits; evidence and
receipt artifacts may follow, but any later product/package byte change invalidates
the package, paint, mutations, and critics.

Append—not rewrite—the Claude-owned receipt with actual model, exact commit/tree,
sorted status/patch/untracked digests, test commands/exits, mutation transcripts,
tarball SHA/integrity, consumer commits/locks, browser/OS identities, and evidence
hashes. Preserve the Opus rows and the recorded `ddc20dc4` race/non-atomic topology.

Then obtain two independent Sol x-high seats on the same exact bytes and integrity:

1. **Namespace/gate/package/consumer critic:** independently verifies reset order and
   allow-set, canonical recipes, ledger equality/exemptions, parser bypasses in every
   channel, mutation transcripts, packed selector bodies/order, immutable 8.0
   identity, and every first-party lock/integrity.
2. **Semantic/paint/accessibility critic:** independently audits every changed reader,
   especially actions/sentences, all 14 mono conflicts, Nuclei, Chip, Badge, built-in/
   arbitrary mappings, and the complete 28-cell before/after matrix for type, wrap,
   baseline, overflow, truncation, targets, and material context.

Both reports state declared Sol x-high provenance and exact report SHA-256. Any byte
change after either review resets both seats. The moving critic, committed critic,
receipt, and this adjudication route the work; none is a post-redress critic.

## 11. Binding final verdict

`35a30fbb` + `ddc20dc4` are not the ruled coupled landing. They contain useful forward
bytes, but Git records a reset-first intermediate tree; the final source deliberately
keeps the rejected narrow namespaces; `text-meta` is absent; required prose/actions
fall to micro; mono, Nuclei, Chip, and Badge contracts are wrong or unresolved; the
gate parses the wrong channels and grammar; package verification does not prove full
recipes; current consumers are unrepinned; and the responsive/browser proof is open.

**Binding disposition: bank the partial without freezing it; keep W6/GATES W4
acceptance RED; apply §§3–10 forward; do not rewrite history or provenance; do not
reuse 7.0.0; close only on the immutable 8.0 receiver set and two fresh exact-byte Sol
x-high critics.**

## 12. Final observation pin

The placeholders below are replaced after this report is written. Each digest excludes
only this report so concurrent formation/user work is fenced rather than absorbed.

```text
FINAL_HEAD=d75885144cf1c975b27467851d9511c88f855d2c
FINAL_TREE=ee20c0a065ccd15d54737c98ed7cd0c7b0856597
FINAL_STATUS_ENTRIES_EXCLUDING_REPORT=54
FINAL_STATUS_EXCLUDING_REPORT_SHA256=8fa2eea0abaf88034fd2605d50467f5267ffc107e9a1cf044400155bd3722017
FINAL_TRACKED_PATCH_EXCLUDING_REPORT_SHA256=e049b3218441f2107c9b9d1520475bfb48c8dd4ceb9a79d75ea77855814bd73a
FINAL_UNTRACKED_PATHS_EXCLUDING_REPORT_SHA256=9641b1c2948df30e361e10b1cbf0a36365e02aa21630b120496cabd3115e85cb
```

This formation seat creates only this report. Its SHA-256 is reported out of band so
the file does not attempt to hash itself.
