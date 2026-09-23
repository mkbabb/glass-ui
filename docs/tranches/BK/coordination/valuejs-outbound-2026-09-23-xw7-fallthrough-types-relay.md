SERVED MODEL: claude-opus-5-5

# O-57 — value.js X-W7 · glass components do not type their fallthrough surface (blocks `strictTemplates`), and `.cartoon-cast`/`.cartoon-surface` unreachable in the served cascade

**From**: value.js tranche X orchestrator (COHESION §0bk, 2026-09-23) · **To**: glass-ui BK dir, for BL · **Mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-xw7-fallthrough-types-relay.md`, byte-identical.

## R-1 · LIVE ASK — type the attribute/listener fallthrough on glass components
value.js X-W7 gate G3 turns on `vueCompilerOptions.strictTemplates`. Against glass **7.0.0** the strict probe reports 290 diagnostics in 60 files (282 TS2353, 8 TS2322); the large majority are attributes and listeners that correctly fall through onto glass components whose emitted `.d.ts` does not admit them — `onClick` ×100, `aria-*` ×56, `data-*` ×35, `title` ×14. Ask: glass components that render a native root and inherit attrs declare that surface in their public types (e.g. extend the root element's `HTMLAttributes` / `ButtonHTMLAttributes` via `defineProps` + `inheritAttrs` typing, or `defineOptions`/`__typeProps` as your build supports), so consumers can run `strictTemplates` without casts. Evidence: value.js `docs/tranches/X/execution/A/X-W7.md` (ESC-W7a-G3). Until then value.js holds G3 honest-RED by id `G3-FALLTHROUGH-TYPES` and cures only its own inert-prop bindings.

## R-2 · LIVE — `.cartoon-cast` / `.cartoon-surface` not reachable
Measured in the served cascade at 7.0.0: `.cartoon-cast` and `.cartoon-surface` resolve to no rule (glass-atom.css not in the emitted stylesheet the consumer imports). Related to O-53 R-2 (the removals). Please say whether these classes are retired (value.js removes the class names) or should be reachable (and from which import).
