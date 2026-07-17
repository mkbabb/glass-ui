# BJ Band — the story meta-framework reformation (registry family D)

**Status:** DRAFT — awaiting the Fable two-challenge pass
**Registry family:** D (story meta-framework + copy canon) · REGISTRY.md:87-106
**Verdict (lead):** "the root chassis IS standardized (100 routes through StoryPage) but per-type
variants are 6 parallel unnamed wrappers + 23 bespoke-CSS pages; copy leaks internals; the width
token is an undefined no-op; hero hierarchy is inverted by hardcodes." (REGISTRY.md:88-90)
**Mode:** TRANCHE DEVELOPMENT — this band DEVELOPS the spec only. The waves below, when executed,
edit `demo/` chassis + story SFCs and a small `src/` seam (StorySection, Configurator standard).
Every visual claim carries a π/DELTA obligation; no wave lands on a green-headless / broken-paint
gap (feedback_live_verify_capture).
**HEAD pin (verified on disk):** `git describe = v6.0.0-62-g65c28be1`, `package.json` version
`7.0.0` (untagged). Every born-RED probe below was run at this HEAD.
**Sources:** round-1/story-page-structure-census.md (the 7-type taxonomy, `--story-article-w`
noop, heroScale dead data, studio fork, StoryBody 3/88); round-2/typography-audit-* (mono-caption
65/128, flat hierarchy); FEEDBACK-LEDGER F01/F02/F03/F05/F09/F10/F11/F13/F14/F29/F31/F40/F41/F46,
A06; VISUAL-GESTALT families 2/3/7; ios27/IOS27-CODEX.md law 10.

---

## Band charter — six waves, one owner per file

The story meta-framework is ONE thing (A06: "codify + standardize every story page"). It is split
into six waves by CONCERN, not by whim, and each shipped file has exactly one owning wave so no two
waves edit the same file (the BAND-DOC-TRUTH no-re-drift discipline, applied here to paint surface):

| # | wave | owns (exclusive) | one-line |
| --- | --- | --- | --- |
| 1 | **BJ.W-STORY-TAXONOMY** | `manifest.ts` (the `pageType` field + registry data), `StoryPage.vue` (variant dispatch), the wrapper fold (VizStudio/DockStage/FamilyTabs → named variants) | name the 7 page types; put the variant on the manifest; retire the ad-hoc wrappers |
| 2 | **BJ.W-STORY-COPY-CANON** | `demo/stories/**` prose + labels, `auth-shell.vue` credentials, the `text-mono-caption`/`text-admin-label` decorations (demo call-sites) | kill the meta-caption / jargon class; ban fake credentials; reserve the mono eyebrow to ONE role |
| 3 | **BJ.W-CONFIGURATOR-STD** | `src/components/configurator/*`, `StorySection.vue` heading-level axis, the springs/curve-gallery configurator adoption | the configurator standard: larger, card-radius, inset grouped list, hierarchy from the type ladder |
| 4 | **BJ.W-WIDTH-HIERARCHY-TRUTH** | `story-hero.css` (`--story-article-w`), `SectionLanding.vue`/`CatalogLanding.vue` (hero-scale binding), the StoryHero↔VizStudio h1/h2 dedup | define the width token; bind hero-scale to the manifest; dedup the duplicate headings |
| 5 | **BJ.W-PREVIEW-CARD** | `SectionPreviewCard.vue`, the landing grid (masonry), the live-miniature render | expressive masonry cards with LIVE miniatures; above-fold content-visibility exemption (layout half here) |
| 6 | **BJ.W-RESPONSIVE-AUDIT (F14)** | the per-page responsive/mobile-first audit table + the flagged fixes it enumerates | dogfood our own components for horizontal-desktop + mobile-first across ALL pages |

**Cross-wave dependency (the one entanglement, flagged):** waves 1 and 4 both touch the
width/scale story-chassis. The clean split: **Wave 1 lands the variant registry FIRST**; Wave 4
then binds width + hero-scale as PER-VARIANT config INSIDE that registry (so the "truth" becomes a
property of the named variant, not a scattered hardcode). See **OPEN-D1** for the merge order.

**Boundaries — what this band does NOT own (reference, do not duplicate):**

- **Transitions/motion (F05/F06/F07):** story-page + dock-page transition choreography and the
  "why no background aurora" ask belong to **family E/G motion** (REGISTRY.md:99-100, 116). This
  band REFERENCES the entry/stagger contract (IOS27-CODEX law 8) so variants declare their entry,
  but the shared motion primitive is specced there.
- **The perf half of the preview-card defect (F01 stutter / F02 blank / A17):** the eager-mount
  and content-visibility-deferred-paint mechanisms are **family E** (REGISTRY.md:108-120). Wave 5
  owns the LAYOUT + the above-fold content-visibility EXEMPTION contract; family E owns the boot
  graph and the deferred-paint trace gate.
- **The radius / blur / type TOKEN system (F09 radius, F48 blur, F15 scale enforceability):** the
  role-keyed radius scale, the blur ladder, and the √φ default-ramp reset are **family F**
  (REGISTRY.md:122-138). Wave 3 CONSUMES those tokens for the configurator standard; it does not
  mint them. Wave 2 consumes the type-ladder cure; family F's typography lens is its census.
- **The component reduction (F16 timeline, F18 metric/chassis, F26/F30/F32/F33/F44 prune):**
  **family C** (REGISTRY.md:66-85). This band restructures the STORY meta-framework, not the
  component roster; where a story page renders a to-be-removed component, the reduction wave prunes
  the component and the story adopts via a marked addendum (feedback_consumer_updates_ruling).

---

## BJ.W-STORY-TAXONOMY — the page-type taxonomy + manifest variant registry

### Mission

Give the standardized StoryPage chassis a real per-type variant axis. Today StoryPage carries the
single boolean-derived `hero | page` variant and the actual per-type behavior is scattered across
≥6 parallel wrappers with no page-type discriminant, so no registry maps page-type → layout
(story-page-structure-census.md:9-15). Add a `pageType` field to the manifest `Story` and a
StoryPage variant registry keyed by it — the 7 clean types the census supports:
**`spec | studio | dock | family | scene | landing | doc`** (census:5,15) — folding
VizStudio/DockStage/FamilyTabs from ad-hoc sibling wrappers into named, registered variants. One
root, one variant axis, a table you can read. (**`scene` is CONTINGENT on the compositions ruling —
OPEN-D9 / `ASK-REDUCTION` D1; the taxonomy is 6 types if the `compositions/` section prunes, 7 if
any composition page survives as a legit `scene`.**)

### Exact scope

**In:**

| target | today (born-RED) | the reform |
| --- | --- | --- |
| `demo/stories/manifest.ts` `Story` type | no `pageType` field exists (grep `pageType` → 0 hits) | add a `pageType` discriminant with the 7-value union; default `spec` (the dominant hand-authored type) |
| `demo/chassis/page/StoryPage.vue:32` | `const variant = computed<"hero" \| "page">` — the ONLY variant axis | dispatch on `story.pageType` through a variant registry; `hero` becomes a per-variant property, not the axis |
| `demo/stories/substrates/_frame/VizStudio.vue` | a standalone shared wrapper (studio idiom) invoked ad-hoc by aurora/blob/fourier | register as the `studio` variant; its stage-left/controls-right anatomy becomes the variant's layout |
| `demo/stories/dock/_frame/DockStage.vue` | a standalone backdrop-column wrapper used by 7/8 dock routes (census:13) | register as the `dock` variant |
| `demo/chassis/family/FamilyTabs.vue` + `story-nested.ts` | a standalone family switcher over 7 routes (census:13) | register as the `family` variant |

> **liquid-grid DROPPED from the fold roster (adjudicated — DELETE wins, RULING 1 / CHALLENGE-2
> cross-band).** `liquid-grid` has zero external + zero library consumers; `BAND-REDUCTION` W3 DELETES
> the component + its `./liquid-grid` export + its `demo/stories/substrates/liquid-grid.vue` story page
> outright (no fold, no normalize). This wave does NOT route it through the `studio` variant — there is
> nothing to normalize. The taxonomy still proves out on `studio` via aurora/blob/fourier.

**Out (explicit non-goals):**

- The ~23 bespoke `<style>` blocks on route SFCs (motion/deck.vue 227 lines etc, census:13) are
  NOT bulk-migrated here — the taxonomy names the types; per-page bespoke-CSS removal rides the
  page's own reduction/redesign wave. This wave proves the registry works on the 3 wrapper types
  (VizStudio/DockStage/FamilyTabs — liquid-grid is DELETED by `BAND-REDUCTION` W3, not folded).
- StoryBody (`:body=`) adoption/expansion is NOT this wave — see **OPEN-D2** (retire-or-expand at
  3/88 is a family-C overfit question, census:49-55).
- Width, hero-scale, and heading-dedup are **Wave 4** (they become per-variant config the registry
  reads; keeping them out here is the file-ownership split).
- Transition choreography per variant is REFERENCED from family E/G, not authored here.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-TAX-1 | `grep -c "pageType" demo/stories/manifest.ts` → **0** (no page-type discriminant) | every `Story` carries a `pageType ∈ {spec,studio,dock,family,scene,landing,doc}`; a registry maps each to a variant |
| G-TAX-2 | `grep -n 'computed<"hero" \| "page">' demo/chassis/page/StoryPage.vue` → **:32** (single axis) | StoryPage dispatches on `pageType`; `hero` is a variant property, not the axis |
| ~~G-TAX-3~~ (RETIRED) | liquid-grid is DELETED by `BAND-REDUCTION` W3 (zero consumers, RULING 1) — there is no fork to route through the `studio` variant; the gate is moot | n/a — the `studio` variant proves out on aurora/blob/fourier |
| G-TAX-4 | VizStudio/DockStage/FamilyTabs are invoked as bare components, not registered variants (no registry file maps type→wrapper) | the three wrappers are reachable ONLY through the variant registry keyed by `pageType` |

### π / DELTA obligation

**Required — structural refactor with paint-parity claim.** The taxonomy fold must be visually
INERT on already-correct pages: capture a paired-π + before/after DELTA screenshot on one route per
folded type (a studio page e.g. `/substrates/aurora`, a dock page, a family page) proving the
registered variant renders byte-identically to the ad-hoc wrapper it replaces. Any unintended visual
delta is a regression, not a fold. (liquid-grid is NOT in this roster — `BAND-REDUCTION` W3 deletes it.)

### KISS / parsimony (gestalt, not patchwork)

- The registry is a DATA table (`pageType → variant component + config`), not a switch tree that
  grows a branch per page. Fewest lines: one map, one `<component :is>` dispatch.
- Do NOT invent an 8th type to house an awkward page; if a page fits none of the 7, that is a
  signal the page is bespoke/overfit (route it to family C), not a reason to grow the taxonomy.
- No legacy: the `hero | page` boolean axis is DELETED, not kept alongside `pageType` as a shim
  (feedback_no_backwards_compat).

### Non-goals

No copy edits (Wave 2). No width/scale/heading edits (Wave 4). No per-page bespoke-CSS purge. No
new component surface in `src/`.

---

## BJ.W-STORY-COPY-CANON — kill the meta-caption / jargon class

### Mission

Codify what a story page MAY say, and strip everything it may not. Story copy today is written for
the tranche auditor, not the library user (VISUAL-GESTALT family 2, :18-28): a mono ALL-CAPS
section-caption idiom saturates 65/128 pages, internal implementation prose ships as user-facing
blurbs, and one composition invents fake enterprise credentials. IOS27-CODEX law 10 is the
authority: "bold hero ≫ semibold row title ≫ grey secondary ≫ caption, ONE accent color … NO mono
ALL-CAPS jargon anywhere in iOS" (IOS27-CODEX.md:48-51). Establish the copy canon; kill the class.

### Exact scope

**In — the copy canon (a new short precept the pages conform to):**

1. **What a page MAY say:** a plain-language title, a one-line human descriptor of what the
   component IS and when to reach for it, and the interactive demo. No implementation mechanics
   ("aria-hidden SVG overlay", "stroke-dashoffset sweep · clip-path wipe", "reactive query",
   "@property motion tokens", "SE-guard") in user-facing copy.
2. **The meta-caption kill (F03/F40/F41):** strip internal-mechanics blurbs. Verified live sites:
   `demo/stories/motion/handmark.vue:26` ("the mark is an aria-hidden SVG overlay. The PEN default
   is grain:0"), `:67` ("a stroke-dashoffset sweep for clean ink, a clip-path wipe for grained
   ink"), `:119-120` ("box-mode hull · the se-guard (never a vanish)" — F40's "what is SE"),
   `demo/stories/data/search.vue:492` ("The rail and overlay share one reactive query, while one
   polite atomic status announces…"), `demo/stories/manifest.ts:932` (the completion-seal
   stroke-dashoffset/@property mechanics dump — F03). F41's "npm install bit" on
   `/motion/text-motion` (screenshot `feedback/F41-text-motion-npm-install.png`) — locate + remove
   at execution (see **OPEN-D3**).
3. **The mono-eyebrow reserved to ONE role:** the mono ALL-CAPS caption idiom is
   `text-mono-caption` ×126 + `section-label` ×31 + `text-admin-label` ×57 across 65/128 story
   pages (typography-audit; confirmed on disk). Reserve it to the SINGLE structural
   `StorySection.label` breadcrumb (injected at `StorySection.vue:29`) and strip the ad-hoc
   decorations from story bodies; pages get hierarchy from SIZE (Wave 3's ladder), not a monospace
   caps stamp.
4. **The fake-credentials ban (F43):** `demo/stories/compositions/auth-shell.vue:39-41` ships
   "SOC 2 Type II" / "End-to-end encrypted" / "Trusted by 12k teams" — fabricated marketing claims
   in a library demo (VISUAL-GESTALT:26). Replace with honest neutral placeholder copy or delete
   the trust-badge row; NEVER ship a fake credential.

**Out:**

- The `text-mono-caption` / `text-admin-label` @utility DEFINITIONS (`src/styles/typography/`) are
  NOT retired here — killing the def silently strands 224 refs (typography-audit-round-2b:22, the
  stale-class no-op lesson). This wave sweeps the DEMO call-sites; the def disposition (keep for
  the one reserved role, or retire) is coordinated with family F's typography wave. **OPEN-D4.**
- The auth-shell "why does this have its own category" question (F43) is a family-C prune
  decision; this wave only fixes the CREDENTIALS, not the composition's existence.
- StorySection's heading-LEVEL axis (the size-ladder hierarchy that REPLACES the stripped eyebrows)
  is **Wave 3** — this wave removes the meta-captions; Wave 3 supplies the ladder that fills the gap.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-COPY-1 | `grep -rlE 'text-mono-caption\|section-label\|text-admin-label' demo/stories/ \| wc -l` → **65** (of 128) | ad-hoc eyebrow decorations gone; the idiom survives ONLY via the one reserved `StorySection.label` breadcrumb |
| G-COPY-2 | `grep -nE 'aria-hidden SVG overlay\|stroke-dashoffset sweep\|se-guard\|reactive query' demo/stories/motion/handmark.vue demo/stories/data/search.vue` → matches at handmark:26/67/119-120, search:492 | 0 implementation-mechanics phrases in user-facing blurbs (the copy-canon allow-list check) |
| G-COPY-3 | `grep -nE 'SOC 2\|End-to-end encrypted\|12k teams' demo/stories/compositions/auth-shell.vue` → **:39-41** | 0 fabricated-credential strings anywhere in `demo/stories/` |
| G-COPY-4 | `grep -n 'se-guard\|box-mode hull' demo/stories/motion/handmark.vue` → :117/119/120 (F40 "what is SE") | 0 internal jargon acronyms in labels/blurbs |

### π / DELTA obligation

**Required.** Stripping eyebrows + rewriting copy changes the rendered page. Capture before/after
DELTA on the heaviest offenders (`/substrates/glass-material` ×11 mono-captions,
`/foundations/css-utilities` ×8, `/motion/springs`, `/compositions/auth-shell`) proving hierarchy
now reads from size (paired with Wave 3) and no fake credential renders. The eyebrow-union
consistency gate (`tests-visual/eyebrow-union.spec.ts`) must still pass on the ONE reserved role.

### KISS / parsimony

- The canon is a SHORT allow-list ("a page may say: name, one-line purpose, demo"), not a style
  guide. Enforce it as a grep-able ban-list of mechanics phrases + the eyebrow-count gate.
- No re-writing blurbs into different jargon; delete the mechanics sentence, keep the human one.
- Levity survives — plain and honest is not the same as dry; the copy stays lively, just not
  internal (feedback_writing_style).

### Non-goals

No @utility def edits (family F coordination). No component prune (family C). No hierarchy-ladder
authoring (Wave 3). No transition copy.

---

## BJ.W-CONFIGURATOR-STD — the configurator standard

### Mission

One configurator anatomy across every configurator page: larger, card-rounded (not an ovoid),
inset grouped-list sections, and a hierarchy that comes from the type ladder — not from equal-weight
labels or a mono caps stamp. The feedback names four defects on this one component-in-context:
over-rounded + cramped (F09), flat header/field hierarchy (F10), a gap where an inset grouped list
should read as one (F11), and pages that need configurator support they don't have (F29 springs,
F31 curve-gallery). The typography audit proves F10 mechanically: `StorySection.vue:32` hardcodes
EVERY heading to `text-subheading` (the smallest rung), so 283 sections collapse to two levels
(typography-audit-round-2b:26-31).

### Exact scope

**In:**

| target | today (born-RED) | the reform |
| --- | --- | --- |
| the configurator container radius (F09) | `src/components/configurator/styles.css` already carries a concentric card-radius relay (`border-radius: max(floor, ctx − inset)`, :109-112) — F09 may be PARTLY remediated since the feedback | verify the resting radius reads as a CARD not an ovoid at every mount site; codify the card-radius as the standard. **See OPEN-D5** (confirm F09 live-state before writing the born-RED value). |
| the section grouping (F11) | `--configurator-section-gap: 0.5rem` (styles.css:25) puts a gap BETWEEN section cards | rule: sibling rows within a group read as one INSET grouped-list (no inter-row gap); the gap is BETWEEN groups only (iOS grouped-list grammar, IOS27-CODEX law 4) |
| the header/field hierarchy (F10) | `StorySection.vue:32` `<h2 class="text-subheading">` for all headings — the flattening mechanism | give StorySection (and the configurator layer/row) a LEVEL axis mapping to the ladder: section title → `text-heading`, field label → `text-small`, value → `text-body`; weight from SIZE |
| springs configurator support (F29) | `grep -c "Configurator" demo/stories/motion/springs.vue` → **0** | springs page adopts the configurator standard (the `studio` variant from Wave 1) |
| curve-gallery modularization (F31) | `/motion/curve-gallery` bottom void + un-modular easing-curve component (F31) | the easing-curve component is modularized + the page adopts the configurator standard; the void closes |

**Out:**

- The radius TOKENS themselves (the role-keyed `control/field/card/sheet` scale + the enforcement
  gate) are **family F** (REGISTRY.md:135-138). Wave 3 CONSUMES `--radius-card` etc; it does not
  mint the scale or its lint.
- The type-scale ENFORCEABILITY (the `--text-*: initial` reset, the default-ramp codemod) is
  **family F** (typography-audit:15). Wave 3 uses the named rungs; it does not clear the Tailwind
  default ramp.
- The Configurator component's own SURFACE reduction (dead knobs, single-consumer flags) is
  **family C** (surface:demo-device-shipped-as-component, REGISTRY.md:73). Wave 3 standardizes the
  in-story USE; family C decides the API.
- Engagement/expression on the configurator controls (A01/A11 breath-of-life) is family G's
  ENGAGE-AFFORD; referenced, not authored here.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-CFG-1 (F29) | `grep -c "Configurator\|VizStudio" demo/stories/motion/springs.vue` → **0** | springs renders the configurator standard (studio variant); paired-π DELTA shows the configurator present |
| G-CFG-2 (F10) | `grep -n 'text-subheading' demo/chassis/section/StorySection.vue` → **:32** (all headings one rung) | StorySection/configurator carry a level axis; a page shows ≥3 distinct ladder rungs (title/heading/subheading), not two |
| G-CFG-3 (F11) | `grep -n 'configurator-section-gap' src/components/configurator/styles.css` → :25 (gap applied per-section) | inter-ROW gap = 0 within a group; the gap is BETWEEN groups; DELTA shows one inset grouped list |
| G-CFG-4 (F09) | **OPEN-D5**: confirm the resting container radius live-reads as ovoid vs card before pinning the RED value; the concentric relay at styles.css:109 suggests partial remediation | container resting radius = card grammar at every mount site (π DELTA vs the F09 screenshot) |
| G-CFG-5 (F31) | `/motion/curve-gallery` renders the un-modular easing component + bottom void (screenshot F31) | curve-gallery adopts the standard; easing-curve is a modular component; 0 dead bottom void (DELTA) |

### π / DELTA obligation

**Required — this is a visual standard.** Every gate above pairs a born-RED screenshot (F09/F10/
F11/F29/F31 in `feedback/`) with a captured after-DELTA + paired-π on the named route. The "larger
+ card + grouped-list + laddered-hierarchy" claim is meaningless without the DELTA; a headless pass
does not satisfy it (feedback_live_verify_capture).

### KISS / parsimony

- ONE configurator anatomy, expressed once, consumed everywhere via the Wave-1 `studio` variant.
  Do not fork a second configurator for springs/curve-gallery — adopt the standard.
- Hierarchy from the ladder is FEWER tokens, not more: reuse `text-heading/-subheading/-small/-body`
  (family F's ladder), delete the mono-caps crutch (Wave 2 already strips it).
- No new radius token here — consume family F's role scale. No masking fallback: if the card radius
  needs a token family F hasn't shipped, that is a cross-family dependency to flag, not a hardcode.

### Non-goals

No radius-token minting or lint (family F). No configurator API reduction (family C). No default-ramp
reset (family F). No engagement/expression choreography (family G).

---

## BJ.W-WIDTH-HIERARCHY-TRUTH — the width token, the hero-scale binding, the heading dedup

### Mission

Three silent breaks in the story chassis, each a hardcode contradicting declared data. (1) The
dominant page type runs UNCAPPED: its `max-inline-size` references `var(--story-article-w)`, a token
defined NOWHERE, so it computes to `none` (census:17-23). (2) Section-landing heroes render at the
SMALLEST rung despite the manifest declaring them the LARGEST: `heroScale: "hero"` is dead data,
overridden by a hardcoded `hero-scale="4"` (census:25-31). (3) Studio pages render their title
TWICE — StoryHero `<h1>` + VizStudio's StorySection `<h2>`, same string (census:41-47). Make the
declared data true.

### Exact scope

**In:**

| # | target | today (born-RED) | the truth |
| --- | --- | --- | --- |
| W-1 | `demo/chassis/page/StoryPage.vue:51` + `demo/chassis/hero/story-hero.css` | `maxInlineSize: … 'var(--story-article-w)'` referenced at :51; `grep -rn story-article-w src demo` → that ONE ref, **0 definitions, 0 @property** (confirmed) | DEFINE `--story-article-w` (the intended content reading measure) in `story-hero.css`, OR collapse the `page` variant onto `--story-page-max-inline` (72rem, defined at story-hero.css:5). No undefined-token no-op. **See OPEN-D6** (define-vs-collapse). |
| W-2 | `demo/chassis/landing/SectionLanding.vue:28` + `CatalogLanding.vue:18` | both hardcode `hero-scale="4"` while `manifest.ts:300-301` returns `heroScale:"hero", depth:"D1"` ("the largest audacious rung", manifest:133) — dead data + a hierarchy inversion (D1 landing renders SMALLER than its own D2 pages) | bind `hero-scale` to `landing.heroScale` (delete the hardcoded `"4"`). **The "retire the `heroScale` field" branch is STRUCK (AMEND-1):** the field is LIVE at `StoryPage.vue:30→:89` (consumed by hero-variant story pages) — the dead-data defect is landing-scoped ONLY. The sound fix is the data-bind on the two landings, not a field retire. |
| W-3 | StoryHero `<h1>` + `VizStudio.vue:73` `<StorySection :heading>` | studio pages emit the title twice: StoryHero h1 from `story.title` + VizStudio StorySection h2 from `heading="Aurora"` (:122) — same string, two heading levels (census:41-47) | drop the redundant StorySection heading on hero-variant studios, OR suppress the StoryHero title when VizStudio owns the heading. One h1 per page. |
| W-4 | the three divergent width idioms | hero caps at `--story-page-max-inline:72rem` (story-hero.css:5); landings hardcode `max-w-6xl` (SectionLanding:22, CatalogLanding:13); `page` runs uncapped (W-1) — three idioms where one was intended (census:21) | the width becomes PER-VARIANT config on the Wave-1 registry (each `pageType` declares its measure); the three idioms reconcile to the registry's declared widths |

**Out:**

- The variant registry STRUCTURE is Wave 1; this wave supplies the width/scale VALUES the registry
  reads. Land after Wave 1 (**OPEN-D1**).
- The a11y h1/h2 landmark correctness beyond the dedup (the round-2 a11y lens's hero h1/h2 note,
  REGISTRY.md:262) is family K; W-3 fixes the DUPLICATION, family K owns the landmark audit.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-WID-1 | `grep -rn 'story-article-w' src/ demo/` → exactly **1 hit** (StoryPage.vue:51, the reference) with **0 definitions** → computes to `none` | the token is defined (or the ref collapses to `--story-page-max-inline`); `page` articles cap at a real measure |
| G-WID-2 | `grep -n 'hero-scale="4"' demo/chassis/landing/SectionLanding.vue demo/chassis/landing/CatalogLanding.vue` → **:28, :18** while `manifest.ts:300` = `heroScale:"hero"` | 0 hardcoded `hero-scale` literals on landings (bound to `landing.heroScale`); DELTA shows landings out-sizing their pages. (The field-retire branch is STRUCK — AMEND-1; `heroScale` is live at `StoryPage.vue:30→:89`.) |
| G-WID-3 | `grep -n 'heading=' demo/stories/substrates/aurora.vue` → :122 `heading="Aurora"` while the page is `hero:true` (StoryHero also renders "Aurora" as h1) | one `<h1>`-level "Aurora" per studio page (Playwright: `document.querySelectorAll('h1,h2')` shows no duplicate title) |
| G-WID-4 | `grep -rn 'max-w-6xl\|72rem\|story-article-w' demo/chassis/` → three distinct width idioms | width is declared once per variant on the registry; 0 free-floating `max-w-6xl`/undefined-token widths |

### π / DELTA obligation

**Required.** W-1 (uncapped→capped articles) and W-2 (landing hero-scale) are VISIBLE layout
changes — capture before/after DELTA on a `page`-type route (wide article now measured) and a
section landing (hero now the largest rung). W-3 is verified via a DOM heading-count assertion +
DELTA showing a single title.

### KISS / parsimony

- Prefer COLLAPSE over minting where honest: if `--story-article-w` was always meant to equal the
  reading measure, define it ONCE; if the `page` variant should just share the hero cap, collapse
  the ternary (fewer tokens). Do not define a token nobody else reads (OPEN-D6).
- The hero-scale fix is a DELETE (the hardcoded `"4"`) + a data-bind (NOT a field retire — the
  `heroScale` field is live at `StoryPage.vue:30→:89`, AMEND-1) — it removes lines, not adds them.
- No backwards-compat alias for the removed width idioms (feedback_no_backwards_compat).

### Non-goals

No registry structure (Wave 1). No a11y landmark audit (family K). No hero copy edits (Wave 2).

---

## BJ.W-PREVIEW-CARD — the masonry + live-miniature reformation (layout half)

### Mission

Category preview cards are blank slabs. F46 shows 6/8 inner previews EMPTY; F01 shows the
Foundations card mostly vacant beige; the user wants expressive, varied-size, masonry-like cards
with ACTIVE items (VISUAL-GESTALT family 3, :30-35). Today `SectionPreviewCard.vue` renders a
title + blurb over a static `identityTile`, laid out in a fixed 3-column grid — no masonry, no
varied sizes, no live miniature. This wave owns the LAYOUT half (masonry + live miniatures + the
above-fold content-visibility EXEMPTION contract); the PERF half (eager-mount stutter, the
deferred-paint trace gate) is **family E** (REGISTRY.md:108-120).

### Exact scope

**In:**

| target | today (born-RED) | the reform |
| --- | --- | --- |
| the landing grid | `SectionLanding.vue:33` + `CatalogLanding.vue:32`: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3` — a FIXED equal-size 3-col grid, no masonry | expressive masonry / varied-size layout (CSS columns or grid-auto masonry); cards size to content weight |
| `demo/chassis/landing/SectionPreviewCard.vue` | renders title (`text-subheading`) + blurb (`text-small`) over a static `identityTile` — NO live component miniature (the F46 "6/8 empty" mechanism) | render a LIVE miniature of the category's headline component (a real, cheap render), not a blank tile |
| the above-fold content-visibility exemption | `SectionPreviewCard.vue:63-65`: `content-visibility:auto; contain-intrinsic-size:auto 19rem` — the blank-19rem-box mechanism (F02; family E perf:content-visibility-deferred-paint) | above-fold cards are EXEMPT from `content-visibility:auto` so they paint immediately (the LAYOUT contract; family E owns the perf trace gate that proves it) |
| the double-card wrap (F46) | preview card nested inside a category card — the double-wrap that compounds vacancy (VISUAL-GESTALT:35); `/foundations/intro` "wrapped in TWO layers of cards" (F46) | one card, not two; **see OPEN-D7** (confirm the exact double-wrap site — CatalogLanding uses SectionPreviewCard directly at :34; the intro-page double-wrap is a separate mount) |

**Out:**

- The perf mechanisms (eager boot graph ~1.1MB, persistent WebGL shell loop, the RED baseline
  trace) are **family E** — this wave provides the above-fold EXEMPTION contract; family E proves
  the paint-timing gate.
- The live-miniature's own performance (must be cheap: a static frame or a paused viz, not a live
  WebGL loop per card) is a shared constraint with family E — Wave 5 renders CHEAP miniatures;
  family E gates the boot cost. **OPEN-D8.**
- Story-page load stutter beyond the preview cards (F01 "all story pages slow to load") is family E.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-PRV-1 (F01 masonry) | `grep -n 'grid-cols-3\|masonry' demo/chassis/landing/SectionLanding.vue demo/chassis/landing/CatalogLanding.vue` → fixed `grid-cols-1/2/3`, 0 masonry (:33, :32) | masonry / varied-size layout; cards render at ≥2 distinct sizes (DELTA vs F01) |
| G-PRV-2 (F46 live) | `SectionPreviewCard.vue` renders title+blurb+static tile only (no live component miniature — grep the SFC for a rendered category component → none) | each card renders a LIVE miniature of its headline component; 0 blank tiles (DELTA vs F46) |
| G-PRV-3 (F02 above-fold) | `grep -n 'content-visibility' demo/chassis/landing/SectionPreviewCard.vue` → **:63** `auto` applied unconditionally (above-fold cards paint blank) | above-fold cards exempt from `content-visibility:auto`; π/DELTA shows no blank-19rem box on first paint (perf gate = family E) |
| G-PRV-4 (F46 double-card) | the intro/landing double-card wrap renders (OPEN-D7 to pin the exact site) | one card per preview; 0 card-in-card |

### π / DELTA obligation

**Required — this is the most visual wave in the band.** Capture `/foundations` (F02 blank cards),
the catalog home (F01 masonry + live), and `/foundations/intro` (F46 double-card) before/after with
paired-π. The "expressive, varied, live" claim MUST show real miniatures rendering, not a
re-skinned blank. Coordinate the first-paint DELTA with family E's trace so the above-fold exemption
is proven, not asserted.

### KISS / parsimony

- CHEAP live miniatures: a single static frame / paused component instance, NOT a live loop per
  card (a masonry of 30 live WebGL auroras is the perf disease this band must not cause). Fewest
  render cost that reads as "active".
- Masonry via native CSS (columns / grid) — no JS masonry library (no external dep, no legacy).
- One card. Delete the outer wrapper; do not style two cards to hide that there are two.

### Non-goals

No perf boot-graph work (family E). No story-page-wide load fixes (family E). No transition
(family E/G). No live-WebGL-per-card.

---

## BJ.W-RESPONSIVE-AUDIT — F14 as its own cross-cutting mobile-first wave

### Mission

F14 is a first-class wave, not a rider (REGISTRY.md:101-102): "Audit ALL pages for optimized
horizontal usage on desktop + proper mobile-first affordances. Idiomatic gestalt approaches, no
legacy, clean breaks. Dogfood our own components to afford this." (FEEDBACK-LEDGER F14). This wave
produces the per-page responsive audit table (the census-grounded enumeration of viewport
breakages) and the fixes it enumerates — the same evidence-first discipline as family C's reduction
ASK: a table of `page → breakage@viewport → fix`, each row born-RED with a captured DELTA.

### Exact scope

**In:**

- A per-page responsive audit across the census's **100 navigable routes** (1 catalog home + 11
  section landings + 88 story routes, census:4) at the two governing viewports — mobile (390px) and
  wide desktop (≥1440px) — flagging: horizontal-space waste on desktop (the F13 sortable-list class),
  non-mobile-first layouts that overflow or crush at 390px, and pages that hand-roll layout instead of
  dogfooding our own responsive components. (The raw `find demo/stories -name '*.vue'` = **128 is a
  FILE count** incl. ~28 non-navigable sub-component SFCs; audit the 100 routes, not the 128 files —
  AMEND-2.)
- Named born-RED anchors (verified live sites):
  - **F13 sortable-list:** `demo/stories/data/sortable-list.vue` uses `flex flex-col` vertical
    stacks (:69, :109) + a `grid-cols-1 md:grid-cols-3` (:143) — "needs better horizontal use of
    space" (FEEDBACK-LEDGER F13; registry routes F13 to family D, REGISTRY.md:100).
  - The fixed non-fluid landing grid (Wave 5's target) at mobile.
  - Pages with bespoke `<style>` fixed widths that don't reflow (census:13, the ~23 bespoke-CSS
    SFCs) — enumerate the ones that break at 390px.
- The fix mandate: dogfood our components (the responsive grid/stack/dock primitives) instead of
  ad-hoc Tailwind breakpoints where a shipped component already solves it (F14: "Dogfood our own
  components").

**Out:**

- The dock's own responsive/overflow affordance (F27 interior scroll, F47 edge-occlusion) is the
  DOCK GREENFIELD (family G, REGISTRY.md:143-145) — this wave audits story-PAGE responsiveness, not
  the dock component.
- The mobile slider modal-expansion / grow-on-engage variants (A01) are family G's SLIDER-ENGAGE.
- Per-page redesigns that a responsive fix reveals as deeper (F16 timeline, F30 tempo) route to
  their own family-C/redesign waves; this wave flags, it does not redesign overfit pages.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-RSP-1 | the audit table does not exist; `grep -c 'flex-col' demo/stories/data/sortable-list.vue` → vertical stacks (:69,:109) with poor horizontal use (F13) | the per-page audit table exists; every flagged page has a `breakage@viewport → fix → DELTA` row |
| G-RSP-2 | Playwright @390px on the flagged pages shows overflow/crush (captured baseline) | each flagged page passes @390px (no horizontal scroll, no crushed control) with a paired before/after DELTA |
| G-RSP-3 | Playwright @1440px shows the F13-class horizontal-waste pages (narrow content in a wide column) | flagged pages use the horizontal space (DELTA); the fix dogfoods a shipped component where one applies |

### π / DELTA obligation

**Required and central — this wave IS a visual audit.** Every flagged row carries a captured
390px + 1440px before/after screenshot. "Responsive" is a paint claim; a headless assertion does
not satisfy F14 (feedback_live_verify_capture). Use the Playwright seat serialized against other
browser-owning waves (feedback_browser_seat_singleton).

### KISS / parsimony

- The audit table is the SPEC — like family C's kill/keep table, each row is evidence + a bounded
  fix, not an open-ended redesign. Flag, fix the layout, move on.
- Dogfood over bespoke: fewest lines is often DELETING a hand-rolled breakpoint stack in favor of a
  shipped responsive component.
- No legacy breakpoint ladders kept alongside new ones; clean break per page.

### Non-goals

No dock component work (family G). No slider engagement variants (family G). No overfit-page
redesign (family C). No new responsive PRIMITIVE (consume shipped components; if one is missing,
flag it as a family-C/component gap).

---

## OPEN markers for the Fable two-challenge pass

- **OPEN-D1 (Wave 1 ↔ Wave 4 merge order):** waves 1 (taxonomy registry) and 4 (width/hero-scale/
  heading) both touch the width/scale story-chassis. Recommended: Wave 1 lands the registry FIRST,
  Wave 4 binds width + hero-scale as per-variant config INSIDE it. Alternative: Wave 4 lands the
  three surgical truth-fixes first (define token, bind scale, dedup heading) as small breaks, Wave
  1 then generalizes them into the registry — but that re-touches the same lines twice. Needs a
  ruling on order + the exact StoryPage.vue line-ownership split.
- **OPEN-D2 (StoryBody 3/88):** the pages-as-data StoryBody subsystem (`:body=`, 3 consumers, ~440
  LOC) is retire-or-expand (census:49-55). Does family D expand it to justify the LOC (adopt it as
  the `spec`/`doc` variant's renderer), or does family C retire it as overfit? It straddles both.
  Recommend: the taxonomy wave DECIDES it as the `doc`/`spec` renderer OR routes the retire to
  family C. Needs a ruling.
- **OPEN-D3 (F41 npm-install site):** F41 ("wtf is this npm install bit?" on `/motion/text-motion`)
  is screenshot-anchored (`feedback/F41-text-motion-npm-install.png`); the exact string was not
  found by a grep of `text-motion.vue` at HEAD. Locate the live site at execution (it may be a
  component/blurb, not literal "npm install") before writing the born-RED probe.
- **OPEN-D4 (mono-caption def disposition):** killing the `text-mono-caption`/`text-admin-label`
  @utility DEFS strands 224 refs (typography-audit-round-2b:22). Wave 2 sweeps demo call-sites and
  reserves ONE role; the DEF keep-vs-retire is a family-F typography coordination. Confirm: does
  Wave 2 keep the def (for the reserved `StorySection.label`) and only strip call-sites, with
  family F owning any eventual def change? Leaning yes.
- **OPEN-D5 (F09 live-state):** `configurator/styles.css:109-112` already carries a concentric
  card-radius relay — F09's over-rounding may be PARTLY remediated since the 2026-07-17 feedback.
  Before writing G-CFG-4's born-RED value, live-verify the resting container radius at every mount
  site; if F09 is already cured, convert the gate to a REGRESSION-guard (radius stays card, never
  reverts to ovoid) rather than a born-RED fix.
- **OPEN-D6 (define vs collapse `--story-article-w`):** define the token as a distinct content
  reading measure, or collapse the `page` variant onto `--story-page-max-inline` (72rem)? Define
  only if `page` articles genuinely want a NARROWER measure than hero pages; else collapse (fewer
  tokens, KISS). Needs a design intent ruling.
- **OPEN-D7 (F46 double-card exact site):** `CatalogLanding.vue:34` uses `SectionPreviewCard`
  directly (not visibly double-wrapped); F46's "TWO layers of cards" is anchored to
  `/foundations/intro`. Confirm whether the double-wrap is in the intro page's own SFC or in
  `SectionPreviewCard`'s internal tile, and pin G-PRV-4's probe to the real site.
- **OPEN-D8 (live-miniature cost ↔ family E):** Wave 5's live miniatures must be cheap (static
  frame / paused viz), and their aggregate boot cost is gated by family E's trace. Confirm the
  handoff: Wave 5 defines the CHEAP-miniature contract (no live loop per card), family E gates the
  boot-graph cost that contract must satisfy.
- **OPEN-D9 (the `scene` type membership) — CONTINGENT on the compositions ruling (AMEND-3):** the
  census's 7-type list (census:5) includes `scene` and `doc` without pinning membership. Candidate
  `scene` = the full-bleed `demo/stories/compositions/` set (auth-shell etc, 6 pages). **But
  `ASK-REDUCTION` D1 + `BAND-REDUCTION` W3 prune the ENTIRE compositions section** — if pruned, `scene`
  has ZERO members and MUST NOT be minted (an empty type is the overgrowth the wave's own KISS clause
  forbids). **So the taxonomy is 6 types (no `scene`) if compositions prunes, 7 if any composition page
  survives as a legit `scene`.** Wave 1 cross-refs the D1 answer before minting the type; `doc` = the
  StoryBody data-driven / foundations prose pages regardless. No page left un-typed, no 8th type.
- **OPEN-D10 (copy-canon home):** the copy canon (Wave 2's allow-list) — does it live as a new
  short precept in `docs/precepts/`, or fold into the existing story/design-idioms precept? Family
  J owns `design-idioms.md`; a NEW story-copy precept avoids collision. Recommend a new short
  precept; confirm the home so it doesn't drift into a J-owned file.

**Lead adjudication (2026-07-17, perfection pass): the Fable story-framework amendments D-1..D-11
(`../formation/perfection/FABLE-STORY-FRAMEWORK.md` §7) are ADOPTED-BINDING on this band; the
doc's §1-§6 (six-type taxonomy, per-type anatomy, tile ladder, configurator ADOPT, copy canon,
house voice) supersede the draft's corresponding sections; its §9 gates join the band's gate
set.** Headlines: taxonomy 7→6 (doc folds into spec; landing spans D0 catalog + D1 section;
studio unifies showcase+configurator; scene contingent on ASK-D1); configurator standard is
ADOPT+widen, not build (F09 → regression-guard; F11 = the one-grouped-list cure at styles.css:117);
tile ladder reform is AUTHORSHIP (4/88 → full headline coverage; CatalogLanding routed through
resolveStoryTile; the live-miniature line STRUCK per the 0-GL contract + R3b idle-rAF); F41's
site is typewriter.vue:103 (neutral string); F46 double-card cure is structural
(SectionPreviewCard's inner well loses its second border); StoryBody KEPT as the spec renderer;
the code-context region joins spec/studio anatomy under the copy canon.
