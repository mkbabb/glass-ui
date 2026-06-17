# BA.W-SUFFUSE2 — DELTA (the per-category color identity spread)

**Wave**: BA.W-SUFFUSE2 — category color identity (eyebrow + accent-rail + IconChip pop) + the display-ladder grade + the motion violet
**Branch**: tranche/BA (Batch 6)
**Status**: operative-PASS (source `proof:suffuse2` 7/7 + the π `tests-visual/suffuse2.spec.ts` 18/18 both projects, both modes; `proof:suffuse` 17/17 + `proof:hierarchy` 6/6 hold; typecheck + build green)
**Freshness**: captured POST-W-DARK-MATERIAL (Batch 1, the dark `--section-color-N` arms) + POST-W-STAGE (Batch 6, the per-category backdrops + the `StoryPage` h1-rung literal diff) + POST-W-ICON-CHIP (Batch 5, the `<IconChip>` vehicle). The render is fresh — the eyebrow/rail/chip read over the real W-STAGE substrate in the W-DARK-MATERIAL register.

**Surface paths + hash** (sha256-16, the three π-probed representatives + the gate/spec):

| surface | sha256-16 |
|---|---|
| `demo/stories/forms/checks.vue` | `fcddc55b318d8a4e` |
| `demo/stories/containers/accordion.vue` | `113f36c8e30a28d3` |
| `demo/stories/data/table.vue` | `77cd00d5ea7896a3` |
| `tests-visual/suffuse2.spec.ts` | `6aa53ac733f97a24` |
| `scripts/proof-suffuse2.mjs` | `630f50ccc878e9bf` |

Tree base: HEAD `111a5208`.

## The defect the continuation closed (the source-green / π-RED gap)

The predecessor LANDED the per-category wiring on all 30 enrolled pages (the `<IconChip :section>` + the `.section-label--tinted` eyebrow + the `border-l-[3px]` rail) and the source arm `proof:suffuse2` went 7/7. But the BINDING π readback was RED on the three π-probed categories (`/forms/checks`, `/containers/accordion`, `/data/table`) in BOTH modes × BOTH projects — the exact AZ/P-1 source-green/visually-broken gap the wave's gestalt bar exists to catch. Two distinct mechanisms:

1. **The accent override never reached the eyebrow/rail (the RENDER defect).** Every enrolled page set `--section-label-accent: var(--section-color-N)` via `:style` on `<StoryPage>`. But `StoryPage.vue`'s ROOT is `<TooltipProvider>` — a renderless reka-ui provider that emits NO DOM element — so the fall-through `$attrs` style landed on nothing and was dropped. The `.section-label--tinted` eyebrow fell back to its CSS default `--section-color-7` (it read 317° rose on EVERY category, not the mapped stop), and the rail's `color-mix(…, var(--section-label-accent) …)` resolved an undefined custom property → invalid → fell to the default border. The chip glyph was the ONLY correct site (the `<IconChip :section="N">` numeric prop resolves `--section-color-N` directly, cascade-independent).

   **Fix (the only edit to the story bodies):** move the `--section-label-accent: var(--section-color-N)` declaration OFF `<StoryPage>` and ONTO the story's own `<header class="…border-l-[3px]…">` — the real DOM ancestor of the slotted eyebrow AND the rail element itself. Applied to all 27 enrolled pages that carried the dropped pattern (the predecessor had already moved 3; the continuation moved the rest for gestalt parity, since the π only probes 3 routes but the spec + gestalt require the identity to actually render on every enrolled page). A clean per-file transform: collapse the `<StoryPage>` opening tag to bare `<StoryPage>`, prepend `'--section-label-accent': …` to the header's existing `:style` `borderColor` object.

2. **The π's own rail measurement was wrong (the MEASUREMENT defect — `tests-visual/suffuse2.spec.ts` is this wave's created artifact).** Two bugs in `readThreeSite` / `parseColor` made the rail read a constant 56°/95° regardless of category:
   - The rail selector `article header.border-l-[3px], article > header` matched `StoryPage`'s CHROME header (`<header class="flex flex-col gap-2">`, `border-left-width: 0`, the warm-ink default border) FIRST — it is earlier in document order, so the comma-list `querySelector` returned it over the story's actual `border-l-[3px]` rail header. Scoped the selector to `article header.border-l-[3px]` ONLY.
   - `parseColor` did not handle the `color(srgb r g b / a)` serialization Chrome emits for a `color-mix(in srgb …)` (the rail's translucent accent). Added a `color(srgb …)` branch (0..1 → 0..255).

   Neither change weakens the gate — they make the π measure the rail that actually paints. The live probe confirmed the story rail header DOES resolve the slate (`color(srgb 0.303 0.393 0.457 / 0.55)` ≈ 240°), the chrome header is the imposter.

## π readback — the binding visual truth (`tests-visual/suffuse2.spec.ts`, 18/18 both projects)

Before → after: **6/18 → 18/18** (the 12 prior failures were all S1-S3 the three-site coherence on forms/containers/data × light/dark × the two projects).

- **S1 forms (`/forms/checks`, stop 3 teal ≈ 220°)** — eyebrow + chip glyph + rail all resolve within 25° of `--section-color-3`. Capture `W-SUFFUSE2-forms-{light,dark}.png`: the teal IconChip + teal "FORMS · SELECTION" eyebrow + teal `border-l-[3px]` rail read as ONE coherent event; the checkboxes/radios/switches stay ink, body copy muted. PASS both modes.
- **S2 containers (`/containers/accordion`, stop 2 indigo ≈ 265°)** — same three-site coherence on the mapped indigo. Capture `W-SUFFUSE2-containers-{light,dark}.png`. PASS both modes.
- **S3 data (`/data/table`, stop 9 slate ≈ 240°)** — same three-site coherence on the ledger-slate. Capture `W-SUFFUSE2-data-{light,dark}.png`: the slate identity is distinct from the FUNCTIONAL status Badges (Paid green / Pending amber / Overdue red — the tone event, which does NOT compete with the section identity); values stay ink. PASS both modes.
- **S4 the rung grade** — the content chrome `<h1>` (`text-title` 32.9px, the W-STAGE-applied literal diff) resolves strictly above the section `<h2>` (`text-subheading` 20.4px) by > 4px. PASS.
- **S5 the motion band (`/motion/countup`)** — `--motion-accent` resolves violet (hue 290-350°), no warm-red; a painted `bg-[var(--motion-accent)]` marker reads the SAME violet. PASS both modes.

Resolved captures (this dir): `W-SUFFUSE2-forms-light.png`, `W-SUFFUSE2-forms-dark.png`, `W-SUFFUSE2-containers-light.png`, `W-SUFFUSE2-containers-dark.png`, `W-SUFFUSE2-data-light.png`, `W-SUFFUSE2-data-dark.png`.

## Source arm + the proof:suffuse LEDGER (unchanged by the continuation — predecessor-landed, re-confirmed green)

- `proof:suffuse2` 7/7: W1 per-category three-site identity (30 pages, the MAP recorded as gate facts: forms→3, containers→2, data→9, display→5, navigation→12), W1 no-inline-paste, W2 h1-rung `text-title`, W3 motion-accent + no-warm-red + demo-local.
- `proof:suffuse` 17/17: d1 body-ink-untinted, d2 chip≤glyph structural (the `<IconChip>` owns the ratio), d3 ≤1 event-family per surface over the 40-surface LEDGER. The newly-popped surfaces are enrolled — the under-enrollment guard holds, no vacuous d3 pass.
- `proof:hierarchy` 6/6 + `proof:gate-script-parity` PASS (0 new dangling, 0 ghost cmds).

## Scope coverage (per the spec)

- Scopes 1/2 (the four under-spent bands' three-site identity) + scope 5 (the h1-rung, applied by W-STAGE) + scope 3 (the motion violet) + scope 6/7 (the proof:suffuse LEDGER + the event-family escalation) were predecessor-landed; the continuation's net work was the RENDER fix (the accent-on-header move) + the π measurement fix that BINDS them. The MODEL compositions (hero/math-paper/auth-shell/empty-states/settings) + the monochrome-legitimate surfaces (icons GRID, typography ladder, curve TABLE) stay untouched (the proportion fence).
- The ppmycota motion-violet stays demo-local (`--motion-accent` at `demo/demo.css`, the W3 demo-local witness green — no `--motion-accent` value in `src/styles/`).

## Gestalt verdict (for W-REFLECT2's `proof:ba-gestalt` roster — do NOT edit the roster here)

The storybook now reads as a colored SYSTEM within proportion — **icons=rose, forms=teal, containers=indigo, data=slate, display=amber, navigation=indigo, motion=violet** — each its ONE deliberate event-family (eyebrow + matching rail + matching chip glyph on the SAME `--section-color-N`), over the real W-STAGE substrate in both modes. Body ink is clean on every enrolled page; the FUNCTIONAL tone events (the data status Badges, the destructive-red error) read as a distinct register that does NOT compete with the section identity. No page reads as a rainbow (the d3 ≤1-event-family proportion holds at render). The content `<h1>` now dominates its sections (the cliff graded). VERDICT: **complete** (the per-mechanism greens AND the gestalt render align — the source-green/visually-broken gap is closed, not papered). W-REFLECT2 re-walks the enrolled band pages to re-confirm.
