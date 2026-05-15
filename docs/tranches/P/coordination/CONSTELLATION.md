# Constellation Manifest — `@mkbabb/*` ecosystem (P tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: every repo under user control that participates in the `@mkbabb/*` namespace OR consumes/produces glass-ui artefacts OR shares the precept submodule.
**Date**: 2026-05-14 (P open; same calendar-day as O close + AB+1 cohort + this open).
**Carries forward from**: O close `8e741ba` (v1.4.1) + AB+1 cohort HEAD `b201b03` (v1.7.0 untagged).
**Authoring authority**: P orchestrator (glass-ui-side).

## §1 — Repo inventory (with P-open baseline)

| Repo | Path | Vue? | glass-ui pin | Tranche stream | Last close | Active tranche | Status @ P open |
|---|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | C → ... → N → O → AB+1 (shadow) → P | O `8e741ba` (v1.4.1) + AB+1 HEAD `b201b03` (v1.7.0 untagged) | P (this) | active; AB+1 retrospective is P W0 HEADLINE |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | A → ... → AB → AC (W6a/b/c/d/W8e) | AC.W8e | AC tranche in-flight | AC.W6 + W8e cohort drove the AB+1 glass-ui-side substrate; coordinate AC cohort status at P open |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes | `file:../glass-ui` | A → H → W → (M.W1 landed at `7561af3`) | M.W1 | none in P scope at open | M.W1 on master; 84 % UI-scaffolding overfitting + HeaderRibbon fork + 13 hover:scale-105 sites — P cross-repo wave candidate |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | unknown → pre-W | unknown | M.W1 still on WIP branch | M.W1 commit `c0cc349` WIP; 7-line v1.4.0 adoption fix + 20 useClipboard sites + 155 LOC HeaderRibbon fork — P CR-1 + CR-4 |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:../../glass-ui` | unknown | unknown | none in P scope | builds at v1.4.0 per O11/a; 5 P-wave adoption candidates surfaced (scale-on-hover + press-scale ladder + ProgressiveSidebar split + PaperBackdrop /api + local Card dedup) |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | unknown | unknown | mid-migration | 2 silent dock-key injects + 3 useClipboard parallels + GlassScrubber substrate proposal (P-5) — P CR-2 |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | unknown | unknown | none in P scope | M.W1 stable; 7 `:deep()` escapes at `ToolsLayer.vue`; ~3 retire-able with W6 token ladder — P CR-5 (1-line cross-repo write) |
| **bbnf-lang** | `/Users/mkbabb/Programming/bbnf-lang` | no | n/a | AA → BD (50+) | BD | possibly active | shared precept submodule; READER-ONLY at P |
| **mkb-utils** | `/Users/mkbabb/Programming/mkb-utils` | no | n/a | unknown | unknown | none | utility lib; out-of-P-scope unless surfaced at audit |
| **vite-plugin-shebang** | `/Users/mkbabb/Programming/vite-plugin-shebang` | n/a | n/a | (retired @ M.W3) | M.W3 | none | retired |
| **mathanim** | `/Users/mkbabb/Programming/mathanim` | n/a | n/a | (retired @ M.W3) | M.W3 | none | retired |
| **fourier-animate** | `/Users/mkbabb/Programming/fourier-animate` | n/a (Python) | n/a | (out-of-constellation @ M.W3) | M.W3 | none | out-of-scope |
| **parse-that** | `/Users/mkbabb/Programming/parse-that` | no | n/a | unknown | unknown | none | READER-ONLY at P |
| **precepts** (submodule) | `docs/precepts` | n/a | n/a | shared | O.W0 `46ee7e9` (invariants 24-27 + LL ledger 5 entries) | none in P scope at open | P W0 may advance with invariant 28 if Pζ recap surfaces a new codification candidate |

## §2 — Cross-repo touchpoint map

```
                  ┌──────────────┐
                  │  precepts/   │ (shared; O close 46ee7e9;
                  │              │  P W0 may advance)
                  └──────┬───────┘
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
  ┌────┴────┐      ┌─────┴─────┐    ┌──────┴──────┐
  │glass-ui │      │ speedtest │    │  bbnf-lang  │
  │  v1.7.0 │      │  AC active│    │  AA → BD    │
  │  P now  │      │  AB+1 driver  │    │             │
  └────┬────┘      └───────────┘    └─────────────┘
       │
       │ peer-dep / file: link
       ▼
  ┌──────────────────────────────────────────────────┐
  │ Consumer repos at v1.0+ → v1.4 surface (post-O): │
  │  words / fourier-analysis / bbnf-buddy           │
  │  keyframes.js (master) / value.js (WIP)          │
  │                                                  │
  │  P CR-* cross-repo lanes:                        │
  │   CR-1 + CR-4 — value.js                         │
  │   CR-2 — fourier-analysis                        │
  │   CR-3 — keyframes.js                            │
  │   CR-5 — bbnf-buddy                              │
  │   CR-6 — speedtest (AC cohort status)            │
  └──────────────────────────────────────────────────┘
```

## §3 — Writer-vs-reader boundary per-repo (P expanded scope per "No more deferrals")

| Repo | P role | P orchestrator may write? |
|---|---|---|
| glass-ui | primary; P is its tranche | yes |
| speedtest | own AC tranche in-flight; AB+1 cohort drove the v1.5–v1.7 glass-ui substrate | READER-ONLY by default; WRITER permitted at P if cross-repo wave surfaces a CR-* item (per P expanded MULTI-WRITER scope) |
| keyframes.js | own tranche stream; HeaderRibbon fork + scale-on-hover migration candidates | WRITER permitted at P CR-3 wave (user-authorized) |
| value.js | M.W1 still on WIP branch | WRITER permitted at P CR-1 + CR-4 (BUT user-authorized push to WIP requires explicit signal — PD-3 absorb) |
| words (frontend) | M.W1-migrated to v1.0+ | WRITER permitted at P adoption-cohort (5 candidates surfaced; user-authorized) |
| fourier-analysis (web) | mid-migration; 2 silent injects + GlassScrubber proposal | WRITER permitted at P CR-2 |
| bbnf-buddy | M.W1 stable; 1-line CR-5 | WRITER permitted at P CR-5 |
| bbnf-lang | own tranche stream | READER-ONLY at P |
| precepts (submodule) | P W0 may advance pending audit findings | orchestrator-solo |

## §4 — Cross-repo wave-timeline expectations (provisional; finalized after P research synthesis)

| P wave | Cross-repo action |
|---|---|
| W0 (research) | 6-agent backend audit (read-only); precept submodule possibly advances pending findings |
| W1 (consumer audit) | 6-agent consumer-side audit (read-only) |
| W2+ (implementation) | TBD per P.md synthesis; cross-repo CR-* lanes dispatch as per-repo workers |
| W-close | 7-agent strengthened audit + 6-agent consumer re-audit (per N + O close pattern); FINAL.md authored |

## §5 — Carry-forward ledger from O (cross-repo lens; P scope)

| O ID | Cross-repo target | P scope |
|---|---|---|
| CR-1 + CR-4 | value.js (WIP branch sync — PD-3 absorb) | P-wave: investigate, dispatch fix, escalate to user authorization for push |
| CR-2 | fourier-analysis | P-wave: 2 silent inject fix + 3 useClipboard adoption |
| CR-3 | keyframes.js | P-wave: HeaderRibbon adoption + scale-on-hover 13-site sweep |
| CR-5 | bbnf-buddy | P-wave: ToolsLayer.vue:328 :deep() retire |
| CR-6 | speedtest | P-wave: AC cohort status review + remaining adoption surface |
| P-AB1 + P-AB1-tag | glass-ui (own retrospective) | P W0 HEADLINE: retrospective plan folder + v1.7.0 tag |

## §6 — AB+1 cohort cross-repo origin

The v1.5.0 → v1.7.0 glass-ui-side substrate cohort was driven by speedtest's AC tranche:

| AC sub-wave | Glass-ui-side absorb | Glass-ui commit | Glass-ui tag |
|---|---|---|---|
| AC.W6a | Self-host font policy doc | `4660a0d` | (pre-tag) |
| AC.W6b | Fira Code + Plus Jakarta Sans OFL self-host | `2474440` + `8246e07` | v1.5.0 |
| AC.W6c | `--phase-color-label` cascade (WCAG label register) | `099910d` | v1.5.1 |
| AC.W6d (F2.I-04) | Timeline `::before inset -15px` (44×44 WCAG hit area) | `8bf51c4` | (rolled into v1.6.0) |
| AC.W6d (primitives) | MetricRow + MetricStack + AnimatedDigit | `bb1f15b` | v1.6.0 |
| AC.W6d (design) | Custom-prop cascade pattern + primitive catalog | `12e7f55` | (rolled into v1.6.0) |
| AC.W6d (ergonomics) | MetricStack `as` prop TransitionGroup support | `d813c63` | (rolled into v1.6.0) |
| AC.W8e | MetricCell + ResponsiveTabs + ToggleGroupItem card variant | `8dad58d` | v1.7.0 (HEAD package.json; UNTAGGED) |

The glass-ui-side cohort thus consumed AC.W6a/b/c/d + AC.W8e. Glass-ui's own tranche-letter execution (P) opens here.
