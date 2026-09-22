# O-23 + O-32 DISPOSITION LEDGER—the fourier NWO-1 relay and the F.W4 relay, row by row

**Date** 2026-09-22 · **driver** Fable (adjudicator) · **seats** 8 Opus (`claude-opus-5-5[1m]`,
the id each seat JSON records), workflow `wf_1b70278c-f61`, four clusters (contrast-tokens ·
dom-a11y · api-cascade · infinite-scroll-strikes) × one investigator + one ASSUME-WRONG
verifier, read-only in the repo (probes written to scratch, outside the tree) · **author seat**
`claude-opus-5-5[1m]` (this ledger and the reply) · **datum** master `cbc1c979`, the 10.0.0
tree with all five register-wave lanes landed, CI green (`e5ac97f2`, `b13a792e` and `f3011618` add docs only; `git diff --stat a08143ce f3011618 -- src` is empty); the published 8.0.0 (`17a11bc5`) for the consumer's pin;
the published 9.0.0 (`d4f7b24f`) for what the registry carries · **inbound**
`coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (**O-23**: §1 residual, §2
twenty-one strikes, §3 L-1..L-7, §4 negatives, §5 asks) and
`coordination/value-to-glassui-2026-09-DD-fw4-relay.md` (**O-32**: §1.1/§1.2, §2.1-2.4,
§3.1-3.4, §4.1-4.3, the 2026-09-22 erratum on `E-F9b-2`, the addendum A-1..A-3) · **rulings**
`RULINGS.md` beside this file · **evidence** `seats/` beside this file · **reply**
`coordination/glass-outbound-2026-09-22-fourier-o23-o32-reply.md`.

Method: each cluster ran one Opus investigator, then one Opus verifier told to assume the
investigator wrong and re-establish every claim with its own commands; the driver ruled over
both (`RULINGS.md` §A). This ledger applies the verifier's figures wherever it overturned or
amended the investigator, and says so where the ruling departs from both seats. The eight seat
JSONs are banked under `seats/` (`dce84a28`), so every figure below cites a file by name and
re-measures by the command that file records. Word set, as the O-20 and O-26 ledgers: state ∈
{LIVE, DEAD, MOVED, PARTIAL, NOT-APPLICABLE}, read at HEAD before the cure lanes, with the 8.0.0
consequence stated separately; disposition ∈ {KILL, CURE-NOW, CURE-NEXT-MAJOR, DECLINE, ANSWER,
ROUTE}; SPLIT names a row whose limbs take different words. CURE-NOW here means lands at HEAD
for the 10.0.0 cut; a cure that moves a published name or contract is marked **BREAKING**,
which is lawful at this major. Every landing line reads "lands at 10.0.0, lane X"; the driver's
bracket pass after R2 replaces it with the commit. No sibling tree was written.

## §0—facts that change how every row reads

**1. Their pin is 8.0.0, and nothing cured here is in 8.0.0 or 9.0.0.** O-23 §0.1 elects
`v8.0.0` @ `17a11bc5`; O-32 reads the same installed 8.0.0. The O-20 cure wave (`46ab4124` and
after, 2026-09-17) and the register wave (2026-09-22) both post-date the 9.0.0 tag
(`git merge-base --is-ancestor 46ab4124 v9.0.0` → no). Every CURE-NOW below reaches them at
10.0.0 and not before; each row states what works at 8.0.0 in the meantime.

**2. From 10.0.0, MIGRATION.md ships.** `package.json` `files` gained `MIGRATION.md` at
`72d8bd96` (register-wave lane C); `MIGRATION.md` `## 10.0.0` › `_This file ships in the
package_` records it. So "a GitHub doc row" (O-23 L-5's framing) holds for 8.0.0 and 9.0.0 and
is false for 10.0.0: every stale MIGRATION row becomes published bytes at the cut
(`verify__api-cascade.json`, L-5).

**3. The token root is unlayered and beats every layered consumer `:root`.** Two cures (O-32
§4.1, O-23 L-3) turned on it and one candidate cure was overturned by it. It is ruled once as §B-1; R2 states it in MIGRATION `## 10.0.0` [heading to be reconciled at landing].

**4. Two O-32 rows reach fourier through latex-paper, not through us.** fourier's paper tree
calls `@mkbabb/latex-paper/vue`'s `useSidebarFollow` and `useTreeIndex` (fourier
`PaperView.vue:8-10`, `PaperArticleWindow.vue:8`); latex-paper carries the same `.sidebar-top-btn`
match and the same `parentId` shape (`dist/vue.js:602`, `:85`/`:90`). Our §3.3 and §3.4 cures
are right on their own merits and free nothing for fourier until latex-paper ships its twin
(`verify__dom-a11y.json`). The reply says so, and names the attribute so both producers can
take one spelling.

## §A—O-23 rows, in letter order

### O-23 §1 · FR-NP-32 residual: the parse gate's pointer—DEAD → ANSWER

**8.0.0 consequence.** The gate did not exist at 8.0.0, and 8.0.0 is not parse-clean under
lightningcss: `dist/styles/glass/material.css` (in the `./styles` closure via `styles/index.css`
→ `glass.css`) fails at 1:228, a source comment closed early by `src/**/*.vue`. postcss tolerates
it, which is why their COHESION §0i.5 read "absent"; browsers drop the swallowed
`.glass-wash,.glass-quiet,.glass-resting,.glass-card{contain:paint}` rule. This is a different
fault from FR-NP-32 and exactly the class the gate catches.

**Grounds.** `46ab4124` (2026-09-17, O-20 cure batch 1) is the only commit that adds lightningcss
to `scripts/verify-export-types.mjs`: `:24` imports `transform`, `:306-311` parses the raw buffer
inside `validateCss()`. `verify:package` (`package.json:492`) runs that file, so the arm never
shows in the script string they grepped; `scripts/release.sh:35` and
`.github/workflows/release.yml:51` run `verify:package`; the born-RED plant is
`tests/public-surface.spec.ts:698`. It post-dates v9.0.0 by 8 commits, so 10.0.0 is the first cut
through it. Over the unpacked tarballs: 8.0.0 → 124 css, 1 fail (`material.css`, 1:228); 9.0.0 →
124 css, 0 fail; the leak was cured at `2cfc1124`, an ancestor of v9.0.0
(`verify__api-cascade.json`, O-23 §1).

**Answer.** Landed at `46ab4124`, the HEAD they read; the residual closes on that hash. The 8.0.0
correction travels as a fact at their pin, not an ask.

**Seats.** Investigate: DEAD → ANSWER, carried O-20 A-1's 9.0.0 "124/124" to 8.0.0. Verify:
AMENDED—8.0.0 overturned (1 fail), `2cfc1124` named. Driver: ANSWER, the correction sent.

**Cites.** None in MIGRATION; the hash is the record.

### O-23 L-1 · FR-GIG-5 over FR-GIG-1: the whole-collection drain—PARTIAL → CURE-NOW

**8.0.0 consequence.** Leg A (the trigger) is dead at their pin; Leg B (the geometry) is live:
`InfiniteScroll` hands its own non-clipping root `<div>` to `IntersectionObserver` as `root`, so
`GalleryInfiniteGrid` drains every page on mount with zero scroll. No published version cures it.

**Grounds.** `dist/infinite-scroll.js` is byte-identical at 8.0.0 and 9.0.0 (sha1 `a79d718a…`)
and `src/components/infinite-scroll` is unchanged v8.0.0 → HEAD. Leg A as quoted is 6.0.0-and-earlier
source: it died at `490cc46e` (first tag v7.0.0)—the handler gates on `entry.isIntersecting` and
`check()` only reconnects—so ask (2) is already met. Leg B on the PUBLISHED bytes, served into a
real page (Vue esm-browser, 20 × 100px items per page, `hasMore` false at page 10), Chromium and
WebKit twice, Firefox once: ancestor-port layout (mirroring fourier `GalleryView.vue:306`) 10/10
pages on mount; plain window-scroll layout 10/10; demo layout (component root is the port) 1 on
mount, 2 near the end. Patched copy: 1 on mount, 2 near the end, in all three layouts and all
three engines. The drain therefore does not depend on fourier's bounded ancestor
(`verify__infinite-scroll-strikes.json`, L-1).

**Cure.** Ask (1) in its first form. `InfiniteScroll.vue` stops passing its own root (root → the
viewport); `useInfiniteScroll.ts` adds `scrollMargin` = the threshold beside `rootMargin`, so the
prefetch survives inside nested ports; the composable's own `scrollContainer` option STAYS (a
caller passing a real port keeps it as root); the demo comment at
`demo/stories/data/infinite-scroll.vue` that says the component sets the container is rewritten.
Born-RED `it` in `tests/components/infinite-scroll.contract.test.ts` (observer `root` null,
`scrollMargin` set); the four existing cases stay green. Not breaking: props, emits, expose and
the composable signature are unchanged. The "require a scroll port" form is not taken—it would
break fourier's mount and still drain an unbounded `overflow: auto` root. RULING: no Safari cell
before the cut; an engine without `scrollMargin` loads when the sentinel is visible—degraded,
never a drain, not a masking fallback. Lands at 10.0.0, lane AC2.

**Seats.** Investigate: PARTIAL → CURE-NOW, measured on a hand-written replica. Verify:
UPHELD—re-measured on the published bytes in three engines and in a window layout. Driver:
CURE-NOW on the investigator's shape, Safari cell ruled out.

**Cites.** CHANGELOG 10.0.0 fixes line [to be reconciled at landing]; G15 stands as they wrote it.

### O-23 L-2 ≡ O-32 §4.2 · `cn`'s group table misbuckets the producer's own vocabulary—PARTIAL → CURE-NOW

One row, two labels; the reply answers it under both.

**8.0.0 consequence.** 12 of the 37 `text-*` names glass-ui publishes fall into `cn`'s `^text-`
colour catch-all and evict a real colour class (`cn('text-foreground','text-dropdown')` →
`'text-dropdown'`); `cn('text-caption','text-admin-label')` still evicts `text-caption`.
`rounded-pill` already buckets at their pin.

**Grounds.** `class-names-q-UGOkHH.js` is byte-identical at 8.0.0 and 9.0.0 (`cmp`). A probe over
`.published-roster`'s 37 `text-*` names finds the 12: `text-display-1`, `text-dropdown`,
`text-dropdown-secondary`, `text-proportional-headline`, `text-proportional-kicker`,
`text-shadow-{2xs,depth,engraved,lg,md,sm,xs}`. `rounded-pill` buckets since `a6d7db90`
(2026-08-04, first tag v8.0.0); all 23 radius roles collapse correctly at all three datums. The
admin-label instance was cured at `dd8a5fe5` (O-20 B-3), after 9.0.0. The fall-through families
their (b) is about are real, and are not the ones they named: `font-text`/`font-display`,
`tracking-*`, `leading-*`, and the semantic `border-*`/`ring-*` colours (`border-border`,
`ring-ring`) are unrecognised, so both tokens survive and stylesheet order decides. The same
eviction class sits in `shadow`: `cn('shadow-lg','shadow-primary')` → `'shadow-primary'`
(`verify__api-cascade.json`, O-32 §4.2 + O-23 L-2).

**Cure.** (a) for the misbuckets: the 12 names gain their true buckets (the font-size
alternation, plus a `text-shadow` rule before `text-color`); a patched copy takes 12 evictions to
0 with radius and admin-label behaviour unchanged. RULING: the `shadow` bucket is split too, the
lane measuring the roster's `shadow-*` size rungs, so a shadow COLOUR no longer evicts a shadow
SIZE. (b) for fall-through: the `class-names.ts` docblock names the four families; (a) is not
extended to them. Witness: a unit in `tests/components/_shared/classNames.test.ts` that reads
`.published-roster` and asserts `cn('text-foreground', n)` keeps both for every published `text-*`
name—RED at HEAD on exactly the 12. A test row, not a gate seat (§B-2). Not breaking: `cn` changes
only where it dropped a class it should have kept. Lands at 10.0.0, lane AC1.

**Seats.** Investigate: PARTIAL → CURE-NOW, the 12 and the patch. Verify: AMENDED—the real
fall-through families and the shadow eviction added. Driver: CURE-NOW, widened to `shadow`.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing]. Interim at 8.0.0: keep glass-ui's
`text-*` size and `text-shadow-*` utilities out of any `cn()` call that also carries a text colour.

### O-23 L-3 · m-21: `--slider-track-height` is not consumer-tunable—LIVE → CURE-NOW

**8.0.0 consequence.** The three rungs are literals on `.glass-slider[data-size="sm|md|lg"]`
(0,2,0) in a file with no `@layer`. A `.glass-slider{--slider-track-height:…}` rule or an ancestor
token never reaches the track (Chromium: 20px stays 20px); only restating
`.glass-slider[data-size="md"]` unlayered, after our sheet, works (32px).

**Grounds.** Beyond their specificity framing: `src/components/slider/styles.css` is
unlayered on purpose (the one A-3-CLASS exception, register-wave `L/RECORD.md:64`, `:173-174`), so
even a layered restatement loses. The six-token cure reaches wrappers, elements and an unlayered
`:root`—default and spectrum paint unchanged (20/16, 24/16), wrapper in `@layer glass-overrides`
32/16, thumb clamps to track—but a consumer `:root` inside any `@layer` (fourier's own
`@layer glass-overrides` idiom, their `style.css:19`) still reads 20px, because our unlayered
token root beats it (`verify__api-cascade.json`, O-23 L-3).

**Cure.** Six tokens `--slider-track-height-{sm,md,lg}` (0.75/1.25/1.75rem) and
`--slider-thumb-size-{sm,md,lg}` (0.5/1/1.5rem) in `sizing.css`'s unlayered `:root`, beside
`--slider-touch-target` (the house token shape); each rung reads them, the thumb as
`min(thumb, track)`, so the inscription law holds by construction; the slider file stays
unlayered. The letter's declared-nowhere `var(--x, literal)` shape is DECLINED: it reaches a layered
`:root` in test, but it holds the default in a fallback, the shape §4.1 strikes (§B-1). Born-RED
computed-style test (the wrapper inside `@layer glass-overrides`; RED at HEAD, 20px). Not
breaking. Lands at 10.0.0, lane AC2.

**Seats.** Investigate: LIVE → CURE-NOW, the six tokens. Verify: AMENDED—the layered `:root` case
fails; the reply must not say "set it on `:root`". Driver: CURE-NOW on the house shape; §B-1.

**Cites.** MIGRATION `## 10.0.0`, the six tokens as additions with the §B-1 sentence
[heading to be reconciled at landing].

### O-23 L-4 · GAB-2(a): the tier-tint home and the 3.26:1 rung—PARTIAL → ANSWER

**8.0.0 consequence.** The tier tint is the producer pair `--tier-featured`
`oklch(0.841 0.173 84.2)` / `--tier-saved` `oklch(0.676 0.176 252.3)` with the `text-`/`bg-tier-*`
bridges: 1.528 / 2.718:1 on `--card` light (9.262 / 6.253 dark). `<Metric>` has no colour or tone
prop at 8.0.0, 9.0.0 or HEAD. The 3.26:1 rung is gone at their pin: it was the stacked MetricBadge
label, `text-muted-foreground/80` at `text-mono-micro`, and MetricBadge was deleted at 7.0.0 (3
files at v6.0.0, 0 at v7.0.0). The 8.0.0 Metric label is full `--muted-foreground` at weight 550,
5.013:1 on `--card` (4.635 on their tile).

**Grounds.** Tier literals are identical at all three datums; the only library reader is
`theme/bridges.css:217-218`; five fourier files read them. At fixed C/H a 4.5 text retune needs
L ≤ 0.550 (featured's gold → ochre); a 3:1 floor needs L ≤ 0.650. The rung decodes from value.js's
own registry (`fr-GalleryAdminBanner.md:41`, `:48`). The band—alpha-muted `--muted-foreground` as
text—is not gone from the library: `ConfiguratorRow.vue` `/70` (2.82) and `/80` (3.38) and
`ConfiguratorLayer.vue` `/70` (2.82) on `--card`, live since ≤ 8.0.0 (`verify__contrast-tokens.json`,
O-23 L-4).

**Answer.** The home is glass-ui (`--tier-featured`/`--tier-saved` + bridges), a tint and not a
text ink. Of GAB-2(a)'s two options, the second: `<Metric>` gains no tone axis; tier meaning rides
a mark or plate beside a `--foreground` numeral, so fourier drops `class="text-tier-*"` from
`<Metric>` (`GalleryAdminBanner.vue:125-143`). The 3.26 rung is not a band to use; alpha-muted
`--muted-foreground` as text is a defect. RULING: the tier light arm (1.53/2.72) stays—no library component paints them (the one reader is the `bridges.css:217-218` bridge), the N-2 census principle—and the graphical floor of the consumer's composition is the
consumer's.

**Seats.** Investigate: PARTIAL → ANSWER, one `/80` site called "the last". Verify: AMENDED—three
alpha-muted text sites, not one; name the option taken. Driver: ANSWER; tier arm stays.

**Cites.** DESIGN.md tier note (R2) [to be reconciled at landing]. Library residue: L-4-RIDER.

### L-4-RIDER · the library's own alpha-muted text—LIVE → CURE-NOW

Ours, raised by the verifier; the reply names it so "treat it as a defect" is not advice we fail.
The three TEXT sites (`ConfiguratorRow.vue` `/70` and `/80`, `ConfiguratorLayer.vue` `/70`) drop
the alpha: 5.01:1 on `--card`. The `/60` icon button and the `aria-hidden` `/60` easing numerals
stay (not text a reader needs). Paint-only; witness in the contrast tree. Lands at 10.0.0, lane CT.

### O-23 L-5 · B-4's i-4: MIGRATION homes symbols at subpaths that do not exist—LIVE → CURE-NOW (docs)

**8.0.0 consequence.** The export map has 70 keys and no `./animated-digit`, yet MIGRATION's
`## 5.0.0` › `### The /api discovery-subpath fold — the 203-symbol census` homes
`AnimatedDigitMode`/`AnimatedDigitProps` there. GitHub-only at their pin.

**Grounds.** At HEAD the two rows sit at `MIGRATION.md:1638-1639` (their `:838-839` drifted),
contradicting our own `## 8.0.0` › `_Deleted — AnimatedDigit_`. A sweep of every census row with a
subpath home (123 rows) against the three export maps finds 7 stranded at all three datums:
`AnimatedDigitMode`, `AnimatedDigitProps`, `CompletionSealProps`, `CompletionSealShape`,
`ControlSize` (homed `/forms`; lives at `/input`), `HeaderRibbonProps`, `PaperBackdropProps`. A
symbol-level sweep (TypeScript checker over each live subpath's entry `.d.ts`) finds 14 more rows
naming symbols their live home no longer exports: eight handmark types gone at 9.0.0
(`BlendMode`, `Brush`, `BrushName`, `HandAnimation`, `HandMarkProps`, `InkPath`, `MarkBox`,
`TaperSpec`—present in the 8.0.0 `.d.ts`, 0 in HEAD `src`) and six motion/motion-core types gone
by 8.0.0 (`BloomUpPreset`, `UseBloomUpOptions`, `UseBloomUpReturn`, `UseCountupOptions`,
`HighlightMatcher`, `UseTextHighlightControls`); each appears once in MIGRATION, the census row
only. Export keys: 8.0.0 70, 9.0.0 68, HEAD 68. `useAnimatedNumber` on `./motion` is a live
composable, not the AnimatedDigit types' home (`verify__api-cascade.json`, O-23 L-5).

**Cure.** Six of the 7 subpath-stranded rows marked removed with their cut and a pointer to the `## 8.0.0` `_Deleted — X_` entry; the seventh, `ControlSize`, re-pointed to `/input` (as `## 8.0.0` already records it), its census prose corrected. The 14
symbol-stranded rows marked removed with MEASURED retiring commits (`git log -S`); the eight
handmark types get a `## 9.0.0` removal entry. Witness: both sweeps re-run over the built 10.0.0
dist, 7 → 0 and 14 → 0—a one-off check, not a gate. Lands at 10.0.0, lane R2; it must land
before the cut because the file ships (§0.2).

**Seats.** Investigate: LIVE → CURE-NOW, the seven rows. Verify: AMENDED—14 more; the "no published
bytes" framing overturned for 10.0.0. Driver: CURE-NOW, all 21 to R2.

**Cites.** `## 5.0.0` › the 203-symbol census; `## 8.0.0` › `_Deleted — AnimatedDigit_` /
`_Deleted — CompletionSeal_` / `_Deleted — HeaderRibbon_` / `_Deleted — PaperBackdrop_`; the new
`## 9.0.0` handmark removal entry [to be reconciled at landing].

### O-23 L-6 · FR-TT-6: the tooltip chip's geometry, type rung and comment—PARTIAL → CURE-NOW

**8.0.0 consequence.** The chip pads 8px on every side (`--overlay-pad-hint`, ratio 1.00—neither
2.00 nor 0.79), sets `font-size: var(--tooltip-text)` = `--type-caption` (12px floor) with no
`line-height`, so it inherits body's 1.5; `offsets.css:93-96` and `:63` still name a tooltip
`text-sm` that TooltipContent dropped at 7.0.0.

**Grounds.** The ratio is stale twice: 2.00 (`px-3`/`py-1.5`) is pre-7.0.0; 0.79 is the 7.0.0 chip
(8px inline, 8 × 1.272 block = 0.786); 8.0.0, 9.0.0 and HEAD pad 1.00. `git log -S text-sm` on
TooltipContent → `490cc46e` (first tag v7.0.0) removed it. The docblock is wrong on both counts:
no `text-sm` backing, and `--type-caption` is not on the √φ ladder (`typography/scale.css:96-103`
excludes the φ-identity rungs from the body register). The leading is incidental: the arm borrows
the caption size without the caption pairing `@utility text-caption` applies; the portal
teleports to `<body>`, so a 12px line box is 18px instead of 15.6px (Δ 2.4px). Their `:78-82`
cite drifted; the block is `:93-96` at 8.0.0, 9.0.0 and HEAD, with the second site at `:63`
(`verify__dom-a11y.json`, O-23 L-6).

**Answer + cure.** Deliberate: the uniform hint pad and the caption rung—re-baseline against them.
Defects, cured: `offsets.css:93-96` rewritten to name its reader, and `:63` drops `tooltip
text-sm`; the tooltip arm in `overlay-plate.css` gains `line-height: var(--type-leading-caption)`
(1.3; the token exists, nothing minted). Witness in
`tests/styles/overlay-plate-available-height.test.ts` (it already isolates the tooltip rule
body); RED at HEAD. RULING: the 2.4px block change rides the next live-π band; no separate probe.
Not breaking. Lands at 10.0.0, lane DA.

**Seats.** Investigate: PARTIAL → CURE-NOW. Verify: AMENDED—`:63` added, the √φ falsehood
grounded, 2.00 dated pre-7.0.0. Driver: CURE-NOW.

**Cites.** CHANGELOG 10.0.0 paint line [to be reconciled at landing].

### O-23 L-7 · C-13: dock token scope on owned portals—LIVE → ANSWER

**8.0.0 consequence.** A dock-owned portal (tooltip, popover/hover-card, dropdown and submenu,
select) teleports to `<body>` and inherits only the `:root` cascade: 44 `:root` `--dock-*` tokens,
10 of them re-declared on the dock (including `--dock-local-scale`; the portal sees the `:root`
value), none of the 39 dock-local ones. The FR-TT-9 stamp is ownership only; no shipped CSS reads
it.

**Grounds.** Custom properties inherit through the DOM tree; a portalled surface is a child of
`<body>`. Census (scratch `dockscope.py` over `src/**/*.css` + `.vue` style blocks, run twice):
HEAD and 9.0.0 → 40 `:root` / 45 dock-local / 9 re-declared (`--dock-active-color`,
`--dock-collapsed-padding`, `--dock-collapsed-summary-min-size`, `--dock-control-glyph-size`,
`--dock-fg-on-aurora`, `--dock-icon-glyph`, `--dock-label-ratio`, `--dock-layer-tab-size`,
`--dock-scale`); 8.0.0 → 44 / 39 / 10 (8.0.0-only `:root`: `--dock-shape-from/-to/-clip-from/-clip-to`).
`data-glass-dock-portal`/`-owner` (`_shared/overlay/participation.ts:110-114`) are read by
`isTeleportedTarget.ts` only; 0 CSS files carry them at 8.0.0 or 9.0.0. `CommandList` carries the
stamp but renders `RekaComboboxContent` in place—reka's ComboboxContent has no Teleport—so its
scope is its DOM parent (`verify__dom-a11y.json`, O-23 L-7).

**Answer.** Token scope follows DOM ancestry. A teleported dock-owned portal is guaranteed the
`:root` dock tokens at their `:root` values (44 at 8.0.0; 40 at 9.0.0; 39 at 10.0.0, `--dock-max-inline-size` deleted by AC-D-1-RIDER) plus every
page-level token, none of the dock-local ones, and for a re-declared token the `:root` value, not
the owning dock's. Set anything it must match on the portal content or on `:root`. `CommandList`
does not teleport. The stamp will not become a token scope.

**Seats.** Investigate: LIVE → ANSWER, HEAD counts stated as unchanged at 8.0.0. Verify:
AMENDED—8.0.0 is 44/39/10; CommandList does not teleport. Driver: ANSWER, both count sets sent.

**Cites.** None; ANSWER only.

### O-23 §4 · the negatives—§4.1 DEAD → ANSWER; §4.2-§4.4 recorded

**§4.1.** `./pagination` is absent from the export map at 8.0.0, 9.0.0 and HEAD (0/0/0, run twice
on independent packs). It is not a pending carry: it was removed at v1.0.0 (CHANGELOG `## v1.0.0 — 2026-05-11` › the `@mkbabb/glass-ui/pagination` subpath REMOVED bullet, `:3464` at `cbc1c979`; MIGRATION `### 3. Composable retirements` › `#### 3.1—useOffsetPagination—REMOVED`), and
the BD reconcile (`BD.W-VIRTUAL-RESHIP-RECONCILE.md:68`) preserves the retirement. It will not
return. L-1 is a change to `./infinite-scroll` only; both sides read it that way
(`verify__infinite-scroll-strikes.json`, O-23 §4.1). Upheld by both seats.

**§4.2-§4.4** (no frontend workaround; the 8.0.0 election is theirs; zero glass-ui bytes written)
carry no ask and take no verdict; received and recorded.

**Cites.** MIGRATION `### 3. Composable retirements` › `#### 3.1`.

## §S—the strike audit (O-23 §2, S-1..S-21)

**Every strike STANDS.** Their §5.3 rule ("if any strike is wrong … we will re-file it
unchanged") does not fire: the reply says **do not re-file** in those words. Two strikes stand on
corrected grounds (S-9, S-12); one corrects their pin framing (S-4); eight carry a "moved since"
note because the state behind the strike moved on our tree after the HEAD they read (S-2, S-11,
S-16 moved at HEAD; S-5, S-10, S-13, S-18, S-20 are declared cures that landed after 9.0.0 and
ship at 10.0.0). Every quote in their §2 was checked against I-32/I-33 bytes (scratch `quotes.py`,
whitespace/em-dash/bold normalized); S-8's is their carry's own text. Source for every figure:
`verify__infinite-scroll-strikes.json`, row by row.

| strike | disposing row cited | verdict | ground | moved since | measured |
| --- | --- | --- | --- | --- | --- |
| S-1 | I-32 A-11a/A-11b; I-33 §1 | STANDS | sound | — | `.button` `border: 1px solid var(--button-edge)` 1 hit at 8.0.0 and 9.0.0; `70dc0f06` first tag v8.0.0 |
| S-2 | I-32 A-3-CLASS | STANDS | sound when written | MOVED—executed at HEAD (`a08143ce`) | every shipped top-level rule in `@layer components`, exceptions named; their `rounded-dialog` Dialog paints 16px at 10.0.0; the "351" retired (O-26 LEDGER R-1). FR-COB-8's corpus leg already dead at 8.0.0 (`components.css` imported `layer(components)`) |
| S-3 | I-32 A-11b | STANDS | sound | — | no pressed paint at 8.0.0 |
| S-4 | I-32 A-11c | STANDS | sound; **pin framing corrected** | — | `.focus-ring:focus-visible` byte-identical at 8.0.0 and 9.0.0 (shasum `88560a878c`): the 3.13/4.21 ring ships IN 8.0.0, not above it |
| S-5 | I-32 A-11d | STANDS | sound | landed after 9.0.0 (`46ab4124`) | `hover:bg-foreground/5` fallback live in both published dists; bare `color-mix` in `@media (hover: hover)` at 10.0.0 |
| S-6 | I-32 A-12 ROUTE | STANDS | sound | — | producer share zero; fourier's own SFC |
| S-7 | I-32 A-11e | STANDS | sound | — | 0 `.btn-glass`/`.glass-btn` in 8.0.0 and 9.0.0; only `--glass-btn-press-t` |
| S-8 | their carry | STANDS | theirs, not ours to rule | — | quote is the carry's own text |
| S-9 | I-32 B-3 | STANDS | **corrected**: B-3 ruled the drop-in clause only, never the black paint | — | at 8.0.0 the `paper-grain-overlay` recipe on a `--card` box takes mean RGB 244.7 → 228.3 (Chromium) / 228.4 (WebKit), a light multiply grain at opacity 0.21, not black; tokens unchanged at 9.0.0/HEAD. Caveat: `tokens.css` alone (no `./styles`) leaves `--paper-grain-tooth` empty and the overlay paints nothing |
| S-10 | I-32 B-3 (one arm) | STANDS | sound | landed after 9.0.0 (`dd8a5fe5`) | `cn('text-caption','text-admin-label')` → `'text-admin-label'` on the published 8.0.0 and 9.0.0 chunks; the remainder is L-2 |
| S-11 | I-32 C-1 | STANDS | sound; C-1's ground covers Alert's ink, not the token | MOVED—`--success` retuned at HEAD (`9025efe2`) | light `--success` 0.720 → 0.600, 2.13 → 3.30:1 on `--card` (`--warning` 1.98 → 3.27); 3:1 for marks, still not a 4.5 text ink. Their 2.175 vs our 2.131 is gamut handling, same token bytes |
| S-12 | carry + I-32 A-9 | STANDS | **corrected**: cite `bca22bd9` (W-OVERLAY, v8.0.0), not A-9 (the block ceiling) | — | `v8.0.0` `TooltipContent.vue:43-48` + `useDockParticipation`; the stamp ships in the 8.0.0 tooltip chunk |
| S-13 | I-32 A-10 | STANDS | sound | landed after 9.0.0 (`c645c393`) | false "DROPPED" docblock present at 8.0.0/9.0.0, gone at HEAD; mount test `attrs-pointerdown-channel.test.ts` |
| S-14 | I-32 A-2 | STANDS | sound | — | `4442b451` first tag v8.0.0 (a 2026-07-21 commit, not the tag commit `17a11bc5`); 8.0.0 `glass.css` imports `glass-chip.css` (19 rules) |
| S-15 | I-32 A-6 | STANDS | sound | — | 0 `--type-mono-caption` in both packages; their three fallback-guarded readers are an optional tidy |
| S-16 | I-32 C-1 | STANDS | sound | MOVED—as S-11 | the answer holds; `--success` is 3.30 on `--card` at 10.0.0 where ActionFeedback paints it as a mark |
| S-17 | I-32 A-5 | STANDS | sound | — | `--cartoon-press-t` in both dists, `--card-press-t` in neither |
| S-18 | I-32 B-2 | STANDS | sound; **our erratum** (below) | landed after 9.0.0 (`a314533a`) | `@utility glass-plate` ships at 8.0.0 (`veil.css:47`, minted `4b1a9733`, first tag v8.0.0); the register lands in `veil.css`'s header and DESIGN.md at 10.0.0 |
| S-19 | I-32 A-3 | STANDS | sound | — | 0 `dropdown-menu__` in both dists; the `./dropdown-menu` → `./menu` re-point is theirs at the bump |
| S-20 | I-32 B-1 | STANDS | sound | landed after 9.0.0 (`c645c393`) | `xs: gap-0.5 px-1 py-0.5 text-micro` at HEAD only; `text-caption` is upright at 10.0.0, so B-1's italic caveat is gone—xs and sm differ in gap, padding and type rung |
| S-21 | I-32 A-4 (+ rider) | STANDS | sound | — | 8.0.0/9.0.0 `components.css`: 0 `:root`, 0 `--radius*`; `--radius-input` → `--radius-media` sits under `## 8.0.0` |

**Seats.** Investigate: SOUND 11, MOVED-SINCE 8 (S-2, S-5, S-10, S-11, S-13, S-16, S-18, S-20), WRONG 2 (S-9, S-12). Verify: SOUND 16 (S-5, S-10, S-13, S-18, S-20 amended from MOVED-SINCE to SOUND; S-18 and S-20 re-stated DEAD), MOVED-SINCE 3 (S-2, S-11, S-16), WRONG-ON-GROUND 2 (S-9, S-12, strikes kept). Driver: every strike STANDS; the moved-since note keeps the investigator's eight over the verifier's three, since the five declared cures ship at 10.0.0 and none is in 8.0.0 or 9.0.0.

**Cites.** `## 10.0.0` › `_Every library style rule moves into @layer components_` (S-2);
`_--success and --warning darken in the light arm_` (S-11, S-16); `_text-caption is upright_`
(S-20); `## 8.0.0` › `_Focus moves off box-shadow and stops restating the shape_` (S-4),
`_Class + attribute namespace — .dropdown-menu__* → .menu__*_` (S-19), `_Theme tokens removed —
thirteen @theme names_` (S-21).

### S-18-RIDER · erratum on our own I-32 B-2—LIVE → CURE-NOW (docs)

I-32 B-2 said 9.0.0 minted `@utility glass-plate`; it was minted at `4b1a9733`, first tag v8.0.0
(`git grep '@utility glass-plate'`: v7.0.0 0, v8.0.0 `veil.css:47`). A dated bracket in the O-20
LEDGER's B-2 row, bracket only. Lands at 10.0.0, lane R2. The reply carries the correction.

## §A—O-32 rows, in letter order

### O-32 §1.1 · the dock disclosure shipped; M-2/B-2 retire—LIVE → ANSWER

**8.0.0 consequence.** Confirmed byte for byte: the collapsed summary is the disclosure
(`role="button"`, `tabindex="0"`, `aria-label="Expand dock"`, `aria-expanded`, `aria-controls`,
`focusin` stopped, Enter/Space expands then focuses the first focusable in the full layer or the
layer), gated on `interaction === "auto" && layer === "summary"` (`dist/dock.js:722-724`,
`:849-855`).

**Grounds.** At 9.0.0 and HEAD the gate is summary-layer only: `interaction` left at `ac471032`
(2026-08-24, first tag v9.0.0), together with `startCollapsed` and the shell `alwaysExpanded`, for
`collapse: DockCollapse` (`.d.ts`: `startCollapsed?:` 1 → 0, `interaction?:` 1 → 0,
`collapse?:` 0 → 1). The GREEN-BY-TYPO note needs one addition: the lowercase `keydown` grep
returns 0 at 8.0.0 and 2 at 9.0.0, both from an unrelated `addEventListener`/`removeEventListener`
pair (`:696`/`:704`, the click-integrity path)—so it reads GREEN for the wrong reason at both pins.
`onKeydown` occurs 8 / 9 times. `DockCollapse` has 0 hits in MIGRATION.md and CHANGELOG.md at
`cbc1c979` (`verify__infinite-scroll-strikes.json`, O-32 §1.1).

**Answer.** Confirmed; retire M-2 and B-2. Moving the ECD Save into `#persistent` was right: a
`role="button"` host cannot contain controls. For a probe, match the binding (`onKeydown` beside
`"Expand dock"`) or the rendered role/`aria-expanded`, never the substring.

**Seats.** Investigate: LIVE → ANSWER. Verify: UPHELD; the unrecorded 9.0.0 reshape widened to
three props. Driver: ANSWER + the docs residue below.

**Cites.** The `## 9.0.0` late row (§1.1-RIDER) [to be reconciled at landing].

### §1.1-RIDER · the 9.0.0 GlassDock reshape has no MIGRATION or CHANGELOG row—LIVE → CURE-NOW (docs)

`startCollapsed` / `interaction` / shell `alwaysExpanded` → `collapse: DockCollapse` (`ac471032`)
shipped in 9.0.0 with no manifest row; fourier (20+ dock mounts, pinned 8.0.0) meets it at the
next bump. A `## 9.0.0` late-row entry in the file's dated-bracket form. Lands at 10.0.0, lane R2.

### O-32 §1.2 · the violet `batch` tone, withdrawn—NOT-APPLICABLE → ANSWER

No batch tone on `Badge` at any pin (`badge-owUOaaba.js`: `batch` 0, `violet` 0 at 8.0.0 and
9.0.0; `src/components/badge` 0 at HEAD); no banked ruling names AA-3. Noted and closed on our
side; none planned. Tone carries severity or state, not origin, which is their own AA-24 reading
(`verify__infinite-scroll-strikes.json`, O-32 §1.2). Upheld by both seats.

### O-32 §2.1 · `--success` under 3:1 in the light arm—PARTIAL → ANSWER

**8.0.0 consequence.** `--success` is `oklch(0.720 0.192 149.5)` = `#21c45d`: 2.131:1 on `--card`
(2.133 at rgb8, their figure exactly), 2.214:1 on `--background`. Their symbolic tier on
`--section-color-4` reads 4.272 and stop 10 4.239 (theirs exactly). The 2.175 does not reproduce
on any plain token ground (`--card`, `--background`, `--neutral-1` 2.081, `--neutral-2` 1.865,
white 2.301). 9.0.0 is the same bytes.

**Grounds.** Graphical floor: cured at HEAD by register-wave lane T (`9025efe2`) on B-7's recipe:
`--success` → `oklch(0.600 0.192 149.5)`, 3.30:1 on `--card` (3.42 on `--background`); `--warning`
→ `oklch(0.635 0.165 70.6)`, 3.27; dark arm unchanged. Text-bearing 4.5: C-1 rules foreground ink
the terminal contract, no `--success-ink`; the windows are disjoint—4.5 as text on `--card` needs
L ≤ 0.519, carrying its warm foreground at 4.5 needs L ≥ 0.580. Symbolic tier: B-7 (`c645c393`)
takes stop 4 to 4.846 and every light stop to ≥ 4.520 on `--card`, asserted by the test row `contrast-computed.test.ts` §6 (`verify__contrast-tokens.json`, O-32 §2.1).

**Answer.** Graphical half fixed for 10.0.0 (3.30/3.27); text half declined under C-1; symbolic
tier closes with the ramp retune (4.27 → 4.85). None of it is in 8.0.0 or 9.0.0.

**Seats.** Investigate: PARTIAL → ANSWER, the Metric residue left as an open note. Verify:
UPHELD, figures re-derived (2.214 on `--background`, 4.272), the residue raised to a cure
candidate. Driver: ANSWER + the residue below.

**Cites.** `## 10.0.0` › `_--success and --warning darken in the light arm_`.

### §2.1-RIDER · `Metric`'s up delta paints text in `--success`—LIVE → CURE-NOW (rendered text + paint)

The library breaks the C-1 rule the reply cites: `metric/styles.css:99-101`
`.metric__delta[data-polarity="up"]{color:var(--success)}` → 3.296:1 on `--card` at HEAD (2.13 at
8.0.0/9.0.0), a 1.4.3 miss (register-wave `T/RECORD.md:120-123`, residue 1). Cure: the ruling's second branch—CT measured the markup (`CT/RECORD.md`, §2.1 residue): the delta is one span with no glyph, sign mark or plate, so the number and its sign carry polarity and no tone rides the text. Every polarity paints `--foreground` (up from `--success` 3.30, down from `--destructive` 4.53, flat from `--muted-foreground`); a numeric rise is signed (`+3`, compact `+12.4K`) through the family's one seam—`coalesceMetric` gains `signed?: boolean` and `Metric.vue` passes `signed: true`; a string delta passes through; `data-polarity` stays on the node for a consumer's mark. Witness: two born-RED `it`s in `tests/components/metric.contract.test.ts`. Lands at 10.0.0, lane CT.

**Cites.** MIGRATION `## 10.0.0`, the `Metric` delta row (R2; the driver's item at `f3011618`: a rendered-text change, not paint-only—`:delta="3"` renders `+3`) and the reader-list amendment under `_--success and --warning darken in the light arm_`; CHANGELOG 10.0.0 line naming `signed` [to be reconciled at landing].

### O-32 §2.2 · `--card` ≡ `--background` in the light arm—LIVE → ANSWER

**8.0.0 consequence.** The tokens are distinct at all three datums: `--card` `hsl(30 85% 96%)`
(oklch 0.974 0.015 67.7), `--background` `hsl(40 30% 98%)` (oklch 0.987 0.003 84.6), 1.035:1 at
rgb8 (1.039 unrounded) light, 1.418 dark. Their banked 1.000 is the pre-decouple identity
(`--card` was `var(--neutral-0)`, `color-radius.css:60`), which DESIGN.md's stale palette block
still prints (`hsl(0 0% 100%)` for both).

**Grounds.** The near-identity in L is the design: the plate was split from the page by warmth,
not lightness (OKLab L within 0.013, separated by chroma and hue; `color-radius.css:60-72`). A
Card's separation is its edge rung plus cast (`card/styles.css:48-80`). SC 1.4.11 does not
require a non-control surface fill to contrast with its page. The `color-radius.css:60-72`
comment itself carries stale figures (`hsl 36 48% 97%`, dark `hsl(24 8% 16%)` against the bytes
`hsl(30 85% 96%)` / `hsl(26 22% 17%)`) (`verify__contrast-tokens.json`, O-32 §2.2).

**Answer.** The explicit ruling they asked for: intended; separation is edge and cast. Where
`--card` is a bare fill, draw the boundary once the way Card does—`1px solid oklch(from
var(--foreground) l c h / var(--ink-seam))` for a flush cell, `--ink-edge` for a raised cell or a
gap ≤ 12px (the gap law, `color-radius.css:114-118`). Edge ink over its own plate: seam 1.173,
edge 1.389 light.

**Docs CURE-NOW.** DESIGN.md palette block with real values and the one-ink sentence (lane R2);
the stale figures in `color-radius.css:60-72` and `:127-128`, a dated comment bracket (lane CT).
Lands at 10.0.0.

**Seats.** Investigate: LIVE → ANSWER. Verify: AMENDED—the 1.000 decoded, the stale comment named,
the exact Card form and the gap law added. Driver: ANSWER + the two doc arms.

**Cites.** DESIGN.md palette block (R2) [to be reconciled at landing].

### O-32 §2.3 · `--border` cannot be a 1.4.11 control boundary—PARTIAL → CURE-NOW (docs)

**8.0.0 consequence.** `--border` (= `--input` = `--neutral-4` `hsl(32 26% 70%)`) reads 1.865 on
`--card` light, 1.991 dark (their 2.001 is 1.991 on our dark card). The boundary carrier already
ships at their pin—`--foreground` at `--ink-perimeter` 0.48, 3.105 light / 3.791 dark on
`--card`, painted by `.field-control`—but is named only in token and component comments.

**Grounds.** Their second option is the design: `--border`/`--input` are surface tokens; the
control boundary is `color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%),
transparent)`, asserted by the test row `contrast-computed.test.ts` §3 (`:389`). DESIGN.md mentions
`ink-perimeter` 0 times. `--border-strong` collides with the one-ink law
(`color-radius.css:108-112`). The premise holds for three library controls: `SelectTrigger`,
`ToggleGroupItem` and the `.input-bar` rest on a 5% edge, 1.103 on `--card` light. The `:127`
comment's "1.28:1" reproduces on no token ground (`verify__contrast-tokens.json`, O-32 §2.3).

**Cure.** `--border-strong` DECLINED (one ink). DESIGN.md gets the boundary sentence scoped to
fields and check controls: Input, Textarea, NumberField, Checkbox, Switch and Radio paint
`--foreground` at `--ink-perimeter`, 3.1/3.8 on `--card`. RULING on the side reading:
SelectTrigger, ToggleGroupItem and `.input-bar` are text-identified controls; 1.4.11 does not
require a boundary for them; no paint moves; recorded here and not claimed in the doc. No token,
no gate (§3 already asserts the ratio). Lands at 10.0.0, lane R2.

**Seats.** Investigate: PARTIAL → CURE-NOW (docs). Verify: UPHELD with amendment—the three 5%-edge
controls bound what the doc may claim. Driver: CURE-NOW (docs), the side reading ruled.

**Cites.** DESIGN.md boundary sentence (R2) [to be reconciled at landing].

### O-32 §2.4 · the section ramp has zero headroom—MOVED → ANSWER

**8.0.0 consequence.** Four light stops miss 4.5 as text on `--card`—stop 4 4.272, 6 4.392, 10
4.239, 11 3.506—and stop 3 sits at 4.520. Their three landed stops reproduce to the third decimal
(`--card` 4.511/4.513/4.508, `--background` 4.687/4.690/4.684). 9.0.0 is the same ramp (the
three token files hash identically).

**Grounds.** B-7 declined widening and retuned the ramp; at HEAD stops 4/6/10/11 drop L (0.551 →
0.521, 0.579 → 0.549, 0.556 → 0.526, 0.601 → 0.511), C and H unchanged, dark arm no diff: on
`--card` 4.272 → 4.846, 4.392 → 4.988, 4.239 → 4.809, 3.506 → 5.064. HEAD minimum on `--card`
4.520 (stop 3), on `--background` 4.696 (stop 3). Asserted by the test row `contrast-computed.test.ts` §6
(`:911-925`) and §6c lockstep (`:949-969`). Their 4.454/4.438/4.433 are readings of unit `.e`'s handed-over L values (0.003-0.006 lighter than what they landed), not of any producer stop. Their overrides (L 0.538/0.541/0.540) are lighter than
HEAD's and still clear, so after the bump they are redundant; their `.dark` block restates the
unchanged dark arm (`verify__contrast-tokens.json`, O-32 §2.4).

**Answer.** No 14th stop (it moves the cliff). B-7's recipe is the citable rule: a stop that must
clear a floor drops L and keeps C and H, dark arm untouched. Keep the three overrides on 8.0.0 or
9.0.0; after 10.0.0 delete them and the `.dark` restatements.

**Seats.** Investigate: MOVED → ANSWER. Verify: AMENDED—the `--background` minimum is 4.696 not
4.68; the 4.45s decoded; delete the `.dark` block too. Driver: ANSWER.

**Cites.** CHANGELOG 10.0.0 ramp line [to be reconciled at landing]; O-20 LEDGER B-7.

### O-32 §3.1 (+ erratum `E-F9b-2`) · `aria-hidden` focusable spans—LIVE → ANSWER

**8.0.0 consequence.** The two `<span aria-hidden="true" tabindex="0" style="position: fixed;
border: 0px; …">` per admin state are reka's Toast FocusProxy head/tail pair inside the
`ToastViewport` our `<Toaster>` renders. They appear on every admin state because entering admin
mode fires fourier's own `toast("Admin mode activated")` (`web/src/stores/gallery.ts:138`) and
`e2e/gallery-admin-a11y.spec.ts` runs axe with no exclude while it is up. `<Dialog>` renders none.

**Grounds.** Style fingerprint: reka 2.9.10 `Toast/FocusProxy.js` renders VisuallyHidden with
`tabindex 0` + `position: fixed`, and VisuallyHidden stamps `aria-hidden` and `border: 0`—the
payload; `useFocusGuards`' guard carries `data-reka-focus-guard`, no `aria-hidden`, no border—not
the payload. A happy-dom probe of the published dists: `<Toaster>` + `toast()` → 0 before, 2
after, parent `role=region` `aria-label "Notifications (F8)"`, at 8.0.0 and 9.0.0; `<Dialog
open>` → 0 focusable `aria-hidden` spans, 0 guards; reka Dialog never calls `useFocusGuards`.
FocusProxy, ToastViewport and useFocusGuards are byte-identical 2.9.10 → 2.10.5 (latest,
2026-09-21). The proxy moves focus into the viewport on arrival, so focus never rests on it.
Their erratum is right: it is not a Metric render (`verify__dom-a11y.json`, O-32 §3.1).

**Answer.** Remedies are theirs: run the admin axe passes after the toast closes (or dismiss it
first), or exclude `[role="region"][aria-label^="Notifications"] > span[aria-hidden="true"][tabindex="0"]`.
We patch no reka DOM after mount (a masking patch) and fork no ToastViewport. RULING: no upstream
note is filed by glass-ui; ANSWER, not ROUTE.

**Seats.** Investigate: LIVE → ANSWER, attribution corrected to Toast FocusProxy. Verify:
AMENDED—fourier's own toast is the cause on every state, so "axe after it closes" leads. Driver:
ANSWER, no upstream filing.

**Cites.** None.

### O-32 §3.2 · no `aria-modal` on the rendered dialog—LIVE → CURE-NOW

**8.0.0 consequence.** The `role=dialog` node carries no `aria-modal`, but `DialogContent`
forwards `$attrs`, so `<DialogContent aria-modal="true">` stamps it today (probed at 8.0.0 and
9.0.0). Their `ExportModal.vue:47` comment says DialogContent supplies it; at 8.0.0 it does not.

**Grounds.** reka ships no `aria-modal` (0 files at 2.9.10 and 2.10.5). Our only stampers are
`PopoverContent.vue:110` (from its modal axis) and `ExpandableContainer.vue:16`. A patched 9.0.0
dist (`"aria-modal": modal.value ? "true" : void 0` in DialogContent's merge) → modal `'true'`,
non-modal absent (`verify__dom-a11y.json`, O-32 §3.2).

**Cure.** `DialogContent.vue` + `SheetContent.vue` stamp `:aria-modal="dialogRoot.modal.value ?
'true' : undefined"` (CommandDialog inherits). Witnesses in `tests/components/dialog/dialog-attrs.test.ts`
and the Sheet pair; RED at HEAD. Additive. Lands at 10.0.0, lane DA.

**Seats.** Investigate: LIVE → CURE-NOW. Verify: UPHELD, tested on a patched dist, the false
consumer comment added. Driver: CURE-NOW.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

### O-32 §3.3 · `useSidebarFollow` hard-codes a consumer class—LIVE → CURE-NOW **BREAKING**

**8.0.0 consequence.** `dist/sidebar.js:192` exempts `closest("[data-toc-id], .sidebar-top-btn")`
(same at 9.0.0; `useSidebarFollow.ts:156` at HEAD). fourier never runs this copy: it calls
latex-paper's, which carries the same string (§0.4).

**Grounds.** A producer that matches a consumer's private class has made it API. Sibling census:
no glass-ui consumer relies on the class. A patched 9.0.0 dist (probe: stubbed nav 100/2000,
item at 1000, pointerdown, `activeId` change, 1.5s of rAF): unpatched class → followed (960),
attribute → suspended (0); patched class → suspended (0), attribute → followed (960)
(`verify__dom-a11y.json`, O-32 §3.3).

**Cure.** `useSidebarFollow.ts` exempts `[data-toc-id], [data-sidebar-follow-exempt]`; the class
match goes, no dual selector; the options docblock names the attribute; born-RED happy-dom unit.
RULING: the attribute is `data-sidebar-follow-exempt`, and the reply carries it so fourier's
latex-paper letter can ask for the same name. Breaking by contract (a `.sidebar-top-btn` control
now suspends following). Lands at 10.0.0, lane DA.

**Seats.** Investigate: LIVE → CURE-NOW, breaking. Verify: UPHELD, the witness shape run.
Driver: CURE-NOW **BREAKING**, the name ruled.

**Cites.** MIGRATION `## 10.0.0`, the sidebar-follow row (R2) [heading to be reconciled at landing].

### O-32 §3.4 · `parentId` names the root, not the parent—LIVE → CURE-NOW **BREAKING**

**8.0.0 consequence.** `dist/sidebar.js:229`/`:233` set every entry's `parentId` to its root:
roots self-parented, depth ≥ 2 nodes name the root. On a four-level fixture (A > A1 > A1a >
A1a-i, A > A2, B) every node's `parentId` is its root at 8.0.0 and 9.0.0. `isInActiveChain`
answers correctly (it falls back to the descendant walk). fourier's index is latex-paper's; the
glass-ui `useSidebarState` it imports never reads `parentId`.

**Grounds.** `parentId` duplicates `rootId` under a name that promises the direct parent;
`useScrollTracker`'s `activeRootId` reads `parentId` as the root. Patched 9.0.0 dist: A null, A1
A, A1a A1, A1a-i A1a, A2 A, B null; `rootId` and `isInActiveChain` unchanged. The type already
allows `string | null`; the demo data authors `null` for roots; `useScrollTo.test.ts:32` authors
the defect's convention (`verify__dom-a11y.json`, O-32 §3.4).

**Cure.** `parentId` = direct parent, `null` for roots; `rootId` unchanged;
`useScrollTracker.activeRootId` reads `rootId`; `types.ts` docblock; the `useScrollTo.test.ts:32`
fixture to `null`; born-RED witnesses in `useTreeIndex.test.ts` and `useScrollTracker.test.ts`.
No alias field. Lands at 10.0.0, lane DA.

**Seats.** Investigate: LIVE → CURE-NOW, breaking. Verify: AMENDED—latex-paper is fourier's index;
the fixture moves with the cure. Driver: CURE-NOW **BREAKING**.

**Cites.** MIGRATION `## 10.0.0`, the `parentId` row (R2) [heading to be reconciled at landing].

### O-32 §4.1 · `cm-serif` reads a variable glass-ui never declares—LIVE → CURE-NOW **BREAKING**

**8.0.0 consequence.** `dist/styles/typography/utilities.css` emits `@utility cm-serif
{font-family: var(--font-serif-math, serif)}` and 0 dist files declare `--font-serif-math:`.
fourier declares it in its own `@theme` (`web/src/style.css:94`, built into `@layer theme`), which
wins today because nothing competes. The same at 9.0.0.

**Grounds.** The investigator's cure (declare it in our unlayered token `:root`) was OVERTURNED
by test: unlayered beats layered regardless of order, so it would repaint fourier's 31 `cm-serif`
sites in 18 files from Computer Modern to the UA serif (Chromium: `CMX` → `serif`). The house
shape for a consumer-settable font register is the `@theme` bridge (`bridges.css:79-80`). A
plain-`@theme` declaration emits `--font-serif-math` in `@layer theme` and mints
`.font-serif-math{font-family:var(--font-serif-math)}`; a later consumer `@theme` replaces the
value in the one emitted root (Tailwind compile probe). Keeping `cm-serif` beside the minted
utility would be an alias (`verify__api-cascade.json`, O-32 §4.1).

**Cure.** `--font-serif-math: serif` in `bridges.css`'s plain `@theme` block (mints
`font-serif-math`); `@utility cm-serif` deleted with its docblock mentions; demo
`typography.vue:147` → `font-serif-math`; born-RED unit over the built dist. NEVER the unlayered
token root. Roster delta (−`utility cm-serif`, +`theme --font-serif-math`, + the utility row)
recorded by the lane, rebound by the driver at the close (§B-3). Their `@theme` declaration keeps
winning unchanged; an undeclared consumer paints `serif`, as today. Lands at 10.0.0, lane AC1.

**Seats.** Investigate: LIVE → CURE-NOW, non-breaking, unlayered root. Verify: OVERTURNED—the
repaint measured; theme-scope + retire `cm-serif`. Driver: CURE-NOW **BREAKING** on the
verifier's shape; §B-1.

**Cites.** MIGRATION `## 10.0.0`, the `cm-serif` → `font-serif-math` row with the §B-1 sentence
(R2) [heading to be reconciled at landing].

### O-32 §4.2 · `cn` does not know its own aliases—see O-23 L-2

One row with O-23 L-2; disposition CURE-NOW, lane AC1, answered there.

### O-32 §4.3 (a) · `SegmentedTabs`' `modelValue: string`—LIVE → CURE-NOW

**8.0.0 consequence.** `SegmentedTabs.vue.d.ts:88` `modelValue: string`, `:99`
`"update:modelValue": (value: string)`; fourier's `EquationView.vue:351` carries `$event as
'controls' | 'canvas'` (and `EquationModeToggle.vue:53` a cast). The same at 9.0.0.

**Grounds.** SegmentedTabs does not wrap reka's `TabsRoot` (its engine is `useSelectionGroup`).
A probe cut to the consumer's callsite (inline options, no `as const`, assertion removed): HEAD
→ `TS2322: Type 'string' is not assignable to type '"canvas" | "controls"'`; the patched generic
→ clean; a mismatched inline `'other'` → TS2322 (`verify__api-cascade.json`, O-32 §4.3 SegmentedTabs).

**Cure.** `generic="T extends string = string"`; the seven types move to `tabs/types.ts` with
defaulted parameters (a generic script-setup block cannot export them), re-exported from
`index.ts` under the same names; `defineModel<T>`; `onMobileUpdate` resolves through
`props.options`; `useTabResponsive` threads the parameter. RULING: `T extends string` (numbers out
of scope). Born-RED vue-tsc fixture mirroring EquationView. Not breaking. Lands at 10.0.0, lane AC1.

**Seats.** Investigate: LIVE → CURE-NOW. Verify: UPHELD by the consumer-shaped probe. Driver:
CURE-NOW, the bound ruled.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

### O-32 §4.3 (b) · does `glass-floating` reach portaled content—NOT-APPLICABLE → ANSWER

Yes for the class, no for ancestor tokens, identically at 8.0.0, 9.0.0 and HEAD.
`.glass-floating` is an unscoped class rule in `@layer components` (`ladder.css:124`; no scoped
`data-v` rule in any SFC), so it paints any element that carries it, teleported or not; our
portalled roots carry it on the portalled element (Tooltip, Popover, DropdownMenu and sub-content
via `_shared/overlay/content.ts:58-59`, plus DialogContent and SheetContent). Custom properties—
`--glass-*`, `--radius-ctx`, `--glass-backdrop` (which drives the `@container
style(--glass-backdrop: light)` arms)—set on an in-tree wrapper do not reach content teleported to
`<body>`; set them on `:root` or on the portalled root through its `class` prop. `.dark` reaches
portalled content because it sits on `html` (`verify__api-cascade.json`, O-32 §4.3 glass-floating).
Upheld by both seats.

### O-32 §4.3 (c) · fr-CanvasControlsDock L-23, the producer half—LIVE → CURE-NOW

**8.0.0 consequence.** The reveal-stagger ladder counts every child (`nth-child(N of *)`), so
each of fourier's two DockSeparators (`CanvasControlsDock.vue:87`, `:102`) takes a rung, and the
deep-middle rung is start-indexed only. Identical at 9.0.0 (the three ladder rules ship 1/1/1 in
both dists).

**Grounds.** Chromium on rules cut verbatim from HEAD `layers.css:300-314` (c control, `|`
separator): 5 controls `0 1 2 3 3`; `csccccsc` `0 |1 2 3 3 2 |1 0`; 10 controls
`0 1 2 3 3 0 0 2 1 0` (the 6th and 7th match no rung). Cured copy (`of :not(.dock-separator)`,
deep middle bounded from both ends): `0 1 2 1 0`; `0 |0 1 2 2 1 |0 0`; `0 1 2 3 3 3 3 2 1 0`. Two
docblocks contradict: `:281-291` "outer→in" (with a stale "capped at the 6th child … step × 5")
and `:292-299` "SYMMETRIC center-out" (`verify__api-cascade.json`, O-32 §4.3 L-23).

**Cure.** Each `of *` → `of :not(.dock-separator)`; the deep-middle rule bounded
(`nth-child(n + 4 of …):nth-last-child(n + 4 of …)`). RULING on direction: the painted edge-in
ladder is the intent; the "center-out" docblock is the error and is rewritten, the stale cap
sentence struck. Browser witness in the dock suite (RED at HEAD on `0 |1 2 3 3 2 |1 0`). Their
sibling dock's single-wrapper collapse is their markup: one wrapper is one child and gets one beat.
Lands at 10.0.0, lane AC2.

**Seats.** Investigate: LIVE → CURE-NOW. Verify: UPHELD, the 10-control hole added. Driver:
CURE-NOW, edge-in ruled.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

### O-32 §4.3 (d) · AC-D-1, the dock scoped-block frame break—DEAD → ANSWER

**8.0.0 consequence.** GlassDock renders one root, `div.glass-dock`, carrying `$attrs` under
`inheritAttrs: false`, so a consumer's scoped `.animation-dock:where(.expanded)` matches the dock
itself. The carry's `--dock-max-inline-size` rename works at 8.0.0, where `shell.css` and `overflow.css` read it (3 occurrences in the dist, the third the `useDockShellProps.d.ts` docblock).

**Grounds.** `@vue/compiler-sfc` parse at v8.0.0 and HEAD → one template root. The frame element
existed at v4.0.0 (`GlassDock.vue:350`) and is comment-only by v7.0.0 (`git grep`), so the carry's
"survives the 7.0.0 uplift" does not reproduce: the frame is a 4.0.0 fact. `glass-dock-frame`: 0
in the 8.0.0 and 9.0.0 dists. From 9.0.0 (BK #47 W3 LATTICE, 2026-08-24) `--dock-max-inline-size`
has 0 readers and no dock rule sets `max-inline-size`, while `offsets.css:40` still declares it,
its docblock still calls it canonical, `demo/stories/dock/overflow.vue:67` still sets it, and
MIGRATION `## 5.0.0` still teaches it (`verify__api-cascade.json`, O-32 §4.3 AC-D-1).

**Answer.** Nothing left to cure in the frame. On the hop past 8.0.0, write a plain
`max-inline-size` in the scoped rule on the dock's class.

**Seats.** Investigate: DEAD → ANSWER, the dead token as an open question. Verify: UPHELD, the
frame dated to 4.0.0. Driver: ANSWER + the dead token below.

**Cites.** The `## 9.0.0` late removal row (AC-D-1-RIDER) [to be reconciled at landing].

### AC-D-1-RIDER · `--dock-max-inline-size` is declared with no reader—LIVE → CURE-NOW

The no-masking-fallback law: a token taught as canonical with 0 readers is a dead primary. Deleted
at `offsets.css:40` with its docblock, and at `demo/stories/dock/overflow.vue:67` (lane AC2); a late
removal entry under `## 9.0.0`—removed at LATTICE, recorded at 10.0.0 (lane R2). Lands at 10.0.0.

### O-32 erratum `E-F9b-2` · the component named was wrong—ANSWER

Read as one row with §3.1, as they ask: reka-ui focus-proxy spans, focusable under `aria-hidden`,
inside the glass overlay stack; not a `Metric` ask. Our measurement agrees with theirs on the
component and refines the part: it is Toast's FocusProxy through `<Toaster>`, not `FocusGuards`
through the dialog (`glass-ui dist/components/metric/` carries no such markup;
`verify__dom-a11y.json`, O-32 §3.1). The owner of the remedy is theirs (§3.1).

### O-32 A-1 · capsule-track `--muted-foreground` binding omission—LIVE → CURE-NOW

**8.0.0 consequence.** The `-strong` re-binding is `:where(.feedback-tone, .glass-capsule)` only
(`ladder.css:234`, already in `@layer components`), so an inactive pill SegmentedTabs label on the
`.glass-capsule-track` root paints `#8b7257`, 3.48:1 on `#e9e0d7`—which is exactly our quiet track
plate (veil `oklch(0.28 0.035 70)` at α 0.10) over `--card`. The same at 9.0.0.

**Grounds.** Chromium computed-colour probe (HEAD vs patched ladder inside the real `@layer
components`): inactive pill light 3.480 → 5.339 on track/card; dark 5.028 → 8.049; active
unchanged. The plain content-tier rung (`--on-glass-muted`) would read 4.09—not enough. The only
source consumer of `.glass-capsule-track` outside glass-ui is fourier's `f45901e` binding
(`verify__contrast-tokens.json`, O-32 A-1).

**Cure.** Their shape: `:where(.feedback-tone, .glass-capsule, .glass-capsule-track)`
(specificity 0, no token, no gate); born-RED row in `contrast-computed.test.ts` (≥ 4.5 over the
quiet plate on `--card`, both arms). Paint-only. fourier deletes `f45901e`'s binding after the
bump. Lands at 10.0.0, lane CT.

**Seats.** Investigate: LIVE → CURE-NOW, arithmetic only (patched copy never on disk). Verify:
UPHELD by the probe; the ground named. Driver: CURE-NOW.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

### O-32 A-2 · `E-F10S-b1`, the press guard swallows a stable-target click—LIVE → SPLIT

**8.0.0 consequence.** A press that begins while the dock root carries `data-morphing` is swallowed
even when press and click land on the same control—fourier's `#persistent` Save and the fullscreen
DockControl clicked during the hover-expand—and no prop reaches the guard.
`useDockClickIntegrity.ts` is unchanged v8.0.0 → HEAD; each dist carries one swallow site.

**Grounds.** The guard's root cause is an identity change under the pointer (race (b): the
approach-hover swaps the layer, the click lands on the expanded layer's control at the old
coordinates—the deck's gear race). `#persistent` never swaps and is never a crossfade pane, so
that cause cannot produce a press there. The fullscreen control lives only in the full layer of a
start-collapsed dock (`CanvasControlsDock.vue:41`, `:111-113`), so the pointer is never on it when
the morph begins; from DOM events a mid-morph press on a freshly arrived control is
indistinguishable from race (b). A scratch harness (HEAD composable copy, happy-dom, six
scenarios, three identical runs): the investigator's `morphStartTarget` cure leaves race (b) and
the fourier-fullscreen case swallowed, so it promised a case that cannot happen on a hover-expand;
the persistent-only arm passes the persistent cases and keeps race (b) swallowed
(`verify__dom-a11y.json`, O-32 A-2).

**Cure (CURE-NOW, not breaking).** A press on a control inside `#persistent`/`#persistent-end`
passes when press and click land on the same control (a `.dock-persistent` `closest()` arm; no new
listener, no `markMorphStart`); the docblock names the exemption. Witness: a GlassDock SFC unit—a
persistent press mid-morph fires, a full-layer press mid-morph is still swallowed. RULING on the live check: DA ran it (Chromium, `/dock/overview`, `DA/RECORD.md` "the persistent arm") and it measured the precondition false by a bounded amount—`.dock-persistent` drifts 4 px during the morph (the collapsed→expanded pad, 8 → 12 px) and a pointer resting within 4 px of its inline edge sees the control's hover lift from t = 164 ms, 136 ms before the earliest measured press. DA STOPPED; the driver re-ruled at `b13a792e`: (a) LAND AS IS—no layer swaps and the control's identity is constant, so it is not race (b); (b) pinning the persistent geometry through the morph DECLINED (liquid-weight); (c) declining the persistent half DECLINED (leaves the defect). The banked arm and its SFC witness restore verbatim with a recorded RED→GREEN. Known bound, carried to the reply in one sentence: a press within 4 px of a persistent control's inline edge during the morph activates the control it visibly hovers. The stationary-pointer check is recorded as measured, not as a pass; Safari not required (identity logic, not paint). Lands at 10.0.0, lane DA.

**DECLINE.** The arriving-layer (fullscreen) half: the remedy is theirs—await settle
(`await expect(dock).not.toHaveAttribute("data-morphing")` before the click), which their F-W10S
record already names. A prop that turns the guard off: it would hand every consumer a switch that
reopens race (b).

**Seats.** Investigate: LIVE → CURE-NOW (pointermove + `markMorphStart` arm). Verify: OVERTURNED
in part—harness-proven not to cure G-F9-11; amended to the persistent-only arm. Driver: SPLIT on the verifier's amendment; the live check measured (DA), the STOP re-ruled (a) LAND AS IS at `b13a792e` with the 4 px bound.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

### O-32 A-3 · `E-F10S-b2`, underline inactive ink under 4.5—LIVE → CURE-NOW

**8.0.0 consequence.** The inactive underline tab paints the pill recipe
(`color-mix(--muted-foreground, --glass-capsule-warm 12%)`) = `#8b7257` at `--type-subheading`
20.4px weight 500 (not large text): 4.360 on `--background` (their 4.33 at hex), 4.196 on `--card`
light; dark 6.746 / 4.757. The same at 9.0.0.

**Grounds.** The paper strip has no capsule, so no reason to carry the capsule's warm and no
`-strong` rung to absorb the loss. Chromium probe, guarded rule inserted before the underline
`:hover` rule: inactive light 5.216 bg / 5.020 card, dark 7.713 / 5.439; active and hover
unchanged. The unguarded variant repaints the ACTIVE tab (probed), so the guard is required
(`verify__contrast-tokens.json`, O-32 A-3).

**Cure.** In `segmented.css`, before the underline `:hover` rule:
`.segmented-tabs--underline .segmented-tab:not([data-active]) { color: var(--muted-foreground); }`;
born-RED contrast row (≥ 4.5 on `--background` and `--card`, both arms). Paint-only. Their
`visualization-crud.spec.ts:664` fixme can lift after the bump. Lands at 10.0.0, lane CT.

**Seats.** Investigate: LIVE → CURE-NOW, arithmetic only. Verify: UPHELD by the probe, the guard
proven. Driver: CURE-NOW.

**Cites.** CHANGELOG 10.0.0 [to be reconciled at landing].

## §B—class rulings (from `RULINGS.md` §B, the one source)

- **B-1 · the token-root contract.** glass-ui's token `:root` is unlayered (the A-3-CLASS
  exception) and beats every layered consumer `:root` (`@theme`, `@layer glass-overrides`).
  MIGRATION §10.0.0 states it: "`:root` token overrides must be unlayered, or set on an element
  below `:root` in any layer." Consumer-settable FONT registers live in the theme layer
  (`bridges.css` `@theme`, the §4.1 shape); every other consumer-settable seam is a plain unlayered
  `:root` token (the L-3 shape). A declared-nowhere `var()` default is never the shape. Rows that
  turn on it: O-32 §4.1, O-23 L-3.
- **B-2 · test rows are not gates.** A unit in the `npm test` tree that mints no gate seat is a
  test row; gates stay exactly 60. Every witness in this ledger is a test row.
- **B-3 · roster and ratchet are the driver's.** Lanes record deltas; the driver rebinds
  `.published-roster` and `.bundle-ratchet` on the committed tree at the close. The one roster
  delta here is §4.1's.

## §D—the cure wave that follows

Lanes, rows and fences are `RULINGS.md` §C, the one source; not restated. Order: (CT → AC1) ∥
(DA → AC2) ∥ AUTHOR, then R2, then the driver's roster and ratchet rebind, then the 10.0.0 cut.
Discipline: born-RED witnesses (RED line recorded before the cure, GREEN after); gates exactly 60;
no masking fallbacks, aliases or dual selectors; BREAKING cures are clean breaks; no seat commits,
the driver commits by pathspec.

Rider homes (the one mapping §C lacks): L-4-RIDER and §2.1-RIDER → CT; §1.1-RIDER and S-18-RIDER → R2; AC-D-1-RIDER → AC2 (src/demo) + R2 (docs); the author's final bracket pass after R2.

## Register

- **Not owed, recorded.** A Safari cell for L-1 (ruled out; degrades to load-when-visible). A
  separate paint probe for L-6 (rides the next live-π band). An upstream reka note for §3.1 (not
  filed by glass-ui).
- **Theirs, named in the reply.** latex-paper's twins of §3.3 and §3.4 (fourier's own letter; the
  attribute name is carried). The await-settle remedy for A-2's fullscreen half. The axe remedy
  for §3.1. Deleting `f45901e`, the three ramp overrides, the `.dark` restatements, the
  `text-tier-*` class on `<Metric>`, and the `aria-modal` pass-through after the 10.0.0 bump.
- **Owner-reserved.** The 10.0.0 cut and any publish.

## Tally

| disposition | rows |
| --- | --- |
| CURE-NOW | O-23 L-1 · L-2 ≡ O-32 §4.2 · L-3 · L-4-RIDER · L-5 (docs) · L-6 · S-18-RIDER (docs) · O-32 §1.1-RIDER (docs) · §2.1-RIDER · §2.2 (docs arms) · §2.3 (docs) · §3.2 · §3.3 **BREAKING** · §3.4 **BREAKING** · §4.1 **BREAKING** · §4.3 (a) · §4.3 (c) · AC-D-1-RIDER · A-1 · A-2 (persistent limb) · A-3 (21 rows or limbs; three BREAKING) |
| ANSWER | O-23 §1 · L-4 · L-7 · O-23 §4.1 · S-1..S-21 (every strike STANDS) · O-32 §1.1 · §1.2 · §2.1 · §2.2 · §2.4 · §3.1 · §4.3 (b) · §4.3 (d) · erratum E-F9b-2 (13 rows plus the 21 strikes) |
| SPLIT | O-32 A-2 (CURE-NOW persistent limb + DECLINE on three limbs) (1) |
| DECLINE | the text-bearing 4.5 half of §2.1 (a `--success-ink` rung, under C-1) · `--border-strong` (§2.3) · the declared-nowhere `var()` shape (L-3) · A-2's arriving-layer limb · A-2's guard prop · A-2's geometry pin (re-rule (b), `b13a792e`) (6 limbs, none a whole row) |
| KILL · ROUTE · CURE-NEXT-MAJOR | none |

| state at HEAD before the cure lanes | rows |
| --- | --- |
| LIVE | L-3 · L-4-RIDER · L-5 · L-7 · S-18-RIDER · §1.1 · §1.1-RIDER · §2.1-RIDER · §2.2 · §3.1 · §3.2 · §3.3 · §3.4 · O-32 §4.1 · §4.3 (a) · §4.3 (c) · AC-D-1-RIDER · A-1 · A-2 · A-3 (20) |
| PARTIAL | L-1 · L-2 ≡ §4.2 · L-4 · L-6 · §2.1 · §2.3 (6) |
| MOVED | §2.4 (1) |
| DEAD | O-23 §1 · O-23 §4.1 · O-32 §4.3 (d) (3) |
| NOT-APPLICABLE | §1.2 · §4.3 (b) (2) |

The erratum row takes its state from §3.1; the 21 strikes are tallied in §S, not here. Every
inbound label is answered by name: O-23 §1, L-1..L-7, S-1..S-21, §4; O-32 §1.1, §1.2, §2.1-2.4,
§3.1-3.4, §4.1-4.3, E-F9b-2, A-1..A-3. O-32 §5 (method note) and §6 (asks) and O-23 §5 (reply path) carry no row; received. Three cures break a published contract at 10.0.0 and each
carries a MIGRATION row: the sidebar-follow attribute, `parentId` as the direct parent, `cm-serif`
→ `font-serif-math`. Paint changes on purpose, each stated in its row: A-1, A-3, §2.1-RIDER (also rendered text: a numeric rise renders `+N`),
L-4-RIDER, L-6 (block size), L-23 (per-child onsets), L-3 (none at default). Every CURE-NOW lands
at HEAD for 10.0.0 and reaches fourier at its bump from 8.0.0.
