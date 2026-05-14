# AB — Progress Log (reconstructed)

**Authoring note**: this log is reverse-engineered from the AB commit chain at O.W0 Lane A (2026-05-14). AB shipped without a live PROGRESS.md (the K-invariant-3 precept violation); each entry below is dated to the commit's author-date and cites the source commit hash. No fabricated decisions — every claim cites either a commit subject + body, a CHANGELOG entry, or a post-AB audit finding.

## 2026-05-12 22:42 EDT — AB.W1.T1 lands: `--chassis-max-block-size` (commit `69c59fa`)

First AB commit. Layout-tier guardrail token added at `src/styles/tokens.css` (+22 lines). Recipe subtracts consumer-owned `--dock-footer-space` (dock height + dock inset + card-edge inset) and `--page-padding-top` from the dynamic viewport, then keeps one further rem of breathing room so the card never butts the dock.

Speedtest wire claim: AB.W1.T2 consumes the token to repair B1 (card-too-tall occlusion) + B10 (mobile/desktop fit) + H3 (mobile-375 CLS 0.926 → ≤ 0.15) at the chassis level.

## 2026-05-12 22:42 EDT — Doc support for AB.W1.T1 (commit `13f4f87`)

CHANGELOG.md — "Unreleased — AB in-flight (target: v1.1.0 at AB.W4 close)" header established + `--chassis-max-block-size` entry. DESIGN.md — chassis token note added. Version stays at 1.0.5 per the single-1.1.0-at-W4-close discipline.

The CHANGELOG header is the only protocol artefact at execution time — a band-aid for the no-plan-folder gap. AB will keep accumulating under this header until W4 close rewrites it to "1.1.0 — 2026-05-13 — AB Living-UI canon ...".

## 2026-05-12 22:44 EDT — AB.W1.T5 lands: `.dock-label` @utility (commit `a04f05f`)

`.dock-label` @utility shipped in `src/styles/typography.css` (+23 lines). Composes the audacious-dock `--dock-label-size` knob (14-15px narrow / `--type-subheading` desktop) at `font-weight: 500` (medium rung; NOT bold).

Rationale (from commit body): consumers were applying `.text-heading` to dock-pill text labels (Start, Next, Submit, Done, New Test) — but `.text-heading` is the heading register at `font-weight: 700`, which reads as literal bold inside a dock pill. The user mandate ("the Start text should not be bold") generalized to every bottom-dock text label. `.dock-label` is the explicit canonical register so `.text-heading` keeps its semantic weight contract.

CHANGELOG (+25 lines) + DESIGN.md (+10 lines) updated. The Dock §Utilities entry that previously described an aspirational `.dock-label` now points at the typography @utility that landed.

Speedtest wire claim: AB.W1.T5 swaps `text-heading` → `dock-label` across every DockTabButton text span (B8).

**End of AB.W1.** Two tasks landed (T1 + T5; intermediate T2/T3/T4 are consumer-side at speedtest). No green-gate run at the wave close; no proof doc authored at the wave.

## 2026-05-12 23:33:19 EDT — AB.W2 opens: HoverPopover v-model:open (commit `215ad06`)

`<HoverPopover>` extended with two-way bindable `open` state (`src/components/custom/hover-popover/HoverPopover.vue` +39/-2). The popover already managed `isOpen` ref internally for the dock-keep-open watcher (J.W3.B); this exposes that ref to consumers via `v-model:open` + `update:open` event at the SAME debounced cadence the popover itself reads — `hoverOpenDelay` (open) + `closeDelay` (close).

Backward-compatible: existing consumers continue uncontrolled (`open` prop defaults `undefined`, watcher syncs only when a Boolean comes through, `isOpen` ref initialises from `props.open ?? false`).

Load-bearing for AB.W2 GlassTimeline continuous variant: pointer skim across the trigger edge — and popover content overlapping the dot — no longer flickers consumer hover state.

## 2026-05-12 23:33:35 EDT — AB.W2.T1+T2+T3+T4 land in one DOM rewrite (commit `6263330`)

`<GlassTimeline>` continuous variant restructures into 4 coupled fixes in a single DOM rewrite. The progressbar rail and the marker buttons are now SIBLINGS inside a relative-positioned `.continuous-track-wrap`:

```html
<div class="continuous-track-wrap">
  <div role="progressbar" class="continuous-track">
    <div class="continuous-region state-completed">
      <div class="continuous-region-fill" />
    </div>
    ...
  </div>
  <ul role="list" class="continuous-markers">
    <li role="listitem"><HoverPopover><button class="continuous-dot"/></HoverPopover></li>
    ...
  </ul>
</div>
```

- **T4 — Option C axe split**: non-interactive `progressbar` rail no longer nests focusable descendants; closes the AA-carry-forward `nested-interactive` violation (serious; WCAG 2.0 A — 4.1.2). Marker overlay in a sibling list.
- **T1 — B2.a perceived-centering fix**: marker `<ul>` lives outside rail's `overflow: hidden` clip; dot recipe gains opaque background (`var(--background)`), symmetric `box-shadow: 0 0 4px ...` (was directional `0 1px 2px`), `box-sizing: border-box`. Marker `<li>` uses `display: flex` + `line-height: 0` to collapse default list-item line-box that otherwise drifted the dot 1 px low.
- **T2 — popover slot**: each marker wrapped in `<HoverPopover>` (opt-out via `disablePopover`). Default content reads `{ label, value, description, state }` from segment payload; colour-codes body via `--popover-tint = segment.gradient.to`. Consumers override via scoped `#popoverContent` slot. Hover events route through HoverPopover's debounced `update:open` — no pointer-skim flicker.
- **T3 — currentSegmentKey prop**: stamps `data-current="true"` on matching marker; consumers distinguish active phase from transient hovered phase. Per-segment `data-state` + `data-completed` hooks survive the structural split (stable substrate for AB.W3's raised-rivet phase-bus echo styling).

## 2026-05-12 23:33:44 EDT — AB.W2 docs (commit `14631b7`)

CHANGELOG.md (+95 lines under "Unreleased — AB in-flight" band) — 5 new entries documenting T1 / T2 / T3 / T4 + HoverPopover update:open passthrough + hoverEnd event. DESIGN.md Timeline §A11y contract rewritten for the new continuous-variant structure.

**End of AB.W2.** Three commits in 25 seconds — single-author triplet landing direct-to-master. No green-gate run at the wave close; no proof doc authored at the wave.

## 2026-05-12 23:52:35 EDT — AB.W3.T1 lands: Pulse variant="aura" (commit `2796b28`)

`src/components/custom/pulse/Pulse.vue` (+115/-2) + `src/styles/animations.css` (+27) + `src/styles/tokens.css` (+48).

Third Pulse variant alongside `dots` + `ring`. Paints absolutely-positioned radial-gradient halo inside host surface; host owns `position: relative` + `border-radius`; aura inherits both. The breath cycle drives scale + opacity off `--animate-ambient-pulse-*` tokens.

API additions (backward-compatible):
- `variant: 'aura'`
- `intensity: 'subtle' | 'normal' | 'vivid'` (aura-only — scale-max amplitude)
- `once: boolean` (aura-only — single-breath then settle; fill-mode forwards via `.pulse-aura--once`)

6 tokens at `tokens.css §2.A AMBIENT MOTION`:
- `--animate-ambient-pulse-duration: 6s`
- `--animate-ambient-pulse-scale-min: 1.0`
- `--animate-ambient-pulse-scale-max: 1.15`
- `--animate-ambient-pulse-easing: var(--ease-apple)`
- `--pulse-aura-opacity-min: 0.55`
- `--pulse-aura-opacity-max: 0.95`

Shared `@keyframes ambient-pulse` in `animations.css`. Reduced-motion: scoped `@media (prefers-reduced-motion: reduce)` bracket forces `animation: none` + parks at the min stop. Depth + colour stay visible; only the breath cycle disables.

Reservation rule (commit body): aura host is composed by the consumer — speedtest adopts at 5 capped surfaces (Start button idle, idle hero pill, complete-headline one-shot, active result-row value, timeline current-stage panel). Primitive does NOT mount on a card/chassis surface; reservation lives at consumer side.

## 2026-05-12 23:52:43 EDT — AB.W3.T2 lands: Progress variant="sectioned" (commit `a36cae8`)

`src/components/ui/progress/Progress.vue` + `src/styles/tokens.css §2.B SECTIONED PROGRESS`.

Third Progress variant alongside `default` + `gradient`. Canonical **phase-bus** primitive — N colour-coded cells with gradient seams between siblings, an active-cell spring-grown fill, a living catch-light sweep, and recessed glass-channel depth on the rail.

API additions:
- `variant: 'default' | 'gradient' | 'sectioned'`
- `segments?: ProgressSegment[]` (sectioned only)
- `currentSegmentKey?: string | null` (sectioned only)
- `activeProgress?: number` (sectioned only — 0..1 fill of active cell)

New `ProgressSegment` shape: `{ key, label?, color, state?: 'pending' | 'active' | 'completed', weight?: number }`.

Per-cell visual register:
- **pending**: frosted colour tint @12% opacity
- **active**: frosted tint @18% + spring-fill from leading edge + `mix-blend-mode: overlay` catch-light sweep traversing every 1.8s
- **completed**: saturated fill at 100% across the cell

Seams between adjacent cells paint as a small gradient blend (`--seam-from → --seam-to`) at `mix-blend-mode: screen` so the joins read as living glass joints, not hard CSS stripes.

Rail depth via `inset` + `outer` box-shadow + `--shadow-color`: top catch-light strip, lower inner shadow, small outer drop. Tokens:
- `--progress-sectioned-height: 0.875rem` (14px — W3 spec minimum)
- `--progress-sectioned-track: var(--secondary)`

Reduced-motion: sweep + width transition disable; saturation + state distinctions stay visible.

Speedtest `MeterColumn.vue` consumes the sectioned variant at the under-bar phase-bus site.

## 2026-05-12 23:52:58 EDT — AB.W3 docs (commit `46d0891`)

CHANGELOG.md (+96 lines under existing "Unreleased — AB in-flight" header) — 2 new entries: Pulse aura + Progress sectioned with full API docs, token tables, reduced-motion contracts, speedtest consumer adoption notes. Version stays at 1.0.5 per the single-1.1.0-at-W4-close discipline.

**End of AB.W3.** Three commits in 25 seconds — single-author triplet. No green-gate run at the wave close; no proof doc; no demo-side wire (the under-wire that N.W4 β absorbs).

## 2026-05-13 00:26 EDT — AB.W4 close: v1.1.0 + B5 honesty close (commit `a28560f`)

`CHANGELOG.md` (+67/-8) header rewrite from "Unreleased — AB in-flight" → "1.1.0 — 2026-05-13 — AB Living-UI canon (chassis token + timeline structural split + Pulse aura + sectioned Progress + dock-shadow consumer canon)". `package.json` version 1.0.5 → 1.1.0.

Per user 2026-05-13 directive ("Full bump to 1.1"), the AB tranche accumulated five cross-repo lanes against the M trunk and ships as a single v1.1.0 minor bump.

CHANGELOG documents the dock-shadow consumer canon as v1.1.0-class canon refinement (AB.W4 — B5 honesty close):
- Z.W2 (canon since v1.0.1) shipped `--shadow-dock-override` (consumed by `.glass-dock` at `dock.css:46`) + `--shadow-uniform` (uniform omnidirectional shadow recipe at `tokens.css:346`) as a coupled pairing.
- Z.W2 documentation gestured at the pairing but did NOT publish the canonical consumer recipe.
- AB.W4 Playwright deep-probe (A2 "honesty bomb" — Z.W2 declared B5 RESOLVED but the two-layer fix silently no-op'd because no consumer ever composed the override) confirmed both halves of the contract are healthy on the canon side; the gap was the consumer recipe.
- Consumer recipe published: `<GlassDock :style="{ '--shadow-dock-override': 'var(--shadow-uniform)' }">`.
- Speedtest AB.W4 commits the recipe at `src/components/dock/Dock.vue`.

v1.1.0 tag created + pushed (orchestrator action; not in commit log; verified at HEAD post-hoc).

**End of AB.W4 close (v1.1.0).** No 7-agent strengthened post-close audit pattern; no plan-vs-actual audit; no doc-drift audit; no idiomatic-gestalt audit; no performance audit; no visual-runtime probe; no integrity sweep; no bundle-budget verification.

## 2026-05-13 17:45 EDT — AB.W4 post-close substrate coda (commit `2b3727f`)

User flagged the gear icon's right-edge shadow a **fourth** time across X → Z → AB → AB.W4 close. Even after speedtest's `<GlassDock :style="{ '--shadow-dock-override': 'var(--shadow-uniform)' }">`, the user still perceived a right-edge halo because:

1. The directional `0 4px 20px` drop on `--shadow-dock` concentrated on the pill's rounded right cap. (Closed at the consumer's override.)
2. The `0 0 0 1px` outer ring at 10% cream-white alpha traced the right-cap arc and read as a shadow on its own.

Canonical dock tokens now drop both:
- `--shadow-dock`: `0 0 20px [shadow-color 14%]` (single uniform glow)
- `--shadow-dock-collapsed`: `0 0 12px [shadow-color 12%]` (single uniform glow)

The dock's own `border: 1.5px solid var(--glass-border-dock)` provides silhouette definition, so the 1 px outer ring was redundant. Per-instance directional drop can still be reinstated via `--shadow-dock-override`, which all `.glass-dock` state selectors consume (base + collapsed + collapsed:hover; the collapsed-state passes were stuck on the canonical token until this change). The override path is the canonical place for consumers that want a directional cast.

`src/styles/dock.css` (+5/-2) + `src/styles/tokens.css` (+16/-2).

**End of AB cycle.** Two AB-tagged commits exist post-v1.1.0 (`5bdc981` + `78974c0`) but those are N.W0 KISS-revision + wiring-revision documentation commits — they belong to N, not AB. The AB cohort terminates at `2b3727f` as the post-close substrate-refinement coda.

## 2026-05-14 — AB precept-loop closure at O.W0 Lane A

Per K invariant 3 (no tranche-letter shadow execution) + the K.WV / V-post-hoc pattern, the AB tranche shadowed M.close → v1.1.0 without a plan folder. O.W0 Lane A (this orchestrator-dispatched lane) authors the retrospective plan folder at `docs/tranches/AB/` — closes the precept loop without rewriting commits.

Files authored at O.W0 Lane A:
- `docs/tranches/AB/AB.md` — retrospective plan + thesis + wave schedule
- `docs/tranches/AB/PROGRESS.md` (this file) — reverse-engineered execution log
- `docs/tranches/AB/waves/W{1,2,3,4}.md` — per-wave specs reconstructed from commit chains
- `docs/tranches/AB/FINAL.md` — close report with bundle-budget rebaseline accounting + carry-forward to N
- `docs/tranches/AB/coordination/CONSTELLATION.md` — multi-peer manifest (speedtest canonical consumer)
- `docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md` — disposition + verification + open questions (lives in O's audit folder, not AB's)

AB is the second instance of the shadow-execution pattern (V was the first; K W0 codified the precept; AB violated it post-codification). The precept's enforcement mechanism is orchestrator-side wave gating, which AB did not invoke. O.W0 Lane A closes the historical loop retroactively.
