# Instructions

Read `docs/precepts/instructions/` first. Local glass-ui rules:

- Glass-ui is a Vue 3.5 and Tailwind 4 component library built with Vite
  library mode. Use strict TypeScript, `verbatimModuleSyntax`, named exports,
  and `import type` for type-only imports.
- Components use shadcn-vue/reka-ui wrappers, CVA variants, and `cn()`
  composition. Do not add `cn()`-only facade components without a wired
  consumer.
- Visual system is token-first. Shared colors, shadows, radii, spacing, and
  typography resolve through `@theme`, `@utility`, documented CSS variables,
  or component variants.
- Interactive components need rest, hover, active, disabled, and
  focus-visible states. Shared styling tweaks belong here as tokens, variants,
  or slot-class props.
- Current proof commands are `npm run typecheck` and `npm run build`. Add
  Vitest or iter-loop commands only when the local tranche/tooling actually
  lands them.
- Browser verification uses the local dev app/story surface. New public
  surface needs a story or manifest entry plus light/dark runtime evidence
  and zero console errors.
- No overfitting. Every public symbol needs a current story, internal
  consumer, external consumer, or deletion. `docs/audits/overfitting-audit.md`
  carries the local evidence sweep.
