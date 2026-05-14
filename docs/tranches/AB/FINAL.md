# AB — FINAL (Living-UI canon; v1.0.5 → v1.1.0)

**Tranche**: AB — Living-UI canon.
**Opened**: 2026-05-12 22:42 EDT (`69c59fa` — first AB commit landing against M close `54a8acb`).
**Closed**: 2026-05-13 00:26 EDT (`a28560f` v1.1.0 release).
**Post-close coda**: 2026-05-13 17:45 EDT (`2b3727f` dock-shadow directional drop + 1px outer ring retired at canonical token).
**Authored retroactively at**: O.W0 Lane A — 2026-05-14.
**Authority**: AB closes retroactively per K invariant 3 (no tranche-letter shadow execution). The work shipped in master between M close (`54a8acb`) and v1.1.0 (`a28560f`); the documentation below closes the precept loop without rewriting history.

## §1 — Per-wave landing summary

### AB.W1 — Chassis token + dock-label typography (commits `69c59fa` → `13f4f87` → `a04f05f`)

- **T1**: `--chassis-max-block-size` token (`tokens.css` +22 lines) — layout-tier guardrail for consumer cards composing consumer-owned `--dock-footer-space` + `--page-padding-top` fallbacks. Speedtest `.results-card` is canonical consumer (repairs B1 occlusion + B10 mobile/desktop fit + H3 mobile-375 CLS 0.926 → ≤ 0.15).
- **T5**: `.dock-label` @utility (`typography.css` +23 lines) — canonical typography register for DockTabButton text labels at `font-weight: 500` (medium rung; NOT bold). Composes `--dock-label-size` knob (14-15px narrow / `--type-subheading` desktop). Resolves the user mandate "the Start text should not be bold". Speedtest swaps `text-heading` → `dock-label` across every DockTabButton text span (B8).
- **(docs)** `13f4f87`: CHANGELOG "Unreleased — AB in-flight (target: v1.1.0 at AB.W4 close)" header + DESIGN.md note for `--chassis-max-block-size`.

### AB.W2 — Timeline Option C structural split + HoverPopover v-model:open (commits `215ad06` → `6263330` → `14631b7`)

- **HoverPopover v-model:open** (`215ad06`): `<HoverPopover>` exposes existing internal `isOpen` ref via `v-model:open` + `update:open` event at SAME debounced cadence the popover reads (`hoverOpenDelay` open + `closeDelay` close). Backward-compatible. Load-bearing for `<GlassTimeline>` continuous-variant pointer-skim cadence.
- **GlassTimeline 4 coupled fixes** (`6263330`): Option C structural split landing T1+T2+T3+T4 in one DOM rewrite —
  - **T1**: Opaque dot (`var(--background)`) + symmetric `box-shadow: 0 0 4px ...` (was directional) + `box-sizing: border-box` + marker `<li>` `display: flex` + `line-height: 0`. Closes B2.a perceived-off-centre.
  - **T2**: `popoverContent` slot. Each marker wraps in `<HoverPopover>` (opt-out via `disablePopover`); default content reads `{ label, value, description, state }` from segment payload; colour-codes via `--popover-tint = segment.gradient.to`.
  - **T3**: `currentSegmentKey` prop. Stamps `data-current="true"`; lets consumers distinguish active phase from transient hovered phase. Substrate for AB.W3 phase-bus echo styling.
  - **T4**: Option C axe split. `.continuous-track-wrap` wrap with sibling `<div role="progressbar" class="continuous-track">` + `<ul role="list" class="continuous-markers">`. Closes the AA-carry-forward `nested-interactive` violation (axe; serious; WCAG 2.0 A — 4.1.2). Marker overlay outside rail clip → dot 14 px box paints in full.
- **(docs)** `14631b7`: CHANGELOG (+95) 5 new entries documenting T1-T4 + HoverPopover update:open passthrough + hoverEnd event; DESIGN.md Timeline §A11y contract rewrite.

### AB.W3 — Pulse aura + Progress sectioned (commits `2796b28` → `a36cae8` → `46d0891`)

- **Pulse aura** (`2796b28`): Third `<Pulse>` variant alongside `dots` + `ring`. Radial-gradient halo absolutely-positioned inside host surface; host owns `position: relative` + `border-radius`; aura inherits both. API additions: `variant: 'aura'`, `intensity: 'subtle' | 'normal' | 'vivid'` (aura-only — scale-max amplitude), `once: boolean` (aura-only — single-breath then settle). 6 tokens at `tokens.css §2.A AMBIENT MOTION`: `--animate-ambient-pulse-{duration,scale-min,scale-max,easing}` + `--pulse-aura-opacity-{min,max}`. Shared `@keyframes ambient-pulse` in `animations.css`. Reduced-motion: scoped `@media` forces `animation: none`, parks at min stop. Speedtest reservation rule: 5 capped surfaces; primitive does NOT mount on a card/chassis (consumer-side reservation).
- **Progress sectioned** (`a36cae8`): Third `<Progress>` variant alongside `default` + `gradient`. Canonical **phase-bus** primitive. API: `variant: 'sectioned'`, `segments?: ProgressSegment[]`, `currentSegmentKey?: string | null`, `activeProgress?: number`. `ProgressSegment` shape: `{ key, label?, color, state?: 'pending' | 'active' | 'completed', weight?: number }`. Per-cell register: pending (frosted @12%) / active (frosted @18% + spring-fill + catch-light sweep `mix-blend-mode: overlay` 1.8s) / completed (saturated 100%). Seams = small gradient blend at `mix-blend-mode: screen`. Rail depth via inset+outer box-shadow + `--shadow-color`. 2 tokens at `tokens.css §2.B`: `--progress-sectioned-height: 0.875rem` + `--progress-sectioned-track: var(--secondary)`. Reduced-motion: sweep + width transition disable; saturation + state distinctions stay visible. Speedtest `MeterColumn.vue` consumes at under-bar phase-bus site.
- **(docs)** `46d0891`: CHANGELOG (+96) 2 new entries — full API docs + token tables + reduced-motion contracts + speedtest consumer adoption notes.

### AB.W4 — Dock-shadow consumer canon + v1.1.0 close (commit `a28560f`; post-close coda `2b3727f`)

- **B5 honesty close** (`a28560f`): CHANGELOG header rewrite from "Unreleased — AB in-flight" → "1.1.0 — 2026-05-13 — AB Living-UI canon (chassis token + timeline structural split + Pulse aura + sectioned Progress + dock-shadow consumer canon)"; package.json 1.0.5 → 1.1.0. CHANGELOG documents dock-shadow consumer recipe (`<GlassDock :style="{ '--shadow-dock-override': 'var(--shadow-uniform)' }">`) as v1.1.0-class canon refinement. Z.W2 (canon since v1.0.1) had shipped the token pairing without a published consumer recipe; AB.W4's Playwright deep-probe reconciled the A4/A5 disagreement and confirmed canon-side health; gap was the consumer recipe.
- **Post-close coda** (`2b3727f`): `--shadow-dock` retired to `0 0 20px [shadow-color 14%]` (single uniform glow); `--shadow-dock-collapsed` retired to `0 0 12px [shadow-color 12%]`. The 1px outer ring + directional drop both retired (the 1.5 px `--glass-border-dock` border already defines silhouette). Override path preserved at `--shadow-dock-override` for consumers that want directional cast. Lands ~17 hours after v1.1.0 close; conceptually closes the AB cycle's terminal substrate edit.

## §2 — Net substrate delta

| Category | Count | Items |
|---|---|---|
| **Tokens added** | 9 | `--chassis-max-block-size` (W1); `--animate-ambient-pulse-{duration,scale-min,scale-max,easing}` + `--pulse-aura-opacity-{min,max}` (W3 — 6 tokens); `--progress-sectioned-{height,track}` (W3 — 2 tokens) |
| **Utilities added** | 1 | `.dock-label` (W1) |
| **Component variants added** | 2 | `<Pulse variant="aura">` (W3); `<Progress variant="sectioned">` (W3) |
| **Component props added** | 5 | `<Pulse>` `intensity` + `once` (W3); `<Progress>` `segments` + `currentSegmentKey` + `activeProgress` (W3) |
| **Component emits added** | 2 | `<HoverPopover>` `update:open` (W2); `<GlassTimeline>` `hoverEnd` (W2) |
| **Component slots added** | 1 | `<GlassTimeline>` `popoverContent` scoped slot (W2) |
| **Public type shapes added** | 1 | `ProgressSegment` (W3) |
| **CSS animations added** | 1 | `@keyframes ambient-pulse` (W3) |
| **Component structural rewrites** | 1 | `<GlassTimeline>` continuous variant — Option C axe split + opaque dot perceived-centering (W2) |
| **Substrate-level token retirements** | 2 | `--shadow-dock` directional drop + 1px outer ring retired to single uniform glow (post-close coda; consumer override path preserved) |
| **Component retirements** | 0 | (pure additive cohort) |
| **Breaking changes** | 0 | (every API addition is backward-compatible) |

## §3 — Bundle-budget rebaseline accounting (K-invariant-3 closure orphan)

**The AB-side origin of the N.W0 bundle-budget rebaseline.**

K W4 (Lane B) established the canonical bundle-budget gate at:
- `dist/glass-ui.js`: 190_000 raw / 33_700 gzip
- `dist/glass-ui.css`: **29_000 raw / 5_750 gzip**

AB shipped roughly **+10 KB CSS additions** across the cohort:
- AB.W1.T1 `--chassis-max-block-size` token block (~0.5 KB)
- AB.W1.T5 `.dock-label` @utility + typography integration (~0.5 KB)
- AB.W3.T1 `<Pulse variant="aura">` recipe + 6 tokens + `@keyframes ambient-pulse` (~3.5 KB)
- AB.W3.T2 `<Progress variant="sectioned">` recipe + 2 tokens + per-cell visual register + sweep + seam gradients + glass-channel depth (~5 KB)
- AB.W4 coda `--shadow-dock` / `--shadow-dock-collapsed` retirement (~-0.2 KB; net reduction)
- Net: ~+9.3 KB raw / +1 KB gzip (approximate; exact figures landed at N.W0 inheritance)

**AB did NOT re-run `npm run profile:budget` at any wave close.** The bundle-budget gate was silently exceeded between AB.W1 and AB.W4. Per K invariant 3, this is the precept violation surface — both the absent plan folder AND the absent budget verification at close.

N.W0 inherited the budget overrun (current draw at N.W0 baseline: 31_875 raw / 5_972 gzip vs. K W4 baseline 29_000 / 5_750). The orchestrator rebaselined CSS budget at N.W0 absorb:

| Budget | K W4 baseline | N.W0 rebaseline | Rationale |
|---|---|---|---|
| `dist/glass-ui.css` raw | 29_000 | **36_000** | AB cumulative additions + ~13% headroom for the v1.1.x minor cohort |
| `dist/glass-ui.css` gzip | 5_750 | **6_700** | Matching headroom |
| `dist/glass-ui.js` raw | 190_000 | 190_000 | No JS-side overrun in AB |
| `dist/glass-ui.js` gzip | 33_700 | 33_700 | No JS-side overrun in AB |

The rebaseline lives at `scripts/profile-bundle.mjs`. **This FINAL.md documents the AB-side ORIGIN of that rebaseline — the K-invariant-3 closure point.** Future tranches re-baseline at their own close per K W4 Lane B precept; AB's missing re-baseline is the canonical "prior orphan" the AB plan folder closes.

## §4 — Carry-forward to N (named-destination per item)

AB-residuals folded at N tranche per the named-destination convention:

| AB residual | N destination | Disposition |
|---|---|---|
| Bundle-budget rebaseline | N.W0 Lane A absorb | ABSORBED — `scripts/profile-bundle.mjs` rebaselined 29_000 → 36_000 raw / 5_750 → 6_700 gzip at N.W0 (per N PROGRESS.md "scope-reveal absorb" entry) |
| Pulse aura demo-side under-wire (F-β-1) | N.W4 β audit + inline absorb | ABSORBED — `demo/stories/primitives/pulse.vue` extended with aura row at default intensity + one-shot row showing `once` mode (per N FINAL §2 W4 entry "β absorbed inline at close ... ~30 lines added to pulse.vue + progress.vue stories") |
| Progress sectioned demo-side under-wire (F-β-2) | N.W4 β audit + inline absorb | ABSORBED — `demo/stories/feedback/progress.vue` extended with sectioned variant row + 3-segment fixture + active-key animation |
| AB.W3 substrate consumer at speedtest | N.W4 ι reflog + N11/f consumer audit + O.W0 Lane Iβ verification | RE-CONFIRMED CANONICAL — per `docs/tranches/O/audit/O11-Lane-f-speedtest.md` §5: 4 aura surfaces (ResultStack, PhaseTimeline, SpeedtestResults×2) + 1 dots-variant idle + Progress gradient at MeterColumn under-bar. AB.W3 substrate consumption holds at HEAD |
| Dock-shadow coda substrate edit | (no N action) | LANDED at AB-time as `2b3727f`; documented retrospectively here |
| Plan folder absent | O.W0 Lane A | ABSORBED — this file + sibling `AB.md` + `waves/W{1,2,3,4}.md` + `PROGRESS.md` + `coordination/CONSTELLATION.md` close the K-invariant-3 violation retroactively |

## §5 — Hard gate (AB close)

- (a) All 4 wave commit chains landed: PASS.
- (b) v1.1.0 tag created + pushed (verified at HEAD post-hoc): PASS.
- (c) CHANGELOG header rewrite + 5 cross-repo lane summary: PASS @ `a28560f`.
- (d) Speedtest cross-repo wire claims documented in commit bodies + CHANGELOG: PASS (per-substrate; AB.W3 substrate consumption RE-CONFIRMED CANONICAL at O.W0).
- (e) Post-close substrate refinement coda landed: PASS @ `2b3727f`.
- (f) `npm run typecheck` + build green at HEAD: PASS (verified post-hoc; AB-side green-gate did not run at the time).
- (g) `npm run profile:budget`: **NOT RUN AT AB CLOSE** — DEFERRED to N.W0 inheritance + rebaseline. Documented as the K-invariant-3 closure orphan in §3.
- (h) FINAL.md authored AFTER (a)-(g): PASS (this file, retrospective at O.W0).
- (i) Close-honesty checklist:
  - Every claim in FINAL.md grounded in commit log / CHANGELOG / post-N audit doc: PASS.
  - Every gate marked MET has a resolving evidence path: PASS.
  - Every cross-tranche debt entry names the next-letter destination (N): PASS (§4).

## §6 — Process observations (AB-canonical precept violations)

AB shipped 8 substrate-touching commits + 2 CHANGELOG/DESIGN docs commits + 1 release commit + 1 post-close coda over ~26 hours of wall-clock **without**:

1. A `docs/tranches/AB/` plan-folder structure at execution time. NO AB.md, NO `waves/AB.W{1,2,3,4}.md`, NO FINAL.md existed at v1.1.0 release.
2. A formal dispatch wave at each wave. Every commit landed direct-to-master without orchestrator-side wave gating, agent-isolation worktrees, or hardened-agent-git clauses.
3. A close ceremony. No 7-agent strengthened post-close audit pattern (which J/K/L/M had codified in `docs/precepts/instructions/tranche/SPEC.md`); no plan-vs-actual audit; no substrate-without-consumer audit; no doc-drift audit; no idiomatic-gestalt audit; no performance audit; no visual-runtime probe; no integrity sweep.
4. A bundle-budget verification at any wave close. The K W4 baseline (29_000 raw / 5_750 gzip) was exceeded silently across the AB cohort; N.W0 inherited the overrun + rebaselined.
5. Demo-side wires for the AB.W3 substrate (Pulse aura + Progress sectioned shipped to public surface without any glass-ui-side demo consumer). N.W4 β audit surfaced + absorbed inline.

The work itself is high-quality + cohesive (10 substrate-additive commits + 1 doc finalize + 1 post-close substrate refinement, all under cumulative reduced-motion contract + tokenization discipline + speedtest wire-claim evidence). The **process** is precept-violating per K invariant 3 (no tranche-letter shadow execution).

This is the second instance of the shadow-execution pattern (V was the first). K W0 codified the no-shadow-execution clause AFTER V; AB executed AFTER K W0 codification — but the clause's enforcement mechanism (orchestrator-side wave gating) was not invoked. O.W0 Lane A closes this retroactively.

## §7 — Versions across AB

| Version | Wave | Headline |
|---|---|---|
| v1.0.5 | (M close, pre-AB) | M.W2 — F-ε-3 Configurator recursion fix + `src/api/` canonical-type promotions + L cosmetic residuals absorb |
| (no intermediate) | AB.W1, AB.W2, AB.W3 | All AB work accumulates under "Unreleased — AB in-flight (target: v1.1.0 at AB.W4 close)" per user 2026-05-13 "Full bump to 1.1" directive |
| **v1.1.0** | AB.W4 | AB Living-UI canon (chassis token + timeline structural split + Pulse aura + sectioned Progress + dock-shadow consumer canon) |
| (post-close coda) | AB.W4 substrate | Dock-shadow directional drop + 1px outer ring retired at canonical token; published as canon-side refinement |

## §8 — Authority

This file (`FINAL.md`) is the canonical AB close artefact, authored retroactively at O.W0 Lane A 2026-05-14. Cross-references:

- `docs/tranches/AB/AB.md` — retrospective plan + thesis + invariants + wave schedule
- `docs/tranches/AB/PROGRESS.md` — reverse-engineered per-commit execution log
- `docs/tranches/AB/waves/W{1,2,3,4}.md` — per-wave specs reconstructed from commit chains
- `docs/tranches/AB/coordination/CONSTELLATION.md` — multi-peer manifest (speedtest canonical consumer; reconstructed retrospectively)
- `docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md` — disposition + verification + open questions (lives in O's audit folder per the post-hoc proof convention)
- `docs/tranches/N/audit/N-audit-beta-substrate-consumer.md` — post-AB β findings (F-β-1 Pulse aura under-wire + F-β-2 Progress sectioned under-wire); N.W4 inline absorb evidence
- `docs/tranches/O/audit/O11-Lane-f-speedtest.md` §5 — AB.W3 substrate consumption RE-CONFIRMED CANONICAL at HEAD

## §9 — Verdict

CLEAN close at v1.1.0 (substrate quality); PRECEPT-VIOLATING close at execution-time process. The work is canonical Living-UI substrate. The process violated K invariant 3 (no tranche-letter shadow execution) — the second instance after V, in spite of K W0's codified no-shadow-execution clause. O.W0 Lane A closes the historical loop retroactively per the K.WV / V-post-hoc pattern.

The AB tranche's most consequential artefact is the **`<Progress variant="sectioned">` phase-bus primitive** — a state-distinct multi-cell variant that defines what "living UI" means as a substrate. Its companion `<Pulse variant="aura">` lifts ambient breathing-motion into tokenized + reduced-motion-gated form. Both compose into the AB Living-UI canon. The chassis token + dock-label utility ground the cohort at the layout + typography tiers; the timeline Option C structural split closes the longest-standing AA accessibility carry-forward in one DOM rewrite; the dock-shadow honesty close documents the consumer canon that Z.W2 had shipped without recipe.

AB is the v1.0 → v1.1 living-UI transition. N inherits the substrate cleanly + closes the AB-process precept-violation surface via plan-folder authoring at O.W0.
