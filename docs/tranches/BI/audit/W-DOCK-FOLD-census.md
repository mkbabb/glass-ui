# BI.W-DOCK-FOLD — the G10 retirement census

The inv-11 corollary made structural (PASS-1 §2.8, §3): before any public-surface
delete, the constellation grep + `npm view` lineage probe verifies EITHER
zero-binary-consumer OR forces a NAMED migration row (never a silent prune). G10 CLOSED
— the fold is a net −118 component lines, −2 nouns (`DockIconButton`/`DockTabButton` +
the 3 triggers → 2 survivors), −0 subpaths (all live on `/dock`) for a one-time
~13-15-site internal + ~24-site cross-repo migration, strictly more correct (PASS-4B
KISS verdict).

The verdict per retirement — each carries its binary-consumer disposition:

| Retired symbol | Kind | Binary-consumer verdict | Disposition | Successor |
|---|---|---|---|---|
| `DockIconButton` | public `/dock` SFC | NON-zero — ~24 import sites across ~9 consuming repos (speedtest, muster, sci-report, atlas, bbnf-buddy, slides, …); 11 internal glass-ui sites (demo + shell + DockBackgroundToggle + DockStack) | FOLD → survivor + FORCED MIGRATION ROW (never silent) | `<DockControl>` (`shape="icon"` default) |
| `DockTabButton` | public `/dock` SFC | 2 internal sites (BottomDock, instrument-chassis) + external tab-strip consumers | FOLD → survivor + MIGRATION ROW | `<DockControl shape="tab">` |
| `DockSelectTrigger` | public `/dock` SFC | 1 internal site (overview.vue) + external | FOLD → survivor + MIGRATION ROW | `<DockTrigger for="select">` |
| `DockDropdownTrigger` | public `/dock` SFC | 1 internal site (overview.vue) + external | FOLD → survivor + MIGRATION ROW | `<DockTrigger for="dropdown">` |
| `DockPopoverTrigger` | public `/dock` SFC | 1 internal site (overview.vue) + external | FOLD → survivor + MIGRATION ROW | `<DockTrigger for="popover">` |
| reka `ui/tabs/*` (Tabs/TabsContent/TabsList/TabsTrigger/TabsIndicator) | INTERNAL substrate (never on a public barrel — CLAUDE/canon "off the public surface") | ZERO public consumer; sole internal consumer `DockLayerGroup` | RETIRE-terminal (clean break) — DockLayerGroup re-points onto `useSelectionGroup` | the ONE headless selection engine `useSelectionGroup` + `useSelectionIndicator` (Safari-identical, ONE writer) |
| `useDockItemDrag` | INTERNAL composable (never barrel-exported) | ZERO binary consumer — demo-only dock-ITEM drag-reorder; the only site was `GlassDock.vue`'s `draggableItems` axis wiring | RETIRE-terminal (clean break) — its `new SpringProgress` @:106 dies (counted by W-DOCK-SPRING-UNIFY SU1) | a dock reorder is a consumer concern: `useSortable` (`@mkbabb/glass-ui/sortable`) |
| `<GlassDock draggable-items>` + `update:order` emit | public GlassDock API | ZERO binary consumer (demo-only, powered by the retired `useDockItemDrag`) | RETIRE-terminal + MIGRATION ROW (no masking dead prop — an axis with no engine behind it is the masking-fallback crime) | `useSortable` |

## The KEEP — verified NOT retired (the census guard)

- **`useDockCtaReceive` + `cta-seat.css`** — the pass-2 `/dock`-only-export charge was
  REVERSED. The speedtest cta-seat consume contract (BC.W-AX-DOCK-CTA-SEAT) is REAL: the
  triple export STAYS on `/motion` + `/dock` + `/api` (verified on disk:
  `composables/motion/index.ts` re-exports `./useDockCtaReceive`; `dock/index.ts`
  re-exports it beside GlassDock; `api/index.ts` publishes the `UseDockCtaReceive*` types
  via the `export type * from "./types-extra"` carve). A synthetic cta-seat delete REDs
  `proof:dock-fold` F3.

## Registry / lineage probe (offline-safe)

The retired symbols are all `@mkbabb/glass-ui`-published on `/dock` (or internal); no
divergent fork-lineage registry consumer exists for them (the d6 3.11.x/3.12.0 fork line
is closed at BA/4.0.0; `proof:lineage-probe` owns the live probe). Every retirement above
carries either a zero-consumer verdict OR a forced, named MIGRATION.md row + a cross-repo
ask row (`docs/tranches/BI/coordination/W-DOCK-FOLD-asks.md`) — never a silent prune.

## Machine-lock

`proof:dock-fold` (F1 components-folded · F2 reka-ui-tabs-retired · F3 cta-seat-preserved
· F4 migration-table-complete · F5 useDockItemDrag-retired + 3 self-test bites). The
migration byte-diff (the folded `<DockControl>` paints byte-identical to the pre-fold
`DockIconButton` at the default) is proven by W-DOCK-CONTROLS' DELTA; this wave is a
REFACTOR/census with zero own paint delta.
