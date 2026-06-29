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
- Proof is the `scripts/gates.mjs` register. `npm run typecheck` and
  `npm run build` are the compile floor; on top of them every wave authors or
  extends a `proof:*` gate (`npm run gates -- --run local|ci|release|full`
  runs the tagged set; `npm run gates -- --list` enumerates them). A gate is
  born-RED on HEAD, GREEN on the fix, and carries a `--self-test` bite. The
  binding visual truth is the π readback (`tests-visual/*.spec.ts`, run via
  `npm run gates -- --run pi`), never a device-free gate alone.
- Browser verification uses the local dev app/story surface (`:5199`). New
  public surface needs a story or manifest entry plus light/dark runtime
  evidence and zero console errors.
- No overfitting. Every public symbol needs a current story, internal
  consumer, external consumer, or deletion — machine-backed by
  `proof:component-orphan` (the ≥2-consumer-or-evidence-doc bar) and
  `proof:consumer-evidence-live` (every `docs/consumer-evidence/<x>.md` is read
  by a gate or pruned). `docs/audits/overfitting-audit.md` is the reusable
  read-only sweep prompt behind those gates.
