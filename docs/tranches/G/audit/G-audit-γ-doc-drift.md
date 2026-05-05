# G — Post-close challenge audit γ (documentation drift + recovery integrity)

**Author**: agent G.audit.γ.
**Mode**: read-only post-close audit.
**Date**: 2026-05-04.
**Worktree**: `/Users/mkbabb/Programming/glass-ui` at branch `o-w2_7-instrument-chassis`.
**Authority cited by user**: "any deferred items, or in particular chronically deferred items, must be noted and explicitly addressed herein."

## 1 — Header

This audit answers a single load-bearing question:

**Is tranche G's "closed clean" honest?**

Per `docs/precepts/instructions/tranche/SPEC.md`, a tranche closes when "every planned item landed, was retired, or has a named destination; ... `PROGRESS.md` matches reality; `FINAL.md` cites commits and artefacts; open brittleness windows are restored."

Per `docs/precepts/instructions/README.md`, "no silent deferrals. Planned work lands, is formally retired, or moves to a named destination with rationale."

R1 in `audit/W6-residuals.md` deferred the entire DESIGN.md sync — 57 drift rows + 8 new-token sections — to "a small follow-up pass after agent capacity returns." The destination is "a small follow-up pass." There is no named tranche letter, no wave letter, no date, no ticket. **Three of the planned waves' outcome documents (PROGRESS.md, FINAL.md, W1.md status line) describe an applied DESIGN.md sync that did not land.**

The tranche is not honestly closed.

## 2 — DESIGN.md drift table (every W0.β row × current state at HEAD × verdict)

DESIGN.md at HEAD is **916 lines** (residuals.md says "915" — off by one because the tree has one z-index header line added beyond `master`). Master is **915 lines**. Diff vs master is 33 lines, all in the z-index table.

Drift verdict per row from `audit/W0-design-md-drift.md`:

| # | Section / claim | DESIGN.md HEAD | Canon | Status |
|---|---|---|---|---|
| 1 | `--z-hovercard 60` | `120` | `120` (tokens.css:101) | **closed** |
| 2 | `--z-tooltip 60` | `120` | `120` | **closed** |
| 3 | `--z-popover 70` | `130` | `130` | **closed** |
| 4 | `--z-modal 80` | `140` | `140` | **closed** |
| 5 | `--z-fullscreen 90` | `150` | `150` | **closed** |
| 6 | `--z-toast 100` | `160` | `160` | **closed** |
| 7 | `--z-toggle` missing row | row added (`999`) | `999` | **closed** |
| 8 | Overlays table z-index drift (`--z-modal (80)` etc., DESIGN.md:564–570) | **still 50/60/70/80** | canon 120/130/140/etc. | **OPEN** |
| 9 | `--radius 0.5rem (8 px)` | `0.5rem` (line 130) | `0.625rem` (10 px) | **OPEN** |
| 10 | `--radius-lg` listed 8 px | 8 px (line 133) | resolves to 10 px | **OPEN** |
| 11 | `--radius-input` listed 8 px | 8 px (line 140) | resolves to 10 px | **OPEN** |
| 12 | `--radius-button` listed 8 px | 8 px (line 141) | resolves to 10 px | **OPEN** |
| 13 | `--radius-xs` row missing | missing | `--radius-xs: 4px` (tokens.css:115) | **OPEN** |
| 14 | Elevation shadows use rgba literals | rgba (lines 152–157) | `color-mix(... var(--shadow-color))` | **OPEN** |
| 15 | Cartoon shadows use rgba literals | rgba (lines 162–172) | `color-mix(... var(--shadow-color))` | **OPEN** |
| 16 | `--shadow-card: 4px 4px 0 0 rgba(0,0,0,0.50)` | unchanged (line 179) | `var(--shadow-cartoon)` = 3px+3px, 8% foreground | **OPEN** |
| 17 | `--shadow-card-hover: 5px 5px 0 0 rgba(0,0,0,0.60)` | unchanged (line 180) | does not exist; canon emits `--shadow-cartoon-hover` | **OPEN** |
| 18 | `--shadow-dock: rgba(0,0,0,0.25), rgba(0,0,0,0.15)` | unchanged (line 186) | `color-mix(... 18%), color-mix(... 10%)` | **OPEN** |
| 19 | `--shadow-dock-collapsed: rgba(0,0,0,0.20), rgba(0,0,0,0.15)` | unchanged | `color-mix(... 14%), color-mix(... 10%)` | **OPEN** |
| 20 | `--glass-shadow-subtle` | matches | matches | n/a (already matched) |
| 21 | Subtle Light opacity 30% | 30% (line 207) | 0.82 | **OPEN** |
| 22 | Subtle Dark opacity 42% | 42% (line 207) | 0.90 in `.dark` | **OPEN** |
| 23 | Subtle blur `blur(4px) saturate(1.05)` | 4px (line 207) | radius 1px | **OPEN** |
| 24 | Default blur `blur(8px) saturate(1.2)` | 8px (line 208) | radius 3px, no saturate | **OPEN** |
| 25 | Medium blur `blur(12px) saturate(1.3)` | 12px (line 209) | radius 3px | **OPEN** |
| 26 | Elevated blur `blur(16px) saturate(1.4)` | 16px (line 210) | radius 4px | **OPEN** |
| 27 | grain opacity 3.5% | 3.5% (line 216) | matches | n/a (already matched) |
| 28 | dock blur `blur(2px) saturate(1.025)` | 2px (line 219) | radius 1px | **OPEN** |
| 29 | `.text-display-5` weight 300 | 300 (line 354) | `var(--font-display-weight)` = 400 | **OPEN** |
| 30 | `.text-display-{4,3,2,1}` weight 350 | 350 (lines 355–358) | all 400 | **OPEN** |
| 31 | `.text-mono-caption` size — matches | matches | matches | n/a |
| 32 | `.text-mono-micro` row missing | missing | `@utility text-mono-micro` exists | **OPEN** |
| 33 | `.text-admin-label` row missing | missing | `@utility text-admin-label` exists | **OPEN** |
| 34 | `.text-math` / `.text-math-body` rows missing | missing | both `@utility` blocks emitted | **OPEN** |
| 35 | `.text-pane-title` row missing | missing | rule emitted (typography.css:297) | **OPEN** |
| 36 | `.text-engraved` row missing | missing | rule emitted (typography.css:338) | **OPEN** |
| 37 | `--tracking-snug` row missing | missing | declared (typography.css:66) | **OPEN** |
| 38 | `--font-brand-sans` documentation | line 310 mentions it; not in primary tokens table | declared (typography.css:17) | **partial** (editorial) |
| 39 | `.dock-label` claimed pinned | DESIGN.md:344, 511 unchanged | **no `.dock-label` rule exists in `src/styles/*` or `src/components/`** | **OPEN — phantom utility still claimed** |
| 40 | `.icon-{xs..xl}` claimed | line 637 unchanged | utilities now exist as `.icon-{xs..mega}` (utilities.css:263–270) | **OPEN — claim is stale on both sides** |
| 41 | `--animation-slide-{sm,md,lg}` | lines 696–699 unchanged | canon names them `--motion-slide-*` (tokens.css:397–399) | **OPEN** |
| 42 | `--stack-overlap-*` declared as canonical | lines 679–683 unchanged | tokens not declared in canon (only consumed in `StackedIconGroup.vue`) | **OPEN** |
| 43 | `--color-divider-*` declared as canonical | lines 661–665 unchanged | tokens not declared in canon | **OPEN** |
| 44 | `--color-status-{active,paused,idle}` claimed | lines 733–735 unchanged | not declared (canon uses `--success`, `--warning`, `--info`, `--muted-foreground`) | **OPEN** |
| 45 | `--color-gold` framed as primitive | line 741 unchanged | canon primitive is `--gold`; `--color-gold` is `@theme` alias | **OPEN** |
| 46 | "Rainbow vivid / pastel (7 hues each, 0° → 300°)" | line 746 unchanged | canon hues 0,30,55,130,210,260,300 / 0,25,50,130,220,260,280 | **OPEN** |
| 47 | `--shimmer-blue-{dark,mid,light}` token values | lines 752–755 list 224/217/213 | canon: `220 80% 35%` / `210 90% 55%` / `200 100% 75%` (tokens.css:490–492) | **OPEN — values themselves are wrong, plus the corresponding light-mode HSL channels in dark mirror are also wrong** |
| 48 | `--heatmap-{1..10}-bg`/`-fg` claimed | line 760 unchanged | not declared in canon | **OPEN** |
| 49 | `--accent-pink` / `--accent-red` / `--shadow:` not described as canon | lines 713–728 silent | canonical (W0 challenge §B.1 rescinded retirement) — must be documented | **OPEN** |
| 50 | `.glass-btn` Hover "15% foreground color" | line 433 unchanged | canon: `color: var(--foreground)` (full opacity) (glass.css:128) | **OPEN** |
| 51 | `.glass-btn` Disabled "50% opacity" | line 436 unchanged | canon: `opacity: 0.35` literal (glass.css:142) | **OPEN** (also a source-side hygiene issue: canon should consume `--opacity-disabled`) |
| 52 | `.glass-btn` Focus "box-shadow" | line 435 unchanged | canon: `outline: var(--focus-ring-width) solid var(--ring); outline-offset` (glass.css:137–138) | **OPEN** |
| 53 | `.glass-pill` description | line 224 unchanged | rule does not exist in glass.css; canon ships `.glass-card` + `.glass-cartoon` only — `.glass-pill` is also a phantom utility | **OPEN — second phantom utility (matches row 39)** |
| 54 | `pop` enter `200 ms --spring-bouncy` / leave `200 ms --ease-out` | line 589 unchanged | `transitions.css` `pop-*-active` blocks present; durations need byte-verification post-doc-sync | **unverified** |
| 55 | `.btn-pill` "transition all 200ms" | line 392 unchanged | canon emits per-property transition list at `--duration-fast` (glass.css:162–168) | **OPEN** |
| 56 | "tabs (BouncyTabs, UnderlineTabs, BouncyToggle)" | line 773 unchanged | tabs package exists; specific named subcomponents need verification | **unverified** |
| 57 | Runtime Tokens block lists only 4 exports | line 819 unchanged | canon ships 7 (`chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `NAMED_EASING_BEZIER`, `goldenShimmer`) (tokens.ts) | **OPEN — 5 G-shipped exports undocumented** |

**Plus** the new-token sections that R1 says were planned but never landed: `--cream-*`, `--paper-bg-*`, `--icon-{2xl,3xl,mega}`, `--shadow-cartoon-accent`, `--space-phi-*`, `--shimmer-blue-*` (referenced but values wrong), `--blob-*` (8 tokens), `--type-display-mega`, `--type-display-ultra`, `--type-formula`, `--tracking-tightest`, per-rung Fraunces variation axes — **none documented in DESIGN.md.** The cream namespace, paper tier, and blob primitives are entire vocabularies that the FINAL.md thesis cites as the *core delivered axes* of tranche G.

### Counts

- **Drift rows closed**: 7 (z-index table only).
- **Drift rows open**: 47.
- **Drift rows unverified** (need full-source comparison): 2 (rows 54, 56).
- **New-token sections never authored**: 8 (cream, paper, icon-extension, shadow-cartoon-accent, φ-spacing, shimmer-blue values, blob primitives, audacious typography rungs + per-rung Fraunces).

This is exactly what `audit/W6-residuals.md` R1 says the deferred follow-up needs to do. It has not happened.

## 3 — PROGRESS.md vs reality

Claim-by-claim verification:

| PROGRESS.md claim | Actual state | Verdict |
|---|---|---|
| W1: "parallel agent applied 56 drift rows + 8 new-token sections + 4 verify-row dispositions"; "File: 916 → 1081 lines" | DESIGN.md = **916 lines**; only 7 drift rows applied; 0 new-token sections | **FALSE** — described an outcome that did not survive to disk |
| W3 close: "DESIGN.md sync (separate W1 docs work, ~165 lines) deferred to W5 close re-dispatch — not blocking" | re-dispatch ran but didn't write before API limit per retro | **partially honest** — names the deferral but not its destination |
| W5 close: "5 named residuals (W6-residuals.md): R1 DESIGN.md sync re-apply (deferred — agent API limit blocked re-sync; small follow-up pass when capacity returns)" | matches W6-residuals.md text verbatim | **honest about the deferral but the destination is unnamed** (no tranche letter, no wave letter, no date) |
| Status table claims all waves "complete" | W1's wave-spec status line is internally inconsistent (claims DESIGN.md grew to 1081 lines); the *components* of W1 closed but the *DESIGN.md half* of W1 did not | **misleading** — "complete" without a recovery footnote |
| Aggregate "Diff vs master: 3,065 insertions / 515 deletions across 59 files" | matches `git diff master --shortstat` exactly | **honest** (with the legitimate caveat that the diff includes prior `instrument-chassis` + `glyph-face` work, which FINAL.md acknowledges) |

**PROGRESS.md misalignments**: 2 high-severity (W1 close paragraph; W1 row in status table — both describe a DESIGN.md outcome that no longer exists), 1 medium-severity (R1's destination is "a small follow-up pass" with no named tranche).

## 4 — Wave-spec status drift

| Wave | Status line | Reality | Verdict |
|---|---|---|---|
| W0.md | "complete (closed 2026-05-04 — α/β/γ outputs in `audit/W0-{...}.md`...)" | all four audit docs present | **honest** |
| W1.md | "complete... DESIGN.md grew **916→1081 lines** with 57 drift rows fixed + 8 new-token sections added" | DESIGN.md is **916 lines**; 7 drift rows fixed; 0 new-token sections | **FALSE** — wave-spec status line documents an outcome that did not land. Should read "complete (token side); DESIGN.md sync regressed via Lane 4 stash; deferred to R1" |
| W2.md | "complete... 49 utility classes added" | utilities.css ships 49+ classes; build green | **honest** |
| W3.md | "complete (closed 2026-05-04 — orchestrator + 5 dispatched lanes + 3 residual-recovery agents post watchdog stalls; 14 new custom packages...)" | code is on disk; 14 CVA branches + 14 packages + 4 composables verifiable | **honest** about delivery; non-honest about residual count — only mentions stash regression without flagging that DESIGN.md sync was a casualty |
| W4.md | "complete (closed 2026-05-04 — Lane I 12 stories + 2 refactors; Lane II 11 stories + 1 refactor + 1 rename...)" | demo/stories layout matches | **honest** |
| W5.md | "complete (closed 2026-05-04 — six consumer ledgers... 5 named residuals all with named destinations)" | residuals are named, but R1's destination is informal | **partially honest** — "named destination" stretches to describe "a small follow-up pass after agent capacity returns" |
| Wβ0–Wβ3.md | "complete..." per spec | matches BLOB-FINAL.md and on-disk evidence | **honest** |

**Critical**: W1.md is the load-bearing one. Its status line claims DESIGN.md grew to 1081 lines. The line did not survive. The status line itself is now a documentation drift artefact that the audit cycle must repair.

## 5 — FINAL.md deliverable verification

Claim-by-claim:

| FINAL.md claim | Disk reality | Verdict |
|---|---|---|
| "17 new custom packages" — listed: CreamSurface, DisplayHero, FlourishDivider, IconStamp, MathSurface, MathFormula, MathGlyph, KeyframeTimeline family, BezierCurveCanvas, NotificationDot, KeyboardShortcutsModal, TierBadge, LikeButton, PipelineFlow, LiveSnippet, Blob, Swatch, SvgFilters+RainbowGradientDef | All 17 directories exist under `src/components/custom/` (timeline/, bezier-canvas/, etc.). **However** `timeline/` (KeyframeTimeline family, 5 components) is NOT exported from `src/index.ts` — the public API is missing this package. | **15/17 publicly exported; 2 packages exist but ship private** (timeline/ + paper-backdrop/) |
| "14 CVA branches across `Button`, `Tabs`, `Select`, `Input`, `NumberField`, `Toast`, `Badge`, `MetricBadge`, `ToggleGroupItem`, `Card`, `StatusDot`, `GlassDock`" | Verified: Button cartoon/transport/rainbow + size icon (4), Tabs underline/pill (2), Select cartoon (1), Input cartoon (1), NumberField cartoon (1), Toast inverse (1), Badge color/tone (2), MetricBadge size=xl (1), ToggleGroupItem variant=card (1), Card cream + paper (2), StatusDot variant=progress (1), GlassDock safe-area-inset (1) — **14** | **honest** |
| "4 new composables: `useRAFLoop`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`" | All four files exist under `src/composables/{motion,color,monaco}/` | **honest** |
| "7 blob composables: `useBlob` + `useMetaballRenderer` + `useBlobMood` + `useBlobPointer` + `useBlobSatellites` + `useWatercolorBlob` + types" | All exist in `src/composables/blob/` plus GLSL pair, canvas2d-fallback, mulberry32 | **honest** |
| "3 slot-class props: `HoverCardContent.contentClass`, `DialogContent.closeIconClass`, `DockLayerGroup.keepOpenWhile`" | All three found in source | **honest** |
| "1 factory: `defineDockActionBar()`" | found in `src/components/custom/dock/index.ts:45` | **honest** |
| "5 runtime helpers in `src/tokens.ts`: `chartNeutrals`, `vizColorsHex`, `spectrumColor()`, `NAMED_EASING_BEZIER`, `goldenShimmer()`" | All five exported (tokens.ts lines 43, 62, 84, 97, 110) | **honest** |
| "49 utility classes" | utilities.css ships ≥49 classes (`text-shimmer-{4}`, `bg-rainbow{,-vivid,-pastel}`, `divider-flourish-{15}`, `flourish-stripe-{3}`, `code-badge`, `icon-stamp`, `icon-emboss`, `icon-{8 sizes}`, `text-display-stat`, `text-prose-lettrine`, `text-mono-{2}`, `section-subtitle`, `well-dashed`, `touch-gate-{2}`, `confetti-piece`, `collapse-x`, etc.) — count on disk ≈ 49 | **honest** |
| "11 token namespaces" | cream, paper, icon-extension, shadow-cartoon-accent, space-phi, shimmer-blue, blob-primitives, type-display-mega/ultra, type-formula, tracking-tightest, per-rung Fraunces — counts to ~11 | **honest** |
| "4 keyframes: `confetti-fall`, `rainbow-drift`, `idle-bob`, [+`sparkle-sweep`?]" | animations.css ships `sparkle-sweep`, `rainbow-drift`, `idle-bob`, `confetti-fall` — exactly 4 G-era keyframes | **honest** |
| "1 transition pair: pane-swap-scale" | transitions.css:200, 206, 212, 217 ship `pane-swap-scale` enter/leave | **honest** |
| "25 stories" | demo/stories has 30 + `_internal/blob-stress`; 25 of those are W4 W4-tagged | **plausible** (count not strictly verifiable without per-story audit) |
| Build state at close: typecheck green; `npm run build` 27.69s | not re-run by this audit | **trusted** (per orchestrator report) |
| Diff vs master 3065+/515- across 59 files | exact match against `git diff master --shortstat` | **honest** |
| "5 named residuals" | residuals enumerated, but R1's "named destination" is "a small follow-up pass after agent capacity returns" — not a named tranche/wave/date | **stretched honest** |
| Brittleness window: "None opened during G" | de facto: the W1+W2 stash regression *was* an unplanned brittleness window. See §8. | **dishonest by construction** — the regression broke working-tree coherence; the recovery patched components but not docs |

**FINAL.md misalignments**: 1 high-severity (timeline/ package not publicly exported, contradicting "17 new custom packages"); 1 medium (R1 destination unnamed); 1 medium (brittleness window claim contradicts what actually happened — see §8).

## 6 — CLAUDE.md drift

CLAUDE.md was last touched in tranche F or earlier and remains at master state. Tranche G touched none of it.

Stated drift:
- **"39 ui package barrels + 24 custom package barrels"** — accurate for ui (40 dirs incl. index.ts → 39 packages); custom is now 42 dirs (G shipped 17 new + earlier expansion). **DRIFT.**
- **`src/components/custom/index.ts`** referenced as a barrel — file does not exist (`ls` returns "No such file or directory"). **DRIFT** (predates G, but G's expansion makes the missing barrel more painful).
- **`src/components/index.ts`** referenced — file does not exist. **DRIFT.**
- **Storage cascade list** at line 95–106 omits `paper.css`, `math.css`, `prism-theme.css`, `instrument-chassis.css`, `glyph-face.css`. **DRIFT** (G shipped 3 of those 5).
- **Component architecture / Button variants** lists 8 variants `default | destructive | outline | secondary | ghost | link | glass | glass-subtle`. Canon now ships 13 variants (adds `accent`, `ai`, `danger-subtle`, `cartoon`, `transport`, `rainbow`). **DRIFT.**
- **Composables description** at end of CLAUDE.md misses `useRAFLoop`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`, `useDarkModeSync`, the blob composable family, and `useInfiniteScroll`'s now-public location. **DRIFT.**

**Recommendation**: CLAUDE.md should have been updated as part of W3 close. It wasn't. This is a small additional silent deferral baked into the close.

## 7 — Recovery integrity audit (W1 + W2 stash regression)

The retro states:
> Lane 4 residual `git stash` regression. A residual agent's `git stash` / `git stash pop` round-trip silently reverted all W1+W2 orchestrator-direct edits to tokens.css/typography.css/theme.css/tokens.ts/cards.css/paper.css/utilities.css/index.css/package.json/DESIGN.md.

I verified the recovery against canon expectations:

### Recovered (idiomatic, byte-equivalent or close)

- `tokens.css` `cream` namespace, paper tier, icon scale extension, `shadow-cartoon-accent` recipe, `space-phi-{1..4}`, `shimmer-blue-{dark,mid,light}`, all 8 blob primitives, retired `--section-heading`. Verified against the values quoted in W1's wave-spec deliverable list — matches.
- `typography.css` `--type-display-mega`, `--type-display-ultra`, `--type-formula`, `--tracking-tightest`, per-rung Fraunces axes, retired `brand-uniform-sans` block. Matches.
- `theme.css` `@theme` exposures for cream, rainbow-pastel, shimmer-blue, spacing-phi, size-icon, text-display-mega/ultra, tracking-tightest, shadow-cartoon-accent. Matches.
- `tokens.ts` 5 runtime helpers. Matches.
- `cards.css` `.cream-surface` + tone variants. Matches.
- `paper.css` `.paper-{1..4}` + `.paper-card` + `.paper-rule`. Matches.
- `utilities.css` 49 utility classes. Matches.
- `index.css` math.css cascade entry. Matches.
- `package.json` `./styles/prism-theme` export. Matches (assumed; not pulled into this audit's read-set).

### NOT recovered (chronic deferral)

- **DESIGN.md sync** — the only artefact in the regression list that did not survive to disk and has not been re-applied.

### Naming reconciliation

`useRafLoop` ↔ `useRAFLoop`: examined `src/composables/motion/useRAFLoop.ts`. The file ships **two distinct functions**: `useRAFLoop` (per-instance loop with manual controls + visibility/PRM gating; lines 1–274) and `useRafLoop` (shared frame coalescer; lines 361+). The retro framed this as a naming reconciliation; in fact they are two primitives co-located in one module. The barrel re-exports both. **This is not a back-compat shim** — both are intentional public APIs. The naming is admittedly confusing; if the orchestrator intended a clean break, they would have renamed the shared coalescer (e.g., `useSharedRaf`) rather than kept the old camelCase name beside the new acronym-cap name. As shipped, this reads as drift between agent intent and final shape.

### Wβ3 font-variation-settings fix

The retro names "single-quote-inside-single-quote → escaped" as the fix. I read the affected file (`DisplayHero.vue:53–63`). The actual form is single-quote-outside / double-quote-inside (`'"WONK" 1, "SOFT" 50, "wdth" 115'`). This is the simpler correct form, not an escape; the retro's "escaped" framing is imprecise but the fix itself is clean. `Blob.vue:180` and `MathGlyph.vue:85` use unquoted multi-line CSS values, which is also clean. **Fix is idiomatic.**

### Verdict

Recovery of *runtime tokens, utilities, and components* is byte-equivalent to the original work and idiomatic. Recovery of DESIGN.md is **not done at all**. R1 is the only chronic deferral.

## 8 — Brittleness window argument

Per `tranche/SPEC.md` §Brittleness Window:

> Some tranches intentionally break the tree inside a wave or across a small span. Declare that before dispatch... The close ceremony cannot run while a brittleness window is open.

Tranche G plan declares **none**. Yet:

1. The Lane 4 stash regression broke the working tree mid-W3. Tokens, theme, typography, cards, paper, utilities, index.css, package.json, **and** DESIGN.md were silently reverted to master state. This is exactly the condition `tranche/SPEC.md` describes ("intentionally break the tree inside a wave"), except it was *unintentional*.
2. The orchestrator recovered everything *except* DESIGN.md before close.
3. R1 is the documentary residual of that broken-and-not-fully-restored window.

**Argument for "yes, R1 is a de facto brittleness window"**:

- The DESIGN.md drift is structural: 47 open rows + 8 missing new-token sections describe a documentation surface that contradicts canonical source on z-index overlay table, all radii claims, all glass-tier blur claims, all glass-tier opacity claims, the card shadow recipe (which now describes a token that does not exist: `--shadow-card-hover`), the dock shadow recipes, six glass utility table rows, multiple typography weight claims, six missing utility class rows, five missing token rows, the dock-label phantom utility claim, the icon-utility claim, the animation-slide token name, three separate "claimed but undeclared" token families (`--stack-overlap-*`, `--color-divider-*`, `--color-status-*`), the rainbow hue claim, the shimmer-blue values, the heatmap claim, the accent-pink/red/`--shadow:` documentation gap, the `.glass-btn` hover/disabled/focus claims, the `.btn-pill` transition claim, the `.glass-pill` phantom utility claim, and the runtime tokens section (5 G-shipped exports undocumented). This is not "a small follow-up pass." This is the entire docs half of W1.
- Per the precept text "no silent deferrals," R1 has a destination ("a small follow-up pass after agent capacity returns") that names neither a tranche letter, nor a wave letter, nor a date, nor a ticket. "Agent capacity returns" is not a destination — it's a vibe.
- Per `SPEC.md`'s close criterion "open brittleness windows are restored," the window is unrestored. The close ceremony ran anyway.

**Argument for "no, this is just a normal residual"**:

- The build is green. Components compile. Types check. Stories render.
- Consumers can read `tokens.css` / `typography.css` / `theme.css` directly to see canon values. DESIGN.md is the *narrative* projection of canon, not a runtime input.
- R2–R5 are *true* deferrals (consumer-CI capture, future-tranche refactors, ≥2-bar trigger, performance-signal trigger). They are residuals in the precept's intended sense.
- The orchestrator absorbed and re-applied the load-bearing tokens. The docs surface is a known lagging indicator and is itemized for repair.

**Conclusion**:

R1 *is* a de facto brittleness window in the spec's structural sense. The close ran without restoration. The G-retro "process precepts to add" section already names the root cause: "Never use `git stash` ... as agent recovery" + "Orchestrator commits at wave close." Both of these would have prevented R1.

The honest framing is:

> *The close is provisional. The component delivery is honest and complete. The narrative documentation surface is in regression and the residual lacks a named destination. A formal G-II tranche or G.W6 restoration wave should be opened before any subsequent tranche begins, with R1 (DESIGN.md sync re-apply) and the CLAUDE.md update as the only scoped items. The wave is small (~165 lines docs-only) and can be a single agent dispatch.*

## 9 — Recommendations

Rank-ordered by load-bearing:

1. **Open `G-II.W1.docs`** (or equivalently named restoration wave) with a binding scope: apply the 47 open W0.β drift rows + author the 8 missing new-token sections + verify the 2 `unverified` rows (54: `pop` transition durations; 56: tabs subcomponent names) + correct the shimmer-blue value drift (DESIGN.md ≠ tokens.css). Single agent, single file edit, hard gate = `git diff master -- DESIGN.md | wc -l` ≥ 400 lines (rough size of the original landing). Open this **before** any subsequent tranche letter begins.
2. **Update `audit/W6-residuals.md` R1's destination** from "a small follow-up pass after agent capacity returns" to a named tranche/wave (e.g., "G-II.W1.docs" or "G.W6"). Record the open date.
3. **Correct `PROGRESS.md` W1 close paragraph** to say "DESIGN.md sync regressed via Lane 4 stash; deferred to R1" instead of asserting "916 → 1081 lines" as if that survived.
4. **Correct `waves/W1.md` Status line** to remove the "DESIGN.md grew 916→1081 lines with 57 drift rows fixed + 8 new-token sections added" claim and replace with "DESIGN.md sync regressed; R1 owns restoration."
5. **Correct `FINAL.md` Brittleness window section** from "None opened during G" to "Lane 4 stash regression mid-W3 created an unplanned brittleness window; tokens/utilities/components recovered byte-equivalent; DESIGN.md restoration deferred as R1 — open until G-II.W1.docs lands."
6. **Update `CLAUDE.md`** at minimum: custom-package count (42, not 26), Button variants (13, not 8), composables index (add `useRAFLoop`, `useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`, `useDarkModeSync`, blob family), styles cascade (add paper.css/math.css/prism-theme.css/instrument-chassis.css/glyph-face.css), and either delete the `src/components/{custom,}/index.ts` barrel references or actually create those barrels.
7. **Export `timeline/` from `src/index.ts`** — FINAL.md claims 17 packages publicly delivered; 2 of them are not. Either remove the claim or wire the export.
8. **Lock the precept**: orchestrator commits at wave close. The G-retro identified this. Promote it from retrospective text into `docs/precepts/instructions/ORCHESTRATION.md` as a binding rule. The R1 residual is the cost of not having had it.

The first three actions take an hour total. The fourth and fifth take ten minutes. The sixth and seventh take twenty minutes. The eighth is a precept edit.

Tranche G's component delivery is real. The close ceremony is provisional. The path back to honest is short.
