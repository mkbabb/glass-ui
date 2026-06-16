# BB.W-SCROLL-FADE-RETIRE — the static `.scroll-fade-*` utilities + `--mask-fade-width` token retired clean-break, the doc-vs-reality green-wash corrected

**Name**: W-SCROLL-FADE-RETIRE - the dead scroll-fade utilities drained, the false-retire docs reconciled
**Opens after**: Batch 0 landed (W-CI-GREEN green floor). Runs ‖ W-SURFACE-AXIS-COMPLETE ‖ W-DEAD-SWEEP ‖ W-DOCK-RAIL-SEAT-FINAL (Batch 2 — component/CSS-bound-disjoint per EXECUTION-DAG §5).
**Agents**: 1 (a single CSS+doc+gate arm — the bounds are a 4-rule CSS block, one token, four docs, one gate; no intra-wave parallelism warranted).
**Hard gate**: `proof:fading-scroll` extended — the W6 retirement witness flips from "the C2/C3 allowlist holds" to "the static utility DEFINITIONS + the `--mask-fade-width` token are ABSENT from source AND from the built `dist`", born-RED at HEAD (the 4 rules + the token still ship), GREEN at close. No π re-shoot needed (zero paint change — nothing CONSUMED these rules; the deletion removes dead bytes).
**Status**: SPEC

## Goal criterion

The static `.scroll-fade-mask` / `.scroll-fade-top` / `.scroll-fade-bottom` / `.scroll-fade-y` utilities AND the `--mask-fade-width` token are DELETED from source and gone from the shipped `dist/styles` — the clean-break retirement the W-FADING-SCROLL scope-7 declared but the orchestrator never landed. Every remaining consumer was already migrated to `<FadingScroll>`/`useFadingScroll` at BA (confirmed at HEAD — see §0); this wave executes the deletion that was deferred to a "Batch-2-close orchestrator commit" that never ran. The four documents that claim or present the retirement as DONE (MIGRATION.md's was/now table, CLAUDE.md's "the retired `--mask-fade-width`", style-audit.md's live-token listing, the BA DELTA + FINAL.md "clean break" claim) are reconciled to the TRUE state — retire-LANDED-here, not retire-already-done-at-BA. The `proof:fading-scroll` W6 witness is upgraded from a consumer-survivor grep (which currently passes only because base.css is excluded) to a DEFINITION-ABSENT + token-absent + dist-absent assert, so the dead code cannot silently re-ship.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the BB seed's named doc-vs-reality green-wash (BB.md:18 — "dead code shipped that 4 docs claim was retired (the static `.scroll-fade-*` + `--mask-fade-width`)") — not a blind re-diagnose. The deferral lineage is explicit and load-bearing: W-FADING-SCROLL scope-7 (`BA.W-FADING-SCROLL.md:138-146`) declared the static-utility retirement "COORDINATED, not landed here … a final clean-break commit owned by the ORCHESTRATOR at Batch 2 close — AFTER W-CONFIG-CHASSIS has migrated [C2/C3]"; W-CLOSE C8 (`BA.W-CLOSE.md:76`) re-named it as a landed clean break; the orchestrator commit was never executed. The result: the dead code ships at 4.0.0 while four docs present it as retired.

Before touching a byte, the impl agent re-greps the anchors below at HEAD and confirms (a) the 4 utility rules + the token still exist, (b) NO live consumer references them, (c) the `--mask-fade-width` token is consumed ONLY by the 4 dead rules (dead-together — deleting the rules orphans the token). If any cite has DRIFTED (a sibling Batch-2 wave moved a line, a consumer regressed), the agent records the drift in PROGRESS and re-locates before proceeding — it does NOT re-invent the census. HEAD-verified this authoring:

- the 4 utility rules live at `src/styles/utilities/base.css:326-340` (`.scroll-fade-mask`/`.scroll-fade-top`/`.scroll-fade-bottom`/`.scroll-fade-y`, each a `mask-image: linear-gradient(…, var(--mask-fade-width), …)`), inside `@layer components` (so they ship UNCONDITIONALLY into `/styles`).
- the token lives at `src/styles/tokens/offsets-sizing.css:26` (`--mask-fade-width: 1rem;`), with a `:14-24` comment block stating it is "RETIRE-COORDINATED: it survives this wave … it retires in a CLEAN BREAK (no alias) at the orchestrator's Batch-2-close commit".
- the dead code SHIPS: `dist/styles/utilities/base.css:326-339` carries the 4 rules; `dist/styles/tokens/offsets-sizing.css:26` carries the token (confirmed against the built tree at HEAD).
- NO live class consumer: `grep -rn 'scroll-fade-mask\|scroll-fade-top\|scroll-fade-bottom\|scroll-fade-y' src demo` in a `class=`/`:class=`/`cn()` position returns ZERO. The only in-tree hits are (1) the DEFINITIONS in base.css, (2) prose comments in `offsets-sizing.css`, `Configurator.vue` (lines 185-188/235-236/280 — describing what it migrated OFF of), `DockRail.vue`, `FadingScroll.vue`, `CardHeader.vue` (all comments), and (3) the gate/proof scripts. Every functional consumer (C1 blob, C4 aurora dock, C5 SegmentedTabs, C6 PresetPickerRow, C2/C3 Configurator) already renders `<FadingScroll>` — confirmed at HEAD.
- the `--mask-fade-width` token is consumed ONLY by the 4 dead rules: `grep -rn 'var(--mask-fade-width)' src` returns exactly `base.css:327/331/335/339` and nothing else (dead-together — the deletion is atomic).
- `proof:fading-scroll` currently passes 9/9 — but W6 (`proof-fading-scroll.mjs:176-206`) only asserts NO unexpected CONSUMER survives; it EXCLUDES `src/styles/utilities/base.css` (`:191`, "the retiring utility DEFINITIONS … survive this wave") and `offsets-sizing.css` (`:193`) and carries the `C2_C3_ALLOWLIST` (`:78`). So the gate is blind to the surviving definitions + the token by design — the deferral's escape hatch.

```bash
# the dead utilities + the token (must still exist at HEAD → born-RED target)
sed -n '318,341p' src/styles/utilities/base.css                          # the 4 .scroll-fade-* rules in @layer components
sed -n '14,33p'   src/styles/tokens/offsets-sizing.css                   # the --mask-fade-width token + its retire-coordinated comment

# the dead code SHIPS in dist (the "still shipping" claim)
grep -n 'scroll-fade-mask\|scroll-fade-top\|scroll-fade-bottom\|scroll-fade-y' dist/styles/utilities/base.css
grep -n 'mask-fade-width' dist/styles/tokens/offsets-sizing.css

# NO live class consumer survives (the migration already happened at BA)
grep -rn 'scroll-fade-mask\|scroll-fade-top\|scroll-fade-bottom\|scroll-fade-y' src demo | grep -iv 'retire\|supersede\|the static\|scroll-blind\|defect\|primitive\|port\|pattern\|renamed\|disambig\|note\|off the\|migrated'
# the token is dead-together — only the 4 dead rules consume it
grep -rn 'var(--mask-fade-width)' src

# the 4 false-retire docs
sed -n '1171,1188p' MIGRATION.md                                          # the was/now table presented as done
grep -n 'scroll-fade\|mask-fade-width\|retired' CLAUDE.md                  # :101, :463, :465 — "the retired --mask-fade-width"
grep -n 'mask-fade-width\|scroll-fade' docs/audits/style-audit.md          # :50, :57 — still listed as live canonical
grep -n 'scroll-fade\|mask-fade-width\|retire' docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md docs/tranches/BA/FINAL.md

# the gate's W6 retirement witness (the upgrade target)
sed -n '176,206p' scripts/proof-fading-scroll.mjs                          # W6 + the C2_C3_ALLOWLIST + the base.css/offsets exclusions
```

## The defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | the 4 dead utility rules ship | `src/styles/utilities/base.css:326-340`; `dist/styles/utilities/base.css:326-339` | `.scroll-fade-mask`/`.scroll-fade-top`/`.scroll-fade-bottom`/`.scroll-fade-y` in `@layer components` — emitted unconditionally into `/styles`; ZERO live consumers (every consumer migrated to `<FadingScroll>` at BA) — pure dead bytes |
| 2 | the orphan token ships | `src/styles/tokens/offsets-sizing.css:26`; `dist/styles/tokens/offsets-sizing.css:26` | `--mask-fade-width: 1rem` — consumed ONLY by the 4 dead rules (dead-together); the `:14-24` comment ADMITS the deferral ("retires … at the orchestrator's Batch-2-close commit") that never ran |
| 3 | MIGRATION.md presents the retire as done | `MIGRATION.md:1171-1187` | a full was/now table ("`.scroll-fade-mask` → `<FadingScroll>`", "`--mask-fade-width` → `--fade-scroll-width`") presented as a landed CLEAN BREAK while the source still ships both — the consumer-facing green-wash |
| 4 | CLAUDE.md calls the token "retired" | `CLAUDE.md:101, 463, 465` | ":465 — `SUPERSEDES the retired --mask-fade-width (clean break, no alias)`" + ":101 `superseding the static .scroll-fade-* masks`" — the BINDING doc claims a retirement that has not occurred |
| 5 | style-audit.md lists them as live canonical | `docs/audits/style-audit.md:50, 57` | `--mask-fade-width` under the live Sizing-token table + `.scroll-fade-{y,top,bottom,mask}` under the canonical-utility list — accurate-as-of-today but must flip to a retired note at close (the audit's drift surface) |
| 6 | the BA DELTA + FINAL claim the clean break landed | `docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md:55,66`; `docs/tranches/BA/FINAL.md:187` | the DELTA says "retire-coordinated to the orchestrator's Batch-close commit" + FINAL lists "the static scroll-fade retirement" among the BA clean breaks — the close-class over-claim BB exists to correct (a forward-coordinated step recorded as completed) |
| 7 | the gate is blind to the surviving definitions | `scripts/proof-fading-scroll.mjs:78,191,193,197-206` | W6 excludes `base.css` (`:191`) + `offsets-sizing.css` (`:193`) and carries the `C2_C3_ALLOWLIST` (`:78`) — so 9/9 GREEN while the dead code ships; the gate's own escape hatch for the deferral |

## Scope

The retirement is a **clean break — NO alias** (BB house rule / MEMORY no-backwards-compat). The candidate directions, gestalt-not-workaround:

1. **Delete the 4 utility rules at the root.** Remove the `.scroll-fade-mask`/`.scroll-fade-top`/`.scroll-fade-bottom`/`.scroll-fade-y` block (`base.css:318-340`, including the `/* ── Scroll fade masks ── */` section header comment) entirely. The `<FadingScroll>` `@layer components` block + the `@supports (animation-timeline: scroll())` recipe that follow (`base.css:342+`) are the live primitive — UNTOUCHED. The base.css header-comment manifest (`:2`) drops the "scroll-fade masks" item from its inventory line. This changes ZERO paint: the rules had no consumer, so nothing un-styles.

2. **Delete the orphan token.** Remove `--mask-fade-width: 1rem;` (`offsets-sizing.css:26`) and rewrite the `:14-24` retire-coordinated comment block: drop the `--mask-fade-width` retire-coordination prose (the coordination is now DONE), keeping only the live `--fade-scroll-width` documentation. Confirm the dead-together invariant first (`grep var(--mask-fade-width)` returns only the 4 rules being deleted) so the deletion cannot strand a live consumer.

3. **Correct the four false-retire docs to the TRUE state.** This is the green-wash fix — the docs must say retire-LANDED-AT-BB, not retire-already-done-at-BA:
   - **MIGRATION.md:1171-1187** — the was/now table is CORRECT prose for a consumer migrating; re-anchor it to the BB cut. The migration rows STAY (an external consumer still on a pre-4.1.0 `.scroll-fade-*` class needs the map); flip the "retire in a coordinated orchestrator commit once every consumer migrates" line (`:1180`) to the past tense ("retired at the 4.1.0 cut — BB.W-SCROLL-FADE-RETIRE"). The clean-break framing is preserved; only the tense/wave-attribution corrects.
   - **CLAUDE.md:101, 463, 465** — "the retired `--mask-fade-width`" was a FALSE-PRESENT claim at BA (it had NOT retired); at BB-close it becomes TRUE. Re-anchor the wave attribution to `BB.W-SCROLL-FADE-RETIRE` on the retirement clause (`:465` "retires the static `.scroll-fade-*` utilities + `--mask-fade-width` (clean break) — BB.W-SCROLL-FADE-RETIRE") and confirm `:101`/`:463` read as superseded-and-deleted, not superseded-but-still-shipping.
   - **docs/audits/style-audit.md:50, 57** — strike `--mask-fade-width` from the live Sizing-token table (`:50`) and `.scroll-fade-{y,top,bottom,mask}` from the canonical-utility list (`:57`), OR annotate each with a "(RETIRED BB.W-SCROLL-FADE-RETIRE → `<FadingScroll>`)" note. The audit reflects the live token set; once retired, the listing is stale.
   - **docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md:55,66 + BA/FINAL.md:187** — these are BA-tranche archival docs; the honest correction is a one-line forward-note appended at the existing claim sites ("the static-utility + token retirement was DEFERRED past the BA close and landed at BB.W-SCROLL-FADE-RETIRE — the BA close over-claimed it as a landed clean break, the BB integrity-floor correction"), NOT a rewrite of the BA history. The BA over-claim is recorded as a correction, not erased.

4. **Upgrade the `proof:fading-scroll` W6 witness from consumer-survivor to DEFINITION-ABSENT.** Currently W6 (`proof-fading-scroll.mjs:176-206`) asserts no unexpected CONSUMER survives — and passes only because base.css/offsets-sizing.css are EXCLUDED from the grep (`:191,193`) and the `C2_C3_ALLOWLIST` (`:78`) is carried. The upgrade:
   - drop the base.css + offsets-sizing.css exclusions and the `C2_C3_ALLOWLIST`;
   - assert the 4 utility-rule DEFINITIONS are ABSENT from the concatenated `utilities` monolith (`readMonolith(ROOT, "utilities")` no longer matches `.scroll-fade-mask`/`-top`/`-bottom`/`-y`);
   - assert the `--mask-fade-width` token is ABSENT from `offsets-sizing.css` (no `--mask-fade-width:` declaration);
   - assert the dead code is gone from the BUILT `dist` (the producer-side mirror, the W-EMISSION precedent — `grep` the built `dist/styles/utilities/base.css` + `dist/styles/tokens/offsets-sizing.css` for the rule/token, expect ZERO);
   - keep the consumer-survivor scan as a SECOND clause (no `.scroll-fade-*` class re-appears in any `src`/`demo` template).
   The bite: a future agent re-introducing a `.scroll-fade-*` utility OR re-minting `--mask-fade-width` OR re-shipping either in `dist` REDs W6.

## The born-RED gate clause

`proof:fading-scroll` W6 (extended) — born-RED at HEAD (the 4 rules + the token + the dist artefacts all EXIST), driven GREEN by the wave. The falsifiable witnesses (each red at HEAD pre-wave):

1. **W6a — the utility DEFINITIONS are absent (source).** `readMonolith(ROOT, "utilities")` matches NONE of `\.scroll-fade-mask\b`, `\.scroll-fade-top\b`, `\.scroll-fade-bottom\b`, `\.scroll-fade-y\b` (a rule definition, not a prose comment — the comment-strip is already applied). RED at HEAD: all four match at `base.css:326-340`. Assert shape: `facts.scrollFadeDefinitions === []` (the matched-rule list is empty).
2. **W6b — the token is absent (source).** `offsets-sizing.css` carries NO `--mask-fade-width:` declaration (the comment-strip means a prose mention does not count). RED at HEAD: `:26` declares `--mask-fade-width: 1rem`. Assert shape: `facts.maskFadeWidthToken === false`.
3. **W6c — the dead code is gone from `dist` (the producer-side mirror, the W-EMISSION bar).** A `grep` over the BUILT `dist/styles/utilities/base.css` + `dist/styles/tokens/offsets-sizing.css` for the 4 rule selectors + the token declaration returns ZERO. RED at HEAD: the dist ships both. Assert shape: `facts.distScrollFadeShipped === false`. (This is the binding "still shipping" floor — a source delete that does not re-build/re-ship would leave the dist dirty; the gate reads the producer artefact, so the close requires a fresh build. NOTE: this clause runs only when `dist/` exists; in a dist-absent CI checkout it records `skipped` with the source clauses W6a/W6b carrying the assertion — the same producer-vs-source gating `proof:emission` uses.)
4. **W6d — no consumer re-appears (the regression guard).** The original W6 consumer-survivor scan, NARROWED: every `src`/`demo` template carries NO `.scroll-fade-*` class (the `C2_C3_ALLOWLIST` is REMOVED — Configurator already migrated, so its allowlist entry is dead). RED-equivalent: vacuously green at HEAD (no live consumer), so W6d is the REGRESSION guard — it reds if a future strip smuggles the static class back.

**The self-test bite (anti-evasion).** The gate's self-test (the `proof-glass-cohesion.mjs` / `proof-dock-rail-hairline.mjs` house pattern) demonstrates the distinguishing bite: a synthetic fixture re-adding `.scroll-fade-mask { mask-image: … }` to the utilities source REDs W6a; re-declaring `--mask-fade-width: 1rem` REDs W6b; a stale `dist` carrying either REDs W6c. The "drain by aliasing" evasion (renaming `--mask-fade-width` to a survivor alias) fails W6b's no-alias clause (the token name is gone, not re-pointed). The "delete-source-but-ship-dirty-dist" evasion fails W6c.

**No π re-shoot.** This is a STRUCTURAL/DEAD-CODE wave — it changes ZERO paint by construction (the deleted rules had no consumer, so nothing un-styles; the deleted token is dead-together). There is NO `proof:ba-gestalt` requirement (BA invariant 4 binds VISUAL waves; this wave's binding truth is the DEFINITION-ABSENT + dist-absent assert + the live `proof:fading-scroll` 10/10 GREEN, NOT a capture). The dead-code-removal is its own no-visual-change proof — but the wave records a one-line DELTA note (`W-SCROLL-FADE-RETIRE-DELTA.md`) citing (a) the born-RED `proof:fading-scroll` log (the 4 rules + token present, W6 passing only via the exclusions), (b) the GREEN-at-close log (W6a-d), (c) the `grep dist` before/after (the dead bytes gone), and (d) the dead-together confirmation (`var(--mask-fade-width)` consumed only by the deleted rules). The `proof:fading-scroll` π arm (`tests-visual/fading-scroll.spec.ts`) is UNTOUCHED and stays GREEN — the live `<FadingScroll>` primitive is unchanged.

## File Bounds

| File | Access |
|---|---|
| `src/styles/utilities/base.css` | modify-carve (delete the `.scroll-fade-*` block `:318-340` incl. the section header; drop the "scroll-fade masks" item from the `:2` manifest line; the `<FadingScroll>` block + `@supports` recipe UNTOUCHED) |
| `src/styles/tokens/offsets-sizing.css` | modify-carve (delete `--mask-fade-width: 1rem` `:26`; rewrite the `:14-24` comment to drop the retire-coordination prose, keep the live `--fade-scroll-width` doc) |
| `scripts/proof-fading-scroll.mjs` | modify (upgrade W6 to DEFINITION-ABSENT + token-absent + dist-absent + consumer-regression; remove the base.css/offsets exclusions + the `C2_C3_ALLOWLIST`) |
| `MIGRATION.md` | modify (re-anchor the `:1171-1187` was/now table to the 4.1.0 BB cut; flip `:1180` to past tense + BB.W-SCROLL-FADE-RETIRE attribution) |
| `CLAUDE.md` | modify (`:101, 463, 465` — re-anchor the retirement attribution to BB.W-SCROLL-FADE-RETIRE; confirm the "retired" language is now TRUE) |
| `docs/audits/style-audit.md` | modify (`:50, 57` — strike/annotate `--mask-fade-width` + `.scroll-fade-{y,top,bottom,mask}` as RETIRED) |
| `docs/tranches/BA/audit/visual/W-FADING-SCROLL-DELTA.md` | modify (append the one-line BB-correction forward-note at `:55,66`) |
| `docs/tranches/BA/FINAL.md` | modify (append the one-line BB-correction forward-note at `:187`) |
| `docs/tranches/BB/audit/visual/W-SCROLL-FADE-RETIRE-DELTA.md` | create (the dead-code-removal evidence: born-RED→GREEN logs + dist before/after + dead-together confirmation) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row) |

Read-IF (cohesion-read, NOT edited): `src/components/custom/fading-scroll/{FadingScroll.vue,composables/useFadingScroll.ts,constants.ts}` (the live primitive — confirm it does NOT read `--mask-fade-width` before deleting the token); `src/components/custom/configurator/Configurator.vue` + `demo/stories/aurora/{AuroraConfigDock,PresetPickerRow}.vue` + `demo/stories/substrates/blob.vue` (the migrated consumers — confirm the migration held, the comments are prose-only, no live class).

Do NOT touch:

- **The live `<FadingScroll>` primitive + the `@supports (animation-timeline: scroll())` recipe + the `--fade-scroll-width` token** — UNTOUCHED. This wave deletes the DEAD predecessor, never the live successor. The `@property --fade-start`/`--fade-end` customs, the `gl-fade-start-in`/`gl-fade-end-out` keyframes, `useFadingScroll`, the subpath/barrel — all out of bounds.
- **W-DEAD-SWEEP's bound** (the ~32 OTHER dead CSS tokens — motion-badge family, timeline-segment-gradient, glass aliases, corner-k-soft/sharp; the 3 AW orphan gate scripts; the 24 registered-but-unmanifested gates). This wave retires EXACTLY the `.scroll-fade-*` + `--mask-fade-width` pair; W-DEAD-SWEEP owns the rest of the dead-token sweep. Coordination: both touch token files, but disjoint tokens — this wave deletes only `--mask-fade-width` in `offsets-sizing.css`; W-DEAD-SWEEP touches its own named set. If a sweep collision surfaces (both editing the same line region), it is a scope-reveal → triumvirate, not a unilateral widen.
- **W-SURFACE-AXIS-COMPLETE's bound** (Toast/Button surface axis) + **W-DOCK-RAIL-SEAT-FINAL's bound** (the dock-rail facet carousel) — component-family-disjoint by construction.
- **The standing fences** — the GL shader internals (aurora.frag/metaball.frag — not named, not touched); ppmycota purple (no token edit — `--mask-fade-width` is a structural length, not a color); the slides `docs/tranches/M/` + `docs/tranches/N/` docs (foreign; their `--mask-fade-width` mentions are slides-session archives, not glass-ui source).

## Dependencies

- **Depends on**: W-CI-GREEN (Batch 0, landed) — the master-CI floor must be green so this wave's `proof:fading-scroll` extension runs under a trustworthy harness. Structurally, nothing else: the migration this retirement was waiting on (C2/C3 Configurator) ALREADY landed at BA — this wave executes the deferred deletion, no migration work remains.
- **Blocks**: nothing hard. It pays down the dead-code debt the BB close (W-CLOSE) would otherwise flush, and removes one of the BB.md headline integrity items (the "4 docs falsely claim retired" green-wash). The W6 upgrade also strengthens the gate so the 4.1.0 cut cannot silently re-ship the dead bytes.

## Triumvirate Dispatch

- **The dead-together invariant fails** — if the RE-GROUND grep (`var(--mask-fade-width)`) finds a LIVE consumer beyond the 4 dead rules (a sibling Batch-2 wave or a regression re-introduced a real consumer), deleting the token would strand it. That is a scope-reveal: halt, record the live consumer in PROGRESS, triumvirate (research whether the consumer should migrate to `<FadingScroll>` or whether the token retirement waits) — do NOT delete a token with a live reader.
- **The dist-absent W6c ambiguity** — if `proof:fading-scroll` W6c cannot resolve a stable verdict because the `dist/` tree is inconsistent across the CI-vs-local checkout (the producer-side artefact present locally, absent in a clean CI run), follow the `proof:emission` precedent: W6c records `skipped` when `dist/` is absent and the source clauses W6a/W6b carry the close assertion. If three iterations cannot make the producer-vs-source gating deterministic, halt and triumvirate (the `dist`-freshness gating is the suspect, exactly as on `proof:emission`).
- **A doc-correction reveals a SECOND false-retire claim** — if reconciling the four named docs surfaces a FIFTH document presenting the retirement as done (an audit, a precept, a tranche FINAL), that is in-scope (the green-wash correction is the wave's charge) — append the correction note and record the extra doc in PROGRESS. If it surfaces a STRUCTURAL claim (a gate or build artefact that ASSUMES the utilities exist), that is a scope-reveal → triumvirate.

## Named successors

None foreseen — the retirement is a complete clean-break discharge (the 4 rules + the token deleted, the dist drained, the 4 docs corrected, the gate upgraded to forbid re-introduction). The ONE conditional: if the W6c dist-absent gating cannot be made deterministic (the Triumvirate Dispatch register-design case), the recorded outcome is W6c as a producer-gated `skipped`-when-dist-absent clause WITH the source clauses (W6a/W6b) as the binding close assertion — recorded in BB PROGRESS + the DELTA, NOT a silent re-book. The recommendation and expected outcome is the full clean-break retirement with W6a-d all GREEN at the 4.1.0 cut.

## Format And Lint Cadence

`npm run build` to re-emit `/styles` (the dist must drop the dead bytes for W6c) and capture the dist before/after grep; `node scripts/proof-fading-scroll.mjs` born-RED before the source edits (proof it passes-only-via-exclusions at HEAD, then proof the upgraded W6 reds with the rules present), GREEN at close (W6a-d); `npm run proof:gate-script-parity` after the gate edit (the registry must stay sound); `git diff --check` before close. No `npm run typecheck` delta (CSS + docs + a gate script — zero TS surface); no π re-shoot (zero paint change).

## Commit Plan

- impl commit: `refactor(styles)!: retire the static .scroll-fade-* utilities + --mask-fade-width onto <FadingScroll>/--fade-scroll-width (BB.W-SCROLL-FADE-RETIRE)` — body names the 4 deleted rules + the dead-together token + the dead-bytes-gone-from-dist, the clean break (no alias), the deferred-from-BA lineage.
- gate commit: `test(gate): proof:fading-scroll W6 → DEFINITION-ABSENT + token-absent + dist-absent (BB.W-SCROLL-FADE-RETIRE)` — body cites the upgrade from consumer-survivor to producer-side absence + the removed C2/C3 allowlist + the self-test bite.
- doc/status commit: the four false-retire-doc corrections (MIGRATION/CLAUDE/style-audit + the BA-DELTA/FINAL forward-notes) + the `W-SCROLL-FADE-RETIRE-DELTA.md` + the BB PROGRESS row.

## Archaeology

Prior attempt: W-FADING-SCROLL scope-7 (`BA.W-FADING-SCROLL.md:138-146`) explicitly DEFERRED the static-utility retirement to "a final clean-break commit owned by the ORCHESTRATOR at Batch 2 close — AFTER W-CONFIG-CHASSIS has migrated [C2/C3]". W-CONFIG-CHASSIS migrated C2/C3 (confirmed — `Configurator.vue` renders `<FadingScroll>` at HEAD), but the orchestrator's Batch-2-close retire commit was never executed — yet W-CLOSE C8 (`BA.W-CLOSE.md:76`) and FINAL §187 recorded "the static scroll-fade retirement" as a LANDED clean break, and MIGRATION.md + CLAUDE.md were written as if it had occurred. The result is the BB.md:18 headline: dead code shipping while 4 docs claim retired — the exact close-class over-claim (a forward-coordinated step recorded as completed) that BB's integrity spine exists to fix. The new guardrail: this wave's close state is the gate's OWN producer-side assertion (W6c — the dead bytes ABSENT from `dist`, the W-EMISSION precedent), so the retirement cannot be claimed-but-not-landed again — the dead bytes are gone from the shipped artefact or the gate reds.
