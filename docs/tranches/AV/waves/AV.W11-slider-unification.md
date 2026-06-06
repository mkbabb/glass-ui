# AV.W11 - Slider Unification

## State

**Name**: W11 - Slider Unification
**Opens after**: AV.W1 (the `liquid`/continuous-knob Slider fold lands the standard recipe this wave canonicalizes)
**Agents**: 3 parallel
**Hard gate**: `proof:slider-two-only` green — exactly two slider primitives ship (`standard` + `spectrum`), no orphan `[data-variant]` block, the standard thumb resolves to a fully-rounded continuous-track knob.
**Status**: planned

## Goal criterion

This wave succeeds if, when work ends, the reka-backed `<Slider>` carries exactly two recipes — `standard` (the iOS continuous rounded knob) and `spectrum` (the gradient-track color slider) — every former variant is deleted with its scoped CSS, every consumer is ported to one of the two, and the cardinality is frozen by a born-RED-then-green gate.

The user's framing is binding: "why do we have so many kinds — we should essentially have standard (now called glass-scrubber) and the spectrum; ALL consumers should be updated to port to this." We read that as: collapse the six-variant sprawl to two canonical surfaces, the general-purpose knob slider and the color/gradient spectrum slider.

## Scope

1. Re-author the base `.slider-thumb` recipe to the **continuous rounded iOS knob**: a fully-circular thumb (`width == height`, `border-radius: 50%`) that sits *in* the track as one continuous track+knob element — the knob shares the track's vertical center and reads as a lens integrated into the capsule, not a detached bordered disc floating above an offset track. Drop the `2px solid var(--background)` halo-ring border; the knob is borderless and lifts a specular halo on hover/held instead.
2. Rename the `standard` variant's intent in the CVA doc to "the canonical glass-scrubber knob" per the user; keep the CVA key `standard` (it is the `defaultVariant` and the no-variant call site).
3. Re-author the `spectrum` variant from a thin-bar-over-muted-track scrub design into the **gradient-track color slider**: a tall track whose background is a consumer-supplied `linear-gradient` (the LCH/hue ramp), a transparent range, and a small ringed knob that reads against any track hue. This is the second canonical surface — the aurora/blob color-picking slider.
4. Delete the four overfit variants and all their scoped CSS: `timeline`, `glass-pill`, `glass-cartoon`, `glass-scrubber`.
5. Trim `sliderVariants` (`index.ts`) to exactly two keys (`standard`, `spectrum`); keep the `sm | md | lg` size axis untouched; keep the unscoped `[data-held]` halo rule (the dock-keep-open contract).
6. Remove the `delegatedProps` `thumbAlignment = 'contain'` fork for `timeline`/`glass-pill`/`glass-scrubber` (those variants are gone); apply `contain` to `spectrum` so the gradient-track knob never overshoots the capsule.
7. Port every consumer per the §ledger below — each routes to `standard` or `spectrum`, or (for `ScrubberTimeline`) stays a distinct timeline primitive with documented rationale.
8. Add the `proof:slider-two-only` gate, born RED on HEAD (6 keys), green after the trim.

## Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) if:

- the file bounds expand beyond `src/components/ui/slider/*`, `LabeledSlider.vue`, the named demo stories, and `OklchStopRow.vue` — e.g. a slides-repo or sibling-consumer `variant="…"` binding surfaces that the §ledger missed (the W11 grep found none, but a cross-repo re-grep at dispatch that returns a hit invalidates the low-blast-radius assumption);
- the `spectrum` gradient-track re-author needs a runtime hue-ramp computed in TS rather than a consumer-supplied `--slider-track-bg: linear-gradient(...)` (a token-only re-author was assumed; a TS dependency is a scope reveal);
- the continuous-knob CSS, after re-author, fails the rounded-knob assert in `proof:slider-two-only` for a reason not fixable by a local CSS edit (the third diagnostic iteration halts).

## File Bounds

| File | Access |
|---|---|
| `src/components/ui/slider/Slider.vue` | modify |
| `src/components/ui/slider/index.ts` | modify |
| `src/components/custom/labeled-field/LabeledSlider.vue` | modify (verify only — no `variant` passthrough; confirms it stays `standard`) |
| `demo/stories/primitives/slider.vue` | modify |
| `demo/stories/sliders/glass-scrubber.vue` | modify-carve (repoint to `spectrum`, or retire if it adds nothing over the slider story) |
| `demo/stories/compositions/dock-with-slider.vue` | modify (`variant="glass-pill"` → drop, default `standard`) |
| `demo/stories/aurora/OklchStopRow.vue` | modify (LCH knobs → `spectrum` gradient track) |
| `demo/stories/manifest.ts` | modify (slider/scrubber story routes) |
| `scripts/proof-slider-two-only.mjs` | create |
| `package.json` | modify (register the `proof:slider-two-only` script) |

Do NOT touch: `docs/precepts/`, `src/components/custom/timeline/*` (ScrubberTimeline stays — see §ledger), `src/components/custom/tabs/BouncyToggle.vue` (its "slider" is the anchor-positioned active-tab pill, not a `<Slider>`), any aurora `config/*Layer.vue` (they consume `LabeledSlider`, which ports for free).

### Disjointness

Three parallel units, disjoint write sets:

- **AV.W11.a** owns `Slider.vue` + `index.ts` + the gate script + `package.json`.
- **AV.W11.b** owns the demo stories (`slider.vue`, `glass-scrubber.vue`, `dock-with-slider.vue`, `manifest.ts`).
- **AV.W11.c** owns `OklchStopRow.vue` + verifies `LabeledSlider.vue`.

No two units share a `modify` path. Unit b and c depend on a's CVA keyset but only read it; they consume the two-key surface a produces. Sequence: a lands first (sub-wave 1), then b + c parallel (sub-wave 2).

### Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AV.W11.a | `/Users/mkbabb/Programming/glass-ui-w11a` | n/a (JS repo) |
| AV.W11.b | `/Users/mkbabb/Programming/glass-ui-w11b` | n/a |
| AV.W11.c | `/Users/mkbabb/Programming/glass-ui-w11c` | n/a |

Or commit a's keyset trim before parallelizing b + c so both share clean main. The orchestrator runs `git worktree list` / `git worktree add` before dispatch.

## Agent Units

### AV.W11.a The two-recipe surface

- Goal: `<Slider>` ships exactly two recipes — the continuous rounded knob (`standard`) and the gradient-track color slider (`spectrum`) — with the four overfit variants and their CSS deleted, and the cardinality frozen by a gate.
- Mechanism:
  - **Continuous rounded knob.** Re-author `.slider-thumb` (Slider.vue:191-204). Today the thumb is `border-radius: var(--radius-pill)` with a `2px solid var(--background)` ring and a drop shadow — a detached bordered disc. The new recipe: `border-radius: 50%`, `width == height == var(--slider-thumb-size)`, **no border** (drop `--slider-thumb-border-width`/`-color`), `background: var(--slider-thumb-bg, var(--foreground))`, an idle shadow of `none` (or a hairline `--glass-under-shadow`), and the four-state contract carried by `box-shadow` halo rungs:
    - idle — no halo;
    - `:hover` — light halo `0 0 0 4px var(--surface-tint-8)`;
    - `:focus-visible` — the focus ring (keep `focus-ring`);
    - `[data-held]` — the denser halo already at Slider.vue:285 (`0 0 0 8px var(--surface-tint-15)`), kept unscoped.
  - **Continuous track integration.** The thumb's vertical center already equals the track center (reka flex `items-center`); the knob diameter must read as a continuous swelling of the capsule, so the knob sits flush in the track height — for `md`, a 16px knob over a 6px track reads as the iOS proportion (knob ≈ 2.6× track). Keep `thumbAlignment` default (`overflow`) for `standard` so the knob's center tracks the value edge-to-edge. The iOS spring on the thumb is the existing `:active { transform: scale(var(--scale-press-btn)) }` plus a `transition: transform var(--duration-fast) var(--ease-spring-snappy)` (swap the linear `--ease-standard` on the transform channel to the snappy spring ease for the iOS press feel; AV.W1's `liquid` fold already establishes this — fold its recipe in, don't re-derive).
  - **Spectrum gradient track.** Re-author the `[data-variant="spectrum"]` block: `.slider-track` height `calc(var(--slider-thumb-size) * 1.5)`, `background: var(--slider-track-bg)` (consumer supplies a `linear-gradient`), `border-radius: var(--radius-pill)`; `.slider-range` transparent (the gradient is the fill); `.slider-thumb` a small ringed knob — `border-radius: 50%`, a `2px solid var(--background)` ring so it reads against any hue, `box-shadow: var(--shadow-sm)`. Set `thumbAlignment = 'contain'` for `spectrum` in `delegatedProps`.
  - **Delete** the `timeline`, `glass-pill`, `glass-cartoon`, `glass-scrubber` scoped CSS blocks (Slider.vue:233-249, 251-295 minus the unscoped `[data-held]` rule at 285-289, 297-320, 322-382) and remove their `delegatedProps` fork.
  - **Trim** `sliderVariants` to `{ standard: '', spectrum: '' }`; rewrite the CVA doc-comment to the two-recipe story.
  - **Gate** `scripts/proof-slider-two-only.mjs`: parse `sliderVariants` in `index.ts`, assert the variant keyset is exactly `['standard','spectrum']`; scan `Slider.vue` scoped CSS for any `[data-variant="X"]` where X ∉ keyset (fail on orphan); assert the `standard` `.slider-thumb` recipe resolves `border-radius` to `50%` (or `9999px`/pill on an equal width/height) and carries no `border:` declaration (the continuous-rounded-knob contract). Comment-strip, pure default export, JSON artifact. Register `"proof:slider-two-only"` in `package.json`.
- Files: `src/components/ui/slider/Slider.vue`, `src/components/ui/slider/index.ts`, `scripts/proof-slider-two-only.mjs`, `package.json`.
- Sub-gate: `npm run proof:slider-two-only` green; `npm run typecheck` green; the CVA keyset is length-2.

### AV.W11.b The demo story port

- Goal: every demo slider story renders only `standard` or `spectrum`; no story names a removed variant.
- Mechanism:
  - `demo/stories/primitives/slider.vue` — shrink the `variants` matrix array (line 19) from six to `['standard','spectrum']`; drop the `timeline`/`glass-pill`/`glass-cartoon` example cells (lines ~104-128); keep the standard volume/viz-fill/range cells (they're all `standard`); make the spectrum cell a gradient-track example (`:style="{ '--slider-track-bg': 'linear-gradient(...)' }"`).
  - `demo/stories/sliders/glass-scrubber.vue` — repoint the three `variant="glass-scrubber"` cells to `variant="spectrum"` and reframe as "spectrum, retinted via `--slider-track-bg`", OR retire the story if it adds nothing over the slider story's spectrum cell (decide at dispatch; if retired, drop its `manifest.ts` route).
  - `demo/stories/compositions/dock-with-slider.vue` — drop `variant="glass-pill"` (line 78); the dock slider is the canonical `standard` knob; the `keep-dock-open` + `data-held` halo contract is variant-agnostic and survives.
  - `demo/stories/manifest.ts` — update slider/scrubber routes for any retired/renamed story.
- Files: the four demo files above.
- Sub-gate: `grep -r 'variant="\(timeline\|glass-pill\|glass-cartoon\|glass-scrubber\)"' demo` returns zero; the demo dev server renders the slider + scrubber routes without console error.

### AV.W11.c The color-slider + labeled-field port

- Goal: the aurora color picker reads through the `spectrum` gradient track; `LabeledSlider` is confirmed `standard` and reaches all four aurora config layers + blob + settings unchanged.
- Mechanism:
  - `demo/stories/aurora/OklchStopRow.vue` — the three LCH knobs (lines 64-99) are bare `standard` sliders today. Route them to `variant="spectrum"` with a per-channel gradient track: L → a black→white ramp, C → grey→saturated at the row's hue, h → the full hue wheel (`linear-gradient` over OKLCh stops). Each binds `--slider-track-bg`. This is the canonical spectrum consumer.
  - `LabeledSlider.vue` — verify it has no `variant` passthrough (it hardcodes the default `standard`); no change needed. It reaches `TextureLayer`/`NucleiLayer`/`FlowLayer`/`CompositionLayer`, `blob.vue`, `settings.vue`, and the labeled-field/configurator stories — all inherit the new continuous knob for free.
- Files: `demo/stories/aurora/OklchStopRow.vue`, `LabeledSlider.vue` (verify-only).
- Sub-gate: the aurora OklchStopRow renders three gradient-track spectrum sliders; `LabeledSlider` still mounts the `standard` knob across its 9 consumer sites.

## Hard Gate

1. **`proof:slider-two-only` green.** `npm run proof:slider-two-only` exits 0: the `sliderVariants` keyset is exactly `['standard','spectrum']`; `Slider.vue` contains no `[data-variant="X"]` selector for X ∉ keyset; the `standard` `.slider-thumb` recipe resolves `border-radius` to fully-rounded (`50%` or equal-axis pill) and declares no `border`. Born RED on HEAD (6 keys, four orphan blocks). JSON artifact emitted.
2. **Cardinality.** `grep -c "variant:" `… the CVA block lists two members; the four removed variants appear nowhere in `src/` (no scoped CSS, no `delegatedProps` fork, no doc-comment).
3. **Consumer port complete.** `grep -rn 'variant="\(timeline\|glass-pill\|glass-cartoon\|glass-scrubber\)"' src demo ~/Programming/slides/src` returns zero live bindings. (The `IconTooltip.vue:11-12` `variant="timeline"` mention is prose inside a tooltip about keyframes.js's PlaybackRibbon — a doc string, not a `<Slider variant=>` binding — verify it is not a live render and leave or reword the prose.)
4. **`ScrubberTimeline` decision recorded.** `ScrubberTimeline.vue` is a hand-rolled `role="slider"` div primitive dispatched from `<GlassTimeline variant="scrubber">`, NOT the reka `<Slider>`. It is a distinct timeline-scrubber primitive (its own keyboard a11y, caret tooltip, normalized 0..1 contract) with its own consumer (`GlassTimeline`) — it stays, and is out of scope for the slider-variant collapse. The gate asserts the slider collapse did not touch it.
5. **Typecheck + build.** `npm run typecheck` green; `npm run build` green (the `SliderVariants` type narrows to two keys; demo `variants` array typechecks).
6. **Continuous-knob CSS contract.** A reading of `Slider.vue` confirms the `standard` knob is one continuous track+knob element: `border-radius: 50%`, `width == height`, no border ring, halo-on-state rather than a detached offset disc.

## Format And Lint Cadence

- After unit a lands: `npm run proof:slider-two-only` + `npm run typecheck`.
- After units b + c land: `npm run typecheck` + `npm run build` + the demo dev-server smoke of the slider/scrubber/aurora routes.
- Docs-only artifacts in this wave file: `git diff --check` for whitespace.
- No formatter is skipped; the repo's `proof:*` ESM gates are the generated-format check for the new `.mjs`.

## Verification Artefacts

- `scripts/proof-slider-two-only.mjs` JSON artifact (keyset, orphan-selector scan, rounded-knob assert) saved at wave close.
- A before/after screenshot pair of the slider story (six variants → two) and the aurora OklchStopRow (bare knobs → gradient tracks).
- The `git diff` of `Slider.vue` showing the deleted four variant blocks + the re-authored knob + spectrum recipes.
- Commit hashes for the three units.

## Commit Plan

- `feat(tranche-AV): W11 (surface) — Slider two-recipe collapse + proof:slider-two-only` (unit a; the CVA trim, the continuous-knob + gradient-spectrum re-author, the born-RED-then-green gate; commit body required — names the four deleted variants + the rounded-knob contract).
- `feat(tranche-AV): W11 (demo port) — slider/scrubber stories to standard+spectrum` (unit b).
- `feat(tranche-AV): W11 (color port) — OklchStopRow gradient-track spectrum` (unit c).
- `docs(tranche-AV): W11 close — slider-unification status + ledger` (orchestrator close).

## Dependencies

- **Depends on**: AV.W1 (the `liquid`/continuous-knob Slider fold — W11 promotes that recipe to the sole `standard` knob; if W1 has not landed, W11.a authors the continuous knob from the W1 spec directly).
- **Blocks**: the AV tranche close (the `proof:slider-two-only` cardinality freeze is an AV close gate).

## Consumer Port Ledger (canonical)

| Surface / variant | Live consumers (grep-confirmed) | Disposition |
|---|---|---|
| `standard` (default, no variant) | `LabeledSlider` (hardcoded → 4 aurora `*Layer.vue` + `blob.vue` + `settings.vue` + labeled-field/configurator stories), `PresetEditor.vue` sliders, `typewriter.vue` speed slider, slider-story volume/viz-fill/range cells | **KEEP** → becomes the continuous rounded iOS knob |
| `spectrum` | 1 demo cell (slider story) | **KEEP** → re-authored as the gradient-track color slider; gains the OklchStopRow LCH consumers |
| `timeline` | 1 demo cell; `IconTooltip.vue` prose mention only (not a live binding) | **REMOVE** → demo cell deleted; the scrub use-case folds into `spectrum`/`standard` per site |
| `glass-pill` | `dock-with-slider.vue`, 1 demo cell | **REMOVE** → `dock-with-slider` drops to `standard` (the halo/keep-open contract is variant-agnostic); demo cell deleted |
| `glass-cartoon` | 1 demo cell only | **REMOVE** → zero production consumers; deleted without deprecation |
| `glass-scrubber` | `glass-scrubber.vue` story (3 cells + matrix) | **REMOVE** → story repointed to `spectrum` (retint demo) or retired |
| `OklchStopRow` LCH knobs | bare `standard` sliders today (aurora color picking) | **PORT** → `spectrum` gradient track per channel (L/C/h) |
| `ScrubberTimeline` | `GlassTimeline variant="scrubber"` (1 consumer) | **STAYS** — distinct hand-rolled timeline-scrubber primitive (own keyboard a11y + caret), not a reka `<Slider>` variant; out of scope for the collapse |
| slides repo (`~/Programming/slides`) | zero `<Slider>` / `variant="…"` bindings (grep-confirmed) | no port needed |
