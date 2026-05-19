# Q.W6 — keyframes.js gh-pages outDir split + fourier patch correction

**Wave**: Q.W6 remediation.
**Lane**: two-item cross-repo fix — keyframes.js build-output collision +
fourier-analysis phantom-class patch correction.
**Date**: 2026-05-18.
**Posture**: READ-ONLY git in every repo. Orchestrator owns the index.

---

## 1 — Charter

Two residuals surfaced at the W6 close, both already documented:

- **Task 1 — keyframes.js gh-pages outDir collision.** The W6 consumer
  re-audit (`W6-reaudit-value-keyframes-fourier.md` §Q-RESIDUAL) found
  keyframes.js's `vite.config.ts` gives the `gh-pages` (demo) build and the
  `production` (library) build the SAME `outDir: ./dist/` with
  `emptyOutDir: true`. Running `npm run gh-pages` therefore wipes the library
  `dist/keyframes.{js,d.ts}` the package's `exports` map resolves to — the
  demo-clobbers-library-dist defect class Q chartered against (Q-break-3 fixed
  exactly this in value.js). It was observed live during the audit: a
  `gh-pages` build left `dist/` holding only the demo site, and downstream
  fourier-analysis then failed `npm run build` with
  `Cannot find module '@mkbabb/keyframes.js'`.

- **Task 2 — fourier patch undercount.** The W6 phantom-class corpus-grep gate
  (`W6-Lane-phantom-class-gate.md` §4.4) found fourier-analysis carries 31
  phantom-class sites, but `W4-Lane-F-fourier.patch` covered only 29 — it
  missed 2 `glass-elevated` sites (`PaperSearchDropdown` + `EquationView`).
  W4 Lane F's scope was cluster C2 — `.glass-{subtle,medium}` — so the wider
  `glass-elevated` ladder name fell outside it. The patch + spec must be
  corrected to the true 31-site count.

---

## 2 — Task 1: keyframes.js gh-pages outDir split

### 2.1 The defect

`keyframes.js/vite.config.ts` has four build modes. The `production` (library)
mode uses Vite's default `outDir` (`dist/`); the `gh-pages` (demo) mode set an
explicit `outDir: path.resolve(import.meta.dirname, "./dist/")` with
`emptyOutDir: true`. The two modes therefore wrote to the SAME directory, and
whichever ran last won — `gh-pages` silently destroying the library build.

This was masked in normal dev because `exports["."].development → src/` lets
dev-mode consumers bypass `dist/` entirely; it bit any consumer or tool
resolving the `import`/`types` condition (production builds, `tsc` typecheck)
whenever `gh-pages` ran last.

### 2.2 The fix

`vite.config.ts`, `gh-pages` branch — route the demo build to a separate
outDir under `dist/`:

```ts
build: {
    // Demo (gh-pages) output is routed to a SEPARATE outDir so a
    // demo build never clobbers the library `dist/keyframes.{js,d.ts}`...
    outDir: path.resolve(import.meta.dirname, "./dist/gh-pages/"),
    emptyOutDir: true,
    ...
}
```

`dist/gh-pages/` keeps the demo site inside the already-gitignored `dist/`
tree (no `.gitignore` change needed) while leaving the library
`dist/keyframes.js` + `dist/keyframes.d.ts` untouched. The `production` mode
keeps the default `dist/` — the two builds no longer share an `emptyOutDir`
target.

`.github/workflows/node.js.yml`, `deploy` job — two consequential edits:

- `publish_dir: ./dist` → `publish_dir: ./dist/gh-pages` (the demo site moved).
- `cp CNAME dist/` → `cp CNAME dist/gh-pages/` (CNAME must sit next to the
  published site).
- the redundant `- run: npm run build` step was removed: with the outDir split
  the `gh-pages` build no longer touches the library `dist/`, so building the
  library before the demo build serves no purpose for the deploy job (the
  deploy job publishes only the demo). The library build remains covered by
  the `prepare` script on publish and by the `build` script for consumers.

### 2.3 npm-pack containment

`package.json` keeps `files: ["dist"]`. This is correct: the `prepare` script
runs `vite build --mode production` (library-only) before every `npm publish`,
and that build's default `emptyOutDir` empties `dist/` first — so a stale local
`dist/gh-pages/` cannot leak into the published tarball. Verified by
`npm pack --dry-run`: the tarball contains exactly `dist/keyframes.d.ts` +
`dist/keyframes.js` (+ LICENSE, README, package.json) — no `gh-pages/` entry.

---

## 3 — Task 2: fourier patch correction

### 3.1 The re-scan

A fresh fleet grep of fourier's working tree across the full four-name ladder
`glass-{subtle,default,medium,elevated}` + `cartoon-card`:

```
glass-{subtle,default,medium,elevated}  →  11 sites
cartoon-card                            →  20 sites
                                            ── total 31
```

The 11 phantom-glass sites = the 9 the W4 spec enumerated + **2 the W4 spec
missed**:

| Missed site | Element | Migration |
|---|---|---|
| `web/src/components/paper/search/PaperSearchDropdown.vue:38` | `.paper-search-results` inline-search dropdown | `glass-elevated` → `glass-floating` |
| `web/src/components/equation/EquationView.vue:259` | `.coeff-popover` per-coefficient hover popover | `glass-elevated` → `glass-floating` |

Both are floating-overlay surfaces; `glass-floating` is the canonical v0.8.0
ladder-rename target for the `elevated` rung (per `.retired-classes.txt`:
`glass-elevated` → `glass-floating`). No other ladder names dangle —
`glass-default` returns zero in fourier.

### 3.2 The patch correction

`docs/tranches/Q/audit/W4-Lane-F-fourier.patch` was extended (NOT regenerated
from scratch — the existing 29-site hunks were verified clean first and left
intact):

- the patch header note updated — `29 sites / 22 files` → `31 sites / 23
  files`; F.1 now reads `11 phantom-glass` with the `elevated → floating`
  mapping and an explicit Q.W6-correction line;
- a new file-diff block for `paper/search/PaperSearchDropdown.vue` inserted in
  its natural position (alongside the other `paper/` files), one hunk:
  `@@ -35,7 +35,7 @@` — `glass-elevated` → `glass-floating`;
- the existing `equation/EquationView.vue` file-diff gained one hunk
  `@@ -255,7 +259,7 @@` for the `.coeff-popover` site — `glass-elevated` →
  `glass-floating`. Inserted between the existing `@@ -225` and `@@ -298`
  hunks; the same-line-count change leaves the later hunks' offsets intact and
  `--recount` tolerates the hand-authored headers regardless.

The patch remains a HANDOFF deliverable — fourier's working tree was NOT
touched. The fourier team applies it post-WIP-commit via
`git apply --recount --3way`.

### 3.3 The spec correction

`W4-Lane-F-phantom-sweep.md` updated to the true 31-site count:

- §3.2 — phantom-glass per-site table grown 9 → 11 rows (the 2 `glass-elevated`
  sites added as rows 5 + 11); heading `(9 sites, 7 files)` → `(11 sites, 9
  files)`; an `elevated → floating` rationale paragraph + an explicit note that
  the W6 corpus-grep gate caught the W4 undercount;
- §3.4 — `22 files, 29 sites` → `23 files, 31 sites`; a `Q.W6 correction`
  paragraph records the +2 delta and its provenance;
- §5 — verification table: patch `git apply --check` row → `all 23 files`;
  spec-coverage row → `31/31`; the Qκ/Qψ-research-match row re-anchored to the
  W6 corpus-grep gate count;
- §6 — verdict bullet → `31-site migration (11 phantom-glass + 20
  cartoon-card, 23 files; Q.W6-corrected from the original 29/22)`.

---

## 4 — Verification

| Check | Result |
|---|---|
| keyframes.js `npm run build` (library) | GREEN — `dist/keyframes.js` 50.19 kB + `dist/keyframes.d.ts` 28.8 kB emitted |
| keyframes.js `npm run gh-pages` (demo) | GREEN — built in 6.28s, demo site → `dist/gh-pages/{assets,index.html}` |
| **library dist survives gh-pages build** | **PASS** — after `gh-pages`, `dist/keyframes.js` + `dist/keyframes.d.ts` both still present; `dist/` holds `gh-pages/` + the 2 library files |
| keyframes.js `tsc --noEmit` | GREEN — exit 0 |
| keyframes.js `npm pack --dry-run` | tarball = `dist/keyframes.{js,d.ts}` only — no `gh-pages/` leakage |
| fourier corrected patch `git apply --check --recount` | CLEAN — all 23 files, all hunks apply against fourier's working tree |
| fourier patch `git apply --stat` | 23 files changed, 65 insertions, 50 deletions — EquationView 24 lines (+1 hunk vs original), PaperSearchDropdown 2 lines (new file-diff) |
| fourier patch site count | 31 — matches the W6 `proof:phantom-classes` gate count (11 phantom-glass + 20 cartoon-card) |

Sequence proof for Task 1: `rm -rf dist && npm run build` →
`dist/{keyframes.js,keyframes.d.ts}` present → `npm run gh-pages` →
`test -f dist/keyframes.js && test -f dist/keyframes.d.ts` → both survive.
The pre-fix behaviour (`gh-pages` deletes them) is now structurally
impossible — the two builds write to disjoint directories.

No git mutation in any repo. fourier's working tree was not written.

---

## 5 — Verdict

**PASS — both W6 items remediated.**

- **keyframes.js** — the gh-pages demo build is routed to `dist/gh-pages/`,
  divorced from the library `dist/`. A demo build can no longer clobber
  `dist/keyframes.{js,d.ts}`; the CI deploy job publishes the demo from
  `dist/gh-pages` and the redundant pre-`gh-pages` library build was dropped.
  Verified: library `dist/` survives a `gh-pages` build; typecheck GREEN; npm
  pack carries no demo leakage. This closes the Q-residual the W6 re-audit
  filed — the same demo-clobbers-library-dist class Q-break-3 fixed in
  value.js, now also closed for keyframes.js.

- **fourier-analysis** — `W4-Lane-F-fourier.patch` is corrected from 29 to 31
  sites (the 2 `glass-elevated` → `glass-floating` sites in
  `PaperSearchDropdown` + `EquationView` that W4 Lane F's cluster-C2 scope
  missed), and `W4-Lane-F-phantom-sweep.md`'s per-site spec is updated to the
  true 31-site count. The corrected patch applies cleanly against fourier's
  working tree and matches the W6 `proof:phantom-classes` gate count exactly.
  The patch remains an un-applied HANDOFF deliverable — fourier's team applies
  it after committing their in-flight WIP; fourier's tree was not mutated.
