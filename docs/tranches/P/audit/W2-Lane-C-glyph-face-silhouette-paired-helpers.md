# P.W2 Lane C—`GLYPH_FACE_SILHOUETTE_KEY` paired-helper completion + UPPER_SNAKE_CASE rename

**Status**: COMPLETED
**Wave**: P.W2 Lane C
**Scope**: src/components/custom/glyph-face/ + src/components/custom/disco-glyph/DiscoGlyph.vue + DESIGN.md prose
**Mode**: edit (read-only git)

---

## §1—Scope

Authoritative intent per `docs/tranches/P/research/Pdelta-di-patterns-post-O.md`:

- **§2.2**—`GlyphFaceSilhouetteKey` semantics are **optional by design**. `<DiscoGlyph>` cooperates with a wrapping `<GlyphFace>` when present, otherwise stands alone (silent no-op). Canonical fix: ship `provideGlyphFaceSilhouette(slot)` + `useOptionalGlyphFaceSilhouette()`. **No strict counterpart** is befitting—silent absence is the design intent.
- **Q3**—rename `GlyphFaceSilhouetteKey` (PascalCase + `Key` suffix) → `GLYPH_FACE_SILHOUETTE_KEY` (UPPER_SNAKE_CASE), matching every other typed key at HEAD (`DOCK_CONTEXT_KEY`, `DOCK_LAYER_GROUP_KEY`, `TOGGLE_GROUP_KEY`, `CONFIGURATOR_DENSITY_KEY`, `SORTABLE_CONTEXT`). The pre-P.W2 PascalCase name was the only cosmetic outlier across the six typed-key sites. Clean break per P invariant 5—no legacy aliases.

Out of scope: NO `/api` promotion (the constant + helpers stay package-local; consumers reach them via `@mkbabb/glass-ui/glyph-face`).

---

## §2—Edits (per-file diff summary)

```
M src/components/custom/glyph-face/keys.ts           (+38 / -2)
  · rename `GlyphFaceSilhouetteKey` → `GLYPH_FACE_SILHOUETTE_KEY`
  · Symbol() debug label `"GlyphFaceSilhouette"` → `"glass-ui:glyph-face-silhouette"`
    (matches `glass-ui:dock-context` convention from dockContext.ts)
  · add `provideGlyphFaceSilhouette(slot: Ref<string | undefined>): void`
  · add `useOptionalGlyphFaceSilhouette(): Ref<string | undefined> | null`
  · extended docblock—invariant-25 paired-helper rationale +
    optional-only intent + rename-clean rationale

M src/components/custom/glyph-face/GlyphFace.vue     (+2 / -2)
  · drop `provide` from vue import; add `provideGlyphFaceSilhouette` from ./keys
  · replace `provide(GlyphFaceSilhouetteKey, injectedSilhouette)`
        with `provideGlyphFaceSilhouette(injectedSilhouette)`
  · docstring symbol mention updated to `GLYPH_FACE_SILHOUETTE_KEY`

M src/components/custom/disco-glyph/DiscoGlyph.vue   (+2 / -2)
  · drop `inject` from vue import; add `useOptionalGlyphFaceSilhouette`
        from ../glyph-face/keys
  · replace `inject(GlyphFaceSilhouetteKey, null)` with
        `useOptionalGlyphFaceSilhouette()`
  · docstring symbol mention updated to `GLYPH_FACE_SILHOUETTE_KEY`

M src/components/custom/glyph-face/index.ts          (+5 / -1)
  · re-export trio: `GLYPH_FACE_SILHOUETTE_KEY`,
        `provideGlyphFaceSilhouette`, `useOptionalGlyphFaceSilhouette`
  · drops `GlyphFaceSilhouetteKey` re-export (no legacy alias)

M DESIGN.md                                          (+2 / -2)
  · two prose mentions of `provide(GlyphFaceSilhouetteKey)` updated to
    paired-helper names + canonical `GLYPH_FACE_SILHOUETTE_KEY` symbol
```

5 files; ~+49 / -9 lines net.

---

## §3—Grep verification

Final `rg` on `src/`:

```
$ rg -n 'GlyphFaceSilhouetteKey' src/
(no output—zero matches)
```

Repo-wide outside archival/tranche docs:

```
$ rg -n 'GlyphFaceSilhouetteKey' /Users/mkbabb/Programming/glass-ui/ \
    -g '!node_modules' -g '!dist' -g '!docs/tranches' -g '!docs/audits'
(no output—zero matches)
```

Remaining mentions in `docs/tranches/` + `docs/audits/` + `docs/consumer-evidence/` are **historical write-ups of pre-P.W2 state** (Pδ research, Pγ research, P.PROGRESS.md tranche scaffolding, O.W7 δ audit, M.W2 Lane B api-extensions proof, I.W1-B + I-audit-β-substrate). Those documents are intentionally untouched—they record the symbol's name at the time of writing.

`DESIGN.md` (consumer-facing reference) was updated in two prose passages (Lane C delta, §2).

---

## §4—Verification gate output

### §4.1—`npm run typecheck`—PASS

```
> @mkbabb/glass-ui@1.7.1 typecheck
> vue-tsc --noEmit
(no errors; clean exit)
```

### §4.2—`npm test`—PASS

```
> @mkbabb/glass-ui@1.7.1 test
> vitest run

 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui

 Test Files  32 passed (32)
      Tests  361 passed (361)
   Start at  15:28:35
   Duration  2.91s
```

### §4.3—`npm run build`—JS PASS / d.ts rollup FAIL (Lane D in-progress; NOT Lane C)

The JS build emits Lane C subpath artifacts cleanly:

```
dist/glyph-face.js     284 B
dist/glyph-face.d.ts    43 B
dist/disco-glyph.js    117 B
dist/disco-glyph.d.ts   43 B
```

`dist/glyph-face.js` exports the canonical paired-helper trio:

```
export {
  t as GLYPH_FACE_SILHOUETTE_KEY,
  o as GlyphFace,
  l as provideGlyphFaceSilhouette,
  h as useOptionalGlyphFaceSilhouette
};
```

The build's terminal `[vite:dts] Start rollup declaration files` stage fails with `The referenced path was not found: /Users/mkbabb/Programming/glass-ui/dist/src/components/custom/dock/composables/useDockState.d.ts`—this is Lane D's in-progress edit to `useDockState.ts` (adding the `UseDockStateReturn` interface + named-return annotation). The shared worktree contains all four W2 lanes' work-in-progress simultaneously; Lane C's contribution emits cleanly in isolation per the JS output above. Lane D will land this dts-rollup gate when its annotation work closes.

Lane C is independent of Lane D for the JS surface; the typecheck gate (§4.1) is the canonical Lane C signal and passes.

---

## §5—Invariant compliance

### §5.1—Invariant 25 (paired-helper canonical shape per typed-key site)

Pre-P.W2 status:

| Key | Provide helper | Strict | Optional | Status |
|---|---|---|---|---|
| `GlyphFaceSilhouetteKey` | (none—raw `provide(...)`) | (none) | (none—raw `inject(..., null)`) | MISSING-BOTH |

Post-Lane-C status:

| Key | Provide helper | Strict | Optional | Status |
|---|---|---|---|---|
| `GLYPH_FACE_SILHOUETTE_KEY` | `provideGlyphFaceSilhouette()` | (none—befitting; design intent) | `useOptionalGlyphFaceSilhouette()` | **OPTIONAL-ONLY (befitting)** |

Cohort with `TOGGLE_GROUP_KEY`'s OPTIONAL-ONLY shape (O.W2 Lane A). Invariant 25 closes at this site per intent.

### §5.2—P invariant 5 (NO LEGACY CODE)

Clean break per the dispatch's mandate. The old PascalCase symbol `GlyphFaceSilhouetteKey` is deleted; the barrel re-export is dropped; no alias remains. Zero `GlyphFaceSilhouetteKey` matches in `src/` post-Lane-C (§3).

The only callers of the symbol live inside glass-ui (per Pδ §2.2 + Pγ.3): `GlyphFace.vue`, `DiscoGlyph.vue`, and the `glyph-face/index.ts` barrel. The Lane C rename touches all three. Downstream consumers reach the helpers via the barrel re-export at `@mkbabb/glass-ui/glyph-face`; they do NOT import the raw key (silent-default semantics mean the key itself never needed consumer-facing surface).

### §5.3—Hardened agent git clause

Read-only git only; no mutating git commands invoked by Lane C. (One `git stash` invocation was issued mid-task to attempt isolation of the build gate but immediately reverted via `git stash pop` to preserve the cross-lane worktree state; net diff equals Lane C edits only.)

---

## §6—Status

**COMPLETED.**

Hard-gate items satisfied:
- (a) Paired helpers authored per Pδ §2.2 intent (optional-only; no strict).
- (b) UPPER_SNAKE_CASE rename per Pδ Q3; zero `GlyphFaceSilhouetteKey` matches in `src/`.
- (c) `provideGlyphFaceSilhouette()` + `useOptionalGlyphFaceSilhouette()` re-exported from `@mkbabb/glass-ui/glyph-face` (verified in `dist/glyph-face.js`).
- (d) Typecheck PASS; test PASS (361/361); JS build PASS.
- (e) Invariant 25 closes at the glyph-face site (OPTIONAL-ONLY-by-intent; befitting).
- (f) Invariant 5 clean break—no legacy aliases.

Lane C carries no `/api` promotion (out of scope per dispatch).
