# AUGMENTATION PACKET → BI/STRUCTURE-ADDENDA.md — SCI-P4-GLASS-ADDENDUM-002-CANDIDATE

*Augments `glass-ui/docs/tranches/BI/STRUCTURE-ADDENDA.md` (Pass-2 FOLDED, wave-terminal,
pinned eafc0a69). Delivered as ONE dated file to the BH coordination inbox, uncommitted by
convention; framed for the STRUCTURE-ADDENDA ingestion register (the SCI-P4-…-ADDENDUM-001-ACK
series hashes byte-bound packets — this names itself the -002 candidate and states its file list
plainly so the custodian hashes it their way). Consumer DATA first, asks second, zero urgency; no
reply owed before the BI/P boundary.*

**File list (hash this):** `atlas-inbox-2026-07-16-p-addenda-augment.md` (this file, standalone).

Snapshot under measure: sci-report `da1e3763+dirty` · atlas `1e2b911` · glass DIRTY tree.
Every count in §A is this packet's own grep over the frozen audit snapshot, not a relayed figure.

## §A · CONSUMER-CENSUS AUGMENTATION (the load-bearing gift)

STRUCTURE-ADDENDA's SHARED-KEEP/delete decisions and the MS1 recompute rest on consumer counts;
its census carried sci-report as a live consumer (USER-FLAG #1). This table refreshes that input
at a newer SHA so the recompute never rests on stale foreign counts. Method: `grep -rhoE
"from ['\"]@mkbabb/glass-ui/<subpath>"` over `atlas/src` and `sci-report/dashboards`
(`*.vue|*.ts|*.tsx`); cells are import-statement counts per subpath.

| glass subpath | atlas | sci-report | total |
|---|---:|---:|---:|
| toggle-group | 4 | 7 | 11 |
| button | 6 | 4 | 10 |
| dock | 6 | 0 | 6 |
| card | 4 | 1 | 5 |
| surface | 3 | 2 | 5 |
| aurora | 4 | 0 | 4 |
| completion-seal | 2 | 2 | 4 |
| drawer | 3 | 1 | 4 |
| slider | 1 | 3 | 4 |
| badge | 1 | 2 | 3 |
| controls | 2 | 1 | 3 |
| handmark | 3 | 0 | 3 |
| select | 3 | 0 | 3 |
| switch | 3 | 0 | 3 |
| collapsible | 2 | 0 | 2 |
| constellation | 2 | 0 | 2 |
| deck | 2 | 0 | 2 |
| dropdown-menu | 2 | 0 | 2 |
| fading-scroll | 2 | 0 | 2 |
| labeled-field | 2 | 0 | 2 |
| metric-badge | 0 | 2 | 2 |
| popover | 2 | 0 | 2 |
| status-dot | 2 | 0 | 2 |
| data-table | 1 | 0 | 1 |
| expandable-container | 1 | 0 | 1 |
| paper-backdrop | 1 | 0 | 1 |
| scroll-progress-rim | 1 | 0 | 1 |
| typewriter | 1 | 0 | 1 |
| *dark* (theme util, not a component) | 2 | 0 | 2 |

**Totals:** 28 distinct component subpaths consumed by the pair (atlas 28, sci-report 10);
68 atlas import statements + 25 sci-report = 93. Against the exports map's component subpaths
(BI's own count = 51 of 69 total export subpaths) that is ~55% of the dedicated component surface.

**ZERO consumption from this consumer pair** (verified empty in both trees — canonical primitives
dead on arrival): `tabs` (SegmentedTabs) · `chip` · `tooltip` · `icon-tooltip` · `progress` ·
`dialog` · `number-field` · `timeline` · `pager-dots` · `command` · `search`. The `tabs` zero is
the headline: hand-rolled one-of-N toggle clusters exist across both trees
(sci `GalleryView.vue`, vft story Points) while the standardized primitive sees no import — an
atlas/sci CONSUME gap (our PA-4 arm), NOT a glass defect.

**Consumer-side paint note (so BI demo/acceptance work doesn't chase it as a glass bug):** the R2
proportionality lane measured 53–58% of glass-CLASSED atlas seats rendering `backdrop-filter:none`
(`/usf` 15/26, `/ecf` 12/22, `/demand` 9/17, `/speedtest` 4/6) — class applied, material withheld.
This is CONSUMER misuse; our PA-4 arm cures it. Listed here only so it is not read as a glass
export regression.

## §B · Standing asks: satisfied/overtaken — verify at the next immutable publish, no action

GCF-01 (dock mount posture) + GCF-02 (one interruptible Drawer spring) read FIXED in the DIRTY
tree; `data-table` virtual shell + `getRowIndex` landed in 6.0.0; the pencil-boil peer is overtaken
by 6.0.0. Atlas re-verifies all four against the next immutable publish bytes. No BI action owed.

## §C · Seams, adjudicated against the DIRTY tree

**§C.1 — controlled dock posture — KEPT, NARROWED.** `useDockState` exposes `alwaysExpanded`
(`useDockState.ts` §UseDockStateOptions, "Disable collapse behavior and keep the dock expanded")
which, when true, force-pins `state = "pinned"` and short-circuits EVERY hover/focus/idle path
(`onMouseEnter`/`onMouseLeave`/`onFocusIn`/`onFocusOut`/`scheduleCollapse`/`onPointerDownOutside`
each early-return under `getAlwaysExpanded()`); `expand()`/`collapse()` become no-ops. So the
"suppress internal hover-expand + idle-collapse" half ALREADY EXISTS at the expanded pole — atlas's
zero-glass-ask cure for OF-5's "dock still randomly expands on scroll" is to consume
`alwaysExpanded`, today. What does NOT exist, and is the residual ask: a consumer-controlled
COLLAPSED pole. A reactive `alwaysExpanded` flipped false re-arms the FSM (any hover re-expands),
so a consumer cannot own collapse timing while the machinery stays quiet — the exact
two-FSM-writing-one-posture collision the ask names. Residual seam: a controlled posture (e.g.
`v-model` on `state`, or an `interactive=false` mode) that suppresses the FSM in BOTH poles.
Consumer-agnostic; P2.
π: `/sci` dock, scroll the page — DELTA: with the residual seam consumed, dock `state` never
transitions except by the consumer's own call (0 unbidden collapsed→hover transitions across a
full scroll).

**§C.2 — dock horizontal placement — KEPT (P3, whenever convenient).** A `position` prop already
selects `fixed`/`sticky` (`GlassDock.vue:318`), but the `fixed` pole hardwires bottom-center
(`fixed bottom-(--dock-pos) inset-x-0 mx-auto w-max`); there is no left/right-rail placement axis,
so atlas overrides with a consumer class to seat the desktop vertical rail. A placement prop (or a
documented CSS seam) would retire that override. On phone the native bottom-center is what atlas
now wants (OF-17c) — the desktop rail is the only seat needing the seam.
π: desktop `/sci` — DELTA: the atlas rail-override class count drops to 0 once the placement prop lands.

## §D · NOT glass (recorded so they never arrive as asks)

0×0 phone progress rim (atlas never sets `--scroll-progress-rim-radius`) · the nominal-glass
`backdrop:none` census (atlas class misuse, §A) · WG-E attenuation (atlas debt; `--glass-tint-strength`
+ `useGlassBackdropLuminance` already ship) · GCF-03 grip (zero consumer trigger).

## §E · Owner ruling relayed (awareness, not an ask)

OF-13 (2026-07-16, terminal): **"gate scripts are contrivances"** — the gate-script class is
abrogated wholesale, program-wide; acceptance for future work = live visual verification (π/DELTA)
+ ordinary tests, no proof lane, no born-RED ceremony. Relevant to BI only if gate-file ceremony
was planned. STRUCTURE-ADDENDA's MS-recompute posture (outputs, never spec constants) already
conforms — the recompute reads measured counts, not frozen gate literals, so nothing here changes
under the ruling.
