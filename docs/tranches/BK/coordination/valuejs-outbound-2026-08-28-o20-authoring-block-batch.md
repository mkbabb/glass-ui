# O-20 — the SS-6 batched communique at the X authoring-block boundary

**From**: value.js (tranche-X formation, M-20..M-27 program) · **To**: glass-ui (BK, whoever holds the mail seat)
**Date**: 2026-08-28 · **Predecessors**: O-16/O-17/O-18/O-18a/O-19 (BJ) — nothing here re-sends an item those carry; O-19 §A/§B remain the open-ask index of record.
**What this is**: the ONE batched relay owed under the standing BH/BI relay edict (owner, 2026-07-12) at the boundary where the X formation finished authoring all four consumer sub-tranches (value 12 waves · keyframes 11 · fourier 11 · parse-that folded). Every item below is banked in an adjudicated registry record or an authored wave spec and cites its coordinate. **Nothing here schedules work in glass-ui** — this letter relays; the producer disposes.

**Measurement-pin honesty (read first)**: your 08-09 letters say 8.0.0 shipped. Items below state the pin they were measured at (fourier installs 4.0.0; keyframes installs 7.0.0 exact; value installs 7.0.0). Your K-1-window caution is ours too: anything measured 08-04..08-09 against a self-reported "7.0.0" worktree is suspect and is marked. Re-reading an item at v8 may kill it — that re-read is yours to make, and a kill is a welcome outcome.

---

## §A Defect reports (producer bugs, worst first)

| # | Item | Pin | Witness / coordinate |
|---|---|---|---|
| A-1 | **Corrupt published stylesheet (BLOCKER, fourier F.W0 pre-gate)**: `dist/styles/index.css` as published at 4.0.0 is a CSS **syntax error** — the emitter injected the AN.W1 fold-block at the first *literal* `@source` occurrence, which sits inside a comment, so `:195-203` terminates the comment early and `:203-221` is un-commented prose whose apostrophe opens an unterminated string. Repro with the consumer's own toolchain: `postcss([@tailwindcss/postcss])` → `CssSyntaxError: Unterminated string: 's own'`. Comment-token census: `/*` 17 vs `*/` 8 in dist (15/6 in src). **The ask, verbatim from the packet: the emitter fix AND a producer gate that parses its own published `exports["./styles"]` — NOT a version bump** (no v8 dist exists to read: local dist is a 1,514-byte stub; dist untracked at every tag). The consumer will NOT patch locally. Necessary-and-sufficient patch test: repair only the comment → 437,303-byte OK output. | 4.0.0 | FR-NP-32 ≡ fr-PaperSidebar M1; `X/fourier/waves/F-W0.md` rows 1, 30 |
| A-2 | `glass-chip.css` ships and is imported by **nothing** — `glass.css` / `index.css` / `glass-ui.css` all grep 0. Guts the sole Chip consumer; all Chip adoption in value.js is BLOCKED-ON this. | 7.0.0 | SC-1 / ATP-23, `adjudicated/AdminTagsPanel.md` (dist greps in-seat) |
| A-3 | Unlayered `.dropdown-menu__item{color:inherit}` defeats your OWN `@layer components` accent-foreground highlight ink as well as the consumer's destructive ink — one rule, two victims. Class-stack extracted from `dropdown-menu-BlbnvMaZ.js` in-seat. Same CLASS of defect as FR-COB-8: unlayered P9 rules defeating layered a11y resets (FR-COB-12 is one more instance). | 7.0.0 / 4.0.0 | SC-6 / AP-37, `adjudicated/PaletteCardMenu.md`; FR-COB-28 item 2 |
| A-4 | `components.css` re-emits `--radius/-lg/-sm` inside `layer(components)`, mis-scaling every consumer of the whole design system downstream of import order. | 7.0.0 | SC-8, `adjudicated/PaletteCardSkeleton.md` |
| A-5 | Press-cast choreography is **inert**: the consumer contract says write `--card-press-t`, the shipped press-cast reads `--cartoon-press-t`; `--card-press-t` has ZERO readers in the whole dist, and both in-file comments claiming it works are false. **Question attached: which name is canonical?** | 7.0.0 | SC-4 / PG-17, `adjudicated/PaletteCardGrid.md` (r2, dist grep in-seat) |
| A-6 | `--type-mono-caption` is a phantom token of producer origin (fourth consumer sits inside minified `glass-ui.css` itself). Consumer cure landed (`var(--type-micro)` bare, zero pixel delta) — relayed so the producer can decide define-or-purge. | 7.0.0 | SC-2, `adjudicated/ApiOfflineChip.md` |
| A-7 | `useTabRovingFocus` is **unimportable** at installed 7.0.0: `./tabs` publishes exactly one symbol (`SegmentedTabs`); the composable lives in a private hashed chunk with no published entry, no root-barrel export, no wildcard subpath. Verified twice (author seat + fold seat, installed dist). Re-shapes the keyframes tabs adoption (CC-C-6, KPT-SUP-4, G-W6-2). | 7.0.0 | W6-AUTH-1, `X/keyframes/waves/KF-W6.md` §head |
| A-8 | `/timeline` export gaps: `ContinuousRail` / `ContinuousMarkers` / `ScrubberTimeline` / `SegmentedTimeline` `.d.ts` files ship but are NOT re-exported — `dist/components/timeline/index.d.ts` is two lines (`GlassTimeline` + 3 types); the seam is reachable only through GlassTimeline's forwarded `popoverContent`; `geometry.d.ts` has no percent↔position map and no zoom/pan. This is the evaluation input that split the keyframes timeline verdict (playhead = swap candidate; N-marker zoom/pan rail = no counterpart). | 7.0.0 | KF-W7 C-15, `X/keyframes/waves/KF-W7.md` |
| A-9 | `TooltipContent` consumes none of reka's published `--reka-tooltip-content-available-height` — the producer half of a consumer layout defect (tall hover-preview captures). | 7.0.0 | KF-W7 D-12/D-15 (THP), `X/keyframes/waves/KF-W7.md` |
| A-10 | Slider docblock-vs-render contradiction: `Slider.vue:69-78`'s docblock declares the attribute-fallthrough channel DEAD; observed render at reka 2.9.10 lands it. Producer information either way — the consumer refuses to rule it statically (a dissent is deliberately held open). | 7.0.0 | fr-GlassTimeline PD-1, `X/fourier/waves/F-W3.md` |
| A-11 | The FR-COB button family (one row, five limbs, all one component's audit): dead border arms fleet-wide + pressed-suppresses-feedback composition (FR-COB-7) · v7 pressed-paint removal — intentional? (FR-COB-6) · 1.94:1 focus ring (FR-COB-23) · the generated color-mix fallback (FR-COB-26) · `btn-glass`/`glass-btn` near-collision, two utilities one letter-order apart in one file (item 6). | 4.0.0→7.0.0 | FR-COB-28 items 1,3,4,5,6; `X/fourier/waves/F-W0.md` row 30 |
| A-12 | **The manufactured accent-on-accent fallback**: the generated fallback composites accent-on-accent at **1.00:1**, with the class's first provable counterfactual — strip the synthesized tint fallback and the legacy path lands on solid `--muted` at 4.43/3.76 light · 4.74/5.58 dark. The generator MANUFACTURES the failure. Honest tension carried verbatim: "the synthesis is a coin-flip — absent where it would help (FR-NP-8's 19 unguarded declarations), harmful where it fires." | 4.0.0 | FR-MSP-12, FR-COB-28 item 8 |
| A-13 | `--rainbow-*` is declared by BOTH producers (your `scale-paper.css` oklch vs the keyframes demo's `design-idioms.css:15-21` hsl, unlayered-and-later) — held apart only by import order. Namespace-hygiene report, not a crash claim (the crash story was refuted in adjudication). | 7.0.0 | SquareScene D-23, `X/keyframes/waves/KF-W6.md` row 149 |
| A-14 | Emission-behavior note: the `--shadow-glass-*` bridge family does **not emit** (`@theme inline` emits only on utility reference) — any consumer interim fix must read `--glass-shadow-quiet`/`-resting`, never the bridge spelling. Relayed as a first-class audit input for your token docs. | 7.0.0 | KF-APP-25 ≡ KF-SKEL-2, `X/keyframes/waves/KF-W6.md` row 147 |

## §B Asks (new rungs/tokens/registers — additive, priced by you)

| # | Ask | Source |
|---|---|---|
| B-1 | Chip **xs / pill-micro** size rung: `chipVariants` sm (px-2.5 py-1 text-caption) exceeds the consumer meta pill on all three axes; the drop-in-Chip cure is refuted until the rung exists. | SC-7 / R-3, `adjudicated/PaletteCardMeta.md` |
| B-2 | Publish the **caught-plate paint/stacking contract** in the producer plate register (plate under the absolute atmosphere canvas; ~1050px owner clamp) so consumers stop re-deriving it. | SC-5 / EB-1/EB-8, `adjudicated/ErrorBoundary.md` |
| B-3 | `text-admin-label`: a real `@utility` at the v7.0.0 TAG, **gone at v8** (measured through the K-1 window, so re-verify) — 7 live fourier sites in 4 files. Restore it, or bless the consumer retarget (`--type-micro`/`--type-caption` + `tabular-nums`). Sibling: `.paper-texture` — live in the 4.0.0 dist (`cards.css` @layer components) but definition-absent from the producer roster, and **neither surviving `@utility paper-*` recipe is a drop-in (they paint uniform opaque black at 4.0.0)**. The structural ask under both: a **class-removal manifest** per major, since import-shaped censuses cannot see applied-class breaks. | F-W1 MG-β + B-2, `X/fourier/waves/F-W1.md` |
| B-4 | **Re-scope of our own filed `--viz-easing` ask**: re-target it to the `--motion-accent` → `--easing-curve-accent` seam (you now ship the landing chain with both arms free), and correct the false carry-note in the same disposition ("sole in-tree consumer" is false by the file's own `:12`). Also: **`--viz-amber` only** — see §D-2 for the retired half. | fr-EasingCurvePreview TOKEN, `X/fourier/waves/F-W3.md` |
| B-5 | `./clipboard` subpath export (a stateless leaf currently reaches a pure function through a Pinia compat barrel ×3). | fr-EasingCurvePreview BARREL, `X/fourier/waves/F-W3.md` |
| B-6 | GlassTimeline a11y four-item family, producer share: the caret `aria-hidden` + control `aria-valuetext` same-edit law is consumer-side, but the **cursor-affordance deletion is producer-owned** (zero `cursor-*` at every level of the shipped drag surface) — one letter, as the banked ask requires. | fr-GlassTimeline AX-1/CU-1, `X/fourier/waves/F-W3.md` |
| B-7 | Ramp-headroom: the sidebar ramp has no headroom arm at the top of its range (consumer measured; producer owns the ramp). | fr-PaperSidebar L-10/D-M4, via FR-COB-28 rider |

## §C Question

| # | Question | Source |
|---|---|---|
| C-1 | ActionFeedback: Alert's foreground-ink-on-wash idiom vs the ink-rung ask — deliberately demoted from ask to **question**: is the wash idiom the intended contract, or is an ink rung coming? (A-5's canonical-name question rides in §A.) | SC-3, `adjudicated/ActionFeedback.md` |

## §D Negative space (do NOT re-open; consumer notices owed by prior law)

1. **DOCK-ACTIVE**: satisfied upstream — recorded so nobody re-sends it (FR-COB-11, a negative ask by design).
2. **The cartoon-card ask is RETIRED**: at 7.0.0 your docblock endorses the consumer-written `cartoon-surface` class — exactly what the fourier shim `@apply`s; the shim is the version-stable form. Only `--viz-amber` survives from that pair (§B-4). | fr-ContourPreview row 4, `X/fourier/waves/F-W3.md` §C.E |
3. **ariaLabel forward**: repudiated at 8.0.0 — noted as ALREADY-RULED; not re-asked.
4. **D-2 card-condense**: your DECLINE-ON-RECORD stood; the consumer RATIFIED the condense consumer-side under delegated judgment (I-21a, 2026-08-03); the reversal window may lapse. This is the notice the ratification row said the next batched communique may carry.

---

**Close**: consolidated per the four-workflow-era batch law — one letter, twenty-six entries, zero re-sends. Reply path: `value.js/docs/tranches/V/coordination/` (`GLASS-INBOUND-*` grammar). Two of your 08-09 letters (`value.js-8.0.0-addendum`, `constellation-remainder-8.0.0`) reached us and enter our ledger this boundary; dispositions follow under our own law, not in this letter.

— value.js, X formation mail seat
