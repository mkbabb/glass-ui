# O-20 DISPOSITION LEDGER—every inbound item re-read against published 9.0.0

**Date** 2026-09-17 · **driver** Fable (adjudicator) · **seats** 28 Opus (`claude-opus-5`, each
id read from its own subagent transcript), workflow `wf_7d30a8fd-741`, read-only throughout
(one verifier wrote a scratch probe outside the repo, disclosed) · **datum** the published
9.0.0 bytes (the `git archive v9.0.0` build; the tag resolves to commit `d4f7b24f`; `unpackedSize` 2549378 = registry) first,
`src/` at HEAD `81f7db0d` second (`git diff --stat v9.0.0 HEAD -- src/` empty) ·
**inbound** `coordination/valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` (A-1..A-14,
B-1..B-7, C-1) + the 8 CUT-CANDIDATEs and 6 HK items of
`execution/2026-08-29-batch-close/OVERFITTING-AUDIT.md` · **ACK**
`coordination/glass-outbound-2026-08-29-valuejs-o20-ack.md`.

Method: one Opus investigator per cluster (14), then one ASSUME-WRONG Opus verifier per
cluster re-establishing every state claim with its own commands. This ledger applies each
verifier's corrections over its investigator's finding and rules. Where the ruling departs
from both seats it says so and gives grounds. Word set: state ∈ {LIVE, DEAD, MOVED,
PARTIAL, NOT-APPLICABLE}; disposition ∈ {KILL, CURE-NOW, CURE-NEXT-MAJOR, DECLINE, ANSWER,
ROUTE}. CURE-NOW = non-breaking, lands in the cure wave below. CURE-NEXT-MAJOR = a
published name or paint contract moves; recorded as a ruling, NOT executed (the owner's
cut). No sibling tree was written.

Three facts hold across the whole ledger and are stated once:

1. **No sibling installs 9.0.0.** Installed pins at this census: value.js 7.0.0 ·
   keyframes.js 7.0.0 · atlas 6.0.0 · sci-report 6.0.0 · slides 3.13.0 · speedtest 4.0.1 ·
   fourier-analysis 4.0.0 · muster 3.1.0 · words 3.0.0 · bbnf-lang ^3.0.0. Every "cured
   for the consumer" claim below is prospective-on-bump.
2. **MIGRATION.md and DESIGN.md do not ship.** `package.json` `files: ["dist"]`; dist
   2,520,451 B + README + LICENSE + package.json 28,927 B = 2,549,378 = the registry's
   `unpackedSize` to the byte. README.md ships. Every doc cure that routes through
   MIGRATION/DESIGN lives on GitHub only; the letter says so, and README gets the pointer.
3. **Deep `.d.ts` files are not a published surface.** `dist/components/**` carries 381
   `.d.ts` and zero `.js`; vue-tsc emits a declaration for every module. A name visible in
   a deep `.d.ts` but on no barrel is not an API and not a defect by itself (this dissolves
   the "doorless bytes" riders on A-7, A-8, CUT-1/2, HK stroke.d.ts). It IS a defect when
   a published signature, emit, expose, or JSDoc `{@link}` names a type or symbol a
   consumer cannot import—that is the finite invariant (GAP-FourierSource, RendererStatus,
   GpuBackend, CUT-2's link).

---

## §A—defects

### A-1 · permanent `./styles` parse gate—PARTIAL → CURE-NOW

Defect half DEAD: all 124 published `.css` parse under lightningcss (transform and
import-following bundle); the lone `/*` at `styles/index.css@1507` is string-interior in
`@source "../*.js"`; the emitter cure is permanent in `scripts/lib/minify-css.mjs:87`. Ask
half ABSENT: nothing parses the published closure with a parser that rejects the class.
Verifier corrections: (a) `tests/styles/emitted-utility-vars.test.ts:64` and
`backdrop-prefix-normalization.test.ts:141` DO `postcss.parse` every dist `.css` inside
`npm test`—the literal A-1 shape (unclosed string) already throws there; (b) postcss
tolerates a `BadString` plant (40 nodes clean, `@source` params silently corrupted) which
lightningcss rejects, and lightningcss tolerates an unclosed trailing comment which postcss
rejects—neither is a superset; (c) speedtest is a live `./styles` reader
(`src/design/index.css:41`, `index.html:359`): 9 of 10 siblings read the surface, sci-report
abstains.

**Cure.** `scripts/verify-export-types.mjs` `validateCss()` (:278-322): parse the RAW
buffer with `lightningcss.transform` before the comment-strip at :294-296; a parse failure
pushes `"<file>: published CSS does not parse: <msg>"` and `continue`s (no import walk over
untrusted bytes). Rides the RELEASE seat G-NO-ORPHAN-EXPORT (SEAT-BINDING.json :66-74,
already bound to this file); no G-id in the message; receipt stays `seats:60`. The arm's
comment names the two postcss test arms as load-bearing co-detectors (unclosed-comment
class). Runs where the ask asked: `verify:package` in `release.sh:35` / `release.yml:42`.
**Born-RED** in `tests/public-surface.spec.ts` via the existing mkdtemp+`runVerifierProbe`
fixture (:617-641): plant the BadString shape into a scratch `styles/index.css`, expect the
parse message; unplanted fixture probes CLEAN. Zero published bytes move.

### A-2 · `glass-chip.css` orphaned—DEAD → KILL (residual named)

Reachable at 9.0.0: `styles/index.css` → `glass.css:1` `@import "./glass/glass-chip.css"`;
lightningcss bundle of `exports["./styles"]` = 357,365 B with `.glass-chip{…}` emitted (19
hits). Orphaned at the filer's installed 7.0.0 (bundle 349,168 B, 0 hits)—the filer
measured correctly at their pin. Killed at `4442b451` (2026-07-21), in v8.0.0. Regression
lock standing: `tests/gates/orphan-css-partial.test.ts`. `./styles.css` →
`component-styles.css` carrying 0 `glass-chip` is innocent (SFC-style bundle; Chip has no
SFC style). Residual, owned by row #43 W-CHIP (OPEN): the cure has no paint witness on
the built path (π row P1). Consumer-band note: speedtest ×1 and muster ×2 import
`@mkbabb/glass-ui/toggle-chip`, absent from the 68-key map (folded onto `./chip` at
5.0.0)—they cannot bump past the A-2 fix without that re-point.

### A-3 · unlayered `.dropdown-menu__item{color:inherit}`—DEAD → KILL

`dropdown-menu__` → 0 in the whole dist. The successor `.menu__item,.menu__sub-trigger{…
color:inherit}` sits INSIDE `@layer components` in `overlay-plate.css` (brace-depth walk).
Chrome on the served dist: highlighted row → `--accent-foreground` (producer ink wins);
row + consumer `@layer utilities` destructive → consumer ink wins. Both named victims
paint. Killed at `bca22bd9` (W-OVERLAY); rename published at MIGRATION.md:141-147.
Struck from the record: the investigator's "B + glass-ui `.text-destructive` → blue" row
was mismeasured (verifier: `(0,1,0)` loses to `(0,3,0)` in the same layer → green).

### A-3-CLASS · unlayered producer rules beating layered consumer rules—LIVE → CURE-NEXT-MAJOR

The instance died; the class did not. Verifier's census (brace-depth-0 over every CSS
reachable from `styles/index.css`): **351** non-token unlayered top-level rules, the
largest file `dist/glass-ui.css` (188, 58 UNSCOPED: `.command`, `.command__input`, …),
then sheet 42 · slider 34 (deliberate, `src:6-10`) · configurator 26 · segmented 20 ·
dialog 13 · rim 8 · view-transition 7 (the ledger challenge re-counted this file at 35—28
`html:active-view-transition-type(…)` rules the verifier's `::` filter skipped—putting the
total at ≥379; the 10.0.0 wave re-measures, and its gate's datum is "every unlayered
top-level rule", not a number) · drag 4 · scheme-motion 4 · paper 2 · scroll 2 ·
`body` in typography/semantic.css; plus `menu.css`'s PRM `@media` outside its layer.
Measured on a consumer line: `<DialogContent class="rounded-dialog max-w-sm">` → 24px, not
the declared 16px, because `:where([data-slot="dialog-content"])` at `(0,0,0)` is unlayered
and specificity never enters. 25 class-bearing Dialog/Sheet roots across 8 siblings. The
second published path `exports["./styles.css"]` → `component-styles.css` declares NO
`@layer` order at all. FR-COB-8 / FR-COB-12 (a11y resets) were not measured by either seat.

**Ruling.** Real, producer-owned, and a major's byte: no identifier moves but ~351 rules
drop a cascade rank and consumers repaint. Cure design for 10.0.0: wrap every component
stylesheet's top-level rules in `@layer components` (slider keeps its exception only as a
named allowlist entry with grounds); move `menu.css`'s PRM block inside its layer; declare
the layer order on the `./styles.css` path; a cascade gate parsing every CSS reachable from
both CSS export roots asserting each top-level style rule sits inside an `@layer`
(allowlist: token `:root`, `@utility`/`@theme`/`@property`/`@font-face`, named exceptions)
—born-RED on the measured set, riding an existing seat. Measure FR-COB-8/12 in that wave. Not executed.

[2026-09-18 · O-26 R-1 — SCOPE NOTE, two riders that attach to the class and not to any one
instance. (1) The SFC SCOPED-BLOCK HALF IS IN SCOPE, explicitly: a `<style scoped>` block can
author `@layer components {}` around its own rules, `Skeleton.vue:62` already does it, and the
cure design must say so rather than treat "component stylesheet" as meaning `.css` files only
— the precedent is what makes the tree mixed by intent, and it is also the door for every
SFC-authored rule in the set. (2) The wave PUBLISHES ITS MEASURED UNLAYERED SET AS A
CONSUMER-READABLE MANIFEST, beside the cascade gate and not inside it: the gate's datum is
"every unlayered top-level rule" and gates do not travel to consumers, so a consumer who needs
to know which of their overrides stop working at 10.0.0 gets the list by name. The label half
of O-26 R-1 (`.glass-label`, unlayered at both cuts, moved identifier) joins this set; no
piecemeal cure is taken ahead of the wave, because curing one member corrupts the born-RED
datum. The 351 figure above is SUPERSEDED — the figure that travels is "the set, not a number";
two in-house seats agree only on the depth-0 354 and disagree on all-depths (471 vs 604).]

### A-4 · `components.css` re-emits `--radius*` under `layer(components)`—DEAD → KILL

Published `components.css` (24,207 B): `:root` count 0; declarations of
`--radius`/`-lg`/`-sm` 0/0/0; every `--radius` occurrence is a read. Sole declaration site
in the dist: `styles/theme/radius.css` `@theme static{…}`. Chrome: the six radius tokens
before == after the layered import. Verifier corroborated the ORIGINAL defect on the
installed 7.0.0: `components.css` carried `:root{--radius: 0.25rem; --radius-lg: 0.5rem;
--radius-sm: 0.25rem}`—0.25rem = the 4px value.js measured for `--radius-input`, so
**A-4 was PCS-3's mechanism**; the relay sentence is sound. Killed by the emitter
(`vite.utility-emit.ts:63-75` R3—no `:root{}` block, fallbacks rewritten in place); the
`layer(components)` import is kept deliberately (`:295-299`, VALUEJS-R D8-1) and is inert.

### A-4-RIDER · published tokens removed with no MIGRATION row—LIVE → CURE-NOW

Verifier's full `@theme` name diff, 7.0.0 dist → 9.0.0 dist: 246 → 242 names, **13
removed, all 13 absent from MIGRATION.md**: `--radius-input` (→ `--radius-media`, clean
break, `31c01d2a`) · `--radius-tooltip` · `--ease-spring` · `--ease-spring-bouncy` ·
`--ease-spring-gentle` · `--ease-spring-press` · `--ease-spring-smooth` ·
`--ease-spring-snappy` · `--corner-k-soft` · `--corner-k-sharp` · `--color-surface-tint-35`
· `--text-admin-label` · `--z-index-hovercard`. Four have live sibling code readers:
`--ease-spring-smooth` (words ×11), `--ease-spring-snappy` (words ×4), `--ease-spring`
(value.js ImageEyedropper.vue:288, bbnf-lang CodeCardFan.vue:68), `--radius-input`
(value.js GradientEasingEditor.vue:274—Chrome: computes to `0px`). The verifier's fifth,
`--radius-tooltip` "in sci-report build output", does not reproduce (0 hits under sci-report,
no build directory) and is not carried.

**Cure.** MIGRATION.md gains the 13-row token-removal table in the section of the major
that removed each (the cure seat dates each by `git log -S`), each row naming the successor
or "removed, no successor". Folded with B-3 into ONE published-roster manifest gate—see
B-3—riding an existing seat; if it cannot ride without a mint, the manifest lands and the
gate is recorded as a ruling.

### A-5 · `--card-press-t` vs `--cartoon-press-t`—PARTIAL → CURE-NOW (docs)

**Answer: `--cartoon-press-t` is canonical.** It is the only press scalar in shipped bytes
(`@property` at `tokens/property-regs.css`; two reads in `.cartoon-cast` at
`glass-atom.css`) and the name DESIGN.md:478 already uses. `--card-press-t` → 0 in the dist;
a ghost of the Card `:pressable` wiring deleted at `490cc46e` (dead at the 7.0.0 pin
already). Nothing in the dist WRITES `--cartoon-press-t` and no component emits the
`.cartoon-cast` child—a consumer authors both (value.js PaletteCard.vue:30 does; its
:264 `pressVar:"--card-press-t"` is the one-word patch, theirs). Verifier additions:
`liquid-enter.css` is a SECOND styling path—`.liquid-enter.is-cel > .cartoon-cast` carries
an entry animation with no press scalar; and the stale rows also live in the `mkbabb/precepts`
repo (glass-ui tracks it as the `docs/precepts` submodule, row at `tunable-anim.md:115`;
sci-report vendors the same upstream at `sci-report/atlas/docs/precepts/`, row at :114)—
outside the fence, relayed.

**Cure.** `docs/design/tunable-anim.md:133` Kind-5 row → `--cartoon-press-t`;
`docs/design/affordance-map.md:85` Card row rewritten (press is gone; `.glass-press` and
`cards.css` no longer exist); DESIGN.md §cast gains the recipe naming BOTH paths (author
`<span class="cartoon-cast" aria-hidden>`, drive `--cartoon-press-t` via
`useLiquidPress({pressVar})` from `./motion`; `.liquid-enter.is-cel` gives the entry lag).
Born-RED (plain vitest, no G-id): every drive token named in tunable-anim.md's Kind-5 table
carries an `@property` registration under `src/styles/tokens/property-regs*.css`—RED on
`--card-press-t` today.

### A-6 · `--type-mono-caption` phantom—DEAD → KILL

0 occurrences in the published package (no definition, no reader). Never defined anywhere
(`git log -S'--type-mono-caption:' --all` → the census prose only); the producer reader
(`ContinuousTimeline.vue:343`) died at `9bc8d25f` (GF-TIMELINE, 2026-08-07, in 8.0.0).
Purge is the answer and is effected. Correction to the inbound letter: "consumer cure
landed" is false—all three value.js readers still name the token, fallback-guarded (zero
paint delta). Private follow-up, rides the cure wave (demo, unpublished):
`demo/chassis/showcase/ShowcaseFrame.vue:87` reads it bare → `var(--type-micro)`.

### A-7 · `useTabRovingFocus` unimportable—LIVE (literal) → ANSWER + DECLINE

Literal claim reproduces: `dist/tabs.js` exports `SegmentedTabs` only; no key names the
composable. **The door is `useSelectionGroup` on `./motion-core`**—its own d.ts: "the
ROVING MACHINE—`useTabRovingFocus` composed VERBATIM"; returns `rovingTabindex(idx)` +
`onKeydown(e)`; `indicatorRef` optional. Verifier proved it on the INSTALLED 7.0.0 bytes
(value.js and keyframes.js `dist/motion-core.js` both export it)—the door was open at the
pin the filer measured; both consumer seats never checked `./motion-core`. Price stated:
`model` and `containerRef` required; every `select` fires `scrollIntoView`. Exporting
`useTabRovingFocus` itself is DECLINED: package-private by its docblock, one machine one
door (`tests/gates/overfit-structure.test.ts`). 0 importers anywhere; the "live `./tabs`
readers" roll-up in the finding is 9 of 20 sites and is not carried.

### A-8 · `/timeline` export gaps—PARTIAL → CURE-NOW (narrow) + DECLINE

Limb 1 DEAD: the four components were deleted at `9bc8d25f` (8.0.0); MIGRATION.md:436-438
records they were never exported. Limb (`popoverContent`) DEAD with the dispatcher (0
hits). Limb 3 (zoom/pan) DECLINED on the record (MIGRATION.md:430-434: a timeline reports,
a slider commands; `<Slider :marks>` is the playhead). Limb 2 LIVE in a new form:
`geometry.d.ts` ships `layout/fillFor/aggregate/accentFor/HUE_OFFSET/HUE_STRIDE/HUE_STOPS/
TimelineSpan` and no published entry names them; `layout()` maps SEGMENTS to the unit
interval, not pointer→percent (the investigator's "percent<->position map" overstated it).

**Ruling.** Under fact 3 the doorless d.ts is not itself the defect. What earns a door is
a NAMED consumer need, and there are two for the hue-wrap law only: B-7's L-10 (fourier
index-interpolates the 13-stop ramp with no wrap) and KF-W7 C-15. Cure: `./timeline` barrel
re-exports `accentFor`, `HUE_OFFSET`, `HUE_STRIDE`, `HUE_STOPS` + `type TimelineSpan`
under overfitting-audit triage limb (c), the barrel comment citing B-7/L-10 and KF-W7 C-15
by name (else the next close books orphans). `layout/fillFor/aggregate` stay internal. The
functions already bundle into `dist/timeline.js` as locals, so a barrel line suffices (the
B-7 verifier's "needs a build change" is wrong: `dist/components/**` never carries `.js`).
Born-RED: `tests/public-surface.spec.ts` resolves `HUE_STOPS` and `accentFor` through
`./timeline`. speedtest's `PhaseTimeline.vue:49` (`GlassTimeline` at ^4.0.1) is a
speedtest-tranche adopt row.

### A-9 · TooltipContent has no block ceiling—LIVE → CURE-NOW

`--reka-tooltip-content-available-height` → 0 in the package; the `[data-reveal="tooltip"]`
arm declares only radius/padding/font-size; the menu arm alone caps via
`--reka-popper-available-height`. Published tooltip IS the hint arm (`role:"hint"` →
`data-reveal="tooltip"`). **Cure** (one rule block, `src/styles/glass/overlay-plate.css`
tooltip arm): `max-block-size: min(var(--overlay-max-block), var(--reka-popper-available-
height, var(--overlay-max-block))); overflow-y: auto;`—read the POPPER var (set on the
floating wrapper, inherits to every role from one declaration), not the tooltip alias the
letter names (inner-node, per-role). Honest costs, both in the letter: a tall hint becomes
a focusable scroll container (CSS-Overflow-3); the popper var is placement-derived, so a
short hint against a viewport edge is clamped too. 28 `<TooltipContent` sites across 5
repos inherit it; none sets its own ceiling; value.js ColorNutritionLabel.vue:139
(`class="contents …"`) is inert under it (no principal box). Born-RED:
`tests/styles/overlay-plate-available-height.test.ts` (readFileSync idiom).

### A-10 · Slider docblock says `$attrs.onPointerdown` is DROPPED—LIVE → CURE-NOW (comments)

**The render is right, the docblock is false, at both pins.** reka `SliderRoot.js:149`
`mergeProps(_ctx.$attrs, {…onPointerdown})` chains handlers (SliderRoot has
`inheritAttrs:false` at :17 and re-merges by hand—name and defuse it); happy-dom mounts
of the PUBLISHED `dist/slider.js` (vue 3.5.40 / reka 2.10.1) and of fourier's own pin
(reka 2.9.10 / vue 3.5.38) both fire the consumer handler. Verifier's measured order:
`["reka:slideStart","reka:update","consumer"]`—the consumer runs LAST; it cannot
`preventDefault` ahead of slide start. The falsehood ships at
`dist/components/dock/composables/useDockHold.d.ts:25`. Three sites, not two:
`src/components/slider/Slider.vue:59-64`, `src/components/dock/composables/useDockHold.ts:
19-30`, and `tests/components/ui/slider/dock-hold-contract.test.ts:11-15` ("shadows" is
separately false—mergeProps chains). **Cure:** rewrite all three to the measured truth
(lands; runs after reka's own; `useDockHold` keeps native listeners for the reasons that
are true—one acquire path for pointer+touch, window-scoped release, capture-independent).
Born-RED: grep the three files for `DROPPED`/`shadows` (RED: 3), plus a durable mount test
in `tests/components/slider/` asserting an `onPointerdown` spy fires on the published
Slider (GREEN today, REDs if a reka major severs the channel). fourier's PD-1 rider
("never template bindings on the forwarding chain") was sized against a false producer
claim—relayed.

### A-11a · FR-COB-7 dead border arms / single-channel press—DEAD → KILL

`btn-pill` → 0 in the dist and `btn-glass` survives only as the property `--glass-btn-press-t`;
`.glass-wash` is the wash TIER class (`ladder.css`, DESIGN.md:511) and the Button no longer
composes it—it composes `"button tap-squish focus-ring" + glass-capsule glass-specular-track`; its own `border: 1px solid
var(--button-edge)` paints (destructive arm proves it); `glass-capsule.css` declares no
border; no `aria-pressed` register exists. Killed by W-BUTTON (#80, `70dc0f06`). Relay to
fourier: the F.W3/W4 note "must not assume a border channel exists" is FALSE at 9.0.0—
`--button-edge` is a live per-tone seam; feedback is two channels (`.glass-capsule-hover`
scale + specular track driven by `--glass-btn-press-t`). `./button` is read by 7 siblings
(fourier 34 files, words 30, speedtest 17, muster 14, sci-report 7, atlas 6, slides 2;
value.js 0 outside its docs)—all on pre-9 pins.

### A-11b · was the v7 pressed-paint removal intentional?—NOT-APPLICABLE → ANSWER

Yes, and at 9.0.0 it is architecture: Button is THE COMMAND—no `pressed` prop, no
`aria-pressed` paint, tone narrowed to `{neutral, destructive}`. A stray `aria-pressed`
gets only the specular cohort's gleam (`--specular-intensity` 0.16 on `::before`) and two
a11y arms (`prefers-contrast: more`, `forced-colors`)—not a state paint. Re-home
targets, both public with real ON paint (background + border + ink + flood + scale):
`./chip` `<Chip mode="selectable" v-model>` and `./toggle-group` `ToggleGroupItem`;
SegmentedTabs and the dock controls also retain pressed paint. FR-COB-6's F.W1 rider
resolves to its second branch; the producer will not add a pressed treatment.

### A-11c · focus ring 1.94:1—DEAD → KILL

The filed figure reproduces at its pin (1.930:1, same instrument). 9.0.0:
`.focus-ring:focus-visible{outline: 2px solid color-mix(in oklab, var(--foreground) 48%,
transparent); outline-offset: 2px}`; measured on every library surface—light
3.13 / 3.11 / 3.09 / 3.01 (`--neutral-2`), dark 4.21 / 3.79 / 4.13 / 3.86; `outline-none`
→ 0 in the dist. Cured by W-BUTTON C-7. Two residues recorded: light-mode headroom on
`--neutral-2` is 3.01:1 (the bar to two decimals—any darkening of a light surface token
re-runs this cell); `outline-offset: 2px` puts the ring outside the button, so over a
rendered canvas the adjacent surface is the canvas (SS-13 #2's caveat survives; the
consumer's cell).

### A-11d · generated color-mix fallback paints foreground-on-foreground—MOVED → CURE-NOW

The Button is cured (`components/button/styles.css`: `@supports` 0, `color-mix` 5, bare).
The class survives, relocated: `dist/styles/components.css` @16331 emits, inside `@media
(hover:hover)`, `.hover\:bg-foreground\/5:hover{background-color:var(--foreground)}` outside
the `@supports (color:color-mix(in lab,red,red))` guard, and `.hover\:text-foreground:hover
{color:var(--foreground)}` unguarded; the configurator ships both classes on
`data-slot="configurator-reset"` (ConfiguratorRow.vue:156) and `.configurator-layer-
trigger` (ConfiguratorLayer.vue:119, no ink → inherits `--foreground`). On a pre-2023
engine both hover to **1.00:1**; `tokens/light-dark.css` guards its overrides with
`@supports (color: light-dark(…))`, so the legacy engine really keeps `--foreground`.
`./configurator` is read by fourier (4 files), muster (4), value.js (1). It is the ONLY
`background-color` synthesized pair among the 11 in that sheet.

**Cure** (verifier-corrected): strike `hover:bg-foreground/5` (+ the row's rescuing
`hover:text-foreground`) from both class strings; author both hovers in
`configurator/styles.css` as bare `color-mix(in oklab, var(--foreground)
calc(var(--fill-hover) * 100%), transparent)` INSIDE `@media (hover: hover)` (dropping the
media condition would newly apply the fill on coarse pointers—a paint change), with the
row's hover ink declared. `--fill-hover` = 0.05 → modern paint byte-identical; a legacy
engine drops the declaration and keeps the plate (no masking fallback). Note the seat's
cascade reasoning was wrong: `components.css` IS layered on the consumer path
(`index.css` imports it `layer(components)`), so `configurator/styles.css` (unlayered) wins
by layer, not import order. Born-RED: an arm on `tests/styles/emitted-utility-vars.test.ts`
asserting zero `background(-color)` declarations with a bare `var(--foreground)` value
outside an `@supports (color: color-mix(…))` block—RED on exactly one rule today.

### A-11e · `btn-glass` / `glass-btn` near-collision—DEAD → KILL

Mechanism confirmed at v4.0.0 (`surfaces.css:57` `.glass-btn` / `:182` `.btn-glass`);
already gone at v7.0.0 (`git grep -lE '\.btn-glass|\.glass-btn' v7.0.0 -- 'src/**.css'`
→ empty); at 9.0.0 the only `glass-btn` string is the custom property `--glass-btn-press-t`.
Two hygiene residues, left standing (renames of published surfaces, not defects): the
property name is now a shared press register; `src/styles/utilities/btn.css` has no button
in it. The "only in fourier's audit records" sentence is not carried (speedtest docs carry
~15 more; no live source hit anywhere).

### A-12 · FR-MSP-12 accent-on-accent fallback—NOT-APPLICABLE → ROUTE (fourier-analysis)

Producer share is zero: the 11 synthesized `@supports` pairs in the published sheet contain
0 `--accent-` tokens; glass-ui ships no `.info-chip`/`.settle-*`. The failing rule is
fourier's own SFC (`MorphShapePreview.vue:165-172`) compiled by fourier's own Tailwind
(`FourierMorphDemo-*.css`, scoped hash). What the producer pays: the recipe—author the
mix bare so a legacy engine drops the declaration and lands on the `--muted` plate the
record measured legible (4.43/3.76 · 4.74/5.58); no guard-synthesis policy on either side
(the consumer's own "coin-flip" tension is the ground). A-11d is the producer applying the
same recipe to itself.

### A-13 · `--rainbow-*` declared by both producers—LIVE → ANSWER + DECLINE

Facts: glass-ui declares the 14-name family in a plain unlayered `:root`
(`tokens/scale-paper.css`, reached with no `layer()`); its own readers are
`@utility rainbow-vivid/rainbow-pastel`, `metal.css`, the rim's default stops
(`scroll-progress-rim.js:22-28`) and the `--color-rainbow-*` bridge. keyframes.js's
`design-idioms.css:12-21` overrides SIX vivid names + its own `--rainbow-cyan` in a
deliberately later unlayered `:root` ("authoritative for the demo") and declares no
`--rainbow-indigo` and no pastels—so its `.rainbow-vivid` gradients are today six hsl
crayons spliced with one oklch indigo, and `.rainbow-pastel` is untouched. atlas passes
`:stops` (required prop) so the rim defaults never fire there.

**Ruling—departs from both seats, which ruled CURE-NEXT-MAJOR (a rename to `--glass-rainbow-*`).**
DESIGN.md:1732 publishes the family by name and README.md:156 says consumers override any
token locally: the collision the letter reports IS the library's documented override
surface, exercised by the one consumer that collides, on purpose. Every token in the
library (`--foreground`, `--card`, `--radius`) is "generic" in the same way; renaming this
family would withdraw an invited affordance for zero measured gain and spend a major on a
hygiene report the filer itself did not call a defect. DECLINED. The answer to value.js:
the family is the override point; a partial override produces a mixed gradient by design of
the cascade, not by defect. Relay to keyframes.js: complete the override (indigo + the
pastel seven) or own the gradient outright.

### A-14 · `--shadow-glass-*` bridge does not emit—LIVE → CURE-NOW (README)

Holds exactly as filed: `bridges.css` is one `@theme inline{}` block, `:root` count 0; each
`--shadow-glass-*` name occurs once, inside it; real declarations are `--glass-shadow-*` in
`tokens/glass-fx.css`. Verifier confirmed non-emission at the ARTEFACT in four consumer
builds (slides/atlas/speedtest/keyframes: 0 `--shadow-glass-`, 22-30 `--glass-shadow-*`).
Corrections: the bridge covers FIVE of the SIX shadow names (no `--shadow-glass-capsule`);
README.md:156 "Consumers override any token locally per project" is a positive falsehood
for every `@theme inline` bridge name and must be CORRECTED, not appended to. Two
adjacent findings fold in here because README is the only doc that ships: the
`--motion-accent → --easing-curve-accent` seam (B-4) and the `useClipboard` `{status, copy,
invalidate}` contract (B-5) are undiscoverable from an install.

**Cure** (README.md §Design tokens + a one-line pointer at `src/styles/theme/bridges.css`):
bridge names generate utilities and never emit a custom property; the override point is
always the tokens.css spelling (`--glass-shadow-quiet`…—slides `deck.css:190-192` as the
worked example); five of six; the easing seam one-liner (one free arm, `--motion-accent`);
the MIGRATION.md GitHub pointer (fact 2). Born-RED (plain vitest): bridge LHS names never
appear in a `var()` read in `src/`/`demo/` (anti-regression, green) and README carries the
bridge-emission paragraph (red today).

---

## §B—asks

### B-1 · Chip `xs` rung—LIVE → CURE-NOW (with a spec amendment)

Published `chipVariants.d.ts` SIZE = sm/md/lg, no xs; sm (`px-2.5 py-1 text-caption`) is
10/4px at 12-16px FLUID and—the fourth axis—`text-caption` is `font-style: italic`
(user data in synthesized italic). The consumer's pill is 6/2px at 11px fixed. Zero
consumers read the size axis (all three Chip sites pass mode/shape only). **Cure:** SIZE
`xs: "gap-0.5 px-1 py-0.5 text-micro"` + ICON_SIZE `xs: "size-6"` (tsc requires both);
README `xs | sm | md | lg`; born-RED in `tests/components/chip.contract.test.ts`
(assignability RED at vue-tsc; runtime `SIZE["xs"]` undefined is silently dropped by
`joinClassValues`, so the assertion fails rather than throws). Union widens only; default
md unchanged. **Spec amendment, dated bracket, same edit:** row #43 W-CHIP's sealed spec
(`docs/tranches/BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md`) pins `size?: "sm" | "md"
| "lg"` at §3.5:445, re-ladders pads to 8/12/20 at §3.6, and X-G4 at :467 admits
`pad-inline ∈ {8,12,20}`—all three gain `xs` / 4 (series-legal: §ADJ:365 names
4·8·12·20). Landing now is right because #43's cut is breaking and this rung is not.
Letter caveat: `@media (pointer: coarse)` gives every INTERACTIVE chip a 44px min box, so
xs is for the static pill only.

### B-2 · publish the caught-plate paint/stacking contract—PARTIAL → CURE-NOW (reshaped) + DECLINE

DECLINED as filed: the ~1050px clamp, `--pane-max`, `.pane-container`, `.dock-band` and the
`absolute inset-0` atmosphere canvas are value.js's own demo shell (0 hits in the dist;
presets live in consumers); the stacking half is already published (`--z-behind/-background/
-content` in `tokens/scheme-motion.css` + DESIGN.md:332)—the consumer's canvas simply
carries no z rung. What IS ours: 9.0.0 minted `@utility glass-plate{… background:
var(--glass-veil)}` (`glass/veil.css`, reachable via `glass.css`)—the roster diff
7.0.0→9.0.0 removed `glass-fill`, `text-admin-label`, `touch-hit-area` and added exactly
this one—and documented it nowhere (0 hits in DESIGN/MIGRATION/README). **Cure:**
DESIGN.md gains "### Plate register" beside the tier table (:505-525)—what `glass-plate`
paints, what it deliberately does not supply (position/z/radius/size; `.dock-plate` adds
`position:absolute; inset:0; z-index:-1` itself), and the one stacking sentence (a plate
sharing a box with an `absolute inset-0` decorative layer takes its own positioning + a
`--z-content` rung); the same prose as a header block in `src/styles/glass/veil.css`,
which DOES ship. Born-RED: the cure seat first measures the full `@utility`-roster vs
DESIGN.md gap; if `glass-plate` is the only hole, the roster assertion lands whole,
otherwise it lands on the measured set and the rest is recorded. Anchor correction: the
DESIGN-mirror precedent is DESIGN.md:360, not :425.

### B-3 · `text-admin-label` gone; `.paper-texture` absent; class-removal manifest—LIVE → CURE-NOW

RESTORE declined (`6b450f22` was a deliberate clean break; no shims). RETARGET blessed and
corrected: the drop-in is `text-mono-micro` (`font-family: var(--font-mono); font-size:
var(--type-micro); line-height: 1.25; letter-spacing: 0.025em`)—11px vs the v7 10px,
lh 1.25 vs 1; add `uppercase font-medium` where the caps and 500 weight carried meaning.
`.paper-texture`: the letter's third clause ("neither surviving `@utility paper-*` is a
drop-in") is TRUE—`paper-grain-overlay`/`paper-underpaint` paint relief/tooth on a
`::after`/fixed layer with `mix-blend-mode`; the v4 recipe painted `var(--paper-clean-
texture)` in the element's own box with `background-blend-mode: multiply`. The true
drop-in is those four v4 declarations; both tokens (`--paper-clean-texture`,
`--paper-texture-size`) still ship—compose them (words' `.paper-texture-overlay` is the
sibling precedent). The ghost bites today: `class-names.ts:84` buckets
`admin-label` as `font-size`, so `cn("text-caption","text-admin-label")` returns
`"text-admin-label"`—the real class is EVICTED (verifier executed the published chunk);
the only one of 24 regex names with 0 dist utilities. Second consumer nobody counted:
keyframes.js 16 sites / 10 files at 7.0.0 (one a CSS comment), beside fourier's 7 / 4.

**Cure.** (1) `src/components/_shared/class-names.ts:84` strike `admin-label|`; born-RED
unit `cn('text-caption','text-admin-label') === 'text-caption text-admin-label'`. (2)
MIGRATION.md §9.0.0 gains a `_Classes and utilities removed_` table: `glass-fill` (→ the
`--glass-fill-tinted` token recipe), `text-admin-label` (→ `text-mono-micro`),
`touch-hit-area`, and the back-filled `.paper-texture` (→ the four-declaration recipe)—
plus the A-4-RIDER token table. (3) `src/styles/tokens/scale-paper.css:114` comment names a
class the library stopped shipping at `490cc46e`. (4) **The manifest gate**—ONE
published-roster ratchet over `@theme` custom-property names AND `@utility` /
`@layer components` class names, committed as a datum in the `.bundle-ratchet` idiom,
failing on any name present in the datum, absent from HEAD's emitted roster, and unnamed
in MIGRATION.md—RED today on 13 tokens + 3 utilities. Rides an existing RELEASE seat
(the cure seat binds it; candidates G-BUNDLE-RATCHET's file or G-NO-ORPHAN-EXPORT's); if
no existing seat can carry it without a mint, the datum + manifest land and the gate is a
recorded ruling. Anchor: MIGRATION's class-break precedent is :141-148 in the working tree
(the seats measured the published copy, which is five lines shorter).

[2026-09-17 · O-20 CLOSE-DOCS, ratifying the driver's disposition · **the shipped ratchet
pins `@theme` custom-property names AND `@utility` names, and NOT `@layer components`
class names.** The class half was REFUSED WITH GROUNDS by Lane R act 9
(`execution/2026-09-17-o20-cure/R/RECORD.md` §9, "REFUSED WITH GROUNDS — `@layer
components` class names are OUT of the roster") and the refusal was ruled SOUND by that
lane's adjudicator seat (`laneR:adjudicate`,
`wf_a0880ff6-f7d/agent-a69aaf1849b9aab43.jsonl`: "SOUND: `@layer components` class names
stay OUT of the roster"); `R/RECORD.md` itself records only the cure round that followed
(`## CURE ROUND 1`, seven cures and no class half). The grounds are measured, not argued:
scoped to `@layer components`,
the 7.0.0→9.0.0 interval fires three class removals and two of them are FALSE—
`.accent-tone` and `.glass-drag-lift` still ship, having moved out of a layer block into
an unlayered rule, which is precisely the artefact A-3-CLASS counts 351 of and rules
CURE-NEXT-MAJOR; widened to every hand-authored class in the closure the same interval
moves 134 names out and 107 in, almost all component-internal BEM leaves
(`.completion-seal__disc`, `.timeline-popover-body`, `.checkbox__seat`). The datum that
landed is `.published-roster`, 289 names = 242 `@theme` + 47 `@utility`, riding
`G-NO-ORPHAN-EXPORT` with no mint. The rest of item (4)—the datum, the manifest
predicate, the born-RED, the wiring—landed in full; this is a narrowing of scope, not an
escape hatch.]

### B-4 · re-scope `--viz-easing` onto the easing seam; `--viz-amber`—DEAD → KILL

`viz-easing` → 0 in the dist and in `src` at every revision (never minted); the seam it would
have duplicated shipped with W-EASING (`1bc09dde`, 8.0.0).
`dist/easing.js:71` writes `--easing-curve-accent: var(--motion-accent, var(--viz-legendre))`
on the EasingCurve WRAPPER—so exactly ONE arm is free, `--motion-accent` (an ancestor's
`--easing-curve-accent` is shadowed on that subtree; the letter's "both arms free" is not
carried). `--viz-amber: var(--section-color-5)` = `oklch(0.530 0.124 69.6)` measures
5.018:1 on `--card`, 5.214 on `--background`, 7.721 dark, 4.518 under the consumer's own
8% wash—the 3.54 figure (`hsl(35 70% 42%)`) is gone since `08aa1902` (4.1.0). Struck
from the finding: "FR-EMT-5's inversion is gone" compared two unwashed figures; under the
wash it PERSISTS (4.518 selected vs 5.013 unselected) and is consumer-side by the
consumer's own ruling ("the cure is the wash, not the token"). The carry-note is
fourier's own file (EasingPicker.vue:47) and is theirs. Relay to fourier: `web/src/
style.css:116-123` still overrides `--viz-amber`/`--section-color-5` to `hsl(35 76% 35%)`
in an unlayered `:root` that shadows ours by import order—4.709:1 where the library paints
5.214; the fix has become the regression; strike the block. Discoverability of the seam →
A-14. Census corrections: `--motion-accent` = value.js 3 code files; `--easing-curve-
accent` = 0 code files anywhere; `--viz-amber` = fourier 10, slides 1, speedtest 1, words 0
(the seats' "words" figure was the vendored copy at `words/frontend/glass-ui/`, not a consumer,
and the challenge found no `--viz-amber` there either).

### B-5 · `./clipboard` subpath—LIVE → DECLINE

`./clipboard` never existed; `useClipboard` + `writeClipboard` ship on `./dom` (12 symbols,
6,815 B, `sideEffects: ["*.css"]` → shakeable) AND the root. All 18 consumer imports (15
value.js + 3 fourier) come from the root barrel, none through the Pinia compat barrel the
row indicts (that barrel carries `EASING_OPTIONS`). fourier's own 2026-06-16 audit already
named `./dom` canonical and has not walked through it. A third door to two symbols is a
permanent surface for zero capability; per-symbol subpaths do not generalise. **Answer:**
`import { useClipboard, writeClipboard } from "@mkbabb/glass-ui/dom"`—and, for fourier
(^4.0.0), `copied` was REMOVED at 7.0.0 (MIGRATION.md:670; the `/dom` type-census rows are
:1111-1112): the three sites destructuring
`{copied, copy}` (useMorphConfig.ts:58, UserSlugBar.vue:23, EquationResult.vue:15) must
also carry `copied → status.value === "success"`; value.js is already on `{status, copy}`.
Re-file with a measured bundle delta against `./dom` if a narrower key is still wanted.

### B-6 · Slider drag surface has no cursor affordance—LIVE → CURE-NOW

`components/slider/styles.css` (7,416 B) has zero `cursor`; the slider chunk borrows no
cursor-bearing recipe; a full census of the 45 cursor rules in the published CSS matches
no slider selector. The subject is the SLIDER (fourier's local `GlassTimeline.vue:21`
mounts `<Slider>`), not the 9.0.0 Timeline (which has no drag surface); the challenge counted
47 `cursor:` declarations in the published CSS (the seats said 45 rules), none on a slider
selector. **Cure** (three
rules, `src/components/slider/styles.css`, hooks already shipped): `.glass-slider{cursor:
grab}` · `.glass-slider[data-held], .glass-slider:active{cursor: grabbing}` ·
`.glass-slider[data-disabled]{cursor: not-allowed}`—the house drag idiom (sheet :101/:257,
tabs drag.css :22/:27). Stated to fourier: the deleted baseline was `cursor:pointer` on
`.glass-track`; this is an upgrade to the drag idiom, not a restoration. 16 `./slider`
sites across 6 repos gain it on bump. Born-RED: `tests/styles/slider-cursor-affordance.
test.ts`.

### B-7 · sidebar ramp headroom—LIVE → CURE-NOW

The ramp is exactly 13 stops, no fallback, in three files (`color-radius.css` light,
`dark-arm.css`, `light-dark.css` paired) + 13 bridges; the wrap law (`(2 + 4i) % 13`,
gcd(4,13)=1) lives in `geometry.d.ts` with no door—see A-8 (cured there). D-M4's half is
LIVE on published values vs `--card: hsl(30 85% 96%)` (both seats' oklch→sRGB WCAG agree
to 2dp): stop 3 4.52 (thin) · **4 4.27** · 5 5.02 (the retune shipped) · **6 4.39** ·
**10 4.24** · **11 3.51**—stop 11 was never measured by the filer (their paper has 11
chapters) and is the worst of the thirteen, byte-identical across five majors. Dark arm
clears 4.76-7.85 (verifier's math; the investigator's 4.98-8.21 is not carried).
`tests/styles/contrast-computed.test.ts` has 0 `--section-color` rows. The library paints
its own text from the ramp: `typography/utilities.css` `var(--section-label-accent,
var(--section-color-7))` (5.33, passes). **Cure:** drop L on light stops 4/6/10 by ~0.03
and 11 by ~0.09 in BOTH `color-radius.css` and `light-dark.css` (lockstep or the light arm
forks; hue/chroma untouched; dark untouched); DESIGN.md:930 gains "index with `i mod 13`";
born-RED section in `contrast-computed.test.ts`: all 13 light stops ≥ 4.5:1 as text on
`--card` (RED on 4) + the stop-7 label assertion. Not the cure: a 14th stop (moves the
cliff) or a producer-side `var()` fallback (the consumer interpolates by index). A token
VALUE retune is not an API break (stop 5 moved in 4.1.0). Relays: atlas aliases stop 4
(`--viz-program-rural-healthcare`) and re-baselines its `cream-law.gate.ts:374-380`
fixture as it did for stop 5; sci-report's four strand fills shift transitively; fourier's
`style.css:121/126` pins stop 5 only; speedtest's two hits are comments.

---

## §C—question

### C-1 · Alert: is foreground-ink-on-wash the total contract?—MOVED → ANSWER + CURE-NOW

**Answer (substance stands):** foreground ink is the terminal contract; no per-tone
on-tint ink rung (`--success-ink`) is coming. At 9.0.0 Alert has no tone wash AT ALL—
W-ALERT (#33, `76bfae26`, 8.0.0): five tones ride ONE `.glass-quiet` rung; ink
`text-card-foreground` = `--foreground`, 16.19:1 light / 11.17:1 dark on `--card`; AF-6's
failures cannot recur on Alert by construction. The only on-tint rung is keyed to the
SURFACE (`:where(.feedback-tone,.glass-capsule){--muted-foreground: var(--on-glass-muted-
strong)}`) and carries Toast, the one tint that survives. Adopt Alert per AF-7, set
`announce` explicitly (defaults `off`), drop the `bg-success/10 text-success` fork whole.

**Verifier overturn, upheld: the glyph channel is DEAD.** BASE ends `[&>svg]:text-current`
and TONED adds `[&>svg]:text-(--tone)`; `cn()` is a bucketed deduper (not twMerge) and
passes both through; Tailwind 4.3.3 emits `.[&>svg]:text-(--tone)>svg` BEFORE
`.[&>svg]:text-current>svg` at equal specificity, so currentcolor wins—Chrome 151
computed glyph color = `rgb(28,25,23)`, the plate ink. A toned Alert is pixel-identical to
a neutral one. The collision predates the recompose (v7.0.0 BASE already carried
`text-current`; harmless then because the wash carried the tone); 8.0.0 removed the wash
and promoted the dead channel to the only channel—that is a regression, disclosed in the
letter. **Cure:** delete `[&>svg]:text-current` from BASE (`src/components/alert/index.ts:46`)
—no dist rule sets svg color under the alert, so the neutral arm is paint-identical and
no sibling mounts a toned Alert. Born-RED: a unit asserting BASE carries no `text-current`
arbitrary variant, and the cure record carries a Chrome computed-color probe on the toned
svg (the paint witness). Doc half → the manifest wave: MIGRATION §8.0.0 carries no Alert paragraph, and :3500 (under `### The
tone-on-glass recompose` at :3498, in the `## BA → 4.0.0` section) still says Alert renders
tinted glass—add the recompose paragraph, bracket :3500.

---

## CUT-CANDIDATEs (audit-origin)

### CUT-1 · `FOURIER_TANGENT_EPS`—LIVE → CURE-NOW (delete)

One types-only hit in the dist, unreachable (no key resolves to `dist/components/**`, 0
`.js` there; typesVersions 62 subpaths, 0 patterns); the WGSL owns its own copy
(`render.wgsl.ts:45`); 0 sibling hits. Delete `constants.ts:84-88`.

### CUT-2 · `FOURIER_STROKE_RUNGS`—LIVE → CURE-NOW (de-duplicate, lower-surface arm)

Not unused—TRIPLICATED by value: `constants.ts:55`, the demo story's
`STROKE_RUNGS = ["4","8","12"]` (:270), the smoke test's `[4, 8, 12]` (:194); nothing
clamps `markStroke`. The published `constants.d.ts:85` JSDoc `{@link FOURIER_STROKE_RUNGS}`
names a symbol no consumer can import (fact 3, JSDoc clause). **Ruling: the investigator's own
lower-surface alternative, which the verifier preferred** (publishing a name with zero
consumers is the audit's own "minting ahead of the consumer"): keep it off the barrel; demo + test deep-import
`@glass/components/fourier-field/constants` (house idiom, the story already deep-imports
`rendererStatus`); replace the `{@link}` at `constants.ts:111` with prose ("one of 4 | 8 |
12").

### CUT-3 · `ringsAt`—LIVE → CURE-NEXT-MAJOR

Genuinely published on `./fourier-field` (runtime export list + type barrel); 0 readers
anywhere; a CPU mirror of the WGSL ring law (`render.wgsl.ts:170`) with nothing
cross-checking the two, and the first smoke test re-derives the predicate it tests. At
10.0.0: drop from the barrel, keep the function exported from `mint.ts` (the test is its
external site), strike the tautology test (:196-201), keep the two behavioral tests. Do
NOT wire the demo story to it. Recorded, not executed.

### GAP · `FourierSource`, `RendererStatus`, `GpuBackend` not nameable—LIVE → CURE-NOW

`FourierFieldConfig.source: FourierSource` is published; `FourierSource` is on no entry.
Worse (verifier): the published `FourierField.vue.d.ts` emits `rendererStatus: (status:
RendererStatus)`, exposes `Readonly<Ref<RendererStatus>>` and `backend: () => GpuBackend`,
and NEITHER type resolves from any of the 68 entries—the library's own stories deep-import
them. Cure: type-only re-exports—`type FourierSource` from the fourier-field barrel;
`type RendererStatus, type GpuBackend` from one published door the cure seat picks (the
component barrels that emit/expose them, or one shared door—measured, not guessed);
the demo cast at `fourier-field.vue:281` becomes a plain annotation. Born-RED: type-level
imports in `tests/public-surface.spec.ts` (vue-tsc RED today). The cure seat also states
whether `verify-export-types.mjs` can carry a nameability arm cheaply (every type in a
published signature is importable from a published entry); if not, it is a recorded
ruling.

### GATE · EXPORT-REACH hole—LIVE → CURE-NOW (rides #19, no mint)

`tests/gates/overfit-structure.test.ts` `publishedSurface()` treats a NAMED re-export
(`export { a } from "./x"`) as publishing every `export const` in `x` (BRACE_RE branch
:147-150 recurses and hoovers). That is why CUT-1/2 survived the 9.0.0 close green. Fix:
a named re-export publishes only its listed names; `export *` still hoovers. Corrected rule
→ exactly 3 leaks tree-wide: the two fourier constants + `dock/composables/
dockCrossfadeContext.ts :: useOptionalDockCrossfadeContext` (the cure seat disposes it:
drop the keyword or delete, on measurement). The gate's row is #19; no new seat.

### CUT-4 · `ColorResolver` type · CUT-5 · `defaultBlobColorResolver`—LIVE → CURE-NEXT-MAJOR + CURE-NOW (docs)

Both published on `./color` (`color.js:83`, `index.d.ts:15,:69`). The audit's "zero
siblings" for row 5 was FALSE by ~12 weeks: slides imports `defaultBlobColorResolver` at
`Slide01.vue:11,35` and `Slide05.vue:24,43` (since `89c5d66`, 2026-06-07) and binds it to
`<FourierField :color-resolver>`—a prop that died at `4a86570b` (2026-08-12, first carried by
v9.0.0; REQUIRED at slides' 3.13.0, so "optional" in the shipped docblock was false for that era too). At
10.0.0: delete both (one decision; the type exists only as the const's annotation; the
const is a one-line composition of two exports on the same subpath); slides drops the
binding and keeps `color="var(--viz-fourier)"` (its `variant="hero"/"final"` props are
also gone—same two files, slides adopt row). **NOW, non-breaking:** the shipped docblock
lies—`dist/composables/color/index.d.ts:40-41` and `:66-67` point consumers at a
`<FourierField colorResolver>` prop 9.0.0 does not ship (`src/…/color/index.ts:38-41,
:152`), and `useResolveTokenColor.ts:17` d.ts names the type in prose (rewrite as
"a `(css) => rgb` resolver"); MIGRATION.md has ZERO `colorResolver` rows for a breaking
prop removal with a live consumer → §9.0.0 row; MIGRATION:1020 lists `FourierFieldProps` as
live on `/fourier-field` but 0 hits in the dist → strike; the `/color` published-type census
never listed `ColorResolver`, `ColorHarmony`, `DeriveBlobPaletteOptions` → add rows (so
the 10.0.0 strike has something to strike).

### CUT-6..8 · `darkModeSyncScript` options—LIVE → CURE-NOW (do not cut)

All three options live and functional on the published `./dark` (300 B default, CSP hash
`sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=`); 9.0.0 is their first carrier
(minted `c4dbf53b`, no 8.1.0 exists); 0 importers (4 sibling hits, all prose). The audit's
triage (c) was ALREADY SATISFIED before the row was written: DECK-RELOCATION.md:31,:147
rules "extend, don't lift—darkModeSyncScript gains {defaultDark, queryOverride,
normalize}; slides' block collapses to a config call at adopt". Four repos hand-roll the
semantics (slides `main.ts:28-54`, sci-report `dashboards/index.html:15-27` a
transcription of the emitted bytes, value.js `color-picker/index.html:163-172`, glass-ui's
own `demo/main.ts:86-99`—after module load, so the library's own shell ships the FOUC
its primitive exists to kill; `index.html` has no parse-time stamp).

**Cure** (verifier-amended): (1) **normalize fails open**—with a throwing `setItem`, the
default emission stamps DARK but `{normalize:true}` stamps NOTHING (getItem → resolve →
setItem → toggle inside one `try{}`; the write throws before the stamp), contradicting the
prose at `darkModeSyncScript.ts:103-105`; new this batch. Emit the normalize write AFTER
the classList/colorScheme writes (or in its own try); the 300 B default and its hash stay
byte-identical. (2) A throwing-storage test arm (none exists). (3) The expressiveness gap
that blocks the promised adopt: the absent and `"auto"` arms are welded
(`(m===null||m==="auto")&&fallback`); slides splits them (absent → light, auto → OS) and
no value of `defaultDark` reproduces `(DARK, LIGHT)`. Widen `defaultDark?: boolean | "os"
| { absent: boolean | "os"; auto: boolean | "os" }`, emit the arms separately—additive
forever (the investigator's "costs a major the moment anyone adopts" is false and not
carried); born-RED: one option object resolving stored="auto"+OS-dark → DARK and
stored=null+OS-dark → LIGHT. (4) A ~15-line `transformIndexHtml` plugin injecting
`darkModeSyncScript()` as the first head script of glass-ui's own demo (born-RED: the built
demo `index.html` contains the IIFE; measures our shell, not the consumer surface).
`storageKey` is the fourth arm with the same zero-caller count and stays (same object,
same reasoning). The MIGRATION §8.1.0 recipe paragraph → the manifest wave.

---

## HK (audit housekeeping)

### HK-vite-comment—LIVE → CURE-NOW

`vite.library.ts:24-25` says `perfect-freehand` is vendored into `handmark/freehand.ts`—
the file is gone (`5a69ed9f`) and no such dependency exists anywhere (0 hits). Verifier
falsified the seat's "every external is a live peer": `:36` externalizes
`@mkbabb/pencil-boil`, which is NOT in the 9-name published `peerDependencies` and has 0
src/demo imports (retired at #51)—a dead external, the exact class the comment above it
brags about removing. And the falsehood ships in files npm always includes: README.md:186
lists `@mkbabb/pencil-boil ^0.9.2 (optional peer)` and :182 `embla-carousel-vue ^8.0
(optional peer)`—neither is a peer at 9.0.0 (the verifier wrote :180, which is the LIVE
`@vueuse/core` row; the challenge caught it before a cure could strike a true line); MIGRATION.md:864 says install pencil-boil
for HandMark; `docs/canon/dependencies.md:35-36` and `deps-currency.md:18` repeat it.
**Cure:** delete the clause (:24-25) and the dead external (:36) in `vite.library.ts`; strike
README:182/:186 (README ships → consumer-facing; Lane T1's file); bracket MIGRATION:864 (Lane
R); correct the two canon docs.
No gate for a comment (gates-abrogation).

### HK-handmark-evidence—LIVE → ROUTE (γ4 / #51 lane) + a standing ruling

`docs/consumer-evidence/handmark.md` is one mount behind (2 in-repo: `motion/handmark.vue:7`
+ `foundations/colors.vue:37`), its re-audit date 2026-09-01 is 16 days past, its
"re-runnable" proof grep at :39-40 returns ZERO (dead strings after the BI flatten), and
:112/:114 cite two files that do not exist. **Ruling that must travel with the route:
`/handmark` does NOT retire.** Clause (b) ("the swap has not landed → RETIRE the /handmark
subpath") reads as armed today and rests on the doc's own STRUCK "0 external consumers";
atlas holds 3 live imports (`AnimatedRule.vue:34`, `charts/glyph/HandMark.vue:26`,
`useMarkMorphology.ts:40`, exact pin 6.0.0) which clears the ≥2 bar without slides ever moving;
retiring would break atlas at its next re-pin. Route target (verifier-corrected): the
handmark-owning lane—EXECUTION-PROGRESS.md:6744 excludes this file from #76 ("handmark.md
is γ4's at 5a69ed9f") and #76's "consumer-evidence truth-up" is struck at ⊕⁷⁹.

### HK-icon-rungs—PARTIAL → DECLINE

`--icon-2xl` carries FIVE live speedtest markup sites (`class="size-icon-2xl"`:
AdminSessionsTable.vue:143, DashboardMapControls.vue:33, ResultsTable.vue:148,
DashboardMap.vue:69, AddressAutocomplete.vue:47)—the audit's own row names the utility
spelling, so "the audit could not see them" is not carried; `--icon-hero` (and `--icon-3xl`,
unflagged) have 0 readers. Not a cut either way: the ladder is the artefact; cutting a top
rung of a complete named ladder pushes the next 56px glyph onto `size-[3.5rem]`, and the cut
would be breaking (token + `--spacing-icon-hero` bridge + utilities) for zero gain. Relay to
speedtest: `src/design/tokens.css:727` redeclares `--icon-hero: 72px` over ours by import
order.

### HK-audit-path—LIVE → CURE-NOW

`docs/audits/overfitting-audit.md:58,:79` write `../muster/src/` (real: `../muster/frontend/
src`; muster pins ^3.1.0)—a silent zero that reads as "no consumers". Larger (verifier):
`{CONSUMER_PATHS}` omits FOUR real consumers outright—value.js (^7.0.0), keyframes.js
(7.0.0), atlas (6.0.0), sci-report/dashboards (7.0.0); atlas's absence already cost the
08-29 batch an ad-hoc walk. And :5 AND :88 declare the sweep "the discovery layer behind two
standing gates—proof:component-orphan … proof:consumer-evidence-live … enforce
continuously": 0 `proof:*` scripts at v7/v8/v9 (collapsed at `1c2cda3a`, #65); the same
claim recurs in `docs/instructions/README.md:29-32` and `docs/archive/README.md:32`.
**Cure:** fix the path; add the four consumers; strike the phantom-gate sentences in all
four places with the measured state (the sweep is the only instrument; nothing enforces
between runs)—both or neither (a corrected file reads as verified). Born-RED: an
existence assertion over the file's own `{CONSUMER_PATHS}` stems (RED on muster today).

### HK-bbnf-relay—LIVE → CURE-NOW (author the 9.0.0 addendum)

`bbnf-lang/playground/src/components/docs/DocsSidebar.vue:4-5` imports `FuzzySearch`,
`useFuzzySearch`, `SearchableItem` from `./search`—absent at v9.0.0 (present v3/v7/v8);
latent at pin ^3.0.0, fires at re-pin; `:6-7`'s `./sidebar` import survives, so the repair
is one import statement. #76's L2 law (addenda are authored off a LIVE publish) is
satisfied as of today, so the addendum is newly DUE, not deferred: `coordination/
glass-outbound-2026-09-17-bbnf-lang-9.0.0-addendum.md` in the #85 form (this pass authors
it, zero sibling writes).

### HK-keep-current—MIXED → ANSWER

The clause's enforcer is dead (0 `proof:*` scripts at v7/v8/v9; `consumer-evidence/
README.md`'s 2026-08-25 bracket already banks 23/25 docs with 52 dead cites); the
artefacts are live. **Answer: a named gate IS the evidence; do not mint the six docs**—a
test asserting against a constant by name re-runs in CI and fails on drift; a prose doc is
read by nobody (the forcing rule's own premise). Amend the keep-current clause by one line
("— or a named gate asserting against the artefact by name, cited file:line"), riding
HK-audit-path's edit to the same file. Correction: `AURORA_DRIFT_FLOOR` is graded plain
`keep` (audit :193/:299), never keep-current—the ask mis-groups it (the investigator's
read-count argument is wrong and the verifier struck it: `aurora/index.ts:22` is a comment and
presets.ts's four are same-file). The handmark `stroke.d.ts` "doorless" rider (8 names, not 3) dissolves
under fact 3.

---

## Tally

| disposition | items |
| --- | --- |
| KILL | A-2 · A-3 · A-4 · A-6 · A-11a · A-11c · A-11e · B-4 (8) |
| ANSWER | A-7 · A-11b · A-13 · C-1 (answer half) · HK-keep-current (its one-line clause amendment rides Lane T2) (5) |
| DECLINE | A-7 (export) · A-8 (zoom/pan) · A-13 (rename) · B-2 (layout) · B-3 (restore) · B-5 · HK-icon-rungs |
| ROUTE | A-12 → fourier-analysis · GATE → #19 (cured here) · HK-handmark-evidence → γ4/#51 |
| CURE-NOW | A-1 · A-4-RIDER · A-5 · A-6 (demo) · A-8 (hue law) · A-9 · A-10 · A-11d · A-14 · B-1 · B-2 (plate register) · B-3 · B-6 · B-7 · C-1 (glyph) · CUT-1 · CUT-2 · GAP · GATE · CUT-4/5 (docs) · CUT-6..8 · HK-vite · HK-audit · HK-bbnf (authored in this pass: the addendum) (24) |
| CURE-NEXT-MAJOR (rulings, not executed) | A-3-CLASS · CUT-3 · CUT-4 · CUT-5 (4) |

Nothing in the CURE-NOW set removes or renames a hand-authored published export, class,
token or subpath. A-11d retires two scanner-emitted Tailwind utilities from
`components.css` (`hover:bg-foreground/5`, `hover:text-foreground`), which no sibling reads
from our sheet and which the manifest gate does not govern (it governs `@utility` names and
hand-authored `@layer components` selectors, not the scanner's emission). Four items change
computed paint on purpose—B-7 (four light stops), C-1 (the toned glyph, which today
paints nothing), A-9 (tall or edge-placed hints gain a ceiling), A-11d (legacy engines
only: the 1.00:1 fill is dropped)—and each carries its evidence in its cure record. The CURE-NEXT-MAJOR set and any new publish are the owner's.

## The cure wave—lanes

Disjoint file fences, quartet each (Opus implement → 2 ASSUME-WRONG challengers → Fable
adjudicator), records at `execution/2026-09-17-o20-cure/<lane>/RECORD.md`, driver commits
by pathspec. MIGRATION.md is Lane R's alone and runs LAST so the manifest reflects what
landed; README.md and DESIGN.md are Lane T1's alone.

[2026-09-17 · O-20 CLOSE-DOCS · the driver added three lanes beyond the nine below:
**RESIDUE-5A**, which discharged the re-adjudicators' residues from the T1/T2 close
(committed `43c72339`), and **CLOSE-DOCS / CLOSE-TESTS**, the two disjoint-fence lanes of
the close itself—the remaining re-adjudicator residues, this ledger's ratifications, the
`MIGRATION.md` pencil-boil sweep, and the `CHANGELOG.md` 9.0.0 entry the publish never
got. Twelve lanes ran; the nine below are the cure proper.]

| lane | items | fence |
| --- | --- | --- |
| P | A-1 parse arm | `scripts/verify-export-types.mjs`, `tests/public-surface.spec.ts` (the probe `it()` only) |
| C1 | A-9 · B-6 · A-11d | `src/styles/glass/overlay-plate.css`, `src/components/slider/styles.css`, `src/components/configurator/{ConfiguratorRow.vue,ConfiguratorLayer.vue,styles.css}`, `tests/styles/{overlay-plate-available-height,slider-cursor-affordance}.test.ts`, `tests/styles/emitted-utility-vars.test.ts` (new arm) |
| C2 | B-7 · C-1 glyph | `src/styles/tokens/{color-radius,light-dark}.css`, `src/components/alert/index.ts`, `tests/styles/contrast-computed.test.ts`, `tests/components/alert/*` |
| E1 | CUT-1 · CUT-2 · GAP · GATE · A-8 hue law | `src/components/fourier-field/{constants.ts,index.ts}`, `src/components/timeline/index.ts`, `src/composables/glass/webgpu/*` (type doors only), `src/components/dock/composables/dockCrossfadeContext.ts`, `demo/stories/substrates/fourier-field.vue`, `tests/components/fourier-field/FourierField.smoke.test.ts`, `tests/gates/overfit-structure.test.ts`, `tests/public-surface.spec.ts` (export/type assertions only) |
| E2 | B-1 · A-10 · CUT-4/5 docblocks · A-6 demo | `src/components/chip/{chipVariants.ts,README.md}`, `tests/components/chip.contract.test.ts`, `docs/tranches/BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md` (dated brackets), `src/components/slider/Slider.vue` (comment), `src/components/dock/composables/useDockHold.ts` (comment), `tests/components/ui/slider/dock-hold-contract.test.ts`, `tests/components/slider/*` (mount test), `src/composables/color/index.ts` (comments), `src/composables/dom/useResolveTokenColor.ts` (comment), `demo/chassis/showcase/ShowcaseFrame.vue` |
| D | CUT-6..8 | `src/composables/dark/darkModeSyncScript.ts`, `tests/composables/dark/darkModeSyncScript.test.ts`, `vite.config.ts`, `index.html` |
| T1 | A-5 · A-14 · B-2 · B-7 doc · HK-vite (README:182/:186 rows) | `docs/design/{tunable-anim,affordance-map}.md`, `DESIGN.md`, `README.md`, `src/styles/glass/veil.css` (header), `src/styles/theme/bridges.css` (pointer), `tests/design/*` (the two doc tests) |
| T2 | HK-vite (vite.library.ts + canon docs) · HK-audit · HK-keep-current (clause line) · B-3 (3) | `vite.library.ts`, `docs/canon/{dependencies,deps-currency}.md`, `docs/audits/overfitting-audit.md`, `docs/instructions/README.md`, `docs/archive/README.md`, `src/styles/tokens/scale-paper.css` (comment), `tests/docs/*` (path-existence) |
| R (last) | A-4-RIDER · B-3 (1,2,4) · C-1 doc · CUT-4/5 rows · CUT-6..8 recipe · HK-vite :864 | `MIGRATION.md`, `src/components/_shared/class-names.ts`, `tests/components/_shared/*`, the roster datum + its gate arm. [2026-09-17 · O-20 CLOSE-DOCS · R's fence grew: it also carried the **batch-2 residue sweep**—`src/styles/tokens/color-radius.css:320` (the amber comment's dark figure, 8.07:1 → 7.72:1), `tests/styles/contrast-computed.test.ts` (the §6 headnote and the new §6d demo-hero LOCKSTEP arm), `demo/vite.demo-dist.config.ts` + the new root `vite.dark-stamp.ts` (the BUILT demo stamps too), and `demo/chassis/hero/aurora-hero.ts` (four retuned rungs). And "runs LAST" was honoured by LAUNCH ORDER, not by completion: `laneR:implement` launched 19:56 ET against `laneT1:implement` / `laneT2:implement` at 19:49, and the three lanes then **overlapped in time**—R's own step-0 baseline records T1's and T2's files already dirty and never opened. Nothing T1 or T2 produced fed R's inputs.] |

Seat law for every lane: model asserted from the seat's own transcript and gating the
chain; gates exactly 60, mint nothing; born-RED proven on bytes; `vue-tsc` 0; battery
figure stated in full with foreign REDs attributed; receipt line verbatim; strike-in-place
dated brackets on committed text; no sibling writes; no masking fallbacks.
