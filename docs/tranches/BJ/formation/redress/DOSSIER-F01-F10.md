# BJ redress dossier — rows F01–F10 (Fable seat)

**Mode:** TRANCHE DEVELOPMENT. This file is the only artifact — no `src/`/`demo/` touch, no commit.
**Charge:** every screenshot and exhortation in rows F01–F10 inventoried, isolated, targeted, and
planned for redress; each defect correlated to its exact demo story page AND src component
(`file:line`), with a post-mortem and an amelioration reconciliation against the formation corpus as
it stands.
**Sources read first-hand:** the six on-disk screenshots for these rows (`feedback/F01`, `F03`, `F04`,
`F05`, `F09`, `F10`); `FEEDBACK-LEDGER.md`; the live chassis (`demo/stories/dock/**`,
`demo/chassis/landing/**`, `src/components/{card,configurator}/**`); and the reconciliation corpus
(`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md` incl. the R3a/R3b folds, `CHRONIC-ADJUDICATION.md`,
`ADJUDICATION-1.md`, `waves/BAND-{STORY,PERF,MATERIAL,REDUCTION}.md`, `perfection/FABLE-STORY-FRAMEWORK.md`,
`perfection/FABLE-DAG-REDUCTION.md`, `greenfields/GF-DOCK-PASS3.md`, `greenfields/GF-AURORA-PASS3.md`,
`ios27/IOS27-CODEX.md`).
**Rows with a screenshot:** F01, F03, F04, F05, F09, F10. **URL-anchored, no screenshot:** F02, F06,
F07, F08 (confirmed absent on disk — no `feedback/F02*.png`/`F06*`/`F07*`/`F08*`).
**HEAD:** `codex/bi-p-q-execution` (`55f5170d`). Every correlation below was re-read on disk at HEAD.

Register: plain, evidence-cited. Where R3a/R3b cleared or reframed a row, the redress engages that
adjudication on evidence rather than contradicting it blindly.

---

## F01 — preview cards more expressive + slow partial-then-stutter load

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:13`): *"Preview cards could be better, more expressive with
active items, better sized (different sizes, masonry-layout like). Further: preview cards AND all story
pages are slow to load in — partially load, then stutter."* Screenshot: `feedback/F01-preview-cards.png`.

**ISOLATION (first-hand read).** The image shows a `CATEGORIES` mono-caps eyebrow over a large
category card ("Foundations / Colors, type, radii, shadows, motion, paper & glass."). Its inner preview
region is a near-empty beige gradient rectangle with only the word "Colors" typeset bottom-left — a
plain typographic slab, not a rendition of any component. The card is a single fixed size (no varied
sizing, no masonry), and the media well is visibly a SECOND rounded/inset panel nested inside the outer
card rim. So three distinct defects: (a) vacancy — the preview shows no live-looking component; (b)
uniform sizing — one card shape, no masonry; (c) the card-in-card nesting. The stutter half is not
visible in a still — it is the reported partial-paint-then-jank on load.

**TARGET.**
- Layout/vacancy/masonry — `demo/chassis/landing/SectionPreviewCard.vue` (the tile is rendered inside a
  second bordered/inset well at `:35-54`; `content-visibility:auto; contain-intrinsic-size:auto 19rem`
  at the `.section-preview-card` style block, confirmed on disk in the `<style scoped>` at `:63-65`),
  `demo/chassis/landing/{SectionLanding.vue,CatalogLanding.vue}` (the fixed `grid grid-cols-1 …
  lg:grid-cols-3` bento), and the tile ladder `demo/stories/**/storyTile.ts` / `resolveStoryTile` /
  `vizPreviewStill.ts` (authorship coverage = only 4 `.tile.vue` files exist across the whole demo).
- Perf/stutter — `demo/shell/AppShell.vue:11,26,27,28` (eager static imports of Aurora + PresetEditor +
  both docks → ~770KB eager JS / 73 modulepreloads), `demo/chassis/hero/aurora-hero.ts:15` (config
  re-drags the aurora barrel), the always-on `fixed inset-0` shell Aurora (`AppShell.vue:147-156` with
  the never-reachable pause guard, `useIntersectionPause.ts:61`).

**POST-MORTEM.** Authorship gap plus a perf architecture that saturates the boot thread. The tile
ladder (`authored → still → identity`) is sound and mounts 0 GL contexts by construction
(`FABLE-STORY-FRAMEWORK.md:121-134`); the vacancy is that only 4 of 88 stories were ever given a
`.tile.vue`, so most cards fall to the typographic identity floor — the "expressive" work was simply
never authored. The stutter is that AppShell drags the WebGL aurora + the full configurator into the
eager graph and gates `app.mount()` behind ~1.1MB, then runs a continuous idle rAF field behind every
route (R3b: ~40k RunTasks / ~1.6s task time at idle on light pages, `REGISTRY.md:322-326`). Neither is
a mystery bug; both are unpaid design/perf debt.

**REDRESS.** Layout half → `BJ.W-PREVIEW-CARD` (`BAND-STORY.md:355-417`) as reframed by
`FABLE-STORY-FRAMEWORK.md` §3 + AMEND-D-4/D-5: author a `.tile.vue` for every category headline + each
landing lead (4/88 → catalog-bento + landing-leads never `identity`, gate `G-TILE-COVER`), route
`CatalogLanding` through `resolveStoryTile` (it bypasses the ladder with a direct `identityTile`,
`CatalogLanding.vue:40`), native-CSS masonry with ≥2 card sizes, and collapse the double-well to one
card + one media region (AMEND-D-5, resolves OPEN-D7). Perf half → `BJ.W-BOOT-DIET` +
`BJ.W-SHELL-FIELD-GOVERN` + `BJ.W-DEFERRED-PAINT` (`BAND-PERF.md` W1/W2/W3) with the R3b DEV baselines
seeding the LCP/idle-rAF gates. Note the perfected framework STRIKES the draft's "live miniature … real
cheap render" line (`BAND-STORY.md:374`) as contradicting the 0-GL contract and the R3b idle-rAF
finding — the "active" read comes from an authored CSS/DOM vignette or a frozen still, never a
per-card loop (AMEND-D-4). **Verdict: EXACT.** The user's "active items" is satisfied by authored
vignettes under the reconciled 0-GL reading; a hover/idle-breath enrichment of a card is already the
engagement band's remit (`BI.W-ENGAGE-AFFORD`), not an uncovered residue.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:23`). AGREE — both halves have named
owners with born-RED gates; the perfection reframe sharpens rather than displaces it.

---

## F02 — /foundations cards blank white

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:14`): *"Most of the cards are blank white."* Anchor
`/foundations`. **URL-anchored, no screenshot** (no `feedback/F02*.png` on disk).

**ISOLATION.** Isolated from ledger + live code + the R3a live probe. On `/foundations` the
`SectionPreviewCard`s that lack an authored `.tile.vue` fall to the typographic identity floor — a dark
translucent slab with only the section name — which reads as "blank." Below the fold the same cards are
literally unrendered until scrolled near, because `content-visibility:auto` +
`contain-intrinsic-size:auto 19rem` is applied to every card unconditionally
(`SectionPreviewCard.vue` `<style scoped>`, confirmed on disk); while the ~1.1MB boot saturates the
main thread the above-fold cards paint late too.

**TARGET.** `demo/chassis/landing/SectionPreviewCard.vue` (the `content-visibility` block + the
identity-tile fall-through), `demo/chassis/landing/CatalogLanding.vue:40` (direct `identityTile`
bypass of the ladder), `storyTile.ts` / `resolveStoryTile` (coverage), and the boot-thread saturation
(`AppShell.vue`, family E).

**POST-MORTEM.** Instrumentation-read plus authorship gap. R3a drove this live
(`REGISTRY.md:291-294`) and CLEARED it *as a paint defect*: the cards are the DELIBERATE
identity-fallback rung, not a broken render — `/display` proves richer tiles render where authored. The
"blank" is honest fallback made visible by 4/88 authorship coverage, compounded by
`CatalogLanding.vue`'s ladder bypass that forces the root home to identity slabs regardless of coverage
(`FABLE-STORY-FRAMEWORK.md:342-347`).

**REDRESS.** Same owner as F01 — `BJ.W-PREVIEW-CARD` (`BAND-STORY.md:355-417` + `FABLE-STORY-FRAMEWORK.md`
§3, gate `G-TILE-COVER` at §9): author the missing tiles, route `CatalogLanding` through
`resolveStoryTile`, and exempt above-fold cards from `content-visibility:auto` (the layout half in W5;
the live-trace deferred-paint gate is ceded to family E, `BAND-PERF.md:266-289`). **Verdict: EXACT.**
The authorship cure precisely resolves the user's complaint. I engage R3a's CLEARED ruling: I AGREE the
"blank white" is not a paint bug and the identity fallback is deliberate — but CLEARED here means the
*defect reading* is retired, NOT the complaint; the authorship-coverage cure is real, specced, and
gated.

**STATUS CHECK.** Crosswalk flag `CLEARED` (`ASSEMBLY-CROSSWALK.md:24`; R3a fold #2). AGREE — with the
explicit nuance that "cleared as a paint defect" carries a live authorship cure, not a dismissal.

---

## F03 — "most of this is worthless" (+ the parsimony edict)

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:15`): *"'Most of this is worthless.'"* plus the re-stated
parsimony edict (extreme parsimony, KISS-forward, fewer lines, little time on contrived gates, majority
on direct implementation via agent orchestration + visual verification). Screenshot:
`feedback/F03-worthless-section.png`.

**ISOLATION (first-hand read).** The image is a dock story page: a heading "Controlled — no rail", a
descriptive paragraph loaded with inline code tokens (`<DockCrossfade :active>`, `--dock-t`), an
`Assets / Layers / Media / Type` segmented control, then a LARGE mostly-empty region with a single
small circular "Assets / images / fonts" blob floating in its centre, then a numbered "Mechanics" list
(1–5) narrating implementation internals — CSS grid `1 / 1`, `opacity: var(--dock-t)`,
`calc(1 - var(--dock-t))`, `useDockSpring`, `.dock-face-content`, `--dock-morph-t`. Two defects: (a)
the copy is implementation-mechanics exposition written for a tranche auditor, not a library user; (b)
the proportion is wrong — a big empty panel carrying one tiny centered blob is mostly dead space.

**TARGET.** `demo/stories/dock/layers.vue` — confirmed on disk as the exact page: `:279` `heading="Controlled — no rail"`, `:303` `<DockCrossfade :active="controlled">`, `:319` `class="dock-face-content …"`, `:329` `heading="Mechanics"`, `:335` the `.dock-face-content` / `--dock-morph-t` list item. Plus the copy-canon sibling site `demo/stories/manifest.ts:932` (the completion-seal blurb "stroke-dashoffset wipe on four @property motion tokens", confirmed on disk).

**POST-MORTEM.** Authorship-voice gap plus proportion neglect. The demo pages were written as living
design notes to the tranche, so internal token/composable/class names leaked into user-facing prose and
whole "Mechanics" sections narrate springs the demo already shows. `FABLE-STORY-FRAMEWORK.md:385-391`
(finding 10) names this precisely: F03 is a *systemic* "Mechanics"-narration PATTERN with inline
`<code>` used for internal-token exposition, not the discrete blurb sites the census first enumerated.

**REDRESS.** Copy half → `BJ.W-STORY-COPY-CANON` (`BAND-STORY.md:140-219`) as governed by the perfected
copy canon (`FABLE-STORY-FRAMEWORK.md` §5) — the allow-list (name, one-line lede, section heading +
purpose, state labels, ONE user-facing usage snippet) and the ban-list (internal tokens/composables/
class names in prose). The perfected `G-COPY-LINT` (§9) greps `demo/stories/**` prose for
`--[a-z-]+` / `use[A-Z]\w+` / `\.[a-z-]+-content`, which reaches the layers.vue tokens. Proportion half
→ `BJ.W-ARISTOTLE-PROPORTION` (`BAND-MATERIAL.md:456-524`), which explicitly lists F03 as the
"superfluous/distracting" class (`:481-485`) and marks the empty-panel/blob disproportion for its
owner. **Verdict: PARTIAL.** Residue: BAND-STORY W2's *born-RED site enumeration* (`G-COPY-2`,
`BAND-STORY.md:195`) greps handmark/search only — NOT `layers.vue`, the exact F03 page — and
neither gate yet carries an explicit clause banning the "Mechanics narration PATTERN" that
`FABLE-STORY-FRAMEWORK.md:385-391` says the canon "MUST ALSO" ban. The general `G-COPY-LINT` regex
would catch the tokens, but the pattern-level ban and the F03 site are not pinned.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:25`). AGREE it lands, with the one
enumerated residue above (delta D-F03).

---

## F04 — "this shape is to be abrogated" (+ grand audit with questions relayed)

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:16`): *"'This shape is to be abrogated' — simplify components
to better, more opinionated defaults; KISS. A grand audit of ALL components with questions in reduction
relayed to the user."* Screenshot: `feedback/F04-shape-abrogate.png`.

**ISOLATION (first-hand read).** The image is a single vertical stadium-pill dock on pure black, its
nav icons — home, then a divider, then compass, shapes (triangle/square/circle), cubes, navigation
arrow — each seated inside a thin outline-ring circle within the pill. The "shape to be abrogated" that
the user is pointing at is this dock construction: decorative per-item outline rings nested inside a
stadium pill.

**TARGET.** `demo/stories/dock/rail.vue` — the "Vertical dock" section (confirmed: `:31-40` the
`entries` list, rendered as `DockControl`s from its leading slice; the sliced icon set —
Home/Compass/Shapes/Boxes/Navigation — matches the screenshot, though the full eight-entry array does
not), consuming `src/components/dock/**` (GlassDock + DockControl). The verbal
"opinionated defaults / KISS" also targets `src/components/card/Card.vue:33` (`grain: true`) + `:39`
(`metal: "gold"`) — the gold-metal+grain default shape — and the L6 demo-devices on the public surface
(`FABLE-DAG-REDUCTION.md:88-91`).

**POST-MORTEM.** Experiment-frozen decoration plus non-opinionated defaults. The dock accreted
decorative rings and chevron chrome as it was iterated (GF-DOCK confirms the rings + `<`/`>`/`«`/`»`
chevron circles across rail + strip); nothing removed them once the selection pill made them redundant.
Card shipped a decorative gold+grain default because a showcase value was frozen as the library
default instead of a neutral one (`BAND-REDUCTION.md:33-36`). The "grand audit with questions" is the
user asking the reduction to be evidence-relayed, not silently decided.

**REDRESS.** The literal shape → `GF-DOCK-PASS3.md` §5 / W5 `G-RADIUS-GRAMMAR` (`:199-226`, `:275`):
delete the decorative per-item outline-ring circles and the chevron controls, keep plain hit-targets
under one traveling selection pill, consume `--radius-dock`. GF-DOCK read F04 first-hand and its
description ("the vertical rail wraps each nav icon … in a thin outline-ring circle inside a stadium
pill", `:206`) matches mine exactly. Opinionated defaults → `BJ.W-REDUCE-CARD` (`BAND-REDUCTION.md:204-257`,
`G-CARD-DEFAULT-PAINT` born-RED visual): `metal` → `"none"`, `grain` → `false`, collapse the 5 dead
decorative flags. Grand-audit-with-questions → `ASK-REDUCTION.md` (on disk, 19KB, written to the F04
order verbatim, `:3-4`) + the per-component verdict table in `FABLE-DAG-REDUCTION.md` §2 (KEEP 10 /
DELETE 3 / MERGE 2 / ASK 12). **Verdict: EXACT.** Each of the three sub-asks — the literal dock shape,
the opinionated-default order, the relayed grand audit — has a precise owner with evidence.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:26`). AGREE — the three-way landing
(REDUCE-CARD + ASK-REDUCTION + GF-DOCK §5) is exact; note the *screenshot's* literal defect is the
dock, owned by GF-DOCK §5, which the crosswalk cites.

---

## F05 — animations ill-defined, shifts the screen, no background aurora

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:17`): *"Not well defined with animations; improperly shifts
the screen around; why does this section not have a background aurora."* Screenshot:
`feedback/F05-anim-shift-no-aurora.png`.

**ISOLATION (first-hand read).** Two vertical stadium-pill docks side by side on pure black, labelled
`STARTS COMPACT` and `STARTS OPEN` (mono-caps), each holding a home icon and a navigation-arrow icon.
Three sub-asks: (a) the compact→open expansion animation reads as ill-defined and improperly SHIFTS the
surrounding screen; (b) the docks morph height on hover; (c) the section sits on a bare BLACK
background with NO aurora field behind it.

**TARGET.** `demo/stories/dock/rail.vue` — the "Collapsible vertical dock — it morphs its height"
section (confirmed on disk: `:142` the heading, `:147` "`--dock-morph-t` spring. Hover to expand",
`:153` the `v-for="posture in initialPostures"`, `:157` `text-mono-caption` posture labels — this is the
exact F05 view). Src: `src/components/dock/**` (the `--dock-morph-t` height-morph). **Critical
first-hand finding:** rail.vue contains exactly ONE `<Aurora>` (`:69`), staged behind the *"Vertical
dock"* section only; the *postures* section (F05's view) is a plain
`<div class="flex min-h-[18rem] … p-6">` on the page background — no aurora. So a SIBLING section of the
same page has the aurora field the user is asking for, and the screenshotted section does not.

**POST-MORTEM.** Motion-definition gap plus an inconsistent backdrop authoring. The height-morph
(`--dock-morph-t`) can reflow surrounding content (the "shift"); the expansion easing was never given a
defined liquid-weight character. The aurora inconsistency is an authorship oversight: rail.vue's author
added a contained Aurora wash to the headline "Vertical dock" section (the code comment at `:64-67`
says the empty-cream frame "defeated the headline primitive", so a field was added THERE) but never
extended it to the postures section, so one section reads glass-on-aurora and the next reads
pill-on-black.

**REDRESS.** Screen-shift half → `GF-DOCK-PASS3.md` §6 / W6 `G-NO-LAYOUT-SHIFT` (`:238-242`, `:318`):
the dock is an overlay; collapse/expand and reveal produce CLS = 0 for surrounding page content.
Animation-definition half → GF-DOCK W6 (dock-motion) + `BJ.W-ROUTE-PENDING` liquid-weight transition
(`BAND-PERF.md` W4). Aurora half → **contested.** The crosswalk's lead reconciliation #3
(`ASSEMBLY-CROSSWALK.md:222-224`) rules the aurora sub-ask `CLEARED-by-R3b` on the ground that "the
dock section demonstrably carries a live chromatic background field" (R3b engagement-dock evidence).
**On first-hand evidence I DISAGREE for this row's exact view:** the R3b field is the interactive
hover-expand demo's DockStage/Aurora backdrop; the F05 postures section (`rail.vue:142-189`) has NO
aurora at HEAD (verified: one `<Aurora>` on the page, at `:69`, behind a different section). The
premise "this section has no background aurora" HOLDS for the screenshotted section — the clearance
conflates "the dock category has an aurora somewhere" with "this section shows one." **Verdict:
PARTIAL.** Two sub-asks land cleanly (screen-shift, animation-definition); the aurora sub-ask is a real
residue with no owner — the crosswalk's own ambiguity note (`:197-198`: "a sliver gap inside a LANDED
row") was subsequently over-cleared. Delta D-F05: assign an owner to make the dock-specimen aurora
backdrop CONSISTENT across sections (stage the DockStage field behind the postures section, or adopt
DockStage uniformly per `FABLE-STORY-FRAMEWORK.md` §2.5's `dock` variant).

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:27`), with the aurora sub-ask marked
`CLEARED-by-R3b` in the lead reconciliation. DISAGREE on the aurora sub-ask only — the screenshotted
section is on black at HEAD; the two motion sub-asks I AGREE are landed.

---

## F06 — dock-page transitions broken, slow, flash the screen

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:18`): *"Transitions between the dock pages are broken, slow,
and flash the screen."* Anchor `/dock/rail` and dock pages generally. **URL-anchored, no screenshot**
(no `feedback/F06*.png` on disk).

**ISOLATION.** Isolated from ledger + the R3a live probe. Two claims: a screen FLASH on dock-page
navigation, and SLOW/broken transitions. R3a drove this live: the root background min-channel never
exceeds 9/255 across every dock transition, so there is no white flash; the real cost is a one-time
~186ms cold-nav stall (lazy-chunk import + GL mount), settling to 32–52ms warm
(`REGISTRY.md:295-297`). The mechanism is the blocking `router.beforeResolve` chunk-await plus the
atomic keyed `<component>` swap with no pending affordance (`demo/router.ts:122-130`;
`AppShell.vue:201-203`, whose own comments at `:59`/`:192` document the missing skeleton/aria-busy).

**TARGET.** `demo/router.ts:122-130` (the blocking `beforeResolve`), `demo/shell/AppShell.vue:201-203`
(the bare keyed swap), `src/components/dock/**` via `DockCrossfade.vue` (the crossfade floor). Named
route `/dock/rail`.

**POST-MORTEM.** Perception-of-brokenness from a missing feedback affordance, not a real white flash.
The flash reading was an over-attribution; the genuine defect is that a cold click freezes the old
frame with zero loading feedback while the chunk resolves, which reads as unresponsiveness, and the
full unmount/remount + shell-field re-upload compounds it (`BAND-PERF.md:360-401`).

**REDRESS.** `BJ.W-ROUTE-PENDING` (`BAND-PERF.md` W4) — a liquid-weight pending affordance during the
`beforeResolve` await (progress-bar floor + weighted transition), with the R3b baselines seeding the
gate (119ms warm freeze / CLS 0.04 at swap / 186ms cold-nav floor, `BAND-PERF.md:505-508`) — plus
`GF-DOCK-PASS3.md` §6 `G-PAGE-NOFLASH` (`:236-237`, `:317`): the dock shell is persistent chrome and
never unmounts, the incoming page paints under the outgoing on the crossfade opacity floor, so no blank
frame. **Verdict: EXACT.** I engage R3a's CLEARED ruling: I AGREE the white-flash reading is refuted on
evidence (min-ch ≤9/255); CLEARED here retires the *flash* claim while the residual slow/broken cold-nav
cost is owned and gated by ROUTE-PENDING + GF-DOCK W6.

**STATUS CHECK.** Crosswalk flag `CLEARED` (`ASSEMBLY-CROSSWALK.md:28`; R3a fold #3). AGREE — the flash
is refuted, the slow half lands; the disposition is honest.

---

## F07 — story-page transitions should be better defined, expressive, animated

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:19`): *"Transitions between story pages should be better
defined, more expressive and animated (e.g. jumping to `/substrates/aurora`)."* Anchor: story-page
transitions. **URL-anchored, no screenshot.**

**ISOLATION.** Isolated from ledger + live code. Story-route navigation is a hard atomic keyed swap
(`AppShell.vue:201-203` `<component :is=Component :key=route.path>`), no `<Suspense>`, no weighted
transition — the anti-pattern the liquid-weight edict names (a hard `:key` cut). Jumping to
`/substrates/aurora` therefore reads as an abrupt, undefined change with no inertia or choreography.

**TARGET.** `demo/shell/AppShell.vue:201-203` (the keyed swap), `demo/router.ts` (the pending window),
coordinated with the family-D transition-choreography seam. Design authority: IOS27-CODEX law 6
(goo-morph nav) + the liquid-weight edict.

**POST-MORTEM.** Canon-absence for a shared page-transition primitive. No weighted route transition was
ever authored; each page simply mounts/unmounts. The expressive-transition ask sat unowned because it
straddles perf (feedback during load) and design (choreography), and neither side claimed it until the
seam ruling.

**REDRESS.** `BJ.W-ROUTE-PENDING` (`BAND-PERF.md` W4), which the lead seam ruling
(`BAND-PERF.md:505-508`; `ASSEMBLY-CROSSWALK.md:224`) makes the OUTRIGHT owner of F07's story-transition
choreography — Family D is consulted, not co-owner; OPEN-P10's fork (progress-bar floor + origin-anchored
goo-morph between pages, built once, per liquid_weight_universal + IOS27-CODEX law 6) is decided inside
the wave. **Verdict: EXACT.** The owner is singular, the obligation is specced (weighted transition with
inertia, goo-morph nav), and the concrete choreography is an in-wave design obligation that runs the
DESIGN-ITERATION loop at execution — a bounded design task, not a formation gap.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:29`). AGREE — the seam is ruled to one
owner and the double-build risk with Family D is closed.

---

## F08 — aurora presets duplicative; crayon/oil near-identical; reduce dramatically

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:20`): *"Many presets are duplicative — reduce the set
dramatically. Aurora variants (crayon, oil, etc.) are all almost identical: simplify, remove presets,
focus on the best-designed auroras (sky, sunset, dusk, …)."* Anchor `/substrates/aurora`. **URL-anchored,
no screenshot.**

**ISOLATION.** Isolated from ledger + the round-2 aurora lens + on-disk shader corpus. Two defects: (a)
preset over-population with near-duplicates (e.g. `SETTING_SUN`/`VIVID_SETTING_SUN`,
`MEADOW`/`DAY9_YELLOW`, three `OILPASTEL_*` palette skins); (b) the "almost identical" MODES are
mechanically identical on WebGPU — `applyMedium` (`aurora-mediums.wgsl.ts:399-400`) routes mediums
3/5/6/7 (oil, van-Gogh, oil-pastel, kuwahara) ALL to `mediumKuwahara`, so their descriptor distance is
a literal zero; oil-pastel is a constants-skin of oil even on WebGL (`mediums.glsl.ts:493-496`). The
user's verdict is mechanically true.

**TARGET.** `src/components/aurora/**` — the medium dispatch (`aurora-mediums.wgsl.ts:387-403`), the
per-medium bodies (`vangogh-medium.glsl.ts`, `mediums.glsl.ts`, `oil-modes.glsl.ts`), and the preset
register (`presets.ts`, 17 presets incl. `SPEEDTEST` at `:685-703`).

**POST-MORTEM.** Silent aliasing frozen into the shipped identity plus preset proliferation by palette
skin. The WGSL port collapsed four painterly mediums onto one Kuwahara body (a masking shortcut that
was never unwound), and presets multiplied as palette variations of a few bodies. The "van-Gogh mode"
was declared derivative-free but actually calls `relightImpasto` (dFdx/dFdy) — the first WGSL screen-space
derivative use, re-verified on disk (`GF-AURORA-PASS3.md` §2).

**REDRESS.** `GF-AURORA-PASS3.md` — the F08 complaint operationalised as the born-RED `G-MODE-DISTINCT`
gate (`:256-270`), which reds at a literal zero today for the aliased pairs; the medium-table de-alias
so every selectable medium dispatches to its own dedicated body (`§3.3`); real per-mode bodies for
van-Gogh (W1), oil-pastel (W2 dedicated burnish body), crayon (W3 drawn scribble marks); the oil
resolution PORT-or-KILL with `G-OIL-HONEST` (W4, terminal collapse set `{}`); and the 17→10-firm preset
reduction (`§3.6`, `G-PRESET-HONEST`) keeping the user-named atmospherics (sky/sunset/dusk/dawn) and one
exemplar per distinct body, relocating `SPEEDTEST` to its consumer. **Verdict: EXACT.** The user's exact
words ("crayon, oil … almost identical") become a measurable gate reding at zero, and the dedup +
real-modes are the precise cure.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:30`). AGREE — the greenfield engages
F08 head-on with a quantified distinctness gate; the crayon-scope (one mode vs crayon+ink) is the one
honest user ASK (`GF-AURORA-PASS3.md` §8), not a gap.

---

## F09 — container over-rounded (not 100%; card-like); configurator too cramped; audit all

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:21`): *"Container should not be so rounded (not 100%; more
like a card). The configurator must be larger — too cramped. **All configurators audited.**"*
Screenshot: `feedback/F09-overround-cramped-configurator.png`.

**ISOLATION (first-hand read).** The image is the "DERIVE FROM COLOR" configurator panel: a red seed
swatch, a 2×2 grid of harmony toggle buttons (`ANALOGOUS`/`COMPLEMENT`/`TRIAD`/`MONO`), a `STOPS − 5 +`
stepper, and a `Derive` button. The OUTER container is a moderately-rounded card (roughly 12–16px
radius, NOT a 100% ovoid). The heavily-rounded elements are the INNER controls — the harmony toggle
buttons are near-stadium pills, the stepper and Derive button are pills. The panel is also visually
tight/cramped: the 2×2 button grid is packed with little breathing room.

**TARGET.** `src/components/configurator/**` — the container radius is `--radius-panel`
(`Configurator.vue:211`) with a concentric card-radius relay `max(floor, ctx − inset)`
(`styles.css:109`), confirmed already CARD grammar on disk (`FABLE-STORY-FRAMEWORK.md:179`;
`BAND-MATERIAL.md:135-139` OPEN-1a). The over-rounding the user objects to is the inner toggle-button
radius (a radius-role token, family F). The cramping is the panel's own sizing/density.

**POST-MORTEM.** Screenshot-vs-disk drift plus an unmeasured roominess complaint. F09's container may
already have been remediated to `--radius-panel` since the 2026-07-17 feedback — the concentric relay is
on disk — so the surviving over-round read is the inner pills, a role-radius question the material band
must live-π before asserting (`BAND-MATERIAL.md:135-139`). The "cramped/larger" half is a proportion
complaint that no born-RED sizing probe currently pins.

**REDRESS.** Radius half → `BJ.W-CONFIGURATOR-STD` `G-CFG-4` converted to a REGRESSION-GUARD (the
container stays card, never reverts to ovoid) per `FABLE-STORY-FRAMEWORK.md` AMEND-D-7 (`:306-309`),
with the inner ANALOGOUS/COMPLEMENT/TRIAD/MONO toggle radius routed to family F `BJ.W-RADIUS-ROLE`
after the OPEN-1a live-π (`BAND-MATERIAL.md` W1). "All configurators audited" → the configurator
standard is adopted everywhere via the `studio` variant (`FABLE-STORY-FRAMEWORK.md` §4). **Verdict:
PARTIAL.** Residue: the "the configurator must be larger — too cramped" sub-ask has no explicit owner
or criterion — the G-CFG gates cover radius (G-CFG-4), hierarchy (G-CFG-2), grouped-list (G-CFG-3), and
the curve void (G-CFG-5), but none pins configurator roominess/target-size/breathing padding. Delta
D-F09: give CONFIGURATOR-STD an explicit sizing/density criterion (min inspector width or
control-target-size + section padding), or route "too cramped" to the `BJ.W-ARISTOTLE-PROPORTION`
roster's converse-needs-more direction (`BAND-MATERIAL.md:504-506`), so the "larger" ask is measurable
rather than implied by the ladder-widen.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:31`). AGREE on the radius half (well
reframed to regression-guard + family-F toggle radius); partial-DISAGREE that the row is fully landed —
the cramped/larger half is an uncovered sliver (delta D-F09).

---

## F10 — each section needs clearer design hierarchy

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:22`): *"Each section should have better and slightly clearer
design hierarchy."* Screenshot: `feedback/F10-section-hierarchy.png`.

**ISOLATION (first-hand read).** The image is the "Color" configurator panel expanded — a
"Color · seed · harmony · palette" header, then `Seed` / "Base color the harmony derives from" with a
red `#AF2B25` swatch, then `Harmony` / "Color relationship the palette is built from" with an
`Analogous` dropdown, then `Energy` / "0..1 · chroma/contrast of the palette" with a fill slider. The
section headers (`Seed`/`Harmony`/`Energy`) sit at nearly the same visual weight as their descriptor
lines and the field labels — the hierarchy is flat; there is no clear size step between section title,
field label, and value.

**TARGET.** `demo/chassis/section/StorySection.vue:32` (every heading hardcoded to `text-subheading` —
the story-chassis flattening; `grep -rl '#heading' demo/stories` → 0, so no page overrides it,
`FABLE-STORY-FRAMEWORK.md:380-383`), AND `src/styles/tokens/sizing-config.css:35`
(`--configurator-section-size` = subheading 20.4px sitting only ~4px above the
field labels — the register EXISTS but the steps are too close; consumed by
`configurator/styles.css:51`, `FABLE-STORY-FRAMEWORK.md:353-357`).

**POST-MORTEM.** Unenforced type ladder plus a too-narrow register. The Tailwind default ramp is never
reset (`--text-*: initial` absent), so text-sm/text-xs bypass the fluid scale and every section
collapses toward one rung; `StorySection` was pinned to the smallest heading rung and the configurator's
section↔field steps were set too close, so both surfaces read two-level flat. This is a TWO-level
defect (story chassis AND configurator), not one.

**REDRESS.** `BJ.W-CONFIGURATOR-STD` `G-CFG-2` (level axis) as widened by `FABLE-STORY-FRAMEWORK.md`
AMEND-D-2 (`:274-280`) + the perfected `G-LADDER-3` gate (`:420-425`, a page must render ≥3 distinct
ladder rungs): give `StorySection` a `level` axis and widen the configurator ladder to
`section text-heading ≫ field text-small ≫ value text-caption` (weight from SIZE), backed by the
`BJ.W-TYPE-CODEMOD` default-ramp reset (family F, `BAND-MATERIAL.md` W6). **Verdict: EXACT.** The
two-level defect is precisely diagnosed at both sites and the ladder-widen + level-axis + codemod cure
all land with a ≥3-rung gate.

**STATUS CHECK.** Crosswalk flag `LANDED` (`ASSEMBLY-CROSSWALK.md:32`). AGREE — the perfection pass
sharpened F10 from a one-site to a two-site defect and the load-bearing `level` axis is gated.

---

## Coverage summary

| row | screenshot | verdict | crosswalk flag | agree? | delta count |
|-----|-----------|---------|----------------|--------|-------------|
| F01 | yes | EXACT | LANDED | AGREE | 0 |
| F02 | no (URL) | EXACT | CLEARED | AGREE (nuanced) | 0 |
| F03 | yes | PARTIAL | LANDED | AGREE (residue) | 1 |
| F04 | yes | EXACT | LANDED | AGREE | 0 |
| F05 | yes | PARTIAL | LANDED | **DISAGREE** (aurora sub-ask) | 1 |
| F06 | no (URL) | EXACT | CLEARED | AGREE | 0 |
| F07 | no (URL) | EXACT | LANDED | AGREE | 0 |
| F08 | no (URL) | EXACT | LANDED | AGREE | 0 |
| F09 | yes | PARTIAL | LANDED | partial-DISAGREE (cramped half) | 1 |
| F10 | yes | EXACT | LANDED | AGREE | 0 |

**Tally: EXACT 7 · PARTIAL 3 · MISSING 0.** Deltas: 3.

## Appendable deltas (in full)

> **D-F03 (to `BJ.W-STORY-COPY-CANON`, BAND-STORY W2).** Add `demo/stories/dock/layers.vue:279-335`
> (the "Controlled — no rail" / "Mechanics" page — the exact F03 screenshot) to the born-RED
> copy-canon site list alongside handmark/search (`G-COPY-2`, `BAND-STORY.md:195` — the gate greps
> those two only; manifest sits in no G-COPY gate either), and add
> an explicit gate clause banning the "Mechanics narration PATTERN" — a section whose body is numbered
> implementation mechanics with inline `<code>` internal tokens — per `FABLE-STORY-FRAMEWORK.md:385-391`
> ("the copy canon MUST ALSO ban the pattern"). The general `G-COPY-LINT` regex reaches the tokens; this
> pins the pattern and the site so the F03 page cannot slip.

> **D-F05 (new owner for the aurora-visibility sub-ask; supersedes the `CLEARED-by-R3b` reconciliation
> for this row).** Assign an owner to make the dock-specimen aurora backdrop CONSISTENT across sections.
> Evidence: `demo/stories/dock/rail.vue` carries exactly one `<Aurora>` (`:69`, behind the "Vertical
> dock" section); the postures section that F05 screenshots (`:142-189`, "Starts compact/open") renders
> on the bare page background with no field. The R3b clearance drew on the interactive hover-expand
> DockStage demo, not this postures grid — the premise "this section has no background aurora" HOLDS at
> HEAD. Corroboration: `GF-DOCK-PASS3.md:27` (charge C5) already ACCEPTED this split — "the 'no
> aurora' half leaves the dock → BAND-STORY/aurora surface. F05 is not dropped, it is split correctly"
> — direct evidence the aurora sub-ask was routed to be OWNED, not cleared. Cure: stage the
> DockStage/Aurora field behind the postures section (or adopt `DockStage`
> uniformly for all dock specimen sections per `FABLE-STORY-FRAMEWORK.md` §2.5's `dock` variant). Fold
> into the dock story-page redesign (BAND-STORY dock variant) or GF-DOCK's DockStage adoption.

> **D-F09 (to `BJ.W-CONFIGURATOR-STD`, BAND-STORY W3 — the uncovered "too cramped/larger" half).** Add
> an explicit configurator roominess/density criterion — a minimum inspector width or a control
> target-size + section-padding floor — so "the configurator must be larger — too cramped"
> (`FEEDBACK-LEDGER.md:21`) is measurable. The current G-CFG gates cover radius (G-CFG-4→regression-guard),
> hierarchy (G-CFG-2), grouped-list (G-CFG-3), and the curve void (G-CFG-5) but none pins roominess.
> Alternatively route the sub-ask to `BJ.W-ARISTOTLE-PROPORTION`'s converse-needs-more direction
> (`BAND-MATERIAL.md:504-506`) with a captured DELTA at the F09 configurator site.

---

*End — Fable redress dossier, rows F01–F10. One file, no `src/`/`demo/` edits, no commit.*
