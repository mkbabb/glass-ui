# AW.W24 - Glass-card perfection (shadcn-2025 idiom + hover-elevation + dormant specular)

## State

**Name**: W24 - Glass-card perfection (shadcn-2025 idiom + hover-elevation + dormant specular)
**Opens after**: W12 (glass-panel/backdrop staging) + W23 (glass-material edge-light, if the reconciler keeps a W22/W23 material band ahead of cards)
**Agents**: 1 serial
**Hard gate** (`proof:glass-card-tiers`): the five card tiers render perceptibly distinct when staged over a busy backdrop (a computed-style + sampled-pixel differential probe over the W12 Aurora/PaperBackdrop story — the wash→overlay rungs separate by alpha + blur + the per-rung under-shadow); a single `--card-spacing` override re-resolves CardHeader/Content/Footer padding + the inter-section gap from one knob; the `@container/card-header` reflows to a two-column grid at a width probe when a `CardAction` slot is present; `<Card hover>` shows a computed `translate`+`box-shadow` delta on hover while the static `<Card>` stays flat; the resting card edge clears a non-text legibility floor (≥3:1 ring-vs-page) over flat `--background`; PRM pins the specular seam centred.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if the Card atom reaches shadcn-2025 idiom parity AND the tiers read distinctly on a backdrop: the three subcomponents drive their padding + rhythm from one `--card-spacing` token (not three hardcoded `p-6` + `gap-y-1.5`), a `CardAction` slot reflows the header to a top-right control grid via container query, a `data-size="sm"` rung tightens the spacing, the opt-in `<Card hover>` register rises on hover (reusing the cartoon longhand-translate mechanism, not a fork), the dormant `--mouse-x/--mouse-y` specular seam tracks the pointer behind that opt-in, the resting card separates from a flat cream page via the under-shadow + a legible opaque ring (the content-layer cream-read fix), and the five glass tiers render visibly distinct staged over W12's busy backdrop. Every change extends an existing mechanism (the cartoon `translate`+`box-shadow` transition, the `glass-specular-track` seam, the shadcn `--card-spacing`/`CardAction` idiom, the `[data-over-content]` under-shadow); no new primitive, no new card variant, no fork of the glass tier ladder.

## 3. Scope

1. `src/components/ui/card/Card.vue` + the three subcomponents — mint a `--card-spacing` token on the Card root (default `--spacing(6)` so the current `p-6`/`gap-y-1.5` rhythm is preserved at zero visual delta) and drive `CardHeader`/`CardContent`/`CardFooter` padding + the inter-section gap from it: replace the three hardcoded `p-6` (`CardContent.vue:11`, `CardFooter.vue:11`, `CardHeader.vue:52`) and the `gap-y-1.5` (`CardHeader.vue:52`) with `px-(--card-spacing)`/`py-(--card-spacing)`/`gap-(--card-spacing)` references, so one knob retunes all three subcomponents.
2. `src/components/ui/card/Card.vue` — add a `data-size="sm"` rung that resolves `--card-spacing` one step tighter (`data-[size=sm]:[--card-spacing:--spacing(4)]`), mirroring shadcn's `data-size` card knob. The default (no `data-size`) keeps the `--spacing(6)` rhythm.
3. `src/components/ui/card/` — add a `CardAction` slot subcomponent (`data-slot="card-action"`) and the `@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto]` reflow on `CardHeader` (the existing `CardHeader.vue` already names a grid-collapse on description; extend it to the action column). The action sits top-right; the header reflows to a two-column grid only when the slot is present (used by the demo card-with-menu + the speedtest metric-card header — ≥2 consumers). `CardAction` is co-exported from `card/index.ts`.
4. `src/components/ui/card/Card.vue` — add an opt-in `hover?: boolean` (or `interactive`) prop that gives the resting `surface="glass"` card a hover-elevation: a token-gated `translate: var(--lift-sm)` + one shadow rung up, reusing the `cards.css` cartoon-surface longhand-`translate`+`box-shadow` transition on `--spring-bouncy`/`--ease-apple` (do NOT fork — compose the same mechanism keyed off the `hover` opt-in). Static `<Card>` (no `hover`) stays flat: the `.glass-card` utility "no hover lift" contract (`glass.css:172-174`) is preserved; the COMPONENT opts in.
5. `src/components/ui/card/Card.vue` — wire the dormant specular seam: the root already carries `glass-specular-track` (`Card.vue:77`) and a code comment about `--mouse-x/--mouse-y` (`Card.vue:74`) but ships NO pointer write, so the AV.W15 catch-light is centred-static on every card. Add the ≤6-LOC `pointermove` listener that writes `--mouse-x`/`--mouse-y` (the same seam `DockIconButton` uses), gated behind the `hover`/`interactive` opt-in so static cards stay inert. Reduced-motion already pins it centred (`glass-specular-track.css` PRM bracket) — no extra PRM wiring.
6. `src/components/ui/card/Card.vue` (or `cards.css`) — the content-layer cream-read fix: a card is a content-layer object whose separation cue on a FLAT page must be the under-shadow + a legible opaque ring, NOT the cream-matching translucent border (which is invisible by construction — `--card === --background === --neutral-0`). Lean on `--glass-under-shadow-default` (already wired, `glass.css:81`) as the primary lift and lift the resting edge to a `ring-1`-class opaque hairline (shadcn's `ring-foreground/10` ≈ 10% on an opaque edge, not the cream-matching glass border) so the resting card reads as an enclosed object on cream. This is the card-specific complement to W13's input-border lift — same precept, different element, disjoint file bounds.
7. `demo/stories/primitives/card.vue` — extend the card story to exercise the four new affordances: an interactive `<Card hover>` row (proves §4/§5), a `CardAction`-bearing header (proves §3), a `data-size="sm"` card (proves §2), and the five-tier ladder staged over the W12 Aurora/PaperBackdrop (proves the `proof:glass-card-tiers` distinct-on-backdrop gate). Consume the new slot/prop; no raw-HTML re-rolls.

## 3a. Triumvirate Dispatch

Trigger a triumvirate when:

- the `--card-spacing` retune requires editing `tokens.css §radius`/`theme.css` rather than a Card-root-local `[--card-spacing:…]` declaration — the file bounds expand into the token source and the "one knob on the component root, no new global token" precept is implicated;
- the `CardAction` container-query reflow cannot be expressed without restructuring the existing `CardHeader.vue` grid-collapse (`CardHeader.vue:50-102`) — the header's existing title-shrink + description-collapse grammar regresses, a non-local-recoverable cascade failure;
- a third iteration on the `proof:glass-card-tiers` distinct-on-backdrop probe fails to separate the wash→overlay rungs over the W12 backdrop (the alpha+blur ladder is NOT the obstacle; the backdrop's spatial frequency is) — escalate to re-coordinate the W12 backdrop staging rather than re-tune the tier alphas;
- the resting-card cream-read ring regresses the `.glass-card` `:has(:focus-visible)` focus-elevation order (`glass.css:197`) — the opaque ring must not shadow the focus ring; escalate rather than patch the cascade deeper.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/ui/card/Card.vue` | modify |
| `src/components/ui/card/CardHeader.vue` | modify-carve (the `gap-y-1.5 p-6` → `--card-spacing` refs + the `CardAction` grid-reflow only) |
| `src/components/ui/card/CardContent.vue` | modify-carve (the `p-6` → `--card-spacing` ref only) |
| `src/components/ui/card/CardFooter.vue` | modify-carve (the `p-6` → `--card-spacing` ref only) |
| `src/components/ui/card/CardAction.vue` | create |
| `src/components/ui/card/index.ts` | modify (export `CardAction`) |
| `src/styles/cards.css` | modify-carve (the `<Card hover>` glass-register hover-lift + the resting cream-read ring/under-shadow only — the `cartoon-surface` @utility recipe stays untouched) |
| `demo/stories/primitives/card.vue` | modify |

Do NOT touch: `src/styles/glass.css` (the 5-rung tier ladder + `.input-pill` block — W12 owns the tier tokens, W13 owns the input border; W24 reads the tiers, does not re-tune them), `src/styles/tokens.css` (no new global token — `--card-spacing` is a Card-root-local declaration; a new global token is a triumvirate trigger, §3a), the `cartoon-surface` @utility recipe in `cards.css` (the cartoon register is its own identity — W24 composes the SAME translate+box-shadow MECHANISM on the glass register, it does not edit the cartoon recipe), `src/styles/glass-specular-track.css` (the specular `::before` + PRM bracket stay; W24 only adds the consumer-side pointer write).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W24 owns the `card/` package dir + the card-specific rungs of `cards.css`. **`demo/stories/primitives/card.vue` is a SHARED 3-wave write** — W12 (stages the high-frequency backdrop so the rungs read), W20 (re-rolls the raw-`<button>` tier-force controls onto `<ToggleGroup>`), and W24 (extends the story with the card-affordance demos). It is NOT W24-exclusive: W24 opens AFTER W12 and W20, so the writes SERIALIZE (W24 EXTENDS the post-W12/W20 story state, it does not race them); W24 adds `demo/stories/primitives/card.vue` to its Depends-on (W12 + W20). It shares NO `modify` path with W12 on the `src/` surfaces (W12 owns `GlassPanel.vue` + `tokens.css §8` + `substrates/glass-panel.vue`), W13 (W13 owns `button/index.ts` + `glass.css .input-pill` + `Slider.vue` + the goo-blob resolver + `primitives/button.vue` — disjoint files; the card cream-read fix lands in `cards.css`, NOT `glass.css`), or W25 (W25 owns the interactive-primitive SFCs + their CVA strings + `utilities.css` press recipe — the card is a static surface, not in W25's atom set). The `cards.css` carve is the card-register hover-lift + cream-read ring only; no other wave writes `cards.css`. The `card.vue` story is the ONLY shared path, and it is sequenced (not concurrent) per the W12→W20→W24 open order.

## 4b. Worktree Plan

Single agent unit — no sibling worktree required; the unit writes on clean main.

## 5. Agent Units

### AW.W24.a Card idiom + hover-elevation + specular seam + cream-read

- Goal: the Card atom reaches shadcn-2025 idiom parity, the resting glass card rises on hover and tracks the pointer specular behind an opt-in, the resting card reads on flat cream via under-shadow + an opaque ring, and the five tiers render distinct over the W12 backdrop.
- Mechanism: mint a Card-root-local `--card-spacing` (default `--spacing(6)`, zero delta) driving the three subcomponents' padding + gap; add `data-size="sm"`; add a `CardAction` slot + `@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto]` reflow; add a `hover` opt-in composing the cartoon `translate`+`box-shadow` mechanism on the glass register; add the ≤6-LOC `pointermove` write of `--mouse-x/--mouse-y` behind the opt-in; lift the resting edge to an opaque `ring-1`-class hairline + lean on `--glass-under-shadow-default` for the cream-read; extend `primitives/card.vue` to exercise all four affordances + the ladder over the W12 backdrop.
- Files: `src/components/ui/card/{Card,CardHeader,CardContent,CardFooter,CardAction}.vue`, `src/components/ui/card/index.ts`, `src/styles/cards.css` (card-register carve), `demo/stories/primitives/card.vue`.
- Sub-gate: a `--card-spacing` override on a mounted Card re-resolves all three subcomponents' computed padding from one value; a width probe shows the header reflows to a two-column grid when `CardAction` is present and a single column when absent; a computed-style probe shows `<Card hover>` gains a non-zero `translate` + a heavier `box-shadow` on hover while static `<Card>` is unchanged; `--mouse-x` updates on pointermove over an interactive card and stays centred under PRM; a sampled-pixel/computed differential over the W12-backdrop story shows the five tiers separate; `vue-tsc --noEmit` green.

## 6. Hard Gate

Gate id: `proof:glass-card-tiers`. Each condition is born-RED on HEAD (the verified HEAD state is cited).

1. **Tiers distinct on a backdrop.** A Playwright/Vitest probe mounts the five card tiers over the W12 Aurora/PaperBackdrop story and asserts the wash→overlay rungs separate by a stated margin on (alpha ∨ blur ∨ per-rung under-shadow) — a sampled-pixel or computed-style differential across adjacent rungs. Pre-fix the tiers render as near-identical pale rectangles over flat cream (the lane-2 + lane-7 screenshots); staged over the backdrop with the cream-read ring, adjacent rungs clear the margin. (Born-RED: the story has no backdrop staging at HEAD.)
2. **One-knob spacing.** A computed-style probe sets `--card-spacing` on a mounted Card and asserts CardHeader, CardContent, and CardFooter all re-resolve their padding (and the header its gap) to the override. Pre-fix the override does nothing — the three subcomponents hardcode `p-6` (`CardContent.vue:11`, `CardFooter.vue:11`, `CardHeader.vue:52`) and `gap-y-1.5` (`CardHeader.vue:52`). (Born-RED: no `--card-spacing` reference at HEAD.)
3. **CardAction header reflow.** A width probe asserts a `CardHeader` containing a `CardAction` slot resolves a two-column `grid-template-columns: [1fr_auto]` (the action pinned top-right), and a `CardHeader` WITHOUT the slot stays single-column. (Born-RED: no `CardAction` slot + no `has-data-[slot=card-action]` reflow at HEAD.)
4. **Hover-elevation opt-in.** A computed-style probe asserts `<Card hover>` gains a non-zero `translate` AND a heavier `box-shadow` rung on `:hover` versus rest, while a static `<Card>` shows no `translate`/`box-shadow` delta on `:hover`. (Born-RED: only the `cartoon` register lifts; the plain glass card is inert on hover at HEAD, `cards.css:33-48`.)
5. **Specular seam tracks.** A `pointermove` probe over an interactive `<Card hover>` asserts `--mouse-x` (and `--mouse-y`) updates from its centred default, and under forced `prefers-reduced-motion: reduce` the seam stays centred. (Born-RED: `Card.vue:74` comments the seam but ships no pointer write — the catch-light is centred-static at HEAD.)
6. **Resting cream-read floor.** A computed-contrast probe over a resting `<Card>` on flat `--background` (light mode) asserts the card edge ring vs page clears a non-text contrast floor (≥3:1, WCAG 1.4.11), and the `:has(:focus-visible)` focus-elevation order is unchanged (specificity probe). (Born-RED: the resting border is the 8-12%α cream-matching glass border at HEAD, sub-3:1.)
7. **Typecheck green.** `npm run typecheck` (`vue-tsc --noEmit`) passes with the `CardAction` export + the `hover` prop.

## 7. Format And Lint Cadence

Docs-only wave authoring (this file). At wave EXECUTION (the implementation pass the orchestrator dispatches): `npm run typecheck` after the card-package edits and before close; `git diff --check` on the staged hunks. The repo has no separate prettier/eslint gate in the proof matrix — the typecheck + the `proof:glass-card-tiers` runtime gate are the binding checks. For THIS docs-authoring pass: `git diff --check` on the two wave files.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W24-glass-card-tiers.md` — the pre/post tier-differential table (the five rungs' sampled values over the backdrop), the `--card-spacing` one-knob re-resolution proof, the CardAction reflow width-probe transcript, the `<Card hover>` translate/box-shadow rest-vs-hover pair, the `--mouse-x` pointermove + PRM transcript, and the resting-card ring-vs-page contrast ratio.
- Playwright screenshots at 1440×900 under `docs/tranches/AW/audit/screens/`: the five tiers over the W12 backdrop, the `CardAction` header, a `<Card hover>` mid-hover, the resting card on flat cream.
- The green `proof:glass-card-tiers` run-id cited in the wave Status at close.

## 9. Commit Plan

- `feat(card): --card-spacing one-knob padding + data-size rung` — the subcomponent padding/gap carve; body cites the three hardcoded `p-6` + `gap-y-1.5` retired onto one token.
- `feat(card): CardAction slot + @container/card-header reflow` — the new subcomponent + the header grid-reflow; body cites the ≥2 consumers (demo card-menu + speedtest metric-card header).
- `feat(card): opt-in glass-register hover-elevation + live specular seam` — the `hover` prop composing the cartoon translate+box-shadow mechanism + the `--mouse-x/--mouse-y` pointer write; body cites the dormant `Card.vue:74` seam.
- `fix(card): resting card reads on flat cream (under-shadow + opaque ring)` — the `cards.css` cream-read carve; body cites the content-layer split and the ≥3:1 floor.
- `test(gate): proof:glass-card-tiers` — the runtime gate + the audit doc + screenshots.
- `docs(aw): W24 status → complete with the green run-id` — the wave-close status commit.

## 10. Dependencies

- **Depends on**: W12 (the busy-backdrop staging the tier-distinctness gate probes over; W24's story stages over W12's shipped Aurora/PaperBackdrop) + the glass-material edge-light band ahead of it (if the reconciler keeps a material wave at W22/W23, the card's floating-register edge composes from it — but W24 does not WRITE the material; it reads it).
- **Blocks**: nothing — the card is a leaf surface. The W27 close registers `proof:glass-card-tiers` in the gate matrix.

## 11. Archaeology

Not a revisit. The card material spine (specular track, under-shadow floor, edge-light rim, no-glass-on-glass discipline) landed at AV.W15 and is reference-quality; W24 perfects the card's IDIOM + INTERACTION (shadcn-2025 spacing/action/size, hover-elevation, the dormant pointer seam, the content-layer cream-read), not the material. The one stale claim from the research band — a double-nested `light-dark(light-dark())` on `--glass-bg-*` — does NOT exist at HEAD (`--card` carries one `light-dark()`; glass-bg is a single `color-mix(--card …)`); W24 does not touch those tokens and does not re-seed the stale claim.
