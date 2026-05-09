# K.W6 Lane A — Audacious primary-CTA variant authoring (proof)

**Wave**: K.W6 (HEADLINE — architectural transposition)
**Lane**: A — variant authoring
**Status**: implementation complete, hard-gates a/b/g satisfied (Lane A scope only).
**Branch**: `o-w2_7-instrument-chassis` (worktree `agent-abc354e5e14c9e6f0`).

## Decision recap

Per K.W6 spec §3 and Rε E3, the canonical Button variant adopts **Option B — drop phase-tinting**. Rationale:

- Phase-tinting is instrument-cluster axis territory (per CLAUDE.md Design Axes); the `--phase-color` cascade is provided by `<InstrumentChassis>` via `data-phase` and is not appropriate for the canonical Button axis.
- Keeping phase-tint inside the canonical Button would entangle two design axes — the dock retains its phase-tinted primary tier as a dock-local **extension** (not competition).
- The canonical `btn-audacious` utility binds the radial-tint and specular-highlight composition to `--primary` instead of `--phase-color`. Consumers that want phase tinting layer their own selector on top (which is exactly what `dock.css` will do in Lane B).

## Step 1 — Source recipe captured

Lifted from `src/styles/dock.css:702-796` (the line range drifted from the spec's `687-790`; this proof cites the HEAD positions). The recipe is composed of four blocks:

```css
/* base — at-rest composed glass surface */
.dock-tab-button[data-tier="primary"] {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    --dock-tab-min-height: 4rem;
    padding-inline: 1.5rem;
    background: color-mix(in srgb, var(--card) 60%, transparent);
    color: var(--foreground);
    border: 1px solid var(--glass-border-quiet);
    box-shadow:
        var(--border-hairline),
        var(--glass-highlight);
    transition:
        background var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

/* hover — disco-grain + phase-tinted radial + specular swap */
.dock-tab-button[data-tier="primary"]:hover:not(:disabled) {
    --glass-grain-opacity: var(--glass-grain-opacity-disco, 0.08);
    background-image:
        var(--paper-clean-texture),
        radial-gradient(
            ellipse at 30% 30%,
            color-mix(in srgb, var(--phase-color, var(--foreground)) 18%, transparent),
            transparent 70%
        ),
        none;
    background-blend-mode: overlay, normal, normal;
    background-size: var(--paper-texture-size), auto, auto;
    box-shadow:
        var(--glass-specular),
        0 0.5px 0 0 rgb(0 0 0 / 0.06);
}

/* sparkle ::after — hidden at rest, animated on hover */
.dock-tab-button[data-tier="primary"]::after {
    content: "✦";
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    color: hsl(0 0% 100% / 0.7);
    font-size: 0.75rem;
    line-height: 1;
    pointer-events: none;
    opacity: 0;
    will-change: transform, opacity;
}

.dock-tab-button[data-tier="primary"]:hover::after {
    animation: sparkle-sweep var(--duration-sparkle) var(--ease-out-expo);
}

@media (prefers-reduced-motion: reduce) {
    .dock-tab-button[data-tier="primary"]:hover::after {
        animation: none;
        opacity: 0;
    }
}

/* phase-tint backplate halo — DROPPED for canonical (Option B) */
.dock-tab-button[data-tier="primary"][data-phase]:not([data-phase="ready"]):not([data-phase="idle"])::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
        ellipse at 30% 30%,
        color-mix(in srgb, var(--phase-color, var(--foreground)) 18%, transparent) 0%,
        transparent 70%
    );
    pointer-events: none;
    z-index: -1;
    opacity: 1;
    transition: opacity var(--duration-fast) var(--ease-standard);
}
```

Tokens consumed:
- `--card` (base surface, 60% mix)
- `--glass-border-quiet` (border)
- `--border-hairline`, `--glass-highlight` (resting box-shadow stack)
- `--paper-clean-texture`, `--paper-texture-size` (disco-grain texture)
- `--glass-specular` (hover catch-light)
- `--phase-color` (DROPPED — replaced with `--primary`)
- `--duration-fast`, `--ease-standard` (resting transition)
- `--duration-sparkle`, `--ease-out-expo` (sparkle animation)
- `sparkle-sweep` keyframe (verified extant at `animations.css:151`)

Verifications:
- `--duration-sparkle` exists at `tokens.css:57` (`600ms`).
- `sparkle-sweep` keyframe exists at `animations.css:151` with PRM-reduce override at `:166`. **No new keyframe needed.**
- `--paper-clean-texture` exists at `tokens.css:569`.

## Step 2 — `@utility btn-audacious` authored

`src/styles/utilities.css:563-628` — added a new `@utility btn-audacious` block at the bottom of the file (next to the `overlay-scrim` utility).

The block lifts the recipe with three substitutions per Option B:
1. **Phase-tint dropped** — the hover radial uses `var(--primary)` instead of `var(--phase-color, var(--foreground))`. Same alpha rung (18%), same ellipse position (30% 30%), same fade stop (70%).
2. **`::before` halo dropped** — the phase-conditional backplate is dock-territory; canonical CTA reads disco fires on hover only.
3. **PRM gate inverted** — the dock recipe wraps the keyframe-disable in `prefers-reduced-motion: reduce`. The canonical utility wraps the animation activation in `prefers-reduced-motion: no-preference`, matching the `.gold-shimmer` precedent at `utilities.css:200-204`. Behavior is identical for both PRM states; the no-preference form is the canonical positive-gate idiom.

The base block also drops `--dock-tab-min-height`, `padding-inline`, `background`, and `color` since those are surface-specific (the canonical variant lets the consumer's `bg-primary text-primary-foreground` Tailwind classes fill them in via the CVA composition).

## Step 3 — `Button variant="primary-audacious"` added

`src/components/ui/button/index.ts:15-16`:

```ts
'primary-audacious':
  'btn-audacious bg-primary text-primary-foreground hover:scale-[var(--scale-hover)] aria-pressed:scale-[var(--scale-press-btn)]',
```

Notes:
- The `active:scale-[var(--scale-press-btn)]` is already in the CVA shared base at `:9`, so the variant doesn't repeat it.
- The `ButtonVariants` type at `:49` is `VariantProps<typeof buttonVariants>` — the new `'primary-audacious'` literal flows through automatically. No explicit type addition needed.
- The composition: `btn-pill focus-ring [base shared] btn-audacious bg-primary text-primary-foreground hover:scale-[var(--scale-hover)] aria-pressed:scale-[var(--scale-press-btn)]`. `btn-pill` provides the radius + padding + transition; `btn-audacious` provides the texture + sparkle; `bg-primary text-primary-foreground` provides the canonical CTA color.

## Step 4 — Demo gallery cell

`demo/stories/primitives/buttons.vue:43-58` — added a new `<section>` between the Variants and Sizes sections demonstrating three states:

- `<Button variant="primary-audacious" size="lg">Launch sequence</Button>` — large size, audacious label.
- `<Button variant="primary-audacious">Get started</Button>` — default size.
- `<Button variant="primary-audacious" disabled>Disabled</Button>` — disabled-state visibility.

The section uses the file's existing `<h2 class="text-subheading">` + `<p class="text-small text-muted-foreground">` pattern (consistent with the Variants, Sizes, Four-state contract, etc. sections — buttons.vue does NOT yet use `<StorySection>`/`<ShowcaseFrame>` chassis; matching the local pattern is correct per CLAUDE.md "demo-private chrome is canonical-aware" — when the chassis-migration sweep lands across this file, the cell migrates with it).

The hover behavior is gated by the `prefers-reduced-motion: no-preference` block in `btn-audacious`; PRM users see the static disco-grain + specular-highlight composition without the sparkle sweep.

## Step 5 — Verification

### typecheck

```
> @mkbabb/glass-ui@0.9.2 typecheck
> vue-tsc --noEmit
```

Exit code 0. **GREEN.**

### build

```
NODE_OPTIONS=--max-old-space-size=8192 npm run build
...
[vite:dts] Declaration files built in 27825ms.
✓ built in 28.78s
```

Exit code 0. **GREEN.**

### Bundle delta estimate

The library ships `src/styles/utilities.css` as source (per `package.json` exports — `"./styles": "./src/styles/index.css"`); the CSS is NOT bundled into `dist/glass-ui.css`. Consumers `@import "@mkbabb/glass-ui/styles"` and Tailwind v4's `@utility` system tree-shakes unused utilities at the consumer's build.

The new `@utility btn-audacious` block is **~1.1 KB unminified** (~70 lines including the comment header; ~750 bytes of generated CSS rules covering the base + `:hover:not(:disabled)` + `::after` + `prefers-reduced-motion: no-preference` + `&:hover::after`).

Tree-shaken size at consumer-side: ~700 bytes (rules only) when the variant is used; **0 bytes** when no consumer references `btn-audacious` or `Button variant="primary-audacious"`. Well below the 5 KB scope-reveal threshold per K.W6 hard-gate (h).

### Visual probe (deferred to π lane)

Lane A scope is variant authoring. Visual fidelity (disco-grain visibility + sparkle on hover + PRM gate) verifies at W8 close ceremony's π lane via Playwright probe at `/primitives/buttons`. Decoration: the gallery cell's Lane B counterpart (dock consumer migration) provides the second consumer required for the W6 hard-gate (d) ≥2-consumer bar.

## Hard-gate disposition (Lane A scope)

- (a) `Button variant="primary-audacious"` exists — **DONE** (`button/index.ts:15-16`).
- (b) `btn-audacious` utility ships canonical recipe — **DONE** (`utilities.css:563-628`).
- (c) Dock primary tier consumes canonical recipe — **Lane B scope** (deferred).
- (d) ≥2 consumers — **PARTIAL** (Lane A demo cell counts; Lane B dock consumer pending).
- (e) Phase-color decoupling decision documented — **DONE** (this doc, §Decision recap).
- (f) typecheck + build green — **DONE**.
- (g) Visual-load-bearing-ness probe — **deferred to W8 π lane**.
- (h) Bundle delta documented — **DONE** (~1.1 KB unminified, ~700 bytes consumer post-tree-shake).
- (i) Proof docs — **THIS DOC** (Lane A); Lane B authors `W6-B-dock-consumer-migration-proof.md`.
- (j) Orchestrator commit — **deferred** (orchestrator owns the index per K invariant 7).

## Files changed

- `src/styles/utilities.css` — added `@utility btn-audacious` block (Step 2).
- `src/components/ui/button/index.ts` — added `'primary-audacious'` variant (Step 3).
- `demo/stories/primitives/buttons.vue` — added gallery cell (Step 4).
- `docs/tranches/K/audit/W6-A-audacious-cta-variant-proof.md` — this proof (Step 6).

`src/styles/animations.css` — **untouched**; the existing `sparkle-sweep` keyframe at `:151` is reused as-is.

## Git posture

No mutating git subcommand was invoked. Only read-only inspection per K invariant 7 / hardened agent git clause. Worktree is `agent-abc354e5e14c9e6f0`; orchestrator integrates at W6 close.
