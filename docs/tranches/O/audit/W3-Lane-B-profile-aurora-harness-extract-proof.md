# O.W3 Lane B — `scripts/profile-aurora.mjs` harness extract proof

**Lane**: O.W3 Lane B (Rβ §3.2 god-module split; W3.md §Lane B).
**Bounds**: `scripts/profile-aurora.mjs`, `scripts/aurora-profile/harness-browser.mjs` (NEW).
**Coordinates with**: W5 (canonical script-orchestration cleanup) — this lane owns the STRUCTURAL split only; orchestration refactor is W5's.

## § Disposition

**Option B chosen** — template-string export via a named constant.

Rationale:

- The original `harnessSource()` returned a `String.raw\`...\`` template with NO interpolation slots. Its sole consumer (`profile-aurora.mjs:794` — `await evaluate(client, harnessSource())`) feeds the raw text into CDP `Runtime.evaluate`. The harness body has no module-level structure on the host side — it's a self-invoking IIFE injected into the target page.
- Option A (a standalone `.mjs` module that exports the harness function from its OWN runtime) would require either `fs.readFileSync` on a `.js` source file or a host-side dynamic import that re-extracts the function body as text. Both add ceremony for zero structural gain — the host never CALLS the harness functions; the page does.
- Option B preserves the call site's identity. `harnessSource()` in `profile-aurora.mjs` is retained as a thin getter (`return HARNESS_SOURCE`) so every call site at line 794 (and any future callers) resolves with no signature drift. This is the wire-before-retire form per N invariant 23.
- The harness module is now lintable as plain JS and IDE-navigable (jump-to-definition into `harness-browser.mjs` resolves the body). The Rβ "highest value-to-risk ratio" verdict (research §4) is realized exactly.

## § File changes summary

884 LOC original → distributed across 2 files:

| File | Status | LOC | Concern |
|------|--------|-----|---------|
| `scripts/profile-aurora.mjs` | REWRITTEN | 462 | CDP wrapper + arg parsing + lifecycle + `main()` orchestration + thin `harnessSource()` getter |
| `scripts/aurora-profile/harness-browser.mjs` | NEW | 447 | Browser-side harness body as `String.raw` template constant `HARNESS_SOURCE` |

Total: 462 + 447 = 909 LOC across 2 files (vs. 884 in 1). The +25 LOC delta is the new module's header comment (17 lines), the import + 7-line wrapper retained in the main entry (~11 lines), and the closing `;` line in the new file. Per Rβ this is a cohesion gain — the harness body is now a single-concern artefact, and the main entry no longer mixes orchestration with a 433-line embedded string.

**Worktree diff stat** (vs. master):

```
 scripts/profile-aurora.mjs | 444 ++-------------------------------------------
 1 file changed, 11 insertions(+), 433 deletions(-)
```

Plus `scripts/aurora-profile/` (new directory containing `harness-browser.mjs`).

**Byte-identical harness body**: lines 243–670 of the original `profile-aurora.mjs` (the harness body, exclusive of the `String.raw\`` opening + closing backtick) diff-match lines 18–445 of the extracted module:

```
$ diff <(sed -n '243,670p' scripts/profile-aurora.mjs.original) \
       <(sed -n '18,445p' scripts/aurora-profile/harness-browser.mjs)
[no output → byte-identical]
```

Harness body SHA1: `6584bb4fa9712c365bdf2df807af7daa0350d3d4` (14,915 chars, 430 lines including the leading and trailing newlines).

## § Verification

**Syntax probe** (Node `--check`):

```
$ node --check scripts/aurora-profile/harness-browser.mjs
harness-browser.mjs syntax OK
$ node --check scripts/profile-aurora.mjs
profile-aurora.mjs syntax OK
```

**Harness module import probe**:

```
$ node -e "import('./scripts/aurora-profile/harness-browser.mjs').then((m) => …)"
HARNESS_SOURCE len: 14915 lines: 430
starts with: "\n(() => {\n    function summari"
ends with: "raProfile.ensureReady();\n})()\n"
```

**Main entry import probe** (with top-level `await main();` stubbed — see Open questions §1):

```
$ # Strip the `await main();` line, import, verify all module-level code parses + resolves.
$ node -e "<stub-then-import>"
import OK (top-level main() stubbed)
```

A clean dynamic-import probe of `profile-aurora.mjs` is unsafe because top-level `await main();` triggers Chrome launch + dev-server wait + artifact write. The stubbed probe confirms (a) all import specifiers resolve, (b) the `HARNESS_SOURCE` symbol is bound in scope, (c) the file has no module-level syntax error from the extract.

**Typecheck**:

```
$ npm run typecheck
> @mkbabb/glass-ui@1.2.2 typecheck
> vue-tsc --noEmit
[exit 0; no output]
```

Clean — confirms no consumer impact (`scripts/` is a dev-only tree, not in `src/`, but the typecheck is the broad-scope canary anyway).

## § Open questions for orchestrator

1. **Top-level `await main()` is unchanged**. The script remains a self-running entry; orchestrator should confirm this is acceptable for W3 close. The W5 lane is the formal home for any orchestration refactor (e.g. wrapping `main()` behind a CLI guard). Per spec, this lane's bound is the structural split only.
2. **Thin wrapper retention**. The `harnessSource()` function is preserved as a one-line getter (`return HARNESS_SOURCE`). Alternative: inline `HARNESS_SOURCE` at the single call site (line 794 of original → present at line ~372). Kept the wrapper to minimize call-site drift; orchestrator may prefer inlining post-close if no W5 caller adds harness-string mutation.
3. **`scripts/aurora-profile/` directory is new**. No other artefacts live there. W5 may co-locate further extracted helpers (`case-driver.mjs` per Rβ §3.2 candidate `index.mjs` + `case-driver.mjs` extra split). Left for W5 disposition.
4. **No `--help` / `--dry-run` flag exists**. Verified by `grep` — script reads only env vars, no `process.argv` parsing. So the spec's runtime smoke fallback (dynamic-import probe with stub) was used.

## § Worktree diff verification

```
$ git status --short scripts/ docs/tranches/O/
 M scripts/profile-aurora.mjs
?? scripts/aurora-profile/
?? docs/tranches/O/audit/W3-Lane-B-profile-aurora-harness-extract-proof.md
```

No git mutations performed (read-only `git status` + `git diff --stat` only, per hardened-agent clause K W0). Orchestrator owns the index.

Files added:

- `scripts/aurora-profile/harness-browser.mjs` (new, 447 LOC).
- `docs/tranches/O/audit/W3-Lane-B-profile-aurora-harness-extract-proof.md` (this file).

Files modified:

- `scripts/profile-aurora.mjs` (884 → 462 LOC; -433 LOC harness body, +11 LOC import + thin wrapper + header comment).

Files NOT touched (per bound):

- `src/components/custom/timeline/` (Lane A).
- `demo/configurator/usePresetEditor.ts` (Lane C).
- Orchestration logic in `profile-aurora.mjs` (W5).
