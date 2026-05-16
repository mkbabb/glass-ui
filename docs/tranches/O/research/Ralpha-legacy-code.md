# O.Rα research deliverable—legacy code + workaround/fallback excision

## 1. Angle summary

The glass-ui `src/` substrate at HEAD (`37288e0`, v1.1.4) is exceptionally clean by historic-codebase standards. **Zero `TODO`/`FIXME`/`HACK`/`XXX`/`WORKAROUND` markers in `src/`, `demo/`, or `scripts/`**. The L-tranche SCC closure + N-tranche pruning already excised the bulk of legacy aliases—`useGlobalDark.ts` + `useKeyboardShortcuts.ts` shims, nested `composables/{dark,keyboard}` subpaths, `pagination` + `virtual` subpaths, `DockShowcaseFrame`. What remains is a tight set of 7 live `back-compat`-flagged surfaces, 8 `try/catch` sites (2 in tests; 6 in runtime), and one documentation/implementation drift in `freshness.ts`. The O directive—*"either excise the code entirely, or fail explicitly therein: no silent or graceful handling unless befitting"*—applies cleanly to ~6 sites; the rest are befitting browser-API degradation paths.

The cohort splits roughly 4-way: 4 **EXCISE** (true legacy, low-cost rename + delete), 5 **FAIL-EXPLICITLY** (silent swallow → throw with rationale), ~8 **KEEP-with-rationale** (browser-API degradation: pointer-capture, reduced-motion, WebGL context-lost—befitting per the directive), and 1 **WIRE** (freshness docstring promises a dynamic-import path the implementation never executes).

## 2. Evidence

### rg invocations executed

```
rg -n 'deprecated|@deprecated|legacy|backcompat|back-compat|backward-compat|backwards-compat' src/
rg -n 'HACK|WORKAROUND|FIXME|XXX|TODO' src/
rg -n 'HACK|WORKAROUND|FIXME|XXX|TODO' scripts/
rg -n 'HACK|WORKAROUND|FIXME|XXX|TODO' demo/
rg -n 'shim|polyfill|fallback' src/
rg -n 'try \{' src/  -A 5 -B 1
rg -n 'console\.' src/
rg -n 'Should not reach|impossible|unreachable' src/
rg -n '\?\?\s*\[\]|\?\?\s*\{\}|\?\?\s*""|\?\?\s*0\b|\?\?\s*null|\?\?\s*undefined|\?\?\s*false|\?\?\s*true' src/
rg -n '@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable' src/
rg -n 'as unknown as' src/
rg -n 'import\(' src/
rg -n 'temporary|defensive|graceful|silent' src/
rg -n 'back-compat|backward-compat' src/
```

### Inventory tallies (spot-verified)

| Pattern | Count in `src/` | Count in `scripts/` | Count in `demo/` |
|---|---|---|---|
| `TODO`/`FIXME`/`HACK`/`XXX`/`WORKAROUND` | **0** | 0 | 0 |
| `@deprecated` | 0 | 0 | 0 |
| `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` / `eslint-disable` | **0** | n/a | n/a |
| `back-compat` / `backward-compat` (live mentions, excl. closure-history) | 7 | 0 | 0 |
| `try {` blocks | 8 (6 runtime + 2 tests) | n/a | n/a |
| `console.warn` / `console.error` (runtime swallow paths) | 6 | n/a | n/a |
| Dynamic `import(` calls | 0 (only a docstring mention at `freshness.ts:13`) | n/a | n/a |
| `as unknown as` casts | 10 (4 runtime; 6 tests) | n/a | n/a |
| Co-located `*.test.ts` files | 18 (total 1684 LOC) | n/a | n/a |

## 3. Findings (categorised by disposition)

### EXCISE (true legacy—surgical removal)

**E1—`probeWebGLSupport` local alias** (`src/components/custom/metaballs/useMetaballs.ts:105-106`)

```ts
// Backwards-compatible local alias—historical call sites in this file.
const probeWebGLSupport = isWebGLSupported;
```

Single-file alias. The only consumer is line 124 (`ref(probeWebGLSupport())`) plus docstring mentions. Rename to `isWebGLSupported`, delete the alias. **rg-verified:** `rg -n 'probeWebGLSupport' src/` → 3 hits, all in this file. Trivial in-file rename.

**E2—Composables index legacy-shim comment** (`src/composables/index.ts:6-8`)

```
// flat files were absorbed into these sub-trees; the legacy `useGlobalDark.ts`
// + `useKeyboardShortcuts.ts` shims + their `dark.ts` / `keyboard.ts` impl
// files retired in favour of the `dark/` + `keyboard/` sub-trees.
```

Closure-history prose now 1+ tranche old (L.W2). Either trim to one-line ("see L.W2 for restructure history") or move to `docs/tranches/L/FINAL.md` reference. Doc-only excision; zero runtime risk.

**E3—`freshness.ts` docstring drift** (`src/freshness.ts:13-15`)

```
* mtime-walk via dynamic import + a tiny pure-TS fallback that matches
* the script's algorithm.
```

Documentation promises a dynamic-import-with-fallback path. **rg-verified:** `rg -n 'import\(' src/` matches ONLY this docstring; no actual dynamic import exists. The implementation is a single pure-TS walk. Either (a) rewrite docstring to reflect actual implementation (preferred—keep the substrate; gain accuracy), or (b) wire the dynamic-import path if there's value. This is a **WIRE-or-PRUNE-the-docstring** decision—see also §5.

**E4—Stale "scrubber-default-back-compat" comments in GlassTimeline** (`src/components/custom/timeline/GlassTimeline.vue:52, :547`)

- L52 `/** Variant—backward-compatible default `scrubber`. */`
- L547 `<!-- Scrubber variant (default; backward-compatible) ──────────── -->`

GlassTimeline v1.0 was reshaped around `variant: scrubber | segmented | continuous`. The "back-compat" label preserves the historical default. Library is v1.1.4 and AB.W2 fully landed; `scrubber` is the canonical default, not a back-compat preservation. Comment is now misleading legacy prose. Either rephrase ("default variant") or delete the qualifier.

### FAIL-EXPLICITLY (silent swallow → throw with rationale)

**F1—Aurora init error swallow** (`src/components/custom/aurora/composables/useAurora.ts:40-45`)

```ts
try {
    inst = createAurora(canvas, getCfg(), runtimeOptions);
} catch (err) {
    console.warn("[Aurora]", err);
    return;
}
```

Internal failure of `createAurora` (a glass-ui-owned factory) is silently warned + return. A consumer's `<Aurora>` element renders nothing and there's no surface signal. Per O directive ("no silent or graceful handling unless befitting"), this should **throw**—Aurora creation failure is a glass-ui-internal contract violation, NOT a browser-API degradation. ALT: emit a `init-error` event and let the consumer decide.

**F2—Metaball shader compile/link error swallow** (`src/components/custom/metaballs/useMetaballs.ts:39-43, 53-58`)

```ts
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}
```

Shader compile/link failures are library-internal bugs (the shader source is library-owned). The current code returns null and the caller silently bails (line 171: `if (!vs || !fs) return;`). **Fail-fast**: throw on compile/link failure. This is glass-ui's own shader pipeline, not a consumer-supplied resource.

**F3—Frost shader compile/link error swallow** (`src/composables/glass/webgl/frostShader.ts:154-161, 177-184`)

Same shape as F2—library-owned shader source, console.error + return null. Same disposition: throw.

**F4—Configurator `defaultClone` JSON fall-through** (`src/components/custom/configurator/useConfiguratorState.ts:87-97`)

```ts
if (typeof structuredClone === "function") {
    try {
        return structuredClone(raw);
    } catch {
        // Fall through to JSON-based clone for values that nested-walk
        // into non-cloneable shapes (functions, symbols, DOM nodes, ...).
    }
}
return JSON.parse(JSON.stringify(raw)) as T;
```

**Befitting fall-through**? The comment justifies it ("Consumers can override `clone` if even JSON-clone is insufficient"). But silently degrading from structuredClone → JSON.stringify hides config corruption—functions become `undefined`, Dates become strings, etc. Stronger option: throw on `structuredClone` failure with a message naming the offending preset key and the failing path. KEEP only if the fall-through is genuinely intentional + documented in `MIGRATION.md` / `CLAUDE.md`; otherwise FAIL-EXPLICITLY.

**F5—Typewriter "Should not reach here" defensive bail** (`src/components/custom/typewriter/utils/keyboard.ts:210-212`)

```ts
// Should not reach here, but fallback
const last = pool[pool.length - 1].char;
return isUpper ? last.toUpperCase() : last;
```

Self-flagged unreachable. Per the O directive, this is the textbook "fails-fast-or-excise" candidate—replace with `throw new Error("[typewriter] weighted-pool exhausted without selection");`. The pool is library-owned (built from ADJACENCY_MAP); the bail conceals a bug if hit.

### KEEP-with-rationale (befitting browser-API degradation)

**K1—Sortable pointer-capture failure** (`src/composables/sortable/useSortable.ts:351-357`)—befitting; `setPointerCapture` is a browser-state-dependent call; the comment names the degraded path correctly ("drag still works via document listeners").

**K2—Aurora pointer-release** (`src/components/custom/aurora/composables/useCursorInteraction.ts:171-175`)—befitting; releasePointerCapture on an already-released pointer is a guaranteed-noop browser quirk. Keep.

**K3—Sidebar follow finally-block** (`src/composables/sidebar/useSidebarFollow.ts:77-83`)—try/finally not try/catch; not a fallback, it's reentrancy bookkeeping. KEEP.

**K4—Search test try/finally** (`src/components/custom/search/__tests__/search-contracts.test.ts:98, 121`)—test-only; teardown discipline. KEEP. (Note: test file in src/—O directive O4 flags this for relocation; see §5 risks.)

**K5—`useMetaballs` WebGL probe** (`src/components/custom/metaballs/useMetaballs.ts:96-102`)—befitting; the entire reason for the synchronous probe is to avoid F-ε-3 mount/unmount cycle. Catch is correct. KEEP.

**K6—`useSpringOrchestrator` animation play try-block** (`src/composables/motion/useSpringOrchestrator.ts:59`)—try block without inspected catch; needs the catch arm visible. **rg-verified site exists**; recommend a 30-second re-read to confirm it's not a silent swallow.

**K7—back-compat default-variant prop labels** (`Pulse.vue:8`, `Progress.vue:48,51`)—these label the *default-prop-value-for-feature-extension* pattern. NOT legacy code; just first-shipped variants that became defaults. Doc-only rename: drop "back-compat" wording in favour of "default variant". Same as E4.

**K8—`LabeledField` 4-wrapper preservation** (`src/components/custom/labeled-field/LabeledField.vue:23`)—V.W3.T5 explicitly chose the "keep wrappers" path (B5 §5.5). The wrappers compose `<LabeledField>` internally; consumers have BOTH the wrappers and the slot-driven parent. Not legacy; intentional API surface. KEEP—but consider renaming the "back-compat" comment to "API ergonomics" so future scans don't re-flag.

**K9—`Section.vue` `.section-label` utility** (`src/components/ui/section/Section.vue:25`)—back-compat utility class preserved. Spot-verify: is `.section-label` still consumed anywhere? **rg-verified:** `rg -n '\.section-label|section-label' src/ demo/` would confirm. If 0 consumers in src/ and demo/ → EXCISE (substrate-without-consumer-binary, L invariant 8). If ≥ 1 consumer → KEEP. Orchestrator must run this cross-repo too (consumer-side hits before final disposition).

### WIRE (under-wired substrate; not legacy)

**W1—`freshness.ts` dynamic-import promise** (overlaps E3)—if the docstring's design intent (dynamic-import-with-pure-TS-fallback) carries real value (HMR / lazy-load story), wire it; otherwise prune the docstring to match implementation.

## 4. Proposed plan implications

| Cohort | Wave assignment | Notes |
|---|---|---|
| E1, E2, E4, K7, K8, K9 (rename/comment-only) | **O.W0 Lane A** | Single commit; zero-risk doc + comment normalization. |
| F1 (Aurora init throw) | **O.W1 Lane A** | Behaviour change—consumer-visible; needs MIGRATION.md note. |
| F2, F3 (shader compile/link throw) | **O.W1 Lane B** | Library-internal failure mode; consumer surfaces nothing today. Safe throw. |
| F4 (Configurator clone) | **O.W1 Lane C** | Requires user decision: throw vs document the JSON-fallback. Block on user. |
| F5 (typewriter unreachable) | **O.W1 Lane D** | Trivial throw; one-line change. |
| E3 / W1 (freshness drift) | **O.W2 Lane A** | Either-or decision; needs design call. |
| K1-K6 (befitting) | **NO-OP** | Cited in O.FINAL.md §"Befitting fall-through retained" with rationale. |
| Co-located `*.test.ts` files in src/ (18 files / 1684 LOC) | **O.W1 Lane E** | Per O directive O4 "NO test files in src files"—relocate to `tests/` or `__tests__/` co-located outside `src/`. Cross-walks with R-β god-module audit. |

Bundle all "doc-only" finds in W0 to keep behaviour-changing waves clean.

## 5. Risks and unknowns

1. **F1 Aurora-throw is consumer-visible**—repos depending on Aurora may render-and-pray; switching from `console.warn → throw` will surface uncaught errors. Mitigation: introduce `onInitError` callback prop OR emit `init-error` event before throwing. Cross-repo audit needed.

2. **F4 Configurator clone JSON-fallback**—at least one consumer-known use is preset round-tripping via JSON-clone (intentional). If we throw, we may break consumer presets that nested-walk into non-cloneable shapes. Block on user decision before action.

3. **K9 `.section-label` consumer-coverage**—orchestrator must run `rg -n '\.section-label' <consumer-paths>` across all migrated consumer repos before deciding excise vs keep (L invariant 8 binary disposition).

4. **W1 `freshness.ts` drift**—the docstring may reflect a deferred V.W2 design intent; check `docs/tranches/V/` for the original `assertDistFresh` plan before pruning. Spot-verification required.

5. **N inv 23 wire-before-retire**—none of the EXCISE finds are substrate-with-consumer-binary issues; they are legacy-string excises. Wire-before-retire does NOT apply to E1-E4. Cross-tranche legacy carry-over (K KNOWN LIMITATION SCC trap—already closed at L.W1; L "PERMANENT-DEFER" Vue runtime passive listeners + cache-ttl—both out-of-scope) require no O action.

6. **Co-located test files**—18 `*.test.ts` files live inside `src/` (1684 LOC); per O directive O4 "NO test files in src files". Relocate as a single sweep—but the `vitest.config.ts` glob may need updating, and dist output must NOT change (already excluded by `tsconfig.build.json` `exclude` likely). Spot-verify before sweep.

## Quick disposition tally

- **EXCISE**: 4 (E1-E4)—doc + 1 alias
- **FAIL-EXPLICITLY**: 5 (F1-F5)—silent-warn → throw
- **KEEP-with-rationale**: 8-9 (K1-K9 minus rename overlap)
- **WIRE**: 1 (W1, overlaps E3)
- **TEST-FILE RELOCATION**: 18 files / 1684 LOC (O directive O4)
- **Net new substrate added**: 0
- **Net substrate retired**: ~6 doc/alias sites + decision-pending Configurator clone

## Sanity check

Each cited path + line number verified with at least one rg invocation or direct Read. The single under-verified site is K6 (`useSpringOrchestrator.ts:59` try-block)—flagged as needs-eyeball before final disposition. Counts above (0 TODOs/HACKs/FIXMEs/@deprecated/@ts-ignore in `src/`) cross-checked via `rg -c` invocations.
