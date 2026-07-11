# D-FACTOR PASS-1 SPEC — the component-axis factorization (synthesizer: orchestrator/Fable, 2026-07-11)

Inputs: the four pass-1 research returns (`RESEARCH-PASS-1.md`, raw). Verdict grammar:
ADVANCE / BANK / BLOCK / RETIRE per family; the pass-2 slate closes the enumerated gaps.

## Family verdicts

| family | verdict | why |
|--------|---------|-----|
| FACTOR-A one-overlay-root | **ADVANCE (the mechanism spine)** | Proven at reka-source level: the three roots are genuinely distinct; trigger×focus-model are COUPLED by the substrate, so the trigger axis must switch roots — and the root-switch wrapper pattern already ships (HoverPopover's own two-branch). Full delete-set + consumer-migration map delivered. |
| FACTOR-B axis-grammar-per-root | **ADVANCE (the taxonomy breadth)** | Adjudication-grade verdicts across every cluster (below). Composes with A: A is the flagship root, B is the library-wide law. |
| FACTOR-C behavior-composables | **RETIRE (honest self-refutation) — kernel folds into A** | The maximal form re-forks reka-owned timers/positioning/dismiss (no-dual-path violation) for a consumer population of ~1 bespoke user. The kernel that survives: the `trigger` axis + `persist` on the union root, `useTouchGate` + dock-keep-open documented as THE behavior floor. The atlas EasterEgg migration is the proof case (deletes ~25 lines of consumer a11y wiring). |
| FACTOR-census axis-matrix | **ADVANCE (the substrate)** | Full component×axis matrix mined mechanically from CVA maps + prop unions; synonym-collision census; the ordered fold sequence. |

## The settled adjudications (pass-1 CONFIRMED; mechanism-distinctness law applied)

**Overlay cluster:** ONE sealed `Popover` (survivor noun) with `trigger: click | hover | context` ×
`role: dialog | card` × `surface`; the trigger axis switches the reka root internally
(click/context/coarse-hover → PopoverRoot; fine-hover → HoverCardRoot); `role=dialog` under
`trigger=hover` is REFUSED (dev-warn, fall to card — the WCAG trap made structural). HoverCard +
HoverPopover DELETE as names; `hoverOpenDelay`→`openDelay`; `keepDockOpen` consolidates onto BOTH
roots (one watcher). **Tooltip + IconTooltip survive the union** — aria-describedby naming machinery,
role=tooltip, SR mirror, non-focusable content: a genuinely distinct mechanism (IconTooltip demotes to
a Tooltip preset, not a root). Coarse pointer: hover triggers auto-promote to tap-toggle via the
PopoverRoot branch (`excludeTouch` means reka's hover root is structurally dead on touch — the union
fixes what reka doesn't ship).

**Dialog cluster:** Sheet FOLDS onto Dialog as a `placement` axis (center | top | right | bottom |
left) — same reka DialogRoot, same focus trap; slide is paint, not mechanism. **Drawer SURVIVES** —
snap-detent spring physics + the live-behind non-modal focus model + keyframes-bearing chunk isolation:
mechanism no survivor expresses. ConfirmDialog demotes to a Dialog preset (its imperative promise
opener is thin).

**Menu cluster:** ContextMenu FOLDS onto Menu as `trigger=context` (identical roving-focus/typeahead;
items already share ONE menuItemVariants). Select (listbox) and Combobox (combobox) BOTH survive —
distinct ARIA roles + keyboard models. MultiSelect → `Combobox multiple`. **Command: CONTESTED CELL**
(B says fold-to-Combobox-preset; census says survivor) → pass-2 adjudication.

**Boolean cluster: NO FOLDS.** Checkbox / Switch / Toggle / RadioGroup are four distinct ARIA roles
with distinct AT announcements — folding regresses a11y. The census law protects them.

**Strips:** SegmentedTabs (traveling indicator mechanism) and ToggleGroup (multi-select strip) both
survive; reka ui/Tabs stays internal substrate.

**Chips/badges:** ToggleChip + SelectableChip FOLD into ONE Chip (`shape: pill | cell` × `tone`) —
ToggleChip's `variant` is literally a name-synonym of `shape`. Badge survives (static, non-interactive).
IconChip: BORDERLINE → pass-2. Metric family folds to ONE `Metric` with a `layout: badge | pill |
cell | stack | row` axis (`register`→`size`); "badge" is reserved for status labels.

**Surfaces:** Card is THE glass surface (GlassPanel retire already settled); Section +
InstrumentChassis survive as non-glass mechanisms.

## The synonym-rename law (library-wide clean breaks, no aliases)

`type`→`tone` (Notification/Alert/Toast/Badge) · `axis`/`direction`→`orientation` · `side`/
`position`→`placement` · `register`→`size` · `ToggleChip.variant`→`shape` · `variant` becomes
RESIDUAL-ONLY (no size/tone/surface concept may hide in a variant map — gate-enforced). Button's
two-axes-one-endpoint redundancy (`variant=solid` vs `surface=opaque`): surface owns opacity —
pass-2 confirms the fold direction.

## Open gaps (pass-2 must close; these gate convergence)

1. **The root-switch prototype** — the load-bearing assumption: one wrapper switching
   PopoverRoot/HoverCardRoot under a stable slot contract with focus/dismiss/portal/paint parity.
   Prototype in a worktree; the acceptance bar is WCAG 1.4.13 + coarse-pointer tap + focus-return π.
2. **Menu[trigger] prototype** (the cleanest fold; proves the pattern generalizes past overlays).
3. **Dialog[placement] fold prototype** (Sheet absorption) + focus-return + edge-slide π parity.
4. **The contested/borderline cells**: Command (fold vs survive), IconChip, BorderProgress (already
   ruled retire-until-adoption — reconcile), HeaderRibbon, LabeledField wrappers, ConfirmDialog-as-preset.
5. **Naming + API form final call**: sealed `Popover` (census: no sibling uses a compound-only
   mechanism, so sealed is provably complete) — confirm against demo-authoring ergonomics.
6. **SelectTrigger size-axis split** (height vs font-emphasis two-concept axis) without re-opening the
   BA-VJS-4 trigger/items desync.
7. **The migration ledger**: every fold's consumer-migration rows (words ×13 hover-card files, atlas,
   fourier-analysis, timeline internal) + MIGRATION.md rows + api/ surface diff.
8. **Gate designs**: axes.ts membership fence extended (tone/placement/trigger); the variant-residual
   born-RED gate; the per-fold DELETE proofs (definition-absent).

## Pass-2 prototype slate

P1 the union overlay root (worktree, runnable, drives the atlas-EasterEgg migration as proof) ·
P2 Menu[trigger] · P3 Dialog[placement] · P4 the Chip fold (pure CVA, compile-time) ·
P5 the synonym-rename sweep dry-run (mechanical count + api lockstep check).

## Loop state

D-FACTOR: pass 1 COMPLETE. Families: A ADVANCE · B ADVANCE · C RETIRED (kernel folded into A) ·
census ADVANCE. Convergence estimate: ~70% (the root-switch prototype is the remaining load-bearing
unknown; taxonomy verdicts are high-confidence). Pass 2 = prototypes + adversarial critique.
