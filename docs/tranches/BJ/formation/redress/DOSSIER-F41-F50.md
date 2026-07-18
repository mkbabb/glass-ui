# BJ redress dossier — F41 through F50 (Fable seat)

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F41-F50**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F41/F43/F45/F46/F47/F48 are defect PNGs; F49/F50 are the OpenAI gradient-blur REFERENCE stills;
F42/F44 are URL-anchored, no screenshot). Correlations are verified against live `src/` + `demo/`
at HEAD (`package.json` 7.0.0, `git describe` v7.0.0-16-g5879d0dc), and reconciled against the
formation corpus (`ASSEMBLY-CROSSWALK.md` incl. its lead reconciliation, `REGISTRY.md`, the band
specs, `perfection/FABLE-STORY-FRAMEWORK.md` (the D-amendments), `greenfields/GF-DOCK-PASS3.md`,
`ios27/IOS27-CODEX.md`, `ASK-REDUCTION.md`, `CHRONIC-ADJUDICATION.md`, `ADJUDICATION-1.md`). No
`src/`/`demo/` byte is touched by this dossier.

Convention: file paths absolute-from-repo-root; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`. This range
is the compositions/motion-copy/dock-UX/material tail: F41/F43 ride the copy canon, F42/F44/F45 ride
the compositions-prune ASK (§D1) + reduction, F46 the preview-card double-card, F47 the dock
greenfield, F48/F49/F50 the material band's radius/blur/graded-backdrop trio.

---

## F41 — /motion/text-motion "wtf is this npm install bit?"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:53`): *"`/motion/text-motion` — 'wtf is this npm
install bit?'"* Screenshot: `../../feedback/F41-text-motion-npm-install.png`.

**ISOLATION (first-hand read).** The image is the `/motion/text-motion` page's second specimen: a
`SINGLE-LINE, MONOSPACE` eyebrow over a dark terminal-style panel typing `$ npm install
@mkbabb/glass-ui` with a blinking caret, above the configurator row (Base speed 120ms, Error rate
1.5%, Cursor/Blink switches, Restart). The Typewriter effect itself is fine; the DEFECT is the demo
CONTENT — an actual package-install command read as a stray CTA, not an obvious "here is a typewriter
typing a code line." The user's "wtf is this" is the out-of-place install string, not the animation.

**TARGET.** The exact site (resolved from a screenshot that could not be grepped in `text-motion.vue`):
- Route wrapper: `demo/stories/motion/text-motion.vue:11-27` — a `<FamilyTabs>` composing three bare
  members; member 1 is `typewriter.vue` (`:13-16`). So the screenshot content is rendered by the
  Typewriter member surfaced on `/motion/text-motion`.
- The string: `demo/stories/motion/typewriter.vue:103` — `text="npm install @mkbabb/glass-ui"`, inside
  the "Single-line, monospace" section (`:87-111`; the eyebrow at `:89-91`, the `<TypewriterText>` at
  `:101-109`, `:loop="false"`). **Verified at HEAD: `:103` still types the install string** — the
  born-RED holds, the fix is pending execution.

**POST-MORTEM.** An honest-but-jarring demo sample. The author reached for the library's real install
line as the "code-style typing" specimen (a plausible instinct — it IS single-line monospace), but on
a page that otherwise rotates neutral design phrases ("warm cream", "paper grain", `typewriter.vue:15-21`)
a live `npm install` reads as a misplaced call-to-action. Nothing in the copy canon banned "install
strings as demo CONTENT" until now; the census's OPEN-D3 could not even locate it (it grepped
`text-motion.vue`, but the string lives one directory over in the member SFC), so it shipped unnamed.

**REDRESS.** Owned by `BJ.W-STORY-COPY-CANON` (BAND-STORY W2). The site is pinned by **AMEND-D-6**
(`../perfection/FABLE-STORY-FRAMEWORK.md:302-304`, "the npm-install string is `typewriter.vue:103` …
Fix: a neutral demo string") which CLOSES OPEN-D3 (`../../waves/BAND-STORY.md:506-509`). The born-RED
lives in the copy-canon ban-list: **G-COPY-LINT** item (d) — `npm install @mkbabb/glass-ui` at
`typewriter.vue:103`, "all present" (`FABLE:405-409`); the §5 canon names it explicitly as
"out-of-place install strings as demo CONTENT (F41)… Fix: a neutral demo string that shows the
typewriter effect without reading as a stray CTA" (`FABLE:215-218`). Coverage: **EXACT** — the site is
resolved on evidence to `typewriter.vue:103`, the born-RED is disk-true at HEAD, the cure (swap to a
neutral string) is named, and the owner is the copy-canon wave. (The "resolved" in the crosswalk means
site-and-owner resolved, not cured-on-disk; the string is still live at `:103`, the swap is the wave's.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:63`, `BJ.W-STORY-COPY-CANON (OPEN-D3 — locate
exact site at execution)`). **AGREE** — AMEND-D-6 has since closed OPEN-D3; the site is now exact
(`typewriter.vue:103`), not deferred to execution, so the LANDED flag is if anything strengthened.

---

## F42 — /motion/scroll "what is this vs our other scrolling items"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:54`): *"`/motion/scroll` — What is this vs our other
scrolling items."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/motion/scroll.vue` is a single scroll-family
page rendering three colocated registers as `<StorySection>`s — Native scroll-driven, Reader trigger
system, Choreography (`scroll.vue:10-12,27-37`, bodies in `scroll/Scroll{Native,Reader,Choreography}Body.vue`).
It is already internally consolidated (one page, three registers, no per-member route) — but it still
OVERLAPS `/motion/reveal` (`demo/stories/motion/reveal.vue`), which demonstrates the same
scroll-reveal territory. The user asks the identical question about `reveal` at F32, so this is one
"which scroll primitives are distinct" taxonomy question asked twice, not a code defect.

**TARGET.**
- Demo sites: `demo/stories/motion/scroll.vue` (whole page) + `demo/stories/motion/reveal.vue` (the
  overlapping page).
- Src surface behind them: the multi-consumer keep `fading-scroll` (atlas + speedtest + value.js +
  keyframes.js) and the `useStaggerReveal` family (`../../ASK-REDUCTION.md:196-199`) — which primitives
  survive as distinct public exports is the reduction call.

**POST-MORTEM.** Two demo pages for overlapping scroll primitives, never collapsed. `scroll.vue` was
recently reworked into a clean 3-register colocated page (a partial consolidation), but the
page-vs-page overlap with `reveal.vue` — and the export-level question of which scroll primitives clear
the ≥2-consumer bar — was never resolved. The mechanism is a demo-taxonomy + surface-reduction call
the census could not settle, not a paint or logic fault.

**REDRESS.** Owned by `ASK-REDUCTION §C3` (`../../ASK-REDUCTION.md:190-207`, roll-up `:266`): consolidate
the scroll-reveal primitives to the ones that clear ≥2 (`fading-scroll` is a confirmed multi-consumer
keep); the `reveal`/`scroll` demo pages likely collapse into one scroll-family page (the exact merge
shape is a design call). Family C carries the surface-reduction half (`REGISTRY.md:66,81` lists F42
under family C). Coverage: **EXACT (as a decision)** — a "what is this vs X" whose answer is a
keep-which-primitives + collapse-two-pages ASK with a recommendation on record; no code residue this
seat owns.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:64`, `ASK §C3 reveal/scroll consolidation`).
**AGREE** — a scroll-primitive-taxonomy question with a ≥2-consumer recommendation is precisely an ASK,
not a LANDED fix.

---

## F43 — /compositions/auth-shell putrid colors + "why its own category"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:55`): *"`/compositions/auth-shell` — colors somewhat
putrid; why does this have its own category."* Screenshot: `../../feedback/F43-auth-shell-putrid.png`.

**ISOLATION (first-hand read).** The image is the auth-shell's LEFT brand panel: an `f glass-ui`
wordmark, a sparkle glyph, the display headline *"Build warm, audacious interfaces. Skip the cold
gradient canvas."*, a body blurb ending *"…someone actually cared — because someone did."*, and three
trust rows — `SOC 2 Type II` / `End-to-end encrypted` / `Trusted by 12k teams`. Two distinct defects:
(1) the panel's background wash reads as a putrid olive→khaki→mauve muck (an aurora bleeding through a
translucent panel at low contrast); (2) the trust rows are **fabricated enterprise credentials** and
the blurb is **marketing fluff** — copy a library demo must never ship (a fake SOC-2/12k-teams claim).
Plus the meta-ask: why is "compositions" a top-level category at all.

**TARGET.**
- Putrid colors: `demo/stories/compositions/auth-shell.vue:27` (`brandAurora =
  heroAuroraConfig("purple-tomato")`) → `:64-69` (the `<Aurora :config="brandAurora"
  :opacity-ceiling="0.55">` behind the translucent panel) → the scoped panel ink pins `:207-218`
  (a `--foreground: hsl(24 10% 10%)` dark-ink re-declare over the bright aurora). NOTE: the palette was
  REWORKED post-feedback (the "purple→tomato un-orphan", `:15-27`) — a paint-taste iteration whose
  muddiness is now a keep-vs-prune question, not a fresh fault.
- Fabricated credentials + fluff: `auth-shell.vue:38-42` (`trustBadges` = the three fake claims),
  rendered `:97-112`; the fluff blurb `:90-94`.
- "own category": the whole `demo/stories/compositions/` section (6 pages) + the `compositions`
  category itself.

**POST-MORTEM.** A marketing hero masquerading as a component demo. auth-shell was authored as a
full-bleed sign-in SCENE with invented enterprise trust badges and persuasive copy — the exact
"written for the pitch, not the library user" failure mode (`VISUAL-GESTALT:26`). The putrid palette is
a second, separate cause: an `<Aurora>` at a 0.55 opacity ceiling behind a translucent panel, whose hue
mix reads muddy — a paint-taste result the post-feedback purple-tomato rework tried to improve but the
screenshot predates. Nothing banned fabricated credentials until the copy canon; nothing forced the
compositions section to justify its existence until the reduction ASK.

**REDRESS.** Two owners, cleanly split:
1. **Fabricated credentials + marketing fluff → `BJ.W-STORY-COPY-CANON` gate `G-COPY-3`** (BAND-STORY
   W2, `../../waves/BAND-STORY.md:174-177,196`; `FABLE §5:210-214`): born-RED `grep -nE 'SOC 2|End-to-end
   encrypted|12k teams' auth-shell.vue` → `:39-41` (**verified disk-true at HEAD**); GREEN = 0
   fabricated-credential strings anywhere in `demo/stories/`. This fires REGARDLESS of the prune (the
   ban is a global grep) — `crosswalk:65` states it "→ `BJ.W-STORY-COPY-CANON` regardless."
2. **"own category" + putrid palette (the page's existence) → `ASK-REDUCTION §D1`**
   (`../../ASK-REDUCTION.md:227-249`): confirm the entire `compositions` section prunes (all 6 pages,
   all demo-only, no consumer), which also empties the `scene` page type (taxonomy 6-vs-7,
   `BAND-STORY OPEN-D9`). Recommendation on record: **prune all 6** — so the putrid-palette paint-taste
   is subsumed (a deleted page needs no color retune; if any composition survives as a `scene`, the
   color is a W5/story paint-taste retune).
Coverage: **EXACT** — the credentials half is a LANDED gate with a disk-true born-RED; the existence +
color half is an ASK-gated prune with a recommendation, and the two halves do not collide (the ban
greens by delete OR by rewrite).

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:65`, `ASK §D1 compositions prune; credentials-ban
→ BJ.W-STORY-COPY-CANON regardless`). **AGREE** — the page's fate is a user prune call; the credentials
ban is LANDED beneath it, exactly as the crosswalk splits it.

---

## F44 — /compositions/settings "wtf even is this — overfit nonsense"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:56`): *"`/compositions/settings` — 'Wtf even is' this —
likely overfit nonsense."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/compositions/settings.vue` is a full
settings-panel SCENE: four grouped `<Card>` sections (Account / Appearance / Notifications /
Accessibility, `:115-302`) of `LabeledInput`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch` rows
wired to live surface tokens (`--glass-grain-opacity`, `--density-gap`, `--motion-weight`, cartoon-shadow
tokens, `:52-75`), with a settings-local `--slider-range-bg` re-point (`:340-342`). It is a coherent,
well-built PRODUCT screen — but it is an application scene, not a library-component demo, demo-only with
zero src/external consumers. The user's "what even is this" reads it correctly as an overfit
composition, not a component the library teaches.

**TARGET.**
- Demo site: `demo/stories/compositions/settings.vue` (whole page).
- Src: none of its own — it composes shipped `card` / `labeled-field` / `separator` parts; deleting the
  page removes no component.

**POST-MORTEM.** A demo built to look like a real settings app rather than to show a primitive. The
compositions section accreted full app scenes (settings, auth-shell, dashboards) as showcases; each is
demo-only with no consumer, so each is exactly the "one-consumer-is-not-enough" overfit the A05 purge
targets. The mechanism is a demo-taxonomy over-provision (scenes shipped as stories), not a code fault —
the page works; it just should not be a page.

**REDRESS.** Owned by `ASK-REDUCTION §D1` (`../../ASK-REDUCTION.md:227-249`) + `BAND-REDUCTION` W3 (the
compositions delete, `crosswalk:66`, `REGISTRY.md:66,81`): prune the whole compositions section; the
only mechanical obligation is re-homing the `dialog.confirm-preset` test fixtures that import from
`gate-pattern.vue` (`ASK-REDUCTION:235-238`). Coverage: **EXACT (as a decision)** — a demo-only,
zero-consumer scene is a clean prune ASK with a recommendation on record (delete all 6); no code residue.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:66`, `ASK §D1 compositions prune`). **AGREE** — a
"what even is this" overfit scene with no consumer is a prune ASK, not a LANDED fix.

---

## F45 — /compositions/gate-pattern improper rounding + prune compositions

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:57`): *"`/compositions/gate-pattern` improper rounding
— the entire compositions section is likely to be pruned."* Screenshot:
`../../feedback/F45-gate-pattern-rounding.png`.

**ISOLATION (first-hand read).** The image is the "Access required" modal: a lock disc, title +
descriptor, an `access key` input, and an `Unlock` button. The rounding reads role-mixed — the input is
a soft-rect (moderate-radius) box, the Unlock button is a full stadium pill, and the dialog shell is a
large squircle. The eye reads the input's squarer corner as inconsistent with the pill button beneath
it. The second clause ("the entire compositions section is likely to be pruned") makes the page's
existence the larger question.

**TARGET.**
- The input: `demo/stories/compositions/gate-pattern.vue:143-150` (`<Input v-model="value"
  placeholder="access key">`), which — because it is nested in a `DialogContent` (`:119`) — resolves
  `--radius-field` (16px soft-rect) via the **F7 concentric-field rule** at
  `src/components/_shared/field-control.css:37-48` (`[data-slot="dialog-content"] .field-control[data-kind="input"]
  { border-radius: var(--radius-field) }`), NOT the base `--radius-pill` at `:34`.
- The Unlock button: `gate-pattern.vue:156-158` — a default `<Button>`, `--radius-control` (stadium pill).
- The dialog shell: `--radius-dialog` = `--radius-card` = `--radius-2xl` (16px), `src/styles/theme/radius.css:32-34`.
- Existence: the whole `compositions/` section.

**POST-MORTEM.** The "improper rounding" is, on disk, a DELIBERATE and already-landed grammar — and the
formation's F45 scope has not caught up to it. `field-control.css:37-48` was written expressly for the
dialog-nested single-line input (its own comment names "the 'Rename workspace' Slug pill vs the round
dialog shell", the F48 case): inside a modal the scale-invariant stadium pill "visibly disagrees with
the soft-rect surface; the 16px field rung nests concentrically and reads coherent," while the modal
Save/Cancel CTAs keep the iOS capsule pill. So the F45 input(soft-rect)+button(pill) pairing the user
flagged is the INTENDED concentric-field state, not an un-ruled accident. The residual open question is
only paint-taste (does the soft-rect-input-beside-pill-button read coherent, or should they match) — a
live-π ruling, not a born-RED "fix the wrong radius."

**REDRESS.** Two owners, one with a residue:
1. **Existence → `ASK-REDUCTION §D1`** (prune all 6 compositions; `../../ASK-REDUCTION.md:227-249`) — the
   recommendation deletes gate-pattern outright (after re-homing its confirm-preset test fixture), which
   moots the rounding entirely.
2. **Rounding, IF it survives → `BJ.W-RADIUS-ROLE` §D(F45)** (BAND-MATERIAL W1,
   `../../waves/BAND-MATERIAL.md:110-115`) — not yet in OPEN-1a's live-π set (OPEN-1a is scoped to
   F09/F12/F17 at `:135,165`; F45 is a §D bullet at `:110-115` that Δ-F45-1 appends). Coverage: **PARTIAL**
   — the owner and the verify-before-fix live-π discipline are right, but W1's §D(F45) text frames the
   target as *"the input/button coherence is the sweep target"* and describes the on-disk hits only as
   *"`rounded-full` icon tiles (correct)"* — it does NOT cite `field-control.css:37-48`, the landed F7
   rule that already makes the dialog-nested input read `--radius-field` concentric. So W1 risks writing
   a born-RED against a divergence that is already the intended coherent state. The appendable delta
   (Δ-F45-1) re-aims F45's probe to a REGRESSION-GUARD over the F7 rule (the same conversion the lead
   amendment already applied to F12/F17, `../../waves/BAND-MATERIAL.md:667-669`), not a fresh fix.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:67`, `ASK §D1 prune; rounding → BJ.W-RADIUS-ROLE
if survives`). **AGREE with the ASK flag** — the page's fate is the prune call; the disagreement is only
with W1's F45 SCOPE TEXT (a born-RED sweep target vs a regression-guard over the landed F7 rule), which
the delta below re-aims, not a status change.

---

## F46 — /foundations/intro double-card; most blank; slow to load

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:58`): *"`/foundations/intro` — why wrapped in TWO
layers of cards; most blank; slow to load."* Screenshot: `../../feedback/F46-intro-double-card.png`.

**ISOLATION (first-hand read).** The image is the category index grid: eight cards (Forms / Containers
/ Navigation / Dock / Data / Feedback / Motion / Compositions), each a rounded outer card wrapping an
inner dark inset preview WELL plus a title + one-line blurb. Only Forms (Ada Lovelace input pills) and
Dock (a mini glass dock) show a real preview; Containers/Navigation/Data/Feedback/Motion/Compositions
show EMPTY dark wells — 6 of 8 vacant. Two visible defects: (1) the **double-card** — each preview
sits inside a second bordered/inset-shadowed well nested in the outer card (card-in-card); (2) the
**blank tiles** — most wells render nothing. The third clause ("slow to load") is a boot/paint-timing
symptom not capturable in a still.

**TARGET.**
- Demo host: `demo/stories/foundations/intro.vue:79-87` — the `<SectionPreviewCard v-for>` grid; each
  card's `tile` is resolved via `resolveStoryTile(c.id, leadStory)` (`:46-54`).
- The double-card (STRUCTURAL, shared component): `demo/chassis/landing/SectionPreviewCard.vue:35-54`
  (the markup: an outer `rounded-card border` card at `:23-33` wrapping the `.section-preview-card-preview`
  well at `:35`) + `:76-92` (the well's OWN style: its own `border-radius` `:87`, own `background` `:88`,
  and its own `inset 0 0 0 1px --glass-border-quiet` ring + inset highlight `:89-92`) — a second bordered
  surface, verified on disk. This is F46's "TWO layers of cards", inherent to the component, not an
  intro-page-only mount.
- The blank tiles: the tile-ladder authorship coverage — only 4 `.tile.vue` files exist across the demo
  (`FABLE §3:135-141`), so most categories fall to the `identity`/empty floor.
- Slow-to-load: the eager-mount boot graph + content-visibility deferred paint —
  `SectionPreviewCard.vue:63-65` (`content-visibility:auto; contain-intrinsic-size:auto 19rem`), family E.

**POST-MORTEM.** Three compounding causes. The double-card is structural: whoever built
`SectionPreviewCard` gave the inner media region its own border + inset ring + radius + background,
so every preview is a card nested in a card (`SectionPreviewCard.vue:89-92`) — the census assumed this
might be an intro-only wrapper, but it is in the shared component. The vacancy is authorship coverage:
the `authored → still → identity` tile ladder is SOUND and 0-GL by construction (`storyTile.ts`), but
only 4 headline stories ever got a `.tile.vue`, so most cards fall to the typographic/empty floor. The
slow-load is the perf band's eager-boot + content-visibility-deferred blank-19rem box (F02 mechanism).
None of the three had an owner until the preview-card wave.

**REDRESS.** Owned by `BJ.W-PREVIEW-CARD` (BAND-STORY W5, `../../waves/BAND-STORY.md:355-417`), sharpened
by the perfection amendments:
- **Double-card → `G-PRV-4` + AMEND-D-5** (`../perfection/FABLE-STORY-FRAMEWORK.md:296-300`): "the inner
  media region bleeds to the card's inner edge (drop the second border + inset ring), one card + one
  thumbnail." The born-RED is disk-true (the second ring at `SectionPreviewCard.vue:89-92`).
- **Blank tiles → `G-PRV-2` + AMEND-D-4** (`FABLE:288-294`): author a `.tile.vue` for every category
  headline + landing lead (coverage 4/88 → catalog-bento + landing-leads never `identity`); route
  `CatalogLanding` through `resolveStoryTile`. The "render a LIVE miniature" draft line is STRUCK
  (contradicts the 0-GL contract) — an authored CSS/DOM vignette or frozen still, never a live loop.
- **Slow-to-load → family E** (BAND-PERF, `../../waves/BAND-STORY.md:47-51`) — Wave 5 owns the above-fold
  content-visibility EXEMPTION contract (`G-PRV-3`); family E owns the boot-graph + deferred-paint trace.
Coverage: **EXACT** — all three halves are owned with disk-true born-REDs; the double-card cure is
structural at the exact ring lines, the vacancy cure is authorship (not liveness), the perf split is
clean. (The proportion review also marks the double-card, `../../waves/BAND-MATERIAL.md:486-487`, as
cross-reference to the same W5 fix — not a second owner.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:68`, `BJ.W-PREVIEW-CARD (G-PRV-4/G-PRV-2,
OPEN-D7); perf → BAND-PERF`). **AGREE** — AMEND-D-5 resolved OPEN-D7 (the double-card is structural in
the shared component, confirmed on disk); a structural cure + authorship + perf-split is a clean LANDED.

---

## F47 — dock UX: occlusion signal + auto-scroll; "greenfield again"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:59`): *"Dock UX increased dramatically: scrolling dock
must show there's more left/right with subtlety; clicking an edge-occluded item auto-scrolls the dock
(vertical and horizontal). The dock likely needs to be greenfielded, again, with better UX and
affordances in mind."* Screenshot: `../../feedback/F47-dock-ux.png`.

**ISOLATION (first-hand read).** The image is the demo shell's bottom dock — a glass strip carrying
`< Radii · Shadows · Motion · Paper & Glass · Icons(active) · Surface Tints · Overlays & > | « » [layers]`.
Two edge cells are clipped **mid-glyph** by the fade mask — "Radii" reads as "adii" at the leading edge,
"Overlays &" is cut at the trailing edge — with no subtle signal that more content exists beyond. The
strip carries redundant chrome: `<` `>` (prev/next), a `|` divider, `«` `»` (prev/next category), and a
layers-stack trigger. Above it float LAYERS/LIBRARY/PACKAGE/BOOKOPEN icon labels (the rail's nav
column). Defects: (a) overflow is signalled by an item-blind pixel fade that bisects glyphs, not a
subtle "more" affordance; (b) tapping an occluded cell does not scroll it into view; (c) the chevron/jump
chrome is redundant; (d) the whole interaction model wants a re-greenfield.

**TARGET.**
- Demo host: `demo/shell/BottomDock.vue:17-20` (the `ChevronLeft/Right`/`ChevronsLeft/Right` chrome
  imports), `:42` (`<FadingScroll>` — the horizontal strip port with the edge mask), `:48-53` (the
  `useStoryNavigation` `goTo/next/prev/nextCategory/prevCategory` strip), `:155-165` (the persistent
  prev/next controls). Cited by the greenfield as `BottomDock.vue:17-20,161-252`.
- Src fault (the item-blind mask + free scroll): `src/components/dock/styles/overflow.css` OVERFLOW
  branch — `overflow-x: auto` (free inline scroll, **no `scroll-snap-type`**) + the `<FadingScroll>`
  `mask-image: linear-gradient(...)` fixed-px edge mask (`:61-91`), which clips at a fixed pixel offset
  regardless of cell boundaries → the "Radii"/"Overlays &" mid-glyph clip.
- Src fault (the census primitive absent): the overflow measurer is `useDockOverflowFit`
  (`useDockOverflowFit.ts:39-40`, measures scroll extent) — there is no per-item occlusion census.

**POST-MORTEM.** A scroll port dressed with chevron chrome, where the codex wants a snap-detented
filmstrip. The dock overflows via a free `overflow-x:auto` strip + a fixed-pixel `FadingScroll` mask
that has no knowledge of cell boundaries, so it fades mid-word; and because tapping an occluded cell
routes through `goTo()` (navigation) rather than the dock spring, nothing scrolls the occluded item into
port. The chevron/jump controls were bolted on to compensate for the missing occlusion affordance. The
whole thing is the "shape to be abrogated" (F04) plus the missing occlusion grammar — exactly the
"greenfield again" the user asks for.

**REDRESS.** Owned EXACTLY by `GF-DOCK-PASS3`, the corrected single-model "snap-detented filmstrip"
(`../greenfields/GF-DOCK-PASS3.md:45-66`), across two waves + the shape regrounding:
- **(a) occlusion signal → W1** `G-OCCLUSION-PEEK` + `G-MORE-SIGNAL` (`GF-DOCK-PASS3.md:271,292-295`):
  a `useDockItemCensus` primitive + a **boundary-anchored** fade whose stop coincides with a cell
  boundary + a `--dock-peek` sliver + a `--dock-more-*` cohort, REPLACING the `overflow.css` pixel mask
  — "no mid-glyph clip" (the §4.3 snap/peek geometry, `:155-176`). Also `G-SNAP` (`:289-291`): a
  `scroll-snap-type` on the port so cells detent instead of resting mid-glyph.
- **(b) auto-scroll on tap/focus → W3** `G-REVEAL` (`GF-DOCK-PASS3.md:273,300-301`): tapping (or focusing)
  an occluded cell fires a `useDockSpring` glide that recentres and snap-aligns it (`keepOpen()` held,
  `:151-153`); focus⟂occlusion couples keyboard focus to the same reveal (`:110-114`). This is F47b's
  "clicking an edge-occluded item auto-scrolls."
- **(c) redundant chevron/jump chrome → §5 `G-RADIUS-GRAMMAR`** (`GF-DOCK-PASS3.md:199-226`): delete the
  `<` `>` `«` `»` chevron controls (redundant once tap-reveal + census occlusion + Home/End keyboard
  land) — RED-at-HEAD `BottomDock.vue:161-252` renders them.
- **(d) "greenfield again" → the whole GF-DOCK model** (snap-detented filmstrip, `role="toolbar"` + roving
  keyboard §3, one selection pill §7).
Coverage: **EXACT** — every clause maps to a named gate with a disk-true RED (the pixel mask, the free
scroll, the goTo-not-engine tap, the chevron chrome), the model is codex-law-6-grounded, and the
material/radius tokens are consumed from BAND-MATERIAL not re-minted (`:220-222`). (F27's vertical-scroll
half, `useDockOverflowFit.ts:39-40`, is the sibling row's `G-NO-BLOCK-SCROLL`, not F47's.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:69`, `GF-DOCK W1 (occlusion/peek) + W3
(reveal-on-intent)`). **AGREE** — an "occlusion signal + auto-scroll + greenfield-again" with a
census-anchored fade, a reveal glide, and a chevron-chrome delete, all disk-true, is a clean LANDED
greenfield.

---

## F48 — hierarchy/blur/rounding app-wide; ALL glass subtler; dialog = card

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:60`): *"Design hierarchy, blurring, rounding — app AND
framework wide — adjusted. Glass blur for ALL glass components slightly more subtle. Dialog rounding
consistent with cards. Background blur better."* Screenshot: `../../feedback/F48-hierarchy-blur-rounding.png`.

**ISOLATION (first-hand read).** The image is a "Rename workspace" dialog over a blurred Dialog story
page. The dialog carries a title + descriptor, a `Slug` label, a soft-rect `sun-spots` input, and
stacked full-pill `Save` / `Cancel` buttons. Behind it, the page content ("Dialog", "Standard dialog",
the blurb) is blurred by the backdrop. Reading it against the ledger's four clauses: (a) the dialog
shell is a large squircle — the "rounding consistent with cards" ask; (b) the backdrop blur is a
uniform heavy slab — the "background blur better" ask; (c) the overall glass reads heavier than the
F49/F50 reference — the "ALL glass subtler" ask; (d) design hierarchy. NOTE the Slug input already reads
soft-rect (NOT a stadium pill) and the CTAs already read pill — i.e. the modal-input concentric grammar
is ALREADY in the screenshot.

**TARGET.** Four halves, three material owners:
- Dialog rounding = card: `src/styles/theme/radius.css:32-34` (`--radius-dialog: var(--radius-card)` =
  `--radius-2xl` 16px) — **already bound at HEAD** (radius.css:141 comment: "MATCH THE CARD"). The
  modal-nested input's concentric radius is the F7 rule at `src/components/_shared/field-control.css:37-48`
  (its comment literally names "the 'Rename workspace' Slug pill vs the round dialog shell" — this
  screenshot).
- Subtler blur for ALL: the blur ladder at `src/styles/tokens/glass.css:138-153` (6 names → 4 radii:
  1/7/11/16) + the 2dppx overlay arm at `src/styles/tokens/light-dark.css:36`.
- Background blur better: the immersive scrim + the graded box-following backdrop
  (`dialog/placement.css:141-209`, the `--glass-halo-*` cohort at `glass.css:171-173`).
- Design hierarchy: the type ladder (StorySection level axis / `text-subheading` flattening).

**POST-MORTEM.** A four-part material ask against systems that are partly already remediated and partly
genuinely open. The rounding half largely LANDED on disk before the screenshot: `--radius-dialog` binds
`--radius-card` (radius.css:34) and the modal input reads `--radius-field` concentric (field-control.css:47),
so "dialog consistent with cards" is a token relationship that already holds (a disk-drifted-ahead case,
like F09/F12/F17). The blur half is genuinely open: the ladder collapses 6 names to 4 radii with a
device-dependent 2dppx jump (the F28/F48 "inconsistent" mechanism), and whether a FURTHER subtler pull
is warranted at HEAD is paint-taste owed a live-π against F49/F50. The background-blur half is the
frozen graded-backdrop experiment (already in-tree pre-tag, awaiting an adopt/decline). No single wave
owned "material app-wide," so it fans to three material waves.

**REDRESS.** Owned across BAND-MATERIAL W1/W2/W3 (`crosswalk:70`):
- **Rounding (dialog = card) → `BJ.W-RADIUS-ROLE`** (W1): the role table canonizes `dialog →
  --radius-dialog = --radius-card` (`../../waves/BAND-MATERIAL.md:74`). Since the binding + the F7
  modal-input rule already hold on disk, this is a **regression-guard**, not a born-RED fix (the same
  treatment the lead amendment gave F12/F17, `:667-669`) — see Δ-F45-1, which extends that guard to the
  F48 modal-input case explicitly.
- **Subtler blur for ALL → `BJ.W-BLUR-LADDER`** (W2, `../../waves/BAND-MATERIAL.md:207-223`): rule the
  6→4 collision, kill-or-document the 2dppx arm (OPEN-2b), and judge the F48 further-pull against the
  F49/F50 stills (OPEN-2c, `:222-223`) — a live-π, not a blind integer pull.
- **Background blur better → `BJ.W-GRADED-BACKDROP-JUDGE`** (W3): the box-following graded bloom is the
  "background blur better" mechanism; adopt-or-decline forced with the F49/F50 π (see F50 below).
- **Hierarchy → the type ladder** (BAND-STORY W3 level axis + BAND-MATERIAL W6 codemod) —
  cross-referenced, not this row's material core.
Coverage: **EXACT** — the four halves map to three material waves (+ the type ladder), each with the
correct verify-before-fix discipline; the rounding half is correctly a regression-guard (disk already
holds), the blur + backdrop halves are correctly live-π/judgment gates. The one sharpening is the shared
Δ-F45-1 (name `field-control.css:37-48` as the landed modal-input cure so W1 guards, not re-fixes, it).

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:70`, `BJ.W-BLUR-LADDER (subtler) +
BJ.W-RADIUS-ROLE (dialog=card) + BJ.W-GRADED-BACKDROP-JUDGE`). **AGREE** — a four-part app-wide material
ask split across the three material waves with live-π/regression-guard discipline is precisely LANDED.

---

## F49 — OpenAI popup: notice the subtle blurring (REFERENCE)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:61`): *"OpenAI popup reference — notice the subtle
blurring."* Screenshot: `../../feedback/F49-openai-popup-subtle-blur.png`. **Reference-inventory item
(the target, not a defect).**

**ISOLATION (first-hand read — what the reference exemplifies).** An iOS screen (status bar 13:13, 5G,
88%) showing a keyframes.js task-list conversation, with a floating segmented control at the bottom:
`5.6 Sol High >` over a pill segmented control (one white active segment + three dots). Around and
behind the floating control the blur is **subtle and graded** — the backdrop softens gently near the
element and is barely-there, not a uniform heavy slab; a faint blurred halo pools around the pill rather
than a hard-edged frost rectangle. This is the codex law-1 "subtler blur overall" + "radial glow pool"
target the library's flat blur ladder is measured against.

**TARGET (the capability the reference sets, not a component to fix).**
- The subtler-blur target: the blur ladder `src/styles/tokens/glass.css:138-153` (the current values the
  F49 subtlety judges against).
- The graded/radial-pool target: the `--glass-halo-*` cohort + FORM-2 box-following bloom
  (`src/components/dialog/placement.css:141-209`, `glass.css:171-173`).
- Codex authority: `../ios27/IOS27-CODEX.md:11-14` (law 1, "the OpenAI F49/F50 glow pool") + `:55-57`
  (law 12, the F49/F50 segmented fill-pill+dots — the scroll-progress replacement model).

**POST-MORTEM (why the current material cannot express the reference — the capability gap).** The
library's blur is a FLAT slab ladder: a single `backdrop-filter: blur(Npx)` per surface with no
directional or radial falloff, so a modal backdrop is uniform edge-to-edge — it cannot produce F49's
gentle near-element pooling. And the ladder reads heavier than the reference (F28/F48): 4 real radii
with a 2dppx jump, no continuous grade. The two gaps are (1) no gradient/positional blur primitive
(only a flat filter), and (2) an overall heaviness the shipped ~30% dial-back may or may not have
closed. The frozen `--glass-halo-*` box-following bloom is the FIRST attempt at the graded pool, but it
was frozen into the tag undecided.

**REDRESS.** Owned as a reference by two material waves: `BJ.W-BLUR-LADDER` (W2) captures the current
ladder vs the F49 still and rules the subtler pull (OPEN-2c, `../../waves/BAND-MATERIAL.md:222-223,259-263`);
`BJ.W-GRADED-BACKDROP-JUDGE` (W3) uses F49 as the π reference for the graded-pool adopt/decline
(`../../waves/BAND-MATERIAL.md:349-351`). Codex law 1 anchors both (`crosswalk:71`). Coverage: **EXACT
(as a reference)** — F49 is correctly inventoried as the subtler-blur + glow-pool TARGET that W2's
live-π and W3's judgment measure against, not a defect to correct; both waves name the F49 still as the
comparison artefact.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:71`, `BJ.W-BLUR-LADDER (subtler target) +
BJ.W-GRADED-BACKDROP-JUDGE (F49 π reference)`). **AGREE** — a reference still that seeds a subtler-blur
target + a graded-pool comparison is correctly a LANDED reference feeding W2/W3, not an ORPHAN or ASK.

---

## F50 — gradient blur behind the element; experiment + judge (REFERENCE)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:62`): *"Gradient blurring behind the element —
popovers/modals should likely have something like this; experiment with it at least, judge
effectiveness and design."* Screenshot: `../../feedback/F50-gradient-blur-behind.png`.
**Reference-inventory item (the target + an explicit experiment instruction).**

**ISOLATION (first-hand read — what the reference exemplifies).** The same iOS screen as F49, a beat
later: `5.6 Sol Extra High >` with the white active segment now longer (two dots remaining). The
floating segmented control sits over a **gradient blur that is strongest right behind the element and
fades outward** — a soft luminous pool concentric with the control, not a full-screen uniform frost.
This is the "gradient blurring behind the element" the user names, with an explicit instruction:
experiment with it for popovers/modals and JUDGE its effectiveness and design.

**TARGET (the experiment surface, not a defect to fix).**
- The on-disk experiment: `data-backdrop="graded"` opt-in (`src/components/dialog/ModalOverlay.vue:49`,
  `isGraded`) + FORM-2 the radial-struck box-following bloom (`src/components/dialog/placement.css:141-209`,
  frost-near/sharp-far, concentric with the modal radius, Safari-safe no-`url()`-filter) + the
  `--glass-halo-*` cohort (`src/styles/tokens/glass.css:171-173`, blur 20px / core 13rem / bloom 7rem).
  The flat immersive scrim is gated OFF under graded (`drawer/styles.css`, the Δ0 swap).
- Codex authority: `../ios27/IOS27-CODEX.md:11-14` (law 1, "radially — the OpenAI F49/F50 glow pool")
  + the "true gradient blur across a single panel" BEST-iOS-27 aim (`:65-66`).

**POST-MORTEM (why the current material cannot express the reference — the capability gap + the freeze).**
The experiment the user asked for (a gradient blur behind popovers/modals) was BUILT — the box-following
bloom + the `--glass-halo-*` cohort landed in-tree pre-tag (commits `24b63d01`/`189ae15c`/`71892b9e`) —
but frozen into the 7.0.0 major with its adopt-or-decline decision explicitly UNRESOLVED, against the
GRADED-BACKDROP wave's own warning that an experimental public API "cannot be frozen into the immutable
major half-baked." So the gap is not "can't build it" (it is built and matches the F50 reference) — it
is that the experiment was frozen undecided, so the library ships a graded backdrop nobody ruled on. The
default flat scrim remains the heavy F48 slab; the graded pool is opt-in and unratified.

**REDRESS.** Owned EXACTLY by `BJ.W-GRADED-BACKDROP-JUDGE` (BAND-MATERIAL W3,
`../../waves/BAND-MATERIAL.md:288-373`) — an EXPERIMENT wave with an explicit judgment gate. The RED is
the unresolved-freeze state itself (`:336-339`); GREEN is a recorded **ADOPT** (keep the cohort, collapse
the `graded-backdrop.test.ts` literals to relationships per BAND-GATES W1) or **DECLINE** (strip
`--glass-halo-*` + FORM-2 + `isGraded`, route the residual flat scrim to `BI.W-IMMERSIVE-SCRIM`) — never
a "decide later" float. The load-bearing π obligation IS the F49/F50 reference comparison (Safari +
Chrome, side-by-side with the stills, `:344-351`). OPEN-3a is "the single most load-bearing OPEN in this
band" (`:368-369`). CHRONIC-ADJUDICATION ruling 4 confirms the freeze compresses entirely into this W3
adopt-or-decline (`../CHRONIC-ADJUDICATION.md:22-25`). Coverage: **EXACT (as a reference + experiment)**
— F50 is precisely the experiment-and-judge instruction, and W3 is a forced adopt/decline ruling with
the F49/F50 π as the evidence, exactly as the user asked ("judge effectiveness and design").

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:72`, `BJ.W-GRADED-BACKDROP-JUDGE
(adopt-or-retire, OPEN-3a Fable/DesignSync ruling)`). **AGREE** — an "experiment + judge" ask with a
built-but-frozen experiment on disk is exactly a forced adopt/decline judgment wave, not a defect fix.

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | delta count |
|-----|------------------|----------------|----------|-------------|
| F41 | text-motion npm-install string | `BJ.W-STORY-COPY-CANON` (G-COPY-LINT d; AMEND-D-6 pins `typewriter.vue:103`) | **EXACT** | 0 |
| F42 | scroll vs other scrolling items | `ASK §C3` (reveal/scroll consolidation) | **EXACT (decision)** | 0 |
| F43 | auth-shell putrid + own category | `G-COPY-3` (credentials, LANDED) + `ASK §D1` (prune) | **EXACT** | 0 |
| F44 | settings overfit nonsense | `ASK §D1` + `BAND-REDUCTION W3` (compositions prune) | **EXACT (decision)** | 0 |
| F45 | gate-pattern rounding + prune | `ASK §D1` (prune) + `BJ.W-RADIUS-ROLE` §D(F45) if survives | **PARTIAL** | 1 |
| F46 | intro double-card; blank; slow | `BJ.W-PREVIEW-CARD` (G-PRV-4/AMEND-D-5 + G-PRV-2/AMEND-D-4; perf→fam E) | **EXACT** | 0 |
| F47 | dock occlusion + auto-scroll; greenfield | `GF-DOCK` W1 (occlusion/peek/more) + W3 (reveal) + §5 (chrome delete) | **EXACT** | 0 |
| F48 | hierarchy/blur/rounding app-wide | `BJ.W-RADIUS-ROLE` (W1) + `BJ.W-BLUR-LADDER` (W2) + `BJ.W-GRADED-BACKDROP-JUDGE` (W3) | **EXACT** | 0 |
| F49 | OpenAI subtle-blur reference | `BJ.W-BLUR-LADDER` (subtler target) + `BJ.W-GRADED-BACKDROP-JUDGE` (F49 π) | **EXACT (reference)** | 0 |
| F50 | gradient-blur-behind; experiment+judge | `BJ.W-GRADED-BACKDROP-JUDGE` (adopt/decline, OPEN-3a) | **EXACT (reference)** | 0 |

**Totals: EXACT 9 / PARTIAL 1 / MISSING 0** (F42/F44 counted as EXACT-decision; F49/F50 as
EXACT-reference). Delta count: **1**.

## Proposed deltas (appendable form)

**Δ-F45-1 (residue — F45/F48 modal-input rounding is already the landed F7 concentric-field grammar;
W1's F45 probe must REGRESSION-GUARD it, not born-RED re-fix it).** In `BJ.W-RADIUS-ROLE` (BAND-MATERIAL
W1), §D(F45) frames the target as *"the input/button coherence is the sweep target"* and describes the
gate-pattern on-disk hits only as *"the two on-disk hits are `rounded-full` icon tiles (correct)"*
(`../../waves/BAND-MATERIAL.md:110-115`). But the actual F45/F48 modal-input radius is set by the
**F7 concentric-field rule** at `src/components/_shared/field-control.css:37-48` —
`[data-slot="dialog-content"] .field-control[data-kind="input"] { border-radius: var(--radius-field) }`
— whose own comment names the F48 case verbatim ("the 'Rename workspace' Slug pill vs the round dialog
shell… the 16px field rung nests concentrically and reads coherent"), while the modal Save/Cancel CTAs
keep the pill. So the "improper" input(soft-rect)+button(pill) pairing the user flagged in F45 (and
already visible as the soft-rect Slug input in the F48 screenshot) is the INTENDED concentric grammar,
already on disk. Append to W1's F45 scope + OPEN-1a: (1) CITE `field-control.css:37-48` as the landed
modal-input cure; (2) CONVERT the F45/F48 modal-input-radius item from a born-RED "sweep the incoherent
input/button" to a **regression-guard** (assert dialog-nested single-line inputs stay `--radius-field`
concentric and modal CTAs stay `--radius-control` pill) — the exact conversion the lead amendment already
applied to F12/F17 (`../../waves/BAND-MATERIAL.md:667-669`); (3) run the OPEN-1a live-π to confirm-then-pin,
and if the paint-taste read still finds the soft-rect-input-beside-pill-button incoherent, rule THAT as
a fresh design decision (match or keep-distinct) with its own π — not as a defect against the current
tokens. Owner unchanged; the delta re-aims F45's probe (and covers F48's dialog-input half) from re-fix
to guard.
