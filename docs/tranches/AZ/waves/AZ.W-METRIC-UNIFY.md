# AZ.W-METRIC-UNIFY — the Metric* family converges on ONE value-display core (killing the latent zero-value bug); the ConfiguratorRow vs LabeledField chassis decision

**Track:** G (design) · **Type:** refactor (≥2-site abstraction) + bug-fix + a recorded-divergence note · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`)
**Depends on:** nothing in AZ (the Metric* + ConfiguratorRow/LabeledField surfaces are settled at HEAD `3.10.1`; this wave does not touch the dock/blob/motion bands). Parks at **Batch 4** alongside W-HIERARCHY (W-HIERARCHY supplies the configurator design vocabulary the chassis-decision §B references). No data edge to the cross-repo arm.
**STATUS: SPEC**

This wave discharges **E2-1** (the 4-primitive Metric* family sharing the identical value-display gestalt with NO shared core — the headline ≥2-site abstraction) + **E2-2** (the LATENT zero-value DEFECT the divergence hides) + **E2-3** (the ConfiguratorRow vs LabeledField undifferentiated chassis). The Metric* arm is the textbook "two sites want one abstraction, and the copy that diverged hides a bug": four SFCs paint the same `value + unit + placeholder` gestalt, two name the field `amount` and two name it `value`, the `placeholder: '—'` default is redeclared FOUR times (five with AnimatedDigit), and the empty-value coalesce DIVERGES — the `amount` copies carry a truthy-coalesce that renders a VALID `0` metric as the em-dash placeholder, muted, color-stripped. The fix is ONE value-display core consumed by the four distinct surfaces; the bug dies as a consequence of the unification. The ConfiguratorRow/LabeledField arm is the SMALLER E2-3 question: a shared chassis OR a recorded-divergence note (the same kind of recorded DIVERGENCE the project already uses for `cn`/`focus-ring`).

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

The evidence below is from `FLEET-DIGEST.md` findings **E2-1** (DESIGN-FINDING S3), **E2-2** (OPEN-DEFECT S2 — the latent zero-value bug), **E2-3** (DESIGN-FINDING S2), backed by `audit/ground/E2-refine-extant-findings.md`. It was re-verified live on disk while authoring this spec. RE-GREP all of the following against glass-ui HEAD before editing — if a cite has drifted, STOP and report a scope-reveal:

1. **The field-name split.** `grep -n 'amount\|value' src/components/custom/metric-badge/MetricBadge.vue` → expect the primary field is `amount` (`MetricBadge.vue:11`, `amount: string | number | null | undefined`); `grep -n 'value' src/components/custom/metric-cell/MetricCell.vue` → `value` (`:67`, `value?: string | number | null | undefined`); `grep -n 'value' src/components/custom/metric-stack/MetricRow.vue` → `value` (`:48`). MetricPill (`src/components/ui/metric-pill/MetricPill.vue:29`) carries `amount` and DELEGATES to MetricBadge (`:55-61`). So: 2 of 4 name it `value`, and the BUG lives on the `amount` side.
2. **The placeholder redeclaration.** `grep -rn "placeholder: '—'\|placeholder: \"—\"" src/components/custom/metric-badge src/components/ui/metric-pill src/components/custom/metric-cell src/components/custom/metric-stack src/components/custom/animated-digit` → expect FIVE redeclarations: `MetricBadge.vue:41` (`'—'`), `metric-pill/MetricPill.vue:47` (`"—"`), `MetricCell.vue` (`"—"` default), `MetricRow.vue` (`"—"` default), `AnimatedDigit.vue:52` (`"—"`).
3. **The coalesce divergence (the BUG).** `sed -n '129,131p;142,144p' src/components/custom/metric-badge/MetricBadge.vue` → expect BOTH render branches use `{{ amount || placeholder }}` (`:131`, `:144`) AND the muted/color gates use `!amount` (`:129` `{ 'text-muted-foreground/40': !amount }`) + `amount ?` (`:130` `:style="amount ? { color } : undefined"`). Contrast `sed -n '113,115p' src/components/custom/metric-cell/MetricCell.vue` → the CORRECT explicit check (`if (v === null || v === undefined || v === "") return props.placeholder`); `sed -n '120,122p' src/components/custom/metric-stack/MetricRow.vue` → the same correct check (`value === null || value === undefined || value === "" ? placeholder : value`); `AnimatedDigit.vue:62` → `if (props.value === null || props.value === undefined) return props.placeholder` (correct). The BUG: `0 || '—'` → `'—'`, and `!0` → `true`, so a valid `0` metric on MetricBadge/MetricPill renders the em-dash, muted, color-stripped.
4. **The MetricBadge prop type is NOT exported.** `cat src/components/custom/metric-badge/index.ts` → `export { default as MetricBadge } from "./MetricBadge.vue"` (component ONLY — no prop type). Contrast `cat src/components/custom/metric-cell/index.ts` (exports `MetricCellProps`) + `src/components/custom/metric-stack/index.ts` (exports `MetricRowProps`/`MetricStackProps`). The parity gap: MetricBadge owes a prop-type export.
5. **The shared-leaf precedent.** `ls src/utils/` → `cn.ts`, `prng.ts`, `moveBefore.ts`, `platformSupport.ts`, `index.ts`. `prng.ts` is the canonical SHARED LEAF (watercolor-dot + goo-blob both import it — `CLAUDE.md` `utils/` note). The metric value-display core homes the same way: a package-private leaf imported by the four Metric* dirs.
6. **The two row primitives.** `grep -n 'label\|name\|reset\|description\|density' src/components/custom/configurator/ConfiguratorRow.vue` → expect `label` + token-`name` + opt-in `reset` (`canReset`) + `description` + the four-rung `density` axis. `grep -n 'tooltip\|required\|error\|for\|id' src/components/custom/labeled-field/LabeledField.vue` → expect `tooltip` + `required` + an `error` slot + the `for`/`id` a11y wiring (`controlId`/`labelId`/`errorId`). They share the "labeled control row" gestalt but emphasize DIFFERENT features (token-name+reset+density vs a11y+error) — so the §B decision is shared-chassis-OR-documented-divergence, NOT a forced merge.

## §1 — Goal criterion

**Arm A (Metric*).** The four Metric* surfaces (`MetricBadge`, `MetricPill`, `MetricCell`, `MetricRow`) paint their distinct registers (badge pill / stacked pill / wash tile / subgrid row) over ONE shared value-display core that owns (a) the single canonical field name, (b) the ONE correct null/undefined/`""` empty-check, (c) the ONE `placeholder: "—"` default. The latent zero-value bug is DEAD: a valid `0` metric renders `"0"` (not the em-dash, not muted, not color-stripped) on every surface. MetricBadge exports its prop type for parity. **Arm B (chassis).** The ConfiguratorRow-vs-LabeledField question is RESOLVED — either a shared row chassis both compose, OR a recorded-divergence note (the `cn`/`focus-ring` precedent) that gives a consumer choosing between them documented guidance. No four-way copy of the value logic survives; no undocumented twin-primitive confusion survives.

## §2 — Completion criterion

The hard gate (§5) verifies, on artefacts:
- **A1 (the core exists + is consumed).** A single value-display leaf (`coalesceMetric()` + the shared value-props type) exists and is imported by all FOUR Metric* SFCs; the per-SFC duplicated coalesce/placeholder logic is GONE (a grep shows the `placeholder` default + the empty-check live in ONE place).
- **A2 (the bug is dead — a focused unit test).** A born-RED-then-GREEN unit test renders a `0`-valued MetricBadge/MetricPill and asserts the output is `"0"` (not `"—"`), un-muted, with the color applied — the regression the unify fixes, proved by a focused test, not a grep.
- **A3 (the field name + the type export).** The canonical field name is ONE (the `value` side — 2 of 4 + the bug is on the `amount` side); MetricBadge's index exports its prop type (parity with MetricCell/MetricRow).
- **B (the chassis decision).** Either a shared chassis is landed (both row primitives compose it, a deletion-proof of the duplicated row scaffold) OR a recorded-divergence note exists in-source + in the design-idioms doc with the per-primitive guidance.
- A `proof:metric-core` gate (born-RED) machine-locks A1+A3; `vue-tsc --noEmit && npm run build` green; the existing Metric* unit/story suite green (no surface regression on the four distinct registers).

---

## §3 — The defect (file:line, re-grepped at HEAD; E2-1/E2-2/E2-3)

### D1 — the Metric* family shares the value-display gestalt with NO core (E2-1)

Four primitives compose the identical "value display" — a primary metric + unit + placeholder, with optional icon/label — yet share NO core:

| component | primary field | placeholder default | coalesce logic | exports prop type? |
|---|---|---|---|---|
| `MetricBadge` (`metric-badge/MetricBadge.vue`) | `amount` (`:11`) | `'—'` (`:41`) | `amount \|\| placeholder` (`:131`,`:144`) — **BUGGY** | **NO** |
| `MetricPill` (`ui/metric-pill/MetricPill.vue`, wraps Badge) | `amount` (`:29`) | `"—"` (`:47`) | delegates to Badge (`:55-61`) — inherits the bug | NO |
| `MetricCell` (`metric-cell/MetricCell.vue`) | `value` (`:67`) | `"—"` | `v === null \|\| undefined \|\| ""` (`:113-115`) — correct | yes (`MetricCellProps`) |
| `MetricRow` (`metric-stack/MetricRow.vue`) | `value` (`:48`) | `"—"` | `value === null \|\| undefined \|\| ""` (`:120-122`) — correct | yes (`MetricRowProps`) |

(+ `AnimatedDigit.vue:52` redeclares `placeholder: "—"` and uses the correct check at `:62` — a FIFTH redeclaration of the same default, though AnimatedDigit is a distinct single-glyph reel, not a value-display card; it consumes the shared `placeholder` default but keeps its own animation surface.)

The field-name split (`amount` vs `value`, same concept two names), the placeholder redeclared 4-5×, and the coalesce divergence are the three faces of one missing abstraction.

### D2 — the latent zero-value DEFECT (E2-2, S2 — the bug the divergence hides)

`MetricBadge.vue:131` + `:144` use `{{ amount || placeholder }}`; `:129` uses `!amount` for the muted class (`{ 'text-muted-foreground/40': !amount }`); `:130` uses `amount ? { color } : undefined` for the color gate. JavaScript truthiness: `0 || '—'` → `'—'`, `!0` → `true`, `0 ? color : undefined` → `undefined`. So a VALID metric of `0` (a real reading — 0 Mbps, 0 ms, 0 errors) renders the em-dash placeholder, muted, with its color stripped — a silent data-falsification bug. MetricPill inherits it via delegation. MetricCell/MetricRow use the explicit `=== null || === undefined || === ""` check and are CORRECT. The divergence the unify resolves is exactly what hides this bug — the unified core's single correct empty-check kills it on all four surfaces at once.

### D3 — the ConfiguratorRow vs LabeledField undifferentiated chassis (E2-3, S2)

Both are "label (+ meta) above/beside a slotted control":
- `ConfiguratorRow.vue` — `label` + token-`name` + opt-in `reset` (`canReset`, emits `reset`) + `description` + the four-rung `density` axis (`mobile`|`compact`|`comfortable`|`spacious`, local-prop-over-inject); configurator-local, for TOKEN controls.
- `LabeledField.vue` — `label` + `tooltip` + `required` + an `error` slot + the `for`/`id` a11y wiring (`controlId`/`labelId`/`errorId`); form-local, for FORM fields.

They share the "labeled control row" gestalt but emphasize DIFFERENT features (token-name+reset+density vs a11y+error region). This is NOT a clean merge — but a consumer choosing between them has NO documented guidance, the same gap the project already records as a DIVERGENCE for `cn` (the hand-rolled deduplicator over tailwind-merge) and `.focus-ring` (the utility over the inline ring chain). Either a shared row chassis both compose for the common parts, OR a recorded-divergence note steering "ConfiguratorRow for token controls / LabeledField for form fields."

---

## §4 — The abstraction (the design, concretely)

### 4.1 — the value-display core (a shared leaf, the `prng.ts` precedent)

A package-private leaf — `src/utils/coalesceMetric.ts` (or `src/components/custom/metric-badge/coalesceMetric.ts` if the colocation convention prefers a metric-seam home; the `utils/` `prng.ts` cross-dir-leaf precedent is the cleaner fit since FOUR dirs consume it) — owns:

```ts
/** The canonical empty-value substitution for the Metric* family.
 *  The single correct check: a valid 0 returns "0" (NOT the placeholder),
 *  only null / undefined / "" coalesce to the placeholder glyph. */
export function coalesceMetric(
    value: string | number | null | undefined,
    placeholder = "—",
): { display: string; isEmpty: boolean };

/** The shared value-props shape the four surfaces extend. */
export interface MetricValueProps {
    value?: string | number | null | undefined;
    unit?: string;
    placeholder?: string;
}
```

`coalesceMetric` returns BOTH the display string AND the `isEmpty` flag, so the muted/color gates read `isEmpty` instead of the truthy `!amount` — that is what kills the `0`-renders-as-empty bug (`coalesceMetric(0)` → `{ display: "0", isEmpty: false }`, so `0` is NOT muted and DOES get its color). The `placeholder = "—"` default lives HERE, ONCE — the four SFCs drop their local redeclarations (AnimatedDigit may keep its own default or consume this; it is a distinct surface, so it is OPTIONAL — recorded either way).

### 4.2 — the canonical field name

Pick `value` (the E2-1 verdict): 2 of 4 already name it `value`, the bug is on the `amount` side, and `value` is the clearer noun. **This is a CLEAN BREAK** (no-legacy invariant 5): MetricBadge + MetricPill rename `amount` → `value`. MIGRATION.md carries the rename row (the `amount` → `value` prop rename on `<MetricBadge>`/`<MetricPill>`); the consumers re-bind (speedtest is the MetricCell/MetricStack consumer — `ResultDetailSheet.vue:7`/`ResultStack.vue:18` per the E4-8 census — NOT a MetricBadge/MetricPill `amount` consumer, so re-grep the real `<MetricBadge`/`<MetricPill` consumer sites before the rename to size the migration; if the only `amount`-binding consumer is a demo story, the break is internal-only). NO `amount` alias survives (the no-backwards-compat memory).

### 4.3 — the four SFCs keep their distinct surfaces

The unify is value-LOGIC only — the four SFCs keep their distinct paint:
- `MetricBadge` — the inline/stacked badge pill (label + value + unit, the `metric-badge__amount` span).
- `MetricPill` — the 2-row stacked pill, composes MetricBadge (the delegation stays; it inherits the fixed core).
- `MetricCell` — the wash tile (icon-on-label, stacked value + unit).
- `MetricRow` — the subgrid row (icon | label | value tracks).

Each imports `coalesceMetric` + extends `MetricValueProps`; the `displayValue`/muted/color computeds route through `coalesceMetric`'s `{ display, isEmpty }`. No surface CSS changes; the unit/story suite proves no register regression.

### 4.4 — the MetricBadge prop-type export (parity)

`metric-badge/index.ts` gains `export type { MetricBadgeProps } from "./MetricBadge.vue"` (or the appropriate co-exported name) — parity with MetricCell/MetricStack which already export their prop types.

### §B — the ConfiguratorRow vs LabeledField decision

The §0-step-6 evidence shows the two primitives emphasize different features, so a forced merge is wrong. The recommended resolution is **(b) the recorded-divergence note** (the `cn`/`focus-ring` precedent — cheaper, no surface churn, and the features genuinely diverge):
- An in-source docstring on BOTH `ConfiguratorRow.vue` + `LabeledField.vue` cross-referencing each other with the one-line steer ("ConfiguratorRow for token/preset controls — carries the token-name + opt-in reset + the density axis; LabeledField for form fields — carries the `for`/`id` a11y wiring + the required/error region. They are NOT interchangeable.").
- A row in `docs/precepts/design-idioms.md` (the recorded-divergence home, alongside the `cn`/`focus-ring`/`in srgb` keeps) recording the deliberate twin-primitive divergence.

The fork **[B-arm]**: if the orchestrator/W-HIERARCHY work finds the COMMON parts (the label slot + the description) genuinely want a shared sub-chassis (a `<LabeledRow>` leaf both compose for the label+description+slot, each adding its own meta), that is the heavier arm (a). Spec BOTH: (a) lands a shared `LabeledRow` leaf both compose with a deletion-proof of the duplicated label scaffold; (b) lands the divergence note. The recommendation is (b) UNLESS W-HIERARCHY's configurator-hierarchy work surfaces a third caller wanting the shared row (the ≥2-consumer bar for the new chassis). The chosen arm is recorded in the close.

---

## §5 — HARD GATE

This wave closes when ALL of the following verify on artefacts:

### Arm A — the Metric* core
1. **The shared core exists + is consumed by all four.** `grep -rln 'coalesceMetric' src/components/custom/metric-badge src/components/ui/metric-pill src/components/custom/metric-cell src/components/custom/metric-stack` → FOUR files (each Metric* SFC imports it); the `coalesceMetric` leaf exists at its chosen home. A grep shows the `placeholder` default + the empty-check live in ONE place (the leaf), not redeclared per-SFC (the prior 4-5 redeclarations are gone — `grep -rn "placeholder.*['\"]—['\"]" src/components/custom/metric-badge src/components/ui/metric-pill src/components/custom/metric-cell src/components/custom/metric-stack` returns ≤1, the leaf's default; AnimatedDigit's own default is recorded as kept-or-folded).
2. **The zero-value bug is DEAD (a focused unit test, born-RED).** A test at `tests/components/custom/metric-badge/zero-value.test.ts` (mirroring the `tests/` tree per the no-test-in-src rule) renders a `0`-valued `<MetricBadge value="0" />` (or `:value="0"`) + `<MetricPill>` and asserts: the rendered text is `"0"` (NOT `"—"`); the `metric-badge__amount` span does NOT carry `text-muted-foreground/40`; the inline `color` style IS applied when a `color` prop is set. The test is RED on the pre-fix tree (`amount || placeholder` renders `"—"`) and GREEN after — the regression proof is the test, not a grep.
3. **The field name is canonical + the type exports.** The primary field is `value` on all four (MetricBadge + MetricPill renamed from `amount`, NO `amount` alias surviving — `grep -rn '\bamount\b' src/components/custom/metric-badge src/components/ui/metric-pill` → only incidental/comment hits, no prop named `amount`); `metric-badge/index.ts` exports the prop type (`grep 'export type' src/components/custom/metric-badge/index.ts` → present); MIGRATION.md carries the `amount` → `value` rename row.
4. **`proof:metric-core` GREEN (born-RED).** A new `scripts/proof-metric-core.mjs` (specified, NOT authored by this authoring phase — the implementer writes it) asserts: (a) `coalesceMetric` is imported by all four Metric* SFCs; (b) no Metric* SFC redeclares the `placeholder: "—"` default locally; (c) the primary prop is named `value` on all four (no `amount`); (d) MetricBadge's index exports its prop type. Born-RED at HEAD (the four diverge, `amount` lives, the default is redeclared 4×), GREEN at close. Registered in `gates.mjs` with `tags:["local","ci"]`.

### Arm B — the chassis decision
5. **The decision is RESOLVED + recorded.** EITHER: a shared `LabeledRow` leaf exists, both `ConfiguratorRow` + `LabeledField` compose it, AND a deletion-proof shows the duplicated label scaffold removed (arm a); OR: BOTH `ConfiguratorRow.vue` + `LabeledField.vue` carry the cross-referencing divergence docstring AND `docs/precepts/design-idioms.md` carries the recorded-divergence row (arm b). A grep asserts the chosen arm's artefact is present. The close names which arm landed and why.

### Cross-arm
6. **No surface regression.** `vue-tsc --noEmit && npm run build` green; the existing Metric* unit/story suite green (the four distinct registers paint unchanged — the unify is value-logic only). A captured before/after of a Metric* showcase story (the four surfaces side by side, a normal value + a `0` value) shows the `0` now reads `"0"` un-muted on Badge/Pill (the visible bug-fix DELTA) and the registers otherwise unchanged.

The gates are grep+the born-RED `proof:metric-core` for the structural unify; the BUG proof is the focused unit test (item 2), NOT the grep — a runtime-behaviour bug needs a runtime test.

## §6 — Scope fence + HARD BOUNDARIES

- **Value-LOGIC only, not surface paint.** The four Metric* SFCs keep their distinct registers (badge pill / stacked pill / wash tile / subgrid row); this wave touches ONLY the value-coalesce + placeholder + field-name + the prop-type export. No CSS rung change, no new variant.
- **The `amount` → `value` rename is a CLEAN BREAK** (no-legacy invariant 5) — NO `amount` alias survives; MIGRATION.md carries the rename; consumers re-bind. Re-grep the real `<MetricBadge`/`<MetricPill` consumer sites (the E4-8 census names speedtest as a MetricCell/MetricStack consumer, NOT a Badge/Pill `amount` consumer — confirm before sizing the migration).
- **AnimatedDigit is OPTIONAL scope** — it redeclares the `placeholder` default but is a distinct single-glyph reel (not a value-display card); folding it onto the shared default is allowed but not required; record the choice.
- **The ConfiguratorRow/LabeledField arm does NOT force a merge** — the recommendation is the recorded-divergence note (b); arm (a) lands only if a ≥2-consumer shared-row need surfaces (the bar).
- **No dock/blob/motion/shell band overlap** — this wave is the Metric* + the two row primitives ONLY; it shares no file with the other AZ bands.

## §7 — Named successors (for anything deferred)

- **A shared `LabeledRow` chassis (arm a)** — if W-HIERARCHY's configurator-hierarchy work surfaces a THIRD caller for a shared label+description+slot row, the ≥2-consumer bar is met and the shared chassis lands; otherwise the recorded-divergence note (arm b) is terminal. Recorded in the close.
- **AnimatedDigit's placeholder fold** — if AnimatedDigit is NOT folded onto the shared default this wave (kept local), that is recorded as a deliberate keep (it is a distinct surface), not a silent divergence.

## §8 — Cross-references

- FLEET-DIGEST findings **E2-1** (the 4-primitive family, no shared core — the abstraction headline), **E2-2** (the latent zero-value DEFECT, S2 — the bug the divergence hides), **E2-3** (the ConfiguratorRow vs LabeledField undifferentiated chassis, S2).
- `docs/tranches/AZ/audit/ground/E2-refine-extant-findings.md` (the full evidence: the field-name split table, the per-line coalesce cites, the abstraction proposal, the chassis verdict).
- glass-ui `CLAUDE.md` — the `prng.ts` shared-leaf precedent (`utils/` note — the home pattern for `coalesceMetric`), the `cn`/`focus-ring`/`in srgb` recorded-divergence keeps (the precedent for the §B note arm), the no-test-in-src rule (the `tests/` mirror home for the zero-value test), MIGRATION.md is binding (L invariant 16 — the rename row).
- The MEMORY `no backwards compat` note (clean breaks when refactoring; no `amount` alias) + `overfitting audit` (the ≥2-consumer bar gating the §B shared-chassis arm).
- W-HIERARCHY (`AZ.W-HIERARCHY`) — the configurator design-hierarchy vocabulary the §B chassis decision references; the two waves park together at Batch 4.
- AZ.md band-G roster row (`AZ.md:117`) + invariant 5 (no legacy / no aliases — the `amount`→`value` clean break).
