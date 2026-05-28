# AN.W7 — Overfitting audit

The overfitting precept: every `src/` artefact has ≥ 2 sites OR is exported OR is a demo-private helper. The AN cohort added a small additive surface (Drawer mode + showOverlay + drawer.css + two role emissions + Toast.duration) and several demo-private proofs. The two ARCHIVED items wrote no source. This audit confirms the cohort is clean.

## Source artefacts (each exported or ≥ 2 sites)

| Artefact | Justification | Verdict |
|---|---|---|
| `Drawer mode?: "modal" \| "live-behind"` prop (`src/components/ui/drawer/Drawer.vue`) | Exported via root-barrel `Drawer`; consumed by `demo/stories/compositions/drawer-live-behind.vue` (live-behind proof) + the live-behind contract muster F.W10 consumes. | CLEAN — exported |
| `DrawerContent showOverlay?: boolean` (`DrawerContent.vue`) | Exported via root-barrel `DrawerContent`; consumed by the live-behind demo (`:show-overlay="false"`) + the live-behind contract. | CLEAN — exported |
| `DrawerMode` type (`src/components/ui/drawer/index.ts`) | Co-exported from the drawer package barrel; the public type for the `mode` prop. | CLEAN — exported |
| `src/styles/drawer.css` (cascade rung 17) | Consumed by `DrawerContent.vue` (`.glass-drawer` surface + peek-handle grammar) + imported at `src/styles/index.css`, so it ships in `/styles`. Replaces the prior inline-Tailwind triplet on `DrawerContent`. | CLEAN — consumed by an exported component + the `/styles` cascade |
| StatusDot `role="img"` emission (`src/components/custom/status-dot/StatusDot.vue`) | Behaviour on an already-exported primitive (root-barrel `StatusDot`); the a11y role contract. | CLEAN — exported primitive |
| SortableHandle `role="button"` + `tabindex="0"` emission (`SortableHandle.vue`) | Behaviour on an already-exported primitive (`/sortable-list`); the drag-affordance role contract. | CLEAN — exported primitive |
| Toast `duration?: number` (`src/components/ui/toast/use-toast.ts`) | Field on the exported `Toast` interface (`ToasterToast` / `ToastOptions` inherit); consumed by the existing forward chain to reka `ToastRoot`. | CLEAN — exported interface field |

## Demo-private artefacts (proof surfaces, NOT exported)

| Artefact | Justification | Verdict |
|---|---|---|
| `demo/stories/compositions/drawer-live-behind.vue` | Demo-private live-behind proof over a verdict-shape surface + modal contrast (W3 §A-§E evidence host). | CLEAN — demo-private |
| `demo/stories/primitives/status-dot.vue` aria-label probe section | Demo-private W4.A probe extension. | CLEAN — demo-private |
| `demo/stories/data/sortable-list.vue` `:aria-label` on default span grip | Demo-private W4.B probe extension. | CLEAN — demo-private |
| `demo/stories/primitives/number-field.vue` three label-channel probe sections | Demo-private W4.C probe extension. | CLEAN — demo-private |

## ARCHIVED items — no source written

| Item | Source footprint |
|---|---|
| Gap 4 — interruptible MetricStack reorder recipe (W5) | NONE. ARCHIVED on the 2-consumer gate; the recipe SFC + `.metric-stack-move` class are unbuilt until ≥ 2 consumers materialise. |
| Gap 5 — dock panel-host variant (W6) | NONE. ARCHIVED on the 2-consumer gate; no panel-host source ships. |

## Documentation-only dispositions — no source written

| Item | Footprint |
|---|---|
| Gap 2 — Tailwind utility emission (Option B, W2) | CLAUDE.md §Consumer wiring paragraph only; zero dist change. |
| Gap C — NumberField label binding (verdict C2, W4) | CLAUDE.md §Component architecture paragraph only; the AM.W0.2 chain is sound, no new source. |
| Gap 6 — chassis "ping" canon (W6) | CLAUDE.md §Component architecture note only; the `InstrumentChassisPhase` union is unchanged. |

## Verdict

**CLEAN.** Every AN `src/` artefact is exported (or behaviour on an exported primitive/interface) or consumed by the `/styles` cascade; every demo artefact is demo-private; the two ARCHIVED items and the three documentation-only dispositions wrote no source. No speculative substrate landed — the overfitting precept holds across the cohort.
