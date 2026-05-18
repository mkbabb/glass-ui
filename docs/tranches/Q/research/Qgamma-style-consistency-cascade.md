# Qγ — Style consistency + CSS cascade integrity

Round-1 audit lane, Q tranche. READ-ONLY planning report.
Dispatched: 2026-05-18. Lane: `src/styles/` cascade, tokens, theme, glass ladder,
scoped-vs-global discipline. Pairs with Qβ (core-feature co-location).

## §1 Scope

The 16-file `src/styles/` cascade (`index.css` + 15 sheets, 4,907 LoC total),
the `tokens.css` §0–§16 token corpus, the `theme.css` `@theme` block, the
`glass.css` 5-rung ladder, scoped-vs-global discipline across 31 SFC `<style>`
blocks, and the style impact of the 7-commit post-P shadow cohort
(`9f774b4..HEAD`). Verdict + Q-wave remediations in §8–§9.

## §2 Cascade order integrity

`src/styles/index.css` imports 16 sheets in a documented, principled order:
tokens → typography → theme → glass → paper → dock → cards → floating-panel →
transitions → animations → utilities → {instrument-chassis, glyph-face,
dock-group, disco-glyph, hover-popover}. The header comment block (lines 19–62)
narrates the dependency chain and matches the actual `@import` sequence
1:1 — **no drift**.

Findings:

- **G1 (PASS) — token→theme ordering correct.** `theme.css` reads `tokens.css`
  custom properties via `var()`; it is imported after tokens. `typography.css`
  sits between them but is "pure values, no token consumption" per its own
  contract — verified: its `@theme` namespace registrations read only
  `--type-*` / `--font-stack-*` names, all of which `tokens.css` §0 declares
  first. Order is sound.

- **G2 (PASS) — recipe sheets after theme.** glass/paper/dock/cards/
  floating-panel/utilities all consume both raw tokens and `@theme` aliases;
  all import after `theme.css`. The 5 P-tranche component sheets load last so
  component-local recipes can override utilities — intentional and documented.

- **G3 (LOW) — `transitions.css` ships UNLAYERED rules.** Of the 16 sheets,
  `transitions.css` is the only one carrying bare top-level class rules
  (`.fade-enter-active`, `.fade-slide-*`, `.dialog-scale-*`, `.dropdown-*`,
  `.tab-fade-*`) with **no `@layer` wrapper**. Unlayered rules land in the
  implicit "unlayered" origin, which in the CSS cascade ranks ABOVE every
  `@layer` block. A Vue `<Transition>` class can therefore silently outrank a
  `@layer components` recipe at equal specificity. `animations.css` is also
  unlayered but is pure `@keyframes` (layer-agnostic by spec — correct as-is).
  `transitions.css` is the genuine inconsistency. Severity LOW: transition
  classes target enter/leave pseudo-states that rarely collide with static
  recipes — but the asymmetry is a latent cascade hazard and a discipline gap.
  **Recommend: wrap `transitions.css` class rules in `@layer components`.**

- **G4 (PASS) — `@layer`/`@utility` discipline.** Every recipe sheet wraps its
  class rules in `@layer components`; `@utility` blocks (typography ×28,
  utilities ×7, dock ×2, paper ×3) are correctly authored — Tailwind v4 hoists
  `@utility` into `@layer utilities`, which ranks above `@layer components`, so
  utility-class overrides of recipe classes resolve correctly. No misordering.

## §3 Token consistency

`tokens.css` is 1,006 LoC across §0–§16 (numbering skips §15; see T4). The
corpus is broadly disciplined — HSL-channel colors, `color-mix` for tinted
surfaces, `--<family>-<rung>` naming, semantic aliases re-pointing into scales,
`.dark` mirrors for every visual rung. Findings:

- **T1 (HIGH) — `--metric-row-*-clamp-*` token family is a PRIVATE SFC
  DIALECT, not co-located in `tokens.css`.** The post-P commits `9ba68ca` +
  `d244dd5` introduced two token families:
  - `--metric-row-value-clamp-{min,cqi,max}`, `--metric-row-unit-clamp-{min,max}`
  - `--metric-row-label-clamp-{min,cqi,max}`

  These are **never declared in `tokens.css`** (or any `src/styles/` sheet —
  `grep` confirms zero hits). They exist ONLY as:
  1. Scoped-CSS `var(--x, fallback)` consumption sites inside `MetricRow.vue`
     (`<style scoped>`), and
  2. A scoped `[data-register="result"]` selector inside `MetricStack.vue`
     that *sets* them.

  The `--timeline-segment-*` and `--timeline-dot-*` family established the
  canonical pattern at §16: timeline tokens live in `tokens.css` with their
  defaults, and SFCs consume them bare. `--metric-row-*-clamp-*` breaks that
  pattern — the defaults are buried as inline `var()` fallbacks scattered
  across two SFCs, so a consumer cannot discover them, cannot see the canonical
  value in one place, and cannot override the audacious-register default at
  `:root`. This is exactly the "private dialect" failure mode the tranche
  letter directive (Qγ brief) named. `--metric-stack-rows` has the same defect.
  **Recommend: promote the full `--metric-row-*-clamp-*` + `--metric-stack-rows`
  family into `tokens.css` §16 (or a new §17 Metric block) with the
  audacious-register values as the declared defaults; SFCs then consume bare.**

- **T2 (MEDIUM) — `--scale-press-{xs,md,lg}` are substrate-without-consumer.**
  The P.W4 press-scale ladder declared `--scale-press-{xs,sm,md,lg}` in
  `tokens.css` §11. Audit of `src/`: only `--scale-press-btn` (which aliases
  `--scale-press-sm`) and `--scale-press-dock` / `--scale-press` are consumed.
  `--scale-press-xs`, `--scale-press-md`, `--scale-press-lg` have **zero `src/`
  consumers**. The token comment states the rationale is words/frontend
  consumer absorption (9 `active:scale-[X.XX]` sites) — i.e. preemptive
  consumer-facing substrate. Per J invariant 3 / L invariant 8 (≥2 consumers OR
  exported OR formally retired-with-rationale), a consumer-facing token ladder
  is defensible IF the consumer migration actually lands. Q must verify: did
  words/frontend adopt the ladder? If not by Q close, this is a substrate-
  without-consumer-binary violation. **Recommend: Q confirms the words/frontend
  consumer landing, or retires the unused rungs.**

- **T3 (LOW) — `--timeline-dot-*` knobs added by `3cb70db` follow the §16
  pattern but their DEFAULTS are SFC-local fallbacks.** `3cb70db` added
  `--timeline-dot-fill`, `--timeline-dot-blur`, `--timeline-dot-ring`,
  `--timeline-dot-tint-{current,completed}` as CSS custom-property knobs — good
  intent (consumers tune without `:deep`). But unlike the existing §16
  `--timeline-segment-*` family, these are NOT declared in `tokens.css`; their
  defaults live as `var(--timeline-dot-fill, var(--surface-tint-12))`-style
  fallbacks in `ContinuousTimeline.vue`. Same defect class as T1, lower
  severity (4 knobs vs 8, single SFC). **Recommend: fold into §16 with
  declared defaults alongside `--timeline-segment-*`.**

- **T4 (TRIVIAL) — §15 missing from the `tokens.css` section numbering.**
  Sections run §0–§14 then jump to §16 (Timeline). Cosmetic; either renumber
  Timeline to §15 or document the gap. No functional impact.

- **T5 (PASS) — HSL-channel + `color-mix` consistency.** Colors are HSL
  triples; tinted surfaces use `color-mix(in srgb, … N%, transparent)`; the
  `--surface-tint-N` and `--glass-*` families are α-named and monotonic. The
  post-P commits added no raw-literal color bypasses. CLAUDE.md's "HSL channels
  `222.2 47.4% 11.2%` consumed as `hsl(var(--x))`" convention is loosely
  honored — `tokens.css` actually wraps most colors as full `hsl(…)` values
  rather than bare channels, but this is internally consistent across the file
  and pre-dates Q; not a Q regression.

## §4 Glass ladder integrity

`glass.css` §components. The 5-rung `.glass-{wash,quiet,resting,floating,
overlay}` ladder is **internally consistent**: every rung declares the identical
property set — `position: relative`, `background`, `backdrop-filter`, `border`,
`box-shadow` — each bound to its tier-matched token (`--glass-bg-<rung>`,
`--glass-blur-<rung>`, `--glass-border-<rung>`, `--glass-shadow-<rung>`). The
underlying token families in `tokens.css` §8 are α-monotonic and each has a
`.dark` mirror. The `::after` grain overlay applies uniformly to all 5 rungs
with a `.dark` `mix-blend-mode` swap. `@supports not (backdrop-filter)` and
`prefers-reduced-transparency` / `prefers-contrast` fallbacks cover all 5 rungs.

Findings:

- **GL1 (PASS) — ladder uniformity.** All 5 rungs symmetric. No missing rung,
  no property drift.

- **GL2 (NOTE) — shorthands diverge from rungs by design.** `.glass-card` and
  `.glass-cartoon` add `border-radius` + `contain` and bind to quiet-tier
  tokens with a `--glass-{bg,blur,border}-cartoon` fall-through layer; this is
  documented and intentional (shape + tier shorthand). `.glass-btn`,
  `.btn-pill`, `.input-pill` are pill recipes, not ladder rungs — correctly
  separate. No issue.

- **GL3 (PASS) — post-P cohort did not touch `glass.css`.** `git show` confirms
  none of the 7 post-P commits modified `glass.css`. Ladder integrity is
  unchanged since P close.

## §5 Scoped-vs-global discipline

- **S1 (PASS) — dock SFCs carry NO scoped `<style>`.** `grep -l '<style'
  src/components/custom/dock/*.vue` returns empty. All 8 dock SFCs
  (`GlassDock`, `DockLayer*`, `Dock*Button`, `Dock*Trigger`) keep 100% of their
  styling in `dock.css`. The proof-theme-style gate holds. The post-P dock
  commits (`099d51e`, `beec35e`) edited `dock.css` directly and pushed **no**
  style into any SFC — verified by full `git show` diff inspection.

- **S2 (NOTE) — 31 SFCs carry scoped `<style>`; the set is broadly
  justified.** The scoped-style SFCs split into defensible categories:
  (a) per-instance computed geometry that cannot be a static class (timeline
  trio, `MetricRow`/`MetricStack`, `HeaderRibbon`, `AnimatedDigit`,
  `TypewriterText`, `ScrollingText`); (b) container-query / subgrid recipes
  tightly coupled to one component (`ConfiguratorRow`, `ProgressiveSidebar*`);
  (c) small component-local depth recipes (`Progress`, `Notification`,
  `Slider`, `Pulse`, `GlassPanel`). None of these are dock-class violations.
  The genuine concern is T1/T3 — scoped style is fine, but the *tunable tokens*
  it consumes must be declared in `tokens.css`, not as scoped `var()` fallbacks.

- **S3 (PASS) — no global rules leaked into SFCs by the post-P cohort.**
  `3cb70db` added ~135 lines of scoped CSS to `ContinuousTimeline.vue` — but
  this is per-region computed-gradient geometry (windowed `background-size` /
  `background-position-x` per region, anchored terminus rounding) that is
  inherently per-instance and cannot be a static styles/ class. Correctly
  scoped. Its tunable knobs are the T3 finding.

## §6 Post-P shadow-cohort style impact

Five of the 7 post-P commits touch style surfaces. Per-commit verdict:

| Commit | Style surface | Verdict |
|---|---|---|
| `099d51e` | `dock.css` — retire edge-fade `mask-image` (both axes) | **CLEAN.** Pure removal; cascade order preserved; `--mask-fade-width` retained for genuine scroll-mask consumers in `utilities.css`. Removed `-webkit-mask-image` paired-prefix too. Token discipline intact. |
| `beec35e` | `dock.css` — inactive-layer `visibility:hidden` + delayed `visibility` transition | **CLEAN.** Properly inside `@layer components`; uses `--dock-motion-fast` / `--duration-fast` tokens; no literals. Sound `visibility` transition reasoning. (Also `toggle/index.ts` CVA — Qβ scope.) |
| `3cb70db` | `ContinuousTimeline.vue` scoped CSS + `geometry.ts` | **MOSTLY CLEAN, two flags.** (1) Adds `--timeline-dot-*` knobs without `tokens.css` declaration — T3. (2) Manually authors `-webkit-backdrop-filter` at `ContinuousTimeline.vue:558` — see G/W1 below. |
| `9ba68ca` | `MetricRow.vue` + `MetricStack.vue` scoped CSS | **FLAGGED.** Introduces `--metric-row-value-clamp-cqi` + register tokens as a private SFC dialect — T1. |
| `d244dd5` | `MetricRow.vue` + `MetricStack.vue` scoped CSS | **FLAGGED.** Extends T1 with `--metric-row-label-clamp-*`. Same defect. |

- **W1 (MEDIUM) — `-webkit-backdrop-filter` manual authorship contradicts the
  documented `glass.css` policy.** `glass.css` lines 12–19 state the canonical
  policy verbatim: author the **unprefixed** `backdrop-filter` ONLY; Lightning
  CSS / autoprefixer emits the `-webkit-` form per browserslist; authoring both
  manually caused Lightning CSS to "dedup-and-keep-prefixed" which modern
  Chromium then drops from the CSSOM. `glass.css` itself honors this (single-
  source). But `ContinuousTimeline.vue` (`3cb70db`, line 558),
  `ScrubberTimeline.vue`, `SegmentedTimeline.vue`, and `Slider.vue` all
  **manually author `-webkit-backdrop-filter`**. The timeline trio's
  manual-prefix authorship is the exact anti-pattern the `glass.css` comment
  warns against. `3cb70db` propagated it further. Severity MEDIUM: it is the
  documented cause of a CSSOM-drop bug class. **Recommend: Q strips manual
  `-webkit-backdrop-filter` from all 4 SFCs; let the build pipeline emit it —
  one canonical policy, library-wide.**

- **W2 (NOTE) — no cascade-order or `@layer` regression from the cohort.** The
  two `dock.css` edits stayed inside `@layer components`; no new sheet was
  added to `index.css`; the import order is byte-identical to P close.

## §7 CSS budget status + recommendation

`scripts/profile-bundle.mjs` `BUDGETS["dist/glass-ui.css"]` = `46_000` raw /
`8_200` gzip (last rebaselined for the AB+1 P.W6 chassis split).

Measured against `dist/glass-ui.css` at HEAD (mtime 2026-05-18 02:10, AFTER the
last post-P commit `d244dd5` at 02:03 — i.e. a current artefact):

- raw  **42,667 / 46,000 = 92.8%**  (≈ 7.2% headroom)
- gzip **7,674 / 8,200 = 93.6%**  (≈ 6.4% headroom)

At P.W6 close the ε agent flagged 89.0% raw / 90.2% gzip as thin. The post-P
cohort pushed draw to 92.8% / 93.6% — gzip headroom dropped from ~9.8% to
~6.4%. The cohort added CSS without rebaselining the budget (4th K-invariant-3
recurrence — same precept-gap shape as N.W0, P.W0, K.W0). The gate would still
PASS today, but the trend is monotone-up and headroom is below the ε-thin
threshold.

**Recommendation: REBASELINE, not reduce — but conditionally.** The post-P CSS
growth is load-bearing (real timeline-gradient + dock-visibility recipes), so a
forced reduction would delete shipped behaviour. Rebaseline to `~48_000` raw /
`~8_700` gzip (≈ 11% headroom, matching the historical rebaseline cadence).
BUT — fold this into the Q-wave only AFTER the §8 remediations land: T1/T3
token-promotion moves declarations from SFC `var()` fallbacks into `tokens.css`
(net-neutral-to-slightly-positive on raw bytes), and the G3 `@layer` wrap is
near-zero. Measure the post-remediation draw, then set the new baseline once.
Avoid a second rebaseline mid-tranche.

## §8 Recommended Q-wave style remediations

Priority-ordered, all idiomatic/gestalt (no workarounds):

1. **[HIGH] Promote the metric-stack token family into `tokens.css`** (T1).
   Move `--metric-row-{value,unit,label}-clamp-*` + `--metric-stack-rows` into
   a `tokens.css` block (extend §16 or open §17 "Metric"), with the
   audacious-register values as declared defaults. `MetricRow.vue` /
   `MetricStack.vue` then consume bare (`var(--metric-row-label-clamp-min)`,
   no inline fallback). The `[data-register="result"]` override stays in
   `MetricStack.vue` scoped CSS (it is a register-selector, legitimately
   component-local) but now overrides a *globally declared* default. Closes the
   private-dialect defect; restores token discoverability + `:root`
   overridability.

2. **[MEDIUM] Strip manual `-webkit-backdrop-filter` from the 4 SFCs** (W1).
   `ContinuousTimeline.vue`, `ScrubberTimeline.vue`, `SegmentedTimeline.vue`,
   `Slider.vue`. Author the unprefixed property only; let Lightning CSS emit
   the prefix per the documented `glass.css` policy. One canonical policy
   library-wide; removes the CSSOM-drop bug class.

3. **[MEDIUM] Resolve `--scale-press-{xs,md,lg}` substrate-without-consumer**
   (T2). Verify the words/frontend consumer absorbed the ladder; if not landed
   by Q close, retire the 3 unused rungs (keep `--scale-press-sm` /
   `--scale-press-btn`). Q-decision required.

4. **[LOW] Wrap `transitions.css` in `@layer components`** (G3). Brings the one
   unlayered class sheet into cascade-layer discipline; eliminates the latent
   unlayered-outranks-layered hazard. `animations.css` stays as-is (pure
   `@keyframes`, layer-agnostic).

5. **[LOW] Fold `--timeline-dot-*` knobs into `tokens.css` §16** (T3). Same
   pattern as remediation 1, lower scope; co-locates with the existing
   `--timeline-segment-*` family.

6. **[TRIVIAL] Renumber Timeline §16 → §15** or document the section-numbering
   gap (T4).

7. **[after 1+5] Rebaseline the CSS budget** (§7). Measure post-remediation
   draw, set one new baseline (~48 KB raw / ~8.7 KB gzip).

## §9 Verdict + status

**The `src/styles/` cascade is structurally SOUND.** Import order is principled
and matches its own documentation; the glass ladder is internally consistent
and untouched by the post-P cohort; `@layer`/`@utility` discipline holds in 15
of 16 sheets; dock SFCs carry zero scoped style (proof-theme-style gate intact);
the two post-P `dock.css` edits (`099d51e`, `beec35e`) are clean removals/
additions that preserved cascade order and token discipline.

**The defects are TOKEN CO-LOCATION, not cascade structure.** The headline
finding is T1 — the post-P metric-stack commits (`9ba68ca`, `d244dd5`)
introduced an 8-token `--metric-row-*-clamp-*` family as a private SFC dialect
with defaults buried in scoped `var()` fallbacks, never surfacing in
`tokens.css`. T3 (`--timeline-dot-*`, `3cb70db`) is the same defect at lower
scope. Together they are a co-location regression introduced by the untracked
post-P shadow cohort — corroborating the Q findings.md thesis that the cohort
fractured substrate cohesion. W1 (`-webkit-backdrop-filter` manual authorship)
is a pre-existing inconsistency that `3cb70db` propagated further.

None of the findings explain a *total* consumer breakage of dock/dropdown/
glass-card surfaces — the cascade itself is intact and the glass ladder is
sound. Qγ's evidence points to the breakage being a consumer-side or
component-logic concern (Qα/Qβ/Qζ scope), not a style-cascade fault. The Qγ
contribution to the Q plan is the 7 §8 remediations — all token co-location +
cascade-discipline hygiene, all idiomatic, zero deferral.

**STATUS: COMPLETE.** No source mutated. No `npm run build`. Planning report
only. 7 remediations handed to the Q synthesis; CSS-budget rebaseline gated
behind remediations 1+5.
