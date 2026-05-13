# M.W3 Lane A — Stale-repo retire-or-refresh proof

**Wave**: M.W3
**Lane**: A
**Scope**: 3 stale constellation repos — `vite-plugin-shebang`, `mathanim`, `fourier-animate`
**Mode**: cross-repo read-only inspection + glass-ui-side documentation update
**Date**: 2026-05-12

## § Disposition summary

| Repo | Last activity | Identity | Active consumers | Disposition |
|---|---|---|---|---|
| `vite-plugin-shebang` | 2023-11-13 | Vite plugin (npm pkg, ^0.1.6) | **1** — `mailtyphoon` (dormant since 2024-01) | **FORMAL-RETIRE (soft)** — keep published as-is; mark dormant in CONSTELLATION; no Vite-5 bump |
| `mathanim` | 2021-02-16 | `@mkbabb/mathanim` v1.0.0 demo site (TS 4.1) | **0** | **FORMAL-RETIRE** — dormant 5 years; demo-only; no published npm presence |
| `fourier-animate` | 2022-07-28 | Python (Poetry; matplotlib/numpy/scipy/opencv) | **0** Node consumers | **MOVE-OUT-OF-CONSTELLATION** — Python-only; outside `@mkbabb/*` Node namespace |

Default per V3 ("NO legacy code") + KISS: prefer FORMAL-RETIRE over REFRESH.

## § Per-repo inspection findings

### vite-plugin-shebang

```
path     : /Users/mkbabb/Programming/vite-plugin-shebang
last git : 2023-11-13 16:35  4d73cdd  "version bump"
remote   : https://github.com/mkbabb/vite-plugin-shebang.git
identity : { name: "vite-plugin-shebang", version: "0.1.6", main: "dist/index.js", type: "module" }
deps     : devDeps only — vite ^4.5.0, typescript ^5.2.2, vitest ^0.34.6, @types/node ^20
exports  : "." → dist/index.js (esm+cjs same file)
files    : src/, test/, dist/ (built), package-lock.json, README.md, LICENSE, tsconfig.json
```

**Consumer-graph search** (`grep -l "vite-plugin-shebang"` across all peer `package.json` under `/Users/mkbabb/Programming/`):

| Consumer | Pin | Last activity | Status |
|---|---|---|---|
| `mailtyphoon` | `"vite-plugin-shebang": "^0.1.6"` (devDep) | 2024-01-12 | dormant since early 2024; pin matches published 0.1.6 |

**Finding**: Rα §A claim of "zero active consumers" was incorrect by one consumer. The actual situation: 1 dormant consumer pinned on the current published version. No active workflow depends on a Vite-5 bump.

### mathanim

```
path     : /Users/mkbabb/Programming/mathanim
last git : 2021-02-16 02:24  ebb36cb  "More CSS changes."
remote   : git@github.com:mkbabb/mathanim.git
identity : { name: "@mkbabb/mathanim", version: "1.0.0", main: "confetti.js" }
deps     : @mkbabb/animation (github:mkbabb/animation.js), confetti-js ^0.0.18, yajr (github:mkbabb/yajr)
devDeps  : typescript ^4.1.3, eslint 7.x, prettier 2.x — all 4-year-stale
files    : src/, assets/ (58 entries — math/animation assets), styles/, dist/, .eslintrc.json, .prettierrc.json, package-lock.json
toolchain: no Vite (no bundler beyond tsc); appears to be a static demo site
```

**Consumer-graph search**: zero hits outside self (no peer repo depends on `@mkbabb/mathanim`).

**npm registry**: package name `@mkbabb/mathanim` is not published (CONSTELLATION manifest §1 row shows no npm pin path; package.json declares no `private: false` + no publishConfig). Treated as a personal demo site living under the `@mkbabb/*` namespace by convention only.

**Finding**: dormant 5 years (since Feb 2021), TS 4.1 (5 majors stale), depends on two github-direct refs (`@mkbabb/animation`, `yajr`) that may themselves be unmaintained. Zero downstream impact.

### fourier-animate

```
path     : /Users/mkbabb/Programming/fourier-animate
last git : 2022-07-28 23:41  a9cf8b3  "Removed vex"
remote   : https://github.com/mkbabb/fourier_animate.git
identity : Python (Poetry) — pyproject.toml "fourier-animate" v0.1.0
deps     : python >=3.10,<3.11; matplotlib ^3.5.2; numpy ^1.23.1; scipy ^1.8.1; sklearn ^0.0; opencv-python ^4.6.0
files    : 3danim.py, parametric_fourier.py, image_shortest_tour.py, generated.py, utils.py, assets/ (79 entries),
           examples/, vexcode/, poetry.lock, pyproject.toml
package.json : DOES NOT EXIST (confirmed; M.Rε §A "no package.json found" verified)
```

**Consumer-graph search**: zero hits — and structurally cannot have Node consumers (no JS surface).

**Finding**: Python-only Poetry project. Outside the `@mkbabb/*` Node-package scope by definition. Should not be tracked in a Node-ecosystem constellation manifest.

## § Per-repo disposition rationale

### vite-plugin-shebang → FORMAL-RETIRE (soft)

**Rationale**:
- Last release 2023-11-13; package is functionally complete (a 50-LOC Vite plugin that prepends shebangs).
- 1 dormant consumer (`mailtyphoon`) currently pinned on the published `^0.1.6` — no upgrade pressure.
- Vite 5 / Vite 6 plugin API is broadly compatible with v4-era plugins; if `mailtyphoon` ever bumps Vite, the plugin will likely still work without source changes (peer-dep declared loosely).
- KISS + V3: no investment justified. Bumping Vite-4 → Vite-6 yields no functional improvement.

**Action taken** (documentation-only):
- CONSTELLATION.md §1 status column updated to "retired @ M.W3 — FORMAL-RETIRE (soft); 1 dormant consumer (mailtyphoon ^0.1.6)".
- npm package remains published as a tombstone (no deprecation flag added; user authorization required for any npm-side `npm deprecate` call).

**No source-tree changes** in `/Users/mkbabb/Programming/vite-plugin-shebang`.

### mathanim → FORMAL-RETIRE

**Rationale**:
- Dormant 5 years (last commit 2021-02-16).
- Zero downstream consumers.
- TS 4.1 / ESLint 7 / Prettier 2 — entire toolchain is 4-5 majors stale.
- Depends on two `github:` direct refs (`mkbabb/animation.js`, `mkbabb/yajr`) that are themselves unmaintained — refresh would cascade into unrelated repo work.
- Demo site identity (`main: "confetti.js"`, assets/, styles/) — not a library; nothing in the constellation imports from it.
- KISS + V3: no investment justified.

**Action taken** (documentation-only):
- CONSTELLATION.md §1 status column updated to "retired @ M.W3 — FORMAL-RETIRE".
- No npm-side deprecation needed (package not published).

**Repo move recommendation** (escalated to orchestrator — see § Open questions):
- Candidate for renaming `/Users/mkbabb/Programming/mathanim` → `/Users/mkbabb/Programming/.archive/mathanim` OR moving entirely out of `Programming/` root. **Not executed** — requires user authorization.

### fourier-animate → MOVE-OUT-OF-CONSTELLATION

**Rationale**:
- Python project (Poetry-managed; no package.json; no Node surface).
- Outside the `@mkbabb/*` Node-package namespace by definition.
- Including it in a Node-ecosystem constellation manifest is a scope error; M.Rε §A correctly flagged "no package.json found".
- Dormant since 2022-07 but that is orthogonal — even if active, it would not belong in this manifest.

**Action taken** (documentation-only):
- CONSTELLATION.md §1 status column updated to "out-of-constellation-scope @ M.W3 — Python-only (Poetry)".
- §4 writer-vs-reader boundary row updated to reflect out-of-scope state.

**Repo move recommendation** (escalated to orchestrator — see § Open questions):
- Candidate for renaming `/Users/mkbabb/Programming/fourier-animate` → `/Users/mkbabb/Programming/python/fourier-animate` OR similar Python-side grouping. **Not executed** — requires user authorization.

## § CONSTELLATION.md updates applied

§1 rows changed:

| Row | Before (Status column) | After |
|---|---|---|
| vite-plugin-shebang | `stale (Vite 4); retire-or-refresh in M.W5` | `retired @ M.W3 — FORMAL-RETIRE (soft); 1 dormant consumer (mailtyphoon ^0.1.6); npm tombstone` |
| mathanim | `stale (TS 4.1); verify scope; retire-or-refresh in M.W5` | `retired @ M.W3 — FORMAL-RETIRE; dormant 5y; 0 consumers; demo-only (not npm-published)` |
| fourier-animate | `verify — possibly Python-only; formal out-of-constellation if so` | `out-of-constellation-scope @ M.W3 — Python-only (Poetry); structurally outside @mkbabb/* Node namespace` |

§4 (writer-vs-reader) rows changed:

| Row | Before | After |
|---|---|---|
| vite-plugin-shebang | `stale; retire-or-refresh decision in M.W5 \| yes` | `retired @ M.W3; no further writes \| no` |
| mathanim | `stale; retire-or-refresh in M.W5 \| yes` | `retired @ M.W3; no further writes \| no` |
| fourier-animate | `verify scope first \| reader-only until scope verified` | `out-of-constellation @ M.W3 \| not applicable (out of scope)` |

§9 W3 close added:
- `W3 close state (2026-05-12)` block summarizing Lane A dispositions.

## § Open questions for orchestrator

1. **Repo-relocation authorization** — should the orchestrator escalate to the user any of:
   - Renaming `mathanim` to `.archive/` prefix or moving out of `Programming/` root?
   - Moving `fourier-animate` into a Python-grouped directory (e.g., `Programming/python/`)?
   These are file-system moves and require explicit user authorization per V3/KISS handling of legacy code. Default: **leave physically in place**; CONSTELLATION.md disposition is sufficient for tranche-tracking purposes.

2. **npm tombstone for vite-plugin-shebang** — should `npm deprecate vite-plugin-shebang@"<=0.1.6" "package is retired; no further updates planned"` be run? This is a soft signal to any future would-be consumer. Default: **do not run** without user authorization — `mailtyphoon` currently consumes it cleanly and a deprecation warning would surface noisily during its installs.

3. **W3 scope reconciliation** — §5 timeline row for W3 named only "stale-repo retire-or-refresh + doc cohort", but the constellation now needs to acknowledge `fourier-animate` is structurally out-of-scope (a third disposition category beyond REFRESH / RETIRE). This proof and the §9 W3 block document the three categories.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
```

(See worktree status check in Bash output — only `docs/tranches/M/coordination/CONSTELLATION.md` modified + `docs/tranches/M/audit/W3-Lane-A-stale-repo-decisions-proof.md` created. No source-tree mutations in any of the 3 stale repos; no glass-ui src/ touched; no precept submodule touched.)
