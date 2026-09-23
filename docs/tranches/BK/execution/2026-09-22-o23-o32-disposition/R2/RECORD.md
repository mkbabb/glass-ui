# R2—the docs lane (O-23/O-32 cure wave, 2026-09-22)

Lane R2, Opus (`claude-opus-5-5[1m]`). Datum: master `e853b327` (lanes DA `fafc9737`, CT `552b5d01`, AC2 `9d8cd728`, AC1 `e853b327` landed; the LEDGER and reply letter at `91c65f89`). Rulings of record: `../RULINGS.md` §A, the dated brackets, "Driver items raised by the lane adjudicators", §B, §C row R2. Lane records read in full: `../CT/RECORD.md`, `../DA/RECORD.md`, `../AC1/RECORD.md`, `../AC2/RECORD.md`; their FOR THE DRIVER sentences are the source of every row's wording. Nothing staged or committed; the driver commits by pathspec.

## Rows → where each landed

MIGRATION headings are cited by their text. Every 10.0.0 row sits under `## 10.0.0 — UNRELEASED`; every late row under `## 9.0.0 — ~~UNRELEASED …~~ [… LIVE …]`, before `_Amended after 9.0.0_` (that block describes post-9.0.0 source, these rows describe the 9.0.0 bytes).

| row | landed under | notes |
| --- | --- | --- |
| §10.0.0 status | the **Status** paragraph | dated bracket: the wave adds three breaks (`cm-serif`, `useSidebarFollow`, `parentId`), rows run from _The token-root contract_ to the section end [2026-09-22 · adjudication r2: four breaks — the `SegmentedTabs` generic ruled the fourth at `3e5b95eb` (type-level), cure 18] |
| B-1 | _The token-root contract_ | RULINGS §B-1's sentence verbatim ("`:root` token overrides must be unlayered, or set on an element below `:root` in any layer."), then AC1's font-register paragraph as cured at AC1 adjudication r1 (the element arm scoped to `--font-serif-math`; `--font-stack-text` / `--font-stack-display` for the inline bridges) |
| §4.1 BREAKING | _`cm-serif` leaves the published CSS; `font-serif-math` replaces it_ | removal-table row `` | `cm-serif` | … | `` in the shape G-NO-ORPHAN-EXPORT's arm parses (proof below); the consumer-`@theme` sentence from AC1's Chromium probe; CSS name set 242/47 → 243/46 (counted off `.published-roster`) |
| §3.3 BREAKING | _`useSidebarFollow` exempts by attribute, not by class_ | DA FOR THE DRIVER text |
| §3.4 BREAKING | _`SectionHierarchy.parentId` is the direct parent_ | DA text; the type was already `string \| null` at `v9.0.0` (measured), so the break is in values, and the fixture sentence |
| §4.3 SegmentedTabs | _`SegmentedTabs` is generic over its option values_ | AC1 text; the test-code clause WIDENED: the `InstanceType` probe errors (below) |
| §4.2 + L-2 | _`cn()` buckets every published `text-*` and `shadow-*` name by the property it writes_ | AC1 sentence + the type-hinted arbitrary-value rule (AC1 r1 cures 2–3) |
| L-3 | _The Slider's size rungs read six tokens_ | AC2 text; points at the token-root contract |
| L-1 | _`<InfiniteScroll>` observes against the viewport_ | AC2 text + the degraded-engine sentence ("later, never a drain") |
| L-23 | _The dock's reveal stagger counts controls only, from both ends_ | AC2 text + the short-row sentence (`2 1 2`) |
| §3.2 | _Dialog and Sheet stamp `aria-modal`_ | DA text |
| A-2 | _`GlassDock` passes a same-control press inside `#persistent` mid-morph_ | DA's CHANGELOG line + the 4 px bound sentence |
| Metric §2.1 | _`Metric`'s delta paints the one ink_ | CT items 2 and 4 as re-framed at CT r1: rendered text + paint, non-breaking; `+3` / `+12.4K`; `coalesceMetric` `signed?: boolean`; the `[data-polarity]` recipe |
| `--success` reader list (CT item 1) | _`--success` and `--warning` darken in the light arm_ | `Metric`'s up delta struck from "Everything that reads them" with a dated bracket pointing at the Metric row; lane T's retune rows are cross-cited, not restated |
| 8.0.0 Metric "status ink" (CT item 2) | _Metric — one atom, two composers_ under `## 8.0.0` | dated bracket (CT/RECORD called it "the 7.0.0 entry at MIGRATION.md:897"; the line sits under `## 8.0.0`—path correction) |
| A-1, A-3, L-4 residue, §2.2 | _Paint: three label sites clear 4.5:1_ | CT item 3 figures; §2.2 as "no token moves" + a pointer to DESIGN.md |
| L-6 | _The tooltip chip pairs its size with the caption leading_ | DA text |
| 9.0.0: GlassDock reshape | _`GlassDock`'s props fold onto `collapse`_ | late row, `ac471032` |
| 9.0.0: dead token | _`--dock-max-inline-size` is removed_ | late row, `964535cb` (reader) + `9d8cd728` (declaration) |
| 9.0.0: handmark | _Eight `./handmark` types leave with the barrel's reshape_ | late row, `5a69ed9f` |
| 5.0.0 cap paragraph (AC2 routed, MIGRATION.md:2139-2149 at the datum) | **BG.W-DOCK-CAP-SCROLL-FADE** paragraph under `### The BG/BH visual-convergence & structural retirements` | dated bracket: true 5.0.0–8.0.0 only; points at the 9.0.0 row; `--dock-max-block-size` survives |
| L-5 census (21 rows) | `### The `/api` discovery-subpath fold — the 203-symbol census` | each home cell struck and replaced in the table's own removal idiom, with a dated bracket; a bracket under the census header states the sweep; the `ControlSize` prose bracket |
| CHANGELOG | `## 10.0.0 — UNRELEASED` + one late section under `## 9.0.0 — 2026-08-29` | below |
| DESIGN.md | `## Default Color Palette`; the **Slider axes** block | below |
| README | — | ~~no change (below)~~ [2026-09-22 · adjudication r1: README.md:171 rewritten to B-1, cure 6; § README] |
| O-20 LEDGER | `### B-2 · publish the caught-plate paint/stacking contract…` | one dated bracket |
| demo blurb | `demo/stories/data/metric.vue:40` | CT item 5's sentence, the `compact` sentence kept |

## Measured commits (`git log -S` / `-G`, `git tag --contains`)

| what | command | commit | first tag |
| --- | --- | --- | --- |
| `./animated-digit`, `./completion-seal`, `./header-ribbon`, `./paper-backdrop` leave `exports` | `git log --format=%h -S '"./<key>"' -- package.json` | `4bf53962` (2026-08-04) | `v8.0.0` |
| `./forms` leaves `exports` | same | `a8a6f66b` (2026-08-09) | `v8.0.0` |
| the eight handmark types leave the barrel | `git log v8.0.0..v9.0.0 -- src/components/handmark/index.ts` (the only commit), then per-name `grep -cw` at `5a69ed9f^` (1) and `5a69ed9f` (0) | `5a69ed9f` (2026-08-25) | `v9.0.0` |
| `BloomUpPreset`, `UseBloomUpOptions`, `UseBloomUpReturn`, `UseCountupOptions`, `HighlightMatcher`, `UseTextHighlightControls` | `git log --format=%h -S '<name>' v8.0.0 -- src` (files before 1-2, after 0) | `bda718ac` (2026-07-20) | `v8.0.0` |
| last `var(--dock-max-inline-size)` reader | `git log -G 'var\(--dock-max-inline-size' -- src`; non-comment reader count v8.0.0 3 · `ac471032` 1 · `964535cb^` 1 · `964535cb` 0 · v9.0.0 0 | `964535cb` (2026-08-25) | `v9.0.0` |
| the `--dock-max-inline-size` declaration | AC2's commit | `9d8cd728` | (10.0.0) |
| GlassDock props → `collapse` | `git log -S 'startCollapsed' -- src/components/dock`; `DockProps` members v8.0.0 14 → `ac471032` 6 (`backgroundCanvas` stays; its type spans five lines); `DockInteraction`/`DockLayout` leave `dock/index.ts` at the same commit (`git log -S 'type DockLayout'`) | `ac471032` (2026-08-24) | `v9.0.0` |
| `@utility glass-plate` minted | `git log -S '@utility glass-plate'` (oldest hit); `git show v7.0.0:src/styles/glass/veil.css` has 0 hits, `v8.0.0` has the utility | `4b1a9733` (2026-08-04) | `v8.0.0` |

The handmark barrel delta beyond the eight (25 names removed, 9 added, 3 kept) was computed from `handmark/index.ts` at `v8.0.0` and `v9.0.0` and is written into the 9.0.0 row, so the entry is not half-true.

## §4.1—the G-NO-ORPHAN-EXPORT arm

The arm (`scripts/verify-export-types.mjs:488-523`, `rosterRatchetFailures`) excuses a name that left the datum only through a MIGRATION line matching `^\|\s*`<name>`\s*\|` (multiline): a table row whose first cell is the backticked bare name. The row is written as `` | `cm-serif` | Write `font-serif-math`. … | ``.

The committed `.published-roster` was already rebound by the driver (no `utility cm-serif`), so against the committed datum the arm has nothing to excuse. To prove the row's shape, the arm was run directly on a scratch root carrying the pre-rebind datum (`git show e417d82d:.published-roster`, which lists `utility cm-serif`) and each MIGRATION.md, with the emitted roster = the committed `.published-roster`:

```
node $SCRATCH/r2/arm/arm.mjs $SCRATCH/r2/arm/head $SCRATCH/r2/arm/tree
head {"datum":289,"emitted":289,"failures":[".published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: utility cm-serif",".published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: theme --font-serif-math"]}
tree {"datum":289,"emitted":289,"failures":[".published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: theme --font-serif-math"]}
```

`head` = HEAD's MIGRATION.md: the removal arm is RED on `cm-serif`. `tree` = this lane's MIGRATION.md: the removal arm is GREEN. The growth line in both is the pre-rebind datum lacking `theme --font-serif-math`, which the driver's rebind already cured in the committed roster.

The full gate, under the build lock, against the shared `dist/` as it stands (no build run; `dist/` already carries `font-serif-math` and no `cm-serif` byte, checked by grep):

```
until mkdir …/scratchpad/build.lock 2>/dev/null; do sleep 5; done; timeout 600 node scripts/verify-export-types.mjs; rmdir …/scratchpad/build.lock
exit=1
Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2911460 > 2562566
```

The roster check runs before the pack and throws `Invalid package artifact` on any roster failure, so reaching `G-BUNDLE-RATCHET` means the roster arm and the declaration/CSS closure checks passed. The ratchet is the driver's rebind (§B-3). Before this lane's edits the same command stopped at `2893629 > 2562566`; the 17,831-byte difference is this lane's MIGRATION.md growth, which ships in the tarball.

## §4.3—the `InstanceType` probe

One probe file, checked by `vue-tsc` through a scratch tsconfig that extends the repo's `tsconfig.json` and includes `src/` plus the probe:

```ts
import { SegmentedTabs } from "@glass/components/tabs";
import Label from "@glass/components/label/Label.vue";
export type Probe = InstanceType<typeof SegmentedTabs>;
export type Control = InstanceType<typeof Label>;
```

```
timeout 600 npx vue-tsc --noEmit -p $SCRATCH/r2probe/tsconfig.json   → exit=2, one error:
probe.ts(3,34): error TS2344: Type '<T extends string = string>(__VLS_props: …) => import("vue").VNo…' does not satisfy the constraint 'abstract new (...args: any) => any'.
```

The non-generic control (`Label`, line 4) resolves; the generic `SegmentedTabs` does not. The clause is widened: the MIGRATION row says `InstanceType<typeof SegmentedTabs>` no longer compiles and, since the component exposes nothing (`expose: (exposed: {}) => void` in the built `SegmentedTabs.vue.d.ts`), a template ref types as `ComponentPublicInstance`.

## L-5—the census sweep, after

- Subpath sweep (every census row whose home cell, strikes removed, is a bare backticked subpath, against HEAD `package.json` `exports`): 106 rows, 0 stranded (7 before).
- Symbol sweep (TypeScript `getExportsOfModule` on each such row's `exports[…].types` entry in `dist/`, under the build lock): 106 checked, 1 not exported, `ColorResolver @/color`. That row already carries lane R's `[2026-09-22 · register wave 10-3 — it moved: deleted at 10.0.0 …]` bracket and is not one of the 21; the 14 symbol-stranded rows are 0.

## CHANGELOG

Extended, not restated. `## 10.0.0 — UNRELEASED`: a dated bracket on the intro paragraph (the wave and its three breaks); four new sections before `### Changed — the package`: `### Changed — three breaks from the O-23/O-32 cure wave` (`cm-serif`, `useSidebarFollow`, `parentId`), `### Added — the O-23/O-32 cure wave` (slider tokens, `--font-serif-math`/`font-serif-math`, `signed`, `data-sidebar-follow-exempt`, the `SegmentedTabs` generic, `playwright` + the two CI install steps), `### Removed — recorded late` (`--dock-max-inline-size`, per AC2's FOR THE DRIVER), `### Fixed — the O-23/O-32 cure wave` (InfiniteScroll root, dock stagger, cn buckets, aria-modal, the A-2 persistent arm with its bound, A-1, A-3, Metric delta ink, Configurator alpha text, tooltip leading); a dated bracket on `### Changed — the package` (CSS name set now 243 / 46; the tarball figures predate this wave). `## 9.0.0 — 2026-08-29`: one late section, `### Changed — `GlassDock`'s props fold onto `collapse`, and eight `./handmark` types leave`, dated bracket (RULINGS §1.1: "no MIGRATION or CHANGELOG row"). No CHANGELOG line for the demo configurator alpha drop (RULINGS CT2 residue: declined). [2026-09-22 · adjudication r2: three breaks → four; the `SegmentedTabs` bullet moved from Added into the breaks section with the `InstanceType` clause, cure 18.]

## DESIGN.md

- `## Default Color Palette`: the stale shadcn block replaced by the shipped light/dark values (read off `tokens/light-dark.css`, `color-radius.css`, `dark-arm.css`), with a dated bracket naming what the old block printed; then the §2.2 sentence (warmth not lightness; draw the boundary the way `Card` does), the one-ink paragraph (`--ink-seam` / `--ink-edge` / `--ink-perimeter`, composition forms, no alpha-muted text rung), the §2.3 boundary sentence scoped to fields and check controls (Input/Textarea/NumberField/Checkbox/Switch/Radio, `--foreground` at `--ink-perimeter`, 3.1 / 3.8 on `--card`; SelectTrigger / ToggleGroupItem / `.input-bar` not claimed, per the ruling), and the tier-tint note (a tint, not a text ink; tier rides a mark beside a `--foreground` numeral).
- **Slider axes**: a paragraph after the size table naming `--slider-{track-height,thumb-size}-{sm,md,lg}` with their defaults, `min(thumb, track)`, and the B-1 rule (wrapper or slider in any layer, or an unlayered `:root`; a `:root` in `@theme` or `@layer glass-overrides` loses).
- **Typography, round 3** [2026-09-22 · adjudication r3 + driver ruling]: the `.dock-label` sentence to the measured utility, the Fraunces axes line struck, the semantic-classes table replaced with the measured one (plus `.text-hero`), the kinetic utilities and keyframes struck (0 hits in `src/`), the Typography Tokens Semantic Use cells for `--font-display` / `--font-serif` bracketed. § Cure round 3.

## README

`grep …` (the name-only sweep) → no hits, and it could not find a rule: README.md:171 said any token re-declaration wins, the reverse of B-1. [2026-09-22 · adjudication r1 — ruled at 9a584214 (a); the sentence is rewritten to the B-1 rule (cure 6).] Ruling (d) of the CT2 round-2 rulings owes R2 nothing: `grep -nE '5×|8×|relL' DESIGN.md` → 0.

## Runs

- `timeout 600 npx vitest run tests/public-surface.spec.ts tests/design tests/styles/radius-role-canon.test.ts tests/styles/contrast-computed.test.ts tests/components/status-dot.contract.test.ts tests/components/a11y/coarse-target.test.ts tests/components/custom/blob/gl-excise.test.ts tests/components/metric.contract.test.ts` (every test that reads MIGRATION/CHANGELOG/DESIGN/README, plus metric) → `Test Files 10 passed (10)`, `Tests 297 passed | 2 expected fail (299)`.
- `timeout 600 npx vitest run tests/gates --testTimeout=60000` → 9 passed, 1 failed: `boot-graph` "dist-demo … is STALE" (dist-demo built 20:47Z, newest source 23:47Z). The same stale-dist-demo RED CT recorded; rebuilding `dist-demo` is the driver's, and this lane's `metric.vue` blurb edit is one of the newer sources.
- `node scripts/gate-register.mjs` → `seats:60 … drift:0 … violations:0`. No gate seat minted.
- No build run. `dist/` was only read, under the lock.

## Footprint

Touched by this lane (inside the R2 fence; `demo/stories/data/metric.vue:40` by the CT-residue driver item, `README.md` by the 9a584214 (a) widening):

- `MIGRATION.md`
- `CHANGELOG.md`
- `DESIGN.md`
- `README.md` (line 171, one sentence)
- `demo/stories/data/metric.vue` (line 40 only)
- `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` (one bracket in the B-2 row)
- `docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/R2/RECORD.md` (new, this file)

~~`README.md`: unchanged.~~ [2026-09-22 · adjudication r1: README.md:171 rewritten to B-1, cure 6] Other porcelain entries at return (`demo/shell/configurator/PresetEditor.vue`, `demo/stories/dock/overview.vue`, `RULINGS.md`, `src/styles/tokens/dark-arm.css`, `src/styles/tokens/offsets.css`, `tests-visual/dock-wrap-content-driven.spec.ts`, `tests/composables/color/use-accent-tone.test.ts`, `CT2/`) belong to lane CT2 and the driver, not to this lane. Scratch only under the session scratchpad (`r2/`, `r2probe/`, `r2-verify-*.txt`).

## FOR THE DRIVER

1. `.bundle-ratchet`: rebind at the close; MIGRATION.md grows ~17.8 KB and ships in the tarball.
2. `dist-demo`: stale against sources (boot-graph RED), rebuild at the close.
3. AUTHOR's post-R2 bracket pass: the letter can cite the MIGRATION headings above by text; the `InstanceType` clause widened (the probe errors); the Metric row is rendered text + paint.
4. README.md commits with R2's pathspec.
5. ~~DESIGN.md:806-825 (the Typography Tokens table and its code block) print stale values (`--font-serif` "Computer Modern Serif" vs the bridge `var(--font-stack-text)`; `--font-brand-sans` declared nowhere; `--font-display-weight` 400 vs `typography/scale.css:165` 600)—values, not guidance; outside ruling (a).~~ [2026-09-22 · adjudication r2: ruled R2's at `3e5b95eb`; cure 19.]

## Adjudication round 1 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `9a584214`—the driver's "R2 widenings (at R2 Challenger B)" landed AFTER both challengers returned and bind this lane: (a) DESIGN.md's font-override guidance and README.md:171 rewritten to the B-1 rule; (b) the L-5 stranding class extends to removal rows whose named successor is itself gone, each naming the successor's own removal heading, measured; (c) the `DEFAULT_SURFACE` CHANGELOG Fixed line is R2's; (d) `InstanceType<typeof X>` on a template ref is application code. Read in full: RULINGS.md, the CT/DA/AC1/AC2/CT2 RECORDs, this RECORD, the live diff of every R2 path.

Re-measured myself: `DockProps` at `v8.0.0` lists fourteen members (`fitContent`, `position`, `backdropMode`, `alwaysExpanded`, `shape`, `orientation`, `size`, `overflow`, `collapseDelay`, `startCollapsed`, `interaction`, `layout`, `backgroundCanvas`, `search`) and six at `v9.0.0` (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`); the removal table's nine rows hold (14 − 9 + `collapse` = 6). A successor sweep of every census removal row against HEAD `package.json` exports and `dist/**/*.d.ts` finds nine rows whose named successor has itself left: `HeaderRibbonPosition` → `HeaderRibbonPlacement` and `InstrumentChassisPhase` → `InstrumentChassisState` (both subpaths retired at `4bf53962`, v8.0.0 first), `PaperGridConfig` / `PaperGridHandle` / `UsePaperGridOptions` → the `LiquidGrid*` types (`./liquid-grid` retired at `bda718ac`, v8.0.0), `Countup` → `UseCountupReturn` (deleted at `bda718ac`), `CardSurface` → `CardVariant` and `GlassPanelVariant` → `CardTier` (both left at `4a04b43c`, v8.0.0, recorded under _Props — `<Card>`_), `PagerWindow` → `DeckPager` (left at `85c322dd`, v8.0.0, no §8.0.0 row; `PagerDots` stands). `bda718ac` removed six public composables, not three: `useBloomUp`, `useNumericTransition`, `useCountup` (`./motion`), `useStaggerReveal`, `useTextHighlight` (`./motion-core`), `useSpecularPointer` (the root barrel via `composables/glass`), with their types; §8.0.0 has no heading for them. `accent-tone-solve.ts:27` still reads `hsl(36 48% 97%)` at this datum (CT2's ruled cure is in flight). `grep -nE '5×|8×|relL' DESIGN.md` → 0: ruling (d) owes R2 nothing. `--font-brand-sans` is declared nowhere in `src/` or `demo/` and `data-typography-preset` has no reader in `src/` (0 hits each); `--font-display` / `--font-serif` / `--font-sans` / `--font-mono` are `@theme inline` bridges (`theme/bridges.css:86-90`) onto `--font-stack-*` in the unlayered token root (`tokens/scheme-motion.css:10,48-52`). MIGRATION.md:1837 runs 139 columns in a block wrapped near 95. `grep -cE '^Breaking\.'` → 0 at HEAD, 3 in the tree; `Not breaking` / `Additive` lead-ins have precedent in the same section.

| finding | verdict | reason |
| --- | --- | --- |
| R2-A-F1 / R2-B-F4 (`DockProps` 13 → 5 is wrong) | CURE | Re-counted: 14 → 6, `backgroundCanvas` is a member at both tags (its type spans five lines). MIGRATION :495, CHANGELOG :265, this RECORD :49. Cure 1. |
| R2-A-F2 (Status "the one paint row below is the ruled one" is now false) | CURE | Three paint / rendered-text rows joined it; the R2 bracket covers the breaks only. Cure 2. |
| R2-A-N1 ("9.0.0 removed no token" beside the `--dock-max-inline-size` late row) | CURE | Both true, read together as a contradiction; one clause in the late row's own bracket states what the sentence counts. Cure 3. |
| R2-A-N2 (the 139-column ControlSize line; the LEDGER bracket cuts a parenthetical from its referent) | CURE | Amended prose must scan; text unchanged in both. Cures 4-5. |
| R2-A-C1, R2-A-C2 (arm, ratchet, L-5 commits, figures) | DISMISS | Confirmations; every figure re-measured true here. |
| R2-B-F1 (README:171 says any re-declaration wins) | CURE | Ruled at `9a584214` (a): README is R2's, rewrite to B-1 verbatim. Cure 6. |
| R2-B-F2 (the `DEFAULT_SURFACE` CHANGELOG line unowned; (d) unrecorded) | CURE | Ruled (c): R2's. CT2's cure is ruled and lands in this cut; the seat verifies the constant at its return and records the state. (d) recorded as not owed. Cures 7, 15. |
| R2-B-F3 (`InstanceType` mislabelled test code) | CURE for the wording; DRIVER for the count | Ruled (d): the row says application code and gives the typed alternative. Whether it is a fourth break is the driver's—RULINGS §4.3 is CURE-NOW unmarked and (d) did not mark it; the Status bracket keeps three. Cure 8. |
| R2-B-N1 (the six `bda718ac` rows cite no heading; "three motion composables" undercounts) | CURE | Folded into (b): `Countup`'s successor `UseCountupReturn` left at `bda718ac` and (b) requires the row to name the successor's removal heading, so the heading must exist—a late `## 8.0.0` row on the §1.1 / AC-D-1 late-row precedent, measured (six composables, three doors). The header bracket names it. Cures 9-10. |
| R2-B-N2 (successor-stranded rows) | CURE | Ruled (b). Nine rows, not six (the sweep above); each names the successor's own removal, measured. Cure 11. |
| R2-B-N3 (DESIGN.md:698-708 and :827-838 contradict B-1) | CURE | Ruled (a). The rewrite cannot keep `--font-brand-sans` (declared nowhere) or the `data-typography-preset` root preset (no reader); both are measured absent and the brackets say so. Cures 12-13. |
| R2-B-N4 (Footprint says metric.vue is inside the §C fence) | CURE | The record must be true: `metric.vue:40` is R2's by the CT-residue driver item. Cure 14. |
| R2-B-N5 (`Breaking.` lines are a new idiom) | DISMISS | The marking is ruled ("BREAKING cures … are marked"); a bare lead-in parallels the section's own `Not breaking.` / `Additive.` lead-ins; no house law names the form. Stands. |
| R2-B-C1 (census of every FOR THE DRIVER item) | DISMISS | Confirmation. |
| Implement row (6) "README: no change" | CURE | Superseded by (a); the name-only grep could not find a rule. Cure 6 + the RECORD § README. Cure 15. |
| Implement row (1) "§4.3 clause widened" | CURE | Correct that it widened; (d) re-labels it. Cure 8. |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output): the 14 → 6 figure in three files; the Status bracket's paint-row clause; the dock-max late-row clause; the two rewraps; README:171 to B-1; the `DEFAULT_SURFACE` Fixed bullet; the §4.3 lead-in and bullet; the late `## 8.0.0` composables row and the census-header bracket; nine successor brackets; the two DESIGN.md font-guidance rewrites; this RECORD's truing (:49, § README, Footprint, (d), FOR THE DRIVER) and a `## Cure [2026-09-22]` section with the runs. An Opus seat applies them in order. `clean=false`.

Driver items (outside R2's rows as ruled): (1) whether the `InstanceType<typeof SegmentedTabs>` compile error counts as a fourth 10.0.0 break—RULINGS §4.3 is unmarked; the Status bracket keeps three until ruled. (2) DESIGN.md:806-825, the Typography Tokens table and its code block: values, not guidance, and stale—`--font-serif` prints "Computer Modern Serif" where the tree bridges it to `var(--font-stack-text)`; `--font-brand-sans` is declared nowhere; `--font-display-weight` prints 400 where `typography/scale.css:165` declares 600. Outside (a). (3) AUTHOR's post-R2 bracket pass may cite the late 8.0.0 row and the nine successor brackets by heading text, and carries the `DEFAULT_SURFACE` line if the letter names the accent solve. (4) README.md joins R2's pathspec at the commit. (5) The ratchet rebind and the `dist-demo` rebuild stand as FOR THE DRIVER items 1-2.

## Cure [2026-09-22]

Seat: Opus (`claude-opus-5-5[1m]`), the adjudication's fifteen dictated cures applied in order, nothing else. Line numbers are as applied (post-cure tree).

| cure | file:line | before → after |
| --- | --- | --- |
| 1a | MIGRATION.md:498-500 | `DockProps` thirteen → five, five names → fourteen → six, `backgroundCanvas` added; rewrapped; the `./dock` sentence unchanged |
| 1b | CHANGELOG.md:268 | `GlassDock` thirteen props to five → fourteen props to six |
| 1c | R2/RECORD.md:49 | `DockProps` v8.0.0 13 → `ac471032` 5 → 14 → 6, with the `backgroundCanvas` clause |
| 2 | MIGRATION.md:20-26 | the Status bracket gains the three paint / rendered-text row names beside the ruled paint row |
| 3 | MIGRATION.md:503-506 | the `--dock-max-inline-size` late-row bracket gains the name-set sentence |
| 4 | MIGRATION.md:1855-1857 | rewrap only; lines 1832-1843 all ≤ 100 columns (measured with `awk length`) |
| 5 | O-20 LEDGER.md:427-432 | the erratum bracket moves after `(`glass/veil.css`, reachable via `glass.css`)`; bracket text unchanged |
| 6 | README.md:171 | the one sentence rewritten to B-1, with the dated bracket |
| 7 | CHANGELOG.md:164-166 | the `DEFAULT_SURFACE` Fixed bullet after the tooltip-chip bullet, before `### Changed — the package` |
| 8 | MIGRATION.md:271-279 | lead-in "Two type-level uses move, in tests and in application code"; the `InstanceType` bullet says application code; rewrapped |
| 9 | MIGRATION.md:874-887 | the late 8.0.0 row _Six composables leave `./motion`, `./motion-core` and the root barrel_, between _Deleted — `WatercolorDot`_ and the `.dropdown-menu__*` namespace row |
| 10 | MIGRATION.md:1871-1883 | the census-header bracket names the late 8.0.0 row and the second (successor) sweep |
| 11 | MIGRATION.md:1924, 1944, 1970, 1975, 1983, 2003, 2007, 2008, 2079 | `CardSurface`, `Countup`, `GlassPanelVariant`, `HeaderRibbonPosition`, `InstrumentChassisPhase`, `PagerWindow`, `PaperGridConfig`, `PaperGridHandle`, `UsePaperGridOptions`: one dated bracket each, inside the cell |
| 12 | DESIGN.md:698-716 | _Consumer activation_: the bridge / stack paragraph, the two-form css block, the dated bracket; the canonical-mono paragraph stays |
| 13 | DESIGN.md:831-839 | the `:root`-not-`@theme` paragraph, the `data-typography-preset` html block and the preset paragraph → the bridges'-seam paragraph with its bracket; the `--font-sans` history paragraph stays |
| 14 | R2/RECORD.md § Footprint | the fence sentence trued; `README.md` bullet added; "`README.md`: unchanged." struck with its bracket |
| 15 | R2/RECORD.md § README, FOR THE DRIVER | § README replaced; ruling (d) recorded; FOR THE DRIVER items 4-5 appended |

- Cure 7: `grep -n 'DEFAULT_SURFACE =' src/composables/color/accent-tone-solve.ts` → `29:const DEFAULT_SURFACE = "hsl(30 85% 96%)";`. CT2's cure landed at `71be2c0b` during this seat; the bullet states landed bytes.
- Cure 9 doors: `git grep -l -w <name> bda718ac^ -- 'src/**/index.ts' src/index.ts` → `useBloomUp`, `useCountup`: `composables/motion/index.ts`; `useNumericTransition`: `motion/index.ts` + `src/index.ts`; `useStaggerReveal`: `motion/core/index.ts` + `motion/index.ts` + `src/index.ts`; `useTextHighlight`: `dom/index.ts` + `motion/core/index.ts` + `src/index.ts`; `HighlightMatcher`, `UseTextHighlightControls`: `src/index.ts`; `useSpecularPointer`, `UseSpecularPointer`: `composables/glass/index.ts`. The remaining type names have no by-name hit in an index (they rode `export *` from their composable files). At `bda718ac` every one of the eighteen names → 0 index files. `git tag --contains bda718ac` → `v8.0.0` first. `grep -rlw useAnimatedNumber dist --include='*.d.ts' | wc -l` → 4, so the `useCountup` row names `useAnimatedNumber` (`./motion`, `motion/index.ts:56`).
- Cure 11: `"./pager-dots"` is in HEAD `package.json` exports, so the `PagerWindow` bracket reads `PagerDots` (/pager-dots). The sweep re-run (scratch `sweep2.py`, `dist/` read under the build lock): the census's 206 rows, 94 removal rows; each removal cell with brackets, strikes and `(see _…_)` references excluded, and clauses naming what was retired/deleted/dropped/removed skipped, checks every `(/subpath)` pointer against `exports` and every backticked successor name against `dist/**/*.d.ts` → exactly the nine rows above point at a gone successor, each carries its removal bracket; successor-stranded rows with no removal bracket: **0**.
- Observed, not cured (outside the dictation): cure 12's first sentence says consumers default to `--font-stack-sans` ("Helvetica Neue" → …); at HEAD `tokens/scheme-motion.css:48-51` declares `--font-stack-text` as Plus Jakarta Sans and `--font-stack-sans: var(--font-stack-text)`, so the shipped default already paints Plus Jakarta Sans. DESIGN.md:770-773 (the `display-audacious` paragraph) still names the `data-typography-preset="brand-uniform-sans"` override and `--font-brand-sans`. The § Rows table's README row (:35, "no change") predates cure 6. FOR THE DRIVER item 5's table now sits at DESIGN.md:807-827. [2026-09-22 · adjudication r2: all four ruled CURE — cures 16, 17, 20 and 18.]

Runs:

- `timeout 600 npx vitest run tests/public-surface.spec.ts tests/design tests/components/metric.contract.test.ts tests/styles/radius-role-canon.test.ts` → `Test Files 6 passed (6)`, `Tests 174 passed | 1 expected fail (175)`.
- `grep -cE '^\|\s*`cm-serif`\s*\|' MIGRATION.md` → 1.
- `node scripts/gate-register.mjs` → `seats:60 … drift:0 … violations:0`.
- No build, no git add/commit. `git status --porcelain` at return: R2's six paths (`MIGRATION.md`, `CHANGELOG.md`, `DESIGN.md`, `demo/stories/data/metric.vue`, the O-20 `LEDGER.md`, `R2/RECORD.md`) plus `README.md`; CT2 committed at `71be2c0b` during this seat, and `3e5b95eb` (SegmentedTabs ruled the fourth break; the DESIGN.md typography value table ruled R2's) landed after the adjudication and is outside these fifteen cures.

## Adjudication round 2 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `71be2c0b` (CT2 landed; `3e5b95eb` landed after adjudication r1 and binds this lane: the `SegmentedTabs` generic is the FOURTH 10.0.0 break, type-level, runtime unchanged—the MIGRATION Status bracket and the CHANGELOG BREAKING list say four; and DESIGN.md:806-825's typography value table is R2's—bracket each stale value with the measured one, cite the declaring file, delete the row for a token declared nowhere). Read in full: RULINGS.md, the CT/DA/AC1/AC2/CT2 RECORDs, this RECORD, the live diff of every R2 path.

Re-measured myself. Every round-1 cure is on disk as dictated: `DockProps` fourteen → six in MIGRATION :498-500, CHANGELOG :268 and this RECORD :49; the Status bracket names the three paint / rendered-text rows; the `--dock-max-inline-size` bracket carries the name-set sentence; MIGRATION :1832-1843 run 74-96 columns; the LEDGER bracket sits after `(`glass/veil.css`, reachable via `glass.css`)`; README:171 is the B-1 rule; the `DEFAULT_SURFACE` bullet states landed bytes (`accent-tone-solve.ts:29` = `hsl(30 85% 96%)`); the six `bda718ac` doors each count 1-3 index files at `bda718ac^` and 0 at `bda718ac`, `git tag --contains` prints `v8.0.0` first; the nine bracketed successors each count 0 in `dist/**/*.d.ts` while `useAnimatedNumber` counts 4, `PagerDots` 1 and `"./pager-dots"` is exported; `grep -cE '^\|\s*`cm-serif`\s*\|'` → 1; vitest over public-surface / tests/design / metric / radius-role-canon → 6 files, 174 passed | 1 expected fail; gate-register seats:60 drift:0 violations:0.

The font facts behind cures 16-19, from the tree: `tokens/scheme-motion.css:48-49` declares `--font-stack-text: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`, `:50` `--font-stack-display: var(--font-stack-text)`, `:51` `--font-stack-sans: var(--font-stack-text)`, `:52` `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace`; `theme/bridges.css:86-90` bridges `--font-text` / `--font-display` / `--font-serif` / `--font-sans` / `--font-mono` onto those stacks (`--font-serif` onto `--font-stack-text`); `theme/literals.css:118` `--font-serif-math: serif`; `typography/scale.css:165-166` `--font-display-weight: 600` read by `--type-weight-display`; `typography/semantic.css:37-46` `.text-display-audacious` is `font-family: var(--font-display)`, `font-weight: var(--type-weight-display)`, `font-optical-sizing: auto`, no `font-variation-settings`. `grep -rn 'Fraunces\|font-variation-settings\|font-brand-sans\|display-variation-settings\|data-typography-preset' src` → 0. So Plus Jakarta Sans is the default in every register, and my round-1 cure 12 carried HEAD's struck premise ("Helvetica Neue" default, "engage" the bundled face) into the rewrite—the cure seat's note (1) is right and the defect is this adjudicator's dictation.

| finding | verdict | reason |
| --- | --- | --- |
| Cure return: cures 1-11, 13-15 applied | DISMISS | Verified on disk and re-measured (above). No defect. |
| Cure return note (1): cure 12's first sentence is false at HEAD | CURE | Measured: `scheme-motion.css:48-51`. The paragraph and its code block are rewritten as a rebrand, not an engage; the bracket names what HEAD's block claimed. Cure 16. |
| Cure return note (2): DESIGN.md:771-776 still names Fraunces / `WONK` / the `data-typography-preset` `:root` override of `--font-display` onto `--font-brand-sans` | CURE | Font-override guidance, ruled R2's at `9a584214` (a); the face, the axes, the token and the preset are each 0 hits in `src/`. Cure 17. |
| Cure return note (4) / `3e5b95eb` ruling 1: the fourth break | CURE | Ruled: the Status bracket and the CHANGELOG BREAKING list say four; the §4.3 row is marked like the other three (type-level; runtime unchanged) and the `SegmentedTabs` bullet moves from CHANGELOG Added into the breaks section with the `InstanceType` clause. Cure 18. |
| `3e5b95eb` ruling 2: DESIGN.md:807-827 typography value table + code block | CURE | Ruled R2's. On the palette-block precedent: a dated bracket above naming what the table printed; each stale value struck and replaced with the measured value and its declaring file; the `--font-brand-sans` and `--font-display-variation-settings` rows deleted (declared nowhere); the code block replaced by the declarations as shipped. Cure 19. |
| Cure return note (3): the § Rows table's README row says "no change"; :11 and :103 say three breaks; FOR THE DRIVER item 5 is now ruled R2's | CURE | The record must be true at the close. Cure 20. |
| CHANGELOG.md:1845 / :3242 name `--font-brand-sans` and the preset | DISMISS | Entries under earlier versions; history stands as history (the `1.28:1` ruling's shape). |
| DESIGN.md:849-878 (Fraunces axes line, the display utilities table's `WONK 1, SOFT 0` column, `.text-wonk-hover`) and :846-847 (`.dock-label` pinned to `var(--font-display)`) | DRIVER | The same values class as :806-825, outside the ruled range; `.dock-label` not re-measured. Rule whether R2 brackets them. |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output), cures 16-20: the _Consumer activation_ rewrite as a rebrand; the :771-776 display-utilities paragraph; the fourth break in MIGRATION (Status bracket + the §4.3 lead-in) and CHANGELOG (intro bracket, heading, the bullet moved); the typography value table and code block; this RECORD's truing and a `## Cure round 2 [2026-09-22]` section with the citation checks and the runs. An Opus seat applies them in order. `clean=false`.

Driver items: (1) DESIGN.md:849-878 and :846-847, above. (2) AUTHOR's post-R2 bracket pass: the letter says four breaks (`3e5b95eb`); it may cite _Six composables leave `./motion`, `./motion-core` and the root barrel_ and the nine successor brackets by heading text, and carries the `DEFAULT_SURFACE` line if it names the accent solve. (3) README.md joins R2's pathspec; the `.bundle-ratchet` rebind and the `dist-demo` rebuild stand as FOR THE DRIVER items 1-2.

## Cure round 2 [2026-09-22]

Seat: Opus (`claude-opus-5-5[1m]`), the round-2 adjudication's dictated cures 16-20 applied in order, nothing else. Line numbers are as applied (post-cure tree).

| cure | file:line | before → after |
| --- | --- | --- |
| 16 | DESIGN.md:698-712 | _Consumer activation_: the "Consumers default to `--font-stack-sans` ("Helvetica Neue" → …)" paragraph → the ships-Plus-Jakarta-Sans / rebrand paragraph (:698); the css block (:700-711) → the `"Brand Display"` / `"Brand Serif"` `@theme` form and the one-stack unlayered `:root` form; the bracket (:712) → the dictated bracket naming the "Helvetica Neue" default, `--font-brand-sans`, the preset and the inline-bridge fact. The canonical-mono paragraph stays (:714). |
| 17 | DESIGN.md:770-784 | the Fraunces / `WONK=1 / SOFT=0` / `data-typography-preset` paragraph → the `semantic.css:37-46` shape (font-family, weight 600, optical sizing, no variation settings) + the rebrand sentence + the dated bracket, wrapped at the block's ~64-70 columns |
| 18a | MIGRATION.md:20-27 | Status bracket: "adds three more breaks" → "adds four more breaks", the `SegmentedTabs` clause (type-level: `InstanceType<typeof SegmentedTabs>` no longer compiles; runtime unchanged) added; rest unchanged; rewrapped at 90 |
| 18b | MIGRATION.md:266 | `Breaking (type-level; runtime unchanged).` under _`SegmentedTabs` is generic over its option values_, placed as the three `Breaking.` lines at :231 / :246 / :254 |
| 18c | CHANGELOG.md:12-14 | the intro bracket: "adds three breaks of its own" → "adds four breaks of its own, the fourth type-level"; rewrapped at 90 |
| 18d | CHANGELOG.md:98 | `### Changed — three breaks …` → `### Changed — four breaks from the O-23/O-32 cure wave` |
| 18e | CHANGELOG.md:111-117 (was Added :121-123) | the `SegmentedTabs` bullet deleted from `### Added — the O-23/O-32 cure wave` and appended as the fourth breaks bullet after `buildTreeIndex` / `useTreeIndex`, with the `InstanceType` (TS2344) / `ComponentPublicInstance` / `findComponent({ name })` clause; wrapped at 88 |
| 19 | DESIGN.md:814-844 | `### Typography Tokens`: the dated R2 bracket at :816; Value cells struck and replaced with the measured value and declaring file (`--font-display`, `--font-serif`, `--font-sans`, `--font-mono`, `--font-display-weight`); the `--font-brand-sans` and `--font-display-variation-settings` rows deleted; the css block (:826-844) replaced by the shipped declarations. The bridges'-seam paragraph (:846) and the `--font-sans` history paragraph stay. |
| 20 | R2/RECORD.md :11, :35, :103, FOR THE DRIVER item 5, § Cure `Observed, not cured` | the five dated brackets / strike as dictated; this section |

Citations, read before writing:

```
$ sed -n 48,52p src/styles/tokens/scheme-motion.css
    --font-stack-text:
        "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif;
    --font-stack-display: var(--font-stack-text);
    --font-stack-sans: var(--font-stack-text);
    --font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace;
$ sed -n 86,90p src/styles/theme/bridges.css
    --font-text:    var(--font-stack-text);
    --font-display: var(--font-stack-display);
    --font-serif:   var(--font-stack-text);
    --font-sans:    var(--font-stack-sans);
    --font-mono:    var(--font-stack-mono);
$ sed -n 118p src/styles/theme/literals.css
    --font-serif-math: serif;
$ sed -n 165,166p src/styles/typography/scale.css
    --font-display-weight: 600;
    --type-weight-display: var(--font-display-weight);
$ sed -n 37,46p src/styles/typography/semantic.css
@utility text-display-audacious {
    font-family: var(--font-display);
    font-size: var(--type-display-audacious);
    line-height: var(--type-leading-display);
    letter-spacing: var(--type-tracking-display);
    font-optical-sizing: auto;
    font-weight: var(--type-weight-display);
    /* Balance multi-line display headlines. Text-only (no box) so
       balance is safe; degrades to unbalanced wrapping with zero break. */
    text-wrap: balance;
$ grep -rn 'font-brand-sans\|display-variation-settings\|Fraunces\|font-variation-settings' src | wc -l
0
$ grep -rn 'data-typography-preset' src | wc -l
0
```

`scheme-motion.css:48` opens the `--font-stack-text` declaration and :49 carries its value; the `:48-51` / `:48-52` citations cover the declaration as written.

Checks and runs:

- `grep -n 'three breaks\|three more breaks' MIGRATION.md CHANGELOG.md` → 0 lines.
- `grep -c '^Breaking' MIGRATION.md` → 4.
- `timeout 600 npx vitest run tests/public-surface.spec.ts tests/design tests/components/metric.contract.test.ts tests/styles/radius-role-canon.test.ts` → `Test Files 6 passed (6)`, `Tests 174 passed | 1 expected fail (175)`.
- `grep -cE '^\|\s*`cm-serif`\s*\|' MIGRATION.md` → 1.
- `node scripts/gate-register.mjs` → `seats:60 … drift:0 … violations:0`. No gate seat minted.
- No build, no git add/commit. `git status --porcelain` at return: ` M CHANGELOG.md`, ` M DESIGN.md`, ` M MIGRATION.md`, ` M README.md`, ` M demo/stories/data/metric.vue`, ` M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`, `?? docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/R2/`—R2's paths only. This round touched `DESIGN.md`, `MIGRATION.md`, `CHANGELOG.md` and this RECORD.
- Observed, not cured (outside the dictation): `d222ade8` landed during this seat and rules DESIGN.md:846-878 (the stale Fraunces / display values, round-2 driver item 1) R2's; post-cure those lines sit at about DESIGN.md:854-886 (`Fraunces axes available: …` at :865). No cure was dictated for them in this round. [2026-09-22 · adjudication r3: ruled CURE — cures 21-25; the adjacent kinetic/Semantic-Use/`.text-hero` class closed by the driver's ruling, § Cure round 3.]

## Adjudication round 3 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `d222ade8` (CT2 landed at `71be2c0b`; `d222ade8` landed during the round-2 cure seat and binds this lane: DESIGN.md:846-878 at HEAD—the `.dock-label` pin, the "Fraunces axes available" line, the semantic-classes table's `WONK 1, SOFT 0` and weight columns, `.text-wonk-hover`—is the same stale-values class as the typography table and is R2's, no deferral). Read in full: RULINGS.md, the CT/DA/AC1/AC2 RECORDs, this RECORD, the live diff of every R2 path (MIGRATION 478 diff lines, CHANGELOG, DESIGN, README:171, metric.vue:40, the O-20 LEDGER bracket).

Re-measured myself. Cures 16-20 are on disk as dictated: _Consumer activation_ says every register ships Plus Jakarta Sans and shows the `@theme` / unlayered-`:root` rebrand forms with the dated bracket; the display-utilities paragraph (:770-784) states the `semantic.css:37-46` shape; the Status bracket and CHANGELOG say four breaks (`grep 'three breaks\|three more breaks'` → 0; `grep -c '^Breaking' MIGRATION.md` → 4; the `SegmentedTabs` bullet sits fourth in `### Changed — four breaks …` with the `InstanceType` / `ComponentPublicInstance` / `findComponent({ name })` clause and is gone from Added); the Typography Tokens table carries the dated bracket, five struck-and-replaced Value cells citing `bridges.css:86-90` / `scheme-motion.css:48-52` / `literals.css:118` / `scale.css:165`, the two undeclared rows deleted, the shipped declarations as the code block; RECORD :11, :35, :103, FOR THE DRIVER item 5 and the round-1 observed bullet carry their brackets. `accent-tone-solve.ts:29` = `hsl(30 85% 96%)`; `grep -cE '^\|\s*`cm-serif`\s*\|' MIGRATION.md` → 1; `playwright` 1.61.1 at `package.json:534`; vitest over public-surface / tests/design / metric / radius-role-canon → 6 files, 174 passed | 1 expected fail; `gate-register` seats:60 drift:0 violations:0; porcelain = R2's seven paths, `.published-roster` / `.bundle-ratchet` / `package.json` untouched. Every FOR THE DRIVER item in the four lane RECORDs re-traces to a landed row in the live diff.

The `d222ade8` range, measured from the tree (HEAD :846-878 sits at :862-894 after cures 12-19): `@utility dock-label` (`typography/semantic.css:188-197`) is `font-family: var(--font-text)`, weight 400, `--type-leading-body`, `--type-tracking-normal`, size `--dock-label-size` or `--dock-control-size × --dock-label-ratio`—DESIGN :862 says `var(--font-display)`. `grep -rniE 'fraunces|wonk|font-variation-settings|text-breathe|weight-breathe|text-wonk-hover' src` → 0. The eight display utilities (:37, :73, :83, :93, :103, :113, :123, :133) are `--font-display`, `--type-weight-display` (= `--font-display-weight` 600, `scale.css:165-166`), `--type-leading-display` (1.05, `scheme-motion.css:63`), `--type-tracking-display` (−0.015em, :72), `font-optical-sizing: auto`, no axes—the table prints 300 / 350 weights, 1.1 leading, tight tracking, `WONK 1, SOFT 0`. `.text-title` (:146) and `.text-heading` (:155) read `--font-text` at `--type-weight-title` / `--type-weight-heading` (700, `scale.css:167-168`)—the table prints display 400 / 500. `.text-subheading` / `.text-prose` / `.text-body` / `.text-small` / `.text-caption` read `--font-text`—the table prints serif; `.text-caption` sets no tracking (table: wide). `.text-micro` (:234) sets only `--type-micro` and `line-height: 1.25`—the table prints serif / 500 / 1.2 / wide. `.text-mono-caption` (`utilities.css:44-49`) sets no line-height and `--type-tracking-caps` (0.1em)—the table prints 1.3 / wider. `.text-mono-small` (:51-55) and `.section-label` (:129-132, `@apply text-mono-caption` + `--muted-foreground`) are as printed. `.text-breathe` and `.text-wonk-hover` (:893-894) name a utility, a keyframe and axes that exist nowhere in `src/`.

| finding | verdict | reason |
| --- | --- | --- |
| Cure return: cures 16-20 applied as dictated | DISMISS | Verified on disk and re-measured (above). No defect. |
| Cure return note: `## Cure round 2` written where the harness text said `## Cure` | DISMISS | Cure 20(f) named the heading; the round-1 section keeps `## Cure`. |
| Cure return note: cure 18e re-flowed to keep `<V extends string = string>` on one line | DISMISS | Wording as dictated; a code span split across lines would not render. |
| Cure return note: `d222ade8` (DESIGN.md:846-878 at HEAD) untouched | CURE | Ruled R2's at `d222ade8`, no deferral; the range re-measures stale at every named site (above), and the ruling's own clause sends it to a standalone cure + re-adjudication pair before R2 commits. Cures 21-25. |
| DESIGN.md:895-897 (`.scroll-weight-reveal`, `.char-stagger > .char`, `.text-glass-legible`), :899 (the reduced-motion sentence over "all kinetic utilities"), :1490-1492 (`### Kinetic typography keyframes`: `weight-breathe`, `weight-reveal`) | DRIVER | The same class as the ruled range but outside it (HEAD :879-881 and :1490+); measured 0 hits in `src/` for the three classes and the two keyframes (`animations.css:19` holds `fade-in` only). A lane cannot mint the widening. |
| The Typography Tokens table's Semantic Use column (`--font-serif` "Body, prose, headings, math" with 0 `var(--font-serif)` readers in `src/`; `--font-display` "headings" where `.text-title` / `.text-heading` read `--font-text`); `.text-hero` (`semantic.css:55`) absent from the semantic-classes table | DRIVER | Use descriptions and an omission, not values; the round-2 dictation kept that column unchanged and `3e5b95eb` ruled values. The driver rules whether R2 brackets them. |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output), cures 21-25: the `.dock-label` sentence to the measured utility; the Fraunces axes line struck; the semantic-classes table replaced on the palette-block precedent (a dated bracket naming what it printed, then the measured table citing the declaring lines); the two kinetic bullets struck; this RECORD's truing and a `## Cure round 3 [2026-09-22]` section with the citations and the runs. An Opus seat applies them in order. `clean=false`.

Driver items: (1) DESIGN.md:895-899 and :1490-1492, and the Typography Tokens Semantic Use column / the `.text-hero` omission, above. (2) AUTHOR's post-R2 bracket pass: four breaks; the late 8.0.0 composables row and the nine successor brackets by heading text; the `DEFAULT_SURFACE` line if the letter names the accent solve. (3) README.md joins R2's pathspec; the `.bundle-ratchet` rebind (MIGRATION/CHANGELOG/DESIGN grew again) and the `dist-demo` rebuild stand as FOR THE DRIVER items 1-2 (§B-3).

## Cure round 3 [2026-09-22]

Seat: Opus (`claude-opus-5-5[1m]`). The round-3 adjudication's cures 21-25, then the driver's ruling "DESIGN.md stale-class closure" (RULINGS.md, the bullet above `## §B · Class rulings`). The adjudication section above names cures 21-25 by subject only (the numbered text sat in the workflow's structured output, not in this file); each was applied to that subject and to the measured source, nothing wider. Line numbers are post-cure.

| cure | file:line | before → after |
| --- | --- | --- |
| 21 | DESIGN.md:862-867 | "`.dock-label` is pinned to `var(--font-display)` …" struck → the measured utility (`--font-text`, 400, `--type-leading-body`, `--type-tracking-normal`, `--dock-label-size` else `--dock-control-size` (2.5rem) × `--dock-label-ratio`), citing `typography/semantic.css:188-197` and `tokens/sizing.css:276`, dated bracket |
| 22 | DESIGN.md:869-870 | "Fraunces axes available: …" struck + dated bracket (0 hits for `fraunces|wonk|font-variation-settings` in `src/`) |
| 23 | DESIGN.md:872-897 | `### Semantic typography classes`: dated bracket naming what the table printed (palette-block precedent), then the measured table: per-row declaring line in `semantic.css` / `utilities.css`, token values from `scheme-motion.css:54-77` and `scale.css:165-168`; `Axes` column → `Other` (no utility sets axes); `.text-hero` row added at :879 (ruling (c)) |
| 24 | DESIGN.md:901-904 | `.text-breathe`, `.text-wonk-hover` bullets struck + dated bracket (0 hits, with `weight-breathe`) |
| 25 | R2/RECORD.md | the round-2 "Observed, not cured" bullet bracketed; a § DESIGN.md bullet for this round; this section |
| ruling (a) | DESIGN.md:905-912, :1505-1507 | `.scroll-weight-reveal`, `.char-stagger > .char`, `.text-glass-legible` bullets and the "All kinetic utilities respect `prefers-reduced-motion`" sentence struck + one dated bracket (0 hits; `fade-in` cited at `animations.css:19`); `### Kinetic typography keyframes`: `weight-breathe`, `weight-reveal` struck + dated bracket; `gold-shimmer-slide` untouched |
| ruling (b) | DESIGN.md:820-821 | `--font-display` "headings with personality" struck + bracket (display utilities and `.text-hero` read it, `semantic.css:37-141`; `.text-title` / `.text-heading` read `--font-text` at `:147` / `:156`); `--font-serif` "Body, prose, headings, math" struck + bracket (0 `var(--font-serif)` readers; math is `font-serif-math` over `literals.css:118`) |
| ruling (c) | DESIGN.md:879 | the `.text-hero` row, from `semantic.css:55-71` |

Citations, measured before writing:

```
$ sed -n 188,197p src/styles/typography/semantic.css
@utility dock-label {
    font-family: var(--font-text);
    font-size: var(
        --dock-label-size,
        calc(var(--dock-control-size, 2.5rem) * var(--dock-label-ratio))
    );
    line-height: var(--type-leading-body);
    font-weight: 400;
    letter-spacing: var(--type-tracking-normal);
}
$ sed -n 55,62p src/styles/typography/semantic.css
@utility text-hero {
    font-family: var(--font-display);
    font-size: var(--text-hero-size, var(--type-display-audacious));
    line-height: var(--text-hero-leading, 0.84);
    letter-spacing: var(--text-hero-tracking, -0.03em);
    font-weight: 300;
    font-feature-settings: "ss01", "tnum", "lnum";
    font-variant-numeric: tabular-nums lining-nums;
$ sed -n 146,161p src/styles/typography/semantic.css   # text-title / text-heading
    font-family: var(--font-text);   (:147, :156)
    font-weight: var(--type-weight-title) / var(--type-weight-heading)
$ sed -n 234,237p src/styles/typography/semantic.css
@utility text-micro { font-size: var(--type-micro); line-height: 1.25; }
$ grep -rn -e '--type-leading-[a-z]*:' -e '--type-tracking-[a-z]*:' src/styles
scheme-motion.css:54-59  micro 1.2, caption 1.3, small 1.4, body 1.5, prose 1.618, heading 1.2
scheme-motion.css:63     display 1.05
scheme-motion.css:65,72-77  tight -0.025em, display -0.015em, snug -0.01em, normal 0, wide 0.025em, wider 0.05em, caps 0.1em
$ sed -n 165,168p src/styles/typography/scale.css
    --font-display-weight: 600;
    --type-weight-display: var(--font-display-weight);
    --type-weight-heading: 700;
    --type-weight-title: 700;
$ sed -n 44,55p src/styles/typography/utilities.css   # text-mono-caption: mono, caption, caps tracking, uppercase, no line-height; text-mono-small: mono, small, leading-small
$ sed -n 129,132p src/styles/typography/utilities.css # .section-label: @apply text-mono-caption; color: var(--muted-foreground)
$ sed -n 276p src/styles/tokens/sizing.css
    --dock-label-ratio: 0.5088;
$ for n in scroll-weight-reveal char-stagger text-glass-legible weight-breathe weight-reveal text-breathe text-wonk-hover; do grep -rn -- "$n" src | wc -l; done
0 0 0 0 0 0 0
$ grep -rniE 'fraunces|wonk|font-variation-settings' src | wc -l
0
$ grep -rnF 'var(--font-serif)' src | wc -l
0
```

Checks and runs:

- `node scripts/gate-register.mjs` → `seats:60 active:46 … drift:0 … violations:0`. No gate seat minted.
- `timeout 600 npx vitest run tests/design tests/styles/radius-role-canon.test.ts tests/styles/contrast-computed.test.ts tests/public-surface.spec.ts` (every `tests/` file naming DESIGN.md, plus public-surface) → `Test Files 6 passed (6)`, `Tests 251 passed | 1 expected fail (252)`.
- No build, no git add/commit. This round touched `DESIGN.md` and this RECORD only.

FOR THE DRIVER:

1. `.bundle-ratchet`: the rebind at the close absorbs this round's DESIGN.md growth (the typography table now carries measured token values and per-row citations; `git diff --stat DESIGN.md` against HEAD `fea0f3a0` → +159/−85, R2's rounds together).
2. Observed, not cured (outside the dictation and the ruling): DESIGN.md `### Utilities` (dock section, the `.dock-label` bullet at :1119) still says `font-family: var(--font-serif)`, `var(--type-subheading)` fallback and `font-weight: 500`; `semantic.css:188-197` reads `--font-text`, the `--dock-control-size × --dock-label-ratio` fallback and 400. Same stale-values class; the driver rules whether R2 takes it. [2026-09-22 · ruled R2's at `aca66980`; adjudication r4 dictates the bracket (cure 26), the driver applies it before R2 commits.]

## Adjudication round 4 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), standalone (outside `wf_7db62f01-99c`), read-only over the tree; this section is the one write. Datum at adjudication: master `aca66980` (`fea0f3a0` the stale-class closure ruling, `aca66980` the DESIGN.md:1119 `.dock-label` bullet ruled R2's, the re-adjudicator to dictate the bracket and the driver to apply it). Read in full: RULINGS.md, this RECORD, the CT/CT2/DA/AC1/AC2 RECORDs' FOR THE DRIVER sections, the live diff of every R2 path (MIGRATION 478 diff lines, CHANGELOG, DESIGN +159/−85 vs `fea0f3a0`, README:171, metric.vue:40, the O-20 LEDGER bracket). The LEDGER and reply letter (AUTHOR's, in flight) were not read.

Re-measured myself, from the tree. Cure 21: DESIGN :862-867 states `.dock-label` as `semantic.css:188-197` declares it (`var(--font-text)`, 400, `--type-leading-body`, `--type-tracking-normal`, `--dock-label-size` else `--dock-control-size` (2.5rem) × `--dock-label-ratio`; `sizing.css:276` = 0.5088). Cure 22: :869-870, `grep -rniE 'fraunces|wonk|font-variation-settings' src` → 0. Cure 23: the twenty rows at :876-897 each cite their declaring line and every cited line opens that utility (`@utility` heads at :37/:55/:73/:83/:93/:103/:113/:123/:133/:146/:155/:163/:199/:209/:217/:224/:234; `utilities.css:44/:51/:129`); the eight display rows are `--font-display` / `--type-weight-display` (600, `scale.css:165-166`) / `--type-leading-display` (1.05, `scheme-motion.css:63`) / `--type-tracking-display` (−0.015em, :72) / `font-optical-sizing: auto` / `text-wrap: balance`; `.text-hero` is 300 / 0.84 / −0.03em / `ss01`,`tnum`,`lnum` / tabular lining / `inline-block` / `nowrap`; `.text-title` 700 tight (−0.025em, :65) at leading-heading 1.2; `.text-heading` 700, no tracking; subheading 600 body 1.5; prose 400 1.618 pretty; body 400 1.5 pretty; small 400 1.4; caption 400 1.3, no tracking; `.text-micro` sets size and 1.25 only; `.text-mono-caption` mono, caps 0.1em (:77), uppercase, no line-height; `.text-mono-small` mono, leading-small; `.section-label` `@apply text-mono-caption` + `--muted-foreground`. Cure 24: :901-904, `text-breathe` / `text-wonk-hover` / `weight-breathe` → 0 hits. Cure 25: the round-2 observed bullet and § DESIGN.md carry their brackets. Closure ruling: :906-912 (`scroll-weight-reveal`, `char-stagger`, `text-glass-legible`, `weight-reveal` → 0 hits; `fade-in` at `animations.css:19`), :1505-1507 (`gold-shimmer-slide` stands, 3 hits), :820-821 (Semantic Use brackets; `var(--font-serif)` → 0 readers), :879 (`.text-hero`). Typography Tokens values re-read at `bridges.css:86-90`, `scheme-motion.css:48-52`, `literals.css:118`, `scale.css:165-166`. Breaks: MIGRATION :20 "four more breaks", CHANGELOG :13 / :98 "four", `grep -c '^Breaking' MIGRATION.md` → 4 (:231, :246, :254, :266 `Breaking (type-level; runtime unchanged).`), `three breaks|three more breaks` → 0. Commits re-run: `4bf53962` (newest `-S '"./animated-digit"'`), `a8a6f66b` (`"./forms"`), `5a69ed9f` (the only `v8.0.0..v9.0.0` handmark barrel commit), `ac471032` (`-S startCollapsed`), `964535cb` (`-G 'var\(--dock-max-inline-size'`), `4b1a9733` (oldest `-S '@utility glass-plate'`); `git tag --contains` prints `v8.0.0` first for `4bf53962` / `a8a6f66b` / `bda718ac` / `4b1a9733` / `4a04b43c` / `85c322dd` and `v9.0.0` first for `ac471032` / `964535cb` / `5a69ed9f`. Every heading a census bracket cites exists under its section (`_Deleted — AnimatedDigit/CompletionSeal/HeaderRibbon/InstrumentChassis/LiquidGrid/PaperBackdrop_`, `_Props — <Card>_`, `_Package subpaths_`, `_Six composables leave …_`, `_Two names leave ./color_`); 34 `O-23 L-5` brackets (21 rows + 9 successors + the header + `ControlSize` prose + the two late-row headers). `.published-roster` counts 243 `theme` / 46 `utility`, as CHANGELOG's package bracket says. Palette block figures re-read at `light-dark.css:93-150` / `color-radius.css:40-168` / `dark-arm.css:56-144` (`--card` hsl(30 85% 96%) / hsl(26 22% 17%), `--focus-ring-color`, `--neutral-0/-5`, the three ink alphas). `grep -cE '5×|8×' DESIGN.md` → 0; `PresetEditor` in CHANGELOG 10.0.0 → 0 (the declined line stays declined). metric.vue:40 carries no history voice. `node scripts/verify-export-types.mjs` under the build lock → the roster arm and closure checks pass, exit 1 only at `G-BUNDLE-RATCHET: 2915671 > 2562566` (the driver's rebind, §B-3); `gate-register` → seats:60 active:46 drift:0 violations:0. Every row of RULINGS §C R2 and every FOR THE DRIVER item of CT (1-5), CT2 (the `DEFAULT_SURFACE` line; the demo line declined), DA (four rows + the A-2 line and row), AC1 (removal row, B-1 paragraph, `cn()`, `SegmentedTabs`; roster/ratchet the driver's), AC2 (slider, InfiniteScroll, stagger, dock-max late row + the 5.0.0 bracket, four CHANGELOG lines; `offsets.css:26-32` / `overview.vue:578` / the retired spec routed to the driver, AC2 and CT2) re-traces to a landed row in the live diff or to its named owner.

| finding | verdict | reason |
| --- | --- | --- |
| Cure return: cures 21-25 landed on their subjects | DISMISS | Verified on disk, every figure re-measured true (above). No defect. |
| Cure return: the closure ruling (kinetic strikes, Semantic Use brackets, `.text-hero`) landed | DISMISS | Verified on disk (above). No defect. |
| DESIGN.md:1119-1127 `.dock-label` bullet (`var(--font-serif)`, `--type-subheading` fallback, weight 500, "typography.css", the brand-uniform-sans preset) | CURE (driver applies) | Ruled R2's at `aca66980`; `semantic.css:188-197` reads `--font-text`, the ratio fallback, 400. Cure 26, the one bracket. |
| DESIGN.md:820 `--font-display` Semantic Use bracket names the display utilities and `.text-hero` as the reader set | CURE | The closure ruling brackets the column "to the measured reader set"; `grep -rnF 'var(--font-display)' src` → 11 sites, nine in `semantic.css:38-134` and two the bracket omits: `fourier-f` (`utilities.css:87`) and `.text-pane-title` (`utilities.css:102`). Same class, one clause. Cure 27. |
| Cure round 3 FOR THE DRIVER item 2 still says "the driver rules whether R2 takes it" | CURE | Ruled at `aca66980`; the record must be true at the close. Cure 28, one bracket. |
| `.text-hero` row's Other column omits `font-optical-sizing: auto` and `max-inline-size: 100%` | DISMISS | A summary column; nothing it prints is false and the row cites `:55`. |
| Census (RULINGS §C R2, the five RECORDs' FOR THE DRIVER items, four breaks, conventions, gates) | DISMISS | Confirmations; every item re-traced (above). |
| `.bundle-ratchet` (2915671 vs 2562566), `dist-demo` rebuild | DRIVER | §B-3; FOR THE DRIVER items 1-2 stand. |

Dictated cures (exact; the driver applies 26 before R2 commits, and 27-28 ride the same pass):

26. DESIGN.md:1119-1125, the bullet's first seven lines. Before: "- `.dock-label` (typography.css `@utility`—AB.W1.T5)—canonical register / for text labels INSIDE `.dock-tab-button` (Start, Next, Submit, Done, New / Test, survey labels). `font-family: var(--font-serif)` picks up the / consumer's brand-uniform-sans preset; `font-size: var(--dock-label-size, / var(--type-subheading))` composes the audacious-dock label-size knob / (14–15px at narrow viewports, falls back to `--type-subheading` at / desktop); `font-weight: 500` (medium rung—present but NOT bold). Use" → After (wrapped at the block's ~75 columns; :1126-1127 "this instead of `.text-heading` … inside a dock pill." unchanged):
   ```
   - `.dock-label` (~~typography.css~~ `typography/semantic.css:188-197`
     `@utility`—AB.W1.T5)—canonical register for text labels INSIDE
     `.dock-tab-button` (Start, Next, Submit, Done, New Test, survey labels).
     ~~`font-family: var(--font-serif)` picks up the consumer's
     brand-uniform-sans preset; `font-size: var(--dock-label-size,
     var(--type-subheading))` composes the audacious-dock label-size knob
     (14–15px at narrow viewports, falls back to `--type-subheading` at
     desktop); `font-weight: 500` (medium rung—present but NOT bold).~~
     `font-family: var(--font-text)`; `font-size: var(--dock-label-size,
     calc(var(--dock-control-size, 2.5rem) * var(--dock-label-ratio)))`—an
     explicit `--dock-label-size` wins, else the control size ×
     `--dock-label-ratio` (0.5088, `tokens/sizing.css:276`); `font-weight:
     400`; `line-height: var(--type-leading-body)`; `letter-spacing:
     var(--type-tracking-normal)`. [2026-09-22 · O-23/O-32 R2 — the struck
     text named `--font-serif`, a `--type-subheading` fallback, weight 500
     and a brand-uniform-sans preset the package never read (0 hits in
     `src/` at HEAD).] Use
   ```
27. DESIGN.md:820, inside the Semantic Use bracket. Before: "the display utilities and `.text-hero` read it (`typography/semantic.css:37-141`); `.text-title`" → After: "the display utilities and `.text-hero` read it (`typography/semantic.css:37-141`), as do `fourier-f` and `.text-pane-title` (`typography/utilities.css:87`, `:102`); `.text-title`". Nothing else in the cell moves.
28. R2/RECORD.md, Cure round 3 FOR THE DRIVER item 2: append after "the driver rules whether R2 takes it." → " [2026-09-22 · ruled R2's at `aca66980`; adjudication r4 dictates the bracket (cure 26), the driver applies it before R2 commits.]"

`clean=false` by the letter of the closing condition: cure 26 is the ruled remainder, and cures 27-28 are two one-clause brackets found this round (a reader-set omission in a bracket the closure ruling dictated, and this RECORD's truing). No further adjudication round is warranted: all three are exact text, and the driver verifies them by `sed -n` against this section at the commit.

Driver items: (1) apply cures 26-28 in the pass that lands the :1119 bracket, then commit R2 by pathspec (`MIGRATION.md`, `CHANGELOG.md`, `DESIGN.md`, `README.md`, `demo/stories/data/metric.vue`, the O-20 `LEDGER.md`, `R2/RECORD.md`). (2) `.bundle-ratchet` rebind (2915671 at this tree) and the `dist-demo` rebuild at the close (§B-3). (3) AUTHOR's post-R2 bracket pass: four breaks; the MIGRATION headings by text as listed in § Rows; the 4 px A-2 bound; the `DEFAULT_SURFACE` line if the letter names the accent solve.
