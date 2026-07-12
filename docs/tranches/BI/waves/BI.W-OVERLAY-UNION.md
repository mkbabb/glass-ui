# BI.W-OVERLAY-UNION — the sealed `Popover` with the trigger axis (the D-FACTOR flagship)

Band B8 (Kronecker factorization). Design: D-FACTOR FACTOR-A one-overlay-root (PASS-1 adjudications;
PASS-4B factor proto — the root-switch + keepDockOpen dual-root watcher + role=card fix CLOSED on both
engines). Spine wave — W-MENU-TRIGGER, W-DIALOG-PLACEMENT, W-CHIP-FOLD all follow its fold-delete pattern.

## §Mandate

Discharges: UF-P7 (the Kronecker directive — "should hover-popover not just become hover? … applied in a
multidimensional kronecker product approach for ALL of our components"), UF-J6 ("Why have hover popover,
hover, and popover — is this necessary?"). Registry: FAM-10 hover-popover re-adjudication; CHRONIC §6.6
(the hover-popover Kronecker fold ruling — FOLD, not retire, with a consumer migration ask).

## §Design

Decided (PASS-1 overlay cluster + PASS-4B proto, dual-engine measured; ruling 7):

- ONE sealed **`Popover`** (survivor noun) with `trigger: click | hover | context` × `role: dialog | card`
  × `surface`. The trigger axis switches the reka ROOT internally (click/context/coarse-hover → PopoverRoot;
  fine-hover → HoverCardRoot) — the root-switch wrapper pattern already ships (HoverPopover's own
  two-branch). Proto: HOVER opens=1/releases=1, CLICK opens=1/releases=1, both engines.
- **`keepDockOpen` is ONE `watch(open)` serving BOTH roots** (proto: internal watch fired, holds on
  hover-open + click-open, releases on close). Fixes a real keepDockOpen-on-hover fragility the shipped
  HoverPopover shares.
- **`role="card"` → `role="group"` BY DECISION (ruling 7)** + `aria-label` passthrough via the `as-child`
  override (proto: as-child role=group engine-invariant; a passed `:role` LOSES because reka
  `mergeProps(attrs, child.props)` merges child over attrs — the `as-child` explicit `:role` is the only
  seam). Documented fallback: `role="dialog" aria-modal="false"`. `role=dialog` under `trigger=hover` is
  REFUSED (dev-warn → fall to card — the WCAG trap made structural).
- **Coarse pointer**: hover triggers auto-promote to tap-toggle via the PopoverRoot branch (reka's
  `excludeTouch` leaves its hover root structurally dead on touch — the union fixes what reka doesn't ship).
- HoverCard + HoverPopover DELETE as names; `hoverOpenDelay` → `openDelay` (clean break). **IconTooltip
  demotes to a Tooltip PRESET** (Tooltip survives the union — a genuinely distinct mechanism:
  aria-describedby naming, role=tooltip, SR mirror, non-focusable content).

## §Work

- `src/components/ui/popover/Popover.vue` — evolve to the sealed union: `trigger`/`role`/`surface`/`persist`
  props; the two-branch template (PopoverRoot ⟷ HoverCardRoot) on the trigger axis; the ONE `watch(open)`
  keepDockOpen serving both branches; the `as-child` `role="group"` override on the card path.
- DELETE `src/components/custom/hover-popover/` (HoverPopover.vue + README + index) + the `./hover-popover`
  subpath (`package.json:550`). DELETE `src/components/ui/hover-card/` (HoverCard*/index) + `./hover-card`
  (`package.json:406`) as NAMES (the reka HoverCardRoot substrate stays, imported by the union).
- `src/components/custom/icon-tooltip/` — re-express as a Tooltip preset (Tooltip root unchanged).
- Public `v-model:open` contract: `defineModel` with NO default (reka `HoverCardRoot` evaluates
  `passive: props.open === void 0` at setup); WIRE + e2e-prove the outer `@update:open` re-emit (the
  reka-binding-silent-no-op class — MEMORY glass_ui_binding_verification).
- `/api` + MIGRATION.md rows → carried by W-FACTOR-ASKS.

## §Acceptance

Gate: **`proof:fold-delete`** (overlay clause, authored in W-AXES-GATES) + the WCAG π.
- overlay clause (BORN-RED at HEAD — HoverPopover + HoverCard dirs/subpaths live): `custom/hover-popover/`
  + `ui/hover-card/` dir-absent ×2, `/hover-popover` + `/hover-card` subpath-absent ×2, no live
  `HoverPopover`/`HoverCard` import in `src/` ×2, survivor `Popover` present → GREEN.
- axes membership (from W-AXES-GATES): `TRIGGERS = ["click","hover","context"]` tuple is the fenced source.
- Self-test bite: a synthetic re-added HoverCard dir REDs the overlay clause.

## §π/DELTA

- **WCAG 1.4.13 + coarse-pointer + focus-return** π (the acceptance bar, PASS-1 gap 1): the union bloom
  frame-series, hover-hoverable-content dismiss, coarse-pointer tap-toggle, focus-return-to-invoker —
  Chrome + real WebKit, BOTH modes. DELTA: `W-OVERLAY-UNION-DELTA.md`. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)
  (`proof:ba-gestalt` overlay-band).
- The public `v-model:open` re-emit e2e sweep (the silent-no-op class) is a binding capture, not a unit.

## §Obligations

- Modal-Dialog focus-RETURN divergence on stable Safari/WKWebView (SAF-1) — a real-device run owed (the
  union inherits reka's FocusScope focus→body; it does not introduce it).
- The words ×12-13 hover-card migration + atlas EasterEgg.vue:44 hover-popover fold → W-FACTOR-ASKS.

## §Dispositions

- Terminalizes CHRONIC §6.6 hover-popover Kronecker fold: **FOLDED** onto `Popover trigger=hover`
  (keepDockOpen on the axis), consumer migration ask filed. No re-book.
- Terminalizes FAM-10 hover-popover re-adjudication + UF-J6: **FOLDED-TERMINAL**.
- HoverCard + HoverPopover + IconTooltip-as-root: **RETIRED as NAMES** (mechanisms preserved on the union /
  Tooltip preset). Clean break, no alias.
