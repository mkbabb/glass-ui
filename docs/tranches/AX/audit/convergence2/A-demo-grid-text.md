# A-demo-grid-text — Speedtest grid idiom (P8) + story-text de-superfluity (P10)

**Lane** A (audit) · **Severity** major · **Defects** P8 + P10 (pass-2 ledger §P) ·
**Verdict** augment-existing-wave (**W18** for the demo-IA/chassis content half) +
net-new gate clause for the P10 tranche-code sweep · **HEAD** 5cf2980 (3.8.0+W52)

---

## Scope recap

- **P8** — "Each page should use the speedtest GRID idiom when befitting — more paper + glass-like."
- **P10** — "Each story page: interspersed explanatory text, NO superfluity. Most extant text is duplicative or code that must be removed."

Cross-ref anchors named by the ledger (line 69): **W18** (IA), W19/W21 (prunes), **W40** (demo shell).
The pass-2 dedup discipline: verify each anchor is sufficient / augment / net-new.

---

## Findings at SOURCE

### The speedtest grid idiom is ALREADY a shipped library primitive triad (P8)

The "speedtest grid" is not a recipe to re-discover — it is three EXPORTED glass-ui
primitives promoted FROM speedtest, each carrying the paper+glass surface the user wants:

1. **`MetricCell`** (`src/components/custom/metric-cell/MetricCell.vue`, subpath `/metric-cell`).
   The 4-card `download/upload/ping/jitter` grid tile. Owns `glass-wash rounded-lg p-3`
   (the wash-tier glass surface) + icon-on-label + stacked value/unit + `tabular-nums`.
   `appearance="dashboard"|"compact"|"bare"`. Promoted from speedtest's `ResultDetailSheet`
   4-card grid (the 11-class string repeated 4×).
2. **`MetricStack`/`MetricRow`** (`src/components/custom/metric-stack/`, subpath `/metric-stack`).
   The 3-column subgrid (`icon | label | value`) container-query stack, `register="result"`
   compact ledger vs `"audacious"` poster. Promoted from speedtest's `ResultStack.vue`.
3. The speedtest dashboard's own grid recipe (`../speedtest/src/components/dashboard/StatsCards.vue`):
   `<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">` of `<Card tier="wash">` tiles —
   the "paper + glass-like" 2→4 responsive metric grid the user is pointing at. The
   glass-ui-side equivalent is `MetricCell` in a `grid grid-cols-2 sm:grid-cols-4 gap-3`.

**The opportunity is consumption, not invention.** A repo-wide grep shows only **2** demo
story pages reference `MetricCell`/`MetricStack`/`MetricRow` at all
(`primitives/metric-pill.vue` + one composition) — the grid idiom is essentially unused in
the storybook even though it ships. Many pages that present sets of metrics/tokens/values
hand-roll bespoke `flex flex-wrap` chip rows or ad-hoc swatch grids instead of the shipped
`MetricCell`/`<Card tier="wash">` grid. The "befitting" pages (per the user's "when
befitting" qualifier — NOT every page) are the metric/data/token-tour surfaces:
`foundations/colors`, `foundations/shadows`, `foundations/surface-tints`,
`foundations/dock-active-tokens` (W06 deletes), `primitives/metric-badge`,
`primitives/metric-pill`, `compositions/dashboard`, `compositions/instrument-chassis`,
and the substrate token-tours — where a uniform paper+glass metric grid replaces the
hand-rolled swatch/chip layout.

**Overfitting bar: CLEARED.** `MetricCell` (≥4 speedtest sites + exported subpath) and
`MetricStack` (exported subpath) are already ≥2-consumer exported primitives. Adopting them
in the demo ADDS consumers; it mints nothing. The `<Card tier="wash">` grid is a plain
composition of shipped `Card` — no new chassis. NO new primitive is warranted (the
`StorySection`/`ShowcaseFrame` chassis already host the section frame; the metric grid is
just `MetricCell` children inside a `StorySection`).

### Story-text bloat is pervasive AND leaks internal tranche-history (P10)

Two distinct P10 problems, both real at source:

**(a) Structural duplication — the raw `flex flex-col gap-4` + `<h2 text-subheading>` +
`<p text-small text-muted-foreground>` triplet, un-migrated.** `StorySection` exists
precisely to collapse this (its own header doc: "129 hosts ship the `flex flex-col gap-3`
wrapper; 104 ship the section-label paragraph"). Adoption is partial — 60/144 pages use
`StorySection`, 43/144 use `ShowcaseFrame`. The un-migrated pages hand-roll the wrapper +
heading + blurb verbatim. Witness `demo/stories/primitives/buttons.vue`: **16** raw
`<section class="flex flex-col gap-4">` blocks, ZERO `StorySection`, each repeating
`<h2 class="text-subheading">` + a muted `<p>`. Same shape in `primitives/inputs.vue` (12),
`primitives/card.vue` (12). This is the "duplicative" text the user flags.

**(b) Internal tranche-codes leak into USER-FACING demo prose — the "code that must be
removed" superfluity, AND a greenfield-no-meta precept violation.** **46 of 144** story
pages reference internal tranche-letter codes in their explanatory text/blurbs/comments.
Concrete witnesses (live prose, not import comments):

- `primitives/buttons.vue:46` — "The **K.W6** HEADLINE variant. Disco-grain…"
- `primitives/buttons.vue:63` — "**AN.R0 D9** — primary-CTA with gold sweep…"
- `compositions/dock-with-slider.vue:124-125` — blurb names "the keepDockOpen hold
  (**AW.W3**)" + "the **AW.W3** proof story — `proof:dock-layering-polish`…"
- `compositions/form-validation.vue:116,120` — "glass-ui primitive at **AQ.W4** — the
  binary-consumer bar (muster J…", "muster J adopts it… (see **AQ.W1.2 §W4.7**)."
- `navigation/dock.vue:76` — "**AW.W3** — the collapsed pill scales up…"
- `navigation/glass-carousel.vue:112` — "**K.W5** — `grid` tracks default to `auto`…"
- `feedback/alert.vue:40` — "**AW.W25** — the semantic tones now ride…"
- `containers/native-top-layer.vue:41` — "Each **AQ.W6** native path is feature-detected…"

These are internal development-history references (tranche/wave/defect codes,
`proof:*` gate names, "muster J", "binary-consumer bar") in text a demo VISITOR reads.
Per the **greenfield-no-meta** precept (no "ported from", no version history, no
migration/tranche language in any artifact) and the **writing-style** precept (no
editorializing, no over-punctuation), these are forbidden. The demo prose should be
the WHAT/WHY of the component for a consumer — not a changelog. This is precisely the
"most extant text is duplicative or code that must be removed" the user named.

**(c) No gate guards demo prose.** `proof:no-legacy-commentary`
(`scripts/proof-no-legacy-commentary.mjs:31`) scopes ONLY
`TARGETS = ["src/api/index.ts", "src/index.ts"]` — it catches `\b[A-Z]{1,2}\.W\d`
tranche-codes in the two production barrels but NEVER scans `demo/stories/`. The 46
demo pages of tranche-code prose are unguarded — there is no born-RED falsifier today,
so the de-superfluity sweep needs one.

Note: `manifest.ts` story `blurb:` strings are CLEAN (0 tranche-code hits) — the bloat
is entirely in the per-SFC `<p>` prose + `<!-- comments -->`, NOT the IA manifest.

---

## DEDUP — verifying the named anchors

### W18 (storybook IA reinvention) — AUGMENT (the content half)

W18 owns the IA category TREE (categories, blob-trio fold to one row, first-class `dock`
category, `proof:storybook-ia` re-baseline). It explicitly mandates that content authored
under it rides "the SHIPPED `StoryPage` + `<StorySection>` + `<ShowcaseFrame>` chassis —
no new chassis" (Scope §5/§6). BUT W18's content scope is NARROW — only the blob-fold SFC
merge + the dock-category rows. **W18 does NOT cover (i) the demo-wide P8 grid-idiom
adoption (`MetricCell`/`<Card tier="wash">` grid on the befitting metric/token pages), nor
(ii) the demo-wide P10 sweep** — neither the `StorySection`/`ShowcaseFrame` migration of
the un-migrated 84 pages nor the tranche-code-in-prose strike. W18's verbatim mandate is
"frame the SURVIVING set / re-baseline the fixture", not "re-author every page's body".

**Augment W18** with two clauses: (1) a P8 clause — on the metric/data/token-tour pages,
adopt the speedtest grid (`MetricCell` in a `grid grid-cols-2 sm:grid-cols-4 gap-3`, OR
`<Card tier="wash">` tiles) inside `StorySection`, replacing hand-rolled swatch/chip rows
where the content IS a set of labeled metrics/values; (2) a P10 clause — finish the
`StorySection`/`ShowcaseFrame` migration on the 84 un-migrated pages AND strike every
tranche-code/`proof:*`/"muster J" reference from demo prose, rewriting each blurb to
consumer-facing WHAT/WHY. The W18 π-lane live-audit already gates every row's SFC, so the
re-authored bodies validate on the same lane.

### W40 (demo-shell dock-nav re-audit) — NOT the owner

W40 scopes the demo SHELL (`demo/layout/AppShell.vue`/`SidebarDock.vue`/`BottomDock.vue`/
`dock-nav.css`) + 5 unwired gates — explicitly "distinct from the per-story SFCs under
`demo/stories/`" (its own gloss). Zero P8/P10/grid/story-text mentions. W40 is the wrong
home; the per-story BODY work belongs with W18 (IA content) not W40 (shell nav).

### A new gate clause — the P10 falsifier (folds into W18 OR W33 close)

No gate guards `demo/stories/` prose. The cleanest fix EXTENDS `proof:no-legacy-commentary`
to add `demo/stories/**` to its scan roots (born-RED at HEAD: 46 pages hit), so the
tranche-code strike has a falsifiable close. This is a one-clause gate extension, not a new
gate — fold the gate-scope-extension into W18's re-baseline step (it re-touches the
storybook gates anyway), or into the W33 gate-fleet close if W18 stays content-only.

---

## Disposition

- **P8** → augment **W18** content scope: adopt the shipped `MetricCell`/`<Card tier="wash">`
  grid (the speedtest paper+glass idiom) on the befitting metric/data/token-tour pages,
  inside `StorySection`. NO new primitive (the grid triad already ships + clears the
  overfitting bar). NOT W40.
- **P10** → augment **W18** content scope: finish `StorySection`/`ShowcaseFrame` migration on
  the 84 un-migrated pages + strike all 46 pages' tranche-code/`proof:*`/muster prose,
  rewriting to consumer-facing WHAT/WHY (greenfield-no-meta). Add the falsifier by extending
  `proof:no-legacy-commentary` scan roots to `demo/stories/**` (born-RED: 46 hits) — fold the
  gate clause into W18's gate-re-baseline step (or W33 close).
- **needs-user-decision (minor):** the "befitting" set for P8 is a judgment call — confirm
  the metric/token-tour pages list vs leaving non-metric pages on plain `StorySection`. The
  user's "when befitting" already signals this is selective, not blanket.

NO new wave. The grid idiom is a shipped exported triad; the section frame is shipped
chassis; the text sweep is editorial + a one-clause gate extension — all land cleanly as
W18 content-scope augments.
