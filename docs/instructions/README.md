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
- Proof is `node scripts/gate-register.mjs` — the seat register, fixed at
  `seats:60`, whose receipt must end `violations:0`. A wave mints no seat and
  no new `G-` id; a new invariant lands as an ordinary vitest file under
  `tests/`, born-RED on HEAD and GREEN on the fix. `npm run typecheck` and
  `npm run build` are the compile floor, `npm test` the battery. The binding
  visual truth is the π readback (`tests-visual/*.spec.ts`, via
  `npx playwright test --config tests-visual/playwright.config.ts`), never a
  device-free test alone.
- Browser verification uses the local dev app/story surface (`:5199`). New
  public surface needs a story or manifest entry plus light/dark runtime
  evidence and zero console errors.
- No overfitting. Every public symbol needs a current story, internal
  consumer, external consumer, or deletion. The bar is the
  ≥2-consumer-or-evidence-doc one, and no gate holds it — the `proof:*`
  namespace collapsed at `1c2cda3a` (#65, the gates-abrogation mandate).
  `docs/audits/overfitting-audit.md` is the sweep that finds the violations,
  run by hand at tranche close. Dispose of every row in the same pass —
  nothing holds a found row between runs.
