# A11Y `35a30fbb` committed critic — Candidate 2

Date: 2026-07-22 EDT
Seat: independent Sol x-high, read-only product/test/evidence/workflow/consumer critic
Audit object: exact commit `35a30fbbce8c381d2258a58a55a6b34df2c92c5c`, with only the
necessary atomicity interaction against immediate child
`ddc20dc44a7d1f1c3b9824dcf22a68375738450c`
Verdict: **RED — useful narrow source candidates; complete BJ A11Y acceptance and candidate freeze
rejected**

## 1. Exact-object and moving-tree fence

The object under review is immutable:

```text
TARGET_COMMIT=35a30fbbce8c381d2258a58a55a6b34df2c92c5c
TARGET_PARENT=f9b9d16eed092e65b5aee7959141adad8e787ae9
TARGET_TREE=5b09c488a2f42aafbf3852c3f64cd3199c5e769b
TARGET_COMMIT_OBJECT_SHA256=3e094ea87bfff3fd6391f333163015a76261485ba820cd141ea014db54cf92a5
PARENT_TO_TARGET_BINARY_DIFF_SHA256=19d1817acfc68314e03e1b1c1cfd7bc373d0cac98d3edaacc9681f44c4ff72ed
TARGET_ARCHIVE_SHA256=c9a80fcc234ceffc23c916fefa06522a2f7952e99af080b9315441111a98cca2

NECESSARY_CHILD=ddc20dc44a7d1f1c3b9824dcf22a68375738450c
NECESSARY_CHILD_TREE=77afabf2115a385fff1b558f743613a1273e9b5c
NECESSARY_CHILD_COMMIT_OBJECT_SHA256=4e7030bb97f80b8e67e0b1ce7c6c288c0f9622c1ec845c05f84356eb69e8baba
```

The shared tree moved materially while this critic was running. Findings read target bytes through
`git show`/an isolated target archive, never through uncommitted source. The last pre-report observation
was:

```text
OBSERVED_HEAD=d75885144cf1c975b27467851d9511c88f855d2c
OBSERVED_TREE=ee20c0a065ccd15d54737c98ed7cd0c7b0856597
OBSERVED_STATUS_SHA256=6ca57e1116bf4ff8e9e13dd707ad98899dc85f10f299d124b7fc6622588727c7
OBSERVED_TRACKED_PATCH_EXCLUDING_REPORT_SHA256=37c7fb3bd45adbe060d034352893cf0bd5e919be083d599e537170f96f2e7de2
OBSERVED_STAGED_PATCH_SHA256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
OBSERVED_UNTRACKED_PATHS_EXCLUDING_REPORT_SHA256=531c0a22724a83400a4857ac54a751a364e338b813085282a1ccbb876e81667c
```

Those moving bytes are excluded from the verdict. This lane created only this report and grants no
credit to later source, tests, evidence, workflow, or consumer work.

The complete binding formation documents were read. Their observed byte hashes were:

```text
5d45e797df2304044f7dfe8bd64353cac5bf2e9a3c0aa55e6663911b3e655292  BAND-A11Y.md
b34174f339aac572c6721255b20b2291b80ace98c07d5da53e69a9c3cb9d9dbe  REGISTRY.md
b720ab6a98c9a6ee24c3c6f3b28a825a99c601032d03bf7c576ae5f5195db890  GATES.md
f2fc8e1590485ae88600d89bd5b5abb2afe2131935efb91495bafeec3f002db1  ROW-CHALLENGE-MATRIX.md
36448d8ea3236eb2afbdf964ae45eaf928668f2399c4da0aefd045979388a8cc  IMPLEMENTATION-ASKS-C2.md
23cdb3792fc6ea332d9276df6c38c6ca4c5140cfbd0caa2b20abc7cd404a712d  CHALLENGES.md
```

They do not authorize a commit subject or a green unit subset to promote an A11Y class. Their consistent
rule is row-grain truth: source touched is not acceptance; dependencies and admissibility holds remain;
browser/AT, contrast, package/consumer, receipt, and two-fresh-critic tails remain binding.

## 2. What the commit usefully lands

The following are worth banking as source candidates, not as accepted rows:

- Category navigation receives a name and the inert `GlassDock` navigation label is removed.
- `DockControl` renders truthful absent/false/true `aria-pressed`, moves disabled state to
  `aria-disabled`, and blocks the component activation path while remaining non-native-disabled.
- the center-dialog anchor/return-focus path, close-button re-ink, and error-live guard move in the
  right direction;
- `InfiniteScroll` adds a polite atomic status node with loading/exhausted copy; and
- placeholder alpha is removed in favor of a named foreground token.

Those changes survive this critique as implementation inputs. None resolves the complete class tail.

## 3. Ranked findings

### C0-1 — the new placeholder rule is a measured dark-mode contrast failure

The target changes `.field-control::placeholder` to `color: var(--muted-foreground)` while the same
control authors `background: var(--control-surface-bg)`, whose field value is
`var(--input-on-glass)`. Exact target token resolution and WCAG sRGB math give:

| mode | foreground | authored field background | ratio | text floor |
| --- | --- | --- | ---: | ---: |
| light | `hsl(30 8% 43%)` | `hsl(30 33% 99%)` | 5.405:1 | 4.5:1 |
| dark | `hsl(34 14% 62%)` | `hsl(26 12% 22%)` | **4.219:1** | 4.5:1 |

The dark arm is RED before glass compositing is even needed: this control owns an opaque authored fill.
The tracked test passes because it scans for the token name and absence of slash-alpha; it never
resolves the actual foreground/background pair. The evidence description that treats placeholder
surfaces as page-opaque is false for `.field-control`. Other placeholder families still require their
real Safari/Chromium, light/dark, material-backed pairs; source-token presence cannot substitute for
paint truth.

This is a product defect and a gate-design defect. A surface-aware placeholder ink/token decision must
come from Sol; merely weakening or special-casing the ratio assertion is inadmissible.

### C0-2 — CONTRAST W3-A and W3-C remain untouched, with multiple exact failures

The target does not redress status-tone foregrounds. Exact target pairs remain:

```text
light success      2.187:1
light info         3.450:1
dark success       1.561:1
dark info          2.335:1
dark destructive   2.992:1
```

These are below the 4.5:1 normal-text floor. The one-table contrast invariant required by W3-C is also
absent. Thus CONTRAST cannot be represented as landed because W3-B changed.

The dialog close change is directionally plausible: the exact token pair is 10.780:1 light and 9.879:1
dark; after the element's `opacity-70` is composited over the authored card, it is approximately
4.788:1 light and 5.777:1 dark, above a 3:1 non-text floor. But its test asserts only class text. It does
not prove computed paint, hover/focus/disabled states, backdrop/card interaction, Safari/Chromium, or
the icon's target geometry. The close control has a `w-4 h-4` icon and no explicit padding/hit utility;
its target floor is unproved and likely undersized, subject to the spacing exception rather than assumed
away. W3-B remains source-candidate only until the required browser rect/contrast/focus evidence exists.

### C0-3 — STATE is incomplete: skip linkage and composition heading order are still absent

The exact target has no skip link, no skip-to-main `href`, and no corresponding main target `id`.
Adding `tabindex="-1"` to a main element is not W1-E. The target auth/empty-state composition also still
contains an `h1` followed by an `h3` without the required intermediate `h2`; W1-F remains under the
formation hold.

The navigation and Dock assertions do not close their own behavioral tails either:

- navigation tests use source regular expressions rather than the rendered accessibility tree and
  landmark-name uniqueness across responsive/dialog states;
- the Dock disabled test checks attributes and directly invokes a handler, but does not focus the real
  control, tab through it, dispatch trusted Enter/Space, inspect VO state, or prove no leaked activation;
- the center-dialog test proves that a trigger's `.focus()` was called, not that `activeElement` remains
  the trigger after FocusScope exit settles. The tracked verdict itself admits the limitation; it does
  not cover reopen, stale/removed anchors, outside-close paths, or reduced motion.

W1-A through W1-D are useful narrow source candidates. Missing W1-E/W1-F and the browser/AT tail keep
STATE acceptance RED.

### C0-4 — the exact commit is not an atomic build-safe object with respect to its W6 interaction

`35a30fbb` clears the `--text-sm` and `--text-xs` Tailwind bridge namespace but migrates only three
readers. Its exact tree still has 249 textual `text-sm`/`text-xs` matches in Vue/TS/CSS channels. A fresh
exact demo build succeeds, but the emitted CSS contains neither `.text-sm{` nor `.text-xs{`; live target
readers silently inherit or fall back.

The immediate child `ddc20dc4` reduces the residuals to 35 comment/test-only matches and therefore
repairs this particular committed intermediate. That necessary interaction does not make the parent
atomic and does not repair any A11Y finding in this report. The parent commit cannot simultaneously be
called a standalone green A11Y cut and rely on its child to finish an unrelated namespace migration.
This is especially material because the package remains named/versioned `@mkbabb/glass-ui@7.0.0`.

### C0-5 — LINKAGE tests bless an invalid real PagerDots configuration

`PagerDots` defaults to the `tabs` pattern and therefore emits `role="tab"`, but `panelIds` is optional.
The implementation omits `aria-controls` for absent/sparse entries and its test explicitly blesses that
omission. Every target demo Carousel consumer omits `panelIds`; the corresponding Carousel items have
neither matching ids nor `tabpanel` roles. The green unit test covers an artificial fully supplied prop,
not the real product path. A tab is not complete when no controlled panel relationship exists.

Dock linkage is also narrower than claimed. Generated ids sanitize arbitrary public ids without proving
post-sanitization uniqueness (`"a b"` and `"ab"` can collide), and the tablist has no demonstrated name.
Tests cover only simple `a`/`b` data. Slider W2-E/W2-F remain held and absent: the target continues to
use a track `.focus-within` treatment and has no proved coarse-pointer target expansion. LINKAGE A-D may
be source-touched; the class remains acceptance RED.

### C1-1 — ROVING remains almost entirely open

The exact `HeaderRibbon` is still a `role="toolbar"` whose slotted controls remain ordinary tab stops;
there is no single roving tab stop, arrow navigation, Home/End behavior, focus persistence, or disabled
item policy. Sidebar comments use the word “roving,” but the component remains a `role="group"` with all
controls in sequential focus. The formation already assigns W5-A/W5-B to the GF Dock dependency; this
commit cannot take their credit.

W5-C's DockControl direction is bankable, but its tests do not prove focusability, sequential focus,
trusted keyboard blocking, or VoiceOver exposure. The row is source-touched only and remains dependency-
and-evidence RED.

### C1-2 — the live-region skeleton does not prove announcement lifecycle or repetition

`InfiniteScroll` now exposes `role="status" aria-live="polite" aria-atomic="true"` and computed loading,
exhausted, or empty text. Its three tests inspect only current DOM text for one idle-to-loading and one
idle-to-exhausted path. They do not establish:

- loading -> idle -> loading repetition or whether the same message is re-announced;
- direct/rapid loading -> exhausted transitions and coalescing;
- mount-time behavior or mutation delivery in Safari + VoiceOver;
- interaction with the hidden sentinel and visible slots; or
- behavior in an installed first-party consumer.

The public announcement strings are hard-coded English even though visible loading/end content is
slotted. Sol must decide whether injectable/localized announcement copy is a required public API; this
critic does not silently add that product scope. The existing `errorLive` guard is a useful KEEP test.

Real consumers in speedtest use `InfiniteScroll`, but they remain pinned to installed
`@mkbabb/glass-ui@4.0.1`, not to immutable candidate bytes. No receiver proves the new lifecycle.

### C1-3 — package and public-contract evidence are absent

The commit deletes the public-looking `--surface-tint-35` token, its dark arm, and bridge exposure while
keeping package version 7.0.0. It supplies no complete public-token ledger, breaking-change decision,
migration note, immutable packed candidate, or clean installed-consumer receipt. A local source census
that finds no current reader is useful diagnostic evidence, not proof that a published CSS custom
property had no consumer.

Fresh target mechanics are encouraging but insufficient:

```text
isolated npm ci --ignore-scripts: PASS; 186 packages; 0 vulnerabilities
exact seven A11Y files: PASS; 27/27 cases
broader twelve touched A11Y files: PASS; 60/60 cases
npm run build: PASS; 726 modules; 67 projected declaration entries
npm run demo:dist:build: PASS
package identity: @mkbabb/glass-ui@7.0.0
```

There is no immutable pack/install/API/paint consumer proof. Installed value.js remains on the registry
7.0.0 artifact and has multiple DockControl/ARIA consumers; speedtest remains on 4.0.1. The target does
not repin either. Clean local build is not an external acceptance receipt.

### C1-4 — “27 assertions” is neither numerically exact nor behaviorally sufficient

The target's seven files do pass exactly 27 test cases in a clean archive. They contain 66 lexical
`expect(` occurrences, so “27 assertions” is an imprecise description. More importantly, the subset is
constructed to omit the acknowledged open rows and cannot catch the measured failures above:

- it source-scans the placeholder token while dark paint is 4.219:1;
- it class-scans dialog close without computed contrast or target geometry;
- it source-scans navigation rather than rendering its accessibility tree;
- it blesses missing Pager `aria-controls`;
- it spies a focus method rather than final settled focus;
- it inspects live-region strings rather than announcement lifecycle; and
- it has no skip link, heading, status-tone table, HeaderRibbon roving, Slider focus/target, browser/VO,
  package, or consumer arm.

The 60/60 broader touched-file pass while real Pager consumers and outstanding class rows remain RED is
additional evidence that this suite is not an acceptance gate.

## 4. Row-grain classification

| A11Y class | Formation state / dependency | Exact source-touched scope | Acceptance ruling |
| --- | --- | --- | --- |
| STATE | `ST + AP-13(s)` | narrow W1-A through W1-D candidates | **RED** — W1-E absent; W1-F held/unfixed; placeholder contrast and browser/AT/focus tails fail |
| LINKAGE | `ST + DH` | W2-A through W2-D previously/source touched | **RED** — real Pager tab-panel link absent, ids underproved, W2-E/F held/unlanded |
| CONTRAST | `ST(s) + DH + AP-25(s)` | only W3-B source touched here | **RED** — W3-A failures persist, W3-C gate absent, W3-B browser/geometry tail absent |
| LIVE-REGIONS | `ST` | W4-A source skeleton plus W4-B KEEP guard | **HOLD/RED** — lifecycle, repetition, VO/browser, API decision, and consumer receipt absent |
| ROVING | `ST + DH` | W5-C source candidate; W5-A ruling only | **RED** — W5-A/B dependency implementation absent and W5-C behavior/AT unproved |

No row is promoted to DONE. “Source-touched” in this table is deliberately narrower than “accepted.”

## 5. Born-RED mutations required before a future green claim

These are retained failing mutations/tests, not prose-only watch reports:

| mutation / fixture | must be RED because | acceptable GREEN condition |
| --- | --- | --- |
| resolve dark `.field-control` placeholder against its authored input surface | current exact ratio is 4.219:1 | >= 4.5:1 for every owned foreground/background pair and both engines/modes |
| replace a status tone with each exact current failing pair | no common contrast invariant exists | one normative table and one gate cover all modes/states with declared floors |
| remove or mispoint the skip link/main id | exact target has no relationship to protect | first-tab skip reaches and focuses named main after activation |
| render auth empty state as current `h1 -> h3` | current heading seam is invalid | ordered heading/accessibility-tree contract passes |
| render every real Carousel PagerDots call with no `panelIds` | production tabs control no panels | API makes valid ids/panels intrinsic or the consumer supplies complete unique linkage |
| collide Dock ids such as `"a b"` and `"ab"` | sanitizer can create duplicate DOM ids | deterministic unique ids and exact tab/panel pairs |
| tab/arrow/Home/End through HeaderRibbon with a disabled child | toolbar has no roving implementation | one tab stop, specified navigation, disabled policy, and focus persistence |
| focus disabled DockControl then send trusted click/Enter/Space | current unit bypasses focus and event plumbing | focusable + exposed disabled state + no activation in browser/VO |
| close center dialog after entry animation, reopen, then remove/stale the trigger | a `.focus()` spy is not settled focus truth | final focus target is correct across close paths and PRM |
| force loading -> idle -> loading and rapid loading -> exhausted | current string tests do not prove repeats/coalescing | live node mutates so required announcements are delivered exactly as specified |
| measure close target rect and eight-point contrast states | class text cannot prove paint/geometry | declared target/spacing floor and all computed state ratios pass |
| build exact `35a30fbb` before `ddc20dc4` with a representative `text-sm` reader | reset removes its emitted utility | no committed intermediate can strand a reader |
| pack an immutable candidate and install it into named first-party fixtures | same-version local build is not consumer evidence | exact tarball hash, installed version/hash, build, keyboard/AX/paint receipt |

Any test that replaces those mutations with source-regex/class-string presence preserves the false-green
mechanism and is not redress.

## 6. Bounded Luna x-high redress

Luna's next implementation slice should remain within the A11Y band plus the already-created W6
atomicity seam:

1. Reconcile each table row with its actual formation owner/hold; preserve the useful target source
   candidates but do not relabel entire classes green.
2. Add one reviewed contrast source of truth for status tones, placeholder ink per authored surface, and
   dialog close states; drive both tokens and tests from it. Keep normal text at 4.5:1 and declare the
   non-text/large-text exceptions explicitly rather than inferring them.
3. Land the missing skip-to-main relationship and AP-13-approved heading seam. Exercise the first-tab,
   activation, focus, and accessibility-tree path in current Chromium and Safari/VoiceOver.
4. Make PagerDots incapable of emitting orphaned `role="tab"` controls. Prefer intrinsic panel
   ownership/linkage or require a complete collision-safe id contract; update every real Carousel
   fixture, not only a synthetic unit prop.
5. Implement/receive the HeaderRibbon and dock roving dependency; prove DockControl disabled focus and
   trusted activation behavior. Complete Slider focus-visible and coarse-target rows under their
   Material dependency rather than claiming around them.
6. Specify and test InfiniteScroll announcement repetition/coalescing, then obtain a Sol decision on
   customizable/localized AT copy. Keep the existing invalid/error-live guard.
7. Repair the `35a`/`ddc` atomic seam as formation truth: either treat the pair as one banked dependency
   with no standalone green claim or produce a truly atomic forward cut. Do not rewrite history in this
   critic lane.
8. Produce a clean immutable package candidate and install it into named real consumer fixtures. Record
   exact package/tarball hash, consumer lock resolution, build, landmark/keyboard/focus/live/contrast
   evidence, and repository dirty state.
9. Retain the born-RED artifacts above, run the complete final suite after the last edit, reconcile the
   formation receipt at row grain, then route two fresh exact-byte Sol critics.

This redress does not authorize unrelated styling, public API expansion without the named Sol decision,
consumer repository edits by this critic, formation rewrites, or weakening any current gate.

## 7. Two fresh Sol critic requirements

After Luna redress and an immutable receipt, route both critics on the same exact candidate bytes:

### Fresh Sol critic A — semantics, keyboard, focus, and live lifecycle

Independently verify rendered landmark names; skip and heading order; tab-panel ownership and id
uniqueness; HeaderRibbon/dock/Slider keyboard paths; disabled DockControl focus + blocked trusted
activation; center-dialog entry/exit/reopen/PRM focus; and repeated/rapid InfiniteScroll announcements in
Chromium plus Safari/VoiceOver. It must inspect final `activeElement` and accessibility-tree/live behavior,
not method spies or source strings.

### Fresh Sol critic B — contrast, package, and consumer contract

Independently recompute every contrast-table pair from exact built CSS across light/dark and relevant
glass/opaque surfaces, including placeholder and all dialog close states; verify target rect/spacing;
audit public token removals and the W6 intermediate; install the exact hashed candidate package into the
named consumer fixtures; and reproduce build plus representative keyboard/AX/paint behavior. It must
reject same-version workspace links and unpinned package bytes.

Both critics must record commit, tree, package/tarball, evidence, commands, browser versions, consumer
lock resolution, and clean/dirty status. They are acceptance tails, not retrospective endorsements of
this target.

## 8. Freeze ruling

`35a30fbb` is bankable only as a set of narrow source candidates. The exact 27/27 pass and clean builds
are reproducible, but they coexist with a measured dark placeholder failure, untouched status-tone
failures, missing STATE/LINKAGE/ROVING work, incomplete live lifecycle, a non-atomic W6 intermediate,
and no immutable package/consumer/browser/AT receipt.

**Candidate freeze remains blocked. Do not promote STATE, LINKAGE, CONTRAST, LIVE-REGIONS, or ROVING to
accepted on this commit.**
