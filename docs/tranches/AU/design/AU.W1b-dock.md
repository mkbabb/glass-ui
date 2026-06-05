# AU.W1b design slice — the dock (re-issue of AT.W1b-dock, HEAD delta folded)

**Origin:** `docs/tranches/AT/design/AT.W1b-dock.md` (the AT.W1b dock slice). AU re-issues
it with the HEAD delta folded — the dock is the ONE AT headline that partially executed, so
this slice records what LANDED and carries forward only the UNEXECUTED remainder.

**HEAD delta @ `8e4cb9f`:** three dock commits LANDED (re-grounded as FACT, AU.md §2):

| Commit | Slice | Landed | Status |
|---|---|---|---|
| `e906448` | AT.W6-dock-c | VT/FLIP motion-parity (`--dock-resize-spring`); `morphGeneration` guard; `proof:dock-motion-parity` | **DONE-AT-HEAD** |
| `f0b0ffb` | AT.W6-dock-**b′** | touch-gate B′ (double-tap field defect fixed); behavioural touch test | **DONE-AT-HEAD** |
| `8e4cb9f` | AT.W7-dock-a/b/c | overflow clean break (`wrap` deleted); token refinements (press `0.92`→`var(--scale-press)`); `proof:doc-consistency` | **DONE-AT-HEAD** |

These are re-verified on AU's OWN green CI at AU.W10 (inv-27 — they landed on PR #1, not a
tranche-gated close). The slot-ID collision (`W6-dock-b` re-used by the touch-gate) is
re-lettered at AU.W0 — the un-shipped a11y/state contract → AU.W8.

---

## §1 — What CARRIES FORWARD (the unexecuted remainder)

The dock is hardened MOTION-first; the STRUCTURE waves did not land. AU executes:

1. **The dock opacity-lockstep fold** (AU.W2 — slides-F P0). The VT-curve half SHIPPED
   (`e906448`); the opacity-desync half is UN-FIXED at HEAD (`dock.css` `.dock-layer{,-item-host}`
   still `opacity var(--dock-motion-fast)` 0.2s while the container morphs at
   `--dock-motion-resize` 0.3s — the 100ms-apart settle). Swap to `--dock-motion-resize`;
   extend the base-rule `visibility` delay; preserve the active-rule immediate show. Gate:
   `proof:dock-opacity-lockstep` (a playwright timing probe — items + container settle ≤1
   frame).

2. **`proof:strict-templates` — the KEYSTONE** (AU.W3, library-wide). The AT plan said it
   "lands FIRST so the clean breaks typecheck-fail" — it did NOT; the W6/W7 breaks shipped
   UNGUARDED. AU lands it FIRST within AU.W3 (`checkUnknownProps:true` across all three
   tsconfigs, NOT the booked narrow point-spec guard — SUPERSEDED), then re-verifies the
   landed breaks under it. `<GlassDock bogus-prop>` becomes a RED typecheck.

3. **The reka-ui `Tabs` rail + the a11y/state contract test + the travelling rail-indicator**
   (AU.W8, ONE atomic `GlassDock.vue`/`DockLayerGroup.vue` pass — no double-touch, the AT
   mistake where overflow landed alone). Adopt `TabsRoot/List/Trigger/Content` (APG-Tabs
   canon, free roving tabindex, no fourth boilerplate ARIA copy); the rail becomes
   `role="tablist"`, triggers `role="tab"` + `aria-selected` (NOT `aria-pressed`),
   `aria-controls`→`role="tabpanel"`. The a11y + state-machine contract test is the
   re-lettered original `W6-dock-b` (a behavioural mounted-dock test, inv-ε — tablist/tab/
   aria-selected, roving tabindex, focus-visible, the `keepOpen()/release()` contract slides
   binds via `dockRef`). The per-button background is RETIRED (P1) for one travelling
   `--dock-rail-indicator-*` element animated on `--dock-resize-spring`. Gates:
   `proof:dock-a11y-contract`, `proof:dock-vocabulary`.

4. **Spring-fidelity unification + micro-feedback + `will-change` hygiene** (AU.W8). NOTE:
   `--scale-press-dock` 0.92→0.96 is DONE-AT-HEAD (`8e4cb9f`, AT.W7-dock-b) — it ships to
   slides via the AU.W10 PUBLISH (published 3.2.0 still carries 0.92), NOT AU.W8 work.

5. **The `<Role>Dock` docs vocabulary + base renames** (AU.W8, ASK-7). ONE role vocabulary
   (`ChromeDock`/`TransportDock`/`CanvasDock`/`ToolDock`) documented ONCE in
   `src/components/custom/dock/README.md` (born-RED — absent at HEAD) + `useTouchGate→
   useDockTouchGate` rename (co-located + one-minor alias) + `DockTabButton` RETIRE (0
   consumers — component `DockTabButton.vue`, export `dock/index.ts:5`, `dock.css:877`/`:947`
   comment refs). The `<Role>Dock` COMPONENT is BOOK (no 2nd consumer; slides binds
   `GlassDock`+`DockIconButton`+`#collapsed`); keyframes D.W5 is the named candidate 2nd
   consumer (the reciprocal cross-session edge).

## §2 — The rail-aria version call

The `aria-pressed`→`aria-selected` rail break is consumer-visible — AU's own minor-vs-major
SemVer call (`deferred-lineage §2` #11; kept OUT of AT's additive-3.3.0 by C5-4). AU records
the tier in the AU.W10 changeset; the publish owner finalizes it. The rail-aria break is
AU's own minor-fix version call, kept OUT of the additive surface.

## §3 — Atomicity (the AT mistake AU does not repeat)

Items 1-3 of AU.W8 (reka-Tabs rail + a11y contract + travelling indicator) are ONE edit set
over `GlassDock.vue`/`DockLayerGroup.vue` — they do NOT ship across separate commits that
each half-touch the rail (the AT mistake where overflow landed alone and the rail did not).
`proof:dock-a11y-contract` covers the WHOLE rail after the single pass; a partial rail
reddens it.

## §4 — The dock-DESIGN split is GESTALT-driven, not overfitting-driven

The dock IS ≥2-consumed (4 repos — glass-ui demo + slides + keyframes + fourier). AU exists
because the rail-aria break contaminates AT's additive-3.3.0, NOT because the dock failed the
≥2 bar (C5-6). Do NOT mis-cite the split as overfitting-driven (`deferred-lineage §11`).
