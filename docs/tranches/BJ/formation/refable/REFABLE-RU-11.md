# REFABLE RU-11 — PERF-COLOCATION verdict sidecar

**Model (verbatim from system context):** claude-fable-5. **Unit:** RU-11. **Date:** 2026-07-17.
**Target artifact:** `docs/tranches/BJ/formation/perfection/FABLE-COLOCATION.md` (amendments 1–12
ADOPTED-BINDING; unioned in place, amendments 13–14 NEW).
**Protocol:** ANEW (primary sources only — full src/ + demo/ + tests/ trees, import-closure greps,
git log, package.json, subpath-policy.mjs, styles cascade) → SCRUTINY (every opus claim guilty
until re-proven) → UNION (fresh evidence authoritative; RATIFIED content kept verbatim).
**Boundary moment:** the ANEW target tree + move set was closed and stated in-session BEFORE the
opus artifact was opened; recorded at the transition message.

## ANEW summary (independent derivation, pre-read)

Derived move set: useDockCtaReceive → dock/composables; glass/wave/ → liquid-grid (sole consumer,
unexported); glass/textureUpload.ts → aurora; glass loose-leaf backdrop/+specular/ carve
(optional); manifest/lazy.ts fold. Verified non-moves: all `_shared` leaves ≥2 component
consumers; sidebar/reactive as public subpaths; per-substrate `uniformBridgeWGPU`/`wgpuSetup`
twins are component-specific packing, not shared code; `surfaces-pager.css` 2 consumers;
demo/examples ×3 and demo/composables/virtual ×2 story consumers. Convergence with the opus
artifact was high; divergences adjudicated below.

## Verdicts

| # | Claim (artifact anchor) | Verdict | Evidence |
|---|---|---|---|
| V1 | liquid-grid DELETE ruling → wave/ DELETE not fold (§0.1, Amendment 1/2) | RATIFIED | ADJUDICATION-1.md ruling 1 verbatim; wave importers = exactly 3 liquid-grid files |
| V2 | ./sidebar drop rides 8.0.0 (§0.2, Amendment 8) | RATIFIED | ADJUDICATION-1.md ruling 3 verbatim |
| V3 | `_shared/index.ts` re-exports only `controlSizeClass` (Amendment 6 premise) | RATIFIED | file is 2 lines, control-size only |
| V4 | exactly 5 dead barrels, 4 at this band's hand (Amendment 10) | RATIFIED | exhaustive index.ts sweep: composables/, glass/webgpu/, glass/wave/, sortable-list/composables/, typewriter/composables/ at ext=0 intra=0; all other barrels live |
| V5 | glass-chip.css + glass-atom.css outside the @import closure (P1) | RATIFIED | glass.css imports exactly 18 glass/* partials, neither present; only textual hit is the dock shape.css:170 comment; a11y-fallback.css IS closed via accessibility.css:3 |
| V6 | accent-tone.css chip-private + glass.css:63 rung between grain-overlay:58/rim:64 (Amendment 3) | RATIFIED | sole consumer chip/chipVariants.ts; line numbers exact |
| V7 | textureUpload aurora-only, 3 imports (row 1a) | RATIFIED | auroraImageSource, wgpuSetup, constants/presets |
| V8 | sidebar demotion: 9 files, useSidebarState dead, 3 demo import sites, 4-test tail + public-surface.spec.ts:34,:250-255, package.json :262-264/:40-41, COMPOSABLE_CLASS.sidebar + CURATED.sidebar (row 2, Amendment 9) | RATIFIED | every line number and file name re-proven exact |
| V9 | dockContext 5-consumer cross-family + dock⇄dropdown-menu 2-cycle at DockTrigger.vue:11 (Amendment 12, §6) | RATIFIED | external families dropdown-menu/popover/select/slider + dock; import line exact |
| V10 | subpath pins: axes/canvas/fourier-math/sidebar (§1 P5) | RATIFIED | subpath-policy.mjs :134,:138,:153,:154 |
| V11 | tests/components/{ui,custom} dead taxonomy (Amendment 11, P3) | RATIFIED | both dirs exist; src/components is flat |
| V12 | handmark 6 root helpers → composables/ (row 1b, Amendment 4 target) | RATIFIED (target) | brush/freehand/geometry/ink/noise/texture at root; composables/useHandMark.ts the lone conforming file |
| V13 | vitest no-test-in-src mirror doctrine (§0.3) | RATIFIED | vitest.config.ts:28-33 |
| V14 | row 1b rewrite set "HandMark.vue + useHandMark.ts (intra-dir)" | WRONG → CORRECTED | misses index.ts (5 re-export blocks), types.ts, and ~5 handmark test files importing `@glass/components/handmark/*` leaf paths — the same P4 closure class the artifact itself diagnosed for sidebar |
| V15 | carve blast radius "~25 TS + 5 css @import edits" (Amendment 6, row 1d) | WRONG → CORRECTED | misses 6 SFC `<style src>` edits (field-control.css ×4: Input:57, TagsInput:64, NumberFieldInput:37, Textarea:56; disclosure.css ×2: Accordion:109, Collapsible:64); TS side ≈23 incl. 2 test files |
| V16 | "root drops 21 → 13 entries" (§2c, Amendment 5) | WRONG → CORRECTED | 10 kept files + 4 carve dirs = 14 |
| V17 | "matching aurora (17)/blob (13)" composable counts (Amendment 4) | WRONG → CORRECTED | HEAD counts 15/12 |
| V18 | specular cluster KEEP as "multi-consumer" (§2b) | PARTIAL-WRONG → CORRECTED | vSpecular ×5 genuine; `useSpecularPointer` has ZERO in-repo importers (public-surface.spec.ts:228 row only) and the glass/index.ts "hover/button waves" prose is stale |
| V19 | fan-in exacts class-names 168/primitive 52/selection 23 (§2c, Amendment 6) | DRIFT → CORRECTED | file-count grep at HEAD: 169/51/18 (direction and conclusions unaffected) |
| V20 | color/, procedural/, canvas2d/, webgl/, webgpu/ stay shared; demo tree conforming; no global types/constants/utils (§5 "got RIGHT") | RATIFIED | independent ANEW greps concur (procedural ×7 components; canvas2d constellation+fourier+webgpu wiring) |

**Counts: opusWrong = 6 (V14–V19) · ratified = 14 (V1–V13, V20) · fableNew = 5** —
(N1) Amendment 13's SFC `<style src>` closure channel + canonical rewrite-set rule;
(N2) the handmark test-mirror tail folded into row 1b;
(N3) Amendment 14 — useSpecularPointer zero-consumer public leaf + stale barrel prose, filed to
family C;
(N4) P7 — demo/stories/manifest/ single-file-dir fold (hygiene, non-blocking);
(N5) §6 pre-stated perfected homes for the family-C conditionals (useDockCtaReceive →
dock/composables with the /motion-barrel drop riding 8.0.0 if kept public; backdrop cluster →
dock/composables).

## ANEW divergences resolved AGAINST the fresh seat (recorded honestly)

- The ANEW glass/ `backdrop/`+`specular/` carve is NOT adopted: glass/ root is 14 entries (8
  loose leaves + 5 dirs + index), under the artifact's own ~15 threshold, and Principle 7's
  cohesion÷churn test rules the carve churn-positive. The artifact's flat-keep stands.
- ANEW would colocate useDockCtaReceive NOW; the artifact's family-C conditional is
  band-seam-correct (BAND-COLOCATION scope-out; A05 is family C's). Kept CONDITIONAL, with the
  perfected home pre-stated (N5) so the tail is mechanical.

## LIVE-DEFER register

None required. Every claim in this unit resolved from static source (import graphs, cascade
files, config, adjudication docs). The P1 zero-paint claim cites the prior R3a live proof and was
verified here only at the @import-closure level — the paint-level assertion remains R3a's.

## ROUTING — BAND-COLOCATION anchors affected

| Anchor | Action |
|---|---|
| BAND-COLOCATION Wave 1 row 1b (handmark fold) | ADOPT corrected rewrite set: + index.ts/types.ts edits + ~5 test-file rewrites (Amendment 13b) |
| BAND-COLOCATION Wave 1 row 1d (_shared carve) | ADOPT corrected blast radius: ~23 TS (incl. 2 tests) + 3 @imports + 3 ledger lines + 6 SFC `<style src>` edits (Amendment 13a) |
| BAND-COLOCATION Wave 1 acceptance check | ADD the canonical rewrite-set rule (Amendment 13): TS/vue imports + `<style src>` + tests + @imports + ledger comments |
| BAND-COLOCATION Wave 3 hygiene fence | ADD P7 manifest/lazy fold (non-blocking); extend the allowlist-with-date roster to include useSpecularPointer (Amendment 14) |
| BAND-COLOCATION OPEN-9 / family-C seam | EXTEND the A05 conditional roster: + useSpecularPointer; pre-stated homes for useDockCtaReceive + backdrop cluster (§6 CHANGED) |
| BAND-COLOCATION Amendment-5/6 quoted counts | TRUE-UP: 21→14 entries; fan-ins 169/51/18; aurora 15/blob 12 (V16, V17, V19) |
| Family A orphan-CSS-partial gate (seam, not this band) | NOTE P6: the gate must walk BOTH CSS reference channels (`@import` and `<style src=`) |
| Doc-truth sweep (family J seam) | ADD the stale glass/index.ts "hover/button waves" line (Amendment 14) |
