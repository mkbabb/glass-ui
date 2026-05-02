# F.W6 Residuals

Generated: 2026-05-02
Status: accepted, bounded

W6 ran six read-only audit lanes, folded the actionable close blockers back into the implementation, and reran `scripts/ay-close.sh` to a clean pass. The residual count is five, so F closes without opening a new tranche.

## Resolved During W6

- Public root policy no longer derives its allowlist from `src/index.ts`; it derives from the intended core roots and fails on unexpected root exports.
- `@mkbabb/glass-ui/dock` no longer exports internal dock composables or portal helpers.
- Public-surface tests now assert the exact dock runtime subpath.
- Aurora oil `strokeAmount` now gates main oil/knife/chunky stroke compositing, not only impasto.
- Dead Aurora `uRes` shader/runtime surface is removed.
- `/aurora` runtime smoke now verifies nonblank WebGL pixels while live `preserveDrawingBuffer` remains false.
- Aurora profiler cleanup now waits for Chrome exit and retries temporary profile removal.
- Dock click-away listener installation now cancels deferred `requestAnimationFrame` work on collapse/unmount.
- Tailwind container config drift was removed from `@theme`; `max-w-2xl` is covered by the theme proof.
- Retired `--font-size-base` configurator writes and unconsumed `.shadow-cartoon-sm-hover` utility were removed.
- Dock popover CSS length parsing is unit-aware, so rem-valued `--popover-offset` no longer becomes a fractional pixel.

## Accepted Residuals

| # | Residual | Severity | Decision |
|---:|---|---|---|
| 1 | `useGlassCarousel` can still mutate after unmount if execution has already moved from `fadeTimer` into nested `nextTick` / `requestAnimationFrame` transition callbacks. | P3 | Low-risk lifecycle hardening; not observed by current tests. Keep as a focused future unit-test item. |
| 2 | `demo/stories/foundations/intro.vue` still duplicates category data and uses hash-style category links; `Story.sourceFiles` / `useSourceLoader` remains unwired. | P3 | Story substrate polish, not package/runtime correctness. |
| 3 | Runtime proof covers routes, dock blur, owner markers, rail orientation, and Aurora pixels, but not active rail/pager state, shortcut suppression, or nearest-owner portal matching. | P3 | Proof-depth improvement; current behavioral substrate is covered by component tests plus route smoke. |
| 4 | Oil gestural at DPR 2 is the measured heavy Aurora path, and `renderAtMs` is smoke-only rather than a reliable GPU timer. | P3 | Accepted performance observation. RAF frame timing remains the trusted benchmark field. |
| 5 | The generated `dist/src` declaration tree still contains internal/test declarations even though package `exports` blocks normal imports. | P3 | Tarball hygiene, not consumer import correctness. |

## Non-Residual Notes

- `words/frontend` still has a non-hermetic `file:./glass-ui` package declaration in that sibling repository, but the active checkout builds through its hoisted workspace symlink. This is external consumer workspace hygiene, not a glass-ui tranche blocker.
- API Extractor continues to warn that its bundled TypeScript is older than the project TypeScript. Declarations still build, and `verify-export-types` passes.
