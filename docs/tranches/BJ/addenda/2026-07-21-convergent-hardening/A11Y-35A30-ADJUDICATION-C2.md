# A11Y `35a30fbb` third-pass adjudication — Candidate 2

Date: 2026-07-22 EDT

Seat: independent Sol x-high, formation-only adjudicator

Exact source object: `35a30fbbce8c381d2258a58a55a6b34df2c92c5c`

Necessary atomicity child: `ddc20dc44a7d1f1c3b9824dcf22a68375738450c`

Exact committed critic: `A11Y-35A30-COMMITTED-CRIT-C2.md`, SHA-256
`b0074978235f8a8b3575bd89eb24c807f3cc7f49c482e7f9474389c58a9dad36`

Verdict: **DEFECT / BANK NARROW SOURCE CANDIDATES / ALL FIVE A11Y ROWS RED / FREEZE RED**

## 1. Authority and moving-tree fence

This is the third adversarial pass over the A11Y class: the original BAND-A11Y derivation, the exact
committed-byte critic, and this row-grain adjudication. It does not inspect or credit the moving shared
worktree as product truth. The immutable audit identifiers reproduced during this pass are:

```text
TARGET_COMMIT=35a30fbbce8c381d2258a58a55a6b34df2c92c5c
TARGET_TREE=5b09c488a2f42aafbf3852c3f64cd3199c5e769b
TARGET_COMMIT_OBJECT_SHA256=3e094ea87bfff3fd6391f333163015a76261485ba820cd141ea014db54cf92a5
TARGET_ARCHIVE_SHA256=c9a80fcc234ceffc23c916fefa06522a2f7952e99af080b9315441111a98cca2

NECESSARY_CHILD=ddc20dc44a7d1f1c3b9824dcf22a68375738450c
NECESSARY_CHILD_TREE=77afabf2115a385fff1b558f743613a1273e9b5c
NECESSARY_CHILD_COMMIT_OBJECT_SHA256=4e7030bb97f80b8e67e0b1ce7c6c288c0f9622c1ec845c05f84356eb69e8baba
```

The complete binding sources were read. Their bytes at adjudication time were:

```text
5d45e797df2304044f7dfe8bd64353cac5bf2e9a3c0aa55e6663911b3e655292  BAND-A11Y.md
811c4075ea33d843b8ccb821fd115b18e4b9e2ff53401ddf49408cddad438f77  REGISTRY.md
2b429aace60e233ec2248f1e1c879151bc6634546e880e658c7c4014f9e36d0e  GATES.md
bb02d50bd81fe2f26d77a37a805ebc17644eb730cd5a7ee4ffb895336e99a30d  ROW-CHALLENGE-MATRIX.md
7092949f4fba47550b7b872411ae54db0df63fcfecd3e0a39e754f20e423754c  IMPLEMENTATION-ASKS-C2.md
e51d2618bf71e611a01778ebb0ceb19fb4ef45fdf596e6a91c8f75524a822e7e  CHALLENGES.md
```

The shared tree was observed at `d75885144cf1c975b27467851d9511c88f855d2c`, tree
`ee20c0a065ccd15d54737c98ed7cd0c7b0856597`, and was dirty. Those bytes, all later source changes,
and every concurrent workflow output are excluded. This lane creates only this report.

## 2. Third-pass disposition

The commit title's aggregate “born-RED→GREEN” claim is rejected. The 27/27 narrow unit result is
reproducible, but it coexists with invalid production semantics and measured failures that those tests
cannot see. The source is valuable only at sub-row grain:

| row | exact bank | rejected close | binding state |
| --- | --- | --- | --- |
| `BJ.W-A11Y-STATE` | desktop nav direction; Dock toggle discriminant; dialog anchor/guard direction; removal of placeholder alpha | desktop-only/source-regex landmark proof; one-token placeholder claim; focus-spy acceptance; absent skip and heading work | **BANKED PARTIAL / RED + AP-13(s)** |
| `BJ.W-A11Y-LINKAGE` | Dock tab/panel shape; kbd de-dup direction; conditional Carousel tab stop; deleted Combobox contingency | collision-prone Dock ids; optional/sparse Pager tab links; absent Slider E/F | **BANKED PARTIAL / RED + DH** |
| `BJ.W-A11Y-CONTRAST` | close-X re-ink direction | untouched status failures; absent invariant table; class-string and unmeasured target proof | **BANKED NARROW / RED + DH + AP-25(s)** |
| `BJ.W-A11Y-LIVE-REGIONS` | persistent polite status node; `invalid`/`errorLive` KEEP | current-string tests; no repeat/coalescing/AT/API/consumer proof | **BANKED PARTIAL / RED** |
| `BJ.W-A11Y-ROVING-RULINGS` | DockControl tri-state/`aria-disabled` direction | no HeaderRibbon roving; no trusted disabled behavior; false demo copy; GF-DOCK dependency open | **BANKED NARROW / RED + DH** |

No row is DONE. No row may be used as a freeze input without the redress and terminal evidence below.

## 3. Binding row-grain rulings

### 3.1 STATE — bank four mechanics, complete six user paths

#### W1-A — category navigation landmark

Bank the desktop `<aside>`→named `<nav>` direction and removal of the prohibited name from the generic
`GlassDock` host. Reject the source-regex test as acceptance. `SidebarDock` has two real hosts: the
desktop rail and the mobile category sheet. At the exact target only the desktop host receives the
`nav`; the sheet renders `SidebarDock` inside a named dialog without a category-navigation landmark.

The contract is **exactly one exposed, named category-navigation landmark in each responsive
posture**, never a nested or hidden duplicate:

- desktop: the visible rail wrapper is `nav[aria-label="Category navigation"]`;
- mobile sheet open: the sheet's category-control region has the same named `nav` semantics;
- mobile sheet closed and the breakpoint-hidden desktop rail contribute no accessibility-tree
  landmark; and
- the separate bottom story navigation remains independently named “Stories in category.”

The implementation may wrap each host rather than changing `SidebarDock`'s root, avoiding nested navs.
GREEN comes from rendered accessibility trees at both breakpoints and sheet postures, not an SFC regex.

#### W1-B and W5-C shared DockControl seat

Bank the three-state `active` contract: absent means navigation and emits no `aria-pressed`; explicit
false/true emit their corresponding states; `data-active` and selected paint remain true-only. Bank
`aria-disabled` without native `disabled` as the selected boundary-control model.

Acceptance additionally requires real focus and activation behavior:

- a disabled boundary control is reachable by the owning navigation model and announced disabled;
- trusted pointer, Enter, and Space cannot activate it, including `asChild`/link hosts;
- an enabled control activates exactly once;
- toggle name and pressed state remain correct before and after activation; and
- no capture listener suppresses an unrelated sibling's first action.

The existing wrapper-triggered click unit and direct handler observation are diagnostics, not this
contract. G6 compact hit ownership and morph-onset reliability remain a separate W2-F sibling clause;
`35a30fbb` receives no G6 credit.

#### W1-C — centered spring focus return

Bank the path-neutral anchor and widened side/center guard. Reject the `.focus()` spy as terminal
focus truth. The real contract is final `document.activeElement` plus accessibility-tree state after
the logical close and the exit mount-hold settle. It covers:

- close button, Escape, and permitted outside-close paths;
- full motion, PRM, and reopen during the prior exit;
- stale, removed, disabled, or disconnected triggers with a documented safe fallback; and
- nested/sibling dialogs, where a stale close must not steal focus from the newest generation.

The exiting subtree becomes inert and leaves the accessibility tree at logical close; the visual tail
may continue independently. A stale callback cannot restore focus after a reopen.

#### W1-D — placeholder contrast

Reject the claim that bare `--muted-foreground` is one measured solution. On the exact owned field
surface, dark `--muted-foreground` (`hsl(34 14% 62%)`) over `--input-on-glass`
(`hsl(26 12% 22%)`) is **4.219:1**, below 4.5:1. The source test passes because it checks a token name,
not the foreground/background pair.

The Sol ruling preserves one semantic seam without globally retuning muted text:

- mint `--placeholder-foreground`;
- its root/light value resolves to `var(--muted-foreground)`;
- its dark arm resolves to `var(--muted-foreground-strong)`;
- all four band-owned page/field placeholder rules read this seam with no local alpha or `opacity`;
- a material host may rebind that same seam only if its measured composited surface requires it; and
- dock search retains its separately calibrated `--on-glass-muted` exemption.

This is a candidate value choice, not paint acceptance. The one contrast table must resolve the actual
authored/composited surface behind each family in Safari and Chromium, light and dark. If a pair still
misses 4.5:1, Sol retunes the one semantic seam or a host rebind; Luna may not weaken the floor.

Keep deletion of `--surface-tint-35` only as an **8.0 public-ledger candidate**. It ships after a fresh
consumer census, removal/migration entry, built CSS proof, and mutation bite. “Zero current Glass
reader” does not prove that a published custom property had no external consumer.

#### W1-E — skip to main

This is unlanded and mandatory. Add the first tabbable shell control, visibly revealed on focus,
targeting one stable main id on the existing `tabindex="-1"` main. Activation must move focus and the
viewport to main without duplicating the route-settle focus path. The link remains usable at 390 and
1440, clear of persistent chrome, in both writing directions.

#### W1-F — composition outline

The exact target retains `auth-shell`'s `h1→h3` and `empty-states`' local `h3` without an intermediate
`h2`. Preserve the AP-13 slice: if an owning reduction deletes a named specimen, its local repair and
test die with it; every surviving specimen must render an ordered accessibility-tree outline. This row
does not take the separately owned one-h1-per-page Story chassis seam.

### 3.2 LINKAGE — valid by construction, not optional ARIA

#### W2-A — Dock layers

Bank the bidirectional Dock tab/panel shape. Replace `idSafe(faceId)` deletion-normalization: values
such as `"a b"` and `"ab"` must never generate the same DOM id. Use one deterministic, collision-free
encoding under the group `useId()` namespace; duplicate public face ids are a rejected input, not a
second panel relationship.

The visible rail tablist also receives one public accessible-name route:
`railAriaLabel?: string`, trimmed with the truthful default `"Dock layers"`, and rendered as the
rail's `aria-label`. Tests cover arbitrary
Unicode/punctuation ids, normalization collisions, duplicate ids, rerender/reorder, rail hidden,
single face, and multiple groups in one document. Every emitted `aria-controls` resolves to exactly
one panel and every panel label resolves to exactly one tab. The registry rejects a duplicate face
descriptor before it can create a second tab/panel pair; development emits a diagnostic.

#### W2-A — PagerDots and Carousel

The candidate's optional/sparse `panelIds` shape is rejected. A component may never emit `role="tab"`
while omitting its controlled panel. The 8.0 contract is:

- `pattern="group"` is the safe default and uses buttons plus `aria-current` without tab semantics;
- explicit `pattern="tabs"` requires a complete, nonempty, unique, exact-`count` `panelIds` array;
- only a complete relationship emits `tablist`/`tab`/`aria-selected`/`aria-controls`;
- an incomplete runtime relationship fails closed to the group register and emits a development
  warning, rather than shipping orphaned tabs; and
- each real Carousel slide in the tabs path owns the matching id, panel role, and an accessible name.

Update all actual Carousel/Pager stories and fixtures, not merely the synthetic unit prop. The
default/requirement change and `panelIds` contract enter the 8.0 public ledger and migration. Sparse
links are not supported.

#### W2-B through W2-D

- The Combobox site contingency has fired in the exact tree: the removed family receives no
  resurrection patch. Retain only a one-time rendered decorative-icon sweep; do not create a standing
  architecture gate when no product defect remains.
- Bank the shortcut label de-dup direction, but verify the `<dt>`/group exposes the full combo once in
  the accessibility tree and that individual `<kbd>` parts do not repeat it.
- Bank Carousel's conditional region/tab-stop change: unnamed generic carousels are not sequential
  tab stops; a named carousel remains a named region with its keyboard path.

#### W2-E, W2-F, and G6

Slider E/F remain dependency-held until the adjudicated MATERIAL W4 track cut co-lands. The exact
focus contract is thumb `:focus-visible`→visible track ribbon; pointer focus alone must not paint the
keyboard ring. The exact coarse contract is a centered 44×44 action envelope at the current value:
all four corners and four edge midpoints must begin the documented Slider value/drag path through the
root, track, or thumb. A pseudo-element size with no action ownership is insufficient.

The compact DockControl clause stays free-standing. Its pinned Q detector remains GREEN/current
contract RED and is not merged into Slider or credited here.

### 3.3 CONTRAST — one table, real surfaces, no class-string green

#### W3-A — status tones

The exact candidate leaves five text failures: light success 2.187:1, light info 3.450:1, dark
success 1.561:1, dark info 2.335:1, and dark destructive 2.992:1. Mint one mode-invariant
`--status-ink-dark` for luminous plates. Bind `--success-foreground`, `--warning-foreground`, and
`--info-foreground` to it in both mode arms; bind the dark `--destructive-foreground` arm to it.
Light destructive may retain its light ink only while its exact pair passes. The table must prove the
selected `--status-ink-dark` clears 4.5:1 for every bound plate. Do not add per-component color patches.

Button tones may lead. Alert/Badge/Toast rows remain data-driven on the FM W4/ASK-25 material ruling;
the gate table consumes that result and may not pre-decide the alert material fork.

#### W3-B — dialog close

Bank `text-accent-foreground` as the candidate open-state direction. A class-string assertion is not
paint proof. Measure the exact glyph/seat/card composite at rest, open, hover, keyboard focus, press,
and forced colors in both modes and engines. The control must also expose an honest target of at least
24×24 CSS px or a measured WCAG 2.5.8 spacing exception; at coarse pointer it follows the product's
44px control floor. Focus paint, hit ownership, and surrounding-title clearance must survive the
overlay padding and scroll variants.

#### W3-C — the single invariant

Create one normative computed-pair source covering:

1. status plate/ink pairs in every mode and selected FM material outcome;
2. the four real placeholder foreground/surface pairs, including translucent composition;
3. the close control's declared text/non-text state floors; and
4. explicit 4.5 text / 3.0 non-text exceptions, never inferred from class names.

The ordinary gate parses built values and independently recomputes ratios. Live glass composition,
Safari paint, focus, target geometry, and deltas remain retained browser evidence rather than brittle
pixel constants in every unit run.

### 3.4 LIVE-REGIONS — lifecycle contract plus localized public copy

Bank the persistent `role="status"`, polite, atomic node and keep `invalid`/`errorLive` exactly as
load-bearing LabeledField contracts. The current `announcement` computed and three string tests do not
prove a live announcement.

Sol closes the copy/API fork: InfiniteScroll gains two optional public strings,
`loadingAnnouncement` and `endAnnouncement`, defaulting to the current English copy. Localized
consumers pass their own copy; visible slots and AT copy are not silently assumed equal. These props
and defaults enter the 8.0 ledger.

The state machine announces on entry to loading and exhausted, does not duplicate on unrelated
rerenders, re-announces loading after `loading→idle→loading`, and converges rapid
`loading→exhausted` to the final state without a stale late loading message. Initial loading and
initial exhausted mounts receive an explicit tested policy rather than browser accident. Current
Safari+VoiceOver validates delivered order; Chromium validates DOM mutation and accessibility-tree
state. A real installed InfiniteScroll consumer proves the same lifecycle.

### 3.5 ROVING — dependency-held toolbar, bank disabled semantics only

W5-A remains a decided ruling owned by GF-DOCK W3; A11Y does not fork another dock keyboard engine.
W5-B begins only after that owner adds `toolbar` to the existing `useSelectionGroup` role menu.

HeaderRibbon then consumes that one engine with a horizontal toolbar contract: one sequential tab
stop, arrow movement along the rendered/RTL axis, no wrap, Home/End to true extremes, stable DOM and
VoiceOver order, focus persistence through reorder, and a stated disabled-item policy. Disabled items
remain arrow-focusable and announced but never activate. PRM changes travel, not semantics.

The exact target story text saying a disabled HeaderRibbon control “drops out of the tab order” is
false against the current `aria-disabled`-only implementation and must be corrected with the behavior
cut. A mutation restoring three ordinary tab stops must RED. Do not mint a second roving composable or
a public HeaderRibbon item component unless the existing engine cannot accept the actual slot hosts
and Sol separately approves that API expansion.

## 4. The `35a` / `ddc` atomicity ruling

`35a30fbb` clears Tailwind's `--text-sm` and `--text-xs` namespace while leaving hundreds of textual
readers; its exact built CSS emits neither utility. The immediate child performs the broad migration
and repairs that particular stranded intermediate. This relationship does not make `35a` standalone
green, and `ddc`'s own role and full-ramp defects remain under the W6 adjudication.

Binding process truth:

1. Preserve both historical commits; do not rewrite them.
2. Treat `35a30fbb+ddc20dc4` as one **banked dependency unit** for any candidate build or release.
3. No tag, package, consumer repin, or A11Y acceptance proof may use `35a` without its child and the
   subsequent W6 full-reset redress.
4. The final immutable package must satisfy both the A11Y rows here and the separately adjudicated
   W6 role/ramp contract. A green A11Y subset cannot mask a broken type ramp.
5. The receipt names this split explicitly; “file-complete” is not atomicity.

## 5. False-green mechanisms to remove

The following proof forms are rejected even when their present tests are green:

- SFC regexes for landmarks, skip order, headings, or names;
- token-name/absence scans standing in for contrast computation;
- class-string presence standing in for computed close paint and geometry;
- a `.focus()` spy standing in for final settled focus;
- optional or sparse `aria-controls` tests that bless invalid production tablists;
- current live-region text standing in for repeat/coalescing/AT delivery;
- wrapper-triggered click standing in for trusted pointer/Enter/Space behavior;
- a pseudo hit-area declaration with no eight-point action ownership;
- synthetic Pager data while every real Carousel omits linkage;
- “27 assertions” used as a coverage claim (the subset is 27 cases with many lexical expects and
  intentionally omits open rows);
- same-version workspace/source builds standing in for an immutable package and installed consumer;
  and
- a clean local build standing in for Safari/VoiceOver or Chromium browser truth.

## 6. Bounded Luna x-high redress order

Luna may implement only after receiving these rulings and the separately adjudicated W4/W6 dependency
contracts. The bounded order is:

1. **Atomic base:** build on `35a+ddc`; retain banked mechanics; complete the W6 forward redress so no
   released intermediate strands the type ramp.
2. **STATE:** add mobile landmark parity, skip-to-main, and the AP-13-authorized surviving heading
   repairs; retain the Dock tri-state and path-neutral dialog anchor.
3. **Contrast source:** add `--placeholder-foreground` and `--status-ink-dark`; drive the single
   computed table; ledger `--surface-tint-35` and every new/changed CSS token.
4. **Linkage:** replace destructive Dock id normalization; name the tablist; make Pager group-safe by
   default and tabs complete-only; migrate every real Carousel fixture.
5. **Dependency rows:** after MATERIAL W4/GF-DOCK W3, land Slider focus/hit ownership and HeaderRibbon
   roving through the existing engines. Keep G6 independently receipted.
6. **Live lifecycle:** add the two announcement strings and transition logic while retaining the
   LabeledField KEEP guard.
7. **Tests and mutations:** replace false-green tests with rendered behavior while retaining cheap
   source scans only as diagnostics.
8. **Package/consumers:** produce one uniquely versioned immutable 8.0 tarball, install it into isolated
   and named first-party fixtures, then coordinate external lock repins in their owning repositories.
9. **Evidence/receipt:** run the final full suite only after the last edit, record exact source/tree/
   tarball/consumer/browser identities and dirty state, and append the row-grain receipt.
10. **Critics:** route the two fresh Sol tails in §9 against the same immutable bytes.

Luna may split reviewable source commits, but A11Y/package/freeze acceptance is atomic. This ruling
does not authorize consumer shims, private selectors, history rewriting, new roving engines, weakened
contrast floors, arbitrary public APIs, or edits to external repositories from the Glass lane.

## 7. Born-RED mutation matrix

Each mutation runs independently and must fail for the stated reason:

| row | mutation | required bite |
| --- | --- | --- |
| STATE | remove the mobile sheet nav wrapper or expose desktop+mobile category navs together | rendered tree has zero or duplicate category landmark |
| STATE | delete/mispoint the skip href/main id or move the link after shell controls | first-tab activation fails to focus and reveal main |
| STATE | restore surviving `h1→h3`/orphan `h3` | rendered outline fails; deleted specimen is not tested |
| STATE | collapse absent `active` to false | nav control is mis-announced as a toggle |
| STATE/ROVING | send trusted pointer/Enter/Space to disabled DockControl | any consumer activation fails the guard |
| STATE | close, reopen, then disconnect the original trigger | stale close steals focus or leaves body focused |
| STATE/CONTRAST | restore dark field placeholder to `--muted-foreground` | exact 4.219:1 pair fails the computed table |
| STATE/CONTRACT | restore `--surface-tint-35` without ledger/census entry | 8.0 public ledger gate fails |
| LINKAGE | feed Dock ids `"a b"`, `"ab"`, Unicode, duplicates, and two groups | any duplicate id or cross-group relationship fails |
| LINKAGE | render real Carousel PagerDots without complete ids | component must fall closed to group; orphan tab semantics fail |
| LINKAGE | provide sparse/duplicate/wrong-count `panelIds` | tabs register cannot emit |
| LINKAGE | restore per-key full-combo labels | accessibility tree announces the combo more than once |
| LINKAGE | restore unnamed Carousel `tabindex=0` | generic focus stop fails |
| LINKAGE | restore Slider `:focus-within` | pointer focus paints the keyboard-only ribbon |
| LINKAGE | remove Slider's coarse action floor or make its corners inert | eight-point trusted value/drag probe fails |
| CONTRAST | restore each of the five exact status pairs independently | common computed table fails below 4.5 |
| CONTRAST | omit one selected FM material state from the table | table completeness mutation fails |
| CONTRAST | restore muted close ink, compound opacity below floor, or shrink its target | computed state/geometry proof fails |
| LIVE | run `loading→idle→loading` | second required announcement is absent |
| LIVE | run rapid `loading→exhausted` | stale/loading-late or missing final announcement fails |
| LIVE | pass localized copy and restore hard-coded English | rendered live copy contract fails |
| LIVE | drop `invalid` or set `errorLive="off"` while retaining live attr | LabeledField linkage/politeness guard fails |
| ROVING | restore one tab stop per HeaderRibbon action | toolbar tab-stop invariant fails |
| ROVING | wrap arrows, reverse RTL visual travel, or skip true Home/End extremes | keyboard matrix fails |
| ATOMICITY | build/package exact `35a` without `ddc`/W6 redress | representative retired reader loses type recipe |
| PACKAGE | reuse `7.0.0`, a workspace link, or a mismatched tarball | installed identity/lock integrity fails |

Source regexes, class presence, method spies, and call counts cannot replace these mutations.

## 8. Terminal package, consumer, browser, and AT proof

GREEN requires one immutable `@mkbabb/glass-ui@8.0.0` candidate with commit/tree/tarball SHA, complete
public API/CSS-token migration ledger, packed CSS/JS/type inspection, and a clean isolated install.
Fresh consumer census determines the still-live named receivers; at minimum the evidence matrix
includes:

- the real demo AppShell at desktop and mobile sheet postures;
- the real center-spring Dialog and close control;
- DockLayerGroup, Carousel/PagerDots, HeaderRibbon, and Slider production stories;
- an installed InfiniteScroll receiver (including the currently known Speedtest family if it remains
  live at freeze);
- an installed DockControl receiver (including value.js/Atlas where the frozen census still finds it);
  and
- the separately owned SCI/Atlas Slider and compact-control receiver arms after exact repin.

Use current Chromium and Safari, plus Safari+VoiceOver for delivered names, roles, focus, disabled
state, and live announcements. Run 390×844 and 1440×900; fine and true coarse pointer where relevant;
light/dark; normal motion and PRM; forced colors for focus/control states. Retain:

- accessibility-tree snapshots and final `activeElement` logs;
- trusted keyboard/pointer sequences and eight-point hit ownership;
- computed foreground/background values and independent contrast calculations;
- close, skip, tab/panel, roving, dialog-reopen, and live-region transition traces;
- rest/interaction/mid/settle captures where motion affects focus or reach;
- exact browser/OS versions, commands, probe and artifact hashes, consumer lock resolution, and
  before/after clean/dirty state.

HTTP 200, JSDOM/happy-dom, a local source alias, a screenshot without state instrumentation, or an
unversioned workspace install earns no terminal credit.

## 9. Two fresh exact-byte Sol critic tails

After Luna redress and the immutable receipt, run both critics against the same exact package and
consumer locks:

### Sol critic A — semantics, keyboard, focus, and live delivery

Independently verify responsive landmark uniqueness, first-tab skip, rendered heading order,
Dock/Pager tab-panel identity, shortcut naming, Carousel conditional focus, Slider focus/hit behavior,
HeaderRibbon roving/RTL/disabled policy, DockControl trusted disabled behavior, centered-dialog close/
reopen/stale-trigger focus, and InfiniteScroll repeat/rapid/localized delivery in Chromium and
Safari+VoiceOver. It inspects final accessibility trees and `activeElement`, not source or spies.

### Sol critic B — contrast, public contract, package, and consumers

Independently recompute the normative status/placeholder/close tables from exact built CSS across
light/dark and opaque/composited surfaces; verify close/Slider/compact target geometry; audit the
`--surface-tint-35`, placeholder/status token, Pager, InfiniteScroll, Dock, and DockControl 8.0
migrations; reproduce the `35a+ddc` atomicity guard; install the exact tarball into the named consumer
fixtures; and reproduce representative AX/keyboard/paint behavior. It rejects mutable versions,
workspace links, and unpinned locks.

Any normative or product edit after either critic invalidates that critic for the close sequence.

## 10. Freeze ruling

`35a30fbb` is not an A11Y close. Its narrow mechanics are worth preserving, but the exact bytes still
contain a measured dark placeholder failure, five status failures, desktop-only landmark proof,
missing skip and heading work, invalid real Pager tabs, absent Slider and HeaderRibbon dependency
rows, underproved disabled/focus/live behavior, an unmeasured close target, a non-atomic type-ramp
parent, and no immutable installed package/browser/AT receipt.

**Keep STATE, LINKAGE, CONTRAST, LIVE-REGIONS, and ROVING acceptance RED. Candidate 2 may bank the
named source candidates only; it may not freeze on this commit or on its 27/27 subset.**
