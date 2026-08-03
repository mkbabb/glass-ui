# Dock structural critic 3 — accessibility and interaction C33

**Date:** 2026-07-22 EDT

**Phase:** formation-only, failure-assuming static and retained-frame criticism

**Disposition:** **DEFECT / PRODUCER RED / DEMO RED / RECEIVER RED / PACKAGE RED / BROWSER+AT RED**

## Verdict

Do not accept a Dock topology, interaction simplification, accessibility close, public-contract close,
or receiver repin from C30–C32. The retained Chromium evidence contains one useful positive invariant—
true-mobile `End` reaches and recenters `Settings` in the Overflow story—but it also shows first-action
frames with no stable actionable read, clipped mobile runs, an already-expanded “collapsed search”
story, a long CTA ownership void, an unobservable layer dissolve, and persistent shell Dock competition
with the component under assay.

The source inspection adds four concrete producer failures to the already-frozen event-phase defect:

1. click identity is recorded as the raw descendant and treats sibling descendants of one surviving
   button as different controls;
2. a press-collapse keepalive has no `pointerup`-without-click, lost-capture, or window-blur retirement,
   so sibling branches can remain `inert` after an abandoned press;
3. the collapsed touch gate measures only `clientY`, so a horizontal swipe can resolve as a tap even
   though the code claims both-orientation parity; and
4. Dock layer ids are deletion-normalized, duplicate registrations silently replace the descriptor,
   and the rendered `tablist` has no accessible name.

This is not authority for a second Dock engine, consumer shim, private selector, new row, package,
source edit, or posture selection. It deepens the existing GF-DOCK, G6/A11Y, STORY, safe-frame,
composited-signal, and package owners.

## Exact authority and moving-tree fence

The three assigned inputs were read in full and matched the supplied C31/C32 identities:

| input | SHA-256 |
| --- | --- |
| `DOCK-STRUCTURAL-SIMPLIFICATION-WORKFLOW-C30.md` | `44726bb749bb703cefb461bf86ba0a15c699dec771b90675992d88ed57efb2ba` |
| `DOCK-STRUCTURAL-ANATOMY-C31.md` | `03855f128b8ef9aa3fa21de154725c68b21c3b2e40b937d28d25363943acb8e1` |
| `DOCK-DUAL-BROWSER-ASSAY-B-C32.md` | `effce7e7b6f1662b06dc5dbaf5ef90c9a7e727e24374dd54271c8caea7303121` |

The governing consume/proof authorities used here are:

| authority | SHA-256 |
| --- | --- |
| `AUTHORITATIVE-GLASS-SESSION-BOUNDARY-C28.md` | `7644705312435dc292a2cb20fd780bdd38def312cbdc541f8f18636100db4a62` |
| `Q-G6-CLICK-INTEGRITY-CORRECTION-C2.md` | `0da059c4508b37df553b7c36c33071d458474816e0844d8d4cec90244155986b` |
| `A11Y-35A30-ADJUDICATION-C2.md` | `ceac1a1db1980ec47fedf716024c93bd066488698daa5e82070b0039820f2f29` |
| `GLASS-UX-APOTHEOSIS-ABSORPTION-C2.md` | `6108125069749c445012558fcd51d48f8c8ee13a23af86b848d4e2d24a042a9e` |
| `REGISTRY.md` | `90daaea70c934834a3082f6f029380bd0dc59efcec58b14e5169e7170cc2acb6` |
| `GATES.md` | `1e5146082d9cbfacc83129a2d85fd63eb037ed82ac14b53babeff2e043255a9d` |

The inspected repository cursor was commit `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`. The shared worktree was dirty. The targeted Dock product
and demo files below were clean relative to that cursor; `package.json`, `package-lock.json`,
`tests/public-surface.spec.ts`, governance files, and unrelated sources/tests were concurrently dirty.
Their moving bytes are not credited. No product, source, test, gate, package, lock, repin, or Browser
execution occurred in this critic.

Observed-but-excluded moving identities were `package.json`
`44de86637c98b7b6310cd6614fa77f59b2517b42097945295806b00f88a5b914`, `package-lock.json`
`a8b514101dedc94bb2519416b3b0c374d3d31903695fcbe0a6b4ef5ae86501fc`, and
`tests/public-surface.spec.ts` `41b3ab1f302731960c8c0cde5d19a2bbca99524c31ea19d25196cc1e4ef5a73f`.
They identify what was inspected; they do not convert dirty bytes into candidate or package evidence.

## Manually inspected source identity

The following are the exact producer, context, interaction, public, demo, and nearest-test bytes on
which the findings rest:

```text
5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a  src/components/dock/GlassDock.vue
6e99c6d17edd964674530e770cec8fd631d80fc50f99ce47cd428d3c32a0e810  src/components/dock/DockControl.vue
5f6232598bd8bcae5ea5d37731ae22ed28789d56ab1ad45839dd51646be98f34  src/components/dock/DockTrigger.vue
a66676b345418e6ae67b7cc0273c4a03877bde936fbdb19b0c93f9e4086f013f  src/components/dock/DockLayer.vue
d23b1c281e70d262198024ebe4311cb0d81aa913890a098930b754943941b998  src/components/dock/DockLayerGroup.vue
8492640cde5f970a974bdb6f8d3bd8625e1f06714827f46449791039cd56f2eb  src/components/dock/DockCrossfade.vue
a1784c945279075f14a7eefc7b7b01f3262d720501a9517ecca1fd7d614d662e  src/components/dock/composables/useDockState.ts
a7254ec249d491746f22fb884eee03ea13fd2ebeedd9bc2a34753aae5a9f3edf  src/components/dock/composables/useDockClickIntegrity.ts
ce44243fcb64dbd30ae1bd91b34a44daa172769ab434ad8e462f8ee803427323  src/components/dock/composables/useDockTouchGate.ts
fcc8cd2a4afd7709e1d1c96e9047449092e0bc8a3d965f4b00f9877978e6d975  src/composables/dom/useTouchGate.ts
ef65f2e2a272b52c44780354ba8ff884f4d5820e619ea84c7478788e4d2d79d2  src/components/dock/composables/useDockOverflowFit.ts
2906aeee7e55b186e8831782c141011a7d5a048c424b05ca14948871ff1e05aa  src/components/dock/composables/dockContext.ts
761170490bad629e0cdbcf547dd46cb3e7d1ded2183dcee232a47e3dfeac6ff0  src/components/dock/composables/isTeleportedTarget.ts
bd657faa78d950107776a0c16a01eb476a7c7bc03ad06031786b0c64c9057070  src/components/dock/composables/useDockShellProps.ts
7cde9de3de51b027f7728f984150b1e30cb583572daf23818b7b51810ba2587b  src/components/dock/index.ts
da56e491b3cb48fd43463260cd73b71f95c907dd9adff5fc0a481605e59cf3b1  src/components/index.ts
ec908e10ed4c460d650ff42748e1e35db09b5d0bb938a7f42c3750fb2bfe3e73  src/index.ts
d883746eeffdd2919b2e322716f45727dc30f4c5686a77b4820ccc7b5b506116  src/components/dock/styles/controls/icon-button.css
931100377d9d18d6506f57276aa4563ff75cb1dcb11bd136d43e50c976386c3b  src/components/dock/styles/controls/touch-floor.css
d97b17bdca1e06e10049abdf0a12afa3df51c62ffe9beff97977137e45ba31ff  src/components/dock/styles/overflow.css
6d62d2b2408548e54d562fb4a13663aea846e609adf317870ac4bb1688153280  src/components/dock/styles/shell.css
b015528f56f8fa6777635b7f948207d375f662a8728e6891e0052bd42808f6d1  src/components/dock/styles/crossfade.css
65f3b6faba4813f9fdaf9a4b5ac8718e204043a72324ff7179bb4a7af05fe897  src/components/dropdown-menu/DropdownMenuTrigger.vue
c7f00a3f700efabebdb5aa1a9886ad376eb2abbde7473a82f8fc4cee84698ba4  src/components/dropdown-menu/DropdownMenuContent.vue
dfbb07a457992bca5b4c6258992e84ee7df5b1dfa21d6803ff7dda8a32066cc0  src/components/select/SelectContent.vue
d33c307d0593a6f75f471ffca8130736dd16079d9163c9a5091b1a1dfc9e99fa  src/components/popover/Popover.vue
de91f3db67aedf1b894add68fd19d2af789a449b0a8ed8142e8949c5ba6291f7  src/components/popover/PopoverContent.vue
```

```text
66baeab8cdbcf9192631d4e0dbd1943610641cfed19c7f7bfde0cea72fa372ea  tests/components/custom/dock/DockControl.a11y.test.ts
91f0f7df25e756aa70db7705a3a65f679bbe8e0d0aec656f7c48f9b8b8f03917  tests/components/custom/dock/DockLayerRail.a11y.test.ts
9588193bfa2b0b4ee0e0feaf099015312dd6780cebceb335d3f1b9d1140ac1aa  tests/components/custom/dock/GlassDock.press-keepalive.test.ts
ee5ecfeafd7d70464da95fb5f7cbff93df70e3d4fdb3edc80d2624dd3dfb1693  tests/components/custom/dock/GlassDock.touch-gate.test.ts
9291805fbe9cd3b1275a0e8ba16a7d42b02c31d2c9eb4002974ebe4127476689  tests/components/custom/dock/GlassDock.scroll-overflow.test.ts
55db00b0fe5ef344e4bec20e1a67f999fa9b32f912026d63e5c5f9628eb74a3f  demo/shell/AppShell.vue
6cbaefc97b9dadacfa115dfc2388c858ddc0944b326f93d7a837891545df8eaf  demo/shell/BottomDock.vue
33d9462c28bc92b59681f0af8a1b148083048a86617443e82336082016ca4342  demo/shell/SidebarDock.vue
16afe565dbde81fa678c8924bb7e03ddc20fb54642bd664961f906823574c0d3  demo/shell/dock-nav.css
52c13785af6c55cd61251b27eab541619faaac2d83a2ef211a90013c4c397852  demo/stories/dock/overview.vue
877c5581e968006f0922cffa56f07bebc5f1da9bd8cc6d0652c7f5f9146532d2  demo/stories/dock/sections.vue
5f27f578dab3d2f9851997b7b2b26d0ddfeb2d0d941e4c857afa1fadc262cd7f  demo/stories/dock/overflow.vue
7051d51d9a296b7f2e440e9c657a6dd98f8d50e94f6463e4a4ec095145b2e52a  demo/stories/dock/dock-search.vue
b3ffd0b98d2cd330a7599b6a4abca920e72ac9d32fbdcaa217c05382affd7cfe  demo/stories/dock/cta-receive.vue
```

## Manually inspected retained frames

The image files were opened visually, not inferred from filenames. Paths below are relative to this
addenda directory.

| frame | SHA-256 | critical visible read |
| --- | --- | --- |
| `evidence/browser-assay-a/dock-overview-mobile-rest.png` | `aa4d4f15119924e7729cc015cf10e18289386dfc82261b78b57c2b0540bf4f75` | compact icon-only specimen and shell Dock compete in one viewport |
| `evidence/browser-assay-a/dock-mobile-first-press-onset.png` | `c45aeb702e608b430027ec6253f1ba4e72970f74d3097f23cc6baa124d56d53d` | first-action frame is enlarged/soft and does not preserve an actionable read |
| `evidence/browser-assay-a/dock-mobile-first-press-settle.png` | `81b88341aac61ac50b1f71afaf5503e28abc0e74232634c99379b82ade628cab` | target specimen expands; “starts open” is not a stable comparison control |
| `evidence/browser-assay-a/dock-sections-mobile.png` | `c0ace03d19d3281bc727c85b556efca2f909199074938bb2cf975cf743f7b366` | trailing controls are visibly clipped |
| `evidence/browser-assay-a/dock-overflow-mobile.png` | `4a83035bbfc7d43a5f386a972caaa4f53a2f92541047e43a467acfa122939056` | only an initial icon subset is visible; reach depends on the hidden scroll port |
| `evidence/browser-assay-a/dock-search-mobile.png` | `313ccaac3363de6f8abbf7ea091fc0f146e8fb2c82bc6996fa2e20389261d6d3` | the advertised collapsed search is already a field |
| `evidence/browser-assay-a/dock-cta-morph-mid-mobile.png` | `4fedeae17ced921a2a883082b88f2403bc5993d14bf000e60a86f9eb2d0c0166` | neither source nor target action has clear ownership |
| `evidence/browser-assay-a/mobile-compositions-story-chassis-rest.png` | `20700cc047885fdb50e9c14b66bfda080d1c728ca7add15c31345fbd37da4594` | shell Dock occupies the content edge under assay |
| `evidence/browser-assay-b/mobile-dock-overview-rest.png` | `d552894f862a5ba708545a0fceec455ecaa22c5c3a6379facbc65aac7a2f28bc` | true-mobile overview baseline |
| `evidence/browser-assay-b/mobile-dock-overview-first-0000ms.png` | `443cbe83d43fc8a8e6af0981c9d1eafc7cd262a8735b09f8d2b21d15f7f0828e` | first observed action state lacks the Dock control being judged |
| `evidence/browser-assay-b/mobile-dock-overview-first-0250ms.png` | `19b58b54d8e89f6947696ad056d47ec47d5dcb687e0083397deb08bee5a25d3c` | expanded run appears after the discrete settle rebase |
| `evidence/browser-assay-b/mobile-dock-sections-rest.png` | `1eb3e51e673d13e75dcdb40511d41f8f620684c4956d36286e59ea9f6fa1c9b7` | severe internal clipping, despite no document-width overflow |
| `evidence/browser-assay-b/mobile-dock-overflow-rest.png` | `de06d7619f8dff33b53199373b9a65274d893557c7d2a0a543ab7f4dc3c1c507` | native overflow starts at Home |
| `evidence/browser-assay-b/mobile-dock-overflow-end-key.png` | `6db74323514e16a20834a28c807e741be1b8469796d88274c30397e109dc0a69` | positive invariant: `End` reaches visible/focused Settings |
| `evidence/browser-assay-b/mobile-dock-search-rest.png` | `9830dc624e188083637089f8913dbc10f04b3eafd88da3e20fe758ba04fa41c8` | rest state contradicts collapsed-pill copy |
| `evidence/browser-assay-b/mobile-dock-search-mid-reach.png` | `779a1fcf2e4d58358faf5be54fec38efb9a82be154550eaae6e2c7a7b858fea5` | reached field/content remains clipped at the viewport edge |
| `evidence/browser-assay-b/mobile-dock-cta-rest.png` | `ecb72423ccaa30df8a03e47517737b29ca56c8ad39dc2226c8471e0a8b214cb2` | source action exists before receive |
| `evidence/browser-assay-b/mobile-dock-cta-run-0300ms.png` | `effe1459c3ba31d865f20509967777773ca4c967826e123ec72d2ebc6ba88e98` | no clear active action after travel |
| `evidence/browser-assay-b/mobile-dock-cta-run-0900ms.png` | `0a98cda00327d1484a6fbea5c510d2df310b464cdd8b8572c40f456fc1b4bbb6` | ownership void persists |
| `evidence/browser-assay-b/mobile-dock-cta-run-1900ms.png` | `2e27442bbed6bb134c76b9184c22c45baa52e7b87b7eb0a70f4c81277cd41df1` | target finally becomes legible near completion |
| `evidence/browser-assay-b/mobile-dock-cta-run-2300ms.png` | `af05ea69517174ffbedde99c3e7230c377cb02cc21111ff18cfbccbb12d3da38` | terminal capture posture is not a trustworthy action receipt by itself |
| `evidence/browser-assay-b/desktop-dock-overview-collapsed-focus-retained.png` | `3eb17e39222221300ea5ded149386031a627ca0095d572c347dec0842d6655cb` | screenshot alone does not prove activeElement, AX exposure, or visible focus |
| `evidence/browser-assay-b/desktop-dock-layers-switch-0000ms.png` | `37f54014edaaf33d1282283fc6cf8f230637c663183c08d242d3ad02114ac6d6` | first switch frame |
| `evidence/browser-assay-b/desktop-dock-layers-switch-0220ms.png` | `16ffeb8981579670b2c5f36fc38ee5188da5779be6f288ad031e98262a0f2f31` | visually indistinguishable settle; no observable dissolve receipt |

## Failure findings

### C33-A1 — first action is not transactional at the event phase

`GlassDock.vue:202-220,262-293` places the integrity handlers on root capture. That is early enough to
record a press, but not early enough to undo a descendant's pointerdown action. `DockTrigger.vue:67-75`
forces the dropdown arm to `action="pointerdown"`; `DropdownMenuTrigger.vue:40-53,65-76` calls
`root.onOpenToggle()` during its own capture handler. The later root `click` decision can suppress a
click but cannot make the already-opened menu never have opened. This is the exact frozen G6 E24
failure and remains producer RED.

The current identity algorithm adds an independent same-control false negative. It records raw
`event.target` at `useDockClickIntegrity.ts:172-180`, then accepts only equality or ancestor/descendant
containment at `194-207`. Two sibling descendants of one surviving interactive ancestor—for example,
an SVG path pressed before a glyph/label retarget—are neither equal nor ancestors. If the pressed
descendant is replaced, it is no longer contained by the surviving button either. The implementation
comment says closest interactive ancestry is the control, but the code never compares those ancestors.
A legitimate one-button action can therefore be swallowed in the deadline tail.

The nearest touch test manufactures a compatibility `MouseEvent("click")` and has no genuine browser
`pointerdown→pointerup→click` phase/retarget chronology. C32's first-action screenshots likewise lack
event geometry and intended-versus-realized identity. They cannot close either failure.

### C33-A2 — press keepalive and focus/inert ownership are incomplete

When a full-pane press collapses the Dock, `useDockClickIntegrity.ts:106-128,183-185` removes `inert`
from the leaving pane and applies `inert` to every sibling branch along the press path. Retirement exists
for the next pointerdown, a captured click, pointercancel, or unmount. There is no captured pointerup,
lost-pointer-capture, page/window blur, or no-click timeout retirement. A press that collapses, drags or
releases away, and produces neither click nor pointercancel can leave the full pane in
`is-press-keepalive` and its sibling branches inert until another press or unmount. The nearest test
covers ordinary press, click, and explicit pointercancel only.

The outer full/summary swap (`GlassDock.vue:356-385`) can inert the current full pane without a producer
focus handoff. Timer collapse normally follows focusout, but public `collapse()`, a receiver-controlled
manual collapse, and document-capture click-away can write collapsed while focus is still inside the full
pane at that instant. A screenshot captioned “focus retained” does not establish final activeElement or
AX state. The outer swap needs a generation-safe activeElement contract, not an assumption that the next
browser default action repairs it.

`DockCrossfade.vue:146-162` does have an un-inert-before-focus path, but it deliberately focuses the
entering face host. No Dock face focus selector establishes a visible landing indication, and C32
observed host focus without an observable dissolve. Whether a named `tabpanel` host is the intended
landing pad must be proven with visible focus, AX name/role, Safari+VoiceOver reading order, PRM, rapid
third-switch, and disconnected-face fallback. The happy-dom test asserting that exact host is a useful
mechanism test, not AT acceptance.

### C33-A3 — Dock layer linkage is invalid for permitted public ids

`DockLayerGroup.vue:114-128` deletes every non-ASCII/non-`[A-Za-z0-9_-]` character. Public ids `"a b"`
and `"ab"` collide; arbitrary Unicode/punctuation can collapse to the same or empty suffix. The rail at
`229-255` has `role="tablist"` and orientation but no accessible name. At the registry layer,
`DockCrossfade.vue:48-70` silently `Map.set()`s duplicate ids: one descriptor wins while both mounted
`DockLayer` DOM hosts can still compute active and emit duplicate panel ids/linkage. There is no rejected
input or development diagnostic.

These are already binding A11Y W2-A failures. Required coverage includes Unicode/punctuation,
normalization collisions, duplicate ids, rerender/reorder, hidden rail, single face, and multiple groups,
plus the public trimmed `railAriaLabel` with truthful default `"Dock layers"`.

### C33-A4 — compact/coarse ownership and disabled activation remain RED

`icon-button.css:218-223` makes compact controls auto-sized with `min-width:0` and 0.25rem padding.
`touch-floor.css:15-28` explicitly excludes compact standalone controls from its 44px floor. This is the
source counterpart of the pinned G6 detector: the 32.171875px compact Atlas control's center activates,
but all eight edge/corner points in its centered 44px envelope hit inert neighbors, and the collapsed
phone posture is 0×0/pointer-none. C32's separate default Home measurement near 46.8px does not redeem
the compact cohort.

The trigger `::after` rule at `touch-floor.css:30-53` is only authored geometry. It has no retained
trusted eight-point hit ownership, neighbor isolation, overlap, transformed/zoomed, RTL, or Safari
receipt. Pseudo geometry and a center click are not target-size acceptance.

`DockControl.vue:99-150,159-177` banks the intended tri-state and focusable `aria-disabled` direction,
but its only activation barrier is a click-capture handler. The nearest test calls VTU `.trigger("click")`
on the default button. It does not prove trusted pointer, Enter, Space, `asChild`, RouterLink/anchor
default navigation, enabled-exactly-once, or that an unrelated sibling's first action survives. Preserve
the banked semantics; keep W1-B/W5-C acceptance RED.

### C33-A5 — touch and portal ownership are only partial

`useDockTouchGate.ts:59-82` passes only `touch.clientY` into `useTouchGate`; the lower gate at
`useTouchGate.ts:123-160` cancels only when vertical delta exceeds 10px. A horizontal or mostly-inline
swipe can therefore resolve as a tap and expand/activate a horizontal Dock. This contradicts the source
claim that the same behavior applies to both orientations. Once activated, the gate sets the entire
Dock root's inline `touchAction="none"` until deactivation (`useTouchGate.ts:97-120`), potentially
blocking immediate native panning of a newly exposed overflow port for the full collapse delay. The
happy-dom helper tests only vertical movement and synthesized compatibility click behavior.

The typed Dock context and exact owner marker are sound directions:
`dockContext.ts` carries id/orientation/layout/keep/release/held, and Select/Dropdown/Popover content
stamps `data-glass-dock-portal` plus the exact owner. `isTeleportedTarget.ts` correctly rejects the wrong
owner when an id is supplied. However, only `Popover.vue:67-86` has a built-in `keepDockOpen` lifecycle;
Select and Dropdown content only stamp ownership. The actual receiver still owes open-gap hold, focus
entry/return, Escape/outside dismissal, wrong-owner/stale-portal, multiple-Dock, and collapse-timer
proof. Under C28/Q, Atlas must consume the public context/overlay seams; it may not add a retry, fixed
delay, private selector, event forwarder, or copied guard.

### C33-A6 — overflow has one bankable keyboard arm, not general reach

C32's true-mobile `End` result is real narrow credit: Home→End focuses/selects Settings, scrolls the
full-layer port to `321.5` (`clientWidth=290`, `scrollWidth=612`), and exposes Settings at x=287.30.
Any simplification must preserve it.

Everything broader remains RED. `useDockOverflowFit.ts` only toggles an attribute from geometry;
`GlassDock.scroll-overflow.test.ts` asserts class strings and no scroll geometry. The source scroll port
hides its scrollbar and relies on native inline panning plus a scroll-driven mask. Sections visibly
clips a 563px run in a 224px client port, and zero document overflow says nothing about reach. There is
no trusted fine-pointer path to every intermediate control, true-coarse drag path, first/last focus-ring
receipt, RTL/vertical/reorder/resize evidence, collapsed hidden-zone reach, wheel/overscroll isolation,
Safari scroll-timeline fallback, or PRM proof. The Overflow story's prose that “clicking a control past
the fold” recenters it does not explain how a pointer first reaches an invisible control.

### C33-A7 — safe frame and mobile navigation semantics are not truthful yet

`AppShell.vue:222-271` is a useful adjacent-flow source topology: viewport flex frame, `min-h-0` main
scroll port, and BottomDock sibling. The retained frames nevertheless show the shell Dock occupying the
content edge and competing with headings, prose, cards, search, and CTA targets. Source intent is not
intersection proof. The existing `R-DOCK-SAFE-FRAME` owner forbids export/implementation until Atlas
migrates every window/document reader to one injected ScrollRoot and an actual-tree family co-lands; it
also forbids selecting a bottom posture from this demo.

`BottomDock.vue` provides an independent named `nav` and AT labels for its icon buttons, which is useful
static direction. On mobile, however, the visible story tab strip can shrink to a sliver while the
persistent icons remain; tooltips are not a truthful coarse-pointer label strategy, and the frames expose
neither the current story nor the destination semantics of adjacent single/double chevrons. More
concretely, the category sheet at `BottomDock.vue:132-146` mounts `SidebarDock` inside a named dialog but
does not wrap its category-control region in `nav[aria-label="Category navigation"]`. That is the exact
A11Y W1-A defect: desktop has the named category navigation landmark; the open mobile sheet does not.

### C33-A8 — the demo contracts contradict the behavior they purport to prove

- `dock-search.vue:1-14,160-195` promises a tap on a collapsed pill, but the actual `GlassDock` is
  `always-expanded`; its collapsed slot is inert and never becomes the advertised entry point. C32 A/B
  both show the field already expanded.
- The Overview “starts open” specimen is explicitly only an initial posture and remains collapsible.
  It is not proof of shared state, but it also cannot be a stable simultaneous reference after the first
  action; the assay needs an independently pinned comparison fixture if it wants an A/B visual oracle.
- C32 shows the layer switch at first observation and +220ms as visually indistinguishable while the
  crossfade busy flag persists and focus moves. The story does not demonstrate an observable dissolve.
- The CTA source reaches destination geometry and fades almost immediately, while the target remains a
  0.35-opacity ghost for roughly 1.95s. Keyboard activation can leave focus on the moving/invisible CTA;
  `onReceived` then replaces it with Replay without an authored focus transfer to the target or status.
  The `aria-live="polite"` paragraph also contains reactive motion measurements including scale ratio;
  without a coalesced state policy it risks announcing transient telemetry instead of one useful result.
  Normal and PRM runs both need final activeElement and delivered-VO receipts.

Static story prose, screenshot sequences, and displayed telemetry cannot close a contract the mounted
story does not actually exercise.

### C33-A9 — the public/package edge is statically reachable but not admissible

The canonical public route is intentionally `@mkbabb/glass-ui/dock`: `src/components/dock/index.ts`
exports the component family, typed context helpers, Dock state types, CTA receive, and Dock search;
`package.json:356-359` maps `./dock` to `dist/dock.{js,d.ts}`. Root-barrel exclusion is documented as a
heavy-composite decision, not a missing export. Both style entries remain declared at
`package.json:492-495`.

That static shape earns no package credit. The worktree manifest/lock and public-surface test were dirty,
the source version remained reused `7.0.0`, and no dist/pack/install/served inspection was authorized.
Moreover, the already-seated `R-COMPOSITED-SIGNAL` public defect is still present:
`DockProps.backgroundCanvas` advertises a selector string and distinct omitted/null/getter forms, while
`GlassDock.vue:92-109` wraps all inputs and passes through only a function or `HTMLCanvasElement`,
stripping selector intent and manufacturing configured-null behavior.

GREEN still requires one uniquely identified immutable 8.0 artifact, complete public/CSS ledger,
packed JS/CSS/declarations/subpaths and both style entries, isolated install, source→pack→install→served
equality, exact receiver locks, and browser/AT proof. A local alias, current source, moving manifest,
same-version rebuild, HTTP 200, or runtime barrel unit is not a substitute.

## Born-RED mutation obligations

Each mutation must run independently against the final candidate and fail for its named reason:

| ID | mutation | required RED bite |
| --- | --- | --- |
| `C33-M01` | begin pointerdown during live morph on the real dropdown DockTrigger | controlled menu remains `open=false`, or an equivalent transaction prevents unsafe exposure before click |
| `C33-M02` | pointerdown on one descendant and click on a sibling/replaced descendant of the same surviving button | same-control action passes in the deadline tail |
| `C33-M03` | change the click target to a different interactive ancestor at the same coordinates | cross-target action remains suppressed |
| `C33-M04` | remove the pointer witness or substitute programmatic `.click()` | keyboard/AT/no-witness action passes and cannot falsely satisfy pointer proof |
| `C33-M05` | collapse on pointerdown, release away with no click/cancel, then Tab/click a sibling | keepalive retires; no branch remains inert and no origin marker leaks |
| `C33-M06` | collapse while activeElement is in full content; repeat under PRM, reverse, removal, and stale generation | final focus is connected, visible, non-inert, correctly named, and not stolen by stale work |
| `C33-M07` | switch focused Dock faces, including rapid A→B→C and PRM | one active panel remains; visible focus/AX reading lands by the declared policy |
| `C33-M08` | feed `"a b"`, `"ab"`, Unicode/punctuation, duplicates, reorder, and two groups | unique tab/panel ids and exact one-to-one linkage hold; duplicates reject diagnostically |
| `C33-M09` | remove/blank the Dock layer rail accessible name | rendered named-tablist assertion fails; trimmed default remains `"Dock layers"` |
| `C33-M10` | probe compact control at four corners/four edge midpoints of centered 44px envelope | every point activates the intended control once; neighbors never activate |
| `C33-M11` | trusted pointer/Enter/Space on disabled default/asChild/link DockControl | disabled action/default navigation never fires; enabled control fires once; sibling is unaffected |
| `C33-M12` | make a collapsed horizontal touch gesture with large X and small Y delta | gesture cancels tap/expand/activation and preserves intended scrolling |
| `C33-M13` | open overflow immediately after collapsed touch activation | native panning remains available; root touch-action cannot strand the new scroll port |
| `C33-M14` | use two docks plus correct-, wrong-, and stale-owner portals; close by Escape/outside | only the owning dock holds/collapses and focus returns to the correct live generation |
| `C33-M15` | remove native overflow/recenter, hide an intermediate item, flip RTL/vertical, or shave an edge ring | trusted keyboard/coarse/fine reach and complete focus paint fail for the named arm |
| `C33-M16` | remove the selected adjacent safe track or `min-block-size:0`, or repoint one reader to `window` | content/dock intersection or ScrollRoot consistency gate fails across every routed posture |
| `C33-M17` | restore Search `always-expanded` while retaining collapsed-pill copy | mounted story-contract gate fails because the claimed first action is unreachable |
| `C33-M18` | keyboard-activate CTA and hold at source-fade, ghost, handoff, and PRM terminal | activeElement never becomes invisible/inert/removed; one useful status is delivered, not frame telemetry |
| `C33-M19` | remove the mobile category-nav wrapper or expose desktop and mobile landmarks together | AX tree reports zero or duplicate named category navigation landmarks |
| `C33-M20` | reuse `7.0.0`, a workspace link, stale served chunk, mismatched lock, or substituted tarball | immutable identity gate fails before receiver/browser credit |

These are additions to, not replacements for, the existing settle-rebase, root-sharpness, one-scalar,
reversal, different-target, hidden-zone, composited-signal, and package substitutions already frozen in
C30–C32 and the governing addenda.

## Existing-owner routing; no new rows

| finding | existing owner | required disposition |
| --- | --- | --- |
| event phase, raw-target identity, genuine phase matrix | `R-COMPACT-HIT-FLOOR` / G6; Glass producer, then Atlas receiver | Glass supplies event-phase-safe public behavior; Atlas proves the real trigger without retry/delay/shim |
| press keepalive and outer focus/inert | GF-DOCK W6/W8 plus G6/A11Y focus contract | producer lifecycle and generation-safe activeElement proof before receiver credit |
| Dock ids, duplicate registry, named rail | `R-A11Y-35A-CLOSE`, LINKAGE W2-A | implement the already-adjudicated collision-free/name/reject contract |
| compact 44px and disabled DockControl | free-standing W2-F sibling plus A11Y W1-B/W5-C | keep hit and trusted-disabled arms distinct; preserve banked tri-state semantics |
| touch direction and portal lifecycle | G6/A11Y producer behavior; Q/Atlas lifecycle/focus receiver arm | true-touch producer proof, then public-seam consume proof in the real receiver |
| overflow reach | GF-DOCK W3/W6 and G6 hidden-zone/reach arm | preserve C32 End-key invariant and add full input/orientation matrix |
| shell intersection and ScrollRoot | `R-DOCK-SAFE-FRAME` under GF-DOCK W9 | no posture selection/export before Atlas ScrollRoot migration and co-landed actual-tree proof |
| mobile landmark and icon-only shell semantics | A11Y STATE W1-A plus STORY W6 | one exposed named category nav per posture and truthful visible/coarse navigation |
| Search/Overview/Layers/CTA story truth | STORY W6 plus relevant GF-DOCK W6/W8/G6 owners | stories must mount the claimed contract and retain focus/status/action ownership evidence |
| public source intent | `R-COMPOSITED-SIGNAL` under MATERIAL W2 | preserve omitted/null/getter/selector intent and expose the already-adjudicated truthful provider/ordered seam |
| package/consumer/browser chain | GF-DOCK W9, A11Y terminal package gate, public 8.0 ledger | unique pack-once identity, exact repins, current browser/AT matrix, two unchanged-byte Sol tails |

## Consumer-specific asks after the Glass cut

These are consume-edge and proof asks only. They do not transfer producer ownership or authorize edits
from this lane.

- **Atlas:** pin the unique Glass artifact; prove the actual `DockTrigger(for="dropdown")` export action
  remains closed on unsafe morph-time pointerdown; preserve true-rest and no-witness activation; consume
  public hold/context seams for portal focus return; prove category/filter phone modal exclusivity;
  exercise compact 44px plus collapsed hidden-zone reach; migrate all viewport readers to one ScrollRoot
  before co-landing any safe-frame family; retain its owner-selected posture.
- **SCI:** consume the same exactly pinned Dock package only after the Glass→Atlas edge is proven, then
  replay its real routes with no copied effect, private selector, local event guard, or source
  substitution. The chain is Glass first, Atlas second, SCI third—not parallel source claims.
- **value.js:** a fresh frozen census decides whether a DockControl receiver still exists. If it does,
  prove trusted disabled and compact-control behavior against the exact installed artifact. If it does
  not, retain only the documented negative census; do not invent a receiver. Its separately named Blob
  obligation is not Dock credit.
- **keyframes.js:** declare and lock the exact Glass devDependency used throughout demo/tooling, prove a
  clean install, and replay the live `AnimationMenuBar` collapsed-control one-tap contract after the
  immutable Glass publish. It remains an unarmed refraction negative without a live `.glass-lens`; the
  manifest/lock correction is external-only and creates no Glass source wave.
- **Glass demo AppShell:** add the already-adjudicated mobile category-navigation landmark, make the
  current story/destination usable without hover tooltip rescue, mount stories that actually exercise
  their copy, and prove the adjacent shell region does not intersect visible or focusable content.

All receivers consume outright through public props, slots, tokens, context helpers, and documented
composition. No receiver reskin of Dock internals, copied primitive/effect, private selector, size/event
shim, retry, synthetic forwarding, or fixed delay is admissible.

## Missing terminal proof

Formation can become GREEN only after one unchanged candidate supplies all of the following:

1. **First-action trace:** trusted `pointerdown→pointerup→click` logs with event phase, composed path,
   closest interactive identity, intended/realized target, geometry at every event, live morph and
   deadline state, and controlled overlay state at each phase.
2. **Focus/inert/portal trace:** final `document.activeElement`, connectivity, `inert`, `aria-hidden`, AX
   name/role, visible focus paint, correct-owner portal markers, focus entry/return, Escape/outside,
   abandoned press, reversal, removal, and stale-generation results.
3. **Input/reach matrix:** fine pointer, true coarse touch, keyboard, AT; compact eight-point and neighbor
   isolation; overflow first/intermediate/last; horizontal/vertical and LTR/RTL; collapsed hidden zone;
   100/200% zoom; safe areas and arbitrary continuous scroll positions.
4. **Environment matrix:** current Chromium and Firefox plus actual Safari and Safari+VoiceOver; exact
   OS/browser builds; 390×844 and 1440×900; light/dark; normal motion and PRM independently; forced
   colors and reduced transparency where relevant. C32's in-app Chromium frames do not supply these.
5. **Story/action truth:** mounted collapsed Search first action; independent Overview reference posture;
   observable or removed layer dissolve; CTA source/target/focus/status ownership throughout normal and
   PRM; mobile navigation current/destination semantics; no shell/content hit intersection.
6. **Immutable package truth:** unique non-reused Glass 8 commit/tree/tarball hashes, complete 8.0
   runtime/type/CSS ledger, packed `/dock` declarations and JS plus both style entries, isolated clean
   install, source→pack→install→served equality, exact consumer lock receipts, and outbound keyframes
   dependency receipt.
7. **Consumer order:** Glass producer proof, actual Atlas Dock and ScrollRoot/safe-frame edge, then SCI;
   conditional value.js DockControl and keyframes AnimationMenuBar only when the frozen census confirms
   them. Finish with two independent unchanged-byte Sol critics.

Until that matrix exists, detector GREEN and the one End-key invariant are useful engineering evidence,
not Dock accessibility, package, receiver, or freeze acceptance.
