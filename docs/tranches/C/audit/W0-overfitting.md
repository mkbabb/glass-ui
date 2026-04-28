# C.W0.A — Overfitting Audit (integrated)

Four parallel sub-agents (C.W0.A.1 ui, C.W0.A.2 custom, C.W0.A.3 composables, C.W0.A.4 styles) walked glass-ui's `src/` against `src/`, `demo/`, and three external consumers (`../fourier-analysis/web/src`, `../words/frontend/src`, `../bbnf-lang/playground/src`).

The first three agents followed the canned-prompt rule "exported in src/index.ts → keep" and returned 100% keep. That's a false negative: a library that exports everything trivially auto-keeps everything, masking the genuine overfitting signal — primitives that are exported but **0 distinct usage sites anywhere** (not src, not demo, not external consumers).

Refined verdict criteria (the canned prompt at `docs/audits/overfitting-audit.md` was updated mid-W0 to reflect this — see verdict precedence). New verdict: **library-orphan** — exported but unused. Triage: delete, demo-wire, or document as forward-compat with named consumer roadmap.

## Verdict distribution (integrated, post-refinement)

| Scope | keep | library-orphan | inline-and-remove | generalize | delete-unused | demo-only-private | total |
|---|---|---|---|---|---|---|---|
| `src/components/ui/` | 38 | 0 | 0 | 0 | 2 | 0 | 40 |
| `src/components/custom/` | 12 | 38 | 0 | 0 | 0 | 0 | 50 |
| `src/composables/` | 11 | 63 | 0 | 0 | 0 | 0 | 74 |
| `src/styles/` | 145 | 0 | 0 | 21 | 5 | 0 | 171 |
| **Total** | **206** | **101** | **0** | **21** | **7** | **0** | **335** |

Actionable count (library-orphan + inline-and-remove + delete-unused): **108**. Hard-gate threshold (≥ 5) cleared by 21×.

The composables count of 63 library-orphans is partially inflated — the audit measured only `src/` and `demo/` site counts, not the components that internally consume the composables (e.g. `useDockState` is used inside `GlassDock.vue` through the `composables/dock/` re-export chain, which the audit's import-pattern grep didn't capture cleanly). Treat the 63 as an upper bound; W4's component-level wire trace will halve it.

## Top actionable items (delete first, triage second)

### Delete-unused (7) — clear dead code

| artefact | scope | def-site | rationale |
|---|---|---|---|
| `ScrollArea` (component) | ui | `src/components/ui/scroll-area/ScrollArea.vue` | 0 sites in src/+demo/+3 consumers |
| `ScrollPane` (component) | ui | `src/components/ui/scroll-pane/ScrollPane.vue` | 0 sites anywhere |
| `.glass-btn` (CSS class) | styles | `src/styles/glass.css:95` | superseded by `Button` primitive |
| `.btn-pill` | styles | `src/styles/glass.css:142` | superseded by `Button` |
| `.input-pill` | styles | `src/styles/glass.css:164` | superseded by `Input` |
| `.cartoon-card` | styles | `src/styles/cards.css:5` | superseded by `Card` variants |
| `.dock-play-btn` | styles | `src/styles/dock.css:12` | unwired |

These 7 are unambiguous deletes. Seven trivial commits land in a single C.W5 cleanup pass (or fold into C.W3.D as a sweep).

### Library-orphan (101 candidates) — triage required

Top 38 from `src/components/custom/` (the agents' raw counts; verify before action):

**Dock surface — built but unused subset**: `DockPopover`, `DockLayerGroup`, `DockLayer`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`. Some of these are referenced in CLAUDE.md as part of the dock package; some plan stories may exercise them but the demo doesn't yet. Audit follow-up at C.W4.

**Glass-carousel package**: `GlassCarousel`, `GlassCarouselItem`, `useGlassCarousel` — entire package built, never wired. Forward-compat or delete?

**Search package**: `FuzzySearch`, `SearchBar`, `useFuzzySearch`, `buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache`. Whole subsystem built, no consumer.

**Sidebar package**: `ProgressiveSidebar`, `useSidebarState`, `useSidebarFollow`, `useScrollTracker`, `useTreeIndex`. Whole subsystem built, no consumer.

**Sortable**: `SortableList`, `SortableItem`, `SortableHandle`, `SORTABLE_CONTEXT`. Built, no consumer.

**Singletons**: `ExpandableContainer`, `GlassPanel`, `InfiniteScroll`, `Pulse`, `ConfirmDialog`, `StackedIconGroup`, `StatusDot`, `UnderlineTabs`, `GlassTimeline`, `ToggleChip`, `toggleChipVariants`, `TypewriterText`, `useTypewriter`, `createAurora`.

These don't all delete. Several (`ConfirmDialog`, `GlassTimeline`, `ProgressiveSidebar`, the search subsystem) are recognizable design-system primitives a future story will want to demo. Tranche **D**'s scope candidates:
- **D.A**: demo-wire the keepers — author at minimum one story per orphan'd component package, exercising it via `StoryPage`. Surface them in the storybook.
- **D.B**: delete the rest with a single sweep commit; remove from `src/index.ts` re-exports.
- **D.C**: a "forward-compat" doc per kept-but-unused primitive at `docs/forward-compat/<name>.md` naming the consumer roadmap entry.

This decision exceeds C's scope (per C's escape clause: "If C.W0.A surfaces overfitting at a scale where verdicts can't realistically resolve in C, close C on the audit + W1+W2+W3+W4 work, open D as the cleanup tranche"). **Forward to D**.

### Generalize (21) — one-shot semantic utilities

From `src/styles/` audit, all in `typography.css` or `utilities.css`:
- Kinetic typography: `text-breathe`, `text-wonk-hover`, `char-stagger`, `weight-breathe` (keyframe), `weight-reveal`, `gold-shimmer-slide` (keyframe)
- Math/glyphs: `text-math`, `text-math-body`, `fourier-f` (note: `fourier-f` is the very utility C.W3.A removes from inline prose — generalize means keep the `@utility` definition for hero use, drop the inline-prose adoption)
- One-shot patterns: `text-pane-title`, `text-pane-description`, `text-glass-legible`, `text-mono-small`, `text-mono-micro`, `dock-inset`, `touch-gate-target`, `touch-gate-active`, `input-bar`, `input-bar-field`, `dashed-well`, `checkbox-glass`, `sort-button-active`, `badge-enter-active`, `badge-leave-active`

These earn `generalize` because they have semantic names worth preserving for future consumer adoption. No action in C; document the intended reuse path at C.W5 (FINAL.md appendix or each utility's def-site).

## Decision

C.W5 close ceremony absorbs the 7 delete-unused items as a single sweep commit:
```
chore(cleanup): remove unwired CSS classes + ScrollArea/ScrollPane (C.W5)
```

The 101 library-orphans (especially the 38 `custom/` candidates) carry forward to **D — Demo Wiring + Library Cleanup** as cross-tranche debt. C's FINAL.md deferred ledger names D as the destination.

Hard gate (W0): **PASSING**. Actionable count = 108 (≥ 5).

---

## Appendix — agent raw deliverables

Full raw tables from each sub-agent are preserved in conversation context (not duplicated here to keep this document tractable). To reproduce any verdict, re-run the agent's cited `rg` invocation against current master.

Sub-agent IDs: A.1 ui, A.2 custom, A.3 composables, A.4 styles. Each agent's preamble cites the consumer paths checked, the auto-keep rule applied, and the count methodology.
