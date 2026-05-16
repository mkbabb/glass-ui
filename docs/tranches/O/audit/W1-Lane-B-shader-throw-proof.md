# O.W1 Lane B—WebGL shader compile/link throw migration proof

**Spec**: `docs/tranches/O/waves/W1.md §Lane B`
**Invariant bound**: 24 (precept `46ee7e9`)—library-internal contract violations throw; browser-API degradation paths remain silent fallbacks.
**Bounds**: `src/components/custom/metaballs/useMetaballs.ts` + `src/composables/glass/webgl/frostShader.ts`.

## Disposition

Four shader compile/link sites in library-owned WebGL pipelines migrated from `console.error + return null` to `throw new Error(...)`. The shader sources are library-owned (`./shaders` for metaballs; inline `VERTEX_SHADER` + `FRAGMENT_SHADER` constants in `frostShader.ts`), so failure to compile or link is an internal contract violation—never a browser-API degradation. Per invariant 24, those fail loudly.

Each thrown message names the substrate AND the operation (compile-stage or link), per the lane spec.

### Site 1—`useMetaballs.ts:compileShader` (lines 39-43 pre-edit)

**Prefix**: `[glass-ui:metaballs] <vertex|fragment> shader compile failure: ...`. The shader `type` parameter (`gl.VERTEX_SHADER` vs `gl.FRAGMENT_SHADER`) is mapped to the stage word so the error tells you which shader source is at fault.

```ts
// BEFORE
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}
// AFTER
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // O.W1 Lane B (invariant 24)—library-owned shader source; compile
    // failure is an internal contract violation, not a browser-API
    // degradation. Fail explicitly so the bug surfaces.
    const log = gl.getShaderInfoLog(shader);
    const stage = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    gl.deleteShader(shader);
    throw new Error(
        `[glass-ui:metaballs] ${stage} shader compile failure: ${log}`,
    );
}
```

### Site 2—`useMetaballs.ts:linkProgram` (lines 53-58 pre-edit)

**Prefix**: `[glass-ui:metaballs] program link failure: ...`.

```ts
// BEFORE
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
}
// AFTER
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // O.W1 Lane B (invariant 24)—library-owned shader source; program
    // link failure is an internal contract violation, not a browser-API
    // degradation. Fail explicitly so the bug surfaces.
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(
        `[glass-ui:metaballs] program link failure: ${log}`,
    );
}
```

### Site 3—`frostShader.ts:createFrostProgram` link check (lines 154-161 pre-edit)

**Prefix**: `[glass-ui:frost] program link failure: ...`.

```ts
// BEFORE
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
        "glass-ui: frost shader link error:",
        gl.getProgramInfoLog(program),
    );
    gl.deleteProgram(program);
    return null;
}
// AFTER
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // O.W1 Lane B (invariant 24)—library-owned shader source; program
    // link failure is an internal contract violation, not a browser-API
    // degradation. Fail explicitly so the bug surfaces.
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(
        `[glass-ui:frost] program link failure: ${log}`,
    );
}
```

### Site 4—`frostShader.ts:compileShader` (lines 177-184 pre-edit)

**Prefix**: `[glass-ui:frost] <vertex|fragment> shader compile failure: ...`. Same stage-mapping as Site 1.

```ts
// BEFORE
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
        "glass-ui: shader compile error:",
        gl.getShaderInfoLog(shader),
    );
    gl.deleteShader(shader);
    return null;
}
// AFTER
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // O.W1 Lane B (invariant 24)—library-owned shader source; compile
    // failure is an internal contract violation, not a browser-API
    // degradation. Fail explicitly so the bug surfaces.
    const log = gl.getShaderInfoLog(shader);
    const stage = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    gl.deleteShader(shader);
    throw new Error(
        `[glass-ui:frost] ${stage} shader compile failure: ${log}`,
    );
}
```

## Caller-side bail-outs—preserved, annotated

Per lane spec, the now-unreachable `if (!vs || !fs) return;` / `if (!program) return;` checks downstream of the throwing helpers are NOT deleted. The throws propagate past them; the checks remain as defensive scaffolding (substrate-internal contract is that compileShader/linkProgram either returns a non-null value OR throws). Each is annotated with a one-line `// caught upstream—defensive (...post O.W1 Lane B)` cite so a future reader doesn't trip on the dead branch.

Three caller-side bail-outs annotated:

- `useMetaballs.ts:178`—`if (!vs || !fs) return;`
- `useMetaballs.ts:181`—`if (!program) return;`
- `frostShader.ts:145`—`if (!vertShader || !fragShader) return null;`

The function return types (`WebGLShader | null` / `WebGLProgram | null`) are LEFT IN PLACE. Two reasons:

1. `compileShader` and `linkProgram` (metaballs file) still return `null` from the EARLY exits (`createShader`/`createProgram` returning null—these are genuine browser-API failures distinct from compile/link, K-cohort befitting per Rα). Tightening the type to `WebGLShader` (non-nullable) would force changing those early bails to throws too—out of scope for this lane.
2. `createFrostProgram` returns `null` from its early `createProgram` failure path. Same reasoning.

A future cosmetic pass could promote the early `createShader`/`createProgram` failures to throws as well (they are also library-internal allocation failures), tighten the return types, and delete the dead `if (!x) return;` branches. The orchestrator may sweep this in a follow-on lane; this lane stays scoped to compile + link per the spec.

## File changes summary

```
 src/components/custom/metaballs/useMetaballs.ts | 23 +++++++++++++++------
 src/composables/glass/webgl/frostShader.ts      | 27 +++++++++++++++----------
 2 files changed, 33 insertions(+), 17 deletions(-)
```

Net additions: 4 thrown errors with substrate+operation prefixes, 4 comment rationale blocks (one per site), 3 annotated caller-side bail-outs.
Net deletions: 4 `console.error` statements, 4 `return null` statements at the compile/link failure paths.

## Verification

### `npm run typecheck`

```
> @mkbabb/glass-ui@1.2.0 typecheck
> vue-tsc --noEmit
```

Exit 0; no diagnostics. The narrowed-type case the spec flagged—"if a caller-side null-check is now provably unreachable AND the compiler complains"—does NOT apply: the early-allocation failures (`gl.createShader` / `gl.createProgram` returning null) still produce a nullable return type, so the downstream `if (!vs || !fs) return;` branches remain typecheck-required.

### `npm test`

```
> @mkbabb/glass-ui@1.2.0 test
> vitest run

 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-af3d4b1c5585ff8be

 Test Files  30 passed (30)
      Tests  348 passed (348)
   Start at  16:51:42
   Duration  2.80s
```

All 348 tests pass. No library-owned tests mock-fail the shader compile/link contract; a repo-wide search for test references to `compileShader` / `linkProgram` / `createFrostProgram` / `frostShader` returned zero hits in `tests/` or `src/**/__tests__/`. No test updates required.

## Worktree diff verification

```
$ git -C .claude/worktrees/agent-af3d4b1c5585ff8be diff --stat src/components/custom/metaballs/useMetaballs.ts src/composables/glass/webgl/frostShader.ts
 src/components/custom/metaballs/useMetaballs.ts | 23 +++++++++++++++------
 src/composables/glass/webgl/frostShader.ts      | 27 +++++++++++++++----------
 2 files changed, 33 insertions(+), 17 deletions(-)
```

Only the two in-bounds files are modified. No other paths touched. No git mutations performed (read-only `git diff` only, per the hardened agent git clause).

## Open questions for orchestrator

1. **Aurora runtime parallel site**—`src/components/custom/aurora/composables/runtime.ts:58, 71` has the same shape (`compileShader`/`linkProgram` for the aurora WebGL pipeline). Rα §3 didn't enumerate it as F2/F3 (the Rα finding was scoped to metaballs + frost). The aurora call site is wrapped at `useAurora.ts:40-45` by Lane A's `onInitError` prop / throw mechanism (the upstream factory `createAurora` re-throws), so this lane's behaviour change at the runtime layer would propagate through Lane A's surface contract. **Recommendation**: defer aurora-runtime-throw to a follow-on lane (O.W2 or similar) and coordinate with Lane A so the substrate-substrate contract stays coherent. This lane does NOT touch `runtime.ts`.
2. **Early-allocation throws**—`gl.createShader` and `gl.createProgram` returning null are still silent return-null paths. Strictly these are allocation failures of an internal pipeline (library-owned), so by invariant 24 they too should throw. The lane spec scoped this work to "compile + link" only, so I left them. The orchestrator can absorb this into a cosmetic post-sweep if desired (one-line throw + tighten return types + delete dead caller branches).
3. **Behaviour change visibility**—consumers using `<MetaballCanvas>` or `useGlassRenderer` will now see an uncaught error if a library-owned shader fails to compile/link. The pre-edit silent path rendered nothing; the post-edit path bubbles up to Vue's error handler. This is the desired Rα disposition (F2/F3) but is consumer-visible. The W1 hard-gate brittleness note ("medium" for F1 Aurora) does not formally extend to F2/F3, but the same caveat applies in spirit. No `MIGRATION.md` note is needed because the only way to trigger the throw is a library bug (shader source authored by glass-ui), not a consumer misuse.

## Closing

Worktree files left in place. No git mutations.
