# BI.W-DOCK-FOLD — the G10 retirement census + the ~34-site consumer migration + cross-repo asks

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.8/§3 (retirement census — the inv-11 corollary), PASS-4B
obligation "Execute the G10 fold", G10 CLOSED (constellation grep + registry probe). Lands AFTER the
mechanism waves mint their survivors (`<DockControl>`/`<DockTrigger>`/`useSelectionGroup`/`<DockCrossfade>`).

## §Mandate

Discharges: the G10 fold — ~34 import-site files across 9 repos (`DockIconButton` dominates 24 files/9
repos); the reka `ui/tabs` retire (5 SFCs; `TabsContent` zero consumers); the speedtest 5-pane controlled-
no-rail crossfade-slot fold (isolated to speedtest alone); `useDockItemDrag` retire; MIGRATION rows + cross-
repo coordination asks; the **cta-seat speedtest consume contract PRESERVED** (the pass-2 /dock-only-export
charge was REVERSED — `useDockCtaReceive` is on `/motion` + `/dock` + `/api`). Registry: FAM-13 (PROMOTE-
CONTEXT/FOLD/PROMOTE-PRIMITIVES re-sequenced post-greenfield); XR the cross-repo relay.

## §Design

The retirement census is the inv-11 corollary made structural (PASS-1 §2.8, §3): before any public-surface
delete, the constellation grep + `npm view` lineage probe verifies zero-binary-consumer OR forces a named
migration row (never a silent prune). G10 CLOSED — the fold is a net −118 component lines, −2 nouns, −2
subpaths for a one-time ~13-15-site migration, strictly more correct (PASS-4B KISS verdict).

**The component fold executes here** (W-DOCK-CONTROLS mints the survivors; this wave migrates the consumers):
`DockIconButton.vue` + `DockTabButton.vue` → `<DockControl>`; the three triggers → `<DockTrigger>`; the reka
`ui/tabs` substrate retires (sole internal consumer `DockLayerGroup`, folded onto `useSelectionGroup`;
`TabsContent` zero consumers). `DockIconButton` dominates the blast radius (24 files/9 repos) — the migration
is mechanical (a by-name rename), landed as MIGRATION rows + cross-repo asks (the foreign-tree fence: glass-ui
edits ZERO sibling tree; the sibling repos consume on their own `^5.0.0` bump).

**The cta-seat is PRESERVED (the pass-2 charge REVERSED).** `useDockCtaReceive` + `cta-seat.css` KEEP — the
speedtest consume contract (BC.W-AX-DOCK-CTA-SEAT) is real; `useDockCtaReceive` stays on `/motion` + `/dock`
+ `/api` (verified: `composables/motion/index.ts:54`, `dock/index.ts:97`, `api/index.ts:178`). G10's census
verified this before any cut — the cta-seat is NOT retired.

**`useDockItemDrag` retires (G10 — zero binary consumer).** The dock item drag-reorder (`useDockItemDrag.ts`
302L, `new SpringProgress` at :106) is demo-only; its retire deletes its SpringProgress (one of the ~10-site
reconcile SU1 counts, W-DOCK-SPRING-UNIFY).

## §Work

- Author the MIGRATION ledger: `DockIconButton` → `<DockControl>` (24 files/9 repos); `DockTabButton` →
  `<DockControl shape=…>`; `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger` → `<DockTrigger>`;
  the reka `ui/tabs` retire (5 SFCs). Every public-surface change = a MIGRATION.md row + a cross-repo ask
  row (foreign-tree fence — the sibling edit lands in the sibling repo on its `^5.0.0` bump).
- The cross-repo asks (`docs/tranches/BI/coordination/` — the by-name relay): the speedtest 5-pane
  controlled-no-rail `<DockCrossfade :active>` fold (speedtest alone); the `DockIconButton`→`<DockControl>`
  rename across the 9 consuming repos; the reka `ui/tabs`-consumer migrations if any surface externally.
- `composables/useDockItemDrag.ts` (302L) — DEFINITION-ABSENT (retire; its `new SpringProgress` at :106 dies
  here, counted by W-DOCK-SPRING-UNIFY SU1).
- Retire `src/components/ui/tabs/` reka SFCs (`Tabs.vue`/`TabsContent.vue`/`TabsList.vue`/`TabsTrigger.vue`;
  `TabsIndicator.vue` folds onto `useSelectionIndicator`) — sole internal consumer `DockLayerGroup.vue:17`
  re-pointed to `useSelectionGroup` (W-DOCK-CONTROLS).
- PRESERVE `useDockCtaReceive` + `cta-seat.css` + the `/motion`+`/dock`+`/api` export surface (verify the
  triple export survives the fold).
- Update `docs/canon/` + MIGRATION.md — regenerate from disk (every target subpath resolves, every symbol
  exports; the DOC-1 self-contradiction class fenced).

## §Acceptance

Gate: **`proof:dock-fold`** (NEW, born-RED at HEAD — `DockIconButton`/`DockTabButton`/3-triggers are separate
SFCs; reka `ui/tabs` is live; `useDockItemDrag` is live; the MIGRATION table is absent).
- F1 **components-folded** (BORN-RED): `DockIconButton.vue`/`DockTabButton.vue`/the 3 trigger SFCs
  DEFINITION-ABSENT; `<DockControl>`/`<DockTrigger>` are the survivors → GREEN at the fold.
- F2 **reka-ui-tabs-retired** (BORN-RED): `src/components/ui/tabs/` DEFINITION-ABSENT; `DockLayerGroup`
  imports `useSelectionGroup`, not reka `ui/tabs`.
- F3 **cta-seat-preserved**: `useDockCtaReceive` resolves on `/motion` + `/dock` + `/api`; `cta-seat.css`
  present (the census KEEP — a synthetic cta-seat delete REDs this clause).
- F4 **migration-table-complete**: every retired public symbol carries a MIGRATION.md row + a cross-repo ask
  row; every named target subpath resolves on disk; the census records each retirement's binary-consumer
  verdict (`docs/tranches/BI/audit/W-DOCK-FOLD-census.md`).
- F5 **useDockItemDrag-retired** (BORN-RED): `useDockItemDrag.ts` DEFINITION-ABSENT.
- Self-test bites: a synthetic surviving `DockIconButton` SFC REDs F1; a synthetic cta-seat delete REDs F3; a
  synthetic retired-symbol-without-a-MIGRATION-row REDs F4.

## §π/DELTA

None own (a REFACTOR/census wave — zero paint delta at the default). The migration byte-diff is proven by the
surviving mechanism waves' π (the folded `<DockControl>` paints byte-identical to the pre-fold
`DockIconButton` at the default — captured in W-DOCK-CONTROLS' DELTA). This wave's evidence is the census
table + the resolving MIGRATION rows.

## §Obligations

- **Cross-repo asks (foreign-tree fence — glass-ui edits ZERO sibling tree):** the ~9 consuming repos migrate
  `DockIconButton`→`<DockControl>` on their `^5.0.0` bump; speedtest folds its 5-pane onto `<DockCrossfade>`.
  These are ASK rows in `docs/tranches/BI/coordination/`, not glass-ui edits.
- The `/api` surface diff + the peer-spine pin-guard (XR: consumers pin pre-5.0.0 with stale kf/value peers —
  the 5.0.0 publish hazard) is a close-band coordination concern; this wave's asks feed it.

## §Dispositions

- **cmd:dock-third-press** (dock control as 3rd `useSpringPress`/`useLiquidPress` consumer, MET-LANDED) —
  PRESERVED through the `<DockControl>` fold (the folded control keeps `useLiquidPress` + `--dock-press-t`).
- The reka `ui/tabs` retire + the `useDockItemDrag` retire land as decided-terminal disposition rows (clean
  break, no alias; the census-verified zero-binary-consumer verdicts recorded).


## Round-5 additions (R5-C-02 + the atlas P-loop coupling)
- MIGRATION+ask rows for **value.js**: `useLayerTransition` (ActionBarLayer.vue:8, Dock.vue) +
  `DockLayerGroup`/`DockLayer` — the crossfade fold's consumer set includes value.js, NOT speedtest
  alone; a silent prune of the published symbols is forbidden (F4).
- The atlas **DockAppendix PEEK-as-third-detent** ask (atlas-inbox-2026-07-12-p-loop.md §3, refining
  ask #17) rides the SAME useLayerTransition→orchestrator fold: the crossfade slot's design carries
  the tri-state (SHUT→PEEK→FULL) as a bounded extension consideration; atlas self-hosts until the
  primitive ships and swaps on its consume batch.
