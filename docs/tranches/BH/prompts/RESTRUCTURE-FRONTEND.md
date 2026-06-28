# RESTRUCTURE-FRONTEND

A reusable agent-dispatch prompt for restructuring components — the `.vue` files, their composable/state encapsulation, their colocated CSS, the shared stylesheet tree, the selector + reactivity audit, and design cohesion. Drop the body into `AGENT_DISPATCH_TEMPLATE.md` as the *Scope + Non-negotiables* payload.

**When to use:** a wave that splits a god-block SFC into a feature-dir, lifts logic into a `useX`, colocates a component's CSS, or audits the four CSS focus areas / brittle selectors / reactivity. Style changes are **isomorphic** — the restructure moves where a rule lives, never what it paints. Pairs with [RESTRUCTURE-BACKEND](./RESTRUCTURE-BACKEND.md) (its non-component twin) and [LEGACY-EXCISION](./LEGACY-EXCISION.md).

---

```markdown
ROLE: frontend-restructure agent for tranche {LETTER}, wave {WAVE}. "Frontend" = the `.vue`
components, their composable/state encapsulation, their colocated CSS, and the shared stylesheet
tree. Style changes are ISOMORPHIC — the restructure changes structure, not paint.

GOAL: each component family is a clean feature-dir (component + composables + constants + styles +
skeleton), its state encapsulated behind a `useX` composable (not inlined in a `<script setup>`
god-block), its CSS idiomatic-Tailwind / cohesion-homed / brittle-rule-free, its selectors and
reactivity audited, and the whole reading as ONE cohesive design language.

COMPLETION: green typecheck + green build + green visual-π over the affected surfaces, AND a
rendered-evidence proof that the paint is byte-identical pre/post (the isomorphism floor — a
restructure that shifts a pixel is a bug). The design-idiom gates stay green.

THE PRINCIPLE (cite by name):
- COLOCATION: a complex component is a feature-dir — the component at the package root, composables
  under `<dir>/composables/`, constants in `<dir>/constants.ts`, shaders in `<dir>/shaders/`,
  skeletons in `<dir>/skeleton/` (each "if needed"), + a `README.md`. Enforced by `proof:colocation`.
- STATE ENCAPSULATION: a component's logic lives in a `useX` composable / store, not a 300-line
  `<script setup>` god-block. The SFC composes; the composable owns the state machine.
- THE 4 CSS FOCUS AREAS (audit + repair each):
  1. NON-IDIOMATIC TAILWIND → idiomatic. Use the `<util>-(--x)` shorthand; the arbitrary
     `[var(--x)]` form is reserved for fallback-bearing / arbitrary-property / typed-modifier cases
     ONLY. No raw inline px in a template (token-first: a magnitude is a CSS custom property). A
     scoped `<style>` composes a `@theme`-minted utility via `@apply`, never a `text-[var(--…)]`
     arbitrary wrap.
  2. MONOLITHIC-GLOBAL CSS → cohesion-carved partials. A global `*.css` past 500 L carves into a
     same-named subdir of section partials behind a thin `@import` root, CASCADE ORDER preserved.
     Carve by cohesion, never by line count; never split a `:root{}` or a rule mid-declaration. The
     carve emits a byte-equivalent bundle (the empty compiled-cascade diff is the no-delta proof). A
     component-EXCLUSIVE sheet colocates into the component dir; a cross-component recipe / the token
     cascade / the `@theme` STAYS global.
  3. DEPRECATED CSS → excised. A dead `@utility` with zero consumers, a retired token still declared,
     a superseded recipe beside its successor — delete at the root. A retired class is
     DEFINITION-ABSENT + token-absent + dist-absent, not commented.
  4. FRAGILE RULES → robust:
     - `:deep()` reach → `:slotted([data-slot])` + token-only retint. Finish any in-progress
       migration off `:deep()`; do not re-add it.
     - `:global(.dark) .x` → the plain-ancestor `.dark .x`. The compiler DROPS the trailing local
       selector inside a scoped block, leaking the override to the bare `.dark` root (a logged,
       repeated production footgun). NEVER `:global()` to reach a `.dark` ancestor.
     - magic-number / un-tokenized z-index → a `--z-*` scale token.
     - viewport-unit traps (a raw `max-h-[60vh]` in a template) → the bounded token.
     - fragile nested calc/min/max chains → a named token or a single documented calc.
     - tenuous attribute/positional selectors (a `> [data-slot]` direct-child that needs a scope hash
       the child never carries) → `:slotted`.
- REACTIVITY AUDIT: a `computed` that should be a `ref`, a `watch` that double-fires, a v-model that
  silently no-ops on a stale headless-UI binding (a wrong `:prop`/`v-model:slot`/`tag=` compiles but
  never renders live — vue-tsc + unit tests MISS it; only a live render catches it). Verify every
  prop/emit binding renders live, not just compiles.
- DESIGN-COHESION: the family reads as ONE design language (the project's surface material, its type
  scale, its motion clock). A restructure introduces no second motion vocabulary, no second surface
  axis, no hue off the identity (a demo/consumer hue never enters a library token).
- ISOMORPHIC STYLE CHANGES: the restructure changes WHERE a rule lives, not WHAT it paints. Prove it
  with a before/after rendered capture (getComputedStyle / a π screenshot), both light + dark.

WHAT TO DO, per component family in bounds:
1. Lift `<script setup>` logic into a `useX` composable + colocate it.
2. Move the component's private recipe into the right home — a ≥2-consumer or cascade-positioned
   recipe → a central partial; a structurally-local rule → `<style scoped>`.
3. Run the 4-CSS-focus audit + repair.
4. Run the reactivity + selector audit.
5. Confirm design-cohesion against the family's siblings.

HOW (the discipline): one family at a time; `npm run typecheck` + the family's visual-π spec after
each; rendered evidence (a Playwright screenshot / getComputedStyle / contrast probe, NOT file:line
citations) for every CSS/CVA/story change. NO `:deep()` re-add, NO `:global(.dark)`, NO new arbitrary
`[var(--x)]`, NO inline px, NO new god-block SFC, NO paint drift.

NON-NEGOTIABLES: read-only git; stay in bounds; rendered evidence for every visual change; the
isomorphism proof; STYLE.md prose; HALT on scope reveal.

RETURN: per template, plus the before/after rendered-evidence paths and the design-cohesion verdict.
```

---

## Appendix — the localized design-idiom home

The repair targets above are not invented per-wave — they live in the repo's design-idiom doc (the localized home for `@theme`/`@utility` placement, the `var-in-arbitrary` rule, the CSS god-module carve discipline, the colocation CSS half, the `:global()` footgun, and the recorded twin-divergences). A frontend-restructure agent points its CSS half at that home rather than re-deriving the rules. The isomorphism floor is the whole game: a restructure that moves a rule but shifts a pixel has failed, and the only proof is a rendered before/after, both modes — never a claim that the move "should be" identical.
