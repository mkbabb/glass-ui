# O.W1 Lane C — Configurator clone JSON-fallback decision

**Status**: Path A landed (throw on `structuredClone` failure).
**Decision context**: invariant 24 (fail-explicit on library-internal contract violations) binds at O.W0 close commit `d327a45`; Rα audit F4 finding flagged the JSON-fallback path.

## Two paths considered

### Path A — Throw on `structuredClone` failure (RECOMMENDED + LANDED)

Replace the silent JSON-fallback with an explicit throw that names the failing operation + the cause + the consumer-side escape hatch (`ConfiguratorStateOptions.clone`).

```ts
function defaultClone<T>(value: T): T {
    const raw = toRaw(value);
    if (typeof structuredClone !== "function") {
        throw new Error(
            "[glass-ui:configurator] structuredClone is unavailable in this runtime. ...",
        );
    }
    try {
        return structuredClone(raw);
    } catch (err) {
        throw new Error(
            "[glass-ui:configurator] structuredClone failed: " + ... +
            ". Pass a custom clone via ConfiguratorStateOptions.clone if the data shape requires it.",
        );
    }
}
```

**Pros**:
- Aligns with invariant 24 (library-internal contract violation throws explicitly).
- Surfaces the actual failure mode at the offending callsite instead of silently producing a deep-shallow-copy mismatch via `JSON.parse(JSON.stringify(...))` (which loses functions, `Date` instances, `Map` / `Set`, cyclic references).
- Escape-hatch already exists in the public API: consumers pass `clone: customClone` to `useConfiguratorState`. The error message names this path so the migration is one-line per call-site.
- KISS — single canonical clone path; consumer-side override for the exceptional case.

**Cons**:
- Consumer-visible behavior change. Prior silent fallback may have been masking shapes that `structuredClone` rejects but `JSON.parse(JSON.stringify(...))` happens to round-trip (e.g., `Date` objects become ISO strings under JSON; under `structuredClone` they round-trip as `Date` — so the JSON path was actually *lossier*, not the safer choice).

### Path B — KEEP the JSON-fallback (NOT TAKEN)

Preserve the silent fall-through; document in MIGRATION.md as the canonical "shapes that nested-walk into non-cloneable elements" path.

**Why rejected**:
- Invariant 24 (codified at O.W0) prohibits silent `console.warn`/`return-null` patterns in library-internal subsystems. The JSON-fallback is morally identical: it silently degrades to a lossy clone path without surfacing that the preferred path failed.
- The JSON-fallback path's behavior is *worse* than the canonical path for common shapes (`Date` → string, `Map`/`Set` → empty `{}`, cyclic → throw with no path info, `undefined` values dropped). Documenting the silent-but-degraded path as canonical perpetuates the audit-walk surface area.
- Consumer-side `clone: customClone` override gives any consumer the JSON path back with one line — no semver-visible break for consumers who actually need it.

## Decision

**Path A landed**. Per O.W0 invariant 24; per user directive at O open ("NO workarounds, NO fallbacks, NO special cases ... idiomatic, gestalt approaches"); per KISS posture from the wave plan (`O.md §3 W1 row`).

## Consumer migration

Documented in MIGRATION.md (O.W1 close commit):

```md
### `useConfiguratorState` — `structuredClone` failure now throws

The default clone path (`structuredClone`) no longer silently falls through
to `JSON.parse(JSON.stringify(...))`. Consumers passing preset values with
non-structured-cloneable shapes (functions, symbols, DOM nodes, class
instances) must pass a custom `clone` function via `ConfiguratorStateOptions.clone`:

```ts
useConfiguratorState({
  presets,
  clone: (v) => JSON.parse(JSON.stringify(v)),  // explicit JSON-clone opt-in
});
```

Most preset shapes (plain objects, arrays, primitives, `Date`, `Map`,
`Set`) are structured-cloneable and need no migration.
```

## Cross-repo audit

Per `rg -n 'useConfiguratorState\\b' /Users/mkbabb/Programming/{words,fourier-analysis,bbnf-buddy,keyframes.js,value.js,speedtest}` — populated at W1 close. No expected consumer impact based on the canonical preset shapes used by the constellation (plain objects + primitives + `Date` only).

## Authority

- W1.md Lane C — decision-block-on-user.
- User directive at O open — pre-authorized "indefatigably" execution favouring "idiomatic, gestalt approaches".
- O.W0 invariant 24 codified at precept `46ee7e9`.

## Verification

Lane C landing verified via:

- `npm run typecheck` — PASS at W1 close.
- `npm test` — Configurator-related tests pass; no new failures.
- `grep -n 'JSON.parse(JSON.stringify' src/components/custom/configurator/` — zero matches at HEAD post-W1 close.
