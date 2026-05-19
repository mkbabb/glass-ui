# Constellation Manifest — `@mkbabb/*` ecosystem (AB+2 cohort baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: AB+2 cohort window (2026-05-16 17:57 → 2026-05-18 02:03; ~32 hours; 3 calendar days).
**Date**: authored retroactively at Q.W0 Lane A (2026-05-18); reconstructs the multi-peer state at AB+2 execution time.
**Carries forward from**: P close `9f774b4` (v1.8.4; 2026-05-16).
**Closes into**: Q open (HEAD `d244dd5`; v1.8.4 untagged within cohort).

## §1 — Cross-repo attribution (W1 only: speedtest AD.W4.T2)

W1's single commit (`949474a`) carries an external speedtest-AD tranche attribution in its subject:

```
refactor(freshness): retire assertDistFresh + freshness-walk + freshness-gate apparatus (AD.W4.T2)
```

| Field | Value |
|---|---|
| Driving repo | `/Users/mkbabb/Programming/speedtest` |
| Driving tranche | AD (in-flight at AB+2 execution time) |
| Driving decision | AD.W4 Decision 5 (RATIFIED) — runtime stale-dist gate superseded by `"development"` conditional-exports |
| Glass-ui-side role | substrate retire (WRITER of own surface; READER-ONLY of speedtest AD tranche state) |
| Speedtest-side role | decision issuer (owns the AD.W4 ratification; not a WRITER of glass-ui internals) |
| Attribution tag | `AD.W4.T2` verbatim in commit subject |

The CLAUDE.md at HEAD documents the retirement under §Subpath surface: "The `./freshness` subpath retired at AD.W4 (Decision 5): the runtime stale-dist gate is superseded by the canonical `"development"` conditional-exports branch already in place — dev consumers resolve to `src/` directly, so a stale `dist/` cannot mislead them."

W2 and W3 (6 commits) carry NO speedtest attribution — they are pure glass-ui shadow work.

## §2 — Repo inventory at AB+2 execution time

| Repo | Path | Glass-ui pin | Activity during AB+2 | Status at AB+2 close |
|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (origin) | 7-commit cohort; 0 tags placed | v1.8.4 (untagged within cohort) |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | `file:../glass-ui` | AD tranche in-flight; AD.W4 Decision 5 drives W1 | AD tranche in-flight at AB+2 close |
| **value.js** | `/Users/mkbabb/Programming/value.js` | `file:../glass-ui` | WIP branch `w.w2.1-value-js-prebuild` still unmerged (P.W5 `755b3cd` on WIP; NOT pushed) | **REPORTED BROKEN** at Q open — Qα forensics |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | `file:../glass-ui` | Unchanged (P.W5 Lane C `2183f32` on origin/master) | **REPORTED BROKEN** at Q open — Qα forensics |
| **fourier-analysis** | `/Users/mkbabb/Programming/fourier-analysis` | `file:../../glass-ui` | Unchanged (P.W5 Lane B `4df1a06` on origin/master) | Q round-2 re-audit |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | `file:../glass-ui` | Unchanged (P.W5 Lane D `dafb99f` local; no remote) | Q round-2 re-audit |
| **words/frontend** | `/Users/mkbabb/Programming/words/frontend` | `file:../../glass-ui` | Unchanged (P.W5 Lane E `5c1b2b8` on origin/master) | Q round-2 re-audit |
| **precepts** (submodule) | `docs/precepts` | n/a | Unchanged (P.W6 `3310a8c` advance; invariants 28-29 codified on 2026-05-16) | Q may advance post-W0 |

## §3 — Writer-vs-reader boundary at AB+2 execution time

| Repo | AB+2 role | AB+2 orchestrator may write? |
|---|---|---|
| glass-ui | primary (own shadow-executed work) | yes (the substrate WAS written) |
| speedtest | AD tranche issuer (Decision 5 drives W1) | READER-ONLY (coordination is semantic; no glass-ui writes to speedtest) |
| value.js | WIP-branch holder (P.W5 unmerged) | READER-ONLY (user-WIP-ownership per PD-3 archive) |
| keyframes.js | master-pinned consumer | READER-ONLY |
| fourier-analysis | master-pinned consumer | READER-ONLY |
| bbnf-buddy | local-only consumer | READER-ONLY |
| words/frontend | master-pinned consumer | READER-ONLY |
| precepts (submodule) | shared | READER-ONLY at AB+2 (no precept advance during cohort window; invariant 29 was codified BEFORE the cohort window at P.W6 `3310a8c` 2026-05-16) |

No cross-repo writes landed during AB+2. The cohort was entirely glass-ui-internal substrate work, with W1 being an inbound speedtest-AD-decision retire (glass-ui WRITES the retirement; speedtest issues the decision).

## §4 — Consumer-breakage cross-reference

value.js and keyframes.js are reported broken at Q open. Both pin glass-ui via `file:../glass-ui` and consume the glass-ui `dist/` (or `src/` via the `"development"` conditional-export). The AB+2 cohort (specifically W2's dock.css ×2 + ContinuousTimeline geometry rewrite) is the prime suspect for the breakage:

| Suspect commit | Change | Why risky |
|---|---|---|
| `099d51e` | dock.css: mask-image removed | removes a CSS property consumers may compose with (visual framing artefact) |
| `3cb70db` | ContinuousTimeline: per-region gradient → stitched gradient; dot upgraded to glass | consumers targeting ContinuousTimeline CSS vars would need to re-tune; dot state CSS changed |
| `beec35e` | dock.css: inactive layers get `visibility: hidden` | state change that affects any consumer composing `DockLayerGroup` — inactive layer now visually gone, not just opacity-0 |

**Q.W1 breakage forensics determine causality.** This CONSTELLATION.md records the cross-repo state at AB+2 execution time as baseline evidence for the Q.Qα forensics lane.

## §5 — Process observations

AB+2 is the fourth recurrence of the K-invariant-3 shadow-execution anti-pattern:

| Recurrence | Tranche | Window | External driver | Plan folder at execution? | Closure |
|---|---|---|---|---|---|
| 1st | V | 2026-05-06 → 2026-05-08 (68 commits / 5 releases) | K.W reconciliation | NO | K.WV retrospective |
| 2nd | AB | post-N close (commits + tags) | O.W0 Lane A | NO | O.W0 retrospective |
| 3rd | AB+1 | 2026-05-14 (12 commits / 3+1 tags) | Speedtest AC.W6/W8e | NO | P.W0 Lane A retrospective |
| **4th** | **AB+2** | **2026-05-16 → 2026-05-18 (7 commits / 0 tags)** | **Speedtest AD.W4 (W1 only)** | **NO** | **Q.W0 Lane A retrospective (this folder)** |

The recurrence pattern + the invariant-29-after-codification finding are documented at `docs/tranches/AB+2/AB+2.md §7` and `docs/tranches/Q/research/Qepsilon-recap-chronic-retrospective.md §3.4`. The Q.W0 Lane B root-cause diagnosis is the escalation instrument.

## §6 — Hand-off to Q

The AB+2 cohort closes at retrospective publish (Q.W0 Lane A). Zero library-side carries exit AB+2 — every committed change is either complete or is a prime-suspect input to Q.W1 forensics (consumer-breakage). The AD.W4.T2 cross-repo coordination is complete at W1; speedtest's AD tranche owns its own close ceremony.

| # | Item | AB+2 role | Q destination |
|---|---|---|---|
| (no substantive carries) | — | — | — |
| (informational) | W2 dock/timeline as breakage prime suspect | documentation | Q.W1 Qα forensics lane |
| (informational) | speedtest AD.W4 Decision 5 coordination | W1 attribution | speedtest AD tranche's own close (glass-ui side complete) |
