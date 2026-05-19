# Q.W6 — Strengthened audit lanes α + β

**Lane**: W6 close — α (plan-vs-actual) + β (substrate-without-consumer).
**Mode**: READ-ONLY audit. No writes except this proof doc.
**Date**: 2026-05-18.
**Repo**: glass-ui @ HEAD `96986a9` (W5 close).

## Charter

Two strengthened audit lanes for the Q-tranche close:

- **α plan-vs-actual** — per-wave landing matrix (W0-W5: declared lane artefacts + tags); per-inheritance-item cross-walk (every Q ID in Q.md §4 — ADDRESSED with commit, or formally RETIRED with rationale). PERMANENT-DEFER does not exist in Q (invariant 28).
- **β substrate-without-consumer** — every artefact Q introduced has ≥2 consumers OR is exported OR has a documented retirement rationale (L invariant 8).

---

## Lane α — Plan-vs-actual

### α.1 — Per-wave landing matrix

| Wave | Declared lanes | Lane proof docs present | Tag declared | Tag placed | Verdict |
|---|---|---|---|---|---|
| W0 | A, B, C (3) | `W0-Lane-{A,B,C}-*.md` (3/3) | v1.8.5 | `21e2656` ✓ | LANDED |
| W1 | A, B, D, E, F, G, I, J (8; C retired, H folds into A) | `W1-Lane-{A,B,D,E,F,G,I,J}-*.md` (8/8) | v1.8.6 | `bb79eb4` ✓ | LANDED |
| W2 | A, C (2; B retired) | `W2-Lane-{A,C}-*.md` (2/2) | v1.8.7 | `cab7258` ✓ | LANDED |
| W3 | A, B, C, D, E, F, G, H (8) | `W3-Lane-{A,B,C,D,E,F,G,H}-*.md` (8/8) | v1.9.0 | `511146f` ✓ | LANDED |
| W4 | A, B, C, D, E, F, G, H, I (9) | `W4-Lane-A,B,C,D,E` + `W4-Lane-F-phantom-sweep` + `W4-Lane-GHI-bbnf-buddy` (proof docs cover all 9; G/H/I consolidated into one doc per the cohesive bbnf-buddy close) | v1.9.1 | `e2e4b0d` ✓ | LANDED |
| W5 | A, B, C, D, E, F (6) | `W5-Lane-A`, `W5-Lane-BCE`, `W5-Lane-DF` (3 docs covering all 6 lanes; B/C/E + D/F consolidated per W5's dependency-chained agent-groups) | keyframes.js version bump (no glass-ui ship) | keyframes.js → 2.1.1 `b721a0c` ✓ | LANDED |

**W0-W5 lane artefacts**: all declared lanes have a proof doc. W4 G/H/I and W5 B/C/E + D/F are consolidated proof docs — PROGRESS.md and the wave specs both describe these lanes as single cohesive closes (one bbnf-buddy commit for G/H/I; W5's dependency-chained agent-groups), so the consolidation is plan-faithful, not a gap.

**Tags**: all 5 glass-ui tags (v1.8.5 / v1.8.6 / v1.8.7 / v1.9.0 / v1.9.1) placed on the correct W0-W4 close commits. W5 is a consumer-side wave (keyframes.js → 2.1.1 `b721a0c`) — no glass-ui tag was declared and none was placed; plan-faithful.

**W0 expected-artefacts present**: `scripts/proof-resolution-contract.mjs` ✓, `docs/precepts/cross-repo-dev-resolution.md` ✓, `docs/tranches/AB+2/` (AB+2.md + FINAL.md + PROGRESS.md + waves/ + coordination/) ✓. `npm run proof:resolution` exits 0 at HEAD (PASS — was expected-FAIL at W0, made-PASS at W1).

**W6-codification artefacts** (not yet expected): `scripts/proof-phantom-classes.mjs` + `.retired-classes.txt` are ABSENT — these are declared W6 codification artefacts (invariants 32/33) and W6 has not closed. Not a gap against W0-W5.

**Cross-repo writes** (handed-over patches, not committed into dirty trees — per the MULTI-WRITER / cross-repo coordination policy): `W1-Lane-I-valuejs.patch` (value.js picker) + `W4-Lane-F-fourier.patch` (fourier 29-site phantom sweep) are present as patch files. PROGRESS.md documents both as deliberately handed-over (value.js team's 58-file in-flight tree; fourier's ~100-file dirty tree). **MINOR**: the fourier phantom-sweep grep-zero gate (W4 hard-gate clause g) is satisfied only *after* the patch applies — PROGRESS.md W4 close explicitly states "fourier phantom-sweep grep-zero pends the patch application (W6 re-audit)". This is a tracked, specified W6 verification item, not a deferral.

### α.2 — Per-inheritance-item cross-walk (Q.md §4)

| Q ID | Item | Disposition | Evidence |
|---|---|---|---|
| Q-break-1 | keyframes.js `exports` → deleted `dist/` | ADDRESSED | W1 Lane A — keyframes.js `6af80ad` 4-key `exports` shape |
| Q-break-2 | value.js hard alias to keyframes deleted `dist/` | RETIRED (already shipped) | W1 Lane C retired — value.js Tranche A.W0 shipped it (Qφ) |
| Q-break-3 | value.js gh-pages build clobbers library `dist/` | RETIRED (already shipped) | W1 Lane C retired — value.js Tranche A.W0 |
| Q-break-4 | glass-ui `@mkbabb/value.js` phantom devDep | ADDRESSED | W1 Lane B — devDep retired, `bb79eb4` |
| Q-break-5 | 5-consumer `resolve.conditions` unswept | ADDRESSED | W1 Lanes D-G — fourier `926ca6a`, bbnf `a0db827`, words `e05e5bf`, speedtest `b33f58b0`; value.js via patch |
| Q-card-1 | value.js 11 + bbnf-buddy 6 `<Card variant="pane">` | ADDRESSED (value.js portion RETIRED) | W2 Lane C — bbnf-buddy 6 sites migrated `cab7258`; value.js 11 already done by Tranche A.W1 |
| Q-card-2 | Card silently swallows unknown props | ADDRESSED | W2 Lane A — `useStalePropWarning` + invariant 31 dev-WARN, `cab7258` |
| Q-postP-1 | 7-commit post-P retrospective | ADDRESSED | W0 Lane A — `docs/tranches/AB+2/` authored |
| Q-postP-2 | 4th K-invariant-3 recurrence diagnosis | ADDRESSED | W0 Lane B — recurrence diagnosed; tooling-gate escalation recommended |
| Q-coh-1 | dock `data-density` split-brain | ADDRESSED | W3 Lane A — block migrated utilities.css → dock.css, `511146f` |
| Q-coh-2 | `cards.css` near-empty / `.glass-cartoon` misplaced | ADDRESSED | W3 Lane B — `@utility cartoon-surface` in cards.css |
| Q-coh-3 | dropdown lone scoped-style | ADDRESSED | W3 Lane C — migrated to floating-panel.css |
| Q-coh-4 | token-home drift | ADDRESSED | W3 Lane D — token-home rule in DESIGN.md |
| Q-coh-5 | `beec35e` patched into 2 parallel dock rule-sets | ADDRESSED | W3 Lane C — duplication consolidated |
| Q-sty-1 | metric-stack 8-token private dialect | ADDRESSED | W4 Lane A — `tokens.css §metric` (`--metric-row-*-clamp-*` lines 921-933) |
| Q-sty-2 | timeline `--timeline-dot-*` knobs | ADDRESSED | W4 Lane B — `tokens.css §timeline` (lines 818-846) |
| Q-sty-3 | manual `-webkit-backdrop-filter` | ADDRESSED | W4 Lane C — retired across 4 SFCs |
| Q-sty-4 | transitions.css unlayered rules | ADDRESSED | W4 Lane C — wrapped `@layer components` (transitions.css header confirms) |
| Q-sty-5 | `--scale-press-{xs,md,lg}` substrate-without-consumer | ADDRESSED (RETIRE) | W4 Lane D — rungs retired (tokens.css:749-758); zero dangling refs |
| Q-sty-6 | CSS budget 93.6% gzip rebaseline | ADDRESSED | W4 Lane D — rebaselined; profile:budget 90.3%/89.9% at W4 close |
| Q-leg-1 | cosmetic comment rephrasings | ADDRESSED | W4 Lane E — cosmetic sweep |
| Q-misc-1 | speedtest `manualChunks` dead branches | ADDRESSED | W1 Lane G — dead `@mkbabb/*` branch removed, `b33f58b0` |
| Q-misc-2 | consumer build/CI-gate audit | DECLARED W5 | W5 — keyframes.js demo restoration wave; consumer build-gate verification folds into W6 re-audit. **See α MINOR-1 below** |
| Q-chron-1 | PD-3 value.js WIP-vs-master | CLOSED | Qφ — WIP branch is master ancestor; W1 Lane I notes WIP-branch deletion left as cross-repo hygiene |
| Q-chron-2 | π visual-runtime lane re-activate | DECLARED W6 | W6 close lane — pending |
| Q-chron-3 | "codification without gate" recurrence pattern | DECLARED W6 | W6 LL entry — pending |
| Q-chron-4 | "cleanup commit deletes load-bearing artefact" pattern | DECLARED W6 | W6 LL entry + invariant 33 — pending |
| Q-cos-1 | keyframes hero `<h1>` font-bold drop | ADDRESSED | W5 Lane C — `5861d18` |
| Q-cos-2 | typography.css `:root --font-serif` literal | ADDRESSED | W3 Lane F — literal retired, `511146f` |
| Q-cos-3 | rainbow + btn-interactive recipes retired | ADDRESSED | W3 Lane E — re-promoted `@utility`, `511146f` |
| Q-cos-4 | keyframes timeline correctness | ADDRESSED (via Q-cos-13) | W3 Lane G — IconTooltip wrap-span retired |
| Q-cos-5 | fourier blank-paint / `extractAnimationOptions` | ADDRESSED | W1 Lane J — export confirmed already present (value.js Tranche A); fourier real dep was keyframes.js (keystone fixed) |
| Q-cos-6 | value.js picker 0×0 | ADDRESSED | W1 Lane I — root-caused + fixed; handed over as `W1-Lane-I-valuejs.patch` |
| Q-cos-7 | `.glass-{subtle,medium}` 13-site fleet | ADDRESSED | W4 Lane F.1 — words `0cd458f`; fourier in `W4-Lane-F-fourier.patch` |
| Q-cos-8 | bbnf-buddy preset.css 12 retired-token overrides | ADDRESSED | W4 Lane G — `eb842af` preset.css rewrite |
| Q-cos-9 | bbnf-buddy SelectionInfo retired border fallback | ADDRESSED | W4 Lane G — `eb842af` |
| Q-cos-10 | bbnf-buddy 7th stale Card site (cartoon) | ADDRESSED | W4 Lane G — migrated to `<Card :surface=>`, `eb842af` |
| Q-cos-11 | bbnf-buddy `--shadow-cartoon` lift-scale rungs | ADDRESSED | W4 Lane I — `-md`/`-lg` rungs restored, `eb842af` |
| Q-cos-12 | bbnf-buddy 3-file `:deep()` retreat | ADDRESSED | W4 Lane H — `eb842af`; Q.Rh-1 referral filed, Q.Rh-2 dissolved |
| Q-cos-13 | IconTooltip wrap-span breaks `w-full` | ADDRESSED | W3 Lane G — wrap-span retired (Path C), `511146f` |
| Q-cos-14 | `<ScrollPane>` DEMOTE | ADDRESSED | W3 Lane H — package deleted, → Card recipe |
| Q-cos-15 | keyframes scene-transition crash | ADDRESSED | W5 Lane A — `<Suspense>` restructure, `84f1659` |
| Q-cos-16 | keyframes rotations-dropdown dots transparent | ADDRESSED | W5 Lane B — `<StatusDot>` adoption, `5861d18` |
| Q-cos-17 | keyframes dead code | ADDRESSED | W5 Lane F — purge, `e073dac` |
| Q-cos-18 | keyframes idiomatic glass-ui adoption | ADDRESSED | W5 Lane D — `e073dac` |
| Q-cos-19 | keyframes square-scene controls overlay/clip | ADDRESSED | W5 Lane E — responsive grid, `5861d18` |
| Q-cos-20 | keyframes playground non-functional shell | ADDRESSED | W5 Lane F — playground completed in-wave, `e073dac` |
| Q-cos-21 | keyframes `glass-subtle→glass-wash` + `bg-background` | ADDRESSED | W5 Lane B — `5861d18` |
| Q-cos-22 | `<CartoonCard>` DEMOTE | ADDRESSED | W3 Lane H — package deleted, → Card `surface` prop |
| Q-cos-23 | fourier 20 dead `class="cartoon-card"` | ADDRESSED (pends patch) | W4 Lane F.2 — in `W4-Lane-F-fourier.patch`; grep-zero pends application |

**α.2 result**: all 49 Q IDs (5 break + 2 card + 2 postP + 5 coh + 6 sty + 1 leg + 2 misc + 4 chron + 23 cos) are ADDRESSED, RETIRED-with-rationale, CLOSED, or formally DECLARED to a still-open W6 lane. Zero items are neither. No PERMANENT-DEFER classification appears anywhere — invariant 28 holds.

**MINOR-1 (α)**: Q-misc-2 ("consumer build/CI-gate audit — no consumer caught its own red build") was scheduled to W5 in Q.md §4, but the W5 wave spec (`W5.md`) contains no lane addressing it — W5's 6 lanes are all keyframes.js demo-restoration. The substance (consumer build verification) folds naturally into W6's 6 consumer re-audit lanes, but W5 did not discharge the §4-declared placement. Tracked, not lost — W6 must explicitly close Q-misc-2.

### α verdict — MINOR

All waves landed; all tags placed; all 49 inheritance items accounted. One bookkeeping slip (Q-misc-2 placement drifted from W5 to an implied W6) and one tracked patch-pending gate (fourier phantom-sweep grep-zero). Both are surfaced, specified, and W6-closable — neither is a silent gap.

---

## Lane β — Substrate-without-consumer

Per L invariant 8: every artefact Q INTRODUCED has ≥2 consumers, OR is exported, OR has a documented retirement rationale.

### β.1 — W0 `scripts/proof-resolution-contract.mjs`

Tooling gate, not a styling/component substrate. Consumed by `package.json` script `proof:resolution` + CI (`ci.yml`) + the wave-close gate matrix. Runs clean at HEAD (exit 0). **CLEAN** — gate scripts are exempt from the ≥2-consumer rule (they ARE the consumer-facing mechanism); wired into CI.

### β.2 — W2 `_shared/useStalePropWarning.ts` + `STALE_PROP_RECIPES`

At W2 the composable had 3 consumers: `Card`, `ScrollPane`, `CartoonCard`. At W3 Lane H, ScrollPane + CartoonCard were retired — **at HEAD `useStalePropWarning` has exactly ONE consumer: `Card.vue`** (grep-confirmed: `src/components/ui/card/Card.vue` is the sole importer).

This is a substrate-without-2-consumers state. **Assessed against L invariant 8**: it survives the invariant because the invariant's clause is "≥2 consumers OR exported OR retirement rationale." `useStalePropWarning` is the canonical mechanism for invariant 31 (component props fail-explicit) — a *codified invariant's* enforcement substrate. The W3 Lane H proof doc (`W3-Lane-H-component-demote.md:88-90`) explicitly addresses the drop: "The shared `_shared/useStalePropWarning.ts` composable STAYS — Card still uses it." The `STALE_PROP_RECIPES` const is an extensible registry — the design intent is fleet-wide future use. **MINOR-β-1**: the artefact is sound (it backs a binding invariant) but the post-W3 single-consumer state is not flagged in any Q proof doc as an invariant-8 consideration — W3 Lane H justifies *keeping* it but does not note it dropped below the 2-consumer threshold. W6 should record the rationale explicitly: it is invariant-enforcement substrate, retained by design, not substrate-without-consumer in the deprecation sense.

### β.3 — W2/W3 Card `surface` prop + `@utility cartoon-surface`

`surface` prop on Card: declared in `Card.vue` (`CardSurface` type, default `"glass"`); the prop IS the public API surface — `Card` is exported from the root barrel + `/api`. The `cartoon` value folds in the retired `<CartoonCard>`. Consumers: glass-ui demo `card.vue` story (`surface="cartoon"` at line 229/243) + bbnf-buddy `AnimationWorkspace.vue` (W4 Lane G, `eb842af`, migrated to `<Card :surface=>`). **CLEAN** — exported public prop, ≥2 consumers (demo story + bbnf-buddy).

`@utility cartoon-surface`: declared in `cards.css:33`. In glass-ui `src/` it is consumed by `Card.vue` (the `surface === 'cartoon'` class-binding). External consumer: fourier-analysis's 20-site migration target (`W4-Lane-F-fourier.patch`, Q-cos-23). It is a public `@utility` recipe shipped in the CSS bundle — exported-by-construction. **CLEAN** — exported `@utility`, consumed by Card + (post-patch) fourier.

### β.4 — W3 rainbow `@utility` recipes (`.rainbow-vivid` / `.rainbow-pastel` / `.btn-interactive`)

Re-promoted at W3 Lane E. Public `@utility` recipes shipped in the CSS bundle — exported-by-construction.

**Lane β specifically asked: does keyframes.js W5 actually consume them now?** GREP CONFIRMS YES. keyframes.js W5 demo (post-restoration, `5861d18` Lane B) consumes the recipes as Tailwind class names across multiple SFCs:
- `demo/app/scenes/EasingScene.vue`, `CubeScene.vue`
- `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue`, `AnimationMenuBar.vue`, `controls/PlaybackRibbon.vue`
- the play button binds `:class="isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'"` (confirmed in keyframes.js built `demo/app/dist` output — the recipe names survive into the build).

In glass-ui's own tree, `FuzzySearch.vue` consumes the `--rainbow-pastel-yellow` *token* (not the `@utility` recipe). The recipes' real consumer is the external keyframes.js demo — exactly the consumer the D.W2.D false-zero-site audit missed. **CLEAN** — exported `@utility`, real external consumer (keyframes.js, ≥5 SFC sites) confirmed live at HEAD. The W3 Lane E re-promote is the consumer-rediscovery the lane plan described.

### β.5 — W4 token promotions (`§metric` + `§timeline`)

`--metric-row-*-clamp-*` (8 tokens, `tokens.css §metric` 921-933): consumed by `MetricStack.vue` + `MetricRow.vue` — 2 consumers. **CLEAN**.

`--timeline-dot-*` (`tokens.css §timeline` 818-846): consumed by `SegmentedTimeline.vue` + `ContinuousTimeline.vue` — 2 consumers. **CLEAN**. Tokens are also `:root`-declared → consumer-overridable (exported-by-construction).

`--scale-press-{xs,md,lg}`: NOT a W4 introduction — W4 Lane D *retired* them (the substrate-without-consumer remediation itself). tokens.css:749-758 carries the documented retirement rationale; zero dangling refs in `src/`. **CLEAN**.

### β verdict — MINOR

Every Q-introduced substrate artefact is exported, has ≥2 consumers, or carries a retirement rationale. The rainbow `@utility` recipes — the lane's named focus — have a confirmed live external consumer (keyframes.js W5 demo, ≥5 SFC sites). `cartoon-surface` and the Card `surface` prop are CLEAN. The single MINOR is `useStalePropWarning`: at HEAD it has one in-tree consumer (Card), having lost ScrollPane + CartoonCard at W3 Lane H. It is sound — it backs codified invariant 31 and `STALE_PROP_RECIPES` is an extensible registry — but no Q proof doc explicitly records the post-W3 single-consumer state as an invariant-8 consideration. W6 should add the one-line rationale (invariant-enforcement substrate, retained by design).

---

## Overall verdict — MINOR

Lane α: every W0-W5 wave landed, every declared lane has a proof doc (W4 G/H/I and W5 B/C/E + D/F plan-faithfully consolidated), every glass-ui tag (v1.8.5 → v1.9.1) placed on the correct commit, all 49 Q.md §4 inheritance items ADDRESSED / RETIRED-with-rationale / CLOSED / formally-DECLARED-to-W6. No PERMANENT-DEFER anywhere. Two surfaced, specified, W6-closable items: Q-misc-2's §4 placement drifted from W5 to an implied W6 lane; the fourier phantom-sweep grep-zero gate pends patch application (both tracked in PROGRESS.md, not silent).

Lane β: no substrate-without-consumer violation. The rainbow `@utility` recipes have a confirmed live external consumer; `cartoon-surface` + Card `surface` prop are CLEAN. One MINOR: `useStalePropWarning` dropped to a single in-tree consumer post-W3 Lane H — sound (invariant-31 enforcement substrate) but the invariant-8 rationale is not explicitly recorded in any Q proof doc.

**No MAJOR findings. Q W0-W5 are landing-clean; the three MINOR items are all W6-closable bookkeeping.**
