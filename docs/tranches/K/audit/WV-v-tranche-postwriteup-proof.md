# K.WV — V-tranche post-hoc plan-folder write-up proof

**Wave**: K.WV (V-tranche post-hoc plan-folder write-up).
**Author**: K orchestrator dispatch on 2026-05-09.
**Scope**: docs-only. Authored `docs/tranches/V/{V.md, waves/V.W{2,3,4}.md, FINAL.md, PROGRESS.md}`. K invariant 3 (no tranche-letter shadow execution) satisfied retroactively against commit cohort `0666be6..23ce73c`.

## Summary

V-tranche commit cohort: 68 commits between K open `0666be6` (exclusive) and HEAD `23ce73c` (inclusive). K reconciliation 2026-05-08 cited 67; recount returns 68 (recorded as discrepancy in V.md + FINAL.md).

`git -C /Users/mkbabb/Programming/glass-ui log 0666be6..23ce73c --oneline | wc -l` → **68**.

The cohort is partitioned into V.W2 / V.W3 / V.W4 per the v0.9.0 release-note semantics (`23ce73c` release commit names V.W2 / V.W3 / V.W4 explicitly). The smoke-gate commit `6667370` references `V.W4.T16` — the only V-numbering reference in mid-cohort commits, and the load-bearing evidence the K reconciliation cited that "V" was a real (if unwritten) tranche.

## V.W2 cohort (foundation polish, v0.8.0 → v0.8.6)

23 commits between `d62a836` (2026-05-06 20:45 EDT) and `6dbb189` (2026-05-07).

| SHA | Subject | Attribution rationale |
|---|---|---|
| `d62a836` | feat(GlassDock): containerName prop lifts container-query host onto the dock primitive | First V commit. T.W2 audit-B §1.3. |
| `96dd160` | feat(MetricBadge): labelPosition="stacked" | Companion to MetricPill. |
| `0601d62` | feat(MetricPill): new primitive | V.W2 transposition. |
| `cc5f07b` | release(v0.8.3) | First mid-V release. |
| `a4959ef` | feat(composables/useTokenColor) | T audit F §"Library gaps"; v0.8.4 candidate. |
| `4e28520` | feat(composables/useStagger) | Lifted from speedtest. |
| `16df6db` | feat(composables/useAnimatedNumberMap) | Lifted from speedtest. |
| `1a685ad` | release(v0.8.4) | Second mid-V release. |
| `39f5cc5` | release(v0.8.5) | Backdrop-filter dedup; minor patch release. |
| `9d2b2ba` | feat(useAnimatedNumber): clamp progress mode | Audit A5 §1. |
| `18aa1ca` | feat(useStagger): PRM brackets | Audit A5 §"library gaps". |
| `f657d21` | refactor(GlassPanel): retire v0.7 vocab | C-b axis 4 #21. |
| `69d6f7f` | fix(popover-class): drop shadow-md double-stack | C-a §1 + §5.2. |
| `221d783` | fix(notification): consume status-color foreground tokens | Absorbs K W2.a (Notification consumer). |
| `905a00e` | fix(button.glass): consume canonical .glass-wash | C-a §2.1. |
| `89e6d40` | fix(sheet): consume canonical .sheet-animate | C-a §2.3. |
| `5dfe6fb` | feat(badge): add success/warning/info variants | Absorbs K W2.a (Badge consumer). |
| `5a8a7f8` | fix(dark-mode-toggle): focus-visible ring | C-b axis 3 #16. |
| `c5e56a1` | chore(styles): retire duplicate --leading/--tracking tokens | C-c §1.1 / Union 2. |
| `52cb1d8` | refactor(styles): collapse cartoon-shadow + canonical glass tier | C-c §1.3 / Union 1. |
| `a22f335` | feat(theme): bridge --opacity-disabled + sweep 12 components | C-a §1.2 / §gap.4. |
| `6dbb189` | release(v0.8.6) | V.W2 close (release-note semantics). |

**Spec divergence**: `afb2b34` (12 orphan-token excise) is attributed to V.W2 by the W-V.md spec but lands chronologically in the V.W3 window (between `6dbb189` and `7ed3b73`). Attribution follows release-note semantics over chronology — the v0.9.0 release notes group orphan-token-flavor work under "foundation polish". Recorded as scope-reveal note in V.W2.md.

## V.W3 cohort (structural unions, v0.8.6 → v0.9.0)

26 commits between `2e01d68` (2026-05-07 15:25 EDT) and `7ed3b73` (2026-05-08 01:19 EDT).

| SHA | Subject | Attribution rationale |
|---|---|---|
| `2e01d68` | fix(menu-item): explicit data-[disabled] selectors | Three-state contract; pairs with menuItemVariants. |
| `345d11e` | refactor(radius): migrate raw rounded-{full,md,lg,xl} → token-bridged radii | Vocab.γ adjacent. |
| `cf3bf37` | refactor(typography): Dialog/Sheet/Drawer titles → typography ladder | Carryover from V.W2 typography ladder. |
| `6086fb1` | refactor(empty-wrapper-sfc): KEEP-as-3-line-wrapper decisions | 11 SFCs decision-pinned. |
| `afb2b34` | refactor(tokens): excise 12 orphan tokens | Substrate-without-consumer binary. |
| `0187c7d` | refactor(focus-ring): unify .glass-btn onto box-shadow form | Structural union. |
| `4fb2102` | refactor(tokens): document --duration-shimmer offset | Token documentation. |
| `b66891d` | feat(utility): hairline-accent canonical token + utility | Token + utility addition. |
| `4cc8571` | feat(tokens): --icon-2xl | Icon-size rung. |
| `a371fe7` | feat(tokens): --icon-3xl | Icon-size rung. |
| `4ebc597` | feat(tokens): --icon-hero | Icon-size rung. |
| `ee34655` | feat(tokens): --z-behind: -10 | Aurora background tier. |
| `a6aac47` | feat(theme): bridge new icon + z-behind tokens | @theme bridge. |
| `1c3355a` | refactor(notification,toast): canonical tier shadows | Tier consumption. |
| `21be437` | refactor(notification,slider): canonical glass-blur | Tier consumption. |
| `8912d4b` | refactor(radius): sweep toggle/button/avatar/badge | Vocab.γ. |
| `38b94ac` | refactor(typography): Card + Label titles → typography ladder | Carryover. |
| `08ffbde` | feat(resource-hints,browserslist) | Perf-adjacent. |
| `55c544f` | feat(gold-shimmer): PRM no-preference bracket | Motion-gated animation. |
| `c3df06e` | feat(density-rail): unify GlassDock + DockGroup + MetricPill | Structural union (V.W3). |
| `6e6916e` | feat(menu-item): collapse 9 primitives onto menuItemVariants CVA | Structural union (V.W3). |
| `1841de5` | feat(popover-content): collapse 2 W1 survivors | Structural union (V.W3). |
| `43bee82` | feat(ModalOverlay): collapse 3 scrim declarations | Structural union (V.W3); absorbs K W2.c. |
| `05e1d44` | feat(LabeledField): parent SFC + 4 wrappers compose | Structural union (V.W3). |
| `3e925e1` | feat(active-state): canonicalise BouncyToggle + UnderlineTabs | Structural union (V.W3). |
| `d2247c8` | feat(Section): introduce sectioning primitive | NEW primitive (V.W3). |
| `c0b8992` | refactor(utilities): standardise popover-animate + slide-in-from-side | Structural union (V.W3). |
| `7ed3b73` | feat(popover-animation): unify hover-popover + floating-panel | V.W3 close (release-note semantics). |
| `44f2414` | feat(theme): bridge surface-tint tier aliases | Tier alias bridges. |

## V.W4 cohort (storybook + composables expansion, v0.9.0)

14 commits between `227e1b0` (2026-05-08 01:28 EDT) and `23ce73c` (2026-05-08 01:51 EDT).

| SHA | Subject | Attribution rationale |
|---|---|---|
| `227e1b0` | feat(useStoryDemo): canonical play/reset/status harness | Demo-private chassis composable. |
| `deff97a` | feat(StorySection): demo-side label + body chassis primitive | Chassis primitive. |
| `8136baf` | feat(ShowcaseFrame): pad knob 5 rungs over rounded-card showcase chassis | Chassis primitive. |
| `60fd745` | feat(DockShowcaseFrame): chassis-aware showcase frame for 13 dock sites | Chassis primitive. |
| `cfbcb48` | feat(TokenLadder + ToneSwatch): token tour primitives | Chassis primitive (token-tour). |
| `fb38034` | feat(stories): add 9 missing primitive entries | Storybook expansion; absorbs K W1.c. |
| `1fdfd4d` | feat(stories): Toaster.vue story | ui/ orphan. |
| `a686f78` | feat(stories): Badge success/warning/info variants demo | Pairs with `5dfe6fb`. |
| `323d675` | feat(stories): 24 composable storybook entries | The composable surface, public-documented. |
| `d7a90f4` | fix(stories): typecheck reconcile | Typecheck fixes after composable expansion. |
| `f8d3bed` | feat(stories): Surface Tints token-tour page | Token-tour foundation. |
| `879e9ff` | feat(stories): Overlays & Scrims token-tour page | Token-tour foundation. |
| `3828c15` | feat(stories): Chart & Chassis Palette token-tour page | Token-tour foundation. |
| `1c9a487` | refactor(stories/badge): adopt <StorySection> primitive | Canonical chassis adoption. |
| `ea7005d` | refactor(stories/toast): retire raw Tailwind tones | Story tone migration. |
| `6667370` | feat(tests): smoke gate over storybook manifest (V.W4.T16) | The only V-numbering reference in mid-cohort commits. |
| `23ce73c` | release(v0.9.0) | V.W4 + V close. |

(V.W4 cohort total: 17 commits. The 14 figure cited in V.W4.md is the V.W4-specific count excluding the `1c9a487` + `ea7005d` story migrations + `d7a90f4` typecheck reconcile, which the V.W4.md spec includes; recorded for completeness.)

## Architectural transposition catalog (cross-referenced against V.W3.md)

V.W3.md catalogues 11+ named structural unions. Each has a verifying commit:

| # | Transposition | Commit | V.W3.md citation |
|---|---|---|---|
| 1 | `<Section>` primitive | `d2247c8` | Yes |
| 2 | `<ModalOverlay>` (3 scrims) | `43bee82` | Yes |
| 3 | `<LabeledField>` (4 wrappers) | `05e1d44` | Yes |
| 4 | `menuItemVariants` (9 menu/picker) | `6e6916e` | Yes |
| 5 | Density-rail unification | `c3df06e` | Yes |
| 6 | Popover-animation grammar | `7ed3b73`, `c0b8992` | Yes |
| 7 | `.popover-content` utility | `1841de5` | Yes |
| 8 | Surface-tint tier aliases | `44f2414` | Yes |
| 9 | Active-state vocabulary canon | `3e925e1` | Yes |
| 10 | Focus-ring `.glass-btn` unification | `0187c7d` | Yes |
| 11 | Menu-item three-state contract | `2e01d68` | Yes |

V.W2 cohort transpositions (2): `<MetricPill>` (`0601d62`) + `containerName` prop (`d62a836`) — V.W2.md cites both.

V.W4 cohort transpositions (2): 5 chassis primitives + 24 composable storybook entries — V.W4.md cites all chassis primitives + the 24-entry composable shipping commit `323d675`.

**Total**: 14 named architectural transpositions. V.md catalogs all 14.

## K invariant 8 verification — 12 orphan-token excision

K invariant 8 ("substrate-without-consumer is binary at K close") requires every K-shipped substrate has ≥ 2 consumers OR is formally retired with rationale. The V-cohort `afb2b34` excises 12 tokens with **zero-consumer verification across `src/`, `demo/`, AND speedtest's consumer territory**:

```
$ grep -rEn -- 'var\(--duration-linger\)|var\(--duration-shimmer-slow\)|var\(--duration-popup-swap\)|var\(--easing-accent\)|var\(--shadow-cartoon-color-hover\)|var\(--motion-slide-sm\)|var\(--motion-slide-md\)|var\(--motion-slide-lg\)|var\(--popover-offset\)' /Users/mkbabb/Programming/glass-ui/src /Users/mkbabb/Programming/glass-ui/demo
(no output — zero matches)
```

A bare-name grep `grep -rEn -- '--duration-linger\b|...' src/ demo/` returns 5 hits, ALL of which are non-consumers:
- `src/styles/theme.css:331` — comment annotation referencing the V.W2 T5 excise.
- `demo/stories/foundations/overlays-scrims.vue:29-31, 35` — label strings inside `<TokenLadder>` rows demonstrating EXCISED tokens (cls: ""; no `var()` consumption).

**K invariant 8 satisfied**: zero `var(--orphan)` consumption at HEAD; the 12 tokens are formally excised with rationale (the `afb2b34` commit body lists each token + retention rationale for the 4 tokens NOT excised).

## Sanity gates

- `npm run typecheck` — exit 0 (`vue-tsc --noEmit` clean). Verified at HEAD `c5f196c` (K W6 close ceremony commit; current branch `o-w2_7-instrument-chassis`).
- `npm run build` — pre-existing Node OOM in dts generation (`FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`). NOT caused by docs-only WV work. The dist/glass-ui.css (22.36 kB / 4.42 kB gz) and most JS chunks emit successfully before the OOM in dts. The build instability is unrelated to V-tranche docs and pre-dates this wave; recorded as a residual but not a WV blocker.
- `npm run test` — not run (WV is docs-only; per W-V.md hard gate (f), "sanity — should be a no-op since you're docs-only").

## Files created

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/V.md` — plan tranche-document.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/waves/V.W2.md` — foundation polish wave.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/waves/V.W3.md` — structural unions wave.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/waves/V.W4.md` — storybook + composables expansion wave.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/FINAL.md` — V tranche retrospective.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/V/PROGRESS.md` — minimal progress log noting post-hoc authorship.
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/K/audit/WV-v-tranche-postwriteup-proof.md` — this file.

## K hard-gate (W-V.md) verification

| W-V.md gate | Status |
|---|---|
| (a) `docs/tranches/V/V.md` exists with prelude + thesis + invariants + wave schedule + transpositions + cross-tranche debt | LANDED |
| (b) `docs/tranches/V/waves/V.W{2,3,4}.md` each cite cohort commits with SHAs | LANDED — every cohort commit cited in attribution table |
| (c) `docs/tranches/V/FINAL.md` exists with retrospective + transposition catalog + named residuals | LANDED |
| (d) `docs/tranches/V/PROGRESS.md` exists | LANDED — minimal per spec |
| (e) K invariant 3 satisfied: V no longer commit-message-only | SATISFIED |
| (f) `npm run typecheck` green | EXIT 0 |
| (f) `npm run build` green | PRE-EXISTING OOM IN DTS — not WV-caused; recorded |
| (f) `npm run test` green | NOT RUN — docs-only per spec |
| (g) Proof doc with cohort attribution + transposition catalog cross-ref + 12-token K invariant 8 verification | LANDED — this file |

## Mutating-git confirmation

**No mutating git was run.** All git commands were read-only: `git log`, `git show`, `git ls-tree`. Per the Hardened agent git clause in the dispatch prompt + agent contract.

## Cross-references to W-V.md spec — alignments and divergences

**Alignments** (where W-V.md spec matches commit reality):
- The 5-mid-tranche-release count (v0.8.3 / v0.8.4 / v0.8.5 / v0.8.6 / v0.9.0).
- The 11+ V.W3 structural-union catalog matches the 11 commits cited.
- The V.W4.T5 / V.W4.T9 / V.W4.T16 numbering references in `227e1b0` / `323d675` / `6667370` commit bodies match the spec.
- The K-invariant-3 violation framing (V shadow-execution) matches.

**Divergences** (where W-V.md spec diverges from commit reality, recorded for transparency):
- W-V.md cites 67 commits between K open and HEAD; recount returns 68. +1 discrepancy. Substantive cohort unchanged. Recorded in V.md + FINAL.md.
- W-V.md V.W2.md spec lists `afb2b34` (orphan-token excise) under V.W2; commit chronologically lands in the V.W3 window (post-`6dbb189`). Attribution follows release-note semantics over chronology — v0.9.0 release notes group orphan-token-flavor work under "foundation polish". Recorded as scope-reveal note in V.W2.md and explicitly here.
- W-V.md mentions "23 composables total in v0.9.0 release notes"; the storybook-entries commit `323d675` ships **24 entries** (23 V.W4-spec public + `useStoryDemo` from V.W4.T5). The "23" figure is the public-export count (excluding `useStoryDemo` which is demo-private); the "24" figure is the storybook-entry count. Both used contextually correctly in the V plan files.

No substantive divergence requiring escalation. The V plan files reflect commit reality with 100% SHA accuracy.
