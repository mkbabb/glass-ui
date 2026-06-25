# foundations/shadows — COMPONENT deep audit (Pass-E)

**Page:** `demo/stories/foundations/shadows.vue` → import label `/foundations/shadows`
**Underlying "component":** this is a TOKEN-tour page, not a Vue SFC. The real source surface is the **§7 shadow token system** + the **`cartoon-surface` `@utility`**:
- `src/styles/tokens/shadow.css` (the §7 token home — carved from tokens.css; every `--shadow-*` rung)
- `src/styles/cards.css:178-193` (`@utility cartoon-surface` — the only behavioural surface: 2px bezel + offset-stamp + hover-lift)
- `src/styles/utilities/components.css:290-320` (the `.shadow-cartoon-{sm,md,lg}` utility rules)
- `src/styles/theme/bridges.css:296-324` (the `@theme` bridge → `shadow-*` Tailwind utilities)
- dark arm: `src/styles/tokens/dark-arm.css:167-176` + `light-dark.css:119,172-174`
- color base: `src/styles/tokens/color-radius.css:104` (`--shadow-color: var(--foreground)`)

This audit is the COMPONENT (the token system), NOT the demo presentation (demo concerns already owned by `BD.W-TOKEN-TOUR-GLASS` / `BD.W-PAGE-HEADER-FOLD` / `BD.W-PAGE-OFFTOKEN-SWEEP`).

---

## (1) ANIMATION — affordance, four-state contract, motion-canon

The shadow tokens are **static values** (no animation surface of their own — correct; a shadow is a value). The ONLY animated surface in scope is `@utility cartoon-surface`:

```css
@utility cartoon-surface {
    box-shadow: var(--shadow-cartoon-md);
    translate: 0;
    transition:
        translate var(--duration-normal) var(--spring-smooth),
        box-shadow var(--duration-normal) var(--ease-standard);
    &:hover:not(:disabled) {
        translate: var(--lift-sm) var(--lift-sm);   /* -1px -1px */
        box-shadow: var(--shadow-cartoon-lg);
    }
}
```

- **GOOD (idiomatic motion-canon):** the SPATIAL `translate` leg rides `--spring-smooth`, the EFFECTS `box-shadow` leg rides the bezier `--ease-standard` — the P1 spring-iff-spatial / bezier-iff-effect split is CORRECT here. Compositor-friendly `translate` (not `top/left`). `:not(:disabled)` state guard present. `translate: 0` mints the stacking context once at rest (the AQ.W3 idiom).
- **MISS — no PRESS/active state (the four-state contract is 2-of-4).** `cartoon-surface` has rest + hover only. No `:active` press register (the W-PRESS-UNIFY `--*-press-t` coupled spring, the `.tap-squish`/`.glass-press` floor) — a "paper-on-paper" sticker that lifts on hover but does NOT press on click reads incomplete against the affordance-map's four-state bar. The library's press primitive exists (`useSpringPress`/`useLiquidPress`) but the cartoon surface never reaches it.
- **MISS — no entrance/exit (per motion-canon P2).** The cartoon plate has no mount entrance; it appears flat. (Acceptable for a static decoration, but the SOTA bar wants an opt-in coupled reveal.)
- **JANK — `--duration-normal` over the per-spring clock (the W-GLASS-CAL fence).** The `translate` leg pairs `--spring-smooth` with the GENERIC `--duration-normal`, not its matched `--spring-smooth-duration` settle clock. This is the EXACT re-timed-tail class CLAUDE.md's §"per-spring DURATION clock" condemns — the spring curve normalizes to 0..1 and discards settle time, so the generic clock drags a sub-pixel tail past the spring's perceptual arrival. The shipped fix vocabulary is `--spring-smooth-duration`; cartoon-surface predates the adoption.
- **DEMO-side hover jank (the card on the page, not the component):** `shadows.vue:66-67` writes `transition-transform duration-fast ease-out` but `hover:shadow-cartoon-hover` ALSO swaps the shadow — the transition allowlist is `transform` only, so the shadow SNAPS while the translate glides (a desync). This is a demo-local hand-roll bypassing `cartoon-surface` (which transitions BOTH legs correctly). Demo-only, but it teaches the wrong idiom.

## (2) PROCEDURAL VIZ
None. No aurora/blob/fourier on this page. N/A — out of scope for the shadow token system.

## (3) PERFORMANCE
- **Compositor-only:** the cartoon hover animates `translate` + `box-shadow`. `box-shadow` is a PAINT property (not layout) — no reflow, `proof:no-layout-animation` holds. `translate` is compositor. GOOD.
- **No offscreen-pause concern** (no rAF, no GL). N/A.
- **No layout-thrash.** The shadow rungs are pure `var()` `color-mix()` values resolved once. GOOD.
- **Minor:** `--shadow-cartoon-{md,lg}` are 3-layer comma stacks; a 6-cell grid × 3-layer shadow is trivial paint cost. Fine.

## (4) SAFARI COMPATIBILITY
- `color-mix(in srgb, …)` — Safari 16.2+. GOOD (the whole token ladder speaks it).
- `light-dark()` (light-dark.css:119,172-174) — Safari 17.5+. The `dark-arm.css` `.dark` block is the explicit fallback floor BELOW the light-dark() arm (the §2c discipline), so pre-17.5 Safari gets the dark cartoon shadow via the plain `.dark` re-resolution. GOOD — no light-dark() inset-shadow trap here (the cartoon/elevation shadows are NON-inset; the trap is documented + avoided).
- Individual `translate:` longhand — Safari 14.1+. GOOD.

## (5) IDIOMATIC / NO-LEGACY — the real component defects

- **DEFECT A — `--shadow-soft` / `--shadow-elevated` are DEAD + non-adaptive (overfitting-audit + token-identity violation).** `tokens/shadow.css:11-12` (and the dark-arm re-decl `:169-170`) author them as RAW `rgba(0,0,0,0.1)` / `rgba(0,0,0,0.12)` — the ONLY two shadow rungs that DO NOT ride `--shadow-color`/`--foreground` (every other rung — xs..2xl, cartoon, modal, dock — composes `color-mix(in srgb, var(--shadow-color) N%, transparent)` and flips warm light→dark by construction). A hardcoded `rgba(0,0,0,…)` is a COLD black cast over the warm-cream identity (the W-NO-GRAY register's spirit) AND it forces the manual `.dark` re-declaration the adaptive rungs avoid. Worse: **grep proves ZERO `src/components/` consumers** — `shadow-soft`/`shadow-elevated` are demoed on this page but referenced by NO real component (the dead-token class W-DEAD-SWEEP/`proof:no-dual-path` targets). They are shelf-ware shown in a spec-sheet.
- **DEFECT B — `cartoon-surface` four-state gap (see §1):** no press state, generic `--duration-normal` clock not the per-spring settle clock.
- **DEFECT C — alias-bloat (the `--cartoon-shadow`/`--soft-shadow`/`--elevated-shadow`/`--modal-shadow` mirror block, shadow.css:17-21).** Each `--shadow-*` carries a reversed-name `--*-shadow` alias re-export, then the `@theme` bridge reads the alias BACK (`bridges.css:298: --shadow-cartoon: var(--cartoon-shadow)` which `tokens/shadow.css:17` set to `var(--shadow-cartoon)`). A round-trip self-reference (`--shadow-cartoon` → `--cartoon-shadow` → `--shadow-cartoon`) that exists only as historical naming residue — a candidate to collapse to one canonical name (no-legacy / clean-break).
- **GOOD:** the cartoon-shadow OVERRIDE CONTRACT is sound (override on `:root`, never a dead local) and machine-locked by `proof:shadow-contract` (CHAIN-INTACT / OVERRIDE-RESOLVES / DARK-ARM-ALLOWED). The adaptive rungs (xs..2xl, cartoon, modal, dock) are the model. The `cartoon-surface` "specimen IS the demo" fence is correctly recorded in `BD.W-TOKEN-TOUR-GLASS` (the swatch is KEEP, not folded onto ShowcaseFrame).

## (6) GLASS SIX-LAYER COMPOSITE
The shadow token system supplies layer 5 (DROP SHADOW) of the six-layer composite — that is its role, correctly. The demo's "Cartoon lift" card composes `glass-card` (which DOES carry the full composite: backdrop blur+saturate · tint · rim · `::before` catch-light · grain) PLUS the cartoon offset shadow. So the composite IS present where a glass surface hosts the shadow. The bare elevation swatches (`bg-card` divs) are intentionally NON-glass specimens (the box-style IS the shadow demo — the KEEP fence). Correct.

---

## FOLD/MODIFY/AUGMENT/PRUNE → BD tranche mapping

- **PRUNE — DEFECT A (dead `--shadow-soft`/`--shadow-elevated`).** No live `src/` consumer. Map to **`BD.W-MISSED-SLAB-CENSUS`** (the dead-surface census) OR **`BD.W-WEAK-KEEP-REGRADE`** (the ≥2-consumer regrade) — retire both rungs (clean break, no alias) OR, IF a real consumer is intended, AUGMENT them to ride `color-mix(in srgb, var(--shadow-color) N%, transparent)` so they join the adaptive family + drop the dark-arm re-decl. Either way the raw-`rgba(0,0,0)` non-adaptive form must die. NEW micro-wave candidate `BD.W-SHADOW-SOFT-ADAPTIVE` if neither census wave claims it.
- **MODIFY — DEFECT B (cartoon-surface clock + press).** Re-point the `cartoon-surface` `translate` transition from `--duration-normal` to `--spring-smooth-duration` (the per-spring settle clock) + add the `:active` press register (compose the `.glass-press`/`--*-press-t` floor). Map to **`BD.W-BC-COMPONENT-CANON`** (the component four-state/motion-canon sweep) or **`BD.W-DESHADCN-CANON`**; cite the W-GLASS-CAL Unit 3 + W-PRESS-UNIFY vocabulary.
- **AUGMENT — DEFECT C (alias round-trip).** Collapse the `--*-shadow` reversed-alias mirror block to the canonical `--shadow-*` names; re-point the `@theme` bridge to read the canonical token directly. Map to **`BD.W-PAGE-OFFTOKEN-SWEEP`**'s sibling token-canon sweep or a fresh token-hygiene micro-wave — gated by `proof:shadow-contract` staying GREEN.
- **NO-OP (already owned) — the demo presentation.** The shadows swatch KEEP fence, the page-header fold, the `text-white`-over-fill sweep are demo-side and already mapped to `BD.W-TOKEN-TOUR-GLASS` / `BD.W-PAGE-HEADER-FOLD` / `BD.W-PAGE-OFFTOKEN-SWEEP`. The demo-local hover-shadow-snap desync (`shadows.vue:66`) should fold the hand-rolled card onto `cartoon-surface` (which transitions both legs) — add to `BD.W-PAGE-OFFTOKEN-SWEEP` or `BD.W-TOKEN-TOUR-GLASS` Arm A scope.
- **User-ask (bigger main card / sub-sections in glass cards / dock contextual-switching / glass-over-colorful-aurora):** these are PAGE-LAYOUT asks owned by the Band-4 demo-modernization waves (`BD.W-TOKEN-TOUR-GLASS` Arm B brings the BC glass band onto a foundations tour over the static wash — but note the ONE-GL-PER-ROUTE fence keeps foundations on a paper/grid wash, NOT a live aurora; a colorful-aurora backdrop for a foundations token page would VIOLATE the budget unless promoted to a substrates route). Flag: the "glass over colorful aurora" ask conflicts with the foundations static-wash budget — resolve at the band level, not this component.
