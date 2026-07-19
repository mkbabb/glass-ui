# BJ redress dossier — F41 through F50 (unioned canon)

verified-model: **claude-fable-5** (verbatim from system context: "The exact model ID is
claude-fable-5"). Union provenance: prior artifact ran on claude-opus-4-8 via config override;
rewritten in place 2026-07-18 by the REFABLE RU-13 Fable seat — fresh ANEW evidence authoritative
on conflict, opus content kept only where re-proven (verdict sidecar:
`../refable/REFABLE-RU-13-F41-F50.md`).

Per-row inventory / isolation / target / post-mortem / redress / status-check for feedback-ledger
rows **F41-F50**, the user's 2026-07-17 corpus. Every screenshot in range was read first-hand
(F41/F43/F45/F46/F47/F48 are defect PNGs; F49/F50 are the OpenAI gradient-blur REFERENCE stills;
F42/F44 are URL-anchored, no screenshot). Correlations are verified against live `src/` + `demo/`
at HEAD (`git describe` v7.0.0-52-g4cac55a2), and reconciled against the formation corpus
(`ASSEMBLY-CROSSWALK.md`, `REGISTRY.md`, the band specs, `perfection/FABLE-STORY-FRAMEWORK.md`,
`greenfields/GF-DOCK-PASS3.md`, `ios27/IOS27-CODEX.md`, `ASK-REDUCTION.md`,
`CHRONIC-ADJUDICATION.md`, `JUDGE.md` J1-J11 as applied). No `src/`/`demo/` byte is touched by
this dossier.

Convention: file paths absolute-from-repo-root; `crosswalk` = `../ASSEMBLY-CROSSWALK.md`. This
range is the compositions/motion-copy/dock-UX/material tail: F41/F43 ride the copy canon, F42/F44/
F45 ride the compositions-prune ASK (§D1) + reduction, F46 the preview-card double-card, F47 the
dock greenfield, F48/F49/F50 the material band's radius/blur/graded-backdrop trio.

---

## F41 — /motion/text-motion "wtf is this npm install bit?"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:53`): *"`/motion/text-motion` — 'wtf is this npm
install bit?'"* Screenshot: `../../feedback/F41-text-motion-npm-install.png`.

**ISOLATION (first-hand read).** The image is the `/motion/text-motion` page's second specimen: a
`SINGLE-LINE, MONOSPACE` eyebrow over a dark terminal-style panel typing `$ npm install
@mkbabb/glass-ui` with a blinking caret, above the configurator row (Base speed 120ms, Error rate
1.5%, Cursor/Blink switches, Restart). The Typewriter effect itself is fine; the DEFECT is the demo
CONTENT — an actual package-install command read as a stray CTA, not an obvious "here is a
typewriter typing a code line." SECONDARY DEFECT (visible in the still, refable-added): the
"single-line" specimen WRAPS — `@mkbabb/glass-` breaks to a second line mid-token with the caret
below it. The container (`typewriter.vue:92-99`, `rounded-panel … px-4 py-3`) carries no
`white-space: nowrap` / horizontal-overflow handling, so at narrow widths the SINGLE-LINE label is
false on screen.

**TARGET.** The exact site (resolved from a screenshot that could not be grepped in
`text-motion.vue`):
- Route wrapper: `demo/stories/motion/text-motion.vue:11-27` — a `<FamilyTabs>` composing three
  bare members; member 1 is `typewriter.vue` (`:13-16`). So the screenshot content is rendered by
  the Typewriter member surfaced on `/motion/text-motion`.
- The string: `demo/stories/motion/typewriter.vue:103` — `text="npm install @mkbabb/glass-ui"`,
  inside the "Single-line, monospace" section (`:87-111`; the eyebrow at `:89-91`, the
  `<TypewriterText>` at `:101-109`, `:loop="false"`). **Verified at HEAD: `:103` still types the
  install string** — the born-RED holds, the fix is pending execution.
- The wrap: the same section's container `:92-99` (no nowrap/overflow).

**POST-MORTEM.** An honest-but-jarring demo sample. The author reached for the library's real
install line as the "code-style typing" specimen (a plausible instinct — it IS single-line
monospace), but on a page that otherwise rotates neutral design phrases ("warm cream", "paper
grain", `typewriter.vue:15-21`) a live `npm install` reads as a misplaced call-to-action — and
under the greenfield-no-meta discipline, install-instruction copy has no place in a story demo at
all. Nothing in the copy canon banned "install strings as demo CONTENT" until now; the census's
OPEN-D3 could not even locate it (it grepped `text-motion.vue`, but the string lives one directory
over in the member SFC), so it shipped unnamed.

**REDRESS.** Owned by `BJ.W-STORY-COPY-CANON` (BAND-STORY W2). The site is pinned by **AMEND-D-6**
(`../perfection/FABLE-STORY-FRAMEWORK.md:427-429`, "the npm-install string is `typewriter.vue:103`
… Fix: a neutral demo string") which CLOSES OPEN-D3 (`../../waves/BAND-STORY.md:506-509`). The
born-RED lives in the copy-canon ban-list: **G-COPY-LINT** — `npm install @mkbabb/glass-ui` at
`typewriter.vue:103`, "all present, all re-verified" (`FABLE:588-592`); the canon names it
explicitly ("out-of-place install strings as demo CONTENT (F41)… Fix: a neutral demo string",
`FABLE:257-258`). Refable rider for the wave: the replacement string must also NOT WRAP — pair the
string swap with `white-space: nowrap` + inline overflow handling (or a string short enough at the
mobile floor), else the SINGLE-LINE specimen stays visibly false. Coverage: **EXACT** — the site is
resolved on evidence to `typewriter.vue:103`, the born-RED is disk-true at HEAD, the cure is named,
and the owner is the copy-canon wave. (Line anchors into `FABLE-STORY-FRAMEWORK.md` corrected in
this union — the prior artifact's cites pointed ~110-180 lines high; content verified present at
the corrected lines.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:63`, `BJ.W-STORY-COPY-CANON (OPEN-D3 —
locate exact site at execution)`). **AGREE** — AMEND-D-6 has since closed OPEN-D3; the site is now
exact (`typewriter.vue:103`), not deferred to execution.

---

## F42 — /motion/scroll "what is this vs our other scrolling items"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:54`): *"`/motion/scroll` — What is this vs our
other scrolling items."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/motion/scroll.vue` is a single scroll-family
page rendering three colocated registers as `<StorySection>`s — Native scroll-driven, Reader
trigger system, Choreography (`scroll.vue:10-12,27-37`, bodies in
`scroll/Scroll{Native,Reader,Choreography}Body.vue`). It is already internally consolidated (one
page, three registers, no per-member route) — but it still OVERLAPS `/motion/reveal`
(`demo/stories/motion/reveal.vue`), which demonstrates the same scroll-reveal territory (the
`vReveal` stagger directive + the `useLiquidReveal` bloom flagship). The src surface underneath
splits across `composables/motion/scroll/` (scrollReader, useScrollTrigger, useScrollScene,
useScrollPin, useScrollProgress, useScrollChrome) and `composables/motion/reveal/` (vReveal,
useStagger, useStaggerReveal, useBloomUp, useLiquidReveal), plus the scroll-adjacent components
(`fading-scroll`, `infinite-scroll`, `scroll-progress-rim`). The user asks the identical question
about `reveal` at F32, so this is one "which scroll primitives are distinct" taxonomy question
asked twice, not a code defect.

**TARGET.**
- Demo sites: `demo/stories/motion/scroll.vue` (whole page) + `demo/stories/motion/reveal.vue` (the
  overlapping page).
- Src surface behind them: the multi-consumer keep `fading-scroll` (atlas + speedtest + value.js +
  keyframes.js) and the `useStaggerReveal` family (`../../ASK-REDUCTION.md:196-199`) — which
  primitives survive as distinct public exports is the reduction call.

**POST-MORTEM.** Two demo pages for overlapping scroll primitives, never collapsed. `scroll.vue`
was reworked into a clean 3-register colocated page (a partial consolidation), but the page-vs-page
overlap with `reveal.vue` — and the export-level question of which scroll primitives clear the
≥2-consumer bar — was never resolved. The scroll and reveal families grew in separate waves with no
single scroll-family owner. A demo-taxonomy + surface-reduction call, not a paint or logic fault.

**REDRESS.** Owned by `ASK-REDUCTION §C3` (`../../ASK-REDUCTION.md:190-207`): consolidate the
scroll-reveal primitives to the ones that clear ≥2 (`fading-scroll` is a confirmed multi-consumer
keep); the `reveal`/`scroll` demo pages likely collapse into one scroll-family page (the exact
merge shape is a design call). Ruling C-D (`JUDGE.md`) ships the scroll census table as the
recommendation — its "9-keep/6-cut table" anchor is STALE at HEAD (re-anchored RU-14,
2026-07-18): the RU-09 SUPERFLUITY rewrite (5c847780) no longer carries that table; its C-F
verdict settles the census fresh (`useStagger`/`useStaggerReveal`/`useBloomUp`/`useTextHighlight`
zero-caller; scrollReader's one-site fence violated twice in-house; `.scroll-pin` moves to
`demo/` WITH its writers) and ships the full kill/keep table with the flip-on-file:line escape
clause — the §C3 recommendation text reads from the RU-09 verdicts. §C3 remains a
user-ratification row, now with teeth. Family C carries the surface-reduction half. Coverage:
**EXACT (as a decision)** — no code residue this seat owns.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:64`, `ASK §C3 reveal/scroll consolidation`).
**AGREE.**

---

## F43 — /compositions/auth-shell putrid colors + "why its own category"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:55`): *"`/compositions/auth-shell` — colors
somewhat putrid; why does this have its own category."* Screenshot:
`../../feedback/F43-auth-shell-putrid.png`.

**ISOLATION (first-hand read).** The image is the auth-shell's LEFT brand panel: an `f glass-ui`
wordmark, a sparkle glyph, the display headline *"Build warm, audacious interfaces. Skip the cold
gradient canvas."*, a body blurb ending *"…someone actually cared — because someone did."*, and
three trust rows — `SOC 2 Type II` / `End-to-end encrypted` / `Trusted by 12k teams`. Two distinct
defects: (1) the panel's background wash reads as a putrid olive→khaki→mauve muck (the aurora
bleeding through the translucent panel); (2) the trust rows are **fabricated enterprise
credentials** and the blurb is **marketing fluff** — copy a library demo must never ship. Plus the
meta-ask: why is "compositions" a top-level category at all.

**TARGET.**
- Putrid colors: `demo/stories/compositions/auth-shell.vue:27` (`brandAurora =
  heroAuroraConfig("purple-tomato")`) → `:64-69` (the `<Aurora :config="brandAurora"
  :opacity-ceiling="0.55">` behind the translucent panel) → the scoped panel ink pins `:207-218`
  (`--foreground: hsl(24 10% 10%)` dark-ink re-declare; the style comment states the panel "always
  paints a bright purple→tomato aurora in both themes"). **Dating corrected (refable):** the
  purple-tomato palette landed 2026-07-16 (`490cc46e`/`2d804ce6` are the file's last touches) and
  the feedback corpus is 2026-07-17 — the screenshot shows the CURRENT palette, post-rework. The
  user judged the reworked state putrid; the muddiness cannot be excused as a pre-rework artifact.
  Mechanism note: the panel paints one both-themes aurora over a theme-dependent ground with
  light-theme ink pins — the khaki/mauve blend in the still is consistent with the 0.55-ceiling
  purple-tomato over the dark ground; the exact per-theme render is **LIVE-DEFER** (a paint
  question no static read settles).
- Fabricated credentials + fluff: `auth-shell.vue:38-42` (`trustBadges` = the three fake claims),
  rendered `:97-112`; the fluff blurb `:90-94`.
- "own category": the whole `demo/stories/compositions/` section (6 pages) + the `compositions`
  category itself.

**POST-MORTEM.** A marketing hero masquerading as a component demo. auth-shell was authored as a
full-bleed sign-in SCENE with invented enterprise trust badges and persuasive copy — the "written
for the pitch, not the library user" failure mode (`VISUAL-GESTALT:26`). The putrid palette is a
second, separate cause: an `<Aurora>` at a 0.55 opacity ceiling behind a translucent panel whose
hue mix reads muddy over the dark ground — and this is the CURRENT, already-reworked palette, so
the defect stands against HEAD, not against a superseded draft. Nothing banned fabricated
credentials until the copy canon; nothing forced the compositions section to justify its existence
until the reduction ASK.

**REDRESS.** Two owners, cleanly split:
1. **Fabricated credentials + marketing fluff → `BJ.W-STORY-COPY-CANON` gate `G-COPY-3`**
   (BAND-STORY W2, `../../waves/BAND-STORY.md:174-177,196`): born-RED `grep -nE 'SOC 2|End-to-end
   encrypted|12k teams' auth-shell.vue` → `:39-41` (**verified disk-true at HEAD**); GREEN = 0
   fabricated-credential strings anywhere in `demo/stories/`. Fires REGARDLESS of the prune —
   `crosswalk:65` states it "→ `BJ.W-STORY-COPY-CANON` regardless."
2. **"own category" + putrid palette (the page's existence) → `ASK-REDUCTION §D1`**
   (`../../ASK-REDUCTION.md:227-249`): confirm the entire `compositions` section prunes (all 6
   pages, all demo-only, no consumer). Recommendation on record: **prune all 6** — the
   putrid-palette taste question is subsumed (a deleted page needs no color retune; if any
   composition survives as a `scene`, the color is a story-band paint-taste retune, and the
   dating correction above means that retune starts from "the current palette already failed the
   user," not "wait for the rework").
Coverage: **EXACT** — the credentials half is a LANDED gate with a disk-true born-RED; the
existence + color half is an ASK-gated prune with a recommendation, and the two halves do not
collide (the ban greens by delete OR by rewrite).

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:65`). **AGREE** — the page's fate is a user
prune call; the credentials ban is LANDED beneath it.

---

## F44 — /compositions/settings "wtf even is this — overfit nonsense"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:56`): *"`/compositions/settings` — 'Wtf even is'
this — likely overfit nonsense."* **URL-anchored, no screenshot.**

**ISOLATION (from ledger + live code).** `demo/stories/compositions/settings.vue` is a full
settings-panel SCENE: four grouped `<Card>` sections (Account / Appearance / Notifications /
Accessibility, `:115-302`) of `LabeledInput`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch` rows,
with four channels wired to live surface tokens (`--glass-grain-opacity`/`--paper-grain-opacity`,
`--density-gap`, `--motion-weight`, the cartoon-shadow tokens, `:52-75`) and a settings-local
`--slider-range-bg` re-point (`:340-342`). **Refable-added — the page is not even internally
honest:** the `baseSize` and `radius` refs (`:29-30`) bind the "Base size" and "Radius" sliders
(`:200-215`) whose descriptions claim live effect ("Root font size in pixels", "Corner rounding in
pixels"), but `surfaceStyle` never consumes either — two DEAD KNOBS presenting as live
configuration. It is an application scene, not a library-component demo, demo-only with zero
src/external consumers; the dead knobs are direct evidence for the user's "overfit nonsense" read.

**TARGET.**
- Demo site: `demo/stories/compositions/settings.vue` (whole page; dead knobs `:29-30,200-215` vs
  `:52-75`).
- Src: none of its own — it composes shipped `card` / `labeled-field` / `separator` parts; deleting
  the page removes no component.

**POST-MORTEM.** A demo built to look like a real settings app rather than to show a primitive —
and built past its own wiring, with two knobs whose claimed effects were never implemented. The
compositions section accreted full app scenes as showcases; each is demo-only with no consumer, so
each is exactly the "one-consumer-is-not-enough" overfit the A05 purge targets. A demo-taxonomy
over-provision (scenes shipped as stories), with the dead-knob residue showing the scene outgrew
its own maintenance.

**REDRESS.** Owned by `ASK-REDUCTION §D1` (`../../ASK-REDUCTION.md:227-249`) + `BAND-REDUCTION` W3
(the compositions delete): prune the whole compositions section; the only mechanical obligation is
re-homing the `dialog.confirm-preset` test fixtures that import from `gate-pattern.vue`. If —
against the recommendation — settings survives the ASK, the dead knobs are a mandatory fix (wire
or delete both sliders); a page cannot ship controls that silently no-op. Coverage: **EXACT (as a
decision)**.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:66`). **AGREE.**

---

## F45 — /compositions/gate-pattern improper rounding + prune compositions

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:57`): *"`/compositions/gate-pattern` improper
rounding — the entire compositions section is likely to be pruned."* Screenshot:
`../../feedback/F45-gate-pattern-rounding.png`.

**ISOLATION (first-hand read).** The image is the "Access required" modal: a lock disc, title +
descriptor, an `access key` input, and an `Unlock` button. The rounding reads role-mixed — the
input is a soft-rect box reading much squarer than the full-stadium Unlock pill beneath it and the
large-radius dialog shell around both. The second clause makes the page's existence the larger
question.

**TARGET.**
- The input: `demo/stories/compositions/gate-pattern.vue:143-150` (`<Input v-model="value"
  placeholder="access key">`), nested in a `DialogContent` (`:119`) — resolves `--radius-field`
  (16px soft-rect) via the concentric-field rule at
  `src/components/_shared/field-control.css:37-48` (`[data-slot="dialog-content"]
  .field-control[data-kind="input"] { border-radius: var(--radius-field) }`), NOT the base
  `--radius-pill` at `:34`. **Cure dated (corrected RU-14, 2026-07-18):** that rule landed at
  `923c5254` ("the dialog input field rung — adopt over the pill", 07-17 10:02), with the sibling
  cures `2764f60b` (dialog corner bound to card, 03:07) and `58fba6e6` (A' round corner, 10:02) —
  all three ANCESTORS of v7.0.0 (tag commit `4ab12128`, 07-17 18:11; verified by `merge-base`),
  i.e. PRE-tag: 7.0.0 SHIPS the rounding cures. The prior "post-7.0.0-tag fix-pass commits, after
  the screenshot" dating was false — and internally impossible beside F50's correct pre-tag
  dating of the LATER 11:14 trio. Whether the screenshot pre- or post-dates the same-day cure
  commits is statically unprovable.
- The Unlock button: `gate-pattern.vue:156-158` — a default `<Button>`, `--radius-control` (stadium
  pill), intentionally kept (the iOS capsule CTA idiom).
- The dialog shell: `--radius-dialog` = `--radius-card` = `--radius-2xl` (16px),
  `src/styles/theme/radius.css:32-34`.
- Existence: the whole `compositions/` section.

**POST-MORTEM.** The "improper rounding" the user shot is CURED ON DISK at HEAD by a deliberate,
landed grammar: `field-control.css:37-48` was written expressly for the dialog-nested single-line
input (its comment names "the 'Rename workspace' Slug pill vs the round dialog shell" — the F48
case) — inside a modal the scale-invariant stadium pill disagrees with the soft-rect surface, so
the 16px field rung nests concentrically while the modal CTAs keep the pill. The cure commits
are pre-tag, same-day as the feedback capture — whether the screenshot predates them is
statically unprovable (hedged RU-14; the prior flat "predates" claim over-reached). The residual
question is only paint-taste (does
soft-rect-input-beside-pill-button read coherent live) — a live-π ruling, **LIVE-DEFER** from this
seat.

**REDRESS.** Two owners, both now settled in the plan:
1. **Existence → `ASK-REDUCTION §D1`** (prune all 6 compositions) — the recommendation deletes
   gate-pattern outright (after re-homing its confirm-preset test fixture), mooting the rounding.
2. **Rounding, IF it survives → `BJ.W-RADIUS-ROLE` §D(F45)** (BAND-MATERIAL W1). The prior
   artifact's Δ-F45-1 (re-aim from born-RED sweep to REGRESSION-GUARD over the landed rule) was
   **ADOPTED as `JUDGE.md` J5 and is APPLIED at HEAD** — re-expressed by the committed union
   (`1340a918`; re-pinned RU-14 R5, the old `:111-115` quote is dead — that span is now the
   `--radius-input` misnomer block): `../../waves/BAND-MATERIAL.md:146-149` carries "**F12 + F45
   + F48-rounding — REGRESSION-GUARDS (J5 class, re-proven)** … F45: the concentric-field grammar
   at `_shared/field-control.css:47-49` already cures the dialog-input case (landed pre-tag,
   `923c5254`)." NOTE the class membership moved with the union: **F17 is FLIPPED OUT** of J5's
   original "F09/F12/F17" wording to a BORN-RED FIX (`:135` "the prior REGRESSION-GUARD premise
   is FALSE"; `:52`, `:160`) — J5's ruling text in `JUDGE.md:38` still reads the original class,
   but the BAND's applied state governs the executor. F45's own guard posture is unaffected.
   Nothing further to append.
Coverage: **EXACT (as amended — J5 applied)**. The prior PARTIAL verdict and its proposed delta are
superseded/consumed; see §Consumed deltas.

**STATUS CHECK.** Crosswalk flag: **ASK** (`crosswalk:67`, `ASK §D1 prune; rounding →
BJ.W-RADIUS-ROLE if survives`). **AGREE** — with the note that the rounding half is a
regression-guard at HEAD, not an open fix.

---

## F46 — /foundations/intro double-card; most blank; slow to load

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:58`): *"`/foundations/intro` — why wrapped in TWO
layers of cards; most blank; slow to load."* Screenshot:
`../../feedback/F46-intro-double-card.png`.

**ISOLATION (first-hand read).** The image is the category index grid: eight cards (Forms /
Containers / Navigation / Dock / Data / Feedback / Motion / Compositions), each a rounded outer
card wrapping an inner dark inset preview WELL plus a title + one-line blurb. Only Forms (input
pills) and Dock (a mini glass dock) show a real preview; the other six show EMPTY dark wells with a
lone label — 6 of 8 vacant. Two visible defects: (1) the **double-card** — each preview sits inside
a second bordered/inset-shadowed well nested in the outer card; (2) the **blank tiles**. The third
clause ("slow to load") is a boot/paint-timing symptom not capturable in a still.

**TARGET.**
- Demo host: `demo/stories/foundations/intro.vue:79-87` — the `<SectionPreviewCard v-for>` grid;
  each card's `tile` resolved via `resolveStoryTile(c.id, leadStory)` (`:38-57`).
- The double-card (STRUCTURAL, in the shared component): `demo/chassis/landing/
  SectionPreviewCard.vue` — the outer `rounded-card border` glass card (`:23-33`) wrapping the
  `.section-preview-card-preview` well (`:35`), which carries its OWN `border-radius` (`:87`),
  own `background` (`:88`), and its own inset highlight + `inset 0 0 0 1px --glass-border-quiet`
  ring (`:89-92`) — a second bordered surface, verified on disk. This is F46's "TWO layers of
  cards", inherent to the component, not an intro-page-only mount (resolves OPEN-D7).
- The blank tiles: authorship coverage — exactly **4** `.tile.vue` files exist
  (`display/buttons`, `display/card`, `dock/overview`, `forms/inputs`; verified by find), so most
  categories fall through the `authored → still → identity` ladder (`storyTile.ts:41-51`) to the
  identity/empty floor.
- Slow-to-load: the eager boot graph — BAND-PERF W1's measured RED baseline (74 eager JS files
  ≈ 770 KB + 317 KB render-blocking CSS ≈ 1.09 MB before `app.mount()`) — plus the async authored
  tiles (`SectionPreviewCard.vue:17-19` `defineAsyncComponent`) popping in after mount, plus
  `content-visibility: auto; contain-intrinsic-size: auto 19rem` (`:63-65`) deferring paint.

**POST-MORTEM.** Three compounding causes. The double-card is structural: the inner media region
was given its own border + inset ring + radius + background, so every preview is a card nested in a
card — the census assumed this might be an intro-only wrapper, but it is in the shared component.
The vacancy is authorship coverage: the tile ladder is SOUND and 0-GL by construction, but only 4
headline stories ever got a `.tile.vue`, so most cards fall to the typographic/empty floor. The
slow-load is the perf band's eager-boot + deferred-paint mechanism (the F01/F02/A17 class). None of
the three had an owner until the preview-card wave.

**REDRESS.** Owned by `BJ.W-PREVIEW-CARD` (BAND-STORY, `../../waves/BAND-STORY.md:355-417`),
sharpened by the perfection amendments (anchors corrected in this union):
- **Double-card → `G-PRV-4` + AMEND-D-5** (`../perfection/FABLE-STORY-FRAMEWORK.md:421-425`): the
  inner media region bleeds to the card's inner edge (drop the second border + inset ring) — one
  card, one thumbnail. The born-RED is disk-true (the ring at `SectionPreviewCard.vue:89-92`).
- **Blank tiles → `G-PRV-2` + AMEND-D-4** (`FABLE:413-419`): author a `.tile.vue` for every
  category headline + landing lead (coverage 4 → full); route `CatalogLanding` through
  `resolveStoryTile`. The "render a LIVE miniature" draft line is STRUCK (contradicts the 0-GL
  contract) — an authored CSS/DOM vignette or frozen still, never a live loop.
- **Slow-to-load → family E** (BAND-PERF W1 `BJ.W-BOOT-DIET` + W3 `BJ.W-DEFERRED-PAINT`, which owns
  the above-fold content-visibility EXEMPTION contract).
Coverage: **EXACT** — all three halves owned with disk-true born-REDs.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:68`). **AGREE** — AMEND-D-5 resolved
OPEN-D7 (the double-card is structural in the shared component, confirmed on disk).

---

## F47 — dock UX: occlusion signal + auto-scroll; "greenfield again"

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:59`): *"Dock UX increased dramatically: scrolling
dock must show there's more left/right with subtlety; clicking an edge-occluded item auto-scrolls
the dock (vertical and horizontal). The dock likely needs to be greenfielded, again, with better UX
and affordances in mind."* Screenshot: `../../feedback/F47-dock-ux.png`.

**ISOLATION (first-hand read).** The image is the demo shell's bottom dock — a glass strip carrying
`< Radii · Shadows · Motion · Paper & Glass · Icons(active) · Surface Tints · Overlays & > | « »
[layers]`. Two edge cells are clipped **mid-glyph** — "Radii" reads cut at the leading edge,
"Overlays &" mid-word at the trailing edge — with no subtle signal that more content exists beyond.
The strip carries loud chrome: `<` `>` (prev/next story), a divider, `«` `»` (prev/next category),
a layers trigger. Defects: (a) overflow is signalled by an item-blind pixel fade that bisects
glyphs, not a subtle "more" affordance; (b) tapping an occluded cell in THIS strip does not scroll
it into view; (c) the chevron/jump chrome compensates for the missing affordance; (d) the whole
interaction model wants a re-greenfield.

**TARGET.**
- Demo host: `demo/shell/BottomDock.vue:17-22` (the chevron chrome imports), `:42` +
  `:184-196` (the `<FadingScroll axis="x">` story-tab strip — clicks route through `goToStory` →
  `goTo()`, `:65-68`), `:159-215` (the persistent prev/next controls), `:221-263` (the
  category-jump group).
- Src fault (the item-blind mask + free scroll): `src/components/dock/styles/overflow.css` OVERFLOW
  branch (`:62-105`) — `overflow-x: auto` with **no `scroll-snap-type`** + the FadingScroll-recipe
  `mask-image: linear-gradient(...)` edge mask (`:91-104`) keyed to fixed px fade widths, blind to
  cell boundaries → the mid-glyph clip.
- Src fact (refable precision): the library dock's select-path recenter EXISTS —
  `useSelectionGroup.ts:183` fires `scrollIntoView({inline:'nearest'})` on every select, guttered
  by `scroll-padding-inline` (`overflow.css:76-78`). F47b's gap is real but narrower than "nothing
  auto-scrolls": the demo strip routes through `goTo()` navigation and never touches the engine,
  and no path recenters on FOCUS of an occluded cell. GF-DOCK's tap-to-reach RED states exactly
  this (§4.4/W3 `G-REACH` at HEAD; the pre-rewrite gate name `G-REVEAL` is gone—"only
  `useSelectionGroup` rails recentre; the `BottomDock` strip routes through `goTo()`").
- Src fault (no census): the overflow measurer `useDockOverflowFit` toggles one boolean attr off
  scroll extent — there is no per-item occlusion census.

**POST-MORTEM.** A scroll port dressed with chevron chrome, where the codex wants a snap-detented
filmstrip. The dock overflows via a free `overflow-x:auto` strip + a fixed-pixel edge mask with no
knowledge of cell boundaries, so it fades mid-word; the one shipped recenter (select-path
`scrollIntoView`) never reaches the demo strip, whose taps are route navigations; and the
chevron/jump controls were bolted on to compensate. The whole thing is the "shape to be abrogated"
(F04) plus the missing occlusion grammar — the "greenfield again" the user asks for.

**REDRESS (re-mapped RU-14, 2026-07-18, to the re-unioned GF-DOCK-PASS3 at HEAD—117b7f12).**
Owned EXACTLY by `GF-DOCK-PASS3`, now the detented filmstrip under a quasi-fixed lens: the detent
CONTRACT survives but its CSS-snap MECHANISM is STRUCK by the charter itself (law 14—"CSS
scroll-snap cannot express duration-stable snapping. Web: JS spring integrators";
`GF-DOCK-PASS3.md:52-54`, §4.2 `:115-122`). The prior gate names
`G-OCCLUSION-PEEK`/`G-SNAP-DETENT`/`G-REVEAL` are grep-zero at HEAD; the mapping is:
- **(a) occlusion signal → W1** CENSUS PRIMITIVE + EVIDENCE STACK, gates `G-EVIDENCE` +
  `G-MORE-SIGNAL` (`:318,363-367`): `useDockItemCensus` (cell rects → detent table) + the
  cut-band detent grammar + peek + lip shadow + condensation—the pixel fade mask dies. The
  rest-position half seats at **W2** DETENT ENGINE (`G-DETENT-PHYSICS`): duration-stable
  JS-spring seats, velocity-projected detents, asymmetric rubber band—no cell rests mid-glyph,
  and NOT via `scroll-snap-type`.
- **(b) auto-scroll on tap/focus → W3** TAP-TO-REACH + TOOLBAR KEYBOARD, gates `G-REACH` +
  `G-KEYBOARD-TOOLBAR` + `G-FOCUS-VISIBLE` (§4.4 "Tap-to-reach (F47b) — instant commit,
  concurrent seat", `:180`): tap OR focus of an occluded cell seats it via the spring engine;
  focus⟂occlusion couples keyboard focus to the same reveal-on-intent.
- **(c) redundant chevron/jump chrome → W5** `G-RADIUS-GRAMMAR` (`:322,388-389`): delete the
  chevron chrome once tap-to-reach + census evidence + Home/End keyboard land — RED-at-HEAD
  `BottomDock.vue:161-252` renders it.
- **(d) "greenfield again" → the whole GF-DOCK model** (detented filmstrip + the JS-spring detent
  engine + the W4 selection lens, `role="toolbar"` + roving keyboard).
Coverage: **EXACT** — every clause maps to a named gate with a disk-true RED. (F27's
vertical-scroll half is the sibling row's `G-NO-BLOCK-SCROLL`, now seated at W2 beside the detent
engine, not F47's.)

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:69`, `GF-DOCK W1 (occlusion/peek) + W3
(reveal-on-intent)`). **AGREE.**

---

## F48 — hierarchy/blur/rounding app-wide; ALL glass subtler; dialog = card

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:60`): *"Design hierarchy, blurring, rounding — app
AND framework wide — adjusted. Glass blur for ALL glass components slightly more subtle. Dialog
rounding consistent with cards. Background blur better."* Screenshot:
`../../feedback/F48-hierarchy-blur-rounding.png`.

**ISOLATION (first-hand read).** The image is a "Rename workspace" dialog over a blurred Dialog
story page. The dialog carries a title + descriptor, a `Slug` label, a soft-rect `sun-spots` input,
and stacked full-pill `Save` / `Cancel` buttons. Behind it the page content is blurred by a uniform
heavy backdrop slab. Against the ledger's four clauses: (a) dialog rounding consistent with cards;
(b) background blur better (the slab); (c) ALL glass subtler; (d) design hierarchy. NOTE the Slug
input already reads soft-rect and the CTAs pill — the modal-input concentric grammar is ALREADY in
the screenshot.

**TARGET.** Four halves, three material owners:
- Dialog rounding = card: `src/styles/theme/radius.css:32-34` (`--radius-dialog:
  var(--radius-card)` = `--radius-2xl` 16px) — **already bound at HEAD** (commit `2764f60b`; the
  `:141` comment "MATCH THE CARD"; `--corner-shape-dialog` retired at `58fba6e6`). The
  modal-nested input's concentric radius is `field-control.css:37-48` (landed `923c5254`; its
  comment names this screenshot's "Rename workspace" Slug case verbatim).
- Subtler blur for ALL: the blur ladder — `tokens/glass.css:86-97` (radius rungs) + `:138-155`
  (composed tokens): wash 1px, quiet 7, resting 7, floating 11, overlay 11, deep 16
  (`tokens/glass-deep.css`) — **6 rung names → 4 distinct radii (1/7/11/16)**, with the overlay
  rung jumping to 17px at `@media (min-resolution: 2dppx)` (`tokens/light-dark.css:36`).
- Background blur better: the graded box-following backdrop (`dialog/placement.css` FORM-2 +
  `--glass-halo-*` at `glass.css:171-173`).
- Design hierarchy: the type ladder (StorySection level axis / the flattened `text-subheading`).

**POST-MORTEM.** A four-part material ask against systems partly already remediated and partly
genuinely open. The rounding half LANDED on disk PRE-tag (the three dated commits above are
v7.0.0 ancestors — corrected RU-14, 2026-07-18: 7.0.0 ships the rounding cures; there was no
post-tag fix-pass), so "dialog consistent with cards" is a token relationship that already
holds — a disk-drifted-ahead case like F09/F12/F17. The blur half is genuinely open: 6 names collapse to 4
radii with a device-dependent 2dppx jump (the F28/F48 "inconsistent" mechanism), and whether a
FURTHER subtler pull is warranted at HEAD is paint-taste owed a live-π against F49/F50
(**LIVE-DEFER**). The background-blur half is the graded-backdrop experiment, frozen into the major
undecided. No single wave owned "material app-wide," so it fans to three material waves.

**REDRESS.** Owned across BAND-MATERIAL W1/W2/W3 (`crosswalk:70`):
- **Rounding (dialog = card) → `BJ.W-RADIUS-ROLE`** (W1): the role table canonizes `dialog →
  --radius-dialog = --radius-card` (`../../waves/BAND-MATERIAL.md:94`, re-pinned RU-14 R5). The
  binding + the modal-input rule already hold on disk, so this is a **regression-guard** — the
  J5-applied conversion (now the F12+F45+F48-rounding class at `BAND-MATERIAL.md:146-149`; F17
  flipped out to born-RED) covers the modal-input case explicitly.
- **Subtler blur for ALL → `BJ.W-BLUR-LADDER`** (W2, `:212+`, re-pinned): rule the 6→4 collision (OPEN-2a
  names vs rungs), kill-or-document the 2dppx arm (OPEN-2b), and judge the F48 further-pull against
  the F49/F50 stills (OPEN-2c) — a live-π, not a blind integer pull.
- **Background blur better → `BJ.W-GRADED-BACKDROP-JUDGE`** (W3): the box-following graded bloom is
  the "background blur better" mechanism; adopt-or-decline forced with the F49/F50 π (see F50).
- **Hierarchy → the type ladder** (BAND-STORY level axis + BAND-MATERIAL W6 codemod) —
  cross-referenced, not this row's material core.
Coverage: **EXACT** — four halves, three material waves (+ the type ladder), each with
verify-before-fix discipline.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:70`). **AGREE.**

---

## F49 — OpenAI popup: notice the subtle blurring (REFERENCE)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:61`): *"OpenAI popup reference — notice the subtle
blurring."* Screenshot: `../../feedback/F49-openai-popup-subtle-blur.png`. **Reference-inventory
item (the target, not a defect).**

**ISOLATION (first-hand read — what the reference exemplifies).** An iOS screen (status bar 13:13,
5G, 88%) showing a keyframes.js task-list conversation, with a floating segmented control at the
bottom: `5.6 Sol High >` over a pill segmented control (one white active segment + three dots).
Around and behind the floating control the blur is **subtle and graded** — the backdrop softens
gently near the element and fades with distance, a faint blurred pool around the pill rather than a
hard-edged uniform frost rectangle. This is the codex law-1 "subtler blur overall" + "glow pool"
target the library's flat blur ladder is measured against.

**TARGET (the capability the reference sets, not a component to fix).**
- The subtler-blur target: the blur ladder (`tokens/glass.css:86-97,138-155` — the current 6-name/
  4-radii values the F49 subtlety judges against, F48 above).
- The graded/pool target: the `--glass-halo-*` cohort (`glass.css:171-173` — blur 20px / core 13rem
  / bloom 7rem) + FORM-2 box-following bloom (`dialog/placement.css`, the intersect double-ramp
  mask; radial form STRUCK in favor of the axis-product — the token comment records the shape).
- Codex authority: `../ios27/IOS27-CODEX.md` law 1 (the OpenAI F49/F50 glow pool) + law 12 (the
  F49/F50 segmented fill-pill+dots — the model `BJ.W-PROGRESS-RIM-REPLACE` (FEEDBACK-MOTION W2)
  replaces the broken progress rim with; the same two stills serve that motion wave as reference).

**POST-MORTEM (the capability gap).** The library's default blur is a FLAT slab ladder: one
`backdrop-filter: blur(N)` per surface with no positional falloff, so a modal backdrop is uniform
edge-to-edge — it cannot produce F49's near-element pooling. And whether the ladder still reads
heavier than the reference after the shipped dial-back is undecided (OPEN-2c). The
`--glass-halo-*` box-following bloom is the first shipped attempt at the graded pool, frozen into
the tag unratified.

**REDRESS.** Owned as a reference by two material waves: `BJ.W-BLUR-LADDER` (W2) captures the
current ladder vs the F49 still and rules the subtler pull (OPEN-2c); `BJ.W-GRADED-BACKDROP-JUDGE`
(W3) uses F49 as the π reference for the adopt/decline. Both π obligations are **LIVE-DEFER** from
this seat (paint comparisons no static read settles). Coverage: **EXACT (as a reference)**.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:71`). **AGREE.**

---

## F50 — gradient blur behind the element; experiment + judge (REFERENCE)

**INVENTORY.** Ledger (`../../FEEDBACK-LEDGER.md:62`): *"Gradient blurring behind the element —
popovers/modals should likely have something like this; experiment with it at least, judge
effectiveness and design."* Screenshot: `../../feedback/F50-gradient-blur-behind.png`.
**Reference-inventory item (the target + an explicit experiment instruction).**

**ISOLATION (first-hand read).** The same iOS screen as F49, a beat later: `5.6 Sol Extra High >`
with the active segment longer (two dots remaining). The floating control sits over a **gradient
blur strongest right behind the element, fading outward** — a soft pool concentric with the
control, not a full-screen uniform frost. The user's instruction: experiment with it for
popovers/modals and JUDGE effectiveness and design.

**TARGET (the experiment surface, not a defect to fix).**
- The on-disk experiment (all verified at HEAD): the `backdrop="graded"` opt-in
  (`src/components/dialog/ModalOverlay.vue:49` `isGraded`, the `glass-graded-halo` child `:98`) +
  FORM-2 the box-following bloom (`dialog/placement.css` — frost-near/sharp-far via the
  mask-composite intersect double-ramp, concentric with the modal radius) + the per-edge FORM-1
  halo on side sheets (`DialogContent.vue:466-473`) + the `--glass-halo-*` cohort
  (`glass.css:171-173`: 20px/13rem/7rem). Landed pre-tag at `24b63d01` (mint) → `189ae15c` (halo)
  → `71892b9e` (test) — commits verified in history.
- Codex authority: `../ios27/IOS27-CODEX.md` law 1 + the "true gradient blur across a single panel"
  BEST-iOS-27 aim.

**POST-MORTEM (the freeze, not a build gap).** The experiment the user asked for was BUILT and
matches the reference's shape — but it was frozen into the 7.0.0 major with its adopt-or-decline
explicitly UNRESOLVED, against the wave's own warning that an experimental public API cannot be
frozen into an immutable major half-baked. So the library ships a graded backdrop nobody ruled on;
the default flat scrim remains the heavy F48 slab; the graded pool is opt-in and unratified.

**REDRESS.** Owned EXACTLY by `BJ.W-GRADED-BACKDROP-JUDGE` (BAND-MATERIAL W3,
`../../waves/BAND-MATERIAL.md:340+` — re-pinned RU-14 R5; OPEN-2a/2b/2c survive at `:333-335`,
OPEN-3a at `:458`) — a judgment wave with a forced verdict. The RED is the
unresolved-freeze state itself; GREEN is a recorded **ADOPT** (keep the cohort; collapse the
`graded-backdrop.test.ts` literals to relationships with BAND-GATES W1) or **DECLINE** (strip
`--glass-halo-*` + FORM-2 + `isGraded` + the test; route the residual flat scrim to
`BI.W-IMMERSIVE-SCRIM`) — never a "decide later" float. The load-bearing π obligation IS the
F49/F50 reference comparison (Safari + Chrome, side-by-side with the stills) — **LIVE-DEFER** from
this seat. OPEN-3a is the band's most load-bearing OPEN; `CHRONIC-ADJUDICATION.md:22-25` ruling 4
confirms the freeze compresses entirely into this adopt-or-decline. Post-JUDGE the wave also
carries deliverable (b), the C-F/T2 scene-staging extraction — UNCONDITIONAL on the verdict, not
F50-specific. Coverage: **EXACT (as a reference + experiment)**.

**STATUS CHECK.** Crosswalk flag: **LANDED** (`crosswalk:72`, `BJ.W-GRADED-BACKDROP-JUDGE
(adopt-or-retire, OPEN-3a)`). **AGREE.**

---

## Coverage summary

| Row | ask (compressed) | terminal owner | coverage | delta count |
|-----|------------------|----------------|----------|-------------|
| F41 | text-motion npm-install string | `BJ.W-STORY-COPY-CANON` (G-COPY-LINT; AMEND-D-6 pins `typewriter.vue:103`) + no-wrap rider | **EXACT** | 0 |
| F42 | scroll vs other scrolling items | `ASK §C3` (reveal/scroll consolidation; C-D re-anchored to the RU-09 census) | **EXACT (decision)** | 0 |
| F43 | auth-shell putrid + own category | `G-COPY-3` (credentials, LANDED) + `ASK §D1` (prune; palette judged at CURRENT state) | **EXACT** | 0 |
| F44 | settings overfit nonsense | `ASK §D1` + `BAND-REDUCTION W3` (prune; dead-knob fix mandatory if kept) | **EXACT (decision)** | 0 |
| F45 | gate-pattern rounding + prune | `ASK §D1` (prune) + `BJ.W-RADIUS-ROLE` regression-guard (J5 applied) | **EXACT (as amended)** | 0 (1 consumed) |
| F46 | intro double-card; blank; slow | `BJ.W-PREVIEW-CARD` (G-PRV-4/AMEND-D-5 + G-PRV-2/AMEND-D-4; perf→fam E) | **EXACT** | 0 |
| F47 | dock occlusion + auto-scroll; greenfield | `GF-DOCK` W1 (census/evidence) + W2 (JS-spring detent, no CSS snap) + W3 (tap-to-reach) + W5 (chrome delete) — RU-14 re-map | **EXACT** | 0 |
| F48 | hierarchy/blur/rounding app-wide | `BJ.W-RADIUS-ROLE` (guard) + `BJ.W-BLUR-LADDER` + `BJ.W-GRADED-BACKDROP-JUDGE` | **EXACT** | 0 |
| F49 | OpenAI subtle-blur reference | `BJ.W-BLUR-LADDER` (OPEN-2c π target) + `BJ.W-GRADED-BACKDROP-JUDGE` (π reference) | **EXACT (reference)** | 0 |
| F50 | gradient-blur-behind; experiment+judge | `BJ.W-GRADED-BACKDROP-JUDGE` (adopt/decline, OPEN-3a) | **EXACT (reference)** | 0 |

**Totals: EXACT 10 / PARTIAL 0 / MISSING 0** (F42/F44 as EXACT-decision; F49/F50 as
EXACT-reference; F45 as EXACT-as-amended). Open delta count: **0**.

LIVE-DEFER register (paint questions this seat could not settle statically): the F45/F48
modal-input coherence π (OPEN-1a class), the F48 further-subtler judgment (OPEN-2c), the F49/F50
halo-vs-reference comparison (OPEN-3a), the F43 per-theme aurora render, the F47 boundary-fade
behavior at scroll extremes.

## Consumed deltas

**Δ-F45-1 — CONSUMED (adopted as `JUDGE.md` J5, applied to `BAND-MATERIAL` W1).** The prior
artifact proposed re-aiming W1's F45 probe from born-RED sweep to a regression-guard over the
landed concentric-field rule (`field-control.css:37-48` — the comment+selector span; the band
pins the selector alone at `:47-49`, the same rule at two grains). The judge adopted it (J5:
"F45 joins the F09/F12/F17 conversion class", `JUDGE.md:38`) and the committed union carries the
application re-expressed (`../../waves/BAND-MATERIAL.md:146-149`, re-pinned RU-14 R5 — the J5
class is now "F12 + F45 + F48-rounding — REGRESSION-GUARDS (J5 class, re-proven)", with F17
flipped out to born-RED at `:135`/`:52`/`:160`; do not re-import the stale F09/F12/F17 class
from the ruling text). Nothing remains to append; the residual paint-taste ruling (soft-rect
input beside pill CTA — match or keep-distinct) rides the wave's OPEN-1a live-π.
