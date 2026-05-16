# P.W3 Lane A — `<Slider variant="glass-scrubber">` substrate promotion

**Wave:** P.W3 HEADLINE — Substrate promotions (Lane A).
**Lane bounds:** `src/components/ui/slider/index.ts` + `src/components/ui/slider/Slider.vue`.
**Status:** COMPLETED.

---

## § 1. Scope

Per `docs/tranches/P/waves/W3.md` Lane A + `docs/tranches/P/audit/P11-Lane-b-fourier-analysis.md` §"P-5 GlassScrubber" (§4 + §9.1.2):

fourier-analysis/web ships 3 shadow-recipe timeline scrubbers — 562 LOC / 82% overlap:

- `web/src/components/visualization/GlassTimeline.vue` — 175 LOC (playback-progress scrubber)
- `web/src/components/ui/SliderControl.vue` — 221 LOC (generic value slider w/ label + numeric input)
- `web/src/components/equation/convergence/ConvergenceTimeline.vue` — 166 LOC (harmonic-count scrubber)

P11/b §4.1 disposition: **WIRE (Option A)** — extend `<Slider>` CVA with a `glass-scrubber` variant; consumers migrate. Audit recommendation accepted at W3 Lane A.

The variant canonicalizes the COMMON geometry across the 3 sites (track substrate + thin-bar thumb + hover-affordance lift). Per-site divergence (track-color tint, track-height, per-instance custom-color flow) routes through the `var(--slider-scrub-*, default)` fallback chain — consumers retint per call site via inline style or scoped CSS without library edits.

---

## § 2. Diff summary

### 2.1 `src/components/ui/slider/index.ts`

- Added `'glass-scrubber': ''` to the `variant` union in `sliderVariants` CVA.
- Extended the docblock variant list with the new entry + 1-line rationale ("tall scrub track + grab-friendly thin-bar thumb; canonicalizes the fourier-analysis 3-site shadow recipe").

### 2.2 `src/components/ui/slider/Slider.vue`

- Extended the `thumbAlignment: 'contain'` defaulting in `delegatedProps` to include `'glass-scrubber'` alongside `'timeline'` + `'glass-pill'` (matches the visual intent — thumb stays inside the track at extrema, no overshoot).
- Added scoped CSS block for `[data-variant="glass-scrubber"]` selectors targeting `.slider-track`, `.slider-range`, `.slider-thumb`:
  - **Track:** `var(--slider-scrub-track-height, 1.25rem)` (median of the 3 sites' 16/20/24px), `var(--surface-tint-6)` resting, `var(--surface-tint-8)` on hover/focus-within, `var(--glass-blur-quiet)` backdrop-filter.
  - **Range:** `var(--surface-tint-8)` resting → `var(--surface-tint-15)` on hover. Pill border-radius. Consumer per-site retint via `--slider-scrub-range-bg` (e.g. SliderControl's `var(--track-color) 25%` flow becomes `style="--slider-scrub-range-bg: color-mix(in srgb, var(--track-color) 25%, transparent);"`).
  - **Thumb:** 6px × 16px thin bar, `border-radius: 2px`, hidden by default (opacity:0). On hover / `:focus-visible` / `[data-held]` / `[data-touch-active]` → opacity:1 + grow to 8px × 18px + lift to `--surface-tint-40`. Reuses the existing baseline `.glass-slider:active .slider-thumb { transform: scale(var(--scale-press-btn)) }` rule.
  - **Focus ring:** `0 0 0 2px color-mix(in srgb, var(--ring) 40%, transparent)` on `.slider-track:focus-visible` — matches the 3 recipes' `box-shadow` focus ring verbatim.
- All paints compose substrate tokens (`--surface-tint-N`, `--ring`, `--glass-blur-quiet`, `--radius-pill`, `--duration-fast`, `--ease-standard`, `--scale-press-btn`). Zero hardcoded colors.
- All geometry is tokenized via opt-in `--slider-scrub-*` fallbacks — consumers override per-instance without scoped CSS edits.

---

## § 3. ≥ 2-consumer verification (P invariant 28 + N invariant 23)

The 3 fourier-analysis sites count as 3 distinct consumers of the variant primitive (per W3 Lane A path A recommendation):

| Consumer site | Recipe LOC | Migration target | Planned wave |
|---|---|---|---|
| `web/src/components/visualization/GlassTimeline.vue` | 175 | `<Slider variant="glass-scrubber">` — 1 instantiation (playback timeline scrubber); migrates `glass-track` / `glass-fill` / `glass-thumb` triad to library-owned substrate | P.W5 Lane B |
| `web/src/components/ui/SliderControl.vue` | 221 | `<Slider variant="glass-scrubber">` — 7 SliderControl call-sites at consumer (FunctionInput / EquationPanel / ContourSettings) auto-migrate via the wrapper retaining its label + numeric-input chassis (slider becomes a child of the wrapper) | P.W5 Lane B |
| `web/src/components/equation/convergence/ConvergenceTimeline.vue` | 166 | `<Slider variant="glass-scrubber">` — 1 instantiation (harmonics-count scrubber); play-button + count-pill stay as-is | P.W5 Lane B |

**Aggregate consumer-side LOC reduction projection:** 562 LOC → ~140 LOC (75%) per P11/b §4.1.

The CR-2 dock typed-context migration (P11/b §2 — `useOptionalDockContext()` adoption) is a prerequisite for SliderControl + GlassTimeline because `<Slider>` already wires the typed dock context internally (`Slider.vue:53`); consumer-side `inject("dockKeepOpen")` lines are deleted in the same P.W5 Lane B write.

---

## § 4. Verification

```
$ npm run typecheck
> vue-tsc --noEmit
(green; exit 0)

$ npm test
> vitest run
 Test Files  32 passed (32)
      Tests  361 passed (361)
   Duration  2.33s
```

**NOT RUN:** `npm run build` (per W3 dispatch operational constraint — sibling agents on Lanes B + C are mid-flight; orchestrator runs the full build at W3 close). Per W3.md Hard Gate (d) the orchestrator integrates build + profile:budget + verify-export-types at close.

---

## § 5. Token-tier optionality

The variant CSS exposes 8 opt-in fallback tokens for consumer retint, all with the inline-default contract `var(--slider-scrub-X, <default>)`:

| Token | Default | Override use case |
|---|---|---|
| `--slider-scrub-track-height` | `1.25rem` | SliderControl's slimmer 1rem variant per-instance |
| `--slider-scrub-track-bg` | `var(--surface-tint-6)` | Custom phase-tinted track substrate |
| `--slider-scrub-track-bg-hover` | `var(--surface-tint-8)` | Hover-state retint |
| `--slider-scrub-range-bg` | `var(--surface-tint-8)` | SliderControl's `var(--track-color) 25%` per-instance flow |
| `--slider-scrub-range-bg-hover` | `var(--surface-tint-15)` | Hover-state retint |
| `--slider-scrub-backdrop` | `var(--glass-blur-quiet)` | Disable blur or swap rung |
| `--slider-scrub-thumb-*` (4) | thin-bar 6→8px × 16→18px, `--surface-tint-25 → --surface-tint-40` | Per-site thumb geometry / color override |

**No new tokens added to `src/styles/tokens.css`** — per the dispatch's Step 3 ("Keep tokens minimal — only ship tokens that the 3 fourier-analysis sites actually customize"). The 3 sites use the SAME canonical recipe except for:
- track-color per-instance (SliderControl) — flows through `--slider-scrub-range-bg` inline override
- track-height per-instance (16/20/24px) — flows through `--slider-scrub-track-height` inline override

Both customization axes route through the inline-default fallback chain. Promoting these to `tokens.css` `:root` defaults would freeze a single value that doesn't match all 3 sites; the fallback-chain shape is the right contract.

---

## § 6. Operational-constraint compliance

- **Hardened-git-clause (K W0):** read-only git only. No `git add` / `commit` / `stash` / `checkout` / `reset` / `restore` / `rebase` / `merge` / `cherry-pick` / `revert` / `push` / `pull` / `fetch --prune` invoked.
- **No `git stash`:** zero stash invocations (P.W2 close shipped `scripts/audit-stash-list.mjs` as a fail-closed gate; this lane respects it).
- **No `npm run build` mid-task:** validated with `typecheck` + `test` ONLY. `dist/` untouched; sibling agents on Lanes B (sidebar split) + C (paper-backdrop /api) safe from collision.
- **File bounds disjoint:** edits scoped to `src/components/ui/slider/index.ts` + `src/components/ui/slider/Slider.vue`. No `tokens.css` edit needed (Step 3 opt-out per § 5 rationale).

---

## § 7. Status

**COMPLETED.** Variant landed; ≥ 2-consumer bar cleared (3 fourier-analysis sites documented for P.W5 Lane B cross-repo write); `typecheck` + `test` green; build deferred to orchestrator-driven W3 close per dispatch.
