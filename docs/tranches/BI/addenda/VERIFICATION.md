# BI-ADDENDA — VERIFICATION DECLARATION

Owner: Q040 (absorbs Q034). This is the one-page declaration of what "verified" means
for glass-ui. It is **not a runner and not an engine** — no command, package-script
alias, table file, or independently runnable "gate" identity is minted by it or by the
invariant canon it points at.

## What verification is

Verification is the sum of five ordinary, already-present checks — nothing bespoke:

1. **Typecheck** — the library, tests, and declaration-build TypeScript programs agree
   with no suppressions and no generated-declaration holes.
2. **Build** — a clean build emits a self-contained package whose files, CSS URLs, maps,
   and declaration imports all resolve inside the packed artifact.
3. **Unit tests** — the focused vitest suites for the touched subjects run green.
4. **The Q002 pre-tag lane** — the source-bound, once-per-release pre-tag pass that
   assembles the paint/native roster and the release-projection checks before a tag.
5. **One-time differentials quoted in wave commits** — a wave that lands a numeric or
   structural change quotes its own before/after differential in its commit message.
   The differential is evidence at the moment of the change, not a permanent standing gate.

There is no sixth mechanism. No MS9/P013 differential guard, no 40-invariant verifier
tail, no no-masking manifest script — those are **RETIRED-TERMINAL** (their protected
properties re-home into the language below).

## Where the retired enforcers' properties now live

- **The no-masking LAW** — lives in code review plus the Q003 F-4 paint check
  (`no-masking-manifest.mjs` is deleted; the law loses nothing). A primary either works
  in paint or fails loud; no fallback hides a dead primary.
- **Structure enforcement** — is the build's own fail-closed classification. A file that
  does not resolve, a declaration that points at a source-only path, or an export absent
  from the entry authority fails the build; no separate census script or line ratchet is
  added.
- **The `_shared` ≥2-consumer rule** — is review language. A helper placed in a `_shared`
  home is expected to have two or more consumers (or be an exported/private-demo helper);
  a reviewer enforces this, not a script.
- **The colocation contract** — is review language. Feature composables live under the
  feature's `composables/`, magic numbers under `constants.ts`, the README present; a
  reviewer keeps the colocation map reconciled to disk, not a gate.

## The invariant canon

`docs/tranches/BI/FORMATION/invariants.json` (and its generating authority
`invariants.registry.mjs`) is **DESCRIPTIVE CANON** — a human-read reference register of
durable behavioral properties and the realistic mutations that must make each property's
evidence RED. It carries no engine: no row receives a command, a package-script alias, a
table file, or a runnable "gate" identity. It documents what the ordinary checks above are
protecting; it does not execute anything.
