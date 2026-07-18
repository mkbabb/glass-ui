# BJ Band — the story meta-framework reformation (registry family D)

**Status:** REFABLE UNION — awaiting execution
**Verified-model:** `claude-fable-5` (REFABLE seat RU-03-STORY; system-context line read verbatim:
"The exact model ID is claude-fable-5").
**Union provenance:** rewritten in place 2026-07-18 as the RU-03 band redo — an ANEW derivation
from the corrected formation corpus + the repo at HEAD, then claim-by-claim scrutiny of the prior
draft (opus-begat, lead-adjudicated 2026-07-17), then this union. Fresh evidence authoritative on
conflict; draft rows kept only where RATIFIED. Verdict sidecar:
`../formation/refable/REFABLE-RU-03-STORY.md`. External line-cites into this file re-anchor by
SECTION + GATE ID (the gate IDs are stable); the sidecar carries the re-anchor map.
**Registry family:** D (story meta-framework + copy canon) · REGISTRY.md:87-106
**Verdict (lead):** "the root chassis IS standardized (100 routes through StoryPage) but per-type
variants are 6 parallel unnamed wrappers + 23 bespoke-CSS pages; copy leaks internals; the width
token is an undefined no-op; hero hierarchy is inverted by hardcodes." (REGISTRY.md:88-90)
**Mode:** TRANCHE DEVELOPMENT — this band DEVELOPS the spec only. The waves below, when executed,
edit `demo/` chassis + story SFCs and a small `src/` seam (StorySection level axis, Configurator
standard, the route-transition CSS). Every visual claim carries a π/DELTA obligation; no wave lands
on a green-headless / broken-paint gap (feedback_live_verify_capture).
**HEAD pin (verified on disk this union):** `git describe = v7.0.0-70-g485891a2`, `package.json`
version `7.0.0` (published). `src/` + `demo/` are UNMOVED since the RU-10 union pin
`v7.0.0-49-g2a949abe` (`git diff --stat 2a949abe..HEAD -- src demo` = empty); every born-RED probe
below was re-run at THIS head. The prior draft's `v6.0.0-62-g65c28be1` pin predated the 7.0.0
restructure — its counts drifted and are re-pinned throughout.
**Binding design canon:** `../formation/perfection/FABLE-STORY-FRAMEWORK.md` (the RU-10 union) is
ADOPTED-BINDING **in full** — §1-§6c AND amendments AMEND-D-1..**D-17** (the prior adjudication
block adopted only D-1..D-11; it predated the RU-10 rewrite that added §2.0/§6b/§6c + D-12..D-17).
Where this band and that document conflict, the fold wins on the evidence cited.
**Sources:** FABLE-STORY-FRAMEWORK.md (all sections); REFABLE routings that name this band
(RU-10 R1-R8, RU-05 R8, RU-06 RT4, RU-16 R5, RU-03-A11Y r3, RU-13-F01-F10/F21-F30/F31-F40/F41-F50/
A01-A17, RF-5, RF-6); redress/JUDGE.md J2/J8/J9/J10/J11; ADJUDICATION-1 rulings 1/2/6/9;
FEEDBACK-LEDGER F01/F02/F03/F05/F09/F10/F11/F13/F14/F29/F31/F40/F41/F43/F46, A06/A14/A17;
ios27/IOS27-CODEX.md laws 4 (`:14`), 8 (`:21`), 10 (`:26`), 11 (`:27`) — RU-16 re-anchored;
GF-DOCK-PASS3 §5/§6 (the F05/F06 dock-side owners); round-1/round-2 censuses re-verified at HEAD.

---

## Band charter — SEVEN waves, one owner per file

The story meta-framework is ONE thing (A06: "codify + standardize every story page"). It is split
into seven waves by CONCERN, and each shipped file has exactly one owning wave so no two waves edit
the same file — with ONE stamped exception (APOTHEOSIS D-01): the two landing SFCs
(`CatalogLanding.vue` / `SectionLanding.vue`) are an ORDERED sub-sequence, **W1 → W4 → W5**. W1's
front-door collapse settles file EXISTENCE first (it is licensed to DELETE `CatalogLanding.vue` if
intro wins); W4 and W5 then edit the SURVIVING D0 only, as concern-slices in that order; their
landing pins (`CatalogLanding:18`, `:7-9`, `:40`) re-anchor to the survivor. No W4/W5 gate may pin
a file W1 has retired:

| # | wave | owns (exclusive) | one-line |
| --- | --- | --- | --- |
| 1 | **BJ.W-STORY-TAXONOMY** | `manifest.ts` (the `pageType` field + registry data), `StoryPage.vue` (variant dispatch), the wrapper fold (VizStudio/DockStage/FamilyTabs → named variants), the one-front-door collapse | name the SIX page types; put the variant on the manifest; retire the ad-hoc wrappers; exactly ONE D0 |
| 2 | **BJ.W-STORY-COPY-CANON** | `demo/stories/**` prose + labels + manifest blurbs, `auth-shell.vue` credentials, the mono-eyebrow decorations (demo call-sites) | kill the meta-caption / jargon class; ban fake credentials; reserve the mono eyebrow to ONE role |
| 3 | **BJ.W-CONFIGURATOR-STD** | `src/components/configurator/*`, `StorySection.vue` (level axis), the springs/curve-gallery configurator adoption | ADOPT the shipped configurator standard; widen the type ladder + the roominess; one inset grouped list |
| 4 | **BJ.W-WIDTH-HIERARCHY-TRUTH** | `story-hero.css` (the frame-token contract), `SectionLanding.vue`/`CatalogLanding.vue` (hero-scale binding), the StoryHero↔VizStudio h1/h2 dedup, `DockStage.vue` rhythm token | make the frame tokens true; bind hero-scale to the manifest; one h1 per page |
| 5 | **BJ.W-PREVIEW-CARD** | `SectionPreviewCard.vue` (wholesale — incl. the above-fold `content-visibility` exemption ceded from PERF W3), the landing grids (masonry), `.tile.vue` authorship | tile-ladder AUTHORSHIP coverage + masonry + the double-card structural cure — never a live loop per card |
| 6 | **BJ.W-RESPONSIVE-AUDIT (F14)** | the per-page responsive audit table + the flagged fixes | audit ALL routes AGAINST the per-type collapse rules (not page-by-page ad hoc) |
| 7 | **BJ.W-STORY-TRANSITIONS** (NEW — RU-10 R7) | `demo/chassis/routeTransition.ts`, the route section of `src/styles/view-transition.css`, the entrance-register conformance | the typed transition GRAMMAR (four semantic VT types) + the compositor-only entrance standard; choreography FEEL stays PERF W4's |

**Cross-wave dependency (OPEN-D1, resolved recommendation):** Wave 1 lands the variant registry
FIRST; Wave 4 then binds width + hero-scale as PER-VARIANT config INSIDE that registry. Wave 7
consumes Wave 1's taxonomy (navigation semantics derive from `pageType` + manifest order).

**Standing-gate posture (APOTHEOSIS MECH-06):** the G-* battery is one-time RED→GREEN
differentials + named regression-guards (G-CFG-4, G-PRV-5) asserted at wave close — the band
contributes ZERO standing vitest gates; `BAND-GATES` W1's 40-60 arithmetic counts nothing from
this band.

**Boundaries — what this band does NOT own (reference, do not duplicate):**

- **Transition ownership, stated exactly (the F05/F06/F07 split — corrected this union):**
  - **F07 choreography FEEL + the route-pending affordance** — `BAND-PERF` W4 (`BJ.W-ROUTE-PENDING`)
    is the SENIOR owner (the lead seam ruling, RF-5 reconciliation 4; PLAN §1 "Family D consulted").
    Wave 7 supplies the semantic TYPE-SET and the chassis shared-element surfaces that choreography
    rides; it does not own springs/curves/pending states.
  - **F06 + F05's dock half** — GF-DOCK W6 (PAGE-TRANSITION + NO-SHIFT: slide + ~1/3 parallax + dim
    veil over the crossfade floor; dock-motion CLS = 0 — GF-DOCK-PASS3 §6 + the W6 roster row). The
    dock band is OUT of Wave 7's scope; the RU-10 §6b dock-band-persistent-field / frame-0-palette
    cure candidates route OUTBOUND to GF-DOCK W6 as inputs (sidecar ROUTING).
  - **F05's aurora half** — THIS band: the one live defect (the dock-postures grid on bare black) is
    Wave 1's J2 row; the demo-wide every-route-resolves-a-field conformance is Wave 7's.
  - Variants declare their ENTRY **and their asymmetric EXIT** (IOS27-CODEX law 8, `:21` — exits are
    fade-led, faster, never mirroring entry; RU-16 R5).
- **The perf half of the preview-card defect (F01 stutter / F02 blank / A17):** the eager-mount and
  deferred-paint TRACE mechanisms are **family E** (REGISTRY.md:108-120). Wave 5 owns the layout +
  the above-fold `content-visibility` EXEMPTION edit (ceded from PERF W3, ADJUDICATION-1 ruling 9);
  family E owns the boot graph and the trace gate. The per-type perf CONTRACT (AMEND-D-14) is
  recorded at Wave 1; family E's gates measure it.
- **The radius / blur / type TOKEN system:** family F mints the role scale, the blur ladder, and the
  default-ramp reset (MATERIAL W6 owns the type codemod — ADJUDICATION-1 ruling 2; this band
  consumes). Wave 3 CONSUMES `--radius-card`/`--radius-panel`; it does not mint them.
- **The component reduction:** family C (REGISTRY.md:66-85). Where a story page renders a
  to-be-removed component, the reduction wave prunes and the story adopts via a marked addendum
  (feedback_consumer_updates_ruling).

---

## BJ.W-STORY-TAXONOMY — the page-type taxonomy + manifest variant registry

### Mission

Give the standardized StoryPage chassis a real per-type variant axis. Today StoryPage carries the
single boolean-derived `hero | page` variant (`StoryPage.vue:32-34`) and per-type behavior is
scattered across parallel wrappers with no page-type discriminant. Add a `pageType` field to the
manifest `Story` and a StoryPage variant registry keyed by it — **SIX types per the adopted fold
(AMEND-D-1), not the census's seven:**

**`landing` (D0 catalog + D1 section, discriminated by `depth`) · `spec` (the default content
type — `doc` folds in: a prose/token page is a `spec` with prose specimens) · `studio`
(substrate-showcase ∪ configurator-page — ONE `VizStudio` anatomy, 3 consumers on disk:
aurora/blob/fourier-field; ~9 is the post-adoption target, never the born-RED count) · `family`
· `dock` · `scene` (CONTINGENT on ASK-13/D1 — if the `compositions/` section prunes, the taxonomy
is FIVE and `scene` MUST NOT be minted).**

`family` nuance (AMEND-D-1b): of the 5 real FamilyTabs mounts, only THREE are page-root family
collapses (`forms/inputs`, `display/atoms`, `motion/text-motion`); `toast.vue:125` and
`paper-glass.vue:263` mount it as an IN-PAGE section switcher — a section register, not a page
type. `timeline`/`scroll` mention FamilyTabs in comments only; never count them.

**One front door (AMEND-D-17, NEW):** the storybook ships TWO catalog pages — `/` renders the
category bento (`CatalogLanding.vue:30-42`) and `/foundations/intro` renders a SECOND
`SectionPreviewCard` category bento of the same cards (`intro.vue:74-89`). Collapse to ONE D0
(winner decided at execution: `/` absorbs the intro hero moment, or intro becomes `/`); the loser
retires clean-break.

### Exact scope

**In:**

| target | today (born-RED, re-verified at v7.0.0-70) | the reform |
| --- | --- | --- |
| `demo/stories/manifest.ts` `Story` type | no `pageType` field (`grep -c pageType demo/stories/manifest.ts` → **0**) | add the `pageType` discriminant with the six-value union (five if `scene` is not minted); default `spec` |
| `demo/chassis/page/StoryPage.vue:32-34` | `const variant = computed<"hero" \| "page">(() => current.value?.story.hero ? "hero" : "page")` — the ONLY variant axis | dispatch on `story.pageType` through a variant registry; `hero` becomes a per-variant PROPERTY (landing/studio/scene are hero-register; spec/family are content-register); the boolean axis is DELETED |
| `demo/stories/substrates/_frame/VizStudio.vue` | a standalone shared wrapper invoked ad-hoc by the 3 studio routes | register as the `studio` variant |
| `demo/stories/dock/_frame/DockStage.vue` | a standalone backdrop-column wrapper mounted by the dock band's route SFCs | register as the `dock` variant |
| `demo/chassis/family/FamilyTabs.vue` | a standalone switcher; 3 page-root mounts + 2 in-page mounts | register the PAGE-ROOT use as the `family` variant; the in-page use stays a section register (do not over-count the type) |
| the two D0 catalogs | `CatalogLanding.vue:30-42` + `intro.vue:74-89` — one identity moment split in half (the second is the F46 page) | ONE front door (AMEND-D-17); exactly one D0 route |
| `StoryBody` (`:body=`) | 3 consumers at HEAD (`display/badge`, `feedback/alert`, `forms/select`) | KEPT as the `spec` variant's data renderer (AMEND-D-11 — resolves OPEN-D2); expand where a page is pure specimen-grid; retire only where genuinely bespoke. Not a family-C retire. |
| the code-context region | `chassis/code` register exists with 3 consumers (`containers/configurator`, `display/card`, `feedback/toaster`) and NO taxonomy home | the `spec`/`studio` anatomy gains an OPTIONAL code-context region (AMEND-D-9); Wave 2's canon governs its content |
| J2 — the dock-postures backdrop | the postures grid (`demo/stories/dock/rail.vue:142-189`; `initialPostures` at `:44`, rendered at `:153`) renders on bare black | the postures section takes the STAGED field (the `dock` variant's DockStage, or the section's live backdrop idiom) — never bare black. (Crosswalk reconciliation 3: CLEARED-by-R3b → LANDED here.) Citation re-anchored per RU-05 R8: the F05 split is ratified at the GF-DOCK **union §5/§6** (dock-shift half → G-NO-LAYOUT-SHIFT; aurora half → this band). |

> **liquid-grid DROPPED from the fold roster (ADJUDICATION-1 ruling 1 — DELETE wins).**
> `BAND-REDUCTION` W3 deletes the component + export + story page outright. The taxonomy proves out
> on `studio` via aurora/blob/fourier-field.

**The per-type perf contract (AMEND-D-14 — recorded here, measured by family E):**

| type | the contract |
|------|--------------|
| `landing` | 0 GL contexts (the tile ladder, Wave 5); above-fold cards EXEMPT from `content-visibility: auto` |
| `spec`/`family` | zero GL; lazy family members (`defineAsyncComponent`); code highlight = deferred COLOR, never deferred content |
| `studio`/`scene` | exactly ONE GL context (one-GL-per-route, `demo/chassis/hero/focal.ts:50`); palette ground at frame 0 |
| `dock` | ONE band field (the cure is GF-DOCK W6's; see Boundaries) |
| all | route chunks pre-resolved before the VT (`demo/router.ts:122`); idle rAF budget is family E's gate |

**Out (explicit non-goals):**

- The ~23 bespoke `<style>` blocks on route SFCs are NOT bulk-migrated here; per-page bespoke-CSS
  removal rides the page's own reduction/redesign wave.
- Width, hero-scale, and heading-dedup are **Wave 4**.
- Transition semantics per type are **Wave 7** (it consumes this wave's taxonomy).

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-TAX-1 | `grep -c "pageType" demo/stories/manifest.ts` → **0** | every `Story` carries `pageType ∈ {landing,spec,studio,family,dock[,scene]}`; a registry maps each to ONE variant component |
| G-TAX-2 | `grep -n 'computed<"hero"' demo/chassis/page/StoryPage.vue` → **:32** (single boolean axis) | StoryPage dispatches on `pageType`; `hero` is a variant property; the boolean axis is DELETED (no shim) |
| ~~G-TAX-3~~ (RETIRED) | liquid-grid deleted by `BAND-REDUCTION` W3 — moot | n/a |
| G-TAX-4 | VizStudio/DockStage/FamilyTabs are invoked as bare components (no registry maps type→wrapper) | the wrappers are reachable ONLY through the variant registry keyed by `pageType` |
| G-TAX-5 (NEW — one front door) | TWO D0 category bentos render: `CatalogLanding.vue:30-42` + `intro.vue:74-89` | exactly ONE D0 route exists; the loser is retired clean-break (the G-PT-CONFORM exactly-one-D0 clause, RU-10 R1) |

### π / DELTA obligation

**Required — structural refactor with paint-parity claim.** The taxonomy fold must be visually
INERT on already-correct pages: paired-π + before/after DELTA on one route per folded type proving
the registered variant renders identically to the ad-hoc wrapper it replaces. The J2 postures fix
and the front-door collapse are VISIBLE changes — each carries its own captured DELTA.

### KISS / parsimony

- The registry is a DATA table (`pageType → variant component + config`), not a switch tree. One
  map, one `<component :is>` dispatch.
- Do NOT invent a type to house an awkward page; a page that fits none of the six is a
  bespoke/overfit signal (route to family C), not a reason to grow the taxonomy. An EMPTY type
  (`scene` with compositions pruned) must not be minted.
- No legacy: the `hero | page` boolean axis is DELETED, not kept alongside `pageType`
  (feedback_no_backwards_compat).

### Non-goals

No copy edits (Wave 2). No width/scale/heading edits (Wave 4). No per-page bespoke-CSS purge. No
transition authoring (Wave 7).

---

## BJ.W-STORY-COPY-CANON — kill the meta-caption / jargon class

### Mission

Codify what a story page MAY say, and strip everything it may not. Story copy today is written for
the tranche auditor, not the library user: a mono ALL-CAPS caption idiom saturates **65/128** story
SFCs (re-verified at HEAD), internal implementation prose ships as user-facing blurbs, and one
composition invents fake enterprise credentials. IOS27-CODEX law 10 is the authority (`:26` after
the RU-16 re-anchor): bold hero ≫ semibold row title ≫ grey secondary ≫ caption — NO mono ALL-CAPS
jargon. The full canon (allow-list + ban-list + the code-context ruling §5.1) is
FABLE-STORY-FRAMEWORK §5 — adopted binding.

### Exact scope

**In — the copy canon:**

1. **The allow-list:** a plain title; a one-line lede (what it IS + when to reach for it); per
   section a plain heading + optional one-line purpose; per specimen an honest state label
   (`Default`/`Disabled`/`Invalid`); the live demo; ONE optional code-context snippet showing
   USER-FACING usage (import + minimal use — never how it's built; governs Wave 1's code region).
2. **The meta-caption kill (F03/F40/F41).** Verified live sites: `demo/stories/motion/handmark.vue`
   `:26` (aria-hidden SVG overlay prose), `:67` (stroke-dashoffset sweep / clip-path wipe),
   `:115-120` ("box-mode hull · the se-guard"); `demo/stories/data/search.vue:492` (reactive
   query / atomic status); `demo/stories/manifest.ts:932` (the completion-seal
   stroke-dashoffset/@property mechanics dump) **and `:984-986`** (the handmark blurb "boil natural
   morphology · multiply over the page" — RU-06 RT4). NOTE (RU-06 RT4): the handmark story rewrites
   to gesture-named sections in GF-HANDMARK W4 — these grep anchors re-anchor after that rewrite;
   the gate holds by phrase, not line.
3. **F41 (the npm-install string) — SITE RESOLVED (AMEND-D-6, closes OPEN-D3):**
   `demo/stories/motion/typewriter.vue:103` `text="npm install @mkbabb/glass-ui"`, surfaced on
   `/motion/text-motion` via the FamilyTabs typewriter member. Fix: a neutral demo string that
   shows the effect without reading as a stray CTA — **and does not WRAP at narrow width** (the
   RU-13-F41-F50 rider: the current string wraps mid-animation at mobile; the replacement string is
   length-bounded or the specimen no-wraps).
4. **The mono-eyebrow reserved to ONE role:** the idiom is `text-mono-caption` ×121 +
   `section-label` ×30 + `text-admin-label` ×57 across **65/128** story SFCs (all counts re-run at
   v7.0.0-70; the draft's ×126/×31 predate the 7.0.0 restructure). Reserve it to (a) the single
   structural `StorySection.label` breadcrumb (`StorySection.vue:29`, rendered as a ≤3-word
   place-name, never a jargon phrase) and (b) real code tokens/snippets. Strip everywhere else;
   hierarchy comes from Wave 3's ladder.
5. **The fake-credentials ban (F43):** `demo/stories/compositions/auth-shell.vue:39-41` ships
   "SOC 2 Type II" / "End-to-end encrypted" / "Trusted by 12k teams". Delete the trust-badge row or
   replace with honest neutral placeholders; NEVER ship a fake credential. (Unconditional — holds
   whether or not ASK-13 prunes the composition.)

**Out:**

- The `text-mono-caption`/`text-admin-label` @utility DEFINITIONS are NOT retired here — killing
  the def strands the non-demo refs (the stale-class no-op lesson). This wave sweeps DEMO
  call-sites; the def disposition is family F's (OPEN-D4, leaning keep-for-the-one-role).
- The auth-shell composition's EXISTENCE is ASK-13/family C; this wave fixes the credentials only.
- The heading-LEVEL axis is Wave 3.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-COPY-1 | `grep -rlE 'text-mono-caption\|section-label\|text-admin-label' demo/stories/ --include='*.vue' \| wc -l` → **65** (of 128) | ad-hoc eyebrow decorations gone; the idiom survives ONLY via the one reserved `StorySection.label` breadcrumb |
| G-COPY-2 | `grep -nE 'aria-hidden SVG overlay\|stroke-dashoffset\|se-guard\|reactive query' demo/stories/motion/handmark.vue demo/stories/data/search.vue demo/stories/dock/layers.vue demo/stories/manifest.ts` → matches at handmark:26/67/115-120, search:492, manifest:932/:984-986, **layers:279-335** (J8 — the dock-crossfade "Mechanics" body: `<DockCrossfade :active>`/`opacity: var(--dock-t)`/`useDockSpring`/`.dock-face-content`) | 0 implementation-mechanics phrases in user-facing copy AND **0 "Mechanics"-narration sections** — the canon bans the numbered-implementation-mechanics PATTERN, and inline `<code>` is for user-facing USAGE only (per FABLE-STORY-FRAMEWORK **§8 finding 10** — the draft's `:385-391` line-pin is stale after the RU-10 rewrite; anchor by section, never line — RU-10 R2) |
| G-COPY-3 | `grep -nE 'SOC 2\|End-to-end encrypted\|12k teams' demo/stories/compositions/auth-shell.vue` → **:39-41** | 0 fabricated-credential strings anywhere in `demo/stories/` |
| G-COPY-4 | `grep -n 'se-guard\|box-mode hull' demo/stories/motion/handmark.vue` → :115-120 (F40 "what is SE") | 0 internal jargon acronyms in labels/blurbs |
| G-COPY-5 (NEW — F41) | `grep -n 'npm install' demo/stories/motion/typewriter.vue` → **:103** | 0 install strings as demo content; the replacement specimen does not wrap at 390px (one captured frame) |

### π / DELTA obligation

**Required.** Capture before/after DELTA on the heaviest offenders (re-verified at HEAD:
`/substrates/glass-material` ×11 mono-captions, `/foundations/css-utilities` ×8,
`/motion/springs` ×6, `/compositions/auth-shell`) proving hierarchy reads from size (paired with
Wave 3) and no fake credential renders. The eyebrow-union consistency gate must still pass on the
ONE reserved role.

### KISS / parsimony

- The canon is a SHORT allow-list, enforced as a grep-able ban-list + the eyebrow-count gate.
- Delete the mechanics sentence, keep the human one; no re-writing into different jargon.
- Levity survives — plain and honest is not dry (feedback_writing_style).

### Non-goals

No @utility def edits (family F). No component prune (family C). No ladder authoring (Wave 3).

---

## BJ.W-CONFIGURATOR-STD — ADOPT the shipped configurator standard

### Mission

One configurator anatomy across every configurator page. **The standard is ~80% already shipped**
(AMEND-D-2 — adopt-and-tune, never build-from-scratch): the root is a card
(`Configurator.vue:211` `--radius-ctx: var(--radius-panel)`), sections derive concentric card
radius (`styles.css:109` `max(floor, ctx − inset)`), and the section register exists
(`src/styles/tokens/sizing-config.css:35` `--configurator-section-size: var(--type-subheading)`).
What remains: the ladder is too NARROW (F10 — section 20.4px sits ~4px over field labels; and
`StorySection.vue:32` hardcodes EVERY story heading to `text-subheading`, so all **282**
StorySection instances read two-level flat — 0 consumers override `#heading`, 90 files / 65
`heading=` uses, all re-verified), the inspector reads as gapped cards where ONE inset grouped
list should read (F11), springs has no configurator at all (F29), and the curve-gallery stage
over-heights into a void (F31). Plus the J10 ROOMINESS ruling: the "too cramped / must be larger"
half of F09 is a spatial gate, not only a type gate.

### Exact scope

**In:**

| target | today (born-RED, re-verified) | the reform |
| --- | --- | --- |
| the section↔field ladder (F10) | `--configurator-section-size` = subheading 20.4px (`sizing-config.css:35`, `styles.css:49-51`); field labels ~14-16px — the register EXISTS but the rungs are too close; `StorySection.vue:32` pins every story heading to `text-subheading` | WIDEN: section title → `text-heading`, field label → `text-small`, value → `text-caption`; give `StorySection` a `level` axis; weight from SIZE, never a mono stamp |
| the section grouping (F11) | the adjacent-sibling rule `.configurator-layer + .configurator-layer { margin-block-start: var(--configurator-section-gap) }` at **`styles.css:117-118`** (the token def at `:25` is not the site — AMEND-D-3) | sub-sections of ONE inspector read as ONE contiguous inset grouped list: hairline dividers, inter-row gap = 0; the gap survives only between genuinely separate groups |
| the container radius (F09) | **REMEDIATED at HEAD** (`Configurator.vue:211`; `styles.css:109`) — AMEND-D-7 resolves OPEN-D5 | G-CFG-4 converts to a REGRESSION-GUARD; the residual F09 (the ANALOGOUS/COMPLEMENT/TRIAD/MONO pills) is inner toggle-button radius — a family-F radius-role item, not this container |
| roominess (J10) | the F09 "too cramped" half — container width + section breathing room unasserted | the ROOMINESS/SCALE gate: container min-width + section breathing room asserted (two-pronged with the ladder widen) |
| springs (F29) | `grep -c "Configurator\|VizStudio" demo/stories/motion/springs.vue` → **0** (hand-rolled sliders) | springs adopts the `studio` variant + the configurator standard |
| curve-gallery (F31) | `EasingConfigurator`/`EasingPicker` are ALREADY modular src components (`src/components/easing/`, consumed at `curve-gallery.vue:8-10`) — AMEND-D-8; the real defect is the curve STAGE over-height (empty bottom, the F31 image) | fix the layout void (cap the stage min-height) + adopt the configurator standard; the "modularize" framing is DROPPED. The 518-line `EasingPicker.vue` SFC residual is handled INSIDE this wave (RU-13-F31-F40), not a separate mandate |

**Out:**

- Radius/type TOKEN minting — family F (Wave 3 consumes). The type-codemod is MATERIAL W6.
- The Configurator's API surface reduction — family C.
- Engagement/expression on controls — family G (idle-breath/ENGAGE-AFFORD).
- The easing tooling's PUBLIC-surface question — ASK-11/§B4 (demo-privatize leaning); the
  curve-gallery adoption survives either ruling.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-CFG-1 (F29) | `grep -c "Configurator\|VizStudio" demo/stories/motion/springs.vue` → **0** | springs renders the configurator standard (studio variant); paired-π DELTA |
| G-CFG-2 (F10) | `grep -n 'text-subheading' demo/chassis/section/StorySection.vue` → **:32**; `grep -rl '#heading' demo/stories` → **0** (the flatness is total) | `StorySection` carries a `level` axis; a representative `spec` AND a `studio` render ≥3 distinct ladder rungs (title / heading / caption); DELTA vs the F10 image |
| G-CFG-3 (F11) | `grep -n 'configurator-layer + .configurator-layer' src/components/configurator/styles.css` → **:117** (the applying rule; the draft's `:25` pin was the token def, not the site) | inter-row gap = 0 within one inspector; hairline dividers; the gap only between genuinely separate groups; DELTA shows one inset grouped list |
| G-CFG-4 (F09 — REGRESSION-GUARD, not born-RED) | the container radius is ALREADY card grammar at HEAD (`Configurator.vue:211`) | the guard: resting container radius = card grammar at every mount site, never reverts to ovoid (π pin); the inner-pill residual routes to family F |
| G-CFG-5 (F31) | `/motion/curve-gallery` renders the over-tall curve stage (empty bottom ~40%, the F31 image); the easing components are already modular | the stage void closes (min-height cap); curve-gallery adopts the standard; DELTA |
| G-CFG-6 (J10 roominess) | no assertion on configurator container width / section breathing room (the F09 "cramped" half) | container min-width + section breathing-room asserted; DELTA vs the F09 image |

### π / DELTA obligation

**Required — this is a visual standard.** Every gate pairs its feedback screenshot (F09/F10/F11/
F29/F31) with a captured after-DELTA + paired-π on the named route. A headless pass does not
satisfy it.

### KISS / parsimony

- ONE configurator anatomy, expressed once, consumed via the Wave-1 `studio` variant. No second
  configurator forked for springs/curve-gallery.
- Hierarchy from the ladder is FEWER tokens: reuse the named rungs; the mono-caps crutch is already
  stripped by Wave 2.
- ADOPT before build: G-CFG-4 proves the discipline — a gate written against "no standard exists"
  would mis-fire on the shipped one.

### Non-goals

No radius-token minting (family F). No configurator API reduction (family C). No default-ramp reset
(MATERIAL W6). No engagement choreography (family G).

---

## BJ.W-WIDTH-HIERARCHY-TRUTH — the frame-token contract, the hero-scale binding, the heading dedup

### Mission

The story frame is FOUR tokens with one owner (`story-hero.css:5-7` + the missing fourth), and the
chassis breaks the contract four ways. (1) The dominant page type runs UNCAPPED:
`StoryPage.vue:51` references `var(--story-article-w)` — **1 reference, 0 definitions** at HEAD —
so `page` articles compute `max-inline-size: none`. (2) Both landings hardcode the SMALLEST hero
rung while the manifest declares the largest: `hero-scale="4"` at `SectionLanding.vue:28` +
`CatalogLanding.vue:18` vs `heroScale: "hero"` (`manifest.ts:300`) — and the D0 catalog should
read `mega`/`audacious`, out-sizing everything beneath it (AMEND-D-10). (3) Studio pages render
their title TWICE — StoryHero `<h1>` + VizStudio's `StorySection` h2 of the same string
(`VizStudio.vue:73`; `aurora.vue:122` passes `heading="Aurora"`). (4) The dock band's rhythm
silently diverges: `DockStage.vue:194` hard-codes `gap: 2.5rem` — the clamp CEILING of
`--story-page-section-gap` — while its own prose (`:187-188`) claims the StoryPage rhythm
(AMEND-D-16).

### Exact scope

**In:**

| # | target | today (born-RED, re-verified) | the truth |
| --- | --- | --- | --- |
| W-1 | `StoryPage.vue:51` + `story-hero.css` | `var(--story-article-w)` — 1 ref / **0 definitions** → computes to `none` | resolve per OPEN-D6 (leaning COLLAPSE onto `--story-page-max-inline`, 72rem, `story-hero.css:5`); never leave the IACVT-uncapped state; no token nobody reads |
| W-2 | `SectionLanding.vue:28` + `CatalogLanding.vue:18` | both hardcode `hero-scale="4"` (the smallest rung); `manifest.ts:300` declares `heroScale:"hero"` — dead data + a hierarchy inversion | bind `hero-scale` to the descriptor ON THE SURVIVING D0 post-W1 (the `CatalogLanding:18` pin re-anchors if intro wins — APOTHEOSIS D-01); the D0 catalog reads `mega`/`audacious` (AMEND-D-10). **The `heroScale` field-retire branch stays STRUCK (AMEND-1):** the field is LIVE at `StoryPage.vue:30` — the defect is landing-scoped only |
| W-3 | StoryHero `<h1>` + `VizStudio.vue:73` | studio pages emit the title twice (same string, two heading levels) | ONE h1 per page — drop the redundant StorySection heading on hero-register studios. A11y seam (RU-03-A11Y r3): BAND-A11Y W5-D registers only the acceptance criterion (one h1 per page, no duplicated outline); THIS wave owns the fix |
| W-4 | the frame-token contract (AMEND-D-16) | three width idioms (`--story-page-max-inline` 72rem; `max-w-6xl` at `CatalogLanding.vue:13` + `SectionLanding.vue:22`; the W-1 uncapped page); `DockStage.vue:194` `gap: 2.5rem` hard-code; hero bleed padding (`story-hero.css` `.story-hero-bleed-content`) and the DockStage column padding (`:195`) clamp independently | width becomes PER-VARIANT config on the Wave-1 registry; DockStage reads `var(--story-page-section-gap)`; hero/stage padding unify on ONE token; zero undefined frame-token references |

**Out:**

- The registry STRUCTURE is Wave 1 (land after it — OPEN-D1).
- The landmark AUDIT beyond the dedup is family K (BAND-A11Y W5-D holds the criterion).

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-WID-1 | `grep -rn 'story-article-w' src/ demo/` → exactly **1 hit** (`StoryPage.vue:51`), 0 definitions | the ref resolves (collapse or define per OPEN-D6); `page` articles cap at a real measure |
| G-WID-2 | `grep -n 'hero-scale="4"' demo/chassis/landing/*.vue` → **SectionLanding:28, CatalogLanding:18** | 0 hardcoded `hero-scale` literals on landings; bound to the descriptor; D0 out-sizes D1 out-sizes the pages (DELTA) |
| G-WID-3 | `grep -n 'heading=' demo/stories/substrates/aurora.vue` → :122 under the StoryHero h1 of the same string | one h1-level title per studio page (DOM assertion: no duplicate title in `h1,h2`) |
| G-WID-4 (G-FRAME-TOKENS) | three width idioms; `grep -n 'gap: 2.5rem' demo/stories/dock/_frame/DockStage.vue` → **:194**; two independent padding clamps | width declared once per variant; DockStage reads `--story-page-section-gap`; ONE padding token serves hero bleed + stage column; 0 free-floating `max-w-6xl` |

### π / DELTA obligation

**Required.** W-1 and W-2 are visible layout changes — before/after DELTA on a `page` route and a
section landing (hero now the largest rung). W-3 via a DOM heading assertion + DELTA. W-4's dock
rhythm change captures one below-desktop frame (where the clamp diverges today).

### KISS / parsimony

- Prefer COLLAPSE over minting (OPEN-D6): fewest tokens that make the contract true.
- The hero-scale fix is a DELETE + a data-bind — it removes lines.
- No backwards-compat alias for removed width idioms.

### Non-goals

No registry structure (Wave 1). No a11y landmark audit (family K). No hero copy edits (Wave 2).

---

## BJ.W-PREVIEW-CARD — tile-ladder AUTHORSHIP + masonry + the double-card cure

### Mission

The front door reads blank — but the tile LADDER is sound and must be KEPT. `storyTile.ts:42-50`
resolves `authored (.tile.vue) → still (0-GL data-URI raster) → identity (typographic floor)` and
mounts **0 GL contexts on the landing by construction** (`storyTile.ts:22-24`). The defect is
AUTHORSHIP COVERAGE plus two structural bugs (AMEND-D-4/D-5):

1. Only **4** `.tile.vue` files exist (`display/buttons`, `display/card`, `dock/overview`,
   `forms/inputs` — re-verified by `find` at HEAD); everything else falls to `still` (the substrate
   routes) or `identity`. The F46 image is this made visible: 6 of 8 preview wells vacant.
2. `CatalogLanding.vue:7-9,40` BYPASSES the ladder — it hands `identityTile(category)` directly,
   so the root home is ALWAYS identity slabs regardless of coverage, while `SectionLanding.vue:17`
   routes through `resolveStoryTile` correctly.
3. The F46 "TWO layers of cards" is STRUCTURAL in `SectionPreviewCard.vue:35-54`: the outer
   bordered card wraps a SECOND bordered, rounded, inset-shadowed `.section-preview-card-preview`
   well (resolves OPEN-D7 — it is every card, not an intro-only mount).

**The prior draft's LIVE-miniature model is STRUCK in full (AMEND-D-4):** "render a LIVE miniature
… a real, cheap render" contradicts the ladder's 0-GL contract and the R3b idle-rAF finding (~40k
RunTasks at idle on light pages, REGISTRY R3b fold). The "live" read comes from an AUTHORED
CSS/DOM vignette or a frozen still — a parked frame, never a context. This wave also owns the
above-fold `content-visibility` exemption edit (ceded from PERF W3, ADJUDICATION-1 ruling 9) and
rewrites `SectionPreviewCard.vue` wholesale (one owning wave per file).

### Exact scope

**In:**

| target | today (born-RED, re-verified) | the reform |
| --- | --- | --- |
| tile authorship | 4 `.tile.vue` across the demo | author a `.tile.vue` for every category HEADLINE story (the 11 categories) + every landing lead — bounded, 0-GL vignettes whose IDLE POSTURE (inert vs a CSS-only compositor breath register) CONSUMES the OPEN-FM-3 user ruling (APOTHEOSIS D-06 — G-PRV-5's rAF-delta-0 is satisfied either way; the word "inert" must not close the door the user has not ruled); identity floor reserved for deep subs only |
| the catalog bypass | `CatalogLanding.vue:7-9,40` hands `identityTile(category)` directly (the SURVIVING D0 post-W1 — the pins re-anchor if intro wins; APOTHEOSIS D-01) | route through `resolveStoryTile` like `SectionLanding.vue:17`; delete the bypass |
| the double-card (F46) | `SectionPreviewCard.vue:35-54` — the inner bordered/inset well nested in every card | ONE card, ONE media region: the preview bleeds to the card's inner edge (drop the second border + inset ring) |
| the landing grid | `SectionLanding.vue` + `CatalogLanding.vue` fixed equal-size 3-col grid (`grid-cols-1 sm:grid-cols-2 …-3`); the lead already spans 2 (`lead && 'sm:col-span-2'`) | masonry / varied-size via native CSS columns or grid-auto (no JS lib); ≥2 distinct card sizes |
| the above-fold exemption | `SectionPreviewCard.vue:63-65`: `content-visibility: auto; contain-intrinsic-size: auto 19rem` unconditionally — the blank-19rem-box mechanism (F02's substance) | above-fold cards EXEMPT so they paint at first frame; family E's trace gate proves the timing |

**Out:**

- The perf TRACE mechanisms (boot graph, deferred-paint gate) — family E.
- Tile-authorship art direction runs the hallmark design lane (DesignSync + Fable, PLAN §4) — the
  landing/catalog is a named hallmark surface.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-PRV-1 (F01 masonry) | fixed `grid-cols-1/2/3` on both landings; 0 masonry | masonry/varied-size layout; cards at ≥2 distinct sizes (DELTA vs F01) |
| G-PRV-2 (F46 coverage) | `find demo/stories -name '*.tile.vue' \| wc -l` → **4**; the catalog bento is 100% identity via the `:40` bypass | every category headline + landing lead resolves `authored` or `still`, NEVER `identity`; `CatalogLanding` routes through `resolveStoryTile`; identity permitted only on deep subs (count-gated) |
| G-PRV-3 (F02 above-fold) | `grep -n 'content-visibility' demo/chassis/landing/SectionPreviewCard.vue` → **:63** unconditional | above-fold cards exempt; π/DELTA shows no blank-19rem box at first paint (trace = family E) |
| G-PRV-4 (F46 double-card) | the second bordered well at `SectionPreviewCard.vue:35-54` (structural — every card) | one card per preview; 0 card-in-card; DELTA vs F46 |
| G-PRV-5 (0-GL invariant) | (regression-guard) the ladder mounts 0 GL on landings today by construction | STAYS 0: no landing route mounts a GL context after authorship lands (the AMEND-D-4 never-a-live-loop law); rAF-delta 0 on `/` |

### π / DELTA obligation

**Required — the most visual wave in the band.** Capture `/` (catalog), one section landing, and
the F46 page before/after with paired-π. The "expressive, varied, active" claim MUST show authored
vignettes rendering, not re-skinned blanks. Coordinate the first-paint DELTA with family E's trace.

**Lead rider (STAB2 — the detached hero goo-blob, R3b visual-landing):** this wave ALSO owns the
rider's second half: the yellow goo-blob floating detached right of the landing hero — confirm
intended-vs-regression at wave start and either anchor it into the hero composition or retire it.
One capture either way.

### KISS / parsimony

- AUTHORED means CHEAP: CSS/DOM vignettes or frozen stills — never a live loop, never a GL context
  per card. Fewest render cost that reads as designed.
- Masonry via native CSS — no JS masonry library.
- One card. Delete the inner wrapper; do not style two cards to hide that there are two.

### Non-goals

No perf boot-graph work (family E). No story-page-wide load fixes (family E). No transitions
(Wave 7). No live-GL-per-card, ever.

---

## BJ.W-RESPONSIVE-AUDIT — F14 audited AGAINST the per-type collapse rules

### Mission

F14 is a first-class wave: "Audit ALL pages for optimized horizontal usage on desktop + proper
mobile-first affordances… Dogfood our own components." The method is AMEND-D-15's (NEW this union):
each page type declares its collapse ONCE in the chassis, and the audit runs AGAINST those type
rules — never page-by-page ad hoc. The per-type rules (FABLE-STORY-FRAMEWORK §6c): `landing` bento
3→2→1 columns; `spec` single-column with `size` measure caps (`story-body.ts` SIZE_MAX_W); `studio`
controls-right → stacked-below-stage (`styles.css:186-232`, already shipped); `family` switcher
collapses to a Select (`FamilyTabs` responsive, already shipped); `dock` column single-file. **A
page that needs a bespoke breakpoint is a taxonomy smell to escalate, not patch.**

### Exact scope

**In:**

- The per-page audit across the census's **100 navigable routes** (1 catalog + 11 landings + 88
  stories; the 128 is a FILE count incl. non-navigable sub-SFCs — AMEND-2) at 390px + ≥1440px,
  flagging: horizontal waste on desktop (the F13 class), overflow/crush at 390px, hand-rolled
  layout where a shipped responsive component exists, and — per the type rules — any page whose
  breakage is a TYPE-rule violation (fix the chassis rule once) vs a bespoke deviation (escalate).
- Named born-RED anchors (re-verified at HEAD): **F13 sortable-list** —
  `demo/stories/data/sortable-list.vue` vertical `flex flex-col` stacks at `:69`/`:109` + the
  `grid-cols-1 md:grid-cols-3` at `:143` ("needs better horizontal use of space"); the fixed
  landing grid (Wave 5's target) at mobile; the ~23 bespoke-`<style>` SFCs that break at 390px
  (enumerate).

**Out:**

- The dock component's own overflow affordance — GF-DOCK.
- The mobile slider modal/grow variants (A01) — family G / BI.W-ENGAGE-AFFORD.
- Overfit-page redesigns a responsive fix reveals — family C; this wave flags.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-RSP-1 | no audit table exists; F13's pins red (`:69`/`:109`/`:143`) | the table exists; every flagged page has `breakage@viewport → type-rule-or-bespoke → fix → DELTA` |
| G-RSP-2 | Playwright @390px shows overflow/crush on flagged pages (captured baseline) | each flagged page passes @390px (no horizontal scroll, no crushed control), paired DELTA |
| G-RSP-3 | Playwright @1440px shows F13-class horizontal waste | flagged pages use the space (DELTA); fixes dogfood shipped components; 0 new bespoke breakpoints without an escalation row |

### π / DELTA obligation

**Required and central — this wave IS a visual audit.** Every flagged row carries 390px + 1440px
before/after captures. Serialize the browser seat (feedback_browser_seat_singleton).

### KISS / parsimony

- The audit table is the SPEC; each row is evidence + a bounded fix.
- Fix the TYPE rule once in the chassis where the breakage class repeats; fewest lines is deleting
  a hand-rolled breakpoint stack.

### Non-goals

No dock component work (GF-DOCK). No engagement variants (family G). No overfit redesign (family
C). No new responsive PRIMITIVE (flag gaps to family C).

---

## BJ.W-STORY-TRANSITIONS — the typed transition grammar + the entrance register (NEW — RU-10 R7)

### Mission

The typed View-Transition channel is minted with exactly ONE type: `startViewTransition(…,
{ types: ["route"] })` at its single call site (`demo/chassis/routeTransition.ts:12`) and one CSS
recipe (`src/styles/view-transition.css:47-55` — old fades, new fades + rises 8px). Every
navigation — sibling story, category jump, landing→story descend, back — plays the identical 8px
rise. That is F07's "should be better defined, more expressive" stated structurally (AMEND-D-12).
This wave mints the semantic GRAMMAR over the existing machinery — it is Family D work because the
semantics DERIVE FROM THE TAXONOMY (sibling vs descend vs jump = `pageType` + manifest order +
depth) and the shared-element surfaces are this band's chassis (`SectionPreviewCard` → `StoryHero`).

**The seams (binding — see Boundaries):** `BAND-PERF` W4 stays the SENIOR owner of F07 choreography
FEEL (springs, curves, the route-pending affordance, the R3b latency cures — 119ms warm freeze /
CLS 0.04 / 186ms cold stall); this wave supplies the type-set and surfaces it rides, and the two
waves co-design (grammar lands with or before the choreography). **One mechanism per nav class
(APOTHEOSIS D-18):** PERF's OPEN-P10 in-wave decision CONSUMES this wave's four-type grammar —
descend/ascend ride THIS wave's shared-element VT; the pending floor + any `<Suspense>` goo-morph
land per PERF's ruling on the classes these types name; the assignment is recorded in BOTH files
so the two chartered mechanisms never land unassigned on one navigation. GF-DOCK W6 owns the dock
band (F06 + F05's dock half); dock routes are OUT of scope here.

### Exact scope

**In:**

| target | today (born-RED, re-verified) | the reform |
| --- | --- | --- |
| the type-set | ONE type at `routeTransition.ts:12`; ONE recipe at `view-transition.css:47-55` | mint FOUR semantic types (AMEND-D-12): `route-lateral` (+ `-back` direction class) — sibling story within a category, a short horizontal glide, direction from manifest order; `route-descend`/`route-ascend` — landing↔story, the tapped `SectionPreviewCard` is the shared element (`view-transition-name` stamped on tap; the group-class machinery exists at `view-transition.css:36-43`, and the consumer-owned route-morph seam is already doctrine — the retired-dock-recipe note `:64-76`), the tile grows into the page hero and shrinks back; `route-jump` — cross-category + dock/keyboard shortcuts, the current restrained rise |
| the degrade floor | PRM zeroes every VT animation (`view-transition.css:27-33`); callback-only Safari keeps the native crossfade | KEPT as the floor: reduced/unsupported = the instant swap — no second engine, no JS-animated fallback (no-masking-fallback) |
| the entrance register (AMEND-D-13, F05) | entrances vary per page; some shift layout ("improperly shifts the screen around") | entrances are COMPOSITOR-ONLY (opacity/transform) via the existing `.scroll-cascade*` / `v-reveal` registers; ZERO demo-local entrance `@keyframes`; ZERO layout-affecting entrance properties; one entrance grammar per section kind — a page never invents one |
| F05-aurora conformance | every route already resolves a field via `CATEGORY_DEFAULT_BG` (`manifest.ts:218`; ":255 covers every category") — the mechanism is law | a conformance CHECK across routes (the wave verifies, not invents); the one known defect (dock postures) is Wave 1's J2 row |

**Out (the seams, restated as scope):**

- Choreography feel, springs, pending states, latency — `BAND-PERF` W4 (senior on F07).
- The dock band's transition + the band-persistent-field / frame-0-palette cure — GF-DOCK W6
  (G-PAGE-NOFLASH / G-NO-LAYOUT-SHIFT); the RU-10 §6b cure candidates are routed there as inputs.
- Scroll-ANIMATION standard text — the scroll-collapse wave per J11 (see Judgment corrections; this
  wave is the named FALLBACK owner if ASK-4 declines the consolidation).

**File ownership:** this wave owns `routeTransition.ts` + the route section of
`view-transition.css`. PERF W4 owns the router/AppShell pending-state surfaces. No collision.

### Acceptance gates (born RED — the probe that reds each today)

| gate | born-RED probe (fails at HEAD) | GREEN condition |
| --- | --- | --- |
| G-TRANS-1 (the grammar) | `grep -n 'types:' demo/chassis/routeTransition.ts` → one call, one type (`"route"`, :12); `grep -c 'active-view-transition-type' src/styles/view-transition.css` → route-only (:47-55) | the four types exist in CSS and are dispatched by navigation semantics (taxonomy + manifest order); PRM/unsupported degrade to the instant swap |
| G-TRANS-2 (shared element) | no `view-transition-name` is stamped on any `SectionPreviewCard` tap | the landing→story descend rides a shared-element tile→hero; the reverse ascends back to the tile; captured live DELTA |
| G-TRANS-3 (entrance register) | demo-local entrance keyframes / layout-shifting entrances exist (F05); no conformance check | 0 demo-local entrance `@keyframes`; entrances compositor-only via the shared registers; the F05 page's DELTA captured |
| G-TRANS-4 (field conformance) | unverified route-field conformance | every route resolves a field (assert against `CATEGORY_DEFAULT_BG`); 0 bare-black story sections outside the dock band (J2 covers that one) |

### π / DELTA obligation

**Required — LIVE-DEFER discipline (RU-10).** Every claim here is a paint claim: captured
before/after DELTA per transition type (lateral, descend/ascend, jump) + the PRM floor, no
headless-only close. The liquid-weight law binds: the glide/descend must read with inertia and
weight, never a bare fade — and the descend rides gesture energy per codex law 8 (`:21`), with the
exit half asymmetric. Serialize the browser seat.

### KISS / parsimony

- FOUR types over ONE existing owner and ONE CSS channel — no new engine, no JS animation library,
  no per-page transition config. Direction derives from data already in the manifest.
- The shared-element machinery already exists (`view-transition-class` group recipe); this wave
  stamps names and writes CSS, nothing more.

### Non-goals

No choreography feel/pending (PERF W4). No dock-band work (GF-DOCK W6). No scroll-collapse standard
text (J11's owner; fallback rider only).

---

## OPEN markers

- **OPEN-D1 (Wave 1 ↔ Wave 4 order) — RECOMMENDATION STANDS:** Wave 1 lands the registry first;
  Wave 4 binds width/scale as per-variant config inside it. Wave 7 lands after Wave 1 (types drive
  semantics); it may run parallel to Waves 2-6.
- **~~OPEN-D2~~ RESOLVED (AMEND-D-11):** StoryBody is KEPT as the `spec` variant's data renderer
  (3 consumers at HEAD: badge/alert/select); expand where pure specimen-grid, retire only where
  genuinely bespoke. Not a family-C retire.
- **~~OPEN-D3~~ RESOLVED (AMEND-D-6):** F41 = `typewriter.vue:103`; neutral no-wrap string
  (G-COPY-5).
- **OPEN-D4 (mono-caption def disposition) — STANDS, leaning keep-for-the-one-role:** Wave 2
  sweeps demo call-sites only; the @utility def disposition is family F's.
- **~~OPEN-D5~~ RESOLVED (AMEND-D-7):** F09 container REMEDIATED at HEAD → G-CFG-4 is a
  REGRESSION-GUARD; the pill residual routes to family F.
- **OPEN-D6 (define vs collapse `--story-article-w`) — STANDS, leaning COLLAPSE** onto
  `--story-page-max-inline` (KISS; define only if `page` genuinely wants a narrower measure).
- **~~OPEN-D7~~ RESOLVED (AMEND-D-5):** the double-card is STRUCTURAL in
  `SectionPreviewCard.vue:35-54` — every card, not an intro-only mount. G-PRV-4 pins the component.
- **~~OPEN-D8~~ RESOLVED (AMEND-D-4):** there is no "cheap live" tier — the ladder is
  authored/still/identity, 0-GL by construction; family E's trace gates the boot cost (G-PRV-5).
- **OPEN-D9 (the `scene` type) — CONTINGENT, arithmetic corrected:** `scene` is minted ONLY if
  ASK-13/D1 keeps a composition. Under the adopted SIX-type fold, pruning makes the taxonomy
  **FIVE** (the draft's "6 if pruned / 7 if kept" rode the superseded seven-type list;
  ADJUDICATION-1 ruling 6's "taxonomy is 6" carried the same superseded arithmetic — substance
  stands, numbers re-anchor; flagged in the sidecar ROUTING).
- **OPEN-D10 (copy-canon home) — STANDS, leaning a NEW short precept** (family J owns
  `design-idioms.md`, whose §3/§7 rewrite rides COLOCATION W1 Precept F — avoid the collision).

**Lead adjudication (2026-07-17, perfection pass — SUPERSEDED-IN-SCOPE this union):** the prior
block adopted FABLE-STORY-FRAMEWORK amendments D-1..D-11 and §1-§6. The RU-10 REFABLE union
(2026-07-18) rewrote that document — §2.0/§6b/§6c and AMEND-D-12..D-17 are NEW, and three D-row
counts were corrected (studio 3-on-disk; family 5-with-dual-role; the "omits the root home"
retraction). **This union adopts the RU-10 document in FULL**; the band text above already folds
every amendment in place.

---

## Judgment corrections (JUDGE.md, 2026-07-17 — carried, with REFABLE annotations)

- **Dock-postures backdrop (J2 / D-F05 → Wave 1, the `dock` variant).** Carried in Wave 1's scope
  table. Citation re-anchored per RU-05 R8: the F05 split is ratified at the GF-DOCK union §5/§6
  (dock-shift half → G-NO-LAYOUT-SHIFT; aurora half → this band), superseding the PASS3 §1
  adjudication-table cite.

- **Configurator roominess gate (J10 / F09 → Wave 3).** Carried as G-CFG-6: the ADOPT wave asserts
  container min-width + section breathing room, two-pronged with the ladder widen.

- **Paper-backdrop disposition (J9 / D-A14 → BAND-REDUCTION).** `paper-backdrop`
  (`src/components/paper-backdrop/**`), an L5 procedural in A14's roster, carries no BJ
  disposition; route it into the reduction band's ≥2-consumer census (the A05 bar). **REFABLE
  residue (RF-6):** this row is a POINTER only — `BAND-REDUCTION` W1's enumerated census scope
  never received it; until the lead lands it there (sidecar ROUTING), A14's "none unowned" claim
  holds only via this pointer.

- **A06 scroll-animation standard (J11).** Codifies INSIDE the scroll-collapse wave (ASK-4/§C3,
  BAND-REDUCTION): the 9-survivor reader spine is the substrate; the standard's text is that
  wave's deliverable. **Conditional-owner rider (RU-13-A01-A17 N6, NEW):** if the user DECLINES
  the ASK-4 consolidation, the standard's fallback owner is THIS band's Wave 7 (the entrance/scroll
  register is the natural home) — a rider, not a contradiction.

---

## APOTHEOSIS amendments (RU-04 third judge, 2026-07-18)

Applied per `../formation/refable/REFABLE-RU-04-JUDGE.md`; the capstone is `APOTHEOSIS.md`.

- **D-01 (BLOCKER):** the charter's one-owner-per-file law gains its ONE stamped exception — the
  two landing SFCs run the ordered sub-sequence W1 → W4 → W5 (W1 settles file existence; W4/W5
  edit the surviving D0 as concern-slices; the W4/W5 landing pins re-anchor to the survivor; no
  gate may pin a file W1 retired). W4's W-2 row and W5's catalog-bypass row carry the annotation.
- **D-06:** W5's tile idle posture re-worded — "inert" no longer pre-decides the idle-engagement
  axis; the posture consumes the OPEN-FM-3 user ruling (G-PRV-5 satisfied either way).
- **D-18:** W7's seam text gains the one-mechanism-per-nav-class clause consuming/feeding PERF
  OPEN-P10, recorded in both files.
- **MECH-06:** the standing-gate posture line added (zero standing gates; G-CFG-4/G-PRV-5 are
  named regression-guards, not standing vitest).
