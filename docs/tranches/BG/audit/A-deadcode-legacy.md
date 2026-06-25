# BG audit — A: NO-LEGACY · dead-code · orphan · overfitting sweep (src/ + demo/)

Auditor pass over the **whole** `src/` + `demo/` surface at HEAD (4.2.0), running the
overfitting-audit discipline (`docs/audits/overfitting-audit.md`): every `src/` artefact
must have ≥2 consumers OR be exported OR be a private demo helper. Default-broken
skepticism applied; every count below is a re-runnable `grep`. This sweep is **cross-cutting**:
the dock composables are A-dock-arch's delete list, the morph/reveal primitives are
A-motion-arch's — I do NOT re-spell those; I AGGREGATE the cross-cutting deletions and add
the items those two scopes did not cover (dead CSS files, dead tokens, the alias shims, the
BD half-wired additions, the demo-only-in-src placement).

The headline: the historical clean-break discipline HELD for pre-BD retirements
(`useLiquidRail.ts`, `DockRail.vue`, `GlassUnderline`, `popover-animate` are all genuinely
DEFINITION-ABSENT — only prose mentions survive). **The legacy/dead-code accreted in the BD
greenfield cut** — 38 new `src/` files landed 4.1.0→4.2.0, and a cluster of them are dead,
demo-only-misplaced, or alias shims that violate the NO-LEGACY law.

---

## FINDINGS (what is actually true at HEAD, file:line)

### F1 — `useMorphField()` THE FUNCTION is dead; only its DATA table is consumed (the sharpest morph finding)

`src/composables/motion/useMorphField.ts` is 468 LOC. The exported **function**
`useMorphField(opts)` (L272-468, ~200 LOC of weld engine) is **NEVER CALLED ANYWHERE** —
verified `grep -rn "useMorphField(" src/ demo/` returns ZERO call sites (only the `export
function` def + comments). The ONLY live export is the `MORPH_SIGNATURES` const (L96-160, a
~65-line data map), imported by exactly two files:
- `useGooMorph.ts:43` (`import { MORPH_SIGNATURES }`)
- `useDockFission.ts:61` (`import { MORPH_SIGNATURES }`)

`GooFilter.vue` does NOT import it (the motion-arch F2 claim that GooFilter is a consumer is
stale — `grep -n "useMorphField" GooFilter.vue` finds only a comment, L51). So the library's
self-described "ONE morph-field WELD primitive every morph animation in the library
consumes" (`useMorphField.ts:1-2`) is **a ~200-LOC dead function wrapped around a 65-line
signature table**. The weld engine nobody adopted (A-motion-arch RC1/RC3) is even deader than
that audit states: it was never wired in the first place.

`src/styles/motion/morph-field.css` (229 LOC, the weld's CSS half, imported globally at
`index.css:180`) is correspondingly orphaned — no SFC references its `.morph-*` classes
(`grep` finds only `curves.ts` touching "morph" symbols, unrelated).

### F2 — `useLiquidMorph.ts` (462 LOC) is pure DEAD CODE — zero consumers, not exported

`src/composables/motion/useLiquidMorph.ts` calls itself "the GENERALIZED liquid framework …
the dock V↔H is the SPECIAL case; this engine is the GENERAL case" (L54-62). It is **not
exported from any barrel** (`grep` over `composables/motion/index.ts`, `src/index.ts`,
`motion.ts`, `motion-core.ts`, `api/index.ts` → ZERO) and has **zero real consumers** — the
ONLY reference in the whole tree is one prose sentence in `demo/stories/manifest.ts:883`. A
462-LOC primitive describing itself as the generalization of a morph it never drives. The
strongest overfitting verdict (`delete-unused`). (A-motion-arch BG.W-MORPH-ENGINE-ONE
already lists this for deletion — I confirm the diagnosis and AGGREGATE it; it is the #1
LOC-for-nothing item in the library.)

### F3 — `useDockContextSilhouette.ts` (551 LOC) is DEAD CODE (cross-ref A-dock-arch RC3)

ZERO consumers. The only reference is a COMMENT in `demo/stories/dock/examples/AppSwitcher.vue:3`
that explicitly says the silhouette engine is overkill and uses `useBloomUp` instead. Not
re-exported from `composables/index.ts`. **A-dock-arch already owns this deletion**
(BG.W-DOCK-CUT) — I aggregate it as the single largest dead TS file in the repo and flag
that it is a BD addition (`git diff --diff-filter=A 9c0e06e2 HEAD` lists it as net-new).

### F4 — `src/styles/glass/liquid-enter.css` (252 LOC) is a DEAD imported CSS file

Imported into the cascade (`glass.css:73 @import "./glass/liquid-enter.css"`) but its
selectors `.liquid-enter` / `.is-cel` have **ZERO consumers** in any `.vue`/`.ts`
(`grep -rn "liquid-enter\|is-cel" src/ demo/ --include="*.vue" --include="*.ts"` → empty).
252 lines of cel-entrance recipe shipped in the published `/styles` bundle that nothing
mounts. A BD net-new file (`git diff` confirms). **Delete the file + its `@import`.**

### F5 — `src/styles/glass/liquid-morph.css` (850 LOC) is DEMO-ONLY CSS misplaced in `src/styles`

850 lines of `.liquid-island-*` / `.liquid-pill-*` / `.liquid-sheet-*` / `.liquid-player-*`
classes (the Maps/Music/Dynamic-Island liquid-playground showcase). It is **imported ONLY in
`demo/demo.css:125`** (NOT in `src/styles/index.css` — so it does not even ship in the
library `/styles` bundle), and consumed by exactly two demo files
(`demo/stories/dock/liquid-playground.vue`, `demo/stories/dock/DockExampleTile.vue`). This is
demo-private styling living under `src/styles/` — a placement violation (the demo-private
helper belongs under `demo/`). Per the overfitting discipline this is `demo-only-private`:
move it to `demo/stories/dock/` (or `demo/_internal/`), it is not a library surface.

### F6 — `selectableChipVariants.ts` is a back-compat ALIAS shim (NO-LEGACY violation)

`src/components/custom/selectable-chip/selectableChipVariants.ts` (15 LOC) is a pure renaming
re-export: `export { chipVariants as selectableChipVariants } from "./chipVariants"`. Its own
header (L9-12) admits "Clean break … this file is the public re-point". But a renaming alias
file IS the back-compat alias the NO-LEGACY law forbids — it exists only to give `chipVariants`
a second public name. The congruent fix: export `chipVariants`/`ChipVariants` directly from
`selectable-chip/index.ts` (or rename the canonical CVA to `selectableChipVariants` and have
`toggle-chip/index.ts:` — the OTHER consumer — import that). One name, no alias file.

### F7 — `--corner-k-soft` / `--corner-k-sharp` are self-documented dead tokens PINNED ALIVE by a gate

`src/styles/theme/radius.css:85-89` literally says: *"(BB.W-DEAD-SWEEP re-ground:
--corner-k-soft / --corner-k-sharp have no runtime var() consumer but ARE pinned by
proof:squircle-language … so KEPT, not swept; the clean-break delete is a coordination
follow-up …)"*. Verified: `var(--corner-k-soft` / `var(--corner-k-sharp` → ZERO reads. A
dead token kept alive ONLY because a gate asserts it is minted is the NO-LEGACY anti-pattern
inverted — the gate is the legacy. Delete both rungs (L91-92) + drop the
`proof:squircle-language` TOKEN-AXIS clause that pins them.

### F8 — `--corner-shape-card` / `--corner-shape-pill` are dead `round` no-op tokens

`radius.css:105-106` declares `--corner-shape-card: round` and `--corner-shape-pill: round`,
and `squircle.css:14` explicitly says cards/pills are round-by-contract and *"a `corner-shape`
rule would be a no-op"*. Verified: `var(--corner-shape-card` / `var(--corner-shape-pill`
→ ZERO reads. Two tokens whose value is the default and which nothing reads. (The other
`--corner-shape-{bigdock,dialog,sheet,panel,hero,thumb}` ARE read — keep those.) Delete the
two no-op `round` aliases; a consumer wanting a squircle card opts in by re-pointing
`--corner-shape-card` itself (the documented path needs no library decl).

### F9 — the 3 `timeline-*` springs leak a per-component register into the global source (cross-ref A-motion-arch F5/RC5)

`springPresets.ts:24-26,113-125` carries `timeline-head` / `timeline-fill` / `timeline-press`
in the GLOBAL `SPRING_PRESETS`, generating 3 extra `linear()` curves + 3 duration clocks in
`scheme-spring.css:108-110,134-136`. The ONLY consumer is `ScrubberTimeline.vue:14-16`
(`springPreset("timeline-head")` etc.). The CSS twins `--spring-timeline-{head,fill,press}`
+ `-duration` are read by NOTHING (`var()` reads = 0 — ScrubberTimeline goes through the JS
table, not the CSS tokens), so the 6 generated CSS tokens are dead weight. **A-motion-arch
BG.W-SPRING-REGISTER-TIDY owns this** — I confirm the CSS-token half is provably dead and
aggregate it there (do not duplicate the wave).

### F10 — the dead/≤1-consumer BD dock composables (aggregated from A-dock-arch)

`git diff --diff-filter=A 9c0e06e2 HEAD` confirms these are BD net-new files; the consumer
reality (re-verified by me):
- `useDockContextSilhouette.ts` 551 — 0 consumers (F3).
- `useDockFission.ts` 604 + `dock/fission-bridge.css` 552 — the `splittable` facility has
  exactly ONE consumer, `demo/stories/dock/examples/TabBar.vue` (`grep -rln "splittable"
  demo/ --include="*.vue"` → 1 file). J-inv-10 fail.
- `useDockItemDrag.ts` 302 — exactly ONE consumer (`GlassDock.vue:39,452`, gated behind
  `draggableItems`, exercised by ONE demo `overview.vue`).
- `railProjection.ts` — keep (DockStack, ≥2 by construction).

These are **A-dock-arch BG.W-DOCK-CUT's delete list** — I do not re-spell the wave; I record
that they are BD additions that landed at ≤1 consumer (the greenfield accreted speculative
substrate) and that they are the bulk of the cross-cutting ~2200-LOC removal.

### F11 — the FLIP-reveal duplication (aggregated from A-motion-arch F3/RC2)

`useBloomUp.ts` (507, BD net-new), `useLiquidReveal.ts` (285), `useDockCtaReceive.ts` (349),
`useCelebrationBurst.ts` (BD net-new) each hand-roll the identical `ElementMorph +
springTimingFunction` rAF loop while the published kf `flipShared` sits imported-and-unused
(`suite.ts:42`). **A-motion-arch BG.W-FLIP-ONE owns this** (~700 LOC collapse). I confirm the
import-and-ignore of `flipShared` and aggregate the BD-origin of `useBloomUp`/
`useCelebrationBurst`.

### F12 — single-consumer BD scroll chain (`useScrollScene → useScrollPin → 1 demo`)

`useScrollScene.ts` (BD net-new) is consumed ONLY by `useScrollPin.ts:23,125`;
`useScrollPin.ts` (BD net-new) is consumed ONLY by `demo/stories/motion/scroll-choreography.vue`
(`grep -rn "useScrollPin" src/ demo/` → 1 demo file, 4 lines all in that SFC). A two-file
composable chain serving ONE demo story. Per J-inv-10 either land the booked 2nd consumer
(the `.scroll-pin` register the CLAUDE.md scroll-choreography section claims rides "EVERY
StoryPage") or retire the chain — at HEAD the claim is false and the chain is 1-consumer
substrate.

### F13 — the `cartoon-cast` red-shadow caster is the defect-#3 source (cross-ref D-aliasing-clip)

`GlassDock.vue:606` renders `<span class="cartoon-cast">` reading `--shadow-cartoon-*`
mis-tuned to a red/maroon drop-shadow (CONTEXT defect #3). `cartoon-cast` is broadly threaded
(Button/Card/Badge/Carousel/StackedIcons + `cards.css`/`configurator.css`/`dock/shape.css`/
`glass/glass-atom.css`/`liquid-enter.css`). **D-aliasing-clip owns the colour-tune fix**; I
record that the DEAD `liquid-enter.css` (F4) is one of its declared sites, so deleting F4 also
removes one `cartoon-cast` consumer (a free reduction).

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — The BD greenfield minted primitives FIRST and wired them never
The 38 BD net-new `src/` files include FOUR morph engines (`useMorphField`, `useGooMorph`,
`useLiquidMorph`, + the dock's own) and a cel-entrance CSS file — and the wiring lagged: the
weld FUNCTION was never called (F1), the "generalized" engine has zero consumers (F2), the
cel-entrance CSS mounts nothing (F4). The greenfield wrote the abstraction layer as PROSE
("the ONE engine every morph consumes") and shipped the prose as code without a single live
binding. This is the inverse of KISS: maximum abstraction, minimum adoption.

### RC2 — "Clean break, no alias" was honored in DELETIONS but violated in NEW SURFACE
The pre-BD retirements are genuinely absent (useLiquidRail/DockRail/GlassUnderline/
popover-animate). But BD then minted a fresh alias shim (`selectableChipVariants.ts`, F6) and
left two prior dead-token clean-breaks "booked as a coordination follow-up" (F7) — i.e. the
NO-LEGACY law is applied at delete-time but relaxed at mint-time. A clean break that books its
own completion to a later wave is not a clean break.

### RC3 — Gates pin dead tokens alive (the gate IS the legacy)
`proof:squircle-language`'s TOKEN-AXIS-EXISTS clause (F7) and the per-component spring rows
(F9) keep provably-dead declarations alive solely so a gate stays green. The gate's job is to
forbid dead code; here it MANDATES it. The fix deletes the token AND the clause that pins it.

### RC4 — `src/styles/` accreted demo-only CSS (placement erosion)
`liquid-morph.css` (850 LOC, F5) is demo-playground styling sitting in the library style tree,
imported only by `demo/demo.css`. The greenfield's biggest showcase (liquid-playground) wrote
its CSS into `src/` instead of `demo/`, blurring the library/demo boundary the
demo-only-private discipline exists to keep sharp.

---

## PROPOSED WAVES

### BG.W-DEADCODE-CUT — delete the provably-dead BD additions (no legacy)
- **Intent.** Remove every artefact with ZERO consumers, clean break, no alias.
- **Approach (idiomatic, clean break).** DELETE outright:
  `src/composables/motion/useLiquidMorph.ts` (462, F2);
  the **`useMorphField()` function body** (L272-468, F1) — keep ONLY `MORPH_SIGNATURES` +
  its types, re-home the surviving ~65-line data table into a thin
  `morphSignatures.ts` (the two real consumers import the table, not a dead engine);
  delete `src/styles/motion/morph-field.css` (229, the weld's orphaned CSS half) + its
  `index.css:180` import;
  delete `src/styles/glass/liquid-enter.css` (252, F4) + its `glass.css:73` import.
  Each is registry-consumer-probed (inv-11) — none is on the public barrel.
- **Files.** `useLiquidMorph.ts` (DELETE), `useMorphField.ts` (gut to the data table or rename
  to `morphSignatures.ts`), `useGooMorph.ts` + `useDockFission.ts` (re-point the
  `MORPH_SIGNATURES` import), `motion/morph-field.css` (DELETE), `glass/liquid-enter.css`
  (DELETE), `index.css`, `glass.css`.
- **π / acceptance.** `grep -rn "useLiquidMorph\|useMorphField(\|liquid-enter\|morph-field.css"
  src/ demo/` → ZERO live references; demo builds; `proof:overfitting` green; ~940 LOC TS +
  ~480 LOC CSS removed.
- **Folds.** F1, F2, F4; confirms A-motion-arch's MORPH-ENGINE-ONE delete with the sharper
  "the function was never called" diagnosis.

### BG.W-DEMO-STYLE-REHOME — move demo-only CSS out of `src/styles`
- **Intent.** The library style tree carries only library surface; demo playground CSS lives
  under `demo/`.
- **Approach.** Move `src/styles/glass/liquid-morph.css` (850, F5) to
  `demo/stories/dock/liquid-morph.css` (it is already imported only by `demo/demo.css` — a
  one-line `@import` path change, zero `src/` consumer). Audit the other BD CSS files for the
  same erosion (`dock/adaptive-legibility.css` has 1 src consumer — keep; verify each).
- **Files.** `src/styles/glass/liquid-morph.css` → `demo/`, `demo/demo.css` (`@import` path).
- **π.** No `src/styles` file is imported solely by `demo/`; the published `/styles` bundle
  byte-shrinks by zero (liquid-morph was never in it) but the boundary is restored.
- **Folds.** F5, RC4.

### BG.W-CHIP-ALIAS-KILL — delete the `selectableChipVariants` alias shim
- **Intent.** ONE name for the ONE chip CVA; no renaming re-export file (NO-LEGACY).
- **Approach.** Delete `selectable-chip/selectableChipVariants.ts` (F6). Export
  `chipVariants` + `ChipVariants` directly from `selectable-chip/index.ts`; re-point
  `SelectableChip.vue` + `toggle-chip/index.ts` onto the single name (pick `chipVariants` as
  the canonical — it is the shared recipe; the "Selectable" prefix was the alias's whole
  reason to exist). Clean break, one rename per call site.
- **Files.** `selectableChipVariants.ts` (DELETE), `selectable-chip/index.ts`,
  `SelectableChip.vue`, `toggle-chip/index.ts`, `api/index.ts` if it re-exports the alias.
- **π.** `grep -rn "selectableChipVariants" src/` → ZERO; both chip consumers compile on the
  one name.
- **Folds.** F6, RC2.

### BG.W-DEAD-TOKEN-SWEEP — delete the dead tokens + the gates that pin them
- **Intent.** No declared-but-unread token survives; no gate mandates dead code.
- **Approach.** DELETE `--corner-k-soft` / `--corner-k-sharp` (`radius.css:91-92`, F7) and
  `--corner-shape-card` / `--corner-shape-pill` (`radius.css:105-106`, F8); drop the
  `proof:squircle-language` TOKEN-AXIS clause that pins the k-rungs. Drop the 3
  `--spring-timeline-*` + `--spring-timeline-*-duration` CSS twins from
  `scheme-spring.css:108-110,134-136` once the JS register move lands (coordinate with
  A-motion-arch BG.W-SPRING-REGISTER-TIDY — the CSS-token delete is a free rider of that
  wave's `springPresets.ts` edit). Re-run the declared-vs-read diff at close; the
  `comm -23 declared read` non-theme set must shrink to the genuinely-read-via-JS set only.
- **Files.** `theme/radius.css`, `tokens/scheme-spring.css`,
  `scripts/proof-squircle-language.mjs` (drop the clause), the spring regen marker.
- **π.** `comm -23` declared/read diff (filtered of `@theme`-bridge utility tokens) is empty
  of card/pill/k-soft/k-sharp/timeline rows; `proof:squircle-language` no longer asserts a
  dead rung.
- **Folds.** F7, F8, F9 (CSS half), RC3.

### BG.W-OVERFIT-RATIFY — re-run the consumer-bar census, retire the ≤1-consumer substrate
- **Intent.** Every surviving `src/` artefact clears ≥2 consumers OR exported OR private-demo.
- **Approach.** This is the AGGREGATION wave — it does NOT re-spell A-dock-arch BG.W-DOCK-CUT
  (fission/item-drag/silhouette) or A-motion-arch BG.W-FLIP-ONE (the reveal trio); it RATIFIES
  that after those land, the J-inv-10 census is green, and it decides the residual
  single-consumer chains this sweep surfaced: the `useScrollScene → useScrollPin → 1 demo`
  chain (F12 — land the booked StoryPage `.scroll-pin` consumer the CLAUDE.md claim names, or
  retire both files). Output is the unified `W0-overfitting` table + verdict distribution at
  the BG close, per `docs/audits/overfitting-audit.md`.
- **Files.** `useScrollScene.ts` / `useScrollPin.ts` (decide: wire 2nd consumer or DELETE);
  the census table.
- **π.** `proof:overfitting` / consumer-evidence green across the whole `src/` after the
  family-cut waves; no `src/` composable at exactly-1-consumer without a fresh
  `docs/consumer-evidence/<name>.md`.
- **Folds.** F10, F11, F12; closes the overfitting invariant for BG.

---

## SEVERITY ORDERING

1. **BG.W-DEADCODE-CUT** — `useLiquidMorph` (462, dead), the `useMorphField` function (dead),
   `liquid-enter.css` (252, dead) + `morph-field.css` (229, orphaned): ~1400 LOC that runs
   nothing, shipped in 4.2.0. HIGHEST pure-dead-code value.
2. **BG.W-DEAD-TOKEN-SWEEP** + **BG.W-CHIP-ALIAS-KILL** — the NO-LEGACY violations (gate-pinned
   dead tokens + the alias shim); low risk, high principle.
3. **BG.W-DEMO-STYLE-REHOME** — the 850-LOC placement violation; demo-only mechanical move.
4. **BG.W-OVERFIT-RATIFY** — the aggregation/close census (depends on the dock + motion family
   cuts landing first).
