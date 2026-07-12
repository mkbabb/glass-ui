# BI.W-ESC-STACK — expandable-container first-principles rebuild + the global-Escape overlay stack

Band B8 (prunes + consumer-truth / mechanism-local repair). Born-RED at HEAD.

## §Mandate

Discharges (every row this wave OWNS):
- **UF-J5** — "/containers/expandable-container — needs fixing from first principles. And esc doesn't
  globally work." (DEFECT).
- **A11Y-4** [P2] — ExpandableContainer fullscreen has NO focus trap / focus move-in / focus restore /
  `inert`-behind (the registry explicitly pairs A11Y-4 with UF-J5: "the first-principles rebuild owns both").
- **FAM-2 / bld:esc-stack** (CHRONIC §2) — Escape single-winner: `dispatchShortcut` first-match-returns
  (`useKeyboardShortcuts.ts:209`), and ExpandableContainer registers an unconditional Escape handler on
  MOUNT (`ExpandableContainer.vue:187`), so a collapsed container swallows Escape from a later-opened overlay.

## §Design

Decided mechanism (ROUND-1 FAM-2 disposition + ARV lens re-confirm "first-registered-wins"). Two coupled
repairs, no design loop — a decidable interaction contract:

- **The Escape overlay stack (top-open wins).** An overlay registers its Escape handler ONLY WHILE OPEN
  (register on open, unregister on close), and the dispatcher resolves Escape LIFO — the most-recently
  registered OPEN handler fires and consumes; the rest of the stack is untouched (a second Escape pops the
  next). A collapsed container holds NO handler. The generic first-match dispatch is KEPT for all non-Escape
  keys (a multi-winner accelerator is correct there); only the Escape "dismiss-topmost" semantic is LIFO.
  This is the reka DismissableLayer stack semantic made true for the house `registerShortcut` path (the reka
  overlays — Dialog/Sheet/Drawer/Popover/Command — already dismiss-topmost via their own DismissableLayer;
  the house-registry Escape must match, not shadow it).
- **The fullscreen focus model (A11Y-4).** The `open` (fullscreen) panel composes reka-ui's `FocusScope`
  (`trapped` + move-in on mount + restore on unmount — the same primitive `<FocusScope>` wraps), and the
  page-behind carries `inert` while fullscreen (mirroring the Teleport `:disabled="!open"` gate the SFC
  already keys off `open`). Escape (now stack-topmost while open) collapses it, FocusScope restores focus to
  the `#expand-trigger`. Clean break: the on-MOUNT unconditional Escape registration is replaced by the
  on-OPEN registration — no alias, no dual path.

## §Work

- `src/composables/keyboard/useKeyboardShortcuts.ts` (`dispatchShortcut`, ~L194-211) — for the `Escape`
  key, resolve LIFO (iterate the registry in reverse-registration order, invoke the first OPEN match, consume,
  return); non-Escape keys keep the existing forward first-match. The registry Set already preserves insertion
  order; the reverse walk is the only change (no new data structure).
- `src/components/custom/expandable-container/ExpandableContainer.vue` — move the `registerShortcut("Escape", …)`
  (L187) out of `onMounted` (unconditional) into a `watch(open)` register-on-open / unregister-on-close (the
  `unregEsc` handle already exists at L187); wrap the `v-if="open"` fullscreen panel in reka `FocusScope`
  (`trapped`, move-in, restore); set `inert` on the page-behind root while `open` (the `!open` inline branch at
  L3 is the natural inert target when a sibling fullscreen is mounted, or `document.body` children gate off the
  existing `syncBodyOverflowLock` watcher).
- Audit the other `registerShortcut("Escape")` binders (grep: ExpandableContainer is the sole `src/components`
  binder at HEAD; the completeness sweep confirms no second unconditional-on-mount Escape survives).

## §Acceptance

Gate: **`proof:esc-stack`** (NEW, `["local","ci"]`) — device-free source arm + a live-behavior clause.
- **BORN-RED at HEAD**: (a) `ExpandableContainer.vue` registers Escape in `onMounted` unconditionally (the
  register-while-open clause reds); (b) the fullscreen panel has no `FocusScope`/`inert` (the focus-model
  clause reds); (c) `dispatchShortcut` returns on first match for Escape (the LIFO clause reds).
- E1 — every house Escape registration is gated on an OPEN state (no `onMounted`-unconditional Escape survives
  in `src/components`).
- E2 — `dispatchShortcut` resolves Escape LIFO (most-recent-open wins); non-Escape keys unchanged.
- E3 — the fullscreen ExpandableContainer composes `FocusScope` (trapped + move-in + restore) + `inert`-behind.
- Self-test bites: a synthetic `onMounted` unconditional Escape reds E1; a synthetic forward-first-match Escape
  dispatch reds E2; a fullscreen panel missing `FocusScope` reds E3.

## §π/DELTA

`tests-visual/esc-stack.spec.ts` (NEW, LOCAL-only, rides W-REFLECT):
- **Escape stack** — open ExpandableContainer #1, then #2 (nested/stacked); Escape closes #2 (topmost), a
  second Escape closes #1 — NOT #1-first (the single-winner regression). Chromium + real WebKit.
- **Focus model** — on expand, `document.activeElement` is inside the fullscreen panel; Tab cycles within it
  (trap); on collapse, focus is restored to the `#expand-trigger`; the page-behind is `inert` while fullscreen.
  axe `aria` clean (no focus-trap escape). BOTH modes.

## §Obligations

- No cross-repo ask (internal composable + SFC repair; the public `v-model:open` / `#expand-trigger` /
  `data-part` surface is unchanged — the BC.W-EXPANDABLE-PART contract is preserved).
- Live-behavior clause requires a real browser (the LOCAL π arm); CI carries the source arms only.

## §Dispositions

- Terminalizes **bld:esc-stack** (CHRONIC §2): BUILT (register-while-open + LIFO). Liveness probe: an
  `onMounted`-unconditional Escape or a forward-first-match Escape dispatch REDs.
- Terminalizes **A11Y-4** (CHRONIC / FAM-15): BUILT (FocusScope + inert + restore on the fullscreen path).
