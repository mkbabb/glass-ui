# N — γ audit (doc-drift) — post-close

**Lane**: γ — doc-vs-source drift across all N-touched files.
**Mode**: read-only audit. Hardened agent git clause respected.
**Tip**: `ffc02a9` (N.W2 close → v1.1.3).
**Date**: 2026-05-14.

---

## 1. Doc-source inventory

| Doc | Sections audited |
|---|---|
| `CLAUDE.md` (root) | `## Structure` (ui/ + custom/ tree blurbs for section/slider/glass-panel/configurator); `### Slider keep-dock-open contract` (L300) |
| `DESIGN.md` (root) | `## Glass Surfaces` (five-tier table + N.W2 dock-blur NO-OP table + N.W1 canonical translucent + frosted sub-section); `### Configurator` (L836) |
| `CHANGELOG.md` (root) | v1.1.1 (N.W0), v1.1.2 (N.W1), v1.1.3 (N.W2) entries — every "Added/Changed/Documented/Fixed" sub-bullet |
| `docs/tranches/N/PROGRESS.md` | 2026-05-14 W0 / W1 / W2 dispatched+closed entries; W0 close artefact list; W1 close artefact list; W2 close artefact list; hard-gate checklists |
| `docs/tranches/N/waves/{W0,W1,W2}.md` | wave specs (cross-referenced for audit-false-positive claims) |
| `docs/tranches/N/audit/W*-proof.md` | 5 W0 proof docs + 3 W1 proof docs + 2 W2 proof docs (existence + cited-commit alignment) |

---

## 2. Per-claim verification table

Columns: **C** = claim source · **S** = source-of-truth path · **V** = verdict (PASS / DRIFT / DOC-DRIFT).

### 2.1 CLAUDE.md — N-touched-component claims

| C | Claim | S | V |
|---|---|---|---|
| CLAUDE.md L300 (Slider keep-dock-open contract sub-section) | "The contract is bidirectional and **pointer-anchored** — the Slider is the only consumer ... keyboard- and discrete-button interactions on `<NumberField>` are not eligible because they have no **continuous-interaction window**." | `src/components/ui/slider/Slider.vue:79-129` (N.W0 Lane A1 adds `useTouchGate` + `data-touch-active` + `watch(touchGate.isActive, ...)` mirroring pointerdown acquire/release for touch) | **DOC-DRIFT** — Slider now also acquires `dockKeepOpen` on touch via the touch-gate active window. The "pointer-anchored" framing is post-N strictly stale; the contract is now pointer- + touch-anchored. CHANGELOG.md v1.1.1 correctly notes this addition; CLAUDE.md was not updated in lockstep. |
| CLAUDE.md L56 (`section/` blurb in Structure tree) | "Section sectioning landmark (V.W3 d2247c8) — composes typography ladder" | `src/components/ui/section/Section.vue:38-77` — Section now also exposes `backdrop?: "none" \| "paper"` prop (N.W0 Lane A3 `b6c1eed`) | **DOC-DRIFT** (minor) — Structure-tree blurb omits the new `backdrop` prop. The blurb is high-level and the prop is additive (default `"none"`), but the V.W3 attribution alone misses N.W0 Lane A3 wiring. |
| CLAUDE.md L92 (`glass-panel/` blurb) | "GlassPanel substrate wrapper" | `src/components/custom/glass-panel/GlassPanel.vue:53` default `variant: "resting"` — DESIGN.md now canonicalises this as the translucent + frosted default | **PASS** (acceptable abstraction) — CLAUDE.md is high-level; the canonicalisation lives in DESIGN.md per N.W1. Not a drift. |
| CLAUDE.md L61 (`slider/` blurb) | "reka-ui SliderRoot wrapper (keepDockOpen contract — see Slider section)" | matches `Slider.vue:9-22` | **PASS** (cross-ref correct; the drift is in the referenced Slider sub-section, not the blurb). |
| CLAUDE.md L78 (`configurator/` blurb) | "Configurator + ConfiguratorLayer + ConfiguratorRow + useConfiguratorState" | matches `src/components/custom/configurator/index.ts` (which also now re-exports `CONFIGURATOR_DENSITY_KEY` + `ConfiguratorDensity`) | **DOC-DRIFT** (minor) — Structure-tree blurb omits the new density module re-export (`CONFIGURATOR_DENSITY_KEY` + `ConfiguratorDensity`). Same character as the Section blurb. |

### 2.2 DESIGN.md — N.W2 dock-blur table + N.W1 canonical sub-section

| C | Claim | S | V |
|---|---|---|---|
| DESIGN.md L233-240 (N.W2 dock-blur audit table) | `.glass-dock` `backdrop-filter` = `blur(var(--glass-blur-dock-radius))` with radius **`0px`** | `src/styles/tokens.css:433` `--glass-blur-dock-radius: 0px;` | **PASS** |
| DESIGN.md L227 | `--glass-bg-dock` = 32 % card opacity | `src/styles/tokens.css:468` consumes `--glass-opacity-dock`; resolves to `32 %` per existing token | **PASS** (token name + indirection verified; numeric verified against existing canon) |
| DESIGN.md L216 (Resting row "Use" column) | `<GlassPanel>` default canonical translucent + frosted | `GlassPanel.vue:53` `variant: "resting"` default | **PASS** |
| DESIGN.md L244-263 (Canonical translucent + frosted sub-section) | "65% background opacity + 12 px backdrop-blur + 1.05 saturation + 12% foreground border + grain overlay" | `tokens.css:411` `--glass-opacity-resting: 0.65;` + `tokens.css:422` `--glass-blur-resting-radius: 12px;` + `tokens.css:437` `saturate(1.05)` + `tokens.css:474` `--glass-border-resting: 12%` | **PASS** — all four values match canon |

### 2.3 CHANGELOG.md — v1.1.3 / v1.1.2 / v1.1.1

| C | Claim | S | V |
|---|---|---|---|
| CHANGELOG.md L26-34 (v1.1.3 Configurator density tokens code-block) | Lists 8 tokens as `--configurator-row-padding-block-{mobile,compact,comfortable,spacious}` + `--configurator-row-gap-*` | `src/styles/tokens.css:657-665` defines `--configurator-row-py-{mobile,compact,comfortable,spacious}` (NOT `-padding-block-`). The W2 proof doc at `docs/tranches/N/audit/W2-Lane-A-configurator-density-CVA-proof.md:15` cites the correct `-py-` name. | **DOC-DRIFT (BLOCKER-grade for token nomenclature)** — CHANGELOG.md code-block names 4 tokens that do not exist in source. Consumers copying the block would author invalid CSS. The Vue source consumes the `-py-` names; the changelog snapshot uses an aspirational/draft name. |
| CHANGELOG.md L42-46 (configurator-mobile proof story 89 lines) | "89 lines demonstrates the same configurator content side-by-side" | `demo/stories/primitives/configurator-mobile.vue` actual line count = 100 | **DOC-DRIFT (cosmetic)** — line count off by 11; story is real + manifest-registered + functional. Likely the author counted at draft and the registered version grew. |
| CHANGELOG.md L37 (CSS delta +596 bytes raw) | Matches proof doc | matches `audit/W2-Lane-A-configurator-density-CVA-proof.md` | **PASS** |
| CHANGELOG.md L48-66 (N.W2 Lane B NO-OP) | "the dock substrate's `backdrop-filter` is already at compositor floor (`--glass-blur-dock-radius: 0px`)" | `tokens.css:433` confirms | **PASS** |
| CHANGELOG.md L79-95 (v1.1.2 N.W1 Lane C text-micro sweep) | Cites 4 files: ConfiguratorRow.vue, ConfiguratorLayer.vue, demo/configurator/PresetEditor.vue, demo/configurator/PresetEditorField.vue | All 4 files contain `text-micro` (verified via `grep` — 9 hits across the 4 files) | **PASS** |
| CHANGELOG.md L88-91 (text-micro utility location) | "exists at `src/styles/typography.css:235` plus the Tailwind v4 `--text-micro` bridge at `src/styles/theme.css:14`" | `typography.css:235` = `@utility text-micro {` (verified); `theme.css:14` = `--text-micro: var(--type-micro);` (verified) | **PASS** |
| CHANGELOG.md L109-114 (`metaballs.vue` story `isSupported` fix) | Story now uses imported `isWebGLSupported()` | Spot-verified — file exists; defineExpose surface change covered | **PASS** |
| CHANGELOG.md L138-149 (v1.1.1 N.W0 batch summary — 5 strategic wires) | Lane A1 Slider+useTouchGate; A2 metaballs→hero; A3 paper→Section; A4 typewriter→hero; A5 freshness→speedtest | `Slider.vue:6,89` `useTouchGate`; `hero.vue:8-9` MetaballCanvas + isWebGLSupported; `Section.vue:4,90` PaperBackdrop; `hero.vue:12,175,193` TypewriterText; `src/freshness.ts:79` `assertDistFresh` + package.json export | **PASS** for all 5 |
| CHANGELOG.md L156-167 (Slider data-touch-active mirror of GlassDock pattern) | `Slider.vue:79-90` cites `src/components/custom/dock/GlassDock.vue:85` | `Slider.vue:80` comment "Mirrors the canonical consumer pattern at `src/components/custom/dock/GlassDock.vue:85`" (line cite verified) | **PASS** |
| CHANGELOG.md L169-178 (Section backdrop="paper" → relative isolate + !absolute inset-0) | Section becomes `relative isolate` when `backdrop="paper"` | `Section.vue:85` `props.backdrop === 'paper' && 'relative isolate'` + L90-93 `<PaperBackdrop class="!absolute inset-0" />` | **PASS** |
| CHANGELOG.md L205-218 (precept submodule advance `46d6cfb → b8af314`) | Outside this lane's audit scope (cross-repo). The W0 Lane B proof doc was authored | not verified at submodule HEAD (out-of-scope) | **PASS-BY-DEFAULT** (proof doc exists; cross-submodule verification deferred to ι lane) |

### 2.4 PROGRESS.md — per-wave entries

| C | Claim | S | V |
|---|---|---|---|
| PROGRESS.md L125-149 (W0 close artefacts) | Cites 5 lane proof docs (`W0-Lane-{A1,A2-A4,A3,B,C}-*.md`) | All 5 files exist under `docs/tranches/N/audit/` | **PASS** |
| PROGRESS.md L151-175 (W1 close artefacts) | Cites 3 lane proof docs (`W1-Lane-{A,B,C}-*.md`) | All 3 files exist | **PASS** |
| PROGRESS.md L177-203 (W2 close artefacts) | Cites 2 lane proof docs (`W2-Lane-{A,B}-*.md`) | Both files exist | **PASS** |
| PROGRESS.md L142-149 (W0 hard-gate checklist) | "v1.1.1 tagged + pushed: PASS" + "W0 close commit landed: PASS" | `git tag --list 'v1.1.*'` → `v1.1.1 v1.1.2 v1.1.3` all present; `git log` shows b6c1eed (W0), b1d5cc9 (W1), ffc02a9 (W2) | **PASS** |
| PROGRESS.md L166-175 (W1 hard-gate (g) "3 lane proof docs landed: PASS") | 3 proof docs landed | confirmed | **PASS** |
| PROGRESS.md L138-140 (W0 absorb — AB CSS-bundle budget rebaseline 36_000 raw / 6_700 gzip) | Cap claim | not re-verified at HEAD (would need `npm run profile:budget`); the W4-bundle-profile.json modification appears in `git status` at start of this conversation, suggesting the budget was indeed adjusted | **PASS-BY-DEFAULT** (consistent with the M tracking change) |

---

## 3. Findings

Five doc-vs-source drifts surfaced. Listed in severity order.

### F1 — CHANGELOG.md v1.1.3 token-name drift — `--configurator-row-padding-block-*` does not exist (BLOCKER-grade)

**Where**: `CHANGELOG.md:26-34` (v1.1.3 Configurator density tokens code-block).

**Claim**: 8 tokens declared as `--configurator-row-padding-block-{mobile,compact,comfortable,spacious}` + `--configurator-row-gap-*`.

**Source-of-truth**: `src/styles/tokens.css:657-665` defines `--configurator-row-py-{mobile,compact,comfortable,spacious}` + `--configurator-row-gap-*`. The Vue scoped CSS at `ConfiguratorRow.vue:117-135` consumes the `-py-` names. The W2 proof doc cites the correct `-py-` form.

**Impact**: A consumer reading the CHANGELOG to discover the customization surface and copying the token names verbatim would author invalid CSS — the property declaration would set a custom property no rule consumes, leaving the row at the comfortable default. The drift is a published-API documentation defect.

**Likely cause**: The CHANGELOG entry was drafted before the final tokens.css commit settled on the `-py-` short-form; the prose was not re-synced.

**Severity**: BLOCKER. The CHANGELOG is the consumer-facing surface for v1.1.3.

**Suggested remediation** (orchestrator owns; not done here per read-only): rewrite CHANGELOG.md:26-34 code-block with `--configurator-row-py-*` to match `tokens.css`. (Or, the orchestrator can decide to rename source to `-padding-block-` to match the changelog — but that is a source-of-truth flip and CSS delta. The cheaper fix is the changelog.)

### F2 — CLAUDE.md Slider keep-dock-open sub-section is post-N.W0 stale (MINOR)

**Where**: `CLAUDE.md:300` (Slider keep-dock-open contract sub-section).

**Claim**: "The contract is bidirectional and **pointer-anchored** ... keyboard- and discrete-button interactions on `<NumberField>` are not eligible because they have no **continuous-interaction window**."

**Source-of-truth**: `Slider.vue:79-134` ships a `useTouchGate` wire (N.W0 Lane A1, `b6c1eed`) that acquires `dockKeepOpen` for the touch-gate active window via `watch(touchGate.isActive, acquire/release)`. The Slider root also reflects gate state via `data-touch-active`. The contract is now pointer- AND touch-anchored.

**Impact**: A reader of CLAUDE.md searching for the touch story would conclude touch is unsupported; CHANGELOG.md v1.1.1 actually documents the addition. Documentation-of-record-vs-changelog inconsistency.

**Severity**: MINOR. CHANGELOG.md is correct; the canonical living architecture doc is one wave behind.

**Suggested remediation**: amend the sub-section to "pointer- and touch-anchored" and append a sentence noting the `data-touch-active` attribute + the `useTouchGate` wire (mirror of GlassDock.vue:85 pattern) — without disturbing the NumberField-non-eligible rationale.

### F3 — CLAUDE.md Structure-tree blurbs are post-N.W0/W2 stale (MINOR)

**Where**: `CLAUDE.md:56` (`section/` blurb) and `CLAUDE.md:78` (`configurator/` blurb).

**Claims**:
- L56: `Section sectioning landmark (V.W3 d2247c8) — composes typography ladder` — omits N.W0 Lane A3 `backdrop` prop.
- L78: `Configurator + ConfiguratorLayer + ConfiguratorRow + useConfiguratorState` — omits N.W2 `CONFIGURATOR_DENSITY_KEY` + `ConfiguratorDensity` re-exports.

**Source-of-truth**: `Section.vue:53` ships `backdrop?: "none" | "paper"` prop; `configurator/index.ts:9-11` re-exports the density key + type.

**Severity**: MINOR — Structure-tree blurbs are high-level (one line each); the additions are documented in DESIGN.md + CHANGELOG.md.

**Suggested remediation**: appendable comma-suffix on each blurb (e.g., `... — composes typography ladder + N.W0 backdrop="paper" wire`).

### F4 — CHANGELOG.md v1.1.3 mobile-story line count drift (COSMETIC)

**Where**: `CHANGELOG.md:43-46`.

**Claim**: `demo/stories/primitives/configurator-mobile.vue` (89 lines).

**Source-of-truth**: actual = 100 lines. Story registered + functional. Cosmetic count drift (likely drafted at 89, grew to 100 by close).

**Severity**: COSMETIC.

**Suggested remediation**: drop the line count or amend to "100 lines"; or, more durable, drop the line count entirely as it's a moving target.

### F5 — Notable PASSes (no drift)

For completeness, the following claims were spot-verified and held:

- DESIGN.md Glass Surfaces five-tier table — opacity / blur / saturation / border tokens all match `tokens.css`.
- DESIGN.md N.W2 dock-blur table — `--glass-blur-dock-radius: 0px` confirmed; the `saturate()` channel is correctly noted as omitted under the dock token branch.
- DESIGN.md N.W1 canonical translucent + frosted recipe — 65/12 px/1.05/12 % all verified.
- text-micro utility — exists at `typography.css:235`; bridge at `theme.css:14`; 9 consumer call-sites in 4 files (matches CHANGELOG sweep claim exactly).
- All 5 N.W0 lane wires (Slider+useTouchGate, hero+metaballs, hero+typewriter, Section+paper, freshness+speedtest) — source landed at the claimed sites.
- All 10 lane proof docs cited in PROGRESS.md exist under `docs/tranches/N/audit/`.
- v1.1.1 / v1.1.2 / v1.1.3 git tags exist; `package.json` is at 1.1.3.

---

## 4. Verdict

**MINOR** (one BLOCKER-grade finding contained to the CHANGELOG.md token-name drift; the other 3 are MINOR / COSMETIC; doc-of-record CLAUDE.md is one wave behind but the canon (DESIGN.md + CHANGELOG.md content) is correct).

The `--configurator-row-padding-block-*` drift (F1) is severe in **class** (consumers reading the CHANGELOG verbatim author invalid CSS) but the surface area is narrow — exactly one code-block. The fix is a 4-line CHANGELOG edit. No source change is needed; the source-of-truth `-py-` naming is internally consistent across `tokens.css` + `ConfiguratorRow.vue` + the W2 Lane A proof doc.

The CLAUDE.md drifts (F2 + F3) are typical post-close residuals — the living architecture doc isn't updated at every wave; it's updated at tranche close. Recommend folding all three CLAUDE.md edits into N.W4 (close ceremony) per the canonical pattern.

No findings rise to the "tranche-must-reopen" threshold. v1.1.3 ships; remediation is documentation-only.

---

## Lane attribution

γ — doc-drift audit dispatched at N.W4 close-ceremony as one of the parallel post-close audit lanes per the canonical 7-agent fan-out.
