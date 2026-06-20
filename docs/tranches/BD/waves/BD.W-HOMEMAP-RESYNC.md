# BD.W-HOMEMAP-RESYNC

## (1) Band + goal

**Band 6 — Precept canon. BUILDS — widens `proof:precept-current` W2 to non-top-level partials.**

Resync `docs/precepts/design-idioms.md §3` home-map onto the BC src/styles reality AND widen `proof:precept-current` W2 to catch non-top-level shared-register partials. Add §3 rows for the unhomed BC/BB registers, add a `utilities/*.css` home-map glob row (mirroring `glass/*.css`), and widen W2 (`proof-precept-current.mjs`) to scan `utilities/` + `glass/` sub-partials for self-tagged shared registers — not only top-level `index.css` imports. This is a TWO-HALF wave: the §3 doc half (a submodule commit) + the gate src half (a glass-ui `scripts/` edit, the BUILD).

## (2) Starting state — the exact on-disk reality

- **`docs/precepts/design-idioms.md §3` (VERIFIED, read in full, `:82-133`):** the home-map table (`:87-99`) carries 13 rows (typography, interactive/button → `utilities/btn.css`, popover/entry → `utilities/animate.css`, a11y → `utilities/a11y-overrides.css`, glass surface → `glass/*.css`, feedback tone → `feedback-tone.css`, menu glass → `menu.css`, paper texture, card/cartoon, dock control, instrument chassis). The shared-register subsection (`:101-133`) names THREE BA-shipped files (`glass/surface-axis.css`, `feedback-tone.css`, `menu.css`). The §3 was last refreshed BB (the `[data-phase]` instrument-chassis row references BB.W-PHASE-PALETTE).
- **The unhomed BC/BB registers (all VERIFIED present on disk):**
  - `src/styles/utilities/metal.css` (BB.W-METAL-SHIMMER) — header (read in full, `:1-12`): "the brand-metal utility family … ONE single-home partial for the gold·silver·bronze metal register … Three registers, ALL metal-PARAMETERIZED off the SAME shared recipe." A SHARED register (≥2 consumers incl. completion-seal per BB.W-METAL-SHIMMER's M7e). **`@import`-ed by `utilities.css:23`** (`@import "./utilities/metal.css";`) — NOT a top-level `index.css` import, so `topLevelImports(indexSrc)` does NOT see it.
  - `src/styles/glass/accent-tone.css` (BC.W-ACCENT-TONE) — header (read in full): "the contrast-floored 3-channel tonal-accent register. ONE `--tone` … → a coherent, contrast-SAFE four-channel tonal set." A SHARED register. **`@import`-ed by `glass.css:53`** (under `glass/`), so it is COVERED by the existing `glass/*.css` glob row for W3 resolution — but it deserves a shared-register MENTION (the surface-axis precedent in `:106-113`) and W2 cannot reach it.
  - `src/styles/completion-seal.css` (BC.W-AX-COMPLETION-SEAL) — header (`:1`): "the hero-scale earned-GOLD completion seal." A COMPONENT-family partial. **`@import`-ed top-level by `index.css:209`.**
  - `src/styles/border-progress.css` (BB.W-BORDER-PROGRESS) — header (`:1`): "progress IS the element's border." A COMPONENT-family partial. **`@import`-ed top-level by `index.css:201`.**
  - `src/styles/dock/cta-seat.css` (BC.W-AX-DOCK-CTA-SEAT) — header (`:1`): "the `[data-cta-pending]` CTA-receive landing SEAT." A COMPONENT-family partial under `dock/`.
- **`proof-precept-current.mjs` W2 gap (VERIFIED, read in full, `:243-263`):** W2 (`detectPreceptDrift` `:247-263`) iterates `topLevelImports(indexSrc)` (`:186-191`: `for (const m of indexSrc.matchAll(/@import\s+"\.\/([\w-]+\.css)"/g))` — matches ONLY `@import "./foo.css"`, NOT `./utilities/foo.css` or `./glass/foo.css`). `isSharedRegisterPartial(partial, indexSrc)` (`:195-211`) reads the partial header + the index.css ledger line for the shared-register self-tag. So a `utilities/`-nested shared register (`metal.css`) is INVISIBLE to W2 — the exact "top-level-only gap" the candidate names, recurring one level down the tree from the gate's own header (`:4-11` describes the doc-drift class the gate locks). The §3-row parse shape (`parseHomeMap` `:109-150`) reads each data row's FILE column code-span as `src/styles/<path>` and the EXAMPLES column code-spans. The self-test (`:291-327`) supplies inline STALE/CLEAN §3 fixtures (NOT the submodule) and asserts the detector flags the planted drifts.
- **The gate's header spec (VERIFIED, `:1-40`):** "THE DERIVATION … the gate hardcodes NO file list. Three derived sources of truth: the home-map FILE CELLS + EXAMPLE CELLS … the live `src/styles/` RECIPE CENSUS … the cascade-ledger SELF-TAGGING." W2: "every shipped shared-register idiom file (cascade-ledger self-tagged) is in a §3 home-map file cell (feedback-tone/menu; surface-axis is glass/*-glob-covered). A NEW shared register without a row REDS."

The decision: FOLD-LEDGER `→BD.W-HOMEMAP-RESYNC` — "Add the §3 rows + widen proof:precept-current W2 to non-top-level partials (a BUILD)."

## (3) The build — TWO halves (the §3 doc half + the gate src half)

### Half A — the §3 home-map rows (a submodule commit, orchestrator-owned)

Add to `design-idioms.md §3` (placed in the CORRECT class per the ROW-SHAPE FENCE):

1. **A `brand metal` SHARED-register row** for `utilities/metal.css` (the cohesion-domain table, `:87-99`):
   ```
   | brand metal | `src/styles/utilities/metal.css` | `.metal-{gold,silver,bronze}` text-clip + `.metal-*-border` swept rim + `.metal-rainbow-rim` (the ONE shared brand-metal register; the gold·silver·bronze quad off `@keyframes metal-shimmer-sweep` reading `--metal-shimmer-color`; ≥2 consumers incl. completion-seal's `--metal-glow-*`) |
   ```
   The cell file path must be `src/styles/utilities/metal.css` (the W3 parse target) and the row carries the "the ONE shared … register" self-tag the W2 detector matches.
2. **A `tonal accent` SHARED-register MENTION** in the shared-register subsection (`:101-133`) for `glass/accent-tone.css` (it is `glass/*`-glob-covered for W3, so it needs the shared-register NOTE, not a new file-cell row that would duplicate the glob coverage):
   ```
   - **`glass/accent-tone.css`** — the BC.W-ACCENT-TONE 3-channel tonal-accent
     register (`--tone` → `--accent-fill`/`--accent-border`/`--accent-text`,
     contrast-floored). `@import`s under `glass/` (`glass.css:53`), glob-covered
     by the `glass/*.css` §3 row; recorded here as a SHARED register (the
     surface-axis precedent) so it is not mistaken for a per-component partial.
   ```
3. **COMPONENT-family rows** (the cohesion-domain table) for the three component partials (these are NOT shared registers — they own a component family, so they fold into the component-row class):
   ```
   | border-progress | `src/styles/border-progress.css` | the masked-conic `.border-progress__ring` (progress IS the element's border; `@property --border-progress-fill`); a COMPONENT-family partial (`<BorderProgress>`), top-level `index.css:201` |
   | completion-seal | `src/styles/completion-seal.css` | the gold-draw `.completion-seal` recipe (the `--seal-draw`/`--seal-scale`/`--seal-glint`/`--seal-ink` @property wipe); a COMPONENT-family partial (`<CompletionSeal>`), top-level `index.css:209` |
   | dock CTA seat | `src/styles/dock/cta-seat.css` | the `[data-cta-pending]` CTA-receive landing seat (the `setPending`/`clearPending` reserve→reveal FLIP); a COMPONENT-family partial under `dock/` |
   ```
4. **A `utilities/*.css` glob row** (mirroring the `glass/*.css` row) so W3 resolves any `utilities/`-nested partial via the glob (the candidate's "Add a `utilities/*.css` home-map glob row"):
   ```
   | utilities (general) | `src/styles/utilities/*.css` | the `utilities/` partial set (btn/animate/a11y-overrides/base/base-misc/metal — the catch-all interactive/general cohesion home; each named partial keeps its own row above where it owns a §-section) |
   ```

### Half B — the gate widen (a glass-ui `scripts/` edit, the BUILD — born-RED→GREEN)

Widen `proof-precept-current.mjs` W2 so it scans `utilities/` + `glass/` sub-partials for self-tagged shared registers, not only `topLevelImports(indexSrc)`:

- Add a `subPartialImports(indexSrc)` companion (or extend `topLevelImports`) that ALSO collects `@import "./glass/<name>.css"` and `@import "./utilities/<name>.css"` (and the nested imports reached via `glass.css`/`utilities.css` — read those two roots' own `@import` lines). The W2 loop then iterates the UNION of top-level + sub-partial imports.
- For a `glass/<name>.css` sub-partial: the `glass/*.css` glob covers its W3 file-cell resolution, so W2 asserts a SHARED-register sub-partial is MENTIONED in the shared-register subsection (the `:101-133` block) — not necessarily its own file-cell row (the glob already homes it for W3). For a `utilities/<name>.css` sub-partial: W2 asserts it has either its own §3 file-cell row OR the `utilities/*.css` glob row covers it AND (if shared-register self-tagged) it carries a shared-register mention.
- The DERIVED-NOT-FROZEN discipline holds: W2 still reads the live `src/styles/` partial headers + the `index.css`/`utilities.css`/`glass.css` ledger lines (`isSharedRegisterPartial`), never a hardcoded `metal.css` literal.
- **The self-test bite (born-RED → GREEN):** extend `selfTest()` (`:291-327`) — add a synthetic STALE fixture where a `utilities/`-nested shared register (e.g. a synthetic `utilities/widget-tone.css` self-tagged "the ONE shared widget-tone register") is UNHOMED → the widened W2 MUST flag it; and a CLEAN fixture where it IS homed → no false-flag. Born-RED on the CURRENT gate (the un-widened W2 does NOT scan `utilities/`, so it MISSES the planted unhomed `metal.css`-class register → the self-test for the widened detector fails on the un-widened code); GREEN at the widen.
- **The §3-self-test stays GREEN (`:294-300`):** the existing STALE/CLEAN inline fixtures must still pass their assertions (the widen is ADDITIVE — it reaches MORE partials, it does not change the top-level behavior the existing self-test exercises).

Fences honored:
- **ROW-SHAPE FENCE (load-bearing).** `metal.css` + `accent-tone.css` are SHARED registers (their own cohesion-domain row / shared-register mention per `:121-133`); `completion-seal`/`border-progress`/`cta-seat` are COMPONENT-family partials (fold into the component-row class). Each placed in the CORRECT class, never lumped — the candidate's binding fence.
- **GATE-CODE WAVE.** The §3 rows must match the gate's parse shape (`| domain | `file` | examples |`, the FILE column a single `code-span` path the `parseHomeMap` `:130-132` regex `/`([^`]+)`/g` extracts as `src/styles/<path>`). The synthetic-stale §3 self-test (`:294-300`) stays GREEN.
- **DERIVED-NOT-FROZEN.** The widen preserves the no-hardcoded-file-list derivation (the gate header `:18-28` THE DERIVATION); a synthetic un-homed `utilities/` register reds, never a frozen `metal.css` literal.

## (4) The gate — born-RED → GREEN (the W2 widen IS the gate)

- **`proof:precept-current` W2 (extended):** born-RED on the current tree — the un-widened W2 scans only `topLevelImports`, so a `utilities/`-nested shared register (`metal.css`) is INVISIBLE and the gate greens vacuously while `metal.css` is unhomed. After Half B + Half A: W2 scans the union (top-level + `utilities/` + `glass/` sub-partials), asserts every self-tagged shared register is §3-homed (file-cell or glob+mention), and GREENs because Half A added the rows.
- **The self-test bite:** the new synthetic `utilities/`-nested unhomed shared-register fixture flags on the widened detector (and would NOT flag on the un-widened detector — the born-RED proof that the widen has teeth). The CLEAN fixture (the register homed) does not false-flag.
- **W1 + W3 unchanged:** W1 (no dangling example) + W3 (every file-cell resolves on disk) stay GREEN — the new file-cell rows resolve (`utilities/metal.css`, `border-progress.css`, `completion-seal.css`, `dock/cta-seat.css` all exist on disk, VERIFIED), and the new example tokens are recipe-name-shaped or descriptive-prose (no dangling).
- **Submodule skip-by-policy preserved:** the live-doc W1/W2/W3 arm skips on the absent submodule (CI); the self-test (inline fixtures) keeps biting — the `:336-360` skip-by-policy block is untouched (BD.W-SUBMODULE-SKIP-POLICY's convention holds).

## (5) Paint verification

**Device-free — doc + gate wave (no paint, BB inv-4 no-op-on-paint: a home-map row + a gate-scan widen change ZERO pixels).** NO `proof:ba-gestalt`. The artefact is: (a) the §3 rows resolving on disk (W3 GREEN); (b) the widened W2 flagging a synthetic `utilities/`-nested unhomed register (the born-RED→GREEN self-test); (c) the existing §3 self-test still GREEN; (d) `metal.css`/`accent-tone.css`/`completion-seal.css`/`border-progress.css`/`cta-seat.css` all §3-homed in their correct class.

## (6) Fences + risks

- **ROW-SHAPE FENCE (the cardinal fence).** Place each register in the CORRECT class — SHARED register (own cohesion-domain row or shared-register mention) vs COMPONENT-family partial (component row). `metal.css` + `accent-tone.css` are shared; `completion-seal`/`border-progress`/`cta-seat` are component-family. NEVER lump a component partial into the shared-register subsection (that would mis-state the cohesion domain).
- **GATE-CODE WAVE (the BUILD half).** Half B is a glass-ui `scripts/proof-precept-current.mjs` edit — born-RED→GREEN with a self-test bite. The §3 row file-cell paths MUST match the `parseHomeMap` code-span regex (`src/styles/<path>` in backticks) or W3 false-dangles. The existing STALE/CLEAN self-test fixtures (`:295-321`) must still pass (the widen is additive).
- **DERIVED-NOT-FROZEN.** The widen scans the live ledger + partial headers (`isSharedRegisterPartial`), never a hardcoded `metal.css`. A synthetic un-homed `utilities/` register reds; a frozen-literal would green a future drift.
- **SUBMODULE-COMMIT FENCE (Half A) + the src half (Half B).** Half A is a `docs/precepts` submodule commit (the §3 doc); Half B is a glass-ui `scripts/` commit (the gate). Both attributed to BD.W-HOMEMAP-RESYNC; ι expects the submodule pointer bump.
- **glass/*.css glob already homes accent-tone for W3** — do NOT add a duplicate `glass/accent-tone.css` file-cell row (the glob covers it); the shared-register MENTION is what is owed (the surface-axis precedent at `:106-113`).
- **No src/styles/ paint** — `metal.css`/`accent-tone.css`/etc. are byte-untouched; only the §3 doc + the gate scanner change. The CSS registers themselves are not edited.
