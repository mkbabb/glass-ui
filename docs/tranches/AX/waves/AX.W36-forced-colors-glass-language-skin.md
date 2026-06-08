# AX.W36 — Forced-colors / Windows-High-Contrast glass-language skin

**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00, AX.W09 · **Charter** AX.md §3 (the
`### AX.W36` block, lines 1747-1769) + the §1 summary row (line 146) + §2 band-G membership (lines 183-184)
+ §2b band-G precept row (line 219) + §4 note 22 (the DEDUP ledger — "forced-colors skin → **W36**", line
2172) · **Audit** `constellation-analysis-corpus.json` `result[5]` (`hist:muster` — the K atmosphere-a11y
design slice: observation lines 454-458, the `foldIntoWaves` route line 488, the `newWavesProposed` block
lines 496-500) + `deep-audit-corpus.json` slice `css-monolith` (index ~25b, lines 1861-1863 — the
`utilities.css` media-query grab-bag carrying the AS-era forced-colors block) · **Precept**
`docs/precepts/` @ `63240e6` (substrate-with-consumer, no-overfitting, one-path/no-legacy-code,
fail-explicit-vs-befitting-silent, π visual-runtime lane, documentation-is-part-of-the-change).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED at HEAD `eaba94f` on a single falsifiable witness: **the glass language has NO
forced-colors structure-survival skin — the only `@media (forced-colors: active)` block in the shipped CSS
is the AS-era focus-ring/silhouette fallback, and it covers exactly three selectors, none of which carry
the glass-material tier panes, the StatusDot hue-identity glyph, or the menu/popover floating surfaces.**

- **RED witness 1 (the structure-survival skin is ABSENT — the live forced-colors render collapses).**
  `src/styles/utilities.css:1084-1102` is the ONLY forced-colors block in `src/styles/`. It restores (a) a
  `2px solid Highlight` outline on five focus-visible selectors (`.focus-ring`, `.glass-btn`,
  `.interactive-item`, `.input-pill`) and (b) a `1px solid CanvasText` border on three silhouette carriers
  (`.hairline-accent`, `.glass-dock`, `.glass-card`). It does NOT touch the FIVE-RUNG glass-material ladder
  (`.glass-material`/`.glass-wash`/`.glass-quiet`/`.glass-resting`/`.glass-floating`/`.glass-overlay`,
  defined `glass.css:54-59`), the StatusDot meaning-bearing hue glyph, the metric/notification status
  chroma, or the dropdown/popover/dialog floating surfaces. The falsifiable RED: *`grep -rc "forced-colors"
  src/styles/` returns exactly ONE file (`utilities.css`) with ONE block; `grep -n "glass-material\|glass-wash\|glass-quiet\|glass-resting\|glass-floating\|glass-overlay" src/styles/utilities.css`
  inside that block returns NONE; `grep -n "status-dot\|StatusDot" <the forced-colors block>` returns NONE.*
  Under Windows-High-Contrast (WHC) the runtime consequence is device-proven by the muster K slice: WHC
  drops `backdrop-filter`, drops the `--glass-*` inset `box-shadow` rungs, makes Aurora `aria-hidden`+gone,
  and flattens all meaning-bearing chroma (status dots / hue identity) to a single system color — so a
  `.glass-floating` Dialog over a `.glass-resting` Card reads as TWO transparent rectangles with no edge, a
  green-vs-red StatusDot reads as ONE indistinguishable dot, and the visual hierarchy evaporates. The
  born-RED close-witness is a **Playwright `forcedColors: 'active'` readback** (the π lane, W00): the
  `getComputedStyle` of a `.glass-floating` pane's `border-style` is `none` (RED — no CanvasText edge), and
  two StatusDots of different `status` resolve the SAME painted fill with no distinguishing border (RED).

- **RED witness 2 (the AS-era block is focus-only by its own commentary — the gap is acknowledged, never
  closed).** The block's header comment (`utilities.css:1070-1083`) scopes itself explicitly to "the glass
  focus rings (box-shadow + `outline: none`) vanish" and "Structural edges borne ONLY by box-shadow … also
  vanish" — i.e. it is a focus-ring + silhouette-edge patch, not a glass-language skin. The muster K slice
  (`WC-design-atmosphere-a11y.md:16,61-69`, cited corpus line 456) independently confirmed "0 forced-colors
  hits in glass-ui dist" for the GLASS LANGUAGE as of 3.1.0, with the focus-ring rung as the sole survivor.
  RED: the obligation is named in the constellation audit (`result[5]` action line 458 routes it to a NEW
  AX wave) and ZERO of the 34 pre-CONVERGE AX waves carried any forced-colors coverage (charter line 1763).

After the wave: a single co-located forced-colors skin (riding W25b's `glass-material.css`) GENERALIZES the
focus-ring block to the whole glass language — tier panes resolve a `CanvasText` border, StatusDot resolves
a bordered system glyph that preserves green-vs-red-vs-amber meaning via shape/border (NOT chroma), focus
resolves `Highlight`, floating surfaces resolve an edge — and `proof:forced-colors-skin` (π-lane,
`forcedColors:'active'`) is GREEN.

---

## Goal

Ship one library-level `@media (forced-colors: active)` skin for the entire glass language so structure,
hierarchy, and meaning survive when the glass evaporates under Windows-High-Contrast — tier panes → boxed
`CanvasText` regions, hue identity → bordered glyphs that preserve meaning without chroma, focus →
`Highlight`, glass/backdrop chrome → graceful no-op — proven on a live `forcedColors:'active'` π-lane pass,
never a headless CSS-presence grep.

---

## Scope (the gestalt fix from the audit — no workaround, no legacy, precise + architectural)

The root cause is ONE class: **the glass language is a decorative chrome system (backdrop-filter +
`--glass-*` inset box-shadows + meaning-bearing chroma) that WHC strips wholesale, and glass-ui ships no
fallback that preserves the STRUCTURE the chrome encoded.** The fix is NOT presets-in-consumer (a universal
a11y obligation the precept does not delegate — corpus line 458) and NOT a per-component patch (that
re-fragments the same gap). It is ONE co-located skin that generalizes the existing AS-era focus-ring block
into a structure-survival grammar for the whole ladder. Four folds:

**(1) GENERALIZE the AS-era focus-ring block into the glass-material structure-survival skin (the headline).**
The existing `@media (forced-colors: active)` block (`utilities.css:1084-1102`) is the SEED: it already
knows the canonical degradation pattern (outline → `Highlight`, silhouette → `1px solid CanvasText`). The
gestalt fix EXTENDS the same media query to the five-rung glass-material ladder so every tier pane that
relied ONLY on `backdrop-filter` + inset `box-shadow` for its edge gains a real `border: 1px solid
CanvasText` (the ladder selectors are already grouped at `glass.css:54-59`/`80-85` — the skin re-uses that
EXACT selector group, not a new hand-rolled list). The decorative `::before` specular/grain pseudo-elements
(the W09-tuned moving catch-light) `display: none` under WHC (they paint nothing meaningful when chroma
collapses; this is the `forced-color-adjust` graceful-yield the existing block's comment already documents
at `:1079-1080` — glass chrome is decorative and yields to the user's forced palette). The `.dark` arm is
IRRELEVANT under WHC (the user's forced palette supersedes light/dark) — the skin does NOT re-declare a
`.dark` forced-colors fork (one path).

**(2) DEGRADE meaning-bearing hue identity to a bordered glyph — preserve MEANING without chroma (the
load-bearing a11y fold).** StatusDot/MetricBadge/Notification encode meaning in COLOR (green=ok, red=error,
amber=warn) — WHC flattens all three to ONE system color, destroying the distinction. The fix leans on the
`role="img"` + `aria-label` contract StatusDot ALREADY ships (`StatusDot.vue:3` —
`:role="$attrs['aria-label'] != null ? 'img' : undefined"`, so the accessible name is already present): the
skin gives the dot a `border: 1px solid CanvasText` + a status-distinguishing NON-CHROMA cue (a border
weight / fill via `Mark`/`GrayText`/`CanvasText` system-color triplet, or a small shape differentiation)
so a screen-reading user has the label AND a sighted WHC user can still tell ok-from-error by structure, not
hue. This is the corpus-named "hue dots → bordered glyphs (role=img labels already present)" fix (line 458,
499). Notification/MetricBadge status-tint surfaces resolve a `CanvasText` border on the same principle.

**(3) RESTORE edges on the floating/overlay surfaces (Dialog/Sheet/Popover/DropdownMenu/HoverCard) so the
hierarchy survives.** A `.glass-floating`/`.glass-overlay` Dialog over a `.glass-resting` Card is TWO
borderless transparent rectangles under WHC. The skin gives the floating/overlay rungs (and the menu/popover
content surfaces that compose them) a `CanvasText` border + the canonical `Canvas` background so the modal
reads as a distinct boxed region over the page (the same boxed-region pattern the corpus names for tier
panes, line 499). Focus rings inside those surfaces inherit the generalized `Highlight` outline (fold 1 —
the existing five focus-visible selectors EXTEND to the broader interactive-surface set, no new fork).

**(4) CO-LOCATE the skin with the glass-material grammar (riding W25b, NOT a monolith addition).** Per the
charter (line 1758-1759) the skin co-locates with the glass-material CSS — it MUST NOT be a new orphan block
bolted onto the `utilities.css` grab-bag (the very god-module the W25b carve dissolves; corpus lines
1861-1863). W25b renames `glass-specular-track.css` → `glass-material.css` (charter line 1329) and relocates
the `utilities.css` media-query family into `utilities/media.css` (corpus line 1863). The forced-colors skin
lands in the glass-material grammar's home (`glass-material.css`, the renamed file) as a `@media
(forced-colors: active)` block adjacent to the ladder definitions it skins, NOT in `utilities.css`. The
AS-era focus-ring rung either (a) MOVES into `utilities/media.css` per the W25b carve and the glass-language
extension lives in `glass-material.css` (two cohesive homes — focus-survival is a utility, tier-survival is
a glass-material concern), OR (b) the whole forced-colors family consolidates into one home per the W25b
carve plan — RATIFY against the W25b sequencing (see Open questions). EITHER way the skin is co-located with
its owning grammar, never a fragment in the monolith.

**`forced-color-adjust: none` is NOT used (the precept-correct yield).** Per the existing block's commentary
(`:1079-1080`) and css forced-colors guidance, glass-ui's chrome is DECORATIVE and YIELDS to the user's
forced palette — the skin restores STRUCTURE (borders/outlines/system colors) and lets the user's palette
win on color. It does NOT pin glass-ui's brand colors through `forced-color-adjust: none` (that would defeat
the user's accessibility choice). The only system colors used are the standard WHC keywords (`CanvasText`,
`Canvas`, `Highlight`, `Mark`, `GrayText`, `LinkText` as applicable) — no glass-ui token leaks into the WHC
arm.

**Charter-flagged decisions to RATIFY (recorded recommended path, marked RATIFY-BEFORE-IMPL):**
- **Skin home: `glass-material.css` vs a consolidated `utilities/media.css` forced-colors family** →
  recommended LAND the glass-language extension in `glass-material.css` (co-located with the ladder it
  skins) and let the focus-ring rung ride W25b's `utilities/media.css` carve; RATIFY against the W25b carve
  plan so the two waves do not double-own the forced-colors family. (See Disjointness vs W25b + Open
  questions.)
- **StatusDot non-chroma differentiation cue (border-weight vs shape vs system-color triplet)** →
  recommended the system-color triplet (`Mark`/`GrayText`/`CanvasText`) keyed off the existing `status` /
  `data-status` attribute so ok/warn/error stay distinguishable by a WHC-honored system color, NOT a
  glass-ui hue. RATIFY the exact triplet mapping against the WHC palette legibility (verified live in the
  π-lane pass).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/glass-material.css` (the W25b-renamed `glass-specular-track.css`; OR `glass.css` if W25b's rename has not landed at dispatch — RATIFY the target file vs the W25b sequence) | **ADD** the `@media (forced-colors: active)` glass-language skin: the five-rung ladder (`.glass-material`/`-wash`/`-quiet`/`-resting`/`-floating`/`-overlay`) → `border: 1px solid CanvasText`; the decorative `::before` specular/grain pseudo-elements → `display: none`; the floating/overlay rungs → `Canvas` background + `CanvasText` edge (fold 1 + 3). Co-located with the ladder definitions. |
| `src/styles/utilities.css` (OR `src/styles/utilities/media.css` if the W25b carve has landed) | **GENERALIZE** the existing AS-era forced-colors block (`:1084-1102`): EXTEND the `Highlight` focus-outline selector set to the broader interactive-surface set; the silhouette-border rung either MOVES to the W25b `utilities/media.css` home or STAYS as the focus/utility-scoped rung (RATIFY the split). NO duplicate forced-colors block — extend the seed, do not fork. |
| `src/components/custom/status-dot/StatusDot.vue` · `src/styles/` (status-dot's owning CSS) | **ADD** the forced-colors degradation: `border: 1px solid CanvasText` + the status-distinguishing non-chroma cue (system-color triplet keyed off `status`/`data-status`). The `role="img"`+`aria-label` already ships (`:3`) — NO accessible-name change, only the WHC visual differentiation. |
| `src/styles/` (notification / metric-badge owning CSS — the status-tint surfaces) | **ADD** the `CanvasText` border on the meaning-bearing status-tint surfaces so the chroma collapse does not erase the surface edge (fold 2 — only the WHC arm; no rest-state change). |
| `scripts/proof-forced-colors-skin.mjs` | **NEW** — the π-lane `forcedColors:'active'` Playwright readback gate (born-RED at HEAD; tier-pane `CanvasText` border, StatusDot bordered+distinguishable, focus `Highlight`, no meaning-bearing surface vanishes). Registration in `gates.mjs` → routed to W33. |
| `docs/tranches/AX/audit/W36-forced-colors-skin.json` | **NEW** — the born-RED→GREEN ledger + the muster K cross-repo evidence + the RATIFY dispositions + the paired-π forced-colors capture. |
| `demo/stories/` (the forced-colors proof section, if a dedicated demo route is warranted for the π-lane render) | **OPTIONAL** — a story toggling `forced-colors` emulation OR the audit renders the existing glass-ladder/StatusDot stories under `forcedColors:'active'` (no new story needed if the existing ladder story suffices — RATIFY against the W18 IA). |

**OUT of bounds:** the W09 specular `::before` GRADIENT retune (W09 owns the rest-state catch-light
magnitude + the `--glass-specular-intensity-*` token cohort + the Card `specular` prop — W36 only
`display: none`s the pseudo-element UNDER WHC, it does NOT touch the rest-state gradient); the W25b CSS-carve
RENAME mechanics + the `utilities.css` grab-bag dissolution (W25b owns the rename + the media-query
relocation — W36 lands its skin in the post-rename home, coordinated, but does not perform the carve); the
StatusDot `role="img"` accessible-name contract (already shipped AN.W4 — W36 only adds the WHC VISUAL
differentiation, not the ARIA); the `proof:forced-colors-skin` REGISTRATION in the release gate-fleet (W33
owns gate-fleet registration — W36 AUTHORS + born-RED→GREEN-proves it); the Aurora/GooBlob WHC behaviour
(Aurora is `aria-hidden` + decorative; WHC gracefully drops the canvas — no glass-ui edit, the substrate's
befitting-silent browser-API degradation, never a fail-explicit throw).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W09 (specular tune-to-subtle — W36 dependsOn W09).** BOTH touch the glass-material `::before`
  pseudo-element, BUT in disjoint axes: W09 retunes the REST-STATE gradient magnitude (the
  `--glass-specular-intensity-{rest,hover,active}` token cohort + the warm-cream low-alpha core) at
  `glass.css .glass-material::before`; W36 only adds a `display: none` for that pseudo under the
  `@media (forced-colors: active)` arm (the chrome yields under WHC). **Disjoint by media-query arm** — W09
  owns the NORMAL-mode gradient + tokens; W36 owns the WHC-mode no-op. W36 sequences AFTER W09 so the
  specular source is already settled at its single unified home (the W09 `useSpecularTracking` extraction +
  the Card `specular` prop) and W36's `display: none` targets the FINAL pseudo-element, not a mid-churn one.
  W36 does NOT touch any `--glass-specular-intensity-*` token. (Charter dependsOn AX.W09, line 1748.)
- **vs W25b (CSS monolith carves — utilities.css RELOCATE + the `glass-specular-track.css` →
  `glass-material.css` rename).** This is the LOAD-BEARING coordination. W25b renames the specular-track
  file to `glass-material.css` (charter line 1329) and RELOCATES the `utilities.css` media-query family
  (reduced-motion + forced-colors + coarse-pointer) into `utilities/media.css` (corpus line 1863). W36's
  skin co-locates with the glass-material grammar (charter line 1758-1759 — "rides the W25b
  `glass-material.css` rename, not a monolith addition"). **Disjoint by ownership IF sequenced** — W25b owns
  the file RENAME + the media-query RELOCATION; W36 owns the forced-colors SKIN CONTENT. The collision risk:
  both touch the forced-colors family location. **Resolution:** W36 sequences AFTER W25b so the skin lands
  in the FINAL home (`glass-material.css` + `utilities/media.css`), not the pre-rename `glass-specular-track.css`
  / monolithic `utilities.css`. IF the orchestrator dispatches W36 BEFORE W25b lands, W36 lands the skin in
  the CURRENT homes (`glass.css` / `utilities.css`) and W25b RELOCATES it as part of its carve (W25b's carve
  must then carry the W36 skin block as a relocation target). RATIFY the sequence at dispatch (see Open
  questions); note in the W36 audit json which home was used so W25b's relocation is not surprised. W36 does
  NOT perform the rename or the carve; W25b does NOT author the skin content. (Charter dependsOn does NOT
  list W25b — the co-location is a SEQUENCING coordination, not a hard predecessor; the skin is authorable in
  either home.)
- **vs W19/W20/W21/W22 (sibling band-G primitive waves).** **Fully disjoint by surface** — W19 prunes
  header-ribbon/glyph-face/disco-glyph; W20 fixes native-top-layer/Card-toggles/GlassPanel-retire; W21
  reconciles configurator/drawer/metric-pill/use-token-color; W22 reconciles fonts. NONE touch the
  forced-colors arm or the glass-material WHC degradation. The ONLY shared touch-point is StatusDot (W36 adds
  its WHC arm) — no sibling band-G wave touches StatusDot. The W20 GlassPanel-retire-onto-`.glass-material`
  is COMPATIBLE: GlassPanel surfaces that become `.glass-material` divs inherit W36's WHC border for free
  (the skin keys off the ladder selector, not the component) — a synergy, not a collision. Coordinate the
  shared `src/styles/` directory at merge (different files).
- **vs W00 (π visual-runtime lane — W36 dependsOn W00).** W00 stands up the fail-CLOSED π workspace + the
  `forcedColors:'active'` Playwright capability. W36's `proof:forced-colors-skin` RUNS IN that workspace
  (the home of the live forced-colors readback). **Disjoint by ownership** — W00 owns the lane machinery +
  the paired-π BEFORE/AFTER protocol; W36 owns the forced-colors gate + its assertions. W36 does NOT modify
  the π-lane harness, it adds one gate to it.
- **vs W33 (close — gate-fleet registration).** W33 registers `proof:forced-colors-skin` in
  `proof:ax-final` + the release gate-fleet. **Disjoint by action** — W36 AUTHORS + proves the gate
  born-RED→GREEN; W33 wires it into the fleet manifest. File-disjoint (W36: the gate script; W33: the
  manifest registration).
- **vs W34 (cross-constellation idiom-maximization receiver).** The muster K consumer (the original
  finding's reporter) re-adopts the glass-ui forced-colors skin once it ships (muster currently carries ZERO
  forced-colors + hand-rolls nothing — it simply has the gap). **Disjoint by ownership** — W34 receives the
  muster adoption leg (muster pin-bumps to the AX cut + inherits the skin for free, no muster src edit
  needed since the skin is library-CSS-level); W36 ships the library skin. The muster adoption is a
  pin-bump, not a consumer code change (the skin auto-applies to every `.glass-*` surface muster mounts).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (the glass-language skin — the headline): ADD the
  `@media (forced-colors: active)` block to `glass-material.css` (the W25b-renamed home, or `glass.css`
  pre-rename) generalizing the five-rung ladder → `CanvasText` borders + the `::before` `display: none` +
  the floating/overlay `Canvas` background; GENERALIZE the existing `utilities.css` focus-ring block's
  `Highlight` selector set to the broader interactive surface. Arm B (the meaning-bearing chroma → bordered
  glyph): ADD the StatusDot WHC arm (`CanvasText` border + the system-color triplet keyed off `status`,
  preserving ok/warn/error distinction by structure not hue) + the Notification/MetricBadge status-tint
  border. `npm run build` (the `/styles` bundle must carry the new block) + a visual check at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the RED witness against the patched tree under
  `forcedColors:'active'`: asserts every glass-material ladder rung resolves a `CanvasText` border (not
  `none`); asserts two StatusDots of DIFFERENT `status` resolve DISTINGUISHABLE painted output (different
  system color OR border treatment — not the same flat dot); asserts the floating Dialog over a resting Card
  reads as two distinct boxed regions; asserts focus resolves `Highlight`. ADVERSARIAL twists: (a) tries to
  "pass" with `forced-color-adjust: none` pinning glass-ui's brand colors (confirms the gate REJECTS it —
  the chrome must YIELD to the user's palette, the skin restores STRUCTURE not glass-ui color); (b) confirms
  the skin does NOT regress the NORMAL-mode render (the `@media (forced-colors: active)` arm is inert outside
  WHC — a normal-mode screenshot is byte-identical to pre-wave); (c) confirms the StatusDot accessible-name
  (`role="img"`+`aria-label`) is UNCHANGED (W36 adds only the WHC visual, not the ARIA — the screen-reader
  experience is identical); (d) confirms a `.glass-material` div that became one via the W20 GlassPanel
  retire inherits the WHC border for free (the skin keys off the selector, the synergy holds).
- **Gate-author (≤1 agent — net-new π-lane gate).** AUTHORS `proof:forced-colors-skin`
  (`scripts/proof-forced-colors-skin.mjs`): launch Playwright with `forcedColors: 'active'`, navigate to the
  glass-ladder + StatusDot + Dialog-over-Card render, read back `getComputedStyle` of each tier pane's
  `border-style`/`border-color` (assert a real `CanvasText`-resolved border, born-RED at HEAD where it is
  `none`), read back two StatusDots' painted fill/border (assert distinguishable), read back a
  focus-visible outline (assert `Highlight`). Confirms the gate FAILS at `eaba94f` (no skin) and PASSES on
  the patched tree; routes the gate REGISTRATION to W33. This is a RUNTIME-readback gate (the precept-valid
  form — NOT a `grep "forced-colors" src/styles/` source-string gate, which a collapsed live render would
  pass; corpus line 458/499 explicitly demands the Playwright visual-truth pass).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`npm run build` GREEN** — the `/styles` bundle (`dist/glass-ui.css`) carries the new `@media
   (forced-colors: active)` glass-language block. A build artefact.
2. **`proof:forced-colors-skin` (NET-NEW, born-RED at HEAD) — a π-lane `forcedColors:'active'` Playwright
   readback.** Launches the real browser with `forcedColors: 'active'`, renders the glass-material ladder +
   StatusDot pair + a floating-surface-over-resting-surface composition, and reads back the PAINTED result:
   (a) every glass-material tier pane resolves a non-`none` `border` keyed to `CanvasText`; (b) two
   StatusDots of different `status` resolve DISTINGUISHABLE output (a different system color or border
   treatment — meaning survives without chroma); (c) a focus-visible element resolves a `Highlight` outline;
   (d) no meaning-bearing surface resolves a fully-transparent borderless box. **Born-RED** at `eaba94f`: the
   ladder panes resolve `border-style: none`, the two StatusDots resolve an identical flat fill (the chroma
   collapse). **GREEN** after the skin. A RUNTIME-readback artefact (the precept-valid form — explicitly NOT
   a source-string grep, which a collapsed render passes). Registration → W33.
3. **A normal-mode non-regression check** — a screenshot (or computed-style) of the glass ladder OUTSIDE
   forced-colors is byte-identical to pre-wave (the `@media (forced-colors: active)` arm is inert outside
   WHC; the skin adds ZERO normal-mode change). A test/diff artefact.

These are build / runtime-readback / diff artefacts (the precept-valid forms per SPEC.md §Hard Gates) — NOT
a `grep "forced-colors"` source-string-as-behaviour gate (which the corpus, line 458, explicitly warns a
collapsed live render would pass — "a headless CSS-presence grep does NOT catch a collapsed render", charter
line 1768-1769).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass with **`forcedColors: 'active'` emulation** (the Windows-High-Contrast simulation
Chromium ships), at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900), over the canonical glass surfaces:
- **The glass-material ladder under WHC reads as distinct boxed regions** — a `.glass-floating` Dialog over a
  `.glass-resting` Card over a `.glass-wash` page reads as THREE nested bordered boxes with legible
  hierarchy (NOT three transparent rectangles); every tier pane has a visible `CanvasText` edge; the
  decorative specular/grain `::before` is gone (no ghost gradient); affordance/hierarchy/spacing hold, no
  content occlusion.
- **The StatusDot row preserves meaning without chroma** — a row of ok/warn/error/info StatusDots renders
  with DISTINGUISHABLE borders/system-colors so a sighted WHC user can still tell them apart (NOT one flat
  indistinguishable dot row); the `role="img"`+`aria-label` is intact (a screen-reader pass confirms the
  label still announces).
- **Focus survives** — keyboard-tabbing through buttons/inputs/menu-items under WHC shows a `Highlight`
  outline on every focus-visible target (the generalized focus-ring rung).
- **The NORMAL-mode render is unchanged** — toggling forced-colors OFF returns the exact pre-wave glass
  aesthetic (the skin is a pure WHC-arm addition; the W09-tuned specular is untouched outside WHC).

The audit captures a **paired-π BEFORE/AFTER + DELTA** (the W00 protocol): the WHC render before (collapsed
borderless transparent boxes + indistinguishable dots) → after (legible bordered hierarchy + distinguishable
status glyphs), at ≥ 3 viewports, as the binding close artefact under `docs/tranches/AX/audit/`. **The wave
does NOT close on the headless gate alone** — the executed live forced-colors audit is the binding close
criterion (a CSS-presence grep cannot catch a render that paints the skin but still collapses visually).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the RED witness against HEAD `eaba94f` live:
   render the glass ladder + StatusDot pair + a Dialog-over-Card under `forcedColors:'active'` in the π lane
   and CAPTURE the collapsed render (borderless transparent panes + indistinguishable dots) as the born-RED
   baseline in `audit/W36-…json`. Confirm the AS-era focus-ring block (`utilities.css:1084-1102`) is the sole
   forced-colors block + covers none of the ladder/StatusDot/floating surfaces. RATIFY the two decisions
   (skin home `glass-material.css` vs consolidated `utilities/media.css`; the StatusDot non-chroma cue) +
   the W25b sequence (skin lands in the post-rename home OR the current home with a relocation note).
2. **GENERALIZE the focus-ring block + ADD the ladder skin (fold 1 + 3, Arm A).** Extend the existing
   `Highlight` focus-outline selector set; add the five-rung ladder → `CanvasText` border + the `::before`
   `display: none` + the floating/overlay `Canvas` background, co-located in `glass-material.css` (or the
   current home per RATIFY). `npm run build` (the `/styles` bundle carries it).
3. **DEGRADE the meaning-bearing chroma to bordered glyphs (fold 2, Arm B).** Add the StatusDot WHC arm
   (`CanvasText` border + the system-color triplet keyed off `status`, preserving ok/warn/error distinction)
   + the Notification/MetricBadge status-tint border. `npm run build`.
4. **AUTHOR `proof:forced-colors-skin` (born-RED→GREEN).** The π-lane `forcedColors:'active'` readback gate;
   confirm it FAILS at `eaba94f` and PASSES on the patched tree; route registration to W33.
5. **Gates GREEN + the VISUAL-TRUTH live audit.** Confirm `npm run build`, `proof:forced-colors-skin`, and
   the normal-mode non-regression check all GREEN; run the live `forcedColors:'active'` Playwright +
   frontend-design pass over the glass ladder / StatusDot row / Dialog-over-Card / focus-tab at ≥ 3
   viewports; capture the paired-π BEFORE/AFTER + DELTA; write `audit/W36-…json` to GREEN; record the W25b
   relocation note (which home the skin used) + the muster adoption route (pin-bump, → W34).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W36-forced-colors-skin.json` — the born-RED→GREEN ledger: the RED witness (the
  collapsed WHC render — borderless panes + indistinguishable dots, with the π-lane baseline screenshots),
  the muster K cross-repo evidence (`WC-design-atmosphere-a11y.md:16,61-69` + the `result[5]` action), the
  per-fold disposition (ladder skin / hue-glyph degradation / floating-surface edges / co-location home), the
  two RATIFY dispositions (skin home; StatusDot cue), the W25b relocation note (which home the skin landed
  in + whether W25b must relocate it), the muster adoption route (pin-bump → W34), and the post-wave GREEN
  measurements (the tier-pane `CanvasText` borders, the distinguishable StatusDots, the `Highlight` focus).
- The `proof:forced-colors-skin` gate script (`scripts/proof-forced-colors-skin.mjs`) + its born-RED
  evidence (the `border-style: none` panes + identical-fill dots at HEAD) → GREEN evidence (the bordered
  legible render).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the WHC glass-ladder + StatusDot-row +
  Dialog-over-Card render before (collapsed) → after (legible bordered hierarchy + distinguishable glyphs),
  at ≥ 3 viewports; plus the normal-mode non-regression screenshot pair (byte-identical).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(a11y): W36 born-RED baseline — the glass language has NO forced-colors structure-survival skin (collapsed WHC render) (AX.W36)`
2. `feat(a11y): forced-colors glass-language skin — generalize the focus-ring block to the five-rung ladder + CanvasText tier-pane borders + floating-surface edges, co-located in glass-material.css (AX.W36)`
3. `feat(a11y): forced-colors meaning-survival — StatusDot/Notification/MetricBadge hue identity degrades to a bordered system-color glyph (role=img label intact) (AX.W36)`
4. `test(a11y): proof:forced-colors-skin π-lane forcedColors:active readback gate, born-RED→GREEN (AX.W36)`
5. `chore(AX.W36): audit ledger GREEN + paired-π forced-colors BEFORE/AFTER capture + W25b relocation note + muster adoption route to W34`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the charter dependsOn (AX.md:1748).** The fail-CLOSED π workspace +
  its `forcedColors:'active'` Playwright capability is the HOME of both the `proof:forced-colors-skin` gate
  and the binding live forced-colors audit. The corpus explicitly demands "a Playwright forcedColors:'active'
  visual-truth pass on the π lane" (line 458/499) — a headless CSS grep cannot catch a render that paints
  the skin but still collapses (charter line 1768-1769). Without W00 there is no fail-CLOSED home for the
  readback gate; the wave's close criterion (the live forced-colors audit) cannot run.
- **AX.W09 (specular tune-to-subtle) — the charter dependsOn (AX.md:1748).** W09 settles the glass-material
  `::before` specular at its single unified source (the warm-cream low-alpha core + the
  `--glass-specular-intensity-*` token cohort + the `useSpecularTracking` extraction + the Card `specular`
  prop). W36's skin `display: none`s that pseudo-element under WHC — it must target the FINAL specular
  source W09 produced, not a mid-churn one (the W09 retune touches the EXACT `.glass-material::before` rule
  W36's WHC arm suppresses). Sequencing after W09 keeps the two waves' edits to that pseudo-element disjoint
  by media-query arm (W09: normal-mode gradient; W36: WHC no-op).
- **Coordination (NOT a hard charter dependsOn):**
  - **AX.W25b (CSS monolith carves + the `glass-specular-track.css` → `glass-material.css` rename)** — the
    charter scope (line 1758-1759) says the skin "rides the W25b `glass-material.css` rename". This is a
    SEQUENCING coordination (the skin is authorable in either home), not a hard predecessor — W36 sequences
    AFTER W25b to land the skin in the final `glass-material.css` + `utilities/media.css` homes, OR lands it
    in the current homes with a relocation note for W25b to carry. RATIFY the sequence at dispatch (see
    Disjointness + Open questions). The charter dependsOn deliberately does NOT list W25b (the skin does not
    REQUIRE the rename to be correct — it requires the rename to not collide).
  - **AX.W20 (GlassPanel retire onto `.glass-material`)** — a synergy: GlassPanel surfaces that become
    `.glass-material` divs inherit W36's WHC border for free (the skin keys off the selector). No blocking
    dependency; W36 records it as a beneficiary, not a predecessor.
  - **AX.W33 (close)** registers `proof:forced-colors-skin` in the release gate-fleet (W36 authors + proves
    it born-RED→GREEN; W33 wires it into `proof:ax-final`).
  - **AX.W34 (idiom-maximization receiver)** receives the muster adoption leg (muster pin-bumps to the AX
    cut + inherits the library skin with no muster src edit — the skin auto-applies to every `.glass-*`
    surface muster mounts).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`src/styles/utilities.css:1070-1102` (the AS-era forced-colors block, "AQ.W2 §5")** — the SEED the
  skin generalizes. AQ.W2 shipped the focus-ring + silhouette-edge forced-colors fallback (outline →
  `Highlight`, `.hairline-accent`/`.glass-dock`/`.glass-card` → `1px solid CanvasText`) but scoped it
  explicitly to the focus-ring/silhouette case (its own header comment, `:1070-1083`). The glass-material
  ladder / StatusDot hue identity / floating surfaces were never covered — the gap W36 closes by extending
  the SAME media query, not forking a parallel one. The block's `forced-color-adjust: none` deliberate-NON-use
  commentary (`:1079-1080`) is the precept-correct "chrome yields to the user's palette" pattern W36 inherits.
- **muster `docs/tranches/K/design/WC-design-atmosphere-a11y.md:16,61-69` (the R4 forced-colors headline)** —
  the cross-repo finding's origin: the muster K atmosphere-a11y design slice (authored but unrun — K is
  dev-only) confirmed "0 forced-colors hits in glass-ui dist" for the GLASS LANGUAGE as of 3.1.0, with the
  focus-ring rung as the sole survivor. The slice is the load-bearing evidence that this is a LIBRARY-LEVEL
  a11y hole (not muster-local) — muster simply has the gap and inherits the fix on a pin-bump (corpus line
  455-458, the constellation `result[5]` observation + the `foldIntoWaves` route line 488 + the
  `newWavesProposed` block lines 496-500).
- **`StatusDot.vue:3` (`:role="$attrs['aria-label'] != null ? 'img' : undefined"`, AN.W4)** — the
  role-on-intrinsic-primitive contract: StatusDot already emits `role="img"` when the consumer binds
  `aria-label` (the decorative case stays role-free). The accessible NAME is therefore ALREADY present —
  W36 adds only the WHC VISUAL differentiation (the bordered glyph), riding the existing ARIA. This is why
  the corpus says "bordered glyph (role=img already present)" (line 458/499) — the meaning-survival fold is
  a CSS-only addition, not an ARIA re-author.
- **`deep-audit-corpus.json` slice `css-monolith` (lines 1861-1863)** — the `utilities.css` grab-bag
  (1119 lines, "four media queries (reduced-motion, forced-colors, coarse-pointer)") the W25b carve
  dissolves into `utilities/media.css`. W36 must NOT bolt its skin onto that monolith (the very god-module
  being carved) — it co-locates with the glass-material grammar (charter line 1758-1759), the architectural
  reason the skin lands in `glass-material.css` not `utilities.css`.
- **§4 note 22 (the DEDUP ledger, AX.md:2169-2181)** — "forced-colors skin → **W36**" (line 2172): the
  constellation digest emitted the forced-colors skin as a NEW-WAVE candidate; the CONVERGE dedup routed it
  to W36 (a dedicated band-G a11y wave) rather than folding it into W09 (specular) + W25b (CSS carves) — the
  corpus `newWavesProposed` block (lines 496-500) flagged it "Proposed only if AX leadership judges it too
  large to fold cleanly into AX.W09+W25"; leadership judged it a clean standalone wave.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: one forced-colors block
  (`utilities.css`), focus-ring + silhouette only; zero glass-material/StatusDot/floating-surface WHC
  coverage; the glass language collapses under `forcedColors:'active'`.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (precepts/README.md "Substrate and consumer land together."
  line 8; SPEC.md §"Every wave lands substrate with its consumer").** The forced-colors skin is a UNIVERSAL
  a11y obligation with ≥2 consumers trivially met (muster + EVERY glass surface the library ships — corpus
  line 458/499). It is NOT speculative substrate: the consumer is "every `.glass-*` surface under WHC" plus
  the named muster K reporter. The skin lands WITH its consumers (auto-applied to the live glass ladder) +
  its π-lane gate. MUST NOT ship a forced-colors arm for a surface no glass component uses (e.g. a
  speculative tier the ladder does not define).
- **no-overfitting (precepts/README.md "No overfitting. A public surface, helper, token, … needs a current
  consumer and evidence. Otherwise delete it." lines 10-12).** The skin keys off the EXISTING five-rung
  ladder selector group (`glass.css:54-59`) + the EXISTING StatusDot `status`/`role="img"` contract — it
  invents NO new tokens, NO new component props, NO new ARIA. The system colors are the standard WHC keywords
  only. MUST NOT mint a `--forced-colors-*` token cohort (WHC system colors are the source of truth — a
  glass-ui token in the WHC arm would defeat the user's palette). MUST NOT add a StatusDot `forcedColors`
  prop (the skin is CSS-media-query-level, transparent to the component API).
- **one-path / no-legacy-code (no-backwards-compat memory; SPEC.md §"no shadow APIs or temporary
  compatibility layers").** The skin EXTENDS the single existing `@media (forced-colors: active)` block
  (one media query, one path) — it does NOT fork a parallel WHC stylesheet, a `.dark` forced-colors arm
  (the user's palette supersedes light/dark under WHC — one path), or a per-component WHC override that
  re-fragments the gap. MUST NOT ship a second forced-colors block alongside the AS-era one (generalize the
  seed; do not duplicate it).
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (the §0 named
  precept; SPEC.md §"the two are never collapsed").** WHC dropping `backdrop-filter` / the `--glass-*`
  box-shadows / the Aurora canvas is a BEFITTING-SILENT browser-API degradation (the platform strips
  decorative chrome — glass-ui yields gracefully via the skin, NOT a thrown error). The skin restores
  STRUCTURE silently; it does NOT log, throw, or warn (WHC is a user choice, not a library defect). The
  `forced-color-adjust: none` NON-use is the precept-correct yield (the chrome cedes color to the user's
  palette). MUST NOT collapse the WHC yield into a fail-explicit path.
- **π visual-runtime lane (SPEC.md §π; the AX cardinal precept — charter line 1768-1769).** The close is the
  executed live `forcedColors:'active'` Playwright + frontend-design pass (the glass ladder reads as legible
  bordered hierarchy, the StatusDots stay distinguishable, focus survives), captured as a paired-π
  BEFORE/AFTER + DELTA — NEVER a headless `grep "forced-colors"` source-string gate (which a render that
  paints the skin but still visually collapses would pass; the corpus, line 458, demands the visual-truth
  pass explicitly). The `proof:forced-colors-skin` gate is a RUNTIME-readback (the precept-valid artefact
  form), not a source grep. MUST NOT close on the gate alone.
- **documentation-is-part-of-the-change (precepts/README.md "Wave close updates docs before the next wave
  opens." line 16).** The skin's existence is recorded in the wave's audit json (the born-RED→GREEN ledger
  + the muster cross-repo evidence + the RATIFY dispositions) and the W25b relocation note is handed off
  (which home the skin landed in) so W25b's carve is not surprised. The muster adoption route (pin-bump →
  W34) is named, not silently assumed. MUST NOT leave the W25b co-location coordination or the muster
  adoption leg unrouted.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **Skin home: `glass-material.css` vs a consolidated `utilities/media.css` forced-colors family —
   RATIFY-BEFORE-IMPL.** **Recommendation:** land the glass-LANGUAGE extension (the tier-pane borders +
   `::before` no-op + floating-surface edges) in `glass-material.css` (the W25b-renamed home, co-located with
   the ladder it skins per charter line 1758-1759), and let the FOCUS-RING rung ride W25b's
   `utilities/media.css` carve (focus-survival is a utility; tier-survival is a glass-material concern — two
   cohesive homes). The fallback — consolidate the WHOLE forced-colors family into one `utilities/media.css`
   home per the W25b carve — is recorded if W25b's carve plan prefers a single media home. RATIFY against the
   W25b carve plan (which is NOT yet authored — only W25a + W26 specs exist at dispatch).
2. **W25b sequencing — RATIFY-BEFORE-IMPL.** The charter dependsOn does NOT list W25b, but the scope says the
   skin "rides the W25b `glass-material.css` rename". **Recommendation:** sequence W36 AFTER W25b so the skin
   lands in the FINAL homes (`glass-material.css` + `utilities/media.css`), not the pre-rename
   `glass-specular-track.css` / monolithic `utilities.css`. The fallback — dispatch W36 BEFORE W25b lands —
   requires W25b to carry the W36 skin block as a relocation target in its carve (W36 records the home used
   in its audit json so W25b is not surprised). RATIFY the sequence at dispatch.
3. **StatusDot non-chroma differentiation cue (border-weight vs shape vs system-color triplet) —
   RATIFY-BEFORE-IMPL.** **Recommendation:** the system-color triplet (`Mark`/`GrayText`/`CanvasText` or the
   applicable WHC keyword set) keyed off the existing `status`/`data-status` attribute, so ok/warn/error stay
   distinguishable by a WHC-HONORED system color (not a glass-ui hue, which WHC strips). The fallback — a
   border-weight or small shape differentiation — is recorded if the π-lane render proves the system-color
   triplet insufficiently distinguishable on a given WHC palette. RATIFY the exact mapping against the live
   `forcedColors:'active'` legibility pass.
4. **Scope of the floating/overlay edge restoration — RATIFY.** **Recommendation:** apply the `CanvasText`
   border + `Canvas` background to the `.glass-floating`/`.glass-overlay` ladder rungs (the ladder-level
   carriers Dialog/Sheet/Popover/DropdownMenu/HoverCard compose). The question is whether the menu/popover
   CONTENT surfaces that compose those rungs need an ADDITIONAL per-component WHC arm (e.g. a dropdown item's
   separator) or whether the ladder-level border suffices. RATIFY against the live render — prefer the
   ladder-level (one path) unless a specific floating surface still reads as collapsed.
5. **A dedicated forced-colors demo story vs auditing the existing ladder/StatusDot stories under
   `forcedColors:'active'` — RATIFY against the W18 IA.** **Recommendation:** render the EXISTING glass-ladder
   + StatusDot + Dialog-over-Card stories under the π-lane's `forcedColors:'active'` emulation (no new story
   needed — the skin is library-CSS-level and auto-applies). A dedicated story is warranted ONLY if the W18
   IA wants a visible "accessibility / forced-colors" foundations entry. RATIFY against the W18 category tree.
