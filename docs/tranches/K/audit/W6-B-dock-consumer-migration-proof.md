# K.W6 Lane B — Dock primary-tier consumer migration (proof)

**Wave**: K.W6 (HEADLINE — architectural transposition)
**Lane**: B — dock consumer migration + recipe deduplication
**Status**: implementation complete, hard-gates c/d satisfied (Lane B scope).
**Branch**: `o-w2_7-instrument-chassis` (Lane A integrated; this lane sequential).

## Decision recap

Strategy 1 selected per W6.md spec: apply `btn-audacious` as a CSS class on the dock-tab DOM element (via Vue `useAttrs`), then have `dock.css` overlay phase-tinted extensions. Strategy 2 (refactor dock-tab Vue to render `<Button variant="primary-audacious">`) was not pursued — it would have required reconciling reka-ui `<Primitive>` polymorphism (`as-child` for `<RouterLink>`/`<a>` consumers) against the canonical Button primitive's CVA shell. Strategy 1 keeps the dock-tab structurally unchanged while composing the canonical recipe.

## Step 1 — Pre-state: dock.css recipe shape

Before refactor, `src/styles/dock.css:702-796` (the line range cited in Lane A's proof) contained five blocks for the primary tier:

1. **Base** (`:713`) — `position: relative; isolation: isolate; overflow: hidden; --dock-tab-min-height: 4rem; padding-inline: 1.5rem; background: color-mix(--card, 60%); color: --foreground; border: 1px solid --glass-border-quiet; box-shadow: --border-hairline, --glass-highlight; transition: <four-prop tuple>`.
2. **Hover** (`:733`) — paper-grain texture overlay + phase-tinted radial + specular hover-shadow swap.
3. **Sparkle `::after` glyph** (`:750`) — the `✦` star at top-left, hidden at rest.
4. **Phase-tint `::before` halo** (`:771`) — `[data-phase]:not([ready|idle])::before` — radial-gradient backplate at `z-index: -1` for active phase tinting.
5. **Sparkle hover animation + PRM gate** (`:787` + `:791`) — `:hover::after { animation: sparkle-sweep ... }` + `@media (prefers-reduced-motion: reduce) { animation: none; opacity: 0 }`.

Total: ~95 lines for the five blocks.

## Step 2 — Refactor split

Per W6.md spec §Lane B Step 1 split:

| Block | Disposition |
|---|---|
| Base — `position: relative`, `isolation: isolate`, `overflow: hidden` | LIFTED → `btn-audacious` |
| Base — `border`, `box-shadow` (border-hairline + glass-highlight) | LIFTED → `btn-audacious` |
| Base — `transition` tuple | LIFTED → `btn-audacious` |
| Base — `--dock-tab-min-height`, `padding-inline`, `background: --card/60`, `color` | KEPT (dock-local structural shell) |
| Hover — paper-grain texture overlay | LIFTED → `btn-audacious` |
| Hover — phase-tinted radial (`--phase-color`) | KEPT (dock-local; canonical uses `--primary`) |
| Hover — specular shadow swap | LIFTED → `btn-audacious` |
| Sparkle `::after` glyph | LIFTED → `btn-audacious` |
| Sparkle hover animation | LIFTED → `btn-audacious` |
| PRM gate | LIFTED → `btn-audacious` (positive-gate idiom — `prefers-reduced-motion: no-preference`) |
| `[data-phase]` `::before` halo | KEPT (dock-local instrument-cluster axis territory) |

## Step 3 — Post-state: dock.css recipe shape

After refactor, `src/styles/dock.css:702-769` contains three blocks (~67 lines, ~30% reduction):

1. **Base** (`:721-727`) — only the dock-local shell:
   ```css
   .dock-tab-button[data-tier="primary"] {
       --dock-tab-min-height: 4rem;
       padding-inline: 1.5rem;
       background: color-mix(in srgb, var(--card) 60%, transparent);
       color: var(--foreground);
   }
   ```
   The lifted properties (`position`, `isolation`, `overflow`, `border`, `box-shadow`, `transition`) come from `btn-audacious` via the Vue-side class composition.

2. **Hover phase-tint override** (`:734-745`) — same `background-image` shape as `btn-audacious:hover:not(:disabled)` but the radial color is `var(--phase-color, var(--foreground))` instead of `var(--primary)`. The `box-shadow` swap (specular highlight) is inherited from `btn-audacious` and not redeclared.

3. **`[data-phase]` `::before` halo** (`:755-769`) — unchanged. The phase-tint backplate halo for active phases.

The sparkle `::after` glyph + sparkle hover animation + PRM gate are now SINGLE-SOURCED in `btn-audacious`. Composition order: `btn-audacious` cascades first (base + hover + ::after + animation), then dock.css's `[data-tier="primary"]` selectors layer the dock-local extensions.

## Step 4 — Refactor strategy chosen

**Strategy 1 — Vue-side class composition**.

`src/components/custom/dock/DockTabButton.vue:1-37` was edited:

- Added `useAttrs` import from `vue` (line 2).
- Computed `isPrimaryTier` flag from `attrs["data-tier"] === "primary"` (line 32).
- Modified `classes` computed (line 34) to add `btn-audacious` when `isPrimaryTier.value` is true:
  ```ts
  const classes = computed(() =>
      cn("dock-tab-button", isPrimaryTier.value && "btn-audacious", props.class),
  );
  ```

The `data-tier` attribute is consumer-set (e.g., `<DockTabButton data-tier="primary">`); the Vue component reads it from `$attrs` and conditionally adds the canonical recipe class. No prop API changes, no breaking change for consumers.

## Step 5 — Vue file edited

`src/components/custom/dock/DockTabButton.vue` — lines 1-37 (script setup block):
- Line 2 — `useAttrs` added to the `vue` import.
- Lines 18-25 — JSDoc comment updated with K.W6 Lane B context.
- Lines 30-34 — `useAttrs` call + `isPrimaryTier` computed + `classes` composition.

The composition site is line 34 — `cn("dock-tab-button", isPrimaryTier.value && "btn-audacious", props.class)`.

## Step 6 — Use-case story venue (≥ 1 demo story consumer beyond Lane A)

**Venue**: `demo/stories/compositions/hero.vue:85`.

**Cell description**: The hero's primary "Start building" CTA — a large feature-CTA in a paper-and-glass radial-bloom hero composition. Pre-state: `<Button size="lg" class="gap-2">Start building <ArrowRight /></Button>` (default variant). Post-state: `<Button size="lg" variant="primary-audacious" class="gap-2">Start building <ArrowRight /></Button>`.

Why this venue: the hero composition is the canonical "Get started" use-case the W6.md spec names as a likely audacious-variant consumer. The "Start building" CTA already carries an `<ArrowRight>` lucide icon and a `lg` size — a real feature CTA, not a swatch in a gallery. The neighboring `<Button size="lg" variant="ghost">View the source</Button>` provides the secondary-action contrast that justifies the audacious treatment on the primary action.

This is the SECOND demo consumer per the W6 hard-gate (d) ≥ 2-consumer bar:
1. Lane A's gallery cell at `demo/stories/primitives/buttons.vue:43-58` (three states — lg/default/disabled).
2. **Lane B's hero CTA at `demo/stories/compositions/hero.vue:85`**.

Plus the dock primary-tier consumer (Step 4 above) — the `data-tier="primary"` consumers at `demo/stories/compositions/instrument-chassis.vue:227` and `demo/stories/primitives/dock-group.vue:56` flow through the canonical recipe via the Vue-side composition.

## Step 7 — Brittleness window declaration

```yaml
brittleness_window:
  declared_at: K.W6
  reason: |
    Phase-color decoupling (Option B) — the canonical `btn-audacious`
    utility uses `--primary` tokens; the dock-local recipe retains
    phase-tinting via a `:hover:not(:disabled)` background-image override
    (`--phase-color` instead of `--primary`). The dock primary tier
    visual signature may shift slightly: (a) the at-rest base now
    inherits btn-audacious's `transition` tuple + `box-shadow` stack
    instead of the original dock-local declarations (intent-equivalent
    but identifier-substituted); (b) the hover composition no longer
    declares the third `none` background-image layer (the original
    `background-image: <texture>, <radial>, none;` triple becomes
    `<texture>, <radial>` — the `none` slot was a no-op holder for
    the legacy three-layer shape); (c) the PRM gate idiom inverts
    from `@media (prefers-reduced-motion: reduce) { animation: none }`
    to `@media (prefers-reduced-motion: no-preference) { animation: ... }`
    — behaviorally identical for both PRM states, but the cascade
    structure differs.
  suspended_gates: dock-primary-tier-visual-fidelity
  restoration_wave: W8 close ceremony π lane visual probe
  retraction_condition: |
    If Playwright PNG-diff at `/primitives/dock-group` and
    `/compositions/instrument-chassis` shows zero substantive delta
    (≤ 0.5% pixel diff threshold) at the W8 π-lane probe, the window
    can be retracted at W8 close. Otherwise, the delta is documented
    in the W8 FINAL.md as the canonical-vs-pre-K.W6 dock primary-tier
    visual signature change.
```

## Step 8 — Verification

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
[vite:dts] Declaration files built in 25954ms.
✓ built in 26.83s
```

Exit code 0. **GREEN.**

### Bundle delta

The `dock.css` shrank by ~28 lines (~1.0 KB unminified — the lifted recipe is now in `btn-audacious`, not duplicated). Net library bundle delta: approximately **0 KB** (the canonical recipe relocated, not added; consumers `@import "@mkbabb/glass-ui/styles"` see a slightly smaller dock.css and the same `btn-audacious` definition Lane A added).

## Hard-gate disposition (Lane B scope)

- (a) `Button variant="primary-audacious"` exists — **DONE** (Lane A; verified by Lane B).
- (b) `btn-audacious` utility ships canonical recipe — **DONE** (Lane A; verified by Lane B).
- (c) Dock primary tier consumes canonical recipe (NOT a duplicated copy in dock.css) — **DONE** (Lane B Step 4).
- (d) ≥ 2 consumers — **DONE**: dock primary tier (DockTabButton.vue) + Lane A's gallery cell + Lane B's hero CTA = 3 consumers.
- (e) Phase-color decoupling decision documented — **DONE** (Lane A's proof + this proof's §Decision recap and Step 7 brittleness window).
- (f) typecheck + build green — **DONE** (Step 8).
- (g) Visual-load-bearing-ness probe — **deferred to W8 π lane** (per Lane A; brittleness window above declares the gate suspension).
- (h) Bundle delta documented — **DONE** (Step 8: ~0 KB net; ~1.0 KB shrink in dock.css).
- (i) Proof docs — **DONE** (Lane A: `W6-A-audacious-cta-variant-proof.md`; Lane B: this doc).
- (j) Orchestrator commit — **deferred** (orchestrator owns the index per K invariant 7).

## Files changed

- `src/styles/dock.css` — refactored `[data-tier="primary"]` block (lifted recipe pieces removed; phase-tint extensions kept).
- `src/components/custom/dock/DockTabButton.vue` — `useAttrs` import + `isPrimaryTier` computed + `btn-audacious` composition in class list.
- `demo/stories/compositions/hero.vue` — primary "Start building" CTA migrated to `variant="primary-audacious"`.
- `docs/tranches/K/audit/W6-B-dock-consumer-migration-proof.md` — this proof.

`src/components/ui/button/index.ts`, `src/styles/utilities.css`, `src/styles/animations.css`, `demo/stories/primitives/buttons.vue` — **untouched** (Lane A territory).

## Git posture

No mutating git subcommand was invoked. Only read-only inspection (`git status`, `git diff --stat`, `git diff <file>`) per K invariant 7 / hardened agent git clause. The orchestrator integrates W6 close.
