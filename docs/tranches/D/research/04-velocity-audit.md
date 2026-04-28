# A.D.research.04 — Velocity Audit + Three-Tier Proposal

## Measurements (real `time` invocations)

| Command | Cold (s) | Warm (s) | Notes |
|---|---|---|---|
| `npm run typecheck` | 94.39 | 11.77 | vue-tsc, 355 src files (ts+vue) |
| `npm run build` (clean dist) | 7.92 | 6.54 | 578 modules; dts plugin: 5.04-5.19 s (65% of wall) |
| `npm run dev` boot | — | 0.37 | Vite ready in 371 ms; HMR capable |
| `fourier-analysis/web build` | — | 7.24 | file: link to glass-ui |
| `words/frontend build` | — | 8.99 | includes vue-tsc + vite |
| `bbnf-lang/playground build` | — | 12.46 | large app (3.6 MB chunk) |

## Bottleneck attribution

### 1. Typecheck (94.39 s cold → 11.77 s warm)
**Root cause**: vue-tsc parses 355 files, resolves imports across src/ + demo/, runs type inference. Incremental cache rebuilt each run; doesn't persist across process exits.

**Secondary coupling**: `vite-plugin-dts` internally calls vue-tsc again during build (`emitDeclarationOnly`), duplicating typecheck work. Build logs show `[vite:dts] Declaration files built in 5042 ms` — second invocation of vue-tsc's type engine.

### 2. Build dts plugin (5.04-5.19 s of 6.54-7.92 s)
**Evidence**: dts-generation does not benefit from vite's module cache; rollup must re-walk entry point and emit type definitions. Configuration: `dts({ tsconfigPath: "./tsconfig.json", rollupTypes: true })`. `rollupTypes: true` adds ~500 ms via internal rollup-to-combine; api-extractor runs separately ("using bundled TypeScript version 5.8.2").

### 3. Dev-server boot (371 ms)
Already fast. No transforms on dev-server start; Tailwind v4 + `@tailwindcss/vite` compiles on-demand; module resolution lazy.

### 4. Consumer builds (7.24-12.46 s)
All three import `@mkbabb/glass-ui` via `file:` workspace link. Vite does NOT rebuild glass-ui when consumer builds; resolves source modules directly. If glass-ui has stale dist/, consumers may use stale JS.

## Three-tier proposal

Glass-ui is a **library** (not an app); surface differs from bbnf-lang's profiling-heavy design.

### Routine (target < 5 s)

#### `npm run iter-check`
- `vue-tsc --noEmit --project tsconfig.src.json` (excludes demo/)
- Target: ~6-7 s warm (down from 11.8)
- Implementation: add `tsconfig.src.json` with `include: ["src/"]`

#### `npm run iter-build`
- `vite build` with dts plugin **disabled**
- Target: ~1.5-2 s warm (down from 6.5)
- Implementation: `vite.iter.config.ts` omitting `dts()`, OR `VITE_BUILD_DTS=false` env conditional

#### `npm run iter-dev`
- `vite` dev server (already 0.4 s)

#### `npm run iter-test` (NEW — see Tests-don't-exist gap)
- `vitest run --reporter=verbose` on `tests/**/*.spec.ts`
- Target: < 2 s for ~100 smoke tests

**Combined iter cycle**: < 10 s (vs ~30 s current cold loop).

### Profile (target < 60 s)

- `npm run profile-bundle` — `vite build --mode profile` + rollup-plugin-visualizer → `dist/stats.html`. ~8-10 s.
- `npm run profile-dts` — measure dts plugin in isolation. ~5-6 s.
- `npm run profile-typecheck` — `vue-tsc --pretty --listFiles` parsed for per-file cost. ~12-15 s.
- `npm run profile-consumers` — serial rebuild of all three consumers. ~28 s.

### Proof (target < 5 min)

#### `npm run ay-close`
1. Clean dist/ + node_modules/.vite
2. Full `npm run typecheck`
3. Full `npm run build` (with dts)
4. Full `npm run iter-test`
5. Serial consumer validation (3 consumers)
6. Emit `docs/close-ceremony.txt` with wall times + exit code

Target: ~132 s serial; ~50 s if orchestrator parallelizes consumer builds.

## Concrete halvings

### 1. Split src-only fast-path typecheck (~40% reduction)
- `tsconfig.src.json` with `include: ["src/"]`
- 11.8 s → ~7 s warm
- Risk: low; demo not shipped

### 2. Disable dts in iter builds (~65% build reduction)
- `vite.iter.config.ts` omits dts plugin
- 6.54 s → ~2.3 s
- Risk: medium; developers must run `npm run emit-types` before push (or pre-commit hook). CI gate runs full build.

### 3. Persist vite module cache between runs
- Already exists; ensure CI doesn't clean. ~10% cold improvement.

### 4. Consolidate consumer validation
- `scripts/validate-consumers.sh` looping over consumer dirs
- No wall-time delta but improves visibility

### 5. Add Vitest test harness (NEW)
- `vitest@latest` + `@vitest/ui`
- ~100-130 smoke tests; < 2 s
- Risk: medium; ~2-4 hours initial test-writing

### 6. Upgrade vite-plugin-dts (rollupTypes: false)
- ~10% reduction (5.1 s → 4.6 s)
- Risk: low; separates dts failures from vite build failures

## Tests-don't-exist gap

**Tool**: Vitest (fast, zero-config, supports Vue, integrates with IDE).
**Location**: `tests/<component>.spec.ts` (colocated by domain, not next to source).

### Smoke test template (Button)

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@vitest/browser';
import Button from '@/components/ui/button/Button.vue';

describe('Button', () => {
  it('renders text content', () => {
    render(Button, { slots: { default: 'Click me' } });
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  it('emits click event', async () => {
    const { emitted } = render(Button, { slots: { default: 'Submit' } });
    await screen.getByRole('button').click();
    expect(emitted('click')).toBeDefined();
  });
  it('applies variant class via buttonVariants', () => {
    const { container } = render(Button, {
      props: { variant: 'destructive' },
      slots: { default: 'Delete' }
    });
    expect(container.querySelector('button')).toHaveClass('bg-destructive');
  });
  it('respects disabled prop', () => {
    render(Button, { props: { disabled: true }, slots: { default: 'X' } });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**Coverage target**: smoke only — validate props/slots/emits. No snapshot tests (brittle for styled components). No E2E (consumers handle).

**Estimate**: 32 UI × 2-3 = 64-96 tests; 18 composables × 2 = 36 tests; total ~100-130 tests; < 2 s.

**Integration**:
- `npm run iter-test` → vitest run
- `npm run iter-test --watch` → dev-loop
- Pre-commit hook: `vitest run --bail`

## Summary path

**Current**:
- Typecheck cold/warm: 94 / 11.8 s
- Build cold/warm: 7.9 / 6.5 s (65% dts)
- Dev: 0.4 s
- Proof cycle: ~2 min 12 s

**After halvings**:
- iter-check (src only): 7 s
- iter-build (no dts): 2.3 s
- iter-test: 0.5 s
- Routine loop: < 10 s (down from ~30)
- Proof ceremony: 90 s serial; ~50 s parallel

**Combined**: developer iteration velocity +60% (30 s → 10 s per loop). Tranche validation -32% (132 s → 90 s serial; ~50 s parallel).
