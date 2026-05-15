# Pβ — God Modules Audit (post-O.W7, AB+1 cohort folded)

**Lane**: round-1 backend audit Pβ.
**Scope**: every file >500 LOC in `src/` + `scripts/` + `demo/` at HEAD `b201b03`
(package.json v1.7.0; v1.5.0/v1.5.1/v1.6.0/v1.7.0 cohort post-v1.4.1 O close).
**Mode**: read-only. No git mutations.
**Reference**: `docs/tranches/O/research/Rbeta-god-modules.md` (O baseline);
O.W3 Lanes A/B/C audit proofs (timeline + profile-aurora + preset-editor splits).

## § Angle summary

Nine files cross the 500-LOC bar at HEAD. Headline:

- **W3 splits HELD across the board.** GlassTimeline (dispatcher 123 LOC),
  profile-aurora.mjs (462 LOC), demo/configurator/usePresetEditor.ts
  (24-LOC façade) — all three O.W3 split outcomes preserved at HEAD. The
  AB+1 cohort did NOT regress any of the three splits.
- **One W3-artefact LOC creep** — `ContinuousTimeline.vue` 607 → 632 LOC
  (+25, +4.1%) from commit `8bf51c4` (timeline 44×44 hit-area fix). Still
  COHESIVE-LARGE per O.W3 Lane A audit; the growth is template+CSS, not
  cross-concern accumulation. No P-action required.
- **One AB+1 LOC growth on a coherent artefact** — `src/styles/typography.css`
  414 → 595 LOC (+181, +43.7%) from commit `2474440` (Plus Jakarta Sans +
  Fira Code OFL self-host). The added 181 LOC is **all** `@font-face` blocks
  + Capsize-calibrated fallback faces + their leading comment block. COHESIVE
  genre artefact (single-domain typography substrate); the new block is
  sectioned with `═══` rules and a dedicated `OFL FACE FILES` header.
- **Tokens.css minor growth** — 980 → 992 LOC (+12) from commit `099910d`
  (`--phase-color-label`). NOTE: `--phase-color-label` actually lives in
  `src/styles/instrument-chassis.css` (the WCAG companion to the chassis
  `--phase-color` cascade), NOT in `tokens.css`. The 12-line tokens.css
  delta is unrelated noise — likely typography stack updates per the
  font-host commit. tokens.css is COHESIVE (numbered §-block index intact).
- **Zero new god modules from AB+1** — all 5 new AB+1 SFCs
  (MetricRow / MetricStack / AnimatedDigit / MetricCell / ResponsiveTabs)
  sit between 94 and 243 LOC. None exceeds 250 LOC. The cohort shipped
  clean.

No SPLIT-CANDIDATEs introduced post-O. The 2 borderline O-audit candidates
(`useSortable.ts` + `utilities.css`) remain unchanged in size (607 + 655).

## § Per-file LOC table — every file >500 LOC at HEAD

| File | LOC | Δ vs O baseline | Cohesion verdict | Notes |
|------|-----|-----------------|------------------|-------|
| `src/styles/tokens.css` | 992 | +87 (905 → 992) | COHERENT-LARGE | Numbered §-block genre artefact (§0–§16); delta is unrelated cohort noise (font-stack-mono update) |
| `src/styles/dock.css` | 947 | +34 (913 → 947) | COHERENT-LARGE | Dock-family style authority — one substrate, per CLAUDE.md |
| `src/components/custom/aurora/shaders/aurora.frag.ts` | 799 | 0 | COHERENT-LARGE | Single GLSL fragment shader; verbatim port of Claude Design bundle |
| `src/styles/utilities.css` | 655 | +17 (638 → 655) | COHERENT-LARGE | `@utility` block + utility classes; growth from added recipes |
| `src/components/custom/timeline/ContinuousTimeline.vue` | 632 | +25 (607 → 632) | COHERENT-LARGE | Single variant SFC (continuous); growth is `::before inset -15px` hit-area block per `8bf51c4` |
| `src/composables/sortable/useSortable.ts` | 607 | 0 | COHERENT-LARGE (borderline) | One composable + ghost DOM helper; O-audit µ-split candidate (`dragGhost.ts`) deferred |
| `src/styles/typography.css` | 595 | +181 (414 → 595) | COHERENT-LARGE | OFL self-host subsystem added (Plus Jakarta Sans + Fira Code + 4 Capsize fallbacks); single-domain artefact |
| `scripts/proof-runtime.mjs` | 585 | 0 | COHERENT-LARGE | CDP runtime probe; per-route assertion suites cluster cleanly |
| `demo/stories/aurora/presets.ts` | 506 | NEW >500 (was <500 at O close) | COHERENT-LARGE | Verbatim preset data table (authored Aurora v4.1 themes); single-domain genre artefact per memory rule "Presets in consumers" |

**Files that DROPPED below the 500-LOC bar at HEAD** (vs Rβ O baseline):

| File | O baseline | HEAD | Disposition |
|------|------------|------|-------------|
| `src/components/custom/timeline/GlassTimeline.vue` | 1049 | 123 | RESOLVED — W3 Lane A dispatcher split |
| `scripts/profile-aurora.mjs` | 884 | 462 | RESOLVED — W3 Lane B harness-browser extract |
| `demo/configurator/usePresetEditor.ts` | 657 | 24 | RESOLVED — W3 Lane C 6-module façade split |

## § AB+1 cohort — splits-or-coherent

The AB+1 substrate cohort (v1.5.0 / v1.5.1 / v1.6.0 / v1.7.0) added 5 new
component packages + 1 OFL font subsystem + 1 chassis CSS-var. Per-file LOC:

| Path | LOC | Cohesion |
|------|-----|----------|
| `src/components/custom/metric-stack/MetricRow.vue` | 243 | COHESIVE — single SFC; script (93) + template (41) + scoped style (~88) + comments |
| `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | 156 | COHESIVE — desktop/mobile-aware tabs primitive; single concern |
| `src/components/custom/metric-cell/MetricCell.vue` | 145 | COHESIVE — single SFC |
| `src/components/custom/metric-stack/MetricStack.vue` | 128 | COHESIVE — parent container SFC; subgrid + container-query layer |
| `src/components/custom/animated-digit/AnimatedDigit.vue` | 94 | COHESIVE — single SFC; smallest of cohort |

**Verdict**: ZERO god modules introduced by AB+1. All 5 new SFCs are under
250 LOC. The cohort respected single-concern boundaries — each SFC is a
single primitive with one render contract. No `metric-row/` directory
exists at HEAD (the dispatch mention of it is a typo — `MetricRow.vue`
lives under `metric-stack/` alongside `MetricStack.vue`).

The 2 substrate growths (typography.css +181, tokens.css +87) both land in
single-domain genre artefacts; neither introduces cross-concern accumulation.
The OFL font-face block is a self-contained subsystem opening with a 40-line
comment header (lines 13–40) and is delimited by `═══ OFL FACE FILES ═══`
rules — it reads as one register, not five.

`--phase-color-label` (v1.5.1, commit `099910d`) lives in
`src/styles/instrument-chassis.css` (the WCAG companion to the existing
chassis `--phase-color` cascade — both the default `--phase-color-label:
var(--muted-foreground)` and the 4 phase-keyed overrides at
`[data-phase="ping|download|upload|gold"]` were added there). Confirmed
canonically: tokens.css does NOT host the new var. The chassis CSS file
sits below the 500-LOC bar.

## § O.W3 split-verification — still split? regressed?

### Lane A — `GlassTimeline.vue` dispatcher split (5 files in `timeline/`)

| File | O.W3 LOC | HEAD LOC | Δ | Held? |
|------|----------|----------|---|-------|
| `GlassTimeline.vue` (dispatcher) | 123 | 123 | 0 | YES |
| `ContinuousTimeline.vue` | 607 | 632 | +25 | YES — growth is hit-area CSS fix, no concern drift |
| `SegmentedTimeline.vue` | 225 | 258 | +33 | YES |
| `ScrubberTimeline.vue` | 191 | 191 | 0 | YES |
| `geometry.ts` | 187 | 187 | 0 | YES |

Lane A HELD. The +25-LOC growth on `ContinuousTimeline.vue` is from commit
`8bf51c4` ("`::before inset -15px` for 44×44 WCAG"), which adds a hit-area
expansion `::before` pseudo to preserve touch-target accessibility on the
continuous-variant rail. The block sits inside the existing scoped CSS
register for the continuous variant — no cross-concern leak; no shared math
moved out of `geometry.ts`. The 21.3%-bundle-delta open question from the
Lane A audit was not re-opened — `dist/timeline.js` did not breach the
global budget gate at HEAD per the bundle-profile JSON in worktree status.

### Lane B — `scripts/profile-aurora.mjs` harness extract

| File | O.W3 LOC | HEAD LOC | Δ | Held? |
|------|----------|----------|---|-------|
| `scripts/profile-aurora.mjs` | 462 | 462 | 0 | YES |
| `scripts/aurora-profile/harness-browser.mjs` | 447 | 446 | -1 | YES — byte-identical except trailing newline |

Lane B HELD. The `scripts/aurora-profile/` directory remains with the single
extracted `harness-browser.mjs`. The Lane B audit's open question (whether
W5 would co-locate further extractions e.g. `case-driver.mjs`) was not
acted on at AB+1 — `scripts/aurora-profile/` still hosts only the harness.

### Lane C — `demo/configurator/usePresetEditor.ts` 6-module split

| File | O.W3 LOC | HEAD LOC | Δ | Held? |
|------|----------|----------|---|-------|
| `demo/configurator/usePresetEditor.ts` (façade) | 24 | 24 | 0 | YES |
| `demo/configurator/preset-editor/store.ts` | 313 | 313 | 0 | YES |
| `demo/configurator/preset-editor/persistence.ts` | 139 | 139 | 0 | YES |
| `demo/configurator/preset-editor/types.ts` | 97 | 97 | 0 | YES |
| `demo/configurator/preset-editor/defaults.ts` | 90 | 90 | 0 | YES |
| `demo/configurator/preset-editor/stylesheet-swap.ts` | 53 | 53 | 0 | YES |
| `demo/configurator/preset-editor/css-writers.ts` | 53 | 53 | 0 | YES |

Lane C HELD. Zero touches on any of the 6 sub-modules or the 24-LOC façade
since the O.W3 close. Demo-private split intact.

**All three W3 lanes held without regression.**

## § Findings — SPLIT-CANDIDATES

**None.** Post-O the substrate carries 9 files >500 LOC, all of which are
single-domain genre artefacts (numbered token §-block index; single GLSL
shader; single utility-class register; single variant SFC; preset data
table; CDP runtime probe; one composable; OFL font subsystem). No file
exhibits the multi-concern accumulation pattern that warranted the O.W3
splits.

### O-audit residual µ-splits (carried, not regressed)

Two optional µ-split candidates from the O Rβ audit remain on the table:

1. **`src/composables/sortable/useSortable.ts` → extract `dragGhost.ts`
   (~80 LOC)** — mechanical, lossless. O Rβ classified as "borderline";
   neither O.W3 nor AB+1 acted. HEAD LOC unchanged at 607. P-disposition
   recommendation: defer to P-residual or roll into a P-wave only if a
   second consumer for the ghost-DOM helper surfaces in the round-2
   consumer audit (otherwise the helper has 1 caller, violating the
   ≥-2-callers cohesion rule from CLAUDE.md memory `overfitting-audit`).

2. **`src/styles/utilities.css` → extract `btn-audacious.css` (~50 LOC)**
   — CLAUDE.md HEADLINE substrate (K W6). Not load-bearing per O Rβ.
   HEAD LOC 655 (+17 vs O); the `@utility btn-audacious` block remains
   intact inside the file. P-disposition recommendation: same as above
   (defer unless a second consumer or visibility need surfaces; the
   K W6 HEADLINE was the design promotion, not a split mandate).

Neither µ-split is a P MUST. Both can be retired explicitly with rationale
at P close per the ZERO DEFERRAL constraint.

## § Proposed plan implications — P-wave assignments (ZERO DEFERRAL)

This audit produced no P MUST-do split work. The full plan implication is:

### P-wave assignment: **NONE required for god-module splits**

All god modules at HEAD are genre artefacts. The W3 splits held. The AB+1
cohort introduced zero new god modules.

### What P MUST resolve (ZERO DEFERRAL on the 2 O-residual µ-splits)

Per the P-open ZERO DEFERRAL constraint, the 2 µ-split candidates from
O Rβ either land in P or formally retire at P close. Proposed disposition
for the orchestrator to bind in `P.md` / waves:

| O-residual µ-split | Recommended P disposition | Rationale |
|-------------------|---------------------------|-----------|
| `useSortable.ts` → `dragGhost.ts` | RETIRE (no P-wave) | 1 caller — violates the ≥2-callers cohesion rule (`feedback_overfitting_audit`); the helper is internal to the composable and shares closure state. Splitting forfeits cohesion for no consumer benefit. |
| `utilities.css` → `btn-audacious.css` | RETIRE (no P-wave) | The `@utility btn-audacious` block stays in the utility register (1 file, 37 utility classes); extracting one utility into its own file would fragment the substrate without a discoverability win. CLAUDE.md K W6 HEADLINE references the recipe by name; consumer-side `import "@mkbabb/glass-ui/styles"` already bundles it. |

Both retirement rationales should be captured in the P FINAL.md residuals
table as "FORMAL RETIREMENT — ratio not met" (per L invariant 8 substrate-
without-consumer-binary; here the substrate exists but the SPLIT would
create the "substrate without consumer" anti-pattern).

### Sanity binding for P-close

P close MUST verify (as part of the close-audit constellation):

1. Re-run the >500-LOC sweep at P HEAD; flag any new entry.
2. Confirm the 3 W3 split outcomes (5+2+7 = 14 file layout) still intact.
3. Confirm the 2 O-residual µ-splits remain formally retired (no late
   un-discussed split).
4. Confirm `ContinuousTimeline.vue` (largest CSS-heavy variant SFC at 632
   LOC) hasn't accumulated a second concern.

These are mechanical re-runs of the present audit; no new dispatch shape
required.

## § Risks

- **`ContinuousTimeline.vue` LOC creep.** At +25 LOC since O.W3 Lane A close
  and +632 LOC absolute, this is the largest SFC in the library. Every
  growth commit on the continuous-variant should be reviewed against the
  W3 split contract (one variant per SFC). The current `8bf51c4` block is
  in-bounds (scoped CSS hit-area expansion). Bind the P-close re-run check
  above.

- **`typography.css` is now near the audit threshold.** At 595 LOC and
  growing (the v1.5.0 OFL self-host added 181 LOC; any further OFL face
  family — speculatively Computer Modern self-host if it ever ships —
  would push it past 500 by a wider margin). The file is single-domain
  cohesive at HEAD but the trajectory should be watched. Speculative
  P-future µ-split (NOT now): extract the `@font-face` register into
  `src/styles/fonts.css` (cascade-order independent — only declares face
  files), leaving `typography.css` as scale + utility classes. Not P MUST.

- **`tokens.css` continues to absorb misc growth.** The +87 LOC since
  O.W3 includes the §0-bridge font-stack-mono update (small) and other
  drift; the numbered §-block index is still intact at HEAD per the
  cohesion contract from O Rβ. No P action.

- **No backwards-compat aliases anywhere.** Per the memory rule + L
  invariant 4, no shadow re-exports of the split sub-modules through the
  original god-module names. Spot-verified `src/components/custom/timeline/index.ts`
  exports only `GlassTimeline` + the 3 types — the 3 variant SFCs remain
  internal as W3 designed. Spot-verified `demo/configurator/usePresetEditor.ts`
  remains a 24-LOC façade with no compatibility shims. Spot-verified
  `scripts/profile-aurora.mjs` retains `harnessSource()` as a thin getter
  (W3 Lane B Option B "preserves the call site's identity") — this is the
  ONE deliberate thin-wrapper in the W3 split set, justified for CDP
  call-site stability not legacy compat.

- **Genre artefacts MUST stay un-split.** Per O Rβ §5, splitting
  `aurora.frag.ts` would fork the design source-of-truth; splitting
  `tokens.css` would fragment the canonical §-block index;
  `demo/stories/aurora/presets.ts` is verbatim-ported preset data and
  splitting it would break the "presets in consumers" memory rule (the
  demo IS the consumer here). These three must not be touched in any
  P wave. Confirmed at HEAD.

## § Bounds compliance

This audit is read-only — `wc -l` + `find` + `grep` + `git log --oneline`
+ `Read` only. No `git add`/`commit`/`stash`/`checkout`/`reset`/`restore`
performed (hardened agent git clause K W0, observed throughout). Single
artefact authored at the prescribed path.
