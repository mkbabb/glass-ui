# BD.W-DATA-RAW-BUTTONS

## 1. Band + one-line goal

**Band 5** — Demo PAGES second-half (the data-band drain).

Drain the M9B raw-`<button>` baseline's data-band slice — re-thread the raw `<button>` controls in `data/infinite-scroll.vue`, `data/timeline-continuous.vue`, `data/timeline-segmented.vue`, `data/virtual-section.vue` onto the shipped glass `<Button>` (the GAP-4 dogfood fix). Zero src paint (demo-private).

## 2. Starting state — the exact on-disk reality (verified by reading + a live count)

`scripts/proof-storybook-meta.mjs:326-347` declares `M9B_BASELINE`. The **data-band slice** (verified) is exactly these 4 files:
```
demo/stories/data/infinite-scroll.vue
demo/stories/data/timeline-continuous.vue
demo/stories/data/timeline-segmented.vue
demo/stories/data/virtual-section.vue
```
`detectRawButton` (`:348-360`) flags a file off-allowlist whose source matches `/<button\b/`; a NEW off-baseline file REDS the ratchet, a baseline-recorded file routes to the idiom-audit ledger. `m9b-raw-button-measure` is the aggregate clause (`:652`). The M9B allowlist (`:315-325`) is the configurator/control panes (dock-search, springs, curve-gallery, css-utilities, buttons, CodeBlock, …) — the data files are NOT allowlisted, they are baseline residuals.

The exact raw-button sites (verified file:line + a live `grep -c "<button"`):

| File | count | Sites (verified) |
|---|---|---|
| `data/infinite-scroll.vue` | 1 | `:72-78` `<button type="button" class="interactive-item rounded-md border border-border bg-background px-3 py-1.5 text-small shadow-cartoon-sm" @click="reset">Reset</button>` |
| `data/timeline-continuous.vue` | 2 | `:222-228` `<button … class="rounded-md border border-border bg-background px-3 py-1.5 text-small font-medium hover:bg-muted/40" @click="advance">Advance phase</button>` · `:229-235` `…@click="reset">Reset</button>` |
| `data/timeline-segmented.vue` | 2 | `:190-196` Advance phase · `:197-203` Reset (same shape) |
| `data/virtual-section.vue` | 1 | `:84-91` `<button type="button" class="interactive-item rounded-md border border-border bg-background px-3 py-1.5 text-small shadow-cartoon-sm" data-testid="scroll-to-target" @click="scrollToTarget">Jump to {{ jumpTargetId }}</button>` |

The glass `<Button>` import precedent is LIVE in the data band: `search.vue:28` `import { Button } from "../../../src/components/ui/button";` + `search.vue:336-358` (`<Button type="button" variant="outline" size="sm" data-testid=… @click=…><Icon class="mr-2 h-4 w-4" />label</Button>`) — the canonical re-thread shape (variant + size + lucide icon prefix).

These are GENUINE controls (Reset/Advance/Jump) — NOT bespoke dock affordances (the allowlisted dock-search collapsed-pill trigger is correctly KEPT; these are plain action buttons). They are the GAP-4 dogfood debt: a platform whose flagship is the glass `<Button>` hand-rolls a `rounded-md border bg-background` button in its own data demos.

## 3. The build

Re-thread each raw `<button>` onto the shipped `<Button>` — the `search.vue` precedent. For each file, import `Button` from `../../../src/components/ui/button` (where absent — all 4 lack it: infinite-scroll/timeline-continuous/timeline-segmented/virtual-section do NOT import Button) and replace:

```html
<!-- before -->
<button type="button" class="…rounded-md border …bg-background …" @click="reset">Reset</button>
<!-- after -->
<Button type="button" variant="outline" size="sm" @click="reset">Reset</Button>
```

Per-site:
- `infinite-scroll.vue:72-78` Reset → `<Button variant="outline" size="sm" @click="reset">Reset</Button>` (drop the `interactive-item rounded-md border bg-background … shadow-cartoon-sm` class — the glass Button owns its four-state register).
- `timeline-continuous.vue:222,229` Advance phase / Reset → `<Button variant="outline" size="sm" @click="advance">Advance phase</Button>` + `<Button variant="outline" size="sm" @click="reset">Reset</Button>`.
- `timeline-segmented.vue:190,197` Advance phase / Reset → same.
- `virtual-section.vue:84-91` Jump → `<Button variant="outline" size="sm" data-testid="scroll-to-target" @click="scrollToTarget">Jump to {{ jumpTargetId }}</Button>` (the `data-testid` threads through as a native attr fall-through; the π/spec keys on it).

Clean break — every raw `<button>` DELETED, no dual control. The glass `<Button variant="outline">` carries the warm-cream glass register, the four-state contract (hover/active/disabled/focus), the press squish — the real glass affordance the platform ships. `variant="outline"` is the calm secondary register matching the original `border bg-background` weight (not a loud primary); `size="sm"` matches the `px-3 py-1.5 text-small` compact footprint.

## 4. The gate — born-RED→GREEN

Extend `proof:storybook-meta` M9B in place (NO new gate — the M9B ratchet IS the lock):

- **The drain.** Each re-threaded file is REMOVED from `M9B_BASELINE` (`scripts/proof-storybook-meta.mjs:326-347`) in lockstep with its re-thread (the 4 data lines deleted). Because the file no longer matches `/<button\b/` (the raw button is gone, only `<Button>` remains), `detectRawButton` finds it neither in the census nor the regression set — the ratchet stays GREEN; if a file were dropped from the baseline but STILL carried a raw `<button>`, it would REGRESS-RED (the lockstep, the anti-stale-grandfather floor).
- **A new positive clause `m9b-data-band-drained`.** Assert the 4 data-band paths are ABSENT from `M9B_BASELINE` AND each composes `<Button` AND carries no surviving raw `<button>`. Born-RED on HEAD (the 4 are IN the baseline + carry raw buttons); GREEN at the build.
- **Self-test bite.** The existing M9b ratchet self-test (`:516-529`) proves a NEW off-baseline raw `<button>` REDS while an allowlisted control pane stays GREEN — KEEP it. ADD a bite: a synthetic data file dropped from the baseline but STILL carrying a raw `<button>` MUST red `m9b-data-band-drained` (the lockstep — you cannot remove a baseline row without removing the raw button).

Born-RED on the current tree (the 4 baseline rows present + the raw buttons live); GREEN at the build (rows deleted + buttons folded onto `<Button>`).

## 5. Paint verification

The BC anti-disease law: **no source-green close.** `tests-visual/storybook-meta.spec.ts` (or the `proof:ba-gestalt` `glass-feedback` aggregate-surface verdict — the glass-variant button rows map to the `glass-feedback` glass-variant census row in the BD-grown roster, BD.W-GESTALT-ROSTER-GROW; the data-band glass-control demo SFCs are enrolled in its BD freshness record's `surface-paths`) on `:5199`, BOTH modes × desktop+mobile:
- the load-more/jump/advance/reset controls present as warm-cream glass `<Button variant="outline">` — the four-state register (hover lift, press squish, focus ring) reads, not a flat `bg-background` raw button;
- the `data-testid` (scroll-to-target) threads through (the spec selector resolves);
- the controls still fire their handlers (advance/reset/scroll/loadMore) — behavior un-regressed.
The captured DELTA is the binding proof. The `proof:ba-gestalt` `glass-feedback` aggregate-surface verdict on the fresh capture (G7 auto-revokes the drifted demo-SFC surface-hash).

## 6. Fences + risks

- **MUST NOT** touch the allowlisted dock-band control affordances (dock-search collapsed-pill trigger, dock/overview, dock/layers control panes) — those are bespoke dock affordances correctly KEPT (the M9B_ALLOWLIST). This wave touches ONLY the 4 data-band baseline residuals.
- **MUST NOT** drop an `M9B_BASELINE` row without deleting its raw `<button>` (the lockstep) — the new self-test bite reds that.
- **MUST NOT** change the control behavior — the `@click` handlers (advance/reset/scrollToTarget/reset+loadMore) and the `data-testid`s thread through `<Button>` unchanged (native attr fall-through).
- **`variant="outline"` not a loud primary** — the original `border bg-background` is a calm secondary control; the glass `<Button variant="outline">` matches that register (an "Advance phase"/"Reset" control is not a hero CTA).
- **Coordinate with BD.W-DATA-BAND-GLASS / BD.W-DATA-BAND-HEADINGS** — those re-thread the card plates + section headers in the SAME 4 files; sequence so the `<Button>` re-thread, the ShowcaseFrame card fold, and the StorySection header fold land coherently (they touch disjoint markup — the control `<button>` vs the card `<div>` vs the `<p>` header).
- Zero `src/` paint — `<Button>` is a shipped library component consumed; the M9B baseline drain is a `scripts/` edit (the lockstep).
