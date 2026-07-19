# BJ redress dossier — rows F01–F10 (REFABLE union)

**Verified model:** `claude-fable-5` (this union). The prior artifact ran `claude-opus-4-8` via a
settings-level override while self-describing "(Fable seat)" — corrected here.
**Union provenance:** REFABLE RU-13, 2026-07-18 — ANEW re-derivation from the original edict against
primary sources first (screenshots, `src/`, `demo/`, bands, PLAN), the prior artifact then read under
assumed-wrong scrutiny, every claim re-proven or corrected on disk; opus content kept only where
RATIFIED. Verdict sidecar: `../refable/REFABLE-RU-13-F01-F10.md`.

**Mode:** TRANCHE DEVELOPMENT. This file is the only artifact — no `src/`/`demo/` touch.
**Charge:** every screenshot and exhortation in rows F01–F10 inventoried, isolated, targeted, and
planned for redress; each defect correlated to its exact demo story page AND src component
(`file:line`), with a post-mortem and an amelioration reconciliation against the bands at HEAD.
**HEAD:** `master` @ `4757315a`. Tree parity with the prior artifact's pin
(`codex/bi-p-q-execution` @ `55f5170d`): **zero `src/`/`demo/` commits between the two** — both
passes judged the SAME paint tree; the drift since is docs-only (the JUDGE.md application pass,
which is itself material to three rows below).
**Rows with a screenshot on disk:** F01, F03, F04, F05, F09, F10. **URL-anchored, no screenshot:**
F02, F06, F07, F08 (confirmed absent — no `feedback/F02*.png`/`F06*`/`F07*`/`F08*`).
**Live-paint fence:** the demo server was not owned by this seat. Claims only live paint can settle
are marked **LIVE-DEFER** — the mechanism is pinned statically; the paint confirmation rides the
owning wave's π obligation.

---

## F01 — preview cards more expressive + slow partial-then-stutter load

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:13`): *"Preview cards could be better, more expressive with
active items, better sized (different sizes, masonry-layout like). Further: preview cards AND all story
pages are slow to load in — partially load, then stutter."* Screenshot: `feedback/F01-preview-cards.png`.

**ISOLATION (screenshot re-read, RATIFIED).** A `CATEGORIES` mono-caps eyebrow over a large category
card ("Foundations / Colors, type, radii, shadows, motion, paper & glass."). The inner preview region
is a near-empty beige rectangle with only "Colors" typeset bottom-left — the typographic `identity`
tile, not a rendition of any component. One card size, no masonry; the media well reads as a SECOND
rounded/inset panel nested inside the outer card rim. Three visual defects: (a) vacancy, (b) uniform
sizing, (c) the card-in-card read. The stutter half is the reported partial-paint-then-jank, not
visible in a still.

**TARGET (every cite re-proven at HEAD).**
- Layout/vacancy/masonry — `demo/chassis/landing/SectionPreviewCard.vue` (the preview well `:35-54`;
  `content-visibility:auto; contain:content; contain-intrinsic-size:auto 19rem` at `:63-65` applied
  unconditionally), `demo/chassis/landing/SectionLanding.vue:33` + `CatalogLanding.vue:32` (fixed
  `grid grid-cols-1 … lg:grid-cols-3`), the tile ladder `demo/chassis/landing/storyTile.ts`
  (`resolveStoryTile`, `authored → still → identity`) with exactly **4 `.tile.vue`** files across the
  demo, and `CatalogLanding.vue:7→:40` bypassing the ladder with a direct `identityTile`.
- Perf/stutter — `demo/shell/AppShell.vue:11,26,27,28` (eager static imports: Aurora, PresetEditor,
  both docks → ~770KB eager JS / 73 modulepreloads per the committed `dist-demo/`), `aurora-hero.ts:15`
  (config re-drags the aurora barrel), the always-on `fixed inset-0` shell Aurora
  (`AppShell.vue:147-156`), R3b idle-rAF ~40k RunTasks / ~1.6s task time at idle
  (`REGISTRY.md:322-326`).

**POST-MORTEM.** Authorship gap plus a perf architecture that saturates the boot thread. The tile
ladder is sound and mounts 0 GL contexts by construction; the vacancy is that only 4/88 stories were
ever given a `.tile.vue`, so most cards fall to the typographic identity floor — the "expressive" work
was never authored. The stutter is the eager ~1.1MB boot graph gating `app.mount()` plus the
continuous idle rAF field behind every route. Unpaid design/perf debt, not a mystery bug.

**REDRESS.** Layout half → **`BJ.W-PREVIEW-CARD` (BAND-STORY W5)** as adjudicated: tile-ladder
AUTHORSHIP (4/88 → full headline coverage; the "live miniature" line STRUCK per the 0-GL contract +
R3b idle-rAF), `CatalogLanding` routed through `resolveStoryTile`, native-CSS masonry with ≥2 card
sizes (G-PRV-1..5 — the union adds the G-PRV-5 0-GL regression-guard, `BAND-STORY.md:462`; RU-14
R5), the above-fold `content-visibility` exemption (the edit ceded from PERF W3), and
the STAB2 rider (the detached hero goo-blob confirm-or-retire). Perf half → **`BJ.W-BOOT-DIET` +
`BJ.W-SHELL-FIELD-GOVERN` + `BJ.W-DEFERRED-PAINT` (BAND-PERF W1/W2/W3)** with the R3b baselines
seeding the gates. **LIVE-DEFER:** the stutter repro + the masonry/tile after-π ride W5/PERF's
captured DELTA obligations.

**VERDICT vs opus row: RATIFIED.** Every file:line re-proven; the reconciliation (W5 layout / family E
perf / 0-GL tile authorship) matches the bands at HEAD. Crosswalk `LANDED` (`ASSEMBLY-CROSSWALK.md:23`)
— AGREE.

---

## F02 — /foundations cards blank white

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:14`): *"Most of the cards are blank white."* Anchor
`/foundations`. URL-anchored, no screenshot.

**ISOLATION (re-derived from source, RATIFIED).** On `/foundations` (a `SectionLanding`), cards
lacking an authored `.tile.vue` fall to the `identity` floor — a quiet typographic slab that reads
"blank." Below the fold the cards are literally unrendered until scrolled near
(`content-visibility:auto` + `contain-intrinsic-size:auto 19rem`, `SectionPreviewCard.vue:63-65`,
unconditional); while the ~1.1MB boot saturates the main thread, above-fold cards paint late too.
**LIVE-DEFER:** the exact degree of "blank white" at first paint is a live-paint observation; the
mechanism is pinned.

**TARGET.** `SectionPreviewCard.vue:63-65` + the identity fall-through (`storyTile.ts`),
`CatalogLanding.vue:40` (ladder bypass), authorship coverage 4/88, and the family-E boot saturation.

**POST-MORTEM.** Instrumentation-read plus authorship gap. R3a drove this live and CLEARED it *as a
paint defect* (`REGISTRY.md:291-294`): the cards are the DELIBERATE identity-fallback rung — `/display`
proves richer tiles render where authored. "Blank" is honest fallback made visible by 4/88 coverage,
compounded by the `CatalogLanding` ladder bypass.

**REDRESS.** Same owner as F01 — **`BJ.W-PREVIEW-CARD` (BAND-STORY W5)**: author the missing tiles,
route `CatalogLanding` through `resolveStoryTile`, exempt above-fold cards from
`content-visibility:auto` (G-PRV-3); the live-trace deferred-paint gate stays with **family E
(BAND-PERF W3)**. The CLEARED flag retires the *defect reading*, not the complaint — the
authorship-coverage cure is real, specced, and gated.

**VERDICT vs opus row: RATIFIED** (including the CLEARED-with-nuance stance). Crosswalk `CLEARED`
(`ASSEMBLY-CROSSWALK.md:24`) — AGREE with the same nuance.

---

## F03 — "most of this is worthless" (+ the parsimony edict)

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:15`): *"'Most of this is worthless.'"* plus the re-stated
parsimony edict (extreme parsimony, KISS-forward, fewer lines, little time on contrived gates, majority
on direct implementation + visual verification). Screenshot: `feedback/F03-worthless-section.png`.

**ISOLATION (screenshot re-read, RATIFIED).** A dock story page: heading "Controlled — no rail", a
paragraph dense with internal tokens (`<DockCrossfade :active>`, `--dock-t`), an
`Assets / Layers / Media / Type` control strip, a LARGE mostly-empty tile holding one small circular
"Assets / images / fonts" blob, then a numbered "Mechanics" list (1–5) narrating implementation
internals (`1 / 1` grid, `opacity: var(--dock-t)`, `useDockSpring`, `.dock-face-content`,
`--dock-morph-t`). Two defects: (a) implementation-mechanics exposition written for a tranche auditor;
(b) proportion — a big empty panel carrying one tiny centered blob.

**TARGET (re-proven).** `demo/stories/dock/layers.vue` — `:279` `heading="Controlled — no rail"`,
`:303` `<DockCrossfade :active="controlled">`, `:329` `heading="Mechanics"`, `:330-337` the mechanics
`<ol>` (the screenshot's list, verbatim). Sibling copy-canon site `demo/stories/manifest.ts:932` (the
completion-seal stroke-dashoffset/@property blurb).

**POST-MORTEM.** Authorship-voice gap plus proportion neglect. Demo pages were written as living
design notes to the tranche, so internal token/composable/class names leaked into user-facing prose,
and whole "Mechanics" sections narrate springs the demo already shows — a *systemic* narration
PATTERN, not discrete blurbs (`FABLE-STORY-FRAMEWORK.md` §8 finding 10, `:550-554` — re-anchored
RU-14 R5; `:385-391` is now the §7 amendments header, and G-COPY-2 itself orders "anchor by
section, never line", `BAND-STORY.md:254`).

**REDRESS.** Copy half → **`BJ.W-STORY-COPY-CANON` (BAND-STORY W2)**. The prior artifact's residue
("G-COPY-2 greps handmark/search only; layers.vue unpinned; no pattern-level ban") was ADOPTED as
**JUDGE J8 and is APPLIED IN-PLACE at HEAD**: G-COPY-2's born-RED probe now names `layers:279-335`
and its GREEN condition bans the Mechanics-narration PATTERN outright (`BAND-STORY.md`, Wave-2 gate
table). Proportion half → **`BJ.W-ARISTOTLE-PROPORTION` (BAND-MATERIAL W5)** (F03 in its
superfluous/distracting class). Parsimony-edict half → PLAN-level, family A (the gate collapse,
`BJ.W-GATE-COLLAPSE`), per the user's gates-abrogation mandate.

**VERDICT vs opus row: RATIFIED, verdict UPDATED PARTIAL → EXACT-AT-HEAD.** The opus residue was
real when written, was adopted as J8, and is now discharged in the band text — the dossier's own
delta succeeded; the PARTIAL no longer describes HEAD. Crosswalk `LANDED` — AGREE.

---

## F04 — "this shape is to be abrogated" (+ grand audit with questions relayed)

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:16`): *"'This shape is to be abrogated' — simplify
components to better, more opinionated defaults; KISS. A grand audit of ALL components with questions
in reduction relayed to the user."* Screenshot: `feedback/F04-shape-abrogate.png`.

**ISOLATION (screenshot re-read — CORRECTED against the prior artifact AND the greenfield's
descriptor).** A single vertical dock on pure black: home icon, a divider, then compass, shapes,
boxes/cubes, navigation-arrow — five icons total, each seated in a thin outline-ring circle. Two
corrections to the prior reading:
1. **The corners are FINITE-rounded, not a stadium pill** — a clear flat run along the top edge, a
   rounded-rect silhouette. That is the `shape="rounded"` register, not the default `pill`.
2. **The section anchor is wrong in the prior artifact.** It targeted the "Vertical dock" section
   (`rail.vue:53-106`) — but that section renders home + ALL EIGHT entries (9 icons) AND sits over a
   contained Aurora wash (`rail.vue:69`), which the pure-black screenshot lacks. The only section
   rendering exactly home + `entries.slice(0, 4)` (Compass/Shapes/Boxes/Navigation — the screenshot's
   exact icon census) on a bare backdrop is **"Rounded shape", `rail.vue:108-140`**, whose dock is
   `<GlassDock orientation="vertical" always-expanded shape="rounded">` (`:117-121`). Tree parity
   holds (zero `demo/` commits since the feedback), so the mis-anchor is not drift.

**TARGET.** `demo/stories/dock/rail.vue:108-140` (the "Rounded shape" section — the screenshot's
referent), consuming `src/components/dock/GlassDock.vue` + `DockControl.vue`, with the shape axis
declared at `src/components/dock/composables/useDockShellProps.ts:53`
(`shape?: "pill" | "rounded" | "card"`). The construction the user points at = the `shape="rounded"`
silhouette + the decorative per-item outline-ring circles. The verbal "opinionated defaults / KISS"
order also reaches `src/components/card/Card.vue` (`grain: true` + `metal: "gold"` live defaults,
re-proven in the `withDefaults` block) and the whole overfit surface — as the ORDER's general blast
radius, not as the screenshot's referent.

**POST-MORTEM.** Experiment-frozen decoration plus non-opinionated surface growth. The dock accreted
decorative rings and a 3-value `shape` axis as it was iterated; nothing removed the rings once the
selection pill made them redundant, and the rounded register shipped as a demo-visible variant of a
component whose grammar was never ruled. Card shipped a showcase gold+grain value as the library
default. The "grand audit with questions" is the user demanding the reduction be evidence-relayed,
not silently decided.

**REDRESS.**
- The literal screenshot shape → **GF-DOCK W5 `G-RADIUS-GRAMMAR`** (ring deletion + the radius/shape
  grammar; `GF-DOCK-PASS3.md` §5). **Correction carried to the lead (FLIP-1, sidecar):** §5's
  lead-adjudicated description says "inside a stadium pill" and the prior artifact anchored the
  "Vertical dock" section — the baseline π for W5 must shoot `rail.vue:108-140` (the `shape="rounded"`
  render), and the shape-grammar ruling must confront the **3-value `shape` axis itself**
  (`useDockShellProps.ts:53`) as F04-direct surface, not only the rings. (`shape` has live setters —
  `rail.vue:120` `"rounded"`, big-dock `"card"` — so it is NOT in REDUCTION W1's dead-knob cut; its
  disposition is GF-DOCK W5's shape grammar.)
- Opinionated defaults → **`BJ.W-REDUCE-CARD` (BAND-REDUCTION W2, `G-CARD-DEFAULT-PAINT`)**: `metal`
  → none, `grain` → false, axis collapse. RATIFIED as the F04 *order's* surface — with the correction
  that BAND-REDUCTION's framing ("the born-RED gate is a real paint probe on the F04 shape") mislabels
  the Card default as "the F04 shape"; the gate is sound, the label is wrong (FLIP-2, sidecar).
- Grand-audit-with-questions → **`ASK-REDUCTION.md`** (on disk, written to the F04 order) + the
  per-component verdict table (`FABLE-DAG-REDUCTION.md` §2, as corrected by REFABLE RU-12).

**VERDICT vs opus row: OPUS-WRONG on the correlation (section + silhouette), redress routing
RATIFIED.** The three-way landing (GF-DOCK §5 + REDUCE-CARD + ASK-REDUCTION) stands; the screenshot
anchor and the shape-axis confrontation are corrected. Crosswalk `LANDED` — AGREE with the two FLIPs
recorded for the lead.

---

## F05 — animations ill-defined, shifts the screen, no background aurora

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:17`): *"Not well defined with animations; improperly shifts
the screen around; why does this section not have a background aurora."* Screenshot:
`feedback/F05-anim-shift-no-aurora.png`.

**ISOLATION (screenshot re-read, RATIFIED + page disambiguated).** Two vertical docks side by side on
pure black, labelled `STARTS COMPACT` / `STARTS OPEN` (mono-caps), each showing home + a
navigation-arrow (the collapsed posture). Both `rail.vue:142-189` and `overview.vue:53-56` carry
"Starts compact/open" postures — the disambiguation is the backdrop: `overview.vue` wraps its entire
body in `<DockStage>` (`:118`, the shared aurora field), while `rail.vue`'s postures section is a
plain `flex` div on the page background. The pure-black screenshot therefore pins to
**`rail.vue:142-189`** — corroborating JUDGE **J2** ("R3b's field evidence was a DIFFERENT dock").
Three sub-asks: (a) the expand/collapse shifts surrounding content; (b) the motion is ill-defined;
(c) no aurora behind the section (rail.vue carries exactly ONE `<Aurora>`, at `:69`, behind a
different section).

**TARGET.** `demo/stories/dock/rail.vue:142-189` (postures grid; `text-mono-caption` labels `:157`);
`src/components/dock/**` (the `--dock-morph-t` height-morph, in-flow → reflow on expand).

**POST-MORTEM.** Motion-definition gap plus inconsistent backdrop authoring. The in-flow height-morph
reflows surrounding content (the "shift"); the expansion easing was never given a liquid-weight
character. The aurora inconsistency is an authorship oversight — the headline section got a contained
wash (`:64-67` comment), the postures section never did, so one section reads glass-on-aurora and the
next reads pill-on-black.

**REDRESS.** Screen-shift half → **GF-DOCK W6 `G-NO-LAYOUT-SHIFT`** (dock-motion CLS = 0).
Motion-definition half → **GF-DOCK W2/W6** under the liquid-weight law. Aurora half → the prior
artifact's contested finding (D-F05, DISAGREE vs the CLEARED-by-R3b reconciliation) was **ADOPTED as
JUDGE J2 and APPLIED at HEAD**: BAND-STORY owns the dock-story backdrop consistency
(**`BJ.W-STORY-TAXONOMY`**, the `dock` variant / staged field — the postures section takes DockStage
or the section's live backdrop idiom, never bare black; crosswalk reconciliation corrected
CLEARED-by-R3b → LANDED). **LIVE-DEFER:** the shift repro + the staged-field after-π ride W6's and
W1's captured DELTAs.

**VERDICT vs opus row: RATIFIED — the row's DISAGREE was vindicated (J2); verdict UPDATED PARTIAL →
EXACT-AT-HEAD** (all three sub-asks now owned). Crosswalk `LANDED` with the J2 correction — AGREE.

---

## F06 — dock-page transitions broken, slow, flash the screen

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:18`): *"Transitions between the dock pages are broken, slow,
and flash the screen."* Anchor `/dock/rail` and dock pages generally. URL-anchored, no screenshot.

**ISOLATION (mechanism re-proven; flash claim is R3a live evidence).** Navigation is ONE native View
Transition wrapping `router.push` (`demo/chassis/routeTransition.ts:5-13` via `startViewTransition`),
over a bare keyed swap (`AppShell.vue:201-203` `<component :is="Component" :key="route.path">`) with
no Suspense/skeleton/aria-busy (AppShell's own comments `:59`/`:192` document the absence), plus a
blocking `router.beforeResolve` chunk-await (`demo/router.ts:121-130`). R3a's live probe refuted the
WHITE-flash reading (root bg min-channel ≤9/255 across every dock transition) and measured the real
cost: ~186ms one-time cold-nav stall, 32-52ms warm (`REGISTRY.md:295-297`). **LIVE-DEFER:** fresh
flash repro under the current tree rides the owning waves' π; the R3a artefact stands as the captured
evidence.

**TARGET.** `demo/router.ts:121-130`, `demo/chassis/routeTransition.ts`, `AppShell.vue:201-203`,
`src/components/dock/DockCrossfade.vue` (the crossfade floor GF-DOCK W6 builds on). Named route
`/dock/rail`.

**POST-MORTEM.** Perception-of-brokenness from a missing feedback affordance. A cold click freezes the
old frame with zero loading feedback while the chunk resolves inside the VT window; the full
unmount/remount + shell-field re-upload compounds it.

**REDRESS.** **`BJ.W-ROUTE-PENDING` (BAND-PERF W4)** — the liquid-weight pending affordance during the
`beforeResolve` await, R3b baselines seeding the gate (119ms warm freeze / CLS 0.04 / 186ms cold
floor) — plus **GF-DOCK W6 `G-PAGE-NOFLASH`**: persistent dock chrome, incoming page paints under the
outgoing on the crossfade opacity floor, no blank frame.

**VERDICT vs opus row: RATIFIED** (flash-refutation engaged honestly; slow half owned). Crosswalk
`CLEARED` (R3a fold #3) — AGREE.

---

## F07 — story-page transitions should be better defined, expressive, animated

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:19`): *"Transitions between story pages should be better
defined, more expressive and animated (e.g. jumping to `/substrates/aurora`)."* URL-anchored, no
screenshot.

**ISOLATION (re-proven).** The story-route swap is the same atomic keyed `<component>` cut under one
native View Transition — no weighted transition, no inertia, no choreography; the anti-pattern the
liquid-weight edict names.

**TARGET.** `AppShell.vue:201-203`, `demo/chassis/routeTransition.ts`, the family-D
transition-choreography seam. Design authority: the liquid-weight law (PLAN §3) + IOS27-CODEX law 6.

**POST-MORTEM.** Canon-absence for a shared page-transition primitive; the ask straddled perf and
design and neither claimed it until the seam ruling.

**REDRESS.** **`BJ.W-ROUTE-PENDING` (BAND-PERF W4) — the OUTRIGHT owner of F07's story-transition
choreography** (PLAN §1: "PERF W4 OWNS the F07 story-transition choreography; Family D consulted, not
co-owner"). The concrete choreography (progress floor + origin-anchored goo-morph) is an in-wave
DESIGN-ITERATION obligation. **LIVE-DEFER:** the expressive after-state is a π/DELTA deliverable of
that wave.

**VERDICT vs opus row: RATIFIED.** Crosswalk `LANDED` — AGREE.

---

## F08 — aurora presets duplicative; crayon/oil near-identical; reduce dramatically

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:20`): *"Many presets are duplicative — reduce the set
dramatically. Aurora variants (crayon, oil, etc.) are all almost identical: simplify, remove presets,
focus on the best-designed auroras (sky, sunset, dusk, …)."* Anchor `/substrates/aurora`. URL-anchored,
no screenshot.

**ISOLATION (re-proven at HEAD — the sharpest opus claim survives scrutiny exactly).** Two defects:
(a) preset over-population — **17 presets** at `demo/stories/substrates/aurora/presets.ts:685-703`
(`SETTING_SUN/DUSK/VIVID_SETTING_SUN` one warm-smooth cluster, three `OILPASTEL_*` palette skins, two
`OIL_*`, plus `SPEEDTEST` shipped in the demo roster); (b) the "almost identical" MODES are
mechanically one body on the PRIMARY engine — `applyMedium`
(`src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:387-403`) routes mediums 3/5/6/7
(oil, van-Gogh, oil-pastel, kuwahara) ALL to `mediumKuwahara` on WGSL; the distinct per-dab bodies
live only on the WebGL2 fallback (the file's own comment says so). The
`src/components/aurora/constants/presets.ts:73-78` "first-class mediums, no shared dispatch"
comment describes the fallback arm — no contradiction. The
user's near-identity verdict is mechanically TRUE on the WebGPU primary. **LIVE-DEFER:** the
perceptual near-identity of the smooth-preset clusters is a paint judgment; the WGSL aliasing is not
(it is a literal zero descriptor distance).

**TARGET.** `aurora-mediums.wgsl.ts:387-403` (the alias), the per-medium GLSL bodies
(`vangogh-medium.glsl.ts`, `mediums.glsl.ts`, `oil-modes.glsl.ts`), the demo preset register
(`presets.ts`, 17 incl. `SPEEDTEST`).

**POST-MORTEM.** Silent aliasing frozen into the shipped identity plus preset proliferation by palette
skin. The WGSL port collapsed four painterly mediums onto one Kuwahara body and it was never unwound;
presets multiplied as palette variations of few bodies.

**REDRESS (refreshed RU-14, 2026-07-18, to the re-unioned GF-AURORA-PASS3 at HEAD—117b7f12).**
**GF-AURORA**—`G-MODE-DISTINCT` born-RED (reds at literal zero for the aliased pairs); real
per-mode bodies W1 (van-Gogh on the primary) / W2 (oil-pastel) / W3 (crayon); the oil resolution
W4 widened to THREE arms—PORT / REAUTHOR-LEAN (the default lean) / KILL—terminal collapse set `{}`
on every arm; the preset reduction (W5) is **17→11** with the death-clause elasticity stated in
full (W4-KILL re-expresses oil → 10; floor 9 under the DUSK/DAWN death-clause pair, compound
corner 8—each user-ruled, never a capture judgment; `GF-AURORA-PASS3.md:237,315,461`, corroborated
by SUPERFLUITY C-H's ~11-not-10), keeping the user-named atmospherics + one hero per authored
body, `SPEEDTEST` relocated to its consumer. **The C-G binding governs (re-affirmed by RU-09
C-H):** F08 is discharged ONLY at W1-W4 real-body authorship with `G-MODE-DISTINCT` green—never
at the preset-cut checkbox. The crayon ink-mode ASK is resolved-CUT (singular reading, F03
parsimony; `GF-AURORA-PASS3.md:163`); the live user ask is **Q-AURORA-QUARTET** (§8—the DUSK
re-found / DAWN harden ratification). The mechanism layer above (the WGSL 3/5/6/7→`mediumKuwahara`
alias, 17 presets incl. `SPEEDTEST`, the real-body discharge binding) stands re-proven exact and
is untouched by this refresh.

**VERDICT vs opus row: RATIFIED in full** — the WGSL-aliasing claim, the most fabrication-prone in
the artifact, re-proved exact on disk. Crosswalk `LANDED` with the C-G annotation — AGREE.

---

## F09 — container over-rounded (not 100%; card-like); configurator too cramped; audit all

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:21`): *"Container should not be so rounded (not 100%; more
like a card). The configurator must be larger — too cramped. **All configurators audited.**"*
Screenshot: `feedback/F09-overround-cramped-configurator.png`.

**ISOLATION (screenshot re-read, RATIFIED with a referent caveat).** The "DERIVE FROM COLOR" panel of
the aurora configurator: red seed swatch, 2×2 harmony toggles (`ANALOGOUS/COMPLEMENT/TRIAD/MONO`),
`STOPS − 5 +` stepper, `Derive` button. The heavy rounding sits on the INNER controls — the harmony
toggles read near-stadium and, packed at `gap-1`, fuse into an ovoid-reading mass; the outer panel
corner visible in frame is moderately rounded. The user's "container" most plausibly names that fused
toggle-group read; either reading lands on the same cure (card grammar + roominess). The panel is
visibly cramped (the ~360px aside; the SFC's own comment `:168-173` records the overflow fight).

**TARGET.** `demo/stories/substrates/aurora/sections/AuroraColorSection.vue:163-238` (the derive
panel; `ToggleGroup` `:180-197`, stepper+`Derive` `:199-237`), composed under
`src/components/configurator/**` — container radius `--radius-ctx: var(--radius-panel)`
(`Configurator.vue:211`; `rounded-panel = --radius-xl` `:146`) with the concentric card-radius relay
`max(floor, ctx − inset)` (`configurator/styles.css:109-113`) — already CARD grammar on disk, so the
container half may be partly remediated since the feedback. **LIVE-DEFER:** whether the resting
radius still live-reads ovoid at every mount site (OPEN-D5's own instruction).

**POST-MORTEM.** Screenshot-vs-disk drift plus an unmeasured roominess complaint. The concentric
relay is on disk; the surviving over-round read is the inner pill controls (a radius-role question,
family F) and the fused-group read; the cramping had no born-RED sizing probe until J10.

**REDRESS.** Radius half → **`BJ.W-CONFIGURATOR-STD` (BAND-STORY W3) `G-CFG-4` as a
REGRESSION-GUARD** (container stays card, never reverts to ovoid — AMEND-D-7 + the lead
adjudication), with the inner toggle radius routed to **`BJ.W-RADIUS-ROLE` (BAND-MATERIAL W1)** after
the OPEN-1a live-π (F09 sits in J5's regression-guard conversion class alongside F12/F17/F45).
Cramped/larger half → the prior artifact's residue (D-F09, "roominess has no owner") was **ADOPTED as
JUDGE J10 and APPLIED at HEAD**: W3 carries the two-pronged widen — the TYPE ladder AND a
ROOMINESS/SCALE gate (container min-width + section breathing-room asserted). "All configurators
audited" → the standard adopted everywhere via the `studio` variant.

**VERDICT vs opus row: RATIFIED — the residue was vindicated (J10); verdict UPDATED PARTIAL →
EXACT-AT-HEAD.** Crosswalk `LANDED` — AGREE.

---

## F10 — each section needs clearer design hierarchy

**INVENTORY.** Ledger (`FEEDBACK-LEDGER.md:22`): *"Each section should have better and slightly
clearer design hierarchy."* Screenshot: `feedback/F10-section-hierarchy.png`.

**ISOLATION (screenshot re-read, RATIFIED).** The "Color" configurator section expanded — header
"Color · seed · harmony · palette" (`ConfiguratorLayer label="Color" sub="seed · harmony · palette"`,
`AuroraConfigDock.vue:267`), then Seed / Harmony / Energy labeled fields
(`AuroraColorSection.vue:123-160`). The section headers, descriptor lines, and field labels sit at
nearly one visual weight — no clear size step between section title, field label, and value.

**TARGET (both sites re-proven).** (1) `demo/chassis/section/StorySection.vue:31-32` — every story
heading hardcoded `<h2 class="text-subheading">`, the chassis-wide flattening; (2)
`src/styles/tokens/sizing-config.css:35` — `--configurator-section-size: var(--type-subheading)`
(20.4px, the √φ section rung) sitting only ~4px above the field-label register: the configurator
DOES have a section register (`configurator/styles.css:47-56`), but the steps are too close to read
as hierarchy.

**POST-MORTEM.** Unenforced type ladder plus a too-narrow register. The Tailwind default ramp is
never reset, `StorySection` is pinned to the smallest heading rung, and the configurator's
section↔field steps were set too close — both surfaces read two-level flat. A TWO-site defect.

**REDRESS.** **`BJ.W-CONFIGURATOR-STD` (BAND-STORY W3) `G-CFG-2`** — the StorySection LEVEL axis +
the AMEND-D-2 ladder widen (section `text-heading` ≫ field `text-small` ≫ value `text-caption`),
J10's two-pronged form (ladder + roominess), a page must show ≥3 distinct rungs — backed by
**`BJ.W-TYPE-CODEMOD` (BAND-MATERIAL W6)**, the default-ramp reset + 251-site codemod landing in one
cut with GATES W4 (RULING 2). **LIVE-DEFER:** the ≥3-rung after-read is W3's π obligation.

**VERDICT vs opus row: RATIFIED.** Crosswalk `LANDED` — AGREE.

---

## Coverage summary (union)

| row | screenshot | correlation (union) | owning wave(s) | verdict vs opus |
|-----|-----------|----------------------|----------------|-----------------|
| F01 | yes | `SectionPreviewCard.vue` + landings + tile ladder + boot graph | STORY W5 + PERF W1/W2/W3 | RATIFIED |
| F02 | no (URL) | same chassis on `/foundations` | STORY W5 + PERF W3 | RATIFIED (CLEARED-with-cure) |
| F03 | yes | `dock/layers.vue:279-337` + `manifest.ts:932` | STORY W2 (J8 applied) + MATERIAL W5 + GATES W1 | RATIFIED · PARTIAL→EXACT-AT-HEAD |
| F04 | yes | **`rail.vue:108-140` `shape="rounded"`** + rings; Card = order-surface only | GF-DOCK W5 + REDUCTION W2 + ASK-REDUCTION | **OPUS-WRONG correlation; routing ratified; 2 FLIPs** |
| F05 | yes | `rail.vue:142-189` postures (page disambiguated vs overview's DockStage) | GF-DOCK W2/W6 + STORY W1 (J2 applied) | RATIFIED · PARTIAL→EXACT-AT-HEAD |
| F06 | no (URL) | `routeTransition.ts` VT swap + `router.ts:121-130` + DockCrossfade floor | PERF W4 + GF-DOCK W6 | RATIFIED |
| F07 | no (URL) | the same atomic keyed swap, story-wide | PERF W4 (outright owner) | RATIFIED |
| F08 | no (URL) | 17 presets + the WGSL 3/5/6/7→Kuwahara alias (re-proven) | GF-AURORA W1-W5 under JUDGE C-G (`JUDGE.md:94`) / SUPERFLUITY C-H (`SUPERFLUITY.md:674-681`)—17→11 elastic, three-arm W4, Q-AURORA-QUARTET the live ask (RU-14 refresh) | RATIFIED |
| F09 | yes | `AuroraColorSection.vue:163-238` + configurator chassis | STORY W3 (J10 applied) + MATERIAL W1 | RATIFIED · PARTIAL→EXACT-AT-HEAD |
| F10 | yes | `StorySection.vue:31-32` + `sizing-config.css:35` (two sites) | STORY W3 + MATERIAL W6 | RATIFIED |

**Tally: RATIFIED 9 · OPUS-WRONG 1 (F04 correlation).** The prior artifact's three deltas
(D-F03/D-F05/D-F09) were all adopted (J8/J2/J10) and applied to the bands — DISCHARGED at HEAD; the
historical delta texts are superseded by the band text and are not reproduced here.

---

## JUDGE-2 docket (appended RU-14, 2026-07-18)

Six recorded FLIPs plus one routing item aged un-judged across the three RU-13 dossiers, and the
three unions (RU-05/RU-07/RU-09) landed without consuming any—JUDGE.md's "zero floating
notes remain" is falsified. The COMMITTED RU-03/04 nine-band union (`1340a918`) has since
consumed rows 4/5/7/8 outright, the band half of row 2, and the wave half of row 9 (stamped
RU-14 R5 in the consolidated table). This range carries two of the ten—one live, one consumed:

- **D2-3 (this range, sidecar FLIP-1) — LIVE.** GF-DOCK-PASS3 at HEAD still lacks the
  `rail.vue:108-140` baseline-π anchor and the 3-value `shape`-axis ruling for W5's shape grammar
  (the file carries zero `rail.vue` mentions; re-verified at 117b7f12 and unchanged since).
- **D2-4 (this range, sidecar FLIP-2) — CONSUMED-BY-UNION (RU-14 R5, `1340a918`).**
  `grep "F04 shape" BAND-REDUCTION.md` = 0 at HEAD; the Card default-paint probe is relabeled
  G-CARD-DEFAULT-PAINT (`BAND-REDUCTION.md:237` — "a default `<Card>` at HEAD renders
  `metal:gold` + `grain:true` (`Card.vue:33,:39`)"). The J12+ pass RATIFIES-AND-CLOSES per
  ledger C5's posture; nothing remains to re-apply.

The full ten-item docket lives in `DOSSIER-F11-F20.md` §JUDGE-2 docket (seven at RU-14 pass 1;
rows 8-10—D2-F23, the RU-09 F33 goo-clone migration, the crosswalk F34-F40 handmark rows—seated
RU-14 R3). Asked of the lead: one consolidated JUDGE-2 pass (J12+) ruling all ten, then an
APPLYLOG-mirrored application pass. JUDGE.md/APPLYLOG/band/crosswalk edits are the lead's—outside
the fix seats' write fence.

*End — REFABLE RU-13 union dossier, rows F01–F10. One file, no `src/`/`demo/` edits.*
