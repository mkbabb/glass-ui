# Constellation Manifest—`@mkbabb/*` ecosystem (O tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: every repo under user control that participates in the `@mkbabb/*` namespace OR consumes/produces glass-ui artefacts OR shares the precept submodule.
**Date**: 2026-05-14 (O open)—carries forward from N close `37288e0` (v1.1.4).
**Authoring authority**: O orchestrator (glass-ui-side).

## §1—Repo inventory (with O-open baseline)

| Repo | Path | Vue? | glass-ui pin | Tranche stream | Last close | Active tranche | Status @ O open |
|---|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | C → L → M → N → O | N `37288e0` (v1.1.4) | O (this) | active |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | A → Y → Z → AA → AB → AC | AC in flight | AC tranche (independent) | A5 wire on origin/master at `b7173fb7`; AC tranche non-stomping per N11/f |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes | `file:../glass-ui` | A → H → W → (M.W1 landed at HEAD `7561af3`) | M.W1 | none in O scope at open | M.W1 landed on master (correction; was previously assumed WIP). 84 % UI-scaffolding overfitting carries to O—consumer-owned cleanup. |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | unknown → pre-W | unknown | M.W1 still on WIP branch `w.w2.1-value-js-prebuild` | M.W1 commit `c0cc349` on WIP; orchestrator does NOT push. `header-ribbon/` orphan still single-consumer. |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:../../glass-ui` | unknown | unknown | none in O scope | M.W1 landed; 9-site `active:scale-[X.XX]` ladder candidate folded to O-N-7. |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | unknown | unknown | mid-migration refactor in dirty working tree | M.W1 close intact; new union candidate `<GlassScrubber>` flagged at 3 consumer sites (folded to O-N-5). |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | unknown | unknown | none in O scope (no origin remote) | M.W1 stable; 53 drift findings carry; `useLeaveTimer` inline candidate carries. |
| **bbnf-lang** | `/Users/mkbabb/Programming/bbnf-lang` | no | n/a | AA → BD (50+) | BD | possibly active | tranche-format origin; shared precept submodule; READER-ONLY at O. |
| **mkb-utils** | `/Users/mkbabb/Programming/mkb-utils` | no | n/a | unknown | unknown | none | utility lib; out of O scope unless O.W4 surfaces relevance. |
| **vite-plugin-shebang** | `/Users/mkbabb/Programming/vite-plugin-shebang` | n/a | n/a | (retired @ M.W3) | M.W3 | none | retired. |
| **mathanim** | `/Users/mkbabb/Programming/mathanim` | n/a | n/a | (retired @ M.W3) | M.W3 | none | retired. |
| **fourier-animate** | `/Users/mkbabb/Programming/fourier-animate` | n/a (Python) | n/a | (out-of-constellation @ M.W3) | M.W3 | none | out-of-scope. |
| **parse-that** | `/Users/mkbabb/Programming/parse-that` | no | n/a | unknown | unknown | none | READER-ONLY at O. |
| **precepts** (submodule) | `docs/precepts` | n/a | n/a | shared | N.W0 `b8af314` | none in O scope at open | invariants 21-23 + 2026-05-13 LL entry inherited. O.W0 may advance with O-specific clauses pending audit findings. |

## §2—Cross-repo touchpoint map

```
                  ┌──────────────┐
                  │  precepts/   │ (shared; N close b8af314;
                  │              │  O.W0 may advance)
                  └──────┬───────┘
                         │
       ┌─────────────────┼─────────────────┬─────────────────┐
       │                 │                 │                 │
  ┌────┴────┐      ┌─────┴─────┐    ┌──────┴──────┐    ┌─────┴─────┐
  │glass-ui │      │ speedtest │    │  bbnf-lang  │    │ (per-     │
  │  v1.1.4 │      │  AC active│    │  AA → BD    │    │  consumer │
  │  O now  │      │  + A5 wire│    │             │    │  N.W4     │
  └────┬────┘      └───────────┘    └─────────────┘    │  re-audit │
       │                                                │  baseline)│
       │ peer-dep / file: link                          └───────────┘
       ▼
  ┌──────────────────────────────────────────────────┐
  │ Consumer repos at v1.1.x surface (post-N):       │
  │  words / fourier-analysis / bbnf-buddy           │
  │  keyframes.js (master) / value.js (WIP)          │
  └──────────────────────────────────────────────────┘
```

## §3—Writer-vs-reader boundary per-repo

| Repo | O role | O orchestrator may write? |
|---|---|---|
| glass-ui | primary; O is its tranche | yes |
| speedtest | own AC tranche in flight; A5 wire already landed | READER-ONLY at O open (audit only); WRITER permitted if O surfaces a 2nd cross-repo wire and the user authorizes |
| keyframes.js | own tranche stream; 84% UI-scaffolding overfitting is consumer-owned | READER-ONLY |
| value.js | M.W1 still on WIP branch | READER-ONLY (audit only; no push) |
| words (frontend) | M.W1-migrated to v1.1.x | READER-ONLY (audit only at O.W4 consumer-audit re-run) |
| fourier-analysis (web) | M.W1-migrated; new union candidate emerging | READER-ONLY at O open; WRITER on glass-ui side if substrate work absorbs the GlassScrubber union |
| bbnf-buddy | M.W1-migrated; no origin remote | READER-ONLY |
| bbnf-lang | own tranche stream; READER-ONLY at O | READER-ONLY |
| precepts (submodule) | O.W0 may advance pending audit findings | orchestrator-solo (no agents—per M.W0 Lane II precedent) |

## §4—Cross-repo wave-timeline expectations (provisional; finalized after O research synthesis)

| O wave | Cross-repo action |
|---|---|
| W0 (research) | 6-agent backend audit (read-only); precept submodule possibly advances pending audit findings |
| W1 (consumer audit) | 6-agent consumer-side audit (read-only across all 6 consumers) |
| W2+ (implementation) | TBD per O.md synthesis; awaits explicit user dispatch authorization |
| W-close | 7-agent strengthened audit + 6-agent consumer re-audit (per the N.W4 close pattern); FINAL.md |

## §5—N-deferred items folded to O (cross-repo lens)

(See `findings.md §"Inherited residuals from N"` for the full ledger.)

- **O-N-2** wire-target backlog: 23 sites at consumer level + library level—orchestrator may write to glass-ui src/ + may propose consumer-side wires for user authorization.
- **O-N-5** union candidate `<GlassScrubber>` / `Slider variant="timeline-glass"`: glass-ui-side substrate; fourier-analysis side adoption is consumer wave.
- **O-N-6** keyframes.js 84 % UI-scaffolding overfitting: consumer-owned cleanup; orchestrator READER-ONLY.
- **O-N-7** words/frontend press-scale ladder: glass-ui-side token tier; consumer adopts at later cohort.

## §6—W0 close addendum (2026-05-14)

| Repo | W0 disposition |
|---|---|
| glass-ui | W0 close commit lands `docs/tranches/AB/` + precept pointer bump (`b8af314` → `46ee7e9`) + 8 cosmetic-excise src/ edits + v1.2.0 tag. |
| precepts (submodule) | Advanced `b8af314` → `46ee7e9`; 4 new invariants (24-27) + LL entry. Pushed independently. |
| AB tranche (retrospective) | Post-hoc plan folder authored at `docs/tranches/AB/`; closes K-invariant-3 shadow-execution recurrence. |
| speedtest | READER-ONLY at W0. AB.W3 canonical-consumer status RE-CONFIRMED by O11/f β audit; the post-hoc AB FINAL.md cites this in its cross-tranche debt section. |
| All other consumers | No-op at W0 (cosmetic-excise + plan-folder additions are not consumer-visible). |
