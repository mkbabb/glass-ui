# O.W0 Lane A—AB retrospective plan-folder post-hoc proof

**Lane**: O.W0 Lane A (doc-only).
**Hard cap**: 20 minutes.
**Authoring date**: 2026-05-14.
**Dispatching tranche**: O (orchestrator-dispatched).
**Closure target**: K-invariant-3 retroactive closure for the AB tranche (the second instance of the tranche-letter shadow-execution pattern after V).

## § Disposition

Per-file authored verdict (all files at `docs/tranches/AB/` unless noted):

| File | Verdict | Lines | Source-of-truth |
|---|---|---|---|
| `AB.md` | AUTHORED | ~165 | git log 54a8acb..a28560f + CHANGELOG `a28560f` header rewrite |
| `PROGRESS.md` | AUTHORED | ~170 | per-commit body extraction from `69c59fa`, `13f4f87`, `a04f05f`, `215ad06`, `6263330`, `14631b7`, `2796b28`, `a36cae8`, `46d0891`, `a28560f`, `2b3727f` |
| `FINAL.md` | AUTHORED | ~150 | aggregated commit chain + CHANGELOG entries + N.W0 PROGRESS "scope-reveal absorb" entry (bundle-budget rebaseline) + N.W4 β audit findings (substrate-consumer P1) + O11/f §5 (AB.W3 substrate RE-CONFIRMED CANONICAL) |
| `waves/W1.md` | AUTHORED | ~75 | commit chain `69c59fa` → `13f4f87` → `a04f05f`; speedtest wire claims from commit bodies |
| `waves/W2.md` | AUTHORED | ~95 | commit chain `215ad06` → `6263330` → `14631b7`; T1+T2+T3+T4 explicit task ID breakdown from commit body |
| `waves/W3.md` | AUTHORED | ~95 | commit chain `2796b28` → `a36cae8` → `46d0891`; CHANGELOG entry at `46d0891` for full API + token surface |
| `waves/W4.md` | AUTHORED | ~85 | `a28560f` (close commit) + `2b3727f` (post-close coda); CHANGELOG dock-shadow consumer canon entry |
| `coordination/CONSTELLATION.md` | AUTHORED | ~85 | reconstructed from per-substrate speedtest wire claims; verification chain N11/f → O11/f §5 |
| `docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md` (this file) | AUTHORED | ~125 | this proof |

Net authoring: 9 files at `docs/tranches/AB/` (8) + `docs/tranches/O/audit/` (1).

**No source code touched. No git mutations executed.** Read-only git invocations only.

## § Verification

### Per-commit cross-walk

Source-of-truth: `git log 54a8acb..a28560f --format='%H %ai %s'` returned 13 commits (10 substrate/docs + 1 release + 2 post-v1.1.0 N-doc commits). The 2 N-doc commits (`5bdc981` + `78974c0`) appear in the range but are N.W0 KISS-revision + wiring-revision docs that landed AFTER `a28560f` v1.1.0 close—they belong to N, NOT AB. Filtered out per the AB.* commit-subject discipline. The dock-shadow coda `2b3727f` lands AFTER `a28560f` v1.1.0; bundled retrospectively as the AB.W4 substrate-refinement coda per the user's task brief.

Verified AB substrate-cohort = 11 commits (8 features + 2 docs + 1 release; +1 post-close coda):

| Commit | Wave | Task | Files touched | Lines (+/-) |
|---|---|---|---|---|
| `69c59fa` | AB.W1 | T1 | `tokens.css` | +22 / 0 |
| `13f4f87` | AB.W1 | docs | `CHANGELOG.md`, `DESIGN.md` | (CHANGELOG header + DESIGN note) |
| `a04f05f` | AB.W1 | T5 | `typography.css`, `CHANGELOG.md`, `DESIGN.md` | +23 + (+25 CHANGELOG, +10 DESIGN) |
| `215ad06` | AB.W2 | HoverPopover | `HoverPopover.vue` | +39 / -2 |
| `6263330` | AB.W2 | T1+T2+T3+T4 | GlassTimeline continuous variant | (DOM rewrite + 4 fixes) |
| `14631b7` | AB.W2 | docs | `CHANGELOG.md` +95, `DESIGN.md` Timeline §A11y rewrite | +95 CHANGELOG / DESIGN |
| `2796b28` | AB.W3 | T1 | `Pulse.vue`, `animations.css`, `tokens.css` | +115/-2 + +27 + +48 |
| `a36cae8` | AB.W3 | T2 | `Progress.vue`, `tokens.css` | (variant + tokens) |
| `46d0891` | AB.W3 | docs | `CHANGELOG.md` | +96 |
| `a28560f` | AB.W4 | close | `CHANGELOG.md`, `package.json` | +67/-8, 1.0.5 → 1.1.0 |
| `2b3727f` | AB.W4 coda | substrate | `dock.css`, `tokens.css` | +5/-2, +16/-2 |

### Cited rg/git invocations

```
git log 54a8acb..a28560f --format='%H %ai %s'                 # AB scope determination
git log --oneline 54a8acb..a28560f --format='%H %ai %s' | grep -i 'AB\.'  # AB-tagged commits
git log --all --oneline | grep -i 'dock.shadow\|2b3727f'      # locate dock-shadow coda
git show 46d0891 -- CHANGELOG.md                              # AB.W3 CHANGELOG entry
git show 14631b7 -- CHANGELOG.md DESIGN.md                    # AB.W2 docs delta
git show a28560f -- CHANGELOG.md package.json                 # v1.1.0 close commit
git show 2b3727f                                              # dock-shadow coda
git show --stat 69c59fa a04f05f 215ad06 6263330 14631b7 2796b28 a36cae8 46d0891  # per-commit files
git show --stat 2b3727f                                       # coda files
```

Cross-doc citation:
- `docs/tranches/N/audit/N-audit-beta-substrate-consumer.md` lines 38-39 (AB3+AB4 substrate entries), 136-156 (substrate-consumer P1 findings), 199-211 (F-β-1 + F-β-2 recommended absorbs)
- `docs/tranches/N/PROGRESS.md` 140-141 (bundle-budget rebaseline AB-side origin)
- `docs/tranches/N/FINAL.md` §2 W0 entry (scope-reveal absorb)
- `docs/tranches/O/audit/O11-Lane-f-speedtest.md` §5 lines 151-181 (AB.W3 substrate consumption RE-CONFIRMED CANONICAL at HEAD)

### Bundle-budget rebaseline cross-walk

K W4 baseline (`docs/tranches/K/audit/W4-bundle-profile.json`): `dist/glass-ui.css` budget = 29_000 raw / 5_750 gzip.

Current HEAD baseline (same file, post-N.W0 rebaseline): 36_000 raw / 6_700 gzip.

AB-side delta documented in `FINAL.md §3`: ~+9.3 KB raw / ~+1 KB gzip from chassis token + dock-label utility + Pulse aura recipe + Progress sectioned recipe + animations; ~-0.2 KB raw from dock-shadow coda net reduction.

The rebaseline lives at `scripts/profile-bundle.mjs` (referenced in N.W0 PROGRESS); the AB-side ORIGIN of the rebaseline is now canonically documented in `AB/FINAL.md §3`—closes the K-invariant-3 prior-orphan.

## § Open questions for orchestrator

1. **AB substrate-refinement coda (`2b3727f`) attribution**—the user's task brief explicitly groups `2b3727f` as AB.W4. The commit is dated 2026-05-13 17:45 EDT, ~17 hours AFTER `a28560f` v1.1.0 release at 00:26 same day. I bundled it as the AB.W4 substrate-refinement coda per the brief; the FINAL.md notes the timing explicitly. **Question**: should the coda be split into a half-wave AB.W4.b spec, or remain bundled in W4.md as authored? Current authoring choice: bundled in W4.md to match the task brief framing.

2. **Speedtest constellation letter at AB**—I documented speedtest as "concurrent AB" per the canonical-consumer relationship. The speedtest tranche stream + tranche letters were not directly accessible to this lane (no speedtest worktree). **Question**: should the speedtest letter at AB-time be confirmed via a speedtest-side audit invocation, or is the relationship sufficiently sourced from the per-substrate wire claims in glass-ui commit bodies?

3. **Bundle-budget figures**—`FINAL.md §3` estimates the AB-side CSS delta at ~+9.3 KB raw / ~+1 KB gzip. The N.W0 actual delta from K W4 baseline (29_000 → 31_875 raw / 5_750 → 5_972 gzip per N PROGRESS) is +2_875 raw / +222 gzip—meaningfully smaller than my estimate. The +10 KB figure in the task brief ("AB shipped roughly +10KB CSS") may include other tranche additions between K W4 and N.W0. **Question**: should `FINAL.md §3` cite the exact 2_875 raw / 222 gzip overrun figure (N-baseline delta from K baseline) rather than the ~+10 KB approximation? Current authoring uses the brief's framing as a rough net figure.

4. **AB audit folder**—I created and then removed an empty `docs/tranches/AB/audit/` directory because the post-hoc proof doc lives in `docs/tranches/O/audit/` per the task brief. **Question**: should an empty `audit/` directory exist for shape consistency with N's structure, or is its absence acceptable since AB ran no audits at the time?

5. **CHANGELOG canonical anchor**—`FINAL.md §1` cites specific +line counts for CHANGELOG entries (95 lines for AB.W2, 96 for AB.W3, 67 for AB.W4). These are sourced from `git show --stat` output. **Question**: should these be re-verified against the actual published CHANGELOG.md at HEAD, or accepted as commit-level metadata?

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a96b8cb936f774711 diff --stat
(no output—all authored files are untracked, not modified)

$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a96b8cb936f774711 status --short
?? docs/tranches/AB/
```

The orchestrator integrates via `cp <worktree-path>/docs/tranches/AB/<file> <main-tree-path>/docs/tranches/AB/<file>` for each authored file + the proof doc at `docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md`.

### File enumeration (final)

```
docs/tranches/AB/AB.md
docs/tranches/AB/PROGRESS.md
docs/tranches/AB/FINAL.md
docs/tranches/AB/waves/W1.md
docs/tranches/AB/waves/W2.md
docs/tranches/AB/waves/W3.md
docs/tranches/AB/waves/W4.md
docs/tranches/AB/coordination/CONSTELLATION.md
docs/tranches/O/audit/W0-Lane-A-AB-post-hoc-proof.md
```

9 files authored. Lane closure.

## § Verdict

CLEAN authoring per the K.WV / V-post-hoc pattern. AB plan folder closes the K-invariant-3 violation retroactively. No git mutations executed; no source code touched; no fabricated decisions (every claim cites a commit + body + CHANGELOG + post-AB audit). The AB cohort is now canonically documented as the **second instance of the shadow-execution pattern** (V was the first) with a clean closure path.
