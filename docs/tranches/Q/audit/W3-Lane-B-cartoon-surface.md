# Q.W3 Lane B — cartoon-surface re-model

**Lane**: Q.W3 Lane B — `cards.css` glass-cartoon relocation (Q-coh-2 + round-5 Qχ re-scope).
**Bounds**: `src/styles/cards.css`, `src/styles/glass.css`, `CLAUDE.md` — three files only.
**Verification gate**: `npm run typecheck` + `npx vitest run` (no `npm run build`).

## Charter

Round-1 scoped this lane as a flat relocation — move `.glass-cartoon` from `glass.css`
to `cards.css`. The round-5 Qχ adjudication (`docs/tranches/Q/research/Qchi-cartooncard-architecture-adjudication.md`)
re-scopes it: the cartoon surface is not just mislocated, it is **mis-modelled**. It
declares fall-through tokens that resolve nowhere, and it presents as a parallel glass
*tier* when its real substance is three orthogonal *decorations*. This lane drops the
dead tokens, re-models `.glass-cartoon` into a decoration-only `@utility cartoon-surface`,
and relocates it to `cards.css`. `glass.css` is left holding only the 5-rung glass ladder.

Lane H (sibling, runs after this lane) consumes the `@utility cartoon-surface` for
`<Card surface="cartoon">`.

## The dead-token drop — grep evidence

`.glass-cartoon` declared three `var(--glass-{bg,blur,border}-cartoon, var(--glass-…-quiet))`
fall-throughs. The first argument of each was a phantom — never defined anywhere in `src/`.

Pre-change grep (`grep -rn '--glass-bg-cartoon\|--glass-blur-cartoon\|--glass-border-cartoon' src/`):

```
src/styles/glass.css:107:        background: var(--glass-bg-cartoon, var(--glass-bg-quiet));
src/styles/glass.css:108:        backdrop-filter: var(--glass-blur-cartoon, var(--glass-blur-quiet));
src/styles/glass.css:109:        border: 2px solid var(--glass-border-cartoon, var(--glass-border-quiet));
```

Three **consumption** sites, zero **definition** sites. `tokens.css` defines
`--glass-bg-{wash,quiet,resting,floating,overlay}` and the cartoon *shadow* family,
but never a cartoon bg/blur/border token. Consequence (Qχ §2b): at every call site,
in light and dark, `.glass-cartoon` always resolved background / backdrop-filter /
border-color to the **exact `quiet` rung**. The fall-through first-argument was dead
code at every commit.

The drop: the new utility does **not** redeclare `background` / `backdrop-filter` /
`border-color` / `border-radius` at all. Those come from the `glass-${tier}` class the
host (`<Card>`) already applies. Cartoon resolves through `quiet` explicitly — by the
host emitting `glass-quiet` (Lane H wires `tier="quiet"` for legacy CartoonCard), not
by a phantom-token fall-through inside the recipe.

## The `@utility cartoon-surface` recipe

Authored in `src/styles/cards.css` (Tailwind v4 `@utility` syntax, matching the
`btn-audacious` / `popover-animate` recipes in `utilities.css`):

```css
@utility cartoon-surface {
    border-width: 2px;
    box-shadow: var(--shadow-cartoon-md);
    transition:
        transform var(--duration-normal) var(--ease-apple-spring),
        box-shadow var(--duration-normal) var(--ease-apple);

    &:hover:not(:disabled) {
        transform: translate(var(--lift-sm), var(--lift-sm));
        box-shadow: var(--shadow-cartoon-lg);
    }
}
```

It carries **only the three real deltas** Qχ §2c isolates over a bare glass tier:

1. **2px border weight** — `border-width: 2px` (overrides the tier's 1px).
2. **Offset-stamp shadow** — `--shadow-cartoon-md`, lifting to `--shadow-cartoon-lg` on hover.
3. **Hover-lift** — `translate(--lift-sm, --lift-sm)` on `:hover:not(:disabled)`.

It is a **standalone decoration utility** — it requires no specific tier and composes
on top of whatever `glass-${tier}` the host resolves. The utility name is exactly
`cartoon-surface` (Lane H's `surface="cartoon"` branch binds this class). No `position`,
no `contain`, no `border-radius` — those belong to the tier/Card chassis, not the
decoration. All referenced tokens (`--shadow-cartoon-md`, `--shadow-cartoon-lg`,
`--lift-sm`, `--duration-normal`, `--ease-apple-spring`, `--ease-apple`) are confirmed
defined in `tokens.css`.

Note on convergence: Qχ §3 flags an `I.W3` `@utility cartoon-surface` in `utilities.css`.
A grep at HEAD shows `utilities.css` carries only `.shadow-cartoon-{sm,md,lg}` classes —
no `cartoon-surface` utility currently exists there. So `cartoon-surface` is a fresh,
non-colliding name; there is no second cartoon recipe to reconcile.

## The relocation

- `.glass-cartoon` (the rule + its `:hover` rule + the stale leading comment) **removed
  entirely** from `src/styles/glass.css`. `glass.css` now holds only the 5-rung glass
  ladder (`.glass-{wash,quiet,resting,floating,overlay}` + grain `::after` + the
  `.glass-card` / `.glass-btn` / `.btn-pill` / `.input-pill` shorthands and a11y blocks).
- `@utility cartoon-surface` authored in `src/styles/cards.css` under a section header
  documenting the dead-token drop and the compose-onto-a-tier contract.
- `cards.css` header comment refreshed — the prior header described only the C.W5
  `.cartoon-card`/`.elevated-card` removal; it now states `cards.css` is the coherent
  card-feature style home and explains the Q.W3 Lane B re-model.

## CLAUDE.md update

The `styles/` structure block listed:

```
│   ├── cards.css                   # .cartoon-card, .elevated-card, .paper-texture
```

`.cartoon-card` was deleted at C.W5 `304ac78` — the line was stale. Updated to:

```
│   ├── cards.css                   # .paper-texture + @utility cartoon-surface (decoration-only; layers on a glass tier)
```

The `glass.css` line in CLAUDE.md already names only the 5-rung ladder + shorthands
(`.glass-card / .glass-pill / .glass-btn`) — it never listed `.glass-cartoon`, so no
edit is needed there.

## Verification

- `grep -rn 'glass-cartoon' src/` — no `.glass-cartoon` *class definition* remains.
  Residual hits are all expected and out of this lane's bounds:
  - `src/styles/cards.css` — descriptive prose in the new section comment (token name cited).
  - `src/components/ui/cartoon-card/CartoonCard.vue` — Lane H deletes this package.
  - `src/components/ui/slider/Slider.vue` + `slider/index.ts` — the Slider-local
    `data-variant="glass-cartoon"` styling — a **separate artefact** explicitly untouched
    per Qχ §7c.7 (Slider-local cartoon styling, not the CartoonCard surface).
  - `src/styles/tokens.css:355` — a stale `<CartoonCard> or .glass-cartoon` comment;
    Qχ §7c.6 assigns this to the doc-drift work; `tokens.css` is outside this lane's bounds.
- `grep -rn '--glass-bg-cartoon\|--glass-blur-cartoon\|--glass-border-cartoon' src/` —
  zero dangling token *references*; the only hit is descriptive prose in the cards.css comment.
- `npm run typecheck` — GREEN (`vue-tsc --noEmit`, no errors).
- `npx vitest run` — GREEN (32 files, 377 tests passed).

## Verdict

PASS. The phantom `--glass-{bg,blur,border}-cartoon` fall-through layer is dropped.
`.glass-cartoon` is re-modelled into a decoration-only `@utility cartoon-surface` in
`cards.css`, carrying only the three orthogonal cartoon deltas (2px border, offset-stamp
shadow, hover-lift). `glass.css` is reduced to the 5-rung glass ladder. CLAUDE.md's
`cards.css` line refreshed. The utility is named exactly `cartoon-surface` and composes
on any tier — ready for Lane H to consume via `<Card surface="cartoon">`.
