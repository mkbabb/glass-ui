# N-audit-β — Substrate-without-consumer (L invariant 8)

**Audit window**: `54a8acb..ffc02a9` (M close → N.W2 close).
**Lane**: N.W4 β (substrate-without-consumer).
**Mode**: READ-ONLY. No source mutations; no git index touch.
**Invariant under test**: L invariant 8 — every src/ artefact at HEAD has ≥ 2 consumers OR is exported OR is private demo helper OR carries a formal retirement rationale. N invariant 23 (wire-before-retire) softens this to permit "WIRE-into-≥2" as the default close branch; the binary verdict still applies.

## Scope note

The audit window contains TWO cohorts:
1. **N tranche proper** (W0/W1/W2 — `b6c1eed`, `b1d5cc9`, `ffc02a9`) — the 5 strategic wires, density CVA, GlassPanel verify, typography sweep.
2. **AB (speedtest constellation cohort)** — `69c59fa`, `a04f05f`, `2796b28`, `a36cae8`, `215ad06`, `6263330`, `2b3727f` — landed at glass-ui between M close and N open as the Living-UI canon cohort.

Both cohorts ship src/ substrate inside the window, so both are in-scope for the β audit. AB substrate that ships a primitive on the public surface without a HEAD consumer is a finding under the same invariant.

## §1 — Substrate inventory (per-artefact)

### N tranche (in-scope artefacts)

| ID | Artefact | Kind | Path | Wave |
|---|---|---|---|---|
| N1 | `Slider.vue` `useTouchGate` wire | source mutation | `src/components/ui/slider/Slider.vue` | N.W0 A1 |
| N2 | `Section.vue` `backdrop?: "none" \| "paper"` prop | new public prop | `src/components/ui/section/Section.vue` | N.W0 A3 |
| N3 | `Configurator.vue` `density?` prop + provide | new public prop | `src/components/custom/configurator/Configurator.vue` | N.W2 A |
| N4 | `ConfiguratorRow.vue` `density?` prop + inject | new public prop | `src/components/custom/configurator/ConfiguratorRow.vue` | N.W2 A |
| N5 | `density.ts` module (`ConfiguratorDensity` type + `CONFIGURATOR_DENSITY_KEY`) | new public types/constants | `src/components/custom/configurator/density.ts` | N.W2 A |
| N6 | 8 `--configurator-row-{gap,py}-{mobile,compact,comfortable,spacious}` tokens | new tokens | `src/styles/tokens.css` §10 | N.W2 A |
| N7 | hero composition wire (`<MetaballCanvas>` ambient + `<TypewriterText>` headline) | demo-only consumer adds | `demo/stories/compositions/hero.vue` | N.W0 A2 + A4 |
| N8 | `demo/stories/primitives/section.vue` (`backdrop="paper"` story) | demo story addition | `demo/stories/primitives/section.vue` | N.W0 A3 |
| N9 | `demo/stories/primitives/configurator-mobile.vue` (new story) | demo story addition | `demo/stories/primitives/configurator-mobile.vue` | N.W2 A |

### AB cohort (in-scope artefacts shipped inside the audit window)

| ID | Artefact | Kind | Path | Wave |
|---|---|---|---|---|
| AB1 | `--chassis-max-block-size` token | new token | `src/styles/tokens.css` §9 | AB.W1.T1 |
| AB2 | `@utility dock-label` typography utility | new public utility | `src/styles/typography.css` | AB.W1.T5 |
| AB3 | `Pulse variant="aura"` + `--animate-ambient-pulse-*` + `--pulse-aura-opacity-*` tokens | new variant + 6 tokens | `src/components/custom/pulse/Pulse.vue` + `tokens.css` §2.A | AB.W3.T1 |
| AB4 | `Progress variant="sectioned"` + `--progress-sectioned-{height,track}` tokens | new variant + 2 tokens + `currentSegmentKey` + `activeProgress` + `segments` props | `src/components/ui/progress/Progress.vue` + `tokens.css` §2.B | AB.W3.T2 |
| AB5 | `GlassTimeline` continuous Option C split + `currentSegmentKey` prop + `hoverEnd` event + popover slot | structural split | `src/components/custom/timeline/GlassTimeline.vue` | AB.W2 |
| AB6 | `HoverPopover` `v-model:open` + `update:open` emit | new public model | `src/components/custom/hover-popover/HoverPopover.vue` | AB.W2 |
| AB7 | dock shadow token retirement (NO new substrate; pure mutation) | substrate retirement | `src/styles/tokens.css` (shadow channel) | post-AB hotfix |

## §2 — Consumer count per artefact

Counts use `rg` against `src/` + `demo/` at HEAD (worktree) plus the consumer constellation (`/Users/mkbabb/Programming/speedtest`, `/Users/mkbabb/Programming/words/frontend`, etc.) where the constellation manifest applies.

### N tranche

**N1 — Slider useTouchGate wire**

`rg useTouchGate src/ demo/` returns the canonical instantiation sites:
- `src/components/custom/dock/GlassDock.vue` (canonical first consumer; predates N)
- `src/components/ui/slider/Slider.vue` (this wire)
- `demo/stories/composables/use-touch-gate.vue` (composable story; demo-private exercise)

**Consumer count: 2 production + 1 demo. WIRE-into-≥2 satisfied.**

**N2 — `Section.vue` `backdrop="paper"`**

`rg 'backdrop="paper"' demo/ src/`:
- `demo/stories/primitives/section.vue:96` (the N.W0 A3 proof story)

**Consumer count: 1 demo proof + 0 production. SOFT under-wire.**

The prop is purely additive (default `"none"`) and exercised in its own story. No `<Section>` consumer in `demo/` currently composes the non-default branch outside the dedicated story. The default branch (`"none"`) is byte-identical to the pre-N.W0 surface, so the substrate is binary-safe — but the `"paper"` branch ships as a single-consumer enum value.

**N3 + N4 — `Configurator`/`ConfiguratorRow` `density` prop**

`rg 'density=("mobile"|"compact"|"comfortable"|"spacious")' demo/ src/`:
- `demo/stories/primitives/configurator-mobile.vue:38` (`density="mobile"`)
- `demo/stories/primitives/configurator-mobile.vue:69` (`density="comfortable"`)

**Consumer count: 2 demo (same story; A/B branches) + 0 production.**

The configurator-mobile story exercises two of the four rungs side-by-side. The `compact` and `spacious` rungs are unexercised at HEAD. Default branch resolves to `"comfortable"` (provided by Configurator) which is bit-for-bit identical to the pre-N.W2 baked `gap-1.5 py-2` recipe — substrate-safe but not all branches load-bearing.

**N5 — `density.ts` (`ConfiguratorDensity` type + `CONFIGURATOR_DENSITY_KEY`)**

`rg 'CONFIGURATOR_DENSITY_KEY|ConfiguratorDensity' src/ demo/`:
- 3 production consumers inside `src/components/custom/configurator/` (`Configurator.vue` provide, `ConfiguratorRow.vue` inject, `index.ts` re-export).
- Public re-export via `src/components/custom/configurator/index.ts` lines 9-11.

**Consumer count: 2 production (Configurator provides, ConfiguratorRow injects) + public-surface export. SATISFIED.**

**N6 — 8 `--configurator-row-{gap,py}-{mobile,compact,comfortable,spacious}` tokens**

`rg '--configurator-row-(gap|py)-' src/ demo/`:
- All 8 tokens are referenced exactly once inside `src/components/custom/configurator/ConfiguratorRow.vue` scoped `<style>` (lines 117-135). The scoped CSS selects on `data-density="…"` and pulls each token by name.

**Consumer count per token: 1 internal (the ConfiguratorRow.vue scoped CSS) + N consumers via the `density` prop attribute selector.**

Token-as-substrate consumer count is 1-per-token-name in CSS. The prop-driven attribute selector chains each token to a runtime consumer via the demo `configurator-mobile.vue` (2 rungs exercised). The other 2 rungs (`compact`, `spacious`) ship as unexercised CSS rules. CSS-token visual-load-bearing-ness is satisfied for `comfortable` (no-op restatement of the Tailwind default — by construction) and `mobile` (exercised in the proof story).

**N7 — hero composition wires (`<MetaballCanvas>` ambient + `<TypewriterText>` headline)**

Both primitives existed pre-N; the wire is a consumer addition, not new substrate. `<MetaballCanvas>` consumers at HEAD:
- `demo/stories/motion/metaballs.vue` (canonical primitive story)
- `demo/stories/compositions/hero.vue` (this wire)
- `demo/stories/aurora.vue` (Aurora story)
- (subpath `src/metaballs.ts` re-exports — public surface).

`<TypewriterText>` consumers at HEAD:
- `demo/stories/motion/typewriter.vue` (canonical primitive story)
- `demo/stories/compositions/hero.vue` (this wire)
- (subpath `src/typewriter.ts` re-exports — public surface).

**Consumer count: 2 demo each. WIRE-into-≥2 satisfied.**

**N8 — `demo/stories/primitives/section.vue` `backdrop="paper"` story addition + N9 `configurator-mobile.vue` new story**

Demo-private; manifest-registered (`demo/stories/manifest.ts:103` for configurator-mobile, `:131` for section). Both are private demo helpers per the audit rubric.

**Consumer count: demo-private (out-of-scope for substrate count).**

### AB cohort

**AB1 — `--chassis-max-block-size` token**

`rg --chassis-max-block-size` across the constellation:
- `src/styles/tokens.css` (declaration)
- `/Users/mkbabb/Programming/speedtest/src/components/speedtest/SpeedtestResults.vue` (2 sites; `min-height` + `max-block-size`)
- `/Users/mkbabb/Programming/speedtest/src/components/speedtest/MeterColumn.vue` (2 sites; calc expressions)
- `/Users/mkbabb/Programming/speedtest/src/components/speedtest/ResultStack.vue` (1 ref comment + active sizing)

**Consumer count: 3 cross-repo consumers. SATISFIED.**

**AB2 — `@utility dock-label`**

`rg 'class="dock-label\|\.dock-label\|dock-label\b'` across the constellation:
- `src/styles/typography.css` (declaration; no consumer inside glass-ui — neither DockTabButton.vue nor any demo story uses the class).
- `/Users/mkbabb/Programming/speedtest/src/components/dock/Dock.vue` — 6 consumer call-sites (`Start`, `Next` ×2, `surveyLabel`, `New Test`, free-form `whitespace-nowrap` label).

**Consumer count: 6 cross-repo (speedtest only) + 0 inside glass-ui. SATISFIED (cross-repo); under-wired inside glass-ui (no demo exercises the utility).**

**AB3 — `Pulse variant="aura"` + 6 ambient-pulse tokens**

`rg 'variant="aura"' demo/ src/`:
- 0 occurrences in `demo/` (the `demo/stories/primitives/pulse.vue` story exercises `dots` + `ring` only; no `aura` row).
- 0 occurrences in `src/` outside `Pulse.vue` docstring + animations.css/tokens.css declarations.

**Consumer count: 0 inside glass-ui at HEAD.**

The Pulse.vue file ships the variant + animation hooks; the tokens (`--animate-ambient-pulse-duration`, `--animate-ambient-pulse-scale-min`, `--animate-ambient-pulse-scale-max`, `--animate-ambient-pulse-easing`, `--pulse-aura-opacity-min`, `--pulse-aura-opacity-max`) ship in tokens.css §2.A. No consumer (demo or production-via-public-surface) exercises the variant inside the repository. The AB tranche cohort docs cite the speedtest consumer as the wire target.

`grep -r 'variant="aura"\|Pulse.*aura' /Users/mkbabb/Programming/speedtest` — not run in this lane (β scope is glass-ui-side substrate; cross-constellation consumer adoption is the ι reflog lane's purview). FLAGGED as a substrate-without-glass-ui-consumer finding pending the cross-constellation lane.

**AB4 — `Progress variant="sectioned"` + 2 tokens + 3 new props**

`rg 'variant="sectioned"' demo/ src/`:
- 0 occurrences in `demo/` (the `demo/stories/feedback/progress.vue` story exercises the default variant only).
- 0 occurrences in `src/` outside `Progress.vue` docstring + scoped CSS.

**Consumer count: 0 inside glass-ui at HEAD.**

Same shape as AB3 — variant + tokens (`--progress-sectioned-height`, `--progress-sectioned-track`) + 3 new props (`segments`, `currentSegmentKey`, `activeProgress`) ship as public surface; no consumer exercises the variant inside the repo. Cross-constellation adoption is the ι lane.

**AB5 — `GlassTimeline` continuous Option C split + `currentSegmentKey` prop + `hoverEnd` event + popover slot**

`rg currentSegmentKey demo/ src/`:
- `src/components/custom/timeline/GlassTimeline.vue` (declaration sites; this is the artefact).
- `src/components/custom/timeline/__tests__/continuous-structural-split.test.ts` (`currentSegmentKey: "download"` ×2; `expect(wrapper.emitted("hoverEnd"))` ×2) — test-only consumer.
- `src/components/ui/progress/Progress.vue` (uses the same `currentSegmentKey` prop on `Progress variant="sectioned"`) — distinct artefact but reuses the symbol.

**Consumer count for `<GlassTimeline currentSegmentKey>`: 1 production (Progress.vue indirectly via shared prop semantics) + 1 test + 0 demo.**

The `demo/stories/data/timeline-continuous.vue` + `timeline-segmented.vue` stories were touched in the window but a quick read shows the existing wire continues without exercising `currentSegmentKey` directly (TODO: this β lane is read-only audit; the structural split itself is INTERNAL refactor with the same public surface as AA.W1, so visual load-bearing checks against the existing timeline stories).

**AB6 — `HoverPopover` `v-model:open` + `update:open` emit**

`rg 'v-model:open=' demo/ src/`:
- `src/components/custom/timeline/GlassTimeline.vue:426` — `@update:open="(open) => onPopoverOpenChange(seg, open)"` (timeline consumes the new event on the HoverPopover wrap).
- 2 unrelated `Popover` consumers (`FuzzySearch.vue`, `MultiSelect.vue`) — different primitive (reka `Popover`), not `HoverPopover`.

**Consumer count: 1 production consumer of `HoverPopover @update:open` (timeline) + 0 demo. SOFT under-wire.**

## §3 — Visual-load-bearing-ness verdict

J invariant 10: the consumer must EXERCISE the artefact's intent at default tone.

| ID | Artefact | Verdict | Evidence |
|---|---|---|---|
| N1 | Slider useTouchGate | EXERCISED | `Slider.vue:88-129` wires touch handlers; canonical recipe mirrors `GlassDock.vue:85`. `dock-with-slider.vue` composition story exercises both. |
| N2 | Section `backdrop="paper"` | EXERCISED at the proof story | `section.vue:90-107` renders a PaperBackdrop substrate inside a Section with body text composing above the grain. Visible. |
| N3 | Configurator `density` provide | EXERCISED | `configurator-mobile.vue:38,69` instantiates Configurator at two density rungs side-by-side; the gap/padding differential is visible. |
| N4 | ConfiguratorRow `density` inject | EXERCISED | Inherits from N3 via provide/inject; all 4 ConfiguratorRow children inside the configurator-mobile story render the density-resolved gap. |
| N5 | density.ts symbols | EXERCISED | CONFIGURATOR_DENSITY_KEY provide/inject is the load-bearing axis; type used at 4 sites. |
| N6 | configurator-row-{gap,py}-{4 rungs} tokens | PARTIAL | `mobile` + `comfortable` rungs exercised at the side-by-side proof; `compact` + `spacious` rungs ship as unexercised CSS rules + token declarations. |
| N7 | hero composition (metaballs + typewriter) | EXERCISED | `hero.vue:147` mounts MetaballCanvas behind hero gradients (visible at WebGL + non-reduced-motion); `hero.vue:175-204` types the headline around the italic-f anchor (visible at non-reduced-motion). |
| AB1 | --chassis-max-block-size | EXERCISED cross-repo | speedtest consumes the token at 3 sites with active `min-height`/`max-block-size` clamps. |
| AB2 | @utility dock-label | EXERCISED cross-repo | speedtest Dock.vue mounts 6 DockTabButton labels with the utility; visible weight 500 (not bold) at every dock control. |
| AB3 | Pulse aura + 6 tokens | NOT EXERCISED in glass-ui | `pulse.vue` story exercises dots + ring only; no aura row. Substrate ships as public surface without glass-ui visual proof. |
| AB4 | Progress sectioned + 2 tokens + 3 props | NOT EXERCISED in glass-ui | `progress.vue` story exercises the default variant only; no `<Progress variant="sectioned">` instance. |
| AB5 | GlassTimeline Option C split | EXERCISED | The structural split preserves the existing continuous variant's public surface; timeline-continuous.vue + timeline-segmented.vue + the new test suite exercise the new dot/popover branch. `currentSegmentKey` itself is unexercised at demo (only via the test). |
| AB6 | HoverPopover v-model:open | EXERCISED in production | GlassTimeline.vue:426 consumes `@update:open` to drive `onPopoverOpenChange`; visible as the per-segment popover open/close synchrony. |

## §4 — Findings

### F-β-1 (P1; SOFT under-wire) — Pulse `variant="aura"` + 6 ambient-pulse tokens have ZERO glass-ui consumer

`Pulse variant="aura"` + tokens `--animate-ambient-pulse-{duration,scale-min,scale-max,easing}` + `--pulse-aura-opacity-{min,max}` ship as public surface at v1.1.x without any consumer inside `glass-ui` (demo or src). The canonical Pulse demo story (`demo/stories/primitives/pulse.vue`) exercises `dots` + `ring` only.

**Recommended absorb (in-tranche, demo-side only)**: add a `<Pulse variant="aura">` row to `demo/stories/primitives/pulse.vue` exercising the breathing cycle at the default intensity, plus a one-shot row showing the `once` mode. This is a 5-15 line demo addition, no source change, no public-surface mutation. ABSORBABLE in N.W4.

If not absorbed: the variant is justified by the AB.W3 cross-constellation consumer (speedtest Living-UI canon); document the wire-claim in N.FINAL.md and confirm speedtest consumer count at the ι reflog lane.

### F-β-2 (P1; SOFT under-wire) — Progress `variant="sectioned"` + 2 tokens + 3 new props have ZERO glass-ui consumer

`Progress variant="sectioned"` + `segments` prop + `currentSegmentKey` prop + `activeProgress` prop + tokens `--progress-sectioned-{height,track}` ship as public surface without any consumer inside `glass-ui`. The canonical Progress demo story (`demo/stories/feedback/progress.vue`) exercises the default variant at 5 sites; no `variant="sectioned"` row.

**Recommended absorb (in-tranche, demo-side only)**: add a `variant="sectioned"` row to `demo/stories/feedback/progress.vue` with a 3-segment fixture (`{key, label, color}` ×3) and an active key that animates via the spring fill. 10-20 line demo addition.

If not absorbed: same wire-claim story as F-β-1 — document speedtest as the canonical consumer and verify at ι.

### F-β-3 (P2; SOFT under-wire) — Section `backdrop="paper"` is single-consumer (its own proof story only)

The N.W0 A3 proof story is the only consumer of `backdrop="paper"`. The default `"none"` branch is bit-identical to the pre-N surface (substrate-safe), but the `"paper"` enum value is single-consumer at HEAD.

**Disposition**: ACCEPT. The variant is purely additive and the wire target (Section + paper underpaint composition inside a typography landmark) is exactly the canonical case the prop was designed for. The N wave specs identify Section as the canonical second consumer of paper-backdrop (the AppShell.vue is the first); the proof story IS the consumer demonstration. Mark as "consumer-story-only" and revisit at O if no second `backdrop="paper"` site lands.

### F-β-4 (P2; SOFT under-wire) — ConfiguratorRow density `compact` + `spacious` rungs ship as unexercised CSS

The 4-rung axis (`mobile` | `compact` | `comfortable` | `spacious`) is exercised at `mobile` + `comfortable` only inside the proof story. The other 2 rungs ship as unexercised CSS rules + 4 unexercised token declarations.

**Disposition**: ACCEPT. The 4-rung axis is the canonical density vocabulary used across the library (`metric-pill`, `dock-group`, `dock` density axes all carry the same 4-rung shape). Shipping the full rung set is the consistent design choice. The proof story exercises the diff-from-default rung (`mobile`) + the no-op rung (`comfortable`); `compact` + `spacious` are reasonable to ship as substrate for the same reason `metric-pill` and `dock` ship them.

### F-β-5 (P2; under-wire INSIDE glass-ui) — `@utility dock-label` has zero glass-ui consumer

`.dock-label` is consumed at 6 sites in speedtest Dock.vue but ZERO sites inside `glass-ui` itself — neither `src/components/custom/dock/DockTabButton.vue` nor any demo story uses the class.

**Recommended absorb**: ABSORB at glass-ui by either (a) updating `DockTabButton.vue` to apply `.dock-label` as the canonical text register for its label slot, OR (b) adding a `<span class="dock-label">…</span>` exemplar to the dock-tier demo story. The cross-repo consumer count (6) already satisfies the substrate-with-consumer invariant; this is a "library-side reflexivity" concern (the library declares a utility it never uses on its own primitives).

If not absorbed: AT-RISK for O reverse-overfitting drift if the speedtest consumer evaporates.

### F-β-6 (P2; under-wire INSIDE glass-ui) — HoverPopover `update:open` event has 1 production consumer (timeline only)

`v-model:open` was added at AB.W2 specifically for GlassTimeline's per-segment popover synchrony. Timeline is the only HoverPopover consumer at HEAD that consumes `@update:open`.

**Disposition**: ACCEPT. The model surface is a standard Vue idiom (`v-model:open` is the canonical reactive controller axis), and the GlassTimeline consumer demonstrates the load-bearing case. The HoverPopover primitive itself uses the model internally (`isOpen` ref). The "single consumer" applies to the explicit `@update:open` event hand-off; the underlying model is exercised everywhere HoverPopover is used. Mark as "model-axis substrate" (reka-ui parity) and confirm zero contrivedness.

## §5 — Verdict

**MINOR.**

Two AB.W3 substrate items (F-β-1 Pulse aura, F-β-2 Progress sectioned) ship public-surface variants + tokens + props without any glass-ui-side consumer at HEAD. The L invariant 8 binary verdict says these are substrate-without-consumer at the glass-ui repo boundary. The mitigating context is that both are wire-claimed by the AB tranche (speedtest constellation cohort) — the speedtest consumer is the canonical first consumer. Whether the ι reflog lane verifies that consumer at HEAD will decide if these escalate to BLOCKER.

The N tranche itself (N1-N9) clears β cleanly — every N artefact has ≥ 2 consumers in production or in demo (or is exported / is a private demo helper / has a formal acceptance rationale).

**Recommendation**:
1. (P1) Absorb F-β-1 + F-β-2 in N.W4 with demo-only additions to the existing Pulse + Progress stories. Cost: ~20 lines total, no source mutation, no public-surface change. Closes the substrate-without-consumer gap inside glass-ui.
2. (P2) Surface F-β-5 as an O carry-forward (library-side reflexivity for `.dock-label`).
3. (P2) Accept F-β-3, F-β-4, F-β-6 as documented "single-canonical-consumer" cases with acceptance rationale in N.FINAL.md.

If F-β-1 + F-β-2 are NOT absorbed, escalate to BLOCKER pending ι cross-constellation verification of the speedtest consumer.
